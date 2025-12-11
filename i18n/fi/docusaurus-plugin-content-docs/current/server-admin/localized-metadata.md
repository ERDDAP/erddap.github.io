---
sidebar_position: 8
---
# Paikallinen metatieto

### Kuvaus
Tämän ominaisuuden avulla voit sisällyttää paikalliset metatiedot tietoaineistoistasi ja muuttujistasi. mikä tahansa ominaisuus, joka on määritelty addAttributes Tag voidaan lokalisoida. Tämä on tarkoitettu käytettäväksi yleisiin merkkijonoihin, kuten otsikkoon, yhteenvetoon, lisenssiin, instituutioon. Ei ole suositeltavaa käyttää numeerisesti (Esimerkkinä "_FillValue") standardoituja arvoja (Esimerkkinä ”joos_category”) Näiden arvojen lokalisoiminen voi olla yllättävää.

### Käyttöohjeet
Niiden käyttöönotto ja käyttö seuraa näitä vaiheita:

1.  **Lisää tags in ` datasets.xml ` ** :
Sisällä ` datasets.xml ` tiedosto, lisää paikalliset metatiedot lisäominaisuuksien osiossa:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **Oletuskäyttäytyminen** :
   - Jos xml:n laajuisia tunnisteita ei ole, tiedot esitetään kaikilla kielillä. Tämä vastaa aiempaa käyttäytymistä.
   - Jos näillä kielillä on joitakin xml:-tunnisteita, näitä arvoja käytetään kyseisten kielten pyyntöihin. Jos käyttäjä pyytää kieltä, jolla ei ole tarjottua xml:lang-arvoa, oletuskielen arvo (Englanti englanti) käytetään.
