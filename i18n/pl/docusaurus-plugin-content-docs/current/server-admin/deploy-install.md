---
sidebar_position: 1
---

# Instalacja
Jak zrobić wstępne ustawienieERDDAP™na serwerze


ERDDAP™może działać na dowolnym serwerze, który obsługujeJavai Tomcat (i innych serwerów aplikacji takich jak Jetty, ale ich nie wspieramy) .ERDDAP™został przetestowany na Linuksie (w tym na AWS Amazona) komputerów Mac i Windows.

*    **Amazon** -- W przypadku instalacjiERDDAP™na przykładzie Amazon Web Services EC2, zobacz to[Amazon Web Services Przegląd](/docs/server-admin/additional-information#amazon)Najpierw.
*    **Docker** -- Axiom teraz oferuje[ERDDAP™w pojemniku Docker](https://hub.docker.com/u/axiom/)i IOOS oferuje teraz[Szybki przewodnik startowy dlaERDDAP™w kontenerze dokującym](https://ioos.github.io/erddap-gold-standard/index.html).
Taki jest standard.ERDDAP™Instalacja, ale Axiom umieścił ją w pojemniku.
Jeśli już używasz Docker, prawdopodobnie wolisz wersję Docker.
Jeśli nie używasz Dockera, zazwyczaj nie zalecamy tego.
Jeśli wybrałeś zainstalowaćERDDAP™przez Docker, nie oferujemy żadnego wsparcia dla procesu instalacji.
Nie pracowaliśmy jeszcze z Dockerem. Jeśli z tym współpracujesz, wyślij nam swoje uwagi.
*    **Linux i Mac** --ERDDAP™działa świetnie na komputerach Linux i Mac. Patrz instrukcja poniżej.
*    **Okna** -- Okna są dobre do testowaniaERDDAP™oraz do użytku osobistego (Zob. instrukcje poniżej.) , ale nie zalecamy używania go publicznieERDDAPb. UruchomienieERDDAP™w sprawie systemu Windows mogą mieć problemy: w szczególności,ERDDAP™może nie być w stanie szybko usunąć i / lub zmienić nazwy plików. To prawdopodobnie z powodu oprogramowania antywirusowego (np. z McAfee i Norton) czyli sprawdzanie plików pod kątem wirusów. Jeśli wpadniesz na ten problem (które mogą być widoczne przez komunikaty błędów w[log.txt](/docs/server-admin/additional-information#log)plik jak "Nie można usunąć"...) , zmiana ustawień oprogramowania antywirusowego może częściowo złagodzić problem. Albo rozważyć użycie serwera Linux lub Mac zamiast.

 **NormaERDDAP™instrukcje instalacji dla komputerów Linux, Mac i Windows to:** 

0. Upewnij się, że wszystkie zależności są zainstalowane. Na maszynach innych niż Windows (Linux i Mac) Potrzebujesz CSH.
## Java {#java} 
1.  [DlaERDDAP™v2.19 +, skonfigurowaneJava21.](#java)
Ze względów bezpieczeństwa, prawie zawsze najlepiej jest użyć najnowszej wersjiJava21.
Proszę pobrać i zainstalować najnowszą wersję
    [OpenJDK Adoptium (Temuryna) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21). Aby zweryfikować instalację, wpisz "/ _ javaJreBinDirectory _ / java -version", na przykład
/ usr / local / jdk- 21.0.3 + 9 / jre / bin / java - wersja
    
    ERDDAP™zJavaz innych źródeł, ale zalecamy Adoptium, ponieważ jest głównym, wspieranym przez społeczność, za darmo (jak w piwie i mowie) wersjaJava21, który oferuje długoterminowe wsparcie (darmowe aktualizacje przez wiele lat po wydaniu początkowym) . Ze względów bezpieczeństwa, prosimy o aktualizacjęERDDAPWersjaJavaokresowo jako nowe wersjeJavaLek Adoptium dostępny jest w postaci 21 tabletek.
    
    ERDDAP™został przetestowany i szeroko stosowany z 21, a nie inne wersje. Z różnych powodów, nie testujemy z lub wspierać inne wersjeJava.
     
## Tomcat{#tomcat} 
2.  [Ustaw](#tomcat) [Tomcat](https://tomcat.apache.org).
Tomcat jest najczęściej używaneJavaSerwer aplikacjiJavaoprogramowanie, które stoi pomiędzy usługami sieciowymi systemu operacyjnego iJavaoprogramowanie serwera jakERDDAP™. To jest wolne i otwarte oprogramowanie źródłowe (FOSS) .
    
Możesz użyć innego.JavaSerwer aplikacji (np. Jetty) Ale my tylko sprawdzamy i wspieramy Tomcata.
     
    
    * Pobierz Tomcat i rozpakuj go na serwerze lub komputerze.
Ze względów bezpieczeństwa, prawie zawsze najlepiej jest użyć najnowszej wersji Tomcat 10 (Wersja 9 i poniżej są niedopuszczalne) który jest przeznaczony do pracy zJava21 lub nowsze. Poniżej katalog Tomcat będzie określany jako _ tomcat _.
        
Uwaga&#33; Jeśli masz już Tomcat uruchomiony jakiś inny aplikacji internetowej (zwłaszcza TRREDDS) , zalecamy zainstalowaćERDDAP™w[a drugi Tomcat](/docs/server-admin/additional-information#second-tomcat), ponieważERDDAP™potrzebuje różnych ustawień Tomcat i nie powinien mieć do czynienia z innymi aplikacjami pamięci.
        
        * Na Linuksie,[Pobierz "Core" "tar.gz"Dystrybucja Tomcat](https://tomcat.apache.org/download-10.cgi)i rozpakować. Zalecamy rozpakowanie go w / usr / lokalne.
        * Na komputerze Mac, Tomcat jest prawdopodobnie już zainstalowany w / Biblioteka / Tomcat, ale powinien zaktualizować go do najnowszej wersji Tomcat 10.
Jeśli go ściągniesz,[Pobierz "Core" "tar.gz"Dystrybucja Tomcat](https://tomcat.apache.org/download-10.cgi)i rozpakować go w / Biblioteka / Tomcat.
        * W systemie Windows możesz[Pobierz dystrybucję "Core" "zip" Tomcat](https://tomcat.apache.org/download-10.cgi)  (który nie zadziera z rejestrem systemu Windows i który kontrolujesz z linii poleceń DOS) i rozpakować go w odpowiednim katalogu. (Dla rozwoju używamy dystrybucji "Core" "zip". Tworzymy katalog / programów i rozpakowujemy go tam.) Możesz też pobrać dystrybucję "Core" "64- bit Windows zip", która zawiera więcej funkcji. Jeśli dystrybucja jest instalatorem systemu Windows, prawdopodobnie wniesie Tomcat na przykład / Pliki programu / apache- tomcat- 10.0.23.
             
### server.xml{#serverxml} 
*   [server.xml](#serverxml)- In _ tomcat _ / conf / server.xml file, there are two changes that you should make to each of the two&lt;Złącze & gt; tagi - jeden dla
```
        <Connector port="8080" 
```
i jeden dla
```
        <Conector port="8443"
```
    1.   (Zalecane) Zwiększ wartość parametru connectionTimeout do 300000 (milisekundy)   (co jest 5 minut) .
    2.   (Zalecane) Dodaj nowy parametr: relaxedQueryChars = "\\[\\]|"Jest to opcjonalne i nieco mniej bezpieczne, ale usuwa potrzebę dla użytkowników do zaszyfrowania tych znaków, gdy występują w parametrach adresu URL użytkownika.
             
### content.xml{#contentxml} 
* context.xml -- Zasoby Cache - In _ tomcat _ / conf / context.xml, tuż przed&lt;/ Context & gt; tag, zmień znacznik Surowców (lub dodać go, jeśli nie jest jeszcze tam) do ustawienia pamięci podręcznej Parametr MaxSize do 80000:
    &lt;Zasoby CachingAllowed = "true" cacheMaxSize = "80000" / & gt;
Unika to licznych ostrzeżeń w katalinie. że wszystko zaczyna się od
"OSTRZEŻENIE\\[główny\\]org.apache.catalina.webresources.Cache.getResource Nie można dodać zasobu\\[/ WEB- INF / klasy /...] "
         
### Czas Apache{#apache-timeout} 
* Na komputerach Linuksa zmienić ustawienia czasu Apache tak, aby czasochłonne żądania użytkownika nie timeout (co często pojawia się jako błąd "Proxy" lub "Bad Gateway") . Jako użytkownik root:
    1. Modyfikuj ApachehttpPlik d.conf (zazwyczaj w / etc /httpd / conf /) :
Zmiana istniejącego&lt;Ustawienia timeout & gt; (lub dodać jeden na końcu pliku) Do 3600 (sekund) , zamiast domyślnej 60 lub 120 sekund.
Zmiana istniejącego&lt;Ustawienie proxyTimeout & gt; (lub dodać jeden na końcu pliku) Do 3600 (sekund) , zamiast domyślnej 60 lub 120 sekund.
    2. Przywróć Apache: / usr / sbin / apachectl -k graceful (ale czasami jest w innym katalogu) .
             
    * Zalecenie bezpieczeństwa: Patrz[instrukcje](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)zwiększenie bezpieczeństwa instalacji Tomcat, szczególnie dla serwerów publicznych.
         
    * Dla publicznościERDDAP™Instalacje na Linuksie i Macsie, najlepiej skonfigurować Tomcat (program) jako należące do użytkownika "tomcat" (oddzielnego użytkownika z ograniczonymi uprawnieniami i który[nie ma hasła](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) . Tak więc, tylko super użytkownik może przełączyć się do działania jako tombot użytkownika. To sprawia, że hakerzy nie mogą zalogować się na serwer jako tombot użytkownika. I w każdym razie, należy zrobić tak, że użytkownik tomcat ma bardzo ograniczone uprawnienia w systemie plików serwera (przeczytaj + write + execute przywileje dla drzewa katalogu apache- tomcat i&lt;bigParentDirectory & gt; i tylko read- dla katalogów z danymi, któreERDDAP™wymaga dostępu do).
        * Możesz utworzyć konto użytkownika Tomcat (który nie ma hasła) za pomocą polecenia
sudo useradd tomcat -s / bin / bash -p '\\ *'
        * Możesz przejść do pracy jako tomcat użytkownika za pomocą polecenia
sudo su - tomcat
             (Poprosi o hasło do superausera, aby uzyskać na to pozwolenie.) 
        * Możesz przestać pracować jako tomcat użytkownika za pomocą polecenia
wyjście
        * Zrób większość reszty Tomcat iERDDAP™instrukcja konfiguracji jako użytkownik "tomcat". Później uruchom skrypty startup.sh i shutdown.sh jako użytkownika "tomcat" tak, że Tomcat ma pozwolenie na pisanie do swoich plików dziennika.
        * Po rozpakowaniu Tomcat, od rodzica katalogu apache- tomcat:
            
            * Zmień właściciela drzewa katalogowego apache- tomcat na użytkownika tomcat.
chown -R tomcat apache- tomcat- _ 10.0.23 _
                 (ale zastąpić rzeczywistą nazwę katalogu tomcat) .
            * Zmień nazwę "grupy" na tomcat, nazwę użytkownika lub nazwę małej grupy, która zawiera Tomcat i wszystkich administratorów Tomcat /ERDDAP, np.,
chgrp -R _ your UserName _ apache- tomcat- _ 10.0.23 _
            * Zmień uprawnienia tak, aby tomcat i grupa mieli odczyt, zapis, wykonywanie uprawnień, np,.
chmod -R ug + rwx apache- tomcat- _ 10.0.23 _
            * Usuń "inne" uprawnienia użytkownika do odczytu, zapisu lub wykonania:
chmod -R o- rwx apache- tomcat- _ 10.0.23 _
Jest to ważne, ponieważ uniemożliwia innym użytkownikom odczytywanie potencjalnie wrażliwych informacji wERDDAP™konfiguracja plików.
            
              
### Pamięć{#memory} 
* Ustaw zmienne środowiska Tomcat
    
Na Linuksie i Makach:
Utwórz plik _ tomcat _ / bin / setenv.sh (lub w Red Hat Enterprise Linux\\[RHEL\\], edit ~ tomcat / conf / tomcat10.conf) aby ustawić zmienne środowiska Tomcat. Plik zostanie użyty przez _ tomcat _ / bin / startp.sh i shutdown.sh. Plik powinien zawierać coś w rodzaju:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (ale podmień nazwy katalogów z komputera) .
 (Jeśli wcześniej ustawiono JRE\\ _ HOME, można to usunąć.)   
Na Macs, prawdopodobnie nie trzeba ustawić JAVA _ HOME.

W systemie Windows:
Utwórz plik _ tomcat _\\ bin\\ setenv.bat, aby ustawić zmienne środowiska Tomcat. Ten plik zostanie użyty przez _ tomcat _\\ bin\\ startup.bat ishutdown.bat. Plik powinien zawierać coś w rodzaju:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (ale podmień nazwy katalogów z komputera) .
Jeśli jest tylko do lokalnych testów, usuń "-server".
 (Jeśli wcześniej ustawiono JRE\\ _ HOME, można to usunąć.) 

Ustawienia pamięci -Xmx i -Xms są ważne, ponieważERDDAP™działa lepiej z większą pamięcią. Zawsze ustaw -Xms do tej samej wartości co -Xmx.

* Dla 32-bitowych systemów operacyjnych i 32-bitowychJava:
64 bityJavajest o wiele lepszy niż 32 bitJava, ale 32 bitJavabędzie działać tak długo, jak serwer nie jest naprawdę zajęty. Im więcej fizycznej pamięci na serwerze, tym lepiej: 4 + GB jest naprawdę dobry, 2 GB jest w porządku, mniej nie jest zalecane. Z 32 bitamiJava, nawet z obfitej pamięci fizycznej, Tomcat iJavanie uruchomi jeśli spróbujesz ustawić -Xmx znacznie powyżej 1500M (1200M na niektórych komputerach) . Jeśli Twój serwer ma mniej niż 2GB pamięci, zmniejsz wartość -Xmx (in 'M' egaBytes) do 1 / 2 fizycznej pamięci komputera.
* Dla 64-bitowych systemów operacyjnych i 64-bitowychJava:
64 bityJavadziała tylko na 64-bitowym systemie operacyjnym.
    
    * ZJava8, musisz dodać\\ -d64 do parametru Tomcat CATALINA\\ _ OPTS w setenv.bat
    * ZJava21, wybierasz 64 bityJavapo pobraniu wersjiJavaoznaczone "64 bit".
    
Z 64 bitamiJava, Tomcat iJavamoże używać bardzo wysokich ustawień -Xmx i -Xms. Im więcej fizycznej pamięci na serwerze, tym lepiej. Jako uproszczona sugestia: zalecamy ustawienie -Xmx i -Xms (in 'M' egaBytes) do 1 / 2 (lub mniej) fizycznej pamięci komputera. Możesz zobaczyć, czy Tomcat,JavaorazERDDAP™rzeczywiście działają w trybie 64 bit przez wyszukiwanie "bit", wERDDAP's Daily Report email lub in the _ bigParentDirectory _ / logs /[log.txt](/docs/server-admin/additional-information#log)plik (_ bigParentDirectory _ jest określony w[setup.xml](#setupxml)) .
#### Kolekcja śmieci{#garbage-collection} 
* WERDDAP™jest[log.txt](/docs/server-admin/additional-information#log)plik, zobaczysz wiele "GC (Niepowodzenie przydziału) "wiadomości.
Zazwyczaj nie jest to problem. Jest to częste przesłanie z normalnie działającychJavamówiąc, że właśnie skończył małą kolekcję śmieci, ponieważ zabrakło miejsca w Eden (SekcjaJavasterta dla bardzo młodych obiektów) . Zazwyczaj wiadomość pokazuje _ memoryUseBefore _\\ - & gt; _ memoryUseAfter _. Jeśli te dwie liczby są blisko siebie, oznacza to, że zbiórka śmieci nie była produktywna. Wiadomość jest tylko oznaką kłopotów, jeśli jest bardzo często (co kilka sekund) , nieproduktywne, a liczby są duże i nie rośnie, które razem wskazują, żeJavapotrzebuje więcej pamięci, walczy o uwolnienie pamięci, i nie jest w stanie uwolnić pamięci. To może się zdarzyć w stresującym czasie, a następnie odejść. Ale jeśli trwa, to jest oznaką kłopotów.
* Jeśli widzisz java.lang.OutOfMemoryError jest wERDDAP™jest[log.txt](/docs/server-admin/additional-information#log)plik, patrz[Błąd OutOfMemoryError](/docs/server-admin/additional-information#outofmemoryerror)wskazówki dotyczące diagnozowania i rozwiązywania problemów.
         
### Uprawnienia{#permissions} 
*   [Na Linuksie i Makach, zmień uprawnienia](#permissions)wszystkich\\*.shpliki w _ tomcat _ / bin / do wykonania przez właściciela, np. z
```
    chmod +x \\*.sh  
```
### Czcionki{#fonts} 
*   [Czcionki obrazów:](#fonts)Zdecydowanie wolimy wolność.[Czcionki DejaVu](https://dejavu-fonts.github.io/)do innychJavaczcionki. Korzystanie z tych czcionek jest zdecydowanie zalecane, ale nie jest wymagane.
    
Jeśli zdecydujesz się nie używać czcionek DejaVu, musisz zmienić ustawienia fontFamily w setup.xml na&lt;fontFamily & gt; SansSerif&lt;/ fontFamily & gt;, który jest dostępny ze wszystkimiJavadystrybucji. Jeśli ustawisz fontFamily na nazwę czcionki, która nie jest dostępna,ERDDAP™nie wczyta i wydrukuje listę dostępnych czcionek w pliku log.txt. Musisz użyć jednej z tych czcionek.
    
Jeśli zdecydujesz się użyć czcionek DejaVu, upewnij się, że ustawienie fontFamily w setup.xml jest&lt;font Rodzina & gt; DejaVu Sans&lt;/ fontFamily & gt;.
    
Aby zainstalować czcionki DejaVu, pobierz[DejaVuFonts.zip](/DejaVuFonts.zip)  (5,522,795 bajtów, MD5 = 33E1E61FAB06A547851ED308B4FFEF42) i rozpakować pliki czcionek do tymczasowego katalogu.
    
    * W Linux:
        * Dla Adoptium LinuksaJavadystrybucje, patrz[instrukcje](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/).
        * Z innymiJavadystrybucje: Jako użytkownik Tomcat skopiuj pliki czcionek do _ JAVA\\ _ HOME _ / lib / fonts takJavamoże znaleźć czcionki. Pamiętaj: jeśli / kiedy później uaktualnisz do nowszej wersjiJava, musisz ponownie zainstalować te czcionki.
    * Na komputerach: dla każdego pliku czcionki kliknij dwukrotnie, a następnie zainstaluj czcionkę.
    * Na Windows 7 i 10: w Windows Explorer wybierz wszystkie pliki czcionek. Prawe kliknięcie. Kliknij na Install.
             
### Test Tomcat{#test-tomcat} 
* Sprawdź instalację Tomcat.
    * Linux:
        * Jako użytkownik "tomcat", run _ tomcat _ / bin / startup.sh
        * Zobacz swój adres URL + ": 8080 /" w przeglądarce (np.,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) .
        * Powinieneś zobaczyć stronę Tomcat "Gratulacje".
Jeśli występują problemy, zobacz plik dziennika Tomcat _ tomcat _ / logs / catalina.out.
    * Mac (uruchom tomcat jako użytkownik administratora systemu) :
        * Run _ tomcat _ / bin / startup.sh
        * Zobacz swój adres URL + ": 8080 /" w przeglądarce (np.,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) . Pamiętaj, że domyślnie, Twój Tomcat jest dostępny tylko przez Ciebie. Nie jest on publicznie dostępny.
        * Powinieneś zobaczyć stronę Tomcat "Gratulacje".
Jeśli występują problemy, zobacz plik dziennika Tomcat _ tomcat _ / logs / catalina.out.
    * Windows localhost:
        
        * Kliknij prawym przyciskiem myszy na ikonę Tomcat w tacce systemowej i wybierz "Start service".
        * Widok[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/)albo może[ http://localhost:8080/ ](http://localhost:8080/), w twojej przeglądarce. Pamiętaj, że domyślnie, Twój Tomcat jest dostępny tylko przez Ciebie. Nie jest on publicznie dostępny.
        * Powinieneś zobaczyć stronę Tomcat "Gratulacje".
Jeśli występują problemy, zobacz plik dziennika Tomcat _ tomcat _ / logs / catalina.out.
            
### Kłopoty z instalacją Tomcata?{#troubles-with-the-tomcat-installation} 
* Na Linuksie i Mac, jeśli nie możesz dotrzeć do Tomcat lubERDDAP™  (a może po prostu nie możesz do nich dotrzeć z komputera na zewnątrz zapory) , można sprawdzić, czy Tomcat słucha portu 8080, wpisując (jako korzeń) na linii poleceń serwera:
```  
    netstat -tuplen | grep 8080  
```
To powinno zwrócić jedną linię z czymś takim:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     (gdzie '#' jest jakąś cyfrą) , wskazując, że proces "java" (Prawdopodobnie Tomcat) Słucha w porcie "8080" dla ruchu "tcp". Jeśli nie zwrócono żadnych linii, jeśli linia jest znacznie inna, lub jeśli zwrócono dwie lub więcej linii, wtedy może być problem z ustawieniami portu.
* Patrz plik dziennika Tomcat _ tomcat _ / logs / catalina.out. Problemy z Tomcat i niektóreERDDAP™Problemy związane z startupem są tam niemal zawsze wskazywane. Jest to powszechne, gdy po raz pierwszy ustawiaszERDDAP™.
* Patrz[Tomcat](https://tomcat.apache.org/)strona internetowa lub wyszukać w sieci pomocy, ale proszę dać nam znać problemy i rozwiązania, które znalazłeś.
* Zobacz[rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support).
             
### ERDDAP™Zawartość{#erddap-content} 
3.  [Ustaw_tomcat_/content/erddappliki konfiguracyjne.](#erddap-content)  
Na Linuksie, Mac i Windows, pobierz[erddapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (wersja 1.0.0, 20333 bajtów, MD5 = 2B8D2A5AE5ED73E3A42B529C168C60B5, datowany 2024- 10- 14) and unzip it into _ tomcat _, creating_tomcat_/content/erddap.

    \\[Niektóre poprzednie wersje są również dostępne:
    [2, 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19,792 bajtów, MD5 = 8F892616BAEEF2DF0F4BB036DCB4AD7C, datowany 2022- 02- 16)   
    [2, 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19,792 bajtów, MD5 = 8F892616BAEEF2DF0F4BB036DCB4AD7C, datowany 2022- 02- 16)   
    [2, 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19,810 bajtów, MD5 = 1E26F62E7A06191E0668C40B9A29362 z 2022- 10- 09)   
    [2, 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19,810 bajtów, MD5 = 1E26F62E7A06191E0668C40B9A29362 z 2022- 12- 08) 
    [2, 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19,810 bajtów, MD5 = 1E26F62E7A06191EE6868C40B9A29362, datowany na 2023- 02- 27) 
and unzip it into _ tomcat _, creating_tomcat_/content/erddap.\\]
    
#### Inny katalog{#other-directory} 
Dla Red Hat Enterprise Linux (RHEL) lub w innych sytuacjach, w których nie można modyfikować katalogu Tomcat lub gdzie chcesz / musisz umieścićERDDAP™katalog treści w innej lokalizacji z jakiegoś innego powodu (na przykład, jeśli używasz Jetty zamiast Tomcat) , unzip erddapContent.zipdo pożądanego katalogu (do którego ma dostęp tylko użytkownik = tomcat) i ustawićerddapContentDirectorywłaściwość systemu (np.,erddapContentDirectory=~tomcat/content/erddap) więcERDDAP™może znaleźć nowy katalog treści.
    
### setup.xml{#setupxml} 
*   [Przeczytaj komentarze w_tomcat_/content/erddap/ **setup.xml** ](#setupxml)i wprowadzić wymagane zmiany. setup.xml jest plikiem ze wszystkimi ustawieniami, które określają jak TwójERDDAP™Zachowuje się.
Dla początkowego ustawienia, MUSI przynajmniej zmienić te ustawienia:
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
Po utworzeniu bigParentDirectory, z katalogu nadrzędnego bigParentDirectory:
    
    * Zmień użytkownika = tomcat właściciela BigParentDirectory, np.,
```
        chown -R tomcat _bigParentDirectory_
```
    * Zmień nazwę "grupy" na tomcat, nazwę użytkownika lub nazwę małej grupy, która zawiera Tomcat i wszystkich administratorów Tomcat /ERDDAP, np.,
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * Zmień uprawnienia tak, aby tomcat i grupa mieli odczyt, zapis, wykonywanie uprawnień, np,.
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * Usuń "inne" uprawnienia użytkownika do odczytu, zapisu lub wykonania. Jest to ważne, aby zapobiec odczytywaniu potencjalnie wrażliwych informacji wERDDAP™logowanie plików i plików z informacjami o prywatnych zbiorach danych.:
```
        chmod -R o-rwx _bigParentDirectory_
```

### Zmienne środowiska{#environment-variables} 
Począwszy odERDDAP™v2.13,ERDDAP™administratorzy mogą nadpisać dowolną wartość w setup.xml poprzez podanie zmiennej środowiskowej o nazwieERDDAP\\ _ _ valueName _ przed uruchomieniemERDDAP™. Na przykład, używaćERDDAP\\ _ baseUrl nadjeżdża&lt;baseUrl & gt; wartość. To może być przydatne podczas rozmieszczaniaERDDAP™z pojemnikiem takim jak Docker, ponieważ można umieścić standardowe ustawienia w setup.xml, a następnie dostarczyć specjalne ustawienia za pomocą zmiennych środowiskowych. Jeśli dostarczysz tajne informacjeERDDAP™za pomocą tej metody, upewnij się, że informacje pozostaną tajne.ERDDAP™Tylko raz odczytuje zmienne środowiskowe na startup, w pierwszej sekundzie startup, więc jednym ze sposobów użycia jest: ustawić zmienne środowiskowe, uruchomićERDDAP, czekaj ażERDDAP™jest uruchomiony, a następnie wyłączyć zmienne środowiskowe.
    
### datasets.xml {#datasetsxml} 
* Przeczytaj komentarze w[ **Praca zdatasets.xmlPlik** ](/docs/server-admin/datasets). Później, jak już będzieszERDDAP™po raz pierwszy (zazwyczaj tylko z domyślnymi zbiorami danych) , będziesz modyfikować XML w_tomcat_/content/erddap/ **datasets.xml** aby określić wszystkie zestawy danych, które chceszERDDAP™służyć. To tutaj spędzisz większość swojego czasu przygotowując sięERDDAP™a później przy zachowaniuERDDAP™.

Możesz zobaczyć przykład[datasets.xmlw sprawie GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).
     
*    (Nieprawdopodobne) Teraz lub (nieco bardziej prawdopodobne) w przyszłości, jeśli chcesz zmodyfikować plik CSS erddap, zrób kopię_tomcat_/content/erddap/ images / erddapStart2.css o nazwie erddap2.css, a następnie dokonać zmian. Zmiany w erddap2.css stają się skuteczne tylko wtedy, gdyERDDAP™jest ponownie uruchomiony i często wymaga od użytkownika, aby wyczyścił pliki buforowane przeglądarki.
     
ERDDAP™nie działa prawidłowo, jeśli setup.xml lubdatasets.xmlplik nie jest dobrze uformowanym plikiem XML. Tak więc, po edycji tych plików, dobrym pomysłem jest sprawdzenie, czy wynik jest dobrze ukształtowany XML poprzez wklejanie tekstu XML do sprawdzania XML jak[xmlalidation](https://www.xmlvalidation.com/).
     
### Zainstaluj plik erddap.war{#install-the-erddapwar-file} 
4. Na Linuksie, Mac i Windows, pobierz[erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)into _ tomcat _ / webapps.
     (Wersja 2.25 _ 1, 592,292,039 bajtów, MD5 = 652AFC9D1421F00B5F789DA2C4732D4C, datowany na 2024- 11- 07) 
    
Plik .war jest duży, ponieważ zawiera wysoką rozdzielczość linii brzegowej, granicy i danych elewacji potrzebnych do tworzenia map.
    
    \\[Niektóre poprzednie wersje są również dostępne.
    [2, 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551,068,245 bajtów, MD5 = 5FEA912B5D42E50EAB9591F773EA848D, datowany 2022- 02- 16)   
    [2, 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551,069,844 bajtów, MD5 = 461325E97E7577EC671DD50246CCFB8B, datowany na 2022- 02- 23)   
    [2, 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411 bajtów, MD5 = F2CFF805893146E932E498FDDBD519B6, datowany na 2022- 10- 09)   
    [2, 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742,765 bajtów, MD5 = 2B33354F633294213AE2AFDDCF4DA6D0, datowany na 2022- 12- 08) 
    [2, 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572,124,953 bajtów, MD5 = D843A043C506725EBD6F8EFDCCA8FD5F z 2023- 03- 03) 
    [2, 24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568,748,187 bajtów, MD5 = 970fbee172e28b0b8a07756eecbc898e, dated 2024- 06- 07) 
    \\]
    
#### ProxyPass{#proxypass} 
5. Użyj Proxy Podaj tak, aby użytkownicy nie musieli umieszczać numeru portu np.: 8080, w URL.
Na komputerach Linuksa, jeśli Tomcat działa w Apache, proszę zmodyfikować ApachehttpPlik d.conf (zazwyczaj w / etc /httpd / conf /) aby umożliwić ruch HTTP do / zERDDAP™nie wymagając numeru portu, np.: 8080, w URL. Jako użytkownik root:
    1. Zmień istniejący&lt;VirtualHost & gt; tag (jeśli istnieje) lub dodać jeden na końcu pliku:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. Następnie uruchom ponownie Apache: / usr / sbin / apachectl -k graceful (ale czasami jest w innym katalogu) .
         
### NGINX{#nginx} 
 (UNCOMMON) Jeśli pacjent stosuje[NGINX](https://www.nginx.com/)  (web server i balancer obciążenia) :
w celu uzyskania NGINX iERDDAP™działa prawidłowo zhttps, należy umieścić następujący fragment wewnątrz Tomcat server.xml&lt;Host & gt; block:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
W pliku konfiguracyjnym nginx musisz ustawić nagłówki:
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Dzięki Kyle 'owi Wilcoxowi.)   
     
### Uruchom Tomcat{#start-tomcat} 
*    (Nie polecam korzystania z Tomcat Web Application Manager. Jeśli nie wyłączysz i nie uruchomisz Tomcat, prędzej czy później będziesz miał problemy z pamięcią PermGen.)   
     
*    (W systemie Linux lub Mac OS, jeśli stworzyłeś specjalnego użytkownika do uruchomienia Tomcat, np. tomcat, pamiętaj, aby wykonać następujące kroki jako ten użytkownik.)   
     
* Jeśli Tomcat już biegnie, zamknij Tomcat z (w systemie Linux lub Mac OS) _ tomcat _ / bin / shutdown.sh
lub (w systemie Windows) _ tomcat _\\ bin\\shutdown.bat
    
Na Linuksie użyj ps -ef|grep tombot przed i po shutdown.sh, aby upewnić się, że proces tombot przestał. Proces powinien być wymieniony przed zamknięciem i ostatecznie nie powinien być wymieniony po wyłączeniu. To może zająć minutę lub dwie naERDDAP™do całkowitego zamknięcia. Cierpliwości. Albo jeśli wygląda na to, że sam się nie zatrzyma, użyj:
kill -9 _ procesjid _
    
* Uruchom Tomcat z (w systemie Linux lub Mac OS) _ tomcat _ / bin / startup.sh
lub (w systemie Windows) _ tomcat _\\ bin\\ startup.bat

## CzyERDDAP™Bieganie?{#is-erddap-running} 
Użyj przeglądarki, aby spróbować wyświetlić http://_www.YourServer.org_/erddap/status.html   
ERDDAP™startuje bez wczytywanych zbiorów danych. Zestawy danych są wczytywane w tle i dlatego stają się dostępne jeden-by-jeden.

### Rozwiązywanie problemów{#troubleshooting} 
* Kiedy pojawia się prośba użytkownika, idzie do Apache (na komputerach Linux i Mac OS) A potem Tomcat.ERDDAP™.
* Możesz zobaczyć co przychodzi do Apaczów (i powiązane błędy) w plikach dziennika Apache.
*   [Ty](/docs/server-admin/additional-information#tomcat-logs)może zobaczyć, co przychodzi do Tomcat (i powiązane błędy) w plikach dziennika Tomcat (_ tomcat _ / logs / catalina.out i inne pliki w tym katalogu) .
*   [Ty](/docs/server-admin/additional-information#log)może zobaczyć, co przychodzi doERDDAP, wiadomości diagnostyczne zERDDAP, i komunikaty błędów zERDDAP, wERDDAP™ &lt;bigParentDirectory & gt; loguje / log.txt.
* Tomcat nie zaczynaERDDAP™dopóki Tomcat nie otrzyma wniosku oERDDAP™. Więc możesz zobaczyć w plikach Tomcat log jeśli to się zaczęłoERDDAP™lub jeżeli istnieje komunikat błędu związany z tą próbą.
* KiedyERDDAP™zaczyna się, zmienia nazwę staregoERDDAP™plik log.txt (logArchivedat _ CurrentTime _ .txt) i tworzy nowy plik log.txt. Więc jeśli logarytm. plik txt jest stary, to znak, żeERDDAP™ostatnio nie zaczął od nowa.ERDDAP™writs log info to a buffer and only writs the buffer to the log file periodycznie, but you can forceERDDAP™aby zapisać bufor do pliku dziennika odwiedzając.../erddap/status.html.

### Problem: Stara wersjaJava {#trouble-old-version-of-java} 
Jeśli używasz wersjiJavaTo za stare naERDDAP,ERDDAP™nie uruchomi i zobaczysz komunikat błędu w pliku dziennika Tomcat jak
Wyjątek od wątku "main" java.lang.Unsupported ClassVersionError:
_ some / class / name _: Nieobsługiwane major.minor version _ someNumber _
Rozwiązaniem jest aktualizacja do najnowszej wersjiJavai upewnić się, że Tomcat go używa.

### Problem: Slow Startup Pierwszy raz{#trouble-slow-startup-first-time} 
Tomcat musi zrobić dużo pracy za pierwszym razem aplikacji jakERDDAP™jest uruchomiony; w szczególności, musi rozpakować erddap. plik wojenny (co jest jak.zipplik) . Na niektórych serwerach, pierwsza próba oglądaniaERDDAP™stragany (30 sekund?) Dopóki ta praca się nie skończy. Na innych serwerach pierwsza próba zakończy się natychmiast. Ale jeśli poczekasz 30 sekund i spróbujesz jeszcze raz, odniesie sukces, jeśliERDDAP™został prawidłowo zainstalowany.
Nie da się tego naprawić. Tak po prostu działa Tomcat. Ale pojawia się tylko po raz pierwszy po zainstalowaniu nowej wersjiERDDAP™.

## Wyłącz i uruchom ponownie{#shut-down-and-restart} 
W przyszłości, zamknąć (i ponownie uruchomić)  ERDDAP, see[Jak zamknąć i ponownie Tomcat iERDDAP](/docs/server-admin/additional-information#shut-down-and-restart).
## Kłopoty?{#trouble} 
Kłopoty z instalacją Tomcat lubERDDAP? Zobacz[rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support).
## Powiadomienie e-mail nowych wersjiERDDAP {#email-notification-of-new-versions-of-erddap} 
Jeśli chcesz otrzymywać e-mail kiedy nowa wersjaERDDAP™jest dostępny lub inne ważneERDDAP™ogłoszenia, można dołączyć doERDDAP™Lista ogłoszeń[Tutaj](https://groups.google.com/g/erddap-announce). Ta lista zawiera średnio jeden e-mail co trzy miesiące.
## Dostosuj{#customize} 
[DostosujERDDAP™aby podkreślić swoją organizację (nieNOAA ERD) .](#customize)
    * Zmień baner, który pojawia się na górze wszystkichERDDAP™.html strony poprzez edycję&lt;startBodyHtml5 & gt; znacznikdatasets.xmlplik. (Jeśli nie ma żadnego, skopiuj domyślnyERDDAPjest
        \\[tomcat\\]/ webapps / erddap / WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml file intodatasets.xmli edytować go.) Na przykład:
        * Użyj innego obrazu (np. logo Twojej organizacji) .
        * Zmień kolor tła.
        * Zmiana "ERDDAP"to" _ YourOrganization _ 'sERDDAP"
        * Zmień "łatwiejszy dostęp do danych naukowych" na "łatwiejszy dostęp do danych _ YourOrganization _ '".
        * Zmień odnośniki "Sprowadzony do Ciebie przez", aby być linki do organizacji i źródeł finansowania.
    * Zmiana informacji po lewej stronie strony głównej poprzez edycję&lt;ShortDescriptionHtml & gt; w znacznikudatasets.xmlplik. (Jeśli nie ma żadnego, skopiuj domyślnyERDDAPjest
        \\[tomcat\\]/ webapps / erddap / WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml file intodatasets.xmli edytować go.) Na przykład:
        * Opisz, co robi twoja organizacja lub grupa.
        * Opisz jaki rodzaj danych toERDDAP™Tak.
    * Aby zmienić ikonę, która pojawia się na zakładkach przeglądarki, umieść favicon Twojej organizacji. ico in_tomcat_/content/erddap/ Obrazy /. Patrz[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon).
