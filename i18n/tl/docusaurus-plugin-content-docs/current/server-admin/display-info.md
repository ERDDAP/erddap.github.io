---
title: "displayInfo and displayAttribute"
sidebar_position: 7
---
## `display Info` at `display Attribute` Mga Tag

### Paglalarawan
Ang bahaging ito ay nagpapangyari sa iyo na ipakita ang pangglobong mga katangian ng iyong pagpili sa datasets page sa `Information` row.

### Mga Tagubilin sa Paggamit
Ang mga tag na ito ay maaari lamang gamitin kasama ng `Sax parser`. Upang magawa at magamit ang mga ito, sundin ang mga hakbang na ito:

1.  **Ipakilala ang SAX Parser** :
Idagdag ang sumusunod na linya sa iyong `setup.xml` file:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Idagdag ang Tag sa `datasets.xml`** :
Sa `datasets.xml` file, isama ang dalawang top-level tag:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Masaklap na Paggawi** :
   - Kung ang mga tag na ito ay hindi nilalagyan o iniiwang walang laman sa `datasets.xml` file, ang default na halaga ay nilalapat na ganito:
     - `display Info`: `Summary,License `
     - `display Attribute`: `summary,license `

4.  **Pagiging Makatuwiran** :
Ang bilang ng mga comma-nahating halaga sa parehong `display Info` at `display Attribute` tags ay dapat pareho.

### Kung Paano Ito Umaandar
- Ang `display Attribute` tag ay nagpapahiwatig ng pangglobong mga katangian (Kahulugan sa loob ng `<addAttributes>` tag) upang itanghal sa bawat dataset.
- Ang mga katumbas na halaga sa `display Info` tag ay tinatanghal bilang mga tatak sa `Information` row ng UI.
- Kapag ang gumagamit ay umaali - aligid sa mga etiketang nakadispley, lilitaw ang dulo ng kagamitan, na nagpapakita sa halaga ng pangglobong katangian.

### Halimbawa
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

#### Talaan ng mga Nilalaman
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

#### Pag - uugaling UI:
- Ang mga salitang `Display1` at `Display2` ay ipapalabas sa `Information` row sa UI.
- Kapag lumilipad, ipakikita ng mga dulo ng kagamitan ang katumbas na mga halaga ng attribute:
  - `Display1`: Tooltip shows _Ito ay sat1_
  - `Display2`: Tooltip shows _Ito ay att2_

### Mga Noble
- Ensure ang mga pangalang attribute na tinukoy sa `display Attribute` tag ay tumutugma sa mga katangiang global na binigyang kahulugan sa dataset.
- Ang di - wasto o nawawalang mga katangian ay mag - uulat ng maling mga mensahe.

Sa pagsunod sa mga hakbang na ito, maaari mong gawing kaugalian ang `Information` row sa datasets page upang ipakita ang mga kaugnay na katangiang global na may katumbas na mga tooltip.
