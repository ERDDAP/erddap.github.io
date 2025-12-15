---
sidebar_position: 7
---
#  `skjerm Info` og `skjermAttribute` Tags

## Beskrivelse
Denne funksjonen lar deg vise globale attributter etter eget valg på siden datasett i `Informasjon` rad.

## Bruksanvisninger
Disse taggene kan kun brukes med `Sax-tolker` .. For å aktivere og bruke dem, følg disse trinnene:

1.  **Aktiver SAX-tolkeren** :)
Legg til følgende linje i din `config.xml` fil:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Legg til etiketter i ` datasets.xml ` ** :)
I ` datasets.xml ` fil, inkluderer to toppnivå tags:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Standard oppførsel** :)
   - Hvis disse taggene ikke er lagt til eller etterlatt tomme i ` datasets.xml ` fil, standardverdiene brukes som følger:
     -  `skjerm Info` :) `Sammendrag,License` 
     -  `skjermAttribute` :) `sammendrag, lisens` 

4.  **Sikre konsistens** :)
Antall kommaseparerte verdier i begge `skjerm Info` og `skjermAttribute` Tags må være det samme.

## Hvordan det fungerer
- Den `skjermAttribute` merket angir globale attributter (definert i&lt; ` addAttributes ` &gt; tag) som skal vises for hvert datasett.
- De tilsvarende verdiene i `skjerm Info` Taggen vises som etiketter i `Informasjon` rad av UI.
- Når brukeren hviler over de viste etikettene, vises et verktøytips som viser verdien av den globale attributten.

## Eksempel
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Datasett Globale attributter Eksempel:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### UI-adferd:
- Ordene `Visning1` og `Visning2` vil bli vist i `Informasjon` Ro på UI.
- Når det er svevet vil verktøytips vise tilsvarende attributtverdier:
  -  `Visning1` : Verktøytips viser _Dette er at1_
  -  `Visning2` : Verktøyet viser _Dette er at2_

## Noter
- Sikre attributtnavnene som er angitt i `skjermAttribute` tagg matcher de globale attributtene definert i datasettet.
- Feil eller manglende attributter vil logge feilmeldinger.

Ved å følge disse trinnene kan du tilpasse `Informasjon` rad på datasettsiden for å vise relevante globale attributter med tilsvarende verktøytips.
