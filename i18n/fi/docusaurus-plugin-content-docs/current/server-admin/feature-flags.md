# Ominaisuusliput

Tällä sivulla dokumentoidaan järjestelmän asetusliput. Nämä liput kontrolloivat erilaisia ominaisuuksia, kokeellisia ominaisuuksia ja perinteistä käyttäytymistä.

##  **Lippu Lifecycle Legend** 

*  **Vakaa:** Suunniteltu pitkän aikavälin lippuja, jotta ylläpitäjät voivat muuttaa toimintoja. Turvallinen tuotannolle.
*  **Testaus:** Ominaisuudet, jotka ovat valmiita testattavaksi. Nämä joko valmistuvat "stabiiliksi" tai asetetaan lopulta niiden tavoitearvoon ja poistetaan lippu.
*  **Rakennuksessa:** Tällä hetkellä koodattu vääräksi koodissa riippumatta konfiguraatiosta. Ominaisuus ei ole vielä valmis käyttöön.

##  **... Optimointi testauksessa** 

Nämä ovat todennäköisesti tulevaisuudessa poistettavat liput.

###  **kosketaThradeVain silloin, kun** 

Tavaran kuvaus
Optimointilippu. Jos se on totta, kosketuslanka toimii vain silloin, kun on asioita käsiteltävänä.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Testaus | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Lisätty 2.29.0 | 

###  **tehtäväCacheClear** 

Tavaran kuvaus
Mahdollistaa taustatehtävän, joka poistaa vanhentuneet kohteet välimuistista.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Lisätty 2.27,0 | 

###  **ncHeaderMakeFile** 

Tavaran kuvaus
Jos totta palvelin luo koko nc-tiedoston ennen kuin luot ncheaderin tuloksen. Uusi (parempi) Käyttäydy, kun väärä on suoraan luoda Ncheader tulos.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Testaus | 
 |   **Oletus**   | väärä | 
 |   **Pitkän aikavälin tavoite**   | väärä | 
 |   **Historia**   | Lisätty 2.29.0 | 

###  **useEdddReflection** 

Tavaran kuvaus
Mahdollistaa Java EDD:n instantiointi ( ERDDAP Dataset) kurssit.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Testaus | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Oletus muuttunut todeksi kohdassa 2.28.0, lisätty kohtaan 2.25 | 

###  **taustaCreateSubsetTables** 

Tavaran kuvaus
Sallii osajoukkotaulukot luodaan taustakierteitä parantaa tietoaineistojen latausaika.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Testaus | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Lisätty 2.29.0 | 

###  **useNcMetadataForFileTable** 

Tavaran kuvaus
Käyttö NetCDF metadataa tiedostotaulukosta. Erityisesti jos nc-tiedosto sisältää kunkin muuttujan todellisen_vaihteluvälin, tiedoston lataus voi ohittaa koko tiedoston lukemisen.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Lisätty 2.29.0 | 

##  **Järjestelmä & ydin käyttäytyminen** 

###  **sähköposti Aktiivinen** 

Tavaran kuvaus
Valvoo, yrittääkö järjestelmä lähettää oikeita sähköposteja (Esimerkiksi tilauspäivityksiä tai virheraportteja varten) SMTP-palvelimen kautta.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | väärä | 
 |   **Pitkän aikavälin tavoite**   | tosi (Riippuu admin config)   | 
 |   **Historia**   | Perintö | 

:: info Logic
Tämä lippu lasketaan dynaamisesti käynnistettäessä. Se on virheellinen, ellei kaikki vaaditut SMTP-tiedot (isäntä, portti, käyttäjä, salasana, osoitteesta) ovat tiukasti toimitetaan setup.xml.
:

###  **näytäLoadErrorsOnStatusPage** 

Tavaran kuvaus
Määrittää, jos yksityiskohtaiset tiedostojen kuormitusvirheet näkyvät julkisesti tila sivulla.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | Aseta haluamallasi tavalla | 
 |   **Historia**   | Lisätty 2.25 | 

###  **OletusAccessibleViaFiles** 

Tavaran kuvaus
Asettaa oletuskäyttäytymisen siitä, voidaanko tiedoston taustalla olevia tiedostoja käyttää tiedostopalvelussa.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | väärä | 
 |   **Pitkän aikavälin tavoite**   | väärä | 
 |   **Historia**   | Lisätty kohtaan 2.10 | 

##  **** 

###  **pikakäynnistys** 

Tavaran kuvaus
Jos käytössä, järjestelmä yrittää käynnistyä nopeammin ohittamalla tiettyjä syvä validointi tarkastuksia tietokokonaisuuksia alustamisen aikana.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Lisätty 1,38 | 

###  **Ota EnvParsing käyttöön** 

Tavaran kuvaus
Mahdollistaa käsittelyn datasets.xml tiedosto, jolla [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Tällä on monia käyttötarkoituksia, kuten yksityisten arvojen asettaminen (kuten salasanat) ympäristömuuttujien käyttö.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | Aseta haluamallasi tavalla | 
 |   **Historia**   | Lisätty 2.29.0 | 

###  **käytäSaxParseria** 

Tavaran kuvaus
Vaihda sisäinen XML jäsennys moottori käyttää SAX (Yksinkertainen XML- sovellusliittymä) -Ei DOM-järjestäjää. Tämä mahdollistaa joitakin uusia kehittyneitä ominaisuuksia kuten XInclude, ja [mukautetut näytön ominaisuudet](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Testaus | 
 |   **Oletus**   | väärä | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Lisätty 2.25 | 

###  **luetteloPrivateDatasets** 

Tavaran kuvaus
Määrittää onko yksityinen tietoaineisto (jotka edellyttävät todentamista) esitetään päätietoluettelossa.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | väärä | 
 |   **Pitkän aikavälin tavoite**   | väärä | 
 |   **Historia**   | Lisätään 1.20 kohtaan. | 

###  **poliittiset rajatAktiivinen** 

Tavaran kuvaus
Valvoo, voidaanko kartalle piirtää poliittisia rajoja.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Lisätty 1,80 | 

###  **VoimaSynchronousLoading** 

Tavaran kuvaus
Kuormitustietokokonaisuudet synkronoitu eikä lykätty taustakuormitus.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | väärä | 
 |   **Pitkän aikavälin tavoite**   | väärä | 
 |   **Historia**   | Lisätty 2.30 | 

##  **Metatiedot ja standardit** 

###  **fgdcActive** 

Tavaran kuvaus
Luo ja palvelee FGDC:tä (Federal Geographic Datakomitea) metadata.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Lisätty 1,38 | 

###  **iso19115 Aktiivinen** 

Tavaran kuvaus
Luo ja palvelee ISO 19115 metatietoja.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Lisätty 1,38 | 

###  **useSisISO19115** 

Tavaran kuvaus
Käyttää Apache SIS -kirjastoa ISO 19115 -metadatan tuottamiseen aiemman generaattorin sijaan. Jos tämä on päällä ja käyttääSisISO19139 ei ole päällä, oletus IOS 19115 metadata on ISO 19115_3_2016-muodossa. Jos tämä on väärä oletusmuoto on perintöä muutettu ISO19115_2 muodossa.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Testaus | 
 |   **Oletus**   | väärä | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Lisätty 2.26 | 

###  **useSisISO19139** 

Tavaran kuvaus
Käyttää Apache SIS-kirjastoa ISO19139_2007 -metatiedon tuottamiseen.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Testaus | 
 |   **Oletus**   | väärä | 
 |   **Pitkän aikavälin tavoite**   | väärä | 
 |   **Historia**   | Lisätty 2.29.0 | 

###  **jsonldActive** 

Tavaran kuvaus
Luo ja palvelee JSON-LD:ää (Linkit) metadata.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Perintö | 

###  **createCroissantSchema** 

Tavaran kuvaus
Luo "Croissant" metadata skeema oletuksena skeema koneen oppimisen valmius.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Testaus | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Lisätty 2.28.0 | 

###  **muuttujatHaveIoos-luokka** 

Tavaran kuvaus
Voimat, että muuttujat on oltava IOOS luokka ominaisuus.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | Aseta haluamallasi tavalla | 
 |   **Historia**   | Perintö | 

###  **includeNcCFSubsetVarataan** 

Tavaran kuvaus
Legacy käyttäytyminen oli luoda subset muuttujia vain EDDtableFromNcCFFles tietoaineistot. Tämä lisättiin oletuksena käyttäytyminen EDDtableFromNcCFFles olla yhdenmukainen muiden tiedostotyyppien. Jos tarvitset perinnön automaattinen subsetVariables Voit sallia tämän. Parempi ratkaisu olisi lisätä subsetVariables tietokokonaisuuden määritelmään.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Testaus | 
 |   **Oletus**   | väärä | 
 |   **Pitkän aikavälin tavoite**   | väärä | 
 |   **Historia**   | Lisätty 2.26 | 

##  **Tilaukset ja ilmoitukset** 

###  **TilausSystemActive** 

Tavaran kuvaus
Mahdollistaa sähköpostin tilausjärjestelmän tiedostojen päivityksiä varten.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Lisätään kohtaan 1.14. | 

###  **tilataToRemoteErddapDataset** 

Tavaran kuvaus
Mahdollistaa tämän ERDDAP esimerkiksi tilata etä ERDDAP tiedot päivityksistä.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Lisätty 1,70 | 

###  **updateSubsRssOnFileMuutoksia** 

Tavaran kuvaus
Matkanjärjestäjät RSS päivittää, kun taustalla olevat tiedostot muuttuvat. Perinnöllinen käytös oli vain tehdä päivityksiä aineisto uudelleen ladata (Jotkut palvelimet oli yhtä harvoin kuin viikoittain) .

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Lisätty 2.26 | 

###  **käytössä MqttBroker** 

Tavaran kuvaus
Aloittaa sisäisen MQTT-välittäjän sovelluksen sisällä viestien käsittelyyn.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Testaus | 
 |   **Oletus**   | väärä | 
 |   **Pitkän aikavälin tavoite**   | Aseta haluamallasi tavalla | 
 |   **Historia**   | Lisätty 2.29.0 | 

###  **julkaistaMqttNotif** 

Tavaran kuvaus
Mahdollistaa ilmoitusten julkaisemisen (kuten tietokokonaisuuksien muutokset) MQTT-välittäjälle.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Testaus | 
 |   **Oletus**   | väärä | 
 |   **Pitkän aikavälin tavoite**   | Aseta haluamallasi tavalla | 
 |   **Historia**   | Lisätty 2.29.0 | 

##  **Web-otsikot/konfiguraatio** 

###  **useOtsikko Url** 

Tavaran kuvaus
Sallii HTTP- otsikoiden käytön pyynnön URL-tietojen määrittämiseen (hyödyllisiä apurahojen takana) .

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Oletus muuttunut todeksi 2.28.0, lisätty 2.27.0 | 

###  **käytössä Cors** 

Tavaran kuvaus
Mahdollistaa lähtöalueiden välisen resurssien jakamisen (KORIT) HTTP-vastausten otsikot.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | väärä | 
 |   **Pitkän aikavälin tavoite**   | Aseta haluamallasi tavalla | 
 |   **Historia**   | Lisätty 2.26 | 

##  **Etsi** 

###  **useLuceneSearchEngine** 

Tavaran kuvaus
Vaihda sisäinen hakukone käyttää Apache Lucene.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Testaus | 
 |   **Oletus**   | väärä | 
 |   **Pitkän aikavälin tavoite**   | ? | 
 |   **Historia**   | Perintö | 

##  **Palvelut & Protokollat** 

###  **tiedostotAktiivinen** 

Tavaran kuvaus
Mahdollistaa tiedostojen selaimen näkymän tiedostoille, jotka tukevat sitä.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Lisätty 1,58 | 

###  **MuuttajatAktiivinen** 

Tavaran kuvaus
Mahdollistaa muuntaminen työkaluja käyttöliittymässä.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Lisätty 1,44 | 

###  **diaSorterActive** 

Tavaran kuvaus
Slide Sorter on käytössä.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Lisätty 1,44 | 

###  **dataProviderFormActive** 

Tavaran kuvaus
Sallii lomakkeen, jonka avulla tietojen tarjoajat voivat syöttää metatietoja.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Perintö | 

###  **outOfDateDatasetsActive** 

Tavaran kuvaus
Mahdollistaa vanhentuneiden tietoaineistojen raportoinnin.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Lisätty 1.82 | 

###  **WMSActive** 

Tavaran kuvaus
Mahdollistaa verkkokarttapalvelun ( WMS ) käyttöliittymä.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Lisätty 1,44 | 

###  **wmsClientActive** 

Tavaran kuvaus
Mahdollistaa sisäisen WMS asiakkaan ominaisuudet.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Vakaa | 
 |   **Oletus**   | tosi | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
 |   **Historia**   | Perintö | 

###  **GeoServicesRestactive** 

Tavaran kuvaus
Mahdollistaa RESTful Geospatiaalipalvelujen käyttöliittymä. Ei täysin toteutettu.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Rakentamisessa | 
 |   **Oletus**   | väärä (Koodattu)   | 
 |   **Pitkän aikavälin tavoite**   | tosi | 

###  **wcsActive** 

Tavaran kuvaus
Mahdollistaa Web Coverage -palvelun ( WCS ) käyttöliittymä. Ei täysin toteutettu.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Rakentamisessa | 
 |   **Oletus**   | väärä (Koodattu)   | 
 |   **Pitkän aikavälin tavoite**   | tosi | 

###  **sosActive** 

Tavaran kuvaus
Mahdollistaa sensorien tarkkailupalvelun ( SOS ) käyttöliittymä.

 | Omaisuus | Yksityiskohdat | 
 | ---- | ---- | 
 |   **Elinkaari**   | Rakentamisessa | 
 |   **Oletus**   | väärä (Koodattu)   | 
 |   **Pitkän aikavälin tavoite**   | tosi | 
