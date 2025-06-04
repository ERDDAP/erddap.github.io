---
title: "ERDDAP™ - Changes"
---
# ERDDAP™Muutoksia

ERDDAP™Hyvä esimerkki[Käyttäjälähtöinen innovaatio](https://en.wikipedia.org/wiki/User_innovation)Tuoteinnovaatiot tulevat usein kuluttajilta (ERDDAP™Käyttäjät) Ei pelkästään tuottajat (ERDDAP™Kehittäjät) . Vuosien saatossa suurin osa uusista ominaisuuksista ja muutoksistaERDDAP™ovat tulleet käyttäjiltä. Nämä käyttäjät on hyvitetty alla hyvistä ideoistaan. Kiitos&#33; Pitäkää hyvät ehdotukset tulossa&#33;

Tässä ovat muutokset, jotka liittyvät jokaiseenERDDAP™Vapautuminen.

## Versio 2.27.0{#version-2270} 
 (2025-06?) 

*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :** 
    * Uusia tietoja väripalkkien muuntimeen palvelimilla osoitteessa /erddap/convert/color.html

*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Oletusarvo on, että välimuisti on nyt puhdistettu riippumattomaksi tärkeimmästä kuorma-aineistotehtävästä. Tämä mahdollistaa vanhojen välimuistitiedostojen luotettavamman ja säännöllisemmän puhdistuksen. Lisätyötä palvelimen käyttäytymisen parantamiseksi, kun levytila on alhainen (palauttaa virheen pyyntöihin, jotka saattavat saada palvelimen loppumaan avaruudesta, ja puhdistaa välimuistia useammin matalissa levytilanteissa, jotta virheet voidaan estää.) . Sisällädatasets.xml  (Asennus.xml) Voit lisätä / asettaa uuden välimuistin ClearMinutes-parametri valvoo, kuinka usein palvelin tarkistaa välimuistin puhdistamiseksi. Huomautus: olemassa oleva kacheMinutes-parametri ohjaa säilytettävien tiedostojen ikää, uutta välimuistia ClearMinutes on sitä, kuinka usein selkeitä on.
    ```
        <cacheClearMinutes>15</cacheClearMinutes>
    ```
Voit poistaa uuden välimuistin selkeitä tarkastuksia asettamalla tehtäväCacheClear väärään asennus.xml, vaikka sitä ei suositella.
Cash ClearMinutes on myös[Datan dokumentointi](/docs/server-admin/datasets#cacheclearminutes).
    
    * Paikallistettu metadatatuki. Se tukee arvojen lokalisointiaaddAttributesosasto. Yksinkertaisesti lisätä attribuutti ylimääräinen xml:lang tunniste. Voit esimerkiksi lisätä ranskankielisen otsikon aineistoonaddAttributesOsasto sisältää:
    ```
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
    ```
Lisätietoja saatavilla[Paikalliset metatiedot](/docs/server-admin/localized-metadata).

    * Uusi Docker Yhdistä tiedosto, jossa on vaihtoehtoja SSL: lle ja barebones Prometheus -palvelimelle. Kiitos Shane St. Savage SSL ja Jiahui Hu Prometheus.

    * Tuki tietojen käyttämiseen otsikoissa palvelimen URL-osoitteen määrittämiseksi konfigurttitiedoston sijasta. Näin palvelimeen pääsee useilla nimillä ja se voi yksinkertaistaa tiettyjä kokoonpanoja. Ole hyvä ja lähetä palautetta.
    ```
        <useHeadersForUrl>true</useHeadersForUrl>
    ```

    * Pieniä muutoksia, vikoja ja optimointia.

*    **For ForERDDAP™Kehittäjät:** 
    * Refactor to how output tiedostotyypit määritellään koodissa. Tämä pitäisi tehdä, jotta tiedostotyypit voidaan lisätä ilman tarvetta koskettaa monia koodipaikkoja.

## Versio 2.26{#version-226} 
 (Lähde: 2025-03-31) 

*    **Kaikille:** 
    * Suuri päivitys dokumenttisivuillemme: https://erddap.github.io/
 
Päivitetyn ulkonäön lisäksi on parannettu navigointia, hakua, käännöstä, ja sen pitäisi olla helpompi jatkaa eteenpäin.

*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :** 
    * Tilaukset jaRSSPäivitykset pitäisi tapahtua luotettavammin tietoaineistoissa, joita päivitetään usein tiedostojen muutoksista.

*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Epäonnistuminen vaatii / tukeeJava21. Takaisin tähän julkaisuun on helppo tehdäJava17 Yhteensopiva binääri.

    * Uusi ominaisuus muokata tietoja, jotka on esitetty UI: n tietoaineistoista. Odotamme, että tämä on erityisen hyödyllistä, jotta voidaan lisätä esimerkiksi tietoaineistoa. Lisätietoja voit lukea[Uusia dokumentteja](/docs/server-admin/display-info). Kiitos Ayush Singhille&#33;

    * Lisätietoja Prometheus Metrics Suurin on "http_request_duration_seconds, joka sisältää pyynnön vastausajat, jotka on jaettu seuraavasti: "Request_type", "dataset_id", "dataset_type", "lang_code", "status_code"
Tämä kone luettava muoto mahdollistaa paremman kokoelman mittareita ymmärtää, miten käyttäjät käyttävät palvelinta.

    * Uusi tapa luoda ISO19115 XML -tiedostoja Se käyttää Apache SIS ja on uusi vaihtoehto tässä julkaisussa. Ole hyvä ja lähetä palautetta.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * UI luo nyt yksittäisiä linkkejä jokaiseen URL-osoitteeseen, kuteninfoUrlYhteenveto.

    * Tilaukset jaRSSPäivitykset pitäisi tapahtua luotettavammin tietoaineistoissa, joita päivitetään usein tiedostojen muutoksista. Jos tämä aiheuttaa ongelmia, ota yhteyttä GitHubiin ja poista toiminnallisuus lisäämällä alla oleva lippu asentoon.
Ei sovittu
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Subset-muuttujat eivät enää tuota automaattisesti EDDTableFromNcCFiles-tiedostotyyppiä. Jos luotat käytökseen, voit myös (Mieluiten ratkaisu) LisätäänsubsetVariablesTietojen määrittely omassadatasets.xmltai lisää alla oleva lippu asetukseen.xml. Jos tunnet tarvetta kääntää tämä, ota yhteyttä GitHubiin, jotta voimme tukea käyttötapaustasi eteenpäin.
Ei sovittu
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * Palvelin ohjaa dokumentaatiopyynnöt uudelleen (lataukset / mikä on dokumentaatio, joka on siirretty) uuteen dokumentointisivustoon. Tarvittaessa voit poistaa lipun asennus.xml:
Ei sovittu
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Pieniä muutoksia ja vikoja.

*    **For ForERDDAP™Kehittäjät:** 
    * Lisää koodin laatua ja koodin puhdistusta. Tämä sisältää pieniä optimointeja, suljettavien resurssien parempaa käsittelyä ja siirtymistä pois pitkistä vanhentuneista tietotyypeistä. (kuin vektori) .

    * Suuri refactoring EDStatic poistaa suurimman osan konfigurista, viestistä ja metrinen koodi. Se myös parantaa hakemistojen aloittamista ja käsittelyä. (Näitä kahta viimeistä on vielä tehtävä.) 

    * Virallisesti tuettu Docker Image. Suunnitelman tarkoituksena on viimeistellä ja vapauttaaERDDAP™2.26 Käytettävissä.

## Versio 2.25{#version-225} 
 (Lähde: 2024-10-31) 

*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :** 
    * EDDTableFromFiles voi nyt tukea kyselyjä vain johdetuilla tuotteilla. (Globaalit, jexl-skriptit tai muuttujat) .
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Versio 2.25 edellyttääJava21 tai uudempi. Tämä on LTS-versio ja se on ollut saatavilla yli vuoden.
         
    * Jaettu huolto on nyt oletus. Jos haluat poistaa sen, ota yhteyttä jouluun. John at noaa.gov, jotta voin parantaa sitä tulevissa versioissa ja lisätä:
        &lt;Käyttöjärjestelmä: ShareedWatchService&gt; False&lt;/useSharedWatchService &gt; asennus.xml.
         
    * TheERDDAP™Servlet alkaa nyt palvelimen käynnistyksestä. Tämä tarkoittaa, että tietoaineistot alkavat ladata välittömästi sen sijaan, että odottaisivat pyyntöä.
         
    * EDDTableFromMultidimNcFilesin poistoMVRows-parametri vaikuttaa nyt. Väärin asettaminen voi merkittävästi nopeuttaa joitakin kyselyjä, mutta tämä ei välttämättä sovellu kaikille tietoaineistoille. Lisätiedot näkevät[Parametrin kuvaus](/docs/server-admin/datasets#removemvrows).
         
    * Dataa (EDDTableFromNcFiles jaEDDGridLähde: NCFiles) Nyt tuetaan zarr-tiedostoja. Niiden on sisällettävä joko tiedoston NameRegex tai PathRegex. Nähdään[zarr secion aineistojen dokumentaatiossa](/docs/server-admin/datasets#zarr)Lisää yksityiskohtia.
         
    * EDDTableFromParquetFiles on nyt tuettu. Nähdään[EDDTableFromParquetFiles secion aineistojen dokumentaatiossa](/docs/server-admin/datasets#eddtablefromparquetfiles)Lisää yksityiskohtia.
         
    *   [Prometheus metriikka](https://prometheus.io/)Saatavilla osoitteessa /erddap/metrics.
         
    * Saatavilla on uusi XML-sovellus. Tämä uusi pakkaus mahdollistaa Xincluden käytöndatasets.xml. Kiitos Ayush Singhille.
         
    * Uusi parametridatasets.xmlEpätavallisten sähköpostien hallinta. Epätavallista toimintaa Epäonnistuneita oletusarvoja 25%. Kiitos Ayush Singhille.
         
    * Uusi parametri asennuksessa.xml, joka valvoo, jos tietoaineiston latausvirheet näkyvät status.html-sivulla. Se laiminlyö totta, poistaa tietoaineistovirheet status-sivulla, määrittää showLoadErrorsOnStatusPage vääräksi:&lt;ShowLoadErrorsOnStatusPage &gt; Väärä&lt;/showLoadErrorsOnStatusPage
         
    * Pieniä muutoksia ja vikoja.
         
*    **For ForERDDAP™Kehittäjät:** 
    * Yksikköön ja integraatioon erillinen testi (hitaasti hidas hitaasti) testejä. Testit on otettu käyttöön ja testejä on tehty vähemmän.
         
    * Error Prone (Joitakin tarkastuksia on edelleen poistettu käytöstä) Spot Bugs on integroitu Mavenin kautta.
         
    * Täyden koodin pohja on muotoiltu Google Style Guiden mukaan.
         

## Versio 2.24{#version-224} 
 (Lähde: 2024-06-07) 

*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :** 
    * Uusi väripaletti EK80 akustisille aineistoille. Kiitos Rob Cermakille tästä.
         
    * Korjataan ongelma, jossa EDDTableAggregateRows ei ollut oikea valikoima kaikista lapsista. Kiitos Marco Alban korjaus- ja bug-raportista.
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Tehtävä: Turvallisuus muuttuu: Googlen todentaminen saattaa vaatia muutoksia CSP:hen.
        
Erityisesti sinun täytyy myös lisätä https://accounts.google.com/gsi/style stlye-src ja https://accounts.google.com/gsi/ Yhteys src. Käsikirjoitusta varten voit käyttää https://accounts.google.com/gsi/client.
 
        
Lisätietoja voit mennä[Google-sivut](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)CSP:n kokoonpano.
         
        
    * Uusi jaettu kellopalvelu. Tämä on uusi vaihtoehto päivitysten hakemistojen katseluun. Siinä on yksi lanka jokaiselle tiedostojärjestelmälle yhden langan sijaan. Todennäköisesti tämä vähentää huomattavasti muutosten seurannassa käytettävien lankojen määrää. Se tarkoittaa, että kaikki tietoaineistot päivittyvät yhteen sen sijaan, että jokainen tietoaineisto on oma päivitystaajuus. Tämä tarkoittaa useammin päivityksiä useimpiin tietoihin.
        
Tämän lisäyksen mahdollistaminen&lt;ShareedWatchService &gt; True&lt;/useSharedWatchService &gt; asennus.xml.
        
          
Kokeile tätä ja kerro, miten se toimii sinulle. Johanneksessa Noaa.gov.
         
    * Korjaa virheelliset vaihtelevat nimet lokeissa. Kiitos Ayush Singh korjauksesta.
         
    * Pieniä muutoksia ja vikoja.
         
*    **ParannuksiaERDDAP™Kehittäjät:** 
    * Tukea paikalliseen kehitykseen Dockerin avulla. Kiitos Matt Hopson ja Roje.
         
    * Tukee paikallista kehitystä Jettyn ja dokumentointien avulla. Kiitos Micah Wengren.
         
    * Muutokset testeihin, joilla pyritään vähentämään ongelmia yli alustan. Kiitos Shane St. Savage.
         

## Versio 2.23{#version-223} 
 (Lähde: 2023-02-27) 

Huomaa, että Bob Simons teki tämän julkaisun ja osoitti, että hän on edelleen lähellä ja aktiivinen siirtyessään Chris Johniin. Tämän julkaisun jälkeen kaikki koodimuutokset tehdään Chis Johnin toimesta, ellei toisin mainita.

*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :** 
    *    (Ei kukaan)   
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Tehtävä: Turvallisuus muuttuu: Google Authentication on nyt saatu aikaan uuden Google Identity Services -kirjaston kautta, joka on osa kirjautumista Googleen. Googlen tuki vanhaan Google Sign -järjestelmään lopetetaan 2023-03-31. Jos käytät Google AuthenticationiaERDDAP™Asennus, sinun on päivitettäväERDDAP™23+ ennen sitä. (Bob pahoittelee lyhyttä varoitusta. Se on Bobin vika.)   
         
    * NCCSV on nyt v1.2. Muutos on, että tiedostot ovat nyt UTF-8-kooditiedostoja. (He olivat ASCII) Ja niin voi nyt sisältää mitä tahansa Unicode-hahmoa sellaisena kuin se on, koodaamatta kuin #u_hhhhh.
Kun kirjoitat NCCSV-tiedostoja,ERDDAP™V1.2-tiedostot.
        ERDDAP™Lue NCCSV-tiedostoja, jotka seuraavat v1.0- ja v1.1-määritystä.
Kiitos Pauline-Chauvet, n-a-t-e ja thogar-tietokone ehdottaa tätä ja tehdä testejä varmistaa erilaisia laskentataulukko-ohjelmia voi tuoda UTF-8 tiedostoja. Kiitos Bob Simonsille koodin muutoksista.
         
    * NEW: Tila.html-verkkosivulla on nyt linkki yläreunaan, joka osoittaa, mitä aineiston latauslaitteita tällä hetkellä lataa ja niihin liittyviä tilastoja tai ei mitään, jos tietoja ei ladata. Tämä voi olla erittäin hyödyllistäERDDAP™Järjestäjät yrittävät selvittää, miksi lataus Datat kestävät niin kauan. Myös nGridDatasets, nTableDatasets ja nTotalDatasets lasketaan alla, jotka ovat nyt välittömiä. (Aiemmin ne olivat viimeisen suuren kuorman päässä. Dataa) .
Muutos koskee Roy Mendelssohnia. Kiitos Bob Simonsille koodin muutoksista.
         
    * Lähde: GenerateDatasets Xml muuttuu CF-1.10:ksi (CF-1,6) "Konventiot" -ominaisuudet.
Kiitos Bob Simonsille koodin muutoksista.
         
    * Pieniä muutoksia ja vikoja.
         

## Versio 2.22{#version-222} 
 (Lähde: 2022-12-08) 

Huomaa, että Bob Simons teki tämän julkaisun ja osoitti, että hän on edelleen läsnä ja aktiivinen siirtyessään seuraajaansa.

*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :** 
    *    (Ei kukaan)   
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Tee: ei mitään.
         
    * Omistaja FIX: Koodissa oli Cross Site Scriptingiin liittyvä vika kielen valintaan. KiitosNOAATurvallisuusskannaukset tämän saamiseksi. Tämä osoittaa, ettäNOAATurvallisuus on aktiivista ja rutiininomaisesti etsimässä turvan heikkouksia.ERDDAP.
         
    * Etusivu 5: Monet kirjastot, joita käytetäänERDDAP™päivitettiin, kuten yleensä, osana tätä julkaisua. Tällä kertaa päivitettiin PostgreSQL-kuljettaja. (jolla oli turvavirhe) 42.5.1.
         
    * Pienemmät muutoksetERDDAP"Muistinhallintajärjestelmän olisi vähennettävä tietyn pyynnön mahdollisuutta, joka ei johdu käytettävissä olevasta muistista.
         
    * Pieniä muutoksia ja vikoja.
         

## Versio 2.21{#version-221} 
 (Lähde: 2022-10-09) 

*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :** 
    *    (Ei kukaan)   
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Tehtävä: ForJava17, sinun ei pitäisi käyttää \\-d64 JAVA OPTS setenv.bat tai setenv.sh. Jos se on siellä, poista se. 64-bittinen tila on nyt valittu, kun lataat 64-bittisen versionJava. Kiitos Sam Woodmanille.
         
    * Viisikymppinen: Joskus uusi sähköpostijärjestelmä yritti kirjautua sisään liian usein, mikä johti siihen, että Googlen sähköpostipalvelimet hylkäsivät kaikki tulevat kirjautumisyritykset. Sähköpostijärjestelmä välttää tämän ja siihen liittyvät ongelmat.
         

## Versio 2.20{#version-220} 
 (Lähde: 2022-09-30) 

*    **Älä käytä v2.20 Se on virheellinen.** Järjestelmänvalvojien on kuitenkin tehtävä alla luetellut TO DO -tuotteet päivitettynä v2.21+:een.
     
*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :** 
    *    (Ei kukaan)   
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * IMPROVED: Vanha muistinhallintajärjestelmä (Math2.ensureMemory käytettävissä) Uuden muistinhallintajärjestelmän muuttaminen (EDSTAtic.shedTässä) työskennellä paremmin sen kanssa. Näytä[Muistitila](/docs/server-admin/additional-information#memory-status)yksityiskohtiin.
         
    * Muutos: Oletus&lt;ipAddressMaxRequests Sisällädatasets.xmlSe kasvoi 7-15. On selvää, että jotkut laillisetWMSAsiakkaat voivat tehdä yli 7 samanaikaista pyyntöä.
         

## Versio 2.19{#version-219} 
 (Lähde: 2022-09-01) 

*    **Älä käytä v2.19. Se on virheellinen.** Järjestelmänvalvojien on kuitenkin tehtävä alla luetellut TO DO -kohteet päivitettäessä v2.20+.
     
*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :** 
    * NEW: Uusi palvelinpuoleinen toimintoorderByPoistuminen, joka toimii kutenorderBy, mutta tavallaan laskevassa järjestyksessä. Kiitos Adam Leadbetterille.
         
    * IMPROVED: Nyt, grafiikka (Ei karttoja) Laajennetaan täyttämään käytettävissä oleva tila kankaalle eli tilaa, jota legenda ei käytä. Voit saada korkeita grafiikoita, neliön kaavioita tai laajoja kaavioita lisäämällä ja manipuloimalla &.sizewidth.|Parametri _korkeus_ (missä leveys ja korkeus määrittävät kankaan koon pikseleissä) pyynnöstä URL. (Tämä ei ole vaihtoehto .graph-sivulla. Sinun on lisättävä URL-osoite manuaalisesti.) Jos et määritä &.size-parametria, .smallPng-, .png-, .largePng-, .smallPdf-, .pdf- ja .large.pdf-pyynnöt ovat ennalta määritettyjä kangaskokoja, joten kaavio laajenee täyttämään käytettävissä olevan tilan, mutta yleensä neliö. Kiitos Bob Flemingistä.
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Tee:ERDDAP™Nyt tarvitaanJava17 ja siihen liittyvä Tomcat 10. Sinun täytyy seurataERDDAP™Asennusohjeet (Esimerkkinä Docker) asentaminenJava17 ja Tomcat 10 ja kopioi\\[Tom\\]Sisältöhakemisto Tomcat 8 -asennuksesta uuteen\\[Tom\\]Hakemisto. Ei ole muita muutoksia, joita sinun täytyy tehdäERDDAPtähän muutokseen liittyvä asennus. Toisin sanoen,ERDDAP™toimii kuten ennenkin.
        
Älä unohda tehdäERDDAP- liittyvät muutokset Tomcatin palvelin.xml ja konteksti.xml, kun päivität Tomcatia. NäytäERDDAP&gt;[Tomcatin asennusohjeet](/docs/server-admin/deploy-install#tomcat).
        
vaikutelmaniJava17 on se, että se suosii enemmän prosessointitehoa ja muistia pitkällä aikavälillä, suurempia sovelluksia, kutenERDDAP™Se toimii hieman hitaammin kuinJava8 matalalla teholla (2 ydintä ja minimaalinen RAM) toimii hieman nopeammin kuinJava8 korkeammat tietokoneet (4+ ytimet ja runsaasti RAM) . Jos näet huonon suorituskyvyn, käytä Linuxin kaltaisia ohjelmia[Top top](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/)Tarkista resurssien käyttö ja harkitseERDDAP™enemmän resursseja, erityisesti enemmän muistia. Muisti on halpaa&#33; Useimmissa puhelimissa on enemmän prosessoreita ja muistia kuin palvelimilla, joita jotkut teistä käyttävät.ERDDAP&#33;&#33;
Kiitos Erin Turnbullille.
         
        
    * TO DO: Jos käytätERDDAP™Jos haluat käyttää Cassandraa, Cassandraa, sinun on pidettävä käytössäsiJavaOlet käyttänyt Cassandraa. Vaihda vainJavaTomcat + 17 pistettäERDDAP.
         
    * Tehtävä: Suositellaan: Jos palvelimen CPU: ssa on 4+ ydintä ja 8+ Gt RAM-muistia, harkitse näiden asetusten muuttamista.datasets.xmltiedosto:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Jos palvelimellasi on vähemmän resursseja, säilytä "1" molemmissa asetuksissa.
NThreads-järjestelmätEDDGridFiles ja EDDTable Filejä on parannettu huomattavasti. Muutokset johtivat suureen nopeuteen (2X nopeus, kun nThreads on 2 tai enemmän) haastavimpiin pyyntöihin (kun suuri määrä tiedostoja on käsiteltävä tulosten keräämiseksi) . Chris Johnin tekemät muutokset johtavat myös yleiseen nopeuteenERDDAP. Näihin muutoksiin osallistui Chris John. Kiitos, Chris&#33;
         
    * Varoitus: hypenitdatasetID"Siitä ei enää tueta eikä (teknisesti sallittua) . Ne todennäköisesti hylätään seuraavassa julkaisussa. Jos käytät hypeniä, vaihda koristeet nyt välttääksesi ongelmia. Jos teet muutoksen nyt, se on omalla nopeudellasi. Jos odotat seuraavaa julkaisua, olet paniikissa ja joudut käsittelemään sitä sinä päivänä.
         
    * Uusi: Nyt,.htmlTabletietovastaukset, jos String-solun tiedot sisältävät tietoja: kuva/png;base64, jota seuraa perus64 koodattu .png-kuva,ERDDAP™Näytä ikoni (Käyttäjä voi nähdä kuvan, jos sen yli) ja painikkeet tekstin tai kuvan tallentamiseksi levylle. Kiitos Marco Alba (Kuka on antanut koodin) Kirjoittanut Bob Simons (jotka muuttivat sitä hieman) .
         
    * Alkuperäinen nimi: DoNotAddstandardNames
Jos \\-doNotAddStandardNames on komentoriviparametri, kun juokset Dataa XML, tuottaminen Dataa XML ei lisäästandard\\_namejaaddAttributesmuuttujat kuin leveys, pituus, korkeus, syvyys tai aika (jotka ovat ilmeisiästandard\\_names) . Tämä voi olla hyödyllistä, jos käytät tuotetta Dataa XML suoraanERDDAP™ilman tulostusta, koska Dataa XML usein arvaastandard\\_nameVäärin. (Huomaa, että suosittelemme aina muokkaamaan tulosta ennen sen käyttöä.ERDDAP.) Tällä parametrilla on muita vähäisiä vaikutuksia, koskastandard\\_namekäytetään usein muihin tarkoituksiin, esimerkiksi uuden luomiseen.long\\_nameja luoda värikarttoja. Kiitos Kevin O'Brien.
         
    * UUTUS: Nyt voit laittaa&lt;Päivitys &gt; 10&lt;UpdateMaxEvents » Sisällädatasets.xml  (Muiden asetusten lähellä yläosaa) tiedostojen enimmäismäärän muuttaminen (Oletusarvo = 10) Päivitys EveryNMillis -järjestelmä. suurempi määrä (100?) Voi olla hyödyllistä, kun on erittäin tärkeää, että aineisto säilyy aina ajan tasalla. Nähdään[PäivitysMaxEvents dokumentointi](/docs/server-admin/datasets#updatemaxevents). Kiitos John Maurerille.
         
    * NEW: Lisätty tuki maailmanlaajuisellereal\\_time= totta|Väärän » String Attribute
Jos tämä on väärää (Oletusarvo) Jos aineisto ei käytä päivitystä Kaikki ns.ERDDAP™välimuistivastaukset tiedostotyyppeihin, joissa koko tiedosto on luotava ennenERDDAP™Voit lähettää vastauksen käyttäjälle ja käyttää niitä uudelleen enintään 15 minuuttia. (esim..nc.png) .
Jos tämä on totta tai jos aineisto käyttää päivitystä Kaikki ns.ERDDAP™Älä koskaan välitä vastaustiedostoja ja palauttaa aina äskettäin luotuja tiedostoja.
Kiitos John Maurerille.
         
    * NEW: Sähköpostit lähetetään erilliseen sähköpostitse. Tämä tekee tietoaineistojen lataamisesta ja muista toimista, jotka tuottavat sähköposteja nopeammin, koska loadDatasets ei tarvitse odottaa, että sähköposti lähetetään, joka joskus kestää kauan. Uusi järjestelmä voi lähettää useita sähköpostiviestejä sähköpostiistuntoa kohden, mikä vähentää sähköpostipalvelimien kirjautumista ja vähentää niiden riskiä, jotka eivät ole liian usein. Tila.html-sivulla on tilastoja ja log.txt-diagnostiikkaviestejä - etsi "sähköpostiviestiä". Huomaa, että suuri nEmailsPerSession = 0, osoittaa ongelmia, eli sähköpostiistunto ei pystynyt lähettämään sähköpostia.
Kiitos Bob Simonsista.
         
    * Sähköpostit lähetetään nyt hieman eri koodilla (KoskaJava17. Muutos sähköpostiin) . Jos sinulla on vaikeuksia lähettää sähköposteja, pyydämme sähköpostia.erd.data at noaa.gov.
         
    * UUTUS: Tilaustoimet, jotka "koskettavat" kauko-URL-osoitetta, käsitellään nyt erillisessä touchThreadissa. Tämä tekee URL-osoitteita koskettavista lataustiedoista ja muista toimista nopeampia, koska loadDatasets ei tarvitse odottaa, että kosketus on valmis, joka joskus kestää kauan. Status.html-sivulla on tilastoja ja log.txt-diagnostiikkaviestejä - etsi "touchThread".
Kiitos Bob Simonsista.
         
    * NEW: Tila.html-sivulla, "Major LoadDatasets Time Series" on uusi "kiinteä" sarake, joka ilmaisee pyyntöjen määrän, jotka on vuodatettu, koska nykyinenERDDAP™Muistin käyttö oli liian korkea. HTTP:n tilakoodi 503 ”Palvelun saatavuus”. Nämä pyynnöt eivät välttämättä olleet ongelma. He vain saapuivat kiireiseen aikaan. Tämä oli osa uudistusta siitä, mitenERDDAP™käsittelee korkeaa muistin käyttöä.
         
    * Unix/Linux-tietokoneissa on nyt "OS Info" -linja status.html-verkkosivulla, jossa on nykyiset käyttöjärjestelmätiedot, mukaan lukien CPU-kuorma ja muistin käyttö.
         
    * Improvisoitu: nyt, kunERDDAP™uudelleenkäynnistetään ja uudelleenkäynnistetään ja todetaan, EDDTableFromFiles-aineistot uudelleenkäynnistetään.ncja erottuva.nc. Joillekin aineistoille tämä vähentää huomattavasti tietojen lataamisen aikaa. (esimerkiksi 60 sekunnista 0,3) . Uuden sähköpostiviestin ja tehtäväThreadin lisäksi (ylhäällä) Tämän pitäisi nopeuttaa uudelleenkäynnistymistäERDDAP™MonilleERDDAP™asennuksia. Kiitos Ben Adams ja John Kerfoot.
         
    * Aiemmin orpojen tietoaineistot (aineistot, jotka elävätERDDAP™mutta eivät ole mukanadatasets.xml) yksinkertaisesti mainittiin status. html ja log.txt jokaisen suuren latauksen jälkeen. Ne poistetaan automaattisestiERDDAP™ja merkitty status.html ja log.txt, ja sähköpostitse kaikkea. Jos haluat poistaa tietoaineistonERDDAP™Nyt kaikki mitä sinun tarvitsee tehdä, on poistaa sen xml-liuku.datasets.xmlSe poistetaan seuraavassa suuressa kuorma-autossa. Kiitos Bob Simonsista.
         
    * KNOWN BUG netcdf-java v5.5.2 ja v5.5.3: TheEDDGridFromThredds Kataloginen vaihtoehto GenerateDatasets Xml työskenteli THREDDS-luetteloissa, jotka sisältävät viittauksia THREDDS-luetteloihin. Nyt se ei. Ilmoitin ongelman Netcdf-java-kehittäjille.
         
    * BUG FIX: Docker-käyttäjille asetus.xml-parametritERDDAPparamName : for int and boolean parameters Näytä tarkat tiedot (Esim. sähköposti SmtpPort) ,ERDDAP™Etsimme väärin vain _paramName_. Nyt etsitään _ERDDAP_ _ _ _ Kiitos Alessandro de Donno.
         
    * Muutos: TheERDDAP™Testausjärjestelmä käyttää nyt automaattista järjestelmää tarkistaakseen, että äskettäin luodut testikuvat ovat juuri odotettavissa. Kiitos Chris Bob Simons ja Bob Simons toteutetaan.
         

## Versio 2.18{#version-218} 
 (Lähde: 2022-02-23) 

*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :** 
    * Ei
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Vinkki:.ncTiedostot eivät olleet joissain olosuhteissa kiinni. Nyt ne ovat. Kiitos Marco Alba, Roland Schweitzer, John Maurer ja muut.
         

## Versio 2.17{#version-217} 
 (2022-02-16) 

*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :** 
    * Vinkki: Muutosten jälkeenorderByMuutama vuosi sitten Tabledap's Make A Graph ei käsitellyt paljon kyselyjä, joita käytettiin.orderBy_xxx_. Nyt se tekee. Kiitos Maurice Libesille.
         
    * Muutos: aiemmin,ERDDAP™hylättyjä pyyntöjä. Läpinäkyvä Kun leveys- ja/tai pituusarvot olivat osittain tai kokonaan pois päältä. (ERDDAP™GitHub Issues #19, jonka on julkaissut Rob Fuller.) Nyt se palauttaa läpinäkyviä pikseleitä kuvan ulkopuolisille alueille. Tämä on hyödyllistä monille sovelluksille. Muutokset tähän muutokseen teki Chris John. Kiitos paljon, Chris&#33;
         
    * Muutos: aiemmin,ERDDAP™hylkätyt verkon pyynnöt, joissa indeksin arvot tietylle ulottuvuudelle olivat\\[Korkeus: Alhainen\\]. Nyt nämä pyynnöt ovat päteviä vaihtamalla alhaiset ja korkeat arvot. Tämä ratkaisee pitkäaikaisen ongelman käyttäjille ja ulkoisille ohjelmille, kuten Xtractolle, jotka piti seurata niitä harvoja tietoaineistoja, joilla on leveysarvoja, jotka vaihtelevat korkeista mataliin pyyntöihin.\\[ (50) : (20 20) \\]niin, että pyyntö indeksissä oli\\[Alhainen: Korkea\\]. Näytä https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html pyyntö, kuten\\[ (20 20) : (50) \\]Yhden näistä aineistoista tulkitaan automaattisesti\\[ (50) : (20 20) \\].
         
    * .esriAscii pyytää nyt käynnistää "File : Save As" -valintaikkunan käyttäjän selaimessa. Kiitos Joel Van Noordille.
         
    * Viisikymppinen: Nyt, jos lapsen tietoaineiston pituusmuuttujaEDDGrid180 taiEDDGridLon0360-tietokanta sisältäävalid\\_minja/taivalid\\_maxattribuutti, ne poistetaanEDDGrid180 taiEDDGridLon0360-aineisto. Kiitos Roy Mendelssohnille.
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Tehtävä: Jos olisit asettanut&lt;DataProviderFormActive&gt; valheelliseen XSS-haavoittuvuuden tilapäiseen käsittelyyn, ole hyvä ja palauta se.
         
    * SECURITY BUG FIX: Kiinteä XSS-haavoittuvuus tietojen toimittajamuodossa Kirjoittanut Genaro Contreras Gutiérrez
         
    * Viisikymppinen: Kun AWS S3 -likalla oli yli 10 000 tiedostoa,ERDDAP™Heitti "sisäisen virheen". Tämä on nyt korjattu. Kiitos Andy Zieglerille.
         
    * Vinkki:EDDGridSideBySide ei sallinut muuttujiensourceNameeri lasten aineistoissa on sama. Nyt se tekee. Kiitos Joshua Stanfordin.
         

## Versio 2.16{#version-216} 
 (Julkaistu 2021-12-17) 

*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :** 
    * Muutokset/BUG FIXES: Käännösjärjestelmään on tehty lukuisia pieniä muutoksia kielispesifisten editorien avulla. Kiitos Melanie Abecassis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian ja Mike Smit.
         
    * Hyväksytty Google Translaten asianmukainen vastuuvapauslauseke ja tunnustus Google Translaten ehtojen mukaisesti. myös,&lt;html&gt;-tunniste HTML:ssä jokaisella verkkosivustolla, joka tunnistaa nyt asianmukaisesti ei-englanninkieliset verkkosivut koneen kääntämisenä. Kiitos Mike Smit.
         
    * Viisikymppinen: Kirjautumissivut toimivat nyt kunnolla eri kieliasetuksilla. Kiitos Mike Smit.
         
    * UusiaorderBySuodatin. Katso kaikki ja Uncheck Kaikki -painikkeetEDDGridData Access form verkkosivuilla. Kiitos Marco Alban koodista.
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Tee: jos sinulla on
        &lt;MarkImageFile: QuestionMark.jpg&lt;MarkImageFile &gt;
asennus.xml-tiedostossa, sinun on joko poistettava koko tunniste (Suositellaan, joten oletustiedostoa käytetään) Tai muuttaa sitä:
        &lt;Pääartikkeli: QuestionMark.png&lt;MarkImageFile &gt;
         
    * Muutos: Niin tiedät,[Adoptium](https://adoptium.net/?variant=openjdk8)AdoptOpenJDK:n korvaaminen tärkeimpänä/suositeltuna lähteenäJava  (OpenJD) .
         
    * Muutos: LokitiedostotERDDAP™GenerateDatasets Xml ja DasDds ovat nyt UTF-8, ei tietokoneen oletushahmo. Tein paljon tarkistuksia ja tein muutamia muutoksia varmistaakseni, ettäERDDAP™määrittää aina oikean merkin, kun luet tai kirjoitat kaikenlaisia tiedostoja, eikä enää (Useissa tapauksissa) perustuu tietokoneen oletushahmoon. Tämä korjasi muutamia virheitä ja siirtyi niin lähelle kuin pystyin käyttämään UTF-8:a mahdollisimman monelle tiedostotyypille. (.log, .xml, .html.json,.jsonl,.ncPääjohtaja) . Huomaa, että monet vanhemmat tiedostotyypit tarvitsevat ISO-8859-1 -standardia. (esim.OPeNDAP.das, .dds, .csv.tsv,.nc3,.nccsv.cpt) . Yritin tehdä yhteistyötä CF:n kanssa jaUnidataUTF-8:n tukeminen.nc3 tiedostoa, molemmat ovat kestäviä.
         
    * NEW: Kun lataat tiedostoja AWS S3:staERDDAPKätköt Url-järjestelmässäEDDGridFiles ja EDDTable FromFiles käyttää nyt uutta AWS Transfer Manageria ladatakseen tiedostoja rinnakkaistuolin kautta. (Näin nopeasti) . Tavoite on 20 Gbps per tiedosto, joten tämä toimii hyvin kaikkien AWS-tyyppien kanssa, mutta erityisesti niillä, joilla on erinomainen "Networking Performance". Tällä muutoksellaERDDAPKätköt FromUrl-järjestelmä tarjoaa nyt vertailukelpoisia nopeuksia röntgenkuvan lähestymistavan rinnakkaistettujen tiedostojen latausten kanssa, mutta ilman tarvetta muuntaa lähdetiedostoja..ncja.hdfChunked Xarray -tiedostoja. Itse asiassa,ERDDAPJärjestelmä on parempi, jos samasta tiedostosta on myöhempää luettavaa, koskaERDDAP™Nyt on paikallinen kopio tiedostosta. Yhteisömme on vuosien mittaan standardoinut.ncja.hdftiedostoja. Nyt meidän ei tarvitse heittää kaikkea ulos saadakseen hyvän suorituskyvyn tallennettaessa tietoja AWS S3:ssa. Kiitos Rich Signell.
         
    * HUOMAUTUS: Engine=Lucene on toistaiseksi poistettu. Se on monimutkainen järjestelmä, joka tuottaa usein tuloksia, jotka eroavat hieman hakuEngine=alkuperäinen. Lähes kaikkiERDDAP™Asennukset, aikasäästöt Lucene eivät kompensoi eroja tuloksia. Käytä hakukone=alkuperäinen, jos mahdollista. Jos tämä aiheuttaa ongelmia, pyydämme sähköpostia.
         
    * CHANGE: The Lucene searchEngine toimii nyt enemmän kuin alkuperäinen etsintä. Ei ole enää tapauksia, joissa lucene ajattelee, että aineisto vastaa ja alkuperäinen ei. Lucene's rankings on nyt sama kuin alkuperäinen (Koska alkuperäinen on aina tottunut laskemaan) .
         
    * Vinkki: äskettäin julkaistussa julkaisussa,ERDDAP™Enemmän kuin ensimmäiset 1000 esinettä AWS S3:ssa. Nyt,ERDDAP™Näemme jälleen kaikki esineet. Kiitos Andy Zieglerille.
         
    * BUG FIX: Nyt EDDTableAggregate Rows poistaaactual\\_rangeattribuutio aina, kun yksi tai useampi lapsitietokanta ei koskaan tiedä sen muuttujia """actual\\_range  (EDDTableFromDatabase) . Kiitos Erik Gelettille.
         

## versio 2.15{#version-215} 
 (Julkaistu 2021-11-19) 

*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :** 
    *   ERDDAP™Käyttäjällä on uusi järjestelmä, jonka avulla käyttäjä voi määrittää kielen, jota käytetään kaikilla verkkosivuilla. JosERDDAP™Asennus on perustettu käytettäväksi, luettelo kielistä näkyy jokaisen sivun oikeassa yläkulmassa.ERDDAP™URL-osoite ennen tätä versiota toimii ja palauttaa aina englanninkielisen sisällön, kuten ennenkin.
        
Kaikkia tekstiviestejä tai sivuja ei käännetty. Projektissa oli aikarajoituksia, jotka estivät Qin ja Bobin pääsyn 100 prosenttiin.
        
Ilmeinen kysymys on, miksi olemme panostaneet tähän niin paljon, kun Chrome kääntää sivuja lennolla? Vastaus: Näin saamme paljon enemmän kontrollia käännöksen tekemiseen. On paljon sanoja, joita ei pitäisi kääntää verkkosivuilla, esimerkiksi otsikot ja tiivistelmät tietoaineistoista, nimitykset muuttujien, parametrit, yksiköt ja organisaatiot. Suuri osa käännöksestä oli sellaisten sanojen ja lauseiden tunnistamista, joita ei pitäisi kääntää. Myös koneen käännökset taipuivat mangle tietyntyyppisiä HTML-merkintöjä. Käännöksen hallinta mahdollistaa ongelman minimoinnin.
        
Käännösprojektin on tehnyt Qi Zeng. (Google Summer of Code Intern Näytä tarkat tiedot) Bob Simons käyttää Googlen käännöspalvelua. Se oli valtava projekti. Kiitos, Qi&#33;
        
    * Vinkki:ERDDAP™Nyt ORCID-tunnus saa X:n viimeisenä numerona. Kiitos Maurice Libesille.
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Tee:
        
        * Sinun on tehtävä muutamia muutoksia, jotka liittyvätERDDAPUusi järjestelmä, jonka avulla käyttäjät voivat määrittää verkkosivujen kielen.
            * Asennuksen ensimmäisessä vaiheessa.xml jadatasets.xmltiedostot, vaihda: koodaus = "UTF-8" ja vaihda dokumentin koodaus tekstieditoriin, jotta se tallennetaan UTF-8-tiedostoksi. GenerateDatasets XML:n mukaandatasets.xmlUTF-8-tiedosto.
            * Ohjelmoijat, jotkaERDDAP: KaikkiERDDAP™.java-tiedostoja on käsiteltävä oletusarvoisesti UTF-8-tiedostoina. Saatat joutua lisäämään UTF-8:n javac-komentolinjaan. (Minä tein.) 
            * Tämän järjestelmän mahdollistaminen (vahvasti suositeltu) Sisällä&lt;StarBodyHtml5&gt;-tunniste, jonka määritätdatasets.xmlVaihda "&amp&#33;loginInfo;" &amp&#33;loginInfo|&amp&#33;-kieli, niin että kieliluettelo näkyy jokaisen yläkulmassa.ERDDAP™verkkosivuilla.
            *   ERDDAP™Käytä vain&lt;StarBodyHtml5&gt;-tunniste, jonka määritätdatasets.xmlmäärittää HTML-sisältö jokaisen lipun yläosassaERDDAP™WEB riippumatta siitä, mitä kieltä käyttäjä valitsee. Jos vaihdat tätä tunnistetta käyttääksesi
"""&EasierAccessToScientificData;"Tieteellisen tiedon helpompi saatavuus"
"""&BroughtToYouBy;"Sen sijaan, että olisit tullut luoksesi,ERDDAP™Käytä käännettyjä versioita näistä lauseista lipussa.
            * Samoin uusi oletus&lt;ShortDescriptionHtmldatasets.xmlon
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
Viimeiset kolme sisältöä ovat asioita, jotka korvataan käännetyllä tekstillä. Jos käännät jonkun (Erityisesti & Etenkin.) tai kaikki tekstit esiindatasets.xml  (jolla on prioriteetti, jos) Tämä teksti näkyy riippumatta siitä, minkä kielen käyttäjä valitsee. Tämä ei ole täydellinen, mutta ajattelin, että vain harvat yrittäjät haluavat editoida.&lt;ShortDescriptionHtml &gt; 35 eri tiedostossa, jotka tarjoavat 35 eri käännettyä versiota kyseisestä tunnisteesta.
        
          
         
    * Muutamia virheitä käsitellään nyt hieman eri tavalla, joten ne voidaan lisätä tila.html ja Daily Report -sähköposti. Numerot voivat olla hieman suurempia kuin ennen.
         
    * Alkuperäinen nimi: GenerateDatasets XMLEDDGridLon0360 jaEDDGridLonPM180 sulkee pois lähdeaineistotdatasetID&gt; &gt; &gt;\\*LONPM180 jadatasetID&gt; &gt; &gt;\\*0360, vastaavasti.
         

## Versio 2.14{#version-214} 
 (Lähde: 2021-07-02) 

*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :** 
    *    (Ei kukaan)   
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Uusi:EDDGridLon0360, joka tekee verkkotietokannan, jonka pituusarvot &gt; = 0 ja&lt;= 360 verkkotietokantaan, jonka pituusarvot &gt; =-180 ja&lt;180. Nähdään[EDDGridLon0360 dokumentointi](/docs/server-admin/datasets#eddgridlon0360). Kiitos Dale Robinsonille.
         
    * Uusi:ERDDAP™Järjestelmänvalvojat voivat nyt ylittää asennus.xml-arvon ympäristömuuttujan kautta.ERDDAPArvonlisävero - ennen juoksuaERDDAP. Esimerkiksi käyttöERDDAPBaseUrl ylittää&lt;BaseUrl &gt; arvoa. Tämä voi olla kätevää, kun käytätERDDAP™säiliöllä, koska voit asettaa vakioasetukset asennus.xml ja sitten toimittaa erityisasetuksia ympäristömuuttujan kautta. Jos toimitat salaisia tietojaERDDAP™Tämän menetelmän avulla varmista, että tiedot pysyvät salaisina.ERDDAP™Ympäristömuuttujat luetaan vain kerran käynnistysvaiheessa, käynnistyksen ensimmäisessä sekunnissa, joten yksi tapa käyttää tätä: aseta ympäristömuuttujat, aloita.ERDDAP™Odota kunnesERDDAP™Se on aloitettu ja sitten ympäristömuuttujia. Kiitos Marc Portierille.
         
    * IMPROVED: Nyt, jos tiedostoja EDDTableFrom... Tiedostotiedot, joissa on paljon tiedostoja, ovat hyvin pitkiä String-arvoja, tietoaineisto lataa paljon nopeammin ja vastaa pyyntöihin paljon nopeammin. aikaisemmin,ERDDAP™Varaisi paljon tilaa min ja max String arvot tiedostoja, jotka tallennetaan tiedostoja tietoja tällaisia aineistoja. Tuloksena oleva tiedosto oli valtava, mikä sai sen kirjoittamaan ja lukemaan hitaasti. Kiitos Obikselle.
         
    * Huomautus: Nyt,ERDDAP™tekee paremman työn tulkita epätavallisia ja mitättömiä hahmoja CSV-tiedostoissa. Kiitos Obikselle.
         
    * FIX: Vuoden Cassandra-ongelmien jälkeen asensin Cassandraa. (V2) Testit on tehty uudelleen Cassandra v2:lla. Nyt voin luottavaisemmin sanoa, ettäERDDAP™Cassandra v2 ja v3. Kiitos ONC:lle.
         

## versio 2.12{#version-212} 
 (2021-05-14 julkaistu) 

*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :** 
    * Viisikymppinen: Jos olet tilauksen mustalla listalla, et voi nyt pyytää listaa tilauksistasi.
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * TO DO: NEW: Järjestelmä, jolla rajoitetaan automaattisesti haitallisten käyttäjien ja liian aggressiivisten laillisten käyttäjien kykyä tehdä suuri määrä samanaikaisia pyyntöjä, jotka heikentävät järjestelmän suorituskykyä muille käyttäjille. Uusia valinnaisia tunnisteita on kolmedatasets.xmljonka voit/pitäisi lisätä heti&lt;grafiikka BackgroundColor &gt;
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

Lisätietoja, katso[ipAddressMaxRequests](/docs/server-admin/datasets#ipaddressmaxrequests).ERDDAP™Lue myös ”Ainutlaatuisten käyttäjien lukumäärä” (käynnistyksen jälkeen) Tila.html-sivulla.
Kiitos Kiinan hyökkääjälleERDDAP™asennus.
         
    * Postgresql-kuljettajan käyttäytyminen: Kun päivitin Postgresql-kuljettajan, Postgresqlin ja GenerateDatasetsXmlin tuottaman taulukkolistan sarakkeiden nimet tulivat takaisin kaikkiin ylärajoihin, kaikkien alennusten sijaan. En tiedä, vaikuttaako se muihin asioihin, koska tietokanta usein pitää näitä nimiä herkkänä. Testitietoni toimivat edelleen oikein. Jos aineistosi lakkaa toimimasta tämän kanssaERDDAP™Päivitys, tämä on yksi syy aloittaa.
         
    * Vinkki:ERDDAP™Lisäksi AWS S3 -tiedostot käsitellään oikein. AWS S3 -tiedostojen käsittelyyn on tehty muitakin parannuksia. Kiitos Michael Gangl ja Dylan Pugh.
         
    * Uusi:EDDGridNCFiles jaEDDGridLähde: NCFiles Pakkaamattomat voivat nyt lukea tietoja "rakenteista".nc4 ja.hdf4 tiedostoa. Jotta voidaan tunnistaa muuttuja, joka on peräisin rakenteesta,&lt;sourceName&gt; _fullStructureName_|_memberName_, esim. ryhmä1/myStruct|MyMember. Kiitos NRL:stä.
         
    * Nyt, jos nykyinen muistin käyttö ja tämä pyyntö on vielä hieman korkea, griddap nThreads tälle pyynnölle 1 Näin,ERDDAP™Säästää muistia, kun muistia on vähän. Kiitos Kiinan hyökkääjälleERDDAP™asennus.
         
    * Uusi järjestelmä avoimien tiedostojen lukumäärän seuraamiseksi (joka sisältää sukkia ja muita asioita, ei vain tiedostoja) Tomcatissa Linux-tietokoneissa. Jos jotkut tiedostot virheellisesti eivät koskaan sulje, avointen tiedostojen määrä voi kasvaa, kunnes se ylittää sallitun enimmäismäärän ja paljon todella huonoja asioita tapahtuu. Linux-tietokoneissa (Tietoja ei ole saatavilla Windowsille) :
        
        * On olemassa uusi "Open Files" sarake äärioikeistossa status.html verkkosivun näyttää prosenttiosuus max tiedostot auki. Windowsissa se vain näyttää.”
        * MilloinERDDAP™tuottaa nämä tiedot jokaisen merkittävän tietoaineiston latauksen lopussa, se tulostaa lokiin. Txt-tiedosto:
OpenFileCount_current_ max_max_% Percent_
        * Jos prosenttiosuus on &gt; 50 %, sähköposti lähetetäänERDDAP™Järjestäjä ja sähköposti Kaikki kaikessa sähköpostiosoitteisiin.
        
Lue lisää tai jos näet tämän ongelmanERDDAP™nähtävä[Liikaa avoimia tiedostoja](/docs/server-admin/additional-information#too-many-open-files).
Kiitos Kiinan hyökkääjälleERDDAP™asennus.
         
    * Lisäsin paljon "liian monta avointa tiedostoa", joten tehtävä pysähtyy ja käyttäjä näkee virheviestin. Datatiedostoja ei enää merkitä huonoksi, jos niiden lukeminen johtaa "liian moniin avoimiin tiedostoihin" -virheeseen.
         
    * Uusia\\[isovanhemmat\\]BadFilesFlag-hakemisto:
Jos laitat tiedoston tähän hakemistoondatasetIDtiedoston nimi (tiedostojen sisällöllä ei ole väliä) ,ERDDAP™Poistaa huonot fiilikset.ncTiedosto tästä datasta (Jos) Lataa ASAP-tiedot uudelleen. Tämä aiheuttaaERDDAP™Yritä uudelleen työskennellä tiedostojen kanssa aiemmin (virheellisesti?) merkitty huonoksi. Kiitos Marco Alballe.
         
    * Vaihtoehto: Aloitus, josEDDGridFiles or EDDTableFrom... Tiedostoaineistossa on alun perin 0 tiedostoa tunnetuista kelvollisista tiedostoista. (mm. uusi tietoaineisto) sittenERDDAP™Lataa se ja aseta lippu, jotta se ladataan ASAP, kun suuri kuorma Tatasets on valmis. Tämä nopeuttaa alustavaa käynnistystä, kun uusia aineistoja on.
         
    * Lähde: FileVisitorDNLS.testAWS3 () Lähde: FileVisitorSubdir.testAWSS3 () Käytä AWS v2:ta (Ei v1) SDK. Nyt GitERDDAP™Jakelu sisältää kaikki tarvittavat tiedostot, eikä sinun tarvitse enää lisätä manuaalisesti massiivista V1 AWS SDK -jar-tiedostoa.
         
    * Vaihdoin Mavenin avulla havaita/keräillä riippuvuuksia (.jar-tiedostot /lib) . AWS SDK:n muutokset vaativat tätä. Tarvitaan myös muita tuontikoodia tulevaisuudessa. Kiitokset Kyle Wilcoxille, joka antoi hänelle luomansa ja käyttämänsä pom.xmlin, joka ratkaisi minulle useita ongelmia.
         
    * Alkuperäinen nimi: The classpath parameter (cp) GenerateDatasetXml, DasDds ja muut pienet ohjelmatERDDAP™, ja ohjelmoijien on nyt paljon yksinkertaisempi ja ei pitäisi koskaan muuttua uudelleen, koska se viittaa hakemistoon, ei yksittäisiä tiedostoja:
\\-cp-luokat;C: \\programs\tomcat \\lib \\servlet-api.jar;lib
         (tai ":" eikä ";" Linux ja Macs) .
         (Olisi pitänyt tehdä tämä vuosi sitten, kun siitä tuli vaihtoehto.)   
         
    * Alkuperäinen nimi: GenerateDatasets Xml: llä on uusi käyttövaihtoehto: löydäDuplicateTime, joka etsii verkkokokoelman kautta..nc  (ja liittyvät) tiedostoja, joilla on kaksinkertaiset aika-arvot. Näytä[Löydetty Aika-aika](/docs/server-admin/datasets#findduplicatetime)  
         
    * Uusi:datasets.xmlVoidaan nyt sisällyttää&lt;Tag, joka ylittää&lt;Tag value from viestejä.xml (tai palauttaa viestit.xml-arvoon, jos se on tyhjä) . Näin voit muuttaa käytettävissä olevien palettien luetteloaERDDAP™Juoksen. Lisäksi, jos sinulla on Cptfiles-aliohjausERDDAP™Sisältöhakemisto,ERDDAP™kopioi kaikki \\*.cpt-tiedostot kyseisessä hakemistossa\\[Tom\\]/webapps/erddap/WEB-INF/cptfiles-hakemistoERDDAP™Aloita. Yhdessä näiden muutosten avulla voit lisätä palettia ja muutokset jatkuvat, kun asennat uuden versionERDDAP. Nähdään[Palettien dokumentointi](/docs/server-admin/datasets#palettes)  
Kiitos Jennifer Sevadjian, Melanie Abecassis ja ehkä muut rannikkovartiostot.
         
    * Muutos: [&lt;Hidas DownTroubleMillis » (Docs/server-admin/datasets#slowdowntroublemillis) Nyt niitä käytetään kaikkiin epäonnistuneisiin pyyntöihin, ei vain muutamiin.
         
    * RANGED: The RunLoadDatasets -lanka keskeyttää LoadDatasets-langan 3/4 LoadDatasets -laitteella MaxMinutes, joten LoadDatasetsilla on enemmän aikaa havaita keskeytys ja poistuminen armollisesti. On myös enemmän ja parempia diagnoosiviestejä.
         
    * Muutettu vanhasta versiosta Lucene v8.7.0.
         
    * Muutos: Sähköpostit, jotka lähetetäänERDDAP™Nyt näkyy kiinteä leveysfontti.
         
    * Muutos:EDDGridFromFiles saa nyt akseliarvoja ja ominaisuuksia FIRST|Viimeisin tiedosto, kuten on määritelty&lt;Metadata &gt; Kiitos (Ei ei ei) Ken Casey, et al.
         
    * ADDED-tuki mitättömille yksiköille "degree \'North" ja "degree_East", joita viimeaikaiset tiedostot käyttävät virheellisesti. (Vuodesta 2020-10-01) AVHRR Pathfinder versio 5.3 L3-Collated (L3C) SST-aineistot (ENIPH53sstd1 päivää ja nceiPH53sstn1 päivää) .ERDDAP™Nyt ne voidaan standardoida kelvollisiksi yksiköiksi. Kiitos (Ei ei ei) Ken Casey, et al.
         

## versio 2.11{#version-211} 
 (Lähde: 2020-12-04) 

*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :** 
    * BUG FIX: OrderByMean heitti NullPointerE-poikkeuksen, jos muuttujalla oli vain yksi ±FillValue tai kadonnut. Arvo määritellään. Nyt se hoitaa tilanteen oikein. Kiitos Marco Alballe.
         
    * Viisikymppinen: ODV-tekstitiedostojen luomisessa oli ongelmiaERDDAP™V2.10. Nämä ongelmat on korjattu. Kiitos Shaun Bellille.
         
    * Vinkki: Vain sisäänERDDAP™V2.10 Jos URL-osoitteessa määritellään lat lon -rajoitukset, ei vedetty maailmankartalle. Nyt se on taas. Kiitos John Maurerille.
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Vinkki: Vain sisäänERDDAP™V2.10: Käsikirjoitustiedostot ArchiveADataset, GenerateDatasets Xml ja DasDds eivät toimineet, koska heillä ei ollut muutoksia luokkapolkuun.ERDDAP™10.10 Nyt he tekevät. Kiitos Marco Alballe.
         
    * Uusi: Indatasets.xmlNyt sinulla voi olla tagi:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

Tällä hetkellä, jos totta (tai jos tagi on tyhjä tai jos se ei ole tiedostossa) kun käyttäjän pyyntö johtaa NullPointerE-poikkeukseen,ERDDAP™Sähköposti Pino jäljeterd.data at noaa.gov  (TheERDDAP™Kehitysryhmä) . Tämä on turvallista ja turvallista, koska ei ole luottamuksellista tietoa. (Esim. pyyntö) sisältyy sähköpostiin. Tämä mahdollistaa mahdollisten epäselvien, täysin odottamattomien vikojen, jotka johtavat NullPointerE-poikkeuksiin. Käyttäjä näkee poikkeukset, muttaERDDAP™Kehittäjät eivät, joten emme tiedä, että ongelma on korjattava.
        
On mahdollista, että tämä tagi johtaa muihin samankaltaisiin diagnostisiin tietoihin, joita lähetetäänerd.data at noaa.govtulevaisuudessa. Sähköpostin sisältö on aina vähäinen ja liittyy vikoja, eikä esimerkiksi käyttötietoja. Kiitos Marco Alballe.
         
        
    * Muokattu: Nyt, yleisiä pakattuja tiedostotyyppejä (.bz2,.gz,.gzip,.tar,.tgz,.z,.zip) Kielletään myös tavun pyynnöt. Tämä on määritelty kautta&lt;ExtensionsNoRangeRequests &gt; Viestit.xml.
         
    * Tietoinen käytäntö: KutenERDDAP™2.10,.ncml-tiedostot, jotka yrittävät muuttaa ominaisuutta, eivät muuta attribuuttia. Tämä on tiedossa oleva vika netcdf-javassa, jonka olen ilmoittanut, ja he sanovat, että se on kiinnitetty seuraavaan netcdf-javan vapautukseen.
         

## Versio 2.10{#version-210} 
 (Lähde: 2020-11-05) 

*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :** 
    * Uusi: Uusi[Interpoliittinen](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html)Muuntaja välittää tehokkaasti arvoja verkkotietoaineiston arvoista. Se on erityisen hyödyllinen tutkijoille, jotka työskentelevät eläinradan kanssa. Tämä muuntaja ottaa pöydän leveys, pituus ja aika sarakkeet (Ehkä muita sarakkeita) ja palauttaa taulukon, jossa on muita sarakkeita, joilla on interpoloituja arvoja. Tämä on samanlainen kuin suosittu[röntgenkuva](https://coastwatch.pfeg.noaa.gov/xtracto)Dave Foleyn luoma käsikirjoitus tarjoaa etulyöntiaseman jopa 100 pistettä per pyyntö. Dave Foley ja Jordan Watson (NMFS) .
         
    * Advanced Search on nyt tiukka ei-.html-pyyntöihin. Poikkeuslupaukset pyyntöihin, joilla on pysyviä virheitä (esim. pyynnöt, joissa minLat &gt; maxLat) Väliaikaiset virheet (esim. pyynnöt astandard\\_nameSitä ei ole olemassa) . .html-pyyntöihin Advanced Search on muuttumaton: kuten Googlen hakuihin, se korjaa parhaansa ja vaistomaisesti tai jättää virheet huomiotta. Kiitos Rich Signell.
         
    * IMPROVED: Advanced Search -sivun kartta on nyt suurempi (Joudut vielä vääntämään, mutta vähemmän) huomattavasti tarkemmin (Mutta ei siltikään täydellinen) . Kiitos John Maurerille.
         
    * IMPROVED: "Draw land mask" -asetus Make A Graph -sivuilla ja & land = ... asettamalla URL-osoitteisiin, jotka pyytävät karttaa, tukee nyt kahta muuta vaihtoehtoa:
"outline" piirtää vain maiseman ääriviivat, poliittiset rajat, järvet ja joet.
"Off" ei piirrä mitään.
Nähdään[&.maa = dokumentointi](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands).
Kiitos John Maurerille.
         
    * IMPROVED: Grafiikka ja kartat, jotka ovat luoneetERDDAP™Voit käyttää nyt kolmea uutta merkkiä: Borderless Filled Square, Borderless Filled Circle, rajaton täytetty kolmio. Tämän koodin on tuottanut ETT:n Marco Alba. Kiitos Marco Alballe.
         
    * Uusi:"files"Järjestelmä tukee nyt yksinkertaista Tiedostotyyppien vastaukset (.csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsvtai.xhtml.) esim.[ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv).
Kiitos Kyle Wilcoxille.
         
    * IMPROVED: URL-osoitteet, jotka syntyvät, kun käyttäjä käyttää Data Access -lomaketta (.html) Make-A-Graph (.grafiikka) Web-sivut ovat nyt oikeassa prosenttiluvussa\\[ja\\]. Tämä tekee URL-osoitteista hieman vaikeampia lukea, mutta se on parempi verkkoturvallisuuden näkökulmasta. Hallinnolla on nyt mahdollisuus rentoutua """\\[\\]|Tomcat-palvelin.xml-tiedosto (Vähemmän turvallista) tai ei (Turvallisempi) .
Kiitos Antoine Queric, Dominic Fuller-Rowell ja muut.
         
    * NEW: Jos EDDTable-tietokantojen pyyntöön sisältyy &add Muuttujia Missä missä (_attribuutti Nimi, attribuutti Arvoa) ,ERDDAP™Lisää kaikki muuttujat, joilla on _attribuutti Nimi = attribuutti Value_ on luettelo pyydetyistä muuttujista.
Nähdään[&add Muuttujia Missä dokumentit](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere). Kiitos Aurelie Briand, et al.
         
    * Muutos:ERDDAP™kieltäytyy sivun pyynnöistä / tiedostoja /.nctai tai.hdftiedostoja. Älä yritä yhdistää kaukaiseen.nctai tai.hdfAivan kuin ne olisivat paikallisia tiedostoja. Se on erittäin tehoton ja aiheuttaa usein muita ongelmia. Sen sijaan:
        * Käytä(OPeN)DAPAsiakasohjelmisto yhdistääERDDAP&gt;DAPPalvelut tälle aineistolle (joka on/griddap/tabledapURL:ssä) . Se on mitäDAPon for.
        * Käytä tietoaineiston Access-lomaketta pyytääksesi tietojen alijoukkoa.
        * Jos tarvitset koko tiedoston tai toistuvan pääsyn pitkän ajan, käytäcurl,wget, tai selaimesi ladata koko tiedoston, sitten käyttää tietoja paikallisesta tiedoston kopiosta.
             
    * Alkuperäinen nimi: The.odv Txt-tulostus on uusittu tukemaan uutta versiotaODV .txttiedostot ja tukevat trajectory-, aikaseries- ja profiilitietojen asianmukaista esittämistä.
         
    * IMPROVED: Nyt kaksoislainojen hakutermejä tulkitaan json-johdona, jotta niillä voi olla koodattuja hahmoja. Tämän avulla voit etsiä tarkan ottelun attribuutista, esim. ”Institution=institution=”NOAA\\n”Ei sovi yhteen instituution kanssa”NOAA NMFS. Kiitos Dan Nowackille.
         
    * IMPROVED: Lisäpaikoissa kelluvat pistenumerot (Erityisesti kelluvat kaksinkertaisiksi) Nyt se on hieman pyöristetty versio numerosta lisäpaikoissa, esim. kelluva, joka on aiemmin esitetty kaksoiskappaleena, kuten 32.27998779296875, saattaa nyt olla 32.28. Kiitos Kyle Wilcoxille.
         
    * BUG FIX: Allekirjoittamattomia kokonaislukutiedostoja luettiin hieman väärin. Nyt ne luetaan oikein.
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Varoitus: ensimmäinen kerta, kun juoksetERDDAP™V2.10 Jotkin paikalliseen datatiedostoon perustuvat tietoaineistot latautuvat **erittäin** hitaasti, koskaERDDAP™On luotava tietokanta tiedostojen tiedoista. Alkuvaiheen jälkeen ne kuormitetaan nopeasti, kuten ennenkin. Ole kärsivällinen.
         
    * Asiat, jotka sinun on tehtävä:
        * Kun käytät v2.10:tä, osa aineistoista ei välttämättä lataudu, koskaERDDAP™Se on nyt tiukempi metatietojen suhteen. Kuten ennenkin,ERDDAP™Lähetämme sinulle päivittäisen raportin, kun se latautuu ensin. Tämä sisältää virheviestit jokaiselle aineistolle, joka ei ladannut. Lue virheilmoitukset ongelmien selvittämiseksi. Useimmissa tapauksissa sinun tarvitsee vain tehdä pieni muutos tietoaineiston metatietoihin ongelman ratkaisemiseksi.
             
        * Sisällädatasets.xmlEtsiminen&lt;sourceName&gt; (Huomaa, että'='merkki, joka tunnistaa[Kiinteä arvosourceName](/docs/server-admin/datasets#fixed-value-sourcenames)) . UseimmilleERDDAP™Asetukset, nämä ovat harvinaisia. Jos jokin arvoista on'='ovat strings (Ei numeroita) Sinun täytyy nyt liittää merkkijono kaksoislainoihin. Esimerkiksi,
Ennen:&lt;sourceName=KZ401&lt;//sourceName&gt;
Jälkeen:&lt;sourceName= "KZ401"&lt;//sourceName&gt;
             
        * NEW: Asennuksessa on uusi valinnainen asetus.xml,&lt;defaultAccessibleViaFiles&gt;, joka asettaa oletusarvon&lt;KäytettävissäViaFiles &gt; jokaisesta tietoaineistosta. Tämän uuden tagin oletus on väärä, joka jäljittelee edellistäERDDAP™käyttäytymistä. Tämä alemman tason asetus voidaan ylittää tietyn tietoaineiston avulla.&lt;Käytettävissä ViaFiles&gt; -asetukset.
            
Valmistettu (Käyttäjiä, jotka haluavat tämän) :
Jos haluat tehdä EDD:n... Files-tiedostot, jotka ovat saatavilla tiedostojärjestelmän kautta, ja
            
            1. Lisää tämä tunniste asennus.xml-tiedostoosi:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Optionaalisesti) Poista kaikki
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
Sisällädatasets.xmlKoska oletus on nyt totta.
                 
        * Lisäys \\ \\ \\ \\ n arvon ominaisuudet:
            ERDDAP™Käytetty oletusarvo \\ FillValue kaikille kokonaismuuttujille: tietotyypin suurin arvo (127 tavumuuttujaa) . Nyt se ei. Näiden arvojen välttämiseksi näkyy data-arvoina (Ei puuttuvia arvoja) Sinun täytyy nimenomaisesti ilmoittaa nämä kautta \\-FillValue attribuutit. Joka kerta kun aloitatERDDAP™se lähettää ylläpitäjälle sähköpostin, jossa on .csv-taulukko, jossa on luettelo kokonaislähteen vaihteluista, joilla ei ole \\FillValue taimissing\\_valueattribuutit ja ehdotetut uudet arvot. Näytä[Lisää | Fill Arvon ominaisuudet](/docs/server-admin/datasets#add-_fillvalue-attributes)Lisätietoja ja ohjeita.
             
        * Jos kokoatERDDAP™, sinun on muokattava javac-komentorivillä olevaa luokkaparametria viitataksesi näihin uusiin purkkeihin: lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-annotations.jar;lib/jackson-core.jar;lib/jackson-databind.jar .
             
    * Tomcat 9 on nyt suositeltu versio TomcatistaERDDAP. Tomcat 8.5+:n uusin versio on hyvä. SiivosimmeERDDAP&gt;[Tomcatin asennusohjeet](/docs/server-admin/deploy-install#tomcat).
        
Viimeisin versioJava8 8 8 (Ei ei eiJava9, 10, 11, ...) From[Adoptoija](https://adoptopenjdk.net/)edelleen suositeltu versioJavaforERDDAP.JavaAdoptOpenJDK:n Long Term Support -tuki on turvallinen, mutta muista saada uusin versio siitä säännöllisesti turvallisuussyistä.
        
    * NEW: Script SourceNames/Drived Variables in Tabular Datasets Näytä tarkat tiedot
EDDTableFromFiles, EDDTableFromDatabase ja EDDTableFromFileNames -tietoaineistot voivat nyt sisältää ilmaisuja ja käsikirjoituksia.sourceName. Näin voit tehdä uusia muuttujat perustuen olemassa oleviin muuttujiin lähdetiedostoissa. Tietyn uuden muuttujan laskenta suoritetaan yhden tuloksen rivissä toistuvasti kaikkien rivien osalta. Esimerkiksi tehdä pituusmuuttuja, jonka arvot vaihtelevat välillä -180 - 180 ° muuttujasta, jonka arvot ovat 0 - 360°:
        &lt;sourceNameMath2.anglePM180 (Rivi.columnDouble ("Lon") ) &lt;//sourceName&gt;
yksityiskohtiin, katso[Lähde: SourceNames](/docs/server-admin/datasets#script-sourcenamesderived-variables)  
Kiitos Bob Simons (jotka suunnittelivat tätä ennenERDDAP™V1.0 ja viimein löytyi keino) Kevin O'Brien, Roland Schweitzer, John Maurer ja Apache JEXL -kirjasto tekevät kovaa työtä (ja tehdä sen hyvin) .
         
    * NEW: Unsigned Integer -tietotyypit (ubyte, uint, ulong) Nyt niitä tuetaan. Huomaa, että monet tiedostot (esim. .das, .dds,.nc3 3) Älä tue kaikkia uusia tietotyyppejä. Nähdään[Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Tyypin dokumentointi](/docs/server-admin/datasets#data-types)yksityiskohtia siitä, mitenERDDAP™käsittelee näitä eroja. Erityisesti, koska(OPeN)DAP.dds-vastaus, ei tue allekirjoitettuja tavuja, pitkiä tai ulongeja, saatat haluta käyttääERDDAP.dasin ja .dasin tabulaariesitys, sellaisena kuin se näkyyhttpErddap/ **Info** /_datasetID_.html verkkosivut (esimerkiksi[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) ) jota voit käyttää myös muissa tiedostotyypeissä tai.nccsvMetadata vastaus (esimerkiksi[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) ) Molemmat tukevat kaikkia tietotyyppejä kaikissa tilanteissa.
        
VAROITUS: Tässä muutoksessa vaikuttaville tietoaineistoille on mahdollista, että näet ongelmat tietoaineiston kanssa, koska tiedot, jotkaERDDAP™Lähteen lukeminen voi olla erilaista (Esimerkiksi muuttujia, jotka on aiemmin luettu allekirjoitettuina kokonaislukuina, voidaan nyt lukea allekirjoittamattomina kokonaislukuina.) . Tuloksena on ongelmia: uusia tiedostoja, joita ei ole lisätty tietoaineistoon, ja / tai virheitä, kun yrität käyttää tietoja. Jos aineistolla on ongelmia, ensimmäinen asia, jota voi yrittää, on[Aseta kova Lippu](/docs/server-admin/additional-information#hard-flag)aineiston osalta. Jos tämä ei ratkaise ongelmaa, sinun on katsottava logiikkaa. txt nähdäksesi virheviestit, mene sisäändatasets.xmlaineiston osalta ja/tai ehkä uudelleenkäynnistys tuottaa Datasets.xml.
Netcdf-java 5.x:n ansiosta (joka pakotti kysymyksen) Seuraava CF 1.9.
        
    * Improve: Nyt on[Parempi dokumentointi/neuvonta](/docs/server-admin/datasets#s3-buckets)Kuinka luoda tietoaineisto tiedostoista AWS S3 -pakettiin Kiitos Micah Wengrenille.
         
    * Muutos: Muutoksia liittyy"files"järjestelmä.
        * Tämän käsittelyn koodi on kirjoitettu uudelleen käytettäviksi useammalla luokalla.
             
        * NEW: Käyttäjän hakemistopyynnöt voivat nyt pyytää, että vastaus on yksi tavallisen taulukon tyypeistä liittämällä halutun tiedostolaajennuksen: .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsvtai.xhtml). Esimerkiksi,
            [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)  
Kiitos Kyle Wilcox ja Shane St Savage.
             
        * Alkuperäinen nimi: Now, Generate Dataa XML ei sisällä&lt;KäytettävissäViaFiles&gt;-tunniste ulostulossa. Oletus on, että tietoaineisto luottaa uuden arvoon.&lt;Epäonnistumiskykyinen &gt; Tag in setup.xml. Näytä[Saatavuus Viafiilit](/docs/server-admin/datasets#accessibleviafiles).
             
        * IMPROVED: Lisätiedot tukevat nyt saavutettavuutta Viafiilit:EDDGridSideBySide,EDDGridAggregateexistingdimension,EDDGridFromErdddap, EDDTableFromErddapEDDGridLähde: EDDTableFromEDDGridjaEDDGridLähde: Etopo. Näiden osalta tietyn etä-/lapsitietoaineiston tiedostot ovat käytettävissä vain, jos sekä vanhempi että etä-/lapsitiedot ovat käytettävissä. Viafiilit totta (ehkä&lt;Epäonnistumiskykyinen &gt;). Kiitos Damian Smyth ja Rob Fuller.
             
        * TO DO / RECOMMENDATION: Suosittelemme, että kaikki tiedostojärjestelmän kautta saatavilla olevat tietoaineistot asetetaan&lt;Oletusasetukset KäytettävissäViaFiles &gt; totta asennus.xml, koska on olemassa joukko käyttäjiä, joille tämä on paras tapa saada tiedot. Muiden syiden lisäksi"files"Järjestelmän avulla käyttäjät voivat helposti nähdä, mitkä tiedostot ovat saatavilla ja milloin ne ovat viimeksi muuttuneet, jolloin käyttäjän on helppo säilyttää oma kopio koko tietoaineistosta. Jos et yleensä halua tehdä tietoaineistoja tiedostojärjestelmän kautta, aseta&lt;DefaultAccessibleViaFiles &gt; Väärä. Kummassakin tapauksessa käytä&lt;Käytettävissä olevaViaFiles &gt; niissä harvoissa tietoaineistoissa, jotka ovat poikkeuksia yleiseen politiikkaan&lt;Epäonnistumiskykyinen &gt; (esimerkiksi silloin, kun aineisto käyttää.ncml-tiedostot, jotka eivät ole hyödyllisiä käyttäjille) .
             
    * IMPROVED: Nyt, jos lähdeaineistossa on CF grid -tietojen kartoitustietoja, se tuottaa Dataa Xml verkottuneiden tietoaineistojen lisäämiseksi maailmanlaajuisesti&lt;Lisätiedot &gt; ja tiedot lisätään maailmanlaajuisesti&lt;Lähteet &gt; Joka kerta tiedot luetaan tiedostosta. Tiedot näkyvät tietoaineiston globaaleissa ominaisuuksissa joukona attribuutteja, joissa on prefix grid -kartta.
         
    * Tuki ryhmille lukemisen yhteydessä.nc4 4 (jossain määrin.hdf5 5) tiedostoja. Yleensä yksiERDDAP™Tietoaineisto rakennetaan muuttujasta yhdessä tiedoston ryhmistä. GenerateDatasets XMLEDDGridNCFiles jaEDDGridLähde: NCFiles Pakkaus vaatii nyt ”ryhmää” (esim. ""kaikkiin ryhmiin, "someGroup", "someGroup/someSubGroup" tai ".\\[juuret\\]"Juuriryhmän puolesta) . Kiitos Charles Carleton ja Jessica Hausman.
         
    * Lähde: GenerateDatasets XMLEDDGridNCFiles jaEDDGridLähde: NCFiles Pakkaamattomat tukevat nyt valinnaista "DimensionsCSV"-parametria, jonka avulla voit määrittää niiden ulottuvuuksien lähdenimet, joita haluat käyttää. Käytä "" saada muuttujia, jotka käyttävät eniten mittoja, kuten ennen. Myös tähän tyyppiin liittyvä pieni vika on nyt korjattu. Kiitos Sujal Manandharille.
         
    * Alkuperäinen nimi: GenerateDatasets Xml listaa nyt asianmukaisesti "EDDTableFromJsonlCSVFiles" (Ei "EDDTableFromJsonlCSV") Yksi EDDType-vaihtoehdoista. Kiitos Andy Zieglerille.
         
    * Improvisoitu:EDDGridLähde: NCFiles Pakkaamattomat standardisoivat nyt "yksiköt" -ominaisuudet vakio-/"kanoniittisille" (Sama menetelmä kuin yksikkömuunnin) . Esimerkiksi,"meter per second","meters/second","m.s^-1"ja"m s-1"Kaikki muuttuu"m s-1". Kiitos Andy Zieglerille.
        
VAROITUS: Tämä voi aiheuttaa ongelmia jo olemassa oleville tietoaineistoille. (Esimerkiksi uusien tiedostojen merkitseminen huonoiksi) . Jos näin on,[Aseta kova Lippu](/docs/server-admin/additional-information#hard-flag)aineistoon, jotta kaikki lähdetiedostot luetaan uudelleen uudella järjestelmällä.
        
    * IMPROVED: Nyt muuttujien&lt;sourceName&gt; voi määrittää kiinteän arvon = NaN ja muuttujilla voi ollaactual\\_rangeNimitys, joka määrittää rajallisen valikoiman. Tämä on joskus hyödyllistä, jotta datan (EDDTableFromFileNames-aineisto) Dummy-muuttuja (s)   (Leveys, pituus, aika) NaN:n kiinteät arvot, mutta päteväactual\\_range  (Asetelma attribuutista) . Sitten Advanced Searchissa käyttäjä voi etsiä tietoja, joilla on tietoja tietyllä leveysasteella, pituus, aikaväli ja tämä tietoaineisto voi sanoa, että sillä on asiaankuuluvia tietoja. (Vaikka kaikki tiedot osoittavat NaN:ää) . Nähdään[kiinteän arvon dokumentointi](/docs/server-admin/datasets#fixed-value-sourcenames).
Kiitos Mathew Biddlestä.
         
    * Uusi: Nyt,datasets.xmlChunk EDDTableFromAsciiFiles tai EDDTableFromColumnarAsciiFiles -tietokantaan voi sisältyä tunniste, joka kertooERDDAP™jättää huomiotta kaikki tiedoston yläreunassa olevat linjat, mukaan lukien linja, joka vastaa määritettyä säännöllistä ilmaisua. Esimerkiksi,
        &lt;skipHeaderToRegex · Katso lisää »\\*&gt;\\*&gt;\\*Headerin loppu.\\*&lt;/skipHeaderToRegex &gt;
Älä unohda kaikkia linjoja ylös ja mukaan lukien linja, joka alkaa "\\*\\*"Haderin loppu" Näe [&lt;skipHeaderToRegex &gt; dokumentointi (Docs/server-admin/datasets#skipheadertoregex) .
Kiitos Eli Hunter
         
    * Uusi: Nyt,datasets.xmlEDDTableFromAsciiFiles tai EDDTableFromColumnarAsciiFilesdataset voi sisältää tunnisteen, joka kertooERDDAP™jättää huomiotta kaikki tiedoston viivat, jotka vastaavat määritettyä säännöllistä ilmaisua. Esimerkiksi,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

Kaikki linjat, jotka alkavat # Näe [&lt;skipLinesRegex &gt; dokumentointi (Docs/server-admin/datasets#skiplinesregex) .
Kiitos Eli Hunterille.
         
    * Uusi: Thedatasets.xmlChunk for any EDDTable dataset Näytä tarkat tiedot Muuttujia Missä missä (_attributeNamesCSV_) . Jos se tekee,ERDDAP™Lisää widget jokaiseen määritettyyn ominaisuuteen Tietoaineiston tiedonsaantilomake (.html verkkosivut) Käyttäjien on helppo lisätä ja lisätä Muuttujia Missä missä (_attribuutti Nimi, attribuutti Arvoa) pyyntöön.
Nähdään[&add Muuttujia Missä dokumentit](/docs/server-admin/datasets#addvariableswhere).
Kiitos Aurelie Briand, et al.
         
    * Uusia Kolmannen osapuolen työkalu:ERDDAPLinkki
        ERDDAPLinkki on Rob Fullerin ja Irlannin Marine-instituutin Adam Leadbetterin ohjelma, jonka avulla voit parantaa metatietojasi.ERDDAP™Dataa.ERDDAPLinkki sisältää sääntöjä ja yksinkertaisen staattisen verkkosovelluksen, jolla suoritetaan joitakin todentamistestejäERDDAP™palvelin. Kaikki testit suoritetaan selaimessa.” kuin[Unix/Linux-linkki](https://en.wikipedia.org/wiki/Lint_(software)Voit muokata voimassa olevia sääntöjä tai lisätä uusia sääntöjä. Näytä[ERDDAPLinkki](https://github.com/IrishMarineInstitute/erddap-lint)Lisätietoa.
        
Tämä työkalu on erityisen hyödyllinen tietoaineistoille, jotka olet luonut jo jonkin aikaa sitten, ja nyt haluat tuoda ajan tasalle nykyisten metatietojen mieltymykset. GenerateDatasetsin varhaiset versiot XML ei ole pyrkinyt luomaan maailmaacreator\\_name,creator\\_emailcreator-tyypin taicreator\\_urlmetadataa. Voit käyttääERDDAPLinkki tunnistaa tietoaineistot, jotka puuttuvat näistä metadata-ominaisuuksista.
        
Kiitos Robille ja Adamille tämän työkalun luomisesta.ERDDAP™yhteisö.
        
    * NEW: Nyt on hyvä, jos osa tiedostoista on ok.EDDGridFromFiles-aineistossa ei ole kaikkia tietoaineiston muuttujia. Tiedostot sisältyvät ikään kuin ne olisivat muuttujat. (Kaikki puuttuvat arvot) .
Kiitos Dale Robinsonille ja Doug Latornellille.
         
    * NEW: Lokitiedostossa on uusia käyttötilastoja ja Daily Report auttaa ylläpitäjiä tunnistamaan muistiongelmia aiheuttavat käyttäjät. Tilastot ovat nimeltään ”OutOfMemory”. (Array Size) "OutOfMemory" (Liian suuri) ”OutOfMemory” (Liian iso tapa) ". Niissä esitetään käyttäjien IP-osoitteet, jotka ovat esittäneet pyyntöjä näissä kategorioissa ja pyyntöjen määrä. Jos pyyntöjä ei ole, näitä tilastoja ei esiinny. ”OutOfMemory” (Array Size) "OutOfMemory" (Liian iso tapa) "Kysymykset eivät yleensä ole ongelma, koska pyynnöt olivat niin suuria, ettäERDDAP™Hän otti ne nopeasti kiinni ja palautti virheilmoituksen. "OutOfMemory" (Liian suuri) "Kysymykset ovat vaarallisempia, koskaERDDAP™Jotain ponnistelua ennen kuin tajusi, että pyyntöä ei ole riittävästi muistia. (ongelma voi olla muita pyyntöjä ennen näitä pyyntöjä.) .
        
On myös uusia tilastoja, joita kutsutaan nimellä "Large Request, IP-osoite", jotka osoittavat suurten pyyntöjen esittäneiden käyttäjien IP-osoitteet. (Tällä hetkellä verhottu.nctiedostot &gt; 1GB) .
        
Myös status.html-sivulla oleva aikasarjataulukko sisältää nyt "memFail" -sarakkeen, jossa näkyy pyyntöjen lukumäärä, joka ei ollut "OutOfMemory" -sivulla. (Liian suuri) "Virheitä viimeisistä suurista tiedoista. Mikä tahansa numero, joka on 0, on ainakin yksi syy huoleen.
Kiitos Bob Simonsista.
        
    * Uusi versio: Uusi versioHyraxNäytä hakemistot eri tavalla kuin ennen.ERDDAP™Nyt voi lukea vanhat ja uudet hakemistot.
         
    * NEW: Datasetin lataukset ja käyttäjävasteet, jotka kestävät &gt; 10 sekuntia (onnistuneesti tai epäonnistuneesti) on merkitty " (&gt; 10.) ". Näin voit etsiä tämän lauseen log.txt-tiedoston löytääksesi tietoaineistot, jotka olivat hitaita ladattavaksi tai pyynnön numeron, joka oli hidas loppuun. Voit sitten katsoa korkeammalle log.txt-tiedostossa nähdäksesi, mikä tietoaineiston ongelma oli tai mitä käyttäjän pyyntö oli ja kuka se oli. Nämä hidas dataset-kuormat ja käyttäjän pyynnöt verotetaan joskusERDDAP. Lisätietoa näistä hakemuksista voi auttaa tunnistamaan ja ratkaisemaan ongelmia.
    * IMPROVED: CF DSG -tietoaineiston validoinnissaERDDAP™Nyt varmistat, että muuttujat, joilla on cf ́role-attribuutit, ovat vastaavassa cdm \\ \\variables -luettelossa eivätkä ole muissa cdm-listoissa. Esimerkiksi, jos aikaseriesProfile-tietoaineistossa on "tila"-muuttuja, jolla on cf \role = Timeseries = Timeseries \\ id -tunnus, niin "station \\id" on oltava cf \\ Timeseries \\variables -luettelossa, mutta ei saa olla cf profiilissa.
Kiitos Micah Wengrenille.
         
    * "Simplify" on nyt nopeampi, käyttää vähemmän muistia ja voi palauttaa LongArrayn. KiitosUnidata.
         
    * IMPROVED: EDDTableFrom on nyt huomattavasti nopeampi (nc liittyvät) Tiedostot (EDDTableFromNcCFiles ja EDDTableFromInvalidCRAFiles) Koska Odotettu (Toinen paikka) Nyt vain lukee näytetiedoston metatietoja sen sijaan, että olisi lukenut kaikki tiedot. Kiitos Jessica Austinille.
         
    * IMPROVED: On nyt tukea aikajonoja, joiden tarkkuus on suurempi kuin to-the-millisecond, jos lisänumerot ovat kaikki 0, esim. 2020-05-22T01:02:03.456000Z. Kiitos Yibo Jiangille.
         
    * GenerateDatasetsXml:n EDD.suggestDestinationName, jota käytetään poistamaan () ja kaiken sen jälkeen. Nyt se poistuu (\\*Vain jos se on loppusourceName. Nyt se myös poistaa\\[.\\*\\]Vain jos se on loppusourceName. Kiitos Julien Paulille.
         
    * Lähde: GenerateDatasets XML tekee muuttujistadestinationNameAinutlaatuinen lisätty +2, +3, tarpeen mukaan. Kiitos Julien Paulille.
         
    * Kun Calendar2.parseDateTime parses dd, hh tai HH, ensimmäinen "digit" voi nyt olla tila.
    * Tietoinen käytäntö: AloitetaanERDDAP™2.10,.ncml-tiedostot, jotka yrittävät muuttaa ominaisuutta, eivät muuta attribuuttia. Tämä on tiedossa oleva vika netcdf-javassa, jonka olen ilmoittanut, ja he sanovat, että se on kiinnitetty seuraavaan netcdf-javan vapautukseen.
         
    * Linkkejä FIX: Tein oikean järjestelmän testata rikkinäisiä linkkejäERDDAP™Web-sivut, joten rikkinäisiä linkkejä pitäisi olla vähän. (Ainakin kunkin julkaisupäivän aikana syntyy uusia rikkinäisiä linkkejä.) .
         
    * EDDTableFromHttpGet epäonnistui tietyntyyppisissä pyynnöissä. Nyt se ei. Kiitos Emmalle BODC:ssä.
         
    * Viisikymppinen: Joidenkin pyyntöjen käsittelemiseksi EDDTable teki tilapäisen tiedoston jokaisesta pyydetystä muuttujasta, ja tiedoston nimi päättyi muuttujan nimeen. Jos muuttujan nimi oli myös jonkinlainen puristus (esim. .Z) ,ERDDAPyrittäisi (Epäonnistuminen) poistaa väliaikaisen tiedoston. Nyt tilapäiset tiedoston nimet päättyvät .temp. Kiitos Mathew Biddlestä.
         
    * BUG FIX: GenerateDatasetsXml ja Calendar2.convertToJavaPäivämäärä Formaatti on nyt paljon vähemmän todennäköistä tehdä virheellinen muutos, kun yrittää korjata mahdollisen mitättömän päivämäärän. Automaattista aikataulua ei muuteta. Kiitos Mathew Biddlestä.
         
    * Viisikymppinen: Jos on virhe, kun saat sisältöä kauko-URL-osoitteesta ja jos virheStream-sisältö on pakattu,ERDDAP™Nyt virheilmoitus on oikein masentunut. Kiitos Bob Simonsista.
         
    * Vinkki:&lt;EDD:tä ei sovellettu, kun EDD:tä ... FromErddap-tietokanta oli lasten tietoaineisto. Nyt se on. Kiitos Chris Romsos.
         
    * Alkuperäinen nimi: GenerateDatasets Xml ei enää ajattele lähdemuuttujan nimeä, joka alkaa "latinalla" saattaa olla leveys. Kiitos Vincent Luzzo.
         
    * BUG FIX: Nyt, OutOfMemoryError, kun lukee tiedostoa käyttäjän pyynnöstä, ei ole syy lisätä tiedostoa BadFiles-listalle. Kiitos Bob Simonsista.
         

## versio 2.02{#version-202} 
 (Lähde: 2019-08-21) 

*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :** 
    * NEW: Nyt on kaksi tapaa etsiä tietoaineistoa useistaERDDAPs. Ne toimivat hieman eri tavalla ja niillä on erilaiset rajapinnat ja vaihtoehdot.
        
        *   [EtsiminenERDDAPhtml](/SearchMultipleERDDAPs.html)Lähde: Bob SimonsNOAA NMFS SWFSC ERD.
        *   [ http://erddap.com ](http://erddap.com)Rob Fuller, Irlannin meriinstituutti.
        
Kiitos Tylar Murraylle alkuperäisestä hakemuksesta.
         
    * IMPROVED: Pyyntö"files"Järjestelmä ladata tiedosto, joka on todella etäsivustolla (AWS S3) johtaa nyt uudelleenohjaukseen, joten käyttäjä lataa tiedot lähteestä sen sijaan, että käyttäisit niitä.ERDDAP™välittäjänä. Kiitos Andy Zieglerille jaNOAA.
         
    * NEW: Esimerkkinä uusista AWS S3:een liittyvistä ominaisuuksista ja helpottaa kaikkien selaamista ja lataamista julkisista AWS S3 -paketeista.
        [110 näytetietoa](https://registry.opendata.aws/)Näin kuka tahansa voi selata lähes kaiken sisällön
        [AWS S3 Open Data Buckets Näytä tarkat tiedot](https://registry.opendata.aws/). Jos klikkaat"files"linkki johonkin näistä näytteen tietoaineistoista, voit selata hakemistopuuta ja tiedostoja kyseisessä S3-laastarissa. Näiden aineistojen toimivuuden vuoksi nämä hakemistot ovat aina ajan tasalla, koskaERDDAP™Ota ne lennolle. Jos napsautat hakemistopuuta oikeaan tiedostonimeen ja klikkaat tiedoston nimeä,ERDDAP™Ohjaa pyyntösi uudelleen AWS S3:een, jotta voit ladata tiedoston suoraan AWS:ltä.ERDDAP™Järjestäjät voivat
        [Lue ohjeita, miten voit tehdä tämän muille S3-malleille](/docs/server-admin/datasets#working-with-aws-s3-files). Kiitos Andy Zieglerille jaNOAA.
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Asiat, joita sinun tarvitsee tehdä: ei ketään
         
    * Improvisoitu:ERDDAPmenetelmä, jolla tallennetaan joukko merkkijonoja (Stringarray) Se on nyt paljon tehokkaampi muisti. String Järjestelmiä käytetään kaikkiallaERDDAP™Erityisesti kun luet tabulaarisia ASCII-tiedostoja. Muut muutokset tekevät CSV/TSV/SSV ASCII:n, sarake ASCII:n ja jsonlCSV-tabulaaritiedostojen lukemisesta nopeampia ja paljon tehokkaampia. Tuloksena on: 764 MB ASCII -datatiedostolle (Pakkaus 52MB.gztiedostotiedosto) 3 503 266 riviä ja 33 saraketta, maksimimuistin käyttö 10 Gt alas 0,6 Gt (Peak) . Lukemisen aika meni ~7 minuuttia (vaihtelee huomattavasti sen mukaan, kuinka paljon fyysistä muistia tietokoneessa on.) ~36 sekuntia (10 Yksinkertaistaminen () jota käytetään vain GenerateDatasetsissa XM) . Monissa muissa paikoissaERDDAP™Tämä parantaa muistin tehokkuutta. Kiitos Tylar Murray ja Mathew Biddle.
        
Tutkin erilaista ratkaisua (StringArrayn varustaminen UTF-8-koodattuina tavujoukkoina) . Tämä vähentää muistin käyttöä ~33%, mutta hidastaa ~33%. Verrattuna nykyiseen järjestelmään, joka tuntui huonolta kaupalta. On helpompi antaa tietokoneelle enemmän muistia (Lisää muistia ~ 200) kuin tehdä siitä nopeampaa (Osta kokonaan uusi tietokone) .
        
Jos se on kätevä, se on aina hyvä idea jakaa valtavia tabulaaritiedostoja useisiin pienempiin tiedostoihin, kuten kriteereihin.stationIDja/tai aikaa.ERDDAP™Usein on avattava yksi pienistä tiedostoista vastauksena käyttäjän pyyntöön, ja näin voidaan reagoida paljon nopeammin.
        
    * Improve: Nyt on[ERDDAP™AWS S3 -dokumentti](/docs/server-admin/datasets#working-with-aws-s3-files)joka kuvaa, miten päästäERDDAP™Työskentele tiedostojen kanssa AWS S3:ssa.
myös,ERDDAP™Käytä uusia ominaisuuksia AWS S3:ssaJavaAPI.
myös,ERDDAP™AWS S3 -URL-osoitteet voivat nyt sisältää lisämerkkejä (Ajanjakso, hyphen, Underscore) bucket-nimillä.
myös,ERDDAP™Nyt vaaditaan, että AWS S3:n bucket-URL-osoitteet tunnistetaan tietyllä tavalla:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
jossa prefix on valinnainen.
Kiitos Andy Zieglerille jaNOAA.
         
    * Lähde: GenerateDatasets XML kohtelee nyt yleistämissing\\_values stand-ins puuttuvina arvoina, joten se muuntaa sarakkeen todennäköisemmin numeeriseksi tietotyypiksi. Alkuperäinen nimi: Primitive Array.simplify () Nyt lokit, joiden tietojen arvo aiheutti sen käsittelemään tiettyä saraketta merkkijonojen sarakkeena. Kiitos Mathew Biddlestä.
         
    * Improvisoitu:&lt;Pyydä mustavalkoista" tukee nyt.\\*.\\*  (Tai:\\*:\\*IPv6) IP-osoitteiden lopussa, jotta voit mustalle listalle suuremman IP-osoitteen, esim. 110.52.\\*.\\*  (Kiina Unicom Tianjin) . Katso dokumentit [...]&lt;Pyydä musta lista » (Docs/server-admin/datasets#requestblacklist Näytä tarkat tiedot) Kiitos China Unicom ja China Telecom.
         
    * IMPROVED: Jos tietoaineiston lähde ei määritä"institution"Alkuperäinen nimi: GenerateDatasets Xml ja loadDataset saavat sen nyt "Creator"-ominaisuudesta. (jos saatavilla) . Kiitos Micah Wengrenille.
         
    * BUG FIX: Standardisointi Mitä ei aina sovellettu ASCII-tiedostoihin.
EDDTable ei myöskään käsitellyt ajoissa olevia rajoituksia, kun lähteellä oli String-aika-arvot ja standardointi. mitä käytettiin.
Kiitos Paloma de la Vallee.
        
En ole aiemmin todennut, että sinun pitäisi käyttää standardointia. Mitä ominaisuuksia tarvitset, kun todella tarvitset niitä (Esimerkiksi, kun eri lähdetiedostot tallentavat aika-arvoja eri tavoin.) Jotkin pyynnöt tietoaineistoille, jotka käyttävät standardointia Mitä käsitellään hitaammin.
        
    * Vinkki: vika koodissa, jota käytetäänEDDGridNCFiles sai sen epäonnistumaan.nc4 ja.hdf5 tiedostoa, joissa on "pitkä" (64) muuttujia. Tämä on nyt korjattu. Kiitos Friedemann Wobus.
         
    * Viisikymppinen: Pienet muutokset ISO 19115 -tiedostoihin, jotka tekevät toisesta validaattorista onnellisen. Kiitos Chris MacDermaid ja Anna Milan.
         

## Versio 2.01{#version-201} 
 (Lähde: 2019-07-02) 

*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :** 
    * Ei mitään.
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Viisikymppinen: Vika koodissa, joka tuottaa Data Access -muodontabledapTiedot aiheuttivat, että sivu oli tyhjä tietyille tietoaineistoille. Olen myös parantanut odottamattomien virheiden käsittelyä kaikilla HTML-sivuilla. (Yleensä yleensä) Näytä virheilmoitus. Kiitos Marco Alballe.
    * Lähde: GenerateDatasets Xml ei enää paina pitkää varoitusta tuotannossa. Sen sijaan, katsokaa[Sukupolven editointi Dataa XML-tuotanto](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better). Kiitos Steven Baumille.
    * Lähde: GenerateDatasets Xml antaa hieman erilaisia suosituksia eri tilanteissa.&lt;Päivitä EveryNMillis&gt; for EDD...Files datasets. GenerateDatasets Xml lannistaa nyt alkuperäisen EDDTableFromFiles-tietokantojen ”extract” -järjestelmän.

## Versio 2.00{#version-200} 
 (Lähde: 2019-06-26) 

*    **ERDDAP™V2.00 on vihdoin täällä&#33; Kyllä&#33;**   
     
    * Pyydämme anteeksi pitkää viivettä, joka tarvitaan tämän version loppuun saattamiseen.
Kiitos kärsivällisyydestäsi.
         
    * Hyvä uutinen on, että lisäaikaa on käytetty lisäämään käyttäjien pyytämiä ominaisuuksia. Huono uutinen on se, että jopa viivästymisen myötä ei lisätty kaikkia pyydettyjä ominaisuuksia. Pahoittelut, mutta tuntui tärkeämmältä päästä eroon kuin viivästyttää enemmän. (ikuisesti?) lisätä jatkuvasti uusia ominaisuuksia. Lupaamme palata useammin julkistuksiin tulevaisuudessa.
         
    * "Version 2" Onko suuria muutoksia ja ristiriitoja?"
Isoja uusia ominaisuuksia? Kyllä.
Suuret ristiriidat tai muutokset ylläpitäjille tai käyttäjille? Ei.
Hyppäsimme v1.82 - v2.00:
        * Osittain juhlitaan 10 vuotta (Nyt 11) Ensimmäisen julkisen vapautuksen jälkeenERDDAP™  (v1.00 2008-05-06, joka ulkoisesti näytti merkittävästi v2.00) . siihen aikaan,ERDDAP™asennuksesta lähes 100 asennustilaan vähintään 12 maassa (Australia, Belgia, Kanada, Ranska, Irlanti, Italia, Etelä-Afrikka, Espanja, Thaimaa, Yhdistynyt kuningaskunta, Yhdysvallat) .
        * Lisäys täysin uuteen suuntaan:ERDDAP™Nyt käytössä on datanhallintajärjestelmä, jonka avulla voidaan hyödyntää olemassa olevia palvelinpalveluita. (Katso nähkää[EdDTableFromHttpGet](#eddtablefromhttpget)) ,
        * Ja osittain, koska se ei ollut suuri hyppy 1,82-2,00 numeerisesti, joten tämä tuntui oikealta ajalta.
             
    * Toinen hyvä uutinen on, että on olemassa kaksi muuta ryhmää, jotka tukevat koodia.ERDDAP™  (Tässä versiossa ja merkinnöillä ne jatkuvat) Rob Fuller ja Adam Leadbetter Irlannin Marine Institutesta sekä Roland Schweitzer PMEL:stä ja Weathertop Consultingista. Kiitos paljon. On totta, että he työskentelevät oman valintansa projekteissa, mutta se on klassinen avoimen lähdekoodin kehitysmalli - ryhmät antavat koodin ominaisuuksille, joita he haluaisivat eniten nähdä. Lisähyöty osallistujille: he saavat käyttää uusia ominaisuuksia heti, kun ne ovat valmiita; heidän ei tarvitse odottaa seuraavaa julkaisua.ERDDAP. Ryhmä on myös tervetullut osallistumaan&#33; Nähdään[ERDDAP™Ohjelmoijan opas](/docs/contributing/programmer-guide).
         
    * Toivomme, että pidätERDDAP™Odotamme innolla seuraavaa 10 vuottaERDDAP™kehitystä ja yhä enemmän käyttöä ympäri maailmaa.
         
*    **Uudet ominaisuudet ja muutokset (Käyttäjille) :**   
     
    * Uusi:orderByMeanfilter
fortabledapTiedot laskevat määritettyjen ryhmien keinot. Kaikki, kaikkiorderByvaihtoehdot tukevat nyt ylimääräistä tapaa määritellä ryhmiä: _numericVariable\\[Lukumäärä\\[Ajankäyttö\\]\\[:offset\\]\\]Esimerkiksi päivä/päivä tai syvyys/10:5. Esimerkiksi,stationIDPääartikkeli: WaterTemp &orderByMean ("""stationIDAika/päivä”) Järjestäisivät tuloksetstationIDja aika lasketaan ja palautetaan vesiputken keskiarvo kullekinstationIDjoka päivä. Nämä ovat erittäin hyödyllisiä ja tehokkaita uusia ominaisuuksia. Näiden ominaisuuksien ja vanhan koodin muutosten taustalla olivat Rob Fuller ja Irlannin Marine Instituten Adam Leadbetter. Kiitos, Rob ja Adam&#33;
         
    * NEW: tulostiedostotyyppi tabulaaritietokannoille:[.data Pöytä](https://developers.google.com/chart/interactive/docs/reference#dataparam),
JSON-tiedosto, joka on muotoiltu käytettäväksiGoogle VisualizationAsiakaskirjasto (Google Charts) . Tämän koodin antoi Roland Schweitzer ja se toimitettiin Gitin kautta. Kiitos, Roland&#33;
         
    * NEW: tulostiedostotyyppi tabulaaritietokannoille:[.jsonlCSV1](https://jsonlines.org/examples/),
joka on kuin olemassa oleva.jsonlCSVVaihtoehto, mutta sarakkeiden nimillä ensimmäisellä rivillä. Kiitos Eugene Burgerille.
         
    * NEW: Jos järjestelmänvalvoja mahdollistaa sen, käyttäjät voivat kirjautua sisään.[Orcid](https://orcid.org)Tili.
Se on OAuth 2.0 -todennusjärjestelmä, kuten Googlen todentaminen. ORCIDia käytetään laajalti tutkijoiden tunnistamiseen. ORCID-tilit ovat ilmaisia ja niillä ei ole Google-tilien tietosuojaongelmia. NäytäERDDAP&gt;[Orcid Authentication -ohjeet](/docs/server-admin/additional-information#orcid). Kiitos BCO-DMO (Adam Shepard, Danie Kinkade jne.) .
         
    * Uusi URL-muunnin muuntaa ajantasaiset URL-osoitteet ajantasaisiksi URL-osoitteiksi.
Katso.../erddap/convert/urls.htmlERDDAP™asennus, esim.
        [Tämä linkki muuntajaanERD ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html). Tästä pitäisi olla hyötyä tietojohtajille. Sitä käyttää myös GenerateDatasetsXml. Kiitos Bob Simons ja Sharon Mesick.
         
    * Lähde: The[Aika muuntaa](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)Nyt on mahdollisuus muuntaa mikä tahansa yhteinen merkkijonoaika ISO8601-jousitukseksi tai muuntaa merkkijono.UDUNITSkuin aikayksiköt, jotka törmäävät oikeaanUDUNITSaikayksikköjä. Tämän pitäisi olla myös hyödyllistäERDDAP™Hallinnoijat, joiden on tiedettävä, mitä muotoa määrittää "yksiköt" ominaisuus merkkijonon aika muuttujia. Tätä käyttävät myös GenerateDatasetsXml ja EDDTableFromFiles. Kiitos Bob Simonsista.
         
    * Uusi: The[Konvertteriyksikkö](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)Uusi "Standardize UDUnits" -vaihtoehto.
Esimerkiksi "deg \\ c/m" ja "degrees \\c meters-1" muutetaan molemmiksi.
"Kohde m-1" Tätä ominaisuutta käytetään myös standardisoimalla EDDTableFromFiles. Kiitos Bob Simonsista.
         
    * Lähde: For grafiikka (Muut kuin pintakuvia) Griddapin jatabledapKun x-akseli ei ole aika-akseli, jos vain x-akselin vaihteluvälin osa on näkyvissä, on nyt graafin yläpuolella painikkeita, jotka siirtävät X-akselin vasemmalle tai oikealle. Kiitos Carrie Wall Bell -hankkeesta.
         
    * NEW: Kuvakaavioissa X- ja/tai Y-akselit voivat nyt käyttää Log-asteikkoa.
Käyttäjät voivat kontrolloida Y Axis -asteikkoa uudella pudotuslevyllä verkkoon jatabledapTee graafiset sivut. Nähdään[.xRange ja YRANG-dokumentointi](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange). Kiitos Carrie Wall Bell -hankkeesta.
         
    * Improvisoitu:ERDDAP™Hyödynnä useita HTTP-virhekoodeja ja palauta nyt(OPeN)DAPV2.0-muotoinen virheilmoitus. Näytä[yksityiskohdat](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors). Kiitos Antoine Queric ja Aurelie Briand.
         
    * IMPROVED: Älä käytä Netcdf-java/c- tai muita ohjelmistotyökaluja yhteyden muodostamiseen.nctai tai.hdftiedostot, joita palveleeERDDAPtiedostot / järjestelmä kuin ne olisivat paikallisia tiedostoja.ERDDAP™Nyt nämä pyynnöt hylätään. Se on erittäin tehoton ja aiheuttaa usein muita ongelmia. Sen sijaan:
        
        * Käytä(OPeN)DAPAsiakasohjelmisto yhdistääERDDAP&gt;DAPDatan palvelut (joka on/griddap/tabledapURL:ssä) . Se on mitäDAPSe on ja tekee niin hyvin.
        * Tai käytä tietoaineiston Data Access -lomaketta pyytääksesi tietojen alijoukkoa.
        * Jos tarvitset koko tiedoston tai toistuvan pääsyn pitkiin aikoihin,curl,wget, tai selaimesi ladata koko tiedoston, sitten käyttää tietoja paikallisesta tiedoston kopiosta.
        
          
         
    * Huomautus: On theERDDAP™Full Text Search on nyt enemmän kuin "View a List of All Datasets", koska se on paras lähtökohta useimmille käyttäjille. Kiitos Didier Mallarino ja Maurice Libes.
         
    * Lähde: DataProviderForm3.html Luettelot yleisistästandard\\_names. Kiitos IOOS DMAC -kokouksesta.
         
    * IMPROVED: /files / web-sivuilla on nyt linkki uuteen "Mitä voin tehdä näillä tiedostoilla?" -osiossa /tiedostot / dokumentaatio. Tässä osassa kuvataan erilaisia tiedostotyyppejä ja annetaan ehdotuksia, miten työskennellä niiden kanssa. Kiitos Maurice Libesille.
         
    * IMPROVED: Lähes kaikki pyynnötERDDAP™Pitäisi olla hieman nopeampi ja joskus paljon nopeampi.
         
    * Viisikymppinen: Joissakin tilanteissa, kun EDDTable-tietoaineisto tallentaa tietoja tietyntyyppisissä.nctiedostot, maailmanlaajuinen "id" attribuutti asetettiin tiedoston ehdotettuun nimeen, johon sisältyy hash, joka tekee siitä ainutlaatuisen pyynnön. Nyt "id" jää muuttumattomaksi (jos määritellään) tai asetettu aineistondatasetID  (Jos ei ole määritelty) . Kiitos John Maurerille.
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:**   
     
    * TO DO: Vapautuminen vie aikaa ja työtä sinulta. Ole kärsivällinen ja suunnittele muutaman tunnin aikaa tarvittavien muutosten tekemiseen ja muutaman tunnin kokeilemiseen.
         
    * TO DO: Turvallisuuden vuoksi tee varmuuskopio nykyisestä asennuksesta.xml jadatasets.xmltiedostot, jotta voit palauttaa ne epätodennäköisessä tapauksessa, jossa sinun on palattavaERDDAP™v1.82.
         
    * Tehtävä: SuositeltuJavaAdoptOpenJDK:n OpenJDK 8 8 8 (LTS) + HotSpot.
Tämä on avoimen lähdekoodin varianttiJavaSillä ei ole rajoituksia sen käyttöön. (Toisin kuinOracle&gt;JavaJakelu jakautuu) . Se on peräisinOracle&gt;Javajatkuvalla tavalla,Oraclesiunausta. Turvallisuussyistä on tärkeää pitääJavaPäivitetty versio. NäytäERDDAP&gt;[JavaAsennusohjeet](/docs/server-admin/deploy-install#java).
         
    * Pääartikkeli: AdoptOpenJDKJavaTarvitset pienen lisäyksen Tomcat-asennukseen:[Resursseja kätkön ohjeita](/docs/server-admin/deploy-install#contentxml). Tämä on korvaava versio -XX: MaxPermSize-asetuksesta. (Adoptoi) OpenJDK ei enää tue.
         
    * TO DO: Uusi oletus ja suosittele&lt;FontFamily&gt; asennus.xml
DejaVu Sans, joka on rakennettu AdoptOpenJDKJava. Nähdään
        [Tarkistetut fontin asennusohjeet](/docs/server-admin/deploy-install#fonts).
         
    * TO DO: Monet merkit siirtyvät asennuksesta.xmldatasets.xml. Etu on, että voit muuttaa arvojasiERDDAP™juokseminen, aloittamattaERDDAP. Voit helposti muuttaa&lt;StarBodyHtml5&gt; tilapäisen viestin näyttäminenERDDAP™Kotisivu (Esim. ”Tutki JPL MUR SST v4.1 -tietoaineistoa” tai ”Tämä”ERDDAP™tulee olemaan offline kunnossapidon 2019-05-08T17:00 PDT kautta 2019-05-08T20:00 PDT.) . Jos/kun vaihdat näitä sivujadatasets.xmlMuutokset tulevat voimaan seuraavalla kerrallaERDDAP™Lukeminendatasets.xml.
         
        
        1. Kopioi tämä sisältö omaksidatasets.xmltiedosto (jossakin lähellä tiedoston alkua)&lt;erdapdatasets &gt;
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

        2. Yksi kerrallaan, kopioi arvo (Jos) kunkin näistä tunnisteista setup.xml-tiedostosta uuteen tunnisteeseen, jonka olet juuri liittänyt (yläpuolella) Sisällädatasets.xml. Jos olet esimerkiksi käyttänyt 30-arvoa&lt;Cacheminutes » asennus.xml, sinun pitäisi kopioida tämä arvo uuteen&lt;CacheMinutes &gt; Tag indatasets.xml  (Vaikka arvo on sama kuin uusi oletusarvo, on parasta jättää merkintädatasets.xmlBlank) .
            
Jos arvosi on erilainen kuin uusi ehdotettu oletus (muut kuin&lt;StarBodyHtml5&gt; ja&lt;ShortDescriptionHtml, joka on hyödyllinen mukauttamaanERDDAP™Ole hyvä ja harkitse siirtymistä uusiin oletusarvoihin. Tämä koskee erityisesti&lt;osittaispyynnöt &gt; ja&lt;osittainen RequestMaxCells &gt;, jossa oletusarvo on muuttunut merkittävästi vuosien varrella.
            
Kun kopioit jokaisen arvon, poista tag ja sen kuvaus asennus.xml. On parempi, että nämä tagit ovatdatasets.xml. Nyt on parempia kuvauksia[Asennukset: DatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file).
            
        
Uuden järjestelmän omituisuus on se, että ensimmäinen sivu, kun aloitatERDDAPTulee olemaan oletusERDDAP™Web-sivu. Jokaisella myöhemmällä verkkosivustolla käytetään ...Html-sisältöä, jonka määritätdatasets.xml.
        
    * Varoitus: ensimmäinen kerta, kun juoksetERDDAP™V2.0, paikalliseen datatiedostoon perustuvat tietoaineistot latautuvat **erittäin** hitaasti, koskaERDDAP™Tiedostojen tietokanta on luotava uudelleen hieman eri muodossa. Alkuvaiheen jälkeen ne kuormitetaan nopeasti, kuten ennenkin. Ole kärsivällinen.
         
#### EdDTableFromHttpGet{#eddtablefromhttpget} 
    *   [EddtableFromHttpGet: EDDTable](#eddtablefromhttpget)  
tähän asti,ERDDAP™Lue vain tietoja ja aseta ne käyttäjille. Nyt,ERDDAP™on yksinkertainen ja tehokas järjestelmä reaaliaikaisen datan hyödyntämiseen. Muiden ominaisuuksien joukossa tämä tietoaineisto tarjoaa hienosäädetyn version: se muistaa kaikki tietoaineistoon tehdyt muutokset, kun se on tehty ja kenen kautta. Yleensä käyttäjät haluavat vain uusimman version tietoaineistosta, kaikki muutokset. Käyttäjien on kuitenkin mahdollista pyytää tietoja tietoaineistosta koska tahansa. Tämä helpottaa lisääntyvää tiedettä. Toisin kuin useimmat muut lähes reaaliaikaiset tietoaineistot, nämä aineistot ovat oikeutettuja[DOIs](https://en.wikipedia.org/wiki/Digital_object_identifier). Koska he tapaavatDOIvaatimus siitä, että tietoaineisto on muuttumaton, paitsi aggregointi. Näytä[EdDTableFromHttpGet](/docs/server-admin/datasets#eddtablefromhttpget). Kiitos OI (kauan sitten ja nyt) Eugene Burgerin ja Eugene Burgerin on kerrottava, mikä on tärkeää.
         
    * Uudet taidot:ERDDAP™voi nyt palvella tietoja suoraan ulkopuolisista tietotiedostoista, mukaan lukien.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2.Z. Datasetit voivat sisältää sekoitus ulkoisesti pakattuja tiedostoja. (Ehkä vanhemmat tiedostot?) ja ulkoisesti painamattomat tiedostot, ja voit pakata / purkaa tiedoston milloin tahansa.
        
Tämä toimii loistavasti&#33;
Useimmissa tapauksissa tiedostojen purkamiseen liittyvä hidastuminen on vähäistä. Kehotamme sinua kokeilemaan tätä, erityisesti tietoaineistojen ja/tai tietotiedostojen osalta, joita käytetään harvoin.
        
Tämä voi säästää 30 000 tai enemmän&#33;
Tämä on yksi harvoistaERDDAP™ominaisuuksia, jotka voivat tallentaa paljon rahaa - jos pakkaat paljon datatiedostoja, tarvitset paljon vähemmän RAID-/kovia asemia tietojen tallentamiseen tai päinvastoin, voit palvella paljon enemmän tietoja. (enintään 10x) RAIDS, joita sinulla jo on. Jos tämä ominaisuus pelastaa sinut ostamasta uutta RAIDia, se on säästänyt sinut noin 30 000 dollaria.
        
Nähdään[Ulkoisesti painetut tiedostot](/docs/server-admin/datasets#externally-compressed-files). Kiitos Benoit Perrimond ja Paloma de la Vallee.
        
    * Uudet taidot: Kaikki Kaikki Kaikki KaikkiEDDGridFiles ja kaikki EDDTableFromFiles-tietoaineistot tukevat&lt;CacheFromUrl &gt; tagi ja&lt;CacheSizeGB&gt; Tag. Jos CacheSizeGB ei ole määritelty, tämä lataa ja ylläpitää täydellistä kopiota etätietoaineiston tiedostoista. Jos cacheSizeGB on määritelty ja on &gt; 0, tämä lataa tiedostoja etätietoaineistosta tarvittaessa paikalliseen välimuistiin, jossa on rajoitettu koko, joka on hyödyllinen pilvipohjaisen tiedon kanssa. (Esimerkkinä S3) tiedostoja. Nähdään[Cash Url dokumentointi](/docs/server-admin/datasets#cachefromurl)yksityiskohtiin. Kirjoittanut Bob Simons ja Roy Mendelsohn (jotka ovat vuosia kirjoittaneet käsikirjoituksia käsittelemään paikallisia kopioita etätiedostoista) Lloyd Cotten, Eugene Burger, Conor Delaney (Hän oli Amazon Web Servicesissä.) Google Cloud Platform.
         
    * Uusi EDDTableFromJsonlCSV Luokka voi lukea tabulaarista dataa
        [JSON CSV-tiedostot](https://jsonlines.org/examples/)  ("Parempi kuin CSV") . Kiitos Irlannin meriinstituutin asukkaille siitä, että kerron tästä ja Eugene Burgerille ja PMEL:lle pyynnöstä tukea sitä syöttötyyppinä.
         
    * Uusi: KaikkiEDDGridKaikki EDDTableFromFiles-tiedot tukevat&lt;nThreads&gt; asetelma, joka kertooERDDAP™kuinka monta lankaa käytetään, kun vastaat pyyntöön. Nähdään[nThreads dokumentointi](/docs/server-admin/datasets#nthreads)yksityiskohtiin. Kiitos Rob Bochenek Axiom Data Science, Eugene Burger, Conor Delaney (Hän oli Amazon Web Servicesissä.) Google Cloud Platform.
         
    * Uusi standardointi Mikä on EDDTableFromFiles-aliluokka -
Aiemmin, jos tietylle muuttujalle, tärkeiden ominaisuuksien arvot (esim.scale\\_factor,add\\_offset,missing\\_value, \\ \\ \\ \\ n arvo, yksiköt) ei ollut johdonmukainen, EDDTableFromFiles valitsi yhden arvon kullekin attribuutille "kelvolliseksi" ja merkitsi tiedostoja muilla attribuuttiarvoilla "Bad Files". Nyt on olemassa järjestelmä, joka standardoi tiedostot heti, kun EDDTableFromFiles lukee tiedostoja. Näytä[EDDTableFromFilen standardointi Mitä](/docs/server-admin/datasets#standardizewhat). YksiERDDAPPäätavoitteena on tehdä datatiedostoista ja tietoaineistoista johdonmukaisia. Standardisointi Mikä on uusi työkalu, joka tekee tästä todellisuuden? Kirjoittanut Marco Alba, Margaret O'Brien (Muut EML-käyttäjät) BCO-DMO ja InPort-käyttäjät.
         
    * NEW EDDTableFromInvalidCRAFiles mahdollistaa tietoaineiston keräämisenNetCDF  (V3 tai v4)  .nctiedostot, jotka käyttävät CF DSG Contiguous Ragged Array -versiota (CRA) tiedostoja. Näytetiedostot tälle tietoaineistotyypille löytyvät https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Tämä palvelin ei ole nyt luotettava\\]. Vaikka vaikkaERDDAP™tukee tätä tiedostotyyppiä, se on mitätön tiedostotyyppi, jota kenenkään ei pitäisi aloittaa. Ryhmiä, jotka käyttävät tätä tiedostotyyppiä, kannustetaan voimakkaasti käyttämäänERDDAP™luoda kelvollisia CF DSG CRA -tiedostoja ja lopettaa näiden tiedostojen käyttö. Kiitos Ajay Krishnan ja Tim Boyer.
         
    * EDDTableFromThreddsFiles ja EDDTableFromHyraxTiedostot on nyt poistettu. Siirry EDDTableFromNcFilesiin (tai variantti) plus&lt;CacheFromUrl. Jos tämä ei toimi jostain syystä, sähköpostierd.data at noaa.gov. Jos valituksia ei ole ennen vuotta 2020, nämä tiedot voidaan poistaa.
         
    * Improvisoitu - Järjestelmä, joka muuntaa ei-ISO 8601 -ajat automaattisesti ISO 8601 -ajoiksi (Käytössä v1.82) Sitä on laajennettu suureksi määräksi lisäformaatteja. Tämä koskee GenerateDatasetsXml jaERDDAPLähteen metatietojen käsittely.
         
    * Improvisoitu - Kolmannella merkittävällä tarkistuksella String Time -järjestelmästä (Toivottavasti viimeinen) ,ERDDAP™Ei enää käytäJavaDateTimeFormatter, koska vikoja, jotka joskus vaikuttavat äärimmäisiin aikoihin&lt;=00).ERDDAP™Nyt hän käyttää omaa järjestelmäänsä aikajonojen puhdistamiseen.
         
    * VAROITUS: Uusi String-aikapyrsytysjärjestelmä on hieman tiukempi. Jos jollakin aineistostasi on yhtäkkiä puuttuvia arvoja aika-arvoihin, syynä on lähes varmasti se, että aikamuoto on hieman väärä. Virheviestejä pitäisi olla lokissa. txt, joka liittyy aika-arvoihin, jotka eivät vastanneet aikamuotoa - joiden avulla voit korjata kyseisen tietoaineiston aikamuodon. Jos tarvitset apua, käytä vaihtoehtoaERDDAPTime Converter, joka ”Muokkaa”\\[s\\]mikä tahansa yhteinen merkkijonoaika ISO 8601 -merkkijonoaikaan, se ilmaisee muotoa, jota muuntaja käytti lähdejonon pakkaamiseen.
         
    * Nopein, helpoin ja halvin tapa nopeuttaaERDDAP"Tabular-tietojen käyttö on tietotiedostojen laittaminen Solid State Driveen" (SSD) . Useimmat tabulaariset tietoaineistot ovat suhteellisen pieniä, joten 1 tai 2 TB SSD on todennäköisesti riittävä pitämään kaikki tietotiedostot kaikkien tabulaaritietojen. SSD:n käyttö loppujen lopuksi kuluu, jos kirjoitat tietoja soluun, poistat sen ja kirjoitat uusia tietoja soluun liian monta kertaa. Sen sijaan suosittelen, että (mahdollisimman paljon) Käytät SSD-tiedostoa vain kerran ja luet sen monta kertaa. Kuluttajatason SSD:n pitäisi kestää pitkään, todennäköisesti paljon pidempään kuin minkään Hard Disk Driven. (HDD) . Kuluttajan SSD on nyt halpa (Vuonna 2018 ~ 200 1 TB tai ~ 400 2 TB) Hinnat laskevat edelleen nopeasti. MilloinERDDAP™tiedoston käyttö, SSD tarjoaa molemmat
        
        * Lyhyempi latenssi (~0,1ms, versus ~3ms HDD, vs. ~10 (??) ms for a RAID, versus ~55ms for Amazon S3) ja
        * korkeampi läpimeno (~500 MB/S, versus ~75 MB/s HDD versus ~500 MB/s RAID) .
        
Näin voit nousta ~10X-suorituskykyyn (vs. HDD) 200€&#33; Verrattuna muihin mahdollisiin muutoksiin järjestelmässäsi (Uusi palvelin 10 000 eurolla? Uusi RAID 35 000 eurolla? Uusi verkko vaihtuu 5000 euroon? jne.) Tämä on ehdottomasti paras palautus sijoituksille. (ROI) . Jos palvelintasi ei ladata muistilla, palvelimesi lisämuisti on myös erinomainen ja suhteellisen edullinen tapa nopeuttaa kaikkia näkökohtia.ERDDAP.
        \\[SSD olisi hyvä myös verkkotietojen, mutta useimmat verkottunut tietoaineistot ovat paljon suurempia, mikä tekee SSD erittäin kallista.\\]  
         
    * Uusi: Jokainen, joka on kirjautunut sisään, saa roolin\\[Kuka tahansa Sisällä\\]vaikka ei olisikaan&lt;Käyttäjä &gt; Tag for them indatasets.xml. Jos määrität tietoaineiston&lt;Käytettävyys &gt;\\[Kuka tahansa Sisällä\\]Kuka tahansa, joka on kirjautunut sisäänERDDAP™  (esimerkiksi Gmailin tai Orcid-tilin kautta) valtuutetaan käyttämään tietoaineistoa, vaikka et ole määrittänyt a&lt;Käyttäjä &gt; Tag for them indatasets.xml. Kiitos Maurice Libesille.
         
    * Lähde: TheUDUNITSUCUM-yksiköiden konvertointia parannettiin huomattavasti.
Se käsittelee kyvyttömiä yksiköitä paremmin (Tietojen säilyttämistä painotetaan sen sijaan, että pätevyys pannaan täytäntöön) . Tuloksilla on nyt standardoitu syntaksi.
         
    * Uusi: TheUDUNITSUCUM-yksikön muuntimella on uusi mahdollisuus standardoidaUDUNITSstring.
Tämä toimii hyvin pätevästiUDUNITSmerkkijonot ja kohtuullisen hyvin epänormaalille / mitättömälleUDUNITSstrings. Esimerkiksi esimerkiksiUDUNITS= "mittarit sekunnissa", "mittari""m.s^-1"ja"m s-1"Kaikki palaavat "m.s-1". Tätä tarvitaan uuteen standardointiin Mitä edellä kuvattua järjestelmää. Kirjoittanut Marco Alba, Margaret O'Brien (Muut EML-käyttäjät) BCO-DMO ja InPort-käyttäjät.
         
    * EDDTableFromMultidimNcFilesillä on nyt[ulottuvuuksia](/docs/server-admin/datasets#treatdimensionsas)Vaihtoehto, joka kertooERDDAP™tietyt ulottuvuudet (Esimerkki: LAT ja LON) Ikään kuin ne olisivat muita ulottuvuuksia. (Esim. aika) . Tämä on hyödyllistä joissakin väärissä tiedostoissa, jotka käyttävät eri ulottuvuuksia eri muuttujat, kun niiden olisi pitänyt käyttää vain yhtä ulottuvuutta. (Esim. aika) . Kiitos Marco Alba ja Maurice Libes.
         
    * Uusi: Nyt kaikkiEDDGridFiles-aineistot tukevat uutta akseliasourceNamejoka kertooERDDAP™Tietojen ottaminen tiedoston nimestä (tiedostonimi.ext) käyttää arvoa **korvaa korvaava** vasemman akselin arvo. Formaatti on
        \\*\\** korvaaFromFileName,_dataType_,_extractRegex_,_captureGroupNumber_.
Näytä[Tämä dokumentti](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Kiitos tästäNOAAPathfinder Daily Aggregation -tietokanta.
         
    * Uusi: Nyt kaikkiEDDGridFiles-aineistot tukevat uutta akseliasourceNamejoka kertooERDDAP™Tietojen ottaminen tiedoston nimellä (Hakemistot + tiedostonimi.ext)   
        \\*\\*PathName,_dataType_,_extractRegex_,_captureGroupNumber_
Tämä tarkoittaa sitä, että tien nimi käyttää aina'/'Hakemiston erottaja, ei koskaan ".
Näytä[Tämä dokumentti](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Kiitos Paloma de la Vallee.
         
    * NEW: Nyt kaikki EDDTableFrom Tiedostot tukevat pseudo-muuttujaasourceNames, joka poistaa tiedot tiedoston tiedoston nimi (tiedostonimi.ext)   (Katso nähkää[\\*\\**filename](/docs/server-admin/datasets#filename-sourcenames)) tai koko tiedoston nimi (dir1/dir2/filename.ext)   (Katso nähkää[\\*\\*PathName](/docs/server-admin/datasets#pathname-sourcenames)) . Kiitos Paloma de la Vallee.
         
    * Uusi: JosEDDGridaineistolla on yksi tai useampi suuri ulottuvuus (Esimerkiksi miljoonat arvot) joka ottaa paljon muistia, voit luoda uuden.&lt;ArvotMemory » (Docs/server-admin/datasets#dimensionvaluesinmemory) Asetukset väärään (Oletus on totta) , joka aiheuttaa aineiston tallentaa arvot levylle ja hakea ne tarvittaessa. David Rodriguez ja Rich Signell (Re:EDDGridAudiofiilejä) .
         
    * Aiemmin, jos tilasitdataVariables EDDTableFromFiles-tietokantaan ja latasi tietoaineiston uudelleen, EDDTableFromFiles lukee kaikki tietotiedostot uudelleen. Nyt se voi käsitellä tilauksen lukematta kaikkia tiedostoja. Kiitos Roland Schweitzerille.
         
    * Improvisoitu: nyt, kunERDDAP™Lue ASCII, NCCSV ja JSON Lines CSV -tabulaaritiedostot, jos se löytää virheen tietyllä linjalla. (esimerkiksi virheellinen määrä) Se viestittää varoitusviestin ("Varoitus: Skipping line #" odottamaton määrä esineitä.) ja[log.txt-tiedosto](/docs/server-admin/additional-information#log)Jatka lukemista loput tiedostosta. Siksi sinun vastuullasi on katsoa säännöllisesti. (Kirjoita käsikirjoitus tehdäksesi niin) tuota viestiä logissa. txt, jotta voit korjata ongelmat tiedostoissa.ERDDAP™Näin käyttäjät voivat jatkaa kaikkien saatavilla olevien pätevien tietojen lukemista, vaikka joissakin tiedostojen riveissä on virheitä. aikaisemmin,ERDDAP™merkitsi tiedoston "huonoksi" ja poisti sen aineistosta.
         
    * HUOMAUTUS: Kun tarkat ajat (lähimpään toiseen tai millisekuntiin) Lähteessä on varastoitu ”minuutteja siitä lähtien” (suuremmat yksiköt) ,ERDDAP™Nyt ne pyöristetään lähimpään millisekuntiin lukemassa arvoja.ERDDAP. Muussa tapauksessa kelluvan pisteen numerot ovat mustelmia ja pyynnöt tiedoista tiettyinä aikoina. (esim. &time=2018-06-15T01:30:00) epäonnistuu. Aiemmin ne laskettiin mahdollisimman tarkasti. (Ja silti tekee, jos yksiköt ovat esim. "toiset sitten ..." tai "millisekunnit sitten ...") . On parasta välttää tätä ongelmaa käyttämällä isoja yksiköitä. (esimerkiksi minuutit tai tunnit) Tarkkojen aika-arvojen tallentaminen (Esimerkiksi mikrosekunnit) Tietokoneet tekevät huonoa työtä desimaalien käsittelyssä. Kiitos Marco Alballe.
         
    * Muutoksia EDDTableFromEDDGridjoka tekee siitä paljon paremman. EDDTableFromEDDGridKäyttäjät voivat kysellä verkkotietoaineistoja ikään kuin ne olisivat tabulaarisia tietoaineistoja. ("Kysymys arvosta") .
        
        * Nyt se tukee a&lt;MaxAxis0 &gt; Tag (Oletusarvo = 10) joka määrittää akselin enimmäismäärän\\[0\\]  (Yleensä yleensä"time") arvoja, joita voi kysellä heti. Tämä estää naiivit pyynnöt saada EDDTableFromEDDGridhaku koko verkkotietoaineiston kautta (joka epäonnistuisi aikalisävirheellä) .
        * GenerateDatasets XML:llä on nyt mahdollisuus luoda EDDTableFromEDDGridTiedot kaikista verkkotietokannoista tietyssäERDDAP™jotka vastaavat tiettyä regexiä (käyttää .* vastaamaan kaikkia tietoaineistoja) . Sen luomilla tietoaineistoilla on lisätietoja tiivistelmän ominaisuuksista, jotka osoittavat, että tämä on tabulaarinen versio verkkotietokannasta. ja heidändatasetIDondatasetIDverkostoitunut tietoaineisto, plus "AsATable".
        * Yleisimmän asennuksen nopeus on suuri: kun verkkotietokanta onEDDGridTietokanta, joka on samassaERDDAP.
        
Kiitos James Gallagher ja Ed Armstrong.
         
    * UUTUS: Tuote Dataa Xml kaikentyyppisille aineistoille on nyt paljon todennäköisempää lisätä tiedostoarvo taimissing\\_valueNumeerinen muuttujaaddAttributes. Tämä tapahtuu esimerkiksi silloin, kun merkkijono puuttuu (Esim. "", ", "?", "NA", "nd", "NaN") tiedoston muuttuja muunnetaanERDDAP"Kadonneet arvot (127 sivusarakkeessa, 32767 lyhyissä sarakkeissa, 2147483647 int sarakkeet, 9223372036854775807 pitkissä sarakkeissa ja NaN kelluvissa ja kaksoismuuttujassa) . Se esiintyy myös NaN-arvoissa kelluvissa ja kaksoismuuttujassa. Lisäksi "nd" lisättiin luetteloon yhteisistä puuttuvista arvomerkeistä numeerisissa sarakkeissa.ERDDAP™Pitäisi etsiä. Kiitos Matt Biddle of BCO-DMO:sta.
         
    * IMPROVED: Ncdump-vaihtoehto Dataa Xml on enemmän kuin Ncdump (ncdumpin netcdf-java-versio) . Nyt se julkaisee uuden listan vaihtoehtoja. Nyt,.ncml-tiedostot, se tulostaa ncdump-tulostuksen tulosta.ncml-tiedostojen muutokset, joita sovelletaan taustalla olevaan.nctai tai.hdftiedosto.
         
    * Viisikymppinen: Siellä oli tiedoston kahvavuoto (lopulta aiheuttaaERDDAP™Jäädytä) .geotif syntyi, kun luotiin tietyntyyppisiä lähtötiedostoja, esimerkiksi .geotif, erityisesti silloin, kun virheitä esiintyi luomisen aikana. Uskon/toivottavasti tämä kaikki on nyt korjattu. Jos näet ongelmia, kerro minulle, minkä tyyppisiä tietoja (Verkko tai pöytä) tiedostotyyppi, joka aiheuttaa ongelman. Kiitos Steven Beale, Lynn DeWitt, Jibei Zhao ja muut.
         
    * Vinkki: TheWMS LeafletDemo ei muuttanut "syvyyttä" akselia täysin tai oikein "parannukseksi". Näin on, ja rikkoutuneet legendat ovat valmiita. Myös kaikki akselivaihtoehdot pudotus-listalla ovat aina ylöspäin lajiteltuja. Kiitos Antoine Queric ja Aurelie Briand.
         
    * BUG FIX: EDDTableFromFiles tukee nyt oikein String-muuttujat, jotka on luotu hyväntekeväisyydestä tietotiedostoissa. Kiitos Antoine Queric ja Aurelie Briand.
         
    * Viisikymppinen: Kun tietoaineistoa ei ole saatavilla, tietoaineisto yrittää ilmoittaa siitä. (Viestin otsikko: ”Tätä dataa ei tällä hetkellä ole saatavilla.”) sen tilaajat, listatut toimet, rss ja lonPM180 tietoaineistot, jotka luottavat siihen. Kiitos Roy Mendelssohnille ja Bob Simonsille.
         
    * Viisikymppinen: Kaksi vikaa liittyy EDDTableCopy. Kiitos Sam McClatchie.
         
    * IMPROVED: Tila.html-sivulla esitettyjen epäonnistuneiden pyyntöjen määrä kasvaa, koska enemmän asioita lasketaan epäonnistumisiksi kuin aiemmin.
         
    * Improvisoitu:ERDDAPTila.html näyttää nyt pyynnöt (Median aika ms) "Aikasarjassa. Aiemmin se osoitti mediaani-aikoja, jotka olivat täynnä sekuntia.
         
    * IMPROVED: Jsonld-tuotannossa jsonld-nimi tulee nyt tietoaineistosta."title"SisälläERDDAPjsonld "headline" on nyt peräisin aineiston "datasetID&gt; SisälläERDDAP. Aiemmin se on käännetty. Tämä tuntuu väärältä, koska tavallisessa englannin kielessä nimi on yleensä lyhyt. (Ihanteellinen) Ainutlaatuinen tunniste, joka harvoin muuttuu (Kirjoittanut Robert Middlename Simons) Ei kuvaus, joka ei ole ainutlaatuinen ja joka voi helposti ja usein muuttua. (Esimerkki: "Mies, joka kirjoittaa ohjelmistojaNOAAVs. ”Hyvä mies, joka kirjoittaa ohjelmistojaNOAA""") . Olisi hienoa, jos schema.org määritettäisiin.[Nimen nimi](https://schema.org/name)Tietoaineiston yhteydessä oli tarkempi. Ohjelmistokehittäjien olisi voitava kirjoittaa eritelmän toteuttaminen, joka perustuu pelkästään spesifikaatioon, ilman asiantuntijoiden ohjeita. Minä jätän Googlen (Erityisesti Natasha No) NCEI (John Relph) Rob Fuller.
         
    * IMPROVED: Jsonld-tuloksessa neljä "SpatialCoverage GeoShape -laatikkoa" ovat nyt minLat minLon maxLon. Aiemmin lat- ja lon-asennot käännettiin. Olisi hienoa, jos schema.org määritettäisiin.[GeoShape](https://schema.org/GeoShape)määrittää oikean järjestyksen. Ohjelmistokehittäjien olisi voitava kirjoittaa eritelmän toteuttaminen, joka perustuu pelkästään spesifikaatioon, ilman asiantuntijoiden ohjeita. Kiitos Natasha Noy ja Rob Fuller.

## Versio 1.82{#version-182} 
 (2018-01-26) 

*    **Uudet ominaisuudet (Käyttäjille) :**   
     
    * Lukuisia hienovaraisia muutoksia ulkonäköön ja tunnelmaanERDDAP™verkkosivut.
        * Improvisoitu:ERDDAP™Käytä HTML 5:tä ja käytä CSS:ää paremmin.
        * IMPROVED: Verkkosivuja on hieman muutettu, jotta ne olisivat puhtaampia ja vähemmän kiireisiä. (Ne ovat edelleen tiheitä ja on vielä asioita, joista voi valittaa, mutta toivottavasti vähemmän kuin ennen.) Kiitos John Kerfootille kommenteista.
        * Verkkosivut näyttävät nyt paljon paremmilta matkapuhelimissa ja muissa pienissä laitteissa, varsinkin jos niitä käytetään maisemaohjauksessa. Ne näyttävät myös paremmilta hyvin pienissä ja hyvin suurissa ikkunoissa työpöydän selaimissa.
        * IMPROVED: Turvallisuuden ja muiden syiden parantamiseksi päivittäisten Openlayers-versioiden käyttöWMSMielenosoitukset on korvattuLeaflet.
        * NEW: Tuki kuva-, ääni- ja videotiedostojen esikatseluihin"files"Järjestelmäjärjestelmä (esimerkiksi[Tämä testiaineisto](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/)) ja sisällä.htmlTablevastaukset, kun solussa on kuvan, ääni- tai videotiedoston URL (esimerkiksi[Tämä pyyntö](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22)) . Jos hyppäät "? ikonin yli, sinun pitäisi nähdä kuva, ääni tai videotiedoston esikatselu. Voit myös napsauttaa tiedostolinkkiä nähdäksesi koko tiedoston selaimessasi. Nähdään[Mediatiedostojen dokumentointi](/docs/server-admin/datasets#media-files). Huomaa, että eri selaimet tukevat erilaisia tiedostotyyppejä, joten esimerkit eivät välttämättä toimi selaimessasi.
Näiden henkilöiden/linkkien ansiosta ideoita ja näytekoodia vain CSS-kuvatyökaluille (oli https://codepen.io/electricalbah/pen/eJRLVd ) lykätty kuvan lataus (oli https://varvy.com/pagespeed/defer-images.html )   (koodia on muutettu ennen käyttöäERDDAP) .
Kiitos Cara Wilsonille, Matthew Austinille ja Adam Shepherdille / BCO-DMO:lle kuvien tueksi.
Jim Potemran, Rich Signellin, OOI:n ja Carrie Wall Bellin ansiosta ääni- ja hydrofonitiedostojen tukipyyntöihin.
Kiitos OOI:lle videon tuen tarpeesta.
        * UUSI: Tietojen alijoukko mistä tahansaERDDAP™Data (Yleensä audiotiedostojen aineisto) Voidaan tallentaa .wav-äänitiedostoon. ([dokumentointi](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav)) Jim Potemran, Rich Signellin, OOI:n ja Carrie Wall Bellin ansiosta ääni- ja hydrofonitiedostojen tukipyyntöihin.
        * IMPROVED: Web Accessible -kansioiden muoto (Vauva)   (Esimerkkejä / Files / Folders) on päivitetty käyttämään HTML-taulukkoa. Uusi formaatti jäljittelee hakemistoluettelosivujen uusimman version Apachesta. Ihminen huomaa, että muutokset helpottavat tiedon lukemista. Ohjelmistot, jotka täydentävät näitä dokumentteja (Ohjelmisto, joka korjaa ISO 19115 -dokumenttejaERDDAP) Tarkistetaan, mutta uusi muoto on helpompi laatia kuin aiempi. (Huomio, Anna Milan.) 
        * UusiaoutOfDateDatasets.htmlSivu. ([esimerkki esimerkki esimerkki esimerkki](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) Tämä sivusto näyttää taulukon, jossa on kaikki lähes reaaliaikaiset tietoaineistot, joilla on&lt;testOutOfDate&gt; Tag (Katso alapuolelta) luokitellaan, miten ajantasaiset tietoaineistot ovat. Tämä kojelauta on hyödyllinenERDDAP™Järjestäjät ja loppukäyttäjät, kun he haluavat tietää, mitkä tietoaineistot ovat vanhentuneita. Out-of-Date-tietoaineistoissa on oletettavasti ongelma tietolähteen kanssa, jottaERDDAP™Tietoja ei voi havaita viimeaikaisista ajankohdista.
Hallinnoitsijat: Jos et halua Out-Of-Date Datasets -sivustoa, lisää se asetukseen.xml:
            &lt;OutDateDatasetsActive&gt; Väärä&lt;/OfDateDatasetsActive
Nyt ontestOutOfDateja ulos Päivän kolumnit sisälläallDatasetsDataa.
Kiitos Bob Simonsille, joka on halunnut tätä jo vuosia, sekä Irlannin Marine Instituten älykkäille ihmisille, jotka antoivat minulle inspiraation heidän omistautuneen Raspberry Pi -näyttönsä kautta, joka näyttää aina samanlaisen näytön toimistossaan.
        * Improvisoitu:.htmlTableja.xhtmlVastaus on nyt paremmin muotoiltu, kompaktimpi ja kuormitettu nopeammin. Kiitos HTML5 ja CSS.
    * NEW-lähtötiedostotyypin verkkotietoaineistoihin: .timeGaps. Siinä on luettelo aika-arvoista, jotka ovat suurempia kuin mediaanivaje. ([esimerkki esimerkki esimerkki esimerkki](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps)) Tästä on hyötyäERDDAP™Hallinnoitsijat ja loppukäyttäjät, kun he haluavat tietää, ovatko odottamattomat aukot tietoaineiston aika-arvoissa, joiden odotetaan olevan säännöllisesti ajanarvoja. Kiitos Bob Simons ja Roy Mendelssohn, jotka tarvitsivat tätä ominaisuutta.
    * IMPROVED: OletuskuvaallDatasetsDataset on nyt kartta, jossa on x=maxLon ja y=maxLat. Kiitos John Kerfoot, Rich Signell ja OOI-CI.
    * Uusi:[Erddapy](https://github.com/ioos/erddapy)- ei ole mikäänERDDAP™Ominaisuus, mutta kiinnostaa moniaERDDAP™käyttäjiä. Erddapy (ERDDAP™+Python) on APythonPhilipe Fernandesin kirjoittama kirjasto: "Ottaa hyödynERDDAP&gt;RESTfulVerkkopalvelut ja luoERDDAP™URL-osoite kaikista pyynnöistä, kuten tietojen etsimisestä, metatietojen hankkimisesta, tietojen lataamisesta jne. Kiitos Filipe Fernandes.
    * Olisi pitänyt mainita aiemmin: Kolmannen osapuolen R-paketti on suunniteltu helpottamaan työskentelyä.ERDDAP™Sisältä R:[Rerdap](https://github.com/ropensci/rerddap#rerddap). Kiitos[ROpenski](https://ropensci.org/)Kirjoittanut Roy Mendelssohn
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:**   
     
    * TO DO: In setup.xml, aivan alapuolella&lt;Lisätiedot &gt; Lisätään&lt;adminInstitutionUrl&gt;-tunnisteet, jotka määrittävät URL-osoitteen laitoksellesi (tai ryhmä) .
    * TO DO: Näitä 3-tunnisteita ei enää käytetä:
        &lt;Aloita alusta HeadHtml,&lt;BodyHtml &gt; ja&lt;endbodyhtml &gt; Ne korvataan
        &lt;HeadHtml5&gt;,&lt;StarBodyHtml5&gt; ja&lt;endBodyHtml5&gt;, jolla on viestien oletusarvot.xml (Näytetään alla) .
        
Suosittelemme käyttämään oletusarvoa&lt;HeadHtml5&gt; ja&lt;endbodyHtml5&gt;
Suosittelemme: jos teet muutoksia alkuperäiseen&lt;StarBodyHtml ja/tai haluat muokataERDDAP™Kopioi nyt uusi&lt;StarBodyHtml5&gt; Tag (alhaalta) asennukseen.xml ja muokata sitäERDDAP™niin ettäERDDAP"Verkkosivut heijastavat organisaatiotasi, eivätNOAA ERD. Ole hyvä ja vaihda organisaatiosi "Brought to You" (s) . Jos tarvitset apua, lähetä sähköpostiaerd.data at noaa.gov. (Jos et halua muokataERDDAP™Käytä nyt oletusarvoa&lt;Alkuperäinen nimi: BodyHtml5&gt;.)
        
Poista sitten 3 vanhaa tunnistetta asennuksessa.xml, jota ei enää käytetä.

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

On olemassa muita tapoja, joilla voit[MukautettuERDDAP™](/docs/server-admin/deploy-install#customize)niinERDDAPVerkkosivut heijastavat organisaatiotasi sen sijaan, ettäNOAA ERD.
        
    * Lähde: The&lt;EDDGridEsimerkki & tagit (alkuperällä)&lt;EDDGridEsimerkki & amp;) ja&lt;Eddtable... Esimerkki & tagit (alkuperä)&lt;EDDTableIdExample &gt;) asennuksessa.xml-tiedostoa käytetään luomaan esimerkkejä verkosta jatabledapdokumentointi. html-sivut omassaERDDAP.
        
Jos et mukauta näitä tunnisteita, poista ne asennus.xml-tiedostosta. Nyt kaikilla on oletusarvoja viestissä.xml, joka viittaa Bobin tietoaineistoihin.ERDDAP™at at https://coastwatch.pfeg.noaa.gov/erddap/index.html . Joten sinun ei tarvitse enää saada erityisiä tietojaERDDAP. Jos haluat ohittaa oletusarvot, kopioi joitain tai kaikkia näitä tunnisteita asetukseen.xml ja vaihda niiden arvoja.
Jos haluat, että esimerkit osoittavatERDDAP™Helpoin tapa on:
        
        1. Sisältää nämä kaksi aineistoa omassaERDDAP™Lisäämällä tämä sinundatasets.xml:
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Lisää tämä tunniste asennukseen.xml, mutta vaihda URL-osoiteERDDAP&gt; (https??) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Jos olet räätälöinyt nämä merkit, jätä ne sellaisenaan ja lisää nämä 2 uutta tunnistetta asetukseen.xml määrittääksesi ne.ERDDAP™URL-osoite näille tietoaineistoille, mutta vaihda URL-osoiteERDDAP&gt; (https??) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * Tee:ERDDAP™Käytä Css-tiedostoa nimeltä erdap2.css. Jos teet muutoksia\\[Tom\\]/webapps/erddap/images/erddap.css, harkitse samankaltaisia muutoksia kuin erddap2.css (Samassa hakemistossa) .
    * Uusi:ERDDAPVerkkosivuilla on nyt paljon näkymättömiä sisäisiä linkkejä. (Teksti on musta, ei korostettu.) . Jos ylität yhden näistä linkeistä (Yleensä otsikoiden ja kappaleiden ensimmäiset sanat) Kurittajasta tulee käsi. Jos napsautat linkkiä, URL on asiakirjan sisäinen linkki. Tämä helpottaa dokumentaation tiettyjä osia. Kiitos Bob Simonsille, joka on halunnut tämän jo vuosia.
    * Uusi:ERDDAP™Nyt tukee[Byte Range / Accept-Ranges (käytetty)](https://en.wikipedia.org/wiki/Byte_serving)tiedostojen/tiedostojen osia koskevat pyynnöt. Tätä tarvitaan tukemaan ääni- ja videokatsojia selaimissa.
    * TO DO: Parantaaksesi turvallisuutta, jos määrität&lt;BaseHttpsUrl&gt; in setup.xml (Näin tukeahttps) Suositeltu lippu Url on yksihttpsURL-osoite turvallisemmalla lipulla. Mikäli näin on, kaikki aiemmat lippulaivat tai lippulaivat ovat mitättömiä. Admins: Jos nämä muutokset koskevatERDDAP™ja jos sinunERDDAP™onEDDGridFromErddap ja EDDTable Erddap:n etäisyydetERDDAPSitten, kun päivitätERDDAPsinunERDDAP™Yrität automaattisesti tilata uuden lipun, joten sinun on poistettava vanhat tilaukset ja validoitava uudet tilaukset, kun saat uudet tilauksen validointisähköpostit.
    * Tehtävä: JosERDDAP™onEDDGridFromErddap-datavarat erdVH3-tietokannoille Bobin rannikollaERDDAP™Muuta niitä viitataksesi uusiin erdVH2018-aineistoihin.
    * TO DO: Jos sisällytät jplaquariusSS-näytetietoaineiston osioonERDDAP™Ole hyvä ja vaihda "V4"datasetID"V5"
    * Tee:actual\\_rangeCF-standardin määritelmä (CF-1,7) Sanotaan, että jos muuttuja käyttääadd\\_offsetja/taiscale\\_factorTietojen arvojen pakkaaminen, sittenactual\\_rangeArvojen on käytettävä pakkaamatonta tietotyyppiä ja oltava pakkaamattomia arvoja. Tämä on ristiriidassa aiempien neuvojemme kanssa. GenerateDatasets Xml on nyt pakattuactual\\_rangearvot, mutta se ei korjaa olemassa olevia tietoaineistojadatasets.xmltiedosto.
        
Tarkista tietosi: jos muuttujan arvot on pakattu ja josactual\\_rangeon määritelty pakatuiksi tietoarvoiksi, lisätkää&lt;addAttributes&gt;actual\\_rangearvojen määrittelyyn. Muussa tapauksessa aineisto ei kuormitaERDDAP. Yksinkertainen ja lähes täydellinen tapa tehdä tämä on etsiädatasets.xmlLähde ominaisuuksia, joilla on
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
ja ascale\\_factorMuuta kuin 1.0. Nämä ovat niitäactual\\_rangeominaisuuksia, jotka sinun täytyy ehkä korjata.
        
AkselimuuttujatEDDGridaineistot,ERDDAP™Aseta ainaactual\\_rangeSe on arvojen todellinen ulottuvuus, koska se tuntee nämä arvot.
        
Akselimuuttujat, joilla on laskevia arvoja (esimerkiksi leveysmuuttujat) ,ERDDAP™luotuactual\\_rangekanssa\\[0\\]............\\[Viimeinen viimeinen\\]Arvot, jotka olivat korkealla, alhaalla. Nyt se käyttää aina matala-arvoja uuden CF-määritelmän tekemiseen.
        
Oikeudenmukaisuusactual\\_rangeEDDTable-tietoaineistot ovat erityisen tärkeitä, koskaERDDAP™kieltäytyy käyttäjien pyynnöistä, jotka ovat vähemmän kuinactual\\_rangevähimmäisarvo tai suurempi kuinactual\\_rangemaksimiarvo.
        
Aiheeseen liittyvä: Todellinen \\ min, todellinen _maxdata\\_minjadata\\_maxattribuutit ovat nyt vähentyneet. Muunna tietosi käytettäväksiactual\\_rangeSen sijaan.
        
    * tehdä (valinnainen, mutta suositeltu) : Jokaisesta lähes reaaliajasta ja ennustetietoaineistostaERDDAP™Ole hyvä ja lisää [&lt;testOutOfDate&gt; (Docs/server-admin/datasets#testoutofdate) Tag, jolla on arvo muodossanow-_NUnits_, esim.now-2 päivää. Jos aineiston enimmäisaika-arvo on tätä arvoa vanhempi, aineistoa pidetään vanhentuneena ja se merkitään sellaiseksi.[outOfDateDatasets.html](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)Web-sivu. Tämä on helppo tapa nähdä, milloin jokin on vialla tietoaineiston lähteessä.
    *   [Semantic Markup of Datasets with json-ld Näytä tarkat tiedot (JSON Liittyvät tiedot) ](/docs/server-admin/additional-information#json-ld)  
        ERDDAP™Nyt käytetään[json-ld (JSON Liittyvät tiedot) ](https://json-ld.org)tehdä tietoluettelon ja tietoaineistot osaksi[Semanttinen web](https://en.wikipedia.org/wiki/Semantic_Web)Tim Berners-Lee:n idea on tehdä verkkosisällöstä koneellista luettavampaa ja kone ”ymmärrettävää”. Hakukoneet ([Google erityisesti](https://developers.google.com/search/docs/data-types/datasets)) ja muut semanttiset työkalut voivat käyttää tätä rakenteellista merkintää helpottamaan löytöä ja indeksointia. json-ld-rakenteinen merkintä näyttää näkymättömältä ihmiselle&lt;Käsikirjoitus &gt; Koodi on http://.../erddap/info/index.html WEB WEB WEB WEB WEB (Semanttinen verkko[Dataa](https://schema.org/DataCatalog)) ja jokaisella http://.../erddap/info/_datasetID_/index.html WEB WEB WEB WEB WEB (Semanttinen verkko[Dataa](https://schema.org/Dataset)) . (Erityiskiitokset Adam Leadbetterille ja Rob Fullerille Irlannin Marine-instituutista, jotka ovat tehneet kovaa työtä tämän osan saavuttamiseksi.ERDDAP.) 
    * NEW: On olemassa uusia tiedostotyyppejä, jotka voivat lukea audiotiedostojen tietoja:
        [EDDGridAudiofiilejä](/docs/server-admin/datasets#eddfromaudiofiles), joka käsittelee audiotietoja verkkotietoina.
        [EDDTableFromAudiofiilit](/docs/server-admin/datasets#eddfromaudiofiles)joka käsittelee audiotietoja tabulaaritietoina. Jim Potemran, Rich Signellin, OOI:n ja Carrie Wall Bellin ansiosta ääni- ja hydrofonitiedostojen tukipyyntöihin.
    * Muutoksia GenerateDatasets XM (liittyvät muutokset) :
        * Uusi:ERDDAP™Järjestelmä on nyt automaattisesti[Päivitä URL-osoitteet](/docs/server-admin/additional-information#out-of-date-urls)Molemmat GenerateDatasets Xml ja lataustiedot. Jos sinulla on ehdotuksia lisäURL-osoitteisiin, jotka on kiinnitettävä ja päivitettävä, tai jos luulet, että tämä pitäisi muuttaa palveluksi. (Kuin konvertterit) Ole hyvä, sähköpostierd.data at noaa.gov.
        * Lähde: If GenerateDatasets XML näkee CF:nstandard\\_name  (Kaikkien pitäisi olla matalampia) Yläosassa, se lisää kaikki alempaa versiota&lt;addAttributes&gt; myös silloin, kun aineisto latautuu, josERDDAP™Katso CFstandard\\_nameylemmällä hahmolla se hiljaa muuttaa senstandard\\_name. Kiitos Rich Signell.
        * Lähde: If GenerateDatasets Xml näkee ominaisuuden, joka ei ole ISO 8601 -muodossa, se lisää ISO 8601 -muotoisen ajan.&lt;addAttributes&gt; JosERDDAP™ei tunnista muotoa, se jättää ajan arvon muuttumattomaksi. Jos näet muodon, jokaERDDAP™ei tunnista ja korjaa, pyydän sähköpostiaerd.data at noaa.gov.
        * IMPROVED: Alhainen koodiEDDGridFromThredds Kataloginen vaihtoehto GenerateDatasets XML luottaaUnidataNetcdf-java-kataloginen crawler-koodi (Kynttilät. Katalogiset luokat) jotta kaikki 3DS-luettelot voidaan käsitellä (joka voi olla yllättävän monimutkainen) . Kiitos Roland Schweitzerille tästä muutoksesta jaUnidatakoodista.
        * Alkuperäinen nimi: GenerateDatasets XMLEDDGridFromDap nyt lisää ", startYear-EndYear" otsikon loppuun, joka perustuu todellisiin aika-akselin arvoihin. Endyear = "läsnäolo", jos tietoja on olemassa viimeisten 150 päivän aikana.
        * Alkuperäinen nimi: GenerateDatasets XMLEDDGrid"Adap lisää"\\[Päätös\\]Otsikko, jos tietoaineisto on tasaisesti sijoitettu ja sama lat ja lon.
        * IMPROVED: Aikamuunnin on nyt lisäominaisuuksia, erityisesti kyky muuntaa jousiaikoja monissa yhteisissä formaateissa ISO 8601 -merkkijonoksi tai UDUnits-yhteensopivaksi numeroksi. Kaikki aiemmin tuetut ominaisuudet toimivat, muuttumattomina.
        * Alkuperäinen nimi: GenerateDatasets Xml ja avainsanojen muuntimet ovat nyt "Maan tiede" alussa GCMD Science Keywords. Kun aineisto on ladattuERDDAP™,ERDDAP™Korjaa kaikki GCMD-avainsanat avainsanojen attribuutissa, jotka eivät aloita "Maatiede" tai jotka käyttävät muuta kuin otsikkotapausta. (Kunkin sanan ensimmäinen kirjain on pääomitettu) .
        * IMPROVED: Kun ehdotat&lt;destinationName&gt; GenerateDatasets EDDTableFromAsciiFiles Xml käytti juuri EDDTableFilesin päätäsourceNames'/'  (Jotkut olivat tiedostonimiä) . Nyt se käyttää kokosourceName(esim. Blahblahblah (m/s) Muutos on hyvä joillekin aineistoille, ei muille, mutta se on turvallisempi. Kiitos Maurice Libesille.
        * Alkuperäinen nimi: GenerateDatasets Xml ja aineistonrakentajat varmistavat, ettei sarakkeita ole olemassa. Kiitos Maurice Libesille.
        * Alkuperäinen nimi: GenerateDatasets EDDTableFromAsciiFiles ei kirjoittanut&lt;ColumnSeparator &gt; tuotokseen. Nyt se tekee. Kiitos Maurice Libesille.
    * NEW: The DasDds -työkalu tulostaa aikavajetiedot (The[.timegap-tiedot](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)) jos tietokanta on verkkotietokanta.
    * NEW: Advanced Search hyväksyy nyt "now-nUnits" -aika-arvot. Kiitos Rich Signell.
    * IMPROVED: Turvallisuuden parantamiseksi, kun tietoaineiston metatietojen tai tietojen sähköpostiosoite on kirjoitettu html-verkkosivulle, "@" korvataan sanalla ". Tämä saa vain sähköpostiosoitteita, jotka ovat koko metatietoja tai data-arvoa, ei sähköpostiosoitteita, jotka on upotettu pidemmille arvoille.
    * IMPROVED: Turvallisuuden lisäämiseksiRSSYksityisten tietoaineistojen tiedot ovat nyt vain käyttäjien saatavilla. (jaRSSLukijat) jotka ovat kirjautuneet sisään ja valtuuttaneet käyttämään näitä tietoja.
    * NEW: Nyt, kun aineisto on ladattu, josdate\\_created,date\\_issued,date\\_modified, tai päivämäärä \'tadata \'modified attribute on aika-arvo, joka ei ole ISO 8601 -muodossa;ERDDAP™Muutetaan ISO 8601 -muotoinen aika. JosERDDAP™ei tunnista muotoa, se jättää ajan arvon muuttumattomaksi. Jos näet muodon, jokaERDDAP™ei tunnista ja korjaa, pyydän sähköpostiaerd.data at noaa.gov.
    * .dods-vastauksetEDDGridDatan pitäisi nyt olla huomattavasti nopeampaa. Kiitos Rich Signell.
    * Muutokset liittyvätERDDAPISO 19115 -asiakirjat:
        * BUG FIX: Kun luodaan ISO 19115 -dokumenttejadataVariableYksiköt eivät olleet HTML:n attribuutteja ja prosenttiosuus koodattuja. Nyt ne ovat. NGDC:n ISO 19115 -vahvistimen ansiosta.
        * BUG FIX: Kun luodaan ISO 19115 -dokumenttejadate\\_createdSitä on käytetty, niin usein se on väärä. Se on muunnettu ISO 8601 Z -merkkijonoksi. NGDC:n ISO 19115 -vahvistimen ansiosta.
        * BUG FIX: Kun luodaan ISO 19115 -dokumenttejaERDDAP™Pidemmät päivämäärät vuosi = 0000 (Klimatologian tietoaineistot) ISO 19115 ei salli päivämääriä vuoden = 0000. NGDC:n ISO 19115 -vahvistimen ansiosta.
    * NEW: Ennen pyyntöähttp********** ****************************************************************************************************************************************************************************************************************************************************** (kuin teksti) Esim. "ERDDAP= 1,82 §:ää
Nyt pyyntöhttp.../erddap/version | | palauttaa numeron ja valinnaisen riittävyyden sekä ASCII-tekstin (Ei tiloja tai kontrollihahmoja) Esim. "ERDDAP| | muokkaaminen = 1,82 | JohnsFork » Ihmiset, jotka tekevät haarukka määrittää tämän muuttamalla EDStatic.erdapVersion. Tämä tapa tehdä se ei aiheuta ongelmia aiempien versioidenERDDAP. Kiitos Axiom (Kyle Wilcox) Irlannin meriinstituutti (Pääosat Rob Fuller) .
    * Viisikymppinen: Wms-versio=1.3.0, pyyntö=GetMapEPSG:4326 (Ei CRS:84) pyynnöt: Bbox-järjestyksen on oltava minLat,minLon,maxLat,maxLon. CRS:84-pyynnöt, kuten ennen, bbox-järjestyksen on oltava minLon,minLat,maxLon,maxLat. Tämä voi korjata käyttämälläERDDAP&gt;WMS1.3.0 PalvelutArcGIS  (Kiitos Paola Arce) . Kiitos (Ei ei ei) ettäOGCtehdä siitä niin monimutkaista. KiitosLeafletkunnioittaa tätä oikein ja antaa minulle tapa testata tätä.
    * Edellinen, ehdotettu linkkiRSSSähköpostiliittymillä onhttpURL sinunERDDAP. Nyt se onhttpsURL, jos se on aktiivinen.
    * Uusi:EDDGridKopio tukee nyt valinnaista tunnistetta&lt;Alkuperäinen nimi: Since&lt;/onlySince&gt;, jossa arvo on erityinen ISO-8601-muotoinen aika tainow-NUnits (esim.now-2 vuotta) Aikaa. Nähdään[Vain vain vain dokumenteista lähtien](/docs/server-admin/datasets#onlysince). Kiitos Drew P:lle.
    * HUOMAUTUS: Jos saatavilla,ERDDAP™NäytetäänhttpsURL (käytetty)&lt;BaseHttpsUrl, jos saatavilla)httpURL-osoite, kun se antaa käyttäjille URL-osoitteen lisätä/validate/poistaa/listata tilaus.
    * Vinkki:ERDDAP™Nyt tilaustoimet voidaan aloittaa " https://" . (Bob riisuu otsaansa.) Kiitos Jennifer Sevadjianista.
    * Vinkki:.jsonlKVP”Käytä” jokaisen avaimen ja arvon välillä'='. (Bob riisuu otsaansa.) Kiitos Alexander Barthille.
    * Viisikymppinen: Aiemmin, jos aloitat uudelleenERDDAP™Jos ennen tietojen lataamista normaalisti, soit EDDTableFromFiles-tietokantaan, joka käytti päivitystä EveryNMillis, ja jos tietotiedostoa on juuri muutettu, pyyntö epäonnistuisi nollapistevirheellä. Nyt pyyntö onnistuu. Kiitos John Kerfootille.
    * UUTUS: Kun tietokanta ladataanERDDAP™Avainsanat on nyt järjestetty lajiteltuun järjestykseen ja kaikki uudet hahmot poistetaan.
    * IMPROVED: Jos .geoJson.jsontai tai.ncOJsonin pyyntö.jsonp-parametri, vastausmime-tyyppi on sovellus/javascript. Huomaa, että.jsonP ei tueta.jsonlCSVtai tai.jsonlKVPKoska se ei toimisi. Kiitos Rob Fuller.
    * IMPROVED: Json-linjojen mime-tyyppi on nyt "sovellus/x-jsonlines". Se oli sovellus/jsonl. Tällä hetkellä ei ole lopullista oikeaa vaihtoehtoa.
    * IMPROVED: Tila.html-sivulla esitettyjen epäonnistuneiden pyyntöjen määrä kasvaa, koska enemmän asioita lasketaan epäonnistumisiksi kuin ennen, esim. ClientAbortException.
    * HUOMAUTUS: Nyt, jos vastausERDDAP™ei ole pakattu, sitten vastauksen otsikko sisältää "sisältökoodi" = "identiteetti".
    * IMPROVED: "Lisenssi" ei tarvittu. Jos sitä ei ole määritetty, tavallinen lisenssi viestistä.xml (asennus.xml jos läsnä) Sitä käytetään oletusarvona.
    * Uusi: Nyt on valinnainen[tiedostoAccessSuffix attribuutti](/docs/server-admin/datasets#fileaccessbaseurl)jota voidaan käyttää olemassa olevan[tiedostoAccessBaseUrl attribuutti](/docs/server-admin/datasets#fileaccessbaseurl).
    * IMPROVED: Turvallisuuden lisäämiseksi tämä versio on koottu uusimpaan versioon.JavaJDK v8u162.
    * NEW: Turvallisuuden lisäämiseksi useita yleisiä verkkotunnuksia, jotka tarjoavat tilapäisiä sähköpostiosoitteita (@mailinator.com) Ne ovat nyt pysyvällä sähköpostilistalla tilausjärjestelmään.
    * NEW: Turvallisuuden lisäämiseksi päivittäisen raportin korkeudet sisältävät:
SetData IP-osoite epäonnistui (Viimeinen päivittäinen raportti)   
SetData IP-osoite epäonnistui (käynnistyksen jälkeen)   
SetData IP-osoite onnistui (Viimeinen päivittäinen raportti)   
SetData IP-osoite onnistui (käynnistyksen jälkeen)   
"Epäonnistuneet" korkeudet antavat sinun nähdä kuka (Hakkeri?) Hän yrittää luoda lipun, mutta epäonnistuu.
    * IMPROVED: Turvallisuuden lisäämiseksi sähköpostiosoitteet&lt;PostBlacklist &gt; In Yourdatasets.xmlNiitä pidetään nyt tapausherkkinä.
         

## Versio 1.80{#version-180} 
 (2017-08-04) 

*    **Uudet ominaisuudet (Käyttäjille) :**   
     
    * UusiaorderByCount () suodattimen avulla voit määrittää, miten tulostaulukko lajitellaan. (tai ei) ja palauttaa vain yhden rivin jokaiselle ryhmälle, jossa lasketaan puuttumattomien arvojen määrä kullekin muuttujalle.
Esimerkiksi,orderByCount ("""stationID""") lajitteleestationIDPalauta yksi rivi jokaisellestationIDlasketaan kunkin muuttujan ei-vähennysarvojen määrä.
Jos vain määritätorderByCount (""") Vastaus on vain yksi rivi, jonka puuttumattomien arvojen määrä kullekin tietomuuttujalle.
Nähdään[orderBy... dokumentointi](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy)Kiitos Ben Adamsille.
    * Uusia.ncJyväskylän tiedosto Tyyppivaihtoehto verkko- ja tabulaaritietoihin. Tämä vaihtoehto tekeeNCOlvl=2 "pedanttinen" JSON-tiedosto, jossa on kaikki tiedot, jotka tavallisesti löytyvät.nctiedosto. Näytä[ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json)Kiitos Charlie Zenderille.
    * Vinkki: TheorderBy............ () Make A Graph -sivuston vaihtoehdot käsitellään nyt oikein.
    * BUG FIX: .geoJson-tulos ei nyt paina rivejä, joissa lat- tai lon-arvot puuttuvat. Myös korkeusarvot (jos saatavilla) Koordinaatit ovat nyt mukana, ei data-arvoina. Kiitos Jonathan Wilkins.
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:**   
     
    * Turvallisuus on: Protokollat.js-kirjasto, jota käytetäänOpenLayersdemo onWMSSivut sisäänERDDAP™on vanhentunut ja sillä on vika, joka mahdollistaa sen väärinkäytön. (Valitettavasti päivitysOpenLayersprotokollat. Js ei ole helppo.) Tämä avaa mahdollisuuden siihen, että kirjasto voidaan perustaa, jotta se voi olla haavoittuvainen. Kuitenkin, koskaERDDAP™Vain käyttääOpenLayerstietyllä tavalla ja vain tietylläERDDAP- tietolähteet, uskomme, ettei paikan päällä ole haavoittuvuuttaERDDAP&gt; käyttääOpenLayersMutta jos et usko tätä, voit nyt poistaa käytöstäOpenLayersdemo onWMSSivut sinunERDDAP™Lisäämällä
```
        <openLayersActive>false</openLayersActive>  
```
asennus.xml-tiedosto. Oletusarvo on "todellinen". Kiitos Charles Carletonille ja NCEI:lle.
    * Muutokset: Käyttämättömät .jar-tiedostot ja päällekkäiset .jar-tiedostot (koska ne ovat myös netcdfAll.jar.) on poistettu sieltäERDDAP™Jakelu. Out-of-Date .jar-tiedostoja on päivitetty. Kiitos Charles Carletonille ja NCEI:lle.
    * Turvallisuus muuttuu: NetcdfAll.jar-tiedosto jaettunaERDDAP™Viimeisin versio (Tällä hetkellä 4.6.10) .jar-tiedostoja, joiden tiedetään olevan vanhentuneita ja joilla on turvallisuushaavoittuvuuksia, erityisesti Jacksonin kirjastoja, joita käytetään vain Amazon S3 -tietolähteissä. Jos et käytä tietoja Amazon S3:n kautta (tietäisit, jos olisit) Nämä haavoittuvuudet eivät ole tärkeitä.
        
Netcdf-java-kehittäjät väittävät, että nämä haavoittuvuudet eivät ole merkityksellisiä, koska netcdf-koodi käyttää näitä kirjastoja ja joka tapauksessa se olisi merkityksellistä vain, kun käytät Amazon S3:a. Näytä[ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866). Minä uskon heitä. Jos olet edelleen huolissasi tästä, ota yhteyttä verkko-java-kehittäjiin. (Huomaa, että jos et usko verkko-java-kehittäjiä ja harkitse, että et käytäERDDAP™Tästä johtuen sinun ei pitäisi myöskään käyttää THREDS-laitteita, koska THREDDS käyttää netcdf-javaa perusteellisesti ja laajemmin kuinERDDAP.) 
        
Yksityiskohdat: Huono koodi ja haavoittuvuusvaroitukset ovat:
NetcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml
Näytä https://nvd.nist.gov/vuln/detail/CVE-2016-7051 ----- Korkea korkea
NetcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml
Näytä https://nvd.nist.gov/vuln/detail/CVE-2016-7051 ----- Korkea korkea
NetcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-annot/pom.xml
Näytä https://nvd.nist.gov/vuln/detail/CVE-2016-7051 ----- Korkea korkea
Näytä https://nvd.nist.gov/vuln/detail/CVE-2016-3720 Kriittinen
NetcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
Näytä https://nvd.nist.gov/vuln/detail/CVE-2016-7051 ----- Korkea korkea
Näytä https://nvd.nist.gov/vuln/detail/CVE-2016-3720 Kriittinen
versioon 4.6.10, aws-java-sdk-ydin vetää versioon 2.6.6 jackson-\\* esineitä. (Sähköposti Netcdf-java -henkilöiltä) .
Kiitos Charles Carletonille ja NCEI:lle.
        
    * Muutokset: Jos toistatERDDAP™Huomaa, että komentolinjalle tarvittava luokan parametri on nyt paljon lyhyempi kuin ennen. Katso uusi CP-asetus[Tämä dokumentti](/docs/contributing/programmer-guide#development-environment). Kiitos Charles Carletonille ja NCEI:lle.
    * GenerateDatasetsissa uudet Xml: EDDTableFromBcodmo, joka on tarkoitettu vain sisäiseen käyttöön BCO-DMO: ssa.
Kiitos Adam Shepherdille ja BCODMOlle.
    * Uutta trendiä ja tunnelmaa: Jos EDDTable-sarakkeessa on tiedostonimiä web-käytettävistä tiedostoista (esim. kuva, video tai äänitiedostot) Voit lisätä
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
URL-osoitteen määrittäminen (Loppuun /) Jotta tiedostonimet olisivat täydellisiä URL-osoitteita. Sitten.htmlTableVastaukset,ERDDAP™Näytä tiedostonimi yhdistettyyn URL-osoitteeseen (Perusta Url plus tiedoston nimi) .
Jos haluatERDDAP™palvellakseen niihin liittyviä tiedostoja, tehdä erillinen EDDTableFromFileNames-tietokanta näille tiedostoille (Se voi olla yksityistä tietoa) .
Kiitos Adam Shepherdille ja BCODMOlle.
    * NEW ATTRIBUTE RECOMMENDATION: Jos EDDTable-sarakkeella on tiedostonimiä web-käytettävistä tiedostoista (esim. kuva, video tai äänitiedostot) jotka ovat saatavilla arkiston kautta (esim..ziptiedostotiedosto) URL-osoitteen kautta, käytä
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
määrittää URL-osoite arkistolle.
Jos haluatERDDAP™arkistisen tiedoston palvelemiseksi tee erillinen EDDTableFromFileNames-tietoaineisto kyseiselle tiedostolle. (Se voi olla yksityistä tietoa) .
Kiitos Adam Shepherdille ja BCODMOlle.
    * Improvements to GenerateDatasets Xml poistaa syyt pätemättömyys / paha&lt;subsetVariables&gt; ehdotuksia ja päällekkäisiä/huonoja nimiä jne. Kiitos Rich Signell, Adam Shepherd ja BCO-DMO.
    * Uudet vaihtoehdot: Poliittinen rajatieto jaettiinERDDAPSe on kolmannelta osapuolelta ja hieman vanhentunut. Maailmassa on riitaisia rajoja, joissa eri ihmisillä on erilaisia ideoita siitä, mikä on oikein. Me emme tee riitaa POLITICAL BOUNDARY ́in korrektiiveista, jotka tulevatERDDAP. Jos et pidä poliittisista rajatiedoista, jotkaERDDAP™Nyt voit kertoaERDDAP™poliittisia rajoja ei saa koskaan lisäämällä
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
asennus.xml-tiedosto. Oletusarvo on "todellinen". Kiitos Raju Devenderille.
    * Uusi metadata: Sisällädatasets.xmlaineiston osalta voit nyt määrittää värin oletusarvon. Bar-osat adataVariablegrafiikoilla ja kartoilla
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (Oletusarvo = 1, joka sanooERDDAP™Päätä päättää) . Nähdään[Väri väri väri väri Bar-asetukset](/docs/server-admin/datasets#color-bar-attributes).
    * IMPROVED: Valtion raja-arvo kartoilla oli violetti. (Deep Purple, tunnetuin esittäjä Baby Boomers) . Nyt se on harmaa (kansallisen rajaharmaan ja maaharmaan välissä) .
    * Vinkki:&lt;Iso19115 File[muokkaa]&lt;Fgdcfile »datasets.xmlAina ei ole käsitelty oikein. Nyt ne ovat. Kiitos BCO-DMO.

## Versio 1.78{#version-178} 
 (Lähde: 2017-05-27) 

*    **Uudet ominaisuudet (Käyttäjille) :**   
     
    *    (Ei kukaan)   
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:**   
     
    * IMPROVED: Major LoadDatasets Time Series -linjojen järjestys status.html-sivulla on nyt uusin yläreunassa vanhimpaan.
    * Vinkki:ERDDAP™Nyt kirjoittaa.nccsvtiedostoja aikamuuttujan kanssaactual\\_rangeISO-8601 String -aika. Tämä korjaa virheen EDDTableFromErddap-parsing-infolla etätietoaineistosta ja pikakäynnistystiedostosta kaikille EDDTableFrom...Files-tietokoneille. (Aikaaactual\\_rangeVäärä on ensimmäinen kerta, kun aineisto latautuu v1.78, mutta oikein sen lataamisen jälkeen, esim. jos liputat tietoaineiston.) 

## Versio 1.76{#version-176} 
 (2017-05-12) 

*    **Uudet ominaisuudet (Käyttäjille) :**   
     
    * Muutos Tomcatissa: pyyntöihinERDDAP™Ohjelmistot muut kuin verkkoselaimet (esim.curlR,Matlab,Python,Java) :
Aiemmat muutokset Tomcatin versioissa (alemman tason ohjelmisto, joka toimiiERDDAP) Vuoden 2016 alusta lähtien URL-osoitteen kyselyosassa on oltava yhä enemmän[ **% koodattu** ](/docs/server-admin/datasets#infourl)turvallisuussyistä. Selaimet huolehtivat prosentista koodauksesta. KäyttämälläERDDAP™selaimessa ei vaikuta, ellei pyyntö ohjata toiseen.ERDDAP.
    * Improvisoitu: aiemmin,ERDDAP™Käsitelty **Hyvät muuttujat** Enemmän kuin allekirjoittamattomat lyhyet kokonaisluvut. Nyt se kohtelee heitä enemmän kuin 1-hahmo-pitkä UCS-2 (Unicode) Lakkoja. Nähdään[Char-dokumentaatio](/docs/server-admin/datasets#char). Aurelie Briandin ja Argo-projektin ansiosta.
    * Improvisoitu: aiemmin,ERDDAP™Pientä tukea tarjotaan **Unicode-hahmot** Alkuperäinen nimi #255 in Strings Sisäisesti,ERDDAP™2-tavuiset UCS-2-ketjut (Hahmot 0–65535) Stringsissä. Kun tallennustiedot on kirjoitettu eri tiedostotyyppeihin,ERDDAP™Kaikkein parhainta on tukea 2-tavuisia ketjuja. Toinen esimerkki on .csv-tiedostot, jotkaERDDAP™Kirjoita ISO-8859-1 Charset (1-tavuinen kartta) NiinERDDAP™Kirjoittaa kaikki hahmot yläpuolella #255 JSON-like \\hh_ syntax. Näytä[String dataa](/docs/server-admin/datasets#string).
    * Lähde: In.nctiedostot kirjoittaneetERDDAP™char-muuttujat, joita tulkitaan, koska Stringsillä on ominaisuus
         **ISO-8859-1**   
Sisällä.nctiedostojen lukeminenERDDAP™, char-muuttujat, joissa on "Encoding", tulkitaan Stringsiksi määritellyllä kartalla.
    * Järjestäjä:ERDDAP™Tukea **JSONin kaltainen backslash-koodi** erikoismerkkejä, kun määrität char- ja String-muuttujat. Näin voit pyytää jotain, kuten &myString="u20ac", kun haluat rivejä tietoja, joissa myString on 20ac on heksadecimal versio koodipisteen Euro-symboli. Verkossa on useita lähteitä, jotka osoittavat Unicode-symbolien koodipistenumerot, esimerkiksi[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode).
    * Improvisoitu: aiemmin,ERDDAP™Rajoitettu tuki **Pitkä kokonaisuus** muuttujia. Nyt nytERDDAP™täysin tukee sisäisesti ja tekee parhaansa kirjoittaessaan pitkiä tietoja eri tiedostotyypeille. Nähdään[Pitkä dokumentointi](/docs/server-admin/datasets#long). Kiitos Irlannin Marine Institute, Craig Risien, Rich Signell, Christopher Wingard ja OOI.
    * UUTUS: Tuotantotiedostotyyppi griddap jatabledap: **.nccsv** joka tekeeNetCDFASCII, CSV-tiedosto, joka sisältää myös kaikki metatiedot, jotka olisivat vertailukelpoisia..nctiedosto. Nähdään[NCCSV Määritelmä](/docs/user/nccsv-1.00). Kiitos Steve Hankinille.
    * Uusi: **orderByClosestfilter** Voit määrittää, miten tulostaulukko lajitellaan ja väliaika (esim. 2 tuntia) . Jokaisessa ryhmässä pidetään vain rivit lähimpänä väliaikaa. Esimerkiksi,orderByClosest ("""stationIDAika, 2 tuntia ») lajitteleestationIDaika, mutta palauta vain rivitstationIDMissä viimeinenorderByKolumni (Aika-aika) Lähin 2 tunnin välein. Tämä on lähin asiatabledaparvojen siirtäminen verkkoon. Tämä vaihtoehto voidaan määritellä minkä tahansatabledapDatasetin .html-verkkosivu, .graph-verkkosivu ja kaikki URL-osoitteet, joita luot itse. Kiitos Irlannin meri-instituutista ja Ocean Networks Canadasta.
    * Uusi: **orderByLimitfilter** Voit määrittää, miten tulostaulukko määritetään ja rajanumero (esim. 100) . Jokaisessa ryhmässä pidetään vain ensimmäiset "rajoitukset". Esimerkiksi,orderByMax ("""stationID100") lajitteleestationIDPalauta vain 100 ensimmäistä riviä jokaisellestationID. Tämä on samanlainen kuin SQL:n LIMIT-lauseke. Tämä vaihtoehto voidaan määritellä minkä tahansatabledapDatasetin .html-verkkosivu, .graph-verkkosivu ja kaikki URL-osoitteet, joita luot itse. Kiitos Irlannin meri-instituutista ja Ocean Networks Canadasta.
    * NEW: Kaksi uutta tiedostotyyppiä **.jsonlCSVja.jsonlKVP** ovat saatavissa pyynnöistä verkkotietoihin, tabulaaritietoaineistoihin ja moniin muihin paikkoihinERDDAP  (esim. tietoaineistoja koskevat pyynnöt) . Tiedostot ovat JSON Lines -tiedostoja ([ https://jsonlines.org/ ](https://jsonlines.org/)) jossa jokaisella viivalla on erillinen JSON-objekti..jsonlCSVVain arvot ovat CSV-muodossa..jsonlKVPAvain: Arvoparit. Jokainen linja seisoo yksin. Rajoja ei ole suljettu suurempaan JSON-sarjaan tai esineeseen. Esimerkiksi, katso[Tämä näytepyyntö](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z). Kiitos Damian Smyth, Rob Fuller, Adam Leadbetter ja Irlannin Marine Institute.
    * NEW: Uusia dokumentteja kuvataan[ **Miten päästä yksityisiin tietoihinERDDAP™Kirjoitusten kautta** ](/docs/user/AccessToPrivateDatasets). Kiitos Lynn DeWitt.
    * Vähimmäismäärä: Minimi laajuus **OpenLayers** Kartta oli kaksi astetta ja nyt neljä pikseliä. Kiitos Rusty Hollemanille.
    * IMPROVED: Joissakin yleisissä tapauksissa pyynnöt, jotka sisältävät **Säännöllinen ilmaisu** Rajoitukset käsitellään paljon nopeammin.
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:**   
     
    *    **SLOW FIRST STARTUP:** Ensimmäistä kertaa kun aloitat uuden version, se kestää kauan.ERDDAP™ladata kaikki tietoaineistot, koska sen on uudelleenluettava kaikki lähdetiedot (vaikka vain otsikko verkkoon tallennetuille tiedostoille) . Jos katsot lokeja, saatat nähdä virheviestejä, joissa sanotaan "vanha / tukematon parannettu versio" joidenkin sisäisten tiedostojen - se on ok-ERDDAP™Tekee sisäisten tiedostojen uudet versiot. Ole kärsivällinen.
    * Toiminta:ERDDAP™Käytä nyt uutta **Java** Luokat (JSR 310 tunnetaan) Sen sijaan, että Joda ojentaisi aikoja numeeriseen aikaan. Huomautuksia:
        * JosERDDAP™Yhtäkkiä on ongelmia, jotka häiritsevät String-aikoja tietylle tietoaineistolle ja siten vain muuntaa useimmat tai kaikki ajat NaN: lle. (puuttuvat arvot) Ongelma on lähes aina päivämäärän kanssa. Aikamuodon merkkijono, joka on määritelty "yksiköt" muuttujan. Uudessa järjestelmässä tarvitaan joskus hieman erilainen päivämäärä.
        * Jos numeeriset kuukaudet ja päivämäärät eivät ole 0-paddoituja (esim. ”3/7/2016”) Varmista, että formaatissa on vain yksi M ja D (Esimerkkinä "M/d/yyyy" ei "MM/dd/yyyy") .
        * Muuta murto-osan spesifikaatiota, joka käyttää alennuksia (Esimerkkinä .ss inyyyy-MM-ddT'HHH: mm:ss) pääkaupunkiin S, (esim.yyyy-MM-ddT'Hh:mm:ss.SSS) .
        *   ERDDAP™Ei enää tue merkkijonoa Aikataulut, joissa on kaksinumeroinen vuosi (Y) implisiittisen vuosisadan (1900 tai 2000) . Yritykset käyttivät miljardeja dollareita ongelman korjaamiseen 1990-luvun lopulla. Tutkijat eivät saa käyttää kahta lukuvuotta. Korjaa lähdetiedosto (s) muuntamalla 4-numeroiseksi vuodeksi, sitten käyttää yyyy. Aikamuoto.
        * Voit käyttää yyy tai YYY (jonkaERDDAP™käänny uuuu) 4 numerovuotta, mukaan lukien negatiiviset vuodet, esim. -4712 (4713 BC) . Kiitos SeaDataNet, Thomas Gardner ja BODC.
        * Ole hyvä ja jatka Z: n käyttöä päivämäärän kuluessa, jotta saatERDDAPAikaa offset (esim. Z, +0200, -08, -0800, -08:30) .
        *    **Varmista, että käytätJava1.8.021 tai uudempi.** 
        * Ohjelmoijat ----- Jos kirjoitatJavaOhjelmat, jotka juoksevatERDDAP™Koodi, sinun täytyy poistaa viittaus Joda-aika. luokkareitin parametri.
    * Uusi:ERDDAP&gt;[Archive Datan työkalu](/docs/server-admin/additional-information#archiveadataset)Nyt voi luoda[ **BagIt-tiedostot** ](https://en.wikipedia.org/wiki/BagIt). NCEI voi olla standardoitu tässä muodossa. Kiitos Scott Crossille ja John Relphille.
    * IMPROVED: Linkit erddapin lataamiseen. Sotaa vastaanERDDAP™Verkkosivut viittaavat nyt **GitHub** . (Ne ovat julkisia linkkejä, joten sinun ei tarvitse liittyä GitHubiin.) Tämä tarkoittaa paljon nopeampia latauksia (enintään 12 Mb/s verrattuna 1Mb/s) Ja vähän ongelmia latausten kanssa. Kiitos Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney ja Irlannin Marine Institute.
    * Lähde: The **Tila.html-sivu ja päivittäinen tilaraportti** Lue lisää "Major LoadDatasets Time Series" -osiosta, joka kertoo tilastoista.ERDDAP™kunkin merkittävän taakan päättymisestä viimeisen 100 suurimman taakan osalta. Kiitos ongelmallisesta RAIDistamme.
    * Uusi, valinnainen (Mutta suositellaan) EDDTableFromCassandra-tietokannan parametrit: [ ** &lt;Esittelyssä KeyCSV&gt; ** ) (Docs/server-admin/datasets#partitionkeycsvs) . Kiitos Ocean Networks.
    * EDDTableFromAsciiFiles tukee nyt ** &lt;ColumnSeparator &gt; ** parametri. Jos null tai ", luokka arvaa, kuten ennen, muuten, ensimmäinen merkki käytetään sarakkeen erotin, kun luet tiedostoja. Kiitos Sky Bristol ja Abigail Benson.
    * Uudet tiedot: uusi tietotyyppi,[ **EDDTableFromNccsvfiilit** ](/docs/server-admin/datasets#eddtablefromnccsvfiles)Voit tehdä tietoaineiston yhdistämällä[NCCSV .csv-tiedostot](/docs/user/nccsv-1.00). Kiitos Steve Hankinille.
    * Improvisoitu: **EdDTableFromDap** Nyt käytetään.nccsvSaada tietoa etäältäERDDAPPaikallinen arkisto tuosta metadata-infosta. Tämä mahdollistaa täyden tuen kaaviolle ja pitkille tietotyypeille sekä Unicodelle. (UCS-2) Lahjoja jaloille ja sormille. Kiitos Rob Fuller ja Irlannin Marine Institute.
    * EDDTableFromErddap jaEDDGridSuomi tukee nyt ** &lt;Ohjaus &gt; Väärä&lt;/ Redirect&gt; ** joka kertooERDDAP™Älä koskaan ohjaa pyyntöä kauko-ohjaukseenERDDAP. Oletusarvo on totta. Tämä on hyödyllistä, kun etäisyysERDDAP™Yksityinen onERDDAP. Kiitos Damian Smyth, Rob Fuller ja Irlannin Marine Institute.
    * Improvisoitu:ERDDAP™Nyt saalis **Peruutetut käyttäjäpyynnöt** Ennemmin. JaERDDAP™Nyt suljetaan nopeammin, koska alhainen taso suljetaan nopeammin. Kiitos ongelmallisesta RAIDistamme.
    *    **GenerateDatasets Xml:** 
        * Uusi EDDType "ncdump" painaa[ncdump](https://linux.die.net/man/1/ncdump)Kuin erään otsikon tulostus.nctiedosto. Voit myös tulostaa tiettyjen muuttujien tietoarvot. (tai syöttää "ei mitään" ei tulosta mitään data-arvoja) . Tämä on hyödyllistä, koska ilman ncdump on vaikea tietää, mikä on tiedostossa ja mikä EDDType sinun pitäisi määrittää GenerateDatasetsXml. Craig Risienin, Rich Signellin, Christopher Wingardin ja OI:n ansiosta.
        * Lähde: SeaData Nettitiedot:
Tarvittaessa GenerateDatasets Xml tekee nyt erityistä semanttista konversiota etäisellä SPARQL-kyselyllä: jos muuttujan lähdemetadataan sisältyy sd \\parameter \\urn, esim. sd \\parameter \\ t = "SDN:P01:PSLTZ01", GenerateDatasets Xml lisää vastaavan P02-ominaisuuden, esim. sdn \\p02 \\ n = "SDN:P02: PSAL". Jos sinulla on tietoja, jotka käyttävät näitä ominaisuuksia, ja josERDDAP&gt;&lt;categoryAttributes&gt; asennuksessa.xml sisältää sd_parameterurnin ja sdn_P02urnin, käyttäjät voivat käyttääERDDAP™Luokan hakujärjestelmä tietojen etsimiseksi näiden ominaisuuksien erityisarvoilla. Kiitos BODC ja Alexandra Kokkinaki.
        * Lähde: GenerateDatasets XML muuttaa moniahttp://viittaukset metatietoihinhttps://tarvittaessa.
        * Lähde: GenerateDatasets Xml yrittää nyt arvata Creator -tyypin ja julkaisijan.
        * IMPROVED: Muuttujien tietotyypit, joita GenerateDatasets ehdottaa XML on nyt vähän parempi. Kiitos Margaret O'Brien, LTER ja EML.
        * Lähde: GenerateDatasets XML on parempi määritellä&lt;cdm \\da \\ \\ \\ t; ja lisäämällä siihen liittyviä, vaadittuja ominaisuuksia (esim.&lt;cdm \\ \\ \\ \\ t;), jotta voit toimittaa nämä tiedot. Kiitos Rich Signell.
        * Lähde: In GenerateDatasets Xml, EDDTable Datasets, ehdotus&lt;subsetVariables&gt; on nyt paljon konservatiivisempaa. Kiitos John Kerfootille.
        * Huomautus: josdatasets.xmlTiedot määrittävätfeatureTypemutta ei cd:tä,featureTypeKäytetään cd &#123;\\displaystyle \\ \\ \\ \\ \\ \\ \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t t \\ t \\ t t \\ t t t \\ t t t t t t. Kiitos Rich Signell.
        * FIX: Tuote Dataa XML ehdottaa oikeaa&lt;DataType &gt; Tietomuuttujat, joilla onscale\\_factor,add\\_offsetja/tai allekirjoitetut ominaisuudet.
    * Huomautus: MilloinERDDAP™Avaa A.nctiedosto, joka on **Lyhyempi** kuin sen pitäisi olla (Esim. se ei ollut täysin kopioitu.) ,ERDDAP™Nyt tiedostoa käsitellään huonosti. aikaisemmin,ERDDAP™palautti puuttuvat arvot tiedoston puuttuvalle osalle, koska se on oletuskäyttäytyminen netcdf-javalle.ERDDAP™Käytän nyt ucaria.nc2.iosp.netcdf3.N3header.disallowFileTruncation = totta; Kiitos häiritsevästä RAIDista ja Christian Ward-Garrisonista.
    * ISO 19115 -kirjailija käyttää nyt **Kehittäjä: The Type** Jos läsnä.
    * Improvisoitu:ERDDAP™käyttää nyt uusinta netcdf-java v4.6.9 -verkkoa, joka voi lukea lisätyyppejä **Netcdf-4-tiedostot** . Craig Risienin, Rich Signellin, Christopher Wingardin ja OI:n ansiosta.
    * BUG FIX: Vältä ongelmia, jos eri lähdetiedostoilla on erilaiset tietotyypit tietylle muuttujalle. Kiitos Roy Mendelssohn ja Eugene Burger.
    * Vinkki: **Aikamuotojen muuntaminen** Nyt on parempi suojautua huonoilta aika-arvoilta. Kiitos NDBC:lle.
    * Vinkki:EDDGridLähde: NCFiles Pakkaamaton käsittelee nyt aika-arvoja **"Kuukausia sitten ..." ja "vuosien jälkeen"** oikein (lisäämällä kuukautta tai vuotta, ei lisäämällä esimerkiksi 30 päivää toistuvasti.) . Kiitos Soda3.3.1.
    * FIX: V1,74, **allekirjoitukset** Tarvitaan toimenpiteitä (esim.http://............) Se oli ja pitäisi olla valinnainen.
    * Vinkki:EDDGridLähde: MergeIRFiles.lowGetSourceMetadata () Ei lisätty globaaleja ominaisuuksia. Nyt se tekee.
         

## Versio 1.74{#version-174} 
 (Lähde: 2016-10-07) 

*    **Uudet ominaisuudet (Käyttäjille) :**   
     
    * Kun on olemassa luettelo tietoaineistoista (Kaikki tai etsinnästä) Näytetään verkkosivulla, pitkät otsikot näkyvät useilla riveillä. Aiemmin otsikko korvattiin "... Kiitos Margaret O'Brien, LTER ja EML.
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:**   
     
    * TO DO: Linux-tietokoneissa, vaihda Apache-aikatauluasetuksia niin, että aikaa vievät käyttäjäpyynnöt eivät aikatauluta. (Se, mitä usein kutsutaan "Proxy" tai "Bad Gateway" -virheeksi.) . Käyttäjänä:
        
        1. Muokkaa apassiahttpd.conf tiedosto (Yleensä /etc /httpd/conf/) :
Muuta olemassa olevaa&lt;Aikataulut &gt; Asetukset (tai lisätä tiedoston lopussa) 3600 (Sekunnit) Oletusarvon sijaan 60 tai 120 sekuntia.
Muuta olemassa olevaa&lt;ProxyTimeout &gt;asetukset (tai lisätä tiedoston lopussa) 3600 (Sekunnit) Oletusarvon sijaan 60 tai 120 sekuntia.
        2. Käynnistä Apache: /usr/sbin/apachectl K Graceful (Joskus se on toisessa hakemistossa.) .
        
Kiitos Thomas Oliverille.
         
    * Uusi:\\[BigParentDirectory / Kova Lippuhakemisto
Tämä toimii kuten lippuhakemisto, mutta myös hardFlag-versio poistaa kaikki tallennetut tiedot. Ei ole olemassa URL-osoitteita, jotka asettaisivat kovan lipun. Tätä voidaan käyttää vain laittamalla tiedosto tähän hakemistoon.
kovaa kovaa Liput ovat erittäin hyödyllisiä, kun teet jotain, joka aiheuttaa muutoksenERDDAP™lukee ja tulkitsee lähdetietoja esimerkiksi asentamalla uuden versionERDDAP™jos olet tehnyt tietyntyyppisiä muutoksia tietoaineiston määritelmäändatasets.xml. Näytä[Tämä dokumentti](/docs/server-admin/additional-information#hard-flag). Kiitos John Kerfootille ja kaikille Argo-ryhmille.
         
    * Alkuperäinen nimi: GenerateDatasets Xml on nyt EDDTableFromEML-vaihtoehto
tietoaineiston kuvaus ekologisella metadatakielellä (EML) tiedoston lataaminen, siihen liittyvän datatiedoston lataaminen ja sen luominendatasets.xmljotta aineisto voidaan lisätäERDDAP. On myös EDDTableFromEMLBatch, joka tekee samoin kaikille EML-tiedostoille. Tämä toimii erittäin hyvin, koska EML tekee erinomaisen työn kuvata aineistoa ja koska KNB ja LTER tekevät todellisia tiedostoja saatavilla.
EML plusERDDAP™Se voi olla hyvä yhdistelmä, koskaERDDAP™Voidaan antaa käyttäjille enemmän suoraa pääsyä KNB- ja LTER-tietoihin ja auttaa näitä hankkeita täyttämään Yhdysvaltain hallituksen.[Julkinen pääsy tutkimustuloksiin (Paar) Vaatimukset](https://nosc.noaa.gov/EDMC/PD.DSP.php)asettamalla tiedot saataville verkkopalvelun kautta.
Näytä[Tämä dokumentti](/docs/server-admin/EDDTableFromEML). Kiitos Margaret O'Brien, LTER ja EML.
         
    * Alkuperäinen nimi: GenerateDatasets Xml on nyt EDDTableFromInPort-vaihtoehto
joka lukee tietoaineiston kuvauksen InPort XML -tiedostossa ja yrittää luoda nauhandatasets.xmljotta aineisto voidaan lisätäERDDAP. Tämä harvoin luo XML:n käyttövalmiiksidatasets.xmlSe luo hyvän karkean luonnoksen, joka on hyvä lähtökohta ihmisen muokkaamiselle.
Olisi hienoa, jos InPort-palvelua käyttävä henkilö dokumentoi tietoaineistonsa myös käyttäisiERDDAP™Todellisten tietojen saattaminen saatavilleERDDAPVerkkopalvelut ja vastaavat Yhdysvaltain hallituksen jaNOAA&gt;[Julkinen pääsy tutkimustuloksiin (Paar) Vaatimukset](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research)asettamalla tiedot saataville verkkopalvelun kautta. Tämä on ratkaisu, jota voidaan käyttää juuri nyt. (erd.data at noaa.govOn ilo auttaa.)   
Näytä[Tämä dokumentti](/docs/server-admin/datasets#eddtablefrominport). Kiitos Evan Howell ja Melanie Abecassis.
         
    * Improvisoitu:ERDDAP™Netcdf-java 4.6.
Aiemmissa versioissa netcdf-java lukee joitakin täyttöarvoja (Ehkä netcdf-4-tiedostoissa) kuin 0. Nyt se lukee osan niistä netcdf-standardin täyttöarvoksi: -127 tavua, -32767 shortseja, -21473647 ints.UnidataUusi käytös on oikeaa käyttäytymistä. Jos tietoaineistossa oleva muuttuja alkaa näyttää yhtä näistä arvoista, joissa ne näyttivät 0, voit lisätä esimerkiksi,
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
MuuttujienaddAttributeskertomaanERDDAP™Tätä arvoa kohdellaan kuinmissing\\_value/Fill arvoa. Useimmissa tapauksissa se ei tuota toivottua tulosta: 0. Jos näin on, harkitse tiedostojen muokkaamistaNCOtai tiedostojen uudelleenkirjoittaminen. Valituksia? Ota yhteyttäUnidata;)
         
    * Lähde: New TopographyDepth
Kannustan sinua vaihtamaan kaikki tietoaineistot, jotka käyttävät OceanDepth-palettia käyttääkseen uutta TopographyDepth-palettia, joka on kuin Topografia, paitsi värit, jotka on käännetty, jotta se soveltuu syvyysarvoihin. (Positiivinen = alaspäin) Korkeusarvojen sijaan (Positiivinen =) . Suositellut asetukset tälle paletille ovat:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * Uusia ideoita: Stringmissing\\_valueja/tai |-arvo
Jos muuttuja määrittäämissing\\_valueja/tai | &gt; &gt; &gt;ERDDAP™poistaa nämä arvot tiedoista ja korvaa ne tyhjällä merkkijonolla, jotta puuttuvat arvot näkyvät tyhjinä merkkijonoina, kuten muissa aineistoissa.ERDDAP. Kiitos Margaret O'Brien, LTER ja EML.
         
    * Uusia ideoita: Tukea paikallisiin aikoihin
Aikaleimamuuttujat, joiden lähdetiedot Stringsistä voivat nyt määrittää aikavyöhykkeentime\\_zone"Armo, joka johtaaERDDAP™Paikallis-aika-alueen lähdeajat (Joitakin vakio-aikoja, osa päivänvalon säästöaikaa) sisäänZuluAjat. Luettelo voimassa olevista aikavyöhykkeiden nimistä on todennäköisesti sama kuin TZ-sarakkeen luettelossa.[Tämä pöytä](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Oletusarvo on "Zulu". Yhdysvaltain aikavyöhykkeet ovat: US/Hawaii, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, US/Itä. Aikaleimamuuttujat, joissa on numeerisia lähteitä, voit määrittää "time\\_zone"Anteeksi, mutta arvon on oltava"ZuluTai ”UTC”. Kiitos Margaret O'Brien, LTER ja EML.
         
    * NEW FEATURE: EDDTableFromAsciiFiles tukee nyt erillisiä tiedostoja
Se on viisaampi erottajan kuvaamisessa. Kiitos Margaret O'Brien, LTER ja EML.
         
    * Uusia ideoita: Jos latauspisteissä on merkittävä virhe (suuret tai pienet, esimerkiksi kadonneet tai mitättömätdatasets.xmlAsiakirja) ,ERDDAP™ilmoittaa sen nyt status.html, aivan alla "n Datasets Failed To Load" kuin ERROR:datasets.xmlKatso log.txt yksityiskohdista.
         
    * Uusia ideoita:ERDDAP™Etsitään orpoja.
MilloinERDDAP™Suuri kuorma Tiedot, nyt etsitään orpoja (Tietoja, jotka ovatERDDAP™Mutta ei sisällädatasets.xml) . Jos ne löytyvät, ne on lueteltu status.html, aivan alla "n Datasets Failed To Load" ERROR: n Orphan Datasets (Tietoja sisälläERDDAP™Mutta ei sisällädatasets.xml) =...
Jos haluat poistaa (Lataa) appelsiinistaERDDAP™Sinun on lisättävä
        &lt;tiedostotyyppi = "_anyValidType_"datasetID= "_theDatasetID_" Aktiivinen = "väärä"
ettädatasets.xmlkunnes aineisto on ladattu seuraavan suuren taakan aikana.
         
    * Viisikymppinen: Jos aineistossa on numeerinen aikaleima muuttuja kuin yksiköissä"seconds since 1970-01-01T00:00:00Z"ja sen kanssa&lt;Päivitä EveryNMillis&gt;-järjestelmä aktiivisesti, aikaleimamuuttujan vaihteluväli asetettiin virheellisesti, kun tietoaineisto päivitettiin. Kiitos John Kerfootille.
         
    * FIX: Jos&lt;Nopea uudelleenkäynnistys oli totta asennus.xml ja pyysit tietoja EDDTableFrom. Tiedostot, joita käytetään&lt;Päivitä EveryNMillis&gt;, ensimmäinen pyyntö tietokantaan epäonnistuisi, mutta myöhemmät pyynnöt onnistuisivat. Ensimmäinen pyyntö ei nyt epäonnistu. Kiitos John Kerfootille.
         
    * BUG FIX: GenerateDatasetsXml.sh ja .bat eivät toimineet komentorivillä &gt; 9 parametrin kanssa. Nyt he tekevät. Kiitos John Kerfootille.
         
    * Viisikymppinen: Uusi EDDTableFromMultidimNcFiles ei poistanut johdonmukaisesti jousia. Nyt se tekee. Tämä koskee erityisesti ARGO-tiedostoja. Kiitos Kevin O'Brien ja Roland Schweitzer.
         
    * Vinkki: Kaikki etäyhteysDAPPalvelut aloitetaan nykyaikaisemmalla koodilla. Tämä korjaa "yhteys suljetun" virheen, kun käytät joitakin EDDTableFromErddapin tietoaineistoja. Kiitos Kevin O'Brien.
         
    * Vinkki: KäsittelynorderBy............ () ja erottuva () ovat nyt palanneet tapaan, jolla he olivat ennen viimeaikaisia muutoksia: tietyllä pyynnöllä voi olla useitaorderBy............ () tai erillinen () suodatin;ERDDAP™hoitaa ne siinä järjestyksessä kuin ne on määritelty. Kiitos David Karugalle.
         
    * Viisikymppinen: Jos tiedosto on EDDTableFromDatabase ja kysely on[Lähde:CanOrderBy](/docs/server-admin/datasets#sourcecanorderby)ja/tai[Lähde:CanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)Tämän jälkeen tietokanta voi (Riippuen asetuksistadatasets.xml) osittain tai kokonaan **Vain ensimmäinen**  orderBy. () tai erottuva () . Kiitos David Karugalle.
         
    * Viisikymppinen: Viimeaikaiset lisäprosentit aiheuttivat ongelmia joidenkin kyselyiden kanssa..ncCF-tiedostot, esim. HTTP-tila 500 - Hakuvirhe: muuttuja = asema on lueteltu kahdesti tulosmuuttujaluettelossa. Kiitos Kevin O'Brien.
         
    * BUG FIX: EDDTableFromFilesillä oli vaikeuksia ladata tietoaineistoa uudelleen, kun yksi sarakkeista oli todellinen char-sarake. Kiitos Roland Schweitzerille.
         
    * Vinkki:EDDGridLähde: NCFiles Pakkaamattomat myösmissing\\_valueja •Fill-arvo vakioarvoille, jotta tiedostot, joilla on erilaiset arvot, voidaan koota yhteen. Muutoksen vuoksi, kun olet asentanut tämän uuden versionERDDAP™Ole hyvä ja aseta yksi[kovaa kovaa Lippu](/docs/server-admin/additional-information#hard-flag)JokaiselleEDDGridLähde: NCFiles Pakkaamattomat tiedot sisälläsiERDDAP.
         
    * IMPROVED: EDDTableFromNcCFiles voi nyt käsitellä tiedostoja, joilla on useita näytteitä. Tietyn aineiston on käytettävä vain muuttujaa, joka käyttää yhtä näytteen ulottuvuuksista. Kiitos Ajay Krishnanille.
         
    * EDDTableFrom...Files,&lt;SortFilesBySourceNams Nyt on mahdollista erottaa (Suositeltu) Avaruuden erilliset luettelot muuttuvista lähteistä. Kummassakin tapauksessa yksittäisiä muuttuvia nimiä voidaan ympäröidä kaksoislainoilla, esimerkiksi jos nimessä on sisäinen tila.

## Versio 1.72{#version-172} 
 (Lähde: 2016-05-12) 

*    **Uudet ominaisuudet (Käyttäjille) :** Ei mitään.
     
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Uusi EDDTableFromMultidimNcFiles[EDDTableFromMultidimNcFiles Näytä tarkat tiedot](/docs/server-admin/datasets#eddtablefrommultidimncfiles)Uusi vaihtoehto EDDTableFromNcFilesille. Se on suunniteltu käsittelemään tiedostoryhmiä, joissa on useita muuttujia, joilla on yhteiset mitat, esim. var1\\[A\\]\\[b b b b\\]Var2\\[A\\]Var3\\[b b b b\\]skalaari. Kiitos Argo Project, Aurélie Briand ja Roland Schweitzer.
    * Vinkki:ERDDAP™  (FileVisitorDNLS- ja FileVistorSubdir-luokissa) Seuraa symbolisia linkkejä Linuxissa.ERDDAP™Ei vieläkään seuraa .lnk:tä Windowsissa.
    * BUG FIX vika esiteltiin 1.70: erillinen +orderByYhdessä pyynnössä ei sallittu. Nyt ne ovat taas. Ne eivät ole molemminpuolisesti yksinoikeudellisia tai irtisanottuja. Kiitos David Karugalle.
    * Muutokseendatasets.xmlIP-osoitteiden musta lista:
IP v4 -osoitteet näyttävätERDDAP™neljä erillistä hex-numeroa.
IP v6 -osoitteet näkyvät kahdeksana erillisenä heksinä.
NiinpäERDDAP™tukee tällä listalla olevia IP-osoitteita ja:* luettelon lopussa estääkseen useita osoitteita.
    * Improvisoitu:ERDDAP™NetcdfileWriter kirjoittaa.nctiedostot poistetun NetcdfileWriteablen sijaan. Tuloksena oleviin tiedostoihin ei pitäisi olla havaittavissa muutosta. Tämä avaa mahdollisuuden tehdä suuria.nctiedostoja, jotka käyttävät.nc3 64-bittinen laajennus. Jos haluat/tarvitset sitä, lähetä pyyntöerd.data at noaa.gov.
    * IMPROVED: Monet etäverkkosivustojen linkit olivat vanhentuneita. He ovat ajan tasalla ja käyttäväthttps:Sen sijaanhttp• Aina kun mahdollista.
    * Paljon pieniä muutoksia.

## Versio 1.70{#version-170} 
 (Lähde: 2016-04-15) 

*    **Uudet ominaisuudet (Käyttäjille) :** Ei mitään.
     
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** Alla on useita suositeltuja muutoksia asennus.xml-tiedostossa.
Tee nämä muutokset nyt.
30 minuutin työ voi säästää sekaannusta tulevaisuudessa.
    * Bug fix: Ongelma oli se, että pyynnöt ohjattiin kauko-ohjaukseen.ERDDAPEpäkelvottomalla hahmolla"|Virheviesti. Tämä tapahtui vain Tomcatin viimeisimmissä versioissa. Kiitos Rusty Holleman, Conor Delaney ja Roy Mendelssohn.
    * Bug fix:ERDDAP™Käyttää ajantasaista versiota netcdf-javasta (Se on pitkä tarina) joka sisältää NCML:n ajantasaisen tuen, joka korjaa NCML LogicalReducen ongelman, joka ei toimi odotetulla tavalla. Metatietoihin voi tulla pieniä muutoksia, jotkaERDDAP™Netcdf-javan kautta.nc,.hdf.grib ja .bufr. Kiitos Favio Medrano.
    * Uusi[EDDTableAggregateRows](/docs/server-admin/datasets#eddtableaggregaterows)Voit tehdä yhdistetyn EDDTable-tietoaineiston kahdesta tai useammasta EDDTable-tietoaineistosta, joilla on samat tietomuuttujat käyttäen samoja yksiköitä. Kiitos Kevin O'Brienille.
    * Uusia vaihtoehtoja EDDTableFromDatabase ([Lähde:CanOrderBy](/docs/server-admin/datasets#sourcecanorderby)ja[Lähde:CanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)) määrittää, onkoERDDAP™tietokanta, tai molemmat, käsitellä erottuva jaorderBy  (Kaikki variantit) rajoituksia. Kiitos David Karugalle.
    * Voit nyt asettaa yksityisen tietoaineiston grafiikat ja metatiedot yleisön saataville uuden kautta.&lt;Grafiikka: Julkinen&lt;/grafiikka &gt; (Docs/server-admin/datasets#graphsaccessibleto Näytä tarkat tiedot) Tag. Kiitos Emanuele Lombardille.
    * Jos merkkijono siirtyy GenerateDatasetsille Xml tai DasDds ympäröivät kaksinkertaiset lainaukset. (Aivan kuin se olisi JSON) . Kiitos John Kerfoot ja Melanie Abecassis.
    * GenerateDatasets Xml tukee nyt "oletuksena" saada oletus ja "ei mitään" saada tyhjä jono (Työskentelet tarjousten kanssa tai ilman) . Tämä ratkaisee joitakin ongelmia, jotka liittyvät tyhjien merkkijonojen ohittamiseen.
    * GenerateDatasetsissa XML, kaikilleEDDGridFiles ja EDDTable Files-aineisto, jos näyte FileName, jonka määrität, on " (Tyhjä jousi) , se käyttää viimeinen vastaava tiedostoName hakemistosta + regex + recursive = totta.
    * Päivitetty: Selainkoodi, jota käytetään GenerateDatasetsXmlin ja DasDdsin tulosten näyttämiseen Linux-tietokoneissa, oli vanhentunut ja antoi omituisen viestin Netscapesta. Nykyaikainen Linux-työkalu: xdg-open. Kiitos Melanie Abecassis.
    * TheallDatasetsDatalla on nyt"files"sarake, joka osoittaa /tiedostojen linkin URL-osoitteen (Jos on yksi) aineiston osalta.
    * Lisää yleistä turvallisuuttasiERDDAP™Muuttamalla tomcat-hakemistoon ja BigParentDirectoryan liittyviä oikeuksia:
         (Alla olevat käskyt ovat Linuxille. Muiden OS:n kohdalla tehdään analogisia muutoksia.) 
        * Muuta "ryhmä" tomcatiksi, käyttäjänimeksi tai pienen ryhmän nimeksi, joka sisältää tomcatin ja kaikki Tomcatin ylläpitäjätERDDAPesim.
chgrp - R_yourUserName_ apache-tomcat-_8.0.23_
Chgrp - R_your KäyttäjäName BigParentDirectory
        * Muuta lupia niin, että Tomcat ja ryhmä ovat lukeneet, kirjoittaneet, toteuttaneet etuoikeuksia.
chmod - R ug +rwx apache-tomcat-_8.0.23_
chmod - R ug +rwx _bigParentDirectory_
        * Poista "muut" käyttäjän lukemis-, kirjoitus- tai suoritusoikeudet:
chmod - R o-rwx apache-tomcat-_8.0.23_
chmod - R o-rwx_bigParentDirectory_
Tämä on tärkeää, koska se estää muita käyttäjiä lukemasta mahdollisesti arkaluonteisia tietoja.ERDDAP™tiedostojen, lokitiedostojen ja tiedostojen asentaminen yksityisistä tietoaineistoista.
    * Tunnistus-/login-järjestelmä on uusittu. Kiitos Thomas Gardnerille, Emanuele Lombardille ja Yhdysvaltain uudelle hallitukselle.[HTTPS-standardi](https://home.dotgov.gov/management/preloading/dotgovhttps/).
        * Autentikointi = avoin vaihtoehto poistettiin. Se oli vanhentunutta.
        * Uusi, suositeltu,[Todentaminen = Google](/docs/server-admin/additional-information#google)Vaihtoehtoja käytetään Google allekirjoittaa (Lähde: OAuth 2.0) sallia kaikille, joilla on Googlen sähköpostitili (mukaan lukien Google hallinnoi tilejä kuten@noaa.gov) Kirjaudu sisään.
        * Uusi,[Autentikointi = sähköposti](/docs/server-admin/additional-information#email)Vaihtoehtona on varmuuskopiointi = google. Käyttäjät, joilla on&lt;Käyttäjä &gt; Tag indatasets.xmlKirjaudu sisään lähettämällä heille sähköpostia, jossa on erityinen linkki.
        * Asennuksessa.xml, vaihda kuvaus&lt;Todentaminen &gt; olla
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

        * Asennuksessa.xml, lisää tämä alapuolelle&lt;Todentaminen &gt; Tag
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

        * Käyttäjät, jotka eivät ole kirjautuneet sisään, voivat käyttäähttptai taihttpsURL-osoitteet (jos olet asentanut&lt;BaseHttpsUrl&gt; in your setup.xml. Kiitos Yhdysvaltojen uudesta hallituksesta[HTTPS-standardi](https://https.cio.gov/).
        * Voit kannustaa kaikkia käyttäjiä käyttämäänhttps  (Ei ei eihttp) asettamalla&lt;&gt; &gt; ollahttpsURL. pakottaa käyttäjät käyttämään vainhttpsSinun on myös tehtävä muutoksia Apache/Tomcat-asetteluun estääksesi ei-httpspääsy. Kiitos Yhdysvaltojen uudesta hallituksesta[HTTPS-standardi](https://https.cio.gov/).
            
Asennuksessa.xml, vaihda kuvaus&lt;&gt; &gt; olla
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

        * Vaihtoehdot&lt;salasana » muuttunut. Asennuksessa.xml, vaihda kuvaus&lt;salasana &gt; olla
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

        * Asennuksessa.xml, vaihda kuvaus&lt;Spotify &gt; Olla
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

        * Nyt, jos luetteloPrivateDatasets=true in setup.xml, on vielä vähemmän tietoa aineistoista, joihin käyttäjällä ei ole pääsyä.
    * Varsinkin silloin, kun olet alunperin perustamassaERDDAPNyt voit kertoaERDDAP™Älä yritä tilata etäisyyttäERDDAP™Dataa. Kiitos Filipe Rocha Freire.
Asennuksessa.xml, juuri ennen&lt;FontFamily &gt; Lisää
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

    * asennuksessa.xml, yllä olevissa ohjeissa&lt;Sähköpostiosoite &gt;, lisää:
Jos mahdollista, aseta se turvallisen yhteyden käyttöön. (SSL / TLS) sähköpostipalvelimeen.
Jos asennus ei käytä turvallista yhteyttä sähköpostipalvelimeen, tee muutokset sen tekemiseksi.
    * Sisälläsidatasets.xmlLisää tämä linkki kuvaukseen&lt;PostBlacklist &gt; In Yourdatasets.xml:
Voit käyttää nimeä "\\*"Koko verkkotunnus, esim.\\*@example.com.
    * Koska kirjautuminen on muuttunut v1.66, lokitiedosto ei ole koskaan ajan tasalla. On aina viestejä tai viestejä, jotka odottavat kirjautumista lokitiedostoon. Voit tehdä sen ajan tasalla (hetkeksi) katsomalla sinunERDDAPTilan verkkosivuilla http://_your.domain.org_/erddap/status.html .
    * HashDigest...
    * Pieni muutos (Kirjoittanut String2.canonical) Tämä auttaa pitämään asiat liikkeessä nopeasti, kunERDDAP™Se on erittäin kiireinen ja käsittelee myös paljon dataa.
    * vahvasti Suositus: Lopeta käyttö&lt;ContublicSourceUrl &gt; Sisällädatasets.xmlIP-numeron muuntaminen tietoaineistossa&lt;sourceUrl&gt; (esim. http://192.168.#.#/ ) Domainin nimi (esim.httpMy.domain.org/) . Tästä eteenpäin uusia tilauksia http://localhost , http://127.0.0.1 ja http://192.168.#.# URL-osoitteita ei sallita turvallisuussyistä. Käytä aina yleistä verkkotunnusta.&lt;sourceUrl&gt; Tag (Tarvittaessa DNS-ongelmat) Voit käyttää[/etc / hosts pöytä palvelimellasi](https://linux.die.net/man/5/hosts)ratkaista ongelma muuntamalla paikalliset verkkotunnukset IP-numeroiksi ilman DNS-palvelinta. Voit testata, jos tietty verkkotunnus saadaan kunnolla ratkaistua käyttämällä
_some.domain.name_
    * IngeneratDatasets.xml, for etätiedot (Esimerkkinä kolme palvelinta) automaattisesti luotudatasetIDNe ovat muuttumattomia useimmille verkkotunnuksille. Muutama verkkotunnus, ensimmäinen osa (a. Nimi) automaattisesti tuotettudatasetIDtulee olemaan vähän erilainen. Nimillä, joilla oli yksi osa, on nyt kaksi osaa. Esimerkiksi tietoaineistot http://oos.soest.hawaii.edu Aiemmin johtidatasetIDHavaijilla aloitettu, mutta nytdatasetIDAlkuperäisnimi Hawaiii's Theest. Jos tämä aiheuttaa ongelmia sinulle, lähetä minulle sähköpostia. Siellä voi olla työpaikka.
    * Cassandra-kuljettaja päivitettiin cassandra-ohjain-core-3.0.0.jariin, joten Cassandra v3. EDDTableFromCassandra ei hyödynnä Cassandrassa uusia ominaisuuksia. v3. Cassandra-indeksit voivat olla monimutkaisempia, muttaERDDAP™käyttää edelleen Cassandra v2 -indeksimallia, joka olettaa, että indeksoitu sarake voidaan suoraan kyseenalaistaa.'='rajoituksia. GenerateDatasets EDDTableFromCassandra ei enää havaitse sarakkeita indekseillä; jos indeksi on yksinkertainen, se on määritettävä.datasets.xmlkäsin. Jos tarvitset tukea monimutkaisempiin indekseihin tai muihin uusiin ominaisuuksiin, pyydämme sähköpostia.erd.data at noaa.gov.
&#33;&#33;&#33; Jos käytät Cassandra 2.x:ää, jatka käyttöä.ERDDAP™V1.68 kunnes päivität Cassandra 3.x:n.
    * Jars ja Classpath - Lähes kaikki kolmannen osapuolen .jar-tiedostot päivitettiin uusimpiin versioihinsa.
        * slf4j.jar on lisätty luokkaan /lib.
        * Joo. Jar ja tsik. Poistettiin libistä ja luokasta.
        * Jos saat virheilmoituksia luokkista, joita ei löydy, kun kokoat tai käytätERDDAP™tai yksi sen työkaluista, vertaa komentolinjan luokkapolkuaERDDAP&gt;[Nykyinen luokka](/docs/contributing/programmer-guide#development-environment)Selvitä, mitä .jars on kadonnut luokkatiestäsi.

## Versio 1.68{#version-168} 
 (Lähde: 2016-02-08) 

*    **Uudet ominaisuudet (Käyttäjille) :** Ei mitään.
     
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    *   [EDDGridFromFiles Aggregation, tiedostonimi tai globaali metatieto](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)-----
Kaikki variaatiotEDDGridFromFiles voi nyt koota tiedostoryhmän lisäämällä uuden vasemman ulottuvuuden, yleensä ajan, joka perustuu kunkin tiedostonimen arvoon tai kunkin tiedoston arvoon.
    * IMPROVED: Olemme aiemmin ehdottaneet, että haluat luodaEDDGridErddap-tietokanta omassadatasets.xmlTämä viittaus ja uudelleenpalvelin jplMURSST-tietokanta meidänERDDAP. Koska aineistosta on nyt olemassa uusi versio, tämä tietoaineisto poistetaan. Jos sinulla on nämä tiedot sisälläsiERDDAP™Lisää tämä uusi tietoaineisto
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Jos haluat poistaa vanhan jplMU:nRSST-tietokanta sinunERDDAP™  (Se on sinun valintasi) Vaihda sen aktiivinen asetus "todellisuudesta" "vääriin".
    * Bug fix: Tarkista BigParentDirectory, jonka olet määrittänyt asetuksessa.xml. Jos et laittaisi laukausta lopussa&lt;BigParentDirectory &gt; NimiERDDAP™Hän on luonut useita hakemistoja lisäämällä sanoja suoraan nimeen, jonka olet määrittänyt sen sijaan, että luot aliohjeita. versio 1.68,ERDDAP™Lisää hakemiston nimen loppuun, jos et määritä sitä. Joten jos et ole aiemmin määrittänyt laukausta lopussa, kun olet asentanutERDDAP™1.68 Sinun on siirrettävä ja nimettävä nämä hakemistot uudelleen **jälkeen** Suljit vanhanERDDAP™ja **Ennen ennen** Aloitat uudenERDDAP. Esimerkiksi, jos olet virheellisesti määrittänyt BigParentDirectory / Home/erdapBPD (Ei traileria) jaERDDAP™virheellisesti luotuja hakemistoja, kuten
Hotellit/erddapBPDcache
Home / ErddapBPDcopy
Home / ErddapBDdataset
Hotellit/erdapBPDflag
Home/erdapBPDlogs
Hotellit/erdapBPDlucene
ja tiedosto nimeltä/home/erdapBPDsubscriptionsV1.txt,
Sitten sinun on siirryttävä ja nimettävä ne uudelleen.
Home/erddapBPD/Cache
/ Home/erddapBPD/copy/
Home/erddapBPD/dataset
Home/erddapBPD/flag
Home/erdapBPD/logs Näytä tarkat tiedot
Home/erddapBPD/lucene
/ Home/erddapBPD/subscriptionsV1.txt
    * Bug fix: Sisällä oli bugejaEDDGridLonPM180ERDDAP™v1.66, joka tapahtui, kun lapsitiedotEDDGridLähde: Erddap
    * Bug fix: Sisällä oli bugiEDDGridFiles ja EDDTable Files inERDDAP™V1.66 aiheutti&lt;Päivitä EveryNMillis&gt;, jotta tietoaineisto ladataan uudelleenkäynnistyksen jälkeen.
    * Bug fix / Uudet ominaisuudet: Jos lapsitietokanta sisältääEDDGridAggregateexistingdimension,EDDGridkopio,EDDGridEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy tai EDDTableFromEDDGridon ...DromErddap-tietokannasta, että emotietoaineisto nyt merkitsee taustalla olevaaERDDAP™Dataa. Jos taustallaERDDAP™Data on samassaERDDAP™tilaus ja sen validointi tehdään suoraan; et saa sähköpostia, jossa sinua pyydetään vahvistamaan tilaus. Muuten, jos tilausjärjestelmä on sinunERDDAP™sammutetaan, asetetaan&lt;Reload EveryNMinutes&gt; Emoyhtiön tietoaineiston asettaminen pieneen numeroon (60?) Näin se pysyy ajan tasalla.
    * Bug fix / Uudet ominaisuudet: Jos lapsitietokanta sisältääEDDGridAggregateexistingdimension,EDDGridkopio,EDDGridEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy tai EDDTableFromEDDGridon aktiivinen = "väärä", että lapsitiedot ovat nyt ohi.

## versio 1.66{#version-166} 
 (Julkaistu 2016-01-19) 

*    **Uudet ominaisuudet (Käyttäjille) :** 
    * Grafiikka (Ei karttoja) Nyt voi olla laskevia arvoja akseleissa. Saadaksesi tämän käyttämällä Make A Graph -verkkosivua, vaihda uusi Y Axis: ylösnousemusasetukset (Oletusarvo) laskeutumaan. URL-osoitteessa, joka pyytää graafia, käytä uutta valinnaista kolmatta|"parametri"[&.x Range ja/tai & YRANG-kytkin](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)joka ei voi olla mitään (Oletusarvo) , totta tai t saada nousevia arvoja tai käyttää vääriä tai f saada laskevia arvoja. Todellinen|Väärät arvot ovat epäherkkiä. Kiitos Chris Fullilove, John Kerfoot, Luke Campbell ja Cara Wilson.
    * Käyttäjät voivat nyt määrittää kuvien taustavärin lisäämällä &.bgColor=0x_. AARRGGBB -kytkin URL-osoitteeseen, joka pyytää grafiikkaa. .bgColor Graphics Commands -osassa[Griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)ja[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands)dokumentointi. Kiitos John Kerfoot ja Luke Campbell.
    * Tabulaarisissa aineistoissa rajoitukset voivat nyt viitata min (_someVariableName_) tai max (_someVariableName_) . Näytä[min () Max () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min). Kiitos John Kerfootille.
    * Tabulaarisissa aineistoissa aikarajoitukset, joita käytetään[Nyt nyt](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)Voit määrittää millisekunnin tai millisin aikayksiköt.
    * Tabulaarisen tietoaineiston kuvapyyntö tekee nyt kartan (Ei grafiikkaa) jos x- ja y-muuttujat ovat pituusmaisia ja leveysmuuttujat (yhteensopivat yksiköt) . Kiitos Rich Signell.
    * Bug fix: Aika-akselien etiketit ja punkit olivat joskus outoja epäsäännöllisyyksiä pyytäessään useita kaavioita samanaikaisesti. (esimerkiksi verkkosivulla) . Ongelma oli SGT:n grafiikkakirjastossa.ERDDAP™käyttää (Yksi muuttuja oli staattinen, jota ei olisi pitänyt) . Kiitos Bradford Butmanille.
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * On tietoturvariski, että laitat sähköpostisalasanasi selkeään tekstitiedostoon, kuten setup.xml. Tämän ongelman lieventämiseksi suosittelemme vahvasti:
        1. Lataa sähköpostitili vainERDDAPKäyttö, esim. erddap@yourInstitution.org Sillä on myös muita etuja, erityisesti enemmän kuin yksiERDDAP™Järjestäjälle voidaan antaa pääsy kyseiseen sähköpostitiliin.
        2. Tee setup.xml-tiedoston rw luvat (Lukeminen + kirjoittaminen) Käyttäjä, joka käyttää Tomcatia jaERDDAP™  (Käyttäjä: Tomcat?) Ei lupaa (Älä lue tai kirjoita) ryhmälle ja muille käyttäjille. Kiitos Filipe Rocha Freire.
    * Uusi[ArchiveaDataset](/docs/server-admin/additional-information#archiveadataset)Työkalu yksinkertaistaa työskentelyä.tar.gzarkistoidaan tietoaineiston alijoukkona muodossa, joka soveltuu arkistoimiseen (Erityisesti,NOAANCEI) . Tästä pitäisi olla hyötyä monilleERDDAP™useissa tilanteissa, mutta erityisesti ryhmissäNOAA.
    * Uusi tiedostotyyppi[EDDGridLähde: NCFiles Unpacked](/docs/server-admin/datasets#eddgridfromncfilesunpacked)Se on varianttiEDDGridLähde: NCFiles. Erona on, että luokka purkaa kaikki tiedostot ennenEDDGridFiles katsoo tiedostoja:
        
        * Pakkaa pakattuja muuttujia, jotka käyttävätscale\\_factorja/taiadd\\_offset.
        * Se edistää kokonaismuuttujia, joilla on \\Unsigned=true attributes suurempaan kokonaislukutietotyyppiin, jotta arvot näkyvät allekirjoittamattomina arvoina. Esimerkki = True Tate (8 bittiä) Muuttujasta tulee lyhyt (16 bittiä) muuttuja.
        * Se muuntaa arvoa jamissing\\_valueArvot olla Nan (tai MAX_VALUE integer -tietotyypit) .
        
Tämän luokan suurin etu on, että se tarjoaa tavan käsitellä erilaisia arvoja.scale\\_factor,add\\_offsetarvoa, taimissing\\_valueeri tiedostoissa kokoelmassa. Muussa tapauksessa sinun on käytettävä työkalua, kuten[NCML](/docs/server-admin/datasets#ncml-files)tai tai[NCO](/docs/server-admin/datasets#netcdf-operators-nco)muuttaa kunkin tiedoston erojen poistamiseksi, jotta tiedostot voidaan käsitelläEDDGridLähde: NCFiles. Jotta tämä luokka toimisi kunnolla, tiedostojen on noudatettava CF-standardeja. Kiitos Philippe Makowskille.
    * Uusi tiedostotyyppi[EDDGridLonPM180](/docs/server-admin/datasets#eddgridlonpm180)Voit muuttaa tietoja, joiden pituusarvot ovat yli 180 (Esim. vaihteluväli 0-360) aineistoihin, joiden pituusarvot vaihtelevat -180 - 180 (Longitude Plus tai Minus 180, joten nimi) . Suuri etu datajoukkojen tarjoamisessa, joiden pituusarvot ovat alueella -180 - 180, on se, ettäOGCPalvelupalvelut (esim.WMS) Tarvitaan pituusarvoja tällä alueella. Kiitos Lynne Tablewski, Fabien Guichard, Philippe Makowski ja Martin Spel.
2016-01-26 Päivitys: Eeek&#33; Tämä on vika, joka tapahtuu, kun lapsitiedot ovatEDDGridFromErddap viittaa tietoaineistoon samassaERDDAP. Tämä vika on kiinnitettyERDDAP™v1.68.
    * Sisällä[GenerateDatasetsXml](/docs/server-admin/datasets#generatedatasetsxml)uusi tietotyyppi,EDDGridLonPM180FromErddapCatalogin avulla voit luodadatasets.xmlforEDDGridLonPM180 aineistoa kaikistaEDDGridTietoja eräässäERDDAPPituusarvot ovat yli 180.
    * KaikilleEDDGridTietoja, sisäändatasets.xmlNyt voit käyttää valinnaista
[...]&lt;Saatavuus ViaWMS&gt; Totta|Väärin väärä&lt;/ saavutettavissa ViaWMS&gt; (Docs/server-admin/datasets#accessibleviawms)   (Oletus = totta) . Tämän asettaminen valheellisesti poistaaWMSpalvelua tälle aineistolle. Jos se on totta, aineistoa ei välttämättä ole vielä saatavillaWMSMuista syistä (Ei lat- tai lon-akseleja) . Tämä on erityisen hyödyllistä aineistoille, jotka ovat olemassa itse ja jotka on käärittyEDDGridLonPM180, jolloin vain LonPM180-versio on saatavillaWMS.
    * Asennuksessa.xml voit määrittää eri oletusvärin kuvien taustalle. Väri on määritelty 8-numeroiseksi heksadesimaaliarvoksi muodossa 0x_AARRGGB_, jossa AA, RR, GG ja BB ovat läpinäkymättömät, punaiset, vihreät ja siniset komponentit, jotka on määritelty 2-digit heksadecimal numeroiksi. Kankaat ovat aina valkoisia, joten (Semi -) Läpinäkyvä graafinen taustaväri sekoittuu valkoiseen kankaaseen. Oletusarvo on sininen:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Kiitos John Kerfoot ja Luke Campbell.
    * Asennuksessa.xml, voit määrittää maksimikoko[Lokitiedosto](/docs/server-admin/additional-information#log)  (kun se nimetään uudelleen kirjautumaan. Txt. Edellinen ja uusi logiikka. Txt on luotu) MegaBytesissä. Minimi sallittu on 1. Suurin sallittu on 2000. Oletusarvo on 20 (MB) . Esimerkiksi:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * Sisällädatasets.xml[ ]&lt;fgdcfile &gt; (Docs/server-admin/datasets#fgdcfile Näytä tarkat tiedot) tai [&lt;Iso19115File[muokkaa wikitekstiä] (Docs/server-admin/datasets#iso19115file Näytä tarkat tiedot) Nyt voi olla paikallinen tiedosto (Kuten ennen) tai URL (joka ladataan niin, että on paikallinen kopio) . JosERDDAP™ei voi ladata tiedostoa, tietojen lataaminen jatkuu, mutta aineistossa ei ole fgdc- tai iso19115-tiedostoa.
    *   EDDGridFiles ja EDDTable FromFiles-aineistot voivat nyt käynnistää uudelleen (järjestelmä, jokaERDDAP™käyttää, kun tietoaineistot ladataan ensimmäisen kerranERDDAP™Käynnistetään uudelleen) . Tämä nopeuttaa käynnistymistäERDDAP.
2016-01-26 Päivitys: Eeek&#33; Tässä on vika, joka aiheuttaa&lt;Päivitä EveryNMillis&gt;, jotta tietoaineisto ladataan uudelleenkäynnistyksen jälkeen. Tämä vika on kiinnitettyERDDAP™v1.68.
    * Nopean uudelleenkäynnistysjärjestelmän yleinen parannus mahdollistaaERDDAP™Tietojen lataaminen nopeammin, kunERDDAP™on aloitettu uudelleen.
    * Kaikki Kaikki Kaikki KaikkiEDDGridFiles ja EDDTable Files-aliryhmät hyväksyvät nyt uuden&lt;Regex&gt;-tunniste, joka on yleensä määritelty alla&lt;rekursiivinen &gt; Jos rekursiivinen on "tosi", vain täydet aliohjausreitit, jotka vastaavat polkua Regex. (Oletusarvo =") hyväksytään. Samoin A&lt;sourceUrl&gt; Tag in aEDDGridAggregateExistingDimension voi nyt sisältää PathRegex-ominaisuuden. (Oletusarvo =") .
    * Oletusarvoa&lt;PartialRequestMaxBytes&gt; in setup.xml on nyt 490 000 (490 MB) . Tämä estää joitakin ongelmia / ajatuksia, jotka liittyvät tietojen saamiseen THREDDS-tietopalvelimilta. Kiitos Leslie Thornelle.
    * Pieni muutos lokijärjestelmään on mahdollistaERDDAP™olla responsiivinen, kun se on hyvin, hyvin kiireinen. Tiedot on nyt kirjoitettu levyaseman lokitiedostoon melko suurissa ketjuissa. Etu on se, että se on erittäin tehokas -ERDDAP™Älä koskaan estä tietojen kirjoittamista lokitiedostoon. Haittapuolena on, että loki päättyy lähes aina osittaiseen viestiin, jota ei saa päätökseen ennen kuin seuraava naarmuunnos on kirjoitettu.
    * Bug fix liittyy inotify ja&lt;Päivitä kaikki ns. (Docs/server-admin/datasets#updateeverynmillis) järjestelmänEDDGridFiles ja EDDTable Files-aineistot: Ei ole enää tarpeen määrittää suurta fs.inotify.max \\ \\ \'watches tai fs.inotify. Sisällä on bugiJavaTämä aiheuttaa joitakin osiaJavaInotify/WatchDirectory -järjestelmä, jota ei kerätä, kun ne on viimeistelty; lopulta zombie-inotify-kellojen tai -tapahtumien määrä ylittää määritetyn enimmäismäärän.ERDDAP™Nyt toimii tämän ympäriJavaBug.
Myös inotify-lankojen määrä on lueteltu status.html-verkkosivulla, joten voit pitää silmällä sen käyttöä. Tyypillisesti on olemassa 1 inotify-lanka perEDDGridFiles ja EDDTable Files-aineisto.
    * Bug-korjaus: monissa paikoissa, sen sijaan, että palautus tapahtuisi, syntyi uusi virhe, joka sisälsi vain lyhyen version alkuperäisestä virheviestistä ja ilman pino jälkiä. Nyt, kun syntyy uusi virhe, se sisältää koko alkuperäisen poikkeuksen, esimerkiksi heittää uutta poikkeusta. ("Uusi viesti", e) ;
Kiitos Susan Perkins.
    * Bug fix: viime aikoina (V1.64?) Jos a...datasetIDURL-osoitetta pyydettiin,ERDDAP™Lisää .html URL-osoitteeseen. V1.64:ssä tämä epäonnistui (Väärin muotoiltu URL-osoite syntyi ja epäonnistui) . Nyt tämä toimii taas. Kiitos Chris Fullilovelle.

## versio 1.64{#version-164} 
 (2015-08-19) 

*    **Uudet ominaisuudet (Käyttäjille) :** 
    * Nyt on ohjeita salasanasuojatun yksityisenERDDAP™Dataa (https://) kauttacurljaPython. Nähdään[curl](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl)ja[Python](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python)ohjeita.
Kiitos Emilio Mayorga NANOOS ja Paul Janecek Spyglass Technologies.
         
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    *   ERDDAP™Nyt tarvitaanJava1.8+.
        Java1.7 Saavuttaa[Elämän loppu](https://www.oracle.com/technetwork/java/eol-135779.html)  (Ei enää tietoturvapäivityksiä) huhtikuussa 2015. Tämä versioERDDAP™Ei toimi versioiden kanssaJavaAlle 1.8. Jos päivitätJava1.7 (tai aikaisemmin) Päivitä myös Tomcat. Nähdään[ERDDAP™Aseta ohjeita](/docs/server-admin/deploy-install)Lataa linkkejä ja neuvoja.
    * Uusi datan tarjoajamuoto.
Kun tietopalveluntarjoaja tulee luoksesi toivoen lisättävän joitakin tietojaERDDAP™voi olla vaikeaa ja aikaa vievää kerätä kaikki metatiedot, joita tarvitaan tietojen lisäämiseen.ERDDAP. Useita tietolähteitä (.csv-tiedostoja, Excel-tiedostot, tietokannat) Ei sisäisiä metatietoja, jotenERDDAP™sillä on uusi datantarjoajamuoto, joka kerää metatietoja palveluntarjoajalta ja antaa tietojen tarjoajalle muita ohjeita, mukaan lukien laajat ohjeet tietokantoihin. Toimitetut tiedot muunnetaandatasets.xmlMuotoilu ja sitten sähköpostitseERDDAP™Hallinnollinen (Sinä) ja kirjoitettu (liitetty) BigParentDirectory/logs/dataProviderForm.log. Näin muoto puoliautomatisoi prosessin saada tietoaineistonERDDAP™muttaERDDAP™Järjestäjän on vielä täytettävädatasets.xmlKlikkaa ja käsittele datatiedoston hankkimista (s) Palveluntarjoaja tai yhteys tietokantaan. Lisätietoja, katso[Datan tarjoaja Muotokuvaus](/docs/server-admin/datasets#data-provider-form).
    * Uusi Uusi Uusi&lt;AxisNDigits &gt;
voidaan käyttääEDDGridFilejä (Näin ollen NCFiles ja MergeIRFiles) ,EDDGridAggregateexistingdimension,EDDGridkopioida jaEDDGridSideBySide-tietoaineistot määrittävät, kuinka täsmällisesti eri tiedostojen akseliarvot ovat (Kuinka monta numeroa) 0 = ei tarkistusta (Älä käytä tätä&#33;) 1-18 tarkkuuden lisäämiseksi tai 20 (Oletusarvo) Tarkkaa tasa-arvoa. n = 1-18,ERDDAP™varmistaa, että ensimmäiset kaksinkertaiset arvot (tai tai (+1) Div 2 kelluville arvoille) ovat tasa-arvoisia.
        &lt;AxisNDigits &gt; korvaa&lt;AxisValuesAreEqual, joka on nyt poistettu. AxisNDigits = 20. "väärin" arvo (Älä tee tätä&#33;) Muutetaan otteluksi AxisNDigits=0.
    *   EDDGridFiles ja EDDTable FromFiles latautuu erittäin hitaasti, kun käytät tätä versiotaERDDAP.
        ERDDAP™Säilyttää nyt sisäisen tiedoston tiedot hieman eri tavalla, joten sisäinen tiedostotaulukko on rakennettava uudelleen. Älä huoli. Mikään ei ole väärin. Se on yksi kerta.
    * Etälähteen tiedostot
        EDDGridFromNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFiles antavat tiedostojen olla etätiedostoja hakemistossa, johon on pääsy.http://  (Ehkähttps://ftp:/, mutta ei ole testattu) jos etäpalvelin tukee[Range-pyynnöt](https://en.wikipedia.org/wiki/Byte_serving)pyynnön otsikko. THREDDS ja Amazon S3 tukevat Range-pyyntöjäHyraxEi. Tämän järjestelmän avulla voit käyttää tietoja etätiedostoissa lataamatta tiedostoja. (Mikä on hyödyllistä, jos etätiedostot ovat liian volumiinisia) Näiden tiedostojen käyttö on huomattavasti hitaampaa kuin pääsy paikallisiin tiedostoihin tai jopa etäkäyttöön.OPeNDAPLähde.
Tämä sisältää"files"Amazon S3:ssa, koska ne ovat saatavillahttp://. Jos S3-objektit ovat kuin tiedostonimiä (Sisäinen / kuin Linux-hakemisto) ,ERDDAP™Tiedostojen saatavuus voidaan tehdä myös kauttaERDDAP&gt;"files"järjestelmä. Tätä varten S3-tunnustuksesi on oltava ~/.aws/credentials (Linux, OS X tai Unix) tai C: Username.aws. (Windowsissa) palvelimen kanssaERDDAP. Nähdään[Amazon SDK -dokumentointi](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1).
    * GenerateDatasets Xml on uusi, epätavallinen vaihtoehto: EDDsFromFiles.
Tämä käy läpi tiedostojärjestelmän (Etäjärjestelmä, kuten Amazon S3, jos objekteilla on tiedoston kaltaisia nimiä) ja luodadatasets.xmlSarjassa on useita aineistoja. Kilometri voi vaihdella. Tämä toimii hyvin, jos tiedostot on järjestetty niin, että kaikki tietotiedostot tietyssä hakemistossa. (ja sen alihankkijat) Soveltuu yhteen tietoaineistoon (Kaikki SST 1 päivän komposiitit) . Muuten (jos hakemisto sisältää joitakin SST-tiedostoja ja joitakin Chlorophyll-tiedostoja) Tämä toimii huonosti, mutta voi silti olla hyödyllistä.
    * Ohjelmoijat: uusia /lib .jar-tiedostoja.
Jos kokoatERDDAP™Huomioi .jar-tiedostot luokkapath -cp-parametrissa, joka on lueteltu .jar-tiedostoissaERDDAP™ [Ohjelmoijan opas](/docs/contributing/programmer-guide).
    * meri | _ _ _ _ _ _ _ _
Jos käytät CF-standardin nimimeri \\ water \\saliniteettia mihin tahansa muuttujaan, kehotan sinua siirtymään seawater \\practical \\salinity, joka on käytettävissä.[CF Standard Name -taulukon 29 versio](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)  (Muutamia aiempia versioita - en tiennyt) . Tämä nimi viittaa siihen, että tämä on käytännön suolaisuusarvo.Practical Salinity Units  (PSU) Toisin kuin vanha g/kg. Kanoniset yksiköt ovat erilaisia, mutta silti uskomattoman hyödyllisiä: 1 1 (Luultavasti viitatenPSUPSS-78) Toisin kuin 1e-3 (Epäilemättä g/kg) Merenkulku | | _ _ _\\[Hei,UnidataCF:llä: Tunnistamme arvot, jotka käyttävät muita asteikoita, kuten Fahrenheit tai Celsius, asteikon nimi tai jokin variaatio. Miksi suolayksikköjä ei voi tunnistaa mittakaavassa, esim. PSS-78? PSS-78-arvot ovat "ei-toivottuja", mutta on olemassa asteikko, eikö niin? Jos keksin uuden käytännön suolapitoisuusasteikon, jossa arvot ovat 0,875 kertaa PSS-78-arvot, olisiko kanonisten yksiköiden silti oltava 1? Miten käyttäjä voi erottaa? Yksiköt 1e-3 ja 1 eivät ole kuvaavia tai hyödyllisiä käyttäjille, jotka yrittävät selvittää, mitä numerot osoittavat.\\]

## Versio 1.62{#version-162} 
 (2015-06-08) 

*    **Uudet ominaisuudet (Käyttäjille) :** 
    * For ForEDDGridaineistot, käyttäjät voivat nyt tehdä Graph Type: Surface grafiikka tahansa yhdistelmä numeerisia akselia, ei vain pituus vs. leveys. Näin voit tehdä x versus y (ennustettu) Kuvia ja erilaisia[Hovmöller-diagnoosi](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram)Esimerkiksi pituus vs. syvyys tai aika vs. syvyys.\\[Huomautus: Jos syvyys on y-akselilla, se todennäköisesti käännetään siitä, mitä haluat. Pahoittelut, ettei se ole vielä vaihtoehto.\\]Kiitos Cara Wilsonille ja Lynn DeWittille.
    * On olemassa uusi[Oceanic/Atmospheric Acronym Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html)jonka avulla voit muuntaa yhteisen meri- ja ilmakehän akronyymin kokonaiseksi nimeksi.
    * On olemassa uusi[Oceanic / Ilmakehä Muuttuva nimi Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html)jonka avulla voit muuntaa yleisen valtameren tai ilmakehän muuttujan nimen kokonaiseksi nimeksi.
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    *   Java7/8
        OracleEi enää tukea (Tarjoaa turvavirheitä)  Java7.ERDDAP™tukee edelleenJava7, mutta siirryJava8. Seuraava vapautusERDDAP™Ehkä tarvitaanJava8.
    *   valid\\_minMax/range
Aiemmin ja nyt, josdataVariableolisi ollutscale\\_factorjaadd\\_offsetmetatiedot,ERDDAP™poistaa tietoarvot ja poistaa metatiedot. aikaisemmin,ERDDAP™Ei muokattu/pakattuvalid\\_range,valid\\_min,valid\\_maxMetadata (joka yleensä sisältää pakattuja arvoja) Byscale\\_factorjaadd\\_offset. Nyt se tekee. Etsitkö sinäERDDAP™"Valid" ja varmista, että kaikki muuttujatvalid\\_range,valid\\_mintaivalid\\_maxon oikeat arvot, kun tiedot näkyvät uudessa versiossaERDDAP. Näytä[valid\\_rangemin/max dokumentointi](/docs/server-admin/datasets#valid_range).
    * ACD-1,3
aikaisemmin,ERDDAP™  (GenerateDatasets XM) Käytetty/suositeltu alkuperäinen (1.0) versiosta[NetCDFTietoaineiston löytämisen yleissopimus](https://wiki.esipfed.org/ArchivalCopyOfVersion1)jota kutsuttiin "UnidataDataset Discovery v1.0 on maailmanlaajuinen yleissopimus jaMetadata\\_Conventionsattribuutit. Nyt suosittelemme[ACDD versio 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Ratifioitiin vuoden 2015 alussa ja sitä kutsutaan nimellä ACD-1.3. Onneksi ACD-1.3 on täysin taaksepäin yhteensopiva versio 1.0:n kanssa. Me uskomme, että sinä[Vaihda ACD-1.3](/docs/server-admin/datasets#switch-to-acdd-13). Ei ole vaikeaa.
    * GenerateDatasets XML Attributes
Muutoksia on tehty paljon, jotta voidaan parantaa&lt;addAttributesGenerateDatasetsin ehdottamat arvot Globaalit sopimukset,creator\\_name/email/url, avainsanat, yhteenveto ja otsikkoominaisuudet sekä muuttujillelong\\_nameattribuutti. Muutokset liittyvät ACD-1.3:n uuteen käyttöön.
    * EDDTableFromSOSDataa
Uusien tyyppien satunnainen lisäysSOSpalvelimille ja vanhoille palvelimille tehdyt muutokset vaikeuttavatERDDAP™tunnistaa palvelimen tyypin automaattisesti palvelimen vastauksista. Käyttäminen [&lt;SosServerType » (Docs/server-admin/datasets#eddtable frommsos-skeleton-xml)   (IO _NDBC, IOOS _NOSOOSTethystai kuka) Nyt se on vahvasti korjattu. Jos jollakin tämän tyyppisistä tietovaroistasi on ongelmia uudessa versiossaERDDAPKokeile uudelleen GenerateDatasets XML:ääSOSPalvelin synnyttää uuden roskandatasets.xmltätä dataa varten. GenerateDatasets XML antaa sinun kokeilla erilaisia&lt;SosServerType&gt;-vaihtoehdot, kunnes löydät oikean palvelimen. Jos sinulla on vielä ongelmia, kerro minulle ongelma, jonka näet ja palvelimen URL ja yritän auttaa.
    * EDDTableFromFileNamesin tietoaineistot
joitakin ominaisuuksia, joita suositeltiinaddAttributesNyt ne ovat lähteitä. Sinun ei todennäköisesti tarvitse muuttaa mitään olemassa olevia tietoaineistoja.datasets.xml.
    * Bug fix liittyy tiettyihin pyyntöihin EDDTableFromNcCFiles-tietoaineistoihin.
Lisäsin myös suuren määrän yksikkötestejä taustalla olevien menetelmien suuriin yksikkötesteihin. (100 skenaariota) . Kiitos Eli Hunterille.
    * Bug fix/s pieniä muutoksiaEDDGridMergeri.
Kiitos Jonathan Lafite ja Philippe Makowski
    * Bug fix:EDDGridFromErddap toimii, vaikka etätietoaineistolla ei olisikaanioos\\_categoryMuuttuvia ominaisuuksia.
Kiitos Kevin O'Brien.
    * Bug fix .graph verkkosivuillaEDDGridaineistot, kun on vain yksi akselimuuttuja, jolla on enemmän kuin yksi arvo.
Kiitos Charles Carletonille.
    * Muita pieniä parannuksia, muutoksia ja korjauksia.

## Versio 1.60{#version-160} 
 (2015-03-12) 

*    **Uudet ominaisuudet (Käyttäjille) :** Ei kukaan
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Vahvistettu: päivitä palvelimen[Robotit.txt](/docs/server-admin/additional-information#robotstxt)Tiedosto sisältää:
Disallow: /erddap/files/
    * Ilmoita ongelmasta ja ratkaisusta:
Linux-tietokoneissa, jos käytät&lt;Päivitä kaikki nimet &gt; tyypin kanssa =EDDGridFiles, EDDTableFromFilesEDDGridKopioi, EDDTableCopy tai niiden alaluokat, voit nähdä ongelman, jossa tietoaineisto ei lataudu. (ajoittain tai johdonmukaisesti) Virhesanoma: "IOE-poikkeus: Käyttäjän raja inotify-tapauksissa, jotka on saavutettu tai liian monta avointa tiedostoa." Jos näin on, voit korjata ongelman soittamalla. (kuin juuret) :
echo fs.inotify.max \\_watches=65536|A/etc/sysctl.conf (käytetty)
echo fs.inotify.max = 1024|A/etc/sysctl.conf (käytetty)
Sysctl -p
Käytä suurempia numeroita, jos ongelma jatkuu. Kellojen oletusarvo on 8192. Esimerkkejä on 128.\\[Päivitys: Sisällä on bugiJavajoka aiheuttaa inotify-tapauksia, joita ei kerätä. Tämä ongelma vältetäänERDDAP™66 ja korkeampi. Paras vaihtoehto on siirtyä uusimpaan versioon.ERDDAP.\\]
    * NouchFilee-poikkeaminen Bug fix:
On olemassa vika, joka voi aiheuttaa tyypin aineistoja =EDDGridFiles, EDDTableFromFilesEDDGridKopioi, EDDTableCopy tai niiden alaluokat, joita ei ladata ajoittain virheellä "NoSuchFileException: _someFileName_". Vika liittyy FileVisitorin käyttöön ja se otettiin käyttöönERDDAP™v1.56. Ongelma on harvinainen, ja se vaikuttaa todennäköisimmin tietoaineistoihin, joissa on paljon muuttuvia tietotiedostoja.
    * Pieniä parannuksia, muutoksia ja vikoja.

## Versio 1.58{#version-158} 
 (2015-02-25) 

*    **Uudet ominaisuudet (Käyttäjille) :** 
    * Uusi["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)Järjestelmän avulla voit selata virtuaalitiedostojärjestelmää ja ladata lähdetiedostoja monistaERDDAP™Dataa. The"files"järjestelmä toimii oletusarvoisesti, muttaERDDAP™Järjestäjät voivat poistaa sen käytöstä laittamalla
```
        <filesActive>false</filesActive>  
```
SisälläERDDAP™asennus.xml-tiedosto. Erityiskiitos Philippe Makowskille, joka pysyi, kun olin hidas arvostamaan tämän ajatuksen kauneutta.
    * Aika määrä Max... Aiemmin EDDTable-tietoaineistojen aikamuuttujat, joilla oli lähes reaaliaikaisia tietoja, olivat NaN:n kohdemax, mikä merkitsi, että aineiston enimmäisarvo on hiljattain, mutta ei juuri tiedossa ja muuttuu usein. Nyt määränpäällä on todellinen arvo, josta käy ilmi viimeksi tunnettu. Monet aineistot ovat jatkuvasti päivittäneet tietoja.ERDDAP™tukee pääsyä uusimpiin tietoihin, vaikka se olisi viimeksi tiedossa. Huomaa, että uusi [&lt;Päivitä kaikki ns. (Docs/server-admin/datasets#updateeverynmillis) TukeaEDDGridFiles ja EDDTable FromFiles-tietoaineisto päivittää aikamuuttujan määränpääMax. Toinen syy tähän muutokseen on se, ettädatasetID=allDatasetsDataset sisältää nyt viimeksi tunnetun maxTime-sarakkeiden. Kiitos John Kerfootille.
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Vahvistettu: päivitä palvelimen[Robotit.txt](/docs/server-admin/additional-information#robotstxt)Tiedosto sisältää:
Disallow: /Fiilit /
Disallow: /erddap/files/
    * Esimerkkidatasets.xml----- Viime vuonna suosittelimme useita erinomaisia aineistoja rannikolla.ERDDAP™että voisit lisätäERDDAP™Vain lisäämällä muutaman rivin omaandatasets.xml. Jos lisäsit erdVH-tietoaineiston, siirry uudempiin erdVH2-tiedostoihin:
        * Tee jäljennös kaikista erdVH-tiedostoista ja vaihda kopioitudatasetIDerdVH:sta erdvH2:een ja muutetaan viittaussourceUrlErdVH:sta erdvH2:een...
        * Aseta erdVH-tiedostot aktiiviseksi = "väärä".
    * Kaikki Kaikki Kaikki KaikkiEDDGridFiles ja EDDTable Files-aliryhmät tukevat nyt&lt;Käytettävissä olevat tiedostot &gt; (Docs/server-admin/datasets#accessibleviafiles Näytä tarkat tiedot) tiedostojen saatavuus lähteen kautta"files"järjestelmät. Oletusarvoisesti tämä järjestelmä on poistettu jokaisesta tietoaineistosta. Sinun on lisättävä tagi siihen. Kiitos Philippe Makowskille.
    * Kaikki Kaikki Kaikki KaikkiEDDGridFiles ja EDDTable Files-aliryhmät tukevat nyt&lt;Päivitä kaikki ns. (Docs/server-admin/datasets#updateeverynmillis) . Oletusarvoisesti tämä järjestelmä on poistettu jokaisesta tietoaineistosta. Sinun on lisättävä tagi siihen. Dominic Fuller-Rowellin ja NGDC:n ansiosta.
    * Uusi[EdDTableFromFileNames](/docs/server-admin/datasets#eddtablefromfilenames)luo tietoaineiston palvelimen tiedostojärjestelmään kuuluvasta tiedostoryhmästä, mutta se ei palvele tietoja tiedostojen sisältä. Tämä on hyödyllinen esimerkiksi kuvatiedostojen, äänitiedostojen, videotiedostojen, sanankäsittelytiedostojen ja laskentataulukkotiedostojen kokoelmien jakamisessa. Tämä toimii käsi kädessä uuden["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)järjestelmä, jotta käyttäjät voivat ladata tiedostoja. Erityiskiitos Philippe Makowskille, joka pysyi, kun olin hidas arvostamaan tämän ajatuksen kauneutta.
    * Uusi[EDDGridEDDTable](/docs/server-admin/datasets#eddgridfromeddtable)Voit muuntaa tabulaarin tietoaineiston verkkoon. Kiitos Ocean Networks.
    * Uusi[EDDGridLähde: MergeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles)Aggregoida tietoja paikallisesta MergeIR-ryhmästä.gztiedostoja.EDDGridFromMergeIRFiles on ero, joka on ensimmäinen koodinpunainen, jota käytetäänERDDAP. Se on tehty täysin ilman apuamme. Jonathan Lafite ja Philippe Makowski R.Tech Engineering.
    * Uusi, valinnainen asennus.xml-tunnus,&lt;yksikköTestDataDir&gt;, joka määrittää hakemiston yksikkötestidatatiedostoilla, jotka ovat saatavilla uuden GitHub-varaston kautta:[ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest). Esimerkiksi:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Tämä ei ole vielä hyödyllistä, mutta se on osa siirtymistä kohti niin monen yksikkötestin suorittamista kuin mahdollista. Kiitos Terry Rankine.
    * Pieniä parannuksia, muutoksia ja korjauksia oli paljon.

## Versio 1.56{#version-156} 
 (2014-12-16) 

*    **Uudet ominaisuudet (Käyttäjille) :**   (Ei kukaan) 
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Ehkä tiedät jo[EDDGridLähde: Eddap](/docs/server-admin/datasets#eddfromerddap)ja[EdDTableFromDap](/docs/server-admin/datasets#eddfromerddap)jonka avulla voit linkittää tietoaineistoihin muissaERDDAPja ne näkyvät sinunERDDAP. Käyttäjän pyynnöt todellisista tiedoista siirtyvät näkymättömästi lähteelleERDDAP™Tiedot eivät virtaa järjestelmäsi läpi tai käytä kaistanleveyttäsi. Näytteessä on nyt suuri luettelo suositelluista tietoaineistoista.datasets.xmlerdapContent.zip. sisällyttää ne sinunERDDAP™Kaikki mitä sinun tarvitsee tehdä on kopioida ja liittää haluamasidatasets.xml. Kiitos Conor Delaneylle.
    * Jos kokoatERDDAP™Sinun täytyy lisätä jotain uutta. Jar-tiedostot sinulle[Luokka:Cp](/docs/contributing/programmer-guide#development-environment)Javac ja Java.
    * Uusi[EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra)käsittelee tietojen saamista[Cassandra](https://cassandra.apache.org/). Kiitos Ocean Networks.
    * Uusi[EDDTableFromColumnarAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles)Käsittelee saada tietoja ASCII-tiedostoista kiinteän leveyden sarakkeilla. Kiitos Philippe Makowskille.
    * Kaikki Kaikki Kaikki KaikkiEDDGridFiles ja EDDTable Files-aliluokka käyttää nyt uutta menetelmää, FileVisitor (LisättyJava1.7) kerätä tietoa tiedostoista. Tällä ei ehkä ole mitään hyötyä tiedostotietoaineiston ensimmäisestä keräämisestä, mutta se vaikuttaa olevan valtava hyöty myöhemmille kokouksille, jos se on tehty pian, kun taas OS on edelleen tiedot välitetty. Kiitos NGDC:lle.
        
Suosittelemme edelleen: Jos aineistossa on paljon tiedostoja (&gt; 1000) käyttöjärjestelmä (ja sitenEDDGridFiles ja EDDTableFromFiles) Toimii paljon tehokkaammin, jos tallennat tiedostot aliohjaussarjaan. (1 vuosi tai yksi kuukaudessa tiedostojen kanssa) Koskaan ei ole valtavaa määrää tiedostoja tietyssä hakemistossa.
        
    * Useita pieniä parannuksia EDDTableFromAsciiFiles.
    * Joitakin parannuksia EDDTableFromAsciiServiceNOS, erityisesti saada lisätietoja lähteestä. Kiitos Lynn DeWitt.
    * ISO 19115 -standardiin liittyvät pienet bugitERDDAP™tuottaa. Kiitos Anna Milanosta.

## Versio 1.54{#version-154} 
 (2014-10-24) 

*    **Uudet ominaisuudet (Käyttäjille) :** 
    * Jotkut muuttujat työskentelevät nyt ajan kanssa millisekunneissa tarkkuudella, esim. 2014-10-24T16:41:22.485Z. Kiitos Dominic Fuller-Rowellille.
*    **Pienet muutokset/Bug-korjaukset:** 
    * Bug fix: tiettyjen olosuhteiden yhdistelmä,EDDGridFromNcFile-tietoaineistot palauttivat tiedot vähennetyllä tarkkuudella (Esimerkiksi kaksinkertaisten sijasta kelluvat) . Tämä voi vaikuttaa vain &gt; 8 merkittävään lukuun. Anteeksipyyntöni. (Se oli klassinen tietokoneohjelmointivirhe: yksi väärä hahmo.) Kiitos Dominic Fuller-Rowellille.
    * Paljon pieniä muutoksia.
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Griddap-tiedot tukevat nyt aikaleima-akselimuuttujaa ja datamuuttujaa (muuttujia, joilla on aika-arvoja, muttadestinationNameMuuta kuin"time") . Kiitos Dominic Fuller-Rowellille.
    *   ERDDAP™Tukee nyt oikein millisekuntiatime\\_precision1970-01-01-00:00.000Z Yksi tarkoituksellinen omituisuus: kun kirjoitat ajat ihmislähtöisiin tiedostoihin (.csv,.tsv,.json,.xhtml) ,ERDDAP™käyttää määritettyjätime\\_precisionjos se sisältää sekuntia ja/tai desimaalisekuntia; muuten sekuntia käytetääntime\\_precision1970-01-01T00:00:00 (Johdonmukaisuus ja taaksepäin yhteensopivuus) . Kiitos Dominic Fuller-Rowellille.
    *   EDDGridFromNcFiles tukee lukemistadataVariables.
    *   .ncGriddapin kirjoittamat tiedostot voivat nyt olla StringdataVariables.
    * GenerateDatasets XML sisältää nyt lisää flushia () kehottaa välttämään tiedon ongelman, jota ei ole kirjoitettu tiedostoihin. Kiitos Thierry Valerolle.
    * GenerateDatasetsXml:n dokumentointia parannettiin erityisesti osoittamalla, että -i-kytkin toimii vain, jos määrität kaikki komentorivin vastaukset. (Esim. käsikirjoitustila) . Käsikirjoitustila on selitetty. Kiitos Thierry Valerolle.
    *   ERDDAP™ei enää salli kahta muuttujaa aineistossasourceName. (Jos joku on tehnyt sen aiemmin, se on todennäköisesti johtanut virheilmoituksiin.) Kuten ennenkin,ERDDAP™ei salli kahta muuttujaa tietoaineistossa olla samadestinationName.

## versio 1.52{#version-152} 
 (2014-10-03) 

*    **Uudet ominaisuudet:**   (Ei kukaan) 
*    **Pienet muutokset/Bug-korjaukset:** 
    * Toinen (pienempiä) Muutos tehdäERDDAP™nopeammin.
    * ISO 19115 -tiedostojen kehittäminenERDDAPLisätty äskettäin suositeltu&lt;GMD: Protocol &gt; arvot (tietoja, etsintää,OPeNDAP:OPeNDAP,ERDDAPGriddap, jaERDDAP:tabledap) sisällä sisällä sisällä&lt;Gmd: C \\ OnlineResource &gt; Kiitos Derrick Snowdenille ja John Maurerille.
    * Paljon pieniä muutoksia.
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Bug fix: GenerateDatasetsXml.sh ja DasDds.sh eivät olleet erddap.sodassa 1.48 ja 1.50. Nyt ne ovat. Kiitos Thierry Valerolle.
    * Pienet muutokset nopeustesteissä TestAllissa tekevät niistä vähemmän alttiita sattumalle. Kiitos Terry Rankine.

## Versio 1.50{#version-150} 
 (2014-09-06) 

*    **Uudet ominaisuudet:**   (Ei kukaan) 
*    **Pienet muutokset/Bug-korjaukset:** 
    * Tämä tämäERDDAP™Se on huomattavasti nopeampi kuin viimeisimmät versiot.
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:**   (Ei mitään ei) 

## versio 1.48{#version-148} 
 (2014-09-04) 

*    **Uudet ominaisuudet:** 
    *   ERDDAP™luo aina tabulaarin,datasetID=allDatasets, jolla on taulukko tiedoista kaikista tietokannoista tässäERDDAP. Voidaan kysellä kuten mikä tahansa muu tabulaari. Tämä on hyödyllinen vaihtoehto nykyiselle järjestelmälle tietojen saamiseksi ohjelmallisesti.
    * EDDTablessa on kaksi uutta tiedostotyyppiä jaEDDGrid.csv0 ja.tsv0. Ne ovat koomma- ja välilehti-eriarvotiedostoja, joilla ei ole riviä sarakkeiden nimien tai yksiköiden kanssa. Tiedot alkavat ensimmäisellä rivillä. Ne ovat erityisen hyödyllisiä käsikirjoituksissa, jotka haluavat vain yhden tiedon.ERDDAP.
*    **Pienet muutokset/Bug-korjaukset:** 
    * Karttoja voidaan tehdä pituuskaavoihin -720 - 720.
    * Uusi.ncml-vastetiedostotyyppi on kaikkien saatavillaEDDGridDataa. Se palauttaa[NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)\\-muotoinen kuvaus aineistosta (Samanlainen kuin yhdistetty .dds + .das) .
    * Bug fix: Tabular-tietojen tallentaminen.nctiedosto oli rajoitettu 100 000 arvoon muuttujia kohden. Nyt se on vain 2 Gt:n kokoinen tiedostokoko. Kiitos Kevin O'Brien.
    * Bug fix: SäästäminenMatlabMenetelmät varmistavat nyt, ettädatasetIDS muunnetaan turvalliseksiMatlabmuuttuvia nimiä. Suosittelen vahvasti, että luotdatasetIDs, jotka ovat päteviä muuttuvia nimiä: alkaen kirjeestä ja sitten vain käyttämällä A-Z, a-z, 0-9 ja \\. Näytä[datasetID](/docs/server-admin/datasets#datasetid). Kiitos Luke Campbellille.
    * Bug fix EDDTableFromDatabase: Tietyntyyppisiä tietokantoja, ei Tietokannan DATA-vastaus johti pisteettömään 30 toiseen viivästykseenERDDAP. Kiitos Greg Williamsille.
    * Bug fix:EDDGridTee grafiikka graafisella tyypillä = linjat (Merkkejä tai merkintöjä ja viivoja) X-akselimuuttuja on aika. Nyt voi olla mikä tahansa akseli. Kiitos Lynn DeWitt.
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Valmistettu: päivitettyJava  
Tämä versioERDDAP™VaatiiJava7 tai enemmän, muttaJava7 saavuttaa loppuelämänsä huhtikuussa 2015 (Pian&#33;) Nyt on hyvä aika vaihtaaJava8. NäinJava8 on täysin korjattu. KokeilenJava8. Huomaa, ettäJava6. Elämänsä päättyi helmikuussa 2013 (Ei enää turvavirheitä&#33;) .
    * Kehittäjä: Update Tomcat
Jos käytät Tomcatia, siirry Tomcatin uusimpaan versioon. Tomcat 8 on suunniteltu toimimaanJava8.
    * """ERDDAP”Ei ole enää akronyymi. Nyt se on vain nimi. En halua nimen korostavanERD. HaluanERDDAP™korostamaan instituutiotasi ja tietojasi.
    * Tyytyväinen[muokata ulkonäköäsiERDDAP™asennus, jossa korostetaan laitostasi ja tietojasi](/docs/server-admin/deploy-install#customize). Tunnin työllä voit tehdä hyviä parannuksia, jotka kestävät ikuisesti.
    * Asennuksessa.xml,&lt;DiagnosticInfo&gt; -vaihtoehto on aina sivuutettu ja käsitelty kuin arvo olisi väärä.
Valmistettu: Poista&lt;NäytäDiagnosticInfo&gt;-tunniste ja siihen liittyvät tiedot asetuksesta.xml.
    * Asennus.xml, oletus&lt;drawLandMask”Oli”, mutta nyt se on ”alla”, mikä on parempi yleinen oletusarvo. (Toimii hyvin kaikkien aineistojen kanssa) .
    * GenerateDatasetsXml.sh- ja DadDds.sh Linux-skriptit käyttävät nyt bashia kuin csh-sarjoja. Kiitos Emilio Mayorgalle
    * GenerateDatasets Xml ja DasDds luovat omat lokitiedostonsa (GenerateDatasetsXml.log ja DasDds.log) Tuota tiedostot (GenerateDatasetsXml.out ja Dadds.out) _bigParentDirectory_/logs/, eikä koskaan laittaa tuloksia leikepöydälle.
    * GenerateDatasets Xml tukee nyt -i-komentoriviparametria, joka lisää tuoton määritettyyn tiedostoon tietyssä paikassa. Nähdään[dokumentointi](/docs/server-admin/datasets#generatedatasetsxml). Kiitos Terry Rankine.
    * EDDTableFromDatabase tukee&lt;ColumnNameQuotes »&lt;/columnNameQuotes&gt;, jolla on voimassa olevat arvot (Oletusarvo) &gt; tai ei mitään. Tämä ominaisuus (Jos) Käytetään ennen ja jälkeen sarakkeen nimet SQL-kyselyissä. Eri tietokantojen tyypit, jotka on perustettu eri tavoin, tarvitsevat erilaisia sarakkeen nimimerkintöjä.
    * Tabulaarinen leveys ja pituusmuuttujat ovat nyt räätälöityjälong\\_nameEsimerkki: Profile Latitude Aiemmin ne voivat olla vain leveyttä ja pituutta.
    * Tästä eteenpäin määritä "defaultDataQuery" ja "defaultGraphQuery" tietoaineiston maailmanlaajuisen metatietokannan ominaisuuksina (ts.&lt;&gt; ei erikseen&lt;defaultDataQuery &gt; ja&lt;Epäonnistunut GraphQuery &gt; tagit (Jos kuitenkin vielä tarkennat niitä sivujen kautta,ERDDAP™luo automaattisesti maailmanlaajuisia ominaisuuksia.) 

## Versio 1.46{#version-146} 
 (2013-07-09) 

*    **Uudet ominaisuudet:** 
    *    (Ei kukaan) 
*    **Pienet muutokset/Bug-korjaukset:** 
    * EDDTableFromDatabase, versiossa 1.44ERDDAP™Tietokannan taulukon nimi on merkitty väärin SQL-lauseissa. Se on nyt korjattu. Kiitos Kevin O'Brien.
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    *    ** Jos et muokkaa tavallisia viestejä.xml,
delegaatti\\[Tom\\]Sisältö/erddap/viestit.xml **   
Oletusviestit.xml-tiedosto on nyt erdapissa. Sotatiedosto, ei erddapContent.zip. Sinun ei enää tarvitse päivittää viestejä.xml.
    * Jos muutat viestejä.xml, joka kerta, kun päivitätERDDAP™Myös:
        * Tee samat muutokset, jotka olet tehnyt ennen uutta
            \\[Tom\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/viestejä.xml
Tällä kertaa: Poista\\[Tom\\]Sisältö/erddap/viestit.xml
        * Selvitä, mikä on muuttunut uudessa viestissä. (Diffin kautta) ja muokkaamaan
            \\[Tom\\]/ Sisältö/erddap/viestejä.xml-tiedosto vastaavasti.

## versio 1.44{#version-144} 
 (2013-05-30) 

*    **Uudet ominaisuudet:** 
    * EDDTable-tietoaineistot tukevat nyt &orderByMinulle mini (............) jaorderByMinMax (............)   (joka palauttaa kaksi riviä kussakin ryhmässä, ja vähintäänorderByArvon arvo) . Kiitos Lynn DeWitt.
    * On kaksi uuttatabledaptiedostotyypit:.ncCFHeader ja.ncCFMA Head (jotka palauttavat vastaavan ncdump-maisen otsikon.ncCF ja.ncCFMA-tiedostot) . Kiitos Steve Hankinille.
*    **Pienet muutokset/Bug-korjaukset:** 
    * Bug fix: .graphin ja .html-verkkosivujen lataaminen tietoaineistoille, joilla on paljon aika-arvoja, oli hidasta.ERDDAP™Se oli hidas, kun se loi ajan liukumisvaihtoehdot. Nyt se on aina nopea. Kiitos Michael Barry, OOICI ja Kristian Sebastian Blalid.
    * Bug fix: Joissakin EDDTable-tiedostotyypeissä aikarajoituksia ei aina käsitelty oikein. Nyt ne ovat. Kiitos John Maurer ja Kevin O'Brien.
    * Bug fix: Datasetit eivät kuormittaisi, kun kaikkisubsetVariablesolivat kiinteät arvomuuttujat. Nyt he haluavat. Kiitos Lynn DeWitt ja John Peterson.
    * IMPROVED: Nyt kaikki kyselyt, jotka koskevat vain alasarjan muuttujia, toimivat kuin &distinct () Se on osa kyselyä.
    * IMPROVED: nyt, kyselyihin, jotka sisältävät &.json_functionName_, _funktio Nimi = 1 tai enemmän (kausierillään) sanoja. Jokaisen sanan on aloitettava ISO 8859 -kirjeellä tai -kirjaimella, ja sitä seuraa 0 tai enemmän ISO 8859 -kirjeitä, numeroita tai . Tämä on rajoittavampaa kuinJavaKäsikirjoituksen vaatimukset toiminnallisille nimille.
    * Aika-akseli grafiikoilla toimii nyt hyvin pidemmän ajan alueilla. (80-10000 vuotta) Lyhyempi aikaväli (0.003 - 180 sekuntia) .
    *   ERDDAP™Nyt se on enemmän anteeksiantavaa, kun se sisältää ISO-8601-muotoisia aikatietoja.
    * Muutamia pieniä muutoksia ja korjauksia oli paljon.
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    *    **Päivitä uusimpaan versioon ollaksesi turvassa.**   
        ERDDAP™Turvatarkastus tehtiin. Joitakin vikoja ja heikkouksia oli. Versio 1.44 sisältää useita tärkeitä turvavirheitä ja useita muutoksia turvallisuuden ja saavutettavuuden parantamiseksi. (näön heikentyneet käyttäjät) . Versio 1.44 on suorittanut seurantaturvatarkastuksen. Kiitos kaikille Acunetixin ja USGS:n hyville ihmisille. (Ei pitäisi ollaNOAATeetkö tätä?) 
    * Uusi[EDDTableFromWFSTiedostot](/docs/server-admin/datasets#eddtablefromwfsfiles)paikallinen kopio kaikista tiedoistaArcGISMapServerWFSpalvelin, joten tiedot voidaan palauttaa nopeastiERDDAP™käyttäjiä. Kiitos Christy Caudill.
    * Uusi[EDDTableFromEDDGrid](/docs/server-admin/datasets#eddtablefromeddgrid)Voit luoda EDDTable-tietoaineiston yhdestäEDDGridDataa. Yleisiä syitä tähän ovat:
        * Näin aineistoa voidaan kyseenalaistaaOPeNDAPValintarajoitukset (jota käyttäjä on voinut pyytää) .
        * Tietoaineisto on luonnostaan tabulaarista dataa. Kiitos OOICI, Jim Potemra, Roy Mendelssohn.
    * Muuttuva nimi "syvyys" on nyt erityinen vaihtoehto "korkeudelle". Yksikön on oltava jonkinlainen "mittarien" variantti. Datan arvojen on oltava positiivisia.ERDDAP™on nyt täysin tietoinen "syvyydestä" ja tukee sitä missä korkeutta tuetaan. (esim. osana CF DSG cdm |datype = profiiliaineistoa) . Tietoaineistossa ei saa olla sekä "syvyyttä" että "korkeutta".
    * Sisälläsidatasets.xmlOle hyvä ja poista kaikki käyttötavat&lt;att-nimi ="cd_altitude \\xy" &gt; Syvyys&lt;Koska syvyys on nyt erityinen vaihtoehto korkeudelle, joten sitä ei tarvitse tunnistaa.
    * Sisälläsidatasets.xmlOle hyvä ja poista kaikki käyttötavat&lt;KortitudeMetersPerSourceUnit &gt;, paitsi EDDTable FromSOS.
Kun arvo on 1, poista se.
Kun arvo on -1, harkitse muuttuvan nimen vaihtamista syvyyteen.
Muihin arvoihin lisätty&lt;addAttributes&gt; esimerkiksi:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Kaikki aineistot tukevat nyt
        
        *   &lt;defaultDataQuery, jota käytetään, jos .html on pyydetty ilman kyselyä.
            * Tätä on todennäköisesti harvoin pakko käyttää.
            * Griddap-tietoaineistojen yhteisenä tarkoituksena on määritellä erilainen oletussyvyys tai korkeuden ulottuvuuden arvo. (esim.\\[0\\]Sen sijaan\\[Viimeinen viimeinen\\]) .
Joka tapauksessa sinun pitäisi aina listata kaikki muuttujat, aina käyttää samoja ulottuvuuksia kaikkiin muuttujiin.\\[0\\],\\[Viimeinen viimeinen\\]tai\\[0: Viimeinen\\]ulottuvuuden arvoihin.
Esimerkiksi:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * For Fortabledapaineistot, yleisin käyttö tässä on määrittää eri oletusaika (toistaiseksi, esimerkiksi & Time & Gt;now-1 päivä) .
Muista, että tietojen muuttujien pyytäminen on sama kuin kaikkien tietojen muuttujien määrittäminen, joten voit yleensä määrittää uuden aikarajoituksen.
Esimerkiksi:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;oletusarvoinen GraphQuery, jota käytetään, jos .graphia pyydetään ilman kyselyä.
            * Tätä on todennäköisesti harvoin pakko käyttää.
            * Griddap-tietoaineistojen yleisin käyttö on määrittää erilainen oletussyvyys tai korkeuden ulottuvuuden arvo. (esim.\\[0\\]Sen sijaan\\[Viimeinen viimeinen\\]) ja/tai määrittää, että tietyt muuttujat on kuvattava.
Käyttää lähes aina\\[0\\],\\[Viimeinen viimeinen\\]tai\\[0: Viimeinen\\]ulottuvuuden arvoihin.
Esimerkiksi:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * For Fortabledapaineistot, tämän yleisimmät käyttötarkoitukset on määrittää eri muuttujat, jotka on kuvattava, erilainen oletusaika (toistaiseksi, esimerkiksi & Time & Gt;now-1 päivä) ja/tai eri grafiikkaasetukset (Esim. Merkkityyppi) .
Esimerkiksi:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Muista, että tarvitset XML-koodin tai prosenttikoodin (kumpaakaan, mutta ei molempia) Oletuskysymykset, koska ne ovat XML-dokumentissa. Esimerkiksi ja tulee & amp;amp;&lt;tulee &amp;lt; ja &gt; muuttuu & amp;gt;
Tarkista työsi. On helppoa tehdä virhe eikä saada mitä haluaa.
Kiitos Charles Carleton, Kevin O'Brien, Luke Campbell ja muut.
    *   EDDGridDap,EDDGridFromErddap ja EDDTableFromEDDGriduusi järjestelmä, joka käsittelee usein muuttuvia tietoja (yhtä usein kuin 0,5 s) . Toisin kuinERDDAP"Säännöllinen, ennakoiva järjestelmä, joka lataa kaikki tietoaineistot täysin, tämä valinnainen lisäjärjestelmä on reaktiivinen" (Käyttäjän pyynnöstä) Lisääntyvä (päivittää tietoja, jotka on päivitettävä) . Jos esimerkiksi pyyntöEDDGridFromDap-tietokantaa esiintyy enemmän kuin millisekuntien määrä viimeisimmän päivityksen jälkeen.ERDDAP™Katsotaan, onko vasemmistolle uusia arvoja. (Yleensä yleensä"time") ulottuvuus ja jos on, lataa nämä uudet arvot ennen käyttäjän pyynnön käsittelyä. Järjestelmä on erittäin hyvä pitämään nopeasti muuttuva tietoaineisto ajan tasalla tietolähteen vähimmäisvaatimusten kanssa, mutta joidenkin käyttäjäpyyntöjen käsittelyn hidastumisen hinnalla. Näet [&lt;Päivitä kaikki ns. (Docs/server-admin/datasets#updateeverynmillis)   
Kiitos Michael Barrylle ja OOICI:lle.
    *   EDDGridFromNcFiles, EDDTableFromNcFiles ja EDDTableFromNcFiles tukevat nyt[NCML.ncml](/docs/server-admin/datasets#ncml-files)Lähdetiedostot sijasta.nctiedostoja. Kiitos Jose B Rodriguez Ruedalle.
    * For ForEDDGridAggregateexistingdimension,ERDDAP™tukee uutta palvelinType="dodsindex"-vaihtoehtoa palvelimenType-tunnistetta varten&lt;sourceUrls &gt; tag. Tämä toimii verkkosivuilla, joilla on luettelo tiedostoista.&lt;Pre&gt;&lt;&gt; ja usein alleOPeNDAPlogo. Esimerkki on[ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html).
    * EDDTableFromSOSTukee nyt valinnaista tagia
```  
        <sosServerType>_serverType_</sosServerType>  
```
Voit määrittää tyypinSOSPalvelin (niinERDDAP™Ei tarvitse selvittää sitä) . Hyvät arvot&lt;_serverTypegt; ovat IOOS NDBC, IOOSOOSTethysja kuka (Äskettäin tuettu palvelin Tyyppi) . Näytä[EDDTableFromSOS](/docs/server-admin/datasets#eddtablefromsos). Kiitos Derrick Snowden ja Janet Fredericks.
    * Kaikki Kaikki Kaikki KaikkiEDDGridFiles, EDDTableFrom...EDDGridKopioi ja EDDTable Kopio tukee nyt valinnaista tunnistetta
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
joka voi kertoaERDDAP™säilyttää tiedosto Pöytä (Tietoa jokaisesta lähdetiedostosta) Muistin sijasta vain levyllä (Oletusarvo) . Pidä tiedostotaulukko muistissa nopeuttaa tietojen pyyntöjä (Varsinkin jos &gt; 1000 lähdetiedostoa) käyttää enemmän muistia. Jos asetat tämän todeksi mihin tahansa tietoaineistoon, pidä silmällä muistia: tällä hetkellä käytä linjaa _yourDomain_./erddap/status.htmlvarmistaa, ettäERDDAP™Hänellä on paljon vapaata muistia. Kiitos Fredrik Straylle.
    * EDDTableFromASCIIFiles tukee nyt&lt;Kartta » Kaksi yleisintä karttaa (Herkkä tapaus&#33;) ISO-8859-1 (Oletusarvo) UTF-8.
    * Suositus: asennus.xml, sisällä&lt;HeadHtml &gt; Muuta&lt;html &gt; sisään
        &lt;html lang="Yhdysvallat" (tai toisenlainen[kielen koodi](https://www.w3schools.com/tags/ref_language_codes.asp)Jos olet kääntänyt viestejä.xml) .
    * setup.xml on uusia valinnaisia tunnisteita poistaa osatERDDAP:
        *   &lt;Aktiivinen &gt; Väärä&lt;ConvertersActive »&lt;Oletus on totta -&gt;
        *   &lt;DideSorterActive &gt; Väärä&lt;SlideSorterActive &gt;&lt;Oletus on totta -&gt;
        *   &lt;Väärä &gt; Väärä&lt;/wmsaktiivisuus&lt;Oletus on totta -&gt; Yleisesti ottaen suosittelemme, että asetamme jonkin näistä vääriksi.
    * GenerateDatasets Xml kirjoittaa tuloksia _bigParentDirectory_/logs/generateDatasetsXmlLog.txt, ei log.txt. Kiitos Kristian Sebastian Blalid.
    * GenerateDatasets XML on hyvä ehdotus&lt;Reload Jokainen minuutti » Kiitos tästäNOAAUAF-projekti.
    * Paljon pieniä parannuksia GenerateDatasetsXml. Kiitos tästäNOAAUAF-projekti.

## Versio 1.42{#version-142} 
 (2012-11-26) 

*    **Uudet ominaisuudet:** 
    *    (Ei suuria uusia ominaisuuksia.) 
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Jos päivitätERDDAP™1.38 tai 1.40 ei ollut muutoksia, jotka edellyttivät sinun muuttavan määritystiedostojasi. (Käytä uutta viestiä.xml) .
    *   ERDDAP™Jälleen kerran voi juostaJava1.6. (ERDDAP™V1.40 TarvitaanJava1.7.) Suosittelemme käyttämään uusinta versiota.Java1.7.
    * uusi tietotyyppi,[EDDTableFrom Awsxmlfiilit](/docs/server-admin/datasets#eddtablefromawsxmlfiles)Voit lukea tietoja automaattisesta sääasemasta (AWS) XML-tiedostot. Kiitos Lynn Dewitt ja Exploratorium.
*    **Pienet muutokset/Bug-korjaukset:** 
    * NDBC:n muutoksetSOStietopalvelimet.
    * Sopeutettu NOS COOPS ASCII -palveluiden muutoksiin.
    * Teimme useita pieniä muutoksia ja korjauksia.

## Versio 1.40{#version-140} 
 (2012-10-25) 

*    **Uudet ominaisuudet:** 
    * Uusi tulostiedostomuototabledapTietoja:.ncCFMA, joka tallentaa pyydetyt tiedot.nctiedostot, jotka ovat CF:n mukaisia[Discrete Sampling Geometria](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Moniulotteiset Array-vaihtoehdot, jotka ovat NODC-mallien mukaisia\\[2021: Nyt on[NCEI-mallit](https://www.ncei.noaa.gov/netcdf-templates)\\]tällaisten tietojen tallentamiseen. Kiitos NODC:lle.
    *   tabledapPyynnöt voivat nyt sisältää aikarajoituksia, kuten & Timenow-5 päivää. Nähdään[dokumentointi](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Kiitos James Goslingille.
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Jos päivitätERDDAP™1.38 Ei ollut muutoksia, jotka edellyttivät sinun muuttavan määritystiedostojasi. (Käytä uutta viestiä.xml) .
    *   ERDDAP™Julkiset julkaisut ja sisäiset virstanpylväät ovat saatavilla[ERDDAP™Kirjoittanut GitHub](https://github.com/ERDDAP). Lisätietoja, katso[Wiki](https://github.com/ERDDAP/erddap/wiki)SilläERDDAP™Projekti sekä yleisempi[ERDDAP™Ohjelmoijan opas](/docs/contributing/programmer-guide). (Tämä ilmoitettiin erikseen muutaman viikon kuluttuaERDDAP™1.38 Vapautuminen.) 
    * GenerateDatasets XML on parantunut.
        * Käsikirjoitus tarkistettiin, jotta se toimisi oikein kaikissa Linux-tietokoneissa. (Ei vain muutamia) .
        * Nyt lisätääncreator\\_name,creator\\_emailjacreator\\_urlAina kun mahdollista.
        * Paljon muita pieniä parannuksia.
    * jalostettu mitenERDDAP™käsittelee aikaa.
        * sisäisesti,ERDDAP™Ajoja millisekunnin tarkkuudella (Ei sekunteja) .
        * Voit määrittää valinnaisesti tietyn tietoaineiston tarkkuuden, katso[time\\_precision](/docs/server-admin/datasets#time_precision). Voit esimerkiksi määrittää tietoaineiston näyttämään aika-arvoja päivämäärän tarkkuudella. (esim. 1970-01-01) .
        * Nykyiset tietoaineistosi käyttävät oletusasetuksia, joten nämä muutokset eivät vaikuta niihin ja näyttävät edelleen aikaa sekunneilla. Kiitos Servet Cizmeli ja Philip Goldstein.
    *   [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromnccffiles)on uusi tietotyyppi, jota voit käyttäädatasets.xmltiedosto. Se voi lukea tietoja mistä tahansa lukuisista tiedostomuodoista, jotka on määritetty[CF Discrete Sampling Geometria](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)yleissopimuksia. NODC:n ja Kyle Wilcoxin ansiosta näytetiedostojen antaminen pätevien DSG-tiedostomuotojen valtavalle määrälle ja niiden julkistaminen.
*    **Pienet muutokset/Bug-korjaukset:** 
    * laajentaa[Nopea käynnistys](#quick-restart)Järjestelmä kaikki asiaankuuluvatEDDGridEDDTable subclasses Näytä tarkat tiedot
    * Parannettu dokumentointi, erityisesti miten käyttää[Griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType)ja[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType)eri ohjelmistoja.
    * Muutettu edistynyt etsintä tukemaan minTime ja / tai maxTime ilmaistuna epochSeconds. Kiitos Lynn Dewitt.
    * Muuttunut.htmlTableURL-osoitteiden ja sähköpostiosoitteiden näyttäminen linkeinä.
    * Lisätty "rel=" ja "rev="&lt;href&gt; tagit. Kiitos Pat CappelaereOGC RESTprojekti.
    * Parannettu suoja epärealistisesti suuria tietopyyntöjä vastaan, erityisestitabledapmissä se on vaikeampi ongelma.
    * Lisää viestejä.xml.
    * nopeuden parannuksia.
    * KiinteäEDDGridFiles mahdollistaa laskeutuvien akselien. Kiitos Maricel Etchegaraylle.
    * poistaa viittaukset iGoogleen, koska se lopetetaan.
    * Teimme useita pieniä muutoksia ja korjauksia.

## Versio 1.38{#version-138} 
 (2012-04-21) 

*    **Uudet ominaisuudet:** 
    * ISO 19115 ja FGDCERDDAP™Voit automaattisesti luoda ISO 19115- ja FGDC XML -metadatatiedostoja jokaiseen tietoaineistoon. Linkit tiedostoihin näkyvät kaikissa tietoaineistojen luetteloissa (Lähde: Full Text Search) Myös Web Accessible -kansiot (Vauva)   (Katsokaa[FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/)ja[ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/)) . Kiitos Ted Habermann, Dave Neufeld ja monet muut.
    * Täyden tekstin etsinnät aineistoille tukevat nyt \\-_excludedWord_ _ _ _ _ Ilman lausetta Kiitos Rich Signell.
    * Tietoaineistojen etsinnät palauttavat sivun kerrallaan. Oletusarvo käyttää parametrijonoa: sivu = 1 &itemsPerPage = 1000, mutta voit muuttaa pyynnön URL-arvoja. Kiitos Steve Hankinille ja UAF-projektille.
    *   OpenSearch-----ERDDAP™Nyt tukee[OpenSearch1.1](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html)standardi tietojen etsimiseen. Tämä mahdollistaa muun muassa katalogisen aggregointisivuston hakemisen (hakupyyntö jokaiselle luettelolle, jonka se tietää) .
    * Comma erotettu Arvon arvo (CSV) Tiedostot -ERDDAP™Luo CSV-tiedostoja, joissa on vain yhteenveto arvojen välillä (Mikä Excel suosii) Paitsi komma+space. Kiitos Jeff DeLaBeaujardierelle.
    * Miljoonat tiedot - Tukea varten tehtiin useita muutoksiaERDDAPMeillä on valtava määrä dataa, ehkä jopa miljoona. Kiitos Steve Hankinille ja UAF-projektille.
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
#### Nopea käynnistys{#quick-restart} 
*   [A](#quick-restart)Nopea käynnistys mahdollistaaERDDAP™käynnistää paljon nopeammin.
     **Lisää tämä asennus.xml-tiedostoosi.** heti&lt;DatasetsRegex &gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Täydelliset tietoaineistojen hakutulokset voidaan tehdä Lucene-hakukoneella (Suosittelemme alkuperäistä hakukonetta, jos sinulla on alle 10 000 aineistoa.) Alkuperäinen hakujärjestelmä.
         **Lisää tämä asennus.xml-tiedostoosi.** heti&lt;/ DisplayDiagnosticInfo&gt;:
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

    * Setup.xml:ssa voit/pitäisi nyt lisätä kaksi uutta kategoriaa erilliseen luetteloon.&lt;categoryAttributes&gt; &gt;
        * Lähde: Akeywords (Lisätietoja: Global: Institution) - uusi erikoistapaus, joka laatii koodatun luettelon avainsanoista globaaleista avainsanoista, jotta jokainen avainsana saataisiin erikseen.
        * Muuttuva Nimen nimi (Lisää se lopussa) uusi tapaus, joka luokittelee jokaisendataVariable destinationNames.
    * Asennus.xml, voit (Mutta miksi?) KertokaaERDDAP™ei tarjoa FGDC- ja/tai ISO 19115 -metatietoja mihinkään tietoaineistoon
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Näiden asetusten oletusarvot ovat totta.
    * Sisällädatasets.xmlOle hyvä ja harkitse metatietojesi parantamista.ERDDAP™Nyt luomme automaattisesti ISO 19115- ja FGDC XML -metadatatiedostoja jokaiseen tietoaineistoon, joka perustuu aineiston metatietoihin.
Niin, **Hyvä metadata johtaa hyväänERDDAPISO 19115 ja FGDC metadata.**   
         **Katso uusi dokumentti monista uusista[Globaalit ominaisuudet](/docs/server-admin/datasets#global-attributes).** 
    * Sisällädatasets.xmljos haluat kertoaERDDAP™käyttää esivalmistettua FGDC- ja/tai ISO 19115 -tiedostoa, joka on jossain palvelimen tiedostojärjestelmässä sen sijaan, että olisiERDDAP™Luo nämä tiedostot, käytä:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Jos _fullFileName&gt; tai tiedostoa ei löydy, aineistossa ei ole FGDC- ja/tai ISO 19115 -metatietoja. Tämä on myös hyödyllistä, jos haluat tukahduttaa FGDC- ja/tai ISO 19115 -metatiedot.
    * Sisällädatasets.xmlKaikilleEDDGridSideBySide jaEDDGridAggregateExistingDimension-tietoaineistot varmistavat, että lasten tietoaineistot ovat erilaisia.datasetIDkuin vanhempansa ja muut lapset. (Voit seurata George Foremanin yksinkertaista, mutta tehokasta järjestelmää lasten nimeämiseksi.) Jos perheen nimet ovat täsmälleen samat, aineisto ei lataudu. (virheviestillä, että yhdistetyn akselin arvot eivät ole järjestyksessä) .
    * Sisällädatasets.xmlJoitakin muutoksia luetteloonioos\\_categoryMetatiedot:
        * "PCO2" vaihdettiin "CO2".
        * "Fysikaalinen valtameri" lisättiin.
        * "Soils" lisättiin.
    * Sisällädatasets.xml,ERDDAP™"Ei enää salli"datasetID. Se oli sallittua, mutta lannistunut. (Anteeksi) 
    * Sisällädatasets.xmlEDDTableFromThreddsFiles ja EDDTableFromHyraxTiedostot ovat muuttuneet hieman, koska molemmat luokat on vain uusittu tehokkaammiksi. (Molemmat luokat tekevät aina paikallisen kopion kaikista etätiedostoista.) . Katso dokumentit näiden luokkien perustamisesta:[EDDTableFromHyraxTiedostot](/docs/server-admin/datasets#eddtablefromhyraxfiles)ja[EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). Katso tarkistetut kommentit&lt;tiedostot &gt; (Nyt epäolennaista) ja&lt;sourceUrl&gt; (Nyt olennaista) . Sinun ei myöskään pitäisi koskaan kääriä tätä luokkaa EDDTableCopy tehokkuuteen.
    * Sisällädatasets.xmljos käytät EDDTableFromDatabaseaOracleTietokanta, sinun pitäisi sisällyttää yhteys Kiinteistöt kuten
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
määrittää, kuinka monta tietoriviä noutaa kerrallaan, koska oletusarvo on 10, mikä on kauhean tehotonta. Nähdään[Oracledokumentointi](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm). MySql ja PostgreSQL näyttävät olevan parempia. Kiitos Kevin O'Brien.
    * Jos käytät EDDTableFromDatabasea, katso parannettu[Nopea dokumentaatio](/docs/server-admin/datasets#eddtablefromdatabase)lisäehdotuksia suorituskyvyn parantamiseksi. Kiitos Kevin O'Brien.
    * Sisällädatasets.xmlkaikkiin EDDTable-tietoihin, yleissopimuksiin jaMetadata\\_ConventionsGlobaalit ominaisuudet, katso CF-1.6 (ei CF-1.0, 1.1, 1.2, 1.3, 1.4 tai 1,5) CF-1.6 on ensimmäinen versio, joka sisältää Discrete Sampling Geometrian muutokset.
    * Ohjelmoijat, jotka kokoavatERDDAP™Koodin on lisättävä lib/lucene-core.jar jar-tiedostojen luetteloon javac- ja java-komentorivillä.
    *   ERDDAP™Hänellä on[Uusi palvelu](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html)Muuntaa CF Standard Name / GCMD Science Keyword. Saatat huomata tämän hyödylliseksi, kun luot maailmanlaajuisia avainsanojen metatietoja tietoaineistoillesi.ERDDAP.
    * Bottien kanssa - Lue tämä neuvo[estää bottien ryöstämisenERDDAP™Tyhmällä tavalla](/docs/server-admin/additional-information#robotstxt).
    * Käännökset - Teksti onERDDAP"verkkosivut ovat nyt enimmäkseen viestejä.xml ja soveltuvat käännöksiin eri kielille. (mm. saksaksi, ranskaksi) . Viestit käyttävät usein MessageFormat-muotoilua, myös käännösten tekemiseen. Jos olet kiinnostunut käännöksen tekemisestä, ota yhteyttäerd dot data at noaa dot gov.
    * Esimerkkidatasets.xml----- Näytteessä oli useita pieniä mutta merkittäviä virheitä.datasets.xml. Jos käytät näitä tietoja, hanki uudemmat versiot uudesta näytteestä.datasets.xmlUusi erdapContent.ziptiedosto. Kiitos James Wilkinsonille.
    * Jättiläinen - Yritän kovasti tehdäERDDAP™GitHub-projekti ASAP tämän julkaisun jälkeen.
*    **Pienet muutokset/Bug-korjaukset:** 
    * Uusi taulukko, OceanDepth, on hyödyllinen syvällisille arvoille. (Positiivinen on alas) esimerkiksi 0 (matalalla) 8000 (syvä syvä syvä) .
    * The.kmlTuotteestatabledapKäytä parempaa merkkiä (Se ei ole fuzzy) . Se, että se on merkki, tekee siitä suuremman.
    * EDDTableFromFiles - Viimeisimmässä päivityksessä uudella netcdf-java-kirjastolla oli tiukemmat rajoitukset muuttujan nimille..nctiedostoja. Tämä aiheuttaa ongelmia EDDTableFromFiles, jos muuttujasourceNameHänellä oli tietyt täsmällisyyshahmot. EDDTableFromFiles on nyt muokattu ongelman välttämiseksi. Kiitos Thomas Holcombille.
    * .subset-sivu tukee nyt 0/10/100/1000/10000/100, ei linkitettyjä tietoja. Tooltip varoittaa, että 100000 voi aiheuttaa selaimen kaatua. Kiitos Annette DesRochers, Richard (A) Coughlin ja IOOS-biologinen projekti.
    * Tietoa/info/_datasetID_/index.html-sivut näyttävät nyt URL-osoitteita ja sähköpostiosoitteita klikattavina linkeinä. Kiitos Richard (A) Coughlin ja IOOS-biologinen projekti.
    * Bug fix: Intabledapaineistoihin, joissa on korkeus MeterSourceUnit&lt;0, korkeusrajoituksista saadut kysymykset käsitellään väärin. Kiitos Kyle Wilcoxille.
    * Bug fix:EDDGridAggregateFromExistingDimension tukee nyt monipuolisempia TDS-URL-osoitteita. Kiitos?

## versio 1.36{#version-136} 
 (2011-08-01) 

*    **Uudet ominaisuudet:** 
    * Ei merkittäviä muutoksia käyttäjän näkökulmasta.
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * PmelTao-tietoaineistoa, jota käytettiin usein näytetietoaineistonatabledap  
Dokumentaatiota ei ole enää saatavilla.ERDDAP™Hallitsijoiden on tehtävä nämä muutokset:
        * Sisälläsidatasets.xmljos sinulla ondatasetID= "pmelTao"-tietokanta, lisää
Aktiivisuus = "väärä" juuri ennen tämän lauseen loppua.
        * Asennuksessa.xml, jos&lt;EddtableIdExample » PmelTao, sitten:
            * Jos sinundatasets.xmlEi ole dataa, jossadatasetID= ’erdGlobecBottle’, lisää
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * Asetuksessa.xml korvaa kaikki merkit&lt;EddtableIdExample » kautta läpi
                &lt;EdDTableMatlabEsimerkki &gt; kanssa
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
                
    * Jos tyyppi on EDDTableFromFilesin alaluokka, voit nyt tehdä tietoja metadatasta.
Voit nyt tehdä muunnelman yhdestä alkuperäisestä muuttujasta.
Esimerkiksidatasets.xmlSisällä A&lt;dataVariable&gt; tagi, jos käytät
```
        <sourceName>variable:cruise:PI</sourceName>  
```
        ERDDAP™Muuttujan tulee olla Risteilymuuttujan PI-ominaisuuden arvoja.
Kiitos WOD.
*    **Muutokset:** 
    * Pieniä muutoksia

## Versio 1.34{#version-134} 
 (2011-06-15) 

*    **Muutokset:** 
    * Bug fix: Korjattu muistivuoto, joka tapahtui noin 64-bittisessäJavaasennuksia.
    * Bug fix:ERDDAP™Nyt oikein määritellään nämä globaalit ominaisuudet, kun leveysmitan arvot vaihtelevat korkeasta alhaaseen: geospatiaaliset × min, geospatiaaliset _t_max, Southernmost _Northing, Northernmost_Northing.
        
Huomaa, ettäactual\\_rangese on muuttumaton: sillä voi olla alhaiset, korkeat arvot tai korkeat, alhaiset arvot, koska sen tarkoituksena on ilmoittaa varastoinnin laajuus ja järjestys.
        
    * Pieniä muutoksia.
    *   ERDDAP™Hallinnoitsijoiden ei tarvitse tehdä muutoksia niiden asennus.xml taidatasets.xml.

## Versio 1.32{#version-132} 
 (2011-05-20) 

*    **Muutokset:** 
    * Äskettäin ratifioitu CF Discrete Sampling Geometries (joka ei ole vielä saatavilla verkossa) Tämä korvaa ehdotetut CF Point Observation -sopimukset.
        ERDDAP™Käyttäjät näkevät, että cd \feature \\ \\ tation korvataan TimeSeriesillä ja tiedostoihin on tehty pieniä muutoksia..ncCF-tiedostotyyppi (Litteää ulottuvuutta kutsutaan nyt näytteeksi) .
        ERDDAP™Hallitsijoiden on tehtävä nämä muutoksetdatasets.xml:
        * cdm \\ \\ \\ \\ \\ \\ \\ t \\ \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t t \\ t t t t t \\ t t t t t t t t t t t \\ \\ t t t t t t t t \\ \\ t t t t t \\ t t t t t t \\ t t \\ \\ t \\ \\ t t \\ t t t \\ t \\ \\ t t \\ \\ \\ \\ \\ t t \\ t \\ \\ \\ 
        * cdm \ta \\ \\ \\ \\ \\ tation \\ \\ \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ \\ t \\ t \\ t \\ t \\ \\ t t \\ \\ t t t \\ \\ t t t t t t \\ \\ t t \\ t t \\ \\ \\ \\ \\ t t t t t \\ \\ t \\ \\ t t \\ t t \\ \\ t \\ \\ t t \\ \\ t \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ 
        * cdm = cdm &#123;\\displaystyle \\ &#125; \\ \\ \\ \\ t \\ \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t; \\ t \\ t \\ t \\ t t \\ t t t t t t \\ t t t t \\ t t t t t t t \\ t t \\ t t t t t t t t t t t t \\ t t t t t t \\ t t \\ t t t \\ t t \\ t t t \\ t \\ \\ t t t \\ t \\ t t t \\ t t \\ t 
        * cf &#123;\\displaystyle &#125; \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\
    * Uusi Uusi Uusiioos\\_categoryVärillinen liukeneva orgaaninen aine, PCO2, Stream Flow, Total Suspended Matter
    * Mahdolliset ratkaisut 64-bittiseen muistivuotoonJava.\\[Se ei toiminut.\\]
    * Pieniä muutoksia.

## Versio 1.30{#version-130} 
 (2011-04-29) 

*    **Uudet ominaisuudet:** 
    * 64-bittinen tukiJava. Käytetty 64 bitJava,ERDDAP™Voit nyt käyttää paljon enemmän muistia ja käsitellä useita samanaikaisia pyyntöjä.
    * Tukea.nctiedostopyynnöt jopa 2GB (Ilman 64-bittistäJava) paremman käytön kauttaERDDAP"Tietojen käsittelyä chunksissa.
    * Koodin 2X nopeusparannukset ja 2X nopeus nousevatJava1.6 TeeERDDAP™2X-4X nopeammin kuin ennen.
    * Muistinsäästöparannukset ovat huomattavasti alhaisemmatERDDAPperusmuistin käyttö.
    * Tabulaariset tiedot,ERDDAP™on nyt täysin tietoinen tietoaineiston cd data \\ \\ \\ \\ \\ \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t t \\ t t t \\ t t t t t t t t t t t t t t t t t t t \\ t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t  Nähdään[CF Discrete Sampling Geometries spesifikaatio](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Ehkä jonain päivänä, tämä Word-tiedosto muunnetaan .html ja korvata nykyiset "OBSOLETE" tiedot kyseisellä sivulla. Kiitos tästäNOAAUAF-projekti.
    * Useimmille EDDTable-tietokoneille uusi lähtötiedostotyyppi,.ncCF, Contiguous Ragged Array.nctiedostot, jotka ovat uusimman version mukaisia[CF Discrete Sampling Geometries yleissopimukset](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Nämä tiedostot on rakennettu kuvaamaan CDM-tietotyyppiä. Koska ehdotetut yleissopimukset ovat juuri muuttuneet, netcdf-java-kirjasto ei vielä tue tiedostomuotojen lukemista.ERDDAPja tulkita niitä CDM-tiedostoina. Ehkä se tulee pian. Kiitos tästäNOAAUAF-projekti.
    * The View : Distinct Data -vaihtoehto .subset-sivulla on nyt pudotusluettelo, jonka avulla käyttäjät voivat määrittää erillisten tietojen rivien enimmäismäärän. (Oletusarvo 1000) . Muutos ja muut sallivatERDDAP™Työskentele sellaisten tietoaineistojen kanssa, joilla on hyvin suuri määrä erillisiä tietoja. (Ainutlaatuisten arvojen määrä on edelleen ongelma, mutta se voi olla melko korkea. (20 000?) .subset ja muut sivut latautuvat todella hitaasti.) Kiitos tästäNOAAUAF-projekti.
    * .subset-sivuilla on uusi vaihtoehto: Katso Distinct Data Counts Kiitos GTOPP-projektista.
    * Käyttäjien auttamiseksi eri arvot (Aseman nimi) Näytetään nyt Make-A-Graph- ja Data Access -muodossa. Kiitos tästäNOAAUAF-projekti.
    * Transparent Png-pyynnöt tukevat nyt kaikenlaisia grafiikoita ja tietojen esityksiä. Se piirtää vain tietoja - ei akseleita, legendoja, maskia tai mitään muuta. Tämä mahdollistaa kuvien tekemisen läpinäkyvinä punkkeina. Jos ja.sizewidth|_korkeus_ määritellään kyselyssä (Suositeltu) Se on kunnioitettu. Oletusarvo on 360x360 pikseliä. Ainoa poikkeus onEDDGrid&.draw=surface, missä oletus (Kuten ennen) kuva, jossa on ~1/pikseli per datapiste (enintään 3000 x ja y pikseliä) . Kiitos Fred Hochstaedterille.
    * TheWMSWeb-sivut näyttävät nyt aineiston muuttujan väripalkin. (s) . Kiitos Emilio Mayorgalle ja muille.
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * Vapautumiseen liittyy paljon muutoksia. Ne ovat kaikki tärkeitä. Ole kärsivällinen ja toimi alla lueteltujen muutosten läpi.
    * Tämä versio on julkaistu aiemmin kuin on tarkoitus käsitellä joitakinJavaTurvallisuusvikoja. Useita tähän tarkoitukseen tarkoitettuja ominaisuuksia/korjauksiaERDDAP™versio ei ole tässä versiossa. Anteeksi. Toivottavasti seuraava versio tulee pian. (Helpompi päivittää) .
    * Välttää useita turvavirheitäJava6 päivitys 23 ja alla, lataa ja asenna uusin versioJava  (Java6 päivitystä 24 tai enemmän) . Jos käytössä on 64-bittinen käyttöjärjestelmä, hanki 64-bittinen versio.Java.
    * Jos käytät Tomcat 5:tä, päivitä Tomcat 6:een tai 7:een (Mieluiten) . Jos käytät Tomcat 6:a, päivitä Tomcat-versioon 7.
    * Noudata kaikkia ohjeita[Uuden perustaminenERDDAP™](/docs/server-admin/deploy-install)tarvittaessa kopioit tiedostoja vanhasta asennuksesta uuteen asennukseen, erityisesti\\[Tom\\]Sisältö / tiedostot. Osana tätä, huomioi[Tomcat-suositukset](/docs/server-admin/deploy-install#tomcat).
    * Oletusarvoinen erdap.css on nyt mukana erddap.war-tiedostossa.
        * käyttää oletusarvoa erddap.css, **delegaatti** Vanha\\[Tom\\]Sisältö/erddap/images/erddap.css.
        * Jos muutat\\[Tom\\]Sisältö/erddap/images/erddap.css ja haluat käyttää sitä: jätä se paikoilleen ja vaihda se&lt;Input&gt;-osio:
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

    * Sisälläsi\\[Tom\\]Sisältö/erddap/setup.xml:
        * Korvaa kommentit ja tunnisteet, jotka liittyvät&lt;osittaispyynnöt &gt; ja&lt;PartialRequestMaxCells kanssa
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
        * Korvaa kommentit, jotka liittyvät&lt;categoryAttributes&gt; ja harkitse tagin arvon muuttamista:
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

Yksilöllinen&lt;categoryAttributesNämä ovat globaaleja ominaisuuksia, jotka on nyt tunnistettava maailmanlaajuisesti: (Globaali: Institution) . Muiden ominaisuuksien oletetaan olevan muuttuvia ominaisuuksia. (esim.standard\\_name) . Myös institutionaaliset arvot (Ainoat) jätettiin alkuperäiseen tapaukseen. Kaikki luokka-arvot muunnetaan alemmaksi.
    * Sisälläsi\\[Tom\\]Sisältö/erddap/datasets.xml:
        * Improvisoidut:ERDDAP™sisältää uusia vaatimuksia, jotka liittyvät tabulaarisen tietoaineiston cdm datatyyppiin. Erityisesti jokaisella tietoaineistolla on oltava oikeat metatiedot ja muuttujat, jotka liittyvät cdm data tyyppiin. Jos ei, aineisto ei kuormita ja heittää virheen. Katso dokumentit[cd | | | _ _ _ _ _](/docs/server-admin/datasets#cdm_data_type).
        * FYI: On olemassa uusi tietotyyppi: EDDTableFromAsciiServiceNOS.
        * ADAMUS: Kolme uutta sallittuaioos\\_categoryVaihtoehtoja: Hydrologia, laatu (esim. laatulippujen osalta) ja tilastot (E.S. Tarkoitan) .
        * EDDTableFrom... Tiedostot, poista kaikki&lt;nDimensions &gt; tagit Niitä ei enää tarvita tai käytetä.
        * Muuttujien kanssadestinationName= asenne,ERDDAP™Ei enää pakotalong\\_nameollakseen alttari. Käy läpi sinundatasets.xmlEtsi toistuvasti&lt;destinationName&gt; ja lisättyä tuohon muuttujaan&lt;addAttributes&gt; &gt;
```
              <att name="long\\_name">Altitude</att>  
```
             (Tai hieman erilainenlong\\_nameerityistapauksissa) .
        * Valinnainen: Kaikki EDDTableFromFiles-alisarjat tukevat muuttujaa[sourceName= Globaali:](/docs/server-admin/datasets#global-sourcenames)muuntaa maailmanlaajuiset metatiedot kustakin tiedostosta tietomuuttujaksi. Kiitos Lynn DeWitt.
    * EDDTableFromDatabase -käyttäjätERDDAP™Uusi JDBC 4 -kuljettaja postgresille. Muissa tietokannoissa tarkista verkko viimeisimmästä JDBC .jar-tiedostosta tietokantaan. Siitä lähtienERDDAP™Nyt käytetäänJava1.6 + JDBC 4 (Ei 3) todennäköisesti suositellaan.
    * FYI
        *   EDDGridLähde: Files and EDDTable From... Tiedostotiedot tallentavat nyt tiedostotaulukon tiedot
            \\[isovanhemmat\\]/ Data Info/\\[datasetID\\]****.nctiedostoja.
EDDTable-tietoaineistot tallentavat nyt alijoukkotiedot
            \\[isovanhemmat\\]/ Data Info/\\[datasetID\\]****.nctiedostoja. Nämä tiedostot olivat ennen
            \\[isovanhemmat\\]/ Data Info/\\[datasetID\\]****.jsontiedostoja.
Vanhat tiedostot poistetaan automaattisesti, kunERDDAP™Aloita. Voit poistaa kaikki tiedostot (Jätä tyhjät alihankinnat) Sisällä\\[isovanhemmat\\]DatasetInfo/
        * Olen työskennellyt uudessa EDDTableFromNcCFilesissa, joka lukee tietoja paikallisista ja etätiedostoista ehdotetuilla CF Point Observation Conventioneilla. Mutta se ei ole tässä vapautuksessa. Netcdf-java-kirjastoissa on ongelmia, jotka liittyvät joihinkin menetelmiin näiden tiedostojen lukemiseksi. Muutoksia on tehty CF Point Observation Conventionissa. Kun netcdf-java-kirjasto on vahvistettu ja päivitetty viimeisimpään ehdotukseen, jatkan tätä.
        * JuokseminenERDDAP™Windowsissa voi olla ongelmia: erityisesti voit nähdä\\[BigParentDirectory/log.txt-tiedosto, jokaERDDAP™Joskus ei voi poistaa ja/tai nimetä tiedostoja nopeasti. Tämä johtuu virustorjuntaohjelmistosta (Lähde: McAfee and Norton) Tämä tarkistaa tiedostoja viruksia. Jos törmäät tähän ongelmaan (jotka näkyvät loki.txt-tiedoston virheviesteissä, kuten "Ei voi poistaa ...") Virustorjuntaohjelmiston asetukset saattavat osittain lievittää ongelmaa.
JosERDDAP™Windowsissa on vain työpöydälläsi käynnissä oleva testi, joka on vain ärsyttävää.
JosERDDAP™Windows on yleisösiERDDAP™Harkitse siirtymistä Linux-palvelimeen.
    * Hidas aloitus - Ensimmäinen kerta, kun juoksetERDDAP™päivityksen jälkeen,ERDDAP™Voi olla hidasta ladata aineistoja. TieERDDAP™Tiedot koostetuista tiedostoista ovat muuttuneet, jotenERDDAP™Pitää lukea lisää tietoa kaikista näistä tiedostoista. Se vie aikaa.
    * Virheet käynnistysvaiheessa - Kun otetaan huomioon cdm_data-tyyppiin liittyvät muutokset, on todennäköistä, että osa aineistoistasi ei kuormita ja heittää virheitä. Lue päivittäinen raportti, jokaERDDAP™Lähetän kunERDDAP™on valmis aloittamaan. Siinä on luettelo aineistoista, joita ei ole ladattu. (Huipulla) Syy, miksi he eivät kuormittaneet (Lähellä pohjaa) .
    * Jos olet juuttunut tai sinulla on muita kysymyksiä, lähetä minulle sähköpostia:erd.data at noaa.gov.
    * Ohjelmoijat ----- Jos kirjoitatJavaOhjelmat, jotka juoksevatERDDAP™Koodi, sinun on muutettava joitakin komentosarjan parametrin viittauksia:
        * Vaihda Joda-time-1.6.2.jar joda-aikaan. ja
        * Vaihda postgres JDBC .jar viittaus postgresql.jdbc.jar
*    **Pienet muutokset ja korjaukset:** 
    
    * Parannettu liitäntäkäsittely, jotta vältytään ripulilta.
    * Parannetut valuutankäytännöt, joilla käsitellään lähes yhtäaikaisia pyyntöjä tehokkaammin.
    *   ERDDAP™NetcdfAll-4.2.jar (Nimetty netcdfAll-viimeiseksi. ja) . Tämä kytkin tarvitsi useita sisäisiä muutoksia ja aiheutti muutamia pieniä ulkoisia muutoksia, esimerkiksi muutoksia siihen, miten harmaatiedostoja luetaan ja pieniä muutoksia..ncHeaderin tuotanto.
    * Uusi ominaisuus:\\[Erddap\\]Convert/fipscounty.html muunnelmiaFIPSMaakuntakoodit / maakunnan nimistä.
    * Kartoilla rajat ovat nyt tummia violetteja, joten ne erottuvat paremmin kaikista taustaväreistä.
    * Tabulaari.kmlTuotanto käyttää jälleen pyöreää kuvaketta pisteiden merkitsemiseen (Ei lentokoneen ikoni Google muutti hiljattain) .
    * erdCalcofi-tietoaineistot järjestettiin uudelleen ja ne toimitetaan nyt paikallisista tiedostoista. (nopeammin) .
    * GenerateDatasets XML:stä Thredds Katalogi luo nyt tulostiedoston:
        \\[Tom\\]/webapps/erddap/WEB-INF/tempEDDGridFromThreddsCatalog.xml Kiitos Kevin O'Brien.
    * GenerateDatasets XML:stä Thredds Katalogi yrittää nyt poistaa tarpeettomat satamanumerot URL-osoitteesta (:8080 ja :8081 voidaan joskus poistaa.) . KiitosNOAAkeskustan turvallisuusjoukkue.
    * .subset-verkkosivuilla Distinct-tietojen kartalla on nyt muuttuva lat lon -alue.
    * Useita listojaERDDAP™  (esim. taulukko, joka näyttää kaikki tiedot) A.A.S.A.A.S. on luokiteltu ennen a..z. Nyt ne ovat tapausherkällä tavalla.
    * Pienet muutokset .subset-verkkosivuilla, mukaan lukien: yksikkö on nyt ilmoitettu.
    * GenerateDatasets Xml ja DasDds eivät enää heittele poikkeusta, jos ne eivät voi laittaa tuloksia järjestelmän leikepöydälle tai näyttöön InBrowser. Kiitos Eric Bridger ja Greg Williams.
    * Bug fix: Kun aineisto on ladattu,ERDDAP™poistaa tai muokata maantieteellisiä ominaisuuksia. Kiitos Charles Carletonille.
    * Bug fix: String2.getClassPath () Nyt kunnolla luokitellaan luokka Tie (Erityisesti Windowsissa tiedostonimen tilat näyttivät %20) . Tämä vaikuttaaERDDAP™SSR.getContextDirectoryn nimi () Sisällön/erdapin löytäminen. Kiitos Abe Coughlinille.
    * Bug fix: EDDTableFromFiles liittyy saadaDataForDapQuery käsittely erillinen () pyyntöjä. Kiitos Eric Bridger.
    * Bug fix:tabledappyynnöt eivät ole asianmukaisesti käsitelleet korkeusrajoituksia, kun aineiston korkeus MetersPerSourceUnit oli -1. Kiitos Eric Bridger.
    * Bug fix: EDDTableFrom Tiedostoaineistot käsittelevät nyt oikein pyyntöjä, jotka sisältävät = NaN ja &#33;= NaNaN.
    
## Versio 1.28{#version-128} 
 (2010-08-27) 

*    **Uudet ominaisuudet:** Ei mitään.
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** Ei mitään.
*    **Bug fix:** Korjaa ohjelmointivirhe (Vain 1.26) Tämä tehtyERDDAP™erittäin hidasta.
     

## Versio 1.26{#version-126} 
 (2010-08-25) 

*    **Uudet ominaisuudet:** Ei mitään.
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** 
    * sinun\\[Tom\\]Sisältö/erddap/setup.xml
        * Sisällä&lt;Laillinen &gt; Uuden linjan alla\\[Standard standard standard standard standard standard standard standard standard standard standard standard DataLisää\\]Insert\\[Standard Yhteystiedot\\].\\[Standard Yhteystiedot\\]viitataan&lt;adminEmail&gt; määritelty korkeammalle asennus.xml.
        * Poistaa&lt;CommonBGColor &gt; ja&lt;HighlightBGColor &gt; Näytä tarkat tiedot
        * Suositellaan: Muut muutokset&lt;endbodyHtml &gt; &gt;
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

    * Vaadittu: sinun\\[Tom\\]/ sisältö / erddap / kuvat / erddap.css ja erdapAlt.css, lisää pohjaan:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Pieniä korjauksia ja pieniä muutoksia:** 
    
    * Bug fix: Joissakin tilanteissa lomakkeet eivät toimineet joissakin Internet Explorer -versioissa. Kiitokset Greg Williamsille.
    * Bug fix: Tehdä Graph-painikkeet eivät toimi, jos tietoaineisto on peräisin etäisestäERDDAP.
    * Bug fix:WMSJoskus se ei toimi, jos aineisto oli etäältä.ERDDAP.
    * Paljon pieniä muutoksia ja vikoja.
    

## Versio 1.24{#version-124} 
 (2010-08-06) 

*    **Uudet ominaisuudet:** 
    * Uusi Uusi Uusi[Alakohtaiset verkkosivut](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html)Käytä kasvojenhakua valitsemaan tabulaaristen tietoaineistojen alijoukkoja. Kiitos POST.
    * Uusi Uusi Uusi[Edistynyt etsintä](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html)Yhdistä kaikki muut hakuvaihtoehdot ja lisää pituus, leveys ja aikaa sitovat laatikot. Kiitos Ellyn Montgomerylle. (Anteeksi viivästys.) 
    * Uusi Uusi Uusi[Muuntaa aikaa](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)Web-sivun ja palvelun avulla voit muuntaa numeeriset ajat ISO-jousitusajoiksi.
    * Uusi Uusi Uusi[Muunna yksiköt](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)Verkkosivut ja palvelut, joiden avulla voit muuntaaUDUNITSUCUM-yksiköistä. KiitosNOAAIOOSSOS.
    * Jos atabledapSisältää & Units ("UCUM") Yksiköiden nimet muunnetaan alkuperäisistä nimistä. (Yleensä yleensäUDUNITS) että[U](https://unitsofmeasure.org/ucum.html)yksiköiden nimet. Tämä koskee vain yksiköitä\\*Nimiä\\*Ei data-arvoja. KiitosNOAAIOOSSOS.
    * Parannuksia tehdä Graph verkkosivuja ja kaavioita ja karttoja:
        * Jos grafiikka on kartta, on olemassa uusia Make A Graph -painikkeita zoomata sisään/out ja uusi vaihtoehto napsauttaa kartan keskipistettä. Kiitos POST.
        * Suodattimet on lisätty pohjan läheisyyteen. Kiitos Greg Williamsille.
        * Rannikkodatatiedostot on päivitetty GSHS v2.0:een. Kiitos POST.
        * Karttoja ovat nyt järvet ja joet. Kiitos POST. (Sacramento-joen delta puuttuu, koska rantaviivatietoja tai järven/joen tietoja ei käsitellä.) 
        * Pscoast-johdetut maa-/tilatiedostot päivitettiin. Kiitos POST.
        * Topography.cpt:tä on muutettu hieman. (Anteeksi jos tämä vaikuttaa haitallisesti sinuun.) Kiitos POST.
        * Griddap’s Make A Graph, jos käyttäjä muuttaa muuttujaa, lomake lähetetään automaattisesti niin, ettäaxisVariables' showStart AndStop heijastaa aina graafisia muuttujia. Kiitos Joaquin Trinanesille.
        * Png- ja pdf-kuvien URL-osoitteet:
            * New &.landvalue_, jossa _value_ voi olla alla (Topografia) Tai ”yli” (Näytä Bathymetry) . Jos ei ole määritetty, oletusarvo on[drawLandMask](/docs/server-admin/datasets#global-drawlandmask)Sisällädatasets.xmlAsennus.xml. Kiitos POST.
            * Liian pitkän legendan linjat jaetaan automaattisesti useisiin riveihin. Kiitos POST.
        * Png-kuvan URL-osoitteet:
            * New &.legend_value_, jossa _arvo_ voi olla "Bottom" (Oletus) "Off" tai "vain" Tämä antaa sinun sisällyttää legenda, poissulkea legenda tai saada vain legenda. Kiitos Cara Wilsonille.
            * Uusi ja.trim Pixels jättää nPixelsin rajan (esim. 10) kuvan pohjassa. Sitä käytetään .legend=Offin jälkeen. Kiitos Cara Wilsonille.
            * Uusi & sizewidth|_korkeus_ määrittää kuvan leveyden ja korkeuden pikseleissä.
    * Uusia tiedostomuotoja:
        * .csvp ja.tsv.csv ja.tsvmutta " (_yksiköt_) "Lisätty sarakkeiden nimiin ensimmäisellä rivillä.
        * .odvTxt tekee .txt-tiedoston, joka yksinkertaistaa tietojen saantia[Ocean dataa Näkymä (ODV) ](https://odv.awi.de/).
        * .esriCsv tekee .csv-tiedoston, joka soveltuu ESRI:n tuontiinArcGIS. (Tabulaariset tiedot) Jan Masonin, Jeff de La Beaujardieren jaNOAAIOOSSOSprojekti.
    * GUI-parannukset[Kategoria](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html)verkkosivut. Myös luokitteluarvot (muu kuin instituutio) Kaikki ovat nyt matalampia. Ei-alhaiset pyynnöt hyväksytään (uudelleenohjattu) taaksepäin yhteensopivuus. Kiitos Roy Mendelssohnille.
    * Virheviestit ovat entistä lyhyempiä ja käyttäjälähtöisempiä. Kiitos Greg Williamsille.
    * Sisäinen muutos, joka vähentää merkittävästiERDDAPperusmuistin käyttö.
    * Paljon uusia ominaisuuksia, jotka ovat vain POST-projektin kannalta tärkeitä.
*    **AsioitaERDDAP™Hallitsijoiden on tiedettävä ja tehtävä:** Muutoksia on paljon. Anteeksi. Jokainen tuo kuitenkin hyviä etuja.
    * Big Changes to GenerateDatasetXml, se kysyy usein lisää (Katso asiaa[Data Tyypit](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types)Tietoa) ja luo aina olennaisesti käyttövalmiita sisältöjädatasets.xml. Olet edelleen vastuussa asennuksesta, joten sinun pitäisi vielä tarkistaadatasets.xmlsisältöä ennen sen käyttöä. Ihmisen työn tekeminen projektiin on aina parempi kuin tietokoneohjelma. Kiitos UAF-projektista.
    * REQUIRED: In setup.xml, sinun täytyy tarkistaaWMSosasto. Niihin pitäisi nyt sisällyttää (Ole vapaa muuttamaan arvoja) :
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

    * REQUIRED: In setup.xml, kopioi ja liitä tämä uusi ehdotettu&lt;HeadHtml korvaa vanhan version. Ole vapaa tekemään muutoksia mieltymyksiisi.
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

Kiitos POST, Hans Vedo ja Rick Blair.
    * REQUIRED: In setup.xml&lt;Alkuperäinen nimi: BodyHtml, Change the&lt;Keho &gt; Tag to be just&lt;Keho &gt;, koska tyyli on nyt asetettu erdap.css.
    * REQUIRED: In setup.xml, change to this&lt;endbodyhtml &gt; (mutta vaihda sähköpostiosoite sähköpostiosoitteeseen ja tunne vapaasti tehdä muita muutoksia.) :
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

    * HIGHLY RECOMENDED: In setup.xml, suositus&lt;ShortDescriptionHtml on nyt
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

Tätä voi vapaasti muuttaa, erityisesti ensimmäisen kappaleen viimeinen lause.
    * In setup.xml, sähköpostia Kaikki ja sähköpostia DailyReport Voidaan nyt olla erillinen luettelo sähköpostiosoitteista. Ensimmäinen sähköposti kaikki Jotta EDDXxxxFromErddap-tietoaineistot ovat erityisiä, esimerkiksi EDDXxxxFromDap-tietoaineistojen tilaukset käyttävät kyseistä sähköpostiosoitetta. Kiitos John Maurerille.
    * Sähköpostivirheet kirjautuvat nyt\\[isovanhemmat\\]/logs/emailLogYYY-MMM-DD.txt-tiedosto.
    * In setup.xml, on olemassa uusi, valinnainen parametri asettaa sähköpostitilin ominaisuudet (yleensä heti jälkeen).&lt;Sähköpostiosoite &gt;:
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

Oletusarvo ei ole mitään. Kiitos Rich Signell.
    * Kysymys: Jos käytät EDDTableCopya taiEDDGridKopioi, sinun täytyy suunnitella kaikki\\[isovanhemmat\\]kopiot/hakemistot ja tiedostot, jotka sisältävät "xh" hakemistossa tai tiedostonimiä vanhan pysähdyksen jälkeenERDDAP™ennen uuden alkuaERDDAP™Nämä tiedostot kopioidaan uudelleen. Olen pahoillani, mutta oli tärkeää tehdä muutos ja toivottavasti se vaikuttaa harvoihin tiedostoihin.
Linux, löydät nämä tiedostot, cd\\[isovanhemmat\\]Copy
Löydä.\\*xD\\*  
Windowsissa löydät nämä tiedostot, aloita|Etsintä
Mitä haluat etsiä: Dokumentit
Kaikki tai osa tiedostonimeä: xh
Lähde: Browse -&gt;\\[isovanhemmat\\]Copy
Klikkaa "Etsi"
valitsemaan ne kaikki
Del poistaa ne kaikki
    * Vastaus: Indatasets.xmlEDDTableFromDatabase-tietoaineistojen, päivämäärä- ja aikaleimamuuttujan osalta tietojen muuttaminen Tyyppi kaksinkertaistaa ja yksiköt sekunteiksi sitten 1970-01-01T00:00:00. Pyydämme, että tallennat aikaleimatiedot tietokantaan.\\*kanssa\\*Aikavyöhyke. Ilman aikavyöhykettä, kyselyt, jotkaERDDAP™tietokantaan ja tuloksiin, jotkaERDDAP™JDBC:n kautta saadut tietokannat ovat epäselviä ja todennäköisesti väärässä. Yritimme, mutta emme löytäneet luotettavaa tapaa käsitellä aikaleimaa ilman aikavyöhykettä. Tämä on hyvä käytäntö joka tapauksessa. Loppujen lopuksi "aikaleima ilman aikavyöhykettä" on implisiittinen aikavyöhyke. Vaikka on hienoa, että aikavyöhyke on ilmiselvä tietokannan ylläpitäjälle, on järkevää määrittää se nimenomaisesti, jotta muut ohjelmistot voivat olla asianmukaisesti yhteydessä tietokantaan. Kiitos ja anteeksi Michael Urzen.
    * Hyvin tehty: Indatasets.xmlJotta .subset-verkkosivut voisivat etsiä tabulaaritietojasi, sinun on lisättävä [&lt;subsetVariables&gt; (Docs/server-admin/datasets#subsetvariables Näytä tarkat tiedot) aineiston globaaleista ominaisuuksista.
    * Valmistettu: Indatasets.xmljos sinulla on tietoaineistoadatasetIDPmelGtsppp, vaihda se
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * Valmistettu: Indatasets.xmlUusia vaihtoehtoja on [...]&lt;cdm | | _ _ _ _ &#125;&#125; (Docs/server-admin/datasets#cdm_data_type) Globaali attribuutti, joten sinun on tarkistettava / muutettava aineistosi arvoa.
    * Sisällädatasets.xmlUusi [&lt;LähteetNeeds ExpandedFP EQ&gt;) (Docs/server-admin/datasets#sourceneedsexpandedfp_eq) on hyödyllinen, jos lähdepalvelin ei johdonmukaisesti käsittele αvariable-testejä oikein (Koska[Yleinen vaikeus testata kelluvan pistemäärän tasa-arvoa](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)) . LähteetNeeds ExpandedFP Oletusarvoisesti totta (Turvallisin asetus) Joten sinun ei tarvitse tehdä mitään muutoksia.
    * Uusi Uusi Uusi[EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles). Kiitos Jerry Yun Panille.
    * Uusi Uusi Uusi[EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). Kiitos Roy Mendelssohnille.
    * Muutoksia[EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)Käytetään laajemmalla valikoimalla tiedostoja.
    * EDDTableFromBMDE on poistettu käytöstä. Aktiivisia ja tarkoituksenmukaisia tietolähteitä ei enää ole.
    * GenerateDatasetXml, uusiEDDGridFromThredds Katalogi kerää kokonaisen 3DS-luettelon (tai alaryhmä) ja tuottaadatasets.xmlSisältöä. Kiitos UAF-projektista.
    * GenerateDatasets Xml ja DasDds tuovat tuloksensa\\[isovanhemmat\\]/logs/log.txt. Kiitos Rich Signell ja Charles Carleton.
    * Paljon parannuksia kirjautumisjärjestelmään. Kiitos POST.
*    **AsioitaERDDAP™Ohjelmoijat On tiedettävä ja tehtävä:** 
    * Hakemuksessa/WEB-inf/lib/hakemistossa on tapahtunut muutoksia. Muuta javac- ja java-luokkaa vastaavasti.
    * On olemassa uusi\\[sinun Url\\]/erddap/versio määrittääERDDAP. Vastaus on teksti, esim.ERDDAP= 1,24 Jos saat HTTP 404 Not-Found -virheviestin, käsitteleERDDAP™versio 1.22 tai pienempi. Kiitos POST.
*    **Pienet muutokset ja korjaukset:** 
    
    * EDDTableFrom Muutokset:
        * Tukea IOOSin lukemiseenSOSXML-vastaukset.
        * Lisätukea lukemiseen IOOSSOSTekstiä/csv. (NOSSOSTällä hetkellä palvelimia ei tueta.) 
        * Muutoksia, jotka liittyvät IOOS:iinSOSpalvelimen yksityiskohdat.
        * Lisätty tuki BBOX-kyselyille IOOS:lleSOSjaOOSTethys SOSpalvelimia. Nämä muutokset nopeuttavat merkittävästi asiaankuuluvia tietopyyntöjä. Kiitos IOOSSOS.
    * Teksti sisällä.matTabulaaritiedostot tallennetaan nyt oikein. Kiitos Roy Mendelssohnille.
    *   WMS
        *   OpenLayerson nyt yhdistettyERDDAP™Käyttöä vartenWMSverkkosivut. Tämä korjaa ongelman, kunOpenLayersMuutama vuosi sitten ja ehkäisee tulevia ongelmia.
        * SisälläWMS GetCapabilitiesVastaus,&lt;Online Resources » Arvo on nyt URL-osoiteWMSpalvelua. Kiitos Charlton Galvarino.
        * Legenda näkyy tässäWMSWEB Näytä väribaari Kiitos Emilio Mayorgalle.
    *   EDDGridAggregateExistingDimensionin rakentajalla oli ongelmia akselin lähteen kanssa Arvot eivät olleet samat kuin määränpäänsä. Arvot, esim. lähdeaika oli jotain muuta kuin"seconds since 1970-01-01". KiitosToddSpindler.
    * TableWriterGeoJson, ylimääräinen, bboxin jälkeen\\[............\\]on poistettu. Kiitos Greg Williamsille.
    * Paljon pieniä muutoksia ja vikoja.
    
## Versio 1.22{#version-122} 
 (2009-07-05) 

* SlideSorter Bug, joka esiteltiin 1.20.
* 1.20 käyttöön otettu OBIS-virhe on kiinnitetty.
* Viittaukset Jasonin tietoaineistoihin kuvat/gadgetit/GoogleGadgets-sivulla poistettiin.
     
## Versio 1.20{#version-120} 
 (2009-07-02) 

*   ERDDAP™Järjestäjät, lisää tämä asennus.xml-tiedostoon:
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

* Uusia datatyyppejä[EDDGridKopio](/docs/server-admin/datasets#eddgridcopy)ja[EdDTableCopy](/docs/server-admin/datasets#eddtablecopy)Tee ja säilytä paikallinen kopio toisestaEDDGridEDDTable-tietoaineiston tiedot ja ne palvelevat paikallista kopiota. Niitä on helppo käyttää ja erittäin tehokas. **Ratkaisut suurimpiin ongelmiin etätietolähteistä saatujen tietojen toimittamisessa:** 
    
    * Tietojen saaminen etätietolähteestä voi olla hidasta (useista syistä) .
    * Etäaineisto on joskus saatavilla (Jälleen, monesta syystä) .
    * Luottamus yhteen tietolähteeseen ei mittaa hyvin (Esimerkiksi, kun monet käyttäjät ja monetERDDAPkäyttää sitä) .
    
Lisäksi paikallinen kopio on alkuperäisen varmuuskopio, joka on hyödyllinen, jos jotain tapahtuu alkuperäiselle.
    
Ei ole mitään uutta tehdä paikallinen kopio tietoaineistosta. Mikä on uusi asia, että nämä luokat tekevät\\*Help helppoa\\*luoda ja\\*ylläpitää\\*Paikallinen kopio datasta\\*Erilaisia\\*etätietolähteiden ja\\*Lisää metadataa\\*kopioimalla tietoja.
    
Nämä aineistotyypit ovat osa täydellistä ominaisuutta, joka yksinkertaistaa luomista.[Verkot/klusterit/federaatiotERDDAPs](/docs/server-admin/scaling)käsitellä erittäin raskaita kuormia (esimerkiksi datakeskuksessa) .
    
* Uusi datatyyppi[EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)Saat tietoja paikallisesta tai etätietokannasta.
*   ERDDAP™Nyt on[Turvallisuusturvallisuus](/docs/server-admin/additional-information#security)järjestelmä, joka tukee todentamista (Käyttäjien kirjautuminen sisään) ja lupa (antaa heille pääsyn tiettyihin yksityisiin tietoaineistoihin) .
* On olemassa[Kaksi uutta, komentorivi-työkalua](/docs/server-admin/datasets#tools)auttaaERDDAP™Ylläpitäjät luovat XML:n uuteen tietoaineistoondatasets.xml:
    * GenerateDatasets Xml voi luoda karkean luonnoksen XML-tietokoneesta lähes kaikentyyppisille tietoaineistoille.
    * DasDds auttaa sinua testaamaan ja jalostamaan XML:ää toistuvasti.ERDDAPGenerateDatasets Xml-sivut on poistettu. Turvallisuussyistä he tukivat vain muutamaa tietotyyppiä. Uudet työkalut ovat parempi ratkaisu.
* Uusi[Tilasivut](/docs/server-admin/additional-information#status-page)Anna kenenkään (Erityisesti ylläpitäjät) näkemys yhdenERDDAP™mistä tahansa selaimesta menemällä\\[Perusta\\]/erddap/status.html.
* Tabledap tukee[palvelimen sivutoiminnot](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions):
    * &distinct () poistaa kaksoisrivit vastaustaulukosta,
    * &orderBy (............) Voit määrittää, miten vastaustaulukko on ratkaistava.
    * &orderByMax (............) Voit määrittää, miten vastaustaulukko on lajiteltava ja poistaa kaikki rivit lukuun ottamatta riviä, joiden enimmäisarvot on määritetty viimeisessä sarakkeessa. Tätä voidaan käyttää esimerkiksi viimeiseen saatavilla olevaan dataan.
* Tabulaariset tietoaineistot voivat nyt sisältää lisäaikamuuttujat, joita ei ole nimetty"time". Nämä muuttujat on tunnustettu niiden "yksiköt" metadata, joka täytyy sisältää" since "  (Numeerinen päivämäärä Ajat) tai "YY" tai "YY" (Formatted String päivämäärät) . Ole hyvä ja käytädestinationName "time"Pääpäivänä Aikavaihtelua.
*   ERDDAP™Nyt syntyy yksi[Map.xml](/docs/server-admin/additional-information#sitemapxml)tiedosto, joka kertoo hakukoneet, ettäERDDAPPitää vain ryöstää joka kuukausi.ERDDAP™Järjestäjät, seuratkaa[Nämä ohjeet](/docs/server-admin/additional-information#sitemapxml)ilmoittaa hakukoneet uudesta sivustokartta.xml-tiedostosta.
*   ERDDAPVirheviestit ovat nyt paljon lyhyempiä ja suunnattu asiakkaille. (Ei ohjelmoijia) . Kiitos Greg Williamsille.
* [...]&lt;Pyydä musta lista » (Docs/server-admin/datasets#requestblacklist Näytä tarkat tiedot) Tukee myös IP-osoitteita, joissa viimeinen numero on korvattu.
* Pyynnöt.json.geoJson-tiedostot voivat nyt sisältää valinnaisen[jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/)Lisäämällä "&.jsonp.functionName -kyselyn loppuun asti. Periaatteessa tämä vain kertooERDDAP™Lisää "_functionName_ ("Vastauksen alku ja") "Vastauksen loppuun asti. Jos alun perin kyselyä ei ollut, jätä "ja" pois kyselystäsi. Kiitos Greg Williamsille.
* Uusia tilastoja on lisätty[Päivittäinen raportti](/docs/server-admin/additional-information#daily-report).
* Verkkosivuilla, joilla on luettelo tietoaineistoista, laitoksesta ja id:stä, on nyt äärioikeistossa. Tämä siirtää tilauksen ja muita hyödyllisempiä sarakkeita näkyviin kapeilla tietokonenäytöillä.
* Kaikilla verkkosivuilla sivun otsikko (perustuu sivuun)&lt;Otsikko &gt; Sisällä&lt;StarHeadHtml&gt;, jonka määrität asennuksessa.xml) on muokattu sisältämään parempi kuvaus verkkosivusta. (esimerkiksi nykyisen tietoaineiston otsikko ja laitos) .
* Xmx-tiedot sisältyvät nyt log.txt-, Daily Report- ja status.html-tietoihin. Kiitos Ellyn Montgomerylle.
*   ERDDAP™ylimääräinen yleiskäyttöinen suoja kaikkia virheitä vastaan (Lähde: OutOfMemoryError) . Kiitos Charles Carletonille.
* Virheiden käsittelyn parantaminen, jos vastaus on jo tehty.
* EDDTableFromFiles jaEDDGridFiles nyt sallii&lt;MetadataFrom &gt; ensimmäinen tai viimeinen Penultimaa ei enää tueta. Ensimmäiset ja viimeiset perustuvat tiedostojen viimeisimpään versioon.
* Bug fix: EDDTableFromSOSpätemättömät tiedot yhdestä asemasta heikensivät poikkeusta ja aiheuttivat koko tietoaineiston hylkäämisen. Näitä asemia on vain sivuutettu (Virheilmoitus on kirjattu log.txtiin) . Kiitos Rick Blairille.
     

## Versio 1.18{#version-118} 
 (2009-04-08) 

* Bug fix: Alkaen 1.14, EDDTable Data Access Form ja Make A Graph Web-sivu ei oikein käsiteltyjä rajoituksia.
* 1.14 alkaen EDDTableFromDapSequence ei käsitellyt aikarajoituksia oikein, jos lähteen aikayksiköt eivät olleet "toisia vuosien 1970-01T00:00 jälkeen".
     

## Versio 1.16{#version-116} 
 (2009-03-26) 

*   ERDDAP™Hallinnoitsijat:
    * Tämä on tärkeä julkaisu, koska se korjaa virheen, joka jättiERDDAP™thread, jos käytät Tomcat Manager Stop / Start tai ReloadERDDAP. Kun asennat 1.16, älä käytä Tomcat-ohjainta poistaaksesi vanhanERDDAP™ja ottaa käyttöön uudenERDDAP. Sen sijaan: **Erota vanhaERDDAP™Käynnistä Tomcat (tai palvelin) Ja sitten uusiERDDAP.** On aina hyvä idea tehdä se uuden version asennuksessa.
    * Lisätään [&lt;Pyydä ilmaista »&lt;/ RequestBlacklist » (Docs/server-admin/datasets#requestblacklist Näytä tarkat tiedot) sinundatasets.xml. Tätä voidaan käyttää määrittämään luettelo asiakkaan IP-osoitteista, jotka on estettävä. (mm. poistaakseen palvelunestohyökkäyksen tai liian kiihkeän verkkorobotin) .
* Nyt on olemassa a\\[isovanhemmat\\]/logs Näytä tarkat tiedotERDDAP™Lokitiedostoja. Kun aloitatERDDAP™Se tekee arkiston kopion log.txt ja log. txt. aiemmat tiedostot, joissa on aikaleima. Jos on ongelmia ennen uudelleenkäynnistystä, voi olla hyödyllistä analysoida näitä tiedostoja.
*   ERD&gt;ERDDAP™Nyt tilausjärjestelmä on käynnistynyt.
*   ERDDAP™Jälleen kerran sallittu (Silti ei suositella) "%26" koodaus "ja" pyynnöstä URL-osoitteet (Katsokaa[V1.14 Muutos](#percent26)) .
* Useita uusia lisäyksiä Tally-osioon[Päivittäinen raportti](/docs/server-admin/additional-information#daily-report).
* Pienet vikakorjaukset tuottavat DatasetsXml.
* Muutamia pieniä korjauksia.
     

## Versio 1.14{#version-114} 
 (2009-03-17) 

* Muutoksia käyttäjille:
    * verkkotietopyynnöissä,ERDDAP™Nyt tukee:[Viimeinen](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last)missä n on indeksien ja[ (Viimeinen d) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses)missä d on numeerinen arvo (Aika, se on sekunneissa) .
    * Tabular-tietopyynnöissä String-rajoitukset vaativat nyt[Kaksinkertainen lainaus](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings)Esimerkiksi &id="NDBC40121" Tätä tarvitaanDAPprotokolla.
    * Tabulaarisissa tiedoissa,ERDDAP™Nyt tarvitaan[Kaikki rajoitukset ovat asianmukaisesti koodattuja.](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode). Selaimet tekevät tämän automaattisesti, joten tämä vaikuttaa enimmäkseen tietokoneohjelmiin / skripteihin, jotka käyttävätERDDAP.
#### % 26{#percent26} 
*   [aikaisemmin,](#percent26)The[Sisältää graafisen sivun](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html)ja[ERDDAP™Google Gadget verkkosivut](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html)Korvaa kuvan URL-osoitteen "ja" prosenttiosuudella 26. Tästä eteenpäin sinun on korvattava kuvan URL-osoitteen "ja" . Joten sinun on korvattava kaikki "%26" olemassa olevilla verkkosivuilla ja Google Gadgets "&amp;" (Anteeksi) 
*   ERDDAP™Järjestäjät, kiitos:
    * Lisää seuraavat asiat omaan[Asennus.xml](/docs/server-admin/deploy-install#setupxml)tiedostotiedosto (Muuta lippua KeyKeyn arvo) :
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

    * Rivillä sen jälkeen&lt;Sähköpostiosoite »[Asennus.xml](/docs/server-admin/deploy-install#setupxml)tiedosto, lisää
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
Kirjoita todellinen salasanasi.
    * Voit muuttaa&lt;msSampleBox &gt; omassa[Asennus.xml](/docs/server-admin/deploy-install#setupxml)tiedosto sisältää pituusarvoja jopa 360, esim.
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * Sisälläsidatasets.xmltiedosto, nimeä EDDTableFromNc4DFiles EDDTableFromNcFiles tiedostoiksi (jotka tukevat tiedostoja millä tahansa mitalla) . Jos sinulla on EDDTableFromNc4DFiles-tiedot:
        
        1. Sinun on muututtava tyypiksi = "EDDTableFromNcFiles" tiedostoissasi. XML-tiedosto.
        2. Sinun on lisättävä&lt;ndimensio &gt; 4 4&lt;/nDimensions&gt; tag to the dataset's XML
        3. Voit lisätä uuden&lt;sortFilesBySourceNames&gt;-tunnisteet tiedostojen sisäisen järjestyksen määrittämiseksi, mikä määrittää palautettujen tietojen kokonaisjärjestyksen.
        
yksityiskohtiin, katso[EDDTableFromfiilit](/docs/server-admin/datasets#eddtablefromfiles).
    * EDDTableFromDapSequence (käytetty)OPeNDAPDRDS-palvelimetdatasets.xmlKäytimme&lt;Lähde:CanConstrainStringsRege&lt;Lähde:CanConstrainStringRegex&gt; DRDS-regex-tuki on rajallisempi kuinERDDAP"Sen vuoksi suosittelemme&lt;Lähde:CanConstrainStringsRegex&lt;/sourceCanConstrainStringRegex &gt; niin, että regex-rajoituksia ei siirretä lähteelle, vaan ne käsitellään sen sijaanERDDAP.
    * Lähde: Constrain... Sisällädatasets.xmlBy[EdDTableFromDapsequence Näytä tarkat tiedot](/docs/server-admin/datasets#eddtablefromdapsequence)ja (Sisäisesti) Kaikki EDDTable-tiedostotyypit. Uusi järjestelmä on yksinkertaisempi ja heijastaa paremmin eri tietolähteiden vaihtelua. Saatat joutua muokkaamaan XML:ää tietoaineistoissasidatasets.xml.
* On olemassa useita uusia ominaisuuksia, jotka ovat hyödyllisiä itse, mutta yhdistettynä myös helpottavat luomista.[Verkot/klusterit/federaatiotERDDAPs](/docs/server-admin/additional-information#grids-clusters-and-federations).
    * Uusia datatyyppejä:
        *   [EDDGridLähde: Eddap](/docs/server-admin/datasets#eddfromerddap)ja[EdDTableFromDap](/docs/server-admin/datasets#eddfromerddap)joka antaa yhdenERDDAP™Sisältää tietoja toisestaERDDAP™erittäin yksinkertaisella ja erittäin tehokkaalla tavalla.
        *   [EDDGridFilejä](/docs/server-admin/datasets#eddgridfromfiles)  (ja sen alaluokka,[EDDGridLähde: NCFiles](/docs/server-admin/datasets#eddgridfromncfiles)joka osaa lukeaNetCDF .ncGRIB .grb jaHDF .hdftiedostoja) .
        *   [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)joka osaa lukeaNetCDF .ncjolla on pöydän kaltainen rakenne.
    * RunLoadDatasets ja LoadDatasets uusittiinERDDAP™on hyvin reagoiva tietojen lataamiseen perustuen tiedostoihin[Lippu](/docs/server-admin/additional-information#flag)Hakemisto (usein)&lt;5 sekuntia, jos pääasiallinen taajuus on tällä hetkellä valmis.
    * Uusi palvelu mahdollistaa[URL luo lipputiedoston](/docs/server-admin/additional-information#set-dataset-flag)tiettyyn tietoaineistoon, esim.
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
Luo lipputiedosto rPmelTao-lippuhakemistoon (Vaikka lippu Avain on väärässä) .
    * Uusi Uusi Uusi[tilaus](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)palvelu, jotta asiakas voi määrittää toimen, joka tehdään, kun tietty tietoaineisto luodaan. (MilloinERDDAP™Käynnistetään uudelleen) Aina kun aineisto muuttuu millään tavalla. Järjestelmä voidaan poistaa käytöstä&lt;Järjestelmänvalmistus &gt; omassa[Asennus.xml](/docs/server-admin/deploy-install#setupxml)tiedosto. TheERDDAP™ [Päivittäinen raportti](/docs/server-admin/additional-information#daily-report)Listaa kaikki tilaukset ja sisältää URL-osoitteen, joka on tarpeen jokaisen peruuttamiseksi, jos sinusta tuntuu, että järjestelmä on väärinkäytetty. Sisällädatasets.xmlUusi, valinnainen [&lt;tilaus Emailblacklist » (Docs/server-admin/datasets#subscriptionemailblacklist Näytä tarkat tiedot) Tag, jotta järjestelmänvalvojat voivat määrittää koodatun luettelon sähköpostiosoitteista, jotka on välittömästi mustalle listalle tilausjärjestelmästä.
    * Uusi [&lt;Muutos » (Docs/server-admin/datasets#onchange) Attribuuttidatasets.xmlAnnetaanERDDAP™Hallinnoitsija määrittää toimen, joka toteutetaan, kun tietty tietoaineisto luodaan. (MilloinERDDAP™Käynnistetään uudelleen) Aina kun aineisto muuttuu millään tavalla.
    * Parannukset täydelliseen tekstihakuun: kunkin tietoaineiston hakusanan tallentaminen käyttää nyt 1/2 muistia. Algoritmin etsintä (Boyer-Moore) 3X nopeampi.
    * SähköpostitERDDAP™Aiheeseen ja sisältöön aina\\[Erddap Url\\]jotta olisi selvää, mikäERDDAP™Tämä tuli (Jos käytät useitaERDDAPs) .
    * Laajempia tilastoja kerätään[Päivittäinen raportti](/docs/server-admin/additional-information#daily-report)sähköpostia.
    * Uusi lokitiedosto\\[isovanhemmat\\]/emailLogyEAR-MM-DD.txt kirjaa kaikki sähköpostit lähetetäänERDDAP™joka päivä. Tämä on erityisen hyödyllistä, jos palvelimesi ei todellakaan voi lähettää sähköposteja, voit ainakin lukea ne lokissa.
    *   ERDDAP™Nyt tekee\\[isovanhemmat\\]/Cache/ (datasetID) Hakemisto jokaisesta tietoaineistosta, koska tiedostoja voi olla paljon.
* Uusi Uusi Uusi[RSS2.1.](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)Rehua jokaiseen dataan (Etsi appelsiiniaRSSIcons on lists of datasets, Data Access Forms, and Make A Graph verkkosivut) .
*   EDDGrid .kmlResurssit käyttävät nyt laadittuja kuvia ("superoverlays" - dynaamisesti luotu neliökuva) . Alkuperäiset kuvat latautuvat GoogleEarthiin paljon nopeammin kuin ennen. Kartan resoluutio kasvaa, kun zoomaat sisään, koko tietoaineiston resoluutioon asti. Suositus: Käyttäjien on pyydettävä.kmlKerran, mutta aineiston koko pituus, leveys. Ajankäytön tuki poistettiin (Toivottavasti se tulee takaisin) .
*   ERDDAP™Nyt lisätään[Cache-Control max-age otsikot](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)Kaikki tiedostot, jotka on pyydetty /images-hakemistosta. Tämä vähentää huomattavasti staattisten tiedostopyyntöjen määrää.ERDDAPNäin nopeutuu enitenERDDAP™sivuja. Myös monetJavaScript-tiedostojen viittaukset siirtyivät HTML-sivujen pohjaan, mikä myös nopeuttaa moniaERDDAP™sivuja. Kiitos Steve Soudersin kirjasta "High Performance Web Sites" ja FireFoxin ySlow-lisäosan.
*   ERDDAP™Vaihdettu netcdf-java 2.2.22 netcdf-java 4.0. Muun muassa tämä mahdollistaaEDDGridNCFiles luettavaksiHDF .hdfGRIB .grb jaNetCDF .nctiedostoja.
*   EDDGridADP jaEDDGridNCFiles tukee nyt myös Darrayta (Myös DGRID)  dataVariables. Jos ulottuvuudella ei ole vastaavaa koordinaattimuuttujaa,ERDDAP™Luo akselimuuttuja indeksiarvoilla (esim. 0, 1, 2, ..., 311, 312) . Kaikki muut näkökohdatEDDGridJää samaksi:
**** Se palvelee edelleen kaikkia tietoaineistoja verkkoina, joissa on akselimuuttuja kullekin ulottuvuudelle.
**** Kyselyt voivat edelleen pyytää arvoja akselimuuttujalta.
Kiitos Charles Carleton, Thomas Im, Dorian Raymer ja muut.
* TheWMS OpenLayersSivuilla on nyt oletuspituus, leveysalue, joka on hieman suurempi kuin tietoaineiston valikoima. (ei ole tarkka ulottuvuus, joten pienten aineistojen konteksti on selkeämpi.) . Oletusarvo voi nyt olla myös 0-360, joka mahdollistaa monien tietoaineistojen koko valikoiman. KiitosToddSpindler.
* Uudet liukuportaat joissakin Data Access -muodoissa ja tee Graph-sivut. yksinkertaistaa (Risti) halutun tiedon määrittäminen ja hyvän visuaalisen palautteen antaminen.
* Uusi vaihtoehto&lt;Tietoja &gt; Tagit sisäändatasets.xml:[Aktiivinen = "väärä"](/docs/server-admin/datasets#active).
* ViittauksetERD&gt;ERDDAP™Vaihtoehtoinen rannikko.pfel (Toimii edelleen proxyllä) Rannikkovartiosto.pfeg (Mieluiten) .
* Uusi tuki[data\\_minjadata\\_max](/docs/server-admin/datasets#data_min-and-data_max)Muuttuvat metatiedot.
* Osittainen ratkaisu[Odota sitten TryAgain / Poikkeukset](/docs/server-admin/additional-information#waitthentryagain-exception): Jotkin pyynnöt, jotka aiemmin epäonnistuivat, kun tietolähteen muutos havaittiin, onnistuvat, koskaERDDAP™palauttaa tietoaineiston ja pyytää tietoja uudelleen automaattisesti, kaikki alkuperäisen pyynnön yhteydessä.
* Bug fix: Tuottaa Dataa XML oli vammainenERDDAP™versio 1.12. Kiitos Ellyn Montgomerylle tästä.
* Pieniä muutoksia virheiden käsittelyyn.
* Monia parannuksia, joiden avulla vältetään ja käsitellään mahdollisia kilpailuolosuhteita (mahdolliset ongelmat, jotka johtuvat monikielisestä luonteestaERDDAP) Se aiheutti pieniä ja harvinaisia ongelmia.
* Jos kuvassa on virheilmoitus, kuva pysyy vain välimuistissa 5-10 minuuttia. (Ei 60) . Kiitos Cara Wilsonille.
* Vakioviesti, kun tietoja ei ole, on nyt "kyselysi ei tuottanut vastaavia tuloksia", mikä on lyhyempi, tarkempi ja yhteensopiva.OPeNDAPpalvelimia.
*   EDDGridEi enää sidottuja akseliarvoja.
* Pieniä muutoksia .ver- ja .help-pyyntöihin.
* Paljon pieniä muutoksia ja vikoja.
     

## Versio 1.12{#version-112} 
 (2008-10-31) 

* EDDTableFromSOSJälleen kerran NDBCSOSToimii uuden NOS:n kanssaSOS.
* EDDTableFromBMDE vaatiiERDDAP™admin määrittäädataVariables.
*   EDDGridSe ei enää edellytä, että lat ja lon ovat tasaisia. Läpinäkyvä Ping tai.kml. KiitosToddSpindler.
* Muutamia pieniä muutoksia.
     

## Versio 1.10{#version-110} 
 (2008-10-14) 

* Uusi "colorBar" metadata datamuuttujatdatasets.xmlmäärittää oletusväripalkkiasetukset grafiikoille ja kartille. Näytä[Lisää tietoa](/docs/server-admin/datasets#color-bar-attributes). Tämä on tärkeää, koska se parantaa huomattavasti Make A Graphin tuottamien oletuskuvien ja karttojen ulkonäköä ja koska oletuskaavioilla ja kartoilla on johdonmukainen väripalkki, vaikka asiakas muuttaa pyydetyn ajan tai maantieteellisen alueen. Tämä oli myös välttämätöntä, jottaWMS.
*   ERDDAP™Tarjoamme nyt suurimman osan verkon tiedoistaWMSpalvelua. Tämä on tärkeää, koska se osoittaa, että lisäksi saada tietoja useista palvelimista,ERDDAP™Tietoja voidaan jakaa eri protokollien kautta (DAP,WMS... lisää tulevaisuudessa) . Nähdään[Asiakkaan dokumentointi](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html). Tai[dokumentointia johtajille](/docs/server-admin/datasets#wms). tai[Kokeile vaikka](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html).
* Pituusarvojen uusi tuki &gt; 180.kmltiedostoja.
* Uusi cdm = muut
*   ERDDAP™Tukee nyt "boolean" lähdeaineistoa. Näytä[Lisää tietoa](/docs/server-admin/datasets#boolean-data)Tästä on hyötyä tulevalle EDDTableFromDatabase -palvelulle.
* Uusi EDDTableFromBMDE tukee DiGIR/BMDE-tietolähteitä.
* EDVGridAxis mahdollistaa laskevien arvojen laskemisen. PmelOscar-tietokanta tarvitsi tämän.
*   ERDDAP™HTTP-virheet (Esim. ”404 resurssille/sivulle, jota ei löydy”) enemmän kuin HTML-sivuja, joissa on virheilmoituksia.
* Paljon muutoksia / lisäyksiäERDDAP™dokumentointi.
* Paljon pieniä muutoksia.
* Joitakin vikoja korjataan.
*    **AsioitaERDDAP™Järjestelmänvalvojien tulisi päivittää tätä versiota:** 
    * Sisällädatasets.xmlMikä tahansa EDDTableFromSOSTietoaineistot, jotka muuttavat "observedProperty" -metatietoja "lähdeObservedProperty".
    * Säännöt anaxisVariabletai taidataVariable&gt;destinationNameNyt ovat[tiukempi](/docs/server-admin/datasets#datavariable-addattributes). Tarkista, että muuttuvat nimet ovat voimassa. Tarkista ne käsin tai juokseERDDAP™Katso virheilmoitukset raportissa, joka on lähetetty ylläpitäjälle.
    * Sisällädatasets.xmljos haluat verkkotietomuuttujan olevan käytettävissäWMSSinun on lisättävä metadataa. Ainakin esimerkiksi&lt;nimi ="colorBarMinimumTyyppi = kaksinkertainen &gt; 0&lt;&gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Näytä[Lisää tietoa](/docs/server-admin/datasets#wms).
    * Lisää seuraavat asiat omaan[Asennus.xml](/docs/server-admin/deploy-install#setupxml)tiedostotiedosto (muokata sitä tietojesi avulla) :

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

## versio 1.08{#version-108} 
 (2008-07-13) 

* Uusi verkkopalveluERDDAP™tuottaminen Dataa XML, ApuaERDDAP™ylläpitäjät luomalla karkean XML-luonnoksen, jota tarvitaan kuvaamaan tietoaineistoadatasets.xml
* Joitakin muutoksia/bug-korjauksia, jotka liittyvät verkkoverkon näkemiseen avoimena palvelimena, mukaan lukien: maailmanlaajuinen metadata on nyt merkitty "NCGLOBAL". ("Globalin" sijaan) .
* TheEDDGridEDDTable Data Access Forms hyödyntää nyt kyselytietoja URL-osoitteessa. Esimerkiksi, jos käyttäjä siirtyy Make A Graph -lomakkeesta Data Access -lomakkeeseen, rajoitukset siirtyvät.
*   tabledapTehdään Graph nyt sallia rajoituksia String-muuttujat.
* EDDTable's Make A Graph antaa NaN-rajoitteita. Kiitos Steve Hankinille.
* Bug fix: EDDTable Säästäminen Asimage ei tunnistanut .colorbar min ja max arvoja oikein. Kiitos Steve Hankin
* Paljon parannuksia asennukseen DatasetsXml. Kiitos Ellyn Montgomerylle.
* Griddap-pyynnöt sallivat () -tyyli pyytää hieman akselivälin ulkopuolella. Tämä on sopivaa, koska () Arvot pyöristetään lähimpään todelliseen arvoon. Kiitos Cindy Besseylle
* Tein FloatArray- ja DoubleArray-testin, joka on kehittyneempi. Se on aina epätäydellistä (koska testi on räätälöity jokaiseen tietoaineistoon) Mutta sen pitäisi olla parempi. Kiitos Ellyn Montgomerylle.
* Muutin asennus.html ja setupDatasets Xml.html erddapin /download-hakemisto ja kova koodaus kaikki linkit niihin. Nyt voin tehdä muutoksia ja päivittää tiedot heti.
* Paljon pieniä muutoksia. Muutamia pieniä korjauksia.
*    **AsioitaERDDAP™Järjestelmänvalvojien tulisi päivittää tätä versiota:** 
    * Liikkuminen&lt;Lyhyt kirjoitus Html &gt; viesteistäsi.xml[Asennus.xml](/docs/server-admin/deploy-install#setupxml)tiedosto. Se määrittää tekstin, joka näkyy vasemmalla puolellaERDDAP™Kotisivu. Lisää&lt;h1&gt;ERDDAP&lt;h1&gt; (tai jokin muu otsikko) sen huipulle. **Tai** kopioita&lt;TheShortDescriptionHtml uudessa[Asennus.xml](/docs/server-admin/deploy-install#setupxml)tiedostotiedosto (Uusi erdapContent.zip) Asennukseen.xml.
         

## versio 1.06{#version-106} 
 (2008-06-20) 

* Uusi tukiIOOS DIF SOStietolähteet.
* Paljon pieniä muutoksia. Muutamia pieniä korjauksia.
     

## Versio 1.04{#version-104} 
 (2008-06-10) 

* Uusi Slide Sorter.
* Uusi Google Gadgets -sivu ja esimerkkejä.
* Bug korjaaEDDGrid.saveAsNc muuttuvassa mittakaavassa ja addOffsetissa.
     

## versio 1.02{#version-102} 
 (2008-05-26) 

* Uusi Uusi UusiEDDGridSideBySide mahdollistaa eriaxisVariables\\[0\\]Lähdelähde arvoja.
* Kaikki virtaukset ja tuulet yhdistettiinEDDGridSideBySide Datasets.
* Kuvapyyntöjen kuvat on nyt kiinnitetty tunniksi.
     

## Versio 1.00{#version-100} 
 (2008-05-06) 

* Tee Graph-sivut ja grafiikkakomennot URL-osoitteissa.
* Lipputiedostojen tukeminen pakottaa tietojen lataamisen uudelleen.
* Uusi tiedostotyyppi: EDDTableFrom4DFiles (EDDTableFromFilesin ensimmäinen alaluokka) .
