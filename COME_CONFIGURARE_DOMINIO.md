# Come Configurare un Dominio Personalizzato

Associare un dominio personalizzato (es. `www.iltuosito.com`) al tuo progetto è un'operazione che si svolge interamente sulla console di Firebase. Ecco una guida passo dopo passo.

---

### Prerequisiti

*   **Avere un Dominio**: Devi aver già acquistato un nome di dominio da un registrar (come GoDaddy, Aruba, Namecheap, Google Domains, etc.).
*   **Accesso al Progetto Firebase**: Devi poter accedere alla console del tuo progetto Firebase.

---

### Procedura Dettagliata

1.  **Accedi alla Console di Firebase**:
    *   Apri il tuo browser e vai su [https://console.firebase.google.com/](https://console.firebase.google.com/).
    *   Seleziona il progetto su cui stai lavorando (quello per il tuo sito di gioielli).

2.  **Vai alla Sezione Hosting**:
    *   Nel menu a sinistra, cerca e fai clic su **Build**, poi seleziona **Hosting**.

3.  **Aggiungi Dominio Personalizzato**:
    *   Nella dashboard di Hosting, vedrai il dominio di default fornito da Firebase (solitamente qualcosa come `nome-progetto.web.app`).
    *   Cerca e fai clic sul pulsante **"Aggiungi dominio personalizzato"** (o "Add custom domain").

4.  **Inserisci il Tuo Dominio**:
    *   Ti verrà chiesto di inserire il nome del dominio che desideri collegare (es. `www.iltuogioiello.com`).
    *   **Consiglio**: Inizia con `www.` per configurare sia `iltuogioiello.com` che `www.iltuogioiello.com`. Firebase ti aiuterà a gestire entrambi.
    *   Fai clic su **Continua**.

5.  **Verifica della Proprietà del Dominio**:
    *   Questo è il passaggio più importante. Firebase deve assicurarsi che tu sia il proprietario del dominio.
    *   Ti fornirà un **record TXT**. Si tratta di una stringa di testo (es. `google-site-verification=...`).
    *   **Copia questo valore.**
    *   Ora, devi andare sul sito del tuo provider di dominio (dove hai acquistato il dominio), accedere al tuo account e trovare le **impostazioni DNS** per il tuo dominio.
    *   Aggiungi un **nuovo record di tipo TXT** e incolla il valore che hai copiato da Firebase.
        *   **Host/Nome**: di solito puoi mettere `@` o lasciare vuoto.
        *   **Valore/Value**: incolla la stringa di verifica di Firebase.
    *   Salva le modifiche nel pannello DNS del tuo provider.

6.  **Attendi la Verifica**:
    *   Torna alla console di Firebase e fai clic su **Verifica**.
    *   **Attenzione**: Potrebbero volerci alcuni minuti (o in rari casi, ore) prima che le modifiche al DNS siano visibili a Firebase. Se la verifica fallisce subito, attendi un po' e riprova.

7.  **Configura i Record Finali (Puntamento)**:
    *   Una volta che la proprietà è verificata, Firebase ti mostrerà i **record DNS finali** da aggiungere.
    *   Si tratterà di uno o più **record di tipo A**.
    *   Torna di nuovo alle impostazioni DNS del tuo provider di dominio.
    *   **Elimina eventuali record A esistenti** per il tuo dominio (spesso ce n'è uno "di parcheggio" predefinito).
    *   Aggiungi i nuovi record A forniti da Firebase. Questi record puntano il tuo dominio ai server di Google.

8.  **Completamento e Propagazione**:
    *   Una volta aggiunti i record A, torna su Firebase e completa la procedura.
    *   Lo stato del tuo dominio personalizzato in Firebase passerà da "Verifica in corso" a "Connesso". Verrà anche emesso automaticamente un **certificato SSL** per garantire la connessione HTTPS.
    *   Anche in questo caso, la propagazione dei record A può richiedere tempo (da pochi minuti a 24-48 ore). Durante questo periodo, il sito potrebbe non essere raggiungibile dal nuovo dominio.

Una volta completato, il tuo sito sarà visibile a tutti tramite il tuo dominio personalizzato!
