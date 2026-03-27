---
sidebar_position: 3
---
#  ERDDAP™ Vapautusprosessi
* Varmista, että kuvavertailutiedostot ovat saatavilla (Se voi tarkoittaa juoksemista. `mvn-varmennus` , Jos haluat nopeuttaa, että rajoittaa vain ImageComparison ryhmä vaikka huomata, että vielä vaatii suorittaa Jetty testit) 
* Päivitä riippuvuudet
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Päivitä liitännäiset
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Suorita testit varmistaa riippuvuus päivitykset ei riko mitään kaikille tärkeimmille kokoonpanot (aineistot jäsennykset erityisesti, vaikka muita merkittäviä asetuksia sekä) . Huomaa, että ulkoinen testisviitti voi olla hyvin heikko. Hidas AWS-testisarja voi kestää hyvin kauan.
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* Käyttö `python käännös/translate.py` päivittää käännökset tarvittaessa.
* ED Staattinen.java-settikehitys Mode to false, muuttaa versionumero ja määritellä julkaisupäivä.
* Tee rakennus.
```
mvn clean
mvn compile
mvn package
```
## Kanariansaaret
Lähetä sotatiedosto jakelua varten Coastwatch-palvelimelle tai jollekin muulle palvelimelle, joka käyttää useimpia tietoaineistotyyppejä ja vastaanottaa paljon liikennettä.
Haluamme yrittää löytää virheitä ennen laajempaa jakautumista rakennuksen.

Sisällytä viesti, kun kerrot uudesta julkaisusta.

Vakiomenettely on:
* Lataa .War tiedosto rannikkovartiointi \\[ tomcat \\] Sisällön/eddap
* Käyttäjänä=tomcat:
  * Sisään \\[ tomcat \\] /
./Shutdown.sh / / Käytä "ps -fu tomcat" varmistaa se on pysähtynyt
  * Sisään \\[ tomcat \\] /webapps/:
rm - rf erddap
-Erddap. sota
cp ../content/erddap/erddap2.22.war erddap.war //tai mikä tahansa numero on
  * Sisään \\[ tomcat \\] /
Aloitetaan.sh
  * Sen jälkeen ERDDAP on palauttanut web-sivun, \\[ tomcat \\] /webapps/:
chgrp - R erddap erddap
chmod - R g+rw erddap
chmod - R o- rwx erddap

## GitHubin julkaisu
Luonnos GitHub julkaisu, sisältää erddap.war ja erddapContent .zip   (ei versionumeroita) 

title: The official v2.25 version
kuvataan: Katso muutosluettelosta
       https://erddap.github.io/changes#version-225
 

## Asiakirjan päivitys
* Päivitä versionumero docusaurus.config.ts-tiedostossa (alaosassa) .
* Muokkaa asiakirjasivuja (käyttöönotto-install.md ja käyttöönotto-update.md) .
  * Etsi \\[ erddap.war \\]  
  * Kopioi olemassa olevat tiedot (hieman uudistettu) aiempien laitosten luetteloon 2.
  * Muuta nykyistä julkaisutietoa erddap. sota \\[ erddap.war \\] 
* Suorita käännökset dokumentaatio-sivustolle.
* Tee vetopyyntö ja yhdistä muutokset.
* Lähetä asiakirjasivu (see readme) .

## Varmista, että muut repot ovat tarpeen mukaan ajan tasalla
Pääasiassa tämä tarkoittaa ErddapContent ja ErddapTest, mutta ne olisi pidettävä ajan tasalla kehityksen muutoksia.

## Ilmoita käyttäjille
Ilmoita ensin kaikille käyttäjille, jotka pyysivät muutoksia (tai joiden ötökät oli korjattu) . Anna heille aikaa tarkistaa muutokset ja/tai nostaa esiin kysymyksiä.

 ERDDAP versio 2.25 on nyt saatavilla&#33;

Voit lukea muutoksista osoitteessa
 https://erddap.github.io/changes#version-225
 

Osa muutoksista on muutoksia, joita ehdotit. Paljon kiitoksia ehdotuksistanne. Etsi nimesi muutosluettelosta nähdäksesi yksityiskohdat. Olisi hienoa, jos voisit kokeilla uusia ominaisuuksia pian, ennen kuin julkistan tämän uuden version laajemmalle yleisölle.

Jos olet ERDDAP hallinnoija, ohjeet päivittää ovat
 https://erddap.github.io/docs/server-admin/deploy-update
 

Jos sinulla on ongelmia, kysymyksiä, ehdotuksia, lähetä minulle sähköpostia.

Kiitos kun käytit ERDDAP .

### Ilmoita julkaisu
Lähetä ilmoitus postituslistalle.
