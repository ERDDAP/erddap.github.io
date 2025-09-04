---
sidebar_position: 1
---

# Instalează
Cum să faceţi configurarea iniţială a ERDDAP™ pe serverul dumneavoastră

 ERDDAP™ poate rula pe orice server care suportă Java şi Tomcat (și alte servere de aplicații ca Jetty, dar noi nu le sprijini) .
 ERDDAP™ a fost testat pe Linux (inclusiv pe Amazon AWS) Mac şi Windows.

*  **Docker** -- Noi oferim [ ERDDAP™ într-un recipient Docker](https://hub.docker.com/r/erddap/erddap) 
și IOOS oferă acum un [Ghid de pornire rapidă pentru ERDDAP™ într-un container Docker](https://ioos.github.io/erddap-gold-standard/index.html) .
Este standardul ERDDAP™ instalare, într-un container Docker.
Prin Docker Compozitie va oferim modalitati usoare de a configura SSL si de monitorizare, citeste mai mult in afara [Documentație Docker](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Dacă utilizaţi deja Docker, probabil că veţi prefera versiunea Docker.
Dacă sunteți în căutarea de a rula pe servicii cloud va prefera, probabil, versiunea Docker.
*  **Amazon** -- Dacă instalaţi ERDDAP™ într-o instanță Amazon Web Services EC2, a se vedea acest [Amazon Web Services Prezentare generală](/docs/server-admin/additional-information#amazon) Mai întâi.
*  **Linux și Macs** -- ERDDAP™ Lucrează foarte bine pe Linux și Mac calculatoare. Vezi instrucţiunile de mai jos.
*  **Ferestre** -- Windows este bine pentru testare ERDDAP™ și pentru uz personal (vezi instrucţiunile de mai jos) ,
Dar noi nu recomandăm utilizarea pentru public ERDDAP™ Desfășurări. Rularea ERDDAP™ pe Windows pot avea probleme:
în special, ERDDAP™ poate nu poate șterge și/sau redenumi rapid fișierele. Acest lucru este, probabil, din cauza software-ului antivirus
   (De exemplu, din McAfee și Norton) care verifică fișierele pentru viruși. Dacă dai peste această problemă
(care poate fi văzut prin mesaje de eroare în [log.txt](/docs/server-admin/additional-information#log) fișier ca
"Nu se poate șterge ..."), modificarea setărilor software-ului antivirus poate atenua parțial problema. Sau ia în considerare utilizarea unui Linux sau Mac server în schimb.

 **Standardul ERDDAP™ instrucțiuni de instalare pentru Linux, Macs, și Windows computere sunt:** 

0. Asigurați-vă că orice dependențe sunt instalate. Pe mașini fără ferestre (Linux și Mac) Ai nevoie de Csh.

##  Java  {#java} 

1.  [Pentru ERDDAP™ v2.19+, înființat Java 21.](#java) 
Din motive de securitate, este aproape întotdeauna cel mai bine să utilizați cea mai recentă versiune a Java 21.
Vă rugăm să descărcați și să instalați cea mai recentă versiune a
    [OpenJDK de adopție (Temurină) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21) .
Pentru a verifica instalarea, executați 
ا/usr/local/jdk-21.0.3+9/jre/bin/java - Versiuni.

    ERDDAP™ lucrează cu Java din alte surse, dar recomandăm Admissionium, deoarece este principalul, sprijinit de comunitate,
liber (ca în bere și vorbire) versiunea Java 21 care oferă suport pe termen lung (upgrade-uri gratuite pentru mulți ani trecut eliberarea inițială) .
Din motive de securitate, vă rugăm să actualizați ERDDAP Versiunea Java periodic ca noi versiuni ale Java 21 devin disponibile de la Adoptatium.

    ERDDAP™ a fost testat și utilizat extensiv cu 21, nu alte versiuni. Din diferite motive, nu testăm cu nici un suport alte versiuni ale Java .
     
## Tomcat{#tomcat} 

2.  [Configurați](#tomcat)   [Tomcat](https://tomcat.apache.org) . Tomcat este cel mai folosit Java Server de aplicații;
care este Java software care se află între serviciile de rețea ale sistemului de operare și Java server software cum ar fi ERDDAP™ .
Este Free and Open Source Software (FOS) .

Poţi folosi altul. Java Server de aplicații (De exemplu, Jetty) Dar îl testăm doar pe Tomcat.

   * Descărcaţi Tomcat şi despachetaţi-l pe server sau PC.
Din motive de securitate, este aproape întotdeauna cel mai bine să utilizați cea mai recentă versiune a Tomcat 10 (versiunea 9 și mai jos nu sunt acceptabile) 
care este conceput pentru a lucra cu Java 21 sau mai nou. Mai jos, directorul Tomcat va fi menționat ca "tomcat."

Ai grijă&#33; Dacă aveți deja un Tomcat care rulează alte aplicații web (în special THREDDS) Vă recomandăm să instalaţi ERDDAP™ în
      [un al doilea Tomcat](/docs/server-admin/additional-information#second-tomcat) , pentru că ERDDAP™ are nevoie de diferite setări Tomcat
și nu ar trebui să se confrunte cu alte aplicații pentru memorie.

     * Pe Linux, [descărcare "Core" "tar" .gz " Distribuţia Tomcat](https://tomcat.apache.org/download-10.cgi) Şi despacheteaz-o.
Vă recomandăm să-l despachetați în 
     * Pe un Mac, Tomcat este, probabil, deja instalat în 
Dacă îl descărcați, [descărcare "Core" "tar" .gz " Distribuţia Tomcat](https://tomcat.apache.org/download-10.cgi) și despachetați-l în 
     * Pe Windows, puteți [descarca distributia "Core" "zip" Tomcat](https://tomcat.apache.org/download-10.cgi) 
        (care nu se pune cu regiștrii Windows și pe care le controlați de la o linie de comandă DOS) și despachetați-l într-un director adecvat.
        (Pentru dezvoltare, folosim distribuţia "Core" "zip." Facem un program şi îl despachetăm acolo.) 
Sau puteți descărca distribuția "Core" "64-bit Windows zip," care include mai multe caracteristici.
În cazul în care distribuția este un instalator Windows, acesta va pune, probabil, Tomcat în, de exemplu, fişiere de programe / apache-tomcat-10.0.23
             
### server.xml{#serverxml} 

*  [server.xml](#serverxml) - În fişierul  <Connector> Tags
   (unul pentru port ) .
   1.  (Recomandat) Creșteți valoarea parametrului temporizare, poate până la (milisecunde, adică 5 minute.) .
   2.  (Recomandat) Adăugaţi un nou parametru: | " Acest lucru este opțional și ușor mai puțin sigur,
dar elimină necesitatea utilizatorilor de a codifica la sută aceste caractere atunci când acestea apar în parametrii unui URL cerere de utilizator.
             
### conţinut. xml{#contentxml} 

* context. xml -- Resursa Cache - În  </Context> Tag-ul, modifica eticheta Resurse
   (sau se adaugă dacă nu este deja acolo) pentru a seta cache-ul Parametru MaxSize la 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Acest lucru evită numeroase avertismente în Catalina. cu care totul începe cu
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Pache Timeout{#apache-timeout} 

* Pe calculatoarele Linux, modificați setările timeout Apache astfel încât cererile de utilizator consumatoare de timp nu timeout
   (cu ceea ce apare adesea ca o eroare "Proxy" sau "Bad Gateway") . Ca utilizator rădăcină:
  * Modificaţi apaşii http d.conf (de obicei, în http d/conf/ ) :
    * Modificați  <Timeout> Setarea (sau adăugați unul la sfârșitul fișierului) până la 3600 (secunde) , în loc de 60 sau 120 secunde implicite.
    * Modificați  <ProxyTimeout> Setarea (sau adăugați unul la sfârșitul fișierului) până la 3600 (secunde) , în loc de 60 sau 120 secunde implicite.
  * Restart Apache:  - K graţios  (dar uneori este într-un alt director) .

### Securitatea{#security} 
         
* Recomandare de securitate: Vezi? [aceste instrucţiuni](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) creșterea securității
instalarea Tomcat, în special pentru serverele publice.
         
* Pentru public ERDDAP™ instalații pe Linux și Macs, este cel mai bine pentru a configura Tomcat (programul) ca aparținând utilizatorului  
   (un utilizator separat cu permisiuni limitate și care [nu are parolă](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Astfel, doar super-utilizatorul poate trece la a acționa ca utilizator  Acest lucru face imposibil pentru hackeri să se logheze la serverul dvs. ca utilizator "tomcat ."
Și, în orice caz, ar trebui să-l faceți astfel încât utilizatorul 
pentru Arborele de directoare "apache-tomcat" și "Tomcat" <bigParentDirectory>  ERDDAP™ are acces la).
  * Puteți crea contul de utilizator "tomcat" (care nu are parolă) prin utilizarea comenzii:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Puteți trece la de lucru ca utilizator prin utilizarea comenzii
    ```
    sudo su - tomcat
    ```
     (Acesta vă va cere parola super-utilizator pentru permisiunea de a face acest lucru.) 
    * Puteți opri lucrul ca Tomcat utilizator prin utilizarea comenzii
    ```
    exit
    ````
    * Face cele mai multe dintre restul Tomcat și ERDDAP™ instrucţiuni de configurare ca utilizator  Mai târziu, rulați  
astfel încât Tomcat are permisiunea de a scrie la fișierele sale jurnal.
    * După despachetarea Tomcat, de la părintele apas-tomcat director:
      * Schimbați proprietatea de arborele director apache-tomcat la utilizatorul Tomcat.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (dar înlocuiți numele real al directorului dvs. Tomcat) .
      * Schimbă "grupul" pentru a fi Tomcat, numele de utilizator, sau numele unui grup mic care include Tomcat și toți administratorii Tomcat / ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Schimbați permisiunile astfel încât Tomcat și grupul au citit, scris, executa privilegii:
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
Creați un fișier   (sau în Red Hat Enterprise Linux \\[ RHEL \\] , edit  ) pentru a seta variabilele de mediu Tomcat lui.
Acest fișier va fi utilizat de către  Fișierul ar trebui să conțină ceva de genul:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (dar înlocuiți numele de director de pe computer) .
   (Dacă ați setat anterior ) 
Pe Macs, probabil nu aveți nevoie pentru a seta JAVA_HOME.

* Pe Windows:
Creați un fișier 
Acest fișier va fi utilizat de către  shutdown.bat 
Fișierul ar trebui să conțină ceva de genul:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (dar înlocuiți numele de director de pe computer) .
Dacă acest lucru este doar pentru testarea locală, eliminați "server."
   (Dacă ați setat anterior ) 

Setările de memorie sunt importante deoarece ERDDAP™ funcţionează mai bine cu mai multă memorie.
Întotdeauna setați 

* Pentru 32 biți Sisteme de operare și 32 biți Java :
64 biți Java Este mult mai bun decât 32 bit Java , dar 32 bit Java va lucra atâta timp cât serverul nu este foarte ocupat.
Cu cât mai multă memorie fizică în server, cu atât mai bine: 4+ GB este foarte bun, 2 GB este în regulă, mai puțin nu este recomandat.
Cu 32 biți Java , chiar și cu o memorie fizică abundentă, Tomcat și Java nu va rula dacă încercați să setați  (1200M pe unele calculatoare) .
Dacă serverul dvs. are mai puțin de 2GB de memorie, reduceți valoarea  (în 'M'egaBytes) la 1/2 din memoria fizică a computerului.

* Pentru 64 biți Sisteme de operare și 64 biți Java :
64 biți Java va funcţiona doar pe un sistem de operare de 64 de biţi.
  * Cu Java 8, aveți nevoie pentru a adăuga 
  * Cu Java 21, tu alegi 64 bit Java atunci când descărcați o versiune de Java marcat "64 bit."

Cu 64 biți Java , Tomcat și Java poate folosi foarte mare  Cu cât mai multă memorie fizică în server, cu atât mai bine.
Ca o sugestie simplistă: vă recomandăm să setați  (în 'M'egaBytes) până la 1/2 (sau mai puțin) a memoriei fizice a computerului.
Puteți vedea dacă Tomcat, Java , și ERDDAP™ sunt într-adevăr rulează în modul de 64 biți prin căutarea pentru " biți," în ERDDAP E-mailul Daily Report
sau în directorul/jurnalele/jurnalele BigParentDirectory/ [log.txt](/docs/server-admin/additional-information#log)  ( [setup.xml](#setupxml) ) .

#### Colectarea gunoiului{#garbage-collection} 

* În ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) fișier, veți vedea multe "GC (Eșecul alocării) "mesaje.
De obicei nu e o problemă. Este un mesaj frecvent de la un normal de operare Java Spunând că tocmai a terminat un gunoi minor
Colecţia pentru că a rămas fără spaţiu în Eden (secţiunea Java morman pentru obiecte foarte tinere) . De obicei, mesajul vă arată
 Dacă cele două numere sunt apropiate, înseamnă că colecţia de gunoi nu a fost productivă.
Mesajul este doar un semn de probleme dacă este foarte frecvent (la fiecare câteva secunde) , nu productive, și numerele sunt mari și nu în creștere,
care împreună indică faptul că Java are nevoie de mai multă memorie, se luptă pentru a elibera memoria, și nu este în măsură să elibereze memoria.
Acest lucru se poate întâmpla într-un timp stresant, apoi pleacă. Dar dacă persistă, acesta este un semn de probleme.
* Daca vedeti  ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) fișier;
Vezi? [OutofMemoryError](/docs/server-admin/additional-information#outofmemoryerror) pentru sfaturi despre cum să diagnosticheze și să rezolve problemele.
         
### Permisiuni{#permissions} 

*  [La Linux şi Macs, schimbaţi permisiunile.](#permissions) dintre toate fişierele din 
  ```
  chmod +x *.sh
  ```

### Fonturi{#fonts} 

*  [Fonturi pentru imagini:](#fonts) Noi îi preferăm pe cei liberi [Fonturi DejaVu](https://dejavu-fonts.github.io/) la celălalt Java fonturi.
Folosind aceste fonturi este puternic recomandat, dar nu este necesar.

Dacă alegeți să nu utilizați fonturile DejaVu, trebuie să modificați setarea fontuluiFamily în setup.xml to  <fontFamily> SansSerif </fontFamily> 
care este disponibil cu toate Java distribuţii. Dacă setați  <fontFamily> Pentru numele unui font care nu este disponibil, ERDDAP™ Nu se încarcă.
și va imprima o listă de fonturi disponibile în fișierul  Trebuie să utilizați unul dintre aceste fonturi.

Dacă alegeți să utilizați fonturile DejaVu, vă rugăm să asigurați-vă că fonturile <fontFamily>  <fontFamily> DejaVu Sans </fontFamily> 

Pentru a instala fonturile DejaVu, vă rugăm să descărcați [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5,522,795 octeți, MD5=33E1E61FAB06A547851ED308B4FFEF42) 
și deschide fișierele fontului într-un director temporar.

  * Pe Linux:
    * Pentru Linux adoptionium Java distribuţii, vezi [aceste instrucţiuni](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Cu altele Java distribuţii: În calitate de utilizator  Java poate găsi fonturile.
Amintiți-vă: dacă / atunci când upgrade mai târziu la o versiune mai nouă a Java Trebuie să reinstalezi aceste fonturi.
  * Pe Macs: pentru fiecare fișier de font, faceți dublu clic pe el și apoi faceți clic pe Install Font.
  * Pe Windows 7 și 10: în Windows Explorer, selectați toate fișierele de font. Clic dreapta. Click pe Instalare.
             
### Testează Tomcat{#test-tomcat} 

* Testați instalarea Tomcat.
  * Linux:
    * Ca "tomcat" utilizator, rulați 
    * Vizualizați URL-ul + ":8080/" în browser (de exemplu, [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac (rulează tomcat ca utilizator al sistemului) :
    * Rulați 
    * Vizualizați URL-ul + ":8080/" în browser (de exemplu, [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Rețineți că în mod implicit, Tomcat dvs. este accesibil doar de tine. Nu este accesibil publicului.
  * Windows localhost:
    * Faceţi clic dreapta pe pictograma Tomcat în tava de sistem, şi alegeţi "Start service."
    * Vizualizare [http://127.0.0.1:8080/](http://127.0.0.1:8080/) , sau poate [http://localhost:8080/](http://localhost:8080/) În browser. Rețineți că în mod implicit, Tomcat dvs. este accesibil doar de tine. Nu este accesibil publicului.

Ar trebui să vezi pagina Tomcat "Felicitări."

În cazul în care există probleme, a se vedea fișierul jurnal Tomcat la TOMcat / Logs / Catalina.out.

### Probleme cu instalarea Tomcat?{#troubles-with-the-tomcat-installation} 

* Pe Linux şi Mac, dacă nu puteţi ajunge la Tomcat sau ERDDAP™   (sau poate că nu poţi să dai de ei dintr-un computer din afara firewall-ului tău.) ,
Puteți testa dacă Tomcat ascultă portul 8080, tastând (ca rădăcină) pe o linie de comandă a serverului:

  ```
  netstat -tuplen | grep 8080
  ```

Asta ar trebui să întoarcă o linie cu ceva de genul:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (unde este o anumită cifră) , indicând faptul că un proces Java (Probabil Tomcat.) ascultă portul "8080" pentru traficul "tcp."
Dacă nu au fost returnate linii, dacă linia returnată este semnificativ diferită, sau dacă două sau mai multe linii au fost returnate, atunci poate exista o problemă cu setările portului.

* A se vedea fișierul jurnal Tomcat  Probleme Tomcat și unele ERDDAP™ Problemele de pornire sunt aproape întotdeauna indicate acolo.
Acest lucru este comun atunci când sunteți prima configurare ERDDAP™ .

* Vezi [Tomcat](https://tomcat.apache.org/) site-ul sau căutați web pentru ajutor, dar vă rugăm să ne anunțați problemele pe care le-ați avut și soluțiile pe care le-ați găsit.

* A se vedea noastre [secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support) .
             
###  ERDDAP™ Conţinut{#erddap-content} 
3.   [Configurați fișierele de configurare ](#erddap-content) 
Pe Linux, Mac și Windows, descărcați [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
și unzip-l în directorul de tomcat, crearea de 

__Versiunea 1.0.0, 2033 octeți, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, datată 2024-10-14__

Unele versiuni anterioare sunt de asemenea disponibile:

    *  [2, 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, din 2022-02-16) 
    *  [2, 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, din 2022-02-16) 
    *  [2, 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 octeți, MD5=1E26F62E7A061911EE68C40B9A29362, din 2022-10-09) 
    *  [2, 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 octeți, MD5=1E26F62E7A061911EE68C40B9A29362, din 2022-12-08) 
    *  [2. 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 octeți, MD5=1E26F62E7A061911EE68C40B9A29362, din 2023-02-27) 

#### Alt director{#other-directory} 

Pentru Red Hat Enterprise Linux (RHEL) sau pentru alte situații în care nu sunt permise pentru a modifica directorul Tomcat sau în cazul în care doriți/nevoie
pentru a pune ERDDAP™ directorul de conținut în altă locație dintr-un alt motiv (De exemplu, dacă utilizați Jetty în loc de Tomcat) ,
unzip  .zip În directorul dorit (la care numai utilizatorul are acces) și setați  erddapContentDirectory 
 (de exemplu:  erddapContentDirectory  =~tomcat/content/erddap ) Deci... ERDDAP™ poate găsi acest nou dosar de conținut.

### setup.xml{#setupxml} 

*  [Citiți comentariile în  ](#setupxml) și să facă modificările solicitate. setup.xml este fișierul cu toate setările care specifică modul în care ERDDAP™ Se poartă frumos.

Pentru configurarea inițială, trebuie cel puțin să modificați aceste setări:
      *  <bigParentDirectory> 
      *  <emailEverythingTo> 
      *  <baseUrl> 
      *  <email...> Setări
      *  <admin...> Setări
      *  <baseHttpsUrl>  (atunci când configurați https ) 

Când creați mare ParentDirectory, din directorul părinte al BigParentDirectory:

    * Asigurați-vă că utilizatorul 
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Schimbă "grupul" pentru a fi Tomcat, numele de utilizator, sau numele unui grup mic care include Tomcat și toți administratorii Tomcat / ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Schimbați permisiunile astfel încât Tomcat și grupul au citit, scris, executa privilegii:
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
numit  ERDDAP _valueName ERDDAP™ . De exemplu, utilizaţi ERDDAP _baseUrl <baseUrl> Valoarea.
Acest lucru poate fi util atunci când se desfășoară ERDDAP™ cu un container ca Docker, după cum puteți pune setările standard în setup.xml
și apoi furniza setări speciale prin variabile de mediu. Dacă furnizaţi informaţii secrete ERDDAP™ prin această metodă,
asigurați-vă că pentru a verifica dacă informațiile vor rămâne secrete. ERDDAP™ citeste doar variabile de mediu o data pe pornire,
în prima secundă de pornire, astfel încât o modalitate de a utiliza acest lucru este: setați variabilele de mediu, începe ERDDAP ,
Asteapta pana ERDDAP™ este pornit, apoi se destabilizează variabilele de mediu.

###  datasets.xml  {#datasetsxml} 

* Citiţi comentariile din [ **Lucrul cu datasets.xml Fișier** ](/docs/server-admin/datasets) . Mai târziu, după ce te ERDDAP™ Rularea
pentru prima dată (de obicei cu doar seturile de date implicite) , veți modifica XML în tomcat/content/erddap/ datasets.xml 
pentru a specifica toate seturile de date pe care doriți dumneavoastră ERDDAP™ pentru a servi. Aici îţi vei petrece majoritatea timpului.
în timp ce se instituie ERDDAP™ și mai târziu în timp ce menținerea dumneavoastră ERDDAP™ .

Puteți vedea un exemplu [ datasets.xml privind GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Puţin probabil.) Acum sau (puţin mai probabil) în viitor, dacă doriți să modificați fișierul CSS al lui Erddap, copiați
În cazul în care se utilizează o metodă de testare, se utilizează o metodă de testare pentru a verifica dacă se utilizează metoda de testare.
Modificări ale  ERDDAP™ este repornit și adesea solicită utilizatorului să curețe fișierele cache ale browser-ului.
     
 ERDDAP™ nu va funcționa corect dacă setarea.xml sau datasets.xml fișierul nu este un fișier XML bine format. Deci, după ce editați aceste fișiere,
este o idee bună pentru a verifica dacă rezultatul este bine format XML prin lipirea textului XML într-un checker XML ca [Validare xml](https://www.xmlvalidation.com/) .
     
### Instalați Erddap. fișier de război{#install-the-erddapwar-file} 

4. Pe Linux, Mac și Windows, __download [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war) __ în "tomcat/webapps":

__Versiunea 2.28.0, 620,824,288 bytes, MD5=f948b2ba603f65a83ac67af43da9e4c2, din 2025-08-29__

Fişierul .war este mare pentru că conţine date de mare rezoluţie de coastă, limită, şi elevaţie necesare pentru a crea hărţi.

Unele versiuni anterioare sunt de asemenea disponibile.

   *  [2, 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 octeți, MD5=50FEA912B5D42E50EAB9591F773EA848D, din 2022-02-16) 
   *  [2, 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 octeți, MD5=461325E97E7577EC671DD50246CCF8B, din 2022-02-23) 
   *  [2, 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 octeți, MD5=F2CFF805893146E932E498FDDBD519B6, din 2022-10-09) 
   *  [2, 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 octeți, MD5=2B33354F633294213AE2AFDDCF4DA6D0, din 2022-12-08) 
   *  [2. 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, din 2023-03-03) 
   *  [2, 24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 bytes, MD5=970fbee172e28b0b8a07756eecbc898e, datat 2024-06-07) 
   *  [2, 25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 octeți, MD5=652AFC9D1421F00B5F789DA2C4732D4C, din 2024-11-07) 
   *  [2, 26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 octeți, MD5=99a725108b37708e5420986c16a119, din 2025-03-31) 
   *  [2, 27, 0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554 403 octeți, MD5=3b2086c659eee4145ca2dff447bf4ef7, din 2025-06-11) 

### Configurează proxy (implementare specifică)  {#proxy} 

 ERDDAP™ este de obicei implementat în spatele unui proxy de marșarier pentru a permite ca acesta să fie deservit în porturile HTTP standard (80 și 443) .
Terminarea SSL/TLS este adesea înclinată la stratul proxy webserver. Specificaţiile depind de cerinţele fiecărei desfăşurari.

#### Apache{#apache} 

1. Asigurați-vă că  http Sunt încărcate:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Se modifică  <VirtualHost> Tag (dacă există una) , sau adăugați unul la sfârșitul fișierului:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Dacă ERDDAP™ este servit pe o altă cale decât 
Segmentul de cale _înainte_  Acest cadru ar fi adecvat pentru ERDDAP™ servit la


```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Apoi reporniţi apaşii: - K graţios  (dar uneori este într-un alt director) .
         
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

Dacă ERDDAP™ este servit pe o altă cale decât 
Segmentul de cale _înainte_  Acest cadru ar fi adecvat pentru ERDDAP™ servit la


```
proxy_set_header X-Forwarded-Prefix /subpath
```


Pentru a obține NGINX și ERDDAP™ funcţionează corect cu https , aveți nevoie pentru a pune următoarea fragmentare în serverul Tomcat .xml <Host> Bloc:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Începe Tomcat{#start-tomcat} 

*  (Nu recomand utilizarea Tomcat Web Application Manager. Dacă nu închideți complet și porniți Tomcat, mai devreme sau mai târziu veți avea probleme de memorie PermGen.) 
*  (În Linux sau Mac OS, dacă ați creat un utilizator special pentru a rula Tomcat, de exemplu, Tomcat, amintiți-vă să faceți următorii pași ca acel utilizator.) 
* Dacă Tomcat este deja difuzate, închide Tomcat cu (în Linux sau Mac OS) 
sau (în Windows) Tomcat\bin\\ shutdown.bat 

Despre Linux, folosiţi Pps -ef | grep tomcat
Procesul ar trebui să fie listat înainte de închidere și în cele din urmă nu a fost listat după închidere.
Acesta poate dura un minut sau două pentru ERDDAP™ să se închidă complet. Ai răbdare. Sau dacă arată ca şi cum nu s-ar opri singur, foloseşte:
-9 <processID> 
* Începe cu Tomcat (în Linux sau Mac OS) "Tomcat/bin/startup.sh" sau (în Windows) TOMcat\bin\\startup.bat 

## Este ERDDAP™ Alergând?{#is-erddap-running} 

Utilizați un browser pentru a încerca să vizualizațihttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ porneşte fără să se încarce vreun set de date. Seturile de date sunt încărcate într-un fir de fundal și astfel devin disponibile unul câte unul.

### Depanare{#troubleshooting} 

* Când o cerere de la un utilizator vine, merge la Apache (pe calculatoare Linux și Mac OS) , apoi Tomcat, apoi ERDDAP™ .
* Puteți vedea ce vine la Apache (și erori conexe) în fișierele din jurnalul Apache.
*    [Tu](/docs/server-admin/additional-information#tomcat-logs) poate vedea ce vine la Tomcat (și erori conexe) 
în fișierele jurnal Tomcat () .
*    [Tu](/docs/server-admin/additional-information#log) poate vedea ce vine la ERDDAP , mesaje de diagnosticare de la ERDDAP ,
și mesaje de eroare de la ERDDAP , în ERDDAP™  <bigParentDirectory> /logs/log.txt
* Tomcat nu începe. ERDDAP™ până când Tomcat primeşte o cerere pentru ERDDAP™ . Deci, puteți vedea în fișierele jurnal Tomcat în cazul în care
început ERDDAP™ sau dacă există un mesaj de eroare legat de această încercare.
* Când ERDDAP™ începe, redenumeşte vechiul ERDDAP™ fișier log.txt (LogArchived La <CurrentTime> .txt) și creează un nou fișier log.txt.
Deci, dacă fișierul  ERDDAP™ nu a reluat recent. ERDDAP™ scrie informații jurnal la un tampon
și scrie tampon la fișierul jurnal periodic, dar puteți forța ERDDAP™ pentru a scrie tamponul la fișierul jurnal prin vizitare
 /erddap/status.html 

### Probleme: Vechea versiune a Java  {#trouble-old-version-of-java} 

Dacă utilizaţi o versiune de Java care este prea vechi pentru ERDDAP , ERDDAP™ nu va rula și veți vedea un mesaj de eroare în fișierul jurnal Tomcat ca

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

Soluţia este de a actualiza la cea mai recentă versiune a Java Şi asigură-te că Tomcat îl foloseşte.

### Probleme: Startup lent prima dată{#trouble-slow-startup-first-time} 

Tomcat trebuie să facă o mulțime de muncă prima dată o aplicație ca ERDDAP™ este pornit; în special, trebuie să despacheteze fișierul 
 (care este ca un .zip fișier) . Pe unele servere, prima încercare de a vizualiza ERDDAP™ standuri (30 de secunde?) Până când această lucrare este terminată.
Pe alte servere, prima încercare va eşua imediat. Dar dacă aştepţi 30 de secunde şi încerci din nou, va reuşi dacă ERDDAP™ a fost instalat corect.

Nu există nicio soluţie pentru asta. Aşa funcţionează Tomcat. Dar apare doar prima dată după ce instalaţi o nouă versiune de ERDDAP™ .

## Închideți și reporniți{#shut-down-and-restart} 

În viitor, pentru a închide (și reporniți)   ERDDAP™ , vezi [Cum să se închidă și să repornească Tomcat și ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Probleme?{#trouble} 

Probleme de instalare Tomcat sau ERDDAP™ ? A se vedea noastre [secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support) .

## Notificarea prin e-mail a noilor versiuni ale ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Dacă doriți să primiți un e-mail ori de câte ori o nouă versiune a ERDDAP™ este disponibil sau alte importante ERDDAP™ anunțurile;
Te poţi alătura ERDDAP™ lista anunțurilor [Aici.](https://groups.google.com/g/erddap-announce) . Această listă mediează aproximativ un e-mail la fiecare trei luni.

## Personalizează{#customize} 

*  [Personalizează ERDDAP™ pentru a evidenția organizația dumneavoastră (nu NOAA   ERD ) .](#customize) 
* Schimbă bannerul care apare în vârful tuturor ERDDAP™ Pagini .html prin editarea <startBodyHtml5>  datasets.xml Dosarul.
(Dacă nu există unul, copiați implicit de la ERDDAP™ 's  fișier
în datasets.xml @ info: whatsthis De exemplu, ai putea:
  * Folosește o imagine diferită (și anume, logo-ul organizației dumneavoastră) .
  * Schimbă culoarea de fundal.
  * Modificare " ERDDAP™ " to "_YourOrganization_'s ERDDAP™ "
  * Modificați "acces mai ușor la datele științifice" la "acces mai ușor la datele _Organizarea_ ta."
  * Schimbați link-urile "Adus la tine de" pentru a fi link-uri către organizația și sursele de finanțare.
* Schimbaţi informaţiile din partea stângă a paginii de start prin editarea paginii <theShortDescriptionHtml>  datasets.xml Dosarul.
(Dacă nu există unul, copiați implicit de la ERDDAP™ 's  fișier
în datasets.xml @ info: whatsthis De exemplu, ai putea:
  * Descrieți ce face organizația și/sau grupul dumneavoastră.
  * Descrie ce fel de date sunt acestea ERDDAP™ Are.
  * Pentru a schimba pictograma care apare pe file browser, pune favicon organizației dumneavoastră. ico în 
Vezi?https://en.wikipedia.org/wiki/Favicon.
