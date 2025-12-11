---
sidebar_position: 3
---
#  ERDDAP™ Vapautusprosessi
* Varmista, että kuvien vertailutiedostoja on saatavilla (Tämä voi tarkoittaa juoksemista `mvvn todentaminen` Jos haluat nopeuttaa tätä rajoitusta vain ImageComparison-ryhmään, mutta huomauttaa, että Jetty-testien suorittaminen on edelleen välttämätöntä.) 
* Päivitä riippuvuuksia
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Päivitä plugins
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Käynnistä testejä varmistaa, että riippuvuus päivitykset eivät rikkoneet mitään kaikkia suuria kokoonpanoja. (Erityisesti tietoaineistot, mutta myös muut merkittävät asetukset) . Huomioithan, että ulkoinen testipakkaus voi olla hyvin räikeä. Hidas AWS-testi voi kestää pitkään.
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* Käännökset.translate () Käännösten päivittäminen tarvittaessa
* EDStatic.java-kehitys Muuta versionumeroa ja määritä julkaisupäivä.
* Tee rakentaminen
```
mvn clean
mvn compile
mvn package
```
## Kanarian
Lähetä War-tiedosto jakeluun Coastwatch-palvelimella tai muulla palvelimella, joka käyttää suurinta osaa tietoaineistotyypeistä ja saa paljon liikennettä.
Haluamme löytää virheitä ennen laajempaa jakelua.

Sisällytä viesti, kun kerrot uudesta julkaisusta.

Standardimenetelmä on:
* Lataa .war-tiedosto rannikolle \\[ Tom \\] Sisältö/erddap/
* Käyttäjä = Tomcat:
  * Sisällä \\[ Tom \\] /Bin/:
./shutdown.sh //use "ps -fu tomcat" varmistaaksesi, että se on pysähtynyt
  * Sisällä \\[ Tom \\] Webapps/:
rf erddap
rm erddap. sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota sota
cp Sisältö/erddap/erddap2.22.war erddap.war/tai mikä tahansa numero
  * Sisällä \\[ Tom \\] /Bin/:
Lähde: Startup.sh
  * Jälkeen ERDDAP Palautti sivun, sisään \\[ Tom \\] Webapps/:
Chgrp - R erddap
chmod - R + Rw erddap
chmod - R o-rwx erddap

## GitHub vapauttaa
Lataa GitHub-julkaisu, mukaan lukien erddap.war ja erddapContent .zip   (Ei versionumeroita) 

title: The official v2.25 version
Kuva: Katso muutosluettelo
      https://erddap.github.io/changes#version-225

## Dokumentointipäivitys
* Päivitä docusaurus.config.ts-tiedoston versionumero (Jalat-osiossa) .
* Muokkaa dokumentointisivuja (käyttöönotto-install.md ja käyttöönotto-update.md) .
  * Etsiminen \\[ Erddap.sota \\]  
  * Kopioi olemassa olevat tiedot (Vähän uudistuksia) Aiempien laitosten luettelo 2.
  * Vaihda nykyinen tiedote erddapin. sotaa vastaan \\[ Erddap.sota \\] 
* Käynnistä käännökset dokumentointisivustolle.
* Tee pyyntö ja sulata muutokset.
* Dokumentointisivuston käyttöönotto (Katso Ready) .

## Varmista, että muut remontit ovat tarpeen mukaan ajan tasalla.
Tämä tarkoittaa lähinnä ErddapContentia ja ErddapTestiä, mutta ne on pidettävä ajan tasalla kehitysmuutosten aikana.

## Ilmoita käyttäjille
Ilmoita ensin käyttäjille, jotka vaativat muutoksia (Kenen vikoja on korjattu) . Tarkista muutokset ja/tai nosta ongelmat.

 ERDDAP 2.25 on nyt saatavilla&#33;

Voit lukea muutoksia
https://erddap.github.io/changes#version-225

Muutokset ovat muutoksia, joita ehdotit. Kiitos paljon ehdotuksistasi. Etsi nimesi muutosluettelossa nähdäksesi yksityiskohdat. Olisi hienoa, jos voisit kokeilla uusia ominaisuuksia pian, ennen kuin julkaisen tämän uuden version laajemmalle yleisölle.

Jos olet ERDDAP Ohjaaja, päivitysohjeet ovat
https://erddap.github.io/docs/server-admin/deploy-update

Jos sinulla on ongelmia, kysymyksiä, ehdotuksia, lähetä minulle sähköpostia.

Kiitos, että käytät ERDDAP .

### Ilmoittautuminen
Lähetä ilmoitus Announcements Mailing -listalle.
