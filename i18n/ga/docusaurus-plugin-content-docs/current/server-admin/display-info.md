---
sidebar_position: 7
---
# `displayInfo` agus `displayAttribute ` Clibeanna

## Cur síos ar an Táirge
Ligeann an ghné seo duit tréithe domhanda de do rogha a thaispeáint ar an leathanach tacar sonraí sa tsraith `Information` .

## Úsáid Treoracha
Is féidir na clibeanna a úsáid ach amháin leis an `Sax parser` . Chun iad a chumasú agus a úsáid, lean na céimeanna seo:

1.  **Cumasaigh an Parser SAX** :
Cuir an líne seo a leanas le do ` thus.xml ` comhad:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Cuir Clibeanna i `datasets.xml` .** :
Sa `datasets.xml` comhad, san áireamh dhá barr-leibhéal clibeanna:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Réamhshocrú Iompar** :
   - Más rud é nach bhfuil na clibeanna seo a leanas nó a fhágáil folamh sa `datasets.xml` comhad, na luachanna réamhshocraithe i bhfeidhm mar seo a leanas:
     - `Díreach: cliceáil grianghraf a mhéadú ` .
     - ` athsheoladh `: ` samhradh, ceadú ` .

4.  **Comhsheasmhacht a chinntiú** :
Ní mór líon na luachanna coma-scartha sa dá `displayInfo` agus `displayAttribute ` clibeanna a bheith mar an gcéanna .

## Conas a Oibríonn sé
- Sonraíonn an `displayAttribute ` chlib tréithe domhanda (sainithe laistigh den&lt;` .addAttributes` &amp; tag) a chur ar taispeáint do gach tacar sonraí.
- Na luachanna comhfhreagracha sa chlib `displayInfo ` ar taispeáint mar lipéid sa tsraith `Information` an Chomhéadain .
- Nuair a théann an t-úsáideoir thar na lipéid ar taispeáint, beidh tooltip le feiceáil, a léiríonn luach an tréith domhanda.

## Samplaí
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Sonraí a leagtar Domhanda ómós Sampla:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### UI Iompar:
- Beidh na focail `Display1` agus `Display2` a chur ar taispeáint sa tsraith `Information` ar an Chomhéadain .
- Nuair a hovered, beidh tooltips taispeáint na luachanna tréith comhfhreagrach:
  - `Display1 `: Léiríonn Tooltip Is é seo att1_
  - `Display2`: Léiríonn Tooltip _ Níl an Tweet seo ar fáil

## Nótaí
- A chinntiú na hainmneacha tréith a shonraítear sa `displayAttribute ` chlib mheaitseáil na tréithe domhanda a shainmhínítear sa tacar sonraí .
- Beidh tréithe mícheart nó ar iarraidh teachtaireachtaí earráide log.

De réir na céimeanna seo a leanas, is féidir leat a shaincheapadh ar an tsraith `Faisnéis ` ar an leathanach tacar sonraí a thaispeáint tréithe domhanda ábhartha le tooltips comhfhreagrach.
