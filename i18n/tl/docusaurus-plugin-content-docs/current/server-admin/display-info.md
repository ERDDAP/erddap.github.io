---
sidebar_position: 7
---
#  `display Info` at `display Attribute` Mga Tag

## Paglalarawan
Ang bahaging ito ay nagpapangyari sa iyo na ipakita ang pangglobong mga katangian ng iyong pinipili sa datasets page sa `Impormasyon` hanay.

## Mga Tagubilin sa Paggamit
Ang mga tag na ito ay magagamit lamang sa pamamagitan ng `Sax parser` . Upang magawa at magamit ang mga ito, sundin ang mga hakbang na ito:

1.  **Ipakilala ang SAX Parser** :
Idagdag ang sumusunod na linya `setup.xml` talaksan:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Ilagay ang mga Tag ` datasets.xml ` ** :
Nasa ` datasets.xml ` Kasama sa talaksan, ang dalawang top-level tag:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Masaklap na Paggawi** :
   - Kung ang mga tag na ito ay hindi idaragdag o iiwang walang laman sa ` datasets.xml ` file, ang default na halaga ay nilalapat gaya ng sumusunod:
     -  `display Info` : `Sumaryo, Makatuwiran` 
     -  `display Attribute` : `buod, Panulaang` 

4.  **Pagiging Makatuwiran** :
Ang bilang ng komma-nahating halaga sa parehong `display Info` at `display Attribute` Ang mga tag ay dapat na pareho.

## Kung Paano Ito Umaandar
- Ang `display Attribute` tag ang pangglobong mga katangian (kakahulugan sa loob ng&lt; ` addAttributes ` &gt. tag) na ididispley para sa bawat dataset.
- Ang katumbas na mga pamantayan sa katumbas na mga pamantayan `display Info` Tinatanghal ang tag bilang mga etiketa sa `Impormasyon` hanay ng UI.
- Kapag ang gumagamit ay umaali - aligid sa mga etiketang nakadispley, lilitaw ang dulo ng kagamitan, na nagpapakita sa halaga ng pangglobong katangian.

## Halimbawa
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Talaan ng mga Nilalaman
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### Pag - uugaling UI:
- Ang mga salita `Pagtatanghal1` at `Pagtatanghal2` ay ipakikita sa `Impormasyon` hanay sa UI.
- Kapag lumilipad, ipakikita ng mga dulo ng kagamitan ang katumbas na mga halaga ng attribute:
  -  `Pagtatanghal1` : Kasangkapang pangtip na mga palabas _Ito ay att1_
  -  `Pagtatanghal2` : Kasangkapang pangtip ay nagpapakita _ Ito ay att2_

## Mga Noble
- Tiyakin ang mga pangalang attribute na binanggit sa `display Attribute` tag ang pangglobong mga katangian na binibigyang - kahulugan sa dataset.
- Ang di - wasto o nawawalang mga katangian ay mag - uulat ng maling mga mensahe.

Sa pagsunod sa mga hakbang na ito, maaari mong baguhin ang iyong kalagayan `Impormasyon` sa pahina ng datasets upang ipakita ang kaugnay na pangglobong mga katangian na may katumbas na mga dulo ng kagamitan.
