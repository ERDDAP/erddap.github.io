---
sidebar_position: 8
---
# Lokale Metadaten

### Warenbezeichnung
Mit dieser Funktion können Sie lokalisierte Metadaten über Ihre Datensätze und Variablen einschließen. Jedes Attribut, das in einem addAttributes tag kann lokalisiert werden. Dies soll für gemeinsame String-Attribute wie Titel, Zusammenfassung, Lizenz, Instituion verwendet werden. Es wird nicht empfohlen, für numerische (z.B. "_FillValue") oder standardisierte Werte (z.B. "ioos_category") und Lokalisierung dieser Wertetypen kann überraschendes Verhalten aufweisen.

### Gebrauchsanweisung
Um sie zu aktivieren und zu nutzen, folgen Sie diesen Schritten:

1.  **Fügen Sie Tags in ` datasets.xml ` ** :
In der ` datasets.xml ` Datei, fügen Sie Ihre lokalisierten Metadaten im Abschnitt Attribute hinzufügen:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **Default Behavior** :
   - Wenn keine xml:lang Tags bereitgestellt werden, werden die bereitgestellten Informationen für alle Sprachen angezeigt. Dies entspricht dem vorherigen Verhalten.
   - Wenn einige xml:lang Tags bereitgestellt werden, werden diese Werte für Anfragen in diesen Sprachen verwendet. Wenn ein Benutzer eine Sprache anfordert, die keinen bereitgestellten xml:lang-Wert hat, wird der Wert aus der Standardsprache (Englisch) wird verwendet werden.
