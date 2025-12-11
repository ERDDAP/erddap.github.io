---
sidebar_position: 7
---
#  `taispeáint taispeáint Eolas ar do Chomhairle` agus `taispeántas ómós` Clibeanna

## Cur síos ar an Táirge
Ceadaíonn an ghné seo duit tréithe domhanda de do rogha a thaispeáint ar an leathanach tacar sonraí sa `irl - Library Service` as a chéile.

## Úsáid Treoracha
Is féidir na clibeanna a úsáid ach amháin leis an `Seirbhís do Chustaiméirí` . Chun iad a chumasú agus a úsáid, lean na céimeanna seo:

1.  **Cumasaigh an Parser SAX** :
Cuir an líne seo a leanas le do `crios fuar: aon sonraí` comhad:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Cuir Clibeanna i ` datasets.xml ` ** :
I an ` datasets.xml ` comhad, san áireamh dhá barr-leibhéal clibeanna:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Réamhshocrú Iompar** :
   - Más rud é nach bhfuil na clibeanna seo a leanas nó a fhágáil folamh sa ` datasets.xml ` comhad, na luachanna réamhshocraithe i bhfeidhm mar seo a leanas:
     -  `taispeáint taispeáint Eolas ar do Chomhairle` : `Achoimre, License` 
     -  `taispeántas ómós` : `achoimre, cheadú` 

4.  **Comhsheasmhacht a chinntiú** :
Líon na luachanna coma-scartha sa dá `taispeáint taispeáint Eolas ar do Chomhairle` agus `taispeántas ómós` Ní mór clibeanna a bheith mar an gcéanna.

## Conas a Oibríonn sé
- An bhfuil `taispeántas ómós` sonraí chlib tréithe domhanda (sainithe laistigh den&lt; ` addAttributes ` &amp; gt; tag) le taispeáint do gach tacar sonraí.
- Na luachanna comhfhreagracha sa `taispeáint taispeáint Eolas ar do Chomhairle` tag ar taispeáint mar lipéid sa `irl - Library Service` sraith an Chomhéadain.
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
- Na focail `Uaireadóirí macasamhail Chopard` agus `Uaireadóirí macasamhail` a chur ar taispeáint sa `irl - Library Service` as a chéile ar an Chomhéadain.
- Nuair a hovered, beidh tooltips taispeáint na luachanna tréith comhfhreagrach:
  -  `Uaireadóirí macasamhail Chopard` : Léiríonn Tooltip _ Níl an Tweet seo ar fáil
  -  `Uaireadóirí macasamhail` : Léiríonn Tooltip _ Tá sé seo agt2_

## Nótaí
- A chinntiú na hainmneacha tréith a shonraítear sa `taispeántas ómós` tag mheaitseáil na tréithe domhanda a shainmhínítear sa tacar sonraí.
- Beidh tréithe mícheart nó ar iarraidh teachtaireachtaí earráide log.

De réir na céimeanna seo a leanas, is féidir leat a shaincheapadh ar an `irl - Library Service` a chéile ar an leathanach tacar sonraí a thaispeáint tréithe domhanda ábhartha le tooltips comhfhreagrach.
