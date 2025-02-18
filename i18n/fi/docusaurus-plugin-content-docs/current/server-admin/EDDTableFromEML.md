---
title: "EDDTableFromEML"
sidebar_position: 6
---
# EDDTableFromEML ja EDDTableFromEMLBatch Vaihtoehtoja GenerateDatasets XM

\\[Tämä sivu kiinnostaa vainERDDAP™Järjestäjät, jotka työskentelevät EML-tiedostojen kanssa.
Tämä asiakirja on alun perin luotu vuonna 2016. Se julkaistiin viimeksi vuosina 2020-11-30.\\]

[ **ERDDAP™** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)Tietopalvelin, joka antaa käyttäjille yksinkertaisen, johdonmukaisen tavan ladata verkko- ja tabulaarisia tieteellisiä tietoaineistoja yhteisissä tiedostomuodoissa ja tehdä kaavioita ja karttoja.ERDDAP™toimii tietyllä tietoaineistolla joko moniulotteisten muuttujien ryhmänä (esimerkiksi satelliitti- tai mallitiedot) Tietokannan kaltainen taulukko (jokaiselle tietotyypille ja rivi jokaiselle havainnolle) .ERDDAP™Se on vapaa ja avoin lähdekoodi, joten kuka tahansa voi[Lataa ja asennaERDDAP™](/docs/server-admin/deploy-install)palvellakseen tietojaan.

Lisätään tietoaineisto yhdelleERDDAP™Asennus,ERDDAP™Hallinnoitsijan on lisättävä XML:n merkki, joka kuvaa tietoaineistoa tiedostoon, jota kutsutaan nimellä tiedosto.datasets.xml. (On olemassa[perusteellinen dokumentointidatasets.xml](/docs/server-admin/datasets).) Vaikka XML:ää voidaan tuottaadatasets.xmlkokonaan käsin,ERDDAP™Sisältää työkalun, jota kutsutaan[ **GenerateDatasetsXml** ](/docs/server-admin/datasets#tools)jotka voivat luoda karkean XML:n luonnoksen, jota tarvitaan tiettyyn tietoaineistoon, joka perustuu johonkin tietolähteeseen.

Ensimmäinen GenerateDatasets Xml kysyy, millaista dataa haluat luoda. GenerateDatasets XML on erityinen vaihtoehto. **EDDTableFromEML** joka käyttää tietoja eräässä[Ekologinen kieli (EML) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XML-tiedoston luominen XML-levylledatasets.xmlluodaan[EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles)Tiedot kustakin taulukosta EML-tiedostossa. Tämä toimii hyvin useimmille EML-tiedostoille, lähinnä siksi, että EML-tiedostot tekevät erinomaista työtä kaikkien tarvittavien metatietojen tallentamiseksi tietoaineistoon helppokäyttöisessä muodossa. Tiedot, jotka GenerateDatasetsXml:n on luotava tietoaineistot, ovat EML-tiedostossa, mukaan lukien URL-osoite tietotiedostolle, jonka GenerateDatasetsXml lataa, pakkaa ja vertailee EML-tiedoston kuvausta. (Monet ryhmät voisivat siirtyä EML:ään, mikä on hyvä järjestelmä, jolla dokumentoidaan mitä tahansa tabulaarista tieteellistä tietoa, ei vain ekologista tietoa. Ja monet ryhmät, jotka luovat XML-rakenteita, voisivat käyttää EML:ää selkeän XML-rakenteen tapaustutkimuksena. (Liikaa tasoja) Ihmisille ja tietokoneille on helppo työskennellä.) 

## Kysymyksiä{#questions} 

Tässä kaikki kysymykset GenerateDatasets Xml kysyy kommentteja siitä, miten sinun pitäisi vastata, jos haluat käsitellä vain yhden EML-tiedoston tai EML-tiedostojen erän:

* Mikä EDDType?
Jos haluat käsitellä vain yhden tiedoston, vastaa: EDDTableFromEML
Jos haluat käsitellä ryhmän tiedostoja, vastaa: EDDTableFromEMLBatch
* Ohjaus tiedostojen tallentamiseen?
Kirjoita hakemiston nimi, jota käytetään ladattujen EML- ja/tai tietotiedostojen tallentamiseen.
Jos hakemistoa ei ole, se luodaan.
*    (EDDTableFromEML Vain vain vain) EML URL tai paikallinen tiedostonimi?
Kirjoita EML-tiedoston URL-osoite tai paikallinen tiedostonimi.
*    (Vain EDDTableFromEMLBatch) EML likainen (URL tai paikallinen) ??
Kirjoita hakemiston nimi EML-tiedostoilla (URL tai paikallinen lika) .
Esimerkiksi: http://sbc.lternet.edu/data/eml/files/
 
*    (Vain EDDTableFromEMLBatch) Filename Regex?
Syötä säännöllinen ilmaisu, jota käytetään EML-hakemiston haluttujen EML-tiedostojen tunnistamiseen.
Esimerkiksi knb-lter-sbc. +
* Käytä paikallisia tiedostoja, jos (Todellista|Väärin väärä) ??
Syötä aitoa käyttää olemassa olevia paikallisia EML-tiedostoja ja datatiedostoja, jos niitä on.
Syötä väärennettyjä, jotta voit aina ladata EML-tiedostoja ja/tai datatiedostoja uudelleen.
* Saatavuus To?
Jos haluat, että uudet tietoaineistot ovat yksityisiä tietoaineistojaERDDAPmäärittää ryhmän nimi (s) Tämä on sallittua pääsyä.
Suositellaan LTER-ryhmille: Yhdistä "Lter" ja ryhmä, esim. Sbc.
Jos tulet "null", ei ole&lt;Saatavuus To &gt: Tag in the output.
Näytä[Saatavuus To](/docs/server-admin/datasets#accessibleto).
* Paikallinen Aikavyöhyke (Yhdysvallat/Tyynenmeren alue) ??
Jos aikamuuttuja osoittaa, että sillä on paikallisia aika-arvoja, tämä aikavyöhyke määritetään.
Tämän on oltava arvoa[TZ-sarakkeiden luettelo aikavyöhykkeiden nimistä](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
Huomaa kaikki helppokäyttöiset "US/..."-nimet listan lopussa.
Jos myöhemmin huomaat, että se on väärin, voit muuttaatime\\_zoneSäveltäjä The Chunk ofdatasets.xml.

EML plusERDDAP™Se on hyvä yhdistelmä, koskaERDDAP™Se voi antaa käyttäjille enemmän suoraa pääsyä varallisuuteen.[Biokompleksisuuden osaamisverkosto (KNB) ](https://knb.ecoinformatics.org/)ja[Pitkäaikainen ekologinen tutkimus (Lähteet) ](https://lternet.edu/)Tutustu ja auta näitä hankkeita USA:n hallituksen[Julkinen pääsy tutkimustuloksiin (Paar) Vaatimukset](https://nosc.noaa.gov/EDMC/PD.DSP.php)asettamalla tiedot saataville verkkopalvelun kautta. EML plusERDDAP™Näyttää olevan suuri silta tiedemiesten välillä akateemisessa / NSF-rahoitetussa maailmassa ja tiedemiehet liittovaltion virastossa. (NOAANasa, USGS) todellisuutta.

Katso meidän[Lisätuen saaminen](/docs/intro#support).
 
## Design yksityiskohdat{#design-details} 

Tässä ovat EDDTableFromEML-vaihtoehdon suunnittelutiedot GenerateDatasetsXml.
Jotkin ovat yhteydessä EML:n jaERDDAP™Tee asioita ja miten GenerateDatasets XML käsittelee näitä ongelmia.

### Yksi taulukko on yksiERDDAP™Dataa{#one-datatable-becomes-one-erddap-dataset} 
Yksi EML-tiedosto voi olla useita&lt;Datatiedot Table &gt;s.ERDDAP™tekee yhdenERDDAP™tietoja EML-tietotaulukosta. ThedatasetIDKoska aineisto on
 *EMLName* t *Pöytänumero*   (Kun EMLname on teksti) tai tai
 *Järjestelmä* t *Pöytänumero*   (Kun EML-nimi on numero) .
Esimerkiksi taulukko #1 tiedostossa knb-lter-sbc.28, tuleeERDDAP™ datasetID= knb \\ t1,
     
### EML vs. CF+ACDD{#eml-versus-cfacdd} 
Lähes kaikki EML-tiedostojen metatiedot pääsevätERDDAPmutta eri muodossa.ERDDAP™käyttää[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)ja[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metatiedot. Ne ovat täydentäviä metatietojärjestelmiä, jotka käyttävät globaaleihin metatietoihin ja kunkin muuttujan metatietoja.
Kyllä, metatietojen EML-edustus on kauniimpi kuin CF+ACD. En suosittele CF+ACDD:n korvaamista. Ajattele CF+ACD:tä osana EML-maailman siltaa.OPeNDAPCF/ACDD-maailma.
     
### Pieniä muutoksia{#small-changes} 
ERDDAP™tekee paljon pieniä muutoksia. Esimerkiksi,ERDDAP™EML ei-DOIVaihtoehtoinen Identifioija ja datataulukkonumeroERDDAP™ datasetIDMuutos hieman vaihtuu Tunniste, joka tekee siitä pätevän muuttujanimen useimmilla tietokonekielillä, esim. knb-lter-sbc.33 Taulukko #1 muuttuu knb \\ t1.
     
### DocBook{#docbook} 
EML käyttää DocBookin merkintäjärjestelmää tarjotakseen rakenteita tekstin estämiseksi EML-tiedostoissa. CF ja ACDD edellyttävät, että metatiedot ovat yksinkertaisia. GenerateDatasets Xml muuntaa merkityn tekstin selkeäksi tekstiksi, joka näyttää tekstin muotoiluversiolta. Inline-tunnisteet on sanitoitu neliöpusseilla, esim.\\[korostaa\\]ja jätetty tekstiin.
     
### Datatiedostot{#data-files} 
Koska EML-tietotaulukko sisältää todellisen datatiedoston URL-osoitteen, GenerateDatasets XML tulee:
1. Lataa datatiedosto.
2. Säilytä se samassa hakemistossa kuin EML-tiedosto.
3. Lue tiedot.
4. Vertaa EML:n tietojen kuvausta tiedoston todellisiin tietoihin.
5. Jos generaattorit Xml löytää eroja, käsittelee niitä tai kysyy operaattorilta, onko erot kunnossa tai palauttaa virheilmoituksen. Yksityiskohdat ovat eri alla.
         
### .zipD Data Files{#zipd-data-files} 
Jos mainitut tiedot ovat.ziptiedosto, sen täytyy sisältää vain yksi tiedosto. Tätä tiedostoa käytetäänERDDAP™Dataa. Jos tiedostoja on enemmän kuin yksi.ERDDAP™hylkäävät tämän tietoaineiston. Tarvittaessa sitä voidaan muuttaa. (Käytännössä kaikilla SBC LTER -lisätiedostoilla on vain yksi tietotiedosto.)   
     
### Varastointityyppi{#storagetype} 
Jos sarakkeen tallennus Tyyppi ei ole määritelty,ERDDAP™Paras arvaus perustuu datatiedoston tietoihin. Tämä toimii melko hyvin.
     
### Yksiköt{#units} 
ERDDAP™käyttää[UDUNITSYksiköiden muotoilu](https://www.unidata.ucar.edu/software/udunits/). GenerateDatasets Xml muuntaa EML-yksikötUDUNITSNoin 95 prosenttia ajasta. Jäljelle jäävä 5% johtaa luettavaan kuvaukseen yksiköistä, esim. "biomassDensityUnitPerAbundanceUnit" EML:ssä muuttuu "biomass tiheysyksikkö per runsausyksikkö".ERDDAP. Teknisesti tämä ei ole sallittua. En usko, että se on niin paha olosuhteissa.\\[Tarvittaessa yksiköitä, joita ei voi tehdäUDUNITSYhteensopiva voidaan siirtää muuttujan kommentin ominaisuuteen.\\]  
     
### EML-versio 2.1.1{#eml-version-211} 
Tämä EML v2.1.1 -tiedostojen tuki lisättiin GenerateDatasetsille. Vuonna 2016 Xml toivoi, että EML-yhteisössä olisi jotain. Vuoteen 2020 mennessä näin ei ole tapahtunut. TheERDDAP™Kehittäjät voisivat mielellään lisätä EML:n uusimpien versioiden tukemista, mutta vain jos uusia ominaisuuksia käytetään. Sähköpostiaerd.data at noaa.govJos haluat tukea uusimpia versioita EML:stä ja käytät tätä ominaisuutta.
     

## EML-tiedostojen ongelmat{#issues-with-the-eml-files} 

On joitakin ongelmia / ongelmia EML-tiedostoja, jotka aiheuttavat ongelmia, kun ohjelmiston asiakas (EDDTableFromEML vaihtoehto GenerateDatasetsXML) EML-tiedostojen tulkinta/käsittely.

* Vaikka listalla on useita ongelmia, ne ovat pääosin pieniä ja ratkaisevia ongelmia. Yleisesti ottaen EML on hyvä järjestelmä ja on ollut ilo työskennellä sen kanssa.
* Nämä ovat suunnilleen pahimpia / yleisimpiä huonoja / vähemmän yleisiä.
* Useimmat liittyvät pieniin ongelmiin tietyissä EML-tiedostoissa. (Mikä ei ole EML:n vika) .
* Useimmat voidaan korjata yksinkertaisilla muutoksilla EML-tiedostoon tai datatiedostoon.
* Koska LTER-ihmiset rakentavat EML-tarkastajaa testaamaan EML-tiedostojen pätevyyttä, olen lisännyt joitakin alla olevia ehdotuksia koskien ominaisuuksia, jotka voidaan lisätä tarkistimeen.

Tässä ovat ongelmat:

### Erilliset päivämäärät ja aikasarakkeet{#separate-date-and-time-columns} 
Joissakin tiedostoissa on erillisiä sarakkeita ajantasaisesti, mutta ei yhtenäistä päivämäärää + ajan saraketta. Tällä hetkellä GenerateDatasets Xml luo aineiston näiden erillisten sarakkeiden kanssa, mutta se ei ole ihanteellinen, koska:

* On parempi, jos tiedostotERDDAP™yhdistetty päivämäärä + aika kolumni, jota kutsutaan"time".
* Usein aineisto ei lataudu sisäänERDDAP™Koska"time"Sarakkeella ei ole päivämäärää+aikaa.

Mahdollisia ratkaisuja on kaksi:
1. Muokkaa lähdetiedostoa lisätäksesi uuden sarakkeen datatiedostoon (Kuvaile sitä EML:ssä) kun päivämäärä ja kellonaika yhdistetään yhteen sarakkeeseen. Return GenerateDatasets XML löytää uuden kolumnin.
2. Käytä[Johdettuja muuttujia](/docs/server-admin/datasets#script-sourcenamesderived-variables)OminaisuusERDDAP™määritellä uusi muuttujadatasets.xmljoka luodaan yhdistämällä päivämäärä ja aika sarakkeet. Yksi esimerkki käsittelee erityisesti tätä tilannetta.
         
### Epäjohdonmukainen nimi{#inconsistent-column-names} 
EML-tiedostot listaavat datatiedoston sarakkeet ja niiden nimet. Valitettavasti ne eroavat usein varsinaisen datatiedoston sarakkeiden nimistä. Normaalisti EML-tiedoston saraketilaus on sama kuin datatiedoston saraketilaus, vaikka nimet vaihtelevat hieman, mutta eivät aina. GenerateDatasets Xml pyrkii vastaamaan sarakkeen nimiä. Kun se ei voi (Mikä on yhteinen) , se pysähtyy, näyttää sinulle EML/data-tiedostonimi parit ja kysy, ovatko ne oikeassa linjassa. Jos syötät "s" ohittaa pöydän, GeneratedDatasetsXml tulostaa virheviestin ja siirtyy seuraavaan taulukkoon.
Ratkaisu on muuttaa EML-tiedoston virheellisiä sarakkeiden nimiä vastaamaan datatiedoston sarakkeiden nimiä.
     
### Erilainen sarake{#different-column-order} 
On olemassa useita tapauksia, joissa EML määrittää sarakkeet eri järjestyksessä kuin ne ovat tietotiedostossa. GenerateDatasets Xml pysähtyy ja kysyy operaattorilta, ovatko ottelut kunnossa vai pitäisikö tietoaineisto ohittaa. Jos se on ohitettu, tulostiedostossa on virheilmoitus, esimerkiksi:
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
Ratkaisuna on korjata saraketilaus näissä EML-tiedostoissa, jotta ne vastaavat tilausta datatiedostoissa.

Olisi kiva, jos EML-tarkastaja tarkistaisi, että lähdetiedoston sarakkeet ja saraketilaus vastaavat EML-tiedoston sarakkeita ja saraketilausta.
    
### Väärä numHeaderLines{#incorrect-numheaderlines} 
Useita tietoja Pöydät ovat virheellisesti merkittyjä nimiä HeaderLines=1, esim....sbc.4011. Tämä aiheuttaaERDDAP™Lue ensimmäinen tietolinja sarakkeen niminä. Yritin manuaalisesti poistaa kaikki nämä taulukot. Ne ovat ilmeisiä, koska vertaansa vailla olevat col-nimet ovat kaikki tietoarvoja. Ja jos on tiedostoja, joilla on virheellisesti numHeaderLines = 0, järjestelmä ei tee siitä itsestään selvää. Tässä on esimerkki SBC LTER -virhetiedostosta:
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
Virhe voi ilmetä kuin GenerateDatasets Xml uskoo, että ensimmäinen linkki tiedoston tietoihin (Esimerkiksi 2008-10-01T00:00 jne.) Linja sarakkeen nimillä (Aivan kuin vuosi 2008-10-01T00 olisi sarakkeen nimi.) .

Olisi kiva, jos EML-tarkastaja tarkistaisi numHeaderLines-arvon.
    
### NumHeaderLines = 0{#numheaderlines--0} 
Joillakin tiedostoilla ei ole sarakkeiden nimiä.ERDDAP™Jos EML kuvaa samaa saraketta.

Mielestäni tämä tuntuu erittäin vaaralliselta. Sarakkeita voi olla eri järjestyksessä tai eri yksiköillä. (Katso alapuolelta) Ei ole mitään keinoa ratkaista näitä ongelmia. On paljon parempi, jos kaikilla ASCII-tiedostoilla on rivi sarakkeen nimillä.
    
### DateTime Format Strings{#datetime-format-strings} 
EML:llä on vakiomuotoinen tapa kuvata päivämäärämuotoja. EML-tiedostoissa on huomattavaa vaihtelua. (Olin aiemmin väärässä tässä asiassa. Näen EML-dokumentaatiomuodon, joka näyttää vastaavan[JavaDateTimeFormatter spesifikaatio](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html), mutta josta puuttuu tärkeät käyttöohjeet, jolloin formatString on usein/tavallisesti väärin käytetty.) On olemassa useita tapauksia, joissa on virheellinen tapaus, ja / tai virheellinen päällekkäisyys kirjeen ja / tai ei-standardi muotoilu. Tämä aiheuttaa kohtuuttoman taakan asiakkaille, erityisesti ohjelmistoasiakkaille, kuten GenerateDatasetsXml. GenerateDatasets Xml yrittää muuntaa EML-tiedostojen virheellisesti määritellyt muodot
[Päivämäärä/aikamuoto, jonkaERDDAP™Vaatii](/docs/server-admin/datasets#string-time-units)joka on lähes identtinenJavaJoda-aikamuodon määrittely, mutta se on hieman anteeksiantavampaa.

Olisi kiva, jos EML-tarkastaja vaatisi tiukkaa noudattamista.Java/Joda/ERDDAPaikayksiköiden määrittely ja todennettu, että päivämäärän arvot taulukossa voidaan parjata oikein määritellyn muodon kanssa.
    
### Päivämäärä, mutta ei aikaa{#datetime-but-no-time-zone} 
GenerateDatasets Xml etsii kolumnia päivämäärällä Aika ja tietty aikavyöhyke (jokoZuluc) aikayksiköt, jotka päätyvät ’Z’ tai sarakkeen nimi tai attribuuttimääritelmä, joka sisältää ’gmt’ tai ’utc’ tai paikallista: ’paikallisesta’ sarakkeen nimessä tai attribuuttimääritelmässä) . Hyväksyttävä on myös tiedosto, jossa on päiväsarake, mutta ei aikaa. Hyväksyttävä on myös tiedosto, jolla ei ole päivämäärä- tai aikatietoja.

GenerateDatasets Xml kohtelee kaikkia "paikallisia" aikoja aikavyöhykkeeltä, jonka voit määrittää tietylle tiedostoerälle, esim. SBC LTERille, käytä US/Pacificia. Tiedot ovat joskus kommentteja, mutta ei muodossa, joka on helppoa tietokoneohjelman selvittää.

Tiedostot, jotka eivät täytä näitä kriteerejä, hylätään viestillä "Ei hyvää päivää". (Aikaa) Väkivaltainen.” Yleisiä ongelmia ovat:

* On sarake, jossa on päivämäärät ja sarake, jossa on ajat, mutta ei päivämäärä. Aika kolumni.
* Aikavyöhykkeitä on, mutta aikavyöhykettä ei ole määritelty.

Muut kommentit:
Jos aikavyöhykkeen sarakkeella on hyvä päivämäärä + aikavyöhyke, sarake nimetään."time"SisälläERDDAP.ERDDAP™edellyttää, että saraketiedot ovat ymmärrettäviä/muunnettavissaZuluUTC/GMT aikavyöhyke päivämäärä.\\[Ajatukseni on, että käytän paikallisia aikoja ja erilaisia päivämääriä/aikamuotoja. (2-numeroiset vuodet&#33; mm/dd/yy vs. dd/mm/yy) Datatiedostoissa pakottaa loppukäyttäjän tekemään monimutkaisia muunnoksiaZuluaika vertailla tietoja yhdestä tietoaineistosta toisesta. NiinpäERDDAP™Standardoi kaikki aikatiedot: ajoaikoja,ERDDAP™Käyttää ISO 8601:2004 (E) vakiomuotoinen muoto, esimerkiksi 1985-01-02T00:00:00. Numeeriset ajat,ERDDAP™Käytä aina"seconds since 1970-01-01T00:00:00Z".ERDDAP™Käytä ainaZulu  (UTC, GMT) aikavyöhyke, jonka tarkoituksena on poistaa vaikeudet työskennellä eri aikavyöhykkeiden ja vakio-ajan kanssa ja säästää aikaa. GenerateDatasets Xml etsii EML-tietotaulukkoa päivämäärällä+Zulu. Tämä on vaikeaa, koska EML ei käytä virallista sanastoa. (kuin[JavaJoda Time formaatti](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html)) Tietojen määrittämiseksi Aikamuoto:
Jos on col, jossa on numeerisia aika-arvoja (esim.MatlabKertoja) jaZuluAikavyöhyke (tai vain päivämääriä ilman aikakoloja) Sitä käytetään kuten"time".
Jos käytössä on päivämäärä- ja aikatiedot, käytäZuluAikavyöhyke, jota käytetään"time"Kaikki muut päivämäärät tai kellonaika poistetaan.
Muussa tapauksessa, jos viina, jolla on vain päivämäärätiedot, sitä käytetään"time"Muuttuva (Ei aikavyöhykkeitä) .
Jos on datasarake ja aikasarake, eikä yhdistettyä päivämäärää Ajan sarake, tietoaineisto on REJECTED - mutta tietoaineistoa voidaan käyttää lisäämällä yhdistetty päivämäärä. Aika kolumni (mieluiten,ZuluAikavyöhyke) tietotiedostoon ja lisää sen kuvaus EML-tiedostoon.
Lähteet: SBC LTER:[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)Tietokanta #2.

Olisi kiva, jos EML/LTER vaatisi sarakkeen sisällyttämistäZulu  (UTC, GMT) aikavyöhykkeitä kaikissa asiaankuuluvissa tietotiedostoissa. Parasta on lisätä järjestelmä EML:ään määrittämääntime\\_zoneStandardi nimiä käyttäen (From the[TZ kolumni](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .
    
### Kadonnutmissing\\_value {#missing-missing_value} 
Jotkut sarakkeet käyttävätmissing\\_valueMutta älä lue sitä EML-metadatassa, esim. sademäärä | knb-lter-sbc.5011 käyttää -999. Jos EML:ssä ei määritetä puuttuvaa arvoa, GenerateDatasetsXml hakee automaattisesti yhteisiä puuttuvia arvoja. (esim. 99, -99, 999, -999, 9999, -9999 jne.) Se luo metadataa. Muut puuttuvatmissing\\_values ei jää kiinni.

Olisi kiva, jos EML-tarkastaja etsisi kadonnutta.missing\\_values.
    
### Pieniä ongelmia{#small-problems} 
Pieniä ongelmia on paljon. (loitsu, täsmällisyys) Tämä on todennäköisesti vain henkilö, joka tarkastaa jokaisen aineiston.

Olisi hienoa, jos EML-tarkastaja etsisi loitsuja ja kieliopillisia virheitä. Tämä on vaikea ongelma, koska tieteen sanat ovat usein loitsun tarkistus. Inhimillistä editointia tarvitaan todennäköisesti.
    
### Unicode-ominaisuudet{#invalid-unicode-characters} 
Osa EML-sisällöstä sisältää mitättömiä Unicode-hahmoja. Nämä ovat todennäköisesti Windows-kartan hahmoja, jotka on kopioitu väärin ja liitetty UTF-8 EML-tiedostoihin. GenerateDatasets Xml sanitizes nämä hahmot esim.\\[#128\\]Niitä on helppo etsiäERDDAP™ datasets.xmltiedosto.

Olisi kiva, jos EML-tarkastaja tarkisti tämän. Se on helppo löytää ja helppo korjata.
    
### Erilaiset sarakkeet) (#differentColumnUnits)  {#different-column-unitsdifferentcolumnunits} 
Joissakin EML-tietotaulukoissa määritellään sarakkeet, jotka ovat ristiriidassa tietotiedoston sarakkeiden kanssa, erityisesti siksi, että niillä on erilaiset yksiköt. GenerateDatasets XML liputtaa nämä. Operaattorin tehtävänä on päättää, ovatko erot kunnossa vai eivät. Nämä näkyvät epäonnistumistiedostossa "SKIPPED"-tietotaulukoina. SBC LTER -virhetiedosto:
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
Olisi kiva, jos EML-tarkastaja tarkistaisi, että yksikkö vastaa. Valitettavasti tämä on todennäköisesti mahdotonta saada kiinni ja sitten mahdotonta ratkaista ottamatta yhteyttä tietoaineiston luojaan, koska lähdetiedosto ei sisällä yksiköitä. Edellä esitetyn esimerkin ristiriita oli havaittavissa vain, koska yksiköt sisältyivät lähdesarakkeeseen ja EML-sarakkeeseen. Kuinka monella muulla taulukolla on tämä ongelma, mutta ei ole havaittavissa?
    
### EML:n eri versiot{#different-versions-of-eml} 
GenerateDatasets Xml on suunniteltu toimimaan EML 2.1.1:n kanssa. Muut versiot EML toimii siinä määrin kuin ne vastaavat 2.1.1 tai GenerateDatasetsXml on erityinen koodi käsitellä sitä. Tämä on harvinainen ongelma. Kun se tapahtuu, ratkaisu on muuntaa tiedostot EML 2.1.1 tai lähettää EML-tiedoston.erd.data at noaa.govVoin tehdä muutoksia GenerateDatasets XML käsittelee eroja.

Bob lisäsi tukea EML-tiedostoille GenerateDatasetsille Vuonna 2016 Xml toivoi, että EML-yhteisössä olisi jonkinlainen käyttöönotto. Vuoteen 2020 mennessä näin ei ole tapahtunut. Bob tukee mielellään EML:n uusimpia versioita, mutta vain jos uusia ominaisuuksia käytetään. Sähköpostiaerd.data at noaa.govJos haluat tukea uusimpia versioita EML:stä ja käytät tätä ominaisuutta.
    
### Ongelma datatiedoston parissa{#trouble-parsing-the-data-file} 
Hyvin harvoin datataulukko voidaan hylätä virheellä "ei-odotettu määrä kohteita linjassa #120. (52, odotettu = 50) """ Tällainen virhesanoma tarkoittaa sitä, että datatiedostossa oli erilainen määrä kuin muilla riveillä. Se voi olla ongelmaERDDAP™  (Esim. tiedoston lataaminen oikein) Tai tiedostossa. Lähteet: SBC LTER:
[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)Datataulukko #3, ks. datafile = LT _monthly \bottleda \registered \\ txt
