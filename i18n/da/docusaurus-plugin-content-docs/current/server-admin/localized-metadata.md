---
sidebar_position: 8
---
# Lokaliseret Metadata

### Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Denne funktion giver dig mulighed for at inkludere lokaliserede metadata om dine datasæt og variabler. Enhver egenskab defineret i enaddAttributestag kan lokaliseres. Dette er beregnet til at blive brugt til almindelige strenge attributter som titel, resumé, licens, instituion. Det anbefales ikke at blive brugt til numeriske (f.eks. "_FillValue") eller standardiserede værdier (f.eks. "ioos_kategori") og lokalisering af disse værdier kan have overraskende adfærd.

### Brugsvejledning
Følg disse trin for at aktivere og bruge dem:

1.  **Tilføj tags i `datasets.xml„** :
I `datasets.xml` fil, tilføje dine lokaliserede metadata i afsnittet Tilføj attributter:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **Standardannoncering** :
   - Hvis der ikke findes xml:lang-tag, vises de angivne oplysninger for alle sprog. Dette svarer til den tidligere behavoir.
   - Hvis nogle xml:lang tags leveres, vil disse værdier blive brugt til anmodninger på disse sprog. Hvis en bruger anmoder om et sprog, der ikke har en given xml:lang værdi, værdien fra standardsproget (Engelsk engelsk) vil blive brugt.
