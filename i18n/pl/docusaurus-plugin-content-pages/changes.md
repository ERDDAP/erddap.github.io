---
title: "ERDDAP™ - Changes"
---
# ERDDAP™Zmiany

ERDDAP™jest doskonałym przykładem[User- Driven Innowacje](https://en.wikipedia.org/wiki/User_innovation), gdzie innowacje produktowe często pochodzą od konsumentów (ERDDAP™użytkownicy) , nie tylko producentów (ERDDAP™programiści) . Na przestrzeni lat, większość pomysłów na nowe funkcje i zmiany wERDDAP™pochodzą od użytkowników. Ci użytkownicy są przypisani poniżej za swoje wspaniałe pomysły. Dziękuję&#33; Proszę zachować te wspaniałe sugestie nadchodzi&#33;

Oto zmiany związane z każdymERDDAP™Wypuścić.

## Wersja 2.26{#version-226} 
 (wydany 2025- 03- 31) 

*    **Dla wszystkich:** 
    * Duża aktualizacja naszej strony dokumentacyjnej: https://erddap.github.io/
 
Oprócz zaktualizowanego wyglądu istnieje ulepszona nawigacja, wyszukiwanie, tłumaczenie, i powinno być łatwiej do przodu&#33;

*    **Nowe funkcje i zmiany (dla użytkowników) :** 
    * Subskrypcje iRSSaktualizacje powinny być bardziej niezawodne dla zbiorów danych, które są często aktualizowane ze zmian plików.

*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * Domyślne zwolnienie wymaga / wspieraJavawersja 21. Powrót w tym wydaniu jest w stanie łatwo zrobićJava17 kompatybilnych binarnych.

    * Nowa funkcja dostosowywania wyświetlanych informacji o zbiorach danych w UI. Oczekujemy, że będzie to szczególnie przydatne w dodaniu takich rzeczy jak cytaty z zestawem danych. Aby uzyskać więcej szczegółów można przeczytać[nowa dokumentacja](/docs/server-admin/display-info). Dzięki Ayush Singh za wkład&#33;

    * Dodatkowe wskaźniki Prometeusza. Największy to "http_ request _ direction _ seconds ", który zawiera czasy odpowiedzi na żądanie w podziale na:" request _ type "," dataset _ id "," dataset _ type "," file _ type "," lang _ code "," status _ code "
Ten format do odczytu maszynowego umożliwi lepsze zbieranie danych pomiarowych, aby zrozumieć, jak użytkownicy korzystają z serwera.

    * Nowy sposób generowania plików ISO19115 XML. Wykorzystuje Apache SIS i jest nową opcją w tym wydaniu. Proszę włączyć i wysłać informacje zwrotne.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * Interfejs będzie teraz tworzyć indywidualne linki dla każdego url w polach takich jakinfoUrlPodsumowanie.

    * Subskrypcje iRSSaktualizacje powinny być bardziej niezawodne dla zbiorów danych, które są często aktualizowane ze zmian plików. Jeśli powoduje to problemy, prosimy o kontakt na GitHub i wyłączyć funkcjonalność poprzez dodanie poniżej flagi do setup.xml.
NIE ZALECA
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Zmienne subset nie będą już automatycznie generowane dla typu zbioru danych EDDTableFromNcCFFiles. Jeśli polegasz na zachowaniu, możesz albo (roztwór) dodaćsubsetVariablesdo definicji zbioru danych w Twoimdatasets.xml, lub dodać flagę poniżej do setup.xml. Jeśli czujesz potrzebę, aby włączyć to, prosimy o kontakt na GitHub, abyśmy mogli lepiej wspierać Twój przypadek wykorzystania do przodu.
NIE ZALECA
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * Serwer przekieruje teraz żądania dokumentacji (under downloads / which is the documentation that 's been migrated) do nowej strony dokumentacji. W razie potrzeby można wyłączyć to z flagą w setup.xml:
NIE ZALECA
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Niewielkie zmiany i poprawki błędów.

*    **DlaERDDAP™Programiści:** 
    * Więcej ulepszeń jakości kodu i dead code cleanup. Obejmuje to niewielkie optymalizacje, lepszą obsługę zamykanych zasobów i migrację z dala od przestarzałych typów danych (jak Vector) .

    * Duża refakturowanie do EDStatic, aby wyciągnąć większość konfiguracji, wiadomości i kodu metrycznego. Lepiej również, aby zawierała inicjalizację i obsługę ścieżek katalogowych (Te ostatnie dwa mają więcej do zrobienia.) 

    * Duży postęp w kierunku oficjalnie wspieranego Docker Image. Plan jest do finalizacji i uwolnienia poERDDAP™2.26 jest dostępny.

## Wersja 2.25{#version-225} 
 (wydany 2024- 10- 31) 

*    **Nowe funkcje i zmiany (dla użytkowników) :** 
    * Pliki EDDTableFromFiles mogą teraz obsługiwać zapytania tylko z wyjściami pochodnymi (globale, skrypt jexl lub zmienne) .
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * Wersja 2.25 wymagaJava21 lub nowsze. Jest to wersja LTS i jest dostępna od ponad roku.
         
    * SharedWatchService jest teraz domyślnym. Jeśli chcesz to wyłączyć, skontaktuj się z Chrisem. John z Noa.gov dać mi znać, więc mogę poprawić go w przyszłych wersjach i dodać:
        &lt;Use SharedWatchService &gt; false&lt;/ useSharedWatchService &gt; do setup.xml.
         
    * WERDDAP™servlet rozpocznie się przy starcie serwera. Co oznacza, że zbiory danych zaczną ładować się natychmiast, zamiast czekać aż zostanie złożony wniosek.
         
    * Parametr removeMVRows w plikach EDDTableFromMultidimNcFiles będzie teraz miał wpływ. Ustawienie go na false może znacznie przyspieszyć niektóre pytania, ale może to nie być odpowiednie dla wszystkich zbiorów danych. Więcej informacji można znaleźć na stronie internetowej:[opis parametru](/docs/server-admin/datasets#removemvrows).
         
    * Zestawy danych (Pliki EDDTableFromNc@@EDDGridPliki FromNc@@) obsługa plików zarr jest teraz obsługiwana. Muszą one zawierać "zarr" w pliku lub pathRetex. Patrz[secion zarr w dokumentacji zbiorów danych](/docs/server-admin/datasets#zarr)więcej szczegółów.
         
    * Nowy typ zbioru danych, EDDTableFromParquetFiles jest teraz obsługiwany. Patrz[EDDTableFromParquetFiles secion w dokumentacji zbiorów danych](/docs/server-admin/datasets#eddtablefromparquetfiles)więcej szczegółów.
         
    *   [Wskaźniki prometeusza](https://prometheus.io/)są teraz dostępne na / erddap / metrics.
         
    * Nowa implementacja parsera XML jest dostępna. Ten nowy parser pozwala na użycie XInclude wdatasets.xml. Dzięki Ayush Singh za rolę.
         
    * Nowy parametr wdatasets.xmldo kontrolowania nietypowych emaili aktywności. unusualActivity Oprocentowanie domyślne do starej wartości 25%. Dzięki Ayush Singh za rolę.
         
    * Nowy parametr w setup.xml, który kontroluje, czy błędy wczytywania zbioru danych są wyświetlane na stronie status.html. Domyślnie true, aby wyłączyć błędy zbioru danych na stronie statusu, ustaw showLoadErrorsOnStatusPage na false:&lt;showLoadErrorsOnStatusPage &gt; false&lt;/ showLoadErrorsOnStatusPage &gt;
         
    * Niewielkie zmiany i poprawki błędów.
         
*    **DlaERDDAP™Programiści:** 
    * Badanie oddzielone od jednostki i integracja (powoli) badania. Również więcej testów włączonych i testy zostały mniej łuszczące.
         
    * Błąd Prone (niektóre kontrole nadal wyłączone) i Spot Bugs zintegrowane przez Maven.
         
    * Pełna podstawa kodu sformatowana w celu dopasowania do Google Style Guide.
         

## Wersja 2.24{#version-224} 
 (wydany 2024- 06- 07) 

*    **Nowe funkcje i zmiany (dla użytkowników) :** 
    * Nowa paleta kolorów EK80 dla dostępnych zbiorów danych akustycznych. Dzięki Robowi Cermakowi.
         
    * Fixen problem, w którym EDDTableAggregateRows nie wykazały właściwe zakresy od wszystkich dzieci. Dzięki Marco Albie za raport z naprawy i błędów.
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * ZMIANA BEZPIECZEŃSTWA: Uwierzytelnianie Google może wymagać zmian w Twoim CSP.
        
W szczególności, można również trzeba dodać https://accounts.google.com/gsi/style Stlye- src i https://accounts.google.com/gsi/ do connect- src. Dla skrypt- src możesz teraz użyć https://accounts.google.com/gsi/client.
 
        
Aby uzyskać więcej informacji można przejść do[Strona Google](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)o konfiguracji CSP.
         
        
    * Nowa wspólna usługa oglądania. Jest to nowa opcja do oglądania katalogów aktualizacji. Posiada jedną nitkę dla każdego systemu plików zamiast jednej nitki na zestaw danych. Najprawdopodobniej spowoduje to drastyczne zmniejszenie liczby wątków używanych do obserwacji zmian. Oznacza to, że wszystkie zbiory danych są aktualizowane razem zamiast każdego zbioru danych o własnej częstotliwości aktualizacji. Najprawdopodobniej będzie to oznaczać częstsze aktualizacje dla większości zbiorów danych.
        
Aby włączyć to dodać&lt;Use SharedWatchService &gt; true&lt;/ useSharedWatchService &gt; do setup.xml.
        
          
Proszę spróbować i zgłosić, jak to działa dla Chrisa. John w Noah.
         
    * Napraw nieprawidłowe nazwy var w logach. Dzięki Ayushowi Singhowi.
         
    * Niewielkie zmiany i poprawki błędów.
         
*    **PoprawaERDDAP™deweloperzy:** 
    * Wsparcie rozwoju lokalnego za pomocą Docker. Dzięki Matt Hopson i Roje.
         
    * Wsparcie rozwoju lokalnego za pomocą Jetty i ulepszenia dokumentacji. Dzięki Micah Wengren.
         
    * Zmiany w testach mających na celu ograniczenie kwestii międzyplatformowych. Dzięki. Shane St. Savage.
         

## Wersja 2.23{#version-223} 
 (wydany 2023- 02- 27) 

Zauważcie, że to wydanie zostało wykonane przez Boba Simonsa, pokazując tym samym, że jest on nadal w pobliżu i aktywny podczas przejścia do Chris John, jego następca. Stan z tym wydaniem, wszystkie zmiany kodu są dokonywane przez Chis John, chyba że określono inaczej.

*    **Nowe funkcje i zmiany (dla użytkowników) :** 
    *    (Brak)   
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * ZMIANA BEZPIECZEŃSTWA: Uwierzytelnianie Google jest obecnie realizowane za pośrednictwem nowej biblioteki Google Identity Services, która jest częścią "Zaloguj się z Google". Wsparcie Google dla starego systemu "Google Sign In" zostanie przerwane 2023- 03- 31. Więc jeśli używasz uwierzytelniania Google w swoimERDDAP™instalacja, MUSISZ zaktualizować doERDDAP™v2.23 + wcześniej. (Bob żałuje, że tak nagle. To wina Boba.)   
         
    * Usprawniono: NCSSV jest teraz v1.2 Zmiana polega na tym, że pliki są teraz zaszyfrowane UTF- 8 (były ASCII) i tak może teraz zawierać dowolny znak Unicode jak jest, bez kodowania jako\\ u _ hhhh _, chociaż to jest nadal dozwolone.
Pisząc pliki NCSSV,ERDDAP™teraz pisze pliki v1.2.
        ERDDAP™będzie nadal czytać pliki NCSSV, które są zgodne ze specyfikacją v1.0 i v1.1.
Dzięki Pauline- Chauvet, n- a- t- e, i thogar- komputer za sugerowanie tego i wykonywanie testów w celu zapewnienia różnych programów arkusza kalkulacyjnego może importować pliki UTF- 8. Dzięki Bobowi Simonsowi za zmianę kodu.
         
    * NOWOŚĆ: Strona status.html ma teraz linię w pobliżu góry, która wskazuje, który plik danych loadDatasets jest obecnie wczytywanie i powiązane statystyki, lub żaden, jeśli nie jest wczytywany zestaw danych. To może być bardzo pomocne dlaERDDAP™administratorzy próbują dowiedzieć się, dlaczego ładować Datasety trwają tak długo. Ponadto nGridDatasets, nTableDatasets i nTotalDatasets liczą się poniżej, które są teraz chwilowe (wcześniej były one od końca ostatniego dużego ładunku Zestawy danych) .
Ta zmiana jest dla Roya Mendelssohna. Dzięki Bobowi Simonsowi za zmianę kodu.
         
    * Usprawnione: GenerateDatasets Xml zmienia się teraz na CF- 1.10 (C- 1, 6) w atrybutach "Konwencje".
Dzięki Bobowi Simonsowi za zmianę kodu.
         
    * Niewielkie zmiany i poprawki błędów.
         

## Wersja 2.22{#version-222} 
 (wydany 2022- 12- 08) 

Zauważ, że to wydanie zostało wykonane przez Boba Simonsa, co pokazuje, że jest on nadal wokół i aktywny podczas przejścia do jego następcy.

*    **Nowe funkcje i zmiany (dla użytkowników) :** 
    *    (Brak)   
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * Do zrobienia: nic.
         
    * ZABEZPIECZENIE BUG FIX: Pojawił się błąd związany z skryptem strony krzyżowej w kodzie wyboru języka. DziękiNOAASkanery bezpieczeństwa. To pokazuje, żeNOAAbezpieczeństwo aktywnie i rutynowo poszukuje słabości bezpieczeństwa wERDDAP.
         
    * ZABEZPIECZENIE FIX: Wiele bibliotek używanych przezERDDAP™jak zwykle, w ramach tego wydania. Tym razem, to obejmuje aktualizację sterownika PostgreSQL (który miał błąd bezpieczeństwa) do 42.5.1.
         
    * ULEPSZONE: Bardziej małe zmianyERDDAPSystem zarządzania pamięcią powinien zmniejszyć szanse na niepowodzenie danego wniosku z powodu braku dostępnej pamięci.
         
    * Niewielkie zmiany i poprawki błędów.
         

## Wersja 2.21{#version-221} 
 (wydany 2022- 10- 09) 

*    **Nowe funkcje i zmiany (dla użytkowników) :** 
    *    (Brak)   
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * TO DO: ForJava17, nie należy używać\\ -d64 w JAVA\\ _ OPTS w setenv.bat lub setenv.sh. Więc jeśli tam jest, proszę go usunąć. Myślę, że 64-bitowy tryb jest teraz wybrany podczas pobierania 64-bitowej wersjiJava. Dzięki Samowi Woodmanowi.
         
    * BUG FIX: Czasami nowy system poczty elektronicznej próbował się zbyt często zalogować, co spowodowało, że serwery Google E-mail odrzucały wszystkie przyszłe próby logowania. System e-mail unika tego i powiązanych problemów.
         

## Wersja 2.20{#version-220} 
 (wydany 2022- 09- 30) 

*    **Nie używaj v2.20. Jest wadliwy.** Jednak administratorzy nadal muszą wykonać pozycje TO DO wymienione poniżej podczas aktualizacji do v2.21 +.
     
*    **Nowe funkcje i zmiany (dla użytkowników) :** 
    *    (Brak)   
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * ULEPSZONE: Ponownie uruchomiliśmy stary system zarządzania pamięcią (Math2.ensureMemories Available) i zmodyfikowany nowy system zarządzania pamięcią (EDStatic.shedThisRequest) lepiej z tym pracować. Patrz[Stan pamięci](/docs/server-admin/additional-information#memory-status)szczegóły.
         
    * ZMIANA: Domyślnie dla&lt;ipAdressMaxRequestions &gt; wdatasets.xmlbyło zwiększone z 7 do 15. To jasne, że jakiś legalnyWMSklienci mogą wygenerować więcej niż 7 jednoczesnych wniosków.
         

## Wersja 2.19{#version-219} 
 (wydany 2022- 09- 01) 

*    **Nie używaj v2.19. Jest wadliwy.** Jednak administratorzy nadal muszą wykonać pozycje TO DO wymienione poniżej podczas aktualizacji do v2.20 +.
     
*    **Nowe funkcje i zmiany (dla użytkowników) :** 
    * NOWOŚĆ: Istnieje nowa funkcja serwera bocznego,orderByDecending, który działa jakorderByAle w porządku malejącym. Dzięki Adamowi Leadbetter.
         
    * Poprawione: Teraz, wykresy (ale nie mapy) rozszerzy się, aby wypełnić dostępną przestrzeń na płótnie, tj., miejsce nie używane przez legendę. Można uzyskać wysokie wykresy, kwadratowe wykresy lub szerokie wykresy poprzez dodanie i manipulację & .size = _ width _|_ height _ parametr (gdzie szerokość i wysokość określają rozmiar płótna, w pikselach) na adres URL wniosku. (Nie jest to opcja na stronie .graph. Musisz to ręcznie dodać do URL.) Jeśli nie podasz parametru & .size, wnioski o .smalpng, .png, .largePng, .smalpdf, .pdf i .large.pdf mają wstępnie zdefiniowane rozmiary płótna, więc wykres rozszerzy się, aby wypełnić dostępną przestrzeń, ale zazwyczaj będzie w przybliżeniu kwadratowy. Dzięki Bobowi Flemingowi.
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * TO DO:ERDDAP™teraz wymagaJava17 i Tomcat 10. Musisz podążać zaERDDAP™instrukcje instalacji (lub odpowiednik np. dla Dockera) do instalacjiJava17 i Tomcat 10 i skopiuj\\[tomcat\\]/ katalog zawartości z instalacji Tomcat 8 do nowego\\[tomcat\\]katalog. Nie ma innych zmian, które należy wprowadzić doERDDAPinstalacja związana z tą zmianą. Innymi słowy,ERDDAP™działa tak jak wcześniej.
        
Nie zapomnij zrobićERDDAP-związane zmiany Tomcat Server.xml i context.xml podczas aktualizacji Tomcat. PatrzERDDAPjest[Instrukcje montażu Tomcat](/docs/server-admin/deploy-install#tomcat).
        
Moje wrażenieJava17 jest to, że preferuje większą moc obliczeniową i pamięć do długich, większych zastosowań, takich jakERDDAP™, więc działa nieco wolniej niżJava8 z komputerami o małej mocy (np. 2 rdzenie i minimalny RAM) i działa nieco szybciej niżJava8 z komputerami o wyższej mocy (np. 4 + rdzenie i obfity RAM) . Więc jeśli widzisz słabe wyniki, użyj programów takich jak Linux[górna](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/)sprawdzić wykorzystanie zasobów i rozważyć dawanieERDDAP™zwiększenie zasobów, zwłaszcza pamięci. Pamięć jest tania&#33; Większość telefonów ma więcej procesorów i pamięci niż serwery, których niektórzy z was używają do uruchamianiaERDDAP&#33;
Dzięki Erin Turnbull.
         
        
    * DO STOSOWANIA:ERDDAP™aby uzyskać dostęp do Cassandra, dla Cassandra, trzeba nadal korzystać z wersjiJavaktórego używałeś do prowadzenia Cassandry. Po prostu przełącz naJava17 za prowadzenie Tomcat +ERDDAP.
         
    * DO: Zalecane: Jeśli CPU serwera ma 4 + rdzenie i 8 + GB pamięci RAM, należy rozważyć zmianę na te ustawienia w Twoimdatasets.xmlplik:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Jeśli serwer ma mniej zasobów, należy przykleić "1" do obu ustawień.
Systemy nThreads dlaEDDGridPliki FromFiles i EDDTable Pliki FromFiles znacznie się poprawiły. Zmiany te doprowadziły do ogromnej poprawy prędkości (np. 2X przyspieszenie przy ustawianiu nTreads na 2 lub więcej) dla najbardziej wymagających wniosków (gdy duża liczba plików musi być przetwarzana w celu zebrania wyników) . Niektóre związane z tym zmiany z Chrisa Johna doprowadzą również do ogólnego przyspieszeniaERDDAP. Kodeks tych zmian został wprowadzony przez Chrisa Johna. Dziękuję. Chris&#33;
         
    * OSTRZEŻENIE: hyphens indatasetID's are deprecated and no longer support' (chociaż technicznie nadal dozwolone) . Prawdopodobnie zostaną wykluczone w następnym wydaniu. Jeśli używasz hyphens, przełącz na podkreślenie teraz, aby uniknąć kłopotów. Jeśli teraz dokonasz zmiany, to będzie to twoja prędkość. Jeśli poczekasz do następnego wydania, wpadniesz w panikę i będziesz musiał się tym zająć tamtego dnia.
         
    * NOWOŚĆ: Teraz.htmlTableodpowiedzi danych, jeżeli dane w komórce String zawierają dane: image / png; base64, po których następuje base64 zakodowanego obrazu .png,ERDDAP™wyświetla ikonę (więc użytkownik może zobaczyć obraz, jeśli unoszą się nad nim) i przyciski, aby zapisać tekst lub obraz do schowka. Dzięki Marco Albie (który wniósł kod) i Bob Simons (który nieznacznie go zmodyfikował) .
         
    * NOWOŚĆ: -doNotAddStandardNames
Jeśli dodasz\\ -doNotAddStandardNames jako parametr wiersza poleceń podczas uruchamiania generuj Zestawy danych Xml, generuj Zestawy danych Xml nie dodastandard\\_namedoaddAttributesdla zmiennych innych niż zmienne o nazwie szerokość geograficzna, długość geograficzna, wysokość, głębokość lub czas (które mają oczywistestandard\\_names) . Może to być przydatne, jeśli używasz wyjścia z generowania Zestawy danych Xml bezpośrednio wERDDAP™bez edycji wyjścia, ponieważ generuj Zestawy danych Xml często zgadujestandard\\_namenieprawidłowo. (Pamiętaj, że zawsze zalecamy, aby edytować wyjście przed użyciem go wERDDAP.) Korzystanie z tego parametru będzie mieć inne drobne skutki związane, ponieważ odgadnąćstandard\\_namejest często wykorzystywane do innych celów, np. do tworzenia nowychlong\\_name, i stworzyć ustawienia colorBar. Dzięki Kevinowi O 'Brienowi.
         
    * NOWOŚĆ: Możesz teraz umieścić&lt;updateMaxEvents &gt; 10&lt;/ updateMaxEvents &gt; wdatasets.xml  (z innymi ustawieniami w pobliżu góry) aby zmienić maksymalną liczbę zmian w pliku (domyślny = 10) które będą przetwarzane przez system updateEveryNMillis. Większa liczba (100?) może być przydatne, gdy bardzo ważne jest, aby zestaw danych był zawsze aktualizowany. Patrz[dokumentacja updateMaxEvents](/docs/server-admin/datasets#updatemaxevents). Dzięki Johnowi Maurerowi.
         
    * NOWOŚĆ: Dodano wsparcie dla świata "real\\_time= true|false "atrybut String.
Jeśli to fałsz (domyślny) a jeśli zbiór danych nie używa aktualizacji EveryNMillis,ERDDAP™będzie buforować odpowiedzi na żądania dla typów plików, gdzie cały plik musi być utworzony przedERDDAP™może zacząć wysyłać odpowiedź do użytkownika i ponownie je do około 15 minut (np.,.nc, .png) .
Jeśli jest to ustawione na true lub jeśli zbiór danych używa aktualizacji EveryNMillis,ERDDAP™nigdy nie buforuje plików odpowiedzi i zawsze zwraca nowo utworzone pliki.
Dzięki Johnowi Maurerowi.
         
    * NOWOŚĆ: E-maile są teraz wysyłane w osobnym emailThread. To sprawia, że wczytywanie zbiorów danych i innych działań, które generują e-maile szybciej, ponieważ loadDatasets nie musi czekać na wysłanie e-maila, co czasem zajmuje dużo czasu. Nowy system może wysyłać wiele e-maili na sesję e-mail, zmniejszając tym samym liczbę loginów serwera e-mail i zmniejszając ryzyko niepowodzeń, ponieważ są one zbyt częste. Istnieją statystyki dla emailThread na stronie status.html i wiadomości diagnostycznych w log.txt -- szukaj "emailThread". Zauważ, że liczenie nEmailsPerSession = 0 wskazuje na kłopoty, tj. sesja e-mail nie była w stanie wysłać żadnych e-maili.
Dzięki Bobowi Simonsowi.
         
    * ZMIANA: Emaile są wysyłane z nieco innym kodem (z powoduJava17 i zmiany w e-mailThread) . Jeśli masz problemy z wysyłaniem e-maili, proszę emailerd.data at noaa.gov.
         
    * NOWOŚĆ: Akcje subskrypcji, które "dotykają" zdalnego adresu URL są teraz obsługiwane w osobnym touchThread. To sprawia, że wczytywanie zbiorów danych i innych działań, które dotykają adresów URL szybciej, ponieważ loadDatasets nie musi czekać na zakończenie dotyku, co czasem zajmuje dużo czasu. Istnieją statystyki dotyczące touchThread na stronie status.html i wiadomości diagnostycznych w log.txt -- poszukaj "touchThread".
Dzięki Bobowi Simonsowi.
         
    * NOWOŚĆ: Na stronie status.html, w "Major LoadDatasets Time Series", znajduje się nowa kolumna "shed", która wskazuje liczbę wniosków, które zostały zrzucone, ponieważ aktualneERDDAP™Używanie pamięci było zbyt wysokie. Zapytania, które są shed zwróci kod statusu HTTP 503 "Serwis dostępny". Te prośby niekoniecznie były problemem. Właśnie przyjechali w pracowitym czasie. To była część rekonstrukcji tego, jakERDDAP™zajmuje się wysokim wykorzystaniem pamięci.
         
    * NOWOŚĆ: Na komputerach Unix / Linux na stronie status.html znajduje się teraz linia "OS Info" zawierająca aktualne informacje o systemie operacyjnym, w tym obciążenie procesora i wykorzystanie pamięci.
         
    * Teraz, kiedyERDDAP™jest ponownie uruchomiony i szybki Restart = true, EDDTableFromFiles będzie ponownie używać podset.nci wyraźne.nc. Dla niektórych zbiorów danych znacznie zmniejsza to czas na załadowanie zbioru danych (np. od 60 sekund do 0,3 s) . Wraz z nowym emailThread i taskThread (patrz powyżej) , to powinno znacznie przyspieszyć ponowne uruchomienieERDDAP™dla wieluERDDAP™instalacje. Dzięki Benowi Adamsowi i Johnowi Kerfootowi.
         
    * Poprzednio, zbiory danych sierot (zbiory danych, które są na żywoERDDAP™ale nie są wdatasets.xml) zostały po prostu odnotowane w statusie. html i w log.txt po każdym głównym loadDatets. Teraz są one automatycznie usuwane zERDDAP™i oznaczone na status.html i w log.txt, i e-mail Wszystko. Więc jeśli chcesz usunąć zbiór danych zERDDAP™, teraz wszystko co musisz zrobić to usunąć jego kawałek xml wdatasets.xmli zostanie usunięty w kolejnych głównych loadDatasets. Dzięki Bobowi Simonsowi.
         
    * Znany BUG w netcdf- java v5.5.2 i v5.5.3: WEDDGridFromThreds Przewodniczący Opcja katalogowa w GenerateDatasets Xml pracował dla katalogów THREDDS zawierających odniesienia do zbiorów danych w zdalnych katalogach THREDDS. Teraz już nie. Zgłosiłem problem deweloperom netcdf- java.
         
    * BUG FIX: Dla użytkowników Docker ustawienie parametrów setup.xml poprzezERDDAP\\ _ _ paramName _: dla parametrów int i boolean (np. e-mail SmtpPort) ,ERDDAP™nieprawidłowo szukał tylko _ paramName _. Teraz szuka.ERDDAP\\ _ paramName _. Dzięki Alessandro De Donno.
         
    * ZMIANA:ERDDAP™system testowy używa teraz zautomatyzowanego systemu, aby sprawdzić, czy nowo utworzone obrazy testowe są dokładnie takie, jakich się spodziewano. Dzięki Chrisowi. John za sugestię i Bob Simons za implementację.
         

## Wersja 2.18{#version-218} 
 (wydany 2022- 02- 23) 

*    **Nowe funkcje i zmiany (dla użytkowników) :** 
    * NIE
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * BUG FIX:.ncW pewnych okolicznościach akta nie zostały zamknięte. Teraz są. Dzięki Marco Albie, Rolandowi Schweitzerowi, Johnowi Maurerowi i innym.
         

## Wersja 2.17{#version-217} 
 (wydany 2022- 02- 16) 

*    **Nowe funkcje i zmiany (dla użytkowników) :** 
    * BUG FIX: Po zmianieorderBySystem kilka lat temu, Tabledap 's Make A Graph nie poradził sobie z wieloma pytaniami, które były używaneorderBy_ Xxx _. Teraz tak. Dzięki Maurice 'owi Libesowi.
         
    * Poprzednio:ERDDAP™odrzucono wnioski. przejrzyste Png 's, gdy wartości szerokości i / lub długości geograficznej były częściowo lub całkowicie poza zakresem. (ERDDAP™GitHub Issues # 19, posted by Rob Fuller -- dzięki za umieszczenie tego Roba) Teraz zwraca przezroczyste piksele dla wszelkich obszarów poza zakresem zasięgu obrazu. Jest to przydatne dla wielu aplikacji klienta. Zmiany kodu, aby dokonać tej zmiany, zostały wykonane w całości przez Chrisa Johna. Dziękuję bardzo, Chris&#33;
         
    * Poprzednio:ERDDAP™odrzucone wnioski griddap, gdzie wartości indeksowe dla danego wymiaru\\[wysoki: niski\\]. Teraz te żądania stają się ważne poprzez wymianę niskich i wysokich wartości. To rozwiązuje długotrwały problem dla użytkowników i dla programów zewnętrznych, takich jak xtracto, które musiały śledzić kilka zbiorów danych, które mają wartości szerokości geograficznej, które wahają się od wysokich do niskich w celu złożenia wniosku, jak\\[ (50) : (20) \\]tak, że wniosek w przestrzeni indeksu\\[niskie: wysokie\\]. Patrz https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html Teraz, prośba jak\\[ (20) : (50) \\]dla jednego z tych zbiorów danych jest automatycznie interpretowany jako\\[ (50) : (20) \\].
         
    * ZMIANA: .esriAscii żąda teraz uruchomić okno dialogowe "Plik: Zapisz jako" w przeglądarce użytkownika. Dzięki Joelowi Van Noordowi.
         
    * BUG FIX: Jeśli zmienna długości geograficznej zbioru danych dzieckaEDDGridLonPM180 lubEDDGridLon0360 dataset mavalid\\_minlubvalid\\_maxatrybut, są usuwane wEDDGridLonPM180 lubEDDGridLon0360 dataset. Dzięki Royowi Mendelssohnowi.
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * DO ZROBIENIA: Jeśli ustawiłeś&lt;dataProviderFormActive &gt; do false, aby tymczasowo uporać się z wrażliwością XSS, proszę ustawić go z powrotem do true.
         
    * BEZPIECZEŃSTWO BUG FIX: Stała wrażliwość XSS w formularzu Dostawca danych. Dzięki Genaro Contreras Gutiérrez.
         
    * BUG FIX: Kiedy dirctory AWS S3 miał więcej niż 10000 plików,ERDDAP™Rzucił "Błąd wewnętrzny". To już naprawione. Dzięki Andy Zieglerowi.
         
    * BUG FIX:EDDGridSideBySide nie pozwala na zmianęsourceNames w różnych zbiorach danych dla dzieci są takie same. Teraz tak. Dzięki Joshua Stanford.
         

## Wersja 2.16{#version-216} 
 (wydany 2021- 12- 17) 

*    **Nowe funkcje i zmiany (dla użytkowników) :** 
    * ZMIANY Liczne drobne zmiany w systemie tłumaczeniowym dzięki sugestiom wydawców językowych. Dzięki Melanie Abecassis, Marco Albie, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian i Mike Smit.
         
    * DODANO odpowiednie zrzeczenie i przypisanie dla Google Translate, zgodnie z warunkami Google Translate. Ponadto,&lt;html &gt; tag w HTML dla każdej strony internetowej teraz poprawnie identyfikuje nieangielskie strony internetowe jako przetłumaczone maszynowo. Dzięki Mike 'owi Smitowi.
         
    * BUG FIX: Strony internetowe logowania działają teraz poprawnie z różnymi ustawieniami językowymi. Dzięki Mike 'owi Smitowi.
         
    * NOWAorderByFiltr sumowy. I nowe Sprawdź wszystko i Cofnij wszystkie przyciskiEDDGridStrona internetowa formularza dostępu do danych. Dzięki kodowi Marco Alby.
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * TO DO: jeśli u pacjenta występuje
        &lt;question MarkImageFile &gt; QuestionMark.jpg&lt;/ question MarkImageFile &gt;
w pliku setup.xml należy usunąć cały znacznik (polecany, więc używany jest domyślny plik) lub zmienić na:
        &lt;question MarkImageFile &gt; QuestionMark.png&lt;/ question MarkImageFile &gt;
         
    * Tak dla twojej wiadomości,[Adopt](https://adoptium.net/?variant=openjdk8)zastąpił AdoptOpenJDK jako główne / zalecane źródłoJava  (OpenJDK) .
         
    * ZMIANA: Pliki dziennika zERDDAP™, GenerateDatasets Xml i DasDds są teraz UTF- 8, a nie domyślny zestaw znaków komputera. Dużo sprawdziłem i wprowadziłem kilka zmian, by upewnić się, żeERDDAP™zawsze określa poprawny zestaw znaków podczas czytania lub pisania wszystkich rodzajów plików, i nie już (w kilku przypadkach) opiera się na domyślnym zestawie znaków komputera. Poprawiło to kilka błędów i przesunęło się tak blisko, jak tylko mogłem, do celu wykorzystania UTF- 8 dla jak największej liczby typów plików (np. .log, .xml, .html,.json,.jsonl,.ncNagłówek) . Zauważ, że wiele starszych typów plików jest wymaganych do korzystania z ISO- 8859-1 (np.,OPeNDAP.das, .dds, .csv,.tsv,.nc3,.nccsv, .cpt) . Wcześniej próbowałem pracować z grupą CF i zUnidataaby dodać wsparcie dla UTF- 8 w.ncTrzy pliki; oba były odporne.
         
    * NOWOŚĆ: Podczas pobierania plików z AWS S3,ERDDAPpamięci podręcznej System FromUrl wEDDGridPliki FromFiles i EDDTable FromFiles teraz używa nowego menedżera transferu AWS do pobierania plików za pomocą równoległych fragmentów (więc bardzo szybko) . Przepustowość docelowa jest ustawiona na 20 Gbps, na plik, więc działa to dobrze ze wszystkimi typami instancji AWS, ale szczególnie tymi, które mają doskonałą wydajność sieciową. Z tą zmianąERDDAPpamięci podręcznej System FromUrl oferuje teraz porównywalne prędkości do podejścia xarray równoległych pobrań plików wstępnie chunked, ale bez konieczności konwersji plików źródłowych z.ncoraz.hdfdo plików xarray. Właściwie,ERDDAPsystem jest lepszy, jeśli istnieje kolejny wniosek o odczytanie z tego samego pliku, ponieważERDDAP™teraz ma lokalną kopię pliku. Nasza społeczność spędziła lata standaryzując.ncoraz.hdfpliki. Teraz nie musimy wyrzucać tego wszystkiego tylko po to, aby uzyskać dobre wyniki podczas przechowywania danych w AWS S3. Dzięki Rich Signellowi.
         
    * CHANGE: SearchEngine = Lucene jest na razie zdeprecjonowany. Jest to złożony system, który często przynosi wyniki, które nieco różnią się od bardziej pożądanego zachowania SearchEngine = oryginalne. Dla prawie wszystkichERDDAP™instalacje, oszczędność czasu Lucene nie kompensuje różnic w wynikach. Proszę użyć wyszukiwarki Engine = oryginalne, jeśli to możliwe. Jeśli to powoduje problemy, proszę wysłać maila do Boba.
         
    * ZMIANA: Lucene SearchEngine zachowuje się teraz bardziej jak oryginalny SearchEngine. Nie ma już przypadków, w których Lucene myśli, że zestaw danych pasuje, a oryginał nie. Również rankingi Lucene 'a są teraz równe rankingom oryginału. (ponieważ oryginał jest zawsze używany do obliczania rankingów) .
         
    * BUG FIX: Zaczynając od ostatniego wydania,ERDDAP™przestał widzieć więcej niż 1000 pierwszych obiektów w danym wiadrze AWS S3. Teraz,ERDDAP™ponownie widzi wszystkie obiekty. Dzięki Andy Zieglerowi.
         
    * BUG FIX: Teraz EDDTableAggregate Wiersze usuwaactual\\_rangeatrybut zawsze, gdy jeden lub więcej zbiorów danych dla dzieci nie zna swoich zmiennych 'actual\\_range  (np. EDDTableFromDatabase) . Dzięki Erikowi Gelettiemu.
         

## Wersja 2.15{#version-215} 
 (wydany 2021- 11- 19) 

*    **Nowe funkcje i zmiany (dla użytkowników) :** 
    *   ERDDAP™posiada nowy system pozwalający użytkownikowi określić język, który ma być używany dla wszystkich stron internetowych. JeśliERDDAP™instalacja jest skonfigurowana, aby jej używać, lista języków pojawi się w prawym górnym rogu każdej strony.ERDDAP™URL 's from before this version continue to work and always return English content, as before.
        
Nie wszystkie teksty lub wszystkie strony internetowe zostały przetłumaczone. Były ograniczenia czasowe tego projektu, które uniemożliwiły Qi i Bobowi dotarcie do 100%.
        
Oczywiste pytanie brzmi: dlaczego włożyliśmy w to tyle wysiłku, skoro Chrome będzie tłumaczył strony internetowe na-muchy? Odpowiedź brzmi: w ten sposób uzyskamy o wiele większą kontrolę nad tym, jak tłumaczenie jest wykonywane. W szczególności istnieje wiele słów, które nie powinny być tłumaczone na stronach internetowych, np. tytuły i streszczenia zbiorów danych, nazwy zmiennych, parametrów, jednostek i organizacji. Większość tłumaczeń dotyczyła identyfikacji słów i zwrotów, które nie powinny być tłumaczone. Ponadto tłumaczenia maszynowe miały tendencję do zniekształcania niektórych typów znaczników HTML. Zarządzanie tłumaczeniem pozwoliło nam zminimalizować ten problem.
        
Projekt tłumaczenia został wykonany przez Qi Zeng (stażysta Google Summer of Code) i Bob Simons za pomocą usługi internetowej Google Translation. To był ogromny projekt. Dzięki. Qi&#33;
        
    * BUG FIX:ERDDAP™teraz pozwala ORCID ID mieć X jako ostatnią cyfrę. Dzięki Maurice 'owi Libesowi.
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * TO DO:
        
        * Musisz dokonać kilku zmian związanych zERDDAPnowy system pozwalający użytkownikom określić język stron internetowych.
            * Na pierwszej linii zestawu xml idatasets.xmlpliki, zmień na: kodowanie = "UTF- 8" i zmień kodowanie dokumentu w edytorze tekstu, tak aby był zapisywany jako plik UTF- 8. GenerateDatasets Xml zakłada teraz, żedatasets.xmljest plikiem UTF- 8.
            * Programiści, którzy opracowująERDDAP: WszystkieERDDAP™Pliki .java powinny być domyślnie traktowane jako pliki UTF- 8. Może trzeba będzie dodać "-encoding UTF- 8" do linii poleceń javac. (Tak.) 
            * Aby umożliwić ten system (silnie zalecane) , w&lt;startBodyHtml5 &gt; tag, który podajeszdatasets.xml, zmienić "& amp&#33; loginInfo;" na "& amp&#33; loginInfo;|& amp&#33; language; "tak, że lista języków pojawia się w prawym górnym rogu każdegoERDDAP™strona internetowa.
            *   ERDDAP™tylko używa&lt;startBodyHtml5 &gt; tag, który podajeszdatasets.xmlaby określić zawartość HTML dla banera na górze każdegoERDDAP™strona internetowa, bez względu na to, jaki język wybiera użytkownik. Jeśli zmienisz znacznik do użycia
"&EasierAccessToScientificData;"zamiast" łatwiejszego dostępu do danych naukowych "i
"&BroughtToYouBy;"zamiast" Przywołany przez ",ERDDAP™użyje przetłumaczonych wersji tych zwrotów w banerze.
            * Podobnie, nowy domyślny&lt;The ShortDescriptionHtml &gt; indatasets.xmlen
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
Ostatnie 3 linie treści to rzeczy, które zostaną zastąpione przetłumaczonym tekstem. Jeśli zmienisz któreś z nich (w szczególności & to Cząstka Erddap;) lub wszystkie z nich do wyraźnego tekstu wdatasets.xml  (który ma pierwszeństwo, jeśli występuje) lub messages.xml, że tekst pojawi się bez względu na język, który użytkownik wybiera. To nie jest idealne, ale pomyślałem, że kilku administratorów chce edytować&lt;ShortDescriptionHtml &gt; w 35 różnych plikach, aby zapewnić 35 różnych przetłumaczonych wersji tego znacznika.
        
          
         
    * ZMIANA: Niektóre błędy są teraz obsługiwane nieco inaczej i dlatego mogą być dodawane do liter "Nieudane żądania" na status.html i w dziennym raporcie e-mail. Więc te liczby mogą być nieco większe niż wcześniej.
         
    * BUG FIX: GenerateDatasets XmlEDDGridLon0360 orazEDDGridLonPM180 wyłącza teraz zbiory danych źródłowych zdatasetID= ~ ".\\*\\ _ LonPM180 "orazdatasetID= ~ ".\\*\\ _ Lon0360 ", odpowiednio.
         

## Wersja 2.14{#version-214} 
 (wydany 2021- 07- 02) 

*    **Nowe funkcje i zmiany (dla użytkowników) :** 
    *    (brak)   
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * NOWOŚĆ:EDDGridLon0360, który tworzy zestaw danych o długości geograficznej & gt; = 0 oraz&lt;= 360 z zestawu danych o długości geograficznej & gt; = -180 oraz&lt;= 180. Patrz[EDDGridDokumentacja Lon0360](/docs/server-admin/datasets#eddgridlon0360). Dzięki Dale 'owi Robinsonowi.
         
    * NOWOŚĆ:ERDDAP™administratorzy mogą teraz nadpisać dowolną wartość w setup.xml przez zmienną środowiskową o nazwieERDDAP\\ _ _ valueName _ przed uruchomieniemERDDAP. Na przykład, używaćERDDAP\\ _ baseUrl nadjeżdża&lt;baseUrl &gt; wartość. To może być przydatne podczas rozmieszczaniaERDDAP™z pojemnikiem, jak można umieścić standardowe ustawienia w setup.xml, a następnie dostarczyć specjalne ustawienia za pomocą zmiennych środowiskowych. Jeśli dostarczysz tajne informacjeERDDAP™za pomocą tej metody, upewnij się, że informacje pozostaną tajne.ERDDAP™tylko odczytuje zmienne środowiskowe raz na startup, w pierwszej sekundzie startup, więc jednym ze sposobów użycia jest: ustawić zmienne środowiskowe, uruchomićERDDAP™, czekaj ażERDDAP™jest uruchomiony, a następnie wyłączyć zmienne środowiskowe. Dzięki Markowi Portierowi.
         
    * Teraz, jeśli niektóre pliki w EDDTableFrom... Zestaw plików z wieloma plikami ma bardzo długie wartości String, zbiór danych wczyta znacznie szybciej i odpowiada na żądania znacznie szybciej. Poprzednio:ERDDAP™w plikach, które są przechowywane z informacjami o plikach dla takich zbiorów danych, przydziela dużo miejsca dla wartości min i max String. Wynikający z tego plik był ogromny, powodując, że został napisany i przeczytany powoli. Dzięki OBIS.
         
    * Teraz,ERDDAP™lepiej interpretuje nietypowe i nieprawidłowe sekwencje znaków w plikach CSV. Dzięki OBIS.
         
    * FIX: Po roku kłopotów z Cassandrą, w końcu udało mi się zainstalować Cassandrę (v2) ponownie i tak był w stanie ponownie przeprowadzić testy z Cassandrą v2. Więc teraz mogę być bardziej pewny, żeERDDAP™współpracuje z Cassandrą v2 i v3. Dzięki ONC.
         

## Wersja 2.12{#version-212} 
 (wydany 2021- 05- 14) 

*    **Nowe funkcje i zmiany (dla użytkowników) :** 
    * BUG FIX: Jeśli jesteś na czarnej liście subskrypcji, nie możesz teraz żądać listy subskrypcji.
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * TO DO: NOWOŚĆ: system automatycznego ograniczania zdolności złośliwych użytkowników i nadmiernie agresywnych, uprawnionych użytkowników do składania wielu jednoczesnych wniosków, które obniżałyby wydajność systemu dla innych użytkowników. Istnieją 3 nowe opcjonalne znaczniki wdatasets.xmlktóre można / należy dodać po&lt;graphBackgroundColor &gt;:
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

Więcej informacji na ten temat:[ipAdressMaxRequestions](/docs/server-admin/datasets#ipaddressmaxrequests).ERDDAP™teraz drukuje "Liczba unikalnych użytkowników (od rozpoczęcia) "na stronie status.html.
Dzięki osobie w Chinach atakującej mojeERDDAP™instalacja.
         
    * ZMIANA do zachowania sterownika Postgresql: Kiedy zaktualizowałem sterownik Postgresql, nazwy kolumn na liście tabeli wygenerowane przez Postgresql i GenerateDatasetsXml wróciły do góry, zamiast do dołu, jak wcześniej. Nie wiem, czy to wpłynie na inne rzeczy, ponieważ bazy danych często uważają te nazwy za niewrażliwe. Mój zestaw danych z testów nadal działa poprawnie. Ale jeśli twój zestaw danych przestanie z tym pracowaćERDDAP™Aktualizacja, to jest możliwa przyczyna, aby kontynuować pierwszy.
         
    * BUG FIX:ERDDAP™teraz obsługuje również prywatne pliki AWS S3 poprawnie. Poprawiono również obsługę plików AWS S3. Dzięki Michaelowi Ganglowi i Dylanowi Pughowi.
         
    * NOWOŚĆ:EDDGridPliki FromNciEDDGridPliki FromNcNiezapakowany może teraz odczytać dane z "struktur" w.nc4 oraz.hdf4 pliki. Aby zidentyfikować zmienną pochodzącą ze struktury,&lt;sourceName&gt; must use the format: _ fullStructureName _|_ memberName _, na przykład group1 / myStruct|Mój Członek. Dzięki NRL.
         
    * ZMIANA: Teraz, jeśli bieżące użycie pamięci plus to żądanie jest nawet nieco wysokie, zestawy griddap nThreads dla tego wniosku do 1. Tak więc,ERDDAP™Oszczędza pamięć, gdy brakuje pamięci. Dzięki osobie w Chinach atakującej mojeERDDAP™instalacja.
         
    * NOWY system monitorowania liczby otwartych plików (które zawiera gniazda i inne rzeczy, nie tylko pliki) w Tomcat na komputerach Linuksa. Jeśli niektóre pliki omyłkowo nigdy nie zostaną zamknięte, liczba otwartych plików może wzrosnąć aż przekroczy maksymalny dozwolony i wiele naprawdę złych rzeczy się dzieje. Więc teraz na komputerach Linuksa (informacje nie są dostępne dla Windows) :
        
        * Po prawej stronie stanu znajduje się nowa kolumna "Open Files" pokazująca procent otwartych plików max. W systemie Windows pokazuje tylko "?".
        * KiedyERDDAP™generuje te informacje na końcu każdego głównego zbioru danych, będzie drukować do dziennika. plik txt:
openFileCount = _ current _ of max = _ max _% = _ procent _
        * Jeśli procent wynosi &gt; 50%, e-mail jest wysyłany doERDDAP™administrator i e-mail Wszystko Na adres e-mail.
        
Aby dowiedzieć się więcej, lub jeśli widzisz ten problem naERDDAP™, see[Zbyt wiele otwartych plików](/docs/server-admin/additional-information#too-many-open-files).
Dzięki osobie w Chinach atakującej mojeERDDAP™instalacja.
         
    * NOWOŚĆ: Dodałem dużo sprawdzania i obsługi "Zbyt wiele otwartych plików", więc zadanie po prostu zatrzymuje się i użytkownik widzi komunikat błędu. Pliki danych nie będą już oznaczone jako złe, jeśli odczytanie ich spowoduje błąd "Zbyt wiele otwartych plików".
         
    * NOWA\\[bigParentDirectory\\]/ badFilesFlag katalog:
Jeśli umieścisz plik w tym katalogu zdatasetIDjako nazwa pliku (zawartość pliku nie ma znaczenia) ,ERDDAP™usunie pliki badFiles.ncplik dla tego zbioru danych (jeżeli istnieje) i przeładować zestaw danych jak najszybciej. Powoduje toERDDAP™spróbować ponownie pracować z plikami wcześniej (mylnie?) oznaczone jako złe. Dzięki Marco Albie.
         
    * ZMIANA: Na startup, jeśliEDDGridZ plików lub EDDTableFrom... Zestaw danych plików początkowo zawiera 0 plików na liście znanych ważnych plików (np. nowy zestaw danych) Więc...ERDDAP™odracza ładowanie i ustawia flagę tak, że zostanie ona załadowana jak najszybciej po zakończeniu głównych LoadDatasets. Przyspiesza to początkowe startup w przypadku nowych zbiorów danych.
         
    * ZMIANA: FileVisitorDNLS.testAWSS3 () i FileVisitorSubdir.testAWSS3 () ; teraz użyj AWS v2 (nie v1) SDK. Więc teraz GitERDDAP™dystrybucja zawiera wszystkie potrzebne pliki i nie trzeba już ręcznie dodawać masywnego pliku jar v1 AWS SDK.
         
    * ZMIANA: Przełączyłem się na użycie Maven do wykrywania / gromadzenia zależności (pliki .jar w / lib) . Zmiana w v2 AWS SDK wymagała tego. W przyszłości będzie on potrzebny w odniesieniu do innego importowanego kodu. Ogromne podziękowania dla Kyle 'a Wilcoxa, który dostarczył pom.xml, który stworzył i używa, co rozwiązało dla mnie kilka problemów.
         
    * ZMIANA: Parametr classpath (- cp) używane w GenerateDatasetXml, DasDds i innych małych programach, które pochodzą zERDDAP™, i w poradzie dla programistów jest teraz znacznie prostszy i nie powinien nigdy zmienić, ponieważ odnosi się do katalogu, a nie poszczególnych plików:
\\ -cp klasy; C:\\ programy\\ _ tomcat\\ lib\\ servlet- api.jar; lib\\\ *
         (lub ':' zamiast ';' dla Linuksa i Maków) .
         (Powinienem był to zrobić lata temu, kiedy stało się to opcją.)   
         
    * NOWOŚĆ: GenerateDatasets Xml ma nową opcję użytkową: findDuplicateTime, która będzie przeszukiwać przez kolekcję chwytanych.nc  (oraz powiązane) pliki do wyszukiwania plików z podwójnymi wartościami czasowymi. Patrz[findDuplications Czas](/docs/server-admin/datasets#findduplicatetime)  
         
    * NOWOŚĆ:datasets.xmlmoże teraz zawierać&lt;palety &gt; znacznik, który przekracza&lt;palety &gt; wartość znacznika z messages.xml (lub powraca do wartości messages.xml, jeśli jest pusta) . Pozwala to na zmianę listy dostępnych palet podczasERDDAP™Ucieka. Ponadto, jeśli masz podkatalog cptfiles wERDDAP™katalog treści,ERDDAP™skopiuje wszystkie pliki\\ * .cpt w tym katalogu do\\[tomcat\\]/ webapps / erddap / WEB- INF / cptfiles za każdym razemERDDAP™Zaczyna się. Razem, te zmiany pozwalają dodać palety i mają zmiany utrzymują się podczas instalacji nowej wersjiERDDAP. Patrz[dokumentacja palety](/docs/server-admin/datasets#palettes)  
Dzięki Jennifer Sevadjian, Melanie Abecassis i być może innym ludziom z CoastWatch.
         
    * ZMIENIONE: [&lt;slowDownTroubleMillis &gt;] (/ docs / server- admin / datasets # slowdown troublemillis) jest teraz używany do wszystkich nieudanych wniosków, a nie tylko kilka typów.
         
    * ZMIANA: wątek RunLoadDatasets przerywa teraz wątek LoadDatasets na 3 / 4 MaxMinutes więc jest więcej czasu dla LoadDatasets, aby zauważyć przerwanie i wyjść wdzięcznie. Również jest więcej i lepsze wiadomości diagnostycznych do tego.
         
    * Zmieniono ze starej wersji Lucene na v8.7.0.
         
    * ZMIANA: Emaile wysłane przezERDDAP™teraz pojawiają się ze stałą czcionką szerokości.
         
    * ZMIANA:EDDGridFromFiles teraz otrzymuje wartości osi, jak również atrybuty z pierwszego|Plik last, jak określono w&lt;metadataFrom &gt;. Dzięki. (nie) Ken Casey, et al.
         
    * ADDED wsparcie dla niepoprawnych jednostek "stopień\\ _ Północ" i "stopień\\ _ Wschód", które są błędnie używane przez ostatnie pliki (od 2020- 10- 01) w wersji 5. 3 - Kołowana AVHRR Pathfinder (L3C) Zestawy danych SST (nceiPH53sstd1day i nceiPH53sstn1day) .ERDDAP™mogą teraz standaryzować je do ważnych jednostek. Dzięki. (nie) Ken Casey, et al.
         

## Wersja 2.11{#version-211} 
 (wydany 2020- 12- 04) 

*    **Nowe funkcje i zmiany (dla użytkowników) :** 
    * BUG FIX: OrderByMean rzucił NullPointerException jeśli zmienna miała tylko jeden z\\ _ FillValue lub brakuje\\ _ Wartość zdefiniowana. Teraz dobrze radzi sobie z sytuacją. Dzięki Marco Albie.
         
    * BUG FIX: Pojawiły się problemy z plikami tekstowymi ODV stworzonymi przezERDDAP™w v2.10. Te problemy są naprawione. Dzięki Shaun Bell.
         
    * BUG FIX: Just inERDDAP™v2.10: Jeżeli granice latu były określone w URL, to nie na mapie świata narysowano bounding box. Teraz jest znowu. Dzięki Johnowi Maurerowi.
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * BUG FIX: Just inERDDAP™v2.10: Pliki skryptowe dla ArchiveAdataset, GenerateDatasets Xml i DasDds nie działały, ponieważ nie miały zmian w klamrze, które zostały dodane zERDDAP™V2.10. Dzięki Marco Albie.
         
    * NOWOŚĆ: Wdatasets.xml, możesz teraz mieć znacznik:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

Obecnie, jeśli prawdziwe (lub jeśli znacznik jest pusty, lub jeśli znacznik nie jest w pliku) , gdy żądanie użytkownika prowadzi do NullPointerException,ERDDAP™będzie e-mail ślad stosu doerd.data at noaa.gov  (doERDDAP™zespół ds. rozwoju) . Powinno to być bezpieczne, ponieważ brak poufnych informacji (np. requestUrl) jest zawarte w e-mailu. Powinno to umożliwić złapanie wszelkich niejasnych, całkowicie niespodziewanych błędów, które prowadzą do NullPointerexceptions. W przeciwnym razie użytkownik widzi wyjątki, aleERDDAP™Deweloperzy nie, więc nie wiemy, czy istnieje problem, który trzeba naprawić.
        
Możliwe, że ten znacznik doprowadzi do innych, podobnych informacji diagnostycznych jest wysyłanych doerd.data at noaa.govw przyszłości. Zawartość wiadomości e-mail zawsze będzie minimalna i związana z błędami, a nie, na przykład, informacje o użyciu. Dzięki Marco Albie.
         
        
    * ZMIANA: Teraz, wspólne typy skompresowanych plików (.bz2,.gz,.gzip,.tar,.tgz,.z,.zip) są również zabronione dla wniosków bajtowych zasięgu. Jest to określone poprzez&lt;extensionsNoRangeRequestions &gt; in messages.xml.
         
    * Znany problem: Podobnie jak w przypadkuERDDAP™2.10,.ncPliki ml, które próbują zmienić atrybut, nie zmieniają atrybutu. Jest to znany błąd w netcdf- java, który zgłosiłem i mówią, że zostanie naprawiony w następnym wydaniu netcdf- java.
         

## Wersja 2.10{#version-210} 
 (wydany 2020- 11- 05) 

*    **Nowe funkcje i zmiany (dla użytkowników) :** 
    * NOWOŚĆ: Nowy[Interpolat](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html)konwerter efektywnie interpoluje wartości z ustawionego zbioru danych. W związku z tym jest on szczególnie przydatny dla naukowców pracujących nad danymi dotyczącymi ścieżek zwierzęcych. Ten konwerter przyjmuje tabelę o szerokości, długości i kolumnach czasowych (i być może inne kolumny) i zwraca tabelę z dodatkowymi kolumnami o interpolowanych wartościach. Tak więc, jest to podobne do popularnych[Xtracausive](https://coastwatch.pfeg.noaa.gov/xtracto)skrypt pierwotnie stworzony przez Dave 'a Foley' a, ale oferuje zaletę przetwarzania do 100 punktów na życzenie. Dzięki Dave 'owi Foley' owi i Jordanowi Watsonowi (NMFS) .
         
    * ULEPSZONE: Zaawansowane wyszukiwanie jest teraz rygorystyczne dla innych niż -.html wniosków. Wprowadzi ona teraz wyjątki dla wniosków, które mają stałe błędy (np. wnioski, w których minLat &gt; maxLat) lub błędy czasowe (np. wnioski ostandard\\_nameże nie istnieje) . Zaawansowane wyszukiwanie nie zmienia się: podobnie jak w przypadku wyszukiwania w Google, wykonuje swoje najlepsze i ciche poprawki lub ignoruje błędy. Dzięki Rich Signellowi.
         
    * ULEPSZONE: Mapa na stronie Zaawansowane wyszukiwanie jest teraz większa (nadal trzeba przymrużyć oczy, ale mniej) i znacznie bardziej dokładne (ale nadal nie doskonały) . Dzięki Johnowi Maurerowi.
         
    * ULEPSZONE: Ustawienie "Draw land mask" na stronach Make A Graph oraz ustawienie & .land =... w adresach URL, które wymagają mapy, obsługuje teraz dwie inne opcje:
"zarys" tylko rysuje zarys maski, granice polityczne, jeziora i rzeki.
"off" niczego nie rysuje.
Patrz[& .land =... dokumentacja](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands).
Dzięki Johnowi Maurerowi.
         
    * ULEPSZONE: Wykresy i mapy stworzone przezERDDAP™może teraz użyć trzech nowych typów znaczników: Bezgraniczny Plac Wypełniony, Bezgraniczny Koło Wypełniony, Bezgraniczny Napełniony Trójkąt. Kod do tego przyczynił się Marco Alba z ETT / EMODnet Physics. Dzięki Marco Albie.
         
    * NOWOŚĆ:"files"system obsługuje teraz plain Odpowiedzi typu pliku (.csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsvlub.xhtml.) , np.,[ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv).
Dzięki Kyle 'owi Wilcoxowi.
         
    * ULEPSZONE: URL wygenerowane przy użyciu formularza dostępu do danych (.html) lub Make- A- Graph (.graph) Strona webowa teraz poprawnie entra- kodowanie znaków\\[oraz\\]. To sprawia, że adresy URL trochę trudniej dla ludzi do czytania, ale jest lepiej z punktu widzenia bezpieczeństwa sieci. Administratorzy mają teraz możliwość ustawienia relaxedQueryChars = '\\[\\]|'w pliku Tomcat server.xml (mniej bezpieczne) lub nie (bardziej bezpieczne) .
Dzięki Antoine 'owi Queric, Dominic Fuller- Rowellowi i innym.
         
    * NOWOŚĆ: Jeżeli żądanie do zbioru danych EDDTable zawiera & dodać Zmienne Gdzie (_ atrybut Nazwa, atrybut Wartość _) ,ERDDAP™doda wszystkie zmienne, które mają _ atrybut Nazwa = atrybut Value _ to lista wymaganych zmiennych.
Patrz[& Dodaj Zmienne Jeżeli dokumentacja](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere). Dzięki Aurelie Briand, et al.
         
    * ZMIENIONE:ERDDAP™teraz odmawia składania żądań / plików /.nclub.hdfpliki. Nie próbuj połączyć się z pilotem.nclub.hdfplików, jakby były to lokalne pliki. Jest ona okropnie nieefektywna i często powoduje inne problemy. Zamiast tego:
        * Stosowanie(OPeN)DAPoprogramowanie klienta do podłączenia doERDDAPjestDAPusługi dla tego zbioru danych (które mają / griddap / lub /tabledap/ w URL) . To właśnie to.DAPPo co?
        * Użyj formularza dostępu do danych, aby zażądać podzbioru danych.
        * Jeśli potrzebujesz całego pliku lub wielokrotnego dostępu przez długi okres czasu, użyjcurl,wgetlub przeglądarka, aby pobrać cały plik, a następnie uzyskać dostęp do danych z lokalnej kopii pliku.
             
    * Ulepszone: .odv Opcja wyjścia Txt została przepisana w celu wsparcia nowej wersjiODV .txtpliki i wspierać właściwą reprezentację trajektorii, harmonogramów i danych profilowych.
         
    * ULEPSZONE: Teraz, terminy wyszukiwania w podwójnych cytatach są interpretowane jako ciąg jsona, więc mogą mieć\\ zakodowane znaki. Między innymi, pozwala to na wyszukiwanie dokładnego dopasowania atrybutu, np. "instytucja =NOAA\\n"nie będzie pasować do zbioru danych z instytucją =NOAA NMFS. Dzięki Danowi Nowackiemu.
         
    * ULEPSZONE: W dodatkowych miejscach, numery zmiennoprzecinkowe (szczególnie pływaki przekształcone w podwójne) teraz pojawiają się jako nieco bardziej zaokrąglonej wersji liczby w dodatkowych miejscach, np. float wcześniej pokazany jako podwójny jak 32.27998779296875, może teraz pojawić się jako 32.28. Dzięki Kyle 'owi Wilcoxowi.
         
    * BUG FIX: Unsigned integer audio files zostały odczytane nieco nieprawidłowo. Teraz są one odczytywane poprawnie.
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * UWAGA: Pierwszy raz uciekaszERDDAP™v2.10, niektóre zbiory danych oparte na lokalnych plikach danych wczytają **Bardzo często** powolne, ponieważERDDAP™musi odtworzyć swoją bazę danych informacji o plikach. Po powolnym wstępnym przeładowaniu, będą one ładować szybko, jak wcześniej. Cierpliwości.
         
    * To co musisz zrobić:
        * Po pierwszym uruchomieniu v2.10 niektóre zestawy danych mogą nie być wczytane, ponieważERDDAP™jest teraz bardziej rygorystyczne w odniesieniu do niektórych metadanych. Jak wcześniej,ERDDAP™będzie e-mail raport dzienny, gdy po raz pierwszy ładuje się. Będzie to zawierać komunikaty błędów dla każdego zbioru danych, które nie zostały załadowane. Przeczytaj komunikaty błędów, aby rozwiązać problemy. W większości przypadków, trzeba tylko dokonać małej zmiany metadanych zbioru danych, aby rozwiązać problem.
             
        * Wdatasets.xml, search for&lt;sourceName& gt; = (Uwaga'='znak określający[Wartość ustalonasourceName](/docs/server-admin/datasets#fixed-value-sourcenames)) . Dla większościERDDAP™To rzadkość. Jeśli którakolwiek z wartości po'='są strunami (nie numery) , MUSISZ teraz dołączyć ciąg podwójnych cytatów. Na przykład:
Przed:&lt;sourceName& gt; = KZ401&lt;/sourceName&gt;
Po:&lt;sourceName& gt; = "KZ401"&lt;/sourceName&gt;
             
        * NOWOŚĆ: Istnieje nowe opcjonalne ustawienie w setup.xml,&lt;defaultAccessibleViaFiles &gt;, który ustawia wartość domyślną&lt;accessibleViaFiles &gt; dla każdego zbioru danych. Domyślnie dla tego nowego znacznika jest false, który naśladuje poprzedniERDDAP™zachowanie. Ten niższy poziom ustawienia może być uchylony przez dany zbiór danych&lt;accessibleViaFiles &gt; ustawienie.
            
ZALECENIA (ponieważ są użytkownicy, którzy chcą tego) :
Jeśli chcesz zrobić całą EDD... Zestawy plików FromFiles dostępne przez system plików, następnie
            
            1. Dodaj ten znacznik do pliku setup.xml:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Opcjonalnie) Usuń wszystkie
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
wdatasets.xmlponieważ wartość domyślna jest teraz prawdziwa.
                 
        * Dodaj atrybuty\\ _ FillValue:
            ERDDAP™używane do domyślnego\\ _ FillValue dla wszystkich zmiennych całkowitych: maksymalna wartość typu danych (np. 127 dla zmiennych bajtowych) . Teraz już nie. Aby uniknąć pokazywania tych wartości jako wartości danych (nie brakujące wartości) , musisz wyraźnie podać te atrybuty przez\\ _ FillValue. Od teraz, za każdym razem jak zaczynaszERDDAP™, wyśle administratorowi email z tabelą .csv z listą zmiennych źródłowych, które nie mają\\ _ FillValue lubmissing\\_valueatrybuty oraz proponowane nowe atrybuty\\ _ FillValue. Patrz[Dodaj\\ _ Wypełnij Atrybuty wartości](/docs/server-admin/datasets#add-_fillvalue-attributes)więcej informacji i instrukcji.
             
        * Jeśli kompilujeszERDDAP™, trzeba zmodyfikować parametr classpath na liniach poleceń javac, aby dodać odniesienie do tych nowych słoików: lib / commons- jexl.jar; lib / aws- java- sdk.jar; lib / jackson- innotations.jar; lib / jackson- core.jar; lib / jackson- datalind.jar.
             
    * ZMIANA: Tomcat 9 jest teraz zalecana wersja Tomcat dlaERDDAP. Najnowsza wersja Tomcat 8.5 + jest również w porządku na razie. PosprzątaliśmyERDDAPjest[Instrukcje montażu Tomcat](/docs/server-admin/deploy-install#tomcat).
        
Najnowsza wersjaJava8 (nieJava9, 10, 11,...) od[AdoptOpenJDK](https://adoptopenjdk.net/)pozostaje zalecaną wersjąJavazamiastERDDAP.Java8 ma Long Term Support z AdoptOpenJDK więc pozostaje bezpieczny w użyciu, ale pamiętaj, aby uzyskać najnowszą wersję go okresowo ze względów bezpieczeństwa.
        
    * NOWOŚĆ: Script SourceNames / derived Variables in Tabular Datasets
Pliki EDDTableFromFiles, EDDTableFromDatabase i EDDTableFromFileNames mogą teraz zawierać wyrażenia i skryptysourceName. Pozwala to na tworzenie nowych zmiennych w oparciu o istniejące zmienne w plikach źródłowych. Obliczenie dla danej nowej zmiennej odbywa się w jednym wierszu wyników, wielokrotnie dla wszystkich wierszy. Na przykład, aby dokonać zmiennej długości geograficznej o wartościach w zakresie -180 - 180 ° od zmiennej o wartościach w zakresie 0 - 360 °:
        &lt;sourceName& gt; = Math2.anglePM180 (row.columnDouble ("n") ) &lt;/sourceName&gt;
Szczegółowe informacje znajdują się w:[Script SourceNames](/docs/server-admin/datasets#script-sourcenamesderived-variables)  
Dzięki Bobowi Simonsowi. (który zaplanował to wcześniejERDDAP™v1.0 i w końcu znaleźć sposób na jego wdrożenie) , Kevin O 'Brien, Roland Schweitzer, John Maurer, i biblioteki Apache JEXL za zrobienie naprawdę trudnej części (i robi to dobrze) .
         
    * NOWOŚĆ: Niepodpisane typy danych całkowitych (ubyte, ushort, uint, ulong) są teraz wspierane. Zauważ, że wiele typów plików (np. .das, .dds,.nc3) nie wspieraj wszystkich tych nowych typów danych. Patrz[Dane Dokumentacja typu](/docs/server-admin/datasets#data-types)szczegóły dotyczące sposobuERDDAP™zajmuje się tymi różnicami. W szczególności, ponieważ(OPeN)DAP, w szczególności odpowiedź .dds, nie obsługuje podpisane bajty, długów, lub ulongs, może chcesz użyćERDDAPTabelaryczne przedstawienie .das i .das jak widać whttp... / erddap / **info** _datasetID_ .html strona internetowa (na przykład:[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) ) które można również uzyskać w innych typach plików lub.nccsvOdpowiedź metadanych (na przykład:[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) ) , z których obie obsługują wszystkie typy danych we wszystkich sytuacjach.
        
UWAGA: W przypadku zbiorów danych, na które wpływa ta zmiana, możliwe jest, że zobaczysz problemy z zbiorem danych, ponieważ dane, któreERDDAP™odczyty ze źródła mogą być różne (np. zmienne poprzednio odczytywane jako podpisane liczby całkowite mogą być teraz odczytywane jako niepodpisane liczby całkowite) . Wynikające z tego problemy obejmują: nowe pliki nie są dodawane do zbioru danych i / lub błędy podczas próby uzyskania dostępu do danych. Jeśli zbiór danych ma problemy, pierwszą rzeczą, którą należy spróbować jest[set a hard Flaga](/docs/server-admin/additional-information#hard-flag)dla zbioru danych. Jeśli to nie rozwiąże problemu, musisz spojrzeć na logarytm. txt, aby zobaczyć komunikaty błędów, zagłębić się wdatasets.xmldla zbioru danych i / lub może ponownie uruchomić generateDatasets.xml dla zbioru danych.
Dzięki netcdf- java 5.x (które zmusiły do wydania) oraz zbliżający się CF 1.9.
        
    * Poprawione: Teraz jest[lepsza dokumentacja / doradztwo](/docs/server-admin/datasets#s3-buckets)dla jak stworzyć zestaw danych z plików w wiaderkach AWS S3. Dzięki Micah Wengren.
         
    * ZMIANA: Istnieje kilka zmian związanych z"files"system.
        * Kod do obsługi tego został przepisany, aby można było go wykorzystać przez więcej klas.
             
        * NOWOŚĆ: Żądania użytkowników dotyczące wyświetlania katalogów mogą teraz wymagać, aby odpowiedź była jednym ze standardowych typów tabel prostych poprzez dodanie pożądanego rozszerzenia pliku: .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsvlub.xhtml). Na przykład:
            [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)  
Dzięki Kyle 'owi Wilcoxowi i Shane St Savage.
             
        * Ulepszone: Teraz, Generate Zestawy danych Xml nie zawiera&lt;accessibleViaFiles &gt; tag w wyjściu. Zakłada się, że zbiór danych będzie opierać się na wartości nowego&lt;defaultAccessibleViaFiles &gt; tag in setup.xml. Patrz[dostępne Pliki viaFiles](/docs/server-admin/datasets#accessibleviafiles).
             
        * ULEPSZONE: Dodatkowe typy zbiorów danych są teraz dostępne Pliki viaFiles:EDDGridSideBySide,EDDGridAgregateExistingDimension,EDDGridFromErddap, EDDTableFromErddap,EDDGridFromEDDTable, EDDTableFromEDDGridorazEDDGridFromEtopo. W tym celu pliki z danego zbioru danych zdalnych / dziecięcych będą dostępne tylko wtedy, gdy zarówno rodzic, jak i zestaw danych zdalnych / dzieci będą dostępne ViaFiles ustawiony na true (być może poprzez&lt;defaultAccessibleViaFiles &gt;). Dzięki Damianowi Smythowi i Robowi Fullerowi.
             
        * DO / ZALECENIE: Zalecamy udostępnienie wszystkich odpowiednich zbiorów danych za pośrednictwem systemu plików poprzez ustawienie&lt;defaultAccessibleViaFiles &gt; do true in setup.xml ponieważ istnieje grupa użytkowników, dla których jest to preferowany sposób uzyskania danych. Między innymi,"files"system ułatwia użytkownikom sprawdzenie, które pliki są dostępne i kiedy ostatnio się zmieniały, co ułatwia użytkownikowi utrzymanie własnej kopii całego zbioru danych. Jeśli na ogół nie chcesz, aby dane były dostępne przez system plików, ustaw&lt;defaultAccessibleViaFiles &gt; do false. W każdym przypadku należy po prostu użyć&lt;accessibleViaFiles &gt; dla kilku zbiorów danych, które są wyjątkami od ogólnej polityki określonej przez&lt;defaultAccessibleViaFiles &gt; (na przykład, gdy zbiór danych wykorzystuje.ncPliki ml, które nie są naprawdę przydatne dla użytkowników) .
             
    * ULEPSZONE: Teraz, jeśli zbiór danych źródłowych posiada dane z siatki CF\\ _ mapowanie, generować Zestawy danych Xml dla zestawów danych w sieci doda informacje do globalnych&lt;addAtts &gt;, a informacje zostaną dodane do globalnego&lt;sourceAtts &gt; za każdym razem dane są odczytywane z pliku. Informacje pojawią się w globalnych atrybutach zbioru danych jako zbiór atrybutów z siatką prefiksu\\ _ mapowanie\\ _.
         
    * ULEPSZONE: Wsparcie dla grup podczas czytania.nc4 (i w pewnym stopniu w.hdf5) pliki. OgólnieERDDAP™zbiór danych będzie zbudowany ze zmiennych w jednej z grup pliku. Ponadto, GenerateDatasets XmlEDDGridPliki FromNciEDDGridPliki FromNcTeraz rozpakowany prosi o "grupę" (np. "" dla każdej / wszystkich grup "," someGroup "," someGroup / someSubGroup "lub"\\[korzeń\\]"dla grupy root) . Dzięki Charlesowi Carletonowi i Jessice Hausman.
         
    * Usprawnione: GenerateDatasets XmlEDDGridPliki FromNciEDDGridPliki FromNcRozpakowany teraz obsługuje opcjonalny parametr "DimensionsCSV", który pozwala określić nazwy źródłowe wymiarów, które mają być użyte w tym zbiorze danych. Użyj "", aby uzyskać zmienne, które używają większości wymiarów, jak wcześniej. Ponadto, powiązany mały błąd, który wystąpił z tego typu pliku jest teraz naprawiony. Dzięki Sujal Manandhar.
         
    * BUG FIX: GenerateDatasets Xml teraz poprawnie wymienia "Pliki EDDTableFromJsonlCSVFiles" (nie "EDDTableFromJsonlCSV") jako jedna z opcji EDDType. Dzięki Andy Zieglerowi.
         
    * ULEPSZONE:EDDGridPliki FromNcNiezapakowane teraz standaryzuje atrybuty "jednostek" do standardowych / "kanonicznych" wydunits (ta sama metoda co konwerter jednostek) . Na przykład:"meter per second","meters/second","m.s^-1"oraz"m s-1"Wszystko staje się"m s-1". Dzięki Andy Zieglerowi.
        
UWAGA: Możliwe, że spowoduje to problemy dla niektórych istniejących zbiorów danych (np. powodować, że nowe pliki będą oznaczone jako "złe") . Jeśli tak,[set a hard Flaga](/docs/server-admin/additional-information#hard-flag)dla zbioru danych tak, aby wszystkie pliki źródłowe były ponownie odczytywane z nowym systemem.
        
    * Ulepszone: Teraz, zmienna&lt;sourceName&gt; może określić stałą wartość = NaN, a zmienna może miećactual\\_rangeatrybut określający ograniczony zakres. Jest to czasami przydatne, więc zestaw danych (w szczególności zestaw danych EDDTableFromFileNames) może mieć zmienną manekina (s)   (np. szerokość, długość, czas) o stałych wartościach NaN, ale z ważnąactual\\_range  (według atrybutu) . Następnie, w Advanced Search użytkownik może szukać zbiorów danych, które mają dane w określonej szerokości geograficznej, długości geograficznej, przedziale czasowym i ten zbiór danych będzie w stanie powiedzieć, że posiada odpowiednie dane (chociaż wszystkie rzeczywiste wiersze danych pokaże NaN) . Patrz[dokumentacja wartości stałej](/docs/server-admin/datasets#fixed-value-sourcenames).
Dzięki Mathew Biddle.
         
    * NOWOŚĆ: Terazdatasets.xmlcząstka dla EDDTableFromAsciiFiles lub EDDTableFromColumnaraSciiFiles może zawierać znacznik, który mówiERDDAP™ignorować wszystkie linie na górze pliku aż do linii pasującej do określonego wyrażenia regularnego. Na przykład:
        &lt;skipHeaderToRegex &gt;\\\*\\\*\\\*Koniec głowy.\\*&lt;/ SkipHeaderToRegex &gt;
będzie ignorować wszystkie linie do i w tym linii, która zaczyna się od "\\*\\** END OF HEADER ". Zobacz&lt;skipHeaderToRegex &gt; dokumentacja] (/ docs / server- admin / datasets # skipheadertoregex) .
Dzięki Eli Hunterowi.
         
    * NOWOŚĆ: Terazdatasets.xmlchunk for a EDDTableFromAsciiFiles lub EDDTableFromColumnaraAsciiFilesdataset może zawierać znacznik, który mówiERDDAP™ignorować wszystkie linie w pliku pasujące do określonego wyrażenia regularnego. Na przykład:
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

będzie pomijać wszystkie linie, które zaczynają się od "#". Zobacz&lt;skipLinesRegex &gt; dokumentacja] (/ docs / server- admin / datasets # skiplinesregex) .
Dzięki Eli Hunterowi.
         
    * NOWOŚĆ:datasets.xmlczęść dla dowolnego zbioru danych EDDTable może teraz zawierać & dodać Zmienne Gdzie (_ AssioneNamesCSV _) . Jeśli tak,ERDDAP™doda widget dla każdego z atrybutów Nazwy do formularza dostępu do danych (Strona internetowa .html) aby ułatwić użytkownikom dodawanie & dodawanie Zmienne Gdzie (_ atrybut Nazwa, atrybut Wartość _) na wniosek.
Patrz[& Dodaj Zmienne Jeżeli dokumentacja](/docs/server-admin/datasets#addvariableswhere).
Dzięki Aurelie Briand, et al.
         
    * NOWA Narzędzie trzeciej strony:ERDDAP-lint
        ERDDAP-lint to program z Rob Fuller i Adam Leadbetter z Irish Marine Institute, który można wykorzystać do poprawy metadanychERDDAP™zestawów danych.ERDDAP-lint "zawiera zasady i prosty statyczny aplikacji web do wykonywania niektórych testów weryfikacyjnych przeciwkoERDDAP™serwer. Wszystkie testy są wykonywane w przeglądarce internetowej ". Jak[Unix / Linux Lint narzędzie](https://en.wikipedia.org/wiki/Lint_(software)), można edytować istniejące zasady lub dodać nowe zasady. Patrz[ERDDAP-lint](https://github.com/IrishMarineInstitute/erddap-lint)więcej informacji.
        
To narzędzie jest szczególnie przydatne dla zbiorów danych, które stworzyłeś jakiś czas temu i teraz chcesz wprowadzić up- to- date z aktualnych preferencji metadanych. Na przykład, wczesne wersje GenerateDatasets Xml nie włożył żadnego wysiłku w tworzenie globalnegocreator\\_name,creator\\_email, creator\\ _ type, lubcreator\\_urlmetadane. Przyda ci się.ERDDAP-lint do identyfikacji zbiorów danych, które nie posiadają tych atrybutów metadanych.
        
Dzięki Robowi i Adamowi za stworzenie tego narzędzia i udostępnienie goERDDAP™Społeczność.
        
    * NOWOŚĆ: Teraz jest w porządku, jeśli niektóre z plików wEDDGridZestaw danych FromFiles nie zawiera wszystkich zmiennych zbioru danych. Pliki zostaną włączone tak, jakby miały zmienne (ze wszystkimi brakującymi wartościami) .
Dzięki Dale 'owi Robinsonowi i Dougowi Latornellowi.
         
    * NOWOŚĆ: W pliku dziennika i dzienniku dziennika znajdują się nowe statystyki wykorzystania, aby pomóc administratorom zidentyfikować użytkowników, którzy powodują problemy z pamięcią. Statystyki nazywane są "OutOfMemory (Rozmiar tablicy) ", OutOfMemory (Zbyt duży) "oraz" OutOfMemory (Za duży.) ". Pokazują adresy IP użytkowników, którzy składali wnioski w tych kategoriach oraz liczbę złożonych przez nich wniosków. Jeśli nie byłoby kłopotliwych żądań, te statystyki się nie pojawią." OutOfMemory (Rozmiar tablicy) "i" OutOfMemory (Za duży.) "Wnioski zazwyczaj nie stanowią problemu, ponieważ wnioski były tak duże, żeERDDAP™szybko je złapali i zwrócili wiadomość o błędzie. The "OutOfMemory (Zbyt duży) "prośby są bardziej niebezpieczne, ponieważERDDAP™dołożył trochę wysiłku, zanim zdał sobie sprawę, że nie było wystarczająco dużo pamięci obecnie dostępne do obsługi wniosku (chociaż problemem mogą być inne wnioski tuż przed tymi wnioskami) .
        
Istnieją również nowe statystyki o nazwie "Duży wniosek, adres IP", które pokazują adresy IP użytkowników, którzy złożyli duże wnioski (obecnie, gridded.ncpliki &gt; 1GB) .
        
Ponadto tabela szeregów czasowych na stronie status..html zawiera teraz kolumnę "memFail" przedstawiającą liczbę żądań, które zawiodły z "OutOfMemory" (Zbyt duży) "błędy od ostatniego głównego wczytywania danych. Każda liczba inna niż 0 jest przynajmniej powodem do niepokoju.
Dzięki Bobowi Simonsowi.
        
    * NOWOŚĆ: Nowa wersjaHyraxwyświetla listę katalogów inaczej niż wcześniej.ERDDAP™może teraz przeczytać stare i nowe listy katalogów.
         
    * NOWOŚĆ: Przeładowanie zestawu danych i odpowiedzi użytkowników, które wymagają &gt; 10 sekund do zakończenia (pomyślnie lub nieskutecznie) są oznaczone " (&gt; 10&#33;) ". W ten sposób można przeszukać plik log.txt, aby znaleźć te zbiory danych, które były wolne do ponownego załadowania lub liczbę żądań, które były wolne do zakończenia. Następnie można spojrzeć wyżej w pliku log.txt, aby zobaczyć, jaki był problem z zbiorem danych lub jakie było żądanie użytkownika i z kogo pochodził. Te powolne ładunki zbioru danych i żądania użytkowników są czasami opodatkowaneERDDAP. Wiedząc więcej o tych prośbach, możesz zidentyfikować i rozwiązać problemy.
    * Usprawniono: Podczas walidacji zbioru danych dotyczących DSG CF,ERDDAP™teraz zapewnia, że zmienne z atrybutami cf\\ _ role znajdują się na odpowiedniej liście cdm\\ _...\\ _ zmiennych i nie znajdują się na innych listach cdm\\ _...\\ _ zmiennych. Na przykład, jeżeli zbiór danych profilowych dla timeseriesProfile posiada zmienną "station\\ _ id", która ma cf\\ _ role = timeseries\\ _ id atrybut, to "station\\ _ id" musi być na liście cf\\ _ timeseries\\ _ variables, ale nie może być na liście cf\\ _ profile\\ _ variables.
Dzięki Micah Wengren.
         
    * Usprawniono: "Uproszczenie" jest teraz szybsze, używa mniej pamięci i może zwrócić LongArray. DziękiUnidata.
         
    * ULEPSZONE: Szybkie wznowienie jest teraz znacznie szybsze dla EDDTableFrom (nc- related) Pliki (z wyjątkiem plików EDDTableFromNcCFFiles i plików EDDTableFromInvalidCRA) ponieważ make Oczekiwane (i inne miejsce) Teraz po prostu odczytuje metadane pliku próbki zamiast odczytywać wszystkie dane. Dzięki Jessice Austin.
         
    * Usprawniono: Istnieje teraz wsparcie dla strun czasowych z precyzją większą niż -the-millisecond, jeśli dodatkowe cyfry są wszystkie 0, np. "2020- 05- 22T01: 02: 03.4560000Z". Dzięki Yibo Jiang.
         
    * ULEPSZONE: GenerateDatasetsXml 's EDD.suggestDestinationName used to remove' ('i wszystko po. Teraz usuwa (.\\*) tylko jeśli jest to koniecsourceName. Teraz również usuwa\\[.\\*\\]tylko jeśli to jest koniecsourceName. Dzięki Julien Paul.
         
    * Usprawnione: GenerateDatasets Xml tworzy zmiennądestinationNames unikalny przez dodany\\ _ 2,\\ _ 3,..., w razie potrzeby. Dzięki Julien Paul.
         
    * Usprawniono: Kiedy Calendar2.parseDateTime przepada dd, hh lub HH, pierwsza cyfra może być teraz przestrzenią.
    * Znany problem: Począwszy odERDDAP™2.10,.ncPliki ml, które próbują zmienić atrybut, nie zmieniają atrybutu. Jest to znany błąd w netcdf- java, który zgłosiłem i mówią, że zostanie naprawiony w następnym wydaniu netcdf- java.
         
    * / Stworzyłem odpowiedni system do testowania zerwanych połączeń wERDDAP™strony internetowe, więc nie powinno być teraz bardzo mało połamanych linków (co najmniej od każdej daty wydania -- często pojawiają się nowe zerwane linki) .
         
    * BUG FIX: EDDTableFromHttpGet nie powiodło się z niektórymi rodzajami wniosków. Teraz już nie. Dzięki Emmie z BODC.
         
    * BUG FIX: Aby spełnić niektóre żądania, EDDTable sporządziło plik tymczasowy dla każdej żądanej zmiennej z nazwą pliku kończącą się nazwą zmiennej. Jeśli nazwa zmiennej była również rodzajem kompresji (np. .Z) ,ERDDAPSpróbuje (i porażka) do dekompresji pliku tymczasowego. Teraz tymczasowe nazwy plików kończą się na "temp". Dzięki Mathew Biddle.
         
    * BUG FIX: GenerateDatasetsXml i Calendar2.convertToJavaDateTime Format jest teraz znacznie mniej prawdopodobne, aby dokonać nieprawidłowej zmiany podczas próby naprawienia ewentualnie nieprawidłowego formatu daty. W szczególności nie zostanie zmodyfikowany żaden auto- sugerowany format dateTime. Dzięki Mathew Biddle.
         
    * BUG FIX: Jeśli podczas pobierania zawartości ze zdalnego adresu URL wystąpił błąd i jeśli zawartość errorStream jest skompresowana,ERDDAP™teraz poprawnie dekompresuje komunikat błędu. Dzięki Bobowi Simonsowi.
         
    * BUG FIX:&lt;abonbeToRemoteErddapDataset &gt; nie był stosowany, gdy EDD... Zestaw danych FromErddap był zbiorem danych dla dzieci. Teraz jest. Dzięki Chrisowi Romsos.
         
    * BUG FIX: GenerateDatasets Xml nie uważa już, że nazwa zmiennej źródłowej zaczynająca się na "latin" może być szerokością geograficzną. Dzięki Vincentowi Luzzo.
         
    * BUG FIX: Teraz OutOfMemoryError podczas czytania pliku danych podczas przetwarzania żądania użytkownika nie jest powodem do dodania pliku do listy plików BadFiles. Dzięki Bobowi Simonsowi.
         

## Wersja 2.02{#version-202} 
 (wydany 2019- 08- 21) 

*    **Nowe funkcje i zmiany (dla użytkowników) :** 
    * NOWOŚĆ: Istnieją teraz dwa sposoby wyszukiwania zbiorów danych na wieluERDDAPb. Działają one nieco inaczej i mają różne interfejsy i opcje.
        
        *   [Poszukiwanie wielokrotneERDDAPs.html](/SearchMultipleERDDAPs.html)od Boba Simonsa /NOAA NMFS SWFSC ERD.
        *   [ http://erddap.com ](http://erddap.com)z Rob Fuller / The Marine Institute of Ireland.
        
Dzięki Tylar Murray za oryginalną prośbę.
         
    * Usprawniono: wniosek do"files"system pobierania pliku, który jest rzeczywiście na zdalnej stronie (np. AWS S3) teraz prowadzi do przekierowania, więc użytkownik faktycznie pobrać dane ze źródła, zamiast korzystania zERDDAP™jako pośrednik. Dzięki Andy Ziegler iNOAA.
         
    * NOWOŚĆ: Jako przykład nowych funkcji związanych z AWS S3 i aby ułatwić każdemu przeglądanie i pobieranie plików z publicznych wiader AWS S3, stworzyliśmy
        [~ 110 próbek zbiorów danych](https://registry.opendata.aws/)które pozwalają każdemu przeglądać zawartość prawie wszystkich
        [AWS S3 Otwarte zbiorniki danych](https://registry.opendata.aws/). Jeśli klikniesz na"files"link do którejkolwiek z tych przykładowych zbiorów danych, można przeglądać drzewo katalogów i pliki w tym wiadrze S3. Ze względu na to, jak działają te zbiory danych, listy katalogowe są zawsze doskonale aktualizowane, ponieważERDDAP™Włączam je. Jeśli klikniesz w drzewo katalogowe na nazwę pliku i klikniesz na nazwę pliku,ERDDAP™przekieruje Państwa prośbę do AWS S3, aby można było pobrać plik bezpośrednio z AWS.ERDDAP™administratorzy mogą
        [czytaj wskazówki jak to zrobić dla innych wiader S3](/docs/server-admin/datasets#working-with-aws-s3-files). Dzięki Andy Ziegler iNOAA.
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * Rzeczy, które musisz zrobić: brak
         
    * ULEPSZONE:ERDDAPsposób przechowywania tablic strun (StringArray) jest teraz znacznie bardziej wydajny w pamięci. String Tablice są używane w całymERDDAP™, w szczególności podczas czytania tabelarycznych plików ASCII. Ponadto, inne zmiany sprawiają, że czytanie CSV / TSV / SSV ASCII, columnar ASCII i jsonlCSV tabelaryczne pliki danych szybciej i znacznie bardziej efektywne pamięci. Wynik jest następujący: dla 764 MB pliku testowego ASCII (ale skompresowane do 52MB.gzplik) z 3,503,266 wierszy i 33 kolumnami, maksymalne zużycie pamięci spadło z 10GB do 0,6GB (w piku) . Czas, aby przeczytać go poszedł z ~ 7 minut (ale znacznie różni się od tego, ile pamięci fizycznej jest w komputerze) w dół do ~ 36 sekund (w tym 10 s dla uproszczenia () który jest używany tylko przez GenerateDatasets Xml) . Wiele innych miejsc wERDDAP™skorzysta z tej zwiększonej wydajności pamięci. Dzięki Tylar Murray i Mathew Biddle.
        
Zbadałem inne rozwiązanie. (przechowywanie strun w StringArray jako tablice bajtowe zakodowane UTF- 8) . Zmniejsza to wykorzystanie pamięci o kolejne 33%, ale kosztem spowolnienia o 33%. W porównaniu z systemem, który jest obecnie używany, wydawało się to złym handlem. Łatwiej jest dać komputerowi więcej pamięci. (kupić więcej pamięci dla ~ 200 dolarów) niż przyśpieszyć (kupić zupełnie nowy komputer) .
        
Jeśli jest to wygodne, to zawsze dobrym pomysłem jest podzielenie ogromnych plików tabelarycznych na kilka mniejszych plików na podstawie niektórych kryteriów, takich jakstationIDlub czas.ERDDAP™często musi tylko otworzyć jeden z małych plików w odpowiedzi na życzenie użytkownika, a tym samym być w stanie reagować znacznie szybciej.
        
    * Poprawione: Teraz jest[ERDDAP™Dokumentacja AWS S3](/docs/server-admin/datasets#working-with-aws-s3-files), który opisuje, jak uzyskaćERDDAP™do pracy z plikami danych w wiadrach AWS S3.
Poza tym,ERDDAP™teraz używa nowych funkcji w AWS S3JavaAPI.
Poza tym,ERDDAP™teraz pozwala AWS S3 URL dodać dodatkowe znaki (okres, hifen, podkreślenie) w nazwach kubełków.
Poza tym,ERDDAP™teraz wymaga, aby AWS S3 bucket URL były identyfikowane w szczególny sposób:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
gdzie przedrostek jest opcjonalny.
Dzięki Andy Ziegler iNOAA.
         
    * Usprawnione: GenerateDatasets Xml teraz traktuje dodatkowe częstemissing\\_values stand- ins jako brakujące wartości i tak jest bardziej prawdopodobne, aby przekształcić kolumnę do numerycznego typu danych. Ponadto, PrigiveArray.upraszcza () teraz loguje, która wartość danych spowodowała, że potraktowano daną kolumnę jako kolumnę ciągów. Dzięki Mathew Biddle.
         
    * ULEPSZONE:&lt;requestBlacklist &gt; teraz obsługuje.\\*.\\*  (lub:\\*:\\*dla IPv6) na końcu adresów IP tak, że można na czarnej liście większej części adresów IP, np. 110.52.\\*.\\*  (Chiny Unicom Tianjin) . Zob. dokumentacja dla [&lt;requestBlacklist &gt;] (/ docs / server- admin / datasets # requestblacklist) Dzięki China Unicom i China Telecom.
         
    * ULEPSZONE: Jeśli źródło zbioru danych nie określa"institution"atrybut, GenerateDatasets Xml i loadDataset teraz uzyskać go z atrybutu "creator\\ _ institution" (jeżeli jest dostępny) . Dzięki Micah Wengren.
         
    * BUG FIX: standaryzacja Co nie zawsze było stosowane do plików ASCII.
Ponadto EDDTable nie poradził sobie z ograniczeniami dotyczącymi wartości czasowych, gdy źródło miało wartości czasowe String i standaryzowało Co było używane.
Dzięki Palomie de la Vallee.
        
Nie wyraziłem się jasno: należy po prostu użyć standaryzacji Jakie funkcje, gdy naprawdę ich potrzebujesz (np. gdy różne pliki źródłowe przechowują wartości czasu na różne sposoby) , ponieważ niektóre wnioski o zestawy danych, które używają standaryzacji Co będzie przetwarzane trochę wolniej.
        
    * BUG FIX: Błąd w kodzie używanym przezEDDGridFromNcFiles spowodował, że zawiodło z.nc4 oraz.hdf5 plików, które mają "długi" (int64) zmienne. To już naprawione. Dzięki Friedemannowi Wobusowi.
         
    * BUG FIX: Małe zmiany w plikach ISO 19115, aby inny walidator był szczęśliwy. Dzięki Chrisowi MacDermaid i Annie Milan.
         

## Wersja 2.01{#version-201} 
 (wydany 2019- 07- 02) 

*    **Nowe funkcje i zmiany (dla użytkowników) :** 
    * Brak
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * BUG FIX: Błąd w kodzie generujący formularz dostępu do danychtabledapZestawy danych spowodowały, że strona była pusta dla niektórych zbiorów danych. Ponadto poprawiłem obsługę nieoczekiwanych błędów na wszystkich stronach HTML, więc będą one (zwykle) wyświetla komunikat błędu. Dzięki Marco Albie.
    * Usprawnione: GenerateDatasets Xml nie drukuje już długiego ostrzeżenia u góry wyjścia. Zamiast tego, proszę zobaczyć[Edycja Generate Zestawy danych Wyjście Xml](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better). Dzięki Stevenowi Baumowi.
    * Usprawnione: GenerateDatasets Xml wydaje teraz nieco inne zalecenia w różnych sytuacjach&lt;updateEveryNMillis &gt; dla EDD... z... zbiorów danych plików. Ponadto, GenerateDatasets Xml zniechęca teraz oryginalny system "extract" dla zbiorów danych EDDTableFromFiles.

## Wersja 2.00{#version-200} 
 (wydany 2019- 06- 26) 

*    **ERDDAP™V2.00 w końcu tu jest&#33; Tak&#33;**   
     
    * Przepraszamy za długi czas potrzebny na zakończenie tej wersji.
Dziękuję za cierpliwość.
         
    * Dobrą wiadomością jest to, że dodatkowy czas został wykorzystany do dodania więcej funkcji, że użytkownicy zażądali. Zła wiadomość jest taka, że nawet z opóźnieniem nie wszystkie wymagane funkcje zostały dodane. Przykro nam, ale wydaje się ważniejsze, aby wyciągnąć to zwolnienie niż opóźnić więcej (Na zawsze?) ciągłe dodawanie nowych funkcji. Obiecujemy powrócić do częstszych wydań w przyszłości.
         
    * "Wersja 2? Czy istnieją duże zmiany i niezgodności?"
Duże nowe cechy? Tak.
Duże niezgodności lub zmiany dla administratorów lub użytkowników? Nie.
Skoczyliśmy z v1.82 do v2.00:
        * częściowo świętować 10 lat (teraz 11) od pierwszego publicznego wydaniaERDDAP™  (v1.00 na 2008- 05- 06, który na zewnątrz wyglądał niezwykle jak v2.00) . W tym czasie,ERDDAP™z jednej instalacji do prawie 100 instalacji w co najmniej 12 krajach (Australia, Belgia, Kanada, Francja, Indie, Irlandia, Włochy, Republika Południowej Afryki, Hiszpania, Tajlandia, Wielka Brytania, USA) .
        * częściowo w celu oznaczenia znacznego dodania w zupełnie nowym kierunku:ERDDAP™teraz ma system pochłaniania danych, aby przejść do istniejących usług serwera danych (patrz[EDDTableFromHttpGet](#eddtablefromhttpget)) ,
        * i częściowo dlatego, że nie był to duży skok z 1.82 do 2.00 liczbowo, więc to wydawało się odpowiedni czas.
             
    * Inną dobrą wiadomością jest to, że istnieją teraz dwie inne grupy wnoszące kodERDDAP™  (w tej wersji i ze wskazaniami będą one nadal) : Rob Fuller and Adam Leadbetter of Ireland 's Marine Institute, and Roland Schweitzer of PMEL and Weathertop Consulting. Dziękuję bardzo. To prawda, że pracują nad projektami, które sami wybierają, ale to klasyczny model rozwoju open- source - grupy przekazują kod funkcji, które najbardziej chcą zobaczyć dodawane. Dodatkowa korzyść dla uczestników: mogą korzystać z nowych funkcji jak tylko są gotowe; nie muszą czekać na kolejne wydanieERDDAP. Twoja grupa też może wnieść swój wkład&#33; Patrz[ERDDAP™Przewodnik programisty](/docs/contributing/programmer-guide).
         
    * Mamy nadzieję, że ci się spodoba.ERDDAP™v2.00. czekamy na kolejne 10 latERDDAP™rozwój i coraz większe wykorzystanie na całym świecie.
         
*    **Nowe funkcje i zmiany (dla użytkowników) :**   
     
    * NOWOŚĆ:orderByMeanfiltr
zamiasttabledapzbiory danych będą obliczać środki dla określonych grup. Ponadto, wszystkieorderByopcje teraz obsługują dodatkowy sposób definiowania grup: _ numerycVariable\\[/ Numer\\[timeUnits\\]\\[: offset\\]\\]_, np., czas / 1 dzień lub głębokość / 10: 5. Na przykład:stationID, time, waterTemp &orderByMean ("stationID, czas / 1 dzień ") będzie sortować wyniki przezstationIDi czas, a następnie obliczyć i zwrócić średnią wody Temp dla każdegostationIDna każdy dzień. Są to niezwykle przydatne i potężne nowe funkcje. Nowy kod dla tych funkcji i zmiany starego kodu zostały wprowadzone przez Roba Fullera i Adama Leadbetter z irlandzkiego Instytutu Morskiego i przedstawione przez Git. Dziękuję. Rob i Adam&#33;
         
    * NOWOŚĆ: typ pliku wyjściowego dla zbiorów danych tabelarycznych:[.data Tabela](https://developers.google.com/chart/interactive/docs/reference#dataparam),
plik JSON sformatowany do użycia zGoogle Visualizationbiblioteka klientów (Google Charts) . Kod do tego przyczynił się Roland Schweitzer i przekazał za pośrednictwem Gita. Dziękuję. Roland&#33;
         
    * NOWOŚĆ: typ pliku wyjściowego dla zbiorów danych tabelarycznych:[.jsonlCSV1](https://jsonlines.org/examples/),
który jest jak istniejący.jsonlCSVopcja, ale z nazwami kolumn na pierwszej linii. Dzięki Eugene 'owi Burgerowi.
         
    * NOWOŚĆ: Jeśli administrator to umożliwia, użytkownicy mogą się zalogować[ORCID](https://orcid.org)konto.
Jest to system uwierzytelniania OAuth 2.0, podobnie jak uwierzytelnianie Google. ORCID jest szeroko stosowany przez naukowców do jednoznacznej identyfikacji. Konta ORCID są darmowe i nie mają problemów z prywatnością, które mają konta Google. PatrzERDDAPjest[Instrukcje uwierzytelniania przez sieroty](/docs/server-admin/additional-information#orcid). Dzięki BCO- DMO (Adam Shepard, Danie Kinkade, itp.) .
         
    * NOWOŚĆ: Nowy konwerter URL konwertuje URL-of- date do URL-to-date.
Zobacz... / erddap / convert / urls.html na dowolnychERDDAP™instalacja, np.,
        [ten link do konwertera wERD ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html). Powinno to być użyteczne dla zarządzających danymi. Jest to również używane wewnętrznie przez GenerateDatasetsXml. Dzięki Bobowi Simonsowi i Sharon Mesick.
         
    * POPRAWA:[Konwersja czasu](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)teraz ma opcje, aby przekonwertować dowolny wspólny czas łańcuchowy na czas łańcuchowy ISO8601, lub przekonwertowaćUDUNITS-like time units string into a rightUDUNITSciąg jednostek czasowych. Powinno to być również przydatne dlaERDDAP™administratorzy, którzy muszą wiedzieć jaki format należy określić dla atrybutu "jednostki" dla zmiennych czasu łańcucha. Jest to również używane wewnętrznie przez GenerateDatasetsXml i standaryzCo to jest funkcja EDDTableFromFiles. Dzięki Bobowi Simonsowi.
         
    * NOWOŚĆ:[Konwersja jednostek](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)posiada nową opcję "Standard UDUnits".
Na przykład, "deg\\ _ C / m" i "stopni\\ _ C meters-1" są konwertowane do
"stopień\\ _ C m-1". Ta funkcja jest również używana przez standaryzCo funkcja EDDTableFromFiles. Dzięki Bobowi Simonsowi.
         
    * NOWOŚĆ: dla wykresów (inne niż wykresy powierzchni) na griddap itabledap's Make A Graph web pages, when the x axis not a time size, if only a subset of the x axis' s variable 's range is visible, there are above the graph to shift the X Axis left twards or right twards. Dzięki Carrie Wall Bell / projektowi Hydrophone.
         
    * NOWOŚĆ: Dla wykresów oś X i / lub Y może teraz używać skali dziennika.
Użytkownicy mogą sterować skalą Y Axis poprzez nowy widżet w dół na griddap itabledapZrób stronę Wykres. Patrz[.xRange i. Dokumentacja yRange](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange). Dzięki Carrie Wall Bell / projektowi Hydrophone.
         
    * ULEPSZONE:ERDDAP™teraz lepiej wykorzystuje różne kody błędów HTTP i teraz zwraca(OPeN)DAPv2.0- sformatowany komunikat błędu. Patrz[szczegóły](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors). Dzięki Antoine 'owi Queric i Aurelie Briand.
         
    * Usprawniono: Nie używać Netcdf- java / c lub innych narzędzi oprogramowania do podłączenia.nclub.hdfpliki obsługiwane przezERDDAP's / files / system jak gdyby były to pliki lokalne.ERDDAP™teraz odrzuca te prośby. Jest ona okropnie nieefektywna i często powoduje inne problemy. Zamiast tego:
        
        * Stosowanie(OPeN)DAPoprogramowanie klienta do podłączenia doERDDAPjestDAPusługi w zakresie zbioru danych (które mają / griddap / lub /tabledap/ w URL) . To właśnie to.DAPjest dla i robi tak dobrze.
        * Lub użyć formularza dostępu do danych w zestawie danych, aby zażądać podzbioru danych.
        * Lub, jeśli potrzebujesz całego pliku lub wielokrotnego dostępu przez długi okres czasu, użyjcurl,wgetlub przeglądarka, aby pobrać cały plik, a następnie uzyskać dostęp do danych z lokalnej kopii pliku.
        
          
         
    * POPRAWA:ERDDAP™homepage, Full Text Search jest teraz powyżej "Zobacz listę wszystkich zbiorów danych", ponieważ jest to najlepszy punkt wyjścia dla większości użytkowników. Dzięki Didier Mallarino i Maurice Libes.
         
    * Usprawniono: Na DataProviderForm3.html są teraz listy zrzutów wspólnychstandard\\_nameb. Dzięki komuś na spotkaniu IOOS DMAC.
         
    * ULEPSZONE: Na stronie / files / web znajduje się teraz link do nowej sekcji "Co mogę zrobić z tymi plikami?" w sekcji / files / documentation. Sekcja ta opisuje różne typy plików i zawiera sugestie, jak z nimi pracować. Dzięki Maurice 'owi Libesowi.
         
    * ULEPSZONE: Prawie każdy wniosekERDDAP™powinno być co najmniej trochę szybciej, a czasami znacznie szybciej.
         
    * BUG FIX: W niektórych okolicznościach, gdy zbiór danych EDDTable zapisuje dane w niektórych rodzajach.ncpliki, globalny atrybut "id" został ustawiony na proponowaną nazwę pliku, która zawiera hasz, aby uczynić go unikalnym dla tego żądania. Teraz "id" jest właściwie niezmieniony (jeżeli podano) lub ustawić do zbioru danychdatasetID  (jeżeli nie określono) . Dzięki Johnowi Maurerowi.
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:**   
     
    * TO DO: To zwolnienie zajmie trochę czasu i pracy od Ciebie. Prosimy o cierpliwość i zaplanować kilka godzin na wprowadzenie wymaganych zmian i kilka godzin na eksperymenty z nowymi funkcjami.
         
    * DO: Dla bezpieczeństwa, zrobić kopię zapasową Twojego bieżącego setup.xml idatasets.xmlpliki tak, że można do nich wrócić w nieprawdopodobnym przypadku, gdzie trzeba wrócić doERDDAP™v1.82.
         
    * DO: ZalecaneJavajest teraz AdoptOpenJDK OpenJDK 8 (LTS) + HotSpot.
Jest to wariant open sourceJavaktóry nie ma żadnych ograniczeń w jego stosowaniu (w przeciwieństwie doOraclejestJavadystrybucja) . Pochodzi zOraclejestJavaw sposób ciągły, zOracleBłogosławieństwo. Ze względów bezpieczeństwa ważne jest, aby zachowaćJavawersja up- to- date. PatrzERDDAPjest[Javainstrukcje instalacji](/docs/server-admin/deploy-install#java).
         
    * TO DO: AdoptOpenJDK 'sJavapotrzebuje małego dodatku do instalacji Tomcat: zobacz[Zasoby Instrukcje Cache](/docs/server-admin/deploy-install#contentxml). Myślę, że to zastąpi ustawienie -XX: MaxPermSize, które (Przyjęcie) OpenJDK nie obsługuje już.
         
    * DO: Nowy domyślny i polecam&lt;fontFamily &gt; ustawienie w setup.xml
DejaVu Sans wbudowane w AdoptOpenJDKJava. Patrz
        [zmienione instrukcje instalacji czcionki](/docs/server-admin/deploy-install#fonts).
         
    * DO: Wiele tagów przenosi się z setup.xml dodatasets.xml. Zaletą jest to, że można zmienić ich wartości podczasERDDAP™działa, bez ponownego uruchamianiaERDDAP. W szczególności, można łatwo zmienić&lt;startBodyHtml5 &gt; do wyświetlenia tymczasowej wiadomościERDDAP™strona główna (np. "Sprawdź nowy zestaw danych JPL MUR SST v4.1"... lub "TenERDDAP™będzie offline do konserwacji 2019- 05- 08T17: 00: 00 PDT przez 2019- 05- 08T20: 00: 00 PDT ".) . Jeśli / kiedy zmienisz te znacznikidatasets.xml, zmiany zaczną obowiązywać następnym razemERDDAP™odczytdatasets.xml.
         
        
        1. Kopiuj tę zawartość do swojegodatasets.xmlplik (w pobliżu początku pliku, po&lt;erddapDatasets &gt;):
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2. One- by- one, skopiuj wartość (jeżeli istnieje) dla każdego z tych znaczników z pliku setup.xml do nowego znacznika, który właśnie wkleiłeś (powyżej) wdatasets.xml. Na przykład, gdybyś użył wartości 30 dla&lt;KaszeMinuty &gt; w setup.xml, należy skopiować tę wartość do nowego&lt;kapsułki &gt; tag indatasets.xml  (chociaż jeśli wartość jest taka sama jak nowa wartość domyślna, najlepiej zostawić znacznik wdatasets.xmlpuste) .
            
Jeśli wartość jest inna niż nowa sugerowana wartość domyślna (inna niż dla&lt;startBodyHtml5 &gt; oraz&lt;shortDescriptionHtml &gt;, które są przydatne do dostosowania TwojegoERDDAP™instalacji), należy rozważyć przejście na nowe wartości domyślne. Dotyczy to w szczególności&lt;partialRequestMaxBytes &gt; oraz&lt;partialRequestMaxCells &gt;, gdzie wartość domyślna / sugerowana zmieniła się znacznie w ciągu lat.
            
Po skopiowaniu każdej wartości, usuń znacznik i jego opis z setup.xml. Lepiej mieć te znaczniki wdatasets.xml. I teraz są lepsze opisy w[setupDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file).
            
        
Dziwakiem nowego systemu jest to, że po uruchomieniu pierwszej strony internetowejERDDAPbędzie domyślnymERDDAP™strona internetowa. Każda kolejna strona będzie korzystać z zawartości... Html, którą podasz wdatasets.xml.
        
    * UWAGA: Pierwszy raz uciekaszERDDAP™v2.0, zbiory danych oparte na lokalnych plikach danych będą wczytywane **Bardzo często** powolne, ponieważERDDAP™musi odtworzyć swoją bazę plików w nieco innym formacie. Po powolnym wstępnym przeładowaniu, będą one ładować szybko, jak wcześniej. Cierpliwości.
         
#### EDDTableFromHttpGet{#eddtablefromhttpget} 
    *   [BIG NEW FEATURE: EDDTableFromHttpGet](#eddtablefromhttpget)  
Aż do teraz,ERDDAP™wystarczy przeczytać dane i udostępnić je użytkownikom. Teraz,ERDDAP™posiada prosty, wydajny system do przyjmowania danych w czasie rzeczywistym z czujników. Wśród innych funkcji, ten zestaw danych oferuje fineziarnistą wersję: pamięta każdą zmianę w zbiorze danych, kiedy został wykonany, i przez kogo. Zazwyczaj użytkownicy będą chcieli po prostu najnowszej wersji zbioru danych, ze wszystkimi zmianami zastosowanymi. Istnieje jednak możliwość żądania przez użytkowników danych z zbioru danych w dowolnym momencie. Ułatwia to odtwarzalną naukę. Tak więc, w przeciwieństwie do większości innych zbiorów danych w czasie rzeczywistym, te zbiory danych kwalifikują się do[DOIs](https://en.wikipedia.org/wiki/Digital_object_identifier). ponieważ spotykają się zDOIwymóg, aby zbiór danych nie uległ zmianie, z wyjątkiem agregacji. Patrz[EDDTableFromHttpGet](/docs/server-admin/datasets#eddtablefromhttpget). Dzięki OOI (od dawna i teraz) za rozmowę o potrzebie i Eugene Burger o przypomnieniu o pracy nad tym, co ważne.
         
    * BIG NEW FEATURE:ERDDAP™może teraz obsługiwać dane bezpośrednio z plików danych skompresowanych zewnętrznie, w tym.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, lub .Z. Datasety mogą zawierać mieszankę plików skompresowanych zewnętrznie (Może starsze pliki danych?) i nie- zewnętrznie - skompresowane pliki, i można skompresować / dekompresować plik w każdej chwili.
        
To działa świetnie&#33;
W większości przypadków spowolnienie związane z dekompresją plików jest niewielkie. Zdecydowanie zachęcamy do tego, szczególnie w przypadku zbiorów danych i / lub plików danych, które rzadko są wykorzystywane.
        
To może zaoszczędzić 30 tysięcy dolarów lub więcej&#33;
To jeden z niewielu.ERDDAP™funkcje, które mogą zaoszczędzić dużo pieniędzy - jeśli skompresujesz wiele plików danych, będziesz potrzebował znacznie mniej dysków Rolling / Hard do przechowywania danych, lub odwrotnie, można podać znacznie więcej danych (do 10x) Z tym, co już masz. Jeśli ta funkcja oszczędza Ci kupowania kolejnego RAID, to zaoszczędziło Ci około 30,000 dolarów.
        
Patrz[Dokumentacja plików skompresowanych zewnętrznie](/docs/server-admin/datasets#externally-compressed-files). Dzięki Benoit Perrimond i Paloma de la Vallee.
        
    * BIG NEW FEATURE: WszystkieEDDGridPliki FromFiles i wszystkie pliki EDDTableFromFiles obsługują&lt;cacheFromUrl &gt; tag i a&lt;cacheSizeGB &gt; tag. Jeśli cacheSizeGB nie jest podany, to pobierze i zachowa kompletną kopię zdalnego zbioru danych. Jeśli cacheSizeGB jest określony i jest &gt; 0, to pobierze pliki ze zdalnego zbioru danych, w razie potrzeby, do lokalnego pamięci podręcznej o ograniczonym rozmiarze, co jest przydatne podczas pracy z chmurą (np. S3) pliki danych. Patrz[cache Dokumentacja FromUrl](/docs/server-admin/datasets#cachefromurl)szczegóły. Dzięki Bobowi Simonsowi i Royowi Mendelssohnowi. (którzy od lat piszą skrypty do obsługi tworzenia lokalnych kopii zdalnego zbioru danych) , Lloyd Cotten, Eugene Burger, Conor Delaney (kiedy był w Amazon Web Services) oraz Google Cloud Platform.
         
    * NOWOŚĆ: Nowy EDDTableFromJsonlCSV klasa może odczytać dane tabelaryczne z
        [JSON Linie plików CSV](https://jsonlines.org/examples/)  ("Lepiej niż CSV") . Dzięki ludziom z Instytutu Marynarki Wojennej Irlandii za poinformowanie mnie o tym formacie oraz Eugene Burger i PMEL za wniosek o wsparcie go jako typu wejściowego.
         
    * NOWOŚĆ: WszystkieEDDGridi wszystkie pliki EDDTableFromFiles obsługują&lt;nThreads &gt; ustawienie, które mówiERDDAP™ile wątków należy użyć w odpowiedzi na zapytanie. Patrz[nTreads documentation](/docs/server-admin/datasets#nthreads)szczegóły. Dzięki Robowi Bochenkowi z Axiom Data Science, Eugene Burger, Conor Delaney (kiedy był w Amazon Web Services) i Google Cloud Platform.
         
    * NOWA norma Co dla wszystkich podklas plików EDDTableFromFiles -
Poprzednio, jeśli dla danej zmiennej, wartości ważnych atrybutów (np.,scale\\_factor,add\\_offset,missing\\_value,\\ _ FillValue, units) nie były spójne, EDDTableFromFiles wybierze jedną wartość dla każdego atrybutu jako "poprawną" i zaznaczy pliki z innymi atrybutami jako "złe pliki". Istnieje system standaryzacji plików, jak tylko EDDTableFromFiles je przeczyta. Patrz[Standaryzacja EDDTableFromFile Co?](/docs/server-admin/datasets#standardizewhat). Jedna zERDDAPGłównym celem jest zapewnienie spójnego dostępu do plików i zbiorów danych. standaryzacja Co jest ważnym nowym narzędziem, aby to urzeczywistnić. Dzięki Marco Albie, Margaret O 'Brien (i innych użytkowników EML) , BCO- DMO, i użytkowników InPort.
         
    * NEW EDDTableFromInvalidCRAFiles pozwala na wykonanie zbioru danych z kolekcjiNetCDF  (v3 lub v4)  .ncpliki, które korzystają z określonego, niepoprawnego wariantu karty DSG CF (CRA) pliki. Przykładowe pliki dla tego typu zbioru danych można znaleźć na stronie https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020- 10- 21 Serwer ten nie jest teraz niezawodnie dostępny\\]. ChociażERDDAP™obsługuje ten typ pliku, jest to nieprawidłowy typ pliku, którego nikt nie powinien używać. Grupy, które obecnie korzystają z tego typu plików, są zdecydowanie zachęcane do korzystania zERDDAP™generowanie ważnych plików CF DSG CRA i zaprzestanie korzystania z tych plików. Dzięki Ajayowi Krishnanowi i Timowi Boyerowi.
         
    * Pliki EDDTableFromThreddsFiles i EDDTableFromHyraxArchiwa są teraz zdeprecjonowane. Proszę przełączyć na pliki EDDTableFromNc@@ (lub wariant) plus&lt;cacheFromUrl &gt;. Jeśli to nie działa z jakiegoś powodu, emailerd.data at noaa.gov. W przypadku braku skarg przed 2020 r. te typy zbiorów danych mogą zostać usunięte.
         
    * Ulepszono... System do automatycznej konwersji non-ISO 8601 razy na ISO 8601 razy (wprowadzone w v1.82) został znacznie rozszerzony do czynienia z dużą liczbą dodatkowych formatów. Dotyczy to GenerateDatasetsXml iERDDAPZajmuje się metadanymi źródłowymi.
         
    * Ulepszono... Trzecia główna wersja systemu parsowania czasu String (i mam nadzieję, że ostatni) ,ERDDAP™nie stosuje się jużJavaDateTimeFormatter z powodu błędów, które czasami wpływają na ekstremalne czasy (lata&lt;= 0000).ERDDAP™teraz używa własnego systemu do parsowania strun czasowych.
         
    * UWAGA: Nowy system parsowania czasu String jest nieco bardziej rygorystyczny. Jeśli jeden z Twoich zbiorów danych nagle ma tylko brakujące wartości dla wartości czasu, przyczyną jest prawie na pewno to, że łańcuch formatu czasu jest nieco zły. W dzienniku powinny być komunikaty błędów. txt odnosi się do wartości czasu, które nie pasują do formatu czasu -- to powinno pomóc naprawić ciąg formatu czasu dla tego zbioru danych. Jeśli potrzebujesz pomocy, użyj opcji wERDDAPKonwerter czasu, który "Przelicz\\[s\\]dowolny wspólny czas strun do czasu strun ISO 8601 "-- oznacza format, w jakim konwerter przetwarza łańcuch źródłowy.
         
    * ZALECENIE: Najszybszy, najprostszy i najtańszy sposób na przyspieszenieERDDAPDostęp do danych tabelarycznych polega na umieszczeniu plików danych na Solid State Drive (SSD) . Większość zbiorów danych tabelarycznych jest stosunkowo mała, więc SSD 1 lub 2 TB jest prawdopodobnie wystarczające, aby przechowywać wszystkie pliki danych dla wszystkich zbiorów tabelarycznych. SSD w końcu zużywa się, jeśli zapisujesz dane do komórki, usuwasz je i zapisujesz nowe dane do tej komórki zbyt wiele razy. Zamiast tego zalecam, (w miarę możliwości) Wystarczy użyć SSD, aby zapisać dane raz i przeczytać je wiele razy. Następnie nawet SSD klasy konsumenckiej powinien trwać bardzo długo, prawdopodobnie znacznie dłużej niż dysk twardy (Dysk twardy) . SSD są teraz tanie (w 2018 r., ~ 200 dolarów za 1 TB lub ~ 400 dolarów za 2 TB) a ceny wciąż szybko spadają. KiedyERDDAP™dostęp do pliku danych, SSD oferuje zarówno
        
        * krótsze opóźnienie (0.1ms, versus ~ 3ms for an HDD, versus ~ 10 (?) ms for a RAID, versus ~ 55ms for Amazon S3) oraz
        * większa przepustowość (~ 500 MB / S, w porównaniu z ~ 75 MB / s dla dysku twardego i ~ 500 MB / s dla RAID) .
        
Więc możesz dostać się do ~ 10X wydajności booster (vs dysk twardy) Za 200 dolarów&#33; W porównaniu do większości innych możliwych zmian w systemie (nowy serwer za $10,000? Nowy RAID za 35,000 dolarów? nowy przełącznik sieci za 5000 dolarów? itd.) , jest to zdecydowanie najlepszy zwrot z inwestycji (ROI) . Jeśli serwer nie jest załadowany pamięcią, dodatkowa pamięć dla serwera jest również świetnym i stosunkowo niedrogim sposobem na przyspieszenie wszystkich aspektówERDDAP.
        \\[SSD 's byłoby również dobre dla danych zawiązanych, ale większość zawiązanych zbiorów danych są znacznie większe, co SSD bardzo drogie.\\]  
         
    * NOWOŚĆ: Każdy zalogowany otrzymuje rolę =\\[anyoneLogged W\\]-&lt;użytkownik &gt; tag dla nich wdatasets.xml. Jeśli ustawisz zbiór danych&lt;accessibleTo &gt; do\\[anyoneLogged W\\], wtedy każdy, kto zalogował się doERDDAP™  (np. za pośrednictwem konta Gmail lub Orcid) będzie uprawniony do dostępu do zbioru danych, nawet jeśli nie określono&lt;użytkownik &gt; tag dla nich wdatasets.xml. Dzięki Maurice 'owi Libesowi.
         
    * POPRAWA:UDUNITS/ Konwerter jednostek UCUM uległ znacznej poprawie.
Lepiej radzi sobie z niepoprawnymi jednostkami ciągów (poczynając od podkreślenia zachowania informacji, a nie egzekwowania ważności) . Również wyniki mają standardową składnię.
         
    * NOWOŚĆ:UDUNITS/ Konwerter jednostek UCUM ma nową opcję standaryzacjiUDUNITSString.
To działa dobrze dla poprawnegoUDUNITSstruny i dość dobrze dla niestandardowych / nieważnychUDUNITSstruny. Na przykład:UDUNITS= "metry na sekundę", "metr na sekundę","m.s^-1"oraz"m s-1"Wszyscy zwrócą "M.s- 1." To było potrzebne do nowej normy Co system opisany powyżej. Dzięki Marco Albie, Margaret O 'Brien (i innych użytkowników EML) , BCO- DMO, i użytkowników InPort.
         
    * NOWOŚĆ: EDDTableFromMultidimNcFiles teraz ma[leczenie Wymiary A](/docs/server-admin/datasets#treatdimensionsas)opcja, która mówiERDDAP™traktowanie niektórych wymiarów (np. LAT i LON) jakby były innymi wymiarami (np. czas) . Jest to przydatne dla niektórych nieprawidłowych plików, które używają różnych wymiarów dla różnych zmiennych, gdy powinny były użyć tylko jednego wymiaru (np. czas) . Dzięki Marco Albie i Maurice Libesowi.
         
    * NOWOŚĆ: Teraz wszyscyEDDGridZestawy plików obsługują nową oś specjalnąsourceNameco mówiERDDAP™w celu uzyskania informacji z nazwy pliku (tylko filename.ext) i użyć wartości do **zastąpić** istniejąca najbardziej lewa oś. Format
        \\*\\*\\ * replaceFromFileName, _ dataType _, _ extractReget _, _ captureGroupNumber _
Patrz[ta dokumentacja](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). DziękiNOAAPathfinder Daily agregation dataset.
         
    * NOWOŚĆ: Teraz wszyscyEDDGridZestawy plików obsługują nową oś specjalnąsourceNameco mówiERDDAP™aby pobrać informacje z pathName (katalogi + filename.ext)   
        \\*\\*\\ * pathName, _ dataType _, _ extractReget _, _ captureGroupNumber _
W tym celu nazwa ścieżki zawsze używa'/'jako znak separatora katalogu, nigdy '\\'.
Patrz[ta dokumentacja](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Dzięki Palomie de la Vallee.
         
    * NOWOŚĆ: Teraz, wszystko EDDTableFrom... Pliki zbiorów danych obsługują dodatkową zmienną pseudosourceNames, które pobierają informacje z pliku Nazwa pliku (tylko filename.ext)   (patrz[\\*\\*\\ * Nazwa pliku](/docs/server-admin/datasets#filename-sourcenames)) lub z pełnego pliku (/ dir1 / dir2 / filename.ext)   (patrz[\\*\\*\\ * pathName](/docs/server-admin/datasets#pathname-sourcenames)) . Dzięki Palomie de la Vallee.
         
    * NOWOŚĆ: jeśliEDDGridzestaw danych ma jeden lub więcej bardzo dużych wymiarów (np. miliony wartości) które zajmują dużo pamięci, można ustawić nowy [&lt;DimensionValuesInMemory &gt;] (/ docs / server- admin / datasets # dimensionvalues inmemory) ustawienie na false (domyślny jest true) , co powoduje, że zbiór danych zapisuje wartości na dysku i pobiera je w razie potrzeby. Podziękowania dla Davida Rodrigueza i Rich Signella (re:EDDGridPliki FromAudioFiles) .
         
    * Poprzednio, jeśli ponownie zamówićdataVariables for a EDDTableFromFiles dataset and reloaded the dataset, EDDTableFromFiles by reread all of the datafile. Teraz, może poradzić sobie z reorder bez ponownego czytania wszystkich plików danych. Dzięki Rolandowi Schweitzerowi.
         
    * Teraz, kiedyERDDAP™czytuje ASCII, NCSSV, i JSON Lines CSV tabelaryczne pliki danych, jeśli znajdzie błąd na danej linii (np. nieprawidłowa liczba elementów) , zapisuje wiadomość ostrzegawczą ("UWAGA: pominięcie linii #"... "nieoczekiwana liczba elementów"...) do[plik log.txt](/docs/server-admin/additional-information#log)a następnie kontynuuje czytanie reszty pliku danych. Tak więc, Twoim obowiązkiem jest okresowo patrzeć (lub napisać skrypt, aby to zrobić) dla tej wiadomości w dzienniku. txt tak, że można naprawić problemy w plikach danych.ERDDAP™jest skonfigurowany w ten sposób, aby użytkownicy mogli kontynuować odczytywanie wszystkich dostępnych ważnych danych, mimo że niektóre linie pliku mają wady. Poprzednio:ERDDAP™zaznaczono plik jako "zły" i usunięto go z zbioru danych.
         
    * ULEPSZONE: Kiedy dokładne czasy (np. do najbliższej sekundy lub milisekundy) są przechowywane u źródła jako "minuty od"... (lub większe jednostki) ,ERDDAP™teraz okrąża je do najbliższego milisekundy podczas odczytu wartości doERDDAP. W przeciwnym razie liczba zmiennoprzecinkowa jest posiniaczona, a wnioski o dane w określonym czasie (np., & time = 2018- 06- 15T01: 30: 00) nie uda się. Wcześniej obliczono je jak najdokładniej. (i nadal ma, jeśli jednostki są np. "sekundy od"... lub "milisekund od"...) . Najlepiej unikać tego problemu nie używając dużych jednostek (np. minuty lub godziny) do przechowywania dokładnych wartości czasowych (np. mikrosekundy) -- komputery źle sobie radzą z numerami dziesiętnymi. Dzięki Marco Albie.
         
    * ZMIANY W Tabeli EDDZEDDGridco sprawia, że jest o wiele lepiej. Tabela EDDFromEDDGridpozwala użytkownikom na zapytanie zbiorczych zbiorów danych tak, jakby były tabelarycznymi zbiorami danych ("zapytanie według wartości") .
        
        * Teraz wspiera&lt;maxAxis0 &gt; tag (domyślny = 10) która określa maksymalną liczbę osi\\[0\\]  (zwykle"time") wartości, które można od razu sprawdzić. To zapobiega naiwnym próbom uzyskania EDDTableFromEDDGriddo wyszukiwania przez cały zasłonięty zestaw danych (które nie powiodły się z błędem timeout) .
        * GenerateDatasets Xml ma teraz możliwość wygenerowania EDDTableFromEDDGridZestawy danych dla wszystkich zeszytów danych w danymERDDAP™pasujące do określonego regeksu (używać.\\ * do dopasowania wszystkich zbiorów danych) . Zestawy danych, które tworzy, zawierają dodatkowe informacje w atrybucie podsumowującym, wskazujące, że jest to wersja tabelaryczna zestawu danych zawiązanych. I ichdatasetIDjestdatasetIDo zestawie danych z zawiązaniem, plus "\\ _ Asatable".
        * Istnieje duża prędkość w górę dla najczęstszej konfiguracji: kiedy zestaw danych jestEDDGridFromaErddap dataset, który jest w tym samymERDDAP.
        
Dzięki Jamesowi Gallagherowi i Edowi Armstrongowi.
         
    * NOWOŚĆ: generować Zestawy danych Xml dla wszystkich typów zbiorów danych jest teraz znacznie bardziej prawdopodobne, aby dodać\\ _ FillValue lubmissing\\_valueatrybut zmiennej numerycznejaddAttributes. Na przykład pojawia się to, gdy brak znaczników wartości łańcucha (np. ",". ","? "," NA "," nd "," NaN ") dla tej zmiennej w pliku próbki są konwertowane doERDDAProdzime brakujące wartości (127 w kolumnach bajtowych, 32767 w kolumnach krótkich, 2147483647 w kolumnach int, 9223372036854775807 w długich kolumnach i NaN w zmiennych zmiennoprzecinkowych i podwójnych) . Występuje również dla wartości NaN w zmiennych zmiennoprzecinkowych i podwójnych. Ponadto, "nd" został dodany do listy wspólnych brakujących znaczników wartości w kolumnach danych liczbowych, któreERDDAP™powinien szukać. Dzięki Mattowi Biddle z BCO- DMO.
         
    * Usprawniono: opcja ncdump w generowaniu Zestawy danych Xml jest teraz bardziej jak ncdump (ale nadal używa wersji netcdf- java ncdump) . Drukuje nową listę opcji. Teraz....ncPliki ml, drukuje wyjście ncdup dla wyniku.ncml zmiany plików stosowane do podstawy.nclub.hdfplik.
         
    * BUG FIX: Był wyciek z uchwytu. (ostatecznie powodującERDDAP™do zamrożenia) spowodowane przy tworzeniu niektórych typów plików wyjściowych, np. .geotif, zwłaszcza w przypadku wystąpienia błędów podczas tworzenia. Mam nadzieję, że to już ustalone. Jeśli nadal widzisz problemy, powiedz mi jaki jest typ zbioru danych (siatka lub tabela) i typ pliku, który powoduje problem. Dzięki Stevenowi Beale, Lynn DeWitt, Jibei Zhao i innym.
         
    * BUG FIX: WWMS Leafletdemo nie w pełni / prawidłowo przekształciło oś "głębokość" w "elewację". Teraz tak, a złamane życzenia legend są naprawione. Ponadto wszystkie opcje osi na listach rozwijanych są zawsze w kolejności sortowania. Dzięki Antoine 'owi Queric i Aurelie Briand.
         
    * BUG FIX: EDDTableFromFiles teraz poprawnie obsługuje ograniczenia zmiennych String, które zostały utworzone ze zmiennych znaków w plikach danych. Dzięki Antoine 'owi Queric i Aurelie Briand.
         
    * BUG FIX: Teraz, kiedy zestaw danych staje się niedostępny, zestaw danych próbuje powiadomić (z wiadomością "Ten zestaw danych jest obecnie niedostępny".) jej abonenci, wymienione działania, rss i lonPM180 zbiorów danych, które na nim opierają. Dzięki Royowi Mendelssohnowi i Bobowi Simonsowi.
         
    * BUG FIX: Dwa błędy związane z EDDTableCopy. Dzięki Samowi McClatchie.
         
    * ULEPSZONE: Liczba nieudanych wniosków wyświetlanych na stronie status.html wzrośnie, ponieważ więcej rzeczy jest liczonych jako porażki niż wcześniej.
         
    * ULEPSZONE:ERDDAPjego status.html teraz pokazuje "Wnioski (mediana czasu w ms) "w serii czasowej. Wcześniej, to pokazało mediana razy skrócone do liczb całkowitych sekund.
         
    * ULEPSZONE: W wyniku jsonld, Jsonld "nazwa" teraz pochodzi z zbioru danych"title"wERDDAP, i jsonld "nagłówek" teraz pochodzi z zbioru danych "datasetID"wERDDAP. Wcześniej było odwrotnie. Wydaje mi się, że to złe, bo w normalnym angielskim użyciu "imię" jest zwykle krótkie, (Najlepiej) niepowtarzalny identyfikator, który rzadko / nigdy się nie zmienia (np. Robert Middlename Simons) , nie opis, który nie jest unikalny i który może łatwo i często zmienić (np. "Facet, który pisze oprogramowanie dlaNOAA"vs" Wysoki facet, który pisze oprogramowanie dlaNOAA") . Rany, byłoby świetnie, gdyby definicja schema.org[Nazwa](https://schema.org/name), w kontekście Dataset, były bardziej szczegółowe. Deweloperzy oprogramowania powinni mieć możliwość napisania wdrożenia specyfikacji w oparciu o samą specyfikację, bez wskazówek ekspertów. Ale odraczam Google (w szczególności Natasza Noy.) , NCEI (w szczególności John Relph) i Roba Fullera.
         
    * Usprawniono: W wyjściach jsonld cztery wartości "spatialCoverage GeoShape box" są teraz minLat minLon maxLat maxLon. Wcześniej pozycje Lat i Lon były odwrócone. Rany, byłoby świetnie, gdyby definicja schema.org[GeoShape](https://schema.org/GeoShape)podano poprawną kolejność. Deweloperzy oprogramowania powinni mieć możliwość napisania wdrożenia specyfikacji w oparciu o samą specyfikację, bez wskazówek ekspertów. Dzięki Natashy Noy i Robowi Fullerowi.

## Wersja 1.82{#version-182} 
 (wydany 2018- 01- 26) 

*    **Nowe funkcje (dla użytkowników) :**   
     
    * Liczne subtelne zmiany w wyglądaniu- i-czućERDDAP™stron internetowych.
        * ULEPSZONE:ERDDAP™teraz używa HTML 5 i lepiej wykorzystuje CSS.
        * Usprawniono: Strony internetowe zostały nieznacznie zmodyfikowane, aby były czystsze i mniej "zajęte". (Są one nadal gęste i są jeszcze rzeczy, na które można narzekać, ale mam nadzieję, że znacznie mniej niż wcześniej.) Dzięki Johnowi Kerfootowi za kilka komentarzy.
        * ULEPSZONE: Strony internetowe wyglądają teraz znacznie lepiej na telefonach komórkowych i innych małych urządzeniach, szczególnie jeśli są używane w orientacji krajobrazu. Wyglądają one również lepiej w bardzo małych i bardzo dużych oknach w przeglądarkach stacjonarnych.
        * ULEPSZONE: W celu poprawy bezpieczeństwa i innych powodów, wykorzystanie Out- of@-@ date wersja Openleyers dlaWMSstrony demonstracyjne zostały zastąpione przezLeaflet.
        * NOWOŚĆ: obsługa podglądów plików graficznych, audio i wideo"files"system (na przykład:[Ten zestaw danych z badań](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/)) oraz.htmlTableodpowiedzi, gdy komórka ma adres URL pliku obrazu, audio lub wideo (na przykład:[wniosek](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22)) . Jeśli unosisz się nad ikoną '?', powinieneś zobaczyć podgląd obrazu, dźwięku lub pliku wideo. Możesz również kliknąć na link do pliku, aby wyświetlić plik na pełnym ekranie przeglądarki. Patrz[Dokumentacja plików multimedialnych](/docs/server-admin/datasets#media-files). Zauważ, że różne przeglądarki obsługują różne typy plików, więc przykłady mogą nie działać w Twojej przeglądarce.
Dzięki tym osobom / odnośnikom dla pomysłów i kodu próbki dla CSS- tylko podpowiedzi (był w https://codepen.io/electricalbah/pen/eJRLVd ) i odroczone wczytywanie obrazu (był w https://varvy.com/pagespeed/defer-images.html )   (chociaż kod został zmodyfikowany przed użyciem wERDDAP) .
Dzięki Cara Wilson, Matthew Austin i Adamowi Shepherdowi / BCO- DMO za prośby o wsparcie obrazu.
Dzięki Jimowi Potemrze, Rich Signellowi, OOI i Carrie Wall Bell za prośby o wsparcie plików audio / hydrophone.
Dzięki OOI za pokazanie potrzeby wsparcia wideo.
        * NOWOŚĆ: Podzbiór danych z dowolnegoERDDAP™zbiór danych (ale zazwyczaj zestaw danych z plików audio) może być teraz zapisane w pliku audio .wav. ([dokumentacja](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav)) Dzięki Jimowi Potemrze, Rich Signellowi, OOI i Carrie Wall Bell za prośby o wsparcie plików audio / hydrophone.
        * ULEPSZONE: Format folderów internetowych (WAF)   (np. / pliki / foldery) został zaktualizowany, aby korzystać z tabeli HTML. Nowy format naśladuje nowszą wersję katalogu z listą stron internetowych stworzoną przez nowsze wersje Apache. Ludzie stwierdzą, że zmiany ułatwiają odczytanie informacji. Oprogramowanie, które obsługuje te dokumenty (np. oprogramowanie zbierające dokumenty ISO 19115 zERDDAP) będzie musiał zostać zmieniony, ale nowy format będzie łatwiej interpretować niż poprzedni format. (Uwaga, Anna Milan.) 
        * NOWAoutOfDateDatasets.htmlstrona. ([przykład](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) Ta strona pokazuje tabelę ze wszystkimi zbiorami danych w czasie rzeczywistym, które mają&lt;testOutOfDate&gt; tag (zob. poniżej) , w rankingu według tego jak nieaktualne są zbiory danych. Ta deska rozdzielcza powinna być przydatna dlaERDDAP™administratorzy i użytkownicy końcowi, gdy chcą wiedzieć, które zbiory danych są nieaktualne. W przypadku zbiorów danych poza terminem, istnieje prawdopodobnie problem ze źródłem danych, tak żeERDDAP™nie jest w stanie zobaczyć / uzyskać danych z ostatnich punktów czasowych.
Administratorzy: Jeśli nie chcesz strony z datami Out- Of- Date, dodaj to do setup.xml:
            &lt;outOfDateDatasetsActive &gt; false&lt;/ outOfDateDatasetsActive &gt;
Teraz są.testOutOfDatei na zewnątrz OfDate kolumn wallDatasetszestaw danych.
Dzięki Bobowi Simonsowi, który pragnął tego od lat, i sprytnym ludziom z irlandzkiego Instytutu Morskiego, którzy dali mi inspirację poprzez swoje dedykowane Malina Pi i monitor, który zawsze pokazuje taki ekran w swoim biurze.
        * ULEPSZONE:.htmlTableoraz.xhtmlReakcja jest teraz lepiej sformatowana, bardziej kompaktowa, a tym samym szybciej załadować. Dzięki HTML5 i CSS.
    * NOWY typ pliku wyjściowego dla zbiorów danych griddap: .timeGaps. Pokazuje on listę luk w wartościach czasowych, które są większe niż średnia luka. ([przykład](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps)) Jest to przydatne dlaERDDAP™administratorzy i użytkownicy końcowi, jeśli chcą wiedzieć, czy istnieją nieoczekiwane luki w wartościach czasowych dla zbioru danych, który ma regularnie rozłożone wartości czasowe. Dzięki Bobowi Simonsowi i Royowi Mendelssohnowi, którzy potrzebowali tej funkcji.
    * Usprawniono: Domyślny wykres dlaallDatasetsdataset jest teraz mapą z x = maxLon i y = maxLat. Dzięki Johnowi Kerfootowi, Rich Signellowi i OOI-CI.
    * NOWOŚĆ:[erddapy](https://github.com/ioos/erddapy)- nie jestERDDAP™funkcja, ale będzie interesujące dla wieluERDDAP™użytkowników. Erddapy (ERDDAP™+Python) jestPythonbiblioteka stworzona przez Filipe Fernandes, która "wykorzystujeERDDAPjestRESTfulusług internetowych i tworzyERDDAP™URL dla każdej prośby, takich jak wyszukiwanie zbiorów danych, pozyskiwanie metadanych, pobieranie danych itp ". Dzięki Filipe Fernandes.
    * Powinienem wspomnieć wcześniej: Istnieje pakiet trzeciej partii R zaprojektowany, aby ułatwić pracę zERDDAP™od wewnątrz R:[rerddap](https://github.com/ropensci/rerddap#rerddap). Dzięki[rOpenSci](https://ropensci.org/)i Roy Mendelssohn.
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:**   
     
    * TO DO: W setup.xml, tuż poniżej&lt;adminInstitution &gt;, proszę dodać&lt;adminInstitutionUrl &gt; tag, który określa adres URL dla Twojej instytucji (lub grupa) .
    * DO: Te 3 tagi w setup.xml nie są już używane:
        &lt;start HeadHtml &gt;,&lt;startBodyHtml &gt; oraz&lt;endbodyHtml &gt;. Zastępuje się je
        &lt;startHeadHtml5 &gt;,&lt;startBodyHtml5 &gt; oraz&lt;endBodyHtml5 &gt;, które mają wartości domyślne określone w messages.xml (i przedstawione poniżej) .
        
Polecamy użycie domyślnej&lt;startHeadHtml5 &gt; oraz&lt;endBodyHtml5 &gt;.
Zalecamy: Jeśli dokonałeś zmian w oryginale&lt;startBodyHtml &gt; i / lub chcesz dostosować swójERDDAP™Teraz, proszę skopiować nowy&lt;startBodyHtml5 &gt; tag (od dołu) do setup.xml i zmodyfikować go, aby dostosować swojeERDDAP™Więc...ERDDAPstrony internetowe odzwierciedlają organizację, nieNOAA ERD. W szczególności, proszę zmienić "Sprowadzony przez" do organizacji (s) . Jeśli potrzebujesz pomocy, proszę wysłać e-mailerd.data at noaa.gov. (Jeśli nie chcesz dostosowaćERDDAP™teraz, użyj domyślnej&lt;startBodyHtml5 &gt;)
        
Następnie usuń 3 stare znaczniki w setup.xml, które nie są już używane.

```
        <startBodyHtml5><!\\[CDATA\\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \\]\\]></startBodyHtml5>
```

Istnieją dodatkowe sposoby, aby[DostosujERDDAP™](/docs/server-admin/deploy-install#customize)więcERDDAPstron internetowych odzwierciedla swoją organizację zamiastNOAA ERD.
        
    * DO:&lt;EDDGrid... Przykład & gt; tagi (zaczynając od&lt;EDDGridIdPrzykład & gt;) oraz&lt;EDDTable... Przykład & gt; tagów (zaczynając od&lt;EDDTableIdPrzykład & gt;) w pliku setup.xml są używane do tworzenia przykładów w griddap itabledapdokumentację. stron internetowych html w TwoimERDDAP.
        
Jeśli nie dostosowałeś tych znaczników, usuń je ze swojego pliku setup.xml. Teraz wszystkie one mają domyślne w messages.xml, które odnoszą się do zbiorów danych w BobERDDAP™at https://coastwatch.pfeg.noaa.gov/erddap/index.html . Więc nie musisz już mieć konkretnych zbiorów danych w swoimERDDAP. Jeśli chcesz nadpisać domyślne wartości, skopiuj niektóre lub wszystkie znaczniki do setup.xml i zmień ich wartości.
Jeśli chcesz, aby przykłady wskazują naERDDAP™, najprostszą metodą jest:
        
        1. Dołącz te dwa zestawy danych do swojegoERDDAP™przez dodanie tego dodatasets.xml:
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Dodaj ten znacznik do setup.xml, ale zmień adres URLERDDAPjest (https?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Jeśli nie dostosować te tagi, zostawić je jak jest i proszę dodać te 2 nowe tagi do setup.xml, aby określićERDDAP™URL dla tych zbiorów danych, ale zmień URL na TwójERDDAPjest (https?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * TO DO:ERDDAP™teraz używa pliku css o nazwie erddap2.cs. Jeśli wprowadziłeś zmiany\\[tomcat\\]/ webapps / erddap / images / erddap.css, rozważ wprowadzenie podobnych zmian do erddap2.css (w tym samym katalogu) .
    * NOWOŚĆ:ERDDAPstrony internetowe mają teraz wiele prawie niewidocznych linków wewnętrznych (tekst jest czarny i nie jest podkreślony) . Jeśli będziesz wisieć nad jednym z tych linków (zazwyczaj kilka pierwszych słów nagłówków i akapitów) , kursor staje się ręką. Jeśli klikniesz na link, URL jest wewnętrznym linkiem do tej sekcji dokumentu. Ułatwia to nawiązanie do konkretnych części dokumentacji. Dzięki Bobowi Simonsowi, który chciał tego od lat.
    * NOWOŚĆ:ERDDAP™teraz obsługuje[Zakres bajtów / zakres odbioru](https://en.wikipedia.org/wiki/Byte_serving)żądania dotyczące części / plików / plików. To było potrzebne do wsparcia widzów audio i wideo w przeglądarkach.
    * DO: Teraz, aby poprawić bezpieczeństwo, jeśli określono&lt;baseHttpsUrl &gt; w setup.xml (a tym samym wsparciehttps) , zalecana flaga Url jesthttpsURL z bezpieczniejszym flagKey. Jeśli tak, wszelkie poprzednie flagUrls / flagKeys staną się nieważne. Podawanie: Jeśli te zmiany dotycząERDDAP™i jeśli u pacjenta występujeERDDAP™maEDDGridFromErddap i EDDTable FromErddap 's, że subskrypcja do zdalnegoERDDAPs, następnie, po aktualizacjiERDDAP-ERDDAP™będzie automatycznie spróbować zapisać się z nowym flagUrl, więc należy usunąć stare subskrypcje i potwierdzić nowe subskrypcje po otrzymaniu nowych e-maili walidacji subskrypcji.
    * DO: jeśli u pacjenta występujeERDDAP™maEDDGridZestawy danych FromErddap dla zbiorów danych erdVH3 na straży przybrzeżnej BobaERDDAP™, proszę je zmienić, aby odnieść się do nowych zbiorów danych erdVH2018.
    * DO: Jeśli zamieścisz którekolwiek z przykładowych zbiorów danych jplaAquariusSSS w swoimERDDAP™, proszę zmienić "V4" wdatasetID"V5".
    * TO DO:actual\\_rangejest teraz standardowym atrybutem CF (CF- 1,7) i wyraźnie mówi, że jeśli zmienna używaadd\\_offsetlubscale\\_factordo pakowania wartości danych, a następnieactual\\_rangewartości powinny być używane typu niezapakowanych danych i powinny być niezapakowane. Niestety jest to sprzeczne z naszą poprzednią radą. GenerateDatasets Xml teraz rozpakowuje opakowaniaactual\\_rangewartości, ale to nie naprawi istniejących zbiorów danych w Twoimdatasets.xmlplik.
        
Tak więc, proszę sprawdzić swoje zbiory danych: jeśli wartości zmiennej są zapakowane i jeśliactual\\_rangejest określone jako spakowane wartości danych, należy dodać&lt;addAttributes&gt;actual\\_rangewartość określająca wartości niezapakowane. W przeciwnym razie zbiór danych nie zostanie załadowanyERDDAP. Prosty i prawie idealny sposób, aby to zrobić jest przeszukaniedatasets.xmldla źródła Atrybuty
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
orazscale\\_factorinne niż 1, 0. To są...actual\\_rangeatrybuty, które być może będziesz musiał naprawić.
        
Dla zmiennych osi wEDDGridzestawów danych,ERDDAP™zawsze ustawiaactual\\_rangeatrybut jest rzeczywistym zakresem wartości, ponieważ zna te wartości.
        
Dla zmiennych osi o wartościach malejących (np. niektóre zmienne szerokości geograficznej) ,ERDDAP™createdactual\\_rangez\\[0\\]...\\[ostatni\\]wartości, które były wysokie... niskie. Teraz zawsze używa niskich... wysokich wartości do nowej definicji CF.
        
Poprawnośćactual\\_rangewartości są szczególnie ważne dla zbiorów danych EDDTable, ponieważERDDAP™szybko odrzuci żądania użytkowników dotyczące wartości danych, które są mniejsze niżactual\\_rangewartość minimalna lub większa niżactual\\_rangewartość maksymalna.
        
Powiązane: rzeczywisty\\ _ min, rzeczywisty\\ _ max,data\\_minorazdata\\_maxAtrybuty są teraz przestarzałe. Proszę przekonwertować swoje zbiory danych do użyciaactual\\_rangeZamiast tego.
        
    * DO ZROBIENIA (opcjonalne, ale zalecane) : Dla każdego najbliższego czasu rzeczywistego i prognozowanego zbioru danych w TwoimERDDAP™, proszę dodać [&lt;testOutOfDate&gt;] (/ docs / server- admin / datasets # testoutofdate) tag z wartością w formienow-_ nUnits _, np.,now-2 dni. Jeżeli maksymalna wartość czasu dla zbioru danych jest starsza od tej wartości, zbiór danych jest uznawany za nieobowiązkowy i zostanie oznaczony jako taki na[outOfDateDatasets.html](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)strona internetowa. Zapewnia to łatwy sposób, aby zobaczyć, kiedy coś jest nie tak ze źródłem zbioru danych.
    *   [NOWOŚĆ: Semantyczny markup danych z json- ld (JSON Dane powiązane) ](/docs/server-admin/additional-information#json-ld)  
        ERDDAP™teraz używa[json- ld (JSON Dane powiązane) ](https://json-ld.org)aby twój katalog danych i zbiory danych były częścią[web semantyczny](https://en.wikipedia.org/wiki/Semantic_Web), co jest pomysłem Tima Bernersa-Lee, aby treści internetowe bardziej czytelne i maszyny "zrozumiałe". Silniki poszukiwawcze ([W szczególności Google](https://developers.google.com/search/docs/data-types/datasets)) i inne narzędzia semantyczne mogą wykorzystać tę strukturalną marżę, aby ułatwić odkrywanie i indeksowanie. Json- ld zorganizowany markup wydaje się niewidzialny - do - ludzi&lt;skrypt &gt; Kod http://.../erddap/info/index.html strona internetowa (który jest web semantyczny[Katalog danych](https://schema.org/DataCatalog)) i na każdy http://.../erddap/info/_datasetID_/index.html strona internetowa (który jest web semantyczny[Zestaw danych](https://schema.org/Dataset)) . (Specjalne podziękowania dla Adama Leadbetter i Roba Fullera z Instytutu Morskiego w Irlandii za wykonywanie trudnych części pracy, aby ta częśćERDDAP.) 
    * NOWOŚĆ: Istnieją nowe typy zbiorów danych, które mogą odczytywać dane z plików audio:
        [EDDGridPliki FromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), który traktuje dane audio jako dane zasłonięte.
        [Pliki EDDTableFromAudioName](/docs/server-admin/datasets#eddfromaudiofiles), który traktuje dane audio jako dane tabelaryczne. Dzięki Jimowi Potemrze, Rich Signellowi, OOI i Carrie Wall Bell za prośby o wsparcie plików audio / hydrophone.
    * Zmiany w generateDatasets Xml (oraz powiązane zmiany) :
        * NOWOŚĆ:ERDDAP™teraz ma system do automatycznego[Aktualizuj adresy URL-of@-@ date](/docs/server-admin/additional-information#out-of-date-urls)zarówno w GenerateDatasets Xml i podczas wczytywania zbiorów danych. Jeśli masz sugestie dla dodatkowych adresów URL, które powinny być złowione i zaktualizowane, lub jeśli uważasz, że powinny być zamienione w usługę (Jak Konwertery) , proszę e-mailerd.data at noaa.gov.
        * NOWOŚĆ: Teraz, jeśli GenerateDatasets Xml widzi CFstandard\\_name  (które powinny być wszystkie małe) z znakiem uppercase, dodaje całą wersję lowercase do&lt;addAttributes&gt;. Również, gdy zestaw danych ładuje, jeśliERDDAP™widzi CFstandard\\_namez wysoką postacią, po cichu zmienia go nastandard\\_name. Dzięki Rich Signellowi.
        * NOWOŚĆ: Teraz, jeśli GenerateDatasets Xml widzi atrybut z czasem, który nie jest w formacie ISO 8601, dodaje czas sformatowany ISO 8601 do&lt;addAttributes&gt;. JeśliERDDAP™nie rozpoznaje formatu, pozostawia wartość czasu bez zmian. Jeśli widzisz format, któryERDDAP™nie rozpoznaje i nie naprawia, proszę wysłać to doerd.data at noaa.gov.
        * Usprawniono: kod niskiego poziomuEDDGridFromThreds Przewodniczący Opcja katalogowa w GenerateDatasets Xml teraz opiera się naUnidatanetcdf- java katalog crawler kod (Trójki. klasy katalogowe) tak, że może obsługiwać wszystkie katalogi THREDDS (które mogą być zaskakująco skomplikowane) . Podziękowania dla Rolanda Schweitzera za zaproponowanie tej zmiany i dziękiUnidataKod.
        * NOWOŚĆ: GenerateDatasets XmlEDDGridFromDap dodaje teraz "startYear- EndYear" do końca tytułu w oparciu o rzeczywiste wartości osi czasu. EndYear = "Present" jeśli dane istnieją w ciągu ostatnich 150 dni.
        * NOWOŚĆ: GenerateDatasets XmlEDDGridFromDap dodaje: "\\[uchwała\\]° "do tytułu, jeżeli zbiór danych jest równomiernie rozłożony i taki sam dla szponów i lonów.
        * Usprawniono: Konwerter czasu ma teraz dodatkowe funkcje, w szczególności zdolność do konwersji czasów strun w wielu różnych wspólnych formatach do łańcuchów ISO 8601 lub do liczby kompatybilnej z UDUNITS. Wszystkie wcześniej obsługiwane funkcje nadal działają, bez zmian.
        * BUG FIX: GenerateDatasets Xml i konwerter słów kluczowych zawierają teraz "Earth Science &gt;" na początku GCMD Science Keywords. Kiedy zestaw danych jest załadowanyERDDAP™,ERDDAP™teraz usuwa wszystkie słowa kluczowe GCMD w atrybucie słowa kluczowe, które nie zaczynają się od "Earth Science &gt;" lub że używają czegoś innego niż przypadek tytułu (gdzie pierwsza litera każdego słowa jest kapitalizowana) .
        * ULEPSZONE: Kiedy sugerujesz&lt;destinationName&gt; 's, GenerateDatasets Xml dla EDDTableFromAsciiFiles właśnie użył końca ogonasourceNamez'/'  (niektóre były filename- jak) . Teraz używa całejsourceName(np. "blahblahblah (m / s)". Ta zmiana będzie dobra dla niektórych zbiorów danych, a nie dla innych, ale jest to bezpieczniejsze zachowanie. Dzięki Maurice 'owi Libesowi.
        * BUG FIX: GenerateDatasets Xml i konstruktorzy zbioru danych zapewniają, że nie ma już podwójnych nazw kolumn. Dzięki Maurice 'owi Libesowi.
        * BUG FIX: GenerateDatasets Xml dla EDDTableFromAsciiFiles nie napisał&lt;ColumnSeparator &gt; do wyjścia. Teraz tak. Dzięki Maurice 'owi Libesowi.
    * NOWOŚĆ: Narzędzie DasDds drukuje teraz informacje o przerwie czasowej (do[Informacje o .timeGaps](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)) jeśli zbiór danych jest zbiorem danych zawiązanych z siatką.
    * NOWOŚĆ: Zaawansowane wyszukiwanie akceptuje teraz wartości czasu "now _\\ -nUnits _". Dzięki Rich Signellowi.
    * ULEPSZONE: W celu poprawy bezpieczeństwa, gdy adres e-mail w metadanych lub danych zbioru danych jest zapisywany na stronie internetowej html, "@" zastępuje się "at". To tylko łapie adresy e-mail, które są całością metadanych lub wartości danych, a nie adresy e-mail wbudowane w dłuższe wartości.
    * Usprawniono: Aby zwiększyć bezpieczeństwo,RSSinformacje dla prywatnych zbiorów danych są teraz dostępne tylko dla użytkowników (orazRSSczytniki) którzy są zalogowani i upoważnieni do korzystania z tego zbioru danych.
    * NOWOŚĆ: Teraz, kiedy zestaw danych jest załadowany, jeślidate\\_created,date\\_issued,date\\_modified, lub data\\ _ metadane\\ _ zmodyfikowany atrybut ma wartość czasu, która nie jest w formacie ISO 8601,ERDDAP™zmienia go na czas sformatowany ISO 8601. JeśliERDDAP™nie rozpoznaje formatu, pozostawia wartość czasu bez zmian. Jeśli widzisz format, któryERDDAP™nie rozpoznaje i nie naprawia, proszę wysłać to doerd.data at noaa.gov.
    * Usprawniono: .dods odpowiedzi zEDDGridZestawy danych powinny być teraz znacznie szybsze. Dzięki Rich Signellowi.
    * Zmiany dotycząceERDDAPtworzenie dokumentów ISO 19115:
        * BUG FIX: przy tworzeniu dokumentów ISO 19115,dataVariableAtrybut HTML nie był zakodowany, a procent zakodowany. Teraz są. Dzięki walidatorowi ISO 19115 NGDC.
        * BUG FIX: przy tworzeniu dokumentów ISO 19115,date\\_createdbył używany jak jest, tak często był zły format. Teraz jest konwertowany na ciąg ISO 8601 Z. Dzięki walidatorowi ISO 19115 NGDC.
        * BUG FIX: przy tworzeniu dokumentów ISO 19115,ERDDAP™teraz dłużej pisze daty z roku = 0000 (jak w zbiorach danych klimatologicznych) , ponieważ schemat ISO 19115 nie dopuszcza dat z rokiem = 0000. Dzięki walidatorowi ISO 19115 NGDC.
    * NOWOŚĆ: Jak przed wnioskiem ohttp... / erddap / version zwróci tylko numer wersji (jako tekst) , np. ",ERDDAP\\ _ version = 1.82 ".
Prośba o...http... / erddap / version\\ _ string zwróci liczbę i opcjonalny przyrostek tekstu '\\ _' plus ASCII (brak spacji lub znaków sterujących) , np. ",ERDDAP\\ _ version\\ _ string = 1.82\\ _ JohnsFork ". Ludzie robiący widelec określi to zmieniając EDStatic.herddapVersion. pl W ten sposób nie powoduje problemów dla poprzednich wersjiERDDAP. Dzięki Axiom (w szczególności Kyle Wilcox) oraz irlandzki Instytut Morski (w szczególności Rob Fuller) .
    * BUG FIX: Dla wersji Wms = 1.3.0, żądanie =GetMap, crs = EPSG: 4326 (nie CRS: 84) wnioski: zamówienie bbox musi być minLat, minLon, maxLat, maxLon. W przypadku CRS: 84 wnioski, jak wcześniej, zamówienie bbox musi być minLon, minLat, maxLon, maxLat. To może naprawić za pomocąERDDAPjestWMS1.3.0 usługi wArcGIS  (dzięki Paola Arce) . Dzięki. (nie) doOGCza to, że to tak skomplikowało. DziękiLeafletza prawidłowe postępowanie z tym i za danie mi sposobu na przetestowanie tego.
    * POPRAWA: Poprzedni, sugerowany linkRSSi e-mail subskrypcje mahttpURL dla TwojegoERDDAP. Teraz jesthttpsURL, jeśli jest aktywny.
    * NOWOŚĆ:EDDGridKopiuj teraz obsługuje opcjonalny znacznik&lt;onlySince &gt; _ someValue _&lt;/ onlySince &gt;, gdzie wartością jest określony czas sformatowany ISO- 8601lubnow-nUnits (np.,now-2 lata) Czas. Patrz[Tylko Od czasu dokumentacji](/docs/server-admin/datasets#onlysince). Dzięki Drew P.
    * ULEPSZONE: Jeśli dostępne,ERDDAP™pokażehttpsURL (z&lt;BaseHttpsUrl &gt;, jeśli dostępne) zamiasthttpURL, gdy wyświetla użytkownikom adres URL, aby dodać / potwierdzić / usunąć / wymienić subskrypcję.
    * BUG FIX:ERDDAP™teraz pozwala na akcję subskrypcji zacząć od " https://" . (Bob uderza się w czoło.) Dzięki Jennifer Sevadjian.
    * BUG FIX:.jsonlKVPteraz używa ':' pomiędzy każdym kluczem a wartością, zamiast'='. (Bob uderza się w czoło.) Dzięki Alexandrowi Barthowi.
    * BUG FIX: Poprzednio, jeśli ponownie zacząłeśERDDAP™z quickRestart = true, i jeśli, przed przeładowaniem zestawu danych normalnie, wykonałeś połączenie do EDDTableFromFiles dataset, który używał updateEveryNMillis, a jeśli plik danych został właśnie zmieniony, żądanie nie powiodło się z błędem wskaźnika null. Teraz prośba się powiedzie. Dzięki Johnowi Kerfootowi.
    * NOWOŚĆ: Kiedy zestaw danych jest załadowanyERDDAP™, słowa kluczowe są teraz przegrupowane w sortowane porządku i wszelkie znaki nowej linii są usuwane.
    * Teraz, jeśli .geoJson,.jsonlub.ncoJson wniosek.jsonParametr p, typ odpowiedzi mime to application / javascript. Zauważ, że.jsonp nie jest obsługiwany dla.jsonlCSVlub.jsonlKVPPonieważ to by nie zadziałało. Dzięki Robowi Fullerowi.
    * Ulepszone: Typ mime dla opcji plików linii json Typ jest teraz "aplikacji / x-jsonlines". To była aplikacja / jsonl. Obecnie nie ma ostatecznego właściwego wyboru.
    * ULEPSZONE: Liczba nieudanych wniosków wyświetlanych na stronie status.html wzrośnie, ponieważ więcej rzeczy jest liczonych jako niepowodzenia niż wcześniej, np. ClientAbortException.
    * ULEPSZONE: Teraz, jeśli odpowiedź odERDDAP™nie jest skompresowane, wtedy nagłówek odpowiedzi będzie zawierał "Content- Encoding" = "identity".
    * Ulepszone: Atrybut "licencja" nie był wymagany. Teraz, jeśli nie jest określone, Standard License z messages.xml (lub z setup.xml, jeśli występuje) jest używany jako domyślny.
    * NOWOŚĆ: Teraz istnieje opcja[atrybut fileAccessSuffix](/docs/server-admin/datasets#fileaccessbaseurl). które mogą być stosowane z istniejącym[atrybut fileAccessBaseUrl](/docs/server-admin/datasets#fileaccessbaseurl).
    * ULEPSZONE: Aby zwiększyć bezpieczeństwo, wersja ta została skompilowana z najnowszymJavaJDK v8u162.
    * NOWOŚĆ: Aby zwiększyć bezpieczeństwo, kilka wspólnych domen, które oferują tymczasowe adresy e-mail (np. @ mailinator.com) są teraz na stałej czarnej liście e-mail dla systemu subskrypcji.
    * NOWOŚĆ: Aby zwiększyć bezpieczeństwo, w sprawozdaniu dziennym zawarte są obecnie:
SetDataset Flaga Adres IP nie powiódł się (od ostatniego raportu dziennego)   
SetDataset Flaga Adres IP nie powiódł się (od rozpoczęcia)   
SetDataset Poprawiony adres IP flagi (od ostatniego raportu dziennego)   
SetDataset Poprawiony adres IP flagi (od rozpoczęcia)   
"Failed" tallies let you see who (haker?) próbuje ustawić flagę, ale zawodzi.
    * Usprawniono: Aby zwiększyć bezpieczeństwo, adresy e-mail w&lt;subscriptionEmailBlacklist &gt; w Twoimdatasets.xmlsą teraz uważane za nieczułe.
         

## Wersja 1.80{#version-180} 
 (wydany 2017- 08- 04) 

*    **Nowe funkcje (dla użytkowników) :**   
     
    * NOWAorderByCount () filtr pozwala określić, jak tabela wyników będzie sortowana (lub nie) i po prostu zwraca jeden wiersz dla każdej grupy sortowej, z licznikiem liczby wartości niezbłąkanych dla każdej zmiennej.
Na przykład:orderByCount ("stationID") będzie sortowaćstationIDi zwrócić jeden wiersz dla każdegostationID, z licznikiem liczby wartości niemylących dla każdej zmiennej.
Jeśli po prostu określićorderByCount ("") , odpowiedź będzie tylko jeden wiersz z liczbą wartości niemylących dla każdej zmiennej danych.
Patrz[orderBy... dokumentacja](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy)Dzięki Benowi Adamsowi.
    * NOWA.ncplik oJson Opcja typu dla zestawów danych w siatkach i tabelach. Ta opcja sprawia, żeNCOlvl = 2 "pedantyczny" plik JSON ze wszystkimi informacjami zwykle znajdującymi się w.ncplik. Patrz[ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json)Dzięki Charlie Zenderowi.
    * BUG FIX: WorderBy... () opcje na stronie Make A Graph są teraz obsługiwane poprawnie.
    * Wyjście .geoJson nie drukuje wierszy, w których brakuje wartości latu lub lonu. Ponadto wartości wysokości (jeżeli jest dostępny) są teraz włączone do współrzędnych, nie jako wartości danych. Dzięki Jonathanowi Wilkinsowi.
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:**   
     
    * / Biblioteka protocoless.js używana doOpenLayersdemo na tematWMSstronyERDDAP™jest out- of- date i ma błąd, który potencjalnie pozwala na jego nadużywanie. (Niestety, aktualizacjaOpenLayersi protokoły. JS nie jest łatwe.) To otwiera możliwość, że biblioteka może zostać utworzona, aby umożliwić krzyżową wrażliwość. Jednakże odERDDAP™Tylko zastosowaniaOpenLayersw określony sposób pre- set- up i tylko ze specyficznymERDDAP-oparte źródła danych, uważamy, że nie ma podatności krzyżowej wERDDAPKorzystanie zOpenLayersi protocolus.js. Jednak, jeśli w to nie wierzysz, można teraz wyłączyć korzystanie zOpenLayersdemo na tematWMSstronyERDDAP™przez dodanie
```
        <openLayersActive>false</openLayersActive>  
```
do pliku setup.xml. Domyślnie jest "true". Dzięki Charlesowi Carletonowi i NCEI.
    * ZMIANY BEZPIECZEŃSTWA: Nieużywane pliki .jar i duplikaty plików .jar (ponieważ są one również w netcdfAll.jar) zostały usunięte zERDDAP™dystrybucji. Pliki Out- of- date .jar zostały zaktualizowane. Dzięki Charlesowi Carletonowi i NCEI.
    * ZMIANY BEZPIECZEŃSTWA: Plik netcdfAll.jar dystrybuowany zERDDAP™jest najnowszą wersją (obecnie 4.6.10) , ale nadal zawiera wewnętrzne pliki jackson .jar, które są znane jako nieaktualne i mają słabości bezpieczeństwa, w szczególności biblioteki Jacksona, które są używane tylko przy dostępie do źródeł danych Amazon S3. Jeżeli nie masz dostępu do danych przez Amazon S3 (Wiedziałbyś, gdybyś był) , te słabości nie są istotne.
        
Deweloperzy netcdf- java utrzymują, że te luki nie są istotne ze względu na sposób, w jaki kod netcdf korzysta z tych bibliotek i w każdym razie byłyby istotne tylko w przypadku dostępu do Amazon S3. Patrz[ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866). Wierzę im. Jeśli nadal masz obawy dotyczące tego, prosimy o kontakt z deweloperami netcdf- java. (Zauważ, że jeśli nie wierzysz deweloperom netcdf- java i nie rozważasz użyciaERDDAP™z tego powodu, nie należy używać również THREDDS, ponieważ THREDDS używa netcdf- java bardziej fundamentalnie i szerzej niżERDDAP.) 
        
Szczegóły: Trudny kod i ostrzeżenia o podatności są następujące:
netcdfAll- latest.jar / META- INF / maven / com.fasterxml.jackson.core / jackson- datalind / pom.xml
Patrz https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Wysoki
netcdfAll- latest.jar / META- INF / maven / com.fasterxml.jackson.dataformat / jackson- dataformat- cbor / pom.xml
Patrz https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Wysoki
netcdfAll- latest.jar / META- INF / maven / com.fasterxml.jackson.core / jackson- adnotations / pom.xml
Patrz https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Wysoki
Patrz https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Krytyczne
netcdfAll- latest.jar / META- INF / maven / com.fasterxml.jackson.core / jackson- core / pom.xml
Patrz https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Wysoki
Patrz https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Krytyczne
"Dla wersji 4.6.10, aws- java- sdk- core ciągnie w wersji 2.6.6 jackson-\\ * artefakty". (e-mail od netcdf- java people) .
Dzięki Charlesowi Carletonowi i NCEI.
        
    * ZMIANY PRZEDSIĘBIORSTW: Jeśli ponownie kompilujeszERDDAP™, zauważyć, że parametr -cp classpath potrzebny dla linii poleceń jest teraz znacznie krótszy niż wcześniej. Zobacz nowe ustawienie -cp w[ta dokumentacja](/docs/contributing/programmer-guide#development-environment). Dzięki Charlesowi Carletonowi i NCEI.
    * NOWA OPCJA W GenerateDatasetach Xml: EDDTableFromBcodmo, przeznaczony tylko do użytku wewnętrznego w BCO- DMO.
Dzięki Adamowi Shepherdowi i BCODMO.
    * NOWA ATRYBUTA I FEATURA: Jeśli kolumna EDDTable posiada nazwy plików dostępnych w sieci (np. pliki obrazkowe, wideo lub audio) , możesz dodać
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
aby określić bazowy adres URL (kończąc na /) konieczne do przekształcenia nazw plików w kompletne adresy URL. Następnie.htmlTableodpowiedzi,ERDDAP™pokaże nazwę pliku jako link do połączonego adresu URL (podstawa Url plus nazwa pliku) .
Jeśli chceszERDDAP™do obsługi powiązanych plików, zrobić oddzielny zestaw danych EDDTableFromFileNames dla tych plików (może to być prywatny zestaw danych) .
Dzięki Adamowi Shepherdowi i BCODMO.
    * NOWE ZALECENIE DOTYCZĄCE WSTRZYKIWAŃ: Jeżeli kolumna EDDTable posiada nazwy plików dostępnych w Internecie (np. pliki obrazkowe, wideo lub audio) które są dostępne przez archiwum (np.,.zipplik) dostępne za pośrednictwem URL, użyj
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
aby określić adres URL archiwum.
Jeśli chceszERDDAP™Aby służyć plikowi archiwum, należy utworzyć oddzielny zestaw danych EDDTableFromFileNames dla tego pliku (może to być prywatny zestaw danych) .
Dzięki Adamowi Shepherdowi i BCODMO.
    * ULEPSZENIA GenerateDatasetów Xml w celu usunięcia przyczyn nieprawidłowej / złej&lt;subsetVariables&gt; sugestie i duplikaty / złe sugerowane nazwy zmiennych, itp. Dzięki Rich Signellowi, Adamowi Shepherdowi i BCO- DMO.
    * NOWE OPCJA: Informacje o granicach politycznychERDDAPpochodzi od osoby trzeciej i jest nieco nieaktualna. Istnieją również sporne granice w kilku miejscach na świecie, gdzie różni ludzie będą mieli różne pomysły na to, co jest słuszne. Nie mamy pewności co do odpowiedniości politycznych danych boundary, które pochodzą zERDDAP. Jeśli nie podoba Ci się polityczna informacja, która pochodzi zERDDAP™Możesz powiedziećERDDAP™nigdy nie rysować granic politycznych poprzez dodanie
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
do pliku setup.xml. Domyślnie jest "true". Dzięki Raju Devenderowi.
    * NOWY TAG METADATA: Wdatasets.xmldla zbioru danych, możesz teraz podać domyślną liczbę kolorów Kształtowniki prętówdataVariablena wykresach i mapach
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (domyślny = -1, który mówi, aby pozwolićERDDAP™Decyzja) . Patrz[kolor Ustawienia paska](/docs/server-admin/datasets#color-bar-attributes).
    * ULEPSZONE: kolor granic stanu na mapach był fioletowy (Deep Purple for you Baby Boomers) . Teraz jest szary. (między granicami kraju szary i ziemi szary) .
    * BUG FIX:&lt;iso19115Plik &gt; oraz&lt;fgdcFile &gt; indatasets.xmlnie zawsze były obsługiwane prawidłowo. Teraz są. Dzięki BCO- DMO.

## Wersja 1.78{#version-178} 
 (wydany 2017- 05- 27) 

*    **Nowe funkcje (dla użytkowników) :**   
     
    *    (brak)   
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:**   
     
    * Usprawniono: Kolejność linii w "Major LoadDatasets Time Series" na stronie status.html jest teraz najnowsza na górze do najstarszych na dole.
    * BUG FIX:ERDDAP™Teraz pisze.nccsvpliki ze zmienną czasowąactual\\_rangejako czas String ISO- 8601. To naprawia błąd za pomocą EDDTableFromErddap parsing info from a remote dataset and from the quickly Restart file for all EDDTableFrom... Files datasets. (The timeactual\\_rangebędzie błędny przy pierwszym załadowaniu zbioru danych w v1.78, ale poprawny po ponownym załadowaniu, np., jeśli zaznaczysz zbiór danych.) 

## Wersja 1.76{#version-176} 
 (wydany 2017- 05- 12) 

*    **Nowe funkcje (dla użytkowników) :**   
     
    * ZMIANA W Tomcat: W przypadku wnioskówERDDAP™pochodzące z oprogramowania innego niż przeglądarki internetowe (np.,curlR,Matlab,Python,Java) :
Podobnie jak w poprzednich wersjach Tomcat (oprogramowanie niskiego poziomu, które działaERDDAP) od początku 2016 r., coraz więcej znaków w części zapytania URL żądania musi być[ **Procent zakodowany** ](/docs/server-admin/datasets#infourl)ze względów bezpieczeństwa. Przeglądarki zajmują się procentowym kodowaniem. więc przy użyciuERDDAP™w przeglądarce nie ma wpływu, chyba że żądanie zostanie przekierowane do innegoERDDAP.
    * Poprzednio:ERDDAP™leczonych **Zmienne znaków** bardziej jak niepodpisane krótkie liczby całkowite niż znaki. Teraz traktuje je bardziej jak 1- charakterystyczny UCS-2 (Unicode) Strings. Patrz[dokumentacja czara](/docs/server-admin/datasets#char). Dzięki Aurelie Briand i projektowi Argo.
    * Poprzednio:ERDDAP™oferowane niewielkie wsparcie dla **Znaki Unicode** powyżej znaku # 255 w Strings. Teraz, wewnętrznie,ERDDAP™w pełni obsługuje 2- bajtowe znaki UCS-2 (znaki ponumerowane od 0 do 65535) w Strings. Kiedy dane String są zapisywane do różnych typów plików,ERDDAP™robi co w jego mocy, aby wspierać 2- bajtowe znaki. Innym przykładem są pliki .csv, któreERDDAP™pisze za pomocą zestawu znaków ISO- 8859-1 (1-bajtowy zestaw znaków) , więcERDDAP™writs any characters above character # 255 with the JSON- like\\ u _ hhhh _ syntax. Patrz[Dane strunowe](/docs/server-admin/datasets#string).
    * POPRAWA: W.ncplików napisanych przezERDDAP™, Chars zmienne do interpretacji jako Strings będą miały atrybut
         **\\ _ Kodowanie = ISO- 8859-1**   
W.ncpliki odczytane przezERDDAP™Zmienne char z "\\ _ Encoding" będą interpretowane jako Strings z określonym znakiem.
    * Reminder:ERDDAP™wsparcie **JSON- like backslash- encoding** znaków specjalnych, gdy określasz ograniczenia zmiennych znaków znaków znaków i znaków string. Tak więc możesz poprosić o coś takiego jak & myString = "\\ u20ac" kiedy chcesz wierszy danych, gdzie myString = €od 20ac jest szesnastkową wersją punktu kodu dla symbolu Euro. Kilka źródeł w sieci pokazuje numery punktów kodowych symboli Unicode, np.:[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode).
    * Poprzednio:ERDDAP™oferowane ograniczone wsparcie dla **liczba całkowita** zmienne. Teraz.ERDDAP™w pełni obsługuje długów wewnętrznie i robi to najlepiej podczas zapisywania długich danych do różnych typów plików. Patrz[długa dokumentacja](/docs/server-admin/datasets#long). Dzięki irlandzkiemu Instytutowi Morskiemu, Craig Risien, Rich Signell, Christopher Wingard i OOI.
    * NOWOŚĆ: typ pliku wyjściowego dla griddap itabledap: **.nccsv** co sprawia, żeNetCDF-like, ASCII, plik CSV, który zawiera również wszystkie metadane, które byłyby w porównywalnym.ncplik. Patrz[NCSSV Opis](/docs/user/nccsv-1.00). Dzięki Steve 'owi Hankinowi.
    * NOWOŚĆ: **orderByClosestfiltr** pozwala określić sposób sortowania tabeli wyników i interwał (np. 2 godziny) . W obrębie każdej grupy sortowej przechowywane będą tylko wiersze najbliższe interwałowi. Na przykład:orderByClosest ("stationID, czas, 2 godziny ") będzie sortowaćstationIDi czas, ale tylko zwrócić wiersze dla każdegostationIDgdzie ostatniorderBykolumna (czas) w odstępach 2 godzin. To najbliżej.tabledapdo kroczenia wartości w żądaniu griddap. Ta opcja może być określona za pomocą dowolnegotabledapstrona dataset .html, strona .graph i przez dowolny adres URL, który sam generujesz. Dzięki irlandzkiemu Instytutowi Morskiemu i Sieci Oceanu w Kanadzie.
    * NOWOŚĆ: **orderByLimitfiltr** pozwala określić, w jaki sposób tabela wyników zostanie posortowana i numer limitu (np. 100) . W ramach każdej grupy sortowej zachowane będą tylko pierwsze wiersze "limit". Na przykład:orderByMax ("stationID100 ") będzie sortowaćstationID, ale tylko zwrócić pierwsze 100 wierszy dla każdegostationID. Jest to podobne do klauzuli LIMIT SQL. Ta opcja może być określona za pomocą dowolnegotabledapstrona dataset .html, strona .graph i przez dowolny adres URL, który sam generujesz. Dzięki irlandzkiemu Instytutowi Morskiemu i Sieci Oceanu w Kanadzie.
    * NOWOŚĆ: Dwa nowe typy plików odpowiedzi, **.jsonlCSVoraz.jsonlKVP** są dostępne dla wniosków o zbiorcze zbiory danych, tabelaryczne zbiory danych i wiele innych miejsc wERDDAP  (np. wnioski o udzielenie informacji o zbiorach danych) . Pliki są plikami JSON Lines ([ https://jsonlines.org/ ](https://jsonlines.org/)) gdzie każda linia ma oddzielny obiekt JSON..jsonlCSVma wartości w formacie CSV..jsonlKVPposiada klucz: Pary wartości. Każda linia jest samodzielna. Linie nie są zamknięte w większej tablicy JSON lub obiektu. Na przykład, zobacz[wniosek dotyczący próby](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z). Dzięki Damianowi Smythowi, Robowi Fullerowi, Adamowi Leadbeterowi i irlandzkiemu Instytutowi Morskiemu.
    * NOWOŚĆ: Istnieje nowa dokumentacja opisująca[ **Jak uzyskać dostęp do prywatnych zbiorów danych wERDDAP™przez skrypty** ](/docs/user/AccessToPrivateDatasets). Dzięki Lynn DeWitt.
    * Usprawniono: Minimalny zakres **OpenLayers** Mapa była 2 stopnie i jest teraz 4 piksele danych. Dzięki Rusty 'emu Hollemanowi.
    * ULEPSZONE: W niektórych wspólnych przypadkach wnioski **wyrażenie regularne** Ograniczenie będzie przetwarzane znacznie szybciej.
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:**   
     
    *    **SLOW first startup:** Po raz pierwszy uruchomisz tę nową wersję, to zajmie dużo czasu dlaERDDAP™do wczytania wszystkich zbiorów danych, ponieważ musi ponownie odczytać wszystkie dane źródłowe (chociaż tylko nagłówek dla plików danych zawiązanych) . Jeśli spojrzycie na logi, możecie zobaczyć komunikaty błędów mówiące "Old / unsupported enhancedVersion" niektórych plików wewnętrznych -- w porządku --ERDDAP™będzie tworzyć nowe wersje plików wewnętrznych. Cierpliwości.
    * DZIAŁANIE:ERDDAP™teraz używa nowego **java.time** klasy (znany również jako JSR 310) zamiast Jody przetworzyć String razy na czasy liczbowe. Uwagi:
        * JeśliERDDAP™nagle ma problemy z parsowaniem czasu String dla danego zbioru danych i w ten sposób po prostu konwertuje większość lub wszystkie razy do NaN (brakujące wartości) , problem jest prawie zawsze z datą Łańcuch formatu czasu, który podałeś jako "jednostki" zmiennej. Nowy system czasem potrzebuje nieco innego łańcucha formatu dateTime.
        * Jeśli numeryczne miesiące i dni w łańcuchach dateTime nie są 0- padded (np. "3 / 7 / 2016") , upewnij się, że format ma tylko jeden M i d (np. "M / d / rrrr", nie "MM / dd / rrrr") .
        * Zmień dowolną specyfikację sekund ułamkowych, która wykorzystuje małe litery s (np. .sss wyyyy-MM-ddNie.) , w kapitał S 's, (np.,yyyy-MM-ddSSS) .
        *   ERDDAP™nie obsługuje już daty łańcucha Formaty czasowe z dwucyfrowymi latami (yy) z dorozumianym stuleciem (np. 1900 lub 2000) . Firmy wydały miliardy dolarów na rozwiązanie tego problemu pod koniec lat 90. Naukowcy nie powinni używać dwucyfrowych lat. Proszę naprawić plik źródłowy (s) przez przeliczenie na 4-cyfrowe lata, a następnie użycie yyyy w dniu Format czasowy.
        * Można użyć yyyy lub YYYY (któreERDDAP™konwertuje na uuuu) do przetwarzania 4-cyfrowych lat, w tym lat ujemnych, np. -4712 (który jest 4713 BC) . Dzięki SeaDataNet, Thomasowi Gardnerowi i BODC.
        * Proszę nadal używać Z w formacie dateTime, aby uzyskaćERDDAPdo przetrawienia czasu (np., Z, + 0200, -08, -0800, -08: 30) .
        *    **Upewnij się, że używaszJavawersja 1.8.0\\ _ 21 lub wyższa.** 
        * Programiści -- Jeśli napiszeszJavauruchomione programyERDDAP™kod, musisz usunąć odniesienie do joda-time. słoik w parametrze ścieżki klasy.
    * NOWOŚĆ:ERDDAPjest[ArchiveA Narzędzie Dataset](/docs/server-admin/additional-information#archiveadataset)może teraz tworzyć[ **Pliki BagitName** ](https://en.wikipedia.org/wiki/BagIt). NCEI może standaryzować w tym formacie. Dzięki Scottowi Cross 'owi i Johnowi Relfowi.
    * ULEPSZONE: Linki do pobrania erddap. wojnyERDDAP™strony internetowe wskazują teraz na **GitHub** . (To publiczne powiązania, więc nie musisz dołączyć do GitHuba.) Oznacza to znacznie szybsze pobieranie (do 12Mb / s w porównaniu z 1Mb / s) i kilka problemów z pobieraniem. Dzięki Damianowi Smythowi, Robowi Fullerowi, Adamowi Leadbeterowi, Conorowi Delaneyowi i irlandzkiemu Instytutowi Morskiemu.
    * POPRAWA: **strona status.html i codzienny raport stanu e-mail** teraz zawiera sekcję "Major LoadDatasets Time Series", która pokazuje statystyki oERDDAP™od końca każdego głównego loadDatets dla ostatnich 100 głównych loadDatets. Dzięki naszemu kłopotliwemu RAID.
    * NOWOŚĆ: nowy, opcjonalny (ale zalecane) parametr dla zbiorów danych EDDTableFromCassandra: [ ** &lt;partytionKeyCSV &gt; ** ] (/ docs / server- admin / datasets # partitionkeycsv) . Dzięki Ocean Networks Canada.
    * NOWOŚĆ: EDDTableFromAsciiFiles obsługuje teraz ** &lt;ColumnSeparator &gt; ** parametr. Jeśli null lub ", klasa będzie zgadywać, jak wcześniej, W przeciwnym razie pierwszy znak będzie używany jako separator kolumn podczas czytania plików. Dzięki Sky Bristol i Abigail Benson.
    * Nowy: nowy typ zbioru danych,[ **Pliki EDDTableFromNccsvName** ](/docs/server-admin/datasets#eddtablefromnccsvfiles), może zrobić zestaw danych poprzez agregację[Pliki NCSSV .csv](/docs/user/nccsv-1.00). Dzięki Steve 'owi Hankinowi.
    * ULEPSZONE: **EDDTableFromErddap** teraz używa.nccsvaby uzyskać informacje ze zdalnegoERDDAPs oraz dla lokalnego archiwum tych danych. Umożliwia to pełne wsparcie dla typów znaków i długich danych oraz dla Unicode (UCS-2) Charset dla znaków i strun. Dzięki Robowi Fullerowi i irlandzkiemu Instytutowi Morskiemu.
    * Usprawniono: EDDTableFromErddap orazEDDGridFromErddap teraz wspierać ** &lt;przekierowanie &gt; false&lt;/ przekierowanie &gt; ** co mówiERDDAP™nigdy nie kierować wniosku do pilotaERDDAP. Domyślnie jest to prawda. Jest to użyteczne, gdy pilotERDDAP™jest prywatnąERDDAP. Dzięki Damianowi Smythowi, Robowi Fullerowi i irlandzkiemu Instytutowi Morskiemu.
    * ULEPSZONE:ERDDAP™teraz połowy **anulowane wnioski użytkowników** Wcześniej. IERDDAP™Teraz zamyka się szybciej, ponieważ niskonapięciowe gwinty zamykają się szybciej. Dzięki naszemu kłopotliwemu RAID.
    *    **GenerateDatasets Xml:** 
        * NOWOŚĆ: Nowy specjalny EDDType "ncdump" drukuje[ncdump](https://linux.die.net/man/1/ncdump)\\ -jak wydruk nagłówka.ncplik. Możesz również wydrukować wartości danych dla określonych zmiennych (lub wprowadzić "nic", aby nie drukować żadnych wartości danych) . Jest to przydatne, ponieważ bez ncdup trudno jest dowiedzieć się, co jest w pliku, a co tym samym EDDType należy określić dla GenerateDatasetsXml. Dzięki Craigowi Risienowi, Rich Signellowi, Christopherowi Wingardowi i OOI.
        * NOWOŚĆ: Dla SeaData Dane netto:
W stosownych przypadkach generateDatasety Xml dokonuje teraz konkretnej konwersji semantycznej przy użyciu zdalnego zapytania SPARQL: jeśli metadane źródłowe zmiennej zawierają sdn\\ _ parametr\\ _ urn, np. sdn\\ _ parametr\\ _ urn = "SDN: P01:: PSLTZZ01", GenerateDatasets Xml doda odpowiedni atrybut P02, np. sdn\\ _ P02\\ _ urn = "SDN: P02:: PSAL". Jeśli masz zbiory danych, które używają tych atrybutów, a jeśliERDDAPjest&lt;categoryAttributes&gt; w setup.xml zawiera sdn\\ _ parametr\\ _ urn i sdn\\ _ P02\\ _ urn, użytkownicy będą mogli używaćERDDAP™System wyszukiwania kategorii do wyszukiwania zbiorów danych o określonych wartościach tych atrybutów. Dzięki BODC i Alexandrze Kokkinaki.
        * Usprawnione: GenerateDatasets Xml teraz zmienia wielehttp://odniesienia w metadanych dohttps://w stosownych przypadkach.
        * Usprawnione: GenerateDatasets Xml próbuje odgadnąć creator\\ _ type i wydawca\\ _ type.
        * Usprawniono: Typy danych zmiennej sugerowane przez GenerateDatasets Xml będzie teraz trochę lepszy. Dzięki Margaret O 'Brien, LTER i EML.
        * Usprawnione: GenerateDatasets Xml jest lepszy w określaniu&lt;cdm\\ _ data\\ _ type & gt; oraz dodanie odpowiednich, wymaganych atrybutów (np.&lt;cdm\\ _ timeseries\\ _ variables & gt;), więc możesz dostarczyć te informacje. Dzięki Rich Signellowi.
        * POPRAWA: W generateDatasetach Xml, dla zbiorów danych EDDTable, sugestia dla&lt;subsetVariables&gt; jest teraz o wiele bardziej konserwatywny. Dzięki Johnowi Kerfootowi.
        * ULEPSZONE: Jeślidatasets.xmldla zbioru danych określafeatureTypeale nie cdm\\ _ data\\ _ type, thefeatureTypebędą używane jako typ cdm\\ _ data\\ _. Dzięki Rich Signellowi.
        * BUG FIX: generować Zestawy danych Xml teraz sugeruje poprawną&lt;dataType &gt; dla zmiennych danych, które mająscale\\_factor,add\\_offseti / lub\\ _ Atrybuty niepodpisane.
    * POPRAWA: KiedyERDDAP™otwiera.ncplik **krótsze** niż powinno być (np. nie został całkowicie skopiowany na miejsce) ,ERDDAP™Teraz traktuje plik jak zły. Poprzednio:ERDDAP™zwracane brakujące wartości dla brakującej części pliku, ponieważ jest to domyślne zachowanie netcdf- java.ERDDAP™teraz używa ucar.nc2.iosp.netcdf3.N3header.disballowFileTruncation = true; Dzięki naszej kłopotliwej RAID i Christian Ward-Garrison.
    * Usprawniono: autor ISO 19115 wykorzystuje teraz **creator\\ _ type** , jeśli jest obecny.
    * ULEPSZONE:ERDDAP™teraz wykorzystuje najnowsze netcdf-java v4.6.9, które mogą odczytać dodatkowe rodzaje **pliki netcdf- 4** . Dzięki Craigowi Risienowi, Rich Signellowi, Christopherowi Wingardowi i OOI.
    * BUG FIX: unikać problemów, jeśli różne pliki źródłowe mają różne typy danych dla danej zmiennej. Dzięki Royowi Mendelssohnowi i Eugene 'owi Burgerowi.
    * BUG FIX: **Konwersja formatu czasu** są teraz lepiej chronione przed złym czasem wartości. Dzięki NDBC.
    * BUG FIX:EDDGridPliki FromNcNiezapakowany teraz obsługuje wartości czasu z **"miesiące od"... i "lata od"...** poprawnie (przez zwiększenie miesiąca lub roku, nie przez surowo dodać np., 30 dni wielokrotnie) . Dzięki Soda 3.3.1
    * BUG FIX: tylko w v1.74, **subskrypcje** wymagane działanie (np.,http://...) co było i powinno być opcjonalne.
    * BUG FIX:EDDGridFromMergeIRFiles.lowGetSourceMetadane () nie dodał żadnych globalnych atrybutów. Teraz tak.
         

## Wersja 1.74{#version-174} 
 (wydany 2016- 10- 07) 

*    **Nowe funkcje (dla użytkowników) :**   
     
    * Teraz, kiedy lista danych (Wszystkie, lub z wyszukiwania) jest wyświetlany na stronie internetowej, długie tytuły są wyświetlane na wielu liniach. Poprzednio, środek długiego tytułu został zastąpiony przez "...". Dzięki Margaret O 'Brien, LTER i EML.
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:**   
     
    * DO: Na komputerach Linuksa, zmień ustawienia czasu Apache tak, aby czasochłonne żądania użytkowników nie miały czasu (co często pojawia się jako błąd "Proxy" lub "Bad Gateway") . Jako użytkownik root:
        
        1. Modyfikuj ApachehttpPlik d.conf (zazwyczaj w / etc /httpd / conf /) :
Zmiana istniejącego&lt;Czas &gt; ustawienie (lub dodać jeden na końcu pliku) Do 3600 (sekund) , zamiast domyślnej 60 lub 120 sekund.
Zmiana istniejącego&lt;ProxyTimeout &gt; ustawienie (lub dodać jeden na końcu pliku) Do 3600 (sekund) , zamiast domyślnej 60 lub 120 sekund.
        2. Przywróć Apache: / usr / sbin / apachectl -k graceful (ale czasami jest w innym katalogu) .
        
Dzięki Thomasowi Oliverowi.
         
    * NOWOŚĆ:\\[bigParentDirectory / hard Katalog flag
Działa to jak katalog flag, ale wersja hardFlag usuwa również wszystkie informacje o zestawie danych. Nie ma adresów URL do ustawiania twardej flagi. Można tego użyć tylko poprzez umieszczenie pliku w tym katalogu.
twarde Flagi są bardzo przydatne, gdy robisz coś, co powoduje zmianę w jaki sposóbERDDAP™odczytuje i interpretuje dane źródłowe, na przykład po zainstalowaniu nowej wersjiERDDAP™lub gdy wprowadziłeś pewne rodzaje zmian do definicji zbioru danych wdatasets.xml. Patrz[ta dokumentacja](/docs/server-admin/additional-information#hard-flag). Dzięki Johnowi Kerfootowi i wszystkim grupom Argo.
         
    * NOWOŚĆ: GenerateDatasets Xml posiada teraz opcję EDDTableFromEML
który czyta opis zbioru danych w języku metadanych ekologicznych (EML) plik, pobiera plik danych i generuje częśćdatasets.xmltak, aby zestaw danych mógł być dodany doERDDAP. Istnieje również EDDTableFromEMLPartii, która robi to samo dla wszystkich plików EML w katalogu. Działa to bardzo dobrze, ponieważ EML doskonale opisuje zbiór danych oraz dlatego, że KNB i LER udostępniają rzeczywiste pliki danych.
EML plusERDDAP™może być świetną kombinacją, ponieważERDDAP™może dać użytkownikom bardziej bezpośredni dostęp do bogactwa danych KNB i LTER i pomóc tym projektom sprostać rządowi USA[Publiczny dostęp do wyników badań (PARR) wymagania](https://nosc.noaa.gov/EDMC/PD.DSP.php)poprzez udostępnienie danych za pośrednictwem usługi internetowej.
Patrz[ta dokumentacja](/docs/server-admin/EDDTableFromEML). Dzięki Margaret O 'Brien, LTER i EML.
         
    * NOWOŚĆ: GenerateDatasets Xml posiada teraz opcję EDDTableFromInPort
który czyta opis zbioru danych w pliku InPort XML i próbuje wygenerować częśćdatasets.xmltak, aby zestaw danych mógł być dodany doERDDAP. Rzadko tworzy to część XML do użycia w trybie ready- to- usedatasets.xml, ale stworzy dobry szorstki szkic, który jest dobrym punktem wyjścia do edycji przez człowieka.
Byłoby wspaniale, gdyby ludzie korzystający z InPort do dokumentowania swoich zbiorów danych również używaliERDDAP™udostępnienie rzeczywistych danych za pośrednictwemERDDAPusług internetowych, a tym samym spełniają rząd USA iNOAAjest[Publiczny dostęp do wyników badań (PARR) wymagania](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research)poprzez udostępnienie danych za pośrednictwem usługi internetowej. Jest to rozwiązanie, które można teraz wykorzystać. (erd.data at noaa.govZ przyjemnością pomogę.)   
Patrz[ta dokumentacja](/docs/server-admin/datasets#eddtablefrominport). Dzięki Evanowi Howellowi i Melanie Abecassis.
         
    * ULEPSZONE:ERDDAP™teraz używa netcdf- java 4.6.6.
Z wcześniejszymi wersjami, netcdf- java przeczytać pewne wartości wypełnienia (być może, tylko w plikach netcdf- 4) 0. Teraz odczytuje niektóre z nich jako standardową wartość wypełnienia netcdf: -127 dla bajtów, -32767 dla szortów, -2147483647 dla intów.UnidataMówi, że nowe zachowanie jest właściwe. Jeśli zmienna w zbiorze danych zaczyna pokazywać jedną z tych wartości, gdzie były używane do wyświetlania 0, można dodać, np.,
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
do zmiennejaddAttributespowiedziećERDDAP™traktować tę wartość jakmissing\\_value/\\ _ Wypełnij Wartość. Jednak w wielu przypadkach, że nie przyniesie pożądany wynik: 0. Jeśli tak, należy rozważyć modyfikację plikówNCOlub przepisywanie plików. Skargi? Proszę o kontaktUnidata; -)
         
    * TO DO: Nowa paleta TopographyDepth
Zachęcam do przełączania wszystkich zbiorów danych, które wykorzystują paletę OceanDepth do użycia nowej palety TopographyDepth, która jest jak topografia, z wyjątkiem kolorów przewróconych, tak, że nadaje się do wartości głębokości (dodatni = w dół) , zamiast wartości wysokości (dodatni = up) . Zalecane ustawienia tej palety to:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * NOWA FEATURA: Stringmissing\\_valuei / lub\\ _ FillValue
Jeśli zmienna String definiujemissing\\_valuei / lub\\ _ FillValue,ERDDAP™teraz usunie te wartości z danych i zastąpi je pustym łańcuchem, tak aby brakujące wartości pojawiały się jako puste łańcuchy, jak w innych zbiorach danych wERDDAP. Dzięki Margaret O 'Brien, LTER i EML.
         
    * NOWA FEATURA: Wsparcie dla czasu lokalnego
Zmienne timestamp z danymi źródłowymi ze Strings mogą teraz określić strefę czasową poprzez "time\\_zone"atrybut, który prowadziERDDAP™aby przekonwertować czas-strefa źródłowa (niektóre w czasie standardowym, niektóre w czasie dziennym) doZulurazy. Lista ważnych nazw stref czasowych jest prawdopodobnie identyczna z listą w kolumnie TZ w[Tabela](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Domyślnie jest "Zulu". Wspólne strefy czasowe USA to: US / Hawaje, US / Alaska, US / Pacific, US / Mountain, US / Arizona, US / Central, US / Eastern. Dla zmiennych timestamp z numerycznymi danymi źródłowymi można określić"time\\_zone"atrybut, ale wartość musi być"Zulu"lub" UTC ". Dzięki Margaret O 'Brien, LTER i EML.
         
    * NOWA FEATURE: EDDTableFromAsciiFiles obsługuje teraz pliki oddzielone średnikiem
i jest mądrzejszy w wymyślaniu separatora. Dzięki Margaret O 'Brien, LTER i EML.
         
    * NOWA FEATURA: Jeśli istnieje znaczący błąd w loadDatasets (poważne lub nieznaczne, np. zaginięcie lub nieważnośćdatasets.xmldokument) ,ERDDAP™teraz wskazuje go w status.html, zaraz poniżej "n Datasets nie udało się załadować" jako ERROR: podczas przetwarzaniadatasets.xml: zobacz log.txt szczegóły.
         
    * NOWA FEATURA:ERDDAP™Szukam sierot.
KiedyERDDAP™wykonuje duży ładunek Datasety, teraz szuka sierocych zbiorów danych (Zestawy danych, które są wERDDAP™ale nie wdatasets.xml) . Jeśli znaleziono, są one wymienione w status.html, tuż poniżej "n Datasets nie udało się załadować" jako ERROR: n Orphan Datasets (zbiory danych wERDDAP™ale nie wdatasets.xml) =....
Jeśli chcesz usunąć (rozładunek) sierota zERDDAP™, musisz dodać
        &lt;typ zbioru danych = "_ anyValidType _"datasetID= "_ theDatasetID _" active = "false" / &gt;
dodatasets.xmldopóki zbiór danych nie zostanie rozładowany podczas kolejnych głównych ładowarek.
         
    * BUG FIX: Jeżeli zbiór danych miał numeryczną zmienną timestamp z jednostkami innymi niż"seconds since 1970-01-01T00:00:00Z"oraz&lt;updateEveryNMillis &gt; system aktywny, zakres zmiennej timestamp został nieprawidłowo ustawiony podczas aktualizacji zbioru danych. Dzięki Johnowi Kerfootowi.
         
    * BUG FIX: Jeśli&lt;QuickRestart &gt; był prawdziwy w setup.xml i żądałeś danych z EDDTableFrom... Zestaw danych plików, który został użyty&lt;updateEveryNMillis &gt;, pierwszy wniosek do zbioru danych nie powiodłby się, ale kolejne wnioski odniosłyby sukces. Teraz pierwsza prośba nie zawiedzie. Dzięki Johnowi Kerfootowi.
         
    * BUG FIX: GenerateDatasetsXml.sh i .bat nie działały z parametrami &gt; 9 w linii poleceń. Teraz tak. Dzięki Johnowi Kerfootowi.
         
    * BUG FIX: Nowe pliki EDDTableFromMultidimNcFiles nie usuwały konsekwentnie spacji z ciągów. Teraz tak. W szczególności dotyczyło to plików ARGO. Dzięki Kevinowi O 'Brienowi i Rolandowi Schweitzerowi.
         
    * BUG FIX: Wszystkie możliwości zdalnego dostępuDAPusługi są teraz inicjowane przez bardziej nowoczesny kod. Naprawia to błąd "połączenia zamkniętego" przy dostępie do niektórych zbiorów danych EDDTableFromErddap. Dzięki Kevinowi O 'Brienowi.
         
    * BUG FIX: Postępowanie zorderBy... () i wyraźne () wracają do stanu sprzed ostatnich zmian: dany wniosek może mieć wieleorderBy... () lub odrębny () filtr;ERDDAP™będzie obsługiwać je w kolejności są określone. Dzięki Davidowi Karudze.
         
    * BUG FIX: Jeśli zbiór danych jest EDDTableFromDatabase i zapytanie ma[sourceCanOrderBy](/docs/server-admin/datasets#sourcecanorderby)lub[sourceCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct), wtedy baza danych może (w zależności od ustawień wdatasets.xml) częściowo lub całkowicie **tylko pierwszy**  orderBy.. () lub () . Dzięki Davidowi Karudze.
         
    * BUG FIX: Ostatnie dodatkowe kodowanie powodowało problemy z niektórymi zapytaniami.ncPliki CF, np. "status HTTP 500 - Błąd zapytania: zmienna = stacja jest podana dwukrotnie na liście zmiennych wyników". Dzięki Kevinowi O 'Brienowi.
         
    * BUG FIX: EDDTableFromFiles miał problemy z przeładowaniem zbioru danych, gdy jedna z kolumn była prawdziwą kolumną znaków. Dzięki Rolandowi Schweitzerowi.
         
    * BUG FIX:EDDGridPliki FromNcRozpakowane teraz również konwertujemissing\\_value&\\ _ FillValue to standard values so files with different values can be agregated. Z powodu tej zmiany, po zainstalowaniu tej nowej wersjiERDDAP™, proszę ustawić[twarde Flaga](/docs/server-admin/additional-information#hard-flag)dla każdegoEDDGridPliki FromNcNiezapakowany zestaw danychERDDAP.
         
    * Usprawniono: EDDTableFromNcCFFiles może teraz obsługiwać pliki, które mają wiele próbek\\ _ dimension. Podany zbiór danych musi używać tylko zmiennych, które używają jednej z próbek\\ _ wymiarów. Dzięki Ajayowi Krishnanowi.
         
    * Poprawione: dla EDDTableFrom... Pliki,&lt;sortFilesBySourceNames &gt; teraz pozwala comma- separated (zalecane) lub listy oddzielonych spacjami zmiennych nazw źródeł. W obu przypadkach poszczególne nazwy zmiennych mogą być otoczone podwójnymi cytaty, np. jeśli nazwa posiada przestrzeń wewnętrzną.

## Wersja 1.72{#version-172} 
 (wydany 2016- 05- 12) 

*    **Nowe funkcje (dla użytkowników) :** Brak
     
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * NOWE Pliki EDDTableFromMultidimNc@@[Pliki EDDTableFromMultidimNc@@](/docs/server-admin/datasets#eddtablefrommultidimncfiles)jest nową alternatywą dla EDDTableFromNcFiles. Jest on przeznaczony do czynienia z grupami plików o kilku zmiennych o wspólnych wymiarach, np. var1\\[a\\]\\[b\\], var2\\[a\\], var3\\[b\\]SkalarVar. Dzięki Projektowi Argo, Aurélie Briand i Rolandowi Schweitzerowi.
    * BUG FIX:ERDDAP™  (za pośrednictwem klas FileVisitorDNLS i FileVistorSubdir) teraz następuje symboliczne linki na Linuksie.ERDDAP™Nadal nie śledzi go w systemie Windows.
    * BUG FIX błędu wprowadzony w 1.70: odrębny +orderBynie było dozwolone razem w jednym wniosku. Teraz znowu są. Nie wykluczają się wzajemnie / nie są zbędne. Dzięki Davidowi Karudze.
    * ZMIANAdatasets.xmlczarna lista adresów IP:
Pojawiają się adresy IP v4ERDDAP™jako 4 oddzielone okresami liczby szesnastkowe.
Myślę, że adresy IP v6 pojawiają się jako 8 oddzielonych kolonami liczb szesnastkowych.
Więc...ERDDAP™teraz obsługuje colony w adresach IP na tej liście i:\\ * na końcu listy, aby zablokować szereg adresów.
    * ULEPSZONE:ERDDAP™teraz używa NetcdfFileWriter do zapisu.ncpliki zamiast zdeprecjonowanego NetcdfFileWriteable. Nie powinno być zauważalnych zmian w plikach. To otwiera możliwość zrobienia dużych.ncplików, które używają.nc3 64-bitowe rozszerzenia. Jeśli chcesz / potrzebujesz tego, wyślij prośbę doerd.data at noaa.gov.
    * Usprawniono: Wiele linków do zdalnych stron internetowych było nieaktualnych. Teraz są one up- to- date i używaćhttps:zamiasthttp: w miarę możliwości.
    * Wiele drobnych zmian.

## Wersja 1.70{#version-170} 
 (wydany 2016- 04- 15) 

*    **Nowe funkcje (dla użytkowników) :** Brak
     
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** Poniżej znajduje się kilka zalecanych zmian dokumentacji w pliku setup.xml.
Proszę wprowadzić zmiany.
30 minut pracy może oszczędzić ci godzin zamieszania w przyszłości.
    * Ustawienie błędu: Problemem było to, że wnioski, które zostały przekierowane do zdalnegoERDDAPnie powiodło się z niepoprawnym znakiem "|'komunikat błędu. Stało się to tylko w ostatnich wersjach Tomcat. Dzięki Rusty' emu Hollemanowi, Conorowi Delaney i Royowi Mendelssohnowi.
    * Ustawienie błędu:ERDDAP™teraz używa up- to- date wersji netcdf- java (To długa historia.) który zawiera up- to- date wsparcie dla NcML, który rozwiązuje problem z NcML LogicalReduce nie działa zgodnie z oczekiwaniami. Istnieje kilka małych zmian w metadanych, któreERDDAP™czyta przez netcdf- java z.nc,.hdf, .grib i .bufr. Dzięki Favio Medrano.
    * Nowy[EDDTableAggregateRows](/docs/server-admin/datasets#eddtableaggregaterows)pozwala na wykonanie połączonego zbioru danych EDDTable z dwóch lub więcej zbiorów danych EDDTable, które mają te same zmienne danych przy użyciu tych samych jednostek. Dzięki Kevinowi O 'Brienowi.
    * Nowe opcje dla EDDTableFromDatabase ([sourceCanOrderBy](/docs/server-admin/datasets#sourcecanorderby)oraz[sourceCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)) pozwala określić, czyERDDAP™, bazy danych, lub oba, obsługują różne iorderBy  (i wszystkie warianty) ograniczenia. Dzięki Davidowi Karudze.
    * Możesz teraz zrobić prywatny zestaw danych wykresy i metadane dostępne publicznie za pośrednictwem nowego [&lt;graphsAccessibleTo &gt; public&lt;/ graphsAccessibleTo &gt;] (/ docs / server- admin / datasets # graphsaccessibleto) tag. Dzięki Emanuele Lombardi.
    * Teraz, jeśli łańcuch przekazywany do GenerateDatasets Xml lub DasDds jest otoczony podwójnymi cytatami, jest niecytowany (jakby to był ciąg JSON) . Dzięki Johnowi Kerfootowi i Melanie Abecassis.
    * GenerateDatasets Xml obsługuje teraz "domyślnie", aby uzyskać domyślne i "nic", aby uzyskać pusty ciąg znaków (pracują z lub bez cudzysłów) . To rozwiązuje pewne problemy związane z przekazywaniem pustych strun.
    * Teraz, w GenerateDatasets Xml, dla wszystkichEDDGridPliki FromFiles i EDDTable Zestawy danych FromFiles, jeśli próbka FileName można określić jest "" (pusty ciąg) , będzie używać ostatniej pasującej nazwy pliku z katalogu + regex + recursive = true.
    * Aktualizacja: Kod displayInBrowser, który jest używany do wyświetlania wyników GenerateDatasetsXml i DasDds na komputerach Linuksa był niedostępny i dał dziwną wiadomość o Netscape. To używa nowoczesnego narzędzia Linux: xdg- open. Dzięki Melanie Abecassis.
    * WallDatasetszestaw danych ma teraz"files"kolumna, która wskazuje bazowy adres URL odnośnika / plików (jeśli istnieje) dla zbioru danych.
    * Zwiększ ogólne bezpieczeństwo TwojegoERDDAP™poprzez zmianę uprawnień związanych z katalogiem tomcat i bigParentDirectory:
         (Poniższe komendy są dla Linuksa. Dla innych OS, dokonać analogicznych zmian.) 
        * Zmień nazwę "grupy" na tomcat, nazwę użytkownika lub nazwę małej grupy, która zawiera Tomcat i wszystkich administratorów Tomcat /ERDDAP, np.,
chgrp -R _ your UserName _ apache- tomcat- _ 8.0.23 _
chgrp -R _ your UserName bigParentDirectory _
        * Zmień uprawnienia tak, aby tomcat i grupa mieli odczyt, zapis, wykonywanie uprawnień, np,.
chmod -R ug + rwx apache- tomcat- _ 8.0.23 _
chmod -R ug + rwx _ bigParentDirectory _
        * Usuń "inne" uprawnienia użytkownika do odczytu, zapisu lub wykonania:
chmod -R o- rwx apache- tomcat- _ 8.0.23 _
chmod -R o- rwx _ bigParentDirectory _
Jest to ważne, ponieważ uniemożliwia innym użytkownikom odczytywanie potencjalnie wrażliwych informacji wERDDAP™konfiguracja plików, logowanie plików i plików z informacjami o prywatnych zbiorach danych.
    * System uwierzytelniania / logowania został zmieniony. Dzięki Thomasowi Gardnerowi, Emanuele Lombardi i nowemu rządowi USA[HTTPS- Tylko standard](https://home.dotgov.gov/management/preloading/dotgovhttps/).
        * Opcja uwierzytelniania = openid została usunięta. To było nieaktualne.
        * Nowy, polecany,[uwierzytelnienie = google](/docs/server-admin/additional-information#google)wykorzystanie opcji Sygnał Google - w (na podstawie OAuth 2.0) aby umożliwić każdemu z kontem Google e-mail (w tym Konta zarządzane Google jak@noaa.gov) żeby się zalogować.
        * Nowy,[uwierzytelnienie = email](/docs/server-admin/additional-information#email)opcja jest backup do uwierzytelniania = google. Pozwala użytkownikom z&lt;użytkownik &gt; tag indatasets.xmlzalogować się wysyłając im e-mail ze specjalnym linkiem.
        * W ustawieniach xml, proszę zmienić opis&lt;uwierzytelnienie &gt;
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \\[No longer supported: "basic", "openid"\\]
            -->
```

        * W setup.xml, proszę dodać to dokładnie poniżej&lt;uwierzytelnienie &gt; tag
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        * Użytkownicy, którzy nie są zalogowani, mogą użyćhttplubhttpsURL (jeśli skonfigurowano&lt;baseHttpsUrl &gt; w zestawie.xml). Dzięki nowemu rządowi USA[HTTPS- Tylko standard](https://https.cio.gov/).
        * Teraz możesz zachęcić wszystkich użytkowników do korzystaniahttps  (niehttp) przez ustawienie&lt;BaseUrl &gt; byćhttpsURL. Zmuszanie użytkowników do używania wyłączniehttps, należy również dokonać zmian w konfiguracji Apache / Tomcat, aby zablokować non--httpsdostęp. Dzięki nowemu rządowi USA[HTTPS- Tylko standard](https://https.cio.gov/).
            
W ustawieniach xml, proszę zmienić opis&lt;BaseUrl &gt;
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        * Opcje&lt;passwordEncoding &gt; Zmieniony. W ustawieniach xml, proszę zmienić opis&lt;haswordEncoding &gt; to be
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        * W ustawieniach xml, proszę zmienić opis&lt;BaseHttpsUrl &gt;
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        * Teraz, jeśli listPrivateDatasets = true w setup.xml, jeszcze mniej informacji zostanie pokazanych o zbiorach danych, do których użytkownik nie ma dostępu.
    * Teraz, zwłaszcza, gdy początkowo skonfigurować swojeERDDAPMożesz powiedziećERDDAP™nie próbować zapisać się do zdalnegoERDDAP™zestawów danych. Dzięki Filipe Rocha Freire.
W twoim zestawie.xml, tuż przed&lt;fontFamily &gt;, proszę dodać
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    * W ustawieniu.xml, w instrukcji powyżej&lt;emailFromAdres &gt;, proszę wstawić:
Jeśli to możliwe, skonfiguruj to w celu użycia bezpiecznego połączenia (SSL / TLS) do serwera e-mail.
Jeśli konfiguracja nie używa bezpiecznego połączenia z serwerem e-mail, proszę dokonać zmian, aby tak się stało.
    * Wdatasets.xml, proszę dodać ten wiersz do opisu&lt;subscriptionEmailBlacklist &gt; w Twoimdatasets.xml:
Możesz użyć nazwy "\\*"do czarnej listy całej domeny, np.,\\*@ example.com.
    * Od momentu zmiany systemu logowania w v1.66, plik dziennika nigdy nie jest aktualizowany. Zawsze są wiadomości lub części wiadomości czekające na zapisanie do pliku dziennika. Teraz, możesz zrobić to-to-date (na chwilę) poprzez oglądanieERDDAPstatus strony internetowej na stronie http://_your.domain.org_/erddap/status.html .
    * HashDigest...
    * Mała zmiana (String2.canonical) które powinny pomóc utrzymać rzeczy szybko, gdyERDDAP™jest bardzo zajęty, a także lepiej radzić sobie z bardzo dużą liczbą zbiorów danych.
    * Mocno Zalecane: przerwać stosowanie&lt;convertToPublicSourceUrl &gt; wdatasets.xmlkonwertować numer IP w zbiorze danych&lt;sourceUrl&gt; (np., http://192.168.#.#/ ) w nazwę domeny (np.,http: my.domain.org /) . Od teraz, nowe prenumeraty do http://localhost , http://127.0.0.1 oraz http://192.168.#.# URL nie będzie dozwolone ze względów bezpieczeństwa. Więc proszę zawsze używać nazwy domeny publicznej w&lt;sourceUrl&gt; tag (w razie potrzeby z powodu problemów z DNS) , można użyć[/ etc / hosts tabeli na serwerze](https://linux.die.net/man/5/hosts)do rozwiązania problemu poprzez konwersję nazw domen lokalnych na numery IP bez użycia serwera DNS. Możesz sprawdzić, czy dana nazwa domeny zostanie prawidłowo rozwiązana za pomocą
ping _ some.domain.name _
    * W generateDatasets.xml, dla zdalnych zbiorów danych (np. z serwera THREDDS) , automatycznie generowanedatasetIDs są niezmienione dla większości domen. Dla kilku domen, pierwsza część (tj. nazwa) automatycznie wygenerowanedatasetIDbędzie trochę inaczej. W szczególności nazwy, które miały jedną część są teraz bardziej prawdopodobne, że mają dwie części. Na przykład zbiory danych z http://oos.soest.hawaii.edu dodatasetIDs które zaczęły się od hawaii\\ _, ale teraz prowadzą dodatasetIDs które zaczynają się od hawaii\\ _ soest\\ _. Jeśli to powoduje problemy, proszę wysłać e-mail. Może być jakaś praca.
    * Kierowca Cassandra został zaktualizowany do Cassandra- driver- core- 3.0.0.jar, a więc dla Cassandra v3. EDDTableFromCassandra nie wykorzystuje żadnych nowych funkcji w Cassandra v3. Wskaźniki w Cassandrze mogą być teraz bardziej złożone, aleERDDAP™nadal używa modelu indeksowego Cassandra v2, który zakłada, że indeksowana kolumna może być bezpośrednio zapytana'='ograniczenia. GenerateDatasets Xml dla EDDTableFromCassandra nie wykrywa już kolumn z indeksami; jeśli indeks jest prosty, należy go określić wdatasets.xmlręcznie. Jeśli potrzebujesz wsparcia dla bardziej złożonych indeksów lub innych nowych funkcji, emailerd.data at noaa.gov.
&#33; Jeśli nadal używasz Cassandra 2.x, należy kontynuować stosowanieERDDAP™v1.68 aż do aktualizacji do korzystania z Cassandra 3.x.
    * Jars i Classpath -- Prawie wszystkie zawarte pliki .jar trzeciej partii zostały zaktualizowane do ich najnowszych wersji.
        * Slf4j.jar został dodany do / lib i Classpath.
        * Joid. Jar i Tsik. słoik został usunięty z / lib i Classpath.
        * Jeśli otrzymasz komunikaty o błędach dotyczących klas, które nie zostały znalezione podczas kompilacji lub uruchamianiaERDDAP™lub jeden z jego narzędzi, porównać Classpath linii poleceń doERDDAPjest[bieżący klasspath](/docs/contributing/programmer-guide#development-environment)Aby dowiedzieć się, którego słoika brakuje w twoim klamrze.

## Wersja 1.68{#version-168} 
 (wydany 2016- 02- 08) 

*    **Nowe funkcje (dla użytkowników) :** Brak
     
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    *   [EDDGridAgregacja plików FromFiles poprzez nazwy plików lub metadane globalne](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)--
Wszystkie zmianyEDDGridFromFiles może teraz agregować grupę plików dodając nowy najbardziej lewy wymiar, zwykle czas, na podstawie wartości uzyskanej z każdej nazwy pliku lub wartości atrybutu globalnego, który jest w każdym pliku.
    * ULEPSZONE: Wcześniej zasugerowaliśmy, że może chcesz utworzyćEDDGridZestaw danych FromErddap w Twoimdatasets.xmlktóry odniósł się i ponownie służył jplMURSSZestaw danych T w naszymERDDAP. Ponieważ istnieje teraz nowsza wersja tego zbioru danych, ten zbiór danych jest teraz zdeprecjonowany. Więc jeśli masz ten zestaw danych w swoimERDDAP™, proszę dodać ten nowy zestaw danych
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Jeśli chcesz usunąć stare jplMURSSZestaw danych TERDDAP™  (To twój wybór.) , zmienić aktywne ustawienie z "true" na "false".
    * Ustawienie błędu: Proszę sprawdzić bigParentDirectory, które podałeś w setup.xml. Jeśli nie umieścić ukośnik na końcu&lt;bigParentDirectory &gt; nazwa, następnieERDDAP™stworzy kilka katalogów poprzez przypisanie słów bezpośrednio do nazwy, którą podałeś, zamiast tworzyć podkatalogi. Zaczynając od wersji 1.68,ERDDAP™dodaje ukośnik do końca nazwy katalogu, jeśli go nie podano. Więc jeśli wcześniej nie określiłeś ukośnika na końcu, to kiedy instalujeszERDDAP™v1.68 musisz przenieść i zmienić nazwę tych katalogów **po** zamykasz stareERDDAP™oraz **przed** Ty uruchom nowyERDDAP. Na przykład, jeśli błędnie podano bigParentDirectory jako / home / erddapBPD (brak ukośnika) orazERDDAP™błędnie stworzył katalogi jak
/ home / erddapBPDcache
/ home / erddapBPDcopy
/ home / erddapBPDdataset
/ home / erddapBPDflag
/ home / erddapBPDlogs
/ home / erddapBPDlucene
oraz plik o nazwie / home / erddapBPDsubscriptionsV1.txt,
Następnie trzeba przenieść i zmienić nazwę na
/ home / erddapBPD / cache
/ Home / erddapBPD / kopia
/ home / erddapBPD / dataset
/ home / erddapBPD / flag
/ home / erddapBPD / logs
/ Home / erddapBPD / lucene
i / home / erddapBPD / subscriptionsV1.txt
    * Ustawienie błędu: Były tam robaki.EDDGridLonPM180 inERDDAP™v1.66, które wystąpiły, gdy zestaw danych dziecka jestEDDGridFromErddap.
    * Ustawienie błędu: W środku był robak.EDDGridPliki FromFiles i EDDTable Pliki FromFiles wERDDAP™v1.66, które spowodowały&lt;updateEveryNMillis &gt; zostanie zignorowany przy pierwszym załadowaniu zbioru danych po ponownym uruchomieniu.
    * Błąd fix / Nowa funkcja: Jeśli dane dziecka wEDDGridAgregateExistingDimension,EDDGridPrzyjąłem.EDDGridFromEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy lub EDDTableFromEDDGridjest... FromErddap dataset, że rodzic dataset teraz subskrybuje do bazowegoERDDAP™zestaw danych. Jeżeli instrument bazowyERDDAP™zbiór danych jest w tym samymERDDAP™, subskrypcja i jej walidacja są wykonywane bezpośrednio; nie otrzymasz e-mail z prośbą o zatwierdzenie subskrypcji. W przeciwnym razie, jeśli system subskrypcjiERDDAP™jest wyłączony, ustawić&lt;reloadEveryNMinutes &gt; ustawienie zbioru danych rodzicielskich na małą liczbę (60?) tak, że pozostaje na bieżąco.
    * Błąd fix / Nowa funkcja: Jeśli dane dziecka wEDDGridAgregateExistingDimension,EDDGridPrzyjąłem.EDDGridFromEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy lub EDDTableFromEDDGridma aktywny = "false", że zestaw danych dziecka jest teraz pominięty.

## Wersja 1.66{#version-166} 
 (wydany 2016- 01- 19) 

*    **Nowe funkcje (dla użytkowników) :** 
    * Grafy (nie mapy) może teraz mieć wartości malejące na osiach. Aby to uzyskać przy użyciu strony internetowej Make A Graph, zmień nową oś Y: ustawienie wznoszące (domyślny) do malejącego. Lub, w URL, który wymaga wykresu, użyj nowego opcjonalnego trzeciego '|'parametr dla[& .x Zakres i / lub &. przełączniki yRange](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)Co może być niczym. (domyślny) , true, or t to get ascending values, or use false or f to get descending values. Prawda|Fałszywe wartości są nieczułe. Dzięki Chrisowi Fullilove, Johnowi Kerfootowi, Luke 'owi Campbellowi i Cary Wilson.
    * Użytkownicy mogą teraz określić kolor tła wykresów dodając & .bgColor = 0x _ AARRGGBB _ switch to the URL which requests the graph. Zobacz .bgColor w sekcji Polecenia graficzne[griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)oraz[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands)dokumentację. Dzięki Johnowi Kerfootowi i Luke 'owi Campbellowi.
    * Dla zbiorów danych tabelarycznych ograniczenia mogą teraz odnosić się do min (_ someVariable Name _) lub max (_ someVariable Name _) . Patrz[min () i max () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min). Dzięki Johnowi Kerfootowi.
    * Dla zbiorów danych tabelarycznych - ograniczenia czasowe, które z nich korzystają[teraz](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)może teraz określić jednostki czasowe milisekund lub milisekund.
    * Prośba o obraz zbioru danych tabelarycznych tworzy teraz mapę (nie wykres) jeśli zmienne x i y są zmiennymi typu fixude- i lathie- like (kompatybilne jednostki) . Dzięki Rich Signellowi.
    * Fix bug: Etykiety osi czasu i kleszcze czasami wykazywały dziwne nieprawidłowości podczas żądania wielu wykresów jednocześnie (np. na stronie internetowej) . Problemem był błąd w bibliotece graficznej SGT, żeERDDAP™zastosowania (jedną zmienną było "statyczne", które nie powinno być) . Dzięki Bradfordowi Butmanowi.
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * Umieszczenie hasła e-mail w zwykłym pliku tekstowym, takim jak setup.xml. stanowi ryzyko dla bezpieczeństwa. Aby złagodzić ten problem, stanowczo zalecamy:
        1. Utwórz konto e-mail tylko dlaERDDAPwykorzystanie np. erddap @ yourInstitution.org. Ma również inne korzyści; w szczególności, więcej niż jedenERDDAP™administrator może wówczas uzyskać dostęp do tego konta e-mail.
        2. Zrób uprawnienia pliku setup.xml rw (czytaj + pisz) dla użytkownika, który uruchomi Tomcat iERDDAP™  (użytkownik = tomcat?) i żadnych uprawnień (brak odczytu lub zapisu) dla grupy i innych użytkowników. Dzięki Filipe Rocha Freire.
    * Nowy[ArchiveADATASET](/docs/server-admin/additional-information#archiveadataset)narzędzie upraszcza tworzenie.tar.gzarchiwum z podzbiorem zbioru danych w formacie odpowiednim do archiwizacji (w szczególności:NOAANCEI) . To powinno być przydatne dla wieluERDDAP™administratorzy w wielu sytuacjach, ale szczególnie dla grup wewnątrzNOAA.
    * Nowy typ zbioru danych[EDDGridFromNcFilesUnpacked](/docs/server-admin/datasets#eddgridfromncfilesunpacked)jest wariantemEDDGridFromNcFiles. Różnica polega na tym, że ta klasa rozpakowuje każdy plik danych przedEDDGridPliki FromFiles przeglądają pliki:
        
        * Rozpakowuje używane zmiennescale\\_factorlubadd\\_offset.
        * Promuje zmienne integer, które mają atrybuty\\ _ Unsigned = true do większego typu danych integer tak, że wartości pojawiają się jako niepodpisane wartości. Na przykład\\ _ Unsigned = true bajt (8 bitów) zmienna staje się podpisanym skrótem (16 bitów) zmienna.
        * Konwertuje\\ _ FillValue imissing\\_valuewartości dla NaN (lub MAX\\ _ VALUE dla typów danych całkowitych) .
        
Wielką zaletą tej klasy jest to, że zapewnia sposób na radzenie sobie z różnymi wartościamiscale\\_factor,add\\_offset,\\ _ FillValue, lubmissing\\_valuew różnych plikach w kolekcji. W przeciwnym razie musiałbyś użyć takiego narzędzia jak[NcML](/docs/server-admin/datasets#ncml-files)lub[NCO](/docs/server-admin/datasets#netcdf-operators-nco)modyfikować każdy plik, aby usunąć różnice, tak aby pliki mogły być obsługiwane przezEDDGridFromNcFiles. Aby ta klasa działała prawidłowo, pliki muszą być zgodne ze standardami CF dla powiązanych atrybutów. Dzięki Philippe 'owi Makowskiemu.
    * Nowy typ zbioru danych[EDDGridLonPM180](/docs/server-admin/datasets#eddgridlonpm180)pozwala na zmianę zbiorów danych o pewnych wartościach długości powyżej 180 (np. zakres od 0 do 360) do zbiorów danych o wartościach długości geograficznej w zakresie od -180 do 180 (Długość geograficzna Plus lub Minus 180, stąd nazwa) . Wielką zaletą oferowania zbiorów danych o wartościach długości geograficznej w zakresie od -180 do 180 jest to, żeOGCusługi (np.,WMS) wymagają wartości długości geograficznej w tym zakresie. Dzięki Lynne Tablewski, Fabien Guichard, Philippe Makowski i Martin Spel.
2016- 01- 26 Aktualizacja: To ma błąd, który występuje, gdy zestaw danych dziecka jestEDDGridFromErddap, który odnosi się do zbioru danych w tym samymERDDAP. Ten błąd jest ustawionyERDDAP™v1.68.
    * W[GenerateDatasetsXml](/docs/server-admin/datasets#generatedatasetsxml), nowy specjalny zestaw danych,EDDGridLonPM180FromErddapCatalog, pozwala generowaćdatasets.xmlzamiastEDDGridZestawy danych LonPM180 ze wszystkichEDDGridzbiory danych wERDDAPktórych długość geograficzna jest większa niż 180.
    * Dla wszystkichEDDGridzestawy danych, wdatasets.xmlmożesz teraz użyć opcjonalnego
[&lt;dostępne ViaWMS&gt; true|false&lt;/ dostępne ViaWMS&gt;] (/ docs / server- admin / datasets # accessibleviawms)   (domyślnie = true) . Ustawienie tego na fałszywe siłą wyłączaWMSusługa dla tego zbioru danych. Jeśli tak, zbiór danych może nadal nie być dostępny za pośrednictwemWMSz innych powodów (Na przykład, brak osi płaskich lub płaskich) . Jest to szczególnie przydatne w przypadku zbiorów danych, które istnieją samodzielnie i zawinięte przezEDDGridLonPM180, aby tylko wersja LonPM180 była dostępna poprzezWMS.
    * W setup.xml możesz podać inny domyślny kolor tła wykresów. Kolor jest określony jako 8-cyfrowa wartość szesnastkowa w postaci 0x _ AARRGGBB _, gdzie AA, RR, GG i BB są nieprzezroczyste, czerwone, zielone i niebieskie składniki, określone odpowiednio jako dwucyfrowe numery szesnastkowe. Zauważ, że płótno jest zawsze nieprzezroczysty biały, więc (półprodukty -) przezroczysty kolor tła wykresu miesza się w białym płótnie. Domyślnie jest jasnoniebieski:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Dzięki Johnowi Kerfootowi i Luke 'owi Campbellowi.
    * W setup.xml można teraz określić maksymalny rozmiar[plik dziennika](/docs/server-admin/additional-information#log)  (gdy zostanie przemianowany na logowanie. txt. poprzedni i nowy dziennik. txt jest tworzony) W MegaBytes. Dozwolone minimum to 1. Maksymalna dopuszczalna wartość to 2000. Domyślnie 20 (MB) . Na przykład:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * Wdatasets.xml, [&lt;FgdcFile &gt;] (/ docs / server- admin / datasets # fgdcfile) albo&lt;iso19115File &gt;] (/ docs / server- admin / datasets # iso19115file) może być teraz lokalnym plikiem (jak wcześniej) lub URL (które zostaną pobrane, więc nie ma lokalnej kopii) . JeśliERDDAP™nie jest w stanie pobrać pliku, wczytanie zbioru danych będzie kontynuowane, ale zbiór danych nie będzie miał pliku fgdc lub iso19115.
    *   EDDGridPliki FromFiles i EDDTable Zestawy danych FromFiles mogą teraz wykonać szybki Restart (system, któryERDDAP™próbuje używać przy pierwszym załadowaniu zbiorów danychERDDAP™jest ponownie uruchomiony) . To przyspiesza ponowne uruchomienieERDDAP.
2016- 01- 26 Aktualizacja: To ma błąd, który powoduje&lt;updateEveryNMillis &gt; zostanie zignorowany przy pierwszym załadowaniu zbioru danych po ponownym uruchomieniu. Ten błąd jest ustawionyERDDAP™v1.68.
    * Ogólna poprawa systemu QuickRestart pozwalaERDDAP™ładowanie zbiorów danych szybciej, gdyERDDAP™jest ponownie uruchomiony.
    * WszystkieEDDGridPliki FromFiles i EDDTable Podklasy FromFiles akceptują teraz nowe&lt;pathRegex &gt; tag, zwykle podany poniżej&lt;rekursywne &gt;. Jeśli recursive jest "prawda", tylko pełne ścieżki podkatalogu, które pasują do pathRegex (domyślny = ".\\ *") zostaną przyjęte. Podobnie&lt;sourceUrls &gt; znacznik wEDDGridAggregateExistingDimension może teraz zawierać atrybut pathRegex (domyślny = ".\\ *") .
    * Domyślny&lt;partialRequestMaxBytes &gt; in setup.xml is now 490000000 (~ 490 MB) . Unika to niektórych problemów / timeout związanych z uzyskiwaniem danych z serwerów danych THREDDS. Dzięki Leslie Thorne.
    * Mała zmiana w systemie logowania powinna pozwolićERDDAP™być bardziej reagujący, gdy jest bardzo, bardzo zajęty. Informacje są teraz zapisywane do pliku dziennika na dysku w dość dużych kawałkach. Zaletą jest to, że jest to bardzo wydajne --ERDDAP™nigdy nie zablokuje oczekiwania na zapisanie informacji do pliku dziennika. Wadą jest to, że dziennik prawie zawsze kończy się częściową wiadomością, która nie zostanie zakończona, dopóki następny kawałek nie zostanie napisany.
    * Naprawianie błędów związanych z inotify i [&lt;updateEveryNMillis &gt;] (/ docs / server- admin / datasets # updateeevernmillis) systemEDDGridPliki FromFiles i EDDTable Zestawy danych FromFiles: Nie jest już konieczne określenie dużej liczby fs.inotify.max\\ _ user\\ _ watchers lub fs.inotify.max\\ _ user\\ _ instantions. Jest błąd wJavaktóre powoduje niektóre częściJavasystem inotify / WatchDirectory nie jest zbierane śmieci, gdy są one sfinalizowane; ostatecznie, liczba zegarków inotify zombie lub instancje przekroczyłyby maksymalną liczbę określoną.ERDDAP™Teraz działa wokół tegoJavaPluskwa.
Ponadto liczba wątków inotify jest podana na stronie status.html, więc można mieć oko na jej wykorzystanie. Zazwyczaj jest 1 nitka inotify naEDDGridPliki FromFiles i EDDTable Zestaw danych FromFiles.
    * Bug fix: w wielu miejscach, zamiast błędu, został wygenerowany nowy błąd, który zawierał tylko krótką wersję oryginalnego komunikatu błędu i bez śladu stosu. Teraz, gdy generowany jest nowy błąd, prawidłowo zawiera cały oryginalny wyjątek np., rzucać nowy wyjątek ("jakaś nowa wiadomość", e) ;
Dzięki Susan Perkins.
    * Naprawianie błędów: do niedawna (V1.64?) , jeśli... /datasetIDProszono o adres URL,ERDDAP™dodałby .html do adresu URL. W v1.64 nie udało się (nieprawidłowo sformatowany URL został wygenerowany i nie powiódł się) . To znowu działa. Dzięki Chrisowi Fullilove.

## Wersja 1.64{#version-164} 
 (wydany 2015- 08- 19) 

*    **Nowe funkcje (dla użytkowników) :** 
    * Istnieją teraz wytyczne dotyczące dostępu do chronionego hasłem prywatnegoERDDAP™zbiory danych (https://) przezcurlorazPython. Patrz[curl](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl)oraz[Python](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python)instrukcje.
Dzięki Emilio Mayorga z NANOOS i Paul Janecek ze Spyglass Technologies.
         
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    *   ERDDAP™teraz wymagaJava1.8 +.
        Java1.7[koniec życia](https://www.oracle.com/technetwork/java/eol-135779.html)  (brak aktualizacji bezpieczeństwa) w kwietniu 2015 r. Ta wersjaERDDAP™nie będzie działać z wersjamiJavaponiżej 1,8. Jeśli aktualizacja zJava1,7x (lub wcześniej) , należy również zaktualizować Tomcat. Patrz[ERDDAP™Ustawienia instrukcji](/docs/server-admin/deploy-install)do pobrania linków i porad.
    * Nowy formularz dostawcy danych.
Kiedy dostawca danych przychodzi do Ciebie mając nadzieję na dodanie niektórych danych doERDDAP™, może być trudne i czasochłonne, aby zebrać wszystkie metadane potrzebne do dodania zbioru danychERDDAP. Wiele źródeł danych (na przykład pliki .csv, Pliki Excel, bazy danych) nie posiadają wewnętrznych metadanych, więcERDDAP™posiada nowy formularz dostawcy danych, który gromadzi metadane od dostawcy danych i udziela dostawcy danych innych wskazówek, w tym obszernych wskazówek dotyczących danych w bazach danych. Przedstawione informacje przelicza się nadatasets.xmlformat, a następnie email doERDDAP™administrator (Ty) i napisane (załączone) do bigParentDirectory / logs / dataProviderForm.log. Tak więc, forma pół-automatyzuje proces uzyskiwania zbioru danych doERDDAP™, aleERDDAP™administrator nadal musi ukończyćdatasets.xmlkawałek i zająć się uzyskiwaniem pliku danych (s) od dostawcy lub połączenia z bazą danych. Więcej informacji na ten temat znajduje się w:[Dostawca danych Opis formularza](/docs/server-admin/datasets#data-provider-form).
    * Nowy&lt;matchAxisNDigits &gt;
może być stosowany przezEDDGridPliki FromFiles (a zatem z plików NcFiles i z plików MergeIRFiles) ,EDDGridAgregateExistingDimension,EDDGridPrzyjąłem.EDDGridZestawy danych SideBySide w celu określenia, jak dokładnie muszą być równe wartości osi w różnych plikach (ile cyfr) : 0 = brak kontroli (Nie używaj tego&#33;) , 1-18 dla zwiększenia precyzji, lub 20 (domyślny) za dokładną równość. dla n = 1- 18,ERDDAP™zapewnia, że pierwsze n cyfry podwójnych wartości (lub (n + 1) div 2 dla wartości pływania) są równe.
        &lt;matchAxisNDigits &gt; zastępuje&lt;ensureAxisValuesAreEqual &gt;, która jest obecnie nieuzasadniona. Wartość 'true' zostanie przekształcona na matchAxisNDigits = 20. Wartość 'false' (Nie rób tego&#33;) zostanie przekonwertowany na mecz AxisNDigits = 0.
    *   EDDGridPliki FromFiles i EDDTable FromFiles będzie ładować bardzo powoli po raz pierwszy korzystać z tej wersjiERDDAP.
        ERDDAP™teraz przechowuje wewnętrzne informacje o plikach nieco inaczej, więc wewnętrzna tabela plików dla każdego z tych zbiorów danych musi zostać przebudowana. Nie martw się. Nic się nie stało. To jednorazowa sprawa.
    * Pliki zdalnego źródła
        EDDGridPliki FromNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles pozwalają na to, aby pliki były zdalnymi plikami w katalogu dostępnym przezhttp://  (i prawdopodobniehttps://i ftp: / /, ale nie są testowane) jeśli zdalny serwer obsługuje[Zapytania o zakres](https://en.wikipedia.org/wiki/Byte_serving)w nagłówku żądania. Prośby o wsparcie w zakresie ThREDDS i Amazon S3,HyraxNie. Ten system pozwala na dostęp do danych w zdalnych plikach bez pobierania plików (co jest pomocne, jeśli pliki zdalne są zbyt obszerne) , ale dostęp do tych plików będzie znacznie wolniejszy niż dostęp do lokalnych plików lub nawet do pilotaOPeNDAPŹródło.
Obejmuje to:"files"w kubełku Amazon S3 ponieważ są one dostępne przezhttp://. Jeśli nazwy obiektów S3 są jak nazwy plików (z wewnętrznymi / 's jak drzewo katalogowe Linuksa) ,ERDDAP™może również udostępnić pliki poprzezERDDAPjest"files"system. Aby to zadziałało, twoje referencje S3 muszą być w ~ / .aws / referencje (na Linux, OS X lub Unix) , lub C:\\ Użytkownicy\\ USERNAME\\\ .aws\\ referencje (w systemie Windows) na serwerzeERDDAP. Patrz[Dokumentacja Amazon SDK](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1).
    * GenerateDatasets Xml ma nową, niezwykłą opcję: EDDsFromFiles.
To przejdzie przez system plików (nawet zdalny system jak Amazon S3 jeśli obiekty mają nazwy podobne do plików) i utworzyćdatasets.xmlkawałki dla serii zbiorów danych. Twój przebieg może się różnić. Działa to dobrze, jeśli pliki są zorganizowane tak, że wszystkie pliki danych w danym katalogu (i jego podkatalogi) są odpowiednie do jednego zbioru danych (np. wszystkie kompozyty SST 1-dniowe) . W przeciwnym razie (np. jeśli katalog zawiera niektóre pliki SST i niektóre pliki chlorofilii) , to działa źle, ale może być nadal przydatne.
    * Programiści: nowe pliki / lib .jar.
Jeśli kompilujeszERDDAP™, proszę zauważyć nowe pliki .jar w parametrze classpath -cp wymienione wERDDAP™ [Przewodnik programisty](/docs/contributing/programmer-guide).
    * morze\\ _ woda\\ _ praktyczne\\ _ zasolenie
Jeśli użyjesz standardowej nazwy CF: morze\\ _ woda\\ _ zasolenie dla każdej zmiennej, zachęcam do przełączania się na morze\\ _ woda\\ _ praktyczne\\ _ zasolenie, które jest dostępne w[wersja 29 tabeli nazwy standardowej CF](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)  (i kilka poprzednich wersji -- Nie wiedziałem, że) . Nazwa ta wskazuje, że jest to rzeczywiście wartość praktycznego zasolenia przy użyciuPractical Salinity Units  (PSU) , w przeciwieństwie do starszych g / kg wartości. Jednostki kanoniczne są różne, ale nadal niesamowicie niepomocne: 1 (Prawdopodobnie sugerującPSU/ PSS- 78) , w przeciwieństwie do 1e-3 (przypuszczalnie sugerując g / kg) dla morza\\ _ wody\\ _ zasolenia.\\[Hej,Unidataoraz CF: Określamy wartości, które używają innych skal, na przykład Fahrenheit lub Celsius, poprzez ciąg jednostek, który jest nazwą skali lub jakąś zmiennością. Dlaczego nie możemy zidentyfikować jednostek zasolenia za pomocą ich skali, np. PSS- 78? Wiem, że wartości PSS- 78 są "jednoznaczne", ale istnieje dorozumiana skala, prawda? Jeśli wymyślę nową skalę zasolenia praktycznego, gdzie wartości są 0,875 razy wartości PSS- 78, czy jednostki kanoniczne powinny nadal być "1"? Jak użytkownik mógł je odróżnić? Jednostki 1e-3 i 1 nie są ani opisowe ani pomocne dla użytkowników, którzy próbują dowiedzieć się, co liczby wskazują.\\]

## Wersja 1.62{#version-162} 
 (wydany 2015- 06- 08) 

*    **Nowe funkcje (dla użytkowników) :** 
    * DlaEDDGridZestawy danych, użytkownicy mogą teraz zrobić Wykres Typ: Wykresy powierzchni z dowolnej kombinacji osi liczbowych, nie tylko długość geograficzna i szerokość geograficzna. To pozwala na x kontra y (prognozowane) wykresy i różne[Diagramy Hovmöllera](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram)Na przykład, wykreślanie długości geograficznej w stosunku do głębokości lub czasu w stosunku do głębokości.\\[Uwaga: Jeśli głębokość jest na osi Y, prawdopodobnie zostanie ona odwrócona od tego, co chcesz. Przykro mi, nie ma jeszcze opcji.\\]Dzięki Cary Wilson i Lynn DeWitt.
    * Jest nowy[Oceanic / Atmospheric Acronym Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html)co pozwala na konwersję wspólnego akronimu oceanicznego / atmosferycznego na / z pełnej nazwy.
    * Jest nowy[Oceaniczny / atmosferyczny Konwersja nazw zmiennych](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html)która pozwala na konwersję wspólnej nazwy zmiennej oceanicznej / atmosferycznej na / z pełnej nazwy.
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    *   Java7 / 8
        Oraclenie obsługuje już (zapewnia poprawki błędów bezpieczeństwa dla)  Java7.ERDDAP™nadal obsługujeJava7, ale proszę przejść doJava8. Następne wydanieERDDAP™będzie prawdopodobnie wymagaćJava8.
    *   valid\\_min/ maks. / zakres
Poprzednio i teraz, jeślidataVariablejeśliscale\\_factororazadd\\_offsetmetadane,ERDDAP™rozpakowuje wartości danych i usuwa te metadane. Poprzednio:ERDDAP™nie modyfikował / rozpakowywał żadnychvalid\\_range,valid\\_min,valid\\_maxmetadane (które zazwyczaj / powinny zawierać wartości zapakowane) przezscale\\_factororazadd\\_offset. Teraz tak. Proszę przeszukaćERDDAP™dla "valid\\ _" i upewnij się, że wszystkie zmienne mająvalid\\_range,valid\\_minlubvalid\\_maxmieć poprawne wartości, gdy zbiorniki danych pojawiają się w nowej wersjiERDDAP. Patrz[valid\\_range/ min / max dokumentacja](/docs/server-admin/datasets#valid_range).
    * ACDD- 1.3
Poprzednio:ERDDAP™  (w szczególności GenerateDatasets Xml) używane / zalecane oryginał (1, 0) Wersja[NetCDFKonwencja o atrybucie dla wyszukiwania danych](https://wiki.esipfed.org/ArchivalCopyOfVersion1)które zostało określone jako "UnidataDataset Discovery v1.0 "w konwencjach globalnych iMetadata\\_Conventionsatrybuty. Teraz polecamy[ACDD wersja 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)która została ratyfikowana na początku 2015 r. i jest nazywana "ACDD- 1.3" Na szczęście ACDD- 1.3 jest kompatybilny z wersją 1.0. ZALECAMY, że ty[przełączanie na ACDD- 1.3](/docs/server-admin/datasets#switch-to-acdd-13). To nie jest trudne.
    * GenerateDatasets Atrybuty Xml
Zaobserwowano wiele zmian w celu poprawy&lt;addAttributes&gt; wartości sugerowane przez GenerateDatasets Xml dla konwencji globalnych,creator\\_name/ email / url, słowa kluczowe, streszczenie i atrybuty tytułu i dla zmiennejlong\\_nameatrybut. Niektóre zmiany są związane z nowym zastosowaniem ACDD- 1.3.
    * Tabela EDDFromSOSzbiory danych
Z okazjonalnego dodawania nowych rodzajówSOSserwery i zmiany w starych serwerach, staje się coraz trudniejsze dlaERDDAP™automatyczne wykrywanie typu serwera z odpowiedzi serwera. Stosowanie [&lt;SosServerType &gt;] (/ docs / server- admin / datasets # eddtablefrom so-skelem- xml)   (o wartości IOOS\\ _ NDBC, IOOS\\ _ NOS,OOSTethyslub WHOI) jest teraz bardzo zalecane. Jeśli któryś z zestawów danych tego typu ma problemy w nowej wersjiERDDAP, spróbuj ponownie uruchomić GenerateDatasets XmlSOSserwer do generowania nowego kawałkadatasets.xmldla tego zbioru danych. GenerateDatasets Xml pozwoli wypróbować różne&lt;sosServerType &gt; opcje dopóki nie znajdziesz odpowiedniego dla danego serwera. Jeśli nadal masz problemy, proszę daj mi znać problem widzisz i URL serwera i postaram się pomóc.
    * Zestawy danych EDDTableFromFileNames
Niektóre atrybuty, które były zalecaneaddAttributessą teraz sourceAtrybuty. Prawdopodobnie nie musisz nic zmieniać dla istniejących zbiorów danych w Twoimdatasets.xml.
    * Bug fix related to certain requests to EDDTableFromNcCFFiles datasets.
Dodałem również dużą liczbę testów jednostkowych do istniejącej dużej liczby testów jednostkowych podstawowych metod (jest 100 scenariuszy) . Dzięki Eli Hunterowi.
    * Błąd naprawić / małe zmianyEDDGridFromMergeIR.
Dzięki Jonathanowi Lafite i Philippe 'owi Makowskiemu
    * Ustawienie błędu:EDDGridFromErddap teraz działa nawet jeśli zdalny zestaw danych nie maioos\\_categoryatrybuty zmiennych.
Dzięki Kevinowi O 'Brienowi.
    * Błąd naprawić w .graph strony dlaEDDGridzbiory danych, gdy istnieje tylko jedna zmienna osi o więcej niż jednej wartości.
Dzięki Charlesowi Carletonowi.
    * Były inne drobne ulepszenia, zmiany i poprawki błędów.

## Wersja 1.60{#version-160} 
 (wydany 2015- 03- 12) 

*    **Nowe funkcje (dla użytkowników) :** brak
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * STRONGLY ZALECA: Aktualizuj serwer[robots.txt](/docs/server-admin/additional-information#robotstxt)plik zawierający:
Niedopuszczalne: / erddap / files /
    * Informuj problem i rozwiązanie:
Na komputerach Linuksa, jeśli używasz&lt;updateEveryNMillis &gt; z zestawami danych z typem =EDDGridFromFiles, EDDTableFromFiles,EDDGridKopiuj, EDDTableCopy, lub ich podklasy, możesz zobaczyć problem, w którym zestaw danych nie ładuje (od czasu do czasu lub konsekwentnie) z komunikatem błędu: "IOException: Limit użytkowników instancji inofilizacyjnych lub zbyt wiele otwartych plików". Jeśli tak, można rozwiązać ten problem dzwoniąc (jako korzeń) :
echo fs.inotifi.max\\ _ user\\ _ watchers = 65536|tee -a / etc / sysctl.conf
echo fs.inotifi.max\\ _ user\\ _ instantions = 1024|tee -a / etc / sysctl.conf
sysctl -p
Albo użyć wyższych liczb, jeśli problem utrzymuje się. Domyślnie dla zegarków to 8192. Domyślnie dla instancji wynosi 128.\\[UPDATE: Istnieje błąd wJavaco powoduje, że przypadki inercji nie są zbierane śmieci. Ten problem jest uniknięty wERDDAP™v1.66 i wyższa. Więc lepszym rozwiązaniem jest przejście do najnowszej wersjiERDDAP.\\]
    * NoSuchFileException Poprawiono błąd:
Był błąd, który mógł spowodować zbiór danych typu =EDDGridFromFiles, EDDTableFromFiles,EDDGridKopiuj, EDDTableCopy lub ich podklasy, aby nie ładować od czasu do czasu z błędem "NoSuchFileException: _ someFileName _". Błąd jest związany z wykorzystaniem FileVisitor i został wprowadzony wERDDAP™v1.56. Problem jest rzadki i najprawdopodobniej wpłynie na zbiory danych z dużą liczbą często zmieniających się plików danych.
    * Były pewne drobne ulepszenia, zmiany i poprawki błędów.

## Wersja 1.58{#version-158} 
 (wydany 2015- 02- 25) 

*    **Nowe funkcje (dla użytkowników) :** 
    * Nowy["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)system pozwala na przeglądanie wirtualnego systemu plików i pobieranie plików źródłowych z wieluERDDAP™zestawów danych. W"files"system jest domyślnie aktywny, aleERDDAP™administratorzy mogą go wyłączyć poprzez umieszczenie
```
        <filesActive>false</filesActive>  
```
wERDDAP™setup.xml. Specjalne podziękowania dla Philippe 'a Makowskiego, który uparł się, gdy powoli doceniałem piękno tego pomysłu.
    * czas przeznaczenia Max... Wcześniej zmienna czasu zbiorów danych EDDTable z danymi zbliżonymi do czasu rzeczywistego miała destinationMax z NaN, co oznaczało, że maksymalna wartość czasu dla zbioru danych jest świeża, ale nie dokładnie znana i często się zmienia. DestinationMax ma prawdziwą wartość, wskazując na to, że znany jest ostatnio. Wiele zbiorów danych ma stale aktualizowane dane.ERDDAP™obsługuje dostęp do najnowszych danych, nawet jeśli jest to po obecnie znany ostatni raz. Zauważ, że nowy [&lt;updateEveryNMillis &gt;] (/ docs / server- admin / datasets # updateeevernmillis) wsparcieEDDGridPliki FromFiles i EDDTable Dane FromFiles aktualizują destinationMax zmiennej czasu. Inną konsekwencją tej zmiany jest to, żedatasetID=allDatasetszestaw danych zawiera obecnie aktualnie znany ostatni raz w kolumnach maxTime. Dzięki Johnowi Kerfootowi.
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * STRONGLY ZALECA: Aktualizuj serwer[robots.txt](/docs/server-admin/additional-information#robotstxt)plik zawierający:
Niedopuszczalne: / pliki /
Niedopuszczalne: / erddap / files /
    * Próbkadatasets.xml-- W zeszłym roku zaleciliśmy kilka doskonałych zbiorów danych w straży przybrzeżnejERDDAP™które można dodać do swojegoERDDAP™po prostu dodając kilka linii dodatasets.xml. Jeśli dodałeś zestaw danych erdVH, przełącz na nowszy zestaw danych erdVH2:
        * Zrób kopię wszystkich zbiorów danych erdVH i zmień skopiowanedatasetIDod erdVH... do erdVH2... i zmienić odniesieniesourceUrlOd erdVH... do erdVH2....
        * Ustaw zbiór danych erdVH na aktywny = "false".
    * WszystkieEDDGridPliki FromFiles i EDDTable Podklasy FromFiles teraz wspierać [&lt;accessibleViaFiles &gt;] (/ docs / server- admin / datasets # accessibleviafiles) udostępnienie plików danych źródłowych za pośrednictwem"files"systemy. Domyślnie ten system jest wyłączony dla każdego zbioru danych. Musisz dodać znacznik, aby go włączyć. Dzięki Philippe 'owi Makowskiemu.
    * WszystkieEDDGridPliki FromFiles i EDDTable Podklasy FromFiles teraz wspierać [&lt;updateEveryNMillis &gt;] (/ docs / server- admin / datasets # updateeevernmillis) . Domyślnie ten system jest wyłączony dla każdego zbioru danych. Musisz dodać znacznik, aby go włączyć. Dzięki Dominic Fuller- Rowell i NGDC.
    * Nowy[Nazwy EDDTableFromFileName](/docs/server-admin/datasets#eddtablefromfilenames)tworzy zbiór danych z informacji o grupie plików w systemie plików serwera, ale nie obsługuje danych z plików. Na przykład jest to przydatne do rozpowszechniania zbiorów plików graficznych, plików audio, plików wideo, plików do przetwarzania słów i arkuszy kalkulacyjnych. Działa ręcznie z nowym["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)system, aby użytkownicy mogli pobrać pliki. Specjalne podziękowania dla Philippe 'a Makowskiego, który uparł się, gdy powoli doceniałem piękno tego pomysłu.
    * Nowy[EDDGridTabela FromEDDTable](/docs/server-admin/datasets#eddgridfromeddtable)pozwala przekształcić tabelaryczny zbiór danych w zawiązany zestaw danych. Dzięki Ocean Networks Canada.
    * Nowy[EDDGridPliki FromMergeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles)dane zagregowane z grupy lokalnych MergeIR.gzpliki.EDDGridFromMergeIRFiles ma rozróżnienie jako pierwszy kawałek kodu przyczynił się doERDDAP. Zrobiono to całkowicie bez naszej pomocy. Trzy okrzyki i specjalne podziękowania dla Jonathana Lafite i Philippe Makowskiego z R.Tech Engineering.
    * Istnieje nowy, opcjonalny znacznik setup.xml,&lt;unitTestDataDir &gt;, który określa katalog z jednostkowymi plikami danych testowych, które są dostępne za pośrednictwem nowego repozytorium GitHub:[ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest). Na przykład:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
To nie jest jeszcze przydatne, ale jest częścią ruchu w kierunku zrobienia jak najwięcej testów jednostkowych biegnących przez innych ludzi, jak to możliwe. Dzięki Terry Rankine.
    * Było wiele drobnych ulepszeń, zmian i poprawek błędów.

## Wersja 1.56{#version-156} 
 (wydany 2014- 12- 16) 

*    **Nowe funkcje (dla użytkowników) :**   (Brak) 
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * Pewnie już wiesz o[EDDGridFromErddap](/docs/server-admin/datasets#eddfromerddap)oraz[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap)które pozwalają na połączenie do zbiorów danych w innychERDDAPs i niech pojawiają się wERDDAP. Prośby użytkowników o rzeczywiste dane z tych zbiorów danych są kierowane niewidocznie do źródłaERDDAP™więc dane nie przepływają przez system ani nie korzystają z przepustowości. Istnieje obecnie duża lista zalecanych zbiorów danych w próbcedatasets.xmlerddapContent.zip. Aby włączyć je do swojegoERDDAP™Musisz tylko skopiować i wkleić te, które chcesz do swojegodatasets.xml. Dzięki Conorowi Delaney.
    * Jeśli kompilujeszERDDAP™Musisz dodać coś nowego. pliki jar do Twojego[przełącznik classpath -cp](/docs/contributing/programmer-guide#development-environment)Javac i Java.
    * Nowy[EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra)obsługuje uzyskiwanie danych z[Cassandra](https://cassandra.apache.org/). Dzięki Ocean Networks Canada.
    * Nowy[Pliki EDDTableFromColumnarasciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles)obsługuje uzyskiwanie danych z plików ASCII z kolumnami o ustalonej szerokości. Dzięki Philippe 'owi Makowskiemu.
    * WszystkieEDDGridPliki FromFiles i EDDTable Podklasy FromFiles teraz używać nowej metody, FileVisitor (dodane doJavaw 1, 7) zebrać informacje o plikach. Może to nie przynieść żadnych korzyści przy pierwszym zbieraniu informacji o pliku dla danego zbioru danych, ale wydaje się mieć ogromne korzyści dla kolejnych zgromadzeń, jeśli zrobić wkrótce, podczas gdy OS nadal ma informacje buforowane. Dzięki NGDC.
        
Nadal zalecamy: Jeśli zbiór danych ma dużą liczbę plików (np. &gt; 1 000) , system operacyjny (i tym samymEDDGridPliki FromFiles i pliki EDDTableFromFiles) będzie działać znacznie efektywniej, jeśli przechowujesz pliki w serii podkatalogów (jeden na rok lub jeden na miesiąc dla zbiorów danych z bardzo częstymi plikami) tak, aby nigdy nie było dużej liczby plików w danym katalogu.
        
    * Kilka małych ulepszeń EDDTableFromAsciiFiles.
    * Pewne ulepszenia EDDTableFromAsciiServiceNOS, w szczególności w celu uzyskania dodatkowych kolumn informacji od źródła. Dzięki Lynn DeWitt.
    * Niektóre małe poprawki błędów związane z ISO 19115, żeERDDAP™generuje. Dzięki Annie Milan.

## Wersja 1.54{#version-154} 
 (wydany 2014- 10- 24) 

*    **Nowe funkcje (dla użytkowników) :** 
    * Niektóre zmienne pracują teraz z czasem w milisekundach precyzji, np., 2014-10-24T16: 41: 22.485Z. Dzięki Dominic Fuller- Rowell.
*    **Małe zmiany / Fixes błędów:** 
    * Bug fix: z pewną kombinacją okoliczności,EDDGridZestawy danych FromNcFile zwracane z mniejszą precyzją (np. pływaki zamiast podwójnych) . Może to mieć wpływ tylko na wartości danych z ponad 8 znaczącymi liczbami. Przepraszam. (I to był klasyczny błąd programowania komputera: jeden zły znak.) Dzięki Dominic Fuller- Rowell.
    * Wiele drobnych zmian.
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * Zestawy danych Griddap obsługują teraz zmienne osi timestamp i zmienne danych (adestinationNameinne niż"time") . Dzięki Dominic Fuller- Rowell.
    *   ERDDAP™teraz poprawnie obsługuje milisekundytime\\_precision"1970- 01- 01T00: 00: 00.000Z". Jeden celowy dziwak: kiedy pisze czasy do plików zorientowanych na człowieka (np. .csv,.tsv,.json,.xhtml) ,ERDDAP™wykorzystuje określonetime\\_precisionjeżeli zawiera sekundy i / lub sekundy dziesiętne; w przeciwnym wypadku wykorzystuje sekundytime\\_precision"1970- 01- 01T00: 00: 00Z" (dla spójności i zgodności wstecznej) . Dzięki Dominic Fuller- Rowell.
    *   EDDGridFromNcFiles obsługuje teraz czytanie StringdataVariableb.
    *   .ncpliki napisane przez griddap mogą teraz mieć StringdataVariableb.
    * GenerateDatasets Xml zawiera teraz więcej spłukiwania () połączeń w celu uniknięcia problemu nie zapisywania informacji do plików. Dzięki Thierry 'emu Valero.
    * Dokumentacja dla GenerateDatasetsXml została poprawiona, szczególnie w celu podkreślenia, że przełącznik -i działa tylko wtedy, gdy podasz wszystkie odpowiedzi w wierszu poleceń (np. tryb skryptu) . A tryb skryptu jest wyjaśniany. Dzięki Thierry 'emu Valero.
    *   ERDDAP™nie pozwala już na posiadanie dwóch zmiennych w zbiorze danychsourceName. (Jeśli ktoś zrobił to wcześniej, prawdopodobnie doprowadziło to do błędów.) Jak wcześniej,ERDDAP™nie pozwala na posiadanie dwóch zmiennych w zbiorze danychdestinationName.

## Wersja 1.52{#version-152} 
 (wydany 2014- 10- 03) 

*    **Nowe funkcje:**   (brak) 
*    **Małe zmiany / Fixes błędów:** 
    * Inny (mniejsze) zmiana w celuERDDAP™Szybciej.
    * Ulepszenie plików ISO 19115 generowanych przezERDDAP: dodane nowo zalecane&lt;gmd: protokół & gt; wartości (informacje, wyszukiwanie,OPeNDAP:OPeNDAP,ERDDAP: griddap, orazERDDAP:tabledap) wewnątrz&lt;gmd: CI\\ _ OnlineResource & gt;. Dzięki Derrickowi Snowdenowi i Johnowi Maurerowi.
    * Wiele drobnych zmian.
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * Bug fix: GenerateDatasetsXml.sh i DasDds.sh nie były w erddap.war dla 1.48 i 1.50. Teraz są. Dzięki Thierry 'emu Valero.
    * Małe zmiany w niektórych testach prędkości w TestAll, aby uczynić je mniej podatnymi na przypadek. Dzięki Terry Rankine.

## Wersja 1.50{#version-150} 
 (wydany 2014- 09- 06) 

*    **Nowe funkcje:**   (brak) 
*    **Małe zmiany / Fixes błędów:** 
    * ToERDDAP™powinny być znacznie szybsze niż w ostatnich wersjach.
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:**   (nic) 

## Wersja 1.48{#version-148} 
 (wydany 2014- 09- 04) 

*    **Nowe funkcje:** 
    *   ERDDAP™teraz zawsze tworzy tabelaryczny zbiór danych,datasetID=allDatasets, który zawiera tabelę informacji na temat wszystkich zbiorów danych w tymERDDAP. Może być wypytywany jak każdy inny zbiór danych tabelarycznych. Jest to użyteczna alternatywa dla obecnego systemu uzyskiwania informacji o zbiorach danych programowo.
    * Istnieją dwa nowe typy plików wyjściowych dla EDDTable iEDDGrid, .csv0 oraz.tsv0. Są to pliki comma- i tab- oddzielone od siebie, które nie mają linii z nazwami kolumn lub jednostkami. Dane zaczynają się na pierwszej linii. Są one szczególnie przydatne dla skryptów, które chcą tylko jeden kawałek informacji zERDDAP.
*    **Małe zmiany / Fixes błędów:** 
    * Mapy mogą być teraz wykonane, aby przetrwać w zakresie -720 do 720.
    * Nowy.ncTyp pliku odpowiedzi ml jest dostępny dla wszystkichEDDGridzestawów danych. Zwraca[NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)\\ -sformatowany opis zbioru danych (podobny do połączonego .dds + .das) .
    * Błąd fix: Zapisywanie danych tabelarycznych do.ncplik był ograniczony do 100.000 wartości na zmienną. Teraz jest tylko ograniczony do 2 GB całkowitego rozmiaru pliku. Dzięki Kevinowi O 'Brienowi.
    * Bug fix: saveAsMatlabmetody zapewniają, żedatasetIDs są konwertowane na bezpieczneMatlabnazwy zmiennych. Ale nadal stanowczo zalecam, abyś stworzyłdatasetIDs, które są poprawnymi nazwami zmiennych: zaczynając od litery, a następnie po prostu używając A- Z, a- z, 0- 9 i\\ _. Patrz[datasetID](/docs/server-admin/datasets#datasetid). Dzięki Luke 'owi Campbellowi.
    * Błąd w bazie danych EDDTableFromDatabase: Z niektórych rodzajów baz danych, NO\\ _ Odpowiedź na dane z bazy danych doprowadziła do bezsensownego 30-sekundowego opóźnienia wERDDAP. Dzięki Gregowi Williamsowi.
    * Ustawienie błędu:EDDGridWykres A z wykresem typu = linie (lub markery lub markery i linie) zmusił zmienną osi x do czasu. Teraz to może być każda oś. Dzięki Lynn DeWitt.
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * ZALECANE OGÓLNIE: AktualizacjaJava  
Ta wersjaERDDAP™wymagaJava7 lub więcej, aleJava7 osiągnie swój koniec życia w kwietniu 2015 r. (Wkrótce&#33;) , więc teraz jest dobry czas, aby przejść doJava8. WięcJava8 ZALECA SIĘ. TestujęJava8. Zapamiętaj toJava6 osiągnął swój koniec życia w lutym 2013 r. (Koniec z usuwaniem błędów&#33;) .
    * ZALECANE OGÓLNIE: Aktualizacja Tomcat
Jeśli używasz Tomcat, przełącz na najnowszą wersję Tomcat. Tomcat 8 jest przeznaczony do pracy zJava8.
    * "ERDDAP"nie jest już akronimem. Teraz to tylko imię. Nie chcę, żeby to imię podkreślałoERD. ChcęERDDAP™aby podkreślić swoją instytucję i dane.
    * Proszę.[dostosować wyglądERDDAP™instalacja, aby podkreślić swoją instytucję i dane](/docs/server-admin/deploy-install#customize). Z godziną pracy, można dokonać ładnych ulepszeń, które będą trwać wiecznie.
    * W setup.xml&lt;displayDiagnosticInfo &gt; opcja jest teraz zawsze ignorowana i traktowana tak, jakby wartość była fałszywa.
ZALECANE:&lt;displayDiagnosticInfo &gt; tag i powiązane informacje z setup.xml.
    * W setup.xml, domyślnie dla&lt;drawLandMask&gt; było "over", ale teraz jest "under", co jest lepszym standardem ogólnym (działa dobrze ze wszystkimi zbiorami danych) .
    * Skrypty GenerateDatasetsXml.sh i DadDds.sh Linux używają teraz bash zamiast csh i mają rozszerzenie .sh. Dzięki Emilio Mayorga
    * GenerateDatasets Xml i DasDds tworzą teraz własne pliki dziennika (GenerateDatasetsXml.log i DasDds.log) i pliki wyjściowe (GenerateDatasetsXml.out i DadDds.out) in _ bigParentDirectory _ / logs /, i nigdy nie umieszczaj ich wyników na schowku.
    * GenerateDatasets Xml obsługuje teraz parametr linii poleceń -i, który wprowadza wyjście do określonego pliku w określonym miejscu. Patrz[dokumentacja](/docs/server-admin/datasets#generatedatasetsxml). Dzięki Terry Rankine.
    * EDDTableFromDatabase obsługuje teraz&lt;ColumnNameQuotes &gt;&lt;/ columnNameQuotes &gt;, z poprawnymi wartościami " (domyślny) ", albo nic. Ten znak (jeżeli istnieje) będą używane przed i po nazwach kolumn w zapytaniach SQL. Różne rodzaje baz danych, skonfigurowane na różne sposoby, będą wymagały różnych znaków nazw kolumn.
    * Tabular szerokość i długość geograficzna zmienne mogą teraz dostosowaćlong\\_name's, np., Profil Szerokość. Wcześniej, mogły być tylko Szerokość i Długość.
    * Od teraz należy określić "defaultDataQuery" i "defaultGraphQuery" jako atrybuty w globalnych metadanych zbioru danych (np.&lt;addAtts &gt;), nie jako oddzielne&lt;defaultDataQuery &gt; oraz&lt;defaultGraphQuery &gt; tagi. (Chociaż jeśli nadal podasz je przez znaczniki,ERDDAP™automatycznie tworzy atrybuty globalne z informacjami.) 

## Wersja 1.46{#version-146} 
 (wydany 2013- 07- 09) 

*    **Nowe funkcje:** 
    *    (Brak) 
*    **Małe zmiany / Fixes błędów:** 
    * Bug fix: W EDDTableFromDatabase, tylko w wersji 1.44,ERDDAP™nieprawidłowo zacytował nazwę tabeli bazy danych w deklaracjach SQL. To już naprawione. Dzięki Kevinowi O 'Brienowi.
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    *    ** Jeśli nie modyfikujesz standardowych wiadomości w messages.xml,
Usuń\\[tomcat\\]/ content / erddap / messages.xml. **   
Domyślny plik messages.xml jest teraz w erddap. plik wojenny, nie erddapContent.zip. Więc nie musisz już ręcznie aktualizować wiadomości. xml.
    * Jeśli modyfikujesz wiadomości w messages.xml, od teraz, za każdym razem aktualizacjiERDDAP™albo:
        * Dokonaj tych samych zmian co wcześniej do nowego
            \\[tomcat\\]/ webapps / erddap / WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml.
I ten jeden raz: usunąć\\[tomcat\\]/ content / erddap / messages.xml.
        * Lub dowiedzieć się, co zmieniło się w nowych komunikatów.xml (przez diff) i zmodyfikować
            \\[tomcat\\]/ content / erddap / messages.xml plik odpowiednio.

## Wersja 1.44{#version-144} 
 (wydany 2013- 05- 30) 

*    **Nowe funkcje:** 
    * Zapytania do zbiorów danych EDDTable teraz obsługują &orderByMin (...) iorderByMinMax (...)   (który zwraca dwa wiersze w każdej grupie, z minimalnym i maksymalnym ostatnimorderBywartość) . Dzięki Lynn DeWitt.
    * Są dwie nowetabledaptypy plików:.ncCFHeader oraz.ncCFMAHeader (które zwracają nagłówek typu ncdump-.ncCF oraz.ncTypy plików CFMA) . Dzięki Steve 'owi Hankinowi.
*    **Małe zmiany / Fixes błędów:** 
    * Bug fix: ładowanie stron .graph i .html dla zbiorów danych z mnóstwem wartości czasu było powolne, ponieważERDDAP™był powolny przy generowaniu opcji suwaka czasu. Teraz jest zawsze szybki. Dzięki Michaelowi Barry 'emu, OOICI i Kristianowi Sebastianowi Blalidowi.
    * Ustawienie błędu: W niektórych typach zbiorów danych EDDTable ograniczenia czasowe nie zawsze były prawidłowo obsługiwane. Teraz są. Dzięki Johnowi Maurerowi i Kevinowi O 'Brienowi.
    * Naprawianie błędów: zbiory danych nie wczytywały się, gdy wszystkiesubsetVariablesbyły zmiennymi wartości stałych. Teraz to zrobią. Dzięki Lynn DeWitt i Johnowi Petersonowi.
    * ULEPSZONE: teraz, wszystkie pytania dla tylko podzakreślonych zmiennych działają tak, jakby & odrębne () jest częścią zapytania.
    * Ulepszone: teraz, dla zapytań, które obejmują &.jsonp = _ functionName _, _ function Nazwa _ MUSI być teraz serią 1 lub więcej (periody- separacja) słowa. Każde słowo musi zaczynać się od litery ISO 8859 lub "\\ _", po której następuje 0 lub więcej liter, cyfr lub "\\ _" ISO 8859. Tak, to jest bardziej restrykcyjne niżJavaWymagania skryptu dla nazw funkcji.
    * Oś czasu na wykresach działa teraz dobrze dla dłuższych zakresów czasowych (80 - 10000 lat) oraz krótsze przedziały czasowe (0,003 - 180 sekund) .
    *   ERDDAP™jest teraz bardziej przebaczające, gdy parsując odmiany danych czasu w formacie ISO- 8601.
    * Było wiele innych drobnych zmian i poprawek błędów.
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    *    **MUSISZ zaktualizować do najnowszej wersji, aby być bezpieczne.**   
        ERDDAP™Przeszedł audyt bezpieczeństwa. Były tam robaki i słabości. Wersja 1.44 zawiera kilka ważnych poprawek błędów bezpieczeństwa i kilka zmian w celu zwiększenia bezpieczeństwa i dostępności (np. dla osób z upośledzeniem wzroku) . Wersja 1.44 przeszła kolejny audyt bezpieczeństwa. Dzięki wszystkim dobrym ludziom w USGS i Acunetix, którzy to umożliwili. (Nie powinienNOAARobić to?) 
    * Nowy[Tabela EDDFromWFSPliki](/docs/server-admin/datasets#eddtablefromwfsfiles)tworzy lokalną kopię wszystkich danych zArcGISMapServerWFSserwer i tak dane mogą być następnie szybko ponownie podawane doERDDAP™użytkowników. Dzięki Christy Caudill.
    * Nowy[Tabela EDDFromEDDGrid](/docs/server-admin/datasets#eddtablefromeddgrid)pozwala utworzyć zestaw danych EDDTable zEDDGridzestaw danych. Powszechnymi przyczynami takiego postępowania są:
        * Pozwala to na sprawdzenie zbioru danychOPeNDAPograniczenia wyboru (które użytkownik mógł zażądać) .
        * Zestawienie danych jest z natury zbiorem danych tabelarycznych. Dzięki OOICI, Jim Potemra, Roy Mendelssohn.
    * Zmienna nazwa "głębokość" jest obecnie specjalną alternatywą dla "wysokości". Jednostki muszą być jakimś wariantem "metrów". Wartości danych muszą być dodatnie = w dół.ERDDAP™jest teraz w pełni świadomy znaczenia "głębokości" i wspiera go wszędzie tam, gdzie wysokość jest obsługiwana (np. jako składnik zestawu danych profilu CF DSG cdm\\ _ data\\ _ type = profile) . Zestaw danych nie może posiadać zarówno zmiennych "głębokości", jak i "wysokości".
    * Wdatasets.xml, należy usunąć wszelkie zastosowania&lt;att name = "cdm\\ _ highway\\ _ proxy" &gt; głębokość&lt;/ att &gt; ponieważ głębokość jest teraz wyjątkową alternatywą dla wysokości, a więc nie musi być specjalnie zidentyfikowany.
    * Wdatasets.xml, należy usunąć wszelkie zastosowania&lt;alcatremetersPerSourceUnit &gt;, z wyjątkiem EDDTable OdSOS.
Kiedy wartość wynosi 1, po prostu go usuń.
Gdy wartość wynosi -1, należy zmienić nazwę zmiennej na głębokość.
Dla innych wartości, dodać do&lt;addAttributes&gt; na przykład:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Wszystkie zestawy danych obsługują teraz
        
        *   &lt;defaultDataQuery &gt;, który jest używany, jeśli .html jest wymagane bez zapytania.
            * Prawdopodobnie rzadko będzie to konieczne.
            * W przypadku zbiorów danych griddap powszechnym zastosowaniem jest określenie innej wartości domyślnej głębokości lub wysokości (np.,\\[0\\]zamiast\\[ostatni\\]) .
W każdym razie należy zawsze wymienić wszystkie zmienne, zawsze używać tych samych wartości wymiarów dla wszystkich zmiennych i prawie zawsze używać\\[0\\],\\[ostatni\\]lub\\[0: ostatni\\]dla wartości wymiarów.
Na przykład:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * Dlatabledapzbiory danych, najczęściej używane jest do określenia innego domyślnego zakresu czasowego (względem teraz, np., & time & gt; =now-1 dzień) .
Pamiętaj, że żądanie braku zmiennych danych jest takie samo jak podanie wszystkich zmiennych danych, więc zazwyczaj możesz po prostu podać nowe ograniczenie czasowe.
Na przykład:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;defaultGraphQuery &gt;, który jest używany, jeśli .graph jest wymagane bez zapytania.
            * Prawdopodobnie rzadko będzie to konieczne.
            * W przypadku zbiorów danych griddap najpowszechniejszym zastosowaniem jest określenie innej wartości domyślnej głębokości lub wysokości (np.,\\[0\\]zamiast\\[ostatni\\]) i / lub w celu określenia, że określona zmienna jest graficzna.
W każdym razie, będziesz prawie zawsze używać\\[0\\],\\[ostatni\\]lub\\[0: ostatni\\]dla wartości wymiarów.
Na przykład:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * Dlatabledapzestawy danych, najczęstsze zastosowania tego są do określenia różnych zmiennych, które mają być grafikowane, inny domyślny zakres czasowy (względem teraz, np., & time & gt; =now-1 dzień) i / lub różne domyślne ustawienia graficzne (np. typ znacznika) .
Na przykład:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Pamiętaj, że potrzebujesz kodu XML- encode lub en- encode (albo jeden, ale nie oba) domyślne zapytania, ponieważ znajdują się w dokumencie XML. Na przykład, & amp; amp;,&lt;staje się & amp; lt;, i &gt; staje się & amp; gt;.
I proszę sprawdzić swoją pracę. Łatwo jest popełnić błąd i nie dostać tego, czego się chce.
Dzięki Charlesowi Carletonowi, Kevinowi O 'Brienowi, Luke' owi Campbellowi i innym.
    *   EDDGridFromDap,EDDGridFromErddap i EDDTableFromEDDGridmieć nowy system do czynienia z zestawami danych, które często się zmieniają (tak często, jak mniej więcej co 0,5 s) . W przeciwieństwie doERDDAPregularny, proaktywny system do całkowitego przeładowania każdego zbioru danych, ten opcjonalny dodatkowy system jest reaktywny (wywołany żądaniem użytkownika) oraz przyrost (tylko aktualizowanie informacji, które muszą być aktualizowane) . Na przykład, jeśli wniosek doEDDGridZestaw danych FromDap występuje częściej niż określona liczba milisekund od ostatniej aktualizacji,ERDDAP™będzie sprawdzić, czy są jakieś nowe wartości dla lewej (zwykle"time") rozmiar i, jeśli tak, po prostu pobrać te nowe wartości przed obsługą żądania użytkownika. System ten jest bardzo dobry w utrzymaniu szybko zmieniających się zbiorów danych up- to- date z minimalnymi wymaganiami dotyczącymi źródła danych, ale kosztem nieznacznego spowolnienia przetwarzania niektórych żądań użytkowników. Zobacz&lt;updateEveryNMillis &gt;] (/ docs / server- admin / datasets # updateeevernmillis)   
Dzięki Michaelowi Barry 'emu i OOICI.
    *   EDDGridPliki FromNcFiles, EDDTableFromNcFiles i EDDTableFromNcCFFiles teraz wspierać[NcML.ncml](/docs/server-admin/datasets#ncml-files)pliki źródłowe zamiast.ncpliki. Dzięki Jose B Rodriguez Rueda.
    * DlaEDDGridAgregateExistingDimension,ERDDAP™obsługuje nową opcję serverType = "dodsindex" dla atrybutu serverType&lt;sourceUrls &gt; tag. Działa to na stronach internetowych, które mają listy plików wewnątrz&lt;przed &gt;&lt;/ pre &gt; i często poniżejOPeNDAPlogo. Przykładem jest[ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html).
    * Dla EDDTableFromSOSteraz obsługuje opcjonalny znacznik
```  
        <sosServerType>_serverType_</sosServerType>  
```
więc można określić rodzajSOSserwer (więcERDDAP™nie musi tego rozgryzać) . Ważne wartości&lt;_ serverType _\\ & gt; to IOOS\\ _ NDBC, IOOS\\ _ NOS,OOSTethysi WHOI (nowo obsługiwany serwer Rodzaj) . Patrz[Tabela EDDFromSOS](/docs/server-admin/datasets#eddtablefromsos). Dzięki Derrickowi Snowdenowi i Janet Fredericks.
    * WszystkieEDDGridZ plików, EDDTableFrom,EDDGridKopiuj i EDDTable Kopiuj teraz obsługuje opcjonalny znacznik
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
które mogą stwierdzićERDDAP™do przechowywania pliku Tabela (z informacjami o każdym pliku danych źródłowych) w pamięci zamiast tylko na dysku (domyślny) . Utrzymanie tabeli plików w pamięci przyspiesza żądania dotyczące danych (szczególnie jeśli są &gt; 1000 plików danych źródłowych) Ale używa więcej pamięci. Jeśli ustawisz to na true dla dowolnego zbioru danych, miej oko na Pamięć: aktualnie używaj linii na _ yourDomain _/erddap/status.htmlzapewnienie, żeERDDAP™Nadal ma mnóstwo pamięci. Dzięki Fredrikowi Strayowi.
    * Pliki EDDTableFromASCIIFiles teraz obsługuje&lt;charset &gt;. Dwa najczęściej stosowane zestawy znaków (Wrażliwy przypadek&#33;) ISO- 8859-1 (domyślny) oraz UTF- 8.
    * Zalecane: w setup.xml, wewnątrz&lt;startHeadHtml &gt;, proszę zmienić&lt;html &gt; do
        &lt;html lang = "en- US" &gt; (lub inny[kod języka](https://www.w3schools.com/tags/ref_language_codes.asp)jeśli przetłumaczyłeś messages.xml) .
    * setup.xml posiada nowe opcjonalne znaczniki do wyłączenia częściERDDAP:
        *   &lt;convertersActive &gt; false&lt;/ convertersActive &gt;&lt;-- wartość domyślna jest prawdziwa -- &gt;
        *   &lt;slideSorterActive &gt; false&lt;/ slideSorterActive &gt;&lt;-- wartość domyślna jest prawdziwa -- &gt;
        *   &lt;wmsActive &gt; false&lt;/ wmsActive &gt;&lt;-- wartość domyślna jest prawdziwa -- &gt; Ogólnie zaleca się, aby nie ustawiać żadnej z tych wartości na false.
    * GenerateDatasets Xml teraz zapisuje wyniki do _ bigParentDirectory _ / logs / generateDatasetsXmlLog.txt, nie log.txt. Dzięki Kristianowi Sebastianowi Blalidowi.
    * GenerateDatasets Xml robi teraz dobrą sugestię dla&lt;przeładowanie Każdy protokół &gt;. DziękiNOAAProjekt UAF.
    * Wiele małych ulepszeń GenerateDatasetsXml. DziękiNOAAProjekt UAF.

## Wersja 1.42{#version-142} 
 (wydany 2012- 11- 26) 

*    **Nowe funkcje:** 
    *    (Żadnych nowych cech.) 
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * Jeśli uaktualniaszERDDAP™1.38 lub 1.40, nie było zmian, które wymagałyby dokonania zmian w plikach konfiguracyjnych (ale musisz użyć nowego pliku messages.xml) .
    *   ERDDAP™jeszcze raz można uruchomić zJava1.6. (ERDDAP™v1.40 wymaganeJava1.7.) Nadal stanowczo zalecamy użycie najnowszej wersjiJava1.7.
    * Nowy typ zbioru danych,[Tabela EDDFrom Pliki AwsXmlFiles](/docs/server-admin/datasets#eddtablefromawsxmlfiles), może odczytać dane z zestawu Automatic Weather Station (AWS) Pliki danych XML. Dzięki Lynn Dewitt i Exploratorium.
*    **Małe zmiany / Fixes błędów:** 
    * Dostosowana do zmian w NDBCSOSserwery danych źródłowych.
    * Dostosowana do zmian w usługach ASCII NOS COOPS.
    * Dokonałem kilku drobnych zmian i poprawek błędów.

## Wersja 1.40{#version-140} 
 (wydany 2012- 10- 25) 

*    **Nowe funkcje:** 
    * Istnieje nowy format pliku wyjściowego dlatabledapzbiory danych:.ncCFMA, który zapisuje wymagane dane w.ncplik zgodny z CF[Geometrie do pobierania próbek dyskretnych](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Opcje wielowymiarowej tablicy, a zatem zgodne z szablami NODC\\[2021: teraz[Pozycje pozabilansowe](https://www.ncei.noaa.gov/netcdf-templates)\\]do przechowywania tego typu danych. Dzięki NODC.
    *   tabledapWnioski mogą teraz zawierać ograniczenia czasowe, takie jak & czas &gt;now-5 dni. Patrz[dokumentacja](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Dzięki Jamesowi Goslingowi.
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * Jeśli uaktualniaszERDDAP™1.38, nie było zmian, które wymagałyby dokonania zmian w plikach konfiguracyjnych (ale musisz użyć nowego pliku messages.xml) .
    *   ERDDAP™public releases and internal memoriones are available via[ERDDAP™w sprawie GitHub](https://github.com/ERDDAP). Więcej informacji na ten temat znajduje się w:[Wiki](https://github.com/ERDDAP/erddap/wiki)dlaERDDAP™projekt, jak również bardziej ogólne[ERDDAP™Przewodnik programisty](/docs/contributing/programmer-guide). (Zostało to ogłoszone oddzielnie kilka tygodni poERDDAP™1.38.) 
    * GenerateDatasets Xml uległ poprawie.
        * Skrypt został zmieniony, więc powinien działać poprawnie na wszystkich komputerach Linuksa (nie tylko kilka) .
        * Teraz dodajecreator\\_name,creator\\_emailorazcreator\\_urlO ile to możliwe.
        * Wiele innych drobnych ulepszeń.
    * Rafined howERDDAP™zajmuje się czasem.
        * Wewnętrznie,ERDDAP™teraz obsługuje czasy przy milisekundowej precyzji (nie sekundy) .
        * Teraz można opcjonalnie określić precyzję czasu dla danego zbioru danych, patrz[time\\_precision](/docs/server-admin/datasets#time_precision). Na przykład, można ustawić zbiór danych, aby wyświetlić wartości czasu z precyzją daty (np. 1970- 01- 01) .
        * Bieżące zbiory danych będą używać domyślnych ustawień, więc zmiany te nie mają na nie wpływu i będą nadal wyświetlać czas z dokładnością sekund. Dzięki Servet Cizmeli i Philipowi Goldstein.
    *   [Pliki EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles)jest nowym typem zbioru danych, który można użyć w Twoimdatasets.xmlplik. Może odczytywać dane z wielu formatów plików zdefiniowanych przez[CF Geometrie do pobierania próbek dyskretnych](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)konwencje. Dzięki NODC i specjalne podziękowania Kyle Wilcox za tworzenie przykładowych plików dla ogromnej liczby ważnych formatów plików DSG i za udostępnianie ich publicznie.
*    **Małe zmiany / Fixes błędów:** 
    * Rozszerzony[szybkie wznowienie](#quick-restart)system dla wszystkich istotnychEDDGridoraz podklasy tabeli EDD.
    * Ulepszona dokumentacja, w szczególności dotycząca sposobu stosowania[griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType)oraz[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType)z różnych oprogramowania klienta.
    * Zmieniono zaawansowane wyszukiwanie w celu wsparcia minTime i / lub maxTime wyrażonych jako epochSeconds. Dzięki Lynn Dewitt.
    * Zmieniono.htmlTablewyjście do wyświetlania urls i adresy e-mail jako linki.
    * Dodano "rel =" i "rev =" do odpowiedniego&lt;href &gt; tagi. Dzięki Pat Cappelaere zOGC RESTprojekt.
    * Lepsza ochrona przed nierealistycznie dużymi wnioskami o dane, zwłaszcza w ramachtabledap, gdzie jest to trudniejszy problem.
    * Przeniósł więcej wiadomości do wiadomości.
    * Poprawił prędkość.
    * NaprawionoEDDGridFromFiles pozwala na schodzenie sortowane osie. Dzięki Maricel Etchegaray.
    * Usunięto odniesienia do iGoogle, ponieważ zostanie on przerwany.
    * Dokonałem kilku drobnych zmian i poprawek błędów.

## Wersja 1.38{#version-138} 
 (wydany 2012- 04- 21) 

*    **Nowe funkcje:** 
    * ISO 19115 i FGDC...ERDDAP™może automatycznie generować pliki metadanych XML ISO 19115 i FGDC dla każdego zbioru danych. Linki do plików są widoczne na każdej liście zbiorów danych (np. z pełnego wyszukiwania tekstu) oraz w folderach internetowych (WAF)   (Patrz[FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/)oraz[ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/)) . Dzięki Tedowi Habermannowi, Dave Neufeld i wielu innym.
    * Full Text Searches for Datasets teraz obsługuje\\ - _excludedWord_ i\\ - "_ excluded frazy _". Dzięki Rich Signellowi.
    * Poszukiwanie zbiorów danych teraz zwraca wyniki strony na raz. Domyślnie używa łańcucha parametrów: page = 1 & itemsPerPage = 1000, ale możesz zmienić wartości w URL swojego żądania. Dzięki Steve 'owi Hankinowi i projektowi UAF.
    *   OpenSearch--ERDDAP™teraz wspiera[OpenSearch1, 1](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html)standard wyszukiwania zbiorów danych. Między innymi, to pozwala katalogi agregacji stron internetowych do prowadzenia rozproszonych wyszukiwań (przekazywanie żądania wyszukiwania do każdego katalogu, o którym wie) .
    * przecinek oddzielony Wartość (CSV) Pliki...ERDDAP™teraz generuje pliki CSV z przecinkiem pomiędzy wartościami (które Excel preferuje) , zamiast przecinek + przestrzeń. Dzięki Jeffowi DeLaBeaujardere.
    * Miliony danych... Wprowadzono kilka zmian w celu wsparciaERDDAPMa mnóstwo zbiorów danych, może nawet milion. Dzięki Steve 'owi Hankinowi i projektowi UAF.
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
#### Szybkie wznowienie{#quick-restart} 
*   [A](#quick-restart)system szybkiego restartu pozwalaERDDAP™by zacząć od nowa dużo szybciej.
     **Proszę dodać to do pliku setup.xml** zaraz po&lt;/ datasetsRegex &gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Pełne wyszukiwanie tekstu dla zbiorów danych można teraz wykonać za pomocą wyszukiwarki Lucene (chociaż zalecamy oryginalną wyszukiwarkę jeśli masz mniej niż 10 000 zbiorów danych) lub oryginalny system wyszukiwania.
         **Proszę dodać to do pliku setup.xml** zaraz po&lt;/ displayDiagnosticInfo &gt;:
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \\* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \\* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    * W setup.xml, można / należy teraz dodać dwie nowe kategorie do listy oddzielonej comma-&lt;categoryAttributes&gt;:
        * global: keywords (dodaj go zaraz po świecie: instytucja) -- nowy przypadek specjalny, który przetwarza oddzieloną od comma- listę słów kluczowych z atrybutu globalnych słów kluczowych, aby dokonać osobnego wpisu dla każdego słowa kluczowego.
        * zmienna Nazwa (dodaj na końcu) -- nowy przypadek specjalny, który klasyfikuje każdy zdataVariable destinationNameb.
    * W setup.xml, można (Ale dlaczego?) powiedziećERDDAP™nie oferować metadanych FGDC i / lub ISO 19115 dla żadnego zbioru danych poprzez włączenie
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Domyślne wartości dla tych ustawień są prawdziwe.
    * Wdatasets.xml, proszę rozważyć poprawę metadanych dla zbiorów danych.ERDDAP™teraz automatycznie generuje pliki metadanych ISO 19115 i FGDC XML dla każdego zbioru danych na podstawie metadanych zbioru danych.
Więc, **dobre metadane zbioru danych prowadzi do dobregoERDDAP-generowane metadane ISO 19115 i FGDC.**   
         **Zobacz nową dokumentację dla wielu nowych ZALECONYCH[Atrybuty globalne](/docs/server-admin/datasets#global-attributes).** 
    * Wdatasets.xml, jeśli chcesz powiedziećERDDAP™korzystanie z wcześniej wytworzonego pliku FGDC i / lub ISO 19115, który znajduje się gdzieś w systemie plików serwera zamiastERDDAP™generować te pliki, używać:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Jeśli _ fullFileName _\\ = "" lub plik nie zostanie znaleziony, zbiór danych nie będzie zawierał metadanych FGDC i / lub ISO 19115. Jest to również przydatne, jeśli chcesz zahamować metadane FGDC i / lub ISO 19115 dla określonego zbioru danych.
    * Wdatasets.xml, dla wszystkichEDDGridSideBySide iEDDGridAgregateExistingWymiary zbiorów danych, upewnij się, że zestawy danych dzieci mają różnedatasetIDs niż ich zbiory danych rodziców i inne dzieci. (Na przykład, mógłbyś podążać za prostym, ale skutecznym systemem George 'a Foremana za nazwaniem jego dzieci.) Jeśli jakiekolwiek nazwiska w rodzinie są dokładnie takie same, zbiór danych nie wczyta (z komunikatem błędu, że wartości zagregowanej osi nie są sortowane) .
    * Wdatasets.xml, były pewne zmiany w liście ważnychioos\\_categorywartości metadanych:
        * "pCO2" zmieniono na "CO2".
        * "Fizyczna oceanografia" została dodana.
        * Dodano "Gleby".
    * Wdatasets.xml,ERDDAP™nie pozwala już '.' wdatasetID. To było dozwolone, ale zniechęcone. (Przepraszam.) 
    * Wdatasets.xml, konfiguracja dla EDDTableFromThreddFiles i EDDTableFromHyraxPliki nieco się zmieniły, ponieważ obie klasy zostały przepisane, aby były bardziej wydajne (obie klasy teraz zawsze zrobić lokalną kopię wszystkich zdalnych plików danych) . Zobacz dokumentację dotyczącą tworzenia tych klas:[Tabela EDDFromHyraxPliki](/docs/server-admin/datasets#eddtablefromhyraxfiles)oraz[Pliki EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). W szczególności zob. zmienione uwagi dotyczące&lt;fileDir &gt; (teraz nieistotne) oraz&lt;sourceUrl&gt; (teraz niezbędne) . Ponadto, nigdy nie należy owijać tej klasy w EDDTableCopy dla efektywności.
    * Wdatasets.xml, jeśli używasz EDDTableFromDatabase zOraclebaza danych, należy włączyć połączenie Nieruchomości takie jak
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
aby określić, ile wierszy danych pobrać w jednym czasie, ponieważ domyślnie jest 10, co jest okropnie nieefektywne. Patrz[Oracledokumentacja](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm). MySql i PostgreSQL wydają się mieć lepsze wartości domyślne dla tego ustawienia. Dzięki Kevinowi O 'Brienowi.
    * Jeśli używasz EDDTableFromDatabase, zobacz poprawę[Dokumentacja "Speed"](/docs/server-admin/datasets#eddtablefromdatabase)dodatkowe sugestie mające na celu poprawę wydajności. Dzięki Kevinowi O 'Brienowi.
    * Wdatasets.xml, dla wszystkich tabel EDD... zestawów danych, w konwencjach iMetadata\\_Conventionsatrybuty globalne, patrz CF- 1.6 (nie CF- 1.0, 1.1, 1.2, 1.3, 1.4 lub 1.5) , ponieważ CF- 1.6 jest pierwszą wersją uwzględniającą zmiany związane z Geometrią Pobierania próbek dyskretnych.
    * Programiści, którzy kompilująERDDAP™kod musi dodać lib / luciene- core.jar do listy plików jar w ścieżkach linii poleceń Javac i Java.
    *   ERDDAP™ma[nowa usługa](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html)konwertuje standardową nazwę CF na / z kluczowego słowa naukowego GCMD. Możesz znaleźć to przydatne przy generowaniu globalnych metadanych słów kluczowych dla zbiorów danych w TwoimERDDAP.
    * Zajmowanie się Bots... Należy zapoznać się z tą radą[zapobiec boty czołganieERDDAP™w głupi sposób](/docs/server-admin/additional-information#robotstxt).
    * Tłumaczenie... TekstERDDAPstrony internetowe są teraz głównie w messages.xml i tak nadaje się do tłumaczenia na różne języki (np. niemiecki, francuski) . Wiadomości teraz często używają MessageFormat do formatowania, również do pomocy w wykonywaniu tłumaczeń. Jeśli jesteś zainteresowany wykonaniem tłumaczenia, proszę wysłać e-mailerd dot data at noaa dot gov.
    * Próbkadatasets.xml-- W próbce było kilka małych, ale znaczących błędówdatasets.xml. W przypadku korzystania z tych zbiorów danych, należy pobrać nowsze wersje z nowej próbkidatasets.xmlw nowym erddapContent.zipplik. Dzięki Jamesowi Wilkinsonowi.
    * Git... Będę się starałERDDAP™projekt GitHub jak najszybciej po wydaniu.
*    **Małe zmiany / Fixes błędów:** 
    * Nowa paleta, OceanDepth, jest przydatna dla wartości głębokości (dodatni jest w dół) , np., 0 (płytki) do 8000 (głęboko) .
    * W.kmlwyjście ztabledapużywa lepszej ikony znacznika (Nie jest zamazany.) . A unoszenie się nad markerem teraz sprawia, że jest większy.
    * Pliki EDDTableFromFiles -- W ostatniej aktualizacji, nowa biblioteka netcdf- java miała surowsze ograniczenia dla nazw zmiennych w.ncpliki. To spowodowało problemy dla EDDTableFromFiles jeśli zmiennasourceNamemiał pewne znaki interpunkcji. Pliki EDDTableFromFiles są teraz modyfikowane, aby uniknąć tego problemu. Dzięki Thomasowi Holcombowi.
    * Strona .subset obsługuje teraz 0 / 10 / 100 / 1000 / 10000 / 100000 zamiast pola wyboru danych powiązanych. Wskazówka ostrzega, że 100000 może spowodować awarię przeglądarki. Dzięki Annette DesRochers, Richard (Abe) Coughlin i projekt biologiczny IOOS.
    * ... / erddap / info / _datasetID_ / index.html strony internetowe pokazują teraz urls i adresy e-mail jako klikalne linki. Dzięki Richardowi. (Abe) Coughlin i projekt biologiczny IOOS.
    * Ustawienie błędu: wtabledap, dla zbiorów danych z wysokością MetersPerSourceUnit&lt;0, zapytania z ograniczeniami wysokości były obsługiwane nieprawidłowo. Dzięki Kyle 'owi Wilcoxowi.
    * Ustawienie błędu:EDDGridAgregateFromExistingDimension obsługuje teraz bardziej zróżnicowane adresy URL TDS. Dzięki?

## Wersja 1.36{#version-136} 
 (wydany 2011- 08- 01) 

*    **Nowe funkcje:** 
    * Brak istotnych zmian z punktu widzenia użytkownika.
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * Zestaw danych pmelTao, który był często używany jako zbiór danych dlatabledap  
dokumentacja nie jest już dostępna.ERDDAP™Administratorzy MUSI wprowadzić następujące zmiany:
        * Wdatasets.xmlJeśli u pacjenta występujedatasetID= "pmelTao" dataset, add
active = "false" tuż przed "&gt;" na końcu tej linii.
        * W ustawieniu.xml, jeśli&lt;EDDTableIdPrzykład &gt; jest pmelTao, a następnie:
            * Jeśli u pacjenta występujedatasets.xmlnie ma zestawu danych zdatasetID= "erdGlobecBottle", add
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * W setup.xml, zastąpić wszystkie znaczniki z&lt;EDDTableIdPrzykład &gt; przez
                &lt;Tabela EDDMatlabPlotPrzykład &gt; z
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \\[baseUrl\\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    * Dla zbiorów danych, w których typ jest podklasą plików EDDTableFromFiles, możesz teraz tworzyć dane z metadanych.
W szczególności, możesz teraz zrobić zmienną z wartości atrybutu jednej z pierwotnych zmiennych.
Na przykładdatasets.xml, w obrębie&lt;dataVariable&gt; tag, jeśli używasz
```
        <sourceName>variable:cruise:PI</sourceName>  
```
        ERDDAP™wytworzy zmienną o wartościach atrybutu PI zmiennej rejsu.
Dzięki WOD.
*    **Zmiany:** 
    * Małe zmiany

## Wersja 1.34{#version-134} 
 (wydany 2011- 06- 15) 

*    **Zmiany:** 
    * Ustawienie błędu: Naprawiono wyciek pamięci, który wystąpił na jakieś 64- bitJavainstalacje.
    * Ustawienie błędu:ERDDAP™Teraz poprawnie ustawia te atrybuty globalne, gdy wartości szerokości geograficznej wahają się od wysokich do niskich: geoprzestrzenne\\ _ lat\\ _ min, geoprzestrzenne\\ _ lat\\ _ max, Południowo-wschodnie\\ _ northing, Northmost\\ _ northing.
        
Zauważ, żeactual\\_rangejest niezmieniony: może mieć niskie, wysokie wartości lub wysokie, niskie wartości, ponieważ ma na celu wskazanie zakresu i kolejności przechowywania.
        
    * Małe zmiany.
    *   ERDDAP™administratorzy nie muszą wprowadzać żadnych zmian w ich setup.xml lubdatasets.xml.

## Wersja 1.32{#version-132} 
 (wydany 2011- 05- 20) 

*    **Zmiany:** 
    * Wsparcie dla nowo ratyfikowanych, dyskretnych geometrii pobierania próbek CF (które niestety nie jest jeszcze dostępne online) , która zastępuje proponowane konwencje obserwacyjne punktów CF.
        ERDDAP™użytkownicy zobaczą, że cdm\\ _ feature\\ _ type = Station jest zastąpiony przez TimeSeries, a w plikach utworzonych dla.ncTyp pliku CF (płaski\\ _ wymiar jest teraz nazywany próbką\\ _ wymiar) .
        ERDDAP™administratorzy będą musieli wprowadzić te zmiany wdatasets.xml:
        * cdm\\ _ data\\ _ type = Station należy zmienić na cdm\\ _ data\\ _ type = TimeSeries.
        * cdm\\ _ data\\ _ type = StationProfile należy zmienić na cdm\\ _ data\\ _ type = TimeSeriesProfile.
        * cdm\\ _ station\\ _ zmiennych należy zmienić na cdm\\ _ timeseries\\ _ zmiennych.
        * cf\\ _ role = stacja\\ _ id należy zmienić na cf\\ _ role = timeseries\\ _ id.
    * Nowyioos\\_categoryOpcje: "Barwna rozpuszczona materia organiczna", "pCO2", "Strumień przepływu", "Całkowita materia zawieszona".
    * Możliwe rozwiązanie ewentualnego wycieku pamięci na 64- bitJava.\\[Nie zadziałało.\\]
    * Małe zmiany.

## Wersja 1.30{#version-130} 
 (wydany 2011- 04- 29) 

*    **Nowe funkcje:** 
    * Wsparcie dla 64- bitJava. W przypadku stosowania z 64 bitamiJava,ERDDAP™może teraz używać o wiele więcej pamięci stos i obsłużyć wiele więcej jednoczesnych żądań.
    * Wsparcie dla.ncżądania plików do 2GB (nawet bez 64- bitJava) poprzez lepsze wykorzystanieERDDAPZajmuje się danymi w kawałkach.
    * Wiele ulepszeń 2X prędkości w kodzie i 2X prędkości zJava1.6 markaERDDAP™2X do 4X szybciej niż wcześniej.
    * Zaoszczędzanie pamięci znacznie niższeERDDAPPodstawowe wykorzystanie pamięci.
    * Dla zbiorów danych tabelarycznych,ERDDAP™jest teraz w pełni świadomy cdm\\ _ data\\ _ type i jak dane mapują do typu CDM. Patrz[CF Specyfikacja dyskretnych geometrii pobierania próbek](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Być może wkrótce plik Word zostanie przekształcony na .html i zastąpi aktualne informacje "OBSOLETE" na tej stronie. DziękiNOAAProjekt UAF.
    * Dla większości zbiorów danych EDDTable, nowa opcja typu pliku wyjściowego,.ncCF, tworzy Contiguous Ragged Array.ncpliki zgodne z najnowszą wersją[CF Konwencje w sprawie dyskretnego pobierania próbek geometrii](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Pliki te mają strukturę odzwierciedlającą typ danych CDM zbioru danych. Ponieważ proponowane konwencje właśnie się zmieniły, od tego zapisu biblioteka netcdf- java nie obsługuje jeszcze czytania formatów plików utworzonych przezERDDAPi interpretuje je jako pliki danych CDM. Prawdopodobnie wkrótce. DziękiNOAAProjekt UAF.
    * Widok: Opcja Distinct Data na stronie .subset jest teraz listą rozwijaną, która pozwala użytkownikom określić maksymalną liczbę wierszy odrębnych danych do oglądania (domyślny = 1000) . Ta zmiana i inni pozwalająERDDAP™do pracy z zbiorami danych, które mają bardzo dużą liczbę rzędów odrębnych danych. (Liczba unikalnych wartości dla każdej pojedynczej zmiennej jest nadal problemem, ale może być dość wysoka (20,000?) przed .subset i innych stron internetowych załadować naprawdę powoli.) DziękiNOAAProjekt UAF.
    * .subset strony internetowe mają nową opcję: View Distinct Data Counts. Dzięki projektowi GTOPP.
    * Aby pomóc użytkownikom, różne wartości (np. nazwy stacji) są teraz wyświetlane na Make- A- Graph i Formularze dostępu do danych. DziękiNOAAProjekt UAF.
    * .przezroczysty Prośby Png teraz obsługują wszystkie typy wykresów i reprezentacji danych. Rysuje tylko dane -- żadnych osi, legend, masek lądowych, czy czegokolwiek innego. Umożliwia to tworzenie obrazów jako warstw transparentPngs. Jeśli & .size = _ width _|_ height _ jest określone w zapytaniu (zalecane) To zaszczyt. Domyślnie 360x360 pikseli. Jedynym wyjątkiem jestEDDGrid& .draw = powierzchnia, gdzie domyślnie (jak wcześniej) jest obrazem o ~ 1 / piksel na punkt danych (do 3000 x i y pikseli) . Dzięki Fredowi Hochstaedterowi.
    * WWMSstrony internetowe pokazują pasek kolorów zmiennej zbioru danych (s) . Dzięki Emilio Mayordze i innym.
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * To wydanie wiąże się z wieloma zmianami. Wszystkie są ważne. Należy być cierpliwym i pracować nad wszystkimi zmianami wymienionymi poniżej.
    * Ta wersja jest wypychany wcześniej niż zamierza się z niektórychJavapluskwy bezpieczeństwa. Niestety, kilka funkcji / poprawek przeznaczonych do tegoERDDAP™Wersja nie jest w tej wersji. Przepraszam. Miejmy nadzieję, że następna wersja będzie stosunkowo szybko (i znacznie łatwiejsze do aktualizacji do) .
    * Aby uniknąć kilku błędów bezpieczeństwa wJava6 aktualizacji 23 i poniżej, pobrać i zainstalować najnowszą wersjęJava  (Java6 aktualizacja 24 lub wyższa) . Jeśli masz 64-bitowy system operacyjny, należy uzyskać 64-bitową wersjęJava.
    * Jeśli używasz Tomcat 5, MUSI uaktualnić do Tomcat 6 lub 7 (preferowane) . Jeśli używasz Tomcat 6, rozważyć modernizację do Tomcat wersja 7.
    * Należy przestrzegać wszystkich instrukcji dotyczących[utworzenie nowegoERDDAP™](/docs/server-admin/deploy-install), ale w stosownych przypadkach, będziesz kopiować pliki ze starej instalacji do nowej instalacji, w szczególności\\[tomcat\\]/ content / erddap katalog i pliki. W ramach tego, zauważyć[nowe zalecenia konfiguracji Tomcat](/docs/server-admin/deploy-install#tomcat).
    * Domyślny erddap.css jest teraz zawarty w pliku erddap.war.
        * Aby użyć domyślnego erddap.css, **Usuń** Twój stary\\[tomcat\\]/ content / erddap / images / erddap.css.
        * Jeśli zmodyfikowany\\[tomcat\\]/ content / erddap / images / erddap.css, i chcesz go używać: po prostu zostaw go na miejscu i zastąp&lt;wejście &gt; sekcja z:
```
            /\\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \\*/  
            input\\[type=button\\], input\\[type=submit\\], button {  
              margin:0px; padding:0px 3px; }  
            input\\[type=checkbox\\], input\\[type=password\\],  
              input\\[type=text\\], select, textarea {  
              margin:0px; padding:0px; }  
            input\\[type=radio\\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    * W\\[tomcat\\]/ content / erddap / setup.xml:
        * Zastąpić komentarze i tagi związane z&lt;partialRequestMaxBytes &gt; oraz&lt;partialRequestMaxCells &gt; z
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \\-->
```
        * Zastąpić uwagi dotyczące&lt;categoryAttributes&gt; i rozważyć zmianę wartości znacznika:
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\\_category/index.html  
            (ioos\\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \\-->  
            <categoryAttributes>global:institution, ioos\\_category,  
            long\\_name, standard\\_name</categoryAttributes>  
```

Indywidualny&lt;categoryAttributes&gt; które są atrybutami globalnymi MUSI być zidentyfikowane poprzez prefiks globalny: (np. globalny: instytucja) . Przyjmuje się, że inne atrybuty są atrybutami zmiennymi (np.,standard\\_name) . Ponadto wartości instytucji (jedynymi) zostały pozostawione w oryginalnej sprawie. Teraz wszystkie wartości kategorii są konwertowane na małe.
    * W\\[tomcat\\]/ content / erddap /datasets.xml:
        * Poprawione:ERDDAP™posiada nowe wymagania związane z zestawem danych tabelarycznych cdm\\ _ data\\ _ type. W szczególności, każdy zbiór danych MUSI mieć poprawne metadane i zmienne związane z cdm\\ _ data\\ _ type. Jeśli nie, zestaw danych nie wczyta i wyrzuci błąd. Patrz dokumentacja[cdm\\ _ data\\ _ type](/docs/server-admin/datasets#cdm_data_type).
        * FYI: Istnieje nowy typ zbioru danych: EDDTableFromAsciiServiceNOS.
        * FYI: Istnieją trzy nowo dozwoloneioos\\_categoryopcje: Hydrologia, Jakość (np. dla flag jakości) oraz statystyki (np. średnia) .
        * Dla EDDTableFrom... Zestawy plików, usuń dowolne&lt;nDimensions &gt; tags. Nie są już potrzebne ani używane.
        * Dla zmiennych zdestinationName= wysokość,ERDDAP™nie zmusza jużlong\\_namebyć wysokością. Proszę przejść przez swojedatasets.xmli wielokrotnie szukać&lt;destinationName&gt; wysokość i dodać do tej zmiennej&lt;addAttributes&gt;:
```
              <att name="long\\_name">Altitude</att>  
```
             (lub nieco innylong\\_namew przypadkach szczególnych) .
        * Opcjonalnie: Wszystkie podklasy plików EDDTableFromFiles wspierają zmienną[sourceName= globalny:...](/docs/server-admin/datasets#global-sourcenames)konwertować globalne metadane z każdego pliku na zmienną danych. Dzięki Lynn DeWitt.
    * Użytkownicy EDDTableFromDatabase --ERDDAP™pochodzi z nowego sterownika JDBC 4 dla Postgres. W przypadku innych baz danych, sprawdź w sieci najnowszy plik JDBC .jar dla bazy danych. OdERDDAP™teraz używaJava1.6 +, JDBC 4 (nie 3) jest prawdopodobnie zalecane.
    * FYI
        *   EDDGridZ... Pliki i tabela EDDTable Od... Zestawy plików przechowują informacje o plikach w
            \\[bigParentDirectory\\]/ zbiór danych Informacja /\\[datasetID\\]/\\ *.ncpliki.
Zestawy danych EDDTable przechowują teraz informacje o podzbiorze w
            \\[bigParentDirectory\\]/ zbiór danych Informacja /\\[datasetID\\]/\\ *.ncpliki. Te pliki kiedyś były
            \\[bigParentDirectory\\]/ zbiór danych Informacja /\\[datasetID\\]..jsonpliki.
Stare pliki zostaną automatycznie usunięte, gdyERDDAP™Zaczyna się. Albo możesz usunąć wszystkie pliki (ale zostaw puste podkatalogi) w\\[bigParentDirectory\\]/ datasetInfo /.
        * Pracowałem nad nowym EDDTableFromNcCFFiles, który odczytywał dane z lokalnych i zdalnych plików za pomocą proponowanych, nowych konwencji obserwacji punktów CF. Ale tego nie ma w tym wydaniu. Istnieją problemy w bibliotekach netcdf- java związane z niektórymi metodami odczytu tych plików. Pojawiły się pewne zmiany w proponowanych konwencjach obserwacyjnych punktów CF. Gdy biblioteka netcdf- java zostanie naprawiona i zaktualizowana do najnowszej propozycji, wznowię prace nad tym.
        * UruchomienieERDDAP™na Windows może mieć problemy: w szczególności, można zobaczyć w\\[bigParentDirectory / logs / log.txt plik, któryERDDAP™czasami nie jest w stanie szybko usunąć i / lub zmienić nazwy plików. Jest to spowodowane oprogramowaniem antywirusowym (np. z McAfee i Norton) czyli sprawdzanie plików pod kątem wirusów. Jeśli wpadniesz na ten problem (które można zobaczyć przez komunikaty błędów w pliku log.txt jak "Nie można usunąć"...) , zmiana ustawień oprogramowania antywirusowego może częściowo złagodzić problem.
JeśliERDDAP™w systemie Windows jest tylko test uruchomiony na pulpicie, jest to tylko irytacja.
JeśliERDDAP™w Windows jest twój publicznyERDDAP™, rozważyć przejście na serwer Linux.
    * Slow First Startup... Pierwszy raz uciekaszERDDAP™po modernizacji,ERDDAP™może być powolny załadunek zbiorów danych. DrogaERDDAP™przechowuje informacje o zagregowanych plikach, więcERDDAP™będzie musiał ponownie przeczytać pewne informacje ze wszystkich tych plików. To trochę potrwa.
    * Błędy w Startup... Biorąc pod uwagę zmiany związane z cdm\\ _ data\\ _ type, jest prawdopodobne, że niektóre z Twoich zbiorów danych nie wczytają się i będą rzucać błędami. Należy uważnie przeczytać raport dzienny e-mail, żeERDDAP™wysyła kiedyERDDAP™jest gotowy do startu. Będzie tam lista zbiorów danych, które nie zostały załadowane (na górze) i powód, dla którego nie załadowali (w pobliżu dna) .
    * Jeśli utkniesz lub masz inne pytania, wyślij mi szczegóły:erd.data at noaa.gov.
    * Programiści -- Jeśli napiszeszJavauruchomione programyERDDAP™kod, musisz zmienić niektóre odniesienia parametru linii poleceń:
        * Zmień jodę -time- 1.6.2.jar na jodę-czas. słoik
        * Zmień odniesienie Postgres JDBC .jar do postgresql.jdbc.jar
*    **Małe zmiany i błędy:** 
    
    * Ulepszona obsługa połączeń, aby uniknąć powieszonych nitek.
    * Ulepszone praktyki współzależności w celu skuteczniejszego rozpatrywania niemal identycznych wniosków.
    *   ERDDAP™teraz używa netcdfAll- 4.2.jar (przemianowany na netcdfAll- last. słoik) . Ten przełącznik wymagał kilku zmian wewnętrznych i spowodował kilka małych zmian zewnętrznych, np. zmian w sposobie odczytu plików grib i drobnych zmian w.ncNagłówek.
    * Nowa funkcja:\\[erddap\\]/ convert / fipscounty.html konwertsFIPSkody okręgowe do / z nazw okręgów.
    * Na mapach granice stanu są teraz ciemnym fioletem, więc lepiej wyróżniają się na wszystkich kolorach tła.
    * Tabela.kmlwyjście ponownie używa ikon okrągłych do zaznaczania punktów (nie ikonę samolotu Google ostatnio przełączył się do) .
    * Zestawy danych erdCalcofi zostały przestawione i są teraz obsługiwane z lokalnych plików (szybciej) .
    * GenerateDatasets Xml Gruszki Katalog tworzy teraz plik wyników:
        \\[tomcat\\]/ webapps / erddap / WEB- INF / temp /EDDGridFromThreddsCatalog.xml. Dzięki Kevinowi O 'Brienowi.
    * GenerateDatasets Xml Gruszki Katalog próbuje teraz usunąć niepotrzebne numery portów ze źródeł adresów URL (np.: 8080 i: 8081 mogą być czasami usunięte) . DziękiNOAAOchrona centrali.
    * Dla .subset stron internetowych, Mapa Distinct Data posiada teraz zmienną zakres lat lon.
    * Kilka list wERDDAP™  (np. tabela zawierająca wszystkie zestawy danych) były posortowane tak, że A.. Z posortowane przed A..z. Teraz sortują się w nieczuły sposób.
    * Małe zmiany na stronach .subset, w tym: jednostki są teraz wskazane.
    * GenerateDatasets Xml i DasDds nie rzucają już wyjątku, jeśli nie są w stanie umieścić wyników na schowku systemu lub wyświetlić programu InBrowser. Dzięki Ericowi Bridgerowi i Gregowi Williamsowi.
    * Ustawienie błędu: Podczas wczytywania zbiorów danych,ERDDAP™teraz usuwa lub dostosowuje geoprzestrzenne atrybuty globalne. Dzięki Charlesowi Carletonowi.
    * Naprawiono błąd: String2.getClassPath () teraz poprawnie odkodowuje klasę Ścieżka (w szczególności, w systemie Windows spacje w nazwie pliku pojawiły się jako% 20) . WpływERDDAP™EDStatic calling SSR.getContextDirectory () i znalezienie treści / erddap. Dzięki Abe Coughlin.
    * Bug fix: w EDDTableFromFiles związane z getDataForDapQuery obsługi distinct () żądania. Dzięki Ericowi Bridgerowi.
    * Ustawienie błędu:tabledapprośby nie radziły sobie z ograniczeniami wysokości, gdy wysokość zbioru danych MetersPerSourceUnit było -1. Dzięki Ericowi Bridgerowi.
    * Naprawiono błąd: EDDTableFrom... Pliki zbiory danych teraz poprawnie obsługują żądania zawierające = NaN i&#33; = NaN.
    
## Wersja 1.28{#version-128} 
 (wydany 2010- 08- 27) 

*    **Nowe funkcje:** Brak
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** Brak
*    **Poprawiono błąd:** Napraw błąd programowania (tylko w ver 1.26) które wykonanoERDDAP™Bardzo powoli.
     

## Wersja 1.26{#version-126} 
 (wydany 2010- 08- 25) 

*    **Nowe funkcje:** Brak
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** 
    * Z twojego\\[tomcat\\]/ content / erddap / setup.xml,
        * W&lt;Legal &gt;, na nowej linii poniżej\\[standard DataLicenses\\], insert\\[standardContact\\].\\[standardContact\\]dotyczy&lt;adminEmail &gt; określony wyżej w setup.xml.
        * Usuń&lt;Tabela BGColor &gt; i&lt;tableHighlightBGColor &gt;.
        * Zalecane: Zmiana&lt;endBodyHtml &gt; do
```
            <endBodyHtml><!\\[CDATA\\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \\]\\]></endBodyHtml>
```

    * Wymagane: Do twojego\\[tomcat\\]/ content / erddap / images / erddap.css and erddapAlt.css, add at the bottom:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Fixes i małe zmiany:** 
    
    * Bug fix: w niektórych sytuacjach formularze nie działały w niektórych wersjach Internet Explorer. Wielkie dzięki Gregowi Williamsowi.
    * Ustawienie błędu: Przyciski Make A Graph nie działały, jeśli zbiór danych był z pilotaERDDAP.
    * Ustawienie błędu:WMSczasami nie działa, jeśli zestaw danych był z pilotaERDDAP.
    * Wiele małych zmian i poprawek błędów.
    

## Wersja 1.24{#version-124} 
 (wydany 2010- 08- 06) 

*    **Nowe funkcje:** 
    * Nowy[Podset stron internetowych](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html)używać wyszukiwań do wyboru podzbiorów zbiorów danych tabelarycznych. Dzięki POST.
    * Nowy[Wyszukiwanie zaawansowane](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html)łączy wszystkie inne opcje wyszukiwania i dodaje długość, szerokość i czas bounding boxes. Dzięki Ellyn Montgomery. (Przepraszam za opóźnienie.) 
    * Nowy[Przelicz czas](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)strona internetowa i serwis pozwalają konwertować czasy numeryczne do / z czasu łańcuchów ISO.
    * Nowy[Przelicz jednostki](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)strona internetowa i serwis pozwalają konwertowaćUDUNITSdo / z jednostek UCUM. DziękiNOAAIOOSSOS.
    * JeślitabledapZapytanie zawiera & jednostki ("UCUM") , nazwy jednostek zostaną przekonwertowane z oryginalnych nazw (zwykleUDUNITS) do[UCUM](https://unitsofmeasure.org/ucum.html)nazwy jednostek. Dotyczy to tylko jednostek\\*nazwy\\*, nie wartości danych. DziękiNOAAIOOSSOS.
    * Ulepszenie tworzenia stron internetowych, wykresów i map wykresu:
        * Jeśli wykres jest mapą, są nowe przyciski Make A Graph, aby powiększyć / usunąć i nowa opcja, aby kliknąć, aby zmienić punkt środkowy mapy. Dzięki POST.
        * Ustawienia filtrowania dodane w pobliżu dołu. Dzięki Gregowi Williamsowi.
        * Zbudowany w plikach danych linii brzegowej został zaktualizowany do GSHHS v2.0. Dzięki POST.
        * Mapy obejmują teraz jeziora i rzeki. Dzięki POST. (Przykro mi, brakuje rzeki Delta Sacramento, ponieważ ani dane z wybrzeża, ani dane z jeziora / rzeki nie zajmują się tym.) 
        * Zbudowane w plikach narodowo-stanowych. Dzięki POST.
        * Topography.cpt został nieznacznie zmodyfikowany. (Przepraszam, jeśli to ma na ciebie negatywny wpływ.) Dzięki POST.
        * W griddap 's Make A Graph, jeśli użytkownik zmienia zmienną, formularz jest automatycznie retubtonizowany tak, żeaxisVariables showStartAndStop zawsze odzwierciedla zmienne wykresu. Dzięki Joaquin Trinanes.
        * Dla adresów URL obrazka png i pdf:
            * Nowy & .land = _ value _, gdzie _ value _ może być "pod" (topografia) lub "over" (Pokaż batymetrię.) . Jeśli nie podano, domyślny jest ustawiony przez[drawLandMask](/docs/server-admin/datasets#global-drawlandmask)wdatasets.xmllub setup.xml. Dzięki POST.
            * Nowe: linie w legendzie, które są zbyt długie są automatycznie łamane na wiele linii. Dzięki POST.
        * Dla adresów URL obrazka png:
            * New & .legend = _ value _, where _ value _ can be "Bottom" (domyślny) "Off" albo "Only". Pozwala to na włączenie legendy, wyłączenie legendy, lub uzyskać tylko legendę. Dzięki Cary Wilson.
            * Nowy & .trim = _ n Pixels _ leaves a border of nPixels (np. 10) na dole obrazu. Jest on stosowany po .legend = Off. Dzięki Cary Wilson.
            * Nowy & .size = _ width _|_ height _ pozwala określić szerokość i wysokość obrazu w pikselach.
    * Nowy format plików wyjściowych:
        * .csvp oraz.tsvp -- jak .csv i.tsv, ale z " (_ jednostki _) "dołączone do nazw kolumn na pierwszej linii.
        * .odvTxt -- tworzy plik .txt, który upraszcza uzyskiwanie danych do[Dane o oceanie Widok (ODV) ](https://odv.awi.de/).
        * .esriCsv -- sprawia, że plik .csv nadaje się do importu w ESRIArcGIS. (tylko zbiory danych tabelarycznych) Dzięki Janowi Masonowi, Jeffowi de La Beaujardere iNOAAIOOSSOSprojekt.
    * Ulepszenia GUI[Klasyfikacja](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html)stron internetowych. Ponadto, kategoryzacja wartości (inne niż instytucje) są teraz bardzo małe. Wnioski inne niż małe są akceptowane (przekierowane) dla kompatybilności wstecznej. Dzięki Royowi Mendelssohnowi.
    * Komunikaty błędów są teraz jeszcze krótsze i bardziej zorientowane na użytkowników. Dzięki Gregowi Williamsowi.
    * Wewnętrzna zmiana, która znacznie zmniejszaERDDAPPodstawowe wykorzystanie pamięci.
    * Wiele nowych funkcji, które dotyczą tylko projektu POST.
*    **RzeczyERDDAP™Administratorzy muszą wiedzieć i robić:** Jest wiele zmian. Przepraszam. Ale każdy przynosi dobre korzyści.
    * Duże zmiany w GenerateDatasetXml -- teraz często zadaje więcej pytań (zob. odpowiednie[zbiór danych Rodzaje](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types)informacje) i teraz zawsze generuje zasadniczo ready- to- use dladatasets.xml. Jesteś nadal odpowiedzialny za konfigurację, więc należy nadal przeglądaćdatasets.xmlzawartość przed jej użyciem. Człowiek wkładający wysiłek w projekt zawsze będzie lepszy niż program komputerowy. Dzięki projektowi UAF.
    * WYMAGANY: W setup.xml, należy zmienićWMSsekcja. Powinien teraz zawierać te znaczniki (ale możesz zmienić wartości) :
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \\[standardParts\\] with your own HTML. -->
        <legal><!\\[CDATA\\[
        \\[standardDisclaimerOfEndorsement\\]
        \\[standardDisclaimerOfExternalLinks\\]
        \\[standardPrivacyPolicy\\]
        \\[standardDataLicenses\\]
        \\]\\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\\_standard>UDUNITS</units\\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    * WYMAGANE: W setup.xml, skopiować i wkleić ten nowy sugerowany&lt;startHeadHtml &gt; w celu zastąpienia starej wersji. Ale nie krępuj się wprowadzać zmian w swoich preferencjach.
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \\[tomcat\\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\\[fileName\\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \\[tomcat\\]/content/erddap/images. 
        
        \\*\\*\\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \\*\\*\\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \\[tomcat\\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \\*all\\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\\[CDATA\\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \\]\\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

Dzięki POST, Hansowi Vedo i Rickowi Blair.
    * WYMAGANE: W setup.xml, w&lt;startBodyHtml &gt;, zmienić&lt;body &gt; tag to be just&lt;body &gt;, ponieważ styl jest teraz ustawiony przez erddap.cs.
    * WYMAGANE: W setup.xml, zmienić to&lt;endBodyHtml &gt; (ale zmień adres e-mail na swój adres e-mail i czuj się swobodnie, aby dokonać innych zmian) :
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \\[tomcat\\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\\[fileName\\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\\[CDATA\\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \\]\\]></endBodyHtml>
```

    * WYSOKIE ZALECENIA: W setup.xml zalecane&lt;Krótki opis Html &gt; jest teraz
```
        <theShortDescriptionHtml><!\\[CDATA\\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \\[standardShortDescriptionHtml\\]
        \\]\\]></theShortDescriptionHtml>
```

Możesz to zmienić, szczególnie ostatnie zdanie w akapicie pierwszym.
    * W setup.xml, emailEverything To i emailDailyReport To może być teraz comma- oddzielone listy adresów e-mail. Pierwszy email Wszystko Do celów specjalnych, np. subskrypcje do zbiorów danych EDDXxxxFromErddap używają tego adresu e-mail. Dzięki Johnowi Maurerowi.
    * Błędy e- mail są teraz zalogowane do\\[bigParentDirectory\\]/ logs / emailLogRRRR- MM- DD.txt file.
    * W setup.xml, istnieje nowy, opcjonalny parametr do ustawienia właściwości konta e-mail (zwykle po&lt;emailPassword &gt;):
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

Domyślnie nic. Dzięki Rich Signellowi.
    * WYMAGANE: Jeśli używasz EDDTableCopy lubEDDGridKopiuj, musisz DELETE wszystkie\\[bigParentDirectory\\]/ kopiowanie / katalogi i pliki zawierające "xh" w katalogu lub nazwach plików po zatrzymaniu staregoERDDAP™i przed rozpoczęciem nowegoERDDAP™więc te pliki zostaną ponownie skopiowane. Bardzo mi przykro, ale ważne było dokonanie zmian i miejmy nadzieję, że dotyczy to kilku administratorów i kilku plików.
W Linuksie można znaleźć te pliki z, cd\\[bigParentDirectory\\]/ kopia
Znajdź.\\*xh\\*  
W systemie Windows można znaleźć te pliki z, Start|Szukaj
Czego chcesz szukać: Dokumenty
Cała lub część nazwy pliku: xh
Spójrz w: Przeglądaj - &gt;\\[bigParentDirectory\\]/ kopia
Kliknij na 'Search'
^ A do wyboru wszystkich
Del, aby usunąć je wszystkie
    * WYMAGANE: Wdatasets.xml, dla zbiorów danych EDDTableFromDatabase, dla zmiennych date i timestamp, zmienić dane Typ do podwojenia i jednostki do sekund od 1970- 01-01T00: 00: 00Z. Prosimy o przechowywanie w bazie danych danych znaczników czasu\\*z\\*strefy czasowej. Bez informacji o strefie czasowej, zapytań, któreERDDAP™wysyła do bazy danych i wyniki, któreERDDAP™Dostawy z bazy danych przez JDBC są niejednoznaczne i prawdopodobnie się mylą. Próbowaliśmy, ale nie znaleźliśmy wiarygodnego sposobu radzenia sobie z danymi "timestamp without timezone". Uważamy, że to dobra praktyka. W końcu dane "timestamp without timezone" mają domniemaną strefę czasu. Chociaż jest to wspaniałe, że strefa czasowa jest oczywista dla administratora bazy danych, sensowne jest jej wyraźne określenie, tak aby inne oprogramowanie mogło właściwie współdziałać z bazą danych. Dzięki / przepraszam Michael Urzen.
    * WYSOKIE ZALECENIA: Wdatasets.xml, aby włączyć .subset stron internetowych do wyszukanego na żywo wyszukiwania Twoich tabelarycznych zbiorów danych, musisz dodać [&lt;subsetVariables&gt;] (/ docs / server- admin / datasets # subsetvariables) do globalnych atrybutów zbioru danych.
    * ZALECENIA: Wdatasets.xml, jeśli masz zestaw danych zdatasetID= "pmelGtsppp", proszę zmienić na
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * ZALECENIA: Wdatasets.xml, istnieją nowe ważne opcje dla [&lt;cdm\\ _ data\\ _ type & gt;] (/ docs / server- admin / datasets # cdm _ data _ type) atrybut globalny, więc należy przeglądać / zmieniać wartość zestawów danych.
    * Wdatasets.xml, nowy [&lt;sourceNeedsExpandedFP\\ _ EQ & gt;] (/ docs / server- admin / datasets # sourceedexpandedfp _ eq) jest pomocny, jeśli serwer źródłowy nie obsługuje poprawnie & _ variable _\\ = _ value _ tests (z powodu[ogólna trudność testowania równości numerów zmiennoprzecinkowych](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)) . sourceNeedsExpandedFP\\ _ EQ jest ustawiony na true domyślnie (najbezpieczniejsze ustawienie) Więc nie musisz nic zmieniać.
    * Nowy[Pliki EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles). Dzięki Jerry Yun Pan.
    * Nowy[Pliki EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). Dzięki Royowi Mendelssohnowi.
    * Zmiany[Pliki EDDTableFromNc@@](/docs/server-admin/datasets#eddtablefromncfiles)pozwala na wykorzystanie go z szerszą gamą plików.
    * EDDTableFromBMDE został wyłączony. Nie ma już żadnych aktywnych, odpowiednich źródeł danych.
    * W GenerateDatasetXml, nowyEDDGridFromThreds Przewodniczący Katalog zbiorów całego katalogu THREDDS (lub podzbiór) i generujedatasets.xmltreści. Dzięki projektowi UAF.
    * GenerateDatasets Xml i DasDds teraz umieścić swoje wyniki w\\[bigParentDirectory\\]/ logs / log.txt. Dzięki Rich Signellowi i Charlesowi Carletonowi.
    * Wiele ulepszeń systemu logowania. Dzięki POST.
*    **RzeczyERDDAP™Programiści Muszę wiedzieć i zrobić:** 
    * Zaszły zmiany w katalogu / WEB- INF / lib /. Proszę odpowiednio zmienić ustawienia javac i java classpath.
    * Jest nowy\\[do Url\\]/ erddap / version service do określenia wersjiERDDAP. Odpowiedź jest tekstem, np.:ERDDAP\\ _ wersja = 1.24 Jeśli otrzymasz komunikat błędu HTTP 404 Not- Found, traktujERDDAP™w wersji 1.22 lub niższej. Dzięki POST.
*    **Małe zmiany i błędy:** 
    
    * Tabela EDDFrom Zmiany sos:
        * Upuszczone wsparcie do czytania IOOSSOSOdpowiedzi XML.
        * Dodano obsługę do odczytu IOOSSOStekst / csv. (Więc NOSSOSserwery obecnie nie są obsługiwane.) 
        * Dokonano wielu zmian związanych z IOOSSOSszczegóły dotyczące serwera.
        * Dodano wsparcie dla zapytań BBOX dla IOOSSOSorazOOSTethys SOSserwerów. Zmiany te skutkują dużym przyspieszeniem w przypadku odpowiednich wniosków o dane. Dzięki IOOSSOS.
    * Tekst.mattabelaryczne pliki danych są teraz zapisywane poprawnie. Dzięki Royowi Mendelssohnowi.
    *   WMS
        *   OpenLayersjest teraz połączone zERDDAP™do stosowania naWMSstron internetowych. Naprawia to problem spowodowanyOpenLayerszmienił się kilka miesięcy temu i zapobiega przyszłym problemom.
        * WWMS GetCapabilitiesOdpowiedź&lt;OnlineResource &gt; wartość jest teraz URLWMSobsługa. Dzięki Charltonowi Galvarino.
        * Legenda jest wyświetlana naWMSstrona internetowa, aby pokazać kolorowy pasek. Dzięki Emilio Mayordze.
    *   EDDGridKonstruktor AggregateExistingDimension miał problemy ze źródłem osi Wartości nie były równe ich destynacji Wartości, np. jeśli czas źródłowy był czymś innym niż"seconds since 1970-01-01". DziękiToddSpindler.
    * W TableWriterGeoJson, nadmiar ", po bbox\\[...\\]został usunięty. Dzięki Gregowi Williamsowi.
    * Wiele małych zmian i poprawek błędów.
    
## Wersja 1.22{#version-122} 
 (wydany 2009- 07- 05) 

* Błąd SlideSorter wprowadzony w 1.20 jest naprawiony.
* Błąd OBIS wprowadzony w 1.20 jest naprawiony.
* Usunięto odniesienia do zbiorów danych Jasona na stronie obrazów / gadżetów / gadżetów / gadżetów GoogleGadgetów.
     
## Wersja 1.20{#version-120} 
 (wydany 2009- 07- 02) 

*   ERDDAP™administratorzy, proszę dodać to do pliku setup.xml:
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

* Nowe typy zbioru danych[EDDGridKopiuj](/docs/server-admin/datasets#eddgridcopy)oraz[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy)zrobić i utrzymać miejscową kopię innegoEDDGridlub zbiór danych EDDTable i obsługuje dane z lokalnej kopii. Są one bardzo łatwe w użyciu i bardzo skuteczne **rozwiązania niektórych z największych problemów z obsługą danych z zdalnych źródeł danych:** 
    
    * Dostęp do danych ze zdalnego źródła danych może być powolny (z różnych powodów) .
    * Zdalny zestaw danych jest czasami niedostępny (ponownie, z różnych powodów) .
    * Poleganie na jednym źródle danych nie jest dobre (np. gdy wielu użytkowników i wieluERDDAPs wykorzystanie) .
    
Dodatkowo, lokalna kopia jest kopią zapasową oryginału, która jest przydatna na wypadek, gdyby coś stało się oryginału.
    
Nie ma nic nowego w tworzeniu lokalnej kopii zbioru danych. Nowe jest to, że te zajęcia sprawiają, że\\*łatwo\\*do tworzenia i\\*utrzymanie\\*miejscowa kopia danych z\\*odmiana\\*rodzajów zdalnych źródeł danych oraz\\*dodaj metadane\\*podczas kopiowania danych.
    
Te typy zbiorów danych są częścią kompletnego zestawu funkcji, które ułatwiają tworzenie[sieci / klastry / federacjeERDDAPs](/docs/server-admin/scaling)do obsługi bardzo ciężkich ładunków (np. w centrum danych) .
    
* Nowy typ zbioru danych[EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)pobiera dane z lokalnej lub zdalnej tabeli bazy danych.
*   ERDDAP™teraz ma[bezpieczeństwo](/docs/server-admin/additional-information#security)system, który obsługuje uwierzytelnianie (logowanie użytkowników) i autoryzacja (przyznanie im dostępu do niektórych prywatnych zbiorów danych) .
* Są[dwa, nowe, komendant-line narzędzia](/docs/server-admin/datasets#tools)pomócERDDAP™administratorzy generują XML dla nowego zbioru danych wdatasets.xml:
    * GenerateDatasets Xml może wygenerować przybliżony szkic XML dla niemal każdego rodzaju zbiorów danych.
    * DasDds pomaga Ci wielokrotnie testować i udoskonalać XML dla zbioru danych.ERDDAPGenerateDatasets Strony internetowe Xml zostały usunięte. Ze względów bezpieczeństwa wspierali tylko kilka typów zbiorów danych. Nowe narzędzia linii poleceń są lepszym rozwiązaniem.
* Nowy[strona statusu](/docs/server-admin/additional-information#status-page)pozwala każdemu (ale w szczególności administratorzy) przeglądaj statusERDDAP™z dowolnej przeglądarki, idąc do\\[BaseUrl\\]/erddap/status.html.
* Tabledap obsługuje teraz[funkcje po stronie serwera](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions):
    * & Wyróżnij () usuwa duplikaty wierszy z tabeli odpowiedzi,
    * &orderBy (...) pozwala określić sposób sortowania tabeli odpowiedzi,
    * &orderByMax (...) pozwala określić sposób sortowania tabeli odpowiedzi i usuwa wszystkie wiersze z wyjątkiem wierszy z wartościami maksymalnymi w ostatniej określonej kolumnie. Można to wykorzystać na przykład do uzyskania ostatnich dostępnych danych dla każdej stacji.
* Zestawy tabelaryczne mogą teraz zawierać dodatkowe zmienne dateTime, które nie są nazwane"time". Zmienne te są rozpoznawane przez ich metadane "jednostek", które muszą zawierać" since "  (dla daty liczbowej Czasy) lub "yy" lub "YY" (dla sformatowanych String dateTimes) . Ale proszę nadal używaćdestinationName "time"dla daty głównej Zmienna czasu.
*   ERDDAP™teraz generuje a[sitemap.xml](/docs/server-admin/additional-information#sitemapxml)plik, który mówi wyszukiwarkom, żeERDDAPTylko trzeba się czołgać co miesiąc.ERDDAP™administratorzy, proszę śledzić[instrukcje](/docs/server-admin/additional-information#sitemapxml)powiadomienia wyszukiwarek o nowym pliku sitemap.xml.
*   ERDDAPkomunikaty błędów są teraz znacznie krótsze i skierowane do klientów (nie programiści) . Dzięki Gregowi Williamsowi.
* [&lt;requestBlacklist &gt;] (/ docs / server- admin / datasets # requestblacklist) teraz obsługuje również adresy IP, gdzie ostatni numer został zastąpiony przez\\ *.
* Wnioski.jsoni .geoJson pliki mogą teraz zawierać opcjonalne[jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/)żądanie poprzez dodanie "&.jsonp = _ functionName _ "do końca zapytania. Zasadniczo, to po prostu mówiERDDAP™aby dodać "_ functionName _ ("do początku odpowiedzi i") "do końca odpowiedzi. Jeśli pierwotnie nie było zapytania, w zapytaniu zostaw" & ". Dzięki Gregowi Williamsowi.
* Wiele nowych statystyk zostały dodane do[Sprawozdanie dzienne](/docs/server-admin/additional-information#daily-report).
* Na stronach internetowych z listami zbiorów danych, instytucji i id są teraz po prawej stronie. To przenosi subskrypcję i inne bardziej przydatne kolumny do widoku na wąskich ekranach komputerowych.
* Na wszystkich stronach internetowych tytuł strony (na podstawie&lt;tytuł &gt; w&lt;startHeadHtml &gt; zdefiniowany w setup.xml) jest modyfikowany tak, aby zawierał lepszy opis strony internetowej (na przykład poprzez włączenie tytułu i instytucji bieżącego zbioru danych) .
* Informacje o Xmx są teraz dołączane do informacji o pamięci wydrukowanych w log.txt, Daily Report i na status.html. Dzięki Ellyn Montgomery.
*   ERDDAP™posiada dodatkową, ogólną ochronę przed wszystkimi błędami (np. OutOfMemoryError) . Dzięki Charlesowi Carletonowi.
* Ulepszenie postępowania z błędami, jeżeli odpowiedź została już udzielona.
* Usprawniono: Pliki EDDTableFromFiles iEDDGridPliki FromFiles teraz po prostu pozwól&lt;metadataFrom &gt; pierwszy lub ostatni. przedostatni nie jest już wspierany. Pierwszy i ostatni są teraz oparte na plikach 'LastModifiedTime.
* Naprawianie błędów: w formacie EDDTableFromSOS, błędne informacje dla jednej stacji rzucił wyjątek i spowodował, że cały zestaw danych został odrzucony. Te stacje są ignorowane. (i komunikat błędu jest log.txt) . Dzięki Rickowi Blair.
     

## Wersja 1.18{#version-118} 
 (wydany 2009- 04- 08) 

* Bug fix: Począwszy od 1.14, formularz EDDTable Data Access Form and Make A Graph website nie poradził sobie z cytowanymi ograniczeniami.
* Bug fix: Począwszy od 1.14, EDDTableFromDapSequence nie poradził sobie z ograniczeniami czasowymi poprawnie, jeśli jednostki czasu źródłowego nie były "sekundami od 1970- 01- 01T00: 00: 00".
     

## Wersja 1.16{#version-116} 
 (wydany 2009- 03- 26) 

*   ERDDAP™administratorzy:
    * Jest to ważne wydanie, ponieważ naprawia błąd, który zostawiłERDDAP™uruchomiony wątek, jeśli używasz Tomcat Manager do zatrzymania / uruchomienia lub ponownego uruchomieniaERDDAP. Więc gdy zainstalujesz 1.16, nie używaj menadżera Tomcat 'a do odblokowania starychERDDAP™i wdrożyć nowyERDDAP. Zamiast tego: **usuń stareERDDAP™, restart Tomcat (lub serwer) , a następnie wprowadzić noweERDDAP.** To zawsze dobry pomysł, aby to zrobić podczas instalacji nowej wersji.
    * Proszę dodać [&lt;requestBlacklist &gt;&lt;/ requestBlacklist &gt;] (/ docs / server- admin / datasets # requestblacklist) dodatasets.xml. Można to wykorzystać do określenia listy adresów IP klientów, które mają być zablokowane (np. odstraszenie ataku zaprzeczenia służbie lub nadmiernie gorliwego robota internetowego) .
* Teraz jest\\[bigParentDirectory\\]/ loguje katalog do przechowywaniaERDDAP™Zaloguj pliki. Kiedy zaczynaszERDDAP™, tworzy kopię archiwum log.txt i log. txt.poprzednie pliki ze znacznikiem czasu. Jeśli były problemy przed ponownym uruchomieniem, może być przydatne do analizy tych plików.
*   ERDjestERDDAP™teraz ma system subskrypcji włączony.
*   ERDDAP™jeszcze raz pozwala (ale nadal nie zaleca) kodowanie "% 26" dla adresów URL na żądanie (Patrz[zmiana związana z v1.14](#percent26)) .
* Kilka nowych dodatków do sekcji Tally[Sprawozdanie dzienne](/docs/server-admin/additional-information#daily-report).
* Małe poprawki błędów w generateDatasetsXml.
* Kilka drobnych poprawek.
     

## Wersja 1.14{#version-114} 
 (wydany 2009- 03- 17) 

* Zmiany dla użytkowników:
    * W żądaniach dotyczących danych sieci,ERDDAP™teraz obsługuje:[last - n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last)gdzie n jest liczbą całkowitą wskaźników oraz[ (last - d) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses)gdzie d jest wartością liczbową (na czas, jest w sekundach) .
    * W tabeli żądania danych, Ograniczenia String teraz wymagają[podwójne kwotowania](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings)wokół wartości, na przykład, & id = "NDBC40121" Jest to wymagane przezDAPprotokół.
    * W przypadku wniosków o dane tabelaryczne,ERDDAP™teraz wymaga, że[wszystkie ograniczenia są odpowiednio zakodowane w procentach](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode). Przeglądarki robią to automatycznie, co wpływa głównie na programy komputerowe / skrypty, które mają dostępERDDAP.
#### 26{#percent26} 
*   [Poprzednio:](#percent26)do[osadzone na wykresie strona internetowa](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html)oraz[ERDDAP™Strona Google Gadget](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html)powiedział, aby zastąpić "&" na URL obrazka "% 26". Od teraz należy zastąpić "&" w URL obrazu "& amp;". Więc musisz zastąpić wszystkie "% 26" na istniejących stronach internetowych i gadżetach Google przez "& amp;". (Przepraszam.) 
*   ERDDAP™administratorzy, proszę:
    * Dodać[setup.xml](/docs/server-admin/deploy-install#setupxml)plik (i zmienić flagę Wartość klucza) :
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \\*\\*\\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \\[bigParentDirectory\\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    * Na linii po&lt;emailUserName &gt;[setup.xml](/docs/server-admin/deploy-install#setupxml)plik, dodaj
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
i wprowadź swoje prawdziwe hasło.
    * Możesz się zmienić.&lt;wmsSampleBBox &gt;[setup.xml](/docs/server-admin/deploy-install#setupxml)plik zawierający wartości długości do 360, np.
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * Wdatasets.xmlfile, zmień nazwę pliku EDDTableFromNc4DFiles na EDDTableFromNcFiles (który teraz obsługuje pliki o dowolnej liczbie wymiarów) . Jeśli masz plik EDDTableFromNc4DFiles:
        
        1. MUSISZ zmienić na wpisz = "EDDTableFromNcFiles" w zestawach danych. Plik XML.
        2. Musisz dodać&lt;nWymiary &gt; 4&lt;/ nDimensions &gt; tag do XML zbioru danych.
        3. Możesz dodać nowy&lt;sortFilesBySourceNames &gt; tag w celu określenia wewnętrznego porządku plików, który określa ogólny porządek zwracanych danych.
        
Szczegółowe informacje znajdują się w:[Pliki EDDTableFromFiles](/docs/server-admin/datasets#eddtablefromfiles).
    * W przeszłości, dla EDDTableFromDapSequence,OPeNDAPSerwery DRDS, wdatasets.xml, użyliśmy&lt;sourceCanConstrainStringsRegex &gt; ~ =&lt;/ sourceCanConstrainStringReget &gt;. Ale teraz widzimy, że wsparcie regex DRDS jest bardziej ograniczone niżERDDAPwięc zalecamy&lt;sourceCanConstrainStringsRegex &gt;&lt;/ sourceCanConstrainStringRegex &gt; tak, aby ograniczenia regex nie były przekazywane do źródła, ale są obsługiwane przezERDDAP.
    * Zmieniona obsługa źródła CanConstrate... wdatasets.xmlprzez[EDDTableFromDapSequence](/docs/server-admin/datasets#eddtablefromdapsequence)oraz (wewnętrznie) wszystkie typy zbiorów danych EDDTable. Nowy system jest prostszy i lepiej odzwierciedla zmienność różnych źródeł danych. Może trzeba zmodyfikować XML dla swoich zbiorów danych wdatasets.xml.
* Istnieje kilka nowych funkcji, które są przydatne same w sobie, ale po połączeniu, również ułatwić tworzenie[sieci / klastry / federacjeERDDAPs](/docs/server-admin/additional-information#grids-clusters-and-federations).
    * Nowe typy zbiorów danych:
        *   [EDDGridFromErddap](/docs/server-admin/datasets#eddfromerddap)oraz[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap)które pozwalająERDDAP™zawiera zbiór danych z innegoERDDAP™w bardzo prosty i bardzo skuteczny sposób.
        *   [EDDGridPliki FromFiles](/docs/server-admin/datasets#eddgridfromfiles)  (i jego podklasy,[EDDGridPliki FromNc@@](/docs/server-admin/datasets#eddgridfromncfiles)które mogą odczytaćNetCDF .nc, GRIB .grb, orazHDF .hdfpliki) .
        *   [Pliki EDDTableFromNc@@](/docs/server-admin/datasets#eddtablefromncfiles)które mogą odczytaćNetCDF .ncktóre mają strukturę podobną do stołu.
    * RunLoadDatasets i LoadDatasets zostały zmienione tak, żeERDDAP™jest bardzo podatny na przeładowanie zbiorów danych na podstawie plików w[bandera](/docs/server-admin/additional-information#flag)katalog (często&lt;5 sekund, jeśli główny loadDatasets jest obecnie wykonywany).
    * Nowe usługi, aby umożliwić[URL do tworzenia pliku flagi](/docs/server-admin/additional-information#set-dataset-flag)dla danego zbioru danych, np.
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
tworzy plik flagi w katalogu flagi dla rPmelTao (chociaż flaga Klucz tutaj jest zły) .
    * Nowy[subskrypcja](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)usługa tak, aby każdy klient mógł określić działanie, które zostanie wykonane przy tworzeniu określonego zbioru danych (kiedyERDDAP™jest ponownie uruchomiony) i zawsze gdy zbiór danych zmienia się w jakikolwiek sposób. System ten może być wyłączony poprzez&lt;subscriptionSystemActive &gt; w Twoim[setup.xml](/docs/server-admin/deploy-install#setupxml)plik. WERDDAP™ [Sprawozdanie dzienne](/docs/server-admin/additional-information#daily-report)teraz zawiera listę wszystkich subskrypcji i zawiera adres URL potrzebny do anulowania każdego z nich, w przypadku gdy czujesz, że system jest nadużywany. Wdatasets.xml, istnieje nowy, opcjonalny [&lt;subskrypcja EmailBlacklist &gt;] (/ docs / server- admin / datasets # subscriptionemailblacklist) tag tak, aby administratorzy mogli określić oddzieloną comma- listę adresów e-mail, które są natychmiast na czarnej liście z systemu subskrypcji.
    * Nowy [&lt;onChange &gt;] (/ docs / server- admin / datasets # onchange) atrybut wdatasets.xmlPozwalaERDDAP™administrator określa działanie, które zostanie podjęte przy tworzeniu określonego zbioru danych (kiedyERDDAP™jest ponownie uruchomiony) i zawsze gdy zbiór danych zmienia się w jakikolwiek sposób.
    * Ulepszenia pełnego wyszukiwania tekstu: przechowywanie łańcucha wyszukiwania dla każdego zbioru danych używa teraz 1 / 2 pamięci. Algorytm wyszukiwania (Boyer - Moore- like) jest teraz 3X szybciej.
    * E-maile zERDDAP™teraz zawsze prependive temat i treść z\\[erddap Url\\]Aby było jasne,ERDDAP™To pochodzi z (w przypadku wielokrotnego podawaniaERDDAPs) .
    * Bardziej obszerne gromadzenie danych statystycznych dla[Sprawozdanie dzienne](/docs/server-admin/additional-information#daily-report)e-mail.
    * Nowy plik dziennika\\[bigParentDirectory\\]/ emailLogYEAR- MM- DD.txt loguje wszystkie wiadomości wysłane przezERDDAP™każdego dnia. Jest to szczególnie przydatne, jeśli serwer nie może wysyłać e-maili -- można przynajmniej przeczytać je w dzienniku.
    *   ERDDAP™Teraz robi\\[bigParentDirectory\\]/ cache / (datasetID) katalog dla każdego zbioru danych, ponieważ może być wiele plików buforowanych.
* Nowy[RSS2, 01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)pasza dla każdego zbioru danych (Poszukaj pomarańczyRSSikony na listach zbiorów danych, Formularze dostępu do danych oraz strony internetowe Make A Graph) .
*   EDDGrid .kmlodpowiedzi teraz używać images tiled ("supernakładki" -- dynamicznie generowane obrazy kwadratowe) . Początkowy obraz ładuje się do GoogleEarth znacznie szybciej niż wcześniej. Rozdzielczość mapy wzrasta wraz z powiększeniem, aż do pełnej rozdzielczości zbioru danych. Zalecany: użytkownicy powinni poprosić.kmldla jednego punktu czasowego, ale cały zbiór danych ma długość i szerokość geograficzną. Niestety, wsparcie dla przedziałów czasowych zostało usunięte (Mam nadzieję, że wróci.) .
*   ERDDAP™teraz dodaje[Wygasa i Cache- Kontrola max- nagłówek wieku](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)do wszystkich plików wymaganych z katalogu / images. To znacznie zmniejsza liczbę statycznych żądań wysłanych doERDDAPi tym samym znacznie przyspiesza większośćERDDAP™ładunki stron. Ponadto, wieleJavaOdniesienia do plików skryptowych przeniesione do dołu ich stron HTML, co również przyspiesza wieleERDDAP™ładunki stron. Dzięki książce "High Performance Web Sites" Steve Souders i ySlow dodatek do wtyczki FireBug w FireFox.
*   ERDDAP™z netcdf- java 2.2.22 na netcdf- java 4.0. Między innymi, to pozwalaEDDGridPliki FromNcdo odczytuHDF .hdf, jak również GRIB .grb iNetCDF .ncpliki.
*   EDDGridFromDap iEDDGridFromNcFiles teraz również wspierać DArray (oraz DGrid)  dataVariableb. Jeśli wymiar nie ma odpowiedniej zmiennej współrzędnych,ERDDAP™tworzy zmienną osi z wartościami indeksu (np. 0, 1, 2,..., 311, 312) . Więc wszystkie inne aspektyEDDGridpozostają takie same:
* Nadal obsługuje wszystkie zestawy danych jako Grids, ze zmienną osi dla każdego wymiaru.
* Zapytania mogą nadal wymagać wartości ze zmiennych osi.
Dzięki Charlesowi Carletonowi, Thomasowi Im, Dorianowi Raymerowi i innym.
* WWMS OpenLayersstrony mają domyślną długość geograficzną, szerokość geograficzną, która jest nieco większa niż zakres zbioru danych (nie dokładny zakres, więc kontekst małych zbiorów danych jest bardziej oczywisty) . Domyślny zakres może teraz wynosić od 0 do 360, co pozwala na pokazanie pełnego zakresu wielu zbiorów danych. DziękiToddSpindler.
* Nowe suwaki na niektórych Formularzach dostępu do danych i Make a Graph strony internetowe. Uproszczają (surowy) specyfikacja żądanych danych i oferują dobre wizualne informacje zwrotne.
* Nowa opcja&lt;zbiór danych &gt; tags indatasets.xml:[aktywny = "fałszywy"](/docs/server-admin/datasets#active).
* Odniesienia doERDjestERDDAP™zmieniony z coashard.pfel (nadal działa za pośrednictwem pośrednika) do straży przybrzeżnej.pfeg (preferowane) .
* Nowe wsparcie dla[data\\_minorazdata\\_max](/docs/server-admin/datasets#data_min-and-data_max)atrybuty zmiennych metadanych.
* Roztwór częściowy do[WaitThenTryAgain / Częściowe wyniki](/docs/server-admin/additional-information#waitthentryagain-exception): Niektóre prośby, które wcześniej zawiodły, gdy wykryto zmianę źródła danych, odniosą sukces, ponieważERDDAP™przeładuje zbiór danych i ponownie żąda danych automatycznie, wszystko w kontekście pierwotnego żądania.
* Naprawianie błędów: generować Zestawy danych Xml został wyłączony wERDDAP™wersja 1.12. Dzięki Ellyn Montgomery za wskazanie tego.
* Małe zmiany w obsłudze błędów.
* Wiele ulepszeń w celu uniknięcia / radzenia sobie z możliwymi warunkami wyścigu (tj. ewentualne problemy wynikające z wielowątkowego charakteruERDDAP) co spowodowało małe, rzadkie problemy.
* Jeśli komunikat błędu jest zapisany na obrazku, obraz pozostanie w pamięci podręcznej tylko przez ~ 5- 10 minut (nie 60) . Dzięki Cary Wilson.
* Standardową wiadomością, gdy nie ma danych jest teraz "Twoje zapytanie nie dało żadnych wyników dopasowania"., który jest krótszy, bardziej dokładny i pasujeOPeNDAPserwerów.
*   EDDGridnie dopuszcza już wartości związanych osi.
* Małe zmiany w zapytaniach .ver i .help.
* Wiele małych zmian i poprawek błędów.
     

## Wersja 1.12{#version-112} 
 (wydany 2008- 10- 31) 

* Tabela EDDFromSOSponownie działa z NDBCSOSi współpracuje z nowym NOSSOS.
* EDDTableFromBMDE teraz wymagaERDDAP™admin do określeniadataVariableb.
*   EDDGridnie wymaga już równomiernego rozmieszczenia źrenic i lonu. przejrzyste Png lub.kml. DziękiToddSpindler.
* Kilka drobnych zmian.
     

## Wersja 1.10{#version-110} 
 (wydany 2008- 10- 14) 

* Nowe metadane "colorBar" dla zmiennych danych wdatasets.xmlokreśla domyślne ustawienia paska kolorów dla wykresów i map. Patrz[więcej informacji](/docs/server-admin/datasets#color-bar-attributes). Jest to ważne, ponieważ znacznie poprawia wygląd domyślnych wykresów i map produkowanych przez Make A Graph i dlatego, że domyślne wykresy i mapy mają teraz spójny pasek kolorów nawet wtedy, gdy klient zmienia żądany czas lub zasięg geograficzny. Również, to było konieczne dlaWMS.
*   ERDDAP™teraz obsługuje większość danych siatki poprzezWMSobsługa. Jest to ważne, ponieważ pokazuje, że oprócz uzyskiwania danych z wielu typów serwerów danych,ERDDAP™może rozpowszechniać dane za pośrednictwem różnych protokołów (DAP,WMS,... więcej w przyszłości) . Patrz[Dokumentacja klienta](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html). Albo[dokumentacja dla administratorów](/docs/server-admin/datasets#wms). Lub[Spróbuj](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html).
* Nowe wsparcie dla wartości długości geograficznej &gt; 180 w.kmlpliki.
* Nowy cdm\\ _ data\\ _ type: Inne.
*   ERDDAP™teraz obsługuje "boolean" source dataType. Patrz[więcej informacji](/docs/server-admin/datasets#boolean-data)Będzie to przydatne w przyszłej bazie danych EDDTableFromDatabase.
* Nowy EDDTableFromBMDE obsługuje źródła danych DiGIR / BMDE.
* EDVGridAxis umożliwia teraz schodzenie sortowanych wartości. Zestawy danych PmeloOscara tego potrzebowały.
*   ERDDAP™teraz zwraca błędy HTTP (np. "404 dla zasobów / strony nie znaleziono") w więcej sytuacjach, zamiast stron HTML z komunikatami błędów.
* Wiele zmian / dodatków doERDDAP™dokumentację.
* Dużo drobnych zmian.
* Kilka poprawek.
*    **RzeczyERDDAP™administratorzy powinni dokonać aktualizacji do tej wersji:** 
    * Wdatasets.xml, dla każdego EDDTableFromSOSZestawy danych, zmienić metadane "observedProperty" na "sourceObservedProperty".
    * Zasady dotycząceaxisVariablelubdataVariablejestdestinationNamesą teraz[surowsze](/docs/server-admin/datasets#datavariable-addattributes). Musisz sprawdzić, czy nazwy zmiennych są poprawne. Albo sprawdzić je ręcznie, albo uruchomićERDDAP™i spojrzeć na komunikaty błędów w raporcie, który jest wysyłany do administratora.
    * Wdatasets.xml, jeśli chcesz, aby zmienna danych siatki była dostępna przezWMS, musisz dodać metadane colorBar. Przynajmniej, na przykład,&lt;att name = "colorBarMinimum"type =" double "&gt; 0&lt;/ att &gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Patrz[więcej informacji](/docs/server-admin/datasets#wms).
    * Dodać[setup.xml](/docs/server-admin/deploy-install#setupxml)plik (ale dostosować go z informacjami) :

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## Wersja 1.08{#version-108} 
 (wydany 2008- 07- 13) 

* Nowy serwis internetowy wERDDAP™, generować Zestawy danych Xml, asystyERDDAP™administratorzy poprzez stworzenie szkicu XML potrzebnego do opisania zbioru danych wdatasets.xml
* Niektóre zmiany / poprawki błędów związane z zezwoleniem griddap być postrzegane przez netcdf- java jako serwer opendap, w tym: globalny metadane jest teraz oznaczony "NC\\ _ GLOBAL" (zamiast "GLOBAL") .
* WEDDGrida Formularze dostępu do danych EDDTable wykorzystują teraz informacje o zapytaniach w URL. Na przykład, jeśli użytkownik przechodzi z formularza Make A Graph do formularza dostępu do danych, ograniczenia są teraz właściwie przenoszone.
*   tabledap'S Make A Graph pozwala teraz na ograniczenia zmiennych String.
* EDDTable 's Make A Graph pozwala teraz na ograniczenia NaN. Dzięki Steve' owi Hankinowi.
* Ustawienie błędu: zapis tabeli EDDTable ASImage nie rozpoznał właściwie wartości .colorbar min i max. Dzięki Steve 'owi Hankinowi
* Wiele ulepszeń do setupDatasetsXml. Dzięki Ellyn Montgomery.
* Żądania Griddap teraz pozwalają () -styl żąda nieco poza rzeczywistym zakresem osi. Jest to właściwe, ponieważ () -wartości są zaokrąglone do najbliższej wartości rzeczywistej. Dzięki Cindy Bessey
* Zrobiłam test FloatArray i DoubleArray 'a, który jest bardziej wyrafinowany. Zawsze będzie niedoskonały. (ponieważ test musiałby być dostosowany dla każdego zbioru danych) Ale powinno być lepiej. Dzięki Ellyn Montgomery.
* Przeniosłem setup.html i setupDatasets Xml.html erddap 's / download directory and hard code all links to them. Teraz mogę dokonać zmian i uaktualnić informacje o konfiguracji natychmiast.
* Wiele drobnych zmian. Kilka drobnych poprawek.
*    **RzeczyERDDAP™administratorzy powinni dokonać aktualizacji do tej wersji:** 
    * Przesuń&lt;Krótki opis Html &gt; z wiadomości xml do wiadomości[setup.xml](/docs/server-admin/deploy-install#setupxml)plik. Określa tekst, który pojawia się w środku lewej stronyERDDAP™Strona główna. Dodać&lt;h1 &gt;ERDDAP&lt;/ h1 &gt; (lub jakiś inny nagłówek) do góry. **Albo,** kopia&lt;The ShortDescriptionHtml &gt; w nowym[setup.xml](/docs/server-admin/deploy-install#setupxml)plik (z nowego erddapContent.zip) Do twojej ugody.
         

## Wersja 1.06{#version-106} 
 (wydany 2008- 06- 20) 

* Nowe wsparcie dlaIOOS DIF SOSźródła danych.
* Wiele drobnych zmian. Kilka drobnych poprawek.
     

## Wersja 1.04{#version-104} 
 (wydany 2008- 06- 10) 

* Nowa funkcja Slide Sorter.
* Nowa strona Google Gadgets i przykłady.
* Ustaw błądEDDGrid.saveAsNc dla zmiennej ze skalą i addOffset.
     

## Wersja 1.02{#version-102} 
 (wydany 2008- 05- 26) 

* NowyEDDGridSideBySide pozwala na różneaxisVariables\\[0\\]źródło Wartości.
* Wszystkie zbiory danych prądów i wiatrów zostały połączoneEDDGridZestawy danych SideBySide.
* Obrazy z żądań obrazów są teraz buforowane na 1 godzinę.
     

## Wersja 1.00{#version-100} 
 (wydany 2008- 05- 06) 

* Dodać Wykres strony internetowe i polecenia graficzne w URL.
* Obsługa plików flag, aby wymusić przeładowanie zbioru danych.
* Nowy typ zbioru danych: Pliki EDDTableFrom4DFiles (Pierwsza podklasa plików EDDTableFromFiles) .
