# Blueprint — GDC Jewellery Lab (stato attuale, post-migrazione 29/09/2026)

> Questo documento aggiorna il blueprint originale (risalente all'epoca Firebase
> Studio / Genkit): descrive il sito com'è oggi, su Next.js + Vercel.

**App**: GDC Jewellery Lab — sito vetrina del laboratorio orafo (Ticino, CH).
Live: https://gdc-jewellery-lab.vercel.app/

## Funzionalità attuali

- **Galleria**: 21 creazioni in 7 gruppi (anelli, collane/pendenti, fedi); foto ospitate su postimg.cc; ogni foto ha descrizione localizzata e apre una lightbox con condivisione.
- **Collezioni**: 5 categorie (Anelli, Collane e Pendenti, Fedi con pezzi in galleria; Orecchini e Bracciali solo su misura — ancora senza scatti). CTA "Richiedi un pezzo simile" che pre-compila il modulo ordine.
- **Crea il tuo gioiello**: pagina editoriale (come funziona in 4 passi, perché su misura, FAQ) + CTA preventivo gratuito / WhatsApp.
- **Modulo ordine personalizzato**: tipo gioiello, materiali, pietre, descrizione, foto di riferimento, nome/email; invio via Gmail SMTP con email di conferma automatica al cliente (ID richiesta `REQ-XXXXXX`).
- **Come ordinare**: 4 passi (scegli → richiedi → conferma/produzione → consegna).
- **Servizi**: design su misura, messa in misura, restauro/modifica vintage, rimessa a nuovo, cambio pila e restauro orologi.
- **Contatti**: recapiti (email, telefono, Instagram) + form con allegato immagine.
- **Chi siamo**: storia del laboratorio.

## Rimosso nella migrazione (non più in uso)

- **AI Design Assistant / generatore immagini** (era Genkit + Gemini/Imagen): rimosso con la migrazione fuori da Firebase. Le vecchie chiavi di traduzione sono state eliminate (01/10/2026).
- **Inspiration Gallery** (foto inviate dagli utenti): non implementata nel sito attuale.
- **Traduzione automatica per geolocalizzazione / prompt lingua alla prima visita**: non implementata; la lingua si sceglie dal selettore (default italiano).

## i18n

Quattro lingue complete e allineate (stesso set di chiavi): IT, EN, FR, DE.
File: `src/locales/{it,en,fr,de}.json`. Descrizioni galleria per gruppo in `home.gallery.descriptions.*`.
Glossario terminologico: `docs/GLOSSARIO-TERMINOLOGIA.md`.

## Linee guida di stile (attuali)

- Oro come accento primario, fondo scuro elegante, tipografia headline serif + corpo pulito.
- Icone lucide lineari (materiali, pietre, strumenti).
- Layout pulito, transizioni morbide su hover, animazioni sobrie (framer-motion), rispetto di `prefers-reduced-motion`.
- Regole editoriali: niente riflessi di luce sul diamante nelle immagini; mai il nome del titolare nei contenuti pubblici; i prompt per contenuti generati sono solo bozze da approvare (`docs/PROPOSTE-CONTENUTI.md`).

## Note tecniche (per l'agente infrastruttura)

- Next.js 14 App Router, deploy Vercel (`vercel.json`, regione `fra1`), `npm ci` + `npm run build`.
- Invio email via Gmail SMTP (`GMAIL_EMAIL`, `GMAIL_APP_PASSWORD` su Vercel).
- Immagini galleria su postimg.cc (esterne); valutare spostamento in `public/` per il sito definitivo.
