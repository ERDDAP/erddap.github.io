---
sidebar_position: 8
---
# Gelokaliseerde metadata

### Omschrijving
Met deze functie kunt u gelokaliseerde metadata over uw datasets en variabelen opnemen. Een attribuut gedefinieerd in een addAttributes tag kan gelokaliseerd worden. Dit is bedoeld voor gemeenschappelijke string attributen zoals titel, samenvatting, licentie, instelling. Het wordt niet aanbevolen voor numerieke (bv. "_FillValue") of gestandaardiseerde waarden (b.v. "ios_categorie") en het lokaliseren van deze soorten waarden kan verrassend gedrag.

### Gebruiksinstructies
Volg deze stappen om ze in te schakelen en te gebruiken:

1.  **Tags toevoegen in ` datasets.xml ` ** :
In de ` datasets.xml ` bestand, voeg je gelokaliseerde metadata toe in de sectie attributen toevoegen:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **Standaardgedrag** :
   - Als er geen xml:lang tags worden verstrekt, wordt de verstrekte informatie voor alle talen weergegeven. Dit komt overeen met het vorige gedrag.
   - Als sommige xml:lang tags worden verstrekt, zullen deze waarden worden gebruikt voor verzoeken in die talen. Als een gebruiker een taal vraagt die geen opgegeven xml:lang waarde heeft, de waarde van de standaardtaal (Engels) zal worden gebruikt.
