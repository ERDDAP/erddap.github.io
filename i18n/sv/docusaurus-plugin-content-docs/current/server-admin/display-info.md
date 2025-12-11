---
sidebar_position: 7
---
#  `display Info` och `displayAttribute` Taggar

## Beskrivning
Den här funktionen låter dig visa globala attribut för ditt val på datasetsidan i `Information om information` row.

## Användningsinstruktioner
Dessa taggar kan endast användas med `Sax parser` . För att aktivera och använda dem, följ dessa steg:

1.  **Aktivera SAX Parser** Från:
Lägg till följande rad till din `setup.xml` Fil:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Lägga till taggar i ` datasets.xml ` ** Från:
I den ` datasets.xml ` fil, inkludera två top-level taggar:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Standardbeteende** Från:
   - Om dessa taggar inte läggs till eller lämnas tomma i ` datasets.xml ` fil, standardvärdena tillämpas enligt följande:
     -  `display Info` Från: `Sammanfattning, licens` 
     -  `displayAttribute` Från: `Sammanfattning, licens` 

4.  **Säkerställ konsistens** Från:
Antalet sammanlagda värden i båda `display Info` och `displayAttribute` taggar måste vara samma.

## Hur det fungerar
- och `displayAttribute` tag anger globala attribut (definieras inom&lt; ` addAttributes ` &gt; tag) visas för varje dataset.
- motsvarande värden i `display Info` tag visas som etiketter i `Information om information` raden av UI.
- När användaren svävar över de visade etiketterna kommer ett verktyg att visas, vilket visar värdet av det globala attributet.

## Exempel
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Dataset Global Attributes Exempel:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### UI Behavior:
- Orden `Display1` och `Display2` visas i `Information om information` rad på UI.
- Vid svävning kommer verktygsspetsar att visa motsvarande attributvärden:
  -  `Display1` Tooltip visar: Detta är att1_
  -  `Display2` Tooltip visar: Detta är att2_

## Anteckningar
- Se till att attributnamnen anges i `displayAttribute` tag matcha de globala attribut som definieras i datasetet.
- Felaktiga eller saknade attribut loggar felmeddelanden.

Genom att följa dessa steg kan du anpassa `Information om information` rad på sidan datamängder för att visa relevanta globala attribut med motsvarande verktyg.
