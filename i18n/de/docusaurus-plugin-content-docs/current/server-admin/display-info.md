---
title: "displayInfo and displayAttribute"
sidebar_position: 7
---
## `displayInfo` und `displayAttribute` Schlagwörter

### Warenbezeichnung
Mit dieser Funktion können Sie in der Zeile "Information" globale Attribute Ihrer Wahl auf der Seite der Datensätze anzeigen.

### Gebrauchsanweisung
Diese Tags können nur mit dem `Sax parser` verwendet werden. Um sie zu aktivieren und zu nutzen, folgen Sie diesen Schritten:

1.  **Aktivieren Sie den SAX Parser** :
Fügen Sie die folgende Zeile zu Ihrer `setup.xml`-Datei hinzu:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Tags in `datasets.xml`** :
In der `datasets.xml`-Datei, beinhalten zwei Top-Level-Tags:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Default Behavior** :
   - Wenn diese Tags nicht hinzugefügt oder leer in der `datasets.xml` Datei, die Standardwerte werden wie folgt angewendet:
     - `displayInfo`: `Summary,License `
     - `displayAttribute`: `summary,license `

4.  **Konsistenz sicherstellen** :
Die Anzahl der `displayInfo`- und `displayAttribute`-Tags muss gleich sein.

### Wie es funktioniert
- Das `displayAttribute`-Tag gibt globale Attribute an (innerhalb des `<addAttributes>` Tag) für jeden Datensatz angezeigt werden.
- Die entsprechenden Werte im `displayInfo`-Tag werden in der Reihe `Information` der UI als Label angezeigt.
- Wenn der Benutzer über die angezeigten Etiketten schwebt, erscheint ein Tooltip, der den Wert des globalen Attributs zeigt.

### Beispiel
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

#### Dataset Global Attributes Beispiel:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

#### UI Behavior:
- Die Wörter `Display1` und `Display2` werden in der Zeile `Information` auf der UI angezeigt.
- Beim Hochfahren werden die entsprechenden Attributwerte angezeigt:
  - `Display1`: Tooltip zeigt _This is att1_
  - `Display2`: Tooltip zeigt _This is att2_

### Anmerkungen
- Stellen Sie sicher, dass die im `displayAttribute`-Tag angegebenen Attributnamen den im Datensatz definierten globalen Attributen entsprechen.
- Falsche oder fehlende Attribute protokollieren Fehlermeldungen.

Durch die folgenden Schritte können Sie die `Information` Zeile auf der Datensätze-Seite anpassen, um relevante globale Attribute mit entsprechenden Tooltips anzuzeigen.
