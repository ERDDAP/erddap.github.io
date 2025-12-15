---
sidebar_position: 4
---
# Dodatkowe informacje

## Rzeczy, które musisz wiedzieć{#things-you-need-to-know} 
     
###    ** [Błędy proxy](#proxy-errors) **  {#proxy-errors} 
Czasami, prośba o ERDDAP™ zwróci błąd Proxy, błąd HTTP 502 Bad Gateway lub podobny błąd. Te błędy są rzucane przez Apache lub Tomcat, nie ERDDAP™ Sam.
* Jeśli każde żądanie generuje te błędy, zwłaszcza gdy jesteś po raz pierwszy skonfigurować ERDDAP™ , następnie prawdopodobnie jest to proxy lub zły błąd bramki, a rozwiązaniem jest prawdopodobnie naprawić [ ERDDAP Ustawienia proxy](/docs/server-admin/deploy-install#proxypass) . Może to być również problem, gdy ustalone ERDDAP™ nagle zaczyna rzucać te błędy dla każdej prośby.
* W przeciwnym razie, błędy "proxy" są zazwyczaj rzeczywiście czas out błędów rzuconych przez Apache lub Tomcat. Nawet jeśli dzieje się to stosunkowo szybko, jest to rodzaj reakcji Apache lub Tomcat, który występuje, gdy ERDDAP™ jest bardzo zajęty, memory- ograniczony, lub ograniczony przez inne zasoby. W takich przypadkach należy zapoznać się z poniższą opinią w sprawie [ ERDDAP™ powoli reaguje](#responding-slowly) .
        
Wnioski o długi okres (&gt; 30 punktów czasowych) z siatki danych są podatne na błędy czasu, które często pojawiają się jako błędy Proxy, ponieważ zajmuje to znaczny czas na ERDDAP™ aby otworzyć wszystkie pliki danych jeden-by-jeden. Jeśli ERDDAP™ w przeciwnym razie jest zajęty podczas wniosku, problem jest bardziej prawdopodobne. Jeśli pliki zbioru danych są skompresowane, problem jest bardziej prawdopodobny, chociaż trudno jest użytkownikowi określić, czy pliki zbioru danych są skompresowane.
Rozwiązaniem jest złożenie kilku wniosków, z których każdy ma mniejszy zakres czasowy. Jak mały zasięg czasowy? Sugeruję zacząć bardzo małe (- 30 punktów czasowych?) Więc... (około) podwoić zakres czasowy do czasu, aż prośba się nie powiedzie, a następnie cofnąć o jeden podwojenie. Więc poproś wszystkich. (każdy przez inny kawałek czasu) potrzebował wszystkich danych.
An ERDDAP™ administrator może zmniejszyć ten problem poprzez zwiększenie [Ustawienia timeout Apache](/docs/server-admin/deploy-install#apache-timeout) .
        
### Monitorowanie{#monitoring} 
Wszyscy chcemy, aby nasze usługi danych znaleźć ich odbiorców i być szeroko wykorzystywane, ale czasami ERDDAP™ mogą być stosowane zbyt często, powodując problemy, w tym super powolne odpowiedzi dla wszystkich wniosków. Nasz plan unikania problemów to:

* Monitor ERDDAP™ przez [strona status.html](#status-page) .
Ma mnóstwo przydatnych informacji. Jeśli zauważysz, że pojawia się ogromna liczba żądań, albo że używane są tony pamięci, lub tony nieudanych żądań, albo każdy major LoadDatasets zajmuje dużo czasu, lub zobaczyć jakiekolwiek oznaki rzeczy zagmatwanych i reagujących powoli, a następnie spojrzeć w ERDDAP jest [plik log.txt](#log) Zobaczyć, co się dzieje.
    
Przydatne jest również po prostu odnotowanie, jak szybko strona statusu reaguje. Jeśli reaguje powoli, jest to ważny wskaźnik, że ERDDAP™ Jest bardzo zajęty.
    
* Monitor ERDDAP™ przez [Sprawozdanie dzienne](#daily-report) e-mail.
     
* Obserwuj zbiory danych poza datami *BaseUrl*  /erddap/outOfDateDatasets.html strona internetowa oparta na opcjonalnej [ testOutOfDate ](/docs/server-admin/datasets#testoutofdate) atrybut globalny.
     
#### Monitory zewnętrzne{#external-monitors} 
Metody wymienione powyżej są następujące: ERDDAP sposoby monitorowania się. Możliwe jest również wykonanie lub wykorzystanie zewnętrznych systemów do monitorowania ERDDAP . Jednym z projektów jest: [Axiom 's erddap- metrics project](https://github.com/axiom-data-science/erddap-metrics) . Takie systemy zewnętrzne mają pewne zalety:
* Mogą być dostosowane do dostarczania informacji, które chcesz, wyświetlane w sposób chcesz.
* Mogą one zawierać informacje na temat ERDDAP™ że ERDDAP™ nie ma dostępu łatwo lub wcale (na przykład, wykorzystanie procesora, wolne miejsce na dysku, ERDDAP™ czas reakcji z perspektywy użytkownika, ERDDAP™ czas pracy,
* Mogą one dokonywać wpisów (e-maile, rozmowy telefoniczne, SMS-y) do administratorów, gdy problemy przekraczają pewien próg.
             
### Wielokrotne równoczesne Wnioski{#multiple-simultaneous-requests} 
*    **Użytkownicy na czarnej liście składający wielokrotne wnioski&#33;** 
Jeśli jest jasne, że niektórzy użytkownicy składają więcej niż jeden wniosek jednocześnie, wielokrotnie i stale, to dodaj ich adres IP do ERDDAP [&lt;requestBlacklist &gt;] (/ docs / server- admin / datasets # requestblacklist) w datasets.xml plik. Czasami wszystkie wnioski pochodzą z jednego adresu IP. Czasami pochodzą z wielu adresów IP, ale wyraźnie ten sam użytkownik. Można również na czarnej liście ludzi robiących tony niewłaściwych wniosków lub tony umysłowo nieefektywnych wniosków.
    
Następnie, dla każdej prośby, którą składają, ERDDAP™ zwraca:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
Miejmy nadzieję, że użytkownik zobaczy tę wiadomość i skontaktuje się z Tobą, aby dowiedzieć się, jak naprawić problem i wysiąść z czarnej listy. Czasami zmieniają adresy IP i próbują ponownie.
    
To jak równowaga sił między bronią ofensywną i obronną w czasie wojny. Tutaj, broń obronna ( ERDDAP ) mają stałą pojemność, ograniczoną przez liczbę rdzeni w procesorze, przepustowość dostępu do dysku i przepustowość sieci. Ale broń ofensywna (użytkownicy, w szczególności skrypty) posiadają nieograniczoną zdolność przewozową:
    
    * Pojedynczy wniosek o dane z wielu punktów czasowych może spowodować ERDDAP aby otworzyć ogromną liczbę plików (w kolejności lub częściowo wielowątkowe) . W skrajnych przypadkach, jeden "prosty" wniosek może łatwo zawiązać RAID dołączony do ERDDAP™ przez minutę, skutecznie blokując rozpatrywanie innych wniosków.
         
    * Jedna prośba może pochłonąć dużą część pamięci. (nawet jeśli ERDDAP™ jest kodowany w celu zminimalizowania pamięci potrzebnej do obsługi dużych żądań) .
         
    * Paralelizacja -
Jest to łatwe dla sprytnego użytkownika do równoległego dużego zadania poprzez generowanie wielu wątków, z których każdy składa odrębną prośbę (które mogą być duże lub małe) . Takie zachowanie jest zachęcane przez społeczność informatyki jako skuteczny sposób na rozwiązanie dużego problemu (i równoległe jest skuteczne w innych okolicznościach) . Wracając do analogii wojennej: użytkownicy mogą składać zasadniczo nieograniczoną liczbę jednoczesnych wniosków, przy czym koszt każdego z nich wynosi zasadniczo zero, ale koszt każdego wniosku ERDDAP™ może być duży i ERDDAP zdolność reagowania jest ograniczona. Najwyraźniej, ERDDAP™ przegra tę bitwę, chyba że ERDDAP™ administrator Black list użytkowników, którzy składają wielokrotne wnioski jednoczesne, które niesprawiedliwie wypierają innych użytkowników.
         
    * Wiele skryptów -
Teraz pomyśl o tym, co się dzieje, gdy jest kilku mądrych użytkowników, każdy uruchomiony skrypty równoległe. Jeśli jeden użytkownik może wygenerować tak wiele żądań, że inni użytkownicy są wytłoczeni, to wielu takich użytkowników może wygenerować tak wiele żądań, że ERDDAP™ staje się przytłoczony i pozornie nie reaguje. Jest to skutecznie [Atak DDOS](https://en.wikipedia.org/wiki/Denial-of-service_attack) Znowu, jedyna obrona dla ERDDAP™ jest do użytkowników czarnej listy składających wielokrotne jednoczesne wnioski, które niesprawiedliwie wypierają innych użytkowników.
         
    * Oczekiwania inflacyjne -
W świecie wielkich firm technologicznych (Amazon, Google, Facebook,...) , użytkownicy spodziewają się zasadniczo nieograniczonych możliwości od dostawców. Ponieważ przedsiębiorstwa te prowadzą działalność zarobkową, im więcej mają użytkowników, tym większe dochody mają na rozwój infrastruktury informatycznej. Więc mogą sobie pozwolić na ogromną infrastrukturę informatyczną do obsługi wniosków. I sprytnie ograniczają liczbę wniosków i koszt każdego wniosku od użytkowników poprzez ograniczenie rodzajów wniosków, które użytkownicy mogą złożyć tak, że żaden pojedynczy wniosek nie jest uciążliwy, i nigdy nie ma powodu (lub sposób) dla użytkowników do składania wielu wniosków jednocześnie. Więc te ogromne firmy technologiczne mogą mieć znacznie więcej użytkowników niż ERDDAP™ , ale mają znacznie więcej zasobów i sprytne sposoby ograniczenia wniosków każdego użytkownika. To możliwa do opanowania sytuacja dla dużych firm IT (i stają się bogaci&#33;) ale nie dla ERDDAP™ instalacje. Znowu, jedyna obrona dla ERDDAP™ jest do użytkowników czarnej listy składających wielokrotne jednoczesne wnioski, które niesprawiedliwie wypierają innych użytkowników.
         
    
Więc użytkownicy: Nie rób wielu równoczesnych żądań lub będziesz na czarnej liście&#33;
     

Najwyraźniej najlepiej, jeśli serwer ma dużo rdzeni, dużo pamięci. (więc można przypisać wiele pamięci do ERDDAP™ , więcej niż kiedykolwiek potrzebuje) oraz połączenie internetowe o dużej przepustowości. Następnie, pamięć rzadko lub nigdy nie jest czynnikiem ograniczającym, ale przepustowość sieci staje się bardziej powszechnym czynnikiem ograniczającym. Zasadniczo, ponieważ jest coraz więcej jednoczesnych żądań, szybkość do danego użytkownika maleje. To oczywiście spowalnia liczbę wniosków, jeśli każdy użytkownik składa tylko jeden wniosek na raz.
    
###  ERDDAP™ Pobieranie danych z ThREDDS{#erddap-getting-data-from-thredds} 
Jeśli u pacjenta występuje ERDDAP™ otrzymuje niektóre z jego danych z THREDDS na swojej stronie, istnieją pewne korzyści do wykonania kopii plików danych THREDDS (co najmniej dla najbardziej popularnych zbiorów danych) na innym RAID, które ERDDAP™ ma dostęp do, że ERDDAP™ może bezpośrednio podawać dane z plików. W ERD Robimy to dla najpopularniejszych zbiorów danych.

*    ERDDAP™ może uzyskać dane bezpośrednio i nie musi czekać na THREDDS przeładować zestaw danych lub...
*    ERDDAP™ może natychmiast zauważyć i włączyć nowe pliki danych, więc nie musi zadręczać THREDDS często, aby sprawdzić, czy zbiór danych się zmienił. Zobacz&lt;updateEveryNMillis &gt;] (/ docs / server- admin / datasets # updateeevernmillis) .
* Ładunek jest podzielony między 2 serwery RAIDS i 2, zamiast na żądanie jest trudne dla obu ERDDAP™ i TREDDS.
* Unikasz problemu niedopasowania spowodowanego przez THREDDS małe (domyślnie) maksymalny rozmiar wniosku. ERDDAP™ ma system do rozwiązywania problemów, ale unikanie problemu jest lepsze.
* Masz kopię zapasową danych, która jest zawsze dobrym pomysłem.

W każdym razie, nigdy nie uruchomić THREDDS i ERDDAP™ w tym samym Tomcat. Uruchom je w oddzielnych Tomcats, lub lepiej, na oddzielnych serwerach.

Okazuje się, że THREDDS okresowo dostaje się do stanu, w którym wnioski po prostu wiszą. Jeśli u pacjenta występuje ERDDAP™ otrzymuje dane z ThREDDS i THREDDS jest w tym stanie, ERDDAP™ ma obronę (Mówi, że zestaw danych oparty na THREDDS nie jest dostępny) , ale to nadal kłopotliwe dla ERDDAP™ ponieważ ERDDAP™ musi czekać do timeout za każdym razem próbuje przeładować zestaw danych z powieszonych THREDDS. Niektóre grupy (w tym ERD ) unikać tego poprzez aktywne ponowne uruchomienie THREDDS często (np. w nocy w pracy cron) .

### Powoli reaguje{#responding-slowly} 
*    **Jeśli ERDDAP™ Czy odpowiedź powoli** lub jeżeli tylko niektóre prośby reagują powoli,
może być w stanie dowiedzieć się, czy spowolnienie jest rozsądne i tymczasowe (np. ze względu na wiele żądań ze skryptów lub WMS użytkownicy) , lub jeśli coś jest niewytłumaczalnie źle i trzeba [Wyłącz i uruchom ponownie Tomcat i ERDDAP™ ](#shut-down-and-restart) .
    
Jeśli ERDDAP™ reaguje powoli, patrz porady poniżej, aby określić przyczynę, co, miejmy nadzieję, pozwoli rozwiązać problem.
Możesz mieć konkretny punkt wyjścia (np. specjalny adres URL) lub niejasny punkt wyjścia (np., ERDDAP™ jest powolny) .
Użytkownik może wiedzieć (np., ponieważ wysłali ci maila) lub nie.
Możesz mieć inne wskazówki, albo nie.
Ponieważ wszystkie te sytuacje i wszystkie możliwe przyczyny problemów rozmywają się, poniższa porada stara się poradzić sobie ze wszystkimi możliwymi punktami wyjściowymi i wszystkimi możliwymi problemami związanymi z powolnymi odpowiedziami.
    
    *    **Szukaj wskazówek [ ERDDAP plik dziennika](#log) **   ( *bigParentDirectory* / logs / log.txt) .
         \\[ W rzadkich przypadkach, istnieją wskazówki w [Plik dziennika Tomcat](#tomcat-logs)   ( *tomcat* / logi / katalina. out) . \\]   
Szukaj wiadomości błędów.
Szukaj dużej liczby wniosków pochodzących z jednego (lub kilka) użytkownicy i być może hosting wiele zasobów serwera (pamięć, czas procesora, dostęp do dysku, przepustowość internetu) .
        
Jeśli problem jest związany z **jeden użytkownik** , często można uzyskać wskazówki o tym, kim użytkownik jest za pośrednictwem usług internetowych, takich jak [https://whatismyipaddress.com/ip-lookup](https://whatismyipaddress.com/ip-lookup) które mogą dać Ci informacje dotyczące adresu IP użytkownika (które można znaleźć w ERDDAP jest [log.txt](#log) plik) .
        
        * Jeśli użytkownik wydaje się być **bot** źle się zachowuje (w szczególności, wyszukiwarka próbuje wypełnić ERDDAP™ formy z każdą możliwą permutacją wartości wejścia) , upewnij się, że prawidłowo skonfigurować serwer [robots.txt](#robotstxt) plik.
        * Jeśli użytkownik wydaje się być **skrypt (s) ** który składa wielokrotne jednoczesne wnioski, skontaktuj się z użytkownikiem, wyjaśnić, że ERDDAP™ posiada ograniczone zasoby (np. pamięć, czas procesora, dostęp do dysku, przepustowość internetu) , i poprosić ich o rozważenie innych użytkowników i tylko jeden wniosek na raz. Możesz też wspomnieć, że będziesz na czarnej liście, jeśli się nie wycofają.
        * Jeśli użytkownik wydaje się być **skrypt** zadając wiele czasochłonnych żądań, poproś użytkownika o rozważenie innych użytkowników poprzez wprowadzenie małej pauzy (2 sekundy?) w skrypcie pomiędzy wnioskami.
        *    ** WMS oprogramowanie klienta** może być bardzo wymagająca. Jeden klient często poprosi o 6 niestandardowych obrazów na raz. Jeśli użytkownik wydaje się być WMS klient, który składa uzasadnione wnioski, można:
            * Zignoruj to. (polecam, bo wkrótce ruszą dalej.) 
            * Wyłącz serwer WMS usługa za pośrednictwem ERDDAP plik setup.html. (niezalecane) 
        * Jeżeli wnioski wydają się **głupi, szalony, przesadny lub złośliwy,** lub jeśli nie można rozwiązać problemu w inny sposób, rozważyć tymczasowe lub stałe dodanie adresu IP użytkownika do [&lt;requestBlacklist &gt; w Twoim datasets.xml plik] (/ docs / server- admin / datasets # requestblacklist) .
             
    *    **Spróbuj powielić sam problem, z komputera.**   
Dowiedz się, czy problem dotyczy jednego zbioru danych lub wszystkich zbiorów danych, dla jednego użytkownika lub wszystkich użytkowników, dla niektórych rodzajów wniosków, itp..
Jeśli możesz powielić problem, spróbuj go zawęzić.
Jeśli nie można powielić problemu, to problem może być powiązany z komputerem użytkownika, połączeniem internetowym użytkownika lub połączeniem internetowym instytucji.
         
    * Jeśli tylko **jeden zbiór danych** reaguje powoli (Może tylko dla **jeden rodzaj wniosku** od jednego użytkownika) , problem może być:
        *    ERDDAP dostęp do danych źródłowych zbioru danych (w szczególności z relacyjnych baz danych, Cassandra i zdalnych zbiorów danych) może być czasowo lub trwale powolny. Spróbuj sprawdzić prędkość źródła niezależnie od ERDDAP . Jeśli jest powolny, być może można go poprawić.
        * Czy problem dotyczy konkretnego wniosku lub ogólnego rodzaju wniosku?
Im większy jest wymagany podzbiór zbioru danych, tym bardziej prawdopodobne jest, że wniosek zawiedzie. Jeśli użytkownik składa ogromne wnioski, poproś użytkownika, aby zrobić mniejsze wnioski, które są bardziej prawdopodobne, aby uzyskać szybką i udaną odpowiedź.
            
Prawie wszystkie zestawy danych są lepsze w obsłudze niektórych rodzajów wniosków niż inne rodzaje wniosków. Na przykład, gdy zbiór danych przechowuje różne fragmenty czasu w różnych plikach, wnioski o dane z dużej liczby punktów czasowych mogą być bardzo wolne. Jeśli aktualne żądania są trudne, rozważyć oferowanie wariantu zbioru danych, który jest zoptymalizowany dla tych żądań. Albo po prostu wyjaśnić użytkownikowi, że ten rodzaj żądania jest trudny i czasochłonny, i poprosić o ich cierpliwość.
            
        * Zestaw danych może nie być optymalnie skonfigurowany. Możesz być w stanie dokonać zmian w zbiorze danych datasets.xml kawałek pomóc ERDDAP™ lepiej obsługiwać zestaw danych. Na przykład:
            
            *    EDDGrid Zestawy danych FromNcFiles, które uzyskują dostęp do danych ze skompresowanych plików nc4 / hdf5, są powolne przy uzyskiwaniu danych dla całego zakresu geograficznego (np. dla mapy świata) ponieważ cały plik musi być zdekompresowany. Możesz przekonwertować pliki do nieskompresowanych plików, ale wtedy zapotrzebowanie na przestrzeń na dysku będzie znacznie większe. Prawdopodobnie lepiej jest po prostu zaakceptować fakt, że takie zbiory danych będą powolne w pewnych okolicznościach.
            * Konfiguracja [&lt; subsetVariables &gt;] (/ docs / server- admin / datasets # subsetvariables) tag ma ogromny wpływ na to, jak ERDDAP™ obsługuje zbiory danych EDDTable.
            * Może być w stanie zwiększyć [prędkość bazy danych EDDTableFromDatabase](/docs/server-admin/datasets#database-speed) zestaw danych.
            * Wiele zbiorów danych EDDTable może być przyspieszonych przez [przechowywanie kopii danych w NetCDF Plik sąsiadujący z oznakowaniem ramki](/docs/server-admin/datasets#eddtablefromfiles) , które ERDDAP™ może czytać bardzo szybko.
            
Jeśli chcesz pomocy w przyspieszeniu określonego zbioru danych, zawierać opis problemu i części zbioru danych datasets.xml i zobaczyć nasze [rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support) .
             
    * Jeśli **wszystko** w ERDDAP™ en **zawsze** powoli, problem może być:
        * Komputer, który pracuje ERDDAP™ może nie mieć wystarczającej mocy pamięci lub przetwarzania. Dobrze jest uciekać. ERDDAP™ na nowoczesnym, wielordzeniowym serwerze. Serwer powinien mieć 64-bitowy system operacyjny i 8 GB pamięci lub więcej.
        * Komputer, który pracuje ERDDAP™ mogą być również uruchomione inne aplikacje, które zużywają wiele zasobów systemowych. Jeśli tak, można uzyskać dedykowany serwer dla ERDDAP ? Na przykład (To nie jest potwierdzenie.) , można uzyskać czterordzeniowy Mac Mini Server z 8 GB pamięci za $1100.
             
    * Jeśli **wszystko** w ERDDAP™ en **tymczasowo** powoli, zobacz swój ERDDAP jest [ ** /erddap/status.html strona** ](#status-page) w twojej przeglądarce.
        * Czy ERDDAP™ brak wczytania strony statusu?
Jeśli tak, [ponowne uruchomienie ERDDAP™ ](#shut-down-and-restart) .
        * Czy ERDDAP™ status obciążenia strony powoli (np. &gt; 5 sekund) ?
To znak, że wszystko w ERDDAP™ Biegnie powoli, ale to niekoniecznie kłopot. ERDDAP™ Może być bardzo zajęty.
        * Dla "Response failed time (od ostatniego głównego LoadDatasets) ", czy n = duża liczba?
To wskazuje, że ostatnio było wiele nieudanych wniosków. To mogą być kłopoty albo początek kłopotów. Mediana czasu dla awarii jest często duża (np. 210000 ms) ,
co oznacza, że (Czy?) dużo aktywnych wątków.
które wiązały wiele zasobów (Pamięć, otwarte pliki, otwarte gniazda...) ,
Co nie jest dobre.
        * Dla "Response Succeeded Time (od ostatniego głównego LoadDatasets) ", czy n = duża liczba?
To wskazuje, że ostatnio było wiele udanych wniosków. To nie są kłopoty. To po prostu znaczy, że ERDDAP™ jest coraz intensywniejszy.
        * Czy "Liczba wątków nie oczekujących na Tomcat-" jest typową wartością?
Często jest to poważny problem, który spowoduje ERDDAP™ zwolnić i ostatecznie zamarznąć. Jeśli to trwa godzinami, może chcesz aktywnie [ponowne uruchomienie ERDDAP™ ](#shut-down-and-restart) .
        * Na dole listy "Podsumowanie użytkowania pamięci", czy ostatnia "Pamięć: obecnie używa" wartości bardzo wysokiej?
To może wskazywać na wysokie zużycie, albo być oznaką kłopotów.
        * Spójrz na listę wątków i ich status. Czy nietypowa liczba z nich robi coś niezwykłego?
             
    * Czy **połączenie internetowe instytucji** Teraz wolno?
Szukaj w Internecie "Internet test prędkości" i skorzystaj z jednego z darmowych testów online, takich jak [https://www.speakeasy.net/speedtest/](https://www.speakeasy.net/speedtest/) . Jeśli połączenie internetowe Twojej instytucji jest wolne, to połączenia pomiędzy ERDDAP™ i zdalne źródła danych będzie powolny, a połączenia między ERDDAP™ a użytkownik będzie powolny. Czasami można to rozwiązać zatrzymując niepotrzebne korzystanie z internetu (na przykład, ludzie oglądający strumieniowe filmy wideo lub na wideokonferencyjnych rozmowach) .
         
    * Czy **połączenie internetowe użytkownika** Teraz wolno?
Niech użytkownik przeszukuje internet pod kątem "testu prędkości internetu" i użyje jednego z darmowych testów online, takich jak: [https://www.speakeasy.net/speedtest/](https://www.speakeasy.net/speedtest/) . Jeśli połączenie internetowe użytkownika jest wolne, spowalnia to ich dostęp do ERDDAP . Czasami mogą to rozwiązać, zatrzymując niepotrzebne korzystanie z internetu w ich instytucji (na przykład, ludzie oglądający strumieniowe filmy wideo lub na wideokonferencyjnych rozmowach) .
         
    *    **Utknął?**   
Zobacz [rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support) .

### Zamknij i ponownie{#shut-down-and-restart} 
*    **Jak zamknąć i ponownie Tomcat i ERDDAP™ **   
Nie musisz zamykać i restartować Tomcat i ERDDAP jeżeli ERDDAP™ jest chwilowo powolny, powolny z jakiegoś znanego powodu (jak wiele żądań ze skryptów lub WMS użytkownicy) lub zastosować zmiany datasets.xml plik.
    
Musisz zamknąć i uruchomić ponownie Tomcat i ERDDAP™ jeśli musisz zastosować zmiany w pliku setup.xml lub jeśli ERDDAP™ zamrozić, powiesić lub zamknąć. W ekstremalnych okolicznościach, Java może zamarznąć na minutę lub dwie, podczas gdy robi pełną kolekcję śmieci, ale następnie odzyskać. Więc dobrze jest poczekać minutę lub dwie, aby zobaczyć, czy Java / ERDDAP™ jest naprawdę zamrożony lub jeśli robi tylko długą kolekcję śmieci. (Jeśli kolekcja śmieci jest powszechnym problemem, [przydziela więcej pamięci Tomcat](/docs/server-admin/deploy-install#memory) .) 
    
Nie polecam korzystania z Tomcat Web Application Manager do uruchamiania lub zamykania Tomcat. Jeśli nie wyłączysz i nie uruchomisz Tomcat, prędzej czy później będziesz miał problemy z pamięcią PermGen.
    
Aby wyłączyć i ponownie uruchomić Tomcat i ERDDAP :
    
    * Jeśli używasz Linuksa lub Mac:
         (Jeśli stworzyłeś specjalnego użytkownika, aby uruchomić Tomcat, np. tomcat, pamiętaj, aby wykonać następujące kroki jako ten użytkownik.)   
         
        1. Użyj cd *tomcat* /
             
        2. Użyj ps-ef | grep tomcat znaleźć proces java / tomcat ID (Mam nadzieję, że tylko jeden proces zostanie wymieniony) , które będziemy nazywać *javaProcessid* poniżej.
             
        3. Jeśli ERDDAP™ jest zamrożony / powieszony / zamknięty, użyć zabić -3 *javaProcessid* powiedzieć Java   (który działa Tomcat) do zrobienia zrzutu wątku do pliku dziennika Tomcat: *tomcat* / logi / katalina. out. Po ponownym uruchomieniu, można zdiagnozować problem poprzez znalezienie informacji o zrzucie wątku (oraz wszelkie inne przydatne informacje powyżej) w *tomcat* / logi / katalina.out, a także czytając odpowiednie części [ ERDDAP™ archiwum dziennika](#log) . Jeśli chcesz, możesz dołączyć te informacje i zobaczyć nasze [rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support) .
             
        4. Użyj. / Wyłącz. sh
             
        5. Użyj ps-ef | grep tomcat wielokrotnie aż do procesu java / tomcat nie jest wymienione.
            
Czasami proces java / tomcat zajmie do dwóch minut, aby całkowicie wyłączyć. Powód jest taki: ERDDAP™ wysyła wiadomość do jego wątków tła, aby powiedzieć im, aby zatrzymać, ale czasami zajmuje to dużo czasu, aby dostać się do dobrego miejsca zatrzymania.
            
        6. Jeśli po kilku minutach java / tomcat nie zatrzyma się sam, możesz użyć
zabić -9 *javaProcessid*   
aby zmusić proces java / tomcat do natychmiastowego przerwania. Jeśli to możliwe, użyj tego jako ostateczności. Przełącznik -9 jest potężny, ale może powodować różne problemy.
             
        7. Aby ponownie uruchomić ERDDAP™ , use. / startup.sh
             
        8. Widok ERDDAP™ w przeglądarce, aby sprawdzić, czy restart się powiódł. (Czasami trzeba poczekać 30 sekund i spróbować załadować ERDDAP™ ponownie w przeglądarce, aby odnieść sukces.)   
             
    * Jeśli używasz systemu Windows:
         
        1. Użyj cd *tomcat* /
             
        2. Stosowanie shutdown.bat   
             
        3. Możesz chcieć / trzeba użyć menedżera zadań Windows (dostępne za pomocą Ctrl Alt Del) w celu zapewnienia, że Java Tomcat ERDDAP™ process / application został całkowicie zatrzymany.
Czasami, proces / aplikacja zajmie do dwóch minut, aby wyłączyć. Powód jest taki: ERDDAP™ wysyła wiadomość do jego wątków tła, aby powiedzieć im, aby zatrzymać, ale czasami zajmuje to dużo czasu, aby dostać się do dobrego miejsca zatrzymania.
             
        4. Aby ponownie uruchomić ERDDAP™ , use startup.bat
             
        5. Widok ERDDAP™ w przeglądarce, aby sprawdzić, czy restart się powiódł. (Czasami trzeba poczekać 30 sekund i spróbować załadować ERDDAP™ ponownie w przeglądarce, aby odnieść sukces.)   
             
### Częste katastrofy lub mrozy{#frequent-crashes-or-freezes} 
Jeśli ERDDAP™ Coś jest nie tak. Zajrzyj. [ ERDDAP plik dziennika](#log) by spróbować ustalić przyczynę. Jeśli nie możesz, proszę podać szczegóły i zobaczyć nasze [rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support) .

Najczęstszym problemem jest kłopotliwy użytkownik, który uruchamia kilka skryptów na raz i / lub ktoś składający wiele niewłaściwych wniosków. Jeśli tak się stanie, prawdopodobnie powinieneś zaczarować tego użytkownika. Kiedy użytkownik na czarnej liście składa wniosek, komunikat błędu w odpowiedzi zachęca ich do wysyłania wiadomości e-mail, aby rozwiązać problemy. Następnie, można zachęcić ich do uruchomienia tylko jeden skrypt na raz i naprawić problemy w ich skrypcie (np. żądanie danych z zdalnego zbioru danych, które nie mogą odpowiedzieć przed upływem czasu) . Zobacz&lt;requestBlacklist &gt; w Twoim datasets.xml plik] (/ docs / server- admin / datasets # requestblacklist) .

W ekstremalnych okolicznościach, Java może zamarznąć na minutę lub dwie, podczas gdy robi pełną kolekcję śmieci, ale następnie odzyskać. Więc dobrze jest poczekać minutę lub dwie, aby zobaczyć, czy Java / ERDDAP™ jest naprawdę zamrożony lub jeśli robi tylko długą kolekcję śmieci. (Jeśli kolekcja śmieci jest powszechnym problemem, [przydziela więcej pamięci Tomcat](/docs/server-admin/deploy-install#memory) .) 

Jeśli ERDDAP™ staje się powolny lub zamarza i problem nie jest kłopotliwy użytkownik lub długa kolekcja śmieci, można zwykle rozwiązać problem przez [ponowne uruchomienie ERDDAP™ ](#shut-down-and-restart) . Z doświadczenia wiem, że ERDDAP™ może biegać miesiącami bez konieczności ponownego uruchamiania.
     

### Monitor{#monitor} 
Możesz monitorować swoje ERDDAP Status, patrząc na [ /erddap/status.html strona](#status-page) w szczególności statystyki w górnej części. Jeśli ERDDAP™ staje się powolny lub zamarza i problem nie jest po prostu bardzo ciężkie wykorzystanie, można zwykle rozwiązać problem przez [ponowne uruchomienie ERDDAP™ ](#shut-down-and-restart) . Są dodatkowe pomiary dostępne przez integrację Prometeusza w / erddap / metrics.

Z doświadczenia wiem, że ERDDAP™ może biegać miesiącami bez konieczności ponownego uruchamiania. Należy go ponownie uruchomić tylko wtedy, gdy chcesz wprowadzić pewne zmiany ERDDAP setup.xml lub kiedy trzeba zainstalować nowe wersje ERDDAP™ , Java , Tomcat, lub systemu operacyjnego. Jeśli należy ponownie uruchomić ERDDAP™ Często coś jest nie tak. Zajrzyj. [ ERDDAP plik dziennika](#log) by spróbować ustalić przyczynę. Jeśli nie możesz, proszę podać szczegóły i zobaczyć nasze [rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support) . Jako tymczasowe rozwiązanie, można spróbować użyć [Monit](https://mmonit.com/monit/) do monitorowania ERDDAP™ i uruchomić ponownie w razie potrzeby. Albo, mógłbyś zrobić cron job, aby ponownie rozpocząć ERDDAP™   (aktywnie) okresowo. To może być trochę trudne napisać skrypt do automatyzacji monitorowania i ponownego uruchomienia ERDDAP . Niektóre wskazówki, które mogą pomóc:

* Można uprościć testy, jeśli proces Tomcat jest nadal uruchomiony za pomocą przełącznika -c z grepem:
p-u *tomcat Użytkownik*   | grep -c java
To zmniejszy wyjście do "1", jeśli proces tomcat jest nadal żywy, lub "0", jeśli proces został zatrzymany.
     
* Jeśli jesteś dobry z gawk, można pobrać procesID z wyników
p-u *tomcat Użytkownik*   | grep java i użyj procesID w innych wierszach skryptu.
     

Jeśli skonfigurujesz Monita lub pracę cron, byłoby świetnie, gdybyś mógł podzielić się szczegółami, aby inni mogli skorzystać na naszym [rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support) gdzie możesz się podzielić.

#### Permgen{#permgen} 
Jeśli wielokrotnie korzystać z Tomcat Manager ponownie (lub Stop i Start)   ERDDAP™ , ERDDAP™ może nie zacząć i rzucić java.lang. OutOfMemoryError: PermGen. Roztwór należy podawać okresowo. (Czy za każdym razem?)   [wyłączyć i ponownie uruchomić tomcat i ERDDAP™ ](#shut-down-and-restart) , zamiast tylko przeładować ERDDAP .
 \\[ Aktualizacja: Ten problem został znacznie zminimalizowany lub naprawiony w ERDDAP™ wersja 1.24. \\]   
     
#### Dziennik{#log} 
*    ** [log.txt](#log) **   
Jeśli ERDDAP™ nie uruchamia się lub jeśli coś nie działa zgodnie z oczekiwaniami, jest bardzo przydatne, aby spojrzeć na błąd i wiadomości diagnostyczne w ERDDAP™ Zaloguj plik.
    * Plik dziennika jest *bigParentDirectory* / logs / log.txt
         ( *bigParentDirectory* jest określony w [setup.xml](/docs/server-admin/deploy-install#setupxml) ) . Jeśli nie ma dziennika. plik txt lub jeśli logarytm. plik txt nie został zaktualizowany od czasu ponownego uruchomienia ERDDAP™ , spójrz w [Pliki dziennika Tomcat](#tomcat-logs) sprawdzić, czy jest tam komunikat błędu.
    * Rodzaje wiadomości diagnostycznych w pliku dziennika:
        * Słowo "błąd" jest używane, gdy coś poszło tak źle, że procedura nie została zakończona. Chociaż to irytujące, aby uzyskać błąd, błąd zmusza do rozwiązania problemu. Myślimy, że lepiej rzucić błąd, niż mieć ERDDAP™ Nie spodziewałeś się tego.
        * Słowo "ostrzeżenie" jest używane, gdy coś poszło nie tak, ale procedura została zakończona. Są dość rzadkie.
        * Wszystko inne to tylko pouczająca wiadomość. Możesz kontrolować ile informacji jest zalogowanych z [&lt;logLevel &gt;] (/ docs / server- admin / datasets # loglevel)   datasets.xml .
        * Przeładunki danych i odpowiedzi użytkowników, które wymagają &gt; 10 sekund do zakończenia (pomyślnie lub nieskutecznie) są oznaczone " (&gt; 10&#33;) ". W ten sposób można przeszukać plik log.txt, aby znaleźć te zbiory danych, które były wolne do ponownego załadowania lub liczbę żądań, które były wolne do zakończenia. Następnie można spojrzeć wyżej w pliku log.txt, aby zobaczyć, jaki był problem z zbiorem danych lub jakie było żądanie użytkownika i z kogo pochodził. Te powolne ładunki zbioru danych i żądania użytkowników są czasami opodatkowane ERDDAP . Wiedząc więcej o tych prośbach, możesz zidentyfikować i rozwiązać problemy.
    * Informacje są zapisywane do pliku dziennika na dysku w dość dużych kawałkach. Zaletą jest to, że jest to bardzo wydajne -- ERDDAP™ nigdy nie zablokuje oczekiwania na zapisanie informacji do pliku dziennika. Wadą jest to, że dziennik prawie zawsze kończy się częściową wiadomością, która nie zostanie zakończona, dopóki następny kawałek nie zostanie napisany. You can make it up-to-date (na chwilę) poprzez oglądanie ERDDAP status strony internetowej na stroniehttps://*your.domain.org*/erddap/status.html  (lub http:// jeżeli https nie jest włączona) .
    * Kiedy pliki log.txt osiągną wartość 20 MB,
plik jest zmieniany na log. txt.poprzedni i nowy plik log.txt jest tworzony. Więc pliki dziennika się nie gromadzą.
        
W setup.xml możesz określić inny maksymalny rozmiar pliku dziennika w MegaBytes. Minimalna dopuszczalna wartość to 1 (MB) . Maksymalna dopuszczalna wartość to 2000 (MB) . Domyślnie 20 (MB) . Na przykład:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * Ilekroć zaczynasz ponownie ERDDAP™ ,
         ERDDAP™ tworzy kopię archiwum log.txt i log. txt.poprzednie pliki ze znacznikiem czasu w nazwie pliku. Jeśli były problemy przed ponownym uruchomieniem, może być przydatne, aby przeanalizować te archiwizowane pliki dla wskazówek co do tego, co problem był. Możesz usunąć pliki archiwalne, jeśli nie są już potrzebne.
         
##### Parsing log.txt{#parsing-logtxt} 
 ERDDAP Dziennik. plik txt nie jest przeznaczony do parsowania (chociaż możesz być w stanie utworzyć wyrażenia regularne, które wyciąga żądane informacje) . Ma pomóc człowiekowi zrozumieć, co się dzieje, gdy coś jest nie tak. Po przesłaniu zgłoszenia błędu lub problemu do ERDDAP™ developerzy, jeśli to możliwe, prosimy o włączenie wszystkich informacji z pliku log.txt związanych z kłopotliwym żądaniem.

Ze względu na efektywność, ERDDAP™ Tylko zapisuje informacje do logowania. txt po dużej części informacji zgromadził. Więc jeśli odwiedzisz dziennik. txt zaraz po wystąpieniu błędu informacje dotyczące błędu mogą nie być jeszcze zapisane na log.txt. Aby uzyskać doskonale up- to- date informacji z log.txt, odwiedź swój ERDDAP jest [strona status.html](#status-page) . Kiedy ERDDAP™ Procesy, które wymagają, przerzuca wszystkie oczekujące informacje do log.txt.

Dla ERDDAP™ statystyki wykorzystania, proszę użyć [Pliki dziennika Apache i / lub Tomcat](#tomcat-logs) zamiast ERDDAP log.txt. Zauważ, że ERDDAP jest [strona status.html](#status-page)   (niektóre) oraz [Sprawozdanie dzienne](#daily-report)   (więcej) mieć dużą liczbę statystyk użycia prekalkulowane dla Ciebie.
    
### Zapisy Tomcat{#tomcat-logs} 
Jeśli ERDDAP™ nie uruchamia się ponieważ błąd wystąpił bardzo wcześnie ERDDAP Uruchomienie, komunikat błędu pojawi się w plikach dziennika Tomcat ( *tomcat* / logi / katalina. *dzisiaj* .log lub *tomcat* / logi / katalina. out) , nie w [ ERDDAP plik log.txt](#log) .

Statystyki użytkowania: Dla większości informacji, które ludzie chcą zebrać z pliku dziennika (np. statystyki wykorzystania) , proszę użyć plików dziennika Apache i / lub Tomcat. Są one ładnie sformatowane i mają tego typu informacje. Istnieje wiele narzędzi do ich analizy, na przykład, [AWStats](https://www.awstats.org) , [ElasticSearch 's Kibana](https://www.elastic.co/products/kibana) oraz [JMeter](https://jmeter.apache.org) , ale przeszukaj sieć, aby znaleźć odpowiednie narzędzie dla swoich celów.

Zauważ, że pliki dziennika identyfikują tylko użytkowników jako adresy IP. Istnieją strony internetowe, które pomogą Ci uzyskać informacje związane z danym adresem IP, np.: [WhatISMyIPAddress](https://whatismyipaddress.com/ip-lookup) , ale normalnie nie będzie w stanie znaleźć nazwę użytkownika.

Również, z powodu [DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol) , adres IP danego użytkownika może być inny w różnych dniach lub różni użytkownicy mogą mieć ten sam adres IP w różnych okresach.

Alternatywnie, można użyć czegoś takiego jak [Google Analytics](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision) . Ale uważaj: podczas korzystania z zewnętrznych usług, takich jak Google Analytics, rezygnujesz z prywatności użytkowników, dając Google pełny dostęp do ich działalności na swojej stronie, która Google (A inni?) może zachować na zawsze i używać do każdego celu (być może nie technicznie, ale prawdopodobnie w praktyce) . Użytkownicy nie zgodzili się na to i prawdopodobnie nie są świadomi, że zostaną śledzeni na Twojej stronie internetowej, tak jak prawdopodobnie nie są świadomi stopnia, w jakim są śledzeni na prawie wszystkich stronach internetowych. Obecnie wielu użytkowników jest bardzo zaniepokojonych, że wszystko, co robią w sieci jest monitorowane przez te duże firmy (Google, Facebook, itp.) i przez rząd, i znaleźć to nieuzasadnione wtargnięcie w ich życie (jak w książce, 1984) . To skłoniło wielu użytkowników do instalowania produktów takich jak [Prywatność Badger](https://www.eff.org/privacybadger/faq) aby zminimalizować śledzenie, używać alternatywnych przeglądarek takich jak [Przeglądarka Tor](https://www.torproject.org/)   (lub wyłączyć śledzenie w tradycyjnych przeglądarkach) oraz do korzystania z alternatywnych wyszukiwarek takich jak [Kaczka Kaczka Idź](https://duckduckgo.com/) . Jeśli korzystasz z usług takich jak Google Analytics, należy przynajmniej udokumentować ich wykorzystanie i konsekwencje przez zmianę&lt;standard PrivacyPolicy &gt; tag in ERDDAP jest
 \\[ tomcat \\] / webapps / erddap / WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml file.
    
### Dziennik poczty e- mail{#e-mail-log} 
*    **emailLogYEAR- MM- DD.txt**   
     ERDDAP™ zawsze pisze tekst wszystkich wychodzących wiadomości e-mail w aktualnym e-mailu Plik LogYEAR- MM- DD.txt *bigParentDirectory* / dzienniki ( *bigParentDirectory* jest określony w [setup.xml](/docs/server-admin/deploy-install#setupxml) ) .
    * Jeśli serwer nie może wysyłać wiadomości e-mail lub jeśli skonfigurowano ERDDAP™ nie wysyłać wiadomości e-mail, lub jeśli jesteś po prostu ciekawy, ten plik jest wygodnym sposobem, aby zobaczyć wszystkie wiadomości e-mail, które zostały wysłane.
    * Możesz usunąć pliki e-mail z poprzednich dni, jeśli nie są już potrzebne.
         
### Sprawozdanie dzienne{#daily-report} 
Raport dzienny zawiera wiele przydatnych informacji -- wszystkie informacje z Twojego ERDDAP jest [ /erddap/status.html strona](#status-page) i więcej.
    * Jest to najbardziej kompletne podsumowanie ERDDAP Status.
    * Między innymi, zawiera listę zbiorów danych, które nie załadowały i wyjątki, które wygenerowali.
    * Jest generowany, gdy zaczynasz ERDDAP™   (zaraz po ERDDAP™ kończy próby wczytania wszystkich zbiorów danych) i generowane wkrótce po 7: 00 czasu lokalnego każdego ranka.
    * Ilekroć jest generowane, jest zapisywane do [ ERDDAP plik log.txt](#log) .
    * Ilekroć jest generowany, jest on wysyłany do&lt;emailDailyReportsTo &gt; oraz&lt;email Everything Do &gt; (które są określone w [setup.xml](/docs/server-admin/deploy-install#setupxml) ) pod warunkiem, że skonfigurowałeś system e-mail (w setup.xml) .

### Strona statusu{#status-page} 
Możesz zobaczyć status swojego ERDDAP™ z dowolnej przeglądarki, idąc do&lt;BaseUrl &gt; /erddap/status.html 
* Ta strona jest generowana dynamicznie, więc zawsze ma up-to-the-moment statystyki dla ERDDAP .
* Zawiera statystyki dotyczące liczby żądań, wykorzystania pamięci, śladów stosu nici, taskThread itp.
* Ponieważ strona Status może być oglądane przez każdego, nie zawiera tak dużo informacji jak [Sprawozdanie dzienne](#daily-report) .
         
### Dodawanie / zmienianie zbiorów danych{#addingchanging-datasets} 
 ERDDAP™ zazwyczaj odczytuje datasets.xml co *loadDatasetsMinMinMinMinutes*   (określone w [setup.xml](/docs/server-admin/deploy-install#setupxml) ) . Więc możesz dokonać zmian w datasets.xml kiedykolwiek, nawet w czasie ERDDAP™ Ucieka.
Nowy zestaw danych zostanie wkrótce wykryty, zwykle w *loadDatasetsMinMinMinMinutes* .
Zmieniony zestaw danych zostanie ponownie załadowany, gdy jest *Przeładowanie EveryNMinutes* stary (jak określono w datasets.xml ) .
    
#### Flaga{#flag} 
*    ** [Plik flagi](#flag) Opowieści ERDDAP™ spróbować ponownie uruchomić zestaw danych tak szybko jak to możliwe** 
    
    *    ERDDAP™ nie zauważy żadnych zmian w konfiguracji zbioru danych w datasets.xml do ERDDAP™ Przeładowuje zestaw danych.
         
    * To tell ERDDAP™ aby jak najszybciej przeładować zestaw danych (przed zbiorem danych&lt;reloadEveryNMinutes &gt; spowoduje przeładowanie), umieścić plik w *bigParentDirectory* / flaga ( *bigParentDirectory* jest określony w [setup.xml](/docs/server-admin/deploy-install#setupxml) ) który ma taką samą nazwę jak zbiór danych datasetID .
To mówi ERDDAP™ spróbować przeładować ten zestaw danych jak najszybciej.
Dawna wersja zbioru danych pozostanie dostępna dla użytkowników do czasu, aż nowa wersja będzie dostępna i zamieniona atomicznie na miejsce.
Dla EDDGrid Pliki FromFiles i EDDTable Pliki FromFiles, reloading dataset poszuka nowych lub zmienionych plików, przeczytaj je i wprowadź je do zbioru danych. Czas przeładowania zależy od liczby nowych lub zmienionych plików.
Jeśli zbiór danych ma aktywny = "false", ERDDAP™ usunie zbiór danych.
         
##### Zła flaga plików{#bad-files-flag} 
* Jednym z wariantów katalogu / flag jest katalog / badFilesFlag. (Dodano ERDDAP™ v2.12.)   
Jeśli umieścisz plik w *bigParentDirectory* / badFilesFlag z katalogiem datasetID jako nazwa pliku (zawartość pliku nie ma znaczenia) , wtedy jak tylko ERDDAP™ widzi pliki badFiles plik flagi, ERDDAP™ będzie:
    
    1. Usuń plik badFilesFlag.
    2. Usuń pliki błędów .nc plik (jeśli istnieje) , który ma listę złych plików do tego zbioru danych.
Dla zbiorów danych takich jak EDDGrid SideBySide, które mają dzieci Datasets, to również usuwa pliki badFiles .nc plik dla wszystkich zbiorów danych dotyczących dzieci.
    3. Przeładuj zestaw danych jak najszybciej.
    
Tak więc, to powoduje ERDDAP™ spróbować ponownie pracować z plikami wcześniej (mylnie?) oznaczone jako złe.
         
##### Twarda flaga{#hard-flag} 
* Innym wariantem katalogu / flag jest katalog / hardFlag. (Dodano ERDDAP™ v1.74. s.)   
Jeśli włożysz plik *bigParentDirectory* / hardFlag z datasetID jako nazwa pliku (zawartość pliku nie ma znaczenia) , wtedy jak tylko ERDDAP™ widzi twardo plik flagi, ERDDAP™ będzie:
    
    1. Usuń plik hardFlag.
    2. Usuń zbiór danych z ERDDAP .
    3. Usuń wszystkie informacje, które ERDDAP™ ma przechowywane o tym zbiorze danych.
Dla EDDGrid Pliki FromFiles i EDDTable Podklasy FromFiles, usuwa wewnętrzną bazę danych plików i ich zawartość.
Dla zbiorów danych takich jak EDDGrid SideBySide, które mają dzieci Datasets, to również usuwa wewnętrzną bazę danych plików danych i ich zawartość dla wszystkich zbiorów danych dzieci.
    4. Przeładuj zestaw danych.
Dla EDDGrid Pliki FromFiles i EDDTable Podklasy FromFiles, to powoduje ERDDAP™ do ponownego odczytu **wszystkie** plików danych. Tak więc czas przeładowania zależy od całkowitej liczby plików danych w zbiorze danych. Ponieważ zbiór danych został usunięty z ERDDAP™ kiedy zostanie zauważona hardFlag, zbiór danych będzie niedostępny do czasu aż zestaw danych zakończy się przeładowaniem. Cierpliwości. Spójrz w [log.txt](#log) Jeśli chcesz zobaczyć, co się dzieje.
    
Wariant hardFlag usuwa przechowywane informacje o zbiorze danych, nawet jeśli zbiór danych nie jest aktualnie wczytywany ERDDAP .
    
Twarda Flagi są bardzo przydatne, gdy robisz coś, co powoduje zmianę w jaki sposób ERDDAP™ odczytuje i interpretuje dane źródłowe, na przykład po zainstalowaniu nowej wersji ERDDAP™ lub po dokonaniu zmiany w definicji zbioru danych w datasets.xml 
    
* Zawartość flagi, znaczników i plików hardFlag nie ma znaczenia. ERDDAP™ Wystarczy spojrzeć na nazwę pliku, aby uzyskać datasetID .
     
* pomiędzy głównymi przeładowaniami zbioru danych, ERDDAP™ stale szuka flag, plików BadFilesFlag i hardFlag.
     
* Zauważ, że kiedy zestaw danych jest ponownie załadowany, wszystkie pliki w *bigParentDirectory* / [cache](#cached-responses) / * datasetID * katalog został usunięty. Obejmuje to: .nc i pliki obrazkowe, które są zwykle buforowane przez ~ 15 minut.
     
* Należy zauważyć, że jeśli zestaw danych zawiera xml [aktywny = "fałszywy"](/docs/server-admin/datasets#active) , flaga spowoduje nieaktywny zestaw danych (jeśli jest aktywny) i w każdym razie nie przeładowany.
     
* Kiedykolwiek ERDDAP™ uruchamia LoadDatasets do wykonania dużego przeładowania (czasowe przeładowanie kontrolowane przez&lt;loadDatasetsMinMinMinMinMint &gt;) lub niewielkie przeładowanie (w wyniku flagi zewnętrznej lub wewnętrznej) , ERDDAP™ czyta wszystkie&lt;dekompresjedCacheMaxGB &gt;,&lt;dekompresja CacheMaxMinutesOld &gt;,&lt;użytkownik &gt;,&lt;requestBlacklist &gt;,&lt;slow DownTroubleMillis &gt;, oraz&lt;subscriptionEmailBlacklist &gt; tagi i przełączniki do nowych ustawień. Więc możesz użyć flagi jako sposobu na uzyskanie ERDDAP™ by jak najszybciej zauważyć zmiany w tych znacznikach.

##### Ustaw flagę danych{#set-dataset-flag} 
*   ERDDAP™ ma usługę internetową, dzięki której flagi mogą być ustawiane za pomocą adresów URL.
    
    * Na przykład:
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
         (To fałszywa flaga. Klucz) ustawi flagę dla zbioru danych rPmelTao.
    * Istnieje inny flagKey dla każdego datasetID .
    * Administratorzy mogą zobaczyć listę adresów URL flag dla wszystkich zbiorów danych patrząc na dole ich [Sprawozdanie dzienne](#daily-report) e-mail.
    * Administratorzy powinni traktować te adresy URL jako poufne, ponieważ dają komuś prawo do zresetowania zbioru danych na życzenie.
    * Jeśli myślisz, że flagi wpadły w ręce kogoś, kto je wykorzystuje, możesz się zmienić.&lt;flagKeyKey &gt; in [setup.xml](/docs/server-admin/deploy-install#setupxml) i ponownie uruchomić ERDDAP do siły ERDDAP™ generować i używać innego zestawu flag.
    * Jeśli zmienisz&lt;flagKeyKey &gt;, usunąć wszystkie stare subskrypcje (zobacz listę w swoim dziennym raporcie) i pamiętaj, aby wysłać nowe adresy URL do ludzi, którzy chcą je mieć.
    
System flag może służyć jako podstawa dla bardziej efektywnego mechanizmu informowania ERDDAP™ kiedy przeładować zestaw danych. Na przykład, możesz ustawić zbiór danych&lt;przeładowanie EveryNMinutes &gt; do dużej liczby (np. 10080 = 1 tydzień) . Wtedy, kiedy wiesz, że zbiór danych się zmienił (Może dlatego, że dodałeś plik do katalogu danych) , ustawić flagę tak, aby zestaw danych został przeładowany jak najszybciej. Flagi są zwykle widoczne szybko. Ale jeśli wątek LoadDatasets jest już zajęty, może minąć trochę czasu zanim będzie dostępny do działania na fladze. Ale system flag jest dużo bardziej reagujący i dużo bardziej wydajny niż ustawienie&lt;reloadEveryNMinutes &gt; do małej liczby.
    
#### Usuwanie zbiorów danych{#removing-datasets} 
Jeśli zbiór danych jest aktywny w ERDDAP™ i chcesz go wyłączyć tymczasowo lub na stałe:
1. W datasets.xml dla zbioru danych, set [aktywny = "fałszywy"](/docs/server-admin/datasets#active) w znaczniku danych.
2. Czekaj. ERDDAP™ usunięcie zbioru danych podczas następnego dużego przeładowania lub [ustawić flagę](#flag) dla zbioru danych, aby powiedzieć ERDDAP™ jak najszybciej zauważyć tę zmianę. Kiedy to robisz, ERDDAP™ nie wyrzuca żadnych informacji, które mógł przechowywać o zbiorze danych i na pewno nie robi nic z prawdziwymi danymi.
3. Następnie możesz zostawić aktywny = "false" dataset w datasets.xml lub usunąć.
         
#### When Are Datasets Reloaded?{#when-are-datasets-reloaded} 
Wątek o nazwie RunLoadDatasets jest głównym gwintem, który steruje przy przeładowaniu zbiorów danych. Obciążenie Pętle danych na zawsze:

1. RunLoadDatasets zapisuje bieżący czas.
2. RunLoadDatasets uruchamia wątek LoadDatasets, aby wykonać "majorLoad". Możesz zobaczyć informacje na temat bieżącego / poprzedniego majorLoad na górze ERDDAP jest
     [ /erddap/status.html strona](#status-page)   (na przykład: [Przykład strony statusu](https://coastwatch.pfeg.noaa.gov/erddap/status.html) ) .
    
    1. LoadDatasets robi kopię datasets.xml .
    2. LoadDatasets odczytuje przez kopię datasets.xml oraz, dla każdego zbioru danych, sprawdza, czy zestaw danych musi być (do) załadowane lub usunięte.
        * Jeśli [bandera](#flag) plik istnieje dla tego zbioru danych, plik jest usuwany, a zbiór danych jest usuwany jeśli aktywny = "false" lub (do) załadowany jeśli aktywny = "true" (niezależnie od wieku zbioru danych) .
        * Jeśli plik dataset.xml jest aktywny = "false" i zbiór danych jest aktualnie wczytywany (aktywny) , jest rozładowany (usunięty) .
        * Jeśli zbiór danych ma aktywny = "true", a zbiór danych nie jest już załadowany, jest wczytany.
        * Jeśli zbiór danych jest aktywny = "true" i zbiór danych jest już załadowany, to zbiór danych jest ponownie wczytywany, jeśli zbiór danych ma wiek (czas od ostatniego obciążenia) jest większa niż&lt;przeładowanie Każdy protokół &gt; (domyślnie = 10080 minut) W przeciwnym razie, zestaw danych jest pozostawiony w spokoju.
    3. LoadDatasets kończy.
    
Nić RunLoadDatasets czeka na zakończenie wątku LoadDatasets. Jeśli LoadDatasets trwa dłużej niż loadDatasets Minutes (jak określono w setup.xml) , RunLoadDatasets przerywa wątek LoadDatasets. Idealnie, LoadDatasets zauważa przerwanie i zakończenie. Ale jeśli nie zauważy przerwania w ciągu minuty, RunLoadDatasets wzywa loadDatasets. stop () co jest niepożądane.
3. Podczas gdy czas od rozpoczęcia ostatniego głównego obciążenia jest mniejszy niż loadDatasets Minutes (jak określono w setup.xml, np. 15 minut) , RunLoadDatasets wielokrotnie szuka [bandera](#flag) plików w *bigParentDirectory* / katalog flag. Jeśli znaleziono jeden lub więcej plików flagi, są one usuwane, a RunLoadDatasets uruchamia wątek LoadDatasets, aby wykonać "MinorLoad" (majorLoad = false) . Nie można zobaczyć MinorLoad informacji na temat ERDDAP jest [ /erddap/status.html strona](#status-page) .
    1. LoadDatasets robi kopię datasets.xml .
    2. LoadDatasets odczytuje przez kopię datasets.xml oraz, dla każdego zbioru danych, dla którego istniał plik flagi:
        * Jeśli plik dataset.xml jest aktywny = "false" i zbiór danych jest aktualnie wczytywany (aktywny) , jest rozładowany (usunięty) .
        * Jeśli zbiór danych ma aktywny = "true", zbiór danych jest (do) załadowany, niezależnie od wieku. Zestawy danych bez znaczników są ignorowane.
    3. LoadDatasets kończy.
4. Obciążenie Dane wracają do pierwszego etapu.

Uwagi:
* Uruchomienie
Po ponownym uruchomieniu ERDDAP™ , każdy zbiór danych z aktywnym = "true" jest wczytany.
* Cache
Kiedy zestaw danych jest (do) załadowany, jego pamięci podręcznej (w tym wszelkie pliki odpowiedzi na dane lub pliki obrazów) jest opróżniona.
* Mnóstwo danych
Jeśli masz wiele zbiorów danych i / lub jeden lub więcej zbiorów danych są powolne (do) ładowność, nić LoadDatasets może zająć dużo czasu, aby zakończyć swoją pracę, być może nawet dłużej niż LoadDatasets Minutes.
* One LoadDatasets Thread
Nie ma nigdy więcej niż jeden gwint LoadDatasets uruchomiony jednocześnie. Jeśli flaga jest ustawiona, gdy LoadDatasets jest już uruchomiony, flaga prawdopodobnie nie będzie zauważona lub działająca do czasu zakończenia wątku LoadDatasets. Można powiedzieć: "To głupie. Dlaczego po prostu nie uruchomisz kilku nowych wątków do wczytania zbiorów danych?" Ale jeśli masz wiele zbiorów danych, które pobierają dane z jednego zdalnego serwera, nawet jeden wątek LoadDatasets spowoduje znaczny stres na zdalnym serwerze. To samo jest prawdą, jeśli masz wiele zbiorów danych, które otrzymują dane z plików na jednym RAID. Istnieje szybko malejące zyski z posiadania więcej niż jednego wątku LoadDatasets.
* Flaga = ASAP
Ustawienie flagi sygnalizuje, że zbiór danych powinien być (do) załadowany jak najszybciej, niekoniecznie natychmiast. Jeśli wątek LoadDatasets nie jest aktualnie uruchomiony, zbiór danych rozpocznie się ponownie w ciągu kilku sekund. Ale jeśli wątek LoadDatasets jest aktualnie uruchomiony, to prawdopodobnie nie zostanie przeładowany, dopóki ten wątek nie zostanie zakończony.
* Plik flagi usunięty
Ogólnie, jeśli umieścić plik flagi w *bigParentDirectory* Katalog / erddap / flag (odwiedzając flagę zbioru danych Url lub umieszczenie tam pliku) , zbiór danych będzie zazwyczaj ponownie załadowany bardzo szybko po usunięciu tego pliku flagi.
* Flaga kontra małe przeładowanie Każdy protokół
Jeśli masz jakiś zewnętrzny sposób wiedzy, kiedy zestaw danych musi być ponownie załadowany i jeśli jest to dla Ciebie wygodne, najlepszym sposobem, aby upewnić się, że zestaw danych jest zawsze up- to- date jest ustawić jego przeładowanie Każdy protokół do dużej liczby (10080?) i ustawić flagę (przez scenariusz?) zawsze, gdy trzeba go przeładować. To jest system, który EDDGrid FromErddap i EDDTableFromErddap korzystają z komunikatów, które należy ponownie załadować.
* Look in log.txt
Wiele istotnych informacji jest pisanych do *bigParentDirectory* / logs / log.txt file. Jeśli sprawy nie działają tak, jak się spodziewasz, patrząc na dziennik. txt pozwala zdiagnozować problem, dowiadując się dokładnie co ERDDAP™ Tak.
    
    * Szukaj "majorLoad = true" dla rozpoczęcia głównych wątków LoadDataset.
    * Szukaj "majorLoad = false" dla początków wątków LoadDatasets.
    * Szukaj danego zbioru danych datasetID w celu uzyskania informacji o jego istnieniu (do) załadowane lub zadane.
        
          
         
#### Odpowiedzi buforowe{#cached-responses} 
Ogólnie, ERDDAP™ nie buforuje (przechowywać) odpowiedzi na zapytania użytkowników. Powodem było to, że większość wniosków będzie nieco inna, więc cache nie będzie zbyt skuteczne. Największe wyjątki to prośby o pliki obrazkowe (które są buforowane od przeglądarek i programów takich jak Google Earth często request obrazy) oraz wnioski .nc pliki (ponieważ nie mogą być stworzone na-muchy) . ERDDAP™ przechowuje pliki buforowane każdego zbioru danych w innym katalogu: *bigParentDirectory* / cache / * datasetID * ponieważ jeden katalog pamięci podręcznej może mieć ogromną liczbę plików, które mogą stać się wolne w dostępie.
Pliki są usuwane z pamięci podręcznej z jednego z trzech powodów:
* Wszystkie pliki w tym pamięci podręcznej są usuwane, gdy ERDDAP™ jest ponownie uruchomiony.
* Okresowo, każdy plik więcej niż&lt;kapsułki &gt; stare (jak określono w [setup.xml](/docs/server-admin/deploy-install#setupxml) ) zostaną usunięte. Usuwanie plików w pamięci podręcznej w zależności od wieku (nie Lest- Recent - Używane) zapewnia, że pliki nie pozostaną w pamięci podręcznej zbyt długo. Chociaż może się wydawać, że dana prośba powinna zawsze odpowiadać tak samo, to nie jest to prawda. Na przykład tabledap wniosek zawierający & czas &gt; *niektóre Czas* zmieni się, jeśli nowe dane przybędą do zbioru danych. I żądanie griddap, które obejmuje \\[ ostatni \\] dla wymiaru czasu zmieni się, jeśli nowe dane przybędą do zbioru danych.
* Obrazy pokazujące warunki błędu są buforowane, ale tylko przez kilka minut (To trudna sytuacja.) .
* Za każdym razem, gdy zestaw danych jest ponownie wczytywany, wszystkie pliki w tym zbiorze są usuwane. Ponieważ wnioski mogą być dla "last" indeks w zestawie danych z zapiskami, pliki w pamięci podręcznej mogą stać się niepoprawne przy ponownym załadowaniu zestawu danych.
         
#### Przechowywane dane{#stored-dataset-information} 
Dla wszystkich typów zbiorów danych, ERDDAP™ gromadzi wiele informacji, gdy zestaw danych jest załadowany i przechowuje je w pamięci. Pozwala ERDDAP™ bardzo szybko reagować na wyszukiwanie, prośby o listy zbiorów danych oraz prośby o informacje o zbiorze danych.

Dla kilku typów zbiorów danych (w szczególności EDDGrid Zrozumiałem, EDDTableCopy, EDDGrid Od *Xxx* Pliki i EDDTableFrom *Xxx* Pliki) , ERDDAP™ przechowuje na dysku pewne informacje o zbiorze danych, który jest ponownie używany przy ponownym załadowaniu zbioru danych. To znacznie przyspiesza proces przeładowywania.

* Niektóre pliki informacyjne z zestawem danych są czytelne dla ludzi .json pliki i są przechowywane w *bigParentDirectory* / zbiór danych / *last2LettersOfDatasetiID / datasetID * .
*    ERDDAP™ Usuwa te pliki tylko w nietypowych sytuacjach, np. jeśli dodasz lub usuniesz zmienną z zbioru danych datasets.xml Chunk.
* Większość zmian w zbiorze danych datasets.xml cząstka (np. zmiana atrybutu globalnego lub atrybutu zmiennej) Nie musisz usuwać tych plików. Regularne przeładowanie zbioru danych będzie obsługiwać tego rodzaju zmiany. Możesz powiedzieć ERDDAP™ aby przeładować zestaw danych ASAP poprzez ustawienie [bandera](#flag) dla zbioru danych.
* Podobnie, dodawanie, usuwanie lub zmiana plików danych będą obsługiwane, gdy ERDDAP™ Przeładowuje zestaw danych. Ale... ERDDAP™ będzie zauważyć ten typ zmiany wkrótce i automatycznie, jeśli zestaw danych jest za pomocą [&lt;updateEveryNMillis &gt;] (/ docs / server- admin / datasets # updateeevernmillis) system.
* Tylko rzadko powinno być konieczne usunięcie tych plików. Najczęstsza sytuacja, w której trzeba zmusić ERDDAP™ usunięcie przechowywanych informacji (ponieważ jest poza - of- date / nieprawidłowy i nie będzie automatycznie naprawiany przez ERDDAP ) jest kiedy dokonujesz zmian w zbiorze danych datasets.xml kawałek, który wpływa jak ERDDAP™ interpretuje dane w plikach danych źródłowych, na przykład zmieniając łańcuch formatu zmiennej czasu.
* Usuwanie przechowywanych plików informacyjnych zbioru danych z ERDDAP™ To działa. (nawet jeśli zbiór danych nie jest aktualnie załadowany) , set a [twarde Flaga](#hard-flag) dla tego zbioru danych. Pamiętaj, że jeśli zbiór danych jest agregacją dużej liczby plików, przeładowanie zbioru danych może zająć dużo czasu.
* Usuwanie przechowywanych plików informacyjnych zbioru danych ERDDAP™ nie biegnie, biegnie [DasDs](/docs/server-admin/datasets#dasdds) dla tego zbioru danych (co jest łatwiejsze niż ustalenie, w którym katalogu znajduje się informacja i usunięcie plików ręcznie) . Pamiętaj, że jeśli zbiór danych jest agregacją dużej liczby plików, przeładowanie zbioru danych może zająć dużo czasu.
         
### Stan pamięci{#memory-status} 
 ERDDAP™ Nigdy nie powinno się rozbić ani zamarznąć. Jeśli tak, jedną z najbardziej prawdopodobnych przyczyn jest niewystarczająca pamięć. Można monitorować wykorzystanie pamięci patrząc na stronę status.html, która zawiera linię jak

0 gc połączeń, 0 wniosków rzucić, i 0 niebezpieczne MemoryEmail od ostatniego głównego LoadDatasets

 (są to coraz poważniejsze wydarzenia)   
oraz MB inUse i gc Wzywa kolumny w tabeli statystyki. Możesz powiedzieć, jak zapamiętanie - podkreślił ERDDAP™ jest przez oglądanie tych liczb. Wyższa liczba wskazuje na większy stres.

* Zużycie MB powinno być zawsze mniejsze niż połowa [\\ -Xmx ustawienia pamięci](/docs/server-admin/deploy-install#memory) . Większe liczby to zły znak.
* gc połączeń wskazuje liczbę razy ERDDAP™ Zadzwonił do zbieracza śmieci, żeby zmniejszyć zużycie pamięci. Jeśli to będzie &gt; 100, to będzie oznaka poważnych kłopotów.
* stodoła wskazuje liczbę wniosków, które zostały zrzucone (z numerem błędu HTTP 503, Usługa niedostępna) Ponieważ użycie pamięci było już zbyt wysokie. W najlepszym wypadku nie należy odrzucać żadnych wniosków. Nie ma nic złego w odrzucaniu kilku próśb, ale to oznaka poważnych problemów, jeśli wielu z nich zostanie zrzuconych.
* niebezpieczne MemoryEmail - Jeśli użycie pamięci staje się niebezpiecznie wysokie, ERDDAP™ wysyła e-mail na adresy email wymienione w&lt;email Everything Do &gt; (w setup.xml) z listą aktywnych żądań użytkowników. Jak pisze e-mail, proszę przekazać te e-maile Chrisowi. John w Noah. gov więc możemy wykorzystać informacje do poprawy przyszłych wersji ERDDAP .
     

Jeśli u pacjenta występuje ERDDAP™ jest pamięta- podkreślił:
* Rozważ przypisanie większej ilości pamięci serwera do ERDDAP™ zmieniając Tomcata [Ustawienia pamięci-Xmx](/docs/server-admin/deploy-install#memory) .
* Jeśli już przydzieliłeś tyle pamięci ile się dało ERDDAP™ via -Xmx, rozważ zakup większej ilości pamięci dla serwera. Pamięć jest tania. (w porównaniu do ceny nowego serwera lub czasu) &#33; Następnie zwiększyć -Xmx.
* W datasets.xml , set&lt;nGridThreads &gt; do 1, set&lt;nTableThreads &gt; do 1 i ustawić&lt;ipAdressMaxRequestsActive &gt; do 1.
* Spójrz na żądania w log.txt dla nieefektywne lub kłopotliwe (ale legalne) żądania. Dodaj ich adresy IP do&lt;requestBlacklist &gt; w datasets.xml . Komunikat błędu czarnej listy zawiera ERDDAP™ adres e-mail administratora z nadzieją, że ci użytkownicy skontaktują się z Tobą tak, że można pracować z nimi do wykorzystania ERDDAP™ skuteczniej. Dobrze jest zachować listę adresów IP na czarnej liście i dlaczego, tak, że można pracować z użytkownikami, jeśli się z Tobą skontaktują.
* Spójrz na żądania w log.txt dla wniosków od złośliwych użytkowników. Dodaj ich adresy IP do&lt;requestBlacklist &gt; w datasets.xml . Jeśli podobne żądania pochodzą z wielu podobnych adresów IP, można użyć niektórych usług who- is (np., [https://www.whois.com/whois/](https://www.whois.com/whois/) ) aby znaleźć zakres adresów IP z tego źródła i czarnej listy całego zakresu. Zobacz&lt;requestBlacklist &gt; dokumentacja] (/ docs / server- admin / datasets # requestblacklist) .
         
#### Błąd OutOfMemoryError{#outofmemoryerror} 
When you set up ERDDAP™ , określić maksymalną ilość pamięci, że Java może być stosowany poprzez [Ustawienia\\ -Xmx](/docs/server-admin/deploy-install#memory) . Jeśli ERDDAP™ Nigdy nie potrzebuje więcej pamięci niż to, to rzuci java. lang. OutOfMemoryError. ERDDAP™ robi wiele kontroli, aby umożliwić mu obsługę tego błędu z wdziękiem (na przykład, tak kłopotliwe żądanie nie uda, ale system zachowuje swoją integralność) . Ale czasami, błąd niszczy integralność systemu i trzeba ponownie uruchomić ERDDAP . Miejmy nadzieję, że to rzadkość.

Szybkie i łatwe rozwiązanie OutOfMemoryError jest zwiększenie [Ustawienia\\ -Xmx](/docs/server-admin/deploy-install#memory) , ale nigdy nie należy zwiększać ustawienia -Xmx do więcej niż 80% fizycznej pamięci na serwerze (np. w przypadku serwera 10GB nie ustawiamy -Xmx powyżej 8GB) . Pamięć jest stosunkowo tania, więc może być dobrym rozwiązaniem, aby zwiększyć pamięć na serwerze. Ale jeśli maxed z pamięci na serwerze lub z innych powodów nie może go zwiększyć, trzeba radzić sobie bardziej bezpośrednio z przyczyną OutOfMemoryError.

Jeśli spojrzysz w [log.txt](#log) plik, aby zobaczyć co ERDDAP™ kiedy pojawił się błąd, można zazwyczaj uzyskać dobrą wskazówkę co do przyczyny OutOfMemoryError. Istnieje wiele możliwych przyczyn, w tym:

* Jeden ogromny plik danych może spowodować OutOfMemoryError, zwłaszcza ogromne pliki ASCII. Jeśli to jest problem, powinien być oczywisty, ponieważ ERDDAP™ nie wczyta zestawu danych (dla zbiorów danych tabelarycznych) lub odczytać dane z tego pliku (dla zestawów danych w sieci) . Rozwiązaniem, jeśli jest to wykonalne, jest podzielenie pliku na wiele plików. Najlepiej podzielić plik na logiczne kawałki. Na przykład, jeśli plik posiada dane o wartości 20 miesięcy, podziel je na 20 plików, z których każdy ma dane o wartości 1 miesiąca. Ale są korzyści nawet jeśli główny plik jest podzielony arbitralnie. Podejście to przynosi wiele korzyści: a) Zmniejszy to pamięć potrzebną do odczytu plików danych do 1 / 20, ponieważ tylko jeden plik jest odczytywany na raz. b) Często, ERDDAP™ może radzić sobie z żądaniami znacznie szybciej, ponieważ musi tylko szukać w jednym lub kilku plikach, aby znaleźć dane dla danego żądania. c) Jeśli zbieranie danych jest w toku, to istniejące 20 plików może pozostać niezmienione, i trzeba tylko zmodyfikować jeden, mały, nowy plik, aby dodać wartość danych w następnym miesiącu do zbioru danych.
* Jedno ogromne żądanie może spowodować OutOfMemoryError. W szczególności niektóre z orderBy opcje mają całą odpowiedź w pamięci przez sekundę (np., zrobić rodzaj) . Jeśli odpowiedź jest ogromna, może prowadzić do błędu. Zawsze będą jakieś prośby, które na różne sposoby są zbyt duże. Możesz rozwiązać problem zwiększając ustawienie -Xmx. Albo możesz zachęcić użytkownika do złożenia serii mniejszych żądań.
* Jest mało prawdopodobne, aby duża liczba plików spowodowała, że indeks ERDDAP™ tworzy tak duże, że plik spowoduje błąd. Jeśli założymy, że każdy plik używa 300 bajtów, wtedy 1.000.000 plików zajmie tylko 300 MB. Ale zbiory danych z ogromną liczbą plików danych powodują inne problemy dla ERDDAP , w szczególności, zajmuje dużo czasu dla ERDDAP™ otwieranie wszystkich tych plików danych w odpowiedzi na żądanie użytkownika o dane. W tym przypadku rozwiązaniem może być agregacja plików tak, aby było mniej plików danych. Dla tabelarycznych zbiorów danych, jest często wielki, jeśli zapisać dane z bieżącego zbioru danych w [CF Geometrie do pobierania próbek dyskretnych (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Współwystępujące pliki z danymi z tablic (wniosek .nc Pliki CF z ERDDAP ) i zrobić nowy zestaw danych. Te pliki mogą być traktowane bardzo skutecznie z ERDDAP jest [Pliki EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles) . Jeśli są logicznie zorganizowane (każdy z danymi dla kawałka przestrzeni i czasu) , ERDDAP™ może pobrać dane z nich bardzo szybko.
* Dla tabelarycznych zbiorów danych, które używają [&lt; subsetVariables &gt;] (/ docs / server- admin / datasets # subsetvariables) atrybut, ERDDAP™ tworzy tabelę unikalnych kombinacji wartości tych zmiennych. Dla ogromnych zbiorów danych lub kiedy&lt; subsetVariables &gt; jest źle skonfigurowana, tabela może być wystarczająco duża, aby spowodować błędy OutOfMemoryErrors. Rozwiązaniem jest usunięcie zmiennych z listy&lt; subsetVariables &gt; dla których istnieje duża liczba wartości, lub usunąć zmienne w razie potrzeby, aż wielkość tej tabeli jest rozsądna. Części ERDDAP™ które wykorzystują subsetVariables system nie działa dobrze (np. strony internetowe ładują bardzo powoli) gdy w tym stole jest więcej niż 100 000 rzędów.
* Zawsze jest możliwe, że kilka jednocześnie dużych próśb (na naprawdę zajęty ERDDAP ) mogą łączyć się, aby spowodować problemy z pamięcią. Na przykład, 8 żądań, z których każdy używa 1 GB, spowoduje problemy dla konfiguracji -Xmx = 8GB. Ale to rzadkie, że każda prośba będzie na szczycie jej pamięci używać jednocześnie. I łatwo byłoby zobaczyć, że twój ERDDAP™ jest bardzo zajęty wielkimi życzeniami. Ale to możliwe. Trudno poradzić sobie z tym problemem inaczej niż poprzez zwiększenie ustawienia -Xmx.
* Są inne scenariusze. Jeśli spojrzysz na [log.txt](#log) plik, aby zobaczyć co ERDDAP™ kiedy pojawił się błąd, zwykle można uzyskać dobrą wskazówkę co do przyczyny. W większości przypadków istnieje sposób, aby zminimalizować ten problem (patrz powyżej) , ale czasami trzeba tylko więcej pamięci i wyższe ustawienie -Xmx.
         
### Zbyt wiele otwartych plików{#too-many-open-files} 
Począwszy od ERDDAP™ v2.12, ERDDAP™ posiada system monitorowania liczby otwartych plików (które zawiera gniazda i inne rzeczy, nie tylko pliki) w Tomcat na komputerach Linuksa. Jeśli niektóre pliki omyłkowo nigdy nie zostaną zamknięte ("wyciek zasobów") , liczba otwartych plików może wzrosnąć aż przekroczy maksymalną dozwoloną przez system operacyjny i wiele naprawdę złych rzeczy się dzieje. Więc teraz na komputerach Linuksa (ponieważ informacje nie są dostępne dla Windows) :

* Po prawej stronie stanu znajduje się kolumna "Open Files" pokazująca procent otwartych plików max. W systemie Windows pokazuje tylko "?".
* Kiedy ERDDAP™ generuje te informacje na końcu każdego głównego zbioru danych, będzie drukować do dziennika. plik txt:
openFileCount = *bieżący* max = *max* % = *procent* 
* Jeśli procent wynosi &gt; 50%, e-mail jest wysyłany do ERDDAP™ administrator i e-mail Wszystko Na adres e-mail.

Jeśli procent wynosi 100%, ERDDAP™ ma straszne kłopoty. Nie pozwól na to.
Jeżeli odsetek wynosi &gt; 75%, ERDDAP™ jest bliski strasznych kłopotów. To nie w porządku.
Jeśli procent jest &gt; 50%, jest bardzo możliwe, że skok spowoduje, że procent uderzyć 100.
Jeśli procent jest kiedykolwiek &gt; 50%, należy:
* Zwiększ maksymalną liczbę otwartych plików dozwoloną przez:
    * Dokonywanie tych zmian za każdym razem przed rozpoczęciem tomcat (Umieścić je w aktach Tomcat Startup.sh?) :
ulimit -Hn 16384
ulimit -Sn 16384
    * Lub stałe zmiany poprzez edycję (jako korzeń) / etc / security / limits.conf i dodanie linii:
tomcat soft nofile 16384
tomcat hard nofile 16384
Polecenia te zakładają, że użytkownik obsługujący Tomcat nazywa się "tomcat".
W wielu wariantach Linuksa trzeba ponownie uruchomić serwer, aby zastosować te zmiany. Dla obu opcji, "16384" powyżej jest przykładem. Wybierasz numer, który uważasz za najlepszy.
* Uruchom ponownie ERDDAP . System operacyjny zamknie wszystkie otwarte pliki.
         
### Nieudane wnioski{#failed-requests} 
*    **Niezwykła działalność: &gt; 25% wniosków nie powiodło się**   
W ramach każdej reloadDatasets, która jest zwykle co 15 minut, ERDDAP™ analizuje odsetek wniosków, które nie powiodły się od ostatnich reloadDatasets. Jeśli wynosi &gt; 25%, ERDDAP™ wysyła e-mail do ERDDAP™ administrator z tematem "Niezwykłe działanie: &gt; 25% wniosków nie powiodło się". Ten e-mail zawiera list w pobliżu dołu zatytułowany "Adres IP Requester (Nieudany)   (od ostatniego majora LoadDatasets) ". Szukaj tego. Podaje adres IP komputerów składających najbardziej nieudane żądania. Następnie można wyszukać te adresy IP w \\[ bigParentDirectory \\] / dzienniki / [log.txt](#log) plikuj i zobacz jakie wnioski składają.
    
Możesz użyć numeru IP użytkownika (na przykład, z [https://whatismyipaddress.com/ip-lookup](https://whatismyipaddress.com/ip-lookup) ) spróbować dowiedzieć się, kim lub czym jest użytkownik. Czasami to mówi ci dość dokładnie kim jest użytkownik (np., jest to wyszukiwarka web crawler) . Większość czasu daje ci wskazówkę. (Na przykład, to komputer amazonek, pochodzi z jakiegoś uniwersytetu, to ktoś z jakiegoś konkretnego miasta) .
    
Patrząc na rzeczywisty wniosek, numer IP i komunikat błędu (wszystkie z [log.txt](#log) ) dla serii błędów, można zazwyczaj dowiedzieć się, co w zasadzie dzieje się źle. Z mojego doświadczenia wynika, że istnieją cztery wspólne przyczyny wielu nieudanych wniosków:
    
1) Żądania są złośliwe (np. poszukiwanie słabych punktów bezpieczeństwa lub składanie wniosków, a następnie odwoływanie ich przed ich ukończeniem) . Należy stosować&lt;requestBlacklist &gt; w datasets.xml na czarną listę tych adresów IP.
    
2) wyszukiwarka naiwnie próbuje adresy URL wymienione w ERDDAP™ strony internetowe i dokumenty ISO 19115. Na przykład, istnieje wiele miejsc, które wymieniają bazę OPeNDAP Na przykład URL,https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST, do którego użytkownik ma dodać typ pliku (np. .das, .dds, .html) . Ale wyszukiwarka tego nie wie. A żądanie do bazowego adresu URL zawodzi. Powiązana sytuacja jest wtedy, gdy wyszukiwarka generuje dziwne żądania lub próbuje wypełnić formularze, aby dostać się do "ukrytych" stron internetowych. Ale wyszukiwarki często robią to źle, prowadząc do niepowodzeń. Rozwiązaniem jest: [robots.txt](#robotstxt) plik.
    
3) Niektórzy użytkownicy uruchamiają skrypt, który wielokrotnie prosi o coś, czego nie ma. Może to zbiór danych, który kiedyś istniał, ale już go nie ma. (tymczasowo lub na stałe) . Skrypty często się tego nie spodziewają, więc nie radź sobie z tym inteligentnie. Scenariusz ciągle składa wnioski, a prośby wciąż zawodzą. Jeśli możesz zgadnąć, kim jest użytkownik (z powyższego numeru IP) , skontaktuj się z nimi i powiedz im, że zestaw danych nie jest już dostępny i poproś ich o zmianę skryptu.
    
4) Coś jest naprawdę nie tak z jakimś zbiorem danych. Zazwyczaj, ERDDAP™ Sprawią, że zestaw danych będzie nieaktywny. Czasami nie, więc wszystkie prośby prowadzą do błędów. Jeśli tak, należy rozwiązać problem z zbiorem danych lub (jeśli nie możesz) ustawić zbiór danych na [aktywny = "fałszywy"](/docs/server-admin/datasets#active) . Oczywiście, to może prowadzić do problemu nr 2.
    
Czasami błędy nie są takie złe, zwłaszcza, jeśli ERDDAP™ może wykryć błąd i reagować bardzo szybko (&lt;= 1 ms). Więc możesz zdecydować się nie podejmować żadnych działań.
    
Jeśli wszystko inne zawiedzie, istnieje uniwersalne rozwiązanie: dodać numer IP użytkownika do [&lt;requestBlacklist &gt;] (/ docs / server- admin / datasets # requestblacklist) . Nie jest tak źle, ani tak drastycznie, jak mogłoby się wydawać. Użytkownik otrzyma komunikat o błędzie mówiący, że s / he został na czarnej liście i powie im, że (do ERDDAP™ administrator) adres e-mail. Czasami użytkownik skontaktuje się z Tobą i możesz rozwiązać problem. Czasami użytkownik nie kontaktuje się z Tobą i zobaczysz dokładnie to samo zachowanie pochodzące z innego numeru IP następnego dnia. Czarna lista nowego numeru IP i nadzieję, że w końcu otrzymają wiadomość. (Albo to twój Dzień Świstaka, z którego nigdy nie uciekniesz. Przepraszam.) 
    
### robots.txt{#robotstxt} 
Firmy wyszukiwarek używają czołgów internetowych (np. Google Bot Przewodniczący) do zbadania wszystkich stron w sieci, aby dodać zawartość do wyszukiwarek. Dla ERDDAP™ To w zasadzie dobrze. ERDDAP™ posiada wiele linków między stronami, więc pełzacze znajdą wszystkie strony i dodają je do wyszukiwarek. Następnie użytkownicy wyszukiwarek będą w stanie znaleźć zbiory danych na Twoim ERDDAP .
    
Niestety, niektórzy pełzacze w sieci (np. Google Bot Przewodniczący) obecnie wypełniają i przedkładają formularze w celu znalezienia dodatkowych treści. Dla stron internetowych handlu, to jest świetne. Ale to jest straszne dla ERDDAP™ Ponieważ to prowadzi do **nieskończony** liczba niepożądanych i bezsensownych prób przeczołgania faktycznych danych. Może to prowadzić do większej liczby wniosków o dane niż od wszystkich innych użytkowników łącznie. I wypełnia wyszukiwarkę głupimi, bezsensownymi podzbiorami rzeczywistych danych.
    
Aby powiedzieć WWW, aby przestać wypełniać formularze i po prostu ogólnie nie patrząc na strony internetowe, na które nie muszą patrzeć, trzeba utworzyć plik tekstowy o nazwie [robots.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard) w katalogu głównym hierarchii dokumentów Twojej strony internetowej, tak aby mógł być postrzegany przez każdego jako, np.,http://*www.your.domain*/robots.txt.
Jeśli tworzysz nowe roboty. plik txt, to dobry początek:
```
    User-Agent: \\*
    Disallow: /erddap/files/ 
    Disallow: /files/ 
    Disallow: /images/ 
    Disallow: /\\*?
    Disallow: /\\*?\\*
    Disallow: /\\*.asc\\*
    Disallow: /\\*.csv\\*
    Disallow: /\\*.dods\\*
    Disallow: /\\*.esriAscii\\*
    Disallow: /\\*.esriCsv\\*
    Disallow: /\\*.geoJson\\*
    Disallow: /\\*.htmlTable\\*
    Disallow: /\\*.json\\*
    Disallow: /\\*.mat\\*
    Disallow: /\\*.nc\\*
    Disallow: /\\*.odvTxt\\*
    Disallow: /\\*.tsv\\*
    Disallow: /\\*.xhtml\\*
    Disallow: /\\*.geotif\\*
    Disallow: /\\*.itx\\*
    Disallow: /\\*.kml\\*
    Disallow: /\\*.pdf\\*
    Disallow: /\\*.png\\*
    Disallow: /\\*.large\\*
    Disallow: /\\*.small\\*
    Disallow: /\\*.transparentPng\\*
    Sitemap: http://***your.institutions.url***/erddap/sitemap.xml
```
     (Ale zastąpić *your.institutions.url* z ERDDAP bazowy adres URL.)   
To może zająć kilka dni, aby wyszukiwarki zauważyć i zmiany, aby wejść w życie.
     
### sitemap.xml{#sitemapxml} 
Jako [https://www.sitemaps.org](https://www.sitemaps.org/) strona internetowa mówi:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

Właściwie, od kiedy ERDDAP™ en RESTful , wyszukiwarki pająki mogą łatwo czołgać się ERDDAP . Ale robią to częściej. (Codziennie&#33;) niż to konieczne (Co miesiąc?) .

* Biorąc pod uwagę, że każda wyszukiwarka może czołgać się cały ERDDAP™ Każdego dnia może to prowadzić do wielu niepotrzebnych wniosków.
* Więc... ERDDAP™ generuje plik sitemap.xml dla Twojego ERDDAP™ co informuje wyszukiwarki, że ERDDAP™ Tylko trzeba się czołgać co miesiąc.
* Należy dodać odniesienie do ERDDAP sitemap.xml do [robots.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard) plik:
Mapa strony:http://**www.yoursite.org**/erddap/sitemap.xml
* Jeśli to nie wydaje się być dostarczanie wiadomości do pełzaczy, można powiedzieć różne wyszukiwarki o pliku sitemap.xml odwiedzając te adresy URL (ale zmienić **Twoja instytucja** do skrótu lub skrótu Twojej instytucji oraz **www.yoursite.org** do ERDDAP URL) :
    *   https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
    *   https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(Ithink) wystarczy, że raz, na zawsze, po prostu trzeba ping każdej wyszukiwarki. Następnie wyszukiwarki wykryją okresowo zmiany w sitemap.xml.
     
### Rozpowszechnianie danych / Dystrybucja danych Sieci: Push oraz Pull Technologia{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* Normalnie, ERDDAP™ działa jako pośrednik: przyjmuje wniosek od użytkownika; pobiera dane ze zdalnego źródła danych; reformatuje dane; i wysyła je do użytkownika.
*    [ Pull Technologia](https://en.wikipedia.org/wiki/Pull_technology) : ERDDAP™ posiada również możliwość aktywnego pozyskiwania wszystkich dostępnych danych ze zdalnego źródła danych oraz [przechowywać lokalną kopię danych](/docs/server-admin/datasets#eddgridcopy) .
*    [ Push Technologia](https://en.wikipedia.org/wiki/Push_technology) : Używając ERDDAP jest [Usługi abonamentowe](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions) , inne serwery danych mogą być zgłaszane jak tylko nowe dane są dostępne tak, że mogą one żądać danych (poprzez wyciągnięcie danych) .
*    ERDDAP jest [ EDDGrid FromErddap](/docs/server-admin/datasets#eddfromerddap) oraz [EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap) podanie ERDDAP usługi subskrypcji oraz [system flag](#flag) tak, aby został on niezwłocznie powiadomiony o dostępności nowych danych.
* Można je połączyć do wielkiego efektu: jeśli zawinąć EDDGrid Kopiuj wokół EDDGrid Zestaw danych FromErddap (lub owinąć tabelę EDDCopy wokół zbioru danych EDDTableFromErddap) , ERDDAP™ automatycznie tworzy i utrzymuje lokalną kopię innego ERDDAP Zestawienie danych.
* Ponieważ usługi abonamentowe działają jak najszybciej nowe dane są dostępne, technologia push rozpowszechnia dane bardzo szybko (w ciągu kilku sekund) .

Ta architektura umieszcza każdy ERDDAP™ administrator odpowiedzialny za określenie miejsca, w którym dane dla niego ERDDAP™ pochodzi.

* Inne ERDDAP™ administratorzy mogą zrobić to samo. Nie ma potrzeby koordynacji między administratorami.
* Jeśli wielu ERDDAP™ administratorzy link do siebie ERDDAP s, tworzy się sieć dystrybucji danych.
* Dane będą szybko, skutecznie i automatycznie rozpowszechniane ze źródeł danych ( ERDDAP s i inne serwery) do miejsc redystrybucji danych ( ERDDAP s) gdziekolwiek w sieci.
* A ERDDAP™ może być zarówno źródłem danych dla niektórych zbiorów danych, jak i miejscem redystrybucji dla innych zbiorów danych.
* Wynikająca z tego sieć jest w przybliżeniu podobna do sieci dystrybucji danych utworzonych z programami takimi jak [ Unidata IDD / IDM](https://www.unidata.ucar.edu/projects/index.html#idd) , ale mniej rygorystycznie uporządkowany.
         
### Bezpieczeństwo, uwierzytelnienie i autoryzacja{#security-authentication-and-authorization} 
Domyślnie, ERDDAP™ działa jako całkowicie publiczny serwer (stosowanie http lub https ) bez logowania ( [uwierzytelnienie](https://en.wikipedia.org/wiki/Authentication) ) system i brak ograniczeń w dostępie do danych ( [autoryzacja](https://en.wikipedia.org/wiki/Authorization) ) .

#### Bezpieczeństwo{#security} 
Jeśli chcesz ograniczyć dostęp do niektórych lub wszystkich zbiorów danych do niektórych użytkowników, możesz użyć ERDDAP Budynek w systemie bezpieczeństwa. Gdy system bezpieczeństwa jest w użyciu:

*    ERDDAP™ zastosowania [kontrola dostępu oparta na rolach](https://en.wikipedia.org/wiki/Role-based_access_control) .
    * W ERDDAP™ administrator definiuje użytkowników z [&lt;użytkownik &gt;] (/ docs / server- admin / datasets # user) tag in datasets.xml . Każdy użytkownik ma nazwę użytkownika, hasło (jeżeli uwierzytelnienie = niestandardowe) i jedną lub więcej ról.
    * W ERDDAP™ administrator określa, które role mają dostęp do danego zbioru danych poprzez [&lt;accessibleTo &gt;] (/ docs / server- admin / datasets # accessibleto) tag in datasets.xml dla każdego zbioru danych, które nie powinny mieć publicznego dostępu.
* Status logowania użytkownika (i link do logowania / wylogowania) zostaną pokazane na górze każdej strony. (Ale zalogowany użytkownik pojawi się ERDDAP™ nie być zalogowany, jeśli używa http URL.) 
* Jeśli&lt;baseUrl &gt;, które można określić w setup.xml jest ** http ** URL, użytkownicy, którzy nie są zalogowani mogą używać ERDDAP jest ** http ** URL. Jeśli&lt;BaseHttpsUrl &gt; jest również podany, użytkownicy, którzy nie są zalogowani mogą również używać https URL.
* Tylko HTTPS... Jeśli&lt;baseUrl &gt;, które można określić w setup.xml jest ** https ** URL, użytkownicy, którzy nie są zalogowani są zachęcane (nie wymuszone) do stosowania ERDDAP jest ** https ** URL -- wszystkie linki na ERDDAP™ strony internetowe będą odnosić się do https URL.
    
Jeśli chcesz zmusić użytkowników do użycia https URL, dodaj przekierować stałą linię wewnątrz&lt;VirtualHost\\ *: 80 &gt; sekcja w pliku konfiguracyjnym Apache (zwykle http D.conf) , np.,
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

Jeśli chcesz, istnieje dodatkowa metoda, aby wymusić użycie https:   [HTTP Strict Bezpieczeństwo transportu (HSTS) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security) . Aby go użyć:
    
    1. Włącz moduł nagłówków Apache: nagłówki a2enmod
    2. Dodaj dodatkowy nagłówek do dyrektywy HTTPS VirtualHost. Maksymalny wiek jest mierzony w sekundach i może być ustawiony na jakąś długą wartość.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
Należy pamiętać, że ten nagłówek jest ważny tylko na HTTPS VirtualHost.
    
Powód, aby nie zmuszać użytkowników do używania https Adres URL jest: bazowy link SSL / TLS wymaga czasu na ustanowienie, a następnie czasu na szyfrowanie i odszyfrowanie wszystkich informacji przekazywanych pomiędzy użytkownikiem a serwerem. Ale niektóre instytucje wymagają https Tylko.
    
* Użytkownicy zalogowani MUSI używać ERDDAP jest ** https ** URL. W przypadku stosowania http URL, wyglądają na ERDDAP™ nie zalogować się. Zapewnia to prywatność komunikacji i pomaga zapobiegać [porwanie sesji i porwanie boczne](https://en.wikipedia.org/wiki/Session_hijacking) .
* Każdy, kto nie jest zalogowany, ma dostęp do publicznych zbiorów danych. Domyślnie, prywatne zbiory danych nie pojawiają się na listach zbiorów danych, jeśli użytkownik nie jest zalogowany. Jeśli administrator ustawił setup.xml&lt;listPrivateDatasets &gt; do true, pojawią się. Próby żądania danych z prywatnych zbiorów danych (jeśli użytkownik zna adres URL) zostanie przekierowana do strony logowania.
* Każdy zalogowany będzie mógł zobaczyć i poprosić o dane z dowolnego zbioru danych publicznych i prywatnych, do których ich rola umożliwia im dostęp. Domyślnie prywatne zbiory danych, do których użytkownik nie ma dostępu, nie pojawiają się na listach zbiorów danych. Jeśli administrator ustawił setup.xml&lt;listPrivateDatasets &gt; do true, pojawią się. Próby żądania danych z prywatnych zbiorów danych, do których użytkownik nie ma dostępu, zostaną przekierowane do strony logowania.
* W RSS informacje dla w pełni prywatnych zbiorów danych są dostępne tylko dla użytkowników (oraz RSS czytniki) którzy są zalogowani i upoważnieni do korzystania z tego zbioru danych. To czyni RSS nie jest zbyt przydatny dla w pełni prywatnych zbiorów danych.
    
Jeśli zestaw danych jest prywatny, ale jego [&lt;GraphsAccessibleTo &gt;] (/ docs / server- admin / datasets # graphsaccessibleto) jest upubliczniony, zestaw danych RSS jest dostępny dla każdego.
    
* Subskrypcje e-mail można skonfigurować tylko wtedy, gdy użytkownik ma dostęp do zbioru danych. Jeśli użytkownik subskrybuje prywatny zbiór danych, subskrypcja nadal działa po wylogowaniu się użytkownika.

##### Ustawienie bezpieczeństwa{#setup-security} 
Aby skonfigurować system zabezpieczeń / uwierzytelniania / autoryzacji:

* Wykonaj standard ERDDAP™   [początkowe ustawienie](/docs/server-admin/deploy-install) .
* W [setup.xml](/docs/server-admin/deploy-install#setupxml) ,
    * Dodaj / zmień&lt;uwierzytelnienie &gt; wartość od niczego do niestandardowych (Nie używaj tego.) , e-mail (Nie używaj tego.) , google (zalecane) , orcid (zalecane) lub oauth2 (który jest google + orcid, zalecane) . Zob. uwagi dotyczące tych opcji poniżej.
    * Dodaj / zmień&lt;baseHttpsUrl &gt; wartość.
    * Wstaw / odkomentuj &loginInfo; w&lt;startBodyHtml &gt; wyświetla informacje o logowaniu użytkownika na górze każdej strony.
* Do celów testowania komputera osobistego, [postępuj zgodnie z tymi instrukcjami, aby skonfigurować tomcat do obsługi SSL](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)   (podstawy https połączenia) poprzez stworzenie sklepu z klawiszami z [samo podpisane świadectwo](https://en.wikipedia.org/wiki/Self-signed_certificate) oraz poprzez modyfikację *tomcat* / conf / server.xml odkomentować złącze dla portu 8443. W systemie Windows może być konieczne przeniesienie .keystore z "c:\\ Users\\ *Ty* \\ .keystore "do" c:\\ Użytkownicy\\ Domyślny użytkownik\\ .keystore "lub" c:\\ .keystore " (patrz *tomcat* / logi / katalina. *dzisiaj* .log jeśli aplikacja nie wczyta lub użytkownicy nie mogą zobaczyć dziennika na stronie) . Możesz zobaczyć, kiedy certyfikat .keystore wygaśnie, badając certyfikat podczas logowania.
    
Dla publicznie dostępnego serwera, zamiast używać samopodpisanego certyfikatu, zaleca się, aby kupić i zainstalować certyfikat podpisany przez [organ certyfikacji](https://en.wikipedia.org/wiki/Certificate_authority) , ponieważ daje klientom więcej pewności, że rzeczywiście łączą się z ERDDAP™ , a nie męską wersję środkowego ERDDAP . Wielu sprzedawców sprzedaje certyfikaty cyfrowe. (Szukaj sieci.) Nie są drogie.
    
* Na komputerach Linuksa, jeśli Tomcat działa w Apache, zmodyfikuj / etc / http d / conf.d / ssl.conf, aby umożliwić ruch HTTPS do / z ERDDAP™ bez konieczności podania numeru portu: 8443 w URL:
    1. Zmień istniejący&lt;VirtualHost &gt; tag (jeśli istnieje) , lub dodać jeden na końcu pliku tak, że ma przynajmniej te linie:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. Następnie uruchom ponownie Apache: / usr / sbin / apachectl -k graceful (ale czasami jest w innym katalogu) .
* W *tomcat* / conf / server.xml, odkomentuj port = 8443&lt;Złącze &gt; znacznik:
```
    <Connector port="8443" 
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
        <Certificate certificateKeystoreFile="conf/localhost-rsa.jks" 
            type="RSA" />
        </SSLHostConfig>
    </Connector>
```
i zmienić lokalizację certyfikatu KeystoreFile.
##### Autoryzacja{#authorization} 
*    [W datasets.xml , utworzyć](#authorization) [&lt;użytkownik &gt;] (/ docs / server- admin / datasets # user) tag dla każdego użytkownika z nazwą użytkownika, hasłem (jeżeli autoryzacja = zwyczaj) i ról informacji. To część autoryzacji ERDDAP System bezpieczeństwa.
     
* W datasets.xml , dodać [&lt;accessibleTo &gt;] (/ docs / server- admin / datasets # accessibleto) tag do każdego zbioru danych, który nie powinien mieć publicznego dostępu.&lt;accessibleTo &gt; pozwala określić, które role mają dostęp do tego zbioru danych.
     
* Przywróć Tomcata. Kłopoty? Sprawdź dzienniki Tomcata.
     
* Sprawdź swoją pracę&#33; Każdy błąd może doprowadzić do wady bezpieczeństwa.
     
* Sprawdź, czy strona logowania używa https   (nie http ) . Próby logowania poprzez http powinno być automatycznie przekierowywane na https oraz port 8443 (chociaż numer portu może być ukryty za pośrednictwem serwera Apache) . Być może trzeba będzie współpracować z administratorem sieci, aby umożliwić zewnętrznym żądaniom sieciowym dostęp do portu 8443 na serwerze.
     
* Można zmienić&lt;użytkownik &gt; oraz&lt;accessibleTo &gt; tags w dowolnym momencie. Zmiany będą stosowane przy następnym regularnym przeładowaniu dowolnego zestawu danych, lub ASAP, jeśli używasz [bandera](#flag) .

##### Uwierzytelnienie{#authentication} 
 [ **Uwierzytelnienie (logowanie) ** ](#authentication)   
Jeśli nie chcesz pozwolić użytkownikom zalogować się, nie określaj wartości dla&lt;uwierzytelnienie &gt; w setup.xml.
Jeśli chcesz pozwolić użytkownikom zalogować się, musisz podać wartość dla&lt;uwierzytelnienie &gt;. Obecnie ERDDAP™ wsparcie
 [zwyczaj](#custom)   (Nie używaj tego.) ,
 [e-mail](#email)   (Nie używaj tego.) ,
 [google](#google)   (zalecane) ,
 [orcid](#orcid)   (zalecane) oraz
 [oauth2](#oauth2)   (zalecane) dla metody uwierzytelniania.
Jeśli chcesz włączyć logowanie, stanowczo zalecamy opcje google, orcid lub oauth2, ponieważ są one wolne od przechowywania i obsługi haseł użytkownika (potrzebne do niestandardowych) i są bardziej bezpieczne niż opcja e-mail. Pamiętaj, że użytkownicy często używają tego samego hasła na różnych stronach. Więc mogą używać tego samego hasła dla Twojego ERDDAP™ jak w banku. To sprawia, że ich hasło jest bardzo cenne -- znacznie cenniejsze dla użytkownika niż tylko dane, o które proszą. Więc musisz zrobić jak najwięcej, aby zachować hasła w tajemnicy. To wielka odpowiedzialność. E-mail, google, orcid i oauth2 opcje dbać o hasła, więc nie trzeba gromadzić, przechowywać, lub pracować z nimi. Więc jesteś wolny od tej odpowiedzialności.

Wszystkie&lt;uwierzytelnienie &gt; opcje [ciasteczko](https://en.wikipedia.org/wiki/HTTP_cookie) na komputerze użytkownika, więc przeglądarka użytkownika musi być ustawiona tak, aby pozwalała na pliki cookie. Jeśli użytkownik robi ERDDAP™ żądania z programu komputerowego (nie przeglądarka) , ciasteczka i uwierzytelnianie są trudne do pracy. To częsty problem ze wszystkimi systemami uwierzytelniania. Przepraszam.

Szczegóły&lt;uwierzytelnienie &gt; opcje są następujące:

###### Własny{#custom} 
jest ERDDAP niestandardowy system pozwalający zalogować się użytkownikom, wprowadzając nazwę użytkownika i hasło w formie na stronie internetowej. Jeśli użytkownik próbuje i nie loguje się 3 razy w ciągu 10 minut, użytkownik jest zablokowany w próbie logowania przez 10 minut. Zapobiega to hakerom po prostu próbowania milionów haseł, dopóki nie znajdą właściwego.

Jest to nieco bezpieczne, ponieważ nazwa użytkownika i hasło są przekazywane za pośrednictwem https   (nie http ) , ale uwierzytelnienie = google, orcid, lub oauth2 są lepsze, ponieważ są one wolne od konieczności obsługi haseł. Niestandardowe podejście wymaga, aby zebrać nazwę użytkownika i hash digest ich Hasło (Użyj telefonu&#33; e-mail nie jest bezpieczny&#33;) i przechowywać je w datasets.xml w [&lt;użytkownik &gt;] (/ docs / server- admin / datasets # user) tagi.

Z opcją niestandardową, nikt nie może się zalogować dopóki ty (do ERDDAP™ administrator) Utwórz&lt;użytkownik &gt; tag dla użytkownika, określając nazwę użytkownika jako nazwę użytkownika, hash digest ich hasła jako hasło, a ich role.

Niezalecane
Ze względu na niezręczność generowania i przekazywania haszu trawienie hasła użytkownika i ze względu na ryzyko związane z ERDDAP™ Trzymając hash trawienie haseł, ta opcja nie jest zalecana.

Zwiększenie bezpieczeństwa tej opcji:

* MUSISZ upewnić się, że inni użytkownicy na serwerze (np. użytkownicy Linuksa, nie ERDDAP™ użytkownicy) nie można odczytać plików w katalogu Tomcat (szczególnie datasets.xml Plik&#33;) lub ERDDAP Big ParentDirectory.
Na Linuksie, jako użytkownik = tomcat, użyj:
chmod -R g- rwx *bigParentDirectory*   
chmod -R o- rwx *bigParentDirectory*   
chmod -R g- rwx *tomcatDirectory*   
chmod -R o- rwx *tomcatDirectory*   
     
* Użyj UEPSHA256 do&lt;haswordEncoding &gt; in setup.xml.
     
* Użyj metody as- secure- as-possible, aby przekazać hash digest hasła użytkownika z użytkownika do ERDDAP™ administrator (Telefon?) .
         
###### e-mail{#email} 
Opcja uwierzytelniania poczty elektronicznej wykorzystuje konto e-mail użytkownika do uwierzytelniania użytkownika (wysyłając im e-mail ze specjalnym linkiem, do którego mają dostęp w celu zalogowania się) . W przeciwieństwie do innych e-maili, które ERDDAP™ wysyła, ERDDAP™ nie zapisuje tych e-maili zaproszenia do pliku dziennika poczty elektronicznej, ponieważ zawierają one informacje poufne.
Teoretycznie, nie jest to bardzo bezpieczne, ponieważ e-maile nie zawsze są zaszyfrowane, więc zły facet z zdolnością przechwytywania e-maili może nadużywać tego systemu używając poprawnego adresu e-mail użytkownika i przechwytywania e-mail zaproszenia.
W praktyce, jeśli ustawisz ERDDAP™ korzystanie z konta Google e-mail do wysyłania e-maili, a jeśli skonfiguruje się go do korzystania z jednej z opcji TLS dla połączenia, a jeśli użytkownik ma konto Google e-mail, jest to nieco bezpieczne, ponieważ wiadomości są szyfrowane całą drogę od ERDDAP™ do użytkownika.

Zwiększenie bezpieczeństwa tej opcji:

* Upewnij się, że inni użytkownicy na serwerze (np. użytkownicy Linuksa, nie ERDDAP™ użytkownicy) nie można odczytać plików w katalogu Tomcat lub ERDDAP Big ParentDirectory.
Na Linuksie, jako użytkownik = tomcat, użyj:
chmod -R g- rwx *bigParentDirectory*   
chmod -R o- rwx *bigParentDirectory*   
chmod -R g- rwx *tomcatDirectory*   
chmod -R o- rwx *tomcatDirectory*   
     
* Ustaw rzeczy, aby uzyskać end-to@-@ end bezpieczeństwa dla e-maili wysłanych z ERDDAP™ do użytkowników. Na przykład, można stworzyć system Google- centric tylko tworząc&lt;użytkownik &gt; tagi dla adresów e-mail zarządzanych przez Google- ERDDAP™ korzystanie z serwera e-mail Google poprzez bezpieczne połączenie / TLS: w Twoim setup.xml, użyj np.,
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

Niezalecane
Opcja uwierzytelniania poczty elektronicznej nie jest zalecana. Proszę użyć opcji google, orcid lub oauth2 zamiast.

Podobnie jak w przypadku opcji google, orcid i oauth2, e-mail jest bardzo wygodne dla ERDDAP™ administratorzy -- nigdy nie musisz zajmować się hasłami ani ich haszami. Wszystko, czego potrzebujesz do stworzenia jest [&lt;użytkownik &gt;] (/ docs / server- admin / datasets # user) tag dla użytkownika w datasets.xml jest adresem e-mail użytkownika, który ERDDAP™ używa jako nazwy użytkownika. (Atrybut hasła nie jest używany przy uwierzytelnianiu = email, google, orcid lub oauth2.) 

Z opcją e- mail, tylko użytkownicy, którzy mają&lt;użytkownik &gt; tag in datasets.xml może spróbować zalogować się do ERDDAP™ poprzez podanie ich adres e-mail i kliknięcie na link w e-mail, że ERDDAP™ Przysyła je.

 ERDDAP™ traktuje adresy e-mail jako niewrażliwe. Robi to poprzez konwersję adresów e-mail, które wprowadzisz (w&lt;użytkownik &gt; tagi) lub użytkownik wprowadzić (w formularzu logowania) do ich wszystkich małych wersji.

Aby skonfigurować uwierzytelnianie = email:

1. W ustawieniach xml należy zmienić&lt;baseHttpsUrl &gt; wartość znacznika.
Do eksperymentowania / pracy na komputerze osobistym,
    https://localhost:8443  
Dla publiczności. ERDDAP™ ,
    https://*your.domain.org*:8443  
lub bez: 8443 jeśli używasz Apache [proksypass](/docs/server-admin/deploy-install#proxypass) więc numer portu nie jest potrzebny.
     
2. W ustawieniach xml należy zmienić&lt;uwierzytelnienie &gt; wartość znacznika do wiadomości e-mail:
```
    <authentication>email</authentication>  
```

3. W setup.xml upewnij się, że system email jest ustawiony przez wszystkie&lt;email... &gt; tagi, tak, że ERDDAP™ może wysyłać e-maile. Jeśli to możliwe, skonfiguruj to w celu użycia bezpiecznego połączenia (SSL / TLS) do serwera e-mail.
     
4. W datasets.xml , create [&lt;użytkownik &gt;] (/ docs / server- admin / datasets # user) tagi dla każdego użytkownika, który będzie miał dostęp do prywatnych zbiorów danych.
Użyj adresu e-mail użytkownika jako nazwy użytkownika w znaczniku.
Nie określaj atrybutu hasła w tagu użytkownika.
     
5. Uruchom ponownie ERDDAP™ tak, że zmiany setup.xml i datasets.xml zacząć działać.
         
###### Google, orcid, oauth2{#google-orcid-oauth2} 
*    [ **google** ](#google) , [ **orcid** ](#orcid) oraz [ **oauth2** ](#oauth2)    (zalecane)   
Wszystkie trzy z tych opcji są zalecane ERDDAP™ opcje uwierzytelniania. To najbezpieczniejsze opcje. Pozostałe opcje mają znacznie słabsze bezpieczeństwo.
     
###### Google{#google} 
* Opcja uwierzytelniania Google wykorzystuje [Podpisz W Google](https://developers.google.com/identity/gsi/web/guides/overview) , który jest realizacją [Protokół uwierzytelniania OAuth 2.0](https://oauth.net/2/) . ERDDAP™ użytkownicy logują się na swoje konto e-mail Google, w tym konta zarządzane przez Google- @noaa.gov rachunki. Pozwala ERDDAP™ w celu weryfikacji tożsamości użytkownika (nazwa i adres e-mail) i dostęp do ich profilu obrazu, ale nie daje ERDDAP™ dostęp do ich e-maili, ich dysku Google lub innych prywatnych informacji.
    
Dla ERDDAP™ v2.22 i poniżej, ERDDAP™ używane "Google Sign- In". Google twierdzi, że system jest zdeprecjonowany po 31 marca 2023 roku. Jeśli jeszcze tego nie zrobiłeś, przełącz na ERDDAP™ v2.23 + używać nowego systemu uwierzytelniania opartego na "Zaloguj się z Google".
    
Dla ERDDAP™ v2.23 instancje z skonfigurowaną polityką bezpieczeństwa i za pomocą uwierzytelniania Google, musisz dodaćhttps://accounts.google.comdo listy dozwolonych skrypt- src (lub script- src- elem) . ERDDAP™ nie stosuje się jużhttps://apis.google.comWięc jeśli masz to dozwolone, możesz być w stanie to usunąć teraz.
    
Dla ERDDAP™ v2.24 + może być konieczne dodaniehttps://accounts.google.com/gsi/styleStlye- src ihttps://accounts.google.com/gsi/do connect- src. Dla skrypt- src możesz teraz użyćhttps://accounts.google.com/gsi/client.
    
Aby uzyskać więcej informacji można przejść do [Strona Google](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy) o konfiguracji CSP. Jeśli masz jakieś pytania, skontaktuj się z Christianem w Noah.
         
###### Owady{#orcid} 
* Opcja uwierzytelniania orcid wykorzystuje [Uwierzytelnianie osierocone](https://members.orcid.org/api/integrate/orcid-sign-in) , który jest realizacją [Protokół uwierzytelniania OAuth 2.0](https://oauth.net/2/) . ERDDAP™ użytkownicy podpisują się na ich [Konto osierocone](https://members.orcid.org/api/integrate/orcid-sign-in) , który jest powszechnie stosowany przez naukowców do identyfikacji. Pozwala ERDDAP™ aby zweryfikować tożsamość użytkownika i uzyskać jego numer konta, ale nie daje ERDDAP™ dostęp do innych informacji dotyczących konta Orcid.

###### Oauth2{#oauth2} 
* Opcja oauth2 pozwala użytkownikom zalogować się do konta Google lub Orcid.

Opcje google, orcid i oauth2 są następcami opcji openid, która została przerwana po ERDDAP™ wersja 1.68, która została oparta na wersji otwartej Identyfikator, który jest nieaktualny. Proszę przełączyć na opcję google, orcid lub oauth2.

Opcje te są bardzo wygodne dla ERDDAP™ administratorzy -- nigdy nie musisz zajmować się hasłami ani ich haszami. Wszystko, czego potrzebujesz do stworzenia jest [&lt;użytkownik &gt;] (/ docs / server- admin / datasets # user) tag dla użytkownika w datasets.xml który określa adres e-mail użytkownika Google lub numer konta Orcid jako atrybut nazwy użytkownika. (Atrybut hasła nie jest używany przy uwierzytelnianiu = email, google, orcid lub oauth2.) 

Z tych opcji, każdy może zalogować się do ERDDAP™ przez podpisanie się na ich konto e-mail Google lub konto Orcid, ale nikt nie będzie miał prawa dostępu do prywatnych zbiorów danych, dopóki nie będziesz (do ERDDAP™ administrator) Utwórz&lt;użytkownik &gt; tag, określając ich adres e-mail Google lub numer konta Orcid jako nazwę użytkownika i określając ich role.

 ERDDAP™ traktuje adresy e-mail jako niewrażliwe. Robi to poprzez konwersję adresów e-mail, które wprowadzisz (w&lt;użytkownik &gt; tagi) lub użytkownik wprowadzić (w formularzu logowania) do ich wszystkich małych wersji.

Aby skonfigurować uwierzytelnianie google, orcid lub oauth2:

* W ustawieniach xml należy zmienić&lt;baseHttpsUrl &gt; wartość znacznika.
Do eksperymentowania / pracy na komputerze osobistym,
    https://localhost:8443  
Dla publiczności. ERDDAP™ ,
    https://*your.domain.org*:8443  
lub, lepiej, bez: 8443 jeśli używasz Apache [proksypass](/docs/server-admin/deploy-install#proxypass) więc numer portu nie jest potrzebny.
     
* W ustawieniach xml należy zmienić&lt;uwierzytelnienie &gt; wartość znacznika dla google, orcid lub oauth2, na przykład:
```
    <authentication>oauth2</authentication>  
```
###### Konfiguracja Google{#google-setup} 
* Dla opcji google i oauth2:
Postępuj zgodnie z instrukcjami poniżej, aby skonfigurować uwierzytelnianie Google dla Twojego ERDDAP .
     
    1. Jeśli nie masz konta e-mail Google, [stwórz jeden](https://www.google.com/intl/en_us/mail/help/about.html)   
         
    2. Śledź [instrukcje](https://developers.google.com/identity/sign-in/web/devconsole-project) aby utworzyć projekt Google Developers Console i uzyskać identyfikator klienta.
        
Kiedy formularz Google prosi o autoryzację Java Pochodzenie skryptu, wprowadź wartość z&lt;baseHttpsUrl &gt; z komputera osobistego ERDDAP™ setup.xml, np.,
        https://localhost:8443  
Na drugiej linii, dodać&lt;baseHttpsUrl &gt; z Twojej publiczności ERDDAP™ setup.xml, np.,
        https://*your.domain.org*:8443
        
Nie określaj autoryzowanych przekierowań URI.
        
Kiedy widzisz identyfikator klienta dla tego projektu, kopiuj i wklej go do setup.xml (zazwyczaj tuż poniżej&lt;uwierzytelnianie &gt; być uporządkowane, ale umieszczenie nie ma znaczenia), w&lt;googleClientID &gt; tag, np.,
        &lt;googleClientID &gt; *Twój identyfikator klienta* &lt;/ googleClientID &gt;
Identyfikator klienta będzie ciągiem około 75 znaków, prawdopodobnie zaczynając od kilku cyfr i kończąc na .apps.googleusercontent.com.
         
        
    3. W datasets.xml , stwórz [&lt;użytkownik &gt;] (/ docs / server- admin / datasets # user) tag dla każdego użytkownika, który będzie miał dostęp do prywatnych zbiorów danych. Dla atrybutu nazwy użytkownika w znaczniku:
        
        * Dla użytkowników, którzy zalogują się za pomocą Google, użyj adresu e-mail użytkownika.
        * Dla użytkowników, którzy zalogują się z orcid, użyj numeru konta użytkownika Orcid (z kreskami) .
        
Nie określaj atrybutu hasła dla znacznika użytkownika.
         
    4. Uruchom ponownie ERDDAP™ tak, że zmiany setup.xml i datasets.xml zacząć działać.
         
###### Ustawienie orkisza{#orcid-setup} 
* Dla opcji orcid i oauth2:
Postępuj zgodnie z instrukcjami poniżej, aby skonfigurować uwierzytelnianie Orcid dla Twojego ERDDAP .
     (Szczegółowe informacje znajdują się w: [Dokumentacja uwierzytelniania przez Orcid API](https://members.orcid.org/api/integrate/orcid-sign-in) .)   
     
    1. Jeśli nie masz konta Orcida, [stwórz jeden](https://orcid.org/signin)   
         
    2. Zaloguj się do Orcid [https://orcid.org/signin](https://orcid.org/signin) Korzystaj z własnego konta.
         
    3. Kliknij na "Narzędzia programistyczne" (pod nagłówkiem "Dla naukowców" na górze) .
         
    4. Kliknij na "Zarejestruj się za darmo ORCID publiczne API". Wprowadź te informacje:
Nazwa: ERDDAP™ at \\[ Twoja organizacja \\]   
Strona internetowa: \\[ do ERDDAP domeny \\]   
Opis: ERDDAP™ jest serwerem danych naukowych. Użytkownicy muszą uwierzytelniać za pomocą Google lub Orcid, aby uzyskać dostęp do niepublicznych zbiorów danych.
Przekierować URI: \\[ do ERDDAP domeny \\] / erddap / loginOrcid.html
         
    5. Kliknij na ikonę Zapisz (Wygląda jak dysk 3,5-calowy&#33;) .
Następnie możesz zobaczyć swój identyfikator klienta APP oraz tajemnicę klienta ORCID.
         
    6. Kopiuj i wklej identyfikator klienta APP ORCID (który rozpocznie się od "AP-") do setup.xml w&lt;orcidClientID &gt; tag, np.,
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. Kopiuj i wklej tajemnicę klienta ORCID (małe znaki alfabetyczne z kreskami) do setup.xml w&lt;orcidClientSecret &gt; tag, np.,
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. W datasets.xml , stwórz [&lt;użytkownik &gt;] (/ docs / server- admin / datasets # user) tag dla każdego użytkownika, który będzie miał dostęp do prywatnych zbiorów danych. Dla atrybutu nazwy użytkownika w znaczniku:
        
        * Dla użytkowników, którzy zalogują się za pomocą Google, użyj adresu e-mail użytkownika.
        * Dla użytkowników, którzy zalogują się z orcid, użyj numeru konta użytkownika Orcid (z kreskami) .
        
Nie określaj atrybutu hasła dla znacznika użytkownika.
         
    9. Uruchom ponownie ERDDAP™ tak, że zmiany setup.xml i datasets.xml zacząć działać.
             

###### Zaloguj się w obie strony{#log-in-either-way} 
Jeśli używasz opcji uwierzytelniania google, orcid lub oauth2 i Google Sign-In lub API uwierzytelniania Orcid nagle przestaje działać (Z jakiegokolwiek powodu) lub przestaje pracować jako ERDDAP™ oczekuje, użytkownicy nie będą w stanie zalogować się do ERDDAP . Jako tymczasowy (lub stałe) rozwiązanie, można poprosić użytkowników, aby zapisać się do innego systemu (uzyskać konto e-mail Google, lub uzyskać konto Orcid) . Aby to zrobić:

1. Zmień&lt;uwierzytelnienie &gt; tag tak, że pozwala na inny system uwierzytelniania. Opcja oauth2 pozwala użytkownikom zalogować się w każdym systemie.
2. Powielanie każdego z&lt;użytkownik &gt; tagi i zmienić atrybut nazwy użytkownika z adresu e-mail Google na odpowiedni numer konta Orcid (lub na odwrót) , ale zachować atrybut ról ten sam.

###### OpenID{#openid} 
 ERDDAP™ nie obsługuje już openid uwierzytelniania, który został oparty na wersji otwartej Identyfikator, który jest nieaktualny. Proszę użyć opcji google, orcid lub oauth2 zamiast.

###### PODSTAWA{#basic} 
 ERDDAP™ nie obsługuje uwierzytelniania BASIC, ponieważ:
* BASIC wydaje się zorientowana na wstępnie zdefiniowane strony internetowe wymagające bezpiecznego dostępu lub koc na / off dostępu do całej strony, ale ERDDAP™ pozwala (ograniczony dostęp) zbiory danych, które należy dodać w locie.
* Autoryzacja bazy nie zapewnia użytkownikom możliwości wylogowania się&#33;
* Autoryzacja bazy danych jest znana jako niebezpieczna.

##### Bezpieczne źródła danych{#secure-data-sources} 
Jeśli zestaw danych ma mieć ograniczony dostęp do ERDDAP™ użytkownicy, źródło danych (skąd ERDDAP™ otrzymuje dane) nie powinny być publicznie dostępne. So how can ERDDAP™ uzyskać dane dotyczące zbiorów danych o ograniczonym dostępie? Niektóre opcje to:

*    ERDDAP™ może obsługiwać dane z lokalnych plików (na przykład poprzez tabelę EDDTable Pliki FromFiles lub EDDGrid Pliki FromFiles) .
     
*    ERDDAP™ może być w [DMZ](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing) ) oraz źródło danych (np. OPeNDAP serwer lub baza danych) może być za [firewall](https://en.wikipedia.org/wiki/Firewall) , gdzie jest dostępny dla ERDDAP™ ale nie publicznie.
     
* Źródło danych może być na stronie publicznej, ale wymagają logowania, aby uzyskać dane. Dwa rodzaje zbioru danych, które ERDDAP™ można zalogować się do dostępu [EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase) oraz [EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra) . Wsparcie dla zbiorów danych (i należy zawsze stosować) nazwy użytkowników (Utwórz ERDDAP™ użytkownik, który ma tylko uprawnienia read- only) , hasła, połączenia SSL i inne środki bezpieczeństwa.
    
Ale generalnie, obecnie, ERDDAP™ nie może poradzić sobie z tymi źródłami danych, ponieważ nie ma przepisów dotyczących logowania się do źródła danych. Dlatego też [ EDDGrid FromErddap i EDDTable FromErddap](/docs/server-admin/datasets#eddfromerddap) Zestawy danych nie mogą być ograniczone. Obecnie lokalne ERDDAP™ nie ma możliwości logowania się i dostępu do informacji metadanych z pilota ERDDAP . I wkładanie "pilota" ERDDAP™ za firewallem i usunięcie tego zbioru danych jest dostępne Do ograniczeń nie rozwiązuje problemu: od wniosków użytkowników dla EDDXxx Dane FromErddap muszą być przekierowane do pilota ERDDAP™ , pilot ERDDAP™ muszą być dostępne.
    
#### Obrona przed hakerami{#defenses-against-hackers} 
Są źli hakerzy, którzy próbują wykorzystać słabości bezpieczeństwa w oprogramowaniu serwera jak ERDDAP . ERDDAP™ zgodnie ze wspólnymi zaleceniami bezpieczeństwa, aby mieć kilka warstw obrony:

* Ograniczone przywileje... Jedną z najważniejszych obrony jest uruchomienie Tomcat przez użytkownika o nazwie Tomcat, który nie ma hasła (więc nikt nie może zalogować się jako ten użytkownik) i ma ograniczone uprawnienia systemu plików (np. dostęp do danych tylko do odczytu) . Patrz ERDDAP instrukcje [ustawienie tomcat](/docs/server-admin/deploy-install#tomcat) .
* Ciężkie użycie - Ogólnie, ERDDAP™ jest zbudowany do ciężkiego użytku, w tym przez skrypty, które składają dziesiątki tysięcy wniosków, jeden po drugim. To jest trudne dla ERDDAP™ aby jednocześnie otworzyć się na poważne legalne wykorzystanie i chronić się przed nadużyciami. Czasami trudno jest odróżnić poważne, uzasadnione użycie, nadmierne i nielegalne użycie (i czasami to jest naprawdę łatwe) . Między innymi obroną, ERDDAP™ Świadomie nie pozwala na użycie niewspółmiernej części zasobów systemu (chyba że system nie jest aktywny) .
* Identyfikacja problematycznych użytkowników - Jeśli ERDDAP™ zwalnia lub zamraża (być może dlatego, że naiwny użytkownik lub bot uruchamia wiele skryptów do składania wielu wniosków jednocześnie lub być może z powodu złego faceta [Denial- of- service](https://en.wikipedia.org/wiki/Denial-of-service_attack) atak) , można spojrzeć na [Dzienny raport e-mail](#daily-report)   (i częstsze identyczne informacje w [ ERDDAP™ plik dziennika](#log) ) które wyświetla liczbę wniosków złożonych przez najbardziej aktywnych użytkowników (Patrz "Adres IP Requester (Dozwolone) ") . ERDDAP™ również wysyła e-maile do administratora, gdy istnieje ["Niezwykła aktywność: &gt; 25% wniosków nie powiodło się"](#failed-requests) . Można wtedy spojrzeć w ERDDAP™ Zaloguj plik, aby zobaczyć charakter ich wniosków. Jeśli czujesz, że ktoś robi zbyt wiele żądań, dziwaczne prośby (Nie uwierzyłbyś w to, co widziałem.) , lub żądania typu attack- type, można dodać ich adres IP do czarnej listy.
* Czarna lista... Możesz dodać adres IP kłopotliwych użytkowników, botów i [Denial- of- service](https://en.wikipedia.org/wiki/Denial-of-service_attack) atakujący ERDDAP   [czarna lista](/docs/server-admin/datasets#requestblacklist) , aby przyszłe wnioski od nich zostały niezwłocznie odrzucone. To ustawienie jest w datasets.xml więc można szybko dodać adres IP do listy, a następnie [bandera](#flag) zestaw danych tak, że ERDDAP™ niezwłocznie powiadamia i stosuje zmianę. Komunikat błędu wysłany do użytkowników na czarnej liście zachęca ich do kontaktu z ERDDAP™ Administrator, jeśli uważają, że zostały błędnie umieszczone na czarnej liście. (Z naszego doświadczenia wynika, że kilku użytkowników nie wie, że jednocześnie uruchamiali wiele skryptów lub że ich skrypty składały bezsensowne prośby.) 
* Dataset Security - Niektóre rodzaje zbiorów danych (w szczególności, EDDTableFromDatabase) przedstawiają dodatkowe zagrożenia bezpieczeństwa (np. wtrysk SQL) i mają własne środki bezpieczeństwa. Zob. informacje dotyczące tych rodzajów zbiorów danych w [Praca z datasets.xml Plik](/docs/server-admin/datasets) , w szczególności [Bezpieczeństwo EDDTableFromDatabase](/docs/server-admin/datasets#database-security) .
* Audyt bezpieczeństwa... Chociaż NOAA Ochrona IT odrzuciła nasze prośby o skanowanie przez lata, teraz rutynowo skanują moje (Bob)   ERDDAP™ instalacja. Chociaż wstępne skany wykryły pewne problemy, które potem naprawiłem, kolejne skany nie wykryły problemów z ERDDAP . Skany martwią się o wiele rzeczy: zwłaszcza, ponieważ tabledap żądania wyglądają jak prośby SQL, oni martwią się o SQL szczelności wtrysku. Ale te obawy są bezpodstawne, ponieważ ERDDAP™ zawsze przenika i waliduje zapytania, a następnie oddzielnie buduje zapytanie SQL w sposób pozwalający uniknąć słabych punktów wtrysku. Inną rzeczą, na którą czasami narzekają jest to, że nasze Java Wersja lub wersje Tomcat nie są tak up- to- date jak chcą, więc uaktualniamy je w odpowiedzi. Zaproponowałem, że pokażę ludziom raporty bezpieczeństwa, ale powiedziano mi, że nie mogę tego zrobić.

#### Pytania? Sugestie?{#questions-suggestions} 
Jeśli masz jakieś pytania na temat ERDDAP system bezpieczeństwa lub mają jakiekolwiek pytania, wątpliwości, obawy, lub sugestie dotyczące sposobu jego utworzenia, zobacz nasz [rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support) .
    

## Rzeczy, których nie musisz wiedzieć{#things-you-dont-need-to-know} 

To są szczegóły, o których nie musisz wiedzieć, dopóki nie pojawi się potrzeba.

### Drugi ERDDAP™  {#second-erddap} 
*    **Ustawianie drugiego ERDDAP™ dla badań / rozwoju**   
Jeśli chcesz to zrobić, są dwa podejścia:
    *    (Najlepsze) Zainstaluj Tomcat i ERDDAP™ na komputerze innym niż komputer, który ma twoją publiczność ERDDAP . W przypadku korzystania z komputera osobistego:
        1. Wykonać montaż krok po kroku. Najpierw uruchom Tomcata.
Kiedy Tomcat działa, Tomcat Manager powinien być w
             [http://127.0.0.1:8080/manager/html/](http://127.0.0.1:8080/manager/html/)   (albo może [http://localhost:8080/manager/html/](http://localhost:8080/manager/html/) ) 
        2. Instalacja ERDDAP .
        3. Nie używać ProxyPass, aby usunąć numer portu z ERDDAP™ URL.
        4. W [setup.xml](/docs/server-admin/deploy-install#setupxml) , set baseUrl dohttp://127.0.0.1:8080
        5. Po tym jak zaczniesz to ERDDAP™ , powinieneś być w stanie zobaczyć to w
             [http://127.0.0.1:8080/erddap/status.html](http://127.0.0.1:8080/erddap/status.html)   (albo może [http://localhost:8080/erddap/status.html](http://localhost:8080/erddap/status.html) ) 
#### Drugi Tomcat{#second-tomcat} 
*    (Drugi najlepszy) Zainstaluj innego Tomcata na tym samym komputerze co publiczność ERDDAP .
    1. Wykonać montaż krok po kroku. Najpierw uruchom Tomcata.
Zmień wszystkie numery portów związane z drugim Tomcat (np. zmienić 8080 na 8081)   (Patrz [Wielokrotny Tomcat Punkt "Przypadki"](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt) w połowie tego dokumentu) .
    2. Instalacja ERDDAP™ w nowym Tomcat.
    3. Nie używać ProxyPass, aby usunąć numer portu z ERDDAP™ URL.
    4. W [setup.xml](/docs/server-admin/deploy-install#setupxml) , set baseUrl dohttp://www.*yourDomainName*:8081
    5. Po tym jak zaczniesz to ERDDAP™ , powinieneś być w stanie zobaczyć to w
        http://www.*yourDomainName*:8081/erddap/status.html  
             
### Napędy państwa stałego{#solid-state-drives} 
*    **Napędy państwa stałego (SSD) Są świetne&#33;**   
Najszybszy, najprostszy i najtańszy sposób na przyspieszenie ERDDAP Dostęp do danych tabelarycznych polega na umieszczeniu plików danych na Solid State Drive (SSD) . Większość zbiorów danych tabelarycznych jest stosunkowo mała, więc SSD 1 lub 2 TB jest prawdopodobnie wystarczające, aby przechowywać wszystkie pliki danych dla wszystkich zbiorów tabelarycznych. SSD w końcu zużywa się, jeśli zapisujesz dane do komórki, usuwasz je i zapisujesz nowe dane do tej komórki zbyt wiele razy. Więc jeśli używasz SSD, aby zapisać dane raz i przeczytać je wiele razy, nawet SSD klasy konsumenckiej powinien trwać bardzo długo, prawdopodobnie znacznie dłużej niż dysk twardy (Dysk twardy) . SSD są teraz tanie (w 2018 r., ~ 200 dolarów za 1 TB lub ~ 400 dolarów za 2 TB) a ceny wciąż szybko spadają. Kiedy ERDDAP™ dostęp do pliku danych, SSD oferuje zarówno krótsze opóźnienia (0.1ms, versus ~ 3ms for an HDD, versus ~ 10 (?) ms for a RAID, versus ~ 55ms for Amazon S3) i większa przepustowość (~ 500 MB / S, w porównaniu z ~ 75 MB / s dla dysku twardego, w porównaniu z ~ 500 MB / s dla RAID) . Więc możesz dostać duży przyrost wydajności (do 10X kontra dysk twardy) Za 200 dolarów&#33; W porównaniu do większości innych możliwych zmian w systemie (nowy serwer za $10,000? Nowy RAID za 35,000 dolarów? nowy przełącznik sieci za 5000 dolarów? itd.) , jest to zdecydowanie najlepszy zwrot z inwestycji (ROI) . Jeśli / kiedy SSD umiera (w ciągu 1, 2,... 8 lat) Zastąp go. Nie licz na to, jak na dłuższą metę, archiwalne przechowywanie danych, tylko na wstępną kopię danych. \\[ SSD 's byłoby również dobre dla danych zawiązanych, ale większość zawiązanych zbiorów danych są znacznie większe, co SSD bardzo drogie. \\] 
    
Jeśli serwer nie jest załadowany pamięcią, dodatkowa pamięć dla serwera jest również świetnym i stosunkowo niedrogim sposobem na przyspieszenie wszystkich aspektów ERDDAP .
     
    
###  [Ciężkie obciążenia / ograniczenia](#heavy-loads--constraints)  **  {#heavy-loads--constraints} 
Z ciężkim użyciem, samotne ERDDAP™ mogą być ograniczone przez różne problemy. Więcej informacji na ten temat znajduje się w: [wykaz ograniczeń i rozwiązań](/docs/server-admin/scaling#heavy-loads--constraints) .
     
### Grids, Clusters, and Federations{#grids-clusters-and-federations} 
Pod bardzo dużym użyciem, jeden samodzielny ERDDAP™ napotkają na jedno lub więcej ograniczeń, a nawet proponowane rozwiązania będą niewystarczające. W takich sytuacjach, ERDDAP™ posiada funkcje ułatwiające budowę skalowalnych sieci (nazywane również klastrami lub federacjami) z ERDDAP s, które pozwalają systemowi na bardzo intensywne stosowanie (np. dla dużego centrum danych) . Więcej informacji można znaleźć na stronie: [sieci, klastrów i federacji ERDDAP s](/docs/server-admin/scaling) .
     
### Cloud Computing{#cloud-computing} 
Kilka firm zaczyna oferować [usługi przetwarzania w chmurze](https://en.wikipedia.org/wiki/Cloud_computing)   (np., [Amazon Web Services](https://aws.amazon.com/) ) . [Firmy hostingowe WWW](https://en.wikipedia.org/wiki/Web_hosting_service) oferowały prostsze usługi od połowy 1990 roku, ale usługi "chmura" znacznie zwiększyły elastyczność systemów i zakres oferowanych usług. Możesz użyć tych usług do skonfigurowania jednego ERDDAP™ lub siatkę / klaster ERDDAP s do bardzo intensywnego stosowania. Więcej informacji można znaleźć na stronie: [w chmurze obliczeniowej ERDDAP™ ](/docs/server-admin/scaling#cloud-computing) .

### Amazon{#amazon} 
*    ** [Amazon Web Services (AWS) Przegląd instalacji EC2](#amazon) **   
     [Amazon Web Services (AWS) ](https://aws.amazon.com/) jest [usługi przetwarzania w chmurze](https://en.wikipedia.org/wiki/Cloud_computing) który oferuje szeroki zakres infrastruktury komputerowej, które można wynająć w ciągu godziny. Możesz zainstalować ERDDAP™ w sprawie [Elastyczna chmura obliczeniowa (EC2) ](https://aws.amazon.com/ec2/) instancja (ich nazwa dla komputera, który można wynająć w ciągu godziny) . AWS ma doskonałe [Przewodnik użytkownika AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) i możesz użyć Google, aby znaleźć odpowiedzi na konkretne pytania, które możesz mieć. Szykuj się - to sporo pracy, by zacząć. Ale po uruchomieniu jednego serwera, można łatwo wynająć jak najwięcej dodatkowych zasobów (serwery, bazy danych, SSD- space itp.) jak potrzebujesz, za rozsądną cenę. \\[ To nie jest rekomendacja ani poparcie Amazon Web Services. Są inni dostawcy chmur. \\] 
    
Przegląd rzeczy trzeba zrobić, aby ERDDAP™ działa na AWS jest:
    
    * Ogólnie rzecz biorąc, zrobisz wszystkie rzeczy opisane w [Przewodnik użytkownika AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) .
    * Ustaw konto AWS.
    * Ustaw użytkownika AWS na tym koncie z uprawnieniami administratora. Zaloguj się jako ten użytkownik, aby wykonać wszystkie następujące kroki.
    * Elastyczne przechowywanie bloków (EBS) jest odpowiednikiem AWS dysku twardego dołączonego do serwera. Część przestrzeni EBS zostanie przydzielona po pierwszym utworzeniu instancji EC2. To jest trwałe przechowywanie - informacja nie jest utracona, gdy zatrzymasz EC2 instancji. A jeśli zmienisz typy instancji, przestrzeń EBS automatycznie zostanie przymocowana do nowej instancji.
    * Utwórz elastyczny adres IP tak, aby instancja EC2 miała stabilny, publiczny adres URL (w przeciwieństwie do prywatnego adresu URL, który zmienia się za każdym razem, gdy ponownie uruchomisz instancję) .
    * Utwórz i uruchom instancję EC2 (komputer) . Istnieje szeroki zakres [typy instancji](https://aws.amazon.com/ec2/instance-types/) Każdy za inną cenę. M4.large lub m4.xlarge instance jest potężny i prawdopodobnie nadaje się do większości zastosowań, ale wybierz, co odpowiada Twoim potrzebom. Prawdopodobnie będziesz chciał użyć Linuksa Amazon jako systemu operacyjnego.
    * Jeśli komputer stacjonarny / laptop jest komputerem Windows, można użyć [PUTTY](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html) , darmowy klient SSH dla systemu Windows, aby uzyskać dostęp do linii poleceń instancji EC2. Albo możesz mieć inny program SSH, który wolisz.
    * Po zalogowaniu się do instancji EC2 będziesz zalogowany jako użytkownik administracyjny o nazwie użytkownika "ec2- user". Użytkownik ec2-ma uprawnienia sudo. Więc jeśli musisz coś zrobić jako użytkownik root, użyj: sudo *someCommand* 
    * Jeśli komputer stacjonarny / laptop jest komputerem Windows, można użyć [Plik](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp) , darmowy program SFTP, do przesyłania plików do / z instancji EC2. Albo możesz mieć inny program SFTP, który wolisz.
    *    [Zainstaluj Apache](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html) w twoim przypadku EC2.
    * Postępuj zgodnie ze standardem [ ERDDAP™ instrukcje instalacji](/docs/server-admin/deploy-install) .
         
### Poczekajmy jeszcze raz.{#waitthentryagain-exception} 
Użytkownik może otrzymać komunikat o błędzie
WaitThenTryAgainException:
Był... (Tymczasowe?) problem. Poczekaj chwilę, potem spróbuj jeszcze raz. (W przeglądarce kliknij przycisk Przeładuj.)   
Szczegóły: GridDataAccesor.increment: partialResults \\[ 0 \\] = = "123542730" miał być "123532800".

Ogólne wyjaśnienie WaitThenTryAgainException jest:
Kiedy ERDDAP™ odpowiada na żądanie użytkownika, może wystąpić nieoczekiwany błąd z zestawem danych (np. błąd podczas odczytu danych z pliku lub błąd dostępu do zdalnego zbioru danych) . Czekaj ThenTryAgain sygnały do ERDDAP™ że wniosek nie powiódł się (Jak dotąd) Ale... ERDDAP™ powinien spróbować przeładować zestaw danych szybko (to dzwoni [RequestReloadASAP](#requestreloadasap) ) i ponownie spróbować prośby. Często to się udaje, a użytkownik widzi, że odpowiedź na wniosek była powolna. Innym razem przeładowanie nie udaje się lub jest zbyt wolne, lub późniejsza próba radzenia sobie z żądaniem również nie udaje i rzuca inny WaitThenTryAgain. Jeśli tak się stanie, ERDDAP™ oznacza zbiór danych do przeładowania, ale informuje użytkownika (przez WaitThenTryAgain Exception) że doszło do niepowodzenia w odpowiedzi na wniosek.

To normalne zachowanie. System ten może rozwiązać wiele wspólnych problemów.
Ale ten system może zostać nadmiernie uruchomiony. Najczęstszą przyczyną jest ERDDAP załadowanie zbioru danych nie widzi problemu, ale ERDDAP W odpowiedzi na prośbę o dane dostrzega się problem. Bez względu na przyczynę, rozwiązanie jest dla ciebie, aby poradzić sobie z tym, co jest nie tak z zbiorem danych. Sprawdź w log.txt, aby zobaczyć rzeczywiste komunikaty błędów i uporać się z problemami. Jeśli wiele plików posiada poprawne nagłówki, ale nieprawidłowe dane (plik uszkodzony) , zastąpić pliki nieuszkodzonymi plikami. Jeśli połączenie z RAID jest flakey, naprawić go. Jeśli połączenie z usługą zdalną jest flakey, znajdź sposób, aby nie było flakey lub pobrać wszystkie pliki ze zdalnego źródła i podawać dane z lokalnych plików.

Szczegółowe wyjaśnienie tego konkretnego błędu (powyżej) jest:
Dla każdego EDDGrid zbiór danych, ERDDAP™ utrzymuje zmienne wartości osi w pamięci. Są one wykorzystywane, na przykład, do konwersji żądanych wartości osi, które używają " () "format do numerów indeksowych. Na przykład, jeśli wartości osi są" 10, 15, 20, 25 ", wniosek (20) będzie interpretowany jako wniosek o indeks # 2 (Wskaźniki 0) . Kiedy ERDDAP™ otrzymuje żądanie dotyczące danych i pobiera dane ze źródła, weryfikuje, że wartości osi, które otrzymał ze źródła, odpowiadają wartościom osi w pamięci. Normalnie tak. Ale czasami źródło danych zmieniło się w znaczący sposób: na przykład, wartości indeksowe od początku zmiennej osi mogły zostać usunięte (np. "10, 15, 20, 25" mogło stać się "20, 25, 30") . Jeśli tak się stanie, jasne jest, że ERDDAP wykładnia wniosku (np. ", (20) "jest indeksem # 2) Teraz się myli. Więc... ERDDAP™ Rzuca wyjątek i wzywa RequestReloadASAP. ERDDAP™ wkrótce zaktualizuje zbiór danych (często w ciągu kilku sekund, zwykle w ciągu minuty) . Inne, podobne problemy również rzucić wyjątek WaitThenTryAgain.
    
#### RequestReloadASAP{#requestreloadasap} 
Możesz zobaczyć RequestReloadASAP w pliku log.txt tuż po wiadomości błędu i często w pobliżu [Poczekajmy jeszcze raz.](#waitthentryagain-exception) . Jest to w zasadzie wewnętrzny, programowy sposób dla ERDDAP™ do ustawienia [bandera](#flag) sygnalizować, że zestaw danych powinien być przeładowany jak najszybciej.
     
### Pliki nie zostały usunięte{#files-not-being-deleted} 
Dla kilku ERDDAP™ Instalacje, pojawił się problem z niektórych plików tymczasowych tworzonych przez ERDDAP™ pozostawanie otwartym (Omyłkowo) a tym samym nie zostały usunięte. W kilku przypadkach wiele z tych plików zgromadziło się i przejęło znaczną ilość miejsca na dysku.

Miejmy nadzieję, że problemy te zostaną rozwiązane. (od ERDDAP™ v2.00) . Jeśli widzisz ten problem, proszę wysłać do Chrisa katalog + nazwy obraźliwych plików. John w Noah. Masz kilka opcji do rozwiązania problemu:

* Jeśli pliki nie są duże i nie powodują, że brakuje miejsca na dysku, możesz zignorować problem.
* Najprostszym rozwiązaniem jest zamknięcie Tomcat / ERDDAP™   (po godzinach, więc mniej użytkowników są dotknięte) . Podczas wyłączenia, jeśli system operacyjny nie usunie plików, usuń je ręcznie. Następnie ponownie uruchom ERDDAP .
         
### JSON- LD{#json-ld} 
*    ** [Semantyczne Znakowanie Dataset z json- ld (JSON Dane powiązane) ](#json-ld) **   
     ERDDAP™ teraz używa [json- ld (JSON Dane powiązane) ](https://json-ld.org) aby twój katalog danych i zbiory danych były częścią [web semantyczny](https://en.wikipedia.org/wiki/Semantic_Web) , co jest pomysłem Tima Bernersa-Lee, aby treści internetowe bardziej czytelne i maszyny "zrozumiałe". Zawartość json- ld wykorzystuje [schema.org](https://schema.org/) terminy i definicje. Wyszukiwarki ( [W szczególności Google](https://developers.google.com/search/docs/data-types/datasets) ) i inne narzędzia semantyczne mogą wykorzystać tę strukturalną marżę, aby ułatwić odkrywanie i indeksowanie. Json- ld zorganizowany markup wydaje się niewidzialny - do - ludzi&lt;skrypt &gt; Kodhttps://.../erddap/info/index.htmlstrona internetowa (który jest web semantyczny [Katalog danych](https://schema.org/DataCatalog) ) i na każdyhttps://.../erddap/info/*datasetID*/index.htmlstrona internetowa (który jest web semantyczny [Zestaw danych](https://schema.org/Dataset) ) . (Specjalne podziękowania dla Adama Leadbetter i Roba Fullera z Instytutu Morskiego w Irlandii za wykonywanie trudnych części pracy, aby ta część ERDDAP .)   
     
### URL Out- Of- Date{#out-of-date-urls} 
Powoli, ale na pewno, adresy URL, które dostawcy danych zapisali do plików danych stają się nieaktualne (na przykład: http staje się https , strony internetowe są rearanżowane, a organizacje takie jak NODC / NGDC / NCDC są reorganizowane w NCEI) . Wynikające z tego połamane linki są zawsze obecnym problemem, przed którym stoją wszystkie strony internetowe. Żeby sobie z tym poradzić, ERDDAP™ teraz ma system do automatycznej aktualizacji URL-of@-@ date. Jeśli GenerateDatasets Xml widzi URL-of- date, dodaje URL up- to- date do&lt; addAttributes &gt;. Również, gdy zestaw danych ładuje, jeśli ERDDAP™ widzi URL-of- date, po cichu zmienia go na URL up- to- date. Zmiany są kontrolowane przez serię poszukiwań / wymiany par zdefiniowanych w&lt;updateUrls &gt; w ERDDAP jest
 \\[ tomcat \\] / webapps / erddap / WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml file. Tam możesz dokonać zmian. Jeśli masz sugestie zmian, lub jeśli uważasz, że to powinno być zamienione w usługę (Jak Konwertery) Proszę wysłać maila do Chrisa. John w Noah.
     
### CORS{#cors} 
* CORS ( [Cross- Pochodzenie Dzielenie się zasobami](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) )   
"jest mechanizmem pozwalającym na ograniczone zasoby (np. czcionki lub ERDDAP™ dane) na stronie internetowej, która ma być wymagana z innej domeny poza domeną, z której podano pierwszy zasób " (Arun Ranganathan) . Zasadniczo, CORS jest wiadomością, która może być umieszczona w nagłówku HTTP odpowiedzi, mówiąc zasadniczo, "jest w porządku z tej strony, jeśli niektóre inne strony (specyficzne lub wszystkie) przechwytywanie zasobów (np. dane) z tej strony i udostępnić na ich stronie ". Jest to zatem alternatywa dla [JSONP](https://en.wikipedia.org/wiki/JSONP) .
    
Twórcy ERDDAP™ nie twierdzą, że są ekspertami w zakresie bezpieczeństwa. Nie do końca rozumiemy kwestie bezpieczeństwa związane z CORS. Nie chcemy składać żadnych oświadczeń popierających działanie, które zmniejsza bezpieczeństwo. Więc pozostaniemy neutralni i zostawimy to każdemu. ERDDAP™ admin zdecydować, czy korzyści lub możliwość nagłówka CORS są warte ryzyka. Jak zawsze, jeśli ERDDAP™ posiada prywatne zbiory danych, to dobry pomysł, aby być bardzo ostrożnym w kwestii bezpieczeństwa.
    
Jeśli chcesz włączyć CORS ERDDAP™ Są [łatwo dostępne instrukcje](https://enable-cors.org/index.html) opisujące, w jaki sposób administratorzy stron internetowych mogą włączyć nagłówek CORS poprzez ich oprogramowanie serwera niższego poziomu (np., Apache lub nginx) .
    
### Palety{#palettes} 
* Palety są używane przez ERDDAP™ do konwersji zakresu wartości danych na szereg kolorów podczas tworzenia wykresów i map.
    
Każda paleta jest zdefiniowana w pliku palety w stylu .cpt- style używanym przez [GMT](https://www.soest.hawaii.edu/gmt/) . Wszystkie ERDDAP™ Pliki .cpt są poprawnymi plikami GMT. Do stosowania w ERDDAP™ , pliki .cpt mają:
    
    * Opcjonalne linie komentarzy na początku pliku, zaczynając od "#".
    * Główna sekcja z opisem segmentów palety, jeden segment na linię. Każda linia opisu segmentu ma 8 wartości:
start Wartość, startRed, start Green, start Blue, endValue, endRed, endGreen, endBlue.
Może być wiele segmentów. ERDDAP™ wykorzystuje liniową interpolację między startRed / Green / Blue a endRed / Green / Blue każdego segmentu.
        
Zalecamy, aby każdy segment określał kolor początkowy i końcowy, który jest inny i że kolor początkowy każdego segmentu jest taki sam jak kolor końcowy poprzedniego segmentu, tak aby paleta opisywała ciągłą mieszankę kolorów. ERDDAP™ posiada system do tworzenia na-latać paletę dyskretnych kolorów z palety z ciągłą mieszanką kolorów. An ERDDAP™ użytkownik może określić, czy paleta ma być ciągła (oryginał) lub dyskretne (uzyskane z oryginału) . Istnieją jednak uzasadnione powody, aby nie stosować się do tych zaleceń dla niektórych palet.
        
    * Wartość startowa i wartość końcowa muszą być liczbą całkowitą.
Pierwszy segment musi posiadać startValue = 0 i endValue = 1.
Drugi segment musi posiadać startValue = 1 i endValue = 2.
Etc.
    * Wartości czerwone, zielone i niebieskie muszą być liczbą całkowitą od 0 (brak) ... 255 (pełne) .
    * Koniec pliku musi mieć 3 wiersze z:
        1. Kolor tła rgb dla wartości danych mniejszych od minimum paska kolorów, np.: B 128 128 128
Jest to często startRed, startGreen i startBlue pierwszego segmentu.
        2. Kolor pierwszoplanowy rgb dla wartości danych więcej niż maksimum paska kolorów, np.: F 128 0 0
Jest to często endRed, endGreen i endBlue ostatniego segmentu.
        3. Kolor rgb dla wartości danych NaN, np. N 128 128 128
To jest często środkowy szary (128 128 128) .
    * Wartości na każdej linii muszą być oddzielone kartami, bez obcych spacji.
    
Przykładowy plik .cpt to BlueWhiteRed.cpt:
    
# Tu BlueWhiteRed.cpt.
0 0 0 128 1 0 0 25
1 0 0 255
2 0 255 255
3
4
5 255 0 0 6 128 0
B 0 0 128
F 128 0 0
128 128
    
Zobacz istniejące pliki .cpt w innych przykładach. Jeśli jest problem z plikiem .cpt, ERDDAP™ będzie prawdopodobnie rzucać błąd, gdy plik .cpt jest filtrowany (co jest lepsze niż niewłaściwe wykorzystanie informacji) .
    
Możesz dodać dodatkowe palety do ERDDAP . Możesz zrobić je samodzielnie lub znaleźć je w sieci (na przykład, w [cpt- city](http://soliton.vm.bytemark.co.uk/pub/cpt-city/) ) chociaż prawdopodobnie trzeba będzie nieco zmienić ich format, aby dostosować się do ERDDAP wymagania .cpt. To get ERDDAP™ używać nowego pliku .cpt, przechowywać plik w *tomcat* / webapps / erddap / WEB- INF / cptfiles (musisz to zrobić dla każdej nowej wersji ERDDAP ) oraz:
    
    * Jeśli używasz domyślnego pliku messages.xml: dodaj nazwę pliku do pliku&lt;palety &gt; znacznik w
         *tomcat* / webapps / erddap / WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml.
Jeśli to robisz, musisz to robić za każdym razem, gdy uaktualniasz ERDDAP .
    * Jeśli używasz własnego pliku messages.xml: dodaj nazwę pliku do pliku&lt;palety &gt; tag w pliku messages.xml: *tomcat* / content / erddap / messages.xml. Jeśli to zrobisz, musisz to zrobić tylko raz. (ale istnieje inna praca, aby utrzymać niestandardowy plik messages.xml) .
    
Następnie ponownie uruchom ERDDAP™ więc ERDDAP™ zauważa zmiany. Zaletą tego podejścia jest to, że można określić kolejność palet na liście przedstawionej użytkownikom. Jeśli dodasz kolekcję, zachęcamy do dodania prefiksu z inicjałami autorów (np. ", KT\\_ ") do nazwy każdej palety w celu identyfikacji kolekcji i tak, że może być wiele palet, które w przeciwnym razie miałby taką samą nazwę.
    
Proszę nie usuwać ani zmieniać standardowych palet. Są one standardową cechą wszystkich ERDDAP™ instalacje. Jeśli uważasz, że paletę lub kolekcję palet należy włączyć do normy ERDDAP™ dystrybucja, ponieważ jest to / są one ogólnego użytku, proszę wysłać je do Chrisa. John w Noah.
    
### Barierki{#colorbars} 
*    **Jak ERDDAP™ generować kolory w kolorowym pasku?** 
    
    1. Użytkownik wybiera jeden z wstępnie zdefiniowanych [palety](#palettes) lub używa domyślnej, np. Rainbow. Palety są zapisywane / definiowane w plikach tabeli kolorów GMT- style .cpt. Każdy z ERDDAP predefiniowane palety mają prosty zakres liczb całkowitych, np. od 0 do 1 (jeśli w palecie jest tylko jedna sekcja) lub od 0 do 4 (jeśli w palecie są cztery sekcje) . Każdy segment pliku obejmuje n do n + 1, począwszy od n = 0.
    2.   ERDDAP™ generuje nowy plik .cpt na -the- fly, skalując zakres wcześniej zdefiniowanej palety (np. od 0 do 4) do zakresu palety potrzebnej przez użytkownika (np. od 0,1 do 50) a następnie generowanie sekcji w nowej palecie dla każdej sekcji nowej palety (np. skala logarytmiczna z kleszczami przy 0,1, 0,5, 1, 5, 10, 50 będzie miała 5 sekcji) . Kolor punktu końcowego każdej sekcji jest generowany przez znalezienie odpowiedniej sekcji palety w pliku .cpt, a następnie liniowo interpolując wartości R, G i B. (To tak jak GMT generuje kolory z plików tabeli kolorów.) Ten system pozwala ERDDAP™ zacząć od palet generycznych (np. tęcza z 8 segmentami, w sumie od 0 do 8) i tworzyć niestandardowe palety na -the- fly (np. niestandardowa Rainbow, która odwzorowuje 0,1 do 50 mg / L na kolory tęczy) .
    3.   ERDDAP™ następnie wykorzystuje ten nowy plik .cpt do generowania koloru dla każdego kolorowego piksela w pasku kolorów (i później dla każdego punktu danych podczas rysowania danych na wykresie lub mapie) , ponownie poprzez znalezienie odpowiedniej sekcji palety w pliku .cpt, a następnie liniowo interpolując wartości R, G i B.
    
Proces ten może wydawać się niepotrzebnie skomplikowany. Ale rozwiązuje problemy związane ze skalami logarytmicznymi, które trudno rozwiązać w inny sposób.
    
Więc jak możesz naśladować co ERDDAP™ Robi to? To nie jest łatwe. Zasadniczo trzeba powielić proces, który ERDDAP™ jest używany. Jeśli jesteś Java programista, możesz użyć tego samego Java klasy ERDDAP™ wykorzystuje do tego wszystkiego:
     *tomcat* / webapps / erddap / WEB- INF / classes / gov / noaa / pfel / coashwatch / sgt / CompoundColorMap.java
    
### Wytyczne dotyczące systemów dystrybucji danych{#guidelines-for-data-distribution-systems} 
Więcej ogólnych opinii na temat projektowania i oceny systemów dystrybucji danych można znaleźć [Tutaj](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html) .
     
### ArchiveADATASET{#archiveadataset} 
Zawarte w Twoim ERDDAP™ instalacja jest narzędziem linii poleceń o nazwie ArchiveAdataset, które może pomóc w tworzeniu archiwum (a .zip lub .tar  .gz plik) z częścią lub wszystkimi zestawami danych przechowywanymi w serii netcdf-3 .nc pliki danych w formacie plików, który nadaje się do przekazywania do NOAA archiwum NCEI ( .nc w odniesieniu do zbiorów danych w sieci lub [ .nc CFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA) dla tabelarycznych zbiorów danych, określonych przez [NCEI NetCDF Szablony v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html) ) .

ArchiveA Dataset może tworzyć dwa różne formaty archiwów:

* Format "oryginalny" jest następujący: [Wytyczne NCEI w sprawie archiwizacji](https://www.ncdc.noaa.gov/atrac/guidelines.html) , ten przewodnik dla [Archiwizacja danych w NCEI](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1) oraz powiązane [Praktyki zapewniające integralność danych](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity) .
* Format "Bagit" tworzy [Pliki BagitName](https://en.wikipedia.org/wiki/BagIt) , standaryzowany format archiwum promowany przez Bibliotekę Kongresu USA, jak określono w [Specyfikacja Bagit v0.97](https://tools.ietf.org/html/draft-kunze-bagit-14) . NOAA NCEI może standaryzować pliki Bagit dla zgłoszeń do archiwum.

Nic dziwnego, że [metadane globalne i zmienne](/docs/server-admin/datasets#global-attributes) że ERDDAP™ zachęty / wymagania to prawie dokładnie te same metadane w pliku CF i ACDD, które NCEI zachęca / wymaga, więc wszystkie zbiory danych powinny być gotowe do przedłożenia do NCEI poprzez [Send2NCEI](https://www.nodc.noaa.gov/s2n/) lub [ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)   (Narzędzie NCEI do zaawansowanego śledzenia i gromadzenia zasobów dla zbiorów archiwalnych) .

Jeśli (do ERDDAP™ administrator) używać ArchiveADATAset do przesyłania danych do NCEI, a następnie (nie NCEI) określi kiedy przesłać część danych do NCEI i co to będzie, ponieważ będziesz wiedział, kiedy są nowe dane i jak określić ten kawałek (i NCEI nie będzie) . Tak więc ArchiveADATAset jest narzędziem do wykorzystania do tworzenia pakietu do przedłożenia do NCEI.

ArchiveA Dataset może być przydatny w innych sytuacjach, na przykład dla ERDDAP™ administratorzy, którzy muszą przekonwertować podzbiór zbioru danych (na prywatny ERDDAP ) z rodzimego formatu pliku do zestawu [ .nc Pliki CF](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA) , tak, że publiczność ERDDAP™ może służyć dane z .nc Pliki CF zamiast oryginalnych plików.

Kiedy już się ustawisz ERDDAP™ i uruchomić go (co najmniej jeden raz) , można znaleźć i używać ArchiveAdataset w *tomcat* / webapps / erddap / WEB- INF. Jest skrypt powłoki (ArchiveADATASEt.sh) dla pliku Linux / Unix i wsadowego (ArchiveADATASET.bat) dla Windows.

W systemie Windows, po raz pierwszy uruchomiony ArchiveAdataset, trzeba edytować ArchiveAdataset. plik bat z edytorem tekstu, aby zmienić ścieżkę do javy. Plik exe, aby Windows mógł znaleźć Java .

Kiedy uruchomisz ArchiveAdataset, zada Ci serię pytań. Dla każdego pytania wpisz odpowiedź, a następnie naciśnij Enter. Lub naciśnij ^ C, aby wyjść z programu w każdej chwili.

Albo, można umieścić odpowiedzi na pytania, w porządku, na linii poleceń. Aby to zrobić, uruchom program raz i wpisać i zapisać swoje odpowiedzi. Następnie możesz utworzyć pojedynczą linię poleceń (z odpowiedziami jako parametry) która prowadzi program i odpowiada na wszystkie pytania.
Użyj domyślnego słowa, jeśli chcesz użyć domyślnej wartości dla danego parametru.
Użyj "" (dwa podwójne cytaty) jako posiadacz miejsca dla pustego łańcucha.
Określanie parametrów w linii poleceń może być bardzo wygodne, na przykład, jeśli używasz ArchiveAdataset raz w miesiącu do archiwizowania danych o wartości miesiąca. Po wygenerowaniu wiersza poleceń z parametrami i zapisaniu go w notatkach lub skrypcie powłoki, musisz tylko dokonać małych zmian każdego miesiąca, aby zrobić archiwum miesiąca.

Pytania, które zadaje ArchiveADATAset pozwalają na:

* Określić opakowanie oryginału lub pliku Bagit. Dla NCEI, użyj Bagit.
* Określić zip lub smoła .gz kompresja pakietu. W przypadku NCEI należy stosować smołę .gz .
* Określić kontaktowy adres e-mail dla tego archiwum (zostanie napisane w pliku READ\\ _ ME.txt w archiwum) .
* Określić datasetID zbioru danych, który chcesz archiwizować.
* Określ, które zmienne danych chcesz archiwizować (zwykle wszystkie) .
* Określ, który podzbiór zbioru danych chcesz archiwizować. Musisz sformatować podzbiór w ten sam sposób, w jaki można by sformatować podzbiór dla żądania danych, tak więc będzie on inny dla zawiązanych danych niż dla tabelarycznych zbiorów danych.
    * W przypadku zbiorów danych w sieci można określić zakres wartości najbardziej lewego wymiaru, zazwyczaj jest to zakres czasu. ArchiveAdataset wykona osobne żądanie i wygeneruje oddzielny plik danych dla każdej wartości w zakresie wartości. Ponieważ zbiorniki danych są zazwyczaj duże, niemal zawsze trzeba będzie określić mały podzbiór w stosunku do wielkości całego zbioru danych.
Na przykład: \\[  (2015- 12- 01) : (2015- 12- 31)  \\]  \\[  \\]  \\[  \\]  \\[  \\] 
    * Dla tabelarycznych zbiorów danych, można określić każdy zbiór ograniczeń, ale często jest to zakres czasu. Ponieważ zbiory danych tabelarycznych są zazwyczaj małe, często możliwe jest określenie żadnych ograniczeń, tak aby cały zbiór danych był archiwizowany.
Na przykład, & time &gt; = 2015-12- 01 & time&lt;2016- 01- 01
* Dla zbiorów danych tabelarycznych: należy podać oddzieloną przecinkami listę 0 lub więcej zmiennych, która określi, w jaki sposób zarchiwizowane dane są dalej podstawiane do różnych plików danych. Dla zbiorów danych, które mają
     [cdm\\ _ data\\ _ type](/docs/server-admin/datasets#cdm_data_type) \\ = TimeSeries | Profil TimeSeriesProfile | Trajektoria | Profil trajektoryName
należy prawie zawsze określić zmienną, która ma cf\\ _ role = timeseries\\ _ id (np., stationID ) lub cf\\ _ role = trajektoria\\ _ id atrybutu. ArchiveAdataset wykona oddzielny wniosek i wygeneruje oddzielny plik danych dla każdej kombinacji wartości tych zmiennych, np. dla każdej stationID .
Dla wszystkich innych zbiorów danych tabelarycznych prawdopodobnie nie podasz żadnych zmiennych do tego celu.
Ostrzeżenie: Jeśli podzbiór zbioru danych jest bardzo duży (&gt; 2GB) i nie ma odpowiedniej zmiennej do tego celu, wtedy ArchiveAdataset nie jest przydatny z tym zbiorem danych. To powinno być rzadkie.
* Określa format pliku dla plików danych, które zostaną utworzone.
Dla zestawów danych w sieci, dla NCEI, zastosowanie .nc .
Dla zbiorów danych tabelarycznych, dla NCEI, zastosowanie [ .nc CFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA) jeżeli jest to opcja; w przeciwnym razie należy .nc .
* Określa typ pliku, który ma być utworzony dla każdego pliku danych i dla całego pakietu archiwum: MD5, SHA-1 lub SHA- 256. Plik digest zapewnia sposób dla klienta (np. NCEI) sprawdzić, czy plik danych został uszkodzony. Tradycyjnie [Pliki .md5](https://en.wikipedia.org/wiki/MD5) Ale teraz są lepsze opcje. Dla NCEI użyj SHA- 256.

Po odpowiedzi na wszystkie pytania ArchiveAdataset:

1. Zrobić serię żądań do zbioru danych i ustawić pliki danych w *bigParentDirectory* ArchiveADATASET * datasetID \\ _ timestamp* /.
Dla zestawionych danych, będzie plik dla każdej wartości najbardziej lewego wymiaru (np. czas) . Nazwa pliku będzie tą wartością (np. wartość czasu) .
Dla tabelarycznych zbiorów danych, będzie plik dla każdej wartości zmiennej... (s) . Nazwa pliku będzie tą wartością. Jeśli istnieje więcej niż jedna zmienna, do tworzenia nazw podkatalogów zostaną użyte lewe zmienne, a do tworzenia nazw plików zostanie użyta najbardziej poprawna zmienna.
Każdy plik danych musi być&lt;2GB (maksymalna dopuszczalna przez .nc pliki wersji 3) .
2. Zrobić plik związany z każdym z plików danych z najmniejszym strawieniem pliku danych. Na przykład, jeśli plik danych jest 46088 .nc a typ digest to .sha256, wtedy plik digest będzie miał nazwę 46088 .nc .sha256.
3. Zrób plik READ\\ _ ME.txt z informacjami o archiwum, w tym listą wszystkich ustawień, które podałeś do wygenerowania tego archiwum.
4. Zrób 3 pliki w *bigParentDirectory* ArchiveADATAset:
    
    * A .zip lub .tar  .gz Nazwa pliku archiwum * datasetID \\ _ timestamp*  .zip   (lub .tar  .gz ) zawierająca wszystkie zainscenizowane pliki danych i pliki strawione. Plik ten może być dowolny rozmiar, ograniczony tylko przez miejsce na dysku.
    * Plik strawy dla pliku archiwum, na przykład: * datasetID \\ _ timestamp*  .zip .sha256.txt
    * Dla "oryginalnego" typu archiwum, nazwany plik tekstowy * datasetID \\ _ timestamp*  .zip .listOfFiles.txt (lub .tar  .gz ) który zawiera listę wszystkich plików w .zip   (lub .tar  .gz ) plik.
    
Jeśli przygotowujesz archiwum do NCEI, to są pliki, które wyślesz do NCEI, być może poprzez [Send2NCEI](https://www.nodc.noaa.gov/s2n/) lub [ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)   (Narzędzie NCEI do zaawansowanego śledzenia i gromadzenia zasobów dla zbiorów archiwalnych) .
5. Usuń wszystkie założone pliki tak, aby tylko plik archiwum (np., .zip ) , trawienie (np. .sha256.txt) archiwum, oraz (opcjonalnie) pliki .listOfFiles.txt pozostają.

#### ISO 19115. xml Pliki metadanych{#iso-19115-xml-metadata-files} 
Pakiet archiwum ArchiveAdataset nie zawiera pliku metadanych ISO 19115 .xml dla zbioru danych. Jeśli chcesz / musisz przesłać plik ISO 19115 do NCEI, możesz wysłać im plik z metadanymi ISO 19115 .xml, który ERDDAP™ utworzony dla zbioru danych (ale NMFS ludzie powinni otrzymać plik ISO 19115 dla swoich zbiorów danych z InPort, jeśli ERDDAP™ nie podaje już tych plików) .

Problemy? Sugestie? ArchiveAdataset jest nowy. Jeśli masz problemy lub sugestie, Zobacz nasze [rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support) .
     
