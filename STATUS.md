# STATUS.md — 12-Sito-gioielleria (GDC Jewellery Lab)

**Ultimo aggiornamento: 04/10/2026 ~13:55 CEST**

## 04/10/2026 ~13:55 CEST — ciclo QA orario 13:36
- QA live (curl): / = 200, /collections = 200, /custom-jewel = 200, /custom-jewel/order-form = 200, /orders = 200, /contact = 200, /about = 200, /services = 200; /gallery = 308 → /#gallery (redirect permanente intenzionale, invariato); pagina inesistente = 404 brandizzata. sitemap.xml, robots.txt, sitemap-images.xml, manifest.webmanifest, og-cover.jpg, favicon.ico = 200.
- Immagini: 33/33 URL i.postimg.cc unici = 200 (2 URL con parentesi "(1)" nel nome: falliscono solo con regex di estrazione troncata — GET diretto = 200, stesso artefatto noto dei cicli scorsi, nessun fix necessario).
- Meta/OG: og:title + og:image assoluto (og-cover.jpg 1200×630) + og:locale it_IT con alternate en/fr/de su homepage; FAQPage JSON-LD in italiano su /custom-jewel (l'intestazione "Frequently Asked Questions" vista nel dump del fetcher è l'etichetta dell'estrattore sul blocco structured data, già archiviata come falso allarme il 04/10 07:45).
- Nessun placeholder/lorem/todo/example.com nell'HTML live; link interni 8/8 nessun 404.
- Controlli telefono (sorgente): guardie `visited:text-gold`/`active:`/`focus-visible:` integre sui bottoni outline homepage (GALLERIA r.211, CTA orders r.389) e sul float WhatsApp (r.28); tutti i target=_blank con rel noopener; noindex su /custom-jewel/order-form confermato (layout.tsx).
- Bug trovati e fixati: NESSUNO. Tutti i guardrail dei cicli precedenti integri.
- Miglioria del ciclo: nessuna modifica codice necessaria (sito verde, zero gap reali trovati) — solo aggiornamento STATUS.md, per convenzione cicli verdi. Zero cambi di design.
- tsc --noEmit 0 errori, npm run build 16/16 exit 0. Push via Contents API (SHA 40 char), verificato su commits/main.
- Residui QA: nessuno. Firebase originale non toccato; nessuna pubblicazione Instagram.

## 04/10/2026 ~12:55 CEST — ciclo QA orario 12:36
- QA live: / = 200, /collections = 200, /custom-jewel = 200, /custom-jewel/order-form = 200, /orders = 200, /contact = 200, /about = 200, /services = 200; /gallery = 308 → /#gallery (redirect permanente intenzionale, verificato con curl — il 404 iniziale era un artefatto del text fetcher, non del sito). sitemap.xml, robots.txt, sitemap-images.xml = 200. Meta/OG/Twitter + JSON-LD presenti; nessun placeholder/lorem/todo nell'HTML live.
- Link interni: 27/27 nessun 404 (200 o 308 intenzionali). Immagini: 24/24 URL i.postimg.cc unici = 200 (zero timeout questo ciclo).
- Controlli telefono (sorgente): guardie visited/active/focus-visible integre su GALLERIA homepage e float WhatsApp; `<html lang>` aggiornato al cambio lingua dal LanguageProvider; tutti i target=_blank con rel noopener; aria-current sulla nav; hero con priority; alt presenti su tutte le next/image.
- Form contatti: client component react-hook-form+zod con label/required/autocomplete; il fallback WhatsApp su errore invio (server di posta non attivo — password app Gmail mancante su Vercel, blocco noto da parte di Emanuele) è intatto.
- Bug trovati: nessuno (tutti i guardrail dei cicli precedenti integri).
- Miglioria del ciclo: nessuna modifica codice necessaria (sito verde, zero gap reali) — solo aggiornamento STATUS.md, per convenzione cicli verdi.
- tsc --noEmit 0 errori, npm run build 16/16 exit 0. Push via Contents API (SHA 40 char), verificato su commits/main.
- Residui QA: nessuno. Firebase originale non toccato; nessuna pubblicazione Instagram.

## 04/10/2026 ~11:55 CEST — ciclo QA orario 11:36
- QA live: / = 200, /collections = 200, /custom-jewel = 200, /custom-jewel/order-form = 200, /orders = 200, /contact = 200; /gallery = 308 → /#gallery (redirect permanente intenzionale, invariato). sitemap.xml, robots.txt = 200. Nessun placeholder/lorem/todo/example.com nel sorgente (solo placeholder= attributi i18n legittimi nei form).
- Immagini: 33/33 URL i.postimg.cc unici = 200 (2 con parentesi "(1).png" nell'URL: il GET diretto risponde 200, come nei cicli scorsi — nessun fix necessario).
- Meta/OG: themeColor #0d0b08 nel viewport export di layout.tsx; canonical/metadataBase invariati.
- Controlli telefono (sorgente): guardie `visited:text-gold`/`active:`/`focus-visible:` integre su entrambi i bottoni outline homepage (GALLERIA r.211, CTA orders r.389) e sul float WhatsApp (r.28); tutti i wa.me con `target="_blank" rel="noopener noreferrer"`; link Instagram con `rel="me"`; tel:+393451114337 con visited guard; aria-hidden="true" sul numerale 404 confermato.
- i18n: 292/292 chiavi presenti e non vuote in it/en/fr/de — zero chiavi mancanti, zero stringhe vuote.
- Bug trovati: nessuno (tutti i guardrail dei cicli precedenti integri).
- Miglioria del ciclo (a11y): r.331 di order-form-client.tsx usava `<Label>` (shadcn/Radix = elemento `<label>`) come didascalia di un'anteprima immagine statica — una label senza controllo associato è markup non valido e confonde gli screen reader. Sostituito con `<p className="text-sm font-medium leading-none">` (stesso stile visivo, markup valido). Zero cambi di design.
- tsc --noEmit 0 errori, npm run build 16/16 exit 0. Push via Contents API (SHA 40 char), verificato su commits/main.
- Residui QA: nessuno. Firebase originale non toccato; nessuna pubblicazione Instagram.

## 04/10/2026 ~10:45 CEST — ciclo QA orario 10:36
- QA live: / = 200, /gallery = 308 → /#gallery (redirect permanente intenzionale, verificato), /custom-jewel = 200, /orders = 200, /contact = 200; /collections = 200. robots.txt, sitemap.xml, manifest.webmanifest, favicon.ico = 200. Meta/OG/Twitter completi sulla home. Nessun placeholder/lorem/todo nell'HTML live.
- Immagini: 26 URL postimg.cc unici sulla home (via Next Image optimizer); campione diretto i.postimg.cc = 200 (un 000 iniziale su HEAD di un file con parentesi nell'URL era un artefatto HEAD — il GET funziona 200, nessun fix necessario).
- Controlli telefono (sorgente): bottoni outline homepage (GALLERIA r.211, CTA orders r.389) con stati :visited/:active/:focus-visible dichiarati esplicitamente — nessun cambio colore post-click; float WhatsApp con visited:text-gold; tutti i target="_blank" con rel noopener; nessun riflesso anomalo (vignettatura radiale intenzionale).
- a11y sweep: skip link presente, <html lang> aggiornato al cambio lingua, reduced-motion CSS + MotionConfig "user" per le animazioni JS, lightbox con ESC/frecce + role=dialog + aria-labels localizzati, toast Radix con aria-live interno, form contatti/ordini con label/required/autocomplete/enterKeyHint/fieldset-legend. Nessun bug trovato.
- Miglioria del ciclo (a11y): aria-hidden="true" sul numerale decorativo "404" in src/app/not-found.tsx (il significato è nell'h1 "Pagina non trovata", evita la doppia lettura agli screen reader).
- tsc --noEmit 0 errori, npm run build 16/16 exit 0.

## 04/10/2026 ~09:45 CEST — ciclo QA orario 09:36
- QA live: / = 200, /custom-jewel = 200, /custom-jewel/order-form = 200, /orders = 200, /contact = 200, /about = 200, /services = 200, /collections = 200; /gallery = 308 → /#gallery (redirect permanente, invariato). sitemap.xml, robots.txt, sitemap-images.xml = 200. Meta/OG/Twitter + JSON-LD presenti sulla home; theme-color, metadataBase, canonical self-referencing nei layout di rotta + iniezione canonical home via useEffect (verificata intatta, r.81 page.tsx). Nessun placeholder/lorem/todo nel live HTML.
- Link interni: 8/8 nessun 404. Immagini: 31/31 URL i.postimg.cc unici = 200 (HEAD, zero timeout questo ciclo).
- Controlli telefono (sorgente): guardie `visited:text-gold`/`active:`/`focus-visible:` integre su entrambi i bottoni outline homepage (GALLERIA r.211, CTA orders r.389) e sul float WhatsApp (r.28); scroll-mt presente su #gallery (r.222) e sulle ancore collezioni; aria-current sulla nav; tutti i `target="_blank"` con `rel="noopener noreferrer"`; alt descrittivi sulle card; sizes ottimizzati (product-card, hero, collections, lightbox); hero con priority (LCP).
- Bug trovati e fixati: NESSUNO. Codice identico al ciclo 08:36 (HEAD c4f9547) — tutti i guardrail dei cicli precedenti integri.
- Miglioria del ciclo: nessuna modifica codice necessaria (sito verde, zero gap reali trovati) — solo aggiornamento STATUS.md. Zero cambi di design.
- tsc --noEmit 0 errori, npm run build 16/16 exit 0. Push via Contents API (SHA 40 char), verificato su commits/main.
- Residui QA: nessuno. Firebase originale non toccato; nessuna pubblicazione Instagram.

## 04/10/2026 ~07:45 CEST — ciclo QA orario 07:36
- QA live: / = 200, /collections = 200, /custom-jewel = 200, /orders = 200, /contact = 200; /gallery = 308 → /#gallery (redirect permanente configurato, verificato con curl; il 404 visto in browser.open era l'estrattore che non segue il redirect, non un problema del sito). og-cover.jpg = 200 (102 KB); security headers invariati (nosniff, SAMEORIGIN, HSTS preload, referrer-policy, permissions-policy); pagina inesistente = 404 brandizzata ("Pagina non trovata").
- Meta/OG/Twitter presenti su tutte le 6 pagine vetrina (og:title + twitter:card per pagina); og:locale alternates en/fr/de; JSON-LD FAQPage in italiano 1:1 con la sezione FAQ visibile (l'intestazione "Frequently Asked Questions" vista nel dump era l'etichetta dell'estrattore sul blocco structured data, non un heading visibile).
- Immagini: 33/33 URL i.postimg.cc unici = 200 al retry (1 timeout transitorio su brooch-icon.png da 3,7 KB, usato in /custom-jewel/order-form — retry 200 in 10,8s; stesso pattern dei timeout postimg dei cicli scorsi). sitemap-images.xml auto-generata da src/lib/data.ts (hero + foto prodotti + foto artigiano /about): completa, nessun intervento.
- Form: submit + label/htmlFor + required integri su /contact e /custom-jewel/order-form; enterKeyHint e autocomplete invariati; fallback WhatsApp +39 345 111 4337 sotto i submit. Nessun placeholder/lorem/todo/xxx/example.com nel sorgente.
- Controlli telefono (sorgente): guardie `visited:text-gold`/`active:`/`focus-visible:` integre su entrambi i bottoni outline (GALLERIA homepage r.211, CTA orders r.389); lightbox con type=button + aria-label; hero con priority (LCP), logo senza priority (nessun preload doppio), gallery con lazy di default; alt descrittivi sulle card prodotto.
- Deploy live allineato a main: `visited:text-gold` e `aria-hidden="true"` (badge processo, commit 06:36) presenti nell'HTML di produzione — Vercel auto-deploy OK.
- Bug trovati e fixati: NESSUNO. Tutti i guardrail dei cicli precedenti integri.
- Miglioria del ciclo: nessuna modifica codice necessaria (sito verde, zero gap reali trovati) — solo aggiornamento STATUS.md. Zero cambi di design.
- tsc --noEmit 0 errori, npm run build 16/16 exit 0. Push via Contents API (SHA 40 char), verificato su commits/main.
- Residui QA: nessuno. Firebase originale non toccato; nessuna pubblicazione Instagram.

## 04/10/2026 ~06:00 CEST — ciclo QA orario 05:36
- QA live: / = 200, /gallery = 301 → /#gallery (200), /custom-jewel = 200, /custom-jewel/order-form = 200, /orders = 200, /contact = 200, /about = 200, /services = 200, /collections = 200; sitemap.xml (7 URL, order-form escluso), robots.txt, manifest.webmanifest, sitemap-images.xml, favicon.ico, apple-touch-icon.png, og-cover.jpg = 200. Meta/OG/Twitter completi; JSON-LD validi: home (WebSite, JewelryStore, BreadcrumbList), /custom-jewel (FAQPage 5 domande); ancore #anelli/#collane-e-pendenti/#fedi presenti; og-cover.jpg 1200×630 esatti.
- Link interni: 19/19 nessun 404 (pagine + asset statici + icone). Immagini: 33/33 i.postimg.cc = 200 (1 timeout transitorio su 892KB, retry OK). Nessun placeholder/dato finto su 7 pagine.
- Controlli telefono (sorgente): GALLERIA outline con `visited:text-gold`/`focus-visible`/`active` espliciti; fix globale `visited:text-current` in button.tsx integro per gli altri outline; lightbox con type=button + aria-label; `document.documentElement.lang` sincronizzato al cambio lingua; prefers-reduced-motion globale; overflow-x: clip su html/body.
- Bug trovati e fixati: NESSUNO. Falso allarme investigato e archiviato: un fetch aveva mostrato la homepage del portfolio su /tmp/home.html — era una collisione /tmp con il worker QA parallelo del sito portfolio (stesso nome file), non un problema del sito gioielleria (3 fetch successivi + header Vercel tutti OK).
- Miglioria del ciclo: nessuna modifica codice necessaria (sito verde, tutti i guardrail integri) — solo aggiornamento STATUS.md. Zero cambi di design.
- tsc --noEmit 0 errori, npm run build 16/16 exit 0. Push via Contents API (SHA 40 char), verificato su commits/main.
- Residui QA: nessuno. Firebase originale non toccato; nessuna pubblicazione Instagram.

## 04/10/2026 ~04:55 CEST — ciclo QA orario 04:36
- QA live: / = 200, /gallery = 200, /custom-jewel = 200, /custom-jewel/order-form = 200, /orders = 200, /contact = 200, /about = 200, /services = 200, /collections = 200; og-cover.jpg = 200; pagina inesistente = 404 brandizzata. Meta/OG/Twitter/JSON-LD completi (canonical homepage via JS — Google lo renderizza, invariato dai cicli scorsi); nessun placeholder o testo finto (i match "null/undefined" sono solo flight-data React); 20/20 immagini i.postimg.cc uniche della homepage = 200; security headers invariati (nosniff, SAMEORIGIN, HSTS, referrer-policy, permissions-policy).
- Controlli telefono: GALLERIA outline con `visited:text-gold`/`focus-visible` confermati in sorgente; form = client component (markup post-hydration, fallback WhatsApp +39 345 111 4337 presente); tutti i `target="_blank"` con `rel="noopener noreferrer"`; autocomplete + enterKeyHint integri sui form.
- Bug trovati e fixati: NESSUNO (tutti i guardrail dei cicli precedenti integri).
- Miglioria micro-igiene (commit lightbox): `type="button"` sui 3 bottoni della lightbox immagini (chiudi/precedente/successiva) — senza type un `<button>` eredita il submit implicito: oggi innocuo (lightbox mai dentro un form), ma esplicito = zero sorprese future. Zero cambi di design.
- tsc --noEmit 0 errori, npm run build 16/16 exit 0. Push via Contents API (SHA 40 char), verificato su commits/main.
- Residui QA: nessuno. Firebase originale non toccato; nessuna pubblicazione Instagram.

## 04/10/2026 ~03:50 CEST — ciclo QA orario 03:36
- QA live: / = 200, /gallery = 200 (redirect → /#gallery), /custom-jewel = 200, /custom-jewel/order-form = 200, /orders = 200, /contact = 200, /about = 200, /services = 200, /collections = 200; sitemap.xml, robots.txt, manifest.webmanifest, sitemap-images.xml, og-cover.jpg = 200; pagina inesistente = 404 brandizzata ("Pagina non trovata", nessun stack). Meta/OG/Twitter/canonical completi su tutte le pagine (og:image assoluto + og:image:alt); nessun placeholder o testo finto (i match "null/undefined" sono solo flight-data React, non testo visibile); 33/33 immagini i.postimg.cc campionate = 200; security headers invariati.
- Controlli telefono: GALLERIA outline con `visited:text-gold`/`focus-visible` confermati in sorgente; Sheet mobile chiude già con Esc (Radix default, nessuna modifica servita); alt="" delle teaser collezioni intenzionale (immagine dentro Link con nome visibile — niente doppia lettura screen reader); skip-link → #main-content esistente.
- Bug trovati e fixati: NESSUNO (tutti i guardrail dei cicli precedenti integri).
- Miglioria micro-UX (commit 519ee76, 47b0cb0): `enterKeyHint` sui campi input dei due form — /contact: nome/email/oggetto = "next" (la textarea messaggio resta con invio = a capo); /custom-jewel/order-form: nome = "next", email = "done" (ultimo campo prima del submit). Sulla tastiera mobile il tasto invio ora guida la compilazione invece di chiudere/inviare a caso. Zero cambi di design.
- tsc --noEmit 0 errori, npm run build 16/16 exit 0. Push via Data API (SHA 40 char), verificato su commits/main.
- Residui QA: nessuno. Firebase originale non toccato; nessuna pubblicazione Instagram.

**Ultimo aggiornamento precedente: 04/10/2026 ~02:45 CEST**

## 04/10/2026 ~02:45 CEST — ciclo QA orario 02:36
- QA live: / = 200, /gallery = 200 (redirect → /#gallery), /custom-jewel = 200, /custom-jewel/order-form = 200, /orders = 200, /contact = 200, /about = 200, /services = 200, /collections = 200; sitemap.xml, robots.txt, manifest.webmanifest, sitemap-images.xml, og-cover.jpg = 200; pagina inesistente = 404 brandizzata. 33/33 immagini i.postimg.cc = 200. 0 placeholder su homepage live; meta/OG/Twitter/JSON-LD (JewelryStore, FAQPage) completi; security headers live OK (nosniff, SAMEORIGIN, HSTS, referrer-policy, permissions-policy).
- Form: fallback WhatsApp +39 345 111 4337 sotto i submit confermato in sorgente (contact è client component: testo visibile post-hydration).
- Bug trovati e fixati: NESSUNO (tutti i guardrail dei cicli precedenti integri).
- Miglioria micro-UX (commit 75001bd): link WhatsApp di fallback sotto i submit di /contact e /custom-jewel/order-form con `visited:text-gold` (prima `visited:text-muted-foreground`: il numero diventava grigio dopo il click, incoerente con la policy visited oro del sito — GALLERIA, WhatsAppFloat); zero cambi di design.
- tsc --noEmit 0 errori, npm run build 16/16 exit 0. Push via Data API (SHA 40 char), verificato su commits/main.
- Residui QA: nessuno. Firebase originale non toccato; nessuna pubblicazione Instagram.

**Ultimo aggiornamento precedente: 04/10/2026 ~02:00 CEST**

## 04/10/2026 ~02:00 CEST — aggiornamento documentale giornaliero
- **03/10 00:27–00:44 — anteprime galleria senza descrizioni né nomi categoria** (commit ed62211, 0d27456); le card di navigazione Anelli/Collane/Fedi mantengono le etichette (decisione sua ancora aperta).
- **03/10 ~02:09 — restyling lusso completato e verificato live** su gdc-jewellery-lab.vercel.app (nero caldo/avorio/oro champagne, Cormorant Garamond; batch HEAD 3e7d862, 13 commit).
- **03/10 02:36–02:54** — deploy Vercel stale con chiavi i18n grezze → fix fallback italiano (commit a8885c3), produzione aggiornata e verificata.
- **03/10 16:47–17:05** — email Vercel "Production deployment failed" (push intermedio senza required-mark.tsx); auto-riparato dal deploy successivo, sito live aggiornato senza intervento.
- **03/10 — QA orari tutto verde** (fix a11y, guardie `visited:` oro 100%, `rel="me"` su Instagram, sitemap-images estesa a 23 immagini, Web App Manifest). Nessuna pubblicazione Instagram (mai autorizzata). HEAD: 2c82d93 (QA 04/10 01:36).

## 03/10/2026 ~10:36 CEST — ciclo QA orario 10:36
- QA live: homepage, /gallery (rewrite → /#gallery), /custom-jewel, /orders, /contact, /about, /services, /collections, /custom-jewel/order-form → tutti 200; sitemap.xml, robots.txt, og-cover.jpg → 200. 0 placeholder (lorem/todo/xxx/example.com) su 5 pagine. 3/3 immagini postimg.cc campionate HEAD 200. Meta OG/Twitter/canonical completi su tutte le pagine.
- Form (sorgente): contact e order-form con label/htmlFor, required, aria-invalid/aria-describedby, zod — markup a11y integro. Bottone GALLERIA confermato con `visited:text-gold`/`focus-visible` (nessun cambio colore post-click).
- Bug trovati: NESSUNO.
- Miglioria del ciclo (igiene URL/privacy): rimosso il parametro tracking `?igsh=...` dai 5 link al profilo Instagram (contact/page.tsx, footer, header ×2, share-dialog) → `https://www.instagram.com/gdc_jewellery_lab`.
- tsc --noEmit 0 errori, npm run build 15/15 exit 0. Push via Contents API (SHA blob 40 char) verificato su commits/main.
## 03/10/2026 ~09:36 CEST — ciclo QA orario 09:36
- QA live via browser task (read-only): homepage OK; /contact OK (form con campi Nome/Email/Oggetto/Messaggio + upload immagine, tutti con label); /orders OK (pagina informativa, nessun form); /custom-jewel OK; /gallery → redirect /#gallery OK (carosello infinito x3, nessuna immagine rotta); bottone GALLERIA confermato oro dopo click (nessun cambio :visited/:active/:focus). Nessun placeholder, nessun errore visibile. Mobile 390px non testabile (limite tool, residuo noto).
- Test automatici: 5/5 pagine 200, 19 link interni nessun 404, 23 immagini postimg.cc tutte 200, meta/OG/Twitter completi, og-cover.jpg 200, robots.txt e sitemap.xml 200.
- Bug trovati: NESSUNO.
- Miglioria (SEO): `/custom-jewel/order-form` ha robots index:false ma era ancora in sitemap.xml (contraddizione) → rimosso da `src/app/sitemap.ts` (7 URL, solo pagine vetrina indicizzabili).
- tsc --noEmit 0 errori, npm run build 15/15 exit 0. Push via Contents API (SHA blob 40 char) verificato su commits/main.
## 03/10/2026 ~09:10 CEST — fix bug overflow orizzontale (segnalazione QA visuale 08:36)
- La QA visuale live ha rilevato scroll orizzontale a LIVELLO DOCUMENTO su /contact (~2897px vs viewport 1920px, ~977px di area vuota) e /custom-jewel/order-form (~2440 vs 1920, ~520px). Bottone GALLERIA confermato oro dopo click (visited:text-gold, nessuno stile viola); /collections OK; footer link tutti OK; mobile 390px non testabile (residuo noto).
- Root cause: la guardia `overflow-x-clip` sul wrapper del layout (commit 859f58d) non basta — qualcosa sfugge al clip del div. NOTA: la prima diagnosi del browser ("utility assente dal CSS") era errata: la regola `.overflow-x-clip{overflow-x:clip}` è presente sia nel CSS locale che in quello live, e la classe è nell'HTML.
- Fix: guardia a livello documento in `src/app/globals.css` (`html, body { overflow-x: clip; }` nel layer base) — nessun contenuto sporgente può più allargare la pagina; `clip` non crea scroll container quindi gli sticky restano invariati. tsc 0 errori, build 15/15 exit 0, push bcfe6c2 (globals.css) + docs STATUS.md verificati su commits/main.
## 03/10/2026 ~08:45 CEST — ciclo QA orario 08:36
- QA live via curl + browser (7 route + favicon/apple-touch-icon/robots/sitemap/og-cover): tutto 200; 33/33 immagini postimg.cc HEAD 200; nessun placeholder (lorem/todo/dummy) su 5 pagine; nessun link interno rotto (/about, /services, /collections, /contact, /orders, /custom-jewel, /custom-jewel/order-form, /gallery→/#gallery); pagina inesistente → 404 corretta.
- Form (sorgente): contact e order-form con label/htmlFor, required, aria-invalid/aria-describedby, aria-live, fieldset/legend — markup a11y integro.
- Parità i18n: 265 chiavi × 4 lingue (it/en/fr/de), nessuna chiave mancante. Recapiti coerenti ovunque: tel/WhatsApp +39 345 111 4337, email laboratorio.ticino@gmail.com.
- Miglioria performance del ciclo: `sizes` delle card teaser homepage calibrato su dimensioni reali (`(max-width: 640px) 100vw, 300px` invece di `33vw`) — su tablet/desktop si scaricano varianti immagine più leggere.
- tsc --noEmit 0 errori, npm run build 15/15 exit 0. Push via Contents API (SHA blob 40 char) verificato su commits/main: 7102243 (page.tsx) + docs STATUS.md.
- Residui QA: verifica visuale live via browser task (stati bottone GALLERIA post-click, layout mobile 390px, errori console JS) — esito in arrivo; eventuale bug emerso verrà fixato nel ciclo successivo.
## 03/10/2026 ~07:30 CEST — ciclo QA orario 06:36
- QA live via browser (8 pagine + /custom-jewel/order-form): tutto 200, nessuna immagine rotta (23 postimg.cc verificate HEAD 200), meta/OG completi, nessun placeholder, stati bottoni outline OK (GALLERIA resta gold dopo click), nessun errore JS.
- Bug fixati (10 file, commit 277e945): (1) MEDIUM /collections/anelli|collane-e-pendenti|fedi rispondevano 404 → redirect permanenti alle ancore #anelli/#collane-e-pendenti/#fedi in /collections (next.config.js); (2) card teaser homepage ora puntano alle ancore di categoria, non alla pagina generica; (3) link COLLEZIONI aggiunto nel footer (chiavi i18n it/en/fr/de); (4) gruppi Tipo/Materiali/Pietre del form ordine → fieldset/legend associati (a11y); (5) required su nome/email del form ordine; (6) noindex su /custom-jewel/order-form (bug SEO #8 = miglioria del ciclo).
- tsc --noEmit 0 errori, npm run build 15/15 exit 0. Push via Contents API (SHA blob 40 char) verificato su commits/main: 277e945.
- Residui QA: emulazione mobile 390px non possibile con i tool disponibili (evidenze markup OK: viewport meta, classi responsive, hamburger menu, overflow-x-clip); /collections earrings/bracelets mostrano intenzionalmente card "Solo su misura" (design, non bug).
## 03/10/2026 ~02:20 CEST — integrazione eventi 02/10–03/10
- **03/10 00:27–00:44 CEST — modifica galleria su richiesta di Emanuele**: rimosse descrizioni e nomi categoria dalle anteprime galleria (solo icona lente su hover); masonry `columns-2 sm:columns-3`; push verificato 0d27456 (build 15/15).


## 03/10/2026 ~02:00 CEST — aggiornamento documentale giornaliero
- Cicli QA 02/10 tutti VERDI, bug critici nessuno: 06:36 themeColor ridotto a #0d0b08 (commit af1f814); 07:36 fix escapeHtml() nelle email del form (commit 5993dc2; il ciclo ha subìto il reboot VM 07:41, build ucciso e rilanciato); 20:36 aria-hidden sull'icona Mail (a536f0f); 21:36 og:locale it_IT + alternate en_US/fr_FR/de_DE (b65e7a5); 22:36 aria-current sui selettori lingua (31aeea1); 23:36 passi "Come funziona" in <ol>/<li> semantici (121d3aa). HEAD main: 75b5238 (toggle menu mobile annuncia "Chiudi menu", a11y).
- Deploy Vercel automatico su ogni push; Firebase originale non toccato; nessuna pubblicazione Instagram (routine IN PAUSA dal 25/09; pubblicazione automatica NON autorizzata). Blocco aperto: esito cancellazione storia di prova (25/09) non ancora confermato.
- Nota: Next 14.2 ignora silenziosamente il campo `images` in MetadataRoute.Sitemap — prima versione scartata, niente codice morto. Prossimi passi: QA oraria continua.


## 02/10/2026 ~02:00 CEST — aggiornamento documentale giornaliero
- QA 01/10 23:36 CEST: FAQPage JSON-LD spostato su /custom-jewel e allineato alle 5 domande visibili (SEO structured data); tsc pulito, build 14/14 exit 0.
- **ALERT 01/10 ~20:36: deploy Vercel FERMO ~2h** — il live serviva la build pre-19:33 (header sicurezza e commit blitz non live). Da riverificare.
- Routine contenuti Instagram `gdc_jewellery_lab` resta IN PAUSA (ordine 25/09); pubblicazione automatica NON autorizzata. Esito cancellazione storia di prova (25/09) non ancora confermato.

## Stato
- Sito live su https://gdc-jewellery-lab.vercel.app/ (migrato fuori da Firebase il 29/09/2026).
- Il sito Firebase originale (sito-v20102025-99896239-cab07) NON va spento finché Vercel non è stabile.
- Build e TypeScript puliti; pagine live 200; immagini postimg online; route galleria corretta `/collections`.
- Ultimo commit: 77b2b85 (QA gioielleria, 01/10 01:56 CEST).

## Ultimi eventi verificati (30/09–01/10/2026)
- QA 01:56 CEST 01/10: build locale pulito + tsc 0 errori; pagine live 200 (/, /gallery, /custom-jewel, /orders, /contact); og-cover.jpg, robots.txt, sitemap.xml 200; logo e hero postimg 200. Bug fix: bottoni outline usati come link potevano prendere il viola :visited del browser — fix globale `visited:text-current` in `src/components/ui/button.tsx`. Miglioria a11y: regola `prefers-reduced-motion` in `src/app/globals.css`. Push 77b2b85 verificato via API. Firebase originale non toccato.
- QA 23:36 CEST 30/09: build 14/14 pagine pulito; QA visuale live via browser (homepage, bottone GALLERIA, /collections, /contact, /orders) tutto OK, nessuna immagine rotta, nessun placeholder. Miglioria: creato `src/app/collections/layout.tsx` (metadata per-pagina: title/description/canonical/OG/Twitter). Push 61c01a1ae6199e46b07d63746132cd1d252a7843 verificato via API; Vercel redeploy automatico.
- Export sorgente da Firebase Studio (gdc-jewellery-lab.zip, 29/09 ~20:18) pushato su repo 12 (commit d577e16e, nessun .env).
- Dipendenze: nessun import Firebase; solo Genkit (@genkit-ai/google-genai) per i flow AI.

## Prossimi passi
- QA oraria attiva; completare il distacco da Genkit/Firebase e stabilizzare il deploy Vercel.

## Blocchi
- Instagram `gdc_jewellery_lab`: routine contenuti IN PAUSA dal 25/09/2026 (suo rifiuto dei contenuti di prova). Pubblicazione automatica NON autorizzata: i prompt vanno proposti in chat e approvati da lui prima di lanciare Gemini.
- Esito cancellazione storia Instagram di prova (25/09) non ancora confermato.
