# 12 — Sito Gioielleria GDC Jewellery Lab

Sito vetrina del laboratorio orafo (GDC jewellery lab), live dal ~ottobre 2025.

## Live
- **URL**: https://studio--sito-v20102025-99896239-cab07.us-central1.hosted.app
- **Titolo pagina**: "GDC jewellery lab"
- **Firebase project**: `sito-v20102025-99896239-cab07` (Firebase App Hosting, backend "Studio", ultima release 27 nov 2025, deploy da **Firebase Studio**)

## Stack (osservato dal sito live, 29/09/2026)
- Next.js App Router + React + Tailwind CSS + componenti stile shadcn/Radix UI
- Icone Lucide, font Belleza/Lora/Montserrat, tema scuro
- Multilingua IT/EN (selettore nell'header)
- Immagini ospitate su postimg.cc (esterno)
- Generazione immagini AI nel percorso custom (tipicamente via Genkit, template Firebase Studio)
- NON è un e-commerce: nessun prezzo, carrello o checkout

## Pagine
| Route | Contenuto |
|---|---|
| `/` | Hero fullscreen (CTA "GALLERIA" → `/#gallery`, "CREA IL TUO GIOIELLO" → `/custom-jewel`), sezione Galleria `#gallery` (griglia ~20 gioielli: anelli, pendenti, collane argento 925/oro 750 con quarzo, rubino, zaffiro, opale…; titolo/descrizione su hover, nessun dettaglio prodotto né prezzi), CTA finale verso `/custom-jewel` |
| `/custom-jewel` | Scelta tra "Crea con l'IA" e "Modulo Ordine Personalizzato" |
| `/custom-jewel/ai-generator` | Textarea "Descrivi il gioiello che vuoi creare..." + "Genera Immagine" |
| `/custom-jewel/order-form` | Form ordine: tipo gioiello (anello/collana/orecchini/bracciale/pendente/spilla/gemelli/cavigliera/girocollo), materiali (oro giallo/bianco/rosa, argento, platino, rame), pietre (diamante, rubino, zaffiro, smeraldo, ametista, acquamarina, opale, perla, granato, topazio, quarzo), descrizione, upload immagine, nome, email, "Invia Richiesta" |
| `/about` | "Chi Siamo", storia "Dal 1994..." con foto laboratorio |
| `/contact` | email laboratorio.ticino@gmail.com, telefono 345 1114337, Instagram @gdc_jewellery_lab, form messaggio con allegato foto |

Header: logo, nav HOME / GALLERIA / CREA GIOIELLO / CHI SIAMO / CONTATTI, selettore lingua, icona Instagram (https://www.instagram.com/_the.goldsmith_/), pulsante share fluttuante.
Footer: tagline "Creiamo gioielli senza tempo che raccontano la tua storia.", "© 2026 GDC Jewellery Lab".

## Chat Gemini collegate (ricerca 29/09/2026)
- "Aggiunta Prodotti Catalogo Gioielli" (apr/mag 2026): catalogo TypeScript `allProductsOriginal` con 21 prodotti prod_001–prod_021 + `orderedProductIds` — descrizioni in italiano, immagini postimg.cc
- La chat originale di sviluppo con il deploy Firebase (~ott 2025) **non esiste** nella cronologia: sito nato direttamente in **Firebase Studio** (i progetti `sito-v07112025-*`, `sito-v17112025-*`, `prova-pub-v15112025-*` sono tentativi correlati non rilasciati)
- Chat correlate (contenuti Instagram, non sviluppo): "Generazione Video Gioiello Quotidiano" (pinned), varie su video/immagini promozionali

## Prossimo passo
Il codice sorgente vive in Firebase Studio (progetto collegato al backend "Studio"). Per gestire modifiche + versionamento Git come il portfolio: esportare il progetto da Firebase Studio (o clonare il repo collegato se presente) e pusharlo qui, poi deploy via Vercel o Firebase App Hosting.
