---
sidebar_position: 1
---

# Installazione
Come fare la configurazione iniziale di ERDDAP™ sul server

 ERDDAP™ può essere eseguito su qualsiasi server che supporta Java e Tomcat (e altri server di applicazione come Jetty, ma non li supportiamo) .
 ERDDAP™ è stato testato su Linux (incluso su Amazon's AWS) , Mac e computer Windows.

*  **Docker** -- Forniamo [ ERDDAP™ in un contenitore Docker](https://hub.docker.com/r/erddap/erddap) 
e IOOS ora offre un [Guida rapida per ERDDAP™ in un contenitore Docker](https://ioos.github.io/erddap-gold-standard/index.html) .
È lo standard ERDDAP™ installazione, in un contenitore Docker.
Attraverso Docker Compose forniamo modi facili per impostare ssl e monitoraggio, leggere di più in out [Documentazione Docker](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Se si utilizza già Docker, probabilmente si preferisce la versione Docker.
Se stai cercando di eseguire su servizi cloud probabilmente preferisci la versione Docker.
*  **Amazzonia** -- Se si installa ERDDAP™ su un'istanza Amazon Web Services EC2, vedere questo [Amazon Web Services Panoramica](/docs/server-admin/additional-information#amazon) Prima.
*  **Linux e Mac** -- ERDDAP™ funziona benissimo su computer Linux e Mac. Vedi le istruzioni qui sotto.
*  **Windows** -- Windows va bene per il test ERDDAP™ e per uso personale (vedi le istruzioni qui sotto) ♪
ma non consigliamo di usarlo per il pubblico ERDDAP™ Distribuzioni. Correre ERDDAP™ su Windows potrebbe avere problemi:
in particolare, ERDDAP™ può essere in grado di eliminare e/o rinominare rapidamente i file. Questo è probabilmente dovuto al software antivirus
   (ad esempio, da McAfee e Norton) che sta controllando i file per i virus. Se si verifica questo problema
(che può essere visto da messaggi di errore nel [log.txt](/docs/server-admin/additional-information#log) file come
"Impossibile eliminare ..."), cambiare le impostazioni del software antivirus può parzialmente alleviare il problema. O considerare l'utilizzo di un server Linux o Mac.

 **Lo standard ERDDAP™ istruzioni di installazione per computer Linux, Mac e Windows sono:** 

0. Assicurarsi che vengano installate dipendenze. Su macchine non Windows (Linux e Mac) Hai bisogno di Csh.

##  Java  {#java} 

1.  [Per ERDDAP™ v2.19+, impostata Java 21.](#java) 
Per motivi di sicurezza, è quasi sempre meglio usare l'ultima versione di Java 21.
Si prega di scaricare e installare l'ultima versione di
    [OpenJDK di Adoptium (Temurin) 21 (LITTA) ](https://adoptium.net/temurin/releases/?version=21) .
Per verificare l'installazione, eseguire `/javaJreBinDirectory/java -versione` , per esempio
    `/usr/local/jdk-21.0.3+9/jre/bin/java -versione` .

    ERDDAP™ lavori con Java da altre fonti, ma consigliamo Adoptium perché è il principale, comunità sostenuto,
gratis (come nella birra e nel discorso) versione di Java 21 che offre supporto a lungo termine (aggiornamenti gratuiti per molti anni dopo il rilascio iniziale) .
Per motivi di sicurezza, si prega di aggiornare il vostro ERDDAP La versione di Java periodicamente come nuove versioni di Java 21 diventano disponibili da Adoptium.

    ERDDAP™ è stato testato e utilizzato ampiamente con 21, non altre versioni. Per vari motivi, non testiamo con né supportiamo altre versioni di Java .
     
## Tomcat{#tomcat} 

2.  [Impostazione](#tomcat)   [Tomcat](https://tomcat.apache.org) . Tomcat è il più utilizzato Java Server delle applicazioni,
che è Java software che si trova tra i servizi di rete del sistema operativo e Java software server come ERDDAP™ .
È Software Libero e Open Source (FOSS) .

Puoi usare un altro Java Server delle applicazioni (ad esempio, Jetty) , ma testiamo solo con e supportiamo Tomcat.

   * Scarica Tomcat e disfare il pacchetto sul tuo server o PC.
Per motivi di sicurezza, è quasi sempre meglio usare l'ultima versione di Tomcat 10 (versione 9 e seguenti non sono accettabili) 
che è progettato per lavorare con Java 21 o più recente. Qui di seguito, la directory Tomcat sarà indicata come `tomcat` .

Traduzione: Se hai già un Tomcat che esegue un'altra applicazione web (soprattutto THREDDS) , si consiglia di installare ERDDAP™ in
      [un secondo Tomcat](/docs/server-admin/additional-information#second-tomcat) perché ERDDAP™ esigenze diverse impostazioni Tomcat
e non dovrebbe competere con altre applicazioni per la memoria.

     * Su Linux, [scaricare il "Core" "tar .gz " Distribuzione di Tomcat](https://tomcat.apache.org/download-10.cgi) e disfare le valigie.
Si consiglia di disfare i bagagli in `/usr/locale` .
     * Su un Mac, Tomcat è probabilmente già installato in `/Librario/Tomcat` , ma dovrebbe aggiornarlo all'ultima versione di Tomcat 10.
Se lo scaricate, [scaricare il "Core" "tar .gz " Distribuzione di Tomcat](https://tomcat.apache.org/download-10.cgi) e disfare tutto `/Librario/Tomcat` .
     * Su Windows, è possibile [scaricare la distribuzione "Core" "zip" Tomcat](https://tomcat.apache.org/download-10.cgi) 
        (che non incasina con il registro di Windows e che si controlla da una linea di comando DOS) e lo disfare in una directory appropriata.
        (Per lo sviluppo, utilizziamo la distribuzione "Core" "zip". Noi facciamo `/programmi` directory e lo disfare lì.) 
Oppure è possibile scaricare la distribuzione "Core" "64-bit di Windows zip", che include più funzionalità.
Se la distribuzione è un installatore di Windows, probabilmente metterà Tomcat in, per esempio, `/Program Files/apache-tomcat-10.0.23` .
             
### server.xml{#serverxml} 

*  [server.xml](#serverxml) - Nel `tomcat/conf/server.xml` file, ci sono due cambiamenti che si dovrebbe fare a ciascuno dei due ` <Connector> ` tags
   (uno per `&lt;Connector port="8080"` e uno per `&lt;Conector port="8443"` ) .
   1.  (Consigliato) Aumentare il `connessione Timeout` valore dei parametri, forse a 300000 (millisecondi, che è 5 minuti) .
   2.  (Consigliato) Aggiungi un nuovo parametro: `rilassatoQueryChars="[] | "` . Questo è opzionale e leggermente meno sicuro,
ma rimuove la necessità per gli utenti di codificare per cento questi caratteri quando si verificano nei parametri di un URL di richiesta dell'utente.
             
### contenuto.xml{#contentxml} 

* contesto.xml -- Risorse Cache - In `tomcat/conf/context.xml` , subito prima ` </Context> ` tag, cambiare il tag Risorse
   (o aggiungerlo se non è già lì) per impostare la cache Parametro MaxSize a 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Questo evita numerosi avvertimenti in catalina. fuori che tutto comincia con
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Tempo di Apache{#apache-timeout} 

* Su computer Linux, modificare le impostazioni di timeout di Apache in modo che le richieste degli utenti che richiedono tempo non timeout
   (con quello che spesso appare come un errore "Proxy" o "Bad Gateway") . Come utente root:
  * Modificare il Apache ` http d.conf` file (di solito `// http d/conf/` ) :
    * Cambiare l'esistente ` <Timeout> ` impostazione (o aggiungere uno alla fine del file) a 3600 (secondi) , invece dei 60 o 120 secondi di default.
    * Cambiare l'esistente ` <ProxyTimeout> ` impostazione (o aggiungere uno alla fine del file) a 3600 (secondi) , invece dei 60 o 120 secondi di default.
  * Riavviare Apache: `/usr/sbin/apachectl -k graziosa`   (ma a volte è in una directory diversa) .

### Sicurezza{#security} 
         
* Raccomandazione di sicurezza: Vedi [queste istruzioni](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) aumentare la sicurezza di
l'installazione di Tomcat, specialmente per i server pubblici.
         
* Per il pubblico ERDDAP™ installazioni su Linux e Mac, è meglio configurare Tomcat (il programma) come appartenenza all'utente `tomcat` 
   (un utente separato con autorizzazioni limitate e che [non ha password](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Così, solo il super utente può passare ad agire come utente `tomcat` . Questo rende impossibile per gli hacker di accedere al server come utente `tomcat` .
E in ogni caso, si dovrebbe fare in modo che il `tomcat` l'utente ha autorizzazioni molto limitate sul file system del server (leggi+write+execute privilegi
per il `apache-tomcat` albero di directory e ` <bigParentDirectory> ` e privilegi di sola lettura per directory con dati che ERDDAP™ ha bisogno di accesso a).
  * È possibile creare il `tomcat` account utente (che non ha password) utilizzando il comando:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * È possibile passare a lavorare come utente `tomcat` utilizzando il comando
    ```
    sudo su - tomcat
    ```
     (Ti chiederà la password del superutente per il permesso di farlo.) 
    * È possibile smettere di lavorare come tomcat utente utilizzando il comando
    ```
    exit
    ````
    * Fai la maggior parte del resto del Tomcat e ERDDAP™ istruzioni di configurazione come utente `tomcat` . Più tardi, correte `startup.sh` e `arresto. #` script come utente `tomcat` 
in modo che Tomcat ha il permesso di scrivere ai suoi file di registro.
    * Dopo aver disacco Tomcat, dal genitore del `apache-tomcat` directory:
      * Modificare la proprietà dell'albero directory apache-tomcat all'utente tomcat.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (ma sostituire il nome effettivo della directory tomcat) .
      * Modificare il "gruppo" per essere tomcat, il nome utente o il nome di un piccolo gruppo che include tomcat e tutti gli amministratori di Tomcat/ ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Cambiare le autorizzazioni in modo che tomcat e il gruppo hanno letto, scrivere, eseguire privilegi:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Rimuovere i permessi dell'utente "altro" per leggere, scrivere o eseguire:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Questo è importante, perché impedisce ad altri utenti di leggere informazioni eventualmente sensibili in ERDDAP™ File di configurazione.

### Memoria{#memory} 

Impostare le variabili ambientali di Tomcat

* Su Linux e Mac:
Creare un file `tomcat/bin/setenv.sh`   (o in Red Hat Enterprise Linux \\[ RHEL \\] , modifica `~tomcat/conf/tomcat10.conf` ) per impostare le variabili di ambiente di Tomcat.
Questo file verrà utilizzato da `tomcat/bin/startup.sh` e `arresto. #` . Il file dovrebbe contenere qualcosa come:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (ma sostituire i nomi delle directory dal computer) .
   (Se hai impostato in precedenza `JRE_HOME` Puoi rimuoverlo.) 
Su Mac, probabilmente non è necessario impostare `JAVA_HOME` .

* Su Windows:
Creare un file `tomcat\bin\\setenv.bat` per impostare le variabili di ambiente di Tomcat.
Questo file verrà utilizzato da `tomcat\bin\\startup.bat` e ` shutdown.bat ` .
Il file dovrebbe contenere qualcosa come:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (ma sostituire i nomi delle directory dal computer) .
Se questo è solo per i test locali, rimuovere "-server".
   (Se hai impostato in precedenza `JRE_HOME` Puoi rimuoverlo.) 

The `- Xmx` e `-Xms` le impostazioni di memoria sono importanti perché ERDDAP™ funziona meglio con più memoria.
Sempre impostato `-Xms` allo stesso valore di `- Xmx` .

* Per sistemi operativi a 32 bit e 32 bit Java :
64 bit Java è molto meglio di 32 bit Java , ma 32 bit Java funzionerà finché il server non è molto occupato.
Più la memoria fisica nel server è migliore: 4+ GB è davvero buono, 2 GB è ok, meno non è raccomandato.
Con 32 bit Java , anche con abbondante memoria fisica, Tomcat e Java non correre se si tenta di impostare `- Xmx` molto sopra 1500M (1200M su alcuni computer) .
Se il server ha meno di 2GB di memoria, ridurre `- Xmx` valore (in 'M'egaBytes) a 1/2 della memoria fisica del computer.

* Per sistemi operativi a 64 bit e 64 bit Java :
64 bit Java funzionerà solo su un sistema operativo a 64 bit.
  * Con Java 8, è necessario aggiungere `- D64` al Tomcat `CATALINA_OPS` parametro in `Setenv.bat` .
  * Con Java 21, si sceglie 64 bit Java quando si scarica una versione di Java marcato "64 bit".

Con 64 bit Java , Tomcat e Java può usare molto alto `- Xmx` e `-Xms` impostazioni. Più la memoria fisica nel server è migliore.
Come suggerimento semplicistico: ti consigliamo di impostare `- Xmx` e `-Xms` a (in 'M'egaBytes) a 1/2 (o meno) della memoria fisica del computer.
Puoi vedere se Tomcat, Java e ERDDAP™ sono effettivamente in esecuzione in modalità a 64 bit cercando " bit", in ERDDAP 's Daily Report e-mail
o nel `BigParentDirectory/logs/ [log.txt](/docs/server-admin/additional-information#log) ` file ( `BigParentDirectory` è specificato in [setup.xml](#setupxml) ) .

#### Collezione Garbage{#garbage-collection} 

* In ERDDAP™ ' [log.txt](/docs/server-admin/additional-information#log) file, vedrete molti "GC (Ricorso di annullamento) " messaggi.
Di solito non è un problema. È un messaggio frequente da un normale funzionamento Java dicendo che ha appena finito una piccola spazzatura
collezione perché è finito di stanza in Eden (la sezione della Java mucchio per oggetti molto giovani) . Di solito il messaggio ti mostra
   `memoriaUseBefore-&gt;memoryUseAfter` . Se quei due numeri sono vicini insieme, significa che la raccolta di rifiuti non era produttiva.
Il messaggio è solo un segno di problemi se è molto frequente (ogni pochi secondi) , non produttivo, e i numeri sono grandi e non in crescita,
che insieme indicano che Java ha bisogno di più memoria, sta lottando per liberare la memoria, ed è in grado di liberare la memoria.
Questo può accadere durante un tempo stressante, poi andare via. Ma se persiste, questo è un segno di guai.
* Se vedi `java.lang.OutOfMemoryError` # ERDDAP™ ' [log.txt](/docs/server-admin/additional-information#log) file,
vedi [Informazioni generali](/docs/server-admin/additional-information#outofmemoryerror) per consigli su come diagnosticare e risolvere i problemi.
         
### Permissioni{#permissions} 

*  [Su Linux e Mac, modificare le autorizzazioni](#permissions) di tutti `#` file in `tomcat/bin/` per essere eseguibile dal proprietario:
  ```
  chmod +x *.sh
  ```

### Fonti{#fonts} 

*  [Fonti per immagini:](#fonts) Preferiamo fortemente il libero [font DejaVu](https://dejavu-fonts.github.io/) all'altro Java font.
Utilizzando questi font è fortemente raccomandato ma non richiesto.

Se si sceglie di non utilizzare i font DejaVu, è necessario modificare l'impostazione fontFamily in setup.xml a ` <fontFamily> Santerif </fontFamily> ` ♪
che è disponibile con tutti Java distribuzioni. Se si imposta ` <fontFamily> ` al nome di un carattere che non è disponibile, ERDDAP™ non si carica
e stamperà un elenco di caratteri disponibili nel `log.txt` file. Devi usare uno di quei caratteri.

Se si sceglie di utilizzare i font DejaVu, assicurarsi che il ` <fontFamily> ` impostazione in setup.xml è ` <fontFamily> DejaVu Sans </fontFamily> ` .

Per installare i font DejaVu, scaricare [DejaVuFonte .zip ](/DejaVuFonts.zip)   (5,522,795 byte, MD5=33E1E61FAB06A547851ED308B4FFEF42) 
e deselezionare i file del carattere in una directory temporanea.

  * Su Linux:
    * Per Linux Adoptium Java distribuzioni, vedi [queste istruzioni](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Con altri Java distribuzioni: Come `tomcat` utente, copiare i file del carattere in `$JAVA_HOME/lib/fonte` Così Java può trovare i caratteri.
Ricorda: se/quando in seguito si aggiorna a una nuova versione di Java , è necessario reinstallare questi font.
  * Su Mac: per ogni file di carattere, fare doppio clic su di esso e quindi fare clic su Install Font.
  * Su Windows 7 e 10: in Windows Explorer, selezionare tutti i file del carattere. Fare clic destro. Clicca su Install.
             
### Prova Tomcat{#test-tomcat} 

* Prova la tua installazione Tomcat.
  * Linux:
    * Come utente "tomcat", eseguire `tomcat/bin/startup.sh` .
    * Visualizza il tuo URL + ":8080/" nel tuo browser (ad esempio, [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac (eseguire tomcat come utente dell'amministratore di sistema) :
    * Corri&#33; `tomcat/bin/startup.sh` .
    * Visualizza il tuo URL + ":8080/" nel tuo browser (ad esempio, [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Nota che per impostazione predefinita, il tuo Tomcat è accessibile solo da te. Non è pubblicamente accessibile.
  * Windows localhost:
    * Fare clic con il tasto destro sull'icona Tomcat nel vassoio di sistema e scegliere "Avvia servizio".
    * Vista [http://127.0.0.1:8080/](http://127.0.0.1:8080/) o forse [http://localhost:8080/](http://localhost:8080/) , nel tuo browser. Nota che per impostazione predefinita, il tuo Tomcat è accessibile solo da te. Non è pubblicamente accessibile.

Si dovrebbe vedere la pagina Tomcat "Congratulations".

Se ci sono problemi, vedere il file di registro Tomcat a `tomcat/logs/catalina.out` .

### Problemi con l'installazione di Tomcat?{#troubles-with-the-tomcat-installation} 

* Su Linux e Mac, se non riesci a raggiungere Tomcat o ERDDAP™   (o forse non si può raggiungere da un computer al di fuori del firewall) ♪
si può testare se Tomcat sta ascoltando la porta 8080, digitando (come radice) su una riga di comando del server:

  ```
  netstat -tuplen | grep 8080
  ```

Questo dovrebbe restituire una riga con qualcosa come:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (dove `#` è una cifra) , indicando che `Gia'.` processo (presumibilmente Tomcat) sta ascoltando sul porto "8080" per il traffico "tcp".
Se nessuna riga è stata restituita, se la linea restituita è significativamente diversa, o se sono state restituite due o più linee, allora potrebbe esserci un problema con le impostazioni della porta.

* Vedere il file di registro Tomcat `tomcat/logs/catalina.out` . Problemi Tomcat e alcuni ERDDAP™ problemi di avvio sono quasi sempre indicati lì.
Questo è comune quando si è in primo piano ERDDAP™ .

* Vedere la [Tomcat](https://tomcat.apache.org/) sito web o cercare il web per aiuto, ma per favore fateci sapere i problemi che avete avuto e le soluzioni che avete trovato.

* Guarda la nostra [sezione per ottenere supporto aggiuntivo](/docs/intro#support) .
             
###  ERDDAP™ Contenuto{#erddap-content} 
3.   [Impostare il `tomcat/content/erddap` file di configurazione.](#erddap-content) 
Su Linux, Mac e Windows, scaricare [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip) 
e sgridarlo nel `tomcat` directory, creazione `tomcat/content/erddap` .

__Versione 1.0.1, 20683 byte, MD5=98a8099e7e674da59fe35e9c96efa7b5, datata 2025-06-02__

Sono disponibili anche alcune versioni precedenti:

    *  [2.1.](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 byte, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, datata 2022-02-16) 
    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 byte, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, datata 2022-02-16) 
    *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 byte, MD5=1E26F62E7A06191EE68C40B9A29362, datata 2022-10-09) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 byte, MD5=1E26F62E7A06191EE68C40B9A29362, datata 2022-12-08) 
    *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 byte, MD5=1E26F62E7A06191EE68C40B9A29362, datata 2023-02-27) 

#### Altri cataloghi{#other-directory} 

Per Red Hat Enterprise Linux (RHEL) o per altre situazioni in cui non è consentito modificare la directory Tomcat o dove si desidera/need
per mettere il ERDDAP™ directory dei contenuti in un'altra posizione per qualche altro motivo (per esempio, se si utilizza Jetty invece di Tomcat) ♪
Unzip `erddapContent .zip ` nella directory desiderata (a cui solo `tomcat` utente ha accesso) e impostare il ` erddapContentDirectory ` proprietà del sistema
 (ad es. ` erddapContentDirectory  =~tomcat/content/erddap ` ) Così ERDDAP™ può trovare questa nuova directory di contenuti.

### setup.xml{#setupxml} 

*  [Leggi i commenti in `tomcat/content/erddap/setup.xml` ](#setupxml) e apportare le modifiche richieste. setup.xml è il file con tutte le impostazioni che specificano come il vostro ERDDAP™ Si comporta.

Per la configurazione iniziale, devi almeno modificare queste impostazioni:
      *  ` <bigParentDirectory> ` 
      *  ` <emailEverythingTo> ` 
      *  ` <baseUrl> ` 
      *  ` <email...> ` impostazioni
      *  ` <admin...> ` impostazioni
      *  ` <baseHttpsUrl> `   (quando hai impostato https ) 

Quando crei la bigParentDirectory, dalla directory madre di bigParentDirectory:

    * Fare il `tomcat` utente il proprietario del `BigParentDirectory` :
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Modificare il "gruppo" per essere tomcat, il nome utente o il nome di un piccolo gruppo che include tomcat e tutti gli amministratori di Tomcat/ ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Cambiare le autorizzazioni in modo che tomcat e il gruppo hanno letto, scrivere, eseguire privilegi:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Rimuovere i permessi dell'utente "altro" per leggere, scrivere o eseguire. Questo è importante per prevenire la lettura di informazioni potenzialmente sensibili
in ERDDAP™ file di registro e file con informazioni su dataset privati.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Variabili dell'ambiente{#environment-variables} 

A partire da ERDDAP™ 2, del regolamento (CEE) n. ERDDAP™ gli amministratori possono sovrascrivere qualsiasi valore in setup.xml specificando una variabile di ambiente
nominato ` ERDDAP _Nome valore` prima di correre ERDDAP™ . Per esempio, utilizzare ` ERDDAP _baseUrl` sovrascrive il ` <baseUrl> ` valore.
Questo può essere utile quando si distribuisce ERDDAP™ con un contenitore come Docker, come è possibile mettere le impostazioni standard in setup.xml
e quindi fornire impostazioni speciali tramite variabili di ambiente. Se fornisce informazioni segrete a ERDDAP™ tramite questo metodo,
assicurarsi di verificare che le informazioni rimangano segrete. ERDDAP™ legge solo variabili di ambiente una volta per startup,
nel primo secondo di avvio, quindi un modo per utilizzare questo è: impostare le variabili di ambiente, avviare ERDDAP ♪
aspettare fino ad ora ERDDAP™ è iniziato, quindi unset le variabili di ambiente.

###  datasets.xml  {#datasetsxml} 

* Leggi i commenti in [ **Lavorare con il datasets.xml File** ](/docs/server-admin/datasets) . Dopo te ERDDAP™ in esecuzione
per la prima volta (di solito con solo i dati predefiniti) , modificherai l'XML in `tomcat/content/erddap/ datasets.xml ` 
per specificare tutti i set di dati che desideri ERDDAP™ per servire. Questo è dove si spenderà la maggior parte del vostro tempo
durante la configurazione ERDDAP™ e più tardi mantenendo il vostro ERDDAP™ .

Si può vedere un esempio [ datasets.xml su GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Diversamente) Ora o (leggermente più probabile) in futuro, se si desidera modificare il file CSS di erddap, copia
   `tomcat/content/erddap/images/erddapStart2.css` a `tomcat/content/erddap/images/erddap2.css` e poi fare cambiamenti ad esso.
Modifiche a `erddap2.css` solo prendere effetto quando ERDDAP™ è riavviato e spesso anche richiedono all'utente di cancellare i file memorizzati nella cache del browser.
     
 ERDDAP™ non funzionerà correttamente se il setup.xml o datasets.xml il file non è un file XML ben formato. Quindi, dopo aver modificato questi file,
è una buona idea verificare che il risultato sia ben formato XML incollando il testo XML in un checker XML come [xmlvalidazione](https://www.xmlvalidation.com/) .
     
### Installare l'erddap. file di guerra{#install-the-erddapwar-file} 

4. Su Linux, Mac e Windows, __download [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.29.0/erddap.war) D'accordo. `tomcat/webapps` :

__Versione 2.29.0, 706,788,135 byte, MD5=A5ED0DCC8D46CA27640FFEB8CE4A8560, datata 12-15-2025_

Il file .war è grande perché contiene costi di alta risoluzione, confine e dati di elevazione necessari per creare mappe.

Sono disponibili anche alcune versioni precedenti.

   *  [2.1.](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 byte, MD5=5FEA912B5D42E50EAB9591F773EA848D, datata 2022-02-16) 
   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 byte, MD5=461325E97E7577EC671DD50246CCFB8B, datata 2022-02-23) 
   *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 byte, MD5=F2CFF805893146E932E498FDDBD519B6, datata 2022-10-09) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 byte, MD5=2B33354F633294213AE2AFDDCF4DA6D0, datata 2022-12-08) 
   *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 byte, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, datata 2023-03-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 byte, MD5=970fbee172e28b0b8a07756eecbc898e, datata 2024-06-07) 
   *  [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 byte, MD5=652AFC9D1421F00B5F789DA2C4732D4C, datata 2024-11-07) 
   *  [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 byte, MD5=99a725108b37708e5420986c16a119, datata 2025-03-31) 
   *  [2.27.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 byte, MD5=3b2086c659eeee4145ca2dff447bf4ef7, datata 2025-06-11) 
   *  [2.28.1](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war)   (622,676,238 byte, MD5=48b4226045f950c8a8d69ef9521b9bc9, datata 2025-09-05) 

### Configurare il proxy (distribuzione specifica)  {#proxy} 

 ERDDAP™ è tipicamente distribuito dietro un proxy inverso webserver per permetterlo di essere servito su porte HTTP standard (80 e 443) .
La terminazione SSL/TLS è spesso annunciata allo strato proxy webserver. Le specifiche dipendono dai requisiti di ogni distribuzione.

#### Apache{#apache} 

1. Assicurarsi che `mod_proxy` e `mod_proxy_ http ` sono caricati:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Modificare l'esistente ` <VirtualHost> ` taggati (se c'è uno) , o aggiungere uno alla fine del file:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Se ERDDAP™ è servito su un sentiero diverso da `Traduzione:` , anche impostare il `X-Forwarded-Prefix` intestazione al
segmento percorso _ prima_ `Traduzione:` . Questa impostazione sarebbe appropriata per un ERDDAP™ servito a
 `/subpath/erddap` :

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Poi riavvia Apache: `/usr/sbin/apachectl -k graziosa`   (ma a volte è in una directory diversa) .
         
#### NGINX{#nginx} 

Nel file nginx config, impostare queste intestazioni:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Se ERDDAP™ è servito su un sentiero diverso da `Traduzione:` , anche impostare il `X-Forwarded-Prefix` intestazione al
segmento percorso _ prima_ `Traduzione:` . Questa impostazione sarebbe appropriata per un ERDDAP™ servito a
 `/subpath/erddap` :

```
proxy_set_header X-Forwarded-Prefix /subpath
```


Per ottenere NGINX e ERDDAP™ lavorare correttamente con https , è necessario mettere il seguente snippet all'interno del server Tomcat.xml ` <Host> ` blocco:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Iniziare Tomcat{#start-tomcat} 

*  (Non consiglio di usare Tomcat Web Application Manager. Se non si completamente shutdown e avvio Tomcat, prima o poi si avrà PermGen problemi di memoria.) 
*  (In Linux o Mac OS, se hai creato un utente speciale per eseguire Tomcat, ad esempio, tomcat, ricorda di fare i seguenti passaggi come quell'utente.) 
* Se Tomcat è già in esecuzione, spegnere Tomcat con (in Linux o Mac OS)   `tomcat/bin/shutdown.sh` 
o (in Windows)   `tomcat shutdown.bat ` 

Su Linux, usare `ps | tomcat` prima e dopo `arresto. #` per assicurarsi che il processo di tomcat si sia fermato.
Il processo dovrebbe essere elencato prima dell'arresto e alla fine non elencato dopo l'arresto.
Potrebbe volerci un minuto o due per ERDDAP™ per chiudere completamente. Sii paziente. O se sembra che non si fermerà da solo, usare:
   `uccidere -9 <processID> ` 
* Inizia Tomcat con (in Linux o Mac OS)   `tomcat/bin/startup.sh` o (in Windows)   `tomcat\bin\\startup.bat` 

## È ERDDAP™ Correre?{#is-erddap-running} 

Utilizzare un browser per cercare di visualizzarehttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ si avvia senza alcun dataset caricato. I set di dati sono caricati in un thread di sfondo e quindi diventano disponibili uno per uno.

### Risoluzione dei problemi{#troubleshooting} 

* Quando una richiesta da parte di un utente entra, va a Apache (su computer Linux e Mac OS) Poi Tomcat, ERDDAP™ .
* Puoi vedere cosa succede a Apache (e relativi errori) nei file di registro Apache.
*    [#](/docs/server-admin/additional-information#tomcat-logs) può vedere cosa arriva a Tomcat (e relativi errori) 
nei file di registro Tomcat ( `tomcat/logs/catalina.out` e altri file in quella directory) .
*    [#](/docs/server-admin/additional-information#log) può vedere cosa succede ERDDAP , messaggi diagnostici da ERDDAP ♪
e messaggi di errore da ERDDAP , nel ERDDAP™   ` <bigParentDirectory> /logs/log.txt` file.
* Tomcat non inizia ERDDAP™ fino a quando Tomcat ottiene una richiesta ERDDAP™ . Così puoi vedere nei file di registro Tomcat se è
iniziato ERDDAP™ o se c'è un messaggio di errore relativo a quel tentativo.
* Quando ERDDAP™ inizia, rinomina il vecchio ERDDAP™ file log.txt ( `logArchivedAt <CurrentTime> .txt` ) e crea un nuovo file log.txt.
Quindi, se `log.txt` il file è vecchio, è un segno che ERDDAP™ di recente non ha ricominciato. ERDDAP™ scrive informazioni di registro a un buffer
e scrive solo il buffer al file di registro periodicamente, ma è possibile forzare ERDDAP™ per scrivere il buffer al file di registro visitando
     ` /erddap/status.html ` .

### Problemi: Vecchia versione di Java  {#trouble-old-version-of-java} 

Se si utilizza una versione di Java che è troppo vecchio per ERDDAP ♪ ERDDAP™ non verrà eseguito e vedrai un messaggio di errore nel file di registro di Tomcat come

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

La soluzione è quella di aggiornare alla versione più recente di Java e assicurarsi che Tomcat lo stia usando.

### Problemi: avvio lento prima volta{#trouble-slow-startup-first-time} 

Tomcat deve fare un sacco di lavoro la prima volta un'applicazione come ERDDAP™ è iniziato; in particolare, deve disfare il pacchetto `erddap.war` file
 (che è come .zip file) . Su alcuni server, il primo tentativo di visualizzare ERDDAP™ stalle (30 secondi?) fino a che questo lavoro non è finito.
Su altri server, il primo tentativo fallirà immediatamente. Ma se si aspetta 30 secondi e riprovare, avrà successo se ERDDAP™ è stato installato correttamente.

Non c'è rimedio per questo. Questo è semplicemente il modo in cui Tomcat funziona. Ma si verifica solo la prima volta dopo che si installa una nuova versione di ERDDAP™ .

## Chiudi e riavvia{#shut-down-and-restart} 

In futuro, per chiudere (e riavviare)   ERDDAP™ , vedi [Come chiudere e riavviare Tomcat e ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Problemi?{#trouble} 

Problemi di installazione di Tomcat o ERDDAP™ ? Guarda la nostra [sezione per ottenere supporto aggiuntivo](/docs/intro#support) .

## Notifica e-mail di nuove versioni di ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Se si desidera ricevere un'email ogni volta che una nuova versione di ERDDAP™ è disponibile o altro importante ERDDAP™ annunci,
si può aderire ERDDAP™ elenco annunci [Qui](https://groups.google.com/g/erddap-announce) . Questa lista media approssimativamente una e-mail ogni tre mesi.

## Personalizzare{#customize} 

*  [Personalizza il tuo ERDDAP™ per evidenziare la vostra organizzazione (non NOAA   ERD ) .](#customize) 
* Cambiare il banner che appare in cima a tutti ERDDAP™ .html pagine modificando ` <startBodyHtml5> ` tag nel tuo ` datasets.xml ` file.
(Se non ce n'è uno, copia il default da ERDDAP™ ' `tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` file
a ` datasets.xml ` e modificarlo.) Per esempio, si potrebbe:
  * Utilizzare un'immagine diversa (il logo della vostra organizzazione) .
  * Cambia il colore di sfondo.
  * Cambiare " ERDDAP™ " a "_YourOrganization_'s ERDDAP™ "
  * Modifica "Accesso più semplice ai dati scientifici" per "Accesso più semplice ai dati di _YourOrganization_".
  * Modificare i link "Brought to you by" per essere link alla vostra organizzazione e fonti di finanziamento.
* Modificare le informazioni sul lato sinistro della home page modificando le ` <theShortDescriptionHtml> ` tag nel tuo ` datasets.xml ` file.
(Se non ce n'è uno, copia il default da ERDDAP™ ' `tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` file
a ` datasets.xml ` e modificarlo.) Per esempio, si potrebbe:
  * Descrivi cosa fa la tua organizzazione e/o il tuo gruppo.
  * Descrivere che tipo di dati questo ERDDAP™ ha.
  * Per cambiare l'icona che appare sulle schede del browser, mettere il favicon della vostra organizzazione. Ico in `tomcat/content/erddap/images/` .
Vedihttps://en.wikipedia.org/wiki/Favicon.
