---
title: "displayInfo and displayAttribute"
sidebar_position: 7
---
## 'displayInfo' i 'displayAttribute' Tags

### Opis
Ta funkcja pozwala na wyświetlanie globalnych atrybutów wybranych w zakładce zbiorów danych w wierszu "Informacje".

### Instrukcja użycia
Te znaczniki mogą być używane tylko z 'Sax parser'. Aby je włączyć i wykorzystać, należy wykonać następujące czynności:

1.  **Włącz parser SAX** :
Dodaj następujący wiersz do pliku 'setup.xml':
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Dodaj znacznikidatasets.xml'** :
W "datasets.xml'file, include two top- level tags:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Domyślne zachowanie** :
   - Jeśli te znaczniki nie są dodawane lub pozostawione puste w 'datasets.xml'Plik, wartości domyślne są stosowane w następujący sposób:
     - 'displayInfo': "Podsumowanie, licencja '
     - 'displayAtribution': 'streszczenie, licencja'

4.  **Zapewnienie spójności** :
Liczba wartości oddzielonych od comma- w znacznikach 'displayInfo' i 'displayAtribution' musi być taka sama.

### Jak to działa
- Znacznik 'displayAtribution' określa atrybuty globalne (zdefiniowane w ramach "<addAttributes>'tag) wyświetlane dla każdego zbioru danych.
- Odpowiednie wartości w znaczniku 'displayInfo' są wyświetlane jako etykiety w wierszu 'Information' interfejsu użytkownika.
- Kiedy użytkownik przewija się nad wyświetlanymi etykietami, pojawi się podpowiedź, pokazująca wartość atrybutu globalnego.

### Przykład
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

#### Przykład atrybutów globalnych Dataset:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

#### UI Zachowanie:
- Słowa "Display1" i "Display2" zostaną wyświetlone w wierszu "Information" w UI.
- Podczas podświetlania, podpowiedzi wyświetlają odpowiednie wartości atrybutów:
  - 'Display1': Tooltip pokazuje _ To jest att1 _
  - 'Display2': Tooltip pokazuje _ To jest att2 _

### Uwagi
- Upewnij się, że nazwy atrybutów podane w znaczniku 'displayAtribution' pasują do atrybutów globalnych zdefiniowanych w zbiorze danych.
- Nieprawidłowe lub brakujące atrybuty rejestrują komunikaty błędów.

Podążając za tymi krokami, możesz dostosować wiersz 'Information' na stronie zbiorów danych, aby wyświetlić odpowiednie atrybuty globalne z odpowiednimi podpowiedzi.
