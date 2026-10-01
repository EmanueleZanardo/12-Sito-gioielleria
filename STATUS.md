# STATUS.md — 12-Sito-gioielleria (GDC Jewellery Lab)

**Ultimo aggiornamento: 01/10/2026 ~02:00 CEST**

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
