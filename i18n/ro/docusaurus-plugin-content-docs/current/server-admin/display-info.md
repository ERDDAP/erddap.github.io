---
title: "displayInfo and displayAttribute"
sidebar_position: 7
---
##  Etichete

### Descriere
Această caracteristică vă permite să afișați atribute globale ale alegerii dvs. pe pagina de seturi de date în rândul 

### Instrucțiuni de utilizare
Aceste tag-uri pot fi folosite numai cu parser-ul Sax. Pentru a le permite și utiliza, urmați acești pași:

1.  **Activează parserul SAX** :
Adăugaţi următoarea linie la fişierul dvs. de setup.xml:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Adaugă etichete în datasets.xml** :
Îndatasets.xml
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Comportament implicit** :
   - În cazul în care aceste etichete nu sunt adăugate sau lăsate goale îndatasets.xml
     -   
     -  

4.  **Asigurarea coerenței** :
Numărul de valori comma-separate atât în 

### Cum funcţionează
- Tag-ul "DisplayAttribute" specifică atribute globale (definite în cadrul&lt;addAttributesTag-ul trebuie afișat pentru fiecare set de date.
- Valorile corespunzătoare în tag-ul "DisplayInfo" sunt afișate ca etichete în rândul "UI."
- Atunci când utilizatorul plutește peste etichetele afișate, va apărea un tip de instrument, indicând valoarea atributului global.

### Exemplu
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

#### Dataset Atribute globale Exemplu:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

#### Comportamentul UI:
- Cuvintele "Display1" şi "Display2" vor fi afişate în rândul "I."
- Atunci când planează, vârfurile de unelte vor afișa valorile atributelor corespunzătoare:
  - 
  - 

### Note
- Asigurați-vă că denumirile atributelor specificate în tag-ul "DisplayAttribute" corespund atributelor globale definite în setul de date.
- Incorecte sau lipsesc atribute va loga mesaje de eroare.

Urmând acești pași, puteți personaliza rândul de pe pagina de seturi de date pentru a afișa atributele relevante globale cu vârfuri de instrumente corespunzătoare.
