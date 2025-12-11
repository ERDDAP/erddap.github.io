---
sidebar_position: 7
---
#  `Näytön näyttö Info` ja `Näyttely` Tagit

## Kuvaus
Tämän ominaisuuden avulla voit näyttää valintasi globaaleja ominaisuuksia tietoaineistojen sivulla. `Tietoa` Rivi.

## Käyttöohjeet
Näitä tunnisteita voi käyttää vain `Sax Parser` . Niiden käyttöönotto ja käyttö seuraa näitä vaiheita:

1.  **Ota käyttöön SAX Parser** :
Lisää seuraava linja omaan `Asennus.xml` tiedosto:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Lisää tags in ` datasets.xml ` ** :
Sisällä ` datasets.xml ` tiedosto, sisältää kaksi huipputason tunnistetta:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Oletuskäyttäytyminen** :
   - Jos näitä merkkejä ei lisätä tai jätetä tyhjäksi ` datasets.xml ` tiedosto, oletusarvoja sovelletaan seuraavasti:
     -  `Näytön näyttö Info` : `Yhteenveto, lisenssi` 
     -  `Näyttely` : `Yhteenveto, lisenssi` 

4.  **Johdonmukaisuuden varmistaminen** :
Erotettujen arvojen määrä molemmissa `Näytön näyttö Info` ja `Näyttely` Tagien on oltava samat.

## Miten se toimii
- The `Näyttely` Globaalit attribuutit (määritetty)&lt; ` addAttributes ` &gt; tag) jokaisesta tietoaineistosta.
- vastaavat arvot `Näytön näyttö Info` Tunnisteet näkyvät etiketteinä `Tietoa` UI:n rivi.
- Kun käyttäjä vilkkuu näytettyjen etikettien päälle, tulee näkyviin työkalupakki, joka osoittaa maailmanlaajuisen attribuutin arvon.

## Esimerkki
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Global Attributes Esimerkki:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### Käyttäytyminen:
- Sanat `Display1` ja `Display2` Näytetään näytteillä `Tietoa` Rivi on UI.
- Kun se on hovered, työkalut näyttävät vastaavat ominaisuudet:
  -  `Display1` Tooltip Näytä tarkat tiedot
  -  `Display2` Tooltip Näytä tarkat tiedot

## Huomautuksia
- Varmistaa attribuuttien nimet, jotka on määritelty `Näyttely` Tag vastaa aineistossa määriteltyjä globaaleja ominaisuuksia.
- Väärät tai puuttuvat ominaisuudet kirjaavat virheilmoituksia.

Kun seuraat näitä vaiheita, voit muokata `Tietoa` rivi tietoaineistojen sivulla näyttää asiaankuuluvia globaaleja ominaisuuksia vastaavilla työkalupaketeilla.
