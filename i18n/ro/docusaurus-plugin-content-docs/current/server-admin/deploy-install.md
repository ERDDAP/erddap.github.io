---
sidebar_position: 1
---

# Instalează
Cum să faceţi configurarea iniţială a ERDDAP™ pe serverul dumneavoastră

 ERDDAP™ poate rula pe orice server care suportă Java şi Tomcat (și alte servere de aplicații ca Jetty, dar noi nu le sprijinim) .
 ERDDAP™ a fost testat pe Linux (inclusiv pe Amazon AWS) , Mac, și calculatoare Windows.

*  **Docker** -- Noi oferim [ ERDDAP™ într-un recipient Docker](https://hub.docker.com/r/erddap/erddap) 
și IOOS oferă acum o [Ghid de pornire rapidă pentru ERDDAP™ într-un container Docker](https://ioos.github.io/erddap-gold-standard/index.html) .
Este standardul ERDDAP™ instalare, într-un container Docker.
Prin Docker Compozitie va oferim modalitati usoare de a configura SSL si monitorizare, citeste mai mult in afara [Documentație Docker](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Dacă utilizaţi deja Docker, probabil că veţi prefera versiunea Docker.
Dacă sunteți în căutarea de a rula pe servicii cloud va prefera, probabil, versiunea Docker.
*  **Amazon** -- Dacă instalaţi ERDDAP™ într-o instanță Amazon Web Services EC2, a se vedea acest [Amazon Web Services Prezentare generală](/docs/server-admin/additional-information#amazon) Mai întâi.
*  **Linux și Macs** -- ERDDAP™ lucrează foarte bine pe Linux și Mac calculatoare. Vezi instrucţiunile de mai jos.
*  **Ferestre** -- Windows este bine pentru testare ERDDAP™ și pentru uz personal (vezi instrucţiunile de mai jos) ,
Dar noi nu recomandăm utilizarea sa pentru public ERDDAP™ Desfășurări. Rularea ERDDAP™ pe Windows pot avea probleme:
în special, ERDDAP™ poate nu poate șterge și/sau redenumi rapid fișierele. Acest lucru este, probabil, din cauza software-ul antivirus
   (De exemplu, din McAfee și Norton) care verifică fișierele pentru viruși. Dacă dai peste această problemă
(care pot fi văzute prin mesaje de eroare în [log.txt](/docs/server-admin/additional-information#log) fișier ca
"Nu se poate șterge ..."), modificarea setărilor software-ului antivirus poate atenua parțial problema. Sau ia în considerare utilizarea unui Linux sau Mac server în schimb.

 **Standardul ERDDAP™ instrucțiuni de instalare pentru Linux, Macs, și Windows computere sunt:** 

0. Asigurați-vă că orice dependențe sunt instalate. Pe mașini de spălat vase (Linux și Mac) Ai nevoie de Csh.

##  Java  {#java} 

1.  [Pentru ERDDAP™ v2.19+, înființat Java 21.](#java) 
Din motive de securitate, este aproape întotdeauna cel mai bine să utilizați cea mai recentă versiune a Java 21.
Vă rugăm să descărcați și să instalați ultima versiune a
    [OpenJDK de adopție (Temurină) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21) .
Pentru a verifica instalarea, executați `/javaJreBinDirectory/java -versiune` , de exemplu
    `/usr/local/jdk-21.0.3+9/jre/bin/java -versiune` .

    ERDDAP™ funcționează cu Java din alte surse, dar recomandăm Admissionium, deoarece este principalul, sprijinit de comunitate,
gratuit (ca în bere și vorbire) versiunea Java 21 care oferă suport pe termen lung (upgrade-uri gratuite pentru mulți ani trecut eliberarea inițială) .
Din motive de securitate, vă rugăm să actualizați ERDDAP Versiunea Java periodic ca noi versiuni ale Java 21 devin disponibile de la Admissionium.

    ERDDAP™ a fost testat și utilizat pe scară largă cu 21, nu alte versiuni. Din diferite motive, nu testăm cu nici un suport alte versiuni ale Java .
     
## Tomcat{#tomcat} 

2.  [Configurați](#tomcat)   [Tomcat](https://tomcat.apache.org) . Tomcat este cel mai folosit Java Server de aplicații;
care este Java software care se află între serviciile de rețea ale sistemului de operare și Java server software cum ar fi ERDDAP™ .
Este software-ul gratuit și open source (FOS) .

Poţi folosi altul. Java Server de aplicații (De exemplu, Jetty) Dar îl testăm doar pe Tomcat şi îl susţinem.

   * Descărcaţi Tomcat şi despachetaţi-l pe server sau PC.
Din motive de securitate, este aproape întotdeauna cel mai bine să utilizați cea mai recentă versiune a Tomcat 10 (versiunea 9 și mai jos nu sunt acceptabile) 
care este conceput pentru a lucra cu Java 21 sau mai nou. Mai jos, directorul Tomcat va fi menționat ca `Tomcat` .

Avertizare&#33; Dacă aveți deja un Tomcat care rulează alte aplicații web (în special THREDDS) Vă recomandăm să instalaţi ERDDAP™ în
      [un al doilea Tomcat](/docs/server-admin/additional-information#second-tomcat) , pentru că ERDDAP™ are nevoie de diferite setări Tomcat
și nu ar trebui să se confrunte cu alte aplicații pentru memorie.

     * Pe Linux, [descarca "Core" "tar" .gz " Distribuţia Tomcat](https://tomcat.apache.org/download-10.cgi) Şi despacheteaz-o.
Vă recomandăm despachetarea în `/usr/local` .
     * Pe un Mac, Tomcat este, probabil, deja instalat în `/Library/Tomcat` , dar ar trebui să-l actualizeze la ultima versiune a Tomcat 10.
Dacă îl descărcați, [descarca "Core" "tar" .gz " Distribuţia Tomcat](https://tomcat.apache.org/download-10.cgi) şi despachetează `/Library/Tomcat` .
     * Pe Windows, puteți [descarca distributia "Core" "zip" Tomcat](https://tomcat.apache.org/download-10.cgi) 
        (care nu se pune cu regiștrii Windows și pe care le controlați dintr-o linie de comandă DOS) și despachetați-l într-un director adecvat.
        (Pentru dezvoltare, folosim distribuţia "zip." Facem o `/programuri` directorul și despachetați-l acolo.) 
Sau puteți descărca distribuția "Core" "64-bit Windows zip," care include mai multe caracteristici.
Dacă distribuția este un instalator Windows, acesta va pune, probabil, Tomcat în, de exemplu, `/Program Files/apache-tomcat-10.0.23` .
             
### server.xml{#serverxml} 

*  [server.xml](#serverxml) - În `tomcat/conf/server.xml` fișier, există două modificări pe care ar trebui să facă la fiecare dintre cele două ` <Connector> ` etichete
   (unul pentru `&lt;Connector port="8080"` şi una pentru `&lt;Conector port="8443"` ) .
   1.  (Recomandat) Creştere `conexiune Pauză` valoarea parametrilor, poate până la 300000 (milisecunde, adică 5 minute.) .
   2.  (Recomandat) Adaugă un nou parametru: `relaxatQueryChars="[] | "` . Acest lucru este opțional și ușor mai puțin sigur,
dar elimină necesitatea utilizatorilor de a codifica la sută aceste caractere atunci când acestea apar în parametrii unui URL cerere de utilizator.
             
### conţinut. xml{#contentxml} 

* context. xml -- Resurse Cache - In `tomcat/conf/context.xml` , chiar înainte de ` </Context> ` tag, schimba eticheta Resurse
   (sau adauga daca nu este deja acolo) pentru a seta cache Parametru MaxSize la 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Acest lucru evită numeroase avertismente în Catalina. cu care toate încep cu
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Pache Timeout{#apache-timeout} 

* Pe calculatoarele Linux, modificați setările timeout Apache astfel încât cererile utilizatorilor consumatoare de timp nu timeout
   (cu ceea ce apare adesea ca o eroare "Proxy" sau "Bad Gateway") . Ca utilizator rădăcină:
  * Modificaţi apaşii ` http d.conf` fișier (de obicei în `/etc/ http d/conf/` ) :
    * Schimbare existentă ` <Timeout> ` setare (sau adăugați unul la sfârșitul fișierului) până la 3600 (secunde) , în loc de 60 sau 120 secunde implicite.
    * Schimbare existentă ` <ProxyTimeout> ` setare (sau adăugați unul la sfârșitul fișierului) până la 3600 (secunde) , în loc de 60 sau 120 secunde implicite.
  * Restart Apache: `/usr/sbin/apachectl - K graţios`   (dar uneori este într-un alt director) .

### Securitatea{#security} 
         
* Recomandare de securitate: Vezi? [aceste instrucţiuni](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) creșterea securității
instalarea Tomcat, în special pentru servere publice.
         
* Pentru public ERDDAP™ instalații pe Linux și Macs, este cel mai bine pentru a configura Tomcat (programul) ca aparținând utilizatorului `Tomcat` 
   (un utilizator separat cu permisiuni limitate și care [nu are parolă](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Astfel, doar super-utilizatorul poate trece la acţionarea ca utilizator `Tomcat` . Acest lucru face imposibil pentru hackeri să se logheze la server ca utilizator `Tomcat` .
Și, în orice caz, ar trebui să-l facă astfel încât `Tomcat` utilizatorul are permisiuni foarte limitate pe sistemul de fișiere al serverului (citește+scriere+execute privilegii
pentru `apache-tomcat` arbore director și ` <bigParentDirectory> ` și privilegii de citire numai pentru directoare cu date care ERDDAP™ necesită acces la).
  * Puteți crea `Tomcat` cont utilizator (care nu are parolă) prin utilizarea comenzii:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Puteți trece la lucrul ca utilizator `Tomcat` prin utilizarea comenzii
    ```
    sudo su - tomcat
    ```
     (Acesta vă va cere parola super-utilizator pentru permisiunea de a face acest lucru.) 
    * Puteți opri lucrul ca Tomcat utilizator prin utilizarea comenzii
    ```
    exit
    ````
    * Face cele mai multe dintre restul Tomcat și ERDDAP™ instrucțiuni de configurare ca utilizator `Tomcat` . Mai târziu, rulați `Pornire.sh` şi `Oprire. sh` scripturi ca utilizator `Tomcat` 
astfel încât Tomcat are permisiunea de a scrie la fișierele sale jurnal.
    * După despachetarea Tomcat, de la părintele `apache-tomcat` director:
      * Schimba proprietatea de copac director apache-tomcat la utilizatorul Tomcat.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (dar înlocuiți numele real al directorului dvs. Tomcat) .
      * Schimbă "grupul" pentru a fi Tomcat, numele de utilizator, sau numele unui grup mic care include Tomcat și toți administratorii Tomcat / ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Schimbați permisiunile astfel încât Tomcat și grupul să citească, să scrie, să execute privilegii:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Eliminați permisiunile utilizatorului "altul" pentru a citi, scrie sau executa:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Acest lucru este important, deoarece împiedică alţi utilizatori să citească informaţii sensibile în ERDDAP™ fișiere de configurare.

### Memorie{#memory} 

Setează variabilele de mediu ale Tomcat

* Pe Linux şi Macs:
Creează un fișier `Tomcat/bin/setenv.sh`   (sau în Red Hat Enterprise Linux \\[ RHEL \\] , editează `~tomcat/conf/tomcat10.conf` ) pentru a seta variabilele de mediu Tomcat.
Acest fișier va fi utilizat de către `Tomcat/bin/startup.sh` şi `Oprire. sh` . Fișierul ar trebui să conțină ceva de genul:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (dar înlocuiți numele de director de pe computer) .
   (Dacă aţi stabilit anterior `JRE_HOME` , puteți elimina asta.) 
Pe Macs, probabil că nu trebuie să setați `JAVA_HOME` .

* Pe Windows:
Creează un fișier `tomcat\bin\\setenv.bat` pentru a seta variabilele de mediu Tomcat.
Acest fișier va fi utilizat de către `tomcat\bin\\startup.bat` şi ` shutdown.bat ` .
Fișierul ar trebui să conțină ceva de genul:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (dar înlocuiți numele de director de pe computer) .
În cazul în care acest lucru este doar pentru testarea locală, eliminați "server."
   (Dacă aţi stabilit anterior `JRE_HOME` , puteți elimina asta.) 

ă `-Xmx` şi `-Xms` setările de memorie sunt importante deoarece ERDDAP™ funcţionează mai bine cu mai multă memorie.
Întotdeauna setat `-Xms` la aceeași valoare ca `-Xmx` .

* Pentru 32 biți Sisteme de operare și 32 biți Java :
64 biți Java e mult mai bun decât 32 bit Java , dar 32 bit Java va lucra atâta timp cât serverul nu este foarte ocupat.
Cu cât mai multă memorie fizică în server, cu atât mai bine: 4+ GB este foarte bun, 2 GB este în regulă, mai puțin nu este recomandat.
Cu 32 biți Java , chiar și cu memorie fizică abundentă, Tomcat și Java Nu va rula dacă încercați să setați `-Xmx` mult peste 1500M (1200M pe unele calculatoare) .
Dacă serverul dumneavoastră are mai puțin de 2GB de memorie, reduceți `-Xmx` valoare (în 'M'egaBytes) la 1/2 din memoria fizică a computerului.

* Pentru 64 biți Sisteme de operare și 64 biți Java :
64 biți Java va funcţiona doar pe un sistem de operare de 64 de biţi.
  * Cu Java 8, trebuie să adăugați `-d64` la Tomcat `CATALINA_OPTS` parametru în `setenv.bat` .
  * Cu Java 21, tu alegi 64 bit Java atunci când descărcați o versiune de Java marcat "64 bit."

Cu 64 biți Java , Tomcat și Java poate folosi foarte mare `-Xmx` şi `-Xms` Setări. Cu cât mai multă memorie fizică în server, cu atât mai bine.
Ca o sugestie simplistă: vă recomandăm să setați `-Xmx` şi `-Xms` la (în 'M'egaBytes) până la 1/2 (sau mai puțin) a memoriei fizice a computerului.
Puteți vedea dacă Tomcat, Java , și ERDDAP™ sunt într-adevăr rulează în modul 64 bit prin căutarea pentru " bit," în ERDDAP E-mailul Daily Report
sau în `BigParentDirector/loguri/ [log.txt](/docs/server-admin/additional-information#log) ` fișier ( `Big ParentDirectory` este specificat în [setup.xml](#setupxml) ) .

#### Colecţia de gunoi{#garbage-collection} 

* În ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) fișier, veți vedea multe "GC (Eșec al alocării) "mesaje.
De obicei nu e o problemă. Este un mesaj frecvent de la un operator normal Java Spunând că tocmai a terminat un gunoi minor
Colecţia a rămas fără spaţiu în Eden. (secţiunea Java morman pentru obiecte foarte tinere) . De obicei, mesajul vă arată
   `memoryUse before-&gt;memoryUseAfter` . Dacă cele două numere sunt apropiate, înseamnă că colecţia de gunoi nu a fost productivă.
Mesajul este doar un semn de probleme dacă este foarte frecvent (la fiecare câteva secunde) , nu productive, și numerele sunt mari și nu în creștere,
care împreună indică faptul că Java are nevoie de mai multă memorie, se luptă pentru a elibera memoria, și este incapabil să elibereze memoria.
Acest lucru se poate întâmpla într-un timp stresant, apoi pleacă. Dar dacă persistă, acesta este un semn de probleme.
* Dacă vezi `java.lang.OutofMemoryError` ai ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) fișier;
Vezi? [OutofMemoryError](/docs/server-admin/additional-information#outofmemoryerror) pentru sfaturi despre cum să diagnosticheze și să rezolve problemele.
         
### Permisiuni{#permissions} 

*  [Pe Linux şi Macs, schimba permisiunile](#permissions) dintre toate `*.sh` fișiere în `Tomcat/bin/` să fie executabil de către proprietar:
  ```
  chmod +x *.sh
  ```

### Fonturi{#fonts} 

*  [Fonturi pentru imagini:](#fonts) Noi îi preferăm pe cei liberi [Fonturi DejaVu](https://dejavu-fonts.github.io/) la celălalt Java fonturi.
Folosind aceste fonturi este puternic recomandat, dar nu este necesar.

Dacă alegeți să nu utilizați fonturile DejaVu, trebuie să modificați setarea fontuluiFamily în setup.xml la ` <fontFamily> SansSerif </fontFamily> ` ,
care este disponibil cu toate Java Distribuţii. Dacă setați ` <fontFamily> ` la numele unui font care nu este disponibil; ERDDAP™ Nu se încarcă.
și va imprima o listă de fonturi disponibile în `log.txt` Dosar. Trebuie să utilizați unul dintre aceste fonturi.

Dacă alegeți să utilizați fonturile DejaVu, asigurați-vă că ` <fontFamily> ` setarea în setup.xml este ` <fontFamily> DejaVu Sans </fontFamily> ` .

Pentru a instala fonturile DejaVu, vă rugăm să descărcați [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5,522,795 octeți, MD5=33E1E61FAB06A547851ED308B4FFEF42) 
și deschide fișierele fontului într-un director temporar.

  * Pe Linux:
    * Pentru Linux adoptium Java distribuţii, vezi [aceste instrucţiuni](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Cu altele Java distribuţii: Ca `Tomcat` utilizator, copiați fișierele fontului în `$JAVA_HOME/lib/fonts` Deci... Java poate găsi fonturile.
Amintiți-vă: dacă / atunci când upgrade mai târziu la o versiune mai nouă a Java Trebuie să reinstalezi aceste fonturi.
  * Pe Macs: pentru fiecare fișier de font, faceți dublu clic pe el și apoi faceți clic pe Install Font.
  * Pe Windows 7 și 10: în Windows Explorer, selectați toate fișierele de font. Clic dreapta. Click pe Install.
             
### Testează Tomcat{#test-tomcat} 

* Testați instalarea Tomcat.
  * Linux:
    * Ca utilizator "Tomcat," executați `Tomcat/bin/startup.sh` .
    * Vizualizați URL-ul + ":8080/" în browser (de exemplu, [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac (rulează tomcat ca utilizator administrator de sistem) :
    * Fugi&#33; `Tomcat/bin/startup.sh` .
    * Vizualizați URL-ul + ":8080/" în browser (de exemplu, [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Rețineți că în mod implicit, Tomcat dvs. este accesibil doar de tine. Nu este accesibil publicului.
  * Windows localhost:
    * Faceţi clic dreapta pe pictograma Tomcat în tava de sistem, şi alegeţi "Start service."
    * Vizualizare [http://127.0.0.1:8080/](http://127.0.0.1:8080/) , sau poate [http://localhost:8080/](http://localhost:8080/) În browser. Rețineți că în mod implicit, Tomcat dvs. este accesibil doar de tine. Nu este accesibil publicului.

Ar trebui să vezi pagina Tomcat "Felicitări."

Dacă există probleme, consultați fișierul jurnal Tomcat la `Tomcat/logs/catalina.out` .

### Probleme cu instalarea Tomcat?{#troubles-with-the-tomcat-installation} 

* Pe Linux și Mac, dacă nu puteți ajunge la Tomcat sau ERDDAP™   (sau poate că nu poţi ajunge la ele dintr-un computer din afara firewall-ului tău.) ,
Puteţi testa dacă Tomcat ascultă portul 8080, tastând (ca rădăcină) pe o linie de comandă a serverului:

  ```
  netstat -tuplen | grep 8080
  ```

Asta ar trebui să întoarcă o linie cu ceva de genul:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (unde `#` este o anumită cifră) , indicând faptul că `java` proces (Probabil Tomcat.) ascultă portul "8080" pentru traficul "tcp."
Dacă nu au fost returnate linii, dacă linia returnată este semnificativ diferită, sau dacă două sau mai multe linii au fost returnate, atunci poate exista o problemă cu setările portului.

* A se vedea fișierul jurnal Tomcat `Tomcat/logs/catalina.out` . Probleme Tomcat și unele ERDDAP™ problemele de pornire sunt aproape întotdeauna indicate acolo.
Acest lucru este comun atunci când sunteți prima configurare ERDDAP™ .

* Vezi [Tomcat](https://tomcat.apache.org/) site-ul sau căutați web pentru ajutor, dar vă rugăm să ne anunțați problemele pe care le-ați avut și soluțiile găsite.

* A se vedea noastre [secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support) .
             
###  ERDDAP™ Conţinut{#erddap-content} 
3.   [Aranjează `Tomcat/content/erddap` fișiere de configurare.](#erddap-content) 
Pe Linux, Mac și Windows, descărcați [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip) 
şi desface-l în `Tomcat` director, creare `Tomcat/content/erddap` .

__Versiunea 1,0.1, 20683 bytes, MD5=98a8099e7e674da59fe35e9c96efa7b5, din 2025-06-02__

Unele versiuni anterioare sunt de asemenea disponibile:

    *  [2, 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, din 2022-02-16) 
    *  [2, 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, din 2022-02-16) 
    *  [2, 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 octeți, MD5=1E26F62E7A061911EE68C40B9A29362, din 2022-10-09) 
    *  [2, 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 octeți, MD5=1E26F62E7A061911EE68C40B9A29362, din 2022-12-08) 
    *  [2, 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 octeți, MD5=1E26F62E7A061911EE68C40B9A29362, din 2023-02-27) 

#### Alt director{#other-directory} 

Pentru Red Hat Enterprise Linux (RHEL) sau pentru alte situații în care nu sunt permise pentru a modifica directorul Tomcat sau în cazul în care doriți / nevoie
pentru a pune ERDDAP™ director de conținut în altă locație dintr-un alt motiv (De exemplu, dacă utilizați Jetty în loc de Tomcat) ,
dezactivează `erddapContent .zip ` în directorul dorit (la care numai `Tomcat` utilizatorul are acces) şi setaţi ` erddapContentDirectory ` proprietatea sistemului
 (De exemplu: ` erddapContentDirectory  =~tomcat/content/erddap ` ) Deci... ERDDAP™ poate găsi acest nou dosar de conținut.

### setup.xml{#setupxml} 

*  [Citiţi comentariile din `tomcat/content/erddap/setup.xml` ](#setupxml) și să facă modificările solicitate. setup.xml este fișierul cu toate setările care specifică modul în care ERDDAP™ Se poartă frumos.

Pentru configurarea inițială, trebuie cel puțin să modificați aceste setări:
      *  ` <bigParentDirectory> ` 
      *  ` <emailEverythingTo> ` 
      *  ` <baseUrl> ` 
      *  ` <email...> ` configurări
      *  ` <admin...> ` configurări
      *  ` <baseHttpsUrl> `   (atunci când configurați https ) 

Când creați mare ParentDirectory, din directorul părinte al BigParentDirectory:

    * Face `Tomcat` utilizator proprietarul `Big ParentDirectory` :
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Schimbă "grupul" pentru a fi Tomcat, numele de utilizator, sau numele unui grup mic care include Tomcat și toți administratorii Tomcat / ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Schimbați permisiunile astfel încât Tomcat și grupul să citească, să scrie, să execute privilegii:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Eliminați permisiunile utilizatorului "altul" pentru a citi, scrie sau executa. Acest lucru este important pentru a preveni citirea, eventual, informații sensibile
în ERDDAP™ jurnalizează fișiere și fișiere cu informații despre seturile de date private.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Variabile de mediu{#environment-variables} 

Începând cu ERDDAP™ v2.13; ERDDAP™ administratorii pot suprascrie orice valoare în setup.xml prin specificarea unei variabile de mediu
nume ` ERDDAP _Numele valorii` înainte de rulare ERDDAP™ . De exemplu, utilizarea ` ERDDAP _baseUrl` suprascrie ` <baseUrl> ` valoare.
Acest lucru poate fi util atunci când se desfășoară ERDDAP™ cu un container ca Docker, așa cum puteți pune setările standard în setup.xml
și apoi să furnizeze setări speciale prin variabile de mediu. Dacă furnizați informații secrete ERDDAP™ prin această metodă,
asigurați-vă că pentru a verifica dacă informațiile vor rămâne secrete. ERDDAP™ citeste doar variabile de mediu o data pe pornire,
în prima secundă de pornire, astfel încât o modalitate de a utiliza acest lucru este: setați variabilele de mediu, începe ERDDAP ,
Asteapta pana ERDDAP™ este pornit, apoi se destabilizează variabilele de mediu.

###  datasets.xml  {#datasetsxml} 

* Citiţi comentariile din [ **Lucrul cu datasets.xml Fișier** ](/docs/server-admin/datasets) . Mai târziu, după ce te ERDDAP™ rulează
pentru prima dată (de obicei cu doar seturile de date implicite) , veți modifica XML în `Tomcat/content/erddap/ datasets.xml ` 
pentru a specifica toate seturile de date pe care doriți dumneavoastră ERDDAP™ pentru a servi. Aici îţi vei petrece majoritatea timpului.
în timp ce se instituie ERDDAP™ și mai târziu în timp ce menținerea dumneavoastră ERDDAP™ .

Puteți vedea un exemplu [ datasets.xml privind GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Puţin probabil.) Acum sau (ușor mai probabil) în viitor, dacă doriți să modificați fișierul CSS erddap, copia
   `tomcat/content/erddap/images/erddapStart2.css` la `Tomcat/content/erddap/images/erddap2.cs` şi apoi să facă schimbări.
Modificări la `erddap2.css` să aibă efect numai atunci când ERDDAP™ este repornit și adesea solicită utilizatorului să curețe fișierele cache ale browser-ului.
     
 ERDDAP™ nu va funcționa corect dacă setarea.xml sau datasets.xml fișierul nu este un fișier XML bine format. Deci, după ce editați aceste fișiere,
este o idee bună pentru a verifica dacă rezultatul este bine format XML prin lipirea textului XML într-un checker XML ca [Validare xml](https://www.xmlvalidation.com/) .
     
### Instalați Erddap. fișier război{#install-the-erddapwar-file} 

4. Pe Linux, Mac și Windows, __download [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.29.0/erddap.war) __ în `Tomcat/Webapps` :

__Versiunea 2.29.0, 706,788.135 bytes, MD5=A5ED0DCC8D46CA27640FFEB8CE4A8560, datată 12-15-2025__

Fișierul .war este mare, deoarece conține date de coastă de înaltă rezoluție, limită, și elevație necesare pentru a crea hărți.

Unele versiuni anterioare sunt de asemenea disponibile.

   *  [2, 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 octeți, MD5=50FEA912B5D42E50EAB9591F773EA848D, din 2022-02-16) 
   *  [2, 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 octeți, MD5=461325E97E7577EC671DD50246CCF8B, din 2022-02-23) 
   *  [2, 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 octeți, MD5=F2CFF805893146E932E498FDDBD519B6, din 2022-10-09) 
   *  [2, 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 octeți, MD5=2B33354F633294213AE2AFDDCF4DA6D0, din 2022-12-08) 
   *  [2, 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, datat 2023-03-03) 
   *  [2, 24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 bytes, MD5=970fbee172e28b0b8a07756eecbc898e, datat 2024-06-07) 
   *  [2, 25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 octeți, MD5=652AFC9D1421F00B5F789DA2C4732D4C, din 2024-11-07) 
   *  [2, 26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 octeți, MD5=99a725108b37708e5420986c16a119, din 2025-03-31) 
   *  [2, 27, 0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554 403 octeți, MD5=3b2086c659eee4145ca2dff447bf4ef7, din 2025-06-11) 
   *  [2, 28, 1](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war)   (622,676,238 octeți, MD5=48b4226045f950c8a8d69ef9521b9bc9, din 2025-09-05) 

### Configurează proxy (implementare specifică)  {#proxy} 

 ERDDAP™ este de obicei implementat în spatele unui proxy invers al webserver pentru a permite ca acesta să fie servit pe porturile HTTP standard (80 și 443) .
Terminarea SSL/TLS este adesea înclinată la stratul proxy webserver, de asemenea. Specificaţiile depind de cerinţele fiecărei desfăşurari.

#### Apache{#apache} 

1. Asigurați-vă că `mod_proxy` şi `Mod_proxy_ http ` sunt încărcate:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Modificare ` <VirtualHost> ` etichetă (dacă există una) , sau se adaugă unul la sfârșitul fișierului:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Dacă ERDDAP™ este servit pe o altă cale decât `/erddap` , de asemenea, setați `Prefixul X` antetul către
segment de cale _înainte_ `/erddap` . Acest cadru ar fi adecvat pentru ERDDAP™ servit la
 `/subpat/erddap` :

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Apoi reporniți Apache: `/usr/sbin/apachectl - K graţios`   (dar uneori este într-un alt director) .
         
#### NGINX{#nginx} 

În fișierul de configurare Nginx, setați aceste antete:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Dacă ERDDAP™ este servit pe o altă cale decât `/erddap` , de asemenea, setați `Prefixul X` antetul către
segment de cale _înainte_ `/erddap` . Acest cadru ar fi adecvat pentru ERDDAP™ servit la
 `/subpat/erddap` :

```
proxy_set_header X-Forwarded-Prefix /subpath
```


Pentru a obține NGINX și ERDDAP™ funcţionează corect cu https , aveți nevoie pentru a pune următorul fragment în serverul Tomcat.xml ` <Host> ` bloc:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Începe Tomcat{#start-tomcat} 

*  (Nu recomand utilizarea Tomcat Web Application Manager. Dacă nu închideți complet și porniți Tomcat, mai devreme sau mai târziu veți avea probleme de memorie PermGen.) 
*  (În Linux sau Mac OS, dacă ați creat un utilizator special pentru a rula Tomcat, de exemplu, Tomcat, amintiți-vă să faceți următorii pași ca acel utilizator.) 
* Dacă Tomcat este deja difuzate, închide Tomcat cu (în Linux sau Mac OS)   `Tomcat/bin/shutdown.sh` 
sau (în Windows)   `Tomcat\bin\\ shutdown.bat ` 

Pe Linux, utilizați `ps -ef | grep tomcat` înainte şi după `Oprire. sh` pentru a vă asigura că procesul Tomcat sa oprit.
Procesul ar trebui să fie listat înainte de închidere și în cele din urmă nu a fost listat după închidere.
Acesta poate dura un minut sau două pentru ERDDAP™ să se închidă complet. Ai răbdare. Sau dacă arată ca şi cum nu s-ar opri singur, foloseşte:
   `ucide -9 <processID> ` 
* Începe cu Tomcat (în Linux sau Mac OS)   `Tomcat/bin/startup.sh` sau (în Windows)   `tomcat\bin\\startup.bat` 

## Este ERDDAP™ Să alerg?{#is-erddap-running} 

Utilizați un browser pentru a încerca să vizualizațihttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ începe fără să fie încărcate seturile de date. Seturile de date sunt încărcate într-un fir de fundal și astfel devin disponibile unul câte unul.

### Depanare{#troubleshooting} 

* Când o cerere de la un utilizator vine în, merge la Apache (pe Linux și Mac OS calculatoare) , apoi Tomcat, apoi ERDDAP™ .
* Puteți vedea ce vine la Apache (și erorile aferente) în fișierele de jurnal Apache.
*    [Tu](/docs/server-admin/additional-information#tomcat-logs) poate vedea ce vine la Tomcat (și erorile aferente) 
în fișierele jurnal Tomcat ( `Tomcat/logs/catalina.out` și alte fișiere din acel director) .
*    [Tu](/docs/server-admin/additional-information#log) poate vedea ce vine la ERDDAP , mesaje de diagnosticare de la ERDDAP ,
și mesaje de eroare de la ERDDAP , în ERDDAP™   ` <bigParentDirectory> /logs/log.txt` Dosar.
* Tomcat nu începe. ERDDAP™ până când Tomcat primeşte o cerere pentru ERDDAP™ . Deci, puteți vedea în fișierele jurnal Tomcat dacă
început ERDDAP™ sau dacă există un mesaj de eroare legat de această încercare.
* Când ERDDAP™ Începe, redenumeşte vechiul ERDDAP™ fișier log.txt ( `logArchivedAt <CurrentTime> .txt` ) și creează un nou fișier log.txt.
Deci, dacă `log.txt` fişierul este vechi, este un semn că ERDDAP™ nu a reluat recent. ERDDAP™ scrie informații jurnal la un tampon
și scrie tampon la fișierul jurnal periodic, dar puteți forța ERDDAP™ pentru a scrie tampon la fișierul jurnal prin vizitare
     ` /erddap/status.html ` .

### Probleme: Vechea versiune a Java  {#trouble-old-version-of-java} 

Dacă utilizaţi o versiune de Java care este prea vechi pentru ERDDAP , ERDDAP™ nu va rula și veți vedea un mesaj de eroare în fișierul jurnal Tomcat ca

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

Soluţia este de a actualiza la cea mai recentă versiune a Java şi asigură-te că Tomcat îl foloseşte.

### Probleme: Startup lent prima dată{#trouble-slow-startup-first-time} 

Tomcat trebuie să facă o mulțime de muncă prima dată o aplicație ca ERDDAP™ a început; în special, trebuie să despacheteze `erddap.war` fișier
 (care este ca o .zip fișier) . Pe unele servere, prima încercare de a vizualiza ERDDAP™ standuri (30 de secunde?) până când această lucrare se va termina.
Pe alte servere, prima încercare va eşua imediat. Dar dacă aştepţi 30 de secunde şi încerci din nou, va reuşi dacă ERDDAP™ a fost instalat corect.

Nu există nicio soluţie pentru asta. Aşa lucrează Tomcat. Dar apare doar prima dată după ce instalaţi o nouă versiune de ERDDAP™ .

## Închideți și reporniți{#shut-down-and-restart} 

În viitor, pentru a închide (și reporniți)   ERDDAP™ , vezi [Cum să se închidă și să repornească Tomcat și ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Probleme?{#trouble} 

Probleme de instalare Tomcat sau ERDDAP™ ? A se vedea noastre [secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support) .

## Notificarea prin e-mail a noilor versiuni ale ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Dacă doriți să primiți un e-mail ori de câte ori o nouă versiune a ERDDAP™ este disponibil sau alte importante ERDDAP™ anunțuri;
te poţi alătura ERDDAP™ lista anunțurilor [Aici.](https://groups.google.com/g/erddap-announce) . Această listă medie aproximativ un e-mail la fiecare trei luni.

## Personalizează{#customize} 

*  [Personalizează ERDDAP™ pentru a evidenția organizația dumneavoastră (nu NOAA   ERD ) .](#customize) 
* Schimbă bannerul care apare în vârful tuturor ERDDAP™ Pagini .html prin editarea ` <startBodyHtml5> ` tag-ul în dumneavoastră ` datasets.xml ` Dosar.
(Dacă nu există unul, copiați implicit de la ERDDAP™ 's `Tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` fișier
în ` datasets.xml ` și editați-l.) De exemplu, ai putea:
  * Folosește o imagine diferită (și anume, logo-ul organizației dumneavoastră) .
  * Schimbă culoarea de fundal.
  * Schimbare " ERDDAP™ " to "_YourOrganization_'s ERDDAP™ "
  * Modificați "acces mai ușor la date științifice" la "acces mai ușor la datele _Organizarea_ ta."
  * Schimbați link-urile "Adus la tine de" pentru a fi link-uri către organizația și sursele de finanțare.
* Modificarea informaţiilor pe partea stângă a paginii de start prin editarea ` <theShortDescriptionHtml> ` tag-ul în dumneavoastră ` datasets.xml ` Dosar.
(Dacă nu există unul, copiați implicit de la ERDDAP™ 's `Tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` fișier
în ` datasets.xml ` și editați-l.) De exemplu, ai putea:
  * Descrieți ce face organizația și/sau grupul dumneavoastră.
  * Descrie ce fel de date sunt acestea ERDDAP™ Are.
  * Pentru a schimba pictograma care apare pe file browser, pune favicon organizației dumneavoastră. ico in `Tomcat/content/erddap/images/` .
Vezi?https://en.wikipedia.org/wiki/Favicon.
