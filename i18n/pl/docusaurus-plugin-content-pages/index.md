---
title: "ERDDAP™ Documentation"
---
## Ostatnia ERDDAP™ wersja{#latest-erddap-version} 

2.29.0, patrz [zmienia dokumentację](/changes#version-2290) oraz [Pobierz go](https://github.com/ERDDAP/erddap/releases/tag/v2.29.0) .

##  ERDDAP™ informacje{#erddap-information} 

 ERDDAP™ jest serwerem danych naukowych, który daje użytkownikom prosty, spójny sposób pobierania podzbiorów
taktowane i tabelaryczne zbiorów danych naukowych we wspólnych formatach plików i zrobić wykresy i mapy.
 ERDDAP™ jest wolnym i otwartym źródłem (Apache i Apache- like)   Java Serwlet z NOAA   NMFS   SWFSC Dział Badań nad Środowiskiem ( ERD ) .

* Aby zobaczyć / użyć ERDDAP™ instalacja: [https://coastwatch.pfeg.noaa.gov/erddap/index.html](https://coastwatch.pfeg.noaa.gov/erddap/index.html) 
* Aby rozpocząć od instalacji odczytu [przewodnik instalacyjny](/docs/server-admin/deploy-install) .
* Aby dodać kod patrz [przewodnik programisty](/docs/contributing/programmer-guide) .


Poniżej znajdziesz odpowiednie linki do zadawania pytań i jak się do nich przyczynić.
* Przegląd rozmów i zadawać pytania na [https://groups.google.com/g/erddap](https://groups.google.com/g/erddap) lub [https://github.com/erddap/erddap/discussions](https://github.com/erddap/erddap/discussions) 
* Przegląd i przedstawienie kwestii [https://github.com/erddap/erddap/issues](https://github.com/erddap/erddap/issues) 
* W celu zaproponowania wniosków dotyczących funkcji należy postępować zgodnie z poniższymi wytycznymi: [ ERDDAP Dyskusje # 93 (komentarz) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427) 


## Wyszukaj wiele ERDDAP™ s
Są dwa sposoby, aby przeszukać wiele ERDDAP™ s dla zbiorów danych: [Wyszukaj wiele ERDDAP™ s](/SearchMultipleERDDAPs.html) oraz [ ERDDAP™ Odkrywanie danych](http://erddap.com/) .


## Ustaw własną ERDDAP™  {#set-up-your-own-erddap} 

 ERDDAP™ jest [Wolne i otwarte źródło](https://en.wikipedia.org/wiki/Free_and_open-source_software) , all - Java   (servlet) , web application, która działa w serwerze aplikacji web (na przykład, Tomcat (zalecane) lub Jetty (To działa, ale my tego nie popieramy.) ) . Ta strona jest głównie dla ludzi (" ERDDAP™ administratorzy ") którzy chcą założyć własne ERDDAP™ instalacji na własnej stronie internetowej.

Aby rozpocząć od instalacji odczytu [przewodnik instalacyjny](/docs/server-admin/deploy-install) .

### Dlaczego ERDDAP™ by rozpowszechniać dane?{#why-use-erddap-to-distribute-your-data} 

Ponieważ mały wysiłek, aby ustawić ERDDAP™ przynosi wiele korzyści.

* Jeśli masz już usługę internetową do rozpowszechniania danych,
możesz ustawić ERDDAP™ dostęp do danych za pośrednictwem istniejącej usługi.
Albo, możesz ustawić ERDDAP™ dostęp do danych bezpośrednio z lokalnych plików.
* Dla każdego zbioru danych, wystarczy napisać mały fragment XML, aby powiedzieć ERDDAP™ jak uzyskać dostęp do zbioru danych.
* Raz ERDDAP™ obsługa danych, użytkownicy końcowi mogą:
    * Poprosić o dane na różne sposoby ( DAP , WMS i więcej w przyszłości) .
    * Pobierz odpowiedź danych w różnych formatach plików. (To prawdopodobnie największy powód&#33;) 
    * Zrób wykresy i mapy. (Wszyscy lubią ładne zdjęcia.) 
    * Zbuduj inne przydatne i interesujące rzeczy na górze ERDDAP usług internetowych -- zobacz [ Awesome ERDDAP ™](https://github.com/IrishMarineInstitute/awesome-erddap) lista niesamowite ERDDAP - projekty powiązane.

Możesz. [Dostosuj](/docs/server-admin/deploy-install#customize) do ERDDAP Wygląd tak ERDDAP™ odzwierciedla swoją organizację i pasuje do reszty swojej strony internetowej.

## Czy procedura instalacji jest trudna? Mogę to zrobić?{#is-the-installation-procedure-hard-can-i-do-it} 

Początkowa instalacja zajmuje trochę czasu, ale nie jest zbyt trudna. Dasz radę. Jeśli utkniesz, napisz do mnie erd dot data at noaa dot gov . Pomogę ci.
Albo, możesz dołączyć do [ ERDDAP™ Grupa Google / Lista pocztowa](https://groups.google.com/g/erddap) i wyślij tam swoje pytanie.

## Kto używa ERDDAP™  {#who-uses-erddap} 

 ERDDAP™ został zainstalowany przez około 100 organizacji w co najmniej 17 krajach

 (Australia, Belgia, Kanada, Chiny, Francja, Indie, Irlandia, Włochy, Nowa Zelandia, Rosja, Republika Południowej Afryki, Hiszpania, Sri Lanka, Szwecja, Tajlandia, Wielka Brytania, USA) w tym:

*    [APDRK](https://apdrc.soest.hawaii.edu/erddap/index.html)   (Asia- Pacific Data- Research Center, International Pacific Research Center) na Uniwersytecie Hawajskim (UH)  
*    [BCO- DMO w WHOI](https://erddap.bco-dmo.org/erddap/index.html)   (Biologiczna i chemiczna oceanografia Biuro zarządzania danymi w Woods Hole Oceanographic Instytucja)  
*    [CanWIN ERDDAP™ ](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)   (Kanadyjska Sieć Informacji Wodnej) w Centrum Nauki Obserwacji Ziemi (CEOS) , Uniwersytet Manitoba
*    [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)   (Program informacji o danych przybrzeżnych w UCSD)  
*    [CNR- ISP](https://data.iadc.cnr.it/erddap/index.html)   (Krajowa Rada Badawcza Włoch, Instytut Nauk Polarnych)  
* CSIRO i IMOS (Australia 's Commonwealth Scientific and Industrial Research Organisation and the Integrated Marine Observing System) 
*    [DIVER ( NOAA ORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)   ( NOAA Biuro Reagowania i Przywracania)  
*    [Fizyka EMODnet](https://erddap.emodnet-physics.eu/erddap/index.html)   (Europejska sieć obserwacji i danych morskich -- Fizyka)  
*    [GoMRI](https://erddap.griidc.org/erddap/index.html)   (Inicjatywa badawcza w Zatoce Meksykańskiej)  
*    [Instytut Hakai](https://catalogue.hakai.org/erddap/index.html)   (Instytut Hakai na Środkowym Wybrzeżu Kolumbii Brytyjskiej, Kanada) 
*    [Usługi w zakresie technologii licealnych](https://myhsts.org) , który oferuje szkolenia kodowania i technologii dla studentów i dorosłych
*    [ICHEC](https://erddap.ichec.ie/erddap/index.html)   (Irish Centre for High- End Computing) 
*    [I NCO IS](https://erddap.incois.gov.in/erddap/index.html)   (Indyjskie Narodowe Centrum Informacji Morskiej)  
* IRD (Institut de Recherche pour le Développement, Francja)   
CNRS (Centre National de la Recherche Scientifique, Francja)   
UPMC (Université Pierre et Marie CURIE, Paris, Francja)   
UCAD (Université Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger -- Saint- Louis du Sénégal)   
UFHB (Université Félix HOUPHOUSTERT-BOIGNY, Abidżan, Wybrzeże Kości Słoniowej)   
IPSL (Institut Pierre Simon Laplace des sciences de l 'environnement, Paris, Francja)   
LMI ECLAIRS (Laboratoire Mixte International "Etude du Climat en Afrique de l 'Ouest et de ses Interactions avec l' Environnement Régional, et appui aux services climatiques") 
* WCB (Komisja Europejska - Wspólne Centrum Badawcze, Unia Europejska) 
*    [Instytut Morski](https://erddap.marine.ie/erddap/index.html)   (Irlandia)  
* Instrumenty morskie S.A. (Hiszpania) 
* NCI (Australijska Narodowa Infrastruktura Komputerowa) 
*    [ NOAA CoastWatch](https://coastwatch.noaa.gov/erddap/index.html)   (centralne)  
*    [ NOAA CoastWatch CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)   (Karaiby / Zatoka Meksykańska Węzeł)  
*    [ NOAA CoastWatch GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)   (Węzeł Wielkich Jezior)  
*    [ NOAA CoastWatch West Coast](https://coastwatch.pfeg.noaa.gov/erddap/index.html) który jest współzlokalizowany i pracuje z
     [ NOAA   ERD ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (Dział Badań Środowiska SWFSC z NMFS ) 
*    [ NOAA Czujniki IOOS](https://erddap.sensors.ioos.us/erddap/index.html)   (Zintegrowany system obserwacji oceanów)  
*    [ NOAA IOOS Ce NCO OS](https://erddap.axiomdatascience.com/erddap/index.html)   (Centralny i Północny system obserwacji Oceanu Kalifornijskiego, prowadzony przez Axiom Data Science)  
*    [ NOAA IOOS GCOOS Atmosfera i dane oceanograficzne: system obserwacji](https://erddap.gcoos.org/erddap/index.html)   
     [ NOAA IOOS GCOOS Atmosfera i dane oceanograficzne: kolekcje historyczne](https://gcoos5.geos.tamu.edu/erddap/index.html)   
     [ NOAA IOOS GCOOS Biological and Socioeconomics](https://gcoos4.tamu.edu/erddap/index.html)   (System obserwacji Oceanu Przybrzeżnego Zatoki Perskiej) 
*    [ NOAA IOOS NERACOOS](http://www.neracoos.org/erddap/index.html)   (Północno-wschodnie Regionalne Stowarzyszenie Systemów Obserwacji Wybrzeża i Oceanu)  
*    [ NOAA IOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)   (National Glider Centrum gromadzenia danych)  
*    NOAA IOOS NANOOS (Northwest Association of Networked Ocean Observing Systems) 
*    [ NOAA IOOS Pacioos](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)   (System obserwacji Oceanu Spokojnego) na Uniwersytecie Hawajskim (UH)  
*    NOAA IOOS SCCOOS (Południowa Kalifornia Ocean Przybrzeżny Observing System) 
*    [ NOAA IOOS SECOORA](https://erddap.secoora.org/erddap/index.html)   (Południowo-wschodni Ocean Przybrzeżny Obserwuje Regionalne Stowarzyszenie)  
*    [ NOAA NCEI](https://www.ncei.noaa.gov/erddap/index.html)   (Krajowe Centra Informacji o Środowisku)    
*    NOAA NGDC STP (National Geofisical Centrum danych, Solar -- Fizyka lądowa) 
*    NOAA   NMFS NEFSC (Centrum Naukowe ds. Rybołówstwa Północno-Wschodniego) 
*    [ NOAA NOS CO- OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)   (Centrum Operacyjnych Produktów i Usług Oceanograficznych)  
*    [ NOAA OSMC](http://osmc.noaa.gov/erddap/index.html)   (Obserwacyjne Centrum Monitorowania Systemów)  
*    [ NOAA PIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)   (Centrum Naukowe Rybołówstwa Wysp Pacyfiku)  
*    [ NOAA PMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html) 
*    [ NOAA PolarWatch](https://polarwatch.noaa.gov/erddap/index.html) 
*    [ NOAA UAF](https://upwell.pfeg.noaa.gov/erddap/index.html)   (Jednolite ramy dostępu)  
*    [Ocean Networks Canada](http://dap.onc.uvic.ca/erddap/index.html)  
*    [Sieć śledzenia oceanów](https://members.oceantrack.org/erddap/index.html)  
*    [OOI / wszystkie dane](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)   (Inicjatywa "Obserwatoria Oceanu")   
Dane OOI / niekasowane
* Princeton, Grupa Badawcza Hydrometeorologii
* R.Tech Engineering, Francja
*    [Uniwersytet Rutgers, Wydział Nauk Morskich i Przybrzeżnych](https://tds.marine.rutgers.edu/erddap/index.html)   
* Instytut Estuary w San Francisco
*    [Scripps Institution of Oceanography, Spray Underwater Gliders](https://spraydata.ucsd.edu/erddap/index.html)  
*    [Inteligentny Atlantyk](https://www.smartatlantic.ca/erddap/index.html) Memoriał University of Newfoundland
* Południowoafrykańska Sieć Obserwacji Środowiska
* Spyglass Technologies
* Uniwersytet Stanforda w Hopkins Marine Station
*    [Ioda UNESCO](https://erddap.oa.iode.org/erddap/index.html)   (Międzynarodowe oceanograficzne i informacyjne Wymiana danych)  
*    [Uniwersytet Kolumbii Brytyjskiej, Ziemia, Ocean & Atmosfera Dział Nauk](https://salishsea.eos.ubc.ca/erddap/index.html)  
*    [Uniwersytet Kalifornijski w Davis, Laboratorium Morskie Bodega](http://bmlsc.ucdavis.edu:8080/erddap/index.html)  
*    [Uniwersytet w Delaware, Satellite Receiving Station](https://basin.ceoe.udel.edu/erddap/index.html)  
* Uniwersytet Waszyngtoński, Laboratorium Fizyki Stosowanej
*    [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)   (Program Geologiczny Wybrzeża i Morza)  
*    [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)   (Głos Ocean, Szwecja)  

To jest lista tylko niektórych organizacji, gdzie ERDDAP™ został zainstalowany przez jakąś osobę lub grupę. Nie oznacza to, że osoba, grupa lub organizacja zaleca lub popiera ERDDAP .

###  ERDDAP™ jest zalecane w NOAA i CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
 [ NOAA Dyrektywa proceduralna w sprawie dostępu do danych](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) obejmuje ERDDAP™ w wykazie zalecanych serwerów danych do wykorzystania przez grupy w ramach NOAA . ERDDAP™ jest dobrze wymienione w sekcji 4.2.3
[Guide de bonnes pratiques sur la gestion des données de la recherche
 (Zarządzanie danymi badawczymi Przewodnik dotyczący najlepszych praktyk) ] (https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales) Centrum National de la Recherche Scientifique (CNRS) we Francji.

## Pokazy slajdów{#slide-shows} 

Oto niektóre pokazy slajdów PowerPoint i dokumenty, które Bob Simons stworzył związane z ERDDAP .

 **DISCLAIMER: Treść i opinie wyrażone w tych dokumentach są osobiste opinie Boba Simonsa i niekoniecznie odzwierciedlają stanowisko rządu lub National Oceanic and Atmospheric Administration .** 

Cztery główne dokumenty:

*    [Główne wprowadzenie do ERDDAP™   (wersja 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx) .
Można również [Obejrzyj ten film, jak Bob wygłasza tę rozmowę![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4) .
*    [Opis jednej strony ERDDAP™   (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf) 
*    [ ERDDAP : Heavy Loads, Grids, Clusters, Federations, and Cloud Computing](/docs/server-admin/scaling) 
*    [Wytyczne Boba dotyczące systemów dystrybucji danych](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html) 

Inne prezentacje:

*    [2020 EDM: Nowe funkcje w ERDDAP™ v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx) 
*    [2020- 05- 19 DMIT: Zakup danych](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)   (Lub [Obejrzyj ten film, jak Bob wygłasza tę rozmowę](https://www.youtube.com/watch?v=9ArYxgwON2k) .) 
*    [2019 IOOS DMAC: Nowe funkcje w ERDDAP™ v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx) 
*    [2018 Summer ESIP: Subsetting In ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx) 
*    [2018 Summer ESIP: Wsparcie dla JSON ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx) 
*    [2018 EDM: dystrybuowany system usług internetowych (Szybszy, łatwiejszy, mniej kosztowny)   (Albo dlaczego byłam szczęśliwa 4 lata temu.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx) 
*    [EDM 2018: ERDDAP™ w 2018 r.](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx) 
*    [2018 EDM: Nowe funkcje w ERDDAP™ dla obrazu, dźwięku i danych wideo](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx) 
*    [2018 EDM: UAF i ERDDAP™ Rozwiązania dla integracji danych](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx) 
*    [2017 EDM: Szybkie wprowadzenie do ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx) 
*    [2017 EDM i 2017 IOOS: nowe lub mało znane ERDDAP™ Cechy (dla użytkowników) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx) 
*    [2017 EDM i 2017 IOOS: nowe lub mało znane ERDDAP™ Cechy (dla administratorów) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx) 
*    [2017 EDM: EML, KNB oraz ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx) 
*    [2017 EDM: Jak dane docierają ze źródła do użytkownika końcowego? Old School kontra New School](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx) 
*    [2016 Summer ESIP: Duży obraz: PARR, OPeNDAP , ERDDAP™ oraz dystrybucja danych](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx) 
*    [2016 EDM: Jeden i gotowy](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx) 
*    [2016 Gov API: Następne pokolenie Serwery danych](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx) 
*    [2015 Summer ESIP: Agregacja tabelaryczna](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx) 
*    [2014 EDM: Bob 's Do' s and Don 't for Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx) 
*    [2014 EDM: Idealny interfejs użytkownika](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx) 
*    [2014 Summer ESIP: dane tabelaryczne](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx) 
*    [2013: Don 't Treat In- Situ and Tabular Data Like Gridded Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html) 
*    [2013 EDM: zrobić więcej z mniej](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt) 
*    [2012 EDM: Wytyczne dotyczące systemów dystrybucji danych](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt) 

Prezentacje innych osób:

*    [Narzędzie oparte na FAIR służące poprawie wymiany danych globalnych![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)   
Kevin O 'Brien z Globalnego Systemu Obserwacji Oceanu (GOOS) Webinar / Grupa Koordynacyjna ds. Obserwacji (OCG) Seria / 1, 12 listopada 2020.
*    [Budowanie własnej aplikacji pogody za pomocą NOAA Otwarte dane i notatniki![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)   
przez Filipe Fernandes i Rich Signell na SciPy 2018, Lipiec 13, 2018.
*    [Stosowanie OOI ERDDAP ![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)   
przez Rich Signell, luty 2018.
*    [ESIP Tech Dive: " ERDDAP Błyskawiczne rozmowy "![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)   
Osiem 5 minut rozmowy o ciekawych rzeczy ludzie robią z ERDDAP Autorzy: Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O 'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton i Eli Hunter zaprezentowali się jako ESIP Tech Dive 31 sierpnia 2017 roku.
*    [Stosowanie ERDDAP™ Dostęp do danych tabelarycznych![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)   
by Rich Signell, August 2015.
*    [Zastosowanie testu ERDDAP™ dla danych dotyczących niebieskiego węgla![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)   
by Rich Signell, August 2015.
*    [Korzystanie z danych ERDDAP™ w NOAA jest GNOME Oprogramowanie![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM) .
W tym filmie Rich Signell pobiera dane prognozujące prądy oceaniczne ERDDAP™ modelowanie toksycznego wycieku w oceanie [ NOAA jest GNOME oprogramowanie](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)   (Za 5 minut&#33;) . (Jeden mały błąd w filmie: podczas wyszukiwania zbiorów danych nie używaj AND pomiędzy terminami wyszukiwania. Jest dorozumiany.) Przez Rich Signell, 8 kwietnia 2011.
