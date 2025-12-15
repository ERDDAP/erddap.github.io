---
sidebar_position: 7
---
#  `Vis display Info` og og og `DisplayAttribute` Tags

## Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Denne funktion giver dig mulighed for at vise globale attributter af dit valg på siden Datasets i siden `Information om information` Række.

## Brugsvejledning
Disse tags kan kun bruges med `Sax parser` . Følg disse trin for at aktivere og bruge dem:

1.  **Aktiver SAX Parser** :
Tilføj følgende linje til din `opsætning.xml` fil:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Tilføj tags i ` datasets.xml ` ** :
In te In te In te In te ` datasets.xml ` fil, omfatter to top-niveau tags:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Standardannoncering** :
   - Hvis disse tags ikke er tilføjet eller venstre tomme i den ` datasets.xml ` fil, standardværdierne anvendes som følger:
     -  `Vis display Info` : `Sammendrag,License` 
     -  `DisplayAttribute` : `opsummering, licens` 

4.  **Sørg for, at Consistency** :
Antallet af kommunalparerede værdier i begge `Vis display Info` og og og `DisplayAttribute` tags skal være det samme.

## Hvordan det virker
- The The The The The The The `DisplayAttribute` Mærke specificerer globale attributter (defineret inden for&lt; ` addAttributes ` &gt; tag) vises for hvert datasæt.
- De tilsvarende værdier i de `Vis display Info` Mærke vises som etiketter i `Information om information` Række af UI.
- Når brugeren svæver over de viste etiketter, vises et værktøjstip, der viser værdien af den globale egenskab.

## Eksempel Eksempel Eksempel
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Dataset Global Attributes Eksempel:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### Brugeradfærd:
- Ordene `Display1` og og og `Display2` vil blive vist i den `Information om information` ro på UI.
- Når du svæver, vil værktøjstips vise de tilsvarende egenskabsværdier:
  -  `Display1` : Værktøjstip viser _Dette er att1_
  -  `Display2` : Værktøjstip viser _Dette er att2_

## Noter
- Sørg for, at attributnavne, der er angivet i `DisplayAttribute` tag matcher de globale attributter defineret i datasættet.
- Forkerte eller manglende attributter vil logge fejlmeddelelser.

Ved at følge disse trin, kan du tilpasse den `Information om information` række på siden Datasets for at vise relevante globale attributter med tilsvarende værktøjstips.
