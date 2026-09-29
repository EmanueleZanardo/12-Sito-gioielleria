#!/usr/bin/env python3
"""Push gioielleria source to EmanueleZanardo/12-Sito-gioielleria via Git Data API.
Single commit, nested trees, inline content for text files, blob API for binaries.
Excludes: .git/, .idx/, .env files, .modified
"""
import base64
import json
import os
import sys
import urllib.request
import urllib.error

sys.path.insert(0, "/opt/hatch/skills/skill-creator/bin")
from dynamic_credentials import add_surrogate_to_request, read_json_response

OWNER, REPO = "EmanueleZanardo", "12-Sito-gioielleria"
BASE = "https://api.github.com"
SRC = os.path.expanduser("~/workspace/gioielleria-source")
EXCLUDE_DIRS = {".git", ".idx"}
EXCLUDE_FILES = {".env", ".modified"}

def api(method, path, body=None):
    url = BASE + path
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("User-Agent", "muse-github-skill")
    if data:
        req.add_header("Content-Type", "application/json")
    add_surrogate_to_request(req, "custom.github", entry_name="access_token",
                             allowed_hosts=["api.github.com"])
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return read_json_response(resp)
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", "replace")[:800]
        raise RuntimeError(f"API {method} {path} -> {exc.code}: {detail}")

def collect(root):
    files = {}  # relpath -> bytes
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
        for fn in filenames:
            if fn in EXCLUDE_FILES:
                continue
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, root)
            with open(full, "rb") as f:
                files[rel] = f.read()
    return files

def is_text(data):
    try:
        data.decode("utf-8")
        return True
    except UnicodeDecodeError:
        return False

def main():
    files = collect(SRC)
    print(f"files to push: {len(files)}", flush=True)

    # 1. binaries -> blobs
    blob_shas = {}
    for rel, data in files.items():
        if not is_text(data):
            r = api("POST", f"/repos/{OWNER}/{REPO}/git/blobs",
                    {"content": base64.b64encode(data).decode(), "encoding": "base64"})
            blob_shas[rel] = r["sha"]
            print(f"blob {rel} -> {r['sha'][:8]}", flush=True)

    # 2. build trees bottom-up
    dirs = {}  # dirpath -> list of (name, mode, type, sha/content)
    for rel, data in sorted(files.items()):
        d, name = os.path.split(rel)
        if rel in blob_shas:
            dirs.setdefault(d, []).append(
                {"path": name, "mode": "100644", "type": "blob", "sha": blob_shas[rel]})
        else:
            dirs.setdefault(d, []).append(
                {"path": name, "mode": "100644", "type": "blob",
                 "content": data.decode("utf-8")})

    tree_shas = {}
    # process deepest first
    def depth(d):
        return 0 if d == "" else d.count("/") + 1
    all_dirs = sorted(dirs.keys(), key=depth, reverse=True)
    for d in all_dirs:
        entries = list(dirs[d])
        # attach already-built subtrees
        for sub, sha in list(tree_shas.items()):
            if os.path.dirname(sub) == d:
                entries.append({"path": os.path.basename(sub), "mode": "040000",
                                "type": "tree", "sha": sha})
        # skip empty dirs
        if not entries:
            continue
        r = api("POST", f"/repos/{OWNER}/{REPO}/git/trees", {"tree": entries})
        tree_shas[d] = r["sha"]
        print(f"tree {d or '/'} -> {r['sha'][:8]} ({len(entries)} entries)", flush=True)

    # ensure parent dirs exist in the map even if they had no direct files
    root_sha = tree_shas.get("")
    if not root_sha:
        # build missing intermediate levels
        pending = [s for s in tree_shas if os.path.dirname(s) not in tree_shas
                   and os.path.dirname(s) != ""]
        while pending:
            nxt = []
            for s in pending:
                parent = os.path.dirname(s)
                entries = [{"path": os.path.basename(s), "mode": "040000",
                            "type": "tree", "sha": tree_shas[s]}]
                for s2, sha2 in list(tree_shas.items()):
                    if s2 != s and os.path.dirname(s2) == parent:
                        entries.append({"path": os.path.basename(s2), "mode": "040000",
                                        "type": "tree", "sha": sha2})
                r = api("POST", f"/repos/{OWNER}/{REPO}/git/trees", {"tree": entries})
                tree_shas[parent] = r["sha"]
                print(f"tree {parent} -> {r['sha'][:8]}", flush=True)
                gp = os.path.dirname(parent)
                if gp and gp not in tree_shas and gp != parent:
                    nxt.append(parent)
            pending = nxt
        # root
        entries = []
        for s, sha in tree_shas.items():
            if os.path.dirname(s) == "":
                entries.append({"path": os.path.basename(s), "mode": "040000",
                                "type": "tree", "sha": sha})
        entries += dirs.get("", [])
        r = api("POST", f"/repos/{OWNER}/{REPO}/git/trees", {"tree": entries})
        root_sha = r["sha"]
        print(f"tree / -> {root_sha[:8]}", flush=True)

    # 3. commit (fast-forward on top of current main)
    current = api("GET", f"/repos/{OWNER}/{REPO}/git/refs/heads/main")
    parent_sha = current["object"]["sha"]
    print("current main:", parent_sha[:8], flush=True)
    commit = api("POST", f"/repos/{OWNER}/{REPO}/git/commits", {
        "message": "Sorgente sito GDC Jewellery Lab da Firebase Studio (export 29/09/2026)\n\nPrimo import del codice completo: Next.js App Router + Tailwind + shadcn,\nIT/EN/FR/DE, pagine /, /custom-jewel, /about, /contact, /gallery, /orders.\nEsclusi: .env (secret), .git/, .idx/, node_modules, .next.",
        "tree": root_sha,
        "parents": [parent_sha],
    })
    print("commit", commit["sha"], flush=True)

    # 4. update ref (fast-forward)
    api("PATCH", f"/repos/{OWNER}/{REPO}/git/refs/heads/main", {"sha": commit["sha"]})
    print("ref main ->", commit["sha"][:8], flush=True)

if __name__ == "__main__":
    main()
