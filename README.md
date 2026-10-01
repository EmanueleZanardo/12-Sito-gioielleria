# GDC Jewellery Lab — Sito

Sito vetrina del laboratorio orafo GDC (Ticino, CH). App **Next.js 14** (App Router),
i18n IT/EN/FR/DE, form di contatto con invio email via Gmail SMTP.

Migrato fuori da Firebase: nessun servizio Firebase/Genkit è più in uso
(`apphosting.yaml` rimosso, nessuna dipendenza `firebase`/`genkit`).
Il sito originale su Firebase resta acceso ma non viene più toccato.

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
