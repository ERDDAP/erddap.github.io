---
title: "displayInfo and displayAttribute"
sidebar_position: 7
---
## DisplayInfo ja DisplayAttribute Tagit

### Kuvaus
Tämän ominaisuuden avulla voit näyttää valintasi globaaleja ominaisuuksia tietoaineistojen sivulla "Information" rivissä.

### Käyttöohjeet
Näitä tunnisteita voidaan käyttää vain "Sax-parserilla". Niiden käyttöönotto ja käyttö seuraa näitä vaiheita:

1.  **Ota käyttöön SAX Parser** :
Lisää seuraava linkki "setup.xml"-tiedostoon:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Lisää tunnisteita »datasets.xml&gt; &gt;** :
Sisällä »datasets.xml’tiedosto, sisältää kaksi huipputason tunnistetta:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Oletuskäyttäytyminen** :
   - Jos näitä merkkejä ei lisätä tai jätetä tyhjiksi »datasets.xml’tiedosto, oletusarvoja sovelletaan seuraavasti:
     - DisplayInfo: Kesä, lisenssi &gt; &gt;
     - « DisplayAttribute » Yhteenveto, lisenssi &gt; &gt;

4.  **Johdonmukaisuuden varmistaminen** :
Sekä DisplayInfo- että DisplayAttribute-tunnisteiden arvojen määrän on oltava sama.

### Miten se toimii
- ’displayAttribute’-tunniste määrittää globaaleja ominaisuuksia (määritetty)&lt;&gt; &gt;addAttributes|gt; tag) jokaista tietoaineistoa varten.
- ’displayInfo’-tunnuksen vastaavat arvot näkyvät UI:n ’informaation’ rivissä olevina etiketteinä.
- Kun käyttäjä vilkkuu näytettyjen etikettien päälle, tulee näkyviin työkalupakki, joka osoittaa maailmanlaajuisen attribuutin arvon.

### Esimerkki
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

#### Global Attributes Esimerkki:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

#### Käyttäytyminen:
- Sanat ”Display1” ja ”Display2” näkyvät UI:n ”Information” rivissä.
- Kun se on hovered, työkalut näyttävät vastaavat ominaisuudet:
  - Desplay1: Tooltip Näytä tarkat tiedot
  - Desplay2: Tooltip Näytä tarkat tiedot

### Huomautuksia
- Varmista, että ’displayAttribute’ -tunnuksessa määritellyt nimet vastaavat aineistossa määriteltyjä globaaleja ominaisuuksia.
- Väärät tai puuttuvat ominaisuudet kirjaavat virheilmoituksia.

Seuraamalla näitä vaiheita, voit muokata "Information" rivi tietoaineistojen sivulla näyttää asiaankuuluvat globaalit ominaisuudet vastaavilla työkalupaketeilla.
