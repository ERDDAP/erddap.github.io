# Flagi

Ta strona dokumentuje flagi konfiguracyjne dostępne w systemie. Flagi te kontrolują różne funkcje, zdolności eksperymentalne i zachowania dziedziczne.

##  **Flaga Lifecycle Legenda** 

*  **Stabilny:** Przeznaczone jako długoterminowe flagi, aby umożliwić administratorom zmianę funkcjonalności. Bezpieczna do produkcji.
*  **Badanie:** Funkcje, które są gotowe do testowania. Będą one albo ukończyć do "Stabilny" lub ostatecznie być ustawione do ich wartości docelowej i usunąć flagę.
*  **W ramach budowy:** Obecnie zaszyfrowane do false w kodzie, niezależnie od konfiguracji. Funkcja nie jest jeszcze gotowa do użycia.

##  **Uzasadnienie Optymalizacja badań** 

Są to flagi, które prawdopodobnie zostaną usunięte w przyszłości.

###  **touchThreadOnly When enElements** 

Opis
Flaga optymalizacji. Jeśli to prawda, wątek dotykowy działa tylko wtedy, gdy są elementy do przetworzenia.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Badanie | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dodano w 2.29.0 | 

###  **taskCacheClear** 

Opis
Włącza zadanie tła, które usuwa wygasłe elementy z pamięci podręcznej.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dodano w 2.27.0 | 

###  **Plik ncHeaderMakeName** 

Opis
Jeśli to prawda, serwer wygeneruje cały plik nc przed utworzeniem ncheadera. Nowy (preferowane) zachowanie, gdy false jest bezpośrednio generować wynik ntaniej.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Badanie | 
 |   **Aktualny domyślny**   | false | 
 |   **Cel długoterminowy**   | false | 
 |   **Historia**   | Dodano w 2.29.0 | 

###  **useEddReflection** 

Opis
Umożliwia użycie Java Refleksja do zahamowania EDD ( ERDDAP Zestaw danych) zajęcia.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Badanie | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Domyślnie zmienione na prawdziwe w 2.28.0, dodane w 2.25 | 

###  **backgroundCreateSubsetTablice** 

Opis
Pozwala na tworzenie tabel podzakreślonych w wątkach tła, aby poprawić czas wczytywania zbiorów danych.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Badanie | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dodano w 2.29.0 | 

###  **User NcMetadataForFileTable** 

Opis
Wykorzystanie NetCDF metadane do popularyzacji widoku tabeli plików. W szczególności jeśli plik nc zawiera rzeczywiste _ range dla każdej zmiennej, wczytanie zbioru danych może pominąć odczytanie całego pliku.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dodano w 2.29.0 | 

##  **System & zachowanie rdzenia** 

###  **e-mail Isactive** 

Opis
Kontroluje, czy system próbuje wysłać faktyczne wiadomości e-mail (np. dla aktualizacji subskrypcji lub raportów błędów) za pośrednictwem skonfigurowanego serwera SMTP.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | false | 
 |   **Cel długoterminowy**   | prawda (Zależny od konfiguracji administratora)   | 
 |   **Historia**   | Dziedzictwo | 

::: info Logika
Flaga ta jest obliczana dynamicznie przy starcie. Domyślnie false, chyba że wszystkie wymagane referencje SMTP (host, port, użytkownik, hasło, adres) są ściśle przewidziane w setup.xml.
::

###  **showLoadErrorsOnStatusPage** 

Opis
Określa, czy szczegółowe błędy obciążenia zbioru danych są wyświetlane publicznie na stronie statusu.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | ustawione zgodnie z życzeniem | 
 |   **Historia**   | Dodano w 2.25 | 

###  **defaultAccessibleViaFiles** 

Opis
Ustawia domyślne zachowanie dla tego, czy podstawowe pliki zbioru danych mogą być dostępne w serwisie plików.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | false | 
 |   **Cel długoterminowy**   | false | 
 |   **Historia**   | Dodano w 2.10 | 

##  **Ustawienia Datasety** 

###  **szybkie wznowienie** 

Opis
Jeśli jest to włączone, system stara się rozpocząć szybciej, pomijając niektóre głębokie kontrole walidacji zbiorów danych podczas inicjalizacji.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dodano w 1.38 | 

###  **enableEnvParsing** 

Opis
Umożliwia przetwarzanie datasets.xml plik z [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Ma to wiele zastosowań, w tym ustalanie wartości prywatnych (jak hasła) przy użyciu zmiennych środowiskowych.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | ustawione zgodnie z życzeniem | 
 |   **Historia**   | Dodano w 2.29.0 | 

###  **useSaxParser** 

Opis
Przełącza wewnętrzny silnik parsujący XML na SAX (Prosty API dla XML) Parser zamiast DOM parser. Umożliwia to kilka nowych zaawansowanych funkcji, takich jak XInclude, i [niestandardowe atrybuty wyświetlania](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Badanie | 
 |   **Aktualny domyślny**   | false | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dodano w 2.25 | 

###  **listPrivateDatasets** 

Opis
Określa, czy prywatne zbiory danych (osoby wymagające uwierzytelniania) pojawi się na liście głównych zbiorów danych.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | false | 
 |   **Cel długoterminowy**   | false | 
 |   **Historia**   | Dodano w 1.20 | 

###  **PoliticalBoundariesActive** 

Opis
Sprawdza, czy granice polityczne mogą być rysowane na mapach.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dodano w 1.80 | 

##  **Metadane i normy** 

###  **fgdcActive** 

Opis
Generuje i obsługuje FGDC (Federalny Geograficzny Komitet ds. Danych) metadane.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dodano w 1.38 | 

###  **iso19115 Aktywne** 

Opis
Generuje i obsługuje metadane ISO 19115.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dodano w 1.38 | 

###  **UZYSISO19115** 

Opis
Wykorzystuje bibliotekę Apache SIS do generowania metadanych ISO 19115 zamiast istniejącego generatora. Jeśli to jest włączone i nie jest używane SisISO19139, domyślne metadane IOS 19115 będą w formacie ISO19115 _ 3 _ 2016. Jeśli jest to false, domyślny format będzie w zmienionym formacie ISO19115 _ 2.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Badanie | 
 |   **Aktualny domyślny**   | false | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dodano w 2.26 | 

###  **UZYSISO19139** 

Opis
Wykorzystuje bibliotekę Apache SIS do generowania metadanych ISO19139 _ 2007.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Badanie | 
 |   **Aktualny domyślny**   | false | 
 |   **Cel długoterminowy**   | false | 
 |   **Historia**   | Dodano w 2.29.0 | 

###  **jsonldActive** 

Opis
Generuje i obsługuje JSON- LD (Dane powiązane) metadane.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dziedzictwo | 

###  **generateCroissantSchema** 

Opis
Generuje schemat metadanych "Croissant" jako domyślny schemat gotowości do uczenia się maszynowego.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Badanie | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dodano w 2.28.0 | 

###  **variablesMustHaveloosCategory** 

Opis
Wymusza, że zmienne muszą mieć atrybut kategorii IOOS.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | ustawione zgodnie z życzeniem | 
 |   **Historia**   | Dziedzictwo | 

###  **includeNcCFSubsetZmienne** 

Opis
Zachowanie Legacy miało na celu generowanie zmiennych tylko dla zbiorów danych EDDTableFromNcCFFiles. Zostało to dodane do domyślnego zachowania EDDTableFromNcCFFiles, aby być spójne z innymi typami danych. Jeśli potrzebujesz dziedzicznego automatycznego subsetVariables Możesz to włączyć. Lepszym rozwiązaniem byłoby dodanie subsetVariables do definicji zbioru danych.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Badanie | 
 |   **Aktualny domyślny**   | false | 
 |   **Cel długoterminowy**   | false | 
 |   **Historia**   | Dodano w 2.26 | 

##  **Oznaczenia subskrypcji i powiadomień** 

###  **subscriptionSystemActive** 

Opis
Włącza system subskrypcji e-mail dla aktualizacji zbioru danych.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dodano w 1.14 | 

###  **subscribeToRemoteErddapDataset** 

Opis
Umożliwia to ERDDAP instancja do subskrypcji zdalnego ERDDAP zbiory danych do aktualizacji.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dodano w 1.70 | 

###  **updateSubsRssOnFileChanges** 

Opis
Podajniki subskrypcji i RSS aktualizacje po zmianie podstawowych plików. Zachowanie było tylko po to, aby zrobić aktualizacje o przeładowaniu zbioru danych (które niektóre serwery miały rzadko co tydzień) .

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dodano w 2.26 | 

###  **Włącz MqttBroker** 

Opis
Rozpoczyna wewnętrzny broker MQTT w aplikacji do obsługi wiadomości.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Badanie | 
 |   **Aktualny domyślny**   | false | 
 |   **Cel długoterminowy**   | ustawione zgodnie z życzeniem | 
 |   **Historia**   | Dodano w 2.29.0 | 

###  **publishMqttNotif** 

Opis
Umożliwia publikację powiadomień (jak zmiany zbioru danych) do pośrednika MQTT.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Badanie | 
 |   **Aktualny domyślny**   | false | 
 |   **Cel długoterminowy**   | ustawione zgodnie z życzeniem | 
 |   **Historia**   | Dodano w 2.29.0 | 

##  **Name** 

###  **dla Url** 

Opis
Umożliwia korzystanie z nagłówków HTTP w celu określenia szczegółów URL żądania (przydatne za proxy) .

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Domyślnie zmienione na prawdziwe w 2.28.0, Dodano w 2.27.0 | 

###  **Włącz Kors** 

Opis
Umożliwia dzielenie się zasobami na krzyże-pochodzenie (CORS) nagłówki odpowiedzi HTTP.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | false | 
 |   **Cel długoterminowy**   | ustawione zgodnie z życzeniem | 
 |   **Historia**   | Dodano w 2.26 | 

##  **Znajdź** 

###  **Use LucieneSearchEngine** 

Opis
Przełącza wewnętrzną wyszukiwarkę, aby używać Apache Lucene.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Badanie | 
 |   **Aktualny domyślny**   | false | 
 |   **Cel długoterminowy**   | ? | 
 |   **Historia**   | Dziedzictwo | 

##  **Usługi i protokoły** 

###  **filesActive** 

Opis
Włącza widok przeglądarki "Pliki" dla pakietów danych, które go obsługują.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dodano w 1.58 | 

###  **convertersActive** 

Opis
Włącza narzędzia do konwersji w UI.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dodano w 1.44 | 

###  **slideSorterActive** 

Opis
Włącza Slide Sorter.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dodano w 1.44 | 

###  **dataProviderFormActive** 

Opis
Włącza formularz umożliwiający dostawcom danych wprowadzanie metadanych.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dziedzictwo | 

###  **outOfDateDatasetsActive** 

Opis
Umożliwia zgłaszanie zbiorów danych po terminie.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dodano do 1.82 | 

###  **wmsActive** 

Opis
Włącza usługę Web Map ( WMS ) interfejs.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dodano w 1.44 | 

###  **wmsClientActive** 

Opis
Włącza wewnętrzną WMS funkcje klienta.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | Stabilny | 
 |   **Aktualny domyślny**   | prawda | 
 |   **Cel długoterminowy**   | prawda | 
 |   **Historia**   | Dziedzictwo | 

###  **geoServicesRestActive** 

Opis
Włącza RESTful interfejs dla usług geoprzestrzennych. Nie w pełni wdrożony.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | W trakcie budowy | 
 |   **Aktualny domyślny**   | false (Hardcode)   | 
 |   **Cel długoterminowy**   | prawda | 

###  **wcsActive** 

Opis
Włącza usługę pokrycia stron internetowych ( WCS ) interfejs. Nie w pełni wdrożony.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | W trakcie budowy | 
 |   **Aktualny domyślny**   | false (Hardcode)   | 
 |   **Cel długoterminowy**   | prawda | 

###  **sodActive** 

Opis
Włącza usługę obserwacji czujników ( SOS ) interfejs.

 | Własność | Szczegóły | 
 | : -- | : -- | 
 |   **Cykl życia**   | W trakcie budowy | 
 |   **Aktualny domyślny**   | false (Hardcode)   | 
 |   **Cel długoterminowy**   | prawda | 
