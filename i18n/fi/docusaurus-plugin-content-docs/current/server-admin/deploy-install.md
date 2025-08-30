---
sidebar_position: 1
---

# Asentaminen
Miten tehdä ensimmäinen asennusERDDAP™Sinun palvelijasi


ERDDAP™Voit käyttää mitä tahansa palvelinta, joka tukeeJavaTomcat (muut sovelluspalvelimet, kuten Jetty, mutta emme tue niitä.) .ERDDAP™on testattu Linuxilla (Lähde: Amazon's AWS) Mac ja Windows-tietokoneet.
*    **Docker** ----- Tarjoamme[ERDDAP™Docker-säiliö](https://hub.docker.com/r/erddap/erddap)IOOS tarjoaa nyt[Nopea aloitusopasERDDAP™Docker Container](https://ioos.github.io/erddap-gold-standard/index.html).
Se on standardiERDDAP™Asentaminen Docker-säiliöön.
Dockerin kautta Kompleksi tarjoaa helppoja tapoja luoda sl ja seuranta, lue lisää[Dockerin dokumentointi](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md).
Jos käytät Dockeria, pidät todennäköisesti Docker-versiosta.
Jos haluat käyttää pilvipalveluita, pidät todennäköisesti Docker-versiosta.
*    **Amazon Amazon** ----- Jos olet asennuksessaERDDAP™Amazon Web Services EC2:ssa, katso tämä[Amazon Web Services yleiskatsaus](/docs/server-admin/additional-information#amazon)Ensimmäinen.
*    **Linux ja Macit** -----ERDDAP™Toimii erinomaisesti Linux- ja Mac-tietokoneissa. Katso ohjeet alta.
*    **Windows Windows** ----- Windows on hyvä testataERDDAP™henkilökohtaiseen käyttöön (Katso ohjeet alta) Mutta emme suosittele käyttämään sitä julkisesti.ERDDAPs. JuokseminenERDDAP™Windowsissa voi olla ongelmia:ERDDAP™Et voi poistaa ja/tai nimetä tiedostoja nopeasti. Tämä johtuu todennäköisesti virustorjuntaohjelmistosta. (Lähde: McAfee and Norton) Tämä tarkistaa tiedostoja viruksia. Jos törmäät tähän ongelmaan (jotka näkyvät virheviestissä[log.txt](/docs/server-admin/additional-information#log)tiedostot "Ei voi poistaa ...") Virustorjuntaohjelmiston asetukset saattavat osittain lievittää ongelmaa. Käyttää Linux- tai Mac-palvelinta.

 **StandardiERDDAP™Linux-, Mac- ja Windows-tietokoneiden asennusohjeet ovat:** 

0. Varmista, että kaikki riippuvuudet on asennettu. Ei-Windows koneita (Linux ja Mac) Tarvitset csh:tä.
## Java {#java} 
1.  [For ForERDDAP™V2.19+, perustettuJava21.](#java)
Turvallisuussyistä on lähes aina parempi käyttää uusinta versiota.Java21.
Lataa ja asenna uusin versio
    [Adoptiumin OpenJDK (Temurin) 21 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21). Asennuksen todentamiseksi tyyppi "/_javaJreBinDirectory_/java -versio"
Käyttäjä/paikallinen/jdk-21.0.3+9/jre/bin/java käännökset
    
    ERDDAP™Teosten kanssaJavamuista lähteistä, mutta suosittelemme Adoptiumia, koska se on tärkein, yhteisölle tuettu, ilmainen. (Olut ja puhe) versiostaJava21, joka tarjoaa pitkäaikaista tukea (Ilmaiset päivitykset jo vuosia ennen alkuperäistä julkaisua) . Turvallisuussyistä päivitäERDDAPversiostaJavasäännöllisesti uusina versioinaJava21 on saatavana Adoptiumilta.
    
    ERDDAP™Sitä on testattu ja käytetty laajasti 21:llä, ei muilla versioilla. Erilaisista syistä emme testaa tai tue muita versioita.Java.
     
## Tomca{#tomcat} 
2.  [Aseta ylös](#tomcat) [Tomca](https://tomcat.apache.org).
Tomcat on yleisimmin käytettyJavaPalveluntarjoaja, joka onJavaohjelmisto, joka on käyttöjärjestelmän verkkopalveluiden jaJavapalvelinohjelmisto, kutenERDDAP™. Vapaa ja avoin lähdekoodi (FOSS) .
    
Voit käyttää toistaJavaSovelluspalvelin (Esimerkki: Jetty) Testaamme ja tuemme Tomcatia.
     
    
    * Lataa Tomcat ja pakkaa se palvelimellesi tai PC:lle.
Turvallisuussyistä on lähes aina parempi käyttää Tomcat 10:n uusinta versiota. (9 ja alapuolella ei ole hyväksyttävää) joka on suunniteltu toimimaanJava21 tai uudempi. Tomcat-hakemistoa kutsutaan nimellä _tomcat_.
        
Varoitus&#33; Jos sinulla on jo Tomcat, jolla on jokin muu verkkosovellus (Erityisesti kolme) Suosittelemme, että asennatERDDAP™Sisällä[Toinen Tomcat](/docs/server-admin/additional-information#second-tomcat)koskaERDDAP™Tarvitset erilaisia Tomcat-asetuksia, eikä sinun tarvitse tyytyä muihin muistisovelluksiin.
        
        * Linuxissa,[Download "Tähti".gzTomcatin jakelu](https://tomcat.apache.org/download-10.cgi)Pakkaa se pois. Suosittelemme, että poistat sen paikallisesti/käyttäjältä.
        * Macissa Tomcat on todennäköisesti jo asennettu Library/Tomcatiin, mutta sen on päivitettävä Tomcat 10:n uusimpaan versioon.
Jos lataat sen,[Download "Tähti".gzTomcatin jakelu](https://tomcat.apache.org/download-10.cgi)Pakkaa se sivulle Library/Tomcat.
        * Windowsissa voit[Download "Core" "Zip" Tomcat](https://tomcat.apache.org/download-10.cgi)  (joka ei sotke Windows-rekisteriä ja jota hallitset DOS-komentorivillä) Pakkaa se sopivaan hakemistoon. (Kehittämistä varten käytämme "Core" "zip" -jakelua. Teemme hakemiston ja puramme sen sinne.) Voit ladata "Core" "64-bittinen Windows zip" -jakelun, joka sisältää enemmän ominaisuuksia. Jos jakelu on Windows-asennusohjelma, se saattaa Tomcatin esimerkiksi /Program Files/apache-tomcat-10.0.23 .
             
### palvelin.xml{#serverxml} 
*   [palvelin.xml](#serverxml)_tomcat_/conf/server.xml-tiedostossa on kaksi muutosta, jotka sinun tulisi tehdä kullekin&lt;Connector &gt; tags - yksi
```
        <Connector port="8080" 
```
Yksi
```
        <Conector port="8443"
```
    1.   (Suositellaan) LiitäntäTimeout-parametriarvon nostaminen ehkä 300 000:een (Millisekuntia)   (Mikä on 5 minuuttia) .
    2.   (Suositellaan) Lisätään uusi parametri: RentoutettuQueryChars ="\\[\\]|""" Tämä on valinnainen ja hieman vähemmän turvallinen, mutta poistaa käyttäjien tarve prosenttikoodiin, kun ne esiintyvät käyttäjän pyynnön URL-osoitteen parametreissa.
             
### Sisältö.xml{#contentxml} 
* Konteksti.xml... Resursseja - _tomcat_/conf/context.xml, ennen&lt;/ Context &gt; tag, Change the Resources tag Näytä tarkat tiedot (tai lisätä, jos se ei ole jo siellä) Aseta kätkön MaxSize-parametri 80000:
    &lt;CachingAllowed="todellinen" cacheMaxSize="80000" / &gt"
Näin vältetään lukuisia varoituksia katalinassa. Kaikki alkaa
”Varoitus\\[Pääpää\\]org.apache.catalina.webresources.Cache.getResources ei voi lisätä resurssia\\[WEB INF/Classes/...
         
### Apace Timeout{#apache-timeout} 
* Linux-tietokoneissa Apache-aikatauluasetukset muutetaan niin, että aikaa vievät käyttäjäpyynnöt eivät aikatauluta. (Se, mitä usein kutsutaan "Proxy" tai "Bad Gateway" -virheeksi.) . Käyttäjänä:
    1. Muokkaa apassiahttpd.conf tiedosto (Yleensä /etc /httpd/conf/) :
Muuta olemassa olevaa&lt;Timeout &gt; asetukset (tai lisätä tiedoston lopussa) 3600 (Sekunnit) Oletusarvon sijaan 60 tai 120 sekuntia.
Muuta olemassa olevaa&lt;ProxyTimeout &gt; asennus (tai lisätä tiedoston lopussa) 3600 (Sekunnit) Oletusarvon sijaan 60 tai 120 sekuntia.
    2. Käynnistä Apache: /usr/sbin/apachectl K Graceful (Joskus se on toisessa hakemistossa.) .
             
    * Turvallisuussuositus: Näytä[Nämä ohjeet](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)Tomcat-asennuksen turvallisuuden lisääminen erityisesti julkisille palvelimille.
         
    * YleisölleERDDAP™Linux- ja Mac-laitteissa on parasta perustaa Tomcat. (Ohjelman) käyttäjän "tomcat" (erillinen käyttäjä, jolla on rajalliset luvat ja[Ei salasanaa](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) . Vain käyttäjä voi siirtyä toimimaan käyttäjän tomcat. Tämä tekee hakkereiden mahdottomaksi kirjautua palvelimellesi käyttäjän tomcatina. Ja joka tapauksessa sinun pitäisi tehdä se niin, että tomcat-käyttäjällä on hyvin rajalliset käyttöoikeudet palvelimen tiedostojärjestelmään (lue + kirjoita + suorita etuoikeudet apache-tomcat-hakemistoon ja&lt;BigParentDirectory &gt; ja vain luku-oikeudet hakemistoihin, jotkaERDDAP™tarvitaan pääsyä).
        * Voit luoda Tomcat-käyttäjätilin (jolla ei ole salasanaa) Käyttämällä käskyä
Sudo käyttäjäadd tomcat -s /bin/bash -p """
        * Voit siirtyä käyttäjän tomcatiin käyttämällä komentoa.
Sudo su - Tomcat
             (Se pyytää sinulta superkäyttäjän salasanan, jotta voit tehdä tämän.) 
        * Voit lopettaa käyttäjien tomcatin käytön komennolla
Eksyminen
        * Suurin osa Tomcatista jaERDDAP™Käyttäjän ohjeet "tomcat". Käynnistä käynnistys.sh- ja sammutus.sh-skriptit käyttäjänä "tomcat" niin, että Tomcatilla on lupa kirjoittaa lokitiedostoihinsa.
        * Tomcatin pakkaamisen jälkeen apache-tomcat-hakemiston vanhemmalta:
            
            * Muuta apache-tomcat-hakemistopuun omistajuutta tomcatin käyttäjäksi.
Tomcat apache-tomcat-_10.0.23_
                 (Korvaa Tomcat-hakemiston todellinen nimi) .
            * Muuta "ryhmä" tomcatiksi, käyttäjänimeksi tai pienen ryhmän nimeksi, joka sisältää tomcatin ja kaikki Tomcatin ylläpitäjätERDDAPesim.
Chgrp - R_your KäyttäjäName_ apache-tomcat-_10.0.23_
            * Muuta lupia niin, että Tomcat ja ryhmä ovat lukeneet, kirjoittaneet, toteuttaneet etuoikeuksia.
chmod - R ug +rwx apache-tomcat-_10.0.23_
            * Poista "muut" käyttäjän lukemis-, kirjoitus- tai suoritusoikeudet:
chmod - R o-rwx apache-tomcat-_10.0.23_
Tämä on tärkeää, koska se estää muita käyttäjiä lukemasta mahdollisesti arkaluonteisia tietoja.ERDDAP™asennustiedostoja.
            
              
### Muisti{#memory} 
* Tomcatin ympäristömuuttujat
    
Linux ja Mac:
Luo tiedosto _tomcat_/bin/setenv.sh (Pääosat Red Hat Enterprise Linux\\[Ryhmä\\]Edit: Tomcat/conf/tomcat10.conf) Tomcatin ympäristömuuttujat. Tätä tiedostoa käyttää _tomcat_/bin/startup.sh ja shutdown.sh. Tiedosto sisältää jotain:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (Korvaa hakemiston nimet tietokoneeltasi) .
 (Jos olet aiemmin määrittänyt JRE-HOMEn, voit poistaa sen.)   
Macsissa sinun ei välttämättä tarvitse asettaa JAVAHOMEa.

Windowsissa:
Luo tiedosto _tomcatbin@setenv.bat asettaa Tomcatin ympäristömuuttujat. Tätä tiedostoa käyttää _tomcatbin.startup.bat jashutdown.bat. Tiedosto sisältää jotain:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (Korvaa hakemiston nimet tietokoneeltasi) .
Jos tämä koskee vain paikallista testiä, poista "palvelin".
 (Jos olet aiemmin määrittänyt JRE-HOMEn, voit poistaa sen.) 

XMX- ja -XM-muistiasetukset ovat tärkeitä, koskaERDDAP™toimii paremmin enemmän muistin kanssa. Aseta aina -Xms samaan arvoon kuin -Xmx.

* 32 bittiä ja 32 bittiäJava:
64 bittiäJavaPaljon parempi kuin 32Java32 bitJavaToimii niin kauan kuin palvelin ei ole kiireinen. Mitä enemmän fyysistä muistia palvelimessa on, sitä parempi: 4+ GB on hyvä, 2 GB on kunnossa, vähemmän ei suositella. 32 bittiäJavafyysinen muisti, Tomcat jaJavaÄlä juokse, jos yrität asentaa -Xmx yli 1500M (1200 m joissakin tietokoneissa) . Jos palvelimellasi on alle 2 Gt muistia, vähennä -Xmx-arvoa. (Sisältää M'egaBytes) 1/2 tietokoneen fyysisestä muistista.
* 64 bittiä ja 64 bittiäJava:
64 bittiäJavaToimii vain 64-bittisessä käyttöjärjestelmässä.
    
    * kanssaJava8, sinun on lisättävä \\-d64 Tomcat CATALIN AOPTS parametri setenv.bat
    * kanssaJavaValitse 64 bittiäJavaKun lataat versionJava"64 bittiä"
    
64 bittiäJavaTomcat jaJavaVoit käyttää erittäin korkeita -Xmx- ja -Xms-asetuksia. Mitä enemmän fyysistä muistia palvelimessa on, sitä parempi. Yksinkertainen ehdotus: suosittelemme, että asetat -Xmx ja -Xms (Sisältää M'egaBytes) 1/2 (tai vähemmän) tietokoneen fyysinen muisti. Saa nähdä, onko TomcatJavajaERDDAP™64-bittisessä tilassa etsitään "vähän"ERDDAPPäivittäinen raportti tai _bigParentDirectory_/logs[log.txt](/docs/server-admin/additional-information#log)tiedostotiedosto (_bigParentDirectory_ on määritelty[Asennus.xml](#setupxml)) .
#### Garbage kokoelma{#garbage-collection} 
* SisälläERDDAP™&gt;[log.txt](/docs/server-admin/additional-information#log)Näet monia "GC" (Jakamisen epäonnistuminen) "Viestit.
Tämä ei yleensä ole ongelma. Se on usein viesti normaalista toiminnasta.Javasanoen, että se on juuri saanut valmiiksi pienen roskakokoelman, koska se loppui huoneesta Eedenissä. (osionJavaHyvin nuoret esineet) . Yleensä viesti näyttää sinulle _memoryUseBefore &gt;_memoryUseAfter_. Jos nämä kaksi numeroa ovat lähellä toisiaan, se tarkoittaa, että roskat eivät ole tuottavia. Viesti on vain merkki ongelmasta, jos se on hyvin usein (joka sekunti) eivät ole tuottavia, ja numerot ovat suuria eivätkä kasva, jotka yhdessä osoittavat, ettäJavaTarvitset enemmän muistia, kamppailee vapauttaa muistia, ja ei voi vapauttaa muistia. Tämä voi tapahtua stressaavana aikana ja sitten mennä pois. Mutta jos se jatkuu, se on merkki ongelmasta.
* Jos näet Java.lang.OutOfMemoryErrorinERDDAP™&gt;[log.txt](/docs/server-admin/additional-information#log)tiedosto, katso[OutMemory-virhe](/docs/server-admin/additional-information#outofmemoryerror)vinkkejä siitä, miten diagnosoida ja ratkaista ongelmat.
         
### Luvat{#permissions} 
*   [Linux ja Macs muuttavat käyttöoikeuksia](#permissions)kaikista\\*.sh_tomcat_/bin / tiedostot, jotka omistaja voi suorittaa, esim.
```
    chmod +x \\*.sh  
```
### Fonts{#fonts} 
*   [Kuvat:](#fonts)Pidämme enemmän vapaista[DejaVu-fontit](https://dejavu-fonts.github.io/)toiseenJavafontteja. Näiden fonttien käyttö on suositeltavaa, mutta sitä ei tarvita.
    
Jos päätät olla käyttämättä DejaVu-fontteja, sinun on muutettava fontFamily-asetus asennuksessa.xml.&lt;FontFamily &gt;SansSerif&lt;FontFamily&gt, joka on kaikkien saatavillaJavajakelua. Jos asetat fontFamilyn fontin nimeen, jota ei ole saatavilla,ERDDAP™ei kuormita ja tulostaa luettelon saatavilla olevista fonteista log.txt-tiedostossa. Sinun on käytettävä yhtä näistä fonteista.
    
Jos päätät käyttää DejaVu-fontteja, varmista, että fontFamily-asetuksen asennus.xml on&lt;Fontti Lähellä majoitusliikettä DejaVu Sans&lt;FontFamily &gt;
    
DejaVu-fonttien asentaminen, lataa[DejaVuFonts.zip](/DejaVuFonts.zip)  (5 522 795 tavua, MD5=33E1E61FAB06A547851ED308B4FFF42) ja poista fonttitiedostot väliaikaiseen hakemistoon.
    
    * Linuxissa:
        * Linux AdoptiumJavajakelua, katso[Nämä ohjeet](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/).
        * toisen kanssaJavaJakelu: Tomcat-käyttäjänä kopioi fonttitiedostot _JAV_HOME_/lib/fontsJavaLöydä fontit. Muista: jos/kun päivität uudempaan versioonJavaSinun on asennettava nämä fontit uudelleen.
    * Kunkin fonttitiedoston kohdalla, kaksinkertaista napsauttamalla sitä ja valitse sitten Asenna Font.
    * Windows 7 ja 10: Windows Explorerissa valitse kaikki fonttitiedostot. Klikkaa oikein. Klikkaa asennusta.
             
### Testaa Tomcat{#test-tomcat} 
* Testaa Tomcat-asennus.
    * Linux:
        * Käyttäjänä "tomcat", juokse _tomcat_/bin/startup.sh
        * Katso URL + ":80/" selaimessasi (esim.[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) .
        * Tomcat "Onnittelut" -sivulla.
Jos ongelmia on, katso Tomcat-lokitiedosto _tomcat_/logs/catalina.out.
    * Mac Mac Mac (Tomcat toimii järjestelmänvalvojana) :
        * _tomcat_/bin/startup.sh
        * Katso URL + ":80/" selaimessasi (esim.[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) . Huomaa, että oletusarvoisesti Tomcat on vain käytettävissäsi. Se ei ole julkisesti saatavilla.
        * Tomcat "Onnittelut" -sivulla.
Jos ongelmia on, katso Tomcat-lokitiedosto _tomcat_/logs/catalina.out.
    * Windows paikalliset:
        
        * Napsauta Tomcat-kuvaketta järjestelmän lokerossa ja valitse "Aloita palvelu".
        * Näkymä[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/)Tai ehkä[ http://localhost:8080/ ](http://localhost:8080/)Selaimessasi. Huomaa, että oletusarvoisesti Tomcat on vain käytettävissäsi. Se ei ole julkisesti saatavilla.
        * Tomcat "Onnittelut" -sivulla.
Jos ongelmia on, katso Tomcat-lokitiedosto _tomcat_/logs/catalina.out.
            
### Ongelmia Tomcatin asennuksen kanssa?{#troubles-with-the-tomcat-installation} 
* Linux ja Mac, jos et pääse TomcatiinERDDAP™  (Tai ehkä et pääse tietokoneelta palomuurin ulkopuolella.) Voit testata, jos Tomcat kuuntelee porttia 8080. (kuin juuret) palvelimen komentorivillä:
```  
    netstat -tuplen | grep 8080  
```
Tämän pitäisi palauttaa yksi rivi jollakin tavalla:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     (Missä # on digi) Tämä viittaa siihen, että "java"-prosessi (Epäilemättä Tomcat) Satama 8080 tarkoittaa "Tcp"-liikennettä. Jos riviä ei palautettu, jos linja on merkittävästi erilainen tai jos kaksi tai useampia rivejä on palautettu, satamaasetukset voivat olla ongelma.
* Katso Tomcat-lokitiedosto _tomcat_/logs/catalina.out Tomcan ongelmat ja jotkutERDDAP™Käynnistysongelmat ovat lähes aina esillä. Tämä on yleistä, kun aloitatERDDAP™.
* Nähdään[Tomca](https://tomcat.apache.org/)Verkkosivut tai hae apua, mutta kerro meille ongelmat, joita sinulla on ja löytämäsi ratkaisut.
* Katso meidän[Lisätuen saaminen](/docs/intro#support).
             
### ERDDAP™Sisältö{#erddap-content} 
3.  [Aseta ylös_tomcat_/content/erddaptiedostojen määrittely.](#erddap-content)  
Linux, Mac ja Windows, lataa[erdapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (versio 1.0.0, 20333 tavua, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, päivätty 2024-10-14) _tomcat_, luominen_tomcat_/content/erddap.

    \\[Myös aiemmat versiot ovat saatavilla:
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19 792 tavua, MD5=8F892616BAEEF2DF0F4B036DCB4AD7C, päivätty 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19 792 tavua, MD5=8F892616BAEEF2DF0F4B036DCB4AD7C, päivätty 2022-02-16)   
    [2.2.](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19 810 tavua, MD5=1E26F62E7A06191EE68C40B9A29362, päivätty 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19 810 tavua, MD5=1E26F62E7A06191EE68C40B9A29362, päivätty 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19 810 tavua, MD5=1E26F62E7A06191EE68C40B9A29362, päivätty 2023-02-27) 
_tomcat_, luominen_tomcat_/content/erddap.\\]
    
#### Muu ohjaus{#other-directory} 
Edeltäjä Red Hat Enterprise Linux (Ryhmä) muissa tilanteissa, joissa et saa muokata Tomcat-hakemistoa tai joissa haluat/tarvitsetERDDAP™Sisältöhakemisto jostain muusta syystä (Jos käytät Jettyä Tomcatin sijaan) Unzip erdapContent.ziphaluttuun hakemistoon (Käyttäjä = Tomcat) ja asettaaerddapContentDirectoryJärjestelmän omaisuus (esim.erddapContentDirectory=~tomcat/content/erddap) niinERDDAP™Löydä tämä uusi sisältöhakemisto.
    
### Asennus.xml{#setupxml} 
*   [Lue kommentit sisään_tomcat_/content/erddap// **Asennus.xml** ](#setupxml)Tee pyydetyt muutokset. setup.xml on tiedosto, jossa on kaikki asetukset, jotka määrittävät, mitenERDDAP™käyttäytyä.
Alkuvaiheessa sinun on ainakin muutettava näitä asetuksia:
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
Kun luot BigParentDirectoryn, BigParentDirectoryn emohakemistosta:
    
    * Käyttäjä=tomcat BigParentDirectoryn omistaja, esim.
```
        chown -R tomcat _bigParentDirectory_
```
    * Muuta "ryhmä" tomcatiksi, käyttäjänimeksi tai pienen ryhmän nimeksi, joka sisältää tomcatin ja kaikki Tomcatin ylläpitäjätERDDAPesim.
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * Muuta lupia niin, että Tomcat ja ryhmä ovat lukeneet, kirjoittaneet, toteuttaneet etuoikeuksia.
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * Poista "muut" käyttäjän lukemis-, kirjoitus- tai toteutusoikeudet. Tämä on tärkeää estää mahdollisesti arkaluonteisten tietojen lukeminen.ERDDAP™Lokitiedostot ja tiedostot, joissa on tietoja yksityisistä tietoaineistoista:
```
        chmod -R o-rwx _bigParentDirectory_
```

### Ympäristömuuttujat{#environment-variables} 
AloitetaanERDDAP™v2.13,ERDDAP™Järjestäjät voivat ylittää minkä tahansa arvon asennus.xml määrittämällä ympäristömuuttujan nimeltäERDDAPArvonlisävero - ennen juoksuaERDDAP™. Esimerkiksi käyttöERDDAPBaseUrl ylittää&lt;BaseUrl & Gt, arvot. Tämä voi olla kätevää, kun käytätERDDAP™Dockerin kaltaisella säiliöllä, koska voit asettaa standardiasetukset asetukseen.xml ja toimittaa sitten erityisasetuksia ympäristömuuttujan kautta. Jos toimitat salaisia tietojaERDDAP™Tämän menetelmän avulla varmista, että tiedot pysyvät salaisina.ERDDAP™Ympäristömuuttujat luetaan vain kerran käynnistysvaiheessa, käynnistyksen ensimmäisessä sekunnissa, joten yksi tapa käyttää tätä: aseta ympäristömuuttujat, aloitaERDDAPOdota kunnesERDDAP™Se on aloitettu ja sitten ympäristömuuttujia.
    
### datasets.xml {#datasetsxml} 
* Lue kommentit sisään[ **Työskentelyä yhdessädatasets.xmlTiedosto** ](/docs/server-admin/datasets). Myöhemmin, kun olet saanutERDDAP™Juoksen ensimmäistä kertaa (yleensä vain oletustietojen kanssa) Muutat XML:ää_tomcat_/content/erddap// **datasets.xml** määrittää kaikki haluamasi tietoaineistotERDDAP™palvelemaan. Näin vietät suurimman osan ajastasi perustaessasiERDDAP™ja myöhemmin säilyttäenERDDAP™.

Voit nähdä esimerkin[datasets.xmlKirjoittanut GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).
     
*    (epätodennäköistä) Nyt tai (hieman todennäköisemmin) tulevaisuudessa, jos haluat muokata erddapin CSS-tiedostoa, tee kopio_tomcat_/content/erddap/images/erdapStart2.css kutsutaan erddap2.css ja sitten tehdä muutoksia siihen. Muutokset erdap2.css:iin tulevat voimaan vain silloin, kunERDDAP™Käynnistetään uudelleen ja usein myös käyttäjän on puhdistettava selaimen välimuistitiedostot.
     
ERDDAP™ei toimi oikein, jos asennus.xml taidatasets.xmltiedosto ei ole hyvin muotoiltu XML-tiedosto. Joten, kun olet muokannut näitä tiedostoja, on hyvä tarkistaa, että tulos on hyvin muotoiltu XML liittämällä XML-teksti XML-testiin, kuten XML-testiin.[xmlvalidaatio](https://www.xmlvalidation.com/).
     
### Asenna erdap.war-tiedosto{#install-the-erddapwar-file} 
4. Linux, Mac ja Windows, lataa[Erddap.sota](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war)_tomcat_/webapps.
     (versio 2.28.0, 620.824,288 tavua, MD5=f948b2ba603f65a83ac67af43da9e4c2, päivätty 08-29-2025) 
    
.war-tiedosto on suuri, koska se sisältää korkean resoluution rantaviivaa, rajoja ja korkeustietoja, joita tarvitaan karttojen luomiseen.
    
    \\[Myös aiempia versioita on saatavilla.
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551 068 245 tavua, MD5=5FEA912B5D42E50EAB9591F773EA848D, päivätty 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551 069 844 tavua, MD5=461325E97E7577EC671D50246CCFB8B, päivätty 2022-02-23)   
    [2.2.](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568 6644 411 tavua, MD5=F2CFF805893146E932E498FDDBD519B6, päivätty 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742,765 tavua, MD5=2B33354F633294213AE2AFDCF4DA6D0, päivätty 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572 124,953 tavua, MD5=D843A043C506725EBD6F8FDCCA8FD5F, päivätty 2023-03-03) 
    [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568 748 187 tavua, MD5=970fbee172e28b0b8a07756eecbc898e, päivätty 2024-06-07) 
    [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)  (592 292 039 tavua, MD5=652AFC9D1421F00B5F789DA2C4732D4C, päivätty 2024-11-07) 
    [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)  (607 404 032 tavua, MD5=99a725108b37708e5420986c16a119, päivätty 2025-03-31) 
    [2.2.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)  (620 554 403 tavua, MD5=3b2086c659ee4145ca2dff447bf4ef7, päivätty 06-11-2025) 
    \\]
    
#### ProxyPass{#proxypass} 
5. Käytä Proxy Käyttäjän ei tarvitse laittaa porttinumeroa, esim. 8080, URL-osoitteeseen.
Linux-tietokoneissa, jos Tomcat toimii Apachessa, muokkaa Apacheahttpd.conf tiedosto (Yleensä /etc /httpd/conf/) HTTP-liikenteen salliminenERDDAP™ilman porttinumeroa, esim. :8080, URL-osoitteessa. Käyttäjänä:
    1. Muokkaa olemassa olevaa&lt;VirtualHost &gt; tag (Jos on yksi) tai lisätä tiedoston lopussa:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. Käynnistä Apache uudelleen: /usr/sbin/apachectl K Graceful (Joskus se on toisessa hakemistossa.) .
         
### Yhdessä{#nginx} 
 (UNCOMMON) Jos käytät[Yhdessä](https://www.nginx.com/)  (Web-palvelin ja kuormantasapaino) :
Jotta NGINX jaERDDAP™toimimaan oikeinhttpsSinun täytyy laittaa seuraava snippet sisään Tomcat-palvelin.xml&lt;Host &gt; blokki:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
Ja nginx-konfig-tiedostossa sinun on määritettävä nämä otsikot:
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Kiitos Kyle Wilcoxille.)   
     
### Aloita Tomcat{#start-tomcat} 
*    (En suosittele Tomcat Web Application Managerin käyttöä. Jos et ole täysin suljettu ja käynnistys Tomcat, ennemmin tai myöhemmin sinulla on PermGen muistiongelmia.)   
     
*    (Linuxissa tai Mac OS:ssä, jos olet luonut Tomcat-käyttäjän, esimerkiksi tomcat, muista tehdä seuraavat vaiheet käyttäjänä.)   
     
* Jos Tomcat jo juoksee, sulje Tomcat (Linux tai Mac OS) _tomcat_/bin/shutdown.sh
tai tai (Windowsissa) _tomcat_binshutdown.bat
    
Linux, käytä ps -ef|grep tomcat ennen ja jälkeen suljin.sh varmistaa, että tomcat prosessi on pysähtynyt. Prosessi on lueteltava ennen sulkeutumista, eikä sitä lopulta ole listattu sulkeutumisen jälkeen. Se voi kestää minuutin tai kaksi.ERDDAP™Täysin suljettu. Ole kärsivällinen. Jos se ei näytä pysähtyvän itsestään, käytä:
_ Prosessi_
    
* Aloita Tomcat (Linux tai Mac OS) _tomcat_/bin/startup.sh
tai tai (Windowsissa) _tomcat_startup.bat

## onERDDAP™juoksemaan?{#is-erddap-running} 
Käytä selainta nähdäksesi http://_www.YourServer.org_/erddap/status.html   
ERDDAP™Käynnistetään ilman tiedostoja. Datasetit ladataan taustasäikeeseen, joten ne ovat saatavilla yksi kerrallaan.

### Troubleshoot{#troubleshooting} 
* Kun käyttäjän pyyntö tulee sisään, se menee Apacheen. (Linux- ja Mac OS -tietokoneissa) Sitten Tomcat,ERDDAP™.
* Näet, mitä tulee Apache (liittyviä virheitä) Apache-lokitiedostoissa.
*   [Sinä](/docs/server-admin/additional-information#tomcat-logs)Katso, mitä Tomcat (liittyviä virheitä) Tomcat-lokitiedostot (_tomcat_/logs/catalina.out ja muut tiedostot kyseisessä hakemistossa) .
*   [Sinä](/docs/server-admin/additional-information#log)Saa nähdä, mitä tuleeERDDAPdiagnostisia viestejäERDDAPja virheviestitERDDAPSisälläERDDAP™ &lt;BigParentDirectory &gt;logs/log.txt-tiedosto.
* Tomcat ei aloitaERDDAP™Kun Tomcat saa pyynnönERDDAP™. Voit katsoa Tomcat-lokitiedostoja, jos se alkoiERDDAP™tai jos tähän yritykseen liittyy virheilmoitus.
* MilloinERDDAP™Aloita, se nimeää vanhanERDDAP™log.txt-tiedosto (logArchivedAt_CurrentTime_.txt) Luo uusi log.txt-tiedosto. Jos siis loki. Txt-tiedosto on vanha, se on merkki siitä, ettäERDDAP™Ei ole hiljattain aloitettu uudelleen.ERDDAP™kirjoittaa lokitiedot puskuriin ja kirjoittaa vain puskurin lokitiedostoon säännöllisesti, mutta voit pakottaaERDDAP™Kirjoita puskuri lokitiedostoon vierailemalla.../erddap/status.html.

### Vaikeus: Vanha versioJava {#trouble-old-version-of-java} 
Jos käytät versiotaJavaSe on liian vanhaERDDAP,ERDDAP™Et juokse ja näet virheilmoituksen Tomcatin lokitiedostossa
Poikkeus thread "main" Java.lang.UnsupportedClassVersionError:
_some/class/name_: Tukematon.minor-versio _someNumber_
Ratkaisu on päivittää uusin versioJavaVarmista, että Tomcat käyttää sitä.

### Slow startup ensimmäistä kertaa{#trouble-slow-startup-first-time} 
Tomcatin on tehtävä paljon työtä ensimmäisen kerran, kun sovellus onERDDAP™Se on aloitettu, varsinkin se on purettava. War tiedostot (joka on kuin.ziptiedostotiedosto) . Joillakin palvelimilla ensimmäinen yritys nähdäERDDAP™Tanssit (30 sekuntia?) kunnes tämä työ on valmis. Muilla palvelimilla ensimmäinen yritys epäonnistuu välittömästi. Jos odotat 30 sekuntia ja yritä uudelleen, se onnistuu, josERDDAP™asennettiin oikein.
Tähän ei ole korjausta. Näin Tomcat toimii. Tämä tapahtuu vasta ensimmäisen kerran, kun olet asentanut uuden version.ERDDAP™.

## Sulje ja käynnistä uudelleen{#shut-down-and-restart} 
Tulevaisuudessa suljetaan (uudelleenkäynnistys)  ERDDAPnähtävä[Miten lopettaa ja käynnistää TomcatERDDAP](/docs/server-admin/additional-information#shut-down-and-restart).
## Ongelmia?{#trouble} 
Tomcatin taiERDDAP?? Katso meidän[Lisätuen saaminen](/docs/intro#support).
## Sähköpostiilmoitus uusista versioistaERDDAP {#email-notification-of-new-versions-of-erddap} 
Jos haluat saada sähköpostiviestin aina, kun uusi versioERDDAP™Saatavilla tai muu tärkeäERDDAP™Ilmoitukset, voit liittyäERDDAP™Ilmoituslistat[täällä täällä täällä](https://groups.google.com/g/erddap-announce). Luettelossa on noin yksi sähköposti kolmen kuukauden välein.
## Mukautettu{#customize} 
[Mukauta itseäsiERDDAP™korostaa organisaatiotasi (Ei ei eiNOAA ERD) .](#customize)
    * Vaihda lippu, joka näkyy kaikkien huipullaERDDAP™.html-sivut muokkaamalla&lt;StarBodyHtml5 &gt -tunnisteetdatasets.xmltiedosto. (Jos ei ole yhtä, kopioi oletusERDDAP&gt;
        \\[Tom\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/viestejä.xml-tiedostodatasets.xmlja editoida sitä.) Voit esimerkiksi:
        * Käytä erilaista kuvaa (• organisaation logo) .
        * Muuta taustaväriä.
        * Muutos"ERDDAP"Organisaatiosi"ERDDAP"""
        * Vaihda "Tieteellisten tietojen helpompi saatavuus" "Sinun organisaatiosi tietojen helpompi saatavuus".
        * Vaihda "Brought to You by" -linkkejä ollaksesi linkkejä organisaatioosi ja rahoituslähteisiin.
    * Muuta kotisivun vasemmalla puolella olevaa tietoa muokkaamalla&lt;ShortDescriptionHtml &gt; Tag in yourdatasets.xmltiedosto. (Jos ei ole yhtä, kopioi oletusERDDAP&gt;
        \\[Tom\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/viestejä.xml-tiedostodatasets.xmlja editoida sitä.) Voit esimerkiksi:
        * Kerro, mitä organisaatiosi ja/tai ryhmäsi tekee.
        * Selvitä, millaisia tietoja tämäERDDAP™on.
    * Muuttaa ikoni, joka näkyy selaimen välilehtiä, laittaa organisaation favicon. Ico sisään_tomcat_/content/erddapkuvat/ Näytä[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon).
