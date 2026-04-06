---
title: "ERDDAP™ - Changes"
---
#  ERDDAP™ Muutokset

 ERDDAP™ on hyvä esimerkki [Käyttäjä-driven-innovaatio](https://en.wikipedia.org/wiki/User_innovation) , jossa tuoteinnovaatiot tulevat usein kuluttajilta ( ERDDAP™ käyttäjät) , ei vain tuottajat ( ERDDAP™ kehittäjät) . Vuosien mittaan suurin osa ideoista uusia ominaisuuksia ja muutoksia ERDDAP™ ovat tulleet käyttäjiltä. Nämä käyttäjät ovat hyvitetään alla heidän hyviä ideoita. Kiitos&#33; Pitäkää ne hyvät ehdotukset tulossa&#33;

Tässä ovat kuhunkin liittyvät muutokset ERDDAP™ Vapauta.

## Versio 2.10.0{#version-2300} 
 (julkaistu 2026-04-07) 

Versio v2.30,0 keskittyy pitkälti vikakorjauksiin, huoltopäivityksiin vakauden ja turvallisuuden kannalta sekä suorituskyvyn parantamiseen.

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
      * Parannettu [Kroissantti](https://mlcommons.org/working-groups/data/croissant/) metatietojen yhteensopivuus ja ilmeinen tuki, mukaan lukien [mlkroissantti](https://pypi.org/project/mlcroissant/) yhteensopivuus.
      * Parannettu tuki parketille.

*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
      * Käyttämättömät komentorivityökalut ja niihin liittyvät koodit poistettiin koodiluettelosta teknisen velan vähentämiseksi. Katso https://github.com/ERDDAP/erddap/pull/432.
 
      * Uusi ominaisuuslippu `VoimaSynchronousLoading` on lisätty, jotta voidaan ohittaa oletuslyhennetyn tietoaineiston lastaamisen lähestymistapa. Tätä pitäisi harvoin tarvita, ja sitä tulisi käyttää vain tapauksissa, joissa lykkäys aiheuttaa ongelmia. Katso [ominaisuus lippu sivu](/docs/server-admin/feature-flags#forcesynchronousloading) yksityiskohtaisesti.

## Versio 2.2.9.0{#version-2290} 
 (julkaistu 2025-12-15) 

Toimintaa tarvitaan.

 ERDDAP™ versio 2.29.0 edellyttää jdk 25 tai uudempi. Päivitä jdk-versiosi. Jos se on ongelma, voit rakentaa ERDDAP™ vanhemmalle jdk:lle (takaisin vähintään 17:ään) muuttamalla pom.xml-tiedostoa. JDK 25 on LTS julkaisu Java ja sisältää monia parannuksia, erityisesti parannettua suorituskykyä.

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    * ISO 19115 -versiot: Katso alla admin info. Käyttäjille voit nyt pyytää tiettyjä versioita ISO 19115 metadatasta. Tee tämä ruudukosta / tabledap sivut tiedostolle, jonka tiedostotyyppi pudottaa alas. Nämä versiot ovat riippumattomia palvelimen oletuksesta.

*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * Uusi ominaisuus, MQTT tuki. Lisätietoja suosittelen lukea [Uusi sivu siitä.](/docs/server-admin/mqtt-integration) Tähän sisältyy mahdollisuus rakentaa MQTT-viestejä ja julkaista MQTT-viestejä, kun tietokokonaisuus muuttuu. Se on oletuksena pois päältä, joten jos haluat käyttää sitä, sinun täytyy ottaa se käyttöön.

Kiitos Ayush Singh työtä MQTT&#33;

    * S3:n parannukset: S3-URIen tuen lisääminen välimuistiksiUrl-arvosta. Tämä mahdollistaa ERDDAP tukea yksityisiä kauhoja isännöi pois amazonaws.com Käsitteli myös S3-muistivuotoa.

Kiitos @SethChampagneNRL työstä S3&#33;

    * ISO 19115 -versiot: ISO 19115 -metatiedot tukevat nyt kolmea eri versiota. Oletusversiota ohjataan asetuksellasi.xml. Jos käyttöSisISO19115 on väärä, palvelin oletusarvoisesti antaa NOAA muutettu ISO19115_2. Jos käyttöSisISO19115 on totta, silloin palvelin käyttää erilaista versiota käytön arvosta riippuenSisISO19139. Jos käyttöSisISO19139 on totta, oletus on ISO19139_2007, jos käyttöSisISO19139 on virheellinen oletus on ISO19115_3_2016. Suosittelemme käyttämäänSisISO19115=true ja useSisISO19139=false. Organisaatiosi voi vaatia erilaisia asetuksia.

    * Siirretty javalle. aikakirjasto (Java.utilin sijasta. GregorianCalendar) . Tämän pitäisi parantaa suorituskykyä kyselyissä, joihin liittyy päivä-/aikasarakkeita. Suurimmalla osalla aineistoista ei pitäisi olla merkittäviä vaikutuksia. Yksi tunnettu tapaus, joka aiheuttaa muutoksen, on, jos tietokokonaisuus käyttää `päivää alkaen 0000-01-01` tai vastaavaa. Jos tämä on ongelma muuttuja, voit lisätä ` <att name="legacy_time_adjust"> tosi </att> ` ja addAttributes joko dataVariable tai axisVariable .
    
    *    datasets.xml on nyt käsitelty [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Tällä on monia käyttötarkoituksia, kuten yksityisten arvojen asettaminen (kuten salasanat) ympäristömuuttujien käyttö. Tämä voidaan kytkeä pois päältä asettamalla EnvParsing-toiminto vääräksi setup.xml:ssä.

    * Paineakseli: Lisää erityistapaus nousut määritelty paine. Tätä käytetään pääasiassa meteorologisissa aineistoissa, joissa määritetään isobaaristen tasojen pystysuorat nousut. HUOMAUTUS: Pienemmät painearvot tarkoittavat korkeampia nousuja, joten akseli kulkee metreinä tai jaloissa määriteltyä normaalia nousua vastapäätä.

Kiitos [SethChampagneNRL](https://github.com/ERDDAP/erddap/pull/373) 

    *    EDDGrid FromNcFiles: On. (kokeellinen) tuki EDDGrid FromNcFiles-aineistoissa on muuttujia, jotka eivät käytä samoja akseleita. Kertokaa, miten tämä toimii tai jos käytös ei tunnu aivan oikealta.

    * On kokoelma optimointia, joka pitäisi olla turvallinen, mutta lippuja palata vanha käyttäytyminen tarvittaessa. Jos haluat asettaa lippuja, kirjoita vika. Jos emme kuule mitään kysymyksiä useimmat näistä poistetaan uuden käyttäytymisen oletuksen tulevaisuudessa. Siinä on... [uusi sivu ominaisuus liput](/docs/server-admin/feature-flags) jossa voit lukea näistä ja muista lippuja.

      * kosketus Kierre Ainoastaan WhenItems: Tämä on muutos niin, että touchThreead on käynnissä vain, kun on kohteita jonossa koskettaa. Yksi vähemmän lankajuoksu on pieni optimointi, mutta silti hyödyllinen. Oletukset ovat totta.

      * useNcMetadata Tiedosto: Tämä muutos antaa sisäiselle tiedostotaulukolle mahdollisuuden käyttää nc-attribuutteja, erityisesti muuttuvaa aktuaalista_range-attribuuttia välttääkseen lukemasta koko nc-tiedostoa. Tämä voi nopeuttaa merkittävästi tiedostojen alkulataamista nc-tiedostojen perusteella, jos kunkin tiedoston kunkin muuttujan aktuaalinen_alue sisältyy määritteenä. Huomaa, että tämä luottaa arvoon, joten jos se on väärin, sisäisellä tiedostotaulukolla on vääriä tietoja. Oletukset ovat totta.

      * ncHeader MakeFile: Tämä muutos mahdollistaa nc otsikkotiedostojen tuottamisen luomatta ensin edustava nc-tiedostoa. Tämä on pieni optimointi EDDTable, mutta valtava optimointi monille EDDGrid pyynnöt. Oletukset väärälle (kuten väärä on tarkoitettu optimoitu käytös) .

      * Tausta Luo subset Taulukot: Tämä muutos siirtää osan tietojen alustavasta käsittelystä taustaksi. Tämän pitäisi parantaa tietoaineistojen lastausaikaa. Erityisesti viivästynyt osa on subset taulukoita, jotka ovat myös syntyy tarvittaessa, jos viivästynyt käsittely ei ole tapahtunut vielä. Oletukset ovat totta.

    * Joitakin pieniä muutoksia, korjauksia (Kiitos Italo Borrellille EDDTableFromAggregateRowsista, Kiitos. @SethChampagneNRL mahdollistaa pituuspiirien yli 360 EDDGrid LonPM180 ja useita muita korjauksia) , ja optimointia.

*    **-Ei. ERDDAP™ Kehittäjät:** 
    * Lisäoptimointi, mukaan lukien leikkaus testi ajoaika puoli.

    * Uusi testiprofiileja hyvin hiutaleita (ulkoinen) tai erittäin hitaasti (hidas AWS) testit.

## Versio 2.28.1{#version-2281} 
 (julkaistu 2025-09-05) 

*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * Lisätty tuki X-Forwarded-Prefixille. Tämä on erityisen mielenkiintoista ylläpitäjille, jotka käyttävät palvelimia subpath. Lue päivitetyt dokumentaatiomme [Apassi](/docs/server-admin/deploy-install#apache) sekä [Nginx](/docs/server-admin/deploy-install#nginx) Lisätietoja.

Kiitos [@srstsavage](https://github.com/srstsavage) 

## Versio 2.28.0{#version-2280} 
 (julkaistu 2025-08-29) 

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    *    [Kroissanttiskeema](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) on nyt käytettävissä. Admins voi valvoa, käyttääkö oletusmetadata Croissant, mutta alkaen 2.28.0 voit pyytää Croissant määritelmä uuden vientitiedoston tyyppi ".croissant" (joka tarjoaa jsonld-tiedoston) .

*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * Uusi koira Kuva luotiin jokaiseen yhdistettyyn nostopyyntöön. Nämä ovat alfarakennelmia, ne eivät ole versioituja julkaisuja. Heillä on merkintä kuten "20250814T034025," joka osoittaa, milloin se on rakennettu. Jos haluat kokeilla uusimmat ominaisuudet voit käyttää näitä. Jos haluat jotain vakaampaa käyttää julkaisuja semanttinen versio tag (esim. 2.28.0) . Pyrimme aina siihen, että alfaversiot ovat käyttökelpoisia, mutta niitä testataan vähemmän kuin versioitamme. Suosittelemme aina, että käytät jotain vähintään yhtä uutta kuin "viimeinen" julkaisu, joka on viimeisin semanttinen versio.

    * Docker Kuvat nyt saatavilla [GitHub](https://github.com/ERDDAP/erddap/pkgs/container/erddap) Lisäksi [DockerHub](https://hub.docker.com/r/erddap/erddap) .

Kiitos [@ ocefpaf](https://github.com/ocefpaf) , [@abkfenris](https://github.com/abkfenris) , [@srstsavage](https://github.com/srstsavage) ja [Mathew Biddle](https://github.com/MathewBiddle) Heidän panoksensa Docker Images. Tähän sisältyivät ensimmäiset panokset kaikilta paitsi @stststavage&#33;
    
    * Nyt tuetaan tuotantoa [Kroissanttiskeema](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) tiedostot. Se on oletusarvoisesti päällä. Voit poistaa Croissant skeema sinun setup.xml (EI SUOSITELTU - Ota yhteyttä tai arkistoi kysymys GitHub jos tarvitset tätä) :
    ```
        <generateCroissantSchema>false</generateCroissantSchema>
    ```

    * Joidenkin asetusten oletusarvoja on muutettu. useHeadersForUrl and useEdddReflection now both default to true. Jos ne aiheuttavat ongelmia ja sinun täytyy asettaa ne vääriksi, luo ongelma. Tarkoituksena on poistaa ne tulevaisuudessa.

    * Jotkut asetukset on poistettu. useSharedWatchService and removalDocumentation ToGitHubIo oli asetettu todeksi oletuksena useita julkaisuja ja melko hyvin testattu tässä vaiheessa. Näiden poistaminen salli koodin puhdistamisen.

    * Joitakin pieniä muutoksia, korjauksia ja optimointia.

*    **-Ei. ERDDAP™ Kehittäjät:** 
    * Paljon kuollutta koodia poistettu. Monet varoitukset on korjattu.

## Versio 2.27.0{#version-2270} 
 (julkaistu 2025-6-11) 

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    * Uudet tiedot väripalkin muunnin palvelimet at /erddap/convert/color.html

*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * Oletuskäyttäytyminen on, että välimuisti on nyt tyhjennetty riippumatta tärkeimmistä kuormitustiedostoista. Tämä mahdollistaa luotettavamman ja säännöllisemmän vanhojen välimuistitiedostojen tyhjentämisen. Lisätyötä palvelimen käyttäytymisen parantamiseksi, kun levytilaa on vähän (palauttaa virhe pyyntöjä todennäköisesti saada palvelimen loppuu tilaa, ja tyhjentää välimuisti useammin pienissä levyolosuhteissa yrittää estää virheitä) . Sisään datasets.xml   (tai setup.xml) Voit lisätä tai asettaa uuden välimuistin ClearMinutes-parametrin avulla ohjataan, kuinka usein palvelin tarkistaa tyhjentää välimuistin. Huomaa, nykyinen välimuistiMinute parametri ohjaa ikä säilytettävät tiedostot, uusi välimuisti ClearMinutes on niin usein tehdä chache selkeä.
    ```
        <cacheClearMinutes>15</cacheClearMinutes>
    ```
Voit poistaa uuden välimuistin selkeät tarkastukset asettamalla tehtävänCacheClear false in setup.xml, vaikka sitä ei suositella.
välimuisti ClearMinutes on myös [tietoaineistoasiakirjat](/docs/server-admin/datasets#cacheclearminutes) .
    
    * Paikallinen datadatatuki. Se tukee lokalisointia arvojen addAttributes kohta. Yksinkertaisesti lisätä ominaisuus kanssa ylimääräinen xml:lang tag. Esimerkiksi lisätä ranskalainen otsikko tiedoston addAttributes kohta sisältää:
    ```
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
    ```
Lisätietoja: [paikallinen metatietodokumentaatio](/docs/server-admin/localized-metadata) .

    * Uusi koira Kokoa tiedosto SSL:n ja Prometheus-palvelimen valinnoilla. Kiitos Shane St. Savage SSL ja Jiahui Hu Prometheus.

    * Tuki tiedon käytölle otsikoissa palvelimen URL-osoitteen määrittämiseksi sen sijaan, että käytettäisiin konfig-tiedostoa. Näin palvelimeen pääsee useilla nimillä ja se voi yksinkertaistaa tiettyjä konfiguraatioita. Ota se käyttöön ja lähetä palautetta.
    ```
        <useHeadersForUrl>true</useHeadersForUrl>
    ```

    * Joitakin pieniä muutoksia, korjauksia ja optimointia.

*    **-Ei. ERDDAP™ Kehittäjät:** 
    * Refaktori siihen, miten tulostiedostotyypit on määritelty koodissa. Tämän pitäisi tehdä siitä niin tiedostotyypit voidaan lisätä ilman koskettaa monia koodi paikkoja.

## Versio 2.26{#version-226} 
 (vapautettu 2025-03-31) 

*    **Kaikki:** 
    * Suuri päivitys dokumentaatioon: https://erddap.github.io/
 
Päivitetyn ulkoasun lisäksi on parannettu navigointia, hakua, kääntämistä, ja sen pitäisi olla helpompaa jatkaa eteenpäin&#33;

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    * Tilaukset ja RSS Päivitykset tulisi tapahtua luotettavammin tiedostoissa, jotka päivitetään usein tiedostojen muutoksista.

*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * Oletusjulkaisu vaatii/tukea Java versio 21. Takaisin tässä julkaisussa pystyy helposti tekemään Java 17 yhteensopiva binääri.

    * Uusi ominaisuus muokata tietoja näytetään datakokonaisuuksia käyttöliittymässä. Odotamme tämän olevan erityisen hyödyllistä lisätä asioita, kuten tietoaineistoviittauksia. Lisätietoja voit lukea [uudet asiakirjat](/docs/server-admin/display-info) . Kiitos Ayush Singh lahjoituksesta&#33;

    * Muut Prometheus-mittarit. Suurin on ` http _Pyydän_kesto_sekuntia` joka sisältää pyyntövastausajat eriteltyinä seuraavasti: "request_type," "dataset_id," "dataset_type," "file_type," "lang_code," "status_code"
Tämä koneen luettavissa muodossa mahdollistaa paremman kokoelman metrit ymmärtää, miten käyttäjät käyttävät palvelimen.

    * Uusi tapa tuottaa ISO19115 XML-tiedostoja. Se käyttää Apache SIS ja on uusi vaihtoehto tässä julkaisussa. Ota se käyttöön ja lähetä palautetta.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * Käyttöliittymä nyt luoda yksittäisiä linkkejä kunkin url aloilla kuten infoUrl ja yhteenveto.

    * Tilaukset ja RSS Päivitykset tulisi tapahtua luotettavammin tiedostoissa, jotka päivitetään usein tiedostojen muutoksista. Jos tämä aiheuttaa ongelmia, ota yhteyttä GitHubiin ja poista toiminnallisuus lisäämällä alla oleva lippu setup.xml:iin.
EI SUOSITELLUT
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Subset-muuttujia ei enää synny automaattisesti tiedostotyypille EDDtableFromNcCFFiles. Jos luotit käytökseen, voit joko (Suosittu liuos) Lisää subsetVariables tietokokonaisuuden määritelmään datasets.xml , tai lisätä alla lippuun setup.xml. Jos tunnet tarvetta käynnistää tämä, ota yhteyttä GitHub, jotta voimme paremmin tukea käyttö tapauksessa eteenpäin.
EI SUOSITELLUT
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * Palvelin ohjaa dokumentointipyynnöt uudelleen (alle lataukset / joka on asiakirjat, jotka on siirretty) uuteen dokumentaatioon. Tarvittaessa voit poistaa tämän lipun setup.xml:
EI SUOSITELLUT
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Joitakin pieniä muutoksia ja korjauksia.

*    **-Ei. ERDDAP™ Kehittäjät:** 
    * Lisää koodin laadun parannuksia ja kuollut koodi puhdistus. Tähän kuuluvat pienet optimoinnit, tukossa olevien resurssien parempi käsittely ja siirtyminen pois vanhentuneista tietotyypeistä (Kuten vektori) .

    * Suuri refaktori ED Staattinen poistaa suurimman osan config, viesti, ja metrinen koodi. Se myös paremmin tiivistää alustus ja käsittely hakemistopolkuja (Näillä kahdella viimeisellä on vielä tehtävää.) 

    * Paljon edistystä kohti virallisesti tuettu Docker Image. Suunnitelma on viimeistellä ja vapauttaa jälkeen ERDDAP™ 2.26 Julkaisu on saatavilla.

## Versio 2.25{#version-225} 
 (julkaistu 2024-10-31) 

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    * EDDTableFromFromFiles voi nyt tukea kyselyjä vain johdettu lähtö (Globals, Jexl script, tai muuttujat) .
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * Versio 2.25 vaatii Java 21 tai uudempi. Tämä on LTS-versio, joka on ollut saatavilla yli vuoden.
         
    * Jaettu katselupalvelu on nyt oletus. Jos haluat poistaa sen käytöstä, ota yhteyttä Chrisiin. John at Noaa.gov kertoa minulle, jotta voin parantaa sitä tulevissa versioissa ja lisätä:
        &lt;useSharedWatchService&gt;false&lt;/useSharedWatchService&gt; asetukset.xml.
         
    * • ERDDAP™ servlet alkaa nyt palvelimen käynnistymisestä. Eli tietoaineistot alkavat lastata välittömästi sen sijaan, että odottaisivat pyynnön esittämistä.
         
    * Poista MVRows parametri EDDTableFromMultidimNcFiles on nyt vaikutus. Sen asettaminen vääräksi voi nopeuttaa merkittävästi joitakin kyselyitä, mutta tämä ei välttämättä sovellu kaikkiin tietokokonaisuuksiin. Lisätietoja: [parametrin kuvaus](/docs/server-admin/datasets#removemvrows) .
         
    * Dataset (EDDTableFromNcFiles ja EDDGrid FromNcFiles) Zarr-tiedostojen käyttäminen on nyt tuettu. Niiden on sisällettävä "Star" joko tiedostonNameRegex tai polkuRegex. Katso [Zarr secion tietoaineistoissa](/docs/server-admin/datasets#zarr) Lisätietoja.
         
    * Uusi tiedostotyyppi, EDDtableF fromParquetFiles on nyt tuettu. Katso [EDDTableFromParquetFiles secion in the datas documentation](/docs/server-admin/datasets#eddtablefromparquetfiles) Lisätietoja.
         
    *    [Prometheus-mittarit](https://prometheus.io/) ovat nyt saatavilla osoitteessa /erddap/metrics.
         
    * Saatavilla on uusi XML:n jäsennin. Tämä uusi jäsennin mahdollistaa XInclude- datasets.xml . Kiitos Ayush Singh ominaisuus.
         
    * Uusi parametri datasets.xml hallita epätavallisia toimintasähköposteja. epätavallinen toiminta EpäonnistuiEnnen 25 prosentin arvoa. Kiitos Ayush Singh ominaisuus.
         
    * Uusi parametri setup.xml, joka ohjaa, jos tiedoston latausvirheet näkyvät tila.html-sivulla. Se oletetaan todeksi, poistaaksesi tiedostovirheet tilasivulta, set showLoadErrorsOnStatusPage to false:&lt;näytäLoadErrorsOnStatusPage&gt;false&lt;/showLoadErrorsOnStatusPage&gt;
         
    * Joitakin pieniä muutoksia ja korjauksia.
         
*    **-Ei. ERDDAP™ Kehittäjät:** 
    * Testaus erotettuna yksikköön ja integrointiin (hidas) testit. Myös enemmän testejä käytössä ja testejä on tehty vähemmän hiutaleita.
         
    * Virhe Prone (joitakin tarkastuksia edelleen pois käytöstä) ja Spot Bugs integroitu Maven.
         
    * Täysi koodipohja muotoiltu vastaamaan Google Style Guide.
         

## Versio 2.24{#version-224} 
 (julkaistu 2024/06-07) 

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    * Uusi väripaletti EK80 akustisille aineistoille. Kiitos Rob Cermakin.
         
    * Korjaa kysymys, jossa EDDtableAggregateRows ei näytä asianmukaista vaihteluväliä kaikista lapsista. Kiitos Marco Alba korjaus ja vikaraportti.
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * TOIMIA: TURVALLISUUSMUUTOS: Google Authentication saattaa vaatia muutoksia CSP.
        
Erityisesti voit myös lisätä https://accounts.google.com/gsi/style stlye-src ja https://accounts.google.com/gsi/ Connect-src. Skripti-src voit nyt käyttää https://accounts.google.com/gsi/client.
 
        
Lisätietoja saat osoitteesta [Googlen sivu](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy) CSP-asetuksista.
         
        
    * Uusi yhteinen kellopalvelu. Tämä on uusi vaihtoehto katsella kansioita päivityksiä. Siinä on yksi lanka kutakin tiedostojärjestelmää kohti yhden säikeen sijaan. Todennäköisesti tämä vähentää huomattavasti säikeitä käytetään seurata muutoksia. Se tarkoittaa, että kaikki tietokokonaisuudet saatetaan ajan tasalle sen sijaan, että kullakin aineistolla olisi oma päivitystaajuus. Todennäköisesti tämä tarkoittaa useammin päivityksiä useimmissa tietokannoissa.
        
Tämän lisäyksen mahdollistamiseksi&lt;useSharedWatchService &gt;true&lt;/useSharedWatchService&gt; asetukset.xml.
        
          
Kokeile tätä ja raportoi miten se toimii sinulle Chris. John Noaa.govissa.
         
    * Korjaa virheelliset var nimet lokeihin. Kiitos Ayush Singhille.
         
    * Joitakin pieniä muutoksia ja korjauksia.
         
*    **Parannukset ERDDAP™ kehittäjät:** 
    * Tuetaan paikallista kehitystä Dockerin avulla. Kiitos, Matt Hopson ja Roje.
         
    * Tuki paikalliselle kehitykselle Jettyn ja dokumentaation parannusten avulla. Kiitos, Micah Wengren.
         
    * Muutoksia testeissä ongelmien vähentämiseksi eri foorumeilla. Kiitos. Shane St. Savage.
         

## Versio 2.23{#version-223} 
 (julkaistu 2023-02-27) 

Huomaa, että tämän julkaisun teki Bob Simons, mikä osoittaa, että hän on edelleen läsnä ja aktiivinen siirtymisen aikana Chris John, hänen seuraajansa. Chis John tekee kaikki koodimuutokset, ellei toisin mainita.

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    *    (Ei ole)   
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * TOIMIA: TURVALLISUUSMUUTOS: Google Authentication toteutetaan nyt uuden Google Identity Services -kirjaston kautta, joka on osa "Sign In with Google" -ohjelmaa. Googlen tuki vanhalle "Google Sign In" -järjestelmälle lopetetaan 2023-03-31. Joten jos käytät Google Authenticationia ERDDAP™ asennus, sinun täytyy päivittää ERDDAP™ v2,23+ ennen sitä. (Bob on pahoillaan lyhyellä varoitusajalla. Se on Bobin syytä.)   
         
    * NCCSV on nyt v1.2. Muutos on, että tiedostot ovat nyt UTF-8 koodatut tiedostot (Ne olivat ASCII) ja niin voi nyt sisällyttää mikä tahansa Unicode merkki on, ilman koodausta kuin\\u_hhh_, vaikka se on edelleen sallittua.
NCCSV-tiedostoja kirjoitettaessa ERDDAP™ Nyt kirjoittaa v1.2 tiedostoja.
         ERDDAP™ lukee edelleen NCCSV-tiedostoja, jotka seuraavat v1.0 ja v1.1 erittelyä.
Kiitos Pauline-Chauvet, n-a-t-e, ja thogar-tietokone ehdottaa tätä ja tekee testejä varmistaa eri laskentataulukko ohjelmia voi tuoda UTF-8 tiedostoja. Kiitos Bob Simonsin tämän koodinmuutoksen.
         
    * UUTTA: The status.html web-sivulla on nyt rivi lähellä top, joka osoittaa, mitä datadatakuormaaDatasets on tällä hetkellä ladattavissa ja siihen liittyvät tilastot, tai ei mitään, jos tiedostoa ei ole ladattu. Tämä voi olla erittäin hyödyllistä ERDDAP™ hallinnoijat yrittävät selvittää, miksi kuorma Dataseteilla kestää niin kauan. Myös nGridDatasets, nTableDatasets, ja nTotalDatasets laskea alla, että ovat nyt välittömiä (aiemmin, ne olivat lopussa viimeisen suuren kuorman Dataset) .
Tämä muutos on Roy Mendelssohnille. Kiitos Bob Simonsin tämän koodinmuutoksen.
         
    * PARANTAA: Luoda datasettejä Xml muutokset nyt CF-1.10 (oli CF-1,6) yleissopimukset -attribuutit.
Kiitos Bob Simonsin tämän koodinmuutoksen.
         
    * Joitakin pieniä muutoksia ja korjauksia.
         

## Versio 2.22{#version-222} 
 (julkaistu 2022-12-08) 

Huomaa, että tämän julkaisun teki Bob Simons, mikä osoittaa, että hän on edelleen noin ja aktiivinen siirryttäessä seuraajaansa.

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    *    (Ei ole)   
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * Ei mitään.
         
    * CURBUBUG FIX: Cross Site Scripting -virhe oli koodin kielivalinta pudota alas. Kiitos NOAA Turvaskannaukset tästä. Tämä osoittaa, että NOAA turvallisuus etsii aktiivisesti ja rutiininomaisesti turvallisuuspuutteita ERDDAP .
         
    * TURVALLISUUS: Monet kirjastot käyttävät ERDDAP™ päivitetty, kuten tavallista, osana tätä julkaisua. Tällä kertaa tähän sisältyi PostgreSQL-ajurin päivittäminen (jossa oli turva vika) 42.5.1.
         
    * PARANTAA: Lisää pieniä muutoksia ERDDAP 's muistinhallintajärjestelmän pitäisi vähentää mahdollisuutta, että tietty pyyntö epäonnistuu, koska käytettävissä oleva muisti puuttuu.
         
    * Joitakin pieniä muutoksia ja korjauksia.
         

## Versio 2.21{#version-221} 
 (julkaistu 2022-10-09) 

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    *    (Ei ole)   
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * Tehdään: Java 17, sinun ei pitäisi käyttää \\- d64 JAVA\\_OPTS setenv.bat tai setenv.sh. Jos se on siellä, poista se. Mielestäni 64 bittitila on nyt valittu, kun lataat 64 bitin version Java . Kiitos Sam Woodmanin.
         
    * BUG FIX: Joskus uusi sähköpostijärjestelmä yritti kirjautua sisään liian usein, mikä sai Google Email -palvelimet hylkäämään kaikki tulevat lokiyritykset. Sähköpostijärjestelmä välttelee tätä ja siihen liittyviä ongelmia.
         

## Versio 2.20{#version-220} 
 (julkaistu 2022-09-30) 

*    **Älä käytä V2.20. Se on virheellinen.** Mutta ylläpitäjien on vielä tehtävä TO tehdä kohteita alla päivitettäessä v2.21+.
     
*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    *    (Ei ole)   
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * Otimme vanhan muistinhallintajärjestelmän käyttöön. (Math2.varmistetaanMuistiSaatavilla) ja muokattu uusi muistinhallintajärjestelmä (ED Staattinen.) Jotta se toimisi paremmin. Katso [Muistitila](/docs/server-admin/additional-information#memory-status) yksityiskohtaisesti.
         
    * MUUTETTU: Oletus&lt;ipAddressMaxRequests&gt; in datasets.xml Nousi 7:stä 15:een. On selvää, että joku laillinen WMS asiakkaat voivat tuottaa yli 7 samanaikaista pyyntöä.
         

## Versio 2.19{#version-219} 
 (julkaistu 2022-09-01) 

*    **Älä käytä v2.19:ää. Se on virheellinen.** Mutta hallinnoijien on vielä tehtävä TO DO kohteita alla päivitettäessä v2.20+.
     
*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    * UUTTA: On uusi palvelimen puolella toiminto, orderBy Laskeutuminen, joka toimii orderBy , mutta se on laskevassa järjestyksessä. Kiitos Adam Leadbetterille.
         
    * Nyt kaaviot (mutta ei karttoja) laajenee täyttämään käytettävissä olevan tilan kankaalla, eli tilaa, jota legenda ei käytä. Voit saada pitkiä kaavioita, neliöitä tai laajoja kaavioita lisäämällä ja manipuloimalla &.size=_widged_ | _korkeus_ parametri (jossa leveys ja korkeus määrittelevät kankaan koon pikseleinä) pyynnöstä URL. (Tämä ei ole vaihtoehto .graph verkkosivuilla. Sinun täytyy lisätä se URL käsin.) Jos et määrittele &.koon parametria, pyyntöjä .smallPng, .png, .largePng, .smallPdf, .pdf ja .large.pdf ovat ennalta määritellyt kankaan koot, joten graafinen laajentaa täyttämään käytettävissä olevan tilan, mutta on yleensä suunnilleen neliön. Kiitos Bob Flemingin.
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * TEHDÄ: ERDDAP™ Nyt vaatii Java 17 ja siihen liittyvä Tomcat 10. Sinun täytyy seurata ERDDAP™ asennusohjeet (tai vastaava esim. Docker) asentaa Java 17 ja Tomcat 10 ja kopioida \\[ tomcat \\] /sisältöhakemisto Tomcat 8 -asennuksesta uuteen \\[ tomcat \\] hakemisto. Sinun ei tarvitse tehdä muita muutoksia ERDDAP tähän muutokseen liittyvä asennus. Toisin sanoen ERDDAP™ Toimii kuten ennenkin.
        
Älä unohda tehdä ERDDAP - liittyvät muutokset Tomcat n palvelimeen.xml ja asiayhteys.xml kun päivität Tomcat. Katso ERDDAP S [Tomcat asennusohjeet](/docs/server-admin/deploy-install#tomcat) .
        
Minun vaikutelmani... Java 17 on, että se suosii enemmän käsittelytehoa ja muistia pitkän aikavälin, suurempia sovelluksia kuten ERDDAP™ , joten se toimii hieman hitaammin kuin Java 8 matalatehoisilla tietokoneilla (esim. 2 ydintä ja minimaalinen RAM) ja toimii hieman nopeammin kuin Java 8 suurempitehoisilla tietokoneilla (esim., 4+ ydintä ja runsaasti RAM) . Joten jos näet huono suorituskyky, käytä ohjelmia kuten Linux's [ylin](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/) tarkistaa resurssien käyttöä ja harkita antaa ERDDAP™ enemmän resursseja, erityisesti enemmän muistia. Muisti on halpaa&#33; Useimmissa puhelimissa on enemmän prosessoria ja muistia kuin palvelimissa, joita jotkut teistä käyttävät ERDDAP &#33;
Erin Turnbullin ansiosta.
         
        
    * TEHTÄVÄ: jos käytät ERDDAP™ käyttää Cassandra, varten Cassandra, sinun täytyy käyttää versio Java Käytit sitä Cassandran johtamiseen. Vaihda vain Java 17 Tomcat+-ajoon ERDDAP .
         
    * Suositellaan: Jos palvelimen suorittimessa on 4+ ydintä ja 8+ GB RAM-muistia, harkitse näiden asetusten muuttamista datasets.xml tiedosto:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Jos palvelimellasi on vähemmän resursseja, pysy "1" molemmissa asetuksissa.
NThreads järjestelmät EDDGrid Kansiosta ja EDDTablesta Fileistä tuli huomattavasti parempia. Nämä muutokset johtivat valtavaan nopeuden paranemiseen (Esim., 2X nopeus ylös, kun nSäikeet on asetettu 2 tai enemmän) haastavimpiin pyyntöihin (kun suuri määrä tiedostoja on käsiteltävä kerätä tuloksia) . Jotkut asiaan liittyvät muutokset Chris John johtaa myös yleistä nopeutta koko ERDDAP . Näiden muutosten koodin antoi Chris John. Kiitos. Chris&#33;
         
    * VAROITUS: väliviivat datasetID ' s ovat deprecated eikä enää tuettu (Vaikka teknisesti edelleen sallittu) . Heidät luultavasti hylätään seuraavassa julkaisussa. Jos käytät väliviivat, vaihda korostaa nyt välttää ongelmia. Jos teet muutoksen nyt, se tapahtuu omalla nopeudellasi. Jos odotat seuraavaan julkaisuun, olet paniikissa ja joudut käsittelemään sitä sinä päivänä.
         
    * Nyt .htmlTable tietovasteet, jos String-solun tiedot sisältävät tietoa:kuva/png;base64, jota seuraa base64 koodattu .png-kuva, ERDDAP™ näyttää kuvakkeen (jotta käyttäjä voi nähdä kuvan, jos he leijailevat sen päällä) ja painikkeet tekstin tai kuvan tallentamiseksi leikepöydälle. Kiitos Marco Alba (joka antoi koodin) ja Bob Simons (joka muutti sitä hieman) .
         
    * UUTTA: -do notAddStandardNames
Jos sisällytät \\- doNotLisääStandardNames komentoriviparametrina, kun suoritat luontia Dataset Xml, luo Dataset Xml ei lisää standard\\_name ja addAttributes muut muuttujat kuin leveys-, pituus-, korkeus-, syvyys- tai aikani (joiden standard\\_name tilu) . Tämä voi olla hyödyllistä, jos käytät tulosta Dataset Xml suoraan sisään ERDDAP™ muokkaamatta tulostetta, koska luo Dataset Xml usein arvaa standard\\_name s väärin. (Huomaa, että suosittelemme aina, että muokkaat tulostetta ennen sen käyttöä ERDDAP .) Käyttämällä tätä parametria on muita vähäisiä liittyviä vaikutuksia, koska arvattu standard\\_name käytetään usein muihin tarkoituksiin, esim. long\\_name , ja luoda väriBar asetukset. Kiitos Kevin O'Brienin.
         
    * Voit nyt laittaa&lt;updateMaxEvents&gt;10&lt;/updateMaxEvents&gt; in datasets.xml   (muiden asetusten kanssa lähellä yläosaa) muuttaa tiedostomuutosten enimmäismäärää (oletus=10) joka käsitellään päivitysEveryNMillis-järjestelmässä. Suurempi määrä (100?) saattaa olla hyödyllistä, kun on erittäin tärkeää pitää tietokokonaisuus aina ajan tasalla. Katso [updateMaxEvents-dokumentaatio](/docs/server-admin/datasets#updatemaxevents) . John Maurerin ansiosta.
         
    * UUTTA: Lisätty tuki globaalille " real\\_time = tosi | false" String ominaisuus.
Jos tämä on väärin (oletus) ja jos tietokokonaisuus ei käytä päivitystä -EveryNMillis. ERDDAP™ tulee välimuistin vastauspyyntöihin tiedostotyypeille, joissa koko tiedosto on luotava ennen ERDDAP™ voi alkaa lähettää vastauksen käyttäjälle ja käyttää sitä uudelleen noin 15 minuuttia (esim. .nc , .png) .
Jos tämä on totta tai jos tietokokonaisuus käyttää päivitystä -EveryNMillis. ERDDAP™ ei koskaan välitä vastaustiedostoja ja aina palauttaa uusia tiedostoja.
John Maurerin ansiosta.
         
    * UUTTA: Sähköpostit lähetetään nyt erillisellä sähköpostilla. Tämä tekee latausaineistoja ja muita toimia, jotka tuottavat sähköpostit nopeammin, koska latausDatasets ei tarvitse odottaa sähköpostin lähettämistä, mikä joskus kestää kauan. Uusi järjestelmä voi lähettää useita sähköposteja per sähköposti istunto, mikä vähentää sähköpostipalvelimen kirjautumisia ja vähentää riskiä, että ne epäonnistuvat, koska ne ovat liian usein. EmailThreead on the status.html sivu ja diagnostiset viestit log.txt -- etsi "emailThreead." Huomaa, että täsmällinen nEmailsPerSession=0, osoittaa ongelmia, ts., sähköposti istunto ei voinut lähettää mitään sähköposteja.
Kiitos Bob Simonsin.
         
    * MUUTETTU: Sähköpostit lähetetään nyt hieman eri koodi (koska Java 17 ja muutos sähköpostiinThreead) . Jos sähköpostien lähettäminen on vaikeaa, lähetä sähköpostia erd.data at noaa.gov .
         
    * UUTTA: Tilaustoiminnot, jotka "koskettavat" etäällä olevaa verkko- osoitetta, käsitellään nyt erillisessä kosketuksessa. Tämä tekee latausaineistot ja muut toiminnot, jotka koskevat URL-osoitteita nopeammin, koska loadDatasets ei tarvitse odottaa kosketus on valmis, joka joskus kestää kauan. On tilastoja touchThreead tila.html sivu ja diagnostiset viestit log.txt -- etsi "touchThreead."
Kiitos Bob Simonsin.
         
    * UUTTA: status.html-sivulla, "Major LoadDatasets Time Series" on uusi "shed"-sarake, joka osoittaa niiden pyyntöjen määrän, jotka poistettiin koska nykyinen ERDDAP™ Muistinkäyttö oli liian korkealla. Pyynnöt, jotka poistetaan palautetaan HTTP tilakoodi 503 "Palvelu saatavilla." Ne pyynnöt eivät välttämättä olleet ongelma. He saapuivat kiireiseen aikaan. Tämä oli osa uudistusta miten ERDDAP™ käsittelee korkean muistin käyttöä.
         
    * UUTTA: Unix/Linux-tietokoneilla on nyt "OS Info" -rivi status.html-sivulla on käyttöjärjestelmän nykyiset tiedot, kuten CPU:n kuormitus ja muistin käyttö.
         
    * Nyt, kun ERDDAP™ on uudelleenkäynnistetty ja nopeaRestart=true, EDDTableFromFromFiles tietoaineistot uudelleen .nc ja erillinen .nc . Joidenkin tietoaineistojen osalta tämä vähentää huomattavasti aikaa ladata tietokokonaisuus (esim. 60 sekunnista 0,3:een) . Yhdessä uuden sähköpostinThread ja tehtäväTheread (ks. edellä) , Tämän pitäisi suuresti nopeuttaa uudelleenkäynnistystä ERDDAP™ monille ERDDAP™ laitokset. Ben Adamsin ja John Kerfootin ansiosta.
         
    * MUUTETTU: Aiemmin orpojen tietoaineistot (tietoaineistot, jotka elävät ERDDAP™ mutta eivät ole datasets.xml ) Yksinkertaisesti ottaen huomioon tilanteen. html ja log.txt kunkin suuren kuorman jälkeenDatasets. Nyt ne poistetaan automaattisesti ERDDAP™ ja merkitty tila.html ja log.txt, ja sähköpostitse Kaikkeen. Joten jos haluat poistaa tiedoston ERDDAP™ , Nyt sinun tarvitsee vain poistaa sen pala xml datasets.xml ja se poistetaan seuraavan suuren kuormanDatasets. Kiitos Bob Simonsin.
         
    * TUNTEMATON BUG netcdf-jaava v5.5.2 ja v5.5.3: • EDDGrid From Thredds Catalog-valitsin generoiDataseteissa Xml on toiminut THREDDS-katalogeissa, jotka sisältävät viittauksia tiedostoihin etä THREDDS-katalogeissa. Nyt ei. Olen raportoinut ongelmasta netcdf-java kehittäjille.
         
    * BUG FIX: Docker käyttäjille setup.xml parametreja kautta ERDDAP \\__paramName_: int- ja boolean-parametreille (esim., sähköposti SmtpPort) , ERDDAP™ oli virheellisesti etsimässä vain _paramName_. Nyt se etsii _ ERDDAP \\_paramName_. Kiitos Alessandro De Donnon.
         
    * MUUTOS: ERDDAP™ Testausjärjestelmä käyttää nyt automaattista järjestelmää tarkistaakseen, että uudet testikuvat ovat juuri odotetun mukaisia. Kiitos Chrisin. John ja Bob Simons.
         

## Versio 2.18{#version-218} 
 (julkaistu 2022-02-23) 

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    * EI
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * BUG FIX: .nc Tiedostoja ei suljettu joissakin olosuhteissa. Nyt he ovat. Kiitos Marco Alba, Roland Schweitzer, John Maurer, ja muut.
         

## Versio 2.17{#version-217} 
 (julkaistu 2022-02-16) 

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    * BUG FIX: Muutosten jälkeen orderBy järjestelmä muutama vuosi sitten, Tabledap's Make A Graph ei kunnolla käsitellä monia kyselyjä, jotka käytetään orderBy _Xxx_. Nyt on. Maurice Libesin ansiosta.
         
    * Muutos: Aiemmin tapahtunutta: ERDDAP™ Hylätyt pyynnöt . läpinäkyvä Png on silloin, kun leveys- ja/tai pituusasteet olivat osittain tai kokonaan etäisyyksiä. ( ERDDAP™ GitHub Issues #19, lähettänyt Rob Fuller -- kiitos lähettämistä että Rob) Nyt se palauttaa läpinäkyvät pikselit kuvan muille alueille. Tämä on hyödyllistä monille asiakassovelluksille. Koodin muutokset tehdä tämän muutoksen teki kokonaan Chris John. Kiitos, Chris&#33;
         
    * Muutos: Aiemmin tapahtunutta: ERDDAP™ hylätyt griddap-pyynnöt, joissa tietyn muuttujan indeksiarvot olivat \\[ korkea: alhainen \\] . Nyt se tekee näistä pyynnöistä päteviä vaihtamalla alhaisia ja korkeita arvoja. Tämä ratkaisee pitkäaikaisen ongelman käyttäjille ja ulkoisille ohjelmille, kuten xtractolle, jonka täytyi seurata muutamia tietoja, joilla on leveysasteet, jotka vaihtelevat korkeasta alhaiseen, jotta voidaan esittää esimerkiksi \\[  (50) : (20)  \\] niin, että pyyntö indeksiavaruudessa oli \\[ matala: korkea \\] . Katso https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html Nyt, pyyntö kuten \\[  (20) : (50)  \\] jos jokin näistä tiedoista tulkitaan automaattisesti \\[  (50) : (20)  \\] .
         
    * MUUTTUNUT: .esriAscii pyynnöt nyt käynnistää "Tiedosto: Tallenna nimellä" -ikkunan käyttäjän selaimessa. Joel Van Noordin ansiosta.
         
    * BUG FIX: Nyt, jos pituusmuuttuja lapsi aineisto EDDGrid LonPM180 tai EDDGrid Lon0360-aineistossa on valid\\_min ja/tai valid\\_max ominaisuus, ne poistetaan EDDGrid LonPM180 tai EDDGrid Lon0360-aineisto. Kiitos Roy Mendelssohnin.
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * TEHDÄ: Jos olisit asettanut&lt;dataProviderFormActive&gt; vääräksi tilapäisesti XSS haavoittuvuuden suhteen, ole hyvä ja aseta se todeksi.
         
    * Currency BUG FIX: Kiinteä XSS haavoittuvuus tietojen tarjoaja muodossa. Genaro Contreras Gutiérrezin ansiosta.
         
    * BUG FIX: Kun AWS S3:lla oli yli 10000 tiedostoa, ERDDAP™ Heitti "sisäisen virheen." Tämä on nyt korjattu. Kiitos Andy Zieglerin.
         
    * BUG FIX: EDDGrid SideBySide ei sallinut muuttujan sourceName s eri lapsiaineistoissa ollakseen samanlaisia. Nyt on. Joshua Stanfordin ansiosta.
         

## Versio 2.16{#version-216} 
 (julkaistu 2021-12-17) 

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    * MUUTOKSET/PALKKON KUSTANNUKSET: Lukuisat pienet muutokset käännösjärjestelmän ansiosta ehdotuksia kielikohtaiset toimittajat. Kiitos Melanie Abecassis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian, ja Mike Smit.
         
    * LISÄTTY Google Translaten asianmukainen vastuuvapauslauseke ja määrittely Google Translaten ehtojen mukaisesti. Lisäksi&lt;html&gt; tag HTML jokaiselle sivulle nyt asianmukaisesti tunnistaa ei-englantilainen web-sivut konekäännetty. Kiitos Mike Smitin.
         
    * BUG FIX: Kirjautumissivut toimivat nyt oikein eri kieliasetuksissa. Kiitos Mike Smitin.
         
    * UUSI orderBy Summasuodatin. Ja uusi Tarkista kaikki ja poista kaikki painikkeet EDDGrid Tiedonhakulomakkeen verkkosivu. Kiitos Marco Alban.
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * Jos sinulla on
        &lt;kysymysMarkImageFile&gt;kysymysMark.jpg&lt;/questionMarkImageFile&gt;
setup.xml tiedosto, sinun täytyy joko poistaa koko tag (suositellaan, joten oletustiedostoa käytetään) tai muuttaa se seuraavasti:
        &lt;kysymysMarkImageFile&gt;kysymysMark.png&lt;/questionMarkImageFile&gt;
         
    * Ihan vain tiedoksi: [Adoptium](https://adoptium.net/?variant=openjdk8) on korvannut OpenJDK:n tärkeimmäksi/suositelluksi lähteeksi Java   (OpenJDK) .
         
    * MUUTOS: Lokitiedostot ERDDAP™ , LuodaDatasets Xml, ja DasDds ovat nyt UTF-8, ei tietokoneen oletusmerkki asetettu. Tarkistin paljon ja tein muutamia muutoksia varmistaakseni, että ERDDAP™ aina määrittää oikea merkki asetettu lukemalla tai kirjoittamalla kaikenlaisia tiedostoja, eikä enää (useissa tapauksissa) luottaa tietokoneen oletusmerkkiin. Tämä korjasi muutaman virheen ja siirtyi niin lähelle kuin pystyin tavoite käyttää UTF-8 mahdollisimman monta tiedostotyyppiä (esim., .log, .xml, .html, .json , .json I .nc Otsikko) . Huomaa, että monet vanhemmat tiedostotyypit ovat tarpeen käyttää ISO-8859-1 (esim. OPeNDAP .das, .dds, .csv, .tsv , .nc 3 .nccsv , .cpt) . Olen aiemmin yrittänyt työskennellä CF ryhmä ja Unidata lisätä tukea UTF-8 in .nc Kolme tiedostoa; molemmat olivat vastustuskykyisiä.
         
    * UUTTA: Kun ladataan tiedostoja AWS S3, ERDDAP Välimuisti FromUrl-järjestelmä EDDGrid Kansiosta ja EDDTablesta FromFiles käyttää nyt uutta AWS Transfer Manager ladata tiedostoja rinnakkaisia paloja (Näin ollen hyvin nopeasti) . Kohde läpisyöttö on asetettu 20 Gbps, per tiedosto, joten tämä toimii hyvin kaikki AWS instant tyypit, mutta erityisesti ne, joilla on erinomainen "Verkkosuoritus." Tämän muutoksen ERDDAP Välimuisti FromUrl-järjestelmä tarjoaa nyt vertailukelpoisia nopeuksia xarray lähestymistapa rinnakkaiset lataukset valmiiksi murskattuja tiedostoja, mutta ilman tarvetta muuntaa lähdetiedostoja .nc sekä .hdf Röntgentiedostoihin. Itse asiassa ERDDAP 's järjestelmä on parempi, jos on myöhempi pyyntö lukea samasta tiedostosta, koska ERDDAP™ Nyt on paikallinen kopio tiedostosta. Yhteisömme on viettänyt vuosia standardoinnin .nc sekä .hdf tiedostot. Nyt meidän ei tarvitse heittää sitä pois vain saada hyvä suorituskyky, kun tallentaa tietoja AWS S3. Kiitos Rich Signellin.
         
    * MUUTOS: searchEngine=Lucene on toistaiseksi vanhentunut. Se on monimutkainen järjestelmä, joka usein tuottaa tuloksia, jotka ovat hieman erilaisia kuin toivottavaa käyttäytymistä searchEngine=alkuperäinen. Melkein kaikki ERDDAP™ asennukset, Lucenen ajansäästöt eivät korvaa tulosten eroja. Käytä searchEngine = original sen sijaan, jos mahdollista. Jos se aiheuttaa ongelmia, lähetä sähköpostia Bobille.
         
    * MUUTOS: Lucene searchEngine käyttäytyy nyt enemmän kuin alkuperäinen hakuEngine. Ei ole enää tapauksia, joissa Lucene luulee tiedoston täsmää ja alkuperäinen ei. Myös Lucene rankingissa nyt yhtä alkuperäinen rankingissa (koska alkuperäinen käytetään nyt aina laskea rankingissa) .
         
    * BUG FIX: Alkaen äskettäisestä julkaisusta ERDDAP™ Lakkasi näkemästä enemmän kuin ensimmäiset 1000 esinettä tietyssä AWS S3 kauha. Nyt. ERDDAP™ jälleen näkee kaikki esineet. Kiitos Andy Zieglerin.
         
    * Nyt EDDTableAggregate Rivit poistaa actual\\_range attribuutti, kun yksi tai useampi lapsiaineistoista ei koskaan tiedä sen muuttujia ' actual\\_range   (esim., EDDtableFromDatabase) . Kiitos Erik Gelettin.
         

## versio 2.15{#version-215} 
 (julkaistu 2021-11-19) 

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    *    ERDDAP™ on uusi järjestelmä antaa käyttäjän määrittää kieli käytetään kaikilla verkkosivuilla. Jos ERDDAP™ asennus on perustettu käyttää sitä, luettelo kielistä näkyy oikeassa yläkulmassa jokaisen sivun. ERDDAP™ URL: n ennen tätä versiota jatkaa toimintaansa ja aina palauttaa Englanti sisältöä, kuten ennen.
        
Kaikkia tekstejä tai verkkosivuja ei käännetty. Tähän hankkeeseen liittyi aikarajoituksia, jotka estivät Qin ja Bobin pääsemästä 100 prosenttiin.
        
Ilmeinen kysymys kuuluu: miksi olemme tehneet niin paljon työtä, kun Chrome kääntää web-sivuja lento? Vastaus on: näin saamme paljon enemmän kontrollia siitä, miten käännös tehdään. Erityisesti on paljon sanoja, joita ei pitäisi kääntää web-sivuille, kuten tietokokonaisuuksien otsikot ja tiivistelmät, muuttujien nimet, parametrit, yksiköt ja organisaatiot. Suuri osa käännös vaivaa oli tunnistaa sanoja ja lauseita, joita ei pitäisi kääntää. Myös koneen käännöksiä taipumus sekoittaa tiettyjä HTML markup. Käännöksen hallinta mahdollisti tämän ongelman minimoinnin.
        
Käännösprojektin teki Qi Zeng (Google Summer of Code -harjoittelija) ja Bob Simons käyttäen Googlen käännös-verkkopalvelua. Se oli valtava projekti. Kiitos. Qi&#33;
        
    * BUG FIX: ERDDAP™ ORCID-tunnisteissa on X viimeisenä. Maurice Libesin ansiosta.
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * TEHDÄ:
        
        * Sinun täytyy tehdä joitakin muutoksia liittyvät ERDDAP Uusi järjestelmä antaa käyttäjien määritellä kieli web-sivuja.
            * Ensimmäisellä rivillä sinun setup.xml ja datasets.xml tiedostot, vaihda muotoon: koodaus="UTF-8" ja muuta asiakirjan koodaus tekstieditorissasi, joten se tallennetaan UTF-8 -tiedostona. Luo tiedostoja Xml nyt olettaa, että datasets.xml on UTF-8-tiedosto.
            * Ohjelmoijat ERDDAP : Kaikki ERDDAP™ .java-tiedostoja tulisi käsitellä oletuksena UTF-8 -tiedostoina. Saatat joutua lisäämään "-koodaus UTF-8" javac komentoriville. (Minä.) 
            * Järjestelmän mahdollistaminen (suositellaan) ,&lt;StartBodyHtml5&gt; tag että määrittelet datasets.xml , muuttaa "&amp&#33;loginInfo;" osaksi "&amp&#33;loginInfo; | &amp&#33;kieli; " niin, että luettelo kielistä näkyy oikeassa yläkulmassa jokaisen ERDDAP™ Verkkosivu.
            *    ERDDAP™ käyttää ainoastaan&lt;StartBodyHtml5&gt; tag että määrittelet datasets.xml määrittää HTML-sisältö banner alkuun jokaisen ERDDAP™ Sivu, riippumatta siitä, minkä kielen käyttäjä valitsee. Jos vaihdat tunnisteen
" &EasierAccessToScientificData; "tieteellisen tiedon helpomman saatavuuden sijaan" ja
" &BroughtToYouBy; Sen sijaan, että olisin tuonut sinulle - ERDDAP™ käyttää käännetty versioita näistä lauseista banneri.
            * Samoin uusi oletusarvo&lt;PikakuvausHtml&gt; datasets.xml on
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
Viimeiset 3 riviä sisältöä ovat asioita, jotka korvataan käännetty teksti. Jos käännytät jonkun heistä (erityisesti tämä ErityinenErddap) tai kaikki niistä nimenomaisesti tekstiä datasets.xml   (joka on etusijalla, jos) tai viestit.xml, että teksti näkyy riippumatta siitä, minkä kielen käyttäjä valitsee. Tämä ei ole täydellinen, mutta ajattelin, että harvat hallinnot haluaisivat muokata&lt;ShortDescriptionHtml&gt; 35 eri tiedostoja tarjota 35 eri käännetty versioita että tag.
        
          
         
    * MUUTTUNUT: Joitakin virheitä käsitellään nyt hieman eri tavalla, joten ne voidaan lisätä status.html:n ja Daily Report Email:n "Failed Requests":iin. Joten nuo luvut voivat olla hieman suurempia kuin ennen.
         
    * BUG FIX: Generator Datasets Xml EDDGrid Lon0360 ja EDDGrid LonPM180:ään eivät enää sisälly lähdeaineistot, datasetID =~"\\*\\_LonPM180" ja datasetID =~"\\*\\_Lon0360."
         

## Versio 2.14{#version-214} 
 (julkaistu 2021-07-02) 

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    *    (ei mitään)   
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * UUTTA: EDDGrid Lon0360, joka tekee ruudukosta aineiston, jonka pituus-arvot ovat &gt;=0, ja&lt;= 360 ruudukosta, jonka pituus on &gt;=-180 ja&lt;=180. Katso [ EDDGrid Lon0360-asiakirjat](/docs/server-admin/datasets#eddgridlon0360) . Kiitos Dale Robinsonin.
         
    * UUTTA: ERDDAP™ hallinnoijat voivat nyt ohittaa minkä tahansa arvon setup.xml kautta ympäristömuuttuja nimeltä ERDDAP \\__ arvoName_ ennen kuin suoritat ERDDAP . Käyttö ERDDAP \\_baseUrl ohittaa&lt;baseUrl &gt; arvo. Tämä voi olla kätevää käytettäessä ERDDAP™ säiliöllä, koska voit laittaa vakioasetukset setup.xml ja toimittaa sitten erityisasetukset ympäristömuuttujia. Jos annat salaisia tietoja ERDDAP™ Tällä menetelmällä varmista, että tiedot pysyvät salassa. ERDDAP™ Lue ympäristömuuttujia vain kerran per startup, ensimmäisen sekunnin startup, joten yksi tapa käyttää tätä on: asettaa ympäristömuuttujat, aloittaa ERDDAP™ , odota kunnes ERDDAP™ Aloitetaan ja poistetaan ympäristömuuttujat. Kiitos Marc Portierin.
         
    * Nyt, jos joitakin tiedostoja EDDTableF alkaen... Tiedostot aineisto paljon tiedostoja on joitakin erittäin pitkiä String arvoja, aineisto lataa paljon nopeammin ja vastaa pyyntöihin paljon nopeammin. Aiemmin tapahtunutta: ERDDAP™ jakaisi paljon tilaa min- ja max merkkijonon arvoille tiedostoissa, jotka tallennetaan tiedostotietoihin tällaisia tietokokonaisuuksia varten. Tuloksena tiedosto oli valtava, joten se kirjoitetaan ja luetaan hitaasti. Kiitos OBIS:n.
         
    * Nyt, ERDDAP™ tekee paremman tulkinnan epätavallinen ja virheellinen merkkisekvenssit CSV-tiedostoja. Kiitos OBIS:n.
         
    * Kun vuoden ongelmia Cassandra, olen vihdoin asentanut Cassandra (v2) uudelleen ja niin pystyi tekemään testit uudelleen Cassandra v2. Joten nyt voin varmemmin todeta, että ERDDAP™ toimii Cassandra v2 ja v3 kanssa. Kiitos ONC:n.
         

## Versio 2.12{#version-212} 
 (julkaistu 2021-05-14) 

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    * BUG FIX: Jos olet tilaus mustalla listalla, et voi nyt pyytää listaa tilauksistasi.
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * TOT: UUSI: järjestelmä, jolla rajoitetaan automaattisesti pahansuopien käyttäjien ja liian aggressiivisten laillisten käyttäjien mahdollisuuksia esittää useita samanaikaisia pyyntöjä, jotka heikentäisivät järjestelmän suorituskykyä muiden käyttäjien kannalta. On 3 uutta valinnaista tunnistetta datasets.xml jonka voit / pitäisi lisätä heti sen jälkeen&lt;KaavioTaustaväri&gt; :
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

Lisätietoja: [ipAddressMaxRequests](/docs/server-admin/datasets#ipaddressmaxrequests) . ERDDAP™ myös nyt tulostaa "Number of unique users (Käynnistyksen jälkeen) " status.html sivulla.
Kiitos henkilön Kiinassa hyökkäävät minun ERDDAP™ asennus.
         
    * MUUTOS Postgresql ajuri käyttäytyminen: Kun päivitin Postgresql-ajurin, Postgresql:n ja GenerateDatasetsXml:n luoman taulukon sarakkeen nimet tulivat takaisin kaikki isot kirjaimet sen sijaan, että ne olisivat pienempiä, kuten aiemmin. En tiedä, vaikuttaako se muihin asioihin, koska tietokannat pitävät nimiä usein tunteettomina. Testitietoni toimii yhä oikein. Mutta jos tietoaineistosi lakkaa toimimasta tämän kanssa ERDDAP™ update, tämä on mahdollinen syy jatkaa ensin.
         
    * BUG FIX: ERDDAP™ nyt myös käsittelee yksityisiä AWS S3 tiedostoja oikein. AWS S3-tiedostojen käsittelyyn liittyi myös muita parannuksia. Michael Ganglin ja Dylan Pughin ansiosta.
         
    * UUTTA: EDDGrid FromNcFiles ja EDDGrid FromNcFiles Unpackage voi nyt lukea tietoja "rakenteet" .nc 4 ja .hdf 4 tiedostoa. Määrittää muuttuja, joka on peräisin rakenteesta,&lt; sourceName &gt; on käytettävä muotoa: _täydellinen StructureName_ | _memberName_, esimerkiksi ryhmä1/myStruct | Jäseneni. NRL:n ansiosta.
         
    * MUUTTUNUT: Nyt, jos nykyinen muistin käyttö plus tämä pyyntö on jopa hieman korkea, ruudustot nLähetys tämän pyynnön 1. Näin ollen ERDDAP™ Säästää muistia, kun muisti on niukka. Kiitos henkilön Kiinassa hyökkäävät minun ERDDAP™ asennus.
         
    * UUSI järjestelmä, jolla seurataan avointen tiedostojen määrää (joka sisältää pistorasiat ja joitakin muita asioita, ei vain tiedostoja) Tomcatissa Linuxin tietokoneilla. Jos joitakin tiedostoja ei vahingossa koskaan suljeta, avointen tiedostojen määrä voi kasvaa, kunnes se ylittää suurimman sallitun ja lukuisia todella pahoja asioita tapahtuu. Nyt Linuxin tietokoneilla. (tietoja ei ole saatavilla Windows) :
        
        * On uusi "Avaa tiedostoja" sarake kaukana oikealla status.html web-sivu näyttää prosenttiosuuden max tiedostoja auki. Windowsissa se vain näyttää "?"
        * Milloin ERDDAP™ tuottaa nämä tiedot kunkin suuren tiedoston lopussa uudelleen ladata, se tulostaa lokiin. txt-tiedosto:
openFileCount=_current_ of max=_max_ %=_percent_
        * Jos prosenttiosuus on &gt;50%, sähköposti lähetetään osoitteeseen ERDDAP™ hallinnoija ja sähköposti Kaikki Sähköpostiosoitteet.
        
Saadaksesi lisätietoja tai jos näet tämän ongelman ERDDAP™ , katso [Liian monta avointa tiedostoa](/docs/server-admin/additional-information#too-many-open-files) .
Kiitos henkilön Kiinassa hyökkäävät minun ERDDAP™ asennus.
         
    * UUTTA: Lisäsin paljon tarkkailua ja käsittelyä "Liian monet avoimet tiedostot," joten tehtävä vain pysähtyy ja käyttäjä näkee virheviestin. Datatiedostoja ei enää merkitä huonoiksi, jos niiden lukeminen aiheuttaa "Liian monta avointa tiedostoa" - virheen.
         
    * UUSI \\[ bigPentDirectory \\] /adFilesFlag-hakemisto:
Jos laitat tiedoston tähän kansioon datasetID tiedoston nimellä (tiedoston sisällöllä ei ole merkitystä) , ERDDAP™ poistaa huonot tiedostot .nc tiedosto (jos) ja lataa tietokokonaisuus uudelleen ASAP. Tämä aiheuttaa ERDDAP™ yrittää uudelleen työskennellä tiedostoja aiemmin (Virheellisesti?) merkitty huonoksi. Kiitos Marco Alban.
         
    * Muuttunut: Käynnistyksen aikana, jos EDDGrid Kansiosta tai EDDTablesta... Tiedostoaineistossa on aluksi 0 tiedostoa tunnettujen validien tiedostojen luettelossa (Esimerkiksi, se on uusi tietokokonaisuus) , sitten ERDDAP™ lykkää sen lataamista ja asettaa lipun siten, että se ladataan mahdollisimman pian suuren kuorman jälkeenDatasets on valmis. Tämä nopeuttaa aloitusta, kun on uusia aineistoja.
         
    * MUUTETTU: TiedostoVisitorDNLS.testeWSS3 () ja FileVisitorSubdir.testesAWSS3 () ; käytä nyt AWS v2 (ei v1) SDK. Joten nyt Git ERDDAP™ jakelu sisältää nyt kaikki tarvittavat tiedostot ja sinun ei enää tarvitse lisätä manuaalisesti massiivinen v1 AWS SDK-purkkitiedosto.
         
    * MUUTTUNUT: Vaihdoin Mavenin käytön riippuvuuden havaitsemiseen/keräämiseen (.jar-tiedostot /lib) . AWS SDK:n muuttaminen v2:ksi edellytti tätä. Sitä tarvitaan tulevaisuudessa muun tuontikoodin osalta. Suuri kiitos Kyle Wilcox joka tarjosi pom.xml hän loi ja käyttää, mikä ratkaisi useita ongelmia minulle.
         
    * MUUTOS: luokkapolkuparametri (- cp) käytetään GenerateDatasetXml, DasDds ja muita pieniä ohjelmia, jotka tulevat ERDDAP™ , ja neuvoja ohjelmoijille on nyt paljon yksinkertaisempi eikä pitäisi koskaan muuttaa uudelleen, koska se viittaa hakemistoon, ei yksittäisiä tiedostoja:
\\-cp-luokat;C:\\\\_tomcat\\lib\\servlet-api.jar;lib\\\\*
         (tai ":" eikä ";" Linux ja Macs) .
         (Tämä olisi pitänyt tehdä vuosia sitten, kun siitä tuli vaihtoehto.)   
         
    * UUTTA: Luo datasettejä Xml on uusi apuohjelma vaihtoehto: findDuplicateTime, joka etsii kautta kokoelman gridded .nc   (ja siihen liittyvät) tiedostot, jotka löytävät tiedostoja, joissa on kaksoisajat. Katso [findDuplicate Aika](/docs/server-admin/datasets#findduplicatetime)   
         
    * UUTTA: datasets.xml voi nyt sisältää&lt;palettes&gt; tag, joka ohittaa&lt;palettes&gt; tag value from messages.xml (tai palaa viesteihin.xml-arvo, jos se on tyhjä) . Tämän avulla voit muuttaa luetteloa saatavilla palettes kun ERDDAP™ Hän pakenee. Myös, jos sinulla on cptfiles alihakemistoon ERDDAP™ sisältöhakemisto, ERDDAP™ kopioi kaikki \\*.cpt-tiedostot kyseiseen kansioon \\[ tomcat \\] /webapps/erddap/WEB-INF/cptfiles-hakemisto joka kerta ERDDAP™ Aloitetaan. Yhdessä näiden muutosten avulla voit lisätä paletit ja muutokset jatkuvat, kun asennat uuden version ERDDAP . Katso [paletit](/docs/server-admin/datasets#palettes)   
Jennifer Sevadjianin, Melanie Abecassiksen ja ehkä muidenkin CoastWatch-ihmisten ansiosta.
         
    * MUUTETTU: [&lt;HidasDownTroubleMillis&gt;] (/docs/server-admin/datasets#slowdowntroblemis) käytetään nyt kaikkiin epäonnistuneita pyyntöjä, ei vain muutamia tyyppejä.
         
    * MUUTTUNUT: RunLoadDatasets-lanka keskeyttää nyt LoadDatasets-langan 3/4 LoadDatasetsissa MaxMinutes niin on enemmän aikaa LoadDatasets huomata keskeytys ja poistua hienovaraisesti. Tähän liittyy myös enemmän ja parempia diagnostisia viestejä.
         
    * Muuttunut vanhasta versio Lucene v8.7.0.
         
    * MUUTOS: Sähköpostit ERDDAP™ Nyt näkyvät kiinteällä fontilla.
         
    * MUUTOS: EDDGrid FromFiles saa nyt akseliarvot sekä ominaisuudet FIRST | LAST-tiedosto, sellaisena kuin se on määritelty&lt;metadataFrom&gt;. Kiitos. (ei) to Ken Casey, et al.
         
    * ADDED tuki epäkelpoille yksiköille "celo\\_North" ja "celo\\_East," joita käytetään virheellisesti viimeaikaisissa tiedostoissa (Vuodesta 2020-10-01) AVHRR Pathfinder Versio 5.3 L3-Kolated (L3C) SST-aineistot (nceiPH53 sst d1day ja nceiPH53 sst n1day) . ERDDAP™ voi nyt standardoida ne voimassa oleviin yksiköihin. Kiitos. (ei) to Ken Casey, et al.
         

## Versio 2.11{#version-211} 
 (julkaistu 2020-12-04) 

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    * BUG FIX: OrderByMean heitti NullPointerPointPoikkeuksen, jos muuttujassa oli vain yksi\\_FillValue tai puuttuu\\__ Määritelty arvo. Nyt se hoitaa tilanteen oikein. Kiitos Marco Alban.
         
    * BUG FIX: Oli ongelmia ODV tekstitiedostoja luotu ERDDAP™ V2.10. Ongelmat ovat kunnossa. Kiitos Shaun Bellin.
         
    * BUG FIX: Juuri sisään. ERDDAP™ v2.10: Jos lat lon rajaukset oli määritelty URL, rajauslaatikko ei piirretään maailman kartta. Nyt se on taas. John Maurerin ansiosta.
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * BUG FIX: Juuri sisään. ERDDAP™ v2.10: Skriptitiedostot ArchiveADataset, LuodaDatasets Xml ja DasDds eivät toimineet, koska heillä ei ollut muutoksia luokkapolku, joka lisättiin ERDDAP™ V2.10. Kiitos Marco Alban.
         
    * UUTTA: datasets.xml , sinulla voi olla nyt merkki:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

Tällä hetkellä, jos totta (tai jos tunniste on tyhjä, tai jos tunniste ei ole tiedostossa) , kun käyttäjän pyyntö johtaa NullPointer poikkeus, ERDDAP™ lähettää pinon jäljityksen sähköpostiin erd.data at noaa.gov   (a ERDDAP™ kehitysryhmä) . Tämän pitäisi olla turvallista, koska luottamuksellisia tietoja ei ole (Esim. pyyntö) sisältyy sähköpostiin. Näin pitäisi olla mahdollista napata mitään hämäriä, täysin odottamattomia bugeja, jotka johtavat NullPointer-poikkeuksiin. Muuten käyttäjä näkee poikkeuksia, mutta ERDDAP™ Kehittäjät eivät, joten emme tiedä onko ongelmia korjattava.
        
On mahdollista, että tämä tag johtaa muita, samanlaisia diagnostisia tietoja sähköpostitse erd.data at noaa.gov Tulevaisuudessa. Sähköpostin sisältö on aina minimaalinen ja liittyy vikoihin eikä esimerkiksi käyttötietoihin. Kiitos Marco Alban.
         
        
    * MUUTTUNUT: Nyt yhteiset pakattu tiedostotyypit ( .bz2 , .gz , .gzip , .tar , .tgz , .z , .zip ) ovat kiellettyjä myös tavu kantama pyynnöt. Tämä täsmennetään&lt;laajennuksetNorRangeRequests&gt; in messages.xml.
         
    * -Tiedän. Kuten ERDDAP™ 2.10 .nc ml tiedostoja, jotka yrittävät muuttaa ominaisuutta, älä muuta ominaisuutta. Tämä on tunnettu bug netcdf-jaava, jonka olen raportoinut ja he sanovat korjataan seuraavassa julkaisussa netcdf-java.
         

## Versio 2.10{#version-210} 
 (julkaistu 2020-11-05) 

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    * UUTTA: Uusi [Interpolaatti](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html) muunnin tehokkaasti interpoloi arvot ruudukoitetun aineiston arvoista. Näin ollen se on erityisen hyödyllinen eläinradan tietojen parissa työskenteleville tutkijoille. Tämä muunnin ottaa taulukon leveys-, pituus- ja aika sarakkeet (ja ehkä muita sarakkeita) ja palauttaa taulukon, jossa on muita sarakkeita ja interpoloituja arvoja. Näin ollen tämä on samanlainen kuin suosittu [Xtractomatic](https://coastwatch.pfeg.noaa.gov/xtracto) Script alun perin luotu Dave Foley, mutta tarjoaa edun käsittelyn jopa 100 pistettä per pyyntö. Kiitos Dave Foleyn ja Jordan Watsonin ( NMFS ) .
         
    * PARANTAA: Tarkennettu haku on nyt tiukka non-.html pyyntöjä. Nyt se esittää poikkeuksia pyynnöille, joissa on pysyviä virheitä (Esim. pyynnöt, joissa minLat &gt; maxLat) tai tilapäisiä virheitä (esim. standard\\_name Sitä ei ole olemassa.) . For .html pyynnöt, Tarkennettu haku on muuttumaton: kuten Google hakuja, se tekee parhaan ja äänettömästi korjata tai sivuuttaa virheitä. Kiitos Rich Signellin.
         
    * IMPROVED: Tarkennetun hakusivun kartta on nyt suurempi (Sinun täytyy vielä siristää, mutta vähemmän) ja huomattavasti tarkempi (mutta ei silti täydellinen) . John Maurerin ansiosta.
         
    * IMPROVED: "Draw land maski" asetus Make A Graph web-sivut ja &.land=... asetus URL-osoitteet, jotka pyytävät kartta nyt tukee kahta muuta vaihtoehtoa:
"Ulkolinja" piirtää vain maamastoa, poliittisia rajoja, järviä ja jokia.
Se ei vedä mitään puoleensa.
Katso [& Maa =... dokumentaatio](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) .
John Maurerin ansiosta.
         
    * IMPROVED: Kaaviot ja kartat luotu ERDDAP™ voi nyt käyttää kolmea uutta merkkityyppiä: Rajaton Täytetty Square, Rajaton Täytetty Circle, Rajaton Täytetty Kolmio. Tämän koodin antoi Marco Alba ETT / EMODnet Physics. Kiitos Marco Alban.
         
    * UUTTA: "files" järjestelmä tukee nyt tavallinen Tiedostotyypin vastaukset (.csv .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv , tai .xhtml .) , esimerkiksi [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv) .
Kiitos Kyle Wilcoxin.
         
    * IMPROVED: URL-osoitteet luodaan, kun käyttäjä käyttää Data Access Form (.html) tai merkki-A-kuvio (. graph) web-sivun nyt oikein prosentti-koodata merkkiä \\[ sekä \\] . Tämä tekee URL-osoitteista hieman vaikeampi ihmisille lukea, mutta on parempi web-turvallisuuden näkökulmasta. Hallintovirkamiehillä on nyt mahdollisuus asettaa rento QueryChars= ' \\[  \\]  | ' on Tomcat palvelimen.xml tiedosto (vähemmän turvallinen) tai ei (turvallisempi) .
Kiitos Antoine Quericin, Dominic Fuller-Rowellin ja muiden.
         
    * UUTTA: Jos pyyntö EDDTable-aineisto sisältää & lisää Muuttujat Missä (_attribuutti Nimi, ominaisuus Arvo) , ERDDAP™ lisää kaikki muuttujat, jotka ovat _attribuutti Nimi=attribuutti Arvo_ pyydettyjen muuttujien luetteloon.
Katso [& Lisää Muuttujat Jos asiakirjat](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere) . Kiitos Aurelie Briand, et al.
         
    * MUUTETTU: ERDDAP™ Nyt kieltäytyy tavualue pyynnöt /files / .nc tai .hdf tiedostot. Älä yritä muodostaa yhteyttä etään .nc tai .hdf Aivan kuin ne olisivat paikallisia tiedostoja. Se on hirvittävän tehoton ja aiheuttaa usein muita ongelmia. Sen sijaan:
        * Käyttö(OPeN)DAPasiakasohjelmisto, johon yhteys ERDDAP S DAP Tämän tietokokonaisuuden palvelut (joilla on /griddap/ tai / tabledap / URL) . Niin. DAP Se on sitä varten.
        * Käytä tietokokonaisuuden tietojen saatavuutta koskevaa lomaketta pyytääksesi osajoukkoa tietoja.
        * Jos tarvitset koko tiedoston tai toistuvan pääsyn pitkään, käytä curl , wget , tai selain ladata koko tiedoston, sitten käyttää tietoja paikallisesta kopiosta tiedoston.
             
    * PARANNETTU: Txt-tulosteen vaihtoehto on kirjoitettu uudelleen tukemaan uutta versiota ODV .txt tiedostoja ja tukea asianmukaista edustusta lentoradan, aikasarjat, ja profiilin tietoja.
         
    * PARANTAA: Nyt, hakutermejä kaksinkertainen lainausmerkeissä tulkitaan json merkkijono, jotta ne voivat olla\\ koodattuja merkkejä. Muun muassa tämän avulla voit etsiä tarkka vastaavuus attribuutti, esim., "institution = NOAA  \\n " ei vastaa aineistoa laitoksen = NOAA   NMFS . Dan Nowackin ansiosta.
         
    * PARANTAA: Lisäpaikoissa liukulukuja (erityisesti kaksoiskappaleiksi muunnetut kellukkeet) Nyt näyttää hieman pyöreämpi versio määrä lisäpaikkoja, esim. float aiemmin esitetty kaksinkertainen 32.27998779296875, saattaa nyt näyttää 32.28. Kiitos Kyle Wilcoxin.
         
    * BUG FIX: unsigned integer audio tiedostoja luki hieman väärin. Nyt ne luetaan oikein.
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * VAROITUS: Ensimmäinen kerta kun juokset ERDDAP™ v2.10, jotkut tiedot perustuvat paikallisiin tiedostoihin ladata **hyvin** hitaasti koska ERDDAP™ on luotava uudelleen tiedostojen tietokanta. Kun hidas alkuperäinen lataus, ne latautuvat nopeasti, kuten ennenkin. Ole kärsivällinen.
         
    * Sinun täytyy tehdä jotain:
        * Kun ensimmäinen ajaa v2.10, jotkut tiedot eivät ehkä ladata, koska ERDDAP™ on nyt tiukempi joidenkin metatietojen osalta. Kuten ennenkin. ERDDAP™ lähettää sinulle Daily Report, kun se latautuu. Siihen sisältyvät virheviestit jokaiselle tiedostolle, joka ei ladannut. Lue virheviestit ongelmien selvittämiseksi. Useimmissa tapauksissa sinun tarvitsee vain tehdä pieni muutos datan metatietoihin ongelman ratkaisemiseksi.
             
        * Sisään datasets.xml , etsi&lt; sourceName &gt;= (Huomaa '=' merkki, joka tunnistaa [kiinteä arvo sourceName ](/docs/server-admin/datasets#fixed-value-sourcenames) ) . Useimmille ERDDAP™ Nämä ovat harvinaisia. Jos jokin arvoista jälkeen '=' ovat merkkijonoja (ei numeroita) , sinun täytyy nyt liittää merkkijono kaksinkertainen lainausmerkkejä. Esimerkiksi
Ennen:&lt; sourceName &gt;=KZ401&lt;/ sourceName &gt;
jälkeen:&lt; sourceName &gt;="KZ401"&lt;/ sourceName &gt;
             
        * UUTTA: On uusi valinnainen asetus setup.xml,&lt;OletusAccessibleViaFiles&gt;, joka asettaa oletusarvon&lt;EsteetönViaFiles&gt; kunkin tietokokonaisuuden osalta. Oletus tälle uudelle tunnisteelle on virheellinen, mikä jäljittelee edellistä ERDDAP™ Käytöstä. Tämä alemman tason asetus voidaan kumota tietyn aineiston&lt;EsteetönViaFiles&gt; -asetus.
            
SUOSITTELEE (Koska on käyttäjiä, jotka haluavat tätä) :
Jos haluat tehdä kaiken... FromFiles tietokokonaisuuksia saatavilla tiedostojen järjestelmän, sitten
            
            1. Lisää tämä tagi setup.xml-tiedostoosi:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Valinnaisesti) Poista kaikki
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
in datasets.xml koska oletus on nyt totta.
                 
        * Lisää\\_FillValue-attribuutit:
             ERDDAP™ käytetään oletukseen \\_FillValue kaikille kokonaislukumuuttujille: tietotyypin enimmäisarvo (esim. 127 tavumuuttujien osalta) . Nyt ei. Jotta näitä arvoja ei osoitettaisi tietoarvoina (ei puuttuvia arvoja) , sinun täytyy nimenomaisesti ilmoittaa nämä \\_ FillValue- ominaisuuksien kautta. Tästä lähtien, joka kerta kun aloitat ERDDAP™ , se lähettää ylläpitäjälle sähköpostin, jossa on .csv taulukko, jossa on luettelo kokonaislukulähdemuuttujista, joilla ei ole \\_FillValue tai missing\\_value attribuutit ja ehdotetut uudet\\_FillValue-attribuutit. Katso [Lisää\\_täydennys Arvon ominaisuudet](/docs/server-admin/datasets#add-_fillvalue-attributes) Lisätietoja ja ohjeita.
             
        * Jos kokoat ERDDAP™ , sinun täytyy muuttaa luokkapolku parametri javac komentorivit lisätä viittaus näihin uusiin jar's: lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-anotations.jar;lib/jackson-core.jar;lib/jackson-databind.jar .
             
    * MUUTOS: Tomcat 9 on nyt suositeltu versio Tomcat ERDDAP . Tomcat 8.5+:n uusin versio sopii myös toistaiseksi. Siivosimme. ERDDAP S [Tomcat asennusohjeet](/docs/server-admin/deploy-install#tomcat) .
        
Uusin versio Java 8 (ei Java 9, 10, 11, ...) alkaen [AdoptOpenJDK](https://adoptopenjdk.net/) on edelleen suositeltu versio Java B. ERDDAP . Java 8 on pitkäaikainen tuki AdoptOpenJDK joten se on edelleen turvallinen käyttää, mutta muista saada uusin versio siitä määräajoin turvallisuussyistä.
        
    * UUTTA: Script SourceNames / Johdetut muuttujat taulukkomuodossa
EDDTableFromFromFromFromDatabase, ja EDDTableFromFileNames dataset voivat nyt sisältää ilmauksia ja skriptejä sourceName . Näin voit tehdä uusia muuttujia nykyisten muuttujien lähdetiedostoja. Tietyn uuden muuttujan laskenta tehdään yhden rivin sisällä tuloksista, toistuvasti kaikille riveille. Esimerkiksi pituuspiirin muuttujan, jonka arvot ovat välillä -180-180°, tekeminen muuttujasta, jonka arvot ovat välillä 0-360°:
        &lt; sourceName &gt;=Math2.anglePM180 (rivi.sarake Kaksinkertainen ('lon') ) &lt;/ sourceName &gt;
Lisätietoja: [Script SourceNames](/docs/server-admin/datasets#script-sourcenamesderived-variables)   
Kiitos Bob Simonsin. (Kuka suunnitteli tämän aiemmin? ERDDAP™ v1.0 ja lopulta löysi keinon toteuttaa se) , Kevin O'Brien, Roland Schweitzer, John Maurer, ja Apache JEXL kirjaston tekemästä todella vaikea osa (Ja tehdä sen hyvin) .
         
    * UUTTA: Allekirjoittamattomat kokonaislukutietotyypit (ubyte, ushort, uint, ulong) tukea nyt. Huomaa, että monet tiedostotyypit (esim., das, dds, .nc 3) Älä tue kaikkia näitä uusia tietotyyppejä. Katso [Tiedot Tyyppiasiakirjat](/docs/server-admin/datasets#data-types) Lisätietoja siitä, miten ERDDAP™ käsittelee näitä eroja. Erityisesti, koska(OPeN)DAP, erityisesti .dds vastaus, ei tue allekirjoitettu tavuja, pitkiä, tai unongs, saatat haluta käyttää ERDDAP 's taulukko edustus .das ja .das kuten nähdään http .../vääristymä **info** / datasetID _.html-sivusto (esimerkiksi [ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html)  ) jonka voit myös saada muita tiedostotyyppejä tai .nccsv Metatietojen vaste (esimerkiksi [ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)  ) , jotka molemmat tukevat kaikkia tietotyyppejä kaikissa tilanteissa.
        
VAROITUS: Tietoaineistoista, joihin muutos vaikuttaa, on mahdollista, että näet ongelmia aineistossa, koska tiedot ERDDAP™ lukee lähteestä voi olla erilainen (Esimerkiksi, muuttujat aiemmin lukea allekirjoitettu kokonaislukuja voidaan nyt lukea allekirjoittamattomia kokonaislukuja) . Ongelmia ovat: uusia tiedostoja ei lisätä tiedostoon, ja/tai virheitä, kun yrität käyttää tietoja. Jos aineisto on ongelmia, ensimmäinen asia on yrittää [asettaa Lippu](/docs/server-admin/additional-information#hard-flag) tietoaineistosta. Jos se ei ratkaise ongelmaa, katso lokia. txt nähdäksesi virheviestit, kaivaa datasets.xml tietokokonaisuuden osalta ja/tai kenties uudelleenkäyttö tuottaaDatasets.xml tietokokonaisuudelle.
Kiitos netcdf-java 5.x (joka pakotti kysymyksen) ja tuleva CF1.9.
        
    * Nyt on. [parempaa dokumentointia tai neuvontaa](/docs/server-admin/datasets#s3-buckets) kuinka luoda tiedostoja tiedostoista AWS S3 kauhoissa. Kiitos Micah Wengrenin.
         
    * MUUTTUA: On olemassa useita muutoksia liittyvät "files" Järjestelmä.
        * Tämän käsittelykoodi kirjoitettiin uudelleen, jotta sitä voitaisiin käyttää useammissa luokissa.
             
        * UUTTA: Käyttäjän pyynnöt kansioluetteloita voi nyt pyytää, että vastaus on yksi vakio tavallinen taulukkotyypit liittämällä haluttu tiedostotunniste: .csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv , tai .xhtml ) Esimerkiksi
             [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)   
Kiitos Kyle Wilcoxin ja Shane St Savagen.
             
        * Nyt, luo Dataset Xml ei sisällä&lt;EsteetönViaFiles&gt; tag lähtö. Oletuksena on, että aineisto perustuu uuden&lt;OletusAccessibleViaFiles&gt; tag setup.xml. Katso [Esteetön ViaFiles](/docs/server-admin/datasets#accessibleviafiles) .
             
        * PARANTAA: Muut tietoaineistotyypit tukevat nyt saatavilla olevia tietoja Viestit: EDDGrid SideBySide EDDGrid Aggregaatti EDDGrid Erddapista Edddapista. EDDGrid EDDTabletista alkaen EDDGrid ja EDDGrid -Etoposta. Näistä tietyn etä-/lapsitiedoston tiedostot ovat saatavilla vain, jos sekä emolla että etä-/lapsi-aineistolla on pääsy ViaFiles asetettu totta (ehkä kautta&lt;OletusAccessibleViaFiles &gt;). Damian Smythin ja Rob Fullerin ansiosta.
             
        * TO DO / SUOSITUS: Suosittelemme, että kaikki asiaankuuluvat tiedot ovat saatavilla tiedostojärjestelmän kautta asettamalla&lt;OletusAccessibleViaFiles&gt; to true in setup.xml koska on olemassa ryhmä käyttäjiä, joille tämä on ensisijainen tapa saada tiedot. Muut syyt "files" Järjestelmän avulla käyttäjien on helpompi nähdä, mitkä tiedostot ovat saatavilla ja milloin ne ovat viimeksi muuttuneet, jolloin käyttäjän on helpompi ylläpitää omaa kopiotaan koko aineistosta. Jos et yleensä halua tehdä tiedostoja saataville tiedostojärjestelmän kautta, aseta&lt;OletusAccessibleViaFiles&gt; to false. Kummassakin tapauksessa vain käyttää&lt;EsteetönViaFiles&gt; niistä harvoista aineistoista, jotka ovat poikkeuksia yleisestä politiikasta, joka on määritelty&lt;OletusAccessibleViaFiles&gt; (esimerkiksi, kun tietokokonaisuus käyttää .nc ml tiedostoja, jotka eivät ole kovin hyödyllisiä käyttäjille) .
             
    * PARANTAA: Jos lähdeaineistossa on CF-ruudukko\\_kartoitustietoja, luo Dataset Xml ruudukoille lisää tietoa maailmanlaajuisesti&lt;addAtts&gt; ja tiedot lisätään maailmanlaajuisesti&lt;sourceAtts&gt; joka kerta tiedot luetaan tiedostosta. Tiedot näkyvät tietokokonaisuuden maailmanlaajuisissa attribuuteissa attribuutteina, joissa on etuliitteen ruudukko\\_mapping\\_ .
         
    * PARANTAA: Tuki ryhmille käsittelyssä .nc 4 (ja jossain määrin .hdf 5) tiedostot. Yleensä ERDDAP™ tietokokonaisuus laaditaan jonkin tiedoston ryhmän muuttujista. Myös, Luo tiedostoja Xml EDDGrid FromNcFiles ja EDDGrid FromNcFiles Pura nyt pyytää "ryhmä" (Esim. ""mille tahansa/kaikille ryhmille, "jollekin ryhmälle," "jollekin ryhmälle/joukolle" tai " \\[ juuri \\] " vain juuriryhmä) . Charles Carletonin ja Jessica Hausmanin ansiosta.
         
    * PARANTAA: Luoda datasettejä Xml EDDGrid FromNcFiles ja EDDGrid FromNcFiles Pura nyt tukea valinnaista "DimensionsCSV" -parametria, jonka avulla voit määrittää niiden mittojen lähdenimet, joita haluat käyttää. Käytä "" saada muuttujat, jotka käyttävät eniten mittoja, kuten ennen. Myös tähän liittyvä pieni vika, joka tapahtui tämän tyyppisen tiedoston on nyt korjattu. Kiitos Sujal Manandharin.
         
    * BUG FIX: Generator Datasets Xml luettelot "EDDTableFromJsonlCSVFiles" (ei 'EDDtableFromJsonlCSV') yhtenä EDDType-vaihtoehdoista. Kiitos Andy Zieglerin.
         
    * PARANTAA: EDDGrid FromNcFiles Unpackage nyt standardoi "yksiköt" ominaisuudet standardi / "kanoniset" utareja (Sama menetelmä kuin yksikkömuunnin) . Esimerkiksi "meter per second" , "meters/second" , "m.s^-1" ja "m s-1" kaikki "m s-1" . Kiitos Andy Zieglerin.
        
VAROITUS: On mahdollista, että tämä aiheuttaa ongelmia joidenkin olemassa olevien tietokantojen (Esimerkiksi, aiheuttaa uusia tiedostoja merkitään "huono") . Jos on, [asettaa Lippu](/docs/server-admin/additional-information#hard-flag) tietoaineistosta siten, että kaikki lähdetiedostot luetaan uudelleen uudella järjestelmällä.
        
    * Nyt, muuttujan&lt; sourceName &gt; voi määritellä kiinteän arvon = NaN ja muuttuja voi olla actual\\_range attribuutti, joka määrittelee rajallisen vaihteluvälin. Tämä on joskus hyödyllistä niin, että aineisto (erityisesti EDDtableFromFileNames -tietokanta) voi olla nuken muuttuja (tilu)   (esim., leveyspiiri, pituuspiiri, aika) kiinteä NaN-arvo, mutta kelvollinen actual\\_range   (määritteen mukaan) . Sitten, Tarkennettu Etsi käyttäjä voi etsiä aineistoja, joilla on tietoja tietty leveys-, pituus-, aika- ja tämä tieto voi sanoa, että sillä on merkityksellisiä tietoja (vaikka kaikki todelliset tietorivit osoittavat Nan) . Katso [Kiinteän arvon asiakirjat](/docs/server-admin/datasets#fixed-value-sourcenames) .
Kiitos Mathew Biddlen.
         
    * Nyt datasets.xml chunk for a EDDTableFromAsciiFiles tai EDDTableFromColumnarAsciiFiles dataset voi sisältää tag, joka kertoo ERDDAP™ jättää huomiotta kaikki tiedoston yläreunassa olevat rivit, mukaan lukien rivi, joka vastaa määriteltyä säännöllistä ilmaisua. Esimerkiksi
        &lt;ohita otsikkoToRegex&gt;\\\*\\\\\*\\\\\*Päättäjä.\\*&lt;/skipHeaderToRegex&gt;
jättää huomiotta kaikki rivit jopa ja myös rivi, joka alkaa "\\*\\*Päättäjän loppu. Ks. [&lt;skipHeaderToRegex&gt; dokumentaatio] (/docs/server-admin/datasets#skipheadertoregex) .
Kiitos Eli Hunterin.
         
    * Nyt datasets.xml chunk for a EDDTableFromAsciiFromAsciiFromColumnarAsciiFilesdataset voi sisältää tunnisteen, joka kertoo ERDDAP™ jättää huomiotta kaikki tiedoston rivit, jotka vastaavat määriteltyä säännöllistä ilmaisua. Esimerkiksi
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

ohittaa kaikki rivit, jotka alkavat "#." Ks. [&lt;ChipLinesRegex&gt; dokumentaatio] (/docs/server-admin/datasets#skiplinesregex) .
Eli Hunterin ansiosta.
         
    * UUTTA: datasets.xml chunk mihin tahansa EDDTable-tiedostoon voi nyt sisältyä & lisää Muuttujat Missä (_attributeNamesCSV_) . Jos tulee, ERDDAP™ Lisää widget kunkin määritellyn ominaisuuden Tietokannan tiedonsiirtolomakkeen nimet (.html-verkkosivu) jotta käyttäjien on helppo lisätä & lisää Muuttujat Missä (_attribuutti Nimi, ominaisuus Arvo) pyyntöön.
Katso [& Lisää Muuttujat Jos asiakirjat](/docs/server-admin/datasets#addvariableswhere) .
Kiitos Aurelie Briand, et al.
         
    * UUSI Kolmannen osapuolen työkalu: ERDDAP - Lint
         ERDDAP -Lint on ohjelma Rob Fuller ja Adam Leadbetter Irish Marine Institute että voit parantaa metatietoja ERDDAP™ tiedot. ERDDAP -lint "sisältää sääntöjä ja yksinkertainen staattinen web-sovellus suorittaa joitakin todentamistestejä vastaan ERDDAP™ Palvelin. Kaikki testit suoritetaan selaimessa." Kuten [Unix/Linux Lint -työkalu](https://en.wikipedia.org/wiki/Lint_(software) ), voit muokata nykyisiä sääntöjä tai lisätä uusia sääntöjä. Katso [ ERDDAP - Lint](https://github.com/IrishMarineInstitute/erddap-lint) Lisätietoja.
        
Tämä työkalu on erityisen hyödyllinen tietoaineistoissa, jotka olet luonut jokin aika sitten ja nyt haluat saattaa ajan tasalle nykyisten metatietoasetustesi kanssa. Esimerkiksi varhaiset versiot GenerateDatasets Xml ei panostanut globaalin luomiseen creator\\_name , creator\\_email , luoja\\_tyyppi, tai creator\\_url metadata. Voit käyttää ERDDAP - Lint tunnistaa tiedot, joissa ei ole metatietoja.
        
Kiitos Rob ja Adam luoda tämän työkalun ja antaa sen käyttöön ERDDAP™ Yhteisö.
        
    * UUTTA: Nyt on okei, jos osa tiedostoista EDDGrid FromFilesin aineistossa ei ole kaikkia tiedoston muuttujia. Tiedostot sisällytetään ikään kuin niillä olisi muuttujat (kaikki puuttuvat arvot) .
Kiitos Dale Robinsonin ja Doug Latornellin.
         
    * UUTTA: Lokitiedostossa ja Päivittäisraportissa on uusia käyttötilastoja, joiden avulla ylläpitäjät tunnistavat muistiongelmia aiheuttavat käyttäjät. Tilaston nimi on "OutOfMemory (Ruudun koko) ""OutOf Memory (Liian iso) " ja "OutOf Memory (Liian iso) " Niissä esitetään näihin ryhmiin kuuluvien pyyntöjen esittäjien IP-osoitteet ja pyyntöjen lukumäärä. Jos ei ollut ongelmia pyyntöjä, nämä tilastot eivät ilmesty. "OutOf Memory (Ruudun koko) " ja "OutOf Memory (Liian iso) "pyynnöt eivät yleensä ole ongelma, koska pyynnöt olivat niin suuria, että ERDDAP™ nappasi heidät nopeasti ja palautti virheviestin. "Muistin ulkopuolella" (Liian iso) "pyynnöt ovat vaarallisempia, koska ERDDAP™ tehnyt hieman vaivaa ennen kuin se tajusi, että ei ole tarpeeksi muistia tällä hetkellä käytettävissä käsitellä pyynnön (vaikka ongelma voi olla muita pyyntöjä juuri ennen näitä pyyntöjä) .
        
On myös uusia tilastoja nimeltä "Large Request, IP-osoite," jotka osoittavat IP-osoitteet käyttäjille, jotka esittivät suuria pyyntöjä (ruudukko .nc tiedostot &gt; 1GB) .
        
Myös aikasarja taulukko tila.html sivu sisältää nyt "memFail"-sarakkeen, jossa esitetään pyyntöjen määrä, joka epäonnistui "OutOfMemory (Liian iso) " virheet viimeisen suuren load Dataset. Mikä tahansa muu kuin 0 tässä on ainakin huolestuttavaa.
Kiitos Bob Simonsin.
        
    * UUTTA: Uusi versio Hyrax näyttää kansioluettelot eri tavalla kuin aiemmin. ERDDAP™ voi nyt lukea vanhat ja uudet luettelot.
         
    * UUTTA: Dataset uudelleenlataukset ja käyttäjien vastaukset, jotka kestävät yli 10 sekuntia loppuun (onnistuneesti tai epäonnistuneesti) joissa on merkintä " (-Kymmenen.) " Näin voit etsiä log.txt-tiedoston tätä lausetta varten löytääksesi tiedostot, jotka olivat hitaita ladata uudelleen, tai pyyntöjen määrän, jotka olivat hitaita. Voit sitten katsoa korkeammalle log.txt-tiedoston nähdäksesi, mikä tiedoston ongelma oli tai mikä käyttäjän pyyntö oli ja keneltä se oli. Nämä hitaat tietoaineistojen kuormitukset ja käyttäjien pyynnöt ovat joskus verottaa ERDDAP . Joten tietää enemmän näistä pyynnöistä voi auttaa tunnistamaan ja ratkaisemaan ongelmia.
    * PARANTAA: validoitaessa CF DSG -tietokantaa, ERDDAP™ nyt varmistaa, että muuttujat cf\\_role-attribuuteilla ovat vastaavassa cdm\\_...\\_variables-luettelossa eikä niitä ole muissa cdm\\_...\\_variables-luetteloissa. Jos esimerkiksi timeseriesProfile-aineistossa on muuttuja "station\\_id," jolla on cf\\_role=timeseries\\_id-attribuutti, niin "station\\_id" on oltava cf\\_timeseries\\_variables-luettelossa, mutta ei cf\\_profile\\__variables-luettelossa.
Kiitos Micah Wengrenin.
         
    * PARANTAA: "Yksinkertaistaa" on nyt nopeampi, käyttää vähemmän muistia, ja voi palauttaa LongArray. Kiitos Unidata .
         
    * PARANTAA: nopeaRestart on nyt huomattavasti nopeampi EDDTableFrom (nc) Tiedostot (Paitsi EDDTableFromNcCFFiles ja EDDTableFromInvalidCRAFiles) koska make Odotettu (ja toiseen paikkaan) Nyt vain lukea näytetiedoston metadatan sijaan lukea kaikki tiedot. Jessica Austinin ansiosta.
         
    * PARANTAA: Nyt on olemassa tukea aikajonoille, joiden tarkkuus on suurempi kuin millisekunti, jos lisänumerot ovat kaikki 0:n, esim., "2020-05-22T01:02:03.456000000Z." Kiitos Yibo Jiangin.
         
    * IMPROVED: GenerateDatasetsXml: n EDD.suggestDestinationName käytetään poistamaan "(" ja kaiken jälkeen. Nyt se poistaa (.\\*) ainoastaan, jos se on loppu sourceName . Nyt se myös poistaa \\[ .\\* \\] Vain jos se on loppu sourceName . Kiitos Julien Paulin.
         
    * PARANTAA: Luoda datasettejä Xml tekee nyt muuttujan destinationName s ainutlaatuinen lisäämällä\\_2, \\_3, ..., tarvittaessa. Kiitos Julien Paulin.
         
    * PARANTAA: Kun Kalenteri2.parseDateTime parses dd, hh, tai HH, ensimmäinen "numero" voi nyt olla tila.
    * -Tiedän. alkaen ERDDAP™ 2.10 .nc ml tiedostoja, jotka yrittävät muuttaa ominaisuutta, älä muuta ominaisuutta. Tämä on tunnettu bug netcdf-jaava, jonka olen raportoinut ja he sanovat korjataan seuraavassa julkaisussa netcdf-java.
         
    * -Ei. Tein asianmukaisen järjestelmän rikki linkit testaus ERDDAP™ web-sivut, joten nyt pitäisi olla hyvin vähän rikki linkkejä (ainakin kunkin julkaisupäivän jälkeen - uusia rikkoutuneita linkkejä syntyy usein) .
         
    * BUG FIX: EDDTableFromHtpGet epäonnistui tietyntyyppisten pyyntöjen. Nyt ei. Kiitos Emman BODC:
         
    * BUG FIX: Joidenkin pyyntöjen käsittelyä varten EDDTable teki tilapäisen tiedoston kustakin pyydetystä muuttujasta, jonka tiedostonimi päättyy muuttujan nimeen. Jos muuttujan nimi oli myös tyyppi pakkaus (esim. Z) , ERDDAP Yrittäisi (ja epäonnistuu) -Ei. Nyt väliaikaiset tiedostonimet päättyvät ".temppiin." Kiitos Mathew Biddlen.
         
    * BUG FIX: LuodaDatasetsXml ja Kalenteri2. Java Päivämäärä Muoto ovat nyt paljon vähemmän todennäköisesti tehdä virheellinen muutos, kun yrittää korjata mahdollisesti virheellinen päivämäärän aikamuoto. Erityisesti, ei auto- ehdotettu päivämääräAikamuotoa muutetaan. Kiitos Mathew Biddlen.
         
    * BUG FIX: Jos oli virhe, kun sait sisältöä etä URL, ja jos virheStream sisältö on pakattu, ERDDAP™ Nyt kunnolla purkaa virheviestin. Kiitos Bob Simonsin.
         
    * BUG FIX:&lt;TilaaToRemoteErddapDataset&gt; ei ollut käytössä, kun EDD... FromErddap-aineisto oli lapsiaineisto. Nyt on. Kiitos Chris Romson.
         
    * BUG FIX: Generator Datasets Xml ei enää usko lähdemuuttujan nimi alkaa "latin" voi olla leveysaste. Kiitos Vincent Luzzon.
         
    * BUG FIX: Nyt OutOfMemoryError kun lukee tiedostoa samalla kun käsitellään käyttäjän pyyntöä ei ole syy lisätä tiedostoa BadFiles listalle. Kiitos Bob Simonsin.
         

## Versio 2.02{#version-202} 
 (julkaistu 2019-08-21) 

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    * UUTTA: Nyt on kaksi tapaa etsiä tiedostoja useita ERDDAP S. Ne toimivat hieman eri tavalla ja niillä on erilaiset rajapinnat ja vaihtoehdot.
        
        *    [Etsi useita ERDDAP s.html](/SearchMultipleERDDAPs.html) Bob Simonsilta / NOAA   NMFS   SWFSC   ERD .
        *    [ http://erddap.com ](http://erddap.com) Rob Fuller / The Marine Institute of Ireland.
        
Kiitos Tylar Murray alkuperäisen pyynnön.
         
    * PARANTAA: pyyntö "files" järjestelmä ladata tiedosto, joka on todella etäsivustolla (esim. AWS S3) nyt johtaa uudelleenohjaus, joten käyttäjä todella ladata tiedot lähde, sijaan käyttää ERDDAP™ välikätenä. Andy Zieglerin ansiosta. NOAA .
         
    * UUTTA: Esimerkkinä uusista AWS S3-ominaisuuksista, ja jotta kenen tahansa olisi helpompi selata ja ladata tiedostoja julkisista AWS S3-ämpäreistä, olemme luoneet
         [~110 näytetietokantaa](https://registry.opendata.aws/) että kukaan voi selata sisältöä lähes kaikki
         [AWS S3 Open Data kauhat](https://registry.opendata.aws/) . Jos napsautat "files" linkki tahansa näistä näytetiedostoja, voit selata hakemistopuun ja tiedostoja että S3 kauha. Koska nämä tiedot toimivat, nämä luettelot ovat aina täysin ajan tasalla, koska ERDDAP™ Se saa heidät lentämään. Jos klikkaat hakemistopuuta alas todelliseen tiedostonimeen ja klikkaat tiedoston nimeä, ERDDAP™ ohjaa pyyntösi AWS S3: lle, jotta voit ladata tiedoston suoraan AWS: ltä. ERDDAP™ hallinnoijat voivat
         [Lue ohjeet miten tämä tehdään muille S3-ämpäreille](/docs/server-admin/datasets#working-with-aws-s3-files) . Andy Zieglerin ansiosta. NOAA .
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * Ei mitään.
         
    * PARANTAA: ERDDAP 's menetelmä tallennuksen jouset (StringArray) on nyt paljon muistitehokkaampi. Merkkijono Kaaremia käytetään kaikkialla ERDDAP™ , erityisesti luettaessa taulukko ASCII-tiedostoja. Myös muut muutokset tekevät lukemisesta CSV/TSV/SSV ASCII:n, kolumnaari ASCII:n ja jsonlCSV:n taulukkotiedostot nopeampia ja paljon muistitehokkaampia. Tuloksena on 764 MB ASCII-tietotestitiedosto (mutta pakattu 52MB:ään .gz tiedosto) 3,503,266 riviä ja 33 saraketta, suurin muistin käyttö meni 10GB alas 0,6GB (huipulla) . Aika lukea se meni ~ 7 minuuttia (mutta vaihtelee suuresti, kuinka paljon fyysinen muisti on tietokone) ~36 sekuntia (mukaan lukien kymmenen yksinkertaistamiseen () jota käytetään vain generoinnissa Xml) . Monissa muissa paikoissa ERDDAP™ hyötyisi tästä muistitehokkuuden parantumisesta. Kiitos Tylar Murrayn ja Mathew Biddlen.
        
Tutkin eri ratkaisua. (tallenna jouset StringArray kuten UTF-8-koodatut tavurakenteet) . Se vähentää muistin käyttöä toiset ~33 prosenttia, mutta hintaan ~33 prosenttia hidastuminen. Nyt käytössä olevaan järjestelmään verrattuna se tuntui huonolta vaihtokaupalta. On helpompaa antaa tietokoneelle enemmän muistia (ostaa lisää muistia ~200 dollarilla) kuin tehdä se nopeammin (osta kokonaan uusi tietokone) .
        
Jos se on kätevä, se on edelleen hyvä idea jakaa valtavat taulukkotiedostot useisiin pienempiin tiedostoihin perustuu joitakin kriteerejä, kuten stationID ja/tai aika. ERDDAP™ Usein on vain avattava yksi pienistä tiedostoista vastauksena käyttäjän pyyntöön ja siten pystyä vastaamaan paljon nopeammin.
        
    * Nyt on. [ ERDDAP™ AWS S3-asiakirjat](/docs/server-admin/datasets#working-with-aws-s3-files) , joka kuvaa miten saada ERDDAP™ työskennellä tiedostojen AWS S3 kauhoissa.
Ja... ERDDAP™ nyt käyttää uusia ominaisuuksia AWS S3 Java API.
Ja... ERDDAP™ nyt AWS S3- URL-osoitteiden avulla voit lisätä lisämerkkejä (piste, väliviiva, alleviiva) Ämpärinimillä.
Ja... ERDDAP™ nyt edellyttää, että AWS S3 kauha URL-osoitteita on yksilöity tietyllä tavalla:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
jossa etuliite on valinnainen.
Andy Zieglerin ansiosta. NOAA .
         
    * PARANTAA: Luoda datasettejä Xml hoitaa nyt muita yleisiä missing\\_value s stand-ins kuin puuttuvat arvot ja niin on todennäköisemmin muuntaa sarake numeeristen tietojen tyyppi. Myös, PrimitiveArray.yksinkertaista () nyt lokit, jotka erityisesti data-arvo aiheutti sen kohdella tietyn sarakkeen kuin sarakkeen jouset. Kiitos Mathew Biddlen.
         
    * PARANTAA:&lt;pyyntöMusta lista&gt; tukee nyt .\\*.\\*  (tai:\\*:\\*IPv6) IP-osoitteiden lopussa, jotta voit listata isomman osan IP-osoitteista, esim. 110.52.\\*.\\*  (Kiina Unicom Tianjin) . Ks. asiakirjat [&lt;pyyntöMusta lista&gt;] (/docs/server-admin/datasets#requestblacklist) Kiitos China Unicom ja China Telecom.
         
    * PARANTAA: Jos tietokokonaisuuden lähde ei määritä "institution" attribuutti, generator Datasets Xml ja lataaDataset nyt saada sen "luoja\\_institution" ominaisuus (jos saatavilla) . Kiitos Micah Wengrenin.
         
    * BUG FIX: standardisoi Mitä ei aina sovellettu ASCII-tiedostoihin.
EDDTable ei myöskään käsitellyt asianmukaisesti aika-arvoja koskevia rajoituksia, kun lähde oli String aika-arvot ja standardoida Mitä käytettiin?
Kiitos Paloma de la Valleen.
        
En ole selvästi todennut aiemmin: Sinun pitäisi vain käyttää standardization Mitä ominaisuuksia kun todella tarvitset niitä (esim. kun eri lähdetiedostot tallentavat aikaarvoja eri tavoin) , koska jotkut pyynnöt tietokokonaisuuksia, jotka käyttävät standardization Mitä käsitellään hieman hitaammin.
        
    * BUG FIX: Virhe koodissa, jota käytetään EDDGrid FromNcFiles aiheutti sen epäonnistumisen .nc 4 ja .hdf 5 tiedostoa, joissa on "pitkä" (int64) muuttujat. Tämä on nyt korjattu. Kiitos Friedemann Wobusin.
         
    * BUG FIX: Pienet muutokset ISO 19115 -tiedostoihin, jotta eri validaattori olisi tyytyväinen. Kiitos Chris MacDeroidin ja Anna Milanin.
         

## Version 2.01{#version-201} 
 (julkaistu 2019-07-02) 

*    **Uudet ominaisuudet ja muutokset (käyttäjille) :** 
    * Ei
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * BUG FIX: Koodissa oleva vika, joka tuottaa tiedonkäyttölomakkeen tabledap Tiedostot aiheuttivat sen, että verkkosivu oli joidenkin tietokokonaisuuksien osalta tyhjä. Lisäksi olen parantanut käsittelyä odottamattomia virheitä kaikilla HTML-sivuilla, joten ne (yleensä) Näytä virheviesti. Kiitos Marco Alban.
    * PARANTAA: Luoda datasettejä Xml ei enää tulosta pitkä varoitus päällä lähtö. Sen sijaan, katso [Muokkausgeneraattori Dataset Xml- tuloste](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better) . Steven Baumin ansiosta.
    * PARANTAA: Luoda datasettejä Xml tekee nyt hieman erilaisia suosituksia eri tilanteissa&lt;updateEveryNMillis&gt; varten EDD ... From ... Files tiedostoja. Myös, Luo tiedostoja Xml estää nyt alkuperäisen "uutteen" järjestelmän EDDtableF FromFromFiles tietoja.

## Versio 2.00{#version-200} 
 (julkaistu 2019-06-26) 

*    ** ERDDAP™ V2.00 on vihdoin täällä&#33; Jee&#33;**   
     
    * Pahoittelemme pitkä viive tarvitaan loppuun tämän version.
Kiitos kärsivällisyydestänne.
         
    * Hyvä uutinen on, että lisäaikaa käytettiin lisäämään enemmän ominaisuuksia, joita käyttäjät olivat pyytäneet. Huono uutinen on, että vaikka viive, kaikki pyydetyt ominaisuudet ei lisätty. Olemme pahoillamme, mutta tuntui tärkeämpää saada tämä julkaisu ulos kuin viivyttää enemmän (Ikuisesti?) jatkuvasti lisäämällä uusia ominaisuuksia. Lupaamme palata useammin julkaisuihin tulevaisuudessa.
         
    * "Varaus 2? Onko suuria muutoksia ja yhteensopimattomuutta?"
Isoja uusia ominaisuuksia? Kyllä.
Suuri yhteensopimattomuus tai muutokset ylläpitäjille tai käyttäjille? Ei.
Hyppäsimme v1.82 v2.00:
        * osittain juhlia 10 vuotta (Nyt 11) sen jälkeen, kun ERDDAP™   (v1.00 2008-05-06, joka ulospäin näytti huomattavan v2.00) . Sinä aikana ERDDAP™ on siirtynyt yhdestä laitoksesta lähes 100 laitokseen vähintään 12 maassa (Australia, Belgia, Kanada, Ranska, Intia, Irlanti, Italia, Etelä-Afrikka, Espanja, Thaimaa, Yhdistynyt kuningaskunta, Yhdysvallat) .
        * osittain merkittävä lisäys täysin uuteen suuntaan: ERDDAP™ Nyt on dataa syövin järjestelmä mennä nykyisten data palvelinpalvelut (Katso [EDDTableFromHttpGet](#eddtablefromhttpget) ) ,
        * ja osittain koska se ei ollut suuri hyppy 1.82-2.00 numeerisesti, joten tämä tuntui oikea aika.
             
    * Toinen hyvä uutinen on, että nyt on olemassa kaksi muuta ryhmää, jotka osallistuvat koodi ERDDAP™   (tässä versiossa ja viitteitä ne jatkavat) : Rob Fuller ja Adam Leadbetter Irlannin Marine Institutesta ja Roland Schweitzer PMEListä ja Weathertop Consultingista. Kiitos paljon. On totta, että he työstävät omia projektejaan, mutta se on klassinen avoimen lähdekoodin kehittämismalli -- ryhmät antavat koodin niille ominaisuuksille, joita he eniten haluaisivat lisätä. Lisähyöty vastaajille: he saavat käyttää uusia ominaisuuksia heti, kun ne ovat valmiita; heidän ei tarvitse odottaa seuraavaa julkaisua ERDDAP . Myös teidän ryhmänne on tervetullut osallistumaan&#33; Katso [ ERDDAP™ Ohjelmoijan opas](/docs/contributing/programmer-guide) .
         
    * Toivottavasti pidät ERDDAP™ v2.00. Odotamme seuraavat 10 vuotta ERDDAP™ kehitys ja yhä enemmän käyttöä ympäri maailmaa.
         
*    **Uudet ominaisuudet ja muutokset (käyttäjille) :**   
     
    * UUTTA: orderByMean suodatin
B. tabledap Tiedostoissa lasketaan määriteltyjen ryhmien keinot. Lisäksi orderBy vaihtoehdot tukevat nyt uutta tapaa määritellä ryhmiä: _numericVariable \\[ / numero \\[ aikayksiköt \\]  \\[ :offset \\]  \\] _, esim. aika/1 päivä tai syvyys/10:5. Esimerkiksi stationID , aika, vesialue orderByMean  (" stationID , aika/1 päivä") lajitella tuloksia stationID ja aika, sitten laskea ja palauttaa keskiarvo waterTemp kunkin stationID Kunkin päivän osalta. Nämä ovat huomattavan hyödyllisiä ja tehokkaita uusia ominaisuuksia. Rob Fuller ja Adam Leadbetter toimittivat uuden koodin näille ominaisuuksille ja vanhan koodin muutoksille Gitin kautta. Kiitos. Rob ja Adam&#33;
         
    * UUTTA: taulukkotiedostojen tulostiedostotyyppi: [. Taulukko](https://developers.google.com/chart/interactive/docs/reference#dataparam) ,
JSON-tiedosto muotoiltu käytettäväksi Google Visualization asiakaskirjasto ( Google Charts ) . Tämän koodin antoi Roland Schweitzer ja se toimitettiin Gitin kautta. Kiitos. Roland&#33;
         
    * UUTTA: taulukkotiedostojen tulostiedostotyyppi: [ .jsonlCSV1 ](https://jsonlines.org/examples/) ,
joka on kuin nykyinen .jsonlCSV vaihtoehto, mutta sarake nimet ensimmäisellä rivillä. Kiitos Eugene Burgerin.
         
    * UUSI: Jos ylläpitäjä mahdollistaa sen, käyttäjät voivat nyt kirjautua sisään heidän [ORCID](https://orcid.org) Tili.
Se on OAuth 2.0 -tunnistusjärjestelmä, kuten Googlen tunnistautuminen. Tutkijat käyttävät ORCID:tä laajasti tunnistaakseen itsensä. ORCID-tilit ovat ilmaisia eikä niillä ole Google-tilien tietosuojaan liittyviä ongelmia. Katso ERDDAP S [Öljyiset tunnistusohjeet](/docs/server-admin/additional-information#orcid) . Kiitos BCO-DMO (Adam Shepard, Danie Kinkade jne.) .
         
    * UUSI: Uusi URL-muunnin muuntaa vanhan URL-osoitteet ajan tasalle URL.
Ks. .../eddap/convert/urls.html ERDDAP™ asennus, esim.
         [Tämä linkki muuntimen ERD   ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html) . Tämän pitäisi olla hyödyllistä tiedon hallinnoijille. Tätä käytetään myös sisäisesti GenerateDatasetsXml. Kiitos Bob Simonsin ja Sharon Mesickin.
         
    * PARANTAA: [Ajanmuunnin](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) nyt on vaihtoehtoja muuntaa mikä tahansa yhteinen merkkijono aika ISO8601 merkkijonoaikaa, tai muuntaa UDUNITS - Kuten aikayksiköt muodostavat oikean UDUNITS Aikayksiköiden merkkijono. Tämän pitäisi olla hyödyllistä myös ERDDAP™ hallinnoijat, joiden on tiedettävä, missä muodossa määrittää "yksiköt" ominaisuus merkkijonoaika muuttujia. Tätä käytetään myös sisäisesti GenerateDatasetsXml ja standardizeMikä ominaisuus EDDtableFromFromFles. Kiitos Bob Simonsin.
         
    * UUTTA: [Yksikkömuunnin](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) on uusi "Standardize UDUnits" vaihtoehto.
Esimerkiksi "deg\\_C/m" ja " astetta\\_C metriä-1" muutetaan
"aste\\_C m-1." Tätä ominaisuutta käytetään myös standardizeMikä ominaisuus EDDtableFromFromFles. Kiitos Bob Simonsin.
         
    * UUTTA: Kaaviot (muut kuin pintakuviot) ruudukossa ja tabledap 's Make A Graph web-sivut, kun x-akseli ei ole aikaakseli, jos vain osajoukko x-akselin muuttujan alueesta on näkyvissä, on nyt painikkeita kaavion yläpuolella siirtää X Axis vasemmalle tai oikealle. Kiitos Carrie Wall Bell / Hydrophone projekti.
         
    * UUTTA: Kaavioihin X- ja/tai Y-akseli voi nyt käyttää lokiasteikkoa.
Käyttäjät voivat hallita Y Axis Scale kautta uusi pudotus-down widget ruudulla ja tabledap Tee kaavion verkkosivut. Katso [.xRange ja . yRange-dokumentaatio](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange) . Kiitos Carrie Wall Bell / Hydrophone projekti.
         
    * PARANTAA: ERDDAP™ nyt hyödyntää paremmin erilaisia HTTP virhekoodeja ja nyt palauttaa(OPeN)DAPv2.0-muotoinen virhesanoman hyötykuorma. Katso [yksityiskohtaiset tiedot](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors) . Kiitos Antoine Quericin ja Aurelie Briandin.
         
    * IMPROVED: Älä käytä Netcdf-java/c tai muita ohjelmistotyökaluja yhteyden saamiseksi .nc tai .hdf tiedostot, joita hallinnoivat ERDDAP /tiedostot/ järjestelmä kuin ne olisivat paikallisia tiedostoja. ERDDAP™ Nyt kieltäydymme näistä pyynnöistä. Se on hirvittävän tehoton ja aiheuttaa usein muita ongelmia. Sen sijaan:
        
        * Käyttö(OPeN)DAPasiakasohjelmisto, johon yhteys ERDDAP S DAP tietokokonaisuuden palvelut (joilla on /griddap/ tai / tabledap / URL) . Niin. DAP on ja tekee niin hyvin.
        * Tai, käytä tietokokonaisuuden Data Access Form pyytää osajoukko tietoja.
        * Tai jos tarvitset koko tiedoston tai toistuvan käytön pitkän ajan, käytä curl , wget , tai selain ladata koko tiedoston, sitten käyttää tietoja paikallisesta kopiosta tiedoston.
        
          
         
    * PARANTAA: ERDDAP™ kotisivu, Full Text Haku on nyt yläpuolella "Näytä luettelo kaikista Dataseteista," koska se on paras lähtökohta useimmille käyttäjille. Kiitos Didier Mallarinon ja Maurice Libesin.
         
    * PARANTAA: DataProviderForm3.html on nyt pudotuslistat yhteisiä standard\\_name S. Kiitos jonkun IOOS DMAC:n kokouksessa.
         
    * IMPROVED: /files/ web- sivuilla on nyt linkki uuteen "Mitä voin tehdä näiden tiedostojen kanssa?" osioon /tiedostot/ dokumentaatio. Tässä osiossa kuvataan erilaisia tiedostotyyppejä ja annetaan ehdotuksia niiden kanssa työskentelystä. Maurice Libesin ansiosta.
         
    * PARANTAA: Lähes jokainen pyyntö ERDDAP™ pitäisi olla ainakin hieman nopeampi ja joskus paljon nopeampi.
         
    * BUG FIX: Joissakin olosuhteissa, kun EDDTablen aineisto tallensi tietoja tietyntyyppisissä .nc tiedostot, maailmanlaajuinen "id" ominaisuus oli asetettu tiedoston ehdotettu nimi, joka sisältää hash tehdä siitä ainutlaatuinen kyseiseen pyyntöön. Nyt "id" jätetään asianmukaisesti ennalleen (jos määritelty) tai asetettu tietokokonaisuuden datasetID   (jos ei määritelty) . John Maurerin ansiosta.
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:**   
     
    * TO: Tämä julkaisu vie aikaa ja työtä sinulta. Ole kärsivällinen ja suunnittele muutaman tunnin tehdä tarvittavat muutokset ja muutaman tunnin kokeilla uusia ominaisuuksia.
         
    * TOTDO: Turvallisuuden vuoksi tee varmuuskopio nykyisestä setup.xml ja datasets.xml tiedostot, jotta voit palata niihin epätodennäköisessä tapauksessa, jossa sinun täytyy palata ERDDAP™ v1.82.
         
    * TEHTÄVÄ: Suositeltu Java on nyt hyväksyäOpenJDK:n OpenJDK 8 (LTS) + HotSpot.
Tämä on avoimen lähdekoodin variantti Java jolla ei ole rajoituksia sen käytölle (toisin Oracle S Java jakelu) . Se on peräisin Oracle S Java jatkuvalla tavalla, Oracle Se on siunaus. Turvallisuussyistä on tärkeää pitää Java versio ajan tasalla. Katso ERDDAP S [ Java asennusohjeet](/docs/server-admin/deploy-install#java) .
         
    * TEHDÄ: hyväksyä OpenJDK:n Java tarvitsee pienen lisäyksen Tomcat-asennukseesi: katso [Resurssivälimuistin ohjeet](/docs/server-admin/deploy-install#contentxml) . Mielestäni tämä on korvaaja -XX: MaxPermSize asetus, joka (Hyväksy) OpenJDK ei enää tue.
         
    * TODO: Uusi oletus ja suositus&lt;fontFamily&gt; asetus setup.xml on
DejaVu Sans, jotka on rakennettu AdoptOpenJDK:n Java . Katso
         [tarkistetut kirjasimen asennusohjeet](/docs/server-admin/deploy-install#fonts) .
         
    * TO: Monet tagit ovat siirtymässä setup.xml datasets.xml . Etuna on, että voit muuttaa niiden arvoja kun taas ERDDAP™ on käynnissä, ilman uudelleenkäynnistystä ERDDAP . Voit helposti muuttua.&lt;KäynnistäBodyHtml5&gt; näyttää väliaikainen viesti ERDDAP™ kotisivu (esim. "Tarkista uusi JPL MUR SST v4.1 tietokokonaisuus" tai "This ERDDAP™ on offline huolto 2019-05-08T17:00:00 PDT kautta 2019-05-08T20:00:00 PDT.") . Jos/kun vaihdat nämä tunnisteet datasets.xml , muutokset tulevat voimaan seuraavalla kerralla ERDDAP™ lukee datasets.xml .
         
        
        1. Kopioi tämä sisältö omaan datasets.xml tiedosto (missä tahansa tiedoston alussa, sen jälkeen&lt;ErddapDatasetit&gt;:
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

        2. Yksi kerrallaan, kopioi arvo (jos) jokaiselle näistä tageista setup.xml tiedoston uuteen tagiin, jonka juuri liitit (yllä) in datasets.xml . Esimerkiksi jos olisit käyttänyt arvoa 30&lt;välimuistiMinuutit&gt; in setup.xml, sinun pitäisi kopioida tämä arvo uuteen&lt;välimuistit&gt; tag in datasets.xml   (vaikka arvo on sama kuin uusi oletusarvo, se on parasta vain jättää tag datasets.xml tyhjä) .
            
Jos arvosi on erilainen kuin uusi ehdotettu oletus (muu kuin&lt;KäynnistäBodyHtml5&gt; ja&lt;ShortDescriptionHtml&gt;, jotka ovat hyödyllisiä muokata ERDDAP™ asennus), harkitse siirtymistä uusiin oletusarvoihin. Tämä koskee erityisesti&lt;osittainen pyyntöMaxBytes&gt; ja&lt;OsittainenPyyntiMaxCells&gt;, jossa oletusarvo / ehdotettu arvo on muuttunut merkittävästi vuosien mittaan.
            
Kun olet kopioinut jokaisen arvon, poista tagi ja sen kuvaus setup.xml. On parempi saada nämä tunnisteet datasets.xml . Ja nyt on parempia kuvauksia [setupDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file) .
            
        
Outo uuden järjestelmän on, että ensimmäinen web-sivu, kun aloitat ERDDAP on oletus ERDDAP™ Verkkosivu. Jokainen seuraava verkkosivu käyttää ...Html sisältöä määrittelet datasets.xml .
        
    * VAROITUS: Ensimmäinen kerta kun juokset ERDDAP™ v2.0, paikallisiin tiedostoihin perustuvat tiedot ladataan **hyvin** hitaasti koska ERDDAP™ on luotava tiedostotietokantansa uudelleen hieman eri muodossa. Kun hidas alkuperäinen lataus, ne latautuvat nopeasti, kuten ennenkin. Ole kärsivällinen.
         
#### EDDTableFromHttpGet{#eddtablefromhttpget} 
    *    [BIG UUTTA: EDDTableFromHttpGet](#eddtablefromhttpget)   
Tähän asti ERDDAP™ vain lukea tietoja ja antaa ne käyttäjien käyttöön. Nyt. ERDDAP™ Siinä on yksinkertainen ja tehokas järjestelmä reaaliaikaisen tiedon syömiseksi sensoreista. Muun muassa tämä aineisto tarjoaa hienosti muotoiltua versiota: se muistaa jokaisen aineistoon tehdyn muutoksen, kun se on tehty, ja kenen toimesta. Yleensä käyttäjät haluavat vain tiedoston uusimman version, jossa on kaikki muutokset. Käyttäjillä on kuitenkin mahdollisuus pyytää tietoja aineistosta kuten milloin tahansa. Tämä helpottaa toistettavissa olevaa tiedettä. Toisin kuin useimmat muut lähes reaaliaikaiset tietoaineistot, nämä tiedot ovat tukikelpoisia [ DOI tilu](https://en.wikipedia.org/wiki/Digital_object_identifier) . Koska he tapaavat DOI vaatimus siitä, että tietokokonaisuus on muuttumaton, paitsi yhdistämällä. Katso [EDDTableFromHttpGet](/docs/server-admin/datasets#eddtablefromhttpget) . Kiitos OOI:n (Kauan sitten ja nyt) Tästä ja Eugene Burgerista puhuminen on tärkeää.
         
    * Suuri uusi ominaisuus: ERDDAP™ voi nyt palvella tietoja suoraan ulkoisesti pakatuista tiedostoista, mukaan lukien .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 , tai .Z. Datasetteihin voi sisältyä yhdistelmä ulkoisesti pakattuja tiedostoja (Ehkä vanhemmat tiedostot?) ja ei-ulkoisesti pakattuja tiedostoja, ja voit pakata / purkaa tiedoston milloin tahansa.
        
Tämä toimii hienosti&#33;
Useimmissa tapauksissa tiedostojen purkamiseen liittyvä hidastuminen on vähäistä. Kannustamme sinua kokeilemaan tätä, erityisesti tiedostojen ja/tai tiedostojen osalta, joita käytetään harvoin.
        
Tämä voi säästää 30000 dollaria tai enemmän&#33;
Tämä on yksi harvoista ERDDAP™ ominaisuudet, jotka voivat säästää paljon rahaa -- jos pakata paljon tiedostoja, tarvitset paljon vähemmän RAID/kova asemat tallentaa tiedot, tai päinvastoin, voit palvella paljon enemmän tietoa (enintään 10x) -Ei. Jos tämä ominaisuus säästää sinua ostamasta toisen RAID, niin se on säästänyt noin 30000 dollaria.
        
Katso [Ulkoisesti pakattujen tiedostojen dokumentointi](/docs/server-admin/datasets#externally-compressed-files) . Benoit Perrimondin ja Paloma de la Valleen ansiosta.
        
    * Suuri uusi ominaisuus: Kaikki EDDGrid From Files and all EDDtableF from Files datasies support a&lt;cacheFromUrl &gt; tag ja a&lt;välimuistiSizeGB&gt; tag. Jos välimuistia ei ole määritelty, tämä lataa ja ylläpitää täydellisen kopion etätiedostoista. Jos välimuistiSizeGB on määritelty ja on &gt;0, tämä lataa tiedostoja etätiedostosta tarpeen mukaan paikalliseen välimuistiin, jonka koko on rajoitettu, mikä on hyödyllistä, kun työskennellään pilvipohjaisen (esim. S3) datatiedostot. Katso [välimuisti EURL-asiakirjat](/docs/server-admin/datasets#cachefromurl) yksityiskohtaisesti. Kiitos Bob Simonsin ja Roy Mendelssohnin. (joka on vuosien ajan kirjoittanut käsikirjoituksia, joiden avulla tehdään paikallisia kopioita etätiedostoista) Lloyd Cotten, Eugene Burger, Conor Delaney (kun hän oli Amazon Web Services) Ja Google Cloud Platform.
         
    * UUTTA: JsonlCSV:n uusi EDDtable luokka voi lukea taulukon tiedot alkaen
         [JSON Rivit CSV-tiedostot](https://jsonlines.org/examples/)   ("Parempi kuin CSV") . Kiitos Irlannin Marine Instituten ihmisille siitä, että he kertoivat minulle tästä muodosta sekä Eugene Burgerille ja PMELille pyynnöstä tukea sitä panostyyppinä.
         
    * UUTTA: Kaikki EDDGrid ja kaikki EDDtableFromFiles tietoaineistot tukevat&lt;nSäikeet&gt; asetus, joka kertoo ERDDAP™ kuinka monta lankaa käytetään vastauksena pyyntöön. Katso [nSäikeen dokumentointi](/docs/server-admin/datasets#nthreads) yksityiskohtaisesti. Kiitos Rob Bochenek Axiom Data Science, Eugene Burger, Conor Delaney (kun hän oli Amazon Web Services) ja Google Cloud Platform.
         
    * Uusi standardisoi Mitä varten kaikki EDDtableF alkaen kansiot alaluokkia -
Aiemmin, jos tietty muuttuja, arvot tärkeitä ominaisuuksia (esim. scale\\_factor , add\\_offset , missing\\_value , \\_ FillValue, yksiköt) eivät olleet johdonmukaisia, DDDtableFromFromFles valitsisi yhden arvon kunkin ominaisuuden olla "valid" ja merkitä tiedostoja muiden määritteiden arvot "Bad Files." Nyt on olemassa järjestelmä standardoida tiedostot heti kun EDDtableF fromFiles lukee tiedostoja. Katso [EDDtableFromFile's standardize Mitä?](/docs/server-admin/datasets#standardizewhat) . Yksi ERDDAP "Tavoitteena on saada datatiedostot ja -aineistot yhdenmukaisiksi. standardoi Mikä on tärkeä uusi väline sen toteuttamiseksi? Kiitos Marco Alba, Margaret O'Brien (ja muut EML-käyttäjät) , BCO-DMO, ja InPort käyttäjät.
         
    * UUSI EDDTableFromInvalid CRAFIles avulla voit tehdä aineiston kokoelma NetCDF   (v3 tai v4)   .nc tiedostot, joissa käytetään erityistä, virheellinen, muunnelma CF DSG Contigative Ragged Array (CRA) tiedostot. Tämän tiedostotyypin näytetiedostot löytyvät osoitteesta https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/   \\[ 2020-10-21 Tämä palvelin ei ole nyt luotettavasti saatavilla \\] . Vaikka ERDDAP™ tukee tätä tiedostotyyppiä, se on virheellinen tiedostotyyppi, jota kenenkään ei pitäisi aloittaa. Ryhmiä, jotka käyttävät tätä tiedostotyyppiä, kannustetaan voimakkaasti käyttämään ERDDAP™ luoda kelvollisia CF DSG CRA -tiedostoja ja lopettaa näiden tiedostojen käytön. Ajay Krishnanin ja Tim Boyerin ansiosta.
         
    * EDDTableFrom Threeredds Files and EDDTableFrom Hyrax Tiedostot on nyt poistettu. Vaihda EDDTableFromNcFilesiin (tai variantti) +&lt;cacheFromUrl&gt;. Jos se ei jostain syystä toimi, sähköpostia erd.data at noaa.gov . Jos valituksia ei tehdä ennen vuotta 2020, nämä tietotyypit voidaan poistaa.
         
    * PARANTAA... Järjestelmä muuntaa automaattisesti non-ISO 8601 kertaa ISO 8601 kertaa (V1.82) on huomattavasti laajennettu käsittelemään useita muita formaatteja. Tämä vaikuttaa GenerateDatasetsXml ja ERDDAP Lähdemetadatan käsittely.
         
    * PARANTAA... Kolmas merkittävä tarkistus String aika jäsentäminen järjestelmä (ja toivottavasti viimeinen) , ERDDAP™ ei enää käyttöä Java 's DateTimeFormatter koska vikoja, jotka joskus vaikuttavat äärimmäisiä aikoja (vuotta&lt;= 0000). ERDDAP™ nyt käyttää omaa järjestelmää jäsentämään aikajonoja.
         
    * VAROITUS: Uusi String ajan jäsennysjärjestelmä on hieman tiukempi. Jos jokin tietoaineistoistasi yhtäkkiä puuttuu vain aika-arvojen arvoja, syy on lähes varmasti se, että aikamuoto on hieman väärä. Lokissa pitäisi olla virheviestejä. txt liittyvät aika-arvot, jotka eivät vastaa aikamuotoa - jonka pitäisi auttaa sinua korjaamaan aikamuoto merkkijono että tietokokonaisuus. Jos tarvitset apua, käytä vaihtoehtoa ERDDAP 's Time Converter joka "Convert \\[ tilu \\] mikä tahansa yhteinen merkkijono aika osaksi ISO 8601 merkkijono aika" -- se osoittaa muodossa, että muunnin käytetään jäsentämään lähde merkkijono.
         
    * SUOSITUS: nopein, helpoin ja halvin tapa nopeuttaa ERDDAP 's pääsy taulukon tietoja on laittaa tiedostot Solid State Drive (SSD) . Useimmat taulukkotiedostot ovat suhteellisen pieniä, joten 1 tai 2 TB SSD on luultavasti riittävä pitämään kaikki tiedostot kaikki taulukkotiedostot. SSD:n käyttö loppuu, jos kirjoitat tietoja soluun, poistat ne ja kirjoitat uusia tietoja soluun liian monta kertaa. Sen sijaan suosittelen, että (mahdollisimman paljon) Voit vain käyttää SSD kirjoittaa tiedot kerran ja lukea sen monta kertaa. Sitten jopa kuluttajien SSD pitäisi kestää hyvin kauan, luultavasti paljon kauemmin kuin mikään Hard Disk Drive (HDD) . Kuluttajien SSD ovat nyt halpoja (vuonna 2018, ~200 dollaria 1 TB tai ~400 dollaria 2 TB) hinnat laskevat edelleen nopeasti. Milloin ERDDAP™ käyttää tiedostoa, SSD tarjoaa molemmat
        
        * lyhyempi viive (~0,1m, vs ~3m kiintolevylle, vs ~10 (?) Ms RAID, vs ~55ms Amazon S3) ja
        * Korkeampi suoritus (~500 MB/S, ~75 MB/s kiintolevylle ja ~500 MB/s RAIDille) .
        
Joten voit päästä jopa ~10X suorituskykyä boost (vs kiintolevy) 200 dollarista&#33; Verrattuna useimpiin muihin järjestelmän muutoksiin (Uusi palvelin 10 000 dollarilla? Uusi RAID 35 000 dollarilla? Uusi verkkokytkin 5 000 dollarilla? jne.) , tämä on ylivoimaisesti paras tuotto investointien (ROI) . Jos palvelin ei ole ladattu muistia, ylimääräinen muisti palvelimellesi on myös suuri ja suhteellisen edullinen tapa nopeuttaa kaikkia näkökohtia ERDDAP .
         \\[ SSD:t sopisivat myös ruudukkodataan, mutta useimmat ruudukot ovat paljon suurempia, mikä tekee SSD:stä erittäin kalliin. \\]   
         
    * UUTTA: Jokainen sisäänkirjautunut saa roolin \\[ Kaikki kirjautuneet Sisään \\] , vaikka ei ole&lt;käyttäjä&gt; tunniste heille datasets.xml . Jos asetat tietokokonaisuuden&lt;saatavilla \\[ Kaikki kirjautuneet Sisään \\] , sitten jokainen, joka on kirjautunut sisään ERDDAP™   (esim. Gmail- tai Orcid-tilin kautta) on valtuudet käyttää tiedostoa, vaikka et ole määritellyt&lt;käyttäjä&gt; tunniste heille datasets.xml . Maurice Libesin ansiosta.
         
    * PARANTAA: UDUNITS /UCUM-yksiköiden muunninta parannettiin huomattavasti.
Se käsittelee virheellinen yksiköiden merkkijonot paremmin (Aloitetaan korostamalla tietojen säilyttämistä sen sijaan, että sovellettaisiin pätevyyttä) . Myös tulokset ovat nyt standardoitu syntaksi.
         
    * UUTTA: UDUNITS /UCUM-yksiköt muunnin on uusi vaihtoehto standardoida UDUNITS Naru.
Tämä toimii hyvin UDUNITS jouset ja kohtuullisen hyvin epätavanomaisen / virheellinen UDUNITS Naruja. Esimerkiksi UDUNITS = "metriä sekunnissa," "metriä sekunnissa," "m.s^-1" ja "m s-1" Kaikki palaavat "M.s.-1." Tämä oli tarpeen uuden standardin Mitä järjestelmää edellä kuvataan. Kiitos Marco Alba, Margaret O'Brien (ja muut EML-käyttäjät) , BCO-DMO, ja InPort käyttäjät.
         
    * UUTTA: EDDTableFromMultidimNcFiles on nyt [HoitoMittauksetAina](/docs/server-admin/datasets#treatdimensionsas) vaihtoehto, joka kertoo ERDDAP™ tiettyjen mittojen hoito (esim. LAT ja LON) Kuin ne olisivat muita ulottuvuuksia (esim.) . Tämä on hyödyllistä joissakin virheellisissä tiedostoissa, jotka käyttävät eri mittoja eri muuttujille, kun niiden olisi pitänyt käyttää vain yhtä ulottuvuutta (esim.) . Kiitos Marco Alballe ja Maurice Libesille.
         
    * Nyt kaikki EDDGrid Files-aineistot tukevat uutta erityistä akselia sourceName joka kertoo ERDDAP™ poimia tietoja tiedostostaName (vain tiedostonimi.ext) ja käyttää arvoa **korvataan** olemassa oleva vasemman akselin arvo. Muoto on
        \\*\\*\\* korvataanFromFileName,_dataType_,_extractRegex_,_captureGroupNumber_
Katso [nämä asiakirjat](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) . Kiitos NOAA Pathfinder Daily aggregaatin tietokokonaisuus.
         
    * Nyt kaikki EDDGrid Files-aineistot tukevat uutta erityistä akselia sourceName joka kertoo ERDDAP™ poimia tiedot tiedoston polkuName (kansiot + tiedostonimi.ext)   
        \\*\\*\\*pathName,_dataType_,_extractRegex_,_captureGroupNumber_
Tätä varten polun nimi käyttää aina '/' hakemiston erotinmerkkinä, älä koskaan '\\'.
Katso [nämä asiakirjat](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) . Kiitos Paloma de la Valleen.
         
    * Nyt kaikki DDDtable... Tiedostot tukevat lisäpseudomuuttujaa sourceName s joka poimii tiedot tiedoston tiedostostaName (vain tiedostonimi.ext)   (Katso [\\*\\*\\* tiedostoName](/docs/server-admin/datasets#filename-sourcenames) ) tai tiedoston täydestä polustaName (/dir1/dir2/filename.ext)   (Katso [\\*\\*\\*pathName](/docs/server-admin/datasets#pathname-sourcenames) ) . Kiitos Paloma de la Valleen.
         
    * UUTTA: jos EDDGrid tietoaineistolla on yksi tai useampi erittäin suuri ulottuvuus (esim. miljoonia arvoja) jotka vievät paljon muistia, voit asettaa uuden [&lt;dimensionValuesInMemory&gt;] (/docs/server-admin/datasets#mittojen arvomuistissa) Aseta vääräksi (oletus on totta) , joka aiheuttaa aineiston tallentaa arvot levylle ja hakea ne tarvittaessa. Kiitos David Rodriguezin ja Rich Signellin. (re: EDDGrid FromAudioFiles) .
         
    * Aiemmin tapahtunutta: dataVariable EDDTableF-tiedostosta ja tiedoston latauksesta EDDTableF fromFiles lukisi kaikki tiedostot uudelleen. Se voi hoitaa uudelleenjärjestämisen lukematta kaikkia tiedostoja. Kiitos Roland Schweitzerin.
         
    * Nyt, kun ERDDAP™ lukee ASCII, NCCSV, ja JSON Lines CSV taulukkotiedostot, jos se löytää virheen tietyllä rivillä (Esim. tavaroiden virheellinen määrä) , se kirjaa varoitusviestin ("Varoitus: ohitusviiva #" "odottamaton määrä esineitä...") ja [log.txt-tiedosto](/docs/server-admin/additional-information#log) ja sitten jatkaa lukemista loput tiedoston. Siksi sinun vastuullasi on tarkastella säännöllisesti (tai kirjoittaa käsikirjoituksen tehdä niin) Tuosta viestistä lokissa. txt, jotta voit korjata tiedostojen ongelmat. ERDDAP™ on perustettu siten, että käyttäjät voivat edelleen lukea kaikki saatavilla olevat kelvolliset tiedot, vaikka joissakin tiedoston viivoissa on puutteita. Aiemmin tapahtunutta: ERDDAP™ Merkitse tiedosto "huonoksi" ja poista se tiedostosta.
         
    * PARANTAA: kun tarkkoja aikoja (esim. lähimmän sekunnin tai millisekunnin) säilytetään lähteessä "minuutteina siitä lähtien ..." (tai suurempia yksiköitä) , ERDDAP™ Nyt pyöristää ne lähimpään millisekunti kun lukee arvot ERDDAP . Muussa tapauksessa liukuluku on mustelmilla ja tietopyynnöt tiettyinä aikoina (esim., &time=2018-06-15T01:30:00) Epäonnistumme. Aiemmin se laski ne mahdollisimman tarkasti. (ja tekee edelleen, jos yksiköt ovat esimerkiksi, "sekuntia ..." tai "millisekuntia ...") . On parasta välttää tämä ongelma käyttämällä suuria yksiköitä (esim. minuuttia tai tuntia) tallentaa tarkat aika-arvot (esim. mikrosekuntia) - Tietokoneet eivät käsittele desimaalilukuja. Kiitos Marco Alban.
         
    * MUUTOKSET EDDtaulukkoon EDDGrid Mikä tekee siitä paljon paremman. EDDTableFrom EDDGrid antaa käyttäjien tiedustella ruudukoituja tietoaineistoja ikään kuin ne olisivat taulukkotiedostoja ('arvolla') .
        
        * Se tukee nyt&lt;MaxAxis0&gt; tag (oletus=10) joka määrittelee akselin enimmäismäärän \\[ 0 \\]   (yleensä "time" ) arvot, jotka voidaan kysyä heti. Tämä estää naiivit pyynnöt saada EDDTableF alkaen EDDGrid etsiä kokonaisen ruudukon läpi (joka epäonnistuisi aikakatkaisuvirheellä) .
        * Luo tiedostoja Xml on nyt mahdollisuus tuottaa EDDtableFrom EDDGrid Tiedostot kaikista ruudukoista ERDDAP™ jotka vastaavat määriteltyä regexiä (käyttää .\\* vastaamaan kaikkia tietoaineistoja) . Sen luomissa aineistoissa on yhteenvedon attribuutissa lisätietoja, jotka osoittavat, että kyseessä on taulukkoversio ruudutetusta aineistosta. Ja heidän datasetID on datasetID ruudukossa olevan aineiston lisäksi "\\_Asatable."
        * Tavallisimmille järjestelmille on suuri vauhti: kun ruudukko on EDDGrid FromErddap aineisto, joka on samassa ERDDAP .
        
James Gallagherin ja Ed Armstrongin ansiosta.
         
    * UUTTA: tuottaa Dataset Xml kaikentyyppisille aineistoille on nyt paljon todennäköisempää lisätä \\_ FillValue tai missing\\_value attribuutti numeromuuttujan addAttributes . Esimerkiksi näin tapahtuu, kun merkkijono puuttuu arvo markkereita (esim. "," "," "," "NA," "nd," "Nan") näytetiedostossa oleva muuttuja muunnetaan ERDDAP 's natiivi puuttuvat arvot (127 tavusarakkeissa, 32767 lyhyissä sarakkeissa, 2147483647 int sarakkeet 9223372036854775807 pitkissä sarakkeissa ja NaN kelluvissa ja kaksoismuuttujissa) . Se esiintyy myös NaN arvot kelluva ja kaksinkertainen muuttujat. Lisäksi "nd" lisättiin yhteisten puuttuvien arvojen merkkiaineiden luetteloon numerotietosarakkeissa, jotka ERDDAP™ Pitäisi etsiä. Kiitos Matt Biddlen BCO-DMO:sta.
         
    * PARANTAA: ncdump-vaihtoehto tuottaa Dataset Xml on nyt enemmän kuin ncdump (mutta silti käyttää netcdf-jaava versio ncdump) . Nyt se tulostaa uuden listan vaihtoehdoista. Nyt .nc ml tiedostoja, se tulostaa ncdump tulostus tuloksen .nc ml tiedostomuutokset kohde-etuutena .nc tai .hdf Tiedosto.
         
    * BUG FIX: Siellä oli tiedoston kahvan vuoto (aiheuttaa ERDDAP™ jäädyttää) aiheuttaa luotaessa tietyntyyppisiä tulostustiedostoja, esim., .geotif, erityisesti kun virheitä tapahtui luomisen aikana. Toivottavasti kaikki on nyt kunnossa. Jos näet yhä ongelmia, kerro minulle tietokokonaisuuden tyyppi (ruudukko tai taulukko) ja tiedoston tyyppi, joka aiheuttaa ongelman. Steven Beale, Lynn DeWitt, Jibei Zhao ja muut.
         
    * BUG FIX: • WMS   Leaflet demo ei täysin/asianmukaisesti muuntanut "syvä" akselia "korkeus." Nyt on, ja särkyneet legendapyynnöt on korjattu. Myös kaikki pudotuslistan akselivalinnat ovat aina nousevassa järjestyksessä. Kiitos Antoine Quericin ja Aurelie Briandin.
         
    * BUG FIX: EDDTableFromFiles tukee nyt oikein rajoitteita String muuttujat, jotka on luotu char muuttujat tiedostot. Kiitos Antoine Quericin ja Aurelie Briandin.
         
    * BUG FIX: Kun tietoaineisto ei ole saatavilla, tietokokonaisuus yrittää ilmoittaa (ja viestillä "Tämä tietokokonaisuus ei ole tällä hetkellä saatavilla.") Sen tilaajat, listattu toimia, rss, ja lonPM180 aineistoja, jotka luottavat siihen. Kiitos Roy Mendelssohnin ja Bob Simonsin.
         
    * BUG FIX: Kaksi ötökkää liittyvät EDDTableCopy. Kiitos Sam McClatchien.
         
    * PARANTAA: Epäonnistuneiden pyyntöjen määrä näkyy status.html sivu kasvaa, koska enemmän asioita lasketaan epäonnistumisia kuin aiemmin.
         
    * PARANTAA: ERDDAP 's status.html nyt näyttää "Requests (mediaaniajat ms) " aikasarjassa. Aiemmin, se näytti mediaani kertaa kutistunut kokonaisluku sekuntia.
         
    * IMPROVED: Jsonld-tuotoksessa jsonld-nimi tulee nyt tietokokonaisuuden "title" in ERDDAP , ja Jsonld "headline" on nyt peräisin tietokokonaisuuden " datasetID " ERDDAP . Aiemmin tapahtunutta: Tämä tuntuu minusta väärältä, koska normaalissa englanninkielisessä käytössä "nimi" on yleensä lyhyt, (ihannetapauksessa) yksilöllinen tunniste, joka harvoin/ei koskaan muutu (esim. Robert Middlename Simons) , ei kuvaus, joka ei ole ainutlaatuinen ja joka voi helposti ja usein muuttua (Esimerkiksi: NOAA "vs. "Pitkä kaveri, joka kirjoittaa ohjelmistoja NOAA ") . Olisi hienoa, jos schema.org määritelmä [Nimi](https://schema.org/name) , yhteydessä Dataset, olivat tarkempia. Ohjelmistokehittäjien olisi kyettävä kirjoittamaan pelkästään eritelmään perustuva eritelmä ilman asiantuntijoiden ohjeita. Mutta lykkään Google (erityisesti Natasha Ei) , NCEI (erityisesti John Relph) Ja Rob Fullerin.
         
    * IMPROVED: Jsonld lähtö, neljä "spatialCoverage GeoShape box" arvot ovat nyt minLat minLon maxLat maxLon. Aiemmin lat ja lon asemat muuttuivat. Olisi hienoa, jos schema.org määritelmä [GeoShape](https://schema.org/GeoShape) Määrittele oikea järjestys. Ohjelmistokehittäjien olisi kyettävä kirjoittamaan pelkästään eritelmään perustuva eritelmä ilman asiantuntijoiden ohjeita. Kiitos Natasha Noyn ja Rob Fullerin.

## Versio 1.82{#version-182} 
 (julkaistu 2018-01-26) 

*    **Uudet ominaisuudet (käyttäjille) :**   
     
    * Lukuisat hienovaraiset muutokset ulkonäkö ja tunne ERDDAP™ verkkosivut.
        * PARANTAA: ERDDAP™ nyt käyttää HTML 5 ja hyödyntää paremmin CSS.
        * PARANTAA: Verkkosivuja on hieman muutettu, jotta ne olisivat puhtaampia ja vähemmän "kiireisiä." (Ne ovat yhä tiheitä ja on vielä asioita, joista voisi valittaa, mutta toivottavasti paljon vähemmän kuin ennen.) Kiitos John Kerfoot joitakin kommentteja.
        * PARANTAA: Verkkosivut näyttävät nyt paljon paremmalta matkapuhelimissa ja muissa pienissä laitteissa, erityisesti jos käytät niitä maisemasuuntautuneisuudessa. Ne näyttävät myös paremmalta hyvin pienissä ja erittäin suurissa selaimissa.
        * PARANTAA: Turvallisuuden ja muiden syiden parantamiseksi käytetään vanhentunutta Openlayers-versiota WMS esittelysivut on korvattu Leaflet .
        * UUTTA: tuki kuva-, ääni- ja videotiedostojen esikatseluille "files" järjestelmä (esimerkiksi [Tämä testiaineisto](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/) ) ja .htmlTable vastaukset, kun solulla on kuvan, äänen tai videon URL (esimerkiksi [pyyntö](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22) ) . Jos leijailet yli '?" kuvaketta, sinun pitäisi nähdä kuva, ääni tai videotiedoston esikatselu. Voit myös napsauttaa tiedostolinkkiä nähdäksesi tiedoston koko näytön selaimessasi. Katso [Mediatiedostojen dokumentointi](/docs/server-admin/datasets#media-files) . Huomaa, että eri selaimet tukevat eri tiedostotyyppejä, joten esimerkit eivät välttämättä toimi selaimessasi.
Kiitos näiden ihmisten / linkkien ideoita ja näytekoodi CSS-vain kuva työkaluvihjeitä (oli https://codepen.io/electricalbah/pen/eJRLVd ) ja lykätty kuvan lataus (oli https://varvy.com/pagespeed/defer-images.html )   (Vaikka koodia muutettiin ennen käyttöä ERDDAP ) .
Kiitos Cara Wilsonille, Matthew Austinille ja Adam Shepherd/BCO-DMO:lle kuvien tukipyynnöistä.
Kiitos Jim Potemra, Rich Signell, OOI, ja Carrie Wall Bell pyytää audio / hydrophone tiedostotukea.
Kiitos OOI osoittaa tarvetta videotuen.
        * UUTTA: Osajoukko tietoja mistä tahansa ERDDAP™ Tietokokonaisuus (mutta yleensä aineisto äänitiedostoja) voidaan nyt tallentaa .wav äänitiedosto. ( [asiakirjat](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav) ) Kiitos Jim Potemra, Rich Signell, OOI, ja Carrie Wall Bell pyytää audio / hydrophone tiedostotukea.
        * PARANTAA: muoto Web Accessible kansiot (WAF)   (Esim. tiedostot/ kansiot) on päivitetty käyttämään HTML- taulukkoa. Uusi muoto jäljittelee uudempaa versiota hakemiston listaus web-sivuja luotu uudempia versioita Apache. Ihmiset huomaavat, että muutokset helpottavat tietojen lukemista. Ohjelmisto, joka jäsentää nämä asiakirjat (esim. ohjelmisto, joka kerää ISO 19115 asiakirjoja ERDDAP ) on tarkistettava, mutta uusi muoto on helpompi jäsentää kuin edellinen muoto. (Huomio, Anna Milan.) 
        * UUSI outOfDateDatasets.html sivu. ( [esimerkki](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) ) Tällä sivulla on taulukko, jossa on kaikki lähes reaaliaikaiset tiedot, joilla on&lt; testOutOfDate &gt; tag (ks. jäljempänä) , rankattu sen mukaan, kuinka vanhentunut tiedot ovat. Tämä kojelauta pitäisi olla hyödyllinen ERDDAP™ hallinnoijat ja loppukäyttäjät, kun he haluavat tietää, mitkä aineistot ovat vanhentuneita. Vanhojen tietoaineistojen osalta tietolähteessä on oletettavasti ongelma, joten ERDDAP™ ei pysty näkemään/saamaan tietoja tuoreimmista aikapisteistä.
Hallinnoijat: Jos et halua Out-Of-Date Datasets-sivun, lisää tämä setup.xml:
            &lt;outDateDatasetsActive&gt;false&lt;/outDateDatasetsActive&gt;
Nyt on. testOutOfDate ja ulos OfDate-sarakkeet allDatasets tietokokonaisuus.
Kiitos Bob Simonsille, joka on halunnut tätä jo vuosia, ja Irlannin Marine Instituten fiksuille ihmisille, jotka antoivat minulle inspiraation omistautuneen Vadelma Pi:n kautta ja monitorin, joka aina näyttää tällaisen näytön toimistossaan.
        * PARANTAA: .htmlTable sekä .xhtml vastaus on nyt paremmin muotoiltu, kompaktimpi, ja siten ladata nopeammin. Kiitos HTML5 ja CSS.
    * UUSI tulostetiedostotyyppi ruudukkotiedostoille: .timeGaps. Siinä on luettelo aika-arvojen aukoista, jotka ovat suurempia kuin mediaaniväli. ( [esimerkki](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps) ) Tämä on hyödyllistä ERDDAP™ ylläpitäjät ja loppukäyttäjät, kun he haluavat tietää, onko aineistossa odottamattomia aukkoja aika-arvoissa, joiden odotetaan olevan säännöllisesti porrastettuja. Kiitos Bob Simonsin ja Roy Mendelssohnin, jotka tarvitsivat tätä ominaisuutta.
    * IMPROVED: Oletuskaavio allDatasets Tiedosto on nyt kartta x=maxLon ja y=maxLat. John Kerfootin, Rich Signellin ja OOI-CI:n ansiosta.
    * UUTTA: [erddapy](https://github.com/ioos/erddapy) -- ei ole ERDDAP™ ominaisuus, mutta kiinnostaa monia ERDDAP™ käyttäjät. Erddapy ( ERDDAP™ + Python ) a Python Kirjasto luotu Filipe Fernandes, joka "käyttää hyväkseen ERDDAP S RESTful verkkopalvelut ja luo ERDDAP™ URL-osoite mistä tahansa pyynnöstä, kuten tietojen etsimisestä, metatiedon hankkimisesta, tietojen lataamisesta jne." Kiitos Filipe Fernandesin.
    * Olisi pitänyt mainita aiemmin: On olemassa kolmannen osapuolen R-paketti, jonka tarkoituksena on helpottaa työskentelyä ERDDAP™ R:stä alkaen: [rerddap](https://github.com/ropensci/rerddap#rerddap) . Kiitos [rOpenSci](https://ropensci.org/) Ja Roy Mendelssohn.
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:**   
     
    * TOIMIA: Setup.xml, aivan alla&lt;adminInstitution&gt;, lisää a&lt;adminInstitutionUrl&gt; tag, joka määrittää laitoksen verkko- osoitteen (tai ryhmä) .
    * TO: Nämä 3 tags in setup.xml ei enää käytetä:
        &lt;Käynnistä HeadHtml&gt;&lt;startBodyHtml&gt; ja&lt;endBodyHtml&gt;. Ne korvataan
        &lt;KäynnistäHtml5&gt;,&lt;KäynnistäBodyHtml5&gt; ja&lt;endBodyHtml5&gt;, joilla on oletusarvoja määritelty viestit.xml (ja esitetään alla) .
        
Suosittelemme käyttämään oletusta&lt;KäynnistäHtml5&gt; ja&lt;endBodyHtml5&gt;
Suosittelemme: Jos teit muutoksia alkuperäiseen&lt;KäynnistäBodyHtml&gt; ja/tai haluat muokata ERDDAP™ Nyt, kopioi uusi&lt;StartBodyHtml5&gt; tag (alhaalta) osaksi setup.xml ja muokata sitä muokata ERDDAP™ Niin, että ERDDAP 's web-sivut heijastavat organisaation, ei NOAA   ERD . Vaihda "tuotu sinulle" organisaatioosi. (tilu) . Jos tarvitset apua, lähetä sähköpostia erd.data at noaa.gov . (Jos et halua muokata ERDDAP™ nyt, käytä oletus&lt;KäynnistysBodyHtml5&gt;)
        
Poista sitten 3 vanhat tagit setup.xml, joita ei enää käytetä.

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

On muitakin tapoja voit [muokkaa ERDDAP™ ](/docs/server-admin/deploy-install#customize) Joten ERDDAP web-sivut heijastavat organisaation sijasta NOAA   ERD .
        
    * TEHDÄÄN:&lt; EDDGrid ...Example&gt; tags (alkaa&lt; EDDGrid IdExample&gt;) ja&lt;EDDTable... Esimerkki &gt; tagit (alkaa&lt;EDDtableIdExample&gt;) asetukset.xml-tiedosto käytetään luomaan esimerkkejä ruudukko ja tabledap asiakirjat. html web-sivut ERDDAP .
        
Jos et muokannut näitä tageja, poista ne setup.xml-tiedostostasi. Nyt heillä kaikilla on oletusarvoja viestejä.xml, jotka viittaavat tietoihin Bob's ERDDAP™ klo https://coastwatch.pfeg.noaa.gov/erddap/index.html . Joten sinulla ei enää tarvitse olla tiettyjä tietoja ERDDAP . Jos haluat ohittaa oletukset, kopioi joitakin tai kaikki nämä tagit asetukset.xml ja muuttaa niiden arvoja.
Jos haluat esimerkkejä osoittaa oman ERDDAP™ , helpoin menetelmä on:
        
        1. Sisällytä nämä kaksi aineistoa ERDDAP™ lisäämällä tämän datasets.xml :
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Lisää tämä tagi setup.xml, mutta muuta URL ERDDAP S ( https ?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Jos et muokata näitä tageja, jätä ne sellaisenaan ja lisää nämä 2 uutta tagia asetukset.xml määrittää ERDDAP™ URL näiden tietokokonaisuuksien, mutta muuttaa URL sinun ERDDAP S ( https ?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * TEHDÄ: ERDDAP™ Nyt käyttää CSS-tiedostoa nimeltä erddap2.css. Jos olet tehnyt muutoksia \\[ tomcat \\] /webapps/erddap/images/erddap.css, harkitse tehdä samanlaisia muutoksia erddap2.css (samassa hakemistossa) .
    * UUTTA: ERDDAP 's web-sivuilla on nyt suuri määrä lähes näkymättömiä sisäisiä linkkejä (teksti on musta eikä alleviivattu) . Jos leijut yhden näistä linkeistä (yleensä otsikkojen ja kohtien ensimmäiset sanat) , kursorista tulee käsi. Jos klikkaat linkkiä, URL on sisäinen linkki siihen osaan asiakirjan. Näin on helppo viitata asiakirjoihin. Kiitos Bob Simonsin, joka on halunnut tätä jo vuosia.
    * UUTTA: ERDDAP™ nyt tukee [Byte Range / Accept-Ranges](https://en.wikipedia.org/wiki/Byte_serving) pyyntö osa / tiedostot / tiedostot. Tätä tarvittiin selainten ääni- ja videokatsojien tukemiseen.
    * Nyt parantaa turvallisuutta, jos olet määritellyt&lt;baseHtpsUrl&gt; in setup.xml (ja siten tukea https ) , suositeltu lippu Url on https URL on turvallisempi lippuavain. Jos näin on, jokin aiempi lippuUrls/lippuKeys mitätöidään. Hallinto: Jos nämä muutokset koskevat ERDDAP™ ja jos ERDDAP™ on EDDGrid Erddapista ja EDDTablesta FromErddap tilata etä ERDDAP s, kun olet päivittänyt ERDDAP , sinun ERDDAP™ yrittää automaattisesti tilata uuden lipunUrl, joten sinun pitäisi poistaa vanhat tilaukset ja validoida uudet tilaukset, kun saat uudet tilaus validointisähköpostit.
    * Jos ERDDAP™ on EDDGrid FromErddap aineistot erdVH3 tietokokonaisuuksia Bobin rannikkovartiosto ERDDAP™ , vaihda ne viitata uusiin erdVH2018 tietoaineistot.
    * TO: Jos lisäät jonkin jplAquariusSSS-näyteaineistoista ERDDAP™ , ole hyvä ja muuta "V4" datasetID V5:een.
    * TEHDÄ: actual\\_range on nyt CF standardi attribuutti (CF-1,7) ja selvästi sanoo, että jos muuttuja käyttää add\\_offset ja/tai scale\\_factor pack data-arvot, sitten actual\\_range Arvojen on käytettävä pakkaamattomien tietojen tyyppiä ja oltava pakkaamattomia. Valitettavasti tämä on ristiriidassa aiemman neuvomme kanssa. Luo tiedostoja Xml purkaa nyt pakkaukset actual\\_range arvot, mutta se ei korjaa olemassa olevia tiedostoja datasets.xml Tiedosto.
        
Tarkista tietoaineistosi: jos muuttujan arvot on pakattu ja jos actual\\_range on määritelty pakattujen tietojen arvot, lisää a&lt; addAttributes &gt; actual\\_range pakkaamattomien arvojen määrittely. Muussa tapauksessa aineisto ei lataudu ERDDAP . Yksinkertainen ja lähes täydellinen tapa tehdä tämä on tutkia datasets.xml lähde Ominaisuudet, joilla on
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
ja a scale\\_factor muut kuin 1.0. Nämä ovat actual\\_range Ominaisuudet, jotka sinun täytyy korjata.
        
Akselimuuttujat EDDGrid tietoaineistot, ERDDAP™ asettaa aina actual\\_range ominaisuus, joka on arvojen todellinen vaihteluväli, koska se tuntee nämä arvot.
        
Akselimuuttujille, joiden arvot alenevat (Esimerkiksi joitakin leveysastemuuttujia) , ERDDAP™ luotu actual\\_range ja \\[ 0 \\] ... \\[ viimeinen \\] arvot, jotka olivat korkeat... Matala. Nyt se käyttää aina alhaisia... korkeita arvoja tehdä uuden CF määritelmä.
        
Euroopan actual\\_range arvot ovat erityisen tärkeitä EDDtable-aineistoille, koska ERDDAP™ Hylätään nopeasti käyttäjien pyynnöt tietoarvoista, jotka ovat pienempiä kuin actual\\_range vähimmäisarvo tai jotka ovat suurempia kuin actual\\_range suurin arvo.
        
Liittyvät: todellinen\\_min, todellinen\\_max, data\\_min sekä data\\_max attribuutit on nyt poistettu. Muunna tiedostoja käyttää actual\\_range Sen sijaan.
        
    * TOIMIA (valinnainen, mutta suositeltava) : Jokaisesta lähes reaaliaikaisesta ja ennustetietokokonaisuudesta ERDDAP™ , lisätkää [&lt; testOutOfDate &gt;] (/docs/server-admin/datasets#testoutofdate) tunniste, jonka arvo on muodossa now- _nUnits_, esim. now- Kaksi päivää. Jos tietokokonaisuuden enimmäisaika on tätä arvoa vanhempi, tietokokonaisuus katsotaan vanhentuneeksi ja merkitään sellaisena [ outOfDateDatasets.html ](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) Verkkosivu. Tämä tarjoaa sinulle helpon tavan nähdä, jos jokin on vialla aineiston lähde.
    *    [UUTTA: Semanttinen merkintä Datasets kanssa json-ld (JSON Linkit) ](/docs/server-admin/additional-information#json-ld)   
         ERDDAP™ Nyt käyttää [json-ld (JSON Linkit) ](https://json-ld.org) tehdä tietoluettelo ja tietoaineistot osaksi [semanttinen verkko](https://en.wikipedia.org/wiki/Semantic_Web) , joka on Tim Berners-Lee idea tehdä web-sisällön koneellisesti luettava ja kone "ymmärrettävä." Hakukoneet ( [Erityisesti Google](https://developers.google.com/search/docs/data-types/datasets) ) ja muut semanttiset työkalut voivat käyttää tätä jäsenneltyä korotusta helpottaakseen löytämistä ja indeksointia. Json-ld strukturoitu merkintä näyttää näkymättömiä ihmisiä&lt;Käsikirjoitus&gt; koodi http://.../erddap/info/index.html verkkosivu (joka on semanttinen verkko [Data Catalog](https://schema.org/DataCatalog) ) ja kussakin http://.../erddap/info/_datasetID_/index.html verkkosivu (joka on semanttinen verkko [Dataset](https://schema.org/Dataset) ) . (Erityiskiitos Adam Leadbetterille ja Rob Fullerille Irlannin Marine Institutesta. ERDDAP .) 
    * UUTTA: On olemassa uusia tietoaineistotyyppejä, jotka voivat lukea tietoja äänitiedostoista:
         [ EDDGrid FromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles) , joka käsittelee audiodataa verkkodatana.
         [EDDTableFromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles) , joka kohtelee audiodataa taulukkotietona. Kiitos Jim Potemra, Rich Signell, OOI, ja Carrie Wall Bell pyytää audio / hydrophone tiedostotukea.
    * Muutokset luontiinDatasetteja Xml (ja siihen liittyvät muutokset) :
        * UUTTA: ERDDAP™ nyt on järjestelmä automaattisesti [päivittää vanhentuneita URL-osoittimia](/docs/server-admin/additional-information#out-of-date-urls) sekä generaattoridataseteissa Xml ja lastattaessa tietoaineistoja. Jos sinulla on ehdotuksia muista URL-osoitteista, jotka olisi otettava kiinni ja päivitettävä, tai jos tämä pitäisi mielestäsi muuttaa palveluksi (Kuten muuntajat) , lähetä sähköpostia erd.data at noaa.gov .
        * UUTTA: Nyt, jos luot datasettejä Xml näkee CF: n standard\\_name   (jonka pitäisi olla kaikki pienet) isolla merkillä, se lisää kaikki pienet versiot&lt; addAttributes &gt; Myös silloin, kun tietokokonaisuus kuormittaa, jos ERDDAP™ CF standard\\_name Suurella hahmolla, se hiljaa muuttaa sen standard\\_name . Kiitos Rich Signellin.
        * UUTTA: Nyt, jos luot datasettejä Xml näkee attribuutin aika, joka ei ole ISO 8601-muodossa, se lisää ISO 8601-muotoon&lt; addAttributes &gt; Jos ERDDAP™ ei tunnista muotoa, se jättää aika-arvon ennallaan. Jos näet muodossa, että ERDDAP™ ei tunnista ja korjata, lähetä sähköpostilla erd.data at noaa.gov .
        * PARANTAA: Matalan tason koodi EDDGrid From Thredds Catalog-valitsin generoiDataseteissa Xml on nyt riippuvainen Unidata netcdf-java luettelo ryömintäkoodi (Thredds. luetteloluokat) jotta se voi käsitellä kaikki THREDDS luettelot (jotka voivat olla yllättävän monimutkaisia) . Kiitos Roland Schweitzer ehdotti tätä muutosta ja kiitos Unidata Koodia varten.
        * UUTTA: Luo datasettejä Xml EDDGrid FromDap lisää nyt ", StartYear-EndYear" otsikon loppuun perustuu todellinen aika-akseli arvoja. EndYear="present" jos tietoja on saatavilla viimeisten 150 päivän aikana.
        * UUTTA: Luo datasettejä Xml EDDGrid FromDap lisää nyt ", \\[ Päätöslauselma \\] °" otsikkoon, jos tietokokonaisuus on tasaisesti välitetty ja sama latille ja ie
        * IMPROVED: Aikamuuntimella on nyt lisäominaisuuksia, erityisesti kyky muuntaa merkkijonoajat monissa erilaisissa yleisissä muodoissa ISO 8601 -langoiksi tai UDUnits-yhteensopivaksi numeroksi. Kaikki aiemmin tuetut ominaisuudet toimivat ennallaan.
        * BUG FIX: Generator Datasets Xml ja avainsanat muunnin nyt sisältävät "Maan tiede &gt; " alussa GCMD Science Keywords. Kun tietokokonaisuus on ladattu ERDDAP™ , ERDDAP™ nyt korjata kaikki GCMD avainsanoja avainsanoja attribuutti, jotka eivät aloita "Maantiede &gt; " tai jotka käyttävät mitään muuta kuin otsikko tapauksessa (jossa jokaisen sanan ensimmäinen kirjain aktivoidaan) .
        * PARANTAA: Ehdotettaessa&lt; destinationName &gt;s, generoiDatasetit Xml EDDTableFromAsciiFiles juuri käyttänyt häntäpää sourceName s '/'   (Jotkut olivat tiedostonimeä muistuttavia) . Nyt se käyttää koko sourceName (esim. "blahblahblah (m/s) ." Tämä muutos on hyväksi joillekin aineistoille eikä muille, mutta se on turvallisempaa käyttäytymistä. Maurice Libesin ansiosta.
        * BUG FIX: Generator Datasets Xml ja tietokokonaisuuden rakentajat varmistavat nyt, ettei kaksoisnimeä ole. Maurice Libesin ansiosta.
        * BUG FIX: Generator Datasets Xml EDDTableFromAsciiFiles ei kirjoittanut&lt;sarakeSeparaattori&gt; tuotokseen. Nyt on. Maurice Libesin ansiosta.
    * UUTTA: DasDds-työkalu tulostaa nyt aikavälitiedot (a [.timeGapsin tiedot](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) ) jos tietokokonaisuus on ruudutettu tietokokonaisuus.
    * UUTTA: Tarkennettu haku hyväksyy nyt "now_\\-nUnits_" aika-arvot. Kiitos Rich Signellin.
    * PARANTAA: Parantaakseen tietoturvaa, kun aineiston metadatassa tai tiedoissa oleva sähköpostiosoite on kirjoitettu html-sivulle, korvataan "@" sanalla " at ". Tämä saa vain sähköpostiosoitteita, jotka ovat koko metadatan tai datan arvo, ei sähköpostiosoitteita upotettu pidempiä arvoja.
    * PARANTAAkseen turvallisuutta, RSS yksityisten tietoaineistojen tiedot ovat nyt vain käyttäjien saatavilla (sekä RSS lukijat) jotka ovat kirjautuneet sisään ja joilla on lupa käyttää tätä aineistoa.
    * Kun data on ladattu, date\\_created , date\\_issued , date\\_modified , tai päivämäärä\\_metadata\\_muutetulla ominaisuudella on aika-arvo, joka ei ole ISO 8601 -muodossa, ERDDAP™ muuttaa sen ISO 8601 -muotoon. Jos ERDDAP™ ei tunnista muotoa, se jättää aika-arvon ennallaan. Jos näet muodossa, että ERDDAP™ ei tunnista ja korjata, lähetä sähköpostilla erd.data at noaa.gov .
    * PARANTAA: .ddd vastaa EDDGrid Tiedostojen pitäisi nyt olla huomattavasti nopeampia. Kiitos Rich Signellin.
    * Muutokset, jotka liittyvät ERDDAP 's luominen ISO 19115 asiakirjat:
        * BUG FIX: Luotaessa ISO 19115 -asiakirjoja dataVariable HTML-attribuuttia ei koodattu. Nyt he ovat. NGDC:n ISO 19115 validaattorin ansiosta.
        * BUG FIX: Luotaessa ISO 19115 -asiakirjoja date\\_created käytetään kuten on, niin usein oli väärä muoto. Nyt se on muunnettu ISO 8601 Z merkkijono. NGDC:n ISO 19115 validaattorin ansiosta.
        * BUG FIX: Luotaessa ISO 19115 -asiakirjoja ERDDAP™ nyt pidempään kirjoittaa päivämäärät vuonna = 0000 (Kuten klimatologiatietoaineistoissa) , koska ISO 19115 skeema ei salli päivämäärät vuonna = 0000. NGDC:n ISO 19115 validaattorin ansiosta.
    * UUTTA: Kuten ennen pyyntöä http .../eddap/versio palaa vain versionumero (tekstiksi) , esim.," ERDDAP \\_version=1.82."
Nyt pyyntö http .../erddap/version\\_string palauttaa numeron ja valinnaisen loppuliitteen "\\_" sekä ASCII tekstin (ei välilyöntejä tai ohjausmerkkejä) , esim.," ERDDAP \\_version\\_string=1.82\\_JohnsFork." Ihmiset tekevät haarukka määrittää tämän muuttamalla ED Staattinen.erddapVersion. Tämä tapa tehdä se ei aiheuta ongelmia aiempien versioiden ERDDAP . Kiitos Axiomin. (Erityisesti Kyle Wilcox) ja Irlannin Marine Institute (erityisesti Rob Fuller) .
    * BUG FIX: Wms-versiolle=1.3.0, pyyntö= GetMap , crs=EPSG:4326 (ei TPJ:84) Pyynnöt: Bbox tilauksen on oltava minLat,minLon,maxLat,maxLon. CRS:84:n pyyntöjen, kuten aiemminkin, bbox-tilauksen on oltava minLon,minLat,maxLon,maxLat. Tämä voi korjata käyttämällä ERDDAP S WMS 1.3.0 palvelu ArcGIS   (Paola Arcen ansiosta) . Kiitos. (ei) - OGC Teit tästä niin monimutkaista. Kiitos Leaflet -En tiedä.
    * PARANTAA: Edellinen, ehdotettu linkki RSS ja sähköpostitilaukset on http URL-osoite ERDDAP . Nyt se on https URL, jos se on aktiivinen.
    * UUTTA: EDDGrid Kopioi nyt tukee valinnaista tunnistetta&lt;vain &gt;_someValue_&lt;/vainKoska&gt;, jos arvo on tietty ISO-8601-muotoinen aika tai now- nUnits (esim. now- 2 vuotta) Aika. Katso [Ainoastaan Asiakirja-aineistosta alkaen](/docs/server-admin/datasets#onlysince) . Kiitos Drew P:n.
    * PARANNETTU: jos saatavilla, ERDDAP™ näyttää https URL (alkaen&lt;baseHtpsUrl &gt;, jos saatavilla) http URL kun se kertoo käyttäjille URL lisätä / validoida / poistaa / lista tilata.
    * BUG FIX: ERDDAP™ nyt mahdollistaa tilauksen toiminnan alkaa " https://" . (Bob läimäyttää otsaansa.) Jennifer Sevadjianin ansiosta.
    * BUG FIX: .jsonlKVP Nyt käyttää ":" välillä kunkin avaimen ja arvon sijaan '=' . (Bob läimäyttää otsaansa.) Kiitos Alexander Barthin.
    * BUG FIX: Aiemmin tapahtunutta: ERDDAP™ quickRestart = true, ja jos, ennen kuin tiedosto ladattiin uudelleen normaalisti, soitat EDDTableF fromFles -tiedostoon, joka käytti päivitystäEveryNMillis, ja jos tiedostoa olisi juuri muutettu, pyyntö epäonnistuisi nollapistevirheellä. Nyt pyyntö onnistuu. John Kerfootin ansiosta.
    * UUTTA: Kun tiedosto on ladattu ERDDAP™ , avainsanat ovat nyt uudelleen järjestetty järjestyksessä ja kaikki uudet merkit poistetaan.
    * Nyt, jos GeoJson, .json tai .nc oJson-pyyntö on .json p-parametri, vastemiimityyppi on sovellus/javascript. Huomaa, että .json p ei ole tuettu .jsonlCSV tai .jsonlKVP Koska se ei toimisi. Kiitos Rob Fullerin.
    * IMPROVED: Mime-tyyppi json rivit fileType vaihtoehtoja on nyt "sovellus/x-jsonlines." Se oli sovellus/jsonl. Tällä hetkellä ei ole lopullista oikeaa valintaa.
    * PARANTAA: Epäonnistuneiden pyyntöjen määrä näkyy status.html-sivulla kasvaa, koska enemmän asioita lasketaan epäonnistumisiksi kuin aiemmin, esim., ClientAbortPoikkeus.
    * Nyt, jos vastaus ERDDAP™ ei ole pakattu, jolloin vasteen otsikkoon kuuluu "Content-Encoding"="identiteetti."
    * PARANTAA: "Lupa" ominaisuus ei ollut tarpeen. Nyt, jos se ei ole määritelty, standardiLicense viestit.xml (tai setup.xml:stä, jos sellainen on) käytetään oletuksena.
    * UUTTA: Nyt on valinnainen [tiedostoAccessSuffix-attribuutti](/docs/server-admin/datasets#fileaccessbaseurl) . joita voidaan käyttää nykyisten [fileAccessBaseUrl-attribuutti](/docs/server-admin/datasets#fileaccessbaseurl) .
    * PARANTAA: Voit lisätä turvallisuutta, tämä versio on koottu uusimman Java JDK v8u162.
    * UUTTA: Turvallisuuden lisäämiseksi useat yhteiset verkkotunnukset, jotka tarjoavat väliaikaisia sähköpostiosoitteita (esim., @mailinator.com) ovat nyt pysyvällä sähköpostilla mustalla listalla tilausjärjestelmä.
    * UUTTA: Turvallisuuden lisäämiseksi Daily Report -lehden tiedot sisältävät:
SetDataset Lippu IP- osoite epäonnistui (edellisen päivittäisen raportin jälkeen)   
SetDataset Lippu IP- osoite epäonnistui (Käynnistyksen jälkeen)   
SetDataset Lippu IP-osoite (edellisen päivittäisen raportin jälkeen)   
SetDataset Lippu IP-osoite (Käynnistyksen jälkeen)   
"Epäonnistuneet" näyttivät kuka (Hakkeri?) Yrittää asettaa lipun, mutta epäonnistuu.
    * PARANTAA: Varmuuden lisäämiseksi sähköpostiosoitteet&lt;tilausSähköpostiMusta lista&gt; datasets.xml Niitä pidetään nyt tapauksettomina.
         

## Versio 1.80{#version-180} 
 (julkaistu 2017-08-04) 

*    **Uudet ominaisuudet (käyttäjille) :**   
     
    * UUSI orderByCount  () suodattimen avulla voit määrittää, miten tulostaulukko lajitellaan (tai ei) ja vain palauttaa yhden rivin kunkin lajiryhmän, jossa lasketaan määrä ei-puuttuva-arvot kunkin muuttujan.
Esimerkiksi orderByCount  (" stationID ") järjestää stationID ja palauttaa yksi rivi kutakin stationID , jossa lasketaan niiden arvojen lukumäärä, jotka eivät jää pois kunkin muuttujan osalta.
Jos vain määrität orderByCount  ("") , vastaus on vain yksi rivi, jossa on määrä ei-puuttuva-arvo kunkin muuttujan.
Katso [ orderBy ... asiakirjat](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy) Ben Adamsin ansiosta.
    * UUSI .nc oJson-tiedosto Ruudutettujen ja taulukkotiedostojen tyyppivaihtoehto. Tässä vaihtoehdossa NCO lvl=2 "pedanttinen" JSON-tiedosto, jossa on kaikki tavallisesti .nc Tiedosto. Katso [ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json) Kiitos Charlie Zenderin.
    * BUG FIX: • orderBy ... () Make A Graph -sivun vaihtoehtoja käsitellään nyt oikein.
    * BUG FIX: .geoJson tulostus nyt ei tulosta riviä, jossa lat tai en arvot puuttuvat. Myös korkeusarvot (jos saatavilla) ne sisältyvät nyt koordinaatteihin, eivät tietoarvoina. Jonathan Wilkinsin ansiosta.
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:**   
     
    * TURVALLISUUSASIAKIRJA: Protokollat.js kirjasto käytetään OpenLayers demo WMS sivuja ERDDAP™ on vanhentunut ja siinä on vika, joka mahdollisesti mahdollistaa sen väärinkäytön. (Valitettavasti päivitys OpenLayers ja protokollia. Js ei ole helppoa.) Se avaa mahdollisuuden, että kirjasto voidaan perustaa niin, että haavoittuvuus on mahdollista. Kuitenkin, koska ERDDAP™ Ainoastaan käyttö OpenLayers erityisellä ennalta käyttöönotolla ja ainoastaan erityisellä ERDDAP - perustuvat tietolähteet, uskomme, että ei ole alueidenvälistä haavoittuvuutta ERDDAP n käyttö OpenLayers ja protokollia.js. Kuitenkin, jos et usko tätä, voit nyt poistaa käytöstä käytön OpenLayers demo WMS sivuja ERDDAP™ lisäämällä
```
        <openLayersActive>false</openLayersActive>  
```
sinun setup.xml tiedosto. Oletus on "true." Charles Carletonin ja NCEI:n ansiosta.
    * TURVALLISUUSMUUTOKSET: Käyttämätön .purkki tiedostoja ja kopioida .jar tiedostoja (koska ne ovat myös netcdfAll.jar) on poistettu ERDDAP™ jakelu. Ajantasainen .jar tiedostot on päivitetty. Charles Carletonin ja NCEI:n ansiosta.
    * TURVALLISUUSMUUTOKSET: NetcdfAll.jar tiedosto jaettu ERDDAP™ on viimeisin versio (Tällä hetkellä 4,6.10) , mutta se sisältää edelleen sisäisiä Jackson. jar tiedostoja, joiden tiedetään olevan vanhentuneita ja joilla on tietoturvan haavoittuvuuksia, erityisesti Jackson kirjastot, joita käytetään vain käytettäessä Amazon S3-tietolähteitä. Jos et käytä tietoja Amazon S3 (Jos olisit) , nämä haavoittuvuudet eivät ole merkityksellisiä.
        
Netcdf-java-kehittäjät väittävät, että nämä haavoittuvuudet eivät ole merkityksellisiä sen vuoksi, että netcdf-koodi käyttää näitä kirjastoja ja että ne olisivat merkityksellisiä vain käytettäessä Amazon S3:a. Katso [ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866) . Uskon heitä. Jos sinulla on vielä huolia tästä, ota yhteyttä netcdf-jaava kehittäjät. (Huomaa, että jos et usko netcdf-jaava kehittäjät ja harkitsevat ei käytä ERDDAP™ Tämän takia sinunkaan ei pitäisi käyttää THREDDS, koska THREDDS käyttää netcdf-java enemmän ja laajemmin kuin ERDDAP .) 
        
Yksityiskohdat: Vaikea koodi ja haavoittuvuusvaroitukset ovat:
netcdfKaikki-viimeisimmät.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml
Katso https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Korkea
netcdfAll-last.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml
Katso https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Korkea
netcdfKaikki-viimeisimmät.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-anotations/pom.xml
Katso https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Korkea
Katso https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- kriittinen
netcdfKaikki-viimeisimmät.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
Katso https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Korkea
Katso https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- kriittinen
"Nolle 4.6.10, aws-java-sdk-core vetää versio 2.6.6 jackson-\\* artefaktit." (sähköposti netcdf-java-ihmisiltä) .
Charles Carletonin ja NCEI:n ansiosta.
        
    * -Ei. Jos olet rekompakti ERDDAP™ , Huomaa, että -cp luokan parametri tarvitaan komentorivi on nyt paljon lyhyempi kuin ennen. Katso uusi -cp asetus [nämä asiakirjat](/docs/contributing/programmer-guide#development-environment) . Charles Carletonin ja NCEI:n ansiosta.
    * NEW OPtions in GenerateDatasets Xml: EDDTableFromBcodmo, joka on vain sisäiseen käyttöön BCO-DMO.
Kiitos Adam Shepherdin ja BCODMOn.
    * UUDEN LIITTEEN JA PIIRTEET: Jos EDDTable-sarakkeessa on tiedostonimiä web-tiedostoista (esim. kuva-, video- tai äänitiedostot) , Voit lisätä
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
Määrittele perus URL (päättyy /) tarvitaan tehdä tiedostonimet täydellinen URL. Sitten .htmlTable vastaukset ERDDAP™ näyttää tiedoston nimen linkkinä yhdistettyyn URL-osoitteeseen (tukikohta Url plus tiedostonimi) .
Jos haluat ERDDAP™ palvelemaan asiaan liittyviä tiedostoja, tehdä erillinen EDDTableFromFromFileNames aineisto näistä tiedostoista (se voi olla yksityinen aineisto) .
Kiitos Adam Shepherdin ja BCODMOn.
    * UUSI LIITTEELLINEN SUOSITUS: Jos EDDTable-sarakkeessa on tiedostonimiä web-tiedostoista (esim. kuva-, video- tai äänitiedostot) jotka ovat saatavilla arkiston kautta (esim. .zip tiedosto) saatavilla URL-osoitteen kautta, käyttö
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
Määrittele arkiston URL.
Jos haluat ERDDAP™ palvella arkistotiedoston, tehdä erillinen EDDtableFromFromFileNames-tiedoston (se voi olla yksityinen aineisto) .
Kiitos Adam Shepherdin ja BCODMOn.
    * PARANNUKSET tietojen tuottamiseen Xml poistaa syyt virheellinen / huono&lt; subsetVariables &gt; ehdotukset ja kaksoiskappale/huono ehdotus vaihtelevista nimistä jne. Kiitos Rich Signellin, Adam Shepherdin ja BCO-DMO:n.
    * UUSI VAIHTOEHTO: Poliittiset rajat ERDDAP on kolmannen osapuolen ja hieman vanhentunut. Maailmassa on myös kiistanalaisia rajoja, joissa eri ihmisillä on erilaisia ajatuksia siitä, mikä on oikein. Emme väitä, että poliittiset perustiedot ovat oikeita. ERDDAP . Jos et pidä poliittisista rajatiedoista, jotka tulevat ERDDAP™ , voit nyt kertoa ERDDAP™ ei koskaan piirtää poliittisia rajoja lisäämällä
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
sinun setup.xml tiedosto. Oletus on "true." Kiitos Raju Devenderin.
    * METAATA TAG: Vuonna datasets.xml tiedostolle, voit nyt määrittää oletusmäärä väri A-luokan palkkien osat dataVariable kaavioista ja kartoista,
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (oletus=-1, joka sanoo ERDDAP™ päättää) . Katso [väri Palkin asetukset](/docs/server-admin/datasets#color-bar-attributes) .
    * PARANTAA: valtion rajan väri kartoissa oli violetti (Syvä violetti sinulle Baby Boomers) . Nyt se on harmaa (harmaan ja harmaan maan välillä) .
    * BUG FIX:&lt;iso19115File&gt; ja&lt;fgdcFile&gt; in datasets.xml niitä ei ole aina käsitelty oikein. Nyt he ovat. Kiitos BCO-DMO:n.

## Versio 1.78{#version-178} 
 (julkaistu 2017-05-27) 

*    **Uudet ominaisuudet (käyttäjille) :**   
     
    *    (ei mitään)   
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:**   
     
    * IMPROVED: Tilan "Major LoadDatasets Time Series" rivien järjestys.html sivu on nyt uusin pohjalla vanhimpaan.
    * BUG FIX: ERDDAP™ nyt kirjoittaa .nccsv aikamuuttujan tiedostot actual\\_range ISO-8601 String -aikana. Tämä korjaa vikaa EDDTableFromErddap jäsennystiedot etätiedostosta ja quickRestart-tiedoston kaikille DDDTableFrom...Files dataset. (Aika actual\\_range on väärässä ensimmäisen kerran tiedoston kuormia v1.78 mutta oikein sen jälkeen, kun se on ladattu, esim., jos kirjaat tiedoston.) 

## Versio 1.76{#version-176} 
 (julkaistu 2017-05-12) 

*    **Uudet ominaisuudet (käyttäjille) :**   
     
    * MUUTOS Tomcatissa: Pyynnöt ERDDAP™ tulevat muista ohjelmista kuin selaimista (esim. curl , R Matlab , Python , Java ) :
Kuten aiemmissa Tomcat-versioissa (käytössä oleva alatason ohjelmisto ERDDAP ) vuodesta 2016 alkaen enemmän ja enemmän merkkejä kyselyn osa pyynnön URL on oltava [ **% Koodattu** ](/docs/server-admin/datasets#infourl) turvallisuussyistä. Selaimet huolehtivat sinulle koodauksesta. niin käyttää ERDDAP™ selaimessa ei vaikuta, ellei pyyntö ohjataan toiseen ERDDAP .
    * Aiemmin tapahtunutta: ERDDAP™ hoidettu **char-muuttujat** enemmän kuin signeeraamaton lyhyt kokonaislukuja kuin merkkejä. Nyt se kohtelee heitä enemmän kuin 1-merkkisiä UCS-2 (Unicode) Strings. Katso [char-asiakirjat](/docs/server-admin/datasets#char) . Kiitos Aurelie Briandin ja Argo-projektin.
    * Aiemmin tapahtunutta: ERDDAP™ tarjota vähän tukea **Unicode- merkit** edellä merkki #255 vuonna Strings. Nyt, sisäisesti, ERDDAP™ tukee täysin 2-tavuista UCS-2:ta (merkit numeroitu 0-65535) Stringsissä. Kun merkkijonon tiedot on kirjoitettu eri tiedostotyypeille, ERDDAP™ tekee parhaansa tukea 2-tavuisia chars. Toinen esimerkki on .csv tiedostoja, jotka ERDDAP™ kirjoittaa ISO-8859-1 -charsetilla (1 tavuinen charset) , joten ERDDAP™ kirjoittaa kaikki merkkien yläpuolella olevat merkit #255 JSON-tyyppisellä \\u_hhh_ syntaksilla. Katso [Merkkijonotiedot](/docs/server-admin/datasets#string) .
    * PARANTAA: .nc tiedostoja kirjoittanut ERDDAP™ , char muuttujat tulkita Strings on ominaisuus
         **\\_koodaus=ISO-8859-1**   
Sisään .nc tiedostot, jotka lukevat ERDDAP™ , char muuttujat, joissa on "\\_Encoding" tulkitaan merkkijonot kanssa määritelty charset.
    * -Ei. ERDDAP™ tuet **JSONin tapainen backslash-koodaus** erikoismerkkejä, kun määrität rajoitteita hila ja merkkijono muuttujia. Näin voit pyytää jotain, kuten &myString="\\u20ac" kun haluat rivejä tietoja, joissa myString = € koska 20ac on heksadesimaalinen versio koodipisteen Eurosymboli. Useat lähteet verkosta osoittavat Unicode-symbolien koodipisteen numerot, esim. [ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode) .
    * Aiemmin tapahtunutta: ERDDAP™ tarjosi rajoitettua tukea **pitkä kokonaisluku** muuttujat. Nyt ERDDAP™ täysin tukee pitkiä sisäisesti ja tekee parhaansa kirjoittaessaan pitkiä tietoja eri tiedostotyypeille. . Katso [pitkä dokumentaatio](/docs/server-admin/datasets#long) . Kiitos Irlannin Marine Institute, Craig Risien, Rich Signell, Christopher Wingard ja OOI.
    * UUTTA: tulostiedoston tyyppi griddap ja tabledap : ** .nccsv ** , joka tekee NetCDF -kuten ASCII, CSV-tiedosto, joka sisältää myös kaikki metatiedot, jotka olisivat vertailukelpoisia .nc Tiedosto. Katso [NCCSV Eritelmä](/docs/user/nccsv-1.00) . Steve Hankinin ansiosta.
    * UUTTA: ** orderByClosest suodatin** voit määrittää, miten tulostaulukko lajitellaan ja väliaika (esim. 2 tuntia) . Kunkin lajiryhmän sisällä pidetään vain väliä lähimpänä olevat rivit. Esimerkiksi orderByClosest  (" stationID , aika, 2 tuntia") järjestää stationID ja aika, mutta vain palauttaa rivit kunkin stationID jossa viimeisin orderBy sarake (aika) on lähellä 2 tunnin välein. Tämä on lähin asia. tabledap askelarvot ruudukkoa koskevassa pyynnössä. Tämä vaihtoehto voidaan määritellä millä tahansa tabledap tietokokonaisuuden .html web-sivu, .graph-sivu, ja tahansa URL että luot itse. Kiitos Irlannin Marine Institute ja Ocean Networks Kanada.
    * UUTTA: ** orderByLimit suodatin** voit määrittää, miten tulostaulukko lajitellaan ja raja-numero (esim., 100) . Kunkin ryhmän sisällä säilytetään vain ensimmäiset "rajarivit." Esimerkiksi orderByMax  (" stationID , 100") järjestää stationID , mutta vain palauttaa ensimmäiset 100 riviä kunkin stationID . Tämä on samanlainen kuin SQL:n rajoituslauseke. Tämä vaihtoehto voidaan määritellä millä tahansa tabledap tietokokonaisuuden .html web-sivu, .graph-sivu, ja tahansa URL että luot itse. Kiitos Irlannin Marine Institute ja Ocean Networks Kanada.
    * UUTTA: Kaksi uutta vastaustiedostotyyppiä, ** .jsonlCSV sekä .jsonlKVP ** ovat saatavilla pyyntöjä ruudutettuja tietoaineistoja, taulukkotiedostoja ja monia muita paikkoja ERDDAP   (Esimerkiksi tietokokonaisuuksia koskevat tietopyynnöt) . Tiedostot ovat JSON Lines -tiedostoja ( [ https://jsonlines.org/ ](https://jsonlines.org/) ) Jossa jokaisella rivillä on erillinen JSON-objekti. .jsonlCSV vain on arvot CSV-muodossa. .jsonlKVP on avain: Arvoparit. Jokainen linja on omillaan. Viivoja ei ole suljettu suurempaan JSON-järjestelmään tai -objektiin. Esimerkiksi: [tämä otantapyyntö](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z) . Damian Smythin, Rob Fullerin, Adam Leadbetterin ja Irlannin meriinstituutin ansiosta.
    * UUSI: Uusia asiakirjoja kuvataan [ **Miten käyttää yksityisiä tietoja ERDDAP™ Skriptien kautta** ](/docs/user/AccessToPrivateDatasets) . Kiitos Lynn DeWittin.
    * PARANTAA: ** OpenLayers ** kartta oli 2 astetta ja on nyt 4 data pikseliä. Kiitos Rusty Hollemanin.
    * PARANTAA: Joissakin tavallisissa tapauksissa, joissa **säännöllinen lauseke** Rajoitus käsitellään paljon nopeammin.
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:**   
     
    *    **Hidas alku:** Ensimmäinen kerta kun käynnistät tämän uuden version, se kestää kauan ERDDAP™ ladata kaikki tiedostot, koska sen täytyy lukea uudelleen kaikki lähdetiedostot (vaikkakin vain ruudutettujen tiedostojen otsikko) . Jos katsot lokeja, saatat nähdä virheviestejä, joissa lukee "vanha/kannattamaton parannettu versio" joistakin sisäisistä tiedostoista -- se on okei -- ERDDAP™ tekee uudet versiot sisäisistä tiedostoista. Ole kärsivällinen.
    * TOIMI: ERDDAP™ Nyt käyttää uutta **Java. aika** luokat (Tunnetaan myös nimellä JSR 310) Sen sijaan Joda tulkita String kertaa numeroita kertaa. Huomautukset:
        * Jos ERDDAP™ Yhtäkkiä on ongelmia jäsentämällä String kertaa tietyn aineiston ja siten vain muuntaa suurimman osan tai kaikki kertaa Nan: n (puuttuvat arvot) , ongelma on lähes aina päivämäärä Aikamuoto merkkijono, jonka määritit muuttujan "yksiköiksi." Uusi järjestelmä tarvitsee joskus hieman erilaista päiväysaikamuotoa.
        * Jos numeerinen kuukausia ja päiviä päivämäärä Aikajonoja ei ole 0-pehmustettu (esim. "3/7/2016") , Varmista, että muodossa on vain yksi M ja d (esim. "M/d/vvvv," ei "MM/pp/vvvv") .
        * Muuta kaikki murto-osan sekuntia erittely, joka käyttää pienimuotoista s (esim. yyyy-MM-dd "T'H:mm:ss.ss.") , pääomaksi S:t. (esim. yyyy-MM-dd SSS) .
        *    ERDDAP™ ei enää tue merkkijonopäivää Aikamuodot, joissa kaksinumeroiset vuodet (Yy) jossa (esim. 1900 tai 2000) . Yritykset käyttivät miljardeja dollareita korjatakseen ongelman 1990-luvun lopulla. Tutkijoiden ei pitäisi käyttää kahta lukuvuotta. Korjaa lähdekooditiedosto (tilu) muuntamalla 4-numeroisiksi vuosiksi, sitten käyttämällä yy päivää Aikamuoto.
        * Voit käyttää vvvv tai VVVV (joka ERDDAP™ muuntaa uuu) 4-numeroisten vuosien, mukaan lukien negatiiviset vuodet, esim. -4712 (joka on 4713 eKr.) . SeaDataNet, Thomas Gardner ja BODC.
        * Jatka Z:n käyttöä päivämäärän sisälläTime-muodossa saadaksesi ERDDAP tulkitaksesi aikaeron (esim. Z, +0200, -08, -0800, -08:30) .
        *    **Varmista, että käytät Java versio 1.8.0\\_21 tai uudempi.** 
        * Ohjelmoijat -- Jos kirjoitat Java Suorittavat ohjelmat ERDDAP™ Koodi, sinun täytyy poistaa viittaus joda-aika. Purkki luokan polkuparametrissa.
    * UUTTA: ERDDAP S [ArchiveA Dataset-työkalu](/docs/server-admin/additional-information#archiveadataset) voi nyt luoda [ **BagIt-tiedostot** ](https://en.wikipedia.org/wiki/BagIt) . NCEI voi standardoida tässä muodossa. Kiitos Scott Crossin ja John Relfin.
    * PARANTAA: Linkit ladata erddap. sota ERDDAP™ www-sivut osoittavat nyt **GitHub** . (Ne ovat julkisia linkkejä, joten sinun ei tarvitse liittyä GitHubiin.) Tämä tarkoittaa paljon nopeampia latauksia (enintään 12Mb/s vs. 1Mb/s) ja muutamia ongelmia lataukset. Damian Smyth, Rob Fuller, Adam Leadbeter, Conor Delaney ja Irlannin Marine Institute.
    * PARANTAA: **status.html sivu ja päivittäisen tilan raportin sähköposti** nyt sisältää "Major LoadDatasets Time Series" osion, jossa esitetään tilastoja noin ERDDAP™ Kunkin suuren kuorman lopustaDatasetit viimeisestä 100 suuresta kuormastaDataset. Kiitos hankalan ratsuväen.
    * UUSI: uusi, valinnainen (mutta) EDDtableFromCassandra-aineistojen parametri: [ ** &lt;osioKeyCSV&gt; ** ] (/docs/server-admin/datasets#partitionkeysv) . Kiitos Ocean Networks Canada.
    * UUTTA: EDDTableFromAsciiFiles tukee nyt ** &lt;sarakeSeparaattori&gt; ** parametri. Jos nolla tai "," luokka arvaa, kuten ennen, Muussa tapauksessa ensimmäinen merkki käytetään sarakkeen erotin lukiessaan tiedostoja. Kiitos Sky Bristolin ja Abigail Bensonin.
    * Uusi: uuden tietokokonaisuuden tyyppi [ **EDDTableTarkista** ](/docs/server-admin/datasets#eddtablefromnccsvfiles) , voi tehdä aineiston yhdistämällä [NCCSV.csv-tiedostot](/docs/user/nccsv-1.00) . Steve Hankinin ansiosta.
    * PARANTAA: **EDDTableFromErddap** Nyt käyttää .nccsv saada tietoja etäältä ERDDAP s ja paikallisen arkiston että metatiedot. Tämä mahdollistaa täyden tuen char ja pitkät tietotyypit, ja Unicode (UCS-2) Charset for Charers and Strings. Kiitos Rob Fullerin ja Irlannin meriinstituutin.
    * PARANTAA: EDDTableFromErddap ja EDDGrid FromErddap nyt tukea ** &lt;uudelleenohjaus&gt;virhe&lt;/uudelleenohjaus&gt; ** joka kertoo ERDDAP™ ei koskaan ohjata pyyntöä kaukosäätimeen ERDDAP . Oletus on totta. Tämä on hyödyllistä, kun kaukosäädin ERDDAP™ on yksityinen ERDDAP . Damian Smyth, Rob Fuller ja Irlannin Marine Institute.
    * PARANTAA: ERDDAP™ nyt saaliit **peruutetut käyttäjäpyynnöt** Mitä nopeammin. Ja ERDDAP™ Nyt sammuu nopeammin, koska matalat langat sulkeutuvat nopeammin. Kiitos hankalan ratsuväen.
    *    **Luo tiedostoja Xml:** 
        * UUSI: Uusi erityinen EDDType "ncdump" tulostaa [ncdump](https://linux.die.net/man/1/ncdump) \\-kuin tuloste otsikon .nc Tiedosto. Voit myös tulostaa tietoarvot tietyille muuttujille (tai kirjoita "ei mitään" tulostettavaksi) . Tämä on hyödyllistä, koska ilman ncdump on vaikea tietää, mitä on tiedostossa ja siten mitä EDDType sinun pitäisi määritellä GenerateDatasetsXml. Kiitos Craig Risienin, Rich Signellin, Christopher Wingardin ja OOI:n.
        * UUSI: SeaData Nettotiedot:
Luo tarvittaessa tiedostoja Xml tekee nyt tietyn semanttisen muunnuksen käyttäen etäällä SPARQL-kysely: jos muuttujan lähdemetatiedot sisältävät sdn\\_parameter\\_urn, esim., sdn\\_parameter\\_urn = "SDN:P01::PSLTZZ01," generateDatasetit Xml lisää vastaavan P02-attribuutin, esim. sdn\\_P02\\_urn = "SDN:P02::PSAL." Jos sinulla on tietoja, jotka käyttävät näitä ominaisuuksia, ja jos ERDDAP S&lt; categoryAttributes &gt; setup.xml sisältää sdn\\_parameter\\_urn ja sdn\\_P02\\_urn, käyttäjät voivat käyttää ERDDAP™ Kategoriahakujärjestelmä sellaisten tietoaineistojen etsimiseksi, joissa on näiden ominaisuuksien erityisarvoja. Kiitos BODC:n ja Alexandra Kokkinakin.
        * PARANTAA: Luoda datasettejä Xml muuttaa nyt monia http:// viitetiedot metatiedoissa, joihin https:// tarvittaessa.
        * PARANTAA: Luoda datasettejä Xml yrittää nyt arvata luoja\\_tyyppi ja julkaisija\\_tyyppi.
        * IMPROVED: Muuttujan datatyypit ehdotti GenerateDatasets Xml on nyt hieman parempi. Kiitos Margaret O'Brienin, LTERin ja EML:n.
        * PARANTAA: Luoda datasettejä Xml on parempi täsmentää&lt;cdm\\_data\\_type&gt; ja lisäämällä siihen liittyvät, vaaditut ominaisuudet (esim.&lt;cdm\\_timeseries\\_variables&gt;), joten voit toimittaa nämä tiedot. Kiitos Rich Signellin.
        * PARANTAA: Tuottaa tiedot Xml, EDDTable-aineistojen osalta ehdotus&lt; subsetVariables &gt; on nyt paljon konservatiivisempi. John Kerfootin ansiosta.
        * PARANNETTU: datasets.xml tietokokonaisuuksille featureType mutta ei cdm\\_data\\_tyyppi, featureType käytetään cdm\\_data\\_tyypinä. Kiitos Rich Signellin.
        * BUG FIX: tuottaa Dataset Xml nyt ehdottaa oikea&lt;datatyyppi&gt; sellaisten tietomuuttujien osalta, joilla on scale\\_factor , add\\_offset ja/tai \\_allekirjoittamattomat ominaisuudet.
    * PARANTAA: Milloin ERDDAP™ avaa a .nc tiedosto, joka on **lyhyempi** kuin sen pitäisi olla (esim. sitä ei kopioitu kokonaan paikalleen) , ERDDAP™ Hän kohtelee kansiota huonosti. Aiemmin tapahtunutta: ERDDAP™ palautti puuttuvat arvot tahansa puuttuva osa tiedoston, koska se on oletus käyttäytyminen netcdf-java. ERDDAP™ Nyt käyttää ucar .nc 2.iosp.netcdf3.N3header.disallowFileTruncation = true; Kiitos hankalan ratsuväen ja Christian Ward-Garrisonin.
    * PARANTAA: ISO 19115 kirjailija käyttää nyt **luoja\\_tyyppi** , jos se on läsnä.
    * PARANTAA: ERDDAP™ nyt käyttää uusinta netcdf-java v4.6.9, joka voi lukea muita tyyppejä **netcdf-4 tiedostoa** . Kiitos Craig Risienin, Rich Signellin, Christopher Wingardin ja OOI:n.
    * BUG FIX: Vältä ongelmia, jos eri lähdetiedostot ovat eri tietotyyppejä tietyn muuttujan. Roy Mendelssohnin ja Eugene Burgerin ansiosta.
    * BUG FIX: **Aikamuotomuunnokset** Nyt ne on paremmin suojattu huonoilta aika-arvoilta. Kiitos NDBC:n.
    * BUG FIX: EDDGrid FromNcFiles Avaa nyt käsittelee aika-arvot **"Kuukausia sen jälkeen ja vuosia sen jälkeen."** oikein (lisäämällä kuukauden tai vuoden, ei raa'asti lisäämällä esimerkiksi, 30 päivää toistuvasti) . Kiitos Soda3.3.1.
    * Vain v1.74. **tilaukset** vaaditaan toimenpidettä (esim. http:// ...) , joka oli ja pitäisi olla vapaaehtoinen.
    * BUG FIX: EDDGrid FromMergeIRFiles.lowGetSourceMetadata () Ei lisännyt mitään globaaleja ominaisuuksia. Nyt on.
         

## Versio 1.74{#version-174} 
 (julkaistu 2016-10-07) 

*    **Uudet ominaisuudet (käyttäjille) :**   
     
    * Nyt, kun luettelo Datasets (Kaikki tai hausta) Näytetään verkkosivuilla, pitkät otsikot näkyvät useilla riveillä. Aiemmin pitkä otsikko korvattiin nimellä " ...." Kiitos Margaret O'Brienin, LTERin ja EML:n.
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:**   
     
    * TO: Linux-tietokoneilla, vaihda Apache aikakatkaisuasetukset niin, että aikaa vievät käyttäjän pyynnöt eivät aikakatkaisu (jossa usein näyttää "proxy" tai "Bad Gateway" virhe) . Juurikäyttäjänä:
        
        1. Muokkaa apassia http d.conf-tiedosto (yleensä /etc/ http d/conf/) :
Muuta nykyistä&lt;Aikakatkaisu&gt; asetus (tai lisää yksi tiedoston loppuun) - 3600 (sekuntia) , sijasta oletus 60 tai 120 sekuntia.
Muuta nykyistä&lt;ProxyTimeout&gt; asetus (tai lisää yksi tiedoston loppuun) - 3600 (sekuntia) , sijasta oletus 60 tai 120 sekuntia.
        2. Käynnistä apassi uudelleen: /usr/sbin/apachectl - k suloinen (mutta joskus se on eri hakemistossa) .
        
Kiitos Thomas Oliverin.
         
    * UUTTA: \\[ bigPentDirectory/kova Lippukansio
Tämä toimii kuten lippuhakemisto, mutta hardFlag-versio poistaa myös kaikki välimuistin tiedot. Ei ole olemassa URL-osoitteita, jotka voisivat asettaa hardFlagin. Tätä voidaan käyttää vain laittamalla tiedosto tuohon hakemistoon.
kova Liput ovat erittäin hyödyllisiä, kun teet jotain, joka aiheuttaa muutoksen miten ERDDAP™ lukee ja tulkitsee lähdetietoja, esimerkiksi kun asennat uuden version ERDDAP™ tai kun olet tehnyt tietyntyyppisiä muutoksia tietokokonaisuuden määritelmään datasets.xml . Katso [nämä asiakirjat](/docs/server-admin/additional-information#hard-flag) . John Kerfootin ja Argo-ryhmien ansiosta.
         
    * UUTTA: Luo datasettejä Xml on nyt EDDtableFromEML vaihtoehto
joka lukee tietokokonaisuuden kuvauksen ekologisen metadatan kielellä (EML) tiedosto, lataa siihen liittyvän tiedoston ja luo palan datasets.xml jotta tietokokonaisuus voidaan lisätä ERDDAP . On myös EDDtableFromEMLBatch, joka tekee saman kaikille EML-tiedostoja hakemistossa. Tämä toimii hyvin, koska EML kuvaa aineistoa erinomaisesti ja koska KNB ja LTER asettavat varsinaiset tiedostot saataville.
EML + ERDDAP™ Voi olla hyvä yhdistelmä, koska ERDDAP™ KNB: n ja LTER: n tietojen runsaus voitaisiin antaa käyttäjille suoremmin käyttöön ja auttaa näitä hankkeita saavuttamaan Yhdysvaltain hallituksen [Tutkimustulosten julkisuus (PARR) vaatimukset](https://nosc.noaa.gov/EDMC/PD.DSP.php) asettamalla tiedot saataville verkkopalvelun kautta.
Katso [nämä asiakirjat](/docs/server-admin/EDDTableFromEML) . Kiitos Margaret O'Brienin, LTERin ja EML:n.
         
    * UUTTA: Luo datasettejä Xml on nyt EDDtableFromInPort vaihtoehto
joka lukee tiedoston kuvaus InPort XML-tiedosto ja yrittää luoda pala datasets.xml jotta tietokokonaisuus voidaan lisätä ERDDAP . Tämä harvoin luo käyttövalmis pala XML varten datasets.xml , mutta se luo hyvän karkea luonnos, joka on hyvä lähtökohta editointi ihmisen.
Olisi hienoa, jos ihmiset, jotka käyttävät InPortia tiedostojensa dokumentoimiseen, käyttäisivät myös ERDDAP™ saattaa todelliset tiedot saataville ERDDAP " web palvelut ja siten täyttävät Yhdysvaltain hallituksen ja NOAA S [Tutkimustulosten julkisuus (PARR) vaatimukset](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research) asettamalla tiedot saataville verkkopalvelun kautta. Tätä ratkaisua voitaisiin käyttää juuri nyt. ( erd.data at noaa.gov Autan mielelläni.)   
Katso [nämä asiakirjat](/docs/server-admin/datasets#eddtablefrominport) . Kiitos Evan Howellin ja Melanie Abecassisin.
         
    * PARANTAA: ERDDAP™ Nyt käyttää netcdf-java 4.6.
Aiemmilla versioilla netcdf-java lukee joitakin täyttöarvoja (Ehkä vain netcdf-4 tiedostoja) Kuin 0. Nyt se lukee joitakin niistä netcdf standardin täyttöarvo: -127 tavua, -32767 shortsit, -2147483647 ints. Unidata Sanoo, että uusi käytös on asianmukaista. Jos datakansiossa oleva muuttuja alkaa näyttää yhtä näistä arvoista, joissa se näytti 0:ta, voit lisätä esimerkiksi
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
muuttujan addAttributes kertoa ERDDAP™ kohdella tätä arvoa missing\\_value /\\_täytä Arvo. Monissa tapauksissa tämä ei kuitenkaan tuota toivottua tulosta: 0. Jos on, harkitse tiedostojen muuttamista NCO Tai kirjoittaa tiedostot uudelleen. Valituksia? Ota yhteyttä Unidata ;-)
         
    * TEHDÄ: Uusi Topography Syvä paletti
Kehotan teitä vaihtamaan kaikki tiedostot, jotka käyttävät OceanDepth palettia käyttää uutta Topography Syvyyspalettia, joka on kuin Topography, paitsi värit käännetty, niin että se sopii syvyysarvot (positiivinen = alas) , sijasta korkeusarvot (positiivinen=up) . Tämän paletin suositellut asetukset ovat:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * UUDET PIIRTEET: Merkkijono missing\\_value ja/tai \\_FillValue
Jos merkkijonomuuttuja määrittelee missing\\_value ja/tai \\_FillValue ERDDAP™ nyt poistaa nämä arvot tiedoista ja korvata ne tyhjällä merkkijonolla, jotta puuttuvat arvot näkyvät tyhjinä jonoina, kuten muidenkin tietoaineistojen ERDDAP . Kiitos Margaret O'Brienin, LTERin ja EML:n.
         
    * UUDET PIIRTEET: Paikallisten aikakausien tuki
aikaleima muuttujat lähdetietoja Strings voi nyt määrittää aikavyöhykkeen kautta " time\\_zone " ominaisuus, joka johtaa ERDDAP™ paikallisen aika-alueen lähdeajan muuntaminen (Jotkut normaalissa ajassa, jotkut päivänvalossa) sisään Zulu kertaa. Luettelo voimassa olevista aikavyöhykkeiden nimistä on todennäköisesti sama kuin TZ-sarakkeessa [tämä taulukko](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) . Oletus on " Zulu " Yhdysvaltain yhteiset aikavyöhykkeet ovat: US/Havaiji, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, USA/Itä. Saat aikaleima muuttujia numeerinen lähdetiedot, voit määrittää " time\\_zone " ominaisuus, mutta arvon on oltava " Zulu "tai "UTC." Kiitos Margaret O'Brienin, LTERin ja EML:n.
         
    * UUTTA: DDDTableFromAsciiFiles tukee nyt puolipiste-erillisiä tiedostoja
ja on fiksumpi selvittää erotin. Kiitos Margaret O'Brienin, LTERin ja EML:n.
         
    * UUDET PIIRTEET: Jos latauksessa on merkittävä virheDataseteissa (merkittävä tai vähäinen, esimerkiksi puuttuva tai virheellinen datasets.xml asiakirja) , ERDDAP™ nyt ilmoittaa sen status.html, aivan alla "n Datasets Fained To Load" VIROR: käsittelyn aikana datasets.xml : katso log.txt lisätietoja.
         
    * UUDET PIIRTEET: ERDDAP™ Etsi orpoja.
Milloin ERDDAP™ tekee suuren kuorman Datasetit, se etsii nyt orpojen tietoja. (tiedot, jotka ovat ERDDAP™ mutta ei sisällä datasets.xml ) . Jos niitä löytyy, ne on lueteltu status.html:ssä, aivan alla "n Datasetit, joita ei voitu ladata" ERROR: n Orphan Datasetit (tiedot ERDDAP™ mutta ei sisällä datasets.xml ) = ....
Jos haluat poistaa (pura) orpo ERDDAP™ , sinun täytyy lisätä
        &lt;Tiedoston tyyppi="_anyValidType_" datasetID ="_theDatasetID_" active="false" /&gt;
- datasets.xml kunnes tietokokonaisuus puretaan seuraavan suuren kuorman aikanaDatasets.
         
    * BUG FIX: Jos aineistossa on numeerinen aikaleimamuuttuja, jossa on muita yksiköitä kuin "seconds since 1970-01-01T00:00:00Z" ja&lt;updateEveryNMillis&gt; järjestelmä aktiivinen, aikaleima muuttujan vaihteluväli asetettiin väärin, kun tietokokonaisuus päivitettiin. John Kerfootin ansiosta.
         
    * BUG FIX: Jos&lt;QuickRestart&gt; oli totta setup.xml ja pyysit tietoja EDDtableF alkaen... Käytetyt tiedostot&lt;updateEveryNMillis&gt;, ensimmäinen pyyntö aineistoon epäonnistuisi, mutta myöhemmät pyynnöt onnistuisivat. Ensimmäinen pyyntö ei epäonnistu. John Kerfootin ansiosta.
         
    * BUG FIX: GenerateDatasetsXml.sh ja .bat eivät toimineet yli 9 parametrit komentorivillä. Nyt he tietävät. John Kerfootin ansiosta.
         
    * BUG FIX: Uusi EDDtableFromMultidimNcFiles ei johdonmukaisesti poista jälkitilat jousista. Nyt on. Tämä vaikutti Argo-tiedostoihin. Kevin O'Brienin ja Roland Schweitzerin ansiosta.
         
    * BUG FIX: Kaikki etäyhteydet DAP Palvelut käynnistetään nyt nykyaikaisemmalla koodilla. Tämä korjaa "kytkentä suljettu" -virheen, kun käytät joitakin EDDtableFromErddap-tiedostoja. Kiitos Kevin O'Brienin.
         
    * BUG FIX: Käsittely orderBy ... () ja erillinen () ovat nyt takaisin niin kuin ne olivat ennen viimeaikaisia muutoksia: tietty pyyntö voi olla useita orderBy ... () ja/tai erillinen () suodatin; ERDDAP™ käsittelee ne järjestyksessä ne on määritelty. Kiitos David Karugan.
         
    * BUG FIX: Jos tietokokonaisuus on EDDtableFromDatabase ja kysely on [sourceCan OrderBy](/docs/server-admin/datasets#sourcecanorderby) ja/tai [lähdeCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct) , sitten tietokanta voi (riippuen asetuksista datasets.xml ) osittain tai kokonaan kahva **Ainoastaan ensimmäinen**   orderBy .. () tai erillinen () . Kiitos David Karugan.
         
    * BUG FIX: Äskettäin ylimääräinen prosentti-koodaus aiheutti ongelmia joitakin kyselyjä .nc CF-tiedostot, esim. "HTTP-tila 500 - Kyselyvirhe: muuttuja=status on lueteltu kahdesti tulosmuuttujaluettelossa." Kiitos Kevin O'Brienin.
         
    * BUG FIX: EDDTableFromFiles oli vaikeuksia ladata tiedostoa uudelleen, kun yksi sarakkeista oli todellinen char sarake. Kiitos Roland Schweitzerin.
         
    * BUG FIX: EDDGrid FromNcFiles Irrota nyt muuntaa myös missing\\_value ja \\_FillValue vakioarvoihin, jotta eri arvoilla varustetut tiedostot voidaan yhdistää. Tämän muutoksen vuoksi, kun olet asentanut tämän uuden version ERDDAP™ , ole hyvä ja aseta [kova Lippu](/docs/server-admin/additional-information#hard-flag) kullekin EDDGrid FromNcFiles Pakkaamaton tietoaineisto ERDDAP .
         
    * PARANTAA: EDDTableFromNcCFFiles voi nyt käsitellä tiedostoja, joissa on useita näyte\\_dimensions. Tietyssä aineistossa saa käyttää ainoastaan muuttujia, joissa käytetään yhtä näytettä\\_mittoja. Kiitos Ajay Krishnanin.
         
    * EDDTable From...&lt;sortFilesBySourceNames&gt; nyt mahdollistaa pilkun erottamisen (suositellaan) tai avaruuseroteltuja luetteloita muuttuvista lähteistä. Kummassakin tapauksessa yksittäisten muuttujien nimet voidaan ympäröidä kahdella lainauksella, esim. jos nimessä on sisäinen tila.

## Versio 1.72{#version-172} 
 (julkaistu 2016-05-12) 

*    **Uudet ominaisuudet (käyttäjille) :** Ei
     
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * UUSI EDDtaulukkoMultidimNc-arkistoista [EDDTableFromMultidimNcFiles](/docs/server-admin/datasets#eddtablefrommultidimncfiles) on uusi vaihtoehto EDDtableFromNcFiles. Se on suunniteltu käsittelemään tiedostoryhmiä, joilla on useita muuttujia, joilla on jaettu ulottuvuus, esim. var1 \\[ a \\]  \\[ b \\] , var2 \\[ a \\] , var3 \\[ b \\] ScalarVar. Kiitos Argo-projektin, Aurélie Briandin ja Roland Schweitzerin.
    * BUG FIX: ERDDAP™   (FileVisitorDNLS- ja FileVistorSubdir-luokkien kautta) nyt seuraa symbolisia linkkejä Linux. ERDDAP™ Ei vieläkään seuraa .lnk's Windowsissa.
    * BUG FIX, joka on otettu käyttöön 1.70 kohdassa: erillinen + orderBy ei hyväksytty yhdessä pyynnössä. Nyt ne ovat taas. Ne eivät sulje toisiaan pois/saattavat. Kiitos David Karugan.
    * MUUTOS datasets.xml IP-osoitteiden musta lista:
IP v4 osoitteet näyttävät ERDDAP™ 4 jakson erotellut hex numerot.
IP v6-osoitteet ovat 8 kaksoisolentoa.
Joten ERDDAP™ nyt tukee paksusuolen IP-osoitteita luettelossa ja:\\* lopussa luettelon estää useita osoitteita.
    * PARANTAA: ERDDAP™ Nyt käyttää NetcdfFileWriter kirjoittaa .nc tiedostot sijaan deprecated NetcdfFileWriteable. Tuloksena oleviin tiedostoihin ei pitäisi tehdä havaittavaa muutosta. Tämä avaa mahdollisuuden tehdä iso .nc tiedostot, jotka käyttävät .nc 3 64-bittiset laajennukset. Jos haluat tai tarvitset sitä, lähetä pyyntö osoitteeseen erd.data at noaa.gov .
    * PARANTAA: Monet linkit etäsivustoille olivat vanhentuneita. Nyt ne ovat ajan tasalla ja käyttävät https: Sen sijaan http : aina kun mahdollista.
    * Paljon pieniä muutoksia.

## Versio 1.70{#version-170} 
 (julkaistu 2016-04-15) 

*    **Uudet ominaisuudet (käyttäjille) :** Ei
     
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** Alla on useita suositeltuja muutoksia dokumentaation setup.xml tiedosto.
Tee nämä muutokset nyt.
30 minuutin työ voi säästää tunteja hämmennystä tulevaisuudessa.
    * Virheen korjaaminen: Ongelmana oli se, että pyynnöt ohjattiin kauko-ohjaamoon. ERDDAP epäonnistui virheellinen merkki ' | Virheviesti. Tämä tapahtui vain Tomcatin tuoreilla versioilla. Kiitos Rusty Hollemanin, Conor Delaneyn ja Roy Mendelssohnin.
    * Virheen korjaaminen: ERDDAP™ Nyt käyttää ajan tasalla versio netcdf-java (Se on pitkä tarina.) joka sisältää ajantasaista tukea NcML, joka korjaa ongelman NcML LogicalReduce ei toimi odotetulla tavalla. Metatiedoissa voi olla joitakin pieniä muutoksia, jotka ERDDAP™ lukee kautta netcdf-jaava alkaen .nc , .hdf , .grib, ja .bufr tiedostoja. Kiitos Favio Medranon.
    * Uusi [EDDtableAggregateRows](/docs/server-admin/datasets#eddtableaggregaterows) Voit tehdä yhdistetyn EDDTable-aineiston kahdesta tai useammasta EDDTable-aineistosta, joissa on samat tietomuuttujat samoja yksiköitä käyttäen. Kiitos Kevin O'Brienille.
    * Uusia vaihtoehtoja EDDtableFromDatabase ( [sourceCan OrderBy](/docs/server-admin/datasets#sourcecanorderby) sekä [lähdeCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct) ) Määrittele, ERDDAP™ , tietokanta, tai molemmat, käsitellä erillisiä ja orderBy   (ja kaikki vaihtoehdot) rajoitukset. Kiitos David Karugan.
    * Voit nyt saattaa yksityisen aineiston kaaviot ja metatiedot yleisön saataville uuden [&lt;graafitKäytettävissä&gt;julkiselle&lt;/graphsAccessible to &gt;] (/docs/server-admin/datasets#graphs accessed to) Tag. Kiitos Emanuele Lombardin.
    * Nyt, jos merkkijono kulkee GeneDatasets Xml tai DasDds ympäröi kaksinkertainen lainausmerkkejä, se on noteeraamaton (Kuin se olisi JSONin merkkijono.) . John Kerfootin ja Melanie Abecassisin ansiosta.
    * Luo tiedostoja Xml nyt tukee "oletus" saada oletus ja "ei mitään" saada tyhjä merkkijono (ne toimivat lainausmerkeillä tai ilman niitä) . Tämä ratkaisee joitakin ongelmia, jotka liittyvät kulkee tyhjiä kieliä.
    * Nyt, GenerateDatasets Xml, kaikille EDDGrid Kansiosta ja EDDTablesta Tietoaineistoista, jos näyte Määrittelemäsi tiedostonimi on "" (tyhjä merkkijono) , se käyttää viimeisin täsmäävä tiedostoNimi hakemistosta + regex + rekursiivinen=true.
    * Päivitetty: NäyttöInBrowser koodi, jota käytetään näyttämään tulokset GenerateDatasetsXml ja DasDds Linux tietokoneet oli vanhentunut ja antoi outoa viestiä Netscape. Tämä käyttää modernia Linux-työkalua: xdg-open. Kiitos Melanie Abecassisin.
    * • allDatasets Tiedosto on nyt "files" sarake, joka ilmoittaa linkin / tiedostojen perus URL-osoitteen (jos) tietoaineistosta.
    * Parannetaan yleistä turvallisuutta ERDDAP™ muuttamalla tomcat-hakemistoon ja isoon ParentDirectoryyn liittyviä oikeuksia:
         (Alla olevat komennot ovat Linuxille. Muiden käyttöjärjestelmien osalta on tehtävä vastaavia muutoksia.) 
        * Muuta "ryhmäksi" tomcat, käyttäjätunnuksesi tai pienen ryhmän nimi, johon kuuluu tomcat ja kaikki Tomcat/ ERDDAP , esimerkiksi
chgrp -R _ yourUserName_ apache-tomcat-_8.0.23_
chgrp - R _oma Käyttäjänimi bigPentDirectory_
        * Muuta oikeuksia niin, että tomcat ja ryhmä ovat lukeneet, kirjoittaneet, suorittaneet oikeuksia esim.
chmod - R ug+rwx apache-tomcat-_8.0.23_
chmod -R ug+rwx _isoParentDirectory_
        * Poista "toisen" käyttäjän oikeudet lukea, kirjoittaa tai suorittaa:
chmod - R o-rwx apache-tomcat-_8.0.23_
chmod -R o-rwx _bigParentDirectory _
Tämä on tärkeää, koska se estää muita käyttäjiä lukemasta mahdollisesti arkaluonteisia tietoja ERDDAP™ asettaa tiedostoja, lokitiedostoja ja tiedostoja, joissa on tietoa yksityisistä tiedostoista.
    * Tunnistautumis-/login-järjestelmä uusittiin. Kiitos Thomas Gardnerin, Emanuele Lombardin ja Yhdysvaltain hallituksen uuden [Vain HTTPS-standardi](https://home.dotgov.gov/management/preloading/dotgovhttps/) .
        * Autentikointi=peninkulmainen vaihtoehto poistettiin. Se oli vanhanaikaista.
        * Uusi, suositeltava [tunnistautuminen = google](/docs/server-admin/additional-information#google) option käyttö Google- kirjaudu sisään (Perustuu OAuth 2.0:een) sallia kenen tahansa Googlen sähköpostitilin (mukaan lukien Google hallinnoi tilejä kuten @noaa.gov ) Kirjautua sisään.
        * Uusi. [tunnistautuminen=sähköposti](/docs/server-admin/additional-information#email) vaihtoehto on varmuuskopiointi autentikointi=google. Se mahdollistaa käyttäjille&lt;käyttäjä&gt; tag in datasets.xml kirjautua sisään lähettämällä heille sähköpostia, jossa on erityinen linkki.
        * In the setup.xml, ole hyvä ja muuta kuvaus&lt;todennus&gt; on
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

        * Lisää tämä setup.xml alla&lt;todentaminen&gt; tunniste
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

        * Nyt käyttäjät, jotka eivät ole kirjautuneet sisään voivat käyttää http tai https URL-osoitteet (jos olet perustanut&lt;baseHtpsUrl&gt; in your setup.xml). Kiitos Yhdysvaltain uuden hallituksen [Vain HTTPS-standardi](https://https.cio.gov/) .
        * Nyt voit kannustaa kaikkia käyttäjiä käyttämään https   (ei http ) asetus&lt;baseUrl&gt; olla https URL. Vain käyttäjien pakottaminen https , sinun täytyy myös tehdä muutoksia apache / Tomcat asetukset estää ei-- https Pääsy. Kiitos Yhdysvaltain uuden hallituksen [Vain HTTPS-standardi](https://https.cio.gov/) .
            
In the setup.xml, ole hyvä ja muuta kuvaus&lt;baseUrl&gt; on
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

        * Vaihtoehdot&lt;Salasana Koodaus&gt; Muuttunut. In the setup.xml, ole hyvä ja muuta kuvaus&lt;salasanaEncoding&gt; to be
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

        * In the setup.xml, ole hyvä ja muuta kuvaus&lt;baseHtpsUrl&gt; on
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

        * Nyt, jos listaPrivateDatasets=true in setup.xml, vielä vähemmän tietoa näytetään tietoaineistoista, joihin käyttäjällä ei ole pääsyä.
    * Nyt, varsinkin kun olet aluksi perustaa oman ERDDAP , voit nyt kertoa ERDDAP™ ei yritä tilata etä ERDDAP™ tiedot. Kiitos Filipen, Rocha Freiren.
Sinun setup.xml, juuri ennen&lt;fontFamily&gt;, lisää
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

    * Setup.xml, alla olevissa ohjeissa&lt;Sähköpostiosoite&gt;, ole hyvä ja lisää:
Jos mahdollista, aseta tämä turvallisen yhteyden käyttöön (SSL / TLS) sähköpostipalvelimelle.
Jos asetukset eivät käytä suojattua yhteyttä sähköpostipalvelimeen, tee muutokset tehdäksesi niin.
    * • datasets.xml , lisää tämä rivi kuvauksen&lt;tilausSähköpostiMusta lista&gt; datasets.xml :
Voit käyttää nimeä "\\*" mustalle listalle koko verkkotunnus, esim.\\*@example.com .
    * Koska muutos kirjautumisjärjestelmään v1.66, lokitiedosto ei ole koskaan ajan tasalla. Lokitiedostoon kirjoitetaan aina viestejä tai osia viesteistä. Nyt voit tehdä siitä ajan tasalla (hetkeksi) katsomalla ERDDAP Tilan verkkosivu http://_your.domain.org_/erddap/status.html .
    * HashDigest...
    * Pieni muutos (String2. kanoninen) että pitäisi auttaa pitämään asiat liikkeessä nopeasti kun ERDDAP™ on erittäin kiireinen ja myös paremmin käsitellä erittäin suuri määrä tietoja.
    * Vahvasti Suositeltava: lopeta käyttö&lt;MuuntaaPublicSourceUrl&gt; in datasets.xml muuntaa IP-numeron tietokokonaisuuden&lt; sourceUrl &gt; (esim. http://192.168.#.#/ ) verkkotunnukseen (esim. http :my.domain.org/) . Tästä lähtien uudet tilaukset http://localhost , http://127.0.0.1 ja http://192.168.#.# URLS ei ole sallittu turvallisuussyistä. Joten käytä aina julkista verkkotunnusta&lt; sourceUrl &gt; tag (tarvittaessa DNS-ongelmien vuoksi) , voit käyttää [/etc/host-pöytä palvelimellasi](https://linux.die.net/man/5/hosts) ratkaista ongelma muuntamalla paikalliset verkkotunnukset IP-numeroita ilman DNS-palvelimen. Voit testata, jos tietty verkkotunnus saadaan kunnolla ratkaistua käyttämällä
ping _some.domain.name_
    * TuodaDatasets.xml, etätiedostoja (esim. THREDDS-palvelimelta) , automaattisesti luotu datasetID Useimmilla aloilla ne eivät muutu. Muutamilla aloilla ensimmäinen osa (eli nimi) automaattisesti luotu datasetID Se on vähän erilainen. Etenkin nimillä, joilla oli yksi osa, on nyt todennäköisemmin kaksi osaa. Esimerkiksi tiedot http://oos.soest.hawaii.edu aiemmin datasetID s joka alkoi Havaijilla\\_, mutta nyt johtaa datasetID Se alkaa Havaijilla. Jos tämä aiheuttaa ongelmia, lähetä sähköpostia. Voi olla jokin keino.
    * Cassandra-kuljettaja päivitettiin Cassandra-driver-core-30,0.jar ja siten Cassandra v3. EDDtableFromCassandra ei hyödynnä uusia ominaisuuksia Cassandra v3. Indexes Cassandra voi nyt olla monimutkaisempi, mutta ERDDAP™ käyttää edelleen Cassandra v2-indeksimallia, jossa oletetaan, että indeksoitu sarake voidaan suoraan kysyä '=' rajoitukset. Luo tiedostoja Xml EDDtableFromCassandra ei enää havaitse sarakkeita indeksit; jos indeksi on yksinkertainen, sinun täytyy täsmentää se datasets.xml käsin. Jos tarvitset tukea monimutkaisempiin hakemistoihin tai muihin uusiin ominaisuuksiin, lähetä sähköpostia erd.data at noaa.gov .
&#33; Jos käytät edelleen Cassandra 2.x -valmistetta, jatka käyttöä ERDDAP™ v1.68 kunnes päivität Cassandra 3.x.
    * Jars ja Classpath -- Lähes kaikki mukana kolmannen osapuolen .jar tiedostot päivitettiin niiden uusimpiin versioihin.
        * Slf4j.jar lisättiin /lib ja luokkapolku.
        * Joid. Purkki ja tsik. Purkki poistettiin /lib ja luokkapolku.
        * Jos saat virheviestejä luokista, joita ei löydy koottaessa tai suoritettaessa ERDDAP™ tai jokin sen työkaluista, vertaa komentorivin luokkapolku ERDDAP S [nykyinen luokkapolku](/docs/contributing/programmer-guide#development-environment) Selvittää, ketkä ovat kateissa luokkapolultasi.

## Versio 1.68{#version-168} 
 (julkaistu 2016-02-08) 

*    **Uudet ominaisuudet (käyttäjille) :** Ei
     
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    *    [ EDDGrid Tiedostoista Kokoaminen tiedostonimien tai maailmanlaajuisten metatietojen avulla](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) --
Kaikki muutokset EDDGrid FromFiles voi nyt yhdistää joukon tiedostoja lisäämällä uuden vasemmanpuoleimman ulottuvuuden, yleensä ajan, joka perustuu arvo johdettu kustakin tiedostonimestä tai arvo maailmanlaajuisen ominaisuuden, joka on kussakin tiedostossa.
    * PARANTAA: Olemme aiemmin ehdottaneet, että haluat luoda EDDGrid Erddapin aineistosta datasets.xml joka viittasi ja served jplMU RSS T-aineisto ERDDAP . Koska aineistosta on nyt uudempi versio, se tietokokonaisuus on nyt vanhentunut. Joten jos sinulla on se tietoaineisto ERDDAP™ , lisää tämä uusi tietokokonaisuus
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Jos haluat poistaa vanhan jplMU RSS T-aineisto ERDDAP™   (Se on sinun valintasi.) , muuttaa sen aktiivinen asetus "tosi" "väärä."
    * Virheen korjaaminen: Tarkista bigPentDirectory, että olet määritellyt setup.xml. Jos et laittaisi viiltoa loppuun&lt;bigPerentDirectory&gt; nimi, sitten ERDDAP™ on luonut useita hakemistoja liittämällä sanoja suoraan mainitsemaasi nimeen sen sijaan, että olisit luonut alihakemistoja. Aloitetaan versiolla 1.68. ERDDAP™ Lisää slash lopussa hakemiston nimi, jos et määrittele yksi. Joten jos aiemmin ei määritellä viilto lopussa, sitten kun asennat ERDDAP™ v1.68 sinun täytyy siirtää ja nimetä uudelleen hakemistot **jälkeen** Sinä sammutat vanhan ERDDAP™ sekä **ennen** Käynnistät uuden ERDDAP . Esimerkiksi, jos olet virheellisesti määritellyt bigPentDirectory kuten /home/erddapBPD (ei jälkiviivaa) sekä ERDDAP™ on virheellisesti luonut hakemistoja kuten
/koti/perddapBPDcache
/koti/perddapBPDcopy
/home/erddapBPDdataset
/koti/perddapBPDflag
/kotisivutBPDlogit
/koti/perddapBPDluseeni
ja tiedoston nimeltä /home/erddapBPDscriptionsV1.txt,
sitten sinun täytyy siirtää ja nimetä ne uudelleen olla
/koti/perddapBPD/välimuisti
/koti/perddapBPD/kopio
/koti/perddapBPD/dataset
/koti/perddapBPD/lippu
/koti/perddapBPD/logs
/koti/perddapBPD/luseeni
ja /home/erddapBPD / reseptitV1.txt
    * Virheen korjaaminen: Siellä oli ötököitä. EDDGrid LonPM180 ERDDAP™ v1.66, joka tapahtui, kun lapsitieto on EDDGrid -Erddapilta.
    * Virheen korjaaminen: Siellä oli ötökkä. EDDGrid Kansiosta ja EDDTablesta Files in ERDDAP™ v1.66 joka aiheutti&lt;updateEveryNMillis&gt; ei oteta huomioon ensimmäistä kertaa tiedosto ladattiin uudelleenkäynnistyksen jälkeen.
    * Vikakorjaus/Uusi ominaisuus: Jos lapsiaineisto on sisällä EDDGrid Aggregaatti EDDGrid Selvä. EDDGrid EDDTablesta EDDGrid LonPM180 EDDGrid SideBySide, EDDTableCopy tai EDDTableFrom EDDGrid on ...FromErddap aineisto, että emo aineisto nyt merkitsee kohde ERDDAP™ tietokokonaisuus. Jos kohde-etuutena on ERDDAP™ tietokokonaisuus on samassa ERDDAP™ , tilaus ja sen validointi tehdään suoraan; et saa sähköpostia pyytää sinua vahvistamaan tilauksen. Muussa tapauksessa, jos tilausjärjestelmä ERDDAP™ on sammutettu, aseta&lt;reloadEveryNMinutes&gt; asetus emoaineistosta pieneen määrään (60?) Jotta se pysyy ajan tasalla.
    * Vikakorjaus/Uusi ominaisuus: Jos lapsiaineisto on sisällä EDDGrid Aggregaatti EDDGrid Selvä. EDDGrid EDDTablesta EDDGrid LonPM180 EDDGrid SideBySide, EDDTableCopy tai EDDTableFrom EDDGrid on aktiivinen="false," että lapsi aineisto on nyt ohitettu.

## Versio 1.66{#version-166} 
 (julkaistu 2016-01-19) 

*    **Uudet ominaisuudet (käyttäjille) :** 
    * Kaaviot (ei karttoja) Akseleilla voi nyt olla laskevat arvot. Saadaksesi tämän, kun käytät Make A Graph -sivua, vaihda uusi Y Axis: nouseva asetus (oletus) Laskeudumme. Tai, URL, joka pyytää kaavion, käytä uutta vapaaehtoista 3. " | ' Parametri [& x Etäisyys ja/tai &. YRange-kytkimet](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) , joka ei voi olla mitään (oletus) , totta, tai t saada nousevia arvoja, tai käyttää vääriä tai f saada laskevat arvot. Todellinen | väärät arvot ovat epäherkkiä. Kiitos Chris Fulliloven, John Kerfootin, Luke Campbellin ja Cara Wilsonin.
    * Käyttäjät voivat nyt määrittää taustaväri kaavioita lisäämällä &.bgColor=0x_ AARGGBB_ vaihda URL-osoitteeseen, joka pyytää kaaviota. Katso .bgColor Graphics komentoja osassa [griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) sekä [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands) asiakirjat. John Kerfootin ja Luke Campbellin ansiosta.
    * Taulukon tietokokonaisuuksissa rajoitteet voivat nyt viitata min (_joku variableName_) tai enintään (_joku variableName_) . Katso [min () ja enintään () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) . John Kerfootin ansiosta.
    * Taulukon tietokokonaisuuksien aikarajoitukset [Nyt](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) voi nyt määrittää aikayksiköt millisekuntia tai millis.
    * Pyyntö kuva taulukko aineisto nyt tekee kartan (ei kaaviota) jos x- ja y-muuttujat ovat pituusasteen ja leveysasteen kaltaisia muuttujia (yhteensopivat yksiköt) . Kiitos Rich Signellin.
    * Virheen korjaaminen: Aika-akseli tarrat ja punkit joskus ollut outoja sääntöjenvastaisuuksia, kun pyydetään useita kaavioita samanaikaisesti (esim. verkkosivulla) . Ongelma oli vika SVT-grafiikkakirjastossa, että ERDDAP™ Käyttö (Yksi muuttuja oli "staattinen," jonka ei olisi pitänyt olla) . Kiitos Bradford Butmanin.
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * Se on turvallisuusriski laittaa sähköpostin salasanan tavallinen tekstitiedosto, kuten setup.xml. Lieventääksemme tätä ongelmaa suosittelemme vahvasti, että:
        1. Aseta sähköpostitili vain ERDDAP Käyttö, esim. erddap@ yourInstitution.org . Tämä on myös muita etuja, erityisesti enemmän kuin yksi ERDDAP™ hallinnoijalle voidaan antaa pääsy tälle sähköpostitilille.
        2. Tee oikeudet setup.xml tiedosto rw (lue+kirjoitus) käyttäjälle, joka johtaa Tomcatia ja ERDDAP™   (käyttäjä=tomcat?) ja ilman oikeuksia (ei lue tai kirjoita) ryhmälle ja muille käyttäjille. Kiitos Filipen, Rocha Freiren.
    * Uusi [ArchiveADataset](/docs/server-admin/additional-information#archiveadataset) työkalu yksinkertaistaa tekemistä .tar  .gz arkiston osajoukko aineisto muodossa, joka sopii arkistointi (erityisesti NOAA NCEI) . Tämän pitäisi olla hyödyllistä monille ERDDAP™ hallinnoijia monissa tilanteissa, mutta erityisesti ryhmille sisällä NOAA .
    * Uusi tietokokonaisuustyyppi [ EDDGrid FromNcFilesUnpackage](/docs/server-admin/datasets#eddgridfromncfilesunpacked) on EDDGrid NcFilesistä. Erona on, että tämä luokka purkaa jokaisen tiedoston ennen EDDGrid FromFiles katsoo tiedostoja:
        
        * Se purkaa pakattuja muuttujia, jotka scale\\_factor ja/tai add\\_offset .
        * Se edistää kokonaisluku muuttujia, jotka ovat \\_Unsigned=true attribuutit suurempi kokonaisluku tiedon tyyppi niin, että arvot näkyvät allekirjoittamattomia arvoja. Esimerkiksi \\_allekirjoittamaton=oikea tavu (8 bittiä) muuttujasta tulee allekirjoitettu lyhyt (16 bittiä) muuttuja.
        * Se muuntaa\\_FillValue ja missing\\_value NaN:n arvot (tai MAX\\_VALUE kokonaislukutietotyypeille) .
        
Suuri etu tämän luokan on, että se tarjoaa tapa käsitellä erilaisia arvoja scale\\_factor , add\\_offset , \\_ FillValue tai missing\\_value eri tiedostoissa kokoelmassa. Muuten sinun pitäisi käyttää työkalua kuten [NcML](/docs/server-admin/datasets#ncml-files) tai [ NCO ](/docs/server-admin/datasets#netcdf-operators-nco) muokata kunkin tiedoston poistaa eroja niin, että tiedostot voidaan käsitellä EDDGrid NcFilesistä. Jotta tämä luokka toimisi asianmukaisesti, tiedostojen on noudatettava CF-standardeja niihin liittyvien ominaisuuksien osalta. Kiitos Philippe Makowskin.
    * Uusi tietokokonaisuustyyppi [ EDDGrid LonPM180](/docs/server-admin/datasets#eddgridlonpm180) voit muuttaa tietoja, jotka ovat joitakin pituuspiirin arvoja yli 180 (esim. vaihteluväli 0-360) tietokokonaisuuksiin, joiden pituuspiirin arvot ovat -180-180 (Pituusaste Plus tai Miinus 180, joten nimi) . Suuri etu tarjota tietoja pituuspiirin arvoja välillä -180 180 on, että OGC palvelut (esim. WMS ) vaatia pituuspiirin arvoja tällä alueella. Lynne Tablewskin, Fabien Guichardin, Philippe Makowskin ja Martin Spelin ansiosta.
2016-01-26 Päivitys: Eeek&#33; Tämä on vika, joka tapahtuu, kun lapsitieto on EDDGrid Erddapista, joka viittaa samaan aineistoon ERDDAP . Tämä vika on korjattu ERDDAP™ v1.68.
    * Sisään [Luo DatasetsXml](/docs/server-admin/datasets#generatedatasetsxml) , uusi tietokokonaisuustyyppi, EDDGrid LonPM180FromErddapCatalog, voit luoda datasets.xml B. EDDGrid LonPM180 dataa kaikista EDDGrid tiedot ERDDAP joiden pituuspiirin arvot ovat yli 180.
    * Kaikki EDDGrid tietoaineistot, datasets.xml Voit nyt käyttää valinnaista
[&lt;Esteetön Via WMS &gt;true | väärä&lt;/käytettävissä Via WMS &gt;] (/docs/server-admin/datasets# accessible viawms)   (oletus=true) . Tämän asettaminen vääräksi väkisin poistaa käytöstä WMS Tämän tietokokonaisuuden palvelu. Jos se on totta, aineisto ei välttämättä ole vielä saatavilla WMS muista syistä (esim. ei lat- tai lon-akselia) . Tämä on erityisen hyödyllistä aineistoja, jotka ovat olemassa yksin ja kääritty EDDGrid LonPM180, jotta vain LonPM180-versio on käytettävissä WMS .
    * Vuonna setup.xml, voit määrittää eri oletusväri taustakuvat. Väri määritellään 8-numeroisena heksadesimaaliarvona muodossa 0x_AARRGGBB_, jossa AA, RR, GG ja BB ovat kaksinumeroiset heksadesimaalinumerot. Huomaa, että kangas on aina läpinäkymätön valkoinen, joten (puoli -) läpinäkyvä graafinen taustaväri sekoittuu valkoiseen kankaaseen. Oletusarvo on vaaleansininen:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
John Kerfootin ja Luke Campbellin ansiosta.
    * Vuonna setup.xml, voit nyt määrittää maksimikoon [lokitiedosto](/docs/server-admin/additional-information#log)   (kun se on nimetty lokikirjaksi. txt. Edellinen ja uusi loki. txt on luotu) MegaBytesissä. Sallittu vähimmäismäärä on 1. Sallittu enimmäismäärä on 2000. Oletus on 20 (Mt) . Esimerkiksi:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * Sisään datasets.xml , [&lt;fgdcFile&gt; (/docs/server-admin/datasets#fgdcfile) tai [&lt;iso19115File&gt; (/docs/server-admin/datasets#iso19115file) voi nyt olla paikallinen tiedosto (kuten ennen) tai URL (joka ladataan niin on paikallinen kopio) . Jos ERDDAP™ ei voi ladata tiedostoa, tiedoston lataus jatkuu, mutta tiedostossa ei ole fgdc- tai iso19115-tiedostoa.
    *    EDDGrid Kansiosta ja EDDTablesta FromFiles-aineistot voivat nyt tehdä nopeanRestart (järjestelmä, joka ERDDAP™ yrittää käyttää, kun tietoaineistot ensin ladataan ERDDAP™ aloitetaan uudelleen) . Tämä nopeuttaa uudelleenkäynnistystä ERDDAP .
2016-01-26 Päivitys: Eeek&#33; Tämä on vika, joka aiheuttaa&lt;updateEveryNMillis&gt; ei oteta huomioon ensimmäistä kertaa tiedosto ladataan uudelleenkäynnistyksen jälkeen. Tämä vika on korjattu ERDDAP™ v1.68.
    * Yleinen parannus pikakäynnistysjärjestelmään mahdollistaa ERDDAP™ ladata tiedostoja nopeammin, kun ERDDAP™ on käynnistetty uudelleen.
    * Kaikki EDDGrid Kansiosta ja EDDTablesta FromFiles alaluokat nyt hyväksyä uuden&lt;polkuRegex&gt; tag, yleensä määritelty alla&lt;rekursiivinen&gt;. Jos rekursiivinen on "true," vain täydet alihakemistopolut, jotka vastaavat polkuaRegex (oletus=".\\*") hyväksytään. Samoin&lt; sourceUrl s&gt; tag in an EDDGrid AggregaattiExistingDimension voi nyt sisältää polkuRegex-attribuutin (oletus=".\\*") .
    * Oletus&lt;osittainenRequestMaxBytes&gt; in setup.xml on nyt 490000000 (~490 Mt) . Näin vältetään joitakin ongelmia / aikakatkaisuja, jotka liittyvät tietojen saamiseen THREDDS-tietopalvelimilta. Kiitos Leslie Thornen.
    * Pienen muutoksen lokijärjestelmään pitäisi mahdollistaa ERDDAP™ olla reagoivampi, kun se on hyvin, hyvin kiireinen. Tiedot on nyt kirjoitettu levyaseman lokitiedostoon melko suurissa paloissa. Etuna on, että tämä on hyvin tehokasta -- ERDDAP™ ei koskaan estä odottamasta tietojen kirjoittamista lokitiedostoon. Haittana on se, että loki päättyy lähes aina osittaiseen viestiin, joka valmistuu vasta kun seuraava pala on kirjoitettu.
    * Virheen korjaaminen liittyvät inotify ja [&lt;updateEveryNMillis&gt;] (/docs/server-admin/datasets#update everyenmillis) järjestelmä EDDGrid Kansioista ja EDDTablesta Tietoaineistoista: Ei ole enää tarpeen määritellä suurta fs.inotify.max\\_user\\_kelloa tai fs.inotify.max\\_user\\_instancesia. Siinä on vika. Java joka aiheuttaa joitakin osia Java 's inotify/WatchDirectory järjestelmä ei roskia kerätään, kun ne on viimeistelty; lopulta, määrä zombi inotify kellot tai tapaukset ylittäisi enimmäismäärä määritetty. ERDDAP™ Nyt toimii tämän ympärillä Java Ötökkä.
Myös, määrä inotify langat on listattu status.html web-sivulla, joten voit pitää silmällä sen käyttöä. Tyypillisesti, on 1 inotify lanka per EDDGrid Kansiosta ja EDDTablesta Tiedostoista.
    * Bug korjata: monissa paikoissa, sen sijaan, että virhe olisi uudelleenheitetty, syntyi uusi virhe, joka sisälsi vain lyhyen version alkuperäisestä virheviestistä ja ilman pino jälkiä. Nyt, kun uusi virhe on syntynyt, se sisältää asianmukaisesti koko alkuperäisen poikkeuksen esim., heittää uusi poikkeus ("uusi viesti," e) ;
Kiitos Susan Perkinsin.
    * Virheen korjaaminen: vasta äskettäin (V1,64?) jos .../ datasetID URL pyydettiin, ERDDAP™ lisäisi .html URL. V1.64 (väärin muotoiltu URL luotiin ja sitten epäonnistui) . Nyt tämä toimii taas. Kiitos Chris Fulliloven.

## Versio 1.64{#version-164} 
 (julkaistu 2015-08-19) 

*    **Uudet ominaisuudet (käyttäjille) :** 
    * Nyt on ohjeistus käyttää salasanasuojattua yksityistä ERDDAP™ Tiedostot ( https:// ) via curl sekä Python . Katso [ curl ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl) sekä [ Python ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python) ohjeet.
Kiitos NANOOSin Emilio Mayorgalle ja Spyglass Technologiesin Paul Janecekille.
         
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    *    ERDDAP™ Nyt vaatii Java 1,8+.
         Java 1.7 [Elämän loppu](https://www.oracle.com/technetwork/java/eol-135779.html)   (ei enää tietoturvapäivityksiä) huhtikuussa 2015. Tämä versio ERDDAP™ ei toimi versioiden Java alle 1.8. Jos päivität osoitteesta Java 1.7x (tai aiemmin) Sinun pitäisi myös päivittää Tomcatia. Katso [ ERDDAP™ Aseta ohjeet](/docs/server-admin/deploy-install) lataa linkkejä ja neuvoja.
    * Uusi tiedontarjoajan lomake.
Kun tietojen tarjoaja tulee luoksesi toivoen voivansa lisätä tietoja ERDDAP™ , voi olla vaikeaa ja aikaa vievää kerätä kaikki metatiedot tarvitaan lisätä aineisto ERDDAP . Monet tietolähteet (esimerkiksi .csv-tiedostot, Excel-tiedostot, tietokannat) ei ole sisäisiä metatietoja, joten ERDDAP™ on uusi tietojen tarjoaja lomake, joka kerää metatietoja tietojen tarjoajalta ja antaa tiedon tarjoajalle joitakin muita ohjeita, mukaan lukien laaja opastus tietojen tietokantaan. Toimitetut tiedot muunnetaan datasets.xml muoto ja sitten sähköpostitse ERDDAP™ hallinnoija (Sinä) ja kirjoittanut (Liite) bigParentDirectory/logs/dataProviderForm.log . Näin ollen lomake puoliautomaattinen prosessi saada aineisto osaksi ERDDAP™ , mutta ERDDAP™ hallinnoijan on vielä täytettävä datasets.xml chunk ja käsitellä saada tiedoston (tilu) palveluntarjoajalta tai tietokannasta. Lisätietoja: [Tietojen tarjoaja Lomakkeen kuvaus](/docs/server-admin/datasets#data-provider-form) .
    * Uusi&lt;MatchAxisNDIgits&gt;
voi käyttää EDDGrid Tiedostoista (ja siten NcFiles ja MergeIRFiles) , EDDGrid Aggregaatti EDDGrid Selvä. EDDGrid SideBySide-aineistot määrittää, kuinka tarkasti sama akseliarvot eri tiedostoja on (kuinka monta numeroa) : 0 = ei tarkastuksia (Älä käytä tätä&#33;) , 1-18 lisätä tarkkuutta, tai 20 (oletus) Tasa-arvon vuoksi. n=1-18 ERDDAP™ varmistaa, että ensimmäiset n numerot kaksinkertaiset arvot (tai (n+1) Kaksinumerotaso 2 kelluville arvoille) ovat tasa-arvoisia.
        &lt;matchAxisNDIgits&gt; korvaa&lt;varmistaaAxisValuesAreEqual&gt;, joka on nyt vanhentunut. Arvo 'tosi' muunnetaan vastaamaan AxisNDIgits=20. Väärä arvo (Älä tee tätä&#33;) muunnetaan täsmääväksi AxisNdigitit=0.
    *    EDDGrid Kansiosta ja EDDTablesta FromFiles lataa hyvin hitaasti ensimmäisen kerran käytät tätä versiota ERDDAP .
         ERDDAP™ nyt tallentaa sisäiset tiedostotiedot hieman eri tavalla, joten sisäinen tiedostotaulukko kunkin tietokokonaisuuden on rakennettava uudelleen. Älä huoli. Mikään ei ole vialla. Se on yhden kerran juttu.
    * Etälähdekooditiedostot
         EDDGrid FromNcFiles, EDDTableFromNcCFFiles antaa tiedostojen olla etätiedostoja hakemistossa, johon pääsee http://   (ja luultavasti https:// ja ftp://, mutta ne ovat testaamattomia) jos etäpalvelin tukee [Etäisyyspyynnöt](https://en.wikipedia.org/wiki/Byte_serving) pyynnön otsikossa. THREDDS ja Amazon S3 tukevat etäisyyspyynnöt, Hyrax Ei. Tämän järjestelmän avulla voit käyttää tietoja etätiedostoja lataamatta tiedostoja (joka on hyödyllistä, jos etätiedostot ovat liian laaja) , mutta pääsy näihin tiedostoihin on paljon hitaampaa kuin pääsy paikallisiin tiedostoihin tai jopa etä OPeNDAP Lähde.
Tähän sisältyy "files" Amazon S3 kauhassa, koska ne ovat saatavilla kautta http:// . Jos S3-olion nimet ovat kuin tiedostonimet (sisällä / on kuin Linux-hakemistopuu) , ERDDAP™ voi myös tehdä tiedostoja saatavilla kautta ERDDAP S "files" Järjestelmä. Jotta tämä toimisi, S3-tunnuksesi on oltava ~/.aws/ valtakirjat (Linuxissa, OS X:ssä tai Unix:ssä) , tai C:\\ users\\ USENAME\\.aws\\ cacters (Windowsissa) palvelimella kanssa ERDDAP . Katso [Amazon SDK -dokumentaatio](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1) .
    * Luo tiedostoja Xml on uusi, epätavallinen vaihtoehto: EDDsFromFromFiles.
Tämä menee tiedostojärjestelmän läpi (jopa etäjärjestelmä kuten Amazon S3 jos objektit ovat tiedoston kaltaisia nimiä) ja luoda datasets.xml Osaa sarjasta tietoja. Matkasi voi vaihdella. Tämä toimii hyvin, jos tiedostot on järjestetty niin, että kaikki tiedostot tietyn hakemiston (ja sen alihakemistot) soveltuvat yhteen tietokokonaisuuteen (Esim. kaikki SST 1 päivän komposiitit) . Muuten (Esimerkiksi, jos hakemisto sisältää joitakin SST-tiedostoja ja joitakin klorofylli-a-tiedostoja) , Tämä toimii huonosti, mutta voi silti olla hyödyllistä.
    * Ohjelmoijat: uudet /lib . jar tiedostot.
Jos kokoat ERDDAP™ , Huomaa uudet .jar tiedostot luokkapath -cp-parametrin lueteltu ERDDAP™   [Ohjelmoijan opas](/docs/contributing/programmer-guide) .
    * meri\\_vesi\\_käytännöllinen\\_suolaisuus
Jos käytät CF-standardinimi sea\\_water\\_salinity tahansa muuttuja, kehotan sinua vaihtamaan meri\\_water\\_practical\\_salinity joka on saatavilla [CF Standard-nimitaulukon versio 29](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)   (ja joitakin aiempia versioita -- En tiennyt, että) . Tämä nimi osoittaa, että tämä on todellakin käytännön suolapitoisuus arvo käyttäen Practical Salinity Units   ( PSU ) , verrattuna vanhempi g/kg arvo. Kanoniset yksiköt ovat erilaisia, mutta silti uskomattoman hyödyttömiä: 1 (Olettaen PSU PSS-78) , toisin kuin 1e-3 (Oletettavasti g/kg) merille\\_vesi\\_sality. \\[ Hei. Unidata ja CF: Tunnistamme arvot, jotka käyttävät muita asteikkoja, esimerkiksi Fahrenheit tai Celsius, kautta yksiköiden merkkijono, joka on nimi asteikon tai jonkin muun. Miksi emme tunnista suolaisuusyksiköitä niiden asteikolla, esim. PSS-78? Tiedän: PSS-78 arvot ovat "yhtenäisiä," mutta on olemassa implisiittinen mittakaava, eikö? Jos keksin uuden käytännöllisen suolapitoisuusasteikon, jossa arvot ovat 0,875-kertaiset PSS-78-arvoihin nähden, pitäisikö kanonisten yksiköiden olla vielä "1"? Miten käyttäjä voi erottaa heidät? Yksiköt 1e-3 ja 1 eivät ole kuvailevia tai hyödyllisiä käyttäjille, jotka yrittävät selvittää, mitä numerot osoittavat. \\] 

## Versio 1.62{#version-162} 
 (julkaistu 2015-06-08) 

*    **Uudet ominaisuudet (käyttäjille) :** 
    * -Ei. EDDGrid Tiedostot, käyttäjät voivat nyt tehdä Graph Tyyppi: Pintakuvat tahansa yhdistelmä numeerisia akseleita, ei vain pituuspiiri vs. leveysaste. Näin voit tehdä x vastaan y (ennuste) kaavioita ja erilaisia [Hovmöller-kaaviot](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram) , esimerkiksi, juoni Pituuspiiri vs. syvyys, tai aika vs. syvyys. \\[ Huom: jos syvyys on Y-akselilla, se luultavasti käännetään pois mitä haluat. Anteeksi, se ei ole vielä vaihtoehto. \\] Cara Wilsonin ja Lynn DeWittin ansiosta.
    * Uusi [Oceanic/Atmospheric Acronym Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html) jonka avulla voit muuntaa yhteisen valtameren / ilmakehän lyhenne / koko nimi.
    * Uusi [Oceanic/Atmospheric Muuttujan nimien muunnin](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html) jonka avulla voit muuntaa yhteisen valtameren / ilmakehän muuttuja nimi / koko nimi.
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    *    Java 7/8
         Oracle ei enää tukea (tarjoaa tietoturvavirheiden korjauksia)   Java 7. ERDDAP™ tukee edelleen Java 7, mutta siirry Java 8. Seuraava julkaisu ERDDAP™ todennäköisesti Java 8.
    *    valid\\_min /max/vaihteluväli
Aiemmin ja nyt, jos dataVariable oli scale\\_factor sekä add\\_offset metatiedot, ERDDAP™ purkaa data-arvot ja poistaa metatiedot. Aiemmin tapahtunutta: ERDDAP™ ei muuttanut tai purkanut mitään valid\\_range , valid\\_min , valid\\_max metatiedot (jotka yleensä/joiden pitäisi sisältää pakattuja arvoja) mennessä scale\\_factor sekä add\\_offset . Nyt on. Etsi ERDDAP™ "valid\\_" ja varmista, että kaikki muuttujat, jotka ovat valid\\_range , valid\\_min , tai valid\\_max oltava oikeat arvot, kun tiedot näkyvät uuden version ERDDAP . Katso [ valid\\_range /min/max-asiakirjat](/docs/server-admin/datasets#valid_range) .
    * ACDD-1,3
Aiemmin tapahtunutta: ERDDAP™   (erityisesti tuottaa datasetteja Xml) käytetty/suositeltiin alkuperäistä (1. 0) versio [ NetCDF Attribuuttisopimus Dataset Discoverylle](https://wiki.esipfed.org/ArchivalCopyOfVersion1) josta käytettiin nimitystä " Unidata Dataset Discovery v1.0" maailmanlaajuisissa yleissopimuksissa ja Metadata\\_Conventions ominaisuudet. Nyt suosittelemme [ACDD versio 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) joka ratifioitiin vuoden 2015 alussa ja josta käytetään nimitystä "ACDD-1,3." Onneksi ACDD-1.3 on erittäin taaksepäin yhteensopiva versio 1.0. SUOSITTELEE, että [siirtyminen ACDD-1.3:een](/docs/server-admin/datasets#switch-to-acdd-13) . Ei se ole vaikeaa.
    * Luo tiedostoja Xml- attribuutit
Muutoksia oli paljon.&lt; addAttributes &gt; arvot, joita GenerateDatasets ehdottaa Xml maailmanlaajuisille yleissopimuksille, creator\\_name /email/url, avainsanat, yhteenveto ja otsikko ominaisuudet ja muuttuja long\\_name attribuutti. Jotkin muutokset liittyvät ACDD-1.3:n uuteen käyttöön.
    * EDDTableFrom SOS Tiedostot
Satunnaisesti lisäämällä uusia tyyppejä SOS palvelimet ja muutokset vanhat palvelimet, se on tulossa vaikeampaa ERDDAP™ tunnistaa palvelimen tyyppi automaattisesti palvelimen vastauksista. Käyttö [&lt;sosServerType&gt; (/docs/server-admin/datasets#eddtable fromsos-beleton-xml)   (arvo IOOS\\_NDBC, IOOS\\_NOS, OOSTethys , tai KOKO) STRANGLY ON SUOSITETTU. Jos jokin tietokansiosi tämäntyyppisiä ongelmia uuden version ERDDAP , kokeile uudelleenajo GenerateDatasets Xml SOS palvelimen luoda uusi pala datasets.xml kyseisen aineiston osalta. Luo tiedostoja Xml voit kokeilla eri&lt;sosServerType&gt; -valinnat, kunnes löydät oikean palvelimelle. Jos sinulla on vielä ongelmia, kerro minulle ongelma näet ja URL palvelimen ja yritän auttaa.
    * EDDtableFromFileNames -aineistot
Jotkin suositellut ominaisuudet addAttributes ovat nyt lähdeAttributes. Sinun ei varmaan tarvitse muuttaa mitään olemassa olevia tiedostoja datasets.xml .
    * Bug korjaus liittyvät tiettyihin pyyntöihin EDDtableFromNcCF tiedostoja.
Lisäsin myös useita yksikkötestejä nykyisiin lukuisiin perusmenetelmien yksikkötesteihin. (On 100: n skenaarioita) . Eli Hunterin ansiosta.
    * Vikakorjaus / pieniä muutoksia EDDGrid Mergeiristä.
Jonathan Lafiten ja Philippe Makowskin ansiosta.
    * Virheen korjaaminen: EDDGrid FromErddap toimii nyt, vaikka etätiedosto ei ole ioos\\_category muuttujat.
Kiitos Kevin O'Brienin.
    * Vika korjata . graph verkkosivuilla EDDGrid tiedot, kun on olemassa vain yksi akselimuuttuja, jolla on useampi kuin yksi arvo.
Charles Carletonin ansiosta.
    * Oli muitakin pieniä parannuksia, muutoksia ja korjauksia.

## Versio 1.60{#version-160} 
 (julkaistu 2015-03-12) 

*    **Uudet ominaisuudet (käyttäjille) :** ei mitään
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * SUOSITELTU: Päivitä palvelimen [robotit.txt](/docs/server-admin/additional-information#robotstxt) tiedosto, johon sisältyy:
Poista: /erddap/files/
    * Ilmoita ongelmasta ja ratkaisu:
Linux-tietokoneissa, jos käytät&lt;updateEveryNMillis&gt; tiedot, joiden tyyppi = EDDGrid Kansioista. EDDGrid Kopio, DDDtableCopy, tai niiden alaluokat, saatat nähdä ongelman, jossa tietokokonaisuus ei ladata (satunnaisesti tai johdonmukaisesti) virheviestillä: "IOLukuun ottamatta: Käyttäjärajaa inotify-tilanteita saavutettu tai liian monta avointa tiedostoa." Jos on, voit korjata tämän ongelman soittamalla (juurina) :
kaiku fs.inotify.max\\_user\\_kellot=65536 | Te -a /etc/syctl.conf
kaiku fs.inotify.max\\_user\\_instances=1024 | Te -a /etc/syctl.conf
sysctl-p
Tai käytä suurempia numeroita, jos ongelma jatkuu. Oletus kellot on 8192. Tapausten oletusarvo on 128. \\[ -Ei. Java mikä aiheuttaa sen, että tapauksia ei kerätä roskia. Tämä ongelma vältetään ERDDAP™ v1.66 ja korkeampi. Joten parempi ratkaisu on siirtyä uusimpaan versioon ERDDAP . \\] 
    * NoSuchFilePoikkeus Virheen korjaaminen:
Oli vika, joka voi aiheuttaa tiedostoja tyyppi= EDDGrid Kansioista. EDDGrid Kopioi, EDDTableCopy tai niiden alaluokat ei ladata ajoittain virhe "NoSuchFilePoikkeus: _someFileName_." Virhe liittyy FileVisitorin käyttöön ja otettiin käyttöön ERDDAP™ v1.56. Ongelma on harvinainen ja vaikuttaa todennäköisesti tietoaineistoihin, joissa on suuri määrä usein muuttuvia tiedostoja.
    * Oli joitakin pieniä parannuksia, muutoksia, ja korjauksia.

## Versio 1.58{#version-158} 
 (julkaistu 2015-02-25) 

*    **Uudet ominaisuudet (käyttäjille) :** 
    * Uusi [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) järjestelmän avulla voit selata virtuaalinen tiedostojärjestelmä ja ladata lähdetiedostoja monista ERDDAP™ tiedot. • "files" järjestelmä toimii oletusarvoisesti, mutta ERDDAP™ ylläpitäjät voivat poistaa sen asettamalla
```
        <filesActive>false</filesActive>  
```
ae ERDDAP™ setup.xml-tiedosto. Erityiskiitos Philippe Makowskille, joka kesti, kun olin hidas arvostamaan tämän idean kauneutta.
    * määräpaikka Max... Aiemmin EDDTable-aineistojen aikamuuttujassa, jossa oli lähes reaaliaikaiset tiedot, oli määränpääMax of NaN, mikä tarkoitti, että aineiston enimmäisaika-arvo on tuore, mutta ei tarkasti tiedossa ja muuttuu usein. Nyt kohde Max on todellinen arvo, joka osoittaa tällä hetkellä tunnettu viimeksi. Monissa aineistoissa on jatkuvasti päivitetty tietoja. ERDDAP™ tukee uusimman tiedon saantia, vaikka se olisikin viimeksi tunnetun tiedon jälkeen. Huomaa, että uusi [&lt;updateEveryNMillis&gt;] (/docs/server-admin/datasets#update everyenmillis) tuki EDDGrid Kansiosta ja EDDTablesta FromFiles-aineistot päivittää aikamuuttujan kohdeMax. Toinen seuraus tästä muutoksesta on, että datasetID = allDatasets Tiedosto sisältää nyt maxTime-sarakkeissa tunnetun viimeisen kerran. John Kerfootin ansiosta.
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * SUOSITELTU: Päivitä palvelimen [robotit.txt](/docs/server-admin/additional-information#robotstxt) tiedosto, johon sisältyy:
Poista: /tiedostot/
Poista: /erddap/files/
    * Näyte datasets.xml -- Viime vuonna suosittelimme useita erinomaisia tietoja rannikkovartiostossa ERDDAP™ että voit lisätä oman ERDDAP™ vain lisäämällä muutaman rivin datasets.xml . Jos olet lisännyt erdVH-aineistot, vaihda uudempiin erdVH2-aineistoihin:
        * Tee kopio kaikista erdVH-aineistoista ja muuta kopioita datasetID Se on erdVH:sta erdVH2:ksi. sourceUrl ErdVH:sta erdVH2:een.
        * Aseta erdVH... tiedot aktiiviseen="false" .
    * Kaikki EDDGrid Kansiosta ja EDDTablesta FromFiles alaluokista nyt tukea [&lt;EsteetönViaFiles&gt;] (/docs/server-admin/datasets# accessibleviafiles) Saada lähdetiedostot saataville kautta "files" Järjestelmät. Oletuksena tämä järjestelmä on pois päältä jokaisen tiedoston osalta. Sinun täytyy lisätä merkki mahdollistaaksesi sen. Kiitos Philippe Makowskin.
    * Kaikki EDDGrid Kansiosta ja EDDTablesta FromFiles alaluokista nyt tukea [&lt;updateEveryNMillis&gt;] (/docs/server-admin/datasets#update everyenmillis) . Oletuksena tämä järjestelmä on pois päältä jokaisen tiedoston osalta. Sinun täytyy lisätä merkki mahdollistaaksesi sen. Kiitos Dominic Fuller-Rowellin ja NGDC:n.
    * Uusi [EDDtableFromFileNames](/docs/server-admin/datasets#eddtablefromfilenames) luo tiedoston palvelimen tiedostojärjestelmässä olevista tiedostoista, mutta se ei palvele tiedostojen tietoja. Tämä on hyödyllistä esimerkiksi kuvatiedostojen, äänitiedostojen, videotiedostojen, tekstinkäsittelytiedostojen ja taulukkolaskentatiedostojen kokoelmien jakelussa. Tämä toimii käsi kädessä uuden [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) järjestelmä, jotta käyttäjät voivat ladata tiedostoja. Erityiskiitos Philippe Makowskille, joka kesti, kun olin hidas arvostamaan tämän idean kauneutta.
    * Uusi [ EDDGrid DDDTablesta](/docs/server-admin/datasets#eddgridfromeddtable) Voit muuntaa taulukkotiedoston ruudukoksi. Kiitos Ocean Networks Canada.
    * Uusi [ EDDGrid FromMergeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles) paikallisen MergeIR-ryhmän aggregaatit .gz tiedostot. EDDGrid FromMergeIRFiles on ero on ensimmäinen osa koodin osaltaan ERDDAP . Se tehtiin täysin ilman apuamme. Kolme hurraa ja erityinen kiitos Jonathan Lafite ja Philippe Makowski R.Tech Engineering.
    * On uusi, valinnainen setup.xml tag,&lt;UnitTestDataDir&gt;, joka määrittelee yksikön testitietotiedostojen hakemiston, joka on saatavilla uuden GitHub-varaston kautta: [ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest) . Esimerkiksi:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Tämä ei ole vielä hyödyllistä, mutta se on osa pyrkimystä saada mahdollisimman monta muiden suorittamaa testiyksikköä. Kiitos Terry Rankinen.
    * Oli monia pieniä parannuksia, muutoksia, ja korjauksia.

## Versio 1.56{#version-156} 
 (julkaistu 2014-12-16) 

*    **Uudet ominaisuudet (käyttäjille) :**   (Ei ole) 
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * Luultavasti tiedät jo [ EDDGrid FromErddap](/docs/server-admin/datasets#eddfromerddap) sekä [EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap) jonka avulla voit linkittää tiedostoja muissa ERDDAP äm ERDDAP . Käyttäjä pyytää näiden tietoaineistojen todellisia tietoja näkymättömästi lähde ERDDAP™ , jotta data ei virtaa läpi järjestelmän tai käyttää kaistanleveys. Näytteessä on nyt suuri luettelo suositelluista tiedoista. datasets.xml in erddapContent .zip . -Ei. ERDDAP™ Sinun tarvitsee vain kopioida ja liittää haluamasi. datasets.xml . Kiitos Conor Delaneyn.
    * Jos kokoat ERDDAP™ , sinun täytyy lisätä joitakin uusia . purkki tiedostoja [luokkapolku -cp-kytkin](/docs/contributing/programmer-guide#development-environment) Javalle ja Javalle.
    * Uusi [EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra) käsittelee saada tietoja [Cassandra](https://cassandra.apache.org/) . Kiitos Ocean Networks Canada.
    * Uusi [EDDTableFromColumnarAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles) käsittelee saada tietoja ASCII datatiedostoja kiinteän leveyden sarakkeita. Kiitos Philippe Makowskin.
    * Kaikki EDDGrid Kansiosta ja EDDTablesta FromFiles alaluokat nyt käyttää uutta menetelmää, FileVisitor (lisätty Java 1,7) kerätä tietoja tiedostoista. Tästä ei välttämättä ole hyötyä tiedostotietojen ensimmäisessä keräämisessä tietystä aineistosta, mutta näyttää olevan valtava hyöty myöhemmille kokouksille, jos ne tehdään pian, kun taas käyttöjärjestelmä on edelleen välimuistissa. Kiitos NGDC:n.
        
Suosittelemme edelleen: Jos tiedostossa on suuri määrä tiedostoja (esim. &gt; 1000) , käyttöjärjestelmä (ja siten EDDGrid From Files and EDDTableF from Files) toimii paljon tehokkaammin, jos säilytät tiedostoja sarjassa alihakemistoja (yksi vuodessa tai yksi kuukaudessa aineistoista, joissa on hyvin usein tiedostoja) , jotta ei ole koskaan valtava määrä tiedostoja tietyssä hakemistossa.
        
    * Useita pieniä parannuksia EDDTableFromAsciiFiles.
    * Joitakin parannuksia EDDtableFromAsciiServiceNOS, erityisesti saada joitakin lisätietoja lähteestä. Kiitos Lynn DeWittin.
    * Joitakin pieniä korjauksia liittyvät ISO 19115 että ERDDAP™ luo. Kiitos Anna Milanin.

## Versio 1.54{#version-154} 
 (julkaistu 2014-10-24) 

*    **Uudet ominaisuudet (käyttäjille) :** 
    * Jotkut muuttujat toimivat nyt ajan kanssa millisekuntien tarkkuudella, esim., 2014-10-24T16:41:22.485Z. Kiitos Dominic Fuller-Rowellin.
*    **Pienet muutokset / viankorjaukset:** 
    * Bug fix: tiettyjen olosuhteiden yhdistelmä, EDDGrid FromNcFile-aineistot palauttivat tietoja pienemmällä tarkkuudella (esim. kellukkeet kaksoiskappaleiden sijaan) . Tämä voi vaikuttaa ainoastaan tietoarvoihin, joissa on yli 8 merkitsevää lukua. Pyydän anteeksi. (Se oli klassinen ohjelmointivirhe: yksi väärä hahmo.) Kiitos Dominic Fuller-Rowellin.
    * Paljon pieniä muutoksia.
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * Griddap-aineistot tukevat nyt aikaleiman akselimuuttujia ja tietomuuttujia (eli muuttujat, joilla on aika-arvot, mutta destinationName muu kuin "time" ) . Kiitos Dominic Fuller-Rowellin.
    *    ERDDAP™ tukee nyt oikein millisekuntia time\\_precision "1970-01-01T00:00:00:00.000Z." Yksi tahallinen oikku: kirjoittaessaan aikoja ihmissuuntautuneisiin tiedostoihin (esim. .tsv , .json , .xhtml ) , ERDDAP™ käyttää määriteltyä time\\_precision jos se sisältää sekunnit ja/tai desimaali sekuntia; muussa tapauksessa se käyttää sekuntia time\\_precision 1970-01-01T00:00:00Z (johdonmukaisuus ja taaksepäin yhteensopivuus) . Kiitos Dominic Fuller-Rowellin.
    *    EDDGrid FromNcFiles tukee lukemista dataVariable S.
    *    .nc griddapin kirjoittamat tiedostot voivat nyt olla merkkijono dataVariable S.
    * Luo tiedostoja Xml sisältää nyt enemmän huuhtelu () kehottaa välttämään sen, että tiedostoihin ei kirjoiteta tietoja. Kiitos Thierry Valeron.
    * GenerateDatasetsXml:n dokumentaatiota parannettiin erityisesti huomauttamalla, että -i-kytkin toimii vain, jos määrittelet kaikki vastaukset komentorivillä (esim. skriptitila) . Käsikirjoitustila on selitetty. Kiitos Thierry Valeron.
    *    ERDDAP™ ei enää salli kahta muuttujaa aineisto on sama sourceName . (Jos joku teki sen aiemmin, se luultavasti johti virheviesteihin.) Kuten ennenkin. ERDDAP™ ei salli kahta muuttujaa aineistossa on sama destinationName .

## Versio 1.52{#version-152} 
 (julkaistu 2014-10-03) 

*    **Uudet ominaisuudet:**   (ei mitään) 
*    **Pienet muutokset / viankorjaukset:** 
    * Toinen (pienempi) tehtävä muutos ERDDAP™ Nopeammin.
    * ISO 19115 -tiedostojen parantaminen ERDDAP : lisätty uusi suositus&lt;gmd:protocol&gt; arvot (tiedot, haku, OPeNDAP : OPeNDAP , ERDDAP :griddap ja ERDDAP : tabledap ) sisällä&lt;gmd:CI\\_OnlineResource&gt;. Derrick Snowdenin ja John Maurerin ansiosta.
    * Paljon pieniä muutoksia.
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * Bug korjaus: GenerateDatasetsXml.sh ja DasDds.sh eivät olleet erddap.war varten 1.48 ja 1.50. Nyt he ovat. Thierry Valeron ansiosta.
    * Pienet muutokset joihinkin nopeustesteihin TestAllissa, jotta ne olisivat vähemmän alttiita sattumalle. Kiitos Terry Rankinen.

## Versio 1.50{#version-150} 
 (julkaistu 2014-09-06) 

*    **Uudet ominaisuudet:**   (ei mitään) 
*    **Pienet muutokset / viankorjaukset:** 
    * Tämä ERDDAP™ pitäisi olla paljon nopeampi kuin viimeaikaiset versiot.
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:**   (Ei mitään) 

## Versio 1.48{#version-148} 
 (julkaistu 2014-09-04) 

*    **Uudet ominaisuudet:** 
    *    ERDDAP™ Nyt luo aina taulukkotietokanta, datasetID = allDatasets , joka on taulukko kaikista tietoaineistoista tässä ERDDAP . Sitä voidaan kysyä kuten mitä tahansa taulukkotiedostoa. Tämä on hyödyllinen vaihtoehto nykyiselle järjestelmälle saada tietoa aineistoista ohjelmallisesti.
    * On olemassa kaksi uutta tuloste tiedostotyypit EDDTable ja EDDGrid , .csv0 ja .tsv 0. Ne ovat pilkku- ja välilehti-eristettyjä-arvotiedostoja, joissa ei ole riviä sarakkeen nimiä tai yksiköitä. Tiedot alkavat ensimmäisellä rivillä. Ne ovat erityisen hyödyllisiä käsikirjoituksia, jotka haluavat vain yhden palan tietoa ERDDAP .
*    **Pienet muutokset / viankorjaukset:** 
    * Karttoja voidaan nyt tehdä pituusasteille -720-720.
    * Uusi .nc ml vastaus Tiedostotyyppi on saatavilla kaikille EDDGrid tiedot. Se palauttaa [NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html) \\- tiedoston muotoinen kuvaus (Samanlainen kuin yhdistetty .dds + .das) .
    * Vikakorjaus: Tallennetaan taulukkotiedot .nc tiedosto rajoitettiin 100 000 arvoon muuttujaa kohti. Nyt se on vain rajoitettu 2 GB koko tiedoston. Kiitos Kevin O'Brienin.
    * Vikakorjaus: saveAs Matlab menetelmät nyt varmistaa, että datasetID s muutetaan turvalliseksi Matlab Muuttuvia nimiä. Mutta suosittelen silti vahvasti, että luot datasetID s jotka ovat kelvollisia muuttujanimiä: alkaen kirjaimella ja sitten vain käyttämällä A-Z, a- z, 0-9 ja \\_. Katso [ datasetID ](/docs/server-admin/datasets#datasetid) . Kiitos Luke Campbellin.
    * Virheen korjaaminen EDDtableF-tiedostossa Tietokanta: Tietyillä tietokannoilla, NO\\_ Tietokannasta saatu tietotulos johti turhaan 30 sekunnin viiveeseen ERDDAP . Kiitos Greg Williamsin.
    * Virheen korjaaminen: EDDGrid Tee kaavio kuviolla = rivit (tai merkkiaineet ja viivat) pakotettu x akselin muuttuja ajaksi. Nyt se voi olla mikä tahansa akseli. Kiitos Lynn DeWittin.
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * SUOSITELTU SUOSITUS: Päivitys Java   
Tämä versio ERDDAP™ vaatii Java 7 tai enemmän, mutta Java 7 tulee loppuun huhtikuussa 2015 (Pian&#33;) , Joten nyt on hyvä aika vaihtaa Java 8. Joten Java 8:aa on muutettu. Testaan Java 8. Huomaa, että Java 6 saavutti elämänsä päättymisen helmikuussa 2013 (Ei enää turvavirheitä&#33;) .
    * SUOSITELTU SUOSITUS: Päivitys Tomcat
Jos käytät Tomcatia, vaihda Tomcatin uusimpaan versioon. Tomcat 8 on suunniteltu toimimaan Java 8.
    * " ERDDAP "ei ole enää lyhenne. Nyt se on vain nimi. En halua mainita nimeä. ERD . Haluan. ERDDAP™ korostaa instituutiota ja tietoja.
    * Ole kiltti. [muokata ulkonäköä ERDDAP™ laitos ja tietosi esille](/docs/server-admin/deploy-install#customize) . Tunnin työllä voit tehdä mukavia parannuksia, jotka kestävät ikuisesti.
    * Setup.xml,&lt;NäytäDiagnosticInfo&gt; vaihtoehto jätetään nyt aina huomiotta ja käsitellään ikään kuin arvo olisi väärä.
SUOSITTELEE:&lt;NäytäDiagnosticInfo&gt; tag ja siihen liittyvät tiedot setup.xml.
    * In setup.xml, oletus&lt; drawLandMask &gt; oli "yli," mutta nyt se on "ali," joka on parempi yleinen oletusarvo (toimii hyvin kaikkien tietokokonaisuuksien kanssa) .
    * GenerateDatasetsXml.sh ja DadDds.sh Linux skriptit nyt käyttää bash sijaan csh, ja on laajennus .sh. Kiitos Emilio Mayorgan
    * Luo tiedostoja Xml ja DasDds nyt luoda omia lokitiedostoja (GenerateDatasetsXml.log ja DasDds.log) ja tulostiedostot (LuodaDatasetsXml.out ja isäDds.out) _bigPerentDirectory_/logs/, eikä koskaan laita tuloksia leikepöydälle.
    * Luo tiedostoja Xml tukee nyt komentoriviparametria, joka syöttää tulosteen tiettyyn tiedostoon tietyssä paikassa. Katso [asiakirjat](/docs/server-admin/datasets#generatedatasetsxml) . Kiitos Terry Rankinen.
    * EDDtableFromDatabase tukee nyt&lt;SarakeNameQuates&gt;&lt;/sarakeNimiNameQuotes&gt;, jolla on voimassa olevat arvot " (oletus) Tai ei mitään. Tämä merkki (jos) käytetään ennen ja jälkeen sarakkeiden nimet SQL kyselyissä. Erityyppiset tietokannat, jotka on perustettu eri tavoin, tarvitsevat erilaisia sarakkeen nimi lainausmerkkejä.
    * Taulukon leveys- ja pituusastemuuttujat ovat nyt räätälöityjä long\\_name 's, esim., Profiili Leveysaste. Aiemmin ne olivat vain pituus- ja pituusasteita.
    * Tästedes määritä "oletusdataQuery" ja "oletusgraafinenQuery" attribuutteina tietokokonaisuuden maailmanlaajuisessa metadatassa (eli&lt;addAtts&gt;, ei erillisenä&lt;oletusDataQuery&gt; ja&lt;oletusGraphQuery&gt; tagit. (Vaikka, jos vielä määrität ne tunnisteiden kautta, ERDDAP™ luo automaattisesti maailmanlaajuisia ominaisuuksia tietoja.) 

## Versio 1.46{#version-146} 
 (julkaistu 2013-07-09) 

*    **Uudet ominaisuudet:** 
    *    (Ei ole) 
*    **Pienet muutokset / viankorjaukset:** 
    * Bug fix: In EDDtableFromDatabase, vain versiossa 1.44, ERDDAP™ väärin lainattu tietokannan taulukon nimeä SQL-lausunnoissa. Se on nyt korjattu. Kiitos Kevin O'Brienin.
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    *    ** Jos et muokkaa standardiviestejä viesteihin.xml,
poistaa \\[ tomcat \\] /content/erddap/messages.xml . **   
Oletusviestit.xml tiedosto on nyt erddap. Sotatiedosto, ei erddapContent .zip . Joten sinun ei enää tarvitse manuaalisesti päivittää viestejä.xml .
    * Jos muutat viestejä viestit.xml, tästä lähtien, joka kerta kun päivität ERDDAP™ joko:
        * Tee samat muutokset ennen kuin uusi
             \\[ tomcat \\] /webaps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
Ja tällä kertaa: poista \\[ tomcat \\] /content/erddap/messages.xml .
        * Tai, selvittää, mitä on muuttunut uusien viestien.xml (diff:n kautta) , ja muokata
             \\[ tomcat \\] /content/erddap/messages.xml tiedosto vastaavasti.

## Versio 1.44{#version-144} 
 (julkaistu 2013-05-30) 

*    **Uudet ominaisuudet:** 
    * Kyselyt DDDTablen tietokokonaisuuksiin nyt tukea & orderBy Vähintään (...) ja orderByMinMax  (...)   (joka palauttaa kaksi riviä kussakin ryhmässä, jossa on vähintään ja enintään orderBy arvo) . Kiitos Lynn DeWittin.
    * On kaksi uutta tabledap tiedostotyypit: .nc CFHeader ja .nc CFMA- otsikko (joka palauttaa vastaavan ncdump-tyyppisen otsikon .nc CF ja .nc CFMA-tiedostotyypit) . Steve Hankinin ansiosta.
*    **Pienet muutokset / viankorjaukset:** 
    * Bug fix: lataaminen .graph ja .html web-sivut tietokokonaisuuksia paljon aika-arvot oli hidas, koska ERDDAP™ oli hidas luotaessa aika liukusäädin vaihtoehtoja. Nyt se on aina nopea. Kiitos Michael Barryn, OOICI:n ja Kristian Sebastian Blalidin.
    * Virheen korjaaminen: Eräissä EDDTable-aineistotyypeissä aikarajoituksia ei aina käsitelty oikein. Nyt he ovat. John Maurerin ja Kevin O'Brienin ansiosta.
    * Bug korjaus: tiedot eivät ladata, kun kaikki subsetVariables olivat kiinteitä arvoja. Nyt he tulevat. Lynn DeWittin ja John Petersonin ansiosta.
    * PARANTAA: nyt kaikki kyselyt vain subset muuttujat toimivat ikään kuin & erota () on osa kyselyä.
    * PARANTAA: nyt, kyselyt, jotka sisältävät & .json p=_funktioName, _toiminto Nimi_ PITÄÄ nyt olla sarja 1 tai enemmän (jakso) Sanat. Kunkin sanan on alettava ISO 8859 -kirjaimella tai "\\_" ja sen jälkeen on oltava vähintään 0 ISO 8859 -kirjainta, numeroa tai "\\_" . Kyllä, tämä on rajoittavampaa kuin Java Toimintonimiä koskevat komentosarjan vaatimukset.
    * Aikaakseli kaavioita nyt toimii hyvin pidempiä ajanjaksoja (80-10 000 vuotta) ja lyhyemmät aikavälit (0,003 - 180 sekuntia) .
    *    ERDDAP™ on nyt enemmän anteeksiantavaa, kun jäsentämällä muutoksia ISO-8601-formaattien aikatiedot.
    * Oli monia muita pieniä muutoksia ja korjauksia.
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    *    **Sinun täytyy päivittää uusimpaan versioon ollaksesi varma.**   
         ERDDAP™ hänelle tehtiin turvatarkastus. Siellä oli ötököitä ja heikkouksia. Versio 1.44 sisältää useita tärkeitä tietoturvavirheitä ja useita muutoksia turvallisuuden ja saavutettavuuden parantamiseksi (Esimerkiksi näkövammaisille käyttäjille) . Versio 1.44 on läpäissyt turvatarkastuksen. Kiitos kaikille hyville ihmisille USGS ja Acunetix jotka tekivät tämän mahdolliseksi. (Ei pitäisi. NOAA Tehdä tämän?) 
    * Uusi [EDDTableFrom WFS Tiedostot](/docs/server-admin/datasets#eddtablefromwfsfiles) tekee paikallisen kopion kaikista tiedoista osoitteesta ArcGIS KarttaServer WFS palvelimen ja niin tiedot voidaan sitten palauttaa nopeasti ERDDAP™ käyttäjät. Christy Caudillin ansiosta.
    * Uusi [EDDTableFrom EDDGrid ](/docs/server-admin/datasets#eddtablefromeddgrid) voit luoda EDDTable-tiedoston EDDGrid tietokokonaisuus. Yleisiä syitä tähän ovat:
        * Tämä mahdollistaa aineiston kyselyn OPeNDAP valintarajoitukset (käyttäjä on saattanut pyytää) .
        * Aineisto on luonnostaan taulukkotietokanta. Kiitos OOICI:n, Jim Potemran, Roy Mendelssohnin.
    * Muuttuja nimi "syvyys" on nyt erityinen vaihtoehto "korkeus." Yksikköjen on oltava jokin "metrien" variantti. Tietojen arvojen on oltava positiivisia = alaspäin. ERDDAP™ on nyt täysin tietoinen "syvällinen" merkitys ja tukee sitä missä tahansa korkeudessa tuetaan (esim. CF DSG cdm\\_data\\_type=profile datan osana) . Aineistossa ei saa olla sekä "syviä" että "korkeusmuuttujia."
    * • datasets.xml , poista kaikki käyttötavat&lt;att name="cdm\\_altitude\\_proxy"&gt;syvyys&lt;/att&gt; koska syvyys on nyt erityinen vaihtoehto korkeus ja niin ei tarvitse erityisesti tunnistaa.
    * • datasets.xml , poista kaikki käyttötavat&lt;korkeusMetersPerSourceUnit&gt;, paitsi EDDTable Mistä SOS .
Kun arvo on 1, poista se.
Kun arvo on -1, harkitse muuttujan nimen muuttamista syvyyteen.
Lisää muihin arvoihin&lt; addAttributes &gt; esimerkiksi:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Kaikki tiedostot tukevat nyt
        
        *   &lt;oletusDataQuery&gt; jota käytetään, jos .html pyydetään ilman kyselyä.
            * Sinun tulee todennäköisesti harvoin käyttää tätä.
            * Ruudukkokarttaaineistojen osalta tätä käytetään yleisesti eri oletussyvyyden tai korkeusmitan määrittämiseksi (esim. \\[ 0 \\] Sen sijaan \\[ viimeinen \\] ) .
Joka tapauksessa, sinun pitäisi aina luetella kaikki muuttujat, aina käyttää samoja muuttujat, ja lähes aina käyttää \\[ 0 \\] , \\[ viimeinen \\] , tai \\[ 0:viimeinen \\] dimension arvot.
Esimerkiksi:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * -Ei. tabledap tietoaineistot, yleisin käyttö tämä on määrittää eri oletusaikaväli (verrattuna tähän, esim., &time&gt;= now- 1 vrk) .
Muista, että ei datamuuttujia on sama kuin kaikki tietomuuttujat, joten yleensä voit vain määritellä uuden aikarajoituksen.
Esimerkiksi:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;OletusGraphQuery&gt; jota käytetään, jos .graph pyydetään ilman kyselyä.
            * Sinun tulee todennäköisesti harvoin käyttää tätä.
            * Ruudukkokarttaaineistojen yleisin käyttötapa on määritellä eri oletussyvyys tai korkeusmitta-arvo (esim. \\[ 0 \\] Sen sijaan \\[ viimeinen \\] ) ja/tai täsmentää, että tietty muuttuja on graafinen.
Joka tapauksessa käytät lähes aina \\[ 0 \\] , \\[ viimeinen \\] , tai \\[ 0:viimeinen \\] dimension arvot.
Esimerkiksi:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * -Ei. tabledap tietoaineistot, yleisimpiä käyttötarkoituksia tämän on määritellä eri muuttujat on graafinen, eri oletusaikaväli (verrattuna tähän, esim., &time&gt;= now- 1 vrk) ja/tai eri oletusgrafiikan asetukset (esim. merkkityyppi) .
Esimerkiksi:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Muista, että sinun täytyy XML-encode tai prosentti-encode (joko yksi, mutta ei molempia) oletuskyselyt, koska ne ovat XML-asiakirjassa. Esimerkiksi, & tulee &amp; ,&lt;tulee &amp;lt; , ja &gt; tulee &amp;gt; .
Tarkistakaa työnne. On helppoa tehdä virhe ja olla saamatta mitä haluaa.
Charles Carletonin, Kevin O'Brienin, Luke Campbellin ja muiden ansiosta.
    *    EDDGrid Dapista. EDDGrid Erddapista ja EDDtablesta alkaen EDDGrid on uusi järjestelmä käsitellä tietoja, jotka muuttuvat usein (yhtä usein kuin noin joka 0,5 s) . Toisin kuin ERDDAP 's säännöllinen, proaktiivinen järjestelmä täysin ladata kunkin aineiston, tämä valinnainen lisäjärjestelmä on reaktiivinen (Käyttäjän pyynnöstä) ja (Päivitetään vain ajantasaistettavat tiedot.) . Jos esimerkiksi EDDGrid FromDap aineisto esiintyy enemmän kuin määritelty määrä millisekuntia jälkeen edellisen päivityksen, ERDDAP™ Katsotaan, onko vasemmalla uusia arvoja (yleensä "time" ) ulottuvuus ja, jos on, lataa nämä uudet arvot ennen käyttäjän pyynnön käsittelyä. Tämä järjestelmä on erittäin hyvä pitämään nopeasti muuttuvan tietokokonaisuuden ajan tasalla, ja tietolähteelle on asetettu minimaalisia vaatimuksia, mutta se hidastaa hieman joidenkin käyttäjäpyyntöjen käsittelyä. Katso [&lt;updateEveryNMillis&gt;] (/docs/server-admin/datasets#update everyenmillis)   
Michael Barryn ja OOICI:n ansiosta.
    *    EDDGrid FromNcFiles, EDDTableFromNcFiles, and EDDTableFromNcCFFiles [NcML .nc ml](/docs/server-admin/datasets#ncml-files) lähdetiedostojen sijasta .nc tiedostot. Kiitos Jose B Rodriguez Ruedan.
    * -Ei. EDDGrid Aggregaatti ERDDAP™ tukee uuden palvelimenType="dodsindex" vaihtoehto palvelimenType ominaisuus&lt; sourceUrl s&gt; tag. Tämä toimii web-sivuilla, jotka ovat luetteloita tiedostoja sisällä&lt;pre&gt;&lt;/pre&gt; ja usein alle OPeNDAP logo. Esimerkkinä mainittakoon [ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html) .
    * EDDTable From SOS tukee valinnaista tunnistetta
```  
        <sosServerType>_serverType_</sosServerType>  
```
joten voit määritellä tyypin SOS palvelin (Joten ERDDAP™ Ei tarvitse selvittää sitä.) . Kelvolliset arvot&lt;_serverType_\\&gt; ovat IOOS\\_NDBC, IOOS\\_NOS, OOSTethys , ja KOKO (uusi tuettu palvelin Tyyppi) . Katso [EDDTableFrom SOS ](/docs/server-admin/datasets#eddtablefromsos) . Derrick Snowdenin ja Janet Fredericksin ansiosta.
    * Kaikki EDDGrid Fileistä, EDDTableista... EDDGrid Kuittaan, ja EDDTable Kopioi nyt tuki valinnaista tunnistetta
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
joka voi kertoa ERDDAP™ säilyttää tiedosto Taulukko (tiedot kustakin lähdetiedostosta) muistissa eikä vain levyllä (oletus) . Muistitiedoston säilyttäminen nopeuttaa tietopyyntöjä (varsinkin jos lähdetiedostoja on &gt; 1000) , mutta käyttää enemmän muistia. Jos olet asettanut tämän todeksi mille tahansa tiedostolle, pidä muistia silmällä: käytät tällä hetkellä riviä _yourDomain_ /erddap/status.html varmistaa, että ERDDAP™ Hänellä on vielä paljon vapaata muistia. Kiitos Fredrik Strayn.
    * EDDtableFromASCIIFiles tukee nyt&lt;charset&gt;. Kaksi yleisintä sanakirjaa (Juttu on herkkä.) ovat ISO-8859-1 (oletus) ja UTF-8.
    * Suositeltava: setup.xml, sisällä&lt;KäynnistäHtml&gt;, vaihda&lt;html&gt; sisään
        &lt;html lang="en-US"&gt; (tai muuta [kielikoodi](https://www.w3schools.com/tags/ref_language_codes.asp) jos olet kääntänyt viestejä.xml) .
    * setup.xml on uusia valinnaisia tunnisteita poistaa osia ERDDAP :
        *   &lt;MuuntajatAktiivinen&gt;väärä&lt;/muuntajatAktiivinen&gt;&lt;&#33;-- oletus on totta --&gt;
        *   &lt;diaSorterActive&gt;false&lt;/lideSorterActive&gt;&lt;&#33;-- oletus on totta --&gt;
        *   &lt;wmsActive&gt;false&lt;/wmsActive&gt;&lt;&#33;-- oletus on totta --&gt;Yleisesti, suosittelemme asettamatta mitään näistä vääriksi.
    * Luo tiedostoja Xml nyt kirjoittaa tuloksia _bigParentDirectory_/logs/generateDatasetsXmlLog.txt, ei log.txt. Kristian Sebastian Blalidin ansiosta.
    * Luo tiedostoja Xml nyt tekee hyvän ehdotuksen&lt;lataa uudelleen EveryNMinutes&gt;. Kiitos NOAA UAF-projekti.
    * Monet pienet parannukset tuottaaDatasetsXml. Kiitos NOAA UAF-projekti.

## Versio 1.42{#version-142} 
 (julkaistu 2012-11-26) 

*    **Uudet ominaisuudet:** 
    *    (Ei suuria uusia ominaisuuksia.) 
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * Jos olet päivittämässä ERDDAP™ 1.38 tai 1.40, ei ollut muutoksia, jotka vaativat tekemään muutoksia asetustiedostoihin (mutta sinun täytyy käyttää uusia viestejä.xml-tiedosto) .
    *    ERDDAP™ jälleen voi olla Java 1.6 ( ERDDAP™ v1.40 vaaditaan Java 1. 7.) Suosittelemme edelleen vahvasti uusimman version käyttöä Java 1. 7.
    * Uusi tietokokonaisuustyyppi [EDDTableFrom AwsXml-arkistot](/docs/server-admin/datasets#eddtablefromawsxmlfiles) , voi lukea tietoja joukko Automaattinen sääasema (AWS) XML- tiedostot. Kiitos Lynn Dewittin ja Exploratorion.
*    **Pienet muutokset / viankorjaukset:** 
    * Mukautettu NDBC:n muutoksiin SOS lähdetietopalvelimet.
    * Mukautettu muutoksiin NOS COOPS ASCII -palveluissa.
    * Teki useita pieniä muutoksia ja korjauksia.

## Versio 1.40{#version-140} 
 (julkaistu 2012-10-25) 

*    **Uudet ominaisuudet:** 
    * On uusi tulostiedostomuoto tabledap Tiedostot: .nc CFMA, joka tallentaa pyydetyt tiedot .nc CF:n mukainen tiedosto [Selkeä näytteenotto Geometriat](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Moniulotteiset Array-vaihtoehdot, jotka ovat siten NODC-mallien mukaisia \\[ 2021: nyt [NCEI-mallit](https://www.ncei.noaa.gov/netcdf-templates)  \\] Tämäntyyppisten tietojen tallentamiseen. Kiitos NODC:n.
    *    tabledap Pyynnöt voivat nyt sisältää aikarajoitteita, kuten & aika&gt; now- Viisi päivää. Katso [asiakirjat](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) . Kiitos James Goslingin.
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * Jos olet päivittämässä ERDDAP™ 1.38, ei ollut muutoksia, jotka vaativat tekemään muutoksia asetustiedostoihin (mutta sinun täytyy käyttää uusia viestejä.xml-tiedosto) .
    *    ERDDAP™ julkaisut ja sisäiset välitavoitteet ovat saatavilla [ ERDDAP™ GitHubista](https://github.com/ERDDAP) . Lisätietoja: [Wiki](https://github.com/ERDDAP/erddap/wiki) (DE-III) ERDDAP™ projekti sekä yleisempää [ ERDDAP™ Ohjelmoijan opas](/docs/contributing/programmer-guide) . (Tämä ilmoitettiin erikseen muutaman viikon kuluttua ERDDAP™ 1.38.) 
    * Luo tiedostoja Xml on parantunut.
        * Käsikirjoitus tarkistettiin, joten sen pitäisi toimia oikein kaikissa Linux-tietokoneissa. (Ei vain muutama) .
        * Nyt se lisää creator\\_name , creator\\_email ja creator\\_url mahdollisuuksien mukaan.
        * Monet muut pienet parannukset.
    * Puhdistettu ERDDAP™ Hoidamme ajan.
        * Sisäisesti ERDDAP™ Nyt käsittelee ajat millisekunnin tarkkuudella (ei sekuntia) .
        * Voit nyt valinnaisesti määritellä tietyn tietokokonaisuuden aikatarkkuuden, katso [ time\\_precision ](/docs/server-admin/datasets#time_precision) . Voit esimerkiksi asettaa tietokokonaisuuden näyttämiseksi aika-arvot päivämäärän tarkkuudella (esim., 1970-01-01) .
        * Nykyiset tietokokonaisuudet käyttävät oletusasetuksia, joten nämä muutokset eivät vaikuta niihin ja näyttävät aikaa sekunnin tarkkuudella. Kiitos Servet Cizmelin ja Philip Goldsteinin.
    *    [EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles) on uusi tietokokonaisuustyyppi, jota voit käyttää datasets.xml Tiedosto. Se voi lukea tietoja mistä tahansa lukuisista tiedostomuodoista, jotka määritellään [CF Selkeä näytteenotto Geometriat](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) konferenssit. Kiitos NODC ja erityinen kiitos Kyle Wilcox tehdä näytetiedostoja valtava määrä voimassa DSG tiedostomuotoja ja julkistaa ne.
*    **Pienet muutokset / viankorjaukset:** 
    * Laajensi [pikakäynnistys](#quick-restart) järjestelmä kaikille asiaankuuluville EDDGrid ja EDDTable alaluokat.
    * Parempi dokumentaatio, joka liittyy erityisesti käyttötapoihin [griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType) sekä [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType) eri asiakasohjelmistoista.
    * Muuttunut kehittynyt haku tukee minTime ja / tai maxTime ilmaistuna aikaseconds. Kiitos Lynn Dewittin.
    * Muutos .htmlTable tuloste näyttää urls ja sähköpostiosoitteet linkkejä.
    * Lisätty "rel=" ja "rev=" asiaan&lt;a href&gt; tagit. Kiitos Pat Cappelaere alkaen OGC   REST projekti.
    * Parempi suoja epärealistisen suuria tietopyyntöjä vastaan, erityisesti tabledap , missä se on vaikeampi ongelma.
    * Siirsi lisää viestejä viesteihin.xml.
    * Tein nopeusparannuksia.
    * Kiinteä EDDGrid Fileistä sallimaan lajiteltavien akselien laskeutumisen. Kiitos Maricel Etchegarayn.
    * Poistettu viittaukset iGoogle koska se lopetetaan.
    * Teki useita pieniä muutoksia ja korjauksia.

## Versio 1.38{#version-138} 
 (julkaistu 2012-04-21) 

*    **Uudet ominaisuudet:** 
    * ISO 19115 ja FGDC -- ERDDAP™ voi automaattisesti luoda ISO 19115- ja FGDC XML-metatietotiedostoja kullekin tietokokonaisuudelle. Linkit tiedostoihin näkyvät jokaisessa tiedostoluettelossa (Esimerkiksi koko tekstin etsinnästä) ja myös Web Esteetön kansiot (WAF)   (ks. [FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/) sekä [ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/) ) . Kiitos Ted Habermann, Dave Neufeld, ja monet muut.
    * Koko tekstin etsii datasettejä nyt tukea\\-_ excludedWord _ ja \\- "_ poissuljettu lause_" . Kiitos Rich Signellin.
    * Hakee tietoja nyt palata tuloksia sivu kerrallaan. Oletus käyttää parametrimerkkijonoa: sivu = 1&itetsPerPage=1000, mutta voit muuttaa pyyntösi URL-arvoja. Steve Hankinin ja UAF-projektin ansiosta.
    *    OpenSearch -- ERDDAP™ nyt tukee [ OpenSearch 1. 1](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html) tietokokonaisuuksien hakustandardi. Muun muassa tämä mahdollistaa luettelo aggregaatin sivustoja tehdä hajautettuja hakuja (lähettää hakupyynnön jokaiselle luettelolle, josta se tietää) .
    * Pilkku erotettu Arvo (CSV) Tiedostot... ERDDAP™ nyt tuottaa CSV-tiedostoja vain pilkku arvojen välillä (mikä Excel suosii) , sijaan pilkku+avaruus. Kiitos Jeff deLaBeaujardieren.
    * Miljoona datasetiä... Tukiin tehtiin useita muutoksia ERDDAP s on valtava määrä tietoja, ehkä jopa miljoona. Steve Hankinin ja UAF-projektin ansiosta.
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
#### Nopea uudelleenkäynnistys{#quick-restart} 
*    [A](#quick-restart) nopea uudelleenkäynnistys mahdollistaa ERDDAP™ Käynnistää paljon nopeammin.
     **Lisää tämä setup.xml-tiedostoosi** Heti sen jälkeen&lt;/datasetitRegex&gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Tietoaineistojen koko tekstihaku voidaan nyt tehdä Lucenen hakukoneella (vaikka suosittelemme alkuperäistä hakukonetta, jos sinulla on alle 10 000 dataa) tai alkuperäinen hakujärjestelmä.
         **Lisää tämä setup.xml-tiedostoosi** Heti sen jälkeen&lt;/näyttöDiagnosticInfo&gt;:
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

    * Vuonna setup.xml, voit / pitäisi nyt lisätä kaksi uutta kategoriaa pilkun erotettu luettelo&lt; categoryAttributes &gt;:
        * globaali: avainsanat (Lisää se heti maailmanlaajuisen:toimielin) -- uusi erityistapaus, joka tulkitsee pilkulla erotetun avainsanojen luettelon maailmanlaajuisista avainsanoista tehdäkseen erillisen merkinnän jokaiselle avainsanalle.
        * muuttuja Nimi (Lisää se loppuun) -- uusi erikoistapaus, joka luokittelee jokaisen dataVariable   destinationName S.
    * Vuonna setup.xml, voit (Miksi?) Kerro ERDDAP™ FGDC:n ja/tai ISO 19115 -metatietojen tarjoaminen mille tahansa tietokokonaisuudelle
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Näiden asetusten oletusarvot ovat totta.
    * Sisään datasets.xml , Harkitkaa parantaa metatietoja tietokokonaisuuksia. ERDDAP™ nyt tuottaa automaattisesti ISO 19115- ja FGDC XML-metatietotiedostoja kullekin datakokonaisuudelle datakokonaisuuden metatietojen perusteella.
No niin. **hyvä datadata johtaa hyvään ERDDAP -generoitu ISO 19115 ja FGDC metatiedot.**   
         **Katso uudet asiakirjat monista uusista SUOSITELTU [Global attribuutit](/docs/server-admin/datasets#global-attributes) .** 
    * Sisään datasets.xml , jos haluat kertoa ERDDAP™ käyttää esivalmistettua FGDC- ja/tai ISO 19115 -tiedostoa, joka on jossain palvelimen tiedostojärjestelmässä sen sijaan, että sillä olisi ERDDAP™ luoda nämä tiedostot, käyttää:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Jos _fullFileName_\\="" tai tiedostoa ei löydy, tiedostossa ei ole FGDC:tä eikä/tai ISO 19115:ää metatietoa. Joten tämä on myös hyödyllistä, jos haluat poistaa FGDC ja / tai ISO 19115 metatietoja tietyn aineiston.
    * Sisään datasets.xml , kaikille EDDGrid SideBySide ja EDDGrid AggregaattiExistingDimension-aineistot, varmista, että lapsiaineistot ovat erilaisia datasetID s kuin niiden vanhemmat tiedot ja muut lapset. (Voisit esimerkiksi seurata George Foremanin yksinkertaista mutta tehokasta järjestelmää nimetä hänen lapsensa.) Jos kaikki nimet perheessä ovat täsmälleen samat, aineisto ei ladata (virheviestillä, että aggregoidun akselin arvot eivät ole järjestyksessä) .
    * Sisään datasets.xml , joitakin muutoksia luetteloon voimassa ioos\\_category metatiedot:
        * "pCO2" muutettiin "CO2."
        * "Fysikaalinen merentutkimus" lisättiin.
        * "Soils" lisättiin.
    * Sisään datasets.xml , ERDDAP™ ei enää salli '.' datasetID . Se oli sallittua, mutta lannistunut. (Anteeksi.) 
    * Sisään datasets.xml , EDDTable From Thredds Files ja EDDTableFrom Hyrax Tiedostot ovat hieman muuttuneet, koska molemmat luokat on juuri kirjoitettu uudelleen ollakseen tehokkaampi (Molemmat luokat tekevät aina paikallisen kopion kaikista etätiedostoista) . Katso näiden luokkien perustamista koskevat asiakirjat: [EDDTableFrom Hyrax Tiedostot](/docs/server-admin/datasets#eddtablefromhyraxfiles) sekä [EDDTableFrom Threeds Files](/docs/server-admin/datasets#eddtablefromthreddsfiles) . Ks. erityisesti tarkistetut kommentit&lt;tiedostoDir&gt; (nyt merkityksetön) sekä&lt; sourceUrl &gt; (nyt välttämätön) . Myös, sinun ei pitäisi koskaan kääriä tätä luokkaa EDDTableCopy tehokkuutta.
    * Sisään datasets.xml , jos käytät EDDtableFromDatabase kanssa Oracle tietokanta, sinun pitäisi sisällyttää yhteys Omaisuus, kuten
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
Määritellä, kuinka monta riviä tietoja hakea kerralla, koska oletus on 10, mikä on hirvittävän tehoton. Katso [ Oracle asiakirjat](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm) . MySql ja PostgreSQL näyttävät olevan parempia oletusarvoja tämän asetuksen. Kiitos Kevin O'Brienin.
    * Jos käytät EDDtableFromDatabase, katso parannettu [Nopeusasiakirjat](/docs/server-admin/datasets#eddtablefromdatabase) muita ehdotuksia suorituskyvyn parantamiseksi. Kiitos Kevin O'Brienin.
    * Sisään datasets.xml , kaikkien EDDTable... tiedot, valmistelukunnissa ja Metadata\\_Conventions maailmanlaajuiset ominaisuudet, ks. CF-1.6 (ei CF-1.0, 1.1, 1.2, 1.3, 1.4 tai 1.5) , koska CF-1.6 on ensimmäinen versio, joka sisältää muutokset, jotka liittyvät Discretary Sample Geometria.
    * Ohjelmoijat, jotka kokoavat ERDDAP™ koodin täytyy lisätä lib/lucene-core.jar listaan purkkitiedostoja niiden java ja Java komentorivipolkuja.
    *    ERDDAP™ on [uusi palvelu](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html) muuntaa CF Standard nimi / GCMD Science Keyword. Saatat pitää tätä hyödyllisenä, kun luot maailmanlaajuisia avainsanoja metatietoja tiedostoistasi ERDDAP .
    * Botsin kanssa... Lue tämä ohje [estää botteja ryömimästä ERDDAP™ Typerällä tavalla](/docs/server-admin/additional-information#robotstxt) .
    * Käännös... Teksti ERDDAP 's web-sivut ovat nyt enimmäkseen viestejä.xml ja niin sopii käännös eri kielille (esim., saksa, ranska) . Viestit käyttävät nyt usein MessageFormat formating, myös auttaa tekemään käännöksiä. Jos olet kiinnostunut tekemään käännöksen, lähetä sähköpostia erd dot data at noaa dot gov .
    * Näyte datasets.xml -- Otoksessa oli useita pieniä mutta merkittäviä virheitä datasets.xml . Jos käytät näitä tietoja, ota uudemmat versiot uudesta näytteestä datasets.xml uudessa .zip Tiedosto. James Wilkinsonin ansiosta.
    * Git... Yritän kovasti ERDDAP™ GitHub-projekti ASAP tämän julkaisun jälkeen.
*    **Pienet muutokset / viankorjaukset:** 
    * Uusi paletti, OceanDepth, on hyödyllinen syvyysarvoille (positiivinen on laskenut) , esim. 0 (matala) 8000 (syvä) .
    * • .kml tuloste tabledap käyttää parempaa merkkikuvaketta (Se ei ole sumeaa.) . Ja leijuminen merkin päällä tekee siitä isomman.
    * EDDTable From Files -- Viimeisimmässä päivityksessä uudella netcdf-jaava-kirjastolla oli tiukemmat rajoitukset vaihteleville nimille .nc tiedostot. Tämä aiheutti ongelmia EDDTableFromFiles jos muuttuja sourceName Hänellä oli välimerkkejä. EDDtableFromFles on nyt muutettu välttääkseen tämän ongelman. Kiitos Thomas Holcombin.
    * .subset-sivu tukee nyt 0/10/100/10000/10000/100000 sen sijaan valintaruutu Related Data. Työkaluvihje varoittaa, että 100000 voi aiheuttaa selaimen kaatumisen. Kiitos Annette DesRochersin, Richard. (Abe) Coughlin ja IOOS-biologinen projekti.
    * .../eddap/info/_ datasetID _/index.html verkkosivut nyt näyttää urls ja sähköpostiosoitteet klikkaavia linkkejä. Kiitos Richardin. (Abe) Coughlin ja IOOS-biologinen projekti.
    * Virheen korjaus: sisään tabledap , kun on kyse tiedoista, joissa on korkeus MetersPerSourceUnit&lt;0, korkeusrajoitteisia kyselyjä käsiteltiin väärin. Kiitos Kyle Wilcoxin.
    * Virheen korjaaminen: EDDGrid AggregateFromExistingDimension tukee nyt monipuolisempia TDS URL-osoitteita. Kiitos?

## Versio 1.36{#version-136} 
 (julkaistu 2011-08-01) 

*    **Uudet ominaisuudet:** 
    * Ei merkittäviä muutoksia käyttäjän näkökulmasta.
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * PmelTao-aineisto, jota käytettiin usein näyteaineistona tabledap   
asiakirjat eivät ole enää saatavilla. ERDDAP™ Hoitajien on tehtävä nämä muutokset:
        * • datasets.xml , jos sinulla on datasetID ="pmelTao" tietokokonaisuus, lisätään
aktiivinen="false" juuri ennen "&gt;" rivin lopussa.
        * Setup.xml, jos&lt;EDDTaulukkoIdEsimerkki&gt; on pmelTao, sitten:
            * Jos datasets.xml ei ole tiedostoa datasetID ="erdGlobecBottle," lisätään
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * Vuonna setup.xml, korvaa kaikki tagit alkaen&lt;EDDTaulukkoIdEsimerkki&gt; läpi
                &lt;EDD-taulukko Matlab PlotExample&gt; kun
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
                
    * Tiedostoille, joissa tyyppi on EDDtableF-tiedostojen alaluokka, voit nyt tehdä tietoja metadatasta.
Tarkemmin, voit nyt tehdä muuttujan arvoista attribuutti yksi alkuperäinen muuttuja.
Esimerkiksi datasets.xml , sisällä&lt; dataVariable &gt; tag, jos käytät
```
        <sourceName>variable:cruise:PI</sourceName>  
```
         ERDDAP™ tekee muuttujan, jossa on risteilymuuttujan PI-attribuutin arvot.
Kiitos WOD:n.
*    **Muutokset:** 
    * Pienet muutokset

## Versio 1.34{#version-134} 
 (julkaistu 2011-06-15) 

*    **Muutokset:** 
    * Virheen korjaaminen: Korjasin muistivuodon, joka tapahtui noin 64-bitillä. Java laitokset.
    * Virheen korjaaminen: ERDDAP™ nyt asettaa nämä maailmanlaajuiset ominaisuudet oikein, kun leveysasteen arvot vaihtelevat korkeasta alhaiseen: geospatial\\_lat\\_min, geospatial\\_lat\\_max, Southern most\\_pohjoisn, Northing.
        
Huomaa, että actual\\_range on muuttumaton: sillä voi olla alhaiset, korkeat tai alhaiset arvot, koska sen tarkoituksena on ilmoittaa varastointialue ja -järjestys.
        
    * Pieniä muutoksia.
    *    ERDDAP™ hallinnoijien ei tarvitse tehdä muutoksia niiden setup.xml tai datasets.xml .

## Versio 1.32{#version-132} 
 (julkaistu 2011-05-20) 

*    **Muutokset:** 
    * Tuki äskettäin ratifioiduille CF:n erillisotoksille (joka ei valitettavasti ole vielä saatavilla verkossa) , joka korvaa ehdotetut koheesiorahastoa koskevat havaintosopimukset.
         ERDDAP™ käyttäjät näkevät, että cdm\\_feature\\_type=Station korvataan TimeSeriesillä ja tiedostoihin tehdään pieniä muutoksia .nc Tiedostotyyppi (litteä\\_ulottuvuus on nyt nimeltään näyte\\_mitta) .
         ERDDAP™ hallintojen on tehtävä nämä muutokset datasets.xml :
        * cdm\\_data\\_type=Station muutetaan cdm\\_data\\_type=TimeSeriesiksi.
        * cdm\\_data\\_type=StationProfile muutetaan cdm\\_data\\_type=TimeSeriesProfileiksi.
        * cdm\\_station\\_variables tulisi muuttaa cdm\\_timeseries\\_variables:iksi.
        * cf\\_role=station\\_id muutetaan cf\\_role=timeseries\\_id:ksi.
    * Uusi ioos\\_category vaihtoehdot: "Värillinen liuotettu orgaaninen aine," "pCO2," "Stream Flow," "Total keskeytetty aine."
    * Mahdollinen ratkaisu mahdolliseen 64-bittiseen muistivuotoon Java . \\[ Se ei toiminut. \\] 
    * Pieniä muutoksia.

## Versio 1.30{#version-130} 
 (julkaistu 2011-04-29) 

*    **Uudet ominaisuudet:** 
    * Tuki 64-bittiselle Java . Käytetään 64 bitin kanssa Java , ERDDAP™ voi nyt käyttää paljon enemmän kasa muistia ja käsitellä monia muita samanaikaisia pyyntöjä.
    * Tuki .nc tiedostopyynnöt enintään 2GB (jopa ilman 64-bittistä Java ) tehostamalla ERDDAP Tietojen käsittely palasina.
    * Monet 2X nopeus parannuksia koodi ja 2X nopeuttaa alkaen Java 1.6 merkki ERDDAP™ 2X-4X nopeammin kuin ennen.
    * Muistinsäästöjen paraneminen huomattavasti vähemmän ERDDAP Perusmuistin käyttö.
    * Taulukkotiedostot ERDDAP™ on nyt täysin tietoinen tietokokonaisuuden cdm\\_data\\_type, ja miten datakartat CDM tyyppi. Katso [CF Erityinen näytteenotto Geometrian erittely](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) . Ehkä jonain päivänä pian, että Word-tiedosto muunnetaan .html ja korvata nykyisen "Obsolete" tiedot tällä sivulla. Kiitos NOAA UAF-projekti.
    * Useimmissa EDDTable-aineistoissa on uusi tiedostotyyppi, .nc CF, luo Contigative Ragged Array .nc tiedostot, jotka ovat viimeisimmän version mukaisia [CF Selkeä näytteenotto Geometriakäytännöt](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) . Nämä tiedostot on jäsennetty vastaamaan tietokannan CDM-tietotyyppiä. Koska ehdotetut yleissopimukset juuri muuttunut, koska tämä kirjoitus, netcdf-java kirjasto ei vielä tue lukemista tiedostomuotoja luonut ERDDAP ja tulkita niitä CDM tiedostoja. Luultavasti pian. Kiitos NOAA UAF-projekti.
    * Näkymä: Erillinen Data-vaihtoehto .subset-sivulla on nyt pudotus-down-lista, jonka avulla käyttäjät voivat määrittää yksittäisten tietojen rivien enimmäismäärän (oletus = 1000) . Tämä muutos ja muut ERDDAP™ työskennellä tietoaineistojen kanssa, joilla on erittäin suuri määrä erillisiä tietoja. (Ainutlaatuisten arvojen määrä yhdelle muuttujalle on edelleen ongelma, mutta se voi olla melko korkea (20 000?) ennen .subset ja muut web-sivut ladata todella hitaasti.) Kiitos NOAA UAF-projekti.
    * .subset verkkosivuilla on uusi vaihtoehto: Näytä erottuva datamäärä. GTOPP-projektin ansiosta.
    * Käyttäjien avuksi (esim. aseman nimet) Näytetään nyt Make-A-Grap- ja Data Access -lomakkeissa. Kiitos NOAA UAF-projekti.
    * . läpinäkyvä Png-pyynnöt tukevat nyt kaikenlaisia kaavioita ja tietojen esitystapoja. Se piirtää vain dataa. Ei kirveitä, legendoja, maamatoja tai mitään muuta. Näin on mahdollista tehdä kuvia kerroksina läpinäkyvä Pngs. If &. size=_wide_ | _Korkeus_ on määritetty kyselyssä (suositellaan) Se on kunnia. Oletusarvo on 360x360 pikseliä. Ainoa poikkeus on EDDGrid &.draw=pinta, jossa oletusarvo (kuten ennen) on kuva, jossa on ~1/pikseli tietopistettä kohti (enintään 3000 x ja y pikseliä) . Kiitos Fred Hochstaedterin.
    * • WMS Web-sivut näyttävät nyt tiedoston muuttujan väripalkin (tilu) . Kiitos Emilio Mayorgan ja muiden.
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * Tämä julkaisu sisältää paljon muutoksia. Ne ovat kaikki tärkeitä. Ole kärsivällinen ja selvitä kaikki seuraavassa luetellut muutokset.
    * Tämä versio on työnnetty pois aikaisemmin kuin tarkoitus käsitellä joitakin Java Vartijoita. Valitettavasti useita ominaisuuksia / korjauksia tarkoitettu tähän ERDDAP™ versio ei ole tässä versiossa. Anteeksi. Toivottavasti seuraava versio on suhteellisen pian (ja paljon helpompi päivittää) .
    * Välttää useita tietoturvavikoja Java 6 päivittää 23 ja alla, lataa ja asenna uusin versio Java   ( Java 6 päivitys 24 tai enemmän) . Jos sinulla on 64-bittinen käyttöjärjestelmä, ota 64-bittinen versio Java .
    * Jos käytät Tomcat 5:tä, sinun täytyy päivittää Tomcat 6:een tai 7:een (parempi) . Jos käytät Tomcat 6:ta, harkitse päivittämistä versioon 7.
    * Noudata kaikkia ohjeita. [uuden ERDDAP™ ](/docs/server-admin/deploy-install) , mutta tarvittaessa, kopioi tiedostoja vanhasta asennuksesta uuteen asennukseen, erityisesti \\[ tomcat \\] /content/erddap-hakemisto ja tiedostot. Tähän liittyen [uudet Tomcat-asetussuositukset](/docs/server-admin/deploy-install#tomcat) .
    * Oletuksena erddap.css on nyt mukana erddap.war tiedosto.
        * Käyttää oletus erddap.css, **poistaa** vanha \\[ tomcat \\] /content/erddap/images/erddap.css .
        * Jos olet muokannut \\[ tomcat \\] /content/erddap/images/erddap.css, ja haluat jatkaa sen käyttöä: jätä se paikoilleen ja korvaa&lt;syöte&gt; osa, jossa
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

    * • \\[ tomcat \\] /content/erddap/setup.xml:
        * Korvaa kommentit ja tunnisteet liittyvät&lt;osittainen pyyntöMaxBytes&gt; ja&lt;osittainen pyyntöMax Cells&gt; kun
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
        * Korvaa&lt; categoryAttributes &gt; ja harkita tunnisteen arvon muuttamista:
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

Yksilö&lt; categoryAttributes &gt; jotka ovat nyt maailmanlaajuisia ominaisuuksia PITÄÄ tunnistaa etuliitteen kautta maailmanlaajuisesti: (Esim.) . Muiden ominaisuuksien oletetaan olevan muuttuvia ominaisuuksia (esim. standard\\_name ) . Myös laitoksen arvot (ainoat) ne jätettiin alkuperäiseen tapaukseen. Nyt kaikki luokan arvot muunnetaan pieniksi.
    * • \\[ tomcat \\] Sisällön/eddap datasets.xml :
        * -Ei. ERDDAP™ on uusia vaatimuksia liittyvät taulukkotiedoston cdm\\_data\\_tyyppi. Kussakin aineistossa on oltava oikeat metatiedot ja muuttujat, jotka liittyvät cdm\\_data\\_tyyppiin. Jos ei, tiedosto ei lataudu ja heittää virhe. Ks. [cdm\\_data\\_tyyppi](/docs/server-admin/datasets#cdm_data_type) .
        * FYI: On olemassa uusi tiedostotyyppi: EDDTableFromAsciiServiceNOS.
        * Tiedoksi: on kolme uutta sallittua ioos\\_category vaihtoehdot: Hydralogia, laatu (Esimerkiksi laatulippujen osalta) , ja tilastot (esim.) .
        * EDDTable... Tiedostot tiedostot, poista kaikki&lt;nMittaukset&gt; tagit. Niitä ei enää tarvita tai käytetä.
        * Muuttujat, joiden destinationName = korkeus, ERDDAP™ ei enää pakota long\\_name Olla Korkeus. Ole hyvä ja käy läpi datasets.xml ja toistuvasti etsiä&lt; destinationName &gt; korkeus ja lisätä kyseisen muuttujan&lt; addAttributes &gt;:
```
              <att name="long\\_name">Altitude</att>  
```
             (tai hieman erilaista long\\_name erityistapauksissa) .
        * Valinnainen: Kaikki EDDTableFromFiles alaluokista tukimuuttuja [ sourceName = maailmanlaajuinen:](/docs/server-admin/datasets#global-sourcenames) muuntaa maailmanlaajuiset metatiedot jokaisesta tiedostosta datamuuttujaksi. Kiitos Lynn DeWittin.
    * EDDtableTietojen käyttäjiltä -- ERDDAP™ mukana uusi JDBC 4 -ajuri Postgresille. Muissa tietokannoissa, tarkista verkosta uusin JDBC .jar tiedosto tietokantaan. Mistä lähtien ERDDAP™ Nyt käyttää Java 1,6+, JDBC 4 (ei 3) on suositeltavaa.
    * FOI
        *    EDDGrid Fileistä ja EDDTablesta Mistä... Tiedostot tiedostot nyt tallenna tiedostotaulukon tiedot
             \\[ bigPentDirectory \\] /dataset Info/ \\[  datasetID  \\] /\\ * .nc tiedostot.
EDDTable-aineistot tallentavat nyt osajoukkotiedot
             \\[ bigPentDirectory \\] /dataset Info/ \\[  datasetID  \\] /\\ * .nc tiedostot. Nämä tiedostot olivat ennen
             \\[ bigPentDirectory \\] /dataset Info/ \\[  datasetID  \\] .\\ * .json tiedostot.
Vanhat tiedostot poistetaan automaattisesti, kun ERDDAP™ Aloitetaan. Tai voit poistaa kaikki tiedostot (mutta jätä tyhjät alihakemistot) in \\[ bigPentDirectory \\] /datasetInfo/.
        * Olen työskennellyt uuden EDDtableFromNcCFFiles, joka lukee tietoja paikallisia ja etätiedostoja käyttäen ehdotettuja, uusia CF Point Observation Conventions. Mutta se ei ole tässä julkaisussa. Netcdf-java-kirjastoissa on ongelmia, jotka liittyvät joihinkin näiden tiedostojen lukemiseen. Ehdotetut CF-pisteiden tarkkailua koskevat yleissopimukset muuttuivat hiljattain. Kun netcdf-java-kirjasto on korjattu ja päivitetty viimeisimmän ehdotuksen mukaiseksi, jatkan asian käsittelyä.
        * Suoritetaan ERDDAP™ Windows voi olla ongelmia: erityisesti, voit nähdä \\[ bigPerentDirectory/logs/log.txt-tiedosto ERDDAP™ ei voi joskus poistaa ja/tai nimetä tiedostoja nopeasti. Tämä johtuu virustorjuntaohjelmistosta (Esimerkiksi, McAfee ja Norton) Joka tutkii virusten tiedostoja. Jos törmäät tähän ongelmaan (joka näkyy virheviesteillä log.txt-tiedostossa kuten "Ei voitu poistaa ...") , muuttaa antivirus-ohjelmiston asetuksia voi osittain lievittää ongelmaa.
Jos ERDDAP™ Windows on vain testi käynnissä työpöydällä, tämä on vain ärsytystä.
Jos ERDDAP™ Windows on julkinen ERDDAP™ , harkita siirtymistä Linux-palvelimelle.
    * Hidas alku. Kun juokset ensimmäistä kertaa ERDDAP™ parannuksen jälkeen, ERDDAP™ Aineistojen lataaminen voi olla hidasta. Tapa ERDDAP™ tallentaa tietoja yhdistettyjä tiedostoja on muuttunut, joten ERDDAP™ Sinun täytyy lukea joitakin tietoja kaikista noista tiedostoista. Se vie aikaa.
    * Virheitä käynnistyksessä -- Kun otetaan huomioon cdm\\_data\\_tyyppiin liittyvät muutokset, on todennäköistä, että jotkin tiedostoistasi eivät lataa ja heittää virheitä. Lue huolellisesti Daily Report sähköpostia, että ERDDAP™ lähettää milloin ERDDAP™ Aloittaminen on päättynyt. Siinä on lista tiedoista, jotka eivät latautuneet. (huipulla) Ja miksi he eivät ladanneet (lähellä pohjaa) .
    * Jos jäät jumiin tai sinulla on muita kysymyksiä, lähetä minulle sähköpostilla: erd.data at noaa.gov .
    * Ohjelmoijat -- Jos kirjoitat Java Suorittavat ohjelmat ERDDAP™ koodi, sinun täytyy muuttaa joitakin komentorivin parametriviitteitä:
        * Vaihda joda-aika-1.6.2.jar joda-aika. purkki
        * Muuta Postgres JDBC . jaar viittaus postgresql.jdbc.jar
*    **Pienet muutokset ja viat:** 
    
    * Parannettu yhteyden käsittely välttää ripusta lankaa.
    * Paremmat valuuttakäytännöt lähes samankaltaisten pyyntöjen hoitamiseksi tehokkaammin.
    *    ERDDAP™ nyt käyttää netcdfAll-4.2.jar (Nimi on netcdfKaikki. purkki) . Tämä kytkin vaati useita sisäisiä muutoksia ja aiheutti joitakin pieniä ulkoisia muutoksia, esimerkiksi muutoksia siihen, miten kääretiedostoja luetaan ja pieniä muutoksia .nc Otsikkolähtö.
    * Uusi ominaisuus: \\[ erddap \\] /convert/fipscounty.html muuntaa FIPS Piirikunnan koodit piirikunnan nimille/nimille.
    * Kartoissa valtion rajat ovat nyt tummat, joten ne erottuvat paremmin kaikilla taustaväreillä.
    * Taulu .kml tuloste käyttää taas pyöreä kuvake merkitä pisteitä (ei lentokoneen kuvaketta Google siirtyi äskettäin) .
    * ErdCalcofi-aineistot oli järjestetty uudelleen ja ne ovat nyt saatavilla paikallisista tiedostoista (Nopeammin) .
    * Luo tiedostoja Xml alkaen Tuhka Catalog luo nyt tulostiedoston:
         \\[ tomcat \\] /webaps/erddap/WEB-INF/temp/ EDDGrid From ThrreddsCatalog.xml . Kiitos Kevin O'Brienin.
    * Luo tiedostoja Xml alkaen Tuhka Katsasta nyt yrittää poistaa tarpeettomat porttinumerot lähde URL (Esimerkiksi:8080 ja:8081 voidaan joskus poistaa) . Kiitos NOAA Centralin turvaryhmä.
    * .subset web-sivuille, Kartta erottuva data on nyt vaihteleva lat en valikoima.
    * Useat luettelot ERDDAP™   (Esimerkiksi taulukko, jossa esitetään kaikki tiedot) A.Z. lajiteltiin ennen a. .z . Nyt he lajittelevat tapauksen tunteettomalla tavalla.
    * Pienet muutokset .subset-sivuille, mukaan lukien: yksiköt on nyt ilmoitettu.
    * Luo tiedostoja Xml ja DasDds eivät enää heitä poikkeusta, jos tuloksia ei voida laittaa järjestelmän leikepöydälle tai näyttöInBrowser. Kiitos Eric Bridgerin ja Greg Williamsin.
    * Virheen korjaaminen: Kun tiedot on ladattu, ERDDAP™ Nyt poistaa tai muuttaa geospatiaalisia maailmanlaajuisia ominaisuuksia. Charles Carletonin ansiosta.
    * Vikakorjaus: String2.getClassPath () Nyt kunnolla prosenttia decodes luokan Polku (Erityisesti Windowsissa tiedostonimessä olevat välilyöntit ilmestyivät nimellä [52]) . Tämä ERDDAP™ ED Staattinen puhelu SSR.getContextDirectory () ja löytää sisältöä/erddap. Abe Coughlinin ansiosta.
    * Vika: EDDTableF alkaen tiedostot liittyvät saadaDataForDapQuery käsittely erillinen () pyynnöt. Kiitos Eric Bridgerin.
    * Virheen korjaaminen: tabledap Pyynnöt eivät oikein käsitellä korkeus rajoituksia, kun tiedoston korkeus MetersPerSourceUnit oli -1. Kiitos Eric Bridgerin.
    * Bug korjaus: EDDtableFrom... Tiedostot tiedostot nyt oikein käsitellä pyyntöjä, jotka sisältävät = Nan ja &#33;=Nan.
    
## Versio 1.28{#version-128} 
 (julkaistu 2010-08-27) 

*    **Uudet ominaisuudet:** Ei yhtään.
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** Ei yhtään.
*    **Virheen korjaaminen:** Korjaa ohjelmointivirhe (Ainoastaan 1,26 kohdassa.) -Ei. ERDDAP™ Erittäin hitaasti.
     

## Versio 1.26{#version-126} 
 (julkaistu 2010-08-25) 

*    **Uudet ominaisuudet:** Ei yhtään.
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** 
    * Sinun \\[ tomcat \\] /content/erddap/setup.xml
        * Sisään&lt;oikeudellinen&gt;, uudella rivillä \\[ standardi DataLicenses \\] , lisää \\[ standardContact \\] . \\[ standardContact \\] viittaa&lt;adminEmail&gt; määritelty korkeampi setup.xml.
        * Poista&lt;TaulukkoCommonBGColor&gt; ja&lt;TaulukkoHighlightBGColor&gt;.
        * Suositeltu: Muutos&lt;endBodyHtml&gt;
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

    * Vaaditaan: Sinun \\[ tomcat \\] /content/erddap/images/erddap.css ja erddapAlt.css, lisätään alareunaan:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Vikakorjauksia ja pieniä muutoksia:** 
    
    * Bug korjaus: Joissakin tilanteissa lomakkeet eivät toimineet joissakin versioissa Internet Explorer. Kiitos paljon Greg Williamsille.
    * Virheen korjaaminen: Make A Graph -painikkeet eivät toimineet, jos aineisto oli kaukosäätimestä ERDDAP .
    * Virheen korjaaminen: WMS Joskus ei toiminut, jos aineisto oli kaukosäädin ERDDAP .
    * Paljon pieniä muutoksia ja korjauksia.
    

## Versio 1.24{#version-124} 
 (julkaistu 2010-08-06) 

*    **Uudet ominaisuudet:** 
    * Uusi [Subset web-sivut](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html) Käytä faced hakua valita subsets of tabular tietokokonaisuuksia. Kiitos Postin.
    * Uusi [Tarkennettu haku](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html) yhdistää kaikki muut hakuvaihtoehdot ja lisää pituus-, leveys- ja aikarajoituslaatikot. Kiitos Ellyn Montgomeryn. (Anteeksi viivästys.) 
    * Uusi [Muunna aika](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) Web-sivun ja palvelun avulla voit muuntaa numeroita kertaa / alkaen ISO merkkijono kertaa.
    * Uusi [Muunna yksiköt](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) Web-sivun ja palvelun avulla voit muuntaa UDUNITS UCUM-yksiköille/yksiköille. Kiitos NOAA IOOS SOS .
    * Jos tabledap Pyyntö sisältää & yksiköt ('UCUM') , yksiköiden nimet muunnetaan alkuperäisistä nimistä (yleensä UDUNITS ) - [UCUM](https://unitsofmeasure.org/ucum.html) yksiköiden nimet. Tämä vaikuttaa vain yksiköihin\\*nimi\\*, ei tietojen arvoja. Kiitos NOAA IOOS SOS .
    * Parannukset tehdä Graafinen web-sivut ja kaaviot ja kartat:
        * Jos kaavio on kartta, on olemassa uusi Tee Graaf-painikkeet zoomata sisään/ulos ja uusi vaihtoehto klikkaa muuttaa kartan keskusta. Kiitos Postin.
        * Suodatinasetukset lisätty pohjan lähelle. Kiitos Greg Williamsin.
        * Rannikolle rakennetut tiedostot päivitettiin GSHHS v2.0:een. Kiitos Postin.
        * Karttoja ovat nyt järvet ja joet. Kiitos Postin. (Valitan, Sacramento-joki Delta puuttuu, koska rannikko- ja järvi-joki-aineistot eivät käsittele sitä.) 
        * Pscoast-johdetut kansallis-/valtiotiedostot päivitettiin. Kiitos Postin.
        * Topography.cpt muutettiin hieman. (Anteeksi, jos tämä vaikuttaa haitallisesti sinuun.) Kiitos Postin.
        * Jos käyttäjä muuttaa muuttujaa, se lähetetään automaattisesti uudelleen. axisVariable s' showStartAndStop heijastaa aina kaaviomuuttujia. Kiitos Joaquin Trinanien.
        * Png- ja pdf-kuvan URL:
            * Uusi &.land=_value_, jossa _arvo_ voi olla "alle" (näytä topografia) tai "over" (Näytä vain kylpymetriaa) . Jos ei ole määritelty, oletus on asetettu [ drawLandMask ](/docs/server-admin/datasets#global-drawlandmask) in datasets.xml tai setup.xml. Kiitos Postin.
            * Uusi: Legendan viivoja, jotka ovat liian pitkiä, murtuvat automaattisesti useaan riviin. Kiitos Postin.
        * Png-kuvan URL:
            * Uusi &.legend=_value_, jossa _arvo_ voi olla "Bottom" (oletus) -"Pois" tai "vain." Tämän avulla voit sisällyttää legenda, pois legenda, tai saada vain legenda. Cara Wilsonin ansiosta.
            * Uusi &.trim=_n Pikselit_ jättää rajan nPixels (esim. 10) kuvan alareunassa. Sitä sovelletaan .legend=Offin jälkeen. Cara Wilsonin ansiosta.
            * Uusi &. koko=_leveys_ | _High_ voit määrittää kuvan leveyden ja korkeuden pikseleinä.
    * Uudet tulostetiedostomuodot:
        * .csvp ja .tsv p -- kuten .csv ja .tsv , mutta " (_yksiköt_) " Liitteenä sarakkeen nimiä ensimmäisellä rivillä.
        * .odvTxt -- tekee .txt-tiedoston, joka yksinkertaistaa tietojen saamista [Ocean Data Näytä (ODV) ](https://odv.awi.de/) .
        * .esriCsv -- tekee .csv-tiedoston, joka soveltuu tuotavaksi ESRI:n ArcGIS . (Vain taulukkotiedostot) Jan Masonin, Jeff de La Beaujardieren ja NOAA IOOS SOS projekti.
    * Käyttöliittymän parantaminen [Luokittele](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html) verkkosivut. Myös luokittele arvot (muu kuin laitos) Nyt kaikki pienet. Ei-pienimmät pyynnöt hyväksytään (ohjattu) kun kyseessä on taaksepäin asennettava yhteensopivuus. Kiitos Roy Mendelssohnin.
    * Virheviestit ovat nyt entistä lyhyempiä ja enemmän suunnattuja käyttäjille. Kiitos Greg Williamsin.
    * Sisäinen muutos, joka vähentää huomattavasti ERDDAP Perusmuistin käyttö.
    * Monet uudet ominaisuudet ovat merkityksellisiä ainoastaan Post-hankkeen kannalta.
*    **Asiat ERDDAP™ Hallintovirkamiesten on tiedettävä ja tehtävä:** On paljon muutoksia. Anteeksi. Mutta jokainen tuo hyviä etuja.
    * Suuret muutokset GenerateDatasetXml:iin - se kysyy nyt usein lisää kysymyksiä (ks. [Tietokokonaisuus Tyyppi](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) tiedot) ja nyt aina tuottaa pääasiassa käyttövalmis sisältö datasets.xml . Olet edelleen vastuussa järjestelmän, joten sinun pitäisi silti tarkistaa datasets.xml sisältö ennen käyttöä. Inhimillinen panostus projektiin on aina parempi kuin tietokoneohjelma. Kiitos UAF-projektin.
    * VAADITTU: Vuonna setup.xml, sinun täytyy tarkistaa WMS kohta. Sen pitäisi nyt sisältää nämä tunnisteet (mutta voit vapaasti muuttaa arvoja) :
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

    * VAADITTU: Vuonna setup.xml, kopioi ja liitä tämä uusi ehdotettu&lt;KäynnistäHtml&gt; vanhan versiosi tilalle. Mutta voit tehdä muutoksia mieltymyksiisi.
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

Kiitos Postin, Hans Vedon ja Rick Blairin.
    * VAADITTU: Setup.xml,&lt;KäynnistäBodyHtml&gt;, vaihda&lt;runko&gt; tunniste olla vain&lt;runko&gt;, koska tyyli on nyt asetettu erddap.css.
    * VAADITTU: Aseta.xml, muuttaa tähän&lt;endBodyHtml&gt; (mutta muuttaa sähköpostiosoite sähköpostiosoitteesi ja voit tehdä muita muutoksia) :
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

    * SUHTEELLISESTI SUOSITETTU: In setup.xml, suositellaan&lt;Lyhyt kuvausHtml&gt; on nyt
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

Voitte vapaasti muuttaa tätä, erityisesti ensimmäisen kohdan viimeistä virkettä.
    * Setup.xml, sähköpostiKaikkiTo ja sähköpostiDailyReport Voit nyt olla pilkulla erotettu luettelot sähköpostiosoitteet. Ensimmäinen sähköpostiKaikki Jotta esimerkiksi EDDXxxxxFromErddap-aineistojen tilaaminen on erityistä, käytetään tätä sähköpostiosoitetta. John Maurerin ansiosta.
    * Sähköpostivirheet ovat nyt kirjautuneet \\[ bigPentDirectory \\] /logs/emailLogVVVV-MM-DD.txt-tiedosto.
    * In setup.xml, on uusi, valinnainen parametri asettaa sähköpostitilin ominaisuudet (yleensä heti&lt;SähköpostiSalasana&gt;:
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

Oletusarvo ei ole mitään. Kiitos Rich Signellin.
    * Jos käytät EDDTableCopia tai EDDGrid Kuittaan, sinun täytyy poistaa kaikki \\[ bigPentDirectory \\] /kopio/ kansiot ja tiedostot, jotka sisältävät "xh" hakemistossa tai tiedostonimiä pysäytyksen jälkeen ERDDAP™ ja ennen uuden ERDDAP™ Joten ne tiedostot kopioidaan uudelleen. Olen pahoillani, mutta oli tärkeää tehdä muutos ja toivottavasti se vaikuttaa muutamaan ylläpitäjään ja muutamaan tiedostoon.
Linuxista löydät nämä tiedostot, cd \\[ bigPentDirectory \\] /kopio
löytää .\\*xh\\*  
Windowsista löydät nämä tiedostot, Käynnistä | Etsi
Mitä haluat etsiä: Asiakirjat
Tiedostonimen koko tai osa: xh
Katso: Selaa -&gt; \\[ bigPentDirectory \\] /kopio
Klikkaa 'Etsi'
^A valita ne kaikki
Del poistaa ne kaikki
    * VAADITTU: datasets.xml , EDDtableFromDatabase tietoaineistot, päivämäärä ja aikaleima muuttujat, muuttaa tietoja Kirjoita kahteen ja yksiköt sekunteihin vuodesta 1970-01-01T00:00:00Z. Me REQUE että tallennat aikaleiman tiedot tietokantaan\\*kun\\*Aikavyöhyke. Ilman aikavyöhyke tietoja, kyselyt, että ERDDAP™ lähettää tietokantaan ja tuloksia, että ERDDAP™ Tietokannasta JDBC:n kautta saadut tiedot ovat epäselviä ja todennäköisesti vääriä. Yritimme, mutta emme löytäneet luotettavaa tapaa käsitellä "aikaleima ilman aikavyöhyke" tietoja. Tämä on mielestämme joka tapauksessa hyvä käytäntö. Onhan "aikaleima ilman aikavyöhykettä" tiedot on implisiittinen aikavyöhyke. Vaikka on hienoa, että aikavyöhyke on ilmiselvä tietokantaan admin, on järkevää määritellä se nimenomaisesti, jotta muut ohjelmistot voivat asianmukaisesti vuorovaikutuksessa tietokantaan. Kiitos, Michael Urzen.
    * SUOSITTELEE KORKEASTI: datasets.xml , jotta .subset web-sivut faceted haku oman taulukkotiedostoja, sinun täytyy lisätä [&lt; subsetVariables &gt;] (/docs/server-admin/datasets#subsetvariables) tietokokonaisuuden maailmanlaajuisiin ominaisuuksiin.
    * SUOSITTELEE: datasets.xml , jos sinulla on aineisto kanssa datasetID ="pmelGtsppp," ole hyvä ja muuta se
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * SUOSITTELEE: datasets.xml , on olemassa uusia valid vaihtoehtoja [&lt;cdm\\_data\\_tyyppi&gt;] (/docs/server-admin/datasets#cdm_data_type) global attribuutti, joten sinun pitäisi tarkistaa / muuttaa arvo tietokokonaisuuksia.
    * Sisään datasets.xml , uusi [&lt;lähdeNeedsExpandedFP\\_EQ&gt;] (/docs/server-admin/datasets#source needsexpandedfp_eq) on hyödyllinen, jos lähdepalvelin ei johdonmukaisesti käsittele &_variable_\\=_value_ testejä oikein (koska [yleinen vaikeus testata tasa-arvo liukulukujen numerot](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) ) . lähdeNeeds laajennettu FP\\_EQ on oletusarvoisesti valittu todeksi (turvallisin asetus) Sinun ei tarvitse tehdä muutoksia.
    * Uusi [EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles) . Kiitos Jerry Yun Panin.
    * Uusi [EDDTableFrom Threeds Files](/docs/server-admin/datasets#eddtablefromthreddsfiles) . Kiitos Roy Mendelssohnin.
    * Muutokset [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) käyttää sitä laajemman tiedostovalikoiman kanssa.
    * DDDtableFromBMDE on poistettu käytöstä. Aktiivisia, asianmukaisia tietolähteitä ei enää ole.
    * LuodaDatasetXml, uusi EDDGrid From Thredds Koko THREDDS-katalogi (tai alaryhmä) ja tuottaa datasets.xml sisältöä. Kiitos UAF-projektin.
    * Luo tiedostoja Xml ja DasDds nyt myös laittaa tuloksia \\[ bigPentDirectory \\] /logs/log.txt. Rich Signellin ja Charles Carletonin ansiosta.
    * Monet parannukset kirjautumisjärjestelmään. Kiitos Postin.
*    **Asiat ERDDAP™ Ohjelmoijat Täytyy tietää ja tehdä:** 
    * /WEB-INF/ lib/ hakemistossa on tapahtunut muutoksia. Vaihda java- ja Java-luokkapatteriasetukset vastaavasti.
    * Uusi \\[ sinun Url \\] /erddap/versiopalvelu määrittääksesi version ERDDAP . Vastaus on teksti, esim. ERDDAP \\_version=1.24 Jos saat HTTP 404 Ei-Found virheviestin, hoida ERDDAP™ versio 1.22 tai alempi. Kiitos Postin.
*    **Pienet muutokset ja viat:** 
    
    * EDDTableFrom Sos muutokset:
        * Lukemisen IOOS-tuki kaatui SOS XML-vastaukset.
        * Lisätty tuki lukemiselle IOOS SOS teksti/csv. (NOS SOS palvelimia ei tällä hetkellä tueta.) 
        * Teki paljon muutoksia liittyvät IOOS SOS palvelimen tiedot.
        * Lisätty tuki BBOX-kyselyille IOOSille SOS sekä OOSTethys   SOS Palvelimet. Nämä muutokset nopeuttavat merkittävästi asiaankuuluvia tietopyyntöjä. Kiitos IOOS: SOS .
    * Teksti .mat taulukkotiedostot on nyt tallennettu oikein. Kiitos Roy Mendelssohnin.
    *    WMS 
        *    OpenLayers on nyt liitetty ERDDAP™ käytettäväksi WMS verkkosivut. Tämä korjaa ongelmia, jotka johtuvat OpenLayers Muutos muutama kuukausi sitten ja estää tulevia ongelmia.
        * Vuonna WMS   GetCapabilities vaste&lt;OnlineResource&gt; arvo on nyt URL WMS Palvelu. Charlton Galvarinon ansiosta.
        * Legenda näkyy WMS Sivu näyttää väripalkin. Kiitos Emilio Mayorgan.
    *    EDDGrid AggregaattiExistingDimension constructor oli ongelmia, jos akselin lähde Arvot eivät olleet yhtä suuret kuin määränpää Arvot, esim. jos lähdeaika oli jotain muuta kuin "seconds since 1970-01-01" . Kiitos Todd Spindler.
    * TaulukossaWriterGeoJson, ylimääräinen ',' jälkeen bbox \\[ ... \\] on poistettu. Kiitos Greg Williamsin.
    * Paljon pieniä muutoksia ja korjauksia.
    
## Versio 1.22{#version-122} 
 (julkaistu 2009-07-05) 

* Vuonna 1.20 käyttöön otettu SlideSorter-vika on korjattu.
* Vuonna 1.20 käyttöön otettu OBIS-vika on korjattu.
* Viitaukset Jason-aineistoihin kuvien/gadgets/GoogleGadgets-sivulla poistettiin.
     
## Versio 1.20{#version-120} 
 (julkaistu 2009-07-02) 

*    ERDDAP™ ylläpitäjät, lisää tämä setup.xml-tiedostoosi:
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

* Uudet tietoaineistotyypit [ EDDGrid Kopioi](/docs/server-admin/datasets#eddgridcopy) sekä [EDDTableCopy](/docs/server-admin/datasets#eddtablecopy) tehdä ja ylläpitää paikallinen kopio toisen EDDGrid tai EDDTablen tietokokonaisuuden tiedot ja tiedot paikallisesta kopiosta. Nämä ovat erittäin helppoja ja tehokkaita **ratkaisuja joihinkin suurimmista ongelmista etätiedon tarjonnassa:** 
    
    * Etätietolähteen tietojen saanti voi olla hidasta (eri syistä) .
    * Etätiedosto on joskus saatavilla (jälleen, eri syistä) .
    * Yhdellä tietolähteellä luottaminen ei skaalaudu hyvin (esim. kun monet käyttäjät ja monet ERDDAP s käyttää sitä) .
    
Lisäksi paikallinen kopio on varmuuskopio alkuperäisestä, mikä on hyödyllistä, jos alkuperäiselle tapahtuu jotain.
    
Ei ole mitään uutta tehdä paikallinen kopio aineisto. Mitä uutta täällä on, että nämä luokat tekevät\\*helppo\\*luoda ja\\*ylläpito\\*paikallinen kopio\\*lajike\\*etätietolähteiden tyypit ja\\*lisää metadata\\*kopioitaessa tietoja.
    
Nämä tietokokonaisuuden tyypit ovat osa täydellistä joukkoa ominaisuuksia, jotka yksinkertaistavat luomista [ruudukot / klusterit / federaatiot ERDDAP tilu](/docs/server-admin/scaling) käsitellä erittäin raskaita kuormia (esim. datakeskuksessa) .
    
* Uusi tietokokonaisuustyyppi [EDDTableTietokanta](/docs/server-admin/datasets#eddtablefromdatabase) Saa tietoja paikallisesta tai etätietokannasta.
*    ERDDAP™ Nyt on [turvallisuus](/docs/server-admin/additional-information#security) todentamista tukeva järjestelmä (käyttäjien kirjautuminen sisään) ja valtuutus (myöntää niille pääsy tiettyihin yksityisiin tietokantoihin) .
* On [kaksi, uudet, komentorivityökalut](/docs/server-admin/datasets#tools) auttaa ERDDAP™ hallinnoijat luoda XML uuden aineiston datasets.xml :
    * Luo tiedostoja Xml voi luoda karkean luonnoksen aineisto XML lähes minkä tahansa aineiston.
    * DasDds auttaa sinua toistuvasti testata ja tarkentaa XML-tiedoston. ERDDAP 's GenerateDatasets Xml-verkkosivut on poistettu. Turvallisuussyistä ne tukivat vain muutamia tietoaineistotyyppejä. Uudet komentorivityökalut ovat parempi ratkaisu.
* Uusi [tilasivu](/docs/server-admin/additional-information#status-page) Antaa kenen tahansa (mutta erityisesti hallintoviranomaiset) tarkastella tilan a ERDDAP™ mistä tahansa selaimesta menemällä \\[ baseUrl \\]  /erddap/status.html .
* Tabledap tukee nyt [palvelinsivutoiminnot](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions) :
    * & erota () poistaa kaksi riviä vastaustaulukosta,
    * & orderBy  (...) määrittää, miten vastaustaulukko on lajiteltu,
    * & orderByMax  (...) voit määrittää, miten vastetaulukko on lajiteltu ja poistaa kaikki rivit lukuun ottamatta rivejä, joissa on korkeimmat arvot viimeisessä sarakkeessa. Tätä voidaan käyttää esimerkiksi kunkin aseman viimeisen saatavilla olevan tiedon saamiseksi.
* Taulukon tiedot voivat nyt sisältää lisää päivämääräTime muuttujat, joita ei ole nimetty "time" . Nämä muuttujat tunnistetaan niiden "yksiköt" metatiedot, joiden on sisällettävä " since "   (Numeerinen päivämäärä Ajat) tai "yy" tai "YY" (for formated String dateTimes) . Mutta käytä silti destinationName   "time" pääpäivämäärä Aikamuuttuja.
*    ERDDAP™ Nyt tuottaa [sitemap.xml](/docs/server-admin/additional-information#sitemapxml) tiedosto, joka kertoo hakukoneiden että ERDDAP Vain ryömitään joka kuukausi. ERDDAP™ Hallintovirkamiehet, seuratkaa [nämä ohjeet](/docs/server-admin/additional-information#sitemapxml) ilmoittaa hakukoneille uusi sitemap.xml tiedosto.
*    ERDDAP 's virheviestit ovat nyt paljon lyhyempiä ja suunnattu asiakkaille (ei ohjelmoijia) . Kiitos Greg Williamsin.
* [&lt;pyyntöMusta lista&gt;] (/docs/server-admin/datasets#requestblacklist) nyt tukee myös IP-osoitteita, joissa viimeinen numero on korvattu \\*.
* Pyynnöt .json ja .geoJson tiedostot voivat nyt sisältää valinnainen [jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/) pyyntö lisäämällä "& .json p=_functionName_" kyselyn loppuun. Tämä kertoo kaiken. ERDDAP™ lisätään "_functionName_ ("vastauksen alkuun ja ") "vastauksen loppuun. Jos kyselyä ei alun perin ollut, jätä pois "&" kyselyssä. Kiitos Greg Williamsin.
* Paljon uusia tilastoja lisättiin [Päivittäinen raportti](/docs/server-admin/additional-information#daily-report) .
* Verkkosivuilla on luetteloita tietokannoista, laitos ja tunnisteet ovat nyt äärioikeilla. Tämä siirtää tilauksen ja muita hyödyllisempiä sarakkeita tarkastella kapea tietokoneen näytöt.
* Kaikilla verkkosivuilla, sivun otsikko (perustuu&lt;Otsikko&gt;&lt;StartHeadHtml&gt; että määrittelet setup.xml) muutetaan sisällyttää parempi kuvaus web-sivun (esimerkiksi sisällyttämällä nykyisen tietokokonaisuuden otsikko ja laitos) .
* Xmx tiedot on nyt mukana muistitiedot painettu log.txt, Daily Report, ja tila.html. Kiitos Ellyn Montgomeryn.
*    ERDDAP™ hänellä on lisäsuoja kaikkia virheitä vastaan (Esimerkiksi, OutOfMemoryError) . Charles Carletonin ansiosta.
* Virheiden käsittelyn parantaminen, jos vastaus on jo tehty.
* PARANNETTU: EDDTableF fromFiles and EDDGrid FromFiles nyt vain sallia&lt;metadataFrom&gt; ensimmäinen tai viimeinen. Perimmäistä ei enää tueta. Ja ensimmäinen ja viimeinen perustuvat nyt tiedostojen viime kodifioitu aika.
* Virheen korjaaminen: EDDtableFrom SOS , virheellinen tiedot yhden aseman heitti poikkeuksen ja aiheutti koko tietokokonaisuuden hylätään. Ne asemat on jätetty huomiotta. (ja virheviesti on kirjautunut loki.txt) . Kiitos Rick Blairin.
     

## Versio 1.18{#version-118} 
 (julkaistu 2009-04-08) 

* Bug fix: Alkaen 1.14, EDDTable Data Access Form ja Make A Graph web-sivu ei kunnolla käsitellä lainattuja rajoituksia.
* Bug fix: Alkaen 1.14, EDDtableFromDapSequence ei käsitellyt aikarajoituksia oikein, jos lähde aikayksiköt eivät olleet "sekuntia vuodesta 1970-01-01T00:00:00" .
     

## Versio 1.16{#version-116} 
 (julkaistu 2009-03-26) 

*    ERDDAP™ hallinnoijat:
    * Tämä on tärkeä julkaisu, koska se korjaa vika, joka jätti ERDDAP™ lanka käynnissä, jos käytit Tomcat Manager Stop / Käynnistä tai Lataa ERDDAP . Joten kun asennat 1.16, älä käytä Tomcat Manager vain poistaa vanha ERDDAP™ ja ottaa käyttöön uuden ERDDAP . Sen sijaan: **poistaa vanha ERDDAP™ , käynnistä Tomcat uudelleen (tai palvelimella) , sitten käyttää uutta ERDDAP .** Se on aina hyvä ajatus tehdä, kun asentaa uuden version.
    * Lisätkää [&lt;pyyntöMusta lista&gt;&lt;/pyyntöMusta lista&gt;] (/docs/server-admin/datasets#requestblacklist) ja datasets.xml . Tätä voidaan käyttää määrittämään luettelo asiakkaan IP-osoitteista, jotka on suljettava (Esim. palvelun epäämisen tai liian kiihkeän verkkorobotin torjumiseksi) .
* Nyt on \\[ bigPentDirectory \\] /logs-hakemisto, jota voit pitää ERDDAP™ lokitiedostoja. Kun aloitat ERDDAP™ , se tekee arkisto kopion log.txt ja log. txt. aikaisemmat tiedostot aikaleimalla. Jos oli ongelmia ennen uudelleenkäynnistystä, voi olla hyödyllistä analysoida näitä tiedostoja.
*    ERD S ERDDAP™ Nyt on tilausjärjestelmä päällä.
*    ERDDAP™ Jälleen kerran (mutta ei silti suosittele) "% 26" koodaus "&" pyynnöstä URL (ks. [Asiaan liittyvä v1.14 muutos](#percent26) ) .
* Useita uusia lisäyksiä Tally osion [Päivittäinen raportti](/docs/server-admin/additional-information#daily-report) .
* Pieniä korjauksia tuottaaDatasetsXml.
* Pari pientä korjausta.
     

## Versio 1.14{#version-114} 
 (julkaistu 2009-03-17) 

* Muutokset käyttäjille:
    * Verkkodatapyynnöissä ERDDAP™ tukee nyt: [last-n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last) jossa n on kokonaislukumäärä indeksejä ja [ (viimeinen-d) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses) jossa d on numeerinen arvo (ajan, se on sekuntia) .
    * Taulukon tietopyynnöissä String rajoitteet vaativat nyt [kaksinkertainen lainaus](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings) noin arvo, esimerkiksi, &id="NDBC40121" Tämä on tarpeen DAP Protokolla.
    * Taulukon tietopyynnöissä ERDDAP™ Nyt edellyttää, että [kaikki rajoitteet on koodattu asianmukaisesti](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode) . Selaimet tekevät tämän automaattisesti, joten tämä vaikuttaa useimmiten tietokoneohjelmiin/skripteihin, jotka ovat käytettävissä ERDDAP .
#### %26{#percent26} 
*    [Aiemmin tapahtunutta:](#percent26) a [upota kaavion web-sivu](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html) ja [ ERDDAP™ Google Gadget -verkkosivu](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html) sanoi korvata "&" kuvan URL- osoitteella "% 26." Tästä lähtien sinun pitäisi korvata "&" kuvan URL-osoitteessa "&amp;." Joten sinun täytyy korvata kaikki "% 26" olemassa verkkosivuilla ja Google Gadgets " &amp; ." (Anteeksi.) 
*    ERDDAP™ Hallintovirkamiehet:
    * Lisää seuraava [setup.xml](/docs/server-admin/deploy-install#setupxml) tiedosto (ja vaihtaa lippu Avaimen arvo) :
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

    * Rivillä sen jälkeen&lt;sähköpostiUserName&gt; [setup.xml](/docs/server-admin/deploy-install#setupxml) tiedosto, lisää
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
ja syötä oikea salasanasi.
    * Voit muuttua.&lt;wmsSampleBBox &gt; [setup.xml](/docs/server-admin/deploy-install#setupxml) tiedosto, jossa on enintään 360 pituuspiiriä, esim.
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * • datasets.xml tiedosto, nimeä tiedostotyyppi EDDTableFromNc4DFiles EDDTableFromNcFiles (joka tukee nyt tiedostoja, joiden mitat ovat mitä tahansa) . Jos sinulla on EDDtableFromNc4DFiles-aineisto:
        
        1. Sinun täytyy muuttaa kirjoittaa="EDDtableFromNcFiles" tiedostoihin. XML-tiedosto.
        2. Sinun täytyy lisätä&lt;nMäärät&gt; 4&lt;/nDimensions&gt; tag to the dataset's XML.
        3. Voit lisätä uuden&lt;sortFilesBySourceNames&gt; tag tarkenna tiedostojen sisäinen tilaus, joka määrittää palautettujen tietojen yleisen järjestyksen.
        
Lisätietoja: [EDDTableF fromFiles](/docs/server-admin/datasets#eddtablefromfiles) .
    * Aiemmin EDDtableFromDapSequence, for OPeNDAP DRDS-palvelimet, sisään datasets.xml , käytimme&lt;lähdeCanConstrainStringsRegex&gt;~=&lt;/sourceCanConstrainStringRegex&gt;. Nyt näemme kuitenkin, että DRDS regex -tuki on rajoitetumpaa kuin ERDDAP 's, joten suosittelemme&lt;lähdeCanConstrainStringsRegex&gt;&lt;/sourceCanConstrainStringRegex&gt; siten, että regex-rajoitteita ei siirretä lähde, vaan ne käsitellään ERDDAP .
    * LähdeCanConstrainin uudistettu käsittely... in datasets.xml mennessä [EDDTableFromDapSequence](/docs/server-admin/datasets#eddtablefromdapsequence) sekä (sisäisesti) kaikki DDDTablen tietokokonaisuuden tyypit. Uusi järjestelmä on yksinkertaisempi ja vastaa paremmin eri tietolähteiden vaihtelevuutta. Saatat joutua muuttamaan XML tiedostoja datasets.xml .
* On olemassa useita uusia ominaisuuksia, jotka ovat hyödyllisiä itse, mutta kun yhdessä, myös helpottaa luomista [ruudukot / klusterit / federaatiot ERDDAP tilu](/docs/server-admin/additional-information#grids-clusters-and-federations) .
    * Uudet tietokokonaisuustyypit:
        *    [ EDDGrid FromErddap](/docs/server-admin/datasets#eddfromerddap) sekä [EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap) joka antaa yhden ERDDAP™ sisältää aineiston toiselta ERDDAP™ hyvin yksinkertaisella ja tehokkaalla tavalla.
        *    [ EDDGrid Tiedostoista](/docs/server-admin/datasets#eddgridfromfiles)   (ja sen alaluokka, [ EDDGrid FromNcFiles](/docs/server-admin/datasets#eddgridfromncfiles) jotka osaavat lukea NetCDF   .nc , GRIB .grb ja HDF   .hdf tiedostot) .
        *    [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) jotka osaavat lukea NetCDF   .nc joiden rakenne on pöytämäinen.
    * RunLoadDatasets ja LoadDatasets muutettiin niin, että ERDDAP™ on hyvin reagoiva ladata tiedostoja perustuu tiedostoja [lippu](/docs/server-admin/additional-information#flag) kansio (usein&lt;5 sekuntia, jos pääkuormitusDatasetit on tehty).
    * Uusi palvelu [URL-osoite, jolla luodaan lipputiedosto](/docs/server-admin/additional-information#set-dataset-flag) tietyn aineiston osalta esim.
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
luo lipputiedoston lippuhakemistoon rPmelTaolle (vaikka lippu Avain on väärässä.) .
    * Uusi [tilaus](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) Palvelu siten, että asiakas voi määritellä toimen, joka tehdään, kun tietty tietokokonaisuus luodaan (kun ERDDAP™ aloitetaan uudelleen) ja aina kun tietokokonaisuus muuttuu jollakin tavalla. Tämä järjestelmä voidaan poistaa käytöstä&lt;TilausSystemActive&gt; [setup.xml](/docs/server-admin/deploy-install#setupxml) Tiedosto. • ERDDAP™   [Päivittäinen raportti](/docs/server-admin/additional-information#daily-report) nyt listaa kaikki tilaukset ja sisältää URL tarvitaan peruuttaa jokainen, jos tunnet, että järjestelmää käytetään väärin. Sisään datasets.xml , on uusi, valinnainen [&lt;tilaus SähköpostiMustalista&gt;] (/docs/server-admin/datasets#subscriptionemailblacklist) tag niin, että ylläpitäjät voivat määrittää pilkulla erotettu luettelo sähköpostiosoitteita, jotka on heti mustalla listalla tilausjärjestelmästä.
    * Uusi [&lt;Muutos&gt;] (/docs/server-admin/datasets#onchange) ominaisuus datasets.xml Antaa ERDDAP™ ylläpitäjä määrittää toimen, joka toteutetaan, kun tietty tietokokonaisuus luodaan (kun ERDDAP™ aloitetaan uudelleen) ja aina kun tietokokonaisuus muuttuu jollakin tavalla.
    * Parannukset koko tekstin hakuun: Hakujonon tallentaminen jokaiselle tiedostolle käyttää nyt 1/2 muistia. Hakualgoritmi (Boyer-Mooren kaltainen) Nyt 3X on nopeampi.
    * Sähköposti ERDDAP™ nyt aina prepend aihe ja sisältö \\[ erddap Url \\] , jotta on selvää, mitä ERDDAP™ Tämä tuli (jos käytät useita ERDDAP tilu) .
    * Laajemmat tilastot [Päivittäinen raportti](/docs/server-admin/additional-information#daily-report) Sähköposti.
    * Uusi lokitiedosto \\[ bigPentDirectory \\] /emailLogYEAR-MM-DD.txt lokit kaikki sähköpostit lähettämät ERDDAP™ Joka päivä. Tämä on erityisen hyödyllistä, jos palvelimesi ei voi lähettää sähköpostia -- voit ainakin lukea ne lokista.
    *    ERDDAP™ Nyt tekee \\[ bigPentDirectory \\] /välimuisti ( datasetID ) kansio kunkin tiedoston koska voi olla paljon tiedostoja välimuistissa.
* Uusi [ RSS 2, 01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions) syöte kustakin aineistosta (Etsi oranssia RSS kuvakkeet tietokokonaisuuksien luetteloista, tietojen saatavuuslomakkeista ja tehdä kaavion verkkosivut) .
*    EDDGrid   .kml vastaukset nyt käytä laatoitettuja kuvia ("Superoverlays" -- dynaamisesti luodut neliökuvat) . Alkuperäinen kuva latautuu GoogleEarthiin paljon aiempaa nopeammin. Kartan resoluutio kasvaa, kun zoomaat tiedoston koko resoluutioon asti. Suosittele: käyttäjien tulisi pyytää .kml Yksi aikapiste, mutta aineisto on koko pituus- ja leveysaste. Valitettavasti aikavälien tuki poistettiin (Toivottavasti se palaa.) .
*    ERDDAP™ nyt lisää [Päättymiset ja välimuistin enimmäisiän otsikot](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) kaikkiin tiedostoihin, joita pyydetään /kuvat-hakemistosta. Tämä vähentää huomattavasti staattisia tiedostopyyntöjä lähetetään ERDDAP ja siten suuresti nopeuttaa eniten ERDDAP™ sivulastit. Myös monet Java Script- tiedostoviittaukset siirtyivät niiden HTML-sivujen alareunaan, mikä myös nopeuttaa monia ERDDAP™ sivulastit. Kiitos kirjan "High Performance Web Sites" Steve Souders ja ySlow lisäksi FireBug plugin FireFox.
*    ERDDAP™ Siirtyi netcdf-java 2.2.22 netcdf-java 4.0. Tämä mahdollistaa muun muassa EDDGrid FromNcFiles to ready HDF   .hdf , sekä GRIB .grb ja NetCDF   .nc tiedostot.
*    EDDGrid -Ei. EDDGrid FromNcFiles tukee nyt myös DArray (sekä DGrid)   dataVariable S. Jos ulottuvuudessa ei ole vastaavaa koordinaattimuuttujaa, ERDDAP™ luo akselimuuttujan indeksiarvoilla (esim. 0, 1, 2, ..., 311, 312) . Joten kaikki muut näkökohdat EDDGrid pysyvät samoina:
\\ * Se palvelee edelleen kaikkia tiedostoja ruudukkoina, joissa on akselimuuttuja kullekin ulottuvuudelle.
\\ * Kyselyt voivat edelleen pyytää arvoja akselimuuttujista.
Charles Carletonin, Thomas Imin, Dorian Raymerin ja muiden ansiosta.
* • WMS   OpenLayers sivuilla on nyt oletus pituuspiiri, leveyspiiri, joka on hieman suurempi kuin tietokokonaisuuden vaihteluväli (ei tarkkaa vaihteluväliä, joten konteksti pienten tietoaineistojen on selkeämpää) . Oletusalue voi nyt olla 0-360, mikä mahdollistaa monien tietoaineistojen täyden valikoiman nyt. Kiitos Todd Spindler.
* Uusia liukusäätimiä joissakin tiedonsiirtolomakkeissa ja tehdä kaavio web-sivuja. Ne yksinkertaistavat (raaka) erittely halutuista tiedoista ja antaa hyvää visuaalista palautetta.
* Uusi vaihtoehto&lt;Tietokokonaisuus&gt; tunnisteet datasets.xml : [aktiivinen="false"](/docs/server-admin/datasets#active) .
* Viittaukset ERD S ERDDAP™ muuttunut rannikkokello.pfel (toimii edelleen välityspalvelimen kautta) rannikkovartiostoon.pfeg (parempi) .
* Uusi tuki [ data\\_min sekä data\\_max ](/docs/server-admin/datasets#data_min-and-data_max) muuttujat metatiedot.
* Osittainen liuos [OdotaSitten yritä uudelleen / osittain tulokset poikkeus](/docs/server-admin/additional-information#waitthentryagain-exception) : Nyt jotkut pyynnöt, jotka aiemmin epäonnistuivat, kun tietolähteen muutos havaittiin onnistuu, koska ERDDAP™ lataa tietokokonaisuuden uudelleen ja pyytää tiedot uudelleen automaattisesti alkuperäisen pyynnön yhteydessä.
* Vikakorjaus: luo Dataset Xml ei ollut käytössä ERDDAP™ versio 1.12. Kiitos Ellyn Montgomeryn.
* Pieniä muutoksia virheiden käsittelyyn.
* Monia parannuksia mahdollisten kilpailuolosuhteiden välttämiseksi ja hoitamiseksi (Toisin sanoen mahdolliset ongelmat, jotka johtuvat ERDDAP ) joka aiheutti pieniä, harvinaisia ongelmia.
* Nyt, jos virheviesti on kirjoitettu kuva, kuva pysyy välimuistissa vain ~5-10 minuuttia (60) . Cara Wilsonin ansiosta.
* Vakioviesti, kun tietoja ei ole, on nyt "Sinun kyselysi ei tuottanut vastaavia tuloksia." OPeNDAP Palvelimet.
*    EDDGrid ei enää salli sidottuja akseliarvoja.
* Pieniä muutoksia .ver ja .help pyyntöjä.
* Paljon pieniä muutoksia ja korjauksia.
     

## Versio 1.12{#version-112} 
 (julkaistu 2008-10-31) 

* EDDTableFrom SOS Toimii jälleen NDBC:n kanssa SOS ja toimii uuden NOS:n kanssa SOS .
* DDDTableFromBMDE vaatii nyt ERDDAP™ admin dataVariable S.
*    EDDGrid ei enää vaadi, että lat ja lon on tasainen välilyönti varten. läpinäkyvä Png tai .kml . Kiitos Todd Spindler.
* Muutama pieni muutos.
     

## Versio 1.10{#version-110} 
 (julkaistu 2008-10-14) 

* Uusi "colorBar" metadata data muuttujia datasets.xml määrittää oletusväripalkin asetukset kaavioita ja karttoja. Katso [Lisätietoja](/docs/server-admin/datasets#color-bar-attributes) . Tämä on tärkeää, koska se parantaa suuresti ulkoasua oletuskuvat ja kartat tuotetaan Make A Graph ja koska oletuskuvat ja kartat ovat nyt johdonmukainen väripalkki, vaikka asiakas muuttaa pyydetty aika tai maantieteellinen alue. Lisäksi tämä oli tarpeen WMS .
*    ERDDAP™ Nyt palvelee useimmat verkkotiedot kautta WMS Palvelu. Tämä on tärkeää, koska se osoittaa, että sen lisäksi, että saamme tietoja erityyppisistä datapalvelimet, ERDDAP™ voi jakaa tietoja eri protokollien kautta ( DAP , WMS , ... enemmän tulevaisuudessa) . Katso [asiakasasiakirjat](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html) . Tai [ylläpitoa koskevat asiakirjat](/docs/server-admin/datasets#wms) . Tai [Kokeile.](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html) .
* Uusi tuki pituuspiirin arvoille &gt; 180 .kml tiedostot.
* Uusi cdm\\_data\\_tyyppi: Muu .
*    ERDDAP™ Nyt tukee "boolean"-lähdetietojaType. Katso [Lisätietoja](/docs/server-admin/datasets#boolean-data) Tästä tulee hyödyllinen tulevalle EDDtableF-tiedosta.
* Uusi EDDtableFromBMDE tukee DiGIR/BMDE tietolähteitä.
* EDVGridAxis mahdollistaa nyt lajiteltujen arvojen laskeutumisen. PmelOscar-aineistot tarvitsivat tätä.
*    ERDDAP™ nyt palauttaa HTTP- virheet (esim. "404 resurssille/sivulle, jota ei löydy") useammin tilanteissa, sijasta HTML-sivuja virheviestejä.
* Paljon muutoksia / lisäyksiä ERDDAP™ asiakirjat.
* Paljon pieniä muutoksia.
* Joitakin korjauksia.
*    **Asiat ERDDAP™ hallinnoijien tulisi tehdä päivittää tähän versioon:** 
    * Sisään datasets.xml , kaikille EDDTableFrom SOS Datatiedostot, muuttaa "havainnoituProperty" metadataksi "sourceObservedProperty."
    * Säännöt axisVariable tai dataVariable S destinationName ovat nyt [tiukempi](/docs/server-admin/datasets#datavariable-addattributes) . Tarkista, että muuttujat ovat voimassa. Tarkista ne joko käsin tai juokse ERDDAP™ ja katso virheviestejä raportin, joka on lähetetty ylläpitäjälle.
    * Sisään datasets.xml , jos haluat verkkodatamuuttujan olevan saatavilla kautta WMS , sinun täytyy lisätä väriBar metadata. Ainakin&lt;att nimi=" colorBarMinimum " type="double"&gt;0&lt;/att&gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Katso [Lisätietoja](/docs/server-admin/datasets#wms) .
    * Lisää seuraava [setup.xml](/docs/server-admin/deploy-install#setupxml) tiedosto (mutta muokata sitä tietoja) :

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

## Versio 1.08{#version-108} 
 (julkaistu 2008-07-13) 

* Uusi verkkopalvelu ERDDAP™ , tuottaa Dataset Xml, auttaa ERDDAP™ hallinnoijat luomalla karkea luonnos XML tarvitaan kuvaamaan aineiston datasets.xml 
* Joitakin muutoksia/vikoja korjauksia, jotka liittyvät siihen, että netcdf-jaava voi nähdä opendap-palvelimena, mukaan lukien: maailmanlaajuinen metatieto on nyt merkitty "NC\\_GLOBAL" (GLOBALin sijasta) .
* • EDDGrid ja EDDtable Data Access Forms käyttää nyt kyselyn tietoja URL. Joten esimerkiksi, jos käyttäjä siirtyy Make A Graph -lomakkeesta Data Access -lomakkeeseen, rajoitukset siirretään nyt asianmukaisesti.
*    tabledap 's Make A Graph nyt sallii rajoitteet String muuttujat.
* EDDtable's Make A Graph sallii nyt Nan rajoitteet. Steve Hankinin ansiosta.
* Vikakorjaus: EDDTable tallenna AsImage ei oikein tunnista .colorbar min ja max arvot. Steve Hankinin ansiosta.
* Monet parannukset setupDatasetsXml. Kiitos Ellyn Montgomeryn.
* Griddap-pyynnöt sallitaan nyt () -Tyyli pyytää hieman akselin ulkopuolella. Tämä on aiheellista, koska () - arvot pyöristetään lähimpään todelliseen arvoon. Kiitos Cindy Besseyn.
* Tein FloatArray ja DoubleArray testi on EvenlySpaced kehittyneempi. Se on aina epätäydellinen (koska testi olisi räätälöitävä kunkin tietokokonaisuuden) Sen pitäisi olla parempi. Kiitos Ellyn Montgomeryn.
* Muutin setup.html ja setupDatasets Xml.html erddap /lataa hakemisto ja kova koodattu kaikki linkit niihin. Nyt voin tehdä muutoksia ja päivittää asetukset tiedot välittömästi.
* Paljon pieniä muutoksia. Pari pientä korjausta.
*    **Asiat ERDDAP™ hallinnoijien tulisi tehdä päivittää tähän versioon:** 
    * Siirrä&lt;Lyhyt kuvaus Html&gt; viesteistäsi.xml [setup.xml](/docs/server-admin/deploy-install#setupxml) Tiedosto. Se määrittelee tekstin, joka näkyy keskellä vasemmalla puolella ERDDAP™ Kotisivu. Lisää myös&lt;H1&gt; ERDDAP &lt;H1&gt; (tai jokin muu otsikko) Sen huipulle. **Tai,** kappale&lt;Uusi lyhytkuvausHtml&gt; [setup.xml](/docs/server-admin/deploy-install#setupxml) tiedosto (from the new erddapContent .zip ) Setup.xml.
         

## Versio 1.06{#version-106} 
 (julkaistu 2008-06-20) 

* Uusi tuki IOOS DIF SOS tietolähteet.
* Paljon pieniä muutoksia. Pari pientä korjausta.
     

## Versio 1.04{#version-104} 
 (julkaistu 2008-06-10) 

* Uusi Slide Sorter -ominaisuus.
* Uusi Google Gadgets -sivu ja esimerkkejä.
* Virheen korjaaminen EDDGrid .saveAsNc muuttujan kanssa mittakaava ja addOffset.
     

## Versio 1.02{#version-102} 
 (julkaistu 2008-05-26) 

* Uusi EDDGrid SideBySide mahdollistaa erilaisia axisVariable tilu \\[ 0 \\] lähde Arvoja.
* Kaikki virtaukset ja tuulet yhdistettiin EDDGrid SideBySide-aineistot.
* Kuvapyyntöjen kuvia säilytetään nyt tunnin ajan.
     

## Versio 1.00{#version-100} 
 (julkaistu 2008-05-06) 

* Tee Graafisen web-sivun ja grafiikan komennot URL-osoitteissa.
* Tuki lipputiedostoille tiedoston uudelleen lataamiseksi.
* Uusi tietokokonaisuustyyppi: EDDtableFrom4DFiles (EDDTableF-arkistojen ensimmäinen alaluokka) .
