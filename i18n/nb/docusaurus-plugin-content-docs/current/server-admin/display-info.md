---
title: "displayInfo and displayAttribute"
sidebar_position: 7
---
## «displayInfo» og «displayAttribute» Tags

### Beskrivelse
Denne funksjonen lar deg vise globale attributter etter eget valg på siden datasett i `Informasjon'-raden.

### Bruksanvisninger
Disse taggene kan bare brukes med \"Sax-tolkeren\". For å aktivere og bruke dem, følg disse trinnene:

1.  **Aktiver SAX-tolkeren** :)
Legg følgende linje til din `setup.xml` fil:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Legg til etiketter i `datasets.xml`** :)
I «datasets.xml` fil, inkluderer to toppnivå tags:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Standard oppførsel** :)
   - Hvis disse taggene ikke er lagt til eller etterlatt tomme i `datasets.xml` fil, standardverdiene brukes som følger:
     - «displayInfo»: `Summering,License `
     - `displayAttribute': `summar, lisens `

4.  **Sikre konsistens** :)
Antallet kommaseparerte verdier i både \"displayInfo\" og \"displayAttribute\"-tagger må være det samme.

### Hvordan det fungerer
- Merken «displayAttribute» angir globale attributter (definert innenfor&lt;`addAttributes`&gt; tag) som vises for hvert datasett.
- De tilsvarende verdiene i merket «displayInfo» vises som etiketter i raden «informasjon».
- Når brukeren hviler over de viste etikettene, vises et verktøytips som viser verdien av den globale attributten.

### Eksempel
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

#### Datasett Globale attributter Eksempel:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

#### UI-adferd:
- Ordene «Vis 1» og «Vis 2» vil bli vist i «informasjon»-raden på UI.
- Når det er svevet vil verktøytips vise tilsvarende attributtverdier:
  - `Show1`:Farmasøytisk viser _Dette er at1_
  - `Vis 2':Farmasøytisk viser _Dette er at2_

### Noter
- Sørg for at attributtnavnene angitt i merket «displayAttribute» samsvarer med de globale attributtene definert i datasettet.
- Feil eller manglende attributter vil logge feilmeldinger.

Ved å følge disse trinnene kan du tilpasse raden \"informasjon\" på siden datasett for å vise relevante globale attributter med tilsvarende verktøytips.
