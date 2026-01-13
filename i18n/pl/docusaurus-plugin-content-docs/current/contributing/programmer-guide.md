---
sidebar_position: 2
---

# Przewodnik programisty

To są rzeczy, z którymi tylko programista zamierza pracować. ERDDAP jest Java Zajęcia muszą wiedzieć.

###  **Uzyskanie kodu źródłowego**  {#getting-the-source-code} 
   

  - Kod źródła Via na GitHub
Kod źródłowy dla najnowszych wersji publicznych i in- development jest również dostępny poprzez [GitHub](https://github.com/ERDDAP) . Proszę przeczytać [Wiki](https://github.com/ERDDAP/erddap/wiki) dla tego projektu. Jeśli chcesz zmodyfikować kod źródłowy (i ewentualnie mają zmiany włączone do normy ERDDAP™ dystrybucja) , jest to zalecane podejście.

###  ** ERDDAP™ uzależnienia**  {#erddap-dependencies} 
 ERDDAP™ wykorzystuje Maven do wczytywania zależności od kodu oraz niektórych statycznych plików referencyjnych (WEB- INF / ref) . Dzieje się tak, aby uniknąć przechowywania wielu dużych plików w repozytorium.
Możesz użyć `kompilacja mvn` i to będzie pobierać zależności i pliki ref. Można również użyć `pakiet mvn` do wygenerowania akt wojennych.
Możesz ręcznie pobrać pliki ref:

  -  [etopo1\\ _ ice\\ _ g\\ _ i2 .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip) i rozpiąć do / WEB- INF / ref /.

  -  [ref\\ _ files .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip) i rozpiąć do / WEB- INF / ref /.

  -  [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip)   (wersja 1.0.0, 20333 bajtów, MD5 = 2B8D2A5AE5ED73E3A42B529C168C60B5, datowany 2024- 10- 14) and unzip it into _ tomcat _, creating _tomcat_/content/erddap .

UWAGA: Domyślnie Maven będzie buforować statyczne referencje i testować archiwum danych pobieranych i pobierać je tylko po pobraniu nowej wersji. Aby pominąć pobieranie całkowicie, można ustawić `skipResourceDownload` lub `skipTestResourceDownload` właściwości do Maven (np. `mvn -DskipResourceDownload package` ) . Aby wymusić ekstrakcję, zestaw `-Ddowl.unpack = true` oraz `-Ddowl.unpackWhenchanged = false` .

-  ERDDAP™ i jego podzespoły mają bardzo liberalne, open-source [Licencje](/license) , więc można używać i modyfikować kod źródłowy w dowolnym celu, dla -profit lub nie-dla-profit. Zauważ, że ERDDAP™ i wiele podkomponentów posiada licencje, które wymagają potwierdzenia źródła kodu, którego używasz. Patrz [Kredyty](/credits) . Niezależnie od tego, czy jest to wymagane, czy nie, jest to po prostu dobra forma, aby uznać wszystkich tych uczestników.
  

-  **Stosowanie kodeksu dla innych projektów** 

Podczas gdy można korzystać z części ERDDAP™ kod dla innych projektów, należy ostrzec, że kod może i będzie się zmieniać. Nie obiecujemy wspierać innych zastosowań naszego kodu. Git i GitHub będą Państwa głównymi rozwiązaniami w radzeniu sobie z tym -- Git pozwala połączyć nasze zmiany w swoje zmiany.
   **W wielu sytuacjach, gdzie może być kuszony do wykorzystania części ERDDAP™ w projekcie, uważamy, że będzie o wiele łatwiej zainstalować i używać ERDDAP™ tak jak jest,** a następnie pisać inne usługi, które korzystają ERDDAP usług. Możesz założyć własną. ERDDAP™ instalacja w ciągu godziny lub dwóch. Możesz założyć własną. ERDDAP™ instalacja w sposób polerowany w ciągu kilku dni (w zależności od liczby i złożoności zbiorów danych) . Ale hackowanie części ERDDAP™ dla własnego projektu prawdopodobnie zajmie tygodnie (i miesięcy do połowu subtelności) i stracisz możliwość włączenia zmian i poprawek z kolejnych ERDDAP™ uwalnia. My (Oczywiście.) myśleć, że jest wiele korzyści w użyciu ERDDAP™ jak jest i robi ERDDAP™ instalacja publicznie dostępna. Jednak, w niektórych okolicznościach, może nie chcesz, aby ERDDAP™ instalacja publicznie dostępna. Następnie, Twoje usługi mogą uzyskać dostęp i korzystać z prywatnych ERDDAP™ i twoi klienci nie muszą wiedzieć o ERDDAP™ .

  ####  **W połowie drogi** 

Albo, istnieje inne podejście, które można znaleźć przydatne, które jest w połowie między zagłębieniem się w ERDDAP kod i użycie ERDDAP™ jako samodzielna usługa internetowa: W klasie EDD istnieje metoda statyczna, która pozwala na przykład zbioru danych (na podstawie specyfikacji w datasets.xml ) :
'oneFromDataset Xml (String tDatasetID) 
'Zwraca przykład tabeli EDDTable lub EDDGrid zestaw danych. Biorąc pod uwagę ten przypadek, możesz zadzwonić
'makeNewFileForDapQuery (String userDapQuery, String dir, String fileName, String file Nazwa) 
"aby powiedzieć instancji do tworzenia pliku danych, określonego typu plików, z wynikami z zapytania użytkownika. Tak więc, jest to prosty sposób użycia ERDDAP metody żądania danych i uzyskania pliku w odpowiedzi, tak jak klient użyłby ERDDAP™ aplikacja internetowa. Ale to podejście działa wewnątrz Java program i pomija potrzeby serwera aplikacji jak Tomcat. Stosujemy to podejście do wielu testów jednostkowych EDDTable i EDDGrid podklasy, więc można zobaczyć przykłady tego w kodzie źródłowym dla wszystkich tych klas.

###  **Środowisko rozwoju**  {#development-environment} 

  - Istnieją konfiguracje dla [Jetty](https://github.com/ERDDAP/erddap/blob/main/development/jetty) oraz [Docker](https://github.com/ERDDAP/erddap/blob/main/development/docker) w GitHub, choć oczekuje się wydania w Tomcat.

  -  **Opcjonalnie** : Ustaw ERDDAP™ w języku Tomcat
Od ERDDAP™ jest przeznaczony głównie do bycia servlet działa w Tomcat, zalecamy, aby postępować zgodnie ze standardem [instrukcje instalacji](/docs/server-admin/deploy-install) zainstalować Tomcat, a następnie zainstalować ERDDAP™ w katalogu internetowym Tomcat. Między innymi, ERDDAP™ został zaprojektowany do zainstalowania w strukturze katalogu Tomcat i oczekuje, że Tomcat dostarczy kilka plików .jar.

  -  ERDDAP™ nie wymaga określonego IDE (Chris używa Visual Studio Code, Bob używał EditPlus) . Nie używamy Eclipse, Ant, itp.; ani nie oferujemy ERDDAP - związane z nimi wsparcie. Projekt wykorzystuje Maven.

  - Używamy pliku wsadowego, który usuwa wszystkie pliki .class w drzewie źródłowym, aby upewnić się, że mamy czystą kompilację (z javac) .

  - Obecnie używamy Javac jdk- 25.0.1 + 8 Adoptium do kompilacji gov.noaa.pfeg.coashwatch.TestAll (ma linki do kilku klas, które nie zostałyby skompilowane inaczej) i przeprowadzić testy. Ze względów bezpieczeństwa, prawie zawsze najlepiej jest korzystać z najnowszych wersji Java 25 i Tomcat 10.

    - Kiedy uruchomimy javac lub java, bieżący katalog to _ tomcat _ / webapps / erddap / WEB-INF.

    - Nasz Javac i Java Classpath jest
       `klasy;.. /.. /.. / lib / servlet- api.jar; lib / *` 

    - Więc twoja linia poleceń Javac będzie jak\\
       `javac -encoding UTF- 8 -cp classes;.. /.. /.. / lib / servlet- api.jar; lib / * classes / gov / noaa / pfel / coashwatch / TestAll.java` 

    - A twoja linia poleceń Java będzie jak\\
'java -cp classes;.. /.. /.. / lib / servlet- api.jar; lib / * -Xmx4000M -Xms4000M klasy / gov / noaa / pfel / coashwatch / TestAll
       `Opcjonalnie: można dodać` -verbose: gc ', co mówi Java drukowanie statystyk zbiórki śmieci.

    - Jeżeli badanie Wszystkie kompilacje, wszystko ERDDAP™ potrzeby zostały opracowane. Skompilowano kilka zajęć, które nie są potrzebne do ERDDAP™ . Jeśli kompilacja TestAll powiedzie się, ale nie skompiluje jakiejś klasy, ta klasa nie jest potrzebna. (Są pewne niedokończone / niewykorzystane klasy.) 

  - W kilku przypadkach używamy kodu źródłowego strony trzeciej zamiast plików .jar (w szczególności DODS ) i nieznacznie je zmodyfikować, aby uniknąć problemów kompilacji z Java 25. Często dokonywaliśmy innych drobnych modyfikacji (w szczególności DODS ) z innych powodów.

  - Większość klas posiada metody badań w powiązanym pliku src / test. Możesz przeprowadzić testy JUnit z `Badanie mvn` Rozkaz. To pobierze kilka plików zip danych, na których opierają się testy z najnowszego wydania [ ERDDAP / erddap Badanie](https://github.com/ERDDAP/erddapTest/releases/) .
     
UWAGA: Maven zapisuje pliki do pobrania, ale rozpakuje pobrane archiwa przy każdym wykonaniu, co wymaga czasu. Pominięcie pobierania
i odpinania archiwum danych testowych, można określić `skipTestResourceDownload` nieruchomości do Maven (np. `mvn -DskipTestResourceDownload package` ) .

###   **Ważne klasy**  {#important-classes} 

Jeśli chcesz spojrzeć na kod źródłowy i spróbować dowiedzieć się, jak ERDDAP™ działa, proszę.

  - Kod Java Doc komentarze, ale Java Docs nie zostały wygenerowane. Możesz je wygenerować.

  - Najważniejsze zajęcia (w tym wymienione poniżej) są w obrębie gov / noaa / pfel / erddap.

  - W ERDDAP™ klasa posiada metody najwyższego poziomu. Rozszerza HttpServlet.

  -  ERDDAP™ przekazuje wnioski do instancji podklas EDDGrid lub tabeli EDDTable, która reprezentuje indywidualne zbiory danych.

  - EDStatic posiada większość statycznych informacji i ustawień (np. z plików setup.xml i messages.xml) i oferuje usługi statyczne (np. wysyłanie e-maili) .

  -  EDDGrid i podklasy EDDTable analizują żądanie, pobierają dane z metod specyficznych dla podklasy, a następnie formatują dane dla odpowiedzi.

  -  EDDGrid podklasy push data into GridDataAccesor (wewnętrzny kontener danych dla danych chwytanych) .

  - Podklasy EDDTable wpychają dane do podklas TableWriter, które zapisują dane do określonego typu pliku w locie.

  - Pozostałe klasy (np. klasy niskiego poziomu) są również ważne, ale jest mniej prawdopodobne, że będziesz pracował nad ich zmianą.
     

###  **Składki według kodów**  {#code-contributions} 

- Problemy z GitHub
Jeśli chcesz wnieść wkład, ale nie masz projektu, zobacz listę [Problemy z GitHub](https://github.com/ERDDAP/erddap/issues) Wiele z nich to projekty, które można podjąć. Jeśli chcesz pracować nad daną sprawą, przypisz ją sobie, aby wskazać innym, że nad nią pracujesz. Kwestia GitHub jest najlepszym miejscem do omówienia wszelkich pytań dotyczących sposobu kontynuowania prac nad tą kwestią.

- Jeśli zmiana, którą chciałbyś wprowadzić, jest jedną z poniższych wspólnych spraw, należy utworzyć [Wydanie GitHub](https://github.com/ERDDAP/erddap/issues) wskazując na zmiany, które zamierzasz wprowadzić. Następnie, gdy zmiana zostanie zakończona, należy wyciągnąć wniosek o połączenie. Wspólne zmiany obejmują:

  - Chcesz napisać kolejną podklasę EDDGrid lub EDDTable do obsługi innego typu źródła danych. Jeśli tak, zalecamy, aby znaleźć najbliższą istniejącą podklasę i użyć tego kodu jako punktu wyjścia.

  - Chcesz napisać inną metodę saveAs _ FileType _. Jeśli tak, zalecamy, aby znaleźć najbliższą istniejącą metodę saveAs _ FileType _ in EDDGrid lub tabeli EDDTable i użyć tego kodu jako punktu wyjścia.

Te sytuacje mają przewagę, że kod, który piszesz, jest samoopanowany. Nie musisz znać wszystkich szczegółów ERDDAP Wewnętrzne. I łatwo będzie nam wprowadzić twój kod w ERDDAP . Zauważ, że jeśli podasz kod, licencja będzie musiała być kompatybilna z ERDDAP™   [licencja](/license)   (np., [Apache](https://www.apache.org/licenses/) , [BSD](https://www.opensource.org/licenses/bsd-license.php) lub [MIT- X](https://www.opensource.org/licenses/mit-license.php) ) . Będziemy wymienić swój wkład w [kredyty](/credits) .

- Jeśli masz funkcję nie omówione powyżej, że chcesz dodać do ERDDAP , zaleca się, aby najpierw utworzyć wątek dyskusji w [Dyskusje o GitHub](https://github.com/ERDDAP/erddap/discussions/categories/ideas) . W przypadku istotnych cech / zmian Rada Techniczna omówi je i zdecyduje, czy zatwierdzić dodanie go do ERDDAP™ .

###  **Oceniając wkład Twojego kodu**  {#judging-your-code-contributions} 
Jeśli chcesz przesłać kod lub inne zmiany, które mają być zawarte w ERDDAP To świetnie. Państwa wkład musi spełniać określone kryteria, aby zostać zaakceptowany. Jeśli postępujesz zgodnie z poniższymi wytycznymi, znacznie zwiększasz szanse na przyjęcie swojego wkładu.
   

  - W ERDDAP™ projekt jest zarządzany przez NATD ( NOAA Mianowany dyrektor techniczny) z wkładem ze strony Rady Technicznej.
Od 2007 r. (początek ERDDAP ) do 2022, to był Bob Simons (również Założyciel - Lider) . Począwszy od stycznia 2023, to Chris John. Zasadniczo, NATD jest odpowiedzialny za ERDDAP , więc ma ostatnie słowo na temat decyzji ERDDAP™ kod, w szczególności dotyczący projektu i tego, czy dany wniosek o ciągnięcie zostanie przyjęty, czy też nie. Musi tak być częściowo ze względu na efektywność (działa świetnie dla Linus Torvalds i Linux) oraz częściowo ze względów bezpieczeństwa: Ktoś musi powiedzieć informatykom, że bierze odpowiedzialność za bezpieczeństwo i integralność kodu.
     

  - NATD nie gwarantuje, że zaakceptuje twój kod.
Jeśli projekt nie wypali tak dobrze, jak mieliśmy nadzieję i jeśli nie można go uratować, NATD nie włączy projektu do ERDDAP™ dystrybucji. Proszę, nie czuj się źle. Czasami projekty nie idą tak dobrze, jak się spodziewaliśmy. Zdarza się to wszystkim programistom. Jeśli postępujesz zgodnie z wytycznymi poniżej, znacznie zwiększyć swoje szanse na sukces.
     

  - Najlepiej, jeśli zmiany są w interesie ogólnym i są użyteczne.
Jeśli kod jest specyficzny dla Twojej organizacji, prawdopodobnie najlepiej jest utrzymać oddzielną gałąź ERDDAP™ Do użytku. Axiom to robi. Na szczęście Git ułatwia to. NATD chce utrzymać spójną wizję ERDDAP , nie pozwolić, aby stał się projektem zlewozmywaka kuchni, gdzie każdy dodaje cechę do swojego projektu.
     

  - Podążaj za Java Konwencje kodowe.
Ogólnie, kod powinien być dobrej jakości i powinien być zgodny z oryginałem [ Java Konwencje kodowe](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf) : umieścić pliki .class we właściwym miejscu w strukturze katalogu, podać pliki .class odpowiednią nazwę, zawierać właściwe Java Doc komentarze, zawierać / / komentarze na początku każdego akapitu kodu, tiret z 4 spacji (nie zakładka) , uniknąć linii &gt; 80 znaków, itp. Konwencje się zmieniają, a kod źródłowy nie zawsze jest w pełni aktualny. W przypadku wątpliwości, dopasować kod do konwencji, a nie istniejący kod.

- Użyj nazwy klasy opisowej, metody i zmiennych.
To ułatwia czytanie kodu innym.
   

- Unikaj wymyślnego kodu.
Na dłuższą metę, ty lub inni ludzie będziecie musieli wymyślić kod, aby go utrzymać. Więc proszę użyć prostych metod kodowania, które są zatem łatwiejsze dla innych (w tym ciebie w przyszłości) Żeby się dowiedzieć. Oczywiście, jeśli istnieje prawdziwa zaleta korzystania z niektórych fantazji Java funkcji programowania, korzystać z niej, ale szeroko dokumentować, co zrobiłeś, dlaczego i jak to działa.
   

- Praca z Zarządem Technicznym przed rozpoczęciem.
Jeśli masz nadzieję, aby wprowadzić zmiany kodu ERDDAP™ Rada Techniczna na pewno będzie chciała porozmawiać o tym, co zamierzasz zrobić i jak to zrobisz, zanim wprowadzisz jakiekolwiek zmiany w kodzie. W ten sposób unikniemy zmian, których NATD nie zaakceptuje. Podczas wykonywania pracy, NATD i Rada Techniczna jest gotowa odpowiedzieć na pytania, aby pomóc Ci dowiedzieć się istniejącego kodu i (ogółem) jak zająć się projektem.
   

- Praca niezależna (w miarę możliwości) Jak zaczniesz.
W przeciwieństwie do powyższego "Praca z Radą Techniczną", po rozpoczęciu projektu, NATD zachęca do pracy tak niezależnie, jak to możliwe. Jeśli NATD ma ci powiedzieć prawie wszystko i odpowiedzieć na wiele pytań (szczególnie tych, na które mogłeś odpowiedzieć czytając dokumentację lub kod) Więc twoje wysiłki nie są oszczędnością czasu dla NATD i równie dobrze mógłby sam wykonać swoją pracę. To jest... [Mityczny miesiąc człowieka](https://en.wikipedia.org/wiki/The_Mythical_Man-Month) problem. Oczywiście, nadal powinniśmy się komunikować. Byłoby świetnie, aby okresowo widzieć swoje prace w toku, aby upewnić się, że projekt jest na dobrej drodze. Ale im więcej możesz pracować niezależnie (po uzgodnieniu przez Radę Techniczną danego zadania i ogólnego podejścia) Tym lepiej.
   

- Unikaj robaków.
Jeśli błąd nie zostanie złapany przed wydaniem, powoduje problemy dla użytkowników (W najlepszym wypadku) , zwraca złe informacje (w najgorszym) , is a blot on ERDDAP reputacja, i będzie trwać na poza-o- daty ERDDAP™ instalacje przez lata. Pracować bardzo ciężko, aby uniknąć błędów. Częścią tego jest pisanie czystego kodu (więc łatwiej zobaczyć problemy) . Częścią tego jest pisanie testów jednostkowych. Częścią tego jest stała postawa unikania błędów podczas pisania kodu. Nie każ NATD żałować dodawania kodu do ERDDAP™ .
   

- Napisz test jednostkowy lub test.
Dla nowego kodu, należy zapisać testy JUnit w pliku testowym.
Proszę napisać co najmniej jedną indywidualną metodę badania, która dokładnie bada kod, który piszesz i dodać go do pliku testowego klasy 'JUnit tak, że jest on uruchamiany automatycznie. Jednostka (oraz powiązane) testy są jednym z najlepszych sposobów, aby złapać błędy, początkowo, i na dłuższą metę (jak inne rzeczy się zmieniają w ERDDAP™ ) . Jak powiedział Bob, "Testy jednostek pozwalają mi spać w nocy".
   

- Ułatw NATD zrozumienie i zaakceptowanie zmian w żądaniu ciągnięcia.
Częścią tego jest napisanie metody badania jednostkowego (s) . Częścią tego jest ograniczenie zmian do jednej sekcji kodu (lub jedna klasa) jeśli to możliwe. NATD nie zaakceptuje żadnej prośby z setkami zmian w całym kodzie. NATD informuje ochronę informatyczną, że bierze odpowiedzialność za bezpieczeństwo i integralność kodeksu. Jeśli jest zbyt wiele zmian lub są one zbyt trudne do rozgryzienia, to po prostu zbyt trudno jest zweryfikować zmiany są poprawne i nie wprowadzać błędów lub problemów bezpieczeństwa.
   

- Proste.
Dobry ogólny temat dla Twojego kodu jest: Keep it simple. Prosty kod jest łatwy dla innych (w tym ciebie w przyszłości) do czytania i konserwacji. Łatwo jest NATD zrozumieć, a tym samym zaakceptować.
   

- Przyjmij długoterminową odpowiedzialność za twój kod.
Na dłuższą metę najlepiej jest przyjąć na siebie ciągłą odpowiedzialność za utrzymanie kodu i odpowiadanie na pytania na ten temat. (np. w ERDDAP™ Grupa Google) . Jak zauważyli niektórzy autorzy, kod jest zarówno zobowiązaniem, jak i aktywem. Jeśli w przyszłości odkryje się pluskwę, najlepiej ją naprawić, bo nikt nie zna twojego kodu lepiej niż ty. (również tak, że istnieje zachęta do unikania błędów w pierwszej kolejności) . NATD nie prosi o zdecydowane zobowiązanie do zapewnienia ciągłej konserwacji. NATD mówi tylko, że wykonanie konserwacji będzie bardzo docenione.
