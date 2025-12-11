---
sidebar_position: 7
---
#  `wyświetlacz Informacja` oraz `displayAtribution` Tags

## Opis
Ta funkcja pozwala na wyświetlanie globalnych atrybutów wybranych w zakładce zbiorów danych `Informacje` rząd.

## Instrukcja użycia
Te znaczniki mogą być używane tylko z `Sax parser` . Aby je włączyć i wykorzystać, należy wykonać następujące czynności:

1.  **Włącz parser SAX** :
Dodaj następujący wiersz do swojego `setup.xml` plik:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Dodaj znaczniki ` datasets.xml ` ** :
W ` datasets.xml ` plik, zawiera dwa znaczniki najwyższego poziomu:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Domyślne zachowanie** :
   - Jeśli te znaczniki nie są dodawane lub pozostawione puste w ` datasets.xml ` plik, wartości domyślne są stosowane w następujący sposób:
     -  `wyświetlacz Informacja` : `Podsumowanie, Licencja` 
     -  `displayAtribution` : `streszczenie, licencja` 

4.  **Zapewnienie spójności** :
Liczba wartości oddzielonych comma- `wyświetlacz Informacja` oraz `displayAtribution` Znaczniki muszą być takie same.

## Jak to działa
- W `displayAtribution` tag określa atrybuty globalne (zdefiniowane w&lt; ` addAttributes ` & gt; tag) zostanie wyświetlony dla każdego zbioru danych.
- Odpowiednie wartości w `wyświetlacz Informacja` tag są wyświetlane jako etykiety w `Informacje` rząd UI.
- Kiedy użytkownik przewija się nad wyświetlanymi etykietami, pojawi się podpowiedź, pokazująca wartość atrybutu globalnego.

## Przykład
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Przykład atrybutów globalnych Dataset:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### UI Zachowanie:
- Słowa `Wyświetl 1` oraz `Wyświetla2` będzie wyświetlany w `Informacje` wiosłować na autostradzie.
- Podczas podświetlania, podpowiedzi wyświetlają odpowiednie wartości atrybutów:
  -  `Wyświetl 1` : Tooltip pokazuje _ To jest att1 _
  -  `Wyświetla2` : Tooltip pokazuje _ To jest att2 _

## Uwagi
- Zapewnienie nazw atrybutów określonych w `displayAtribution` tag pasuje do atrybutów globalnych zdefiniowanych w zbiorze danych.
- Nieprawidłowe lub brakujące atrybuty rejestrują komunikaty błędów.

Podążając za tymi krokami, można dostosować `Informacje` wiersz na stronie zbiorów danych, aby wyświetlić odpowiednie atrybuty globalne z odpowiednimi wskazówkami.
