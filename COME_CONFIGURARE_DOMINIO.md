# Come Configurare un Dominio Personalizzato (Vercel)

Collegare un dominio personalizzato (es. `www.gdcjewels.com`) al sito si fa dalla
dashboard di **Vercel** (il sito è migrato lì dal 29/09/2026; Firebase non è più in uso).
Il dominio `gdcjewels.com` è già di proprietà, in un contratto IONOS separato.

---

### Prerequisiti

*   Accesso al progetto Vercel `gdc-jewellery-lab`.
*   Accesso al pannello del registrar dove è registrato il dominio (IONOS).

---

### Procedura

1.  **Aggiungi il dominio su Vercel**:
    *   Apri il progetto su [vercel.com](https://vercel.com) → **Settings → Domains**.
    *   Clicca **Add** e inserisci il dominio (es. `gdcjewels.com`, poi ripeti per `www.gdcjewels.com`).
    *   Vercel mostra i record DNS da configurare.

2.  **Configura il DNS sul registrar** (IONOS: pannello → Domini → DNS):
    *   Per l'apice (`gdcjewels.com`): **record A** → `76.76.21.21` (IP indicato da Vercel).
    *   Per `www`: **record CNAME** → `cname.vercel-dns.com`.
    *   **Consiglio**: configura sia la versione con `www` che quella senza; Vercel reindirizza automaticamente una sull'altra.

3.  **Attendi la verifica**:
    *   Torna su Vercel → Settings → Domains: lo stato passa a **Valid Configuration**.
    *   La propagazione DNS può richiedere da pochi minuti a qualche ora. Vercel emette automaticamente il **certificato SSL** (HTTPS).

4.  **Verifica finale**: apri `https://www.gdcjewels.com` e `https://gdcjewels.com` — entrambi devono mostrare il sito con lucchetto HTTPS.

---

### Note

*   Non serve toccare il sito Firebase originale (resta acceso ma non viene più usato).
*   Se in futuro il dominio cambia, basta ripetere la procedura: i DNS puntano sempre a Vercel, mai al codice.
