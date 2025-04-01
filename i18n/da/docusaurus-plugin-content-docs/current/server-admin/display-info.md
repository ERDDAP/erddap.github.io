---
title: "displayInfo and displayAttribute"
sidebar_position: 7
---
## ‘displayInfo’ og ’displayAttribute’ Tags

### Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Denne funktion giver dig mulighed for at vise globale attributter af dit valg på siden Datasets i rækken "Oplysninger".

### Brugsvejledning
Disse tags kan kun bruges med "Sax parser". Følg disse trin for at aktivere og bruge dem:

1.  **Aktiver SAX Parser** :
Tilføj følgende linje til din `setup.xml’-fil:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Tilføj tags i `datasets.xml„** :
I `datasets.xml` fil, omfatter to top-niveau tags:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Standardannoncering** :
   - Hvis disse tags ikke er tilføjet eller er tomme i `datasets.xml` fil anvendes standardværdierne som følger:
     - ‘displayInfo’: „Summary,License „
     - ‘displayAttribute’: `summary, licens „

4.  **Sørg for, at Consistency** :
Antallet af komma-separerede værdier i både ‘displayInfo’ og ‘displayAttribute’ tags skal være den samme.

### Hvordan det virker
- ‘displayAttribute’ tag specificerer globale attributter (defineret i `<addAttributes>` tag) at blive vist for hvert datasæt.
- De tilsvarende værdier i ’displayInfo’-mærket vises som etiketter i ‘Oplysninger’-rækken.
- Når brugeren svæver over de viste etiketter, vises et værktøjstip, der viser værdien af den globale egenskab.

### Eksempel Eksempel Eksempel
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

#### Dataset Global Attributes Eksempel:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

#### Brugeradfærd:
- Ordene `Display1’ og `Display2’ vises i ’Oplysninger’ rækken på UI.
- Når du svæver, vil værktøjstips vise de tilsvarende egenskabsværdier:
  - `Display1`: Værktøjstip viser _Dette er att1_
  - `Display2`: Værktøjstip viser _Dette er att2_

### Noter
- Sørg for, at attributnavne, der er angivet i ’displayAttribute’-mærket, matcher de globale attributter, der er defineret i datasættet.
- Forkerte eller manglende attributter vil logge fejlmeddelelser.

Ved at følge disse trin kan du tilpasse ‘Oplysninger’-rækken på siden Datasets for at vise relevante globale attributter med tilsvarende værktøjstips.
