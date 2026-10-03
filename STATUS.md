# STATUS.md — 12-Sito-gioielleria (GDC Jewellery Lab)

**Ultimo aggiornamento: 03/10/2026 ~07:30 CEST**
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
