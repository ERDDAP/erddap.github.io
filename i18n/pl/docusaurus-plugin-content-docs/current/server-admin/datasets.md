---
sidebar_position: 3
---
# Praca z datasets.xml Plik

 \\[ Ta strona będzie interesować tylko ERDDAP™ administratorzy. \\] 

Po zakończeniu ERDDAP™   [instrukcje instalacji](/docs/server-admin/deploy-install) , musisz edytować datasets.xml plik *tomcat* / content / erddap / w celu opisania zbiorów danych ERDDAP™ instalacja będzie służyć.

Możesz zobaczyć przykład [ datasets.xml w sprawie GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .

- -

##  [Wprowadzenie](#introduction)  {#introduction} 

### Niektóre zespoły wymagane{#some-assembly-required} 
Tworzenie zbioru danych w ERDDAP™ nie jest tylko kwestią wskazywania katalogu danych lub adresu URL. Musisz napisać kawałek XML dla datasets.xml który opisuje zbiór danych.

* Dla zestawów danych z zapięciem, w celu dostosowania zestawu danych do ERDDAP Struktura danych dla danych zawiązanych, musisz zidentyfikować podzbiór zmiennych zbioru danych, które mają te same wymiary. ( [Dlaczego?](#why-just-two-basic-data-structures)   [Jak?](#dimensions) ) 
* Bieżące metadane zbioru danych są automatycznie importowane. Ale jeśli chcesz zmodyfikować metadane lub dodać inne metadane, musisz je określić w datasets.xml . I ERDDAP™ potrzebuje innych metadanych, w tym [atrybuty globalne](#global-attributes)   (takie jak infoUrl , instytucji, sourceUrl , streszczenie i tytuł) oraz [atrybuty zmienne](#variable-addattributes)   (takie jak long\\_name i jednostki) . Podobnie jak metadane, które są obecnie w zbiorze danych dodaje informacje opisowe do zbioru danych, metadane wymagane przez ERDDAP™ dodaje informacje opisowe do zbioru danych. Dodatkowe metadane jest dobrym dodatkiem do zbioru danych i pomaga ERDDAP™ lepiej zaprezentować swoje dane użytkownikom, którzy ich nie znają.
*    ERDDAP™ potrzebuje zrobić specjalne rzeczy z [długość, szerokość, wysokość (lub głębokość) oraz zmienne czasowe](#destinationname) .

Jeśli kupić do tych pomysłów i wydać wysiłek, aby utworzyć XML dla datasets.xml Masz wszystkie zalety ERDDAP™ w tym:

* Pełne wyszukiwanie tekstów dla zbiorów danych
* Szukaj zbiorów danych według kategorii
* Formularze dostępu do danych ( * datasetID * .html) więc możesz poprosić o podzbiór danych w wielu różnych formatach plików
* Formularze do żądania wykresów i map ( * datasetID * .graph) 
* Web Map Service ( WMS ) dla zestawów danych w sieci
*    RESTful dostęp do danych

Dokonywanie datasets.xml podejmuje znaczne wysiłki w odniesieniu do kilku pierwszych zbiorów danych, ale **będzie łatwiej** . Po pierwszym zbiorze danych, można często ponownie użyć dużo swojej pracy do następnego zbioru danych. Na szczęście, ERDDAP™ ma dwa [Narzędzia](#tools) pomóc w tworzeniu XML dla każdego zbioru danych w datasets.xml .
Jeśli utkniesz, zobacz nasze [rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support) .

### Zmienne w datasets.xml  {#varaibles-in-datasetsxml} 

Od ERDDAP™ wersja 2.29.0, datasets.xml jest teraz (opcjonalnie) Przetworzone przez [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Ma to wiele zastosowań, w tym ustalanie wartości prywatnych (jak hasła) przy użyciu zmiennych środowiskowych. To może być wyłączone przez ustawienie enableEnvParsing do false w setup.xml.

### Dostawca danych Formularz{#data-provider-form} 
Kiedy dostawca danych przychodzi do Ciebie mając nadzieję na dodanie niektórych danych do ERDDAP , zbieranie wszystkich metadanych może być trudne i czasochłonne (informacje o zbiorze danych) potrzebne do dodania zbioru danych ERDDAP . Wiele źródeł danych (na przykład pliki .csv, Pliki Excel, bazy danych) nie posiadają wewnętrznych metadanych, więc ERDDAP™ posiada formularz dostawcy danych, który gromadzi metadane od dostawcy danych i daje dostawcy danych inne wytyczne, w tym obszerne wytyczne dla [Dane w bazach danych](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases) . Przedstawione informacje przelicza się na datasets.xml format, a następnie email do ERDDAP™ administrator (Ty) i napisane (załączone) do *bigParentDirectory* / logs / dataProviderForm.log. Tak więc, forma pół-automatyzuje proces uzyskiwania zbioru danych do ERDDAP , ale ERDDAP™ administrator nadal musi ukończyć datasets.xml kawałek i zająć się uzyskiwaniem pliku danych (s) od dostawcy lub połączenia z bazą danych.

Składanie rzeczywistych plików danych ze źródeł zewnętrznych jest ogromnym ryzykiem dla bezpieczeństwa, więc ERDDAP™ Nie ma z tym problemu. Musisz znaleźć rozwiązanie, które działa dla Ciebie i dostawcy danych, na przykład, e-mail (dla małych plików) , ciągnąć z chmury (na przykład DropBox lub Google Drive) , strona sftp (z hasłami) lub trampki netto (pendrive USB lub zewnętrzny dysk twardy) . Powinieneś akceptować tylko pliki ludzi, których znasz. Trzeba będzie skanować pliki w poszukiwaniu wirusów i podjąć inne środki ostrożności.

Nie ma połączenia w ERDDAP™ do formularza dostawcy danych (na przykład, na ERDDAP™ strona główna) . Zamiast tego, kiedy ktoś mówi, że chce mieć swoje dane podawane przez ERDDAP , można wysłać im e-mail mówiąc coś w stylu:
Tak, możemy przenieść twoje dane do ERDDAP . Aby rozpocząć, proszę wypełnić formularz nahttps://*yourUrl*/erddap/dataProviderForm.html  (lub http:// jeżeli https:// nie jest włączona) .
Jak skończysz, skontaktuję się z tobą, żeby ustalić szczegóły.
Jeśli chcesz tylko spojrzeć na formularz (bez wypełniania go) , można zobaczyć formularz na ERD jest ERDDAP : [Wprowadzenie](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html) , [Część 1](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html) , [Część 2](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html) , [Część 3](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html) oraz [Część 4](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html) . Te linki do ERD   ERDDAP™ wysyłaj informacje do mnie, nie do ciebie, więc nie przesyłaj informacji z nimi, chyba że rzeczywiście chcesz dodać dane do ERD   ERDDAP .

Jeśli chcesz usunąć formularz Dostawcy Danych z Twojego ERDDAP™ , put
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
w pliku setup.xml.

Impulsem było to: NOAA 2014 [Publiczny dostęp do wyników badań (PARR) dyrektywa](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf) , co wymaga, aby wszystkie NOAA dane środowiskowe finansowane za pośrednictwem dolarów podatników są udostępniane za pośrednictwem usługi danych (nie tylko pliki) w ciągu 12 miesięcy od stworzenia. Jest więc zwiększone zainteresowanie używaniem ERDDAP™ w celu jak najszybszego udostępnienia zbiorów danych za pośrednictwem serwisu. Potrzebowaliśmy skuteczniejszego sposobu radzenia sobie z dużą liczbą dostawców danych.

Uczucia / sugestie? Ten formularz jest nowy, więc proszę e-mail erd dot data at noaa dot gov jeśli masz jakieś informacje zwrotne lub sugestie do poprawy tego.

### Narzędzia{#tools} 
 ERDDAP™ pochodzi z dwóch programów linii poleceń, które są narzędziami, które pomogą utworzyć XML dla każdego zbioru danych, które chcesz ERDDAP™ służyć. Kiedy już się ustawisz ERDDAP™ i uruchomić go (co najmniej jeden raz) , można znaleźć i używać tych programów w *tomcat* / webapps / erddap / WEB- INF. Istnieją skrypty powłoki Linux / Unix (z rozszerzeniem .sh) i skrypty Windows (z przedłużeniem .bat) dla każdego programu. \\[ Na Linuksie uruchom te narzędzia jako tego samego użytkownika (Tomcat?) To będzie Tomcat. \\] Po uruchomieniu każdego programu, będzie zadawać pytania. Dla każdego pytania wpisz odpowiedź, a następnie naciśnij Enter. Lub naciśnij ^ C, aby wyjść z programu w każdej chwili.

#### Program nie działa?{#program-wont-run} 

* Jeśli uzyska się nieznany program (lub podobne) komunikat błędu, problem jest prawdopodobnie, że system operacyjny nie mógł znaleźć Java . Musisz dowiedzieć się, gdzie Java jest na Twoim komputerze, a następnie edytuj odniesienie do javy w pliku .bat lub .sh, którego próbujesz użyć.
* Jeśli plik jar nie został znaleziony lub klasa nie znalazła wiadomości błędu, to Java nie mogłem znaleźć żadnej z klas wymienionych w pliku .bat lub .sh, którego próbujesz użyć. Rozwiązaniem jest ustalenie, gdzie znajduje się plik .jar i edytowanie odniesienia do niego w pliku .bat lub .sh.
* Jeśli używasz wersji Java który jest zbyt stary na program, program nie będzie działał i zobaczysz komunikat błędu jak
Wyjątek od wątku "main" java.lang.Unsupported ClassVersionError:
     *some / class / name* : Nieobsługiwana wersja major.minor *someNumber*   
Rozwiązaniem jest aktualizacja do najnowszej wersji Java i upewnij się, że plik .sh lub .bat dla programu go używa.

#### Narzędzia drukują różne komunikaty diagnostyczne:{#the-tools-print-various-diagnostic-messages} 

* Słowo "ERROR" jest używane, gdy coś poszło tak źle, że procedura nie została zakończona. Chociaż to irytujące, aby uzyskać błąd, błąd zmusza do rozwiązania problemu.
* Słowo "OSTRZEŻENIE" jest używane, gdy coś poszło nie tak, ale procedura została zakończona. Są dość rzadkie.
* Wszystko inne to tylko pouczająca wiadomość. Możesz dodać\\ -verbose do [GenerateDatasetsXml](#generatedatasetsxml) lub [DasDs](#dasdds) linia poleceń, aby uzyskać dodatkowe wiadomości informacyjne, co czasami pomaga rozwiązać problemy.

Te dwa narzędzia są bardzo pomocne, ale nadal musisz uważnie przeczytać wszystkie te instrukcje na tej stronie i podjąć ważne decyzje.

### GenerateDatasetsXml{#generatedatasetsxml} 
*    **GenerateDatasetsXml** jest programem linii poleceń, który może wygenerować przybliżony szkic XML dla prawie każdego typu zbioru danych.
    
MOŻLIWE ZALECANIE, że używasz GenerateDatasets Xml zamiast tworzenia fragmentów datasets.xml ręcznie, ponieważ:
    
    * GenerateDatasets Xml działa w sekundach. Ręcznie to co najmniej godzina pracy, nawet jeśli wiesz, co robisz.
    * GenerateDatasets Xml robi lepsze rzeczy. Dokonywanie tego ręcznie wymaga szerokiej wiedzy o tym, jak ERDDAP™ działa. Jest mało prawdopodobne, że wykonasz lepszą pracę ręcznie. (Bob Simons zawsze używa GenerateDatasets Xml za pierwszy szkic, i napisał ERDDAP .) 
    * GenerateDatasets Xml zawsze generuje ważny fragment datasets.xml . Każdy kawałek datasets.xml że piszesz prawdopodobnie będzie mieć co najmniej kilka błędów, które zapobiegają ERDDAP™ od wczytania zbioru danych. Zdiagnozowanie tych problemów często zajmuje ludziom godziny. Nie marnuj czasu. Generuj Zestawy danych Xml odwala ciężką robotę. Następnie można poprawić .xml ręcznie, jeśli chcesz.
    
Podczas korzystania z GenerateDatasets Program Xml:
    
    * W systemie Windows, po raz pierwszy uruchomiony GenerateDatasetsXml, musisz edytować plik GenerateDatasetsXml.bat z edytorem tekstu, aby zmienić ścieżkę do javy. Plik exe, aby Windows mógł znaleźć Java .
    * GenerateDatasets Xml najpierw prosi o podanie EDDType (Erd Dap Dataset Rodzaj) zbioru danych. Patrz [Lista typów danych](#list-of-types-datasets)   (w niniejszym dokumencie) dowiedzieć się, który typ jest odpowiedni dla zbioru danych, nad którym pracujesz. Oprócz zwykłych typów EDDType, istnieje również kilka [Typy danych specjalnych / Pseudo](#specialpseudo-dataset-types)   (np. taki, który czołga się do katalogu THREDDS, aby wygenerować kawałek datasets.xml dla każdego zbioru danych w katalogu) .
    * GenerateDatasets Xml następnie zadaje serię pytań specyficznych dla tego EDDType. Pytania gromadzą informacje potrzebne do ERDDAP™ dostęp do źródła zbioru danych. Zrozumieć co ERDDAP™ Pyta o, zobacz dokumentację dla EDDType, które zostały określone przez kliknięcie na ten sam typ zbioru danych w [Lista typów danych](#list-of-types-datasets) .
        
Jeśli musisz wprowadzić ciąg znaków specjalnych (np. znaki Whitespace na początku lub końcu, znaki nieASCII) , enter a [ciąg w stylu JSON-](https://www.json.org/json-en.html)   (ze specjalnymi znakami, które uciekły z\\ znakami) . Na przykład, aby wprowadzić tylko znak zakładki, wprowadź "\\ t" (z otaczającymi cudzysłów, które mówią ERDDAP™ że to jest ciąg w stylu JSON.
        
    * Często jedną z twoich odpowiedzi nie będzie to, czego potrzebuje GenerateDatasetsXml. Następnie można spróbować ponownie, z poprawionymi odpowiedziami na pytania, aż GenerateDatasets Xml może skutecznie znaleźć i zrozumieć dane źródłowe.
    * Jeśli odpowiesz poprawnie na pytania (lub wystarczająco poprawnie) , GenerateDatasets Xml połączy się ze źródłem zbioru danych i zgromadzi podstawowe informacje (na przykład nazwy zmiennych i metadane) .
Dla zbiorów danych, które są z lokalnego NetCDF   .nc i powiązane pliki, GenerateDatasets Xml będzie często drukować ncdump- podobną strukturę pliku po pierwszym odczycie pliku. To może dać informacje, aby lepiej odpowiedzieć na pytania w następnej pętli poprzez GenerateDatasetsXml.
    * GenerateDatasets Xml wygeneruje dla tego zbioru przybliżony szkic zbioru danych XML.
    * Informacje diagnostyczne i szkic zbioru danych XML zostaną napisane na *bigParentDirectory* / logs / GenerateDatasetsXml.log.
    * Prosty szkic zbioru danych XML zostanie napisany do *bigParentDirectory* / logs / GenerateDatasetsXml.out.
#### "0 plików" Komunikat o błędzie{#0-files-error-message} 
Jeśli uruchomisz GenerateDatasets Xml lub [DasDs](#dasdds) , lub jeśli próbujesz załadować EDDGrid Z plików lub EDDTableFrom... Zestaw danych plików w ERDDAP™ , i otrzymasz komunikat błędu "0 files" wskazujący, że ERDDAP™ znaleziono 0 pasujących plików w katalogu (kiedy myślisz, że są pasujące pliki w tym katalogu) :
* Sprawdź, czy podano pełną nazwę katalogu. Jeśli podasz nazwę pliku próbki, upewnij się, że podałeś pełną nazwę pliku, w tym pełną nazwę katalogu.
* Sprawdź, czy pliki są w tym katalogu.
* Sprawdź pisownię nazwy katalogu.
* Sprawdź plik NameRemex. Bardzo łatwo popełnić błędy z regexami. Do celów testowych, spróbuj regex.\\ *, który powinien pasować do wszystkich nazw plików. (Widzisz to? [dokumentacja regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) oraz [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
* Sprawdź, czy użytkownik, który prowadzi program (np. użytkownik = tomcat (?) dla Tomcat / ERDDAP ) ma pozwolenie na przeczytanie tych plików.
* W niektórych systemach operacyjnych (na przykład, SELER) i w zależności od ustawień systemu, użytkownik, który prowadził program, musi mieć "przeczytaj" pozwolenie na cały łańcuch katalogów prowadzących do katalogu, który posiada pliki.


* Jeśli masz problemy, których nie możesz rozwiązać, [Prośba o wsparcie](/docs/intro#support) z jak największą ilością informacji. Podobnie, jeśli wydaje się, że odpowiedni typ EDDType dla danego zbioru danych nie działa z tym zbiorem danych, lub jeśli nie ma odpowiedniego typu EDDType, należy złożyć [wydanie na GitHub](https://github.com/ERDDAP/erddap/issues) ze szczegółami (oraz, w stosownych przypadkach, dokumentację próbki) .
         
#### Musisz edytować wyjście z GenerateDatasets Xml, żeby było lepiej.{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* DISCLAIMER:
CHUNK datasets.xml MADE BE GenerateDatasets Xml nie jest doskonały. Należy przeczytać i edytować XML przed użyciem go w języku publicznym ERDDAP . GenerateDatasets Xml zwraca uwagę na wiele ruli-OF- THUMB, które nie zawsze jest poprawne. Jesteś odpowiedzialny za zapewnienie odpowiedniości XML, który chcesz ERDDAP Tak. datasets.xml FILE.
    
     (Nie krzyczę. Ze względu na historyczne powody prawne, zrzeczenia się praw muszą być napisane we wszystkich przypadkach.) 
    
Wyjście GenerateDatasetsXml jest draftem.
Prawie zawsze będziesz musiał ją edytować.
Podjęliśmy i kontynuujemy ogromny wysiłek, aby wydajność była jak najbardziej gotowa, ale są granice. Często potrzebne informacje po prostu nie są dostępne z metadanych źródłowych.
    
Podstawowym problemem jest to, że pytamy program komputerowy (GenerateDatasetsXml) Aby wykonać zadanie, w którym, jeśli dasz to samo zadanie 100 osobom, otrzymasz 100 różnych wyników. Nie ma jednej "właściwej" odpowiedzi. Oczywiście, program jest najbliżej czytania myśli Boba (Nie twój.) , ale nawet jeśli, to nie jest wszystko-rozumiejący program AI, tylko zgraja heurystyki zgrupowanych razem, aby wykonać zadanie podobne do AI-. (Tego dnia może nadejść całkowicie zrozumiały program AI, ale jeszcze nie nadszedł. Jeśli tak, to my, ludzie, możemy mieć większe problemy. Uważaj, czego sobie życzysz.) 
    
* Dla celów informacyjnych, wyjście pokazuje globalny sourceAtrybuty i zmienne sourceAtrybuty jako komentarze. ERDDAP™ łączy sourceAtrybuty i addAttributes   (które mają pierwszeństwo) do połączenia Atrybuty pokazane użytkownikowi. (Inne atrybuty są automatycznie dodawane do zmiennych długości geograficznej, szerokości geograficznej, wysokości, głębokości i czasu, gdy ERDDAP™ faktycznie tworzy zbiór danych) .
     
* Jeśli nie lubisz sourceAtribute, nadpisz go dodając addAtribution o tej samej nazwie, ale innej wartości (lub brak wartości, jeśli chcesz ją usunąć) .
     
* Wszystkie addAttributes są komputerowo generowane sugestie. Edytuj je&#33; Jeśli nie lubisz addAttribute, zmień go.
     
* Jeśli chcesz dodać inne addAttributes , dodać je.
     
* Jeśli chcesz zmienić destinationName Zmień to. Ale nie zmieniaj się. sourceName b.
     
* Można zmienić kolejność dataVariable s lub usunąć którąkolwiek z nich.


    * Następnie można użyć [DasDs](#dasdds)   (zob. poniżej) wielokrotnie testować XML dla tego zbioru danych, aby upewnić się, że otrzymany zestaw danych pojawia się tak, jak chcesz, aby w ERDDAP .
    * Zapraszamy do małych zmian w datasets.xml kawałek, który został wygenerowany, na przykład, dostaw lepsze infoUrl , streszczenie lub tytuł.
#### DoNotAddStandardNames{#donotaddstandardnames} 
Jeśli dodasz\\ -doNotAddStandardNames jako parametr wiersza poleceń podczas uruchamiania generuj Zestawy danych Xml, generuj Zestawy danych Xml nie doda standard\\_name do addAttributes dla zmiennych innych niż zmienne o nazwie szerokość geograficzna, długość geograficzna, wysokość, głębokość lub czas (które mają oczywiste standard\\_name s) . Może to być przydatne, jeśli używasz wyjścia z generowania Zestawy danych Xml bezpośrednio w ERDDAP™ bez edycji wyjścia, ponieważ generuj Zestawy danych Xml często zgaduje standard\\_name nieprawidłowo. (Pamiętaj, że zawsze zalecamy, aby edytować wyjście przed użyciem go w ERDDAP .) Korzystanie z tego parametru będzie mieć inne drobne skutki związane, ponieważ odgadnąć standard\\_name jest często wykorzystywane do innych celów, np. do tworzenia nowych long\\_name , i stworzyć ustawienia colorBar.
#### Skryptowanie{#scripting} 
Jako alternatywa dla odpowiedzi na pytania interaktywnie na klawiaturze i pętli generowania dodatkowych zbiorów danych, możesz dostarczyć argumenty linii poleceń, aby odpowiedzieć na wszystkie pytania generować jeden zbiór danych. GenerateDatasets Xml przetwarza te parametry, zapisuje wyjście do pliku wyjściowego i kończy program.
        
Aby to skonfigurować, najpierw użyj programu w trybie interaktywnym i zapisz swoje odpowiedzi. Oto przykład cząstkowy:
Powiedzmy, że uruchomisz skrypt:. / GenerateDatasetsXml.sh
Następnie wprowadź: EDDTableFromAsciiFiles
Następnie wprowadź: / u00 / data /
Następnie wprowadź:\\ *\\ .asc
Następnie wprowadź: / u00 / data / sampleFile.asc
Następnie wprowadź: ISO- 8859-1
        
Aby uruchomić to w sposób nieinteraktywny, użyj tej linii poleceń:
. / GenerateDatasetsXml.sh EDDTableFromAsciiFiles / u00 / data /.\\ *\\ .asc / u00 / data / sampleFile.asc ISO- 8859-1
Więc w zasadzie, po prostu wypisz wszystkie odpowiedzi na linii poleceń.
Powinno to być przydatne dla zbiorów danych, które często zmieniają się w sposób wymagający ponownego uruchomienia generateDatasets Xml (w szczególności EDDGrid FromThreddsCatalog) .
        
Szczegóły:

* Jeśli parametr zawiera spację lub jakiś specjalny znak, to koduj parametr jako [ciąg w stylu JSON-](https://www.json.org/json-en.html) , np. ", mój parametr z spacjami i dwoma \\n linie ".
* Jeśli chcesz podać pusty ciąg znaków jako parametr, użyj: nic
* Jeśli chcesz podać domyślną wartość parametru, użyj: default
             
* GenerateDatasets Xml wspiera a - i *zbiory danych XmlName* # *tagName* parametr linii poleceń, który wprowadza wyjście do podanego datasets.xml plik (domyślny jest *tomcat* / content / erddap / datasets.xml ) . GenerateDatasets Xml szuka dwóch linii w zbiorach danych XmlName:
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
oraz
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
i zastępuje wszystko pomiędzy tymi wierszami nową treścią, i zmienia someDatetime.
* Przełącznik -i jest przetwarzany tylko (i zmiany datasets.xml są tylko wykonane) jeśli uruchomisz GenerateDatasets Xml z argumentami wiersza poleceń, które określają wszystkie odpowiedzi na wszystkie pytania dla jednej pętli programu. (Zobacz powyżej 'Skryptowanie'.)   (Myśl jest taka: Ten parametr jest przeznaczony do użycia ze skryptami. Jeśli używasz programu w trybie interaktywnym (wpisywanie informacji na klawiaturze) , możesz wygenerować kilka nieprawidłowych fragmentów XML, zanim wygenerujesz ten, którego chcesz.) 
* Jeśli linie Begin i End nie zostaną znalezione, te linie i nowa zawartość zostaną wstawione tuż przed&lt;/ erddapDatasets &gt;.
* Jest też... (kapitał i) przełączanie do celów testowych, które działa tak samo jak -i, ale tworzy plik o nazwie datasets.xml  *DateTime* i nie wprowadza zmian w datasets.xml .
* Nie uruchamiaj GenerateDatasets Xml z -i w dwóch procesach jednocześnie. Istnieje szansa, że zostanie zachowany tylko jeden zestaw zmian. Mogą być poważne kłopoty. (na przykład uszkodzone pliki) .
    
Jeśli używasz "GenerateDatasetsXml -verbose", wydrukuje więcej wiadomości diagnostycznych niż zwykle.
    
#### Typy danych specjalnych / Pseudo{#specialpseudo-dataset-types} 
Ogólnie rzecz biorąc, opcje EDDType w GenerateDatasets Xml pasuje do typów EDD opisanych w niniejszym dokumencie (Patrz [Lista typów danych](#list-of-types-datasets) ) i wygenerować jeden datasets.xml kawałek do tworzenia jednego zbioru danych z jednego konkretnego źródła danych. Istnieje kilka wyjątków i szczególnych przypadków:
    
#####  EDDGrid FromErddap{#eddgridfromerddap} 
Ten EDDType generuje wszystkie datasets.xml kawałki potrzebne do zrobienia [ EDDGrid FromErddap](#eddfromerddap) zestawów danych ze wszystkich EDDGrid Zestawy danych w pilocie ERDDAP . Będziesz miał możliwość utrzymania oryginału datasetID s (które mogą powielać niektóre datasetID s już w twoim ERDDAP ) lub generowanie nowych nazw, które będą unikalne (ale zwykle nie są tak czytelne dla ludzi) .
     
##### EDDTableFromErddap{#eddtablefromerddap} 
Ten EDDType generuje wszystkie datasets.xml kawałki potrzebne do zrobienia [EDDTableFromErddap](#eddfromerddap) Zestawy danych ze wszystkich zbiorów danych EDDTable w pilocie ERDDAP . Będziesz miał możliwość utrzymania oryginału datasetID s (które mogą powielać niektóre datasetID s już w twoim ERDDAP ) lub generowanie nowych nazw, które będą unikalne (ale zwykle nie są tak czytelne dla ludzi) .
     
#####  EDDGrid FromThreddsCatalog{#eddgridfromthreddscatalog} 
Ten EDDType generuje wszystkie datasets.xml części potrzebne do wszystkich [ EDDGrid FromDap](#eddgridfromdap) zbiory danych, które można znaleźć poprzez rekursywne pełzanie poprzez THREDDS (sub) Katalog. Istnieje wiele form katalogu THREDDS adresów URL. Ta opcja wymaga URL THREDDS .xml z / katalog / w nim, na przykład,
https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xmllub
https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml  
(powiązany katalog .html jest na
https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.htmlco jest niedopuszczalne dla EDDGrid FromThredsCatalog).
Jeśli u pacjenta występują problemy z EDDGrid FromThreds Przewodniczący Katalog:
* Upewnij się, że używany adres URL jest prawidłowy, zawiera / katalog / i kończy się na / katalog.xml.
* Jeśli to możliwe, należy użyć publicznego adresu IP (na przykład:https://oceanwatch.pfeg.noaa.gov) w URL, nie lokalny numeryczny adres IP (na przykład:https://12.34.56.78) . Jeśli THREDDS jest dostępny tylko za pośrednictwem lokalnego numerycznego adresu IP, można użyć [&lt;convertToPublicSourceUrl &gt;] (# converttopublicsourceurl) więc ERDDAP™ użytkownicy zobaczyć adres publiczny, nawet jeśli ERDDAP™ pobiera dane z lokalnego adresu numerycznego.
* Jeśli masz problemy, których nie możesz rozwiązać, [sprawdź wskazówki dotyczące rozwiązywania problemów](#troubleshooting-tips) .
* Kod niskiego poziomu do tego teraz używa Unidata netcdf- java katalog crawler kod (Trójki. klasy katalogowe) tak, że może obsługiwać wszystkie katalogi THREDDS (które mogą być zaskakująco skomplikowane) Dzięki Unidata dla tego kodu.
         
#####  EDDGrid LonPM180FromErddapCatalog{#eddgridlonpm180fromerddapcatalog} 
Ten EDDType generuje datasets.xml do zrobienia [ EDDGrid LonPM180](#eddgridlonpm180) zestawów danych ze wszystkich EDDGrid zbiory danych w ERDDAP których długość geograficzna jest większa niż 180.
* Jeśli to możliwe, należy użyć publicznego adresu IP (na przykład:https://oceanwatch.pfeg.noaa.gov) w URL, nie lokalny numeryczny adres IP (na przykład:https://12.34.56.78) . Jeśli ERDDAP™ jest dostępny tylko przez lokalny numeryczny adres IP, można użyć [&lt;convertToPublicSourceUrl &gt;] (# converttopublicsourceurl) więc ERDDAP™ użytkownicy zobaczyć adres publiczny, nawet jeśli ERDDAP™ pobiera dane z lokalnego adresu numerycznego.
         
#####  EDDGrid Lon0360FromErddapCatalog{#eddgridlon0360fromerddapcatalog} 
Ten EDDType generuje datasets.xml do zrobienia [ EDDGrid Lon0360](#eddgridlon0360) zestawów danych ze wszystkich EDDGrid zbiory danych w ERDDAP o dowolnej długości geograficznej mniejszej niż 0.
* Jeśli to możliwe, należy użyć publicznego adresu IP (na przykład:https://oceanwatch.pfeg.noaa.gov) w URL, nie lokalny numeryczny adres IP (na przykład:https://12.34.56.78) . Jeśli ERDDAP™ jest dostępny tylko przez lokalny numeryczny adres IP, można użyć [&lt;convertToPublicSourceUrl &gt;] (# converttopublicsourceurl) więc ERDDAP™ użytkownicy zobaczyć adres publiczny, nawet jeśli ERDDAP™ pobiera dane z lokalnego adresu numerycznego.
         
##### Pliki EDDsFromFiles{#eddsfromfiles} 
Biorąc pod uwagę katalog startowy, to przemienia katalog i wszystkie podkatalogi i próbuje utworzyć zbiór danych dla każdej grupy plików danych, które znajduje.
* Zakłada to, że po odnalezieniu zbioru danych, zbiór zawiera wszystkie podkatalogi.
* Jeśli zostanie znaleziony zestaw danych, podobne katalogi rodzeństwa będą traktowane jako oddzielne zestawy danych (Na przykład katalogi dla lat 90-tych, 2000-tych, 2010-tych, wygenerują oddzielne zbiory danych) . Powinny być łatwe do łączenia ręcznie - po prostu zmienić pierwszy zestaw danych&lt;fileDir &gt; do katalogu nadrzędnego i usuń wszystkie kolejne zbiory danych rodzeństwa.
* To będzie tylko spróbować wygenerować kawałek datasets.xml dla najczęstszego typu rozszerzenia pliku w katalogu (nie licząc .md5, który jest ignorowany) . Podając katalog z 10 .nc plików i 5 .txt plików, zestaw danych zostanie wygenerowany dla .nc Tylko pliki.
* Zakłada to, że wszystkie pliki w katalogu o tym samym rozszerzeniu należą do tego samego zbioru danych. Jeśli katalog ma jakieś .nc pliki z danymi SST i niektórymi .nc pliki z danymi o chlorofilu, tylko jedna próbka .nc plik zostanie przeczytany (SST? chlorofil?) i tylko jeden zestaw danych zostanie stworzony dla tego typu pliku. Ten zbiór danych prawdopodobnie nie załaduje się z powodu komplikacji z próby wczytania dwóch typów plików do tego samego zbioru danych.
* Jeśli jest mniej niż 4 plików z najczęstszym rozszerzeniem w katalogu, zakłada to, że nie są to pliki danych i po prostu pomija katalog.
* Jeśli w katalogu są 4 lub więcej plików, ale to nie może skutecznie wygenerować kawałek datasets.xml dla plików (na przykład nieobsługiwany typ pliku) , to wygeneruje [Nazwy EDDTableFromFileName](#eddtablefromfilenames) zestaw danych do plików.
* Na koniec diagnostyki, że to pisze do pliku log, tuż przed datasets.xml fragmenty, to wydrukuje tabelę z podsumowaniem informacji zebranych poprzez przeszukiwanie wszystkich podkatalogów. Tabela wymienia każdy podkatalog i wskazuje najczęstszy typ rozszerzenia pliku, całkowitą liczbę plików oraz typ zbioru danych dla tych plików (jeżeli istnieje) . Jeśli masz do czynienia z złożoną, głęboko zagnieżdżoną strukturą plików, rozważ uruchomienie GenerateDatasets Xml z EDDType = EDDsFromFiles aby wygenerować te informacje,
* Opcja ta może nie zrobić wielkiego zadania zgadując najlepszy EDDType dla danej grupy plików danych, ale jest szybki, łatwy i warto spróbować. Jeśli pliki źródłowe są odpowiednie, działa dobrze i jest dobrym pierwszym krokiem w generowaniu datasets.xml dla systemu plików z dużą ilością podkatalogów, każdy z plikami danych z różnych zbiorów danych.
         
##### EDDTableFromEML i EDDTableFromEMLPartii{#eddtablefromeml-and-eddtablefromemlbatch} 
Te specjalne EDDType generuje datasets.xml do [Pliki EDDTableFromAsciiFiles](#eddtablefromasciifiles) zestaw danych z każdej tabeli opisanej w [Język metadanych ekologicznych](https://knb.ecoinformatics.org/external//emlparser/docs/index.html) Plik XML. Wariant "Nr serii" działa na wszystkich plikach EML w lokalnym lub zdalnym katalogu. Proszę zobaczyć oddzielny [dokumentacja dla EDDTableFromeML](/docs/server-admin/EDDTableFromEML) .
     
##### EDDTableFromInPort{#eddtablefrominport} 
Ten specjalny EDDType generuje datasets.xml do [Pliki EDDTableFromAsciiFiles](#eddtablefromasciifiles) zestaw danych z informacji w [inport- xml](https://inport.nmfs.noaa.gov/inport) plik. Jeśli można uzyskać dostęp do pliku danych źródłowych (plik inport- xml powinien mieć wskazówki, gdzie go znaleźć) , można zrobić roboczy zestaw danych w ERDDAP .

Poniższe kroki przedstawiają jak używać GenerateDatasets Xml z pliku inport- xml w celu uzyskania roboczego zbioru danych w ERDDAP .

1. Po uzyskaniu dostępu do pliku inport- xml (albo jako URL albo plik lokalny) : run GenerateDatasets Xml, określić EDDType = EDDTableFromInPort, podać adres inport- xml lub pełną nazwę pliku, określić whowChild = 0 i podać inne wymagane informacje (jeśli znana) . (W tym momencie nie trzeba mieć pliku danych źródłowych ani podawać jego nazwy.) The whChild = 0 ustawienie mówi GenerateDatasets Xml do zapisu informacji dla **wszystkie** z&lt;entity- Assione- information &gt;&lt;podmiot &gt; jest w pliku inport- xml (jeśli istnieją) . Wydrukuje również podsumowanie informacji w tle, w tym wszystkie pliki download- url wymienione w pliku inport- xml.
2. Przejrzyj te wszystkie informacje. (w tym informacje ogólne, które GenerateDatasets Druki Xml) i odwiedź download- url (s) w celu znalezienia pliku danych źródłowych (s) . Jeśli go znajdziesz (im) , pobierz go (im) do katalogu, który jest dostępny ERDDAP . (Jeśli nie można znaleźć żadnych plików źródłowych, nie ma sensu się tym zajmować.) 
3. Uruchom generowanie Zestawy danych Znowu Xml.
Jeśli plik danych źródłowych odpowiada jednemu z plików inport- xml&lt;entity- Assione- information &gt;&lt;Jednostka &gt; 's, określić, które dziecko = *Numer podmiotu*   (np. 1, 2, 3,...) . ERDDAP™ będzie starał się dopasować nazwy kolumn w pliku danych źródłowych do nazw w informacjach o podmiocie, a także zaapelować o zaakceptowanie / odrzucenie / naprawienie wszelkich rozbieżności.
Lub, jeśli plik inport- xml nie ma żadnych&lt;entity- Assione- information &gt;&lt;Jednostka &gt; 's, określić wjakim Child = 0.
4. W kawałku datasets.xml które zostały wykonane przez GenerateDatasets Xml, zmienić [globalny&lt; addAttributes &gt;] (# global- atrybuty) w razie potrzeby / w razie potrzeby.
5. W kawałku datasets.xml które zostało wykonane przez GenerateDatasetsXml, dodać / zmienić [&lt; dataVariable &gt;] (# datavariable) informacje wymagane / pożądane do opisania każdej ze zmiennych. Upewnij się, że poprawnie identyfikujesz każdą zmienną
[&lt; sourceName &gt;] (# sourcename)   (jak pojawia się w źródle) ,
[&lt; destinationName &gt;] (# destinationname)   (która ma więcej ograniczeń dotyczących dozwolonych znaków niż sourceName ) ,
[&lt;jednostki &gt;] (# units)   (szczególnie jeśli jest to [zmienna czasu lub znacznika czasu](#timestamp-variables) jeżeli jednostki muszą określić format) oraz
[&lt; missing\\_value &gt;] (# brakująca _ wartość) ,
6. Kiedy jesteś blisko zakończenia, wielokrotnie używać [DasDs](#dasdds) narzędzie do szybkiego sprawdzenia, czy opis zbioru danych jest poprawny i czy zbiór danych pojawi się w ERDDAP™ Jak chcesz.
     

Byłoby wspaniale, gdyby grupy wykorzystujące InPort do dokumentowania swoich zbiorów danych również korzystały z ERDDAP™ udostępnienie rzeczywistych danych:

*    ERDDAP™ jest rozwiązaniem, które można wykorzystać teraz, więc można wypełnić NOAA jest [Publiczny dostęp do wyników badań (PARR) wymagania](https://nosc.noaa.gov/EDMC/PD.DSP.php) teraz, nie w jakimś niejasnym czasie w przyszłości.
*    ERDDAP™ udostępnia rzeczywiste dane użytkownikom, nie tylko metadane. (Po co metadane bez danych?) 
*    ERDDAP™ obsługuje metadane (w szczególności jednostki zmiennych) , w przeciwieństwie do innych programów serwerów danych. (Po co nam dane bez metadanych?) Korzystanie z oprogramowania, które nie obsługuje metadanych jest zaproszenie danych, które mają być źle zrozumiane i wykorzystywane.
*    ERDDAP™ jest wolnym i open- source oprogramowania w przeciwieństwie do niektórych innych oprogramowania jest brana pod uwagę. Trwający rozwój ERDDAP™ jest już opłacony. Wsparcie dla ERDDAP™ użytkownicy są wolni.
*    ERDDAP wygląd można łatwo dostosować, aby odzwierciedlić i podkreślić swoją grupę (nie ERD lub ERDDAP ) .
*    ERDDAP™ oferuje spójny sposób dostępu do wszystkich zbiorów danych.
*    ERDDAP™ może odczytywać dane z wielu typów plików danych oraz z relacyjnych baz danych.
*    ERDDAP™ może zajmować się dużymi zbiorami danych, w tym zbiorami danych, w których dane źródłowe znajdują się w wielu plikach danych.
*    ERDDAP™ może zapisywać dane do wielu typów plików danych, na życzenie użytkownika, w tym do typów plików naukowych, takich jak netCDF, ESRI .csv, oraz ODV .txt .
*    ERDDAP™ może dokonać własnych wykresów i map podzbiorów danych, w oparciu o specyfikacje użytkownika.
*    ERDDAP™ mogą zajmować się zbiorami danych innych niż dane, takich jak zbiory plików obrazu, wideo lub audio.
*    ERDDAP™ został zainstalowany i używany w [ponad 60 instytucji na całym świecie](/#who-uses-erddap) .
*    ERDDAP™ jest wymieniony jako jeden z serwerów danych zalecanych do użycia w NOAA w [ NOAA Dyrektywa proceduralna w sprawie dostępu do danych](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) W przeciwieństwie do innych programów.
*    ERDDAP™ jest produktem NMFS / NOAA , więc używając go w NMFS oraz NOAA powinno być punktem dumy dla NMFS oraz NOAA .

Proszę dać ERDDAP™ Spróbuj. Jeśli potrzebujesz pomocy, wpisz wiadomość w ERDDAP™ Grupa Google.
     
##### addFillValueAtrybuty{#addfillvalueattributes} 
Ta specjalna opcja EDDType nie jest typem zbioru danych. Jest to narzędzie, które może dodać atrybuty\\ _ FillValue do niektórych zmiennych w niektórych zbiorach danych. Patrz [addFillValueAtrybuty](#add-_fillvalue-attributes) .
     
##### findDuplications Czas{#findduplicatetime} 
Ta specjalna opcja EDDType nie jest typem zbioru danych. Zamiast tego, mówi GenerateDatasets Xml do wyszukiwania poprzez kolekcję uchwytów .nc   (oraz powiązane) pliki do znalezienia i wydrukowania listy plików z podwójnymi wartościami czasowymi. Kiedy patrzy na wartości czasowe, konwertuje je z oryginalnych jednostek do "seconds since 1970-01-01" w przypadku, gdy różne pliki używają różnych ciągów jednostek. Musisz podać katalog startowy (z lub bez ukośnika) , wyrażenie regularne nazwy pliku (np.:\\ *\\ .nc  ) oraz nazwę zmiennej czasu w plikach.
     
##### ncdump{#ncdump} 
Ta specjalna opcja EDDType nie jest typem zbioru danych. Zamiast tego, mówi GenerateDatasets Xml do wydruku [ncdump](https://linux.die.net/man/1/ncdump) \\ -jak wydruk z .nc , .nc ml lub .hdf plik. W rzeczywistości używa netcdf- java [NCdump](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html) co jest bardziej ograniczonym narzędziem niż C wersja NCdump. Jeśli używasz tej opcji, GenerateDatasetsXml poprosi Cię o użycie jednej z opcji: "-h" (nagłówek) "-c". (wiersze współrzędnych) "-vall" (domyślny) "-v var1; var2", "-v var1 (0,0: 10,0: 20) ". Jest to przydatne, ponieważ bez ncdup trudno jest dowiedzieć się, co jest w .nc , .nc ml lub .hdf plik, a tym samym który EDDType należy określić dla GenerateDatasets Xml. Dla .nc Plik ml, to wydrukuje wyjście ncdup dla wyniku .nc ml zmiany plików stosowane do podstawy .nc lub .hdf plik.
         
### DasDs{#dasdds} 
*    [ **DasDs** ](#dasdds) jest programem linii poleceń, którego możesz użyć po utworzeniu pierwszej próby na XML dla nowego zbioru danych w datasets.xml . Dzięki DasDds można wielokrotnie testować i udoskonalać XML. Podczas korzystania z programu DasDds:
    1. W systemie Windows po raz pierwszy uruchamiasz DasDds, musisz edytować DasDds. plik bat z edytorem tekstu, aby zmienić ścieżkę do javy. Plik exe, aby Windows mógł znaleźć Java .
    2. DasDds prosi o datasetID do zbioru danych nad którym pracujesz.
    3. DasDds próbuje utworzyć zbiór danych z tym datasetID .
        * DasDds zawsze drukuje mnóstwo wiadomości diagnostycznych.
Jeśli używasz "DasDds -verbose", DasDds wydrukuje więcej wiadomości diagnostycznych niż zwykle.
        * Dla bezpieczeństwa DasDds zawsze usuwa wszystkie informacje o zestawie danych buforowanych (pliki) dla zbioru danych przed próbą utworzenia zbioru danych. Jest to odpowiednik ustawienia a [flaga twarda](/docs/server-admin/additional-information#hard-flag) Tak więc dla zagregowanych zbiorów danych, może chcesz dostosować plik NameRemex tymczasowo, aby ograniczyć liczbę plików, które znajduje konstruktor danych.
        * Jeśli zbiór danych nie zostanie wczytany (Z jakiegokolwiek powodu) , DasDds zatrzyma się i pokaże komunikat błędu dla pierwszego błędu, który znajdzie.
             **Nie próbuj zgadywać, w czym może być problem. Należy uważnie przeczytać komunikat ERROR.**   
W razie potrzeby, przeczytaj poprzednie wiadomości diagnostyczne, aby znaleźć więcej wskazówek i informacji, również.
        *    **Zmień XML zbioru danych, aby spróbować rozwiązać ten problem**   
i niech DasDds spróbować utworzyć zestaw danych ponownie.
        *    **Jeśli wielokrotnie rozwiązujesz każdy problem, ostatecznie rozwiążesz wszystkie problemy**   
i zestaw danych załaduje.
    4. Wszystkie wyjścia DasDds (diagnostyka i wyniki) są napisane na ekranie i do *bigParentDirectory* / logs / DasDds.log.
    5. Jeśli DasDds może utworzyć zbiór danych, DasDds pokaże Ci [.das (Struktura atrybutu dataset) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das) , [.dds (Name Struktura) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds) oraz [.timeGaps (luki czasowe) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) informacje na temat zbioru danych na ekranie i napisz je do *bigParentDirectory* / logi / DasDds.out.
    6. Często będziesz chciał dokonać niewielkich zmian w XML zbioru danych, aby wyczyścić metadane zbioru danych i ponownie uruchomić DasDds.

### Bonus Narzędzie trzeciej strony: ERDDAP -lint{#bonus-third-party-tool-erddap-lint} 
 ERDDAP -lint to program z Rob Fuller i Adam Leadbetter z Irish Marine Institute, który można wykorzystać do poprawy metadanych ERDDAP™ zestawów danych. ERDDAP -lint "zawiera zasady i prosty statyczny aplikacji web do wykonywania niektórych testów weryfikacyjnych przeciwko ERDDAP™ serwer. Wszystkie testy są wykonywane w przeglądarce internetowej ". Jak [Unix / Linux Lint narzędzie](https://en.wikipedia.org/wiki/Lint_(software) ), można edytować istniejące zasady lub dodać nowe zasady. Patrz [ ERDDAP -lint](https://github.com/IrishMarineInstitute/erddap-lint) więcej informacji.

To narzędzie jest szczególnie przydatne dla zbiorów danych, które stworzyłeś jakiś czas temu i teraz chcesz wprowadzić up- to- date z aktualnych preferencji metadanych. Na przykład, wczesne wersje GenerateDatasets Xml nie włożył żadnego wysiłku w tworzenie globalnego creator\\_name , creator\\_email , creator\\ _ type, lub creator\\_url metadane. Przyda ci się. ERDDAP -lint do identyfikacji zbiorów danych, które nie posiadają tych atrybutów metadanych.

Dzięki Robowi i Adamowi za stworzenie tego narzędzia i udostępnienie go ERDDAP™ Społeczność.
 
## Podstawowa struktura datasets.xml Plik{#the-basic-structure-of-the-datasetsxml-file} 
Wymagane i opcjonalne znaczniki dozwolone w datasets.xml plik (i ilość razy mogą się pojawić) poniżej. W praktyce datasets.xml będzie miał dużo&lt;dataset &gt; 's tags i używać tylko innych tagów wewnątrz&lt;erddapDatasets &gt; w razie potrzeby.

  >&nbsp;&lt;&#63;xml version="1.0" encoding="ISO-8859-1" &#63;>  
  >&nbsp;&lt;erddapDatasets>  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeUnits>](#angulardegreeunits)...&lt;/angularDegreeUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeTrueUnits>](#angulardegreetrueunits)...&lt;/angularDegreeTrueUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;cacheMinutes>](#cacheminutes)...&lt;/cacheMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;commonStandardNames>](#commonstandardnames)...&lt;/commonStandardNames> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateRequestCSVExample />](#convertinterpolaterequestcsvexample) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateDatasetIDVariableList />](#convertinterpolatedatasetidvariablelist) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertToPublicSourceUrl />](#converttopublicsourceurl) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxGB>](#decompressed-cache)...&lt;/decompressedCacheMaxGB> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxMinutesOld>](#decompressed-cache)...&lt;/decompressedCacheMaxMinutesOld> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;drawLandMask>](#drawlandmask)...&lt;/drawLandMask> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;emailDiagnosticsToErdData>](#emaildiagnosticstoerddata)...&lt;/emailDiagnosticsToErdData> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;graphBackgroundColor>](#graphbackgroundcolor)...&lt;/graphBackgroundColor> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequests>](#ipaddressmaxrequests)...&lt;/ipAddressMaxRequests> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequestsActive>](#ipaddressmaxrequestsactive)...&lt;ipAddressMaxRequestsActive> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressUnlimited>](#ipaddressunlimited)...&lt;ipAddressUnlimited> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMinMinutes>](#loaddatasetsminminutes)...&lt;/loadDatasetsMinMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMaxMinutes>](#loaddatasetsmaxminutes)...&lt;/loadDatasetsMaxMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;logLevel>](#loglevel)...&lt;/logLevel> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nGridThreads>](#nthreads)...&lt;/nGridThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nTableThreads>](#nthreads)...&lt;/nTableThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;palettes>](#palettes)...&lt;/palettes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxBytes>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxBytes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxCells>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxCells> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;requestBlacklist>](#requestblacklist)...&lt;/requestBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;slowDownTroubleMillis>](#slowdowntroublemillis)...&lt;/slowDownTroubleMillis> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;subscriptionEmailBlacklist>](#subscriptionemailblacklist)...&lt;/subscriptionEmailBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;unusualActivity>](#unusualactivity)...&lt;/unusualActivity> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;updateMaxEvents>](#updatemaxevents)...&lt;/updateMaxEvents> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;standardLicense>](#standard-text)...&lt;/standardLicense> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardContact>](#standard-text)...&lt;/standardContact> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDataLicenses>](#standard-text)...&lt;/standardDataLicenses> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfEndorsement>](#standard-text)...&lt;/standardDisclaimerOfEndorsement> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfExternalLinks>](#standard-text)...&lt;/standardDisclaimerOfExternalLinks> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardGeneralDisclaimer>](#standard-text)...&lt;/standardGeneralDisclaimer> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardPrivacyPolicy>](#standard-text)...&lt;/standardPrivacyPolicy> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startHeadHtml5>](#standard-text)...&lt;/startHeadHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startBodyHtml5>](#standard-text)...&lt;/startBodyHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;theShortDescriptionHtml>](#standard-text)...&lt;/theShortDescriptionHtml> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;endBodyHtml5>](#standard-text)...&lt;/endBodyHtml5> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;user username="..." password="..." roles="..." />](#user) &lt;!-- 0 or more -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;dataset>](#list-of-types-datasets)...&lt;/dataset> &lt;!-- 1 or more -->  
  >&nbsp;&lt;/erddapDatasets>  

Możliwe jest, że inne kodowanie będzie dozwolone w przyszłości, ale na razie zaleca się tylko ISO- 8859-1.
 
### XInclude{#xinclude} 
Nowy w wersji 2.25 to wsparcie dla XInclude. Wymaga to użycia parsera SAX&lt;useSaxParser &gt; true&lt;/ useSaxParser &gt; in your setup.xml. To może pozwolić zapisać każdy zbiór danych w swoim pliku, a następnie włączyć je wszystkie w głównym datasets.xml , ponowne użycie części definicji zbioru danych, lub obu tych definicji. Jeśli chcesz zobaczyć przykład, [EDDTestDataset.java](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java) ustawia XInclude do ponownego użycia zmiennych definicji.
 

- -

## Uwagi{#notes} 

Praca z datasets.xml plik jest projektem nietrywialnym. Należy uważnie przeczytać wszystkie te notatki. Po wybraniu [typ zbioru danych](#list-of-types-datasets) , należy uważnie przeczytać szczegółowy opis.
     
### Wybór typu zbioru danych{#choosing-the-dataset-type} 
W większości przypadków jest tylko jeden ERDDAP™ typ zbioru danych, który jest odpowiedni dla danego źródła danych. W kilku przypadkach (np., .nc pliki) , istnieje kilka możliwości, ale zazwyczaj jeden z nich jest zdecydowanie najlepszy. Pierwszą i największą decyzją jaką musisz podjąć jest: czy należy traktować zbiór danych jako grupę wielowymiarowych tablic (jeśli tak, zobacz [ EDDGrid typy zbioru danych](#eddgrid) ) lub jako tabela danych podobna do bazy danych (jeśli tak, zobacz [Typy zbiorów danych EDDTable](#eddtable) ) .
     
### Podawanie danych jako jest{#serving-the-data-as-is} 
Zazwyczaj nie ma potrzeby modyfikowania źródła danych (np., konwertować pliki do innego typu plików) Więc... ERDDAP™ może służyć. Jedno z założeń ERDDAP™ jest to, że źródło danych będzie wykorzystywane tak jak jest. Zwykle to działa dobrze. Niektóre wyjątki to:
* Bazy danych relacyjnych i Cassandra -- ERDDAP™ może obsługiwać dane bezpośrednio z relacyjnych baz danych i Cassandra. Ale dla bezpieczeństwa, balansowania obciążenia i problemów z wydajnością, można wybrać do konfiguracji innej bazy danych z tymi samymi danymi lub zapisać dane do NetCDF v3 .nc pliki i mają ERDDAP™ obsługuje dane z nowego źródła danych. Patrz [EDDTableFromDatabase](#eddtablefromdatabase) oraz [EDDTableFromCassandra](#eddtablefromcassandra) .
* Nie obsługiwane źródła danych... ERDDAP™ może obsługiwać wiele rodzajów źródeł danych, ale świat jest wypełniony 1000 (Miliony?) różnych źródeł danych (w szczególności struktury plików danych) . Jeśli ERDDAP™ nie obsługuje Twojego źródła danych:
    * Jeśli źródło danych jest NetCDF   .nc pliki, możesz użyć [NcML](#ncml-files) modyfikować pliki danych na -the- fly lub używać [ NCO ](#netcdf-operators-nco) na stałe modyfikować pliki danych.
    * Można zapisać dane do typu źródła danych, które ERDDAP™ wsparcie. NetCDF -3 .nc pliki są dobrą, ogólną rekomendacją, ponieważ są to pliki binarne, które ERDDAP™ może czytać bardzo szybko. W przypadku danych tabelarycznych należy rozważyć przechowywanie danych w zbiorze .nc plików, które używają [CF Geometrie do pobierania próbek dyskretnych (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Kontyguous Ragged Struktury danych Array i tak mogą być obsługiwane z ERDDAP jest [Pliki EDDTableFromNcCFFiles](#eddtablefromnccffiles) ). Jeśli są logicznie zorganizowane (każdy z danymi dla kawałka przestrzeni i czasu) , ERDDAP™ może pobrać dane z nich bardzo szybko.
    * Możesz poprosić o dodanie wsparcia dla tego źródła danych do ERDDAP™ e-mailem do Chrisa. John w Noah.
    * Możesz dodać wsparcie dla tego źródła danych, pisząc kod, aby sam się nim zająć. Patrz [do ERDDAP™ Przewodnik programisty](/docs/contributing/programmer-guide) 
* Prędkość... ERDDAP™ może odczytywać dane z niektórych źródeł danych znacznie szybciej niż inne. Na przykład, czytanie NetCDF v3 .nc pliki są szybkie, a czytanie plików ASCII jest wolniejsze. A jeśli istnieje duża (&gt; 1000) lub ogromny (&gt; 10 000) liczba plików danych źródłowych, ERDDAP™ będzie reagować na niektóre żądania danych powoli. Zwykle różnica nie jest zauważalna dla ludzi. Jednakże, jeśli myślisz, ERDDAP™ jest powolny dla danego zbioru danych, można wybrać rozwiązanie problemu poprzez zapisanie danych do bardziej efektywnego ustawienia (zazwyczaj: kilka, dobrze ustrukturyzowane, NetCDF v3 .nc pliki) . Dane tabelaryczne, patrz: [ta rada](#millions-of-files) .
         
### Podpowiedź{#hint} 
Często łatwiej jest wygenerować XML dla zbioru danych, wykonując kopię opisu roboczego zbioru danych w dataset.xml i modyfikując go.
    
### Kodowanie znaków specjalnych{#encoding-special-characters} 
Od datasets.xml jest plikiem XML, MUSISZ [& -encode](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML) "&", "&lt;", i" &gt; "w dowolnej treści jako" & amp; ","&lt;"i" & gt; ".
Błąd:&lt;tytuł &gt; Czas i przypływy&lt;/ Tytuł &gt;
Racja:&lt;tytuł &gt; Czas i wskazówki&lt;/ Tytuł &gt;
     
### XML nie toleruje błędów składni{#xml-doesnt-tolerate-syntax-errors} 
Po edycji pliku dataset.xml, dobrym pomysłem jest sprawdzenie, czy wynik jest [dobrze ukształtowany XML](https://www.w3schools.com/xml/xml_dtd.asp) poprzez wklejanie tekstu XML do sprawdzania XML jak [xmlalidation](https://www.xmlvalidation.com/) .
     
### Wskazówki dotyczące rozwiązywania problemów{#troubleshooting-tips} 
*    **Inne sposoby diagnozowania problemów z danymi**   
Oprócz dwóch głównych [Narzędzia](#tools) ,
    *    [log.txt](/docs/server-admin/additional-information#log) jest plikiem dziennika z wszystkimi ERDDAP wiadomości diagnostyczne.
    * W [Sprawozdanie dzienne](/docs/server-admin/additional-information#daily-report) posiada więcej informacji niż strona statusu, w tym listę zbiorów danych, które nie zostały załadowane i wyjątki (błędy) Wygenerowali.
    * W [Strona statusu](/docs/server-admin/additional-information#status-page) jest szybki sposób, aby sprawdzić ERDDAP status z dowolnej przeglądarki internetowej. Zawiera listę zbiorów danych, które nie zostały załadowane (choć nie związane wyjątki) i statystyki taskThread (pokazujące postępy [ EDDGrid Kopiuj](#eddgridcopy) oraz [EDDTableCopy](#eddtablecopy) Zestawy danych i wszelkie [ EDDGrid Pliki FromFiles](#eddgridfromfiles) lub [Pliki EDDTableFromFiles](#eddtablefromfiles) zbiory danych, które korzystają [cacheFromUrl](#cachefromurl)   (ale nie cache SizeGB) ) .
    * Jeśli utkniesz, zobacz nasze [rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support) .
         
### Zmienne specjalne{#special-variables} 
*    ** [Długość geograficzna, szerokość geograficzna, wysokość, głębokość, ciśnienie i czas (LLAT) zmienna](#destinationname)   [ destinationName ](#destinationname) s są wyjątkowe.** 
    * Ogólnie:
        * Zmienne LLAT są znane ERDDAP™ jeśli zmienna osi jest (zamiast EDDGrid zbiory danych) lub zmiennej danych (dla zbiorów danych tabeli EDD)   [ destinationName ](#destinationname) "długość geograficzna", "szerokość geograficzna", "wysokość", "głębokość", lub "time" .
        * Zdecydowanie zachęcamy do korzystania z tych standardowych nazw dla tych zmiennych, jeśli to możliwe. Żaden z nich nie jest wymagany. Jeśli nie używasz tych specjalnych nazw zmiennych, ERDDAP™ nie rozpoznają ich znaczenia. Na przykład zmienne LLAT są traktowane specjalnie przez Make A Graph ( * datasetID * .graph) : jeśli zmienna X Axis jest "długością geograficzną", a zmienna Y Axis jest "szerokością geograficzną", otrzymasz mapę (przy użyciu standardowej projekcji, z maską lądową, granicami politycznymi itp.) zamiast wykresu.
        *    ERDDAP™ automatycznie doda wiele metadanych do zmiennych LLAT (na przykład ", [ ioos\\_category ](#ioos_category) "," [jednostki](#units) ", oraz kilka atrybutów związanych ze standardami, takich jak"\\ _ CoordinateAxisType ") .
        *    ERDDAP™ automatycznie, on-the-fly, doda wiele globalnych metadanych związanych z wartościami LLAT wybranego podzbioru danych (na przykład "geoprzestrzenne\\ _ lon\\ _ min") .
        * Klienci, którzy obsługują te standardy metadanych, będą mogli wykorzystać dodane metadane, aby umieścić dane w czasie i przestrzeni.
        * Klienci będą łatwiej generować zapytania zawierające zmienne LLAT, ponieważ nazwy zmiennej są takie same we wszystkich odpowiednich zbiorach danych.
    * Dla zmiennej "długość geograficzna" i zmiennej "szerokość geograficzna":
        * Użyj [ destinationName ](#destinationname) s "długość geograficzna" i "szerokość geograficzna" tylko jeśli [jednostki](#units) są stopniami\\ _ wschodu i stopniami\\ _ północy, odpowiednio. Jeśli Twoje dane nie spełniają tych wymagań, użyj różnych nazw zmiennych (na przykład, x, y, lonRadians, latRadians) .
        * Jeśli masz dane dotyczące długości i szerokości geograficznej wyrażone w różnych jednostkach, a zatem z różnych destinationName s, na przykład, LonRadians i latRadians, Make A Graph ( * datasetID * .graph) będzie robić wykresy (na przykład, szeregi czasowe) zamiast map.
    * Dla zmiennej "wysokość", "wstępnie" lub "głębokość":
        * Użyj [ destinationName ](#destinationname) "wysokość" w celu określenia odległości danych powyżej poziomu morza (dodatnie = wartości "up") . Opcjonalnie, można użyć "wysokości" dla odległości poniżej poziomu morza, jeśli wartości są ujemne poniżej poziomu morza (lub jeśli używasz, na przykład,
[&lt;att name = " scale\\_factor "type =" int "&gt; - 1&lt;/ att &gt;] (# scale _ factor) konwertować wartości głębokości na wartości wysokości.
        * Użyj destinationName "głębokość" w celu zidentyfikowania odległości danych poniżej poziomu morza (dodatnie = wartości "w dół") .
        * Alternatywnie, w przypadku podwyższeń określonych poziomami ciśnienia powietrza (takie jak [izobary](https://en.wikipedia.org/wiki/Contour_line#Barometric_pressure) ) , należy ustawić destinationName do "ciśnienia". Obsługuje jednostki w "hPa", "Pa" i "mbar" (dodatnie = wartości "w dół") .
        * Zestaw danych może mieć tylko jedną zmienną "wysokość", "ciśnienie" lub "głębokość".
        * Dla tych "wysokości" i "głębokości" zmiennych, [jednostki](#units) Musi być "m", "metr" lub "metry". Jeśli jednostki różnią się (na przykład, sążnie) , you can use
[&lt;att name = " scale\\_factor "&gt; *niektóre Wartość* &lt;/ att &gt;] (# scale _ factor) I...&lt;att nazwa = "jednostki" &gt; metry&lt;/ att &gt;] (# units) do konwersji jednostek na metry.
        * Jeśli Twoje dane nie spełniają tych wymagań, użyj innego destinationName   (na przykład, Uziemienie, odległość ToBottom) .
        * Jeśli znasz pionowe KSR, podaj je w metadanych, np. "EPSG: 5829" (chwilowa wysokość nad poziomem morza) , "EPSG: 5831" (natychmiastowa głębokość poniżej poziomu morza) lub "EPSG: 5703" (Wysokość NAVD88) .
    * Dla "time" zmienna:
        * Użyj [ destinationName ](#destinationname)   "time" tylko dla zmiennych, które zawierają całą datę + czas (lub data, jeśli to wszystko jest) . Jeśli na przykład istnieją oddzielne kolumny daty i timeOfDay, nie używaj nazwy zmiennej "time" .
        * Patrz [jednostki](#time-units) więcej informacji o atrybucie jednostek dla zmiennych czasu i znaczników czasu.
        * Zmienna czasu i powiązane [czas Zmienne znaczników](#timestamp-variables) są unikalne w tym, że zawsze konwertują wartości danych z formatu czasu źródła (Cokolwiek to jest.) w wartość liczbową (sekund od 1970- 01-01T00: 00: 00Z) lub wartość String (ISO 8601: 2004 (E) format) W zależności od sytuacji.
        * Gdy użytkownik żąda danych czasowych, może je zażądać, określając czas jako wartość liczbową (sekund od 1970- 01-01T00: 00: 00Z) lub wartość String (ISO 8601: 2004 (E) format) .
        *    ERDDAP™ ma przydatność do [Przelicz licznik Czas do / z czasu smyczkowego](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
        * Patrz [Jak ERDDAP Transakcje z czasem](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
            
### Dlaczego tylko dwie podstawowe struktury danych?{#why-just-two-basic-data-structures} 
* Ponieważ trudno jest klientom ludzkim i klientom komputerowym radzić sobie ze złożonym zestawem możliwych struktur zbioru danych, ERDDAP™ wykorzystuje tylko dwie podstawowe struktury danych:
    * a [Struktura danych zawiązanych](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)   (na przykład dla danych satelitarnych i danych modelowych) oraz
    * a [tabelaryczna struktura danych](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)   (na przykład dla danych z boi in- situ, stacji i trajektorii) .
* Oczywiście nie wszystkie dane mogą być wyrażane w tych strukturach, ale wiele z nich może. Tabele są w szczególności bardzo elastycznymi strukturami danych (spojrzenie na sukces relacyjnych programów baz danych) .
* Ułatwia to tworzenie zapytań o dane.
* To sprawia, że odpowiedzi na dane mają prostą strukturę, co ułatwia obsługę danych w szerszym zakresie standardowych typów plików (które często wspierają proste struktury danych) . To jest główny powód, dla którego założyliśmy ERDDAP™ Tędy.
* To z kolei bardzo ułatwia nam życie. (lub kogokolwiek) do pisania oprogramowania klienta, który współpracuje ze wszystkimi ERDDAP™ zestawów danych.
* Ułatwia to porównywanie danych z różnych źródeł.
* Zdajemy sobie sprawę z tego, że jeśli przywykniesz do pracy z danymi w innych strukturach danych, możesz początkowo uznać to podejście za uproszczone lub niewystarczające. Ale wszystkie struktury danych mają oszustwa. Żaden nie jest doskonały. Nawet do- it- wszystkie struktury mają swoje wady: praca z nimi jest złożona i pliki mogą być napisane lub odczytywane tylko ze specjalnymi bibliotekami oprogramowania. Jeśli się zgodzisz ERDDAP podejście na tyle, aby spróbować z nim pracować, można zauważyć, że ma swoje zalety (w szczególności wsparcie dla wielu typów plików, które mogą przechowywać odpowiedzi danych) . W [ ERDDAP™ pokaz slajdów](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)   (szczególnie [dane struktury slajdów](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures) ) Dużo o tym mówi.
* I nawet jeśli to podejście brzmi dla ciebie dziwnie, ERDDAP™ Klienci nigdy nie zauważą -- po prostu zobaczą, że wszystkie zbiory danych mają prostą strukturę i będą wdzięczni, że mogą uzyskać dane z wielu różnych źródeł zwracanych w różnych formatach plików.
         
### Wymiary{#dimensions} 
*    **Co jeśli zmienne siatki w zbiorze danych źródłowych NIE dzielą się tymi samymi zmiennymi osi?**   
W EDDGrid Zestawy danych, wszystkie zmienne danych MUSI używać (udział) wszystkie zmienne osi. Więc jeśli zbiór danych źródłowych ma pewne zmienne z jednym zestawem wymiarów i inne zmienne z innym zestawem wymiarów, będziesz musiał zrobić dwa zestawy danych w ERDDAP . Na przykład, możesz zrobić jeden ERDDAP™ zbiór danych zatytułowany "Niektóre tytuły (na powierzchni) "do przechowywania zmiennych, które po prostu używać \\[ czas \\]  \\[ szerokość geograficzna \\]  \\[ długość geograficzna \\] wymiary i zrobić inny ERDDAP™ zbiór danych zatytułowany "Niektóre tytuły (na głębokościach) "do przechowywania zmiennych, które używają \\[ czas \\]  \\[ wysokość \\]  \\[ szerokość geograficzna \\]  \\[ długość geograficzna \\] . Albo możesz zmienić źródło danych, aby dodać wymiar o jednej wartości (na przykład wysokość = 0) aby zmienne były spójne.
    
     ERDDAP™ nie obsługuje bardziej skomplikowanych zbiorów danych (na przykład modele wykorzystujące siatkę trójkątów) Cóż. Możesz podać te zbiory danych w ERDDAP™ poprzez utworzenie dwóch lub więcej zbiorów danych w ERDDAP™   (tak, że wszystkie zmienne danych w każdym nowym zbiorze danych mają ten sam zbiór zmiennych osi) Ale nie tego chcą użytkownicy. Dla niektórych zbiorów danych, można rozważyć zrobienie regularnej zawiązanej wersji zbioru danych i oferowanie, że oprócz oryginalnych danych. Niektóre oprogramowanie klienta może sobie radzić tylko z regularną siatką, więc robiąc to, docierasz do dodatkowych klientów.
     
    
### Przewidywane dane skrzelowe{#projected-gridded-data} 
Niektóre dane mają złożoną strukturę. Na przykład, poziom satelity 2 ("wzdłuż toru") dane nie wykorzystują prostego projekcji. Wzory (i inne) często współpracują z danymi o różnych niecylindrycznych projekcjach (na przykład, stożkowy, polarny stereograficzny, tripolarny) lub w niestrukturyzowanych sieciach (bardziej skomplikowana struktura danych) . Niektórzy użytkownicy końcowi chcą tych danych, więc nie ma utraty informacji. Dla tych klientów, ERDDAP™ może służyć dane, jak jest, tylko jeśli ERDDAP™ administrator rozbija oryginalny zbiór danych na kilka zbiorów danych, z każdą częścią włącznie ze zmiennymi, które dzielą te same zmienne osi. Tak, to wydaje się dziwne dla ludzi zaangażowanych i to różni się od większości OPeNDAP serwerów. Ale... ERDDAP™ podkreśla udostępnianie danych w wielu formatach. To możliwe, ponieważ ERDDAP™ wykorzystuje / wymaga bardziej jednolitej struktury danych. Chociaż to trochę niezręczne. (tj. inne niż oczekiwano) , ERDDAP™ mogą rozpowszechniać przewidywane dane.

 \\[ Tak. ERDDAP™ może mieć bardziej luźne wymagania dotyczące struktury danych, ale zachować wymagania dotyczące formatów wyjściowych. Ale to doprowadziłoby do zamieszania wśród wielu użytkowników, szczególnie nowych, ponieważ wiele pozornie ważnych wniosków o dane o różnych strukturach byłoby niepoprawnych, ponieważ dane nie pasowałyby do typu pliku. Ciągle wracamy do projektu obecnego systemu. \\] 

Niektórzy użytkownicy końcowi chcą danych w rzucie cylindrycznym Lat Lon, takich jak Equaricent prostokątne / płytki carrée lub Mercator) do łatwego użycia w różnych sytuacjach. W tych sytuacjach, zachęcamy do ERDDAP™ administrator do korzystania z innego oprogramowania ( NCO ? Matlab ? R? IDV?...?) przeprojektować dane na obszar geograficzny (Równoważny prostokątny rzut / płyta carrée) lub inny rzut cylindryczny i służyć tej formie danych w ERDDAP™ jako inny zestaw danych. Jest to podobne do tego, co robią ludzie, gdy przekształcają dane satelitarne na dane poziomu 2 w dane poziomu 3. Jednym z takich narzędzi jest [ NCO ](https://nco.sourceforge.net/nco.html#Regridding) który oferuje opcje rozszerzenia dla przeglądania danych.

#### GIS i dane dotyczące reprojekcji{#gis-and-reprojecting-data} 
Ponieważ świat GIS jest często zorientowany na mapę, programy GIS zwykle oferują wsparcie dla reprojekcji danych, tj. wykreślenia danych na mapie z inną projekcją.

Obecnie ERDDAP™ nie posiada narzędzi do przeprojektowania danych. Zamiast tego zalecamy użycie zewnętrznego narzędzia do wykonania wariantu zbioru danych, gdzie dane zostały przeprojektowane z oryginalnej postaci na prostokątny (długość geograficzna) tablica odpowiednia dla ERDDAP .

Naszym zdaniem CF / DAP świat jest nieco inny niż świat GIS i działa na nieco niższym poziomie. ERDDAP™ to odzwierciedla. Ogólnie, ERDDAP™ jest przeznaczony do pracy głównie z danymi (nie mapy) i nie chce się zmienić (np. przeprojektowanie) dane. Dla ERDDAP™ , dane splatane są często / zazwyczaj / najlepiej związane z wartościami latu i projekcją cylindryczną, a nie z wartościami x, y. W każdym razie, ERDDAP™ nie robi nic z projekcją danych; po prostu przekazuje dane poprzez, jak jest, z jego obecnej projekcji, na teorię, że reprojekcja jest znaczącą zmianą danych i ERDDAP™ nie chce być zaangażowany w znaczące zmiany. Ponadto późniejsi użytkownicy mogą naiwnie ponownie przeprojektować dane, co nie byłoby tak dobre jak tylko jedna reprojekcja. (Więc, jeśli ERDDAP™ administrator chce zaoferować dane w innej projekcji, grzywny; wystarczy przeprojektować dane offline i zaoferować, że jako inny zestaw danych w ERDDAP . Wiele zestawów danych opartych na satelitach jest oferowanych jako to, co NASA nazywa poziomem 2. (swath) oraz jako poziom 3 (Projekcja równoprostokątna) wersje.) Kiedy ERDDAP™ tworzy mapy (bezpośrednio lub poprzez WMS lub KML) , ERDDAP™ obecnie oferuje jedynie tworzenie map z projekcją równoprostokątnej / płyty carrée, która na szczęście jest akceptowana przez większość programów mapowania.

Zachęcamy ERDDAP™ administratorzy do korzystania z innego oprogramowania ( NCO ? Matlab ? R? IDV?...?) przeprojektować dane na obszar geograficzny (Równoważny prostokątny rzut / płyta carrée) lub inny rzut cylindryczny i służyć tej formie danych w ERDDAP™ jako inny zestaw danych. Jest to podobne do tego, co robią ludzie, gdy przekształcają dane satelitarne na dane poziomu 2 w dane poziomu 3. Jednym z takich narzędzi jest [ NCO ](https://nco.sourceforge.net/nco.html#Regridding) który oferuje opcje rozszerzenia dla przeglądania danych.

Mamy nadzieję, że ERDDAP™ będzie mieć wbudowane narzędzia do oferowania map z innymi projekcjami w przyszłości. Mamy również nadzieję, że w przyszłości będziemy mieć lepsze połączenia ze światem GIS (inne niż prąd WMS obsługa) . To straszne, że w tym "nowoczesnym" świecie, powiązania między CF / DAP Świat i świat GIS są wciąż tak słabe. Obie te rzeczy są na liście rzeczy do zrobienia. (Jeśli chcesz pomóc, w szczególności z połączeniem ERDDAP™ do MapServer, proszę wysłać maila do Chrisa. John w Noa.gov.) 
    
### Rodzaje danych{#data-types} 
 ERDDAP™ obsługuje następujące typy danych
 (nazwy są wrażliwe na przypadki; 'u' przedrostek oznacza "niepodpisane"; liczba wielu nazw w innych systemach jest liczbą bitów) :

#### bajt{#byte} 
*    **bajt** ma podpisane wartości całkowite o zakresie od -128 do 127.
W innych systemach nazywa się to czasem int8.
Nazywa się to "tinyint" SQL i Cassandra.
     ERDDAP™ konwerty [boolean](#boolean-data) z niektórych źródeł (np. SQL i Cassandra) do bajtów w ERDDAP™ o wartości 0 = false, 1 = true i 127 = missing\\_value .
#### ubyte{#ubyte} 
*    **ubyte** posiada niepodpisane wartości całkowite o zakresie od 0 do 255.
W innych systemach jest to czasami nazywane uint8.
#### krótkie{#short} 
*    **krótkie** podpisała wartości całkowite o zakresie od -32768 do 32767.
W innych systemach nazywa się to czasem int16.
Nazywa się to "SQL i Cassandra".
#### short{#ushort} 
*    **short** posiada niepodpisane wartości całkowite o zakresie od 0 do 65535.
W innych systemach jest to czasami nazywane uint16.
#### int{#int} 
*    **int** podpisała wartości całkowite o zakresie od -2147483648 do 2147483647.
W innych systemach nazywa się to czasem int32.
To się nazywa "integer | numeryczne (?) "by SQL and" int "by Cassandra.
#### uint{#uint} 
*    **uint** posiada niepodpisane wartości całkowite o zakresie od 0 do 4294967295.
W innych systemach jest to czasami nazywane uint32.
#### długi{#long} 
*    **długi** podpisała wartości całkowite o zakresie od -9223372036854775808 do 9223372036854775807.
W innych systemach jest to czasami nazywane int64.
To się nazywa "bigint" | numeryczne (?) "by SQL and" bigint "by Cassandra.
Ponieważ wiele typów plików nie obsługuje długich danych, ich użycie jest zniechęcone. Jeśli to możliwe, zamiast tego użyj podwójnego (zob. poniżej) .
#### ulong{#ulong} 
*    **ulong** posiada niepodpisane wartości całkowite o zakresie od 0 do 18446744073709551615
W innych systemach jest to czasami nazywane uint64.
Ponieważ wiele typów plików nie obsługuje danych ulong, ich użycie jest zniechęcone. Jeśli to możliwe, zamiast tego użyj podwójnego (zob. poniżej) .
#### float{#float} 
*    **float** jest pływakiem IEEE 754 o zakresie w przybliżeniu + / - 3.402823466e + 38.
W innych systemach jest to czasami nazywane float32.
To się nazywa "prawdziwe" | float (?)  | dziesiętny (?)  | numeryczne (?) "by SQL and" float "by Cassandra.
Specjalna wartość NaN oznacza numer Not- a.
     ERDDAP™ konwertuje dodatnie i ujemne wartości nieskończoności na NaN.
#### podwójne{#double} 
*    **podwójne** jest podwójnym systemem IEEE 754 o zakresie około
+ / - 1.7976931348623157E + 308.
W innych systemach jest to czasami nazywane float64.
To się nazywa "podwójna precyzja | float (?)  | dziesiętny (?)  | numeryczne (?) "by SQL and" double "by Cassandra.
Specjalna wartość NaN oznacza numer Not- a.
     ERDDAP™ konwertuje dodatnie i ujemne wartości nieskończoności na NaN.
#### char{#char} 
*    **char** jest pojedynczym 2-bajtem (16- bit)   [Znak Unicode UCS-2](https://en.wikipedia.org/wiki/UTF-16) od \\u0000   (# 0) przez \\uffff   (# 65535) .
     \\uffff Definicja Not- a- Character, analogiczna do podwójnej wartości NaN.
Korzystanie z znaku jest zniechęcane, ponieważ wiele typów plików albo nie obsługuje znaków lub tylko obsługuje znaków 1- bajtowych (zob. poniżej) . Zamiast tego rozważ użycie String.
Użytkownicy mogą używać zmiennych znaków do tworzenia wykresów. ERDDAP™ przekonwertuje znaki na ich numer punktu kodu Unicode, który może być użyty jako dane liczbowe.
#### String{#string} 
*    **String** jest sekwencją 0 lub więcej, 2- bajt (16- bit)   [Unicode znaków UCS-2](https://en.wikipedia.org/wiki/UTF-16) .
     ERDDAP™ używa / interpretuje łańcuch o długości 0 jako brakującą wartość. ERDDAP™ nie obsługuje prawdziwego łańcucha null.
Teoretyczna maksymalna długość łańcucha to 2147483647 znaków, ale prawdopodobnie występują różne problemy w różnych miejscach nawet z nieco krótszymi strunami.
Stosowanie ERDDAP 's String for SQL' s character, varchar, characking, binary, varbinary, interval, array, multiset, xml, and any other database data type that doesn 't fixed cleanly with any other ERDDAP™ typ danych.
Stosowanie ERDDAP String dla "tekstu" Cassandry i innych typów danych Cassandry, które nie pasują do innych ERDDAP™ typ danych.
     

Przed ERDDAP™ v2.10, ERDDAP™ nie obsługiwał wewnętrznie niepodpisanych typów liczb całkowitych i oferował ograniczone wsparcie w swoich czytnikach i pisarzach danych.
    
### Ograniczenia typu danych{#data-type-limitations} 
Można pomyśleć o ERDDAP™ jako system, który posiada wirtualne zbiory danych i który działa poprzez odczytywanie danych ze źródła zbioru danych do wewnętrznego modelu danych i zapisywanie danych do różnych usług (np.(OPeN)DAP, WMS ) i typów plików w odpowiedzi na żądania użytkowników.

* Każdy czytnik wejść obsługuje podzbiór typów danych, które ERDDAP™ wsparcie. Więc odczytanie danych do ERDDAP Wewnętrzne struktury danych nie stanowią problemu.
* Każdy pisarz wyjściowy obsługuje również podzbiór typów danych. To jest problem, ponieważ ERDDAP musi na przykład wcisnąć długie dane do typów plików, które nie obsługują długich danych.
     

Poniżej znajdują się wyjaśnienia ograniczeń (lub brak) różnych twórców wyjściowych i jak ERDDAP™ zajmuje się problemami. Takie komplikacje są nieodłączną częścią ERDDAP cel, jakim jest zapewnienie interoperacyjności różnych systemów.

#### ASCII{#ascii} 
* ASCII (.csv, .tsv itd.) pliki tekstowe -
    * Wszystkie dane liczbowe są zapisywane poprzez reprezentację String (z brakującymi wartościami danych pojawiającymi się jako łańcuchy długości zerowej) .
    * Chociaż ERDDAP™ poprawnie zapisuje długie i ulong wartości do plików tekstowych ASCII, wielu czytelników (np. programy arkusza kalkulacyjnego) nie może prawidłowo radzić sobie z wartościami długimi i ulong i zamiast ich konwertować do podwójnych wartości (z utratą precyzji w niektórych przypadkach) .
    * Dane Char i String są zapisywane przez JSON Strings, które obsługują wszystkie znaki Unicode (w szczególności "nietypowe" znaki poza ASCII # 127, np. znak Euro pojawia się jako "\\ u20ac") .
    
        
#### JSON{#json} 
* JSON ( .json , .jsonlCSV itd.) pliki tekstowe -
    * Wszystkie dane liczbowe są zapisywane poprzez reprezentację String.
    * Dane Char i String są zapisane jako Strings JSON, które obsługują wszystkie znaki Unicode (w szczególności "nietypowe" znaki poza ASCII # 127, np. znak Euro pojawia się jako "\\ u20ac") .
    * Brakujące wartości dla wszystkich typów danych numerycznych pojawiają się jako null.
         
####  .nc 3 pliki{#nc3-files} 
*    .nc 3 pliki nie wspierają automatycznie żadnych niepodpisanych typów danych całkowitych. Przed CF v1.9 CF nie obsługiwało niepodpisanych typów liczb całkowitych. Żeby sobie z tym poradzić, ERDDAP™ 2.10 + jest zgodne ze standardem NUG i zawsze dodaje atrybut "\\ _ Unsigned" o wartości "true" lub "false", aby wskazać, czy dane pochodzą z niepodpisanej lub podpisanej zmiennej. Wszystkie atrybuty liczb całkowitych są zapisywane jako atrybuty podpisane (np. bajt) z podpisanymi wartościami (np. ubyte actual\\_range atrybut o wartościach od 0 do 255, pojawia się jako atrybut bajtowy o wartościach od 0 do -1 (odwrotność wartości dopełniacza obu wartości poza zakresem). Nie ma łatwego sposobu, aby dowiedzieć się, które atrybuty (podpisane) powinny być odczytywane jako atrybuty niepodpisane. ERDDAP™ obsługuje atrybut "\\ _ Unsigned" podczas odczytu .nc 3 pliki.
*    .nc 3 pliki nie obsługują długich lub ulong typów danych. ERDDAP™ zajmuje się tym przez tymczasowe przekształcenie ich na podwójne zmienne. Doubles może dokładnie reprezentować wszystkie wartości do + / - 9,007,199,254,740,992 Czyli 2 ^ 53. To niedoskonałe rozwiązanie. Unidata odmawia niewielkiego uaktualnienia do .nc 3 do rozwiązania tych i związanych z nimi problemów, cytowanie .nc 4 (istotna zmiana) jako rozwiązanie.
* Specyfikacja CF (przed v1,9) powiedział, że obsługuje typ znaków danych, ale nie jest jasne, czy znak jest przeznaczony tylko jako klocki składowe znaków znaków, które są skutecznie Strings. Pytania do ich listy dyskusyjnej dały tylko mylące odpowiedzi. Ze względu na te komplikacje, najlepiej jest unikać znaków zmiennych w ERDDAP™ i używać zmiennych String w miarę możliwości.
* Tradycyjnie, .nc 3 pliki obsługiwane tylko strunami z kodowanymi ASCII (7- bit, # 0 - # 127) postacie. NUG (oraz ERDDAP ) rozszerzyć (rozpoczynając ~ 2017) poprzez włączenie atrybutu "\\ _ Kodowanie" o wartości "ISO- 8859-1" (rozszerzenie ASCII, które definiuje wszystkie 256 wartości każdego znaku 8- bitowego) lub "UTF- 8" w celu wskazania, w jaki sposób dane String są zakodowane. Inne kodowanie może być legalne, ale są zniechęcone.
         
####  .nc 4 pliki{#nc4-files} 
*    .nc 4 pliki obsługują wszystkie ERDDAP typy danych.
    
#### Pliki NCSSV{#nccsv-files} 
Pliki NCSSV 1.0 nie obsługują niepodpisanych typów danych całkowitych.
 [Pliki NCSSV 1.1 +](/docs/user/nccsv-1.00) obsługuje wszystkie niepodpisane typy danych całkowitych.
     
####  DAP  {#dap} 
*   (OPeN)DAP  (.das, .dds, .asc plików ASCII i .dods plików binarnych) -
    *   (OPeN)DAPUchwyty krótkie, usort, int, uint, float i podwójne wartości prawidłowo.
    *   (OPeN)DAPposiada typ danych "bajtowych", który definiuje jako niepodpisany, natomiast historycznie, THREDDS i ERDDAP™ traktowali "bajt" jako podpisane w ich(OPeN)DAPusługi. Aby poradzić sobie z tym lepiej, ERDDAP™ 2.10 + podąża za standardem NUG i zawsze dodaje atrybut "\\ _ Unsigned" o wartości "true" lub "false", aby wskazać, czy dane są tym, co ERDDAP™ Dzwoni Byte albo Ubyte. Wszystkie atrybuty bajtów i ubyte są zapisywane jako atrybuty "byte" z podpisanymi wartościami (np. ubyte actual\\_range atrybut o wartościach od 0 do 255, pojawia się jako atrybut bajtowy o wartościach od 0 do -1 (odwrotność wartości dopełniacza obu wartości poza zakresem). Nie ma łatwego sposobu, aby dowiedzieć się, które atrybuty "byte" powinny być odczytywane jako atrybuty ubyte.
    *   (OPeN)DAPnie obsługuje podpisanych lub niepodpisanych długów. ERDDAP™ zajmuje się tym przez czasową konwersję ich na podwójne zmienne i atrybuty. Doubles może dokładnie reprezentować wszystkie wartości do 9,007,199,254,740,992 Czyli 2 ^ 53. To niedoskonałe rozwiązanie. OPeNDAP   (organizacja) odmawia niewielkiego uaktualnienia do DAP 2.0, aby poradzić sobie z tym i powiązane problemy, cytowanie DAP 4 (istotna zmiana) jako rozwiązanie.
    * Ponieważ(OPeN)DAPnie posiada oddzielnego typu znaków znaków, a technicznie obsługuje tylko znaki ASCII 1- bajtowe (# 0 - # 127) w Strings zmienne danych znaków będą pojawiały się jako 1-charaktery- długie Strings w(OPeN)DAP.das, .dds i .dods odpowiedzi.
    * Technicznie rzecz biorąc(OPeN)DAPSpecyfikacja obsługuje tylko łańcuchy z kodowanymi znakami ASCII (# 0 - # 127) . NUG (oraz ERDDAP ) rozszerzyć (rozpoczynając ~ 2017) poprzez włączenie atrybutu "\\ _ Kodowanie" o wartości "ISO- 8859-1" (rozszerzenie ASCII, które definiuje wszystkie 256 wartości każdego znaku 8- bitowego) lub "UTF- 8" w celu wskazania, w jaki sposób dane String są zakodowane. Inne kodowanie może być legalne, ale są zniechęcone.
         
### Uwagi dotyczące rodzaju danych{#data-type-comments} 
* Ze względu na słabe wsparcie dla danych długich, ulong i char w wielu typach plików, zniechęcamy do stosowania tych typów danych w ERDDAP . Jeśli to możliwe, używaj podwójnych zamiast długich i ulongów, a String zamiast znaku.
     
* Metadane - Ponieważ(OPeN)DAPodpowiedzi .das i .dds nie wspierają atrybutów długich lub ulong lub typów danych (i zamiast tego pokaż im jak dubles) , może zamiast tego chcesz użyć ERDDAP tabelaryczne przedstawienie metadanych, jak widać w http ... / erddap / **info** / * datasetID * Strona internetowa .html (na przykład: [https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html)  )   (które można również uzyskać w innych typach plików, np. .csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv , .xhtml ) lub .nccsv Odpowiedź metadanych (na przykład: [https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) Chociaż .nccsv Metadane są dostępne tylko dla zbiorów danych tabelarycznych) , z których obie obsługują wszystkie typy danych (w szczególności, długie, ulong i char) .
         
### Pliki mediów{#media-files} 
Nie wszystkie dane są tablicami liczb lub tekstu. Niektóre zbiory danych składają się z plików medialnych, takich jak obrazy, pliki audio i wideo. ERDDAP™ posiada specjalne funkcje ułatwiające użytkownikom dostęp do plików medialnych. To dwuetapowy proces:
 

1. Uzyskaj dostęp do każdego pliku poprzez własny adres URL, poprzez system, który obsługuje żądania zakresu bajtów.
Najprostszym sposobem jest umieszczenie plików w katalogu, który ERDDAP™ ma dostęp. (Jeśli są w pojemniku jak .zip plik, rozpakuj je, chociaż może chcesz zaoferować .zip plik do użytkowników również.) Więc zrób [Nazwy EDDTableFromFileName](#eddtablefromfilenames) zestaw danych w celu udostępnienia tych plików za pośrednictwem ERDDAP™ , w szczególności poprzez ERDDAP jest [ "files" system](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) .
    
Wszystkie pliki udostępnione przez EDDTableFromFileNames i ERDDAP jest "files" obsługa systemu [żądania dotyczące zakresu bajtów](https://en.wikipedia.org/wiki/Byte_serving) . Zazwyczaj, gdy klient (np. przeglądarka) składa wniosek do URL, otrzymuje cały plik jako odpowiedź. Ale z żądaniem zakresu bajtów, żądanie określa zakres bajtów z pliku, a serwer zwraca tylko te bajty. Jest to istotne tutaj, ponieważ odtwarzacze audio i wideo w przeglądarkach działają tylko wtedy, gdy plik może być dostępny za pośrednictwem żądań zakresu bajtów.
    
Opcjonalnie: Jeśli masz więcej niż jeden zestaw danych z powiązanymi plikami medialnymi, możesz zrobić tylko jeden EDDTableFromFileNames, który ma podfolder dla każdej grupy plików. Zaletą jest to, że kiedy chcesz dodać nowe pliki multimedialne do nowego zbioru danych, wszystko co musisz zrobić to utworzyć nowy folder i umieścić pliki w tym folderze. Folder i pliki zostaną automatycznie dodane do zbioru danych EDDTableFromFileNames.
    
2. Opcjonalnie: Jeśli masz zbiór danych zawierający odniesienia do plików multimedialnych, dodaj go do ERDDAP .
Na przykład, możesz mieć plik .csv z wierszem za każdym razem, gdy ktoś widział wieloryba i kolumnę, która zawiera nazwę pliku obrazu związanego z tym obserwowaniem. Jeśli nazwa pliku obrazu jest tylko nazwą pliku, np. Img20141024T192403Z, a nie pełnym URL, to musisz dodać [fileAccessBase Url i / lub fileAccessSuffix](#fileaccessbaseurl) atrybuty metadanych dla tego dataVariable który określa bazowy adres URL i przyrostek dla tych nazw plików. Jeśli udostępnisz pliki za pośrednictwem EDDTableFromFileNames, adres URL będzie w formie
     *BaseUrl* / erddap / files / * datasetID * /
Na przykład:
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
Jeśli istnieje .zip lub inny plik kontenera ze wszystkimi plikami multimedialnymi związanymi ze zmienną danych, zalecamy również, aby udostępnić ten plik użytkownikom (patrz punkt 1 powyżej) a następnie zidentyfikować go z [fileAccessArchive Url](#fileaccessarchiveurl) atrybut.
    

 \\[ Początek ERDDAP™ v1.82 \\] Jeśli zrobisz pierwszy krok powyżej (lub oba etapy) , następnie gdy użytkownik wyświetla ERDDAP™   "files" system dla tego zbioru danych (lub prosi, aby zobaczyć podzbiór zbioru danych poprzez .htmlTable wniosek, jeśli wykonałeś drugi krok) , ERDDAP™ pokaże ikonę '?' po lewej stronie nazwy pliku. Jeśli użytkownik pochyli się nad tą ikoną, zobaczą wyskakującego obrazu, odtwarzacza audio lub odtwarzacza wideo. Przeglądarki obsługują tylko ograniczoną liczbę typów

* obrazek (zazwyczaj .gif, .jpg i .png) ,
* audio (zazwyczaj .mp3, .ogg i .wav) oraz
* pliki wideo (zazwyczaj .mp4, .ogv i. WWW) .

Wsparcie różni się w różnych wersjach różnych przeglądarek na różnych systemach operacyjnych. Więc jeśli masz wybór typu pliku do zaoferowania, sensowne jest oferowanie tych typów.

Lub, jeśli użytkownik kliknie na nazwę pliku pokazaną na ERDDAP™ strona internetowa, ich przeglądarka pokaże obraz, plik audio lub wideo jako oddzielną stronę internetową. Jest to w większości przydatne, aby zobaczyć bardzo duży obraz lub wideo skalowane do pełnego ekranu, zamiast w popup.
    
### Praca z plikami AWS S3{#working-with-aws-s3-files} 
 [Amazon Web Service (AWS) ](https://aws.amazon.com) jest sprzedawcą [przetwarzanie w chmurze](https://en.wikipedia.org/wiki/Cloud_computing) usługi. [S3](https://aws.amazon.com/s3/) jest systemem przechowywania obiektów oferowanym przez AWS. Zamiast hierarchicznego systemu katalogów i plików tradycyjnego systemu plików (jak dysk twardy w komputerze) , S3 oferuje tylko "wiadra", które posiadają "obiekty" (Zadzwonimy do nich. "files" ) .

Dla plików ASCII (np. .csv) , ERDDAP™ może pracować z plikami w wiadrach bezpośrednio. Jedyne, co musisz zrobić, to określić&lt;fileDir &gt; dla zbioru danych przy użyciu określonego formatu dla wiadra AWS, np.https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/. Nie należy stosować leku&lt;cacheFromUrl &gt;. Szczegóły przedstawiono poniżej.

Ale dla plików binarnych (np., .nc , .grib, .bufr, oraz .hdf pliki) , trzeba użyć&lt;system cacheFromUrl &gt; opisany poniżej. ERDDAP , netcdf- java (które ERDDAP™ wykorzystuje do odczytu danych z tych plików) , i inne oprogramowanie danych naukowych są zaprojektowane do pracy z plikami w tradycyjnym systemie plików, który oferuje [poziom bloku](https://en.wikipedia.org/wiki/Block-level_storage) dostęp do plików (który pozwala na odczytanie fragmentów pliku) , ale S3 tylko oferuje [poziom pliku (obiekt) ](https://en.wikipedia.org/wiki/Block-level_storage) dostęp do plików (która pozwala tylko na przeczytanie całego pliku) . AWS oferuje alternatywę dla S3, [Elastyczny Block Store (EBS) ](https://aws.amazon.com/ebs/) ), który obsługuje dostęp do plików na poziomie bloku, ale jest droższy niż S3, więc rzadko jest używany do przechowywania dużych ilości plików danych. (Więc kiedy ludzie mówią, że przechowują dane w chmurze (S3) jest tanie, jest zwykle jabłka do pomarańczy porównania.) 

#### S3 Kubełki{#s3-buckets} 
 **Zawartość wiadra. Kluczyki. Obiekty.**   
Technicznie, wiadra S3 nie są zorganizowane w hierarchicznej strukturze plików jak system plików na komputerze. Zamiast tego wiadra zawierają tylko "obiekty" (pliki) , z których każdy ma "klucz" (nazwa) . Przykładem klucza w tym wiaderku to:

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
Odpowiednim URL dla tego obiektu jest

 [https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc) 

AWS obsługuje niewielką zmianę w sposobie konstruowania tego URL, ale ERDDAP™ wymaga tego jednego konkretnego formatu:
  https://*bucketName*.s3.*region*.amazonaws.com/*key*  

Od ERDDAP v2.29, możesz teraz użyć `s3: / /` Format URI zamiast URL wiadra. Jest to format używany przez [AWS s3 cli](https://docs.aws.amazon.com/cli/latest/reference/s3/) .
s3: / / *bucetName* / *klucz* 

W *region* dla URI S3 można określić na jeden z trzech sposobów:
- W *region* w Tomcat użytkownika `~ / .aws / config` profil
- W `AWS _ DEFAULT _ REGION` zmienna środowiskowa
- W `aws.region` Zmienna JVM (in setenv.sh for Tomcat) 

Jest to powszechna praktyka, jak w tym przykładzie, aby kluczowe nazwy wyglądały jak ścieżka hierarchiczna plus nazwa pliku, ale technicznie nie są. Ponieważ jest to powszechne i użyteczne, ERDDAP™ traktuje klucze z / 's tak, jakby były ścieżką hierarchiczną plus nazwa pliku, a ta dokumentacja będzie odnosić się do nich jako takich. Jeśli kubełek nie używa /' s (np. klucz taki jak
ABI- Lib.2018.052.22.OR\\ _ ABI- L1b- RadM2-M3C10\\ _ G16\\ _ s20180522247575), następnie ERDDAP™ będzie traktować cały klucz jako długą nazwę pliku.

Private vs Public Buckets -- Administrator wiadra S3 może uczynić wiadro i jego zawartość publiczną lub prywatną. Jeśli plik znajduje się publicznie, każdy może go pobrać za pomocą URL. Amazon ma [Otwarte dane](https://aws.amazon.com/opendata/) program, który przechowuje zbiory danych publicznych (w tym dane z NOAA , NASA i USGS) za darmo i nie pobiera opłat za pobranie plików z tych wiader. Jeśli wiadro jest prywatne, pliki w pojemniku są dostępne tylko dla uprawnionych użytkowników i AWS pobiera opłatę (zazwyczaj płacone przez właściciela wiadra) za pobranie plików do komputera nie-AWS S3. ERDDAP™ mogą pracować z danymi w publicznych i prywatnych wiadrach.

#### AWS{#aws-credentials} 
Aby to zrobić tak, że ERDDAP™ można przeczytać zawartość prywatnych wiader, trzeba AWS referencje i trzeba przechowywać plik referencji w standardowym miejscu tak ERDDAP™ może znaleźć informacje. Patrz AWS SDK Java 2.x dokumentacja: [Ustaw domyślne referencje](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials) . (Opcja przechowywania wartości jako Java parametry linii poleceń w \\[ tomcat \\] / bin / setenv.sh może być dobrą opcją.) 
#### AWS / pliki /{#aws-files} 
* / files / system -- W ERDDAP™   [/ files / system](#accessibleviafiles) umożliwia użytkownikom pobieranie plików źródłowych do zbioru danych. Zalecamy, aby włączyć to dla wszystkich zbiorów danych z plikami źródłowymi, ponieważ wielu użytkowników chce pobrać oryginalne pliki źródłowe.
    * Jeśli pliki znajdują się w prywatnym wiaderku S3, wniosek użytkownika o pobranie pliku zostanie rozpatrzony przez ERDDAP™ , który odczyta dane z pliku, a następnie prześle je do użytkownika, zwiększając tym samym obciążenie ERDDAP™ , za pomocą przychodzącej i wychodzącej przepustowości, i co (do ERDDAP™ administrator) uiścić opłatę za wyprowadzenie danych na rzecz AWS.
    * Jeśli pliki znajdują się w publicznym wiaderku S3, wniosek użytkownika o pobranie pliku zostanie przekierowany na adres URL AWS S3 dla tego pliku, więc dane nie będą przepływać przez ERDDAP™ , zmniejszając obciążenie ERDDAP . A jeśli pliki są w Amazon Open Data (wolny) publiczne wiadro, a następnie (do ERDDAP™ administrator) Nie będzie musiał płacić AWS żadnej opłaty za dane. Tak więc, istnieje duża korzyść obsługując dane z opinii publicznej (nie prywatne) S3 wiadra i ogromna zaleta w obsłudze danych z Amazon Open Data (wolny) wiadra.

 ERDDAP wspiera również anonimowe referencje dla publicznych wiader. Aby korzystać z anonimowych referencji, dodaj ` <useAwsAnonymous> prawda </useAwsAnonymous> ` do twojej ugody.

#### Niestandardowe punkty końcowe S3{#custom-s3-endpoints} 
Dla kompatybilnej pamięci obiektowej S3, która nie jest przechowywana przez Amazon, musisz skonfigurować [punkt końcowy _ url](https://docs.aws.amazon.com/sdkref/latest/guide/feature-ss-endpoints.html) wraz ze specifing wiadro / klucz za pomocą `s3: / /` URI.

W *punkt końcowy _ url* może być określone na jeden z trzech sposobów:
- W *punkt końcowy _ url* w Tomcat użytkownika `~ / .aws / config` profil
- W `AWS _ ENDPOINT _ URL` zmienna środowiskowa
- W `aws.punkt końcowy Url` Zmienna JVM (in setenv.sh for Tomcat) 

Dla pełnej listy zmiennych konfiguracyjnych S3, [Zob. dokumentacja Amazona](https://docs.aws.amazon.com/cli/latest/topic/config-vars.html) .

 **Certyfikaty opatrzone znakiem towarowym** 
W przypadku samodzielnych kubełków S3 często posiadasz certyfikaty SSL. Dla ERDDAP aby przeczytać z tych wiader, musisz dodać swój łańcuch certyfikatów do sklepu powierniczego JVM w `$JAVA _ HOME / jre / lib / security / cacerts` . Dodatkowo, ERDDAP wykorzystuje [AWS Common Runtime](https://docs.aws.amazon.com/sdkref/latest/guide/common-runtime.html) dostępu do wiadra asynchronicznie. To zwiększa wydajność, ale również wymaga, aby Twoje samopodpisane certyfikaty zostały dodane do Twojego systemu operacyjnego. Jeśli chcesz tego uniknąć, możesz wyłączyć AWS CRT ` <useAwsCrt> false </useAwsCrt> ` w twoim usposobieniu.

####  ERDDAP™ i AWS S3 Buckets{#erddap-and-aws-s3-buckets} 
 [ ** ERDDAP™ i AWS S3 Buckets** ](#erddap-and-aws-s3-buckets)   
Na szczęście, po wielkim wysiłku, ERDDAP™ posiada szereg funkcji, które pozwalają mu uporać się z nieodłącznymi problemami pracy z dostępem do plików na poziomie bloku S3 w sposób racjonalnie efektywny:

*    \\[ Zastrzeżenie: Praca z wiadrami AWS S3 to dużo pracy. AWS to ogromny ekosystem usług i funkcji. Jest wiele do nauczenia. To wymaga czasu i wysiłku, ale jest do zrobienia. Bądź cierpliwy, a wszystko się ułoży. Poszukaj / poproś o pomoc
( [Dokumentacja AWS](https://aws.amazon.com/documentation/gettingstarted/) , strony internetowe jak [Przepełnienie stosu](https://stackoverflow.com/) , i regularne
     [ ERDDAP™ opcje wsparcia](/docs/intro#support) ) jeśli / kiedy utkniesz. \\]   
     
* Może być trudno nawet znaleźć strukturę katalogów i nazwy plików plików w wiaderku S3. ERDDAP™ ma rozwiązanie tego problemu: EDDTableFromFileNames ma specjalne [\\*\\** from OntheFly](#fromonthefly) opcja, która pozwala na wykonanie zbioru danych EDDTableFromFileNames, który pozwala użytkownikom przeglądać zawartość wiadra S3 (i pobrać pliki) przez zbiór danych "files" opcja. Istnieje [przykład tego poniżej](#viewing-the-contents-of-a-bucket) .
     
*    ERDDAP™ można odczytać dane z [pliki danych skompresowanych zewnętrznie](#externally-compressed-files) , więc jest w porządku, jeśli pliki na S3 są przechowywane jako .gz , .gzip , .bz2 , .Z, lub inne rodzaje plików danych skompresowanych zewnętrznie, które mogą dramatycznie (2-20X) ograniczenie kosztów przechowywania plików. Często nie ma kary czasu za korzystanie z zewnętrznych plików skompresowanych, ponieważ czas zapisany przez przeniesienie mniejszego pliku z S3 do ERDDAP mniej więcej równoważy dodatkowy czas potrzebny na ERDDAP™ do dekompresji pliku. Aby korzystać z tej funkcji, wystarczy upewnić się, że zestaw danych&lt;fileNameRegex &gt; pozwala na typ skompresowanego pliku (np. poprzez dodanie ( |  .gz ) do końca regeksu) .
     
* W najczęstszym przypadku, gdzie masz ERDDAP™ zainstalowane na komputerze do testowania / rozwoju i gdzie zestaw danych posiada pliki binarne, które są przechowywane jako obiekty w wiaderku S3, jedno podejście do uzyskania zbioru danych w ERDDAP™ jest:
    1. Utwórz katalog na komputerze, aby przechowywać kilka testowych plików danych.
    2. Pobierz dwa pliki danych ze źródła do katalogu, który właśnie stworzyłeś.
    3. Stosowanie [GenerateDatasetsXml](#generatedatasetsxml) aby wygenerować kawałek datasets.xml dla zbioru danych w oparciu o dwa lokalne pliki danych.
    4. Sprawdź, czy zbiór danych działa zgodnie z życzeniem [DasDs](#dasdds) i / lub lokalny ERDDAP .
        
         **Następujące kroki zrobić kopię tego zbioru danych (które otrzymają dane z wiadra S3) w sprawie publicznej ERDDAP .** 
        
    5. Kopiuj kawałek datasets.xml dla zbioru danych do datasets.xml dla ogółu społeczeństwa ERDDAP™ które będą służyć danych.
    6. Utwórz katalog publicznie ERDDAP Lokalny dysk twardy do przechowywania plików tymczasowych. Katalog nie użyje dużo miejsca na dysku (zobacz CacheSizeGB poniżej) .
    7. Zmień wartość zbioru danych&lt;fileDir &gt; tag tak, aby wskazywał na katalog, który właśnie stworzyłeś (nawet jeśli katalog jest pusty) .
    8. Dodaj [cacheFromUrl](#cachefromurl) tag określający nazwę zbioru danych oraz opcjonalny przedrostek (np. katalog) w szczególności [Aws S3 URL Format, który ERDDAP™ wymaga](#accessing-files-in-an-aws-s3-bucket) .
    9. Dodaj&lt;cacheSizeGB &gt;] (# cachefromurl) tag do zbioru danych xml (np. 10 jest dobrą wartością dla większości zbiorów danych) powiedzieć ERDDAP™ aby ograniczyć rozmiar lokalnego bufora (tj., nie próbuj buforować wszystkich zdalnych plików) .
    10. Sprawdź, czy to działa publicznie. ERDDAP . Zauważ, że za pierwszym razem ERDDAP™ ładuje zbiór danych, długo zajmie załadowanie, ponieważ ERDDAP™ musi pobrać i przeczytać wszystkie pliki danych.
        
Jeśli zbiór danych jest ogromnym zbiorem ogromnych plików danych z pasami, zajmie to bardzo dużo czasu i będzie niepraktyczne. W niektórych przypadkach, w przypadku plików zawierających dane w sieci, ERDDAP™ może pobrać wymagane informacje (np. punkt czasowy dla danych w pliku danych zawiązanych) z nazwy pliku i uniknąć tego problemu. Patrz [Agregacja poprzez Nazwy plików](#aggregation-via-file-names-or-global-metadata) .
        
    11. Opcjonalnie (ale szczególnie dla zbiorów danych EDDTableFromFiles) , można dodać [nTreats](#nthreads) tag do zbioru danych, aby powiedzieć ERDDAP używać więcej niż 1 wątku w odpowiedzi na żądanie użytkownika o dane. To minimalizuje skutki opóźnienia, który występuje, gdy ERDDAP™ odczytuje pliki danych z (zdalny) AWS S3 wiadra do lokalnego bufora i (być może) dekompresja.

#### AWS S3 Otwarte dane{#aws-s3-open-data} 
W ramach NOAA jest [Program dużych danych](https://www.noaa.gov/nodd/about) , NOAA posiada partnerstwo z pięcioma organizacjami, w tym z AWS, w celu "zbadania potencjalnych korzyści z przechowywania kopii kluczowych obserwacji i modeli wyjść w chmurze, aby umożliwić wykonywanie obliczeń bezpośrednio na danych bez konieczności dalszej dystrybucji". AWS zawiera zbiory danych, z których pochodzi NOAA w ramach programu oferującego publiczny dostęp do dużej kolekcji [Otwarte dane o AWS S3](https://registry.opendata.aws/) z dowolnego komputera, czy jest to instancja Amazon (komputer wynajęty) w sieci AWS lub własnego komputera w dowolnej sieci. Poniższy przykład zakłada, że pracujesz z publicznie dostępnym zbiorem danych.

#### Dostęp do plików w zbiorniku AWS S3{#accessing-files-in-an-aws-s3-bucket} 
Dla prywatnego wiadra danych S3, właściciel wiadra musi dać Ci dostęp do wiadra. (Patrz dokumentacja AWS.) 

We wszystkich przypadkach będziesz potrzebował konta AWS, ponieważ AWS SDK dla Java   (które ERDDAP™ wykorzystuje do pobierania informacji o zawartości wiadra) wymaga potwierdzenia konta AWS. (więcej na ten temat poniżej) 

 ERDDAP™ można uzyskać dostęp tylko do wiader AWS S3, jeśli określić [&lt;cacheFromUrl &gt;] (# cachefromurl) (lub&lt;fileDir &gt;) w określonym formacie:
https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*  
gdzie

* BucetName jest krótką formą nazwy wiadra, np. noaagoes17.
* Region, np. us- east-1, pochodzi z kolumny "Region" w jednej z tabel [Punkty końcowe usługi AWS](https://docs.aws.amazon.com/general/latest/gr/rande.html) gdzie wiadro jest rzeczywiście zlokalizowane.
* Prefiks jest opcjonalny. Jeśli występuje, musi zakończyć się '/' .

Na przykład:https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/  
Ten format URL jest jednym z zaleceń AWS S3: patrz [Dostęp do wiadra](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html) oraz [ten opis przedrostków](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html) . ERDDAP™ wymaga, aby połączyć bucket URL i opcjonalny przedrostek do jednego URL w celu określenia&lt;cacheFromUrl &gt; (lub&lt;fileDir &gt;) gdzie znajdują się pliki.

#### Test Public AWS S3 Buckets{#test-public-aws-s3-buckets} 
Dla publicznych wiader można i należy przetestować adres URL wiadra katalogu AWS S3 w przeglądarce, np.:
 [https://noaa-goes17.s3.us-east-1.amazonaws.com](https://noaa-goes17.s3.us-east-1.amazonaws.com) Jeśli kubełek URL jest prawidłowy i odpowiedni dla ERDDAP , zwróci dokument XML, który ma (częściowy) listę zawartości tego wiadra. Niestety, pełny adres URL (np. bucket URL plus prefix) że ERDDAP™ wants for a dataset does not work in a browser. AWS nie oferuje systemu do przeglądania hierarchii wiadra łatwo w przeglądarce. (Jeśli jest to nieprawidłowe, proszę wysłać e-mail do Chrisa. John w Noah. W przeciwnym razie, Amazon, proszę dodać wsparcie dla tego&#33;) 

#### Przeglądanie zawartości wiadra{#viewing-the-contents-of-a-bucket} 
Koszyki S3 często zawierają kilka kategorii plików, w kilku pseudokatalogach, które mogą stać się kilkoma ERDDAP™ zestawów danych. Aby ERDDAP™ zestaw danych, musisz znać katalog startowy dla&lt;cacheFromUrl &gt; (lub&lt;fileDir &gt;) oraz format nazw plików identyfikujących ten podzbiór plików. Jeśli spróbujesz wyświetlić całą zawartość wiadra w przeglądarce, S3 pokaże Ci pierwsze 1000 plików, co jest niewystarczające. Obecnie najlepszym sposobem, aby zobaczyć całą zawartość wiadra jest zrobić [Nazwy EDDTableFromFileName](#eddtablefromfilenames) zbiór danych (na komputerze ERDDAP™ lub publicznie ERDDAP ) , co daje również łatwy sposób przeglądania struktury katalogów i pobierania plików. W&lt;fileDir &gt; dla tego będzie podany powyżej adres URL, np.https://noaa-goes17.s3.us-east-1.amazonaws.com. \\[ Dlaczego AWS S3 nie oferuje szybkiego i łatwego sposobu na zrobienie tego bez konta AWS? \\] Zauważ, że kiedy robię to na komputerze w sieci non-Amazon, wydaje się, że Amazon spowalnia reakcję na trickle (około 100 (?) pliki na kawałek) po kilku pierwszych kawałkach (1000 plików na kawałek) są pobierane. Ponieważ wiadra mogą mieć ogromną liczbę plików (noaa- goes17 ma 26 milionów) , uzyskanie całej zawartości wiadra może zająć EDDTableFromFileName kilka godzin (np. 12&#33;) Do końca. \\[ Amazon, zgadza się? \\] 

#### Tworzenie tabeli EDD FromFileNames Dataset z pojemnikiem AWS S3{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
Jeśli masz nazwę wiadra, ale nie masz jeszcze listy plików w pojemniku S3 lub przedrostku, który identyfikuje lokalizację odpowiednich plików w pojemniku, użyj poniższych instrukcji, aby EDDTableFromFileNames dataset tak można przeglądać hierarchię katalogu wiadra S3 poprzez ERDDAP jest "files" system.

1. Otwórz konto AWS
     ERDDAP™ wykorzystuje [AWS SDK Java ](https://docs.aws.amazon.com/sdk-for-java/index.html) aby uzyskać informacje wiadro z AWS, więc trzeba [utworzyć i aktywować konto AWS](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/) . To dość duża praca, z wieloma rzeczami do nauczenia się.
     
2. Umieść swoje AWS Kredyty gdzie ERDDAP™ może ich znaleźć.
Należy postępować zgodnie z instrukcjami [Utworzenie AWS Kredyty i Region Rozwoju](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials) więc ERDDAP™   (w szczególności, AWS SDK Java ) będzie w stanie znaleźć i wykorzystać swoje referencje AWS. Jeśli ERDDAP™ nie można znaleźć referencji, zobaczysz
Java.lang. IllegalArgumentException: plik profilu nie może być błędem null w ERDDAP plik log.txt.
    
Wskazówka dla Linuksa i Mac OS: plik uwierzytelniania musi być w katalogu domowym użytkownika, który jest uruchomiony Tomcat (oraz ERDDAP )   (dla tego ustępu, przyjmiemy użytkownik = tomcat) w pliku o nazwie ~ / .aws / referencje. Nie zakładaj, że ~ is / home / tomcat -- właściwie użyj cd ~ aby dowiedzieć się, gdzie system operacyjny myśli ~ dla użytkownika = tomcat jest. Utwórz katalog, jeśli nie istnieje. Ponadto, po umieszczeniu pliku uwierzytelniania w miejscu, upewnij się, że użytkownik i grupa do pliku są Tomcat, a następnie użyj chmod 400 referencji, aby upewnić się, że plik jest read- tylko dla użytkownika = tomcat.
    
3. Utwórz bucket URL w [format, który ERDDAP™ wymaga](#accessing-files-in-an-aws-s3-bucket) , np.,
     [https://noaa-goes17.s3.us-east-1.amazonaws.com](https://noaa-goes17.s3.us-east-1.amazonaws.com) oraz (do wiader publicznych) przetestować go w przeglądarce, aby upewnić się, że zwraca dokument XML, który ma częściową listę zawartości tego wiadra.
     
4. Stosowanie [GenerateDatasetsXml](#generatedatasetsxml) do tworzenia [Nazwy EDDTableFromFileName](#eddtablefromfilenames) zbiór danych:
    * Dla katalogu startowego, użyj tej składni:
        \\*\\*\\ *Z OntheFly,* Twój BucketUrl
na przykład:
        \\*\\*Z OntheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/
    * Nazwa pliku?.
    * Rekursywne? prawda
    * przeładowanie Każdej minuty? 10080
    *    infoUrl ?https://registry.opendata.aws/noaa-goes/
    * Instytucja? NOAA 
    * Podsumowanie? nic ( ERDDAP™ będzie tworzyć przyzwoite podsumowanie automatycznie.) 
    * Tytuł? nic ( ERDDAP™ automatycznie stworzy przyzwoity tytuł.) Jak zwykle, należy edytować otrzymany XML, aby sprawdzić poprawność i dokonać ulepszeń przed kawałkiem zbiorów danych za pomocą go w datasets.xml .
5. Jeśli postępujesz zgodnie z powyższymi instrukcjami i załadujesz zestaw danych ERDDAP , stworzyłeś zestaw danych EDDTableFromFiles. Jako przykład, i aby ułatwić każdemu przeglądanie i pobieranie plików z AWS Open Data buckets, stworzyliśmy EDDTableFromFileNames datasets (zobacz listę na
     [https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_) ) dla prawie wszystkich [AWS S3 Otwarte zbiorniki danych](https://registry.opendata.aws/) .
     \\[ Kilka wiader, których nie uwzględniliśmy, ma dużą liczbę plików w katalogu głównym. (więcej niż można pobrać w rozsądnej ilości czasu) lub nie zezwalają na publiczny dostęp (Czy wszyscy nie powinni być jawni?) lub są wiadrami Pays Requester (np. Sentinel) . \\]   
Jeśli klikniesz na "files" link do jednego z tych zbiorów danych, można przeglądać drzewo katalogów i pliki w tym wiadrze S3. Z powodu drogi\\*\\*\\ * from OnTheFly EDDTableFromFiles działa, te listy katalogowe są zawsze idealnie up- to- date, ponieważ ERDDAP™ Włączam je. Jeśli klikniesz w drzewo katalogowe na nazwę pliku i klikniesz na nazwę pliku, ERDDAP™ przekieruje Państwa prośbę do AWS S3, aby można było pobrać plik bezpośrednio z AWS. Możesz sprawdzić te akta.
    
Kłopoty?
Jeśli pliki EDDTableFromFiles nie załadują się ERDDAP™   (lub DasDds) , szukaj w pliku log.txt wiadomości błędów. Jeśli zobaczysz
Java.lang. IllegalArgumentException: plik profilu nie może być błędem null, problemem jest to, że AWS SDK dla Java   (stosowane przez ERDDAP ) Nie znajduje akt. Patrz powyżej instrukcje uwierzytelniania.
     

Szkoda, że AWS nie pozwala ludziom po prostu korzystać z przeglądarki, aby zobaczyć zawartość wiadra publicznego.

 **Potem możesz zrobić ERDDAP™ zbiory danych dające użytkownikom dostęp do danych w plikach.**   
Patrz instrukcja [ ERDDAP™ i S3 Buckets](#erddap-and-aws-s3-buckets)   (powyżej) .
Dla próbki EDDTableFromFileNames dataset, że zostały wykonane powyżej, jeśli zrobić trochę węszenie wokół z katalogu i nazwy plików w drzewie katalogu, staje się jasne, że nazwy katalogu najwyższego poziomu (np. ABI- L1b- RadC) co ERDDAP™ Zawołać osobne zbiory danych. Kubeł, z którym pracujesz może być podobny. Można następnie kontynuować tworzenie oddzielnych zbiorów danych w ERDDAP™ dla każdego z tych zbiorów danych, przy użyciu np.:
https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/  
jako&lt;cacheFromUrl &gt;. Niestety, dla tego konkretnego przykładu, zbiory danych w wiadrze wydają się być zbiorami danych na poziomie 1 lub 2, które ERDDAP™   [nie jest szczególnie dobry w](#dimensions) , ponieważ zbiór danych jest bardziej skomplikowanym zbiorem zmiennych, które używają różnych wymiarów.
     
    
### Pliki NcML{#ncml-files} 
Pliki NcML pozwalają określić zmiany w locie na jednym lub kilku źródłach oryginalnych NetCDF   (v3 lub v4)   .nc , .grib, .bufr, lub .hdf   (v4 lub v5) pliki, a następnie ERDDAP™ leczenia .nc Pliki ml jako pliki źródłowe. ERDDAP™ zestawy danych zaakceptują .nc Pliki ml zawsze .nc oczekuje się plików. Pliki NcML MUSI mieć rozszerzenie .nc ml. Patrz [ Unidata Dokumentacja NcML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html) . NcML jest przydatne, ponieważ można z nim zrobić kilka rzeczy (na przykład wprowadzenie różnych zmian do różnych plików w zbiorze, w tym dodanie do pliku wymiaru o określonej wartości) , że nie można zrobić z ERDDAP jest datasets.xml .

* Zmiany .nc Zmodyfikowany czas pliku ml spowoduje ponowne załadowanie pliku za każdym razem, gdy zestaw danych jest ponownie wczytywany, ale zmienia się bazowy .nc Pliki danych nie zostaną bezpośrednio zauważone.
* NcML\\*Bardzo często\\*wrażliwe na kolejność niektórych elementów w pliku NcML. Pomyśl o NcML jako o określeniu serii instrukcji w określonej kolejności, z zamiarem zmiany plików źródłowych (stan na początku / górze pliku NcML) do plików docelowych (stan na końcu / dole pliku NcML) .

Alternatywą dla NcML jest [ NetCDF Podmioty gospodarcze ( NCO ) ](#netcdf-operators-nco) . Duża różnica polega na tym, że NcML jest systemem wprowadzania zmian w locie (więc pliki źródłowe nie są zmieniane) , podczas gdy NCO może być używany do wprowadzania zmian do (lub nowe wersje) pliki. Oba NCO i NcML są bardzo, bardzo elastyczne i pozwalają na prawie każdą zmianę można myśleć o plikach. Dla obu, to może być trudne, aby dowiedzieć się dokładnie, jak zrobić to, co chcesz zrobić - sprawdzić w sieci na podobnych przykładach. Oba narzędzia są przydatne do przygotowania netCDF i HDF pliki do użycia z ERDDAP , w szczególności, aby dokonać zmian poza co ERDDAP System manipulacji może pomóc.

Przykład # 1: Dodanie wymiaru czasu z pojedynczą wartością
Oto .nc Plik ml, który tworzy nowy wymiar zewnętrzny (czas, z 1 wartością: 1041379200) i dodaje ten wymiar do zmiennej pic w pliku A2003001.L3m\\ _ DAY\\ _ PIC\\ _ pic\\ _ 4km .nc :
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
Przykład # 2: Zmiana istniejącej wartości czasu
Czasami źródło .nc plik ma już wymiar czasu i wartość czasu, ale wartość jest nieprawidłowa (dla twoich celów) . To .nc Plik ml mówi: dla pliku danych o nazwie "" 19810825230030-NCEI "..., dla zmiennej wymiarowej "time" , ustawić atrybut jednostek na 'sekundy od 1970- 01-01T00: 00: 00Z' i ustawić wartość czasową na 367588800.
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
###  NetCDF Podmioty gospodarcze ( NCO )  {#netcdf-operators-nco} 
"Operatorzy netCDF ( NCO ) składa się z tuzina autonomicznych programów, które przyjmują netCDF \\[ v3 lub v4 \\] , HDF   \\[ v4 lub v5 \\] , \\[ .grib, .bufr, \\] lub DAP pliki jako dane wejściowe, a następnie działają (np. uzyskać nowe dane, obliczyć statystyki, drukować, hiperlaboratorium, manipulować metadanymi) i wyjść wyniki do ekranu lub plików w formatach tekstowych, binarnych lub netCDF. NCO pomaga w analizie zawiązanych danych naukowych. W stylu shell- command NCO pozwala użytkownikom manipulować i analizować pliki interaktywnie, lub ze skryptami ekspresowymi, które unikają niektórych napowietrznych środowisk programowania wyższego poziomu ". (od [ NCO ](https://nco.sourceforge.net/) strona główna) .

Alternatywa dla NCO en [NcML](#ncml-files) . Duża różnica polega na tym, że NcML jest systemem wprowadzania zmian w locie (więc pliki źródłowe nie są zmieniane) , podczas gdy NCO może być używany do wprowadzania zmian do (lub nowe wersje) pliki. Oba NCO i NcML są bardzo, bardzo elastyczne i pozwalają na prawie każdą zmianę można myśleć o plikach. Dla obu, to może być trudne, aby dowiedzieć się dokładnie, jak zrobić to, co chcesz zrobić - sprawdzić w sieci na podobnych przykładach. Oba narzędzia są przydatne do przygotowania netCDF i HDF pliki do użycia z ERDDAP , w szczególności, aby dokonać zmian poza co ERDDAP System manipulacji może pomóc.

Na przykład, możesz użyć NCO aby jednostki zmiennej czasu były spójne w grupie plików, gdzie początkowo nie były spójne. Albo, możesz użyć NCO do stosowania scale\\_factor oraz add\\_offset w grupie plików, gdzie scale\\_factor oraz add\\_offset mają różne wartości w różnych plikach źródłowych.
 (Albo, możesz teraz poradzić sobie z tymi problemami w ERDDAP™ przez [ EDDGrid FromNcFilesUnpacked](#eddgridfromncfilesunpacked) , który jest wariantem EDDGrid FromNcFiles, który rozpakowuje zapakowane dane i standaryzuje wartości czasowe na niskim poziomie w celu zajęcia się plikami kolekcji, które mają różne scale\\_factor s oraz add\\_offset lub inne jednostki czasowe.) 

 NCO jest Programy Free i Open Source, które wykorzystuje [GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html) Prawo jazdy.

Przykład # 1: Uspójnienie jednostek
 EDDGrid Pliki FromFiles i EDDTable Z plików nalega, aby jednostki dla danej zmiennej były identyczne we wszystkich plikach. Jeśli niektóre pliki są trywialne (niefunkcjonalnie) inne niż inne (np. jednostki czasowe
"sekundy od 1970- 01- 01 00: 00: 00 UTC" kontra
 "seconds since 1970-01-01T00:00:00Z" , możesz użyć NCO jest [ncatted](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor) . do zmiany jednostek we wszystkich plikach, aby były identyczne z
nco / ncatted -a units, time, o, c, 'seconds from 1970- 01-01T00: 00: 00Z'\\ * .nc   
 \\[ Dla wielu problemów takich jak ten w EDDTableFrom... Zestawy plików, możesz teraz użyć [standaryzacja Co?](#standardizewhat) powiedzieć ERDDAP do standaryzacji plików źródłowych, jak są one odczytywane ERDDAP . \\] 
    
### Ograniczenia do rozmiaru zbioru danych{#limits-to-the-size-of-a-dataset} 
Zobaczysz wiele odniesień do "2 miliardów" poniżej. Dokładniej, jest to odniesienie do 2,147,483,647 (2 ^ 31-1) , która jest maksymalną wartością 32- bitowej liczby całkowitej. Na przykład w niektórych językach komputerowych Java   (które ERDDAP™ jest wpisany w) , jest to największy typ danych, który może być stosowany w wielu strukturach danych (na przykład wielkość tablicy) .

Dla wartości String (na przykład dla nazw zmiennych, nazw atrybutów, wartości atrybutów String oraz wartości danych String) , maksymalna liczba znaków na String w ERDDAP™ to ~ 2 miliardy. Ale w prawie wszystkich przypadkach, nie będzie małych lub dużych problemów, jeśli String przekracza rozsądny rozmiar (np. 80 znaków dla nazw zmiennych i nazw atrybutów oraz 255 znaków dla większości wartości atrybutów String i wartości danych) . Na przykład, strony internetowe, które wyświetlają długie nazwy zmiennych będą niezgrabnie szerokie i długie nazwy zmiennych będą obcinane, jeśli przekroczą granicę typu pliku odpowiedzi.

W odniesieniu do zbiorów danych w sieci:

* Maksymalna liczba axisVariable s wynosi ~ 2 mld.
Maksymalna liczba dataVariable s wynosi ~ 2 mld.
Ale jeśli zbiór danych ma &gt; 100 zmiennych, będzie to kłopotliwe dla użytkowników.
A jeśli zbiór danych ma &gt; 1 milion zmiennych, serwer będzie potrzebował dużo fizycznej pamięci i będą inne problemy.
* Maksymalny rozmiar każdego wymiaru ( axisVariable ) to ~ 2 miliardy wartości.
* Myślę, że maksymalna całkowita liczba komórek (produkt wszystkich wymiarów) jest nieograniczony, ale może być ~ 9e18.

Dla zbiorów danych tabelarycznych:

* Maksymalna liczba dataVariable s wynosi ~ 2 mld.
Ale jeśli zbiór danych ma &gt; 100 zmiennych, będzie to kłopotliwe dla użytkowników.
A jeśli zbiór danych ma &gt; 1 milion zmiennych, serwer będzie potrzebował dużo fizycznej pamięci i będą inne problemy.
* Maksymalna liczba źródeł (na przykład, pliki) które mogą być zagregowane jest ~ 2 mld.
* W niektórych przypadkach maksymalna liczba wierszy z pojedynczego źródła (na przykład plik, ale nie baza danych) wynosi ~ 2 miliardy wierszy.
* Nie sądzę, żeby były inne granice.

W odniesieniu zarówno do zbiorów danych w paskach, jak i tabelarycznych istnieją pewne wewnętrzne ograniczenia wielkości podzbioru, które mogą być wymagane przez użytkownika w jednym wniosku (często związane z &gt; 2 mld czegoś lub ~ 9e18 czegoś) , ale jest o wiele bardziej prawdopodobne, że użytkownik przekroczy granice specyficzne dla typu pliku.

*    NetCDF Wersja 3 .nc pliki są ograniczone do 2GB bajtów. (Jeśli to naprawdę problem dla kogoś, daj mi znać: Mogę dodać wsparcie dla NetCDF Wersja 3 .nc Rozszerzenie 64- bitowe lub NetCDF Wersja 4, która znacznie zwiększyłaby limit, ale nie nieskończenie.) 
* Przeglądarki awarii tylko ~ 500MB danych, więc ERDDAP™ ogranicza odpowiedź na .htmlTable żądania ~ 400MB danych.
* Wiele programów analizy danych ma podobne granice (na przykład, maksymalny rozmiar wymiaru jest często ~ 2 mld wartości) , więc nie ma powodu, aby ciężko pracować, aby obejść granice specyficzne dla typu pliku.
* Limity specyficzne dla typu pliku są przydatne, ponieważ zapobiegają naiwnym żądaniom naprawdę ogromnych ilości danych (na przykład, "daj mi cały ten zbiór danych", gdy zbiór danych ma 20TB danych) , które zajęłyby tygodnie lub miesiące, aby pobrać. Im dłużej pobierz, tym bardziej prawdopodobne, że nie uda się z różnych powodów.
* Limity specyficzne dla danego typu plików są przydatne, ponieważ zmuszają użytkownika do radzenia sobie z podzbiorami wielkości uzasadnionej (na przykład zajmowanie się dużym zbiorem danych za pomocą plików z danymi z jednego punktu czasowego) .
         
### Przełącz na ACDD- 1.3{#switch-to-acdd-13} 
My (w szczególności [GenerateDatasetsXml](#generatedatasetsxml) ) aktualnie zalecane [ACDD wersja 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) , który został ratyfikowany na początku 2015 r. i który jest określany jako "ACDD- 1.3" w atrybucie konwencji globalnych. Przed ERDDAP™ wersja 1.62 (wydany w czerwcu 2015 r.) , ERDDAP™ używane / zalecane oryginał, wersja 1.0, z [ NetCDF Konwencja o atrybucie dla wyszukiwania danych](https://wiki.esipfed.org/ArchivalCopyOfVersion1) które zostało określone jako " Unidata Dataset Discovery v1.0 "w konwencjach globalnych i Metadata\\_Conventions atrybuty.

Jeśli Twoje zbiory danych używają wcześniejszych wersji ACDD, zalecamy przełączenie się na ACDD- 1.3. To nie jest trudne. ACDD- 1.3 jest bardzo kompatybilny wstecznie z wersją 1.0. Do przełączania, dla wszystkich zbiorów danych (z wyjątkiem EDDGrid FromErddap i EDDTable Zestawy danych FromErddap) :

1. Usuń nowo usunięty globalny Metadata\\_Conventions atrybut poprzez dodanie (lub poprzez zmianę istniejącego Metadata\\_Conventions atrybut)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
do globalnego zbioru danych&lt; addAttributes &gt;.
     
2. Jeżeli zbiór danych posiada atrybut konwencji w skali globalnej&lt; addAttributes &gt;, zmienić wszystkie " Unidata Dataset Discovery v1.0 "odniesienia do" ACDD- 1.3 "
Jeśli zbiór danych nie posiada atrybutu konwencji w skali globalnej&lt; addAttributes &gt;, a następnie dodać jeden odnoszący się do ACDD- 1.3 Na przykład:
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. Jeśli zbiór danych ma globalny standard\\_name\\_vocabulary atrybut, proszę zmienić format wartości na przykład,
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
Jeżeli odniesienie dotyczy starszej wersji [Tabela nazwy standardowej CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) . to prawdopodobnie dobry pomysł, aby przejść do aktualnej wersji (65, jak to zapisujemy) , ponieważ nowe nazwy standardowe są dodawane do tej tabeli z kolejnymi wersjami, ale stare nazwy standardowe są rzadko depregatowane i nigdy nie usuwane.
     
4. Chociaż ACDD- 1.0 zawiera atrybuty globalne dla creator\\_name , creator\\_email , creator\\_url , [GenerateDatasetsXml](#generatedatasetsxml) nie dodał ich automatycznie aż do pewnego czasu ERDDAP™ v1.50. Jest to ważna informacja:
        
    *    creator\\_name pozwala użytkownikom znać / cytować twórcę zbioru danych.
    *    creator\\_email podaje użytkownikom preferowany adres e-mail do kontaktu z twórcą zbioru danych, na przykład jeśli mają pytania dotyczące zbioru danych.
    *    creator\\_url daje użytkownikom sposób, aby dowiedzieć się więcej o twórcy.
    *    ERDDAP™ wykorzystuje wszystkie te informacje przy generowaniu dokumentów metadanych FGDC i ISO 19115-2 / 19139 dla każdego zbioru danych. Dokumenty te są często wykorzystywane przez zewnętrzne służby poszukiwawcze.
    
Proszę dodać te atrybuty do globalnego zbioru danych&lt; addAttributes &gt;.
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
To jest to. Mam nadzieję, że to nie było zbyt trudne.
     
### Zarr Przewodniczący{#zarr} 
Od wersji 2.25 ERDDAP™ można odczytać lokalne Używanie plików Zarr [Pliki EDDTableFromNc@@](#eddtablefromncfiles) oraz [ EDDGrid Pliki FromNc@@](#eddgridfromncfiles) .

 (Od sierpnia 2019 r.) Możemy się łatwo mylić, ale nie jesteśmy jeszcze przekonani, że [Zarr Przewodniczący](https://github.com/zarr-developers/zarr-python) , lub podobne systemy, które rozbijają pliki danych na mniejsze kawałki, są świetne rozwiązania problemu ERDDAP™ czytanie danych przechowywanych w usługach w chmurze, takich jak Amazon AWS S3. Zarr jest wspaniałą technologią, która wykazała swoją przydatność w różnych sytuacjach, po prostu nie jesteśmy pewni, że ERDDAP + S3 będzie jedną z tych sytuacji. Przede wszystkim mówimy: zanim pośpieszymy się z wysiłkiem, aby przechowywać wszystkie nasze dane w Zarr, zróbmy kilka testów, aby zobaczyć, czy jest to rzeczywiście lepsze rozwiązanie.

Problemy z dostępem do danych w chmurze są opóźnione (opóźnienie pierwszego uzyskania danych) i dostęp na poziomie plików (Zamiast blokowania dostępu na poziomie) . Zarr rozwiązuje problem dostępu na poziomie plików, ale nie robi nic z opóźnieniem. W porównaniu do pobrania pliku (więc może być odczytywany jako plik lokalny z dostępem do poziomu blokady) , Zarr może nawet zaostrzyć problem latencji, ponieważ, z Zarr, czytanie pliku teraz obejmuje serię kilku wywołań do odczytania różnych części pliku (każdy z własnym opóźnieniem) . Problem latencji można rozwiązać przez równoległe wnioski, ale jest to rozwiązanie wysokiego poziomu, nie zależy od Zarr.

I z Zarrem (jak w relacyjnych bazach danych) , tracimy wygodę posiadania pliku danych jest prosty, pojedynczy plik, który można łatwo zweryfikować integralność, lub zrobić / pobrać kopię.

 ERDDAP™   (od v2) posiada system do utrzymywania lokalnego bufora plików ze źródła URL (np. S3) (zob. [&lt;cacheFromUrl &gt; oraz&lt;cacheMaxGB &gt;] (# cachefromurl) ). I nowy.&lt;nThreads &gt;] (# nthreas) powinno zminimalizować problem opóźnienia poprzez równoległe pobieranie danych na wysokim poziomie.&lt;cacheFromUrl &gt; wydaje się pracować bardzo dobrze dla wielu scenariuszy. (Nie jesteśmy pewni, jak korzystne&lt;nThreads &gt; jest bez dalszych badań.) Przyznajemy, że nie wykonaliśmy testów czasowych na przykładzie AWS z dobrym połączeniem sieciowym, ale udało nam się przetestować z różnymi zdalnymi źródłami URL plików. I ERDDAP jest&lt;cacheFromUrl &gt; współpracuje z dowolnym typem pliku danych (np., .nc , .hdf , .csv, .jsonlCSV ) , nawet jeśli zewnętrzne sprężone (np., .gz ) , bez żadnych zmian w plikach (np. przepisywanie ich jako kolekcji Zarr) .

Jest prawdopodobne, że różne scenariusze będą sprzyjać różnym rozwiązaniom, np., trzeba tylko przeczytać część pliku raz (Zarr wygra.) , vs. muszą przeczytać wszystkie pliki raz, vs. muszą czytać część lub cały plik wielokrotnie (&lt;cacheFromUrl &gt; wygra).

Przede wszystkim mówimy: zanim pośpieszymy się z wysiłkiem, aby przechowywać wszystkie nasze dane w Zarr, zróbmy kilka testów, aby zobaczyć, czy jest to rzeczywiście lepsze rozwiązanie.

- -
## Lista typów zbiorów danych{#list-of-types-datasets} 
Jeśli potrzebujesz pomocy przy wyborze odpowiedniego typu zbioru danych, zobacz [Wybór typu zbioru danych](#choosing-the-dataset-type) .

Rodzaje zbiorów danych dzielą się na dwie kategorie. ( [Dlaczego?](#why-just-two-basic-data-structures) ) 

###  EDDGrid  {#eddgrid} 
*    [ ** EDDGrid ** ](#eddgrid) zbiory danych obsługują dane zaprogramowane.
    * W EDDGrid zbiory danych, zmienne danych są wielowymiarowymi tablicami danych.
    * Musi istnieć zmienna osi dla każdego wymiaru. Zmienne osiowe MUSI być określone w kolejności, w której zmienne danych ich używają.
    * W EDDGrid Zestawy danych, wszystkie zmienne danych MUSI używać (udział) wszystkie zmienne osi.
         ( [Dlaczego?](#why-just-two-basic-data-structures)   [A jeśli nie?](#dimensions) ) 
Nowy ERDDAP™ wersja 2.29.0 z EDDGrid FromNcFiles to eksperymentalne wsparcie zmiennych danych, które nie obsługują wszystkich zmiennych osi (lub jak niektórzy nazwali to danymi 1D i 2D w tym samym zbiorze danych) .
    * Wymiary sortowane - W sumie EDDGrid Zestawy danych, każdy wymiar MUSI być uporządkowany (Wznoszące się lub zstępujące) . Każdy może być nieregularnie rozmieszczony. Nie może być żadnych powiązań. Jest to wymóg [Standard metadanych CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Jeśli jakiekolwiek wartości wymiarów nie są uporządkowane, zbiór danych nie zostanie załadowany i ERDDAP™ zidentyfikuje pierwszą niesortowaną wartość w pliku dziennika, *bigParentDirectory* / logs / log.txt.
        
Kilka podklas ma dodatkowe ograniczenia (w szczególności, EDDGrid AgregateExistingDimension wymaga, aby zewnętrzny (najbardziej lewy, pierwszy) wymiar był wznoszący.
        
Niesortowane wartości wymiarów prawie zawsze wskazują na problem z zbiorem danych źródłowych. Najczęściej zdarza się to, gdy niewłaściwy lub niewłaściwy plik jest włączony do agregacji, co prowadzi do niesortowanego wymiaru czasu. Aby rozwiązać ten problem, patrz komunikat błędu w ERDDAP™ plik log.txt, aby znaleźć naruszającą wartość czasu. Następnie poszukaj w plikach źródłowych, aby znaleźć odpowiedni plik (lub jeden przed lub jeden po) To nie należy do agregacji.
        
    * Patrz bardziej kompletny opis [ EDDGrid model danych](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel) .
    * W EDDGrid typy zbioru danych to:
        *    [ EDDGrid Pliki FromAudioFiles](#eddfromaudiofiles) agregaty danych z grupy lokalnych plików audio.
        *    [ EDDGrid FromDap](#eddgridfromdap) Uchwyty uchwytów danych z DAP serwerów.
        *    [ EDDGrid Tabela FromEDDTable](#eddgridfromeddtable) pozwala przekształcić tabelaryczny zbiór danych w zawiązany zestaw danych.
        *    [ EDDGrid FromErddap](#eddfromerddap) Uchwyty uchwytów danych ze zdalnego ERDDAP .
        *    [ EDDGrid FromEtopo](#eddgridfrometopo) tylko obsługuje built- w danych topograficznych ETOPO.
        *    [ EDDGrid Pliki FromFiles](#eddgridfromfiles) jest superklasą wszystkich EDDGrid Z zajęć z archiwum.
        *    [ EDDGrid Pliki FromMergeIRFiles](#eddgridfrommergeirfiles) dane zagregowane z grupy lokalnych MergeIR .gz pliki.
        *    [ EDDGrid Pliki FromNc@@](#eddgridfromncfiles) dane zagregowane z grupy lokalnych NetCDF   (v3 lub v4)   .nc oraz powiązane pliki.
        *    [ EDDGrid FromNcFilesUnpacked](#eddgridfromncfilesunpacked) jest wariantem, jeżeli EDDGrid FromNcFiles, które również agreguje dane z grupy lokalnych NetCDF   (v3 lub v4)   .nc oraz powiązane pliki, które ERDDAP™ rozpakowywanie na niskim poziomie.
        *    [ EDDGrid LonPM180](#eddgridlonpm180) zmienia wartości długości geograficznej dziecka EDDGrid tak, że są one w zakresie -180 do 180.
        *    [ EDDGrid Lon0360](#eddgridlon0360) zmienia wartości długości geograficznej dziecka EDDGrid więc są w zakresie od 0 do 360.
        *    [ EDDGrid SideBySide](#eddgridsidebyside) 2 lub więcej agregatów EDDGrid zbiory danych obok siebie.
        *    [ EDDGrid AgregateExistingDimension](#eddgridaggregateexistingdimension) 2 lub więcej agregatów EDDGrid zbiory danych, z których każdy ma inny zakres wartości dla pierwszego wymiaru, ale identyczne wartości dla innych wymiarów.
        *    [ EDDGrid Kopiuj](#eddgridcopy) może dokonać lokalnej kopii innego EDDGrid dane i obsługuje dane z lokalnej kopii.
             
    * Wszystkie EDDGrid zbiór danych obsługuje ustawienie nTreads, które mówi ERDDAP™ ile wątków należy użyć w odpowiedzi na zapytanie. Patrz [nTreats](#nthreads) dokumentację dotyczącą szczegółów.
         
### Tabela EDD{#eddtable} 
*    [ **Tabela EDD** ](#eddtable) Zestawy danych obsługują dane tabelaryczne.
    * Dane tabelaryczne można przedstawić jako tabelę podobną do bazy danych z wierszami i kolumnami. Każda kolumna (zmienna danych) posiada nazwę, zbiór atrybutów i przechowuje tylko jeden typ danych. Każdy wiersz ma obserwację (lub grupy powiązanych wartości) . Źródło danych może mieć dane w innej strukturze danych, bardziej skomplikowanej strukturze danych i / lub wielu plikach danych, ale ERDDAP™ musi być w stanie przenieść dane źródłowe do tabeli podobnej do bazy danych w celu przedstawienia danych jako tabelarycznego zbioru danych dla użytkowników ERDDAP .
    * Patrz bardziej kompletny opis [Model danych EDDTable](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel) .
    * Typy zbiorów danych EDDTable to:
        *    [EDDTableFromAllDatasets](#eddtablefromalldatasets) jest zbiorem danych wysokiego poziomu, który zawiera informacje o wszystkich innych zbiorach danych w Twoim ERDDAP .
        *    [Pliki EDDTableFromAsciiFiles](#eddtablefromasciifiles) dane zagregowane z plików tabelarycznych ASCII oddzielonych zespołami, tabelami, średnikami lub spacjami.
        *    [EDDTableFromAsciiService](#eddtablefromasciiservice) jest superklasą wszystkich klas EDDTableFromAsciiService.
        *    [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos) obsługuje dane z niektórych NOAA Usługi sieciowe NOS.
        *    [Pliki EDDTableFromAudioName](#eddfromaudiofiles) agregaty danych z grupy lokalnych plików audio.
        *    [Tabela EDDFrom Pliki AwsXmlFiles](#eddtablefromawsxmlfiles) dane agregatów z zestawu Automatic Weather Station (AWS) Pliki XML.
        *    [EDDTableFromCassandra](#eddtablefromcassandra) Zajmuje się danymi tabelarycznymi z jednego stołu Cassandra.
        *    [Pliki EDDTableFromColumnarasciiFiles](#eddtablefromcolumnarasciifiles) agregaty danych z tabelarycznych plików danych ASCII z kolumnami danych o ustalonej szerokości.
        *    [EDDTableFromDapSequence](#eddtablefromdapsequence) Obsługuje dane tabelaryczne z DAP serwery sekwencji.
        *    [EDDTableFromDatabase](#eddtablefromdatabase) obsługuje dane tabelaryczne z jednej tabeli bazy danych.
        *    [Tabela EDDFrom EDDGrid ](#eddtablefromeddgrid) pozwala utworzyć zestaw danych EDDTable z EDDGrid zestaw danych.
        *    [EDDTableFromErddap](#eddfromerddap) obsługuje dane tabelaryczne ze zdalnego ERDDAP .
        *    [Nazwy EDDTableFromFileName](#eddtablefromfilenames) tworzy zbiór danych z informacji o grupie plików w systemie plików serwera, ale nie obsługuje danych z plików.
        *    [Pliki EDDTableFromFiles](#eddtablefromfiles) jest superklasą wszystkich zajęć z plików EDDTableFrom.
        *    [EDDTableFromHttpGet](#eddtablefromhttpget) en ERDDAP to jedyny system importu danych i eksportu danych.
        *    [Tabela EDDFrom Hyrax Pliki](#eddtablefromhyraxfiles)   (ZANIECHANE) agregaty danych z plików o kilku zmiennych o wspólnych wymiarach obsługiwanych przez [ Hyrax   OPeNDAP serwer](https://www.opendap.org/software/hyrax-data-server) .
        *    [Pliki EDDTableFromInvalidCRAFiles](#eddtablefrominvalidcrafiles) dane zagregowane z NetCDF   (v3 lub v4)   .nc pliki, które korzystają z określonego, niepoprawnego wariantu karty DSG CF (CRA) pliki. Chociaż ERDDAP™ obsługuje ten typ pliku, jest to nieprawidłowy typ pliku, którego nikt nie powinien używać. Grupy, które obecnie korzystają z tego typu plików, są zdecydowanie zachęcane do korzystania z ERDDAP™ generowanie ważnych plików CF DSG CRA i zaprzestanie korzystania z tych plików.
        *    [Pliki EDDTableFromJsonlCSVFiles](#eddtablefromjsonlcsvfiles) dane zagregowane z [JSON Linie plików CSV](https://jsonlines.org/examples/) .
        *    [Pliki EDDTableFromMultidimNc@@](#eddtablefrommultidimncfiles) dane zagregowane z NetCDF   (v3 lub v4)   .nc pliki z kilkoma zmiennymi o wspólnych wymiarach.
        *    [EDDTableFromMqtt](/docs/server-admin/mqtt-integration) konstruuje zbiór danych na podstawie komunikatów MQTT. Uwaga: dokumentacja znajduje się na specjalnej stronie. Zauważ, że istnieje wiele podobieństw do [EDDTableFromHttpGet](#eddtablefromhttpget) .
        *    [Pliki EDDTableFromNc@@](#eddtablefromncfiles) dane zagregowane z NetCDF   (v3 lub v4)   .nc pliki z kilkoma zmiennymi o wspólnych wymiarach. Dobrze jest nadal używać tego typu zbioru danych dla istniejących zbiorów danych, ale dla nowych zbiorów danych zalecamy stosowanie EDDTableFromMultidimNcFiles zamiast.
        *    [Pliki EDDTableFromNcCFFiles](#eddtablefromnccffiles) dane zagregowane z NetCDF   (v3 lub v4)   .nc plików, które używają jednego z formatów plików określonych przez [CF Geometrie do pobierania próbek dyskretnych (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) konwencje. Ale dla plików wykorzystujących jeden z wielowymiarowych wariantów CF DSG, użyj [Pliki EDDTableFromMultidimNc@@](#eddtablefrommultidimncfiles) Zamiast tego.
        *    [Pliki EDDTableFromNccsvName](#eddtablefromnccsvfiles) dane zagregowane z [NCSSV](/docs/user/nccsv-1.00) Pliki ASCII .csv.
        *    [EDDTableFromNOS](#eddtablefromnos)   (ZANIECHANE) obsługuje dane tabelaryczne z serwerów NOS XML.
        *    [EDDTableFromOBIS](#eddtablefromobis) obsługuje dane tabelaryczne z serwerów OBIS.
        *    [Pliki EDDTableFromParquetFiles](#eddtablefromparquetfiles) obsługuje dane z [Parkiet](https://parquet.apache.org/) .
        *    [Tabela EDDFrom SOS ](#eddtablefromsos) Obsługuje dane tabelaryczne z SOS serwerów.
        *    [Pliki EDDTableFromThreddsFiles](#eddtablefromthreddsfiles)   (ZANIECHANE) agregaty danych z plików o kilku zmiennych o wspólnych wymiarach obsługiwanych przez [TRZECIA OPeNDAP serwer](https://www.unidata.ucar.edu/software/tds/) .
        *    [Tabela EDDFrom WFS Pliki](#eddtablefromwfsfiles)   (ZANIECHANE) tworzy lokalną kopię wszystkich danych z ArcGIS MapServer WFS serwer więc dane mogą być szybko ponownie podawane do ERDDAP™ użytkowników.
        *    [EDDTableAggregateRows](#eddtableaggregaterows) może sporządzić zbiór danych z tabeli EDDTable z grupy zbiorów danych tabeli EDDTable.
        *    [EDDTableCopy](#eddtablecopy) może zrobić lokalną kopię wielu typów zbiorów danych EDDTable, a następnie szybko ponownie podawać dane z lokalnej kopii.

  
- -

## Szczegółowy opis typów danych{#detailed-descriptions-of-dataset-types} 

###  EDDGrid FromDap{#eddgridfromdap} 
 [ ** EDDGrid FromDap** ](#eddgridfromdap) obsługuje zmienne siatki z [ DAP ](https://www.opendap.org/) serwerów.

* Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Możesz zebrać informacje potrzebne do dostrojenia lub tworzenia własnego XML dla EDDGrid Zestaw danych FromDap patrząc na pliki DDS i DAS źródłowego zbioru danych w przeglądarce (przez dodanie .das i .dds do sourceUrl na przykład: [https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds) ) .
     
*    EDDGrid FromDap może pobrać dane z dowolnej wielowymiarowej zmiennej z DAP serwer danych. (Poprzednio: EDDGrid FromDap był ograniczony do zmiennych oznaczonych jako "siatka", ale nie jest to już wymóg.)   
     
* Wymiary sortowane - Wartości dla każdego wymiaru MUSI być posortowane (Wznoszące się lub zstępujące) . Wartości mogą być nieregularnie rozłożone. Nie może być żadnych powiązań. Jest to wymóg [Standard metadanych CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Jeśli jakiekolwiek wartości wymiarów nie są uporządkowane, zbiór danych nie zostanie załadowany i ERDDAP™ zidentyfikuje pierwszą niesortowaną wartość w pliku dziennika, *bigParentDirectory* / logs / log.txt.
    
Niesortowane wartości wymiarów prawie zawsze wskazują na problem z zbiorem danych źródłowych. Najczęściej zdarza się to, gdy niewłaściwy lub niewłaściwy plik jest włączony do agregacji, co prowadzi do niesortowanego wymiaru czasu. Aby rozwiązać ten problem, patrz komunikat błędu w ERDDAP™ plik log.txt, aby znaleźć naruszającą wartość czasu. Następnie poszukaj w plikach źródłowych, aby znaleźć odpowiedni plik (lub jeden przed lub jeden po) To nie należy do agregacji.
    
####  EDDGrid szkielet FromDap XML{#eddgridfromdap-skeleton-xml} 

 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset type="EDDGridFromDap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromDap, this gets the remote .dds and then gets the new  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

     
###  EDDGrid Tabela FromEDDTable{#eddgridfromeddtable} 
 [ ** EDDGrid Tabela FromEDDTable** ](#eddgridfromeddtable) pozwala konwertować zestaw danych tabeli EDDTable na EDDGrid Zestaw danych w paski. Pamiętaj o tym. ERDDAP™ traktuje zbiory danych jako: [Zestawy danych w sieci (Podklasy EDDGrid ) lub tabelaryczne zbiory danych (podklasy tabeli EDD) ](#why-just-two-basic-data-structures) .

* Normalnie, jeśli masz zapięte dane, po prostu ustawić EDDGrid zestaw danych bezpośrednio. Czasami nie jest to możliwe, na przykład, gdy masz dane przechowywane w bazie relacyjnej, które ERDDAP™ można uzyskać dostęp tylko za pośrednictwem EDDTableFromDatabase. EDDGrid Zajęcia FromEDDTable pozwalają na zaradzenie tej sytuacji.
     
* Oczywiście dane zawarte w podstawowym zbiorze danych dotyczących EDDTable muszą być: (zasadniczo) Zachwycone dane, ale w formie tabeli. Na przykład zbiór danych EDDTable może zawierać dane CTD: pomiary prądu na wschód i na północ, na kilku głębokościach, w kilku przypadkach. Ponieważ głębokość jest taka sama w każdym punkcie czasowym, EDDGrid FromEDDTable może tworzyć zestaw danych z zawiązanym paskiem o czasie i wymiarze głębokości, które mają dostęp do danych za pośrednictwem podstawowego zbioru danych EDDTable.
     
* GenerateDatasets Xml... Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Możesz zebrać informacje potrzebne do poprawy szkicu.
     
* Atrybuty źródłowe... Podobnie jak w przypadku wszystkich innych typów zbiorów danych, EDDGrid FromTable ma pomysł, że istnieją globalny sourceAtrybuty i [globalny addAttributes ](#global-attributes)   (określone w datasets.xml ) , które są połączone, aby globalny łączny Atrybuty, które są tym, co widzą użytkownicy. Dla globalnych atrybutów źródłowych, EDDGrid FromEDDTable wykorzystuje globalną kombinację Atrybuty podstawowego zbioru danych EDDTable. (Jeśli się nad tym zastanowić, to ma to sens.) 
    
Podobnie, dla każdego axisVariable i dataVariable jest [ addAttributes ](#addattributes) , EDDGrid FromEDDTable używa kombinacji zmiennej Atrybuty z podstawowego zbioru danych EDDTable jako EDDGrid FromaEDDTable 's sourceAtrybuty. (Jeśli się nad tym zastanowić, to ma to sens.) 
    
W konsekwencji, jeśli tabela EDDTable ma dobre metadane, EDDGrid FromEDDTable często potrzebuje bardzo mało addAttributes metadane -- tylko kilka ulepszeń tu i tam.
    
*    dataVariable z axisVariable s -- Podstawowa tabela EDDTable dataVariable b. An EDDGrid Zestaw danych FromEDDTable będzie miał kilka axisVariable s (stworzony z części tabeli EDDTable dataVariable s) i niektóre dataVariable s (utworzona z pozostałej tabeli EDDTable dataVariable s) . [GenerateDatasetsXml](#generatedatasetsxml) będzie zgadywać, co do którego EDDTable dataVariable do EDDGrid Tabela FromEDDTable axisVariable s, ale to tylko zgadywanie. Musisz zmodyfikować wyjście GenerateDatasetsXml, aby określić który dataVariable s axisVariable s i w jakiej kolejności.
     
* axisValues -- Nie ma nic o podstawowej tabeli EDDTable do powiedzenia EDDGrid FromEDDTable możliwe wartości axisVariable s w zawiązanej wersji zbioru danych, więc MUSI podać te informacje dla każdego axisVariable poprzez jeden z tych atrybutów:
    
    * axisValues -- pozwala określić listę wartości. Na przykład:
        &lt;att nazwa = "axisValues" [type = "doubleList"](#attributetype) \\ &gt; 2, 2, 5, 3, 3,5, 4&lt;/ att &gt;
Należy zwrócić uwagę na użycie [typ danych](#data-types) plus lista słów. Ponadto, rodzaj listy (na przykład, podwójny) MUSI dopasować dane Rodzaj zmiennej w tabeli EDDTable oraz EDDGrid Zestawy danych FromEDDTable.
    * axisValuesStartStrideStop -- pozwala określić sekwencję regularnie rozmieszczonych wartości poprzez podanie wartości startowych, krokowych i stop. Oto przykład, który jest równoważny z powyższym przykładem axisValues:
        &lt;att name = "axisValuesStartStrideStop" [type = "doubleList"](#attributetype) &gt; 2, 0, 5, 4&lt;/ att &gt;
Ponownie zapamiętaj użycie typu danych z listy. Ponadto, rodzaj listy (na przykład, podwójny) MUSI dopasować dane Rodzaj zmiennej w tabeli EDDTable oraz EDDGrid Zestawy danych FromEDDTable.
         
    
Aktualizacje... Tak jak nie ma sposobu na EDDGrid FromEDDTable do określenia wartości osiowych z tabeli EDDTable początkowo, nie ma również wiarygodnego sposobu na EDDGrid Tabela FromEDDTable w celu określenia z tabeli EDDTable, kiedy wartości osiowe uległy zmianie (zwłaszcza, gdy istnieją nowe wartości dla zmiennej czasu) . Obecnie jedynym rozwiązaniem jest zmiana atrybutu aksvalues w datasets.xml i przeładować zestaw danych. Na przykład, można napisać skrypt do
    
    1. Szukaj datasets.xml zamiast
         datasetID = " *Identyfikator danych* "
Więc pracujesz z poprawnym zbiorem danych.
    2. Szukaj datasets.xml dla następnego wystąpienia
         <sourceName>  *The VariablesSourceName*  </sourceName>   
Więc pracujesz z poprawną zmienną.
    3. Szukaj datasets.xml dla następnego wystąpienia
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
Więc znasz pozycję początkową znacznika.
    4. Szukaj datasets.xml dla następnego wystąpienia
```
        </att>  
```
więc znasz położenie końcowe wartości osi.
    5. Zastąp stary start, krok, zatrzymaj wartości nowymi wartościami.
    6. Kontakt [URL flagi](/docs/server-admin/additional-information#set-dataset-flag) dla zbioru danych, aby powiedzieć ERDDAP™ Przeładować zestaw danych.
    
To nie jest idealne, ale działa.
     
* precyzja -- Kiedy EDDGrid FromEDDTable odpowiada na żądanie użytkownika o dane, przenosi wiersz danych z tabeli odpowiedzi EDDTable do EDDGrid sieć reakcji. Aby to zrobić, musi się dowiedzieć, czy wartości "osi" w danym wierszu tabeli odpowiadają pewnej kombinacji wartości osi w siatce. Dla typów danych całkowitych łatwo jest określić, czy dwie wartości są równe. Ale dla pływaków i sobowtórów, pojawia się okropny problem płynących liczb punktów [nie pasuje dokładnie](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) . (na przykład 0,2 w porównaniu z 0,99 999999999996) . Do (spróbować) Zajmij się tym. EDDGrid FromTable pozwala określić atrybut precyzji dla każdego z axisVariable s, która określa całkowitą liczbę cyfr dziesiętnych, które muszą być identyczne.
    * Na przykład:&lt;att nazwa = "precyzja" typ = "int" &gt; 5&lt;/ att &gt;
    * Dla różnych typów zmiennych danych istnieją różne wartości domyślne precyzji. Domyślne wartości są zazwyczaj właściwe. Jeśli nie, musisz określić różne wartości.
    * Dla axisVariable s [czas lub czas Zmienne znaczników](#timestamp-variables) , domyślnie jest pełna precyzja (dokładna zgodność) .
    * Dla axisVariable s, które są pływakami, domyślna precyzja to 5.
    * Dla axisVariable s, które są podwójne, domyślna precyzja to 9.
    * Dla axisVariable s, które mają typy danych całkowitych, EDDGrid FromEDDTable ignoruje atrybut precyzji i zawsze używa pełnej precyzji (dokładna zgodność) .
         
    *    **Uwaga&#33;** Przy konwersowaniu kawałka danych tabelarycznych do kawałka zawiązanych danych, jeśli EDDGrid FromEDDTable nie może dopasować wartości "osi" EDDTable do jednej z oczekiwanych EDDGrid wartości osi FromEDDTable, EDDGrid FromEDDTable cicho (brak błędu) wyrzuca dane z tego wiersza tabeli. Na przykład, mogą istnieć inne dane (nie na siatce) w zestawie danych tabeli EDD. (And if stride &gt; 1, to nie jest oczywiste EDDGrid FromTable, które wartości osi są wartościami pożądanymi i które są tymi, które należy pominąć z powodu kroku.) Tak więc, jeśli wartości precyzji są zbyt wysokie, użytkownik zobaczy brakujące wartości w odpowiedzi na dane, gdy prawidłowe wartości danych rzeczywiście istnieją.
        
Odwrotnie, jeśli wartości precyzji są ustawione zbyt nisko, wartości "osi" EDDTable, które nie powinny pasować EDDGrid Wartości osi FromEDDTable będą (mylnie) Pasuje.
        
Te potencjalne problemy są okropne, ponieważ użytkownik otrzymuje złe dane (lub brakujące wartości) kiedy powinni uzyskać właściwe dane (lub przynajmniej komunikat błędu) .
To nie jest wada w EDDGrid FromTable. EDDGrid FromTable nie może rozwiązać tego problemu. Problem jest nieodłącznie związany z przekształcaniem danych tabelarycznych w dane zaprogramowane (Chyba, że można przyjąć inne założenia, ale nie tutaj.) .
To zależy od ciebie, ERDDAP™ administrator, **Należy sprawdzić EDDGrid FromEDDTable dokładnie** zapewnienie, że wartości precyzji zostaną ustalone w celu uniknięcia tych potencjalnych problemów.
        
#### gapThreshold{#gapthreshold} 
*    [gapThreshold](#gapthreshold) -- To bardzo niezwykły typ zbioru danych. Ponieważ rodzaje zapytań, które mogą być wykonane do (przez) do EDDGrid zbiór danych (związane z przedziałami i krokami axisVariable s) są bardzo różne od rodzajów zapytań, które mogą być wykonane (przez) zbiór danych EDDTable (tylko związane z zakresami niektórych zmiennych) , wykonanie EDDGrid Zestawy danych FromEDDTable będą się znacznie różnić w zależności od dokładnego wniosku, który jest składany i prędkości podstawowego zbioru danych EDDTable. Dla wniosków, które mają wartość krokową &gt; 1, EDDGrid Tabela FromEDDTable może zwrócić się do bazowego tabeli EDDTable o stosunkowo dużą ilość danych (jakby krok = 1) a następnie przesiewać wyniki, zachowując dane z niektórych wierszy i wyrzucając dane z innych. Jeśli ma przesiać wiele danych, aby uzyskać dane, których potrzebuje, żądanie zajmie dłużej.
    
Jeśli EDDGrid FromEDDTable może powiedzieć, że będą duże luki (z wierszami niechcianych danych) pomiędzy wierszami z żądanymi danymi, EDDGrid FromEDDTable może zdecydować się na złożenie kilku podwniosków do bazowego tabeli EDDTable zamiast jednego dużego żądania, pomijając tym samym niechciane rzędy danych w dużych lukach. Wrażliwość tej decyzji jest kontrolowana przez wartość gapThreshold określoną w&lt;gapThreshold &gt; tag (domyślny = 1000 wierszy danych źródłowych) . Ustawienie gapThreshold na mniejszą liczbę doprowadzi do tworzenia zbioru danych (ogólnie) więcej podwniosków. Ustawienie gapThreshold na większą liczbę doprowadzi do tworzenia zbioru danych (ogólnie) mniej podwniosków.
    
Jeśli gapThreshold jest zbyt mały, EDDGrid FromEDDTable będzie działać wolniej, ponieważ nagłówek wielu wniosków będzie większy niż czas zaoszczędzony przez uzyskanie pewnych nadmiaru danych. Jeśli gapThreshold jest zbyt duży, EDDGrid FromEDDTable będzie działać wolniej, ponieważ tak wiele nadmiaru danych zostanie pobranych z tabeli EDDTable, tylko do odrzucenia. (Jak odkrył Goldilocks, środek jest "w prawo".) Nagłówek dla różnych typów zbiorów danych EDDTable różni się znacznie, więc jedynym sposobem, aby poznać rzeczywiste najlepsze ustawienia dla zbioru danych jest poprzez eksperymenty. Ale nie posuniesz się za daleko, trzymając się domyślnego.
    
Prosty przykład to: EDDGrid FromTable z tylko jednym axisVariable   (czas, o wielkości 100000) , jeden dataVariable   (temperatura) , i domyślny gapThreshold 1000.
    
    * Jeżeli użytkownik żąda temperatury \\[ 0 & # 58; 100 & # 58; 5000 \\] , krok jest 100 więc rozmiar luki jest 99, co jest mniejsze niż gapThreshold. Więc... EDDGrid FromTable złoży tylko jeden wniosek do EDDTable dotyczący wszystkich danych potrzebnych do złożenia wniosku (co odpowiada temperaturze \\[ 0: 5000 \\] ) i wyrzucić wszystkie rzędy danych, których nie potrzebuje.
    * Jeżeli użytkownik żąda temperatury \\[ 0: 2500: 5000 \\] , ten krok jest 2500 więc wielkość luki jest 2499, co jest większe niż gapThreshold. Więc... EDDGrid FromTable będzie składać oddzielne wnioski do tabeli EDDTable, które są równoważne z temperaturą \\[ 0 \\] , temperatura \\[ 2500 \\] , temperatura \\[ 5000 \\] .
    
Obliczanie wielkości luki jest bardziej skomplikowane, gdy jest wiele osi.
    
Na każde życzenie użytkownika, EDDGrid FromEDDTable drukuje wiadomości diagnostyczne związane z tym w [log.txt](/docs/server-admin/additional-information#log) plik.
    
    * Jeśli [&lt;logLevel &gt;] (# loglevel) w datasets.xml jest ustawiony na info, to drukuje wiadomość jak
\\ * nOuterAxes = 1 z 4 nOuterRequests = 22
Jeżeli nOuterAxes = 0, gapThreshold nie został przekroczony i tylko jeden wniosek zostanie złożony do EDDTable.
Jeżeli nOuterAxes &gt; 0, gapThreshold został przekroczony i nOuterRequestions zostanie złożony do tabeli EDDTable, co odpowiada każdej wymaganej kombinacji najbardziej lewego nOuterAxes. Na przykład, jeśli zbiór danych ma 4 axisVariable s oraz dataVariable s like Eastward \\[ czas \\]  \\[ szerokość geograficzna \\]  \\[ długość geograficzna \\]  \\[ głębokość \\] , the left most (pierwszy) zmienna osi to czas.
    * Jeśli&lt;logLevel &gt; w datasets.xml jest ustawiony na wszystkie, dodatkowe informacje są zapisywane do pliku log.txt.
         
####  EDDGrid szkielet FromEDDTable XML{#eddgridfromeddtable-skeleton-xml} 
 >&nbsp;&lt;dataset type="EDDGridFromEDDTable" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromEDDTable, this only works if the underlying EDDTable  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;supports updateEveryNMillis. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;gapThreshold>](#gapthreshold)...&lt;/gapThreshold> &lt;!-- 0 or 1. The default is 1000. >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The underlying source EDDTable dataset. -->  
 >&nbsp;&lt;/dataset>  

### EDD * Z ERDDAP  {#eddfromerddap} 
 ** EDDGrid FromErddap** Uchwyty uchwytów danych ze zdalnego ERDDAP™ serwer.
 **EDDTableFromErddap** obsługuje dane tabelaryczne ze zdalnego ERDDAP™ serwer.

*    EDDGrid FromErddap i EDDTableFromErddap zachowują się inaczej niż wszystkie inne rodzaje zbiorów danych w ERDDAP .
    * Podobnie jak inne rodzaje zbiorów danych, zbiory te otrzymują informacje o zbiorze danych ze źródła i przechowują je w pamięci.
    * Podobnie jak inne rodzaje zbiorów danych, kiedy ERDDAP™ wyszukiwanie zbiorów danych, wyświetlanie formularza dostępu do danych ( * datasetID * .html) lub wyświetla formularz Make A Graph ( * datasetID * .graph) , ERDDAP™ wykorzystuje informacje o zbiorze danych, który jest w pamięci.
    *    EDDGrid FromErddap i EDDTable FromErddap są podstawą dla [sieci / klastry / federacje](/docs/server-admin/scaling) z ERDDAP s, które skutecznie dystrybuują wykorzystanie procesora (głównie do tworzenia map) , wykorzystanie pamięci, przechowywanie danych i wykorzystanie przepustowości dużego centrum danych.
#### Przekierować{#redirect} 
* W przeciwieństwie do innych typów zbiorów danych, kiedy ERDDAP™ otrzymuje wniosek o dane lub obrazy z tych zbiorów danych, ERDDAP   [przekierowanie](https://en.wikipedia.org/wiki/URL_redirection) wniosek do pilota ERDDAP™ serwer. Wynik jest następujący:
    * To bardzo skuteczne. (CPU, pamięć i szerokość pasma) , ponieważ inaczej
        1. Składnik ERDDAP™ musi wysłać wniosek do innego ERDDAP™   (który wymaga czasu) .
        2. Drugi ERDDAP™ musi uzyskać dane, przeformatować je i przesłać dane do kompozytu ERDDAP .
        3. Składnik ERDDAP™ musi otrzymać dane (z wykorzystaniem przepustowości) , przeformatować go (przy użyciu procesora i pamięci) oraz przekazują dane użytkownikowi (z wykorzystaniem przepustowości) . Przekierowując wniosek i zezwalając drugiemu ERDDAP™ wysłać odpowiedź bezpośrednio do użytkownika, kompozyt ERDDAP™ zasadniczo nie wydaje czasu procesora, pamięci lub przepustowości na żądanie.
    * Przekierowanie jest przejrzyste dla użytkownika niezależnie od oprogramowania klienta (przeglądarka lub inne oprogramowanie lub narzędzie linii poleceń) .
*    [Możesz powiedzieć ERDDAP™ ](#redirect) nie przekierować żadnych żądań użytkownika przez ustawienie&lt;przekierowanie &gt; false&lt;/ przekierowanie &gt;, ale to neguje większość zalet... (w szczególności, rozproszenie ładunku na przednim końcu ERDDAP™ do pilota / oparcia ERDDAP ) .
         
     
#### Subskrypcje{#subscriptions} 
Zazwyczaj, gdy EDDGrid FromErddap i EDDTable FromErddap (do) załadowany na Twój ERDDAP , próbują dodać subskrypcję do zdalnego zbioru danych za pośrednictwem zdalnego ERDDAP system subskrypcji poczty elektronicznej / URL. W ten sposób, kiedy zdalny zbiór danych się zmienia, zdalny ERDDAP™ kontakt [setDataset URL flagi](/docs/server-admin/additional-information#set-dataset-flag) w sprawie ERDDAP™ tak, że lokalny zestaw danych jest przeładowany ASAP i tak, że lokalny zestaw danych jest zawsze idealnie up- to- date i naśladuje zdalny zestaw danych. Za pierwszym razem powinieneś dostać e-mail z prośbą o potwierdzenie subskrypcji. Jednak, jeśli lokalne ERDDAP™ nie można wysłać e-maila lub jeśli pilot ERDDAP e-mail / URL system subskrypcji nie jest aktywny, należy wysłać e-mail do pilota ERDDAP™ administrator i poprosić, aby s / he ręcznie dodać [&lt;onChange &gt;] (# onchange) ...&lt;/ onChange &gt; tags do wszystkich odpowiednich zbiorów danych do wywołania zestawu danych [setDataset URL flagi](/docs/server-admin/additional-information#set-dataset-flag) . Patrz ERDDAP™ raport dzienny dla listy setDataset Flaga URL, ale po prostu wysłać te dla EDDGrid Zestawy danych FromErddap i EDDTableFromErddap na pilota ERDDAP™ administrator.
    
Czy to nie działa? Czy lokalne zbiory danych nie są synchronizowane ze zdalnymi zbiorami danych?
Kilka rzeczy musi działać prawidłowo, aby system ten działał tak, aby zbiory danych pozostawały aktualne. Sprawdź każdą z tych rzeczy w kolejności:
    
    1. Twój ERDDAP™ musi być w stanie wysyłać e-maile. Zobacz ustawienia email w ustawieniach setup.xml.
    2. Ogólnie (ale nie zawsze) - ERDDAP jest&lt;BaseUrl &gt; oraz&lt;baseHttpsUrl &gt; nie może mieć numeru portu (np.: 8080,: 8443) . Jeśli tak, należy użyć [proksypass](/docs/server-admin/deploy-install#proxypass) do usunięcia portu z Url.
    3. W twoich ustawieniach xml,&lt;subscribeToRemoteErddapDataset &gt; musi być ustawiony na true.
    4. Kiedy twoja miejscowa choroba... Zestaw danych FromErddap jest przeładowany, powinien wysłać żądanie do pilota ERDDAP™ aby zapisać się do zdalnego zbioru danych. Sprawdź w log.txt, czy to się dzieje.
    5. Należy uzyskać e-mail z prośbą o potwierdzenie wniosku o subskrypcję.
    6. Musisz kliknąć na link w tej wiadomości e-mail, aby potwierdzić wniosek o subskrypcję.
    7. Pilot ERDDAP™ powinien powiedzieć, że zatwierdzenie było skuteczne. W każdej chwili możesz poprosić o e-mail z pilota ERDDAP™ z listą oczekujących i ważnych subskrypcji. Patrz formularz *RemoteErddapBase Url* / erddap / subskrypcje / list.html.
    8. Gdy zdalny zbiór danych się zmienia (np. otrzymuje dodatkowe dane) , pilot ERDDAP™ powinien spróbować skontaktować się z flagrafem ERDDAP . Nie możesz tego sprawdzić, ale możesz zapytać administratora pilota. ERDDAP™ żeby to sprawdzić.
    9. Twój ERDDAP™ powinien otrzymać prośbę o ustawienie tego flagURL. Sprawdź w log.txt dla "setDatasetFlag.txt?" wniosek (s) i sprawdzić, czy istnieje komunikat błędu związany z żądaniami.
    10. Twój ERDDAP™ powinien następnie spróbować ponownie załadować ten zestaw danych (może nie natychmiast, ale jak najszybciej) .
         
#### Up- to- date max (czas) ?{#up-to-date-maxtime} 
 EDDGrid / Zestawy danych TableFromErddap zmieniają przechowywane informacje o każdym zbiorze danych źródłowych tylko wtedy, gdy zbiór danych źródłowych jest ["reload"](#reloadeverynminutes) i jakaś zmiana metadanych (np. zmienna czasu actual\\_range ) w ten sposób generuje powiadomienie o subskrypcji. Jeśli zbiór danych źródłowych zawiera dane, które często się zmieniają (na przykład, nowe dane co sekundę) i wykorzystuje ["update"](#updateeverynmillis) system do zauważenia częstych zmian w danych podstawowych, EDDGrid / TableFromErddap nie będzie informowany o tych częstych zmian do następnego zbioru danych "przeładować", więc EDDGrid / TableFromErddap nie będzie idealnie / na randce. Możesz zminimalizować ten problem zmieniając zbiór danych źródłowych&lt;przeładowanie EveryNMinutes &gt; do mniejszej wartości (60?) tak, że istnieje więcej powiadomień subskrypcji do powiadomienia EDDGrid / TableFromErddap aktualizuje informacje o zbiorze danych źródłowych.

Lub, jeśli Twój system zarządzania danymi wie, kiedy zbiór danych źródłowych posiada nowe dane (np. za pomocą skryptu kopiującego plik danych na miejsce) i jeśli to nie jest zbyt częste (np. co 5 minut lub rzadziej) Jest lepsze rozwiązanie:

1. Nie używaj&lt;updateEveryNMillis &gt;, aby utrzymać zbiór danych źródłowych na bieżąco.
2. Ustaw zbiór danych źródłowych&lt;przeładowanie EveryNMinutes &gt; do większej liczby (1440?) .
3. Niech skrypt skontaktuje się z zbiorem danych źródłowych [URL flagi](/docs/server-admin/additional-information#set-dataset-flag) zaraz po skopiowaniu nowego pliku danych.
     

Doprowadzi to do perfekcyjnego uaktualnienia zbioru danych źródłowych i spowoduje wygenerowanie powiadomienia o subskrypcji, które zostanie wysłane do EDDGrid / TableFromErddap dataset. To poprowadzi do EDDGrid / TableFromErddap dataset to be perfectly up- to- date (w ciągu 5 sekund od dodania nowych danych) . I wszystko to będzie zrobione efektywnie. (bez zbędnych przeładowań zbioru danych) .
     
#### Nie. addAttributes , axisVariable lub dataVariable  {#no-addattributes-axisvariable-or-datavariable} 
W przeciwieństwie do innych rodzajów zbiorów danych, EDDTableFromErddap i EDDGrid Zestawy danych FromErddap nie pozwalają na globalny&lt;addAttributes&gt;,&lt; axisVariable & gt; lub&lt; dataVariable & gt; sekcje datasets.xml dla tego zbioru danych. Problem polega na tym, że dopuszczenie tych substancji prowadziłoby do niespójności:
    
1. Powiedzmy, że było dozwolone i dodałeś nowy atrybut globalny.
2. Kiedy użytkownik pyta ERDDAP™ dla atrybutów globalnych pojawi się nowy atrybut.
3. Ale kiedy użytkownik pyta ERDDAP™ dla pliku danych, ERDDAP™ przekierowuje wniosek do źródła ERDDAP . To ERDDAP™ jest nieświadomy nowego atrybutu. Więc jeśli tworzy plik danych z metadanych, np. a .nc plik, metadane nie będą miały nowego atrybutu.

Są dwie grupy robocze:

1. Przekonaj administratora źródła ERDDAP™ aby dokonać zmian, które chcesz do metadanych.
2. Zamiast EDDTableFromErddap należy użyć [EDDTableFromDapSequence](#eddtablefromdapsequence) . Albo zamiast EDDGrid FromErddap, use [ EDDGrid FromDap](#eddgridfromdap) . Te typy EDD pozwalają na skuteczne podłączenie do zbioru danych na pilocie ERDDAP™   (ale bez przekierowania wniosków o dane) i pozwalają na włączenie globalny&lt;addAttributes&gt;,&lt; axisVariable & gt; lub&lt; dataVariable & gt; sekcje datasets.xml . Inna różnica: będziesz musiał ręcznie subskrybować zdalny zestaw danych, tak aby zestaw danych na Twoim ERDDAP™ zostanie powiadomiony (przez [URL flagi](/docs/server-admin/additional-information#set-dataset-flag) ) gdy są zmiany w zdalnym zbiorze danych. W ten sposób tworzysz nowy zestaw danych, zamiast łączyć się ze zdalnym zbiorem danych.
         
#### Pozostałe uwagi{#other-notes} 
* Ze względów bezpieczeństwa, EDDGrid FromErddap i EDDTable FromErddap nie wspiera [&lt;accessibleTo &gt;] (# accessibleto) tag i nie mogą być używane z zdalnych zbiorów danych, które wymagają logowania (ponieważ używają [&lt;accessibleTo &gt;] (# accessibleto) ).. Patrz ERDDAP jest [system bezpieczeństwa](/docs/server-admin/additional-information#security) za ograniczenie dostępu do niektórych zbiorów danych do niektórych użytkowników.
     
* Począwszy od ERDDAP™ v2.10, EDDGrid FromErddap i EDDTableFromErddap wspierają [&lt;accessibleViaFiles &gt;] (# accessibleviafiles) tag. W przeciwieństwie do innych typów zbiorów danych, domyślny jest true, ale pliki zbioru danych będą accessibleViaFiles tylko wtedy, gdy zbiór danych źródłowych ma&lt;accessibleViaFiles &gt; ustawione na true.
     
* Można użyć [GenerateDatasets Program Xml](#generatedatasetsxml) do datasets.xml kawałek dla tego typu zbioru danych. Ale można zrobić te rodzaje zbiorów danych łatwo ręcznie.
     
####  EDDGrid szkielet FromErddap XML{#eddgridfromerddap-skeleton-xml} 
*    EDDGrid szkielet FromErddap Zestaw danych XML jest bardzo prosty, ponieważ celem jest tylko naśladowanie zdalnego zestawu danych, który jest już odpowiedni do stosowania w ERDDAP :
 >&nbsp;&nbsp;&lt;dataset type="EDDGridFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)...&lt;/accessibleViaFiles> &lt;!-- 0 or 1, default=true. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromErddap, this gets the remote .dds and then gets  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the new leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
 >&nbsp;&nbsp;&lt;/dataset>  

#### szkielet EDDTableFromErddap XML{#eddtablefromerddap-skeleton-xml} 
* Szkielet XML dla zbioru danych EDDTableFromErddap jest bardzo prosty, ponieważ celem jest tylko naśladowanie zdalnego zbioru danych, który jest już odpowiedni do użycia w ERDDAP :
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid FromEtopo{#eddgridfrometopo} 
 [ ** EDDGrid FromEtopo** ](#eddgridfrometopo) tylko służy [ETOPO1 Global 1- Minute Gridded Elevation Data Set](https://www.ngdc.noaa.gov/mgg/global/global.html)   (Ice Surface, grid registered, binary, 2byte int: etopo1\\ _ ice\\ _ g\\ _ i2 .zip ) które są dystrybuowane z ERDDAP .

* Tylko dwa datasetID s są obsługiwane dla EDDGrid FromEtopo, aby uzyskać dostęp do danych o wartościach długości od -180 do 180, lub o wartościach długości od 0 do 360.
* Nigdy nie ma żadnych podznaczników, ponieważ dane są już opisane w ERDDAP .
* Więc dwie opcje dla EDDGrid Zestawy danych FromEtopo są (dosłownie) :
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

###  EDDGrid Pliki FromFiles{#eddgridfromfiles} 
 [ ** EDDGrid Pliki FromFiles** ](#eddgridfromfiles) jest superklasą wszystkich EDDGrid Z zajęć z archiwum. Nie możesz użyć EDDGrid FromFiles bezpośrednio. Zamiast tego, użyj podklasy EDDGrid FromFiles do obsługi określonego typu pliku:

*    [ EDDGrid Pliki FromMergeIRFiles](#eddgridfrommergeirfiles) Obsługuje dane z uchwytów [MergeIR .gz ](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README) pliki.
*    [ EDDGrid Pliki FromAudioFiles](#eddfromaudiofiles) agregaty danych z grupy lokalnych plików audio.
*    [ EDDGrid Pliki FromNc@@](#eddgridfromncfiles) Obsługuje dane z uchwytów [GRIB .grb](https://en.wikipedia.org/wiki/GRIB) pliki, [ HDF   (v4 lub v5)   .hdf ](https://www.hdfgroup.org/) pliki, [ .nc ml](#ncml-files) pliki oraz [ NetCDF   (v3 lub v4)   .nc ](https://www.unidata.ucar.edu/software/netcdf/) pliki. Może to działać z innymi typami plików (na przykład, BUFR) Po prostu go nie przetestowaliśmy. Proszę wysłać nam kilka przykładowych plików, jeśli jesteście zainteresowani.
*    [ EDDGrid FromNcFilesUnpacked](#eddgridfromncfilesunpacked) jest wariantem EDDGrid Pliki FromNc@@ NetCDF   (v3 lub v4)   .nc oraz powiązane pliki, które ERDDAP™ rozpakowywanie na niskim poziomie.

Obecnie nie są obsługiwane żadne inne typy plików. Ale zazwyczaj stosunkowo łatwo jest dodać wsparcie dla innych typów plików. Skontaktuj się z nami, jeśli masz prośbę. Lub, jeśli Twoje dane są w starym formacie pliku, od którego chciałbyś się odsunąć, zalecamy konwersję plików do NetCDF v3 .nc pliki. NetCDF jest szeroko wspieranym, formacie binarnym, umożliwia szybki losowy dostęp do danych i jest już obsługiwany przez ERDDAP .

#### Z danych plików{#from-files-details} 
Poniższe informacje dotyczą wszystkich podklas EDDGrid FromFiles.

##### Agregacja istniejącego wymiaru{#aggregation-of-an-existing-dimension} 
Wszystkie zmiany EDDGrid FromFiles może agregować dane z plików lokalnych, gdzie każdy plik ma 1 (lub więcej) różne wartości dla lewej (pierwszy) wymiar, zazwyczaj \\[ czas \\] , które zostaną zagregowane. Na przykład, wymiary mogą być \\[ czas \\]  \\[ wysokość \\]  \\[ szerokość geograficzna \\]  \\[ długość geograficzna \\] , i pliki mogą mieć dane dla jednego (lub kilka) wartość czasu (s) w pliku. Wynikający z tego zbiór danych pojawia się tak, jakby wszystkie dane pliku zostały połączone. Wielkimi zaletami agregacji są:

* Rozmiar zagregowanego zbioru danych może być znacznie większy niż pojedynczy plik może być wygodny (- 2GB) .
* Dla danych bliskiego-real- time, łatwo jest dodać nowy plik z najnowszym kawałkiem danych. Nie musisz zmieniać całego zbioru danych.

Wymogi dotyczące agregacji są następujące:
* Lokalne pliki nie muszą mieć tego samego. dataVariable s (zgodnie z definicją w zbiorze danych datasets.xml ) . Zestaw danych będzie miał dataVariable s datasets.xml . Jeśli dany plik nie ma podanego pliku dataVariable , ERDDAP™ w razie potrzeby doda brakujące wartości.
* Wszystkie dataVariable MUSI używać tego samego axisVariable s / wymiary (zgodnie z definicją w zbiorze danych datasets.xml ) . Pliki zostaną zagregowane w oparciu o pierwsze (left-most) wymiar, sortowany w kolejności rosnącej.
* Każdy plik MOŻE posiadać dane dla jednej lub więcej wartości pierwszego wymiaru, ale nie może być żadnego pokrywania się pomiędzy plikami. Jeżeli plik ma więcej niż jedną wartość dla pierwszego wymiaru, wartości MUSI być sortowane w kolejności rosnącej, bez powiązań.
* Wszystkie pliki MUSI mieć dokładnie te same wartości dla wszystkich innych wymiarów. Precyzja badania jest określona przez [matchAxisNDigits](#matchaxisndigits) .
* Wszystkie pliki MUSI mieć dokładnie to samo [jednostki](#units) metadane dla wszystkich axisVariable s oraz dataVariable b. Jeśli jest to problem, może być w stanie użyć [NcML](#ncml-files) lub [ NCO ](#netcdf-operators-nco) by rozwiązać problem.
         
##### Agregacja poprzez nazwy plików lub globalne metadane{#aggregation-via-file-names-or-global-metadata} 
Wszystkie zmiany EDDGrid FromFiles może również agregować grupę plików dodając nowy lewy (pierwszy) wymiar, zazwyczaj czas, w oparciu o wartość uzyskaną z każdej nazwy pliku lub z wartości atrybutu globalnego, który znajduje się w każdym pliku. Na przykład nazwa pliku może zawierać wartość czasu dla danych w pliku. ERDDAP™ stworzy nowy wymiar czasu.

W przeciwieństwie do podobnej funkcji w THREDDS, ERDDAP™ zawsze tworzy axisVariable z wartościami liczbowymi (zgodnie z wymogami CF) , nigdy wartości String (które nie są dozwolone przez CF) . Poza tym, ERDDAP™ sortuje pliki w agregacji na podstawie liczby axisVariable wartość przypisana do każdego pliku, tak aby zmienna osi zawsze miała sortowane wartości zgodnie z wymaganiami CF. Podejście THREDDS polegające na tworzeniu typu leksykograficznego w oparciu o nazwy plików prowadzi do agregacji, gdzie wartości osi nie są sortowane (która nie jest dozwolona przez CF) gdy nazwy plików sortują się inaczej niż nazwy axisVariable wartości.

Aby utworzyć jedną z tych agregacji w ERDDAP™ , będzie zdefiniować nowy left most (pierwszy)   [ axisVariable ](#axisvariable) ze specjalnym, pseudo&lt; sourceName &gt;, co mówi ERDDAP™ gdzie i jak znaleźć wartość dla nowego wymiaru z każdego pliku.

* Format pseudo sourceName który otrzymuje wartość z nazwy pliku (tylko filename.ext) en
    \\*\\*\\ *nazwa pliku,*  [dane Rodzaj](#data-types)  *,* extractRegex *,* captureGroupNumber
* Format pseudo sourceName która otrzymuje wartość z bezwzględnej nazwy ścieżki pliku
    \\*\\*\\ *pathName,*  [dane Rodzaj](#data-types)  *,* extractRegex *,* captureGroupNumber
     \\[ W tym celu nazwa ścieżki zawsze używa '/' jako znak separatora katalogu, nigdy '\\'. \\] 
* Format pseudo sourceName który otrzymuje wartość z atrybutu globalnego jest
    \\*\\*\\ *globalny:* atrybut Nazwa *,*  [dane Rodzaj](#data-types)  *,* extractRegex *,* captureGroupNumber
* Ten pseudo sourceName opcja działa inaczej niż pozostałe: zamiast tworzenia nowej lewej (pierwszy)   axisVariable , to zastępuje wartość bieżącego axisVariable o wartości pobranej z nazwy pliku (tylko filename.ext) . Format
    \\*\\*\\ *zastąpić FromFileName,*  [dane Rodzaj](#data-types)  *,* extractRegex *,* captureGroupNumber
     

Opisy części, które musisz dostarczyć są następujące:

*    *atrybut Nazwa* -- nazwa atrybutu globalnego, który jest w każdym pliku i który zawiera wartość wymiarów.
*    *dane Rodzaj* -- Określa typ danych, który będzie używany do przechowywania wartości. Patrz standardowa lista [dane Rodzaje](#data-types) że ERDDAP™ obsługuje, z wyjątkiem tego, że String nie jest tutaj dozwolone, ponieważ zmienne osi w ERDDAP™ nie mogą być zmiennymi String.
    
Istnieje dodatkowy pseudo dataType, timeFormat = *ciąg Format czasu* , który mówi ERDDAP™ że wartością jest znacznik czasu String [jednostki odpowiednie do czasów strun](#string-time-units) . W większości przypadków, stringTimeFormat, którego potrzebujesz będzie zmiennością jednego z tych formatów:
    
    *    yyyy-MM-dd NIC 'HH: mm: ss.SSZ -- które ISO 8601: 2004 (E) format daty. Może być potrzebna skrócona wersja, np.: yyyy-MM-dd NIE 'HH: mm: ss lub yyyy-MM-dd .
    * yyyMddHHmms.SSS - co jest zwarta wersja formatu daty ISO 8601. Może być potrzebna skrócona wersja tego, np. yyyyMddHHmmss lub yyyyMMdd.
    * M / d / rrrr H: mm: ss.SSS -- czyli format daty cięcia w USA. Może być potrzebna skrócona wersja, np. M / d / rrrr.
    * yyyyDDHHmmssSSS -- który jest rokiem plus zero- wyściełanym dniem roku (np., 001 = 1 stycznia, 365 = 31 grudnia w roku bez skoku; jest to czasami błędnie nazywane datą Juliana) . Możesz potrzebować skróconej wersji tego, np. yyyydDD.
    
Jeśli używasz tego pseudo dataType, dodaj to do nowej zmiennej&lt; addAttributes &gt;:
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Jeśli chcesz przesunąć wszystkie wartości czasu, przesuń wartość czasu w jednostkach, np.,
1970- 01- 01T12: 00: 00Z.
*    *extractRegex* -- To jest... [wyrażenie regularne](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) która obejmuje grupę przechwytującą (w nawiasach) który opisuje sposób wyodrębnienia wartości z nazwy pliku lub globalnej wartości atrybutu. Na przykład, biorąc pod uwagę nazwę pliku jak S19980011998031.L3b\\ _ MO\\ _ CHL .nc , Catch group # 1 ",\\ \\dtutorial ", w wyrażeniu regularnym S (\\ \\dtutorial ) \\ \\dtutorial \\ .L3b.\\ * przechwyci pierwsze 7 cyfr po 'S': 1998001.
*    *captureGroupNumber* -- To jest numer grupy przechwytującej (w ramach pary nawiasów) w wyrażeniu regularnym zawierającym informacje o zainteresowaniu. Zazwyczaj jest to 1, pierwsza grupa przechwytująca. Czasami trzeba użyć grup przechwytywania do innych celów w regex, więc wtedy ważny numer grupy przechwytywania będzie 2 (druga grupa przechwytująca) lub 3 (trzeci) itd.

Pełny przykład axisVariable który sprawia, że zagregowany zbiór danych z nową osią czasu, który otrzymuje wartości czasu z nazwy pliku jest
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
Kiedy używasz "timeFormat =" dane pseudo Typ ERDDAP™ doda 2 atrybuty do axisVariable tak, że wydają się pochodzić ze źródła:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Więc w tym przypadku, ERDDAP™ stworzy nową oś o nazwie "time" z podwójnymi wartościami (sekund od 1970- 01-01T00: 00: 00Z) przez pobranie 7 cyfr po 'S' i przed. "L3m" w nazwie pliku i interpretowanie ich jako wartości czasowe sformatowane jako yyyydDD.

Możesz nadpisać domyślny czas bazowy (1970- 01- 01T00: 00: 00Z) przez dodanie [addAttribution](#addattributes) który określa inny atrybut jednostek o innym czasie bazowym. Powszechną sytuacją jest: istnieją grupy plików danych, każda z 1-dniowym składnikiem zbioru danych satelitarnych, gdzie chcesz, aby wartość czasowa była południe dnia wymienionego w nazwie pliku (w centrum czasu każdego dnia) i chce zmienną long\\_name by być "Centron Time". Przykładem jest:
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
        <addAttributes>
          <att name="long\\_name">Centered Time</att>
          <att name="units">seconds since 1970-01-01T12:00:00Z</att>
        </addAttributes>
      </axisVariable>
```
Uwaga godziny = 12 w czasie bazowym, co dodaje 12 godzin w stosunku do pierwotnego czasu bazowego 1970- 01-01T00: 00: 00Z.

Pełny przykład axisVariable który tworzy zagregowany zbiór danych z nową osią "run" (z wartościami końcowymi) który otrzymuje wartości run z atrybutu "runid" w każdym pliku (z wartościami takimi jak "r17\\ _ global", gdzie 17 jest liczbą uruchomioną) en
```
      <axisVariable> 
        <sourceName>\\*\\*\\*global:runID,int,(r|s)(\\d+)\\_global,2</sourceName>
        <destinationName>run</destinationName>
        <addAttributes>
          <att name="ioos\\_category">Other</att>
          <att name="units">count</att>
        </addAttributes>
      </axisVariable>
```
Należy zwrócić uwagę na użycie grupy przechwytywania nr 2 do wychwytywania cyfr, które występują po 'r' lub 's', a przed '\\ _ global'. Ten przykład pokazuje również jak dodać dodatkowe atrybuty (np., ioos\\_category i jednostki) do zmiennej osi.
     
#### Zewnętrznie skompresowane pliki{#externally-compressed-files} 
* Zestawy danych, które są podzbiorami EDDGrid Pliki FromFiles i EDDTable FromFiles może obsługiwać dane bezpośrednio z zewnętrznych plików danych skompresowanych, w tym .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 i pliki .Z.
     
*    **To działa zaskakująco dobrze&#33;**   
W większości przypadków spowolnienie związane z dekompresją małych i średnich plików danych jest niewielkie. Jeśli potrzebujesz zachować przestrzeń dyskową, zdecydowanie zachęcamy do korzystania z tej funkcji, szczególnie w przypadku starszych plików, które są rzadko dostępne.
     
*    **Oszczędzaj pieniądze&#33;**   
Jest to jedna z niewielu funkcji w ERDDAP™ które daje szansę zaoszczędzić dużo pieniędzy (chociaż kosztem nieznacznie zmniejszonych wyników) . Jeżeli współczynnik kompresji jest np. 6: 1 (Czasami będzie dużo wyżej.) , wtedy pliki danych zbioru danych będą potrzebować tylko 1 / 6 miejsca na dysku. Wtedy być może uda Ci się z 1 RAID (o danym rozmiarze) zamiast 6 RAID (o tej samej wielkości) . To ogromne oszczędności. Miejmy nadzieję, że zdolność do kompresji niektórych plików w kolekcji (Starszych?) I nie ściskaj innych (Nowsze?) i żeby to zmienić w każdej chwili, zminimalizujmy minusy kompresji niektórych plików (wolniejszy dostęp) . A jeśli wybór jest między przechowywaniem plików na taśmie (i dostępne tylko na żądanie, po opóźnieniu) vs przechowywanie ich skompresowanych na RAID (i dostępne za pośrednictwem ERDDAP ) , następnie istnieje ogromna zaleta w użyciu kompresji tak, że użytkownicy stają się interaktywni i (stosunkowo) szybki dostęp do danych. A jeśli to może zapisać od zakupu dodatkowego RAID, ta funkcja może zaoszczędzić około 30,000 dolarów.
     
* Dla wszystkich EDDGrid Podklasy plików FromFiles, jeśli pliki danych mają rozszerzenie wskazujące, że są one zewnętrznie skompresowane (obecnie: .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 lub .Z) , ERDDAP™ zdekompresuje pliki do katalogu pamięci podręcznej zbioru danych, gdy je przeczyta (jeśli nie są już w schowku) . To samo dotyczy pliku binarnego (np., .nc ) podklasy plików EDDTableFromFiles.
     
* Dla podklas plików EDDTableFromFiles dla plików niebinarnych (np. .csv) , pliki danych z rozszerzeniem wskazującym, że są one zewnętrznie skompresowane pliki będą dekompresowane na -the- fly jak plik jest odczytywany.
     
* WYMAGANIE: Jeżeli typ pliku skompresowanego zewnętrznie (np., .tgz lub .zip ) obsługuje więcej niż 1 plik wewnątrz pliku skompresowanego, plik skompresowany musi zawierać tylko 1 plik.
     
* WYMAGANIE: Funkcja ta zakłada, że zawartość plików skompresowanych zewnętrznie nie zmienia się, tak aby można było ponownie użyć pliku zdekompresowanego. Jeśli niektóre lub wszystkie pliki danych są czasami zmieniane, nie kompresujcie tych plików. Jest to zgodne z powszechnym używaniem, ponieważ ludzie zwykle nie kompresują plików, które czasami potrzebują zmienić.
     
*   &lt;fileNameRegex &gt; Aby to zadziałało, zestaw danych&lt;fileNameRegex &gt; musi pasować do nazw skompresowanych plików. Oczywiście, regexes like.\\*będzie pasować do wszystkich nazw plików. Jeśli podasz określony typ pliku, np..\\*\\ .nc , następnie trzeba zmodyfikować regex, aby uwzględnić również rozszerzenie kompresji, np..\\ *\\ .nc \\ .gz (jeśli wszystkie pliki będą* coś .nc  .gz plików).
     
* Jest w porządku, jeśli zestaw danych zawiera mieszankę skompresowanych i nie skompresowanych plików. Może to być przydatne, jeśli uważasz, że niektóre pliki (np. starsze pliki) będzie stosowany rzadziej i dlatego byłoby przydatne, aby zapisać przestrzeń dyskową przez kompresję. Aby to zadziałało,&lt;fileNameRegex &gt; musi pasować do nazw plików skompresowanych, a nie skompresowanych.\\*lub.\\*\\ .nc  ( | \\ .gz ) (jeżeli grupa przechwytująca na końcu tej listy określa, że .gz jest opcjonalne.
     
* Jest w porządku, jeśli kompresji lub dekompresji konkretnych plików w kolekcji w dowolnym czasie.
Jeśli zestaw danych nie jest używany [&lt;updateEveryNMillis &gt;] (# updateeverynmillis) , ustawić zestaw danych [bandera](/docs/server-admin/additional-information#flag) powiedzieć ERDDAP™ aby ponownie załadować zestaw danych i tym samym zauważyć zmiany. Co ciekawe, można użyć różnych algorytmów kompresji i ustawień dla różnych plików w tym samym zbiorze danych (np., .bz2 dla rzadko używanych plików, .gz dla nieczęsto używanych plików, a nie kompresji dla często używanych plików) , po prostu upewnij się, że regex obsługuje wszystkie rozszerzenia plików, które są w użyciu, np..\\ *\\ .nc  ( | \\ .gz  | \\ .bz2 ) .
     
* Oczywiście współczynniki kompresji i prędkości dla różnych algorytmów kompresji różnią się w zależności od pliku źródłowego i ustawień (np. poziom kompresji) . Jeśli chcesz zoptymalizować ten system dla swoich plików, zrób test różnych metod kompresji z plikami i z szeregiem ustawień kompresji. Jeśli chcesz niezawodnie dobry (niekoniecznie najlepsze) konfiguracja, będziemy nieco polecić gzip   ( .gz ) . gzip nie tworzy najmniejszego skompresowanego pliku (Jest dość blisko.) , ale kompresuje plik bardzo szybko i (do ERDDAP™ użytkownicy) dekompresuje plik bardzo szybko. Plus, gzip oprogramowanie jest standardowe z każdą instalacją Linux i Mac OS i jest łatwo dostępne dla Windows za pomocą darmowych narzędzi, takich jak 7Zip i Linux add- on jak Git Bash. Na przykład, kompresji pliku źródłowego do .gz wersja pliku (ta sama nazwa pliku, ale z .gz załączone) , (w Linux, Mac OS i Git Bash)   
     gzip   * sourceName *   
Aby zdekompresować .gz plik do oryginału, użyj
gunzip * sourceName  .gz *   
Aby skompresować każdy z plików źródłowych w katalogu i jego podkatalogach, rekursywnie, użyj
     gzip - *directorName*   
Do dekompresji każdego z .gz pliki w katalogu i jego podkatalogach, rekursywnie, używać
gunzip -r *directorName*   
     
* OSTRZEŻENIE: Nie kompresować zewnętrznie ( gzip ) pliki, które są już wewnętrznie skompresowane&#33;
Wiele plików posiada już wewnętrznie skompresowane dane. Jeśli gzip te pliki, wynikające z nich pliki nie będą znacznie mniejsze (&lt;5%) oraz ERDDAP™ będzie tracić czas na ich dekompresję, kiedy trzeba je przeczytać. Na przykład:
    
    * pliki danych: np. .nc 4, oraz .hdf 5 plików: Niektóre pliki używają wewnętrznej kompresji, inne nie. Jak powiedzieć: skompresowane zmienne mają atrybuty "\\ _ ChunkSize". Również, jeśli grupa zawiązanych .nc lub .hdf pliki są różnej wielkości, prawdopodobnie są wewnętrznie skompresowane. Jeśli wszystkie są tego samego rozmiaru, nie są one wewnętrznie skompresowane.
    * pliki obrazkowe: np., .gif, .jpg i .png
    * pliki audio: np., .mp3 i .ogg.
    * pliki wideo: np. .mp4, .ogv i .webm.
    
        
Jeden niefortunny przypadek: pliki audio .wav są ogromne i nie wewnętrznie skompresowane. Byłoby miło, gdyby kompres ( gzip ) im, ale generalnie nie powinieneś, bo jeśli to zrobisz, użytkownicy nie będą mogli odtwarzać skompresowanych plików w swojej przeglądarce.
     
* Przypadek badania: kompresja (z gzip ) zestaw danych z uchwytem 1523 .nc pliki.
    
    * Dane w plikach źródłowych były słabe. (wiele brakujących wartości) .
    * Całkowita powierzchnia dysku wzrosła z 57 GB przed kompresją do 7 GB po.
    * Wniosek o wiele danych z 1 punktu czasowego jest&lt;1 s przed i po kompresji.
    * Wniosek o 1 punkt danych dla 365 punktów czasowych (najgorsza sytuacja) od 4 s do 71 s.
         
    
Dla mnie jest to rozsądny handel dla każdego zbioru danych, a z pewnością dla zbiorów danych, które są rzadko używane.
     
* Wewnętrzne kontra zewnętrzne kompresje...
W porównaniu do wewnętrznej kompresji plików oferowanych przez .nc 4 oraz .hdf 5 plików, ERDDAP Podejście do zewnętrznych skompresowanych plików binarnych ma zalety i wady. Wadą jest: przez jeden raz odczytywany z małej części jednego pliku, kompresja wewnętrzna jest lepsza, ponieważ EDDGrid FromFiles musi tylko zdekompresować kilka części (s) pliku, nie całego pliku. Ale... ERDDAP podejście ma pewne zalety:
    
    *    ERDDAP™ obsługuje kompresję wszystkich typów plików danych (binarne i niebinarne, np., .nc 3 i .csv) nie tylko .nc 4 oraz .hdf 4.
    * Jeśli większość pliku musi być przeczytana więcej niż raz w krótkim czasie, to oszczędza czas na dekompresję pliku raz i czytanie go wiele razy. To się zdarza w ERDDAP™ gdy użytkownik używa Make- A- Graph dla zbioru danych i wprowadza serię drobnych zmian do wykresu.
    * Możliwość posiadania skompresowanych plików, a nie skompresowanych plików w tej samej kolekcji, pozwala na większą kontrolę nad tym, które pliki są kompresowane, a które nie. I ta dodana kontrola przychodzi bez modyfikacji pliku źródłowego (ponieważ można skompresować plik np., .gz i zdekompresować, aby uzyskać oryginalny plik) .
    * Możliwość zmiany w dowolnym czasie czy dany plik jest skompresowany i jak jest skompresowany (różne algorytmy i ustawienia) daje większą kontrolę nad wydajnością systemu. I można łatwo odzyskać oryginalny nieskompresowany plik w każdej chwili.
    
Chociaż żadne podejście nie jest zwycięzcą we wszystkich sytuacjach, jasne jest, że ERDDAP zdolność obsługi danych z plików skompresowanych zewnętrznie sprawia, że kompresja zewnętrzna jest rozsądną alternatywą dla wewnętrznej kompresji oferowanej przez .nc 4 oraz .hdf 5. Jest to istotne, biorąc pod uwagę, że wewnętrzna kompresja jest jednym z głównych powodów, dla których ludzie wybierają użycie .nc 4 oraz .hdf 5.
     
##### Dekompresja Cache{#decompressed-cache} 
 ERDDAP™ sprawia, że zdekompresowana wersja dowolnego skompresowanego binarnego (np., .nc ) plik danych, gdy wymaga odczytu pliku. Dekompresowane pliki są przechowywane w katalogu zbioru danych *bigParentDirectory* / dekompresja. Zdekompresowane pliki, które nie były ostatnio używane, zostaną usunięte, aby uwolnić przestrzeń, gdy łączny rozmiar pliku jest &gt; 10GB. Możesz to zmienić przez ustawienie&lt;dekompressedCacheMaxGB &gt; (domyślny = 10) w zbiorach danych Xml.xml, np.,
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
Ponadto, zdekompresowane pliki, które nie były używane w ciągu ostatnich 15 minut zostaną usunięte na początku każdego głównego przeładowania zbioru danych. Możesz to zmienić przez ustawienie&lt;dekompressedCacheMaxMinutesOld &gt; (domyślny = 15) w zbiorach danych Xml.xml, np.,
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
Większe liczby są ładne, ale skumulowany rozmiar zdekompresowanych plików może powodować *bigParentDirectory* zabraknie miejsca na dysku, co powoduje poważne problemy.
     
* Ponieważ dekompresja pliku może zająć dużo czasu (0,1 do 10 sekund) , zbiory danych ze skompresowanymi plikami mogą korzystać z ustawienia zbioru danych [&lt;nThreads &gt;] (# nthreas) ustawienie na większą liczbę (2? 3? 4?) . Minusy do jeszcze większych liczb (np. 5? 6? 7?) zmniejszają zwroty i że wniosek jednego użytkownika może następnie korzystać z wysokiego odsetka zasobów systemu, co znacznie spowalnia przetwarzanie wniosków innych użytkowników. Tak więc nie ma idealnego ustawienia nThreads, tylko różne konsekwencje w różnych sytuacjach z różnymi ustawieniami.
         
#### Wymiary sortowane{#sorted-dimension-values} 
Wartości dla każdego wymiaru MUSI być posortowane (wznoszące się lub zstępujące, z wyjątkiem pierwszego (left-most) wymiar, który musi się wznosić) . Wartości mogą być nieregularnie rozłożone. Nie może być żadnych powiązań. Jest to wymóg [Standard metadanych CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Jeśli jakiekolwiek wartości wymiarów nie są uporządkowane, zbiór danych nie zostanie załadowany i ERDDAP™ zidentyfikuje pierwszą niesortowaną wartość w pliku dziennika, *bigParentDirectory* / logs / log.txt.
    
Niesortowane wartości wymiarów prawie zawsze wskazują na problem z zbiorem danych źródłowych. Najczęściej zdarza się to, gdy niewłaściwy lub niewłaściwy plik jest włączony do agregacji, co prowadzi do niesortowanego wymiaru czasu. Aby rozwiązać ten problem, patrz komunikat błędu w ERDDAP™ plik log.txt, aby znaleźć naruszającą wartość czasu. Następnie poszukaj w plikach źródłowych, aby znaleźć odpowiedni plik (lub jeden przed lub jeden po) To nie należy do agregacji.
    
#### Katalogi{#directories} 
Pliki MOŻE być w jednym katalogu, lub w katalogu i jego podkatalogach (rekursywnie) . Jeśli istnieje duża liczba plików (na przykład, &gt; 1 000) , system operacyjny (i tym samym EDDGrid Pliki FromFiles) będzie działać znacznie efektywniej, jeśli przechowujesz pliki w serii podkatalogów (jeden na rok lub jeden na miesiąc dla zbiorów danych z bardzo częstymi plikami) tak, aby nigdy nie było dużej liczby plików w danym katalogu.
     
#### &lt;cacheFromUrl &gt;{#cachefromurl} 
Wszystkie EDDGrid Pliki FromFiles i wszystkie pliki EDDTableFromFiles obsługują zestaw tagów, które mówią ERDDAP™ do pobierania i przechowywania kopii wszystkich plików zdalnego zbioru danych lub pamięci podręcznej kilku plików (pobrane w razie potrzeby) . To może być bardzo przydatne. Patrz [cache Dokumentacja FromUrl](#cachefromurl) .
    
#### Zdalne katalogi i żądania zakresu HTTP{#remote-directories-and-http-range-requests} 
 (AKA Byte Serving, Zapytania o zakres bajtów, Akcept- Ranges http nagłówek)   
 EDDGrid Pliki FromNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles i EDDTableFromNcCFFiles, może *czasami* obsługa danych z .nc pliki na zdalnych serwerach i dostęp przez HTTP, jeśli serwer obsługuje [Obsługa bajtów](https://en.wikipedia.org/wiki/Byte_serving) za pośrednictwem żądań zakresu HTTP (mechanizm HTTP do obsługi bajtów) . Jest to możliwe, ponieważ netcdf- java (które ERDDAP™ wykorzystanie do odczytu .nc pliki) obsługuje odczyt danych z zdalnego .nc pliki za pośrednictwem żądań zakresu HTTP.

 **Nie rób tego&#33;** Jest okropnie niewydajny i powolny.
Zamiast tego, użyj [&lt;cacheFromUrl &gt; system] (# cachefromurl) .

Dostęp ERDDAP™ zbiory danych jako pliki poprzez żądania zakresu bajtów --
Otaczając to, biorąc pod uwagę, że możesz (teoretycznie) Pomyśl o zestawie danych w ERDDAP™ jak olbrzym .nc plik przez aputting " .nc "do bazy Open DAP URL dla danego zbioru danych (np.,https://myserver.org/erddap/griddap/datasetID.nca także poprzez dodanie a? query, aby określić podzbiór) , być może rozsądne jest pytanie, czy można użyć netcdf- java, Ferret lub inne NetCDF oprogramowanie klienta do odczytu danych poprzez Zapytania zakresu HTTP z ERDDAP . Odpowiedź brzmi nie, ponieważ nie ma naprawdę ogromny " .nc "plik. Jeśli chcesz to zrobić, zrób jedną z tych opcji:

* Stosowanie(OPeN)DAPoprogramowanie klienta do podłączenia do usług griddap oferowanych przez ERDDAP . Właśnie to. DAP   (i tym samym ERDDAP ) został zaprojektowany do. Jest bardzo wydajny.
* Albo, pobierz plik źródłowy (s) od "files" system (lub podzbiór pliku poprzez .nc ? zapytanie) do komputera i używać netcdf- java, Ferret lub inne NetCDF oprogramowanie klienta do czytania (teraz) plik lokalny (s) .
         
#### Informacje o pliku buforowym{#cached-file-information} 
Kiedy EDDGrid Zestaw danych FromFiles jest najpierw wczytany, EDDGrid FromFiles odczytuje informacje ze wszystkich odpowiednich plików i tworzy tabele (jeden wiersz dla każdego pliku) z informacjami o każdym ważnym pliku i każdym "złym" (inne lub nieprawidłowe) plik.
* Tabele są również przechowywane na dysku, jak NetCDF v3 .nc pliki w *bigParentDirectory* / zbiór danych / *last2CharsOfDatasetiID* / * datasetID * / w plikach o nazwie:
dirTable .nc   (która posiada listę unikalnych nazw katalogów) ,
plik Tabela .nc   (który posiada tabelę z informacjami każdego ważnego pliku) ,
Pliki badFiles .nc   (który trzyma tabelę z każdym złym pliku informacji) .
* Aby przyspieszyć dostęp do EDDGrid Zestaw danych FromFiles (ale kosztem wykorzystania większej ilości pamięci) , można użyć [&lt;fileTableInMemory &gt; true&lt;/ FileTableInMemory &gt;] (# filetableinmemory) powiedzieć ERDDAP™ do przechowywania kopii tabel informacyjnych plików w pamięci.
* Kopia tabel informacyjnych na dysku jest również przydatna, gdy ERDDAP™ jest wyłączony i ponownie uruchomiony: oszczędza EDDGrid FromFiles z konieczności ponownego odczytu wszystkich plików danych.
* Kiedy zestaw danych jest przeładowany, ERDDAP™ musi tylko odczytać dane w nowych plikach i plikach, które uległy zmianie.
* Jeśli plik ma inną strukturę niż inne pliki (na przykład inny typ danych dla jednej ze zmiennych lub inna wartość dla " [jednostki](#units) "atrybut) , ERDDAP dodaje plik do listy "złych" plików. Informacje o problemie z plikiem zostaną zapisane do *bigParentDirectory* / logs / log.txt file.
* Nie powinieneś nigdy usuwać ani pracować z tymi plikami. Jednym z wyjątków jest: jeśli nadal dokonujesz zmian w zbiorze danych datasets.xml konfiguracja, możesz usunąć te pliki, aby wymusić ERDDAP™ aby ponownie przeczytać wszystkie pliki, ponieważ pliki będą czytane / interpretowane inaczej. Jeśli kiedykolwiek trzeba usunąć te pliki, można to zrobić, gdy ERDDAP™ Ucieka. (Następnie ustawić [bandera](/docs/server-admin/additional-information#set-dataset-flag) aby przeładować zestaw danych jak najszybciej.) Jednakże, ERDDAP™ zwykle zauważa, że datasets.xml informacja nie pasuje do pliku Informacje o tabeli i automatycznie usuwa tabele plików.
* Jeśli chcesz zachęcić ERDDAP™ aktualizacja przechowywanych danych (na przykład, jeśli po prostu dodano, usunięto lub zmieniono niektóre pliki do katalogu danych) , użyć [system flag](/docs/server-admin/additional-information#flag) do siły ERDDAP™ aby zaktualizować informacje o pliku buforowanym.
         
#### Wnioski dotyczące obsługi{#handling-requests} 
W przypadku przetwarzania prośby klienta o dane, EDDGrid FromFiles może szybko zajrzeć do tabeli z poprawnymi informacjami o pliku, aby zobaczyć, które pliki mają wymagane dane.
     
#### Aktualizacja informacji o pliku w zakładce{#updating-the-cached-file-information} 
Ilekroć zbiór danych jest ponownie wczytywany, informacje o pliku buforowanym są aktualizowane.
    
* Zestawienie danych jest okresowo przeładowywane zgodnie z ustaleniem&lt;reloadEveryNMinutes &gt; in the dataset 's information in datasets.xml .
* Zestaw danych jest przeładowany tak szybko, jak to możliwe, kiedy tylko to możliwe ERDDAP™ wykrywa, że dodano, usunięto, [touch 'd](https://en.wikipedia.org/wiki/Touch_(Unix) ) (aby zmienić ostatni plik Czas zmodyfikowany) albo zmienił dane.
* Zestaw danych jest przeładowany tak szybko, jak to możliwe, jeśli używasz [system flag](/docs/server-admin/additional-information#flag) .

Kiedy zbiór danych jest przeładowany, ERDDAP™ porównuje aktualnie dostępne pliki do tabel informacyjnych. Nowe pliki są odczytywane i dodawane do odpowiedniej tabeli plików. Pliki, które już nie istnieją, są usuwane z poprawnej tabeli plików. Pliki, w których zmieniono znacznik czasu pliku, są odczytywane i aktualizowane. Nowe tabele zastępują stare tabele w pamięci i na dysku.
     
#### Złe pliki{#bad-files} 
Tabela złych plików i powody, dla których te pliki zostały uznane za złe (uszkodzony plik, brakujące zmienne itp.) jest e-mail Wszystko Na adres e-mail (Prawdopodobnie ty.) za każdym razem, gdy zestaw danych jest przeładowany. Należy jak najszybciej wymienić lub naprawić te pliki.
     
#### Brak zmiennych{#missing-variables} 
Jeśli niektóre pliki nie mają niektórych dataVariable s zdefiniowane w zbiorze danych datasets.xml W porządku. Kiedy EDDGrid FromFiles czyta jeden z tych plików, będzie działać tak, jakby plik miał zmienną, ale ze wszystkimi brakującymi wartościami.
     
#### FTP Trouble / Advice{#ftp-troubleadvice} 
Jeśli FTP nowe pliki danych do ERDDAP™ serwer podczas ERDDAP™ Jest szansa, że ERDDAP™ będzie przeładowywać zbiór danych podczas procesu FTP. To zdarza się częściej niż myślisz&#33; Jeśli to się stanie, plik będzie miał ważność (posiada poprawną nazwę) , ale plik nie jest jeszcze ważny. Jeśli ERDDAP™ próbuje odczytać dane z tego niepoprawnego pliku, błąd spowoduje dodanie pliku do tabeli niepoprawnych plików. Niedobrze. Aby uniknąć tego problemu, użyj tymczasowej nazwy pliku podczas FTP 'ing pliku, na przykład ABC2005 .nc \\ _ TEMP. Następnie test pliku NameRegex (zob. poniżej) wskazuje, że nie jest to odpowiedni plik. Po zakończeniu procesu FTP należy zmienić nazwę pliku na poprawną nazwę. Proces zmiany nazwy spowoduje, że plik stanie się istotny w jednej chwili.
     
#### "0 plików" Komunikat o błędzie{#0-files-error-message-1} 
Jeśli uciekniesz [GenerateDatasetsXml](#generatedatasetsxml) lub [DasDs](#dasdds) , lub jeśli próbujesz załadować EDDGrid Z... Dane plików w ERDDAP™ , i otrzymasz komunikat błędu "0 files" wskazujący, że ERDDAP™ znaleziono 0 pasujących plików w katalogu (kiedy myślisz, że są pasujące pliki w tym katalogu) :
    * Sprawdź, czy pliki są w tym katalogu.
    * Sprawdź pisownię nazwy katalogu.
    * Sprawdź plik NameRemex. Bardzo łatwo popełnić błędy z regexami. Do celów testowych, spróbuj regex.\\ *, który powinien pasować do wszystkich nazw plików. (Widzisz to? [dokumentacja regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) oraz [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
    * Sprawdź, czy użytkownik, który prowadzi program (np. użytkownik = tomcat (?) dla Tomcat / ERDDAP ) ma pozwolenie na przeczytanie tych plików.
    * W niektórych systemach operacyjnych (na przykład, SELER) i w zależności od ustawień systemu, użytkownik, który prowadził program, musi mieć "przeczytaj" pozwolenie na cały łańcuch katalogów prowadzących do katalogu, który posiada pliki.
         
####  EDDGrid szkielet FromFiles XML{#eddgridfromfiles-skeleton-xml} 
*    **Szkielet XML** dla wszystkich EDDGrid Podklasy FromFiles to:

>&nbsp;&nbsp;&lt;dataset type="EDDGridFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromFiles subclasses, this uses Java's WatchDirectory system   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file names, for example, ".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD * Pliki FromAudioFiles{#eddfromaudiofiles} 
 ** EDDGrid Pliki FromAudioFiles** oraz **Pliki EDDTableFromAudioName** dane zbiorcze z kolekcji lokalnych plików audio. (Po raz pierwszy pojawiły się w ERDDAP™ v1.82.) Różnica jest taka, że EDDGrid Pliki FromAudioFiles traktują dane jak wielowymiarowy zbiór danych (zazwyczaj z 2 wymiarami: \\[ start pliku Czas \\] oraz \\[ od Czas w pliku \\] ) , podczas gdy EDDTableFromAudioFiles traktuje dane jako dane tabelaryczne (zwykle z kolumnami dla pliku startTime, elapsedTime z pliku, a dane z kanałów audio) . EDDGrid Pliki FromAudioFiles wymagają, aby wszystkie pliki miały taką samą liczbę próbek, więc jeśli nie jest to prawdą, należy użyć plików EDDTableFromAudioFiles. W przeciwnym razie wybór typu EDD jest całkowicie twój. Jedna z zalet plików EDDTableFromAudioFiles: można dodać inne zmienne z innymi informacjami, np., stationID , StationType. W obu przypadkach brak jednolitej zmiennej czasu utrudnia pracę z danymi z tych typów EDD, ale nie było dobrego sposobu na utworzenie jednolitej zmiennej czasu.

Zobacz te klasy "superklasy, [ EDDGrid Pliki FromFiles](#eddgridfromfiles) oraz [Pliki EDDTableFromFiles](#eddtablefromfiles) , ogólne informacje na temat działania tej klasy i jej wykorzystania.

Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Ponieważ pliki audio nie mają innych metadanych niż informacje związane z kodowaniem danych dźwiękowych, będziesz musiał edytować wyjście z GenerateDatasets Xml w celu dostarczenia niezbędnych informacji (np. tytuł, streszczenie, creator\\_name , institution, history) .

Szczegóły:

* Istnieje wiele formatów plików audio. Obecnie ERDDAP™ może odczytać dane z większości plików .wav i .au. Obecnie nie może odczytać innych typów plików audio, np. .aiff lub .mp3. Jeśli potrzebujesz wsparcia dla innych formatów plików audio lub innych wariantów .wav i .au, prosimy wysłać swoją prośbę do Chrisa. John w Noa.gov. Lub, jako ćwiczenie możesz teraz użyć, możesz przekształcić pliki audio w PCM\\ _ ZMIENNE (dla danych całkowitych) lub PCM\\ _ FLOAT (dla danych zmiennoprzecinkowych) Pliki .wav tak, że ERDDAP™ mogą z nimi pracować.
* Obecnie ERDDAP™ może czytać pliki audio z czym Java klasy AudioFormat wywołuje PCM\\ _ FLOAT, PCM\\ _ SIGNED, PCM\\ _ UNSIGNED, ALAW i kodowanie ULAW. ERDDAP™ konwertuje wartości PCM\\ _ UNSIGNED (np. od 0 do 255) w wartości podpisane (np. -128 do 128) poprzez przełożenie bitów w wartościach danych. ERDDAP™ konwertuje ALAW i ULAW zakodowane z ich rodzimego formatu zakodowanego bajtu na krótki (int16) wartości. Od Java chce bigEndian = prawdziwe dane, ERDDAP™ reorganizuje bajty danych przechowywanych z bigEndian = false (mały endyjski) w celu poprawnego odczytu wartości. Dla wszystkich innych kodowań (PCM) , ERDDAP™ odczytuje dane tak jak jest.
* Kiedy ERDDAP™ odczytuje dane z plików audio, przekształca dostępne metadane audio w atrybuty globalne. Będzie to zawsze obejmować (z pokazanymi wartościami próbki) 
    
String audioBigEndian "false"; / / true or false
int audio Kanały 1;
String audioEncoding "PCM\\ _ SIGNED";
float audioFrameRate 96000.0; / / na sekundę
int audioFrameSize 2; / / # bajtów danych na ramkę
float audioSampleRate 96000.0; / / na sekundę
int audioSampleSizeInBits 16; / / # bitów na kanał na próbkę
    
Dla ERDDAP cele, rama jest synonimem próbki, która jest danymi dla jednego punktu w czasie.
Atrybuty w ERDDAP™ będą posiadały informacje opisujące dane, tak jak były w plikach źródłowych. ERDDAP™ często zmienia to podczas czytania danych, np. PCM\\ _ UNSIGNED, ALAW i zakodowane dane ULAW są konwertowane do PCM\\ _ SIGNED, a bigEndian = fałszywe dane są konwertowane do bigEndian = prawdziwe dane (w jaki sposób Java chce to przeczytać) . W końcu wartości danych w ERDDAP™ zawsze będzie [Kody PCM](https://en.wikipedia.org/wiki/Pulse-code_modulation) wartości danych (tj. proste digitalizowane próbki fali dźwiękowej) .
* Kiedy ERDDAP™ odczytuje dane z plików audio, odczytuje cały plik. ERDDAP™ może odczytać aż 2 miliardy próbek na kanał. Na przykład, jeśli częstotliwość próbkowania wynosi 44,100 próbek na sekundę, 2 miliardy próbek przekłada się na około 756 minut danych dźwiękowych na plik. Jeśli masz pliki audio z więcej niż tą ilością danych, musisz podzielić pliki na mniejsze kawałki tak, aby ERDDAP™ może je przeczytać.
* Ponieważ ERDDAP™ odczytuje całe pliki audio, ERDDAP™ musi mieć dostęp do dużej ilości pamięci do pracy z dużymi plikami audio. Patrz [ ERDDAP Ustawienia pamięci](/docs/server-admin/deploy-install#memory) . Jeśli jest to problem, to można go teraz użyć do rozbicia plików na mniejsze kawałki. ERDDAP™ może je odczytać z mniejszą pamięcią.
* Niektóre pliki audio zostały napisane nieprawidłowo. ERDDAP™ podejmuje niewielkie wysiłki w takich przypadkach. Ale generalnie, kiedy jest błąd, ERDDAP™ będzie rzucać wyjątek (i odrzucić ten plik) lub (jeżeli błąd jest niewykrywalny) odczyt danych (ale dane będą nieprawidłowe) .
*    ERDDAP™ nie sprawdza ani nie zmienia głośności dźwięku. Idealnie, integer danych audio jest skalowany, aby korzystać z całego zakresu typu danych.
* Pliki audio i odtwarzacze audio nie mają systemu dla brakujących wartości (np. -999 lub Float.NaN) . Więc dane audio nie powinny mieć żadnych brakujących wartości. Jeśli brakuje wartości (np., jeśli trzeba przedłużyć plik audio) , użyj serii 0, która będzie interpretowana jako doskonała cisza.
* Kiedy ERDDAP™ odczyt danych z plików audio, zawsze tworzy kolumnę o nazwie eaded Czas z czasem dla każdej próbki w sekundach (przechowywane jako podwójne) , w odniesieniu do pierwszej próbki (który został przydzielony Czas = 0, 0 s) . Z EDDGrid Pliki FromAudioFiles, staje się zmienną EaapsedTime.
*    EDDGrid Pliki FromAudioFiles wymagają, aby wszystkie pliki miały taką samą liczbę próbek. Więc jeśli to nie jest prawda, musisz użyć EDDTableFromAudioFiles.
* Dla EDDGrid FromAudioFiles, zalecamy ustawienie [&lt;DimensionValuesInMemory &gt;] (# dimensionvalues in memory) Fałszywe (jak zaleca GenerateDatasets Xml) , ponieważ wymiar czasu często ma ogromną liczbę wartości.
* Dla EDDGrid FromAudioFiles, należy prawie zawsze używać EDDGrid System plików FromFiles dla [Agregacja poprzez Nazwy plików](#aggregation-via-file-names-or-global-metadata) , prawie zawsze wyciągając datę rozpoczęcia nagrania Czas na nazwy plików. Na przykład:
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
GenerateDatasets Xml będzie zachęcać do tego i pomóc w tym.
* Dla plików EDDTableFromAudioFiles należy prawie zawsze używać systemu EDDTableFromFiles dla [\\*\\*\\ * fileName pseudo sourceName s](#filename-sourcenames) aby pobrać informacje z nazwy pliku (prawie zawsze data rozpoczęcia Czas na nagranie) i promować ją jako kolumnę danych. Na przykład:
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Format czasowy powinien być określony jako atrybut jednostek:&lt;att name = "units" &gt; yyyMMdd '\\ _' HHmmss&lt;/ att &gt;
     
###  EDDGrid Pliki FromMergeIRFiles{#eddgridfrommergeirfiles} 
 [ ** EDDGrid Pliki FromMergeIRFiles** ](#eddgridfrommergeirfiles) dane zagregowane pochodzące z danych lokalnych, [MergeIR](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README) plików, które pochodzą z [Tropikalna misja pomiarowa opadów deszczu (TRMM) ](https://trmm.gsfc.nasa.gov) , która jest wspólną misją NASA i japońskiej Agencji Eksploracji Lotnictwa (JAXA) . Połączenie Pliki IR można pobrać z [NASA](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/) .

 EDDGrid FromMergeIRFiles.Java został napisany i przyczynił się do ERDDAP™ projekt Jonathana Lafite 'a i Philippe' a Makowskiego z R.Tech Engineering (licence: copyright open source) .

 EDDGrid Pliki FromMergeIRFiles są trochę nietypowe:

*    EDDGrid FromMergeIRFiles obsługuje skompresowane lub nieskompresowane pliki danych źródłowych, w dowolnej kombinacji, w tym samym zbiorze danych. Pozwala to, na przykład, na kompresję starszych plików, które są rzadko dostępne, ale odkompresować nowe pliki, które są często dostępne. Albo możesz zmienić rodzaj kompresji z oryginału. Na przykład z, .gz .
* Jeśli masz skompresowane i nieskompresowane wersje tych samych plików danych w tym samym katalogu, upewnij się, że&lt;fileNameRegex &gt; dla Twojego zbioru danych pasuje do nazw plików, które chcesz dopasować i nie pasuje do nazw plików, których nie chcesz dopasować.
* Nieskompresowane pliki danych źródłowych nie mogą mieć rozszerzenia (tj. nie "." w nazwie pliku) .
* Skompresowane pliki danych źródłowych muszą mieć rozszerzenie pliku, ale ERDDAP™ określa typ kompresji poprzez kontrolowanie zawartości pliku, a nie poprzez przeglądanie rozszerzenia pliku (Na przykład, "Z".) . Obsługiwane typy kompresji to: "gz", "bzip2", "xz", "lzma", "snappy-raw", "snappy-frame", "pack200" i "z". Kiedy ERDDAP™ odczytuje skompresowane pliki, dekompresuje je w locie, bez zapisu do pliku tymczasowego.
* Wszystkie pliki danych źródłowych muszą korzystać z oryginalnego systemu nazewnictwa plików: np. merg\\ _ *RRRRMMDDHH* \\ _ 4km- pixel (gdzie *RRRRMMDDHH* wskazuje czas związany z danymi w pliku) , plus rozszerzenie pliku jeśli plik jest skompresowany.

Widzisz tę klasę "superklasy", [ EDDGrid Pliki FromFiles](#eddgridfromfiles) , ogólne informacje na temat działania tej klasy i jej wykorzystania.

Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Następnie można to edytować, aby dostroić.
 
###  EDDGrid Pliki FromNc@@{#eddgridfromncfiles} 
 [ ** EDDGrid Pliki FromNc@@** ](#eddgridfromncfiles) dane zagregowane pochodzące z lokalnych, zakodowanych, [GRIB .grb oraz .grb2](https://en.wikipedia.org/wiki/GRIB) pliki, [ HDF   (v4 lub v5)   .hdf ](https://www.hdfgroup.org/) pliki, [ .nc ml](#ncml-files) pliki, [ NetCDF   (v3 lub v4)   .nc ](https://www.unidata.ucar.edu/software/netcdf/) pliki oraz [Zarr Przewodniczący](https://github.com/zarr-developers/zarr-python) pliki (od wersji 2.25) . Pliki Zarr mają nieco inne zachowanie i wymagają albo fileNameRegex lub pathRegex zawierać "zarr".

Nowy ERDDAP™ Wersja 2.29.0 to eksperymentalne wsparcie zmiennych danych, które nie obsługują wszystkich zmiennych osi (lub jak niektórzy nazwali to danymi 1D i 2D w tym samym zbiorze danych) . Proszę sięgnąć po GitHub. (dyskusje lub kwestie) ze sprzężeniem zwrotnym i robakami.

Może to działać z innymi typami plików (na przykład, BUFR) Nie sprawdziliśmy go. Proszę wysłać nam próbki.

* Dla plików GRIB, ERDDAP™ zrobi plik indeksowy .gbx przy pierwszym odczycie każdego pliku GRIB. Tak więc pliki GRIB muszą być w katalogu, w którym "użytkownik", który uruchomił Tomcat, przeczytał + write pozwolenie.
* Widzisz tę klasę "superklasy", [ EDDGrid Pliki FromFiles](#eddgridfromfiles) , dla informacji o tym, jak ta klasa działa i jak jej używać.
* Począwszy od ERDDAP™ v2.12, EDDGrid Pliki FromNci EDDGrid Pliki FromNcNiezapakowany może odczytać dane z "struktur" w .nc 4 oraz .hdf 4 pliki. Aby zidentyfikować zmienną pochodzącą ze struktury,&lt; sourceName &gt; musi stosować format: *fullStructureName*  |  *memberName* , na przykład group1 / myStruct | Mój Członek.
* Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Następnie można to edytować, aby dostroić.
    
#### Grupy w plikach Nc{#groups-in-gridded-nc-files} 
     [Pliki Netcdf4 mogą zawierać grupy.](#groups-in-gridded-nc-files)   ERDDAP™ po prostu tworzy zbiór danych ze zmiennych w jednej grupie i wszystkich jej grup macierzystych. Możesz podać określoną nazwę grupy w GenerateDatasets Xml (Pomiń ukośnik) lub użyć "", aby mieć GenerateDatasets Xml wyszukiwanie wszystkich grup w poszukiwaniu zmiennych, które używają większości wymiarów lub używają " \\[ korzeń \\] "by GenerateDatasets szukały zmiennych w grupie root.
    
Pierwszą rzeczą, którą GenerateDatasetsXml robi dla tego typu zbioru danych po otrzymaniu odpowiedzi na pytania jest wydrukowanie struktury typu ncdump w pliku próbkowym. Więc jeśli wprowadzisz kilka głupich odpowiedzi dla pierwszej pętli przez GenerateDatasets Xml, przynajmniej będziesz w stanie zobaczyć czy ERDDAP™ może odczytać plik i zobaczyć jakie wymiary i zmienne są w pliku. Następnie możesz dać lepsze odpowiedzi dla drugiej pętli poprzez GenerateDatasetsXml.
    

###  EDDGrid FromNcFilesUnpacked{#eddgridfromncfilesunpacked} 
 [ ** EDDGrid FromNcFilesUnpacked** ](#eddgridfromncfilesunpacked) jest wariantem [ EDDGrid Pliki FromNc@@](#eddgridfromncfiles) które agreguje dane z lokalnych, gridded NetCDF   (v3 lub v4)   .nc oraz powiązane pliki. Różnica polega na tym, że ta klasa rozpakowuje każdy plik danych przed EDDGrid Pliki FromFiles przeglądają pliki:

* Rozpakowuje zmienne, które są pakowane [ scale\\_factor lub add\\_offset ](#scale_factor) .
* Konwertuje\\ _ FillValue i missing\\_value wartości dla NaN (lub MAX\\ _ VALUE dla typów danych całkowitych) .
* Konwertuje wartości czasu i znacznika czasu do "seconds since 1970-01-01T00:00:00Z" .

Wielką zaletą tej klasy jest to, że zapewnia sposób na radzenie sobie z różnymi wartościami scale\\_factor , add\\_offset ,\\ _ FillValue, missing\\_value lub jednostki czasowe w różnych plikach źródłowych w zbiorze. W przeciwnym razie musiałbyś użyć takiego narzędzia jak [NcML](#ncml-files) lub [ NCO ](#netcdf-operators-nco) modyfikować każdy plik, aby usunąć różnice, tak aby pliki mogły być obsługiwane przez EDDGrid FromNcFiles. Aby ta klasa działała prawidłowo, pliki muszą być zgodne ze standardami CF dla powiązanych atrybutów.

* Jeśli spróbujesz EDDGrid Pliki FromNcRozpakowany z grupy plików, z którymi wcześniej próbowałeś i nie udało Ci się użyć EDDGrid Pliki FromNcFiles, cd to
     *bigParentDirectory* / zbiór danych / *last2Listy* / * datasetID * /
gdzie *last2Listy* to ostatnie 2 litery datasetID ,
i usunąć wszystkie pliki w tym katalogu.
* Począwszy od ERDDAP™ v2.12, EDDGrid Pliki FromNci EDDGrid Pliki FromNcNiezapakowany może odczytać dane z "struktur" w .nc 4 oraz .hdf 4 pliki. Aby zidentyfikować zmienną pochodzącą ze struktury,&lt; sourceName &gt; musi stosować format: *fullStructureName*  |  *memberName* , na przykład group1 / myStruct | Mój Członek.
* Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Następnie można to edytować, aby dostroić.
    
Pliki Netcdf4 mogą zawierać grupy. Patrz [ta dokumentacja](#groups-in-gridded-nc-files) .
    
Pierwszą rzeczą, którą GenerateDatasetsXml robi dla tego typu zbioru danych po otrzymaniu odpowiedzi na pytania jest wydrukowanie struktury typu ncdump w pliku próbki **przed** Jest rozpakowany. Więc jeśli wprowadzisz kilka głupich odpowiedzi dla pierwszej pętli przez GenerateDatasets Xml, przynajmniej będziesz w stanie zobaczyć czy ERDDAP™ może odczytać plik i zobaczyć jakie wymiary i zmienne są w pliku. Następnie możesz dać lepsze odpowiedzi dla drugiej pętli poprzez GenerateDatasetsXml.
    
###  EDDGrid LonPM180{#eddgridlonpm180} 
 [ ** EDDGrid LonPM180** ](#eddgridlonpm180) zmienia wartości długości geograficznej dziecka (zamknięte)   EDDGrid zbiór danych o pewnych wartościach długości geograficznej powyżej 180 (na przykład od 0 do 360) tak, że są one w zakresie -180 do 180 (Długość geograficzna Plus lub Minus 180, stąd nazwa) .

* Zapewnia to sposób na stworzenie zbiorów danych o wartościach długości geograficznej większych niż 180 zgodnych w / z OGC usługi (na przykład WMS serwer w ERDDAP ) , ponieważ wszystkie OGC usługi wymagają wartości długości geograficznej od -180 do 180.
* Praca w pobliżu nieciągłości powoduje problemy, niezależnie od tego, czy brak ciągłości jest na 0 lub 180 długości. Ten typ zbioru danych pozwala uniknąć tych problemów dla każdego, oferując dwie wersje tego samego zbioru danych:
jeden z wartościami długości geograficznej w zakresie od 0 do 360 ("Pacificentric"?) ,
jeden z wartościami długości geograficznej w zakresie od -180 do 180 ("Atlanticentric"?) .
* Dla zbiorów danych dla dzieci o wszystkich wartościach długości geograficznej większych niż 180, wszystkie nowe wartości długości geograficznej są po prostu o 360 stopni niższe. Na przykład zbiór danych o wartościach długości geograficznej od 180 do 240 stałby się zbiorem danych o wartościach długości geograficznej od -180 do -120.
* Dla zbiorów danych dotyczących dzieci, które mają długość geograficzną dla całego globu (od 0 do 360) , nowa wartość długości geograficznej zostanie przestawiona (grubo) -180 do 180:
Oryginalne wartości od 0 do prawie 180 nie ulegają zmianie.
Oryginalne wartości 180 do 360 są zamieniane na -180 do 0 i przesuwane na początek tablicy długości geograficznej.
* Dla zbiorów danych dla dzieci, które mają zakres 180, ale nie obejmują świata, ERDDAP™ dodaje brakujące wartości niezbędne do stworzenia zbioru danych obejmującego cały świat. Na przykład zbiór danych dla dzieci o długościach od 140 do 200 stałby się zbiorem danych o długościach od -180 do 180.
Wartości dzieci od 180 do 200 zmienią się na -180 do -160.
Nowe wartości długości geograficznej zostaną dodane od -160 do 140. Odpowiednie wartości danych będą\\ _ FillValues.
Wartości dla dzieci od 140 do prawie 180 nie uległyby zmianie.
Dodanie brakujących wartości może wydawać się dziwne, ale pozwala uniknąć kilku problemów, które wynikają z posiadania wartości długości geograficznej, które skaczą nagle (np. od -160 do 140) .
* W [GenerateDatasetsXml](#generatedatasetsxml) , istnieje specjalny "typ zbioru danych", EDDGrid LonPM180FromErddapCatalog, który pozwala generować datasets.xml zamiast EDDGrid Zestawy danych LonPM180 z każdego z EDDGrid zbiory danych w ERDDAP których długość geograficzna jest większa niż 180. Ułatwia to oferowanie dwóch wersji tych zbiorów danych:
oryginał, o wartościach długości geograficznej w zakresie od 0 do 360,
oraz nowy zbiór danych, z wartościami długości geograficznej w zakresie -180 do 180.
    
Zestaw danych dziecka w obrębie każdego EDDGrid Zestaw danych LonPM180 będzie EDDGrid Zestaw danych FromErddap, który wskazuje na oryginalny zestaw danych.
Nowy zestaw danych datasetID będzie nazwą oryginalnego zbioru danych plus "\\ _ LonPM180".
Na przykład:
```
    <dataset type="EDDGridLonPM180" datasetID="erdMBsstdmday\\_LonPM180" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_LonPM180Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=120.0 maxLon=320.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Umieść EDDGrid Zestaw danych LonPM180 **poniżej** Oryginalny zbiór danych w datasets.xml . To unika pewnych możliwych problemów.
    
Alternatywnie, można zastąpić EDDGrid Zestaw danych dla dzieci FromErddap z oryginalnym zbiorem danych datasets.xml . Następnie będzie tylko jedna wersja zbioru danych: ta z wartościami długości geograficznej w granicach -180 do 180. Odrzucamy to, ponieważ są czasy, kiedy każda wersja zbioru danych jest wygodniejsza.
    
* Jeśli oferujesz dwie wersje zbioru danych, na przykład jedną o długości od 0 do 360 i jedną o długości od -180 do 180:
    * Możesz użyć opcjonalnego [&lt;dostępne Via WMS &gt; false&lt;/ dostępne Via WMS &gt;] (# accessibleviawms) z zestawem danych 0- 360 do przymusowego wyłączenia WMS usługi dla tego zbioru danych. Następnie dostępna będzie tylko wersja zbioru danych LonPM180 WMS .
    * Istnieje kilka sposobów, aby utrzymać zestaw danych LonPM180 na bieżąco ze zmianami w podstawowym zbiorze danych:
        * Jeśli zestaw danych dziecka jest EDDGrid FromaErddap dataset, który odnosi się do zbioru danych w tym samym ERDDAP™ , zestaw danych LonPM180 będzie próbował bezpośrednio subskrybować podstawowy zestaw danych tak, że zawsze jest up- to- date. Bezpośrednie subskrypcje nie generują e-maili proszących o zatwierdzenie subskrypcji - walidacja powinna być wykonywana automatycznie.
        * Jeśli zestaw danych dziecka nie jest EDDGrid FromaErddap dataset, który jest na tym samym ERDDAP™ , zestaw danych LonPM180 będzie próbował korzystać z regularnego systemu subskrypcji do subskrypcji podstawowego zbioru danych. Jeśli masz system subskrypcji w swoim ERDDAP™ Włącz, powinieneś dostać e-maile prosząc o potwierdzenie subskrypcji. Proszę, zrób to.
        * Jeśli masz system subskrypcji w swoim ERDDAP™ Wyłączony zestaw danych LonPM180 może czasami mieć przestarzałe metadane do czasu ponownego załadowania zbioru danych LonPM180. Więc jeśli system subskrypcji jest wyłączony, należy ustawić [&lt;przeładowanie Każda minuta &gt;] (# reloadeverynminutes) ustawienie zbioru danych LonPM180 na mniejszą liczbę, tak aby możliwe było szybsze wykrycie zmian w zbiorze danych dzieci.

* Dla zbiorów danych o maksymalnej długości geograficznej &gt; 360, użyj następującej opcjonalnej konfiguracji, aby ustawić maksymalną wartość, a zbiór danych zostanie skorygowany do -180 do 180.
```
    <maxSourceLon>540</maxSourceLon>
```

####  EDDGrid szkielet LonPM180 XML{#eddgridlonpm180-skeleton-xml} 

>&nbsp;&nbsp;&lt;dataset type="EDDGridLonPM180" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid Lon0360{#eddgridlon0360} 
 [ ** EDDGrid Lon0360** ](#eddgridlon0360) zmienia wartości długości geograficznej dziecka (zamknięte)   EDDGrid zbiór danych o pewnych wartościach długości geograficznej mniejszej niż 0 (na przykład, -180 do 180) tak, że są one w zakresie od 0 do 360 (stąd nazwa) .

* Praca w pobliżu nieciągłości powoduje problemy, niezależnie od tego, czy brak ciągłości jest na 0 lub 180 długości. Ten typ zbioru danych pozwala uniknąć tych problemów dla każdego, oferując dwie wersje tego samego zbioru danych:
jeden z wartościami długości geograficznej w zakresie od -180 do 180 ("Atlanticentric"?) .
jeden z wartościami długości geograficznej w zakresie od 0 do 360 ("Pacificentric"?) ,
* Dla zbiorów danych dla dzieci o wszystkich wartościach długości geograficznej mniejszej niż 0, wszystkie nowe wartości długości geograficznej są po prostu o 360 stopni wyższe. Na przykład zbiór danych o wartościach długości od -180 do -120 stałby się zbiorem danych o wartościach długości od 180 do 240.
* Dla zbiorów danych dotyczących dzieci, które mają długość geograficzną dla całego globu (mniej więcej od -180 do 180) , nowa wartość długości geograficznej zostanie przestawiona (grubo) Od 0 do 360:
Oryginalne wartości -180 do 0 są zamieniane na 180 do 360 i przesuwane na koniec tablicy długości geograficznej.
Oryginalne wartości od 0 do prawie 180 nie ulegają zmianie.
* Dla zbiorów danych dla dzieci, które mają zakres n = 0, ale nie obejmują świata, ERDDAP™ dodaje brakujące wartości niezbędne do stworzenia zbioru danych obejmującego cały świat. Na przykład zbiór danych dla dzieci o długości od -40 do 20 stałby się zbiorem danych o długości od 0 do 360.
Wartości dla dzieci od 0 do 20 nie uległyby zmianie.
Nowe wartości długości geograficznej zostaną dodane od 20 do 320. Odpowiednie wartości danych będą\\ _ FillValues.
Wartości dzieci od -40 do 0 zmienią się na 320 do 360.
Dodanie brakujących wartości może wydawać się dziwne, ale pozwala uniknąć kilku problemów, które wynikają z posiadania wartości długości geograficznej, które skaczą nagle (np., od 20 do 320) .
* W [GenerateDatasetsXml](#generatedatasetsxml) , istnieje specjalny "typ zbioru danych", EDDGrid Lon0360From ErddapCatalog, który pozwala generować datasets.xml zamiast EDDGrid Lon0360 zestawów danych z każdego z EDDGrid zbiory danych w ERDDAP których długość geograficzna jest większa niż 180. Ułatwia to oferowanie dwóch wersji tych zbiorów danych:
oryginał, o wartościach długości geograficznej w zakresie od 0 do 360,
oraz nowy zbiór danych, z wartościami długości geograficznej w zakresie -180 do 180.
    
Zestaw danych dziecka w obrębie każdego EDDGrid Lon0360 zestaw danych będzie EDDGrid Zestaw danych FromErddap, który wskazuje na oryginalny zestaw danych.
Nowy zestaw danych datasetID będzie nazwą oryginalnego zbioru danych plus "\\ _ Lon0360".
Na przykład:
```
    <dataset type="EDDGridLon0360" datasetID="erdMBsstdmday\\_Lon0360" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_Lon0360Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=-40.0 maxLon=20.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Umieść EDDGrid Lon0360 dataset **poniżej** Oryginalny zbiór danych w datasets.xml . To unika pewnych możliwych problemów.
    
Alternatywnie, można zastąpić EDDGrid Zestaw danych dla dzieci FromErddap z oryginalnym zbiorem danych datasets.xml . Następnie będzie tylko jedna wersja zbioru danych: ta z wartościami długości w zakresie od 0 do 360. Odrzucamy to, ponieważ są czasy, kiedy każda wersja zbioru danych jest wygodniejsza.
    
* Jeśli oferujesz dwie wersje zbioru danych, na przykład jedną o długości od 0 do 360 i jedną o długości od -180 do 180:
    * Możesz użyć opcjonalnego [&lt;dostępne Via WMS &gt; false&lt;/ dostępne Via WMS &gt;] (# accessibleviawms) z 0 do 360 zestaw danych przymusowo wyłączyć WMS usługi dla tego zbioru danych. Następnie dostępna będzie tylko wersja -180 do 180 zbioru danych WMS .
    * Istnieje kilka sposobów, aby utrzymać zestaw danych Lon0360 na bieżąco ze zmianami w podstawowym zbiorze danych:
        * Jeśli zestaw danych dziecka jest EDDGrid FromaErddap dataset, który odnosi się do zbioru danych w tym samym ERDDAP™ , zestaw danych Lon0360 będzie próbował bezpośrednio subskrybować podstawowy zestaw danych tak, że jest zawsze up- to- date. Bezpośrednie subskrypcje nie generują e-maili proszących o zatwierdzenie subskrypcji - walidacja powinna być wykonywana automatycznie.
        * Jeśli zestaw danych dziecka nie jest EDDGrid FromaErddap dataset, który jest na tym samym ERDDAP™ , zestaw danych Lon0360 będzie próbował korzystać z regularnego systemu subskrypcji do subskrypcji podstawowego zbioru danych. Jeśli masz system subskrypcji w swoim ERDDAP™ Włącz, powinieneś dostać e-maile prosząc o potwierdzenie subskrypcji. Proszę, zrób to.
        * Jeśli masz system subskrypcji w swoim ERDDAP™ Wyłączony, zestaw danych Lon0360 może czasami mieć przestarzałe metadane do czasu przeładowania zestawu danych Lon0360. Więc jeśli system subskrypcji jest wyłączony, należy ustawić [&lt;przeładowanie Każda minuta &gt;] (# reloadeverynminutes) ustawienie zbioru danych Lon0360 na mniejszą liczbę, tak aby możliwe było szybsze wykrycie zmian w zbiorze danych dzieci.
####  EDDGrid Szkielet Lon0360 XML{#eddgridlon0360-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridLon0360" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid SideBySide{#eddgridsidebyside} 
 [ ** EDDGrid SideBySide** ](#eddgridsidebyside) 2 lub więcej agregatów EDDGrid zbiory danych (dzieci) ramię w ramię.

* Wynikający z tego zbiór danych zawiera wszystkie zmienne ze wszystkich zbiorów danych dzieci.
* Zestaw danych rodzicielskich i wszystkie zestawy danych dla dzieci MUSI mieć inne datasetID b. Jeśli jakiekolwiek nazwiska w rodzinie są dokładnie takie same, zbiór danych nie wczyta (z komunikatem błędu, że wartości zagregowanej osi nie są sortowane) .
* Wszystkie dzieci MUSI mieć te same wartości źródłowe dla axisVariable s \\[ 1 + \\]   (na przykład szerokość geograficzna, długość geograficzna) . Precyzja badania jest określona przez [matchAxisNDigits](#matchaxisndigits) .
* Dzieci mogą mieć różne wartości źródłowe dla axisVariable s \\[ 0 \\]   (na przykład czas) , ale zazwyczaj są one w większości takie same.
* Zestawienie danych rodzicielskich wydaje się mieć wszystkie axisVariable s \\[ 0 \\] wartości źródłowe od wszystkich dzieci.
* Na przykład, to pozwala na połączenie zbioru danych źródłowych z komponentem u- wektorowym i innym zbiorem danych źródłowych z komponentem v- wektorowym, więc połączone dane mogą być obsługiwane.
* Dzieci stworzone tą metodą odbywają się prywatnie. Nie są to oddzielnie dostępne zbiory danych (na przykład na podstawie żądań klienta lub [pliki flag](/docs/server-admin/additional-information#flag) ) .
* Globalne metadane i ustawienia dla rodzica pochodzą z globalnych metadanych i ustawień dla pierwszego dziecka.
* Jeśli istnieje wyjątek podczas tworzenia pierwszego dziecka, rodzic nie zostanie stworzony.
* Jeśli istnieje wyjątek podczas tworzenia innych dzieci, to wysyła e-mail do emailEverythingTo (jak określono w [setup.xml](/docs/server-admin/deploy-install#setupxml) ) i kontynuuje z innymi dziećmi.
####  EDDGrid Szkielet boczny XML{#eddgridsidebyside-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridSideBySide" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 2 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid AgregateExistingDimension{#eddgridaggregateexistingdimension} 
 [ ** EDDGrid AgregateExistingDimension** ](#eddgridaggregateexistingdimension) 2 lub więcej agregatów EDDGrid zestawów danych, z których każdy ma inny zakres wartości dla pierwszego wymiaru, ale identyczne wartości dla innych wymiarów.

* Na przykład, jeden zestaw danych dla dzieci może mieć 366 wartości (na rok 2004) dla wymiaru czasu i innego dziecka może mieć 365 wartości (na rok 2005) dla wymiaru czasu.
* Wszystkie wartości dla wszystkich pozostałych wymiarów (na przykład szerokość geograficzna, długość geograficzna) Musi być identyczny dla wszystkich dzieci. Precyzja badania jest określona przez [matchAxisNDigits](#matchaxisndigits) .
* Wymiary sortowane - Wartości dla każdego wymiaru MUSI być posortowane (Wznoszące się lub zstępujące) . Wartości mogą być nieregularnie rozłożone. Nie może być żadnych powiązań. Jest to wymóg [Standard metadanych CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Jeśli jakiekolwiek wartości wymiarów nie są uporządkowane, zbiór danych nie zostanie załadowany i ERDDAP™ zidentyfikuje pierwszą niesortowaną wartość w pliku dziennika, *bigParentDirectory* / logs / log.txt.
    
Niesortowane wartości wymiarów prawie zawsze wskazują na problem z zbiorem danych źródłowych. Najczęściej zdarza się to, gdy niewłaściwy lub niewłaściwy plik jest włączony do agregacji, co prowadzi do niesortowanego wymiaru czasu. Aby rozwiązać ten problem, patrz komunikat błędu w ERDDAP™ plik log.txt, aby znaleźć naruszającą wartość czasu. Następnie poszukaj w plikach źródłowych, aby znaleźć odpowiedni plik (lub jeden przed lub jeden po) To nie należy do agregacji.
    
* Zestaw danych rodzica i zestaw danych dziecka MUSI mieć inne datasetID b. Jeśli jakiekolwiek nazwiska w rodzinie są dokładnie takie same, zbiór danych nie wczyta (z komunikatem błędu, że wartości zagregowanej osi nie są sortowane) .
* Obecnie zestaw danych dziecka MUSI być EDDGrid Zestaw danych FromDap i MUSI mieć najniższe wartości zagregowanego wymiaru (zazwyczaj najstarsze wartości czasowe) . Wszystkie pozostałe dzieci MUSI być prawie identyczne zbiory danych (różne tylko wartości dla pierwszego wymiaru) i są określone przez tylko ich sourceUrl .
* Zagregowany zbiór danych otrzymuje metadane od pierwszego dziecka.
* W [GenerateDatasets Program Xml](#generatedatasetsxml) może zrobić szorstki szkic datasets.xml dla EDDGrid AggregateExistingDimension na podstawie zestawu plików obsługiwanych przez Hyrax lub serwer THREDDS. Na przykład, użyj tego wejścia dla programu ("/ 1988" w URL sprawia, że przykład działa szybciej) :
    ```
      EDDType? EDDGridAggregateExistingDimension  
      Server type (hyrax, thredds, or dodsindex)? hyrax  
      Parent URL (for example, for hyrax, ending in "contents.html";  
        for thredds, ending in "catalog.xml")  
      ? https://opendap.jpl.nasa.gov/opendap/ocean\\_wind/ccmp/L3.5a/data/  
        flk/1988/contents.html  
      File name regex (for example, ".\\*\\.nc")? month.\\*flk\\.nc\\.gz  
      ReloadEveryNMinutes (for example, 10080)? 10080  
    ```
Możesz użyć wyniku&lt; sourceUrl &gt; tagi lub usunąć je i odkomentować&lt; sourceUrl &gt; tag (tak, aby nowe pliki były zauważane za każdym razem, gdy zestaw danych jest ponownie załadowany.
####  EDDGrid AgregateExistingDimension szkielet XML{#eddgridaggregateexistingdimension-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridAggregateExistingDimension" [datasetID](#datasetid)\\="..."  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- This is a regular [EDDGridFromDap](#eddgridfromdap) dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description child with the lowest values for the aggregated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl> &lt;!-- 0 or many; the sourceUrls for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;other children.  These children must be listed in order of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrls serverType="..." regex="..." recursive="true"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[pathRegex](#pathregex)\\=".\\*"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>https://*someServer/someDirectory/someSubdirectory*/catalog.xml&lt;/sourceUrls>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1. This specifies how to find the other children,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instead of using separate sourceUrl tags for each child.  The  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advantage of this is: new children will be detected each time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the dataset is reloaded. The serverType must be "thredds",  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hyrax", or "dodsindex". 
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) (regex)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) is .\\*\\.nc  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursive can be "true" or "false".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Only directory names which match the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(default=".\\*") will be accepted.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A thredds catalogUrl MUST include "/thredds/catalog/".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a thredds catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chla/catalog.xml](https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a hyrax catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flk/1988/contents.html](https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/1988/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a dodsindex URL is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Note the "OPeNDAP logo at the top of the page.)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When these children are sorted by filename, they must be in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order of ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid Kopiuj{#eddgridcopy} 
 [ ** EDDGrid Kopiuj** ](#eddgridcopy) tworzy i utrzymuje lokalną kopię innego EDDGrid dane i obsługuje dane z lokalnej kopii.

*    EDDGrid Kopiuj (oraz dla danych tabelarycznych, [EDDTableCopy](#eddtablecopy) ) jest bardzo łatwy w użyciu i bardzo skuteczny
     **rozwiązanie kilku największych problemów z obsługą danych ze zdalnego źródła danych:** 
    * Dostęp do danych ze zdalnego źródła danych może być powolny.
        * Może być wolno, bo z natury wolno. (na przykład nieefektywny typ serwera) ,
        * ponieważ jest przytłoczony przez zbyt wiele żądań,
        * lub ponieważ serwer lub zdalny serwer jest ograniczony przepustowość.
    * Zdalny zestaw danych jest czasami niedostępny (ponownie, z różnych powodów) .
    * Poleganie na jednym źródle danych nie jest dobre (na przykład, gdy wielu użytkowników i wielu ERDDAP s wykorzystanie) .
         
* Jak to działa... EDDGrid Kopiowanie rozwiązuje te problemy poprzez automatyczne tworzenie i utrzymywanie lokalnej kopii danych oraz obsługę danych z lokalnej kopii. ERDDAP™ może obsługiwać dane z lokalnej kopii bardzo, bardzo szybko. A tworzenie lokalnej kopii zmniejsza obciążenie zdalnego serwera. Lokalna kopia to kopia zapasowa oryginału, która jest przydatna na wypadek, gdyby coś stało się oryginałowi.
    
Nie ma nic nowego w tworzeniu lokalnej kopii zbioru danych. To co tu nowego, to to, że ta klasa robi to\\*łatwo\\*do tworzenia i\\*utrzymanie\\*miejscowa kopia danych z\\*odmiana\\*rodzajów zdalnych źródeł danych oraz\\*dodaj metadane\\*podczas kopiowania danych.
    
* Fragmenty danych... EDDGrid Kopia tworzy lokalną kopię danych poprzez żądanie fragmentów danych z pilota&lt;zbiór danych &gt;. Nie będzie kawałka dla każdej wartości lewej (pierwszy) zmienna osi. EDDGrid Kopia nie opiera się na liczbach indeksowych zdalnego zbioru danych dla osi -- te mogą się zmienić.
    
UWAGA: Jeśli rozmiar kawałka danych jest tak duży (&gt; 2GB) że powoduje problemy, EDDGrid Kopia nie może być użyta. (Przykro mi, ale mamy nadzieję na rozwiązanie tego problemu w przyszłości.) 
    
*    \\[ Alternatywa dla EDDGrid Przyjąłem.
Jeśli dane zdalne są dostępne za pośrednictwem plików do pobrania, a nie usługi internetowej, użyj [cache Opcja FromUrl dla EDDGrid Pliki FromFiles](#cachefromurl) , który tworzy lokalną kopię zdalnych plików i obsługuje dane z lokalnych plików. \\] 
* Lokalne pliki... Każdy kawałek danych jest przechowywany w osobnym NetCDF plik w podkatalogu *bigParentDirectory* / kopiuj / * datasetID * / (jak określono w [setup.xml](/docs/server-admin/deploy-install#setupxml) ) . Nazwy plików utworzone z wartości osi są modyfikowane, aby były bezpieczne dla plików (na przykład "x2D" zastępuje się "x2D") -- to nie wpływa na rzeczywiste dane.
     
* Nowe dane -- Za każdym razem EDDGrid Kopia jest przeładowana, sprawdza pilota.&lt;zestaw danych &gt;, aby zobaczyć, co kawałki są dostępne. Jeśli plik dla kawałka danych nie istnieje, wniosek o uzyskanie kawałka jest dodawany do kolejki. ERDDAP 's TaskThread przetwarza wszystkie kolejki żądań fragmentów danych, jeden-by-jeden. Możesz zobaczyć statystyki działalności taskThread na temat [Strona statusu](/docs/server-admin/additional-information#status-page) oraz [Sprawozdanie dzienne](/docs/server-admin/additional-information#daily-report) . (Tak. ERDDAP™ może przyporządkować do tego procesu wiele zadań, ale to zużyłoby wiele częstotliwości, pamięci i czasu CPU oraz wiele czasu lokalnego ERDDAP przepustowość, pamięć i czas procesora, żaden z nich nie jest dobrym pomysłem.) 
    
UWAGA: Po raz pierwszy EDDGrid Kopia jest załadowana, (Jeśli wszystko pójdzie dobrze) wiele żądań dotyczących fragmentów danych zostanie dodanych do kolejki taskThread, ale nie zostaną utworzone żadne lokalne pliki danych. Tak więc konstruktor zawiedzie, ale taskThread będzie nadal pracować i tworzyć lokalne pliki. Jeśli wszystko pójdzie dobrze, taskThread zrobi kilka lokalnych plików danych i następna próba ponownego załadowania zbioru danych (za 15 minut) odniesie sukces, ale początkowo z bardzo ograniczoną ilością danych.
    
UWAGA: Po lokalnym zbiorze danych jest kilka danych i pojawia się w Twoim ERDDAP , jeśli zdalny zestaw danych jest tymczasowo lub na stałe niedostępny, lokalny zestaw danych nadal będzie działać.
    
UWAGA: Jeśli zbiór danych jest duży i / lub serwer jest powolny (W tym problem, prawda?) , to zajmie dużo czasu, aby zrobić kompletną miejscową kopię. W niektórych przypadkach potrzebny czas będzie nie do przyjęcia. Na przykład przesyłanie 1 TB danych przez linię T1 (0,15 GB / s) trwa co najmniej 60 dni, w optymalnych warunkach. Dodatkowo, używa dużo przepustowości, pamięci i czasu procesora na komputerach zdalnych i lokalnych. Rozwiązaniem jest wysłanie dysku twardego do administratora zdalnego zbioru danych, aby s / on mógł zrobić kopię zbioru danych i wysłać dysk twardy z powrotem do Ciebie. Wykorzystanie tych danych jako punktu wyjścia oraz EDDGrid Kopiuj doda do niego dane. (To jeden ze sposobów, by [Amazon 's EC2 Cloud Service](https://aws.amazon.com/importexport/) rozwiązuje problem, mimo że ich system ma dużą przepustowość.) 
    
UWAGA: Jeśli podana wartość dla lewej (pierwszy) zmienna osi znika ze zdalnego zbioru danych, EDDGrid Kopiuj NIE usuwa lokalnego kopiowanego pliku. Jeśli chcesz, możesz go skasować.
    
#### Grid Kopiuj sprawdzanie Źródło Dane{#grid-copy-checksourcedata} 
W datasets.xml dla tego zbioru danych może mieć opcjonalny znacznik
```
    <checkSourceData>true</checkSourceData>  
```
Domyślna wartość jest prawdziwa. Jeśli / kiedy ustawisz go na false, zbiór danych nigdy nie będzie sprawdzał zbioru danych źródłowych, aby sprawdzić, czy są dostępne dodatkowe dane.

#### Tylko od{#onlysince} 
Możesz powiedzieć EDDGrid Kopiuj, aby zrobić kopię podzbioru zbioru danych źródłowych, zamiast całego zbioru danych źródłowych, dodając znacznik w formie&lt;tylko od &gt; *niektóre Wartość* &lt;/ onlySince &gt; do zbioru danych datasets.xml Chunk. EDDGrid Kopiuj pobierze tylko wartości danych związane z wartościami pierwszego wymiaru (zazwyczaj wymiar czasowy) które są większe niż *niektóre Wartość* . *niektóre Wartość* może być:
    * Czas względny określony przez now-  *nUnits* .
Na przykład:&lt;tylko od &gt; now- 2 lata&lt;/ onlySince &gt; mówi do zbioru danych, aby robić lokalne kopie danych tylko wtedy, gdy wartości wymiaru zewnętrznego (zazwyczaj wartości czasowe) są w ciągu ostatnich 2 lat (który jest ponownie oceniany za każdym razem, gdy zestaw danych jest ponownie załadowany, czyli kiedy szuka nowych danych do skopiowania) . Patrz [ now-  *nUnits* Opis składni](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) . Jest to użyteczne, jeśli pierwszy wymiar ma dane czasowe, które zwykle ma.
        
         EDDGrid Kopiuj nie usuwa lokalnych plików z danymi, które z czasem stają się starsze niż now-  *nUnits* . Możesz usunąć te pliki w każdej chwili, jeśli chcesz. Jeśli to zrobisz, stanowczo zalecamy ustawienie [bandera](/docs/server-admin/additional-information#flag) po usunięciu plików, aby powiedzieć EDDGrid Kopiuj, aby zaktualizować listę plików buforowanych.
        
    * Punkt stały w czasie określony jako ciąg ISO 8601 yyyy-MM-ddTHH:mm:ssZ .
Na przykład:&lt;Tylko od &gt; 2000- 01- 01T00: 00: 00Z&lt;/ onlySince &gt; mówi do zbioru danych tylko do tworzenia lokalnych kopii danych, gdzie wartość pierwszego wymiaru jest\\ &gt; = 2000-01-01T00: 00: 00Z. Jest to użyteczne, jeśli pierwszy wymiar ma dane czasowe, które zwykle ma.
         
    * Numer zmiennego punktu.
Na przykład:&lt;Tylko od &gt; 946684800.0&lt;/ only Since &gt;. Jednostki będą jednostkami docelowymi pierwszego wymiaru. Na przykład, dla wymiarów czasowych, jednostek w ERDDAP™ są zawsze "seconds since 1970-01-01T00:00:00Z" . Więc 946684800.0 "seconds since 1970-01-01T00:00:00Z" odpowiada 2000- 01-01T00: 00: 00Z. Jest to zawsze przydatna opcja, ale szczególnie przydatna, gdy pierwszy wymiar nie posiada danych czasowych.

####  EDDGrid Kopiuj powtórzone użycie{#eddgridcopy-recomended-use} 
1. Utwórz&lt;zbiór danych &gt; wpis (rodzimy typ, nie EDDGrid Kopiuj) dla zdalnego źródła danych.
     **Uruchomić go poprawnie, w tym wszystkie wymagane metadane.** 
2. Jeśli jest zbyt wolny, dodaj kod XML, aby zawinąć go w EDDGrid Kopiuj zbiór danych.
    * Użyj innego datasetID   (Może zmieniając datasetID stare datasetID nieznacznie) .
    * Kopiuj&lt;dostępne Do &gt;,&lt;przeładowanie EveryNMinutes &gt; i&lt;onChange &gt; z pilota EDDGrid XML do EDDGrid Kopiuj XML. (Ich wartości dla EDDGrid Kopiuj materię; ich wartości dla wewnętrznego zbioru danych stają się nieistotne.) 
3.   ERDDAP™ będzie tworzyć i utrzymywać lokalną kopię danych.
         
* OSTRZEŻENIE: EDDGrid Kopia zakłada, że wartości danych dla każdego kawałka nigdy się nie zmieniają. Jeśli / kiedy to się stanie, należy ręcznie usunąć pliki cząstkowe w *bigParentDirectory* / kopiuj / * datasetID * / które się zmieniły i [bandera](/docs/server-admin/additional-information#flag) zbiór danych, który ma być ponownie załadowany, tak aby usunięte kawałki zostały zastąpione. Jeśli masz subskrypcję e-mail do zbioru danych, otrzymasz dwa e-maile: jeden, gdy zestaw danych po raz pierwszy przeładowuje i zaczyna kopiować dane, a drugi, gdy zestaw danych ponownie ładuje (automatycznie) i wykrywa nowe lokalne pliki danych.
     
* Wszystkie wartości osi muszą być równe.
Dla każdej osi z wyjątkiem lewej (pierwszy) , wszystkie wartości muszą być równe dla wszystkich dzieci. Precyzja badania jest określona przez [matchAxisNDigits](#matchaxisndigits) .
     
* Ustawienia, Metadane, Zmienne... EDDGrid Kopiuj używa ustawień, metadanych i zmiennych z załączonego zbioru danych źródłowych.
     
* Zmień metadane -- W przypadku konieczności zmiany addAttributes lub zmienić kolejność zmiennych związanych z zbiorem danych źródłowych:
    1. Zmień addAttributes dla zbioru danych źródłowych w datasets.xml W razie potrzeby.
    2. Usuń jeden z skopiowanych plików.
    3. Ustaw [bandera](/docs/server-admin/additional-information#flag) aby natychmiast przeładować zestaw danych. Jeśli używasz flagi i masz e-mail subskrypcji do zbioru danych, otrzymasz dwa e-maile: jeden, gdy zestaw danych po raz pierwszy przeładowuje i zaczyna kopiować dane, a drugi, gdy zestaw danych ładuje ponownie (automatycznie) i wykrywa nowe lokalne pliki danych.
    4. Usunięty plik zostanie zregenerowany przy pomocy nowych metadanych. Jeśli zestaw danych źródłowych jest kiedykolwiek niedostępny, EDDGrid Kopiuj zbiór danych otrzyma metadane z regenerowanego pliku, ponieważ jest to najmłodszy plik.
####  EDDGrid Kopiuj szkielet XML{#eddgridcopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#grid-copy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onlySince>](#onlysince)...&lt;/onlySince> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromCassandra{#eddtablefromcassandra} 
 [ **EDDTableFromCassandra** ](#eddtablefromcassandra) obsługuje dane z jednego [Cassandra](https://cassandra.apache.org/) stół. Cassandra to baza danych NoSQL.

*    ERDDAP™ może pracować z Cassandrą v2 i v3 bez zmian lub różnic w konfiguracji. Zbadaliśmy [Cassandra v2 i v3 z Apache](https://cassandra.apache.org/download/) . Jest prawdopodobne, że ERDDAP™ może również pracować z Cassandrą pobraną z DataStax.
     
* Na sierpień 2019 - maj 2021, mieliśmy problem z Cassandrą do pracy z AdoptOpenJdk Java v8. Wyrzucił wyjątek\\ _ DOSTĘP\\ _ WIOLACJA). Ale teraz (maj 2021 r.) , że problem zniknął: możemy z powodzeniem używać Cassandra v2.1.22 i AdoptOpenJdk jdk8u292-b10.
     
#### Jedna tabela{#one-table} 
Cassandra nie wspiera "łączenia" w taki sposób, jak w relacyjnych bazach danych. Jeden ERDDAP™ EDDTableFromCassandra maps to one (być może podzbiór jednego) Stół Cassandra.

#### Cassandra datasets.xml  {#cassandra-datasetsxml} 
*    ERDDAP™ idzie z Cassandrą Java Kierowca, więc nie musisz go instalować oddzielnie.
* Należy uważnie przeczytać wszystkie informacje dotyczące EDDTableFromCassandra. Niektóre szczegóły są bardzo ważne.
* Cassandra Java kierowca jest przeznaczony do pracy z Apache Cassandra (1, 2 +) oraz przedsiębiorstwo DataStax (3.1 +) . Jeśli używasz Apache Cassandra 1.2.x, musisz edytować plik cassandra.yaml dla każdego węzła, aby ustawić start\\ _ native\\ _ transport: true, a następnie ponownie uruchomić każdy węzeł.
* Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Następnie można to edytować, aby dostroić (zwłaszcza [&lt;partycja KeySourceNames &gt;] (# partitionkeysourcenames) ). Możesz zebrać większość informacji potrzebnych do stworzenia XML dla zbioru danych EDDTableFromCassandra, kontaktując się z administratorem Cassandry i przeszukując sieć.
    
GenerateDatasets Xml ma dwie specjalne opcje dla EDDTableFromCassandra:
    
    1. Jeśli wpiszesz "&#33;&#33;&#33;&#33; LISTA&#33;&#33;&#33;" (bez kwotowań) dla przestrzeni klawiszy, program wyświetla listę przestrzeni klawiszy
    2. Jeśli wprowadzisz określoną przestrzeń klawiszową, a następnie wprowadź "&#33;&#33;&#33; LISTA&#33;&#33;" (bez kwotowań) dla nazwy tabeli program wyświetla listę tabel w tej przestrzeni klawiszy i ich kolumnach.
##### Czułość przypadku{#case-sensitivity} 
* Case- niewrażliwy Keyspace i nazwy tabeli -
Cassandra traktuje keyspace i nazwy stolików w sposób niewrażliwy. Z tego powodu nie wolno używać słowa zastrzeżonego (ale w innym przypadku) jako klawiatura Cassandra lub nazwa tabeli.
* Niewrażliwe nazwy kolumn...
Domyślnie Cassandra traktuje nazwy kolumn w nieczuły sposób. Jeśli użyjesz jednego z zastrzeżonych słów Cassandry jako nazwy kolumny (Proszę, nie&#33;) , MUSISZ STOSOWAĆ
```
        <columnNameQuotes>"<columnNameQuotes>  
```
w datasets.xml dla tego zbioru danych tak, że Cassandra i ERDDAP™ będzie traktować nazwy kolumn w sposób wrażliwy na sytuacje. Będzie to prawdopodobnie ogromny ból głowy dla Ciebie, ponieważ trudno jest określić wrażliwe na przypadek wersje nazw kolumn - Cassandra prawie zawsze wyświetla nazwy kolumn jako wszystkie małe, niezależnie od prawdziwego przypadku.
* Należy ściśle współpracować z administratorem Cassandry, który może mieć odpowiednie doświadczenie. Jeśli zbiór danych nie zostanie wczytany, przeczytaj [komunikat błędu](#troubleshooting-tips) Ostrożnie, żeby dowiedzieć się dlaczego.
         
#### Cassandra&lt;połączenie Własność & gt;{#cassandra-connectionproperty} 
Cassandra posiada właściwości połączeń, które można określić w datasets.xml . Wiele z nich wpłynie na działanie Kasandry. ERDDAP™ połączenie. Niestety, nieruchomości Cassandra muszą być ustawione programowo w Java , więc ERDDAP™ musi posiadać kod dla każdej nieruchomości ERDDAP™ wsparcie. Obecnie ERDDAP™ obsługuje te właściwości:
 (Pokazane wartości domyślne są tym, co widzimy. Domyślne wartości twojego systemu mogą być inne.) 

*    **Opcje ogólne**   
    &lt;połączenie Nazwa własności = " **kompresja** "&gt; *brak | LZ4 | snappy* &lt;/ połączenie Własność &gt; (case- insensitive, domyślny = brak)   
     (Ogólne porady kompresji: użyj "brak", jeśli połączenie między Cassandrą i ERDDAP™ jest lokalny / szybki i używa 'LZ4' jeśli połączenie jest zdalne / wolne.)   
    &lt;połączenie Nazwa własności = " **uwierzytelnianie** "&gt; *nazwa użytkownika / hasło* &lt;/ połączenie Własność &gt; (To dosłownie '/' )   
    &lt;połączenie Nazwa własności = " **metryka** "&gt; *prawda | false* &lt;/ połączenie Własność &gt; (2021-01-25 było domyślne = true, teraz ignorowane i zawsze fałszywe)   
    &lt;połączenie Nazwa własności = " **port** "&gt; *anInteger* &lt;/ połączenie Własność &gt; (Domyślny dla natywnego protokołu binarnego = 9042)   
    &lt;połączenie Nazwa własności = " **ssl** "&gt; *prawda | false* &lt;/ połączenie Własność &gt; (domyślnie = false)   
     (Moja szybka próba użycia ssl nie powiodła się. Jeśli ci się uda, powiedz, jak to zrobiłeś.) 
*    **Opcje zapytania**   
    &lt;połączenie Nazwa własności = " **spójność Poziom** "&gt; *wszystkie | wszystkie | each\\ _ quorum | local\\ _ one | local\\ _ quorum | local\\ _ serial | jeden | kworum | szeregowe | trzy | dwa* &lt;/ połączenie Własność &gt; (case- insensitive, default = ONE)   
    &lt;połączenie Nazwa własności = " **fetchSize** "&gt; *anInteger* &lt;/ połączenie Własność &gt; (domyślny = 5000)   
     (Nie ustawiać fetchSize do mniejszej wartości.)   
    &lt;połączenie Nazwa własności = " **Poziom spójności** "&gt; *wszystkie | wszystkie | each\\ _ quorum | local\\ _ one | local\\ _ quorum | local\\ _ serial | jeden | kworum | szeregowe | trzy | dwa* &lt;/ połączenie Własność &gt; (case- niewrażliwe, domyślnie = SERIAL) 
*    **Opcje gniazda**   
    &lt;połączenie Nazwa własności = " **connectTimeoutMillis** "&gt; *anInteger* &lt;/ połączenie Własność &gt; (domyślny = 5000)   
     (Nie nastawiaj połączenia TimeoutMillis do mniejszej wartości.)   
    &lt;połączenie Nazwa własności = " **keepAlive** "&gt; *prawda | false* &lt;/ połączenie Własność &gt;
    &lt;połączenie Nazwa własności = " **readTimeoutMillis** "&gt; *anInteger* &lt;/ połączenie Własność &gt;
     (Domyślny readTimeoutMillis Cassandry to 12000, ale ERDDAP™ zmienia wartość domyślną na 120000. Jeśli Cassandra rzuca readTimeout, zwiększenie to może nie pomóc, ponieważ Cassandra czasami rzuca je przed tym razem. Problem jest bardziej prawdopodobne, że są przechowywane zbyt dużo danych na partycję Kluczowa kombinacja.)   
    &lt;połączenie Nazwa własności = " **receiveBufferSize** "&gt; *anInteger* &lt;/ połączenie Własność &gt;
     (Nie jest jasne, jaki jest domyślny rozmiar bufora. Nie nastawiaj tego na małą wartość.)   
    &lt;połączenie Nazwa własności = " **soLinger** "&gt; *anInteger* &lt;/ połączenie Własność &gt;
    &lt;połączenie Nazwa własności = " **tcpNoDelay** "&gt; *prawda | false* &lt;/ połączenie Własność &gt; (domyślny = null) 

Jeśli musisz być w stanie ustawić inne właściwości połączenia, zobacz nasze [rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support) .

Dla danego startu Tomcat, connectionProperties są używane tylko po raz pierwszy dla danego adresu Cassandra. Wszystkie przeładunki tego zbioru danych oraz wszystkie kolejne zbiory danych, które mają ten sam adres URL, będą korzystać z tych oryginalnych konektowProperties.
    
#### CQL{#cql} 
Język zapytań Cassandry (CQL) jest powierzchownie jak SQL, język zapytania używany przez tradycyjne bazy danych. Ponieważ OPeNDAP żądania danych tabelarycznych zostały zaprojektowane tak, aby naśladować żądania SQL danych tabelarycznych, jest to możliwe dla ERDDAP™ do konwersji wniosków o dane tabelaryczne na CQL Bound / PreparedReclaments. ERDDAP™ loguje oświadczenie w [log.txt](/docs/server-admin/additional-information#log) jako
oświadczenie w formie tekstu: *Tekst stanu*   
Wersja oświadczenia będzie reprezentacją tekstu i będzie miała tylko "?", gdzie zostaną umieszczone wartości ograniczające.
       
Nie takie proste... Niestety, CQL ma wiele ograniczeń, na które kolumny mogą być zapytane, z jakimi typami ograniczeń, na przykład, kolumny klawiszy partycji mogą być ograniczone przez = i IN, więc ERDDAP™ wysyła Cassandrze pewne ograniczenia i stosuje wszystkie ograniczenia po otrzymaniu danych od Cassandry. Aby pomóc ERDDAP™ radzić sobie skutecznie z Cassandra, należy określić [&lt;partycja KeySourceNames &gt;] (# partitionkeysourcenames) , [&lt;ClusterColumnSourceNames &gt;] (# clustercolumnsourcenames) I...&lt;indexColumnSourceNames &gt;] (# indexColumnsourcenames) w datasets.xml dla tego zbioru danych. Są to najważniejsze sposoby, aby pomóc ERDDAP™ efektywna współpraca z Cassandrą. Jeśli nie powiesz ERDDAP™ te informacje, zestaw danych będzie boleśnie powolny w ERDDAP™ i wykorzystać tony zasobów Cassandra.
     
#### &lt;partycja KeySourceNames & gt;{#partitionkeysourcenames} 
Ponieważ klucze partycji odgrywają centralną rolę w stołach Cassandra, ERDDAP™ muszą wiedzieć sourceName s oraz, w stosownych przypadkach, inne informacje dotyczące sposobu współpracy z nimi.
* MUSISZ podać oddzieloną comma- listę nazw kolumn źródłowych partycji datasets.xml przez&lt;partycja KeySourceNames &gt;.
Prosty przykład:
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
Bardziej złożony przykład,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* TimeStamp Partition Keys... Jeśli jedna z kolumn klawiszy partycji jest kolumną timestamp, która posiada wersję coarser innej kolumny timestamp, należy podać to poprzez
     *partytionKeySourcName / otherColumnSourceName / time\\_precision *   
gdzie time\\_precision jest jednym z [ time\\_precision ](#time_precision) struny stosowane gdzie indziej w ERDDAP .
Ścieżka Z w time\\_precision string jest domyślnym, więc nie ma znaczenia, czy time\\_precision ciąg kończy się na Z lub nie.
Na przykład: ERDDAP™ będzie interpretować datę / sampletime / 1970- 01- 01 jako "Ograniczenia dotyczące daty mogą być konstruowane z ograniczeń dotyczących czasu próbnego za pomocą tego time\\_precision ". Rzeczywista konwersja ograniczeń jest bardziej złożona, ale jest to przegląd.
     **Używaj tego, gdy jest to istotne.** Umożliwia ERDDAP™ do efektywnej pracy z Cassandrą. Jeśli ten związek pomiędzy kolumnami istnieje w stole Cassandra i nie powiesz ERDDAP™ , zestaw danych będzie boleśnie powolny w ERDDAP™ i wykorzystać tony zasobów Cassandra.
* Pojedyncze Klucze partycji wartości... Jeśli chcesz ERDDAP™ zestaw danych do pracy tylko z jedną wartością jednego klucza partycji, określić *partitionKeySourceName = wartość* .
Nie używaj cytatów dla kolumny liczbowej, na przykład deviceid = 1007
Użyj cytatów dla kolumny String, na przykład, stationid = "Point Pinos"
* Domyślna kolejność sortowania: Kolejność klawisza partycji&lt; dataVariable &gt; datasets.xml określa domyślną kolejność sortowania wyników z Cassandry. Oczywiście użytkownicy mogą poprosić o inny sortowanie dla danego zestawu wyników poprzez przypisanie & orderBy  (" *Lista zmiennych oddzielona od comma-* ") do końca ich zapytania.
* Domyślnie, Cassandra i ERDDAP™ traktuj nazwy kolumn w sposób niewrażliwy. But if you set [ColumnNameQuotes](#case-sensitivity) do ", ERDDAP™ będzie traktować nazwy kolumn Cassandra w sposób wrażliwy na wszelki wypadek.
         
#### &lt;partycja KeyCSV & gt;{#partitionkeycsv} 
Jeśli jest to określone, ERDDAP™ użyje go zamiast poprosić Cassandrę o partycję Kluczowe informacje przy każdym ponownym załadowaniu zbioru danych. To zawiera listę odrębnych wartości klawiszy partycji, w kolejności, w jakiej będą używane. Czasy muszą być określone jako sekundy od 1970- 01-01T00: 00: 00Z. Ale istnieją również dwa specjalne alternatywne sposoby określenia czasu (każdy zakodowany jako łańcuch) :

1) czas (aISO8601 Czas)   (MOŻE być zakodowane jako ciąg znaków)   
2) "razy (anISO8601StartTime, strideSeconds, stopTime) " (MUSI być zakodowane jako łańcuch)   
stop Czas może być ISO8601 Czas lub " now- czas nUnits (np. ", now- 3 minuty ") .
stop Czas nie musi być dokładnie dopasowany do początku Time + x strideSeconds.
Wiersz z a razy () wartość zostaje rozszerzona do wielu wierszy przed każdym zapytaniem, więc lista partycji Klucze mogą być zawsze idealnie ułożone na datę.
Na przykład:
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
rozszerza do tej tabeli kombinacji klawiszy partycji:
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;clusterColumnSourceNames & gt;{#clustercolumnsourcenames} 
Cassandra akceptuje ograniczenia podobne do SQL na kolumnach klastrów, które są kolumnami, które stanowią drugą część klucza podstawowego (po klawiszu partycji (s) ) . Tak więc ważne jest, aby zidentyfikować te kolumny poprzez&lt;clusterColumnSourceNames &gt;. Umożliwia to ERDDAP™ do efektywnej pracy z Cassandrą. Jeśli są kolumny klastrów i nie powiesz ERDDAP , zestaw danych będzie boleśnie powolny w ERDDAP™ i wykorzystać tony zasobów Cassandra.
    * Na przykład:&lt;ClusterColumnSourceNames &gt; *myClusterColumn1, myClusterColumn2* &lt;/ clusterColumnSourceNames &gt;
    * Jeśli tabela Cassandra nie ma kolumn klastrów, to albo nie należy określać&lt;clusterColumnSourceNames &gt;, lub określić go bez wartości.
    * Domyślnie, Cassandra i ERDDAP™ traktuj nazwy kolumn w sposób niewrażliwy. But if you set [ColumnNameQuotes](#case-sensitivity) do ", ERDDAP™ będzie traktować nazwy kolumn Cassandra w sposób wrażliwy na sprawy.
         
#### &lt;indexColumnSourceNames & gt;{#indexcolumnsourcenames} 
Cassandra akceptuje '=' ograniczenia dotyczące wtórnych kolumn indeksowych, które są kolumnami, dla których wyraźnie utworzono indeksy za pośrednictwem
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (Tak, nawiasy są wymagane.)   
Jest więc bardzo przydatne, jeśli zidentyfikujesz te kolumny poprzez&lt;indexColumnSourceNames &gt;. Umożliwia to ERDDAP™ do efektywnej pracy z Cassandrą. Jeśli są kolumny indeksowe i nie powiesz ERDDAP , niektóre pytania będą niepotrzebne, boleśnie powolne w ERDDAP™ i wykorzystać tony zasobów Cassandra.
* Na przykład:&lt;indexColumnSourceNames &gt; *myIndexColumn1, myIndexColumn2* &lt;/ indexColumnSourceNames &gt;
* Jeśli tabela Cassandra nie ma kolumn indeksowych, to nie należy określać&lt;indexColumnSourceNames &gt;, lub określić go bez wartości.
* Uwaga: indeksy Cassandry nie są jak indeksy bazy danych. Cassandra indeksy tylko pomóc z '=' ograniczenia. I są tylko [zalecane](https://cassandra.apache.org/doc/latest/cql/indexes.html) dla kolumn, które mają znacznie mniejsze wartości odrębne niż wartości całkowite.
* Domyślnie, Cassandra i ERDDAP™ traktuj nazwy kolumn w sposób niewrażliwy. But if you set [ColumnNameQuotes](#case-sensitivity) do ", ERDDAP™ będzie traktować nazwy kolumn Cassandra w sposób wrażliwy na sprawy.
         
#### &lt;maxRequestFraction & gt;{#maxrequestfraction} 
Kiedy ERDDAP™   (do) ładuje zestaw danych, ERDDAP™ dostaje od Cassandra listę różnych kombinacji klawiszy partycji. Dla ogromnego zbioru danych, liczba kombinacji będzie ogromna. Jeśli chcesz zapobiec żądaniu przez użytkowników większości lub wszystkich zbiorów danych (lub nawet wniosek, który pyta ERDDAP™ aby pobrać większość lub wszystkie dane w celu dalszego filtrowania) Możesz powiedzieć ERDDAP™ tylko po to, aby umożliwić wnioski, które zmniejszają liczbę kombinacji o pewną kwotę poprzez&lt;maxRequestFraction &gt;, która jest liczbą zmiennoprzecinkową pomiędzy 1e- 10 (co oznacza, że wniosek nie może potrzebować więcej niż 1 połączenie na miliard) i 1 (domyślny, co oznacza, że wniosek może być dla całego zbioru danych) .
Na przykład, jeśli zbiór danych posiada 10000 oddzielnych kombinacji klawiszy partycji i maxRequestFraction jest ustawiony na 0.1,
następnie wnioski wymagające danych z 1001 lub więcej kombinacji wygenerują komunikat błędu,
ale wnioski, które wymagają danych z 1000 lub mniej kombinacji będą dozwolone.
    
Generalnie, im większy zestaw danych, tym niższy należy ustawić&lt;maxRequestFraction &gt;. Więc możecie ustawić to na 1 dla małego zbioru danych, 0.1 dla średniego zbioru danych, 0.01 dla dużego zbioru danych i 0.0001 dla dużego zbioru danych.
    
To podejście jest dalekie od ideału. Doprowadzi to do odrzucenia niektórych uzasadnionych wniosków i do dopuszczenia niektórych zbyt dużych wniosków. Ale jest to trudny problem i to rozwiązanie jest o wiele lepsze niż nic.
    
#### Cassandra subsetVariables  {#cassandra-subsetvariables} 
Podobnie jak w przypadku innych zbiorów danych EDDTable, można podać oddzieloną od commaa listę&lt; dataVariable &gt; destinationName s w atrybucie globalnym o nazwie " [ subsetVariables ](#subsetvariables) "identyfikacja zmiennych o ograniczonej liczbie wartości. Następnie zbiór danych będzie miał stronę .subset i pokaże listy różnych wartości dla tych zmiennych na listach rozwijanych na wielu stronach internetowych.
    
Włączając tylko zmienne klawiszy partycji i kolumny statyczne na liście jest STRONGLY E NCO Urazówka. Cassandra będzie w stanie wygenerować listę różnych kombinacji bardzo szybko i łatwo za każdym razem, gdy zestaw danych jest przeładowany. Jednym z wyjątków są klawisze partycji timestamp, które są gruboziarnistymi wersjami innej kolumny timestamp -- prawdopodobnie najlepiej jest pozostawić je poza listą subsetVariables ponieważ istnieje duża liczba wartości i nie są one bardzo przydatne dla użytkowników.
    
Jeśli na liście znajdziesz klucz niepartycyjny, niestatyczne zmienne, prawdopodobnie będzie to **Bardzo często** kalkulacyjnie drogie dla Cassandry za każdym razem, gdy zestaw danych jest przeładowany, ponieważ ERDDAP™ musi przejrzeć każdy wiersz zbioru danych, aby wygenerować informacje. Zapytanie może się nie udać. Z wyjątkiem bardzo małych zbiorów danych, to jest STRONGLY ZAGROŻONE.
    
#### Cassandra DataTypes{#cassandra-datatypes} 
Ponieważ istnieje pewna dwuznaczność, [Typy danych Cassandra](https://cassandra.apache.org/doc/latest/cql/types.html) mapa, do której ERDDAP™ typy danych, trzeba określić [&lt;Data Typ &gt;] (# datatype) znacznik dla każdego [&lt; dataVariable &gt;] (# datavariable) powiedzieć ERDDAP™ jakiego typu danych należy używać. Norma ERDDAP™ dane Rodzaje (oraz najczęściej stosowane typy danych Cassandra) są:
    
*    [boolean](#boolean-data)   (boolean) , które ERDDAP™ Następnie przechowuje jako bajty
* bajt (int, jeśli zakres wynosi od -128 do 127) 
* krótkie (int, jeśli zakres wynosi -32768 do 32767) 
* int (int, counter?, varint?, jeśli zakres wynosi -2147483648 do 2147483647) 
* długi (bigint, counter?, varint?, jeśli zakres wynosi -9223372036854775808 do 9223372036854775807) 
* float (float) 
* podwójne (podwójne, dziesiętne (z możliwością utraty precyzji) , timestamp) 
* char (ascii lub tekst, jeśli nigdy nie mają więcej niż 1 znak) 
* String (ascii, text, varchar, inet, uuid, timeuuid, blob, map, set, list?) 

Cassandra [znacznik czasu](#cassandra-timestamp-data) jest szczególnym przypadkiem: ERDDAP podwójne dane Typ.

Jeśli podasz String dataType w ERDDAP™ dla mapy Cassandra, zestawu lub listy, mapa, zestaw lub lista w każdym wierszu Cassandra zostanie zamieniona na pojedynczy ciąg w jednym wierszu w ERDDAP™ stół. ERDDAP™ posiada alternatywny system wykazów; zob. poniżej.

 *typ* Listy... ERDDAP [&lt;Data Typ &gt;] (# datatype) tag dla Cassandry dataVariable s może obejmować regularne ERDDAP™ dane Rodzaje (patrz powyżej) plus kilka specjalnych typów danych, które mogą być używane do kolumn listy Cassandra: booleanList, byteList, ubyteList, shortList, ushortList, intList, uintList, longList, ulongList, FloatList, DoubleList, CharList, StringList. Gdy jedna z tych kolumn listy znajduje się w wynikach przekazywanych do ERDDAP™ , każdy wiersz danych źródłowych zostanie rozszerzony do listy. rozmiar () wiersze danych w ERDDAP ; proste dane Rodzaje (na przykład, int) w tym wierszu danych źródłowych zostanie powielona lista. rozmiar () razy. Jeżeli wyniki zawierają więcej niż jedną zmienną listy, wszystkie listy w danym wierszu danych MUSI mieć ten sam rozmiar i MUSI być "równoległymi" listami, lub ERDDAP™ wygeneruje komunikat błędu. Na przykład, dla pomiarów prądów z ADCP,
głębokość \\[ 0 \\] , uCurrent \\[ 0 \\] , vCurrent \\[ 0 \\] , i zCurrent \\[ 0 \\] są powiązane, oraz
głębokość \\[ 1 \\] , uCurrent \\[ 1 \\] , vCurrent \\[ 1 \\] , i zCurrent \\[ 1 \\] Wszystkie są powiązane...
Alternatywnie, jeśli nie chcesz ERDDAP™ do rozszerzenia listy do wielu wierszy w ERDDAP™ tabeli, określić String jako dataVariable dane Wpisz więc cała lista będzie reprezentowana jako jeden String w jednym wierszu ERDDAP .
    
#### Cassandra TimeStamp Data{#cassandra-timestamp-data} 
Dane Cassandry są zawsze znane ze stref czasowych. Jeśli wprowadzisz dane znacznika czasu bez podania strefy czasu, Cassandra zakłada, że znacznik czasu używa lokalnej strefy czasowej.
    
 ERDDAP™ obsługuje dane znacznika czasu i zawsze przedstawia dane w Zulu / Strefa czasowa GMT. Więc jeśli wprowadzisz dane znacznika czasu w Cassandrze używając strefy czasowej innej niż Zulu / GMT, pamiętaj, że musisz wykonać wszystkie pytania dotyczące danych znacznika czasu w ERDDAP™ stosowania Zulu / Strefa czasowa GMT. Więc nie zdziw się, gdy wartości znacznika czasu, które pochodzą z ERDDAP są przesunięte o kilka godzin z powodu zmiany strefy czasowej z lokalnego do Zulu Czas GMT.

* W ERDDAP jest datasets.xml , w&lt; dataVariable &gt; tag dla zmiennej timestamp, set
```
          <dataType>double</dataType>  
```
oraz&lt; addAttributes &gt; set
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Sugestia: Jeśli dane są zakresem czasowym, warto mieć wartości znacznika czasu odnoszą się do środka dorozumianego zakresu czasowego (na przykład, południe) . Na przykład, jeśli użytkownik posiada dane dla 2010- 03- 26T13: 00Z z innego zbioru danych i chce najbliższe dane z tego zbioru danych Cassandra, które mają dane dla każdego dnia, to dane dla 2010- 03- 26T12: 00Z (reprezentowanie danych Cassandry za ten dzień) jest oczywiście najlepszy (w przeciwieństwie do północy przed lub po, gdzie jest mniej oczywiste, co jest najlepsze) .
*    ERDDAP™ ma przydatność do [Przelicz licznik Czas do / z czasu smyczkowego](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
* Patrz [Jak ERDDAP™ Transakcje z czasem](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
         
#### Naszyjniki Integer{#integer-nulls} 
Cassandra wspiera kadłuby w Cassandra int ( ERDDAP™ int) i bigint ( ERDDAP™ długi) kolumny, ale ERDDAP™ nie obsługuje prawdziwych jąder dla żadnego typu danych całkowitych.
Domyślnie, głowice liczb całkowitych Cassandra zostaną przekształcone w ERDDAP™ do 2147483647 dla kolumn int lub 9223372036854775807 dla kolumn długich. Pojawią się one jako "NaN" w niektórych typach plików wyjściowych tekstowych (na przykład, .csv) "," w innych typach tekstowych plików wyjściowych (na przykład: .htmlTable ) oraz szczegółowy numer (2147483647 dla brakujących wartości int) w innych rodzajach plików (na przykład, pliki binarne jak .nc i maty) . Użytkownik może szukać wierszy danych z tego typu brakującą wartością, odnosząc się do "NaN", np.
    
Jeśli użyjesz innej wartości całkowitej, aby wskazać brakujące wartości w tabeli Cassandra, proszę zidentyfikować tę wartość w datasets.xml :

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

W przypadku kolumn punktu zmiennoprzecinkowego Cassandra, głowice przeliczane są na NaNs w ERDDAP . Dla typów danych Cassandra, które są konwertowane na Strings w ERDDAP™ , czaszki zostają zamienione na puste Strings. To nie powinien być problem.
    
#### "UWAGA: Ponowne przygotowanie już przygotowanego zapytania"{#warning-re-preparing-already-prepared-query} 
* "UWAGA: Ponowne przygotowanie już przygotowanego zapytania" w *tomcat* / logi / katalina. out (lub jakiś inny plik dziennika Tomcat)   
Dokumentacja Cassandry mówi, że jest problem, jeśli to samo pytanie jest wykonane w przedterminowym oświadczeniu dwukrotnie (lub więcej) . (Widzisz to? [Raport o błędzie](https://datastax-oss.atlassian.net/browse/JAVA-236) .) By uniknąć wściekłości Cassandry, ERDDAP™ Ukrywa wszystkie PreparedStavements, aby móc je ponownie wykorzystać. To cache jest stracone jeśli / kiedy Tomcat / ERDDAP™ jest ponownie uruchomiony, ale myślę, że jest to w porządku, ponieważ prepared Oświadczenia są związane z danej sesji (pomiędzy Java i Cassandra) Który również jest stracony. Więc możecie zobaczyć te wiadomości. Nie znam innego rozwiązania. Na szczęście to ostrzeżenie, a nie błąd. (Chociaż Cassandra grozi, że może to prowadzić do problemów z wydajnością) .
    
Cassandra twierdzi, że wstępne oświadczenia są dobre na zawsze, więc ERDDAP PreparedReferencje nie powinny nigdy być nieaktualne. Jeśli to nie jest prawda, i masz błędy o niektórych PreparedReclaments jest out- of- date / niepoprawny, to musisz ponownie uruchomić ERDDAP™ do oczyszczenia ERDDAP W magazynie PreparedStavements.
    
#### Bezpieczeństwo Cassandry{#cassandra-security} 
Patrz [Zabezpieczenie Cassandry](https://cassandra.apache.org/doc/latest/operating/security.html) 

Pracując z Cassandrą, musisz robić wszystko tak bezpiecznie i bezpiecznie, jak to możliwe, aby nie dopuścić złośliwego użytkownika do uszkodzenia Cassandry lub uzyskania dostępu do danych, do których nie powinni mieć dostępu. ERDDAP™ próbuje robić wszystko w bezpieczny sposób.

* Zachęcamy do założenia ERDDAP™ do połączenia z Cassandra jako użytkownik Cassandra, który ma tylko dostęp do **istotne** tabela (s) i ma tylko uprawnienia do read.
* Zachęcamy do ustawienia połączenia z ERDDAP™ do Cassandry tak, że
    * zawsze używa SSL,
    * tylko pozwala na połączenia z jednego adresu IP (lub jeden blok adresów) i od jednego ERDDAP™ użytkownik, oraz
    * Przenosi tylko hasła w postaci zakodowanej MD5.
*    \\[ ZNANY PROBLEM \\] Właściwości połączeń (Łącznie z hasłem&#33;) są przechowywane jako zwykły tekst w datasets.xml . Nie znaleźliśmy sposobu, aby pozwolić administratorowi wprowadzić hasło Cassandra podczas ERDDAP Startup w Tomcat (który występuje bez wejścia użytkownika) , więc hasło musi być dostępne w pliku. Aby uczynić to bardziej bezpiecznym:
    * Ty (do ERDDAP™ administrator) powinien być właścicielem datasets.xml i mieć dostęp do READ i WRITE.
    * Zrobić grupę, która zawiera tylko użytkownika = tomcat. Użyj chgrp, aby grupa datasets.xml Z przywilejami do czytania.
    * Użyj chmod do przypisania uprawnień o- rwx (brak dostępu do read lub WRITE dla "innych" użytkowników) zamiast datasets.xml .
* Kiedy ERDDAP™ , hasło i inne właściwości połączenia są przechowywane w "prywatne" Java zmienne.
* Wnioski od klientów są rozpatrywane i sprawdzane pod kątem ważności przed wygenerowaniem wniosków CQL dla Cassandra.
* Wnioski do Cassandry są składane z CQL Bound / PreparedStavements, aby zapobiec CQL wstrzyknięcia. W każdym razie, Cassandra jest z natury mniej podatna na CQL wstrzyknięcia niż tradycyjne bazy danych są [Wstrzyknięcie SQL](https://en.wikipedia.org/wiki/SQL_injection) .
         
#### Cassandra Speed{#cassandra-speed} 
Cassandra może być szybka lub powolna. Jest kilka rzeczy, które można zrobić, aby to szybko:
* Ogólnie -
Charakter CQL jest taki, że pytania są [Zgłoszenie](https://en.wikipedia.org/wiki/Declarative_programming) . Określają, czego chce użytkownik. Nie zawierają specyfikacji ani wskazówek dotyczących sposobu obsługi lub optymalizacji zapytania. Więc nie ma mowy ERDDAP™ aby wygenerować zapytanie w taki sposób, że pomaga Cassandra zoptymalizować zapytanie (lub w jakikolwiek sposób określa sposób obsługi zapytania) . Ogólnie rzecz biorąc, to administrator Cassandry musi wszystko ustawić. (na przykład indeksy) optymalizacji niektórych rodzajów zapytań.
     
* Określanie kolumn znacznika czasu, które są związane z klawiszami partycji znacznika czasu za pomocą [&lt;partycja KeySourceNames &gt;] (# partitionkeysourcenames) jest najważniejszym sposobem, aby pomóc ERDDAP™ efektywna współpraca z Cassandrą. Jeśli ten związek istnieje w stole Cassandra i nie powiesz ERDDAP™ , zestaw danych będzie boleśnie powolny w ERDDAP™ i wykorzystać tony zasobów Cassandra.
     
* Określanie kolumn klastra poprzez [&lt;ClusterColumnSourceNames &gt;] (# clustercolumnsourcenames) jest drugim najważniejszym sposobem, aby pomóc ERDDAP™ efektywna współpraca z Cassandrą. Jeśli są kolumny klastrów i nie powiesz ERDDAP , duży podzbiór możliwych zapytań o dane będzie niepotrzebnie, boleśnie powolne w ERDDAP™ i wykorzystać tony zasobów Cassandra.
     
* Marka [Wskaźniki](https://cassandra.apache.org/doc/latest/cql/indexes.html) dla Zmiennych Powszechnych Wytrzymałych --
Można przyspieszyć kilka zapytań poprzez tworzenie indeksów kolumn Cassandra, które często są ograniczone ograniczeniami "=".
    
Cassandra nie może tworzyć indeksów dla list, zestawów czy map kolumn.
    
* Określanie kolumn indeksów poprzez [&lt;indexColumnSourceNames &gt;] (# indexColumnsourcenames) jest ważnym sposobem, aby pomóc ERDDAP™ efektywna współpraca z Cassandrą. Jeśli są kolumny indeksowe i nie powiesz ERDDAP , niektóre pytania o dane będą niepotrzebnie, boleśnie powolne w ERDDAP™ i wykorzystać tony zasobów Cassandra.
     
#### Cassandra Stats{#cassandra-stats} 
*    ["Statystyki Cassandra" Wiadomości diagnostyczne](#cassandra-stats) -- Dla każdego ERDDAP™ zapytanie użytkownika do zbioru danych Cassandra, ERDDAP™ wydrukuje linię w pliku dziennika, *bigParentDirectory* / logs / log.txt, z niektórymi statystykami związanymi z zapytaniem, na przykład,
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
Używając liczb w powyższym przykładzie, oznacza to:

* Kiedy ERDDAP™ ostatni (do) załadowany ten zestaw danych, Cassandra powiedział ERDDAP™ że było 10000 różnych kombinacji klawiszy partycji. ERDDAP™ buforowane wszystkie różne kombinacje w pliku.
* Ze względu na ograniczenia użytkownika, ERDDAP™ zidentyfikowane 2 kombinacje z 10000, które mogą mieć pożądane dane. Więc, ERDDAP™ będzie wykonać 2 połączenia do Cassandra, jeden dla każdej kombinacji klawiszy partycji. (Tego potrzebuje Cassandra.) Oczywiście, jest to kłopotliwe, jeśli duży zestaw danych ma dużą liczbę kombinacji klawiszy partycji i dane żądanie nie drastycznie to zmniejsza. Można wymagać, aby każde żądanie zmniejszyć przestrzeń klucza przez ustawienie [&lt;maxRequestFraction &gt;] (# maxrequestfraction) . Tutaj, 2 / 10000 = 2e-4, co jest mniejsze niż maxRequestFraction (0, 1) Więc wniosek został dopuszczony.
* Po zastosowaniu ograniczeń na klawiszach partycji, [kolumny klastrów](#clustercolumnsourcenames) oraz [kolumny indeksowe](#indexcolumnsourcenames) które zostały wysłane przez ERDDAP™ , Cassandra zwrócił 1200 wierszy danych do ERDDAP™ w ResultSecie.
* Wynik Zestaw musiał mieć [dane Typ = *sometyp* Lista](#cassandra-datatypes) kolumny (ze średnią 10 pozycji na listę) , ponieważ ERDDAP™ rozszerzył 1200 wierszy z Cassandry do 12000 wierszy w ERDDAP .
*    ERDDAP™ zawsze stosuje wszystkie ograniczenia użytkownika do danych z Cassandry. W tym przypadku ograniczenia, którymi nie zajmowała się Cassandra, zmniejszyły liczbę wierszy do 7405. To jest liczba wierszy wysłanych do użytkownika.

Najważniejszym zastosowaniem tych komunikatów diagnostycznych jest upewnić się, że ERDDAP™ robi to, co myślisz, że robi. Jeśli nie jest (Na przykład, czy nie zmniejsza to liczby różnych kombinacji zgodnie z oczekiwaniami?) Następnie możesz użyć informacji, aby dowiedzieć się, co jest nie tak.
 
* Badania i eksperymenty, aby znaleźć i ustawić lepiej [&lt;ConnectionProperty &gt;] (# cassandra- connectionproperty) .
 
* Sprawdzić prędkość połączenia sieciowego między Cassandrą i ERDDAP . Jeśli połączenie jest wolne, sprawdź, czy można go poprawić. Najlepsza sytuacja jest kiedy ERDDAP™ działa na serwerze dołączonym do tego samego (szybko) przełącz jako serwer obsługujący węzeł Cassandra, z którym się łączysz.
 
* Cierpliwości. Przeczytaj uważnie te informacje tutaj i w dokumentacji Cassandry. Eksperyment. Sprawdź swoją pracę. Jeśli Cassandra... ERDDAP™ połączenie jest jeszcze wolniejsze niż się spodziewasz, proszę dołączyć schemat tabeli Cassandra i ERDDAP™ część datasets.xml i zobaczyć nasze [rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support) .
 
* Jeśli wszystko zawiedzie,
rozważyć przechowywanie danych w zbiorze NetCDF v3 .nc pliki (szczególnie .nc plików, które używają [CF Geometrie do pobierania próbek dyskretnych (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Kontyguous Ragged Struktury danych Array i tak mogą być obsługiwane z ERDDAP jest [Pliki EDDTableFromNcCFFiles](#eddtablefromnccffiles) ) . Jeśli są logicznie zorganizowane (każdy z danymi dla kawałka przestrzeni i czasu) , ERDDAP™ może pobrać dane z nich bardzo szybko.
         
#### szkielet EDDTableFromCassandra XML{#eddtablefromcassandra-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromCassandra" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;ipAddress>](#sourceurl)...&lt;/ipAddress>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The Cassandra URL without the port number, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;127.0.0.1 REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#cassandra-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "readTimeoutMillis") and values  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of the Cassandra properties that ERDDAP™ needs to change.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;keyspace>...&lt;/keyspace> &lt;!-- The name of the keyspace that has  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the table. REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName> &lt;!-- The name of the table, default = "".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;partitionKeySourceNames>](#partitionkeysourcenames)...&lt;partitionKeySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;clusterColumnSourceNames>](#clustercolumnsourcenames)...&lt;clusterColumnSourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;indexColumnSourceNames>](#indexcolumnsourcenames)...&lt;indexColumnSourceNames> &lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;maxRequestFraction>](#maxrequestfraction)...&lt;maxRequestFraction>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL double between 1e-10 and 1 (the default). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#case-sensitivity)...&lt;columnNameQuotes> &lt;!-- OPTIONAL.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options: \\[nothing\\] (the default) or ". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include a [&lt;dataType>](#datatype) tag. See  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Cassandra DataTypes](#cassandra-datatypes).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For [Cassandra timestamp columns](#cassandra-timestamp-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromDapSequence{#eddtablefromdapsequence} 
 [ **EDDTableFromDapSequence** ](#eddtablefromdapsequence) obsługuje zmienne w sekwencji 1- i 2- poziomu od [ DAP ](https://www.opendap.org/) serwery takie jak DAP PER (był whttps://www.pmel.noaa.gov/epic/software/dapper/, teraz przerwany) .

* Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Następnie można to edytować, aby dostroić. Możesz zebrać informacje, których potrzebujesz, patrząc na pliki DDS i DAS źródłowe w przeglądarce (dodając .das i .dds do sourceUrl (przykładem byłhttps://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds).
    
* Zmienna jest w DAP sekwencja, jeżeli reakcja .dds wskazuje, że struktura danych trzymająca zmienną jest "sekwencją" (nieczuły przypadek) .
* W niektórych przypadkach, zobaczycie sekwencję w ciągu sekwencji, sekwencję 2-poziomową -- EDDTableFromDapSequence również się tym zajmuje.
#### szkielet EDDTableFromDapSequence XML{#eddtablefromdapsequence-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDapSequence" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;outerSequenceName>...&lt;/outerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the outer sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;innerSequenceName>...&lt;/innerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the inner sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is OPTIONAL; use it if the DAP data is a two level  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequence. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringEQNE>](#sourcecanconstrainstringeqne)true|false&lt;/sourceCanConstrainStringEQNE>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringGTLT>](#sourcecanconstrainstringgtlt)true|false&lt;/sourceCanConstrainStringGTLT>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringRegex>](#sourcecanconstrainstringregex)...&lt;/sourceCanConstrainStringRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;skipDapperSpacerRows>...&lt;/skipDapperSpacerRows>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- skipDapperSpacerRows specifies whether the dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will skip the last row of each innerSequence other than the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last innerSequence (because Dapper servers put NaNs in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row to act as a spacer).  This tag is OPTIONAL. The default  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is false.  It is recommended that you set this to true for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all Dapper sources and false for all other data sources. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromDatabase{#eddtablefromdatabase} 
 [ **EDDTableFromDatabase** ](#eddtablefromdatabase) obsługuje dane z jednej tabeli relacyjnej bazy danych lub [widok](https://en.wikipedia.org/wiki/View_(database) ).

#### Jedna tabela lub widok{#one-table-or-view} 
Jeśli dane, które chcesz podać są w dwóch lub więcej tabelach (i tym samym potrzebuje JOIN do uzyskiwania danych z obu tabel jednocześnie) Musisz zrobić [denormalizowane](https://en.wikipedia.org/wiki/Denormalization)   (już połączone) tabeli lub [widok](https://en.wikipedia.org/wiki/View_(SQL) ) ze wszystkimi danymi, które chcesz udostępnić jako jeden zestaw danych w ERDDAP .

Dla dużych, złożonych baz danych, może mieć sens, aby oddzielić kilka fragmentów jako denormalizowanego tabel, każdy z innego rodzaju danych, które staną się oddzielne zbiory danych w ERDDAP .

Dokonywanie denormalizacji tabeli do stosowania w ERDDAP™ Dla ciebie brzmi to jak szalony pomysł. Proszę, zaufaj nam. Istnieje kilka powodów, dla których ERDDAP™ działa z denormalizowanymi stołami:

* To znacznie łatwiejsze dla użytkowników.
Kiedy ERDDAP™ prezentuje zbiór danych jako jeden, prosty, denormalizowany, pojedyncza tabela, jest bardzo łatwy do zrozumienia danych. Większość użytkowników nigdy nie słyszała o znormalizowanych tabelach, a bardzo niewielu rozumie klawisze, klucze zagraniczne lub przyłącza do tabeli, i prawie na pewno nie znają szczegółów różnych typów połączeń, lub jak określić SQL do łączenia (lub wiele połączeń) prawidłowo. Korzystanie z stołu denormalizowanego unika wszystkich tych problemów. Ten sam powód uzasadnia użycie denormalizowanej tabeli do prezentacji zbioru danych ERDDAP™ użytkowników.
     
* Stoły znormalizowane (wiele tabel związanych z kolumnami kluczy) są świetne do przechowywania danych w bazie danych.
Ale nawet w SQL, wynik, który jest zwracany użytkownikowi jest denormalizacją (połączone) stół. Wydaje się więc rozsądne, aby przedstawić zbiór danych użytkownikom jako ogromną, denormalizowaną, pojedynczą tabelę, z której mogą następnie zażądać podzbiorów (np. pokaż mi wiersze tabeli, gdzie temperatura &gt; 30) .
     
* Można dokonać zmian dla ERDDAP™ bez zmieniania stolików.
     ERDDAP™ ma kilka wymagań, które mogą być różne od sposobu skonfigurowania bazy danych.
Na przykład: ERDDAP™ wymaga, aby dane znacznika czasu były przechowywane w polach 'znacznik czasu ze strefą czasową'.
Poprzez stworzenie oddzielnej tabeli / widoku dla ERDDAP™ , można dokonać tych zmian, gdy zrobić denormalizowanego tabeli ERDDAP . Tak więc, nie musisz wprowadzać żadnych zmian do swoich tabel.
     
*    ERDDAP™ odtworzy część struktury znormalizowanych tabel.
Możesz określić, które kolumny danych pochodzą z tabel 'outdoor' i dlatego mają ograniczoną liczbę odrębnych wartości. ERDDAP™ będzie zbierać wszystkie różne kombinacje wartości w tych kolumnach i przedstawić je użytkownikom na specjalne. subset strony internetowej, która pomaga użytkownikom szybko wybrać podzbiory zbioru danych. Poszczególne wartości dla każdej kolumny są również pokazane na listach rozwijanych na innych stronach zbioru danych.
     
* Zdenormalizowane tabeli sprawia, że dane hand- off od Ciebie do ERDDAP Administrator łatwo.
Jesteś ekspertem w tym zbiorze danych, więc to ma sens, że podejmujesz decyzje, które tabele i które kolumny dołączyć i jak do nich dołączyć. Więc nie musisz nam dawać (lub co gorsza, użytkownicy końcowi) kilka tabel i szczegółowych instrukcji, jak do nich dołączyć, wystarczy dać nam dostęp do stołu denormalizowanego.
     
* Zdenormalizowana tabela umożliwia efektywny dostęp do danych.
Forma denormalna jest zwykle szybsza do uzyskania dostępu niż znormalizowana forma. Przystąpienie może być powolne. Wiele połączeń może być bardzo powolnych.
     

Aby uzyskać dane z dwóch lub więcej tabel w bazie danych ERDDAP™ , istnieją trzy opcje:
 

* Zalecane rozwiązanie:
Możesz utworzyć plik z danymi z tabeli denormalizowanej.
Jeśli zbiór danych jest ogromny, wtedy ma sens tworzenie kilku plików, każdy z spójnym podzbiorem zdenormalizowanej tabeli (na przykład dane z mniejszego zakresu czasowego) .
    
Największą zaletą jest to, że ERDDAP™ będzie w stanie poradzić sobie z żądaniami użytkowników dla danych bez dalszych wysiłków ze strony bazy danych. Więc... ERDDAP™ nie będzie ciężarem dla twojej bazy danych ani zagrożeniem bezpieczeństwa. Jest to najlepsza opcja w prawie wszystkich okolicznościach, ponieważ ERDDAP™ może zazwyczaj uzyskać dane z plików szybciej niż z bazy danych (jeśli przekonwertujemy pliki .csv do .nc Pliki CF) . (Jednym z powodów jest to, że ERDDAP + pliki są systemem tylko do odczytu i nie muszą zajmować się dokonywaniem zmian podczas dostarczania [ACID](https://en.wikipedia.org/wiki/ACID)   (Atrakcyjność, spójność, izolacja, trwałość) .) Ponadto, prawdopodobnie nie będziesz potrzebował oddzielnego serwera, ponieważ możemy przechowywać dane na jednym z naszych Renee i uzyskać do niego dostęp z istniejącym ERDDAP™ na istniejącym serwerze.
    
* Opcja:
Utworzyłeś nową bazę danych na innym komputerze z tylko denormalizowanym stołem.
Ponieważ ta baza danych może być bezpłatną i otwartą bazą danych, jak MariaDB, MySQL i PostgreSQL, opcja ta nie musi wiele kosztować.
    
Największą zaletą jest to, że ERDDAP™ będzie w stanie obsłużyć żądania użytkowników dotyczące danych bez dalszych wysiłków ze strony aktualnej bazy danych. Więc... ERDDAP™ Nie będzie ciężarem dla twojej bazy danych. To również eliminuje wiele problemów w zakresie bezpieczeństwa, ponieważ ERDDAP™ nie będzie miał dostępu do aktualnej bazy danych.
    
* Wariant zniechęcony:
Możemy się połączyć. ERDDAP™ do twojej bazy danych.
Aby to zrobić, musisz:
    
    * Utwórz oddzielną tabelę lub widok z denormalizowaną tabelą danych.
    * Utwórz użytkownika "erddap", który ma dostęp tylko do tabeli denormalizowanej (s) .
         
    
Jest to opcja, jeśli dane zmieniają się bardzo często i chcesz dać ERDDAP™ użytkownicy natychmiastowy dostęp do tych zmian; jednak, nawet tak, może mieć sens korzystanie z opcji pliku powyżej i okresowo (co 30 minut?) zastąpić plik zawierający dzisiejsze dane.
Ogromne wady tego podejścia są takie, że ERDDAP™ prośby użytkowników prawdopodobnie umieścić nieznośnie duże obciążenie na swojej bazie danych i że ERDDAP™ połączenie jest zagrożeniem bezpieczeństwa (chociaż możemy zminimalizować / zarządzać ryzykiem) .

Dokonywanie denormalizacji tabeli lub widoku ERDDAP™ jest dobrą okazją do dokonania kilku zmian, które ERDDAP™ potrzebuje, w sposób, który nie wpływa na oryginalne tabele:

* Zmień datę i znacznik czasu pól / kolumn, aby użyć dataType, który wywołuje Postgres [znacznik czasu ze strefą czasową](#database-date-time-data)   (lub odpowiednik w bazie danych) .
Znaczniki czasu bez informacji o strefie czasowej nie działają prawidłowo w ERDDAP .
* Zrób indeksy dla kolumn, które użytkownicy często wyszukują.
* Bądź bardzo świadomy [przypadek nazw pól / kolumn](#quotes-for-names-and-case-sensitivity)   (na przykład, używać wszystkich małych przypadków) kiedy je piszesz.
* Nie używaj słów zarezerwowanych dla tabeli i nazw pól / kolumn.

Jeśli potrzebujesz pomocy przy tworzeniu zdenormalizowanej tabeli lub widoku, skontaktuj się z administratorem bazy danych.
Jeśli chcesz porozmawiać o tym całym podejściu lub strategii, jak najlepiej to zrobić, proszę e-mail Chris. John w Noa.gov.
    
#### baza danych w datasets.xml  {#database-in-datasetsxml} 
Trudno jest stworzyć właściwe datasets.xml informacje potrzebne do ERDDAP™ ustanowienie połączenia z bazą danych. Cierpliwości. Bądź metodyczny.
* Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Następnie można to edytować, aby dostroić.
        
GenerateDatasets Xml ma trzy specjalne opcje dla EDDTableFromDatabase:
1. Jeśli wpiszesz "&#33;&#33;&#33;&#33; LISTA&#33;&#33;&#33;" (bez kwotowań) dla nazwy katalogu program wyświetla listę nazw katalogów.
2. Jeśli wpiszesz "&#33;&#33;&#33;&#33; LISTA&#33;&#33;&#33;" (bez kwotowań) dla nazwy schematu program wyświetla listę nazw schematów.
3. Jeśli wpiszesz "&#33;&#33;&#33;&#33; LISTA&#33;&#33;&#33;" (bez kwotowań) dla nazwy tablename program wyświetla listę tabel i ich kolumn. Pierwszy wpis "&#33;&#33;&#33;&#33; LISTA&#33;&#33;&#33;", który robisz jest tym, który będzie używany.
* Należy uważnie przeczytać wszystkie informacje dotyczące EDDTableFromDatabase.
* Możesz zebrać większość informacji potrzebnych do stworzenia XML dla zbioru danych EDDTableFromDatabase poprzez skontaktowanie się z administratorem bazy danych i przeszukiwanie sieci.
* Chociaż bazy danych często traktują nazwy kolumn i nazw tabel w sposób niewrażliwy, są one wrażliwe w przypadku ERDDAP . Więc jeśli komunikat błędu z bazy danych mówi, że nazwa kolumny jest nieznana (na przykład "Nieznany identyfikator = ' *kolumna\\ _ nazwa* '") nawet jeśli wiesz, że istnieje, spróbuj użyć wszystkich stolic, na przykład, *COLUMN\\ _ NAZWA* , która jest często prawdziwą, wrażliwą na przypadek wersją nazwy kolumny.
* Należy ściśle współpracować z administratorem bazy danych, który może mieć odpowiednie doświadczenie. Jeśli zbiór danych nie zostanie wczytany, przeczytaj [komunikat błędu](#troubleshooting-tips) Ostrożnie, żeby dowiedzieć się dlaczego.
         
#### Kierowca JDBC{#jdbc-driver} 
* [Kierowca JDBC i&lt;driverName &gt;] (# jdbc- driver) -- Musisz uzyskać odpowiedni plik sterownika .jar JDBC 3 lub JDBC 4 dla bazy danych i
Włóż to. *tomcat* / webapps / erddap / WEB-INF / lib po instalacji ERDDAP . Następnie, w twoim datasets.xml dla tego zbioru danych, należy określić&lt;driverName &gt; dla tego sterownika, który jest (Niestety) różni się od nazwy pliku. Szukaj w sieci sterownika JDBC dla bazy danych i driverName Java musi go użyć.
    
    * Dla MariaDB, spróbuj [https://mariadb.com/kb/en/about-the-mariadb-java-client/](https://mariadb.com/kb/en/about-the-mariadb-java-client/)   
W&lt;driverName &gt; do stosowania w datasets.xml   (zob. poniżej) jest prawdopodobnie org.mariadb.jdbc. Kierowca.
    * Dla MySQL i Amazon RDS, spróbuj [https://dev.mysql.com/downloads/connector/j/](https://dev.mysql.com/downloads/connector/j/)   
W&lt;driverName &gt; do stosowania w datasets.xml   (zob. poniżej) jest prawdopodobnie com.mysql.jdbc. Kierowca.
    * Dla Oracle Spróbuj [https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html) .
W&lt;driverName &gt; do stosowania w datasets.xml   (zob. poniżej) jest prawdopodobnie oracle.jdbc.driver. Oracle Kierowca.
    * Dla Postgresql, mamy kierowcę JDBC 4 z [https://mvnrepository.com/artifact/org.postgresql/postgresql](https://mvnrepository.com/artifact/org.postgresql/postgresql)   
W&lt;driverName &gt; do stosowania w datasets.xml   (zob. poniżej) jest prawdopodobnie org.postgresql. Kierowca.
    * Dla SQL Server można uzyskać sterownik JTDS JDBC z [https://jtds.sourceforge.net](https://jtds.sourceforge.net) .
W&lt;driverName &gt; do stosowania w datasets.xml   (zob. poniżej) jest prawdopodobnie net.sourceforge.jtds.jdbc. Kierowca.
    
Po umieszczeniu kierowcy JDBC .jar ERDDAP™ katalog lib, musisz dodać odniesienie do pliku .jar w plikach skryptowych .bat i / lub .sh dla GenerateDatasets Xml, DasDds i ArchiveAdataset *tomcat* / webapps / erddap / WEB- INF / directory; w przeciwnym razie otrzymasz ClassNotFoundException podczas uruchamiania tych skryptów.
    
Niestety JDBC jest czasem źródłem kłopotów. W roli pośrednika ERDDAP™ i bazy danych, czasami dokonuje subtelnych zmian w standardowym / generycznej bazie danych SQL żądanie, że ERDDAP™ tworzy, co powoduje problemy (na przykład, związane z [identyfikator górnej / dolnej skrzyni](#quotes-for-names-and-case-sensitivity) oraz związane z [data / strefa czasowa](#database-date-time-data) ) . Prosimy o cierpliwość, przeczytanie informacji tutaj uważnie, sprawdzić swoją pracę i zobaczyć nasze [rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support) .
    
#### Baza danych&lt;połączenie Własność & gt;{#database-connectionproperty} 
* [&lt;ConnectionProperty &gt;] (# data-connectionproperty) -- W datasets.xml dla zestawu danych, musisz zdefiniować kilka połączeń Znaczniki własności do przekazania ERDDAP™ jak połączyć się z bazą danych (na przykład, aby określić nazwę użytkownika, hasło, połączenie ssl i [rozmiar pliku](#set-the-fetch-size) ) . Są one różne dla każdej sytuacji i trochę trudno je rozgryźć. Szukaj w internecie przykładów korzystania z sterownika JDBC, aby połączyć się z bazą danych. W&lt;connectionProperty &gt; names (na przykład "użytkownik", "hasło" i "ssl") , a niektóre wartości connectionProperty można znaleźć poprzez wyszukiwanie w sieci "właściwości połączenia JDBC *baza danych Rodzaj* " (na przykład: Oracle , MySQL, Amazon RDS, MariaDB, PostgreSQL) .
     
#### Cytaty dotyczące nazw i wrażliwości przypadku{#quotes-for-names-and-case-sensitivity} 
*    [Cytaty nazw pól / kolumn; Czułość przypadku](#quotes-for-names-and-case-sensitivity) - Domyślnie EDDTableFromDatabase umieszcza podwójne cytaty ANSI- SQL wokół nazw pól / kolumn w deklaracjach SELECT w przypadku użycia słowa zastrzeżonego jako nazwa pola / kolumny lub specjalnego znaku w nazwie pola / kolumny. Podwójne cytaty również udaremnić niektóre rodzaje ataków SQL wtrysku. Możesz powiedzieć ERDDAP™ do stosowania ",", lub nie cudzysłów poprzez&lt;ColumnNameQuotes &gt; w datasets.xml dla tego zbioru danych.
    
Dla wielu baz danych, użycie dowolnego rodzaju cudzysłów powoduje, że baza danych działa z nazwami pól / kolumn w sposób wrażliwy (zamiast domyślnego nieczułego sposobu w przypadku bazy danych) . Bazy danych często wyświetlają nazwy plików / kolumn jako wszystkie upper- case, kiedy w rzeczywistości forma delikatna przypadku jest inna. W ERDDAP™ , proszę zawsze traktować nazwy kolumn bazy danych jako wrażliwe przypadku.
    
    * Dla Marii DB, musisz uruchomić bazę danych [\\ -- sql- mode = ANSI\\ _ QUOTES](https://mariadb.com/kb/en/mysql-command-line-client/) .
    * Dla MySQL i Amazon RDS, musisz uruchomić bazę danych z [\\ -- sql- mode = ANSI\\ _ QUOTES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes) .
    *    Oracle obsługuje podwójne notowania ANSI- SQL [domyślnie](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223) .
    * PostgreSQL domyślnie obsługuje podwójne cytaty ANSI- SQL.
    
      
Nie używaj słowa zastrzeżonego dla bazy danych, katalogu, schematu lub nazwy tabeli. ERDDAP™ Nie zawiera cytatów.
    
Jeśli to możliwe, przy tworzeniu tabeli bazy danych użyj wszystkich małych przypadków (lub widok) oraz w odniesieniu do nazw pól / kolumn w datasets.xml w ERDDAP . W przeciwnym razie możesz otrzymać komunikat błędu mówiący, że baza danych, katalog, schemat, tabela i / lub pole nie zostały znalezione. Jeśli otrzymasz tę wiadomość o błędzie, spróbuj użyć wersji wrażliwej na przypadek, całej wersji upper- case i całej wersji Lower- case nazwy w ERDDAP . Jeden z nich może zadziałać. Jeśli nie, musisz zmienić nazwę bazy danych, katalogu, schematu i / lub tabeli na wszystkie małe-case.
    
#### Baza danych&lt;dane Typ & gt;{#database-datatype} 
*    [Baza danych](#database-datatype) [&lt;Data Typ &gt;] (# datatype) Tags... Ponieważ istnieje pewna dwuznaczność, [typy danych bazy danych](https://www.w3schools.com/sql/sql_datatypes_general.asp) mapa, do której ERDDAP™ typy danych, trzeba określić [&lt;Data Typ &gt;] (# datatype) znacznik dla każdego [&lt; dataVariable &gt;] (# datavariable) powiedzieć ERDDAP™ jakiego typu danych należy używać. Częścią problemu jest to, że różne zestawy danych używają różnych terminów dla różnych typów danych -- więc zawsze spróbuj dopasować definicje, nie tylko nazwy. Patrz opis [standard ERDDAP™ dane Rodzaje](#data-types) , który zawiera odniesienia do odpowiednich typów danych SQL. [Data i godzina](#database-date-time-data) w szczególnych przypadkach: ERDDAP podwójne dane Typ.
     
#### Dane dotyczące daty bazy danych{#database-date-time-data} 
Niektóre kolumny daty bazy danych nie mają wyraźnej strefy czasowej. Takie kolumny są kłopoty dla ERDDAP . Bazy danych wspierają koncepcję daty (z czasem lub bez) bez strefy czasowej, jako przybliżony zakres czasu. Ale... Java   (i tym samym ERDDAP ) Zajmuje się tylko chwilową datą + razy ze strefą czasową. Więc możecie wiedzieć, że data czasu jest oparta na lokalnej strefie czasowej (z czasem dziennym lub bez niego) lub GMT / Zulu strefa czasowa, ale Java   (oraz ERDDAP ) Nie. Początkowo myśleliśmy, że możemy rozwiązać ten problem. (np. określając strefę czasową dla kolumny) , ale baza danych + JDBC + Java interakcje sprawiły, że nie było to wiarygodne rozwiązanie.
* Więc, ERDDAP™ wymaga przechowywania wszystkich danych daty i daty w tabeli bazy danych z typem danych bazy danych odpowiadającym typowi JDBC "timestamp with time zone" (najlepiej, że wykorzystuje GMT / Zulu strefa czasowa) .
* W ERDDAP jest datasets.xml , w&lt; dataVariable &gt; tag dla zmiennej timestamp, set
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

oraz&lt; addAttributes &gt; set
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Sugestia: Jeśli dane są zakresem czasowym, warto mieć wartości znacznika czasu odnoszą się do środka dorozumianego zakresu czasowego (na przykład, południe) . Na przykład, jeśli użytkownik posiada dane dla 2010- 03- 26T13: 00Z z innego zbioru danych i chce mieć najbliższe dane z zbioru danych bazy danych, które mają dane dla każdego dnia, to dane z bazy danych dla 2010- 03- 26T12: 00Z (reprezentujące dane za ten dzień) jest oczywiście najlepszy (w przeciwieństwie do północy przed lub po, gdzie jest mniej oczywiste, co jest najlepsze) .
*    ERDDAP™ ma przydatność do [Przelicz licznik Czas do / z czasu smyczkowego](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
* Patrz [Jak ERDDAP Transakcje z czasem](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
       
#### Naszyjniki Integer{#integer-nulls-1} 
Bazy danych obsługują kadłuby w liczbie całkowitej (int, smalint, tinyint) kolumny, ale ERDDAP™ nie wspiera prawdziwych czaszek.
Naszyjniki baz danych zostaną przekształcone w ERDDAP™ 127 dla kolumn bajtowych, 255 dla kolumn ubytowych, 32767 dla kolumn krótkich, 65535 dla kolumn usortowych, 2147483647 dla kolumn int, 4294967295 dla kolumn uint, 9,223,372,036,854,775,807 dla kolumn długich lub 18446744073709551615 dla kolumn ulong. Jeśli używasz tych domyślnych, proszę zidentyfikować te missing\\_value s dla użytkowników zbioru danych w ERDDAP™ z

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

lub

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

Alternatywnie, można użyć " missing\\_value "atrybut zamiast"\\ _ FillValue ".
GenerateDatasets Xml automatycznie dodaje atrybuty\\ _ FillValue, gdy generuje sugerowane datasets.xml dla zbiorów danych bazy danych.

Dla kolumn zmiennoprzecinkowych bazy danych, głowice są konwertowane na NaNs w ERDDAP .
Dla typów danych bazy danych, które są konwertowane na Strings w ERDDAP™ , czaszki zostają zamienione na puste Strings.
    
#### Bezpieczeństwo bazy danych{#database-security} 
* Podczas pracy z bazami danych, trzeba zrobić rzeczy tak bezpieczne i bezpieczne, jak to możliwe, aby uniknąć umożliwienia złośliwego użytkownika do uszkodzenia bazy danych lub uzyskać dostęp do danych, do których nie powinni mieć dostępu. ERDDAP™ próbuje robić wszystko w bezpieczny sposób.
    * Rozważ powielanie, na innym komputerze, bazy danych i tabele baz danych z danymi, które chcesz ERDDAP™ służyć. (Tak, dla komercyjnych baz danych takich jak Oracle , oznacza to dodatkowe opłaty licencyjne. Ale dla baz danych open source, takich jak PostgreSQL, MySQL, Amazon RDS i MariaDB, to nic nie kosztuje.) Daje to wysoki poziom bezpieczeństwa i zapobiega ERDDAP™ żądania zwolnienia oryginalnej bazy danych.
    * Zachęcamy do założenia ERDDAP™ podłączenie do bazy danych jako użytkownika bazy danych, który ma tylko dostęp do **istotne** baza danych (s) i ma tylko uprawnienia do read.
    * Zachęcamy do ustawienia połączenia z ERDDAP™ do bazy danych tak, że
        * zawsze używa SSL,
        * tylko pozwala na połączenia z jednego adresu IP (lub jeden blok adresów) i od jednego ERDDAP™ użytkownik, oraz
        * Przenosi tylko hasła w postaci zakodowanej MD5.
    *    \\[ ZNANY PROBLEM \\] Właściwości połączeń (Łącznie z hasłem&#33;) są przechowywane jako zwykły tekst w datasets.xml . Nie znaleźliśmy sposobu, aby pozwolić administratorowi wprowadzić hasło do bazy danych podczas ERDDAP Startup w Tomcat (który występuje bez wejścia użytkownika) , więc hasło musi być dostępne w pliku. Aby uczynić to bardziej bezpiecznym:
        * Ty (do ERDDAP™ administrator) powinien być właścicielem datasets.xml i mieć dostęp do READ i WRITE.
        * Zrobić grupę, która zawiera tylko użytkownika = tomcat. Użyj chgrp, aby grupa datasets.xml Z przywilejami do czytania.
        * Użyj chmod do przypisania uprawnień o- rwx (brak dostępu do read lub WRITE dla "innych" użytkowników) zamiast datasets.xml .
    * Kiedy ERDDAP™ , hasło i inne właściwości połączenia są przechowywane w "prywatne" Java zmienne.
    * Wnioski od klientów są rozpatrywane i sprawdzane pod kątem ważności przed wygenerowaniem wniosków SQL dla bazy danych.
    * Wnioski do bazy danych są wykonywane z SQL PreparedStavements, aby zapobiec [Wstrzyknięcie SQL](https://en.wikipedia.org/wiki/SQL_injection) .
    * Wnioski do bazy danych są składane wraz z wykonaniem Pytania (nie wykonanie oświadczenia) ograniczenie liczby wniosków o read- (więc próbował SQL zastrzyk do zmiany bazy danych nie uda się również z tego powodu) .
         
#### SQL{#sql} 
* Ponieważ OPeNDAP żądania danych tabelarycznych zostały zaprojektowane tak, aby naśladować żądania danych tabelarycznych SQL, jest to łatwe dla ERDDAP™ do konwersji tabelarycznych żądań danych w proste SQL PreparedStavements. Na przykład: ERDDAP™ wniosek
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
zostanie przekonwertowany do SQL PreparedDescription
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
 ERDDAP™ żądania z & wyraźnym () lub orderBy  ( *zmienne* ) doda DISTINCT i / lub ZARZĄD *zmienne* do oświadczenia przygotowanego przez SQL. Ogólnie rzecz biorąc, będzie to znacznie spowolnić reakcję z bazy danych.
 ERDDAP™ loguje wstępne oświadczenie w [log.txt](/docs/server-admin/additional-information#log) jako
```
    statement=*thePreparedStatement*  
```
Będzie to reprezentacja tekstowa oświadczenia wstępnego, które może się nieco różnić od rzeczywistego oświadczenia wstępnego. Na przykład, w Deklaracji Wstępnej, czasy są zakodowane w szczególny sposób. Ale w reprezentacji tekstu, pojawiają się jako czas daty ISO 8601.
     
#### Prędkość bazy danych{#database-speed} 
* Bazy danych mogą być powolne. Są rzeczy, które możesz zrobić:
    * Ogólnie -
Charakter SQL jest taki, że pytania są [Zgłoszenie](https://en.wikipedia.org/wiki/Declarative_programming) . Określają, czego chce użytkownik. Nie zawierają specyfikacji ani wskazówek dotyczących sposobu obsługi lub optymalizacji zapytania. Więc nie ma mowy ERDDAP™ aby wygenerować zapytanie w taki sposób, że pomaga ono w optymalizacji zapytania w bazie danych (lub w jakikolwiek sposób określa sposób obsługi zapytania) . Ogólnie rzecz biorąc, do administratora bazy danych należy skonfigurowanie rzeczy (na przykład indeksy) optymalizacji niektórych rodzajów zapytań.
##### Ustaw rozmiar pliku{#set-the-fetch-size} 
Bazy danych zwracają dane do ERDDAP™ w kawałkach. Domyślnie różne bazy danych zwracają inną liczbę wierszy w kawałkach. Często liczba ta jest bardzo mała i tak bardzo nieefektywna. Na przykład, domyślnie dla Oracle 10&#33; Przeczytaj dokumentację JDBC dla sterownika JDBC bazy danych, aby znaleźć właściwość połączenia ustawić w celu zwiększenia tego, i dodać to do opisu zbioru danych w datasets.xml . Na przykład:
Dla MySQL i Amazon RDS, użyj
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
Dla MariaDB nie ma obecnie możliwości zmiany wielkości pobierania. Ale jest to żądana funkcja, więc przeszukaj sieć, aby sprawdzić, czy została ona wdrożona.
Dla Oracle ,
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
Dla PostgreSQL, użyj
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
ale możesz zmienić numer. Ustawienie zbyt dużej liczby spowoduje ERDDAP™ używać dużo pamięci i być bardziej prawdopodobne, że zabraknie pamięci.
#### Właściwości połączeń{#connectionproperties} 
Każda baza danych posiada inne właściwości połączeń, które można określić w datasets.xml . Wiele z nich wpłynie na działanie bazy danych ERDDAP™ połączenie. Proszę przeczytać dokumentację dla sterownika JDBC bazy danych, aby zobaczyć opcje. Jeśli znajdziesz przydatne właściwości połączeń, wyślij e-mail ze szczegółami na adres: erd dot data at noaa dot gov .
* Zrób stół...
Prawdopodobnie będzie szybciej odpowiedzi, jeśli okresowo (Codziennie? kiedy są nowe dane?) generowanie rzeczywistej tabeli (podobnie do tego, jak wygenerowałeś wizje) i powiedzieć ERDDAP™ aby uzyskać dane z tabeli zamiast WIDOW. Ponieważ każdy wniosek do tabeli może być spełniony bez połączenia z inną tabelą, odpowiedź będzie znacznie szybciej.
* Odkurzacz tabeli -
MySQL i Amazon RDS będą reagować znacznie szybciej, jeśli używasz [TABELA OPTIMIZE](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html) .
Maria DB będzie reagować znacznie szybciej, jeśli używasz [TABELA OPTIMIZE](https://mariadb.com/kb/en/optimize-table/) .
PostgreSQL będzie reagować znacznie szybciej, jeśli [WAKUM](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html) Stolik.
     Oracle nie ma ani nie potrzebuje analogicznego polecenia.
* Marka [Wskaźniki](https://en.wikipedia.org/wiki/Database_index) dla Zmiennych Powszechnych Wytrzymałych --
Możesz przyspieszyć wiele / większość zapytań poprzez tworzenie indeksów w bazie danych zmiennych (które bazy danych nazywają "kolumnami") które są często ograniczone w zapytaniu użytkownika. Ogólnie rzecz biorąc, są to te same zmienne określone przez [&lt; subsetVariables &gt;] (# subsetvarels) i / lub zmienne dotyczące szerokości, długości i czasu.
##### Użyj połączenia Pooling{#use-connection-pooling} 
Normalnie, ERDDAP™ tworzy oddzielne połączenie z bazą danych dla każdego żądania. To najbardziej wiarygodne podejście. Szybszą alternatywą jest użycie DataSource, która obsługuje łączenie połączeń. Aby go skonfigurować, określić (na przykład)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
zaraz obok&lt; sourceUrl &gt;,&lt;driverName &gt;, oraz&lt;połączenie Nieruchomości &gt;.
I *tomcat* / conf / context.xml, zdefiniuj zasób zawierający te same informacje, na przykład,
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
Ogólne informacje na temat korzystania z DataSource jest na [https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html) .
Patrz [Informacje o Tomcat DataSource](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources) oraz [Przykłady Tomcat DataSource](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html) lub wyszukać w sieci przykłady korzystania z DataSources z innymi serwerami aplikacji.
* Jeśli wszystko zawiedzie,
rozważyć przechowywanie danych w zbiorze NetCDF v3 .nc pliki (szczególnie .nc plików, które używają [CF Geometrie do pobierania próbek dyskretnych (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Kontyguous Ragged Struktury danych Array i tak mogą być obsługiwane z ERDDAP jest [Pliki EDDTableFromNcCFFiles](#eddtablefromnccffiles) ) . Jeśli są logicznie zorganizowane (każdy z danymi dla kawałka przestrzeni i czasu) , ERDDAP™ może pobrać dane z nich bardzo szybko.
         
#### szkielet EDDTableFromDatabase XML{#eddtablefromdatabase-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDatabase" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The format varies for each type of database, but will be  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;something like:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MariaDB:    jdbc:mariadb://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MySql       jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Amazon RDS: jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Oracle:     jdbc:oracle:thin:@*xxx.xxx.xxx.xxx*:1521:*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Postgresql: jdbc:postgresql://*xxx.xxx.xxx.xxx*:5432/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where *xxx.xxx.xxx.xxx* is the host computer's numeric IP address  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followed by :*PortNumber* (4 digits), which may be different for your  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[driverName](#jdbc-driver)\\>...&lt;/driverName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The high-level name of the database driver, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"org.postgresql.Driver".  You need to put the actual database  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;driver .jar file (for example, postgresql.jdbc.jar) in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*tomcat*/webapps/erddap/WEB-INF/lib.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#database-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "user", "password", and "ssl")  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and values of the properties needed for ERDDAP™ to establish  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the connection to the database.  0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataSourceName>](#use-connection-pooling)...&lt;/dataSourceName>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;catalogName>...&lt;/catalogName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the catalog which has the schema which has the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  OPTIONAL.  Some databases don't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;schemaName>...&lt;/schemaName> &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schema which has the table, default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName>  &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#quotes-for-names-and-case-sensitivity)&lt;columnNameQuotes> &lt;!-- OPTIONAL. Options:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" (the default), ', \\[nothing\\]. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderBy>...&lt;/orderBy>  &lt;!-- A comma-separated list of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[sourceName](#sourcename)s to be used in an ORDER BY clause at the end of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every query sent to the database (unless the user's request  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;includes an &orderBy() filter, in which case the user's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orderBy is used).  The order of the sourceNames is important.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The leftmost (first) sourceName is most important; subsequent  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are only used to break ties.  Only relevant  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are included in the ORDER BY clause for a given user  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;request.  If this is not specified, the order of the returned  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values is not specified. Default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanOrderBy>](#sourcecanorderby)no(default)|partial|yes&lt;/sourceCanOrderBy>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanDoDistinct>](#sourcecandodistinct)no(default)|partial|yes&lt;/sourceCanDoDistinct>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each dataVariable MUST include a [&lt;dataType>](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See [Database DataTypes](#database-datatype).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For [database date and timestamp columns](#database-date-time-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Tabela EDDFrom EDDGrid  {#eddtablefromeddgrid} 
 [ **Tabela EDDFrom EDDGrid ** ](#eddtablefromeddgrid) pozwala utworzyć zestaw danych EDDTable z dowolnego EDDGrid zestaw danych.

* Powszechnymi przyczynami takiego postępowania są:
    * Pozwala to na sprawdzenie zbioru danych OPeNDAP ograniczenia wyboru, które są rodzajem "query by value" (które użytkownik mógł zażądać) .
    * Zestawienie danych jest z natury zbiorem danych tabelarycznych.
* Wartość atrybutu globalnego "maxAxis0" (zazwyczaj typu = "int") , (domyślnym jest 10) zostaną wykorzystane do ograniczenia liczby osi \\[ 0 \\]   (zwykle "time" oś) wartości załączonych EDDGrid zbiór danych, do którego można uzyskać dostęp na każde żądanie dotyczące danych. Jeśli nie chcesz, aby było jakieś ograniczenie, podaj wartość 0. To ustawienie jest ważne, ponieważ w przeciwnym razie byłoby zbyt łatwe dla użytkownika, aby zapytać EDDTableFrom EDDGrid Przejrzeć wszystkie dane z zestawu danych. Zajmie to dużo czasu i prawie na pewno zawiedzie z błędem czasowym. To jest ustawienie, które sprawia, że bezpieczne mieć EDDTableFrom EDDGrid zestawy danych w Twoim ERDDAP bez obawy, że doprowadzą one do nieuzasadnionego wykorzystania zasobów obliczeniowych.
* Jeżeli dołączone EDDGrid jest [ EDDGrid FromErddap](#eddfromerddap) oraz ERDDAP™ jest taki sam ERDDAP , następnie EDDTableFrom EDDGrid zawsze będzie korzystać z aktualnie dostępnej wersji zbioru danych, do których się odnosi bezpośrednio. Jest to bardzo skuteczny sposób dla EDDTableFrom EDDGrid dostęp do danych zaprogramowanych.
* Te zajęcia są...&lt;przeładowanie Każda minuta &gt;] (# reloadeverynminutes) To się liczy. Załącznik EDDGrid jest&lt;Przeładowanie EveryNMinutes &gt; jest ignorowane.
* Jeżeli wartość dla [&lt;updateEveryNMillis &gt;] (# updateeverynmillis) jest dostarczany dla tego zbioru danych, jest ignorowany. Załącznik EDDGrid jest&lt;updateEveryNMillis &gt; jest ważne.
*    [GenerateDatasetsXml](#generatedatasetsxml) ma opcję dla typu zbioru danych = EDDTableFrom EDDGrid który prosi o adres URL ERDDAP   (zazwyczaj takie same ERDDAP )   (kończąc na "/ erddap /") i wyrażenie regularne. GenerateDatasets Xml wygeneruje XML dla EDDTableFrom EDDGrid zestaw danych dla każdego zbioru danych w paski ERDDAP™ co ma datasetID pasujące do wyrażenia regularnego (używać.\\ * do dopasowania wszystkich datasetID s dla zestawów danych w sieci) .
    
Część XML generowana przez GenerateDatasetsXml dla każdego zbioru danych zawiera:
    
    * A datasetID który jest EDDGrid jest datasetID plus "\\ _ Asatable".
    * Nowe podsumowanie atrybut globalny, który jest EDDGrid streszczenie plus nowy akapit pierwszy opisujący, czym jest ten zbiór danych.
    * Nowy atrybut globalny tytułu, który jest EDDGrid Tytuł plus ", (Jako tabela) ".
    * Nowy atrybut globalny maxAxis0 o wartości 10.
#### Tabela EDDFrom EDDGrid szkielet XML{#eddtablefromeddgrid-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromEDDGrid" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromEDDGrid, this calls lowUpdate() of the underlying  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGrid. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataset>](#eddgrid)...&lt;/dataset> &lt;!-- 1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Any type of EDDGrid dataset.  You can even use an  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EDDGridFromERDDAP™ to access an independent EDDGrid dataset on  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this server. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### Nazwy EDDTableFromFileName{#eddtablefromfilenames} 
 [ **Nazwy EDDTableFromFileName** ](#eddtablefromfilenames) tworzy zbiór danych z informacji o grupie plików w systemie plików serwera, w tym URL dla każdego pliku, tak aby użytkownicy mogli pobrać pliki poprzez ERDDAP jest [ "files" system](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) . W przeciwieństwie do wszystkich [Pliki EDDTableFromFiles](#eddtablefromfiles) podklasy, ten typ zbioru danych nie obsługuje danych z plików.

* EDDTableFromFileName jest przydatne, gdy:
    * Masz grupę plików, które chcesz rozpowszechniać jako całe pliki, ponieważ nie zawierają one "danych" w taki sam sposób, w jaki zwykłe pliki danych mają dane. Na przykład pliki graficzne, pliki wideo, dokumenty Word, pliki arkusza kalkulacyjnego Excel, pliki prezentacji PowerPoint lub pliki tekstowe z nieustrukturyzowanym tekstem.
    * Masz grupę plików, które mają dane w formacie ERDDAP™ Nie mogę jeszcze czytać. Na przykład format binarny określony dla danego projektu.
         
#### EDDTableFromFilename Data{#eddtablefromfilenames-data} 
*    [Dane w zbiorze danych EDDTableFromFileNames](#eddtablefromfilenames-data) jest stołem, który ERDDAP™ tworzy on-the@-@ fly z informacjami o grupie lokalnych plików. W tabeli jest wiersz dla każdego pliku. Cztery specjalne atrybuty w [ datasets.xml dla tego zbioru danych](#eddtablefromfilenames-skeleton-xml) określić, które pliki zostaną włączone do tego zbioru danych:
    
##### plik Dir{#filedir} 
    *   &lt;fileDir &gt; -- Określa katalog źródłowy w systemie plików serwera z plikami dla tego zbioru danych. Pliki, które znajdują się w systemie plików serwera w&lt;fileDir &gt; pojawi się w kolumnie url tego zbioru danych w wirtualnym katalogu o nazwiehttps://*serverUrl*/erddap/files/*datasetID/*.
Na przykład, jeśli datasetID jest jplMU RSS T,
oraz&lt;fileDir &gt; is / home / data / mur /,
i ten katalog ma plik o nazwie jplMU RSS T20150103000000.png,
wtedy URL, który zostanie pokazany użytkownikom dla tego pliku będzie
        https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png.
        
Oprócz korzystania z lokalnego katalogu&lt;fileDir &gt;, można również określić adres URL strony internetowej typu zdalnego, directory-. Dotyczy to:
        
        * Niezagregowane zbiory danych w THREDDS, np.,
            https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[ 2020- 10- 21 Serwer ten nie jest już dostępny. \\] 
        * Niezagregowane zbiory danych w Hyrax , np.,
             [https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/) 
        * Większość wykazów katalogów podobnych do ApacheName
             [https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/) 
##### Z OntheFly{#fromonthefly} 
 [\\*\\** from OntheFly](#fromonthefly) -- Dla ogromnych wiader S3 (jak noaa- goes17, który ma 26 milionów plików) , może potrwać ERDDAP™ do 12 godzin, aby pobrać wszystkie informacje o zawartości wiadra (i wtedy są inne problemy) . Aby to obejść, istnieje specjalny sposób użycia&lt;fileDir &gt; w EDDTableFromFileNames zrobić zestaw danych z katalogu i nazwy plików z wiadra AWS S3. Zestaw danych nie będzie zawierał listy wszystkich katalogów i nazw plików wiadra S3, które użytkownik może przeszukiwać za pomocą żądań do zbioru danych. Ale zbiór danych uzyska nazwy katalogów i plików na -the- fly, jeśli użytkownik przemierza hierarchię katalogów z zbiorem danych "files" opcja. Pozwala to użytkownikom na przeglądanie hierarchii plików i plików z wiadra S3 za pośrednictwem zbioru danych "files" system. Aby to zrobić, zamiast podać adres URL dla wiadra S3 jako "Katalog startowy" (w GenerateDatasets Xml) lub&lt;fileDir &gt; (w datasets.xml ) , stosować:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
na przykład:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
Patrz dokumentacja [pracy z S3 Buckets w ERDDAP™ ](#working-with-aws-s3-files) , w szczególności opis konkretnego formatu, który musi być używany do URL wiadra S3. I zobacz
 [te szczegóły i przykład](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket) stosowania\\*\\*Z OntheFly.
        
##### rekursywne{#recursive} 
*   &lt;rekursywne &gt; -- Pliki w podkatalogach&lt;fileDir &gt; z nazwami, które pasują&lt;fileRegex &gt; pojawi się w tych samych podkatalogach w "files" URL jeśli&lt;recursive &gt; jest ustawiony na true. Domyślna wartość to false.
* [&lt;pathRegex &gt;] (# pathregex) -- Jeśli recursive = true, Tylko nazwy katalogów pasujące do pathRegex (domyślny = ".\\ *") zostaną przyjęte. Jeśli recursive = false, to jest ignorowane. Jest to rzadko stosowane, ale może być bardzo przydatne w nietypowych okolicznościach. (Widzisz to? [dokumentacja regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) oraz [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
##### fileRegex{#fileregex} 
*   &lt;fileReget &gt; -- Tylko nazwy plików, w których cała nazwa pliku (bez nazwy katalogu) dopasować&lt;plik Regex &gt; zostanie włączony do tego zbioru danych. Na przykład, jplMU RSS T. (Widzisz to? [dokumentacja regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) oraz [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .)   
         
##### Z nazw plików Spis treści tabeli danych{#from-file-names-data-table-contents} 
W tabeli będą kolumny z:
* Url... URL, którego użytkownicy mogą używać do pobierania pliku poprzez ERDDAP jest [ "files" system](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) .
* imię... Nazwa pliku (bez nazwy katalogu) .
* lastZmodyfikowana... Czas ostatniej modyfikacji pliku (przechowywane jako podwójne z "seconds since 1970-01-01T00:00:00Z" ) . Ta zmienna jest przydatna, ponieważ użytkownicy mogą sprawdzić, czy / kiedy zawartość danego pliku ostatnio się zmieniła. Ta zmienna jest [czas Zmienna znacznika](#timestamp-variables) , więc dane mogą pojawić się jako wartości liczbowe (sekund od 1970- 01-01T00: 00: 00Z) lub wartość String (ISO 8601: 2004 (E) format) W zależności od sytuacji.
* rozmiar -- Rozmiar pliku w bajtach, zapisany jako podwójny. Są one przechowywane jako dubles, ponieważ niektóre pliki mogą być większe niż inty pozwalają i długów nie są obsługiwane w niektórych typach plików odpowiedzi. Doubles da dokładny rozmiar, nawet dla bardzo dużych plików.
* dodaje kolumny określone przez ERDDAP™ administrator z informacjami uzyskanymi z nazwy pliku (na przykład czas związany z danymi w pliku) na podstawie dwóch atrybutów, które określa się w metadanych dla każdej dodatkowej kolumny / dataVariable :
    
    * ExtractRegex... To jest... [wyrażenie regularne](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) . Cały regex musi pasować do całej nazwy pliku (bez nazwy katalogu) . Regex musi obejmować co najmniej jedną grupę (część wyrażenia regularnego, która jest załączona przez nawiasy) które ERDDAP™ wykorzystuje do określenia, którą część nazwy pliku należy wyodrębnić, aby stać się danymi.
    * ekstrakt Grupa... To jest numer grupy przechwytującej (# 1 jest pierwszą grupą przechwytującą) w wyrażeniu regularnym. Domyślna wartość to 1. Grupa przechwytywania jest częścią wyrażenia regularnego, który jest załączony przez nawiasy.
    
Oto dwa przykłady:
```
            <dataVariable>
                <sourceName>time</sourceName>
                <destinationName>time</destinationName>
                <dataType>String</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST(.{14})\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="units">yyyyMMddHHmmss</att>
                </addAttributes>
            </dataVariable>
```
```
            <dataVariable>
                <sourceName>day</sourceName>
                <destinationName>day</destinationName>
                <dataType>int</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST.{6}(..).{6}\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="ioos\\_category">Time</att>
                </addAttributes>
            </dataVariable> 
```
W przypadku zmiennej czasu, jeśli plik ma nazwę jplMU RSS T20150103000000.png, extractRegex będzie pasować do nazwy pliku, wyodrębnić znaki, które pasują do pierwszej grupy przechwytywania ("20150103000000") jako dataType = String, a następnie użyć [jednostki odpowiednie do czasów strun](#string-time-units) aby przetworzyć struny do wartości danych czasowych (2015- 01- 03T00: 00: 00Z) .

W przypadku zmiennej dziennej, jeśli plik ma nazwę jplMU RSS T20150103000000.png, extractRegex będzie pasować do nazwy pliku, wyodrębnić znaki, które pasują do pierwszej grupy przechwytywania ("03") jako [&lt;Data Typ &gt;] (# datatype) \\ = int, dając wartość danych 3.
        
#### Inne informacje{#other-information} 
* Nie.&lt;updateEveryNMillis &gt;] (# updateeverynmillis) -- Ten typ zbioru danych nie potrzebuje i nie może używać&lt;updateEveryNMillis &gt; tag, ponieważ informacje podawane przez EDDTableFromFileNames są zawsze doskonale aktualizowane, ponieważ ERDDAP™ Zapyta system plików, aby odpowiedzieć na każde żądanie o dane. Nawet jeśli istnieje ogromna liczba plików, podejście to powinno działać dość dobrze. Odpowiedź może być powolna, jeśli istnieje ogromna liczba plików, a zestaw danych nie został zapytany przez jakiś czas. Ale przez kilka minut po tym, system operacyjny przechowuje informacje w pamięci podręcznej, więc odpowiedzi powinny być bardzo szybkie.
     
* Można użyć [GenerateDatasets Program Xml](#generatedatasetsxml) do datasets.xml kawałek dla tego typu zbioru danych. Możesz dodać / zdefiniować dodatkowe kolumny z informacjami uzyskanymi z nazwy pliku, jak pokazano powyżej.
     
#### EDDTableFromFileName szkielet XML{#eddtablefromfilenames-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromFileNames" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileDir>](#eddtablefromfilenames-data)...&lt;/fileDir>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;recursive>](#eddtablefromfilenames-data)...&lt;/recursive>  &lt;!-- true or false (the default) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileNameRegex>](#eddtablefromfilenames-data)...&lt;/fileNameRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include [&lt;dataType>](#datatype) tag. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Pliki EDDTableFromFiles{#eddtablefromfiles} 
 [ **Pliki EDDTableFromFiles** ](#eddtablefromfiles) jest superklasą wszystkich zajęć z plików EDDTableFrom. Nie można bezpośrednio używać plików EDDTableFromFiles. Zamiast tego, użyj podklasy plików EDDTableFromFiles do obsługi określonego typu pliku:

*    [Pliki EDDTableFromAsciiFiles](#eddtablefromasciifiles) dane zagregowane z plików tabelarycznych ASCII oddzielonych zespołami, tabelami, średnikami lub spacjami.
*    [Pliki EDDTableFromAudioName](#eddfromaudiofiles) agregaty danych z grupy lokalnych plików audio.
*    [Tabela EDDFrom Pliki AwsXmlFiles](#eddtablefromawsxmlfiles) dane agregatów z zestawu Automatic Weather Station (AWS) Pliki XML.
*    [Pliki EDDTableFromColumnarasciiFiles](#eddtablefromcolumnarasciifiles) agregaty danych z tabelarycznych plików danych ASCII z kolumnami danych o ustalonej szerokości.
*    [Tabela EDDFrom Hyrax Pliki](#eddtablefromhyraxfiles)   (ZANIECHANE) agregaty danych z kilkoma zmiennymi, z których każda ma wspólne wymiary (na przykład, czas, wysokość (lub głębokość) , szerokość i długość geograficzna) , i służył przez [ Hyrax   OPeNDAP serwer](https://www.opendap.org/software/hyrax-data-server) .
*    [Pliki EDDTableFromInvalidCRAFiles](#eddtablefrominvalidcrafiles) dane zagregowane z NetCDF   (v3 lub v4)   .nc pliki, które korzystają z określonego, niepoprawnego wariantu karty DSG CF (CRA) pliki. Chociaż ERDDAP™ obsługuje ten typ pliku, jest to nieprawidłowy typ pliku, którego nikt nie powinien używać. Grupy, które obecnie korzystają z tego typu plików, są zdecydowanie zachęcane do korzystania z ERDDAP™ generowanie ważnych plików CF DSG CRA i zaprzestanie korzystania z tych plików.
*    [Pliki EDDTableFromJsonlCSVFiles](#eddtablefromjsonlcsvfiles) dane zagregowane z [JSON Linie plików CSV](https://jsonlines.org/examples/) .
*    [Pliki EDDTableFromMultidimNc@@](#eddtablefrommultidimncfiles) dane zagregowane z NetCDF   (v3 lub v4)   .nc   (lub [ .nc ml](#ncml-files) ) pliki z kilkoma zmiennymi, z których każdy ma wspólne wymiary (na przykład, czas, wysokość (lub głębokość) , szerokość i długość geograficzna) .
*    [Pliki EDDTableFromNc@@](#eddtablefromncfiles) dane zagregowane z NetCDF   (v3 lub v4)   .nc   (lub [ .nc ml](#ncml-files) ) pliki z kilkoma zmiennymi, z których każdy ma wspólne wymiary (na przykład, czas, wysokość (lub głębokość) , szerokość i długość geograficzna) . Dobrze jest nadal używać tego typu zbioru danych dla istniejących zbiorów danych, ale dla nowych zbiorów danych zalecamy stosowanie EDDTableFromMultidimNcFiles zamiast.
*    [Pliki EDDTableFromNcCFFiles](#eddtablefromnccffiles) dane zagregowane z NetCDF   (v3 lub v4)   .nc   (lub [ .nc ml](#ncml-files) ) plików, które używają jednego z formatów plików określonych przez [CF Geometrie do pobierania próbek dyskretnych (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) konwencje. Ale dla plików wykorzystujących jeden z wielowymiarowych wariantów CF DSG, użyj [Pliki EDDTableFromMultidimNc@@](#eddtablefrommultidimncfiles) Zamiast tego.
*    [Pliki EDDTableFromNccsvName](#eddtablefromnccsvfiles) dane zagregowane z [NCSSV](/docs/user/nccsv-1.00) Pliki ASCII .csv.
*    [Pliki EDDTableFromParquetFiles](#eddtablefromparquetfiles) obsługuje dane z [Parkiet](https://parquet.apache.org/) .
*    [Pliki EDDTableFromThreddsFiles](#eddtablefromthreddsfiles)   (ZANIECHANE) agregaty danych z plików o kilku zmiennych o wspólnych wymiarach obsługiwanych przez [TRZECIA OPeNDAP serwer](https://www.unidata.ucar.edu/software/tds/) .
*    [Tabela EDDFrom WFS Pliki](#eddtablefromwfsfiles)   (ZANIECHANE) tworzy lokalną kopię wszystkich danych z ArcGIS MapServer WFS serwer więc dane mogą być szybko ponownie podawane do ERDDAP™ użytkowników.

Obecnie nie są obsługiwane żadne inne typy plików. Ale zazwyczaj stosunkowo łatwo jest dodać wsparcie dla innych typów plików. Skontaktuj się z nami, jeśli masz prośbę. Lub, jeśli Twoje dane są w starym formacie pliku, od którego chciałbyś się odsunąć, zalecamy konwersję plików do NetCDF v3 .nc pliki (oraz szczególnie .nc pliki z [CF Geometrie do pobierania próbek dyskretnych (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Kontyguous Ragged Archive data structure -- ERDDAP™ może pobrać dane z nich bardzo szybko) . NetCDF jest szeroko wspieranym, formacie binarnym, umożliwia szybki losowy dostęp do danych i jest już obsługiwany przez ERDDAP .

#### Dane plików FromFiles{#fromfiles-details} 
Poniższe informacje dotyczą wszystkich podklas plików EDDTableFromFiles.
##### Agregacja{#aggregation} 
Ta klasa agreguje dane z lokalnych plików. Każdy plik posiada (stosunkowo) mała tabela danych.
    * Wynikający z tego zbiór danych pojawia się jakby wszystkie tabele pliku zostały połączone (wszystkie wiersze danych z pliku # 1, plus wszystkie wiersze z pliku # 2,...) .
    * Pliki nie muszą mieć wszystkich podanych zmiennych. Jeśli dany plik nie ma określonej zmiennej, ERDDAP™ w razie potrzeby doda brakujące wartości.
    * Zmienne we wszystkich plikach MUSI mieć te same wartości dla [ add\\_offset ](#scale_factor) , [ missing\\_value ](#missing_value) , [\\ _ Wypełnij Wartość](#missing_value) , [ scale\\_factor ](#scale_factor) oraz [jednostki](#units) atrybuty (jeżeli istnieje) . ERDDAP™ sprawdzają, ale jest to niedoskonały test -- jeśli istnieją różne wartości, ERDDAP nie wie, co jest poprawne i dlatego które pliki są nieważne. Jeśli jest to problem, może być w stanie użyć [NcML](#ncml-files) lub [ NCO ](#netcdf-operators-nco) by rozwiązać problem.
         
##### Pliki skompresowane{#compressed-files} 
Pliki danych źródłowych dla wszystkich podklas EDDTableFromFiles mogą być skompresowane zewnętrznie (np., .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 lub .Z) . Patrz [Dokumentacja plików skompresowanych zewnętrznie](#externally-compressed-files) .
     
##### Informacje o pliku buforowym{#cached-file-information-1} 
* Kiedy plik EDDTableFromFiles jest po raz pierwszy wczytywany, EDDTableFromFiles odczytuje informacje ze wszystkich odpowiednich plików i tworzy tabele (jeden wiersz dla każdego pliku) z informacjami o każdym ważnym pliku i każdym "złym" (inne lub nieprawidłowe) plik.
    * Tabele są również przechowywane na dysku, jak NetCDF v3 .nc pliki w *bigParentDirectory* / zbiór danych / *last2CharsOfDatasetiID* / * datasetID * / w plikach o nazwie:
dirTable .nc   (która posiada listę unikalnych nazw katalogów) ,
plik Tabela .nc   (który posiada tabelę z informacjami każdego ważnego pliku) ,
Pliki badFiles .nc   (który trzyma tabelę z każdym złym pliku informacji) .
    * Aby przyspieszyć dostęp do zbioru danych EDDTableFromFiles (ale kosztem wykorzystania większej ilości pamięci) , you can use
[&lt;fileTableInMemory &gt; true&lt;/ FileTableInMemory &gt;] (# filetableinmemory)   
powiedzieć ERDDAP™ do przechowywania kopii tabel informacyjnych plików w pamięci.
    * Kopia tabel informacyjnych na dysku jest również przydatna, gdy ERDDAP™ jest wyłączony i ponownie uruchomiony: zapisuje EDDTable FromFiles z konieczności ponownego odczytu wszystkich plików danych.
    * Kiedy zestaw danych jest przeładowany, ERDDAP™ musi tylko odczytać dane w nowych plikach i plikach, które uległy zmianie.
    * Jeśli plik ma inną strukturę niż inne pliki (na przykład inny typ danych dla jednej ze zmiennych lub inna wartość dla " [jednostki](#units) "atrybut) , ERDDAP dodaje plik do listy "złych" plików. Informacje o problemie z plikiem zostaną zapisane do *bigParentDirectory* / logs / log.txt file.
    * Nie powinieneś nigdy usuwać ani pracować z tymi plikami. Jednym z wyjątków jest: jeśli nadal dokonujesz zmian w zbiorze danych datasets.xml konfiguracja, możesz usunąć te pliki, aby wymusić ERDDAP™ aby ponownie przeczytać wszystkie pliki, ponieważ pliki będą czytane / interpretowane inaczej. Jeśli kiedykolwiek trzeba usunąć te pliki, można to zrobić, gdy ERDDAP™ Ucieka. (Następnie ustawić [bandera](/docs/server-admin/additional-information#set-dataset-flag) aby przeładować zestaw danych jak najszybciej.) Jednakże, ERDDAP™ zwykle zauważa, że datasets.xml informacja nie pasuje do pliku Informacje o tabeli i automatycznie usuwa tabele plików.
    * Jeśli chcesz zachęcić ERDDAP™ aktualizacja przechowywanych danych (na przykład, jeśli po prostu dodano, usunięto lub zmieniono niektóre pliki do katalogu danych) , użyć [system flag](/docs/server-admin/additional-information#flag) do siły ERDDAP™ aby zaktualizować informacje o pliku buforowanym.
         
##### Wnioski dotyczące obsługi{#handling-requests-1} 
*    ERDDAP™ żądania dotyczące danych tabelarycznych mogą nakładać ograniczenia na każdą zmienną.
    * W przypadku przetwarzania prośby klienta o dane, EDDTableFromFiles może szybko zajrzeć do tabeli z poprawnymi informacjami, aby sprawdzić, które pliki mogą mieć odpowiednie dane. Na przykład, jeśli każdy plik źródłowy posiada dane dla jednej boji lokalizacji, EDDTableFromFiles może bardzo skutecznie określić, które pliki mogą mieć dane w danym przedziale długości geograficznej i szerokości geograficznej.
    * Ponieważ właściwa tabela informacji o pliku zawiera minimalną i maksymalną wartość każdej zmiennej dla każdego ważnego pliku, EDDTableFromFiles może często obsługiwać inne pytania dość skutecznie. Na przykład, jeśli niektóre boje nie mają czujnika ciśnienia powietrza, a klient żąda danych dla AirPressure&#33; = NaN, EDDTableFromFiles może skutecznie określić, które boje mają dane ciśnienia powietrza.
         
##### Aktualizacja informacji o pliku w zakładce{#updating-the-cached-file-information-1} 
Ilekroć zbiór danych jest ponownie wczytywany, informacje o pliku buforowanym są aktualizowane.
    
* Zestawienie danych jest okresowo przeładowywane zgodnie z ustaleniem&lt;reloadEveryNMinutes &gt; in the dataset 's information in datasets.xml .
* Zestaw danych jest przeładowany tak szybko, jak to możliwe, kiedy tylko to możliwe ERDDAP™ wykrywa, że dodano, usunięto, [touch 'd](https://en.wikipedia.org/wiki/Touch_(Unix) ) (aby zmienić ostatni plik Czas zmodyfikowany) albo zmienił dane.
* Zestaw danych jest przeładowany tak szybko, jak to możliwe, jeśli używasz [system flag](/docs/server-admin/additional-information#flag) .

Kiedy zbiór danych jest przeładowany, ERDDAP™ porównuje aktualnie dostępne pliki do tabeli informacyjnej pliku buforowanego. Nowe pliki są odczytywane i dodawane do odpowiedniej tabeli plików. Pliki, które już nie istnieją, są usuwane z poprawnej tabeli plików. Pliki, w których zmieniono znacznik czasu pliku, są odczytywane i aktualizowane. Nowe tabele zastępują stare tabele w pamięci i na dysku.
     
##### Złe pliki{#bad-files-1} 
Tabela złych plików i powody, dla których te pliki zostały uznane za złe (uszkodzony plik, brakujące zmienne, nieprawidłowe wartości osi itp.) jest e-mail Wszystko Na adres e-mail (Prawdopodobnie ty.) za każdym razem, gdy zestaw danych jest przeładowany. Należy jak najszybciej wymienić lub naprawić te pliki.
     
##### Brak zmiennych{#missing-variables-1} 
Jeśli niektóre pliki nie mają niektórych dataVariable s zdefiniowane w zbiorze danych datasets.xml W porządku. Kiedy EDDTableFromFiles przeczyta jeden z tych plików, będzie działać tak, jakby plik miał zmienną, ale ze wszystkimi brakującymi wartościami.
     
##### Dane w czasie rzeczywistym{#near-real-time-data} 
* EDDTableFromFiles traktuje wnioski o bardzo aktualne dane jako przypadek szczególny. Problem: Jeśli pliki tworzące zbiór danych są często aktualizowane, jest prawdopodobne, że zestaw danych nie będzie aktualizowany za każdym razem, gdy plik zostanie zmieniony. Więc EDDTableFromFiles nie będzie wiedział o zmienionych plikach. (Możesz użyć [system flag](/docs/server-admin/additional-information#flag) , ale to może prowadzić do ERDDAP™ Przeładowanie zestawu danych niemal stale. Więc w większości przypadków nie zalecamy tego.) Zamiast tego EDDTableFromFiles zajmuje się tym przez następujący system: Kiedy ERDDAP™ otrzymuje wniosek o dane w ciągu ostatnich 20 godzin (na przykład, 8 godzin temu do Now) , ERDDAP™ będzie przeszukiwać wszystkie pliki, które posiadają jakiekolwiek dane w ciągu ostatnich 20 godzin. Tak więc, ERDDAP™ nie musi mieć doskonale up- to- date danych dla wszystkich plików w celu znalezienia najnowszych danych. Należy nadal ustawić [&lt;przeładowanie Każda minuta &gt;] (# reloadeverynminutes) do stosunkowo małej wartości (na przykład, 60) Ale nie musi być malutkie. (na przykład, 3) .
     
    *    **Nie zaleca się** organizacja danych w czasie bliskim-rzeczywistym w plikach: Jeśli na przykład masz zbiór danych, który przechowuje dane dla wielu stacji (albo boi, albo trajektorii...) przez wiele lat, można zorganizować pliki tak, że na przykład, istnieje jeden plik na stację. Ale za każdym razem, gdy pojawiają się nowe dane dla stacji, trzeba przeczytać duży stary plik i napisać duży nowy plik. I kiedy ERDDAP™ ponownie wczytuje zbiór danych, zauważa, że niektóre pliki zostały zmodyfikowane, więc odczytuje je całkowicie. To nieefektywne.
         
    *    **Zalecane** organizacja danych w czasie bliskim-rzeczywistym w plikach: Przechowywanie danych w kawałkach, na przykład, wszystkie dane dla jednej stacji / boi / trajektorii przez jeden rok (lub jeden miesiąc) . Potem, kiedy pojawi się nowa data, tylko plik z tym roku (lub miesiąc) Wpływ na dane.
        
        * Najlepiej: Stosowanie NetCDF v3 .nc pliki o nieograniczonym wymiarze (czas) . Następnie, aby dodać nowe dane, można po prostu dołączyć nowe dane bez konieczności odczytu i przepisania całego pliku. Zmiana następuje bardzo efektywnie i zasadniczo atomicznie, więc plik nie jest nigdy w stanie niespójnym.
        * W przeciwnym razie: Jeśli nie / nie można użyć .nc pliki o nieograniczonym wymiarze (czas) , następnie, kiedy trzeba dodać nowe dane, trzeba przeczytać i przepisać cały dotknięty plik (Mam nadzieję, że mały, bo ma tylko rok. (lub miesiąc) wartość danych) . Na szczęście wszystkie pliki z poprzednich lat (lub miesięcy) bo ta stacja pozostanie niezmieniona.
        
W obu przypadkach ERDDAP™ ponownie wczytuje zbiór danych, większość plików nie ulegnie zmianie; tylko kilka małych plików uległo zmianie i wymaga odczytu.
         
##### Katalogi{#directories-1} 
Pliki mogą być w jednym katalogu lub w katalogu i jego podkatalogach (rekursywnie) . Jeśli istnieje duża liczba plików (na przykład, &gt; 1 000) , system operacyjny (a tym samym Pliki EDDTableFromFiles) będzie działać znacznie efektywniej, jeśli przechowujesz pliki w serii podkatalogów (jeden na rok lub jeden na miesiąc dla zbiorów danych z bardzo częstymi plikami) tak, aby nigdy nie było dużej liczby plików w danym katalogu.
     
##### Zdalne katalogi i żądania zakresu HTTP{#remote-directories-and-http-range-requests-1} 
*    **Zdalne katalogi i żądania zakresu HTTP**   (AKA Byte Serving, Zapytania o zakres bajtów) --
     EDDGrid Pliki FromNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles i EDDTableFromNcCFFiles mogą czasami służyć do obsługi danych z .nc pliki na zdalnych serwerach i dostęp przez HTTP, jeśli serwer obsługuje [Obsługa bajtów](https://en.wikipedia.org/wiki/Byte_serving) za pośrednictwem żądań zakresu HTTP (mechanizm HTTP do obsługi bajtów) . Jest to możliwe, ponieważ netcdf- java (które ERDDAP™ wykorzystanie do odczytu .nc pliki) obsługuje odczyt danych z zdalnego .nc pliki za pośrednictwem żądań zakresu HTTP.
    
     **Nie rób tego&#33;**   
Zamiast tego, użyj [&lt;cacheFromUrl &gt; system] (# cachefromurl) .
    
##### CacheFromUrl{#cachefromurl} 
* [ ** &lt;cacheFromUrl &gt; ** ] (# cachefromurl) -
Wszystkie EDDGrid Pliki FromFiles i wszystkie pliki EDDTableFromFiles obsługują zestaw tagów, które mówią ERDDAP™ do pobierania i przechowywania kopii wszystkich plików zdalnego zbioru danych lub pamięci podręcznej kilku plików (pobrane w razie potrzeby) . **Jest to niezwykle przydatna cecha.** 
    * W&lt;cacheFromUrl &gt; tag pozwala określić adres URL z listą zdalnych plików z listy zdalnych plików.
        
        * Niezagregowane zbiory danych w THREDDS, np.,
            https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[ 2020- 10- 21 Serwer ten nie jest już dostępny. \\] 
        * Niezagregowane zbiory danych w Hyrax , np.,
             [https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/) 
        * Większość wykazów katalogów podobnych do ApacheName
             [https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/) 
        * S3 wiadra, np.
             [https://noaa-goes17.s3.us-east-1.amazonaws.com/](https://noaa-goes17.s3.us-east-1.amazonaws.com/)   
Może to jednak wymagać konta AWS i więcej konfiguracji.
Patrz [pracy z S3 Buckets w ERDDAP™ ](#working-with-aws-s3-files) .
Ponadto, zazwyczaj nie trzeba używać cache FromUrl z plikami w wiadrach S3, jeśli pliki są plikami ASCII (np. .csv) , ponieważ ERDDAP™ może skutecznie odczytać dane z wiadra bezpośrednio poprzez strumień.
        
         ERDDAP™ będzie kopiować lub buforować te pliki w zbiorze danych&lt;fileDir &gt; katalog. Jeśli potrzebujesz wsparcia dla innego typu listy zdalnych plików (np. FTP) Proszę wysłać swoją prośbę do Chrisa. John w Noa.gov.
        
        * Wartość domyślna&lt;cacheFromUrl &gt; tag jest null. Jeśli nie podasz wartości dla&lt;cacheFromUrl &gt; tag, system kopiowania / bufora nie będzie używany do tego zbioru danych.
        * Jeśli zbiór danych&lt;fileReget &gt; ustawienie jest czymś innym niż. ERDDAP™ będzie pobierał tylko pliki pasujące do pliku Regex.
        * Jeśli zbiór danych&lt;recursive &gt; ustawienie jest prawdziwe i pliki zdalne są w podkatalogach, ERDDAP™ będzie szukać w zdalnych podkatalogach, które pasują do zbioru danych [&lt;pathRegex &gt;] (# pathregex) , tworzyć tę samą strukturę katalogu lokalnie, i umieścić lokalne pliki w tych samych podkatalogach.
        * W GenerateDatasets Xml, jeśli podasz&lt;cacheFromUrl &gt; wartość, Generate Zestawy danych Xml stworzy lokalne&lt;fileDir &gt; katalog i skopiuj do niego 1 zdalny plik. GenerateDatasets Następnie Xml wygeneruje datasets.xml kawałek na podstawie tej próbki pliku (określić próbkę Plik = nic) .
        * Jeśli źródło danych jest zdalne ERDDAP™ , [ EDDGrid FromErddap](#eddfromerddap) lub [EDDTableFromErddap](#eddfromerddap) zamiast&lt;cacheFromUrl &gt;. W ten sposób, twój lokalny ERDDAP™ wydaje się mieć zbiór danych, ale nie będzie musiał przechowywać żadnych danych lokalnie. Jedyny powód do użycia&lt;cacheFromUrl &gt; do uzyskania danych z pilota ERDDAP™ jest kiedy masz jakiś inny powód, dla którego chcesz mieć lokalną kopię plików danych. W takim przypadku:
            * Ten zbiór danych będzie próbował zapisać się do zbioru danych na zdalnym ERDDAP aby zmiany w tym zbiorze danych nazywały się flagą tego zbioru danych Url, co powoduje, że ten lokalny zestaw danych przeładowuje i pobiera zmienione pliki zdalne. Tak więc, lokalny zbiór danych będzie up- to- date bardzo szybko po wprowadzeniu zmian do zdalnego zbioru danych.
            * Powinieneś wysłać e-mail do administratora pilota ERDDAP™ o datasets.xml dla zdalnego zbioru danych tak, że można dokonać zbioru danych w lokalnym ERDDAP™ wygląda jak zestaw danych w pilocie ERDDAP .
        * Jeśli źródło danych jest zdalne ERDDAP™ , lokalny zestaw danych spróbuje zapisać się do zdalnego zbioru danych.
            * Jeśli subskrypcja się powiedzie, kiedykolwiek zdalny ERDDAP ponownie ładuje i posiada nowe dane, skontaktujemy się z flagURL dla tego zbioru danych, co spowoduje przeładowanie i pobranie nowych i / lub zmienionych plików danych.
            * Jeśli subskrypcja się nie powiedzie (Z jakiegokolwiek powodu) lub jeśli po prostu chcesz upewnić się, że lokalny zestaw danych jest up- to- date, możesz ustawić [bandera](/docs/server-admin/additional-information#flag) dla lokalnego zbioru danych, więc przeładuje się, więc będzie sprawdzał nowe i / lub zmienione pliki danych zdalnych.
        * Jeśli źródło danych nie jest zdalne ERDDAP : zbiór danych będzie sprawdzał nowe i / lub zmienione pliki zdalne za każdym razem, gdy się przeładuje. Zazwyczaj jest to kontrolowane przez [&lt;przeładowanie Każda minuta &gt;] (# reloadeverynminutes) . Ale jeśli wiesz, kiedy są nowe pliki zdalne, można ustawić [bandera](/docs/server-admin/additional-information#flag) dla lokalnego zbioru danych, więc przeładuje i sprawdzi nowe i / lub zmienione pliki danych zdalnych. Jeśli dzieje się to rutynowo o określonej porze dnia (np. o 7 rano) , you can make a cron job to use curl kontaktować się z flagą URL dla tego zbioru danych, więc będzie przeładować i sprawdzić nowe i / lub zmienione pliki danych zdalnych.
    * W&lt;cacheSizeGB &gt; tag określa rozmiar lokalnego bufora. Prawdopodobnie trzeba tego używać tylko przy pracy z systemami pamięci masowej w chmurze, jak [Amazon S3](https://aws.amazon.com/s3/) który jest powszechnie stosowanym systemem przechowywania, który jest częścią [Amazon Web Services (AWS) ](https://aws.amazon.com/) . Domyślna wartość to -1.
        * Jeśli wartość jest&lt;= 0 (np. wartość domyślna -1) ,
             ERDDAP™ będzie pobierać i utrzymywać **kompletna kopia** wszystkich plików zdalnego zbioru danych w zbiorze danych&lt;fileDir &gt;.
            * Jest to ustawienie zalecane w miarę możliwości.
            * Za każdym razem, gdy zestaw danych jest ponownie wczytywany, porównuje nazwy, rozmiary i lastZmodyfikowane czasy zdalnych plików i lokalnych plików, a także pobiera wszelkie pliki zdalne, które są nowe lub uległy zmianie.
            * Jeśli plik znajdujący się na zdalnym serwerze zniknie, ERDDAP™ nie usunie odpowiedniego pliku lokalnego (w przeciwnym razie, jeśli coś było chwilowo nie tak z zdalnym serwerem, ERDDAP™ może usunąć niektóre lub wszystkie lokalne pliki&#33;) .
            * Z tego ustawienia, zwykle będzie ustawić&lt;updateEveryNMillis &gt; do -1, ponieważ zbiór danych jest świadomy, kiedy skopiował nowe pliki danych na miejsce.
        * Jeżeli wartość jest &gt; 0,
             ERDDAP™ będzie pobierać pliki z zdalnego zbioru danych w razie potrzeby do lokalnego **cache** (w zbiorze danych)&lt;fileDir &gt;) o wielkości progowej określonej liczby GB.
            * Cache musi być wystarczająco duży, aby posiadać co najmniej kilka plików danych.
            * Ogólnie rzecz biorąc, im większy pamięci podręcznej, tym lepiej, ponieważ następny żądany plik danych będzie bardziej prawdopodobne, że będzie już w pamięci podręcznej.
            * Produkt Caching należy stosować tylko wtedy, gdy: ERDDAP™ działa na serwerze przetwarzania w chmurze (np. instancja obliczenia AWS) i zdalne pliki w systemie pamięci masowej w chmurze (np. AWS S3) .
            * Gdy przestrzeń dysku użyta przez pliki lokalne przekracza wartość bufora SizeGB, ERDDAP™ wkrótce (może nie natychmiast) Usuń niektóre pliki buforowane (obecnie, w oparciu o najmniej ostatnio używane (LRU) algorytm) dopóki przestrzeń dysku użyta przez pliki lokalne&lt;0,75\\ * cacheSizeGB ("cel") . Tak, są przypadki, w których LRU wykonuje bardzo źle -- nie ma idealnego algorytmu.
            *    ERDDAP™ nigdy nie spróbuje usunąć pliku buforowanego, który ERDDAP™ zaczął używać w ciągu ostatnich 10 sekund. Jest to niedoskonały system do radzenia sobie z systemem buforowym, a system czytnika plików danych jest tylko luźno zintegrowany. Z powodu tej zasady, ERDDAP™ może nie być w stanie usunąć wystarczającej ilości plików, aby osiągnąć swój cel, w którym to przypadku będzie wydrukować OSTRZEŻENIE do pliku log.txt, a system będzie tracić dużo czasu próbując przycinać cache, i jest możliwe, że rozmiar plików w cache może znacznie przekroczyć cacheSizeGB. Jeśli to kiedykolwiek nastąpi, użyj większego ustawienia CacheSizeGB dla tego zbioru danych.
            * Obecnie ERDDAP™ nigdy nie sprawdza, czy zdalny serwer posiada nowszą wersję pliku znajdującego się w lokalnym pamięci podręcznej. Jeśli potrzebujesz tej funkcji, napisz do Chrisa. John w Noa.gov.
        * Chociaż użycie tych samych nazw znaczników może oznaczać, że system kopiowania i system bufora używają tego samego systemu bazowego, to nie jest to prawidłowe.
            * System kopiowania aktywnie uruchamia zadania taskThread do pobierania nowych i zmienianych plików za każdym razem, gdy zestaw danych jest ponownie załadowany. Tylko pliki, które zostały faktycznie skopiowane do lokalnego katalogu są dostępne za pośrednictwem ERDDAP™ zestaw danych.
            * System cache otrzymuje listę zdalnych plików za każdym razem, gdy zestaw danych jest przeładowany i udaje, że wszystkie te pliki są dostępne za pośrednictwem ERDDAP™ zestaw danych. Co ciekawe, wszystkie zdalne pliki pojawiają się nawet w zbiorze danych / plików / stron internetowych i są dostępne do pobrania (choć być może tylko po opóźnieniu, podczas gdy plik jest najpierw pobierany z zdalnego serwera do lokalnego bufora.) 
        * Dane, które używają cacheSizeGB mogą korzystać z [nTreats](#nthreads) ustawienia większe niż 1, ponieważ pozwoli to na pobranie więcej niż 1 pliku zdalnego na raz.
    * W&lt;cachePartialPathRegex &gt; tag jest rzadko używanym znacznikiem, który może określić alternatywę dla zbioru danych [&lt;pathRegex &gt;] (# pathregex) . Domyślnie jest zerowa.
        * Używaj tego tylko wtedy, gdy kopiujesz cały zbiór danych za pomocą domyślnej&lt;cacheSizeGB &gt; wartość -1.&lt;cacheSizeGB &gt; wartości &gt; 1, to będzie ignorowane, ponieważ jest nonsensical.
        * Patrz [dokumentacja&lt;pathRegex &gt;] (# pathregex) wskazówki dotyczące konstrukcji regeksu.
        * Jeśli jest to podane, będzie on używany za każdym razem, gdy zestaw danych jest ponownie załadowany, z wyjątkiem pierwszego wczytywania zestawu danych na początku miesiąca.
        * Jest to przydatne, gdy zdalny zbiór danych jest przechowywany w labiryncie podkatalogów i gdy ogromna większość tych plików rzadko, jeśli kiedykolwiek, zmienia się. (&lt;kaszel &gt; NASA&lt;kaszel &gt;) Można na przykład określić&lt;cachePartialPathRegex &gt;, który tylko pasuje do bieżącego roku lub bieżącego miesiąca. Te regexes są bardzo trudne do określenia, ponieważ wszystkie częściowe i pełne nazwy ścieżki muszą pasować do&lt;cachePartialPathReget &gt; i dlatego, że&lt;cachePartialPathRegex &gt; musi pracować z zdalnymi adresami URL i katalogami lokalnymi. Prawdziwym przykładem jest:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
Próbka URL powyżej posiada pliki w podkatalogach w oparciu o rok (np. 2018 r.) i dzień roku (np. 001, 002,..., 365 lub 366) .
Należy pamiętać, że&lt;cachePartialPathRegex &gt; zaczyna się od.
następnie posiada określony podkatalog, który jest wspólny dla zdalnych adresów URL i katalogów lokalnych, np. / v4\\ .1 /
następnie ma serię zagnieżdżonych grup przechwytywania, gdzie pierwsza opcja jest nic
a druga opcja jest określoną wartością.
            
Powyższy przykład będzie pasował tylko do katalogów przez drugie 10 dni 2018 r., np.:
            https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[ 2020- 10- 21 Serwer ten nie jest już dostępny. \\]   
i dzień 011, 012,..., 019.
             (Widzisz to? [dokumentacja regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) oraz [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .)   
Jeśli potrzebujesz pomocy w tworzeniu&lt;cachePartialPathRegex &gt;, proszę wysłać e-mail&lt;cacheFromUrl &gt; do Chrisa. John w Noa.gov.
            
        * Wspólne podejście: Jeśli chcesz użyć&lt;cachePartialPathRegex &gt;, nie używać go początkowo, ponieważ chcesz ERDDAP™ aby pobrać wszystkie pliki początkowo. Po ERDDAP™ pobrał wszystkie pliki, dodał je do zbioru danych datasets.xml .
             
##### Tysiące plików{#thousands-of-files} 
Jeśli twój zbiór danych ma wiele tysięcy plików, ERDDAP™ mogą być powolne w odpowiedzi na wnioski o dane z tego zbioru danych. Są tu dwie kwestie:
 

1. Liczba plików w katalogu.
Wewnętrznie, ERDDAP™ działa z tą samą prędkością niezależnie od tego, czy n pliki są w jednym katalogu, czy są rozproszone w kilku katalogach.
     
Ale jest problem: Im więcej plików w danym katalogu, tym wolniej system operacyjny zwraca listę plików w katalogu (na plik) do ERDDAP . Czas reakcji może być O (n log n) . Trudno powiedzieć, ile plików w jednym katalogu jest za dużo, ale 10 000 to pewnie za dużo. Więc jeśli konfiguracja generuje wiele plików, rekomendacja tutaj może być: umieścić pliki w logicznie zorganizowanych podkatalogach (np. stacja lub stacja / rok) .
    
Inny powód do korzystania z podkatalogów: jeśli użytkownik chce korzystać ERDDAP jest "files" system, aby znaleźć nazwę najstarszego pliku dla stacji X, jest szybszy i wydajniejszy, jeśli pliki są w podkatalogach stacji / roku, ponieważ o wiele mniej informacji musi być przekazywane.
    
2. Całkowita liczba plików.
Dla zbiorów danych tabelarycznych, ERDDAP™ śledzi zakres wartości dla każdej zmiennej w każdym pliku. Kiedy użytkownik składa wniosek, ERDDAP™ musi odczytać wszystkie dane ze wszystkich plików, które mogą mieć dane pasujące do prośby użytkownika. Jeśli użytkownik prosi o dane z określonego czasu (np. jeden dzień lub miesiąc) Więc... ERDDAP™ Nie będziesz musiał otwierać zbyt wielu plików w zbiorze danych. Ale są ekstremalne przypadki, w których prawie każdy plik może mieć dopasowane dane (np., gdy temperatura wody = 13.2C) . Ponieważ to trwa ERDDAP™ trochę czasu (częściowo czas wyszukiwania na dysku twardym, częściowo czas odczytania nagłówka pliku) aby otworzyć dany plik (i więcej, jeśli jest wiele plików w katalogu) , istnieje znacząca kara czasu, jeśli całkowita liczba plików, które ERDDAP™ Musi być bardzo duży. Nawet otwarcie 1000 plików wymaga czasu. Więc są korzyści, aby okresowo konsolidować codzienne pliki w większe kawałki (np. 1 stacja na 1 rok) . Rozumiem, że może pan nie chcieć tego robić z różnych powodów, ale prowadzi to do znacznie szybszych reakcji. W skrajnych przypadkach (np. mam do czynienia z zbiorem danych GTSPP, który ma ~ 35 milionów plików źródłowych) , obsługa danych z ogromnej liczby plików źródłowych jest niepraktyczna, ponieważ ERDDAP Odpowiedź na proste pytania może trwać kilka godzin i używać mnóstwo pamięci. Poprzez konsolidację plików źródłowych w mniejszą liczbę (dla GTSPP, mam 720 teraz, 2 na miesiąc) , ERDDAP™ może reagować stosunkowo szybko. Patrz [Miliony plików](#millions-of-files)   
     

N.B. Solid State Drives są świetne&#33; Najszybszy, najprostszy i najtańszy sposób pomocy ERDDAP™ radzić sobie z ogromną liczbą (małe) pliki mają używać stałego dysku. Patrz [Solid State Drives są świetne&#33;](/docs/server-admin/additional-information#solid-state-drives)   
     
##### Miliony plików{#millions-of-files} 
* Niektóre zbiory danych zawierają miliony plików źródłowych. ERDDAP™ może sobie z tym poradzić, ale z mieszanymi wynikami.
    
    * Dla wniosków, które dotyczą tylko zmiennych wymienionych w [&lt; subsetVariables &gt;] (# subsetvarels) , ERDDAP™ posiada wszystkie potrzebne informacje już wydobyte z danych i przechowywane w jednym pliku, więc może reagować bardzo, bardzo szybko.
    * W przypadku innych wniosków, ERDDAP™ może skanować zbiór danych [buforowane informacje o pliku](#cached-file-information) i dowiedzieć się, że tylko kilka plików może mieć dane, które są istotne dla wniosku i tym samym szybko reagować.
    * Ale na inne prośby (na przykład, temperatura wody = 18 stopni\\ _ C) jeżeli jakikolwiek plik może posiadać odpowiednie dane, ERDDAP™ musi otworzyć dużą liczbę plików, aby sprawdzić, czy każdy z plików posiada dane istotne dla wniosku. Pliki są otwierane kolejno. W każdym systemie operacyjnym i systemie plików (inne niż napędy w stanie stałym) To długo trwa. (więc ERDDAP™ reaguje powoli) i naprawdę łączy system plików (więc ERDDAP™ powoli odpowiada na inne wnioski) .
    
Na szczęście jest rozwiązanie.
    
    1. Ustaw zbiór danych na niepublicznym ERDDAP™   (Twój osobisty komputer?) .
    2. Utwórz i uruchom skrypt, który wymaga serii .nc Pliki CF, każdy z dużą częścią zbioru danych, zazwyczaj okres czasu (na przykład, wszystkie dane dla danego miesiąca) . Wybierz okres, tak aby wszystkie otrzymane pliki były mniejsze niż 2GB (ale miejmy nadzieję większe niż 1 GB) . Jeśli zbiór danych posiada dane w czasie blis- real- time, uruchom skrypt, aby zregenerować plik dla bieżącego okresu czasu (np. w tym miesiącu) często (Co 10 minut? co godzinę?) . Wnioski ERDDAP™ zamiast .nc Pliki CF tworzą NetCDF v3 .nc plik, który wykorzystuje [CF Geometrie do pobierania próbek dyskretnych (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Kontyguous Ragged Archive data structures).
    3. Utwórz [Pliki EDDTableFromNcCFFiles](#eddtablefromnccffiles) zestaw danych na temat Twojej publiczności ERDDAP™ które otrzymują dane z .nc  (CF) pliki. ERDDAP™ może bardzo szybko pobierać dane z tych plików. A ponieważ są teraz dziesiątki lub setki (zamiast milionów) plików, nawet jeśli ERDDAP™ musi otworzyć wszystkie pliki, to może zrobić tak szybko.
    
Tak, ten system wymaga trochę czasu i wysiłku, ale działa bardzo, bardzo dobrze. Większość wniosków o dane może być obsługiwana 100 razy szybciej niż wcześniej.
     \\[ Bob wiedział, że to możliwe, ale to Kevin O 'Brien pierwszy to zrobił i pokazał, że działa dobrze. Teraz, Bob używa tego do zbioru danych GTSPP, który ma około 18 milionów plików źródłowych i który ERDDAP™ teraz służy przez około 500 .nc  (CF) pliki. \\] 
    
N.B. Solid State Drives są świetne&#33; Najszybszy, najprostszy i najtańszy sposób pomocy ERDDAP™ radzić sobie z ogromną liczbą (małe) pliki mają używać stałego dysku. Patrz [Solid State Drives są świetne&#33;](/docs/server-admin/additional-information#solid-state-drives)   
     
    
##### Ogromne pliki{#huge-files} 
* Jeden ogromny plik danych (szczególnie ogromne pliki danych ASCII) może powodować błąd OutOfMemoryError. Jeśli to jest problem, powinien być oczywisty, ponieważ ERDDAP™ nie wczyta zestawu danych. Rozwiązaniem, jeśli jest to wykonalne, jest podzielenie pliku na wiele plików. Najlepiej podzielić plik na logiczne kawałki. Na przykład, jeśli plik posiada dane o wartości 20 miesięcy, podziel je na 20 plików, z których każdy ma dane o wartości 1 miesiąca. Ale są korzyści nawet jeśli główny plik jest podzielony arbitralnie. Podejście to przynosi wiele korzyści: a) Zmniejszy to pamięć potrzebną do odczytu plików danych do 1 / 20, ponieważ tylko jeden plik jest odczytywany na raz. b) Często, ERDDAP™ może radzić sobie z żądaniami znacznie szybciej, ponieważ musi tylko szukać w jednym lub kilku plikach, aby znaleźć dane dla danego żądania. c) Jeśli zbieranie danych jest w toku, to istniejące 20 plików może pozostać niezmienione, i trzeba tylko zmodyfikować jeden, mały, nowy plik, aby dodać wartość danych w następnym miesiącu do zbioru danych.
     
##### FTP Trouble / Advice{#ftp-troubleadvice-1} 
* Jeśli FTP nowe pliki danych do ERDDAP™ serwer podczas ERDDAP™ Jest szansa, że ERDDAP™ będzie przeładowywać zbiór danych podczas procesu FTP. To zdarza się częściej niż myślisz&#33; Jeśli to się stanie, plik będzie miał ważność (posiada poprawną nazwę) , ale plik nie jest ważny. Jeśli ERDDAP™ próbuje odczytać dane z tego niepoprawnego pliku, błąd spowoduje dodanie pliku do tabeli niepoprawnych plików. Niedobrze. Aby uniknąć tego problemu, użyj tymczasowej nazwy pliku podczas FTP 'ing pliku, na przykład ABC2005 .nc \\ _ TEMP. Następnie test pliku NameRegex (zob. poniżej) wskazuje, że nie jest to odpowiedni plik. Po zakończeniu procesu FTP należy zmienić nazwę pliku na poprawną nazwę. Proces zmiany nazwy spowoduje, że plik stanie się istotny w jednej chwili.
    
##### Nazwa pliku Ekstrakty{#file-name-extracts} 
 \\[ Ta funkcja jest DEPRECATED. Proszę użyć [\\*\\*\\ * fileName pseudo sourceName ](#filename-sourcenames) Zamiast tego. \\]   
EDDTableFromFiles posiada system do ekstrakcji String z każdej nazwy pliku i za pomocą tego zrobić pseudo zmiennej danych. Obecnie nie ma systemu interpretowania tych strun jako dat / czasów. Istnieje kilka tagów XML do skonfigurowania tego systemu. Jeśli nie potrzebujesz części lub całego tego systemu, nie podawaj tych znaczników ani nie używaj wartości "".

* preExtractRegex jest [wyrażenie regularne](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) używane do identyfikacji tekstu do usunięcia od początku nazwy pliku. Usunięcie następuje tylko wtedy, gdy regex jest dopasowany. Zwykle zaczyna się na "^", aby dopasować początek nazwy pliku.
* post ExtractRegex jest wyrażeniem regularnym używanym do identyfikacji tekstu, który ma być usunięty z końca nazwy pliku. Usunięcie następuje tylko wtedy, gdy regex jest dopasowany. To zwykle kończy się na "$", aby dopasować koniec nazwy pliku.
* extractRegex Jeśli występuje, to wyrażenie regularne jest używane po preExtractRegex i postExtractRegex do identyfikacji łańcucha, który ma być wyciągnięty z nazwy pliku (na przykład: stationID ) . Jeśli regex nie jest dopasowany, używa się całej nazwy pliku (minus preExtract i post Wyciąg) . Użyj. "\\ *", aby dopasować całą nazwę pliku, która zostanie po preExtractRegex i postExtractRegex.
* kolumna NameForExtract to nazwa źródłowa kolumny danych dla wyciągniętych strun. A dataVariable z tym [ sourceName ](#sourcename) musi być w dataVariable s (z dowolnym typem danych, ale zazwyczaj String) .

Na przykład, jeśli zbiór danych posiada pliki o nazwach takich jak XYZAble .nc , XYZBaker .nc XYZCharlie .nc ,... i chcesz utworzyć nową zmienną ( stationID ) po odczycie każdego pliku, który będzie miał wartość ID stacji (Able, Baker, Charlie,...) wyciągnięty z nazw plików, można użyć tych znaczników:

*   &lt;preExtractReget &gt; ^ XYZ&lt;/ preExtractRegex &gt;
Początkowy ^ jest wyrażeniem regularnym o charakterze specjalnym, który zmusza ERDDAP™ szukać XYZ na początku nazwy pliku. Powoduje to usunięcie XYZ na początku nazwy pliku (na przykład nazwa pliku XYZAble .nc staje się zdolny .nc ) .
*   &lt;postExtractReget &gt;\\ .nc $&lt;/ postExtractRegex &gt;
$na końcu jest wyrażeniem regularnym specjalny charakter, który zmusza ERDDAP™ szukać .nc na końcu nazwy pliku. Od. to specjalny znak wyrażenia regularnego (który pasuje do jakiegokolwiek znaku) , jest zakodowany jako\\. Tutaj (ponieważ 2E jest szesnastkowym numerem znaku dla danego okresu) . Powoduje to .nc , jeśli znaleziono na końcu nazwy pliku, należy usunąć (na przykład nazwa pliku częściowego Zdolny .nc staje się zdolny) .
*   &lt;extractReget &gt;.\\ *&lt;/ extractReget &gt;
Wyrażenie regularne\\ * pasuje do pozostałych znaków (na przykład nazwa pliku częściowego Zdolność staje się ekstraktem dla pierwszego pliku) .
*   &lt;ColumnNameForExtract &gt; stationID &lt;/ ColumnNameForExtract &gt;
To mówi ERDDAP™ do tworzenia nowej kolumny źródłowej stationID podczas czytania każdego pliku. Każdy wiersz danych dla danego pliku będzie otrzymywał tekst z jego nazwy pliku (na przykład: Zdolny) jako wartość w stationID kolumna.

W większości przypadków istnieją liczne wartości dla tych znaczników, które dają te same wyniki -- wyrażenia regularne są bardzo elastyczne. Ale w kilku przypadkach jest tylko jeden sposób na uzyskanie pożądanych wyników.
     
##### Pseudo Przewodniczący sourceName s{#pseudo-sourcenames} 
Każda zmienna w każdym zbiorze danych w ERDDAP™ ma&lt; sourceName &gt;] (# sourcename) która określa nazwę źródła zmiennej. EDDTableFromFiles obsługuje kilka pseudo sourceName s, które pobierają wartość z innego miejsca (np. nazwa pliku lub wartość atrybutu globalnego) i promować tę wartość jako kolumnę stałych wartości dla tego kawałka danych (np. tabela danych tego pliku) . Dla tych zmiennych należy określić typ danych zmiennej poprzez [&lt;Data Typ &gt;] (# datatype) tag. Jeśli ekstrahowane informacje są ciągiem dateTime, należy określić format łańcucha dateTime w [atrybut jednostek](#string-time-units) . Pseudonim sourceName opcje są następujące:
 
###### globalny: sourceName s{#global-sourcenames} 
Atrybut globalnych metadanych w każdym pliku danych źródłowych może być promowany jako kolumna danych. Jeśli zmienna jest&lt; sourceName &gt; posiada format
```
        <sourceName>global:*attributeName*</sourceName>
```
wtedy kiedy ERDDAP™ odczytuje dane z pliku, ERDDAP™ będzie szukać atrybutu globalnego tej nazwy (na przykład PI) i utworzyć kolumnę wypełnioną wartością atrybutu. Jest to przydatne, gdy atrybut posiada różne wartości w różnych plikach źródłowych, ponieważ w przeciwnym razie użytkownicy zobaczyliby tylko jedną z tych wartości dla całego zbioru danych. Na przykład:
```
        <sourceName>global:PI</sourceName>
```
Kiedy promujesz atrybut jako dane, ERDDAP™ usuwa odpowiedni atrybut. Jest to właściwe, ponieważ wartość prawdopodobnie różni się w każdym pliku; podczas gdy w zagregowanym zbiorze danych ERDDAP™ będzie miała tylko jedną wartość. Jeśli chcesz, możesz dodać nową wartość atrybutu dla całego zbioru danych poprzez dodanie&lt;att name = " *atrybut Nazwa* "&gt; *nowy Wartość* &lt;/ att &gt; do globalnego zbioru danych [&lt; addAttributes &gt;] (# addattriates) . Dla atrybutów globalnych, które ERDDAP™ wymaga, na przykład, instytucji, MUSI dodać nową wartość dla atrybutu.
     
###### zmienna: sourceName s{#variable-sourcenames} 
Atrybut metadanych zmiennej w każdym pliku może być promowany jako kolumna danych. Jeśli zmienna jest&lt; [ sourceName ](#sourcename) \\ &gt; posiada format
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
wtedy kiedy ERDDAP™ odczytuje dane z pliku, ERDDAP™ będzie szukać określonego atrybutu (na przykład ID) określonej zmiennej (na przykład instrument) i utworzyć kolumnę wypełnioną wartością atrybutu. Zmienna dominująca (na przykład instrument) Nie musi być jednym z dataVariable s zawarte w definicji zbioru danych w ERDDAP . Na przykład:
```
        <sourceName>variable:instrument:ID</sourceName>
```
Jest to przydatne, gdy atrybut posiada różne wartości w różnych plikach źródłowych, ponieważ w przeciwnym razie użytkownicy zobaczyliby tylko jedną z tych wartości dla całego zbioru danych.

Kiedy promujesz atrybut jako dane, ERDDAP™ usuwa odpowiedni atrybut. Jest to właściwe, ponieważ wartość prawdopodobnie różni się w każdym pliku; podczas gdy w zagregowanym zbiorze danych ERDDAP™ będzie miała tylko jedną wartość. Jeśli chcesz, możesz dodać nową wartość atrybutu dla całego zbioru danych poprzez dodanie&lt;att name = " *atrybut Nazwa* "&gt; *nowy Wartość* &lt;/ att &gt; do zmiennej [&lt; addAttributes &gt;] (# addattriates) . Dla atrybutów ERDDAP™ wymaga, na przykład, ioos\\_category   (w zależności od konfiguracji) , MUSI dodać nową wartość dla atrybutu.
        
###### fileName sourceName s{#filename-sourcenames} 
Można wyodrębnić część nazwy pliku i promować to jako kolumnę danych. Format tego pseudo [&lt; sourceName &gt;] (# sourcename) en
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
Na przykład:
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
Kiedy EDDTableFromFiles odczytuje dane z pliku, to upewnij się, że nazwa pliku (na przykład A201807041442.slcpV1 .nc ) pasuje do określonego wyrażenia regularnego ("regex") i wyodrębnić określone (w tym przypadku, pierwszy) Grupa (która jest częścią otoczoną nawiasami) , na przykład, "201807041442". (Widzisz to? [dokumentacja regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) oraz [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) Regex może być określony jako łańcuch z lub bez otaczających cudzysłów. Jeśli regex jest określony jako łańcuch z otaczającymi cudzysłówka, łańcuch musi być [ciąg w stylu JSON-](https://www.json.org/json-en.html)   (ze specjalnymi znakami, które uciekły z\\ znakami) . Numer grupy przechwytywania to zazwyczaj 1 (pierwsza grupa przechwytująca) , ale może być dowolny numer.
     
###### pathName sourceName s{#pathname-sourcenames} 
Możesz wyodrębnić część pełnej ścieżki pliku Nazwa (/ katalogi / fileName.ext) i promować to jako kolumnę danych. Format tego pseudo [&lt; sourceName &gt;] (# sourcename) en
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
Na przykład:
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
Kiedy EDDTableFromFiles odczytuje dane z pliku, to upewnij się, że pathName (na przykład / data / myDatasetiID / BAY17 / B201807041442 .nc . Dla tego testu separatory katalogów zawsze będą '/' Nigdy ') pasuje do określonego wyrażenia regularnego ("regex") i wyodrębnić określone (w tym przypadku, pierwszy) Grupa (która jest częścią otoczoną nawiasami) na przykład "BAY17". (Widzisz to? [dokumentacja regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) oraz [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) Regex może być określony jako łańcuch z lub bez otaczających cudzysłów. Jeśli regex jest określony jako łańcuch z otaczającymi cudzysłówka, łańcuch musi być [ciąg w stylu JSON-](https://www.json.org/json-en.html)   (ze specjalnymi znakami, które uciekły z\\ znakami) . Numer grupy przechwytywania to zazwyczaj 1 (pierwsza grupa przechwytująca) , ale może być dowolny numer.
         
##### "0 plików" Komunikat o błędzie{#0-files-error-message-2} 
* Jeśli uciekniesz [GenerateDatasetsXml](#generatedatasetsxml) lub [DasDs](#dasdds) , lub jeśli spróbujesz załadować tableFrom... Zestaw danych plików w ERDDAP™ , i otrzymasz komunikat błędu "0 files" wskazujący, że ERDDAP™ znaleziono 0 pasujących plików w katalogu (kiedy myślisz, że są pasujące pliki w tym katalogu) :
    * Sprawdź, czy pliki są w tym katalogu.
    * Sprawdź pisownię nazwy katalogu.
    * Sprawdź plik NameRemex. Bardzo łatwo popełnić błędy z regexami. Do celów testowych, spróbuj regex.\\ *, który powinien pasować do wszystkich nazw plików. (Widzisz to? [dokumentacja regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) oraz [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
    * Sprawdź, czy użytkownik, który prowadzi program (np. użytkownik = tomcat (?) dla Tomcat / ERDDAP ) ma pozwolenie na przeczytanie tych plików.
    * W niektórych systemach operacyjnych (na przykład, SELER) i w zależności od ustawień systemu, użytkownik, który prowadził program, musi mieć "przeczytaj" pozwolenie na cały łańcuch katalogów prowadzących do katalogu, który posiada pliki.
         
##### standaryzacja Co?{#standardizewhat} 
* Gdy podklasa plików EDDTableFromFiles agreguje zbiór plików źródłowych dla danej zmiennej, wszystkie pliki źródłowe MUSI mieć identyczne wartości atrybutów dla kilku atrybutów: scale\\_factor , add\\_offset ,\\ _ Niepodpisane, missing\\_value ,\\ _ FillValue i jednostki). Pomyśl o tym: jeśli jeden plik ma jednostki windSpeed = węzły, a drugi ma jednostki windSpeed = m / s, to wartości danych z tych dwóch plików nie powinny być włączone do tego samego zagregowanego zbioru danych. Kiedy EDDTableFromFiles po raz pierwszy tworzy zbiór danych, odczytuje wartości atrybutów z jednego pliku, a następnie odrzuca wszystkie pliki, które mają różne wartości dla tych ważnych atrybutów. Dla większości zbiorów plików nie jest to problem, ponieważ atrybuty wszystkich zmiennych są spójne. Jednakże dla innych kolekcji plików może to prowadzić do 1%, 10%, 50%, 90%, a nawet 99% plików odrzuconych jako "złe" pliki. To są kłopoty.
    
Pliki EDDTableFrom mają system do rozwiązywania tego problemu: standaryzacja Co? Standaryzacja Jakie ustawienie mówi EDDTableFromFiles do standaryzacji plików jak tylko je przeczyta, zanim EDDTableFromFiles spojrzy na atrybuty, aby sprawdzić czy są spójne.
    
Po drugiej stronie jest: jeśli zbiór danych nie ma tego problemu, nie używaj standaryzacji Co? standaryzacja Co wiąże się z pewnym potencjalnym ryzykiem (omówione poniżej) oraz nieefektywności. Więc jeśli nie potrzebujesz cech standaryzacji Co, nie ma potrzeby stawienia czoła potencjalnym zagrożeniom i nieefektywności. Największa nieefektywność jest: Kiedy różne standaryzacji Jakie opcje są używane przez zbiór danych, oznacza to, że pliki źródłowe przechowują dane na znacznie różne sposoby (np. z różnymi scale\\_factor oraz add\\_offset lub z łańcuchami czasu przy użyciu różnych formatów) . Tak więc dla danego ograniczenia w żądaniu użytkownika, nie ma możliwości ERDDAP™ aby zrobić jedno ograniczenie poziomu źródłowego, które może być stosowane do wszystkich plików źródłowych. Więc... ERDDAP™ mogą stosować te ograniczenia wyłącznie na wyższym poziomie. Więc... ERDDAP™ musi odczytać dane z większej liczby plików przed zastosowaniem wyższych, destination- level ograniczeń. Więc prośby do zbiorów danych, które używają standaryzacji Co zajmuje więcej czasu, by zostać przebadanym.
    
Aby korzystać z tego systemu, musisz określić
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
w [ datasets.xml dla EDDTableFrom... Zestaw danych plików](#eddtablefromfiles-skeleton-xml) (w obrębie&lt;dataset &gt; tag).
    
W *standaryzacja Co?* wartość określa, które zmiany EDDTableFromFiles powinny być stosowane. Zmiany są sumą pewnej kombinacji:
    
1. Rozpakuj
Prowadzi to wiele wspólnych i bezpiecznych operacji standaryzacji kolumn liczbowych w plikach:
    * Jeśli scale\\_factor lub add\\_offset atrybuty są obecne, usuwają je i stosują je do rozpakowania wartości danych.
    * Rozpakowywanie atrybutów (np. rzeczywisty\\ _ min, rzeczywisty\\ _ max, actual\\_range , data\\_min , data\\_max , data\\ _ range, valid\\_min , valid\\_max , valid\\_range ) , jeśli występuje, jeśli zmienna była zapakowana, i jeśli wartości atrybutu były zapakowane (To trudne, ale niezawodne.) .
    * Jeśli\\ _ FillValue lub missing\\_value są obecne, konwertować te wartości danych do ERDDAP "standard" brakujące wartości: MAX\\ _ VALUE dla typów całkowitych (np. 127 dla bajtów, 32,767 dla skrótów i 2,147,483,647 dla intów, 9223372036854775807 dla długów) i NaN dla dublerów i pływaków.
    * Usuń starą\\ _ FillValue i / lub missing\\_value atrybuty (jeżeli istnieje) , i zastąpić je tylko\\ _ FillValue = \\[ do ERDDAP™ standardowa brakująca wartość \\] .
         
2. Standardowe czasy numeryczne
Jeżeli kolumna liczbowa posiada jednostki czasu liczbowego w stylu CF- (" *timeUnits* od *baseTime* ", np.", dni od 1900- 01- 01 ") , to zmienia datę Wartości czasowe "seconds since 1970-01-01T00:00:00Z" wartości i zmiany atrybutu jednostek, aby to wskazać.
Jeśli jest to zaznaczone i istnieje szansa, że ta zmienna ma scale\\_factor lub add\\_offset , # 1 Must be selected also.
     
3. Zastosuj ciąg missing\\_value   
Jeśli kolumna String posiada\\ _ FillValue i / lub missing\\_value atrybuty, to konwertuje te wartości na "" i usuwa atrybuty.
     
4. Znajdź numer missing\\_value   
Jeśli kolumna numeryczna nie posiada\\ _ FillValue lub missing\\_value atrybuty, to próbuje zidentyfikować nieokreślony liczbowy missing\\_value   (np. -999, 9999, 1e37f) i przekonwertować jego instancje do "standardowych" wartości (MAX\\ _ VALUE dla typów całkowitych, a NAN dla podwójnych i pływaków) .
     **Wariant ten wiąże się z ryzykiem:** jeżeli największa lub najmniejsza poprawna wartość danych wygląda jak brakująca wartość (np. 999) , wtedy te ważne wartości danych zostaną przeliczone na brakujące wartości (np. NaN) .
     
5. Zmień ciąg "N / A" na ""
Dla każdej kolumny String, przekonwertuj kilka strun powszechnie używanych do wskazania brakującej wartości String do "". Obecnie to szuka. ","... ",", ","? ","? "," N / A "," NA "," none "," not applicable "," null "," unknown "," undescripted ". Wyszukiwanie strun jest niewrażliwe i stosowane po strunach są wykończone 'd." nd "i" inne "nie znajdują się na liście.
     **Wariant ten wiąże się z ryzykiem:** Struktury, które uważasz za prawidłowe wartości mogą być konwertowane na "".
     
6. Standaryzuj do String ISO 8601 DateTimes
Dla każdej kolumny String, spróbuj przekonwertować nie -purely-numeryczne String dateTimes (np. "2 stycznia 2018 r".) do ISO 8601 String dateTimes ("2018- 01- 02") .
     **Uwaga** że wszystkie wartości danych dla kolumny muszą używać tego samego formatu, inaczej ta opcja nie wprowadzi żadnych zmian do danej kolumny.
     **Wariant ten wiąże się z ryzykiem:** Jeśli istnieje kolumna o wartościach łańcuchowych, które po prostu wyglądają jak wspólna data Format czasowy, będą one konwertowane do ISO 8601 String dateTimes.
     
7. Standard Compact DateTimes do ISO 8601 DateTimes
Dla każdej kolumny String lub typu integer- spróbuj przekonwertować pureli- numeryczny String dateTimes (np. "20180102") do ISO 8601 String dateTimes ("2018- 01- 02") .
     **Uwaga** że wszystkie wartości danych dla kolumny muszą używać tego samego formatu, inaczej ta opcja nie wprowadzi żadnych zmian do danej kolumny.
     **Wariant ten wiąże się z ryzykiem:** Jeśli istnieje kolumna z wartościami, które nie są zwarte data Czasy, ale wyglądają jak kompaktowe dateTimes, zostaną przekształcone do ISO 8601 String dateTimes.
     
8. Jednostki standardowe
To próbuje standaryzować ciąg jednostek dla każdej zmiennej. Na przykład "metry na sekundę", "metr na sekundę", "m.s^-1" , "m s-1" "M.s-1" zostanie zamienione na "M.s- 1". To nie zmienia wartości danych. To działa dobrze dla poprawnego UDUNITS jednostki ciągów, ale może mieć problemy z niepoprawnymi lub skomplikowanymi ciągów. Można poradzić sobie z problemami poprzez określenie konkretnych od - do par w&lt;standaryzeUdunits &gt; w ERDDAP jest
     \\[ tomcat \\] / webapps / erddap / WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml file. Proszę wysłać do Chrisa wszelkie zmiany. John w noaa.gov więc mogą być włączone do domyślnych messages.xml.
     **Wariant ten wiąże się z ryzykiem:** Może to zniekształcić niektóre skomplikowane lub nieprawidłowe jednostki; jednakże, można użyć work- around opisane powyżej, aby obejść problemy, jeśli wystąpią.
         
    
Domyślna wartość standaryzacji Co to jest 0, co nic nie robi.

Jeśli / kiedy zmieniasz wartość standaryzacji Co, następnym razem kiedy zestaw danych jest przeładowany, ERDDAP™ ponownie odczyta wszystkie pliki danych dla zbioru danych w celu odbudowania minibazy danych z informacjami o każdym pliku. Jeśli zbiór danych ma wiele plików, to zajmie to dużo czasu.
    
Uwagi:

* Trudną rzeczą jest...
Standaryzacja Jakie ustawienie jest używane dla wszystkich kolumn w pliku źródłowym. Więc, na przykład, używając # 2048 może z powodzeniem przekształcić kolumnę kompaktowych String dateTimes do ISO 8601 String dateTimes, ale może również błędnie przekształcić kolumnę ze Strings, które po prostu wyglądają jak kompaktowe dateTimes.
     
*    datasets.xml i GenerateDatasets Xml -
Szczególnie trudno jest uzyskać ustawienia poprawne w datasets.xml Aby twój zestaw danych działał tak, jak chcesz. Najlepsze podejście (jak zawsze) jest:
    1. Stosowanie [GenerateDatasetsXml](#generatedatasetsxml) i określić wartość standaryzacji Czego chciałbyś użyć.
    2. Stosowanie [DasDs](#dasdds) aby zapewnić prawidłowe ładowanie zbioru danych i odzwierciedlać standaryzację Co ustawiasz?
    3. Test zbioru danych ręcznie, gdy jest w ERDDAP™ zapewnienie, aby zmienne, których dotyczy wniosek, działały zgodnie z oczekiwaniami.
         
* Ryzyko -
Opcje # 256 i powyżej są bardziej ryzykowne, tzn. istnieje większa szansa, że ERDDAP™ Dokonają zmiany, której nie powinno się dokonywać. Na przykład, opcja # 2048 może przypadkowo przekonwertować zmienną ze strunami ID stacji, które po prostu wyglądają ISO 8601 "kompaktowe" daty (np. 20180102) w ISO 8601 "extended" daty ("2018- 01- 02") .
     
* Powoli po zmianie...
Od wartości standaryzacji Co zmienia wartości danych, które EDDTableFromFiles widzi dla każdego pliku danych, jeśli zmienisz standaryzację Jakie ustawienia, EDDTableFromFiles wyrzuci wszystkie buforowane informacje o każdym pliku (która zawiera min i max dla każdej zmiennej danych w każdym pliku) i ponownie przeczytać każdy plik danych. Jeśli zbiór danych ma dużą liczbę plików, może to być bardzo czasochłonne, więc zajmie dużo czasu, aby zestaw danych ponownie załadować pierwszy raz ERDDAP™ Przeładuj go po dokonaniu zmiany.
     
* Heurystyka -
Opcje # 256 i powyżej używają heurystyki do wprowadzania zmian. Jeśli natkniesz się na sytuację, w której heurystyka podejmuje złą decyzję, prosimy o wysłanie do Chrisa opisu problemu. John w Noah. więc możemy poprawić heurystykę.
     
* Alternatywy...
Jeśli jedna z opcji standaryzCo nie rozwiązuje problemu dla danego zbioru danych, może być w stanie rozwiązać problem poprzez [ .nc Plik ml](#ncml-files) do równoległego każdego pliku danych i zdefiniowania zmian w plikach tak, aby pliki były spójne. Więc powiedz EDDTableFrom... Zestaw danych plików do agregacji .nc Pliki ml.
    
Lub użyć [ NCO ](#netcdf-operators-nco) faktycznie dokonać zmian w plikach tak, aby pliki były spójne.
        
##### Oddzielne kolumny na rok, miesiąc, data, godzina, minuta, drugi{#separate-columns-for-year-month-date-hour-minute-second} 
Jest dość powszechne dla tabelarycznych plików danych mieć oddzielne kolumny na rok, miesiąc, datę, godzinę, minutę, sekundę. Przed ERDDAP™ v2.10, jedynym rozwiązaniem była edycja pliku danych, aby połączyć te kolumny w ujednoliconą kolumnę czasową. Z ERDDAP™ 2.10 +, można użyć
[&lt; sourceName &gt; = *wyrażenie* &lt; sourceName &gt;] (# sourcename) powiedzieć ERDDAP™ jak połączyć kolumny źródłowe, aby ujednolicić kolumnę czasu, więc nie trzeba już edytować pliku źródłowego.
##### &lt;skipHeaderToRegex & gt;{#skipheadertoregex} 
* [&lt;SkipHeaderToRegex &gt;] (# skipheadertoregex) --
Opcjonalne. (Tylko dla danych EDDTableFromAsciiFiles i EDDTableFromColumnaraSciiFiles.)   
Kiedy EDDTableFromAsciiFiles przeczyta plik danych, zignoruje wszystkie linie do i włącznie z linią, która pasuje do tego wyrażenia regularnego. Domyślnie jest ", co nie używa tej opcji. Przykładem jest
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
który ignoruje wszystkie linie do linii, która zaczyna się od "\\*\\** END OF HEADER ".

Kiedy używasz tego znacznika,&lt;ColumnNamesRow &gt; oraz&lt;first DataRow &gt; działa tak, jakby nagłówk został usunięty przed odczytem pliku. Na przykład, można użyć columnNamesRow = 0, jeśli nazwy kolumn znajdują się w wierszu tuż po nagłówku.

Jeśli chcesz użyć genere Zestawy danych Xml z zestawem danych, który potrzebuje tego znacznika:

1. Utwórz nowy, tymczasowy, przykładowy plik kopiując istniejący plik i usuwając nagłówek.
2. Uruchom generowanie Zestawy danych Xml i określić plik próbki.
3. Ręcznie dodać&lt;skipHeaderToRegex &gt; tag do datasets.xml Chunk.
4. Usuń tymczasowy, przykładowy plik.
5. Użyj zbioru danych w ERDDAP .
##### &lt;skipLinesRegex & gt;{#skiplinesregex} 
Opcjonalne. (Tylko dla danych EDDTableFromAsciiFiles i EDDTableFromColumnaraSciiFiles.)   
Kiedy EDDTableFromAsciiFiles przeczyta plik danych, zignoruje wszystkie linie pasujące do tego wyrażenia regularnego. Domyślnie jest ", co nie używa tej opcji. Przykładem jest
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
które zignorują wszystkie linie, które zaczynają się od "#".

Kiedy używasz tego znacznika,&lt;ColumnNamesRow &gt; oraz&lt;first DataRow &gt; działa tak, jakby wszystkie pasujące linie zostały usunięte przed odczytem pliku. Na przykład, można użyć columnNamesRow = 0, nawet jeśli istnieje kilka linii zaczynających się, na przykład, "#" na początku pliku.
    
#### EDDTableFromFiles szkielet XML{#eddtablefromfiles-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;nDimensions>...&lt;/nDimensions>  &lt;!-- This was used prior to ERDDAP™  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version 1.30, but is now ignored. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromFiles subclasses, this uses Java's WatchDirectory system  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;standardizeWhat>](#standardizewhat)...&lt;/standardizeWhat> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;specialMode>*mode*&lt;/specialMode>  &lt;-- This rarely-used, OPTIONAL tag  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be used with EDDTableFromThreddsFiles to specify that special,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hard-coded rules should be used to determine which files should  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be downloaded from the server. Currently, the only valid *mode*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is SAMOS which is used with datasets from  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://tds.coaps.fsu.edu/thredds/catalog/samos to download only the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files with the last version number. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  &lt;-- For subclasses like  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromHyraxFiles and EDDTableFromThreddsFiles, this is where  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you specify the base URL for the files on the remote server.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For subclasses that get data from local files, ERDDAP™ doesn't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this information to get the data, but does display the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;information to users. So I usually use "(local files)". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data file names, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get metadata  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;charset>...&lt;/charset>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This OPTIONAL tag specifies the character set (case  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sensitive!) of the source files, for example, ISO-8859-1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default) and UTF-8.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipHeaderToRegex>](#skipheadertoregex)...&lt;/skipHeaderToRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipLinesRegex>](#skiplinesregex)...&lt;/skipLinesRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNamesRow>...&lt;/columnNamesRow> &lt;-- (For EDDTableFromAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the row with the column  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;names in the files. (The first row of the file is "1".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default = 1.)  If you specify 0, ERDDAP™ will not look for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;column names and will assign names: Column#1, Column#2, ... -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;firstDataRow>...&lt;/firstDataRow>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the first row with data in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. (The first row of the file is "1". Default = 2.) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dimensionsCSV>...&lt;/dimensionsCSV> &lt;-- (For EDDTableFromNcFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and EDDTableFromMultidimNcFiles only) This is a comma-separated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list of dimension fullNames. If specified, ERDDAP™ will only read  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variables in the source files which use some or all of these  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions, plus all of the scalar variables. If a dimension  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is in a group, you must specify its fullName,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g., "*groupName/dimensionName*". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The next four tags are DEPRECATED. For more information, see  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[File Name Extracts](#filename-sourcenames). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;preExtractRegex>...&lt;/preExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;postExtractRegex>...&lt;/postExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractRegex>...&lt;/extractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNameForExtract>...&lt;/columnNameForExtract>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortedColumnSourceName>...&lt;/sortedColumnSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The [sourceName](#sourcename) of the numeric column that the data files are  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usually already sorted by within each file, for example, "time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't specify this or use an empty string if no variable is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suitable. It is ok if not all files are sorted by this column.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If present, this can greatly speed up some data requests.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromHyraxFiles, EDDTableFromNcFiles and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, this must be the leftmost (first) axis variable.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromMultidimNcFiles ignores this because it has a better  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;system. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortFilesBySourceNames>...&lt;/sortFilesBySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- This is a space-separated list of [sourceName](#sourcename)s  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which specifies how the internal list of files should be sorted  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(in ascending order), for example "id time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is the minimum value of the specified columns in each file  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that is used for sorting.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a data request is filled, data is obtained from the files  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in this order. Thus it determines the overall order of the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the response.  If you specify more than one column name, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;second name is used if there is a tie for the first column; the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;third is used if there is a tie for the first and second  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns; ... This is OPTIONAL (the default is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fileDir+fileName order). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For EDDTableFromHyraxFiles, EDDTableFromMultidimNcFiles,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromNcFiles, EDDTableFromNccsvFiles, and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, the source's axis variables (for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;example, time) needn't be first or in any specific order. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromAsciiService{#eddtablefromasciiservice} 
 [ **EDDTableFromAsciiService** ](#eddtablefromasciiservice) jest zasadniczo skraplaczem ekranu. Jest on przeznaczony do czynienia z źródłami danych, które mają prostą usługę internetową do żądania danych (często formularz HTML na stronie internetowej) i które mogą zwrócić dane w jakimś ustrukturyzowanym formacie ASCII (na przykład format tekstowy ASCII, często zawierający inne informacje przed i / lub po danych) .

EDDTableFromAsciiService jest nadklasą wszystkich klas EDDTableFromAsciiService... Nie można bezpośrednio korzystać z EDDTableFromAsciiService. Zamiast tego należy użyć podklasy EDDTableFromAsciiService do obsługi określonych rodzajów usług:

*    [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos) otrzymuje dane z NOAA Usługi ASCII dla NOS.

Obecnie nie są obsługiwane żadne inne rodzaje usług. Ale zazwyczaj stosunkowo łatwo jest wspierać inne usługi, jeśli działają one w podobny sposób. Skontaktuj się z nami, jeśli masz prośbę.

#### Szczegóły{#details} 
Poniższe informacje dotyczą wszystkich podklas EDDTableFromAsciiService.

* Ograniczenia... ERDDAP™ żądania dotyczące danych tabelarycznych mogą nakładać ograniczenia na każdą zmienną. Usługa bazowa może lub nie może dopuścić ograniczeń dotyczących wszystkich zmiennych. Na przykład wiele usług wspiera jedynie ograniczenia dotyczące nazw stacji, szerokości, długości i czasu. Tak więc, gdy podklasa EDDTableFromAsciiService otrzymuje wniosek o podzbiór zbioru danych, przechodzi jak najwięcej ograniczeń do usługi danych źródłowych, a następnie stosuje pozostałe ograniczenia do danych zwróconych przez usługę, przed przekazaniem danych do użytkownika.
* Ważny zakres... W przeciwieństwie do wielu innych typów zbiorów danych EDDTableFromAsciiService zwykle nie zna zakresu danych dla każdej zmiennej, więc nie może szybko odrzucić wniosków o dane poza prawidłowym zakresem.
* Parsing the ASCII Text Response -- Gdy EDDTableFromAsciiService otrzyma odpowiedź z usługi tekstowej ASCII, musi potwierdzić, że odpowiedź ma oczekiwany format i informacje, a następnie pobrać dane. Możesz określić format używając różnych specjalnych znaczników w części XML dla tego zbioru danych:
    *   &lt;beforData1 &gt; przez&lt;beforData10 &gt; tagi -- Możesz określić serię fragmentów tekstu (ile chcesz, do 10) EDDTableFromAsciiService musi szukać w nagłówku tekstu ASCII zwróconego przez usługę&lt;beforData1 &gt; przez&lt;beforData10 &gt;. Na przykład jest to przydatne do sprawdzenia, czy odpowiedź zawiera oczekiwane zmienne przy użyciu oczekiwanych jednostek. Ostatni znacznik poprzedzający Dane, który podajesz, identyfikuje tekst, który pojawia się tuż przed rozpoczęciem danych.
    *   &lt;afterData &gt; -- Określa on tekst, którego będzie szukał EDDTableFromAsciiService w tekście ASCII zwróconym przez usługę, który oznacza koniec danych.
    *   &lt;nData &gt; -- Jeżeli EDDTableFromAsciiService znajdzie ten tekst w tekście ASCII zwróconym przez usługę, stwierdza, że nie ma danych, które odpowiadałyby żądaniu.
#### EDDTableFromAsciiService szkielet XML{#eddtablefromasciiservice-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromAsciiService..." [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData1>...&lt;beforeData1> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData10>...&lt;beforeData10> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;afterData>...&lt;afterData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;noData>...&lt;noData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromAsciiServiceNOS{#eddtablefromasciiservicenos} 
 [ **EDDTableFromAsciiServiceNOS** ](#eddtablefromasciiservicenos) sprawia, że zbiory danych EDDTable z usług danych tekstowych ASCII oferowane przez NOAA jest [National Ocean Service (NOS) ](https://oceanservice.noaa.gov/) . Informacje na temat działania tej klasy i jej zastosowania można znaleźć w super klasie tej klasy. [EDDTableFromAsciiService](#eddtablefromasciiservice) . Mało prawdopodobne, żeby ktoś inny niż Bob Simons musiał korzystać z tej podklasy.

Ponieważ dane w odpowiedzi z usługi NOS używają formatu tekstowego kolumny ASCII, zmienne danych inne niż szerokość i długość geograficzna muszą posiadać specjalny atrybut określający, które znaki każdej linii danych zawierają dane tej zmiennej, na przykład:
```
<att name="responseSubstring">17, 25</att>  
```
 
### EDDTableFromAllDatasets{#eddtablefromalldatasets} 
 [ **EDDTableFromAllDatasets** ](#eddtablefromalldatasets) jest zbiorem danych wysokiego poziomu, który zawiera informacje o wszystkich innych zbiorach danych, które są obecnie załadowane w Twoim ERDDAP . W przeciwieństwie do innych typów zbiorów danych, nie ma specyfikacji dla allDatasets zestaw danych w datasets.xml . ERDDAP™ automatycznie tworzy jeden zestaw danych EDDTableFromAllDatasets (z datasetID = allDatasets ) . Tak więc allDatasets zbiór danych zostanie utworzony w każdym ERDDAP™ instalacja i będzie działać w ten sam sposób w każdym ERDDAP™ instalacja.

W allDatasets zbiór danych jest zbiorem danych tabelarycznych. Zawiera szereg informacji dla każdego zbioru danych. Zawiera kolumny zawierające informacje o każdym zbiorze danych, np.: datasetID , dostępna, instytucja, tytuł, minLongitude, maxLongitude, minLatitude, maxLatitude, minTime, maxTime itp. Ponieważ allDatasets jest zbiorem danych tabelarycznych, można go zapytania w ten sam sposób można zapytania innych tabelarycznych zbiorów danych w ERDDAP™ i możesz określić typ pliku dla odpowiedzi. Pozwala to użytkownikom na wyszukiwanie zbiorów danych będących przedmiotem zainteresowania w bardzo potężny sposób.
 
### Pliki EDDTableFromAsciiFiles{#eddtablefromasciifiles} 
 [ **Pliki EDDTableFromAsciiFiles** ](#eddtablefromasciifiles) dane zagregowane z plików tabelarycznych ASCII oddzielonych zespołami, tabelami, średnikami lub spacjami.

* Najczęściej pliki będą miały nazwy kolumn w pierwszym wierszu i dane zaczynające się w drugim wierszu. (Tutaj pierwszy wiersz pliku jest nazywany wierszem nr 1.) Ale możesz użyć&lt;ColumnNamesRow &gt; oraz&lt;first DataRow &gt; w Twoim datasets.xml plik określający inny numer wiersza.
*    ERDDAP™ pozwala rzędom danych na posiadanie różnych liczb wartości danych. ERDDAP™ przyjmuje, że brakujące wartości danych są kolumnami końcowymi w wierszu. ERDDAP™ przypisuje standardowe brakujące wartości wartości dla brakujących wartości danych. (dodano v1.56) 
* Pliki ASCII są łatwe w obsłudze, ale nie są najskuteczniejszym sposobem przechowywania / pobierania danych. Dla większej wydajności, zapisać pliki jako NetCDF v3 .nc pliki (z jednym wymiarem, "wiersz", współdzielony przez wszystkie zmienne) Zamiast tego. Możesz. [podanie ERDDAP™ do generowania nowych plików](#millions-of-files) .
* Widzisz tę klasę "superklasy", [Pliki EDDTableFromFiles](#eddtablefromfiles) , dla informacji o tym, jak ta klasa działa i jak jej używać.
* Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Ze względu na całkowity brak metadanych w plikach ASCII, zawsze trzeba będzie edytować wyniki GenerateDatasetsXml.
* UWAGA: Kiedy ERDDAP™ odczytuje pliki danych ASCII, jeśli znajdzie błąd w danej linii (np. nieprawidłowa liczba elementów) , zapisuje wiadomość ostrzegawczą ("OSTRZEŻENIE: zła linia (s) danych "... z listą złych linii na kolejnych liniach) do [plik log.txt](/docs/server-admin/additional-information#log) a następnie kontynuuje czytanie reszty pliku danych. Tak więc, Twoim obowiązkiem jest okresowo patrzeć (lub napisać skrypt, aby to zrobić) dla tej wiadomości w dzienniku. txt tak, że można naprawić problemy w plikach danych. ERDDAP™ jest skonfigurowany w ten sposób, aby użytkownicy mogli kontynuować odczytywanie wszystkich dostępnych ważnych danych, mimo że niektóre linie pliku mają wady.
     
### Tabela EDDFrom Pliki AwsXmlFiles{#eddtablefromawsxmlfiles} 
 [ **Tabela EDDFrom Pliki AwsXmlFiles** ](#eddtablefromawsxmlfiles) dane agregatów z zestawu Automatic Weather Station (AWS) Pliki danych XML za pomocą API XML WeatherBug Rest (który nie jest już aktywny) .

* Ten typ pliku jest prostym, ale nieefektywnym sposobem przechowywania danych, ponieważ każdy plik zazwyczaj zawiera obserwację z jednego punktu czasowego. Więc może być wiele plików. Jeśli chcesz poprawić wydajność, rozważ konsolidację grup obserwacji (Za tydzień?) w NetCDF v3 .nc pliki (najlepiej: .nc pliki z [CF Geometrie do pobierania próbek dyskretnych (DSG) Względny format tablicy](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) ) i używanie [Pliki EDDTableFromMultidimNc@@](#eddtablefrommultidimncfiles)   (lub [Pliki EDDTableFromNcCFFiles](#eddtablefromnccffiles) ) służyć danym. Możesz. [podanie ERDDAP™ do generowania nowych plików](#millions-of-files) .
* Widzisz tę klasę "superklasy", [Pliki EDDTableFromFiles](#eddtablefromfiles) , dla informacji o tym, jak ta klasa działa i jak jej używać.
     
### Pliki EDDTableFromColumnarasciiFiles{#eddtablefromcolumnarasciifiles} 
 [ **Pliki EDDTableFromColumnarasciiFiles** ](#eddtablefromcolumnarasciifiles) dane zagregowane z tabelarycznych plików ASCII z kolumnami o ustalonej szerokości.

* Najczęściej pliki będą miały nazwy kolumn w pierwszym wierszu i dane zaczynające się w drugim wierszu. Pierwsza linia / wiersz w pliku jest nazywana wierszem # 1. Ale możesz użyć&lt;ColumnNamesRow &gt; oraz&lt;first DataRow &gt; w Twoim datasets.xml plik określający inny numer wiersza.
* W&lt; addAttributes &gt; dla każdego&lt; dataVariable &gt; dla tych zbiorów danych MUSI zawierać te dwa atrybuty specjalne:
    
    *   &lt;att nazwa = "startColumn" &gt; *liczba całkowita* &lt;att &gt; -- określa kolumnę znaków w każdej linii, która jest początkiem tej zmiennej danych.
    *   &lt;att nazwa = "stopColumn" &gt; *liczba całkowita* &lt;att &gt; -- określa kolumnę znaków w każdej linii, która jest 1 po zakończeniu tej zmiennej danych.
    
Pierwsza kolumna znaków jest nazywana kolumną # 0.
Na przykład, dla tego pliku, który ma wartości czasu przy przekroczeniu wartości temperatury:
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
zmienna danych czasu
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
a zmienna danych czasowych
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
Atrybuty te MUSI być określone dla wszystkich zmiennych z wyjątkiem [Wartość ustalona](#fixed-value-sourcenames) oraz [nazwy file- name- source-](#filename-sourcenames) zmienne.
* Pliki ASCII są łatwe w obsłudze, ale nie są efektywnym sposobem przechowywania / pobierania danych. Dla większej wydajności, zapisać pliki jako NetCDF v3 .nc pliki (z jednym wymiarem, "wiersz", współdzielony przez wszystkie zmienne) Zamiast tego. Możesz. [podanie ERDDAP™ do generowania nowych plików](#millions-of-files) .
* Widzisz tę klasę "superklasy", [Pliki EDDTableFromFiles](#eddtablefromfiles) , dla informacji o tym, jak ta klasa działa i jak jej używać.
* Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Ze względu na trudności z określeniem pozycji startowych i końcowych dla każdej kolumny danych oraz całkowity brak metadanych w plikach ASCII, zawsze trzeba będzie edytować wyniki z GenerateDatasetsXml.
     
### EDDTableFromHttpGet{#eddtablefromhttpget} 
Tabela EDD FromHttpGet różni się od wszystkich innych typów zbiorów danych w ERDDAP™ w którym posiada system, w którym konkretni "autorzy" mogą dodawać dane, poprawiać dane lub usuwać dane z zbioru danych przez regularne HTTP GET lub [POST](#http-post) żądania z programu komputerowego, skryptu lub przeglądarki. Zestawienie danych jest do sprawdzenia przez użytkowników w taki sam sposób, jak wszystkie inne zbiory danych EDDTable są do sprawdzenia w ERDDAP . Zobacz opis tej klasy superklasy, [Pliki EDDTableFromFiles](#eddtablefromfiles) Czytać o cechach odziedziczonych po tej superklasie.

Unikalne cechy EDDTableFromHttpGet opisano poniżej. Musisz przeczytać cały ten wstępny rozdział i zrozumieć go; w przeciwnym razie, możesz mieć nierealistyczne oczekiwania lub dostać się w kłopoty, które jest trudne do naprawienia.

#### Przewidywane użycie{#intended-use} 
System ten jest przeznaczony do:

* Tabela (in situ) dane, a nie dane zaprogramowane.
* Dane w czasie rzeczywistym -
Celem jest umożliwienie autorowi (np. czujnik, automatyczny skrypt QC lub określony człowiek) aby zmienić zbiór danych (przez [Polecenie .insert lub .delete](#insert-and-delete) ) i uczynić tę zmianę dostępną dla ERDDAP™ użytkowników, wszystkie w mniej niż 1 sekundę, i prawdopodobnie dużo szybciej. Większość tej sekundy to czas sieciowy. ERDDAP™ może przetwarzać żądanie w ciągu około 1 ms, a dane są natychmiast dostępne dla użytkowników. To jest... [szybko](#httpget-speed) , [wytrzymały](#robust) oraz [niezawodny system](#system-reliability) .
* Prawie każda częstotliwość danych -
Ten system może akceptować rzadkie dane (np. codziennie) bardzo częste dane (np. dane 100 Hz) . Jeśli zoptymalizujesz system, może obsługiwać dane o wyższej częstotliwości (może 10 KHz danych, jeśli przejdziesz do skrajności) .
* Dane z jednego czujnika lub kolekcja podobnych czujników.
*    [Wersowanie](#versioning) / [Nauka powtarzalna](https://en.wikipedia.org/wiki/Reproducibility) / DOI s --
Sytuacje, w których trzeba być w stanie dokonać zmian w danych (np. zmienić flagę kontroli jakości) , wiedzieć, który autor dokonał każdej zmiany, znać znacznik czasu, kiedy autor dokonał zmiany, i (na żądanie) być w stanie zobaczyć oryginalne dane sprzed dokonania zmiany. Te zbiory danych kwalifikują się zatem do [ DOI s](https://en.wikipedia.org/wiki/Digital_object_identifier) . ponieważ spotykają się z DOI wymóg, aby zbiór danych nie uległ zmianie, z wyjątkiem agregacji. Generalnie, w pobliżu zbiorów danych w czasie rzeczywistym nie kwalifikują się do DOI s ponieważ dane są często zmieniane z mocą wsteczną (np. do celów QA / QC) .
     

Gdy dane znajdują się w zbiorze danych EDDTableFromHttpGet, każdy użytkownik może żądać danych w ten sam sposób, w jaki żąda danych z dowolnego innego zbioru danych EDDTable.
     
#### Eksperymentalne: Ostrożnie.{#experimental-be-careful} 
Ponieważ ten system jest nowy i utracone dane środowiskowe nie mogą być ponownie nabyte, należy traktować EDDTableFromHttpGet jako eksperymentalne. Jeśli przejdziesz z innego systemu, proszę uruchomić stary system i nowy system równolegle, aż będziesz pewny, że nowy system działa dobrze (tygodnie lub miesiące, nie tylko godziny lub dni) . We wszystkich przypadkach należy upewnić się, że system oddzielnie archiwizuje .insert i .delete URL, które są wysyłane do EDDTableFromHttpGet dataset (nawet jeśli tylko w Apache i / lub Tomcat logi) Przynajmniej na jakiś czas. I we wszystkich przypadkach upewnij się, że pliki danych stworzone przez Twój zestaw danych EDDTableFromHttpGet są rutynowo backup do zewnętrznych urządzeń do przechowywania danych. (Zauważ, że [rsync](https://en.wikipedia.org/wiki/Rsync) . może tworzyć kopie zapasowe plików danych stworzonych przez EDDTableFromHttpGet bardzo skutecznie.)   
     
#### .insert i .delete{#insert-and-delete} 

Dla każdego zbioru danych w ERDDAP™ , po wysłaniu wniosku do ERDDAP™ dla podzbioru danych w zbiorze danych, możesz określić typ pliku, który chcesz dla odpowiedzi, np. .csv, .htmlTable , .nc , .json . EDDTableFromHttp Pobierz rozszerza ten system, aby obsługiwać dwa dodatkowe "typy plików", które mogą wstawić (lub zmiana) lub usunąć dane w zbiorze danych:

* .insert
    * Żądanie jest sformatowane jak standardowa odpowiedź HTML, z kluczem = pary wartości, oddzielone przez '&'. Na przykład:
        https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1  
mówi ERDDAP™ dodać lub zmienić dane dla stationID = 46088 dla określonego czasu.
    * Autorem tej zmiany jest JohnSmith, a kluczem jest jakiś Key1.
    * URL musi zawierać prawidłowe wartości (nie brakujące wartości) dla wszystkich [ http GetRequiredZmienne](#httpgetrequiredvariables-global-attribute) 
    * Jeśli wartości http Wymagane Zmienne we wniosku (np., stationID i czas) dopasować wartości w wierszu już w zbiorze danych, nowe wartości skutecznie nadpisać stare wartości (chociaż stare wartości są nadal dostępne, jeśli użytkownik żąda danych z poprzedniego [wersja](#versioning) zbioru danych) .
    * URL .insert nie może nigdy zawierać znacznika czasu = ( ERDDAP™ generuje tę wartość) lub & polecenie = (który jest określony przez .insert (który jest poleceniem = 0) lub .delete (który jest poleceniem = 1) ) .
    * Jeśli .insert URL nie określa wartości dla innych kolumn, które są w zbiorze danych, przyjmuje się, że są to wartości natywne brakujące (MAX\\ _ VALUE dla typów danych całkowitych, NaN dla pływaków i podwójnych oraz "" dla strun) .
             
    * .delete
        * Żądanie jest sformatowane jak standardowa odpowiedź HTML, z kluczem = pary wartości, oddzielone przez '&'. Na przykład:
            https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1  
mówi ERDDAP™ do usunięcia danych stationID = 46088 w określonym czasie.
        * Autorem tej zmiany jest JohnSmith, a kluczem jest jakiś Key1.
        * URL musi określić [ http GetRequiredZmienne](#httpgetrequiredvariables-global-attribute) we wniosku (np., stationID i czas) . Jeśli te wartości odpowiadają wartościom w wierszu już znajdującym się w zbiorze danych (które zwykle będą) , stare wartości są skutecznie usuwane (chociaż stare wartości są nadal dostępne, jeśli użytkownik żąda danych z poprzedniego [wersja](#versioning) zbioru danych) .
        * Nie ma potrzeby podawania wartości dla nie- HttpGetRequiredZmienne, inne niż autor, które są potrzebne do uwierzytelnienia żądania.
             
    
Szczegóły:
    * .insert i .delete żądania są sformatowane jak standardowe odpowiedzi HTML formy, z kluczem = pary wartości, oddzielone przez '&'. Wartości muszą być [% zakodowanych](https://en.wikipedia.org/wiki/Percent-encoding) . Tak więc, musisz zakodować znaki specjalne do postaci% HH, gdzie HH jest dwucyfrową wartością szesnastkową znaku. Zazwyczaj trzeba zamienić kilka znaków interpunkcji:% na% 25, & na% 26 ", na% 22,&lt;% 3C, =% 3D, &gt;% 3E, +% 2B, | w% 7C, \\[ w% 5B, \\] do% 5D, spacja do% 20 i konwertuj wszystkie znaki powyżej # 127 na ich formę UTF- 8, a następnie procent kodowania każdego bajtu formy UTF- 8 do formatu% HH (poproś programistę o pomoc) .
    * .insert i .delete wnioski muszą zawierać [ http GetRequiredZmienne](#httpgetrequiredvariables-global-attribute) , np., stationID i czas. W przypadku żądań .insert przyjmuje się, że wartości nie są określone we wniosku. (MAX\\ _ VALUE dla zmiennych całkowitych, NaN dla zmiennych zmiennoprzecinkowych i podwójnych oraz pusty String dla zmiennych strunowych) . Dla .delete requests, wartości dla non-HttpGetRequired Zmienne (inne niż autor, który jest wymagany) są ignorowane.
    * .insert i .delete żądania muszą zawierać nazwę autora i klucz autora poprzez parametr w formularzu autor = *autor\\ _ key* jako ostatni parametr we wniosku. Złożenie takiego wniosku na końcu zapewnia otrzymanie całego wniosku przez ERDDAP . Tylko autor (nie klucz) będą przechowywane w pliku danych. Musisz określić listę dozwolonych *autor\\ _ key* przez atrybut globalny [ http GetKeys](#httpgetkeys) 
    * Parametry .insert i .delete mogą być skalarne (pojedyncza) wartości lub tablice dowolnej długości w postaci \\[ wartość 1, wartość 2, wartość 3,..., wartość N \\] . Dla danego żądania, wszystkie zmienne z tablicami muszą mieć tablice o tej samej liczbie wartości (inaczej to błąd) . Jeśli żądanie ma wartości skalarne i tablice, wartości skalarne są replikowane, aby stać się tablicami o tej samej długości co określone tablice, np., & stationID = 46088 może być traktowane jako & stationID = \\[ 46088,46088,46088 \\] . Tablice są kluczem do [wysoka przepustowość](#httpget-speed) . Bez tablic, będzie wyzwaniem dla .insert lub .delete więcej niż 8 wierszy danych na sekundę od zdalnego autora (z powodu całej sieci) . Z tablicami, będzie łatwo .insert lub .delete więcej niż 1000 rzędów danych na sekundę z zdalnego czujnika.
    * .insert i .delete accept (bez komunikatu błędu) liczby zmiennoprzecinkowe, gdy oczekuje się liczby całkowitej. W tych przypadkach zbiór danych okrąża wartości do liczb całkowitych.
    * .insert i .delete accept (bez komunikatu błędu) liczby całkowite i zmiennoprzecinkowe, które są poza zakresem danych zmiennej. W tych przypadkach zbiór danych przechowuje wartości jako ERDDAP rodzime brakujące wartości dla tego typu danych (MAX\\ _ VALUE dla typów całkowitych i NaN dla pływaków i podwójnych) .
         
#### Odpowiedź{#response} 
Jeśli .insert lub .delete URL powiedzie się, kod odpowiedzi HTTP wyniesie 200 (OK) i odpowiedź będzie tekst z .json obiekt, np.,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
Zauważcie, że znaczniki czasu mają milisekundową precyzję.

Jeśli .insert lub .delete URL zawiedzie, otrzymasz kod odpowiedzi HTTP inny niż 200 (Dobrze.) , np., Błąd 403 Zakazane w przypadku zgłoszenia nieprawidłowej wartości autora\\ _ key. ERDDAP™ wysyła kod odpowiedzi HTTP (nie, np., .json błąd sformatowany) ponieważ tak to się robi w Internecie i ponieważ błędy mogą wystąpić wszędzie w systemie (np. w sieci, która zwraca błąd HTTP) . Jeśli błąd jest z ERDDAP™ , odpowiedź może zawierać pewien tekst (nie .json ) bardziej szczegółowe wyjaśnienie, co poszło nie tak, ale kod odpowiedzi HTTP (200 = Dobra, wszystko inne to kłopoty) jest właściwym sposobem sprawdzenia, czy .insert lub .delete odniosły sukces. Jeśli sprawdzanie kodu odpowiedzi HTTP nie jest możliwe lub jest niewygodne, wyszukaj "status": "sukces" w tekście odpowiedzi, który powinien być wiarygodnym wskaźnikiem sukcesu.
    
#### Pliki dziennika{#log-files} 
Kiedy EDDTableFromHttpGet otrzymuje polecenia .insert i .delete, po prostu dodaje informacje do odpowiedniego pliku w zestawie plików dziennika, z których każda jest tabelą przechowywaną w [JSON Plik linii CSV](https://jsonlines.org/examples/) . Kiedy użytkownik składa wniosek o dane, ERDDAP™ szybko odczytuje odpowiednie pliki dziennika, wprowadza zmiany do zbioru danych w kolejności, w jakiej zostały wykonane, a następnie filtruje żądanie poprzez ograniczenia użytkownika, jak każdy inny ERDDAP™ żądania dotyczące danych. Podział danych na różne pliki dziennika, przechowywanie różnych informacji (np. znacznik czasu polecenia i czy polecenie było .insert lub .delete) , i różne aspekty konfiguracji zbioru danych, wszystkie umożliwiają ERDDAP do przechowywania i pobierania danych z tego zbioru danych bardzo szybko i bardzo skutecznie.
     
#### Bezpieczeństwo i Autor{#security-and-author} 
Każde polecenie .insert i .delete musi zawierać & autora = *autor\\ _ key* jako ostatni parametr, gdzie autor\\ _ key składa się z identyfikatora autora (wybrałeś: imię, inicjały, pseudonim, numer) , podkreślenie i sekretny klucz. W ERDDAP™ administrator będzie współpracował z autorami w celu wygenerowania listy ważnych wartości autora\\ _ key, które mogą zostać zmienione w każdej chwili.
Kiedy EDDTableFromHttpGet otrzymuje polecenie .insert lub .delete, upewnia się, że authorID\\ _ key jest ostatnim parametrem i poprawnym. Ponieważ jest to ostatni parametr, wskazuje, że cała linia poleceń została osiągnięta ERDDAP™ i nie został obcięty. Tajny klucz zapewnia, że tylko konkretni autorzy mogą umieścić lub usunąć dane w zbiorze danych. ERDDAP™ następnie pobiera authorid i zapisuje to w zmiennej autora, tak aby każdy mógł zobaczyć, kto był odpowiedzialny za daną zmianę w zbiorze danych.
Polecenia .insert i .delete mogą być wykonywane tylko poprzez https:   (bezpieczny)   ERDDAP™ URL. Zapewnia to, że przekazywane informacje są przechowywane w tajemnicy podczas tranzytu.
     
#### znacznik czasu{#timestamp} 
W ramach systemu dziennika EDDTableFromHttpGet dodaje znacznik czasu (czas, że ERDDAP otrzymano wniosek) do każdego polecenia, które przechowuje w plikach dziennika. Ponieważ ERDDAP™ generuje znacznik czasu, nie autorów, nie ma znaczenia, czy różni autorzy dokonują zmian z komputerów z zegarem ustawionym na nieco inny czas. Znacznik czasowy niezawodnie wskazuje czas dokonania zmiany w zbiorze danych.
     
#### HTTP POST{#http-post} 
*    ["Co z HTTP POST?"](#http-post)   
HTTP [POST](https://en.wikipedia.org/wiki/POST_(HTTP) ) jest lepszą alternatywą (w porównaniu z HTTP GET ) do wysyłania informacji od klienta do serwera HTTP. Jeśli możesz, lub jeśli naprawdę chcesz poprawić bezpieczeństwo, użyj POST zamiast GET, aby wysłać informacje do ERDDAP . POST jest bardziej bezpieczny, ponieważ: z GET i https , URL jest przekazywany w bezpieczny sposób, ale cały URL (w tym parametry, w tym autor\\ _ key) będzie napisane do Apaczów, Tomcat, i ERDDAP™ logowanie plików, gdzie ktoś może je odczytać, jeśli pliki nie są prawidłowo zabezpieczone. Z POST parametry są przekazywane w bezpieczny sposób i nie są zapisywane do plików dziennika. POST jest trochę trudniejsze dla klientów do pracy z i nie jest obsługiwane tak szeroko przez oprogramowanie klienta, ale języki programowania go obsługują. Zawartość wysyłana do zbioru danych poprzez GET lub POST będzie taka sama, tylko sformatowana w inny sposób.
     
####  http Wymagane Zmienne Atrybut globalny{#httpgetrequiredvariables-global-attribute} 
Zasadniczą częścią tego, co sprawia, że cały system działa jest wymagany atrybut globalny http Wymagane Zmienne, które jest oddzielona comma- listy dataVariable nazwy źródeł, które jednoznacznie identyfikują wiersz danych. Powinno to być jak najmniejsze i prawie zawsze będzie zawierać zmienną czasową. Na przykład, tutaj są zalecane http Wymagane Zmienne dla każdego z [CF Geometrie do pobierania próbek dyskretnych (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)   (Oczywiście nazwy identyfikacyjne mogą się różnić w zbiorze danych.) :

* Dla TimeSeries: stationID , time
* Trajektoria: trajektoryID, czas
* Dla profilu: czas (zakładając, że czas jest profilem\\ _ id) , głębokość
* Dla TimeSeries Profil: stationID , time (zakładając, że czas jest profilem\\ _ id) , głębokość
* Dla Trajektorii Profil: trajektoryID, czas (zakładając, że czas jest profilem\\ _ id) , głębokość

    
Przyjmowanie TimeSeries jako przykładu:
Podając polecenie .insert, które zawiera stationID = 46088 i czas = 2016-06-23T19: 53: 00Z (i inne wartości dla innych zmiennych) :
* Jeżeli dla tej stacji nie istnieją żadne dane i ten czas, skutkiem będzie dodanie danych do zbioru danych.
* Jeżeli istnieją dane dla tej stacji i ten czas, to skutkiem będzie zastąpienie istniejącego wiersza danych nowymi danymi. (Oczywiście, ponieważ ERDDAP™ zachowuje dziennik każdego otrzymanego polecenia, stare dane są nadal w dzienniku. Jeśli użytkownik zażąda danych z wersji zbioru danych przed tą zmianą, będą oni widzieli starsze dane.)   
         
####  http GetDirectoryStructure{#httpgetdirectorystructure} 
*    [ http GetDirectory Globalny atrybut struktury i dane (Dziennik) Nazwy plików](#httpgetdirectorystructure)   
Częścią tego, co sprawia, że cały system działa skutecznie jest to, że ERDDAP™ tworzy zbiór danych (log) pliki, każdy z innym fragmentem zbioru danych. Jeśli są dobrze ustawione, ERDDAP™ będzie w stanie szybko odpowiedzieć na większość wniosków o dane. Ta konfiguracja jest określona przez http GetDirectoryStructure globalny atrybut, który jest String, który wygląda jak względna nazwa pliku, np. ", stationID / 10 lat ", ale jest to specyfikacja struktury katalogu. Części wskazują jak katalog i nazwy plików dla danych (log) będą tworzone pliki.
    
    * Jeśli część jest liczbą całkowitą (&gt; = 1) plus czas (milisekunda, sekunda, minuta, godzina, data, miesiąc, rok lub ich plurale) , np, 10 lat, a następnie EDDTableFromHttpGet zbiór danych weźmie wartość czasu dla wiersza danych (np. 2016-06-23T19: 53: 00Z) , obliczyć czas skrócony do tej precyzji (np., 2010) i zrobić z tego folder lub nazwę pliku.
        
Celem jest uzyskanie stosunkowo dużej części danych do każdego pliku, ale znacznie mniej niż 2GB.
        
    * W przeciwnym razie, część specyfikacji musi być dataVariable jest sourceName , np., stationID . W tym przypadku EDDTableFromHttpGet wytworzy folder lub nazwę pliku z wartości tej zmiennej dla nowego wiersza danych (np. "46088") .
    
Ponieważ dane komend .insert i .delete są przechowywane w określonych danych (log) pliki, EDDTableFromHttpGet zwykle trzeba tylko otworzyć jeden lub kilka danych (log) pliki, aby znaleźć dane dla danego żądania użytkownika. I dlatego, że wszystkie dane (log) plik posiada wszystkie istotne informacje dla jego części zbioru danych, to jest szybkie i łatwe dla EDDTableFromHttpGet zrobić konkretną wersję (lub bieżącą wersję) zbioru danych dla danych w tym pliku (i nie muszą generować żądanej wersji całego zbioru danych) .
    
Ogólne wytyczne opierają się na ilości i częstotliwości danych. Jeśli założymy 100 bajtów na rząd danych, to...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
Na przykład, jeśli struktura katalogu jest stationID / 2 miesiące i wstawiasz dane z dwóch stacji (46088 i 46155) z wartościami czasowymi od grudnia 2015 r. do maja 2016 r., EDDTableFromHttp Pobierz będzie tworzyć katalogi o nazwie 46088 i 46155 i tworzyć pliki w każdym o nazwie 2015-11 .json l, 2016- 01 .json L, 2016- 03 .json l, 2016- 05 .json l (każde posiadanie danych o wartości 2 miesięcy dla danej stacji) . W dowolnym momencie w przyszłości, jeśli używasz .insert lub .delete do zmiany lub usunięcia danych, na przykład dla stacji 46088 w 2016- 04- 05T14: 45: 00Z, EDDTableFromHttp Dostać będzie dołączyć to polecenie do 46088 / 2016-03 .json l, odpowiednie dane (log) plik. I jasne jest, że można dodawać dane dla innych stacji w każdej chwili w przyszłości, ponieważ zbiór danych po prostu stworzy dodatkowe katalogi niezbędne do przechowywania danych z nowych stacji.
    
####  http GetKeys{#httpgetkeys} 
Każda tabela EDDTable FromHttp Pobierz zbiór danych musi mieć atrybut globalny http GetKeys, który określa listę dozwolonych autorów i ich tajne klucze jako oddzielone comma- listy *autor\\ _ key* , np., JohnSmith\\ _ someKey1, HOBOlogger\\ _ someKey2, QCScript59\\ _ someKey3.
* autor\\ _ key jest wrażliwy na przypadek i musi być w całości znakami ASCII (# 33 - # 126 i bez znaków przecinek, "lub"
* Klucze są jak hasła, więc MUSI być &gt; = 8 znaków, trudno zgadnąć, i bez wewnętrznych słowników. Powinieneś traktować je tak, jak hasła -- zachować je w tajemnicy.
* Pierwszy znak '\\ _' oddziela autora od klucza, więc nazwa autora nie może zawierać znaku '\\ _' (ale klucz może) .
* Każdy autor może mieć jednego lub więcej autora\\ _ key, np. JohnSmith\\ _ some Key1, JohnSmith\\ _ some Key7 itd.
* Możesz zmienić wartość tego atrybutu w dowolnym momencie. Zmiany stają się skuteczne przy następnym załadowaniu zbioru danych.
* Informacje te zostaną usunięte z Globalnych Atrybuty zbioru danych przed ich upublicznieniem.
* Każdy wniosek do zbioru danych o dodanie lub usunięcie danych musi zawierać & autora = *autor\\ _ key* parametr. po sprawdzeniu ważności klucza, ERDDAP™ tylko zapisuje część autora (nie klucz) w pliku danych.

#### Ustaw{#set-up} 

Oto zalecane kroki do stworzenia zbioru danych EDDTableFromHttpGet:

1. Zrobić główny katalog do przechowywania danych tego zbioru danych. Dla tego przykładu, użyjmy / data / testGet /. Użytkownik uruchomiony GenerateDatasetsXml i uruchomiony użytkownik ERDDAP™ muszą mieć dostęp do tego katalogu.
     
2. Użyj edytora tekstu, aby pobrać próbkę .json L plik CSV z rozszerzeniem .json I w tym katalogu.
Nazwisko nie jest ważne. Na przykład, można to nazwać próbką .json l
Zrób 2 linię .json l Plik CSV, z nazwami kolumn na pierwszej linii i wartościami manekina / typowymi (właściwego typu danych) na drugiej linii. Oto przykładowy plik, który nadaje się do kolekcji featureType = Dane z serii TimeSeries, które zmierzały temperaturę powietrza i wody.
     \\[ Dla featureType = Trajektoria, możesz się zmienić stationID być trajektoryID. \\]   
     \\[ Dla featureType = Profil, możesz zmienić stationID być profileID i dodać zmienną głębokości. \\] 
    
     \\[ " stationID ", "time" "szerokość geograficzna", "długość geograficzna", "airTemp", "waterTemp", "timestamp", "autor", "komenda" \\] 
     \\[ "myStation", "2018- 06- 25T17: 00: 00Z", 0,0, 0,0, 0,0, 0,0, 0,0, "SomeBody", 0, \\] 
    
Uwaga:
    * Rzeczywiste wartości danych nie mają znaczenia, ponieważ w końcu usuniesz ten plik, ale powinny być odpowiedniego typu danych. W szczególności zmienna czasu powinna używać tego samego formatu, jakiego będą używać rzeczywiste dane ze źródła.
    * Dla wszystkich zmiennych, sourceName będzie równa destinationName , więc użyj poprawnych / końcowych nazw zmiennych teraz, w tym czasu, szerokości, długości geograficznej i czasami głębokości lub wysokości, jeśli zmienne z tych informacji zostaną włączone.
    * Niemal zawsze będzie zmienna o nazwie czas, która zapisuje czas obserwacji. To może być dataType String z [jednostki odpowiednie do czasów strun](#string-time-units)   (np., yyyy-MM-dd SSSZ) lub dane Typ podwójny z [jednostki odpowiednie do okresów liczbowych](#time-units)   (np. sekundy od 1970- 01-01T00: 00: 00Z lub inny czas bazowy) .
    * Trzy kolumny (zazwyczaj ostatnie trzy) To musi być znacznik czasu, autor, komenda.
    * Kolumna timestamp zostanie użyta przez EDDTableFromHttpGet do dodania znacznika timestamp wskazującego, kiedy dodał podaną linię danych do pliku danych. Będzie miał dataType podwójne i jednostki sekundy od 1970- 01-01T00: 00: 00Z.
    * Kolumna autora z dataType String zostanie użyta do zapisu, który autoryzowany autor dostarczył dane tej linii. Autorzy autoryzowani są określone przez [ http GetKeys atrybut globalny](#httpgetkeys) . Chociaż klucze są określone jako *autor\\ _ key* i są w "żądanie" URL w tej formie, tylko część autora jest zapisywana w pliku danych.
    * Kolumna poleceń z bajtem dataType wskaże, czy dane na tej linii są wstawiane (0) lub usunięcie (1) .
         
3. Uruchom generateDatasety Xml i powiedz mu
    
    1. Typ zbioru danych to EDDTableFromHttpGet
    2. Katalog jest (dla tego przykładu) / dane / badanie Get /
    3. Plik próbki jest (dla tego przykładu) / data / testGet / startup .json l
    4. W http Wymagane Zmienne (dla tego przykładu)   stationID , time Patrz opis [ http GetRequiredZmienne](#httpgetrequiredvariables-global-attribute) poniżej.
    5. Jeśli dane są gromadzone co 5 minut, http GetDirectoryStructure dla tego przykładu jest stationID / 2 miesiące. Patrz opis [ http GetDirectoryStructure](#httpgetdirectorystructure) poniżej.
    6. W [ http GetKeys](#httpgetkeys) 
    
Dodaj wyjście (kawałek datasets.xml dla zbioru danych) do datasets.xml .
     
4. Edytuj datasets.xml kawałek dla tego zbioru danych, aby uczynić go poprawnym i kompletnym.
W szczególności, wymienić wszystkie??? z poprawną zawartością.
     
5. Dla&lt;fileTableInMemory &gt; ustawienie:
    * Ustaw na true, jeśli zbiór danych będzie zazwyczaj otrzymywał częste żądania .insert i / lub .delete (np. częściej niż raz na 10 sekund) . To pomaga EDDTableFromHttpGet szybciej reagować na żądania .insert i / lub .delete. Jeśli ustawisz to na true, EDDTableFromHttpGet nadal będzie zapisywał tabelę plików i powiązane informacje na dysku okresowo (w razie potrzeby, w przybliżeniu co 5 sekund) .
    * Ustaw to na fałszywe (domyślny) jeśli zbiór danych będzie zazwyczaj otrzymywał rzadkie żądania .insert i / lub .delete (np. rzadziej niż raz na 10 sekund) .
         
6. Notatka: Możliwe jest stosowanie&lt;cacheFromUrl &gt; i powiązane ustawienia w datasets.xml dla tabeli EDD FromHttp Pobierz zbiory danych jako sposób na zrobienie i utrzymanie lokalnej kopii zdalnej bazy danych EDDTableFromHttpGet na innym ERDDAP . Jednak w tym przypadku ten lokalny zbiór danych odrzuci wszelkie żądania .insert i .delete.

#### Korzystanie z tabeli EDDTable Dane FromHttpGet{#using-eddtablefromhttpget-datasets} 

* Autorzy mogą składać "wnioski", które [Wstaw dane do zbioru danych lub usuń je z tego zbioru danych](#insert-and-delete) .
     
* Po umieszczeniu rzeczywistych danych w zbiorze danych można i należy usunąć oryginalny plik danych próbki.
     
* Użytkownicy mogą żądać danych z zbioru danych, tak jak w przypadku innych zbiorów danych EDDTable w ERDDAP . Jeśli żądanie nie zawiera ograniczenia w kolumnie znacznik czasu, to żądanie otrzymuje dane z bieżącej wersji zbioru danych (plik log po przetworzeniu wszystkich poleceń wstawiania i usuwania oraz ponownego sortowania przez http GetRequiredZmienne) .
     
* Użytkownicy mogą również składać wnioski specyficzne dla zbiorów danych EDDTableFromHttpGet:
    * Jeżeli wniosek zawiera&lt;lub&lt;= ograniczenie kolumny timestamp, następnie ERDDAP™ przetwarza wiersze pliku dziennika aż do określonego znacznika czasu. W rezultacie tymczasowo usuwa wszystkie zmiany wprowadzone do zbioru danych od czasu tej wartości znacznika czasu. Aby uzyskać więcej informacji, zobacz [Wersowanie](#versioning) .
    * Jeśli żądanie zawiera &gt;, &gt; =, lub = ograniczenie kolumny timestamp, np., & timestamp&lt;= 0, następnie ERDDAP™ zwraca dane z plików danych jak jest, bez przetwarzania poleceń wprowadzania i usuwania.
* W przyszłości wyobrażamy sobie, że narzędzia zostaną zbudowane (przez nas? Przez ciebie?) do pracy z tymi zbiorami danych. Na przykład, może istnieć skrypt, który odczytuje surowe pliki dziennika, stosuje inne równanie kalibracyjne i generuje / aktualizuje inny zbiór danych z tymi uzyskanymi informacjami. Zauważ, że skrypt może uzyskać oryginalne dane poprzez żądanie ERDDAP™   (który otrzymuje dane w formacie pliku, który jest najprostszy do pracy ze skryptem) i wygenerować / zaktualizować nowy zestaw danych poprzez .insert "żądania" do ERDDAP . Skrypt nie potrzebuje bezpośredniego dostępu do plików danych; może być na dowolnym autoryzowanym komputerze autora.
     

#### Szczegółowe informacje o EDDTableFromHttpGet{#detailed-information-about-eddtablefromhttpget} 

Tematy są następujące:

*    [Nie zmieniaj planów&#33;](#dont-change-the-setup) 
*    [CRUD](#crud) 
*    [Wnioski inwalidowe](#invalidrequests) 
*    [Prędkość](#httpget-speed) 
*    [Solidny](#robust) 
*    [Wiarygodność systemu](#system-reliability) 
*    [Wersowanie](#versioning) 
*    ["A co z HTTP PUT i DELETE?"](#https-put-and-delete) 
*    [Uwagi](#httpget-notes) 
*    [Dzięki CHORDS za podstawowy pomysł.](#thanks) 

Oto szczegółowe informacje:

##### Nie zmieniaj planów&#33;{#dont-change-the-setup} 
Po utworzeniu zbioru danych i dodaniu do niego danych:

* NIE dodawać ani usuwać żadnych dataVariable b.
* Nie zmieniaj sourceName lub destinationName z dataVariable b.
* Nie zmieniaj danych Rodzaj dataVariable b. Ale możesz zmienić dataVariable metadane.
* Nie zmieniaj http Wymagane Zmienne atrybut globalny.
* Nie zmieniaj http GetDirectoryStructure globalny atrybut.

Jeśli musisz zmienić którąkolwiek z tych rzeczy, zrób nowy zestaw danych i prześlij wszystkie dane do nowego zbioru danych.
     
##### CRUD{#crud} 
W informatyce, cztery podstawowe polecenia do pracy z zbiorem danych są [CREATE, READ, UPDATE, DELETE (CRUD) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) . SQL, język do pracy z relacyjnymi bazami danych, ma odpowiednik w INSERT, SELECT, UPDATE i DELETE. W EDDTableFromHttpGet,

* .insert jest kombinacją CREATE i UPDATE.
* .delete to DELETE.
* Regularnym systemem żądania podzbiorów danych jest READ.

Tak więc EDDTableFromHttpGet obsługuje wszystkie podstawowe polecenia do pracy z zbiorem danych.
     
* .insert lub .delete żądania bez błędów zwrócą kod statusu HTTP = 200 i obiekt JSON, np.,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
Dwie wartości znacznika czasu odnoszą się do tego samego milisekundy, czyli milisekundy, które będą przechowywane w zmiennej znacznika czasu dla wierszy danych, które zostały wstawione lub usunięte. ERDDAP™ nie zmieni nazwy i formatowania tych par wartości kluczowych w przyszłości. ERDDAP™ może dodać dodatkowe pary wartości klawiszy do obiektu JSON w przyszłości.
     
##### Wnioski inwalidowe{#invalidrequests} 
Nieprawidłowe żądania .insert lub .delete zwrócą kod błędu HTTP inny niż status = 200 i nie zostaną wprowadzone żadne zmiany w zbiorze danych. Obejmuje to żądania z błędnymi informacjami autora, nieprawidłowe nazwy zmiennych, różne długości tablic dla różnych zmiennych, brak wymaganych zmiennych, brak wymaganych wartości zmiennych itp. Jeżeli wniosek dotyczy więcej niż jednego pliku danych, możliwe jest, że część wniosku odniesie sukces, a część nie. Jednakże nie powinno to być problemem, jeśli czujnik wysyłający żądanie traktuje każdą awarię jako kompletną awarię. Na przykład, jeśli powiesz ERDDAP™ do wprowadzenia (lub usunąć) te same dane dwa razy z rzędu, najgorszy przypadek jest to, że informacje są przechowywane dwa razy, blisko w pliku dziennika. Trudno zrozumieć, jak to może powodować kłopoty.
     
##### HttpGet Speed{#httpget-speed} 
Dla .insert lub .delete requests (nieliczenie http wysokość) , Ballpark figury prędkości .insert lub .delete są
1ms na .insert z 1 wierszem danych
2ms na .insert z 10 wierszami danych w tablicach ( \\[  \\] )   
3ms na .insert z 100 wierszami danych w tablicach ( \\[  \\] )   
13ms na .insert z 1000 wierszami danych w tablicach ( \\[  \\] )   
Najwyraźniej tablice są kluczem do [wysoka przepustowość](#httpget-speed) . Bez tablic, będzie wyzwaniem dla .insert lub .delete więcej niż 8 wierszy danych na sekundę od zdalnego autora (z powodu całej sieci) . Z tablicami, będzie łatwo .insert lub .delete więcej niż 1000 rzędów danych na sekundę z zdalnego czujnika.

Z bardzo dużą ilością danych na żądanie, trafisz limit Tomcat do maksymalnej długości zapytania (Domyślnie 8KB?) , ale to może być zwiększona przez edycję maxHttpHeaderSize ustawienia *tomcat* / conf / server.xml HTTP / 1.1 Wejście łącznika.

Kiedy ERDDAP™ odczytuje dane JSON Lines CSV (log) pliki, istnieje mała kara czasu w porównaniu do czytania plików danych binarnych. Uznaliśmy, że ta kara czasowa za czytanie jest rozsądną ceną za szybkość i solidność systemu podczas pisania danych (które ma zasadnicze znaczenie) .

##### SSD{#ssd} 
 [Dla większej prędkości,](#ssd) stosować [Solid State Drive (SSD) ](https://en.wikipedia.org/wiki/Solid-state_drive) do przechowywania danych. Mają dużo szybszy czas dostępu do plików (&lt;0,1ms) niż dyski twarde (3 - 12 ms) . Mają również szybszy transfer danych (200 - 2500 MB / s) niż dyski twarde (~ 200 MB / s) . Ich koszty znacznie spadły w ostatnich latach. Chociaż wczesny SSD miał problemy po dużej liczbie wpisów do danego bloku, problem ten jest teraz znacznie zmniejszony. Jeśli po prostu użyć SSD, aby zapisać dane raz, a następnie przeczytać je wiele razy, nawet SSD klasy konsumenckiej (który jest znacznie mniej kosztowny niż klasy przedsiębiorstw SSD) To potrwa długo.
    
##### Solidny{#robust} 
Staraliśmy się uczynić ten system jak najprostszym i jak najsolidniejszym.
* System jest zaprojektowany tak, aby mieć wiele wątków (np. czujnik, automatyczny skrypt QC i człowiek) jednocześnie pracując nad tym samym zbiorem danych, a nawet nad tym samym plikiem. Większość z nich jest możliwa dzięki zastosowaniu podejścia do przechowywania danych w pliku dziennika oraz bardzo prostym typom plików, [JSON Linie plików CSV](https://jsonlines.org/examples/) , do przechowywania danych.
* Kolejną ogromną zaletą JSON Lines CSV jest to, że jeśli plik kiedykolwiek zostanie uszkodzony (np. nieprawidłowe z powodu błędu na linii) , łatwo jest otworzyć plik w edytorze tekstu i naprawić problem.
* Kolejną zaletą jest to, że jeśli na linii w pliku występuje błąd, system może nadal odczytywać wszystkie dane na liniach przed i po linii błędu. A system może nadal zapisywać dodatkowe informacje .insert i .delete.
* Ogromna zaleta korzystania z dostępnych plików standardowych (w porównaniu z relacyjną bazą danych lub Cassandrą lub innym oprogramowaniem) : Nie ma innego oprogramowania, które musi być utrzymywane i które musi być uruchomione w celu przechowywania lub pobierania danych. I jest to łatwe do tworzenia kopii zapasowych standardowych plików w dowolnym czasie i w sposób przyrostowy, ponieważ dane są w kawałkach (po chwili tylko plik current- time dla każdej stacji będzie się zmieniać) . W przeciwieństwie do tego, potrzeba znacznego wysiłku i czasu, aby utworzyć zewnętrzne pliki zapasowe z baz danych i z Cassandry.
         
##### Wiarygodność systemu{#system-reliability} 
To rozsądne oczekiwać jednego serwera z ERDDAP™ aby mieć 99,9% przestoju -- to jest około 9 godzin przestoju rocznie (Chociaż, możesz tego użyć w jedną złą noc&#33;) .
Jeśli jesteś pracowity i szczęśliwy, możesz dostać 99,99% czasu pracy (53 minuty przestoju rocznie) , ponieważ tylko kilka wznowienia aktualizacji zajmie tyle czasu.
Musiałbyś podjąć ekstremalne środki. (oddzielny serwer zapasowy, nieprzerwany zasilacz, zapasowa klimatyzacja, 24x7x365 personel do monitorowania witryny, itp.) aby mieć niewielkie szanse na 99,999% czasu pracy (5.25 minut przestoju rocznie) . Nawet wtedy jest bardzo mało prawdopodobne, że osiągniesz 99,999% czasu pracy (lub nawet 99,99%) Ponieważ problemy są często poza twoją kontrolą. Na przykład Amazon Web Service i Google oferują zaskakująco niezawodne usługi internetowe, ale duże ich części są czasami w dół na godziny.

Spójrz prawdzie w oczy, każdy chce ERDDAP™ mieć 100% czasu pracy, lub co najmniej "sześć dziewiątek" (99,9999% uptime równa się 32 sekundom przestoju rocznie) Ale nie dostaniesz go bez względu na to, ile czasu, wysiłku i pieniędzy wydajesz.

Ale... ERDDAP™ To nie jest prawdziwy cel. Celem jest zbudowanie niezawodnego **system** - Tego, który nie traci żadnych danych. To jest problem do rozwiązania.

Rozwiązaniem jest: zbudować fault- tolerancji do oprogramowania komputerowego, który wysyła dane do ERDDAP . W szczególności, to oprogramowanie powinno utrzymać kolejkę danych czekających, aby przejść do ERDDAP . Po dodaniu danych do kolejki, oprogramowanie powinno sprawdzić odpowiedź z ERDDAP . Jeśli odpowiedź nie zawiera danych otrzymanych. Nie ma błędów., wtedy oprogramowanie powinno zostawić dane w kolejce. Kiedy więcej danych jest generowanych i dodawanych do kolejki, oprogramowanie powinno spróbować ponownie .insert danych w kolejce (Może z \\[  \\] system) . Odniesie sukces albo zawiedzie. Jeśli zawiedzie, spróbuje później. Jeśli napiszesz oprogramowanie do pracy w ten sposób i jeśli oprogramowanie jest gotowe do kolejkowania danych wartych kilka dni, rzeczywiście masz duże szanse na wysłanie 100% danych czujnika do ERDDAP . I zrobisz to bez wysiłku czy wydatków.

 \\[ Kontekst: Nie wymyśliliśmy tego. [W ten sposób sieci komputerowe osiągają niezawodność.](https://en.wikipedia.org/wiki/Reliability_(computer_networking) ) Sieci komputerowe są z natury niewiarygodne. Więc kiedy przesyłasz plik z jednego komputera do drugiego, wysyłające oprogramowanie wie / oczekuje, że niektóre pakiety mogą zostać utracone. Jeśli nie otrzyma odpowiedniego potwierdzenia dla danego pakietu z odbiornika, oddaje utracony pakiet. Dzięki temu podejściu stosunkowo prosty nadawca i oprogramowanie odbiornika mogą zbudować niezawodny system transferu plików na szczycie nieniezawodnej sieci. \\] 
    
##### Dlaczego pliki JSON Lines CSV?{#why-json-lines-csv-files} 
EDDTableFromHttpGet [JSON Linie plików CSV](https://jsonlines.org/examples/) . do przechowywania danych. Powody są następujące:

* Głównym powodem jest: Prostota plików JSON Lines CSV oferuje szybki, łatwy i niezawodny sposób, aby umożliwić wiele wątków do zapisu do danego pliku (np. poprzez synchronizację nazwy pliku) .
* Jeśli plik JSON Lines CSV kiedykolwiek został uszkodzony (np. nieprawidłowe z powodu błędu na linii) , EDDTableFromFromHttpGet mógł nadal odczytać wszystkie dane na wszystkich wierszach przed i po linii błędu. A system .insert i .delete może nadal dodawać nowe dane do pliku danych.
* Ponieważ pliki JSON Lines CSV są plikami ASCII, jeśli plik kiedykolwiek został uszkodzony, byłoby łatwo naprawić (w edytorze tekstu) .
* Obsługa linii JSON CSV Unicode strun.
* JSON Lines CSV obsługuje łańcuchy o zmiennej długości (nie ogranicza się do pewnej długości maksymalnej) .
* JSON Lines CSV obsługuje 64- bitowe liczby całkowite (Długi) .
* Formalny charakter i dodatkowa składnia JSON Lines CSV (vs old- school CSV) zapewnia pewne dodatkowe zapewnienie, że dana linia nie została uszkodzona.

Początkowo próbowaliśmy użyć .nc 3 pliki o nieograniczonym wymiarze. Pojawiły się jednak problemy:

* Głównym problemem było: Nie ma niezawodnego sposobu, aby pozwolić wielu wątków zapisać do .nc 3 plik, nawet jeśli wątki współpracują poprzez pisanie w zsynchronizowany sposób.
* Jeśli .nc 3 plik staje się uszkodzony, system .insert i .delete nie może nadal używać pliku.
* Ponieważ .nc 3 pliki są binarne, jeśli plik staje się uszkodzony (co robią z powodu problemu wielowątkowego) są niezwykle trudne lub niemożliwe do naprawienia. Nie ma narzędzi do naprawy.
* CF nie ma sposobu na określenie kodowania strun, więc nie ma oficjalnego sposobu na wsparcie Unicode, np. kodowania UTF- 8. Próbowaliśmy przekonać CF do wsparcia atrybutu\\ _ Encoding, ale nie byliśmy w stanie osiągnąć żadnego postępu. ( Unidata , to their credit, does support the\\ _ Encoding attribute.) 
*    .nc 3 pliki obsługują tylko stałe łańcuchy długości. Znowu próbowaliśmy zdobyć CF i Unidata Wsparcie strun o zmiennej długości, ale nie było możliwe.
*    .nc 3 pliki nie obsługują łatwego sposobu odróżniania zmiennych pojedynczych znaków od zmiennych String. Znowu próbowaliśmy zdobyć CF i Unidata wspieranie systemu rozróżniania tych dwóch typów danych, ale nie były one w stanie poczynić żadnych postępów.
*    .nc 3 pliki obsługują tylko znaki 8- bit z nieokreślonym kodowaniem. Znowu próbowaliśmy zdobyć CF i Unidata wsparcie systemu określania kodowania, ale nie były w stanie poczynić żadnych postępów.
*    .nc 3 pliki nie obsługują 64- bitowych liczb całkowitych (Długi) . Znowu próbowaliśmy zdobyć CF i Unidata wspierać system tęsknoty, ale nie były w stanie poczynić żadnych postępów.
         
##### Wersowanie{#versioning} 
Ponieważ tabela EDDTable FromHttp Pobierz dziennik wszystkich zmian w zbiorze danych z znacznikiem czasu i autora każdej zmiany, może szybko odtworzyć ten zbiór danych od dowolnego punktu w czasie. W pewnym sensie istnieje wersja na dowolny punkt czasu. Jeżeli wniosek użytkownika o dane zawiera znacznik czasu&lt;= ograniczenie, np., & timestamp&lt;= 2016-06-23T16: 32: 22.128Z (lub dowolnego punktu czasowego) , ale bez ograniczeń autora lub polecenia, ERDDAP™ odpowie na wniosek, generując najpierw wersję zbioru danych od tego momentu. Więc... ERDDAP™ stosuje inne ograniczenia użytkownika, jak w przypadku innych wniosków o dane z ERDDAP . EDDTableFromHttpGet jest tak ustawiony, że proces ten jest bardzo szybki i skuteczny, nawet dla bardzo dużych zbiorów danych.

Podobnie, użytkownik może dowiedzieć się, kiedy zestaw danych został ostatnio zaktualizowany przez żądanie...? timestamp & timestamp = max (znacznik czasu) & Wyróżnij () 

I dla każdego wniosku o dane, dla każdej wersji zbioru danych, użytkownicy mogą zobaczyć, który autor dokonał zmian, i kiedy je zrobili.

Ten system przekształcania umożliwia [Nauka powtarzalna](https://en.wikipedia.org/wiki/Reproducibility) ponieważ każdy może w dowolnym momencie zażądać danych z wersji zbioru danych w dowolnym momencie. Ta modyfikacja nie jest możliwa z żadnym innym systemem, o którym wiemy. Podstawowy mechanizm jest bardzo wydajny, ponieważ nie jest potrzebne dodatkowe miejsce do przechowywania, a przetwarzanie jest naprawdę minimalne.

Nie każdy potrzebuje tego typu finezowanej wersji, ale jest to niezwykle przydatne, być może konieczne, w kontekście dużej organizacji zarządzania danymi (np. OOI, Earth Cube, Data One oraz NOAA NCEI) gdzie zbiór danych może mieć wielu autorów (np. czujnik, automatyczny skrypt QC i ludzki edytor) .

 \\[ Historia: Zapotrzebowanie na tego typu wersje najpierw przyszedł do mnie (Bob) podczas czytania i omawiania OOI w 2008 r. W tamtym czasie OOI miał uciążliwy, powolny, nieefektywny system do modyfikowania na bazie Gita. Git jest świetny do tego, do czego został zaprojektowany, ale nie do tego. W 2008 r., podczas dyskusji na temat OOI, zaprojektowałem szeroko zakrojony, wydajny system zarządzania danymi, obejmujący wiele funkcji, które dodałem do ERDDAP™ od tego czasu, włącznie z tym systemem przekształcania. W tamtym czasie i od tego czasu OOI była zaangażowana w ich system przekształcania i nie była zainteresowana alternatywami. W 2016 r. pojawiły się inne aspekty tego planu i zacząłem je wdrażać. Ponieważ było wiele przerw w pracy nad innymi projektami, nie skończyłem do 2018 roku. Nawet teraz, nie jestem świadomy żadnego innego naukowego systemu danych, który oferuje tak szybki i łatwy dostęp do wersji danych z dowolnego punktu w czasie, dla często zmieniających się zbiorów danych. Proste systemy plików tego nie oferują. Bazy danych nie. Cassandra nie. \\] 
    
##### Wstaw i usuń HTTPS{#https-put-and-delete} 
*    ["A co z HTTPS PUT i DELETE?"](#https-put-and-delete)   
     [Protokół przeniesienia hipertekstu (HTTP) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) jest podstawą World Wide Web i powodem, dla którego strony internetowej adresy URL zaczynają się od "http://"albo "https://". HTTPS to HTTP z dodatkową warstwą bezpieczeństwa. Codziennie przeglądarki, skrypty i programy komputerowe tworzą miliardy HTTP (S)   **GET** wnioski o uzyskanie informacji z odległych źródeł. HTTP (S) obejmuje również inne [czasowniki](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) , w szczególności PUT (aby wcisnąć dane do serwera) oraz DELETA (do DELETE dane z serwera) . Tak, PUT i DELETE są właściwym sposobem na wstawianie danych i usuwanie danych z zbioru danych poprzez HTTP (S) . GET jest obsługiwany przez każdy element oprogramowania, które może pracować z HTTP (S) . GET jest bardzo łatwy w pracy. Każdy wie już, jak pracować z GET i wielu wie, jak korzystać z POST (które mogą być stosowane zasadniczo w taki sam sposób jak GET) , więc zrobiliśmy EDDTableFromHttpGet pracy z GET i POST. Bardzo mało osób (nawet kilku programistów komputerowych) kiedykolwiek pracował z PUT i DELETE. PUT i DELETE są na ogół obsługiwane wyłącznie przez języki komputerowe, więc używanie ich wymaga programu umiejętności. Więc PUT i DELETE są zazwyczaj o wiele bardziej kłopotliwe podejście biorąc pod uwagę sposób, w jaki narzędzia ewoluowały.
     
##### HttpGet Notatki{#httpget-notes} 
*    [Uwagi](#httpget-notes) 
    * Nie. dataVariable może mieć dataType = char. Użyj zamiast tego dataType = String. Jeśli naprawdę potrzebujesz dataType = char, email Chris. John w Noa.gov.
         
##### Dzięki.{#thanks} 
*    [Dzięki CHORDS za podstawowy pomysł.](#thanks)   
Podstawowy pomysł dla EDDTableFromHttpGet (np. przy użyciu HTTP GET wniosek o dodanie danych do zbioru danych) pochodzi z UCAR (NCAR?)   [Cloud- Hosted Real- time Data Services (CHORDY) ](https://github.com/earthcubeprojects-chords) projekt. Format parametrów we wniosku (powtarzany *nazwa = wartość* , oddzielone przez & 's) jest tym samym standardowym formatem, który jest używany przez formularze HTML na stronach internetowych. Jest to prosty i genialny pomysł, a nawet bardziej dlatego, że ma tak doskonale z ERDDAP istniejący system zajmowania się danymi tabelarycznymi. Pomysł jest oczywisty, ale... (Bob) Nie pomyślałem o tym. EDDTableFromHttp Skorzystaj z tego podstawowego pomysłu, w połączeniu z naszymi pomysłami jak go wdrożyć, aby system w ERDDAP™ do przesyłania danych. Poza podstawową ideą wykorzystania GET do wprowadzania danych do systemu, implementacja EDDTableFromHttpGet jest zupełnie inna i całkowicie niezależna od CHORDS i ma różne funkcje (np. logowanie plików, zbieranie danych, różne systemy bezpieczeństwa, obsługa CRUD, odtwarzalne dane) . Nasz kontakt z chordymi był tylko webinarem. Nie przyjrzeliśmy się ich kodom ani nie czytaliśmy o ich projekcie, ponieważ od razu wiedzieliśmy, że chcemy wdrożyć system w inny sposób. Ale jesteśmy im wdzięczni za podstawową ideę. Pełne odniesienie do CHORDS
Daniels, M. D., Kerkez, B., Chandrasekar, V., Graves, S., Stamps, D. S., Martin, C., Dye, M., Gooch, R., Bartos, M., Jones, J., Keiser, K. (2014) . Cloud- Hosted Real- time Usługi danych dla geonauki (CHORDY) oprogramowanie. Laboratorium Obserwacji Ziemi. [https://doi.org/10.5065/d6v1236q](https://doi.org/10.5065/d6v1236q)   
     
### Tabela EDDFrom Hyrax Pliki{#eddtablefromhyraxfiles} 
 [ **Tabela EDDFrom Hyrax Pliki** ](#eddtablefromhyraxfiles)   (depregated) pliki danych agregatów z kilkoma zmiennymi, z których każdy ma jeden lub więcej wspólnych wymiarów (na przykład, czas, wysokość (lub głębokość) , szerokość i długość geograficzna) , i służył przez [ Hyrax   OPeNDAP serwer](https://www.opendap.org/software/hyrax-data-server) .

* Ten typ zbioru danych jest **ZANIECHANE** . Nowszym i bardziej ogólnym rozwiązaniem jest użycie [cache Opcja FromUrl dla EDDTable Pliki FromFiles](#cachefromurl)   (lub wariant) , który tworzy lokalną kopię zdalnych plików i obsługuje dane z lokalnych plików. W&lt;opcja cacheFromUrl &gt; może być używana z dowolnym typem pliku danych tabelarycznych. **   
Jeśli z jakiegoś powodu ci się nie uda, napisz do Chrisa. John w Noa.gov.
W przypadku braku skarg przed 2020 r., ten typ zbioru danych może zostać usunięty. ** 
* Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Następnie można to edytować, aby dostroić.
* W większości przypadków, każdy plik ma wiele wartości dla najbardziej lewego (pierwszy) wymiar, na przykład, czas.
* Pliki często (ale nie muszę) mają jedną wartość dla innych wymiarów (na przykład wysokość (lub głębokość) , szerokość i długość geograficzna) .
* Pliki mogą mieć zmienne znaków o dodatkowym wymiarze (nZnaki) .
*    Hyrax serwery mogą być identyfikowane przez "/ dods- bin / nph- dods /" lub "/ opendap /" w URL.
* Ta klasa scree- scrapes Hyrax strony internetowe z listami plików w każdym katalogu. Z tego powodu jest bardzo specyficzny dla obecnego formatu Hyrax stron internetowych. Spróbujemy się dostosować. ERDDAP™ szybko jeśli / kiedy przyszłe wersje Hyrax zmienić sposób wyświetlania plików.
* W&lt;ustawienie fileDir &gt; jest ignorowane. Ponieważ ta klasa pobiera i robi lokalną kopię każdego pliku danych zdalnych, ERDDAP™ zmusza plik Reżyseria *bigParentDirectory* / kopiuj / * datasetID * /.
* Dla&lt; sourceUrl &gt;, użyj URL katalogu bazowego zbioru danych w Hyrax na przykład serwer,
    &lt; sourceUrl &gt;http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/&lt;/ sourceUrl &gt;
     (ale umieścić go na jednej linii)   (Przepraszam, ten serwer nie jest już dostępny.) .
W sourceUrl strona internetowa zazwyczaj ma " OPeNDAP Indeks serwera \\[ DirectoryName \\] "na szczycie.
* Ponieważ ta klasa zawsze pobiera i robi lokalną kopię każdego zdalnego pliku danych, nigdy nie należy zawijać tego zbioru danych w [EDDTableCopy](#eddtablecopy) .
* Widzisz tę klasę "superklasy", [Pliki EDDTableFromFiles](#eddtablefromfiles) , dla informacji o tym, jak ta klasa działa i jak jej używać.
* Zobacz przykłady 1D, 2D, 3D i 4D [Pliki EDDTableFromNc@@](#eddtablefromncfiles) .
     
### Pliki EDDTableFromInvalidCRAFiles{#eddtablefrominvalidcrafiles} 
 [ **Pliki EDDTableFromInvalidCRAFiles** ](#eddtablefrominvalidcrafiles) dane zagregowane z NetCDF   (v3 lub v4)   .nc pliki, które korzystają z określonego, niepoprawnego wariantu karty DSG CF (CRA) pliki. Chociaż ERDDAP™ obsługuje ten typ pliku, jest to nieprawidłowy typ pliku, którego nikt nie powinien używać. Grupy, które obecnie korzystają z tego typu plików, są zdecydowanie zachęcane do korzystania z ERDDAP™ generowanie ważnych plików CF DSG CRA i zaprzestanie korzystania z tych plików.

Szczegóły: Pliki te mają wiele zmiennych wiersza\\ _ size, każdy z atrybutem próbki\\ _ size. Pliki nie są standardowymi plikami CF- ponieważ wielokrotna próbka (obs) wymiary mają być odkodowane i powiązane ze sobą z tą dodatkową zasadą i obietnicą, która nie jest częścią specyfikacji CF DSG: "można powiązać dany np., wartość temperatury (Pomiar temperatury\\ _ obs) o określonej wartości głębokości (z\\ _ obs wymiar, wymiar z większością wartości) , ponieważ: rząd temperatury\\ _ size (dla danego odlewu) będzie równe 0 lub równe odpowiedniemu wierszowi głębokości\\ _ size (dla tej obsady)   (Taka jest zasada.) . Jeśli więc wiersz temperatur\\ _ size nie jest 0, to wartości temperatury n dla tego odlewu odnoszą się bezpośrednio do wartości głębokości n dla tego odlewu (To obietnica.) ".

Kolejny problem z tymi plikami: zmienna Direct\\ _ Investigator row\\ _ size nie ma atrybutu próbki\\ _ size i nie jest zgodna z powyższą regułą.

Przykładowe pliki dla tego typu zbioru danych można znaleźć na stroniehttps://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[ 2020- 10- 21 Serwer ten nie jest już niezawodnie dostępny \\] .

Widzisz tę klasę "superklasy", [Pliki EDDTableFromFiles](#eddtablefromfiles) , dla informacji o tym, jak ta klasa działa i jak jej używać.

Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Następnie można to edytować, aby dostroić.

Pierwsza rzecz GenerateDatasets Xml robi dla tego typu zbioru danych po odpowiedzi na pytania jest wydrukować ncdump- podobną strukturę pliku próbki. Więc jeśli wprowadzisz kilka głupich odpowiedzi dla pierwszej pętli przez GenerateDatasets Xml, przynajmniej będziesz w stanie zobaczyć czy ERDDAP™ może odczytać plik i zobaczyć jakie wymiary i zmienne są w pliku. Następnie możesz dać lepsze odpowiedzi dla drugiej pętli poprzez GenerateDatasetsXml.
 
### Pliki EDDTableFromJsonlCSVFiles{#eddtablefromjsonlcsvfiles} 
 [ **Pliki EDDTableFromJsonlCSVFiles** ](#eddtablefromjsonlcsvfiles) dane zagregowane z [JSON Linie plików CSV](https://jsonlines.org/examples/) . Widzisz tę klasę "superklasy", [Pliki EDDTableFromFiles](#eddtablefromfiles) , dla informacji o tym, jak ta klasa działa i jak jej używać.

* Jak mówi jsonlines.org, ten format jest "Lepszy niż CSV" (I zgodnie z prawem, jako pracownik federalny, nie mogę się z nimi zgodzić ani się z nimi nie zgodzić -- jak szalone to jest?) . CSV nigdy nie zostało formalnie zdefiniowane i jest utrudnione przez bagaż historyczny związany z jego podłączeniem do oryginalnych programów arkusza kalkulacyjnego. JSON Lines CSV, w porównaniu, jest w pełni zdefiniowane i korzyści z jego połączenia z szeroko stosowanym standardem JSON, który z kolei korzysta z jego połączenia z Java Skrypt i Java . W szczególności istnieje pełne wsparcie dla długich liczb całkowitych i znaków Unicode w łańcuchach i jasny sposób na włączenie innych znaków specjalnych (w szczególności zakładki i nowe linie) w strunach.
    
Format ten jest szczególnie dobry dla zbiorów danych, w których należy okresowo dodawać dodatkowe wiersze do końca danego pliku danych. Z tego powodu i innych (patrz powyżej) , [EDDTableFromHttpGet](#eddtablefromhttpget) wykorzystuje pliki Json Lines CSV do przechowywania danych.
    
* Zakłada się, że pliki wejściowe są zakodowane w UTF- 8. Jednakże, biorąc pod uwagę\\ u *dddd* format kodowania znaków specjalnych (np.\\ u20ac jest kodowaniem znaku Euro) , masz możliwość zapisu plików tak, że zawierają one tylko 7- bitowe znaki ASCII za pomocą\\ u *dddd* aby zakodować wszystkie znaki powyżej # 127.
     
* Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Następnie można to edytować, aby dostroić.
    
Pierwszą rzeczą, którą GenerateDatasetsXml robi dla tego typu zbioru danych po otrzymaniu odpowiedzi na pytania jest wydrukowanie struktury typu ncdump w pliku próbkowym. Więc jeśli wprowadzisz kilka głupich odpowiedzi dla pierwszej pętli przez GenerateDatasets Xml, przynajmniej będziesz w stanie zobaczyć czy ERDDAP™ może odczytać plik i zobaczyć jakie wymiary i zmienne są w pliku. Następnie możesz dać lepsze odpowiedzi dla drugiej pętli poprzez GenerateDatasetsXml.
    
* UWAGA: Kiedy ERDDAP™ czyta JSON Linie plików danych CSV, jeśli znajdzie błąd na danej linii (np. nieprawidłowa liczba elementów) , zapisuje wiadomość ostrzegawczą ("OSTRZEŻENIE: zła linia (s) danych "... z listą złych linii na kolejnych liniach) do [plik log.txt](/docs/server-admin/additional-information#log) a następnie kontynuuje czytanie reszty pliku danych. Tak więc, Twoim obowiązkiem jest okresowo patrzeć (lub napisać skrypt, aby to zrobić) dla tej wiadomości w dzienniku. txt tak, że można naprawić problemy w plikach danych. ERDDAP™ jest skonfigurowany w ten sposób, aby użytkownicy mogli kontynuować odczytywanie wszystkich dostępnych ważnych danych, mimo że niektóre linie pliku mają wady.
     
### Pliki EDDTableFromMultidimNc@@{#eddtablefrommultidimncfiles} 
 [ **Pliki EDDTableFromMultidimNc@@** ](#eddtablefrommultidimncfiles) dane zagregowane z NetCDF   (v3 lub v4)   .nc   (lub [ .nc ml](#ncml-files) ) pliki z kilkoma zmiennymi, z których każdy ma jeden lub więcej wspólnych wymiarów. Pliki mogą mieć zmienne znaków z lub bez dodatkowego wymiaru (na przykład: STRING14) . Widzisz tę klasę "superklasy", [Pliki EDDTableFromFiles](#eddtablefromfiles) , dla informacji o tym, jak ta klasa działa i jak jej używać.

* Jeśli pliki są wielowymiarowymi wariantami DSG CF, użyj tego typu zbioru danych zamiast [Pliki EDDTableFromNcCFFiles](#eddtablefromncfiles) .
     
* Nowe zbiory danych tabelarycznych .nc pliki, użyj tej opcji przed wypróbowaniem starszych [Pliki EDDTableFromNc@@](#eddtablefromncfiles) . Niektóre zalety tej klasy to:
    * Ta klasa może odczytać więcej zmiennych z szerszej gamy struktur plików. Jeśli podasz Wymiary CSV (oddzielona comma- list nazw wymiarów) w GenerateDatasets Xml (lub&lt;dimensionsCSV &gt; w datasets.xml info dla jednego z tych zbiorów danych), następnie ERDDAP™ będzie tylko odczytywać zmienne w plikach źródłowych, które używają niektórych lub wszystkich tych wymiarów, plus wszystkie zmienne skalarne. Jeśli dany wymiar jest w grupie, należy podać jego pełną nazwę, np. ", *groupName / dimensionName* ".
    * Klasa ta może często bardzo szybko odrzucać pliki, jeśli nie odpowiadają ograniczeniom prośby. Tak więc odczyt danych z dużych kolekcji często pójdzie dużo szybciej.
    * Ta klasa obsługuje prawdziwe zmienne znaków (zmienne nie- String) prawidłowo.
    * Ta klasa może przycinać zmienne String, kiedy twórca nie używał napisów Netcdf- java (który dodaje znak # 0 do znaku końca łańcucha) .
    * Klasa ta jest lepsza w obsłudze poszczególnych plików, które nie posiadają pewnych zmiennych lub wymiarów.
    * Klasa ta może usunąć bloki wierszy z brakującymi wartościami określonymi dla [CF Geometrie do pobierania próbek dyskretnych (DSG) Niekompletne wielowymiarowe pliki tablic](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)   
         
* Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Następnie można to edytować, aby dostroić.
    
Pierwszą rzeczą, którą GenerateDatasetsXml robi dla tego typu zbioru danych po otrzymaniu odpowiedzi na pytania jest wydrukowanie struktury typu ncdump w pliku próbkowym. Więc jeśli wprowadzisz kilka głupich odpowiedzi dla pierwszej pętli przez GenerateDatasets Xml, przynajmniej będziesz w stanie zobaczyć czy ERDDAP™ może odczytać plik i zobaczyć jakie wymiary i zmienne są w pliku. Następnie możesz dać lepsze odpowiedzi dla drugiej pętli poprzez GenerateDatasetsXml.
    
Grupa... GenerateDatasets Xml poprosi o "Grupę". Możesz wpisać "" aby przeszukać wszystkie grupy ", *niektóre Grupa* "lub" *someGroup / someSubGroup* "aby przeszukać konkretną grupę, lub" \\[ korzeń \\] "by przeszukać tylko grupę korzeniową. Łańcuch" Grupa "staje się&lt;Grupa &gt; datasets.xml info dla zbioru danych (Chociaż " \\[ korzeń \\] "staje się" ") .
    
Wymiary CSV -- GenerateDatasets Xml poprosi o łańcuch "DimensionsCSV". Jest to oddzielona od siebie lista nazw źródłowych zestawu wymiarów. GenerateDatasets Xml odczytuje tylko zmienne danych w próbce .nc pliki, które używają niektórych lub wszystkich tych wymiarów (i żadnych innych wymiarów) , plus wszystkie zmienne skalarne w pliku, i zrobić zbiór danych z tych zmiennych danych. Jeśli dany wymiar jest w grupie, należy podać jego pełną nazwę, np. ", *groupName / dimensionName* ".
Jeśli nic nie podasz (pusty ciąg) , GenerateDatasets Xml będzie szukać zmiennych o większości wymiarów, na teorii, że będą one najbardziej interesujące, ale może być czas, kiedy będziesz chciał zrobić zestaw danych z innej grupy zmiennych danych, które korzystają z innej grupy wymiarów.
Jeśli po prostu podać nazwę wymiaru, który nie istnieje (np. NO\\ _ MATCH) , ERDDAP™ znajdzie wszystkie zmienne skalarne.
Łańcuch "DimensionsCSV" staje się&lt;dimensionsCSV &gt; w datasets.xml info dla zbioru danych.
    
#### leczenie Wymiary A{#treatdimensionsas} 
Istnieje kategoria niepoprawnych .nc pliki (ponieważ nie przestrzegają zasad CF) które mają wiele wymiarów (na przykład:) kiedy powinni byli użyć tylko jednego wymiaru (np. czas) , na przykład:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
        lat = 1437 ;
        lon = 1437 ;
    variables:
        double time(time) ;
        double lat(lat) ;
        double lon(lon) ;
        float temperature(time, depth) ;
```
EDDTableFromMultidimNcFiles ma specjalną funkcję do czynienia z tymi plikami: jeśli dodasz globalny atrybut "treatDimensionsAs" do zbiorów danych globalnych addAttributes Możesz powiedzieć ERDDAP™ traktowanie niektórych wymiarów (na przykład:) Jakby były innym wymiarem. (np. czas) . Wartość atrybutu musi być oddzieloną przecinkami listą określającą wymiary "od", a następnie wymiar "do", np.,
 <att name="treatDimensionsAs"> Lat, lon, time </att>   
Wtedy ERDDAP™ odczyta plik tak, jakby był:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
    variables:
        double time(time) ;
        double lat(time) ;
        double lon(time) ;
        float temperature(time, depth) ;
```
Oczywiście aktualny rozmiar każdego z wymiarów listy musi być taki sam; w przeciwnym razie, ERDDAP™ będzie traktować plik jako "zły plik".

Zauważ, że te pliki są nieprawidłowe, ponieważ nie są zgodne z zasadami CF. Więc nawet jeśli ERDDAP™ może je odczytać, zalecamy, aby nie tworzyć plików takich jak ten, ponieważ inne narzędzia oparte na CF- oprogramowania nie będą w stanie je poprawnie odczytać. Jeśli posiadasz już takie pliki, stanowczo zalecamy jak najszybsze zastąpienie ich odpowiednimi plikami.
    
### Pliki EDDTableFromNc@@{#eddtablefromncfiles} 
 [ **Pliki EDDTableFromNc@@** ](#eddtablefromncfiles) dane zagregowane z NetCDF   (v3 lub v4)   .nc   (lub [ .nc ml](#ncml-files) ) pliki i [Zarr Przewodniczący](https://github.com/zarr-developers/zarr-python) pliki (od wersji 2.25) z kilkoma zmiennymi, każdy z jednym wspólnym wymiarem (na przykład czas) lub więcej niż jeden wspólny wymiar (na przykład, czas, wysokość (lub głębokość) , szerokość i długość geograficzna) . Pliki muszą mieć te same nazwy wymiarów. Podany plik może mieć wiele wartości dla każdego z wymiarów i wartości mogą być różne w różnych plikach źródłowych. Pliki mogą mieć zmienne znaków o dodatkowym wymiarze (na przykład: STRING14) . Widzisz tę klasę "superklasy", [Pliki EDDTableFromFiles](#eddtablefromfiles) , dla informacji o tym, jak ta klasa działa i jak jej używać.

Pliki Zarr mają nieco inne zachowanie i wymagają albo fileNameRegex lub pathRegex zawierać "zarr".

* Jeśli .nc pliki używają jednego z [CF Geometrie do pobierania próbek dyskretnych (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) formaty plików, spróbuj użyć [Pliki EDDTableFromNcCFFiles](#eddtablefromncfiles) zanim spróbujesz tego.
     
* Nowe zbiory danych tabelarycznych .nc pliki, spróbuj nowsze [Pliki EDDTableFromMultidimNc@@](#eddtablefrommultidimncfiles) Najpierw.
     
* Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Następnie można to edytować, aby dostroić.
    
Pierwszą rzeczą, którą GenerateDatasetsXml robi dla tego typu zbioru danych po otrzymaniu odpowiedzi na pytania jest wydrukowanie struktury typu ncdump w pliku próbkowym. Więc jeśli wprowadzisz kilka głupich odpowiedzi dla pierwszej pętli przez GenerateDatasets Xml, przynajmniej będziesz w stanie zobaczyć czy ERDDAP™ może odczytać plik i zobaczyć jakie wymiary i zmienne są w pliku. Następnie możesz dać lepsze odpowiedzi dla drugiej pętli poprzez GenerateDatasetsXml.
    
Wymiary CSV -- GenerateDatasets Xml poprosi o łańcuch "DimensionsCSV". Jest to oddzielona od siebie lista nazw źródłowych zestawu wymiarów. GenerateDatasets Xml znajdzie zmienne danych w .nc pliki, które używają niektórych lub wszystkich tych wymiarów, plus wszystkie zmienne skalarne i tworzą zbiór danych z tych zmiennych. Jeśli nic nie podasz (pusty ciąg) , GenerateDatasets Xml będzie szukać zmiennych o większości wymiarów, na teorii, że będą one najbardziej interesujące, ale może być czas, kiedy będziesz chciał zrobić zestaw danych z innej grupy zmiennych danych, które korzystają z innej grupy wymiarów.
    
* Przykład 1D: Pliki 1D różnią się nieco od plików 2D, 3D, 4D,....
    * Możesz mieć zestaw .nc pliki danych, w których każdy plik posiada dane warte jednego miesiąca z jednej boi dryfującej.
    * Każdy plik będzie miał 1 wymiar, na przykład, czas (rozmiar = \\[ wiele \\] ) .
    * Każdy plik będzie miał jedną lub więcej zmiennych 1D, które używają tego wymiaru, na przykład czasu, długości, szerokości geograficznej, temperatury powietrza,....
    * Każdy plik może mieć zmienne znaków 2D, na przykład z wymiarami (czas, nZnaki) .
         
* Przykład 2D:
    * Możesz mieć zestaw .nc pliki danych, w których każdy plik posiada dane warte jednego miesiąca z jednej boi dryfującej.
    * Każdy plik będzie miał 2 wymiary, na przykład czas (rozmiar = \\[ wiele \\] ) oraz id (wielkość = 1) .
    * Każdy plik będzie miał zmienne 2 1D o tych samych nazwach co wymiary i przy użyciu wymiaru nazwy, na przykład czasu (czas) , id (id) . Te zmienne 1D powinny być włączone do listy&lt; dataVariable &gt; 's in the dataset' s XML.
    * Każdy plik będzie miał jedną lub więcej zmiennych 2D, na przykład długość, szerokość geograficzna, temperatura powietrza, temperatura wody,...
    * Każdy plik może mieć zmienne znaków 3D, na przykład z wymiarami (czas, id, nZnaki) .
         
* Przykład 3D:
    * Możesz mieć zestaw .nc pliki danych, w których każdy plik posiada dane o wartości jednego miesiąca z jednej stacjonarnej boi.
    * Każdy plik będzie miał 3 wymiary, na przykład czas (rozmiar = \\[ wiele \\] ) , lat (wielkość = 1) oraz (wielkość = 1) .
    * Każdy plik będzie miał 3 1D zmiennych o tych samych nazwach co wymiary i przy użyciu wymiaru nazwy, na przykład czasu (czas) , lat (nit) na (na) . Te zmienne 1D powinny być włączone do listy&lt; dataVariable &gt; 's in the dataset' s XML.
    * Każdy plik będzie miał jedną lub więcej zmiennych 3D, na przykład temperaturę powietrza, temperaturę wody,...
    * Każdy plik może mieć zmienne znaków 4D, na przykład z wymiarami (time, lat, lon, nCharacters) .
    * Nazwa pliku może mieć nazwę boi w nazwie pliku.
         
* Przykład 4D:
    * Możesz mieć zestaw .nc pliki danych, w których każdy plik posiada dane o wartości jednego miesiąca z jednej stacji. W każdym punkcie czasowym stacja pobiera odczyty na kilku głębokościach.
    * Każdy plik będzie miał 4 wymiary, na przykład czas (rozmiar = \\[ wiele \\] ) , głębokość (rozmiar = \\[ wiele \\] ) , lat (wielkość = 1) oraz (wielkość = 1) .
    * Każdy plik będzie miał 4 1D zmiennych o tych samych nazwach co wymiary i przy użyciu tego samego rozmiaru nazwy, na przykład czasu (czas) , głębokość (głębokość) , lat (nit) na (na) . Te zmienne 1D powinny być włączone do listy&lt; dataVariable &gt; 's in the dataset' s XML.
    * Każdy plik będzie miał jedną lub więcej zmiennych 4D, na przykład temperaturę powietrza, temperaturę wody...
    * Każdy plik może mieć zmienne znaków 5D, na przykład z wymiarami (czas, głębokość, lat, lon, nCharacters) .
    * Nazwa pliku może mieć nazwę boi w nazwie pliku.
         
### Pliki EDDTableFromNcCFFiles{#eddtablefromnccffiles} 
 [ **Pliki EDDTableFromNcCFFiles** ](#eddtablefromnccffiles) dane zagregowane dane zagregowane z NetCDF   (v3 lub v4)   .nc   (lub [ .nc ml](#ncml-files) ) plików, które używają jednego z formatów plików określonych przez [CF Geometrie do pobierania próbek dyskretnych (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) konwencje. Widzisz tę klasę "superklasy", [Pliki EDDTableFromFiles](#eddtablefromfiles) , dla informacji o tym, jak ta klasa działa i jak jej używać.

W przypadku plików wykorzystujących jeden z wielowymiarowych wariantów CF DSG należy użyć [Pliki EDDTableFromMultidimNc@@](#eddtablefrommultidimncfiles) Zamiast tego.

Konwencje DSG CF definiują dziesiątki formatów plików i zawierają liczne drobne warianty. Ta klasa zajmuje się wszystkimi wariantami, o których wiemy, ale mogliśmy przeoczyć jedną z nich. (lub więcej) . Więc jeśli ta klasa nie może odczytać danych z plików CF DSG, proszę. [zwrócenie się o dodatkowe wsparcie](/docs/intro#support) .

Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Następnie można to edytować, aby dostroić.
 
### Pliki EDDTableFromNccsvName{#eddtablefromnccsvfiles} 
 [ **Pliki EDDTableFromNccsvName** ](#eddtablefromnccsvfiles) dane zagregowane z [NCSSV](/docs/user/nccsv-1.00) Pliki ASCII .csv. Widzisz tę klasę "superklasy", [Pliki EDDTableFromFiles](#eddtablefromfiles) , dla informacji o tym, jak ta klasa działa i jak jej używać.

* Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Następnie można to edytować, aby dostroić.
    
Pierwszą rzeczą, którą GenerateDatasetsXml robi dla tego typu zbioru danych po otrzymaniu odpowiedzi na pytania jest wydrukowanie struktury typu ncdump w pliku próbkowym. Więc jeśli wprowadzisz kilka głupich odpowiedzi dla pierwszej pętli przez GenerateDatasets Xml, przynajmniej będziesz w stanie zobaczyć czy ERDDAP™ może odczytać plik i zobaczyć jakie wymiary i zmienne są w pliku. Następnie możesz dać lepsze odpowiedzi dla drugiej pętli poprzez GenerateDatasetsXml.
    
* UWAGA: Kiedy ERDDAP™ odczytuje pliki danych NCSV, jeśli znajdzie błąd na danej linii (np. nieprawidłowa liczba elementów) , zapisuje wiadomość ostrzegawczą ("OSTRZEŻENIE: zła linia (s) danych "... z listą złych linii na kolejnych liniach) do [plik log.txt](/docs/server-admin/additional-information#log) a następnie kontynuuje czytanie reszty pliku danych. Tak więc, Twoim obowiązkiem jest okresowo patrzeć (lub napisać skrypt, aby to zrobić) dla tej wiadomości w dzienniku. txt tak, że można naprawić problemy w plikach danych. ERDDAP™ jest skonfigurowany w ten sposób, aby użytkownicy mogli kontynuować odczytywanie wszystkich dostępnych ważnych danych, mimo że niektóre linie pliku mają wady.
     
### EDDTableFromNOS{#eddtablefromnos} 
 [ **EDDTableFromNOS** ](#eddtablefromnos)   (ZANIECHANE) obsługuje dane z NOAA   [NOS](https://opendap.co-ops.nos.noaa.gov/axis/) źródło, które wykorzystuje [ SOAP+XML ](https://www.w3schools.com/xml/xml_soap.asp) w przypadku wniosków i odpowiedzi. Jest to bardzo specyficzne dla NOAA XML NOS. Patrz: zestaw danych EDDTableFromNOS w datasets2.xml.
 
### EDDTableFromOBIS{#eddtablefromobis} 
 [ **EDDTableFromOBIS** ](#eddtablefromobis) obsługuje dane z Oceanicznego Systemu Informacji Biogeograficznej (OBIS) serwer (behttp://www.iobis.org ) . Możliwe, że nie ma już aktywnych serwerów, które używają tego typu serwera OBIS.

* Serwery OBIS oczekują żądania XML i zwracają odpowiedź XML.
* Ponieważ wszystkie serwery OBIS służą tym samym zmiennym w ten sam sposób (behttp://iobis.org/tech/provider/questions) , nie trzeba określić wiele, aby skonfigurować zestaw danych OBIS w ERDDAP .
* MUSI zawierać " creator\\_email "atrybut w świecie addAttributes , ponieważ informacje te są wykorzystywane w ramach licencji. Odpowiedni adres e-mail można znaleźć czytając odpowiedź XML z sourceURL.
* Możesz lub nie być w stanie uzyskać atrybut globalny [&lt; subsetVariables &gt;] (# subsetvarels) do pracy z danym serwerem OBIS. Jeśli spróbujesz, spróbuj jednej zmiennej (na przykład, Nazwa naukowa lub genus) .
#### EDDTableFromOBIS szkielet XML{#eddtablefromobis-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromOBIS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceCode>...&lt;/sourceCode>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- If you read the XML response from the sourceUrl, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source code (for example, GHMP) is the value from one of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resource>&lt;code> tags. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- All ...SourceMinimum and Maximum tags are OPTIONAL -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMinimum>...&lt;/longitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMaximum>...&lt;/longitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMinimum>...&lt;/latitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMaximum>...&lt;/latitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For timeSource... tags, use yyyy-MM-dd'T'HH:mm:ssZ format. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMinimum>...&lt;/timeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMaximum>...&lt;/timeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1.  This MUST include  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator\\_email" -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Pliki EDDTableFromParquetFiles{#eddtablefromparquetfiles} 
 [ **Pliki EDDTableFromParquetFiles** ](#eddtablefromparquetfiles) obsługuje dane z [Parkiet](https://parquet.apache.org/) . Widzisz tę klasę "superklasy", [Pliki EDDTableFromFiles](#eddtablefromfiles) , dla informacji o tym, jak ta klasa działa i jak jej używać.

* Parkiet jest przeznaczony do kompresji bardzo efektywnie, więc może to dać Ci mniejsze rozmiary plików niż inne formaty.
* Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Następnie można to edytować, aby dostroić.
* UWAGA: Kiedy ERDDAP™ odczytuje pliki danych Parquet, jeśli znajdzie błąd w danej linii (np. nieprawidłowa liczba elementów) , zapisuje wiadomość ostrzegawczą ("OSTRZEŻENIE: zła linia (s) danych "... z listą złych linii na kolejnych liniach) do [plik log.txt](/docs/server-admin/additional-information#log) a następnie kontynuuje czytanie reszty pliku danych. Tak więc, Twoim obowiązkiem jest okresowo patrzeć (lub napisać skrypt, aby to zrobić) dla tej wiadomości w dzienniku. txt tak, że można naprawić problemy w plikach danych. ERDDAP™ jest skonfigurowany w ten sposób, aby użytkownicy mogli kontynuować odczytywanie wszystkich dostępnych ważnych danych, mimo że niektóre linie pliku mają wady.
     
### Tabela EDDFrom SOS  {#eddtablefromsos} 
 [ **Tabela EDDFrom SOS ** ](#eddtablefromsos) obsługuje dane z usługi obserwacji czujników (SWE / [ SOS ](https://www.ogc.org/standards/sos) ) serwer.

* Ten zbiór danych typu agregatów danych z grupy stacji, które są obsługiwane przez jedną SOS serwer.
* Wszystkie stacje obsługują ten sam zestaw zmiennych (chociaż źródło dla każdej stacji nie musi obsługiwać wszystkich zmiennych) .
*    SOS serwery oczekują żądania XML i zwracają odpowiedź XML.
* Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Następnie można to edytować, aby dostroić. Nie jest łatwo wygenerować zestaw danych XML dla SOS zbiory danych ręcznie. Aby znaleźć potrzebne informacje, musisz odwiedzić sourceUrl + "? usługa = SOS & żądanie = GetCapabilities "w przeglądarce; spójrz na XML; zrób żądanie GetObservation ręcznie; i spójrz na odpowiedź XML na żądanie.
* Z okazjonalnego dodawania nowych rodzajów SOS serwery i zmiany w starych serwerach, staje się coraz trudniejsze dla ERDDAP™ automatyczne wykrywanie typu serwera z odpowiedzi serwera. Stosowanie&lt;SosServerType &gt; (o wartości IOOS\\ _ NDBC, IOOS\\ _ NOS, OOSTethys lub WHOI) jest teraz bardzo zalecane. Jeśli masz problemy z dowolnego zbioru danych tego typu, spróbuj ponownie uruchomić GenerateDatasets Xml SOS serwer. Generuj Zestawy danych Xml pozwoli wypróbować różne&lt;sosServerType &gt; opcje dopóki nie znajdziesz odpowiedniego dla danego serwera.
*    SOS przegląd:
    * SWE (Enablement strony czujnika) oraz SOS   (Usługi obserwacji czujników) są [Standardy OpenGIS ®](https://www.ogc.org/standards) . Ta strona ma dokumenty standardów.
    * W OGC Web Services Common Specification ver 1.1.0 ( OGC 06- 121r3) obejmuje budowę zapytań GET i POST (Patrz punkt 7.2.3 i 9.) .
    * Jeśli wysłać getCapability xml żądanie do SOS serwer ( sourceUrl + "? service = SOS & żądanie = GetCapabilities ") , otrzymasz wynik xml z listą stacji i obserwowanych Właściwości, do których mają dane.
    * ObservedProperty jest formalnym odniesieniem URI do nieruchomości. Na przykład, urn: ogc: fenomen: długość geograficzna: wgs84 lubhttps://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
    * ObservedProperty nie jest zmienną.
    * Więcej niż jedna zmienna może mieć ten sam obserwowany Własność (na przykład, insideTemp i na zewnątrz Temp mógł być obserwowany Własnośćhttps://mmisw.org/ont/cf/parameter/air\\_temperature) .
    * Jeśli wysyłasz żądanie getObservation xml do SOS serwer, otrzymasz wynik xml z opisami nazw pól w odpowiedzi, jednostek pola i danych. Nazwy pól obejmują długość, szerokość geograficzną, głębokość (być może) i czas.
    * Każdy dataVariable dla tabeli EDDFrom SOS musi zawierać atrybut "observedProperty", który identyfikuje zaobserwowaną Property, która musi być wymagana od serwera w celu uzyskania tej zmiennej. Często, kilka dataVariable s będzie wymieniał te same złożone obserwacje Property.
    * Data Typ dla każdego dataVariable nie może być określony przez serwer. Jeśli tak, należy spojrzeć na odpowiedzi danych XML z serwera i przypisać odpowiednie [&lt;dataType &gt; s] (# datatype) w ERDDAP™ zbiór danych dataVariable definicje.
    *    (W czasie pisania tego) niektóre SOS serwery odpowiadają na żądania getObservation dla więcej niż jednego obserwowanego Nieruchomość przez zwracanie wyników dla pierwszego z obserwowanych Właściwości. (Żadnych błędów&#33;) Patrz żądanie parametrów konstruktora ObservedPropertiesSeparately.
* Tabela EDDFrom SOS automatycznie dodaje
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
do globalnych atrybutów zbioru danych przy tworzeniu zbioru danych.
*    SOS serwery zwykle wyrażają [jednostki](#units) z [UCUM](https://unitsofmeasure.org/ucum.html) system. Większość ERDDAP™ serwerów jednostek ekspresowych z [ UDUNITS ](https://www.unidata.ucar.edu/software/udunits/) system. Jeśli potrzebujesz przekonwertować między dwoma systemami, możesz użyć [ ERDDAP Serwis internetowy do konwersji jednostek UCUM na / z UDUNITS ](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) .
#### Tabela EDDFrom SOS szkielet XML{#eddtablefromsos-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromSOS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sosServerType>...&lt;/sosServerType> &lt;!-- 0 or 1, but STRONGLY  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RECOMMENDED. This lets you specify the type of SOS server  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(so ERDDAP™ doesn't have to figure it out).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valid values are: IOOS\\_NDBC, IOOS\\_NOS, OOSTethys, and WHOI. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;responseFormat>...&lt;/responseFormat> &lt;!-- 0 or 1. Use this only if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you need to override the default responseFormat for the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;specified sosServerType.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;stationIdSourceName>...&lt;/stationIdSourceName> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default="station\\_id". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceName>...&lt;/longitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceName>...&lt;/latitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceName>...&lt;/altitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;altitudeMetersPerSourceUnit>](#altitudemeterspersourceunit)...&lt;/altitudeMetersPerSourceUnit>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceName>...&lt;/timeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceFormat>...&lt;/timeSourceFormat>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- timeSourceFormat MUST be either  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For numeric data: a [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\-compatible string (with the format  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"*units* since *baseTime*") describing how to interpret  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source time values (for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"seconds since 1970-01-01T00:00:00Z"), where the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;base time is an ISO 8601:2004(E) formatted date time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string (yyyy-MM-dd'T'HH:mm:ssZ).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For String date time data: specify  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[units suitable for string times](#string-time-units)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;describing how to interpret string times  (for example, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ISO8601TZ\\_FORMAT "yyyy-MM-dd'T'HH:mm:ssZ"). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;observationOfferingIdRegex>...&lt;/observationOfferingIdRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Only observationOfferings with IDs (usually the station names)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which match this [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) will be included  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the dataset (".+" will catch all station names). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;requestObservedPropertiesSeparately>true|false(default)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/requestObservedPropertiesSeparately>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the [dataType](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the observedProperty attribute.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For IOOS SOS servers, \\*every\\* variable returned in the text/csv  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response MUST be included in this ERDDAP™ dataset definition. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Pliki EDDTableFromThreddsFiles{#eddtablefromthreddsfiles} 
 [ **Pliki EDDTableFromThreddsFiles** ](#eddtablefromthreddsfiles)   (depregated) pliki danych agregatów z kilkoma zmiennymi, z których każdy ma jeden lub więcej wspólnych wymiarów (na przykład, czas, wysokość (lub głębokość) , szerokość i długość geograficzna) , i służył przez [TRZECIA OPeNDAP serwer](https://www.unidata.ucar.edu/software/tds/) .

* Ten typ zbioru danych jest **ZANIECHANE** . Nowszym i bardziej ogólnym rozwiązaniem jest użycie [cache Opcja FromUrl dla EDDTable Pliki FromFiles](#cachefromurl)   (lub wariant) , który tworzy lokalną kopię zdalnych plików i obsługuje dane z lokalnych plików. W&lt;Opcja cacheFromUrl &gt; może być używana z dowolnym typem pliku tabelarycznego z dowolnego źródła internetowego, które publikuje listę plików typu directory-. **   
Jeśli z jakiegoś powodu ci się nie uda, napisz do Chrisa. John w Noa.gov.
W przypadku braku skarg przed 2020 r., ten typ zbioru danych może zostać usunięty. ** 
* Zdecydowanie zalecamy użycie [GenerateDatasets Program Xml](#generatedatasetsxml) zrobić szorstki szkic datasets.xml Chunk za ten zestaw danych. Następnie można to edytować, aby dostroić.
* W większości przypadków, każdy plik ma wiele wartości dla najbardziej lewego (pierwszy) wymiar, na przykład, czas.
* Pliki często (ale nie muszę) mają jedną wartość dla innych wymiarów (na przykład wysokość (lub głębokość) , szerokość i długość geograficzna) .
* Pliki mogą mieć zmienne znaków o dodatkowym wymiarze (nZnaki) .
* Serwery THREDDS mogą być identyfikowane przez "/ thredds /" w URL. Na przykład:
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* Serwery THREDDS posiadają katalogi w różnych miejscach. Ta klasa wymaga, aby adres URL zawierał "/ tróje / katalog /". Zazwyczaj można znaleźć tę zmienną zaczynając w przeglądarce w katalogu root, a następnie klikając do pożądanego podkatalogu.
* Ta klasa czyta pliki katalog.xml obsługiwane przez THREDDS z listami&lt;KatalogRefs &gt; (odniesienia do dodatkowych podplików katalog.xml) oraz&lt;zbiór danych &gt; s (pliki danych) .
* W&lt;ustawienie fileDir &gt; jest ignorowane. Ponieważ ta klasa pobiera i robi lokalną kopię każdego pliku danych zdalnych, ERDDAP™ zmusza plik Reżyseria *bigParentDirectory* / kopiuj / * datasetID * /.
* Dla&lt; sourceUrl &gt;, użyj URL pliku katalog.xml dla zbioru danych na serwerze THREDDS, na przykład: dla tego URL, który może być używany w przeglądarce internetowej,
    https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[ 2020- 10- 21 Serwer ten nie jest już dostępny. \\] ,
podanie&lt; sourceUrl &gt;https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml&lt;/ sourceUrl &gt;
     (ale umieścić go na jednej linii) .
* Ponieważ ta klasa zawsze pobiera i robi lokalną kopię każdego zdalnego pliku danych, nigdy nie należy zawijać tego zbioru danych w [EDDTableCopy](#eddtablecopy) .
* Ten typ zbioru danych obsługuje optyczny, rareli- używany, specjalny znacznik,&lt;SpecialMode &gt; *tryb* &lt;/ specialMode &gt;, który może być użyty do określenia, że do określenia, które pliki powinny być pobierane z serwera, powinny być używane specjalne, zaszyfrowane zasady. Obecnie tylko ważne *tryb* jest SAMOS, który jest stosowany z zestawami danych zhttps://tds.coaps.fsu.edu/thredds/catalog/samosaby pobrać tylko pliki z ostatnim numerem wersji.
* Widzisz tę klasę "superklasy", [Pliki EDDTableFromFiles](#eddtablefromfiles) , dla informacji o tym, jak ta klasa działa i jak jej używać.
* Zobacz przykłady 1D, 2D, 3D i 4D [Pliki EDDTableFromNc@@](#eddtablefromncfiles) .
     
### Tabela EDDFrom WFS Pliki{#eddtablefromwfsfiles} 
 [ **Tabela EDDFrom WFS Pliki** ](#eddtablefromwfsfiles)   (ZANIECHANE) tworzy lokalną kopię wszystkich danych z ArcGIS MapServer WFS serwer więc dane mogą być szybko ponownie podawane do ERDDAP™ użytkowników.

* Musisz określić specjalnie sformatowane sourceUrl atrybut globalny do określenia ERDDAP™ jak zażądać informacji o funkcji z serwera. Proszę użyć tego przykładu jako szablonu:
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (ale postaw wszystko na jednej linii) 
* Musisz dodać specjalny atrybut globalny, aby powiedzieć ERDDAP™ sposób identyfikacji nazw fragmentów danych, które należy pobrać. To prawdopodobnie zadziała dla wszystkich EDDTableFrom WFS Zestawy danych plików:
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* Ponieważ ta klasa zawsze pobiera i robi lokalną kopię każdego zdalnego pliku danych, nigdy nie należy zawijać tego zbioru danych w [EDDTableCopy](#eddtablecopy) .
* Widzisz tę klasę "superklasy", [Pliki EDDTableFromFiles](#eddtablefromfiles) , w celu uzyskania dodatkowych informacji na temat działania tej klasy i jej wykorzystania.
     
### EDDTableAggregateRows{#eddtableaggregaterows} 
 [ **EDDTableAggregateRows** ](#eddtableaggregaterows) może sporządzić zbiór danych EDDTable z grupy zbiorów danych EDDTable "dziecko".

* Oto niektóre zastosowania dla EDDTableAggregateRows:
    * Możesz zrobić zestaw danych EDDTableAggregateRows z dwóch różnych rodzajów plików lub źródeł danych, na przykład zestaw danych z danymi do końca ostatniego miesiąca zapisanych w .nc Pliki CF i zbiór danych z danymi za bieżący miesiąc przechowywane w bazie relacyjnej.
    * Możesz zrobić zestaw danych EDDTableAggregateRoves, aby uporać się ze zmianą plików źródłowych (na przykład zmieniono format czasu lub zmieniono nazwę zmiennej lub dane Typ / scale\\_factor / add\\_offset zmienione) . W tym przypadku jedno dziecko otrzymywało dane z plików wykonanych przed zmianą, a drugie otrzymywało dane z plików wykonanych po zmianie. To zastosowanie EDDTableAggregateRows jest alternatywą dla stosowania [NcML](#ncml-files) lub [ NCO ](#netcdf-operators-nco) . O ile w nazwach plików nie ma funkcji wyróżniającej (więc możesz użyć&lt;fileNameRegex &gt; w celu określenia, do którego pliku należy zestaw danych dla dzieci), należy prawdopodobnie przechowywać pliki dla dwóch zbiorów danych dla dzieci w różnych katalogach.
    * Możesz zrobić zestaw danych EDDTableAggregateRows, który posiada wspólny zestaw zmiennych jednego lub więcej podobnych, ale różnych zbiorów danych, na przykład zbiór danych, który tworzy zbiór danych Profile z kombinacji zbioru danych Profile, zbioru danych TimeSeriesProfile oraz zbioru danych TrajectoryProfile (które mają kilka różnych zmiennych i kilka zmiennych wspólnych - w takim przypadku będziesz musiał zrobić specjalne warianty dla zbiorów danych dla dzieci, tylko ze zmiennymi niewspólnymi) .
    * Można mieć kilka samodzielnych zbiorów danych, każdy z tego samego rodzaju danych, ale z innej stacji. Możesz zostawić te dane nienaruszone, ale także stworzyć zbiór danych EDDTableAggregateRows, który zawiera dane ze wszystkich stacji -- każdy zestaw danych dla dzieci może być prosty [EDDTableFromErddap](#eddfromerddap) , co wskazuje na jeden z istniejących zbiorów danych stacji. Jeśli to zrobisz, daj każdemu z zbiorów danych EDDTableFromErddap inny datasetID niż oryginalne zbiory danych samodzielnych, np. poprzez dodanie "Child" do oryginału datasetID .
* Każde dziecko&lt;zestaw danych &gt; 's określony musi być kompletnym zbiorem danych, tak jakby był zbiorem danych samodzielnych. Każdy musi mieć to samo. [ dataVariable s](#datavariable) , w tej samej kolejności, w tej samej [ destinationName s](#destinationname) , [dane Rodzaje](#datatype) , [ missing\\_value s](#missing_value) , [\\ _ FillValues](#missing_value) oraz [jednostki](#units) . Metadane dla każdej zmiennej dla zbioru danych EDDTableAggregateRows pochodzą ze zmiennych w pierwszym zbiorze danych dla dzieci, ale EDDTableAggregateRows zaktualizuje [ actual\\_range ](#actual_range) metadane, które mają być rzeczywistym zakresem dla wszystkich dzieci.
* Zalecenie: Uzyskaj każdy zestaw danych dziecka pracujący jako zestaw danych samodzielny. Następnie spróbuj zrobić zestaw danych EDDTableAggregateRows poprzez cięcie i wklejanie datasets.xml cząstka dla każdego do nowego EDDTableAggregate Zbiór danych wierszy.
* Domyślna kolejność sortowania: Kolejność zbiorów danych dla dzieci określa ogólną domyślną kolejność sortowania wyników. Oczywiście użytkownicy mogą poprosić o inny sortowanie dla danego zestawu wyników poprzez przypisanie & orderBy  (" *Lista zmiennych oddzielona od comma-* ") do końca ich zapytania.
* "Źródło" [globalny Atrybuty](#global-attributes) dla EDDTableAggregateRows jest łączony globalAtrybuty z pierwszego zbioru danych dzieci. The EDDTableAggregate Wiersze mogą mieć globalny&lt; addAttributes &gt; aby zapewnić dodatkowe atrybuty globalne lub nadpisać atrybuty globalne źródła.
#### EDDTableAggregate Wiersze szkielet XML{#eddtableaggregaterows-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableAggregateRows" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableCopy{#eddtablecopy} 
 [ **EDDTableCopy** ](#eddtablecopy) może zrobić lokalną kopię wielu typów zbiorów danych EDDTable, a następnie szybko ponownie podawać dane z lokalnej kopii.

* EDDTableCopy (oraz dane dotyczące sieci, [ EDDGrid Kopiuj](#eddgridcopy) ) jest bardzo łatwy w użyciu i bardzo skuteczny **rozwiązanie niektórych z największych problemów z obsługą danych z zdalnych źródeł danych:** 
    * Dostęp do danych ze zdalnego źródła danych może być powolny.
        * Mogą być powolne, ponieważ są z natury powolne (na przykład nieefektywny typ serwera) ,
        * ponieważ są przytłoczeni zbyt wieloma prośbami,
        * lub ponieważ serwer lub zdalny serwer jest ograniczony przepustowość.
    * Zdalny zestaw danych jest czasami niedostępny (ponownie, z różnych powodów) .
    * Poleganie na jednym źródle danych nie jest dobre (na przykład, gdy wielu użytkowników i wielu ERDDAP s wykorzystanie) .
         
* Jak to działa -- EDDTableCopy rozwiązuje te problemy poprzez automatyczne tworzenie i utrzymywanie lokalnej kopii danych oraz obsługę danych z lokalnej kopii. ERDDAP™ może obsługiwać dane z lokalnej kopii bardzo, bardzo szybko. Tworzenie i używanie lokalnej kopii zmniejsza obciążenie zdalnego serwera. Lokalna kopia to kopia zapasowa oryginału, która jest przydatna na wypadek, gdyby coś stało się oryginałowi.
    
Nie ma nic nowego w tworzeniu lokalnej kopii zbioru danych. To co tu nowego, to to, że ta klasa robi to\\*łatwo\\*do tworzenia i\\*utrzymanie\\*miejscowa kopia danych z\\*odmiana\\*rodzajów zdalnych źródeł danych oraz\\*dodaj metadane\\*podczas kopiowania danych.
    
#### EDDTableCopy vs.&lt;cacheFromUrl & gt;{#eddtablecopy-vs-cachefromurl} 
&lt;cacheFromUrl &gt; jest alternatywą dla EDDTableCopy. Działają inaczej.

* Tabela EDD Kopiowanie działa poprzez żądanie fragmentów danych z usługi zdalnej i przechowywanie tych fragmentów w lokalnych plikach. Tak więc EDDTableCopy jest przydatna w niektórych przypadkach, gdy dane są dostępne za pośrednictwem usługi zdalnej.
* [&lt;cacheFromUrl &gt;] (# cachefromurl) pobiera istniejące pliki wymienione na zdalnej stronie internetowej.&lt;cacheFromUrl &gt; jest łatwiejszy w użyciu i bardziej niezawodny, ponieważ może łatwo stwierdzić, kiedy jest nowy plik danych zdalnych lub kiedy plik danych zdalnych zmienił się i dlatego musi być pobrany.

Jeżeli istnieją sytuacje, w których EDDTableCopy lub&lt;cacheFromUrl &gt; można użyć, używać&lt;cacheFromUrl &gt; ponieważ jest łatwiejszy i bardziej niezawodny.
     
#### &lt;extractDestination Nazwy & gt;{#extractdestinationnames} 
Tabela EDD Kopia tworzy lokalną kopię danych poprzez żądanie fragmentów danych ze zdalnego zbioru danych. Tabela EDD Kopiuj określa, które fragmenty żądać, prosząc o & odrębne () wartości dla&lt;extractDestinationNazwy &gt; (określone w datasets.xml , patrz poniżej) , które są oddzielonymi spacjami nazwami docelowymi zmiennych w zdalnym zbiorze danych. Na przykład:
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
może dać różne wartości kombinacje włóczęgi = tig17, profil = 1017, włóczęga = tig17, profil = 1095,... włóczęga = une12, profil = 1223, włóczęga = une12, profil = 1251,....

W sytuacjach, w których jedna kolumna (na przykład profil) może być wszystkim, co jest wymagane do jednoznacznej identyfikacji grupy wierszy danych, jeśli istnieje bardzo duża liczba, na przykład, profili, może być przydatne, aby również określić dodatkowy wyciąg Miejsce przeznaczenia Nazwa (na przykład, włóczęga) która służy do podziału profili. Prowadzi to do zmniejszenia liczby plików danych w danym katalogu, co może prowadzić do szybszego dostępu.
    
#### Pliki lokalne{#local-files} 
Każdy kawałek danych jest przechowywany w osobnym NetCDF plik w podkatalogu *bigParentDirectory* / kopiuj / * datasetID * / (jak określono w [setup.xml](/docs/server-admin/deploy-install#setupxml) ) . Istnieje jeden poziom podkatalogu dla wszystkich poza ostatnim ExtractDestinationName. Na przykład dane dla tyg17 + 1017, będą przechowywane w
     *bigParentDirectory* / kopia / sampleDataset / tig17 / 1017 .nc .
Na przykład, dane dla une12 + 1251, będą przechowywane w
     *bigParentDirectory* / kopia / sampleDataset / une12 / 1251 .nc .
Katalog i nazwy plików utworzone z wartości danych są modyfikowane, aby uczynić je file- name- bezpieczne (na przykład spacje zastępuje się "x20") -- to nie wpływa na rzeczywiste dane.
     
#### Nowe dane{#new-data} 
Za każdym razem EDDTable Kopia jest przeładowana, sprawdza zdalny zbiór danych, aby zobaczyć, co różne kawałki są dostępne. Jeśli plik dla kawałka danych nie istnieje, wniosek o uzyskanie kawałka jest dodawany do kolejki. ERDDAP 's TaskThread przetwarza wszystkie kolejki żądań fragmentów danych, jeden-by-jeden. Możesz zobaczyć statystyki działalności taskThread na temat [Strona statusu](/docs/server-admin/additional-information#status-page) oraz [Sprawozdanie dzienne](/docs/server-admin/additional-information#daily-report) . (Tak. ERDDAP™ może przyporządkować do tego procesu wiele zadań, ale to zużyłoby wiele częstotliwości, pamięci i czasu CPU oraz wiele czasu lokalnego ERDDAP przepustowość, pamięć i czas procesora, żaden z nich nie jest dobrym pomysłem.) 
    
UWAGA: Po raz pierwszy EDDTableCopy jest załadowany, (Jeśli wszystko pójdzie dobrze) wiele żądań dotyczących fragmentów danych zostanie dodanych do kolejki taskThread, ale nie zostaną utworzone żadne lokalne pliki danych. Tak więc konstruktor zawiedzie, ale taskThread będzie nadal pracować i tworzyć lokalne pliki. Jeśli wszystko pójdzie dobrze, taskThread zrobi kilka lokalnych plików danych i następna próba ponownego załadowania zbioru danych (za 15 minut) odniesie sukces, ale początkowo z bardzo ograniczoną ilością danych.
    
UWAGA: Po lokalnym zbiorze danych jest kilka danych i pojawia się w Twoim ERDDAP , jeśli zdalny zestaw danych jest tymczasowo lub na stałe niedostępny, lokalny zestaw danych nadal będzie działać.
    
UWAGA: Jeśli zbiór danych jest duży i / lub serwer jest powolny (W tym problem, prawda?) , to zajmie dużo czasu, aby zrobić kompletną miejscową kopię. W niektórych przypadkach potrzebny czas będzie nie do przyjęcia. Na przykład przesyłanie 1 TB danych przez linię T1 (0,15 GB / s) trwa co najmniej 60 dni, w optymalnych warunkach. Dodatkowo, używa dużo przepustowości, pamięci i czasu procesora na komputerach zdalnych i lokalnych. Rozwiązaniem jest wysłanie dysku twardego do administratora zdalnego zbioru danych, aby s / on mógł zrobić kopię zbioru danych i wysłać dysk twardy z powrotem do Ciebie. Użyj tych danych jako punktu wyjścia, a EDDTableCopy doda do niego dane. (W ten sposób usługa chmurowa EC2 firmy Amazon zajmowała się problemem, mimo że ich system ma dużą przepustowość.) 
    
UWAGA: Jeśli dana kombinacja wartości znika z zdalnego zbioru danych, EDDTableCopy NIE usuwa lokalnego kopiowanego pliku. Jeśli chcesz, możesz go skasować.
    
#### TableCopy&lt;checkSourceData & gt;{#tablecopy-checksourcedata} 
W datasets.xml dla tego zbioru danych może mieć opcjonalny znacznik
```
    <checkSourceData>true</checkSourceData>  
```
Domyślna wartość jest prawdziwa. Jeśli / kiedy ustawisz go na false, zbiór danych nigdy nie będzie sprawdzał zbioru danych źródłowych, aby sprawdzić, czy są dostępne dodatkowe dane.
     
#### Zalecane stosowanie{#recommended-use} 
1. Utwórz&lt;zbiór danych &gt; wpis (typ rodzimy, nie EDDTableCopy) dla zdalnego źródła danych. **Uruchomić go poprawnie, w tym wszystkie wymagane metadane.** 
2. Jeśli jest zbyt wolny, dodaj kod XML, aby zawinąć go w zestaw danych EDDTableCopy.
    * Użyj innego datasetID   (Może zmieniając datasetID stare datasetID nieznacznie) .
    * Kopiuj&lt;dostępne Do &gt;,&lt;przeładowanie EveryNMinutes &gt; i&lt;onChange &gt; od zdalnego XML EDDTable do XML EDDTableCopy. (Ich wartości dla EDDTableCopy materia; ich wartości dla wewnętrznego zbioru danych stają się nieistotne.) 
    * Utwórz&lt;extractDestinationNames &gt; tag (patrz powyżej) .
    *   &lt;orderExtractBy &gt; jest optional space separated list nazw zmiennych docelowych w zdalnym zbiorze danych. Po pobraniu każdej części danych z zdalnego serwera, część zostanie posortowana przez te zmienne (przez pierwszą zmienną, następnie przez drugą, jeśli pierwsza zmienna jest związana,...) . W niektórych przypadkach, ERDDAP™ będzie w stanie szybciej pobierać dane z lokalnych plików danych, jeśli pierwsza zmienna na liście jest zmienną liczbową ( "time" liczy się jako zmienna liczbowa) . Ale wybierz te zmienne w sposób odpowiedni dla zbioru danych.
3.   ERDDAP™ będzie tworzyć i utrzymywać lokalną kopię danych.
         
* UWAGA: EDDTableCopy zakłada, że wartości danych dla każdego kawałka nigdy się nie zmieniają. Jeśli / kiedy to się stanie, należy ręcznie usunąć pliki cząstkowe w *bigParentDirectory* / kopiuj / * datasetID * / które się zmieniły i [bandera](/docs/server-admin/additional-information#flag) zbiór danych, który ma być ponownie załadowany, tak aby usunięte kawałki zostały zastąpione. Jeśli masz subskrypcję e-mail do zbioru danych, otrzymasz dwa e-maile: jeden, gdy zestaw danych po raz pierwszy przeładowuje i zaczyna kopiować dane, a drugi, gdy zestaw danych ponownie ładuje (automatycznie) i wykrywa nowe lokalne pliki danych.
     
* Zmień metadane -- W przypadku konieczności zmiany addAttributes lub zmienić kolejność zmiennych związanych z zbiorem danych źródłowych:
    1. Zmień addAttributes dla zbioru danych źródłowych w datasets.xml W razie potrzeby.
    2. Usuń jeden z skopiowanych plików.
    3. Ustaw [bandera](/docs/server-admin/additional-information#flag) aby natychmiast przeładować zestaw danych. Jeśli używasz flagi i masz e-mail subskrypcji do zbioru danych, otrzymasz dwa e-maile: jeden, gdy zestaw danych po raz pierwszy przeładowuje i zaczyna kopiować dane, a drugi, gdy zestaw danych ładuje ponownie (automatycznie) i wykrywa nowe lokalne pliki danych.
    4. Usunięty plik zostanie zregenerowany przy pomocy nowych metadanych. Jeśli zbiór danych źródłowych jest zawsze niedostępny, zbiór danych EDDTableCopy będzie otrzymywał metadane z pliku regenerowanego, ponieważ jest to najmłodszy plik.
         
*    [ EDDGrid Kopiuj](#eddgridcopy) jest bardzo podobny do EDDTableCopy, ale działa z zawiązanymi zbiorami danych.
#### szkielet EDDTableCopy XML{#eddtablecopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractDestinationNames>...&lt;/extractDestinationNames>  &lt;!-- 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderExtractBy>...&lt;/orderExtractBy> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#tablecopy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

- -

## Szczegóły{#details-1} 

Oto szczegółowe opisy wspólnych znaczników i atrybutów.

### &lt;angularDegreeUnits & gt;{#angulardegreeunits} 
* [ ** &lt;AngularDegreeUnits &gt; ** ] (# angulardegreeunits) jest rzadko używanym znacznikiem optycznym w obrębie&lt;erddapDatasets &gt; tag in datasets.xml która zawiera oddzieloną od commaa listę ciągów jednostek, które ERDDAP™ powinny być traktowane jako jednostki stopni kątowych. Jeśli zmienna ma jedną z tych jednostek, tabledap jest orderByMean filtr będzie obliczać średnią w specjalny sposób, a następnie zgłosić średnią jako wartość od -180 do 180. Patrz ERDDAP plik kodu źródłowego EDStatic.java dla bieżącej listy domyślnej. Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ odczyt datasets.xml , w tym w odpowiedzi na zbiór danych [bandera](/docs/server-admin/additional-information#flag) .
### &lt;angularDegreeTrueUnits & gt;{#angulardegreetrueunits} 
* [ ** &lt;kątowy DegreeTrueUnits &gt; ** ] (# angulardegreetrueunits) jest rzadko używanym znacznikiem optycznym w obrębie&lt;erddapDatasets &gt; tag in datasets.xml która zawiera oddzieloną od commaa listę ciągów jednostek, które ERDDAP™ powinny traktować jako kątowe stopnie prawdziwe jednostki. Jeśli zmienna ma jedną z tych jednostek, tabledap jest orderByMean filtr będzie obliczać średnią w specjalny sposób, a następnie zgłosić średnią jako wartość od 0 do 360. Patrz ERDDAP plik źródłowy EDStatic.java dla bieżącej listy domyślnej. Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ odczyt datasets.xml , w tym w odpowiedzi na zbiór danych [bandera](/docs/server-admin/additional-information#flag) .
     
### &lt;common StandardNames & gt;{#commonstandardnames} 
* [ ** &lt;CommonStandard Nazewnictwa &gt; ** ] (# Common Standard names) jest rzadko używanym znacznikiem optycznym w obrębie&lt;erddapDatasets &gt; tag in datasets.xml w celu określenia listy wspólnej oddzielonej od comma- [Nazwa standardowa CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) . Np.
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
Ta lista jest używana w DataProviderForm3.html jako wygoda dla użytkowników.
Jeśli chcesz dostarczyć te informacje w datasets.xml , rozpocząć od skopiowania bieżącej listy domyślnej w&lt;DEFAULT\\ _ commonStandard Nazwy &gt; w ERDDAP jest
 \\[ tomcat \\] / webapps / erddap / WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml file.
     
### &lt;kapsułki & gt;{#cacheminutes} 
* [ ** &lt;KaszeMinuty &gt; ** ] (# cacheminutes) jest rzadko używanym znacznikiem optycznym w obrębie&lt;erddapDatasets &gt; tag in datasets.xml określenie wieku (w minutach) w którym pliki w pamięci podręcznej powinny zostać usunięte (domyślny = 60) . Np.
```
    <cacheMinutes>60</cacheMinutes>  
```
Ogólnie, tylko pliki obrazkowe (ponieważ te same obrazy są często wymagane wielokrotnie) oraz .nc pliki (ponieważ muszą być w pełni utworzone przed wysłaniem do użytkownika) są buforowane. Chociaż może się wydawać, że dana prośba powinna zawsze odpowiadać tak samo, to nie jest to prawda. Na przykład tabledap wniosek zawierający czas &gt; *niektóre Czas* zmieni się, gdy nowe dane przybędą do zbioru danych. I żądanie griddap, które obejmuje \\[ ostatni \\] dla wymiaru czasu zmieni się, gdy nowe dane przybędą do zbioru danych. Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ odczyt datasets.xml , w tym w odpowiedzi na zbiór danych [bandera](/docs/server-admin/additional-information#flag) . Przed ERDDAP™ v2.00, to zostało określone w setup.xml, który jest nadal dozwolony, ale zniechęcony.

### &lt;KACZEPIENIE Protokół & gt;{#cacheclearminutes} 
* [ ** &lt;KACZEPIENIE &gt; ** ] (# cacheclearminutes) jest rzadko używanym znacznikiem optycznym w obrębie&lt;erddapDatasets &gt; tag in datasets.xml aby określić częstotliwość sprawdzania plików cached i usunąć stare (w minutach)   (domyślny = 15) . Np.
```
    <cacheClearMinutes>15</cacheClearMinutes>  
```
Gdy serwer zakończy obsługę żądania, będzie sprawdzał, jak dawno temu ostatni cache clear był. Jeśli to było zbyt dawno temu, to będzie kolejka zadanie na TaskThread, aby wyczyścić cache. Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ odczyt datasets.xml , w tym w odpowiedzi na zbiór danych [bandera](/docs/server-admin/additional-information#flag) . Można to określić w sposób określony w setup.xml, ale jest to zniechęcające.
     
### &lt;convertInterpolateRequestCSVPrzykład & gt;{#convertinterpolaterequestcsvexample} 
* [ ** &lt;convertInterpolateRequestCSVPrzykład &gt; ** ] (# convertinterpolaterequestcsvexample) jest znacznikiem optycznym w obrębie&lt;erddapDatasets &gt; tag in datasets.xml   \\[ rozpoczynając od ERDDAP™ v2.10 \\] który zawiera przykład, który zostanie pokazany na stronie Interpolate. Domyślna wartość to: jplMU RSS T41 / analiza\\ _ sst Bilinear / 4.
### &lt;convertInterpolateDatasetidVariableList & gt;{#convertinterpolatedatasetidvariablelist} 
* [ ** &lt;convertInterpolateDatasetidVariable List &gt; ** ] (# convertinterpolated asetid variablelist) jest znacznikiem optycznym w obrębie&lt;erddapDatasets &gt; tag in datasets.xml   \\[ rozpoczynając od ERDDAP™ v2.10 \\] który zawiera listę CSV datasetID / zmienna Podaj przykłady, które zostaną wykorzystane jako sugestie na stronie Interpolate. Domyślna wartość to: jplMU RSS T41 / analiza\\ _ sst .
### &lt;convertToPublicSourceUrl & gt;{#converttopublicsourceurl} 
* [ ** &lt;convertToPublicSourceUrl &gt; ** ] (# converttopublicsourceurl) jest znacznikiem optycznym w obrębie&lt;erddapDatasets &gt; tag in datasets.xml który zawiera atrybut "od" i "od" do ", który określa jak przekonwertować dopasowanie lokalne sourceUrl   (zazwyczaj numer IP) na rynek publiczny sourceUrl   (nazwa domeny) "od" must have the form " \\[ coś \\] / / \\[ coś \\] ". Może być 0 lub więcej tych znaczników. Więcej informacji na ten temat znajduje się w [&lt; sourceUrl &gt;] (# sourceurl) . Na przykład:
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
spowoduje dopasowanie lokalnych sourceUrl   (takie jakhttps://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day)   
na rynek publiczny sourceUrl   (https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day) .
Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ odczyt datasets.xml , w tym w odpowiedzi na zbiór danych [bandera](/docs/server-admin/additional-information#flag) .

Ale ze względów bezpieczeństwa i związanych z systemem subskrypcji, **Nie używaj tej tagi&#33;**   
Zamiast, zawsze używać nazwy domeny publicznej w&lt; sourceUrl &gt; znacznik i użyj [/ etc / hosts table](https://linux.die.net/man/5/hosts) na serwerze do konwersji lokalnych nazw domen do numerów IP bez użycia serwera DNS. Możesz sprawdzić, czy nazwa domeny jest poprawnie przekształcana w numer IP za pomocą:
ping *some.domain.name*   
     
### data: image / png; base64,{#dataimagepngbase64} 
* Kiedy użytkownik żąda .htmlTable odpowiedź od ERDDAP™ , jeśli dane w komórce String zawierają dane: image / png; base64, po których następuje base64 zakodowanego obrazu .png, ERDDAP™ wyświetla ikonę (więc użytkownik może zobaczyć obraz, jeśli unoszą się nad nim) i przyciski, aby zapisać tekst lub obraz do schowka. Ta funkcja została dodana w ERDDAP™ v2.19 Marco Alba.
###  drawLandMask  {#drawlandmask} 
*    [ ** drawLandMask ** ](#drawlandmask) określa domyślne ustawienie, które kontroluje czas i sposób rysowania maski obcej, ERDDAP™ rysuje mapę. Może być określone w trzech różnych miejscach w datasets.xml   (wymienione od najniższego do najwyższego priorytetu) :
    
    1. Jeśli drawLandMask jest określone w&lt;erddapDatasets &gt; (niezwiązane z żadnym konkretnym zbiorem danych) , następnie określa domyślną wartość drawLandMask dla wszystkich zmiennych we wszystkich zbiorach danych. Na przykład:
    ```
        <drawLandMask>under</drawLandMask>  
    ```
Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP odczyt datasets.xml .
Jeśli ten znacznik nie jest obecny, wartość domyślna jest poniżej.
         
    2. Jeśli drawLandMask jest określony jako atrybut globalny danego zbioru danych, a następnie określa domyślną wartość drawLandMask dla wszystkich zmiennych w tym zbiorze danych, nadrzędne jakiekolwiek niższe ustawienie priorytetów. Na przykład:
    ```
        <att name="drawLandMask">under</att>  
    ```
Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ Przeładowuje ten zestaw danych.
         
    3. Jeśli drawLandMask jest określony jako atrybut zmiennej w danym zbiorze danych, następnie określa domyślną wartość drawLandMask dla tej zmiennej w tym zbiorze danych, nadrzędne jakiekolwiek niższe ustawienie priorytetów. Na przykład:
    ```
        <att name="drawLandMask">under</att>  
    ```
Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ Przeładowuje ten zestaw danych.
    
Użytkownik może nadpisać wartość domyślną (gdziekolwiek jest określone) poprzez wybranie wartości dla "Draw land mask" z listy rozwijanej na stronie internetowej Make A Graph lub poprzez włączenie & .land = *wartość* w URL, który wymaga mapy z ERDDAP .
    
We wszystkich sytuacjach istnieje 4 możliwe wartości atrybutu:
    
    * "under" rysuje maskę, zanim wyciąga dane na mapie.
Dla pasowanych zbiorów danych, ziemia pojawia się jako stały jasnoszary kolor.
Dla tabelarycznych zbiorów danych "pod" pokazuje dane topograficzne na lądzie i oceanach.
    * "ponad"... W przypadku zbiorów danych "over" rysuje maskę lądową po tym, jak rysuje dane na mapach, tak aby zamaskować wszelkie dane na lądzie. Dla tabelarycznych zbiorów danych, "over" pokazuje batymetrię oceanu i stały jasnoszary, gdzie jest ziemia, oba narysowane pod danymi.
    * "zarys" tylko rysuje zarys maski, granic politycznych, jezior i rzek.
    * "off" niczego nie rysuje.
### &lt;emailDiagnosticsToErdData & gt;{#emaildiagnosticstoerddata} 
* [ ** &lt;emailDiagnosticsToErdData &gt; ** ] (# emaildiagnosticstoerddata) jest rzadko używanym znacznikiem optycznym w obrębie&lt;erddapDatasets &gt; tag in datasets.xml . Wartość znacznika może być prawdziwa (domyślny) albo fałszywe. Jeśli to prawda, ERDDAP™ wyśle wiadomość do Chrisa. John w Noah. gov (do ERDDAP™ zespół ds. rozwoju) . Powinno to być bezpieczne, ponieważ brak poufnych informacji (np. requestUrl) jest zawarte w e-mailu. Powinno to umożliwić złapanie wszelkich niejasnych, całkowicie niespodziewanych błędów, które prowadzą do NullPointerexceptions. W przeciwnym razie użytkownik widzi wyjątki, ale ERDDAP™ zespół rozwoju nie (Więc nie wiemy, czy istnieje problem, który trzeba naprawić.) .
     
### &lt;graphBackgroundColor & gt;{#graphbackgroundcolor} 
* [ ** &lt;graphBackgroundColor &gt; ** ] (# graphbackgroundcolor) jest rzadko używanym znacznikiem optycznym w obrębie&lt;erddapDatasets &gt; tag in datasets.xml aby określić domyślny kolor tła na wykresach. Dotyczy to prawie wszystkich wykresów. Istnieje kilka sytuacji, które nie mają wpływu. Kolor jest określony jako 8-cyfrowa wartość szesnastkowa w formie 0xAARRGGBB, gdzie AA, RR, GG i BB są zmętnienie, czerwony, zielony i niebieski komponenty, odpowiednio. "0x" jest wrażliwy na przypadek, ale cyfry szesnastkowe nie są wrażliwe na przypadek. Na przykład, w pełni nieprzezroczyste (ff) greenish- blue kolor z czerwonym = 22, green = 88, blue = ee byłby 0xff2288ee. Nieprzezroczysty biały to 0xffffffff. Domyślnie jest nieprzezroczysty jasnoniebieski (0xffccccff) , który ma tę zaletę, że jest inny niż biały, który jest ważnym kolorem w wielu paletach używanych do rysowania danych. Na przykład:
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ odczyt datasets.xml , w tym w odpowiedzi na zbiór danych [bandera](/docs/server-admin/additional-information#flag) .
### &lt;ipAdressMaxRequestions & gt;{#ipaddressmaxrequests} 
* [ ** &lt;ipAdressMaxRequestions &gt; ** ] (# ipaddressmaxrequests) jest rzadko używanym opcjonalnym znacznikiem (pierwszy obsługiwany z ERDDAP™ v2.12) w obrębie&lt;erddapDatasets &gt; tag in datasets.xml który jest częścią systemu ograniczającego zdolność nadmiernie agresywnych, legalnych użytkowników i złośliwych użytkowników do składania dużej liczby jednoczesnych wniosków, które obniżałyby wydajność systemu dla innych użytkowników. ipAddress MaxRequestions określa maksymalną liczbę jednoczesnych wniosków, które zostaną przyjęte z dowolnego konkretnego adresu IP. Dodatkowe wnioski otrzymają błąd HTTP 429: Zbyt wiele żądań. Małe, statyczne pliki w erddap / download / i erddap / images / NIE są zwolnione z tej liczby. Domyślnie to 15. Maksymalna dopuszczalna wartość to 1000, co jest szalenie wysokie - nie rób tego&#33; ERDDAP™ nie zaakceptuje liczby mniejszej niż 6, ponieważ wielu uprawnionych użytkowników (w szczególności przeglądarek internetowych oraz WMS klienci) uzupełnić do 6 wniosków na raz. W ERDDAP™ Daily Report i podobne informacje napisane do pliku log.txt z każdym Major Dataset Reload, będzie teraz zawierać liter żądań tych adresów IP pod tytułem "Adres IP Requester IP (Zbyt wiele żądań) ".
Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ odczyt datasets.xml , w tym w odpowiedzi na zbiór danych [bandera](/docs/server-admin/additional-information#flag) .
    
Sekcja "Major LoadDatasets Time Series" w status.html zawiera kolumnę "too Many", która zawiera listę żądań, które przekroczyły ustawienia ipAddressMaxRequests użytkownika i w ten sposób zobaczył błąd "Too Many Requests". Pozwala to łatwo zobaczyć, kiedy są aktywne zbyt agresywne prawnych użytkowników i złośliwych użytkowników, więc można (opcjonalnie) look in the log.txt file and decide if you wanna blacklist those users.
    
Nie ma nic złego w ustawieniu tego na większą liczbę. To zależy od ciebie. Ale to pozwala / zachęca ludzi do tworzenia systemów, które wykorzystują dużą liczbę wątków do pracy nad projektami, a następnie nie daje im żadnych informacji zwrotnych, że to, co robią nie przynosi im żadnych korzyści.
### &lt;ipAdressMaxRequestsActive{#ipaddressmaxrequestsactive} 
* [ ** &lt;ipAdressMaxRequestsActive &gt; ** ] (# ipaddressmaxrequestsactive) jest rzadko używanym opcjonalnym znacznikiem (pierwszy obsługiwany z ERDDAP™ v2.12) w obrębie&lt;erddapDatasets &gt; tag in datasets.xml który jest częścią systemu ograniczającego zdolność nadmiernie agresywnych, legalnych użytkowników i złośliwych użytkowników do składania dużej liczby jednoczesnych wniosków, które obniżałyby wydajność systemu dla innych użytkowników. ipAdressMaxRequestsActive określa maksymalną liczbę jednoczesnych wniosków, które będą aktywnie przetwarzane z dowolnego konkretnego adresu IP. Dodatkowe wnioski zostaną rozpatrzone w kolejce. Małe, statyczne pliki w erddap / download / i erddap / images / are exempt from this count and the related throttling. Domyślnie 2. Maksymalna dopuszczalna wartość to 100, co jest szalenie wysokie - nie rób tego&#33; Można ustawić to na 1, aby być rygorystycznym, zwłaszcza jeśli masz problemy z nadmiernie agresywnych lub złośliwych użytkowników. Użytkownicy będą nadal szybko uzyskać wszystkie dane, które chcą (do ipAdressMaxRequestions) Ale nie będą w stanie przechować zasobów systemu. Nie zalecamy ustawiania tej liczby na większą liczbę, ponieważ pozwala to nadmiernie agresywnych, legalnych użytkowników i złośliwych użytkowników zdominować ERDDAP zdolności przetwórcze.
Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ odczyt datasets.xml , w tym w odpowiedzi na zbiór danych [bandera](/docs/server-admin/additional-information#flag) .
     
### &lt;ipAdressUnlimited & gt;{#ipaddressunlimited} 
* [ ** &lt;ipAdressUnlimited &gt; ** ] (# ipadegarsunlimited) jest rzadko używanym opcjonalnym znacznikiem (pierwszy obsługiwany z ERDDAP™ v2.12) w obrębie&lt;erddapDatasets &gt; tag in datasets.xml który jest częścią systemu ograniczającego zdolność nadmiernie agresywnych, legalnych użytkowników i złośliwych użytkowników do składania dużej liczby jednoczesnych wniosków, które obniżałyby wydajność systemu dla innych użytkowników. ipAddressUnlimited to oddzielona od comma- lista adresów IP, które chcesz umożliwić nieograniczony dostęp do Twojego ERDDAP . Sprawdź w dzienniku. plik txt, aby sprawdzić, jakiego formatu używa serwer dla adresów IP. Na niektórych serwerach adresy IP będą w formacie #. #. #. # (gdzie # jest liczbą całkowitą od 0 do 255) ; mając na uwadze, że na innych będzie to w formacie #: #: #: #: #: #: #: #: #: #: #: # #. Wnioski na tej liście nie podlegają ani ustawieniom ipAdressMaxRequestions ani ipAdressMaxRequestsActive. To może być drugorzędne. ERDDAP™ lub dla niektórych użytkowników lub serwerów w Twoim systemie. ERDDAP™ zawsze dodaje " (nieznany adres IP) ", które ERDDAP™ używa, gdy adres IP requestera nie może być określony, np. dla innych procesów działających na tym samym serwerze.
Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ odczyt datasets.xml , w tym w odpowiedzi na zbiór danych [bandera](/docs/server-admin/additional-information#flag) .
    
Jeśli z jakiegoś powodu wszystkie prośby użytkownika otrzymają komunikat błędu "Timeout czeka na inne żądania do przetworzenia"., wtedy można rozwiązać problem dodając adres IP użytkownika do listy ipAddressUnlimited, stosując tę zmianę, a następnie usunąć go z tej listy.
    
### &lt;loadDatasetsMinMinMinMinutes & gt;{#loaddatasetsminminutes} 
* [ ** &lt;loadDatasetsMinMinMinMinMinutes &gt; ** ] (# loaddatasetsminminutes) jest rzadko używanym znacznikiem optycznym w obrębie&lt;erddapDatasets &gt; tag in datasets.xml określenie minimalnego czasu (w minutach) między głównym ładunkiem Zestawy danych (kiedy ERDDAP™ procesy regeneracji datasets.xml , w tym sprawdzanie każdego zbioru danych w celu sprawdzenia, czy musi być ponownie załadowany zgodnie z jego ponownym załadowaniem Każdy protokół ustalający, domyślnie = 15) . Np.
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
Jeśli dany bieg loadDatasets zajmuje mniej niż ten czas, ładownik po prostu wielokrotnie przegląda katalog flag i / lub śpi do czasu upływu czasu. Domyślnie 15 minut, co powinno być dobre dla prawie każdego. Jedyną wadą dla ustawienia tej liczby na mniejszą liczbę jest to, że zwiększy częstotliwość, że ERDDAP™ ponownie testuje zbiory danych, które mają błędy uniemożliwiające załadowanie (np. zdalny serwer jest w dół) . Jeżeli istnieje wiele takich zbiorów danych i są one często poddawane ponownemu badaniu, źródło danych może uznać je za uciążliwe / agresywne zachowanie. Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ odczyt datasets.xml , w tym w odpowiedzi na zbiór danych [bandera](/docs/server-admin/additional-information#flag) . Przed ERDDAP™ v2.00, to zostało określone w setup.xml, który jest nadal dozwolony, ale zniechęcony.
     
### &lt;loadDatasetsMaxMinut & gt;{#loaddatasetsmaxminutes} 
* [ ** &lt;loadDatasetsMaxMinutes &gt; ** ] (# loaddatasetsmaxminutes) jest znacznikiem optycznym w obrębie&lt;erddapDatasets &gt; tag in datasets.xml określić maksymalny czas (w minutach) duży ładunek Zestawy danych są dozwolone (przed obciążeniem Nici z danymi traktowane jako "zablokowane" i jest przerywane)   (domyślny = 60) . Np.
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
Ogólnie rzecz biorąc, powinno to być ustawione na co najmniej dwa razy tyle, ile rozsądnie sądzicie, że przeładowanie wszystkich zbiorów danych (łącznie) należy (ponieważ komputery i sieci są czasami wolniejsze niż oczekiwano) Powinno to być zawsze znacznie dłuższe niż LoadDatasetsMinMinMinMinMinutes. Domyślnie 60 minut. Niektórzy ludzie to przedłużą. Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ odczyt datasets.xml , w tym w odpowiedzi na zbiór danych [bandera](/docs/server-admin/additional-information#flag) . Przed ERDDAP™ v2.00, to zostało określone w setup.xml, który jest nadal dozwolony, ale zniechęcony.
     
### &lt;logLevel & gt;{#loglevel} 
* [ ** &lt;logLevel &gt; ** ] (# loglevel) jest znacznikiem optycznym w obrębie&lt;erddapDatasets &gt; tag in datasets.xml aby określić, ile wiadomości diagnostycznych jest wysyłanych do pliku log.txt. Można ustawić na "ostrzeżenie" (najmniej wiadomości) , "info" (domyślny) lub "wszyscy" (większość wiadomości) . Np.
```
    <logLevel>info</logLevel>  
```
Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ odczyt datasets.xml , w tym w odpowiedzi na zbiór danych [bandera](/docs/server-admin/additional-information#flag) . Przed ERDDAP™ v2.00, to zostało określone w setup.xml, który jest nadal dozwolony, ale zniechęcony.
     
### &lt;partialRequestMaxBytes & gt; oraz&lt;partialRequestMaxCells & gt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* [ ** &lt;partialRequestMaxBytes &gt; **] (# partialrequestmaxbytes- and- partialrequestmaxcells) I...** &lt;partialRequestMaxCells &gt; ** ] (# partialrequestmaxbytes- and- partialrequestmaxcells) są rzadko używane znaczniki optyczne w obrębie&lt;erddapDatasets &gt; tag in datasets.xml . W miarę możliwości (i to nie zawsze jest możliwe) , ERDDAP™ łamie duże żądania danych na kawałki, aby zachować pamięć.
    
Z 32 bitami Java , w uproszczeniu, maksymalna liczba jednoczesnej *duża* żądania jest około 3 / 4 dostępnej pamięci (wartość -Xmx przekazana Tomcat) podzielony przez rozmiar kawałka (np. 1200 MB / 100 MB = &gt; 12 wniosków) . Inne rzeczy wymagają pamięci, więc rzeczywista liczba wniosków będzie mniejsza. W praktyce chunking nie zawsze jest możliwy. Więc jeden ogromny lub kilka bardzo dużych jednocześnie niechudych próśb może spowodować problemy na 32 bit Java .

Z 64 bitami Java , wartość -Xmx może być znacznie większa. Pamięć jest więc znacznie mniej prawdopodobna.

Możesz nadpisać domyślny rozmiar kawałka, definiując te znaczniki w datasets.xml   (o różnych wartościach niż pokazane tutaj) :
W przypadku sieci:&lt;partialRequestMaxBytes &gt; 100000000&lt;/ partialRequestMaxBytes &gt;
Dla tabel:&lt;partialRequestMaxCells &gt; 1000000&lt;/ partialRequestMaxCells &gt;

partialRequestMaxBytes jest preferowaną maksymalną liczbą bajtów dla częściowego żądania danych sieciowych (część całkowitego wniosku) . wartość domyślna = 100000000 (10 ^ 8) . Większe rozmiary niekoniecznie są lepsze. (i nie przejść ponad 500 MB, ponieważ jest to domyślny limit THREDDS dla DAP odpowiedzi) . Ale większe rozmiary mogą wymagać mniej dostępu ton plików (Pomyśl o ERD dane satelitarne z każdym punktem czasowym w oddzielnym pliku - lepiej uzyskać więcej danych z każdego pliku w każdym częściowym wniosku) .

partialRequestMaxCells jest preferowaną maksymalną liczbą komórek (nRows\\ * nColumns w tabeli danych) dla częściowego wniosku o wydanie danych dotyczących tabeli (część całkowitego wniosku) . Domyślnie = 100000. Większe rozmiary niekoniecznie są lepsze. Powodują one dłuższe czekanie na początkową partię danych ze źródła.

Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ odczyt datasets.xml , w tym w odpowiedzi na zbiór danych [bandera](/docs/server-admin/additional-information#flag) . Przed ERDDAP™ v2.00, zostały określone w setup.xml, który jest nadal dozwolony, ale zniechęcony.
     
### &lt;requestBlacklist & gt;{#requestblacklist} 
* [ ** &lt;requestBlacklist &gt; ** ] (# requestblacklist)   [jest znacznikiem optycznym](/docs/server-admin/additional-information#frequent-crashes-or-freezes) w obrębie&lt;erddapDatasets &gt; tag in datasets.xml który zawiera oddzieloną od commaa listę numerycznych adresów IP, które będą na czarnej liście. Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ odczyt datasets.xml , w tym w odpowiedzi na zbiór danych [bandera](/docs/server-admin/additional-information#flag) .
    * Można to wykorzystać do odparcia [Odmowa ataku służby](https://en.wikipedia.org/wiki/Denial_of_service) , zbyt gorliwy [robot sieciowy](https://en.wikipedia.org/wiki/Internet_bot) lub jakiegokolwiek innego rodzaju kłopotliwego użytkownika.
    * Kłopotliwy użytkownik... Jeśli ERDDAP™ spowalnia czołganie się lub zamraża / zatrzymuje się, przyczyną jest często kłopotliwy użytkownik, który uruchamia więcej niż jeden skrypt na raz i / lub co duża liczba bardzo dużych, niezwykle nieefektywnych, lub niepoprawnych żądań, lub jednocześnie wniosków. Zajrzyj. [log.txt](/docs/server-admin/additional-information#log) aby sprawdzić, czy tak jest i znaleźć numeryczny adres IP kłopotliwego użytkownika. Jeśli to jest problem, powinieneś prawdopodobnie czarną listę tego użytkownika.
        
Kiedy ERDDAP™ otrzymuje żądanie z czarnego adresu IP, zwróci błąd HTTP 403: Zakazane. towarzyszący wiadomość o błędzie tekstowym zachęca użytkownika do wysyłania wiadomości e-mail, ERDDAP Administrator, aby rozwiązać problemy. Jeśli mają czas na przeczytanie komunikatu błędu (wielu najwyraźniej nie) i skontaktować się z tobą, można wtedy pracować z nimi, aby uruchomić tylko jeden skrypt na raz, zrobić bardziej efektywne żądania, naprawić problemy w ich skrypcie (na przykład żądanie danych z zdalnego zbioru danych, które nie mogą odpowiedzieć przed upływem czasu) lub cokolwiek innego było źródłem kłopotów.
        
Użytkownicy są często po prostu nieświadomi, że ich wnioski są kłopotliwe. Często są nieświadomi błędów, rażącej nieefektywności lub innych problemów ze swoimi skryptami. Często tak myślą, ponieważ ERDDAP™ oferuje dane za darmo, że mogą poprosić o tyle danych, ile chcą, np. poprzez uruchomienie wielu skryptów lub za pomocą wielu wątków jednocześnie.
        
        * Możesz im wyjaśnić, że każdy ERDDAP™ , teraz ważne jak duże i potężne, ma ograniczone zasoby (Czas procesora, dysk twardy I / O, przepustowość sieci itp.) i nie jest sprawiedliwe, jeśli jeden użytkownik żąda danych w sposób, który wytłumi innych użytkowników lub przeciążenia ERDDAP .
        * Gdy użytkownik wie, jak złożyć 2 jednoczesne wnioski, często nie widzą powodu, aby nie złożyć 5, 10 lub 20 jednoczesnych wniosków, ponieważ dodatkowe wnioski nic ich nie kosztuje. To jak asymetryczna wojna: tutaj broń ofensywna ma ogromną przewagę (koszt zerowy) nad bronią obronną (instalacji skończonej o rzeczywistych kosztach) .
        * Wskaż im, że maleją zyski z składania coraz większej liczby wniosków jednocześnie; dodatkowe wnioski po prostu dalej blokują żądania innych użytkowników; nie dają one ogromnej poprawy dla nich.
        * Przypomnij im, że są inni użytkownicy (zarówno przypadkowych użytkowników, jak i innych użytkowników obsługujących skrypty) Więc to nie w porządku z ich strony. ERDDAP Zasoby.
        * Należy zwrócić uwagę, że giganci technologiczni skłonili użytkowników do oczekiwania nieskończonych zasobów z usług internetowych. Podczas gdy są sposoby, aby ustawić [sieci / klastry / federacje ERDDAP s](/docs/server-admin/scaling) do ERDDAP™ system z większą ilością zasobów, większość ERDDAP™ administratorzy nie mają pieniędzy ani siły roboczej, by stworzyć takie systemy, a taki system nadal będzie skończony. W ERD na przykład, jest jedna osoba (ja) pisanie ERDDAP™ 2 ERDDAP s (z pomocą mojego szefa) , i zarządzanie kilkoma źródłami danych, wszystkie z rocznym budżetem sprzętu $0 (polegamy na okazjonalnych grantach, aby zapłacić za sprzęt) . To nie jest Google, Facebook, Amazon, itd. 100 inżynierów i miliony dolarów przychodów do recyklingu w coraz większych systemach. I nie możemy po prostu przenieść naszych ERDDAP™ na przykład Amazon AWS, ponieważ koszty przechowywania danych są duże, a opłaty za emisję danych są duże i zmienne, podczas gdy nasz budżet na usługi zewnętrzne jest stały 0 dolarów.
        * Moja prośba do użytkowników jest: dla nieczułych na czas wniosków (który jest zdecydowanie najczęstszym przypadkiem) Ich system powinien składać tylko jedną prośbę na raz. Jeżeli wnioski są wrażliwe na czas (np. wiele .pngs na stronie internetowej, wiele płytek dla WMS klient itp.) , może 4 jednoczesne wnioski powinny być max (i tylko na bardzo krótki czas) .
        * Jeśli wyjaśnisz sytuację użytkownikowi, większość użytkowników zrozumie i będzie skłonna dokonać niezbędnych zmian, dzięki czemu można usunąć ich adres IP z czarnej listy.
             
    * Aby zaczarować użytkownika, dodaj ich numeryczny adres IP do oddzielonej od comma listy adresów IP w&lt;requestBlacklist &gt; w Twoim datasets.xml plik. Aby znaleźć kłopotliwy adres IP użytkownika, zobacz w ERDDAP™   *bigParentDirectory* / logs / log.txt file ( *bigParentDirectory* jest określony w [setup.xml](/docs/server-admin/deploy-install#setupxml) ) sprawdzić, czy tak jest i znaleźć adres IP tego użytkownika. Adres IP dla każdego żądania jest wymieniony na liniach zaczynających się od "& # 123; & # 123; & # 123; & # 123; #" i jest 4 liczbami oddzielonymi przez okresy, na przykład, 123.45.67.8. Poszukiwanie "ERROR" pomoże Ci znaleźć problemy, takie jak nieprawidłowe żądania.
    * Możesz również zastąpić ostatni numer w adresie IP\\*(na przykład, 202.109.200.\\*) zablokować zakres adresów IP, 0- 255.
    * Możesz również zastąpić ostatnie 2 numery w adresie IP\\*.\\*  (na przykład, 121.204.\\*.\\*) aby zablokować szerszy zakres adresów IP, 0-255.0-255.
    * Na przykład:
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * Nie musisz zaczynać od nowa. ERDDAP™ dla zmian&lt;requestBlacklist &gt; do wejścia w życie. Zmiany zostaną wykryte następnym razem ERDDAP™ sprawdza, czy jakiekolwiek zestawy danych muszą być ponownie załadowane. Lub, można przyspieszyć proces odwiedzając [setDataset URL flagi](/docs/server-admin/additional-information#set-dataset-flag) dla dowolnego zbioru danych.
    * Twój ERDDAP™ raport dzienny zawiera wykaz / zestawienie najbardziej aktywnych zgłoszeń dopuszczonych i zablokowanych.
    * Jeśli chcesz dowiedzieć się, jaka domena / instytucja jest powiązana z numerycznym adresem IP, możesz użyć darmowej, odwrotnej usługi internetowej DNS jak [https://network-tools.com/](https://network-tools.com/) .
    * Mogą być czasy, kiedy sensowne jest blokowanie niektórych użytkowników na wyższym poziomie, na przykład złośliwych użytkowników. Na przykład, można zablokować ich dostęp do wszystkiego na serwerze, nie tylko ERDDAP . W Linuksie jedną z takich metod jest użycie [iptables](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/) . Na przykład, można dodać regułę, która zablokuje wszystko pochodzące z 198.51.100.0 z polecenia
iptables I INPUT -s 198.51.100.0 - j DROP
       
### &lt;slowDownTroubleMillis & gt;{#slowdowntroublemillis} 
* [ ** &lt;slowDownTroubleMillis &gt; ** ] (# slowdown troublemillis) jest rzadko używanym znacznikiem optycznym w obrębie&lt;erddapDatasets &gt; tag in datasets.xml która zawiera liczbę całkowitą określającą liczbę milisekund (domyślny = 1000) wstrzymanie odpowiedzi na wszystkie nieudane żądania, np. nieznany zestaw danych, żądanie zbyt duże, użytkownik na czarnej liście. Np.
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
Jeśli skrypt składa jeden wniosek zaraz po drugim, to może szybko złożyć jeden zły wniosek po drugim. Z tym ustawieniem, można spowolnić upadający skrypt tak ERDDAP™ nie jest zalany złymi życzeniami. Jeśli człowiek złoży złą prośbę, nie zauważą nawet tego opóźnienia. Zalecenia:
    
    * Jeśli problemem jest rozproszone zaprzeczenie usługi (DOS) atak od 100 + atakujący, ustawić to na mniejszą liczbę (100?) . Uwolnienie ich na zbyt długo prowadzi do zbyt wielu aktywnych wątków.
    * Jeśli problem jest z 1-10 źródeł, ustawić to na 1000 ms (domyślny) , ale większa liczba (jak 10000) jest również rozsądne. To ich spowalnia, więc marnują mniej zasobów sieciowych. Ponadto, 1000 ms lub więcej nie będzie denerwować użytkowników ludzi, którzy składają złą prośbę.
    
Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ odczyt datasets.xml , w tym w odpowiedzi na zbiór danych [bandera](/docs/server-admin/additional-information#flag) .
     
### &lt;subscriptionEmailBlacklist & gt;{#subscriptionemailblacklist} 
* [ ** &lt;subskrypcja EmailBlacklist &gt; ** ] (# subscriptionemailblacklist) jest rzadko używanym znacznikiem optycznym w obrębie&lt;erddapDatasets &gt; tag in datasets.xml który zawiera oddzieloną od comma- listę adresów e-mail, które są natychmiast na czarnej liście z [system subskrypcji](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) , na przykład
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
To system nieczuły. Jeśli adres e-mail zostanie dodany do tej listy, jeśli ten adres e-mail ma subskrypcje, subskrypcje zostaną anulowane. Jeśli adres e-mail na liście spróbuje subskrybować, wniosek zostanie odrzucony. Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ odczyt datasets.xml , w tym w odpowiedzi na zbiór danych [bandera](/docs/server-admin/additional-information#flag) .
     
### Tekst standardowy{#standard-text} 
*    [ **Tekst standardowy** ](#standard-text) -- Istnieje kilka znaczników optycznych (rzadko są stosowane) w obrębie&lt;erddapDatasets &gt; tag in datasets.xml aby określić tekst, który pojawia się w różnych miejscach w ERDDAP . Jeśli chcesz zmienić domyślny tekst, skopiuj istniejącą wartość z znacznika tej samej nazwy w
     *tomcat* / webapps / erddap / WEB- INF / classes / gov / noaa / pfel / erddap / utili.messages.xml do datasets.xml , a następnie modyfikować zawartość. Korzyść z posiadania tych w datasets.xml jest to, że można określić nowe wartości w każdej chwili, nawet gdy ERDDAP™ Ucieka. Wszelkie zmiany wartości tych znaczników będą skuteczne następnym razem ERDDAP™ odczyt datasets.xml , w tym w odpowiedzi na zbiór danych [bandera](/docs/server-admin/additional-information#flag) . Nazwy znaczników opisują ich cel, ale zobacz domyślną zawartość w messages.xml, aby uzyskać głębsze zrozumienie.
    
    *   &lt;Standard License &gt;
    *   &lt;Norma Kontakt &gt;
    *   &lt;StandardDataLicenses &gt;
    *   &lt;Standard DisandisererOfEndorsement &gt;
    *   &lt;Standard DisconsiderarOfExternalLinks &gt;
    *   &lt;Standard GeneralDisclaimer &gt;
    *   &lt;standard Polityka priorytetowa &gt;
    *   &lt;startHeadHtml5 &gt;
    *   &lt;startBodyHtml5 &gt; jest dobrym znacznikiem do zmiany w celu dostosowania wyglądu górnej części każdej strony w Twoim ERDDAP . W szczególności, można użyć tego, aby łatwo dodać tymczasową wiadomość na ERDDAP™ strona główna (np. "Sprawdź nowy zestaw danych JPL MUR SST v4.1"... lub "Ten ERDDAP™ będzie offline do konserwacji 2019- 05- 08T17: 00: 00 PDT przez 2019- 05- 08T20: 00: 00 PDT ".) . Jeden dziwak z wkładaniem tego znacznika datasets.xml jest: po ponownym uruchomieniu ERDDAP , pierwszy wniosek ERDDAP™ zwróci domyślny start BodyHtml5 HTML, ale każdy kolejny wniosek będzie używał HTML startBodyHtml5 określonego w datasets.xml .
    *   &lt;Krótki opis Html &gt; jest dobrym znacznikiem do zmiany w celu dostosowania opisu ERDDAP . Zauważ, że możesz łatwo to zmienić, aby dodać tymczasową wiadomość na stronie głównej (np. "to ERDDAP™ będzie offline do konserwacji 2019- 05- 08T17: 00: 00 PDT przez 2019- 05- 08T20: 00: 00 PDT ".) .
    *   &lt;endBodyHtml5 &gt;
    
      
Przed ERDDAP™ v2.00, zostały określone w setup.xml, który jest nadal dozwolony, ale zniechęcony.
     
### &lt;nietypowe Aktywność & gt;{#unusualactivity} 
* [ ** &lt;unusualActivity &gt; ** ] (# unusualactivity) jest rzadko używanym znacznikiem optycznym w obrębie&lt;erddapDatasets &gt; tag in datasets.xml w celu określenia maksymalnej liczby wniosków pomiędzy dwoma operacjami LoadDatasets, które uważa się za normalne (domyślny = 10000) . Jeśli liczba ta zostanie przekroczona, e-mail zostanie wysłany do emailEverythingTo (jak określono w setup.xml) . Np.
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ odczyt datasets.xml , w tym w odpowiedzi na zbiór danych [bandera](/docs/server-admin/additional-information#flag) . Przed ERDDAP™ v2.00, to zostało określone w setup.xml, który jest nadal dozwolony, ale zniechęcony.
     
### &lt;updateMaxEvents & gt;{#updatemaxevents} 
* [ ** &lt;updateMaxEvents &gt; ** ] (# updatemaxevents) jest rzadko używanym znacznikiem optycznym w obrębie&lt;erddapDatasets &gt; tag in datasets.xml określić maksymalną liczbę zdarzeń zmiany pliku (domyślny = 10) Który będzie obsługiwany przez&lt;updateEveryNMillis &gt;] (# updateeverynmillis) system przed przełączeniem na przeładowanie zbioru danych. Na przykład:
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
System updateEveryNMillis jest przeznaczony do bardzo szybkiego działania tuż przed przetworzeniem wniosku użytkownika. Jeśli istnieje wiele zdarzeń zmiany pliku, to prawdopodobnie nie może działać szybko, więc zamiast tego wymaga przeładowania zbioru danych. Jeśli u pacjenta występuje ERDDAP™ zajmuje się zbiorami danych, które muszą być aktualizowane nawet w przypadku zmian w dużej liczbie plików danych, można to ustawić na większą liczbę (100?) .

### &lt;użytkownik & gt;{#user} 
* [ ** &lt;użytkownik &gt; ** ] (# user) jest znacznikiem optycznym w obrębie&lt;erddapDatasets &gt; tag in datasets.xml który identyfikuje nazwę użytkownika, hasło (jeżeli uwierzytelnienie = niestandardowe) oraz role (Lista oddzielona od comma-) . Korzystanie z nazwy użytkownika i hasła różni się nieznacznie w zależności od wartości [&lt;uwierzytelnienie &gt;] (/ docs / server- admin / additional- information # authentication) w ERDDAP plik setup.xml.
    * To część ERDDAP jest [system bezpieczeństwa](/docs/server-admin/additional-information#security) za ograniczenie dostępu do niektórych zbiorów danych do niektórych użytkowników.
    * Rozdziel&lt;użytkownik &gt; tag dla każdego użytkownika. Opcjonalnie, jeśli uwierzytelnienie = oauth2, można skonfigurować dwa&lt;użytkownik &gt; tagi dla każdego użytkownika: jeden dla gdy użytkownik loguje się przez Google, jeden dla użytkownika loguje się przez Orcid, prawdopodobnie z tych samych ról.
    * Jeśli nie ma&lt;użytkownik &gt; tag dla klienta, s / he będzie mógł uzyskać dostęp tylko do publicznych zbiorów danych, tj. zbiorów danych, które nie mają [&lt;accessibleTo &gt;] (# accessibleto) tag.
    * nazwa użytkownika
Dla uwierzytelniania = niestandardowe, nazwa użytkownika jest zazwyczaj kombinacją liter, cyfr, podkreśleń i okresów.
Dla uwierzytelniania = email, nazwa użytkownika jest adresem e-mail użytkownika. To może być każdy adres e-mail.
Dla uwierzytelniania = google, nazwa użytkownika jest pełnym adresem e-mail użytkownika. Obejmuje to konta zarządzane przez Google- @noaa.gov rachunki.
Dla uwierzytelniania = orcid, nazwa użytkownika jest numerem konta użytkownika Orcid (z kreskami) .
Dla uwierzytelniania = oauth2, nazwa użytkownika jest pełnym adresem e-mail użytkownika lub numerem konta użytkownika Orcid (z kreskami) .
    * hasło
Dla uwierzytelniania = e-mail, google, orcid lub oauth2, nie określa atrybutu hasła.
Dla uwierzytelniania = niestandardowe, należy podać atrybut hasła dla każdego użytkownika.
        * Hasła wprowadzone przez użytkowników są delikatne i muszą mieć 8 lub więcej znaków, więc są trudniejsze do złamania. Obecnie nawet 8 znaków można szybko i niedrogo złamać za pomocą brutalnej siły przy użyciu klastra komputerów na AWS. ERDDAP™ Wymusza minimum 8 znaków tylko wtedy, gdy użytkownik próbuje się zalogować (nie wtedy, gdy&lt;użytkownik &gt; tag jest przetwarzany, ponieważ ten kod widzi tylko hash digest hasła, a nie jawne hasło tekstowe).
        * setup.xml&lt;passwordEncoding &gt; określa sposób przechowywania haseł w&lt;użytkownik &gt; tags in datasets.xml . W celu zwiększenia bezpieczeństwa, opcje są następujące:
            *    [MD5](https://en.wikipedia.org/wiki/MD5)   (Nie używaj tego&#33;) -- dla atrybutu hasłem, należy podać DD5 hash digest hasła użytkownika.
            * UEPMD5 (Nie używaj tego&#33;) -- dla atrybutu hasłem, należy podać wartość DD5 *nazwa użytkownika* : ERDDAP : *hasło* . Nazwa użytkownika i " ERDDAP "są używane do [sól](https://en.wikipedia.org/wiki/Salt_(cryptography) ) wartość haszu, co utrudnia odkodowanie.
            *    [SHA256](https://en.wikipedia.org/wiki/SHA-2)   (niezalecane) -- dla atrybutu haseł, należy podać SHA- 256 hash digest hasła użytkownika.
            * UEPSHA256 (domyślnie, zalecane hasło Kodowanie. Ale znacznie lepiej: użyj opcji uwierzytelniania google, orchidei lub oauth2.) -- dla atrybutu hasłem, należy podać SHA- 256 *nazwa użytkownika* : ERDDAP : *hasło* . Nazwa użytkownika i " ERDDAP "są używane do solenia wartości haszu, co utrudnia odkodowanie.
        * W systemie Windows można wygenerować wartości digest hasła MD5 poprzez pobranie programu MD5 (takie jak [MD5](https://www.fourmilab.ch/md5/) ) i używanie (na przykład) :
dd5-djsmith: ERDDAP : *actualPassword* 
        * Na Linuksie / Uniksie możesz wygenerować wartości DD5, używając programu built- in md5sum (na przykład) :
echo -n "jsmith: ERDDAP : *actualPassword* " | dd5sum
        * Przechowywane hasła tekstowe są wrażliwe na przypadki. Przechowywane formularze haseł MD5 i UEPMD5 nie są wrażliwe na przypadki.
        * Na przykład (przy użyciu UEPMD5) , jeśli nazwa użytkownika = "jsmith" i hasło = "myHasło",&lt;użytkownik &gt; tag jest:
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
gdzie zapisane hasło zostało wygenerowane z
dd5-djsmith: ERDDAP : myHasło
        * role to oddzielona comma- lista ról, dla których użytkownik jest upoważniony. Każdy&lt;zbiór danych &gt; może mieć [&lt;accessibleTo &gt;] (# accessibleto) tag, który wymienia role, które są dopuszczone do dostępu do tego zbioru danych. Dla danego użytkownika i danego zbioru danych, jeżeli jedna z ról na liście ról użytkownika pasuje do jednej z ról na liście zbiorów danych&lt;accessibleTo &gt; role, wtedy użytkownik jest upoważniony do dostępu do tego zbioru danych.
            
Każdy użytkownik, który loguje się automatycznie otrzymuje rolę \\[ anyoneLogged W \\] , czy istnieje&lt;użytkownik &gt; tag dla nich w datasets.xml Albo i nie. Więc jeśli dany zbiór danych ma
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
następnie każdy użytkownik, który jest zalogowany będzie uprawniony do dostępu do tego zbioru danych, nawet jeśli nie ma&lt;użytkownik &gt; tag dla nich w datasets.xml .
            
    * Wszelkie zmiany wartości tego znacznika będą skuteczne następnym razem ERDDAP™ odczyt datasets.xml , w tym w odpowiedzi na zbiór danych [bandera](/docs/server-admin/additional-information#flag) .
         
### &lt;pathRegex & gt;{#pathregex} 
* [ ** &lt;pathRegex &gt; ** ] (# pathregex) pozwala określić wyrażenie regularne, które ogranicza które ścieżki (które podkatalogi) zostaną włączone do zbioru danych. Domyślnie jest.\\ *, który pasuje do wszystkich ścieżek. Jest to rzadko używane, rzadko potrzebne, OPTIONAL tag dla EDDGrid Zestawy danych FromFiles, EDDTableFromFiles oraz kilka innych typów zbiorów danych. Jednakże, kiedy tego potrzebujesz, naprawdę tego potrzebujesz.
    
Aby to zadziałało, musisz być naprawdę dobry w wyrażeniach regularnych. Widzisz to? [dokumentacja regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) oraz [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) . W szczególności, musisz wiedzieć o grupach przechwytywania (coś wewnątrz nawiasów) oraz "lub" symbol " | ".
Razem pozwalają określić dowolną liczbę opcji, np.: (option1 | opcja2 | opcja3) .
Ponadto, każda z opcji może być niczym, np., ( | opcja2 | opcja3) .
Ponadto należy wiedzieć, że grupy wychwytywania mogą być zagnieżdżone, tzn. każda opcja w grupie wychwytywania może zawierać inną grupę wychwytywania, np.: ( | opcja2 ( | opcja2 b | option2c)  | opcja3) co mówi, że po opcji2 nie może być nic, option2b, option2c.
Dla pathRegexes każda opcja będzie jedną nazwą folderu, po której następuje a /, np. bar /.
    
Trudna część pathRegex jest: Kiedy ERDDAP™ rekursywnie schodzi z drzewa katalogów, pathRegex musi zaakceptować wszystkie ścieżki napotkane w drodze do katalogów z danymi. Regex z zagnieżdżonymi grupami to dobry sposób, by sobie z tym poradzić.
    
Przykład:
Załóżmy, że mamy następującą strukturę katalogową:
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
i określony fileDirectory jest / foo / bar /, i chcemy po prostu .nc pliki w D \\[ 0- 9 \\] &#123;4&#125; / a / podkatalogi.
Rozwiązaniem jest ustawienie pathRegex na / foo / bar / ( | D \\[ 0- 9 \\] &#123;4&#125; / ( | a /) )   
To mówi:
Ścieżka musi zacząć się od / foo / bar /
Po którym może nastąpić nic lub D \\[ 0- 9 \\] &#123;4&#125; /
Po którym może nastąpić nic lub
    
Tak, pathRegex może być niezwykle trudny do sformułowania. Jeśli utkniesz, zapytaj programistę. (Najbliższa rzecz w prawdziwym świecie do czarnoksiężnika mówiącego zaklęcia?) lub wysłać e-mail do Chrisa. John w Noah.
    
### &lt;zestaw danych & gt;{#dataset} 
* [ ** &lt;zbiór danych &gt; ** ] (# dataset) jest opcjonalny (ale zawsze używane) tag wewnątrz&lt;erddapDatasets &gt; tag in datasets.xml że (jeśli zawierają wszystkie informacje między&lt;zbiór danych &gt; oraz&lt;/ dataset &gt;) całkowicie opisuje jeden zestaw danych. Na przykład:
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
MOŻNA być wiele znaczników zbioru danych w Twoim datasets.xml plik.
Trzy atrybuty MOŻE pojawić się w&lt;dataset &gt; tag:
     
    *    **typ = " *a Rodzaj* "** jest atrybutem WYMAGANYM w obrębie&lt;dataset &gt; tag in datasets.xml który identyfikuje typ zbioru danych (na przykład, czy jest to EDDGrid / gridded or EDDTable / tabular dataset) oraz źródło danych (na przykład baza danych, pliki lub pilot OPeNDAP serwer) . Patrz [ **Lista typów danych** ](#list-of-types-datasets) .
         
#### zbiór danych Id{#datasetid} 
*    [ ** datasetID = " *aDatasetID* "** ](#datasetid) jest atrybutem WYMAGANYM w obrębie&lt;dataset &gt; tag, który przypisuje krótki (zazwyczaj&lt;15 znaków), unikalny, identyfikujący nazwę zbioru danych.
    * W datasetID Musi być list (A- Z, a- z) po której następuje liczba A- Z, a- z, 0- 9 i\\ _ (ale najlepiej jeśli&lt;32 znaki łącznie).
    * Zestaw danych Identyfikatory są wrażliwe, ale nie tworzą dwóch datasetID s, które różnią się tylko literami górnymi / małymi. To spowoduje problemy na komputerach Windows (Twój i / lub komputer użytkownika) .
    * Najlepsze praktyki: Zalecamy użycie [wielbłąd Przypadek](https://en.wikipedia.org/wiki/CamelCase) .
    * Najlepsze praktyki: Zalecamy, aby pierwsza część była skrótem lub skrótem nazwy instytucji źródłowej, a druga skrótem nazwy zbioru danych. Gdy to możliwe, tworzymy nazwę, która odzwierciedla nazwę źródła dla zbioru danych. Na przykład, użyliśmy datasetID = "erdPH sst a8day "dla zbioru danych z NOAA   NMFS   SWFSC Dział Badań nad Środowiskiem ( ERD ) która jest wyznaczona przez źródło jako satelita / PH / sst a / 8 dnia.
    * Jeśli zmienisz nazwę zbioru danych, stary zbiór danych (ze starą nazwą) będzie nadal żyć w ERDDAP . Jest to zbiór danych "sierot", ponieważ specyfikacja dla niego w datasets.xml Już go nie ma. Należy się tym zająć:
        1. Dla ERDDAP™ V2.19 i później, nie musisz nic robić. ERDDAP™ automatycznie usunie te zbiory danych osieroconych.
        2. Dla ERDDAP™ v2.18 i wcześniej należy zrobić coś, aby usunąć zbiory danych osieroconych: Dodać aktywny = "false" dataset, np.,
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
Po następnym dużym ładunku Zestawy danych, Możesz usunąć ten znacznik po tym, jak stary zbiór danych jest nieaktywny.
                 
#### aktywny{#active} 
*    [ **aktywny = " *boolean* "** ](#active) jest atrybutem optycznym w obrębie&lt;dataset &gt; tag in datasets.xml który wskazuje, czy zbiór danych jest aktywny (kwalifikuje się do wykorzystania w ERDDAP ) Albo i nie.
    * Ważne wartości są prawdziwe (domyślny) i fałszywe.
    * Ponieważ wartość domyślna jest prawdziwa, nie musisz używać tego atrybutu dopóki nie chcesz tymczasowo lub trwale usunąć tego zbioru danych z ERDDAP .
    * Jeśli po prostu usunąć aktywny = "true" dataset z datasets.xml , zbiór danych będzie nadal aktywny w ERDDAP™ ale nigdy nie będzie uaktualniony. Taki zbiór danych będzie "sierotą" i będzie wymieniony jako taki w statusie. html strona internetowa tuż poniżej listy zbiorów danych, które nie udało się załadować.
    * Jeśli ustawisz active = "false", ERDDAP™ dezaktywuje zbiór danych następnym razem, gdy spróbuje zaktualizować zbiór danych. Kiedy to robisz, ERDDAP™ nie wyrzuca żadnych informacji, które mógł przechowywać o zbiorze danych i na pewno nie robi nic z prawdziwymi danymi.
    * W celu usunięcia zbioru danych z ERDDAP™ , see [Wymuś usunięcie zbioru danych](/docs/server-admin/additional-information#removing-datasets) .
         

 ** Kilka tagów może pojawić się między&lt;zbiór danych &gt; oraz&lt;/ dataset &gt; tagi. **   
Istnieją pewne różnice, w których znaczniki są dozwolone, przez które rodzaje zbiorów danych. Zob. dokumentacja dotycząca konkretnego [rodzaj zbioru danych](#list-of-types-datasets) szczegóły.

#### &lt;dostępne Do & gt;{#accessibleto} 
* [ ** &lt;dostępne Do &gt; ** ] (# accessibleto) jest znacznikiem optycznym w obrębie&lt;dataset &gt; tag, który określa oddzieloną od comma- listę [role](#user) które mają dostęp do tego zbioru danych. Na przykład:
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * To część ERDDAP jest [system bezpieczeństwa](/docs/server-admin/additional-information#security) za ograniczenie dostępu do niektórych zbiorów danych do niektórych użytkowników.
    * Jeśli ten znacznik nie jest obecny, wszyscy użytkownicy (nawet jeśli się nie zalogowali) będzie miał dostęp do tego zbioru danych.
    * Jeśli ten znacznik jest obecny, ten zestaw danych będzie widoczny i dostępny tylko dla użytkowników, którzy mają jedną z określonych ról. Ten zbiór danych nie będzie widoczny dla użytkowników, którzy nie są zalogowani.
    * Każdy użytkownik, który loguje się automatycznie otrzymuje rolę \\[ anyoneLogged W \\] , czy istnieje&lt;użytkownik &gt; tag dla nich w datasets.xml Albo i nie. Więc jeśli dany zbiór danych ma
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
następnie każdy użytkownik, który jest zalogowany będzie uprawniony do dostępu do tego zbioru danych, nawet jeśli nie ma&lt;użytkownik &gt; tag dla nich w datasets.xml .
         
#### &lt;graphsAccessibleTo & gt;{#graphsaccessibleto} 
* [ ** &lt;graphsAccessibleTo &gt; ** ] (# grapsaccessibleto) jest znacznikiem optycznym w obrębie&lt;dataset &gt; tag in datasets.xml która określa, czy grafika i metadane dla zbioru danych są dostępne publicznie. Oferuje sposób częściowego obejścia zbioru danych [&lt;accessibleTo &gt;] (# accessibleto) ustawienie. Dozwolone wartości to:
    * auto... Wartość ta (lub brak&lt;graphsAccessibleTo &gt; tag dla zbioru danych) sprawia, że dostęp do wykresów i metadanych z zbioru danych naśladuje zbiór danych&lt;accessibleTo &gt; setting.
Więc jeśli zbiór danych jest prywatny, jego wykresy i metadane będą prywatne.
A jeśli zbiór danych jest publiczny, jego wykresy i metadane będą publiczne.
    * publiczne -- To ustawienie sprawia, że wykresy i metadane zbioru danych są dostępne dla każdego, nawet użytkowników, którzy nie są zalogowani, nawet jeśli zbiór danych jest inaczej prywatny, ponieważ ma&lt;accessibleTo &gt; tag.
         
#### &lt;dostępne ViaFiles & gt;{#accessibleviafiles} 
* [ ** &lt;accessibleViaFiles &gt; ** ] (# accessibleviafiles) jest znacznikiem optycznym w obrębie&lt;dataset &gt; tag in datasets.xml zamiast [ EDDGrid AgregateExistingDimension](#eddgridaggregateexistingdimension) , [ EDDGrid Kopiuj](#eddgridcopy) , [ EDDGrid Tabela FromEDDTable](#eddgridfromeddtable) , [ EDDGrid FromErddap](#eddfromerddap) , [ EDDGrid FromEtopo](#eddgridfrometopo) , [ EDDGrid Pliki FromFiles](#eddgridfromfiles)   (w tym wszystkie podklasy) , [ EDDGrid SideBySide](#eddgridsidebyside) , [EDDTableCopy](#eddtablecopy)   [EDDTableFromErddap](#eddfromerddap) , [Tabela EDDFrom EDDGrid ](#eddtablefromeddgrid) oraz [Pliki EDDTableFromFiles](#eddtablefromfiles)   (w tym wszystkie podklasy) zestawów danych. Może mieć wartość prawdziwą lub fałszywą. Na przykład:
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
Jeśli wartość jest prawdziwa, ERDDAP™ sprawi, że użytkownicy będą mogli przeglądać i pobierać pliki źródłowe zbioru danych poprzez ERDDAP jest [ "files" system](https://coastwatch.pfeg.noaa.gov/erddap/files/) . Patrz "files" system [dokumentacja](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) więcej informacji.
    
Wartość domyślna&lt;accessibleViaFiles &gt; pochodzi z&lt;defaultAccessibleViaFiles &gt; w [setup.xml](/docs/server-admin/deploy-install#setupxml) . Ma domyślną wartość false, ale zalecamy dodanie tego znacznika do setup.xml z wartością true.
    
Zalecenie... Zalecamy udostępnienie wszystkich odpowiednich zbiorów danych przez system plików poprzez ustawienie&lt;defaultAccessibleViaFiles &gt; do true in setup.xml ponieważ istnieje grupa użytkowników, dla których jest to preferowany sposób uzyskania danych. Między innymi, "files" system ułatwia użytkownikom sprawdzenie, które pliki są dostępne i kiedy ostatnio się zmieniały, co ułatwia użytkownikowi utrzymanie własnej kopii całego zbioru danych. Jeśli na ogół nie chcesz, aby dane były dostępne przez system plików, ustaw&lt;defaultAccessibleViaFiles &gt; do false. W każdym przypadku należy po prostu użyć&lt;accessibleViaFiles &gt; dla kilku zbiorów danych, które są wyjątkami od ogólnej polityki określonej przez&lt;defaultAccessibleViaFiles &gt; (na przykład, gdy zbiór danych wykorzystuje [ .nc ml](#ncml-files) pliki, które nie są naprawdę przydatne dla użytkowników) .
     
#### &lt;dostępne Via WMS & gt;{#accessibleviawms} 
* [ ** &lt;dostępne Via WMS &gt; ** ] (# accessibleviawms) jest znacznikiem optycznym w obrębie&lt;dataset &gt; tag in datasets.xml dla wszystkich [ EDDGrid ](#eddgrid) Podklasy. Może mieć wartość prawdy. (domyślny) albo fałszywe. Na przykład:
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
Jeśli wartość jest fałszywa, ERDDAP jest WMS serwer nie będzie dostępny dla tego zbioru danych. Jest to powszechnie stosowane w przypadku zbiorów danych o pewnych wartościach długości geograficznej powyżej 180 (który technicznie jest nieważny dla WMS usługi) , i dla których oferujesz również wariant zbioru danych o wartościach długości całkowitej w zakresie -180 do 180 przez [ EDDGrid LonPM180](#eddgridlonpm180) .
Jeśli wartość jest prawdziwa, ERDDAP™ spróbuje udostępnić zbiór danych za pośrednictwem ERDDAP jest WMS serwer. Ale jeśli zestaw danych jest całkowicie nieodpowiedni dla WMS   (np. brak danych dotyczących długości lub szerokości geograficznej) , wtedy zbiór danych nie będzie dostępny poprzez ERDDAP jest WMS serwer, niezależnie od tego ustawienia.
     
#### &lt;dodaj Zmienne Gdzie & gt;{#addvariableswhere} 
* [&lt;addVarieblesWhere &gt;] (# addvariableswhere) jest znacznikiem optycznym w obrębie&lt;dataset &gt; tag dla wszystkich zbiorów danych EDDTable.
    
Wnioski do dowolnego zbioru danych EDDTable mogą zawierać & dodać Zmienne Gdzie (" *atrybut Nazwa* "," *atrybut Wartość* ") , który mówi ERDDAP™ aby dodać wszystkie zmienne w zbiorze danych *AssioneName = AssioneValue* do listy wymaganych zmiennych. Na przykład, jeśli użytkownik dodaje & dodać Zmienne Gdzie (" ioos\\_category "," Wind ") do zapytania, ERDDAP będzie dodać wszystkie zmienne w zbiorze danych, które mają ioos\\_category = Atrybut wiatru do listy wymaganych zmiennych (na przykład, windSpeed, windDirection, windGustSpeed) . *atrybut Nazwa* oraz *atrybut Wartość* są wrażliwe na przypadek.
    
W datasets.xml , jeśli fragment dataset.xml dla zbioru danych ma
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
na przykład:
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
Formularz dostępu do danych (Strona internetowa .html) dla zbioru danych będzie zawierać widget (dla każdego atrybutu Nazwa na liście oddzielonej od comma-) zaraz poniżej listy zmiennych, które pozwalają użytkownikom określić wartość atrybutu. Jeśli użytkownik wybierze wartość atrybutu dla jednej lub kilku nazw atrybutów, zostaną one dodane do żądania poprzez & dodać Zmienne Gdzie (" *atrybut Nazwa* "," *atrybut Wartość* ") . Tak więc, ten znacznik w datasets.xml pozwala określić listę nazw atrybutów, które pojawią się w formularzu dostępu do danych dla tego zbioru danych i ułatwia użytkownikom dodawanie & addVariables W przypadku gdy działa na wniosek. W *AssioneNamesCSV* Lista jest delikatna.
    
#### &lt;altitudeMetersPerSourceUnit & gt;{#altitudemeterspersourceunit} 
* [ ** &lt;altitudeMetersPerSourceUnit &gt; ** ] (# altitude demeterspersourceunit) jest znacznikiem optycznym w obrębie&lt;dataset &gt; tag w zbiorach danych. xxml dla EDDTableFrom SOS zbiory danych (Tylko&#33;) która określa liczbę pomnożoną przez wysokość źródłową lub wartości głębokości w celu przekształcenia ich w wartości wysokości (w metrach nad poziomem morza) . Na przykład:
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
Ten znacznik MUSI być stosowany, jeśli wartość osi pionowej zbioru danych nie są licznikami, dodatnie = w górę. W przeciwnym razie jest to opcja optyczna, ponieważ wartość domyślna wynosi 1. Na przykład:
    * Jeżeli źródło jest już mierzone w metrach nad poziomem morza, należy użyć 1 (lub nie używać tego znacznika, ponieważ 1 jest wartością domyślną) .
    * Jeżeli źródło jest mierzone w metrach poniżej poziomu morza, należy użyć -1.
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * Jeżeli źródło mierzone jest w km nad poziomem morza, należy użyć 0,001.
         
#### &lt;defaultDataQuery & gt;{#defaultdataquery} 
* [ ** &lt;defaultDataQuery &gt; ** ] (# defaultdataquery) jest znacznikiem optycznym w obrębie&lt;dataset &gt; tag in datasets.xml To mówi ERDDAP™ używać określonego zapytania (część URL po "?") jeśli plik .html Rodzaj (Formularz dostępu do danych) jest wymagane bez zapytania.
    * Prawdopodobnie rzadko będzie to konieczne.
    * Potrzebujesz kodu XML- encode (nie encode) domyślne zapytania, ponieważ znajdują się w dokumencie XML. Na przykład, i staje się & amp;,&lt;staje się&lt;, &gt; staje się & gt;.
    * Proszę sprawdzić swoją pracę. Łatwo jest popełnić błąd i nie dostać tego, czego się chce. ERDDAP™ będzie próbował oczyścić swoje błędy -- ale nie polegać na tym, ponieważ\\*jak\\*może ulec zmianie.
    * W przypadku zbiorów danych griddap powszechnym zastosowaniem jest określenie innej wartości domyślnej głębokości lub wysokości (na przykład: \\[ 0 \\] zamiast \\[ ostatni \\] ) .
W każdym razie należy zawsze wymienić wszystkie zmienne, zawsze używać tych samych wartości wymiarów dla wszystkich zmiennych i prawie zawsze używać \\[ 0 \\] , \\[ ostatni \\] lub \\[ 0: ostatni \\] dla wartości wymiarów.
Na przykład:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * Dla tabledap Jeśli nie podasz żadnych ograniczeń, żądanie zwróci cały zestaw danych, który może być niepraktycznie duży, w zależności od zestawu danych. Jeśli nie chcesz określić żadnych ograniczeń, zamiast mieć puste&lt;defaultDataQuery &gt; (który jest taki sam jak brak określenia wartości domyślnej DataQuery) , musisz wyraźnie wymienić wszystkie zmienne, które chcesz włączyć do defaultDataQuery.
    * Dla tabledap zbiory danych, najczęściej używane jest do określenia innego domyślnego zakresu czasowego (w stosunku do maks. (czas) , na przykład, & time &gt; = max (czas) -1 dzień, lub względem teraz, na przykład, & czas &gt; = now- 1 dzień) .
Pamiętaj, że żądanie braku zmiennych danych jest takie samo jak podanie wszystkich zmiennych danych, więc zazwyczaj możesz po prostu podać nowe ograniczenie czasowe.
Na przykład:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
lub
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;defaultGraphQuery & gt;{#defaultgraphquery} 
* [ ** &lt;defaultGraphQuery &gt; ** ] (# defaultgraphquery) jest znacznikiem optycznym w obrębie&lt;dataset &gt; tag in datasets.xml To mówi ERDDAP™ używać określonego zapytania (część URL po "?") jeśli plik .graph Rodzaj (Formularz Make A Graph) jest wymagane bez zapytania.
    * Prawdopodobnie rzadko będzie to konieczne.
    * Potrzebujesz kodu XML- encode (nie encode) domyślne zapytania, ponieważ znajdują się w dokumencie XML. Na przykład, i staje się & amp;,&lt;staje się&lt;, &gt; staje się & gt;.
    * Proszę sprawdzić swoją pracę. Łatwo jest popełnić błąd i nie dostać tego, czego się chce. ERDDAP™ będzie próbował oczyścić swoje błędy -- ale nie polegać na tym, ponieważ\\*jak\\*może ulec zmianie.
    * W przypadku zbiorów danych griddap najpowszechniejszym zastosowaniem jest określenie innej wartości domyślnej głębokości lub wysokości (na przykład: \\[ 0 \\] zamiast \\[ ostatni \\] ) i / lub w celu określenia, że określona zmienna jest graficzna.
W każdym razie, będziesz prawie zawsze używać \\[ 0 \\] , \\[ ostatni \\] lub \\[ 0: ostatni \\] dla wartości wymiarów.
Na przykład:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (ale postaw wszystko na jednej linii) 
    * Dla tabledap Zestawy danych, jeśli nie podasz żadnych ograniczeń, to żądanie wyrysuje cały zestaw danych, który może zająć dużo czasu, w zależności od zestawu danych.
    * Dla tabledap zbiory danych, najczęściej używane jest do określenia innego domyślnego zakresu czasowego (w stosunku do maks. (czas) , na przykład, & time &gt; = max (czas) -1 dzień, lub względem teraz, na przykład, & czas &gt; = now- 1 dzień) .
Pamiętaj, że żądanie braku zmiennych danych jest takie samo jak podanie wszystkich zmiennych danych, więc zazwyczaj możesz po prostu podać nowe ograniczenie czasowe.
Na przykład:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
lub
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;dimensionValuesInMemory & gt;{#dimensionvaluesinmemory} 
* [ ** &lt;wymiar ValuesInMemory &gt; ** ] (# dimensionvalues in memory)   (prawda (domyślny) lub false) jest optyczny i rzadko używany znacznik wewnątrz&lt;dataset &gt; tag dla dowolnego EDDGrid zestaw danych, który mówi ERDDAP™ gdzie zachować wartości źródłowe wymiarów (znany również jako axisVariable s) :
    
    * true = w pamięci (który jest szybszy, ale wykorzystuje więcej pamięci) 
    * false = na dysku (która jest wolniejsza, ale nie używa pamięci) 
    
Na przykład:
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
Należy używać tego tylko z niedomyślną wartością false jeśli ERDDAP™ posiada wiele zbiorów danych o bardzo dużych wymiarach (np. miliony wartości, np. w EDDGrid Zestawy plików FromAudioFiles) oraz ERDDAP Używanie pamięci jest zawsze za wysokie. Patrz Pamięć: obecnie przy użyciu linii \\[ Twoja domena \\]  /erddap/status.html do monitorowania ERDDAP™ wykorzystanie pamięci.
     
#### &lt;fileTableInMemory & gt;{#filetableinmemory} 
* [ ** &lt;FileTableInMemory &gt; ** ] (# filetableinmemory)   (true or false (domyślny) ) jest znacznikiem optycznym w obrębie&lt;dataset &gt; tag dla dowolnego EDDGrid Pliki FromFiles i EDDTable Zestaw danych FromFiles, który mówi ERDDAP™ gdzie przechowywać tabelę plików (który posiada informacje o każdym pliku danych źródłowych) :
    
    * true = w pamięci (który jest szybszy, ale wykorzystuje więcej pamięci) 
    * false = na dysku (która jest wolniejsza, ale nie używa pamięci) 
    
Na przykład:
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
Jeśli ustawisz to na true dla dowolnego zbioru danych, miej oko na Pamięć: aktualnie przy użyciu linii \\[ Twoja domena \\]  /erddap/status.html zapewnienie, że ERDDAP™ Nadal ma mnóstwo pamięci.
     
#### &lt;fgdcFile & gt;{#fgdcfile} 
* [ ** &lt;fgdcFile &gt; ** ] (# fgdcfile) jest znacznikiem optycznym w obrębie&lt;dataset &gt; tag in datasets.xml To mówi ERDDAP™ korzystanie z wcześniej wytworzonego pliku FGDC zamiast ERDDAP™ Spróbuj wygenerować plik. Zastosowanie:
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *pełna Nazwa pliku* może odnosić się do pliku lokalnego (gdzieś w systemie plików serwera) lub URL zdalnego pliku.
Jeśli *pełna Nazwa pliku* \\ = "" lub plik nie zostanie znaleziony, zbiór danych nie będzie miał żadnych metadanych FGDC. Jest to również przydatne, jeśli chcesz zahamować metadane FGDC dla określonego zbioru danych.
Albo, można umieścić&lt;fgdcActive &gt; false&lt;/ fgdcActive &gt; in setup.xml to tell ERDDAP™ nie oferować metadanych FGDC dla żadnego zbioru danych.
     
#### &lt;iso19115 Plik & gt;{#iso19115file} 
* [ ** &lt;iso19115Plik &gt; ** ] (# iso19115file) jest znacznikiem optycznym w obrębie&lt;dataset &gt; tag in datasets.xml To mówi ERDDAP™ używać wcześniej wykonanego pliku ISO 19115 zamiast ERDDAP™ Spróbuj wygenerować plik. Zastosowanie:
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *pełna Nazwa pliku* może odnosić się do pliku lokalnego (gdzieś w systemie plików serwera) lub URL zdalnego pliku.
Jeśli *pełna Nazwa pliku* \\ = "" lub plik nie zostanie znaleziony, zbiór danych nie będzie miał metadanych ISO 19115. Jest to również przydatne, jeśli chcesz zahamować metadane ISO 19115 dla określonego zbioru danych.
Albo, można umieścić&lt;iso19115Active &gt; false&lt;/ iso19115Aktywny &gt; w setup.xml powiedzieć ERDDAP™ nie oferować metadanych ISO 19115 dla żadnego zbioru danych.
     
#### &lt;matchAxis NDigits & gt;{#matchaxisndigits} 
* [ ** &lt;matchAxisNDigits &gt; ** ] (# matchaxisnnumers) jest znacznikiem optycznym w obrębie EDDGrid  &lt;dataset &gt; tag for EDDGrid zbiory danych stanowiące agregacje, np. agregacje plików. Za każdym razem, gdy zestaw danych jest przeładowany, ERDDAP™ sprawdza, czy wartości osi każdego składnika agregacji są takie same. Precyzja badania jest określona przez [matchAxisNDigits](#matchaxisndigits) , która określa całkowitą liczbę cyfr, które muszą pasować podczas badania wartości osi podwójnej precyzji, 0 - 18 (domyślny) . Podczas badania wartości osi zmiennoprzecinkowej, badanie przeprowadza się za pomocą matchAxisNDigits / 2 cyfry. Wartość 18 lub wyższa mówi EDDGrid zrobić dokładny test. Wartość 0 mówi EDDGrid nie przeprowadzać żadnych badań, które nie są zalecane, z wyjątkiem opisanych poniżej.
    
Chociaż EDDGrid pozwala składnikom agregacji na nieco odmienne wartości osi, tylko jeden zestaw wartości osi jest pokazywany użytkownikowi. Zestaw pochodzi z tego samego składnika, który dostarcza metadane źródłowe zbioru danych. Na przykład: EDDGrid Zestawy danych FromFiles, które są określone przez&lt;metadataFrom &gt; setting (domyślny = ostatni) .
    
Używanie matchAxisNDigits\\ = 0 jest w większości przypadków mocno zniechęcone, ponieważ wyłącza wszystkie kontrole. Nawet minimalne sprawdzenie jest przydatne, ponieważ zapewnia, że składniki są odpowiednie do agregacji. Wszyscy zakładamy, że wszystkie składniki są odpowiednie, ale nie zawsze tak jest. Jest to zatem ważny test na zdrowie psychiczne. Nawet wartości matchAxisNDigits1, 2, 3 lub 4 są zniechęcane, ponieważ różne wartości osi często wskazują, że składniki zostały utworzone (Przykuty?) w inny sposób, a zatem nie nadają się do agregacji.
    
Jest jeden przypadek, w którym użycie matchAxisNDigits\\ = 0 jest przydatne i zalecane: z agregacją zdalnych plików, np. danych w wiadrach S3. W tym przypadku, jeśli zestaw danych używa cacheFromUrl, cacheSizeGB, matchAxisNDigits\\ = 0, i EDDGrid System plików FromFiles dla [Agregacja poprzez Nazwy plików](#aggregation-via-file-names-or-global-metadata) Więc... EDDGrid nie musi czytać wszystkich zdalnych plików, aby dokonać agregacji. Pozwala to na bardzo szybkie załadowanie zbiorów danych wykonanych z danych w wiadrach S3 (w przeciwieństwie do absurdalnie powoli, jeśli EDDGrid musi pobrać i przeczytać wszystkie pliki) .
    
#### &lt;nThreads & gt;{#nthreads} 
* Począwszy od ERDDAP™ wersja 2.00, jeżeli jakakolwiek podklasa plików EDDTableFromFiles lub EDDGrid odczytuje dane ze swojego źródła, może odczytać jeden kawałek danych (np. jeden plik źródłowy) w czasie (w jednej nitce)   (to jest domyślne) lub więcej niż jeden kawałek danych (np., 2 + pliki źródłowe) w czasie (w 2 lub więcej wątkach) podczas rozpatrywania każdego wniosku.
     
    * Zasada Thumba:
Dla większości zbiorów danych w większości systemów, użyj nThreads = 1, domyślnie. Jeśli masz potężny komputer (dużo rdzeni procesora, dużo pamięci) , następnie rozważyć ustawienie nThreads na 2, 3, 4 lub wyżej (ale nigdy więcej niż liczba rdzeni procesora w komputerze) dla zbiorów danych, które mogłyby przynieść korzyści:
        
        * Większość zbiorów danych EDDTableFromFiles skorzysta.
        * Dane, w których coś powoduje opóźnienie zanim część danych może być rzeczywiście przetwarzana, będą korzystne, na przykład:
            * Zestawy danych z [zewnętrznie skompresowane (np., .gz ) ](#externally-compressed-files) binarne (np., .nc ) pliki, ponieważ ERDDAP™ musi zdekompresować cały plik zanim zacznie odczytywać plik.
            * Używane zestawy danych [cacheSizeGB](#cachefromurl) , ponieważ ERDDAP™ często musi pobrać plik zanim go odczyta.
            * Zestawy danych z plikami danych przechowywanymi w systemie plików równoległych o dużej przepustowości, ponieważ może dostarczyć więcej danych, szybciej, na żądanie. Przykłady równoległych systemów plików to: [JBOD](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures) , [pNFS](http://www.pnfs.com/) , [GlusterFS](https://en.wikipedia.org/wiki/Gluster) Amazon S3 i Google Cloud Storage.
                 
        
Ostrzeżenie: Przy użyciu nThreads &gt; 1, miej oko na ERDDAP wykorzystanie pamięci, wykorzystanie nici i ogólna reakcja (patrz [ ERDDAP strona statusu](/docs/server-admin/additional-information#status-page) ) . Zob. uwagi dotyczące tych kwestii poniżej.
         
    * Dla danego zbioru danych, to ustawienie nThreads może pochodzić z różnych miejsc:
        
        * Jeśli datasets.xml kawałek na zestaw danych ma&lt;nThreads &gt; tag (w obrębie&lt;dataset &gt; tag, nie jako atrybut globalny) o wartości &gt; = 1, ta wartość nTreads jest używana. Możesz więc podać inną liczbę dla każdego zbioru danych.
        * W przeciwnym razie, jeśli datasets.xml ma&lt;nTableThreads &gt; tag (dla tabeli EDD Zestawy danych FromFiles) lub&lt;nGridThreads &gt; tag (zamiast EDDGrid zbiory danych) o wartości &gt; = 1, poza&lt;dataset &gt; tag, że wartość nThreads jest używany.
        * W przeciwnym razie stosuje się 1 nitkę, co jest bezpiecznym wyborem, ponieważ wykorzystuje najmniejszą ilość pamięci.
             
        
Dla [oryginał ERDDAP™ instalacja](https://coastwatch.pfeg.noaa.gov/erddap/index.html) , używamy
        &lt;nTableThreads &gt; 6&lt;/ nTableThreads &gt; (To potężny serwer.) Trudne żądania zajmują teraz 30% poprzedniego czasu.
         
##### Monitorowanie wykorzystania zasobów{#monitor-resource-usage} 
Podczas eksperymentowania z różnymi ustawieniami nThreads (i być może zadawanie trudnych próśb ERDDAP ) , można monitorować wykorzystanie zasobów komputera:
* Na makach, użyj Finder: Aplikacje: Narzędzia: Monitor aktywności
* Na Linuksie użyj góry
* W systemie Windows 10, użyj *Ctrl + Shift + Esc* do otwarcia menedżera zadań
             
##### Ostrzeżenie: zmniejszenie odpowiedzi{#warning-decreased-responsiveness} 
W izolacji, ERDDAP™ będzie spełniać żądanie do zbioru danych z wyższym ustawionym nThreads szybciej niż jeśli nThreads = 1. Ale podczas gdy wniosek ten jest rozpatrywany, inne wnioski innych użytkowników będą nieco zatłoczone i uzyskać wolniejszą odpowiedź. Również, kiedy ERDDAP™ odpowiada na dane żądanie, inne zasoby obliczeniowe (np. dostęp do dysku, przepustowość sieci) może być ograniczenie, zwłaszcza z wyższych ustawień nTread. Tak więc przy wyższych ustawieniach nThreads ogólna responsibility systemu będzie gorsza, gdy zostanie rozpatrzone wiele wniosków - to może być bardzo irytujące dla użytkowników&#33; Z tego powodu: nigdy nie ustawia nThreads na więcej niż liczba rdzeni procesora w komputerze. nThreads = 1 jest najsprawiedliwszym ustawienie od każdego żądania (wśród kilku jednoczesnych wniosków) uzyska równy udział zasobów obliczeniowych. Ale im potężniejszy komputer, tym mniejszy będzie problem.
         
##### Ostrzeżenie: Wyższa pamięć Zastosowanie EDDGrid Zestawy danych{#warning-higher-memory-use-for-eddgrid-datasets} 
Wykorzystanie pamięci podczas przetwarzania żądań jest bezpośrednio proporcjonalne do ustawienia nThreads. Bezpieczną zasadą kciuka jest: musisz ustawić [ ERDDAP Ustawienia pamięci](/docs/server-admin/deploy-install#memory) do co najmniej 2 GB + (2GB\\ * nThreads) . Niektóre prośby do niektórych zbiorów danych będą wymagały więcej pamięci. Na przykład, ustawienie nThreads = 3 dla dowolnych EDDGrid zbiór danych oznacza, że ustawienie -Xmx powinno być co najmniej -Xmx8000M. Jeśli ustawienie pamięci jest większe niż 3 / 4 fizycznej pamięci komputera, należy zmniejszyć ustawienie nThreads tak, że można zmniejszyć ustawienie pamięci.

Zapotrzebowanie na potrzeby przetwarzania wątków do zbiorów danych EDDTable jest prawie zawsze niższe, ponieważ pliki są zwykle znacznie mniejsze. Jednak jeśli dany zbiór danych EDDTable ma ogromny (np. &gt; = 1 GB) pliki danych, a następnie uwagi powyżej będą miały zastosowanie również do tych zbiorów danych.

Niezależnie od ustawień nThreads, miej oko na statystyki korzystania z pamięci [ ERDDAP strona statusu](/docs/server-admin/additional-information#status-page) . Nie powinieneś nigdy zbliżać się do maksimum wykorzystania pamięci w ERDDAP ; w przeciwnym razie pojawią się poważne błędy i niepowodzenia.
        
##### Tymczasowo ustawić na 1{#temporarily-set-to-1} 
Jeśli aktualne wykorzystanie pamięci jest nawet nieznacznie wysokie, ERDDAP™ ustawi nThreads na 1. Tak więc, ERDDAP™ Oszczędza pamięć, gdy brakuje pamięci.
         
##### Zwraca diminishing{#diminishing-returns} 
Istnieją malejące zyski do zwiększenia ustawienia nThreads: 2 wątki będą o wiele lepsze niż 1 (Jeśli zignorujemy dynamiczne przeciążenie) . Ale 3 będzie tylko kawałkiem lepszym niż 2. A 4 będzie tylko nieznacznie lepsze niż 3.

W jednym teście trudnego pytania do dużego zbioru danych EDDTable, czas odpowiedzi przy użyciu 1, 2, 3, 4, 5, 6 wątków wynosił 38, 36, 20, 18, 13, 11 sekund. (Teraz używamy nTableThreads = 6 na tym serwerze.) 

nTreads = 2: Chociaż często istnieje znacząca korzyść z określenia nThreads = 2 zamiast nThreads = 1, często nie zrobi to dużej różnicy w czasie zegara potrzebnym do odpowiedzi na życzenie danego użytkownika. Powodem jest: z nThreads = 1, najbardziej nowoczesne CPU będzie często [dynamicznie nadzegar](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)   (turbo boost) tymczasowo zwiększyć prędkość zegara procesora. Tak więc z nThreads = 1, jeden rdzeń będzie często pracować z większą prędkością zegara niż każdy z dwóch rdzeni, jeśli używasz nThreads = 2. Niezależnie od tego, nadal uważamy, że lepiej jest używać nThreads = 2 niż nThreads = 1, ponieważ ustawienie to przyniesie lepsze rezultaty w szerszej różnorodności sytuacji. I oczywiście, jeśli Twój komputer ma wystarczające rdzenie procesora, jeszcze wyższe ustawienie nThreads powinno dać lepsze wyniki.

Jak wspomniano powyżej, bardzo wysokie ustawienia nThreads mogą prowadzić do szybszych odpowiedzi na niektóre wnioski, ale ryzyko ogólnego spadku ERDDAP™ responsibility and high memory use (jak zaznaczono powyżej) Podczas gdy te wnioski są rozpatrywane, to generalnie nie jest to dobry pomysł.
        
##### CPU Rdzenie{#cpu-cores} 
Nie powinieneś ustawiać nThreads na liczbę większą niż liczba rdzeni procesora w procesorze komputera. Zasadniczo wszystkie nowoczesne CPU mają wiele rdzeni (np. 2, 4 lub 8) . Niektóre komputery mają nawet wiele komputerów (np. 2 CPU\\ * 4 rdzenie / CPU = 8 rdzeni CPU) . Aby dowiedzieć się, ile procesorów i rdzeni komputer ma:

* Na maks, używać *Klucz opcji* : Menu Apple: Informacje systemowe
* Na Linuksie użyj cat / proc / cpuinfo
* W systemie Windows 10, użyj *Ctrl + Shift + Esc* do otwarcia Menedżer zadań: Wydajność (Logiczne procesory pokazują całkowitą liczbę rdzeni procesora) 

Tak, większość procesorów mówi, że obsługują 2 wątki na rdzeń (przez [hipergwintowanie](https://en.wikipedia.org/wiki/Hyper-threading) ) Ale te 2 wątki dzielą się zasobami obliczeniowymi, więc nie zobaczysz dwukrotnej przepustowości procesora pod dużym obciążeniem. Na przykład komputer z jednym procesorem z 4 rdzeniami może twierdzić, że obsługuje do 8 wątków, ale nigdy nie należy przekraczać nThreads = 4 w tym ERDDAP . Pamiętaj o tym:

* Ustawienie nThreads ERDDAP™ jest na życzenie. ERDDAP™ często obsługuje wiele wniosków jednocześnie.
*    ERDDAP™ robi rzeczy inne niż żądania procesowe, np. przeładowuje zbiory danych.
* Kiedy ERDDAP™ odpowiada na dane żądanie, inne zasoby obliczeniowe (np. dostęp do dysku, przepustowość sieci) mogą ograniczać. Im wyżej ustawisz nThreads, tym większe prawdopodobieństwo, że te inne zasoby zostaną ograniczone i spowolnią ERDDAP ogólnej reakcji.
* System operacyjny robi rzeczy inne niż uruchomić ERDDAP .

Najlepiej więc nie ustawiać ustawienia nThreads na więcej niż liczbę rdzeni w procesorze komputera.
         
##### Twój przebieg maja Vary (YMMV)  {#your-mileage-may-vary-ymmv} 
Wyniki różnych ustawień nThreads będą bardzo zróżnicowane dla różnych wniosków o różne zestawy danych w różnych systemach. Jeśli naprawdę chcesz poznać efekt różnych ustawień nThreads, wykonaj realistyczne testy.
         
##### Dlaczego nThreads na życzenie?{#why-nthreads-per-request} 
Słyszę, jak niektórzy z was myślą: "Dlaczego nThreads jest na życzenie? Gdybym to kodował, użyłbym jednej stałej puli nici pracownika i kolejki komunikacyjnej dla lepszej wydajności". Problem z użyciem jednej puli wątków i kolejki komunikacyjnej jest taki, że jedna trudna prośba zaleje kolejkę licznymi powolnymi zadaniami. To by skutecznie zablokowało ERDDAP™ od nawet rozpoczęcia prac nad zadaniami związanymi z innymi wnioskami do pierwotnego wniosku (zasadniczo) Skończone. Tak więc, nawet proste kolejne wnioski zareagowałyby bardzo powoli. ERDDAP wykorzystanie nThreads na żądanie prowadzi do bardziej sprawiedliwego wykorzystania zasobów obliczeniowych.
         
##### nThreads vs.{#nthreads-vs-multiple-worker-computers} 
Niestety, ERDDAP system nThreads nigdy nie będzie tak skuteczny jak prawdziwe równoległe za pośrednictwem wielu komputerów pracowniczych, przy czym każdy pracuje nad kawałkiem danych, w sposób, w jaki Hadoop lub Apache Spark są zazwyczaj używane. Kiedy zadanie jest naprawdę równoległe / dystrybuowane do wielu komputerów, każdy komputer może wykorzystać wszystkie swoje zasoby w swojej części zadania. Z ERDDAP system nThreads, każdy gwint konkuruje o przepustowość tego samego komputera, dyski, pamięć, itp. Niestety, większość z nas nie ma środków ani funduszy, by je założyć, ani nawet wynająć. (na Amazon Web Services (AWS) lub Google Cloud Platform (GCP) ) ogromne sieci komputerów. Ponadto, w przeciwieństwie do relacyjnej bazy danych, która może zwracać wiersze wyników w dowolnej kolejności, ERDDAP™ składa obietnicę zwrotu wierszy wyników w spójnym porządku. To ograniczenie sprawia, że ERDDAP implementacja nThreads jest mniej skuteczna. Ale... ERDDAP nThreads jest przydatny w wielu przypadkach.

Jednak są sposoby, aby ERDDAP™ skala do obsługi ogromnej liczby żądań szybko poprzez utworzenie [siatka / klaster / federacja ERDDAP s](/docs/server-admin/scaling) .
         
#### &lt;palety & gt;{#palettes} 
* Począwszy od ERDDAP™ wersja 2.12, datasets.xml może zawierać&lt;palety &gt; znacznik (wewnątrz&lt;erddapDatasets &gt;), który zastępuje&lt;palety &gt; wartość znacznika z messages.xml (lub powraca do wartości messages.xml jeśli znacznik w datasets.xml jest pusty) . Pozwala to na zmianę listy dostępnych palet podczas ERDDAP™ Ucieka. Pozwala również dokonać zmiany i mieć to utrzymuje, gdy zainstalować nową wersję ERDDAP .
OSTRZEŻENIE: Palety wymienione w datasets.xml musi być superzestawem palet wymienionych w messages.xml; ERDDAP™ będzie rzucać wyjątek i zaprzestać przetwarzania datasets.xml . Zapewnia to, że ERDDAP™ instalacje przynajmniej obsługują te same palety rdzenia.
OSTRZEŻENIE: ERDDAP™ sprawdza, czy pliki palet określone w messages.xml rzeczywiście istnieją, ale nie sprawdza plików palet wymienionych w datasets.xml . Twoim obowiązkiem jest zapewnienie obecności akt.
    
Również zaczynając od ERDDAP™ Wersja 2.12, jeśli wykonasz podkatalog cptfiles w ERDDAP™ katalog treści, ERDDAP™ skopiuje wszystkie pliki\\ * .cpt w tym katalogu do \\[ tomcat \\] / webapps / erddap / WEB- INF / cptfiles za każdym razem ERDDAP™ Zaczyna się. Tak więc, jeśli wstawisz własne pliki cpt do tego katalogu, te pliki będą używane przez ERDDAP™ , bez dodatkowego wysiłku z Twojej strony, nawet jeśli zainstalować nową wersję ERDDAP .
    
UWAGA: Jeśli dodasz niestandardowe palety do swojego ERDDAP™ i masz EDDGrid FromaErddap i / lub EDDTableFromErddap w zestawach danych ERDDAP™ , następnie użytkownicy będą zobaczyć własne opcje palety na ERDDAP™ Zrób stronę Wykres, ale jeśli użytkownik spróbuje jej użyć, otrzyma wykres z domyślną (zwykle tęcza) Palette. To dlatego, że obraz jest wykonany przez pilota ERDDAP™ który nie ma palety na zamówienie. Jedynym rozwiązaniem jest teraz wysłać e-mail do pilota ERDDAP™ administrator do dodawania własnych palet do jego / jej ERDDAP lub e-mail do Chrisa. John na Noaa.gov poprosić, aby palety zostały dodane do standardu ERDDAP™ dystrybucji.
    
#### &lt;onChange & gt;{#onchange} 
* [ ** &lt;onChange &gt; ** ] (# onchange) jest znacznikiem optycznym w obrębie&lt;dataset &gt; tag in datasets.xml który określa działanie, które zostanie wykonane przy tworzeniu tego zbioru danych (kiedy ERDDAP™ jest ponownie uruchomiony) i kiedy ten zbiór danych zmienia się w jakikolwiek sposób.
    * Obecnie EDDGrid podklasy, wszelkie zmiany metadanych lub zmiennej osiowej (Na przykład, nowy punkt czasowy dla danych w czasie bliskim-rzeczywistym) jest uważany za zmianę, ale przeładowanie zbioru danych nie jest uważane za zmianę (sam w sobie) .
    * Obecnie, dla podklas EDDTable, jakiekolwiek przeładowanie zbioru danych jest uważane za zmianę.
    * Obecnie dozwolone są tylko dwa rodzaje działań:
        * "http://"albo "https://"-- Jeśli akcja zaczyna się od "http://"albo "https://", ERDDAP™ wyśle HTTP GET żądanie do określonego adresu URL. Odpowiedź zostanie zignorowana. Na przykład, URL może powiedzieć jakiejś innej usługi internetowej, aby coś zrobić.
            * Jeśli adres URL ma część zapytania (Po "?) To musi być już [% zakodowanych](https://en.wikipedia.org/wiki/Percent-encoding) . Musisz zakodować specjalne znaki w ograniczeniach (inne niż początkowe '&' i główne '=' w ograniczeniach) w postaci% HH, gdzie HH jest dwucyfrową wartością szesnastkową znaku. Zazwyczaj trzeba zamienić kilka znaków interpunkcji:% na% 25, & na% 26 ", na% 22,&lt;% 3C, =% 3D, &gt;% 3E, +% 2B, | w% 7C, \\[ w% 5B, \\] do% 5D, spacja do% 20 i konwertuj wszystkie znaki powyżej # 127 na ich formę UTF- 8, a następnie procent kodowania każdego bajtu formy UTF- 8 do formatu% HH (poproś programistę o pomoc) .
Na przykład, & stationID &gt; = "41004"
staje się & stationID % 3E =% 2241004% 22
Procent kodowania jest na ogół wymagany przy dostępie ERDDAP za pomocą oprogramowania innego niż przeglądarka. Przeglądarki zwykle zajmują się procentowym kodowaniem.
W niektórych sytuacjach, trzeba procent kodowania wszystkich znaków innych niż A- Za- z0- 9\\ _ -&#33;. ~ ' () \\ *, ale nadal nie koduj inicjału '&' lub głównego '=' w ograniczeniach.
Języki programowania mają do tego narzędzia (na przykład patrz Java jest [ java.net.URLEncoder ](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html) oraz Java Skrypt [encodeURIComponent()] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) ) i są
                 [strony internetowe, które procent kodowania / dekodowania dla Ciebie](https://www.url-encode-decode.com/) .
            * Od datasets.xml jest plikiem XML, należy również & -encode ALL '&',&lt;", i" &gt; "w URL jako" & amp; ",&lt;', i' & gt; 'po procentach kodowania.
            * Przykład: Dla URL, który można wpisać do przeglądarki jako:
                https://www.company.com/webService?department=R%26D&param2=value2  
Należy określić&lt;onChange &gt; tag poprzez (na jednej linii) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * mailto: -- Jeśli akcja zaczyna się od "mailto:", ERDDAP™ wyśle e-mail na kolejny adres e-mail wskazujący, że zbiór danych został zaktualizowany / zmieniony.
Na przykład:&lt;onChange &gt; mailto: john.smith @ company.com&lt;/ onChange &gt; Jeśli masz dobry powód ERDDAP™ Aby wesprzeć jakiś inny rodzaj działania, wyślij nam e-mail opisujący co chcesz.
    * Ten znacznik jest opcjonalny. Może być ich tyle, ile chcesz. Użyj jednego z tych znaczników dla każdej czynności, która ma być wykonana.
    * Jest to analogiczne do ERDDAP system subskrypcji e-mail / URL, ale te działania nie są stale przechowywane (tj. są one przechowywane tylko w obiekcie EDD) .
    * Aby usunąć subskrypcję, po prostu usunąć&lt;onChange &gt; tag. Zmiana zostanie odnotowana przy następnym załadowaniu zbioru danych.
         
#### &lt;przeładowanie EveryNMinutes & gt;{#reloadeverynminutes} 
* [ ** &lt;przeładowanie Każdy protokół &gt; ** ] (# reloadeverynminutes) jest znacznikiem optycznym w obrębie&lt;dataset &gt; tag in datasets.xml prawie wszystkich typów zbioru danych, które określają, jak często zbiór danych powinien być ponownie załadowany. Na przykład:
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * Ogólnie, zbiory danych, które często się zmieniają (na przykład, uzyskać nowe pliki danych) należy często ładować, na przykład co 60 minut.
    * Dane, które zmieniają się rzadko, powinny być przeładowane rzadko, na przykład co 1440 minut (dobę) lub 10080 minut (raz w tygodniu) .
    * Ten znacznik jest opcjonalny, ale zalecany. Domyślnie to 10080.
    * Przykładem jest:&lt;przeładowanie EveryNMinutes &gt; 1440&lt;/ przeładowanie Każdy protokół &gt;
    * Po ponownym załadowaniu zbioru danych, wszystkie pliki *bigParentDirectory* / cache / * datasetID * katalog został usunięty.
    * Bez względu na to, do czego to jest ustawione, zestaw danych nie będzie ładowany częściej niż&lt;loadDatasetsMinMinMinMinMinutes &gt; (domyślny = 15) , jak określono w [setup.xml](/docs/server-admin/deploy-install#setupxml) . Więc jeśli chcesz, aby dane były przeładowane bardzo często, musisz ustawić zarówno reloadEveryNMinutes jak i loadDatasets Minuty do małych wartości.
    * Nie ustawiać reloadEveryNMinutes do tej samej wartości co loadDatasets MinMinminutes, ponieważ upływający czas prawdopodobnie (na przykład) 14: 58 lub 15: 02, więc zbiór danych zostanie przeładowany tylko w około połowie głównych przeładowań. Zamiast tego, użyj mniejszej (na przykład 10) lub większe (na przykład, 20) przeładowanie Każda minuta.
    * Niezależnie od reloadEveryNMinutes, można ręcznie powiedzieć ERDDAP™ aby jak najszybciej przeładować określony zestaw danych poprzez [plik znacznika](/docs/server-admin/additional-information#flag) .
    * Dla ciekawskich programistów -- W ERDDAP™ , przeładowanie wszystkich zbiorów danych jest obsługiwane przez dwa pojedyncze wątki celu. Jeden wątek inicjuje drobne przeładowanie, jeśli znajduje plik flagi lub duże przeładowanie (który sprawdza wszystkie zestawy danych w celu sprawdzenia, czy muszą być ponownie załadowane) . Drugi wątek przeładowuje dane pojedynczo. Te wątki działają w tle, zapewniając, że wszystkie zestawy danych są przechowywane na bieżąco. Nitka, która faktycznie robi reloads przygotowuje nową wersję zbioru danych następnie swap go na miejsce (zasadniczo zastępując starą wersję atomicznie) . Więc jest bardzo możliwe, że następująca sekwencja zdarzeń występuje (To dobra rzecz.) :
        
        1.   ERDDAP™ uruchamia przeładowanie zbioru danych (tworzenie nowej wersji) w tle.
        2. Użytkownik 'A' składa wniosek do zbioru danych. ERDDAP™ wykorzystuje bieżącą wersję zbioru danych do utworzenia odpowiedzi. (To dobrze. Nie było opóźnienia dla użytkownika, a obecna wersja zbioru danych nigdy nie powinna być bardzo nieświeża.) 
        3.   ERDDAP™ kończy tworzenie nowej przeładowanej wersji zbioru danych i swapów nowej wersji do produkcji. Wszystkie kolejne nowe żądania są obsługiwane przez nową wersję zbioru danych. Dla zachowania spójności żądanie użytkownika A jest nadal wypełniane oryginalną wersją.
        4. Użytkownik 'B' składa wniosek do zbioru danych oraz ERDDAP™ wykorzystuje nową wersję zbioru danych do utworzenia odpowiedzi.
        5. Ostatecznie wnioski użytkowników A i B są wypełniane (być może A kończy się najpierw, być może B kończy najpierw) .
        
Słyszę, jak ktoś mówi: "Tylko dwie trójki&#33; Ha&#33; To żałosne&#33; Powinien to skonfigurować tak, aby przeładowanie zbiorów danych wykorzystywało tyle wątków, ile jest potrzebne, tak aby wszystko działo się szybciej i bez opóźnień". Tak i nie. Problem polega na tym, że ładowanie więcej niż jednego zbioru danych na raz stwarza kilka trudnych nowych problemów. Wszystkie muszą zostać rozwiązane lub rozwiązane. Obecny system działa dobrze i ma możliwe do opanowania problemy (na przykład, możliwość opóźnienia przed zauważoną flagą) . (Jeśli potrzebujesz pomocy w zarządzaniu nimi, zobacz nasze [rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support) .) Powiązane [aktualizacja EveryNMillis](#updateeverynmillis) . system działa w wątkach odpowiedzi, więc może i prowadzi do aktualizacji wielu zbiorów danych (nie pełne przeładowanie) jednocześnie.
##### Proactive vs Reactive{#proactive-vs-reactive} 
 ERDDAP system przeładowania jest aktywny -- zbiory danych są przeładowane wkrótce po ich przeładowaniu Każdy protokół kończy się (Stają się "nieświeże", ale nigdy bardzo nieświeże) , czy zbiór danych otrzymuje wnioski od użytkowników, czy nie. Więc... ERDDAP™ Zestawy danych są zawsze aktualizowane i gotowe do użycia. W przeciwieństwie do podejścia reaktywnego THREDDS: żądanie użytkownika jest tym, co mówi THREDDS, aby sprawdzić, czy zestaw danych jest nieaktualny (To może być bardzo nudne.) . Jeśli jest nieświeży, THREDDS sprawia, że użytkownik czeka (często przez kilka minut) podczas przeładowania zbioru danych.
        
#### &lt;aktualizacja EveryNMillis & gt;{#updateeverynmillis} 
* [ ** &lt;updateEveryNMillis &gt; ** ] (# updateeverynmillis) jest znacznikiem optycznym w obrębie&lt;dataset &gt; tag in datasets.xml niektórych typów zbioru danych, które pomagają ERDDAP™ praca z zbiorami danych, które zmieniają się bardzo często (tak często jak mniej więcej co sekundę) . W przeciwieństwie do ERDDAP jest regularne, aktywne, [&lt;przeładowanie Każda minuta &gt;] (# reloadeverynminutes) system do całkowitego przeładowania każdego zbioru danych, ten dodatkowy system optyczny jest reaktywny (wywołany żądaniem użytkownika) i szybciej, ponieważ jest przyrostowy (tylko aktualizowanie informacji, które muszą być aktualizowane) . Na przykład, jeśli wniosek do EDDGrid Zestaw danych FromDap występuje częściej niż określona liczba milisekund od ostatniej aktualizacji, ERDDAP™ będzie sprawdzić, czy są jakieś nowe wartości dla lewej (pierwszy, zwykle "time" ) rozmiar i, jeśli tak, po prostu pobrać te nowe wartości przed obsługą żądania użytkownika. System ten jest bardzo dobry w utrzymaniu szybko zmieniających się zbiorów danych up- to- date z minimalnymi wymaganiami dotyczącymi źródła danych, ale kosztem nieznacznego spowolnienia przetwarzania niektórych żądań użytkowników.
    * Aby korzystać z tego systemu, dodaj (na przykład) :
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
zaraz po&lt;przeładowanie EveryNMinutes &gt; tag dla zbioru danych w datasets.xml . Liczba milisekund może być tak mała jak 1 (w celu zapewnienia, że zestaw danych jest zawsze up- to- date) . Wartość 0 (domyślny) lub liczba ujemna wyłącza system.
    * Ze względu na ich przyrostowy charakter, aktualizacje powinny zakończyć się bardzo szybko, więc użytkownicy nie powinni czekać długo.
    * Jeśli drugi wniosek o dane pojawi się przed zakończeniem poprzedniej aktualizacji, drugi wniosek nie uruchomi kolejnej aktualizacji.
    * W całej dokumentacji, będziemy próbować użyć słowa "reload" dla regularnych, pełnych reloadów zbioru danych i "update" dla tych nowych przyrostowych, częściowych aktualizacji.
    * Do celów badań, niektóre diagnostyki są drukowane log.txt, jeśli [&lt;logLevel &gt;] (# loglevel) w datasets.xml jest ustawiony na "wszystko".
    * Jeśli używasz przyrostowych aktualizacji, a szczególnie jeśli left most (pierwszy) , na przykład, czas, oś jest duża, możesz chcieć ustawić&lt;przeładowanie EveryNMinutes &gt; do większej liczby (1440?) , tak, że aktualizacje zrobić większość pracy, aby utrzymać zestaw danych up- to- date, a pełne reloads są wykonywane rzadko.
    * Uwaga: ten nowy system aktualizacji metadanych (na przykład czas actual\\_range , time\\ _ recovery\\ _ end,...) ale nie uruchamia onChange (email lub dotknij URL) lub zmienić RSS pasza (Może powinien...) .
    * Dla wszystkich zbiorów danych, które używają podklas [ EDDGrid Pliki FromFiles](#eddgridfromfiles) oraz [Pliki EDDTableFromFiles](#eddtablefromfiles) :
        *    **OSTRZEŻENIE:** po dodaniu nowego pliku danych do zbioru danych kopiując go do katalogu, który ERDDAP™ jest niebezpieczeństwo, że ERDDAP™ będzie zauważyć plik częściowo zapisany; spróbuj go odczytać, ale nie, ponieważ plik jest niekompletny; zadeklarować plik jako "zły" plik i usunąć go (tymczasowo) z zbioru danych.
Aby uniknąć tego, my **ZALECENIE OGÓLNE** że skopiujesz nowy plik do katalogu z tymczasową nazwą (na przykład, 20150226 .nc Tmp) nie pasuje do pliku zbiorów danych NameRemex (* * * .nc ) , następnie zmienić nazwę pliku na poprawną nazwę (na przykład, 20150226 .nc ) . Jeśli użyjesz tego podejścia, ERDDAP™ ignoruje plik tymczasowy i zauważa poprawnie nazwany plik tylko wtedy, gdy jest kompletny i gotowy do użycia.
        * Jeśli zmodyfikujesz istniejące dane (na przykład dodanie nowego punktu danych) ,&lt;updateEveryNMillis &gt; będzie działać dobrze, jeśli zmiany pojawią się atomicznie (w jednej chwili) i plik jest zawsze poprawny. Na przykład, biblioteka netcdf- java pozwala na dodatki do nieograniczonego wymiaru "classic" .nc Plik v3 ma być wykonany atomicznie.
            &lt;updateEveryNMillis &gt; będzie działać źle, jeśli plik jest nieprawidłowy podczas wprowadzania zmian.
        *   &lt;updateEveryNMillis &gt; będzie działać dobrze dla zbiorów danych, gdzie jeden lub kilka plików zmienia się w krótkim czasie.
        *   &lt;updateEveryNMillis &gt; będzie słabo pracować dla zbiorów danych, gdzie duża liczba plików zmienia się w krótkim czasie (chyba że zmiany pojawiają się atomicznie) . Dla tych zbiorów danych lepiej nie używać&lt;updateEveryNMillis &gt; i ustawić [bandera](/docs/server-admin/additional-information#set-dataset-flag) powiedzieć ERDDAP™ Przeładować zestaw danych.
        *   &lt;updateEveryNMillis &gt; nie aktualizuje informacji związanych z [&lt; subsetVariables &gt;] (# subsetvarels) . Zwykle nie jest to problem, ponieważ subsetVariables mieć informacje o rzeczach, które nie zmieniają się zbyt często (na przykład, lista nazw stacji, szerokości geograficznej i długości geograficznej) . Jeśli subsetVariables zmiany danych (na przykład, gdy nowa stacja jest dodana do zbioru danych) , a następnie skontaktować się z [URL flagi](/docs/server-admin/additional-information#set-dataset-flag) dla zbioru danych, aby powiedzieć ERDDAP™ Przeładować zestaw danych. W przeciwnym razie, ERDDAP™ nie zauważy nowego podzbioru Zmienna informacja do czasu ponownego załadowania zbioru danych (&lt;przeładowanie EveryNMinutes &gt;).
        * Naszym ogólnym zaleceniem jest użycie:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * Kłopoty? Na komputerach Linuksa, jeśli używasz&lt;updateEveryNMillis &gt; z EDDGrid Pliki FromFiles lub klasy EDDTableFromFiles, możesz zobaczyć problem, w którym zestaw danych nie wczytuje (od czasu do czasu lub konsekwentnie) z komunikatem błędu: "IOException: Limit użytkowników instancji inofilizacyjnych lub zbyt wiele otwartych plików". Przyczyną może być błąd w Java co powoduje, że nie zbierane są śmieci. Ten problem jest uniknięty w ERDDAP™ v1.66 i wyższa. Więc najlepszym rozwiązaniem jest przełączanie najnowszej wersji ERDDAP .
Jeśli to nie rozwiązuje problemu (to jest, jeśli masz naprawdę dużą liczbę zbiorów danych za pomocą&lt;updateEveryNMillis &gt;), można rozwiązać ten problem poprzez wywołanie:
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
Albo użyć wyższych liczb, jeśli problem utrzymuje się. Domyślnie dla zegarków to 8192. Domyślnie dla instancji wynosi 128.
    * Możesz umieścić&lt;updateMaxEvents &gt; 10&lt;/ updateMaxEvents &gt; w datasets.xml   (z innymi ustawieniami w pobliżu góry) aby zmienić maksymalną liczbę zmian w pliku (domyślny = 10) które będą przetwarzane przez system updateEveryNMillis. Większa liczba może być przydatna dla zbioru danych, gdzie jest bardzo ważne, aby były one zawsze aktualizowane. Patrz [dokumentacja updateMaxEvents](#updatemaxevents) .
    * Dla ciekawskich programistów -- te przyrostowe aktualizacje, w przeciwieństwie do ERDDAP pełna [Przeładowanie EveryNMinutes](#reloadeverynminutes) system, wystąpić w wątkach żądanie użytkownika. Tak więc, każda liczba zbiorów danych może być aktualizowana jednocześnie. Jest kod (i zamek) w celu zapewnienia, że tylko jeden wątek pracuje nad aktualizacją danego zbioru danych w danym momencie. Umożliwienie wielokrotnych jednoczesnych aktualizacji było łatwe; dopuszczenie wielu jednoczesnych pełnych reloadów byłoby trudniejsze.
         
#### &lt;sourceCanConstrainStringEQNE & gt;{#sourcecanconstrainstringeqne} 
* [ ** &lt;sourceCanConstrainStringEQNE &gt; ** ] (# sourcecanconsiminstringeqne) jest znacznikiem optycznym w ramach tabeli EDDTable&lt;dataset &gt; tag in datasets.xml Określa, czy źródło może ograniczyć zmienne String za pomocą = i&#33; = operatorów.
    * Dla EDDTableFromDapSequence odnosi się to wyłącznie do zewnętrznych zmiennych String sekwencji. Zakłada się, że źródło nie może znieść żadnych ograniczeń dotyczących zmiennych sekwencji wewnętrznej.
    * Ten znacznik jest opcjonalny. Ważne wartości są prawdziwe (domyślny) i fałszywe.
    * Dla EDDTableFromDapSequence OPeNDAP Serwery DRDS, powinno być ustawione na true (domyślny) .
    * Dla EDDTableFromDapSequence Serwery Dapper, to powinno być fałszywe.
    * Przykładem jest:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;sourceCanConstrainStringGTLT & gt;{#sourcecanconstrainstringgtlt} 
* [ ** &lt;sourceCanConstrainStringGTLT &gt; ** ] (# sourcecanconsiminstringgtlt) jest znacznikiem optycznym w ramach tabeli EDDTable&lt;dataset &gt; tag, który określa, czy źródło może ograniczyć zmienne String&lt;,&lt;=, &gt;, i &gt; = operatorzy.
    * Dla EDDTableFromDapSequence odnosi się to wyłącznie do zewnętrznych zmiennych String sekwencji. Zakłada się, że źródło nie może znieść żadnych ograniczeń dotyczących zmiennych sekwencji wewnętrznej.
    * Ważne wartości są prawdziwe (domyślny) i fałszywe.
    * Ten znacznik jest opcjonalny. Domyślnie jest to prawda.
    * Dla EDDTableFromDapSequence OPeNDAP Serwery DRDS, powinno być ustawione na true (domyślny) .
    * Dla EDDTableFromDapSequence Serwery Dapper, to powinno być fałszywe.
    * Przykładem jest:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;sourceCanConstrainStringRegex & gt;{#sourcecanconstrainstringregex} 
* [ ** &lt;sourceCanConstrainStringReget &gt; ** ] (# sourcecanlightingregex) jest znacznikiem optycznym w ramach tabeli EDDTable&lt;dataset &gt; tag, który określa, czy źródło może ograniczać zmienne String za pomocą wyrażeń regularnych, a jeśli tak, to czym jest operator.
    * Ważne wartości to "= ~" (do DAP standard) "~ =" (omyłkowo obsługiwane przez wielu DAP serwery) albo "" (wskazując, że źródło nie obsługuje wyrażeń regularnych) .
    * Ten znacznik jest opcjonalny. Domyślnie jest ".
    * Dla EDDTableFromDapSequence OPeNDAP Serwery DRDS, to powinno być ustawione na "" (domyślny) .
    * Dla EDDTableFromDapSequence Serwery Dapper, to powinno być ustawione na "" (domyślny) .
    * Przykładem jest:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;sourceCanDodistinct & gt;{#sourcecandodistinct} 
* [ ** &lt;sourceCanDoDistinct &gt; ** ] (# sourcecandodistant) jest opcjonalnym znacznikiem w bazie danych EDDTableFromDatabase&lt;dataset &gt; tag, który określa, czy baza danych źródłowa powinna obsługiwać & odrębne () ograniczenia w zapytaniach użytkowników.
    * Ten znacznik jest opcjonalny. Ważne wartości są nie ( ERDDAP™ rękojeści odrębne; domyślne) , częściowy (źródło uchwyty odrębne i ERDDAP™ Jeszcze raz.) i tak (źródło uchwyty odrębne) .
    * Jeśli pacjent stosuje ERDDAP™ Kończy mu się pamięć podczas obsługi odrębnej, użyj tak.
    * Jeśli używasz "tak" i baza danych źródłowa działa zbyt wolno, nie używaj.
    * częściowy daje najgorsze z obu: jest powolny, ponieważ obsługa bazy danych odrębnych jest powolny i może zabraknąć pamięci w ERDDAP .
    * Bazy danych interpretują DISTINCT jako wniosek o unikalne rzędy wyników, podczas gdy ERDDAP™ interpretuje go jako wniosek o sortowanie listy unikalnych wierszy wyników. Jeśli ustawisz to na częściowe lub tak, ERDDAP™ automatycznie informuje także bazę danych o sortowaniu wyników.
    * Jedna mała różnica w wynikach:
Nie | częściowy, ERDDAP™ sortuje "" na początku wyników (przed nie- "strings) .
Z tak, baza danych może (Postgres będzie) sortuj "" na końcu wyników (po nie- "strings) .
Zgaduję, że wpłynie to również na sortowanie krótkich słów i dłuższych słów, które zaczynają się od krótkiego słowa. Na przykład: ERDDAP™ będzie sortować "Simon" przed "Simons".
    * Przykładem jest:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;sourceCanOrderBy & gt;{#sourcecanorderby} 
* [ ** &lt;źródło CanOrderBy &gt; ** ] (# sourcecanderby) jest opcjonalnym znacznikiem w bazie danych EDDTableFromDatabase&lt;dataset &gt; tag, który określa, czy baza danych źródłowa powinna obsługiwać & orderBy  (...) ograniczenia w zapytaniach użytkowników.
    * Ten znacznik jest opcjonalny. Ważne wartości są nie ( ERDDAP™ Uchwyty orderBy  (...) ; domyślne) , częściowy (uchwyty źródłowe orderBy oraz ERDDAP™ Jeszcze raz.) i tak (uchwyty źródłowe orderBy  (...) ) .
    * Jeśli pacjent stosuje ERDDAP™ kończy się pamięć podczas obsługi orderBy  (...) , użyj tak.
    * Jeśli używasz tak i obsługi bazy danych źródłowych orderBy  (...) zbyt wolno, użyj nie.
    * częściowy daje najgorsze z obu: jest powolny, ponieważ obsługa bazy danych orderBy  (...) jest powolny i może zabraknąć pamięci w ERDDAP .
    * Jedna mała różnica w wynikach:
Nie | częściowy, ERDDAP™ sortuje "" na początku wyników (przed nie- "strings) .
Z tak, baza danych może (Postgres będzie) sortuj "" na końcu wyników (po nie- "strings) .
Może to również wpływać na sortowanie krótkich słów i dłuższych słów, które zaczynają się od krótkiego słowa. Na przykład: ERDDAP™ będzie sortować "Simon" przed "Simons", ale nie jestem pewien jak baza danych będzie sortować je.
    * Przykładem jest:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;sourceNeedsExpandedFP\\ _ EQ & gt;{#sourceneedsexpandedfp_eq} 
* [ ** &lt;sourceNeedsExpandedFP\\ _ EQ &gt; ** ] (# sourceeedexpandedfp _ eq) jest znacznikiem optycznym w ramach tabeli EDDTable&lt;dataset &gt; tag, który określa (prawda (domyślny) lub false) jeśli źródło potrzebuje pomocy z zapytaniami&lt;numeryczne Zmienna &gt; =&lt;floatingPointValue &gt; (i&#33; =, &gt; =,&lt;=). Na przykład:
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * Dla niektórych źródeł danych, numeryczne zapytania dotyczące =,&#33; =,&lt;=, lub &gt; = nie mogą działać zgodnie z życzeniem z numerami zmiennoprzecinkowymi. Na przykład, wyszukiwanie długości geograficznej = 220.2 może się nie udać, jeśli wartość jest zapisywana jako 220.200000000001.
    * Problem ten powstaje, ponieważ liczby zmiennoprzecinkowe są [niereprezentowane dokładnie w komputerach](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) .
    * Jeśli sourceNeedsExpandedFP\\ _ EQ jest ustawiony na true (domyślny) , ERDDAP™ modyfikuje pytania wysyłane do źródła danych, aby uniknąć tego problemu. To jest zawsze bezpieczne i w porządku zostawić ten zestaw do prawdy.
         
#### &lt; sourceUrl & gt;{#sourceurl} 
* [ ** &lt; sourceUrl &gt; ** ] (# sourceurl) jest wspólnym znacznikiem w globalnym zbiorze danych&lt; addAttributes &gt; tag określający adres URL, który jest źródłem danych.
    * Przykładem jest:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (ale postaw wszystko na jednej linii) 
    * W ERDDAP™ , wszystkie zestawy danych będą miały " sourceUrl "w połączonych atrybutach globalnych, które są pokazywane użytkownikom.
    * Dla większości typów zbiorów danych ten znacznik jest WYMAGANY. Zobacz opis typu zbioru danych, aby dowiedzieć się, czy jest to WYMAGANE czy nie.
    * Dla niektórych zbiorów danych, oddzielny&lt; sourceUrl &gt; znacznik nie jest dozwolony. Zamiast tego, musisz dostarczyć " sourceUrl " [atrybut globalny](#global-attributes) , zwykle w świecie\\ &gt; addAttributes &lt;. Jeśli nie ma rzeczywistego adresu źródłowego (na przykład, jeśli dane są przechowywane w plikach lokalnych) , ten atrybut często ma po prostu wartość placeholder, na przykład,&lt;att name = "name" &gt; (pliki lokalne) &lt;/ att &gt;.
    * Dla większości zbiorów danych jest to podstawa adresu URL używanego do żądania danych. Na przykład: DAP serwery, to jest URL, do którego można dodać .dods, .das, .dds lub .html.
    * Od datasets.xml jest plikiem XML, musisz również zakodować '&',&lt;", i" &gt; "w URL jako" & amp; ",&lt;", i" & gt; ".
    * Dla większości typów zbiorów danych, ERDDAP™ dodaje oryginał sourceUrl   ("localSourceUrl" w kodu źródłowego) do [atrybuty globalne](#global-attributes)   (gdzie staje się "publicSourceUrl" w kodzie źródłowym) . Kiedy źródłem danych są pliki lokalne, ERDDAP™ dodaje sourceUrl = " (pliki lokalne) "do globalnych atrybutów jako zabezpieczenie bezpieczeństwa. Kiedy źródło danych jest bazą danych, ERDDAP™ dodaje sourceUrl = " (baza danych źródłowych) "do globalnych atrybutów jako zabezpieczenie bezpieczeństwa. Jeśli niektóre z twoich zbiorów danych używają niepublicznych sourceUrl jest (zazwyczaj dlatego, że ich komputer jest w DMZ lub na lokalnym LAN) można użyć [&lt;convertToPublicSourceUrl &gt;] (# converttopublicsourceurl) tagi do określenia, jak przekonwertować lokalny sourceUrl s do publicznej sourceUrl b.
    * A sourceUrl może rozpocząć się od http:// , https:// , ftp: / / i być może inne przedrostki. https połączenia odczytują i sprawdzają cyfrowy certyfikat źródła, aby upewnić się, że źródło jest tym, za kogo się podaje. W rzadkich przypadkach kontrola ta może się nie udać z błędem "javax.net.ssl.SSLProtocolution Exception: handshake alert: unfasted\\ _ name". Jest to prawdopodobnie spowodowane nazwą domeny na certyfikacie, która nie pasuje do nazwy domeny, której używasz. Można i należy przeczytać szczegóły sourceUrl Certyfikat w przeglądarce internetowej, w szczególności lista "DNS Name" s w sekcji "Temat Nazwa alternatywna".
        
W niektórych przypadkach sourceUrl używasz może być aliasem nazwy domeny na certyfikacie. Na przykład:
        https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/będzie rzucać ten błąd, ale
        https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/, który używa nazwy domeny na certyfikacie, nie będzie. Rozwiązaniem w tych przypadkach jest zatem znalezienie i użycie nazwy domeny na świadectwie. Jeśli nie możesz go znaleźć na certyfikacie, skontaktuj się z dostawcą danych.
        
W innych przypadkach nazwa domeny na świadectwie może dotyczyć grupy nazw. Jeśli tak się stanie lub problem jest inaczej nie do rozwiązania, proszę wysłać e-mail do Chrisa. John w Noa.gov zgłosić problem.
         

#### &lt;addAttributes&gt; {#addattributes} 
* [ ** &lt; addAttributes &gt; ** ] (# addattriates) jest opcjonalnym znacznikiem dla każdego zbioru danych i dla każdej zmiennej, która pozwala ERDDAP administratorzy kontrolują atrybuty metadanych związane z zbiorem danych i jego zmiennymi.
    *    ERDDAP™ łączy atrybuty ze źródła zbioru danych ("sourceAtrybuty") i " addAttributes "które definiujesz w datasets.xml   (które mają pierwszeństwo) do "combinadAtrybuty", które są co ERDDAP™ Użytkownicy widzą. Tak więc, można użyć addAttributes aby ponownie zdefiniować wartości sourceAtrybuty, dodać nowe atrybuty lub usunąć atrybuty.
    * W&lt; addAttributes &gt; tag obudowy 0 lub więcej ** &lt;att &gt; ** subtags, które są używane do określenia poszczególnych atrybutów.
    * Każdy atrybut składa się z nazwy i wartości (który posiada określony typ danych, na przykład podwójny) .
    * Może być tylko jeden atrybut o podanej nazwie. Jeśli jest ich więcej, ostatni ma pierwszeństwo.
    * Wartość może być pojedynczą wartością lub oddzieloną od przestrzeni listą wartości.
    * Składnia
        * Kolejność&lt;att &gt; podznaczniki wewnątrz addAttributes To nieważne.
        * W&lt;format att &gt; subtag jest
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * Nazwa miejsca docelowego wszystkich atrybutów MUSI zaczynać od litery (A- Z, a- z) MUSI zawierać tylko znaki A- Z, a- z, 0- 9 lub '\\ _'.
        * Jeśli&lt;att &gt; subtag nie ma wartości lub wartości null, atrybut ten zostanie usunięty z połączonych atrybutów.
Na przykład:&lt;att nazwa = "wiersze" / &gt; usunie wiersze z połączonych atrybutów.
Na przykład:&lt;att name = "coordinates" &gt; null&lt;/ att &gt; usunie współrzędne z połączonych atrybutów.
##### atrybut Rodzaj{#attributetype} 
* [Opcjonalna wartość typu dla&lt;att &gt; subtagi] (# Assionetype) wskazuje typ danych dla wartości. Domyślny typ to String. Przykładem atrybutu String jest:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * Ważne typy dla pojedynczych wartości są bajtem (8- bitowa liczba całkowita) , krótkie (16-bitowa liczba całkowita) , int (32- bitowa liczba całkowita) , długi (64- bitowa liczba całkowita) , float (32- bitowy punkt zmienny) , podwójna (64- bitowy punkt zmienny) Char i String. Na przykład:
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
Patrz te notatki o [typ danych znaków](#char) .
Patrz te notatki o [typ danych długich](#long) .
        
    * Ważne typy list wartości oddzielonych od przestrzeni kosmicznej (lub wartości pojedyncze) są byteList, shortList, unsignedShortList, charList, intList, longList, floatList, double Lista. Na przykład:
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
UnsignedShortList pozwala określić listę niepodpisanych szortów, ale zostaną one przekształcone w listę odpowiednich znaków Unicode (np. "65 67 69" zostanie przekształcone w "A C E".
Jeśli podasz CharList, koduj specjalne znaki (np. spacja, podwójne cytaty, backslash,&lt;# 32, lub &gt; # 127) jak można je kodować w sekcji danych pliku NCSV (np. ",", "\\" "lub" ","\\\\ "," \\n ","\\ u20ac ") .
Nie ma żadnej listy. Zapisz wartości String jako wieloliniowe String. Na przykład:
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### Atrybuty globalne{#global-attributes} 
* [ ** Atrybuty globalne / Atrybuty globalne&lt; addAttributes &gt; ** ] (# global- atrybuty) --
    &lt; addAttributes &gt; jest znacznikiem optycznym w obrębie&lt;dataset &gt; tag używany do zmiany atrybutów, które odnoszą się do całego zbioru danych.
    
    *    ** Użyj globalnego&lt; addAttributes &gt; zmiana globalnych atrybutów zbioru danych. **  ERDDAP™ Łączy atrybuty globalne ze źródła zbioru danych (** sourceAtrybuty **) i globalny**  addAttributes  **które definiujesz w datasets.xml   (które mają pierwszeństwo) do globalnego** combinedAtrybuty ** , które są co ERDDAP™ Użytkownicy widzą. Tak więc, można użyć addAttributes aby ponownie zdefiniować wartości sourceAtrybuty, dodać nowe atrybuty lub usunąć atrybuty.
    * Zobacz ** &lt; addAttributes &gt; **Informacje] (# addattriates) które stosuje się do globalnych i zmiennych** &lt; addAttributes &gt; ** .
    *    [FGDC](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html) oraz [ISO 19115-2 / 19139](https://en.wikipedia.org/wiki/Geospatial_metadata) Metadane -- Normalnie, ERDDAP™ automatycznie wygeneruje ISO 19115-2 / 19139 i FGDC (FGDC- STD- 001- 1998) Pliki metadanych XML dla każdego zbioru danych z wykorzystaniem informacji z metadanych zbioru danych. Więc, **dobre metadane zbioru danych prowadzi do dobrego ERDDAP -generowane metadane ISO 19115 i FGDC. Proszę rozważyć umieszczenie dużo czasu i wysiłku w poprawę metadanych zestawów danych (co i tak jest dobre.) .** Większość atrybutów metadanych zbioru danych wykorzystywanych do generowania metadanych ISO 19115 i FGDC pochodzi z [Standard metadanych ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) i są tak zaznaczone poniżej.
    * Wiele atrybutów globalnych są szczególne w tym ERDDAP™ Szuka ich i używa na różne sposoby. Na przykład, link do infoUrl jest zawarty na stronach internetowych z listami zbiorów danych i innych miejsc, aby użytkownicy mogli dowiedzieć się więcej o zbiorze danych.
    * Kiedy użytkownik wybiera podzbiór danych, globalAtrybuty związane z długością, szerokość, wysokość (lub głębokość) oraz przedziały czasowe (na przykład, Southernmost\\ _ Northing, Northernmost\\ _ Northing, time\\ _ coverage\\ _ start, time\\ _ coverage\\ _ end) są automatycznie generowane lub aktualizowane.
    * Prosta próbka globalna&lt; addAttributes &gt; jest:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
Atrybut pustego cwhdf\\ _ version powoduje atrybut źródła cwhdf\\ _ version (jeżeli istnieje) do usunięcia z ostatecznej, połączonej listy atrybutów.
    * Dostarczanie tych informacji pomaga ERDDAP™ zrobić lepszą pracę i pomaga użytkownikom zrozumieć zbiory danych.
Dobre metadane czynią zestaw danych użytecznym.
Niewystarczające metadane czynią zbiór danych bezużytecznym.
Proszę wziąć czas, aby zrobić dobrą pracę z atrybutami metadanych.
##### Specjalne atrybuty globalne w ERDDAP™ 
###### potwierdzenie{#acknowledgement} 
*    [ **potwierdzenie** ](#acknowledgement) oraz **Potwierdzenie**   (od [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) jest zalecanym sposobem uznania grupy lub grup, które udzieliły wsparcia (w szczególności finansowe) dla projektu, który stworzył te dane. Na przykład:
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
Należy zauważyć, że ACDD 1.0 i 1.1 użyły słowa "potwierdzenie" (co jest zwykłą pisownią w USA) , ale ACDD 1.3 zmienił to na "potwierdzenie" (co jest zwykłą pisownią w Wielkiej Brytanii) . Rozumiem, że zmiana była zasadniczo wypadkiem i z pewnością nie rozpoznali konsekwencji zmiany. Co za bałagan&#33; Teraz są miliony plików danych na całym świecie, które mają "uznanie" i miliony, które mają "uznanie". Podkreśla to szaleństwo "prostych" zmian w standardzie i podkreśla potrzebę stabilności standardów. Ponieważ ACDD 1.3 (która jest wersją ACDD, że ERDDAP™ wsparcie) mówi "potwierdzenie", właśnie to ERDDAP™   (w szczególności GenerateDatasets Xml) Zachęca.
     
###### cdm\\ _ wysokość\\ _ proxy{#cdm_altitude_proxy} 
*    [ **cdm\\ _ wysokość\\ _ proxy** ](#cdm_altitude_proxy) jest tylko dla zbiorów danych EDDTable, które nie mają zmiennej wysokości lub głębokości, ale mają zmienną, która jest pośrednikiem dla wysokości lub głębokości (na przykład, ciśnienie, sigma, butelka) , można użyć tego atrybutu do identyfikacji tej zmiennej. Na przykład:
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
Jeśli [cdm\\ _ data\\ _ type](#cdm_data_type) jest Profil lub TrajektoryProfil i nie ma zmiennej wysokości lub głębokości, cdm\\ _ wysokość\\ _ proxy MUSI być zdefiniowane. Jeśli jest zdefiniowany cdm\\ _ highway\\ _ proxy, ERDDAP™ doda następujące metadane do zmiennej:\\ _ Współrzędne AxisType = Wysokość i oś = Z.
     
###### cdm\\ _ data\\ _ type{#cdm_data_type} 
*    [ **cdm\\ _ data\\ _ type** ](#cdm_data_type)   (od [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) jest atrybutem globalnym, który wskazuje Unidata   [Wspólny model danych](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html) typ danych dla zbioru danych. Na przykład:
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
CDM nadal się rozwija i może się ponownie zmienić. ERDDAP™ jest zgodny z powiązanymi i bardziej szczegółowymi [Geometrie do pobierania próbek dyskretnych (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Rozdział [CF 1.6](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) konwencje dotyczące metadanych (poprzednio zwane konwencjami obserwacyjnymi punktów CF) .
    * Albo zbiór danych jest globalny [sourceAtrybuty](#global-attributes) lub jego globalny&lt; addAttributes &gt; MUSI zawierać atrybut cdm\\ _ data\\ _ type. Kilka typów zbioru danych (jak EDDTable FromObis Przewodniczący) będzie ustawić to automatycznie.
    * Dla EDDGrid sety danych, opcje cdm\\ _ data\\ _ type to Grid (domyślne i zdecydowanie najczęściej typ dla EDDGrid zbiory danych) , MovingGrid, Other, Point, Profil, RadialSweep, TimeSeries, TimeSeriesProfile, Swath, Trajectory i TrajectoryProfil. Obecnie EDDGrid nie wymaga podania żadnych powiązanych metadanych ani nie sprawdza, czy dane odpowiadają cdm\\ _ data\\ _ type. To prawdopodobnie zmieni się w najbliższej przyszłości.
    * EDDTable wykorzystuje cdm\\ _ data\\ _ type w sposób rygorystyczny, a nie CDM, które z jakiegoś powodu nie zostały zaktualizowane, aby być zgodne z DSG. Jeśli metadane zbioru danych nie spełniają ERDDAP wymagania cdm\\ _ data\\ _ type (zob. poniżej) , zestaw danych nie będzie ładować i wygeneruje [komunikat błędu](#troubleshooting-tips) . (To dobrze, że komunikat błędu powie wam, co jest nie tak, żebyście mogli to naprawić.) A jeśli dane zbioru danych nie pasują do konfiguracji metadanych zbioru danych (na przykład, jeżeli w zbiorze danych czasowych istnieje więcej niż jedna szerokość geograficzna dla danej stacji) , niektóre wnioski o dane zwrócą nieprawidłowe dane w odpowiedzi. Więc upewnij się, że wszystko będzie dobrze.
        
Dla wszystkich tych zbiorów danych, w konwencjach i Metadata\\_Conventions atrybuty globalne, patrz CF- 1.6 (nie CF- 1.0, 1.1, 1.2, 1.3, 1.4 lub 1.5) , ponieważ CF- 1.6 jest pierwszą wersją uwzględniającą zmiany związane z Geometrią pobierania próbek dyskretnych (DSG) konwencje.
        *   ** ERDDAP™ nie ma prostego związku z DSG CF** 
        *    ERDDAP™ może dokonać poprawnego zbioru danych DSG z zbioru danych źródłowych, który jest już prawidłowym plikiem DSG (s) , lub z zbioru danych źródłowych, który nie jest ustawiony dla DSG, ale może być tak poprzez zmiany metadanych (niektóre z nich są ERDDAP -konkretne w celu zapewnienia bardziej ogólnego podejścia do określenia konfiguracji DSG) .
        *    ERDDAP™ wykonuje wiele testów ważności przy załadowaniu zbioru danych. Jeśli zbiór danych z cdm\\ _ data\\ _ type (lub featureType ) atrybut skutecznie ładuje w ERDDAP™ Więc... ERDDAP™ twierdzi, że zbiór danych spełnia wymogi DSG (inaczej, ERDDAP™ rzuci wyjątek wyjaśniający pierwszy problem, który znalazł) .
UWAGA: Pomyślnie załadowany zbiór danych wydaje się spełniać wymogi DSG (posiada właściwą kombinację atrybutów) , ale nadal może być nieprawidłowo skonfigurowane, co prowadzi do nieprawidłowych wyników w .nc CF oraz .nc Pliki odpowiedzi CFMA. (Oprogramowanie jest mądre w niektórych aspektach i nie ma pojęcia w innych.) 
        * Kiedy spojrzeć na metadane zbioru danych w ERDDAP™ , zbiór danych DSG wydaje się być w ERDDAP Wewnętrzny format (olbrzymi, podobny do bazy danych stół) . Nie jest w jednym z formatów DSG (np. wymiary i metadane są niewłaściwe) , ale informacje potrzebne do traktowania zbioru danych jako zbioru danych DSG znajdują się w metadanych (na przykład cdm\\ _ data\\ _ type = TimeSeries i cdm\\ _ timeseries\\ _ variables = *aCsvListOfStationRelatedVarables* w metadanych globalnych i cf\\ _ role = timeseries\\ _ id dla niektórych zmiennych) .
        * Jeśli użytkownik żąda podzbioru zbioru danych w .nc CF (do .nc plik w formacie pliku DSG 's Contiguous Ragged Array) lub .nc Plik CFMA (a .nc plik w formacie pliku wielowymiarowego tablicy DSG) , że plik będzie ważny plik CF DSG.
UWAGA: Jeżeli jednak zestaw danych został ustawiony nieprawidłowo (aby obietnice złożone przez metadane nie były prawdziwe) , wtedy plik odpowiedzi będzie technicznie poprawny, ale będzie w jakiś sposób nieprawidłowy.
             
###### EDDTable cdm _ data _ types
* Dla zbiorów danych EDDTable, opcje cdm\\ _ data\\ _ type (oraz związane z nimi wymogi w zakresie ERDDAP ) są
###### Punkt{#point} 
*    [Punkt](#point) -- jest dla zestawu pomiarów wykonanych w niepowiązanych czasach i miejscach.
    * Podobnie jak w przypadku wszystkich cdm\\ _ data\\ _ types innych niż Inne, zbiór danych punktowych MUSI mieć długość, szerokość i czas zmiennych.
###### Profil{#profile} 
*    [Profil](#profile) -- jest zestawem pomiarów wykonanych w jednym czasie, na jednej długości geograficznej, ale na więcej niż jednej głębokości (lub wysokość) . Zestaw danych może być zbiorem tych profili, na przykład 7 profili z różnych lokalizacji. Ten cdm\\ _ data\\ _ type nie oznacza żadnego logicznego połączenia pomiędzy profilami.
    
* Jedna ze zmiennych (na przykład, profil\\ _ number) MUSI posiadać atrybut zmiennej cf\\ _ role = profil\\ _ id w celu identyfikacji zmiennej, która jednoznacznie identyfikuje profile.
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
Jeśli żadna inna zmienna nie jest odpowiednia, należy rozważyć użycie zmiennej czasu.
###### cdm\\ _ profil\\ _ zmienne{#cdm_profile_variables} 
* Zestaw danych MUSI zawierać globalny atrybut [cdm\\ _ profil\\ _ zmienne](#cdm_profile_variables) , gdzie wartość jest oddzieloną od comma- listą zmiennych, które posiadają informacje o każdym profilu. Dla danego profilu wartości tych zmiennych MUSI być stałe. Na przykład:
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
Lista MUSI zawierać zmienną cf\\ _ role = profil\\ _ id i wszystkie inne zmienne z informacjami o profilu, oraz czas, szerokość i długość geograficzną.
Lista nigdy nie będzie zawierać wysokości, głębokości ani żadnych zmiennych obserwacyjnych.
     

 \\[ Opinion: cdm\\ _ data\\ _ type = Profil powinien być rzadko stosowany. W praktyce, dany zbiór danych jest zazwyczaj albo TimeSeriesProfil (profile w stałej pozycji) lub TrajektoryProfil (profile wzdłuż trajektorii) i w związku z tym należy odpowiednio określić jako takie. \\]   
###### Seria czasu{#timeseries} 
*    [Seria czasu](#timeseries) -- jest sekwencją pomiarów (np. temperatura wody morskiej) na jednej, stałej, szerokości, długości geograficznej, głębokości (lub wysokość) lokalizacja. (Pomyśl o tym jak o "stacji".) Zestawienie danych może być zbiorem tych TimeSeries, na przykład sekwencją z każdego z 3 różnych miejsc.
    * Jedna ze zmiennych (na przykład, station\\ _ id) MUSI mieć atrybut zmiennej cf\\ _ role = timeseries\\ _ id w celu identyfikacji zmiennej, która jednoznacznie identyfikuje stacje.
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### cdm\\ _ timeseries\\ _ variables{#cdm_timeseries_variables} 
* Zestaw danych MUSI zawierać globalny atrybut [cdm\\ _ timeseries\\ _ variables](#cdm_timeseries_variables) , gdzie wartość jest oddzieloną od comma- listą zmiennych, które posiadają informacje o każdej stacji. Dla danej stacji wartości tych zmiennych MUSI być stałe. Na przykład:
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
Lista MUSI zawierać zmienną cf\\ _ role = timeseries\\ _ id i wszystkie inne zmienne z informacjami o stacji, która prawie zawsze zawiera szerokość i długość geograficzną (oraz wysokość lub głębokość, jeżeli występują) .
Lista nigdy nie będzie zawierać czasu ani żadnych zmiennych obserwacyjnych.
* W przypadku niektórych boji motorowych zbiór danych może mieć dwa zestawy zmiennych szerokości i długości geograficznej:
    1. Jedna para wartości szerokości i długości geograficznej, które są stałe (tj. stałe położenie cumowania) . W ERDDAP™ , dać te zmienne destinationName s szerokości i długości geograficznej i włączyć te zmienne do listy cdm\\ _ timeseries\\ _ variables.
    2. Dokładne wartości szerokości i długości geograficznej związane z każdą obserwacją. W ERDDAP™ , dać te zmienne różne destinationName s (np. preciseLat i precyzyjne Lon) i nie włączaj tych zmiennych do listy cdm\\ _ timeseries\\ _ variables.
Uzasadnienie jest następujące: z perspektywy teoretycznej, dla zbioru danych DSG TimeSeries, szerokość i długość geograficzna (oraz wysokość lub głębokość, jeżeli występują) lokalizacja stacji MUSI być stała.
###### Profil TimeSeriesProfile{#timeseriesprofile} 
*    [Profil TimeSeriesProfile](#timeseriesprofile) -- jest dla sekwencji profili pobranych na jednej, stałej, długości geograficznej. Każdy profil jest zestawem pomiarów wykonanych na wielu wysokościach lub głębokościach. Zestaw danych może być zbiorem tych plików TimeSeriesProfiles, na przykład sekwencją profili pobranych w każdym z 12 różnych miejsc.
    * Jedna ze zmiennych (na przykład, station\\ _ id) MUSI mieć atrybut zmiennej cf\\ _ role = timeseries\\ _ id w celu identyfikacji zmiennej, która jednoznacznie identyfikuje stacje.
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * Jedna ze zmiennych (na przykład, profil\\ _ number) MUSI posiadać atrybut zmiennej cf\\ _ role = profil\\ _ id w celu identyfikacji zmiennej, która jednoznacznie identyfikuje profile.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Podany profil\\ _ id musi być unikalny tylko dla danego timeseries\\ _ id.) Jeśli żadna inna zmienna nie jest odpowiednia, należy rozważyć użycie zmiennej czasu.
    * Zestaw danych MUSI zawierać globalAtrybuty cdm\\ _ timeseries\\ _ variables, gdzie wartość jest oddzieloną comma- list zmiennych, które posiadają informacje o każdej stacji. Dla danej stacji wartości tych zmiennych MUSI być stałe. Na przykład:
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
Lista MUSI zawierać zmienną cf\\ _ role = timeseries\\ _ id i wszystkie inne zmienne z informacjami o stacji, która prawie zawsze zawiera szerokość i długość geograficzną.
Lista nigdy nie będzie zawierać czasu, wysokości, głębokości ani żadnych zmiennych obserwacyjnych.
    * Zestaw danych MUSI zawierać globalAtrybuty cdm\\ _ profile\\ _ variables, gdzie wartość jest oddzieloną od comma- list zmiennych, które posiadają informacje o każdym profilu. Dla danego profilu wartości tych zmiennych MUSI być stałe. Na przykład:
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
Lista MUSI zawierać zmienną cf\\ _ role = profil\\ _ id oraz wszystkie inne zmienne z informacjami o profilu, które prawie zawsze zawierają czas.
Lista nigdy nie będzie zawierać szerokości geograficznej, długości geograficznej, wysokości, głębokości ani żadnych zmiennych obserwacyjnych.
###### Trajektoria{#trajectory} 
*    [Trajektoria](#trajectory) -- jest sekwencją pomiarów wykonanych wzdłuż trajektorii (ścieżka przez przestrzeń i czas)   (np. morze\\ _ woda\\ _ temperatura przyjmowana przez statek podczas poruszania się przez wodę) . Zestaw danych może być zbiorem tych Trajektorii, na przykład sekwencją z każdego z 4 różnych statków.
    * Jedna ze zmiennych (na przykład statek\\ _ id) MUSI posiadać atrybut cf\\ _ role = trajektoria\\ _ id w celu identyfikacji zmiennej, która jednoznacznie identyfikuje trajektorie.
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### cdm\\ _ trajektoria\\ _ zmienne{#cdm_trajectory_variables} 
* Zestaw danych MUSI zawierać globalny atrybut [cdm\\ _ trajektoria\\ _ zmienne](#cdm_trajectory_variables) , gdzie wartość jest oddzieloną od comma- listą zmiennych, które posiadają informacje o każdej trajektorii. Dla danej trajektorii wartości tych zmiennych MUSI być stałe. Na przykład:
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
Lista MUSI zawierać zmienną cf\\ _ role = trajektoria\\ _ id i wszystkie inne zmienne z informacjami o trajektorii.
Lista nigdy nie będzie zawierać czasu, szerokości geograficznej, długości geograficznej ani żadnych zmiennych obserwacyjnych.
###### Profil trajektoryName{#trajectoryprofile} 
*    [Profil trajektoryName](#trajectoryprofile) -- to sekwencja profili wziętych wzdłuż trajektorii. Zestawienie danych może być zbiorem tych profili TrajectoryProfile, na przykład sekwencją profili pobranych przez 14 różnych statków.
    * Jedna ze zmiennych (na przykład statek\\ _ id) MUSI posiadać atrybut zmiennej cf\\ _ role = trajektoria\\ _ id w celu identyfikacji zmiennej, która jednoznacznie identyfikuje trajektorie.
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * Jedna ze zmiennych (na przykład, profil\\ _ number) MUSI posiadać atrybut zmiennej cf\\ _ role = profil\\ _ id w celu identyfikacji zmiennej, która jednoznacznie identyfikuje profile.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Podany profil\\ _ id musi być unikalny tylko dla danej trajektorii\\ _ id.) Jeśli żadna inna zmienna nie jest odpowiednia, należy rozważyć użycie zmiennej czasu.
    * Zestaw danych MUSI zawierać globalAtrybut cdm\\ _ trajektoria\\ _ zmienne, gdzie wartość jest oddzieloną od comma- lista zmiennych, które mają informacje o każdej trajektorii. Dla danej trajektorii wartości tych zmiennych MUSI być stałe. Na przykład:
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
Lista MUSI zawierać zmienną cf\\ _ role = trajektoria\\ _ id i wszystkie inne zmienne z informacjami o trajektorii.
Lista nigdy nie będzie zawierać zmiennych związanych z profilami, czasu, szerokości, długości geograficznej lub jakichkolwiek zmiennych obserwacyjnych.
    * Zestaw danych MUSI zawierać globalAtrybuty cdm\\ _ profile\\ _ variables, gdzie wartość jest oddzieloną od comma- list zmiennych, które posiadają informacje o każdym profilu. Dla danego profilu wartości tych zmiennych MUSI być stałe. Na przykład:
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
Lista MUSI zawierać zmienną cf\\ _ role = profil\\ _ id oraz wszystkie inne zmienne z informacjami o profilu, które prawie zawsze zawierają czas, szerokość i długość geograficzną.
Lista nigdy nie będzie zawierać wysokości, głębokości ani żadnych zmiennych obserwacyjnych.
###### Inne{#other} 
*    [Inne](#other) -- nie ma żadnych wymagań. Użyj go, jeśli zestaw danych nie pasuje do jednej z innych opcji, w szczególności, jeśli zestaw danych nie zawiera szerokości, długości i zmiennych czasowych.
     
###### Uwagi{#related-notes} 
* Wszystkie zbiory danych EDDTable ze zmiennymi czasu i długości.
* Zestawy danych z profilami MUSI mieć zmienną wysokości, zmienną głębokości lub [cdm\\ _ wysokość\\ _ proxy](#cdm_altitude_proxy) zmienna.
* Jeśli nie możesz zrobić zestawu danych spełniających wszystkie wymagania dla idealnego cdm\\ _ data\\ _ type, użyj "Point" (który ma niewiele wymagań) lub "Inne" (który nie ma żadnych wymagań) Zamiast tego.
* Informacje te są wykorzystywane przez ERDDAP™ na różne sposoby, na przykład, ale głównie do tworzenia .nc Pliki CF ( .nc pliki, które są zgodne z Contiguous Ragged Array Reprezentations związane z plikiem dataset 's cdm\\ _ data\\ _ type) oraz .nc Pliki CFMA ( .nc pliki zgodne z wielowymiarowymi reprezentacjami tablic związanych z plikiem cdm\\ _ data\\ _ type) zgodnie z definicją w [Geometrie do pobierania próbek dyskretnych (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Rozdział [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) konwencje dotyczące metadanych, które wcześniej nazywano "konwencjami obserwacji punktów CF".
* Podpowiedź: Dla tych zbiorów danych, prawidłowe ustawienie dla [ subsetVariables ](#subsetvariables) jest zazwyczaj kombinacją wszystkich zmiennych wymienionych w atrybutach cdm\\ _...\\ _ zmiennych. Na przykład, dla TimeSeriesProfile, użyj cdm\\ _ timeseries\\ _ variables plus cdm\\ _ profile\\ _ variables.
######  contributor\\_name  {#contributor_name} 
*    [ ** contributor\\_name ** ](#contributor_name)   (od [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) jest zalecany sposób identyfikacji osoby, organizacji lub projektu, który przyczynił się do tego zbioru danych (na przykład pierwotny twórca danych, zanim został ponownie przetworzony przez twórcę tego zbioru danych) . Na przykład:
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
Jeśli "podmiot przekazujący dane" nie ma zastosowania do zbioru danych, pomiń ten atrybut. W porównaniu do [ creator\\_name ](#creator_name) czasami jest to bardziej skoncentrowane na źródle finansowania.
######  contributor\\_role  {#contributor_role} 
*    [ ** contributor\\_role ** ](#contributor_role)   (od [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) jest zalecanym sposobem określenia roli [ contributor\\_name ](#creator_name) . Na przykład:
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
Jeśli "podmiot przekazujący dane" nie ma zastosowania do zbioru danych, pomiń ten atrybut.
###### Konwencje{#conventions} 
*    [ **Konwencje** ](#conventions)   (od [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) standard metadanych) ZALECA SIĘ. (Może być wymagane w przyszłości.) Wartość jest oddzieloną od comma- list standardów metadanych, które ten zbiór danych postępuje. Na przykład:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
Wspólne konwencje metadanych stosowane w ERDDAP™ są:
    
    *    [ COARDS Konwencje](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) jest prekursorem CF.
    *    [Klimat i prognoza (CF) Konwencje](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) jest źródłem wielu zalecanych i wymaganych atrybutów w ERDDAP . Obecną wersję CF określa się jako "CF- 1,6".
    * W NetCDF Konwencja o atrybucie dla wyszukiwania danych (ACDD) jest źródłem wielu zalecanych i wymaganych atrybutów w ERDDAP . Oryginalna wersja 1.0 ACDD (genialny kawałek pracy Ethana Davisa) , został zidentyfikowany jako [ Unidata Dataset Discovery v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1) Bieżący (rozpoczynający się w 2015 r.) 1.3 wersja ACDD jest identyfikowana jako [ACDD- 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) . Jeśli Twoje zbiory danych były używane Unidata Dataset Discovery v1.0, zachęcamy do [przełączanie zbiorów danych w celu użycia ACDD- 1.3](#switch-to-acdd-13) .
    
Jeśli zbiór danych jest zgodny z dodatkowym standardem metadanych, proszę dodać nazwę do listy CSV w atrybucie konwencji.
######  coverage\\_content\\_type  {#coverage_content_type} 
*    [ ** coverage\\_content\\_type ** ](#coverage_content_type)   (od [ISO 19115](https://en.wikipedia.org/wiki/Geospatial_metadata) standard metadanych) jest polecanym sposobem identyfikacji rodzaju danych zaprogramowanych (w EDDGrid zbiory danych) . Na przykład:
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
Jedynymi dopuszczalnymi wartościami są pomocnicze informacje, obraz, modelResult, fizyczne Pomiar (wartość domyślna przy generowaniu metadanych ISO 19115) , qualityInformation, referenceInformation, and thematisClassification. (Nie używaj tego znacznika do zbiorów danych EDDTable.)   
######  creator\\_name  {#creator_name} 
*    [ ** creator\\_name ** ](#creator_name)   (od [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) jest zalecany sposób identyfikacji osoby, organizacji lub projektu (jeżeli nie jest to konkretna osoba lub organizacja) , najbardziej odpowiedzialny za stworzenie (lub ostatnie ponowne przetwarzanie) danych. Na przykład:
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
Jeżeli dane zostały szeroko przetworzone (na przykład dane satelitarne z poziomu 2 do poziomu 3 lub 4) , to zwykle reprocesor jest wymienione jako twórca i oryginalny twórca jest wymienione poprzez [ contributor\\_name ](#contributor_name) . W porównaniu do [projekt](#project) , jest to bardziej elastyczne, ponieważ może zidentyfikować osobę, organizację lub projekt.
######  creator\\_email  {#creator_email} 
*    [ ** creator\\_email ** ](#creator_email)   (od [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) jest poleconym sposobem identyfikacji adresu e-mail (prawidłowo sformatowane) który zapewnia sposób na kontakt z twórcą. Na przykład:
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
######  creator\\_url  {#creator_url} 
*    [ ** creator\\_url ** ](#creator_url)   (od [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) jest poleconym sposobem identyfikacji URL dla organizacji, która stworzyła zbiór danych, lub URL z informacjami o tym zbiorze danych twórcy (ale to jest bardziej celem [ infoUrl ](#infourl) ) . Na przykład:
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
######  date\\_created  {#date_created} 
*    [ ** date\\_created ** ](#date_created)   (od [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) jest zalecanym sposobem określenia daty, w której dane zostały po raz pierwszy utworzone (na przykład, przetworzone do tej formy) , w formacie ISO 8601. Na przykład:
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
Jeżeli dane są okresowo dodawane do zbioru danych, jest to pierwsza data udostępnienia oryginalnych danych.
######  date\\_modified  {#date_modified} 
*    [ ** date\\_modified ** ](#date_modified)   (od [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) jest zalecanym sposobem identyfikacji daty ostatniej modyfikacji danych (na przykład, gdy błąd został naprawiony lub kiedy dodano najnowsze dane) , w formacie ISO 8601. Na przykład:
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
######  date\\_issued  {#date_issued} 
*    [ ** date\\_issued ** ](#date_issued)   (od [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) jest zalecanym sposobem określenia daty, w której dane zostały po raz pierwszy udostępnione innym, w formacie ISO 8601, na przykład 2012- 03- 15. Na przykład:
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
Na przykład zbiór danych może mieć [ date\\_created ](#date_created) 2010- 01- 30, ale został udostępniony tylko publicznie 2010- 07- 30. date\\_issued jest rzadziej stosowany niż date\\_created oraz date\\_modified . Jeśli date\\_issued jest pominięty, przyjmuje się, że jest taki sam jak date\\_created .
###### globalny drawLandMask  {#global-drawlandmask} 
*    [ ** drawLandMask ** ](#global-drawlandmask) -- Jest to globalny atrybut optyczny używany przez ERDDAP™   (i brak standardów metadanych) która określa wartość domyślną dla opcji "Draw Land Mask" w formularzu Make A Graph ( * datasetID * .graph) i dla parametru & .land w URL z prośbą o mapę danych. Na przykład:
    ```
    <att name="drawLandMask">over</att>  
    ```
Patrz [ drawLandMask przegląd](#drawlandmask) .
######  featureType  {#featuretype} 
*    [ ** featureType ** ](#featuretype)   (od [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) standard metadanych) jest IGNORED i / lub Replaced. Jeśli zbiór danych [cdm\\ _ data\\ _ type](#cdm_data_type) jest właściwe, ERDDAP™ automatycznie użyje go do stworzenia featureType atrybut. Więc nie musisz tego dodawać.
    
Jednakże, jeśli pacjent stosuje [Pliki EDDTableFromNcCFFiles](#eddtablefromnccffiles) do tworzenia zbioru danych z plików, które następują po [CF Geometrie do pobierania próbek dyskretnych (DSG) standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) , same pliki muszą mieć featureType prawidłowo zdefiniowane, tak aby ERDDAP™ może poprawnie odczytać pliki. Jest to część wymogów FS dla tego typu pliku.
     
###### historia{#history} 
*    [ **historia** ](#history)   (od [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) oraz [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) normy metadanych) jest globalnym atrybutem wieloliniowym z wierszem dla każdego etapu przetwarzania danych. Na przykład:
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * Idealnie, każda linia posiada ISO 8601: 2004 (E) sformatowana data + timeZ (na przykład, 2011-08-05T08: 55: 02Z) po którym następuje opis etapu przetwarzania.
    *    ERDDAP™ Tworzy to, jeśli nie istnieje.
    * Jeśli już istnieje, ERDDAP™ dołączy nowe informacje do istniejących informacji.
    * Historia jest ważna, ponieważ pozwala klientom cofnąć się do oryginalnego źródła danych.
######  infoUrl  {#infourl} 
*    [ ** infoUrl ** ](#infourl) jest to globalny atrybut WYMAGANY z URL strony internetowej z więcej informacji o tym zbiorze danych (zazwyczaj na stronie internetowej instytucji źródłowej) . Na przykład:
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * Albo zbiór danych jest globalny [sourceAtrybuty](#global-attributes) lub jego globalny&lt; addAttributes &gt; MUSI zawierać ten atrybut.
    *    infoUrl jest ważne, ponieważ pozwala klientom dowiedzieć się więcej o danych z oryginalnego źródła.
    *    ERDDAP™ wyświetla link do infoUrl w sprawie formularza dostępu do danych ( * datasetID * .html) , Zrób stronę wykresu ( * datasetID * .graph) oraz innych stron internetowych.
    * Jeśli adres URL ma część zapytania (Po "?) To musi być już [% zakodowanych](https://en.wikipedia.org/wiki/Percent-encoding) . Musisz zakodować specjalne znaki w ograniczeniach (inne niż początkowe '&' i główne '=' , jeśli istnieje) w postaci% HH, gdzie HH jest dwucyfrową wartością szesnastkową znaku. Zazwyczaj trzeba zamienić kilka znaków interpunkcji:% na% 25, & na% 26 ", na% 22,&lt;% 3C, =% 3D, &gt;% 3E, +% 2B, | w% 7C, \\[ w% 5B, \\] do% 5D, spacja do% 20 i konwertuj wszystkie znaki powyżej # 127 na ich formę UTF- 8, a następnie procent kodowania każdego bajtu formy UTF- 8 do formatu% HH (poproś programistę o pomoc) .
Na przykład, & stationID &gt; = "41004"
staje się & stationID % 3E =% 2241004% 22
Procent kodowania jest na ogół wymagany przy dostępie ERDDAP za pomocą oprogramowania innego niż przeglądarka. Przeglądarki zwykle zajmują się procentowym kodowaniem.
W niektórych sytuacjach, trzeba procent kodowania wszystkich znaków innych niż A- Za- z0- 9\\ _ -&#33;. ~ ' () \\ *, ale nadal nie koduj inicjału '&' lub głównego '=' .
Języki programowania mają do tego narzędzia (na przykład patrz Java jest [ java.net.URLEncoder ](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)   
oraz Java Skrypt [encodeURIComponent()] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) ) i są
         [strony internetowe, które procent kodowania / dekodowania dla Ciebie](https://www.url-encode-decode.com/) .
    * Od datasets.xml jest plikiem XML, należy również & -encode ALL '&',&lt;", i" &gt; "w URL jako" & amp; ",&lt;', i' & gt; 'po procentach kodowania.
    *    infoUrl jest unikalny dla ERDDAP . Nie pochodzi z żadnego standardu metadanych.
###### instytucja{#institution} 
*    [ **instytucja** ](#institution)   (od [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) oraz [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) normy metadanych) jest globalnym atrybutem WYMAGANYM z krótką wersją nazwy instytucji, która jest źródłem tych danych (zazwyczaj akronim, zazwyczaj&lt;20 znaków). Na przykład:
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * Albo zbiór danych jest globalny [sourceAtrybuty](#global-attributes) lub jego globalny&lt; addAttributes &gt; MUSI zawierać ten atrybut.
    *    ERDDAP™ wyświetla instytucję za każdym razem, gdy wyświetla listę zbiorów danych. Jeżeli nazwa instytucji tutaj jest dłuższa niż 20 znaków, tylko pierwsze 20 znaków będzie widoczne na liście zbiorów danych (ale cała instytucja może być postrzegana przez umieszczenie kursora myszy nad przylegającą ikoną "?") .
    * Jeśli dodasz instytucję do listy&lt; categoryAttributes &gt; w ERDDAP jest [setup.xml](/docs/server-admin/deploy-install#setupxml) plik, użytkownicy mogą łatwo znaleźć zestawy danych z tej samej instytucji poprzez ERDDAP "Search for Datasets by Category" na stronie głównej.
###### słowa kluczowe{#keywords} 
*    [ **słowa kluczowe** ](#keywords)   (od [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) to lista słów i krótkich zwrotów oddzielona od comma- (na przykład: [GCMD Nauka Słowa kluczowe](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access) ) które opisują zbiór danych w sposób ogólny i nie zakładają żadnej innej wiedzy o zbiorze danych (na przykład, dla danych oceanograficznych, obejmują ocean) . Na przykład:
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
Od datasets.xml jest dokumentem XML, znakami i,&lt;, i &gt; w atrybucie jak słowa kluczowe (np. &gt; znaki w GCMD nauki słowa kluczowe) muszą być zakodowane jako & amp;,&lt;i & gt; odpowiednio.
Kiedy zestaw danych jest załadowany ERDDAP ,
    
    * "Earth Science &gt;" dodaje się do początku każdego słowa kluczowego GCMD, które go brakuje.
    * GCMD słowa kluczowe są konwertowane do Title Case (to znaczy, pierwsze litery są kapitalizowane) .
    * Słowa kluczowe są przekształcane w sortowane kolejność i wszelkie znaki nowej linii są usuwane.
     
######  keywords\\_vocabulary  {#keywords_vocabulary} 
*    [ ** keywords\\_vocabulary ** ](#keywords_vocabulary)   (od [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) jest atrybutem ZALECONYM: jeśli postępujesz zgodnie z wytycznymi dotyczącymi słów / zwrotów w atrybucie słów kluczowych (na przykład, GCMD Nauka Słowa kluczowe) , umieścić nazwę tej wytycznej tutaj. Na przykład:
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### licencja{#license} 
*    [ **licencja** ](#license)   (od [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) jest STRONGLY ZALECA globalny atrybut z licencją i / lub ograniczenia użytkowania. Na przykład:
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * Jeśli " \\[ standard \\] "występuje w wartości atrybutu, zostanie zastąpiony przez standard ERDDAP™ licencji&lt;StandardLicence &gt; tag in ERDDAP jest
         \\[ tomcat \\] / webapps / erddap / WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml file.
         
######  Metadata\\_Conventions  {#metadata_conventions} 
*    [ ** Metadata\\_Conventions ** ](#metadata_conventions) pochodzi z przestarzałych [ACDD 1, 0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)   (które zidentyfikowano w Metadata\\_Conventions jako " Unidata Dataset Discovery v1.0 ") standard metadanych. Wartość atrybutu była oddzieloną od comma- list konwencji metadanych używanych w tym zbiorze danych.
Jeśli zbiór danych używa ACDD 1.0, atrybut ten jest ZALECANY, na przykład,
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
Ale... ERDDAP™ teraz zaleca ACDD- 1.3 Jeśli [przełączanie zestawów danych do użycia ACDD- 1.3](#switch-to-acdd-13) , stosowanie Metadata\\_Conventions jest STRONGLY ZAINTERESOWANY: po prostu używać [&lt;Konwencja &gt;] (# konwencje) Zamiast tego.
######  processing\\_level  {#processing_level} 
*    [ ** processing\\_level ** ](#processing_level)   (od [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) jest zalecanym opisem tekstowym przetwarzania (na przykład: [Poziomy przetwarzania danych przez system obserwacji Ziemi i systemu informacyjnego NASA](https://www.earthdata.nasa.gov/learn/earth-observation-data-basics/data-processing-levels) na przykład poziom 3) lub poziom kontroli jakości (na przykład, Jakość nauki) danych. Na przykład:
    ```
    <att name="processing\\_level">3</att>  
    ```
###### projekt{#project} 
*    [ **projekt** ](#project)   (od [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) jest atrybutem optycznym pozwalającym zidentyfikować projekt, którego częścią jest zbiór danych. Na przykład:
    ```
    <att name="project">GTSPP</att>  
    ```
Jeśli zbiór danych nie jest częścią projektu, nie używaj tego atrybutu. W porównaniu do [ creator\\_name ](#creator_name) , to koncentruje się na projekcie (nie osoby lub organizacji, które mogą być zaangażowane w wiele projektów) .
######  publisher\\_name  {#publisher_name} 
*    [ ** publisher\\_name ** ](#publisher_name)   (od [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) jest zalecanym sposobem identyfikacji osoby, organizacji lub projektu, który publikuje ten zbiór danych. Na przykład:
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
Na przykład, jesteś wydawcą, jeśli inna osoba lub grupa [created](#creator_name) zestaw danych, a ty tylko go ponownie podajesz poprzez ERDDAP . Jeśli "wydawca" nie odnosi się do zbioru danych, pomiń ten atrybut. W porównaniu do [ creator\\_name ](#creator_name) , wydawca prawdopodobnie nie znacząco modyfikował lub przetwarza dane; wydawca udostępnia dane w nowym miejscu.
######  publisher\\_email  {#publisher_email} 
*    [ ** publisher\\_email ** ](#publisher_email)   (od [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) jest poleconym sposobem identyfikacji adresu e-mail (poprawnie sformatowane, na przykład, John\\ _ smith @ greater .org) który zapewnia sposób na kontakt z wydawcą. Na przykład:
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
Jeśli "wydawca" nie odnosi się do zbioru danych, pomiń ten atrybut.
######  publisher\\_url  {#publisher_url} 
*    [ ** publisher\\_url ** ](#publisher_url)   (od [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) jest poleconym sposobem identyfikacji URL dla organizacji, która opublikowała zbiór danych, lub URL z informacji wydawcy o tym zbiorze danych (ale to jest bardziej celem [ infoUrl ](#infourl) ) . Na przykład:
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
Jeśli "wydawca" nie odnosi się do zbioru danych, pomiń ten atrybut.
######  real\\_time  {#real_time} 
*    [ ** real\\_time ** ](#real_time) jest globalnym atrybutem String (nie z żadnej normy) wskazanie, czy jest to zbiór danych w czasie rzeczywistym. Na przykład:
    ```
    <att name="real\\_time">true</att>  
    ```
Jeśli to fałsz (domyślny) , ERDDAP™ będzie buforować odpowiedzi na żądania dla typów plików, gdzie cały plik musi być utworzony przed ERDDAP™ może zacząć wysyłać odpowiedź do użytkownika i ponownie je do około 15 minut (np., .nc , .png) .
Jeśli to jest ustawione na prawdę, ERDDAP™ nigdy nie buforuje plików odpowiedzi i zawsze zwraca nowo utworzone pliki.
######  sourceUrl atrybut{#sourceurl-attribute} 
*    [ ** sourceUrl ** ](#sourceurl-attribute) jest atrybutem globalnym z URL źródła danych. Na przykład:
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (ale postaw wszystko na jednej linii) 
    *    ERDDAP™ zwykle tworzy ten globalny atrybut automatycznie. Dwa wyjątki to EDDTableFrom Hyrax Pliki i pliki EDDTableFromThreddsFiles.
    * Jeśli źródłem są pliki lokalne i pliki zostały utworzone przez organizację, użyj
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * Jeśli źródłem jest lokalna baza danych i dane zostały utworzone przez organizację, użyj
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *    sourceUrl jest ważne, ponieważ pozwala klientom cofnąć się do pierwotnego źródła danych.
    *    sourceUrl jest unikalny dla ERDDAP . Nie pochodzi z żadnego standardu metadanych.
        
######  standard\\_name\\_vocabulary  {#standard_name_vocabulary} 
*    [ ** standard\\_name\\_vocabulary ** ](#standard_name_vocabulary)   (od [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) jest atrybutem ZALECONYM w celu identyfikacji nazwy kontrolowanego słownika, z którego zmienna [ standard\\_name ](#standard_name) s są zajęte. Na przykład:
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
dla wersji 77 [Tabela nazwy standardowej CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) .
         
#####  subsetVariables  {#subsetvariables} 
*    ** subsetVariables **   (wyłącznie dla zbiorów danych EDDTable) jest globalnym atrybutem ZALECONYM, który pozwala na określenie oddzielonej od comma- listy [&lt; dataVariable &gt;] (# datavariable)   [ destinationName ](#destinationname) s do identyfikacji zmiennych o ograniczonej liczbie wartości (podano inny sposób: zmienne, dla których każda z wartości ma wiele duplikatów) . Na przykład:
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
Jeśli ten atrybut jest obecny, zbiór danych będzie miał * datasetID * .subset strona internetowa (i link do niego na każdej liście danych) które pozwala użytkownikom szybko i łatwo wybrać różne podzbiory danych.
    * Za każdym razem, gdy załadowany jest zestaw danych, ERDDAP ładunki i przechowuje na dysku stół ze wszystkimi odrębnymi () kombinacje podzbioru Wartości zmiennej zmiennej. ERDDAP™ może to odczytać subsetVariables tabeli i przetwarzania go bardzo szybko (szczególnie w porównaniu do odczytu wielu plików danych lub uzyskiwania danych z bazy danych lub innej usługi zewnętrznej) .
    * To pozwala ERDDAP™ zrobić 3 rzeczy:
        1. Pozwala ERDDAP™ umieszczanie listy możliwych wartości na liście rozwijanej w Formularzu Dostęp do Danych, tworzenie strony internetowej Graph oraz .subset stron internetowych.
        2. Pozwala ERDDAP™ oferowanie strony .subset dla tego zbioru danych. Ta strona jest interesująca, ponieważ ułatwia znalezienie poprawnych kombinacji wartości tych zmiennych, które dla niektórych zbiorów danych i niektórych zmiennych są bardzo, bardzo trudne (prawie niemożliwe) . Następnie, wszystkie prośby użytkownika o odrębne () podzbiór Zmienne dane będą bardzo szybkie.
        3. Jeśli istnieje żądanie użytkownika, które odnosi się tylko do podzbioru tych zmiennych, ERDDAP™ może szybko przeczytać subsetVariables tabelę i odpowiedź na wniosek. To może zaoszczędzić mnóstwo czasu i wysiłku dla ERDDAP .
    * Kolejność destinationName s można określić określa sortowanie kolejności na * datasetID * .subset strony internetowej, więc zazwyczaj będzie określać najważniejsze zmienne najpierw, a następnie najmniej ważne. Na przykład, dla zbiorów danych z szeregiem czasu dla kilku stacji, można użyć, na przykład,
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
tak, że wartości są sortowane przez station\\ _ id.
    * Oczywiście, to jest twój wybór, które zmienne do włączenia w subsetVariables lista, ale sugerowane użycie jest:
        
Ogólnie rzecz biorąc, zawierać zmienne, dla których chcesz ERDDAP™ wyświetlanie listy rozwijanej opcji na formularzu dostępu do danych (.html) i Make- A- Graph (.graph) stron internetowych.
        
Ogólnie rzecz biorąc, nie zawierają zmiennych z informacjami o funkcjach zbioru danych (stacje, profile i / lub trajektorie, w szczególności z [cdm\\ _ timeseries\\ _ variables](#cdm_timeseries_variables) , [cdm\\ _ profil\\ _ zmienne](#cdm_profile_variables) , [cdm\\ _ trajektoria\\ _ zmienne](#cdm_trajectory_variables) ) . Istnieje tylko kilka różnych wartości dla tych zmiennych, więc działają one dobrze z listy rozwijanej.
        
Nigdy nie włączaj żadnych zmiennych danych związanych z indywidualnymi obserwacjami (np. czas, temperatura, zasolenie, prędkość bieżąca) w subsetVariables lista. Istnieje zbyt wiele różnych wartości dla tych zmiennych, więc lista rozwijanych będzie wolna do wczytania i trudna do pracy z (lub nie działa) .
        
    * Jeśli liczba różnych kombinacji tych zmiennych jest większa niż około 1 000 000, należy rozważyć ograniczenie subsetVariables które określają, aby zmniejszyć liczbę różnych kombinacji do poniżej 1.000.000; w przeciwnym razie, * datasetID * .subset strony internetowe mogą być generowane powoli. W skrajnych przypadkach zestaw danych nie może być załadowany ERDDAP™ ponieważ generowanie listy różnych kombinacji wykorzystuje zbyt wiele pamięci. Jeśli tak, MUSI usunąć pewne zmienne z subsetVariables lista.
    * Jeśli liczba odrębnych wartości którejkolwiek z podgrup zmiennych jest większa niż około 20 000, należy wziąć pod uwagę, aby nie włączać tej zmiennej do listy subsetVariables ; w przeciwnym razie, to zajmuje dużo czasu, aby przekazać * datasetID * .subset, * datasetID * .graph, oraz * datasetID * .html strony internetowe. Ponadto, na Mac, jest bardzo trudno dokonać wyboru z listy rozwijanej z ponad 500 elementów z powodu braku paska przewijania. Kompromis polega na: usuwaniu zmiennych z listy, gdy użytkownicy nie mogą wybrać wartości z listy rozwijanej.
    * Należy przetestować każdy zestaw danych, aby sprawdzić, czy subsetVariables Ustawienie jest w porządku. Jeśli serwer danych źródłowych jest powolny i trwa zbyt długo (lub nie) do pobrania danych, albo zmniejszyć liczbę podanych zmiennych lub usunąć subsetVariables atrybut globalny.
    * Subset Zmienne są bardzo przydatne. Więc jeśli zestaw danych jest odpowiedni, proszę utworzyć subsetVariables atrybut.
    * Tabela EDDFrom SOS automatycznie dodaje
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
kiedy zostanie utworzony zestaw danych.
        * Możliwe ostrzeżenie: jeśli użytkownik * datasetID * .subset strony internetowej wybiera wartość, która ma znak travegeReturReturn lub newline, * datasetID * Podzbiór zawiedzie. ERDDAP™ nie może pracować wokół tego problemu z powodu niektórych szczegółów HTML. W każdym razie, prawie zawsze dobrym pomysłem jest usunięcie z danych znaków powrotu i nowej linii. Aby pomóc rozwiązać problem, jeśli EDDTable. subsetVariables Metoda DataTable w ERDDAP wykrywa wartości danych, które będą powodować problemy, będzie e-mail ostrzeżenie z listą obraźliwych wartości do e-mail Wszystko Do adresów email określonych w setup.xml. W ten sposób wiesz, co trzeba naprawić.
        *    **Wstępnie wygenerowane tabele podzbioru.** Zazwyczaj, gdy ERDDAP™ ładuje zbiór danych, żąda odrębnego () subset tabeli danych zmiennych ze źródła danych, tylko poprzez zwykłe żądanie danych. W niektórych przypadkach dane te nie są dostępne ze źródła danych lub pobieranie ze źródła danych może być trudne dla serwera źródła danych. Jeśli tak, można dostarczyć tabelę z informacjami w .json lub .csv plik z nazwą *tomcat* / content / erddap / subset / * datasetID *  .json   (lub .csv) . Jeżeli występuje, ERDDAP™ przeczyta go raz, gdy zestaw danych jest załadowany i użyje go jako źródła danych podset.
            * Jeśli podczas odczytu pojawi się błąd, zbiór danych nie zostanie wczytany.
            * MUSI mieć dokładnie te same nazwy kolumn (na przykład, ten sam przypadek) jako&lt; subsetVariables &gt;, ale kolumny MOŻE być w dowolnej kolejności.
            * Może mieć dodatkowe kolumny (zostaną usunięte i nowe zbędne wiersze zostaną usunięte) .
            * Brak wartości powinno brakować wartości (nie fałszywe numery jak -99) .
            *    .json pliki mogą być nieco trudniejsze do stworzenia, ale radzić sobie z znaków Unicode dobrze. .json pliki są łatwe do utworzenia, jeśli je utworzyć z ERDDAP .
            * Pliki .csv są łatwe w obsłudze, ale nadają się tylko do znaków ISO 8859-1. Pliki .csv MUSI mieć nazwy kolumn w pierwszym wierszu i dane w kolejnych wierszach.
        * Dla ogromnych zbiorów danych lub kiedy&lt; subsetVariables &gt; jest źle skonfigurowana, tabela kombinacji wartości może być wystarczająco duża, aby spowodować błędy zbyt wiele danych lub OutOfMemory. Rozwiązaniem jest usunięcie zmiennych z listy&lt; subsetVariables &gt; dla których istnieje duża liczba wartości, lub usunąć zmienne w razie potrzeby, aż wielkość tej tabeli jest rozsądna. Niezależnie od błędu, części ERDDAP™ które wykorzystują subsetVariables system nie działa dobrze (np. strony internetowe ładują bardzo powoli) gdy jest zbyt wiele rzędów (np. ponad milion) w tym stole.
        *    subsetVariables nie ma nic wspólnego z określeniem zmiennych, których użytkownicy mogą używać w ograniczeniach, tj. jak użytkownicy mogą wymagać podzbiorów zbioru danych. ERDDAP™ zawsze pozwala na stosowanie ograniczeń w odniesieniu do którejkolwiek ze zmiennych.
###### Jednostki czasowe{#time-units} 
 [Czas i znacznik czasu](#time-units) kolumny powinny zawierać ISO 8601: 2004 (E) sformatowana data + czas Struny Z (na przykład, 1985-01-31T15: 31: 00Z) .
             
###### streszczenie{#summary} 
*    [ **streszczenie** ](#summary)   (od [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) oraz [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) normy metadanych) jest to globalny atrybut WYMAGANY z długim opisem zbioru danych (zazwyczaj&lt;500 znaków). Na przykład:
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * Albo zbiór danych jest globalny [sourceAtrybuty](#global-attributes) lub jego globalny&lt; addAttributes &gt; MUSI zawierać ten atrybut.
    * podsumowanie jest bardzo ważne, ponieważ pozwala klientom przeczytać opis zbioru danych, który ma więcej informacji niż tytuł, a tym samym szybko zrozumieć, co jest zbiorem danych.
    * Doradztwo: proszę napisać streszczenie, aby można było opisać zbiór danych jakiejś przypadkowej osobie spotykanej na ulicy lub koledze. Pamiętaj, aby włączyć [Pięć W i jeden H](https://en.wikipedia.org/wiki/Five_Ws) Kto stworzył zestaw danych? Jakie informacje zostały zebrane? Kiedy zebrano dane? Gdzie go zebrano? Dlaczego go zebrano? Jak go zebrano?
    *    ERDDAP™ wyświetla podsumowanie na formularzu dostępu do danych ( * datasetID * .html) , Zrób stronę wykresu ( * datasetID * .graph) oraz innych stron internetowych. ERDDAP™ wykorzystuje podsumowanie przy tworzeniu dokumentów FGDC i ISO 19115.
######  testOutOfDate  {#testoutofdate} 
*    [ ** testOutOfDate ** ](#testoutofdate)   (fakultatywny ERDDAP -specyficzny atrybut globalnych metadanych, nie z żadnego standardu) określa, w uproszczony sposób, kiedy dane dotyczące zbioru danych w czasie bliskim-real- time są uważane za niedostępne, określone jako now-  *nUnits* na przykład: now- 2 dni dla danych, które zwykle pojawiają się 24- 48 godzin po wartości czasu. Dla prognozowanych danych, użyj teraz **+**  *nUnits* na przykład teraz + 6 dni dla prognozowanych danych, które są najwyżej 8 dni w przyszłości. (Patrz [ now-  *nUnits* Opis składni](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) .) Jeżeli maksymalna wartość czasu dla zbioru danych jest świeższa niż określony czas, zbiór danych jest uważany za up- to- date. Jeżeli maksymalna wartość czasu jest starsza od określonego czasu, zbiór danych jest uważany za up- to- date. W przypadku zbiorów danych poza terminem, istnieje prawdopodobnie problem ze źródłem danych, więc ERDDAP™ nie jest w stanie uzyskać dostępu do danych z ostatnich punktów czasowych.
    
W testOutOfDate wartość jest wyświetlana jako kolumna w [ allDatasets zbiór danych](#eddtablefromalldatasets) w ERDDAP . Jest również stosowany do obliczania indeksu outOfDate, który jest inną kolumną w allDatasets zestaw danych.
Jeśli indeks&lt;1, zbiór danych jest uważany za up- to- date.
Jeśli indeks&lt;= 1, zbiór danych jest uważany za niedostępny.
Jeśli indeks&lt;= 2, zbiór danych jest uważany za bardzo przestarzały.
    
W testOutOfDate wartość jest również używana przez ERDDAP™ do generowaniahttps://*yourDomain*/erddap/outOfDateDatasets.htmlstrona internetowa ( [przykład](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) ) który pokazuje zbiory danych, które mają&lt; testOutOfDate &gt; tagi, z zestawami danych w rankingu według tego, jak są nieaktualne. Jeśli zmienisz typ pliku (od .html do .csv, .jsonlCSV , .nc , .tsv ...) , można uzyskać te informacje w różnych formatach plików.
    
Jeśli to możliwe, [GenerateDatasetsXml](#generatedatasetsxml) dodaje testOutOfDate atrybut globalny addAttributes zestawu danych. Wartość ta jest sugestią opartą na informacjach dostępnych GenerateDatasetsXml. Jeśli wartość nie jest odpowiednia, zmień ją.
    
"Out- of- date" tutaj jest bardzo różne od [&lt;przeładowanie Każda minuta &gt;] (# reloadeverynminutes) , który dotyczy jak up- to- date ERDDAP Wiedza o zbiorze danych jest. W&lt; testOutOfDate &gt; system zakłada, że ERDDAP Wiedza o zbiorze danych jest aktualna. Pytanie&lt; testOutOfDate &gt; hands with is: czy wydaje się, że jest coś nie tak ze źródłem danych, powodując, że bardziej aktualne dane nie są dostępne przez ERDDAP ?
    
###### tytuł{#title} 
*    [ **tytuł** ](#title)   (od [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) oraz [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) normy metadanych) jest wymaganym atrybutem globalnym z krótkim opisem zbioru danych (zazwyczaj&lt;= 95 znaków). Na przykład:
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * Albo zbiór danych jest globalny [sourceAtrybuty](#global-attributes) lub jego globalny&lt; addAttributes &gt; MUSI zawierać ten atrybut.
    * tytuł jest ważny, ponieważ każda lista zestawów danych prezentowanych przez ERDDAP   (inne niż wyniki wyszukiwania) wymienia zbiory danych w porządku alfabetycznym według tytułu. Więc jeśli chcesz określić kolejność zbiorów danych, lub mieć kilka zbiorów danych zgrupowanych razem, musisz tworzyć tytuły z myślą o tym. Wiele list zbiorów danych (na przykład w odpowiedzi na wyszukiwanie kategorii) , pokazać podzbiór pełnej listy i w innej kolejności. Więc tytuł dla każdego zbioru danych powinien być samodzielny.
    * Jeżeli tytuł zawiera słowo "DEPRECATED" (wszystkie litery kapitałowe) , wtedy zbiór danych otrzyma niższy ranking w poszukiwaniu.
             
##### &lt; axisVariable & gt;{#axisvariable} 
* [ ** &lt; axisVariable &gt; ** ] (# axisvariable) jest stosowany do opisu wymiaru (nazywane również "osią") .
Dla EDDGrid Zestawy danych, jeden lub więcej axisVariable tagi są WYMAGANE, i wszystko [ dataVariable s](#datavariable) zawsze udostępniaj / używaj wszystkich zmiennych osi. ( [Dlaczego?](#why-just-two-basic-data-structures)   [A jeśli nie?](#dimensions) )   
Musi istnieć zmienna osi dla każdego wymiaru zmiennych danych.
Zmienne osiowe MUSI być określone w kolejności, w której zmienne danych ich używają.
(Zestawy danych EDDTable NIE mogą być używane&lt; axisVariable &gt; tagi.)
Przykładem jest:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt; axisVariable &gt; obsługuje następujące subtagi:
###### &lt; sourceName \\ & gt;{#sourcename} 
* [&lt; sourceName \\ &gt;] (# sourcename) -- nazwa źródła danych dla zmiennej. To jest imię, które ERDDAP™ będzie wykorzystywać przy żądaniu danych ze źródła danych. To jest imię, które ERDDAP™ będzie szukać, gdy dane są zwracane ze źródła danych. To delikatna sprawa. To jest konieczne.
###### &lt; destinationName \\ & gt;{#destinationname} 
* [&lt; destinationName \\ &gt;] (# destinationname) jest nazwą zmiennej, która zostanie pokazana i użyta przez ERDDAP™ użytkowników.
    * To jest optyczne. W przypadku nieobecności sourceName jest używany.
    * Jest to użyteczne, ponieważ pozwala na zmianę tajemniczego lub dziwnego sourceName .
    *    destinationName jest wrażliwy na przypadki.
    *    destinationName MUSI zacząć od litery (A- Z, a- z) i MUSI być następnie 0 lub więcej znaków (A- Z, a- z, 0- 9 i\\ _) . ("-" było dozwolone wcześniej ERDDAP™ wersja 1.10.) Ograniczenie to pozwala na to, aby nazwy zmiennych osi były takie same w ERDDAP™ , w plikach odpowiedzi oraz we wszystkich programach, w których pliki te będą używane, w tym w językach programowania (jak Python , Matlab oraz Java Skrypt) jeżeli istnieją podobne ograniczenia dotyczące nazw zmiennych.
    * W EDDGrid zbiory danych, [długość, szerokość, wysokość, głębokość i czas](#destinationname) zmienne osi są specjalne.
         
######  axisVariable  &lt;addAttributes&gt; {#axisvariable-addattributes} 
* [&lt; addAttributes &gt;] (# variable- addattriates) definiuje optyczny zestaw atrybutów ( *nazwa* = *wartość* ) które są dodawane do atrybutów źródła dla zmiennej, aby połączyć atrybuty dla zmiennej.
Jeśli zmienna jest [sourceAtrybuty](#variable-addattributes) lub&lt; addAttributes &gt; obejmują [ scale\\_factor lub add\\_offset ](#scale_factor) atrybuty, ich wartości zostaną wykorzystane do rozpakowania danych ze źródła przed dystrybucją do klienta
     (wynik Wartość = źródło Wartość\\ * scale\\_factor + add\\_offset ) . Niezapakowana zmienna będzie tego samego typu danych (na przykład, float) jako scale\\_factor oraz add\\_offset wartości.
         
##### &lt; dataVariable & gt;{#datavariable} 
* [ ** &lt; dataVariable &gt; ** ] (# datavariable) jest wymagane (dla prawie wszystkich zbiorów danych) tag wewnątrz&lt;dataset &gt; tag, który jest używany do opisu zmiennej danych. Musi być jeden lub więcej przypadków tego znacznika. Przykładem jest:

>&nbsp;&nbsp;&lt;dataVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>waterTemperature&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>sea\\_water\\_temperature&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataType>](#datatype)float&lt;/dataType>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Water Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[standard\\_name](#standard_name)">sea\\_water\\_temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/dataVariable>  

&lt; dataVariable &gt; obsługuje następujące subtagi:
###### &lt; sourceName & gt;{#sourcename-1} 
* [&lt; sourceName &gt;] (# sourcename) -- nazwa źródła danych dla zmiennej. To jest imię, które ERDDAP™ będzie wykorzystywać przy żądaniu danych ze źródła danych. To jest imię, które ERDDAP™ będzie szukać, gdy dane są zwracane ze źródła danych. To delikatna sprawa. To jest konieczne.
###### Grupy{#groups} 
CF dodał wsparcie dla grup o CF v1.8. Począwszy od ~ 2020, NetCDF narzędzia wspierają umieszczanie zmiennych w grupach w .nc plik. W praktyce oznacza to, że zmienne mają długą nazwę, która identyfikuje grupę (s) oraz nazwę zmiennej, na przykład group1a / group2c / varName). ERDDAP™ obsługuje grupy poprzez konwersję "/" 's w zmiennej&lt; sourceName &gt; w zmiennej "\\ _"&lt; destinationName &gt;, na przykład, group1a\\ _ group2c\\ _ varName. (Kiedy to widzicie, powinniście zrozumieć, że grupy nie są czymś więcej niż konwencją składniową.) Kiedy zmienne są wymienione w ERDDAP™ wszystkie zmienne w grupie pojawią się razem, naśladując grupę bazową. \\[ Jeśli ERDDAP™ , w szczególności GenerateDatasets Xml, nie działa tak dobrze, jak to możliwe z plików źródłowych, które mają grupy, proszę wysłać plik próbki do Chrisa. John w Noa.gov. \\] 

Zestawy plików EDDTableFromFiles mogą używać niektórych specjalnie zakodowanych pseudo sourceName s do zdefiniowania nowych zmiennych danych, np. do promowania globalnego atrybutu jako zmiennej danych. Patrz [ta dokumentacja](#pseudo-sourcenames) .
######  HDF Struktury{#hdf-structures} 
Począwszy od ERDDAP™ v2.12, EDDGrid Pliki FromNci EDDGrid Pliki FromNcNiezapakowany może odczytać dane z "struktur" w .nc 4 oraz .hdf 4 pliki. Aby zidentyfikować zmienną pochodzącą ze struktury,&lt; sourceName &gt; musi stosować format: *fullStructureName*  |  *memberName* , na przykład group1 / myStruct | Mój Członek.

###### Wartość stała Nazwa pożywki{#fixed-value-sourcenames} 
W zbiorze danych EDDTable, jeśli chcesz utworzyć zmienną (o pojedynczej, stałej wartości) którego nie ma w zbiorze danych źródłowych, użyj:
```
    <sourceName>=*fixedValue*</sourceName>  
```
Znak początkowy równa się mówi ERDDAP™ że stałe Wartość będzie następująca.

* Dla zmiennych liczbowych stała wartość musi być pojedynczą wartością skończoną lub NaN (nieczuły przypadek, np.\\ = NaN) .
* Dla zmiennych String stała wartość musi być pojedyncza, [ciąg w stylu JSON-](https://www.json.org/json-en.html)   (ze specjalnymi znakami, które uciekły z\\ znakami) , np.\\ = "My\\" Special\\ "String".
* Dla zmiennej timestamp podać stałą wartość jako liczbę w "seconds since 1970-01-01T00:00:00Z" i stosowanie
jednostki = sekundy od 1970- 01-01T00: 00: 00Z.
    
Pozostałe znaczniki dla&lt; dataVariable &gt; działa tak, jakby była to zmienna regularna.
Na przykład, aby utworzyć zmienną o stałej wartości 0,0 (float) , stosować:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

W nietypowych sytuacjach można nawet określić actual\\_range addAttribute, który obejmie oczekiwane wartości destinationMin i destinationMax (które w przeciwnym razie byłyby równe stałej Wartość) .
 
###### Script SourceNames / Zmienne pochodne{#script-sourcenamesderived-variables} 
Począwszy od ERDDAP™ v2.10, w [Pliki EDDTableFromFiles](#eddtablefromfiles) , [EDDTableFromDatabase](#eddtablefromdatabase) lub [Nazwy EDDTableFromFileName](#eddtablefromfilenames) zestaw danych,&lt; sourceName &gt; może być
wyrażenie (równanie wyceniane do jednej wartości) , przy użyciu formatu
```
    <sourceName>=*expression*</sourceName>  
```
lub skrypt (seria poleceń, które zwracają pojedynczą wartość) , przy użyciu formatu
```
    <sourceName>=*script*</sourceName>  
```
 ERDDAP™ opiera się na [Projekt Apache](https://www.apache.org/)   [ Java Język ekspresji (JEXL) ](https://commons.apache.org/proper/commons-jexl/)   (licencja: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) aby ocenić wyrażenia i uruchomić skrypty.
Obliczenie dla danej nowej zmiennej odbywa się w jednym wierszu wyników, wielokrotnie dla wszystkich wierszy.
Wyrażenia i skrypty używają Java - oraz Java Skrypt-jak składnia i może korzystać z dowolnego z
 [operatorzy i metody wbudowane w JEXL](https://commons.apache.org/proper/commons-jexl/reference/syntax.html) .
Skrypty mogą również stosować metody (funkcje) z tych klas:
*    [Kalendar2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2) , który jest owijaczem dla niektórych z metod statycznych, czasowych i związanych z kalendarzem w com.cohort.util.Calendar2 ( [licencja](/acknowledgements#cohort-software) ) . Na przykład:
Calendar2.parseToEpochSeconds ( *sourceTime, data Format czasu* ) będzie analizować źródło Łańcuch czasu poprzez łańcuch dateTimeFormat i zwraca "seconds since 1970-01-01T00:00:00Z"   (epochSeconds) podwójna wartość.
*    [Matematyka](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math) , który jest owijaczem dla prawie wszystkich statycznych, matematycznych metod w [Java.lang. Matematyka](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html) . Na przykład, Math.atan2 ( *y, x* ) przyjmuje współrzędne prostokątne (y, x) i zwraca współrzędne biegunowe (tablicę podwójnych \\[ r, theta \\] ) .
*    [Math2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2) , który jest owijaczem dla prawie wszystkich statycznych, matematycznych metod w com.cohort.utilt. Math2 ( [licencja](/acknowledgements#cohort-software) ) . Na przykład:
Math2.rondTo ( *d, nPlaces* ) zaokrągla d do określonej liczby cyfr po prawej stronie przecinka.
* String, który daje dostęp do wszystkich statycznych, String- związane z metodami w [Java.lang. String](https://docs.oracle.com/javase/8/docs/api/java/lang/String) . String obiektów w ERDDAP™ wyrażenia i skrypty mogą używać dowolnego z ich powiązanych Java metody opisane w java.lang. Dokumentacja strun. Na przykład, String.valueOf (d) przekształci podwójną wartość d w String (chociaż można również użyć "" + d) .
*    [String2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2) , który jest owijaczem dla większości metod statycznych, String- i związanych z array- w com.cohort.util.String2 ( [licencja](/acknowledgements#cohort-software) ) . Na przykład, String2 .z eroPad ( *number, nDigits* ) doda 0 w lewo od numeru String tak, że całkowita liczba cyfr jest nDigits (np. String2 .z eroPad ("6", 2) wróci "06") .
*    [wiersz](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row) , który posiada niestatyczne metody dostępu do danych z różnych kolumn w bieżącym wierszu tabeli danych źródłowych. Na przykład, row.columnString ("rok") odczytuje wartość z kolumny "rok" jako String, podczas gdy, row.column Int ("rok") odczytuje wartość z kolumny "rok" jako liczbę całkowitą.

Ze względów bezpieczeństwa wyrażenia i skrypty nie mogą używać innych klas niż te 6. ERDDAP™ wymusza to ograniczenie poprzez utworzenie domyślnej czarnej listy (który zawiera czarną listę wszystkich klas) a potem białas (które w szczególności pozwala na 6 klas opisanych powyżej) . Jeśli potrzebujesz innych metod i / lub innych zajęć, aby wykonać swoją pracę, prosimy wysłać swoje prośby do Chrisa. John w Noa.gov.
    
###### Efektywność
Dla zbiorów danych EDDTableFromFiles istnieje tylko bardzo, bardzo minimalne (prawdopodobnie nie zauważalne) spowolnienie dla wniosków o dane z tych zmiennych. Dla EDDTableFromDatabase istnieje ogromna kara za prędkość dla wniosków, które obejmują ograniczenia tych zmiennych (np., (& Instalode0360 &gt; 30 & Instalode0360&lt;40) ponieważ ograniczenia nie mogą być przekazywane do bazy danych, więc baza danych musi zwrócić znacznie więcej danych do ERDDAP™   (co jest bardzo czasochłonne) Więc... ERDDAP™ może utworzyć nową zmienną i zastosować ograniczenie. Aby uniknąć najgorszego przypadku (jeżeli nie ma ograniczeń przekazywanych do bazy danych) , ERDDAP™ wyrzuca komunikat błędu, aby baza danych nie musiała zwracać całej zawartości tabeli. (Jeśli chcesz to obejść, dodaj ograniczenie do kolumny nieskryptowej, która zawsze będzie prawdziwa, np., & time&lt;3000- 01- 01) Z tego powodu, z EDDTableFromDatabase, prawdopodobnie zawsze lepiej jest utworzyć kolumnę pochodną w bazie danych zamiast używać sourceName = skrypt ERDDAP .

###### Przegląd Jak wyrazić (Lub skrypt) Jest używany:
W odpowiedzi na prośbę użytkownika o dane tabelaryczne, ERDDAP™ pobiera dane z serii plików źródłowych. Każdy plik źródłowy wygeneruje tabelę surowych (prosto ze źródła) dane. ERDDAP™ będzie następnie przejść przez tabelę surowych danych, wiersz po wierszu, i ocenić wyrażenie lub skrypt raz dla każdego wiersza, w celu stworzenia nowej kolumny, która ma to wyrażenie lub skrypt jako sourceName .
    
###### GenerateDatasetsXml
Uwaga: GenerateDatasets Xml jest całkowicie nieświadomy, gdy istnieje potrzeba utworzenia zmiennej z&lt; sourceName &gt; = *wyrażenie* &lt;/ sourceName &gt;. Musisz utworzyć zmienną w datasets.xml ręcznie.

###### Przykłady wyrażeń:
Oto kilka kompletnych przykładów zmiennych danych, które używają wyrażenia do tworzenia nowej kolumny danych. Oczekujemy, że te przykłady (i ich warianty) będzie obejmować około 95% wykorzystania wszystkich ekspresji sourceName b.

###### Łączenie oddzielnej "daty" oraz "time" kolumny w ujednoliconej kolumnie czasu:
```
    <dataVariable>
        <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("date") + "T" + 
            row.columnString("time") + "Z", "yyyy-MM-dd'T'HH:mm:ss'Z'")</sourceName> 
        <destinationName>time</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">seconds since 1970-01-01</att>
        </addAttributes>
    </dataVariable>
```
To sourceName wyrażenie sprawia, że nowy "time" kolumna przez złączenie wartości String z "date" ( yyyy-MM-dd ) oraz "time"   (HH: mm: ss) kolumny w każdym wierszu pliku źródłowego i przez konwersję tego łańcucha w "seconds since 1970-01-01"   (epochSeconds) podwójna wartość.

Lub oczywiście, będziesz musiał dostosować ciąg format czasu do konkretnego formatu w każdym datach i kolumnach czasu, patrz
 [dokumentacja jednostek czasowych](#string-time-units) .

Technicznie, nie musisz używać Calendar2.parseToEpochSeconds () do konwersji połączonej daty + czasu na epochSeconds. Możesz po prostu przekazać datę + czas String do ERDDAP™ i określić format (np.,
 yyyy-MM-dd Nie 'HH: mm: ss' Z ') poprzez atrybut jednostek. Ale istnieją znaczące zalety konwersji do epochSeconds - w szczególności, EDDTableFromFiles może łatwo śledzić zakres wartości czasu w każdym pliku i tak szybko zdecydować, czy szukać w danym pliku podczas odpowiedzi na żądanie, które ma ograniczenia czasowe.

Pokrewnym problemem jest potrzeba stworzenia ujednoliconej daty + kolumny czasu ze źródła z oddzielnym rokiem, miesiącem, datą, godziną, minutą, sekundą. Rozwiązanie jest bardzo podobne, ale często trzeba zeropad wiele pól, tak, że na przykład miesiąc (1 - 12) i data (1-31) zawsze mają dwie cyfry. Oto przykład z roku, miesiąca, daty:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
Pokrewnym problemem jest potrzeba stworzenia jednolitej kolumny szerokości lub długości geograficznej poprzez połączenie danych w odrębnych stopniach, minutach i sekundach tabeli źródłowej, z których każda jest zapisywana jako liczba całkowita. Na przykład:
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### Konwersja kolumny o nazwach "lon" o wartościach długości geograficznej od 0 do 360 ° na kolumnę o nazwach "long" o wartościach od -180 do 180 °
```
    <dataVariable>
        <sourceName>=Math2.anglePM180(row.columnDouble("lon"))</sourceName> 
        <destinationName>longitude</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">degrees\\_east</att>
        </addAttributes>
    </dataVariable>
```
To sourceName wyrażenie tworzy nową kolumnę "długość geograficzna" poprzez konwersję podwójnej wartości z kolumny "lon" w każdym wierszu pliku źródłowego (przypuszczalnie z wartościami 0 - 360) i przez przekształcenie tego w -180 do 180 podwójną wartość.

Jeśli zamiast tego chcesz przekonwertować wartości długości geograficznej źródła -180 - 180 ° na 0 - 360 °, użyj
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
Nazewnictwo dwóch zmiennych długości:
Jeśli zbiór danych będzie miał 2 zmienne długości geograficznej, zalecamy użycie destinationName = długość geograficzna zmiennej -180 - 180 ° oraz destinationName = 0360 (i longName =\\ "Długość geograficzna 0- 360 °") dla zmiennej 0 - 360 °. Jest to ważne, ponieważ użytkownicy czasami używają Advanced Search do wyszukiwania danych w określonym przedziale długości geograficznej. To wyszukiwanie będzie działać lepiej, jeśli długość geograficzna ma stałe -180 - 180 ° wartości dla wszystkich zbiorów danych. Ponadto atrybuty geoprzestrzenne zbioru danych\\ _ lon\\ _ min, geoprzestrzenne\\ _ lon\\ _ max, Westernmost\\ _ Easting i Easternmost\\ _ Eastings będą ustawiane w spójny sposób (o długościach od -180 do 180 °) ;
    
###### Konwersja kolumny o nazwie "tempF" z wartościami temperatury w stopniach\\ _ F do kolumny o nazwie "tempC" z temperaturami w stopniach\\ _ C:
```
    <dataVariable>
        <sourceName>=(row.columnFloat("tempF")-32)\\*5/9</sourceName> 
        <destinationName>tempC</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_C</att>
        </addAttributes>
    </dataVariable>
```
To sourceName wyrażenie tworzy nową kolumnę "tempC" poprzez przekształcenie stopnia float\\ _ Wartość F z kolumny "tempF" w każdym wierszu pliku źródłowego do poziomu float\\ _ Wartość C.

Zauważ, że Twój zestaw danych może mieć zarówno pierwotną temperaturę Zmienna F i nowa temperatura Zmienna C poprzez posiadanie innej zmiennej z
```
    <sourceName>tempF</sourceName>
```
###### Konwersja kolumn "prędkość" i "kierunek" na dwie kolumny z u, V części
* Aby dokonać u zmiennej, użyj
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* Aby utworzyć zmienną v, użyj
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
Lub, pod warunkiem u, v:
* Aby zmienić prędkość, użyj
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* Aby zmienić kierunek, użyj
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### Przykład skryptu:
Oto przykład użycia skryptu, nie tylko wyrażenia, jako sourceName . Oczekujemy, że skrypty, w przeciwieństwie do wyrażeń, nie będą często potrzebne. W tym przypadku celem jest zwrócenie brakującej wartości non-NaN (- 99) dla wartości temperatury poza określonym zakresem. Zauważ, że skrypt jest częścią po "=".
```
    <dataVariable>
        <sourceName>=var tc=row.columnFloat("tempC"); return tc&gt;35 || tc&lt;-5? -99.0f : tc\\*9/5+32;</sourceName> 
        <destinationName>tempF</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_F</att>
        </addAttributes>
    </dataVariable>
```
###### Twarda flaga
Jeśli zmienisz wyrażenie lub skrypt zdefiniowane w sourceName , musisz ustawić [flaga twarda](/docs/server-admin/additional-information#hard-flag) dla zbioru danych ERDDAP™ usuwa wszystkie informacje buforowane dla zbioru danych i ponownie odczytuje każdy plik danych (przy użyciu nowego wyrażenia lub skryptu) następnym razem, gdy załaduje zestaw danych. Alternatywnie, można użyć [DasDs](#dasdds) co odpowiada określeniu twardej flagi.

###### Procent kodu
Jest to jedynie rzadko istotne: Ponieważ wyrażenia i skrypty są zapisane w datasets.xml , który jest dokumentem XML, musisz procent kodować dowolny&lt;,\\ &gt; i & znaki w wyrażeniach i skryptach jako&lt;, & gt; i & amp;.

###### Wspólne problemy
Powszechnym problemem jest stworzenie zmiennej z sourceName = *wyrażenie* ale wynikowa kolumna danych ma tylko brakujące wartości. Alternatywnie, niektóre wiersze nowej kolumny mają brakujące wartości i myślisz, że nie powinny. Podstawowym problemem jest to, że coś jest nie tak z wyrażeniem i ERDDAP konwertuje ten błąd na brakującą wartość. Aby rozwiązać problem,

* Spójrz na wyrażenie, aby zobaczyć, co może być problemem.
* Zajrzyj. [log.txt](/docs/server-admin/additional-information#log) , który pokaże pierwszą wiadomość o błędzie wygenerowaną podczas tworzenia każdej nowej kolumny.

Częste przyczyny to:

* Użyłeś złej sprawy. Wyrażenia i skrypty są delikatne.
* Pominąłeś nazwę klasy. Na przykład, musisz użyć Math.abs () , nie tylko mięśnie brzucha () .
* Nie robiłaś konwersji typu. Na przykład, jeśli parametrem jest typ danych String i masz podwójną wartość, musisz przekonwertować podwójny na String przez "" + d.
* Nazwa kolumny w wyrażeniu nie pasuje do nazwy kolumny w pliku (lub nazwa może być inna w niektórych plikach) .
* Jest błąd składni w wyrażeniu (np. brakujące lub dodatkowe ") ").

Jeśli utkniesz lub będziesz potrzebował pomocy,
Proszę podać szczegóły i zobaczyć [rozdział dotyczący uzyskania dodatkowego wsparcia](/docs/intro#support) .
        
###### &lt; destinationName & gt;{#destinationname-1} 
* [&lt; destinationName &gt;] (# destinationname) -- nazwa zmiennej, która zostanie pokazana i użyta przez ERDDAP™ użytkowników.
    * To jest optyczne. W przypadku nieobecności [ sourceName ](#sourcename) jest używany.
    * Jest to użyteczne, ponieważ pozwala na zmianę tajemniczego lub dziwnego sourceName .
    *    destinationName jest wrażliwy na przypadki.
    *    destinationName MUSI zacząć od litery (A- Z, a- z) i MUSI być następnie 0 lub więcej znaków (A- Z, a- z, 0- 9 i\\ _) . ("-" było dozwolone wcześniej ERDDAP™ wersja 1.10.) Ograniczenie to pozwala na to, aby nazwy zmiennych danych były takie same w ERDDAP™ , w plikach odpowiedzi oraz we wszystkich programach, w których pliki te będą używane, w tym w językach programowania (jak Python , Matlab oraz Java Skrypt) jeżeli istnieją podobne ograniczenia dotyczące nazw zmiennych.
    * W zbiorach danych EDDTable, [długość, szerokość, wysokość (lub głębokość) oraz czas](#destinationname) zmienne danych są specjalne.
             
###### &lt;dane Typ & gt;{#datatype} 
* [&lt;Data Typ &gt;] (# datatype) -- określa typ danych pochodzący ze źródła. (W niektórych przypadkach, na przykład, czytając dane z plików ASCII, określa on sposób przechowywania danych pochodzących ze źródła.) 
    * Jest to wymagane przez niektóre typy danych i IGNORED przez inne. Typy danych, które wymagają tego dla swoich dataVariable s są: EDDGrid Pliki From XxxFiles, EDDTableFromXxxFiles, EDDTableFromM WFS , EDDTableFromNOS, EDDTableFrom SOS . Inne typy zbiorów danych ignorują ten znacznik, ponieważ otrzymują informacje ze źródła.
         
    * Ważne wartości są jednym ze standardowych [ ERDDAP™ typy danych](#data-types) plus boolean (zob. poniżej) . Nazwy DataType są wrażliwe na przypadek.
         
###### dane boolean{#boolean-data} 
*    ["boolean"](#boolean-data) to specjalny przypadek.
    * Wewnętrznie, ERDDAP™ nie obsługuje typu boolean, ponieważ boolean nie może przechowywać brakujących wartości, a większość typów plików nie obsługuje boolean. Poza tym, DAP nie obsługuje boolean, więc nie byłoby standardowego sposobu na zapytanie boolean zmiennych.
    * Określanie "boolean" dla danych Rodzaj datasets.xml spowoduje zapisywanie i reprezentowanie wartości boolean jako bajtów: 0 = false, 1 = true, 127 = missing\\_value .
    * Użytkownicy mogą określić ograniczenia za pomocą wartości liczbowych (na przykład "isAlive = 1") .
    *    ERDDAP™ administratorzy czasami potrzebują użyć danych "boolean" Rodzaj datasets.xml powiedzieć ERDDAP™ jak oddziaływać ze źródłem danych (np. do odczytu wartości boolean z relacyjnej bazy danych i konwersji ich do 0, 1 lub 127) .
         
* Jeśli chcesz zmienić zmienną danych z dataType w plikach źródłowych (na przykład, krótkie) do niektórych innych danych Typ zbioru danych (na przykład, int) , nie używaj&lt;dataType &gt;, aby określić, co chcesz. (Działa dla niektórych rodzajów zbiorów danych, ale nie dla innych.) Zamiast tego:
    * Stosowanie&lt;dataType &gt; do określenia, co znajduje się w plikach (na przykład, krótkie) .
    * W&lt; addAttributes &gt; dla zmiennej, dodać a [ scale\\_factor ](#scale_factor) atrybut z nowymi danymi Rodzaj (na przykład, int) oraz wartość 1, na przykład,
```
            <att name="scale\\_factor" type="int">1</att>  
```
######  dataVariable  &lt;addAttributes&gt; {#datavariable-addattributes} 
* [&lt; addAttributes &gt;] (# variable- addattriates) -- definiuje zbiór atrybutów ( *nazwa* = *wartość* ) które są dodawane do atrybutów źródła dla zmiennej, aby połączyć atrybuty dla zmiennej. To jest optyczne.
Jeśli zmienna jest [sourceAtrybuty](#variable-addattributes) lub&lt; addAttributes &gt; obejmują [ scale\\_factor lub add\\_offset ](#scale_factor) atrybuty, ich wartości zostaną wykorzystane do rozpakowania danych ze źródła przed dystrybucją do klienta. Niezapakowana zmienna będzie tego samego typu danych (na przykład, float) jako scale\\_factor oraz add\\_offset wartości.
        
###### Zmienna&lt;addAttributes&gt; {#variable-addattributes} 
* [ ** Atrybuty zmienne / zmienne&lt; addAttributes &gt; ** ] (# variable- addattriates) --&lt; addAttributes &gt; jest znacznikiem optycznym w obrębie&lt; axisVariable &gt; lub&lt; dataVariable &gt; tag używany do zmiany atrybutów zmiennej.
    
    *    ** Użyj zmiennej&lt; addAttributes &gt; do zmiany atrybutów zmiennej. **  ERDDAP™ Łączy atrybuty zmiennej ze źródła zbioru danych (** sourceAtrybuty **) i zmienną**  addAttributes  **które definiujesz w datasets.xml   (które mają pierwszeństwo) zrobić zmienną "** combinedAtrybuty ** ", które są co ERDDAP™ Użytkownicy widzą. Tak więc, można użyć addAttributes aby ponownie zdefiniować wartości sourceAtrybuty, dodać nowe atrybuty lub usunąć atrybuty.
    * Zobacz ** &lt; addAttributes &gt; **Informacje] (# addattriates) które stosuje się do globalnych i zmiennych** &lt; addAttributes &gt; ** .
    *    ERDDAP™ szuka i używa wielu z tych atrybutów na różne sposoby. Na przykład, wartości ColorBar są wymagane do udostępnienia zmiennej poprzez WMS tak, aby mapy mogły być wykonane ze spójnych barów kolorów.
    *    [Długość geograficzna, szerokość geograficzna, wysokość (lub głębokość) oraz zmienne czasowe](#destinationname) automatycznie uzyskać wiele odpowiednich metadanych (na przykład: [jednostki](#units) ) .
    * Próbka&lt; addAttributes &gt; dla zmiennej danych jest:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

Atrybut pusty numberOfObservations powoduje atrybut numberOfObservations (jeżeli istnieje) do usunięcia z ostatecznej, połączonej listy atrybutów.
    * Dostarczanie tych informacji pomaga ERDDAP™ zrobić lepszą pracę i pomaga użytkownikom zrozumieć zbiory danych.
Dobre metadane czynią zestaw danych użytecznym.
Niewystarczające metadane czynią zbiór danych bezużytecznym.
Proszę wziąć czas, aby zrobić dobrą pracę z atrybutami metadanych.
    
###### Komentarze o atrybutach zmiennych, które są specjalne w ERDDAP :

######  actual\\_range  {#actual_range} 
*    [ ** actual\\_range ** ](#actual_range) jest atrybutem zmiennej ZALECONEJ. Na przykład:

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* Ten atrybut pochodzi z [CDC COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) oraz [CF 1,7 +](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) standardy metadanych.
* Jeśli występuje, MUSI być tablicą dwóch wartości tego samego typu danych co typ danych docelowych zmiennej, określając rzeczywiste (nie teoretyczne lub dozwolone) minimalne i maksymalne wartości danych dla tej zmiennej.
* Jeśli dane są zapakowane [ scale\\_factor lub add\\_offset ](#scale_factor) , actual\\_range muszą mieć wartości rozpakowane i być tego samego typu danych co wartości niezapakowane.
* Dla niektórych źródeł danych (Na przykład, wszystkie dokumenty EDDTableFrom... Zestawy danych plików) , ERDDAP™ określa actual\\_range każdej zmiennej i ustawia actual\\_range atrybut. Z innymi źródłami danych (na przykład, relacyjne bazy danych, Cassandra, DAP PER, Hyrax ) , może być kłopotliwe lub uciążliwe dla źródła do obliczenia zakresu, więc ERDDAP™ Nie żąda tego. W tym przypadku najlepiej jest ustawić actual\\_range   (szczególnie dla zmiennych długości, szerokości geograficznej, wysokości, głębokości i czasu) przez dodanie actual\\_range atrybut każdej zmiennej [&lt; addAttributes &gt;] (# addattriates) dla niniejszego zbioru danych w datasets.xml na przykład:

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* Dla liczb [Zmienne czasu i znacznika czasu](#time-units) , podane wartości powinny być odpowiednim źródłem (brak miejsca przeznaczenia) wartości liczbowe. Na przykład, jeśli wartości czasu źródła są przechowywane jako "dni od 1985-01-01", a następnie actual\\_range powinien być określony w "dni od 1985-01-01". I jeśli chcesz odnosić się do TERAZ jako drugiej wartości dla danych w czasie blis- real- time, które są okresowo aktualizowane, należy użyć NaN. Na przykład, aby określić zakres danych od 1985-01-17 do TERAZ, użyj

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* Jeśli actual\\_range jest znany (albo przez ERDDAP™ obliczenie go lub przez dodanie go przez&lt; addAttributes &gt;), ERDDAP™ wyświetla go użytkownikowi na formularzu dostępu do danych ( * datasetID * .html) i zrobić strony wykresu ( * datasetID * .graph) dla tego zbioru danych i używać go przy generowaniu metadanych FGDC i ISO 19115. Ponadto, ostatnie 7 dni actual\\_range są używane jako domyślny podzbiór czasu.
* Jeśli actual\\_range jest znany, użytkownicy mogą korzystać z [min () i max () funkcje](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) w przypadku wniosków, co często jest bardzo przydatne.
* Dla wszystkich tabel EDDTable... zbiory danych, jeśli actual\\_range jest znany (przez ciebie określając to lub przez ERDDAP™ Obliczanie go) , ERDDAP™ będzie w stanie szybko odrzucić wszelkie wnioski o dane poza tym zakresem. Na przykład, jeśli najniższa wartość czasu zbioru danych odpowiada 1985-01-17, wówczas wniosek o wszystkie dane od 1985-01-01 do 1985-01-16 zostanie natychmiast odrzucony z komunikatem błędu "Twoje zapytanie nie dało żadnych dopasowanych wyników". To czyni actual\\_range bardzo ważny kawałek metadanych, jak to może zapisać ERDDAP™ dużo wysiłku i zaoszczędzić użytkownikowi dużo czasu. I to podkreśla, że actual\\_range wartości nie mogą być węższe niż rzeczywisty zakres danych; w przeciwnym wypadku, ERDDAP™ może błędnie powiedzieć "Nie ma dopasowanych danych", jeżeli w rzeczywistości istnieją odpowiednie dane.
* Kiedy użytkownik wybiera podzbiór danych i żąda typu pliku zawierającego metadane (na przykład: .nc ) , ERDDAP™ modyfikuje actual\\_range w pliku odpowiedzi, aby odzwierciedlić zakres podzbioru.
* Patrz również: [ data\\_min oraz data\\_max ](#data_min-and-data_max) , które są alternatywnym sposobem określenia actual\\_range . Jednak, są one niezalecane teraz, actual\\_range jest zdefiniowany przez CF 1,7 +.
         
###### Atrybuty paska kolorów{#color-bar-attributes} 
Istnieje kilka atrybutów zmiennych optycznych, które określają sugerowane atrybuty domyślne dla paska kolorów (używane do konwersji wartości danych na kolory na obrazach) dla tej zmiennej.
* Jeśli występują, informacje te są wykorzystywane jako informacje domyślne przez griddap i tabledap gdy tylko zażądasz obrazu używającego paska kolorów.
* Na przykład, gdy dane o długości geograficznej latiunde- gridded są wykreślane jako pokrycie na mapie, pasek kolorów określa jak wartości danych są konwertowane na kolory.
* Posiadanie tych wartości pozwala ERDDAP™ do tworzenia obrazów, które używają konsekwentnego paska kolorów w różnych żądaniach, nawet jeśli czas lub inne wartości wymiarów różnią się.
* Nazwy tych atrybutów zostały stworzone do użycia w ERDDAP . Nie pochodzą ze standardu metadanych.
* Atrybuty związane z paskiem kolorów to:
    *    ** colorBarMinimum ** określa minimalną wartość na pasku kolorów. Na przykład:

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * Jeśli dane są zapakowane [ scale\\_factor lub add\\_offset ](#scale_factor) , określić colorBarMinimum jako wartość niezapakowana.
    * Wartości danych niższe niż colorBarMinimum są reprezentowane przez ten sam kolor co colorBarMinimum wartości.
    * Atrybut powinien być [type = "double"](#attributetype) , niezależnie od typu zmiennej danych.
    * Wartość jest zazwyczaj ładny okrągły numer.
    * Najlepsze praktyki: Zalecamy wartość nieco wyższą od minimalnej wartości danych.
    * Nie ma domyślnej wartości.
*    ** colorBarMaximum ** określa maksymalną wartość na pasku kolorów. Na przykład:

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * Jeśli dane są zapakowane [ scale\\_factor lub add\\_offset ](#scale_factor) , określić colorBarMinimum jako wartość niezapakowana.
    * Wartości danych wyższe niż colorBarMaximum są reprezentowane przez ten sam kolor co colorBarMaximum wartości.
    * Atrybut powinien być [type = "double"](#attributetype) , niezależnie od typu zmiennej danych.
    * Wartość jest zazwyczaj ładny okrągły numer.
    * Najlepsze praktyki: Zalecamy wartość nieco niższą od maksymalnej wartości danych.
    * Nie ma domyślnej wartości.
*    **kolor BarPalette** Określa paletę dla barku. Na przykład:
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * Wszystkie ERDDAP™ instalacje obsługują te standardowe palety: BlackBlueWhite, BlackRedWhite, BlackWhite, BlueWhiteRed, LightRainbow, Ocean, OceanDepth, Rainbow, RedWhiteBlue, ReverseRainbow, Topografia, TopographyDepth \\[ dodany w v1.74 \\] WhiteBlack, WhiteBlueBlack i WhiteRedBlack.
    * Jeśli zainstalowano [dodatkowe palety](/docs/server-admin/additional-information#palettes) , można odnieść się do jednego z nich.
    * Jeśli ten atrybut nie jest obecny, domyślną wartością jest BlueWhiteRed if\\ -1\\ * colorBarMinimum = colorBarMaximum ; w przeciwnym razie domyślną wartością jest Rainbow.
*    **colorBarScale** Określa skalę paska kolorów. Na przykład:
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * Ważne wartości to Linear i Log.
    * Jeśli wartością jest log, colorBarMinimum musi być większa niż 0.
    * Jeśli ten atrybut nie jest obecny, domyślną wartością jest Linear.
*    **kolor BarContinuous** Określa, czy paleta kolorów ma ciągłą paletę kolorów, czy też paleta kolorów ma kilka dyskretnych kolorów. Na przykład:
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * Ważne wartości są strunami true i false.
    * Jeśli ten atrybut nie jest obecny, domyślny jest true.
*    **colorBarNSections** Określa domyślną liczbę sekcji na pasku kolorów. Na przykład:
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * Ważne wartości to dodatnie liczby całkowite.
    * Jeśli ten atrybut nie jest obecny, domyślny jest\\ -1, który mówi ERDDAP™ wybrać liczbę sekcji na podstawie zakresu paska kolorów.
######  WMS  {#wms} 
Główne wymagania dostępności zmiennej poprzez ERDDAP jest WMS serwer to:
* Zestaw danych musi być EDDGrid ... zestaw danych.
* Zmienna danych MUSI być zmienną zawiązaną.
* Zmienna danych MUSI mieć zmienne długości i szerokości geograficznej. (Inne zmienne osi są optyczne.) 
* Muszą istnieć pewne wartości długości między -180 a 180.
* W colorBarMinimum oraz colorBarMaximum Atrybuty MUSI być określone. (Inne atrybuty pasków kolorów są optyczne.) 

######  data\\_min oraz data\\_max  {#data_min-and-data_max} 
*    [ ** data\\_min ** oraz ** data\\_max ** ](#data_min-and-data_max) -- Są to przestarzałe atrybuty zmienne zdefiniowane w Eksperymencie Światowego Okrążenia Oceanu (WOCE) opis metadanych. Na przykład:

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * Zaleca się użycie [ actual\\_range ](#actual_range) , zamiast data\\_min oraz data\\_max , ponieważ actual\\_range jest obecnie zdefiniowana w specyfikacji CF.
    * Jeżeli występują, muszą one być tego samego typu danych co typ danych docelowych zmiennej i muszą określać rzeczywiste (nie teoretyczne lub dozwolone) minimalne i maksymalne wartości danych dla tej zmiennej.
    * Jeśli dane są zapakowane [ scale\\_factor lub add\\_offset ](#scale_factor) , data\\_min oraz data\\_max muszą być rozpakowane przy użyciu typu danych.
         
###### zmienna drawLandMask  {#variable-drawlandmask} 
*    [ ** drawLandMask ** ](#variable-drawlandmask) -- Jest to atrybut zmiennej optional używany przez ERDDAP™   (i brak standardów metadanych) która określa wartość domyślną dla opcji "Draw Land Mask" w formularzu Make A Graph ( * datasetID * .graph) i dla parametru & .land w URL z prośbą o mapę danych. Na przykład:
    ```
        <att name="drawLandMask">under</att>  
    ```
Patrz [ drawLandMask przegląd](#drawlandmask) .
###### Kodowanie{#encoding} 
*    [ **\\ _ Kodowanie** ](#encoding) 
    * Atrybut ten może być używany tylko ze zmiennymi String.
    * Atrybut ten jest zdecydowanie zalecany.
    * Ten atrybut pochodzi z [ NetCDF Przewodnik użytkownika (NUG) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html) .
    * Wewnętrznie ERDDAP™ , Strings są sekwencją 2- bajtowych znaków, które używają [Zestaw znaków Unicode UCS-2](https://en.wikipedia.org/wiki/UTF-16) .
    * Wiele typów plików obsługuje tylko znaki 1-byte w Strings i tym samym potrzebuje tego atrybutu, aby zidentyfikować powiązane
         [charset (AKA strona kodowa) ](https://en.wikipedia.org/wiki/Code_page) która określa sposób mapowania 256 możliwych wartości do zestawu 256 znaków z zestawu znaków UCS-2 i / lub systemu kodowania, np., [UTF- 8](https://en.wikipedia.org/wiki/UTF-8)   (który wymaga od 1 do 4 bajtów na znak) .
    * Wartości dla\\ _ Kodowania są nieczułe.
    * Teoretycznie, ERDDAP™ może obsługiwać identyfikatory\\ _ Kodowania z [ta lista IANA](https://www.iana.org/assignments/character-sets/character-sets.xhtml) , ale w praktyce, ERDDAP™ obecnie tylko obsługuje
        * ISO- 8859-1 (Zauważ, że ma kreski, nie podkreślenia) , który ma tę zaletę, że jest identyczny z pierwszych 256 znaków Unicode, oraz
        * UTF- 8.
    * Podczas odczytu plików źródłowych domyślną wartością jest ISO- 8859-1, z wyjątkiem plików netcdf- 4, gdzie domyślną wartością jest UTF- 8.
    * Jest to ciągle problematyczny problem, ponieważ wiele plików źródłowych używa Charsetów lub kodowań, które różnią się od ISO- 8859-1, ale nie identyfikują charsetu lub kodowania. Na przykład wiele plików z danymi źródłowymi jest kopiowanych i wklejanych przez Microsoft Word w systemie Windows, a tym samym mają wyszukane hyfny i apostrofy z charsetu specyficznego dla Windowsa zamiast hyfonów i apostrofów ASCII. Te znaki pojawiają się jako znaki dziwne lub '?' w ERDDAP .
         
###### fileAccessBaseUrl{#fileaccessbaseurl} 
*    ** [fileAccessBaseUrl](#fileaccessbaseurl) i fileAccessSuffix** są bardzo rzadko używane atrybuty, które nie pochodzą z żadnego standardu. Jeśli kolumna EDDTable posiada nazwy plików dostępnych w sieci (np. pliki obrazkowe, wideo lub audio) , możesz dodać
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
aby określić bazowy adres URL (kończąc na /) konieczne do przekształcenia nazw plików w kompletne adresy URL. W nietypowych przypadkach, takich jak gdy kolumna ma odniesienia do plików .png, ale wartości brakuje.
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(na przykład:&lt;att nazwa = "fileAccessSuffix" &gt; .png&lt;/ a &gt;)
aby określić przyrostek, który ma być dodany, aby nazwy plików zostały włączone do pełnych adresów URL. Następnie .htmlTable odpowiedzi, ERDDAP™ pokaże nazwę pliku jako link do pełnego adresu URL (podstawa Url plus nazwa pliku plus przyrostek) .

Jeśli chcesz ERDDAP™ do obsługi powiązanych plików, zrobić oddzielny [Nazwy EDDTableFromFileName](#eddtablefromfilenames) zbiór danych dla tych plików (może to być prywatny zestaw danych) .
    
###### fileAccessArchive Url{#fileaccessarchiveurl} 
*    [ **fileAccessArchive Url** ](#fileaccessarchiveurl) jest bardzo rzadko używanym atrybutem, który nie pochodzi z żadnego standardu. Jeśli kolumna EDDTable posiada nazwy plików dostępnych w sieci (np. pliki obrazkowe, wideo lub audio) które są dostępne przez archiwum (np., .zip plik) dostępne za pośrednictwem URL, użyj&lt;att nazwa = "fileAccessArchiveUrl" &gt; *URL* &lt;/ att &gt; podać adres URL archiwum.
    
Jeśli chcesz ERDDAP™ do obsługi pliku archiwum, zrobić oddzielny [Nazwy EDDTableFromFileName](#eddtablefromfilenames) zbiór danych dla tego pliku (może to być prywatny zestaw danych) .
    
######  ioos\\_category  {#ioos_category} 
*    [ ** ioos\\_category ** ](#ioos_category) -- Jest to atrybut zmiennej WYMAGANEJ, jeśli&lt;variablesMustHaveloosCategory &gt; jest ustawiony na true (domyślny) w [setup.xml](/docs/server-admin/deploy-install#setupxml) ; w przeciwnym wypadku jest to opcja optyczna.
Na przykład:&lt;att name = " ioos\\_category "&gt; Zasolenie&lt;/ att &gt;
Kategorie są z [ NOAA Zintegrowany system obserwacji oceanów (IOOS) ](https://ioos.noaa.gov/) .
    
    *    (Od napisania tego) Nie znamy formalnych definicji tych nazw.
    * Podstawowe nazwy pochodzą z Zdenka Willis '.ppt "Zintegrowany system obserwacji oceanów (IOOS)   NOAA Podejście do budowy początkowej zdolności operacyjnej "i z [US IOOS Blueprint](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)   (Strona 1-5) .
    * Jest prawdopodobne, że wykaz ten zostanie w przyszłości zmieniony. Jeśli masz jakieś prośby, proszę wysłać e-mail do Chrisa. John w Noah.
    *    ERDDAP™ obsługuje większą listę kategorii niż IOOS, ponieważ Bob Simons dodał dodatkowe nazwy (głównie oparte na nazwach pól naukowych, na przykład, Biologia, Ekologia, Meteorologia, Statystyki, Taxonomy) dla innych rodzajów danych.
    * Bieżące prawidłowe wartości w ERDDAP™ są Bathymetery, Biologia, Dolny charakter, CO2, Kolorowe rozpuszczone materii organicznej, Zanieczyszczenia, Currents, Rozpuszczone składniki odżywcze, Rozpuszczone O2, Ekologia, Absorpcja ryb, Gatunki ryb, Fluks ciepła, Hydrologia, Dystrybucja lodu, Identyfikator, Lokalizacja, Meteorologia, Kolor oceanu, Właściwości optyczne, Inne, Patogeny, Phytoplankton Gatunki, Pressure, Produktywność, Jakość, Sality, Poziom morza, Statystyki, Strumień Flow, Waves powierzchniowych, Taxonomy, Temperatura, Czas, Total Suspended Materia, Nieznany, Wiatr, Zooplankton Gatunki, i Zooplankton Abburgh.
    * Istnieje pewne nakładanie się i niejednoznaczność pomiędzy różnymi terminami - zrób co w twojej mocy.
    * Jeśli dodasz ioos\\_category do wykazu&lt; categoryAttributes &gt; w ERDDAP jest [setup.xml](/docs/server-admin/deploy-install#setupxml) plik, użytkownicy mogą łatwo znaleźć zestawy danych z podobnymi danymi poprzez ERDDAP "Search for Datasets by Category" na stronie głównej.
         [Spróbuj użyć ioos\\_category poszukiwania zbiorów danych będących przedmiotem zainteresowania.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000) 
    * Nie było [dyskusja na temat ERDDAP™ oraz ioos\\_category w ERDDAP™ Grupa Google.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w) 
    
Możesz być kuszony, aby ustawić&lt;variablesMustHaveloosCategory &gt; do false tak, że ten atrybut nie jest wymagany. ("Pfft&#33; Co mnie to obchodzi?") Niektóre powody, aby zostawić to ustawione na prawdziwe (domyślny) i stosowanie ioos\\_category są:
    
    * Jeśli setup.xml&lt;variablesMustHaveloosCategory &gt; jest ustawiona na true, [GenerateDatasetsXml](#generatedatasetsxml) zawsze tworzy / sugeruje ioos\\_category atrybut dla każdej zmiennej w każdym nowym zbiorze danych. Więc dlaczego po prostu tego nie zostawić?
    *    ERDDAP™ pozwala użytkownikom na wyszukiwanie zbiorów danych z podziałem na kategorie. ioos\\_category jest bardzo przydatną kategorią wyszukiwania, ponieważ joos\\ _ categories (na przykład, Temperatura) są dość szerokie. To czyni ioos\\_category znacznie lepsze w tym celu niż, na przykład, o wiele lepiej ziarniste CF standard\\_name s (które nie są tak dobre w tym celu ze względu na wszystkie synonimy i drobne różnice, na przykład, morze\\ _ powierzchnia\\ _ temperatura versus morze\\ _ woda\\ _ temperatura) .
(Stosowanie ioos\\_category w tym celu jest kontrolowany przez&lt; categoryAttributes &gt; w pliku setup.xml.)
         [Spróbuj użyć ioos\\_category poszukiwania zbiorów danych będących przedmiotem zainteresowania.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000) 
    * Te kategorie są z [ NOAA Zintegrowany system obserwacji oceanów (IOOS) ](https://ioos.noaa.gov/) . Kategorie te mają zasadnicze znaczenie dla opisu misji IOOS. Jeśli jesteś w NOAA , wsparcie ioos\\_category jest dobry Jeden... NOAA Coś do zrobienia. (Patrz na to. [Jeden NOAA wideo](https://www.youtube.com/watch?v=nBnCsMYm2yQ) i być natchnionym&#33;) Jeśli jesteś w innej amerykańskiej lub międzynarodowej agencji, albo pracujesz z agencjami rządowymi, albo pracujesz z jakimś innym systemem obserwacji oceanów, czy to nie dobry pomysł współpracować z biurem IOOS?
    * Prędzej czy później, możesz chcieć coś innego. ERDDAP™ aby połączyć się z zestawami danych poprzez [ EDDGrid FromErddap](#eddfromerddap) oraz [EDDTableFromErddap](#eddfromerddap) . Jeśli druga ERDDAP™ wymaga ioos\\_category Twoje zbiory danych muszą mieć ioos\\_category w celu EDDGrid FromErddap i EDDTableFromErddap do pracy.
    * To jest psychologicznie dużo łatwiejsze do włączenia ioos\\_category podczas tworzenia zbioru danych (To tylko kolejna rzecz, ERDDAP™ wymaga dodania zbioru danych do ERDDAP ) , niż dodać go po fakcie (jeśli zdecydowałeś się użyć go w przyszłości) .
         
######  long\\_name  {#long_name} 
*    [ ** long\\_name ** ](#long_name)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) , [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) oraz [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) normy metadanych) jest atrybutem zmiennej ZALECONEJ w ERDDAP . Na przykład:
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *    ERDDAP™ wykorzystuje long\\_name do etykietowania osi na wykresach.
    * Najlepsze praktyki: Capitalize słowa w long\\_name Jakby to był tytuł. (capitalize pierwsze słowo i wszystkie słowa nie-artykuł) . Nie włączaj jednostek do long\\_name . Długa nazwa nie powinna być zbyt długa (zwykle&lt;20 znaków), ale powinny być bardziej opisowe niż [ destinationName ](#destinationname) , który jest często bardzo zwięzły.
    * Jeśli " long\\_name "nie jest zdefiniowana w zmiennej [sourceAtrybuty](#variable-addattributes) lub&lt; addAttributes &gt;, ERDDAP™ będzie generować go poprzez czyszczenie [ standard\\_name ](#standard_name)   (jeżeli występuje) lub destinationName .
         
######  missing\\_value  {#missing_value} 
*    [ ** missing\\_value ** ](#missing_value) oraz **\\ _ Wypełnij Wartość**   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) oraz [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ) są atrybutami zmiennymi opisującymi liczbę (na przykład, -9999) który jest używany do reprezentowania brakującej wartości. Na przykład:

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

Dla zmiennych String domyślnie dla obu jest "" (pusty ciąg) .
Dla zmiennych liczbowych domyślny jest NaN.
*    ERDDAP™ wspiera oba missing\\_value i\\ _ FillValue, ponieważ niektóre źródła danych przypisują im nieco inne znaczenie.
* Jeżeli występują, powinny być tego samego typu danych co zmienna.
* Jeśli dane są zapakowane [ scale\\_factor lub add\\_offset ](#scale_factor) , missing\\_value i\\ _ FillValue powinny być podobnie zapakowane. Podobnie, dla kolumny z Datą String / wartościami czasu, które używają lokalnego [ time\\_zone ](#time_zone) , missing\\_value i\\ _ FillValue powinny używać lokalnej strefy czasowej.
* Jeśli zmienna używa tych wartości specjalnych, missing\\_value i / lub\\ _ FillValue atrybuty są WYMAGANE.
* Dla [Zmienne czasu i znacznika czasu](#time-units)   (czy źródło jest strunami czy liczbami) , missing\\_value s i\\ _ FillValues pojawiają się jako "" (pusty ciąg) kiedy czas jest zapisany jako String i jako NaN kiedy czas jest zapisany jako podwójny. Wartości źródła dla missing\\_value i\\ _ FillValue nie pojawi się w metadanych zmiennej.
* Dla zmiennych String, ERDDAP™ zawsze konwertuje jakiekolwiek missing\\_value s lub\\ _ FillValue wartości danych w "" (pusty ciąg) . Wartości źródła dla missing\\_value i\\ _ FillValue nie pojawi się w metadanych zmiennej.
* Dla zmiennych liczbowych:
W missing\\_value i\\ _ FillValue pojawi się w metadanych zmiennej.
Dla niektórych formatów danych wyjściowych, ERDDAP™ pozostawią te numery specjalne nietknięte, na przykład, zobaczysz -9999.
Dla innych formatów danych wyjściowych (w szczególności tekstowe formaty jak .csv i .htmlTable ) , ERDDAP™ zastąpi te specjalne numery NaN lub ".
* Niektóre typy danych mają nieodłączne brakujące znaczniki wartości, które nie muszą być wyraźnie zidentyfikowane z missing\\_value lub\\ _ Atrybuty FillValue: zmienna zmienna zmienna zmienna zmienna zmienna zmienna zmienna zmienna zmienna i zmienna podwójna mają NaN (Nie numer) , Wartości strun używają pustego łańcucha, a wartości char mają charakter \\uffff   (znak # 65535, który jest wartością Unicode dla not a Character) . Typy danych Integer nie mają nieodłącznych brakujących markerów wartości.
* Jeśli zmienna całkowita ma brakującą wartość (np. pusta pozycja w pliku .csv) , ERDDAP™ zinterpretuje wartość jako zdefiniowaną missing\\_value lub\\ _ FillValue dla tej zmiennej. Jeżeli żaden nie jest zdefiniowany, ERDDAP™ będzie interpretować wartość jako domyślną brakującą wartość dla danego typu danych, która jest zawsze wartością maksymalną, która może być przechowywana przez ten typ danych:
127 dla zmiennych bajtowych, 32767 dla krótkich, 2147483647 dla int, 9223372036854775807 przez długi czas,
255 dla ubyte, 65535 dla ushort, 4294967295 dla uint i 18446744073709551615 dla ulong.
######  ADD \\_FillValue ATTRIBUTES ?{#add-_fillvalue-attributes} 
*    [ ADD \\_FillValue ATTRIBUTES ?](#add-_fillvalue-attributes)   
Za każdym razem ERDDAP™ ładuje zbiór danych, sprawdza czy zmienne z typami danych źródłowych liczb całkowitych mają zdefiniowany missing\\_value lub atrybut\\ _ FillValue. Jeśli zmienna nie, wtedy ERDDAP™ drukuje wiadomość do pliku dziennika (zaczynając od "Add\\ _ FillValue Atribution?") zalecając, że ERDDAP™ administrator dodaj\\ _ Wypełnij Atrybut wartości tej zmiennej w datasets.xml . Jest bardzo przydatne, aby każda zmienna miała\\ _ FillValue lub missing\\_value ponieważ brakujące wartości są zawsze możliwe, np. jeśli dany plik w zbiorze danych nie ma danej zmiennej, ERDDAP™ musi być w stanie przedstawić tę zmienną jako posiadającą wszystkie brakujące wartości dla tej zmiennej. Jeśli zdecydujesz, że zmienna nie powinna mieć atrybutu\\ _ FillValue, możesz dodać
    &lt;att names = "\\ _ FillValue" &gt; null&lt;/ att &gt; zamiast tego, który zatłumi wiadomość dla tego datasetID + kombinacja zmiennych w przyszłości.
    
Za każdym razem ERDDAP™ rozpoczyna się, zbiera wszystkie te zalecenia do wiadomości, która jest zapisywana do pliku dziennika (zaczynając od " ADD \\_FillValue ATTRIBUTES ? ") , email do ERDDAP™ administrator, i napisane do pliku danych CSV w \\[ bigParentDirectory \\] / logi / katalog. Jeśli chcesz, możesz użyć programu GenerateDatasetsXml (oraz opcja AddFillValueAtrybuty) do zastosowania wszystkich sugestii w pliku CSV do datasets.xml plik. Dla którejkolwiek z datasetID / kombinacje zmiennych w tym pliku, jeśli zdecydujesz, że nie ma potrzeby dodawania przypisanego atrybutu, możesz zmienić atrybut&lt;att names = "\\ _ FillValue" &gt; null&lt;/ att &gt; w celu stłumienia zalecenia datasetID + kombinacja zmiennych w przyszłości.
    
To ważne&#33;
Jak często mawiał Bob: byłoby źle. (i żenujące) jeżeli niektóre dowody globalnego ocieplenia były spowodowane niezidentyfikowanymi brakującymi wartościami w danych (np. wartości temperatur 99 lub 127 stopni\\ _ C, które powinny być oznaczone jako brakujące wartości, a tym samym wypaczyć średnie i / lub mediana statystyki wyższe) .

* \\ _ FillValue i missing\\_value wartości dla danej zmiennej w różnych plikach źródłowych muszą być spójne; w przeciwnym wypadku, ERDDAP™ akceptuje pliki z jednym zbiorem wartości i odrzuca wszystkie pozostałe pliki jako "złe pliki". Aby rozwiązać problem,
    * Jeśli pliki są zablokowane .nc pliki, możesz użyć [ EDDGrid FromNcFilesUnpacked](#eddgridfromncfilesunpacked) .
    * Jeśli pliki są plikami tabelarycznymi, możesz użyć EDDTableFrom... ' [standaryzacja Co?](#standardizewhat) powiedzieć ERDDAP do standaryzacji plików źródłowych, jak są one odczytywane ERDDAP .
    * Dla trudniejszych problemów, można użyć [NcML](#ncml-files) lub [ NCO ](#netcdf-operators-nco) rozwiązać problem.
             
######  scale\\_factor  {#scale_factor} 
*    [ ** scale\\_factor ** ](#scale_factor)   (domyślny = 1) oraz ** add\\_offset **   (domyślny = 0)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) oraz [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ) są atrybutami zmiennej optycznej opisującymi dane, które są pakowane w prostszy typ danych poprzez proste przekształcenie.
    * Jeżeli występują, ich typ danych różni się od typu danych źródłowych i opisuje typ danych wartości docelowych.
Na przykład, źródło danych może mieć zapisane wartości danych zmiennoprzecinkowych z jedną cyfrą dziesiętną zapakowaną jako krótkie litery (int16) , przy użyciu scale\\_factor = 0, 1 i add\\_offset = 0. Na przykład,

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

W tym przykładzie: ERDDAP™ rozpakowuje dane i przedstawia je użytkownikowi jako wartości danych zmiennoprzecinkowych.
    * Jeżeli występuje, ERDDAP™ wyciąga wartości z tych atrybutów, usuwa atrybuty i automatycznie rozpakowuje dane dla użytkownika:
miejsce przeznaczenia Wartość = źródło Wartość\\ * scale\\_factor + add\\_offset   
Albo w inny sposób:
unpackedValue = spakowany Wartość\\ * scale\\_factor + add\\_offset 
    * W scale\\_factor oraz add\\_offset wartości dla danej zmiennej w różnych plikach źródłowych muszą być spójne; w przeciwnym wypadku, ERDDAP™ akceptuje pliki z jednym zbiorem wartości i odrzuca wszystkie pozostałe pliki jako "złe pliki". Aby rozwiązać problem,
        * Jeśli pliki są zablokowane .nc pliki, możesz użyć [ EDDGrid FromNcFilesUnpacked](#eddgridfromncfilesunpacked) .
        * Jeśli pliki są plikami tabelarycznymi, możesz użyć EDDTableFrom... ' [standaryzacja Co?](#standardizewhat) powiedzieć ERDDAP do standaryzacji plików źródłowych, jak są one odczytywane ERDDAP .
        * Dla trudniejszych problemów, można użyć [NcML](#ncml-files) lub [ NCO ](#netcdf-operators-nco) rozwiązać problem.
             
######  standard\\_name  {#standard_name} 
*    [ ** standard\\_name ** ](#standard_name)   (od [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) standard metadanych) jest atrybutem zmiennej ZALECONEJ w ERDDAP . CF utrzymuje listę dozwolonych [Nazwa standardowa CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) . Na przykład:
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * Jeśli dodasz standard\\_name do atrybutów zmiennych i dodać standard\\_name do wykazu&lt; categoryAttributes &gt; w ERDDAP jest [setup.xml](/docs/server-admin/deploy-install#setupxml) plik, użytkownicy mogą łatwo znaleźć zestawy danych z podobnymi danymi poprzez ERDDAP "Search for Datasets by Category" na stronie głównej.
    * Jeśli podasz CF standard\\_name dla zmiennej atrybut jednostek dla zmiennej nie musi być identyczny z jednostkami kanonicznymi określonymi dla nazwy standardowej w tabeli nazw standardowych CF, ale jednostki MUSI być zamienne do jednostek kanonicznych. Na przykład wszystkie CF związane z temperaturą standard\\_name s mają "K". (Kelvin Przewodniczący) jako jednostki kanoniczne. Więc zmienna z temperaturą standard\\_name MUSI mieć jednostki K, stopnia\\ _ C, stopnia\\ _ F, lub jakiś wariant UDUnits tych nazw, ponieważ wszystkie są interkabriolet.
    * Najlepsze praktyki: Część mocy [sterowane słowniki](https://en.wikipedia.org/wiki/Controlled_vocabulary) pochodzi z używania tylko terminów na liście. Więc zalecamy trzymać się terminów zdefiniowanych w kontrolowanym słowniku, i zalecamy nie wymyślanie terminu, jeśli nie ma odpowiedniego na liście. Jeśli potrzebujesz dodatkowych warunków, sprawdź, czy komitet normalizacyjny doda je do kontrolowanego słownictwa.
    *    standard\\_name wartości są jedynymi wartościami atrybutów CF, które są wrażliwe na przypadek. Zawsze są małe. Początek ERDDAP™ v1.82, GenerateDatasets przekonwertuje litery na małe litery. A kiedy zestaw danych jest załadowany ERDDAP , litery duże są po cichu zmieniane na małe litery.
         
######  time\\_precision  {#time_precision} 
*    time\\_precision jest atrybutem optycznym używanym przez ERDDAP™   (i brak standardów metadanych) zamiast [Zmienne czasu i znacznika czasu](#time-units) , które mogą być w zbiornikach danych lub zestawach danych tabelarycznych, oraz axisVariable s lub dataVariable b. Na przykład:
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
     time\\_precision Określa precyzję, która ma być zastosowana ERDDAP™ formatuje wartości czasowe z tej zmiennej jako łańcuchy na stronach internetowych, w tym .htmlTable odpowiedzi. W formatach plików gdzie ERDDAP™ formaty razy jako łańcuchy (na przykład .csv i .json ) , ERDDAP™ tylko używa time\\_precision -określony format, jeśli zawiera ułamkowe sekundy; inaczej, ERDDAP™ wykorzystuje 1970- 01- 01T00: 00: 00 Format Z.
* Ważne wartości to 1970- 01, 1970- 01- 01, 1970- 01-01T00Z, 1970- 01-01T00: 00Z, 1970- 01-01T00: 00: 00Z (domyślny) , 1970- 01-01T00: 00: 00.0Z, 1970- 01-01T00: 00: 00.00Z, 1970- 01-01T00: 00: 00.000Z. \\[ 1970 nie jest opcją, ponieważ jest to jedna liczba, więc ERDDAP™ nie wiem czy to sformatowany ciąg czasu (rok) lub jeśli jest to jakaś liczba sekund od 1970- 01-01T00: 00: 00Z. \\] 
* Jeśli time\\_precision nie jest podana lub wartość nie jest dopasowana, wartość domyślna zostanie użyta.
* Tutaj, jak w innych częściach ERDDAP™ , wszelkie pola sformatowanego czasu, które nie są wyświetlane, mają wartość minimalną. Na przykład, 1985-07, 1985-07-01, 1985-07-01T00Z, 1985-07-01T00: 00Z i 1985-07-01T00: 00: 00 Z są uważane za równoważne, choć z różnych poziomów precyzji implikowane. To pasuje do [ISO 8601: 2004 "extended" Specyfikacja formatu czasu](https://www.iso.org/iso/date_and_time_format) .
*    **OSTRZEŻENIE:** Należy stosować tylko ograniczone dawki time\\_precision jeżeli **wszystkie** wartości danych dla zmiennej mają tylko minimalną wartość dla wszystkich ukrytych pól.
    * Na przykład, można użyć time\\_precision z 1970- 01- 01, jeśli wszystkie wartości danych mają godzinę = 0, minuta = 0, a drugi = 0 (na przykład 2005-03-04T00: 00: 00Z i 2005-03-05T00: 00: 00Z) .
    * Na przykład, nie używać time\\_precision z 1970- 01- 01, jeśli nie ma wartości -0 godzin, minut lub sekund, (na przykład 2005-03-05T12: 00: 00Z) ponieważ nie zostanie wyświetlona wartość godziny niedomyślnej. W przeciwnym razie, jeśli użytkownik poprosi o wszystkie dane z czasem = 2005-03-05, żądanie nieoczekiwanie zawiedzie.
             
######  time\\_zone  {#time_zone} 
*    [ ** time\\_zone ** ](#time_zone) 
    *    time\\_zone jest atrybutem optycznym używanym przez ERDDAP™   (i brak standardów metadanych) zamiast [Zmienne czasu i znacznika czasu](#time-units) , które mogą być ujęte w zbiornikach danych lub zestawach danych tabelarycznych.
    * Domyślnie jest " Zulu " (która jest nowoczesną wersją strefy czasowej GMT) .
    * Informacje ogólne: "przesunięcia czasowe" (np., Pacific Standard Time, -08: 00, GMT- 8) są stałe, specyficzne, offsety względem Zulu   (GMT) . Natomiast "strefy czasowe" to o wiele bardziej skomplikowane rzeczy, na które wpływa oszczędzanie światła dziennego (np. "US / Pacific") , które miały różne zasady w różnych miejscach w różnych czasach. Strefy czasowe zawsze mają nazwy, ponieważ nie mogą być podsumowane przez prostą wartość offsetową (patrz kolumna "Nazwy baz danych TZ" w tabeli [https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) ) . ERDDAP jest time\\_zone atrybut pomaga uporać się z danymi czasu lokalnego z jakiejś strefy czasowej (np. 1987- 03- 25T17: 32: 05 Pacyfik Czas) . Jeśli posiadasz dane z łańcuchem lub liczbami (stałe) przesunięcie czasu, należy po prostu dostosować dane do Zulu   (co jest co ERDDAP™ chce) poprzez określenie innego czasu bazowego w atrybucie jednostek (np. "godziny od 1970- 01-01T08: 00: 00Z", zauważyć T08, aby określić przesunięcie czasu) i zawsze sprawdzaj wyniki, aby zapewnić uzyskanie wyników, które chcesz.
    * Dla zmiennych timestamp z danymi źródłowymi ze Strings atrybut ten pozwala określić strefę czasową, która prowadzi ERDDAP™ aby przekonwertować czas-strefa źródłowa (niektóre w czasie standardowym, niektóre w czasie dziennym) do Zulu razy (które są zawsze w czasie standardowym) . Lista ważnych nazw stref czasowych jest prawdopodobnie identyczna z listą w kolumnie TZ [https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) . Wspólne strefy czasowe USA to: US / Hawaje, US / Alaska, US / Pacific, US / Mountain, US / Arizona, US / Central, US / Eastern.
    * Dla zmiennych timestamp z numerycznymi danymi źródłowymi można określić " time\\_zone "atrybut, ale wartość musi być" Zulu "lub" UTC ". Jeśli potrzebujesz wsparcia dla innych stref czasowych, proszę wysłać e-mail do Chrisa. John w Noa.gov.
         
###### legacy _ time _ adjuste{#legacy_time_adjust} 
*    [ **legacy _ time _ adjuste** ](#legacy_time_adjust) Początek ERDDAP™ 2.29.0, zmienne czasowe działają nieco inaczej. W rzadkich przypadkach, najprawdopodobniej podczas stosowania `dni od` i rok przed 1582 (więc `dni od 0000- 01- 01` lub `dni od 1- 1-1 00: 00: 0.0` ) trzeba będzie wskazać dla korekty zmiennej daty. Powodem jest ERDDAP™ używa biblioteki java.time do zarządzania datami wewnętrznie. Istnieje kilka zbiorów danych, które wymagają użycia starej biblioteki GregorianCalendar, aby uzyskać poprawne daty.

```
<axisVariable>
    <sourceName>time</sourceName>
    <destinationName>time</destinationName>
    <!-- sourceAttributes>
        ... removed several lines ...
        <att name="units">days since 1-1-1 00:00:0.0</att>
    </sourceAttributes -->
    <addAttributes>
        ... removed several lines ...
        <att name="legacy_time_adjust">true</att>
    </addAttributes>
</axisVariable>
```

###### jednostki{#units} 
*    [ **jednostki** ](#units)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) , [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) oraz [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard metadanych) określa jednostki wartości danych. Na przykład:
    ```
        <att name="units">degree\\_C</att>
    ```
    * "jednostki" są wymagane albo jako sourceAtribution lub addAttribute dla "time" zmienne i jest STRONGLY ZALECA dla innych zmiennych, w stosownych przypadkach (która jest prawie zawsze) .
    * Ogólnie, zalecamy [Jednostki UDUnits](https://www.unidata.ucar.edu/software/udunits/) \\ -kompatybilne jednostki, które są wymagane przez [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) oraz [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) standardy.
    * Innym wspólnym standardem jest [UCUM](https://unitsofmeasure.org/ucum.html) -- ujednolicony kodeks jednostek miary. [ OGC ](https://www.ogc.org/) usługi takie jak: [ SOS ](https://www.ogc.org/standards/sos) , [ WCS ](https://www.ogc.org/standards/wcs) oraz [ WMS ](https://www.ogc.org/standards/wms) wymagają UUM i często odnoszą się do UUM jako UOM (Jednostki miary) .
    * Zaleca się stosowanie jednego standardu jednostek dla wszystkich zbiorów danych ERDDAP . Powinieneś powiedzieć ERDDAP™ którego standardu używasz z&lt;jednostek\\ _ standard &gt;, w Twoim [setup.xml](/docs/server-admin/deploy-install#setupxml) plik.
    * Jednostki dla danej zmiennej w różnych plikach źródłowych muszą być spójne. Jeżeli posiadasz zbiór plików danych, w których jeden podzbiór plików wykorzystuje różne wartości jednostek niż jeden lub więcej innych podzbiór plików (na przykład:
"dni od 1985-01-01" versus "dni od 2000-01-01",
"stopień\\ _ Celsjusza" kontra "deg\\ _ C", lub
"węzły" kontra "m / s") musisz znaleźć sposób standaryzacji wartości jednostek, inaczej, ERDDAP™ załaduje tylko jeden podzbiór plików. Pomyśl o tym: jeśli jeden plik ma jednostki windSpeed = węzły, a drugi ma jednostki windSpeed = m / s, to wartości z dwóch plików nie powinny być włączone do tego samego zagregowanego zbioru danych.
        * Jeśli pliki są zablokowane .nc pliki, w wielu sytuacjach można użyć [ EDDGrid FromNcFilesUnpacked](#eddgridfromncfilesunpacked) .
        * Jeśli pliki są plikami tabelarycznymi, w wielu sytuacjach można użyć EDDTableFrom... ' [standaryzacja Co?](#standardizewhat) powiedzieć ERDDAP do standaryzacji plików źródłowych, jak są one odczytywane ERDDAP .
        * Dla trudniejszych problemów, można użyć [NcML](#ncml-files) lub [ NCO ](#netcdf-operators-nco) rozwiązać problem.
    * Sekcja 8.1 normy CF mówi, że jeśli dane zmiennej są pakowane przez [ scale\\_factor lub add\\_offset ](#scale_factor) "Jednostki zmiennej powinny być reprezentatywne dla niezapakowanych danych".
    *    [Dla zmiennych czasu i znacznika czasu,](#time-units) albo zmienną [sourceAtrybuty](#variable-addattributes) lub&lt; addAttributes &gt; (która ma pierwszeństwo) Must have [jednostki](#units) co jest albo
        
        * Dla zmiennych osi czasu lub zmiennych czasu z danymi liczbowymi: [Jednostki UDUnits](https://www.unidata.ucar.edu/software/udunits/) \\ -zgodny ciąg (z formatem *jednostki* od *baseTime* ) opis interpretacji wartości czasu źródła (na przykład, sekundy od 1970- 01-01T00: 00: 00Z) .
            
         *jednostki* może być jednym z:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
Technicznie rzecz biorąc, ERDDAP™ NIE podąża za UDUNITS standard przy konwersji "years since" oraz "months since" wartości czasowe "seconds since" . W UDUNITS standard definiuje rok jako stałą, pojedynczą wartość: 3.15569259747e7 sekund. I UDUNITS definiuje miesiąc jako rok / 12. Niestety, większość / wszystkie zbiory danych, które widzieliśmy, że używać "years since" lub "months since" wyraźnie planują, aby wartości były latami kalendarzowymi lub miesiącami kalendarzowymi. Na przykład, 3 "months since 1970-01-01" zazwyczaj oznacza 1970- 04- 01. Więc, ERDDAP™ interpretacje "years since" oraz "months since" jako lata kalendarzowe i miesiące, i nie ściśle przestrzegać UDUNITS standard.
            
W *baseTime* musi być ISO 8601: 2004 (E) sformatowany łańcuch czasu daty ( yyyy-MM-dd NIE 'HH: mm: ssZ, na przykład, 1970- 01-01T00: 00: 00Z) lub jakaś zmiana tego (na przykład, z brakującymi częściami na końcu) . ERDDAP™ próbuje pracować z szerokim wachlarzem odmian tego idealnego formatu, na przykład "1970- 1-1 0: 0: 0" jest obsługiwane. Jeżeli brakuje informacji o strefie czasowej, przyjmuje się, że Zulu strefa czasowa (AKA GMT) . Nawet jeśli podano inne przesunięcie czasowe, ERDDAP™ nigdy nie używa Daylight Saving Time. Jeśli BaseTime używa innego formatu, należy użyć&lt; addAttributes &gt; aby określić nowy ciąg jednostek wykorzystujący zmianę ISO 8601: 2004 (E) format (np. zmiana dni od 1 stycznia 1985 r. na dni od 1985 r. - 01- 01.
        
Możesz przetestować ERDDAP umiejętności radzenia sobie z konkretnymi *jednostki* od *baseTime* z ERDDAP jest [Konwersja czasu](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) . Mam nadzieję, że możesz podłączyć liczbę (pierwsza wartość czasu ze źródła danych?) i ciąg jednostek, kliknij Konwertuj i ERDDAP™ będzie w stanie przekształcić go w ISO 8601: 2004 (E) sformatowany łańcuch czasu daty. Konwerter zwróci komunikat błędu, jeśli ciąg jednostek nie jest rozpoznawalny.

###### Jednostki czasowe strun{#string-time-units} 
*    [Dla atrybutu jednostek dla zmiennych danych czasu lub znacznika czasu z danymi String,](#string-time-units) należy określić [java.time.DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) wzór (co jest w większości kompatybilne z java.text. SimpleDateFormat) który opisuje jak interpretować czasy strun.
    
Dla powszechnie stosowanych formatów czasowych, które są zmianami ISO 8601: 2004 (E) format standardowy (na przykład, 2018-01-02T00: 00: 00Z) , można określić warianty yyyy-MM-dd NIE 'HH: mm: ssZ, na przykład, używać yyyy-MM-dd jeśli czas łańcucha ma tylko datę. dla każdego formatu rozpoczynającego się od yyyyyy- M, ERDDAP używa specjalnego parsera, który jest bardzo wyrozumiały drobnych zmian w formacie. Parser może obsługiwać strefy czasowe w formacie "Z", "UTC", "GMT", ± XX: XX, ± XXXX i ± XX. Jeżeli nie określono części daty (na przykład, minuty i sekundy) , ERDDAP™ przyjmuje najniższą wartość dla tego pola (np. jeśli sekundy nie są określone, przyjmuje się sekundy = 0) .
    
Dla wszystkich innych formatów czasu łańcuchowego należy dokładnie określić łańcuch formatu czasu kompatybilny z DateTimeFormatter-. Jak yyyy-MM-dd NIE 'HH: mm: ssZ, te struny formatu są zbudowane z znaków, które identyfikują określony rodzaj informacji z łańcucha czasu, np. m oznacza minute -of-hour. Jeśli powtórzysz znak formatu kilka razy, to dodatkowo udoskonali znaczenie, np. m oznacza, że wartość może być określona dowolną liczbą cyfr, mm oznacza, że wartość musi być określona przez dwie cyfry. W Java dokumentacja dla DateTimeFormatter jest surowym przeglądem i nie wyjaśnia tych szczegółów. Oto lista zmian formatów znaków i ich znaczenie w ERDDAP™   (co czasami nieco różni się od Java DateTimeFormatter) :
    
     | Znaki | Przykłady | Znaczenie | 
     | - | - | - | 
     | u, y, Y | \\ -4712, 0, 1, 10, 100, 2018 | liczbę roku, dowolną liczbę cyfr. ERDDAP™ Leczenie (year-of-era) i Y (week- based- year, ponieważ często jest to błędnie używane zamiast y) jako u, [liczba lat astronomicznych](https://en.wikipedia.org/wiki/Astronomical_year_numbering) . Astronomiczne lata są dodatnie lub ujemne liczby całkowite, które nie korzystają z BCE (BC) lub CE (AD) Oznaczenie ery: 2018 = 2018CE,..., 2 = 2CE, 1 = 1CE, 0 = 1BCE, -1 = 2BCE, -2 = 3BCE,... | 
     | Uuuu, yyy, RRRR | (Dz.U. L 298 z 26.10.2012, s. 1). | 4-cyfrowy numer astronomiczny roku (ignorując wszelkie poprzednie '-')   | 
     | do | 1, 01, 12 | liczba miesięczna, każda liczba cyfr (1 = styczeń)   | 
     | MM | 01, 12 | 2 cyfry (zero wyścielonych) numer miesiąca | 
     | MMM | Jan, jan, JAN | 3-literowa angielska nazwa miesiąca, nieczuła sprawa | 
     | MMMM | Jan, jan, JAN, styczeń, styczeń, STYCZEŃ | 3-literowa lub pełna angielska nazwa miesiąca, niedelikatna sprawa | 
     | d | 1, 01, 31 | liczba dni miesiąca, każda liczba cyfr | 
     | dd | 01, 31 | 2 cyfry (zero wyścielonych) Dzień miesiąca. Pierwsza cyfra może być przestrzenią. | 
     | D | 1, 001, 366 | liczba cyfr, 001 = styczeń 1 | 
     | DDD | 001, 366 | dzień - rok, 3 cyfry, 001 = styczeń 1 | 
     | EEE | z | 3-literowy dzień-tygodnia, wartość jest ignorowana podczas parsowania | 
     | EEE | Thu, Thu, Thu, Thursday, Thursday, Thursday | 3 literowe lub pełne angielski dzień-tygodnia, przypadek niewrażliwy, wartość jest ignorowana podczas parsowania | 
     | H | 0, 00, 23 | H godzina dnia (0- 23) , dowolną liczbę cyfr | 
     | HH | 00, 23 | HH hour-of-day (00- 23) 2 cyfry. Pierwsza cyfra może być przestrzenią. | 
     | a | am, AM, pm, PM | AM lub PM, niewrażliwe na przypadek | 
     | h | 12, 1, 01, 11 | Zegar - godzina - godzina - godzina (12, 1, 2,... 11) , dowolną liczbę cyfr | 
     | hh | 12, 01, 11 | Zegar - godzina - godzina - godzina (12, 1, 2,... 11) 2 cyfry. Pierwsza cyfra może być przestrzenią. | 
     | K | 0, 1, 11 | Godzina - godzina - godzina (0, 1,... 11) , dowolną liczbę cyfr | 
     | KK | 00, 01, 11 | godzina - godzina - godzina - godzina, 2 cyfry | 
     | m | 0, 00, 59 | minute- of- hour, dowolną liczbę cyfr | 
     | mm | 00, 59 | 2 cyfry | 
     | s | 0, 00, 59 | second- of- minute, dowolną liczbę cyfr | 
     | ss | 00, 59 | second- of- minute, 2 cyfry | 
     | S | 0, 000, 9, 999 | frakcja -of- second, jak gdyby po przecinku, dowolną liczbę cyfr | 
     | SS | 00, 99 | Setki sekund, 2 cyfry | 
     | SSS | 000, 999 | tysiące sekund, 3 cyfry | 
     | A | 0, 0000, 86399999 | millisecond- of- day, dowolną liczbę cyfr | 
     | AAAAAAAA | 00000000, 86399999 | milisekunda - dnia, 8 cyfr | 
     | N | 0, 00000000000000, 86399999999999 | nanosekundowy dzień, dowolną liczbę cyfr. W ERDDAP™ , to jest skrócone do nMillis. | 
     | NNNNNNNNNNNNNNN | 000000000000, 86399999999999 | Nanosekundowy dzień, 14 cyfr. W ERDDAP™ To jest skrócone do nMillis. | 
     | n | 0, 00000000000, 59999999999 | nanosekunda, każda liczba cyfr. W ERDDAP™ To jest skrócone do nMillis. | 
     | nnnnnnnnnnnnn | 00000000000, 59999999999 | Nanosekunda, 11 cyfr. W ERDDAP™ To jest skrócone do nMillis. | 
     | XXX, ZZZ | Z, -08: 00, + 01: 00 | strefa czasowa o formacie "Z" lub ± (2-cyfrowy przesunięcie godziny) : (2-cyfrowy offset minut) . To traktuje *spacja* jako + (niestandardowe) . ZZZ obsługujący 'Z' nie jest standardem, ale zajmuje się częstym błędem użytkownika. | 
     | XX, ZZ | Z -0800, + 0100 | strefa czasowa o formacie "Z" lub ± (2-cyfrowy przesunięcie godziny) : (2-cyfrowy offset minut) . To traktuje *spacja* jako + (niestandardowe) . ZZ wspierający 'Z' jest niestandardowy, ale zajmuje się częstym błędem użytkownika. | 
     | X, Z | Z, -08, + 01 | strefa czasowa o formacie "Z" lub ± (2-cyfrowy przesunięcie godziny) : (2-cyfrowy offset minut) . To traktuje *spacja* jako + (niestandardowe) . Z support 'Z' nie jest standardem, ale zajmuje się częstym błędem użytkownika. | 
     | xxx | \\ -08: 00, + 01: 00 | strefa czasowa o formacie ± (2-cyfrowy przesunięcie godziny) : (2-cyfrowy offset minut) . To traktuje *spacja* jako + (niestandardowe) . | 
     | xx | \\ -0800, + 0100 | strefa czasowa o formacie ± (2-cyfrowy przesunięcie godziny)  (2-cyfrowy offset minut) . To traktuje *spacja* jako + (niestandardowe) . | 
     | x | \\ -08, + 01 | strefa czasowa o formacie ± (2-cyfrowy przesunięcie godziny) . To traktuje *spacja* jako + (niestandardowe) . | 
     | ' | Nie "," Z "," GMT " | początek i koniec serii znaków dosłownych | 
     | '' (dwa pojedyncze kwotowania)   | '' | dwa pojedyncze cytaty oznaczają dosłowny pojedynczy cytat | 
     |   \\[  \\]   |   \\[   \\]   | początek (" \\[ ") i koniec (" \\] ") sekcji fakultatywnej. Notacja ta jest obsługiwana tylko dla znaków dosłownych i na końcu łańcucha formatu. | 
     | #, & # 123;, & # 125; | #, & # 123;, & # 125; | zarezerwowane do przyszłego użytku | 
     | G, L, Q, e, c, V, z, O, p |       | Te formatowanie znaków są obsługiwane przez Java DateTimeFormatter, ale obecnie nie obsługiwane przez ERDDAP . Jeśli potrzebujesz dla nich wsparcia, napisz do Chrisa. John w Noa.gov. | 
    
Uwagi:
    
    * W czasie z interpunkcją wartości liczbowe mogą mieć zmienną liczbę cyfr (na przykład, w formacie US slash date "1 / 2 / 1985", miesiąc i data mogą być 1 lub 2 cyfry) Format ten musi zatem stosować jednoliterowe żetony, np. M / d / rrrr, które akceptują dowolną liczbę cyfr dla miesiąca i daty.
    * Jeżeli liczba cyfr dla danej pozycji jest stała, np. 01 / 02 / 1985, należy podać liczbę cyfr w formacie, np. MM / dd / rrrr dla dwucyfrowego miesiąca, dwucyfrowego dnia i czterocyfrowego roku.
    * Te formaty są trudne do pracy. Podany format może pracować dla większości, ale nie dla wszystkich, łańcuchów czasu dla danej zmiennej. Zawsze sprawdzaj, czy określony format działa zgodnie z oczekiwaniami w ERDDAP dla wszystkich strun czasowych zmiennej.
    * Jeśli to możliwe, GenerateDatasetXml będzie sugerować łańcuchy formatu czasu.
    * Jeśli potrzebujesz pomocy przy generowaniu łańcucha formatu, wyślij wiadomość do Chrisa. John w Noa.gov.

Główna zmienna danych czasowych (dla zbiorów danych tabelarycznych) i główną zmienną osi czasu (dla zestawów danych w sieci) są uznawane przez [ destinationName ](#destinationname) Czas. Ich metadane jednostkowe muszą być zgodne z UDUNITS- ciągiem jednostek dla liczbowych wartości czasowych, np. "dni od 1970- 01- 01" (dla zestawów danych tabelarycznych lub siateczkowych) lub [jednostki odpowiednie do czasów strun](#string-time-units) , np. "M / d / rrrr". (dla zbiorów danych tabelarycznych) .

Różne jednostki czasowe w różnych Gridded .nc Pliki - Jeśli masz kolekcję uchwytów .nc pliki, w których dla zmiennej czasu jeden podzbiór plików używa innych jednostek czasowych niż jeden lub więcej innych podzbiór plików, można użyć [ EDDGrid FromNcFilesUnpacked](#eddgridfromncfilesunpacked) . Konwertuje wartości czasu do "seconds since 1970-01-01T00:00:00Z" na niższym poziomie, co ukrywa różnice, tak, że można zrobić jeden zestaw danych z kolekcji heterogenicznych plików.

###### Zmienne znaczników czasu{#timestamp-variables} 
 [Zmienne znaczników czasu](#timestamp-variables) -- Inne zmienne ( axisVariable lub dataVariable , w EDDGrid lub zbiór danych EDDTable) może być zmienną timeStamp. Zmienne znaczników czasu są zmiennymi, które mają jednostki związane z czasem i dane czasowe, ale mają&lt; destinationName &gt; inny niż czas. Zmienne TimeStamp zachowują się jak zmienna czasu głównego w tym, że przekształcają format czasu źródła w "seconds since 1970-01-01T00:00:00Z" lub ISO 8601: 2004 (E) format). ERDDAP™ rozpoznaje czas Zmienne znaczników według ich czasu związane " [jednostki](#units) "metadane, które muszą pasować do tego wyrażenia regularnego" \\[ a- za- Z \\] + + od + \\[ 0- 9 \\] . + " (dla daty liczbowej Na przykład, "seconds since 1970-01-01T00:00:00Z" ) lub być datą Tekst w formacie czasowym zawierający "uuuu", "yyyy" lub "YYY" (na przykład ", yyyy-MM-dd Nie.) . Ale proszę nadal używać destinationName   "time" dla daty głównej Zmienna czasu.

 **Zawsze sprawdzaj swoją pracę, aby mieć pewność, że dane czasowe, które pojawiają się w ERDDAP™ jest właściwym czasem.** Praca z danymi czasowymi jest zawsze trudna i podatna na błędy.

Patrz [więcej informacji o zmiennych czasowych](#destinationname) .
 ERDDAP™ ma przydatność do [Przelicz licznik Czas do / z czasu smyczkowego](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
Patrz [Jak ERDDAP™ Transakcje z czasem](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
         
        
######  valid\\_range  {#valid_range} 
*    [ ** valid\\_range ** lub ** valid\\_min ** oraz ** valid\\_max ** ](#valid_range) -- Są to atrybuty zmiennej opcyjnej zdefiniowane w [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) konwencje metadanych. Na przykład:

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

lub

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * Jeżeli występują, powinny one być tego samego typu danych co zmienna i powinny określać ważne wartości minimalne i maksymalne danych dla tej zmiennej. Użytkownicy powinni uznać wartości spoza tego zakresu za nieprawidłowe.
    *    ERDDAP™ nie stosuje się valid\\_range . Powiedział inaczej: ERDDAP™ nie konwertuje wartości danych poza valid\\_range do\\ _ Wypełnij Wartość lub missing\\_value . ERDDAP™ po prostu przekazuje te metadane i pozostawia aplikację do Ciebie.
Dlaczego? Po to są te metadane. Jeśli dostawca danych chciałby, dostawca danych mógłby przekonwertować wartości danych poza valid\\_range być\\ _ FillValues. ERDDAP™ nie odgadł dostawcy danych. Takie podejście jest bezpieczniejsze: jeśli później zostanie wykazane, że valid\\_range była zbyt wąska lub w inny sposób nieprawidłowa, ERDDAP™ nie wymazał danych.
    * Jeśli dane są zapakowane [ scale\\_factor lub add\\_offset ](#scale_factor) , valid\\_range , valid\\_min oraz valid\\_max powinny być zapakowane dane typu i wartości. Od ERDDAP™ stosuje się scale\\_factor oraz add\\_offset kiedy załaduje zbiór danych, ERDDAP™ rozpakuje valid\\_range , valid\\_min oraz valid\\_max wartości tak, że metadane docelowe (pokazane użytkownikom) wskazuje rodzaj i zakres niezapakowanych danych.
Albo, jeśli rozpakowany\\ _ valid\\_range atrybut jest obecny, zostanie przemianowany valid\\_range kiedy ERDDAP™ ładuje zbiór danych.
##### &lt;removeMVRows & gt;{#removemvrows} 
* [ ** &lt;removeMVRows &gt; ** ] (# removemvrows) jest znacznikiem opcjonalnym wewnątrz znacznika w datasets.xml dla plików EDDTableFromFiles (w tym wszystkie podklasy) zbiorów danych, chociaż jest on używany tylko dla plików EDDTableFromMultidimNcFiles. Może mieć wartość prawdziwą lub fałszywą. Na przykład, prawda
Usuwa to dowolny blok wierszy na końcu grupy, gdzie wszystkie wartości są missing\\_value ,\\ _ FillValue, or the Cohort... Array rodzimej wartości brakującej (lub char = # 32 dla CharArrays) . Dotyczy to typu pliku wielowymiarowego CF DSG Array i podobnych plików. Jeśli to prawda, to robi właściwy test i tak zawsze ładuje wszystkie zmienne max dim, więc może to zająć więcej czasu.
Domyślną wartością jest false.
Zalecenie... Jeśli to możliwe dla zestawu danych, zalecamy ustawienie removeMVRows do false. Ustawienie removeMVRows do true może znacznie spowolnić żądania, choć może być potrzebne do niektórych zbiorów danych.
