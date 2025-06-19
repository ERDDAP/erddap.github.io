---
sidebar_position: 7
---
# Vertaling: Tags

## Omschrijving
Deze functie stelt u in staat om globale attributen van uw keuze weer te geven op de datasets pagina in de rij Informatie.

## Gebruiksinstructies
Deze tags kunnen alleen gebruikt worden met de Sax parser. Volg deze stappen om ze in te schakelen en te gebruiken:

1.  **De SAX-parser inschakelen** :
Voeg de volgende regel toe aan uw bestand:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Tags toevoegen aandatasets.xmlWat?** :
In dedatasets.xmlHet bestand bevat twee top-level tags:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Standaardgedrag** :
   - Als deze tags niet zijn toegevoegd of leeg gelaten in de datasets.xmlDe standaardwaarden worden als volgt toegepast:
     - Vertaling: Samenvatting,Licentie Wat?
     - DisplayAttribuutExterne links: Wat?

4.  **Consistentie garanderen** :
Het aantal door komma's gescheiden waarden in zowel displayInfo

## Hoe het werkt
- De &lt;Wat?addAttributesVoor elke dataset wordt een "tag" getoond.
- De corresponderende waarden in de 
- Wanneer de gebruiker over de getoonde labels zweeft, verschijnt er een tooltip die de waarde van het globale attribuut toont.

## Voorbeeld
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Dataset Global Attributen Voorbeeld:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### UI-gedrag:
- De woorden "Display1" en "Display2" worden weergegeven in de rij "Informatie" op de UI.
- Als de tooltips worden getild, zullen de bijbehorende attribuutwaarden worden weergegeven:
  - Display1
  - Display2

## Opmerkingen
- Zorg ervoor dat de attribuutnamen die zijn opgegeven in de displayAttribuute
- Onjuiste of ontbrekende attributen zullen foutmeldingen loggen.

Door deze stappen te volgen, kunt u de rij "Informatie" op de datasets pagina aanpassen om relevante globale attributen weer te geven met bijbehorende tooltips.
