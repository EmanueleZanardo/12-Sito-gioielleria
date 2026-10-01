# GDC Jewellery Lab — Sito

Sito vetrina del laboratorio orafo GDC (Ticino, CH). App **Next.js 14** (App Router),
i18n IT/EN/FR/DE, galleria collezioni, form di contatto e modulo ordine personalizzato
con invio email via Gmail SMTP.

Sito live: https://gdc-jewellery-lab.vercel.app/

Migrato fuori da Firebase (29/09/2026): nessun servizio Firebase/Genkit è più in uso.
Il sito originale su Firebase resta acceso ma **non viene toccato** finché Vercel non è stabile.

## Pagine

- `/` — Home: hero, galleria (21 creazioni in 7 gruppi), teaser collezioni, fascia "su misura"
- `/collections` — Le Collezioni: Anelli, Collane e Pendenti, Fedi (con pezzi in galleria) + Orecchini e Bracciali (solo su misura, ancora senza scatti)
- `/custom-jewel` — Crea il tuo gioiello: come funziona, perché su misura, FAQ, CTA preventivo/WhatsApp
- `/custom-jewel/order-form` — Modulo ordine personalizzato (tipo, materiali, pietre, descrizione, foto, contatti)
- `/orders` — Come ordinare (4 passi)
- `/services` — Servizi: design su misura, messa in misura, restauro, rimessa a nuovo, orologi
- `/about` — Chi siamo
- `/contact` — Contatti + form con allegato immagine e email di conferma automatica

## Contenuti (i18n)

Tutti i testi sono in `src/locales/{it,en,fr,de}.json` (stesso set di chiavi nelle 4 lingue).
- Descrizioni galleria: `home.gallery.descriptions.<group_id>` (per lingua).
- Dati galleria (immagini, gruppi): `src/lib/data.ts`.
- Dati modulo ordine (tipi, materiali, pietre): `src/lib/order-form-data.ts`.

Regole editoriali (preferenze registrate):
- Niente riflessi di luce sul diamante nelle immagini (foto e video).
- Mai il nome del titolare nei contenuti pubblici.
- I prompt per immagini/video generati si preparano solo come **bozze da approvare** — mai generare senza via libera. Vedi `docs/PROPOSTE-CONTENUTI.md`.

## Documentazione

- `docs/PROPOSTE-CONTENUTI.md` — copy galleria, bozze prompt immagini/video (⏳ da approvare, non generare), note operative asset.
- `docs/GLOSSARIO-TERMINOLOGIA.md` — terminologia gioielleria it/en/fr/de per traduzioni coerenti.
- `docs/blueprint.md` — architettura e stato attuale del sito (aggiornato post-Firebase).
- `STATUS.md` — stato operativo, QA, blocchi.
- `COME_CONFIGURARE_DOMINIO.md` — collegare un dominio personalizzato via Vercel.
- `COME_FARE_UN_BACKUP.md` — come fare un backup del progetto.

## Sviluppo locale

```bash
npm ci
cp .env.example .env   # e valorizza GMAIL_EMAIL + GMAIL_APP_PASSWORD
npm run dev            # http://localhost:9002
```

## Check

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint (next/core-web-vitals)
npm run build       # build di produzione
```

## Deploy su Vercel

1. Crea un account su [vercel.com](https://vercel.com) (login con GitHub consigliato).
2. "Add New… → Project" → importa il repo GitHub `EmanueleZanardo/12-Sito-gioielleria`.
   Vercel rileva automaticamente il framework Next.js (`vercel.json` già presente;
   build `npm run build`, install `npm ci`, regione `fra1`).
3. In "Environment Variables" aggiungi:
   - `GMAIL_EMAIL` = indirizzo Gmail del laboratorio
   - `GMAIL_APP_PASSWORD` = app password Gmail (NON la password di login)
4. "Deploy". Al termine collega il dominio (Settings → Domains).

Nota: il form di contatto (`src/lib/actions.ts`) invia via Gmail SMTP —
senza le due variabili d'ambiente il form risponde con errore di configurazione.
