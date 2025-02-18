---
sidebar_position: 2
---
# Aktualizacja
Jak zrobić aktualizację istniejącegoERDDAP™na serwerze

## Zmiany{#changes} 
1. Dokonaj zmian wymienionych w[Zmiany](/changes)w sekcji zatytułowanej "RzeczyERDDAP™Administratorzy muszą wiedzieć i zrobić "dla wszystkichERDDAP™wersje od wersji, której używasz.
     
## Java {#java} 
2. Jeśli uaktualniaszERDDAP™wersja 2.18 lub poniżej, musisz przejść doJava21 (lub nowsze) i powiązanego Tomcata 10. Patrz regularnieERDDAP™Instrukcja montażu[Java](/docs/server-admin/deploy-install#java)oraz[Tomcat](/docs/server-admin/deploy-install#tomcat). Będziesz również musiał skopiować swój_tomcat_/content/erddapkatalog ze starej instalacji Tomcat do nowej instalacji Tomcat.

## Pobierz{#download} 
3. Pobierz[erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)into _ tomcat _ / webapps.
     (Wersja 2.25 _ 1, 592,292,039 bajtów, MD5 = 652AFC9D1421F00B5F789DA2C4732D4C, datowany na 2024- 11- 07) 
     
## messages.xml{#messagesxml} 
4. 
    * Często: Jeśli uaktualniaszERDDAP™wersja 1.46 (lub powyżej) i wystarczy użyć standardowych wiadomości, nowy standard messages.xml zostanie zainstalowany automatycznie (wśród plików .class poprzez erddap. wojna) .
         
    * Rzadko: Jeśli uaktualniaszERDDAP™wersja 1.44 (lub poniżej) ,
MUSI usunąć stary plik messages.xml:
        _tomcat_/content/erddapMessages.xml.
Nowy standard messages.xml zostanie zainstalowany automatycznie (wśród plików .class poprzez erddap. wojna) .
         
    * Rzadko: Jeśli zawsze wprowadzasz zmiany do standardowego pliku messages.xml (na miejscu) ,
musisz dokonać tych zmian w nowym pliku messages.xml (który jest
WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml po erddap.war jest zdekompresowana przez Tomcat).
         
    * Rzadko: Jeśli posiadasz niestandardowy plik messages.xml_tomcat_/content/erddap/,
Musisz się dowiedzieć (przez diff) jakie zmiany zostały wprowadzone w domyślnym messages.xml (które są w nowym erddap. wojna jako
WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml) i odpowiednio modyfikuj swój plik messages.xml.
         
## Instalacja{#install} 
5. Zainstaluj nowyERDDAP™w języku Tomcat:
* Nie używaj Tomcat Manager. Prędzej czy później będą problemy z pamięcią PermGen. Lepiej jest wyłączyć i uruchomić Tomcat.
\\ * Zastąp odnośniki do _ tomcat _ below aktualnym katalogiem Tomcat na komputerze.
     
### Linux i Mac{#linux-and-macs} 
1. Wyłącz Tomcat: Z linii poleceń użyj: _ tomcat _ / bin / shutdown.sh
I użyj ps-ef|grep tombot, aby sprawdzić, czy / kiedy proces został zatrzymany. (To może zająć minutę lub dwie.) 
2. Usuń zdekompresowaneERDDAP™instalacja: In _ tomcat _ / webapps, use
rm-rf erddap
3. Usuń stary erddap. plik wojenny: In _ tomcat _ / webapps, użyj rm erddap. wojna
4. Skopiuj nowy erddap. plik wojenny z katalogu tymczasowego do _ tomcat _ / webapps
5. Przywróć Tomcat iERDDAP: use _ tomcat _ / bin / startup.sh
6. WidokERDDAP™w przeglądarce, aby sprawdzić, czy restart się powiódł.
     (Często musisz spróbować kilka razy i poczekać minutę zanim zobaczyszERDDAP™.)   
             
### Okna{#windows} 
1. Wyłącz Tomcat: Z linii poleceń użyj: _ tomcat _\\ bin\\shutdown.bat
2. Usuń zdekompresowaneERDDAP™instalacja: In _ tomcat _ / webapps, use
del / S / Q erddap
3. Usuń stary erddap. akta wojenne: In _ tomcat _\\ webapps, użyj del erddap. wojna
4. Skopiuj nowy erddap. plik wojenny z katalogu tymczasowego do _ tomcat _\\ webapps
5. Przywróć Tomcat iERDDAP: use _ tomcat _\\ bin\\ startup.bat
6. WidokERDDAP™w przeglądarce, aby sprawdzić, czy restart się powiódł.
     (Często musisz spróbować kilka razy i poczekać minutę zanim zobaczyszERDDAP™.) 

Aktualizacja problemówERDDAP? Zobacz[rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support).
