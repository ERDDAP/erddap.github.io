---
sidebar_position: 1
---

# Instalează
Cum să faceţi configurarea iniţială aERDDAP™pe serverul dumneavoastră


ERDDAP™poate rula pe orice server care suportăJavaşi Tomcat (și alte servere de aplicații ca Jetty, dar noi nu le sprijinim) .ERDDAP™a fost testat pe Linux (inclusiv pe Amazon AWS) , Mac, și calculatoare Windows.

*    **Amazon** -- Dacă instalaţiERDDAP™într-o instanță Amazon Web Services EC2, a se vedea acest[Amazon Web Services Prezentare generală](/docs/server-admin/additional-information#amazon)Mai întâi.
*    **Docker** -- Axiom oferă acum[ERDDAP™într-un recipient Docker](https://hub.docker.com/u/axiom/)și IOOS oferă acum o[Ghid de pornire rapidă pentruERDDAP™într-un container Docker](https://ioos.github.io/erddap-gold-standard/index.html).
Este standardulERDDAP™Instalare, dar Axiom a pus-o într-un container docker.
Dacă utilizaţi deja Docker, probabil că veţi prefera versiunea Docker.
Dacă nu utilizați deja Docker, în general nu recomandăm acest lucru.
Dacă ați ales să instalațiERDDAP™Prin Docker, nu oferim nici un sprijin pentru procesul de instalare.
Încă nu am lucrat cu Docker. Dacă lucrați cu acest lucru, vă rugăm să ne trimiteți comentariile.
*    **Linux și Macs** --ERDDAP™lucrează foarte bine pe Linux și Mac calculatoare. Vezi instrucţiunile de mai jos.
*    **Ferestre** -- Windows este bine pentru testareERDDAP™și pentru uz personal (vezi instrucţiunile de mai jos) , dar noi nu recomandăm utilizarea sa pentru publicERDDAPc. RulareaERDDAP™pe Windows pot avea probleme: în special;ERDDAP™poate nu poate șterge și/sau redenumi rapid fișierele. Acest lucru este, probabil, din cauza software-ul antivirus (De exemplu, din McAfee și Norton) care verifică fișierele pentru viruși. Dacă dai peste această problemă (care poate fi văzut prin mesaje de eroare în[log.txt](/docs/server-admin/additional-information#log)fișier ca "Nu se poate șterge ...") , modificarea setărilor software-ului antivirus poate atenua parţial problema. Sau ia în considerare utilizarea unui Linux sau Mac server în schimb.

 **StandardulERDDAP™instrucțiuni de instalare pentru Linux, Macs, și Windows computere sunt:** 

0. Asigurați-vă că orice dependențe sunt instalate. Pe mașini de spălat vase (Linux și Mac) Ai nevoie de Csh.
## Java {#java} 
1.  [PentruERDDAP™v2.19+, înființatJava21.](#java)
Din motive de securitate, este aproape întotdeauna cel mai bine să utilizați cea mai recentă versiune aJava21.
Vă rugăm să descărcați și să instalați ultima versiune a
    [OpenJDK de adopție (Temurină) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21). Pentru a verifica instalarea, tip "/_javaJreBinDirectory_/java -versiune," de exemplu
/usr/local/jdk-21.0.3+9/jre/bin/java -versiune
    
    ERDDAP™funcționează cuJavadin alte surse, dar recomandăm Admissionium pentru că este principalul, sprijinit de comunitate, gratuit (ca în bere și vorbire) versiuneaJava21 care oferă suport pe termen lung (upgrade-uri gratuite pentru mulți ani trecut eliberarea inițială) . Din motive de securitate, vă rugăm să actualizațiERDDAPVersiuneaJavaperiodic ca noi versiuni aleJava21 devin disponibile de la Admissionium.
    
    ERDDAP™a fost testat și utilizat pe scară largă cu 21, nu alte versiuni. Din diferite motive, nu testăm cu nici un suport alte versiuni aleJava.
     
## Tomcat{#tomcat} 
2.  [Configurați](#tomcat) [Tomcat](https://tomcat.apache.org).
Tomcat este cel mai folositJavaServer de aplicații, care esteJavasoftware care se află între serviciile de rețea ale sistemului de operare șiJavaserver software cum ar fiERDDAP™. Este software-ul gratuit și open source (FOS) .
    
Poţi folosi altul.JavaServer de aplicații (De exemplu, Jetty) Dar îl testăm doar pe Tomcat şi îl susţinem.
     
    
    * Descărcaţi Tomcat şi despachetaţi-l pe server sau PC.
Din motive de securitate, este aproape întotdeauna cel mai bine să utilizați cea mai recentă versiune a Tomcat 10 (versiunea 9 și mai jos nu sunt acceptabile) care este conceput pentru a lucra cuJava21 sau mai nou. Mai jos, dosarul Tomcat va fi denumit _tomcat_.
        
Atenţie&#33; Dacă aveți deja un Tomcat care rulează alte aplicații web (în special THREDDS) Vă recomandăm să instalaţiERDDAP™în[un al doilea Tomcat](/docs/server-admin/additional-information#second-tomcat), pentru căERDDAP™are nevoie de diferite setări Tomcat și nu ar trebui să se confrunte cu alte aplicații pentru memorie.
        
        * Pe Linux,[descarca "Core" "tar".gz" Distribuţia Tomcat](https://tomcat.apache.org/download-10.cgi)Şi despacheteaz-o. Vă recomandăm despachetarea în /usr/local.
        * Pe un Mac, Tomcat este, probabil, deja instalat în /Library/Tomcat, dar ar trebui să-l actualizeze la ultima versiune a Tomcat 10.
Dacă îl descărcați,[descarca "Core" "tar".gz" Distribuţia Tomcat](https://tomcat.apache.org/download-10.cgi)și despachetați-l în /Library/Tomcat.
        * Pe Windows, puteți[descarca distributia "Core" "zip" Tomcat](https://tomcat.apache.org/download-10.cgi)  (care nu se pune cu regiștrii Windows și pe care le controlați dintr-o linie de comandă DOS) și despachetați-l într-un director adecvat. (Pentru dezvoltare, folosim distribuţia "zip." Facem un director / programe și despachetați-l acolo.) Sau puteți descărca distribuția "Core" "64-bit Windows zip," care include mai multe caracteristici. Dacă distribuția este un instalator Windows, acesta va pune, probabil, Tomcat în, de exemplu, /Program Files / apache-tomcat-10.0.23 .
             
### server.xml{#serverxml} 
*   [server.xml](#serverxml)- În _tomcat_/conf/server.xml fișier, există două modificări pe care ar trebui să le facă la fiecare dintre cele două&lt;Conector &gt; Etichete- unu pentru
```
        <Connector port="8080" 
```
şi una pentru
```
        <Conector port="8443"
```
    1.   (Recomandat) Măreşte valoarea parametrului Conexiunii Timeout, poate până la 300000 (milisecunde)   (care este de 5 minute) .
    2.   (Recomandat) Adaugă un nou parametru: relaxatQueryChars="\\[\\]|" Acest lucru este opțional și ușor mai puțin sigur, dar elimină necesitatea utilizatorilor de a coda la sută aceste caractere atunci când acestea apar în parametrii unui URL cerere de utilizator.
             
### conţinut. xml{#contentxml} 
* Context.xml -- Resurse Cache - În _tomcat_/conf/context.xml, chiar înainte de&lt;/Context&gt; tag, schimba eticheta Resurse (sau adauga daca nu este deja acolo) pentru a seta cache Parametru MaxSize la 80000:
    &lt;Resources cachingAlowed="true" cacheMaxSize="80000" /&gt;
Acest lucru evită numeroase avertismente în Catalina. cu care toate încep cu
"MÂNCARE\\[principal\\]org.apache.catalina.web resurse.Cache.getResource Imposibil de adăugat resursa la\\[/WEB-INF/clase/...]"
         
### Pache Timeout{#apache-timeout} 
* Pe calculatoarele Linux, modificați setările timeout Apache astfel încât cererile utilizatorilor consumatoare de timp nu timeout (cu ceea ce apare adesea ca o eroare "Proxy" sau "Bad Gateway") . Ca utilizator rădăcină:
    1. Modificaţi apaşiihttpfișier d.conf (de obicei în/etc/httpd/conf/) :
Schimbare existentă&lt;Timeout &gt; setare (sau adăugați unul la sfârșitul fișierului) până la 3600 (secunde) , în loc de 60 sau 120 secunde implicite.
Schimbare existentă&lt;Setare proxyTimeout&gt; (sau adăugați unul la sfârșitul fișierului) până la 3600 (secunde) , în loc de 60 sau 120 secunde implicite.
    2. Restart Apache: /usr/sbin/apachectl - K graţios (dar uneori este într-un alt director) .
             
    * Recomandare de securitate: Vezi?[aceste instrucţiuni](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)pentru a crește securitatea instalației Tomcat, în special pentru serverele publice.
         
    * Pentru publicERDDAP™instalații pe Linux și Macs, este cel mai bine pentru a configura Tomcat (programul) ca aparținând utilizatorului "tomcat" (un utilizator separat cu permisiuni limitate și care[nu are parolă](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) . Astfel, doar super-utilizatorul poate trece la a acționa ca Tomcat utilizator. Acest lucru face imposibil pentru hackeri să se logheze la server ca Tomcat utilizator. Și, în orice caz, ar trebui să-l facă astfel încât utilizatorul Tomcat are permisiuni foarte limitate pe sistemul de fișiere serverului (read+write+execute privilegii pentru arborele director apache-tomcat și&lt;BigParentDirectory&gt; şi privilegii numai pentru directoare cu date careERDDAP™necesită acces la).
        * Puteți crea contul de utilizator tomcat (care nu are parolă) prin utilizarea comenzii
sudo useradd tomcat -s /bin/bash -p '\\* '
        * Puteți trece la lucru ca tomcat utilizator prin utilizarea comenzii
sudo su - tomcat
             (Acesta vă va cere parola super-utilizator pentru permisiunea de a face acest lucru.) 
        * Puteți opri lucrul ca Tomcat utilizator prin utilizarea comenzii
ieșire
        * Face cele mai multe dintre restul Tomcat șiERDDAP™instrucțiuni de configurare ca utilizator "tomcat." Mai târziu, executați startup.sh și script-uri de închidere.sh ca utilizator "tomcat" astfel încât Tomcat are permisiunea de a scrie la fișierele sale jurnal.
        * După despachetarea Tomcat, de la părintele din directorul apache-tomcat:
            
            * Schimba proprietatea de copac director apache-tomcat la utilizatorul Tomcat.
Crown -R tomcat apache-tomcat-_10.0.23_
                 (dar înlocuiți numele real al directorului dvs. Tomcat) .
            * Schimbă "grupul" pentru a fi Tomcat, numele de utilizator, sau numele unui grup mic care include Tomcat și toți administratorii Tomcat /ERDDAP, de exemplu,
chgrp - R _your Utilizator_ apache-tomcat-_10.0.23_
            * Schimbați permisiunile astfel încât Tomcat și grupul să citească, să scrie, să execute privilegii, de exemplu.
chmod -R ug+rwx apache-tomcat-_10.0.23_
            * Eliminați permisiunile utilizatorului "altul" pentru a citi, scrie sau executa:
Chmod -R o-rwx apache-tomcat-_10.0.23_
Acest lucru este important, deoarece împiedică alţi utilizatori să citească informaţii sensibile înERDDAP™fișiere de configurare.
            
              
### Memorie{#memory} 
* Setează variabilele de mediu ale Tomcat
    
Pe Linux şi Macs:
Creează un fișier _tomcat_/bin/setenv.sh (sau în Red Hat Enterprise Linux\\[RHEL\\], editează ~tomcat/conf/tomcat10.conf) pentru a seta variabilele de mediu Tomcat. Acest fișier va fi utilizat de _tomcat_/bin/startup.sh și închidere.sh. Fișierul ar trebui să conțină ceva de genul:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (dar înlocuiți numele de director de pe computer) .
 (Dacă ați stabilit anterior JRE\\_HOME, puteți elimina asta.)   
Pe Macs, probabil că nu trebuie să setați JAVA_HOME.

Pe Windows:
Creați un fișier _tomcat_\\bin\\setenv.bat pentru a seta variabilele de mediu ale Tomcat. Acest fișier va fi utilizat de _tomcat_\bin\\startup.bat șishutdown.bat. Fișierul ar trebui să conțină ceva de genul:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (dar înlocuiți numele de director de pe computer) .
În cazul în care acest lucru este doar pentru testarea locală, eliminați "server."
 (Dacă ați stabilit anterior JRE\\_HOME, puteți elimina asta.) 

Setările de memorie -Xmx și -Xms sunt importante deoareceERDDAP™funcţionează mai bine cu mai multă memorie. Setați întotdeauna -Xms la aceeași valoare ca -Xmx.

* Pentru 32 biți Sisteme de operare și 32 bițiJava:
64 bițiJavae mult mai bun decât 32 bitJava, dar 32 bitJavava lucra atâta timp cât serverul nu este foarte ocupat. Cu cât mai multă memorie fizică în server, cu atât mai bine: 4+ GB este foarte bun, 2 GB este în regulă, mai puțin nu este recomandat. Cu 32 bițiJava, chiar și cu memorie fizică abundentă, Tomcat șiJavanu va rula dacă încercați să setați -Xmx mult peste 1500M (1200M pe unele calculatoare) . Dacă serverul are mai puțin de 2GB de memorie, reduce valoarea -Xmx (în 'M'egaBytes) la 1/2 din memoria fizică a computerului.
* Pentru 64 biți Sisteme de operare și 64 bițiJava:
64 bițiJavava funcţiona doar pe un sistem de operare de 64 de biţi.
    
    * CuJava8, trebuie să adăugați \\-d64 la parametrul Tomcat CATALINA\\_OPTS în setenv.bat
    * CuJava21, tu alegi 64 bitJavaatunci când descărcați o versiune deJavamarcat "64 bit."
    
Cu 64 bițiJava, Tomcat șiJavapoate folosi setări foarte înalte -Xmx și -Xms. Cu cât mai multă memorie fizică în server, cu atât mai bine. Ca o sugestie simplistă: vă recomandăm set -Xmx și -Xms la (în 'M'egaBytes) până la 1/2 (sau mai puțin) a memoriei fizice a computerului. Puteți vedea dacă Tomcat,Java, șiERDDAP™sunt într-adevăr rulează în modul 64 bit prin căutarea pentru " bit," înERDDAPE-mailul Daily Report sau în _bigParentDirectory_/logs/[log.txt](/docs/server-admin/additional-information#log)fișier (_BigParentDirectory_ este specificat în[setup.xml](#setupxml)) .
#### Colecţia de gunoi{#garbage-collection} 
* ÎnERDDAP™'s[log.txt](/docs/server-admin/additional-information#log)fișier, veți vedea multe "GC (Eșec al alocării) "mesaje.
De obicei nu e o problemă. Este un mesaj frecvent de la un operator normalJavaSpunând că tocmai a terminat o mică colecţie de gunoi pentru că a rămas fără spaţiu în Eden (secţiuneaJavamorman pentru obiecte foarte tinere) . De obicei mesajul vă arată _memoryUsefore_\\-&gt;_memoryUseAfter_. Dacă cele două numere sunt apropiate, înseamnă că colecţia de gunoi nu a fost productivă. Mesajul este doar un semn de probleme dacă este foarte frecvent (la fiecare câteva secunde) , nu productive, și numerele sunt mari și nu în creștere, care împreună indică faptul căJavaare nevoie de mai multă memorie, se luptă pentru a elibera memoria, și este incapabil să elibereze memoria. Acest lucru se poate întâmpla într-un timp stresant, apoi pleacă. Dar dacă persistă, acesta este un semn de probleme.
* Dacă vedeți Java.lang.OutofMemoryError înERDDAP™'s[log.txt](/docs/server-admin/additional-information#log)fișier, vezi[OutofMemoryError](/docs/server-admin/additional-information#outofmemoryerror)pentru sfaturi despre cum să diagnosticheze și să rezolve problemele.
         
### Permisiuni{#permissions} 
*   [Pe Linux şi Macs, schimba permisiunile](#permissions)dintre toate\\*.shfișiere în _tomcat_/bin/ pentru a fi executabile de către proprietar, de exemplu cu
```
    chmod +x \\*.sh  
```
### Fonturi{#fonts} 
*   [Fonturi pentru imagini:](#fonts)Noi îi preferăm pe cei liberi[Fonturi DejaVu](https://dejavu-fonts.github.io/)la celălaltJavafonturi. Folosind aceste fonturi este puternic recomandat, dar nu este necesar.
    
Dacă alegeți să nu utilizați fonturile DejaVu, trebuie să modificați setarea fontuluiFamily în setup.xml la&lt;SANSERIF&lt;/fontFamily&gt;, care este disponibil cu toateJavaDistribuţii. Dacă setați fontulFamily pe numele unui font care nu este disponibil,ERDDAP™nu va încărca și va imprima o listă de fonturi disponibile în fișierul log.txt. Trebuie să utilizați unul dintre aceste fonturi.
    
Dacă alegeți să utilizați fonturile DejaVu, asigurați-vă că fontulFamily setarea în setup.xml este&lt;font Familie &gt;DejaVu Sans&lt;/FontFamily&gt;.
    
Pentru a instala fonturile DejaVu, vă rugăm să descărcați[DejaVuFonts.zip](/DejaVuFonts.zip)  (5,522,795 octeți, MD5=33E1E61FAB06A547851ED308B4FFEF42) și deschide fișierele fontului într-un director temporar.
    
    * Pe Linux:
        * Pentru Linux adoptiumJavadistribuţii, vezi[aceste instrucţiuni](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/).
        * Cu alteleJavadistribuţii: Ca utilizator Tomcat, copiați fișierele fontului în _JAVA\\_HOME_/lib/fonts soJavapoate găsi fonturile. Amintiți-vă: dacă / atunci când upgrade mai târziu la o versiune mai nouă aJavaTrebuie să reinstalezi aceste fonturi.
    * Pe Macs: pentru fiecare fișier de font, faceți dublu clic pe el și apoi faceți clic pe Install Font.
    * Pe Windows 7 și 10: în Windows Explorer, selectați toate fișierele de font. Clic dreapta. Click pe Install.
             
### Testează Tomcat{#test-tomcat} 
* Testați instalarea Tomcat.
    * Linux:
        * Ca utilizator "tomcat," rulați _tomcat_/bin/startup.sh
        * Vizualizați URL-ul + ":8080/" în browser (de exemplu,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) .
        * Ar trebui să vezi pagina Tomcat "Felicitări."
Dacă există probleme, consultați fișierul jurnal Tomcat _tomcat_/logs/catalina.out.
    * Mac (rulează tomcat ca utilizator administrator de sistem) :
        * Rulează _tomcat_/bin/startup.sh
        * Vizualizați URL-ul + ":8080/" în browser (de exemplu,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) . Rețineți că în mod implicit, Tomcat dvs. este accesibil doar de tine. Nu este accesibil publicului.
        * Ar trebui să vezi pagina Tomcat "Felicitări."
Dacă există probleme, consultați fișierul jurnal Tomcat _tomcat_/logs/catalina.out.
    * Windows localhost:
        
        * Faceţi clic dreapta pe pictograma Tomcat în tava de sistem, şi alegeţi "Start service."
        * Vizualizare[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/), sau poate[ http://localhost:8080/ ](http://localhost:8080/)În browser. Rețineți că în mod implicit, Tomcat dvs. este accesibil doar de tine. Nu este accesibil publicului.
        * Ar trebui să vezi pagina Tomcat "Felicitări."
Dacă există probleme, consultați fișierul jurnal Tomcat _tomcat_/logs/catalina.out.
            
### Probleme cu instalarea Tomcat?{#troubles-with-the-tomcat-installation} 
* Pe Linux și Mac, dacă nu puteți ajunge la Tomcat sauERDDAP™  (sau poate că nu poţi ajunge la ele dintr-un computer din afara firewall-ului tău.) , puteți testa dacă Tomcat ascultă portul 8080, prin tastarea (ca rădăcină) pe o linie de comandă a serverului:
```  
    netstat -tuplen | grep 8080  
```
Asta ar trebui să întoarcă o linie cu ceva de genul:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     (unde '#' este o cifră) , indicând faptul că un proces "java" (Probabil Tomcat.) ascultă portul "8080" pentru traficul "tcp." Dacă nu au fost returnate linii, dacă linia returnată este semnificativ diferită, sau dacă două sau mai multe linii au fost returnate, atunci poate exista o problemă cu setările portului.
* Vezi fișierul jurnal Tomcat _tomcat_/logs/catalina.out. Probleme Tomcat și uneleERDDAP™problemele de pornire sunt aproape întotdeauna indicate acolo. Acest lucru este comun atunci când sunteți prima configurareERDDAP™.
* Vezi[Tomcat](https://tomcat.apache.org/)site-ul sau căutați web pentru ajutor, dar vă rugăm să ne anunțați problemele pe care le-ați avut și soluțiile găsite.
* A se vedea noastre[secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support).
             
### ERDDAP™Conţinut{#erddap-content} 
3.  [Aranjează_tomcat_/content/erddapfișiere de configurare.](#erddap-content)  
Pe Linux, Mac și Windows, descărcați[erddapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (versiunea 1.0.0, 20333 octeți, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, datată 2024-10-14) și desfaceți-l în _tomcat_, creând_tomcat_/content/erddap.

    \\[Unele versiuni anterioare sunt de asemenea disponibile:
    [2, 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, din 2022-02-16)   
    [2, 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, din 2022-02-16)   
    [2, 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19,810 octeți, MD5=1E26F62E7A061911EE68C40B9A29362, din 2022-10-09)   
    [2, 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19,810 octeți, MD5=1E26F62E7A061911EE68C40B9A29362, din 2022-12-08) 
    [2, 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19,810 octeți, MD5=1E26F62E7A061911EE68C40B9A29362, din 2023-02-27) 
și desfaceți-l în _tomcat_, creând_tomcat_/content/erddap.\\]
    
#### Alt director{#other-directory} 
Pentru Red Hat Enterprise Linux (RHEL) sau pentru alte situații în care nu sunt permise pentru a modifica directorul Tomcat sau în cazul în care doriți / nevoie pentru a puneERDDAP™director de conținut în altă locație dintr-un alt motiv (De exemplu, dacă utilizați Jetty în loc de Tomcat) , unzip erddapContent.zipîn directorul dorit (la care numai utilizatorul = Tomcat are acces) şi setaţierddapContentDirectoryproprietatea sistemului (de exemplu,erddapContentDirectory=~tomcat/content/erddap) Deci...ERDDAP™poate găsi acest nou dosar de conținut.
    
### setup.xml{#setupxml} 
*   [Citiţi comentariile din_tomcat_/content/erddap/ **setup.xml** ](#setupxml)și să facă modificările solicitate. setup.xml este fișierul cu toate setările care specifică modul în careERDDAP™Se poartă frumos.
Pentru configurarea inițială, trebuie cel puțin să modificați aceste setări:
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
Când creați mare ParentDirectory, din directorul părinte al BigParentDirectory:
    
    * Faceți utilizator =tomcat proprietarul BigParentDirectory, de exemplu,
```
        chown -R tomcat _bigParentDirectory_
```
    * Schimbă "grupul" pentru a fi Tomcat, numele de utilizator, sau numele unui grup mic care include Tomcat și toți administratorii Tomcat /ERDDAP, de exemplu,
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * Schimbați permisiunile astfel încât Tomcat și grupul să citească, să scrie, să execute privilegii, de exemplu.
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * Eliminați permisiunile utilizatorului "altul" pentru a citi, scrie sau executa. Acest lucru este important pentru a preveni citirea, eventual, informații sensibile înERDDAP™jurnalizează fișiere și fișiere cu informații despre seturile de date private.:
```
        chmod -R o-rwx _bigParentDirectory_
```

### Variabile de mediu{#environment-variables} 
Începând cuERDDAP™v2.13;ERDDAP™administratorii pot suprascrie orice valoare în setup.xml prin specificarea unei variabile de mediu numitERDDAP\\__valueName_ înainte de rulareERDDAP™. De exemplu, utilizareaERDDAP\\_baseUrl suprascrie&lt;Valoarea de bază. Acest lucru poate fi util atunci când se desfășoarăERDDAP™cu un container ca Docker, așa cum puteți pune setările standard în setup.xml și apoi furniza setări speciale prin variabile de mediu. Dacă furnizați informații secreteERDDAP™prin această metodă, asiguraţi-vă că informaţiile vor rămâne secrete.ERDDAP™citeste doar variabilele de mediu o data pe pornire, in prima secunda de pornire, deci o modalitate de a utiliza aceasta este: setati variabilele de mediu, incepetiERDDAP, așteptați pânăERDDAP™este pornit, apoi se destabilizează variabilele de mediu.
    
### datasets.xml {#datasetsxml} 
* Citiţi comentariile din[ **Lucrul cudatasets.xmlFișier** ](/docs/server-admin/datasets). Mai târziu, după ce teERDDAP™care rulează pentru prima dată (de obicei cu doar seturile de date implicite) , veți modifica XML în_tomcat_/content/erddap/ **datasets.xml** pentru a specifica toate seturile de date pe care doriți dumneavoastrăERDDAP™pentru a servi. Acest lucru este în cazul în care veți petrece cea mai mare parte a timpului în timp ce setareaERDDAP™și mai târziu în timp ce menținerea dumneavoastrăERDDAP™.
     
*    (Puţin probabil.) Acum sau (ușor mai probabil) în viitor, dacă doriți să modificați fișierul CSS al lui Erddap, faceți o copie a_tomcat_/content/erddap/imagini/erddapStart2.css numit erddap2.cs și apoi să facă modificări la acesta. Modificările aduse erddap2.css intră în vigoare numai atunci cândERDDAP™este repornit și adesea solicită utilizatorului să curețe fișierele cache ale browser-ului.
     
ERDDAP™nu va funcționa corect dacă setarea.xml saudatasets.xmlfișierul nu este un fișier XML bine format. Deci, după ce editați aceste fișiere, este o idee bună pentru a verifica că rezultatul este bine format XML prin lipirea textului XML într-un checker XML ca[Validare xml](https://www.xmlvalidation.com/).
     
### Instalează fișierul erddap.war{#install-the-erddapwar-file} 
4. Pe Linux, Mac și Windows, descărcați[erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)în _tomcat_/webapps.
     (versiunea 2.25_1, 592,292,039 bytes, MD5=652AFC9D1421F00B5F789DA2C4732D4C, datată 2024-11-07) 
    
Fișierul .war este mare, deoarece conține date de coastă de înaltă rezoluție, limită, și elevație necesare pentru a crea hărți.
    
    \\[Unele versiuni anterioare sunt de asemenea disponibile.
    [2, 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551,068,245 octeți, MD5=50FEA912B5D42E50EAB9591F773EA848D, din 2022-02-16)   
    [2, 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551,069,844 octeți, MD5=461325E97E7577EC671DD50246CCF8B, din 2022-02-23)   
    [2, 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411 octeți, MD5=F2CFF805893146E932E498FDDBD519B6, din 2022-10-09)   
    [2, 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742,765 octeți, MD5=2B33354F633294213AE2AFDDCF4DA6D0, din 2022-12-08) 
    [2, 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, datat 2023-03-03) 
    [2, 24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568,748,187 bytes, MD5=970fbee172e28b0b8a07756eecbc898e, datat 2024-06-07) 
    \\]
    
#### ProxyPass{#proxypass} 
5. Utilizaţi Proxy Pasează astfel încât utilizatorii să nu trebuiască să pună numărul portului, de exemplu: 8080, în URL.
Pe calculatoarele Linux, dacă Tomcat rulează în Apache, vă rugăm să modificaţi Apachehttpfișier d.conf (de obicei în/etc/httpd/conf/) să permită traficul HTTP către/de laERDDAP™fără a solicita numărul portului, de exemplu, :8080, în URL. Ca utilizator rădăcină:
    1. Modificare&lt;VirtualHost&gt; tag (dacă există una) , sau se adaugă unul la sfârșitul fișierului:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. Apoi reporniți Apache: /usr/sbin/apachectl - K graţios (dar uneori este într-un alt director) .
         
### NGINX{#nginx} 
 (UNCOMMON) Dacă utilizaţi[NGINX](https://www.nginx.com/)  (un server web și un echilibru de sarcină) :
pentru a obține NGINX șiERDDAP™funcţionează corect cuhttps, aveți nevoie pentru a pune următorul fragment în serverul Tomcat.xml&lt;Gazdă &gt; bloc:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
Și în fișierul de configurare Nginx, aveți nevoie pentru a seta aceste antete:
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Mulţumită lui Kyle Wilcox.)   
     
### Începe Tomcat{#start-tomcat} 
*    (Nu recomand utilizarea Tomcat Web Application Manager. Dacă nu închideți complet și porniți Tomcat, mai devreme sau mai târziu veți avea probleme de memorie PermGen.)   
     
*    (În Linux sau Mac OS, dacă ați creat un utilizator special pentru a rula Tomcat, de exemplu, Tomcat, amintiți-vă să faceți următorii pași ca acel utilizator.)   
     
* Dacă Tomcat este deja difuzate, închide Tomcat cu (în Linux sau Mac OS) _tomcat_/bin/shutdown.sh
sau (în Windows) _tomcat_\\bin\\\shutdown.bat
    
Pe Linux, utilizați ps -ef|Grep tomcat înainte și după închidere.sh pentru a vă asigura că procesul Tomcat sa oprit. Procesul ar trebui să fie listat înainte de închidere și în cele din urmă nu a fost listat după închidere. Acesta poate dura un minut sau două pentruERDDAP™să se închidă complet. Ai răbdare. Sau dacă arată ca şi cum nu s-ar opri singur, foloseşte:
Kill -9 _procesID_
    
* Începe cu Tomcat (în Linux sau Mac OS) _tomcat_/bin/startup.sh
sau (în Windows) _tomcat_\\bin\\startup.bat

## EsteERDDAP™Să alerg?{#is-erddap-running} 
Utilizați un browser pentru a încerca să vizualizați http://_www.YourServer.org_/erddap/status.html   
ERDDAP™începe fără să fie încărcate seturile de date. Seturile de date sunt încărcate într-un fir de fundal și astfel devin disponibile unul câte unul.

### Depanare{#troubleshooting} 
* Când o cerere de la un utilizator vine în, merge la Apache (pe Linux și Mac OS calculatoare) , apoi Tomcat, apoiERDDAP™.
* Puteți vedea ce vine la Apache (și erorile aferente) în fișierele de jurnal Apache.
*   [Tu](/docs/server-admin/additional-information#tomcat-logs)poate vedea ce vine la Tomcat (și erorile aferente) în fișierele jurnal Tomcat (_tomcat_/logs/catalina.out și alte fișiere din acel director) .
*   [Tu](/docs/server-admin/additional-information#log)poate vedea ce vine laERDDAP, mesaje de diagnosticare de laERDDAP, și mesaje de eroare de laERDDAP, înERDDAP™ &lt;BigParentDirectory&gt;logs/log.txt file.
* Tomcat nu începe.ERDDAP™până când Tomcat primeşte o cerere pentruERDDAP™. Deci, puteți vedea în fișierele jurnal Tomcat în cazul în care a începutERDDAP™sau dacă există un mesaj de eroare legat de această încercare.
* CândERDDAP™Începe, redenumeşte vechiulERDDAP™fișier log.txt (logArchivedAt_CurrentTime_.txt) și creează un nou fișier log.txt. Deci, dacă jurnalul. Dosarul txt este vechi, este un semn căERDDAP™nu a reluat recent.ERDDAP™scrie jurnal info la un tampon și scrie doar tampon la fișierul jurnal periodic, dar puteți forțaERDDAP™pentru a scrie tampon la fișierul jurnal de vizitare .../erddap/status.html.

### Probleme: Vechea versiune aJava {#trouble-old-version-of-java} 
Dacă utilizaţi o versiune deJavacare este prea vechi pentruERDDAP,ERDDAP™nu va rula și veți vedea un mesaj de eroare în fișierul jurnal Tomcat ca
Excepție în fir "main" java.lang.Clasă nesuportatăVersiuneError:
_unele/clasele/numele_: Versiunea majoră nesusţinută.minor _unele Număr_
Soluţia este de a actualiza la cea mai recentă versiune aJavaşi asigură-te că Tomcat îl foloseşte.

### Probleme: Startup lent prima dată{#trouble-slow-startup-first-time} 
Tomcat trebuie să facă o mulțime de muncă prima dată o aplicație caERDDAP™a început; în special, trebuie să despacheteze erddap-ul. fișier război (care este ca o.zipfișier) . Pe unele servere, prima încercare de a vizualizaERDDAP™standuri (30 de secunde?) până când această lucrare se va termina. Pe alte servere, prima încercare va eşua imediat. Dar dacă aştepţi 30 de secunde şi încerci din nou, va reuşi dacăERDDAP™a fost instalat corect.
Nu există nicio soluţie pentru asta. Aşa lucrează Tomcat. Dar apare doar prima dată după ce instalaţi o nouă versiune deERDDAP™.

## Închideți și reporniți{#shut-down-and-restart} 
În viitor, pentru a închide (și reporniți)  ERDDAP, vezi[Cum să se închidă și să repornească Tomcat șiERDDAP](/docs/server-admin/additional-information#shut-down-and-restart).
## Probleme?{#trouble} 
Probleme de instalare Tomcat sauERDDAP? A se vedea noastre[secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support).
## Notificarea prin e-mail a noilor versiuni aleERDDAP {#email-notification-of-new-versions-of-erddap} 
Dacă doriți să primiți un e-mail ori de câte ori o nouă versiune aERDDAP™este disponibil sau alte importanteERDDAP™Anunțuri, vă puteți alăturaERDDAP™lista anunțurilor[Aici.](https://groups.google.com/g/erddap-announce). Această listă medie aproximativ un e-mail la fiecare trei luni.
## Personalizează{#customize} 
[PersonalizeazăERDDAP™pentru a evidenția organizația dumneavoastră (nuNOAA ERD) .](#customize)
    * Schimbă bannerul care apare în vârful tuturorERDDAP™Pagini .html prin editarea&lt;StartBodyHtml5&gt; tag-ul îndatasets.xmlDosar. (Dacă nu există unul, copiați implicit de laERDDAP's
        \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file intodatasets.xmlși editați-l.) De exemplu, ai putea:
        * Folosește o imagine diferită (și anume, logo-ul organizației dumneavoastră) .
        * Schimbă culoarea de fundal.
        * Schimbare "ERDDAP" to "_YourOrganization_'sERDDAP"
        * Modificați "acces mai ușor la date științifice" la "acces mai ușor la datele _Organizarea_ ta."
        * Schimbați link-urile "Adus la tine de" pentru a fi link-uri către organizația și sursele de finanțare.
    * Modificarea informaţiilor pe partea stângă a paginii de start prin editarea&lt;scurtăDescriereHtml&gt; etichetă în dumneavoastrădatasets.xmlDosar. (Dacă nu există unul, copiați implicit de laERDDAP's
        \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file intodatasets.xmlși editați-l.) De exemplu, ai putea:
        * Descrieți ce face organizația și/sau grupul dumneavoastră.
        * Descrie ce fel de date sunt acesteaERDDAP™Are.
    * Pentru a schimba pictograma care apare pe file browser, pune favicon organizației dumneavoastră. ico in_tomcat_/content/erddap/imagini/ . Vezi?[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon).
