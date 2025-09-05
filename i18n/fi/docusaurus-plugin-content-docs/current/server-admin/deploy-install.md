---
sidebar_position: 1
---

# Asentaminen
Miten tehdä ensimmäinen asennus ERDDAP™ Sinun palvelijasi

 ERDDAP™ Voit käyttää mitä tahansa palvelinta, joka tukee Java Tomcat (muut sovelluspalvelimet, kuten Jetty, mutta emme tue niitä.) .
 ERDDAP™ on testattu Linuxilla (Lähde: Amazon's AWS) Mac ja Windows-tietokoneet.

*  **Docker** ----- Tarjoamme [ ERDDAP™ Docker-säiliö](https://hub.docker.com/r/erddap/erddap) 
IOOS tarjoaa nyt [Nopea aloitusopas ERDDAP™ Docker Container](https://ioos.github.io/erddap-gold-standard/index.html) .
Se on standardi ERDDAP™ Asentaminen Docker-säiliöön.
Dockerin kautta Kompleksi tarjoaa helppoja tapoja luoda sl ja seuranta, lue lisää [Dockerin dokumentointi](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Jos käytät Dockeria, pidät todennäköisesti Docker-versiosta.
Jos haluat käyttää pilvipalveluita, pidät todennäköisesti Docker-versiosta.
*  **Amazon Amazon** ----- Jos olet asennuksessa ERDDAP™ Amazon Web Services EC2:ssa, katso tämä [Amazon Web Services yleiskatsaus](/docs/server-admin/additional-information#amazon) Ensimmäinen.
*  **Linux ja Macit** ----- ERDDAP™ Toimii erinomaisesti Linux- ja Mac-tietokoneissa. Katso ohjeet alta.
*  **Windows Windows** ----- Windows on hyvä testata ERDDAP™ henkilökohtaiseen käyttöön (Katso ohjeet alta) ,
Emme suosittele käyttämään sitä julkisesti. ERDDAP™ käyttöönottoa. Juokseminen ERDDAP™ Windowsissa voi olla ongelmia:
erityisesti, ERDDAP™ Et voi poistaa ja/tai nimetä tiedostoja nopeasti. Tämä johtuu todennäköisesti virustorjuntaohjelmistosta.
   (Lähde: McAfee and Norton) Tämä tarkistaa tiedostoja viruksia. Jos törmäät tähän ongelmaan
(joka näkyy virheviestinä) [log.txt](/docs/server-admin/additional-information#log) tiedostot, kuten
"Voi poistaa ..."), virustorjuntaohjelmiston asetusten muuttaminen voi osittain lievittää ongelmaa. Käyttää Linux- tai Mac-palvelinta.

 **Standardi ERDDAP™ Linux-, Mac- ja Windows-tietokoneiden asennusohjeet ovat:** 

0. Varmista, että kaikki riippuvuudet on asennettu. Ei-Windows koneita (Linux ja Mac) Tarvitset csh:tä.

##  Java  {#java} 

1.  [For For ERDDAP™ V2.19+, perustettu Java 21.](#java) 
Turvallisuussyistä on lähes aina parempi käyttää uusinta versiota. Java 21.
Lataa ja asenna uusin versio
    [Adoptiumin OpenJDK (Temurin) 21 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21) .
Asennuksen todentamiseksi suorita ’/javaJreBinDirectory/java-versio’, esimerkiksi
Käyttäjä/paikallinen/jdk-21.0.3+9/jre/bin/java käännöksiä.”

    ERDDAP™ Teosten kanssa Java muista lähteistä, mutta suosittelemme Adoptiumia, koska se on tärkein, yhteisöllistä tukea.
Ilma ilmaiseksi ilmaiseksi (Olut ja puhe) versiosta Java 21, joka tarjoaa pitkäaikaista tukea (Ilmaiset päivitykset jo vuosia ennen alkuperäistä julkaisua) .
Turvallisuussyistä päivitä ERDDAP versiosta Java säännöllisesti uusina versioina Java 21 on saatavana Adoptiumilta.

    ERDDAP™ Sitä on testattu ja käytetty laajasti 21:llä, ei muilla versioilla. Erilaisista syistä emme testaa tai tue muita versioita. Java .
     
## Tomca{#tomcat} 

2.  [Aseta ylös](#tomcat)   [Tomca](https://tomcat.apache.org) . Tomcat on yleisimmin käytetty Java Palveluntarjoaja,
joka on Java ohjelmisto, joka on käyttöjärjestelmän verkkopalveluiden ja Java palvelinohjelmisto, kuten ERDDAP™ .
Vapaa ja avoin lähdekoodi (FOSS) .

Voit käyttää toista Java Sovelluspalvelin (Esimerkki: Jetty) Testaamme ja tuemme Tomcatia.

   * Lataa Tomcat ja pakkaa se palvelimellesi tai PC:lle.
Turvallisuussyistä on lähes aina parempi käyttää Tomcat 10:n uusinta versiota. (9 ja alapuolella ei ole hyväksyttävää) 
joka on suunniteltu toimimaan Java 21 tai uudempi. Alla olevaa Tomcat-hakemistoa kutsutaan nimellä Tomcat.

Varokaa&#33; Jos sinulla on jo Tomcat, jolla on jokin muu verkkosovellus (Erityisesti kolme) Suosittelemme, että asennat ERDDAP™ Sisällä
      [Toinen Tomcat](/docs/server-admin/additional-information#second-tomcat) koska ERDDAP™ Tarvitset erilaisia Tomcat-asetuksia
Ei tarvitse olla mukana muissa muistisovelluksissa.

     * Linuxissa, [Download "Tähti" .gz Tomcatin jakelu](https://tomcat.apache.org/download-10.cgi) Pakkaa se pois.
Suosittelemme pakkaamaan sen ’/käyttäjä/paikallinen’.
     * Macissa Tomcat on todennäköisesti jo asennettuna ’/Library/Tomcat’ -versioon, mutta sen tulee päivittää uusimpaan Tomcat 10 -versioon.
Jos lataat sen, [Download "Tähti" .gz Tomcatin jakelu](https://tomcat.apache.org/download-10.cgi) Pakkaa se ’Library/Tomcat’.
     * Windowsissa voit [Download "Core" "Zip" Tomcat](https://tomcat.apache.org/download-10.cgi) 
        (joka ei sotke Windows-rekisteriä ja jota hallitset DOS-komentorivillä) Pakkaa se sopivaan hakemistoon.
        (Kehittämistä varten käytämme "Core" "zip" -jakelua. Teemme hakemiston/ohjelman hakemistoon ja puramme sen sinne.) 
Voit ladata "Core" "64-bittinen Windows zip" -jakelun, joka sisältää enemmän ominaisuuksia.
Jos jakelu on Windows-asennus, se saattaa Tomcatin esimerkiksi ’/Program Files/apache-tomcat-10.0.23’.
             
### palvelin.xml{#serverxml} 

*  [palvelin.xml](#serverxml) ’tomcat/conf/server.xml’ -tiedostossa on kaksi muutosta, jotka sinun tulisi tehdä kullekin’. <Connector> &gt; tagit
   (Yksi αonnector-portille = "80" ja yksi πConector-portille ="8443") .
   1.  (Suositellaan) Parametriarvon nostaminen, ehkä 300 000 (Millisekuntia, joka on 5 minuuttia) .
   2.  (Suositellaan) Lisätään uusi parametri: "relaxedQueryChars=" | &gt; Se on valinnainen ja hieman epävarma,
mutta poistaa käyttäjien tarvetta prosenttikoodiin, kun ne esiintyvät käyttäjän pyynnön URL-osoitteen parametreissa.
             
### Sisältö.xml{#contentxml} 

* Konteksti.xml ----- Resurssivälimuisti - In tomcat/conf/context.xml </Context> "Tag, vaihda resursseja"
   (tai lisätä, jos se ei ole jo siellä) Aseta kätkön MaxSize-parametri 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Näin vältetään lukuisia varoituksia katalinassa. Kaikki alkaa
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Apace Timeout{#apache-timeout} 

* Linux-tietokoneissa Apache-aikatauluasetukset muutetaan niin, että aikaa vievät käyttäjäpyynnöt eivät aikatauluta.
   (Se, mitä usein kutsutaan "Proxy" tai "Bad Gateway" -virheeksi.) . Käyttäjänä:
  * Muokkaa Apachea http d.conf tiedosto (Yleensä ’/etc/ http d/conf/ &gt; &gt;) :
    * Muutetaan olemassa olevaa <Timeout> &gt; Asetukset (tai lisätä tiedoston lopussa) 3600 (Sekunnit) Oletusarvon sijaan 60 tai 120 sekuntia.
    * Muutetaan olemassa olevaa <ProxyTimeout> &gt; Asetukset (tai lisätä tiedoston lopussa) 3600 (Sekunnit) Oletusarvon sijaan 60 tai 120 sekuntia.
  * Restart Apache: Käyttäjä/sbin/apachectl K Graceful &gt; &gt; (Joskus se on toisessa hakemistossa.) .

### Turvallisuusturvallisuus{#security} 
         
* Turvallisuussuositus: Näytä [Nämä ohjeet](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) lisätä turvallisuuden
Tomcat-asennus, erityisesti julkisille palvelimille.
         
* Yleisölle ERDDAP™ Linux- ja Mac-laitteissa on parasta perustaa Tomcat. (Ohjelman) Käyttäjä: Tomcat &gt; &gt;
   (erillinen käyttäjä, jolla on rajalliset luvat ja [Ei salasanaa](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Vain superkäyttäjä voi siirtyä toimimaan käyttäjänä "tomcat". Tämä tekee hakkereiden mahdottomaksi kirjautua sisään palvelimeesi käyttäjänä ’tomcat’.
Ja joka tapauksessa sinun pitäisi tehdä se niin, että ’tomcat’-käyttäjällä on hyvin rajalliset käyttöoikeudet palvelimen tiedostojärjestelmään (lue + kirjoita + suorita etuoikeudet).
Apache-tomcat -hakemistopuun ja <bigParentDirectory> &gt; ja vain luku-oikeudet hakemistoihin, jotka ERDDAP™ tarvitaan pääsyä).
  * Voit luoda "Tomcat" -käyttäjätilin (jolla ei ole salasanaa) Käyttämällä käskyä:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Voit siirtyä käyttäjäksi "tomcat" Käyttämällä käskyä
    ```
    sudo su - tomcat
    ```
     (Se pyytää sinulta superkäyttäjän salasanan, jotta voit tehdä tämän.) 
    * Voit lopettaa käyttäjien tomcatin käytön komennolla
    ```
    exit
    ````
    * Suurin osa Tomcatista ja ERDDAP™ Käyttäjän ohjeet "Tomcat" Käyttäkää myöhemmin "Startup.sh"- ja "shutdown.sh"-skriptejä käyttäjänä "tomcat" &gt; &gt;
Tomcatilla on oikeus kirjoittaa lokitiedostoihinsa.
    * Tomcatin pakkaamisen jälkeen apache-tomcat-hakemiston vanhemmalta:
      * Muuta apache-tomcat-hakemistopuun omistajuutta tomcatin käyttäjäksi.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (Korvaa Tomcat-hakemiston todellinen nimi) .
      * Muuta "ryhmä" tomcatiksi, käyttäjänimeksi tai pienen ryhmän nimeksi, joka sisältää tomcatin ja kaikki Tomcatin ylläpitäjät ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Muuta lupia, jotta Tomcat ja ryhmä ovat lukeneet, kirjoittaneet ja toteuttaneet etuoikeuksia:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Poista "muut" käyttäjän lukemis-, kirjoitus- tai suoritusoikeudet:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Tämä on tärkeää, koska se estää muita käyttäjiä lukemasta mahdollisesti arkaluonteisia tietoja. ERDDAP™ asennustiedostoja.

### Muisti{#memory} 

Tomcatin ympäristömuuttujat

* Linux ja Mac:
Luo tiedosto "Tomcat/bin/setenv.sh" &gt; &gt; (Pääosat Red Hat Enterprise Linux \\[ Ryhmä \\] , edit \tomcat/conf/tomcat10. &gt; &gt;) Tomcatin ympäristömuuttujat.
Tätä tiedostoa käyttävät ’tomcat/bin/startup.sh’ ja ’shutdown.sh’. Tiedosto sisältää jotain:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (Korvaa hakemiston nimet tietokoneeltasi) .
   (Jos olet aiemmin määrittänyt Jere_Homen, voit poistaa sen.) 
Macsissa sinun ei tarvitse määritellä "JAVA_HOME".

* Windowsissa:
Luo tiedosto "tomcat\bin\\setenv.bat" asettaa Tomcatin ympäristömuuttujat.
Tätä tiedostoa käyttävät ’tomcat\bin\\startup.bat’ ja ’’’. shutdown.bat &gt;
Tiedosto sisältää jotain:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (Korvaa hakemiston nimet tietokoneeltasi) .
Jos tämä koskee vain paikallista testiä, poista "palvelin".
   (Jos olet aiemmin määrittänyt Jere_Homen, voit poistaa sen.) 

XMX- ja XM-muistiasetukset ovat tärkeitä, koska ERDDAP™ toimii paremmin enemmän muistin kanssa.
Aseta aina "Xms" samaan arvoon kuin Xmx.

* 32 bittiä ja 32 bittiä Java :
64 bittiä Java Paljon parempi kuin 32 Java 32 bit Java Toimii niin kauan kuin palvelin ei ole kiireinen.
Mitä enemmän fyysistä muistia palvelimessa on, sitä parempi: 4+ GB on hyvä, 2 GB on kunnossa, vähemmän ei suositella.
32 bittiä Java fyysinen muisti, Tomcat ja Java Älä juokse, jos yrität asentaa XMX:n yli 1500 M (1200 m joissakin tietokoneissa) .
Jos palvelimellasi on alle 2 Gt muistia, vähennä Xmx-arvoa. (Sisältää M'egaBytes) 1/2 tietokoneen fyysisestä muistista.

* 64 bittiä ja 64 bittiä Java :
64 bittiä Java Toimii vain 64-bittisessä käyttöjärjestelmässä.
  * kanssa Java 8, sinun on lisättävä ’-d64’ Tomcat ’CATALINA_OPTS’ -parametriin ’setenv.bat’.
  * kanssa Java Valitse 64 bittiä Java Kun lataat version Java "64 bittiä"

64 bittiä Java Tomcat ja Java Voit käyttää erittäin korkeita XMX- ja XM-asetuksia. Mitä enemmän fyysistä muistia palvelimessa on, sitä parempi.
Yksinkertaisena ehdotuksena: suosittelemme, että asetat XMX:n ja XM:n (Sisältää M'egaBytes) 1/2 (tai vähemmän) tietokoneen fyysinen muisti.
Saa nähdä, onko Tomcat Java ja ERDDAP™ 64-bittisessä tilassa etsitään "vähän" ERDDAP Päivittäinen sähköposti
«BigParentDirectory/logs/ [log.txt](/docs/server-admin/additional-information#log) &gt; tiedostot (BigParentDirectory määritellään [Asennus.xml](#setupxml) ) .

#### Garbage kokoelma{#garbage-collection} 

* Sisällä ERDDAP™ &gt; [log.txt](/docs/server-admin/additional-information#log) Näet monia "GC" (Jakamisen epäonnistuminen) "Viestit.
Tämä ei yleensä ole ongelma. Se on usein viesti normaalista toiminnasta. Java Sanotaan, että se on juuri päättynyt pieneen roskaan.
Kokoelma, koska se loppui huoneesta Eedenissä (osion Java Hyvin nuoret esineet) . Yleensä viesti näyttää
’muistiinpanoa ennen ’muistia’. Jos nämä kaksi numeroa ovat lähellä toisiaan, se tarkoittaa, että roskat eivät ole tuottavia.
Viesti on vain merkki ongelmasta, jos se on hyvin usein (joka sekunti) eivät ole tuottavia, ja määrät ovat suuria eivätkä kasva,
jotka yhdessä osoittavat, että Java Tarvitset enemmän muistia, kamppailee vapauttaa muistia, ja ei voi vapauttaa muistia.
Tämä voi tapahtua stressaavana aikana ja sitten mennä pois. Jos se jatkuu, se on merkki ongelmasta.
* Jos näet ’java.lang.OutOfMemoryError’in ERDDAP™ &gt; [log.txt](/docs/server-admin/additional-information#log) tiedosto,
Katso nähkää [OutMemory-virhe](/docs/server-admin/additional-information#outofmemoryerror) vinkkejä siitä, miten diagnosoida ja ratkaista ongelmat.
         
### Luvat{#permissions} 

*  [Linux ja Macs muuttavat käyttöoikeuksia](#permissions) kaikista ’*.sh’-tiedostoista ’tomcat/bin/’, jotka omistaja voi suorittaa:
  ```
  chmod +x *.sh
  ```

### Fonts{#fonts} 

*  [Kuvat:](#fonts) Pidämme enemmän vapaista [DejaVu-fontit](https://dejavu-fonts.github.io/) toiseen Java fontteja.
Näiden fonttien käyttö on suositeltavaa, mutta sitä ei tarvita.

Jos päätät olla käyttämättä DejaVu-fontteja, sinun on muutettava fontFamily-asetus asennuksessa.xml <fontFamily> Sansserif </fontFamily> &gt;,
joka on kaikkien saatavilla Java jakelua. Jos asetat " <fontFamily> "Fontin nimi, jota ei ole saatavilla, ERDDAP™ ei kuormita
ja tulostaa luettelon saatavilla olevista fonteista "log.txt"-tiedostossa. Sinun on käytettävä yhtä näistä fonteista.

Jos haluat käyttää DejaVu-fontteja, varmista, että <fontFamily> "Sentup.xml on" <fontFamily> DejaVu Sans </fontFamily> &gt;

DejaVu-fonttien asentaminen, lataa [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5 522 795 tavua, MD5=33E1E61FAB06A547851ED308B4FFF42) 
ja poista fonttitiedostot väliaikaiseen hakemistoon.

  * Linuxissa:
    * Linux Adoptium Java jakelua, katso [Nämä ohjeet](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * toisen kanssa Java Jakelu: ’tomcat’-käyttäjänä kopioi fonttitiedostot JAVA_HOME/lib/fonts’ -sovellukseen Java Löydä fontit.
Muista: jos/kun päivität uudempaan versioon Java Sinun on asennettava nämä fontit uudelleen.
  * Kunkin fonttitiedoston kohdalla, kaksinkertaista napsauttamalla sitä ja valitse sitten Asenna Font.
  * Windows 7 ja 10: Windows Explorerissa valitse kaikki fonttitiedostot. Klikkaa oikein. Klikkaa asennusta.
             
### Testaa Tomcat{#test-tomcat} 

* Testaa Tomcat-asennus.
  * Linux:
    * Käyttäjänä "tomcat", juokse "tomcat/bin/startup.sh"
    * Katso URL + ":80/" selaimessasi (esim. [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac Mac Mac (Tomcat toimii järjestelmänvalvojana) :
    * "Tomcat/bin/startup.sh"
    * Katso URL + ":80/" selaimessasi (esim. [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Huomaa, että oletusarvoisesti Tomcat on vain käytettävissäsi. Se ei ole julkisesti saatavilla.
  * Windows paikalliset:
    * Napsauta Tomcat-kuvaketta järjestelmän lokerossa ja valitse "Aloita palvelu".
    * Näkymä [http://127.0.0.1:8080/](http://127.0.0.1:8080/) Tai ehkä [http://localhost:8080/](http://localhost:8080/) Selaimessasi. Huomaa, että oletusarvoisesti Tomcat on vain käytettävissäsi. Se ei ole julkisesti saatavilla.

Tomcat "Onnittelut" -sivulla.

Jos on ongelmia, katso Tomcat-lokitiedosto ’tomcat/logs/catalina.out’.

### Ongelmia Tomcatin asennuksen kanssa?{#troubles-with-the-tomcat-installation} 

* Linux ja Mac, jos et pääse Tomcatiin ERDDAP™   (Tai ehkä et pääse tietokoneelta palomuurin ulkopuolella.) ,
Voit testata, jos Tomcat kuuntelee porttia 8080 kirjoittamalla (kuin juuret) palvelimen komentorivillä:

  ```
  netstat -tuplen | grep 8080
  ```

Tämän pitäisi palauttaa yksi rivi jollakin tavalla:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (Missä on digit) Tämä viittaa siihen, että "java"-prosessi (Epäilemättä Tomcat) Satama 8080 tarkoittaa "Tcp"-liikennettä.
Jos riviä ei palautettu, jos linja on merkittävästi erilainen tai jos kaksi tai useampia rivejä on palautettu, satamaasetukset voivat olla ongelma.

* Katso Tomcat-lokitiedosto ’tomcat/logs/catalina.out’ Tomcan ongelmat ja jotkut ERDDAP™ Käynnistysongelmat ovat lähes aina esillä.
Tämä on yleistä, kun aloitat ERDDAP™ .

* Nähdään [Tomca](https://tomcat.apache.org/) Verkkosivut tai hae apua, mutta kerro meille ongelmat, joita sinulla on ja löytämäsi ratkaisut.

* Katso meidän [Lisätuen saaminen](/docs/intro#support) .
             
###  ERDDAP™ Sisältö{#erddap-content} 
3.   [Aseta "tomcat/content/erddap"-tiedostot.](#erddap-content) 
Linux, Mac ja Windows, lataa [erdapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
ja poista se "tomcat"-hakemistoon, luomalla "tomcat/content/erddap".

__Version 1.0.0, 20333 tavua, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, päivätty 2024-10-14

Myös aiemmat versiot ovat saatavilla:

    *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19 792 tavua, MD5=8F892616BAEEF2DF0F4B036DCB4AD7C, päivätty 2022-02-16) 
    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19 792 tavua, MD5=8F892616BAEEF2DF0F4B036DCB4AD7C, päivätty 2022-02-16) 
    *  [2.2.](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19 810 tavua, MD5=1E26F62E7A06191EE68C40B9A29362, päivätty 2022-10-09) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19 810 tavua, MD5=1E26F62E7A06191EE68C40B9A29362, päivätty 2022-12-08) 
    *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19 810 tavua, MD5=1E26F62E7A06191EE68C40B9A29362, päivätty 2023-02-27) 

#### Muu ohjaus{#other-directory} 

Edeltäjä Red Hat Enterprise Linux (Ryhmä) muissa tilanteissa, joissa et saa muuttaa Tomcat-hakemistoa tai missä haluat/tarvitset
Laittaa ERDDAP™ Sisältöhakemisto jostain muusta syystä (Jos käytät Jettyä Tomcatin sijaan) ,
Unzip ’erdapContent .zip &gt; haluttuun hakemistoon (johon vain käyttäjällä on pääsy) ja asettaa » erddapContentDirectory Järjestelmän omaisuus
 (esim. » erddapContentDirectory  =~tomcat/content/erddap &gt; &gt;) niin ERDDAP™ Löydä tämä uusi sisältöhakemisto.

### Asennus.xml{#setupxml} 

*  [Lue kommentit ’tomcat/content/erddap/setup.xml &gt; &gt;](#setupxml) Tee pyydetyt muutokset. setup.xml on tiedosto, jossa on kaikki asetukset, jotka määrittävät, miten ERDDAP™ käyttäytyä.

Alkuvaiheessa sinun on ainakin muutettava näitä asetuksia:
      * &gt; &gt; <bigParentDirectory> &gt; &gt;
      * &gt; &gt; <emailEverythingTo> &gt; &gt;
      * &gt; &gt; <baseUrl> &gt; &gt;
      * &gt; &gt; <email...> &gt; asetukset
      * &gt; &gt; <admin...> &gt; asetukset
      * &gt; &gt; <baseHttpsUrl> &gt; &gt; (Kun olet asentanut https ) 

Kun luot BigParentDirectoryn, BigParentDirectoryn emohakemistosta:

    * Tee "tomcat" käyttäjästä "bigParentDirectory":
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Muuta "ryhmä" tomcatiksi, käyttäjänimeksi tai pienen ryhmän nimeksi, joka sisältää tomcatin ja kaikki Tomcatin ylläpitäjät ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Muuta lupia, jotta Tomcat ja ryhmä ovat lukeneet, kirjoittaneet ja toteuttaneet etuoikeuksia:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Poista "muut" käyttäjän lukemis-, kirjoitus- tai toteutusoikeudet. Tämä on tärkeää ehkäistä mahdollisesti arkaluonteisten tietojen lukemista.
Sisällä ERDDAP™ kirjaa tiedostoja ja tiedostoja yksityisistä tietoaineistoista.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Ympäristömuuttujat{#environment-variables} 

Aloitetaan ERDDAP™ v2.13, ERDDAP™ Järjestäjät voivat ylittää minkä tahansa arvon asennus.xml määrittämällä ympäristömuuttujan.
Nimeä » ERDDAP arvonimeä ennen juoksemista ERDDAP™ . Esimerkiksi käyttö » ERDDAP _baseUrl ylittää <baseUrl> "arvoa.
Tämä voi olla kätevää, kun käytät ERDDAP™ Dockerin kaltaisella säiliöllä, koska voit asettaa asennusasetukset.xml
Toimita erityisasetuksia ympäristömuuttujan kautta. Jos toimitat salaisia tietoja ERDDAP™ tämän menetelmän kautta,
Tarkista, että tiedot pysyvät salaisina. ERDDAP™ Lue ympäristömuuttujat vain kerran käynnistysvaiheessa.
käynnistyksen ensimmäisessä sekunnissa, joten yksi tapa käyttää tätä on: aseta ympäristömuuttujat, aloita ERDDAP ,
Odota kunnes ERDDAP™ Se on aloitettu ja sitten ympäristömuuttujia.

###  datasets.xml  {#datasetsxml} 

* Lue kommentit sisään [ **Työskentelyä yhdessä datasets.xml Tiedosto** ](/docs/server-admin/datasets) . Myöhemmin, kun olet saanut ERDDAP™ Juoksen juoksemassa
ensimmäistä kertaa (yleensä vain oletustietojen kanssa) Muutat XML:ää ’tomcat/content/erddap/ datasets.xml &gt; &gt;
määrittää kaikki haluamasi tietoaineistot ERDDAP™ palvelemaan. Näin vietät suurimman osan ajastasi
Kun perustat ERDDAP™ ja myöhemmin säilyttäen ERDDAP™ .

Voit nähdä esimerkin [ datasets.xml Kirjoittanut GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (epätodennäköistä) Nyt tai (hieman todennäköisemmin) tulevaisuudessa, jos haluat muuttaa erddapin CSS-tiedostoa, kopioi
’tomcat/content/erddap/images/erdapStart2.cs’ to ’tomcat/content/erddap/images/erddap2.cs’ ja sen jälkeen tehdä muutoksia siihen.
Muutokset ’erdap2.cs:iin’ tulevat voimaan vain silloin, kun ERDDAP™ Käynnistetään uudelleen ja usein myös käyttäjän on puhdistettava selaimen välimuistitiedostot.
     
 ERDDAP™ ei toimi oikein, jos asennus.xml tai datasets.xml tiedosto ei ole hyvin muotoiltu XML-tiedosto. Kun olet muokannut näitä tiedostoja,
On hyvä tarkistaa, että tulos on hyvin muotoiltu XML liittämällä XML-teksti XML-testiin, kuten [xmlvalidaatio](https://www.xmlvalidation.com/) .
     
### Asenna erddap. War tiedostot{#install-the-erddapwar-file} 

4. Linux, Mac ja Windows, _download [Erddap.sota](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war) _ _ Tomcat/webapps »

__Version 2.28.1, 622,676,238 tavua, MD5=48b4226045f950c8d69ef9521b9bc9, päivätty 2025-09-05_

.war-tiedosto on suuri, koska se sisältää korkean resoluution rantaviivaa, rajoja ja korkeustietoja, joita tarvitaan karttojen luomiseen.

Myös aiempia versioita on saatavilla.

   *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551 068 245 tavua, MD5=5FEA912B5D42E50EAB9591F773EA848D, päivätty 2022-02-16) 
   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551 069 844 tavua, MD5=461325E97E7577EC671D50246CCFB8B, päivätty 2022-02-23) 
   *  [2.2.](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568 6644 411 tavua, MD5=F2CFF805893146E932E498FDDBD519B6, päivätty 2022-10-09) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 tavua, MD5=2B33354F633294213AE2AFDCF4DA6D0, päivätty 2022-12-08) 
   *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572 124,953 tavua, MD5=D843A043C506725EBD6F8FDCCA8FD5F, päivätty 2023-03-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568 748 187 tavua, MD5=970fbee172e28b0b8a07756eecbc898e, päivätty 2024-06-07) 
   *  [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592 292 039 tavua, MD5=652AFC9D1421F00B5F789DA2C4732D4C, päivätty 2024-11-07) 
   *  [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607 404 032 tavua, MD5=99a725108b37708e5420986c16a119, päivätty 2025-03-31) 
   *  [2.2.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620 554 403 tavua, MD5=3b2086c659ee4145ca2dff447bf4ef7, päivätty 2025-06-11) 

### Konfiguroi proxy (Erityinen käyttöönotto)  {#proxy} 

 ERDDAP™ on tyypillisesti sijoitettu webserverin käänteisen välityspalvelimen taakse, jotta sitä voidaan palvella tavallisilla HTTP-porteilla. (80 ja 443) .
SSL/TLS-terminaatio on usein hajallaan myös webserver-proxy-kerroksessa. Riippuu kunkin käyttöönoton vaatimuksista.

#### Apasseja{#apache} 

1. Varmista, että "mod_proxy" ja "mod_proxy" http "On ladattu:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Muokkaa olemassa olevaa &gt;&gt; <VirtualHost> &gt; tag (Jos on yksi) tai lisätä tiedoston lopussa:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Jos ERDDAP™ tarjoillaan muulla polulla kuin ’/erddap’, joka myös asettaa ’X-Forwarded-Prefix’-otsikon
Polkusegmentti _before_/erddap Tämä asetus olisi sopiva ERDDAP™ Palvellen
&gt;/subpath/erddap

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Käynnistä Apache uudelleen: ’/usr/sbin/apachectl’ K Graceful &gt; &gt; (Joskus se on toisessa hakemistossa.) .
         
#### Yhdessä{#nginx} 

nginx config -tiedostossa aseta nämä otsikot:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Jos ERDDAP™ tarjoillaan muulla polulla kuin ’/erddap’, joka myös asettaa ’X-Forwarded-Prefix’-otsikon
Polkusegmentti _before_/erddap Tämä asetus olisi sopiva ERDDAP™ Palvellen
&gt;/subpath/erddap

```
proxy_set_header X-Forwarded-Prefix /subpath
```


Jotta NGINX ja ERDDAP™ toimimaan oikein https Sinun täytyy laittaa seuraava snippet sisään Tomcat-palvelin.xml <Host> blokki:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Aloita Tomcat{#start-tomcat} 

*  (En suosittele Tomcat Web Application Managerin käyttöä. Jos et ole täysin suljettu ja käynnistys Tomcat, ennemmin tai myöhemmin sinulla on PermGen muistiongelmia.) 
*  (Linuxissa tai Mac OS:ssä, jos olet luonut Tomcat-käyttäjän, esimerkiksi tomcat, muista tehdä seuraavat vaiheet käyttäjänä.) 
* Jos Tomcat jo juoksee, sulje Tomcat (Linux tai Mac OS) Tomcat/bin/shutdown.sh
tai tai (Windowsissa) Tomcat \bin shutdown.bat &gt; &gt;

Linux, käytä PS -ef | Tomcat ennen ja jälkeen "shutdown.sh" varmistaa, että tomcat prosessi on pysähtynyt.
Prosessi on lueteltava ennen sulkeutumista, eikä sitä lopulta ole listattu sulkeutumisen jälkeen.
Se voi kestää minuutin tai kaksi. ERDDAP™ Täysin suljettu. Ole kärsivällinen. Jos se ei näytä pysähtyvän itsestään, käytä:
Tappaminen -9 <processID> &gt; &gt;
* Aloita Tomcat (Linux tai Mac OS) "Tomcat/bin/startup.sh" tai (Windowsissa) Tomcat\bin\\startup.bat &gt; &gt;

## on ERDDAP™ juoksemaan?{#is-erddap-running} 

Käytä selainta nähdäksesihttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ Käynnistetään ilman tiedostoja. Datasetit ladataan taustasäikeeseen, joten ne ovat saatavilla yksi kerrallaan.

### Troubleshoot{#troubleshooting} 

* Kun käyttäjän pyyntö tulee sisään, se menee Apacheen. (Linux- ja Mac OS -tietokoneissa) Sitten Tomcat, ERDDAP™ .
* Näet, mitä tulee Apache (liittyviä virheitä) Apache-lokitiedostoissa.
*    [Sinä](/docs/server-admin/additional-information#tomcat-logs) Katso, mitä Tomcat (liittyviä virheitä) 
Tomcat-lokitiedostot (’tomcat/logs/catalina.out’ ja muut tiedostot kyseisessä hakemistossa) .
*    [Sinä](/docs/server-admin/additional-information#log) Saa nähdä, mitä tulee ERDDAP diagnostisia viestejä ERDDAP ,
Viestien virheet ERDDAP Sisällä ERDDAP™ &gt; &gt; <bigParentDirectory> /logs/log.txt tiedosto
* Tomcat ei aloita ERDDAP™ Kun Tomcat saa pyynnön ERDDAP™ . Voit katsoa Tomcat-lokitiedostoja, jos
Alku alkoi ERDDAP™ tai jos tähän yritykseen liittyy virheilmoitus.
* Milloin ERDDAP™ Aloita, se nimeää vanhan ERDDAP™ log.txt-tiedosto (”Logo Archived At <CurrentTime> .txt ») Luo uusi log.txt-tiedosto.
Jos "log.txt"-tiedosto on vanha, se on merkki siitä, että ERDDAP™ Ei ole hiljattain aloitettu uudelleen. ERDDAP™ Kirjoita lokitiedot puskuriin
ja kirjoittaa puskurin lokitiedostoon säännöllisesti, mutta voit pakottaa ERDDAP™ Kirjoita puskuri lokitiedostoon vierailemalla
&gt; &gt; /erddap/status.html &gt;

### Vaikeus: Vanha versio Java  {#trouble-old-version-of-java} 

Jos käytät versiota Java Se on liian vanha ERDDAP , ERDDAP™ Et juokse ja näet virheilmoituksen Tomcatin lokitiedostossa

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

Ratkaisu on päivittää uusin versio Java Varmista, että Tomcat käyttää sitä.

### Slow startup ensimmäistä kertaa{#trouble-slow-startup-first-time} 

Tomcatin on tehtävä paljon työtä ensimmäisen kerran, kun sovellus on ERDDAP™ Se on aloitettu; erityisesti sen on purettava "erddap.war"-tiedosto.
 (joka on kuin .zip tiedostotiedosto) . Joillakin palvelimilla ensimmäinen yritys nähdä ERDDAP™ Tanssit (30 sekuntia?) kunnes tämä työ on valmis.
Muilla palvelimilla ensimmäinen yritys epäonnistuu välittömästi. Jos odotat 30 sekuntia ja yritä uudelleen, se onnistuu, jos ERDDAP™ asennettiin oikein.

Tähän ei ole korjausta. Näin Tomcat toimii. Tämä tapahtuu vasta ensimmäisen kerran, kun olet asentanut uuden version. ERDDAP™ .

## Sulje ja käynnistä uudelleen{#shut-down-and-restart} 

Tulevaisuudessa suljetaan (uudelleenkäynnistys)   ERDDAP™ nähtävä [Miten lopettaa ja käynnistää Tomcat ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Ongelmia?{#trouble} 

Tomcatin tai ERDDAP™ ?? Katso meidän [Lisätuen saaminen](/docs/intro#support) .

## Sähköpostiilmoitus uusista versioista ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Jos haluat saada sähköpostiviestin aina, kun uusi versio ERDDAP™ Saatavilla tai muu tärkeä ERDDAP™ ilmoitukset,
Voit liittyä ERDDAP™ Ilmoituslistat [täällä täällä täällä](https://groups.google.com/g/erddap-announce) . Luettelossa on noin yksi sähköposti kolmen kuukauden välein.

## Mukautettu{#customize} 

*  [Mukauta itseäsi ERDDAP™ korostaa organisaatiotasi (Ei ei ei NOAA   ERD ) .](#customize) 
* Vaihda lippu, joka näkyy kaikkien huipulla ERDDAP™ .html-sivut muokkaamalla <startBodyHtml5> "Tag in your" (säv. datasets.xml &gt; tiedosto.
(Jos ei ole yhtä, kopioi oletus ERDDAP™ ’tomcat/webapps/erddap/WEB-INF/Classes/Gov/noaa/pfel/erddap/util/viestit.xml’ tiedostotiedosto
Sisään » datasets.xml ja muokkaa sitä.) Voit esimerkiksi:
  * Käytä erilaista kuvaa (• organisaation logo) .
  * Muuta taustaväriä.
  * Muutos" ERDDAP™ "Organisaatiosi" ERDDAP™ """
  * Vaihda "Tieteellisten tietojen helpompi saatavuus" "Sinun organisaatiosi tietojen helpompi saatavuus".
  * Vaihda "Brought to You by" -linkkejä ollaksesi linkkejä organisaatioosi ja rahoituslähteisiin.
* Muuta kotisivun vasemmalla puolella olevaa tietoa muokkaamalla <theShortDescriptionHtml> "Tag in your" (säv. datasets.xml &gt; tiedosto.
(Jos ei ole yhtä, kopioi oletus ERDDAP™ ’tomcat/webapps/erddap/WEB-INF/Classes/Gov/noaa/pfel/erddap/util/viestit.xml’ tiedostotiedosto
Sisään » datasets.xml ja muokkaa sitä.) Voit esimerkiksi:
  * Kerro, mitä organisaatiosi ja/tai ryhmäsi tekee.
  * Selvitä, millaisia tietoja tämä ERDDAP™ on.
  * Muuttaa ikoni, joka näkyy selaimen välilehtiä, laittaa organisaation favicon. ico in ’tomcat/content/erddap/images/’.
Näytähttps://en.wikipedia.org/wiki/Favicon.
