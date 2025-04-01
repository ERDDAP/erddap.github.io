---
title: "displayInfo and displayAttribute"
sidebar_position: 7
---
## "displayInfo" och "displayAttribute" Taggar

### Beskrivning
Den här funktionen låter dig visa globala attribut för ditt val på datasetsidan i raden "Information".

### Användningsinstruktioner
Dessa taggar kan endast användas med "Sax parser". För att aktivera och använda dem, följ dessa steg:

1.  **Aktivera SAX Parser** Från:
Lägg till följande rad till din "setup.xml"-fil:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Lägga till tags i `datasets.xml`** Från:
I `datasets.xml`-fil, inkludera två top-level taggar:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Standardbeteende** Från:
   - Om dessa taggar inte läggs till eller lämnas tomma idatasets.xml`-fil, standardvärdena tillämpas enligt följande:
     - "displayInfo": "Summary, licens `
     - "displayAttribute": "summary,license `

4.  **Säkerställ konsistens** Från:
Antalet kommaseparerade värden i både "displayInfo" och "displayAttribute" taggar måste vara samma.

### Hur det fungerar
- "displayAttribute"-taggen anger globala attribut (definieras inom&lt;`addAttributes"&gt; tag) som ska visas för varje dataset.
- Motsvarande värden i "displayInfo"-taggen visas som etiketter i "Information" raden av UI.
- När användaren svävar över de visade etiketterna kommer ett verktyg att visas, vilket visar värdet av det globala attributet.

### Exempel
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

#### Dataset Global Attributes Exempel:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

#### UI Behavior:
- Orden "Display1" och "Display2" kommer att visas i raden "Information" på UI.
- Vid svävning kommer verktygsspetsar att visa motsvarande attributvärden:
  - "Display1": Tooltip visar _This is Att1_
  - "Display2": Tooltip visar _This is Att2_

### Anteckningar
- Se till att attributnamnen som anges i "displayAttribute"-taggen matchar de globala attributen som definieras i datasetet.
- Felaktiga eller saknade attribut loggar felmeddelanden.

Genom att följa dessa steg kan du anpassa raden "Information" på datasetsidan för att visa relevanta globala attribut med motsvarande verktygstips.
