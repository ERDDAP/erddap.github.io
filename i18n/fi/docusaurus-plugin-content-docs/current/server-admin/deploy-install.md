---
sidebar_position: 1
---

# Asenna
Miten tehdä ensimmäinen asetukset ERDDAP™ Palvelimen

 ERDDAP™ voi suorittaa millä tahansa palvelimella, joka tukee Java ja Tomcat (ja muut sovelluspalvelimet kuten Jetty, mutta emme tue niitä) .
 ERDDAP™ on testattu Linuxilla (Amazonin AWS:ssä) , Mac, ja Windows tietokoneet.

*  **Docker** -- Me tarjoamme [ ERDDAP™ Docker-säiliössä](https://hub.docker.com/r/erddap/erddap) 
ja IOOS tarjoaa nyt [Pikakäynnistysopas ERDDAP™ Docker-kontissa](https://ioos.github.io/erddap-gold-standard/index.html) .
Se on standardi. ERDDAP™ Asennus Docker-kontissa.
Dockerin kautta Komenna tarjoamme helppoja tapoja perustaa ssl ja seuranta, lue lisää ulos [Docker-asiakirjat](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Jos käytät jo Docker, luultavasti mieluummin Docker versio.
Jos etsit ajaa pilvipalvelut luultavasti mieluummin Docker versio.
*  **Amazon** -- Jos asennat ERDDAP™ Amazon Web Services EC2:n instanssista, katso tämä [Amazonin verkkosivujen yleiskatsaus](/docs/server-admin/additional-information#amazon) Ensin.
*  **Linux ja Mac** -- ERDDAP™ toimii hyvin Linux ja Mac tietokoneet. Katso alla olevat ohjeet.
*  **Ikkunat** -- Windows sopii testattavaksi ERDDAP™ ja henkilökohtaiseen käyttöön (ks. alla olevat ohjeet) ,
mutta emme suosittele käyttää sitä julkisesti ERDDAP™ komennus. Suoritetaan ERDDAP™ Windows voi olla ongelmia:
erityisesti ERDDAP™ tiedostoja ei voida poistaa ja/tai nimetä uudelleen nopeasti. Tämä johtuu todennäköisesti antivirus ohjelmisto
   (Esimerkiksi, McAfee ja Norton) Joka tutkii virusten tiedostoja. Jos törmäät tähän ongelmaan
(joka näkyy virheilmoituksilla [log.txt](/docs/server-admin/additional-information#log) tiedosto kuten
"Ei voitu poistaa ...," virustorjuntaohjelmiston asetusten muuttaminen voi osittain lievittää ongelmaa. Tai harkitse Linux- tai Mac-palvelimen käyttöä.

 **Standardi ERDDAP™ Linux-, Mac- ja Windows-tietokoneiden asennusohjeet ovat:** 

0. Varmista, että kaikki riippuvuudet on asennettu. muut kuin Windows-koneet (Linux ja Mac) Tarvitset Csh:tä.

##  Java  {#java} 

1.  [-Ei. ERDDAP™ v2.19+, asennettu Java 21.](#java) 
Turvallisuussyistä on lähes aina parasta käyttää viimeisintä versiota Java 21.
Lataa ja asenna uusin versio
    [Adoptium's OpenJDK (Temuriini) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21) .
Varmistaaksesi asennuksen, suorita .../javaJreBinDirectory/java -versio, esimerkiksi
 -Ei.

    ERDDAP™ toimii Java muista lähteistä, mutta suosittelemme Adoptium koska se on tärkein, yhteisötuki,
vapaa (kuten olut ja puhe) versio Java 21, joka tarjoaa pitkäaikaista tukea (ilmainen päivityksiä monta vuotta viimeisen alkuperäisen julkaisun) .
Turvallisuussyistä voit päivittää ERDDAP ' s versio Java säännöllisesti uusina versioina Java 21 tulee saataville Adoptiumista.

    ERDDAP™ on testattu ja käytetty laajasti 21, ei muita versioita. Eri syistä emme testaa tai tue muita versioita Java .
     
## Tomcat{#tomcat} 

2.  [Perustettu](#tomcat)   [Tomcat](https://tomcat.apache.org) . Tomcat on yleisimmin käytetty Java Sovelluspalvelin
joka on Java käyttöjärjestelmän verkkopalvelujen ja Java palvelinohjelmistot kuten ERDDAP™ .
Se on vapaa ja avoin lähdekoodi ohjelmisto (FOSS) .

Voit käyttää toista Java Sovelluspalvelin (Esim.) Mutta testaamme vain Tomcatia.

   * Lataa Tomcat ja pura se palvelimelle tai tietokoneelle.
Turvallisuussyistä on lähes aina parasta käyttää Tomcat 10:n viimeisintä versiota (versio 9 ja alla ei voida hyväksyä) 
joka on suunniteltu toimimaan Java 21 tai uudempi. Alla olevaan Tomcat-hakemistoon viitataan nimellä "Tomcat."

_Varoitus&#33; Jos sinulla on jo Tomcat suorittaa jotain muuta web-sovellus (erityisesti THREDDIT) , suosittelemme, että asennat ERDDAP™ in
      [toinen Tomcat](/docs/server-admin/additional-information#second-tomcat) , koska ERDDAP™ tarvitsee erilaisia Tomcat-asetuksia
eikä tarvitse kamppailla muiden sovellusten kanssa.

     * Linuxissa [lataa "Core" "tähti .gz " Tomcat distribution](https://tomcat.apache.org/download-10.cgi) Ja pura se.
Suosittelemme purkamaan sen.
     * On a Mac, Tomcat on luultavasti jo asennettu ... Kirjasto / Tomcat.
Jos lataat sen, [lataa "Core" "tähti .gz " Tomcat distribution](https://tomcat.apache.org/download-10.cgi) ja purkaa se kirjastossa / Tomcat.
     * Windowsissa voit [lataa "Core" "zip" Tomcat jakelu](https://tomcat.apache.org/download-10.cgi) 
        (joka ei sotke Windowsin rekisteriä ja jota ohjaat DOS- komentoriviltä) ja purkaa sen asianmukaiseen hakemistoon.
        (Kehitys, käytämme "Core" "zip" jakelu. Teemme ohjelman hakemiston ja puramme sen sinne.) 
Tai voit ladata "Core" "64-bittinen Windows zip" jakelu, joka sisältää enemmän ominaisuuksia.
Jos jakelu on Windows asentaja, se luultavasti laittaa Tomcat, esimerkiksi .../Program Files/apache-tomcat-10.0.23.
             
### server.xml{#serverxml} 

*  [server.xml](#serverxml) - Vuonna  <Connector> Tunnisteet
   (yksi: .. &lt; Connector port="8080"...) .
   1.  (Suositeltava) Nosta  (millisekuntia, eli 5 minuuttia) .
   2.  (Suositeltava) Lisätään uusi parametri: | ". Tämä on vapaaehtoista ja hieman vähemmän turvallista.
mutta poistaa käyttäjien tarpeen koodata nämä merkit, kun ne esiintyvät käyttäjän pyyntö URL.
             
### sisältö.xml{#contentxml} 

* konteksti.xml -- Resurssit Cache - In  </Context> Vaihda resurssitunnistetta.
   (tai lisätä, jos se ei ole jo olemassa) asettaa välimuisti MaxSize parametri 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Näin vältetään useita varoituksia Catalina. ulos, että kaikki alkaa
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Apache aikakatkaisu{#apache-timeout} 

* Linux-tietokoneilla, vaihda Apache-aikakatkaisuasetukset niin, että aikaa vievät käyttäjäpyynnöt eivät aikakatkaisu
   (jossa usein näyttää "proxy" tai "Bad Gateway" virhe) . Juurikäyttäjänä:
  * Muokkaa apassia http d.conf... (yleensä http d/conf/ ...) :
    * Muuta nykyistä <Timeout>  (tai lisää yksi tiedoston loppuun) - 3600 (sekuntia) , sijasta oletus 60 tai 120 sekuntia.
    * Muuta nykyistä <ProxyTimeout>  (tai lisää yksi tiedoston loppuun) - 3600 (sekuntia) , sijasta oletus 60 tai 120 sekuntia.
  * Käynnistä apache uudelleen: - k suloinen ... (mutta joskus se on eri hakemistossa) .

### Turvallisuus{#security} 
         
* Turvallisuussuositus: Katso [nämä ohjeet](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) parantaa
Tomcat asennus, erityisesti julkisille palvelimille.
         
* Julkinen ERDDAP™ installaatiot Linux ja Macs, on parasta perustaa Tomcat (ohjelma) käyttäjälle kuuluvaksi ...
   (erillinen käyttäjä, jolla on rajoitetut oikeudet ja [ei salasanaa](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Näin ollen vain super käyttäjä voi siirtyä toimimaan käyttäjänä. Tämän vuoksi hakkerit eivät voi kirjautua palvelimelle käyttäjänä.
Ja joka tapauksessa, sinun pitäisi tehdä niin, että ...Tomcat... käyttäjällä on hyvin rajalliset oikeudet palvelimen tiedostojärjestelmään (lue+write+execute-oikeudet
. <bigParentDirectory>  ERDDAP™ on saatava käyttöönsä).
  * Voit luoda käyttäjätilin (jossa ei ole salasanaa) käyttämällä komentoa:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Voit siirtyä töihin käyttäjänä käyttämällä komentoa
    ```
    sudo su - tomcat
    ```
     (Se pyytää sinulta superkäyttäjän salasanan luvan tehdä tämän.) 
    * Voit lopettaa työskentelyn käyttäjän tomcat käyttämällä komentoa
    ```
    exit
    ````
    * Tehdä suurimman osan loput Tomcat ja ERDDAP™ setup ohjeet käyttäjälle. Myöhemmin suorita startup.sh.sh.sh.sh.sh.h. ...
Tomcatilla on lupa kirjoittaa lokitiedostoihinsa.
    * Purettuaan Tomcatin, 
      * Vaihda apache-tomcat-hakemistopuun omistus tomcat-käyttäjäksi.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (mutta korvata todellinen nimi Tomcat hakemiston) .
      * Muuta "ryhmäksi" tomcat, käyttäjätunnuksesi tai pienen ryhmän nimi, johon kuuluu tomcat ja kaikki Tomcat/ ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Muuta oikeuksia niin, että tomcat ja ryhmä ovat lukeneet, kirjoittaneet, suorittaneet oikeudet:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Poista "toisen" käyttäjän oikeudet lukea, kirjoittaa tai suorittaa:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Tämä on tärkeää, koska se estää muita käyttäjiä lukemasta mahdollisesti arkaluonteisia tietoja ERDDAP™ Aseta tiedostot.

### Muisti{#memory} 

Aseta Tomcatin ympäristömuuttujat

* Linuxissa ja Macsissa:
Luo tiedosto  ... (tai Red Hat Enterprise Linuxissa \\[ RHEL \\] , edit  ...) asettaa Tomcat ympäristömuuttujat.
Tätä tiedostoa käyttävät  Tiedoston pitäisi sisältää jotain:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (mutta korvata hakemiston nimet tietokoneen) .
   (Jos olet aiemmin asettanut ) 
Macs, luultavasti sinun ei tarvitse asettaa ...JAVA_HOME.

* Windowsissa:
Luo tiedosto Tomcat\bin\\setenv.bat.
Tätä tiedostoa käyttävät  shutdown.bat -Ei.
Tiedoston pitäisi sisältää jotain:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (mutta korvata hakemiston nimet tietokoneen) .
Jos tämä on vain paikalliseen testaukseen, poista "-palvelin."
   (Jos olet aiemmin asettanut ) 

 ERDDAP™ Toimii paremmin enemmän muistia.
Aseta aina 

* 32 bittistä käyttöjärjestelmää ja 32 bittiä Java :
64 bittiä Java on paljon parempi kuin 32 bittiä Java , mutta 32 bittiä Java toimii niin kauan kuin palvelimella ei ole kiire.
Mitä fyysisempi muisti palvelimella, sitä parempi: 4+ GB on todella hyvä, 2 GB on kunnossa, vähemmän ei suositella.
32-bittisellä Java , vaikka runsaasti fyysistä muistia, Tomcat ja Java ei suorita, jos yrität asettaa ...-Xmx... paljon yli 1500M (1200M joissakin tietokoneissa) .
Jos palvelimellasi on alle 2GB muistia, vähennä ... (in 'M'egaBytes) 1/2 tietokoneen fyysisestä muistista.

* 64-bittisille käyttöjärjestelmille ja 64-bittisille Java :
64 bittiä Java toimii vain 64-bittisessä käyttöjärjestelmässä.
  * Kun Java 8, sinun täytyy lisätä 
  * Kun Java 21, valitkaa 64 bittiä Java kun lataat version Java merkintä "64 bittiä."

64-bittisellä Java , Tomcat ja Java voi käyttää erittäin korkea Xmx... ja ...-Xms. asetukset. Mitä fyysisempi muisti palvelimella, sen parempi.
Yksinkertaisena ehdotuksena: suosittelemme, että asetat (in 'M'egaBytes) 1/2 (tai vähemmän) tietokoneen fyysisen muistin.
Katsotaan, onko Tomcat... Java ja ERDDAP™ ovat todellakin käynnissä 64 bitin tilassa etsimällä "bittiä," sisään ERDDAP 's Daily Report sähköposti
tai  [log.txt](/docs/server-admin/additional-information#log) Tiedosto ( [setup.xml](#setupxml) ) .

#### Roskakokoelma{#garbage-collection} 

* Sisään ERDDAP™ S [log.txt](/docs/server-admin/additional-information#log) tiedosto, näet monia "GC (Kohdentaminen) Viestit.
Tämä ei yleensä ole ongelma. Se on usein viesti normaalisti toimiva Java Sanoi, että se juuri lopetti pienen roskan.
kokoelma koska se loppui tilaa Eeden (komission Java kasa hyvin nuoria esineitä) . Yleensä viesti näyttää sinulle
MuistinkäyttöEnnen-&gt;muistin käyttöä jälkeen. Jos nuo numerot ovat lähellä toisiaan, roskakokoelma ei ollut tuottoisa.
Viesti on vain merkki ongelmista, jos se on hyvin usein (muutaman sekunnin välein) , ei tuottava, ja määrä ovat suuria ja ei kasva,
jotka yhdessä osoittavat, että Java tarvitsee enemmän muistia, kamppailee vapauttaakseen muistia, eikä pysty vapauttamaan muistia.
Tämä voi tapahtua aikana stressaavaa aikaa, sitten mennä pois. Mutta jos se jatkuu, se on merkki ongelmista.
* Jos näet... ERDDAP™ S [log.txt](/docs/server-admin/additional-information#log) tiedosto,
Katso [OutOfMemoryError](/docs/server-admin/additional-information#outofmemoryerror) vinkkejä siitä, miten diagnosoida ja ratkaista ongelmia.
         
### Lupa{#permissions} 

*  [Linuxissa ja Macissa, vaihda käyttöoikeudet](#permissions) kaikista tiedostoista, jotka omistaja suorittaa:
  ```
  chmod +x *.sh
  ```

### Kirjasimet{#fonts} 

*  [Kuvien kirjasimet:](#fonts) Pidämme enemmän vapaista [DejaVu-fontit](https://dejavu-fonts.github.io/) toiselle Java Fontteja.
Näiden fonttien käyttö on erittäin suositeltavaa, mutta sitä ei tarvita.

Jos et käytä DejaVu -fontteja, sinun täytyy vaihtaa fonttiFamily-asetus setup.xml:ksi ... <fontFamily> SansSerif </fontFamily> ...
joka on saatavilla kaikkien Java jakelu. Jos asetat <fontFamily> - Sen fontin nimeen, joka ei ole saatavilla. ERDDAP™ ei lataa
ja tulostaa listan saatavilla olevista fonteista ... Sinun täytyy käyttää yhtä niistä fonteista.

Jos valitset käyttää DejaVu fontteja, varmista ... <fontFamily>  <fontFamily> DejaVu Sans </fontFamily> -Ei.

Jos haluat asentaa DejaVu-fontit, lataa [DejaVuFontit .zip ](/DejaVuFonts.zip)   (5,522,795 tavua, MD5=33E1E61FAB06A547851ED308B4FFEF42) 
ja avaa kirjasintiedostot väliaikaiseen hakemistoon.

  * Linuxissa:
    * Linux Adoptium Java jakelu, ks. [nämä ohjeet](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Muut Java jakelut: Kopioi fonttitiedostot käyttäjänä  Java voi löytää fontit.
Muista: jos/kun myöhemmin päivittää uudempaan versioon Java Sinun täytyy asentaa fontit uudelleen.
  * Macs: jokaisen kirjasintiedoston osalta kaksoisnapsauta sitä ja napsauta Asenna kirjasin.
  * Windows 7 ja 10: Windows Explorer, valitse kaikki kirjasintiedostot. Klikkaa oikealle. Klikkaa Asenna.
             
### Testi Tomcat{#test-tomcat} 

* Testaa Tomcatin asennusta.
  * Linux:
    * Käyttäjänä "tomcat," suorita "tomcat/bin/startup."sh.
    * Näytä verkko- osoite + ":8080/" selaimessasi (esim. [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac (Suorita tomcat järjestelmän valvojana) :
    * Juokse, Tomcat/bin/startup.sh.sh.
    * Näytä verkko- osoite + ":8080/" selaimessasi (esim. [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Huomaa, että Tomcat on oletusarvoisesti vain sinun käytettävissäsi. Se ei ole julkisesti saatavilla.
  * Windows localhost:
    * Klikkaa Tomcat-kuvaketta oikealla painikkeella ja valitse "Käynnistä palvelu."
    * Näytä [http://127.0.0.1:8080/](http://127.0.0.1:8080/) , tai ehkä [http://localhost:8080/](http://localhost:8080/) Selaimessasi. Huomaa, että Tomcat on oletusarvoisesti vain sinun käytettävissäsi. Se ei ole julkisesti saatavilla.

Näkisitpä Tomcat-sivun.

Jos ongelmia ilmenee, katso Tomcat-lokitiedostoa osoitteessa ...

### Ongelmia Tomcatin kanssa?{#troubles-with-the-tomcat-installation} 

* Linuxissa ja Macissa, jos et tavoita Tomcatia tai ERDDAP™   (Tai ehkä et vain tavoita heitä tietokoneen ulkopuolella palomuurin) ,
Voit testata, kuunteleeko Tomcat porttia 8080 kirjoittamalla (juurina) palvelimen komentorivillä:

  ```
  netstat -tuplen | grep 8080
  ```

Sen pitäisi palauttaa yksi rivi jollain:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (jossa on jokin numero) , joka viittaa siihen, että prosessi (Oletettavasti Tomcat) Kuuntelee satamaa "8080" tcp-liikenteessä.
Jos mitään linjoja ei palautettu, jos linja on merkittävästi erilainen tai jos kaksi tai useampia linjoja palautettiin, voi olla ongelma porttiasetuksissa.

* Ks. Tomcat-lokitiedosto . Tomcat ongelmia ja joitakin ERDDAP™ Käynnistysongelmat ovat lähes aina siellä.
Tämä on yleistä, kun aloitat ERDDAP™ .

* Katso [Tomcat](https://tomcat.apache.org/) sivusto tai etsiä web apua, mutta kerro meille ongelmista oli ja ratkaisuja löysit.

* Katso [kohta:](/docs/intro#support) .
             
###  ERDDAP™ Sisältö{#erddap-content} 
3.   [Aseta ...Tomcat/content/erddap](#erddap-content) 
Lataa Linuxista, Macista ja Windowsista [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
ja avaa se 

_Versio 1.0.0, 20333 tavua, MD5=2B8D2A5AE5ED73E3B529C168C60B5, päivätty 2024-10-14__

Joitakin aiempia versioita on myös saatavilla:

    *  [2, 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 tavua, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, päivätty 2022-02-16) 
    *  [2. 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 tavua, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, päivätty 2022-02-16) 
    *  [2. 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 tavua, MD5=1E26F62E7A06191EE6868C40B9A29362, päivätty 2022-10-09) 
    *  [2, 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (15,810 tavua, MD5=1E26F62E7A06191EE6868C40B9A29362, päivätty 2022-12-08) 
    *  [2, 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 tavua, MD5=1E26F62E7A06191EE6868C40B9A29362, päivätty 2023-02-27) 

#### Muu kansio{#other-directory} 

Red Hat Enterprise Linuxille (RHEL) tai muihin tilanteisiin, joissa et saa muokata Tomcat-hakemistoa tai missä haluat/tarpeesi
ja ERDDAP™ sisältöhakemisto jostain muusta paikasta jostain muusta syystä (Esimerkiksi jos käytät Jetty sijasta Tomcat) ,
unzip ...erddapContent .zip Toivottuun hakemistoon (johon vain käyttäjällä on pääsy) ja asettaa erddapContentDirectory Järjestelmän ominaisuus
 (esim. erddapContentDirectory  =~tomcat/content/erddap ...) Joten ERDDAP™ löytää tämän uuden sisältöhakemiston.

### setup.xml{#setupxml} 

*  [Lue kommentit kohdasta ...Tomcat/content/erddap/setup.xml ...](#setupxml) ja tehdä pyydetyt muutokset. setup.xml on tiedosto kaikki asetukset, jotka määrittävät miten ERDDAP™ Käyttäydy kunnolla.

Alun asetukset:
      * ... <bigParentDirectory> ...
      * ... <emailEverythingTo> ...
      * ... <baseUrl> ...
      * ... <email...> ...
      * ... <admin...> ...
      * ... <baseHttpsUrl> ... (kun https ) 

Kun luot bigPentDirectory, bigPentDirectory:

    * Tehdä 
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Muuta "ryhmäksi" tomcat, käyttäjätunnuksesi tai pienen ryhmän nimi, johon kuuluu tomcat ja kaikki Tomcat/ ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Muuta oikeuksia niin, että tomcat ja ryhmä ovat lukeneet, kirjoittaneet, suorittaneet oikeudet:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Poista "toisen" käyttäjän oikeudet lukea, kirjoittaa tai suorittaa. Tämä on tärkeää, jotta voidaan estää lukeminen mahdollisesti arkaluonteisia tietoja
in ERDDAP™ lokitiedostoja ja tiedostoja, joissa on tietoa yksityisistä tiedostoista.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Ympäristömuuttujat{#environment-variables} 

alkaen ERDDAP™ v2.13 ERDDAP™ ylläpitäjät voivat ohittaa minkä tahansa arvon setup.xml määrittelemällä ympäristömuuttuja
Nimi ERDDAP _arvoNimi ERDDAP™ . Esimerkiksi käyttö ... ERDDAP _BaseUrl <baseUrl> Arvo.
Tämä voi olla kätevää käytettäessä ERDDAP™ Kanssa säiliö kuten Docker, koska voit laittaa vakioasetukset setup.xml
ja toimittaa sitten erityisasetukset ympäristömuuttujien kautta. Jos annat salaisia tietoja ERDDAP™ tämän menetelmän avulla
Varmista, että tiedot pysyvät salassa. ERDDAP™ lukee ympäristömuuttujia vain kerran käynnistettäessä,
ensimmäisen sekunnin startup, joten yksi tapa käyttää tätä on: asettaa ympäristömuuttujat, aloittaa ERDDAP ,
Odota. ERDDAP™ Aloitetaan ja poistetaan ympäristömuuttujat.

###  datasets.xml  {#datasetsxml} 

* Lue kommentit [ **Yhteistyö datasets.xml Tiedosto** ](/docs/server-admin/datasets) . Myöhemmin, kun olet saanut ERDDAP™ käynnissä
ensimmäistä kertaa (yleensä vain oletustiedostot) , voit muuttaa XML: n ... datasets.xml ...
määrittää kaikki tiedostot haluat oman ERDDAP™ Palvella. Täällä vietät suurimman osan ajastasi.
kun ERDDAP™ ja myöhemmin ERDDAP™ .

Näet esimerkin [ datasets.xml GitHubista](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Epätodennäköistä.) Nyt tai (hieman todennäköisempi) tulevaisuudessa, jos haluat muokata erddapin CSS-tiedosto, kopioida
Tämä asetus on kaikilta osiltaan velvoittava, ja sitä sovelletaan sellaisenaan kaikissa jäsenvaltioissa.
Muutokset tulevat voimaan vasta, kun ERDDAP™ on käynnistetty uudelleen ja vaatii usein myös käyttäjää tyhjentämään selaimen välimuistitiedostot.
     
 ERDDAP™ ei toimi oikein, jos setup.xml tai datasets.xml tiedosto ei ole hyvin muotoiltu XML-tiedosto. Kun olet editoinut näitä tiedostoja,
On hyvä ajatus tarkistaa, että tulos on hyvin muotoiltu XML liittämällä XML-teksti XML-tarkistus kuten [xmlvalidointi](https://www.xmlvalidation.com/) .
     
### Asenna kierrosluku. Sotatiedosto{#install-the-erddapwar-file} 

4. Linuxissa, Macissa ja Windowsissa __lataa [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war) __ osoitteeseen:

_Versio 2.28.0, 620.824,288 tavua, MD5=f948b2ba603f65a83ac67af43da9e4c2, päivätty 2025-08-29___

.war tiedosto on suuri, koska se sisältää korkean resoluution rannikkoviiva, raja, ja korkeus merenpinnasta tietoja tarvitaan karttoja.

Myös joitakin aiempia versioita on saatavilla.

   *  [2, 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 tavua, MD5=5FEA912B5D42E50EAB9591F773EA848D, päivätty 2022-02-16) 
   *  [2. 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 tavua, MD5=461325E97E7577EC671DD50246CCFB8B, päivätty 2022-02-23) 
   *  [2. 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 tavua, MD5=F2CFF805893146E932E498FDDBD519B6, päivätty 2022-10-09) 
   *  [2, 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 tavua, MD5=2B33354F633294213AE2AFDDCF4DA6D0, päivätty 2022-12-08) 
   *  [2, 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 tavua, MD5=D843A043C506725EBD6F8EFDCCA8FD5FD5F, 2023-03-03) 
   *  [2, 14](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568.748.187 tavua, MD5=970fbee172e28b0b8a07756eecbc898e, päivätty 2024/06-07) 
   *  [2, 25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 tavua, MD5=652AFC9D1421F00B5F789DA2C4732D4C, päivätty 2024-11-07) 
   *  [2, 26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 tavua, MD5=99a725108b37708e5420986c1616a119, päivätty 2025-03-31) 
   *  [2, 27, 0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 tavua, MD5=3b2086c659eee4145ca2dff447bf4ef7, päivätty 2025-6-11) 

### Määrittele välityspalvelin (käyttöönottokohtainen)  {#proxy} 

 ERDDAP™ käytetään tyypillisesti webserver käänteisen välityspalvelimen takana, jotta sitä voidaan palvella HTTP:n vakioporteissa (80 ja 443) .
SSL/TLS terminointi on usein handed webserver välityspalvelin kerros samoin. Yksityiskohdat riippuvat kunkin käyttöönoton vaatimuksista.

#### Apassi{#apache} 

1. Varmista, että Mod_proxy... http Ladataan:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Muokkaa nykyistä <VirtualHost> Tunniste (jos) , tai lisätä yksi lopussa tiedoston:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Jos ERDDAP™ tarjoillaan muulla polulla kuin .../erddap...
polku segmentin _ennen_  Tämä asetus olisi sopiva ERDDAP™ Palveltiin


```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Käynnistä sitten apassi uudelleen: - k suloinen ... (mutta joskus se on eri hakemistossa) .
         
#### NGINX{#nginx} 

Aseta nginx config-tiedostossa otsikot:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Jos ERDDAP™ tarjoillaan muulla polulla kuin .../erddap...
polku segmentin _ennen_  Tämä asetus olisi sopiva ERDDAP™ Palveltiin


```
proxy_set_header X-Forwarded-Prefix /subpath
```


Saada NGINX ja ERDDAP™ toimii oikein https , sinun täytyy laittaa seuraava snippet sisällä Tomcat palvelimen.xml <Host> ...
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Käynnistä Tomcat{#start-tomcat} 

*  (En suosittele Tomcat Web-sovelluspäällikköä. Jos et täysin sammuta ja käynnistä Tomcatia, sinulla on ennemmin tai myöhemmin PermGen-muistiongelmia.) 
*  (Linuxissa tai Mac OS:ssä, jos olet luonut erityisen käyttäjän johtamaan Tomcatia, esim. Tomcatia, muista tehdä seuraavat vaiheet käyttäjänä.) 
* Jos Tomcat on jo käynnissä, sulje Tomcat (Linux tai Mac OS) Kissa/bin/shutdown.sh
tai (Windowsissa) Kissa&#33; shutdown.bat ...

Linuxiin, käytä  | grep tomcat
Prosessi olisi lueteltava ennen sulkemista, eikä sitä lopulta luetella sulkemisen jälkeen.
Se voi kestää hetken tai kaksi ERDDAP™ -Ei. Ole kärsivällinen. Tai jos näyttää siltä, että se ei lopeta yksin, käytä:
Tapa -9 <processID> ...
* Aloita Tomcat (Linux tai Mac OS)  (Windowsissa) -Tomcat\bin\\startup.bat ...

## On ERDDAP™ Juosta?{#is-erddap-running} 

Käytä selainta nähdäksesihttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ aloittaa ilman mitään tiedostoja ladattu. Dataset on ladattu taustalankaan, joten se tulee saataville yksitellen.

### Vianmääritys{#troubleshooting} 

* Kun käyttäjä pyytää, se menee Apache (Linux- ja Mac OS -tietokoneista) Sitten Tomcat. ERDDAP™ .
* Näet, mitä Apassille tapahtuu. (ja siihen liittyvät virheet) Apache-lokitiedostoissa.
*    [Sinä](/docs/server-admin/additional-information#tomcat-logs) voi nähdä mitä tulee Tomcat (ja siihen liittyvät virheet) 
Tomcat-lokitiedostoissa () .
*    [Sinä](/docs/server-admin/additional-information#log) voi nähdä mitä tulee ERDDAP , diagnostisia viestejä osoitteesta ERDDAP ,
ja virheviestejä ERDDAP , ERDDAP™ ... <bigParentDirectory> /logs/log.txt.
* Tomcat ei ala. ERDDAP™ kunnes Tomcat saa pyynnön ERDDAP™ . Joten voit nähdä Tomcat lokitiedostoja, jos se
alkoi ERDDAP™ tai jos yritykseen liittyy virheilmoitus.
* Milloin ERDDAP™ aloittaa, se nimeää vanhan ERDDAP™ log.txt-tiedosto (... klo <CurrentTime> .txt) ja luo uuden log.txt-tiedoston.
Joten jos tiedosto on vanha, se on merkki, että ERDDAP™ Se ei ole käynnistynyt hiljattain. ERDDAP™ kirjoittaa lokitiedot puskurille
ja vain kirjoittaa puskurin lokitiedostoon ajoittain, mutta voit pakottaa ERDDAP™ kirjoittaa puskuri lokitiedostoon vierailemalla
... /erddap/status.html -Ei.

### Ongelma: Vanha versio Java  {#trouble-old-version-of-java} 

Jos käytät versiota Java Se on liian vanha. ERDDAP , ERDDAP™ ei toimi ja näet virheviestin Tomcat's lokitiedostossa kuten

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

Ratkaisu on päivittää uusimman version Java Ja varmista, että Tomcat käyttää sitä.

### Ongelma: Hidas käynnistys ensimmäisellä kerralla{#trouble-slow-startup-first-time} 

Tomcat tekee paljon töitä, kun ensimmäinen hakemus, kuten ERDDAP™ on aloitettu; erityisesti se on purettava ...
 (joka on kuin .zip tiedosto) . Joillakin palvelimilla, ensimmäinen yritys tarkastella ERDDAP™ kojut (30 sekuntia?) Kunnes tämä työ on valmis.
Muilla palvelimilla ensimmäinen yritys epäonnistuu välittömästi. Mutta jos odotat 30 sekuntia ja yrität uudelleen, se onnistuu, jos ERDDAP™ on asennettu oikein.

Tähän ei ole ratkaisua. Näin Tomcat toimii. Mutta se tapahtuu vasta ensimmäisen kerran, kun asennat uuden version ERDDAP™ .

## Sammuta ja käynnistä uudelleen{#shut-down-and-restart} 

Tulevaisuudessa, lopettaa (ja käynnistä)   ERDDAP™ , katso [Miten sammuttaa ja käynnistää Tomcat ja ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Ongelmia?{#trouble} 

Ongelmia Tomcatin tai ERDDAP™ ? Katso [kohta:](/docs/intro#support) .

## Sähköposti-ilmoitus uusista versioista ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Jos haluat vastaanottaa sähköpostin aina uusi versio ERDDAP™ on saatavilla tai muu tärkeä ERDDAP™ ilmoitukset,
Voit liittyä ERDDAP™ Ilmoitusluettelo [Tässä.](https://groups.google.com/g/erddap-announce) . Tämä luettelo on keskimäärin noin yksi sähköposti joka kolmas kuukausi.

## Oma{#customize} 

*  [Mukauta ERDDAP™ korostaa organisaatiosi (ei NOAA   ERD ) .](#customize) 
* Muuta banner joka näkyy kaikkien alkuun ERDDAP™ .html-sivuja muokkaamalla <startBodyHtml5> Tag omassa datasets.xml Kansio.
(Jos sellaista ei ole, kopioi oletus ERDDAP™ 's  tiedosto
osaksi datasets.xml Ja muokata sitä.) Esimerkiksi:
  * Käytä toista kuvaa (eli organisaatiosi logo) .
  * Vaihda taustaväriä.
  * Muutos " ERDDAP™ " to "_YourOrganization_s ERDDAP™ "
  * Muuta "Helpompi pääsy tieteelliseen tietoon" muotoon " Helpompi pääsy _Organization_in tietoihin."
  * Muuta "Brought to you by"-linkkejä linkeiksi organisaatioosi ja rahoituslähteisiin.
* Muuta kotisivun vasemmalla puolella olevia tietoja muokkaamalla sivua <theShortDescriptionHtml> Tag omassa datasets.xml Kansio.
(Jos sellaista ei ole, kopioi oletus ERDDAP™ 's  tiedosto
osaksi datasets.xml Ja muokata sitä.) Esimerkiksi:
  * Kuvaile mitä organisaatiosi ja/tai ryhmäsi tekee.
  * Kuvailkaa, millaiset tiedot tämä ERDDAP™ on.
  * Voit muuttaa kuvaketta, joka näkyy selaimen välilehtiä, laita organisaatiosi favicon. ico in 
Katsohttps://en.wikipedia.org/wiki/Favicon.
