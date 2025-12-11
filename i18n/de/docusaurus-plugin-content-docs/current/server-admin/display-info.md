---
sidebar_position: 7
---
#  `Anzeige Info` und `Anzeige auf der Karte` Schlagwörter

## Warenbezeichnung
Diese Funktion ermöglicht es Ihnen, globale Attribute Ihrer Wahl auf der Datensatzseite in der `Informationen` Zeile.

## Gebrauchsanweisung
Diese Tags können nur mit dem `Sax parser` . Um sie zu aktivieren und zu nutzen, folgen Sie diesen Schritten:

1.  **Aktivieren Sie den SAX Parser** :
Fügen Sie die folgende Zeile zu Ihrem `Setup.xml` Datei:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Fügen Sie Tags in ` datasets.xml ` ** :
In der ` datasets.xml ` Datei, beinhalten zwei Top-Level-Tags:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Default Behavior** :
   - Wenn diese Tags nicht hinzugefügt oder leer in der ` datasets.xml ` Datei, die Standardwerte werden wie folgt angewendet:
     -  `Anzeige Info` : `Zusammenfassung,License` 
     -  `Anzeige auf der Karte` : `Zusammenfassung, Lizenz` 

4.  **Konsistenz sicherstellen** :
Die Anzahl der Komma-separierten Werte in beiden `Anzeige Info` und `Anzeige auf der Karte` tags müssen gleich sein.

## Wie es funktioniert
- Die `Anzeige auf der Karte` tag spezifiziert globale Attribute (definiert innerhalb der&lt; ` addAttributes ` &gt; tag) für jeden Datensatz angezeigt werden.
- Die entsprechenden Werte in der `Anzeige Info` tag werden als Labels in der `Informationen` Reihe der UI.
- Wenn der Benutzer über die angezeigten Etiketten schwebt, erscheint ein Tooltip, der den Wert des globalen Attributs zeigt.

## Beispiel
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Dataset Global Attributes Beispiel:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### UI Behavior:
- Die Worte `Anzeige 1` und `Anzeige2` wird in der `Informationen` Zeile auf der UI.
- Beim Hochfahren werden die entsprechenden Attributwerte angezeigt:
  -  `Anzeige 1` : Tooltip zeigt _This is att1_
  -  `Anzeige2` : Tooltip zeigt _This is att2_

## Anmerkungen
- Stellen Sie sicher, dass die in der `Anzeige auf der Karte` tag passt zu den globalen Attributen, die im Datensatz definiert sind.
- Falsche oder fehlende Attribute protokollieren Fehlermeldungen.

Durch die folgenden Schritte können Sie die `Informationen` Zeile auf der Datasets-Seite, um relevante globale Attribute mit entsprechenden Tooltips anzuzeigen.
