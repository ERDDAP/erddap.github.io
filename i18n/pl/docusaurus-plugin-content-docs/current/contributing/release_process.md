---
sidebar_position: 3
---
#  ERDDAP™ Proces uwalniania
* Upewnij się, że pliki porównywania obrazów są dostępne (To może oznaczać ucieczkę. `mvn weryfikuje` , jeśli chcesz przyspieszyć to ograniczenie tylko do grupy ImageComparison choć zauważyć, że nadal wymaga prowadzenia testów Jetty) 
* Aktualizuj zależności
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Aktualizuj wtyczki
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Uruchom testy, aby upewnić się, że aktualizacje zależności nie złamał niczego dla wszystkich głównych konfiguracji (zbiory danych parsujące w szczególności, choć wszelkie inne istotne ustawienia, jak również) . Zauważcie, że zewnętrzny zestaw testowy może być bardzo zmienny. SlowAWS test apartament może zająć bardzo dużo czasu.
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* Stosowanie `tłumaczenie python / translate.py` w razie potrzeby aktualizować tłumaczenia.
* Rozwój zestawu EDStatic.java Tryb do false, zmienić numer wersji i określić datę wydania.
* Zbuduj.
```
mvn clean
mvn compile
mvn package
```
## Kanary
Wyślij plik wojenny do dystrybucji na serwerze Coastwatch lub innym serwerze, który wykorzystuje większość typów danych i otrzymuje dużo ruchu.
Chcemy spróbować znaleźć błędy przed szerszą dystrybucją budowy.

Dołącz wiadomość, gdy będziesz mówił o nowym wydaniu.

Standardowa procedura jest następująca:
* Wyślij plik .war do straży przybrzeżnej \\[ Tomcat \\] / content / erddap /
* Jako użytkownik = tomcat:
  * W \\[ Tomcat \\] / bin /:
. / shutdown.sh / / użyj "ps -fu tomcat", aby upewnić się, że przestał
  * W \\[ Tomcat \\] / webapps /:
rm -rf erddap
rm erddap. wojna
cp.. / content / erddap / erddap2.22.war erddap.war / / lub czymkolwiek jest numer
  * W \\[ Tomcat \\] / bin /:
. / startup.sh
  * Po ERDDAP zwrócił stronę internetową, w \\[ Tomcat \\] / webapps /:
chgrp -R erddap erddap
chmod -R g + rw erddap
chmod -R o- rwx erddap

## Uwolnienie GitHub
Projekt wydania GitHub, w tym erddap.war i erddapContent .zip   (brak numerów wersji) 

title: The official v2.25 version
opisać: Zobacz listę zmian na stronie
       https://erddap.github.io/changes#version-225
 

## Aktualizacja dokumentacji
* Aktualizuj numer wersji w pliku docusaurus.config.ts (w sekcji stopy) .
* Edytuj strony dokumentacji (deploy- install.md i deploy- update.md) .
  * Szukaj \\[ erddap.war \\]  
  * Kopiuj istniejące informacje (lekko zreformowane) do wykazu poprzednich instalacji 2.
  * Zmień aktualne informacje o wydaniu dla erddap. wojna w \\[ erddap.war \\] 
* Uruchom tłumaczenia dla strony dokumentacji.
* Złóż żądanie ciągnięcia i połączyć zmiany.
* Uruchomić stronę dokumentacji (zobacz readme) .

## Zapewnienie aktualności innych transakcji repo w razie potrzeby
Głównie oznacza to ErddapContent i ErddapTest, ale należy je aktualizować podczas zmian rozwojowych.

## Informuj użytkowników
Najpierw powiadomcie użytkowników, którzy zażądali zmian (lub których błędy zostały naprawione) . Daj im czas na sprawdzenie zmian i / lub poruszenie kwestii.

 ERDDAP Wersja 2.25 jest już dostępna&#33;

Możesz przeczytać o zmianach w
 https://erddap.github.io/changes#version-225
 

Niektóre zmiany to zmiany, które zasugerowałeś. Dziękuję bardzo za sugestie. Szukaj swojego imienia na liście zmian, aby zobaczyć szczegóły. Byłoby świetnie, gdyby mógł pan wypróbować nowe funkcje wkrótce, zanim ogłoszę tę nową wersję szerszej publiczności.

Jeśli jesteś ERDDAP administrator, instrukcje aktualizacji są na
 https://erddap.github.io/docs/server-admin/deploy-update
 

Jeśli masz jakieś problemy, pytania, sugestie, proszę wysłać e-mail.

Dziękuję za używanie ERDDAP .

### Ogłoszenie wydania
Wyślij ogłoszenie na listę ogłoszeń.
