---
sidebar_position: 8
---
# Lokaliserte metadata

### Beskrivelse
Denne funksjonen lar deg inkludere lokaliserte metadata om datasett og variabler. Enhver egenskap definert i en addAttributes Tagge kan lokaliseres. Dette er ment å brukes til felles strengeattributter som tittel, sammendrag, lisens, instituering. Det anbefales ikke å brukes til numeriske (f.eks.) eller standardiserte verdier (f.eks. "ioos_kategori") og lokalisering av disse typer verdier kan ha overraskende oppførsel.

### Bruksanvisninger
For å aktivere og bruke dem, følg disse trinnene:

1.  **Legg til etiketter i ` datasets.xml ` ** :)
I ` datasets.xml ` fil, legg til lokale metadata i avsnittet Legg til attributter:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **Standard oppførsel** :)
   - Hvis ingen xml:lang tags er gitt, vil den oppgitte informasjonen vises for alle språk. Dette matcher tidligere oppførsel.
   - Hvis noen xml:lang tags er gitt, vil disse verdiene bli brukt for forespørsler på disse språkene. Hvis en bruker ber om et språk som ikke har en oppgitt xml:lang verdi, verdien fra standardspråket (Norsk) vil bli brukt.
