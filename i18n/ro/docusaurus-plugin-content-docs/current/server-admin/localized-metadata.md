---
sidebar_position: 8
---
# Metadate localizate

### Descriere
Această caracteristică vă permite să includeți metadate localizate despre seturile de date și variabilele dumneavoastră. Orice atribut definit în cadrul unui addAttributes Tag-ul poate fi localizat. Aceasta este destinată utilizării pentru atribute comune ale stringurilor, cum ar fi titlul, rezumatul, licența, instituția. Nu se recomandă utilizarea pentru numeric (de exemplu "_FillValue") sau valori standardizate (de exemplu "ioos_category") şi localizarea acestor tipuri de valori poate avea un comportament surprinzător.

### Instrucțiuni de utilizare
Pentru a le permite și utiliza, urmați acești pași:

1.  **Adaugă etichete ` datasets.xml ` ** :
În ` datasets.xml ` fișier, adăugați metadatele localizate în secțiunea atribute adăugare:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **Comportament implicit** :
   - Dacă nu sunt furnizate etichete xml:lang, informațiile furnizate vor fi afișate pentru toate limbile. Se potriveşte cu comportamentul anterior.
   - Dacă unele etichete xml:lang sunt furnizate, aceste valori vor fi utilizate pentru cereri în aceste limbi. Dacă un utilizator solicită o limbă care nu are o valoare dată xml:lang, valoarea din limba implicită (Engleză) vor fi folosite.
