---
sidebar_position: 1
---

# Instaluj
Jak zrobić wstępne ustawienie ERDDAP™ na serwerze

 ERDDAP™ może działać na dowolnym serwerze, który obsługuje Java i Tomcat (i innych serwerów aplikacji takich jak Jetty, ale ich nie wspieramy) .
 ERDDAP™ został przetestowany na Linuksie (w tym na AWS Amazon) komputerów Mac i Windows.

*  **Docker** -- Zapewniamy [ ERDDAP™ w pojemniku Docker](https://hub.docker.com/r/erddap/erddap) 
i IOOS oferuje teraz [Szybki przewodnik startowy dla ERDDAP™ w kontenerze dokującym](https://ioos.github.io/erddap-gold-standard/index.html) .
Taki jest standard. ERDDAP™ instalacja, w pojemniku Docker.
Przez Docker Komponowanie zapewniamy łatwe sposoby konfiguracji ssl i monitorowania, czytaj więcej na zewnątrz [Dokumentacja dokująca](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Jeśli już używasz Docker, prawdopodobnie wolisz wersję Docker.
Jeśli chcesz uruchomić usługi w chmurze, prawdopodobnie wolisz wersję Docker.
*  **Amazon** -- W przypadku instalacji ERDDAP™ na przykładzie Amazon Web Services EC2, zobacz to [Amazon Web Services Przegląd](/docs/server-admin/additional-information#amazon) Najpierw.
*  **Linux i Mac** -- ERDDAP™ działa świetnie na komputerach Linux i Mac. Patrz instrukcje poniżej.
*  **Okna** -- Okna są dobre do testowania ERDDAP™ oraz do użytku osobistego (Zob. instrukcje poniżej.) ,
ale nie zalecamy używania go publicznie ERDDAP™ rozmieszczenia. Uruchomienie ERDDAP™ w systemie Windows mogą mieć problemy:
w szczególności: ERDDAP™ może nie być w stanie szybko usunąć i / lub zmienić nazwy plików. To prawdopodobnie z powodu oprogramowania antywirusowego
   (np. z McAfee i Norton) czyli sprawdzanie plików pod kątem wirusów. Jeśli napotkasz ten problem
(które mogą być widoczne przez komunikaty błędów w [log.txt](/docs/server-admin/additional-information#log) plik podobny
"Nie można usunąć"...), zmiana ustawień oprogramowania antywirusowego może częściowo złagodzić problem. Albo rozważyć użycie zamiast tego serwera Linux lub Mac.

 **Norma ERDDAP™ instrukcje instalacji dla komputerów Linux, Mac i Windows to:** 

0. Upewnij się, że wszystkie zależności są zainstalowane. Na maszynach innych niż Windows (Linux i Mac) Potrzebujesz CSH.

##  Java  {#java} 

1.  [Dla ERDDAP™ v2.19 +, skonfigurowane Java 21.](#java) 
Ze względów bezpieczeństwa, prawie zawsze najlepiej jest użyć najnowszej wersji Java 21.
Proszę pobrać i zainstalować najnowszą wersję
    [OpenJDK Adoptium (Temuryna) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21) .
Aby zweryfikować instalację, uruchom '/ javaJreBinDirectory / java -version', na przykład
"/ usr / local / jdk- 21.0.3 + 9 / jre / bin / java - Wersja '.

    ERDDAP™ z Java z innych źródeł, ale zalecamy Adoptium, ponieważ jest głównym, wspieranym przez społeczność,
wolny (jak w piwie i mowie) wersja Java 21 który oferuje długoterminowe wsparcie (darmowe aktualizacje przez wiele lat po wydaniu początkowym) .
Ze względów bezpieczeństwa prosimy o aktualizację ERDDAP Wersja Java okresowo jako nowe wersje Java Lek Adoptium dostępny jest w postaci 21 tabletek.

    ERDDAP™ został przetestowany i szeroko stosowany z 21, a nie inne wersje. Z różnych powodów, nie testujemy z lub wspierać inne wersje Java .
     
## Kot{#tomcat} 

2.  [Ustaw](#tomcat)   [Kot](https://tomcat.apache.org) . Tomcat jest najczęściej używane Java Serwer aplikacji,
co jest Java oprogramowanie, które stoi pomiędzy usługami sieciowymi systemu operacyjnego i Java oprogramowanie serwera jak ERDDAP™ .
To jest wolne i otwarte oprogramowanie źródłowe (FOSS) .

Możesz użyć innego. Java Serwer aplikacji (np. Jetty) Ale my tylko sprawdzamy i wspieramy Tomcata.

   * Pobierz Tomcat i rozpakuj go na serwerze lub komputerze.
Ze względów bezpieczeństwa, prawie zawsze najlepiej jest użyć najnowszej wersji Tomcat 10 (Wersja 9 i poniżej są niedopuszczalne) 
który jest przeznaczony do pracy z Java 21 lub nowsze. Poniżej, katalog Tomcat będzie określany jako 'tomcat'.

Ostrzeżenie&#33; Jeśli masz już Tomcat uruchomiony jakiś inny aplikacji internetowej (zwłaszcza TRREDDS) , zalecamy zainstalować ERDDAP™ w
      [a drugi Tomcat](/docs/server-admin/additional-information#second-tomcat) , ponieważ ERDDAP™ potrzebuje różnych ustawień Tomcat
i nie powinien mieć do czynienia z innymi aplikacjami pamięci.

     * Na Linuksie, [Pobierz "Core" "tar .gz "Dystrybucja Tomcat](https://tomcat.apache.org/download-10.cgi) i rozpakować.
Zalecamy rozpakowanie go w '/ usr / local'.
     * Na komputerze Mac, Tomcat jest prawdopodobnie już zainstalowany w '/ Library / Tomcat', ale powinien zaktualizować go do najnowszej wersji Tomcat 10.
Jeśli go ściągniesz, [Pobierz "Core" "tar .gz "Dystrybucja Tomcat](https://tomcat.apache.org/download-10.cgi) i rozpakować go w '/ Biblioteka / Tomcat'.
     * W systemie Windows możesz [Pobierz dystrybucję "Core" "zip" Tomcat](https://tomcat.apache.org/download-10.cgi) 
        (który nie zadziera z rejestrem systemu Windows i który kontrolujesz z linii poleceń DOS) i rozpakować go w odpowiednim katalogu.
        (Dla rozwoju używamy dystrybucji "Core" "zip". Tworzymy katalog '/ programów' i rozpakowujemy go tam.) 
Możesz też pobrać dystrybucję "Core" "64- bit Windows zip", która zawiera więcej funkcji.
Jeśli dystrybucja jest instalatorem systemu Windows, to na przykład "/ Program Files / apache- tomcat- 10.0.23".
             
### server.xml{#serverxml} 

*  [server.xml](#serverxml) - W pliku 'tomcat / conf / server.xml' są dwie zmiany, które należy wprowadzić do każdego z dwóch ' <Connector> 'tagi
   (jeden dla '&lt; Connector port = "8080" "i jeden dla' &lt; Conector port =" 8443 "") .
   1.  (Zalecane) Zwiększ wartość parametru 'connectionTimeout', być może do 300000 (milisekundy, czyli 5 minut) .
   2.  (Zalecane) Dodaj nowy parametr: 'relaxedQueryChars = "[] | "". Jest to opcjonalne i nieco mniej bezpieczne,
ale usuwa potrzebę zaszyfrowania tych znaków przez użytkowników w parametrach adresu URL.
             
### content.xml{#contentxml} 

* context.xml -- Zasoby Cache - In 'tomcat / conf / context.xml', tuż przed ' </Context> 'tag, zmień znacznik Surowców
   (lub dodać go, jeśli nie jest jeszcze tam) ustawianie pamięci podręcznej Parametr MaxSize do 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Unika to licznych ostrzeżeń w katalinie. że wszystko zaczyna się od
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Czas Apache{#apache-timeout} 

* Na komputerach Linuksa zmienić ustawienia czasu Apache tak, aby czasochłonne żądania użytkownika nie timeout
   (co często pojawia się jako błąd "Proxy" lub "Bad Gateway") . Jako użytkownik root:
  * Modyfikuj Apache " http Plik d.conf (zazwyczaj w '/ etc / http d / conf / ') :
    * Zmiana istniejącego " <Timeout> 'ustawienie (lub dodać jeden na końcu pliku) Do 3600 (sekundy) , zamiast domyślnej 60 lub 120 sekund.
    * Zmiana istniejącego " <ProxyTimeout> 'ustawienie (lub dodać jeden na końcu pliku) Do 3600 (sekundy) , zamiast domyślnej 60 lub 120 sekund.
  * Przywróć Apache: '/ usr / sbin / apachectl -k graceful' (ale czasami jest w innym katalogu) .

### Bezpieczeństwo{#security} 
         
* Zalecenie bezpieczeństwa: Patrz [instrukcje](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) zwiększenie bezpieczeństwa
Twoja instalacja Tomcat, szczególnie dla serwerów publicznych.
         
* Dla publiczności ERDDAP™ Instalacje na Linuksie i Macsie, najlepiej skonfigurować Tomcat (program) jako należące do użytkownika 'tomcat'
   (oddzielnego użytkownika z ograniczonymi uprawnieniami i który [nie ma hasła](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Tak więc, tylko super użytkownik może przejść do działania jako użytkownik "tomcat". To sprawia, że hakerzy nie mogą zalogować się na serwer jako użytkownik 'tomcat'.
I w każdym razie, powinieneś zrobić to tak, że użytkownik 'tomcat' ma bardzo ograniczone uprawnienia w systemie plików serwera (przeczytaj + write + execute przywileje
dla drzewa katalogowego 'apache- tomcat' i ' <bigParentDirectory> 'i tylko read- przywileje dla katalogów z danymi, które ERDDAP™ wymaga dostępu do).
  * Możesz utworzyć konto użytkownika 'tomcat' (który nie ma hasła) za pomocą polecenia:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Możesz przejść do pracy jako użytkownik 'tomcats' za pomocą polecenia
    ```
    sudo su - tomcat
    ```
     (Poprosi o hasło do superausera, aby uzyskać na to pozwolenie.) 
    * Możesz przestać pracować jako tomcat użytkownika za pomocą polecenia
    ```
    exit
    ````
    * Zrób większość reszty Tomcat i ERDDAP™ instrukcje konfiguracji jako użytkownika "tomcat". Później uruchom skrypty 'startup.sh' i 'shutdown.sh' jako tomcat użytkownika '
tak, że Tomcat ma pozwolenie na pisanie do swoich plików dziennika.
    * Po rozpakowaniu Tomcat, od rodzica katalogu 'apache- tomcat':
      * Zmień właściciela drzewa katalogowego apache- tomcat na użytkownika.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (ale zastąpić rzeczywistą nazwę katalogu tomcat) .
      * Zmień nazwę "grupy" na tomcat, nazwę użytkownika lub nazwę małej grupy, która zawiera Tomcat i wszystkich administratorów Tomcat / ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Zmień uprawnienia tak, aby Tomcat i grupa przeczytali, napisali, wykonywali uprawnienia:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Usuń "inne" uprawnienia użytkownika do odczytu, zapisu lub wykonania:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Jest to ważne, ponieważ uniemożliwia innym użytkownikom odczytywanie potencjalnie wrażliwych informacji w ERDDAP™ konfiguracja plików.

### Pamięć{#memory} 

Ustaw zmienne środowiska Tomcat

* Na Linuksie i Makach:
Utwórz plik 'tomcat / bin / setenv.sh' (lub w Red Hat Enterprise Linux \\[ RHEL \\] , edit '~ tomcat / conf / tomcat10.conf') aby ustawić zmienne środowiska Tomcat.
Plik zostanie użyty przez 'tomcat / bin / startup.sh' i 'shutdown.sh'. Plik powinien zawierać coś w rodzaju:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (ale zastąpić nazwy katalogów z komputera) .
   (Jeśli wcześniej ustawiono 'JRE _ HOME', można to usunąć.) 
Na Macs, prawdopodobnie nie trzeba ustawić 'JAVA _ HOME'.

* W systemie Windows:
Utwórz plik 'tomcat\\ bin\\ setenv.bat', aby ustawić zmienne środowiska Tomcat.
Plik zostanie użyty przez 'tomcat\\ bin\\ startup.bat' i ' shutdown.bat '.
Plik powinien zawierać coś w rodzaju:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (ale zastąpić nazwy katalogów z komputera) .
Jeśli jest to tylko do lokalnych testów, usunąć "-server".
   (Jeśli wcześniej ustawiono 'JRE _ HOME', można to usunąć.) 

Ustawienia pamięci '-Xmx' i '-Xms' są ważne, ponieważ ERDDAP™ działa lepiej z większą pamięcią.
Zawsze ustaw '-Xms' na tę samą wartość co '-Xmx'.

* Dla 32-bitowych systemów operacyjnych i 32-bitowych Java :
64 bity Java jest o wiele lepszy niż 32 bit Java , ale 32 bit Java będzie działać tak długo, jak serwer nie jest naprawdę zajęty.
Im więcej fizycznej pamięci na serwerze, tym lepiej: 4 + GB jest naprawdę dobry, 2 GB jest w porządku, mniej nie jest zalecane.
Z 32 bitami Java , nawet z obfitej pamięci fizycznej, Tomcat i Java nie będzie działać, jeśli spróbujesz ustawić '-Xmx' znacznie powyżej 1500M (1200M na niektórych komputerach) .
Jeśli Twój serwer ma mniej niż 2GB pamięci, zmniejsz wartość '-Xmx' (in 'M' egaBytes) do 1 / 2 fizycznej pamięci komputera.

* Dla 64-bitowych systemów operacyjnych i 64-bitowych Java :
64 bity Java będzie pracować tylko na 64-bitowym systemie operacyjnym.
  * Z Java 8, musisz dodać '-d64' do parametru 'CATALINA _ OPTS' w 'setenv.bat'.
  * Z Java 21, wybierasz 64 bity Java po pobraniu wersji Java oznaczone "64 bit".

Z 64 bitami Java , Tomcat i Java może używać bardzo wysokich ustawień '-Xmx' i '-Xms'. Im więcej fizycznej pamięci na serwerze, tym lepiej.
Jako uproszczona sugestia: zalecamy ustawienie '-Xmx' i '-Xms' do (in 'M' egaBytes) do 1 / 2 (lub mniej) fizycznej pamięci komputera.
Możesz zobaczyć, czy Tomcat, Java oraz ERDDAP™ rzeczywiście działają w trybie 64 bit przez wyszukiwanie "bit", w ERDDAP E-mail Daily Report
lub w 'bigParentDirectory / logi / [log.txt](/docs/server-admin/additional-information#log) 'Plik ('bigParentDirectory' jest określone w [setup.xml](#setupxml) ) .

#### Kolekcja śmieci{#garbage-collection} 

* W ERDDAP™ jest [log.txt](/docs/server-admin/additional-information#log) plik, zobaczysz wiele "GC (Niepowodzenie przydziału) "wiadomości.
Zazwyczaj nie stanowi to problemu. Jest to częsta wiadomość od normalnie działających Java mówiąc, że właśnie skończył drobne śmieci
kolekcja, ponieważ zabrakło miejsca w Eden (Sekcja Java sterta dla bardzo młodych obiektów) . Zazwyczaj wiadomość pokazuje
"memoryUseBefore- &gt; memoryUseAfter". Jeśli te dwie liczby są blisko siebie, to znaczy, że zbiórka śmieci nie była produktywna.
Wiadomość jest tylko oznaką kłopotów, jeśli jest bardzo często (co kilka sekund) , nieproduktywne, a liczba jest duża i nie rośnie,
które łącznie wskazują, że Java potrzebuje więcej pamięci, walczy o uwolnienie pamięci, i nie jest w stanie uwolnić pamięci.
To może się zdarzyć w stresującym czasie, a następnie odejść. Ale jeśli to trwa, to jest oznaką kłopotów.
* Jeśli widzisz 'java.lang.OutOfMemoryError jest w ERDDAP™ jest [log.txt](/docs/server-admin/additional-information#log) plik,
patrz [Błąd OutOfMemoryError](/docs/server-admin/additional-information#outofmemoryerror) wskazówki dotyczące diagnozowania i rozwiązywania problemów.
         
### Uprawnienia{#permissions} 

*  [Na Linuksie i Makach, zmień uprawnienia](#permissions) wszystkich plików '* .sh' w 'tomcat / bin /' do wykonania przez właściciela:
  ```
  chmod +x *.sh
  ```

### Czcionki{#fonts} 

*  [Czcionki obrazów:](#fonts) Zdecydowanie wolimy wolność. [Czcionki DejaVu](https://dejavu-fonts.github.io/) do drugiego Java czcionek.
Korzystanie z tych czcionek jest zdecydowanie zalecane, ale nie jest wymagane.

Jeśli zdecydujesz się nie używać czcionek DejaVu, musisz zmienić ustawienia fontFamily w setup.xml na ' <fontFamily> SansSerif </fontFamily> ',
który jest dostępny ze wszystkimi Java dystrybucji. Jeśli ustawisz ' <fontFamily> 'do nazwy czcionki, która nie jest dostępna, ERDDAP™ nie załaduje
i wydrukuje listę dostępnych czcionek w pliku 'log.txt'. Musisz użyć jednej z tych czcionek.

Jeśli zdecydujesz się użyć czcionek DejaVu, upewnij się, że ' <fontFamily> 'ustawienie w setup.xml jest' <fontFamily> DejaVu Sans </fontFamily> '.

Aby zainstalować czcionki DejaVu, pobierz [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5,522,795 bajtów, MD5 = 33E1E61FAB06A547851ED308B4FFEF42) 
i rozpakować pliki czcionek do tymczasowego katalogu.

  * W Linux:
    * Dla Adoptium Linuksa Java dystrybucje, patrz [instrukcje](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Z innymi Java dystrybucje: Jako użytkownik 'tomcat' skopiuj pliki czcionek do '$JAVA _ HOME / lib / fonts' tak Java może znaleźć czcionki.
Pamiętaj: jeśli / kiedy później uaktualnisz do nowszej wersji Java , musisz ponownie zainstalować te czcionki.
  * Na makach: dla każdego pliku czcionki kliknij dwukrotnie, a następnie kliknij przycisk Zainstaluj czcionkę.
  * Na Windows 7 i 10: w Windows Explorer wybierz wszystkie pliki czcionek. Kliknij prawym przyciskiem. Kliknij na Install.
             
### Test Tomcat{#test-tomcat} 

* Sprawdź instalację Tomcat.
  * Linux:
    * Jako użytkownik "tomcat", "run 'tomcat / bin / startup.sh".
    * Zobacz swój adres URL + ": 8080 /" w przeglądarce (np., [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac (uruchom tomcat jako użytkownik administratora systemu) :
    * Uruchom 'tomcat / bin / startup.sh'.
    * Zobacz swój adres URL + ": 8080 /" w przeglądarce (np., [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Zauważ, że domyślnie, Twój Tomcat jest dostępny tylko przez Ciebie. Nie jest on publicznie dostępny.
  * Windows localhost:
    * Kliknij prawym przyciskiem myszy na ikonę Tomcat w tacce systemowej i wybierz "Start service".
    * Widok [http://127.0.0.1:8080/](http://127.0.0.1:8080/) albo może [http://localhost:8080/](http://localhost:8080/) W twojej przeglądarce. Zauważ, że domyślnie, Twój Tomcat jest dostępny tylko przez Ciebie. Nie jest on publicznie dostępny.

Powinieneś zobaczyć stronę Tomcat "Gratulacje".

Jeśli występują problemy, zobacz plik dziennika Tomcat na 'tomcat / logs / catalina.out'.

### Kłopoty z instalacją Tomcata?{#troubles-with-the-tomcat-installation} 

* Na Linuksie i Mac, jeśli nie możesz dotrzeć do Tomcat lub ERDDAP™   (a może po prostu nie możesz do nich dotrzeć z komputera na zewnątrz zapory) ,
można sprawdzić, czy Tomcat słucha portu 8080, wpisując (jako korzeń) na linii poleceń serwera:

  ```
  netstat -tuplen | grep 8080
  ```

To powinno zwrócić jedną linię z czymś takim:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (gdzie '#' jest jakąś cyfrą) , wskazując, że proces "java" (przypuszczalnie Tomcat) Słucha w porcie "8080" dla ruchu "tcp".
Jeśli nie zwrócono żadnych linii, jeśli zwrócona linia jest znacznie inna lub jeśli zwrócono dwie lub więcej linii, wtedy może być problem z ustawieniami portu.

* Patrz plik dziennika Tomcat 'tomcat / logs / catalina.out'. Problemy z kotem i niektóre ERDDAP™ Problemy związane z startupem są tam niemal zawsze wskazywane.
Jest to powszechne, gdy po raz pierwszy ustawiasz ERDDAP™ .

* Patrz [Kot](https://tomcat.apache.org/) strona internetowa lub wyszukać w sieci o pomoc, ale proszę dać nam znać problemy i rozwiązania, które znalazłeś.

* Zobacz nasze [rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support) .
             
###  ERDDAP™ Zawartość{#erddap-content} 
3.   [Konfiguracja plików konfiguracyjnych 'tomcat / content / erddap'.](#erddap-content) 
Na Linuksie, Mac i Windows, pobierz [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
i rozpiąć go do katalogu 'tomcat', tworząc 'tomcat / content / erddap'.

_ _ Wersja 1.0.0, 20333 bajtów, MD5 = 2B8D2A5AE5ED73A42B529C168C60B5, datowany 2024- 10- 14 _ BAR _

Niektóre poprzednie wersje są również dostępne:

    *  [2, 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 bajtów, MD5 = 8F892616BAEEF2DF0F4BB036DCB4AD7C, datowany 2022- 02- 16) 
    *  [2, 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 bajtów, MD5 = 8F892616BAEEF2DF0F4BB036DCB4AD7C, datowany 2022- 02- 16) 
    *  [2, 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 bajtów, MD5 = 1E26F62E7A06191E066868C40B9A29362, datowany na 2022- 10- 09) 
    *  [2, 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 bajtów, MD5 = 1E26F62E7A06191E066868C40B9A29362, datowany 2022- 12- 08) 
    *  [2, 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 bajtów, MD5 = 1E26F62E7A06191E066868C40B9A29362, datowany 2023- 02- 27) 

#### Inny katalog{#other-directory} 

Dla Red Hat Enterprise Linux (RHEL) lub w innych sytuacjach, w których nie można modyfikować katalogu Tomcat lub gdzie chcesz / potrzebujesz
umieścić ERDDAP™ katalog treści w innej lokalizacji z innego powodu (na przykład, jeśli używasz Jetty zamiast Tomcat) ,
unzip 'erddapContent .zip 'do pożądanego katalogu (do którego ma dostęp tylko użytkownik 'tomcat') i ustawić " erddapContentDirectory 'właściwość systemu
 (np. " erddapContentDirectory  =~tomcat/content/erddap ') Więc... ERDDAP™ może znaleźć ten nowy katalog treści.

### setup.xml{#setupxml} 

*  [Przeczytaj komentarze w 'tomcat / content / erddap / setup.xml'](#setupxml) i dokonać wymaganych zmian. setup.xml to plik ze wszystkimi ustawieniami, które określają jak Twój ERDDAP™ Zachowuje się.

Dla początkowego ustawienia, MUSI przynajmniej zmienić te ustawienia:
      * ' <bigParentDirectory> '
      * ' <emailEverythingTo> '
      * ' <baseUrl> '
      * ' <email...> 'ustawienia
      * ' <admin...> 'ustawienia
      * ' <baseHttpsUrl> ' (Kiedy się ustawisz https ) 

Po utworzeniu bigParentDirectory, z katalogu nadrzędnego bigParentDirectory:

    * Uczyń użytkownika 'tomcat' właścicielem 'bigParentDirectory':
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Zmień nazwę "grupy" na tomcat, nazwę użytkownika lub nazwę małej grupy, która zawiera Tomcat i wszystkich administratorów Tomcat / ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Zmień uprawnienia tak, aby Tomcat i grupa przeczytali, napisali, wykonywali uprawnienia:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Usuń "inne" uprawnienia użytkownika do odczytu, zapisu lub wykonania. Jest to ważne, aby zapobiec odczytywaniu potencjalnie wrażliwych informacji
w ERDDAP™ logowanie plików i plików z informacjami o prywatnych zbiorach danych.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Zmienne środowiskowe{#environment-variables} 

Począwszy od ERDDAP™ v2.13, ERDDAP™ administratorzy mogą nadpisać dowolną wartość w setup.xml poprzez podanie zmiennej środowiskowej
Nazwa " ERDDAP _ valueName 'przed uruchomieniem ERDDAP™ . Na przykład, użyj " ERDDAP _ baseUrl 'overrides the' <baseUrl> 'wartość.
To może być przydatne podczas rozmieszczania ERDDAP™ z pojemnikiem takim jak Docker, jak można umieścić standardowe ustawienia w setup.xml
a następnie dostarczają specjalne ustawienia za pomocą zmiennych środowiskowych. Jeśli dostarczysz tajne informacje ERDDAP™ za pomocą tej metody,
Upewnij się, że informacje pozostaną w tajemnicy. ERDDAP™ odczytuje zmienne środowiskowe tylko raz na startup,
w pierwszej sekundzie startup, więc jednym ze sposobów użycia jest: ustawić zmienne środowiskowe, uruchomić ERDDAP ,
Poczekaj aż ERDDAP™ jest uruchomiony, a następnie wyłączyć zmienne środowiskowe.

###  datasets.xml  {#datasetsxml} 

* Przeczytaj komentarze w [ **Współpraca z datasets.xml Plik** ](/docs/server-admin/datasets) . Później, jak już będziesz ERDDAP™ uruchomiony
po raz pierwszy (zazwyczaj tylko z domyślnymi zbiorami danych) , będziesz modyfikować XML w 'tomcat / content / erddap / datasets.xml '
aby określić wszystkie zestawy danych, które chcesz ERDDAP™ Służyć. Tutaj spędzisz większość czasu
podczas ustawiania ERDDAP™ i później, zachowując swoje ERDDAP™ .

Możesz zobaczyć przykład [ datasets.xml w sprawie GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Nieprawdopodobne) Teraz lub (nieco bardziej prawdopodobne) w przyszłości, jeśli chcesz zmodyfikować plik CSS erddap, kopiuj
"tomcat / content / erddap / images / erddapStart2.css" to "tomcat / content / erddap / images / erddap2.css", a następnie wprowadza zmiany.
Zmiany 'erddap2.css' stają się skuteczne tylko wtedy, gdy ERDDAP™ jest ponownie uruchomiony i często wymaga od użytkownika, aby wyczyścił pliki buforowane przeglądarki.
     
 ERDDAP™ nie działa prawidłowo, jeśli setup.xml lub datasets.xml plik nie jest dobrze uformowanym plikiem XML. Więc po edycji tych plików,
dobrym pomysłem jest sprawdzenie, czy wynik jest dobrze ukształtowany XML poprzez wklejanie tekstu XML do sprawdzania XML jak [xmlwalidation](https://www.xmlvalidation.com/) .
     
### Zainstaluj erddap. akta wojenne{#install-the-erddapwar-file} 

4. Na Linuksie, Mac i Windows, _ _ download [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war) _ _ into 'tomcat / webapps':

_ _ Wersja 2.28.0, 620,824,288 bajtów, MD5 = f948b2ba603f65a83ac67af43da9e4c2, datowany 2025- 08- 29 _ _

Plik .war jest duży, ponieważ zawiera wysoką rozdzielczość linii brzegowej, granicy i danych elewacji potrzebnych do tworzenia map.

Niektóre poprzednie wersje są również dostępne.

   *  [2, 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 bajtów, MD5 = 5FEA912B5D42E50EAB9591F773EA848D, datowany 2022- 02- 16) 
   *  [2, 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 bajtów, MD5 = 461325E97E7577EC671DD50246CCFB8B, datowany 2022- 02- 23) 
   *  [2, 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 bajtów, MD5 = F2CFF805893146E932E498FDDBD519B6, datowany 2022- 10- 09) 
   *  [2, 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 bajtów, MD5 = 2B33354F633294213AE2AFDDCF4DA6D0, datowany 2022- 12- 08) 
   *  [2, 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 bajtów, MD5 = D843A043C506725EBD6F8EFDCCA8FD5F, datowany 2023- 03- 03) 
   *  [2, 24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 bajtów, MD5 = 970fbee172e28b0b8a07756eecbc898e, datowany 2024- 06- 07) 
   *  [2, 25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 bajtów, MD5 = 652AFC9D1421F00B5F789DA2C4732D4C, datowany 2024- 11- 07) 
   *  [2, 26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 bajtów, MD5 = 99a725108b37708e5420986c1616a119, datowany 2025- 03- 31) 
   *  [2, 27, 0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 bajtów, MD5 = 3b2086c659eee4145ca2dff447bf4ef7, datowany 2025- 06- 11) 

### Konfiguracja proxy (szczególne zastosowanie)  {#proxy} 

 ERDDAP™ jest zazwyczaj stosowany za serwerem webserver reverse proxy, aby umożliwić jego obsługę w standardowych portach HTTP (80 i 443) .
Rozwiązanie SSL / TLS jest często przekazywane także w warstwie proxy serwera webserver. Specyfikacje zależą od wymogów każdego rozmieszczania.

#### Apache{#apache} 

1. Upewnij się, że 'mod _ proxy' i 'mod _ proxy _ http "są załadowane:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Zmiana istniejącego " <VirtualHost> 'tag (jeśli istnieje) lub dodać jeden na końcu pliku:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Jeśli ERDDAP™ jest obsługiwany na ścieżce innej niż '/ erddap', także ustawić nagłówek 'X- Forwarded- Prefix' do nagłówka
path segment _ before _ '/ erddap'. Ustawienie to byłoby właściwe dla ERDDAP™ w
"/ subpath / erddap":

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Następnie uruchom ponownie Apache: '/ usr / sbin / apachectl -k graceful' (ale czasami jest w innym katalogu) .
         
#### NGINX{#nginx} 

W pliku konfiguracyjnym nginx ustaw nagłówki:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Jeśli ERDDAP™ jest obsługiwany na ścieżce innej niż '/ erddap', także ustawić nagłówek 'X- Forwarded- Prefix' do nagłówka
path segment _ before _ '/ erddap'. Ustawienie to byłoby właściwe dla ERDDAP™ w
"/ subpath / erddap":

```
proxy_set_header X-Forwarded-Prefix /subpath
```


W celu uzyskania NGINX i ERDDAP™ działa prawidłowo z https , należy umieścić następujący fragment wewnątrz Tomcat server.xml " <Host> "blok:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Uruchom Tomcat{#start-tomcat} 

*  (Nie polecam korzystania z Tomcat Web Application Manager. Jeśli nie wyłączysz i nie uruchomisz Tomcat, prędzej czy później będziesz miał problemy z pamięcią PermGen.) 
*  (W systemie Linux lub Mac OS, jeśli stworzyłeś specjalnego użytkownika, aby uruchomić Tomcat, np. Tomcat, pamiętaj, aby wykonać następujące kroki jako ten użytkownik.) 
* Jeśli Tomcat już biegnie, zamknij Tomcat z (w systemie Linux lub Mac OS) 'tomcat / bin / shutdown.'
lub (w systemie Windows) 'tomcat\\ bin\\ shutdown.bat '

Na Linuksie użyj 'ps-ef | grep tomcat 'przed i po' shutdown.sh 'aby upewnić się, że proces tomcat się zatrzymał.
Proces ten powinien być wymieniony przed zamknięciem i ostatecznie niewymieniony po wyłączeniu.
To może zająć minutę lub dwie na ERDDAP™ do całkowitego wyłączenia. Cierpliwości. Albo jeśli wygląda na to, że nie zatrzyma się sam, użyj:
"zabić -9 <processID> '
* Uruchom Tomcat z (w systemie Linux lub Mac OS) "tomcat / bin / startup.sh" lub (w systemie Windows) 'tomcat\\ bin\\ startup.bat'

## Czy ERDDAP™ Bieganie?{#is-erddap-running} 

Użyj przeglądarki, aby spróbować wyświetlićhttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ startuje bez wczytywanych zbiorów danych. Zestawy danych są wczytywane w tle i dlatego stają się dostępne jeden-by-jeden.

### Rozwiązywanie problemów{#troubleshooting} 

* Kiedy pojawia się prośba od użytkownika, idzie do Apache (na komputerach Linux i Mac OS) A potem Tomcat. ERDDAP™ .
* You can see what comes to Apache (i powiązane błędy) w plikach dziennika Apache.
*    [Ty](/docs/server-admin/additional-information#tomcat-logs) może zobaczyć, co przychodzi do Tomcat (i powiązane błędy) 
w plikach dziennika Tomcat ("tomcat / logs / catalina.out" i inne pliki w tym katalogu) .
*    [Ty](/docs/server-admin/additional-information#log) może zobaczyć, co przychodzi do ERDDAP , wiadomości diagnostyczne z ERDDAP ,
i komunikaty błędów z ERDDAP , w ERDDAP™ ' <bigParentDirectory> / logs / log.txt 'file.
* Tomcat nie zaczyna ERDDAP™ dopóki Tomcat nie otrzyma wniosku o ERDDAP™ . Więc można zobaczyć w plikach Tomcat log, jeśli
rozpoczęte ERDDAP™ lub jeżeli istnieje komunikat błędu związany z tą próbą.
* Kiedy ERDDAP™ zaczyna się, zmienia nazwę starego ERDDAP™ plik log.txt ("logArchived W <CurrentTime> .txt ") i tworzy nowy plik log.txt.
Więc jeśli plik 'log.txt' jest stary, jest to znak, że ERDDAP™ Ostatnio nie zaczął od nowa. ERDDAP™ zapisuje informacje dziennika do bufora
i tylko zapisuje bufor do pliku dziennika okresowo, ale można wymusić ERDDAP™ zapisanie bufora do pliku dziennika przez odwiedzenie
' /erddap/status.html '.

### Problem: Stara wersja Java  {#trouble-old-version-of-java} 

Jeśli używasz wersji Java To za stare na ERDDAP , ERDDAP™ nie uruchomi i zobaczysz komunikat błędu w pliku dziennika Tomcat jak

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

Rozwiązaniem jest aktualizacja do najnowszej wersji Java i upewnij się, że Tomcat go używa.

### Kłopot: Slow Startup Pierwszy raz{#trouble-slow-startup-first-time} 

Tomcat musi zrobić dużo pracy za pierwszym razem aplikacji jak ERDDAP™ został uruchomiony; w szczególności, musi rozpakować plik 'erddap.war'
 (co jest jak .zip plik) . Na niektórych serwerach, pierwsza próba oglądania ERDDAP™ stragany (30 sekund?) Dopóki ta praca się nie skończy.
Na innych serwerach pierwsza próba zakończy się natychmiast. Ale jeśli poczekasz 30 sekund i spróbujesz jeszcze raz, to się uda, jeśli ERDDAP™ został prawidłowo zainstalowany.

Nie da się tego naprawić. Tak po prostu działa Tomcat. Ale pojawia się dopiero po zainstalowaniu nowej wersji ERDDAP™ .

## Wyłącz i uruchom ponownie{#shut-down-and-restart} 

W przyszłości, zamknąć (i ponownie uruchomić)   ERDDAP™ , see [Jak zamknąć i przywrócić Tomcat i ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Kłopoty?{#trouble} 

Kłopoty z instalacją Tomcat lub ERDDAP™ ? Zobacz nasze [rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support) .

## Powiadomienie e-mail nowych wersji ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Jeśli chcesz otrzymywać e-mail kiedy nowa wersja ERDDAP™ jest dostępny lub inne ważne ERDDAP™ ogłoszenia,
możesz dołączyć do ERDDAP™ Lista ogłoszeń [Tutaj](https://groups.google.com/g/erddap-announce) . Ta lista zawiera średnio jeden e-mail co trzy miesiące.

## Dostosuj{#customize} 

*  [Dostosuj ERDDAP™ aby podkreślić swoją organizację (nie NOAA   ERD ) .](#customize) 
* Zmień baner, który pojawia się na górze wszystkich ERDDAP™ .html strony przez edycję ' <startBodyHtml5> 'tag in your' datasets.xml 'plik.
(Jeśli nie ma żadnego, skopiuj domyślną wartość z ERDDAP™ 'tomcat / webapps / erddap / WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml" plik
do ' datasets.xml 'i edytować.) Na przykład:
  * Użyj innego obrazu (np. logo Twojej organizacji) .
  * Zmień kolor tła.
  * Zmiana " ERDDAP™ "to" _ YourOrganization _ 's ERDDAP™ "
  * Zmień "łatwiejszy dostęp do danych naukowych" na "łatwiejszy dostęp do danych _ YourOrganization _ '".
  * Zmień odnośniki "Sprowadzony do Ciebie przez", aby być linkami do organizacji i źródeł finansowania.
* Zmiana informacji po lewej stronie strony głównej poprzez edycję ' <theShortDescriptionHtml> 'tag in your' datasets.xml 'plik.
(Jeśli nie ma żadnego, skopiuj domyślną wartość z ERDDAP™ 'tomcat / webapps / erddap / WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml" plik
do ' datasets.xml 'i edytować.) Na przykład:
  * Opisz, co robi twoja organizacja i / lub grupa.
  * Opisz jaki rodzaj danych to ERDDAP™ Tak.
  * Aby zmienić ikonę, która pojawia się na zakładkach przeglądarki, umieść favicon Twojej organizacji. ico in 'tomcat / content / erddap / images / ".
Patrzhttps://en.wikipedia.org/wiki/Favicon.
