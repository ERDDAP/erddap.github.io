---
title: "Localized Metadata"
sidebar_position: 8
---
## Lokaliserade metadata

### Beskrivning
Denna funktion låter dig inkludera lokaliserade metadata om dina datamängder och variabler. Alla attribut definierade inom enaddAttributestag kan lokaliseras. Detta är avsett att användas för vanliga sträng attribut som titel, sammanfattning, licens, instituion. Det rekommenderas inte att användas för numeriska (t.ex. "FillValue") eller standardiserade värden (t.ex. "ioos_category") och lokalisera dessa typer av värden kan ha överraskande beteende.

### Användningsinstruktioner
För att aktivera och använda dem, följ dessa steg:

1.  **Lägga till tags i `datasets.xml`** Från:
I `datasets.xml` fil, lägg till din lokaliserade metadata i avsnittet tillägg attribut:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **Standardbeteende** Från:
   - Om inga xml:lang-taggar tillhandahålls visas informationen för alla språk. Detta matchar föregående beteende.
   - Om vissa xml:lang-taggar tillhandahålls kommer dessa värden att användas för förfrågningar på dessa språk. Om en användare begär ett språk som inte har ett givet xml:langvärde, värdet från standardspråket (engelska engelska) kommer att användas.
