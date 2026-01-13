---
sidebar_position: 2
---
# Aktualizacja
Jak zrobić aktualizację istniejącego ERDDAP™ na serwerze

## Zmiany{#changes} 
1. Dokonaj zmian wymienionych w [Zmiany](/changes) w sekcji zatytułowanej "Rzeczy ERDDAP™ Administratorzy muszą wiedzieć i zrobić "dla wszystkich ERDDAP™ wersje od wersji, której używasz.
     
##  Java  {#java} 
2. Jeśli uaktualniasz ERDDAP™ wersja 2.18 lub poniżej, musisz przejść do Java 25 (lub nowsze) i powiązanego Tomcata 10. Patrz regularnie ERDDAP™ Instrukcja montażu [ Java ](/docs/server-admin/deploy-install#java) oraz [Tomcat](/docs/server-admin/deploy-install#tomcat) . Będziesz również musiał skopiować swój _tomcat_/content/erddap katalog ze starej instalacji Tomcat do nowej instalacji Tomcat.

## Pobierz{#download} 
3. Pobierz [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.29.0/erddap.war) into _ tomcat _ / webapps.
     (Wersja 2.29.0, 706,788,135 bajtów, MD5 = A5ED0DCC8D46CA27640FFEB8CE4A8560, datowany 12- 15- 2025) 
     
## messages.xml{#messagesxml} 
4. 
    * Często: Jeśli uaktualniasz ERDDAP™ wersja 1.46 (lub powyżej) i wystarczy użyć standardowych wiadomości, nowy standard messages.xml zostanie zainstalowany automatycznie (wśród plików .class poprzez erddap. wojna) .
         
    * Rzadko: Jeśli uaktualniasz ERDDAP™ wersja 1.44 (lub poniżej) ,
MUSI usunąć stary plik messages.xml:
         _tomcat_/content/erddap Messages.xml.
Nowy standard messages.xml zostanie zainstalowany automatycznie (wśród plików .class poprzez erddap. wojna) .
         
    * Rzadko: Jeśli zawsze wprowadzasz zmiany do standardowego pliku messages.xml (na miejscu) ,
musisz dokonać tych zmian w nowym pliku messages.xml (który jest
WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml po erddap.war jest zdekompresowana przez Tomcat).
         
    * Rzadko: Jeśli posiadasz niestandardowy plik messages.xml _tomcat_/content/erddap /,
Musisz się dowiedzieć (przez diff) jakie zmiany zostały wprowadzone w domyślnym messages.xml (które są w nowym erddap. wojna jako
WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml) i odpowiednio modyfikuj swój plik messages.xml.
         
## Instalacja{#install} 
5. Zainstaluj nowy ERDDAP™ w języku Tomcat:
* Nie używaj Tomcat Manager. Prędzej czy później będą problemy z pamięcią PermGen. Lepiej jest wyłączyć i uruchomić Tomcat.
\\ * Zastąp odnośniki do _ tomcat _ below aktualnym katalogiem Tomcat na komputerze.
     
### Linux i Mac{#linux-and-macs} 
1. Wyłącz Tomcat: Z linii poleceń użyj: _ tomcat _ / bin / shutdown.sh
I użyj ps-ef | grep tombot, aby sprawdzić, czy / kiedy proces został zatrzymany. (To może zająć minutę lub dwie.) 
2. Usuń zdekompresowane ERDDAP™ instalacja: In _ tomcat _ / webapps, use
rm-rf erddap
3. Usuń stary erddap. plik wojenny: In _ tomcat _ / webapps, użyj rm erddap. wojna
4. Skopiuj nowy erddap. plik wojenny z katalogu tymczasowego do _ tomcat _ / webapps
5. Przywróć Tomcat i ERDDAP : use _ tomcat _ / bin / startup.sh
6. Widok ERDDAP™ w przeglądarce, aby sprawdzić, czy restart się powiódł.
     (Często musisz spróbować kilka razy i poczekać minutę zanim zobaczysz ERDDAP™ .)   
             
### Okna{#windows} 
1. Wyłącz Tomcat: Z linii poleceń użyj: _ tomcat _\\ bin\\ shutdown.bat 
2. Usuń zdekompresowane ERDDAP™ instalacja: In _ tomcat _ / webapps, use
del / S / Q erddap
3. Usuń stary erddap. akta wojenne: In _ tomcat _\\ webapps, użyj del erddap. wojna
4. Skopiuj nowy erddap. plik wojenny z katalogu tymczasowego do _ tomcat _\\ webapps
5. Przywróć Tomcat i ERDDAP : use _ tomcat _\\ bin\\ startup.bat
6. Widok ERDDAP™ w przeglądarce, aby sprawdzić, czy restart się powiódł.
     (Często musisz spróbować kilka razy i poczekać minutę zanim zobaczysz ERDDAP™ .) 

Aktualizacja problemów ERDDAP ? Zobacz [rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support) .
