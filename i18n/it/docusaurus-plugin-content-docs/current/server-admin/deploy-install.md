---
sidebar_position: 1
---

# Installazione
Come fare la configurazione iniziale diERDDAP™sul server


ERDDAP™può essere eseguito su qualsiasi server che supportaJavae Tomcat (e altri server di applicazione come Jetty, ma non li supportiamo) .ERDDAP™è stato testato su Linux (incluso su Amazon's AWS) , Mac e computer Windows.
*    **Docker** -- Forniamo[ERDDAP™in un contenitore Docker](https://hub.docker.com/r/erddap/erddap)e IOOS ora offre un[Guida rapida perERDDAP™in un contenitore Docker](https://ioos.github.io/erddap-gold-standard/index.html).
È lo standardERDDAP™installazione, in un contenitore Docker.
Attraverso Docker Compose forniamo modi facili per impostare ssl e monitoraggio, leggere di più in out[Documentazione Docker](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md).
Se si utilizza già Docker, probabilmente si preferisce la versione Docker.
Se stai cercando di eseguire su servizi cloud probabilmente preferisci la versione Docker.
*    **Amazzonia** -- Se si installaERDDAP™su un'istanza Amazon Web Services EC2, vedere questo[Amazon Web Services Panoramica](/docs/server-admin/additional-information#amazon)Prima.
*    **Linux e Mac** --ERDDAP™funziona benissimo su computer Linux e Mac. Vedi le istruzioni qui sotto.
*    **Windows** -- Windows va bene per il testERDDAP™e per uso personale (vedi le istruzioni qui sotto) , ma non consigliamo di usarlo per il pubblicoERDDAPS. CorrereERDDAP™su Windows può avere problemi: in particolare,ERDDAP™può essere in grado di eliminare e/o rinominare rapidamente i file. Questo è probabilmente dovuto al software antivirus (ad esempio, da McAfee e Norton) che sta controllando i file per i virus. Se si verifica questo problema (che può essere visto da messaggi di errore nel[log.txt](/docs/server-admin/additional-information#log)file come "Impossibile eliminare ...") , cambiare le impostazioni del software antivirus può parzialmente alleviare il problema. O considerare l'utilizzo di un server Linux o Mac.

 **Lo standardERDDAP™istruzioni di installazione per computer Linux, Mac e Windows sono:** 

0. Assicurarsi che vengano installate dipendenze. Su macchine non Windows (Linux e Mac) Hai bisogno di Csh.
## Java {#java} 
1.  [PerERDDAP™v2.19+, impostataJava21.](#java)
Per motivi di sicurezza, è quasi sempre meglio usare l'ultima versione diJava21.
Si prega di scaricare e installare l'ultima versione di
    [OpenJDK di Adoptium (Temurin) 21 (LITTA) ](https://adoptium.net/temurin/releases/?version=21). Per verificare l'installazione, digitare "/_javaJreBinDirectory_/java -version", ad esempio
/usr/local/jdk-21.0.3+9/jre/bin/java -versione
    
    ERDDAP™lavori conJavada altre fonti, ma consigliamo Adoptium perché è il principale, comunità sostenuto, libero (come nella birra e nel discorso) versione diJava21 che offre supporto a lungo termine (aggiornamenti gratuiti per molti anni dopo il rilascio iniziale) . Per motivi di sicurezza, si prega di aggiornare il vostroERDDAPLa versione diJavaperiodicamente come nuove versioni diJava21 diventano disponibili da Adoptium.
    
    ERDDAP™è stato testato e utilizzato ampiamente con 21, non altre versioni. Per vari motivi, non testiamo con né supportiamo altre versioni diJava.
     
## Tomcat{#tomcat} 
2.  [Impostazione](#tomcat) [Tomcat](https://tomcat.apache.org).
Tomcat è il più utilizzatoJavaServer delle applicazioni, che èJavasoftware che si trova tra i servizi di rete del sistema operativo eJavasoftware server comeERDDAP™. È Software Libero e Open Source (FOSS) .
    
Puoi usare un altroJavaServer delle applicazioni (ad esempio, Jetty) , ma testiamo solo con e supportiamo Tomcat.
     
    
    * Scarica Tomcat e disfare il pacchetto sul tuo server o PC.
Per motivi di sicurezza, è quasi sempre meglio usare l'ultima versione di Tomcat 10 (versione 9 e seguenti non sono accettabili) che è progettato per lavorare conJava21 o più recente. Qui di seguito, la directory Tomcat verrà chiamata _tomcat_.
        
Attenzione&#33; Se hai già un Tomcat che esegue un'altra applicazione web (soprattutto THREDDS) , si consiglia di installareERDDAP™in[un secondo Tomcat](/docs/server-admin/additional-information#second-tomcat)perchéERDDAP™ha bisogno di diverse impostazioni Tomcat e non dovrebbe competere con altre applicazioni per la memoria.
        
        * Su Linux,[scaricare il "Core" "tar.gz" Distribuzione di Tomcat](https://tomcat.apache.org/download-10.cgi)e disfare le valigie. Si consiglia di disfare i bagagli in /usr/local.
        * Su un Mac, Tomcat è probabilmente già installato in /Library/Tomcat, ma dovrebbe aggiornarlo all'ultima versione di Tomcat 10.
Se lo scaricate,[scaricare il "Core" "tar.gz" Distribuzione di Tomcat](https://tomcat.apache.org/download-10.cgi)e lo disfare in /Library/Tomcat.
        * Su Windows, è possibile[scaricare la distribuzione "Core" "zip" Tomcat](https://tomcat.apache.org/download-10.cgi)  (che non incasina con il registro di Windows e che si controlla da una linea di comando DOS) e lo disfare in una directory appropriata. (Per lo sviluppo, utilizziamo la distribuzione "Core" "zip". Facciamo una directory /programs e lo disfare lì.) Oppure è possibile scaricare la distribuzione "Core" "64-bit di Windows zip", che include più funzionalità. Se la distribuzione è un installatore di Windows, probabilmente metterà Tomcat in, per esempio, /Program Files/apache-tomcat-10.0.23 .
             
### server.xml{#serverxml} 
*   [server.xml](#serverxml)- Nel file _tomcat_/conf/server.xml, ci sono due modifiche che si dovrebbero apportare a ciascuno dei due&lt;Connector&gt; tags- uno per
```
        <Connector port="8080" 
```
e uno per
```
        <Conector port="8443"
```
    1.   (Consigliato) Aumentare il valore dei parametri di connessioneTimeout, forse a 300000 (millisecondi)   (che è 5 minuti) .
    2.   (Consigliato) Aggiungi un nuovo parametro: rilassataQueryChars="\\[\\]|" Questo è facoltativo e leggermente meno sicuro, ma rimuove la necessità per gli utenti di codificare per cento questi caratteri quando si verificano nei parametri di un URL di richiesta dell'utente.
             
### contenuto.xml{#contentxml} 
* contest.xml -- Risorse Cache - In _tomcat_/conf/context.xml, subito prima&lt;/Context&gt; tag, modificare il tag Risorse (o aggiungerlo se non è già lì) per impostare la cache Parametro MaxSize a 80000:
    &lt;Risorse cachingAllowed="true" cacheMaxSize="80000" /&gt;
Questo evita numerosi avvertimenti in catalina. fuori che tutto comincia con
"ATTENZIONE\\[principale\\]org.apache.catalina.webresources.Cache.getResources Incapace di aggiungere la risorsa\\[/WEB-INF/classi/...]"
         
### Tempo di Apache{#apache-timeout} 
* Su computer Linux, modificare le impostazioni di timeout di Apache in modo che le richieste degli utenti che richiedono tempo non timeout (con quello che spesso appare come un errore "Proxy" o "Bad Gateway") . Come utente root:
    1. Modificare il Apachehttpfile d.conf (di solito in /etc/httpd/conf/) :
Cambiare l'esistente&lt;Timeout&gt; impostazione (o aggiungere uno alla fine del file) a 3600 (secondi) , invece dei 60 o 120 secondi di default.
Cambiare l'esistente&lt;ProxyTimeout&gt; impostazione (o aggiungere uno alla fine del file) a 3600 (secondi) , invece dei 60 o 120 secondi di default.
    2. Riavviare Apache: /usr/sbin/apachectl -k graziosa (ma a volte è in una directory diversa) .
             
    * Raccomandazione di sicurezza: Vedi[queste istruzioni](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)aumentare la sicurezza dell'installazione di Tomcat, soprattutto per i server pubblici.
         
    * Per il pubblicoERDDAP™installazioni su Linux e Mac, è meglio configurare Tomcat (il programma) come appartenente all'utente "tomcat" (un utente separato con autorizzazioni limitate e che[non ha password](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) . Così, solo l'utente super può passare ad agire come tomcat utente. Questo rende impossibile per gli hacker di accedere al server come tomcat utente. E in ogni caso, si dovrebbe fare in modo che l'utente tomcat ha autorizzazioni molto limitate sul file system del server (leggi+write+execute privilegi per l'albero della directory apache-tomcat e&lt;bigParentDirectory&gt; e privilegi di sola lettura per le directory con dati cheERDDAP™ha bisogno di accesso a).
        * È possibile creare l'account utente tomcat (che non ha password) utilizzando il comando
sudo useradd tomcat -s /bin/bash -p '\\* '
        * È possibile passare a lavorare come tomcat utente utilizzando il comando
Condividi su Twitter
             (Ti chiederà la password del superutente per il permesso di farlo.) 
        * È possibile smettere di lavorare come tomcat utente utilizzando il comando
uscita
        * Fai la maggior parte del resto del Tomcat eERDDAP™istruzioni di configurazione come utente "tomcat". Successivamente, eseguire gli script start.sh e shutdown.sh come utente "tomcat" in modo che Tomcat ha il permesso di scrivere ai suoi file di registro.
        * Dopo aver disacco Tomcat, dal genitore della directory apache-tomcat:
            
            * Modificare la proprietà dell'albero directory apache-tomcat all'utente tomcat.
chown -R tomcat apache-tomcat-_10.0.23_
                 (ma sostituire il nome effettivo della directory tomcat) .
            * Modificare il "gruppo" per essere tomcat, il nome utente o il nome di un piccolo gruppo che include tomcat e tutti gli amministratori di Tomcat/ERDDAPPer esempio,
chgrp -R UserName_ apache-tomcat-_10.0.23_
            * Cambiare le autorizzazioni in modo che tomcat e il gruppo hanno letto, scrivere, eseguire privilegi, ad esempio,.
chmod -R ug+rwx apache-tomcat-_10.0.23_
            * Rimuovere i permessi dell'utente "altro" per leggere, scrivere o eseguire:
chmod -R o-rwx apache-tomcat-_10.0.23_
Questo è importante, perché impedisce ad altri utenti di leggere informazioni eventualmente sensibili inERDDAP™File di configurazione.
            
              
### Memoria{#memory} 
* Impostare le variabili ambientali di Tomcat
    
Su Linux e Mac:
Creare un file _tomcat_/bin/setenv.sh (o in Red Hat Enterprise Linux\\[RHEL\\], modifica ~tomcat/conf/tomcat10.conf) per impostare le variabili di ambiente di Tomcat. Questo file verrà utilizzato da _tomcat_/bin/startup.sh e shutdown.sh. Il file dovrebbe contenere qualcosa come:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (ma sostituire i nomi delle directory dal computer) .
 (Se hai impostato in precedenza JRE\\_HOME, puoi rimuoverlo.)   
Su Mac, probabilmente non è necessario impostare JAVA\\_HOME.

Su Windows:
Creare un file _tomcat_\bin\\setenv.bat per impostare le variabili di ambiente di Tomcat. Questo file verrà utilizzato da _tomcat_\\bin\\startup.bat eshutdown.bat. Il file dovrebbe contenere qualcosa come:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (ma sostituire i nomi delle directory dal computer) .
Se questo è solo per i test locali, rimuovere "-server".
 (Se hai impostato in precedenza JRE\\_HOME, puoi rimuoverlo.) 

Le impostazioni di memoria -Xmx e -Xms sono importanti perchéERDDAP™funziona meglio con più memoria. Impostare sempre -Xms allo stesso valore di -Xmx.

* Per sistemi operativi a 32 bit e 32 bitJava:
64 bitJavaè molto meglio di 32 bitJava, ma 32 bitJavafunzionerà finché il server non è molto occupato. Più la memoria fisica nel server è migliore: 4+ GB è davvero buono, 2 GB è ok, meno non è raccomandato. Con 32 bitJava, anche con abbondante memoria fisica, Tomcat eJavanon correre se si tenta di impostare -Xmx molto sopra 1500M (1200M su alcuni computer) . Se il server ha meno di 2GB di memoria, ridurre il valore -Xmx (in 'M'egaBytes) a 1/2 della memoria fisica del computer.
* Per sistemi operativi a 64 bit e 64 bitJava:
64 bitJavafunzionerà solo su un sistema operativo a 64 bit.
    
    * ConJava8, è necessario aggiungere \\-d64 al parametro Tomcat CATALINA\\_OPTS in setenv.bat
    * ConJava21, si sceglie 64 bitJavaquando si scarica una versione diJavamarcato "64 bit".
    
Con 64 bitJava, Tomcat eJavapuò utilizzare impostazioni -Xmx e -Xms molto elevate. Più la memoria fisica nel server è migliore. Come suggerimento semplicistico: si consiglia di impostare -Xmx e -Xms a (in 'M'egaBytes) a 1/2 (o meno) della memoria fisica del computer. Puoi vedere se Tomcat,JavaeERDDAP™sono effettivamente in esecuzione in modalità a 64 bit cercando " bit", inERDDAP's Daily Report email o nel _bigParentDirectory_/logs/[log.txt](/docs/server-admin/additional-information#log)file (_bigParentDirectory_ è specificato in[setup.xml](#setupxml)) .
#### Collezione Garbage{#garbage-collection} 
* InERDDAP™'[log.txt](/docs/server-admin/additional-information#log)file, vedrete molti "GC (Ricorso di annullamento) " messaggi.
Di solito non è un problema. È un messaggio frequente da un normale funzionamentoJavadicendo che ha appena finito una piccola raccolta di rifiuti perché è finito di stanza in Eden (la sezione dellaJavamucchio per oggetti molto giovani) . Di solito il messaggio ti mostra _memoryUseBefore_\\-&gt;_memoryUseAfter_. Se questi due numeri sono vicini insieme, significa che la raccolta di rifiuti non era produttiva. Il messaggio è solo un segno di problemi se è molto frequente (ogni pochi secondi) , non produttivo, e i numeri sono grandi e non in crescita, che insieme indicano cheJavaha bisogno di più memoria, sta lottando per liberare la memoria, ed è in grado di liberare la memoria. Questo può accadere durante un tempo stressante, poi andare via. Ma se persiste, questo è un segno di guai.
* Se vedi java.lang.OutOfMemoryError è inERDDAP™'[log.txt](/docs/server-admin/additional-information#log)file, vedi[Informazioni generali](/docs/server-admin/additional-information#outofmemoryerror)per consigli su come diagnosticare e risolvere i problemi.
         
### Permissioni{#permissions} 
*   [Su Linux e Mac, modificare le autorizzazioni](#permissions)di tutti\\*.shfile in _tomcat_/bin/ da eseguibile dal proprietario, ad esempio, con
```
    chmod +x \\*.sh  
```
### Fonti{#fonts} 
*   [Fonti per immagini:](#fonts)Preferiamo fortemente il libero[font DejaVu](https://dejavu-fonts.github.io/)all'altroJavafont. Utilizzando questi font è fortemente raccomandato ma non richiesto.
    
Se si sceglie di non utilizzare i font DejaVu, è necessario modificare l'impostazione fontFamily in setup.xml a&lt;fontFamily&gt;SansSerif&lt;/fontFamily&gt;, che è disponibile con tuttiJavadistribuzioni. Se si imposta fontFamily al nome di un carattere che non è disponibile,ERDDAP™non caricare e stamperà un elenco di caratteri disponibili nel file log.txt. Devi usare uno di quei caratteri.
    
Se si sceglie di utilizzare i font DejaVu, si prega di assicurarsi che l'impostazione fontFamily in setup.xml è&lt;carattere Famiglia &gt; DejaVu Sans&lt;/fontFamily&gt;
    
Per installare i font DejaVu, scaricare[DejaVuFonte.zip](/DejaVuFonts.zip)  (5,522,795 byte, MD5=33E1E61FAB06A547851ED308B4FFEF42) e deselezionare i file del carattere in una directory temporanea.
    
    * Su Linux:
        * Per Linux AdoptiumJavadistribuzioni, vedi[queste istruzioni](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/).
        * Con altriJavadistribuzioni: Come utente Tomcat, copiare i file del carattere in _JAVA\\_HOME_/lib/fonts soJavapuò trovare i caratteri. Ricorda: se/quando in seguito si aggiorna a una nuova versione diJava, è necessario reinstallare questi font.
    * Su Mac: per ogni file di carattere, fare doppio clic su di esso e quindi fare clic su Install Font.
    * Su Windows 7 e 10: in Windows Explorer, selezionare tutti i file del carattere. Fare clic destro. Clicca su Install.
             
### Prova Tomcat{#test-tomcat} 
* Prova la tua installazione Tomcat.
    * Linux:
        * Come utente "tomcat", eseguire _tomcat_/bin/startup.sh
        * Visualizza il tuo URL + ":8080/" nel tuo browser (ad esempio,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) .
        * Si dovrebbe vedere la pagina Tomcat "Congratulations".
Se ci sono problemi, vedere il file di registro Tomcat _tomcat_/logs/catalina.out.
    * Mac (eseguire tomcat come utente dell'amministratore di sistema) :
        * Correre _tomcat_/bin/startup.sh
        * Visualizza il tuo URL + ":8080/" nel tuo browser (ad esempio,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) . Nota che per impostazione predefinita, il tuo Tomcat è accessibile solo da te. Non è pubblicamente accessibile.
        * Si dovrebbe vedere la pagina Tomcat "Congratulations".
Se ci sono problemi, vedere il file di registro Tomcat _tomcat_/logs/catalina.out.
    * Windows localhost:
        
        * Fare clic con il tasto destro sull'icona Tomcat nel vassoio di sistema e scegliere "Avvia servizio".
        * Vista[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/)o forse[ http://localhost:8080/ ](http://localhost:8080/), nel tuo browser. Nota che per impostazione predefinita, il tuo Tomcat è accessibile solo da te. Non è pubblicamente accessibile.
        * Si dovrebbe vedere la pagina Tomcat "Congratulations".
Se ci sono problemi, vedere il file di registro Tomcat _tomcat_/logs/catalina.out.
            
### Problemi con l'installazione di Tomcat?{#troubles-with-the-tomcat-installation} 
* Su Linux e Mac, se non riesci a raggiungere Tomcat oERDDAP™  (o forse non si può raggiungere da un computer al di fuori del firewall) , si può verificare se Tomcat sta ascoltando la porta 8080, digitando (come radice) su una riga di comando del server:
```  
    netstat -tuplen | grep 8080  
```
Questo dovrebbe restituire una riga con qualcosa come:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     (dove '#' è qualche cifra) , indicando che un processo "java" (presumibilmente Tomcat) sta ascoltando sul porto "8080" per il traffico "tcp". Se nessuna riga è stata restituita, se la linea restituita è significativamente diversa, o se sono state restituite due o più linee, allora potrebbe esserci un problema con le impostazioni della porta.
* Vedere il file di registro Tomcat _tomcat_/logs/catalina.out. Problemi Tomcat e alcuniERDDAP™problemi di avvio sono quasi sempre indicati lì. Questo è comune quando si è in primo pianoERDDAP™.
* Vedere la[Tomcat](https://tomcat.apache.org/)sito web o cercare il web per aiuto, ma per favore fateci sapere i problemi che avete avuto e le soluzioni che avete trovato.
* Guarda la nostra[sezione per ottenere supporto aggiuntivo](/docs/intro#support).
             
### ERDDAP™Contenuto{#erddap-content} 
3.  [Impostare il_tomcat_/content/erddapfile di configurazione.](#erddap-content)  
Su Linux, Mac e Windows, scaricare[erddapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (versione 1.0.0, 20333 byte, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, datata 2024-10-14) e szip in _tomcat_, creando_tomcat_/content/erddap.

    \\[Sono disponibili anche alcune versioni precedenti:
    [2.1.](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19,792 byte, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, datata 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19,792 byte, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, datata 2022-02-16)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19,810 byte, MD5=1E26F62E7A06191EE68C40B9A29362, datata 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19,810 byte, MD5=1E26F62E7A06191EE68C40B9A29362, datata 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19,810 byte, MD5=1E26F62E7A06191EE68C40B9A29362, datata 2023-02-27) 
e szip in _tomcat_, creando_tomcat_/content/erddap.\\]
    
#### Altri cataloghi{#other-directory} 
Per Red Hat Enterprise Linux (RHEL) o per altre situazioni in cui non è consentito modificare la directory Tomcat o dove si desidera/necessario mettereERDDAP™directory dei contenuti in un'altra posizione per qualche altro motivo (per esempio, se si utilizza Jetty invece di Tomcat) , unzip erddapContent.zipnella directory desiderata (a cui solo utente=tomcat ha accesso) e impostare ilerddapContentDirectoryproprietà del sistema (ad esempio,erddapContentDirectory=~tomcat/content/erddap) CosìERDDAP™può trovare questa nuova directory di contenuti.
    
### setup.xml{#setupxml} 
*   [Leggi i commenti in_tomcat_/content/erddap/ **setup.xml** ](#setupxml)e apportare le modifiche richieste. setup.xml è il file con tutte le impostazioni che specificano come il vostroERDDAP™Si comporta.
Per la configurazione iniziale, devi almeno modificare queste impostazioni:
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
Quando crei la bigParentDirectory, dalla directory madre di bigParentDirectory:
    
    * Fare utente=tomcat il proprietario del grandeParentDirectory, ad esempio,
```
        chown -R tomcat _bigParentDirectory_
```
    * Modificare il "gruppo" per essere tomcat, il nome utente o il nome di un piccolo gruppo che include tomcat e tutti gli amministratori di Tomcat/ERDDAPPer esempio,
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * Cambiare le autorizzazioni in modo che tomcat e il gruppo hanno letto, scrivere, eseguire privilegi, ad esempio,.
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * Rimuovere i permessi dell'utente "altro" per leggere, scrivere o eseguire. Questo è importante per evitare la lettura di informazioni eventualmente sensibili inERDDAP™file di registro e file con informazioni su dataset privati.:
```
        chmod -R o-rwx _bigParentDirectory_
```

### Variabili dell'ambiente{#environment-variables} 
A partire daERDDAP™2, del regolamento (CEE) n.ERDDAP™gli amministratori possono sovrascrivere qualsiasi valore in setup.xml specificando una variabile di ambiente denominataERDDAP\\__valueName_ prima di eseguireERDDAP™. Per esempio, utilizzareERDDAP\\_baseUrl sovrascrive il&lt;baseUrl&gt; valore. Questo può essere utile quando si distribuisceERDDAP™con un contenitore come Docker, come è possibile mettere le impostazioni standard in setup.xml e quindi fornire impostazioni speciali tramite variabili di ambiente. Se fornisce informazioni segrete aERDDAP™tramite questo metodo, assicurarsi di controllare che le informazioni rimangano segrete.ERDDAP™solo legge variabili di ambiente una volta all'avvio, nel primo secondo di avvio, quindi un modo per usare questo è: impostare le variabili di ambiente, avviareERDDAP♪, aspetta fino a quando ♪ERDDAP™è iniziato, quindi unset le variabili di ambiente.
    
### datasets.xml {#datasetsxml} 
* Leggi i commenti in[ **Lavorare con ildatasets.xmlFile** ](/docs/server-admin/datasets). Dopo teERDDAP™correre per la prima volta (di solito con solo i dati predefiniti) , modificherai l'XML in_tomcat_/content/erddap/ **datasets.xml** per specificare tutti i set di dati che desideriERDDAP™per servire. Questo è dove trascorrerete la maggior parte del vostro tempo durante la configurazioneERDDAP™e più tardi mantenendo il vostroERDDAP™.

Si può vedere un esempio[datasets.xmlsu GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).
     
*    (Diversamente) Ora o (leggermente più probabile) in futuro, se si desidera modificare il file CSS di erddap, fare una copia di_tomcat_/content/erddap/images/erddapStart2.css chiamato erddap2.css e poi fare modifiche ad esso. Le modifiche a erddap2.css hanno effetto solo quandoERDDAP™è riavviato e spesso anche richiedono all'utente di cancellare i file memorizzati nella cache del browser.
     
ERDDAP™non funzionerà correttamente se il setup.xml odatasets.xmlil file non è un file XML ben formato. Quindi, dopo aver modificato questi file, è una buona idea verificare che il risultato sia ben formato XML incollando il testo XML in un checker XML come[xmlvalidazione](https://www.xmlvalidation.com/).
     
### Installare il file erddap.war{#install-the-erddapwar-file} 
4. Su Linux, Mac e Windows, scaricare[erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war)in _tomcat_/webapps .
     (versione 2.28.0, 620,824,288 byte, MD5=f948b2ba603f65a83ac67af43da9e4c2, datata 08-29-2025) 
    
Il file .war è grande perché contiene costi di alta risoluzione, confine e dati di elevazione necessari per creare mappe.
    
    \\[Sono disponibili anche alcune versioni precedenti.
    [2.1.](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551,068,245 byte, MD5=5FEA912B5D42E50EAB9591F773EA848D, datata 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551,069,844 byte, MD5=461325E97E7577EC671DD50246CCFB8B, datata 2022-02-23)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411 byte, MD5=F2CFF805893146E932E498FDDBD519B6, datata 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742,765 byte, MD5=2B33354F633294213AE2AFDDCF4DA6D0, datata 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572,124,953 byte, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, datata 2023-03-03) 
    [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568,748,187 byte, MD5=970fbee172e28b0b8a07756eecbc898e, datata 2024-06-07) 
    [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)  (592,292,039 byte, MD5=652AFC9D1421F00B5F789DA2C4732D4C, datata 2024-11-07) 
    [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)  (607,404,032 byte, MD5=99a725108b37708e5420986c16a119, datata 2025-03-31) 
    [2.27.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)  (620,554,403 byte, MD5=3b2086c659eeee4145ca2dff447bf4ef7, datata 06-11-2025) 
    \\]
    
#### ProxyPass{#proxypass} 
5. Utilizzare il proxy Passare in modo che gli utenti non devono mettere il numero di porta, ad esempio, : 8080, nell'URL.
Su computer Linux, se Tomcat è in esecuzione in Apache, si prega di modificare il Apachehttpfile d.conf (di solito in /etc/httpd/conf/) per consentire il traffico HTTP da/perERDDAP™senza richiedere il numero della porta, ad esempio : 8080, nell'URL. Come utente root:
    1. Modificare l'esistente&lt;VirtualHost&gt; tag (se c'è uno) , o aggiungere uno alla fine del file:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. Poi riavvia Apache: /usr/sbin/apachectl -k graziosa (ma a volte è in una directory diversa) .
         
### NGINX{#nginx} 
 (UNCOMMON) Se stai usando[NGINX](https://www.nginx.com/)  (un server web e un bilanciatore di carico) :
per ottenere NGINX eERDDAP™lavorare correttamente conhttps, è necessario mettere il seguente snippet all'interno del server Tomcat.xml&lt;Host&gt; blocco:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
E nel file di configurazione nginx, è necessario impostare queste intestazioni:
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Grazie a Kyle Wilcox.)   
     
### Iniziare Tomcat{#start-tomcat} 
*    (Non consiglio di usare Tomcat Web Application Manager. Se non si completamente shutdown e avvio Tomcat, prima o poi si avrà PermGen problemi di memoria.)   
     
*    (In Linux o Mac OS, se hai creato un utente speciale per eseguire Tomcat, ad esempio, tomcat, ricorda di fare i seguenti passaggi come quell'utente.)   
     
* Se Tomcat è già in esecuzione, spegnere Tomcat con (in Linux o Mac OS) _tomcat_/bin/shutdown.sh
o (in Windows) Non è vero.shutdown.bat
    
Su Linux, usare ps -ef|grep tomcat prima e dopo shutdown.sh per assicurarsi che il processo di tomcat si sia fermato. Il processo dovrebbe essere elencato prima dell'arresto e alla fine non elencato dopo l'arresto. Potrebbe volerci un minuto o due perERDDAP™per chiudere completamente. Sii paziente. O se sembra che non si fermerà da solo, usare:
uccidere -9 _processID_
    
* Inizia Tomcat con (in Linux o Mac OS) _tomcat_/bin/startup.sh
o (in Windows) _tomcat_\bin\\\startup.bat

## ÈERDDAP™Correre?{#is-erddap-running} 
Utilizzare un browser per cercare di visualizzare http://_www.YourServer.org_/erddap/status.html   
ERDDAP™si avvia senza alcun dataset caricato. I set di dati sono caricati in un thread di sfondo e quindi diventano disponibili uno per uno.

### Risoluzione dei problemi{#troubleshooting} 
* Quando una richiesta da parte di un utente entra, va a Apache (su computer Linux e Mac OS) Poi Tomcat,ERDDAP™.
* Puoi vedere cosa succede a Apache (e relativi errori) nei file di registro Apache.
*   [#](/docs/server-admin/additional-information#tomcat-logs)può vedere cosa arriva a Tomcat (e relativi errori) nei file di registro Tomcat (_tomcat_/logs/catalina.out e altri file in quella directory) .
*   [#](/docs/server-admin/additional-information#log)può vedere cosa succedeERDDAP, messaggi diagnostici daERDDAP, e messaggi di errore daERDDAP, nelERDDAP™ &lt;bigParentDirectory&gt;logs/log.txt file.
* Tomcat non iniziaERDDAP™fino a quando Tomcat ottiene una richiestaERDDAP™. Così si può vedere nei file di registro Tomcat se è iniziatoERDDAP™o se c'è un messaggio di errore relativo a quel tentativo.
* QuandoERDDAP™inizia, rinomina il vecchioERDDAP™file log.txt (logArchivedAt_CurrentTime_.txt) e crea un nuovo file log.txt. Quindi, se il registro. il file txt è vecchio, è un segno cheERDDAP™di recente non ha ricominciato.ERDDAP™scrive informazioni di registro a un buffer e scrive solo il buffer al file di registro periodicamente, ma è possibile forzareERDDAP™per scrivere il buffer al file di registro visitando .../erddap/status.html.

### Problemi: Vecchia versione diJava {#trouble-old-version-of-java} 
Se si utilizza una versione diJavache è troppo vecchio perERDDAP♪ERDDAP™non verrà eseguito e vedrai un messaggio di errore nel file di registro di Tomcat come
Eccezione nel thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Non supportato versione major.minor _someNumber_
La soluzione è quella di aggiornare alla versione più recente diJavae assicurarsi che Tomcat lo stia usando.

### Problemi: avvio lento prima volta{#trouble-slow-startup-first-time} 
Tomcat deve fare un sacco di lavoro la prima volta un'applicazione comeERDDAP™è iniziato; in particolare, deve disfare il erddap. file di guerra (che è come.zipfile) . Su alcuni server, il primo tentativo di visualizzareERDDAP™stalle (30 secondi?) fino a che questo lavoro non è finito. Su altri server, il primo tentativo fallirà immediatamente. Ma se si aspetta 30 secondi e riprovare, avrà successo seERDDAP™è stato installato correttamente.
Non c'è rimedio per questo. Questo è semplicemente il modo in cui Tomcat funziona. Ma si verifica solo la prima volta dopo che si installa una nuova versione diERDDAP™.

## Chiudi e riavvia{#shut-down-and-restart} 
In futuro, per chiudere (e riavviare)  ERDDAP, vedi[Come chiudere e riavviare Tomcat eERDDAP](/docs/server-admin/additional-information#shut-down-and-restart).
## Problemi?{#trouble} 
Problemi di installazione di Tomcat oERDDAP? Guarda la nostra[sezione per ottenere supporto aggiuntivo](/docs/intro#support).
## Notifica e-mail di nuove versioni diERDDAP {#email-notification-of-new-versions-of-erddap} 
Se si desidera ricevere un'email ogni volta che una nuova versione diERDDAP™è disponibile o altro importanteERDDAP™annunci, si può aderire alERDDAP™elenco annunci[Qui](https://groups.google.com/g/erddap-announce). Questa lista media approssimativamente una e-mail ogni tre mesi.
## Personalizzare{#customize} 
[Personalizza il tuoERDDAP™per evidenziare la vostra organizzazione (nonNOAA ERD) .](#customize)
    * Cambiare il banner che appare in cima a tuttiERDDAP™.html pagine modificando&lt;startBodyHtml5&gt; tag nel tuodatasets.xmlfile. (Se non ce n'è uno, copia il default daERDDAP'
        \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file indatasets.xmle modificarlo.) Per esempio, si potrebbe:
        * Utilizzare un'immagine diversa (il logo della vostra organizzazione) .
        * Cambia il colore di sfondo.
        * Cambiare "ERDDAP" a "_YourOrganization_'sERDDAP"
        * Modifica "Accesso più semplice ai dati scientifici" per "Accesso più semplice ai dati di _YourOrganization_".
        * Modificare i link "Brought to you by" per essere link alla vostra organizzazione e fonti di finanziamento.
    * Modificare le informazioni sul lato sinistro della home page modificando le&lt;theShortDescriptionHtml&gt; tag nel tuodatasets.xmlfile. (Se non ce n'è uno, copia il default daERDDAP'
        \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file indatasets.xmle modificarlo.) Per esempio, si potrebbe:
        * Descrivi cosa fa la tua organizzazione e/o il tuo gruppo.
        * Descrivere che tipo di dati questoERDDAP™ha.
    * Per cambiare l'icona che appare sulle schede del browser, mettere il favicon della vostra organizzazione. Ico in_tomcat_/content/erddap. Vedi[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon).
