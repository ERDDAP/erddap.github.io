---
sidebar_position: 7
---
#  `weergave Informatie` en `displayAttribuut` Tags

## Omschrijving
Deze functie kunt u globale attributen van uw keuze op de datasets pagina in de `Informatie` Roeien.

## Gebruiksinstructies
Deze tags kunnen alleen met de `Saxparser` . Volg deze stappen om ze in te schakelen en te gebruiken:

1.  **De SAX-parser inschakelen** :
Voeg de volgende regel toe aan uw `setup.xml` bestand:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Tags toevoegen in ` datasets.xml ` ** :
In de ` datasets.xml ` bestand, omvatten twee top-level tags:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Standaardgedrag** :
   - Als deze tags niet zijn toegevoegd of leeg gelaten in de ` datasets.xml ` bestand, de standaardwaarden worden als volgt toegepast:
     -  `weergave Informatie` : `Samenvatting,Licentie` 
     -  `displayAttribuut` : `Samenvatting, licentie` 

4.  **Consistentie garanderen** :
Het aantal komma-gescheiden waarden in beide `weergave Informatie` en `displayAttribuut` De labels moeten hetzelfde zijn.

## Hoe het werkt
- De `displayAttribuut` label specificeert globale attributen (gedefinieerd in de&lt; ` addAttributes ` &gt; tag) te tonen voor elke dataset.
- De overeenkomstige waarden in de `weergave Informatie` tag worden weergegeven als labels in de `Informatie` rij van de UI.
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
- De woorden `Weergave1` en `Display2` zal worden weergegeven in de `Informatie` Roeien op de UI.
- Als de tooltips worden getild, zullen de bijbehorende attribuutwaarden worden weergegeven:
  -  `Weergave1` : Tooltip toont _Dit is att1_
  -  `Display2` : Tooltip toont _Dit is att2_

## Opmerkingen
- Zorg ervoor dat de attribuutnamen gespecificeerd in de `displayAttribuut` tag komt overeen met de globale attributen gedefinieerd in de dataset.
- Onjuiste of ontbrekende attributen zullen foutmeldingen loggen.

Door deze stappen te volgen, kunt u de `Informatie` rij op de datasets pagina om relevante globale attributen met bijbehorende tooltips weer te geven.
