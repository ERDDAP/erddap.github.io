---
sidebar_position: 2
---
# Päivitä
Miten tehdä päivitys olemassa olevasta ERDDAP™ Palvelimen

## Muutokset{#changes} 
1. Tee listatut muutokset [Muutokset](/changes) jaksossa "Asiat ERDDAP™ Hallintovirkamiesten täytyy tietää ja tehdä" kaikkien ERDDAP™ versioita, koska versio käytät.
     
##  Java  {#java} 
2. Jos olet päivittämässä ERDDAP™ versio 2.18 tai alla, sinun täytyy vaihtaa Java 25 (tai uudempi) ja siihen liittyvä Tomcat 10. Katso ERDDAP™ asennusohjeet [ Java ](/docs/server-admin/deploy-install#java) sekä [Tomcat](/docs/server-admin/deploy-install#tomcat) . Sinun täytyy myös kopioida _tomcat_/content/erddap vanhasta Tomcat-installaatiosta uuteen Tomcat-installaatioosi.

## Lataa{#download} 
3. Lataa [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.30.0/erddap.war) _Tomcat_/webapps .
     (version 2.30.0, 706.939,130 tavua, MD5=CDC4B3D82A20B33A6623B85312F6DC21, päivätty 20260-02) 
     
## viestit.xml{#messagesxml} 
4. 
    * Yleinen: Jos olet päivittämässä ERDDAP™ versio 1.46 (tai yli) ja käytät vain standardiviestejä, uusia standardiviestejä.xml asennetaan automaattisesti (joukossa . luokan tiedostoja erddap. sota) .
         
    * Harvinainen: Jos olet päivittämässä ERDDAP™ versio 1.44 (tai alla) ,
Sinun täytyy poistaa vanhat viestit.xml-tiedosto:
         _tomcat_/content/erddap /viestit.xml .
Uudet standardiviestit.xml asennetaan automaattisesti (joukossa . luokan tiedostoja erddap. sota) .
         
    * Harvinainen: Jos teet aina muutoksia standardiin viestit.xml tiedosto (Käytössä) ,
sinun täytyy tehdä nämä muutokset uusiin viesteihin.xml tiedosto (joka on
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml erddap.warin jälkeen Tomcat puristaa.
         
    * Harvinainen: Jos ylläpitää mukautettuja viestejä.xml tiedosto _tomcat_/content/erddap /
Sinun täytyy selvittää se. (diff:n kautta) mitä muutoksia on tehty oletusviesteihin.xml (jotka ovat uudessa erddap. sota
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) ja muokata mukautettuja viestejä.xml tiedosto vastaavasti.
         
## Asenna{#install} 
5. Asenna uusi ERDDAP™ Tomcatissa:
\\ * Älä käytä Tomcat Manageria. Ennemmin tai myöhemmin on PermGen muistiongelmia. On parempi sulkea ja käynnistää Tomcat.
\\* Korvaa viittaukset alla olevaan _tomcat_-hakemistoon tietokoneellasi.
     
### Linux ja Mac{#linux-and-macs} 
1. Sammuta Tomcat. Käytä komentoriviltä: _tomcat_/bin/shutdown.sh
Ja käytä ps-ef | grep tomcat tarkistaa, onko/kun prosessi on pysäytetty. (Se voi viedä pari minuuttia.) 
2. Poista puristettu ERDDAP™ asennus: In _tomcat_/webapps, use
rm - rf erddap
3. Poista vanha erddap. Sotatiedosto: In _tomcat_/webaps, käytä rm erddap. sota
4. Kuittaan. Sotatiedosto väliaikaisesta kansiosta _Tomcat_/webappsiin
5. Käynnistä Tomcat uudelleen ERDDAP : use _tomcat_/bin/startup.sh
6. Näytä ERDDAP™ selaimessa tarkistaa, että uudelleenkäynnistys onnistui.
     (Usein sinun täytyy yrittää muutaman kerran ja odota hetki ennen kuin näet ERDDAP™ .)   
             
### Ikkunat{#windows} 
1. Sammuta Tomcat. Käytä komentoriviltä: _tomcat_\\bin\\\ shutdown.bat 
2. Poista puristettu ERDDAP™ asennus: In _tomcat_/webapps, use
del/S/Q erddap
3. Poista vanha erddap. Sotatiedosto: _Tomcat_\\ webapps, käytä del erddap. sota
4. Kuittaan. sotatiedosto väliaikaisesta kansiosta _tomcat_\\webappsiin
5. Käynnistä Tomcat uudelleen ERDDAP Käytä _tomcat_\\bin\\startup.bat
6. Näytä ERDDAP™ selaimessa tarkistaa, että uudelleenkäynnistys onnistui.
     (Usein sinun täytyy yrittää muutaman kerran ja odota hetki ennen kuin näet ERDDAP™ .) 

Ongelmat päivitys ERDDAP ? Katso [kohta:](/docs/intro#support) .
