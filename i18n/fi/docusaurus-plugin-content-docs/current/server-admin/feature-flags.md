# Lippujen ominaisuudet

Tällä sivulla dokumentoidaan järjestelmässä käytettävissä olevat konfiguraatioliput. Nämä liput hallitsevat erilaisia ominaisuuksia, kokeellisia kykyjä ja perintökäyttäytymistä.

##  **Lipun elinkaaren legenda** 

*  **Vakaa:** Pitkän aikavälin lippuja, joiden avulla järjestelmänvalvojat voivat muuttaa toiminnallisuutta. Turvallinen tuotantoon.
*  **Testaus:** Ominaisuudet, jotka ovat valmiita testaamiseen. Nämä joko valmistuvat "Stable" tai lopulta asetetaan niiden tavoitearvo ja poistaa lippu.
*  **Rakentamisen alla:** Tällä hetkellä koodissa on väärennetty, koodauksesta riippumatta. Ominaisuus ei ole vielä valmis käytettäväksi.

##  **&gt; Optimointi testeissä** 

Nämä liput todennäköisesti poistetaan tulevaisuudessa.

###  **Kosketa vain kun kohteet** 

Kuvaus
optimointilippu. Jos on totta, kosketuslanka kulkee vain silloin, kun on asioita, joita käsitellään.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | Testaus | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Lisätty 2.29.0 | 

###  **Tehtävä: Clear** 

Kuvaus
Mahdollistaa taustatehtävän, joka puhdistaa päättyneet kohteet välimuistista.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Lisätty 2.27.0 | 

###  **ncheaderMakeFile** 

Kuvaus
Jos totta, palvelin tuottaa koko nc-tiedoston ennen ncheader-tuloksen luomista. Uusi (Mieluiten) Käyttäytyminen, kun valhe on suoranainen tulos.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | Testaus | 
 |   **Nykyinen oletus**   | Väärin väärä | 
 |   **Pitkän aikavälin tavoite**   | Väärin väärä | 
 |   **Historian historia**   | Lisätty 2.29.0 | 

###  **Käyttövalmius** 

Kuvaus
mahdollistaa käytön Java Instantiate EDD ( ERDDAP Dataa) luokkia.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | Testaus | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Oletus muuttui todeksi 2.28.0, lisätty 2,25 | 

###  **Taustaluominen subsettables** 

Kuvaus
Alijoukkotaulukot voidaan luoda taustasäikeissä, jotta voidaan parantaa tietoaineistojen latausaikaa.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | Testaus | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Lisätty 2.29.0 | 

###  **NcMetadataForFileTable (käytetty)** 

Kuvaus
käyttää NetCDF Metadata populoida tiedostotaulukon näkymä. Erityisesti jos nc-tiedosto sisältää todellisen_range-arvon jokaiselle muuttujalle, tietojen lataaminen voi ohittaa koko tiedoston lukemisen.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Lisätty 2.29.0 | 

##  **Järjestelmä ja ydinkäyttäytyminen** 

###  **Sähköposti Aktiivinen** 

Kuvaus
Järjestelmä yrittää lähettää todellisia sähköposteja (esimerkiksi tilauspäivitysten tai virheilmoitusten osalta) SMTP-palvelimen kautta.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Väärin väärä | 
 |   **Pitkän aikavälin tavoite**   | Todellista (Admin Config)   | 
 |   **Historian historia**   | Legacy | 

Lähde: Info Logic
Lippu lasketaan dynaamisesti käynnistysvaiheessa. Epäonnistuu, ellei kaikki tarvittavat SMTP-tunnukset (isäntä, portti, käyttäjä, salasana, osoitteesta) Se on tiukasti määritelty asennus.xml.
:::

###  **Näyttelijät:LoadErrorsOnStatusPage** 

Kuvaus
Määrittää, näkyvätkö yksityiskohtaiset tiedonsiirtovirheet julkisesti statussivulla.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | kuin haluttu | 
 |   **Historian historia**   | Lisätty 2.25 | 

###  **Epäonnistumismahdollisuus** 

Kuvaus
Aseta oletuskäyttäytyminen siitä, voidaanko tietoaineiston taustalla olevia tiedostoja käyttää tiedostopalvelussa.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Väärin väärä | 
 |   **Pitkän aikavälin tavoite**   | Väärin väärä | 
 |   **Historian historia**   | Lisätty 2.10 | 

##  **&gt; Datasetit** 

###  **Nopea käynnistys** 

Kuvaus
Järjestelmä pyrkii käynnistymään nopeammin ohittamalla tiettyjä perusteellisia validointitarkastuksia tietoaineistoissa aloittamisen aikana.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Lisätty 1.38 | 

###  **mahdollistaa** 

Kuvaus
Mahdollistaa käsittelyn datasets.xml tiedoston kanssa [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Sillä on monia käyttötarkoituksia, kuten yksityisten arvojen asettaminen. (kuin salasanat) ympäristömuuttujat.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | kuin haluttu | 
 |   **Historian historia**   | Lisätty 2.29.0 | 

###  **Käyttäjä:SaxParser** 

Kuvaus
Siirrä sisäistä XML-suojausmoottoria SAX:n käyttöön (Yksinkertainen XML) Sarjan sijaan. Tämä mahdollistaa joitakin kehittyneitä ominaisuuksia, kuten Xinclude. [Mukautetut näytön ominaisuudet](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | Testaus | 
 |   **Nykyinen oletus**   | Väärin väärä | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Lisätty 2.25 | 

###  **PrivateDatasets** 

Kuvaus
määrittää, onko yksityiset tietoaineistot (jotka vaativat todentamista) näkyy päätietojen luettelossa.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Väärin väärä | 
 |   **Pitkän aikavälin tavoite**   | Väärin väärä | 
 |   **Historian historia**   | Lisätty 1.20 | 

###  **Poliittiset rajat** 

Kuvaus
Poliittiset rajat voidaan määritellä kartoilla.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Lisätty 1.80 | 

##  **Metadata & Standards** 

###  **fgdaktiivista** 

Kuvaus
Sukupolvet ja FGDC (liittovaltion maantieteellinen Datakomitea) metadataa.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Lisätty 1.38 | 

###  **Isoäiti 115 Aktiivinen** 

Kuvaus
Käytössä on ISO 19115 metadata.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Lisätty 1.38 | 

###  **Käyttöjärjestelmä 19115** 

Kuvaus
Apache SIS -kirjastolla luodaan ISO 19115 -metadata perintögeneraattorin sijaan. Jos tämä on käytössä ja ei ole SisISO19139, oletusarvoinen IOS 19115 -metadata on ISO19115_3_2016 -muodossa. Jos tämä on virheellistä, oletusmuoto on muutettu ISO19115_2 -muodossa.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | Testaus | 
 |   **Nykyinen oletus**   | Väärin väärä | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Lisätty 2.26 | 

###  **Käyttöjärjestelmä 19139** 

Kuvaus
Apache SIS -kirjastolla luodaan ISO19139_2007-metadata.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | Testaus | 
 |   **Nykyinen oletus**   | Väärin väärä | 
 |   **Pitkän aikavälin tavoite**   | Väärin väärä | 
 |   **Historian historia**   | Lisätty 2.29.0 | 

###  **jsonldactive** 

Kuvaus
Sukupolvet ja palvelut JSON-LD (Liittyvät tiedot) metadataa.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Legacy | 

###  **CroissantSchema** 

Kuvaus
"Croissant" metadata schema on koneoppimisen valmiuden oletuskohta.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | Testaus | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Lisätty 2.28.0 | 

###  **MuuttujiaMustHaveIoosCategory** 

Kuvaus
Muuttujilla on oltava IOOS-luokitus.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | kuin haluttu | 
 |   **Historian historia**   | Legacy | 

###  **Sisältää NCFSubsetVariables** 

Kuvaus
Legacy-käyttäytymisenä oli tuottaa subset-muuttujat vain EDDTableFromNcFiles-tiedostoille. Tämä lisättiin oletusarvoisesti EDDTableFromNcCFiles-käyttäytymiseen muiden aineistotyyppien kanssa. Jos tarvitset automaattista perintöä subsetVariables Voit ottaa tämän käyttöön. Paras ratkaisu olisi lisätä subsetVariables aineiston määritelmään.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | Testaus | 
 |   **Nykyinen oletus**   | Väärin väärä | 
 |   **Pitkän aikavälin tavoite**   | Väärin väärä | 
 |   **Historian historia**   | Lisätty 2.26 | 

##  **• Tilaukset ja ilmoitukset** 

###  **Järjestelmäaktiivinen** 

Kuvaus
Mahdollistaa sähköpostin tilausjärjestelmän tietoaineiston päivityksille.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Lisätty 1.14 | 

###  **Tekijä: RemoteErddapDataset** 

Kuvaus
Sallikaa tämän ERDDAP Etätilaaminen ERDDAP päivityksiin liittyviä tietoja.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Lisätty 1.70 | 

###  **PäivitysSubsRssOnFileChanges** 

Kuvaus
Triggersin tilaus ja RSS Päivitykset, kun taustalla olevat tiedostot muuttuvat. Perintökäyttäytyminen teki vain päivityksiä tietoaineiston lataamiseen. (joita palvelimilla oli yhtä usein kuin viikoittain) .

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Lisätty 2.26 | 

###  **mahdollistaa MqttBroker** 

Kuvaus
Käynnistä sisäinen MQTT-välittäjä sovelluksessa viestien käsittelyyn.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | Testaus | 
 |   **Nykyinen oletus**   | Väärin väärä | 
 |   **Pitkän aikavälin tavoite**   | kuin haluttu | 
 |   **Historian historia**   | Lisätty 2.29.0 | 

###  **Lähde:MqttNotif** 

Kuvaus
Mahdollistaa ilmoitusten julkaisemisen (Tietojen muuttaminen) MQTT-välittäjä.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | Testaus | 
 |   **Nykyinen oletus**   | Väärin väärä | 
 |   **Pitkän aikavälin tavoite**   | kuin haluttu | 
 |   **Historian historia**   | Lisätty 2.29.0 | 

##  **Web Headers / Konfiguraatio** 

###  **Käyttöpäät Url** 

Kuvaus
HTTP-otsikoiden avulla voidaan määrittää pyynnön URL-osoitteen tiedot (Hyödyllisiä proksien takana) .

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Oletus muuttui todeksi 2.28.0, lisätty 2.27.0 | 

###  **mahdollistaa Cors** 

Kuvaus
Mahdollistaa Cross-Origin -resurssien jakamisen (Koruja) HTTP-vastaukset.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Väärin väärä | 
 |   **Pitkän aikavälin tavoite**   | kuin haluttu | 
 |   **Historian historia**   | Lisätty 2.26 | 

##  **Search** 

###  **Käyttöluettelo** 

Kuvaus
Siirrä sisäinen hakukone käyttää Apache Lucene.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | Testaus | 
 |   **Nykyinen oletus**   | Väärin väärä | 
 |   **Pitkän aikavälin tavoite**   | ?? | 
 |   **Historian historia**   | Legacy | 

##  **Palvelut ja pöytäkirjat** 

###  **tiedostoja aktiivisesti** 

Kuvaus
Mahdollistaa "Files"-selainnäkymän tietoaineistoille, jotka tukevat sitä.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Lisätty 1.58 | 

###  **Transaktiivisuus** 

Kuvaus
mahdollistaa muuntotyökalut UI:ssa.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Lisätty 1.44 | 

###  **Sorteraktiivisuus** 

Kuvaus
Sisältää Slide Sorterin.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Lisätty 1.44 | 

###  **Palveluntarjoaja FormActive** 

Kuvaus
mahdollistaa lomakkeen, jonka avulla tietojen tarjoajat voivat syöttää metatietoja.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Legacy | 

###  **OutDateDatasetsActive** 

Kuvaus
mahdollistaa ajantasaisten tietoaineistojen raportoinnin.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Lisätty 1.82 | 

###  **ms aktiivisesti** 

Kuvaus
Verkkokarttapalvelun käyttöönotto ( WMS ) rajapinta.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Lisätty 1.44 | 

###  **MSClientActive** 

Kuvaus
Mahdollistaa sisäisen WMS asiakkaan ominaisuuksia.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | vakaa | 
 |   **Nykyinen oletus**   | Todellista | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
 |   **Historian historia**   | Legacy | 

###  **GeoServices** 

Kuvaus
mahdollistaa RESTful Geospatial-palveluiden käyttöliittymä. Ei täysin toteutettu.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | Rakentamisen alla | 
 |   **Nykyinen oletus**   | Väärin väärä (Hardcode)   | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 

###  **WC** 

Kuvaus
Verkon kattavuuspalvelun käyttöönotto ( WCS ) rajapinta. Ei täysin toteutettu.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | Rakentamisen alla | 
 |   **Nykyinen oletus**   | Väärin väärä (Hardcode)   | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 

###  **Sonsaktiivisuus** 

Kuvaus
Sensorin tarkkailupalvelun käyttöönotto ( SOS ) rajapinta.

 | omaisuus | Yksityiskohdat | 
 | :--- | :--- | 
 |   **elinkaari**   | Rakentamisen alla | 
 |   **Nykyinen oletus**   | Väärin väärä (Hardcode)   | 
 |   **Pitkän aikavälin tavoite**   | Todellista | 
