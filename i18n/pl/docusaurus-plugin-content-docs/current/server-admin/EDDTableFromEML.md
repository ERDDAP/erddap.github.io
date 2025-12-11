---
title: "EDDTableFromEML"
sidebar_position: 6
---
# The EDDTableFromEML and EDDTableFromEMLPartii Opcje w generateDatasets Xml

 \\[ Ta strona będzie interesować tylko ERDDAP™ administratorzy pracujący z plikami EML.
Dokument ten został pierwotnie stworzony w 2016 r. Ostatnia edycja: 2020- 11- 30. \\] 

 [ ** ERDDAP™ ** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) jest serwerem danych, który daje użytkownikom prosty, spójny sposób pobierania podzbiorów danych naukowych w formie podręcznej i tabelarycznej we wspólnych formatach plików oraz tworzenia wykresów i map. ERDDAP™ działa z danym zbiorem danych jako grupa wielowymiarowych zmiennych zawiązanych (np. dane satelitarne lub modelowe) lub jako tabela podobna do bazy danych (z kolumną dla każdego typu informacji i wierszem dla każdej obserwacji) . ERDDAP™ jest Programy Free i Open Source, więc każdy może [pobierać i instalować ERDDAP™ ](/docs/server-admin/deploy-install) służyć ich danych.

Aby dodać zestaw danych do ERDDAP™ instalacji, ERDDAP™ administrator musi dodać fragment XML opisujący zbiór danych do pliku o nazwie datasets.xml . (Jest. [szczegółowa dokumentacja datasets.xml ](/docs/server-admin/datasets) .) Chociaż możliwe jest wygenerowanie części XML dla datasets.xml całkowicie ręcznie, ERDDAP™ pochodzi z narzędzia o nazwie [ **GenerateDatasetsXml** ](/docs/server-admin/datasets#tools) które mogą wygenerować przybliżony szkic fragmentu XML potrzebnego dla danego zbioru danych w oparciu o pewne źródło informacji o zbiorze danych.

Pierwsza rzecz GenerateDatasets Xml pyta jaki rodzaj zbioru danych chcesz utworzyć. GenerateDatasets Xml ma specjalną opcję, **EDDTableFromEML** , który wykorzystuje informacje w [Język metadanych ekologicznych (EML) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html) Plik XML do wygenerowania części XML dla datasets.xml do tworzenia [Pliki EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles) zbiór danych z każdej tabeli danych w pliku EML. Działa to bardzo dobrze w przypadku większości plików EML, głównie dlatego, że pliki EML doskonale przechowują wszystkie niezbędne metadane dla zbioru danych w formacie easy- to- work- with. Informacje, które GenerateDatasetsXml potrzebuje do tworzenia zbiorów danych są w pliku EML, w tym adres URL pliku danych, który GenerateDatasetsXml pobiera, przetwarza i porównuje do opisu w pliku EML. (Wiele grup zrobiłoby dobrze przechodząc na EML, który jest świetnym systemem dokumentowania każdego zbioru danych naukowych, a nie tylko danych ekologicznych. I wiele grup, które tworzą schematy XML byłoby dobrze wykorzystać EML jako studium przypadku dla schematów XML, które są jasne, do punktu, nie nadmiernie głębokie (tj. zbyt wiele poziomów) i łatwe dla ludzi i komputerów do pracy.) 

## Pytania{#questions} 

Oto wszystkie pytania GenerateDatasets Xml zapyta, z komentarzami o to, jak należy odpowiedzieć, jeśli chcesz przetwarzać tylko jeden plik EML lub partię plików EML:

* Który typ EDDType?
Jeśli chcesz przetworzyć tylko jeden plik, odpowiedz: EDDTableFromEML
Jeśli chcesz przetworzyć grupę plików, odpowiedz: EDDTableFromEMLPartii
* Katalog do przechowywania plików?
Podaj nazwę katalogu, który będzie używany do przechowywania pobranych plików EML i / lub danych.
Jeśli katalog nie istnieje, zostanie utworzony.
*    (Dla EDDTableFromeML Tylko) URL EML czy lokalna nazwa pliku?
Podaj adres URL lub lokalną nazwę pliku EML.
*    (Wyłącznie dla EDDTableFromEMLPartii) Dyr EML (URL lub lokalny) ?
Podaj nazwę katalogu z plikami EML (URL lub dir lokalny) .
Na przykład:http://sbc.lternet.edu/data/eml/files/
*    (Wyłącznie dla EDDTableFromEMLPartii) Regeks nazwy pliku?
Wprowadź wyrażenie regularne, które będzie używane do identyfikacji żądanych plików EML w katalogu EML.
Na przykład: Mamba, Związek / randka
* Użyj lokalnych plików, jeśli są obecne (prawda | false) ?
Wpisz true, aby używać istniejących lokalnych plików EML i plików danych, jeśli istnieją.
Wprowadź false, aby zawsze ponownie pobrać pliki EML i / lub dane.
* dostępne Do?
Jeśli chcesz, aby nowe zbiory danych były prywatne ERDDAP , podać nazwę grupy (s) który będzie miał dostęp.
Zalecane dla grup LTER: połączyć "lter" plus grupa, np. lter Sbc.
Jeśli wprowadzisz "null", nie będzie&lt;dostępne Do & gt; znacznika w wyjściu.
Patrz [dostępne Do](/docs/server-admin/datasets#accessibleto) .
* lokalne Strefa czasowa (np. USA / Pacyfik) ?
Jeśli zmienna czasu wskazuje, że posiada lokalne wartości czasu, ta strefa czasu zostanie przydzielona.
To musi być wartość z [Lista kolumn TZ nazw stref czasowych](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) .
Zwróć uwagę na wszystkie nazwy "US /" na końcu listy.
Jeśli później okaże się to nieprawidłowe, można zmienić time\\_zone w kawałku datasets.xml .

EML plus ERDDAP™ to świetna kombinacja, ponieważ ERDDAP™ może dać użytkownikom bardziej bezpośredni dostęp do bogactwa [Sieć wiedzy na rzecz biozłożoności (KNB) ](https://knb.ecoinformatics.org/) oraz [Długoterminowe badania ekologiczne (PÓŹNIEJ) ](https://lternet.edu/) dane i pomoc te projekty spełniają rząd USA [Publiczny dostęp do wyników badań (PARR) wymagania](https://nosc.noaa.gov/EDMC/PD.DSP.php) poprzez udostępnienie danych za pośrednictwem usługi internetowej. Ponadto EML plus ERDDAP™ wydaje się być wielkim pomostem między naukowcami w sferze akademickiej / finansowanej przez NSF a naukowcami w agencji federalnej ( NOAA , NASA, USGS) królestwo.

Zobacz [rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support) .
 
## Szczegóły dotyczące projektu{#design-details} 

Oto szczegóły projektu opcji EDDTableFromEML w GenerateDatasetsXml.
Niektóre są związane z różnicami w sposobie EML i ERDDAP™ robić rzeczy i jak GenerateDatasets Xml zajmuje się tymi problemami.

### Jedna tabela danych staje się jedną ERDDAP™ Zestaw danych{#one-datatable-becomes-one-erddap-dataset} 
Jeden plik EML może mieć wiele&lt;dane Tabela & gt; s. ERDDAP™ sprawia, że jeden ERDDAP™ zbiór danych według tabeli danych EML. W datasetID dla zbioru danych jest
 *Nazwa EML* \\ _ t *Tabela Numer*   (kiedy nazwa EML jest tekstem) lub
 *system\\ _ EML Nazwa* \\ _ t *Tabela Numer*   (gdy nazwa EML jest numerem) .
Na przykład, tabela # 1 w pliku knb- lter- sbc.28 staje się ERDDAP™   datasetID = knb\\ _ lter\\ _ sbc\\ _ 28\\ _ t1,
     
### EML wobec CF + ACDD{#eml-versus-cfacdd} 
Prawie wszystkie metadane w plikach EML dostają się do ERDDAP ale w innym formacie. ERDDAP™ wykorzystuje [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) oraz [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standardy metadanych. Są to uzupełniające się systemy metadanych, które wykorzystują klucz = pary wartości dla globalnych metadanych i dla metadanych każdej zmiennej.
Tak, reprezentacja EML metadanych jest milsza niż reprezentacja CF + ACDD. Nie sugeruję, by użyć reprezentacji CF + ACDD jako zastępstwa dla EML. Proszę myśleć o CF + ACDD jako część mostu ze świata EML do OPeNDAP / CF / ACDD World.
     
### Małe zmiany{#small-changes} 
 ERDDAP™ wprowadza wiele drobnych zmian. Na przykład: ERDDAP™ wykorzystuje EML nie- DOI zastępca Identyfikator plus numer tabeli ERDDAP™   datasetID , ale nieznacznie zmienia alternatywny Identyfikator, aby to poprawna nazwa zmiennej w większości języków komputerowych, np. dane knb- lter- sbc.33 Tabela # 1 staje się knb\\ _ lter\\ _ sbc\\ _ 33\\ _ t1.
     
### DocBook{#docbook} 
EML wykorzystuje system znakowania DocBook, aby zapewnić strukturę bloków tekstu w plikach EML. CF i ACDD wymagają, aby metadane były prostym tekstem. GenerateDatasets Xml przekształca zaznaczony tekst w zwykły tekst, który wygląda jak sformatowana wersja tekstu. Znaczniki inline są oczyszczone nawiasami kwadratowymi, np., \\[ podkreślone \\] i wyszedł w zwykłym tekście.
     
### Pliki danych{#data-files} 
Ponieważ tabela danych EML zawiera adres URL rzeczywistego pliku danych, GenerateDatasets Xml:
1. Pobierz plik danych.
2. Przechowuj go w tym samym katalogu co plik EML.
3. Przeczytaj dane.
4. Porównaj opis danych w EML z rzeczywistymi danymi w pliku.
5. Jeśli GenerateDatasets Xml znajduje różnice, zajmuje się nimi, lub pyta operatora, czy różnice są w porządku, lub zwraca komunikat błędu. Szczegóły znajdują się w różnych punktach poniżej.
         
###  .zip Pliki danych{#zipd-data-files} 
Jeżeli odnośny plik danych jest .zip plik musi zawierać tylko jeden plik. Ten plik zostanie użyty do ERDDAP™ zestaw danych. Jeśli istnieje więcej niż 1 plik. ERDDAP™ odrzuci ten zestaw danych. W razie potrzeby można to zmodyfikować. (W praktyce wszystkie pliki SBC LTER zip mają tylko jeden plik danych.)   
     
### Typ obiektu{#storagetype} 
Jeżeli przechowywanie kolumny Typ nie jest określony, ERDDAP™ wykorzystuje swoje najlepsze przypuszczenia na podstawie danych w pliku danych. To działa całkiem nieźle.
     
### Jednostki{#units} 
 ERDDAP™ zastosowania [ UDUNITS formatowanie dla jednostek](https://www.unidata.ucar.edu/software/udunits/) . GenerateDatasets Xml jest w stanie przekonwertować jednostki EML do UDUNITS Czysty 95% czasu. Pozostałe 5% prowadzi do czytelnego opisu jednostek, np. "biomassDensityUnitPerAbundanceUnit" w EML staje się "jednostka gęstości biomasy na jednostkę obfitości" w ERDDAP . Technicznie to nie jest dozwolone. W tych okolicznościach nie jest tak źle. \\[ W razie potrzeby, jednostki, które nie mogą być wykonane UDUNITS kompatybilny może być przeniesiony do atrybutu komentarza zmiennej. \\]   
     
### EML wersja 2.1.1{#eml-version-211} 
To wsparcie dla plików EML v2.1.1 zostało dodane do GenerateDatasets Xml w 2016 r., mając nadzieję, że w społeczności EML nastąpi pewien stopień absorpcji. Od 2020 roku tak się nie stało. W ERDDAP™ deweloperzy chętnie dodają wsparcie dla nowszych wersji EML, ale tylko wtedy, gdy nowe funkcje będą rzeczywiście używane. Proszę e-mail erd.data at noaa.gov jeśli chcesz wsparcia dla nowszych wersji EML i rzeczywiście korzystać z tej funkcji.
     

## Problemy z plikami EML{#issues-with-the-eml-files} 

Istnieją pewne problemy / problemy z plikami EML, które powodują problemy, gdy klient oprogramowania (np. opcja EDDTableFromEML w GenerateDatasetsXML) próbuje interpretować / przetwarzać pliki EML.

* Chociaż jest kilka problemów wymienionych tutaj, są to głównie małe, rozwiązywalne problemy. Ogólnie rzecz biorąc, EML to wspaniały system i z przyjemnością z nim pracuję.
* Są one w przybliżeniu posortowane od najgorszego / najczęściej do najmniej złego / mniej powszechne.
* Większość jest związana z małymi problemami w określonych plikach EML (które nie są winą EML) .
* Większość można naprawić poprzez proste zmiany w pliku EML lub pliku danych.
* Biorąc pod uwagę fakt, że ludzie z ITER budują sprawdzacz EML, aby sprawdzić ważność plików EML, dodałem poniżej kilka sugestii dotyczących funkcji, które mogą być dodane do sprawdzania.

Oto zagadnienia:

### Oddzielne kolumny daty i czasu{#separate-date-and-time-columns} 
Niektóre pliki danych mają oddzielne kolumny dla daty i czasu, ale bez ujednoliconej daty + kolumny czasu. Aktualnie, GenerateDatasets Xml tworzy zbiór danych z tymi oddzielnymi kolumnami, ale nie jest idealny, ponieważ:

* Najlepiej, jeśli dane się zestawią. ERDDAP™ mają połączoną datę + kolumna czasu wywołana "time" .
* Często zbiór danych nie załaduje się ERDDAP™ ponieważ "time" kolumna nie zawiera danych date + time.

Istnieją dwa możliwe rozwiązania:
1. Edytuj plik danych źródłowych, aby dodać nową kolumnę w datafile (i opisać to w EML) gdzie kolumny daty i czasu są łączone w jedną kolumnę. Następnie uruchom ponownie GenerateDatasets Xml więc znajduje nową kolumnę.
2. Użyj [Zmienne pochodne](/docs/server-admin/datasets#script-sourcenamesderived-variables) funkcja w ERDDAP™ do zdefiniowania nowej zmiennej w datasets.xml która jest tworzona przez połączenie daty i kolumn czasowych. Jeden z przykładów dotyczy konkretnie tej sytuacji.
         
### Niespójne nazwy kolumn{#inconsistent-column-names} 
Pliki EML zawierają listę kolumn i nazw plików danych. Niestety, często różnią się od nazw kolumn w rzeczywistym pliku danych. Normalnie kolejność kolumn w pliku EML jest taka sama jak kolejność kolumn w pliku danych, nawet jeśli nazwy różnią się nieznacznie, ale nie zawsze. GenerateDatasets Xml próbuje dopasować nazwy kolumn. Kiedy nie może (często) , to zatrzyma, pokaże Ci EML / nazwy plików, i zapytaj, czy są one prawidłowo wyrównane. Jeśli wprowadzisz 's' do pominięcia tabeli, GeneratedDatasetsXml wydrukuje komunikat o błędzie i przejdzie do następnej tabeli.
Rozwiązaniem jest zmiana błędnych nazw kolumn w pliku EML, aby dopasować nazwy kolumn w pliku danych.
     
### Różne kolejność kolumn{#different-column-order} 
Istnieje kilka przypadków, w których EML określił kolumny w innej kolejności niż w pliku danych. GenerateDatasets Xml zatrzyma się i zapyta operatora, czy zapałki są w porządku lub czy zestaw danych powinien zostać pominięty. Jeśli zostanie pominięty, w pliku wyników pojawi się komunikat błędu, np.:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\\_lter\\_sbc\\_17\\_t1
      dataFile=all\\_fish\\_all\\_years\\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\\_TIMING        = notes
        NOTES                = survey\\_timing
      --&gt;
```
Rozwiązaniem jest ustalenie kolejności kolumn w tych plikach EML tak, aby pasowały do kolejności w plikach danych.

Byłoby miło, gdyby kontroler EML sprawdził, czy kolejność kolumn i kolumn w pliku źródłowym odpowiada kolejności kolumn i kolumn w pliku EML.
    
### Nieprawidłowe numery HeaderLines{#incorrect-numheaderlines} 
Kilka danych Tabele nieprawidłowo określają numer HeaderLines = 1, np.... sbc.4011. Powoduje to ERDDAP™ odczytywanie pierwszego wiersza danych jako nazw kolumn. Próbowałem ręcznie przeszukać wszystkie te tabele. Są one oczywiste, ponieważ niezrównane nazwy coli źródłowych są wartościami danych. A jeśli są pliki, które nieprawidłowo mają numHeaderLines = 0, mój system nie czyni tego oczywistym. Oto przykład z pliku błędów SBC LTER:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3017\\_t1
      dataFile=MC06\\_allyears\\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\\_local
        2008-10-01T07:00     = timestamp\\_UTC
        2.27                 = discharge\\_lps
        -999.0               = water\\_temperature\\_celsius
      --&gt;
```
Więc błąd może pojawić się jak GenerateDatasets Xml uważa, że pierwsza linia z danymi w pliku (np. z 2008-10-01T00: 00 itp.) jest linią z nazwami kolumn (jakby 2008-10-01T00: 00 były nazwą kolumny) .

Byłoby miło, gdyby sprawdzacz EML sprawdził wartość numHeaderLines.
    
### numHeaderLines = 0{#numheaderlines--0} 
Niektóre pliki źródłowe nie mają nazw kolumn. ERDDAP™ akceptuje, że jeżeli EML opisuje tę samą liczbę kolumn.

Moim zdaniem to wydaje się bardzo niebezpieczne. Mogą być kolumny w innej kolejności lub z różnymi jednostkami (zob. poniżej) i nie ma sposobu, aby złapać te problemy. Jest znacznie lepiej, jeśli wszystkie pliki ASCII mają wiersz z nazwami kolumn.
    
### DateTime Format Strings{#datetime-format-strings} 
EML ma standardowy sposób na opisanie formatów daty. ale istnieją znaczne różnice w jego stosowaniu w plikach EML. (Wcześniej się myliłem. Widzę dokumentację EML dla formatString, która wydaje się pasować do [ Java Specyfikacja DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html) , ale który brakuje ważnych wytycznych dotyczących jego stosowania, w wyniku czego formatString jest często / zazwyczaj niewłaściwie używane.) Istnieje kilka przypadków nieprawidłowego powielania listu i / lub niestandardowego formatowania. To nakłada nieuzasadnione obciążenie na klientów, zwłaszcza klientów oprogramowania, takich jak GenerateDatasetsXml. GenerateDatasets Xml próbuje przekształcić nieprawidłowo zdefiniowane formaty w plikach EML w
 [format daty / czasu, który ERDDAP™ wymaga](/docs/server-admin/datasets#string-time-units) , który jest prawie identyczny z Java / Specyfikacja formatu czasowego Joda, ale jest nieco bardziej wyrozumiała.

Byłoby miło, gdyby kontrola EML wymagała ścisłego przestrzegania Java Joda ERDDAP Specyfikacja jednostek czasowych i sprawdzenie, czy wartości czasowe daty w tabeli danych mogą być prawidłowo analizowane z określonym formatem.
    
### DateTime But No Time Zone{#datetime-but-no-time-zone} 
GenerateDatasets Xml szuka kolumny z datą Czas i określona strefa czasowa (albo Zulu : od jednostek czasowych kończących się w 'Z' lub nazwa kolumny lub definicja atrybutu, która zawiera "gmt" lub "utc", lub lokalną: od "local" w nazwie kolumny lub definicji atrybutu) . Również akceptowalny jest plik z kolumną daty, ale bez kolumny czasu. Akceptowalny jest również plik bez informacji o dacie i czasie.

GenerateDatasets Xml traktuje wszystkie "lokalne" czasy jako pochodzące ze strefy czasowej, którą można określić dla danej partii plików, np. dla SBC LETER, użyj US / Pacific. Informacje są czasami w komentarzach, ale nie w formie, która jest łatwa do rozgryzienia przez program komputerowy.

Pliki, które nie spełniają tych kryteriów są odrzucane z wiadomością "NO GOOD DATE (CZAS) Zmartwychwstanie ". Częstymi problemami są:

* Jest kolumna z datami i kolumna z czasem, ale nie data Kolumna czasu.
* Są jednostki czasowe, ale strefa czasowa nie jest określona.

Inne uwagi:
Jeśli jest dobra data + czas z kolumną strefy czasowej, ta kolumna zostanie nazwana "time" w ERDDAP . ERDDAP™ wymaga, aby dane kolumny czasu były zrozumiałe / zamienne do Zulu / UTC / GMT time zone dateTimes. \\[ Moim zdaniem: użycie czasu lokalnego i różnych formatów daty / czasu (2-cyfrowe lata&#33; mm / dd / yy vs dd / mm / yy vs...) w plikach danych zmusza użytkownika końcowego do wykonywania skomplikowanych konwersji do Zulu czas w celu porównania danych z jednego zbioru danych z danymi z innego. Więc... ERDDAP™ standaryzuje wszystkie dane czasowe: Dla czasów strun, ERDDAP™ zawsze używa ISO 8601: 2004 (E) standardowy format, na przykład, 1985-01-02T00: 00: 00Z. Dla czasów liczbowych, ERDDAP™ zawsze używa "seconds since 1970-01-01T00:00:00Z" . ERDDAP™ zawsze używa Zulu   (UTC, GMT) strefa czasowa mająca na celu usunięcie trudności związanych z pracą w różnych strefach czasowych oraz czas standardowy w porównaniu z czasem dziennym. GenerateDatasets Xml poszukuje kolumny EML z datą + czasem Zulu . Jest to trudne, ponieważ EML nie używa formalnego słownictwa / systemu (jak [ Java / format czasu Joda](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html) ) w celu określenia danych Format czasu:
Jeżeli istnieje col o liczbowych wartościach czasu (np., Matlab razy) oraz Zulu strefa czasowa (lub tylko daty, bez kolumn czasowych) , jest stosowany jako "time" .
Jeśli istnieje col z datą i czasem danych, za pomocą Zulu strefa czasowa, jest stosowana jako "time" i wszelkie inne daty lub kolumny czasowe są usuwane.
Inne, jeśli col z informacji tylko data jest znaleziona, jest używany jako "time" zmienna (bez strefy czasowej) .
Jeżeli istnieje kolumna danych i kolumna czasu i brak połączonej daty Kolumna czasu, zbiór danych jest REJECTED - ale zbiór danych może być przydatny poprzez dodanie połączonej daty Kolumna czasowa (najlepiej, Zulu strefa czasowa) do pliku datafile i dodanie jego opisu do pliku EML.
PRZYKŁAD SBC: [https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/) data Table # 2.

Byłoby miło, gdyby EML / LTER wymagała włączenia kolumny z Zulu   (UTC, GMT) czasy strefy czasowej we wszystkich odpowiednich plikach danych źródłowych. Następnie najlepiej jest dodać system do EML, aby określić time\\_zone atrybut przy użyciu nazw standardowych (od [Kolumna TZ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) ) .
    
### Brak missing\\_value  {#missing-missing_value} 
Niektóre kolumny używają missing\\_value ale nie wymieniaj go w metadanych EML, np., opady\\ _ mm w knb- lter- sbc.5011 wykorzystuje -999. Jeśli w EML nie podano brakującej wartości, GenerateDatasetsXml automatycznie wyszukuje wspólne brakujące wartości (np. 99, -99, 999, -999, 9999, -9999 itp.) i tworzy te metadane. Ale inne zaginięcia missing\\_value s nie są złowione.

Byłoby miło, gdyby sprawdzacz EML szukał zaginięcia. missing\\_value b.
    
### Małe problemy{#small-problems} 
Jest wiele małych problemów. (pisownia, interpunkcja) które prawdopodobnie znajdą tylko ludzie kontrolujący każdy zestaw danych.

Byłoby miło, gdyby sprawdzacz EML szukał błędów pisowni i gramatyki. Jest to trudny problem, ponieważ słowa w nauce są często oznaczane przez warcaby. Prawdopodobnie potrzebna jest ludzka edycja.
    
### Nieprawidłowe znaki Unicode{#invalid-unicode-characters} 
Część zawartości EML zawiera nieprawidłowe znaki Unicode. Są to prawdopodobnie znaki z karty Windows, które zostały nieprawidłowo skopiowane i wklejone do plików EML UTF- 8. GenerateDatasets Xml oczyszcza te znaki np., \\[ # 128 \\] , więc są łatwe do znalezienia w ERDDAP™   datasets.xml plik.

Byłoby miło, gdyby sprawdził to EML. Łatwo ją znaleźć i łatwo naprawić.
    
### Różne jednostki kolumnowe] (# differentColumnUnits)  {#different-column-unitsdifferentcolumnunits} 
Niektóre tabele EML definiują kolumny, które są niezgodne z kolumnami w pliku danych, w szczególności dlatego, że mają różne jednostki. GenerateDatasets Xml oznacza to. Od operatora zależy, czy różnice są w porządku, czy nie. Pojawiają się one w pliku błędów jako "SKIPPED" tabele danych. PRZYKŁAD w pliku błędów SBC LTER:
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3\\_t1
      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch
        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch
      -->
```
Byłoby miło, gdyby kontroler EML sprawdził, czy jednostki pasują. Niestety, jest to prawdopodobnie niemożliwe do złapania, a następnie do rozwiązania bez kontaktu z twórcą zbioru danych, biorąc pod uwagę, że plik źródłowy nie zawiera jednostek. Rozbieżność na powyższym przykładzie była zauważalna tylko dlatego, że jednostki zostały włączone do nazwy kolumny źródłowej i nazwy kolumny EML. Ile innych tabel danych ma ten problem, ale są niewykrywalne?
    
### Różne wersje EML{#different-versions-of-eml} 
GenerateDatasets Xml jest przeznaczony do pracy z EML 2.1.1. Inne wersje EML będą działać w takim stopniu, że pasują do 2.1.1 lub że GenerateDatasetsXml ma specjalny kod do czynienia z nim. To rzadki problem. Kiedy to nastąpi, rozwiązaniem jest przekształcenie plików do EML 2.1.1, lub wysłanie pliku EML do erd.data at noaa.gov , więc mogę dokonać zmian w GenerateDatasets Xml do radzenia sobie z różnicami.

Bob dodał obsługę plików EML do GenerateDatasets Xml w 2016 r., mając nadzieję, że w społeczności EML nastąpi pewien stopień absorpcji. Od 2020 roku tak się nie stało. Bob chętnie doda wsparcie dla nowszych wersji EML, ale tylko wtedy, gdy nowe funkcje będą rzeczywiście używane. Proszę e-mail erd.data at noaa.gov jeśli chcesz wsparcia dla nowszych wersji EML i rzeczywiście korzystać z tej funkcji.
    
### Problem z parkowaniem pliku danych{#trouble-parsing-the-data-file} 
Rzadko można odrzucić tabelę danych z błędem "nieoczekiwana liczba pozycji na linii # 120 (obserwowane = 52, spodziewane = 50) "Taki komunikat błędu oznacza, że linia w datafile miała inną liczbę wartości niż inne linie. To może być problem w ERDDAP™   (na przykład, niepoprawnie odczytywanie pliku) lub w aktach. PRZYKŁAD SBC:
 [https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/) dataTable # 3, see datafile = LTER\\ _ monthly\\ _ bottledata\\ _ registered\\ _ stations\\ _ 20140429.txt
