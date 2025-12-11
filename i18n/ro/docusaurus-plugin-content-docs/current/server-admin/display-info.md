---
sidebar_position: 7
---
#  `ecran Informații` şi `AfișeazăAtribut` Etichete

## Descriere
Această caracteristică vă permite să afișați atributele globale ale alegerii dumneavoastră pe pagina seturilor de date din `Informații` Rând.

## Instrucțiuni de utilizare
Aceste etichete pot fi utilizate numai cu `Sax parser` . Pentru a le permite și utiliza, urmați acești pași:

1.  **Activează parserul SAX** :
Adaugă următoarea linie `setup.xml` fișier:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Adaugă etichete ` datasets.xml ` ** :
În ` datasets.xml ` fișier, include două etichete de nivel superior:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Comportament implicit** :
   - Dacă aceste etichete nu sunt adăugate sau lăsate goale în ` datasets.xml ` fișier, valorile implicite se aplică după cum urmează:
     -  `ecran Informații` : `Rezumat,License` 
     -  `AfișeazăAtribut` : `sumar,licence` 

4.  **Asigurarea coerenței** :
Numărul de valori separate de virgulă în ambele `ecran Informații` şi `AfișeazăAtribut` Etichetele trebuie să fie la fel.

## Cum funcţionează
- ă `AfișeazăAtribut` eticheta specifică atributele globale (definite în cadrul&lt; ` addAttributes ` &gt; etichetă) care trebuie afișată pentru fiecare set de date.
- Valorile corespunzătoare în `ecran Informații` eticheta este afișată ca etichete în `Informații` Rândul UI.
- Atunci când utilizatorul plutește peste etichetele afișate, va apărea un tip de instrument, indicând valoarea atributului global.

## Exemplu
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Dataset Atribute globale Exemplu:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### Comportamentul UI:
- Cuvintele `Display1` şi `Display2` va fi afișat în `Informații` Rândul pe UI.
- Atunci când planează, vârfurile de unelte vor afișa valorile atributelor corespunzătoare:
  -  `Display1` : Tooltip shows _This is att1_
  -  `Display2` : Tooltip shows _This is att2_

## Note
- Asigură numele atributelor specificate în `AfișeazăAtribut` eticheta corespunde atributelor globale definite în setul de date.
- Incorecte sau lipsesc atribute va loga mesaje de eroare.

Prin urmărirea acestor pași, puteți personaliza `Informații` rândul de pe pagina seturilor de date pentru a afișa atribute globale relevante cu vârfuri de instrumente corespunzătoare.
