---
sidebar_position: 2
---
# Päivitys
Miten päivittää olemassa oleva ERDDAP™ Sinun palvelijasi

## Muutoksia{#changes} 
1. Tee muutoksista listattu [Muutoksia](/changes) osiossa ”Asiat” ERDDAP™ Hallitsijoiden on tiedettävä ja tehtävä kaikki ERDDAP™ versioita käyttämästäsi versiosta.
     
##  Java  {#java} 
2. Jos päivität ERDDAP™ 2.18 tai uudempi, sinun on vaihdettava Java 21 21 (tai uudempaa) Tomcat 10:stä. Katso säännölliset ERDDAP™ Asennusohjeet [ Java ](/docs/server-admin/deploy-install#java) ja [Tomca](/docs/server-admin/deploy-install#tomcat) . Sinun täytyy myös kopioida _tomcat_/content/erddap Hakemisto vanhasta Tomcat-asennuksesta uuteen Tomcat-asennukseen.

## Download Download{#download} 
3. Download Download [Erddap.sota](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war) _tomcat_/webapps.
     (versio 2.28.1, 622,676,238 tavua, MD5=48b4226045f950c8a8d6921b9bc9, päivätty 09-05-2025) 
     
## Viestit.xml{#messagesxml} 
4. 
    * Yhteinen: Jos päivität ERDDAP™ versio 1.46 (tai yläpuolella) Käytät vain vakioviestejä, asennetaan uusi standardiviestit.xml automaattisesti. (.class-tiedostojen joukossa erddapin kautta. sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota) .
         
    * Harvinainen: Jos päivität ERDDAP™ versio 1.44 (tai alapuolella) ,
Poista vanhat viestit.xml-tiedostot:
         _tomcat_/content/erddap Viestit.xml.
Uusi standardi viestit.xml asennetaan automaattisesti (.class-tiedostojen joukossa erddapin kautta. sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota) .
         
    * Harvinainen: Jos teet aina muutoksia tavallisiin viesteihin.xml-tiedostoon (paikallaan) ,
Sinun on tehtävä nämä muutokset uuteen viestiin.xml-tiedostoon (joka on
WEB INF/luokat/gov/noaa/pfel/erddap/util/viestejä.xml, kun Tomcat masentaa erdap.war-sotaa.
         
    * Harvinainen: Jos ylläpidät mukautettuja viestejä.xml-tiedostoa _tomcat_/content/erddap /
Sinun täytyy selvittää (Diffin kautta) Mitä muutoksia on tehty oletusviesteissä.xml (joka on uudessa erdapissa) sotaa kuin
WEB-INF/luokat/gov/noaa/pfel/erddap/util/viestit.xml) ja muokata mukautettuja viestejä.xml-tiedostoa vastaavasti.
         
## Asentaminen{#install} 
5. Asenna uusi ERDDAP™ Tomcatissa:
**** Älä käytä Tomcat Manageria. Ennemmin tai myöhemmin tulee mieleen PermGen. On parempi lopettaa ja aloittaa Tomcat.
Korvaa viittaukset _tomcat_ alla olevaan Tomcat-hakemistoon tietokoneellasi.
     
### Linux ja Macit{#linux-and-macs} 
1. Shutdown Tomcat: Käytä komentoriviä: _tomcat_/bin/shutdown.sh
Käytä ps -ef | Tomcat nähdä, onko prosessi pysäytetty. (Se voi kestää minuutin tai kaksi.) 
2. Poista masentunut ERDDAP™ Asennus: _tomcat_/webapps, Käytä
rf erddap
3. Poista vanha erdap. _tomcat_/webapps, käytä rm erddap. sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota
4. Kopioi uusi erdap. Sotatiedosto väliaikaisesta hakemistosta _tomcat_/webappsiin
5. Käynnistä Tomcat ja ERDDAP Käytä _tomcat_/bin/startup.sh
6. Näkymä ERDDAP™ Selaimessasi tarkistaa, että uudelleenkäynnistys onnistui.
     (Usein sinun täytyy kokeilla muutaman kerran ja odottaa minuuttia ennen kuin näet. ERDDAP™ .)   
             
### Windows Windows{#windows} 
1. Shutdown Tomcat: Komentorivistä, käytä:_tomcatbin. shutdown.bat 
2. Poista masentunut ERDDAP™ Asennus: _tomcat_/webapps, Käytä
del/S/Q erddap
3. Poista vanha erdap. War tiedostot: _tomcatwebapps, käytä del erddap. sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota
4. Kopioi uusi erdap. sotatiedosto tilapäisestä hakemistosta _tomcatwebappsiin
5. Käynnistä Tomcat ja ERDDAP Käytä _tomcatbin_startup.
6. Näkymä ERDDAP™ Selaimessasi tarkistaa, että uudelleenkäynnistys onnistui.
     (Usein sinun täytyy kokeilla muutaman kerran ja odottaa minuuttia ennen kuin näet. ERDDAP™ .) 

vaikeuksia päivittää ERDDAP ?? Katso meidän [Lisätuen saaminen](/docs/intro#support) .
