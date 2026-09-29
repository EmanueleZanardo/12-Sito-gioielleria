# Come Creare una Copia di Sicurezza del Tuo Progetto

Capisco perfettamente la necessità di salvare il tuo lavoro. È un'ottima pratica. Ecco due metodi comuni per creare una copia del tuo progetto, dal più semplice al più robusto e consigliato.

---

### Metodo 1: Copia e Incolla Manuale (Il più semplice)

Questo è il modo più rapido per creare un backup veloce sul tuo computer.

1.  **Trova la Cartella del Progetto**: Nel tuo esplora risorse (Esplora File su Windows o Finder su macOS), naviga fino alla cartella principale che contiene tutti i file del tuo progetto (la cartella che include `src`, `package.json`, etc.).

2.  **Copia la Cartella**: Fai clic con il tasto destro sulla cartella del progetto e seleziona **Copia**.

3.  **Incolla la Cartella**: Vai in un'altra posizione sicura sul tuo computer (come il Desktop o la cartella Documenti), fai clic con il tasto destro e seleziona **Incolla**.

4.  **Rinomina (Consigliato)**: Rinomina la cartella appena incollata in qualcosa di descrittivo, come `backup-progetto-gioielli-DATA`.

Ora hai una copia completa e sicura del tuo progetto in quello specifico momento.

---

### Metodo 2: Utilizzo di Git e GitHub (Consigliato per sviluppatori)

Questo metodo è lo standard professionale. Ti permette di salvare diverse "versioni" del tuo progetto nel tempo e di caricarle online in un posto sicuro (come GitHub).

Se non hai mai usato Git, potrebbe richiedere qualche minuto per la configurazione iniziale, ma i vantaggi sono enormi.

**Passo A: Configurare Git (se non l'hai già fatto)**

1.  **Installa Git**: Se non hai Git, scaricalo e installalo da [git-scm.com](https://git-scm.com/).
2.  **Crea un account GitHub**: Se non hai un account, creane uno gratuito su [github.com](https://github.com/).

**Passo B: Salvare il progetto con Git**

1.  **Apri un Terminale**: Apri un terminale o una riga di comando (Terminale su macOS/Linux, Git Bash o PowerShell su Windows) nella cartella principale del tuo progetto.

2.  **Inizializza Git**: Esegui questo comando per creare un "repository" Git locale.
    ```bash
    git init
    ```

3.  **Aggiungi tutti i file**: Esegui questo comando per dire a Git di tenere traccia di tutti i file.
    ```bash
    git add .
    ```

4.  **Crea un "Commit"**: Questo è come scattare una fotografia dello stato attuale del tuo codice.
    ```bash
    git commit -m "Salvataggio versione attuale del progetto"
    ```
    Ora la tua versione è salvata localmente!

**Passo C: Caricare il progetto su GitHub (Opzionale ma consigliato)**

1.  **Crea un nuovo Repository su GitHub**:
    *   Vai su GitHub e fai clic sul pulsante `+` in alto a destra, poi su `New repository`.
    *   Dagli un nome (es. `progetto-gioielli`), assicurati che sia impostato su `Private` (privato) e fai clic su `Create repository`.

2.  **Collega il tuo progetto locale a GitHub**: GitHub ti mostrerà alcuni comandi. Esegui quelli sotto la sezione "...or push an existing repository from the command line". Saranno simili a questi:
    ```bash
    git remote add origin https://github.com/TUO_NOME_UTENTE/NOME_REPOSITORY.git
    git branch -M main
    git push -u origin main
    ```

Ora una copia completa e sicura del tuo progetto è salvata online su GitHub. Per salvare le modifiche future, ti basterà ripetere i comandi `git add .`, `git commit -m "descrizione modifiche"` e `git push`.
