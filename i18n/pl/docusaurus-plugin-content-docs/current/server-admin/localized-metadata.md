---
sidebar_position: 8
---
# Lokalizowane metadane

### Opis
Ta funkcja pozwala na włączenie lokalnych metadanych o zbiorach danych i zmiennych. Każdy atrybut zdefiniowany w addAttributes Znacznik może być zlokalizowany. Jest to przeznaczone dla atrybutów wspólnych, takich jak tytuł, streszczenie, licencja, instytut. Nie zaleca się stosowania w liczbach (np. "_ FillValue") lub wartości znormalizowane (np. "joos _ category") i lokalizacja tego typu wartości może mieć zaskakujące zachowanie.

### Instrukcja użycia
Aby je włączyć i wykorzystać, należy wykonać następujące czynności:

1.  **Dodaj znaczniki ` datasets.xml ` ** :
W ` datasets.xml ` plik, dodaj metadane w sekcji atrybutów dodawania:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **Domyślne zachowanie** :
   - Jeżeli nie podano xml: tagi lang są dostarczane, podane informacje będą wyświetlane dla wszystkich języków. To pasuje do poprzedniego zachowania.
   - Jeżeli podane są niektóre znaczniki xml: lang, wartości te będą używane w tych językach. Jeśli użytkownik zażąda języka, który nie ma podanego xml: wartość lang, wartość z domyślnego języka (Angielski) zostaną wykorzystane.
