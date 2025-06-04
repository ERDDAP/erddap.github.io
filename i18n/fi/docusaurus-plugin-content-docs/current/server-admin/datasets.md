---
title: "ERDDAP™ - Working with the datasets.xml File"
sidebar_position: 3
---
# Työskentelyä yhdessädatasets.xmlTiedosto

\\[Tämä sivu kiinnostaa vainERDDAP™hallinnoijia.\\]

Kun olet seurannutERDDAP™ [Asennusohjeet](/docs/server-admin/deploy-install)Sinun täytyy muokatadatasets.xmltiedostossa *Tom* Sisältö/erddap/kuvaus aineistoista, joitaERDDAP™Asennus palvelee.

Voit nähdä esimerkin[datasets.xmlKirjoittanut GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).

- -

## [Johdanto](#introduction) {#introduction} 

### Muutama kokoontuminen vaaditaan{#some-assembly-required} 
Aseta tietoaineisto sisäänERDDAP™Kyse ei ole vain tietoaineiston hakemistosta tai URL-osoitteesta. Sinun on kirjoitettava XML:äädatasets.xmljoka kuvaa aineistoa.

* Verkottuneiden tietoaineistojen osalta, jotta tietoaineiston aineiston mukainenERDDAPVerkkotietojen tietorakenteen on tunnistettava tietoaineiston muuttujien osajoukko, joka jakaa samat ulottuvuudet. ([Miksi?](#why-just-two-basic-data-structures) [Miten?](#dimensions)) 
* Tietoaineiston nykyinen metatieto tuodaan automaattisesti. Mutta jos haluat muokata metatietoja tai lisätä muita metatietoja, sinun on määritettävä se.datasets.xml. JaERDDAP™Tarvitaan muita metatietoja, mukaan lukien[Globaalit ominaisuudet](#global-attributes)  (kuteninfoUrlinstituutio,sourceUrlYhteenveto ja otsikko) ja[Muuttuvat ominaisuudet](#variable-addattributes)  (kutenlong\\_nameja yksiköt) . Aivan kuten tällä hetkellä tietoaineistossa oleva metatieto lisää kuvailevia tietoja tietoaineistoon, metatiedot, joita aineisto pyytää.ERDDAP™Lisää kuvailevia tietoja tietoaineistoon. Lisämetadata on hyvä lisä tietoihin ja auttaaERDDAP™Tee parempi työ esitelläksesi tietojasi käyttäjille, jotka eivät tunne niitä.
*   ERDDAP™Sinun on tehtävä erityisiä asioita[pituus, leveys, korkeus (tai syvyys) ja aikamuuttujat](#destinationname).

Jos ostat näitä ideoita ja käytät yritystä luoda XMLdatasets.xmlSaat kaikki edutERDDAP™mukaan lukien:

* Täydellinen tekstinhaku tietoaineistoille
* Tietojen etsiminen kategoriassa
* Data Access -muodot ( *datasetID* .html) Voit pyytää alijoukkoa tietoja useissa eri tiedostomuodoissa.
* Muotokuvia grafiikkaa ja karttoja varten ( *datasetID* .grafiikka) 
* Web karttapalvelu (WMS) Verkossa olevat tietoaineistot
*   RESTfulpääsy tietoihisi

Making thedatasets.xmlSe on erittäin tärkeää ensimmäisten tietojen kohdalla, mutta **Se helpottaa** . Ensimmäisen tietoaineiston jälkeen voit usein uudelleenkäyttää paljon työtäsi seuraavaan tietoaineistoon. Onneksi,ERDDAP™Sisältää kaksi[Työkalut](#tools)auttaa sinua luomaan XML:n jokaiseen tietoaineistoondatasets.xml.
Jos olet jumissa, katso meidän[Lisätuen saaminen](/docs/intro#support).

### Datan tarjoaja Muoto{#data-provider-form} 
Kun tietopalveluntarjoaja tulee luoksesi toivoen lisättävän joitakin tietojaERDDAPVoi olla vaikeaa ja aikaa vievää kerätä kaikki metatiedot (Tietoa datasta) Tarvitsetko lisätietojaERDDAP. Useita tietolähteitä (.csv-tiedostoja, Excel-tiedostot, tietokannat) Ei sisäisiä metatietoja, jotenERDDAP™on Datantarjoajamuoto, joka kerää metatietoja tietojen tarjoajalta ja antaa tietojen tarjoajalle muita ohjeita, mukaan lukien laajat ohjeet tietojen toimittamiseen.[Databaseissa](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases). Toimitetut tiedot muunnetaandatasets.xmlMuotoilu ja sitten sähköpostitseERDDAP™Hallinnollinen (Sinä) ja kirjoitettu (liitetty) että *isovanhemmat* Lähde: DataProviderForm.log Näin muoto puoliautomatisoi prosessin saada tietoaineistonERDDAPmuttaERDDAP™Järjestäjän on vielä täytettävädatasets.xmlKlikkaa ja käsittele datatiedoston hankkimista (s) Palveluntarjoaja tai yhteys tietokantaan.

Todellisten tiedostojen lähettäminen ulkoisista lähteistä on suuri turvallisuusriski.ERDDAP™ei käsittele sitä. Sinun on selvitettävä sinulle ja palveluntarjoajalle toimiva ratkaisu, esimerkiksi sähköposti (Pieniä tiedostoja) Vedä pilvestä (Esimerkiksi DropBox tai Google Drive) Sftp-sivusto (salasanat) tai sneaker Netissä (USB-peukalo tai ulkoinen kiintolevy) . Sinun pitäisi hyväksyä tiedostoja vain henkilöiltä, jotka tiedät. Sinun täytyy skannata tiedostoja viruksia ja ottaa muita varotoimenpiteitä.

Ei ole linkkiäERDDAP™Tietojen toimittajamuodossa (Esimerkiksi, ettäERDDAP™Kotisivu) . Sen sijaan, kun joku kertoo haluavansa, että heidän tietojaan palvellaanERDDAPVoit lähettää heille sähköpostia, jossa sanotaan:
Kyllä, voimme saada tietosiERDDAP. Aloita, täytä lomake https://*yourUrl*/erddap/dataProviderForm.html   (tai taihttp://joshttps://ei ole sallittua) .
Kun olet valmis, otan sinuun yhteyttä saadakseni selville viimeiset yksityiskohdat.
Jos haluat vain katsoa muotoa (täyttämättä sitä) Voit nähdä lomakkeenERD&gt;ERDDAP:[Johdanto](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html),[Osa 1](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html),[Osa 2](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html),[Osa 3](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html)ja[Osa 4](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html). Nämä linkit ovatERD ERDDAP™lähettää tietoja minulle, ei sinulle, joten älä lähetä tietoja heille, ellet todella halua lisätä tietojaERD ERDDAP.

Jos haluat poistaa tietojen toimittajan lomakkeenERDDAP™laittaa
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
asennus.xml-tiedostossa.

Painotus tähän oliNOAAVuoden 2014[Julkinen pääsy tutkimustuloksiin (Paar) Direktiivi](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf)joka vaatii, että kaikkiNOAAVeronmaksajien kautta rahoitetut ympäristötiedot asetetaan saataville tietopalvelun kautta. (Ei vain tiedostoja) 12 kuukauden kuluessa luomisesta. Lisääntynyt kiinnostus käyttääERDDAP™Saatavilla olevat tiedot palvelun ASAP kautta. Tarvitsimme tehokkaamman tavan käsitellä suuria tietopalveluntarjoajia.

Palautus / Suggestions? Tämä lomake on uusi, joten pyydän sähköpostia.erd dot data at noaa dot govjos sinulla on mitään palautetta tai ehdotuksia tämän parantamiseksi.

### Työkalut{#tools} 
ERDDAP™Sisältää kaksi komentoriviohjelmaa, jotka ovat työkaluja, joiden avulla voit luoda XML: n jokaiselle tietoaineistolle, jota haluatERDDAP™palvelemaan. Kun olet asettanutERDDAP™ja juoksemaan sitä (vähintään kerran) Löydät ja käytät näitä ohjelmia *Tom* /webapps/erddap/WEB-inf-hakemisto Linux/Unix Shell -käsikirjoituksia (Laajennus .sh) Windows-käsikirjoitukset (Laajennus .bat) jokaiseen ohjelmaan.\\[Linuxissa nämä työkalut ovat sama käyttäjä. (Tomcat?) Tämä johtaa Tomcatia.\\]Kun suoritat jokaisen ohjelman, se kysyy sinulta kysymyksiä. Jokaiseen kysymykseen, kirjoita vastaus ja paina sitten Enter. Paina ^C poistua ohjelmasta milloin tahansa.

#### Ohjelma ei juokse?{#program-wont-run} 

* Jos sinulla on tuntematon ohjelma (tai vastaava) Virheviesti, ongelmana on, että käyttöjärjestelmä ei löytänytJava. Sinun täytyy selvittää, missäJavaon tietokoneellasi, muokkaa sitten Java-viite .bat- tai .sh-tiedostossa, jota yrität käyttää.
* Jos löydät jar-tiedoston, jota ei löydy tai luokkaa ei löydy virheilmoitusta,JavaEt löytänyt .bat- tai .sh-tiedostoa, jota yrität käyttää. Ratkaisu on selvittää, missä .jar-tiedosto on, ja muokata java viittaus siihen .bat tai .sh-tiedostossa.
* Jos käytät versiotaJavaTämä on liian vanha ohjelma, ohjelma ei toimi ja näet virheilmoituksen, kuten
Poikkeus thread "main" Java.lang.UnsupportedClassVersionError:
     *Luokka/nimi* Kehittäjä: Unsported major.minor *Joku*   
Ratkaisu on päivittää uusin versioJavaVarmista, että .sh- tai .bat-tiedosto käyttää sitä.

#### Työkalut painavat useita diagnostisia viestejä:{#the-tools-print-various-diagnostic-messages} 

* Sanaa "ERROR" käytetään, kun jokin meni niin väärin, että menettely ei onnistunut. Vaikka on ärsyttävää saada virhe, virhe pakottaa sinut käsittelemään ongelman.
* Sanaa "Varoitus" käytetään, kun jokin meni pieleen, mutta menettely oli valmis. Ne ovat melko harvinaisia.
* Kaikki muu on vain informatiivinen viesti. Voit lisätä \\-verbose[GenerateDatasetsXml](#generatedatasetsxml)tai tai[Dasds](#dasdds)Komentoviiva saada lisää informatiivisia viestejä, jotka joskus auttaa ratkaisemaan ongelmia.

Nämä kaksi työkalua ovat suuri apu, mutta sinun täytyy silti lukea kaikki nämä ohjeet tällä sivulla ja tehdä tärkeitä päätöksiä itse.

### GenerateDatasetsXml{#generatedatasetsxml} 
*    **GenerateDatasetsXml** on komentoriviohjelma, joka voi luoda karkean XML-luonnoksen lähes minkä tahansa tietoaineiston osalta.
    
Olemme varmoja, että käytät GenerateDatasets Xml sen sijaan, että luotaisiindatasets.xmlkäsin, koska:
    
    * GenerateDatasets XML toimii sekunneissa. Tämä on vähintään tunnin työ, vaikka tiedät mitä teet.
    * GenerateDatasets XML tekee parempaa työtä. Tämän tekeminen vaatii laajaa tietoa siitä, mitenERDDAP™toimii. On epätodennäköistä, että teet parempaa työtä käsin. (Bob Simons käyttää GenerateDatasetsia XML:n ensimmäinen kirjoitus, ja hän kirjoittiERDDAP.) 
    * GenerateDatasets Xml tuottaa aina pätevän rypäleendatasets.xml. Kaikki Chunksdatasets.xmlKirjoitat todennäköisesti ainakin muutamia virheitä, jotka estävätERDDAP™tietojen lataamisesta. Näiden ongelmien diagnosointiin tarvitaan usein tunteja. Älä tuhlaa aikaasi. Annetaan sukupolvien Dataa XML tekee kovaa työtä. Voit korjata .xml:n käsin, jos haluat.
    
Kun käytät GenerateDatasets XML-ohjelma:
    
    * Windowsissa, ensimmäinen kerta kun käytät GenerateDatasetsXml, sinun on muokattava GenerateDatasetsXml.bat-tiedostoa tekstieditorilla ja vaihdettava polku javaan. Ex-tiedosto, jotta Windows voi löytääJava.
    * GenerateDatasets Xml pyytää sinua määrittämään EDDTypen (Erd Dap Dataa Tyyppi) aineistosta. Nähdään[Luettelo tietotyyppien](#list-of-types-datasets)  (Tässä asiakirjassa) selvittää, mikä on tyyppi, joka sopii työssäsi olevaan tietoaineistoon. Säännöllisten EDDTypeen lisäksi on myös muutamia[Pseudo Dataset Types](#specialpseudo-dataset-types)  (esim. se, joka ryömii THREDDS-luettelon luodakseen roskandatasets.xmljokaisesta luettelon tietoaineistosta) .
    * GenerateDatasets Xml esittää sinulle useita kysymyksiä, jotka liittyvät kyseiseen EDDTypeen. Kysymykset keräävät tarvittavat tiedotERDDAP™käyttää tietoaineiston lähdettä. ymmärtää, mitäERDDAP™pyytää, katso EDDTypen dokumentaatio, jonka määrität klikkaamalla samaa tiedostotyyppiä[Luettelo tietotyyppien](#list-of-types-datasets).
        
Jos tarvitset merkkijonon, jossa on erikoismerkkejä (esim. valkotilahahmot alussa tai lopussa, ei-ASCII-hahmot) Sisäänkäynti A[JSON-tyylinen](https://www.json.org/json-en.html)  (erityishahmoilla pakenneet hahmot) . Esimerkiksi päästäksesi vain välilehtihahmoon, syötä "t" (ympäröivällä kaksinkertaisella lainauksella, joka kertooERDDAP™Tämä on JSON-tyylinen.
        
    * Usein yksi vastauksistasi ei ole se, mitä GenerateDatasetsXml tarvitsee. Voit sitten yrittää uudelleen, tarkistettuja vastauksia kysymyksiin, kunnes GenerateDatasets XML löytää ja ymmärtää lähdetiedot.
    * Jos vastaat kysymyksiin oikein (tai riittävän oikein) GenerateDatasets Xml yhdistää tietoaineiston lähteen ja kerää perustietoja (Muuttuvia nimiä ja metatietoja) .
Tietoja, jotka ovat peräisin paikallisiltaNetCDF .ncLisätietoja: GenerateDatasets Xml painaa usein tiedoston ncdump-maisen rakenteen, kun se ensin lukee tiedoston. Tämä voi antaa sinulle tietoa vastata kysymyksiin paremmin myöhemmällä kierroksella GenerateDatasetsXml.
    * GenerateDatasets Tämän jälkeen Xml tuottaa karkean luonnoksen XML-tietokannasta kyseiseen tietoaineistoon.
    * Diagnostiset tiedot ja XML:n karkea luonnos kirjoitetaan *isovanhemmat* /logs/GenerateDatasetsXml.log
    * Rekisteröidyn XML:n karkea luonnos kirjoitetaan *isovanhemmat* /GenerateDatasetsXml.out
#### "0 tiedostoa" Virheellinen viesti{#0-files-error-message} 
Jos käytät GenerateDatasets XML tai[Dasds](#dasdds)tai jos yrität ladataEDDGridFiles or EDDTableFrom... Tiedostot sisältyvätERDDAP™saat "0 tiedostoa" -virheviestin, joka osoittaa, ettäERDDAP™Hakemistossa 0 tiedostoa (kun luulet, että hakemistossa on vastaavat tiedostot) :
* Tarkista, että olet määrittänyt hakemiston koko nimen. Ja jos määrität näytteen tiedostonimen, varmista, että määritit tiedoston koko nimen, mukaan lukien koko hakemiston nimi.
* Tarkista, että tiedostot ovat todella tässä hakemistossa.
* Tarkista hakemiston nimi.
* Katso tiedosto NameRegex. On todella helppoa tehdä virheitä regekseillä. Kokeile testaustarkoituksiin regexiä, joka vastaa kaikkia tiedostonimiä. (Näe tämä[Regex-dokumentointi](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)ja[Regex Tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
* Tarkista, että ohjelman käyttäjä on (Käyttäjä = Tomcat (??) Tomcat/ERDDAP) on "lukenut" näihin tiedostoihin.
* Joissakin käyttöjärjestelmissä (Esimerkiksi SELinux) Järjestelmäasetuksista riippuen ohjelman käyttäjällä on oltava "lue"-lupa koko hakemistojen ketjulle, joka johtaa tiedostojen hakemistoon.


* Jos sinulla on ongelmia, joita et voi ratkaista,[Pyydä tukea](/docs/intro#support)mahdollisimman paljon tietoa. Samoin, jos se näyttää sopivalta EDDTypeltä tietylle tietoaineistolle, joka ei toimi kyseisellä tietoaineistolla tai jos EDDTypeä ei ole, ilmoita asiasta.[Lähde: GitHub](https://github.com/ERDDAP/erddap/issues)yksityiskohtien kanssa (näytetiedosto, jos se on asiaankuuluvaa) .
         
#### Sinun täytyy muokata tuotantoa GenerateDatasets XML tekee siitä paremman.{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* DISCLAIMER:
Kurkistusdatasets.xmlMade Be GenerateDatasets (käytetty) XML ei ole täydellinen. Sinun täytyy lukea ja editoida XML ennen kuin käytät sitä PUBLICERDDAP. GenerateDatasets Xml uskoo moniin ruusuihin, jotka eivät aina ole korrekteja. Sinä olet valmis antamaan XML:n korrektiiveja, joita sinä oletERDDAP&gt;datasets.xmlFilejä.
    
     (Hauska fakta: En huuda. Historiallisista oikeudellisista syistä vastuuvapauslausekkeet on kirjoitettava kaikkiin korteihin.) 
    
GenerateDatasetsXmlin tuotanto on karkea luonnos.
Sinun täytyy melkein aina muokata sitä.
Olemme tehneet ja jatkamme suurta ponnistelua, jotta tulos olisi mahdollisimman valmis, mutta rajat ovat olemassa. Usein tarvittavaa tietoa ei ole saatavilla lähdemetadatasta.
    
Ongelmana on, että pyydämme tietokoneohjelmaa. (GenerateDatasetsXml) Jos antaisit saman tehtävän 100 henkilölle, saat 100 erilaista tulosta. Ei ole olemassa "oikeaa" vastausta. Ohjelma on lähimpänä Bobin ajatuksia. (Ei sinun) Se ei ole täysin ymmärrettävää tekoälyohjelmaa, vain joukko heuristista ohjelmaa kuplataan yhdessä tehdäkseen tekoälyn kaltaisen tehtävän. (Täysin ymmärrettävän tekoälyohjelman päivä voi tulla, mutta se ei ole vielä. Jos ja kun se tapahtuu, ihmisillä voi olla suurempia ongelmia. Varo mitä haluat.) 
    
* Informatiivisia tarkoituksia varten tuotos näyttää maailmanlaajuisen lähteen ominaisuudet ja muuttuva lähdeAttribuutit kommentteina.ERDDAP™Yhteenveto lähteestä jaaddAttributes  (joilla on etusija) Yhdistettynä ominaisuuksia, jotka näkyvät käyttäjälle. (Ja muut ominaisuudet lisätään automaattisesti pituus, leveys, korkeus, syvyys ja aika muuttujia, kunERDDAP™Käytännössä aineiston) .
     
* Jos et pidä lähdeAttribuutista, kirjoita se lisäämällä lisäosan samaan nimeen, mutta eri arvoon. (Ei arvoa, jos haluat poistaa sen) .
     
* KaikkiaddAttributesovat tietokoneen luomia ehdotuksia. Leikkaa ne&#33; Jos et pidä lisäosasta, vaihda se.
     
* Jos haluat lisätä muitaaddAttributeslisätä niitä.
     
* Jos haluat muuttaadestinationNameMuuta se. Mutta älä muutusourceNames.
     
* Voit muuttaa järjestystädataVariabletai poistaa niitä.


    * Voit käyttää[Dasds](#dasdds)  (Katso alapuolelta) testata XML:ää toistuvasti kyseiselle tietoaineistolle varmistaaksesi, että tuloksena oleva tietoaineisto näkyy haluamallasi tavalla.ERDDAP.
    * Voit vapaasti tehdä pieniä muutoksiadatasets.xmlnyrkkeilyä, joka tuotettiin esimerkiksi paremmaksiinfoUrlYhteenveto tai otsikko.
#### DoNotAddStandardNames{#donotaddstandardnames} 
Jos \\-doNotAddStandardNames on komentoriviparametri, kun juokset Dataa XML, tuottaminen Dataa XML ei lisäästandard\\_namejaaddAttributesmuuttujat kuin leveys, pituus, korkeus, syvyys tai aika (jotka ovat ilmeisiästandard\\_names) . Tämä voi olla hyödyllistä, jos käytät tuotetta Dataa XML suoraanERDDAP™ilman tulostusta, koska Dataa XML usein arvaastandard\\_nameVäärin. (Huomaa, että suosittelemme aina muokkaamaan tulosta ennen sen käyttöä.ERDDAP.) Tällä parametrilla on muita vähäisiä vaikutuksia, koskastandard\\_namekäytetään usein muihin tarkoituksiin, esimerkiksi uuden luomiseen.long\\_nameja luoda värikarttoja.
#### Kirjoittaminen{#scripting} 
Vaihtoehtona vastata kysymyksiin vuorovaikutteisesti näppäimistössä ja looping tuottaa ylimääräisiä tietoaineistoja, voit antaa komentorivi argumentteja vastata kaikkiin kysymyksiin tuottaa yhden tietoaineiston. GenerateDatasets Xml käsittelee näitä parametreja, kirjoittaa ulostulotiedostoon ja poistaa ohjelman.
        
Voit määrittää tämän, käytä ohjelmaa interaktiivisessa tilassa ja kirjoita vastauksesi. Tässä osittainen esimerkki:
Sanotaan, että kirjoitat käsikirjoituksen: ./GenerateDatasetsXml.sh
Lähde: EDDTableFromAsciiFiles
Lähde: /u00/data
Sisäänpääsy: .asc
Pääartikkeli: /u00/data/sampleFile.asc
Lähde: ISO-8859-1
        
Jos haluat käyttää tätä ei-interaktiivisella tavalla, käytä tätä komentoriviä:
./GenerateDatasetsXml.sh EDDTableFromAsciiFiles/u00/data/.*.asc/u00/data/sampleFile.asc ISO-8859-1
Pääasiassa luet kaikki vastaukset komentolinjalle.
Tämän pitäisi olla hyödyllistä tietoaineistoille, jotka muuttuvat usein tavalla, joka edellyttää GenerateDatasetsin uudelleenjuoksemista. XM (erityisestiEDDGridLähde: ThreddsCatalog) .
        
Yksityiskohdat:

* Jos parametri sisältää tilaa tai jotain erityistä luonnetta, koodaa parametri.[JSON-tyylinen](https://www.json.org/json-en.html)"Minun parametrini tiloilla ja kahdella\\nLinjoja.”
* Jos haluat määrittää tyhjän merkkijonon parametrina, käytä: ei mitään.
* Jos haluat määrittää parametrin oletusarvon, käytä: oletusarvo
             
* GenerateDatasets XML tukee *Dataa XMLName* # *Tagname* komentoriviparametri, joka asettaa tuoton määritettyyndatasets.xmltiedostotiedosto (Oletusarvo on *Tom* Sisältö/erddap/datasets.xml) . GenerateDatasets Xml etsii kaksi riviä tietoaineistoissa XmlName:
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
ja
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
ja korvaa kaiken näiden rivien välillä uudella sisällöllä ja muuttaa jonkin ajan.
* Vaihtoehto on vain käsitelty (Muutoksetdatasets.xmlVain valmistettu) Jos käytät GenerateDatasets Xml, jossa on komentorivi-argumentteja, jotka määrittävät kaikki vastaukset kaikkiin kysymyksiin yhdestä ohjelmasta. (Katso "Scripting" yllä.)   (Tämä parametri on tarkoitettu käsikirjoitusten käyttöön. Jos käytät ohjelmaa interaktiivisessa tilassa (Infoa näppäimistössä) Voit todennäköisesti luoda virheellisiä XML-tuoksuja ennen kuin luot haluamasi.) 
* Jos aloitus- ja loppulinjoja ei löydy, nämä linjat ja uusi sisältö lisätään jo aiemmin.&lt;/erdapDatasets &gt;
* Siellä on myös A-I (Pääkaupunki I) Vaihda testaustarkoituksiin, jotka toimivat samoin kuin i, mutta luo tiedoston, jota kutsutaandatasets.xml *Päivämäärä* eikä tee muutoksiadatasets.xml.
* Älä juokse GenerateDatasets Xml:n kanssa, kaksi prosessia kerralla. Mahdollisuuksia on vain yksi muutos. Voi olla vakavia ongelmia (Esimerkiksi korruptoituneita tiedostoja) .
    
Jos käytät "GenerateDatasetsXml -verbose", se tulostaa enemmän diagnostisia viestejä kuin tavallisesti.
    
#### Pseudo Dataset Types{#specialpseudo-dataset-types} 
Yleisesti EDDType-vaihtoehdot GenerateDatasetsissa Tässä asiakirjassa kuvatut EDD-tyypit (Katsokaa[Luettelo tietotyyppien](#list-of-types-datasets)) tuottaa yhdendatasets.xmlChunk luo yhden tietoaineiston yhdestä tietolähteestä. On olemassa muutamia poikkeuksia ja erityistapauksia:
    
##### EDDGridLähde: Eddap{#eddgridfromerddap} 
Tämä EDDType tuottaa kaikendatasets.xmlTarvitsemme vaahtoa[EDDGridLähde: Eddap](#eddfromerddap)Tietoja kaikistaEDDGridTietoja etäisessäERDDAP. Sinulla on mahdollisuus säilyttää alkuperäinendatasetIDs (jotka voivat kaksoiskappaleitadatasetIDjo sinunERDDAP) Uusia nimiä, jotka ovat ainutlaatuisia (Yleensä se ei ole ihmisen luettavaa.) .
     
##### EdDTableFromDap{#eddtablefromerddap} 
Tämä EDDType tuottaa kaikendatasets.xmlTarvitsemme vaahtoa[EdDTableFromDap](#eddfromerddap)Kaikki EDDTable-tietoaineistot etäisessäERDDAP. Sinulla on mahdollisuus säilyttää alkuperäinendatasetIDs (jotka voivat kaksoiskappaleitadatasetIDjo sinunERDDAP) Uusia nimiä, jotka ovat ainutlaatuisia (Yleensä se ei ole ihmisen luettavaa.) .
     
##### EDDGridLähde: ThreddsCatalog{#eddgridfromthreddscatalog} 
Tämä EDDType tuottaa kaikendatasets.xmlTarvittavat jyvät kaikkiin[EDDGridLähde:Dap](#eddgridfromdap)aineistot, joita se voi löytää ryömimällä toistuvasti THREDDS: n kautta (sub) Katalogi. 3DS-katalogisia URL-osoitteita on monia. Tämä vaihtoehto REQUIRES A THREDDS .xml URL with/catalog/ in it, esim.
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xml tai tai
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml   
(Ohjattu sivulta .html)
 https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html joka ei ole hyväksyttävääEDDGridLähde: ThreddsCatalog).
Jos sinulla on ongelmiaEDDGridFromThredds Katalogi:
* Varmista, että käyttämäsi URL-osoite on voimassa, sisältää /catalog / ja päättyy /catalog.xml.
* Jos mahdollista, käytä julkista IP-osoitetta (esimerkiksi https://oceanwatch.pfeg.noaa.gov ) URL-osoitteessa, ei paikallisessa numeroinnissa (esimerkiksi https://12.34.56.78 ) . Jos THREDDS on saatavilla vain paikallisen numerollisen IP-osoitteen kautta, voit käyttää [-]&lt;ConvertToPublicSourceUrl[muokkaa] (#converttopublicsourceurl) niinERDDAP™käyttäjät näkevät julkisen osoitteen, vaikkaERDDAP™Saat tietoja paikallisesta numeerisesta osoitteesta.
* Jos sinulla on ongelmia, joita et voi ratkaista,[Katso vianmääritysvinkkejä](#troubleshooting-tips).
* Alhainen koodi tällä hetkellä käyttääUnidataNetcdf-java-kataloginen crawler-koodi (Kynttilät. Katalogiset luokat) jotta kaikki 3DS-luettelot voidaan käsitellä (joka voi olla yllättävän monimutkainen) KiitosUnidatatähän koodiin.
         
##### EDDGridLonPM180FromErddapCatalog{#eddgridlonpm180fromerddapcatalog} 
Tämä EDDType tuottaadatasets.xmltehdä[EDDGridLonPM180](#eddgridlonpm180)Tietoja kaikistaEDDGridTietoja eräässäERDDAPPituusarvot ovat yli 180.
* Jos mahdollista, käytä julkista IP-osoitetta (esimerkiksi https://oceanwatch.pfeg.noaa.gov ) URL-osoitteessa, ei paikallisessa numeroinnissa (esimerkiksi https://12.34.56.78 ) . JosERDDAP™on saatavilla vain paikallisen numerollisen IP-osoitteen kautta, jota voit käyttää&lt;ConvertToPublicSourceUrl[muokkaa] (#converttopublicsourceurl) niinERDDAP™käyttäjät näkevät julkisen osoitteen, vaikkaERDDAP™Saat tietoja paikallisesta numeerisesta osoitteesta.
         
##### EDDGridLon0360FromErddapCatalog{#eddgridlon0360fromerddapcatalog} 
Tämä EDDType tuottaadatasets.xmltehdä[EDDGridLon0360](#eddgridlon0360)Tietoja kaikistaEDDGridTietoja eräässäERDDAPPituusarvoja on alle 0.
* Jos mahdollista, käytä julkista IP-osoitetta (esimerkiksi https://oceanwatch.pfeg.noaa.gov ) URL-osoitteessa, ei paikallisessa numeroinnissa (esimerkiksi https://12.34.56.78 ) . JosERDDAP™on saatavilla vain paikallisen numerollisen IP-osoitteen kautta, jota voit käyttää&lt;ConvertToPublicSourceUrl[muokkaa] (#converttopublicsourceurl) niinERDDAP™käyttäjät näkevät julkisen osoitteen, vaikkaERDDAP™Saat tietoja paikallisesta numeerisesta osoitteesta.
         
##### Eddsfromfiilejä{#eddsfromfiles} 
Aloitushakemiston vuoksi tämä siirtyy hakemistoon ja kaikkiin aliohjauksiin ja pyrkii luomaan tietoaineiston jokaiselle löytämilleen tietotiedostoryhmälle.
* Tämä olettaa, että kun tietoaineisto on löydetty, tietoaineisto sisältää kaikki alihankkeet.
* Jos tietoaineisto löytyy, vastaavia sisarushakemistoja käsitellään erillisinä tietoaineistoina. (Esimerkiksi 1990-luvun hakemistot, 2000-luku, 2010-luku, tuottavat erillisiä tietoaineistoja.) . Niiden tulisi olla helppoja yhdistää käsin – vaihda vain ensimmäinen tietoaineisto.&lt;tiedostoDir&gt; emohakemistoon ja poista kaikki myöhemmät sisarustiedot.
* Tämä vain yrittää tuottaa vaahtoadatasets.xmlyleisin tiedoston laajennus hakemistossa (.md5, jota ei ole) . Hakemisto 10.nctiedostot ja 5 .txt-tiedostot, tietoaineisto luodaan.ncVain tiedostoja.
* Tämä edellyttää, että kaikki hakemiston tiedostot, joilla on sama laajennus, kuuluvat samaan tietoaineistoon. Jos hakemistolla on.nctiedostoja, joissa on SST-tietoja ja joitakin.nctiedostot, joissa on klorofyllitiedot, vain yksi näyte.ncTiedostoa luetaan (SST? Kloorofylliä?) Vain yksi tietokanta luodaan tällaiselle tiedostolle. Nämä tiedot eivät todennäköisesti lataudu komplikaatioiden vuoksi, jotka yrittävät ladata kaksi tiedostotyyppiä samaan tietoaineistoon.
* Jos hakemistossa on alle 4 tiedostoa, joiden yleisin laajennus on, tämä olettaa, että ne eivät ole tietotiedostoja ja vain ohittaa hakemiston.
* Jos hakemistossa on neljä tai useampia tiedostoja, mutta tämä ei voi tuottaa onnistuneesti roskaa.datasets.xmltiedostoja varten (Esimerkiksi tukematon tiedostotyyppi) Tämä luo yhden[EdDTableFromFileNames](#eddtablefromfilenames)Tiedostot tiedostoihin.
* Diagnoosin lopussa tämä kirjautuu lokitiedostoon juuri ennendatasets.xmlTämä tulostaa taulukon, jossa on yhteenveto kerätyistä tiedoista kaikkien alihankkijoiden kautta. Pöydässä luetellaan kaikki aliohjelmat ja ilmoitetaan yleisin tiedostolaajennustyyppi, tiedostojen kokonaismäärä ja minkä tyyppinen tietoaineisto on luotu näille tiedostoille. (Jos) . Jos sinulla on monimutkainen, syvästi pested tiedostorakenne, harkitse GenerateDatasets -toimintojen käyttöä. Xml EDDType=EDDsFromFiles vain tämän tiedon tuottamiseksi
* Tämä vaihtoehto ei ehkä tee hienoa työtä arvataksesi parhaan EDDType-tiedostoryhmän, mutta se on nopea, helppo ja kokeilemisen arvoinen. Jos lähdetiedostot ovat sopivia, se toimii hyvin ja on hyvä ensimmäinen askel.datasets.xmltiedostojärjestelmään, jossa on paljon aliohjaimia, jokaisella on eri tietoaineistojen tiedostoja.
         
##### EDDTableFromEML ja EDDTableFromEMLBatch{#eddtablefromeml-and-eddtablefromemlbatch} 
EDDType tuottaadatasets.xmltehdä yhden[EDDTableFromAsciiFiles](#eddtablefromasciifiles)jokaisesta taulukosta, joka on kuvattu eräässä[Ekologinen kieli](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XML-tiedosto. Batch-versio toimii kaikilla EML-tiedostoilla paikallisessa tai etähakemistossa. Katso erillinen[EDDTableFromEML-dokumentti](/docs/server-admin/EDDTableFromEML).
     
##### EdDTableFromInPort{#eddtablefrominport} 
Tämä erityinen EDDType tuottaadatasets.xmltehdä yhden[EDDTableFromAsciiFiles](#eddtablefromasciifiles)Tietoja informaatiosta eräässä[Inport-xml](https://inport.nmfs.noaa.gov/inport)tiedosto. Jos voit käyttää lähdetiedostoa (Inport-xml-tiedostolla pitäisi olla vihjeitä siitä, mistä se löytyy.) Voit tehdä työtietoaineistonERDDAP.

Seuraavat vaiheet määrittävät, miten GenerateDatasets Xml, jossa on inport-xml-tiedosto, jotta saadaan työtiedotERDDAP.

1. Kun sinulla on pääsy inport-xml -tiedostoon (joko URL tai paikallinen tiedosto) Lähde: GenerateDatasets Xml, määritä EDDType=EDDTableFromInPort, määritä inport-xml-URL-osoite tai koko tiedostonimi, määritä, mikäChild=0 ja määritä muut pyydetyt tiedot. (jos tiedossa) . (Tässä vaiheessa sinun ei tarvitse hankkia lähdetiedostoa tai määrittää sen nimeä.) WhatChild=0-asetus kertoo GenerateDatasetsista Xml kirjoittaa tiedot **Kaikki kaikki** että&lt;Informaatio &gt;&lt;Inport-xml tiedostossa (Jos on joku) . Se myös tulostaa taustatietojen yhteenvedon, mukaan lukien kaikki inport-xml-tiedostossa luetellut latausurl.
2. Katso kaikki tiedot (Lisätietoja GenerateDatasets XML-printit) Katso Download-url (s) Löydä lähdetiedosto (s) . Jos löydät sen (heidän) Lataa se (heidän) hakemistoon, johon on pääsyERDDAP. (Jos et löydä lähdetiedostoja, ei ole syytä jatkaa.) 
3. Juokse generaattori Dataa XML jälleen.
Jos lähdetiedosto vastaa yhtä inport-xml-tiedostosta&lt;Informaatio &gt;&lt;Määritä, mikä lapsi = *Tuon entiteetin*   (Esimerkiksi 1, 2, 3,...) .ERDDAP™Pyrimme vastaamaan lähdetiedoston sarakkeiden nimiä yhteisön tietojen nimiin ja hyväksymään/ hylkäämään/korjata mahdolliset poikkeamat.
Jos inport-xml-tiedostoa ei ole&lt;Informaatio &gt;&lt;Määritä, mikä lapsi = 0.
4. Huippuosassadatasets.xmlTekijä: GenerateDatasets XML, uudista [Global]&lt;addAttributes&gt; (#globaalit ominaisuudet) tarpeen/haluttu.
5. Huippuosassadatasets.xmlGenerateDatasetsXml, lisätkää / tarkistakaa&lt;dataVariable&gt; (#Datavariable) Tarvittavat/halutut tiedot jokaisesta muuttujasta. Varmista, että tunnistat jokaisen muuttujan oikein
[...]&lt;sourceName&gt; (#lähde)   (kuten lähteessä näkyy) ,
[...]&lt;destinationName&gt; (# määränpään nimi)   (jolla on enemmän rajoituksia sallittuihin hahmoihin kuinsourceName) ,
[...]&lt;Yksiköt &gt; (#yksiköt)   (Varsinkin jos se on[Aika tai aikaleima muuttumassa](#timestamp-variables)missä yksikön on määriteltävä muoto) ja
[...]&lt;missing\\_value&gt; (#Muokkaa) ,
6. Kun olet valmis, käytä toistuvasti[Dasds](#dasdds)työkalu, jolla voidaan nopeasti tarkistaa, onko tietoaineiston kuvaus pätevä ja näkyykö tietoaineistossaERDDAP™niin kuin haluat.
     

Olisi hienoa, jos InPortin käyttämät ryhmät dokumentoiisivat tietoaineistonsa myösERDDAP™Varsinaisten tietojen saatavuus:

*   ERDDAP™ratkaisu, jota voidaan käyttää juuri nyt, jotta voit toteuttaaNOAA&gt;[Julkinen pääsy tutkimustuloksiin (Paar) Vaatimukset](https://nosc.noaa.gov/EDMC/PD.DSP.php)Tällä hetkellä, ei epämääräisessä ajassa tulevaisuudessa.
*   ERDDAP™Käyttäjien saatavilla olevat tiedot, ei vain metatiedot. (Mikä on metatieto ilman dataa?) 
*   ERDDAP™Tukee metadataa (Erityisesti muuttujien yksiköt) Toisin kuin jotkut muut palvelinohjelmistot. (Mikä on data ilman metatietoja?) Käyttää ohjelmistoa, joka ei tue metatietoja, on kutsua tiedot väärin ymmärrettäviksi ja väärinkäytettäviksi.
*   ERDDAP™on ilmainen ja avoimen lähdekoodin ohjelmisto, toisin kuin muut ohjelmistot. jatkuva kehitysERDDAP™on jo maksettu. TukeaERDDAP™Käyttäjät ovat ilmaisia.
*   ERDDAPulkonäköä voidaan helposti muokata heijastamaan ja korostaa ryhmääsi (Ei ei eiERDtai taiERDDAP) .
*   ERDDAP™tarjoaa johdonmukaisen tavan käyttää kaikkia tietoaineistoja.
*   ERDDAP™Voit lukea tietoja useista tietokannoista ja tietokannoista.
*   ERDDAP™voi käsitellä suuria tietoaineistoja, mukaan lukien tietoaineistoja, joissa lähdetiedot ovat monissa tietotiedostoissa.
*   ERDDAP™voi kirjoittaa tietoja useisiin tietotiedostoihin käyttäjän pyynnöstä, mukaan lukien tieteelliset tietotiedostotyypit, kuten netCDF, ESRI .csv, jaODV .txt.
*   ERDDAP™voi tehdä räätälöityjä kaavioita ja karttoja tietojen osajoukoista käyttäjän eritelmien perusteella.
*   ERDDAP™voi käsitellä ei-data-tietoaineistoja, kuten kuvien, videoiden tai äänitiedostojen kokoelmia.
*   ERDDAP™on asennettu ja käytetty[Yli 60 organisaatiota ympäri maailmaa](/#who-uses-erddap).
*   ERDDAP™on listattu yhdeksi palvelimeksi, jota suositellaan käytettäväksiNOAASisällä[NOAATiedonsaantimenettelydirektiivi](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)Toisin kuin muut ohjelmistot.
*   ERDDAP™on tuotteenNMFS//NOAAKäyttämällä sitä sisälläNMFSjaNOAAPitäisi olla ylpeyden aiheNMFSjaNOAA.

Ole hyvä ja annaERDDAP™Kokeile. Jos tarvitset apua, lähetä viestiERDDAP™Google-ryhmä.
     
##### Lisäarvot{#addfillvalueattributes} 
Tämä erityinen EDDType-vaihtoehto ei ole tietotyyppi. Se on työkalu, joka voi lisätä joitakin muuttujia joidenkin tietoaineistojen tiedostojen \\ \\-arvo-ominaisuuksia. Näytä[Lisäarvot](#add-_fillvalue-attributes).
     
##### Löydetty Aika-aika{#findduplicatetime} 
Tämä erityinen EDDType-vaihtoehto ei ole tietotyyppi. GenerateDatasets Xml etsii kokoelmaa.nc  (ja liittyvät) tiedostot löytää ja tulostaa luettelo tiedostoista, joilla on kaksinkertaiset aika-arvot. Kun se katsoo aika-arvoja, se muuntaa ne alkuperäisistä yksiköistä."seconds since 1970-01-01"Jos eri tiedostot käyttävät eri yksiköitä. Sinun on annettava aloitushakemisto (Raitiovaunun kanssa tai ilman) tiedoston nimi säännöllinen ilmaisu (Esim. . . . . . ..nc ) ja aikamuuttujan nimi tiedostoissa.
     
##### ncdump{#ncdump} 
Tämä erityinen EDDType-vaihtoehto ei ole tietotyyppi. GenerateDatasets XML painaa[ncdump](https://linux.die.net/man/1/ncdump)Kuin printout of an.nc,.ncml tai.hdftiedosto. Käytännössä netcdf-java[NCD](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html)Tämä on rajoitetumpi työkalu kuin NCdumpin C-versio. Jos käytät tätä vaihtoehtoa, GenerateDatasetsXml pyytää sinua käyttämään yhtä vaihtoehtoa: "-h" (Pää) "C" (Koordinaatit vaihtelevat) ^ Tai ”vall” (Oletus) "-v var1;var2", "-v var1" (0,0:10,0:20) ". Tämä on hyödyllistä, koska ilman ncdump on vaikea tietää, mitä on.nc,.ncml tai.hdftiedosto ja mitä EDDType sinun pitäisi määrittää GenerateDatasets XML. Yksi.ncml-tiedosto, tämä tulostaa ncdump-tuloksen tulosta.ncml-tiedostojen muutokset, joita sovelletaan taustalla olevaan.nctai tai.hdftiedosto.
         
### Dasds{#dasdds} 
*   [ **Dasds** ](#dasdds)on komentoriviohjelma, jota voit käyttää, kun olet luonut ensimmäisen XML-yrityksen uuteen tietoaineistoon.datasets.xml. DasDdsilla voit testata ja jalostaa XML:ää toistuvasti. Kun käytät DasDds-ohjelmaa:
    1. Windowsissa, ensimmäinen kerta kun käytät DasDds, sinun on muokattava DasDds. bat-tiedosto, jossa on tekstieditori, joka muuttaa polkua javaan. Ex-tiedosto, jotta Windows voi löytääJava.
    2. Dasds pyytää sinuadatasetIDtietokantaan, jonka parissa työskentelet.
    3. DasDds pyrkii luomaan tietoaineistondatasetID.
        * DasDds painaa aina paljon diagnostisia viestejä.
Jos käytät "DasDds -verbose", DasDds tulostaa enemmän diagnostisia viestejä kuin tavallisesti.
        * Turvallisuuden vuoksi DasDds poistaa aina kaikki tallennetut tiedot. (tiedostoja) aineistoa varten ennen tietojen luomista. Tämä on sama kuin asettaa a[Kova lippu](/docs/server-admin/additional-information#hard-flag)Yhdistettyjä tietoaineistoja varten saatat haluta muokata tiedostoa NameRegex tilapäisesti rajoittaakseen tietojen rakentajan löytämien tiedostojen määrää.
        * Jos aineisto ei lataudu (Mistä tahansa syystä) DasDds lopettaa ja näyttää virheilmoituksen ensimmäisestä virheestä.
             **Älä yritä arvata, mikä ongelma voi olla. Lue ERROR-viesti huolellisesti.**   
Tarvittaessa lue myös edelliset diagnoosiviestit löytääksesi lisää vihjeitä ja tietoa.
        *    **Tee muutos tietoaineiston XML:ään, jotta voit ratkaista tämän ongelman.**   
Anna DasDdsin yrittää luoda aineistoa uudelleen.
        *    **Jos ratkaiset ongelman toistuvasti, ratkaiset kaikki ongelmat.**   
Tiedot latautuvat.
    4. Kaikki DasDds-tuotokset (diagnostiikka ja tulokset) on kirjoitettu näytölle ja *isovanhemmat* /DasDds.log
    5. Jos DasDds voi luoda tietoaineiston, DasDds näyttää sinulle[.das (Tietoa rakenteesta) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das),[.dds (Data Descriptor Rakenne) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds)ja[.timeGaps (Aika-aukkoja) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)tiedot näytölläsi olevasta tietoaineistosta ja kirjoita ne *isovanhemmat* /DasDds.out
    6. Usein haluat tehdä pienen muutoksen tietoaineiston XML:ään puhdistaaksesi tietoaineiston metatiedot ja rerun DasDds.

### Bonus Kolmannen osapuolen työkalu:ERDDAPLinkki{#bonus-third-party-tool-erddap-lint} 
ERDDAPLinkki on Rob Fullerin ja Irlannin Marine-instituutin Adam Leadbetterin ohjelma, jonka avulla voit parantaa metatietojasi.ERDDAP™Dataa.ERDDAPLinkki sisältää sääntöjä ja yksinkertaisen staattisen verkkosovelluksen, jolla suoritetaan joitakin todentamistestejäERDDAP™palvelin. Kaikki testit suoritetaan selaimessa.” kuin[Unix/Linux-linkki](https://en.wikipedia.org/wiki/Lint_(software)Voit muokata voimassa olevia sääntöjä tai lisätä uusia sääntöjä. Näytä[ERDDAPLinkki](https://github.com/IrishMarineInstitute/erddap-lint)Lisätietoa.

Tämä työkalu on erityisen hyödyllinen tietoaineistoille, jotka olet luonut jo jonkin aikaa sitten, ja nyt haluat tuoda ajan tasalle nykyisten metatietojen mieltymykset. GenerateDatasetsin varhaiset versiot XML ei ole pyrkinyt luomaan maailmaacreator\\_name,creator\\_emailcreator-tyypin taicreator\\_urlmetadataa. Voit käyttääERDDAPLinkki tunnistaa tietoaineistot, jotka puuttuvat näistä metadata-ominaisuuksista.

Kiitos Robille ja Adamille tämän työkalun luomisesta.ERDDAP™yhteisö.
 
## Perusrakenteendatasets.xmlTiedosto{#the-basic-structure-of-the-datasetsxml-file} 
Vaadittavat ja valinnaiset tunnisteet, jotka on sallittudatasets.xmltiedostotiedosto (ja kuinka monta kertaa ne näyttävät) Näytetään alla. Käytännössä sinundatasets.xmlsaa paljon&lt;Dataset &gt; tagit ja käytä vain muita tunnisteita&lt;erdapdatasets &gt; tarpeen mukaan.

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

Tulevaisuudessa on mahdollista saada uusia koodeja, mutta toistaiseksi suositellaan vain ISO-8859-1:tä.
 
### X Sisältää{#xinclude} 
Uusi versio 2.25 tukee Xincludea. Tämä edellyttää, että käytät SAX-palvelinta&lt;Käyttöoikeus (SaxParser)&lt;/useSaxParser&gt; in your setup.xml Tämän avulla voit kirjoittaa jokaisen tietoaineiston omaan tiedostoonsa ja sitten sisällyttää ne kaikki päätiedostoon.datasets.xml• käyttää uudelleen tietoaineiston määritelmiä tai molempia. Jos haluat nähdä esimerkin,[EDDTestDataset.java](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java)XInclude määrittää muuttuvien määritelmien uudelleenkäytön.
 

- -

## Huomautuksia{#notes} 

Työskentelyä yhdessädatasets.xmlTiedosto on ei-triviaalinen projekti. Lue kaikki muistiinpanot huolellisesti. Kun olet valinnut[Tietotyyppi](#list-of-types-datasets)Lue tarkempi kuvaus tästä huolellisesti.
     
### Datasetin tyypin valinta{#choosing-the-dataset-type} 
Useimmissa tapauksissa on vain yksiERDDAP™tietotyyppi, joka soveltuu tiettyyn tietolähteeseen. Muutamissa tapauksissa (esim..nctiedostoja) On olemassa muutamia mahdollisuuksia, mutta yleensä yksi niistä on paras. Ensimmäinen ja suurin päätös, jonka sinun on tehtävä, on: onko tarkoituksenmukaista käsitellä tietoaineistoa moniulotteisten ryhmien ryhmänä. (Jos näin näkee[EDDGridDatatyypit](#eddgrid)) Tietokannan kaltainen taulukko (Jos näin näkee[EDDTable Dataset Tyypit](#eddtable)) .
     
### Tietojen palveleminen niin kuin on{#serving-the-data-as-is} 
Tietolähteitä ei yleensä tarvitse muuttaa (muuntaa tiedostot johonkin muuhun tiedostotyyppiin) niin ettäERDDAP™voi palvella sitä. Yksi olettamuksistaERDDAP™Tietolähdettä käytetään sellaisenaan. Yleensä tämä toimii hyvin. Joitakin poikkeuksia ovat:
* Tietokanta ja Cassandra -----ERDDAP™voivat palvella tietoja suoraan relaatiotietokannoista ja Cassandrasta. Turvallisuuden, kuormien tasapainottamisen ja suorituskyvyn kannalta voit kuitenkin päättää perustaa toisen tietokannan samoilla tiedoilla tai tallentaa tiedot.NetCDFv3.nctiedostoja ja onERDDAP™toimittaa tiedot uudesta tietolähteestä. Näytä[EDDTableFromDatabase](#eddtablefromdatabase)ja[EDDTableFromCassandra](#eddtablefromcassandra).
* Tuetut tietolähteet -ERDDAP™Tietolähteitä on paljon, mutta maailma on täynnä 1000-lukua. (miljoonaa?) Eri tietolähteet (Erityisesti datatiedostojen rakenteet) . JosERDDAP™Älä tue tietolähteitäsi:
    * Jos tietolähde onNetCDF .nctiedostoja, voit käyttää[NCML](#ncml-files)muuttaa tiedostoja lennossa tai käyttää[NCO](#netcdf-operators-nco)muuttaa pysyvästi tiedostoja.
    * Voit kirjoittaa tiedot tietolähteen tyyppiin, jokaERDDAP™tukea.NetCDF3.nctiedostot ovat hyvä, yleinen suositus, koska ne ovat binääritiedostoja, jotkaERDDAP™osaa lukea hyvin nopeasti. Tabulaarista dataa varten harkitse tietojen tallentamista kokoelmassa..nctiedostoja, jotka käyttävät[CF Discrete Sampling Geometria (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Kontiguous Ragged Array -tietorakenteet ja niin voidaan käsitelläERDDAP&gt;[EDDTableFromNcFiles](#eddtablefromnccffiles)). Jos se on loogisesti järjestetty (Jokaisella on dataa avaruuden ja ajan huipulle) ,ERDDAP™Tiedot voidaan kerätä erittäin nopeasti.
    * Voit pyytää, että tietolähteen tuki lisätäänERDDAP™sähköpostilla Chris. Johannes osoitteessa Noaa.gov.
    * Voit lisätä tuen tälle tietolähteelle kirjoittamalla koodin itse. Näytä[TheERDDAP™Ohjelmoijan opas](/docs/contributing/programmer-guide)
* Nopeus -ERDDAP™Tietoja voi lukea useista tietolähteistä paljon nopeammin kuin toiset. Esimerkiksi lukeminenNetCDFv3.nctiedostot ovat nopeita ja ASCII-tiedostojen lukeminen on hitaampaa. Jos on suuri (&gt; 1000) tai valtava (&gt; 10 000) lähdetiedostojen määrä,ERDDAP™Vastaa pyyntöihin hitaasti. Yleensä ero ei ole havaittavissa ihmiselle. Jos kuitenkin luuletERDDAP™on hidas tietylle tietoaineistolle, voit ratkaista ongelman kirjoittamalla tiedot tehokkaampaan asennukseen. (yleensä muutama, hyvin rakennettu,NetCDFv3.nctiedostoja) . Tabulaarista dataa, katso[Tämä neuvo](#millions-of-files).
         
### Hintti{#hint} 
XML:n luominen tietoaineistoon on usein helpompaa tekemällä jäljennös tietoaineiston kuvauksesta.xml ja muuttamalla sitä.
    
### erityispiirteiden koodaaminen{#encoding-special-characters} 
Siitä lähtiendatasets.xmlXML-tiedosto, sinun täytyy[&-koodi](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML)&gt; &gt; &gt;&lt;"ja """ kaikissa sisällöissä kuten "&amp;"&lt;ja "jagt";
Väärin:&lt;otsikko &gt; Aika & Tides&lt;/title&gt;
Oikea:&lt;otsikko &gt; Time &amp; Tides&lt;/title&gt;
     
### XML ei siedä syntaksivirheitä{#xml-doesnt-tolerate-syntax-errors} 
Kun olet muokannut dataset.xml-tiedostoa, on hyvä tarkistaa, että tulos on[Hyvin muotoiltu XML](https://www.w3schools.com/xml/xml_dtd.asp)liittämällä XML-tekstin XML-tarkkaimeen, kuten[xmlvalidaatio](https://www.xmlvalidation.com/).
     
### Troubleshooting vinkkejä{#troubleshooting-tips} 
*    **Muita tapoja diagnosoida ongelmia tietoaineistojen kanssa**   
Kahden pääasian lisäksi[Työkalut](#tools),
    *   [log.txt](/docs/server-admin/additional-information#log)Lokitiedosto, jossa on kaikkiERDDAPdiagnostisia viestejä.
    * The[Päivittäinen raportti](/docs/server-admin/additional-information#daily-report)on enemmän tietoja kuin status-sivulla, mukaan lukien luettelo aineistoista, jotka eivät latautuneet ja poikkeukset (Virheitä) He ovat luoneet.
    * The[Tilasivut](/docs/server-admin/additional-information#status-page)Helppo tapa tarkistaaERDDAP"Station from any web selain. Se sisältää luettelon aineistoista, jotka eivät latautuneet (mutta ei niihin liittyviä poikkeuksia) Tehtävän tilastot (osoittaa edistystä[EDDGridKopio](#eddgridcopy)ja[EdDTableCopy](#eddtablecopy)Tietoja ja mitä tahansa[EDDGridFilejä](#eddgridfromfiles)tai tai[EDDTableFromfiilit](#eddtablefromfiles)tietoja, jotka käyttävät[CacheFrom](#cachefromurl)  (Ei kätköä SizeGB) ) .
    * Jos olet jumissa, katso meidän[Lisätuen saaminen](/docs/intro#support).
         
### Erikoismuuttujat{#special-variables} 
*    **[Pituus, leveys, korkeus (tai syvyys) ja aika (Lataa) Muuttuva](#destinationname) [destinationName](#destinationname)S on erityinen.** 
    * Yleisesti ottaen:
        * LLAT-muuttujat tiedetäänERDDAP™Jos akseli muuttuu (forEDDGridDataa) Tietojen muuttujien (EDDTable Datasets)  [destinationName](#destinationname)on "pitkä", "leveys", "korkeus", "syvyys" tai"time".
        * Kannustamme sinua käyttämään näitä tavallisia nimiä aina kun mahdollista. Kumpaakaan niistä ei tarvita. Jos et käytä näitä nimiä,ERDDAP™ei tunnista niiden merkitystä. Esimerkiksi LLAT-muuttujat hoidetaan erityisesti Make A Graphilla. ( *datasetID* .grafiikka) Jos X Axis -muuttuja on "pitkä" ja Y Axis -muuttuja on "leveys", saat kartan. (vakiomuotoinen ennustus ja maski, poliittiset rajat jne.) Kuvan sijasta.
        *   ERDDAP™Lisäämme automaattisesti paljon metatietoja LLAT-muuttujaan (Esimerkiksi "[ioos\\_category](#ioos_category)"[Yksiköt](#units)", ja useita standardeihin liittyviä ominaisuuksia, kuten "CoordinateAxistype") .
        *   ERDDAP™Lisäämme automaattisesti, lennolla, paljon globaaleja metatietoja, jotka liittyvät valitun data-alan LLAT-arvoihin. (Esimerkkinä "geospatial =") .
        * Asiakkaat, jotka tukevat näitä metatietoja, voivat hyödyntää lisättyjä metatietoja ajoissa ja tilassa.
        * Asiakkaiden on helpompi tuottaa kyselyjä, jotka sisältävät LLAT-muuttujat, koska muuttujien nimet ovat samat kaikissa merkityksellisissä tietokannoissa.
    * "pitkä" muuttuja ja "leveys" muuttuja:
        * Käytä[destinationName](#destinationname)"pitkä" ja "leveys" vain, jos[Yksiköt](#units)ovat tutkintoja ja tutkintoja vastaavasti. Jos tietosi eivät sovi näihin vaatimuksiin, käytä eri muuttujan nimiä. (Esimerkiksi x, y, LonRadians, LatRadians) .
        * Jos sinulla on pituus- ja leveystiedot eri yksiköissä ja siten erilaisissadestinationNameEsimerkiksi LonRadians ja LatRadians, Make A Graph ( *datasetID* .grafiikka) Tekee kuvia (Esimerkiksi aikasarja) karttojen sijaan.
    * Muuttuvassa "korkeudessa" ja "syvässä" muuttujassa:
        * Käytä[destinationName](#destinationname)"asento" tietojen etäisyyden tunnistamiseksi merenpinnan yläpuolella (Positiivinen = "ylös" arvot) . Vaihtoehtoisesti voit käyttää merenpinnan alapuolella olevia etäisyyksiä, jos arvot ovat negatiivisia merenpinnan alapuolella (tai jos käytät esimerkiksi)
[...]&lt;nimi ="scale\\_factor&gt; &gt; &gt; &gt; &gt; 1 1&lt;/att&gt;) (#scale_factor) muuttaa syvyysarvot korkeusarvoiksi.
        * KäytädestinationName"syvyys" tietojen etäisyyden tunnistamiseksi merenpinnan alapuolella (Positiivinen = alaspäin) .
        * Tietoaineistossa ei välttämättä ole sekä "korkeutta" että "syviä" muuttujia.
        * Näille muuttuville nimille,[Yksiköt](#units)Sen on oltava "m", "mittari" tai "mittari". Jos yksikkö on erilainen (Esimerkiksi fatomit) Voit käyttää
[...]&lt;nimi ="scale\\_factor&gt; &gt; *jotkut Arvon arvo* &lt;/att&gt;) (#scale_factor) ja [&lt;att-nimi = "yksiköt"&lt;/att&gt;) (#yksiköt) muuntaa yksiköt metreiksi.
        * Jos tietosi eivät sovi näihin vaatimuksiin, käytä eridestinationName  (Etäisyydet maan päällä, Yhteenveto) .
        * Jos tiedät vertikaalisen CRS:n, määritä se metadatassa, esim. EPSG:5829. (Välitön korkeus merenpinnan yläpuolella) EPSG:5831 (Välitön syvyys merenpinnan alapuolella) EPSG:5703 (NAVD88 korkeus) .
    * Sillä"time"Vaihtoehtoisia:
        * Käytä[destinationName](#destinationname) "time"Vain muuttujille, jotka sisältävät koko päivämäärän + (Päivämäärä, jos kaikki on) . Jos esimerkiksi päivämäärän ja ajankohdan erillisiä sarakkeita on olemassa, älä käytä muuttuvaa nimeä."time".
        * Näytä[Yksiköt](#time-units)Lisätietoja yksiköiden attribuutista ajan ja aikaStamp-muuttujat.
        * Muuttuva aika ja siihen liittyvät[Aika-aika Stamp-muuttujat](#timestamp-variables)ovat ainutlaatuisia, koska ne muuntavat aina tietoarvoja lähdemuodosta. (Mitä tahansa se on) Numeerinen arvo (1970-01-01T00:00:00Z) tai String-arvo (ISO 8601:2004 (E) formaatti) riippuen tilanteesta.
        * Kun käyttäjä pyytää aikatietoja, hän voi pyytää niitä määrittelemällä ajan numeroarvoksi. (1970-01-01T00:00:00Z) tai String-arvo (ISO 8601:2004 (E) formaatti) .
        *   ERDDAP™on hyödyllistä[Muunna numero Aikaa / From a String Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
        * Näytä[MitenERDDAPSopimukset ajan kanssa](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
            
### Miksi vain kaksi perustietoa?{#why-just-two-basic-data-structures} 
* Koska ihmisten ja tietokoneasiakkaiden on vaikea käsitellä monimutkaisia rakenteita,ERDDAP™Käytä vain kahta perustietoa:
    * A[Verkkotietojen rakenne](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)  (esimerkiksi satelliittitietojen ja mallitietojen osalta) ja
    * A[Tabulaarinen datarakenne](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)  (esimerkiksi in-situ buoy, asema ja trajectory data) .
* Kaikkia tietoja ei voi ilmaista näissä rakenteissa, mutta suurin osa niistä voi. Erityisesti taulukot ovat joustavia tietorakenteita. (Tutustu tietokantaohjelmien menestykseen) .
* Tämä helpottaa tiedonkeruuta.
* Tämä tekee tietovasteista yksinkertaisen rakenteen, jonka avulla dataa on helpompi palvella laajemmissa tiedostotyypeissä. (Ne tukevat usein yksinkertaisia tietorakenteita.) . Tämä on tärkein syy, miksi olemmeERDDAP™Tällä tavalla.
* Tämä puolestaan tekee siitä meille helppoa. (tai joku) Kirjoita ohjelmisto, joka toimii kaikkien kanssaERDDAP™Dataa.
* Tämä helpottaa tietojen vertailua eri lähteistä.
* Olemme hyvin tietoisia siitä, että jos olet tottunut työskentelemään muiden tietorakenteiden kanssa, saatat ajatella, että tämä lähestymistapa on yksinkertaistettu tai riittämätön. Kaikilla tietorakenteilla on kuitenkin kauppoja. Kukaan ei ole täydellinen. Jopa do-it-all-rakenteilla on haittapuoli: niiden kanssa työskentely on monimutkaista ja tiedostot voidaan kirjoittaa tai lukea vain erityisillä ohjelmistokirjastoilla. Jos hyväksytERDDAP"Riittävän lähellä yrittää työskennellä sen kanssa, saatat huomata, että sillä on etunsa. (Tuki useille tiedostotyypeille, jotka voivat säilyttää tietovastaukset) . The[ERDDAP™Liukunäytös](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)  (Erityisesti[Tietorakenteet liukuvat](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures)) Puhutaan paljon näistä asioista.
* Ja vaikka tämä lähestymistapa kuulostaakin oudolta, useimmatERDDAP™Asiakkaat eivät koskaan huomaa - he yksinkertaisesti näkevät, että kaikilla aineistoilla on mukava yksinkertainen rakenne ja he ovat kiitollisia siitä, että he voivat saada tietoja monista lähteistä, jotka palautetaan monissa tiedostomuodoissa.
         
### Dimensio{#dimensions} 
*    **Entä jos lähdeaineiston verkkomuuttujat eivät jaa samoja akselimuuttujat?**   
SisälläEDDGridaineistot, kaikki tietomuuttujat on käytettävä (Osakkeet) kaikki akselimuuttujat. Joten jos lähdeaineistossa on joitakin muunnelmia, joilla on yksi ulottuvuus, ja muita muuttujia, joilla on eri ulottuvuuksia, sinun on tehtävä kaksi aineistoa.ERDDAP. Voit esimerkiksi tehdä yhdenERDDAP™Alkuperäinen nimi: Some Title (pinnalla) "Voit pitää muuttujia, jotka vain käyttävät\\[Aika-aika\\]\\[leveys\\]\\[Pituus\\]ulottuvuuksia ja tehdä toinenERDDAP™Alkuperäinen nimi: Some Title (syvyyksissä) "Säilyttää muuttujia, jotka käyttävät\\[Aika-aika\\]\\[Korkeus\\]\\[leveys\\]\\[Pituus\\]. Tai ehkä voit muuttaa tietolähteen lisätä ulottuvuuden yhdellä arvolla. (Esimerkiksi korkeus = 0) tehdä muuttujista johdonmukaisia.
    
    ERDDAP™ei käsittele monimutkaisempia tietoaineistoja (Esimerkiksi malleja, jotka käyttävät kolmiota) Hyvin. Voit palvella näitä tietojaERDDAP™luomalla kaksi tai useampia tietojaERDDAP™  (jotta kaikki tietomuuttujat jokaisessa uudessa tietoaineistossa jakavat samat akselimuuttujat) Tämä ei ole sitä mitä käyttäjät haluavat. Joillekin tietokannoille voit harkita säännöllisen verkkoversion tekemistä tietoaineistosta ja tarjota sitä alkuperäisten tietojen lisäksi. Jotkin asiakasohjelmistot voivat käsitellä vain säännöllistä verkkoa, joten voit saavuttaa lisäasiakkaat.
     
    
### Gridded Data{#projected-gridded-data} 
Joillakin verkkotiedoilla on monimutkainen rakenne. Satelliittitaso 2 (”Along Track”) Tiedot eivät käytä yksinkertaista projektiota. Malleja (ja muut) Työskentele usein erilaisissa ei-sylinterisissä ennusteissa. (Esimerkiksi konic, polar stereographic, tripolar) rakenteettomissa verkoissa (monimutkaisempi datarakenne) . Osa loppukäyttäjistä haluaa nämä tiedot kuten on, joten tietoja ei menetetä. Näille asiakkaille,ERDDAP™voi käyttää tietoja, kuten on, vain josERDDAP™Järjestelmänvalvoja murtaa alkuperäisen tietoaineiston muutamaan tietoaineistoon, joista jokainen sisältää muuttujia, jotka jakavat samat akselimuuttujat. Kyllä, se tuntuu oudolta ja se on erilainen kuin useimmat.OPeNDAPpalvelimia. Mutta kuitenkinERDDAP™Korostamme, että tiedot ovat saatavilla monessa muodossa. Tämä on mahdollista, koskaERDDAP™Tarvitsemme tai käytämme yhtenäisempää datarakennetta. Vaikka se on vähän hämmentävä (Toisin kuin odotettiin) ,ERDDAP™voi jakaa ennustettuja tietoja.

\\[Kyllä,ERDDAP™Voi olla löysempiä vaatimuksia tietorakenteen, mutta pitää vaatimukset lähtömuodot. Tämä kuitenkin johtaisi sekaannukseen monien käyttäjien, erityisesti uusien, keskuudessa, koska monet näennäisesti pätevät tietopyynnöt eri rakenteilla olisivat mitättömiä, koska tiedot eivät sovi tiedostotyyppiin. Palaamme nykyisen järjestelmän suunnitteluun.\\]

Jotkut loppukäyttäjät haluavat tietoja lat lon -sylinterisestä ennusteesta, kuten Equirectangular / levy carrée tai Mercator, helppokäyttöisyyttä eri tilanteissa. Näissä tilanteissa kannustammeERDDAP™Ohjaaja käyttää muita ohjelmistoja (NCO??Matlab?? R? IDV? ...???) palauttaa tiedot maantieteelliseen (Equirectangular Projection / levy Carrée) tai muu sylinterinen projektio, joka palvelee tätä tietojen muotoaERDDAP™erilaista dataa. Tämä vastaa sitä, mitä ihmiset tekevät, kun he muuntavat satelliittitason 2 datan tasoksi 3. Yksi tällainen työkalu on[NCO](https://nco.sourceforge.net/nco.html#Regridding)joka tarjoaa laajennusvaihtoehtoja tietojen siirtämiseen.

#### GIS- ja reprojektointitiedot{#gis-and-reprojecting-data} 
Koska GIS-maailma on usein karttalähtöinen, GIS-ohjelmat tarjoavat yleensä tukea tietojen uudelleenkäsittelyyn, toisin sanoen toteutetaan kartta, jossa on erilainen ennuste.

Tällä hetkellä,ERDDAP™Ei ole työkaluja tietojen uudelleenkäsittelyyn. Sen sijaan suosittelemme, että käytät ulkoista työkalua tietoaineiston muunnelman tekemiseen, jossa tiedot on käsitelty alkuperäisestä lomakkeesta suorakulmaiseen muotoon. (Leveyspituus) Laji sopiiERDDAP.

Meidän mielestämme CF/DAPMaailma on hieman erilainen kuin GIS-maailma ja toimii hieman alempana.ERDDAP™heijastaa sitä. yleisesti,ERDDAP™on suunniteltu toimimaan ensisijaisesti datan kanssa (Ei karttoja) eikä halua muuttua (Esimerkki: Reproject) näitä tietoja. For ForERDDAP™, verkottuneet tiedot liittyvät usein/tavallisesti/mieluiten lat lon -arvoihin ja sylinteriseen ennusteeseen, eikä joidenkin ennusteiden x,y-arvoihin. Joka tapauksessa,ERDDAP™ei tee mitään tietojen ennusteen kanssa; se vain siirtää tiedot, kuten nykyisen ennusteensa mukaan, teoriassa, että kopiointi on merkittävä muutos tietoihin jaERDDAP™Hän ei halua olla mukana merkittävissä muutoksissa. Myös myöhemmät käyttäjät saattavat naiivisti kopioida tietoja uudelleen, mikä ei olisi yhtä hyvä kuin yhden kopioinnin tekeminen. (Jos siisERDDAP™Hallinnoija haluaa tarjota tietoja eri ennusteessa, sakossa; vain kopioida tiedot offline-tilassa ja tarjota, että erilaisena tietoaineistona.ERDDAP. Satelliittipohjaisia tietoja tarjotaan niin kuin NASA kutsuu tasoa 2 (Swath) tasolle 3 (Equirectangular-projekti) versioita.) MilloinERDDAP™Tekee karttoja (suoraan taiWMSKML) ,ERDDAP™Tällä hetkellä vain tarjoutuu tekemään karttoja Equirectangular / levy carrée -projektiolla, joka onneksi hyväksytään useimpien kartoitusohjelmien avulla.

KannustammeERDDAP™Ohjaaja käyttää muita ohjelmistoja (NCO??Matlab?? R? IDV? ...???) palauttaa tiedot maantieteelliseen (Equirectangular Projection / levy Carrée) tai muu sylinterinen projektio, joka palvelee tätä tietojen muotoaERDDAP™erilaista dataa. Tämä vastaa sitä, mitä ihmiset tekevät, kun he muuntavat satelliittitason 2 datan tasoksi 3. Yksi tällainen työkalu on[NCO](https://nco.sourceforge.net/nco.html#Regridding)joka tarjoaa laajennusvaihtoehtoja tietojen siirtämiseen.

Toivomme, ettäERDDAP™Sisäänrakennetut työkalut tarjoavat karttoja muilla ennusteilla tulevaisuudessa. Toivomme myös paremman yhteyden tulevaisuuteen. (muu kuin nykyinenWMSPalvelupalvelu) . On kauheaa, että tässä "modernissa" maailmassa CF:n ja CF:n välinen yhteysDAPMaailma ja maailma ovat edelleen niin heikkoja. Molemmat ovat listalla. (Jos haluat auttaa, erityisesti yhdistämälläERDDAP™Ole hyvä ja lähetä sähköpostia Chrisille. Johannes osoitteessa Noaa.gov.) 
    
### Tietotyypit{#data-types} 
ERDDAP™Tukee seuraavia tietotyyppejä
 (nimet ovat arkaluonteisia;'u'prefix tarkoittaa "allekirjoittamatonta"; monien muiden järjestelmien nimien lukumäärä on bittien määrä.) :

#### By{#byte} 
*    **By** on allekirjoittanut kokonaislukuarvot -128 - 127.
Muissa järjestelmissä tätä kutsutaan joskus nimellä int8.
Tätä kutsutaan nimellä SQL ja Cassandra.
    ERDDAP™Käännökset[Boolee](#boolean-data)Joistakin lähteistä (SQL ja Cassandra) tavut sisäänERDDAP™0=falsi, 1=tosi ja 127=missing\\_value.
#### Uby{#ubyte} 
*    **Uby** on allekirjoittamattomia kokonaislukuja, joiden vaihteluväli on 0-255.
Joskus sitä kutsutaan nimellä Uint8.
#### Lyhyt lyhyt{#short} 
*    **Lyhyt lyhyt** on allekirjoittanut kokonaislukuarvot, joiden vaihteluväli on -32768 - 32767.
Muissa järjestelmissä tätä kutsutaan joskus nimellä int16.
Tätä kutsutaan nimellä SQL ja Cassandra.
#### Lyhyt{#ushort} 
*    **Lyhyt** Allekirjoittamattomat kokonaisluvut, joiden vaihteluväli on 0–65535.
Joskus sitä kutsutaan nimellä uint16.
#### Sisään{#int} 
*    **Sisään** on allekirjoittanut kokonaislukuarvot -2147483648 - 2147483647.
Muissa järjestelmissä tätä kutsutaan joskus nimellä int32.
Tätä kutsutaan integeriksi|Numeerinen (??) SQL ja Cassandra.
#### Uin{#uint} 
*    **Uin** Allekirjoittamattomat kokonaislukuarvot ovat 0-4294967295.
Toisinaan sitä kutsutaan uint32:ksi.
#### Pitkä pitkä{#long} 
*    **Pitkä pitkä** on allekirjoittanut kokonaislukuarvot -9223372036854775808 - 9223372036854775807.
Muissa järjestelmissä tätä kutsutaan joskus nimellä int64.
Tätä kutsutaan nimellä "bigint"|Numeerinen (??) SQL ja "bigint" Cassandra.
Koska monet tiedostotyypit eivät tue pitkiä tietoja, niiden käyttö on lannistunut. Jos mahdollista, käytä kaksinkertaista (Katso alapuolelta) .
#### ulong{#ulong} 
*    **ulong** on allekirjoittamattomia kokonaislukuja, joiden vaihteluväli on 0–18446744073709551615
Tätä kutsutaan joskus nimellä Uint64.
Koska monet tiedostotyypit eivät tue ulompaa dataa, niiden käyttö on lannistunut. Jos mahdollista, käytä kaksinkertaista (Katso alapuolelta) .
#### kelluva{#float} 
*    **kelluva** Se on IEEE 754-kellus, jonka valikoima on noin +/-3,4023466e+38.
Joskus sitä kutsutaan float32:ksi.
Tätä kutsutaan todelliseksi|kelluva (??) |desimaalinen (??) |Numeerinen (??) SQL ja "float" Cassandra.
NaN tarkoittaa ei-numeroa.
    ERDDAP™Muuntaa positiivisia ja negatiivisia äärettömyyden arvoja NaN.
#### kaksinkertainen{#double} 
*    **kaksinkertainen** IEEE 754:n kaksinkertainen valikoima
+/- 1,79769348623157E+308
Joskus sitä kutsutaan float64:ksi.
Tätä kutsutaan kaksinkertaiseksi tarkkuudeksi|kelluva (??) |desimaalinen (??) |Numeerinen (??) SQL ja kaksinkertainen Cassandra.
NaN tarkoittaa ei-numeroa.
    ERDDAP™Muuntaa positiivisia ja negatiivisia äärettömyyden arvoja NaN.
#### Char{#char} 
*    **Char** Yksi, 2-tavuinen (16-bittinen)  [Unicode UCS-2 -hahmo](https://en.wikipedia.org/wiki/UTF-16)vaihtelee\\u0000  (#0) kautta läpi\\uffff  (#6535) .
    \\uffff"määritelmä ei-a-kaavio, joka vastaa NaN:n kaksinkertaista arvoa.
charin käyttö on lannistunut, koska monet tiedostotyypit joko eivät tue jahtaita tai tukevat vain 1-tavuisia charseja. (Katso alapuolelta) . Harkitse sen sijaan Stringiä.
Käyttäjät voivat käyttää char-muuttujaa kaavioiden tekemiseen.ERDDAP™Muuntaa merkit Unicode-koodin numeroon, jota voidaan käyttää numeroina.
#### String{#string} 
*    **String** Sekvenssi on 0 tai enemmän, 2-tavuinen (16-bittinen)  [Unicode UCS-2 -hahmot](https://en.wikipedia.org/wiki/UTF-16).
    ERDDAP™käyttää / tulkitsee 0-pituusmerkkijonoa puuttuvana arvona.ERDDAP™Se ei tue todellista null-jonoa.
Teoreettinen enimmäisjousi pituus on 2147483647 merkkiä, mutta on olemassa useita ongelmia eri paikoissa jopa hieman lyhyempi Strings.
KäytäERDDAPSQL:n hahmo, varchar, hahmon vaihtelu, binaarinen, varbinaari, intervalli, sarja, multiset, xml ja mikä tahansa muu tietokantatyyppi, joka ei sovi puhtaasti mihinkään muuhun tietokantaan.ERDDAP™Tietotyyppi.
KäytäERDDAPString for Cassandra's "text" ja kaikki muut Cassandra-tietotyypit, jotka eivät sovi puhtaasti mihinkään muuhunERDDAP™Tietotyyppi.
     

Ennen ennenERDDAP™V2.10,ERDDAP™ei ole tukenut allekirjoittamattomia kokonaislukutyyppejä sisäisesti ja tarjonnut rajoitettua tukea tietojen lukijoille ja kirjoittajille.
    
### Tyypin rajoitukset{#data-type-limitations} 
Voit ajatellaERDDAP™järjestelmänä, jolla on virtuaalisia tietoaineistoja ja joka toimii lukemalla tietoja tietoaineiston lähteestä sisäiseen tietomalliin ja kirjoittamalla tietoja eri palveluihin (esim.(OPeN)DAP,WMSja tiedostotyypit vastauksena käyttäjäpyyntöihin.

* Jokainen syöttölukija tukee tietotyyppien osajoukkoa, jokaERDDAP™tukea. Lue dataa sisäänERDDAPSisäiset tietorakenteet eivät ole ongelma.
* Jokainen tuloskirjailija tukee myös tietotyyppien osajoukkoa. Tämä on ongelma, koskaERDDAPPitää esimerkiksi puristaa pitkiä tietoja tiedostotyyppeihin, jotka eivät tue pitkiä tietoja.
     

Alla on selityksiä rajoituksista (Tai ei kukaan) eri kirjojen kirjoittajat ja mitenERDDAP™käsittelee ongelmia. Tällaiset komplikaatiot ovat olennainen osaERDDAPTavoitteena on tehdä erilaisista järjestelmistä yhteentoimivia.

#### ASCIII{#ascii} 
* ASCIII (.csv,.tsvjne.) Tekstitiedostot -
    * Kaikki numeeriset tiedot on kirjoitettu String-esityksen kautta. (puuttuvat arvot, jotka näkyvät 0-pituisina) .
    * Vaikka vaikkaERDDAP™kirjoittaa pitkät ja ulommat arvot oikein ASCII-tekstitiedostoihin, monet lukijat (esim. laskentataulukot) ei voi käsitellä oikein pitkiä ja pitkiä arvoja ja muuntaa ne kaksoisarvoiksi. (tarkkuuden menetys joissakin tapauksissa) .
    * Char- ja String-tiedot on kirjoitettu JSON Stringsin kautta, joka käsittelee kaikkia Unicode-hahmoja. (Erityisesti ASCII:n #127 ulkopuolella olevat "epätavalliset" hahmot, esim. Euro-hahmo näyttää "u20ac") .
    
        
#### JSON{#json} 
* JSON (.json,.jsonlCSVjne.) Tekstitiedostot -
    * Kaikki numeeriset tiedot on kirjoitettu String-esityksen kautta.
    * Char- ja String-tiedot on kirjoitettu JSON Stringsiksi, joka käsittelee kaikkia Unicode-hahmoja. (Erityisesti ASCII:n #127 ulkopuolella olevat "epätavalliset" hahmot, esim. Euro-hahmo näyttää "u20ac") .
    * Kaikkien numeeristen tietotyyppien puuttuvat arvot ovat nolla.
         
#### .nc3 tiedostoa{#nc3-files} 
*   .nc3 tiedostoa ei tue natiivisti mitään allekirjoittamattomia kokonaislukuja. Ennen CF v1.9:ää CF ei tukenut allekirjoittamattomia kokonaislukutyyppejä. käsitellä tätä,ERDDAP™2.10+ noudattaa NUG-standardia ja lisää aina ”Unsigned”-ominaisuuden, jonka arvo on ”todellinen” tai ”väärä” ilmaistakseen, onko tiedot allekirjoittamattomasta vai allekirjoitetusta muuttujasta. Kaikki attribuutit on kirjoitettu allekirjoitettuina attribuuteina. (Esimerkki: Tate) Allekirjoitettuja arvoja (esim.actual\\_rangearvojen 0–255 mukainen tavun ominaisuus, jonka arvot 0–1 ovat päinvastoin kuin vaihtelevan arvon lisäarvo. Ei ole helppoa tapaa tietää, mitä (allekirjoitettuja) kokonaislukuja pitäisi lukea allekirjoittamattomina attribuuteina.ERDDAP™Tukee "Unsigned" attribuuttia, kun se lukee.nc3 tiedostoa.
*   .nc3 tiedostoa ei tue pitkiä tai pitkiä tietotyyppejä.ERDDAP™Tämä tapahtuu muuntamalla ne väliaikaisesti kaksoismuuttujaksi. Kaksinkertaiset voivat edustaa kaikkia arvoja +/- 9,007,199,254,740,992 Mikä on 2,53. Tämä on epätäydellinen ratkaisu.Unidatakieltäytyy tekemästä pientä päivitystä.nc3 tämän ja siihen liittyvien ongelmien ratkaisemiseksi,.nc4 4 (Suuri muutos) kuin ratkaisu.
* CF-eritelmä (Ennen v1.9) sanoi tukevansa char-tietotyyppiä, mutta on epäselvää, onko kaari tarkoitettu vain char-sarjan rakennuspalikoiksi. Kysymykset postituslistalle antoivat vain hämmentäviä vastauksia. Näiden komplikaatioiden vuoksi on parasta välttää char-muuttujat.ERDDAP™Käytä muuttujia aina kun mahdollista.
* Perinteisesti,.nc3 tiedostoa vain tuettu merkkijono ASCII-koodilla (7-bittinen, #127) hahmoja. NUG (jaERDDAP) Tämä laajentaa (Aloitus ~2017) Sisältää merkin "Encoding" arvolla "ISO-8859-1" (ASCII:n laajennus, joka määrittää jokaisen 8-bittisen hahmon 256 arvoa) tai "UTF-8" osoittaaksesi, miten String-tiedot koodataan. Muut koodit voivat olla laillisia, mutta ne ovat lannistuneita.
         
#### .nc4 tiedostoa{#nc4-files} 
*   .nc4 tiedostoa tukee kaikkiaERDDAP"Tietotyypit.
    
#### NCCSV-tiedostot{#nccsv-files} 
NCCSV 1.0 -tiedostot eivät tue allekirjoittamattomia kokonaislukuja.
[NCCSV 1.1+ -tiedostot](/docs/user/nccsv-1.00)Tukee kaikkia allekirjoittamattomia kokonaislukuja.
     
#### DAP {#dap} 
*   (OPeN)DAP  (.das, .dds, .asc ASCII-tiedostot ja .dods binaaritiedostot) -
    *   (OPeN)DAPKäsittelee lyhyitä, lyhyitä, int, uint, kelluvia ja kaksinkertaisia arvoja oikein.
    *   (OPeN)DAPon "tasapainoinen" tietotyyppi, jonka se määrittelee allekirjoittamattomaksi, kun taas historiallisesti, THREDS jaERDDAP™on kohdellut "tasapainoa" niin kuin ne ovat allekirjoittaneet(OPeN)DAPpalvelut. käsitellä tätä paremmin,ERDDAP™2.10+ noudattaa NUG-standardia ja lisää aina ”Unsigned”-ominaisuuden, jonka arvo on ”todellinen” tai ”väärä” ilmaistakseen, onko tieto mitäERDDAP™soittaa tavua tai ubyteä. Kaikki tavu- ja ubyte-ominaisuudet on kirjoitettu "tasapainoisiksi" attribuuteiksi, joilla on allekirjoitetut arvot (esim. ubyte)actual\\_rangearvojen 0–255 mukainen tavun ominaisuus, jonka arvot 0–1 ovat päinvastoin kuin vaihtelevan arvon lisäarvo. Ei ole helppoa tapaa tietää, mitä "tasapainoisia" attribuutteja pitäisi lukea ubyte attribuuttina.
    *   (OPeN)DAPei tue allekirjoitettuja tai allekirjoittamattomia pitkiä aikoja.ERDDAP™Tämä tapahtuu muuntamalla ne väliaikaisesti kaksinkertaisiksi muuttujiksi ja attribuuteiksi. Kaksinkertaiset voivat edustaa kaikkia arvoja jopa 9,007,199,254,740,992 Mikä on 2,53. Tämä on epätäydellinen ratkaisu.OPeNDAP  (Organisaatio) kieltäytyy tekemästä pientä päivitystäDAP2.0 Tämän ja siihen liittyvien ongelmien ratkaiseminenDAP4 4 (Suuri muutos) kuin ratkaisu.
    * Koska koska(OPeN)DAPei ole erillistä char-tietotyyppiä, ja se tukee vain 1-tavuisia ASCII-merkkejä. (#127) Stringsissä char-datamuuttujat näkyvät 1-merkkisenä Stringsinä.(OPeN)DAP.das, .dds ja .dods vastaus
    * Teknisesti,(OPeN)DAPspesifikaatio tukee vain ASCII-koodattuja hahmoja (#127) . NUG (jaERDDAP) Tämä laajentaa (Aloitus ~2017) Sisältää merkin "Encoding" arvolla "ISO-8859-1" (ASCII:n laajennus, joka määrittää jokaisen 8-bittisen hahmon 256 arvoa) tai "UTF-8" osoittaaksesi, miten String-tiedot koodataan. Muut koodit voivat olla laillisia, mutta ne ovat lannistuneita.
         
### Tyypin kommentteja{#data-type-comments} 
* Pitkän, ulomman ja char-tietojen huonon tuen vuoksi monissa tiedostotyypeissä lannistamme näiden tietotyyppien käytön.ERDDAP. Jos mahdollista, käytä tuplasti pidemmän ja ulomman sijasta ja käytä Stringiä charin sijaan.
     
* Metadata - koska(OPeN)DAP.das ja .dds-vastaukset eivät tue pitkiä tai pitkiä ominaisuuksia tai tietotyyppejä (Näytä ne kaksinkertaisiksi) Voit sen sijaan käyttääERDDAPMetadatan tabulaarinen esitys, sellaisena kuin se näkyyhttpErddap/ **Info** // *datasetID* .html verkkosivut (esimerkiksi[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) )   (jotka voit saada myös muissa tiedostotyypeissä, esim. .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsv,.xhtml) tai.nccsvMetadata vastaus (esimerkiksi[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)Vaikka.nccsvMetadata on saatavana vain tabulaarisille tietoaineistoille.) Molemmat tukevat kaikkia tietotyyppejä (Huomattavasti, pitkä, ulong ja char) .
         
### Mediatiedostot{#media-files} 
Kaikki tiedot eivät ole numeroita tai tekstiä. Jotkin tietoaineistot koostuvat tai sisältävät mediatiedostoja, kuten kuvia, ääni- ja videotiedostoja.ERDDAP™on joitakin erityisiä ominaisuuksia, joiden avulla käyttäjät voivat käyttää mediatiedostoja. Tämä on kaksivaiheinen prosessi:
 

1. Tee jokaisesta tiedostosta käyttökelpoinen omalla URL-osoitteellasi järjestelmällä, joka tukee sivuvälipyyntöjä.
Helpoin tapa tehdä tämä on laittaa tiedostot hakemistoon, jokaERDDAP™on pääsy. (Jos se on säiliössä kuin.ziptiedosto, poista ne, vaikka haluat ehkä tarjota.ziptiedosto myös käyttäjille.) Tee sitten[EdDTableFromFileNames](#eddtablefromfilenames)Tiedot, joiden avulla nämä tiedostot ovat saatavillaERDDAP™erityisesti kauttaERDDAP&gt;["files"Järjestelmäjärjestelmä](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
    
Kaikki tiedostot ovat saatavilla EDDTableFromFileNamesin kautta jaERDDAP&gt;"files"Järjestelmän tuki[Tate-valikoiman pyynnöt](https://en.wikipedia.org/wiki/Byte_serving). Yleensä kun asiakas (esim. selain) esittää URL-osoitteen, se saa koko tiedoston vastauksena. Taskutuspyynnön avulla pyyntö määrittää useita tavuja tiedostosta, ja palvelin palauttaa vain nämä tavut. Tämä on tärkeää tässä, koska selaimien ääni- ja videosoittimet toimivat vain, jos tiedostoa voidaan käyttää sivuvälipyyntöjen kautta.
    
Vaihtoehtoinen: Jos sinulla on useampi kuin yksi tietokanta, johon liittyy mediatiedostoja, voit tehdä vain yhden EDDTableFromFileNames-tiedoston, jolla on kunkin tiedostoryhmän alikansio. Etu on, että kun haluat lisätä uusia mediatiedostoja uuteen tietoaineistoon, sinun tarvitsee vain luoda uusi kansio ja laittaa tiedostot kansioon. Tiedostot ja kansio lisätään automaattisesti EDDTableFromFileNames-tietokantaan.
    
2. Vaihtoehtoinen: Jos sinulla on tietoaineisto, joka sisältää viittaukset mediatiedostoihin, lisää seERDDAP.
Esimerkiksi sinulla voi olla .csv-tiedosto, jossa on rivi joka kerta, kun joku näki valaan ja sarakkeen, joka sisältää kyseisen havainnon kuvatiedoston nimen. Jos kuvatiedoston nimi on vain tiedostonimi, esim. Img20141024T192403Z, ei täydellinen URL-osoite, sinun on lisättävä[tiedoston käyttöoikeus Url ja / tai tiedostoAccessSuffix](#fileaccessbaseurl)Metadatan ominaisuudet tästädataVariablejoka määrittää perusURL-osoitteen ja riittävyyden näille tiedostonimille. Jos tiedostot ovat saatavilla EDDTableFromFileNamesin kautta, URL on lomakkeessa.
     *Perusta* /erddap/files/ *datasetID* //
Esimerkiksi,
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
Jos on olemassa.ziptai muu konttitiedosto, jossa on kaikki tietomuuttujaan liittyvät mediatiedostot, suosittelemme myös, että tiedosto on käyttäjän saatavilla. (Askel 1 yläpuolella) ja tunnistaa sen a[tiedoston käyttöoikeus Url](#fileaccessarchiveurl)attribuutti.
    

\\[Aloita sisäänERDDAP™V1,82\\]Jos teet ensimmäisen askeleen edellä (tai molemmat vaiheet) Kun käyttäjä katsooERDDAP™ "files"Järjestelmä tälle aineistolle (tai pyytää näkemään tietoaineiston aliryhmän.htmlTablePyydä, jos teet toisen vaiheen) ,ERDDAP™Näytä ikoni tiedostonimen vasemmalla puolella. Jos käyttäjä vilkkuu kyseisen ikonin yli, hän näkee popupin, joka näyttää kuvan tai äänisoitin tai videosoitin. Selaimet tukevat vain rajoitettua määrää

* Kuvakuva kuva (yleensä .gif, .jpg ja .png) ,
* ääntä (.mp3, .ogg ja .wav) ja
* Videotiedostot (Yleensä .mp4, .ogv. WEB) .

Tuki vaihtelee eri versioiden eri selainten eri käyttöjärjestelmissä. Joten jos sinulla on mahdollisuus valita tiedostotyyppi tarjota, on järkevää tarjota tällaisia tiedostoja.

Tai jos käyttäjä napsauttaa tiedostonimeä, joka näkyy yhdelläERDDAP™Web-sivu, heidän selaimensa näyttää kuvan, äänen tai videotiedoston erillisenä verkkosivuna. Tämä on enimmäkseen hyödyllistä nähdä erittäin suuri kuva tai video skaalattu koko näytön sijaan popup.
    
### AWS S3 -tiedostot{#working-with-aws-s3-files} 
[Amazon Web palvelut (AWS) ](https://aws.amazon.com)on myyjä[Pilvitietokone](https://en.wikipedia.org/wiki/Cloud_computing)palvelut.[S3](https://aws.amazon.com/s3/)Se on AWS:n tarjoama objektivarastojärjestelmä. Perinteisen tiedostojärjestelmän hakemistojen ja tiedostojen sijasta (kuin kiintolevy PC:ssä) , S3 tarjoaa vain "buckets", joka pitää "objekteja" (Me kutsumme heitä"files") .

ASCII-tiedostoja (Esimerkkinä .csv) ,ERDDAP™Voit työskennellä tiedostojen kanssa suoraan bucketsissa. Ainoa mitä sinun tarvitsee tehdä on määritellä&lt;tiedostoDir&gt; for the dataset käyttämällä AWS:n taakan tiettyä muotoa, esimerkiksi https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/ . Sinun ei pitäisi käyttää&lt;CacheFromUrl. Katso alta yksityiskohtia.

Binaaritiedostoja (esim..nc.grib, .bufr ja.hdftiedostoja) Sinun täytyy käyttää&lt;CacheFromUrl-järjestelmä kuvattu alla.ERDDAPNetcdf-java (jonkaERDDAP™Käyttää lukea tietoja näistä tiedostoista) ja muut tieteelliset tietoohjelmistot on suunniteltu toimimaan tiedostojen kanssa perinteisessä tiedostojärjestelmässä, joka tarjoaa[Lohkojen taso](https://en.wikipedia.org/wiki/Block-level_storage)Pääsy tiedostoihin (joka sallii tiedoston lukemisen) S3 tarjoaa vain[tiedoston taso (objekti objektiivi) ](https://en.wikipedia.org/wiki/Block-level_storage)Pääsy tiedostoihin (joka sallii koko tiedoston lukemisen) . AWS tarjoaa vaihtoehdon S3:lle.[Elastic Block -kauppa (EBS) ](https://aws.amazon.com/ebs/)), joka tukee lohkotason pääsyä tiedostoihin, mutta se on kalliimpaa kuin S3, joten sitä käytetään harvoin suurten tietotiedostojen massavarastointiin. (Kun ihmiset sanovat tietojen tallentamista pilveen (S3) Se on halpaa, se on yleensä appelsiinien vertailu.) 

#### S3 Buckets{#s3-buckets} 
 **Bucketin sisältö. Avaimia. Objects. Delimiters.**   
Teknisesti S3-laatikot eivät ole järjestetty hierarkkisessa tiedostorakenteessa, kuten tietokoneen tiedostojärjestelmässä. Sen sijaan bucketit sisältävät vain "kohteita" (tiedostoja) Jokaisella on "avain" (Nimi) . Esimerkkinä tästä noaa-goes17 bucketista

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
Vastaava URL-osoite tälle kohteelle on

[ https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc ](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc)

AWS tukee hieman vaihtelua URL:n rakentamisessa, muttaERDDAP™Tarvitaan tämä erityinen muoto:
   https://*bucketName*.s3.*region*.amazonaws.com/*key*   
On yleistä, kuten tässä esimerkissä, tehdä avainnimet näyttävät hierarkkiselta polulta ja tiedoston nimi, mutta teknisesti ne eivät ole. Koska se on yleistä ja hyödyllistä,ERDDAP™käsittelee avaimia hierarkkisella polulla ja tiedoston nimillä, ja tämä dokumentaatio viittaa niihin. Jos avaimet eivät käytä / (esimerkiksi avain, kuten
ABI-Lib.2018.052.22.OR | ABI-L1b-RadM2-M3C10 |G16 |20180522247575 |ERDDAP™Käsittele koko tiedoston nimi.

Yksityinen vs julkinen buckets ----- S3:n järjestelmänvalvoja voi tehdä taakan ja sen sisällön julkiseksi tai yksityiseksi. Jos julkista, kuka tahansa voi ladata tiedostoa URL-osoitteen avulla. Amazonilla on[Avoin data](https://aws.amazon.com/opendata/)Ohjelma, joka isännöi julkisia tietoaineistoja (mukaan lukien tiedotNOAANASA ja USGS) ilmaiseksi eikä veloita keneltäkään ladata tiedostoja noista ämpäreistä. Jos ämpäri on yksityinen, bucketissa olevat tiedostot ovat vain sallittujen käyttäjien saatavilla ja AWS veloittaa maksun. (Yleensä maksetaan omistajan) tiedostojen lataaminen ei-AWS S3 -tietokoneeseen.ERDDAP™Tietoja voi käyttää julkisissa ja yksityisissä buckeissa.

#### AWS Credentials{#aws-credentials} 
tehdä niin, ettäERDDAP™Voit lukea yksityisten bucketien sisältöä, tarvitset AWS-tunnuksia ja sinun on tallennettava tunnistustiedosto vakiopaikkaan.ERDDAP™Löydät tiedot. Katso AWS SDKJava2.x dokumentointi:[Aseta oletusarvot](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials). (Mahdollisuus säilyttää arvotJavaKomentosarjan parametrit\\[Tom\\]Bin/setenv.sh voi olla hyvä vaihtoehto.) 
#### AWS / tiedostot{#aws-files} 
* tiedostot/järjestelmä - TheERDDAP™ [tiedostot/järjestelmä](#accessibleviafiles)Käyttäjät voivat ladata lähdetiedostoja tietoaineistoon. Suosittelemme, että käännät tämän kaikkien lähdetiedostojen kohdalla, koska monet käyttäjät haluavat ladata alkuperäisen lähdetiedoston.
    * Jos tiedostot ovat yksityisessä S3-taskussa, käyttäjän pyyntö ladata tiedosto käsitelläänERDDAP™joka lukee tiedot tiedostosta ja välittää sen käyttäjälle, mikä lisää tiedoston kuormaa.ERDDAP™Käyttämällä tulevia ja lähteviä kaistanleveyksiä ja tekemällä sinut (TheERDDAP™Hallinnollinen) Maksa egress-maksu AWS:lle.
    * Jos tiedostot ovat julkisessa S3-tiedostossa, käyttäjän pyyntö ladata tiedosto ohjataan AWS S3 -URL-osoitteeseen kyseiseen tiedostoon, joten tiedot eivät virtaa läpi.ERDDAP™Näin kuormituksen vähentäminenERDDAP. Jos tiedostot ovat Amazon Open Data (Ilma ilmaiseksi ilmaiseksi) Julkinen bucket, sitten sinä (TheERDDAP™Hallinnollinen) Sinun ei tarvitse maksaa mitään tietojen egress-maksua AWS. On olemassa suuri etu, joka palvelee julkisia tietoja. (Ei yksityistä) S3 buckets ja valtava etu datan tarjoamiseen Amazon Open Datasta (Ilma ilmaiseksi ilmaiseksi) Buckets.

#### ERDDAP™AWS S3 Buckets{#erddap-and-aws-s3-buckets} 
[ **ERDDAP™AWS S3 Buckets** ](#erddap-and-aws-s3-buckets)  
onneksi paljon vaivan jälkeen,ERDDAP™on useita ominaisuuksia, joiden avulla se pystyy käsittelemään S3: n lohkotason tiedostojen käytön luontaisia ongelmia kohtuullisen tehokkaasti:

*   \\[Disclaimer: AWS S3:n kanssa työskentely on paljon muutakin. AWS on valtava palveluiden ja ominaisuuksien ekosysteemi. Paljon on opittavaa. Se vaatii aikaa ja vaivaa, mutta se on mahdollista. Ole kärsivällinen ja saat asiat toimimaan. Etsi / Pyydä apua
(()[AWS-dokumentointi](https://aws.amazon.com/documentation/gettingstarted/)WEB kuten[Stack Overflow](https://stackoverflow.com/)ja säännöllinen
    [ERDDAP™Tukivaihtoehdot](/docs/intro#support)jos/kun olet jumissa.\\]  
     
* Voi olla vaikea löytää hakemistorakennetta ja tiedostojen nimiä S3-laatikossa.ERDDAP™EDDTableFileNames on erityinen[\\*\\*Lähde: The Fly](#fromonthefly)Vaihtoehto, jonka avulla voit tehdä EDDTableFileNames-tietokannan, jonka avulla käyttäjät voivat selata S3-laastarin sisältöä (Lataa tiedostoja) Tietoaineiston kautta"files"vaihtoehto. On olemassa yksi[Esimerkki tästä alla](#viewing-the-contents-of-a-bucket).
     
*   ERDDAP™Voi lukea dataa[Ulkoisesti pakattu datatiedosto](#externally-compressed-files)On hyvä, jos S3-tiedostot tallennetaan.gz,.gzip,.bz2.Z tai muita ulkoisesti pakattuja tietotiedostoja, jotka voivat dramaattisesti (2 - 20X) leikata tiedostojen säilytyskustannuksia. Ulkoisesti pakattujen tiedostojen käyttämiseen ei usein ole aikaa, koska aika on tallennettu siirtämällä pienempi tiedosto S3:sta S3:een.ERDDAPTasapainottaa ylimääräistä aikaa, jota tarvitaanERDDAP™poistaa tiedoston. Jotta voit käyttää tätä ominaisuutta, sinun on vain varmistettava, että tietoaineisto on&lt;tiedostonameregex&gt; sallii pakatun tiedostotyypin (esim. lisäämällä (|.gz) Regexin loppu) .
     
* Yleisin tapaus, jossa sinulla onERDDAP™asennettu tietokoneellesi testiin/kehitykseen ja missä tietoaineistossa on binääritiedostoja, jotka tallennetaan objekteiksi S3-taskussa, yksi lähestymistapa tietojen keräämiseen.ERDDAP™on:
    1. Luo hakemisto tietokoneellesi, jotta sinulla on muutama testitiedosto.
    2. Lataa kaksi tietotiedostoa lähteestä juuri luomasi hakemistoon.
    3. Käytä[GenerateDatasetsXml](#generatedatasetsxml)Tuottaa Chunk ofdatasets.xmlkahden paikallisen datatiedoston perusteella.
    4. Tarkista, että aineisto toimii halutulla tavalla[Dasds](#dasdds)ja/tai paikallisetERDDAP.
        
         **Seuraavat vaiheet tekevät kopion kyseisestä tietoaineistosta (Tietoja S3:sta) yleisölleERDDAP.** 
        
    5. Kopioi kopiodatasets.xmlaineistoa vartendatasets.xmlyleisölleERDDAP™Se palvelee tietoja.
    6. Luo hakemisto yleisölleERDDAP"Paikallinen kiintolevy pitää kätkön väliaikaisia tiedostoja. Hakemisto ei käytä paljon levytilaa (Katso CacheSizeGB alta) .
    7. muuttaa aineiston arvoa&lt;tiedostoDir&gt;-tunnisteet, jotta se osoittaa juuri luomasi hakemiston (Vaikka hakemisto on tyhjä) .
    8. Lisää A[CacheFrom](#cachefromurl)tunniste, joka määrittää tietoaineiston bucket-nimen ja valinnaisen prefixin (.e., hakemisto) Erityisesti[Aws S3 URL-muodossaERDDAP™Vaatii](#accessing-files-in-an-aws-s3-bucket).
    9. Lisää a [&lt;CacheSizeGB » (#cachefromurl) Tietoaineiston xml (10 on hyvä arvo useimmille aineistoille.) kertomaanERDDAP™rajoittaa paikallisen välimuistin kokoa (Älä yritä välittää kaikkia etätiedostoja) .
    10. Katso, toimiiko se yleisössäERDDAP. Huomaa, että ensimmäinen kertaERDDAP™aineiston lataaminen kestää kauan, koskaERDDAP™Pitää ladata ja lukea kaikki tiedostot.
        
Jos tietokanta on valtava kokoelma suuria verkkotiedostoja, tämä kestää hyvin kauan ja on epäkäytännöllinen. joissakin tapauksissa verkkoon tallennettujen tiedostojen osalta,ERDDAP™voi poistaa tarvittavat tiedot (esim. verkkotietotiedoston tietojen aikapiste) tiedoston nimi ja välttää tämä ongelma. Näytä[Yhteenveto kautta File Names](#aggregation-via-file-names-or-global-metadata).
        
    11. Optionaalisesti (Etenkin EDDTableFromFiles-tietokantaan) Voit lisätä yhden[nthreads](#nthreads)Tag to the dataset to tell Näytä tarkat tiedotERDDAPkäyttää yli 1 lanka, kun vastaat käyttäjän tietopyyntöön. Tämä minimoi viivästyksen vaikutukset, jotka tapahtuvat, kunERDDAP™Lue datatiedostoja (Etäinen) AWS S3 -paketit paikalliseen välimuistiin ja (Ehkä ehkä ehkä ehkä ehkä) masentaa niitä.

#### AWS S3 avoimet tiedot{#aws-s3-open-data} 
osanaNOAA&gt;[Big Data -ohjelma](https://www.noaa.gov/nodd/about),NOAAAWS:llä on kumppanuuksia viiden organisaation, mukaan lukien AWS:n, kanssa tutkiakseen mahdollisia hyötyjä pilvipalvelun keskeisien havaintojen ja mallitulosten tallentamisesta, jotta voidaan laskea suoraan tietoihin ilman lisäjakelua. AWS sisältää tiedot, jotka se saaNOAAosana ohjelmaa, joka tarjoaa yleisön pääsyn suureen kokoelmaan[Avoimia tietoja AWS S3:sta](https://registry.opendata.aws/)mistä tahansa tietokoneesta, olipa kyseessä Amazon-tietokone. (Vuokrattu tietokone) AWS-verkossa tai omassa tietokoneessa missä tahansa verkossa. Alla olevassa esimerkissä oletetaan, että työskentelet julkisesti saatavilla olevan tietoaineiston kanssa.

#### Tiedostot AWS S3 Bucket{#accessing-files-in-an-aws-s3-bucket} 
Yksityiselle S3-tietokoneelle bucketin omistajan on annettava sinulle pääsy buckettiin. (Katso AWS-dokumentaatio.) 

Kaikissa tapauksissa tarvitset AWS-tilin, koska AWS SDKJava  (jonkaERDDAP™käyttää hakemaan tietoa bucketin sisällöstä) Tarvitaan AWS-tilitunnuksia. (Lisää tästä alapuolella) 

ERDDAP™Voit käyttää vain AWS S3 -liitännät, jos määrität [&lt;CacheFromUrl » (#cachefromurl) (tai&lt;Tietyssä muodossa:
 https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*   
missä missä

* BucketName on bucket-nimen lyhyt muoto, esim. noaa-goes17.
* Aws-alue, esim. me-east-1, on peräisin "alue" sarakkeesta yhdessä pöydässä.[AWS-palvelun päätepisteet](https://docs.aws.amazon.com/general/latest/gr/rande.html)missä bucket sijaitsee.
* Prefix on valinnainen. Jos on läsnä, sen on loputtava'/'.

Esimerkiksi, https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
Tämä URL-osoite on yksi AWS S3 -suosituksista:[Pääsy Bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html)ja[Tämä kuvaus prefixeistä](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html).ERDDAP™edellyttää, että yhdistät bucket-URL-osoitteen ja valinnaisen etuliitteen yhteen URL-osoitteeseen määrittääksesi&lt;CacheFromUrl (tai&lt;tiedoston &gt;), jossa tiedostot sijaitsevat.

#### Testaa AWS S3 Buckets{#test-public-aws-s3-buckets} 
Julkisissa bucketsissa voit ja kannattaa testata AWS S3 -hakemiston URL-osoitetta selaimessasi, esim.
[ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)Jos URL-osoite on oikea ja sopivaERDDAPpalauttaa XML-dokumentin, jolla on (Osittainen) Luettelo tuon bucketin sisällöstä. Täysi URL (URL-osoite ja prefix) ettäERDDAP™Tietyn aineiston käyttö ei toimi selaimessa. AWS ei tarjoa järjestelmää, joka selaa hierarkiaa helposti selaimessasi. (Jos se on väärin, pyydämme sähköpostia. Johannes osoitteessa Noaa.gov. Muussa tapauksessa, Amazon, ole hyvä ja lisää tukea tähän&#33;) 

#### Katso Bucketin sisältö{#viewing-the-contents-of-a-bucket} 
S3 taajuus sisältää usein pari tiedostokategoriaa, muutamassa pseudo-aliohjauksessa, joista voi tulla pari.ERDDAP™Dataa. tehdäkseenERDDAP™Tiedot, sinun täytyy tietää aloitushakemisto&lt;CacheFromUrl (tai&lt;tiedostoDir&gt;) ja tiedostonimien muoto, jotka tunnistavat kyseisen tiedostojen alaryhmän. Jos yrität katsoa koko bucket-sisällön selaimessa, S3 näyttää vain ensimmäiset 1000 tiedostoa, jotka eivät riitä. Tällä hetkellä paras tapa tarkastella kaikkea bucketin sisältöä on tehdä[EdDTableFromFileNames](#eddtablefromfilenames)Data (PC:lläsiERDDAP™ja/tai julkisestiERDDAP) , joka myös antaa sinulle helpon tavan selata hakemistorakennetta ja ladata tiedostoja. The&lt;tiedostoDir&gt;, sillä se on URL, jonka olet tehnyt yllä, esim. https://noaa-goes17.s3.us-east-1.amazonaws.com .\\[Miksi AWS S3 ei tarjoa nopeaa ja helppoa tapaa tehdä tätä ilman AWS-tiliä?\\]Huomautus: Kun teen tämän tietokoneellani ei-Amazon-verkossa, näyttää siltä, että Amazon hidastaa vastausta yritykseen. (noin 100 (??) tiedostoja per chunk) Muutaman ensimmäisen kierroksen jälkeen (1000 tiedostoa per chunk) on ladattu. Koska buckets voi olla valtava määrä tiedostoja (Noaa-Goes17 on 26 miljoonaa) , saada kaikki sisältö bucket voi kestää EDDTableFileNames useita tunteja (Esim. 12&#33;) loppuun.\\[Amazon, eikö niin?\\]

#### Tehdä EDDTable FileNames-tietokanta, jossa on AWS S3 Bucket{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
Jos sinulla on bucket-nimi, mutta sinulla ei ole jo luetteloa tiedostoista S3-taskussa tai etuliite, joka tunnistaa tiedostojen sijainnin bucketissa, käytä alla olevia ohjeita tehdäksesi EDDTableFileNames-tietoaineiston, jotta voit selata S3-laastarin hakemistohierarkiaa.ERDDAP&gt;"files"järjestelmä.

1. Avaa AWS-tili
    ERDDAP™käyttää[AWS SDKJava](https://docs.aws.amazon.com/sdk-for-java/index.html)Saadaksesi lisätietoja AWS:stä, joten sinun täytyy[Luo ja aktivoi AWS-tili](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/). Se on aika iso työ, jossa on paljon opittavaa.
     
2. Laita AWS Credentials missäERDDAP™Löydä ne.
Seuraa ohjeita[AWS Credentials and Region for Development Näytä tarkat tiedot](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials)niinERDDAP™  (AWS SDK:lleJava) Löydät ja käytät AWS-tunnuksiasi. JosERDDAP™Et löydä salaisuuksia, näet
Java.lang. Laiton väite: profiilitiedosto ei voi olla nollavirheERDDAPlog.txt-tiedosto.
    
Linuxin ja Mac OS:n vihje: Tomcatia käyttävän käyttäjän kotihakemistossa (jaERDDAP)   (Käyttäjä = Tomcat) tiedostossa nimeltä ~/.aws/credentials. Älä oleta, että ~ on/home/tomcat – itse asiassa käytä cd:tä selvittääksesi, missä käyttöjärjestelmä ajattelee - käyttäjälle = Tomcat on. Luo hakemisto, jos sitä ei ole olemassa. Lisäksi, kun olet laittanut valtakirjatiedoston käyttöön, varmista, että tiedoston käyttäjä ja ryhmä ovat tomcat ja käytä chmod 400 -tunnustusta varmistaaksesi, että tiedosto on luettu vain käyttäjälle.
    
3. Luo bucket URL[muotoilua,ERDDAP™Vaatii](#accessing-files-in-an-aws-s3-bucket)esim.
    [ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)ja (Julkinen buckets) testaa selaimessa varmistaakseen, että se palauttaa XML-dokumentin, jolla on osittainen luettelo kyseisen taakan sisällöstä.
     
4. Käytä[GenerateDatasetsXml](#generatedatasetsxml)luodaan[EdDTableFromFileNames](#eddtablefromfilenames)Tietoja:
    * Käytä tätä syntaksia:
        \\*\\*\\ \\ *Lähde:* Your BucketUrl**
esimerkiksi
        \\*\\*&gt; &gt; &gt; &gt; &gt; https://noaa-goes17.s3.us-east-1.amazonaws.com/
 
    * Tiedoston nimi Regex? ****
    * toistuvasti? Todellista
    * Reload Kaikki minuutit? 10080
    *   infoUrl?? https://registry.opendata.aws/noaa-goes/
 
    * instituutio?NOAA
    * Yhteenveto? Ei mitään ei (ERDDAP™luodaan tiivistelmä automaattisesti.) 
    * Titteli? Ei mitään ei (ERDDAP™Se luo automaattisesti hyvän otsikon.) Kuten tavallista, sinun tulisi muokata tuloksena olevaa XML-osoitetta korjataksesi korrektiuden ja tehdä parannuksia ennen kuin tietoaineistot on kiinnitetty siihen.datasets.xml.
5. Jos noudatat yllä olevia ohjeita ja lataat tiedotERDDAPOlet luonut EDDTableFromFiles-aineiston. Esimerkkinä ja helpottaaksemme sitä, että kuka tahansa voi selata ja ladata tiedostoja AWS Open Data bucketsista, olemme luoneet EDDTableFromFileNames -tietokannan (katso luettelosta.
    [ https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_ ](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_)Lähes kaikkiin[AWS S3 Open Data Buckets Näytä tarkat tiedot](https://registry.opendata.aws/).
    \\[Muutama ämpäri, jota emme sisältäneet, sisältää runsaasti tiedostoja juurihakemistoon. (enemmän kuin voidaan ladata kohtuullisessa ajassa) tai ei salli julkista pääsyä (Eikö kaikkien pitäisi olla julkisia?) tai ovat pyynnön vastaanottajia (Esimerkki: Sentinel) .\\]  
Jos klikkaat"files"linkki johonkin näistä tietoaineistoista, voit selata hakemistopuuta ja tiedostoja kyseisessä S3-laastarissa. Tien vuoksi\\*\\*TheFly EDDTableFromFiles toimii, nämä hakemistot ovat aina ajan tasalla, koskaERDDAP™Ota ne lennolle. Jos napsautat hakemistopuuta oikeaan tiedostonimeen ja klikkaat tiedoston nimeä,ERDDAP™Ohjaa pyyntösi uudelleen AWS S3:een, jotta voit ladata tiedoston suoraan AWS:ltä. Tämän jälkeen voit tarkastaa tiedoston.
    
Ongelmia?
Jos EDDTableFromFiles ei kuormitaERDDAP™  (Dasds) Katso log.txt-tiedosto virheilmoitukseen. Jos näet yhden
Java.lang. Laiton väite: profiilitiedosto ei voi olla nollavirhe, ongelma on, että AWS SDKJava  (käyttänytERDDAP) Ei löydy tiedostoa. Katso yllä olevat ohjeet.
     

On valitettavaa, että AWS ei salli ihmisten käyttää selainta nähdäkseen julkisen taakan sisällön.

 **Sitten voit tehdäERDDAP™tietoaineistot, jotka antavat käyttäjille pääsyn tiedostoihin.**   
Katso ohjeet[ERDDAP™S3 Buckets](#erddap-and-aws-s3-buckets)  (yläpuolella) .
Näytteen EDDTableFromFileNames-tietoaineistosta, jonka olet tehnyt edellä, jos teet hieman hakemiston ja tiedoston nimien kanssa hakemistossa, on selvää, että ylätason hakemistojen nimet (ABI-L1b-RadC) vastaa mitäERDDAP™Kutsutaan erillisiä aineistoja. Se, jonka kanssa työskentelet, voi olla samanlainen. Voit luoda erillisiä tietoaineistojaERDDAP™jokaisesta näistä tietoaineistoista, esimerkiksi
 https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
kuin&lt;CacheFromUrl. Valitettavasti tässä esimerkissä bucketin tietoaineistot näyttävät olevan tasoa 1 tai tasoa 2.ERDDAP™ [ei ole erityisen hyvä](#dimensions)aineisto on monimutkaisempi muuttujien kokoelma, joka käyttää erilaisia ulottuvuuksia.
     
    
### NCML-tiedostot{#ncml-files} 
NcML-tiedostojen avulla voit määrittää lennolla tapahtuvat muutokset yhteen tai useampaan alkuperäiseen lähteeseen.NetCDF  (V3 tai v4)  .nc.grib, .bufr tai.hdf  (V4 tai v5) tiedostoja ja sitten onERDDAP™kohtelee.ncml tiedostoja kuin lähdetiedostoja.ERDDAP™Data hyväksyy.ncml-tiedostoja aina.nctiedostoja odotetaan. NCML-tiedostot on laajennettava.ncMl. Nähdään[UnidataNCML-dokumentaatio](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html). NCML on hyödyllinen, koska voit tehdä jotain sen kanssa. (muun muassa tekemällä erilaisia muutoksia kokoelman eri tiedostoihin, mukaan lukien tiedoston ulottuvuuden lisääminen tietyllä arvolla.) että et voi tehdäERDDAP&gt;datasets.xml.

* Muutoksia yhdelle.ncml-tiedoston viimeinenModified-aika aiheuttaa tiedoston lataamisen aina, kun tietoaineisto ladataan uudelleen, mutta muutokset taustalla olevaan.ncDatatiedostoja ei havaita suoraan.
* Lähde: NCML\\*erittäin\\*jotka ovat herkkiä joidenkin NCML-tiedostojen tilaukselle. Ajattele NCML:ää määrittämällä ohjeet määritetyssä järjestyksessä tarkoituksena muuttaa lähdetiedostoja. (NCML-tiedoston alussa/top) Kohteen tiedostot (NCML-tiedoston lopussa / alaosassa) .

Vaihtoehtona NCML on[NetCDFOperaattorit (NCO) ](#netcdf-operators-nco). Suurin ero on se, että NCML on järjestelmä, joka tekee muutoksia lennossa. (lähdetiedostoja ei muuteta) , kunNCOvoidaan käyttää tekemään muutoksia (Uudet versiot) tiedostoja. Molemmat molemmatNCONcML on erittäin, erittäin joustava ja voit tehdä lähes mitä tahansa muutoksia voit ajatella tiedostoja. Molemmille voi olla haastavaa selvittää, miten tehdä mitä haluat tehdä - tarkistaa verkossa vastaavia esimerkkejä. Molemmat ovat hyödyllisiä työkaluja verkko- jaHDFtiedostoja käytettäväksiERDDAPtehdä muutoksia, jotka ylittävätERDDAPManipulointijärjestelmä voi toimia.

Esimerkki #1: Ajan ulottuvuuden lisääminen yhdellä arvolla
Tässä on yksi.ncml-tiedosto, joka luo uuden ulkomitan (Aika, jossa on 1 arvo: 1041379200) ja lisää tuon ulottuvuuden pic-muuttujaan tiedostossa nimeltä A2003001.L3m DAYPIC \\ 4km.nc:
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
Esimerkki #2: Ajan arvon muuttaminen
Joskus lähde.nctiedostolla on jo aika- ja aika-arvo, mutta arvo on väärä. (tarkoituksiinsa) . Tämä tämä.ncml-tiedosto sanoo: tiedostolle, jonka nimi on 19810825230030-NCEI, ulottuvuusmuuttujan osalta"time", asettaa yksiköiden ominaisuuden "sekunneiksi vuodesta 1970-01T00:00:00Z" ja asettaa aika-arvon 367588800.
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
### NetCDFOperaattorit (NCO)  {#netcdf-operators-nco} 
NetCDF-operaattorit (NCO) Sisältää kymmeniä erillisiä, komentorivi-ohjelmia, jotka ottavat netCDF: n\\[V3 tai v4\\],HDF \\[V4 tai v5\\],\\[.grib, .bufr\\]ja/taiDAPtiedostot syötteenä, sitten toimivat (esimerkiksi uusi data, laskentatilastot, tulostus, hyperslab, manipuloida metatietoja) ja tulostavat tulokset seulottavaksi tai tiedostoiksi teksti-, binaari- tai netCDF-muodossa.NCOAuttaa analysoimaan verkottuneita tieteellisiä tietoja. Kuoren komentajan tyyliNCOKäyttäjät voivat manipuloida ja analysoida tiedostoja vuorovaikutteisesti tai ilmaisulla skripteillä, jotka välttävät korkeamman tason ohjelmointiympäristöjä. (From the[NCO](https://nco.sourceforge.net/)Kotisivut) .

vaihtoehtoNCOon[NCML](#ncml-files). Suurin ero on se, että NCML on järjestelmä, joka tekee muutoksia lennossa. (lähdetiedostoja ei muuteta) , kunNCOvoidaan käyttää tekemään muutoksia (Uudet versiot) tiedostoja. Molemmat molemmatNCONcML on erittäin, erittäin joustava ja voit tehdä lähes mitä tahansa muutoksia voit ajatella tiedostoja. Molemmille voi olla haastavaa selvittää, miten tehdä mitä haluat tehdä - tarkistaa verkossa vastaavia esimerkkejä. Molemmat ovat hyödyllisiä työkaluja verkko- jaHDFtiedostoja käytettäväksiERDDAPtehdä muutoksia, jotka ylittävätERDDAPManipulointijärjestelmä voi toimia.

Voit esimerkiksi käyttääNCOtehdä aikamuuttujan yksiköistä yhdenmukaisia tiedostoryhmässä, jossa ne eivät olleet alun perin johdonmukaisia. Tai voit käyttääNCOsoveltaascale\\_factorjaadd\\_offsetryhmä tiedostoja, joissascale\\_factorjaadd\\_offsetEri lähdetiedostoissa on erilaisia arvoja.
 (Nyt voit käsitellä näitä ongelmiaERDDAP™kautta[EDDGridLähde: NCFiles Unpacked](#eddgridfromncfilesunpacked)mikä on varianttiEDDGridFromNcFiles, joka poistaa pakatut tiedot ja standardisoi aika-arvot alhaisella tasolla, jotta voidaan käsitellä erilaisia keräystiedostoja.scale\\_factorS jaadd\\_offsettai eri aikayksikköjä.) 

NCOon ilmainen ja avoin lähdekoodi, joka käyttää[GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html)lisenssi.

Esimerkki #1: Johdonmukaisuus
EDDGridFiles ja EDDTable Tiedostojen mukaan tietyn muuttujan yksiköt ovat identtisiä kaikissa tiedostoissa. Jos osa tiedostoista on triviaalisti (Ei toiminnallisesti) erilainen kuin muut (esim. aikayksikkö)
Sekunnit vuodesta 1970-01-01 00:00 UTC
"seconds since 1970-01-01T00:00:00Z"Voit käyttääNCO&gt;[Kiinnitetty](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor)muuttaa tiedostojen yksikköjä identtisesti kaikkien tiedostojen kanssa
nco/ncatted - a units,time,o,c,'seconds since 1970-01-01T00:00:00:00Z'.nc  
\\[Monissa tällaisissa ongelmissa EDDTableFrom... Tiedostot, voit nyt käyttää[Standardisointi Mitä](#standardizewhat)kertomaanERDDAPstandardisoida lähdetiedostoja, kun ne luetaanERDDAP.\\]
    
### Rajoitukset tietoaineiston koolle{#limits-to-the-size-of-a-dataset} 
Näet paljon viittauksia "2 miljardiin" alla. Tarkemmin sanottuna viittaus 2 147 483 647 (31-1) 32-bittisen allekirjoitetun kokonaisluvun enimmäisarvo. Joillakin tietokonekielillä, esimerkiksiJava  (jonkaERDDAP™on kirjoitettu) Tämä on suurin tietotyyppi, jota voidaan käyttää moniin tietorakenteisiin. (Esimerkiksi sarjan koko) .

String-arvot (Esimerkiksi muuttuvien nimien, attribuuttien nimien, Stringin attribuuttiarvojen ja Stringin tietoarvojen osalta) Enimmäismäärä merkkejä per StringERDDAP™on noin 2 miljardia. Melkein kaikissa tapauksissa on pieniä tai suuria ongelmia, jos lakko ylittää kohtuullisen koon. (80 merkkiä muuttuvien nimien ja attribuuttien nimien osalta ja 255 merkkiä useimmille Stringin attribuuttiarvoille) . Esimerkiksi sivut, jotka näyttävät pitkiä muuttuvia nimiä, ovat hämmentävän laajat ja pitkät muuttuvat nimet, jos ne ylittävät vastetiedostotyypin rajan.

Verkossa olevat tiedot:

* Suurin määräaxisVariableS on noin 2 miljardia.
Suurin määrädataVariableS on noin 2 miljardia.
Mutta jos tietoaineistossa on &gt; 100 muuttujaa, se on hankala käyttää.
Jos tietoaineistossa on &gt; 1 miljoonaa muuttujaa, palvelimesi tarvitsee paljon fyysistä muistia ja muita ongelmia.
* Kunkin ulottuvuuden maksimikoko (axisVariable) 2 miljardia arvoa.
* Enimmäismäärä soluja (kaikenkokoisten tuotteiden) Se on rajatonta, mutta se voi olla 9e18.

Tabulaariset tiedot:

* Suurin määrädataVariableS on noin 2 miljardia.
Mutta jos tietoaineistossa on &gt; 100 muuttujaa, se on hankala käyttää.
Jos tietoaineistossa on &gt; 1 miljoonaa muuttujaa, palvelimesi tarvitsee paljon fyysistä muistia ja muita ongelmia.
* Lähteiden enimmäismäärä (Esimerkiksi tiedostoja) Voidaan yhdistää noin 2 miljardiin.
* Joissakin tapauksissa rivien enimmäismäärä yksittäisestä lähteestä (Esimerkiksi tiedosto, mutta ei tietokanta) 2 miljardia riviä.
* En usko, että on muita rajoja.

Sekä verkko- että tabulaaritietoaineistoissa on joitakin sisäisiä rajoja, joita käyttäjä voi pyytää yhdellä pyynnöllä. (&gt; 2 miljardia tai 9e18 jotain) On paljon todennäköisempää, että käyttäjä osuu tiedostotyypin erityisrajoituksiin.

*   NetCDFversio 3.ncTiedostot rajoittuvat 2GB-tavuihin. (Jos tämä on ongelma jollekulle, kerro: Voisin lisätä tukeaNetCDFversio 3.nc64-bittinen laajennus taiNetCDF4, joka lisää rajaa merkittävästi, mutta ei äärettömästi.) 
* Selaimet kaatuvat vain ~500 Mt dataa, jotenERDDAP™rajoittaa vastausta.htmlTablePyynnöt ~400 Mt tietoja.
* Monilla analyysiohjelmilla on samanlaiset rajat. (Esimerkiksi ulottuvuuden maksimikoko on usein ~2 miljardia arvoa.) Joten ei ole mitään syytä työskennellä kovasti kiertää tiedostotyypin erityisrajoituksia.
* Tiedostotyypin erityisrajoitukset ovat hyödyllisiä siinä, että ne estävät naiivit pyynnöt todella suuria määriä tietoja. ("Anna minulle kaikki nämä tiedot", kun aineistossa on 20TB dataa.) Se kestää viikkoja tai kuukausia ladata. Mitä pidempi lataus, sitä todennäköisemmin se epäonnistuu eri syistä.
* Tiedostotyypin erityisrajoitukset ovat hyödyllisiä, koska ne pakottavat käyttäjän käsittelemään kohtuullisen kokoisia alijoukkoja. (Esimerkiksi suuri verkkotietoaineisto käsittelee tiedostoja, joissa on tietoja yhdestä ajankohdasta) .
         
### Vaihda ACDD-1.3{#switch-to-acdd-13} 
Me olemme (erityisesti[GenerateDatasetsXml](#generatedatasetsxml)) Nyt suositellaan[ACDD versio 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Ratifioitiin vuoden 2015 alussa ja sitä kutsutaan nimellä ACD-1.3. Ennen kuinERDDAP™versio 1.62 (julkaistu kesäkuussa 2015) ,ERDDAP™Käytetty/suositeltu versio 1.0[NetCDFTietoaineiston löytämisen yleissopimus](https://wiki.esipfed.org/ArchivalCopyOfVersion1)jota kutsuttiin "UnidataDataset Discovery v1.0 on maailmanlaajuinen yleissopimus jaMetadata\\_Conventionsattribuutit.

Jos tietoaineistosi käyttävät ACDD:n aiempia versioita, siirrymme ACD-1.3:een. Ei ole vaikeaa. ACD-1.3 on täysin taaksepäin yhteensopiva versio 1.0:n kanssa. Vaihda kaikki tietoaineistot (paitsiEDDGridFromErddap ja EDDTable Lähde: Erddap Datasets) :

1. Poista hiljattain heikentynyt maailmaMetadata\\_ConventionsAttribuutti lisäämällä (muuttamalla olemassa olevaaMetadata\\_Conventionsattribuutti)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
Tietoaineiston globaaliin&lt;addAttributes&gt;
     
2. Jos aineistolla on yleissopimus, joka liittyy maailmanlaajuisesti&lt;addAttributes"Muuta kaikki"UnidataDataset Discovery v1.0 viittaa ACD-1.3:een.
Jos aineistolla ei ole yleissopimusta, joka liittyy maailmanlaajuiseen&lt;addAttributesLisää sitten ACD-1.3. Esimerkiksi,
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. Jos aineistolla on globaalistandard\\_name\\_vocabularyOle hyvä ja muuta arvon muotoa esimerkiksi
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
Jos viittaus on vanhempaan versioon[CF-standardin nimi](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). On hyvä vaihtaa nykyiseen versioon. (65, kun kirjoitamme tämän) Koska tuohon taulukkoon lisätään uusia vakionimiä myöhemmillä versioilla, vanhat standardit poistetaan harvoin.
     
4. Vaikka ACD-1.0 sisältää maailmanlaajuisia ominaisuuksiacreator\\_name,creator\\_email,creator\\_url,[GenerateDatasetsXml](#generatedatasetsxml)ei automaattisesti lisännyt niitä ennen kuin joskusERDDAP™V1.50. Tämä on tärkeää tietoa:
        
    *   creator\\_nameKäyttäjät tietävät/viittailevat tietoaineiston luojaa.
    *   creator\\_emaililmoittaa käyttäjille ensisijaisen sähköpostiosoitteen, jossa he voivat ottaa yhteyttä tietoaineiston luojaan, esimerkiksi jos heillä on kysyttävää tietoaineistosta.
    *   creator\\_urlantaa käyttäjille mahdollisuuden saada lisätietoja luojasta.
    *   ERDDAP™käyttää kaikkia näitä tietoja FGDC- ja ISO 19115-2/19139 -metadatatiedostojen tuottamisessa. Näitä asiakirjoja käytetään usein ulkoisissa hakupalveluissa.
    
Lisää nämä ominaisuudet aineiston maailmanlaajuiseen&lt;addAttributes&gt;
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
Se on se. Toivottavasti se ei ollut liian vaikeaa.
     
### Zarr{#zarr} 
versio 2.25ERDDAP™Paikallista luettavaa Zarr-tiedostoja käyttäen[EDDTableFromNcFiles](#eddtablefromncfiles)ja[EDDGridLähde: NCFiles](#eddgridfromncfiles).

 (Elokuussa 2019) Voimme olla väärässä, mutta emme ole vielä vakuuttuneita siitä, että[Zarr](https://github.com/zarr-developers/zarr-python)tai vastaavat järjestelmät, jotka rikkovat datatiedostoja pienemmiksi ketjuiksi, ovat hyviä ratkaisuja ongelmaan.ERDDAP™tietoja tallennetaan pilvipalveluihin, kuten Amazon AWS S3. Zarr on erinomainen teknologia, joka on osoittanut sen hyödyllisyyttä eri tilanteissa, emme ole varmoja, ettäERDDAP+3 on yksi niistä. Ennen kuin kiirehdimme tallentamaan kaikki tietomme Zarriin, teemme joitakin testejä nähdäksemme, onko se todella parempi ratkaisu.

Ongelmat tietojen saamisessa pilvessä ovat latenssi (Ensin saadaan dataa) tiedostotason käyttöoikeus (blokkitasoisen pääsyn sijaan) . Zarr ratkaisee tiedostotason käyttöongelman, mutta ei tee mitään viiveestä. Verrattuna tiedoston lataamiseen (Näin se voidaan lukea paikallisena tiedostona, jossa on block-tason käyttöoikeus.) , Zarr voi jopa pahentaa latenssiongelmaa, koska Zarrin kanssa tiedoston lukemiseen liittyy nyt useita puheluita, joiden avulla voit lukea tiedoston eri osia. (Jokaisella on oma viive) . Viiveongelma voidaan ratkaista pyyntöjen rinnastuksella, mutta se on korkeamman tason ratkaisu, joka ei ole riippuvainen Zarrista.

ja Zarr (Suhteellisten tietokantojen kanssa) Menetämme mukavuuden saada tietotiedosto on yksinkertainen, yksittäinen tiedosto, jonka voit helposti tarkistaa rehellisyys, tai tehdä / ladata kopion.

ERDDAP™  (V2) Järjestelmä ylläpitää paikallista tiedostojen välimuistia URL-lähteestä (Esimerkkinä S3) (katso)&lt;CacheFromUrl &gt; ja&lt;CacheMaxGB (#cachefromurl) ). Uusi [&lt;nthreads » (#nthreads) Vähennä viiveongelmaa rinnastamalla tietojen hakua korkealla tasolla.&lt;CacheFromUrl näyttää toimivan hyvin monissa skenaarioissa. (Emme ole varmoja siitä, miten hyödyllistä&lt;nThreads on ilman lisätutkimuksia.) Myönnämme, että emme ole tehneet ajoitustestejä AWS-tapauksessa, jossa on hyvä verkkoyhteys, mutta olemme onnistuneesti testanneet erilaisia URL-tiedostoja. JaERDDAP&gt;&lt;CacheFromUrl &gt; toimii minkä tahansa tiedoston kanssa (esim..nc,.hdf.csv,.jsonlCSV) vaikka ulkoisesti pakattu (esim..gz) ilman muutoksia tiedostoihin (Niiden uudelleenkirjoittaminen Zarrin kokoelmiin) .

On todennäköistä, että erilaiset skenaariot suosivat erilaisia ratkaisuja, esimerkiksi vain osan tiedostosta täytyy lukea. (Zarr voittaa) , vs. täytyy lukea kaikki tiedostot kerran, vs. täytyy lukea osa tai koko tiedosto toistuvasti.&lt;CacheFromUrl voittaa.

Ennen kuin kiirehdimme tallentamaan kaikki tietomme Zarriin, teemme joitakin testejä nähdäksemme, onko se todella parempi ratkaisu.

- -
## Luettelo tyypin tietoaineistoista{#list-of-types-datasets} 
Jos tarvitset apua oikean tiedostotyypin valitsemiseen, katso[Datasetin tyypin valinta](#choosing-the-dataset-type).

Tietokannan tyypit kuuluvat kahteen luokkaan. ([Miksi?](#why-just-two-basic-data-structures)) 

### EDDGrid {#eddgrid} 
*   [ **EDDGrid** ](#eddgrid)Tiedot käsittelevät verkottuneita tietoja.
    * SisälläEDDGridTietoaineistot, tietomuuttujat ovat moniulotteisia tietomääriä.
    * Jokaiselle ulottuvuudelle on oltava akselimuuttuja. Akselimuuttujat on määriteltävä siinä järjestyksessä, että tietomuuttujat käyttävät niitä.
    * SisälläEDDGridaineistot, kaikki tietomuuttujat on käytettävä (Osakkeet) kaikki akselimuuttujat.
         ([Miksi?](#why-just-two-basic-data-structures) [Entä jos he eivät?](#dimensions)) 
    * Dimension arvot - KaikessaEDDGridTiedot, jokainen ulottuvuus on järjestettävä (nouseminen tai laskeutuminen) . Jokainen voi olla epäsäännöllinen. Ei voi olla siteitä. Tämä on vaatimus[CF:n metatiedot](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Jos minkään ulottuvuuden arvot eivät ole lajitellussa järjestyksessä, aineistoa ei ladata jaERDDAP™tunnistaa lokitiedoston ensimmäisen arvon, *isovanhemmat* /logs/log.txt.
        
Joillakin aloilla on lisärajoituksia (esim.EDDGridAggregateExistingDimension edellyttää, että ulompi (vasemmalla) ulottuvuus nousee.
        
Rajoittamattomat ulottuvuudet osoittavat lähes aina ongelman lähdeaineiston kanssa. Tämä tapahtuu yleisimmin, kun väärin nimetty tai sopimaton tiedosto sisältyy aggregaatioon, joka johtaa häiriöttömään ajan ulottuvuuteen. Tämän ongelman ratkaisemiseksi katso virheilmoitusERDDAP™Lo.txt-tiedosto, joka etsii loukkaavan ajan arvoa. Katso lähdetiedostoja löytää vastaava tiedosto (Yksi ennen tai yksi jälkeen) Se ei kuulu aggregaatioon.
        
    * Katso täydellisempi kuvaus[EDDGridDatamalli](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel).
    * TheEDDGridDatan tyypit ovat:
        *   [EDDGridAudiofiilejä](#eddfromaudiofiles)kerää tietoja paikallisista äänitiedostoista.
        *   [EDDGridLähde:Dap](#eddgridfromdap)Verkossa olevat tiedotDAPpalvelimia.
        *   [EDDGridEDDTable](#eddgridfromeddtable)Voit muuntaa tabulaarin tietoaineiston verkkoon.
        *   [EDDGridLähde: Eddap](#eddfromerddap)käsittelee verkottuneita tietoja kauko-ohjaimestaERDDAP.
        *   [EDDGridLähde: Etopo](#eddgridfrometopo)käsittelee sisäänrakennetun ETOPO-topografian tietoja.
        *   [EDDGridFilejä](#eddgridfromfiles)Se on kaikkien superluokkaEDDGrid...Files-luokat.
        *   [EDDGridLähde: MergeIRFiles](#eddgridfrommergeirfiles)Aggregoida tietoja paikallisesta MergeIR-ryhmästä.gztiedostoja.
        *   [EDDGridLähde: NCFiles](#eddgridfromncfiles)Yhteystiedot paikallisesta ryhmästäNetCDF  (V3 tai v4)  .ncliittyviä tiedostoja.
        *   [EDDGridLähde: NCFiles Unpacked](#eddgridfromncfilesunpacked)on variantti, josEDDGridFromNcFiles kerää tietoja myös paikallisesta ryhmästäNetCDF  (V3 tai v4)  .nctiedostot, jotkaERDDAP™Pakkaukset matalalla tasolla.
        *   [EDDGridLonPM180](#eddgridlonpm180)muuttaa lapsen pituusarvojaEDDGridNe ovat vaihteessa 180-180.
        *   [EDDGridLon0360](#eddgridlon0360)muuttaa lapsen pituusarvojaEDDGridNe ovat vaihteessa 0-360.
        *   [EDDGridSideBySide](#eddgridsidebyside)Yhteenveto kahdesta tai useammastaEDDGridaineistot sivuttain.
        *   [EDDGridAggregateExistingDimensio](#eddgridaggregateexistingdimension)Yhteenveto kahdesta tai useammastaEDDGridaineistot, joista jokaisella on erilainen arvoalue ensimmäisessä ulottuvuudessa, mutta samat arvot muissa ulottuvuuksissa.
        *   [EDDGridKopio](#eddgridcopy)Voit tehdä paikallisen kopion toisestaEDDGrid"tietoa ja palvelee tietoja paikallisesta kopiosta.
             
    * Kaikki Kaikki Kaikki KaikkiEDDGridTiedot tukevat nThreads-asetusta, joka kertooERDDAP™kuinka monta lankaa käytetään, kun vastaat pyyntöön. Nähdään[nthreads](#nthreads)dokumentointi yksityiskohtiin.
         
### EdDTable{#eddtable} 
*   [ **EdDTable** ](#eddtable)Tiedot käsittelevät tabulaaritietoja.
    * Tabulaarisia tietoja voidaan esittää tietokannan kaltaisena taulukona riveillä ja sarakkeilla. Jokainen kolumni (Muuttuva data) Sillä on nimi, joukko ominaisuuksia ja tallentaa vain yhden tyyppisiä tietoja. Jokaisella rivillä on havainto (tai niihin liittyvien arvojen ryhmä) . Tietolähteellä voi olla tietoja eri tietorakenteessa, monimutkaisemmassa tietorakenteessa ja/tai useissa tietotiedostoissa, muttaERDDAP™Lähteen tiedot on pystyttävä lyhentämään tietokantamaiseen taulukkoon, jotta tiedot voidaan esittää tabulaarisena tietoaineistona käyttäjille.ERDDAP.
    * Katso täydellisempi kuvaus[EDDTable Data -malli](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel).
    * EDDTable-tiedostotyypit ovat:
        *   [EDDTableFromAllDatasets](#eddtablefromalldatasets)on korkeamman tason tietoaineisto, jolla on tietoa kaikista muista tietoaineistoista.ERDDAP.
        *   [EDDTableFromAsciiFiles](#eddtablefromasciifiles)aggregaa dataa komma-, tab-, semicolon- tai avaruuserotetuista ASCII-datatiedostoista.
        *   [EDDTableFromAscii-palvelu](#eddtablefromasciiservice)Se on kaikkien EDDTableFromAsciiService -luokkien superluokka.
        *   [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos)käsittelee tietoja joistakinNOAANOS-verkkopalvelut.
        *   [EDDTableFromAudiofiilit](#eddfromaudiofiles)kerää tietoja paikallisista äänitiedostoista.
        *   [EDDTableFrom Awsxmlfiilit](#eddtablefromawsxmlfiles)Tietoja automaattisesta sääasemasta (AWS) XML-tiedostoja.
        *   [EDDTableFromCassandra](#eddtablefromcassandra)käsittelee tabulaaritietoja yhdestä Cassandra-pöydästä.
        *   [EDDTableFromColumnarAsciiFiles](#eddtablefromcolumnarasciifiles)ASCII-datatiedostojen keräämät tiedot kiinteän leveän datan sarakkeilla.
        *   [EdDTableFromDapsequence Näytä tarkat tiedot](#eddtablefromdapsequence)käsittelee tabulaarista dataaDAPSekvenssipalvelimet.
        *   [EDDTableFromDatabase](#eddtablefromdatabase)käsittelee tabulaaritietoja yhdestä tietokantataulukosta.
        *   [EDDTableFromEDDGrid](#eddtablefromeddgrid)Voit luoda EDDTable-tietoaineiston yhdestäEDDGridDataa.
        *   [EdDTableFromDap](#eddfromerddap)käsittelee tabulaarisia tietoja kauko-osastaERDDAP.
        *   [EdDTableFromFileNames](#eddtablefromfilenames)luo tietoaineiston palvelimen tiedostojärjestelmään kuuluvasta tiedostoryhmästä, mutta se ei palvele tietoja tiedostojen sisältä.
        *   [EDDTableFromfiilit](#eddtablefromfiles)Se on kaikkien EDDTableFrom...Files-luokkien superluokka.
        *   [EdDTableFromHttpGet](#eddtablefromhttpget)onERDDAPainoastaan tietojen tuonnin ja tietojen viennin järjestelmä.
        *   [EDDTableFromHyraxTiedostot](#eddtablefromhyraxfiles)  (Vähennetty) koostaa tiedostoja, joissa on useita muuttujia, joiden jaetut ulottuvuudet[Hyrax OPeNDAPPalvelin](https://www.opendap.org/software/hyrax-data-server).
        *   [EDDTableFromInvalidCRAFiles](#eddtablefrominvalidcrafiles)Aggregoituja tietojaNetCDF  (V3 tai v4)  .nctiedostot, jotka käyttävät CF DSG Contiguous Ragged Array -versiota (CRA) tiedostoja. Vaikka vaikkaERDDAP™tukee tätä tiedostotyyppiä, se on mitätön tiedostotyyppi, jota kenenkään ei pitäisi aloittaa. Ryhmiä, jotka käyttävät tätä tiedostotyyppiä, kannustetaan voimakkaasti käyttämäänERDDAP™luoda kelvollisia CF DSG CRA -tiedostoja ja lopettaa näiden tiedostojen käyttö.
        *   [EDDTableFromJsonlCSVFiles](#eddtablefromjsonlcsvfiles)Aggregoituja tietoja[JSON CSV-tiedostot](https://jsonlines.org/examples/).
        *   [EDDTableFromMultidimNcFiles Näytä tarkat tiedot](#eddtablefrommultidimncfiles)Aggregoituja tietojaNetCDF  (V3 tai v4)  .nctiedostoja, joissa on useita muuttujia, joilla on jaettu ulottuvuus.
        *   [EDDTableFromNcFiles](#eddtablefromncfiles)Aggregoituja tietojaNetCDF  (V3 tai v4)  .nctiedostoja, joissa on useita muuttujia, joilla on jaettu ulottuvuus. On hienoa jatkaa tätä tietoaineistotyyppiä olemassa oleville tietoaineistoille, mutta uusille tietoaineistoille suosittelemme käyttämään EDDTableFromMultidimNcFilesiä.
        *   [EDDTableFromNcFiles](#eddtablefromnccffiles)Aggregoituja tietojaNetCDF  (V3 tai v4)  .nctiedostot, jotka käyttävät yhtä tiedostomuodoista, jotka on määritetty[CF Discrete Sampling Geometria (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)yleissopimuksia. Jos tiedostot käyttävät yhtä moniulotteista CF DSG-muuttujaa, käytä[EDDTableFromMultidimNcFiles Näytä tarkat tiedot](#eddtablefrommultidimncfiles)Sen sijaan.
        *   [EDDTableFromNccsvfiilit](#eddtablefromnccsvfiles)Aggregoituja tietoja[NCCSV](/docs/user/nccsv-1.00)ASCII .csv-tiedostoja.
        *   [EDDTableFromNOS](#eddtablefromnos)  (Vähennetty) käsittelee tabulaaritietoja NOS XML -palvelimilta.
        *   [EddtableFromOBIS](#eddtablefromobis)käsittelee tabulaaritietoja OBIS-palvelimilta.
        *   [EDDTableFromParquetFiles Näytä tarkat tiedot](#eddtablefromparquetfiles)käsittelee tietoja[Osallistuminen](https://parquet.apache.org/).
        *   [EDDTableFromSOS](#eddtablefromsos)käsittelee tabulaarista dataaSOSpalvelimia.
        *   [EDDTableFromThreddsFiles](#eddtablefromthreddsfiles)  (Vähennetty) koostaa tiedostoja, joissa on useita muuttujia, joiden jaetut ulottuvuudet[3DSOPeNDAPPalvelin](https://www.unidata.ucar.edu/software/tds/).
        *   [EDDTableFromWFSTiedostot](#eddtablefromwfsfiles)  (Vähennetty) paikallinen kopio kaikista tiedoistaArcGISMapServerWFSpalvelin, jotta tiedot voidaan palauttaa nopeastiERDDAP™käyttäjiä.
        *   [EDDTableAggregateRows](#eddtableaggregaterows)Voit tehdä EDDTable-tietoaineiston joukosta EDDTable-tietoaineistoja.
        *   [EdDTableCopy](#eddtablecopy)voi tehdä paikallisen kopion monista EDDTable-tietoaineistoista ja palauttaa tiedot nopeasti paikallisesta kopiosta.

  
- -

## Yksityiskohtaiset kuvaukset aineistotyypeistä{#detailed-descriptions-of-dataset-types} 

### EDDGridLähde:Dap{#eddgridfromdap} 
[ **EDDGridLähde:Dap** ](#eddgridfromdap)verkon muuttujia[DAP](https://www.opendap.org/)palvelimia.

* Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Voit kerätä tietoja, joita tarvitset muokataksesi tai luodaksesi oman XML:n.EDDGridFromDap-tietoaineistosta katsomalla lähdeaineiston DDS- ja DAS-tiedostoja selaimessasi (Lisäämällä .das ja .dds to thesourceUrlesimerkiksi,[ https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds ](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds)) .
     
*   EDDGridFromDap voi saada tietoja mistä tahansa moniulotteisesta muuttujastaDAPpalvelin. (aikaisemmin,EDDGridFromDap oli rajoittunut muuttujiin, jotka on nimetty "verkoksi", mutta se ei ole enää vaatimus.)   
     
* Dimension arvot - Kunkin ulottuvuuden arvot on määriteltävä järjestyksessä. (nouseminen tai laskeutuminen) . Arvot voidaan asettaa epäsäännöllisesti. Ei voi olla siteitä. Tämä on vaatimus[CF:n metatiedot](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Jos minkään ulottuvuuden arvot eivät ole lajitellussa järjestyksessä, aineistoa ei ladata jaERDDAP™tunnistaa lokitiedoston ensimmäisen arvon, *isovanhemmat* /logs/log.txt.
    
Rajoittamattomat ulottuvuudet osoittavat lähes aina ongelman lähdeaineiston kanssa. Tämä tapahtuu yleisimmin, kun väärin nimetty tai sopimaton tiedosto sisältyy aggregaatioon, joka johtaa häiriöttömään ajan ulottuvuuteen. Tämän ongelman ratkaisemiseksi katso virheilmoitusERDDAP™Lo.txt-tiedosto, joka etsii loukkaavan ajan arvoa. Katso lähdetiedostoja löytää vastaava tiedosto (Yksi ennen tai yksi jälkeen) Se ei kuulu aggregaatioon.
    
#### EDDGridLähde:Dap Skeleton XML{#eddgridfromdap-skeleton-xml} 

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

     
### EDDGridEDDTable{#eddgridfromeddtable} 
[ **EDDGridEDDTable** ](#eddgridfromeddtable)Voit muuntaa EDDTable-tabulaaritiedostonEDDGridVerkkotietokanta. Muista, ettäERDDAP™Käsittelemme myös dataa[Verkkotietoaineistot (AlaluokkaaEDDGrid) Tabulaariset tiedot (EDDTablen alaluokka) ](#why-just-two-basic-data-structures).

* Normaalisti, jos olet tallentanut tietoja, olet juuri perustanutEDDGridTietoja suoraan. Joskus tämä ei ole mahdollista esimerkiksi silloin, kun tietoja on tallennettu relaatiotietokantaan.ERDDAP™Voit käyttää vain EDDTableFromDatabase -palvelun kautta.EDDGridLuokan avulla voit korjata tilanteen.
     
* EDDTable-tietoaineiston taustalla olevien tietojen on oltava (Periaatteessa) aineistoa, mutta tabulaarisessa muodossa. Esimerkiksi EDDTable-tietoaineistossa voi olla CTD-tietoja: Itä- ja pohjoisvirran mittauksia usean kerran. Koska syvyydet ovat aina samat,EDDGridFromEDDTable voi luoda verkkotietoaineiston ajan ja syvän ulottuvuuden, joka käyttää tietoja taustalla olevan EDDTable-tietokannan kautta.
     
* GenerateDatasets XML - Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Voit kerätä tietoja, joita tarvitset karkean luonnoksen parantamiseksi.
     
* Lähteet - Kuten kaikki muutkin tietoaineistot,EDDGridpöydällä on käsitys siitä, että on olemassa globaaleja ja[MaailmanlaajuinenaddAttributes](#global-attributes)  (määriteltydatasets.xml) joka yhdistää maailman ominaisuuksia, joita käyttäjät näkevät. globaaleista lähteistä,EDDGridEDDTable käyttää maailmanlaajuista yhdistettyä taustalla olevan EDDTable-tietoaineiston ominaisuudet. (Jos ajattelet asiaa hetken, se on järkevää.) 
    
Samoin jokaiselleaxisVariable&gt; jadataVariable&gt;[addAttributes](#addattributes),EDDGridEDDTable käyttää muuttujan yhdistettyä Ominaisuudet taustalla olevasta EDDTable-tietoaineistosta kuinEDDGridEDDTable-muuttujan lähde. (Jos ajattelet asiaa hetken, se on järkevää.) 
    
Jos EDDTable on hyvä metatieto,EDDGridUsein tarvitaan liian vähänaddAttributesMetadata – täällä ja siellä.
    
*   dataVariablevs.axisVariableS- EDD-taulukossa on vaindataVariables. YksiEDDGridEDDTable-tietokanta sisältää joitakinaxisVariables (Luotu jostain EDDTablestadataVariables) ja jotkutdataVariables (Luotu jäljellä olevasta EDDTablestadataVariables) .[GenerateDatasetsXml](#generatedatasetsxml)arvata, mikä EDDTabledataVariableS:stä pitäisi tullaEDDGridEDDTableaxisVariableS, mutta se on vain arvaus. Sinun on muutettava GenerateDatasetsXmlin tuotantoa määrittääksesi, mikädataVariables tuleeaxisVariableja missä järjestyksessä.
     
* Akseliarvot - Ei ole mitään taustalla olevasta EDDTablesta kerrottavaa.EDDGridYhteenveto mahdollisista arvoistaaxisVariabletietoaineiston verkkoversiossa, joten sinun on annettava nämä tiedot jokaiselleaxisVariableYhden näistä ominaisuuksista:
    
    * Akseliarvot - voit määrittää luettelon arvoista. Esimerkiksi,
        &lt;att-nimi = "akseliarvot"[Tyyppi = "kaksoislista"](#attributetype)2,5, 3, 3,5, 4&lt;&gt;
Huomioi A:n käyttö[Tietotyyppi](#data-types)plus sana lista. Myös listan tyyppi (Esimerkiksi kaksinkertainen) Täytyy yhdistää tiedot EDDT-taulukon tyyppi jaEDDGridEDDTable-tietokannat.
    * AxisValuesStartStrideStop - määrittää säännöllisin väliajoin määritettyjen arvojen sarjan määrittämällä aloitus-, ohjaus- ja pysäytysarvot. Tässä on esimerkki, joka vastaa akseliarvojen esimerkkiä:
        &lt;AxisValuestartStrideStop (käytetty)[Tyyppi = "kaksoislista"](#attributetype)•2, 0,5, 4&lt;&gt;
Huomaa jälleen luettelon tietotyypin käyttö. Myös listan tyyppi (Esimerkiksi kaksinkertainen) Täytyy yhdistää tiedot EDDT-taulukon tyyppi jaEDDGridEDDTable-tietokannat.
         
    
Päivitykset - Aivan kuten ei ole mitään keinoaEDDGridAlun perin EDDTablen akseliarvojen määrittämiseksi ei ole myöskään luotettavaa tapaaEDDGridEDDTable määrittää EDDTable, kun akseliarvot ovat muuttuneet (Erityisesti silloin, kun aikamuuttujalle on uusia arvoja.) . Tällä hetkellä ainoa ratkaisu on muuttaa akseliarvojen ominaisuutta.datasets.xmlja ladata aineistoa uudelleen. Voit esimerkiksi kirjoittaa käsikirjoituksen
    
    1. Etsintädatasets.xmlfor
        datasetID=" *Päivämäärä* """
Työskentelet oikean datan kanssa.
    2. Etsintädatasets.xmlseuraavaan tapahtumaan
        <sourceName> *Lähde: TheVariablesSourceName* </sourceName>  
Työskentelet oikean muuttujan kanssa.
    3. Etsintädatasets.xmlseuraavaan tapahtumaan
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
Näin tiedät tagin lähtöasennon.
    4. Etsintädatasets.xmlseuraavaan tapahtumaan
```
        </att>  
```
Näin tiedät akseliarvojen lopun.
    5. Korvaa vanha aloitus, hiero, lopeta arvot uusilla arvoilla.
    6. Ota yhteyttä[Lippu URL](/docs/server-admin/additional-information#set-dataset-flag)aineiston kerrottavaksiERDDAP™tietojen lataamiseen.
    
Se ei ole ihanteellinen, mutta toimii.
     
* Tarkkuus - MilloinEDDGridFromEDDTable vastaa käyttäjän tietopyyntöön, se siirtää datarivin EDDTable-vastetaulukosta.EDDGridVerkon vastaus. Tätä varten on selvitettävä, vastaavatko taulukon tietyn rivin "akselin" arvot akseliarvojen yhdistelmää verkkoon. Integer-tietotyypeissä on helppo määrittää, ovatko kaksi arvoa yhtä suuria. Mutta kelluville ja kaksoisolennoille tämä aiheuttaa kelluvan pistemäärän kauhean ongelman.[Ei sovi täsmälleen](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/). (Esimerkiksi 0,2 vs. 0,1999999999999999999999996) . To (yrittää) käsitellä tätä,EDDGridTaulussa voit määrittää tarkkuus attribuutio tahansaaxisVariables, joka määrittää desimaalilukujen kokonaismäärän, joka on identtinen.
    * Esimerkiksi,&lt;att-nimi = "tarkkuus" tyyppi = "int"&gt; 5&lt;&gt;
    * Erilaisten tietomuuttujatyyppien kohdalla on erilaisia oletusarvoja. Oletusarvot ovat yleensä sopivia. Jos ei ole, on määriteltävä eri arvot.
    * For ForaxisVariablejotka ovat[Aikaa tai aikaa Stamp-muuttujat](#timestamp-variables)Oletusarvo on täydellinen tarkkuus (Tarkka ottelu) .
    * For ForaxisVariableOletusarvon tarkkuus on 5
    * For ForaxisVariableKaksinkertainen, oletusarvo on 9.
    * For ForaxisVariablejoilla on integroituja tietotyyppejä,EDDGridFromEDDTable sivuuttaa tarkkuusominaisuuden ja käyttää aina täydellistä tarkkuutta. (Tarkka ottelu) .
         
    *    **Varoitus&#33;** Kun siirrät tabulaarista dataa verkkoon, josEDDGridFromEDDTable ei voi sovittaa EDDTable "akseli" -arvoa yhteen odotetustaEDDGridAkseliarvot,EDDGridÄänestä hiljaa (Ei virheitä) Heittää tiedot pois pöydän rivistä. Esimerkiksi muita tietoja voi olla (Ei verkossa) EDDTable-tietokantaan. (Jos rytmi » 1. Ei ole itsestään selvääEDDGridPöydästä, jonka akseliarvot ovat haluttuja arvoja, ja mitkä niistä ovat ne, jotka on jätettävä sivuun riidan vuoksi.) Joten, jos tarkkuusarvot ovat liian korkeat, käyttäjä näkee puuttuvat arvot tietovasteessa, kun voimassa olevat tietoarvot ovat olemassa.
        
Toisaalta, jos tarkkuusarvot asetetaan liian alhaisiksi, EDDTable "akseli" -arvot, jotka eivät sovi yhteen.EDDGridEDDTable Axis -arvot (virheellisesti) Ottelu.
        
Nämä mahdolliset ongelmat ovat kauheita, koska käyttäjä saa väärät tiedot. (puuttuvat arvot) Kun saa oikeat tiedot (Tai ainakin virheilmoitus) .
Tämä ei ole virheEDDGridTable.EDDGridTable ei voi ratkaista tätä ongelmaa. Ongelma on luonnollinen tabulaaritietojen muuntamiseen verkkotietoihin. (Ellei muita oletuksia voi tehdä, mutta niitä ei voi tehdä täällä.) .
Se riippuu sinusta,ERDDAP™Hallinnollinen, **Testaa omasiEDDGridEDDTable perusteellisesti** jotta voidaan varmistaa tarkkuusarvojen välttäminen.
        
#### GapThresh{#gapthreshold} 
*   [GapThresh](#gapthreshold)----- Tämä on hyvin epätavallinen tietoaineisto. tyyppisiä kysymyksiä, joita voidaan tehdä (Käsittelemällä) YksiEDDGridData (Liittyy valikoimaan ja liikkeisiinaxisVariables) ovat hyvin erilaisia kuin mitä kyselyitä voidaan tehdä. (Käsittelemällä) EDDTable Dataset (jotka liittyvät joidenkin muuttujien valikoimaan) suorituskyvynEDDGridEDDTable-tietoaineistot vaihtelevat suuresti tarkan pyynnön mukaan ja taustalla olevan EDDTable-tietoaineiston nopeuden mukaan. pyyntöihin, joiden arvo on &gt; 1EDDGridFromEDDTable voi kysyä taustalla olevaa EDD-taulukkoa suhteellisen suurelle datahuijaukselle. (= 1) Ja sitten seuloa tuloksia, pitää tiedot tietyistä riveistä ja heittää pois tietoja muista. Jos se joutuu käsittelemään monia tietoja saadakseen tarvitsemansa tiedot, pyyntö kestää pidempään.
    
JosEDDGridEDDTable voi kertoa, että aukkoja on (Ei-toivottujen tietojen rivit) haluttujen tietojen kanssa,EDDGridFromEDDTable voi halutessaan tehdä useita alapyyntöjä taustalla olevaan EDDT-taulukkoon yhden suuren pyynnön sijasta ja siten ohittaa ei-toivotut tiedot suurissa aukoissa. Päätöksen herkkyyttä hallitsee gapThreshold-arvo, joka määritellään&lt;GapThreshold &gt; Tag (Oletusarvo = 1000 riviä lähdetietoja) . GapThresholdin asettaminen pienempään määrään johtaa tietoaineiston luomiseen. (yleisesti yleisesti) Lisää alakysymyksiä. GapThresholdin asettaminen suurempaan määrään johtaa tietoaineiston luomiseen. (yleisesti yleisesti) Vähemmän alapyyntöjä.
    
Jos apteekki on liian pieni,EDDGridFromEDDTable toimii hitaammin, koska useiden pyyntöjen yläosa on suurempi kuin aika, joka säästyy saamalla ylimääräisiä tietoja. Mikäli kuorma-arvo on liian suuri,EDDGridFromEDDTable toimii hitaammin, koska niin paljon ylimääräistä dataa haetaan EDDT-taulukosta. (Kuten Goldilocks totesi, keskimmäinen on "vain oikeassa".) Eri tyyppisten EDDTable-tietoaineistojen käyttö vaihtelee suuresti, joten ainoa tapa tutustua tietoaineiston parhaaseen asetukseen on kokeilu. Et kuitenkaan mene liian kauas väärään pitämään kiinni oletuksesta.
    
Yksinkertainen esimerkki: Kuvittele jokinEDDGridTable vain yhdelläaxisVariable  (aika, jonka koko on 100 000) YksidataVariable  (lämpötila lämpötila) Oletusarvo on 1000.
    
    * Jos käyttäjä pyytää lämpötilaa\\[058; 100 pistettä; 5000\\]Taulukko on 100, joten kuilun koko on 99, mikä on pienempi kuin gapThreshold. NiinpäEDDGridTaulukko tekee vain yhden pyynnön EDDTablelle kaikista pyyntöön tarvittavista tiedoista. (Lämpötila vastaa\\[0:5 000\\]) Heitä pois kaikki rivit, joita se ei tarvitse.
    * Jos käyttäjä pyytää lämpötilaa\\[0:2500:5000\\]Se on 2500, joten kuilun koko on 2499, mikä on suurempi kuin aukko. NiinpäEDDGridPöydästä tehdään erillisiä pyyntöjä EDDTablelle, joka vastaa lämpötilaa.\\[0\\]lämpötila\\[2500\\]lämpötila\\[5000\\].
    
Kuilun koon laskeminen on monimutkaisempaa, kun on useita akseleita.
    
kunkin käyttäjän pyynnöstä,EDDGridEDDTable tulostaa tähän liittyviä diagnostisia viestejä[log.txt](/docs/server-admin/additional-information#log)tiedosto.
    
    * Jos [&lt;logiikka &gt; (#loglevel) Sisällädatasets.xmlSe on info, tämä tulostaa viestin, kuten
nOuterAxes = 1 4 nOuterRequest = 22
Jos nOuterAxes = 0, gapThreshold ei ylittynyt ja EDDTablelle tehdään vain yksi pyyntö.
Jos nOuterAxes&gt;0, gapThreshold ylitettiin ja nOuterRequests tehdään EDDTable, joka vastaa jokaista vasemman nOuterAxesin pyydettyä yhdistelmää. Jos aineistossa on 4axisVariableS jadataVariablekuin itään\\[Aika-aika\\]\\[leveys\\]\\[Pituus\\]\\[syvyys\\]Vasemmistolainen (Ensimmäinen ensimmäinen) Muuttuva akseli on aika.
    * Jos&lt;logiikka &gt; Sisällädatasets.xmlLisätiedot on kirjoitettu log.txt-tiedostoon.
         
#### EDDGridLähde: Skeleton XML{#eddgridfromeddtable-skeleton-xml} 
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

### EDD:stäERDDAP {#eddfromerddap} 
 **EDDGridLähde: Eddap** käsittelee verkottuneita tietoja kauko-ohjaimestaERDDAP™palvelin.
 **EdDTableFromDap** käsittelee tabulaarisia tietoja kauko-osastaERDDAP™palvelin.

*   EDDGridFromErdddap ja EDDTableFromErddap käyttäytyvät eri tavalla kuin muut tietoaineistot.ERDDAP.
    * Kuten muutkin tietoaineistot, nämä tietoaineistot saavat tietoa tietoaineistosta lähteestä ja säilyttävät sen muistissa.
    * Kuten muutkin aineistot, kunERDDAP™tietoaineistojen haku, Data Access -muodon näyttäminen ( *datasetID* .html) tai näytä graafinen muoto ( *datasetID* .grafiikka) ,ERDDAP™käyttää tietoja muistin aineistosta.
    *   EDDGridFromErddap ja EDDTable Erddap on perusta[Verkot/klusterit/federaatiot](/docs/server-admin/scaling)jostaERDDAPs, joka jakaa tehokkaasti CPU:n käyttöä (Enimmäkseen karttojen tekeminen) muistin käyttö, tietojen tallennus ja kaistanleveys käyttö suuri datakeskus.
#### Redirect{#redirect} 
* Toisin kuin muut aineistot, kunERDDAP™vastaanottaa kyseisten tietojen tai kuvien pyynnön,ERDDAP [Ohjaus](https://en.wikipedia.org/wiki/URL_redirection)Pyyntö kaukosäätimelleERDDAP™palvelin. Lopputulos on:
    * Tämä on erittäin tehokasta (CPU, muisti ja kaistanleveys) koska muuten
        1. KomposiittiERDDAP™on lähetettävä pyyntö toiseenERDDAP™  (joka vie aikaa) .
        2. ToinenERDDAP™on saatava tiedot, uudistettava ne ja siirrettävä tiedot komposiitille.ERDDAP.
        3. KomposiittiERDDAP™Tietojen on saatava (Bandwidthin käyttö) uudistaa sitä (CPU ja muisti) ja siirtää tiedot käyttäjälle (Bandwidthin käyttö) . Ohjaamalla pyyntöä ja sallimalla toisenERDDAP™lähettää vastauksen suoraan käyttäjälle, komposiitilleERDDAP™Käyttää pohjimmiltaan CPU-aikaa, muistia tai kaistanleveyttä pyynnöstä.
    * Uudelleenohjaus on käyttäjälle läpinäkyvä asiakasohjelmistosta riippumatta. (selain tai jokin muu ohjelmisto tai komentorivityökalu) .
*   [Voit kertoaERDDAP™](#redirect)ei ohjaa käyttäjän pyyntöjä asettamalla&lt;Ohjaus &gt; Väärä&lt;/redirect&gt;, mutta tämä poistaa suurimman osan ... (Erityisesti kuorman hajottaminen etupäässäERDDAP™Kauko-/taka-asuntoERDDAP) .
         
     
#### Allekirjoituksia{#subscriptions} 
Normaalisti, kunEDDGridFromErddap ja EDDTable Erddap on (Re) ladattuna sinunERDDAPhe yrittävät lisätä tilauksen etätietoihin etätietojen kauttaERDDAPSähköposti/URL-tilausjärjestelmä. Näin, kun etätiedot muuttuvat,ERDDAP™Yhteystiedot[Säätiö Lippu URL](/docs/server-admin/additional-information#set-dataset-flag)sinunERDDAP™niin, että paikallinen tietoaineisto ladataan uudelleen ASAP: ksi ja niin, että paikallinen tietoaineisto on aina ajan tasalla ja jäljittelee etätietoja. Joten ensimmäinen kerta, kun tämä tapahtuu, saat sähköpostin, jossa pyydetään, että vahvistat tilauksen. Jos kuitenkin paikallisetERDDAP™ei voi lähettää sähköpostia tai jos etäisyysERDDAPSähköposti/URL-tilausjärjestelmä ei ole aktiivinen, sinun on lähetettävä sähköpostia kaukosäätimelle.ERDDAP™Hallinnoija ja pyytää, että hän lisää [&lt;Muutos » (#vaihto) ............&lt;/onChange&gt;-tagit kaikkiin asiaankuuluviin tietoaineistoihin, jotta voit soittaa tietoaineistosi[Säätiö Lippu URL](/docs/server-admin/additional-information#set-dataset-flag). Näe omasiERDDAP™Päivittäinen raportti luettelosta URL-osoitteet, mutta lähetä ne vainEDDGridFromErdddap ja EDDTableFromErddap-tietoaineistot etäkäyttöönERDDAP™hallinnoija.
    
Eikö tämä toimi? Eivätkö paikalliset tietovarastosi pysy synkronoituna etätietojen kanssa?
Useiden asioiden on toimittava oikein, jotta tietosi pysyvät ajan tasalla. Tarkista kaikki nämä asiat järjestyksessä:
    
    1. SinunERDDAP™Sähköposteja on voitava lähettää. Katso sähköpostiasetukset asetuksessa.xml.
    2. yleisesti (mutta ei aina) sinunERDDAP&gt;&lt;&gt; &gt; ja&lt;BaseHttpsUrl ei saa olla porttinumero (Esimerkki: 8080, :8443) . Jos teet, käytä[Proxypass](/docs/server-admin/deploy-install#proxypass)poistaa satama Url.
    3. asennus.xml,&lt;RemoteErddapDataset &gt; on määritettävä todeksi.
    4. Kun paikallinen EDD... FromErddap-tietokanta on ladattu, sen on lähetettävä pyyntö etäkäyttöön.ERDDAP™Etätietojen tilaaminen. Katso log.txt nähdäksesi, tapahtuuko näin.
    5. Saat sähköpostin, jossa sinua pyydetään vahvistamaan tilauspyyntö.
    6. Sinun on klikattava kyseisen sähköpostin linkkiä tilauspyynnön vahvistamiseksi.
    7. EtäinenERDDAP™Sanotaan, että validointi on onnistunut. Voit milloin tahansa pyytää sähköpostia kaukosäätimeltä.ERDDAP™luettelo vireillä olevista ja voimassa olevista tilauksistasi. Katso lomake *Etäisyys Url* /erddap/subscriptions/list.html
    8. Kun etätieto muuttuu (esimerkiksi lisätietoja) EtäinenERDDAP™Sinun pitäisi yrittää ottaa yhteyttä lippuunERDDAP. Et voi tarkistaa tätä, mutta voit kysyä etävalmistajalta.ERDDAP™Tarkista tämä.
    9. SinunERDDAP™Pitäisi pyytää lippua. Tarkista log.txt "setDatasetFlag.txt" -pyyntö (s) Katso, onko pyyntöihin liitetty virheilmoitus.
    10. SinunERDDAP™Pitäisi sitten yrittää ladata nämä tiedot uudelleen (Ei ehkä heti, mutta ASAP) .
         
#### Päivitetty max (Aika-aika) ??{#up-to-date-maxtime} 
EDDGrid/TableFromErddap-tietoaineisto muuttaa tallennettuja tietoja vain, kun lähdeaineisto on["reload"](#reloadeverynminutes)Muutama metatieto muuttuu (mm. aikamuuttujatactual\\_range) Näin luodaan tilausilmoitus. Jos lähdeaineistossa on tietoja, jotka muuttuvat usein (Uusia tietoja joka sekunti) ja käyttää["päivitetty"](#updateeverynmillis)järjestelmä, joka havaitsee usein taustalla olevia tietoja,EDDGrid/TableFromErddap ei ilmoita näistä usein tehdyistä muutoksista, kunnes seuraava aineisto "lataa"EDDGridTableFromErddap ei ole täysin ajan tasalla. Voit minimoida ongelman muuttamalla lähdeaineistoa.&lt;Reload EveryNMinutes &gt; pienempään arvoon (50?) niin, että tilausilmoituksia on lisättäväEDDGrid/TableFromErddap päivittää tietojaan lähdeaineistosta.

Jos tietojärjestelmäsi tietää, milloin lähdeaineistossa on uusia tietoja (esimerkiksi käsikirjoituksen kautta, joka kopioi datatiedoston) Jos se ei ole liian usein (joka viides minuutti tai harvemmin) On olemassa parempi ratkaisu:

1. Älä käytä&lt;Päivitä EveryNMillis&gt;, jotta lähdetiedot pysyvät ajan tasalla.
2. Aseta lähdeaineisto&lt;Reload "Kaikki minuutit" suurempaan määrään (1440?) .
3. Ota yhteyttä lähdeaineistoon[Lippu URL](/docs/server-admin/additional-information#set-dataset-flag)heti, kun se kopioi uuden datatiedoston.
     

Tämä johtaa siihen, että lähdeaineisto on täysin ajan tasalla ja saa sen luomaan tilausilmoituksen, joka lähetetäänEDDGridTableFromErddap-tietokanta. Tämä johtaaEDDGrid/TableFromErddap-tietokanta on täysin ajan tasalla (5 sekunnin kuluessa uusien tietojen lisäämisestä) . Kaikki, mitä tehdään tehokkaasti (Ilman tarpeetonta tiedonsiirtoa) .
     
#### Ei Ei Ei Ei Ei Ei Ei Ei Ei EiaddAttributes,axisVariabletaidataVariable {#no-addattributes-axisvariable-or-datavariable} 
Toisin kuin muut tiedostot, EDDTableFromErddap jaEDDGridFromErddap-tietokannat eivät salli maailmanlaajuista&lt;addAttributes&gt;,&lt;axisVariable&gt; tai&lt;dataVariable&gt; osatdatasets.xmltätä dataa varten. Ongelmana on, että nämä voivat johtaa epäjohdonmukaisuuteen:
    
1. Sanotaan, että se on sallittua ja siihen on lisätty uusi globaali ominaisuus.
2. Kun käyttäjä kysyyERDDAP™Globaalien attribuuttien kohdalla tulee uusi ominaisuus.
3. Kun käyttäjä kysyy sinultaERDDAP™tiedoston, sinunERDDAP™pyynnön uudelleenohjaus lähteelleERDDAP. TämäERDDAP™ei ole tietoinen uudesta attribuutista. Jos se luo datatiedoston metadatalla, esimerkiksi.ncMetadatalla ei ole uutta ominaisuutta.

On kaksi työpaikkaa:

1. Luota lähteen hallintaanERDDAP™tehdä muutoksia, joita haluat metadatalle.
2. EDDTableFromErddapin sijaan[EdDTableFromDapsequence Näytä tarkat tiedot](#eddtablefromdapsequence). Tai sen sijaanEDDGridErddap, käyttö[EDDGridLähde:Dap](#eddgridfromdap). Nämä EDD-tyypit mahdollistavat tehokkaan yhteyden etätietoihin.ERDDAP™  (ilman tietojen uudelleenohjausta) Niiden avulla voit sisällyttää globaalin&lt;addAttributes&gt;,&lt;axisVariable&gt; tai&lt;dataVariable&gt; osatdatasets.xml. Yksi muu ero: sinun täytyy manuaalisesti tilata etätietoaineisto, niin että aineistosiERDDAP™Ilmoitetaan (kautta[Lippu URL](/docs/server-admin/additional-information#set-dataset-flag)) kun etätietoihin on tehty muutoksia. Näin luot uuden tietoaineiston sen sijaan, että yhdistäisit etätietoihin.
         
#### Muut muistiinpanot{#other-notes} 
* turvallisuussyistä,EDDGridFromErddap ja EDDTable Erddap ei tue [...]&lt;Käytettävyys &gt; (#accessibleto) tunniste ja sitä ei voi käyttää etätietoaineistoilla, jotka vaativat kirjautumista sisään (koska niitä käytetään).&lt;Käytettävyys &gt; (#accessibleto) ). NäytäERDDAP&gt;[Turvallisuusjärjestelmä](/docs/server-admin/additional-information#security)joidenkin käyttäjien pääsyn rajoittamiseksi.
     
* AloitetaanERDDAP™V2.10,EDDGridFromErdddap ja EDDTableFromErddap tukevat&lt;Käytettävissä olevat tiedostot &gt; (#accessibleviafiles) Tag. Toisin kuin muut tietoaineistot, oletusarvo on tosi, mutta tietoaineiston tiedostot ovat käytettävissäViaFiles vain, jos lähdeaineistolla on myös&lt;Käytettävissä olevat ViaFiles &gt; totta.
     
* Voit käyttää[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdäkseendatasets.xmlTsemppiä tämäntyyppiselle datalle. Voit tehdä tällaisia tiedostoja helposti käsin.
     
#### EDDGridLähde: Erddap Skeleton XML{#eddgridfromerddap-skeleton-xml} 
*   EDDGridLähde: Erddap Skeleton XML-tiedot ovat hyvin yksinkertaisia, koska tarkoituksena on vain jäljitellä etätietoaineistoa, joka on jo käytössä.ERDDAP:
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

#### EdDTableFromDap Skeleton (käytetty) XML{#eddtablefromerddap-skeleton-xml} 
* EDDTableFromErddap-tietoaineiston luuranko XML on erittäin yksinkertainen, koska tarkoituksena on vain jäljitellä etätietoaineistoa, joka on jo käytössä.ERDDAP:
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

### EDDGridLähde: Etopo{#eddgridfrometopo} 
[ **EDDGridLähde: Etopo** ](#eddgridfrometopo)Vain palvelee[ETOPO1 Global 1-Minute Gridded Elevation Data](https://www.ngdc.noaa.gov/mgg/global/global.html)  (Ice Surface, verkkorekisteröity, binaarinen, 2-tavuinen sisäänkäynti: etopo1 ± 2.zip) jonka kanssa jaetaanERDDAP.

* Vain kaksidatasetIDs on tuettuEDDGridFromEtopo, jotta voit käyttää tietoja pituusarvoilla -180-180 tai pituusarvoilla 0-360.
* Koskaan ei ole alatunnisteita, koska tiedot on jo kuvattu sisäisesti.ERDDAP.
* Kaksi vaihtoehtoaEDDGridEtopo-tietokannat ovat (kirjaimellisesti) :
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

### EDDGridFilejä{#eddgridfromfiles} 
[ **EDDGridFilejä** ](#eddgridfromfiles)Se on kaikkien superluokkaEDDGrid...Files-luokat. Et voi käyttääEDDGridFiles suoraan. Käytä aliluokkaaEDDGridFiles käsittelee tiettyä tiedostotyyppiä:

*   [EDDGridLähde: MergeIRFiles](#eddgridfrommergeirfiles)käsittelee tietoja verkosta[Surgei.gz](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)tiedostoja.
*   [EDDGridAudiofiilejä](#eddfromaudiofiles)kerää tietoja paikallisista äänitiedostoista.
*   [EDDGridLähde: NCFiles](#eddgridfromncfiles)käsittelee tietoja verkosta[GRIB .grb](https://en.wikipedia.org/wiki/GRIB)tiedostoja,[HDF  (V4 tai v5)  .hdf](https://www.hdfgroup.org/)tiedostoja,[.ncml](#ncml-files)tiedostoja ja[NetCDF  (V3 tai v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)tiedostoja. Tämä voi toimia muiden tiedostotyyppien kanssa (Esimerkiksi BUFR) Emme ole vain testanneet sitä - lähetä meille näytetiedostoja, jos olet kiinnostunut.
*   [EDDGridLähde: NCFiles Unpacked](#eddgridfromncfilesunpacked)Se on varianttiEDDGridFromNcFiles, joka käsittelee tietoja verkostaNetCDF  (V3 tai v4)  .nctiedostot, jotkaERDDAP™Pakkaukset matalalla tasolla.

Tällä hetkellä muita tiedostotyyppejä ei tueta. Useimmiten on helppoa lisätä tukea muihin tiedostotyyppeihin. Ota yhteyttä, jos sinulla on pyyntö. Tai jos tietosi ovat vanhassa tiedostomuodossa, josta haluat siirtyä pois, suosittelemme tiedostojen muuntamista.NetCDFv3.nctiedostoja.NetCDFon laajasti tuettu, binaarinen muoto, joka mahdollistaa nopean satunnaisen pääsyn tietoihin, ja sitä tukee joERDDAP.

#### Tiedostojen yksityiskohdat{#from-files-details} 
Seuraavat tiedot koskevat kaikkia alaluokkiaEDDGridFilejä.

##### olemassa olevan ulottuvuuden yhdistäminen{#aggregation-of-an-existing-dimension} 
Kaikki variaatiotEDDGridFiles voi koota tietoja paikallisista tiedostoista, joissa jokaisella tiedostolla on 1 (tai enemmän) Vasemmiston eri arvot (Ensimmäinen ensimmäinen) ulottuvuus yleensä\\[Aika-aika\\]joka yhdistetään. Esimerkiksi mittasuhteet voivat olla\\[Aika-aika\\]\\[Korkeus\\]\\[leveys\\]\\[Pituus\\]tiedostot voivat olla tietoja yhdelle (tai muutama) Aika-arvo (s) tiedostoa kohti. Tuloksena oleva tietoaineisto näyttää siltä, että kaikki tiedoston tiedot on yhdistetty. Aggregoinnin suurimmat edut ovat:

* Aggregoidun tietojoukon koko voi olla paljon suurempi kuin yksi tiedosto voi olla kätevästi. (2GB) .
* Lähes reaaliaikaista dataa varten on helppo lisätä uusi tiedosto, jossa on uusimmat tiedot. Sinun ei tarvitse kirjoittaa koko aineistoa uudelleen.

Yhdistelmävaatimukset ovat:
* Paikalliset tiedostot eivät tarvitse samaadataVariables (määritellään tietoaineistossadatasets.xml) . Rekistereillä ondataVariableMääriteltydatasets.xml. Jos tietyllä tiedostolla ei ole tiettyädataVariable,ERDDAP™Lisätään puuttuvat arvot tarpeen mukaan.
* KaikkidataVariabletäytyy käyttää samaaaxisVariables/ulottuvuuksia (määritellään tietoaineistossadatasets.xml) . Tiedostot kootaan ensimmäisen perusteella (Vasemmisto) ulottuvuus, joka on määritelty nousevassa järjestyksessä.
* Jokaisella tiedostolla voi olla tietoja yhdestä tai useammasta ensimmäisen ulottuvuuden arvosta, mutta tiedostojen välillä ei voi olla päällekkäisyyttä. Jos tiedostolla on enemmän kuin yksi arvo ensimmäisessä ulottuvuudessa, arvot on lajiteltava nousevassa järjestyksessä ilman siteitä.
* Kaikilla tiedostoilla on oltava samat arvot kaikilla muilla ulottuvuuksilla. Testien tarkkuus määräytyy[AxisNDigits](#matchaxisndigits).
* Kaikkien tiedostojen on oltava samanlaisia[Yksiköt](#units)Metadataa kaikilleaxisVariableS jadataVariables. Jos tämä on ongelma, voit käyttää[NCML](#ncml-files)tai tai[NCO](#netcdf-operators-nco)ongelman korjaamiseksi.
         
##### Yhteenveto tiedostonimien tai Global Metadatan kautta{#aggregation-via-file-names-or-global-metadata} 
Kaikki variaatiotEDDGridFromFiles voi myös koota ryhmän tiedostoja lisäämällä uuden vasemman. (Ensimmäinen ensimmäinen) ulottuvuus, yleensä aika, joka perustuu kunkin tiedostonimen arvoon tai kunkin tiedoston globaalin ominaisuuden arvoon. Esimerkiksi tiedostonimi saattaa sisältää tiedoston tietojen aika-arvon.ERDDAP™Näin syntyisi uusi aikaulottuvuus.

Toisin kuin kolmessa jaksossa,ERDDAP™Luo ainaaxisVariableNumeeriset arvot (Tarvittaessa CF) Koskaan Stringin arvoja (joita CF ei salli) . myös,ERDDAP™lajittelee tiedostoja yhdistelmässä numeerisenaxisVariablekunkin tiedoston arvo, jotta akselimuuttujalla on aina CF:n edellyttämät arvot. THREDDS-lähestymistapa tiedoston nimien perusteella johtaa aggregaatioihin, joissa akseliarvot eivät ole lajiteltuja. (jota CF ei salli) kun tiedoston nimi on erilainen kuin johdettuaxisVariablearvoja.

perustaa yksi näistä aggregaatioistaERDDAP™Voit määritellä uuden vasemman (Ensimmäinen ensimmäinen)  [axisVariable](#axisvariable)Erityinen pseudo&lt;sourceName&gt; joka kertooERDDAP™Mistä ja miten löytää uusi ulottuvuus jokaisesta tiedostosta.

* Pseudo-formaattisourceNamejoka saa arvon tiedostonimestä (tiedostonimi.ext) on
    \\*\\*\\ \\ *tiedoston nimi,* [Datatiedot Tyyppi](#data-types) *,* Ote Regex *,* Järjestäjä *
* Pseudo-formaattisourceNamejoka saa arvon tiedoston ehdottomasta reitin nimestä on
    \\*\\*\\ \\ *reitti,* [Datatiedot Tyyppi](#data-types) *,* Ote Regex *,* Järjestäjä *
    \\[Tämä tarkoittaa sitä, että tien nimi käyttää aina'/'Hakemiston erottaja, ei koskaan ".\\]
* Pseudo-formaattisourceNamejoka saa arvon globaalista attribuutista
    \\*\\*\\ \\ *Globaali:* attribuutti Nimen nimi *,* [Datatiedot Tyyppi](#data-types) *,* Ote Regex *,* Järjestäjä *
* Tämä pseudosourceNameVaihtoehto toimii eri tavalla kuin muut: uuden vasemmiston luomisen sijaan. (Ensimmäinen ensimmäinen)  axisVariableTämä korvaa nykyisen arvonaxisVariabletiedostonimestä otettu arvo (tiedostonimi.ext) . Formaatti on
    \\*\\*\\ \\ *korvaa korvaava Filename,* [Datatiedot Tyyppi](#data-types) *,* Ote Regex *,* Järjestäjä *
     

Tarjottavien osien kuvaukset ovat:

*    *attribuutti Nimen nimi* jokaisessa tiedostossa olevan globaalin ominaisuuden nimi, joka sisältää ulottuvuuden arvon.
*    *Datatiedot Tyyppi* ----- Tämä määrittää tietotyypin, jota käytetään arvojen tallentamiseen. Katso tavanomainen luettelo[Datatiedot Tyypit](#data-types)ettäERDDAP™Tukea, paitsi että String ei ole sallittu täällä, koska akselimuuttujatERDDAP™Ei voi olla muuttujia.
    
Pseudo-tietotyyppi, aikaformaatti = *string Aikamuodot* joka kertooERDDAP™että arvo on String TimeStamp[Yksiköt sopivat merkkijonoaikoihin](#string-time-units). Useimmissa tapauksissa tarvitsemasi merkkijono on muunnelma yhdestä näistä muodoista:
    
    *   yyyy-MM-ddT'HHH:mm:ss.SSSZ, joka ISO 8601:2004 (E) Päivämäärän muoto. Saatat tarvita lyhennetyn version tästä, esimerkiksiyyyy-MM-ddT'HHH: mm: n taiyyyy-MM-dd.
    * YyyMddHmms.SSS, joka on ISO 8601 -aikamuodon kompakti versio. Saatat tarvita lyhennetyn version tästä, esim. YyyyMddHmms tai YyyyMMdd.
    * M/d/yyy H:mm:ss.SSS, joka on Yhdysvaltain slash päivämäärä. Saatat tarvita lyhennetyn version tästä, esim. M/d/yyy.
    * YyyDDHmmsSSS, joka on vuosi plus nolla-paddoitu päivä (Esim. 001 = Jan 1, 365 = Dec 31 ei-leap-vuonna; tätä kutsutaan joskus virheellisesti Julian-päiväksi.) . Saatat tarvita lyhennetyn version tästä, esim. YyyDDD.
    
Jos käytät tätä pseudo-datatyyppiä, lisää tämä uuteen muuttujaan.&lt;addAttributes&gt; &gt;
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Jos haluat siirtää kaikki aika-arvot, siirrä aika-arvoa yksiköissä, esimerkiksi
1970-01-01T12:00.
*    *Ote Regex* ----- Tämä on[Säännöllinen ilmaisu](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([Tutoriaali](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) johon kuuluu kaappausryhmä (Vanhemmissa) joka kuvaa, miten tiedostonimi tai globaali attribuuttiarvo otetaan pois. Esimerkiksi tiedostonimi, kuten S19980011998031.L3BO CHL.ncRyhmä #1,\\dTutoriaaliSäännöllisessä ilmaisussa S (\\ \\dTutoriaali) \\ \\dTutoriaali.L3b. * ottaa ensimmäiset 7 numeroa S:n jälkeen 1998001.
*    *Ryhmänumero* ----- Tämä on kaappausryhmän lukumäärä (Pariskunnan sisällä) säännöllisessä ilmaisussa, joka sisältää kiinnostuksen tiedot. Se on yleensä 1 ensimmäinen tallennusryhmä. Joskus sinun täytyy käyttää talteenottoryhmiä muihin tarkoituksiin regex, joten tärkeä tallennusryhmä numero on 2. (Toinen kaappausryhmä) tai 3 (Kolmas) jne.

Täydellinen esimerkki yhdestäaxisVariablejoka tekee kootun tietoaineiston uudella aika-akselilla, joka saa aika-arvot kunkin tiedoston nimi on
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
Kun käytät "Pseudo-dataa" Tyyppi,ERDDAP™Lisää kaksi ominaisuuttaaxisVariableNäyttää siltä, että ne tulevat lähteestä:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Tässä tapauksessa,ERDDAP™Luo uusi akseli nimeltä"time"Kaksinkertaiset arvot (1970-01-01T00:00:00Z) Ottamalla 7 numeroa S: n jälkeen ja ennen .L3m tiedostonimessä ja tulkitsemalla niitä aika-arvoina, jotka on muotoiltu yyyDDD: ksi.

Voit ohittaa oletuspohja-ajan (1970-01-0100:00) lisäämällä yhden[Lisääminen](#addattributes)joka määrittää eri yksiköiden attribuutin eri perusajalla. Yhteinen tilanne on: datatiedostoryhmiä, joista jokaisella on satelliittitietoaineiston yksi päiväkomposiitti, jossa haluat aika-arvon olevan tiedostonimessä mainitun päivän keskipäivä. (Jokaisen päivän keskitetty aika) haluta muuttujienlong\\_nameolla "keskeistä aikaa". Esimerkki, joka tekee näin:
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
Huomautusaika = 12 perusajassa, joka lisää 12 tuntia verrattuna alkuperäiseen perusaikaan 1970-01-01T00:00:00Z.

Täydellinen esimerkki yhdestäaxisVariablejoka tekee yhdistetyn tietoaineiston uudella ”juoksevalla” akselilla (Sisäiset arvot) joka saa juoksuarvot "RunID" globaalista attribuutista jokaisessa tiedostossa (arvot, kuten "r"17, jossa 17 on juoksunumero) on
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
Huomaa, että talteenottoryhmän numero 2:n käyttö tallentaa numerot, jotka tapahtuvat ’r’ tai ’s’ jälkeen, ja ennen ’global’. Tässä esimerkissä kerrotaan, miten lisätään lisäominaisuuksia. (esim.ioos\\_categoryja yksiköt) Axis-muuttuja.
     
#### Ulkoisesti painettuja tiedostoja{#externally-compressed-files} 
* Tiedot, jotka ovat osajoukkojaEDDGridFiles ja EDDTable FromFiles voi palvella tietoja suoraan ulkoisesti pakatuista tietotiedostoista, mukaan lukien.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2.Z-tiedostoja.
     
*    **Tämä toimii yllättävän hyvin&#33;**   
Useimmissa tapauksissa pienten ja keskisuurten tiedostojen purkamiseen liittyvä hidastuminen on vähäistä. Jos haluat säilyttää levytilaa, suosittelemme voimakkaasti tätä ominaisuutta, erityisesti vanhemmille tiedostoille, joita harvoin käytetään.
     
*    **Säästä rahaa&#33;**   
Tämä on yksi harvoista ominaisuuksistaERDDAP™Tämä antaa sinulle mahdollisuuden säästää paljon rahaa (Vaikka suorituskyvyn hinnan laskiessa) . Jos puristussuhde on esimerkiksi 6:1 (Joskus se on paljon korkeampi) Tällöin tietoaineiston tiedostot tarvitsevat vain 1/6 levytilaa. Sitten voit saada 1 RAID (tietyn kokoinen) Kuusi raitaa (Saman kokoinen) . Se on valtava kustannussäästö. Toivotaan, että kyky pakata joitakin tiedostoja kokoelmassa. (Vanhemmat?) Älä pakkaa muita (Uudempia?) ja muuttaa sitä milloin tahansa, minimoidaan haittapuoli pakkaamalla joitakin tiedostoja. (Hitaampi pääsy) . Ja jos valinta on tallentaa tiedostoja nauhaan (ja vain pyydettäessä, viivästymisen jälkeen) Säilytä ne pakattu RAID (Käytettävissä kauttaERDDAP) Sitten on suuri etu käyttää pakkausta niin, että käyttäjät saavat interaktiivisia ja (suhteellisen) nopea pääsy tietoihin. Ja jos tämä voi estää sinua ostamasta ylimääräistä RAIDia, tämä ominaisuus voi säästää noin 30 000 dollaria.
     
* KaikilleEDDGridFilesin alaluokat, jos tiedostojen laajennus osoittaa, että ne ovat ulkoisesti pakattuja tiedostoja. (Tällä hetkellä:.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2tai .Z) ,ERDDAP™purkaa tiedostot aineiston välimuistiin, kun se lukee niitä (Jos ei ole jo kätkössä) . Sama pätee binääritiedostoon (esim..nc) EDDTableFromFilesin alaluokka.
     
* EDDTableFromFilesin alaluokkia ei-binaaritiedostoille (Esimerkkinä .csv) , tietotiedostot, joiden laajennus osoittaa, että ne ovat ulkoisesti pakattuja tiedostoja, puretaan lennolla, kun tiedosto on luettavissa.
     
* Kysymys: Jos ulkoisesti pakatun tiedoston tyyppi (esim..tgztai tai.zip) tukee yli 1 tiedostoa pakatun tiedoston sisällä, pakatun tiedoston on sisällettävä vain yksi tiedosto.
     
* VAROITUS: Tämä ominaisuus olettaa, että ulkoisesti pakattujen tiedostojen sisältö ei muutu, jotta välimuistissa olevaa tiedostoa voidaan käyttää uudelleen. Jos osa tai kaikki tietoaineiston tiedostot muuttuvat joskus, älä pakkaa näitä tiedostoja. Tämä on johdonmukaista yleisen käytön kanssa, koska ihmiset eivät yleensä pakkaa tiedostoja, joita heidän on joskus muutettava.
     
*   &lt;tiedostonameregex&gt; Tämän työn tekeminen, tietoaineiston&lt;tiedoston NameRegex&gt; on vastattava pakattujen tiedostojen nimiä. Regeksejä kuten.\\*Se vastaa kaikkia tiedostojen nimiä. Jos määrität tietyn tiedostotyypin, esimerkiksi\\*&gt;.ncSitten sinun on muokattava regexiä sisällyttääksesi myös puristuslaajennuksen, esim. *&gt;.nc&gt;.gz(Jos kaikki tiedostot ovat* Jotain *.nc.gztiedostoja)
     
* On hienoa, jos tietoaineistosi sisältää pakattujen ja pakattujen tiedostojen yhdistelmän. Tämä voi olla hyödyllistä, jos uskot, että jotkut tiedostot (esim. vanhemmat tiedostot) käytetään harvemmin ja siksi olisi hyödyllistä säästää levytilaa pakkaamalla niitä. Tämän työn tekeminen,&lt;tiedoston NameRegex&gt; on vastattava pakattuja eikä pakattuja tiedostojen nimiä, esim.\\*Tai.\\*&gt;.nc (|&gt;.gz) (jossa rynnäkkönen määrittää, että.gzon valinnainen.
     
* On hyvä, jos pakkaat tai puristat tiettyjä tiedostoja kokoelmassa milloin tahansa.
Jos aineistoa ei käytetä [&lt;Päivitä kaikki ns. (#updateeverynmillis) Aseta tietoaineiston[Lippu](/docs/server-admin/additional-information#flag)kertomaanERDDAP™tietojen lataaminen uudelleen ja siten muutosten huomaaminen. Mielenkiintoista, voit käyttää erilaisia pakkaus algoritmeja ja asetuksia eri tiedostoja samassa aineistossa. (esim..bz2harvoin käytettyjä tiedostoja,.gzei usein käytettyjä tiedostoja, eikä pakkausta usein käytettyjä tiedostoja) Varmista, että regex tukee kaikkia käytössä olevia tiedostolaajennuksia, esim..nc (|&gt;.gz|&gt;.bz2) .
     
* Tietenkin pakkaussuhteet ja nopeudet eri puristusalgoritmeille vaihtelevat lähdetiedoston ja asetukset. (Esimerkki: Pakkaustaso) . Jos haluat optimoida tämän järjestelmän tiedostoillesi, tee testi eri pakkausmenetelmistä tiedostoillasi ja useilla pakkausasetuksilla. Jos haluat luotettavasti (Ei välttämättä paras) Asennus, suosittelemme hiemangzip  (.gz) .gzipÄlä tee pienintä pakattua tiedostoa (Se on kohtuullisen lähellä) Se puristaa tiedoston nopeasti ja (tärkeämmäksiERDDAP™Käyttäjät) Masentaa tiedostoa erittäin nopeasti. Plus,gzipOhjelmisto on standardoitu jokaisella Linux- ja Mac OS -asennuksella ja se on helposti saatavilla Windowsille ilmaisilla työkaluilla, kuten 7Zip- ja Linux-lisäosat, kuten Git Bash. esimerkiksi pakkaamaan lähdetiedostoa.gztiedoston versio (sama nimi, mutta.gzliitetty) käyttää (Linux, Mac OS ja Git Bash)   
    gzip  *sourceName*   
masentaa a.gzPalauta alkuperäiseen, käytä
Ampuminen *sourceName.gz*   
Jos haluat pakata kaikki hakemiston ja sen aliohjaimien lähdetiedostot, toistuvasti, käytä
    gzipR *Ohjaaja*   
masentaa jokaista.gztiedostot hakemistossa ja sen aliohjeissa, toistuvasti, käytä
Ase - R *Ohjaaja*   
     
* Varoitus: Älä ulkoisesti purista (gzip) tiedostot, jotka on jo sisäisesti pakattu&#33;
Monet tiedostot ovat jo pakattu sisäisesti. Jos sinägzipNämä tiedostot eivät ole paljon pienempiä (&lt;5 %) jaERDDAP™Ne tuhlaavat aikaa, kun niitä pitää lukea. Esimerkiksi:
    
    * tiedostot: esim..nc4 ja.hdf5 tiedostoa: Jotkut tiedostot käyttävät sisäistä pakkausta; jotkut eivät. Miten kertoa: Painetuilla muuttujilla on "ChunkSize" ominaisuuksia. myös, jos ryhmän.nctai tai.hdfKaikki tiedostot ovat erilaisia kokoja, ne ovat todennäköisesti sisäisesti pakattu. Jos ne ovat saman kokoisia, ne eivät ole sisäisesti pakattuja.
    * kuvatiedostot: .gif, .jpg ja .png
    * Audiotiedostot: .mp3 ja .ogg.
    * Videotiedostot: .mp4, .ogv ja .webm.
    
        
Yksi onneton outo tapaus: .wav-äänitiedostot ovat valtavia eivätkä sisäisesti pakattuja. Olisi kiva pakata (gzip) ne, mutta yleensä sinun ei pitäisi, koska jos teet, käyttäjät eivät voi pelata pakattuja tiedostoja selaimessaan.
     
* Testaus: Pakkaaminen (kanssagzip) tietoja, joissa on 1523 gridded.nctiedostoja.
    
    * Lähteen tiedostojen tiedot olivat karkeita (Paljon puuttuvia arvoja) .
    * Kokonaislevytila oli 57 Gt ennen puristusta 7 GB:hen.
    * Pyyntö monelle datalle yhdestä ajankohdasta on&lt;1 s ennen ja jälkeen puristus.
    * 1 tietopiste 365 aikapistettä (Pahin tapaus) Siirtyi 4-71 s.
         
    
Minulle se on kohtuullinen kaupankäynti mihin tahansa tietoaineistoon ja varmasti tietoaineistoihin, joita käytetään harvoin.
     
* Sisäinen versus ulkoinen sorto -
Verrattuna sisäiseen tiedostopakkaukseen, jonka tarjoaa.nc4 ja.hdf5 tiedostoa,ERDDAPUlkoisesti pakattujen binääritiedostojen lähestymistapa tarjoaa etuja ja haittoja. Haittapuolena on: yhden tiedoston pienen osan lukeminen, sisäinen pakkaus on parempi, koskaEDDGridFiles tarvitsee vain masennuksen muutaman (s) tiedostosta, ei koko tiedostosta. Mutta kuitenkinERDDAP"Lähestymistavalla on joitakin etuja:
    
    *   ERDDAP™tukee kaikentyyppisten tietotiedostojen pakkaamista (Binaari ja ei-binaari, esim..nc3 ja .csv) Ei vain.nc4 ja.hdf4.4.
    * Jos suurin osa tiedostosta on luettava useammin kuin kerran lyhyessä ajassa, se säästää aikaa purkaa tiedostoa kerran ja lukea sitä monta kertaa. Näin tapahtuuERDDAP™kun käyttäjä käyttää Make-A-Graph-tiedostoa ja tekee sarjan pieniä muutoksia kaavioon.
    * Kyky saada pakattuja tiedostoja eikä pakattuja tiedostoja samassa kokoelmassa, antaa sinulle enemmän hallintaa siitä, mitkä tiedostot on pakattu ja mitkä eivät. Tämä lisäohjain tulee ilman, että lähdetiedostoa muokataan. (koska voit pakata tiedoston esimerkiksi,.gzJa sitten poistaa se saada alkuperäinen tiedosto) .
    * Kyky muuttaa milloin tahansa, onko tietty tiedosto pakattu ja miten se on pakattu. (erilaiset algoritmit ja asetukset) Se antaa sinulle enemmän kontrollia järjestelmän toimivuudesta. Voit helposti palauttaa alkuperäisen pakkaamattoman tiedoston milloin tahansa.
    
Vaikka kumpikaan ei ole voittaja kaikissa tilanteissa, on selvää, ettäERDDAPkyky palvella ulkoisesti pakattujen tiedostojen tietoja tekee ulkoisesta pakkauksesta kohtuullisen vaihtoehdon sisäiselle pakkaukselle, jota tarjotaan..nc4 ja.hdf5.5. Tämä on tärkeää, koska sisäinen pakkaus on yksi tärkeimmistä syistä, miksi ihmiset haluavat käyttää..nc4 ja.hdf5.5.
     
##### Masentunut kätkö{#decompressed-cache} 
ERDDAP™tekee masennuksen minkä tahansa pakatun binaarin (esim..nc) Tiedostotiedosto, kun sen on luettava tiedosto. Maksetut tiedostot säilytetään tietoaineiston hakemistossa *isovanhemmat* masentunut/ Masennustiedostot, joita ei ole käytetty äskettäin, poistetaan vapauttamaan tilaa, kun kumulatiivinen tiedostokoko on &gt; 10GB. Voit muuttaa sitä asettamalla&lt;Masentunut CacheMaxGB (Oletusarvo = 10) Tietokoneissa Xml.xml, esim.
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
Myös maksetut tiedostot, joita ei ole käytetty viimeisen 15 minuutin aikana, poistetaan jokaisen suuren tietoaineiston latauksen alussa. Voit muuttaa sitä asettamalla&lt;Masentunut CacheMaxMinutesOld (Oletusarvo = 15) Tietokoneissa Xml.xml, esim.
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
Suuremmat luvut ovat mukavia, mutta purkautuneiden tiedostojen kumulatiivinen koko voi aiheuttaa *isovanhemmat* pois levytilasta, joka aiheuttaa vakavia ongelmia.
     
* Koska tiedoston purkaminen voi viedä paljon aikaa (0,1-10 sekuntia) , tietoaineistot, joissa on pakattuja tiedostoja, voivat hyötyä tietojen asettamisesta [&lt;nthreads » (#nthreads) Korkeampi määrä (2? 3? 4?) . Haittapuolet vielä suurempiin lukuihin (Esimerkki: 5? 6? 7?) Vähentää palautusta ja että käyttäjän pyyntö voi sitten käyttää suuren osan järjestelmän resursseista, mikä hidastaa huomattavasti muiden käyttäjien pyyntöjen käsittelyä. Näin ollen ei ole olemassa ihanteellista nThreads-asetusta, vain erilaisia seurauksia eri tilanteissa eri asetusten.
         
#### Dimension arvot{#sorted-dimension-values} 
Kunkin ulottuvuuden arvot on määriteltävä järjestyksessä. (ylösnousemus tai laskeutuminen, paitsi ensimmäinen (Vasemmisto) ulottuvuus, joka nousee) . Arvot voidaan asettaa epäsäännöllisesti. Ei voi olla siteitä. Tämä on vaatimus[CF:n metatiedot](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Jos minkään ulottuvuuden arvot eivät ole lajitellussa järjestyksessä, aineistoa ei ladata jaERDDAP™tunnistaa lokitiedoston ensimmäisen arvon, *isovanhemmat* /logs/log.txt.
    
Rajoittamattomat ulottuvuudet osoittavat lähes aina ongelman lähdeaineiston kanssa. Tämä tapahtuu yleisimmin, kun väärin nimetty tai sopimaton tiedosto sisältyy aggregaatioon, joka johtaa häiriöttömään ajan ulottuvuuteen. Tämän ongelman ratkaisemiseksi katso virheilmoitusERDDAP™Lo.txt-tiedosto, joka etsii loukkaavan ajan arvoa. Katso lähdetiedostoja löytää vastaava tiedosto (Yksi ennen tai yksi jälkeen) Se ei kuulu aggregaatioon.
    
#### Johtajat{#directories} 
Tiedostot voivat olla yhdellä hakemistolla tai hakemistolla ja sen aliohjaimilla. (toistuvasti) . Jos tiedostoja on paljon (Esimerkiksi &gt; 1000) käyttöjärjestelmä (ja sitenEDDGridFilejä) Toimii paljon tehokkaammin, jos tallennat tiedostot aliohjaussarjaan. (1 vuosi tai yksi kuukaudessa tiedostojen kanssa) Koskaan ei ole valtavaa määrää tiedostoja tietyssä hakemistossa.
     
#### &lt;CacheFromUrl &gt;{#cachefromurl} 
Kaikki Kaikki Kaikki KaikkiEDDGridFromFiles ja kaikki EDDTableFromFiles-aineistot tukevat sarjaa tunnisteita, jotka kertovatERDDAP™ladata ja säilyttää kopio kaikista etätietoaineiston tiedostoista tai muutaman tiedoston välimuisti (Ladattu tarpeen mukaan) . Tämä voi olla uskomattoman hyödyllistä. Nähdään[Cash Url dokumentointi](#cachefromurl).
    
#### Etäosastot ja HTTP Range -pyynnöt{#remote-directories-and-http-range-requests} 
 (AKA Byte Serving, Byte Range Requests, Accept-Ranges (käytetty)httpPää)   
EDDGridFromNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles ja EDDTableFromNcFiles voivat *Joskus joskus joskus joskus joskus joskus* palvelintiedot.nctiedostot etäpalvelimilla ja HTTP:n kautta, jos palvelin tukee[Byte-palvelin](https://en.wikipedia.org/wiki/Byte_serving)HTTP-tarjouspyyntöjen kautta (HTTP-mekanismi tavun tarjoiluun) . Tämä on mahdollista, koska netcdf-java (jonkaERDDAP™käyttää lukemiseen.nctiedostoja) Tukee etäisten tietojen lukemista.nctiedostot HTTP-välipyyntöjen kautta.

 **Älä tee tätä&#33;** Se on erittäin tehoton ja hidas.
Sen sijaan käytä [&lt;CacheFromUrl &gt; järjestelmä (#cachefromurl) .

SaavuttaminenERDDAP™Tiedot tiedostoina sivuvälipyyntöjen kautta -
Klikkaa tätä ympärillesi, koska voit (Teoriassa) Ajattele aineistoaERDDAP™kuin jättiläinen.nctiedoston liittämällä ".nc"Perustuen pohjaanDAPURL-osoite tietylle tietoaineistolle (esim. https://myserver.org/erddap/griddap/datasetID.nc ja myös lisäämällä "kyselyn sen jälkeen, jotta voidaan määrittää osa-alue) On ehkä järkevää kysyä, voitko käyttää netcdf-javaa.FerretTai joku muuNetCDFAsiakasohjelmisto lukee dataa HTTP Range PyynnötERDDAP. Vastaus on ei, koska ei todellakaan ole valtavaa..nc&gt; tiedosto. Jos haluat tehdä tämän, tee jokin näistä vaihtoehdoista:

* Käytä(OPeN)DAPAsiakasohjelmistot yhdistävät verkkopalveluihin, joita tarjotaanERDDAP. Tämä on mitäDAP  (ja sitenERDDAP) oli suunniteltu. Se on erittäin tehokasta.
* Lataa lähdetiedosto (s) From the"files"Järjestelmäjärjestelmä (tai aliryhmätiedoston kautta.nc?? Kysely) tietokoneellesi ja käytä netcdf-javaaFerretTai joku muuNetCDFAsiakasohjelmisto lukee (Nyt nyt) Paikallinen tiedosto (s) .
         
#### Cached Tiedot{#cached-file-information} 
Kun jokuEDDGridFiles-aineisto on ensin ladattu,EDDGridFromFiles lukee tietoja kaikista asiaankuuluvista tiedostoista ja luo taulukoita (Yksi rivi jokaiseen tiedostoon) Tietoa jokaisesta tiedostosta ja jokaisesta "huonosta" (Erilainen tai mitätön) tiedosto.
* Pöydät on myös tallennettu levylle, kutenNetCDFv3.nctiedostot sisään *isovanhemmat* /Dataase/ *Last2CharsOfDatasetID* // *datasetID* tiedostoissa nimetty:
Likainen.nc  (jolla on luettelo ainutlaatuisista hakemiston nimistä) ,
tiedostotiedosto Pöytäpöytä.nc  (joka pitää taulukon kunkin voimassa olevan tiedoston tiedoilla) ,
Badfiilejä.nc  (joka pitää taulukon jokaisen huonon tiedoston tiedoilla) .
* nopeuttaa pääsyäEDDGridLähde: Files Dataset (Kustannuksella käyttää enemmän muistia) Voit käyttää
>   [<fileTableInMemory>true</fileTableInMemory>](#filetableinmemory)  
kertomaanERDDAP™säilyttää kopio tiedostojen tietotaulukoista muistissa.
* Tiedostotietotaulukoiden kopio on myös hyödyllinen, josERDDAP™on suljettu ja uudelleenkäynnistetty: se pelastaaEDDGridFiles joutuu lukemaan kaikki tiedostot uudelleen.
* Kun aineistoa ladataan,ERDDAP™Sinun tarvitsee vain lukea tiedot uusista tiedostoista ja tiedostoista, jotka ovat muuttuneet.
* Jos tiedosto on erilainen kuin muut tiedostot (Esimerkiksi jokin muuttujan tietotyyppi tai erilainen arvo "[Yksiköt](#units)attribuutti) ,ERDDAPLisää tiedosto luetteloon "huonot" tiedostot. Tiedot tiedoston ongelmasta kirjoitetaan *isovanhemmat* /logs/log.txt-tiedosto.
* Sinun ei tarvitse koskaan poistaa tai työskennellä näiden tiedostojen kanssa. Yksi poikkeus on: jos teet muutoksia aineistoondatasets.xmlVoit halutessasi poistaa nämä tiedostot pakottaaksesiERDDAP™Lue kaikki tiedostot uudelleen, koska tiedostot luetaan / tulkitaan eri tavalla. Jos haluat poistaa nämä tiedostot, voit tehdä sen, kunERDDAP™Juoksen. (Sitten asetetaan yksi[Lippu](/docs/server-admin/additional-information#set-dataset-flag)Lataa ASAP-tiedot uudelleen.) Kuitenkin,ERDDAP™yleensä huomaa, ettädatasets.xmlTiedot eivät vastaa tiedostoa Pöytätiedot ja poistaa tiedostotaulukot automaattisesti.
* Jos haluat kannustaaERDDAP™tallennettujen tietoaineistojen päivittäminen (Esimerkiksi, jos olet juuri lisännyt, poistanut tai muuttanut joitakin tiedostoja tietoaineiston hakemistoon.) käyttää[Lippujärjestelmä](/docs/server-admin/additional-information#flag)pakottaaERDDAP™päivittää tallennettuja tiedostoja.
         
#### Käsittelypyynnöt{#handling-requests} 
Kun asiakkaan tietopyyntöä käsitellään,EDDGridFromFiles voi nopeasti katsoa taulukkoon kelvolliset tiedostotiedot nähdäkseen, mitkä tiedostot ovat pyydettyjä tietoja.
     
#### Cached File -tietojen päivitys{#updating-the-cached-file-information} 
Kun tietoaineistoa ladataan uudelleen, tallennetut tiedostotiedot päivitetään.
    
* Rekisteröidyt tiedot ladataan määräajoin määritettynä&lt;palauttaa kaikkiNMinutes &gt; aineiston tiedotdatasets.xml.
* Tiedot ladataan uudelleen mahdollisimman pianERDDAP™havaita, että olet lisännyt, poistanut,[Koskettaminen](https://en.wikipedia.org/wiki/Touch_(Unix)) (Muuttaa tiedoston viimeinen Muutettu aika) tai muuttanut datatiedostoa.
* Tiedot ladataan mahdollisimman pian, jos käytät[Lippujärjestelmä](/docs/server-admin/additional-information#flag).

Kun aineisto on ladattu,ERDDAP™Vertaa nykyisiä saatavilla olevia tiedostoja tallennettuihin tiedostoihin. Uusia tiedostoja luetaan ja lisätään valid-tiedostotaulukkoon. Tiedostot, joita ei enää ole, poistetaan voimassa olevasta tiedostotaulukosta. Tiedostoja, joissa tiedoston aikaleima on muuttunut, luetaan ja niiden tiedot päivitetään. Uudet pöydät korvaavat vanhat pöydät muistissa ja levyllä.
     
#### Huonot tiedostot{#bad-files} 
Huonojen tiedostojen taulukko ja syyt, miksi tiedostot julistettiin huonoiksi (korruptoitunut tiedosto, puuttuvat muuttujat jne.) on lähetetty sähköpostiin Kaikki kaikessa Sähköpostiosoite (Ehkä sinä) Joka kerta, kun aineistoa ladataan uudelleen. Nämä tiedostot on vaihdettava tai korjattava mahdollisimman pian.
     
#### Kadonneet muuttujat{#missing-variables} 
Jos osa tiedostoista ei ole osadataVariables on määritelty aineistossadatasets.xmlChunk, se on ihan ok. MilloinEDDGridFromFiles lukee yhden näistä tiedostoista, se toimii kuin tiedosto olisi muuttuja, mutta kaikki puuttuvat arvot.
     
#### FTP Trouble/Advice{#ftp-troubleadvice} 
Jos olet FTP:n uusi tietotiedostoERDDAP™palvelimen aikanaERDDAP™juokseminen, on mahdollisuus, ettäERDDAP™Rekisteröidään FTP-prosessin aikana. Tämä tapahtuu useammin kuin uskotkaan&#33; Jos näin tapahtuu, tiedosto näyttää olevan voimassa. (Hänellä on voimassa oleva nimi) Tiedosto ei ole vielä voimassa. JosERDDAP™yrittää lukea tietoja siitä mitättömästä tiedostosta, mikä johtaa siihen, että tiedosto lisätään mitättömien tiedostojen taulukkoon. Se ei ole hyvä. Tämän ongelman välttämiseksi käytä tilapäistä tiedostonimeä, kun FTP on tiedostossa, esimerkiksi ABC2005..nc• Temps, sitten tiedostonameregex-testi (Katso alapuolelta) Se osoittaa, että tämä ei ole relevantti tiedosto. Kun FTP-prosessi on valmis, nimeä tiedosto uudelleen oikeaan nimeen. Uudelleenmääritysprosessi saa tiedoston ajankohtaiseksi hetkessä.
     
#### "0 tiedostoa" Virheellinen viesti{#0-files-error-message-1} 
Jos juokset[GenerateDatasetsXml](#generatedatasetsxml)tai tai[Dasds](#dasdds)tai jos yrität ladataEDDGridLähde: Files Dataset InERDDAP™saat "0 tiedostoa" -virheviestin, joka osoittaa, ettäERDDAP™Hakemistossa 0 tiedostoa (kun luulet, että hakemistossa on vastaavat tiedostot) :
    * Tarkista, että tiedostot ovat todella tässä hakemistossa.
    * Tarkista hakemiston nimi.
    * Katso tiedosto NameRegex. On todella helppoa tehdä virheitä regekseillä. Kokeile testaustarkoituksiin regexiä, joka vastaa kaikkia tiedostonimiä. (Näe tämä[Regex-dokumentointi](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)ja[Regex Tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * Tarkista, että ohjelman käyttäjä on (Käyttäjä = Tomcat (??) Tomcat/ERDDAP) on "lukenut" näihin tiedostoihin.
    * Joissakin käyttöjärjestelmissä (Esimerkiksi SELinux) Järjestelmäasetuksista riippuen ohjelman käyttäjällä on oltava "lue"-lupa koko hakemistojen ketjulle, joka johtaa tiedostojen hakemistoon.
         
#### EDDGridLähde: Files Skeleton XML{#eddgridfromfiles-skeleton-xml} 
*    **Skeleton XML** KaikilleEDDGridFiles subclasses on:

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

### EDD *FromAudiofiilit{#eddfromaudiofiles} 
 **EDDGridAudiofiilejä** ja **EDDTableFromAudiofiilit** kerätä tietoja paikallisten äänitiedostojen kokoelmasta. (Ensimmäiset esiintyivätERDDAP™v1.82.) Ero on se, ettäEDDGridFromAudioFiles käsittelee tietoja moniulotteisena tietoaineistona (Yleensä kaksi ulottuvuutta:\\[tiedoston käynnistys Aika-aika\\]ja\\[Evankeliumi Aika tiedoston sisällä\\]) EDDTableFromAudioFiles käsittelee dataa tabulaarina (yleensä sarakkeilla tiedoston käynnistysaika, elapsedTime tiedoston kanssa ja äänikanavien tiedot) .EDDGridFromAudioFiles edellyttää, että kaikilla tiedostoilla on sama määrä näytteitä, joten jos se ei ole totta, sinun on käytettävä EDDTableFromAudioFilesiä. Muuten EDD-tyypin valinta on täysin sinun valintasi. Yksi etu EDDTableFromAudioFiles: voit lisätä muita muuttujia muilla tiedoilla, esimerkiksistationIDStationType. Molemmissa tapauksissa yhdistetyn aikamuuttujan puute vaikeuttaa näiden EDD-tyyppien tietojen kanssa työskentelyä, mutta ei ollut hyvä tapa perustaa yhtenäistä aikamuuttujaa.

Katso tämän luokan superluokka,[EDDGridFilejä](#eddgridfromfiles)ja[EDDTableFromfiilit](#eddtablefromfiles)Yleistä tietoa siitä, miten luokka toimii ja miten sitä käytetään.

Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Koska äänitiedostoilla ei ole muita metatietoja kuin äänitietojen koodaukseen liittyviä tietoja, sinun on muokattava GenerateDatasets -tuotteen tulos. XML antaa olennaisia tietoja (esimerkiksi otsikko, yhteenveto,creator\\_nameinstituutio, historia) .

Yksityiskohdat:

* On olemassa useita audiotiedostomuotoja. Tällä hetkellä,ERDDAP™Voit lukea tietoja useimmista .wav- ja .au-tiedostoista. Tällä hetkellä se ei voi lukea muita äänitiedostoja, kuten .aiff tai .mp3. Jos tarvitset tukea muihin äänitiedostomuotoihin tai muihin versioihin .wav ja .au, lähetä pyyntösi Chris. Johannes osoitteessa Noaa.gov. Tai työvälineenä, jota voit käyttää juuri nyt, voit muuntaa äänitiedostosi PCM:ksi. Hyvää (Integer-tiedot) PCM = Loat (kelluvan pisteen tiedot) .wav-tiedostoja niin, ettäERDDAP™voi työskennellä heidän kanssaan.
* Tällä hetkellä,ERDDAP™Voit lukea audiotiedostoja, joilla onJavaAudioFormat -luokka kutsuu PCM ́FLOATia, PCM ́SIGNEDia, PC ́SIGNEDia, ALAWia ja ULAW-koodeja.ERDDAP™muuntaa PCM-arvot (Esimerkiksi 0-255) allekirjoitetut arvot (128 - 128) Järjestämällä bittejä data-arvoissa.ERDDAP™muuntaa ALAW ja ULAW koodattuna alkuperäisestä koodatusta tavusta lyhyeksi (16) arvoja. Siitä lähtienJavaBigEndian = aito dataERDDAP™Järjestää BigEndian=false-tietojen tavut (Pieni endoriitti) lukea arvot oikein. Kaikille muille koodeille (PCM) ,ERDDAP™Lue tiedot sellaisena kuin se on.
* MilloinERDDAP™lukee dataa äänitiedostoista, se muuntaa tiedoston käytettävissä olevan äänimetadan globaaleihin ominaisuuksiin. Tämä sisältää aina (Näytteen arvot näkyvät) 
    
AudioBigEndian "väärä"; //true or false
Sisään Audio kanavat 1;
AudioEncoding "PCM" (PCM)IGNED);
audioFrameRate 96000.0; //
Int audioFrameSize 2; / / # tietojen tavut / kehys
AudioSampleRate 96000.0; //
int audioSampleSizeInBits 16; //# bittiä per näyte
    
For ForERDDAP"Tarkoitus, kehys on synonyymi näytteelle, joka on tiedot kerrallaan.
attribuutit sisälläERDDAP™Saat tiedot, jotka kuvaavat tietoja, kuten ne olivat lähdetiedostoissa.ERDDAP™Nämä tiedot ovat usein muuttuneet, kun tietojen lukeminen, esim. PCM_UNSIGNED, ALAW ja ULAW-koodatut tiedot muunnetaan PCM \\SIGNED, ja bigEndian=false data muunnetaan bigEndian=true dataksi. (Mikä on mitenJavahaluaa lukea sen) . Loppujen lopuksi data-arvotERDDAP™tulee aina olemaan[PCM-koodattu](https://en.wikipedia.org/wiki/Pulse-code_modulation)Datan arvot (Yksinkertaiset digitoidut näytteet ääniaallosta) .
* MilloinERDDAP™lukee audiotiedostoja, lukee koko tiedoston.ERDDAP™Voit lukea jopa 2 miljardia näytettä per kanava. Esimerkiksi, jos näytteenotto on 44 100 näytettä sekunnissa, 2 miljardia näytettä käännetään noin 756 minuuttia äänitietoja tiedostoa kohden. Jos sinulla on äänitiedostoja, joissa on enemmän kuin tämä tietomäärä, sinun on hajotettava tiedostot pienemmiksi palkoiksi.ERDDAP™voi lukea niitä.
* Koska koskaERDDAP™Lue kaikki audiotiedostot,ERDDAP™Sinulla on oltava pääsy suureen muistiin suurten äänitiedostojen kanssa. Näytä[ERDDAPMuistiasetukset](/docs/server-admin/deploy-install#memory). Jälleen, jos tämä on ongelma, työpaikka, jota voit käyttää juuri nyt, on hajottaa tiedostot pienempiin naarmuihin niin, ettäERDDAP™Niitä voi lukea vähemmän muistilla.
* Osa äänitiedostoista on kirjoitettu väärin.ERDDAP™Pieni ponnistus tällaisten tapausten käsittelyyn. yleensä, kun on virhe,ERDDAP™Heittää poikkeuksen (Hylkää tämä tiedosto) tai tai (Jos virhe on huomaamaton) Lue dataa (Tiedot ovat virheellisiä) .
*   ERDDAP™ei tarkista tai muuta äänenvoimakkuutta. Ihannetapauksessa kokonaisäänitiedot skaalataan koko tietotyypin valikoiman käyttämiseksi.
* Audio- ja äänitiedostoilla ei ole järjestelmää puuttuville arvoille. (-999 tai Float.NaN) . Äänitiedoilla ei saisi olla puuttuvia arvoja. Jos arvoja puuttuu (esim. jos haluat pidentää äänitiedostoa) Käytä 0-sarjaa, joka tulkitaan täydelliseksi hiljaisuudeksi.
* MilloinERDDAP™lukee dataa äänitiedostoista, se luo aina sarakkeen, jota kutsutaan vanhentuneeksi. Aika jokaiselle näytteelle, sekunneissa (Tallenna kaksinkertainen) suhteessa ensimmäiseen näytteeseen (joka on määritetty vanhentuneeksi Aika = 0,0) . kanssaEDDGridFromAudioFilesista tulee elapsedTime-akselin muuttuja.
*   EDDGridFromAudioFiles edellyttää, että kaikilla tiedostoilla on sama määrä näytteitä. Jos näin ei ole, käytä EDDTableFromAudiofiilejä.
* For ForEDDGridSuosittelemme, että asetat [&lt;ArvotMemory » (#Dimensionvaluesinmemory) Väärin (GenerateDatasets suosittelee XM) Aikamittarilla on usein suuri määrä arvoja.
* For ForEDDGridAudiofiilit, sinun pitäisi lähes aina käyttääEDDGridFiles-järjestelmä[Yhteenveto kautta File Names](#aggregation-via-file-names-or-global-metadata)Melkein aina nauhoituksen alkamispäivä Aika tiedostonimistä. Esimerkiksi,
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
GenerateDatasets XML kannustaa ja auttaa sinua.
* EDDTableFromAudioFiles, sinun pitäisi lähes aina käyttää EDDTableFromFiles järjestelmä[\\*\\**filename pseudosourceNames](#filename-sourcenames)Tietojen ottaminen tiedoston nimestä (Melkein aina aloituspäivä Aika levylle) edistää sitä datan sarakkeeksi. Esimerkiksi,
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Aikamuoto on täsmennettävä yksiköiden ominaisuutena:&lt;att name="units"&gt;yyMdd'"Hmms&lt;&gt;
     
### EDDGridLähde: MergeIRFiles{#eddgridfrommergeirfiles} 
[ **EDDGridLähde: MergeIRFiles** ](#eddgridfrommergeirfiles)koota tietoja paikallisista,[Surgei](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)tiedostoja, jotka ovat peräisin[Trooppisen sateenkaaren mittaaminen (TRMMM) ](https://trmm.gsfc.nasa.gov)NASA:n ja Japan Aerospace Exploration Agencyn yhteinen tehtävä (Jakso) . Yhdistyminen IR-tiedostoja voi ladata[Nasa](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/).

EDDGridFromMergeIRFiles.java on kirjoitettu ja mukanaERDDAP™Käsikirjoittajat Jonathan Lafite ja Philippe Makowski R.Tech Engineering (Lähde: Copyrighted Open Source) .

EDDGridFromMergeIRFiles on hieman epätavallinen:

*   EDDGridFromMergeIRFiles tukee pakattuja tai pakkaamattomia lähdetiedostoja kaikissa yhdistelmissä samassa tietoaineistossa. Näin voit esimerkiksi pakata vanhempia tiedostoja, jotka ovat harvoin saatavilla, mutta pakkaa uusia tiedostoja, jotka ovat usein saatavilla. Voit muuttaa puristustyypin alkuperäisestä. Esimerkiksi Z.gz.
* Jos olet pakannut ja pakkaamaton versio samoista tietotiedostoista samassa hakemistossa, varmista, että&lt;tiedosto NameRegex&gt; for your dataset vastaa tiedostonimiä, jotka haluat sen vastaavan, eikä vastaa tiedostonimiä, joita et halua sen vastaavan.
* Pakkaamattomilla lähdetiedostoilla ei saa olla tiedoston laajennusta ("Ei" tiedostonimellä) .
* Painetuilla lähdetiedostoilla on oltava tiedostolaajennus, muttaERDDAP™määrittää pakkauksen tyypin tarkastamalla tiedoston sisältöä, ei katsomalla tiedoston laajennusta. (Esimerkiksi "Z") . Tuettuja kompressiotyyppejä ovat "gz", "bzip2", "xz", "lzma", "snappy-raw", "snappy-framed", "pack200" ja "z". MilloinERDDAP™lukee pakattuja tiedostoja, se purkautuu lennolla kirjoittamatta tilapäiseen tiedostoon.
* Kaikkien lähdetiedostojen on käytettävä alkuperäistä tiedoston nimitysjärjestelmää: ts. merg *YYYYMMDDHDHD* 4km-pikseli (missä missä *YYYYMMDDHDHD* ilmoittaa tiedoston sisältämiin tietoihin liittyvän ajan) tiedoston laajennus, jos tiedosto on pakattu.

Katso tämän luokan superluokka,[EDDGridFilejä](#eddgridfromfiles)Yleistä tietoa siitä, miten luokka toimii ja miten sitä käytetään.

Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Sen jälkeen voit muokata sitä hienosti.
 
### EDDGridLähde: NCFiles{#eddgridfromncfiles} 
[ **EDDGridLähde: NCFiles** ](#eddgridfromncfiles)aggregoida tietoja paikallisesta, verkosta,[GRIB .grb ja .grb2](https://en.wikipedia.org/wiki/GRIB)tiedostoja,[HDF  (V4 tai v5)  .hdf](https://www.hdfgroup.org/)tiedostoja,[.ncml](#ncml-files)tiedostoja,[NetCDF  (V3 tai v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)tiedostoja ja[Zarr](https://github.com/zarr-developers/zarr-python)tiedostoja (versio 2.25) . Zarr-tiedostot ovat hieman erilaisia ja vaativat joko tiedoston NameRegex tai PathRegex sisällyttää "sarr".

Tämä voi toimia muiden tiedostotyyppien kanssa (Esimerkiksi BUFR) Emme ole vain testanneet sitä, joten lähetä meille joitakin näytetiedostoja.

* GRIB-tiedostoja,ERDDAP™Tekee .gbx-tiedoston ensimmäisen kerran, kun se lukee jokaisen GRIB-tiedoston. Joten GRIB-tiedostojen on oltava hakemistossa, jossa Tomcatin käyttämä "käyttäjä" on lukenut + kirjoittanut luvan.
* Katso tämän luokan superluokka,[EDDGridFilejä](#eddgridfromfiles)Tietoa siitä, miten luokka toimii ja miten sitä käytetään.
* AloitetaanERDDAP™2.12,EDDGridNCFiles jaEDDGridLähde: NCFiles Pakkaamattomat voivat lukea tietoja "rakenteista".nc4 ja.hdf4 tiedostoa. Jotta voidaan tunnistaa muuttuja, joka on peräisin rakenteesta,&lt;sourceName&gt; on käytettävä muotoa: *Täydellinen nimi* | *Jäsen* Esimerkkinä ryhmä1/myStruct|MyMember.
* Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Sen jälkeen voit muokata sitä hienosti.
    
#### Ryhmät Gridded Nc Files{#groups-in-gridded-nc-files} 
    [Netcdf4-tiedostot voivat sisältää ryhmiä.](#groups-in-gridded-nc-files) ERDDAP™Tekee vain tietoaineiston yhdestä ryhmästä ja kaikista sen emoryhmistä. Voit määrittää ryhmän nimen GenerateDatasetsissa. XM (Jätä Trailing Slash) tai käyttää " GenerateDatasets" Xml etsii kaikki muuttujien ryhmät, jotka käyttävät eniten mittoja tai käyttävät niitä.\\[juuret\\]GenerateDatasets etsii vain muuttujia juuriryhmässä.
    
Ensimmäinen asia, jonka GenerateDatasetsXml tekee tällaiselle tietoaineistolle vastatessasi kysymyksiin, on tulostaa näytetiedoston ncdump-mainen rakenne. Joten jos syötät muutaman goofy-vastauksen ensimmäiselle kierrokselle GenerateDatasetsin kautta. Vähintään XML:ssä voit nähdä, josERDDAP™Voit lukea tiedoston ja katsoa, mitä mitat ja muuttujat ovat tiedostossa. Sitten voit antaa parempia vastauksia toiselle kierrokselle GenerateDatasetsXmlin kautta.
    

### EDDGridLähde: NCFiles Unpacked{#eddgridfromncfilesunpacked} 
[ **EDDGridLähde: NCFiles Unpacked** ](#eddgridfromncfilesunpacked)Se on variantti[EDDGridLähde: NCFiles](#eddgridfromncfiles)joka kerää tietoja paikallisesta, verkostaNetCDF  (V3 tai v4)  .ncliittyviä tiedostoja. Erona on, että luokka purkaa kaikki tiedostot ennenEDDGridFiles katsoo tiedostoja:

* Pakkaa muuttujia, jotka on pakattu[scale\\_factorja/taiadd\\_offset](#scale_factor).
* Se muuntaa arvoa jamissing\\_valueArvot olla Nan (tai MAX_VALUE integer -tietotyypit) .
* Se muuntaa aika- ja aikaleima-arvot"seconds since 1970-01-01T00:00:00Z".

Tämän luokan suurin etu on, että se tarjoaa tavan käsitellä erilaisia arvoja.scale\\_factor,add\\_offset&gt; &gt; arvo,missing\\_valuetai aikayksikköjä eri lähdetiedostoissa kokoelmassa. Muussa tapauksessa sinun on käytettävä työkalua, kuten[NCML](#ncml-files)tai tai[NCO](#netcdf-operators-nco)muuttaa kunkin tiedoston erojen poistamiseksi, jotta tiedostot voidaan käsitelläEDDGridLähde: NCFiles. Jotta tämä luokka toimisi kunnolla, tiedostojen on noudatettava CF-standardeja.

* Jos yrittää tehdäEDDGridLähde: NCFiles Pakkaamaton ryhmä tiedostoja, joiden kanssa olet aiemmin kokeillut ja epäonnistunutEDDGridNCFiles, CD
     *isovanhemmat* /Dataase/ *Last2Letters* // *datasetID* //
missä missä *Last2Letters* Kaksi viimeistä kirjaintadatasetID,
Poista kaikki tiedostot tässä hakemistossa.
* AloitetaanERDDAP™2.12,EDDGridNCFiles jaEDDGridLähde: NCFiles Pakkaamattomat voivat lukea tietoja "rakenteista".nc4 ja.hdf4 tiedostoa. Jotta voidaan tunnistaa muuttuja, joka on peräisin rakenteesta,&lt;sourceName&gt; on käytettävä muotoa: *Täydellinen nimi* | *Jäsen* Esimerkkinä ryhmä1/myStruct|MyMember.
* Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Sen jälkeen voit muokata sitä hienosti.
    
Netcdf4-tiedostot voivat sisältää ryhmiä. Näytä[Tämä dokumentti](#groups-in-gridded-nc-files).
    
Ensimmäinen asia, jonka GenerateDatasetsXml tekee tällaiselle tietoaineistolle vastatessasi kysymyksiin, on tulostaa näytteen ncdump-mainen rakenne. **Ennen ennen** Se on pakkaamaton. Joten jos syötät muutaman goofy-vastauksen ensimmäiselle kierrokselle GenerateDatasetsin kautta. Vähintään XML:ssä voit nähdä, josERDDAP™Voit lukea tiedoston ja katsoa, mitä mitat ja muuttujat ovat tiedostossa. Sitten voit antaa parempia vastauksia toiselle kierrokselle GenerateDatasetsXmlin kautta.
    
### EDDGridLonPM180{#eddgridlonpm180} 
[ **EDDGridLonPM180** ](#eddgridlonpm180)muuttaa lapsen pituusarvoja (Suljettu)  EDDGridtietoja, joiden pituusarvo on suurempi kuin 180 (Esimerkiksi 0-360) niin, että ne ovat alueella - 180 - 180 (Longitude Plus tai Minus 180, joten nimi) .

* Tämä tarjoaa tavan tehdä tietoaineistoja, joiden pituusarvot ovat yli 180 yhteensopiviaOGCPalvelupalvelut (EsimerkiksiWMSPalvelin sisäänERDDAP) Koska kaikkiOGCPalvelut vaativat pituusarvoja vuosina 180–180.
* Työskentely keskeyttämisen läheisyydessä aiheuttaa ongelmia riippumatta siitä, onko keskeyttäminen pituus 0 vai pituus 180. Tämän tiedostotyypin avulla voit välttää nämä ongelmat kaikille tarjoamalla kaksi versiota samasta tietoaineistosta:
yksi, jolla on pituusarvot välillä 0-360 (Tyynenmeren alue?) ,
Yksi, jolla on pituusarvot alueella -180 - 180 ("Atlantistinen"?) .
* Lapsitietokannoille, joiden pituusarvot ovat yli 180, kaikki uudet pituusarvot ovat vain 360 astetta pienempiä. Esimerkiksi aineisto, jonka pituusarvot ovat 180–240, muuttuu aineistoksi, jonka pituusarvot ovat -180–120.
* lapsille, joilla on pitkät arvot koko maailmassa (Noin 0-360) Uusi pituusarvo järjestetään uudelleen (karkeasti) 180–180:
Alkuperäiset 0–180 arvoa eivät muutu.
Alkuperäiset 180-360 arvoa muunnetaan -180-0 ja siirretään pituussarjan alkuun.
* 180-vuotiaille lapsille, jotka eivät kata maailmaa,ERDDAP™lisätä puuttuvat arvot tarpeen mukaan, jotta saadaan tietoaineisto, joka kattaa maapallon. Esimerkiksi lapsitietokanta, jonka pituusarvot ovat 140–200, muuttuu aineistoksi, jonka pituusarvot ovat -180–180.
Lapsiarvot 180-200 olisivat -180 - -160.
Uusia pituusarvoja lisätään -160:stä 140:een. Vastaavat data-arvot ovat \\-Fill-arvoja.
140–180 lapsen arvot eivät muutu.
Kadonneiden arvojen lisääminen voi tuntua oudolta, mutta se välttää useita ongelmia, jotka johtuvat pituusarvoista, jotka hyppäävät yhtäkkiä. (Esimerkkinä -160 - 140) .
* Sisällä[GenerateDatasetsXml](#generatedatasetsxml)On olemassa erityinen "tietotyyppi",EDDGridLonPM180FromErddapCatalog, jonka avulla voit luodadatasets.xmlforEDDGridLonPM180 aineistoa jokaisestaEDDGridTietoja eräässäERDDAPPituusarvot ovat yli 180. Tämä mahdollistaa näiden aineistojen kahden version tarjoamisen:
alkuperäiset, joiden pituusarvot ovat 0-360,
Uusi tietokanta, jonka pituusarvot vaihtelevat -180 - 180.
    
Lapsitiedot jokaisessaEDDGridLonPM180-tietokanta onEDDGridErddap-tietokanta, joka viittaa alkuperäiseen tietoaineistoon.
Uusien aineistojendatasetIDNimi tulee olemaan alkuperäisen tietoaineiston nimi sekä LONPM180.
Esimerkiksi,
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
Laita seEDDGridLonPM180-tietokanta **alapuolella alapuolella** Alkuperäinen tietoaineistodatasets.xml. Näin vältetään mahdolliset ongelmat.
    
Vaihtoehtoisesti voit korvataEDDGridFromErddap-tietokanta alkuperäisen tietoaineiston avulladatasets.xml. Sitten on vain yksi versio aineistosta: yksi, jolla on pituusarvot -180 - 180. Laiminlyömme tätä, koska on aikoja, jolloin jokainen tietoaineiston versio on kätevämpi.
    
* Jos tarjoat kaksi versiota tietoaineistosta, esimerkiksi pituus 0-360 ja pituus -180-180:
    * Voit käyttää valinnaista [&lt;Saatavuus ViaWMS&gt;väärä&lt;/ saavutettavissa ViaWMS&gt; (#accessibleviawms) 0-360-tietokannan avulla voidaan poistaaWMSpalvelua kyseiselle tietoaineistolle. Tällöin vain LonPM180-versio on saatavilla.WMS.
    * On olemassa muutamia tapoja pitää LonPM180-tietokanta ajan tasalla taustalla olevan tietoaineiston muutoksilla:
        * Jos lapsi on aEDDGridFromErddap-tietokanta, joka viittaa tietoaineistoon samassaERDDAP™LonPM180-tietoaineisto pyrkii suoraan tilaamaan taustalla olevan tietoaineiston niin, että se on aina ajan tasalla. Suorat tilaukset eivät luo sähköpostiviestejä, jotka pyytävät sinua vahvistamaan tilauksen - validointi on tehtävä automaattisesti.
        * Jos lapsi ei oleEDDGridTietokanta, joka on samassaERDDAP™LonPM180-tietoaineisto pyrkii käyttämään säännöllistä tilausjärjestelmää taustalla olevan tietoaineiston tilaamiseen. Jos sinulla on tilausjärjestelmäERDDAP™Käytetty, sinun pitäisi saada sähköpostit, jotka pyytävät sinua vahvistamaan tilauksen. Ole hyvä ja tee niin.
        * Jos sinulla on tilausjärjestelmäERDDAP™LonPM180-tietoaineisto on joskus vanhentunut, kunnes LonPM180-tietoaineisto ladataan uudelleen. Jos tilausjärjestelmä on poistettu, sinun on asetettava [&lt;Reload Jokainen minuutti » (#reloadeverynminutes) LonPM180-tietoaineiston asettaminen pienempään määrään, jotta se saa todennäköisemmin muutoksia lapsitietoihin.

#### EDDGridLonPM180 Skeleton XML{#eddgridlonpm180-skeleton-xml} 

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

### EDDGridLon0360{#eddgridlon0360} 
[ **EDDGridLon0360** ](#eddgridlon0360)muuttaa lapsen pituusarvoja (Suljettu)  EDDGridtietoja, joiden pituusarvo on alle 0 (Esimerkiksi -180 - 180) niin, että ne ovat välillä 0-360 (Siksi nimi) .

* Työskentely keskeyttämisen läheisyydessä aiheuttaa ongelmia riippumatta siitä, onko keskeyttäminen pituus 0 vai pituus 180. Tämän tiedostotyypin avulla voit välttää nämä ongelmat kaikille tarjoamalla kaksi versiota samasta tietoaineistosta:
Yksi, jolla on pituusarvot alueella -180 - 180 ("Atlantistinen"?) .
yksi, jolla on pituusarvot välillä 0-360 (Tyynenmeren alue?) ,
* Kaikilla pituusarvoilla varustetuilla lapsitietokannoilla alle 0, kaikki uudet pituusarvot ovat vain 360 astetta korkeampia. Esimerkiksi -180--120 pituusarvoilla varustetusta tietoaineistosta tulee aineisto, jonka pituusarvot ovat 180–240.
* lapsille, joilla on pitkät arvot koko maailmassa (180 - 180) Uusi pituusarvo järjestetään uudelleen (karkeasti) 0-360:
Alkuperäiset -180-0-arvot muunnetaan 180-360 ja siirretään pituussarjan loppuun.
Alkuperäiset 0–180 arvoa eivät muutu.
* lapsille, jotka kattavat lon = 0, mutta eivät kata maailmaa,ERDDAP™lisätä puuttuvat arvot tarpeen mukaan, jotta saadaan tietoaineisto, joka kattaa maapallon. Esimerkiksi lapsitietokanta, jonka pituusarvot ovat -40-20, muuttuu aineistoksi, jonka pituusarvot ovat 0-360.
Lapsen arvot 0–20 olisivat muuttumattomat.
Uusia pituusarvoja lisätään 20:stä 320:een. Vastaavat data-arvot ovat \\-Fill-arvoja.
Lapsiarvot -40-0 olisivat 320-360.
Kadonneiden arvojen lisääminen voi tuntua oudolta, mutta se välttää useita ongelmia, jotka johtuvat pituusarvoista, jotka hyppäävät yhtäkkiä. (esimerkiksi 20-320) .
* Sisällä[GenerateDatasetsXml](#generatedatasetsxml)On olemassa erityinen "tietotyyppi",EDDGridLon0360 ErddapCatalog, jonka avulla voit luodadatasets.xmlforEDDGridLon0360 aineistoa jokaisestaEDDGridTietoja eräässäERDDAPPituusarvot ovat yli 180. Tämä mahdollistaa näiden aineistojen kahden version tarjoamisen:
alkuperäiset, joiden pituusarvot ovat 0-360,
Uusi tietokanta, jonka pituusarvot vaihtelevat -180 - 180.
    
Lapsitiedot jokaisessaEDDGridLon0360-tietokanta onEDDGridErddap-tietokanta, joka viittaa alkuperäiseen tietoaineistoon.
Uusien aineistojendatasetIDNimi tulee olemaan alkuperäisen tietoaineiston nimi sekä "Lon0360".
Esimerkiksi,
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
Laita seEDDGridLon0360 aineisto **alapuolella alapuolella** Alkuperäinen tietoaineistodatasets.xml. Näin vältetään mahdolliset ongelmat.
    
Vaihtoehtoisesti voit korvataEDDGridFromErddap-tietokanta alkuperäisen tietoaineiston avulladatasets.xml. Tällöin aineistosta on vain yksi versio: pituusarvot 0-360. Laiminlyömme tätä, koska on aikoja, jolloin jokainen tietoaineiston versio on kätevämpi.
    
* Jos tarjoat kaksi versiota tietoaineistosta, esimerkiksi pituus 0-360 ja pituus -180-180:
    * Voit käyttää valinnaista [&lt;Saatavuus ViaWMS&gt;väärä&lt;/ saavutettavissa ViaWMS&gt; (#accessibleviawms) 0-360-tietokannan avulla voidaan poistaaWMSpalvelua kyseiselle tietoaineistolle. Tämän jälkeen vain -180-180-versio on käytettävissä.WMS.
    * On olemassa muutamia tapoja pitää Lon0360-tietokanta ajan tasalla taustalla olevan tietoaineiston muutoksilla:
        * Jos lapsi on aEDDGridFromErddap-tietokanta, joka viittaa tietoaineistoon samassaERDDAP™Lon0360-tietoaineisto pyrkii suoraan tilaamaan taustalla olevan tietoaineiston niin, että se on aina ajan tasalla. Suorat tilaukset eivät luo sähköpostiviestejä, jotka pyytävät sinua vahvistamaan tilauksen - validointi on tehtävä automaattisesti.
        * Jos lapsi ei oleEDDGridTietokanta, joka on samassaERDDAP™Lon0360-tietoaineisto pyrkii käyttämään säännöllistä tilausjärjestelmää taustalla olevan tietoaineiston tilaamiseen. Jos sinulla on tilausjärjestelmäERDDAP™Käytetty, sinun pitäisi saada sähköpostit, jotka pyytävät sinua vahvistamaan tilauksen. Ole hyvä ja tee niin.
        * Jos sinulla on tilausjärjestelmäERDDAP™Lon0360-tietoaineisto on joskus vanhentunut, kunnes Lon0360-tietoaineisto ladataan uudelleen. Jos tilausjärjestelmä on poistettu, sinun on asetettava [&lt;Reload Jokainen minuutti » (#reloadeverynminutes) Lon0360-tietoaineiston asettaminen pienempään määrään, jotta se saa todennäköisemmin muutoksia lapsitietoihin.
#### EDDGridLon0360 Skeleton XML{#eddgridlon0360-skeleton-xml} 
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

### EDDGridSideBySide{#eddgridsidebyside} 
[ **EDDGridSideBySide** ](#eddgridsidebyside)Yhteenveto kahdesta tai useammastaEDDGridDataa (Lapset) puolelta.

* Tuloksena olevassa tietoaineistossa on kaikki muuttujat kaikista lasten tietoaineistoista.
* Emotietokanta ja kaikki lasten tietoaineistot on erilainendatasetIDs. Jos perheen nimet ovat täsmälleen samat, aineisto ei lataudu. (virheviestillä, että yhdistetyn akselin arvot eivät ole järjestyksessä) .
* Kaikilla lapsilla on oltava samat lähdearvot.axisVariables\\[1+\\]  (esimerkiksi leveys, pituus) . Testien tarkkuus määräytyy[AxisNDigits](#matchaxisndigits).
* Lapsilla voi olla erilaiset lähdearvotaxisVariables\\[0\\]  (Esimerkiksi aika) Ne ovat yleensä samanlaisia.
* Emoyhtiön tiedot näyttävät olevan kaikkiaxisVariables\\[0\\]Lähteitä kaikille lapsille.
* Näin voit esimerkiksi yhdistää lähdeaineiston vektorin u-komponenttiin ja toisen lähdeaineiston vektorin v-komponenttiin, jotta yhdistettyjä tietoja voidaan palvella.
* Tällä menetelmällä luotuja lapsia pidetään yksityisesti. Ne eivät ole erikseen saatavilla olevia tietoaineistoja. (esimerkiksi asiakastietopyyntöjen tai[Lipputiedostot](/docs/server-admin/additional-information#flag)) .
* Maailmanlaajuinen metatieto ja emoyrityksen asetukset tulevat maailman metatietojen ja ensimmäisen lapsen asetusten perusteella.
* Jos on olemassa poikkeus ensimmäisestä lapsesta, vanhempaa ei synny.
* Jos on olemassa poikkeus, kun luot muita lapsia, tämä lähettää sähköpostia kaikkeen. (Kuten on määritelty[Asennus.xml](/docs/server-admin/deploy-install#setupxml)) Jatkuu muiden lasten kanssa.
#### EDDGridSideBySide Skeleton XML{#eddgridsidebyside-skeleton-xml} 
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

### EDDGridAggregateExistingDimensio{#eddgridaggregateexistingdimension} 
[ **EDDGridAggregateExistingDimensio** ](#eddgridaggregateexistingdimension)Yhteenveto kahdesta tai useammastaEDDGridaineistot, joista jokaisella on erilaiset arvot ensimmäisessä ulottuvuudessa, mutta samat arvot muissa ulottuvuuksissa.

* Yhdellä lapsella voi olla 366 arvoa. (2004) Lapsella voi olla 365 arvoa (2005) ajan ulottuvuudesta.
* Kaikki arvot muihin ulottuvuuksiin (esimerkiksi leveys, pituus) Täytyy olla sama kaikille lapsille. Testien tarkkuus määräytyy[AxisNDigits](#matchaxisndigits).
* Dimension arvot - Kunkin ulottuvuuden arvot on määriteltävä järjestyksessä. (nouseminen tai laskeutuminen) . Arvot voidaan asettaa epäsäännöllisesti. Ei voi olla siteitä. Tämä on vaatimus[CF:n metatiedot](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Jos minkään ulottuvuuden arvot eivät ole lajitellussa järjestyksessä, aineistoa ei ladata jaERDDAP™tunnistaa lokitiedoston ensimmäisen arvon, *isovanhemmat* /logs/log.txt.
    
Rajoittamattomat ulottuvuudet osoittavat lähes aina ongelman lähdeaineiston kanssa. Tämä tapahtuu yleisimmin, kun väärin nimetty tai sopimaton tiedosto sisältyy aggregaatioon, joka johtaa häiriöttömään ajan ulottuvuuteen. Tämän ongelman ratkaisemiseksi katso virheilmoitusERDDAP™Lo.txt-tiedosto, joka etsii loukkaavan ajan arvoa. Katso lähdetiedostoja löytää vastaava tiedosto (Yksi ennen tai yksi jälkeen) Se ei kuulu aggregaatioon.
    
* Emotietokanta ja lapsitietokanta on erilainendatasetIDs. Jos perheen nimet ovat täsmälleen samat, aineisto ei lataudu. (virheviestillä, että yhdistetyn akselin arvot eivät ole järjestyksessä) .
* Tällä hetkellä lapsitietojen on oltavaEDDGridFromDap-tietoaineistolla ja MUST:llä on yhdistetyn ulottuvuuden alhaisimmat arvot. (Yleensä vanhimmat aika-arvot) . Kaikkien muiden lasten on oltava lähes identtisiä. (Erot vain ensimmäisessä ulottuvuudessa) ja ne on määritetty vain heidänsourceUrl.
* Yhteenlaskettu tietoaineisto saa metatietonsa ensimmäisestä lapsesta.
* The[GenerateDatasets XML-ohjelma](#generatedatasetsxml)voi tehdä karkean luonnoksendatasets.xmlYksiEDDGridAggregateExistingDimension perustuu joukkoon tiedostoja, joita palveleeHyraxKolme palvelinta. Käyttäkää esimerkiksi tätä ohjelmaa (URL-osoitteen "/1988" ansiosta esimerkit kulkevat nopeammin) :
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
Voit käyttää tulosta&lt;sourceUrl&gt; tagit tai poista ne ja ota vastaan&lt;sourceUrl&gt;tunnus (jotta uudet tiedostot huomataan joka kerta, kun tietoaineisto ladataan uudelleen.
#### EDDGridAggregateExistingDimension Skeleton XML{#eddgridaggregateexistingdimension-skeleton-xml} 
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

### EDDGridKopio{#eddgridcopy} 
[ **EDDGridKopio** ](#eddgridcopy)tehdä ja ylläpitää paikallista kopiota toisestaEDDGrid"tietoa ja palvelee tietoja paikallisesta kopiosta.

*   EDDGridKopio (Tabulaarista dataa,[EdDTableCopy](#eddtablecopy)) Helppo käyttää ja erittäin tehokas
     **Ratkaisu joihinkin suurimpiin ongelmiin, jotka liittyvät etätietolähteen tietojenkäsittelyyn:** 
    * Tietojen saaminen etätietolähteestä voi olla hidasta.
        * Se voi olla hidasta, koska se on luontaisesti hidasta. (Esimerkiksi tehoton palvelintyyppi) ,
        * koska pyyntöjä on liikaa,
        * tai koska palvelin tai etäpalvelin on kaistanleveys rajoitettu.
    * Etäaineisto on joskus saatavilla (Jälleen, monesta syystä) .
    * Luottamus yhteen tietolähteeseen ei mittaa hyvin (Esimerkiksi, kun monet käyttäjät ja monetERDDAPkäyttää sitä) .
         
* Miten se toimii -EDDGridKopio ratkaisee nämä ongelmat automaattisesti tekemällä ja ylläpitämällä paikallista kopiota tiedoista ja toimittamalla tietoja paikallisesta kopiosta.ERDDAP™Tietoja voi palvella hyvin, hyvin nopeasti. Paikallisen kopion tekeminen lievittää taakkaa etäpalvelimella. Paikallinen kopio on alkuperäisen varmuuskopio, joka on hyödyllinen, jos jotain tapahtuu alkuperäiselle.
    
Ei ole mitään uutta tehdä paikallinen kopio tietoaineistosta. Mikä on uusi asia, että tämä luokka tekee\\*Help helppoa\\*luoda ja\\*ylläpitää\\*Paikallinen kopio datasta\\*Erilaisia\\*etätietolähteiden ja\\*Lisää metadataa\\*kopioimalla tietoja.
    
* Tiedot -EDDGridKopio tekee paikallisen jäljennöksen tiedoista pyytämällä etältä saatuja tietoja.&lt;Dataa &gt; Jokaiselle vasemmiston arvolle tulee vaaleanpunainen (Ensimmäinen ensimmäinen) Akseli muuttuu.EDDGridKopio ei luota etätietoaineiston indeksinumeroihin akselille - ne voivat muuttua.
    
VAROITUS: Jos datan koko on niin suuri (&gt; 2GB) Se aiheuttaa ongelmia,EDDGridKopiota ei voi käyttää. (Toivomme, että meillä on ratkaisu tähän ongelmaan tulevaisuudessa.) 
    
*   \\[vaihtoehtoEDDGridKopiointi -
Jos etätiedot ovat saatavilla ladattavien tiedostojen, ei verkkopalvelun,[Cash Url vaihtoehtoEDDGridFilejä](#cachefromurl), joka tekee paikallisen kopion etätiedostoista ja palvelee tietoja paikallisista tiedostoista.\\]
* Paikalliset tiedostot - Jokainen tietokanta tallennetaan erikseenNetCDFtiedoston aliohjelmassa *isovanhemmat* Copy/ *datasetID* // (Kuten on määritelty[Asennus.xml](/docs/server-admin/deploy-install#setupxml)) . Akseliarvoista luotuja tiedostonimiä muokataan tiedostonimi-turvalliseksi (Esimerkiksi hypenit korvataan x2D:llä.) Tämä ei vaikuta todellisiin tietoihin.
     
* Uusia tietoja ----- Joka kertaEDDGridKopio on ladattu, se tarkistaa etäisyyden.&lt;Tietokone &gt; Katso, mitä ketjuja on saatavilla Jos tiedostoa ei ole jo olemassa, pyyntö saada kiinni on lisätty jonoon.ERDDAPTehtäväThread käsittelee kaikki johdetut pyynnöt tietojen keräämiseksi yksi kerrallaan. Voit nähdä tilastot Tehtävän toiminnasta[Tilasivut](/docs/server-admin/additional-information#status-page)ja sisällä[Päivittäinen raportti](/docs/server-admin/additional-information#daily-report). (Kyllä,ERDDAP™Tämä voisi määrittää useita tehtäviä tähän prosessiin, mutta se käyttäisi paljon etätietolähteen kaistanleveyttä, muistia ja CPU-aikaa ja paljon paikallista.ERDDAPKaistanleveys, muisti ja CPU-aika, joista kumpikaan ei ole hyvä idea.) 
    
HUOMAUTUS: Ensimmäinen kertaEDDGridKopio on ladattu, (Jos kaikki menee hyvin) Tehtävän jonoon lisätään paljon pyyntöjä, mutta paikallisia tietotiedostoja ei ole luotu. Joten rakentaja epäonnistuu, mutta tehtäväThread jatkaa työskentelyä ja luo paikallisia tiedostoja. Jos kaikki menee hyvin, tehtäväThread tekee paikallisia tietotiedostoja ja seuraava yritys ladata tietoaineistoa uudelleen. (~15 minuuttia) Se onnistuu, mutta alun perin hyvin rajoitetusti.
    
HUOMAUTUS: Kun aineistossa on joitakin tietoja ja se näkyyERDDAPJos etätietoaineisto on tilapäisesti tai pysyvästi saatavilla, paikallinen tietoaineisto toimii edelleen.
    
Varoitus: Jos etätietoaineisto on suuri ja/tai etäpalvelin on hidas (Tämä on ongelma, eikö?) Kestää kauan tehdä täydellinen paikallinen kopio. Joissakin tapauksissa tarvittava aika ei ole hyväksyttävää. Esimerkiksi yhden TB-datan siirtäminen T1-linjan yli (0,15 GB/s) kestää vähintään 60 päivää optimaalisissa olosuhteissa. Lisäksi se käyttää paljon kaistanleveyttä, muistia ja CPU-aikaa etä- ja paikallisissa tietokoneissa. Ratkaisu on lähettää kiintolevy etätietojoukon ylläpitäjälle, jotta s/ hän voi tehdä kopion tietoaineistosta ja lähettää kiintolevyn takaisin sinulle. Käytä näitä tietoja lähtökohtana jaEDDGridKopio lisää siihen tietoja. (Tämä on yksi tapa, jolla[Amazonin EC2-pilvipalvelu](https://aws.amazon.com/importexport/)Ongelma ratkeaa, vaikka järjestelmässä on paljon kaistanleveyttä.) 
    
VAROITUS: Jos arvo on vasemmistolle (Ensimmäinen ensimmäinen) akselimuuttuja katoaa etätietokannasta,EDDGridKopio ei poista paikallista kopioitua tiedostoa. Jos haluat, voit poistaa sen itse.
    
#### Grid Copy checkSource Näytä tarkat tiedot Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data{#grid-copy-checksourcedata} 
Thedatasets.xmlTällä aineistolla voi olla valinnainen tunniste
```
    <checkSourceData>true</checkSourceData>  
```
Oletusarvo on totta. Jos / kun asetat sen vääräksi, tietoaineisto ei koskaan tarkista lähdeaineistoa nähdäksesi, onko lisätietoja saatavilla.

#### Ainoastaan{#onlysince} 
Voit kertoaEDDGridKopioi lähdeaineiston osajoukon kopion tekeminen koko lähdeaineiston sijasta lisäämällä lomakkeeseen merkityksen&lt;Vain » *jotkut Arvon arvo* &lt;/onlySince &gt; Tietoaineistondatasets.xmlChunk.EDDGridKopio lataa vain ensimmäisen ulottuvuuden arvoihin liittyviä tietoarvoja. (Yleensä ajan ulottuvuus) jotka ovat suurempia kuin *jotkut Arvon arvo* . *jotkut Arvon arvo* Voi olla:
    * Suhteellinen aika, joka on määriteltynow- *NUnits* .
Esimerkiksi,&lt;Vain »now-2 vuotta&lt;/onlySince&gt; kertoo aineistosta vain paikallisia jäljennöksiä datasta, jossa ulkoisen ulottuvuuden arvot (Yleensä aika-arvot) Viimeisten kahden vuoden aikana (joka arvioidaan uudelleen joka kerta, kun tietoaineisto ladataan uudelleen, jolloin se etsii uusia tietoja kopioimaan.) . Nähdään[now- *NUnits* Synonyymi kuvaus](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Tämä on hyödyllistä, jos ensimmäisessä ulottuvuudessa on aikatietoja, joita se yleensä tekee.
        
        EDDGridKopio ei poista paikallisia tiedostoja, joilla on tietoja, jotka vanhenevat ajan myötä.now- *NUnits* . Voit poistaa nämä tiedostot milloin tahansa, jos haluat. Jos teet niin suosittelemme, että asetat[Lippu](/docs/server-admin/additional-information#flag)Kun poistat tiedostot kertomaanEDDGridKopioi tiedostojen luettelon päivittäminen.
        
    * ISO 8601 merkkijonoyyyy-MM-ddTHH:mm:ssZ.
Esimerkiksi,&lt;&gt; 2000-01-01T00:00&lt;/onlySince&gt; kertoo aineistosta vain paikallisia kopioita, joissa ensimmäisen ulottuvuuden arvo on 2000-01-01T00:00:00Z. Tämä on hyödyllistä, jos ensimmäisessä ulottuvuudessa on aikatietoja, joita se yleensä tekee.
         
    * kelluva numero.
Esimerkiksi,&lt;&gt; 946684800.0&lt;Vain &gt;&gt; Yksiköt ovat ensimmäisen ulottuvuuden kohdeyksikköjä. Esimerkiksi aikamittauksissa yksikötERDDAP™Aina on"seconds since 1970-01-01T00:00:00Z". 9464800.0"seconds since 1970-01-01T00:00:00Z"Se vastaa 2000-01-01T00:00:00. Tämä on aina hyödyllinen vaihtoehto, mutta se on erityisen hyödyllinen, kun ensimmäisessä ulottuvuudessa ei ole aikaa.

#### EDDGridKopioi suositeltu käyttö{#eddgridcopy-recomended-use} 
1. Luoda&lt;Tietoja &gt; Sisääntulo (syntyperäinen, eiEDDGridKopio) etätietolähteestä.
     **Toimi oikein, mukaan lukien kaikki halutut metatiedot.** 
2. Jos se on liian hidas, lisää XML-koodi kääriäksesi sen.EDDGridKopioi data.
    * Käytä erilaistadatasetID  (Ehkä muuttamalladatasetIDVanhastadatasetIDhieman hieman) .
    * Kopioikaa&lt;Saatavuus &gt;,&lt;ladata kaikki minuutit ja&lt;Muutos &gt; kaukaisestaEDDGridXML:äänEDDGridKopioi XML (Niiden arvotEDDGridKopioi aine; niiden arvot sisäiseen tietoaineistoon ovat merkityksettömiä.) 
3.  ERDDAP™tekee ja ylläpitää paikallista kopiota tiedoista.
         
* Varoitus:EDDGridCopy olettaa, että kunkin roskakorin data-arvot eivät koskaan muutu. Jos / kun he tekevät, sinun on poistettava manuaalisesti roskatiedostot. *isovanhemmat* Copy/ *datasetID* joka muuttui ja[Lippu](/docs/server-admin/additional-information#flag)tiedot, jotka on ladattava niin, että poistetut pyykit korvataan. Jos sinulla on sähköpostitilaus tietoaineistoon, saat kaksi sähköpostia: yksi, kun tietoaineisto ensin lataa ja alkaa kopioida tietoja, ja toinen, kun aineisto latautuu uudelleen. (automaattisesti) havaitsee uudet paikalliset datatiedostot.
     
* Kaikkien akseliarvojen on oltava tasa-arvoisia.
Jokaista akselia lukuun ottamatta (Ensimmäinen ensimmäinen) Kaikkien arvojen on oltava samanarvoisia kaikille lapsille. Testien tarkkuus määräytyy[AxisNDigits](#matchaxisndigits).
     
* Asetukset, Metadata, MuuttujatEDDGridKopio käyttää asetuksia, metatietoja ja muuttujia suljetusta lähdeaineistosta.
     
* Metatietojen muutos ----- Jos haluat muuttaa mitä tahansaaddAttributestai muuttaa lähdeaineistoon liittyvien muuttujien järjestystä:
    1. MuuttaaaddAttributesLähteen tiedot sisältädatasets.xmltarpeen mukaan.
    2. Poista yksi kopioitu tiedosto.
    3. Aseta A[Lippu](/docs/server-admin/additional-information#flag)tietojen lataaminen välittömästi. Jos käytät lippua ja sinulla on sähköpostitilaus tietoaineistoon, saat kaksi sähköpostia: kun tietoaineisto ensin latautuu ja alkaa kopioida tietoja ja toinen, kun tietoaineisto latautuu uudelleen. (automaattisesti) havaitsee uudet paikalliset datatiedostot.
    4. Poistettu tiedosto uusitaan uudella metadatalla. Jos lähdeaineistoa ei ole koskaan saatavilla,EDDGridKopioi tietoaineisto saa metatietoa regeneroidusta tiedostosta, koska se on nuorin tiedosto.
#### EDDGridKopioi Skeleton XML{#eddgridcopy-skeleton-xml} 
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
[ **EDDTableFromCassandra** ](#eddtablefromcassandra)Tietojen käsittely yhdestä[Cassandra](https://cassandra.apache.org/)Pöytä. Cassandra on NoSQL-tietokanta.

*   ERDDAP™Voit työskennellä Cassandra v2:n ja v3:n kanssa ilman muutoksia tai eroja asennuksessa. Olemme testanneet[Cassandra v2 ja v3 Apasseja](https://cassandra.apache.org/download/). On todennäköistä, ettäERDDAP™Voit myös työskennellä Cassandra ladattu DataStax.
     
* Elokuu 2019 - toukokuu 2021 meillä oli vaikeuksia saada Cassandra työskentelemään AdoptOpenJdkin kanssa.JavaV8. Se heikensi ristiriitaa. Mutta nyt (Toukokuu 2021) Tämä ongelma on hävinnyt: voimme käyttää Cassandra v2.1.22 ja AdoptOpenJdk jdk8u292-b10.
     
#### Yksi pöytä{#one-table} 
Cassandra ei tue ”liitoksia” niin kuin suhteelliset tietokannat. YksiERDDAP™EDDTableFromCassandra-datataulut yhdelle (Ehkä yhden alaryhmän) Cassandra-pöytä.

#### Cassandradatasets.xml {#cassandra-datasetsxml} 
*   ERDDAP™Lähde: CassandraJavaKuljettaja, joten sitä ei tarvitse asentaa erikseen.
* Lue huolellisesti tämän asiakirjan tiedot EDDTableFromCassandrasta. Osa yksityiskohdista on erittäin tärkeitä.
* CassandraJavaKuljettajan tehtävänä on työskennellä Apache Cassandralla. (1.2 +) DataStax Enterprise (3.1 +) . Jos käytät Apache Cassandra 1.2.x:tä, sinun on muokattava kassandra.yaml-tiedostoa jokaisesta solmusta aloittaaksesi alustavan liikkeeseenlaskun: totta, käynnistä jokainen solmu uudelleen.
* Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Sen jälkeen voit muokata sitä (erityisesti)&lt;Osallistuminen KeySourceNames » (#partitionkeysourcenames) ). Voit kerätä suurimman osan tiedoista, joita tarvitset XML:n luomiseen EDDTableFromCassandra-tietokantaan ottamalla yhteyttä Cassandra-valvojaan ja etsimällä verkkoa.
    
GenerateDatasets Xml tarjoaa kaksi erillistä vaihtoehtoa EDDTableFromCassandralle:
    
    1. Jos tulet sisään&#33;&#33;&#33;&#33;&#33; (Ilman lainauksia) Avaintilassa ohjelma näyttää luettelon avaimet
    2. Jos avaat tietyn avaimen ja astu sitten sisään&#33;&#33;&#33;&#33; (Ilman lainauksia) taulukon nimeä varten ohjelma näyttää luettelon taulukoista kyseisessä avaimessa ja niiden sarakkeissa.
##### Herkkyys aiheuttaa{#case-sensitivity} 
* Case-insensitive keyspace ja pöytänimi
Cassandra hoitaa näppäimistöä ja taulukkonimiä tapauskohtaisesti. Tämän vuoksi sinun ei tarvitse koskaan käyttää varattua sanaa. (Mutta toisessa tapauksessa) Cassandra-avaimen tai taulukon nimi.
* Tapahtuman herkät nimet -
Oletusarvoisesti Cassandra hoitaa sarakkeiden nimiä tapausherkällä tavalla. Jos käytät yhtä Cassandra varatuista sanoista sarakkeena (Ole hyvä, älä&#33;) Sinun täytyy käyttää
```
        <columnNameQuotes>"<columnNameQuotes>  
```
Sisällädatasets.xmlNäitä tietoja varten Cassandra jaERDDAP™Hoidetaan sarakkeiden nimiä tapauskohtaisesti. Tämä on todennäköisesti suuri päänsärky sinulle, koska se on vaikea määrittää tapausherkkiä versioita sarakkeen nimet - Cassandra lähes aina näyttää sarakkeen nimet kaikki matalampi tapaus, riippumatta todellisesta tapauksesta.
* Työskentele tiiviissä yhteistyössä Cassandra-järjestelmänvalvojan kanssa, jolla voi olla kokemusta. Jos aineisto ei lataudu, lue[Virheilmoitus](#troubleshooting-tips)huolellisesti selvittää, miksi.
         
#### Cassandra&lt;yhteysyhteys omaisuus &gt;{#cassandra-connectionproperty} 
Cassandralla on yhteysominaisuudet, jotka voidaan määritellädatasets.xml. Monet näistä vaikuttavat Cassandra-ERDDAP™yhteys. Cassandra-kiinteistöt on asetettava ohjelmallisestiJavaNiinERDDAP™Jokaisella omaisuudella on oltava koodiERDDAP™tukea. Tällä hetkellä,ERDDAP™tukee näitä ominaisuuksia:
 (Näkymät ovat sitä, mitä näemme. Järjestelmän oletusarvot voivat olla erilaisia.) 

*    **Yleiset vaihtoehdot**   
    &lt;yhteysyhteys Kiinteistön nimi =" **Pakkaus** &gt; &gt; *Ei kukaan|LZ4|Snappy* &lt;/ Yhteys Kiinteistö &gt; (Epävarma, oletusarvo = ei)   
     (Yleinen pakkausneuvonta: käytä "ei" jos yhteys Cassandra jaERDDAP™on paikallinen/nopea ja käyttää LZ4:ää, jos yhteys on etäinen/hidas.)   
    &lt;yhteysyhteys Kiinteistön nimi =" **Valtakirjat** &gt; &gt; *Käyttäjänimi / Password* &lt;/ Yhteys Kiinteistö &gt; (Se on kirjaimellinen'/')   
    &lt;yhteysyhteys Kiinteistön nimi =" **Metriikka** &gt; &gt; *Todellista|Väärin väärä* &lt;/ Yhteys Kiinteistö &gt; (2021-01-25 oli oletusarvoinen, nyt sivuutettu ja aina väärä.)   
    &lt;yhteysyhteys Kiinteistön nimi =" **portti** &gt; &gt; *Integer* &lt;/ Yhteys Kiinteistö &gt; (Binaariprotokolla = 9042)   
    &lt;yhteysyhteys Kiinteistön nimi =" **SSL** &gt; &gt; *Todellista|Väärin väärä* &lt;/ Yhteys Kiinteistö &gt; (Oletus = väärä)   
     (Nopea yritys käyttää SSL epäonnistui. Jos onnistut, kerro minulle, miten teit sen.) 
*    **Query Vaihtoehdot**   
    &lt;yhteysyhteys Kiinteistön nimi =" **Johdonmukaisuus Taso** &gt; &gt; *Kaikki kaikki|Mikä tahansa|Jokainen koorumi|Paikallinen|Paikallinen koorumi|Paikallinen|Yksi|koorumia|sarja|Kolme kolme|Kaksi kaksi* &lt;/ Yhteys Kiinteistö &gt; (Epämiellyttävä, oletusarvoinen)   
    &lt;yhteysyhteys Kiinteistön nimi =" **FetchSize** &gt; &gt; *Integer* &lt;/ Yhteys Kiinteistö &gt; (Oletusarvo = 5000)   
     (Älä aseta novellia pienempään arvoon.)   
    &lt;yhteysyhteys Kiinteistön nimi =" **SerialConsistencyLevel** &gt; &gt; *Kaikki kaikki|Mikä tahansa|Jokainen koorumi|Paikallinen|Paikallinen koorumi|Paikallinen|Yksi|koorumia|sarja|Kolme kolme|Kaksi kaksi* &lt;/ Yhteys Kiinteistö &gt; (arkaluonteinen, oletusarvoinen) 
*    **Socket vaihtoehdot**   
    &lt;yhteysyhteys Kiinteistön nimi =" **LiitännätMillis** &gt; &gt; *Integer* &lt;/ Yhteys Kiinteistö &gt; (Oletusarvo = 5000)   
     (Älä aseta yhteyttä TimeoutMillis on pienempi arvo.)   
    &lt;yhteysyhteys Kiinteistön nimi =" **Säilytä** &gt; &gt; *Todellista|Väärin väärä* &lt;/ Yhteys Kiinteistö &gt;
    &lt;yhteysyhteys Kiinteistön nimi =" **Lähde: TimeoutMillis** &gt; &gt; *Integer* &lt;/ Yhteys Kiinteistö &gt;
     (Cassandra's Default ReadTimeoutMillis on 12 000, muttaERDDAP™Muutetaan oletusarvo 120 000:een. Jos Cassandra heittää lukijaansa, tämä ei välttämättä auta, koska Cassandra joskus heittää heitä ennen tätä aikaa. Ongelma on todennäköisempää, että tallennat liikaa dataa osastolta. Keskeinen yhdistelmä.)   
    &lt;yhteysyhteys Kiinteistön nimi =" **GetBufferSize** &gt; &gt; *Integer* &lt;/ Yhteys Kiinteistö &gt;
     (On epäselvää, mikä on oletusarvo. Älä aseta tätä pieneen arvoon.)   
    &lt;yhteysyhteys Kiinteistön nimi =" **Yksinäinen** &gt; &gt; *Integer* &lt;/ Yhteys Kiinteistö &gt;
    &lt;yhteysyhteys Kiinteistön nimi =" **TcpNoDelay** &gt; &gt; *Todellista|Väärin väärä* &lt;/ Yhteys Kiinteistö &gt; (Oletus = null) 

Jos haluat määrittää muita yhteysominaisuuksia, katso[Lisätuen saaminen](/docs/intro#support).

Tietyn Tomcatin käynnistyksen yhteydessä käytetään vain ensimmäistä kertaa tietoja, jotka on luotu tietylle Cassandra-URL-osoitteelle. Kaikki kyseisen tietoaineiston ja kaikkien saman URL-osoitteen jakavien myöhempien tietoaineistojen lataukset käyttävät näitä alkuperäisiä liitännäisominaisuuksia.
    
#### CQL{#cql} 
Cassandra Query -kieli (CQL) Se on pinnaltaan kuin SQL, perinteisten tietokantojen käyttämä kyselykieli. Koska koskaOPeNDAPTabular-tietopyynnöt on suunniteltu jäljittelemään SQL-tabulaarisia tietopyyntöjä, se on mahdollistaERDDAP™muuntaa Tabular-tietopyynnöt CQL Bound/PreparedStatementsiksi.ERDDAP™Lopettaa lausunnon[log.txt](/docs/server-admin/additional-information#log)kuin
Lausunto tekstinä: *Valtiollinen teksti*   
Näkemäsi lausunnon versio on tekstin esitys ja siinä on vain ", missä rajoitetut arvot asetetaan.
       
Ei niin yksinkertaista... Valitettavasti CQL:llä on monia rajoituksia, joihin sarakkeita voidaan kyseenalaistaa, minkälaisilla rajoituksilla esimerkiksi osioavainkolomakkeita voidaan rajoittaa = ja IN:n kanssa.ERDDAP™lähettää rajoituksia Cassandralle ja soveltaa kaikkia rajoituksia sen jälkeen, kun tiedot on saatu Cassandralta. auttaaERDDAP™Toimia tehokkaasti Cassandra, sinun on määritettävä&lt;Osallistuminen KeySourceNames » (#partitionkeysourcenames) [ ]&lt;ClusterColumnSourceNames » (#clustercolumnsourcenames) ja [&lt;IndexColumnSourceNames » (#indexcolumnsourcenames) Sisällädatasets.xmltälle aineistolle. Nämä ovat tärkeimmät keinot auttaaERDDAP™Työskentele tehokkaasti Cassandralla. Jos et kerroERDDAP™Nämä tiedot ovat tuskallisen hitaitaERDDAP™Käytä tonnia Cassandra-resursseja.
     
#### &lt;Osallistuminen KeySourceNames &gt;{#partitionkeysourcenames} 
Koska avaimet ovat keskeisessä roolissa Cassandra-pöydissä,ERDDAP™Heidän on tiedettäväsourceNameja tarvittaessa muita tietoja siitä, miten työskennellä niiden kanssa.
* Sinun on määritettävä erillinen luettelo osion lähdekoodin sarakkeiden nimetdatasets.xmlkautta&lt;Osallistuminen KeySourceNames »
Yksinkertainen esimerkki,
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
monimutkaisempi esimerkki,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* TimeStamp Partition Avaimet Jos yksi osion avainsarakkeista on aikaleimakolo, jossa on karkeampi versio toisesta aikaleiman sarakkeesta, määritä tämä kautta.
     *Esittelyssä KeeySourcName/OtherColumnSourceNametime\\_precision*   
missä missätime\\_precisionon yksi niistä[time\\_precision](#time_precision)Muualla käytössä olevat sirpaleetERDDAP.
Sivut, joissa Ztime\\_precisionSarja on oletus, joten sillä ei ole väliä, onkotime\\_precisionRyhmä päättyy Z:hen tai ei.
Esimerkiksi,ERDDAP™tulkittava päivämäärä/sampletime/1970-01-01 Päivämäärän rajoitukset voidaan rakentaa näytteenottoajan rajoituksista käyttämällä tätätime\\_precision» » Rajoitusten todellinen muuntaminen on monimutkaisempaa, mutta se on yleiskatsaus.
     **Käytä sitä aina kun se on merkityksellistä.** Se mahdollistaaERDDAP™Työskentele tehokkaasti Cassandralla. Jos tämä suhde sarakkeiden välillä on Cassandra-pöydässä, et kerro.ERDDAP™Tiedot ovat tuskallisen hitaitaERDDAP™Käytä tonnia Cassandra-resursseja.
* Yksin Arvo-osion avaimet - Jos haluatERDDAP™aineisto, joka toimii vain yhdellä osioavaimella, määrittää *KeySourceName=arvo* .
Älä käytä tarjouksia numeeriseen sarakkeeseen, esimerkiksi laite = 1007
Käytä tarjouksia Stringin sarakkeeseen, esimerkiksi asemaid="Point Pinos"
* Dataset Default Sort Order (käytetty) Osallistumisavaimen määräys&lt;dataVariable&gt; Sisällädatasets.xmlmäärittää Cassandra-tulosten oletusjärjestyksen. Tietenkin käyttäjät voivat pyytää erilaista tilausta tietyille tuloksille liittämällä jaorderBy (""" *Erillinen luettelo muuttujista* """) kyselyn lopussa.
* Oletusarvoisesti Cassandra jaERDDAP™Käsittele sarakkeiden nimiä tapauskohtaisesti. Jos asetat[ColumnNameQuotes](#case-sensitivity)"ERDDAP™Cassandra-kolumnin nimiä käsitellään tapauskohtaisesti.
         
#### &lt;Osallistuminen KeyCSV&gt;{#partitionkeycsv} 
Jos tämä on määritelty,ERDDAP™käyttää sitä sen sijaan, että Cassandralta kysyttäisiin. Avainsanatiedot joka kerta, kun tietoaineistoa ladataan uudelleen. Tämä sisältää luettelon erillisistä osion avainarvoista siinä järjestyksessä, että niitä käytetään. Ajat on määriteltävä sekunneiksi vuodesta 1970-01-01T00:00. On myös kaksi erilaista tapaa määritellä aika. (Jokainen koodattu merkkijono) :

1) Aika (AISO8601 Aika-aika)   (Voidaan koodata merkkijonona)   
2) ”Ajat” (AnISO8601Starttime, strideSeconds, stopTime) """ (on koodattava merkkijonona)   
Pysäytä Aika voi olla ISO8601 Aika tai "now-NUnits-aika (esim. "now-3 minuuttia") .
Pysäytä Ajan ei tarvitse olla tarkka aloitusottelu Aika + x strideSekunnit
Rivi kerrallaan () arvo laajenee useisiin riveihin ennen jokaista kyselyä, joten jakamisen luettelo Avaimet voivat olla aina ajan tasalla.
Esimerkiksi,
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
Laajennetaan tähän jakamisen avainyhdistelmien taulukkoon:
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;clusterColumnSourceNames &gt;{#clustercolumnsourcenames} 
Cassandra hyväksyy SQL:n kaltaiset rajoitukset klusterisarakkeissa, jotka ovat sarakkeita, jotka muodostavat pääavaimen toisen osan. (Avaimen jälkeen (s) ) . On tärkeää, että tunnistat nämä sarakkeet&lt;ClusterColumnSourceNames &gt; Näytä tarkat tiedot Tämä mahdollistaaERDDAP™Työskentele tehokkaasti Cassandralla. Jos on sarakkeita, etkä kerroERDDAPTiedot ovat tuskallisen hitaitaERDDAP™Käytä tonnia Cassandra-resursseja.
    * Esimerkiksi,&lt;ClusterColumnSourceNams *MyClusterColumn1, MyClusterColumn2* &lt;/clusterColumnSourceNames &gt;
    * Jos Cassandra-pöydässä ei ole klusterisarakkeita, älä myöskään määritä&lt;ClusterColumnSourceNames&gt; tai määritä se ilman arvoa.
    * Oletusarvoisesti Cassandra jaERDDAP™Käsittele sarakkeiden nimiä tapauskohtaisesti. Jos asetat[ColumnNameQuotes](#case-sensitivity)"ERDDAP™Cassandra-sarakkeiden nimiä käsitellään tapausherkällä tavalla.
         
#### &lt;indexColumnSourceNames &gt;{#indexcolumnsourcenames} 
Cassandra hyväksyy'='toissijaisten indeksisarakkeiden rajoitukset, jotka ovat sarakkeita, joita olet nimenomaisesti luonut indeksien kautta
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (Kyllä, vanhemmuutta tarvitaan.)   
Siksi on erittäin hyödyllistä tunnistaa nämä sarakkeet.&lt;IndexColumnSourceNames &gt; Tämä mahdollistaaERDDAP™Työskentele tehokkaasti Cassandralla. Jos on indeksisarjoja, et kerroERDDAPJotkin kysymykset ovat tarpeettomia, tuskallisesti hitaita.ERDDAP™Käytä tonnia Cassandra-resursseja.
* Esimerkiksi,&lt;IndexColumnSourceNams *MyIndexColumn1, MyIndexColumn2* &lt;/indexColumnSourceNames &gt;
* Jos Cassandra-taulukossa ei ole indeksisarakkeita, älä myöskään määritä&lt;IndexColumnSourceNames&gt; tai määritä se ilman arvoa.
* Varoitus: Cassandra-indeksit eivät ole tietokantaindeksien kaltaisia. Cassandra-indeksit auttavat'='rajoituksia. Ja he ovat vain[Suositeltu](https://cassandra.apache.org/doc/latest/cql/indexes.html)sarakkeilla, joilla on paljon vähemmän arvoja kuin kokonaisarvoilla.
* Oletusarvoisesti Cassandra jaERDDAP™Käsittele sarakkeiden nimiä tapauskohtaisesti. Jos asetat[ColumnNameQuotes](#case-sensitivity)"ERDDAP™Cassandra-sarakkeiden nimiä käsitellään tapausherkällä tavalla.
         
#### &lt;maxRequestFraction &gt;{#maxrequestfraction} 
MilloinERDDAP™  (Re) ladata aineistoa,ERDDAP™Cassandra saa osioavaimien erillisyhdistelmien luettelon. Suuressa tietoaineistossa yhdistelmien määrä on valtava. Jos haluat estää käyttäjiä pyytämästä suurinta osaa tai kaikkia tietoja (tai pyyntö, joka pyytääERDDAP™ladata suurimman osan tai kaikki tiedot, jotta ne voidaan suodattaa edelleen.) Voit kertoaERDDAP™sallia pyynnöt, jotka vähentävät yhdistelmien määrää tietyllä summalla&lt;maxRequestFraction, joka on kelluva numero 1e-10 (Tämä tarkoittaa sitä, että pyyntö ei voi tarvita enempää kuin yhden yhdistelmän miljardiin.) 1 (oletusarvo, joka tarkoittaa, että pyyntö voi olla koko tietoaineiston) .
Esimerkiksi, jos aineistossa on 10000 erillistä yhdistelmää osioavaimista ja maxRequestFraction on 0,1,
pyynnöt, jotka tarvitsevat tietoja 1001 tai enemmän yhdistelmiä, tuottavat virheilmoituksen.
Pyynnöt, jotka tarvitsevat tietoja 1000 tai vähemmän yhdistelmiä, ovat sallittuja.
    
Mitä suurempi tietoaineisto, sitä pienempi sinun pitäisi asettaa&lt;MaxRequestFraction » Joten voit asettaa sen 1 pienelle tietoaineistolle, 0.1 keskikokoiselle tietoaineistolle, 0.01 suurelle tietoaineistolle ja 0.0001 suurelle tietoaineistolle.
    
Tämä lähestymistapa on kaukana täydellisestä. Jotkin kohtuulliset pyynnöt hylätään ja jotkut liian suuret pyynnöt ovat sallittuja. Ongelma on vaikea ja ratkaisu on paljon parempi kuin mikään.
    
#### CassandrasubsetVariables {#cassandra-subsetvariables} 
Kuten muissa EDDTable-tietokannoissa, voit määrittää erillisen luettelon&lt;dataVariable&gt;destinationNameGlobaalissa attribuutissa, jota kutsutaan[subsetVariables](#subsetvariables)määrittää muuttujia, joilla on rajallinen määrä arvoja. Tiedostossa on sitten .subset-verkkosivu ja näytetään luettelot erillisistä arvoista näille muuttujille lukuisilla sivuilla.
    
Sisältää vain osion avainmuuttujat ja staattiset sarakkeet luettelossa on STRONGLY E.NCOKäytetty. Cassandra pystyy luomaan luettelon erillisistä yhdistelmistä erittäin nopeasti ja helposti joka kerta, kun aineisto ladataan uudelleen. Yksi poikkeus on aikaleima-avaimet, jotka ovat karkeita versioita joissakin muissa aikaleiman sarakkeissa - on luultavasti parasta jättää nämä pois luettelosta.subsetVariablesKoska arvoja on paljon, ne eivät ole hyödyllisiä käyttäjille.
    
Jos sisällytät ei-osallistumisavaimen, ei-staattiset muuttujat luetteloon, se on todennäköisesti **erittäin** Laskennallisesti kallista Cassandralle joka kerta, kun aineisto on ladattu, koskaERDDAP™On tarkasteltava jokaisen tietoaineiston rivin läpi tietojen tuottamiseksi. Itse asiassa kysely epäonnistuu. Pieniä aineistoja lukuun ottamatta tämä on täysin hiljaista.
    
#### Cassandra DataTypes{#cassandra-datatypes} 
Jotain epäselvyyttä, josta[Cassandra-tietotyypit](https://cassandra.apache.org/doc/latest/cql/types.html)kartta, johonERDDAP™Tietotyypit, sinun on määriteltävä [&lt;Tietotyyppi &gt; (#datatype) Jokaiseen [&lt;dataVariable&gt; (#Datavariable) kertomaanERDDAP™Minkälaista dataa käytetään. StandardiERDDAP™Datatiedot Tyypit (Yleisimmät vastaavat Cassandra-tietotyypit) ovat:
    
*   [Boolee](#boolean-data)  (Boolee) mikäERDDAP™Tallenna tavut
* By (jos vaihteluväli on -128 - 127) 
* Lyhyt lyhyt (jos vaihteluväli on -32768 - 32767) 
* Sisään (_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _) 
* Pitkä pitkä (vaihtelee?, jos vaihteluväli on -9223372036854775808 - 92233720368547807) 
* kelluva (kelluva) 
* kaksinkertainen (Kaksinkertainen, desimaalinen (Mahdollisen tarkkuuden menetyksen) Aikaleima) 
* Char (ascii tai teksti, jos sinulla ei ole koskaan yli 1 merkki) 
* String (ascii, teksti, varchar, inet, uid, timeuud, blob, kartta, set, list?) 

Cassandra[Aikaleima](#cassandra-timestamp-data)Erityistapaus: käyttöERDDAPKaksinkertainen data Tyyppi.

Jos määrität String-tietotyypinERDDAP™Cassandra-kartan, setin tai luettelon osalta kartta, asetus tai luettelo kussakin Cassandra-rivissä muunnetaan yhdeksi merkkijonoksi yhdellä rivillä.ERDDAP™Pöytä.ERDDAP™Vaihtoehtoinen luettelo, katso alta.

 *Tyyppityyppi* Luettelot -ERDDAP[ ]&lt;Tietotyyppi &gt; (#datatype) CassandradataVariables voi sisältää säännöllisenERDDAP™Datatiedot Tyypit (ylhäällä) Plus useita erityisiä tietotyyppejä, joita voidaan käyttää Cassandra-listan sarakkeissa: booleanList, byteList, ubyteList, shortList, ushortList, intList, uintList, longList, ulongList, floatList, kaksoislist, charlist, StringList. Kun yksi näistä luettelon sarakkeista on tuloksissa, joihinERDDAP™Jokainen lähdetietorivi laajennetaan luetteloon. koon koko () Tietojen rivit sisäänERDDAPYksinkertaiset tiedot Tyypit (Esimerkiksi Int) Tämän lähdeaineiston rivi on kaksinkertainen luettelo. koon koko () Ajat. Jos tulokset sisältävät useamman kuin yhden luettelomuuttujan, kaikki luettelot tietyllä rivillä on oltava sama koko ja niiden on oltava "parallel" -luetteloita taiERDDAP™Luo virheilmoituksen. esimerkiksi ADCP:n virtausmittauksissa,
syvyys\\[0\\]UCurrent\\[0\\]vs. nykyinen\\[0\\]ja zCurrent\\[0\\]Kaikki liittyvät toisiinsa ja
syvyys\\[1 1\\]UCurrent\\[1 1\\]vs. nykyinen\\[1 1\\]ja zCurrent\\[1 1\\]Kaikki liittyvät toisiinsa,...
Vaihtoehtoisesti, jos et haluaERDDAP™laajentaa luetteloa useisiin riveihinERDDAP™Pöytä, määritä String kuindataVariable&gt; Data Tyyppi niin, että koko luettelo esitetään yhtenä rivinäERDDAP.
    
#### Cassandra TimeStamp -tiedot{#cassandra-timestamp-data} 
Cassandra on aina tietoinen aikavyöhykkeistä. Jos syötät aikaleimatietoja määrittämättä aikavyöhykettä, Cassandra olettaa, että aikaleima käyttää paikallista aikavyöhykettä.
    
ERDDAP™tukee aikaleimatietoja ja esittelee aina tiedotZuluGMT aikavyöhyke. Jos annat aikaleimatietoja Cassandrassa muulla kuin aikavyöhykkeelläZuluGMT, muista, että sinun on tehtävä kaikki kyselyt aikaleimatietoihinERDDAP™KäyttämälläZuluGMT aikavyöhyke. Älä ylläty, kun aikaleima-arvot tulevat ulosERDDAPMuutetaan useita tunteja, koska aikavyöhyke siirtyy paikallisestaZuluGMT-aika.

* SisälläERDDAP&gt;datasets.xmlSisällä&lt;dataVariable&gt; Tag for a timestamp variable, set
```
          <dataType>double</dataType>  
```
ja sisällä&lt;addAttributes&gt; asetettu
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Suositukset: Jos tiedot ovat aikaväli, on hyödyllistä, että aikaleima-arvot viittaavat implisiittiin aikaväliin. (Esimerkiksi keskipäivällä) . Esimerkiksi, jos käyttäjällä on tietoja 2010-03-26T13:00Z toisesta tietoaineistosta ja he haluavat lähimmät tiedot tästä Cassandra-tietokannasta, jolla on tietoja joka päivä, sitten tiedot 2010-03-26T12:00Z (Cassandra-tiedot tähän päivään) on ilmeisesti paras (vastakohtana keskiyölle ennen tai jälkeen, jolloin on vähemmän selvää, mikä on parasta.) .
*   ERDDAP™on hyödyllistä[Muunna numero Aikaa / From a String Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* Näytä[MitenERDDAP™Sopimukset ajan kanssa](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
#### Integer-nukkeja{#integer-nulls} 
Cassandra tukee nukkeja Cassandra Intissä (ERDDAP™Sisään) Bigint (ERDDAP™Pitkä pitkä) sarakkeita, muttaERDDAP™ei tue todellisia nukkeja mihinkään integer-tietotyyppiin.
Oletusarvoisesti Cassandra integer nulls muunnetaanERDDAP™2147483647 int sarakkeet, tai 9223372036854775807 pitkät sarakkeet. Nämä näyttävät "NaN" tietyntyyppisissä tekstitiedostoissa. (Esimerkiksi .csv) "Muut tekstitiedostot" (esimerkiksi.htmlTable) ja erityinen numero (2147483647 puuttuvat arvot) Muissa tiedostoissa (Esimerkiksi binaaritiedostot, kuten.ncMatti) . Käyttäjä voi etsiä rivejä tällaisella puuttuvalla arvolla viittaamalla "NaN", esimerkiksi "&windSpeed=NaN".
    
Jos käytät jotain muuta kokonaislukuarvoa Cassandra-pöydän puuttuvien arvojen ilmoittamiseen, tunnista tämä arvo.datasets.xml:

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

Cassandra kelluva piste sarakkeet, nullit muunnetaan NaNsERDDAP. Cassandra-tietotyypit, jotka muunnetaan StringsiksiERDDAP™Nulls muunnetaan tyhjiksi purjeiksi. Sen ei pitäisi olla ongelma.
    
#### VAROITUS: Valmistautuminen jo valmistettuun kyselyyn{#warning-re-preparing-already-prepared-query} 
* VAROITUS: Valmistautuminen jo valmistettuun kyselyyn *Tom* Lähde: Catalina.out (Muut Tomcat-lokitiedostot)   
Cassandra-dokumentti kertoo, että on vaikeuksia, jos sama kysely tehdään kahdesti valmistilaksi. (tai enemmän) . (Näe tämä[Bug Report](https://datastax-oss.atlassian.net/browse/JAVA-236).) Välttääkseen Cassandraa,ERDDAP™Kaikki valmiit tilat, jotta ne voidaan käyttää uudelleen. Se on kadonnut, jos/kun TomcatERDDAP™on aloitettu uudelleen, mutta mielestäni se on ok, koska valmistetut tilat liittyvät tiettyyn istuntoon. (välin välilläJavaKassandra) myös menetetty. Saatat nähdä nämä viestit. En tiedä mitään muuta ratkaisua. Onneksi se on varoitus, ei virhe. (Cassandra uhkaa, että se voi johtaa suorituskykyyn.) .
    
Cassandra väittää, että valmistetut tilat ovat hyviä ikuisesti.ERDDAPValmistetut tilat eivät saa koskaan olla vanhentuneita / mitättömiä. Jos tämä ei ole totta, ja saat virheitä tietyistä PreparedStatements on vanhentunut / mitätön, sinun on aloitettava uudelleen.ERDDAP™SelkeäERDDAP"Valmistettujen tilojen välimuisti.
    
#### Cassandra Turvallisuus{#cassandra-security} 
Näytä[Cassandra](https://cassandra.apache.org/doc/latest/operating/security.html)

Kun työskentelet Cassandra, sinun on tehtävä asiat mahdollisimman turvallisesti ja turvallisesti, jotta voit välttää vahingollisen käyttäjän vahingoittaa Cassandraa tai saada pääsyn tietoihin, joita heidän ei pitäisi käyttää.ERDDAP™Tekee asioita myös turvallisella tavalla.

* Kehotamme sinua perustamaanERDDAP™Yhteyden muodostaminen Cassandra-käyttäjäksi, jolla on vain pääsy Cassandraan **asiaankuuluva** pöytäpöytäpöytä (s) Hänellä on vain oikeita etuoikeuksia.
* Kehotamme sinua luomaan yhteydenERDDAP™Cassandra, niin että
    * Käytä aina SSL:ää
    * sallii yhteyden vain yhdestä IP-osoitteesta (tai yksi osoitteiden lohko) ja yhdestäERDDAP™käyttäjän ja
    * Siirrä salasanoja vain MD5-hajonneessa muodossaan.
*   \\[Osaaminen\\]Yhteyssopimukset (Sisältää salasanan&#33;) Säilytetään selkeänä tekstinädatasets.xml. Emme ole löytäneet tapaa, jolla järjestelmänvalvoja pääsee Cassandra-salasanaan.ERDDAPAloitus Tomcatissa (joka tapahtuu ilman käyttäjän syöttöä) Tällöin salasanan on oltava saatavilla tiedostossa. Tehdään tästä turvallisempaa:
    * Sinä (TheERDDAP™Hallinnollinen) Pitäisi olla omistajadatasets.xmlLue ja kirjoita käyttöoikeus.
    * Tee ryhmä, joka sisältää vain käyttäjän = Tomcat. Käytä chgrp, jotta ryhmändatasets.xmlVain oikeita etuoikeuksia.
    * Käytä chmodia määrittääksesi O-rwx-oikeudet (Ei Lue tai kirjoita "Muut" käyttäjät) fordatasets.xml.
* Milloin sisäänERDDAP™salasana ja muut yhteysominaisuudet tallennetaan "yksityiseen"Javamuuttujia.
* Asiakkaiden pyynnöt laajennetaan ja tarkistetaan pätevyydeksi ennen CQL-pyyntöjen luomista.
* Pyynnöt Cassandra tehdään CQL Bound/PreparedStatements, estää CQL injektio. Cassandra on luonnostaan vähemmän altis CQL-injektiolle kuin perinteiset tietokannat.[SQL-injektio](https://en.wikipedia.org/wiki/SQL_injection).
         
#### Cassandra Speed{#cassandra-speed} 
Cassandra voi olla nopea tai hidas. On asioita, joita voit tehdä nopeasti:
* Yleisesti -
CQL:n luonne on se, että kyselyt ovat[deklaratiivinen](https://en.wikipedia.org/wiki/Declarative_programming). Se määrittää, mitä käyttäjä haluaa. Ne eivät sisällä eritelmiä tai vihjeitä siitä, miten kyselyä käsitellään tai optimoidaan. Joten ei ole mitään keinoaERDDAP™kyselyn tuottaminen siten, että se auttaa Cassandraa optimoimaan kyselyn. (tai millään tavalla määrittää, miten kyselyä käsitellään.) . Yleisesti ottaen Cassandra-järjestelmänvalvojan tehtävänä on luoda asioita. (Esimerkiksi indeksit) Optimoi tietyntyyppisiä kysymyksiä.
     
* Määrittää aikaleima sarakkeet, jotka liittyvät coarser-tarkkuus aikaleima-avaimet kautta [&lt;Osallistuminen KeySourceNames » (#partitionkeysourcenames) Se on tärkein tapa auttaaERDDAP™Työskentele tehokkaasti Cassandralla. Jos tämä suhde on olemassa Cassandra-pöydässä, et kerro.ERDDAP™Tiedot ovat tuskallisen hitaitaERDDAP™Käytä tonnia Cassandra-resursseja.
     
* Klusterin sarakkeiden määrittäminen [&lt;ClusterColumnSourceNames » (#clustercolumnsourcenames) Toiseksi tärkein tapa auttaaERDDAP™Työskentele tehokkaasti Cassandralla. Jos on sarakkeita, etkä kerroERDDAPsuuri osa mahdollisista kyselyistä on tarpeetonta, tuskallisesti hidastaERDDAP™Käytä tonnia Cassandra-resursseja.
     
* Make Make Make Make[Indeksit](https://cassandra.apache.org/doc/latest/cql/indexes.html)Yleisesti rajoitettuja muuttujia -
Voit nopeuttaa muutamaa kyselyä luomalla indeksejä Cassandra-sarakkeisiin, jotka ovat usein rajoitettuja "=" -rajoituksiin.
    
Cassandra ei voi tehdä indeksejä luetteloon, asetteluun tai karttasarakkeisiin.
    
* Indeksikolumnien määrittäminen [&lt;IndexColumnSourceNames » (#indexcolumnsourcenames) Se on tärkeä tapa auttaaERDDAP™Työskentele tehokkaasti Cassandralla. Jos on indeksisarjoja, et kerroERDDAPJotkin tiedot ovat tarpeettomia, tuskallisesti hitaitaERDDAP™Käytä tonnia Cassandra-resursseja.
     
#### Cassandra Stats{#cassandra-stats} 
*   [Cassandra stats - Diagnostiset viestit](#cassandra-stats)----- JokaiselleERDDAP™Käyttäjä kyselee Cassandra-tietokantaa,ERDDAP™tulostaa linkin lokitiedostoon, *isovanhemmat* /logs/log.txt, jossa on esimerkiksi kyselyyn liittyviä tilastoja
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
Edellä mainitussa esimerkissä olevien numeroiden käyttäminen tarkoittaa:

* MilloinERDDAP™Viimeinen viimeinen (Re) Lataa nämä tiedot, Cassandra kertoiERDDAP™Siinä oli 10000 erilaista yhdistelmiä osioavaimista.ERDDAP™Kaikki erilliset yhdistelmiä tiedostossa.
* käyttäjän rajoitusten vuoksi,ERDDAP™Tunnistettiin kaksi yhdistelmiä 10 000:sta, joilla voi olla haluttuja tietoja. Niin,ERDDAP™Cassandralle soitetaan kaksi puhelua, yksi jokaisesta osion avaimen yhdistelmästä. (Sitä Cassandra vaatii.) On selvää, että on hankalaa, jos suurella tietoaineistolla on suuri määrä jakamisavaimien yhdistelmiä, eikä pyyntö vähennä sitä merkittävästi. Voit vaatia, että jokainen pyyntö vähentää avaimen tilaa asettamalla [&lt;MaxRequestFraction » (#maxrequestfraction) . 2/10000=2e-4, joka on pienempi kuin maxRequestFraction (0,1) Siksi pyyntö oli sallittu.
* Kun osion avaimet koskevat rajoituksia,[Klusterin kolumnit](#clustercolumnsourcenames)ja[Indeksikolumnit](#indexcolumnsourcenames)jotka lähetettiinERDDAP™Cassandra palautti 1200 riviä dataaERDDAP™tuloksissa.
* Tulokset Pitäisi olla[Datatiedot Tyyppi = *Tyyppi* Luettelo](#cassandra-datatypes)Kolumnit (Keskimäärin 10 kohdetta luettelossa) koskaERDDAP™Laajensi 1200 riviä Cassandrasta 12 000 riviinERDDAP.
*   ERDDAP™Käytä aina kaikkia käyttäjän rajoituksia Cassandra-tietoihin. Rajoitukset, joita Cassandra ei ole käsitellyt, vähensivät rivien määrän 7405:een. Tämä on käyttäjälle lähetettyjen rivien määrä.

Näiden diagnostisten viestien tärkein käyttö on varmistaa, ettäERDDAP™Teet sitä, mitä luulet sen tekevän. Jos se ei ole (Eikö se vähennä eri yhdistelmien määrää odotetulla tavalla?) Sitten voit käyttää tietoja selvittääksesi, mitä tapahtuu väärin.
 
* Tutkimukset ja kokeilut löytävät ja parantavat&lt;Yhteysominaisuus &gt; (#kassandra-yhteysominaisuus) s.
 
* Katso Cassandra-verkkoyhteyden nopeusERDDAP. Jos yhteys on hidas, katso, voitko parantaa sitä. Paras tilanne on silloin, kunERDDAP™Käytössä on palvelin, joka on kiinnitetty samaan (nopeasti) Vaihda palvelimena, jossa on Cassandra-solmu, johon olet yhteydessä.
 
* Ole kärsivällinen. Lue tiedot täällä ja Cassandrassa huolellisesti. Kokeilua. Tarkista työsi. Mikäli CassandraERDDAP™Yhteys on vielä hitaampi kuin odotat, ota mukaan Cassandra-pöydän kaava ja taulukkosi.ERDDAP™Chunk Ofdatasets.xmlKatso meidän[Lisätuen saaminen](/docs/intro#support).
 
* Jos kaikki muu epäonnistuu,
tietojen säilyttäminen kokoelmassaNetCDFv3.nctiedostoja (Erityisesti erityisesti.nctiedostoja, jotka käyttävät[CF Discrete Sampling Geometria (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Kontiguous Ragged Array -tietorakenteet ja niin voidaan käsitelläERDDAP&gt;[EDDTableFromNcFiles](#eddtablefromnccffiles)) . Jos se on loogisesti järjestetty (Jokaisella on dataa avaruuden ja ajan huipulle) ,ERDDAP™Tiedot voidaan kerätä erittäin nopeasti.
         
#### EdDTableFromCassandra skeleton XML{#eddtablefromcassandra-skeleton-xml} 
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

### EdDTableFromDapsequence Näytä tarkat tiedot{#eddtablefromdapsequence} 
[ **EdDTableFromDapsequence Näytä tarkat tiedot** ](#eddtablefromdapsequence)muuttujien käsittely 1- ja 2-tason jaksoissa[DAP](https://www.opendap.org/)palvelimet, kutenDAPP (oli https://www.pmel.noaa.gov/epic/software/dapper/ Nyt lopetettu) .

* Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Sen jälkeen voit muokata sitä hienosti. Voit kerätä tarvitsemasi tiedot katsomalla lähdetietoaineiston DDS- ja DAS-tiedostoja selaimessasi (lisäämällä .das ja .dds)sourceUrl(Esimerkki oli https://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds ).
    
* Muuttuja on aDAPJos .dds-vastaus osoittaa, että muuttujan tietorakenne on "sekvenssi" (Tapaus herkkä) .
* Joissakin tapauksissa näet sekvenssin, 2-tasoisen sekvenssin - EDDTableFromDapSequence käsittelee myös näitä.
#### EdDTableFromDapSequence Skeleton (käytetty) XML{#eddtablefromdapsequence-skeleton-xml} 
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
[ **EDDTableFromDatabase** ](#eddtablefromdatabase)käsitellä tietoja yhdestä suhteellisen tietokannan taulukosta tai[Näkönäkymät](https://en.wikipedia.org/wiki/View_(database)).

#### Yksi pöytä tai näkymä{#one-table-or-view} 
Jos haluat käyttää tietojasi kahdessa tai useammassa taulukossa (Tarvitset siis JOIN-tietoa molemmista taulukoista kerralla) Sinun täytyy tehdä yksi[epänormaalia](https://en.wikipedia.org/wiki/Denormalization)  (jo liittynyt) pöytä tai[Näkönäkymät](https://en.wikipedia.org/wiki/View_(SQL)• kaikki tiedot, jotka haluat julkaista yhtenä tietoaineistonaERDDAP.

Suurten, monimutkaisten tietokantojen kohdalla voi olla järkevää erottaa useita pöytiä epänormaaliksi taulukoksi, joista jokaisesta tulee erillinen tietoaineisto.ERDDAP.

Epänormaalin pöydän käyttäminenERDDAP™Kuulostaa hullulta idealta. Luota meihin. On olemassa useita syitä, miksiERDDAP™Toimii epänormaalien pöytien kanssa:

* Käyttäjille se on huomattavasti helpompaa.
MilloinERDDAP™esittelee tietoaineiston yhdeksi, yksinkertaiseksi, epänormaaliksi, yksittäiseksi taulukoksi, joka on helppo ymmärtää tietoja. Useimmat käyttäjät eivät ole koskaan kuulleet normaaleista pöydistä, ja hyvin harvat ymmärtävät avaimia, ulkomaisia avaimia tai pöytäliitoksia, eivätkä he läheskään tiedä eri tyyppisten liitteiden yksityiskohtia tai miten määrittää SQL:n liittyäkseen. (Useita liitoksia) oikein. Epänormaalin pöydän käyttäminen estää kaikki ongelmat. Yksinkertaisesti tämä syy oikeuttaa epänormaalin yksittäisen taulukon käytön aineiston esittämiseen.ERDDAP™käyttäjiä.
     
* Normaalit pöydät (Useita taulukoita, jotka liittyvät avainsarakkeisiin) on hyvä tallentaa tietoja tietokantaan.
Jopa SQL:ssä tulos, joka palautetaan käyttäjälle, on epänormaali. (Liity mukaan) Yksittäinen pöytä. Joten näyttää järkevältä esittää tietoaineistoa käyttäjille valtavana, epänormaalina, yksittäisenä taulukona, josta he voivat sitten pyytää alijoukkoja. (Näytä minulle pöydän rivit, joissa lämpötila 30) .
     
* Voit tehdä muutoksiaERDDAP™Muuttamatta pöytiä.
    ERDDAP™on joitakin vaatimuksia, jotka voivat olla erilaisia kuin tietokannan perustaminen.
Esimerkiksi,ERDDAP™Tarvitaan, että aikaleimatiedot tallennetaan "aikaleimaan" aikavyöhykkeellä.
Tee erillinen taulukko/näkymäERDDAP™Voit tehdä nämä muutokset, kun teet epänormaalin pöydänERDDAP. Sinun ei siis tarvitse tehdä muutoksia pöytiin.
     
*   ERDDAP™Se luo osan normaalien pöytien rakenteesta.
Voit määrittää, mitkä sarakkeet ovat peräisin "ulkoisista" taulukoista, ja siksi niillä on rajallinen määrä erillisiä arvoja.ERDDAP™Kerää kaikki näiden sarakkeiden eri arvoyhdistelmät ja esittelee ne käyttäjille erityisellä tavalla. subset-sivusto, joka auttaa käyttäjiä valitsemaan tietoaineiston osat nopeasti. Kunkin sarakkeen erilliset arvot näkyvät myös tietoaineiston muiden sivujen pudotusluetteloissa.
     
* Epänormalisoitu taulukko tekee tiedoista luovuttamisen sinulleERDDAPHallinnollinen helppo.
Olet tämän tietoaineiston asiantuntija, joten on järkevää, että päätät, mitkä taulukot ja mitkä sarakkeet liittyä ja miten liittyä niihin. Sinun ei tarvitse antaa meille (Pahimmillaan loppukäyttäjät) Useita taulukoita ja yksityiskohtaisia ohjeita niiden liittymiseen, sinun täytyy vain antaa meille pääsy epänormaaliin taulukkoon.
     
* Epänormaali taulukko mahdollistaa tietojen tehokkaan käytön.
Epänormaali muoto on yleensä nopeampi käyttää kuin normaali muoto. Liittyminen voi olla hidasta. Useat liitokset voivat olla hyvin hitaita.
     

Jotta tiedot saadaan kahdesta tai useammasta taulukosta tietokantaanERDDAP™On olemassa kolme vaihtoehtoa:
 

* Suositeltu vaihtoehto:
Voit luoda koomman tai välilehden erotetun arvon tiedoston epänormaalista taulukosta.
Jos tietoaineisto on valtava, on järkevää luoda useita tiedostoja, joista jokaisella on epänormaalin taulukon yhtenäinen alaryhmä. (Esimerkiksi tiedot pienemmästä aikavälistä) .
    
Suurin etu tässä on se, ettäERDDAP™Pystyt käsittelemään käyttäjien tietoja koskevia pyyntöjä ilman lisäponnisteluja tietokannastasi. NiinpäERDDAP™Se ei ole taakka tietokannalle tai tietoturvariskille. Tämä on paras vaihtoehto lähes kaikissa tilanteissa, koskaERDDAP™Tiedot saa yleensä nopeammin kuin tietokannasta. (Jos muunnamme .csv-tiedostot.ncCF-tiedostot) . (Yksi syy on se, ettäERDDAP+ tiedostot ovat vain lukujärjestelmä, eikä niiden tarvitse käsitellä muutoksia samalla kun ne tarjoavat[ACI](https://en.wikipedia.org/wiki/ACID)  (Atomia, johdonmukaisuus, eristäminen, kestävyys) .) Et todennäköisesti tarvitse erillistä palvelinta, koska voimme tallentaa tiedot jollekin RAID-osoitteestamme ja käyttää sitä olemassa olevalla palvelimella.ERDDAP™olemassa olevaan palvelimeen.
    
* Okei vaihtoehto:
Luot uuden tietokannan eri tietokoneeseen, jossa on vain epänormaali taulukko.
Koska tietokanta voi olla ilmainen ja avoimen lähdekoodin tietokanta, kuten MariaDB, MySQL ja PostgreSQL, tämä vaihtoehto ei tarvitse maksaa paljon.
    
Suurin etu tässä on se, ettäERDDAP™Pystyt käsittelemään käyttäjien tietoja koskevia pyyntöjä ilman lisäponnisteluja nykyisessä tietokannassasi. NiinpäERDDAP™Se ei ole taakka nykyiselle tietokannalle. Se myös poistaa monia turvallisuusongelmia, koskaERDDAP™Sinulla ei ole pääsyä nykyiseen tietokantaan.
    
* Discourated options:
Voimme yhdistääERDDAP™nykyiseen tietokantaan.
Tätä varten sinun täytyy:
    
    * Luo erillinen taulukko tai näkymä epänormaaliin tietotaulukkoon.
    * Luo "erdap" käyttäjä, jolla on vain luku-vain pääsy vain epänormaaliin taulukkoon (s) .
         
    
Tämä on vaihtoehto, jos tiedot muuttuvat usein ja haluat antaaERDDAP™Käyttäjät pääsevät välittömästi näihin muutoksiin; kuitenkin, jopa niin, voi olla järkevää käyttää tiedostoa edellä ja säännöllisesti. (30 minuutin välein?) Korvaa tiedosto, jolla on tämän päivän tiedot.
Tämän lähestymistavan suuret haitat ovat se, ettäERDDAP™Käyttäjän pyynnöt saattavat aiheuttaa sietämätöntä taakkaa tietokantaan ja ettäERDDAP™Yhteys on turvallisuusriski (Vaikka riskiä voidaan pienentää/hallita) .

Denormalisoitu pöytä tai näkymäERDDAP™On hyvä tilaisuus tehdä muutamia muutoksia, jotkaERDDAP™Se ei vaikuta alkuperäisiin taulukoihin:

* Muuta päivämäärä- ja aikaleima-alueita/sarakkeita käyttääksesi Postgres-puhelun tietotyyppiä[Aikaleima aikavyöhykkeellä](#database-date-time-data)  (tai vastaava tietokantaan) .
Aikaleimat ilman aikavyöhyketietoja eivät toimi oikeinERDDAP.
* Tee sarakkeita, joita käyttäjät usein etsivät.
* Ole hyvin tietoinen[kentän/sarakkeen nimien osalta](#quotes-for-names-and-case-sensitivity)  (Käytä esimerkiksi kaikkia matalampia) kun kirjoitat niitä.
* Älä käytä varattuja sanoja pöydälle ja kentälle tai sarakkeelle.

Jos tarvitset apua epänormaalin taulukon tai näkymän tekemiseen, ota yhteyttä tietokannan ylläpitäjään.
Jos haluat puhua tästä koko lähestymistavasta tai strategioida, miten voit tehdä sen, lähetä sähköpostia Chris. Johannes osoitteessa Noaa.gov.
    
#### Tietokantadatasets.xml {#database-in-datasetsxml} 
On vaikeaa luoda oikeaadatasets.xmltarvittavaa tietoaERDDAP™luoda yhteys tietokantaan. Ole kärsivällinen. Ole menetelmällinen.
* Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Sen jälkeen voit muokata sitä hienosti.
        
GenerateDatasets Xml tarjoaa kolme erillistä vaihtoehtoa EDDTableFromDatabase:
1. Jos tulet sisään&#33;&#33;&#33;&#33;&#33; (Ilman lainauksia) luettelon nimi, ohjelma näyttää luettelon luettelon luettelon nimet.
2. Jos tulet sisään&#33;&#33;&#33;&#33;&#33; (Ilman lainauksia) Scheman nimi, ohjelma näyttää luettelon schema nimiä.
3. Jos tulet sisään&#33;&#33;&#33;&#33;&#33; (Ilman lainauksia) taulukon nimeä varten ohjelma näyttää luettelon taulukoista ja niiden sarakkeista. Ensimmäinen "&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33; on se, jota käytetään.
* Lue huolellisesti kaikki tämän asiakirjan tiedot EDDTableFromDatabase.
* Voit kerätä suurimman osan tiedoista, joita tarvitset XML:n luomiseen EDDTableFromDatabase-tietokantaan ottamalla yhteyttä tietokannan ylläpitäjään ja etsimällä verkkoa.
* Vaikka tietokannat käsittelevät usein sarakkeiden nimiä ja taulukkonimiä tapauskohtaisesti, ne ovat tapausherkkiä.ERDDAP. Jos tietokannan virheilmoitus sanoo, että sarakkeen nimi on tuntematon. (Esimerkiksi "tuntematon tunniste" """ *Kolumni »* """") Vaikka tiedät sen olevan olemassa, yritä käyttää kaikkia pääkaupunkeja. *COLUM = Name* Tämä on usein sarakkeen oikea, tapausherkkä versio.
* Työskentele tiiviisti tietokannan ylläpitäjän kanssa, jolla voi olla asiaankuuluvaa kokemusta. Jos aineisto ei lataudu, lue[Virheilmoitus](#troubleshooting-tips)huolellisesti selvittää, miksi.
         
#### JDBC-kuljettaja{#jdbc-driver} 
* (JDBC-kuljettaja)&lt;Kuljettajan nimi » (#jdbc-ohjain) ----- Sinun on hankittava oikea JDBC 3- tai JDBC 4 -ohjaintiedosto tietokantaan ja
Laita se sisään *Tom* /webapps/erddap/WEB-INF/lib asennuksen jälkeenERDDAP. Sitten, sinundatasets.xmlNäitä tietoja varten sinun on määriteltävä&lt;Kuljettajan nimi, joka on (Valitettavasti) Toisin kuin tiedostonimi. Etsi verkkoa JDBC-ohjaimelle tietokantaasi ja ohjainNamea varten.Javatäytyy käyttää sitä.
    
    * MariaDB, kokeile[ https://mariadb.com/kb/en/about-the-mariadb-java-client/ ](https://mariadb.com/kb/en/about-the-mariadb-java-client/)  
The&lt;Kuljettajan nimi &gt; käyttäädatasets.xml  (Katso alapuolelta) Ehkä se on org.mariadb.jdbc. Kuljettaja.
    * MySQL ja Amazon RDS[ https://dev.mysql.com/downloads/connector/j/ ](https://dev.mysql.com/downloads/connector/j/)  
The&lt;Kuljettajan nimi &gt; käyttäädatasets.xml  (Katso alapuolelta) Todennäköisesti com.mysql.jdbc. Kuljettaja.
    * For ForOracleKokeile,[ https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html ](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html).
The&lt;Kuljettajan nimi &gt; käyttäädatasets.xml  (Katso alapuolelta) Ehkä se on oracle.jdbc.driver.OracleKuljettaja.
    * Postgresql sai JDBC 4 -kuljettajan[ https://mvnrepository.com/artifact/org.postgresql/postgresql ](https://mvnrepository.com/artifact/org.postgresql/postgresql)  
The&lt;Kuljettajan nimi &gt; käyttäädatasets.xml  (Katso alapuolelta) Ehkä se on org.postgresql. Kuljettaja.
    * SQL Serverille voit saada JTDS JDBC -kuljettajan[ https://jtds.sourceforge.net ](https://jtds.sourceforge.net).
The&lt;Kuljettajan nimi &gt; käyttäädatasets.xml  (Katso alapuolelta) Net.sourceforge.jtds.jdbc. Kuljettaja.
    
Kun olet laittanut JDBC-kuljettajanERDDAP™Lib-hakemisto, sinun on lisättävä viittaus .jar-tiedostoon .bat- ja/tai .sh-käsikirjoitustiedostoihin GenerateDatasetsille Xml, DasDds ja ArchiveADataset, jotka ovat *Tom* /webapps/erddap/WEB-INF/hakemisto; muuten saat ClassNotFoundExceptionin, kun suoritat käsikirjoituksia.
    
JDBC on joskus ongelman lähde. välittäjänä välittäjänäERDDAP™Tietokanta tekee joskus hienovaraisia muutoksia SQL-standardiin tai yleiseen tietokantaan.ERDDAP™aiheuttaa ja aiheuttaa ongelmia (esimerkiksi liittyvät[ylä-/alhainen tunniste](#quotes-for-names-and-case-sensitivity)ja liittyvät[Päivämäärä / Timezones](#database-date-time-data)) . Ole kärsivällinen, lue tiedot huolellisesti, tarkista työsi ja katso meidän[Lisätuen saaminen](/docs/intro#support).
    
#### Tietokanta&lt;yhteysyhteys omaisuus &gt;{#database-connectionproperty} 
* [...]&lt;Yhteysominaisuus &gt; (#database-yhteysominaisuus) ----- Sisällädatasets.xmlTietokannan osalta sinun on määriteltävä useita yhteyksiä Kiinteistöjä kerrottavaksiERDDAP™Miten yhdistää tietokantaan (esimerkiksi käyttäjänimen, salasanan, sl-yhteyden ja[Näytön koko](#set-the-fetch-size)) . Ne ovat erilaisia jokaisessa tilanteessa, ja niitä on vaikea selvittää. Etsi verkkoa esimerkiksi JDBC-ohjaimen avulla, jotta voit muodostaa yhteyden tietokantaan. The&lt;Yhteysominaisuus &gt; nimet (Esimerkiksi "käyttäjä", "salasana" ja "ssl") , ja jotkut yhteys-Ominaisuuden arvot löytyvät etsimällä verkkoa "JDBC-liitäntäominaisuuksiin" *Tietokannan tietokanta Tyyppi* """ (esimerkiksiOracleMySQL, Amazon RDS, MariaDB, PostgreSQL) .
     
#### Nimien ja herkkyyden nimiä{#quotes-for-names-and-case-sensitivity} 
*   [Kenttä/Column Names: Case Sensitivity](#quotes-for-names-and-case-sensitivity)Oletusarvoisesti EDDTableFromDatabase laittaa ANSI-SQL-standardin kaksinkertaiset merkinnät kentän/sarakkeen nimien ympärille SELECT-lauseissa, jos olet käyttänyt varattua sanaa kenttä- tai sarakenimi tai erityispiirre kentän/sarakkeen nimissä. Kaksinkertaiset merkinnät estävät myös tietyntyyppisiä SQL-injektiohyökkäyksiä. Voit kertoaERDDAP™käyttää ", tai ei lainauksia"&lt;ColumnNameQuotes » Sisällädatasets.xmltälle aineistolle.
    
Monissa tietokannoissa minkä tahansa tyyppisten tarjousten käyttö aiheuttaa tietokannan työskentelyn kentän/sarakkeen nimien kanssa herkällä tavalla. (Oletusarvoisen tietokannan sijaan epäherkkä tapaus) . Tietokannat näyttävät usein tiedoston/sarakkeen nimiä kaikkina ylempänä tapauksena, kun todellisuudessa arkaluonteinen muoto on erilainen. SisälläERDDAP™Ole hyvä ja kohtele tietokannan sarakkeiden nimiä aina herkkinä tapauksina.
    
    * Marialle DB, sinun on suoritettava tietokanta[\\-sql-mode=ANSI \\UOTES](https://mariadb.com/kb/en/mysql-command-line-client/).
    * MySQL:lle ja Amazon RDS:lle sinun on suoritettava tietokanta[\\-sql-mode=ANSI \\UOTES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes).
    *   OracleANSI-SQL-standardin kaksoislainat[Oletuksena](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223).
    * PostgreSQL tukee oletusarvoisesti ANSI-SQL-standardeja.
    
      
Älä käytä varattua sanaa tietokantaan, luetteloon, kaavaan tai taulukon nimeen.ERDDAP™Älä laita tarjouksia niiden ympärille.
    
Jos mahdollista, käytä tietokantaan, luetteloon, kaavaan, taulukon nimiin ja kenttänimiin luotaessa tietokantataulukkoa. (tai näkymä) Kun viitataan kentän/sarakkeen nimiindatasets.xmlSisälläERDDAP. Muussa tapauksessa saatat saada virheilmoituksen, jossa kerrotaan, että tietokanta, luettelo, kaava, taulukko ja / tai kenttä ei löytynyt. Jos saat tämän virheviestin, kokeile tapausherkän version, kaiken ylemmän tapausversion ja kaikki alemman tapauksen versio nimestä.ERDDAP. Yksi niistä voi toimia. Jos et, sinun on muutettava tietokannan, luettelon, kaavan ja/tai taulukon nimi kaikkiin alempaan tapaukseen.
    
#### Tietokanta&lt;Datatiedot Type &gt;{#database-datatype} 
*   [Tietokanta](#database-datatype)[...]&lt;Tietotyyppi &gt; (#datatype) Tagit - Jotain epäselvyyttä, josta[Tietokannan tietojärjestelmät](https://www.w3schools.com/sql/sql_datatypes_general.asp)kartta, johonERDDAP™Tietotyypit, sinun on määriteltävä [&lt;Tietotyyppi &gt; (#datatype) Jokaiseen [&lt;dataVariable&gt; (#Datavariable) kertomaanERDDAP™Minkälaista dataa käytetään. Ongelmana on, että eri tietoaineistot käyttävät erilaisia termejä eri tietotyypeille, joten yritä aina vastata määritelmiin, ei vain nimiin. Katso kuvaus[Standard standard standard standard standard standard standard standard standard standard standard standardERDDAP™Datatiedot Tyypit](#data-types)Tämä sisältää viittaukset vastaavaan SQL-tietotyyppiin.[Päivämäärä ja aikaleima](#database-date-time-data)erityistapaukset: käyttöERDDAPKaksinkertainen data Tyyppi.
     
#### Tietokanta Date Time Data{#database-date-time-data} 
Joissakin tietokantojen ajankohdissa ei ole nimenomaista aikavyöhykettä. Tällaiset sarakkeet ovat vaikeuksiaERDDAP. Tietokanta tukee päivämäärän käsitettä (ajan kanssa tai ilman) ilman aikavyöhykettä, aikaväliä. Mutta kuitenkinJava  (ja sitenERDDAP) Se käsittelee vain hetkellisiä päivämääriä+-aikoja aikavyöhykkeellä. Joten voit tietää, että päivämäärätiedot perustuvat paikalliseen aikavyöhykkeeseen. (Päivänvalon säästöaikaa tai ilman) GMT/ZuluAikavyöhyke, muttaJava  (jaERDDAP) Ei. Ajattelimme, että voisimme toimia tämän ongelman ympärillä. (esim. määrittämällä sarakkeen aikavyöhyke) Tietokanta+JDBC+JavaVuorovaikutus teki tästä epäluotettavan ratkaisun.
* Niin,ERDDAP™edellyttää, että tallennat tietokantataulukkoon kaikki päivämäärä- ja päivämäärätiedot tietokannan tietotyypin kanssa, joka vastaa JDBC-tyyppiä "aikaleima aikavyöhykkeellä" (Ihanteellista, että GMT/ZuluAikavyöhyke) .
* SisälläERDDAP&gt;datasets.xmlSisällä&lt;dataVariable&gt; Tag for a timestamp variable, set
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

ja sisällä&lt;addAttributes&gt; asetettu
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Suositukset: Jos tiedot ovat aikaväli, on hyödyllistä, että aikaleima-arvot viittaavat implisiittiin aikaväliin. (Esimerkiksi keskipäivällä) . Esimerkiksi, jos käyttäjällä on tietoja 2010-03-26T13:00Z toisesta tietoaineistosta ja he haluavat lähimmät tiedot tietokannasta, jolla on tietoja joka päivä, sitten tietokantatiedot 2010-03-26T12:00Z (tiedot kyseisestä päivämäärästä) on ilmeisesti paras (vastakohtana keskiyölle ennen tai jälkeen, jolloin on vähemmän selvää, mikä on parasta.) .
*   ERDDAP™on hyödyllistä[Muunna numero Aikaa / From a String Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* Näytä[MitenERDDAPSopimukset ajan kanssa](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
       
#### Integer-nukkeja{#integer-nulls-1} 
Tietokannat tukevat integer-nukkeja (Pieni, Pieni) sarakkeita, muttaERDDAP™Ei kannata aitoja nukkeja.
Database nulls muunnetaanERDDAP™127 sivusarakkeita, 255 kertasarakkeita, 32767 lyhyitä sarakkeita, 65535 lyhyitä sarakkeita, 2147483647 int sarakkeita, 4294967295 uint sarakkeita, 9 223 3372,036,854,775 807 pitkä sarakkeita, tai 184444073709551615 varten ulong sarakkeita. Jos käytät näitä vikoja, tunnista nämämissing\\_valuetietoaineiston käyttäjilleERDDAP™kanssa

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

tai tai

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

Vaihtoehtoisesti voit käyttää "missing\\_value"Arvon sijaan"
GenerateDatasets Xml lisää automaattisesti nämä \\FillValue-ominaisuudet, kun se tuottaa ehdotetundatasets.xmltietokantaan.

Tietokannan kelluvan pisteen sarakkeita, nulls muunnetaan NaNsERDDAP.
Tietokantatietotyypit, jotka muunnetaan StringsiksiERDDAP™Nulls muunnetaan tyhjiksi purjeiksi.
    
#### Tietokannan turvallisuus{#database-security} 
* Kun työskentelet tietokantojen kanssa, sinun on tehtävä asiat mahdollisimman turvallisesti ja turvallisesti, jotta voit estää haitallisen käyttäjän vahingoittumisen tietokantaan tai saada pääsyn tietoihin, joita he eivät saa käyttää.ERDDAP™Tekee asioita myös turvallisella tavalla.
    * Harkitse toistamista toisella tietokoneella, tietokanta ja tietokantataulukot haluamiesi tietojen kanssa.ERDDAP™palvelemaan. (Kyllä, kaupallisiin tietokantoihin, kutenOracleTämä tarkoittaa ylimääräisiä lisenssimaksuja. Mutta avoimen lähdekoodin tietokantoihin, kuten PostgreSQL, MySQL, Amazon RDS ja MariaDB, tämä ei maksa mitään.) Tämä antaa sinulle korkean turvallisuuden ja estää myösERDDAP™Alkuperäisen tietokannan hidastaminen.
    * Kehotamme sinua perustamaanERDDAP™muodostaa yhteyden tietokantaan tietokannan käyttäjänä, jolla on vain pääsy tietokantaan **asiaankuuluva** Tietokannan tietokanta (s) Hänellä on vain oikeita etuoikeuksia.
    * Kehotamme sinua luomaan yhteydenERDDAP™tietokantaan, jotta
        * Käytä aina SSL:ää
        * sallii yhteyden vain yhdestä IP-osoitteesta (tai yksi osoitteiden lohko) ja yhdestäERDDAP™käyttäjän ja
        * Siirrä salasanoja vain MD5-hajonneessa muodossaan.
    *   \\[Osaaminen\\]Yhteyssopimukset (Sisältää salasanan&#33;) Säilytetään selkeänä tekstinädatasets.xml. Emme ole löytäneet tapaa, jolla järjestelmänvalvoja voi syöttää tietokannan salasanan aikana.ERDDAPAloitus Tomcatissa (joka tapahtuu ilman käyttäjän syöttöä) Tällöin salasanan on oltava saatavilla tiedostossa. Tehdään tästä turvallisempaa:
        * Sinä (TheERDDAP™Hallinnollinen) Pitäisi olla omistajadatasets.xmlLue ja kirjoita käyttöoikeus.
        * Tee ryhmä, joka sisältää vain käyttäjän = Tomcat. Käytä chgrp, jotta ryhmändatasets.xmlVain oikeita etuoikeuksia.
        * Käytä chmodia määrittääksesi O-rwx-oikeudet (Ei Lue tai kirjoita "Muut" käyttäjät) fordatasets.xml.
    * Milloin sisäänERDDAP™salasana ja muut yhteysominaisuudet tallennetaan "yksityiseen"Javamuuttujia.
    * Asiakkaiden pyynnöt laajennetaan ja tarkistetaan pätevyydeksi ennen tietokannan SQL-pyyntöjen luomista.
    * Tietokantaan tehtävät pyynnöt tehdään SQL PreparedStatementsin avulla[SQL-injektio](https://en.wikipedia.org/wiki/SQL_injection).
    * Tietokantaan tehtävät pyynnöt toimitetaan toimeksiannolla Query (Ei täytäntöönpanoa) rajoittaa pyyntöjä vain luettavaksi (SQL-injektiota on yritetty muuttaa tietokantaa, joka epäonnistuu tästä syystä.) .
         
#### SQL{#sql} 
* Koska koskaOPeNDAPTabulaariset tietopyynnöt on suunniteltu jäljittelemään SQL-tabulaarisia tietopyyntöjä, se on helppoaERDDAP™muuntaa Tabular-tietopyynnöt yksinkertaisiksi SQL PreparedStatementsiksi. EsimerkiksiERDDAP™Pyydä
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
Muutetaan SQL PreparedStatement
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
ERDDAP™Pyyntöjä &distinct () ja/taiorderBy ( *Muuttujia* ) Lisää DISTINCT ja/tai Order BY *Muuttujia* SQL:n laatima lausunto. Tämä hidastaa huomattavasti tietokannan vastausta.
ERDDAP™Kirjaudu sisään valmistettuun tilaan[log.txt](/docs/server-admin/additional-information#log)kuin
```
    statement=*thePreparedStatement*  
```
Tämä on tekstiesite, joka voi olla hieman erilainen kuin varsinainen Valmistettu Tila. Esimerkiksi Valmistetussa tilassa ajat koodataan erityisellä tavalla. Tekstien esittelyssä ne näkyvät ISO 8601 -päiväajoina.
     
#### Tietokannan nopeus{#database-speed} 
* Tietokannat voivat olla hitaita. On asioita, joita voit tehdä:
    * Yleisesti -
SQL:n luonne on se, että kyselyt ovat[deklaratiivinen](https://en.wikipedia.org/wiki/Declarative_programming). Se määrittää, mitä käyttäjä haluaa. Ne eivät sisällä eritelmiä tai vihjeitä siitä, miten kyselyä käsitellään tai optimoidaan. Joten ei ole mitään keinoaERDDAP™kyselyn tuottaminen siten, että se auttaa tietokantaa optimoimaan kyselyn. (tai millään tavalla määrittää, miten kyselyä käsitellään.) . Tietokannan ylläpitäjän tehtävänä on määrittää asiat (Esimerkiksi indeksit) Optimoi tietyntyyppisiä kysymyksiä.
##### Aseta jalkojen koko{#set-the-fetch-size} 
Tietokanta palauttaa tiedotERDDAP™chunksissa. Oletusarvoisesti erilaiset tietokannat palauttavat erilaisia rivejä. Tämä määrä on usein hyvin pieni ja erittäin tehoton. Esimerkiksi oletusOracle10&#33; Lue JDBC-dokumentaatio tietokannan JDBC-kuljettajalle, jotta yhteysominaisuus voidaan määrittää tämän lisäämiseksi ja lisää se tietoaineiston kuvaukseen.datasets.xml. Esimerkiksi,
MySQL ja Amazon RDS
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
MariaDB:lle ei tällä hetkellä ole mitään keinoa vaihtaa noituutta. Mutta se on pyydetty ominaisuus, joten etsi verkko nähdä, onko tämä toteutettu.
For ForOraclekäyttää
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
PostgreSQL:n käyttö
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
Ole vapaa muuttamaan numeroa. Liian suuri määrä aiheuttaaERDDAP™käyttää paljon muistia ja todennäköisesti loppua muistista.
#### Yhteensopivuus{#connectionproperties} 
Jokaisella tietokannalla on muita yhteysominaisuuksia, jotka voidaan määrittäädatasets.xml. Monet näistä vaikuttavat tietokannan suorituskykyyn.ERDDAP™yhteys. Lue tietokannan JDBC-kuljettajan dokumentaatio nähdäksesi vaihtoehdot. Jos löydät yhteysominaisuuksia, jotka ovat hyödyllisiä, lähetä sähköpostia, jossa on tiedot.erd dot data at noaa dot gov.
* Tee pöytä -
Saat todennäköisesti nopeampia vastauksia, jos olet säännöllisesti (Joka päivä? Milloin uusia tietoja on?) Luo todellinen pöytä (Samanlainen kuin VIEW) ja kertovatERDDAP™saada tietoja pöydästä VIEW:n sijaan. Koska mikä tahansa pyyntö pöydälle voidaan tehdä ilman, että jätät toisen pöydän, vastaus on paljon nopeampi.
* Tyhjä pöytä -
MySQL ja Amazon RDS reagoivat nopeammin, jos käytät[OPTIMIZE TABLE](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html).
Maria DB vastaa paljon nopeammin, jos käytät[OPTIMIZE TABLE](https://mariadb.com/kb/en/optimize-table/).
PostgreSQL vastaa paljon nopeammin[VACUM](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html)Pöytä.
    Oracleei tarvitse tai tarvitse analogista käskyä.
* Make Make Make Make[Indeksit](https://en.wikipedia.org/wiki/Database_index)Yleisesti rajoitettuja muuttujia -
Voit nopeuttaa monia / eniten kysymyksiä luomalla indeksit tietokantaan muuttujien (Mitä tietokantoja kutsutaan sarakkeiksi) Tämä on usein rajoitettu käyttäjän kyselyyn. Nämä ovat yleensä samoja muuttujia, jotka on määritetty [...]&lt;subsetVariables&gt; (#Subsetvariables) leveys, pituus ja aikamuuttujat.
##### Yhteyden yhdistäminen{#use-connection-pooling} 
normaalisti,ERDDAP™muodostaa erillisen yhteyden tietokantaan jokaisen pyynnön osalta. Tämä on luotettavin lähestymistapa. Nopeampi vaihtoehto on käyttää tietolähteitä, jotka tukevat liitäntäpoolointia. määrittää, määrittää (Esimerkiksi esimerkiksi)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
suoraan vieressä&lt;sourceUrl&gt;,&lt;Kuljettajan nimi ja&lt;yhteysyhteys omaisuus&gt;
ja *Tom* /conf/context.xml, määritä resurssi, jolla on samat tiedot
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
Tietoa datan käytöstä on saatavilla[ https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html ](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html).
Näytä[Tomcat DataSource tiedot](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources)ja[Tomcat DataSource esimerkkejä](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html)Etsi verkkoa esimerkiksi käyttämällä tietolähteitä muiden sovelluspalvelimien kanssa.
* Jos kaikki muu epäonnistuu,
tietojen säilyttäminen kokoelmassaNetCDFv3.nctiedostoja (Erityisesti erityisesti.nctiedostoja, jotka käyttävät[CF Discrete Sampling Geometria (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Kontiguous Ragged Array -tietorakenteet ja niin voidaan käsitelläERDDAP&gt;[EDDTableFromNcFiles](#eddtablefromnccffiles)) . Jos se on loogisesti järjestetty (Jokaisella on dataa avaruuden ja ajan huipulle) ,ERDDAP™Tiedot voidaan kerätä erittäin nopeasti.
         
#### EdDTableFromDatabase Skeleton (käytetty) XML{#eddtablefromdatabase-skeleton-xml} 
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

### EDDTableFromEDDGrid {#eddtablefromeddgrid} 
[ **EDDTableFromEDDGrid** ](#eddtablefromeddgrid)Voit luoda EDDTable-tietokannan mistä tahansaEDDGridDataa.

* Yleisiä syitä tähän ovat:
    * Näin aineistoa voidaan kyseenalaistaaOPeNDAPvalintarajoitukset, jotka ovat eräänlainen "kyselyarvolla" (jota käyttäjä on voinut pyytää) .
    * Tietoaineisto on luonnostaan tabulaarista dataa.
* Maailmanlaajuinen ominaisuus MaxAxis0 (Yleensä tyyppi = "int") , (Oletusarvo on 10) käytetään rajoittamaan akselin määrää\\[0\\]  (Yleensä"time"Akseli) Suljettujen arvotEDDGridtietoja, joita voidaan käyttää tietojen pyyntöä kohden. Jos et halua rajaa, määritä arvo 0. Tämä asetus on tärkeä, koska muuten käyttäjän on liian helppoa pyytää EDDTableFromEDDGridKatso kaikki verkkotietoaineiston tiedot. Se kestää kauan, ja se epäonnistuu lähes kokonaan. Tämä on asetus, joka tekee EDDTableFromin turvalliseksi.EDDGridTietoja omassaERDDAPIlman pelkoa siitä, että ne johtavat kohtuuttomaan tietotekniikan käyttöön.
* Jos suljettuEDDGridon[EDDGridLähde: Eddap](#eddfromerddap)jaERDDAP™on samaERDDAPSitten EDDTableFromEDDGridKäyttää aina tällä hetkellä saatavilla olevaa versiota viitetietoaineistosta. Tämä on erittäin tehokas tapa EDDTableFromEDDGridpääsy verkkotietoihin.
* Tämän luokan [&lt;Reload Jokainen minuutti » (#reloadeverynminutes) Se mitä lasketaan. SuljettuEDDGrid&gt;&lt;EveryNMinutes &gt; on sivuutettu.
* Jos arvo on [&lt;Päivitä kaikki ns. (#updateeverynmillis) Tämä tietoaineisto toimitetaan, se jätetään huomiotta. SuljettuEDDGrid&gt;&lt;Päivitys EveryNMillis on tärkeintä.
*   [GenerateDatasetsXml](#generatedatasetsxml)Tietokannan tyyppi =EDDTableFromEDDGridjoka pyytää URL-osoitettaERDDAP  (Yleensä samaERDDAP)   (Lopputulos "/erddap") säännöllinen ilmaisu. GenerateDatasets Xml tuottaa XML:n EDDTableFromilleEDDGridTiedot jokaisesta verkkotietoaineistostaERDDAP™jolla ondatasetIDjoka vastaa säännöllistä ilmaisua (. . . . . . . .datasetIDs verkottunut tietoaineisto) .
    
GenerateDatasetsXml:n tuottama XML-levy sisältää:
    
    * AdatasetIDMikä onEDDGrid&gt;datasetIDplus: "Kyllä"
    * Maailmanlaajuinen attribuutti, joka onEDDGridtiivistelmä ja uusi ensimmäinen kohta, jossa kuvataan, mitä nämä tiedot ovat.
    * Maailmanlaajuinen nimi, joka onEDDGridOtsikko plus, (kuin pöytä) ".
    * Uusi maxAxis0 globaali ominaisuus, jonka arvo on 10.
#### EDDTableFromEDDGridSkeleton XML{#eddtablefromeddgrid-skeleton-xml} 
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

### EdDTableFromFileNames{#eddtablefromfilenames} 
[ **EdDTableFromFileNames** ](#eddtablefromfilenames)luo tietoaineiston palvelimen tiedostojärjestelmään kuuluvasta tiedostoryhmästä, mukaan lukien kunkin tiedoston URL-osoite, jotta käyttäjät voivat ladata tiedostojaERDDAP&gt;["files"Järjestelmäjärjestelmä](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html). Toisin kuin kaikki[EDDTableFromfiilit](#eddtablefromfiles)alaluokat, tämä tietotyyppi ei palvele tietoja tiedostojen sisällä.

* EDDTableFileNames on hyödyllinen, kun:
    * Sinulla on ryhmä tiedostoja, joita haluat jakaa kokonaisina tiedostoina, koska ne eivät sisällä "tietoja" samalla tavalla kuin tavalliset tietotiedostot. Esimerkiksi kuvatiedostot, videotiedostot, Word-asiakirjat, Excel-laskentatiedostot, PowerPoint-esitystiedostot tai tekstitiedostot, joissa on rakenteeton teksti.
    * Sinulla on ryhmä tiedostoja, joilla on tietoja muodossa, jokaERDDAP™Ei voi vielä lukea. Esimerkiksi projektikohtainen, räätälöity, binaarimuoto.
         
#### EDDTableFromFileNames-tiedot{#eddtablefromfilenames-data} 
*   [Tietoja EDDTableFileNames-tietoaineistosta](#eddtablefromfilenames-data)Pöytä, jokaERDDAP™luo lennon aikana tietoja paikallisista tiedostoista. Pöydässä on rivi jokaiselle tiedostolle. Neljä erityistä ominaisuutta[datasets.xmlTätä aineistoa](#eddtablefromfilenames-skeleton-xml)Määritä, mitkä tiedostot sisältyvät tähän tietoaineistoon:
    
##### tiedostotiedosto Dir{#filedir} 
    *   &lt;tiedostot &gt;- Tämä määrittää lähdehakemiston palvelimen tiedostojärjestelmässä tämän tietoaineiston tiedostojen kanssa. Tiedostot, jotka sijaitsevat palvelimen tiedostojärjestelmässä&lt;tiedostoDir&gt; näkyy tämän tietoaineiston URL-sarakkeessa virtuaalihakemiston sisällä. https://*serverUrl*/erddap/files/*datasetID/* .
Esimerkiksi josdatasetIDJPMURSST,
ja&lt;tiedostoDir&gt; on/home/data/mur/
Hakemistolla on tiedosto nimeltä jplMURSST20150103000.png,
URL-osoite, joka näytetään käyttäjille kyseisestä tiedostosta, on
         https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png .
        
Paikallisen hakemiston lisäksi&lt;tiedostoDir&gt;, voit myös määrittää URL-osoitteen etänä, hakemistona olevalla verkkosivustolla. Tämä toimii:
        
        * Kompromisseja THREDDS, esim.
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Tämä palvelin ei ole enää luotettava.\\]
        * Unaggregated datasarjojaHyraxesim.
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * Useimmat Apachen kaltaiset hakemistot, esim.
            [ https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/ ](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/)
##### Lähde: The Fly{#fromonthefly} 
[\\*\\*Lähde: The Fly](#fromonthefly)----- Muutamia S3-busseja (Noaa-goes17, jossa on 26 miljoonaa tiedostoa) Se voi ottaaERDDAP™enintään 12 tuntia ladata kaikki tiedot pakettien sisällöstä (Sitten on muita ongelmia) . Ympärillämme on erityinen tapa käyttää&lt;tiedostoDir&gt; EDDTableFromFileNamesissa, jotta voit tehdä tietoaineiston hakemistolla ja tiedoston nimillä AWS S3 -laatikosta. Tietoaineistolla ei ole luetteloa kaikista S3-tiedoston hakemistoista ja tiedoston nimistä, joita käyttäjä voi hakea pyyntöjen kautta. Mutta tietoaineisto saa hakemistojen ja tiedostojen nimet lennolla, jos käyttäjä siirtyy hakemistohierarkiaan tietoaineiston avulla."files"vaihtoehto. Näin käyttäjät voivat selata S3-tiedoston hierarkiaa ja tiedostoja tietoaineiston kautta."files"järjestelmä. Tämän tekemiseksi sen sijaan, että S3:n URL-osoite määritettäisiin "Aloitehakemistoksi" (GenerateDatasets XM) tai tai&lt;tiedostot &gt; (Sisällädatasets.xml) Käyttö:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
Esimerkiksi:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
Katso dokumentit[S3 Bucketsin kanssaERDDAP™](#working-with-aws-s3-files)erityisesti kuvaus erityisestä formaatista, jota on käytettävä S3:ssa. näkemään
[Yksityiskohdat ja esimerkki](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket)käyttää\\*\\**Flystä.
        
##### Rekursivointi{#recursive} 
*   &lt;Rekursiivinen &gt; Tiedostot alihankkijoissa&lt;tiedosto &gt; nimillä, jotka vastaavat&lt;tiedosto Regex &gt; näkyy samoissa aliohjeissa"files"URL jos&lt;Toistuva &gt; on totta. Oletus on väärä.
* [...]&lt;Regex &gt; (#pathregex) ----- Jos rekursiivinen = totta, vain hakemistoja, jotka vastaavat PathRegex (Oletusarvo =") hyväksytään. Jos rekursiivinen = väärennös, se on sivuutettu. Sitä käytetään harvoin, mutta se voi olla erittäin hyödyllinen epätavallisissa olosuhteissa. (Näe tämä[Regex-dokumentointi](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)ja[Regex Tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
##### Regex{#fileregex} 
*   &lt;Regex &gt; - tiedostonimi, jossa koko tiedostonimi (Ei sisälly hakemiston nimi) Ottelussa&lt;tiedostoRegex&gt; sisältyy tähän tietoaineistoon. Esimerkiksi jplMURSST. [14]. (Näe tämä[Regex-dokumentointi](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)ja[Regex Tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
         
##### Tiedoston nimien taulukkosisällöt{#from-file-names-data-table-contents} 
Pöydässä on sarakkeita:
* URL- URL-osoite, jota käyttäjät voivat käyttää tiedoston lataamiseenERDDAP&gt;["files"Järjestelmäjärjestelmä](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
* Nimi - tiedoston nimi (Ilman hakemiston nimeä) .
* Viimeksi muutettu - Kun tiedosto on viimeksi muutettu (Tallenna kaksinkertainen"seconds since 1970-01-01T00:00:00Z") . Tämä muuttuja on hyödyllinen, koska käyttäjät voivat nähdä, onko tietyn tiedoston sisältö muuttunut. Tämä muuttuja on[Aika-aika Stamp-muuttuja](#timestamp-variables)Tiedot voivat näkyä numeroarvoina (1970-01-01T00:00:00Z) tai String-arvo (ISO 8601:2004 (E) formaatti) riippuen tilanteesta.
* kokoa - tiedoston koko tavuissa, tallennettuna kaksinkertaisina. Ne tallennetaan kaksinkertaisiksi, koska jotkut tiedostot voivat olla suurempia kuin suodattimet sallivat ja pidempiä ei tueta joissakin vastetiedostotyypeissä. Kaksinkertaiset antavat tarkan koon jopa hyvin suurille tiedostoille.
* Lisäkolumnit määritelläänERDDAP™järjestelmänvalvoja, jolla on tiedostonimestä saatuja tietoja (esimerkiksi tiedoston sisältämiin tietoihin liittyvä aika) perustuen kahteen ominaisuuteen, jotka määrität metatietoihin jokaisesta lisäsarakkeesta/dataVariable:
    
    * Extrex - Tämä on A[Säännöllinen ilmaisu](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([Tutoriaali](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) . Koko regexin on täytettävä koko tiedostonimi. (Ei sisälly hakemiston nimi) . Regexiin tulee kuulua vähintään yksi ryhmä. (säännöllisen ilmaisun osa, joka on vanhemmuuden suljettu) jonkaERDDAP™käyttää määrittämään, minkä tiedostonimen osan avulla kerätään tietoja.
    * Ote Ryhmä- Tämä on kaappausryhmän lukumäärä (#1 on ensimmäinen kuvausryhmä) säännöllisessä ilmaisussa. Oletusarvo on 1. Kiinnitysryhmä on osa säännöllistä ilmaisua, joka on suljettu vanhemmilta.
    
Tässä kaksi esimerkkiä:
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
Jos tiedostossa on nimi jplMURSST20150103000000.png, ote Regex vastaa tiedostonimeä, poimia merkkejä, jotka vastaavat ensimmäistä tallennusryhmää. (20150103000) DataType=String, käytä sitten[Yksiköt sopivat merkkijonoaikoihin](#string-time-units)Laajenna merkkijonot aikatietojen arvoihin (2015-01-03T00:00) .

Jos tiedostossa on nimi jplMURSST20150103000000.png, ote Regex vastaa tiedostonimeä, poimia merkkejä, jotka vastaavat ensimmäistä tallennusryhmää. ("03") kuin [&lt;Tietotyyppi &gt; (#datatype) ·int, joka tuottaa data-arvon 3
        
#### Muut tiedot{#other-information} 
* Ei [&lt;Päivitä kaikki ns. (#updateeverynmillis) ----- Tämän tyyppinen data ei tarvitse eikä voi käyttää&lt;Päivitä EveryNMillis&gt;-tunnisteet, koska EDDTableFileNamesin toimittamat tiedot ovat aina ajan tasalla, koskaERDDAP™Pyydä tiedostojärjestelmää vastaamaan jokaiseen tietopyyntöön. Vaikka tiedostoja on paljon, tämä lähestymistapa toimii kohtuullisen hyvin. Vastaus voi olla hidas, jos tiedostoja on paljon, eikä aineistoa ole haettu pitkään aikaan. Muutaman minuutin kuluttua käyttöjärjestelmä pitää tiedot välimuistissa, joten vastausten on oltava erittäin nopeita.
     
* Voit käyttää[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdäkseendatasets.xmlTsemppiä tämäntyyppiselle datalle. Voit lisätä/määrittää ylimääräisiä sarakkeita tiedostonimestä kerätyillä tiedoilla, kuten yllä on esitetty.
     
#### EdDTableFromFileNames Skeleton (käytetty) XML{#eddtablefromfilenames-skeleton-xml} 
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

### EDDTableFromfiilit{#eddtablefromfiles} 
[ **EDDTableFromfiilit** ](#eddtablefromfiles)Se on kaikkien EDDTableFrom...Files-luokkien superluokka. Et voi käyttää EDDTableFromFiles suoraan. Sen sijaan käytä EDDTableFromFilesin alaluokkaa tietyn tiedostotyypin käsittelemiseksi:

*   [EDDTableFromAsciiFiles](#eddtablefromasciifiles)aggregaa dataa komma-, tab-, semicolon- tai avaruuserotetuista ASCII-datatiedostoista.
*   [EDDTableFromAudiofiilit](#eddfromaudiofiles)kerää tietoja paikallisista äänitiedostoista.
*   [EDDTableFrom Awsxmlfiilit](#eddtablefromawsxmlfiles)Tietoja automaattisesta sääasemasta (AWS) XML-tiedostoja.
*   [EDDTableFromColumnarAsciiFiles](#eddtablefromcolumnarasciifiles)ASCII-datatiedostojen keräämät tiedot kiinteän leveän datan sarakkeilla.
*   [EDDTableFromHyraxTiedostot](#eddtablefromhyraxfiles)  (Vähennetty) aggregoida tietoja useilla muuttujilla, joista jokaisella on yhteinen ulottuvuus (Esimerkiksi aika, korkeus (tai syvyys) Leveys, pituus) ja palvelee a[Hyrax OPeNDAPPalvelin](https://www.opendap.org/software/hyrax-data-server).
*   [EDDTableFromInvalidCRAFiles](#eddtablefrominvalidcrafiles)Aggregoituja tietojaNetCDF  (V3 tai v4)  .nctiedostot, jotka käyttävät CF DSG Contiguous Ragged Array -versiota (CRA) tiedostoja. Vaikka vaikkaERDDAP™tukee tätä tiedostotyyppiä, se on mitätön tiedostotyyppi, jota kenenkään ei pitäisi aloittaa. Ryhmiä, jotka käyttävät tätä tiedostotyyppiä, kannustetaan voimakkaasti käyttämäänERDDAP™luoda kelvollisia CF DSG CRA -tiedostoja ja lopettaa näiden tiedostojen käyttö.
*   [EDDTableFromJsonlCSVFiles](#eddtablefromjsonlcsvfiles)Aggregoituja tietoja[JSON CSV-tiedostot](https://jsonlines.org/examples/).
*   [EDDTableFromMultidimNcFiles Näytä tarkat tiedot](#eddtablefrommultidimncfiles)Aggregoituja tietojaNetCDF  (V3 tai v4)  .nc  (tai tai[.ncml](#ncml-files)) tiedostoja, joissa on useita muuttujia, joista jokaisella on yhteinen ulottuvuus (Esimerkiksi aika, korkeus (tai syvyys) Leveys, pituus) .
*   [EDDTableFromNcFiles](#eddtablefromncfiles)Aggregoituja tietojaNetCDF  (V3 tai v4)  .nc  (tai tai[.ncml](#ncml-files)) tiedostoja, joissa on useita muuttujia, joista jokaisella on yhteinen ulottuvuus (Esimerkiksi aika, korkeus (tai syvyys) Leveys, pituus) . On hienoa jatkaa tätä tietoaineistotyyppiä olemassa oleville tietoaineistoille, mutta uusille tietoaineistoille suosittelemme käyttämään EDDTableFromMultidimNcFilesiä.
*   [EDDTableFromNcFiles](#eddtablefromnccffiles)Aggregoituja tietojaNetCDF  (V3 tai v4)  .nc  (tai tai[.ncml](#ncml-files)) tiedostot, jotka käyttävät yhtä tiedostomuodoista, jotka on määritetty[CF Discrete Sampling Geometria (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)yleissopimuksia. Jos tiedostot käyttävät yhtä moniulotteista CF DSG-muuttujaa, käytä[EDDTableFromMultidimNcFiles Näytä tarkat tiedot](#eddtablefrommultidimncfiles)Sen sijaan.
*   [EDDTableFromNccsvfiilit](#eddtablefromnccsvfiles)Aggregoituja tietoja[NCCSV](/docs/user/nccsv-1.00)ASCII .csv-tiedostoja.
*   [EDDTableFromParquetFiles Näytä tarkat tiedot](#eddtablefromparquetfiles)käsittelee tietoja[Osallistuminen](https://parquet.apache.org/).
*   [EDDTableFromThreddsFiles](#eddtablefromthreddsfiles)  (Vähennetty) koostaa tiedostoja, joissa on useita muuttujia, joiden jaetut ulottuvuudet[3DSOPeNDAPPalvelin](https://www.unidata.ucar.edu/software/tds/).
*   [EDDTableFromWFSTiedostot](#eddtablefromwfsfiles)  (Vähennetty) paikallinen kopio kaikista tiedoistaArcGISMapServerWFSpalvelin, jotta tiedot voidaan palauttaa nopeastiERDDAP™käyttäjiä.

Tällä hetkellä muita tiedostotyyppejä ei tueta. Useimmiten on helppoa lisätä tukea muihin tiedostotyyppeihin. Ota yhteyttä, jos sinulla on pyyntö. Tai jos tietosi ovat vanhassa tiedostomuodossa, josta haluat siirtyä pois, suosittelemme tiedostojen muuntamista.NetCDFv3.nctiedostoja (erityisesti.nctiedostot mukana[CF Discrete Sampling Geometria (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Ragged Array -tietojen rakenneERDDAP™Tietoja voi kerätä nopeasti) .NetCDFon laajasti tuettu, binaarinen muoto, joka mahdollistaa nopean satunnaisen pääsyn tietoihin, ja sitä tukee joERDDAP.

#### Files yksityiskohtia{#fromfiles-details} 
Seuraavat tiedot koskevat kaikkia EDDTableFromFilesin alaluokkia.
##### Yhdistelmä{#aggregation} 
Tämä luokka yhdistää tietoja paikallisista tiedostoista. Jokainen tiedosto sisältää (suhteellisen) Pieni datapöytä.
    * Tuloksena oleva tietoaineisto näyttää siltä, että kaikki tiedoston taulukot on yhdistetty. (kaikki tiedostojen rivit #1 ja kaikki rivit tiedostosta #2,) .
    * Kaikkien tiedostojen ei tarvitse olla määriteltyjä muuttujia. Jos tietyllä tiedostolla ei ole tiettyä muuttujaa,ERDDAP™Lisätään puuttuvat arvot tarpeen mukaan.
    * Kaikissa tiedostoissa on oltava samat arvot[add\\_offset](#scale_factor),[missing\\_value](#missing_value),[| Täytä Arvon arvo](#missing_value),[scale\\_factor](#scale_factor)ja[Yksiköt](#units)attribuutit (Jos) .ERDDAP™Se on epätäydellinen testi, jos on olemassa erilaisia arvoja.ERDDAPei tiedä, mikä on oikein ja mitkä tiedostot ovat mitättömiä. Jos tämä on ongelma, voit käyttää[NCML](#ncml-files)tai tai[NCO](#netcdf-operators-nco)ongelman korjaamiseksi.
         
##### Painavia tiedostoja{#compressed-files} 
Kaikkien EDDTableFromFilesin alaluokkien lähdetiedostot voidaan ulkoisesti pakata (esim..tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2tai .Z) . Nähdään[Ulkoisesti painetut tiedostot](#externally-compressed-files).
     
##### Cached Tiedot{#cached-file-information-1} 
* Kun EDDTableFromFiles-tietoaineisto ladataan ensimmäisen kerran, EDDTableFromFiles lukee tietoja kaikista asiaankuuluvista tiedostoista ja luo taulukoita. (Yksi rivi jokaiseen tiedostoon) Tietoa jokaisesta tiedostosta ja jokaisesta "huonosta" (Erilainen tai mitätön) tiedosto.
    * Pöydät on myös tallennettu levylle, kutenNetCDFv3.nctiedostot sisään *isovanhemmat* /Dataase/ *Last2CharsOfDatasetID* // *datasetID* tiedostoissa nimetty:
Likainen.nc  (jolla on luettelo ainutlaatuisista hakemiston nimistä) ,
tiedostotiedosto Pöytäpöytä.nc  (joka pitää taulukon kunkin voimassa olevan tiedoston tiedoilla) ,
Badfiilejä.nc  (joka pitää taulukon jokaisen huonon tiedoston tiedoilla) .
    * Nopeuttaa pääsyä EDDTableFromFiles-tietoaineistoon (Kustannuksella käyttää enemmän muistia) Voit käyttää
[...]&lt;TallennaMemory &gt; True&lt;/ FileTableInMemory » (#filetableinmemory)   
kertomaanERDDAP™säilyttää kopio tiedostojen tietotaulukoista muistissa.
    * Tiedostotietotaulukoiden kopio on myös hyödyllinen, josERDDAP™Se on suljettu ja uudelleenkäynnistetty: se säästää EDDTablen. Files joutuu lukemaan kaikki tiedostot uudelleen.
    * Kun aineistoa ladataan,ERDDAP™Sinun tarvitsee vain lukea tiedot uusista tiedostoista ja tiedostoista, jotka ovat muuttuneet.
    * Jos tiedosto on erilainen kuin muut tiedostot (Esimerkiksi jokin muuttujan tietotyyppi tai erilainen arvo "[Yksiköt](#units)attribuutti) ,ERDDAPLisää tiedosto luetteloon "huonot" tiedostot. Tiedot tiedoston ongelmasta kirjoitetaan *isovanhemmat* /logs/log.txt-tiedosto.
    * Sinun ei tarvitse koskaan poistaa tai työskennellä näiden tiedostojen kanssa. Yksi poikkeus on: jos teet muutoksia aineistoondatasets.xmlVoit halutessasi poistaa nämä tiedostot pakottaaksesiERDDAP™Lue kaikki tiedostot uudelleen, koska tiedostot luetaan / tulkitaan eri tavalla. Jos haluat poistaa nämä tiedostot, voit tehdä sen, kunERDDAP™Juoksen. (Sitten asetetaan yksi[Lippu](/docs/server-admin/additional-information#set-dataset-flag)Lataa ASAP-tiedot uudelleen.) Kuitenkin,ERDDAP™yleensä huomaa, ettädatasets.xmlTiedot eivät vastaa tiedostoa Pöytätiedot ja poistaa tiedostotaulukot automaattisesti.
    * Jos haluat kannustaaERDDAP™tallennettujen tietoaineistojen päivittäminen (Esimerkiksi, jos olet juuri lisännyt, poistanut tai muuttanut joitakin tiedostoja tietoaineiston hakemistoon.) käyttää[Lippujärjestelmä](/docs/server-admin/additional-information#flag)pakottaaERDDAP™päivittää tallennettuja tiedostoja.
         
##### Käsittelypyynnöt{#handling-requests-1} 
*   ERDDAP™Tabulaariset tietopyynnöt voivat asettaa rajoituksia mihin tahansa muuttujaan.
    * Kun asiakkaan tietopyyntöä käsitellään, EDDTableFromFiles voi nopeasti tarkastella taulukossa päteviä tiedostoja nähdäkseen, mitkä tiedostot saattavat olla relevantteja tietoja. Esimerkiksi, jos kullakin lähdetiedostolla on tiedot yhdestä kiinteästä paikasta, EDDTableFromFiles voi hyvin tehokkaasti määrittää, mitkä tiedostot voivat olla tietoja tietyllä pituusalueella ja leveysalueella.
    * Koska kelvollinen tiedostotietotaulukko sisältää jokaisen muuttujan vähimmäis- ja maksimiarvon jokaisessa voimassa olevassa tiedostossa, EDDTableFromFiles voi usein käsitellä muita kyselyitä melko tehokkaasti. Esimerkiksi, jos joillakin uunilla ei ole ilmanpaineanturia, ja asiakas pyytää tietoja AirPressure&#33;=NaN, EDDTableFromFiles voi tehokkaasti määrittää, mitä uunia on ilmanpainetiedot.
         
##### Cached File -tietojen päivitys{#updating-the-cached-file-information-1} 
Kun tietoaineistoa ladataan uudelleen, tallennetut tiedostotiedot päivitetään.
    
* Rekisteröidyt tiedot ladataan määräajoin määritettynä&lt;palauttaa kaikkiNMinutes &gt; aineiston tiedotdatasets.xml.
* Tiedot ladataan uudelleen mahdollisimman pianERDDAP™havaita, että olet lisännyt, poistanut,[Koskettaminen](https://en.wikipedia.org/wiki/Touch_(Unix)) (Muuttaa tiedoston viimeinen Muutettu aika) tai muuttanut datatiedostoa.
* Tiedot ladataan mahdollisimman pian, jos käytät[Lippujärjestelmä](/docs/server-admin/additional-information#flag).

Kun aineisto on ladattu,ERDDAP™Vertaa nykyisiä saatavilla olevia tiedostoja välimuistissa olevaan tiedostotietotaulukkoon. Uusia tiedostoja luetaan ja lisätään valid-tiedostotaulukkoon. Tiedostot, joita ei enää ole, poistetaan voimassa olevasta tiedostotaulukosta. Tiedostoja, joissa tiedoston aikaleima on muuttunut, luetaan ja niiden tiedot päivitetään. Uudet pöydät korvaavat vanhat pöydät muistissa ja levyllä.
     
##### Huonot tiedostot{#bad-files-1} 
Huonojen tiedostojen taulukko ja syyt, miksi tiedostot julistettiin huonoiksi (korruptoitunut tiedosto, puuttuvat muuttujat, väärät akseliarvot jne.) on lähetetty sähköpostiin Kaikki kaikessa Sähköpostiosoite (Ehkä sinä) Joka kerta, kun aineistoa ladataan uudelleen. Nämä tiedostot on vaihdettava tai korjattava mahdollisimman pian.
     
##### Kadonneet muuttujat{#missing-variables-1} 
Jos osa tiedostoista ei ole osadataVariables on määritelty aineistossadatasets.xmlChunk, se on ihan ok. Kun EDDTableFromFiles lukee yhden näistä tiedostoista, se toimii ikään kuin tiedosto olisi muuttuja, mutta kaikki puuttuvat arvot.
     
##### Lähellä reaaliaikaisia tietoja{#near-real-time-data} 
* EDDTableFromFiles käsittelee pyyntöjä erittäin tuoreista tiedoista erityistapauksena. Ongelma: Jos tietoaineiston muodostavat tiedostot päivitetään usein, on todennäköistä, että tietoaineistoa ei päivitetä aina, kun tiedostoa muutetaan. EDDTableFromFiles ei ole tietoinen muuttuneista tiedostoista. (Voit käyttää[Lippujärjestelmä](/docs/server-admin/additional-information#flag)Mutta tämä voi johtaaERDDAP™aineiston lataaminen lähes jatkuvasti. Useimmissa tapauksissa emme suosittele sitä.) EDDTableFromFiles käsittelee tätä seuraavalla järjestelmällä: MilloinERDDAP™Tietopyyntö viimeisten 20 tunnin aikana (8 tuntia sitten tähän asti) ,ERDDAP™Etsi kaikki tiedostot, joilla on tietoja viimeisen 20 tunnin aikana. Näin,ERDDAP™Ei tarvitse olla täysin ajantasaista tietoa kaikki tiedostot löytää uusimmat tiedot. Sinun pitäisi vielä asettaa [&lt;Reload Jokainen minuutti » (#reloadeverynminutes) kohtuullisen pieni arvo (Esimerkiksi 60) Mutta sen ei tarvitse olla pieni (Esimerkiksi 3) .
     
    *    **Ei suositella** Lähes reaaliaikaisten tietojen järjestäminen tiedostoissa: Jos esimerkiksi sinulla on tietoaineisto, joka tallentaa tietoja useille asemmille. (tai trajektori,) Voit järjestää tiedostot useita vuosia, jotta esimerkiksi yksi tiedosto per asema. Mutta joka kerta, kun uusia tietoja asemalle tulee, sinun täytyy lukea iso vanha tiedosto ja kirjoittaa uusi tiedosto. Ja kunERDDAP™palauttaa tietoaineiston, se huomaa, että joitakin tiedostoja on muutettu, joten se lukee nämä tiedostot kokonaan. Se on tehotonta.
         
    *    **Suositellaan** Lähes reaaliaikaisten tietojen järjestäminen tiedostoissa: Säilytä tiedot chunksissa, esimerkiksi kaikki tiedot yhdestä asemasta/buoy/trajectory yhden vuoden ajan. (tai kuukauden) . Kun uusi datum saapuu, vain tiedosto tämän vuoden aikana. (tai kuukauden) Tietoihin vaikuttaa.
        
        * Paras: KäytäNetCDFv3.nctiedostot, joissa on rajoittamaton ulottuvuus (Aika-aika) . Jos haluat lisätä uusia tietoja, voit vain lisätä uusia tietoja ilman, että sinun tarvitsee lukea ja kirjoittaa koko tiedosto uudelleen. Muutos tehdään erittäin tehokkaasti ja pohjimmiltaan atomisesti, joten tiedosto ei ole koskaan epäjohdonmukaisessa tilassa.
        * Muuten: jos et voi/ei voi käyttää.nctiedostot, joissa on rajoittamaton ulottuvuus (Aika-aika) Kun tarvitset lisätietoja, sinun on luettava ja kirjoitettava uudelleen kaikki tiedostot, joita koskee. (Pieni, koska se on vain vuosi. (tai kuukauden) Datan arvoinen) . Onneksi kaikki edelliset vuodet (tai kuukausia) Tämä asema on muuttumaton.
        
molemmissa tapauksissa, kunERDDAP™tiedostot ovat muuttumattomia, vain muutamat pienet tiedostot ovat muuttuneet ja ne on luettava.
         
##### Johtajat{#directories-1} 
Tiedostot voivat olla yhdessä hakemistossa tai hakemistossa ja sen aliohjeissa. (toistuvasti) . Jos tiedostoja on paljon (Esimerkiksi &gt; 1000) käyttöjärjestelmä (Näin EDDTableFromFiles) Toimii paljon tehokkaammin, jos tallennat tiedostot aliohjaussarjaan. (1 vuosi tai yksi kuukaudessa tiedostojen kanssa) Koskaan ei ole valtavaa määrää tiedostoja tietyssä hakemistossa.
     
##### Etäosastot ja HTTP Range -pyynnöt{#remote-directories-and-http-range-requests-1} 
*    **Etäosastot ja HTTP Range -pyynnöt**   (AKA Byte Serving, Byte Range Requests) -----
    EDDGridFromNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles ja EDDTableFromNcFiles voivat joskus palvella tietoja.nctiedostot etäpalvelimilla ja HTTP:n kautta, jos palvelin tukee[Byte-palvelin](https://en.wikipedia.org/wiki/Byte_serving)HTTP-tarjouspyyntöjen kautta (HTTP-mekanismi tavun tarjoiluun) . Tämä on mahdollista, koska netcdf-java (jonkaERDDAP™käyttää lukemiseen.nctiedostoja) Tukee etäisten tietojen lukemista.nctiedostot HTTP-välipyyntöjen kautta.
    
     **Älä tee tätä&#33;**   
Sen sijaan käytä [&lt;CacheFromUrl &gt; järjestelmä (#cachefromurl) .
    
##### CacheFrom{#cachefromurl} 
* [...] ** &lt;CacheFromUrl &gt; ** ) (#cachefromurl) -
Kaikki Kaikki Kaikki KaikkiEDDGridFromFiles ja kaikki EDDTableFromFiles-aineistot tukevat sarjaa tunnisteita, jotka kertovatERDDAP™ladata ja säilyttää kopio kaikista etätietoaineiston tiedostoista tai muutaman tiedoston välimuisti (Ladattu tarpeen mukaan) . **Tämä on uskomattoman hyödyllinen ominaisuus.** 
    * The&lt;CacheFromUrl&gt;-tunnuksen avulla voit määrittää URL-osoitteen luettelon etätietoaineiston tiedostoista kaukotiedostoluettelosta.
        
        * Kompromisseja THREDDS, esim.
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Tämä palvelin ei ole enää luotettava.\\]
        * Unaggregated datasarjojaHyraxesim.
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * Useimmat Apachen kaltaiset hakemistot, esim.
            [ https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/ ](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/)
        * S3-lisät, esim.
            [ https://noaa-goes17.s3.us-east-1.amazonaws.com/ ](https://noaa-goes17.s3.us-east-1.amazonaws.com/)  
Tämä saattaa kuitenkin vaatia AWS-tiliä ja lisää asennusta.
Näytä[S3 Bucketsin kanssaERDDAP™](#working-with-aws-s3-files).
Yleensä sinun ei tarvitse käyttää välimuistia FromUrl, jossa on tiedostoja S3:ssa, jos tiedostot ovat ASCII-tiedostoja (Esimerkkinä .csv) koskaERDDAP™Voit lukea tiedot tehokkaasti bucketista suoraan virran kautta.
        
        ERDDAP™kopioi tai välittää nämä tiedostot tietoaineiston&lt;tiedoston &gt; hakemisto. Jos tarvitset tukea toiseen etätiedostoluetteloon (Esimerkki: FTP) Lähetä pyyntösi Chrisille. Johannes osoitteessa Noaa.gov.
        
        * Oletusarvo on&lt;CacheFromUrl &gt; tagi on null. Jos et määritä arvoa&lt;CacheFromUrl&gt;-tunniste, kopio-/välimuistijärjestelmää ei käytetä tähän tietoaineistoon.
        * Jos aineisto on&lt;Regex &gt; Asettaminen on jotain muuta kuin... *ERDDAP™Lataa vain tiedostoja, jotka vastaavat tiedostoa Regex.
        * Jos aineisto on&lt;rekursiivinen &gt; asetus on totta ja etätiedostot ovat aliohjaimia,ERDDAP™Katsotaan kaukosäätimet, jotka vastaavat aineiston [&lt;Regex &gt; (#pathregex) Luo sama hakemistorakenne paikallisesti ja laita paikalliset tiedostot samoihin alihankkijoihin.
        * GenerateDatasets XML, jos määrität&lt;CacheFromUrl &gt; arvo, generaatti Dataa XML luo paikallisen&lt;tiedostoDir&gt; hakemisto ja kopioi 1 etätiedosto. GenerateDatasets XML tuottaadatasets.xmlChunk perustuu tuohon otostiedostoon (Määritä näyte Tiedosto = ei mitään) .
        * Jos tietolähde on etäinenERDDAP™käyttää[EDDGridLähde: Eddap](#eddfromerddap)tai tai[EdDTableFromDap](#eddfromerddap)Sen sijaan&lt;CacheFromUrl. Näin paikallisetERDDAP™Näyttää siltä, että tietoja on, mutta ei tarvitse tallentaa mitään tietoja paikallisesti. Ainoa syy käyttää&lt;CacheFromUrl &gt; saada tietoja etänäERDDAP™Jos sinulla on jokin muu syy, miksi haluat saada paikallisen kopion tiedostoista. Tässä tapauksessa:
            * Tämä aineisto pyrkii merkitsemään etänä olevaa tietoaineistoaERDDAPjotta muutokset kyseiseen tietoaineistoon kutsuvat tämän tietoaineiston lippua Url, jolloin tämä paikallinen tietoaineisto ladataan ja ladataan muuttuneet etätiedostot. Näin paikalliset tiedot päivitetään hyvin pian sen jälkeen, kun muutokset on tehty etätietokantaan.
            * Sinun tulisi lähettää sähköpostia kauko-ohjaajalleERDDAP™pyytääkseendatasets.xmletätietoihin, jotta voit tehdä tietoaineiston paikallisessaERDDAP™Näytä samalta kuin etäisessäERDDAP.
        * Jos tietolähde on etäinenERDDAP™Paikallinen tietoaineisto pyrkii tilaamaan etätietoaineiston.
            * Jos tilaus onnistuu, aina kun etäisyysERDDAPlataa ja sisältää uusia tietoja, se ottaa yhteyttä tämän tietoaineiston lippuURL-osoitteeseen, jolloin se lataa ja lataa uudet ja/tai muuttuneet tietotiedostot.
            * Jos tilaus epäonnistuu (Mistä tahansa syystä) Jos haluat vain varmistaa, että paikallinen tietoaineisto on ajan tasalla, voit määrittää[Lippu](/docs/server-admin/additional-information#flag)Paikallinen tietoaineisto, joten se ladataan uudelleen, joten se tarkistaa uudet ja/tai muuttuneet etätiedostot.
        * Jos tietolähde ei ole etäinenERDDAP• Tietoaineisto tarkistaa uudet ja/tai muuttuneet etätiedostot aina, kun se lataa. Normaalisti sitä valvoo [&lt;Reload Jokainen minuutti » (#reloadeverynminutes) . Mutta jos tiedät, milloin on uusia etätiedostoja, voit määrittää[Lippu](/docs/server-admin/additional-information#flag)Paikallisen tietoaineiston osalta se lataa ja tarkistaa uudet ja/tai muutetut etätiedostot. Jos tämä tapahtuu rutiininomaisesti tietyn päivän aikana. (Esimerkki: 7am) Voit tehdä Cron-työn käyttääksesicurlOta yhteyttä lippuun Url tälle tietoaineistolle, joten se lataa ja tarkistaa uudet ja/tai muuttuneet etätiedostot.
    * The&lt;CacheSizeGB&gt;-tunniste määrittää paikallisen välimuistin koon. Sinun täytyy käyttää tätä vain, kun työskentelet pilvitallennusjärjestelmien, kuten[Amazon S3](https://aws.amazon.com/s3/)joka on yleisesti käytetty varastointijärjestelmä, joka on osa[Amazonin verkkopalvelut (AWS) ](https://aws.amazon.com/). Oletusarvo on -1.
        * Jos arvo on&lt;=0 (esimerkiksi oletusarvo -1) ,
            ERDDAP™Lataa ja ylläpidä **täydellinen kopio** kaikista etätietoaineiston tiedostoista tietoaineistossa&lt;tiedostot &gt;
            * Tämä on asetus, jota suositellaan aina kun se on mahdollista.
            * Joka kerta, kun tietoaineisto ladataan uudelleen, se vertailee etätiedostojen ja paikallisten tiedostojen nimiä, kokoja ja viimeistelyaikoja ja lataa kaikki etätiedostot, jotka ovat uusia tai muuttuneet.
            * Jos etäpalvelimella oleva tiedosto katoaa,ERDDAP™ei poista vastaavaa paikallista tiedostoa (jos etäpalvelimessa oli tilapäisesti vikaa,ERDDAP™Voit poistaa osan tai kaikki paikalliset tiedostot&#33;) .
            * Tällä asetuksella yleensä asetat&lt;Päivitä EveryNMillis&gt;-1, koska tietoaineisto on tietoinen, kun se on kopioinut uusia tiedostoja.
        * Jos arvo on 0,
            ERDDAP™Lataa tiedostoja etätietoaineistosta tarpeen mukaan paikalliseen **Cash** (tietokannan sisällä)&lt;tiedostoDir&gt;), jonka kynnyskoko on määritetty GB-määrä.
            * Välimuistin on oltava riittävän suuri, jotta se voi säilyttää ainakin useita tiedostoja.
            * Mitä suurempi välimuisti, sitä parempi, koska seuraava pyydetty tietotiedosto on todennäköisemmin jo välimuistissa.
            * Kapselia tulee käyttää vain silloin, kunERDDAP™Toimii pilvipalvelun palvelimella (Esimerkki: AWS Computer) etätiedostot pilvitallennusjärjestelmässä (AWS S3) .
            * Kun tiedostojen käyttämä levytila ylittää välimuistin SizeGB,ERDDAP™Pian tulee (Ei ehkä heti) Poista osa tiedostoista (Tällä hetkellä vähiten käytettyjen (LR) Algoritmi) kunnes paikallisten tiedostojen käyttämä levytila on&lt;0,75 *kacheSizeGB ("tavoitteen") . Kyllä, on tapauksia, joissa LRU toimii erittäin huonosti, ei ole täydellistä algoritmia.
            *   ERDDAP™Älä koskaan yritä poistaa tiedostoa, jokaERDDAP™Käyttö alkoi viimeisten 10 sekunnin aikana. Tämä on epätäydellinen järjestelmä, joka käsittelee välimuistijärjestelmää ja datatiedostojen lukijajärjestelmä on vain löyhästi integroitu. tämän säännön vuoksi,ERDDAP™Et ehkä voi poistaa tarpeeksi tiedostoja saavuttaakseen tavoitteensa, jolloin se tulostaa Varoitusta log.txt-tiedostoon, ja järjestelmä tuhlaa paljon aikaa yrittää karsia välimuistia, ja on mahdollista, että välimuistin tiedostojen koko voi suuresti ylittää välimuistin. Jos näin on, käytä suurempaa CacheSizeGB-asetusta kyseiseen tietoaineistoon.
            * Tällä hetkellä,ERDDAP™Älä koskaan tarkista, onko etäpalvelimella uusi versio paikallisesta välimuistista. Jos tarvitset tätä ominaisuutta, pyydämme sähköpostia. Johannes osoitteessa Noaa.gov.
        * Vaikka samojen nimien käyttö saattaa tarkoittaa, että kopiojärjestelmä ja välimuistijärjestelmä käyttävät samaa taustalla olevaa järjestelmää, se ei ole oikein.
            * Kopiojärjestelmä käynnistää ennakoivasti tehtäväThread-tehtävät uusien ja muuttuneiden tiedostojen lataamiseksi aina, kun tietoaineistoa ladataan uudelleen. Ainoastaan paikalliseen hakemistoon kopioidut tiedostot ovat käytettävissäERDDAP™Dataa.
            * Välimuistijärjestelmä saa etätiedostoluettelon joka kerta, kun tietoaineisto ladataan uudelleen ja teeskennetään, että kaikki nämä tiedostot ovat käytettävissä.ERDDAP™Dataa. Mielenkiintoista on, että kaikki etätiedostot näkyvät jopa tietoaineiston / tiedostojen / verkkosivujen ja ovat saatavilla ladata. (Vaikka ehkä vasta myöhästymisen jälkeen, kun tiedosto ladataan ensin etäpalvelimesta paikalliseen välimuistiin.) 
        * CacheSizeGB:tä käyttävät tiedot voivat hyötyä[nthreads](#nthreads)Aseta suurempi kuin 1, koska tämä mahdollistaa tietojen lataamisen yli 1 etätiedostoa kerrallaan.
    * The&lt;CachePartialPathRegex&gt;-tunniste on harvoin käytetty tunniste, joka voi määrittää aineiston vaihtoehdon.&lt;Regex &gt; (#pathregex) . Oletusarvo on nolla.
        * Käytä tätä vain, jos kopioit koko tietoaineiston oletusarvoisesti.&lt;CacheSizeGB &gt; arvo -1.&lt;CacheSizeGB&gt;-arvot &gt;1, tämä jää huomiotta, koska se on järjetöntä.
        * Katso [dokumentti]&lt;Regex &gt; (#pathregex) Ohjeita regexin rakentamiseen.
        * Jos tämä on määritelty, sitä käytetään joka kerta, kun aineisto ladataan uudelleen, paitsi ensimmäisen kerran, kun tietoaineisto ladataan kuukauden alussa.
        * Tämä on hyödyllistä, kun etätietokanta tallennetaan alihankkijoiden labyrinttiin ja kun suurin osa näistä tiedostoista muuttuu harvoin, jos koskaan. (()&lt;yskä » Nasa&lt;cough &gt;) Voit esimerkiksi määrittää a&lt;CachePartialPathRegex vastaa kuluvaa vuotta tai kuluvaa kuukautta. Nämä regexit ovat hyvin hankalia määritellä, koska kaikkien osittaisten ja täydellisten reittien nimien on vastattava niitä.&lt;CachePartialPathRegex &gt; ja koska&lt;CachePartialPathRegex &gt; on tehtävä yhteistyötä kauko-URL-osoitteiden ja paikallisten hakemistojen kanssa. Todellinen esimerkki on:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
Yllä oleva näyte URL-osoite sisältää tiedostoja vuoden perusteella (esim. 2018) Vuoden päivä (esimerkiksi 001, 002, ..., 365 tai 366) .
Huomaa, että&lt;CachePartialPathRegex &gt; Aloitetaan.*
sen jälkeen on erityinen aliohjelma, joka on yleinen kauko-URL-osoitteille ja paikallisille hakemistoille, esim.
Sitten on sarja pested capture -ryhmiä, joissa ensimmäinen vaihtoehto ei ole mitään.
Toinen vaihtoehto on erityinen arvo.
            
Yllä oleva esimerkki vastaa hakemistoja vain vuoden 2018 toisella 10 päivällä, esimerkiksi
             https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[2020-10-21 Tämä palvelin ei ole enää luotettava.\\]  
Päivä 011, 012, 019.
             (Näe tämä[Regex-dokumentointi](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)ja[Regex Tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
Jos tarvitset apua luomiseen&lt;CachePartialPathRegex &gt; Lähetä sähköpostia&lt;CacheFromUrl &gt; Chris Johannes osoitteessa Noaa.gov.
            
        * Yhteinen lähestymistapa: Jos haluat käyttää&lt;Älä käytä sitä aluksi, koska haluatERDDAP™Lataa kaikki tiedostot aluksi. JälkeenERDDAP™on ladannut kaikki tiedostot, lisää se tietoaineiston roskakoriindatasets.xml.
             
##### Tuhansia tiedostoja{#thousands-of-files} 
Jos sinulla on tuhansia tiedostoja,ERDDAP™Voi olla hidasta vastata kyseisten tietojen pyyntöihin. Tässä on kaksi kysymystä:
 

1. tiedostojen määrä hakemistoa kohden.
sisäisesti,ERDDAP™Toimii samalla nopeudella riippumatta siitä, ovatko n-tiedostot yhdessä hakemistossa vai hajautetaanko useissa hakemistoissa.
     
On kuitenkin ongelma: Mitä enemmän tiedostoja tietyssä hakemistossa, sitä hitaampi käyttöjärjestelmä on palauttamassa luettelon tiedostoista hakemistossa. (tiedostoa) ettäERDDAP. Vastausaika voi olla O (n log n) . On vaikea sanoa, kuinka monta tiedostoa yhdellä hakemistolla on liikaa, mutta 10 000 on liikaa. Joten jos asennus tuottaa paljon tiedostoja, suositus tässä voi olla: laita tiedostot loogisesti järjestettyihin aliohjaimiin. (Asema tai asema/vuosi) .
    
Toinen syy käyttää aliohjelmia: jos käyttäjä haluaa käyttääERDDAP&gt;"files"Järjestelmä löytää vanhimman tiedoston nimi aseman X, se on nopeampi ja tehokkaampi, jos tiedostot ovat aseman / vuoden aliohjaus, koska paljon vähemmän tietoja on siirrettävä.
    
2. tiedostojen kokonaismäärä.
Tabulaariset tiedot,ERDDAP™Seuraa kunkin tiedoston arvojen vaihteluväliä. Kun käyttäjä tekee pyynnön,ERDDAP™Sinun on luettava kaikki tiedot kaikista tiedostoista, joilla voi olla tietoja käyttäjän pyynnöstä. Jos käyttäjä pyytää tietoja rajoitetun ajan (esimerkiksi päivä tai kuukausi) sittenERDDAP™Sinun ei tarvitse avata liikaa tiedostoja tietokantaan. On olemassa äärimmäisiä tapauksia, joissa lähes kaikilla tiedostoilla voi olla yhteensopivia tietoja. (kun vesilämpötila = 13.2C) . Koska tarvitaanERDDAP™Vähän aikaa (osittain etsiä aikaa HDD, osittain aika lukea tiedoston otsikko.) Avaa vain tietty tiedosto (enemmän, jos hakemistossa on paljon tiedostoja) on huomattava määräaikaa, jos tiedostojen kokonaismääräERDDAP™Avaaminen on hyvin suuri. 1000 tiedoston avaaminen vie aikaa. Joten on olemassa etuja päivittäisten tiedostojen säännöllisessä konsolidoinnissa suuremmiksi tuoleiksi. (1 asema 1 vuodeksi) . Ymmärrän, että et ehkä halua tehdä tätä eri syistä, mutta se johtaa paljon nopeampiin vastauksiin. äärimmäisissä tapauksissa (GTSPP-tietokanta, jossa on ~35 miljoonaa lähdetiedostoa) tiedostojen antaminen valtavasta määrästä on epäkäytännöllistä, koskaERDDAPVastaus yksinkertaisiin kyselyihin voi kestää tunteja ja käyttää tonnia muistia. tiedostojen yhdistäminen pienempiin numeroihin (GTSPP:lle minulla on nyt 720, kaksi kuukaudessa.) ,ERDDAP™Vastaa kohtuullisen nopeasti. Näytä[Miljoonia tiedostoja](#millions-of-files)  
     

N.B. Solid State Drives on hyvä&#33; Helpoin ja helpoin tapa auttaaERDDAP™Suunnittele valtava määrä (Pieniä pieniä pieniä) Tiedostot ovat kiinteän valtion asemaa. Näytä[Solid State Drives on hyvä&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
##### Miljoonia tiedostoja{#millions-of-files} 
* Joissakin tiedostoissa on miljoonia lähdetiedostoja.ERDDAP™Se voidaan hoitaa, mutta sekoitettu tulos.
    
    * Pyynnöt, jotka sisältävät vain muuttujia, jotka on lueteltu&lt;subsetVariables&gt; (#Subsetvariables) ,ERDDAP™sisältää kaikki tarvittavat tiedot, jotka on jo otettu datatiedostoista ja tallennettu yhteen tiedostoon, joten se voi vastata hyvin, hyvin nopeasti.
    * muihin pyyntöihin,ERDDAP™voi skannata datan[Cached tiedostojen tiedot](#cached-file-information)ja selvittävät, että vain muutamalla tiedostolla saattaa olla pyynnön kannalta merkityksellisiä tietoja ja vastaavat nopeasti.
    * Muihin pyyntöihin (Esimerkiksi vesiputous = 18 astetta) missä tahansa tiedostossa saattaa olla olennaisia tietoja,ERDDAP™On avattava useita tiedostoja nähdäkseen, onko jokaisella tiedostolla pyynnön kannalta merkityksellisiä tietoja. Tiedostot avataan peräkkäin. kaikissa käyttöjärjestelmissä ja kaikissa tiedostoissa (Muut kuin kiinteät valtiot) Tämä kestää kauan (niinERDDAP™Vastaa hitaasti) Todella tiivistää tiedostojärjestelmän (niinERDDAP™Vastaa hitaasti muihin pyyntöihin) .
    
Onneksi on olemassa ratkaisu.
    
    1. Aseta aineisto ei-julkiseenERDDAP™  (Henkilökohtainen tietokoneesi?) .
    2. Luo ja tee käsikirjoitus, joka pyytää sarjaa.ncCF-tiedostot, joista jokaisella on suuri tietoaineisto, yleensä ajanjakso (Esimerkiksi kaikki tiedot tiettyyn kuukauteen) . Valitse ajanjakso siten, että kaikki tuloksena olevat tiedostot ovat alle 2GB (toivottavasti suurempi kuin 1GB) . Jos aineistossa on lähes reaaliaikaisia tietoja, suorita käsikirjoitus tiedoston uusimiseksi nykyisen ajanjakson ajaksi. (esim. tässä kuussa) usein (10 minuutin välein? Joka tunti?) . PyyntöjäERDDAP™for.ncCF-tiedostot luovatNetCDFv3.nctiedosto, joka käyttää[CF Discrete Sampling Geometria (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Ragged Array -tietorakenteet).
    3. Aseta yksi[EDDTableFromNcFiles](#eddtablefromnccffiles)Tietoja yleisöstäsiERDDAP™joka saa tietoja.nc (CF) tiedostoja.ERDDAP™Tiedot voidaan poistaa näistä tiedostoista erittäin nopeasti. Nyt on kymmeniä tai satoja (miljoonien sijaan) tiedostoja, vaikkaERDDAP™Avaa kaikki tiedostot, se voi tehdä niin nopeasti.
    
Tämä järjestelmä vaatii aikaa ja vaivaa, mutta se toimii hyvin. Suurin osa tietopyynnöistä voidaan käsitellä 100 kertaa nopeammin kuin ennen.
    \\[Bob tiesi, että tämä oli mahdollisuus, mutta Kevin O'Brien, joka teki tämän ja osoitti sen toimivan hyvin. Nyt, Bob käyttää sitä GTSPP-tietokantaan, jossa on noin 18 miljoonaa lähdetiedostoa.ERDDAP™Käytössä noin 500.nc (CF) tiedostoja.\\]
    
N.B. Solid State Drives on hyvä&#33; Helpoin ja helpoin tapa auttaaERDDAP™Suunnittele valtava määrä (Pieniä pieniä pieniä) Tiedostot ovat kiinteän valtion asemaa. Näytä[Solid State Drives on hyvä&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
    
##### Valtavat tiedostot{#huge-files} 
* Yksi iso datatiedosto (Erityisen suuri ASCII-tiedosto) Se voi aiheuttaa OutOfMemory-virheen. Jos tämä on ongelma, se on selvää, koskaERDDAP™ei ladata tietoaineistoa. Ratkaisu, jos mahdollista, on jakaa tiedosto useisiin tiedostoihin. Ihannetapauksessa voit jakaa tiedoston loogisiin ketjuihin. Esimerkiksi, jos tiedostossa on 20 kuukauden datan arvo, jaa se 20 tiedostoon, joista jokaisella on 1 kuukauden tiedot. Mutta on olemassa etuja, vaikka päätiedosto on jaettu mielivaltaisesti. Näillä menetelmillä on useita etuja: a) Tämä vähentää muistin tarvetta lukea tiedostoja 1/20, koska vain yksi tiedosto luetaan kerrallaan. b) usein,ERDDAP™voi käsitellä pyyntöjä paljon nopeammin, koska sen on vain katsottava yhdestä tai muutamasta tiedostosta löytääkseen tiedot tietystä pyynnöstä. c) Jos tietojen kerääminen on käynnissä, olemassa olevat 20 tiedostoa voivat pysyä muuttumattomina, ja sinun on muutettava vain yhtä, pientä ja uutta tiedostoa lisätäksesi seuraavan kuukauden tietojen arvon tietokantaan.
     
##### FTP Trouble/Advice{#ftp-troubleadvice-1} 
* Jos olet FTP:n uusi tietotiedostoERDDAP™palvelimen aikanaERDDAP™juokseminen, on mahdollisuus, ettäERDDAP™Rekisteröidään FTP-prosessin aikana. Tämä tapahtuu useammin kuin uskotkaan&#33; Jos näin tapahtuu, tiedosto näyttää olevan voimassa. (Hänellä on voimassa oleva nimi) Mutta tiedosto ei ole voimassa. JosERDDAP™yrittää lukea tietoja siitä mitättömästä tiedostosta, mikä johtaa siihen, että tiedosto lisätään mitättömien tiedostojen taulukkoon. Se ei ole hyvä. Tämän ongelman välttämiseksi käytä tilapäistä tiedostonimeä, kun FTP on tiedostossa, esimerkiksi ABC2005..nc• Temps, sitten tiedostonameregex-testi (Katso alapuolelta) Se osoittaa, että tämä ei ole relevantti tiedosto. Kun FTP-prosessi on valmis, nimeä tiedosto uudelleen oikeaan nimeen. Uudelleenmääritysprosessi saa tiedoston ajankohtaiseksi hetkessä.
    
##### Tiedoston nimi uutinen{#file-name-extracts} 
\\[Tämä ominaisuus on poistettu. Käytä[\\*\\**filename pseudosourceName](#filename-sourcenames)Sen sijaan.\\]  
EDDTableFromFilesillä on järjestelmä, joka poistaa Stringin jokaisesta tiedostonimestä ja käyttää sitä pseudotietojen muuttuvuuden aikaansaamiseksi. Tällä hetkellä ei ole olemassa järjestelmää, joka tulkitsee näitä resursseja päivämäärinä/aikoina. On olemassa useita XML-tunnisteita tämän järjestelmän perustamiseksi. Jos et tarvitse osaa tai koko tätä järjestelmää, älä vain määritä näitä tunnisteita tai käytä ”arvoja”.

* PreextractRegex on yksi[Säännöllinen ilmaisu](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([Tutoriaali](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) Tekstin tunnistaminen poistetaan tiedostonimen alusta. Poistaminen tapahtuu vain, jos regex on sovitettu. Tämä alkaa tavallisesti ^ tiedoston nimen alussa.
* Post post post post post post post post post post ExtractRegex on säännöllinen ilmaisu, jota käytetään tiedostonimen lopusta poistettavan tekstin tunnistamiseen. Poistaminen tapahtuu vain, jos regex on sovitettu. Tämä yleensä päättyy "$" vastaamaan tiedoston nimi.
* Ote Regex Jos näin on, tätä säännöllistä ilmaisua käytetään preExtractRegexin ja postExtractRegexin jälkeen tiedostonimestä erotettavan merkkijonon tunnistamiseksi. (EsimerkiksistationID) . Jos regexiä ei ole sovitettu, koko tiedostonimeä käytetään (miinus preextract ja post Extract) . Käytä ".*" vastaamaan koko tiedostonimeä, joka on jäljellä preextractRegexin ja postExtractRegexin jälkeen.
* Kolumni NameForExtract on uutettujen Stringien tietolähteen nimi. AdataVariableTämän kanssa[sourceName](#sourcename)täytyy olla mukanadataVariableLuettelo (missä tahansa tietotyypissä, mutta yleensä) .

Esimerkiksi, jos tietoaineistossa on tiedostoja, joissa on nimiä, kuten XYZAble..ncXYZBaker.ncXYZCharlie.nc... ja haluat luoda uuden muuttujan (stationID) kun jokainen tiedosto on luettavissa, jolla on asentotunnusarvot (Able, Baker, Charlie ............) Poistettu tiedostonimistä, voit käyttää näitä tunnisteita:

*   &lt;PreextractRegex_XYZ&lt;Preextractregex &gt;
Alkuperäisnimi on säännöllinen ilmaisu, joka pakottaaERDDAP™Etsi XYZ heti tiedoston nimen alussa. Tämä aiheuttaa XYZ, jos se on löydetty tiedostonimen alussa, poistaa (tiedostonimi XYZAble.ncmuuttuu kyvyksi.nc) .
*   &lt;PostExtractRegex ».nc$&lt;Postextextractregex &gt;
Loppujen lopuksi $ on säännöllinen ilmaisu, joka pakottaaERDDAP™etsimään.nctiedoston lopussa. Koska . on säännöllinen ilmaisu (joka vastaa mitä tahansa hahmoa) Se on koodattu niin kuin... täällä täällä täällä (Koska 2E on heksadesimaalinen numero) . Tämä aiheuttaa.ncjos tiedoston nimi on poistettu, (Esimerkiksi osittainen tiedostonimi On.ncmuuttuu kyvyksi) .
*   &lt;Ote Regex &gt;&lt;ExtractRegex &gt;
Säännöllinen ilmaisu vastaa kaikkia jäljellä olevia hahmoja. (Esimerkiksi osittainen tiedostonimi Able on ensimmäinen tiedosto) .
*   &lt;ColumnNameForExtractstationID&lt;ColumnNameForExtract
Tämä kertooERDDAP™Uuden lähdekoodin sarakkeen luominenstationIDKun luet jokaisen tiedoston. Jokainen rivi tiedot tietyn tiedoston on teksti poimittu sen tiedoston nimi. (esimerkiksi On) Kun arvo onstationIDkolumni.

Useimmissa tapauksissa on olemassa lukuisia arvoja, jotka tuottavat samat tulokset - säännölliset ilmaisut ovat hyvin joustavia. Joissakin tapauksissa on vain yksi tapa saada toivottuja tuloksia.
     
##### PseudosourceNames{#pseudo-sourcenames} 
Kaikki muuttujat kaikissa aineistoissaERDDAP™Hänellä on [&lt;sourceName&gt; (#lähde) Se määrittää lähteen nimen muuttujalle. EDDTableFromFiles tukee muutamaa pseudoasourceNamejotka tuovat arvoa jostain muusta paikasta (tiedoston nimi tai globaalin attribuutin arvo) ja edistää tätä arvoa pysyvien arvojen sarakkeena kyseiselle datan roiskulle (esim. tiedoston tietojen taulukko) . Näiden muuttujien osalta sinun on määritettävä muuttujan tietotyyppi [-]&lt;Tietotyyppi &gt; (#datatype) Tag. Jos poimitut tiedot ovat päivämäärän ajan merkkijono, määrität päivämäärän ajan merkkijonon muodon[Yksiköiden attribuutti](#string-time-units). PseudosourceNameVaihtoehtoja ovat:
 
###### Globaali:sourceNames{#global-sourcenames} 
Maailmanlaajuinen metadata-ominaisuus kussakin lähdetiedostossa voidaan edistää tietojen sarakkeeksi. Jos muuttuja&lt;sourceName&gt; Muotokuva
```
        <sourceName>global:*attributeName*</sourceName>
```
silloin kunERDDAP™lukee tietoja tiedostosta,ERDDAP™Etsitään tuon nimen globaalia ominaisuutta. (Esimerkiksi PI) Luo sarake, joka on täytetty attribuutin arvolla. Tämä on hyödyllistä, kun attribuutilla on erilaisia arvoja eri lähdetiedostoissa, koska muuten käyttäjät näkevät vain yhden näistä arvoista koko tietoaineistossa. Esimerkiksi,
```
        <sourceName>global:PI</sourceName>
```
Kun edistetään attribuuttia ollakseen dataa,ERDDAP™poistaa vastaavan attribuutin. Tämä on tarkoituksenmukaista, koska arvo on oletettavasti erilainen kaikissa tiedostoissa, kun taas kootussa aineistossa.ERDDAP™Sillä on vain yksi arvo. Jos haluat, voit lisätä uuden arvon koko tietoaineistolle lisäämällä&lt;nimi =" *attribuutti Nimen nimi* &gt; &gt; *Uusi uusi uusi Arvon arvo* &lt;/att &gt; aineiston globaaliin [...]&lt;addAttributes&gt; (#addattribuutti) . Globaalit ominaisuudet, jotkaERDDAP™Vaatii esimerkiksi instituutiota, sinun on lisättävä uusi arvo attribuutille.
     
###### Vaihtoehtoisia:sourceNames{#variable-sourcenames} 
Muuttujan metadata-ominaisuus kussakin tiedostossa voidaan edistää tietojen sarakkeeksi. Jos muuttuja&lt;[sourceName](#sourcename)• Muotokuva on
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
silloin kunERDDAP™lukee tietoja tiedostosta,ERDDAP™Etsitään määritettyjä ominaisuuksia (Esimerkiksi ID) määritetty muuttuja (Esimerkiksi väline) ja luoda sarake, joka on täytetty attribuutin arvolla. Emomuuttuja (Esimerkiksi väline) Ei tarvitse olla yksidataVariables aineiston määritelmän mukaanERDDAP. Esimerkiksi,
```
        <sourceName>variable:instrument:ID</sourceName>
```
Tämä on hyödyllistä, kun attribuutilla on erilaisia arvoja eri lähdetiedostoissa, koska muuten käyttäjät näkevät vain yhden näistä arvoista koko tietoaineistossa.

Kun edistetään attribuuttia ollakseen dataa,ERDDAP™poistaa vastaavan attribuutin. Tämä on tarkoituksenmukaista, koska arvo on oletettavasti erilainen kaikissa tiedostoissa, kun taas kootussa aineistossa.ERDDAP™Sillä on vain yksi arvo. Jos haluat, voit lisätä uuden arvon koko tietoaineistolle lisäämällä&lt;nimi =" *attribuutti Nimen nimi* &gt; &gt; *Uusi uusi uusi Arvon arvo* &lt;&gt; muuttujien [&lt;addAttributes&gt; (#addattribuutti) . attribuutit, jotkaERDDAP™vaativat esimerkiksiioos\\_category  (riippuen asennuksestasi) Sinun on lisättävä uusi arvo attribuutille.
        
###### tiedoston nimisourceNames{#filename-sourcenames} 
Voit poistaa osan tiedoston tiedoston nimestä ja edistää sitä tietojen sarakkeeksi. Tämä pseudo-muoto [&lt;sourceName&gt; (#lähde) on
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
Esimerkiksi,
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
Kun EDDTableFromFiles lukee tietoja tiedostosta, se varmistaa tiedoston nimen. (A201807041442.slcpV1.nc) Se vastaa määritettyä säännöllistä ilmaisua (”Regex”) Poista määritetyt (Tässä tapauksessa ensimmäinen) Ryhmän vangitseminen (joka on osa vanhempien ympäröimänä) Esimerkiksi ”201807041442”. (Näe tämä[Regex-dokumentointi](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)ja[Regex Tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) Regex voidaan määritellä merkkijono, jolla on tai ei ole ympäröiviä lainauksia. Jos regex on määritelty merkkijono, jossa on ympäröiviä lainauksia, merkkijonon on oltava[JSON-tyylinen](https://www.json.org/json-en.html)  (erityishahmoilla pakenneet hahmot) . Ryhmän numero on yleensä 1 (Ensimmäinen kaappausryhmä) Mutta voi olla mikä tahansa numero.
     
###### Paikka nimeltäsourceNames{#pathname-sourcenames} 
Voit poistaa osan tiedoston koko reitistä Nimen nimi (Ohjeet / FileName.ext) edistää sitä tietojen sarakkeeksi. Tämä pseudo-muoto [&lt;sourceName&gt; (#lähde) on
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
Esimerkiksi,
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
Kun EDDTableFromFiles lukee tietoja tiedostosta, se varmistaa koko polun nimen. (Esimerkiksi /data/myDatasetID/BAY17/B201807041442.nc. Tätä testiä varten hakemistot ovat aina'/'Ei koskaan " """) Se vastaa määritettyä säännöllistä ilmaisua (”Regex”) Poista määritetyt (Tässä tapauksessa ensimmäinen) Ryhmän vangitseminen (joka on osa vanhempien ympäröimänä) Esimerkiksi ”Bay17”. (Näe tämä[Regex-dokumentointi](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)ja[Regex Tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) Regex voidaan määritellä merkkijono, jolla on tai ei ole ympäröiviä lainauksia. Jos regex on määritelty merkkijono, jossa on ympäröiviä lainauksia, merkkijonon on oltava[JSON-tyylinen](https://www.json.org/json-en.html)  (erityishahmoilla pakenneet hahmot) . Ryhmän numero on yleensä 1 (Ensimmäinen kaappausryhmä) Mutta voi olla mikä tahansa numero.
         
##### "0 tiedostoa" Virheellinen viesti{#0-files-error-message-2} 
* Jos juokset[GenerateDatasetsXml](#generatedatasetsxml)tai tai[Dasds](#dasdds)Tai jos yrität ladata EDDTableFrom... Tiedostot sisältyvätERDDAP™saat "0 tiedostoa" -virheviestin, joka osoittaa, ettäERDDAP™Hakemistossa 0 tiedostoa (kun luulet, että hakemistossa on vastaavat tiedostot) :
    * Tarkista, että tiedostot ovat todella tässä hakemistossa.
    * Tarkista hakemiston nimi.
    * Katso tiedosto NameRegex. On todella helppoa tehdä virheitä regekseillä. Kokeile testaustarkoituksiin regexiä, joka vastaa kaikkia tiedostonimiä. (Näe tämä[Regex-dokumentointi](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)ja[Regex Tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * Tarkista, että ohjelman käyttäjä on (Käyttäjä = Tomcat (??) Tomcat/ERDDAP) on "lukenut" näihin tiedostoihin.
    * Joissakin käyttöjärjestelmissä (Esimerkiksi SELinux) Järjestelmäasetuksista riippuen ohjelman käyttäjällä on oltava "lue"-lupa koko hakemistojen ketjulle, joka johtaa tiedostojen hakemistoon.
         
##### Standardisointi Mitä{#standardizewhat} 
* Kun EDDTableFromFilesin alaluokka yhdistää lähdetiedostoja tietylle muuttujalle, kaikilla lähdetiedostoilla on oltava samat ominaisuudet useille ominaisuuksille:scale\\_factor,add\\_offset• allekirjoitettu,missing\\_value, \\ \\ \\ \\ \\ t \\ t \\ \\ \\ t \\ t \\ t \\ t \\ t \\ t \\ \\ \\ t \\ \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ \\ \\ t t \\ \\ t t t \\ \\ t t \\ t t t \\ t t t \\ t t t t t \\ t t \\ \\ t \\ \\ t t \\ t t \\ t t \\ \\ t t \\ t \\ \\ \\ \\ t \\ \\ \\ \\ \\ t \\ \\ \\ \\ \\ \\ t t \\ t \\ \\ \\ Ajattele sitä: jos yhdellä tiedostolla on tuulinopeusyksiköt = solmut ja toisella on tuulinopeusyksiköt = m/s, näiden kahden tiedoston tietoarvoja ei saa sisällyttää samaan koottuun tietoaineistoon. Joten, kun EDDTableFromFiles ensin luo tietoaineiston, se lukee attribuuttiarvot yhdestä tiedostosta, hylkää sitten kaikki tiedostot, joilla on erilaiset arvot näille tärkeille ominaisuuksille. Useimmissa tiedostokokoelmissa tämä ei ole ongelma, koska kaikkien muuttujien ominaisuudet ovat johdonmukaisia. Muissa tiedostokokoelmissa tämä voi johtaa 1 %, 10 %, 50 %, 90 % tai jopa 99 % tiedostoista, jotka hylätään huonoina tiedostoina. Se on ongelma.
    
EDDTableFrom-tiedostoilla on järjestelmä tämän ongelman ratkaisemiseksi: standardointi Mitä. Standardisointi Mitä asetus käskee EDDTableFromFiles standardisoida tiedostoja heti, kun se lukee niitä, ennen kuin EDDTableFromFiles tarkastelee ominaisuuksia nähdäkseen, ovatko ne johdonmukaisia.
    
Flip-puoli on: jos tietoaineistolla ei ole tätä ongelmaa, älä käytä standardointia. Mitä. Standardisointi Mitä mahdollisia riskejä on (Keskusteltu alla) ja tehottomuutta. Jos et todellakaan tarvitse standardointia Ei ole tarvetta kohdata mahdollisia riskejä ja tehottomuutta. Suurin tehottomuus on: kun eri standardisoitiin Mitä vaihtoehtoja tietoaineisto käyttää, se tarkoittaa, että lähdetiedostot tallentavat tietoja merkittävästi eri tavoin. (esim. eriscale\\_factorjaadd\\_offsettai ajan kanssa, jossa käytetään eri muotoja) . Käyttäjän pyynnöstä tietyn rajoituksen vuoksi ei ole mahdollistaERDDAP™tehdä yhden lähdetason rajoituksen, jota voidaan soveltaa kaikkiin lähdetiedostoihin. NiinpäERDDAP™Voidaan käyttää vain korkeammalla tasolla. NiinpäERDDAP™on luettava tiedot useammasta tiedostosta ennen korkeampien, määränpäätason rajoitusten soveltamista. Pyynnöt, jotka käyttävät standardointia Mikä kestää pidempään käsittelyyn.
    
Jos haluat käyttää tätä järjestelmää, sinun on määriteltävä
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
Sisällä[datasets.xmlEDDTableFrom... Tiedostotiedot](#eddtablefromfiles-skeleton-xml)(sisältää)&lt;tiedostot &gt; tag).
    
The *Standardisointi Mitä* Arvo määrittää, mitä muutoksia EDDTableFromFiles on yritettävä soveltaa. Muutokset ovat jonkin yhdistelmän summa:
    
1. Pakkaamatta
Tämä tekee monia yleisiä ja turvallisia toimia numeeristen sarakkeiden standardoimiseksi tiedostoissa:
    * Josscale\\_factorja/taiadd\\_offsetattribuutit ovat läsnä, poistaa ne ja soveltaa niitä tietoarvojen purkamiseen.
    * Pakkaamattomat attribuutit (esim. todelliset, todelliset,actual\\_range,data\\_min,data\\_max&gt; &gt; &gt; &gt; &gt;valid\\_min,valid\\_max,valid\\_range) jos muuttuja on pakattu, ja jos ominaisuudet on pakattu (Tämä on vaikeaa, mutta kohtuullisen luotettavaa.) .
    * Jos arvo ja/taimissing\\_valueovat läsnä, muuntaa nämä tietoarvotERDDAP"normaalit" puuttuvat arvot: MAXVALUE integer-tyypeille (Esimerkiksi 127 tavua, 32 767 lyhyt, ja 2 147 483 697 ints, 92233720368547807 Pitkät) Nan on kaksinkertainen ja kelluva.
    * Poista vanha = Täysiarvo ja/taimissing\\_valueattribuutit (Jos) ja korvaa ne vain | FillValue =\\[TheERDDAP™Standardi puuttuu\\].
         
2. Numeerinen aika
Jos numeerisessa sarakkeessa on CF-tyylinen numeerinen aikayksikkö (""" *Ajankäyttö* Siitä lähtien *Perustaminen* "Päiviä vuodesta 1900-01-01") Tämä muuttaa päivämäärän Aikaa arvostetaan"seconds since 1970-01-01T00:00:00Z"arvot ja muutokset, joita yksiköiden ominaisuus kuvaa.
Jos tämä on valittu ja on mahdollisuus, että tämä muuttuja onscale\\_factortai taiadd\\_offset#1 on myös valittava.
     
3. Levitä Stringmissing\\_value  
Jos sarakkeella on arvo ja/taimissing\\_valueattribuutit, tämä muuntaa nämä arvot " ja poistaa ominaisuudet.
     
4. Löydä Numericmissing\\_value  
Jos numeerisessa sarakkeessa ei ole FillValue taimissing\\_valueTämä pyrkii tunnistamaan määrittelemättömän numeerisenmissing\\_value  (esim. -999, 9999, 1e37f) ja muuntaa sen "normaalit" arvot (MAX \\ VALUE integer-tyypeille ja NAN kaksois- ja kellustyypeille) .
     **Tällä vaihtoehdolla on riski:** jos suurin tai pienin pätevä tietoarvo näyttää puuttuvalta arvolta (Esimerkiksi 999) Nämä pätevät tietoarvot muunnetaan puuttuviin arvoihin. (Esimerkki: Nan) .
     
5. Muutos "N/A"
Jokaisessa String-sarakkeessa muunna useita merkkijonoja, joita yleisesti käytetään osoittamaan puuttuva String-arvo. Tällä hetkellä tämä etsii ", "...", ", "??", "??", "N/A", "NA", "none", "ei sovelleta", "null", "tuntematon", "määrittelemätön". Jousihaku on tapausherkkä ja sitä sovelletaan sen jälkeen, kun jouset ovat trim'd. "Muut" ja "muut" eivät ole listalla.
     **Tällä vaihtoehdolla on riski:** Lahjoja, joiden katsot olevan päteviä arvoja, voidaan muuntaa ".
     
6. Standardoitu String ISO 8601 DateTimes
Jokaiselle String-sarakkeelle yritä muuntaa ei-puhdas-numeric String -treffit (esim. ”2. tammikuuta 2018”) Lähde: ISO 8601 String dateTimes (Vuosi 2018-01-02) .
     **Huomautus** Kaikkien sarakkeen tietoarvojen on käytettävä samaa muotoa, muuten tämä vaihtoehto ei tee muutoksia tiettyyn sarakkeeseen.
     **Tällä vaihtoehdolla on riski:** Jos on sarake, jossa on merkkijonon arvoja, jotka vain näyttävät tavalliselta päivämäärältä. Aikamuoto, se muunnetaan ISO 8601 String dateTimes.
     
7. Standardoida Compact DateTimes to ISO 8601 DateTimes
Jokaiselle String- tai Integer-tyypin sarakkeelle yritä muuntaa puhtaasti numeroituja String-päivämääriä. (esim. ”20180102”) Lähde: ISO 8601 String dateTimes (Vuosi 2018-01-02) .
     **Huomautus** Kaikkien sarakkeen tietoarvojen on käytettävä samaa muotoa, muuten tämä vaihtoehto ei tee muutoksia tiettyyn sarakkeeseen.
     **Tällä vaihtoehdolla on riski:** Jos on sarake, jossa on arvoja, jotka eivät ole kompakti päivämäärä Times, mutta näyttää kompakti päivämäärä, ne muunnetaan ISO 8601 String dateTimes.
     
8. Standardoi yksiköt
Tämä pyrkii standardisoimaan yksikköjonon jokaiselle muuttujalle. Esimerkiksi "mittarit sekunnissa", "mittari""m.s^-1","m s-1""m.s-1" muutetaan "m.s-1". Tämä ei muuta datan arvoja. Tämä toimii hyvin pätevästiUDUNITSyksiköiden jouset, mutta voi olla ongelmia pätemättömiä tai monimutkaisia jousia. Voit käsitellä ongelmia määrittämällä erityisiä pareja&lt;standardisoiminen &gt; SisälläERDDAP&gt;
    \\[Tom\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/viestejä.xml-tiedosto. Lähetä kaikki muutokset, jotka teet Chrisille. Johannes osoitteessa noaa.gov, jotta ne voidaan sisällyttää oletusviestiin.
     **Tällä vaihtoehdolla on riski:** Tämä voi manglata joitakin monimutkaisia tai mitättömiä yksiköitä, mutta voit käyttää yllä kuvattua työkenttää kiertämään ongelmia, jos niitä esiintyy.
         
    
Standardisoinnin oletusarvo Mikä on 0, joka ei tee mitään.

Jos/kun vaihdat standardin arvoa Mitä, kun seuraavan kerran aineistoa ladataan,ERDDAP™Lue kaikki tietoaineiston tietotiedostot uudelleen, jotta minitietokanta voidaan palauttaa kunkin tiedoston osalta. Jos tiedostoja on paljon, se kestää kauan.
    
Huomautuksia:

* Hassu juttu on -
Standardisointi Mitä asetusta käytetään kaikkiin sarakkeisiin lähdetiedostossa. Esimerkiksi käyttämällä #2048 voi onnistuneesti muuntaa kompaktin String dateTimes sarakkeen ISO 8601 String dateTimes, mutta se voi myös virheellisesti muuntaa sarakkeen Strings, joka vain sattuu näyttämään kompakti päivämäärä.
     
*   datasets.xmlGenerateDatasets XML -
On erityisen vaikeaa saada asetukset oikeindatasets.xmlTehdä tietosi toimimaan niin kuin haluat. Paras lähestymistapa (Kuten aina) on:
    1. Käytä[GenerateDatasetsXml](#generatedatasetsxml)määrittää standardoinnin arvon Mitä haluaisit käyttää.
    2. Käytä[Dasds](#dasdds)varmistaa, että aineisto latautuu oikein ja heijastaa standardointia Mitä asetuksia olet määritellyt?
    3. Testaa aineistoa käsin, kun se onERDDAP™varmistaa, että muuttujat toimivat odotetulla tavalla.
         
* Riskit -
Vaihtoehdot #256 ja uudemmat ovat riskialttiimpia, toisin sanoen on suurempi mahdollisuus, ettäERDDAP™Se tekee muutoksen, jota ei pitäisi tehdä. Esimerkiksi vaihtoehto #2048 voi vahingossa muuntaa muuttujan aseman ID-merkkijonoilla, jotka kaikki vain näyttävät ISO 8601 "compact" päivämäärät. (esim. 20180102) ISO 8601"extended"Päivämäärät (Vuosi 2018-01-02) .
     
* Hidas muutos -
Standardisoinnin arvosta Mikä muuttaa EDDTableFromFilesin näkemät tietoarvot kunkin datatiedoston osalta, jos vaihdat standardointia Mikä asetus, EDDTableFromFiles heittää pois kaikki välimuistitiedot jokaisesta tiedostosta (joka sisältää min ja max kussakin tiedostossa) Lue jokaisen tiedoston uudelleen. Jos aineistossa on paljon tiedostoja, tämä voi olla hyvin aikaa vievää, joten tietoaineiston lataaminen kestää pitkään.ERDDAP™Lataa se uudelleen, kun teet muutoksen.
     
* Heuristinen -
Vaihtoehdot #256 ja sitä uudemmat käyttävät heuristisia ratkaisuja. Jos törmäät tilanteeseen, jossa heuristiikka tekee huonon päätöksen, lähetä kuvaus ongelmasta Chrisille. Johanneksessa. Voimme parantaa heurismia.
     
* Vaihtoehtoja -
Jos jokin standardisointiMikä ei ratkaise ongelmaa tietylle tietoaineistolle, voit ratkaista ongelman tekemällä[.ncml tiedosto](#ncml-files)rinnakkaistetaan kaikki tiedostot ja määritellään muutokset tiedostojen niin, että tiedostot ovat johdonmukaisia. Kerro sitten EDDTableFrom... Tiedostotiedot kootakseen.ncml-tiedostoja.
    
tai käyttää[NCO](#netcdf-operators-nco)tehdä muutoksia tiedostoihin, jotta tiedostot ovat johdonmukaisia.
        
##### Erilliset sarakkeet vuodelle, kuukaudelle, päivämäärälle, tunnille, toiselle{#separate-columns-for-year-month-date-hour-minute-second} 
On melko yleistä, että tabulaaritiedostot ovat erillisiä sarakkeita vuodeksi, kuukaudeksi, päivämääräksi, tunniksi, minuutiksi, toiseksi. Ennen ennenERDDAP™V2.10 Ainoa ratkaisu oli muokata tiedostoa yhdistämään nämä sarakkeet yhtenäiseen ajan sarakkeeseen. kanssaERDDAP™10+, voit käyttää
[...]&lt;sourceName== == *Ilmaisu* &lt;sourceName&gt; (#lähde) kertomaanERDDAP™Miten yhdistää lähde sarakkeet tehdä yhtenäinen aika sarake, joten sinun ei enää tarvitse muokata lähdetiedosto.
##### &lt;skipHeaderToRegex &gt;{#skipheadertoregex} 
* [...]&lt;skipheadertoregex &gt; &gt; (#skipheadertoregex) -----
OPTIONAL. (EDDTableFromAsciiFiles- ja EDDTableFromColumnarAsciiFiles-tietoaineistot.)   
Kun EDDTableFromAsciiFiles lukee datatiedoston, se jättää huomiotta kaikki rivit, jotka vastaavat tätä säännöllistä ilmaisua. Oletusarvo on ", joka ei käytä tätä vaihtoehtoa. Esimerkki on
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
joka laiminlyö kaikki linjat ylös ja sisältää linjan, joka alkaa "\\*\\*"Haderin loppu"

Kun käytät tätä tagia,&lt;ColumnNamesRow &gt; ja&lt;FirstDataRow&gt; toimii kuin otsikko olisi poistettu ennen tiedoston lukemista. Voit esimerkiksi käyttää sarakekoodia 0, jos sarakkeen nimet ovat rivillä heti otsikon jälkeen.

Jos haluat käyttää tuotetta Dataa Xml, jossa on tietokanta, joka tarvitsee tätä tunnistetta:

1. Tee uusi, tilapäinen, näytetiedosto kopioimalla olemassa oleva tiedosto ja poistamalla otsikko.
2. Juoksu tuottaa Dataa Xml ja määritä tämä näytetiedosto.
3. Lisää manuaalisesti&lt;skipHeaderToRegex &gt; Tag to thedatasets.xmlChunk.
4. Poista tilapäinen, näytetiedosto.
5. Käytä aineistoa sisäänERDDAP.
##### &lt;skipLinesRegex &gt;{#skiplinesregex} 
OPTIONAL. (EDDTableFromAsciiFiles- ja EDDTableFromColumnarAsciiFiles-tietoaineistot.)   
Kun EDDTableFromAsciiFiles lukee datatiedoston, se jättää huomiotta kaikki linjat, jotka vastaavat tätä säännöllistä ilmaisua. Oletusarvo on ", joka ei käytä tätä vaihtoehtoa. Esimerkki on
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
joka jättää huomiotta kaikki rivit, jotka alkavat #

Kun käytät tätä tagia,&lt;ColumnNamesRow &gt; ja&lt;FirstDataRow toimii ikään kuin kaikki vastaavat linjat olisi poistettu ennen tiedoston lukemista. Voit esimerkiksi käyttää saraketta = 0, vaikka tiedoston alussa olisi useita rivejä.
    
#### EdDTableFromFiles XML{#eddtablefromfiles-skeleton-xml} 
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

### EDDTableFromAscii-palvelu{#eddtablefromasciiservice} 
[ **EDDTableFromAscii-palvelu** ](#eddtablefromasciiservice)Se on pohjimmiltaan ruutukaappi. Sen tarkoituksena on käsitellä tietolähteitä, joilla on yksinkertainen verkkopalvelu tietojen pyytämiseen. (Usein HTML-muoto verkkosivulla) jotka voivat palauttaa tiedot rakenteellisessa ASCII-muodossa (Esimerkiksi koodattu arvo tai sarake ASCII-tekstimuoto, usein muilla tiedoilla ennen ja/tai jälkeen tietojen) .

EDDTableFromAsciiService on kaikkien EDDTableFromAsciiService -luokkien superluokka. Et voi käyttää EDDTableFromAsciiServicea suoraan. Sen sijaan käytä EDDTableFromAsciiService -palvelun alaluokkaa tietyntyyppisten palveluiden käsittelyyn:

*   [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos)Saada dataaNOAANOS:n ASCII-palvelut.

Tällä hetkellä muita palvelutyyppejä ei tueta. On yleensä helppoa tukea muita palveluja, jos ne toimivat samalla tavalla. Ota yhteyttä, jos sinulla on pyyntö.

#### Yksityiskohdat{#details} 
Seuraavat tiedot koskevat kaikkia EDDTableFromAsciiServicen alaluokkia.

* Vaatimukset -ERDDAP™Tabulaariset tietopyynnöt voivat asettaa rajoituksia mihin tahansa muuttujaan. Peruspalvelu voi tai ei voi sallia rajoituksia kaikilla muuttujilla. Esimerkiksi monet palvelut tukevat vain asemien nimiä, leveyttä, pituutta ja aikaa. Joten kun EDDTableFromAsciiServicen alaluokka saa pyynnön tietoaineiston osajoukosta, se siirtää mahdollisimman monta rajoitusta lähdetietopalveluun ja soveltaa sen jälkeen palvelun palauttamia tietoja, ennen tietojen luovuttamista käyttäjälle.
* Valid Range - Toisin kuin monet muut tietoaineistotyypit, EDDTableFromAsciiService ei yleensä tiedä tietojen valikoimaa kullekin muuttujalle, joten se ei voi nopeasti hylätä pyyntöjä tietojen suhteen pätevän alueen ulkopuolella.
* ASCII-tekstiviestintä - Kun EDDTableFromAsciiService saa vastauksen ASCII-tekstipalvelusta, sen on validoitava, että vastauksella on odotettu muoto ja tiedot ja sitten otettu tiedot. Voit määrittää formaatin käyttämällä erilaisia XML:n roskakoriin kuuluvia erityistunnisteita:
    *   &lt;Etusivu 1 &gt; kautta&lt;Etusivu &gt; Tags - Voit määrittää sarjan tekstejä (niin monta kuin haluat, jopa 10) EDDTableFromAsciiServicen on etsittävä palvelun palauttaman ASCII-tekstin otsikkoa&lt;Etusivu 1 &gt; kautta&lt;ennenaikaista » Tämä on hyödyllistä esimerkiksi sen todentamiseksi, että vastaus sisältää odotetut muuttujat odotetuilla yksiköillä. Viimeinen etusivu, jonka määrität, tunnistaa tekstin, joka tapahtuu juuri ennen tietojen alkamista.
    *   &lt;jälkeen &gt; ----- Tämä määrittää tekstin, jota EDDTableFromAsciiService etsii palvelun palauttamassa ASCII-tekstissä, joka tarkoittaa tietojen loppua.
    *   &lt;NoData &gt; ----- Jos EDDTableFromAsciiService löytää tämän tekstin palvelun palauttamasta ASCII-tekstistä, se katsoo, ettei pyyntöön vastaavia tietoja ole.
#### EdDTableFromAsciiService skeleton XML{#eddtablefromasciiservice-skeleton-xml} 
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
[ **EDDTableFromAsciiServiceNOS** ](#eddtablefromasciiservicenos)tekee EDDTable-tietoaineistoja ASCII:n tarjoamista tekstidatapalveluistaNOAA&gt;[Kansallinen valtameripalvelu (NOS) ](https://oceanservice.noaa.gov/). Tietoa siitä, miten tämä luokka toimii ja miten sitä käytetään, katso tämän luokan superluokka[EDDTableFromAscii-palvelu](#eddtablefromasciiservice). On epätodennäköistä, että kukaan muu kuin Bob Simons joutuu käyttämään tätä alaluokkaa.

Koska NOS-palvelun vastauksessa olevat tiedot käyttävät sarakkeen ASCII-tekstimuotoa, muiden kuin leveys- ja pituustietojen on oltava erityinen ominaisuus, joka määrittää, mitkä kunkin tietolinjan hahmot sisältävät kyseisen muuttujan tiedot, esimerkiksi
```
<att name="responseSubstring">17, 25</att>  
```
 
### EDDTableFromAllDatasets{#eddtablefromalldatasets} 
[ **EDDTableFromAllDatasets** ](#eddtablefromalldatasets)on korkeamman tason tietoaineisto, jolla on tietoa kaikista muista tietoaineistoista, jotka ovat tällä hetkellä ladattunaERDDAP. Toisin kuin muut aineistot, ei ole erittelyäallDatasetsTietojadatasets.xml.ERDDAP™Luo automaattisesti yhden EDDTableFromAllDatasets-tietokannan (kanssadatasetID=allDatasets) . Täten, yksiallDatasetsTiedot luodaan jokaisessaERDDAP™asennus ja toimii samalla tavalla kussakinERDDAP™asennus.

TheallDatasetsTiedot ovat tabulaarista dataa. Sillä on rivi tietoa jokaisesta tietoaineistosta. Sillä on sarakkeita, joissa on tietoa jokaisesta tietoaineistosta, esim.datasetID, saavutettavissa, laitos, otsikko, minLongitude, maxLongitude, min Latitude, maxLatitude, minTime, maxTime jne. Koska koskaallDatasetson tabulaaridata, voit kysellä sitä samalla tavalla kuin voit kysellä muita tabulaaritietojaERDDAP™Voit määrittää tiedostotyypin vastaukseen. Näin käyttäjät voivat etsiä kiinnostuksen kohteita erittäin tehokkailla tavoilla.
 
### EDDTableFromAsciiFiles{#eddtablefromasciifiles} 
[ **EDDTableFromAsciiFiles** ](#eddtablefromasciifiles)aggregaa dataa komma-, tab-, semicolon- tai avaruuserotetuista ASCII-datatiedostoista.

* Useimmiten tiedostoilla on sarakkeiden nimet ensimmäisellä rivillä ja tiedot alkavat toisella rivillä. (Tässä tiedoston ensimmäinen rivi on nimeltään rivi numero 1.) Voit käyttää&lt;ColumnNamesRow &gt; ja&lt;Alkuperäinen nimi: In Your In Yourdatasets.xmltiedosto määrittää toisen rivinumeron.
*   ERDDAP™Tietojen riveillä on erilaisia data-arvoja.ERDDAP™Oletetaan, että puuttuvat tietoarvot ovat rivin lopullisia sarakkeita.ERDDAP™määrittää puuttuvat arvot puuttuville tietoarvoille. (V1,56) 
* ASCII-tiedostoja on helppo käyttää, mutta ne eivät ole tehokkain tapa tallentaa tai hakea tietoja. Lisää tehokkuutta, tallentaa tiedostoja kuinNetCDFv3.nctiedostoja (yksi ulottuvuus, "rivi" jaettuna kaikkien muuttujien kanssa) Sen sijaan. Voit[käyttääERDDAP™Uusien tiedostojen luominen](#millions-of-files).
* Katso tämän luokan superluokka,[EDDTableFromfiilit](#eddtablefromfiles)Tietoa siitä, miten luokka toimii ja miten sitä käytetään.
* Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Koska ASCII-tiedostojen metatiedot ovat puutteellisia, sinun on aina muokattava GenerateDatasetsXmlin tuloksia.
* Varoitus: milloinERDDAP™Lue ASCII-tiedostoja, jos se löytää virheen tietyllä linjalla (esimerkiksi virheellinen määrä) Se viestittää varoitusviestin (Varoitus: Bad Line (s) Tietoja » Luettelo huonoista linjoista myöhemmillä riveillä) ja[log.txt-tiedosto](/docs/server-admin/additional-information#log)Jatka lukemista loput tiedostosta. Siksi sinun vastuullasi on katsoa säännöllisesti. (Kirjoita käsikirjoitus tehdäksesi niin) tuota viestiä logissa. txt, jotta voit korjata ongelmat tiedostoissa.ERDDAP™Näin käyttäjät voivat jatkaa kaikkien saatavilla olevien pätevien tietojen lukemista, vaikka joissakin tiedostojen riveissä on virheitä.
     
### EDDTableFrom Awsxmlfiilit{#eddtablefromawsxmlfiles} 
[ **EDDTableFrom Awsxmlfiilit** ](#eddtablefromawsxmlfiles)Tietoja automaattisesta sääasemasta (AWS) XML-tiedostot WeatherBug Rest XML API:n avulla (Mikä ei ole enää aktiivista) .

* Tämän tyyppinen tiedosto on yksinkertainen mutta tehoton tapa tallentaa tietoja, koska jokainen tiedosto näyttää yleensä sisältävän havainnon vain yhdestä ajankohdasta. Tiedostoja voi olla paljon. Jos haluat parantaa suorituskykyä, harkitse havaintoryhmien vahvistamista. (Viikon arvoinen?) SisälläNetCDFv3.nctiedostoja (Paras:.nctiedostot mukana[CF Discrete Sampling Geometria (DSG) Ragged Array formaatti](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) ja käyttää[EDDTableFromMultidimNcFiles Näytä tarkat tiedot](#eddtablefrommultidimncfiles)  (tai tai[EDDTableFromNcFiles](#eddtablefromnccffiles)) palvelemaan tietoja. Voit[käyttääERDDAP™Uusien tiedostojen luominen](#millions-of-files).
* Katso tämän luokan superluokka,[EDDTableFromfiilit](#eddtablefromfiles)Tietoa siitä, miten luokka toimii ja miten sitä käytetään.
     
### EDDTableFromColumnarAsciiFiles{#eddtablefromcolumnarasciifiles} 
[ **EDDTableFromColumnarAsciiFiles** ](#eddtablefromcolumnarasciifiles)ASCII-datatiedostojen tiedot kootaan kiinteän leveyden sarakkeilla.

* Useimmiten tiedostoilla on sarakkeiden nimet ensimmäisellä rivillä ja tiedot alkavat toisella rivillä. Ensimmäinen rivi / rivi tiedostossa on nimeltään rivi #1. Voit käyttää&lt;ColumnNamesRow &gt; ja&lt;Alkuperäinen nimi: In Your In Yourdatasets.xmltiedosto määrittää toisen rivinumeron.
* The&lt;addAttributes&gt; jokaiselle&lt;dataVariable&gt; Näihin tietoihin on sisällytettävä nämä kaksi erityistä ominaisuutta:
    
    *   &lt;att-nimi = StartColumn *Integroitu* &lt;att&gt; - määrittää merkin sarakkeen jokaisessa rivissä, joka on tämän tietomuuttujan alku.
    *   &lt;att name="stopColumn" *Integroitu* &lt;att&gt; määrittää merkin sarakkeen jokaisessa rivissä, joka on 1 tämän tietomuuttujan lopun jälkeen.
    
Ensimmäinen sarake on nimeltään kolumni #0.
Esimerkiksi tälle tiedostolle, jolla on aika-arvoja lämpötila-arvojen nousussa:
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
Aikatietojen muuttujilla olisi
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
Aikatietojen muuttujilla olisi
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
Nämä ominaisuudet on määriteltävä kaikille muuttujille, paitsi[Kiinteä arvo](#fixed-value-sourcenames)ja[tiedostonimi-lähde](#filename-sourcenames)muuttujia.
* ASCII-tiedostoja on helppo käyttää, mutta ne eivät ole tehokas tapa tallentaa tai hakea tietoja. Lisää tehokkuutta, tallentaa tiedostoja kuinNetCDFv3.nctiedostoja (yksi ulottuvuus, "rivi" jaettuna kaikkien muuttujien kanssa) Sen sijaan. Voit[käyttääERDDAP™Uusien tiedostojen luominen](#millions-of-files).
* Katso tämän luokan superluokka,[EDDTableFromfiilit](#eddtablefromfiles)Tietoa siitä, miten luokka toimii ja miten sitä käytetään.
* Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Koska kunkin datasarakkeen lähtö- ja pääteaseman määrittäminen on vaikeaa ja ASCII-tiedostojen metatietojen puute on aina muokattava GenerateDatasetsXmlin tulokset.
     
### EdDTableFromHttpGet{#eddtablefromhttpget} 
EdDTable FromHttpGet on erilainen kuin muut tietoaineistot.ERDDAP™siinä, että sillä on järjestelmä, jossa tietyt "kirjoittajat" voivat lisätä tietoja, tarkistaa tietoja tai poistaa tietoja tietoaineistosta säännöllisesti.HTTP GETtai tai[POST](#http-post)pyyntöjä tietokoneohjelmasta, käsikirjoituksesta tai selaimesta. Käyttäjät kyseenalaistavat tietoaineiston samalla tavalla kuin kaikki muut EDDTable-tietoaineistot ovat kyseenalaisia.ERDDAP. Katso tämän luokan superluokka,[EDDTableFromfiilit](#eddtablefromfiles)Lue lisää ominaisuuksista, jotka ovat peräisin tuosta superluokasta.

EDDTableFromHttpGetin ainutlaatuiset ominaisuudet on kuvattu alla. Sinun täytyy lukea kaikki tämä ensimmäinen osa ja ymmärtää se; muuten sinulla voi olla epärealistisia odotuksia tai saada itsesi vaikeuksiin.

#### Tarkoitettu käyttö{#intended-use} 
Tämä järjestelmä on tarkoitettu:

* Tabulaari (In situ) tietoja, ei verkkotietoja.
* Todellinen aika -
Tavoitteena on antaa kirjailijalle (esim. anturi, automaattinen QC-skripti tai henkilökohtainen) tehdä muutos tietoaineistoon (kautta[Lisäys tai .delete-komento](#insert-and-delete)) tehdä muutoksesta saavutettavissaERDDAP™Käyttäjät, kaikki alle sekunnissa ja mahdollisesti paljon nopeammin. Suurin osa tuosta sekunnista on verkkoaikaa.ERDDAP™Pyyntö voidaan käsitellä noin 1 m: ssä ja tiedot ovat välittömästi käyttäjän saatavilla. Tämä on A[nopeasti](#httpget-speed),[Vahva](#robust)ja[Luotettava järjestelmä](#system-reliability).
* Lähes kaikki tiedot -
Järjestelmä voi hyväksyä harvinaisia tietoja (esim. päivittäin) Hyvin usein dataa (100 Hz:n tiedot) . Jos optimoit järjestelmän, se pystyy käsittelemään korkeampia taajuustietoja. (10 KHz:n tiedot, jos menet ääripäähän) .
* Tietoja yhdestä anturista tai samankaltaisten antureiden kokoelmasta.
*   [Versio](#versioning)//[Toistuva tiede](https://en.wikipedia.org/wiki/Reproducibility)//DOIS-
Tilanteet, joissa sinun on voitava tehdä muutoksia tietoihin (Muutetaan laadunvalvontalippua) tietää, mitkä tekijät tekivät jokaisen muutoksen, tietää, milloin tekijä teki muutoksen, ja (pyynnöstä) voi nähdä alkuperäiset tiedot ennen muutosta. Nämä tietoaineistot ovat oikeutettuja[DOIs](https://en.wikipedia.org/wiki/Digital_object_identifier). Koska he tapaavatDOIvaatimus siitä, että tietoaineisto on muuttumaton, paitsi aggregointi. Lähes reaaliaikaiset tiedot eivät ole oikeutettujaDOIKoska tiedot muuttuvat usein takautuvasti (esimerkiksi QA/QC-tarkoituksiin) .
     

Kun tiedot ovat EDDTableFromHttpGet-tietoaineistossa, kuka tahansa käyttäjä voi pyytää tietoja samalla tavalla kuin he pyytävät tietoja mistä tahansa muusta EDDTable-tietokannasta.
     
#### Kokeellinen: Ole varovainen{#experimental-be-careful} 
Koska tämä järjestelmä on uusi ja koska menetettyä ympäristötietoa ei voida hankkia uudelleen, EDDTableFromHttpGet on kokeellinen. Jos siirryt toisesta järjestelmästä, käytä vanhaa järjestelmää ja uutta järjestelmää rinnakkain, kunnes olet varma, että uusi järjestelmä toimii hyvin. (viikkoja tai kuukausia, ei vain tunteja tai päiviä) . Kaikissa tapauksissa varmista, että järjestelmäsi arkistoi erikseen .insertin ja .delete-URL-osoitteet, jotka lähetetään EDDTableFromHttpGet-tietokantaan. (Apache- ja/tai Tomcat-lokeissa) Ainakin jonkin aikaa. Ja kaikissa tapauksissa varmista, että EDDTableFromHttpGet-tietokannan luomat tietotiedostot varmuuskopioidaan rutiininomaisesti ulkoisiin tallennuslaitteisiin. (Huomaa, että[rsync](https://en.wikipedia.org/wiki/Rsync). voi varmuuskopioida EDDTableFromHttpGetin luomia tietotiedostoja erittäin tehokkaasti.)   
     
#### Lisää ja .delete{#insert-and-delete} 

Mitä tahansa aineistoaERDDAP™Kun lähetät pyynnönERDDAP™tietoaineiston alijoukkoa varten määrität tiedostotyypin, jonka haluat vastauksen, esim. .csv,.htmlTable,.nc,.json. EDDTableFromHtp Laajenna tämä järjestelmä tukemaan kahta lisätyyppiä, jotka voivat lisätä (tai muutosta) tai poistaa tietoja tietoaineistosta:

* .insert
    * Pyyntö on muotoiltu kuin vakiomuotoinen HTML-lomakevaste, jossa on avain=arvoparit, jotka erotetaan & . Esimerkiksi,
         https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1   
kertooERDDAP™lisätä tai muuttaa tietojastationID= 46088 määrättyyn aikaan.
    * Muutoksen tekijä on JohnSmith ja avain on SomeKey1.
    * URL-osoitteessa on oltava voimassa olevat arvot (Ei puuttuvia arvoja) Kaikille[httpVaadittu Variables](#httpgetrequiredvariables-global-attribute)
    * Jos arvojenhttpVaaditaan Muuttujia pyynnöstä (esim.stationIDAikaa) vastaa jo aineistossa olevaa riviä, uudet arvot ylittävät vanhat arvot tehokkaasti. (vanhat arvot ovat edelleen saatavilla, jos käyttäjä pyytää tietoja aiemmasta[versio versio versio versio versio](#versioning)Tietokannan) .
    * .insert URL ei saa koskaan sisältää &timestamp= (ERDDAP™tuota arvoa) & Komento = (Tämä on .insert (Mikä on komento = 0) Tai .delete (Mikä on käsky = 1 1) ) .
    * Jos .insert URL ei määritä arvoja muille tietoaineistossa oleville sarakkeille, niiden oletetaan olevan alkuperäisiä puuttuvia arvoja. (MAX | VALUE integer-tietotyypeille, NaN kelluville ja kaksoiskappaleille ja "" Stringsille) .
             
    * .delete
        * Pyyntö on muotoiltu kuin vakiomuotoinen HTML-lomakevaste, jossa on avain=arvoparit, jotka erotetaan & . Esimerkiksi,
             https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1   
kertooERDDAP™poistaa tiedotstationID= 46088 määriteltyyn aikaan.
        * Muutoksen tekijä on JohnSmith ja avain on SomeKey1.
        * URL-osoitteen on määritettävä[httpVaadittu Variables](#httpgetrequiredvariables-global-attribute)Pyynnössä (esim.stationIDAikaa) . Jos nämä arvot vastaavat arvoja rivillä jo tietoaineistossa (jonka yleensä) Vanhat arvot poistetaan tehokkaasti (Vanhat arvot ovat edelleen saatavilla, jos käyttäjä pyytää tietoja aiemmasta[versio versio versio versio versio](#versioning)Tietokannan) .
        * Ei ole tarvetta määrittää arvoja ei-HttpGetRequiredVariables, muut kuin kirjoittaja, joka on tarpeen pyynnön todentamiseksi.
             
    
Yksityiskohdat:
    * .insert- ja .delete-pyynnöt on muotoiltu kuten vakiomuotoiset HTML-lomakevasteet, joissa on avain=arvoparit, jotka erotetaan & . Arvojen on oltava[% koodattu](https://en.wikipedia.org/wiki/Percent-encoding). Siksi sinun on koodattava erityishahmoja muotoon %HH, jossa HH on luonteen kaksinumeroinen heksadesimaalinen arvo. Yleensä sinun tarvitsee vain muuntaa muutamia täsmällisyysmerkkejä: %25, ja %26, %22,&lt;%3C, = %3D, &gt; %3E, + %2B,|%7C,\\[%5B,\\]%5D, tila %20 ja muunna kaikki yli #127-merkit UTF-8-muodoksi ja sitten kooditavut UTF-8-muodossa %H-muotoon (Kysy ohjelmoijalta apua) .
    * .insert ja .delete-pyynnöt sisältävät[httpVaadittu Variables](#httpgetrequiredvariables-global-attribute)esim.stationIDja aikaa. .insert-pyyntöjen osalta muuttujien, joita ei ole määritelty pyynnössä, oletetaan olevan puuttuvia arvoja. (MAX | VALUE integer-muuttujat, NaN kelluville ja kaksoismuuttujat, ja tyhjä String-muuttujat) . .delete-pyynnöt, arvot ei-HttpGetRequired Muuttujia (muu kuin kirjailija, jota tarvitaan) jätetään huomiotta.
    * .insert- ja .delete-pyyntöihin on sisällyttävä tekijän nimi ja tekijän avain lomakkeen tekijän parametrin kautta. *Kirjoittaja →* viimeinen parametri pyynnössä. Tämä edellyttää, että koko pyyntö on vastaanotettuERDDAP. Vain kirjailija (Ei avain) tallennetaan tiedostoon. Sinun on määriteltävä sallittu luettelo *Kirjoittaja →* Maailmanlaajuinen attribuutti[httpGetkeys](#httpgetkeys)
    * .insert ja .delete parametrit voivat olla skalaarisia (Yksi single) minkä tahansa muodon pituuden tai arvojen\\[arvo1, arvo2, arvo 3, arvo\\]. Tietyn pyynnön osalta kaikki muuttujilla, joilla on sarjakuvia, on oltava sama määrä arvoja. (Muuten se on virhe) . Jos pyynnöllä on skalaari- ja röntgenarvoja, skaalariarvot toistetaan siten, että ne ovat samanpituisia kuin määritetyt mallit, esim.stationID= 46088 voidaan hoitaastationID=\\[46088 46088\\]. Järjestelmät ovat avain[Korkea läpäisy](#httpget-speed). Ilman joukkoja on haastavaa lisätä tai poistaa yli 8 riviä dataa sekunnissa etäkirjailijalta. (Kaiken verkon edetessä) . Joukkojen avulla on helppo lisätä tai poistaa yli 1000 riviä dataa sekunnissa kauko-anturista.
    * .insert ja .delete hyväksyvät (Ilman virheilmoitusta) kelluvan pistemäärän, kun kokonaislukuja odotetaan. Näissä tapauksissa tietoaineisto pyöristää kokonaislukujen arvot.
    * .insert ja .delete hyväksyvät (Ilman virheilmoitusta) kokonaisluvut ja kelluvat pistemäärät, jotka ovat muuttujan tietotyypin ulkopuolella. Näissä tapauksissa aineisto tallentaa arvotERDDAPns. puuttuvat arvot kyseiselle tietotyypille (MAX | VALUE integer-tyypeille ja NaN kelluville ja kaksinkertaisille) .
         
#### Vastaus{#response} 
Jos .insert tai .delete URL onnistuu, HTTP-vastekoodi on 200. (OK) Vastaus on teksti, jossa on.jsonobjekti, esim.
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
Huomaa, että aikaleimat ovat millisekunnin tarkkuus.

Jos .insert- tai .delete-URL-osoite epäonnistuu, saat HTTP-vastekoodin yli 200 (Okei) Esimerkki: Error 403 Kielletään, jos annat väärän arvon.ERDDAP™HTTP-vastauskoodi (Ei, esim. a.jsonmuotoiltu virhe) Näin tapahtuu internetissä, koska virheitä voi esiintyä missä tahansa. (Verkossa, joka palauttaa HTTP-virheen) . Jos virhe on peräisinERDDAP™Vastaus voi sisältää tekstin (Ei ei ei.json) Yksityiskohtaisempi selitys siitä, mikä meni pieleen, mutta HTTP-vastauskoodi (200 = Kaikki muu on ongelmaa) Se on oikea tapa tarkistaa, onko .insert vai .delete onnistunut. Jos HTTP-vastekoodin tarkistaminen ei ole mahdollista tai se on hankalaa, etsi "tila": "menestys" vastaustekstissä, jonka pitäisi olla luotettava osoitus menestyksestä.
    
#### Log Files{#log-files} 
Kun EDDTableFromHttpGet saa .insert- ja .delete-komennot, se yksinkertaisesti liittää tiedot asiaankuuluvaan tiedostoon lokitiedostoissa, joista jokainen on taulukko, joka on tallennettu lokitiedostoihin.[JSON CSV-tiedostot](https://jsonlines.org/examples/). Kun käyttäjä pyytää tietoja,ERDDAP™lukee nopeasti asiaankuuluvat lokitiedostot, soveltaa tietoaineiston muutoksia siinä järjestyksessä, että ne on tehty, ja suodattaa pyynnön käyttäjän rajoitusten, kuten muiden, kautta.ERDDAP™Tietopyyntö. Tietojen jakaminen eri lokitiedostoihin, erilaisten tietojen tallentaminen (esim. komennon aikaleima ja oliko käsky .insert vai .delete) , ja eri näkökohtia tietojen asennuksen, kaikki mahdollistaaERDDAPtallentaa tietoja ja hakea tietoja tästä tietoaineistosta erittäin nopeasti ja erittäin tehokkaasti.
     
#### Turvallisuus ja kirjailija{#security-and-author} 
Jokaisen .insertin ja .delete-komennon tulee sisältää &author= *Kirjoittaja →* viimeinen parametri, jossa kirjoittaja on kirjoittajan tunniste (Valitset: nimi, nimikirjaimet, pseudonyymi, numero) Avainsana ja salainen avain. TheERDDAP™Järjestelmänvalvoja tekee yhteistyötä tekijöiden kanssa luodakseen luettelon pätevistä tekijöistä, joita voidaan muuttaa milloin tahansa.
Kun EDDTableFromHtp saa .insert- tai .delete-komennon, se varmistaa, että kirjoittaja ID-avain on viimeinen parametri ja pätevä. Koska se on viimeinen parametri, se osoittaa, että koko komentorivi on saavuttanutERDDAP™ja ei ollut häiriintynyt. Salainen avain varmistaa, että vain tietyt tekijät voivat lisätä tai poistaa tietoja tietoaineistosta.ERDDAP™Ota sitten tekijän tunniste ja tallenna tekijän muuttuja, jotta kuka tahansa voi nähdä, kuka on vastuussa tietystä muutoksesta tietoaineistoon.
.insert ja .delete-komennot voidaan tehdä vainhttps:  (Turvallinen turvallinen)  ERDDAP™URL-osoitteita. Näin varmistetaan, että tiedot siirretään salassa kauttakuljetuksen aikana.
     
#### Aikaleima{#timestamp} 
Osana lokijärjestelmää EDDTableFromHttpGet lisää aikaleiman (Aika, jolloinERDDAPvastaanotti pyynnön) jokaiseen komentoon, jonka se tallentaa lokitiedostoihin. Koska koskaERDDAP™Aikaleima, ei kirjoittajat, sillä ei ole väliä, tekevätkö erilaiset tekijät muutoksia tietokoneisiin, joiden kellot on asetettu hieman eri aikoina. Aikaleima kertoo luotettavasti ajankohdan, jolloin muutos tehtiin tietoaineistoon.
     
#### HTTP POST{#http-post} 
*   ["Entä HTTP-posti?"](#http-post)  
HTTP[POST](https://en.wikipedia.org/wiki/POST_(HTTP)on parempi vaihtoehto (verrattunaHTTP GET) lähettää tietoja asiakkaalta HTTP-palvelimelle. Jos voit tai haluat todella parantaa turvallisuutta, käytä POSTia GET: n sijasta lähettääksesi tiedotERDDAP. Se on turvallisempi, koska: GET jahttpsURL-osoite lähetetään turvallisella tavalla, mutta koko URL-osoite (parametrit, mukaan lukien kirjoittaja) kirjoitetaan Apachelle, Tomcatille jaERDDAP™Lokitiedostot, joissa joku voisi lukea ne, jos tiedostoja ei ole kunnolla suojattu. POST:n avulla parametrit lähetetään turvallisesti, eikä niitä ole kirjoitettu lokitiedostoihin. POST on hieman hankalampi, että asiakkaat voivat työskennellä eikä heitä tueta niin laajasti kuin asiakasohjelmisto, mutta ohjelmointikielet tukevat sitä. GET- tai POST-tietokantaan lähettämäsi sisältö on sama, vain muotoiltu eri tavalla.
     
#### httpVaaditaan Globaalit ominaisuudet{#httpgetrequiredvariables-global-attribute} 
Olennainen osa sitä, mikä tekee koko järjestelmän toimivan, on maailmanlaajuinen ominaisuus.httpVaaditaan Muunnelmia, joka on erillinen luettelodataVariablelähdenimet, jotka tunnistavat yksilöllisesti datan rivin. Sen pitäisi olla mahdollisimman pieni ja se sisältää lähes aina aikamuuttujan. Esimerkiksi tässä suositellaanhttpVaaditaan Muuttujia jokaiselle[CF Discrete Sampling Geometria (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)  (ID-nimet voivat olla erilaisia aineistossasi.) :

* Aikasarja:stationIDAika
* Lähde: TrajectoryID, Time
* Profiili: aika (Oletusaika on profiili) syvyys
* Aikasarja Profiili:stationIDAika (Oletusaika on profiili) syvyys
* Trajektoriin Alkuperäinen nimi: TrajectoryID, Time (Oletusaika on profiili) syvyys

    
Aikasarja on esimerkki:
.insert-komento, joka sisältäästationID= 46088 ja aika =2016-06-23T19:53:00Z (Muut arvot muihin muuttujiin) :
* Jos kyseiselle asemalle ei ole olemassa olevia tietoja ja tuohon aikaan, vaikutus on tietojen lisääminen tietoaineistoon.
* Jos kyseiselle asemalle on olemassa olemassa olevia tietoja, vaikutus on korvata olemassa oleva tietorivi uudella datalla. (Tietenkin, koskaERDDAP™säilyttää jokaisen saamansa komennon lokin, vanhat tiedot ovat edelleen lokissa. Jos käyttäjä pyytää tietoja tietoaineiston versiosta ennen muutosta, he näkevät vanhemmat tiedot.)   
         
#### httpGetDirectoryn rakenne{#httpgetdirectorystructure} 
*   [httpGetDirectory Global Attribute ja data (Log) File Names](#httpgetdirectorystructure)  
Osa siitä, mikä tekee järjestelmästä tehokkaan, onERDDAP™Luo joukko dataa (log log) tiedostoja, joista jokaisella on erilainen tietoaineisto. Jos ne on rakennettu hyvin,ERDDAP™Pystymme vastaamaan nopeasti useimpiin tietopyyntöihin. Tämä asetus on määriteltyhttpGetDirectoryStructure Global attribute, joka on String, joka näyttää suhteellisen tiedostonimeltä, esim.stationID10 vuotta, mutta se on itse asiassa hakemistorakenne. Tämän osat osoittavat, miten hakemisto ja tiedostonimit tiedot (log log) Tiedostot rakennetaan.
    
    * Jos osa on kokonaisluku (== == 1 1) plus aikakausi (millisekunti, toinen, minuutti, tunti, päivämäärä, kuukausi, vuosi tai niiden moniarvoisuus) Esimerkiksi 10 vuotta, sitten EDDTableFromHttpGet-tietokanta vie aika-arvon datan riville. (esim. 2016-06-23T19:53:00Z) Laske aika täsmälleen tähän tarkkuuteen (esim. 2010) Tee kansio tai tiedostonimi tästä.
        
Tavoitteena on saada kohtuullisen suuri tietokanta jokaiseen tiedostoon, mutta alle 2GB.
        
    * Muussa tapauksessa eritelmän on oltavadataVariable&gt;sourceNameesim.stationID. Tässä tapauksessa EDDTableFromHttpGet tekee kansion tai tiedostonimen kyseisen muuttujan arvosta uuteen tietoriviin. (Esimerkki: 46088) .
    
Koska .insert- ja .delete-komentotiedot tallennetaan tiettyihin tietoihin (log log) EDDTableFromHttpGet-tiedostojen on yleensä avattava vain yksi tai muutama data. (log log) Tiedostot, jotka etsivät tietoja tiettyyn käyttäjäpyyntöön. Koska jokainen data (log log) tiedostolla on kaikki asiaankuuluvat tiedot tietoaineiston roikkuun, EDDTableFromHttpGetin on helppo tehdä tietty versio. (Nykyinen versio) tiedoston tiedot kyseisessä tiedostossa (ei tarvitse luoda pyydettyä versiota koko aineistosta) .
    
Yleiset ohjeet perustuvat tietojen määrään ja taajuuteen. Jos otamme 100 tavua per rivi, niin...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
Jos esimerkiksi hakemistorakenne onstationID2 kuukautta ja lisäät tietoja kahdesta asemasta (46088 ja 46155) Aika-arvot Dec 2015 - toukokuu 2016, EDDTableFromHtp Get luo hakemistoja, jotka on nimetty 46088 ja 46155 ja jotka luovat tiedostoja vuosien 2015 ja 11 välillä..json2016-01.json2016-03.json2016-05.jsonl (kukin hallussaan 2 kuukauden arvoinen data kyseiselle asemalle) . milloin tahansa tulevaisuudessa, jos käytät .insertia tai .deleteä tietojen muuttamiseen tai poistamiseen esimerkiksi asennossa 46088 2016-04-05T14:45:00Z, EDDTableFromHtp Komento 46088/2016-03.jsonl, asiaankuuluvat tiedot (log log) tiedosto. Tietenkin on hyvä lisätä tietoja muihin asemiin milloin tahansa tulevaisuudessa, koska tietoaineisto luo vain lisähakemistoja, joita tarvitaan tietojen säilyttämiseen uusilta asemilta.
    
#### httpGetkeys{#httpgetkeys} 
Jokainen EDD Lähde: HTP Saada tietoa on oltava globaali attribuuttihttpGetKeys, joka määrittää sallittujen kirjailijoiden ja heidän salaisten avaimien luettelon yhdeksi erilliseksi luetteloksi *Kirjoittaja →* esim. JohnSmith: HOBOLogger, QCScript, 59someKey3
* Kirjoittajan avaimet ovat tapausherkkiä, ja niiden tulee olla täysin ASCII-hahmoja (#33 - #126, ja ilman yhtymää, tai "hahmoja".
* Avaimet ovat kuin salasanat, joten niiden on oltava = 8 merkkiä, vaikea arvata ja ilman sisäisiä sanasanoja. Sinun tulisi kohdella heitä niin kuin he kohtelisivat salasanoja – pitää ne yksityisinä.
* Ensimmäinen ’’’-merkki erottaa tekijän avaimesta, joten tekijän nimi ei voi sisältää ’’hahmoa’. (Avain voi) .
* Jokaisella kirjoittajalla voi olla yksi tai useampi kirjailija, esim. JohnSmith Key1, Johnsmi Key7 jne.
* Voit muuttaa tämän ominaisuuden arvoa milloin tahansa. Muutokset tulevat voimaan seuraavan kerran, kun tietoaineisto ladataan.
* Nämä tiedot poistetaan aineiston globaaleista ominaisuuksista ennen niiden julkistamista.
* Kunkin pyynnön tietojen lisäämiseksi tai poistamiseksi on sisällettävä &author= *Kirjoittaja →* parametri. Tarkistettuaan avaimen pätevyyden,ERDDAP™Pelastaa tekijän osan (Ei avain) Datatiedostossa.

#### Aseta ylös{#set-up} 

Tässä ovat suositellut vaiheet EDDTableFromHttpGet-tietoaineiston luomiseksi:

1. Tee päähakemisto säilyttääksesi tämän tietoaineiston tiedot. Käytetään esimerkiksi/data/testGet/. Käyttäjä GenerateDatasetsXml ja käyttäjäERDDAP™Molemmilla on oltava kirjallinen pääsy tähän hakemistoon.
     
2. Käytä tekstieditoria näytteen tekemiseen.jsonl CSV-tiedosto laajennuksella.jsonl tässä hakemistossa.
Nimi ei ole tärkeä. Voit esimerkiksi kutsua sitä näytteeksi.jsonl
Tee kaksi linjaa.jsonl CSV-tiedosto, jossa on sarakkeiden nimet ensimmäisellä rivillä ja tyypilliset arvot (Oikean tiedon tyyppi) toisella linjalla. Tässä on näytetiedosto, joka sopii kokoelmaanfeatureType=TimeSeries-tiedot, jotka mittaavat ilman ja veden lämpötilaa.
    \\[For ForfeatureTypeRatkaisu, voit muuttaastationIDolla traktori.\\]  
    \\[For ForfeatureTypeProfiili, voit muuttaastationIDOle profiilikuva ja lisää syvyysmuuttuja.\\]
    
    \\["""stationID""time""leveys", "pitkä", "airTemp", "waterTemp", "timestamp", "author", "komento"\\]
    \\["myStation", "2018-06-25T17:00Z", 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, "Jotkut"\\]
    
Huomautus:
    * Todellisilla data-arvoilla ei ole väliä, koska lopulta poistat tämän tiedoston, mutta niiden pitäisi olla oikea tietotyyppi. Aikamuuttujan on käytettävä samaa muotoa, jota lähteen todelliset tiedot käyttävät.
    * Kaikille muuttujille,sourceNameTasa-arvoinendestinationNameKäytä siis oikeita/lopullisia muuttuvia nimiä, mukaan lukien aika, leveys, pituus ja joskus syvyys tai korkeus, jos muuttujia näiden tietojen mukana.
    * Nimetty aika on lähes aina muuttuja, joka kirjaa havainnoinnin ajan. Voi olla, että se voi olla DataType String[Yksiköt sopivat merkkijonoaikoihin](#string-time-units)  (esim.yyyy-MM-ddT'HHH:mm: SSSZ) tai tietoja Tyyppi kaksinkertainen[Numeerisiin aikoihin sopivat yksiköt](#time-units)  (esimerkiksi sekunneissa vuodesta 1970-01-01T00:00:00Z tai muu perusaika) .
    * Kolme saraketta (Yleensä viimeiset kolme) On oltava aikaleima, kirjailija, komento.
    * EDDTableFromHttpGet käyttää aikaleima-altaan lisätäkseen aikaleiman, joka osoittaa, milloin se on lisännyt tietyn datalinjan tietotiedostoon. DataType kaksinkertaistuu ja yksiköt sekunneissa vuodesta 1970-01-01T00:00:00.
    * Tekijän sarakkeella dataType Stringiä käytetään kirjaamaan, kuka valtuutettu kirjoittaja on antanut tämän linkin tiedot. Valtuutetut kirjoittajat on määritelty[httpGlobaali attribuutti](#httpgetkeys). Vaikka avaimet on määritelty *Kirjoittaja →* ja ovat tässä muodossa "pyynnön" URL-osoitteessa, vain tekijän osa tallennetaan tietotiedostoon.
    * Komennon sarake datatyypin tavulla osoittaa, onko tämän linkin tiedot asetettu (0) tai poistaminen (1 1) .
         
3. Juokse GenerateDatasets XML ja kerro se
    
    1. Tietokannan tyyppi on EDDTableFromHttpGet
    2. Hakemisto on (Tästä esimerkkinä) /Data/test Get/
    3. Näytetiedosto on (Tästä esimerkkinä) Lähde/TestGet/startup.jsonl
    4. ThehttpVaaditaan Muuttujia ovat (Tästä esimerkkinä)  stationIDAika Katso kuvaus[httpVaadittu Variables](#httpgetrequiredvariables-global-attribute)alhaalla.
    5. Jos tietoja kerätään viiden minuutin välein,httpGetDirectoryStructure tälle esimerkillestationID2 kuukautta. Katso kuvaus[httpGetDirectoryn rakenne](#httpgetdirectorystructure)alhaalla.
    6. The[httpGetkeys](#httpgetkeys)
    
Lisää tulos (Chunk ofdatasets.xmlDatan osalta) ettädatasets.xml.
     
4. editoimaandatasets.xmlChunk tälle aineistolle, jotta se olisi oikein ja täydellinen.
Vaihda kaikki??? oikealla sisällöllä.
     
5. Sillä&lt;tiedostoTableInMemory &gt; Asetukset:
    * Aseta tämä toteen, jos tietoaineisto yleensä saa toistuvia .insert- ja/tai .delete-pyyntöjä. (useammin kuin kerran 10 sekunnissa) . Tämä auttaa EDDTableFromHttpGet vastaamaan nopeammin .insert- ja/tai .delete-pyyntöihin. Jos asetat tämän todeksi, EDDTableFromHttpGet tallentaa tiedostotaulukon ja siihen liittyvät tiedot levylle säännöllisesti. (Tarvittaessa noin joka viides sekunti) .
    * Aseta tämä väärään (Oletusarvo) jos tietokanta yleensä saa .insert- ja/tai .delete-pyyntöjä (Alle kerran 10 sekunnissa) .
         
6. Huomautus: on mahdollista käyttää&lt;CacheFromUrl &gt; ja siihen liittyvät asetuksetdatasets.xmlEdd-pöytä Lähde: HTP Saada tietoaineistoja keinona tehdä ja ylläpitää paikallista kopiota etäisestä EDDTableFromHttpGet-tietokannasta toisestaERDDAP. Tässä tapauksessa tämä paikallinen tietoaineisto hylkää kaikki .insert- ja .delete-pyynnöt.

#### Eddtable käyttäminen Lähde: HttpGet Datasets{#using-eddtablefromhttpget-datasets} 

* Tekijät voivat tehdä "pyyntöjä", jotka[lisätä tietoja tai poistaa tietoja tietoaineistosta](#insert-and-delete).
     
* Kun todelliset tiedot on lisätty tietoaineistoon, voit ja pitäisi poistaa alkuperäisen näytetiedoston.
     
* Käyttäjät voivat pyytää tietoja tietoaineistosta, koska he tekevät mitä tahansa muuta EDDTable-tietoaineistoa varten.ERDDAP. Jos pyyntö ei sisällä rajoitusta aikaleiman sarakkeessa, pyyntö saa tietoja tietoaineiston nykyisestä versiosta. (lokitiedoston käsittelyn jälkeen kaikki asennus- ja poistokomennot ja uudelleenjärjestelythttpVaadittu Variables) .
     
* Käyttäjät voivat myös esittää EDDTableFromHttpGet-tietoaineistoihin liittyviä pyyntöjä:
    * Jos pyyntö sisältää&lt;tai tai&lt;= aikaleima-altaan rajoittaminen, sittenERDDAP™Prosessoi lokitiedoston rivejä määritettyyn aikaleimaan asti. Käytännössä tämä poistaa tilapäisesti kaikki tietoaineistoon tehdyt muutokset sen jälkeen, kun aikaleima-arvo on tuotu. Lisätietoja, katso[Versio](#versioning).
    * Jos pyyntöön sisältyy &gt;, arvo tai = aikaleima-altaan rajoittaminen, esim.&lt;= 0, sittenERDDAP™palauttaa tiedot tiedostoista niin kuin se on, käsittelemättä asennus- ja poistokomentoja.
* Tulevaisuudessa kuvittelemme, että työkaluja rakennetaan (meiltä? Sinä?) työskentelemään näiden aineistojen kanssa. Esimerkiksi voi olla käsikirjoitus, joka lukee raaka lokitiedostoja, soveltaa eri kalibrointiyhtälöä ja tuottaa/päivittää erilaisen tietoaineiston kyseisellä johdetulla informaatiolla. Huomaa, että käsikirjoitus voi saada alkuperäiset tiedot pyynnöstäERDDAP™  (joka saa tiedot tiedostomuodossa, joka on helpoin käsikirjoituksen toimimaan) ja luoda/päivittää uusi tietoaineisto .insert "pyynnöt"ERDDAP. Käsikirjoitus ei tarvitse suoraa pääsyä tietotiedostoihin, se voi olla minkä tahansa valtuutetun tekijän tietokoneella.
     

#### Lisätietoja EDDTableFromHttpGet{#detailed-information-about-eddtablefromhttpget} 

Aiheet ovat:

*   [Älä muuta asennusta&#33;](#dont-change-the-setup)
*   [CRUD](#crud)
*   [Invalid Requests](#invalidrequests)
*   [Nopeus](#httpget-speed)
*   [Roskaa](#robust)
*   [järjestelmän luotettavuus](#system-reliability)
*   [Versio](#versioning)
*   ["Entä HTTP PUT ja DELETE?"](#https-put-and-delete)
*   [Huomautuksia](#httpget-notes)
*   [Kiitos perusideasta.](#thanks)

Tässä yksityiskohtaiset tiedot:

##### Älä muuta asennusta&#33;{#dont-change-the-setup} 
Kun tietokanta on luotu ja olet lisännyt siihen tietoja:

* Älä lisää tai poista mitäändataVariables.
* Älä muutasourceNametai taidestinationNameettädataVariables.
* Älä muuta dataa Tyypin tyyppidataVariables. Voit muuttaadataVariableMetadataa.
* Älä muutahttpVaaditaan Globaalit ominaisuudet.
* Älä muutahttpGetDirectoryStructure Global Attribute.

Jos haluat muuttaa jotain näistä asioista, tee uusi tietoaineisto ja siirrä kaikki tiedot uuteen tietoaineistoon.
     
##### CRUD{#crud} 
Tietojenkäsittelytieteessä neljä peruskomentoa tietoaineiston kanssa työskentelyyn ovat[Luominen, lukeminen, päivittäminen, (CRUD) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). SQL-kieli, joka toimii suhteellisten tietokantojen kanssa, vastaa INSERT-, SELECT-, UPDATE- ja DELETE-tietoja. EDDTableFromHttpGetissä,

* .insert on yhdistelmä luovuutta ja päivitystä.
* .delete on kuollut.
* Säännöllinen järjestelmä tietojen alijoukkojen pyytämiseen on READ.

Näin EDDTableFromHttpGet tukee kaikkia tietoaineiston kanssa työskentelyn peruskomentoja.
     
* .insert tai .delete-pyynnöt, joilla ei ole virheitä, palauttavat HTTP status code=200 ja JSON-objekti, esim.
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
Kahdella aikaleima-arvolla tarkoitetaan samaa millisekuntia, joka on millisekunti, joka tallennetaan aikaleimamuuttujaan lisättyjen tai poistettujen tietojen riveihin.ERDDAP™Näiden arvoparien nimi ja muotoilu eivät muutu tulevaisuudessa.ERDDAP™Se voi lisätä lisäarvoa JSON-objektiin tulevaisuudessa.
     
##### Invalid Requests{#invalidrequests} 
.insert- tai .delete-pyynnöt palauttavat HTTP-virheen tilakoodin, joka ei ole status = 200, eikä tietoaineistoon tehdä muutoksia. Tämä sisältää pyynnöt, joissa on virheellisiä tekijöiden tietoja, virheellisiä muuttuvia nimiä, erilaisia valikoiman pituuksia eri muuttujat, puuttuvat tarvittavat muuttujat, puuttuvat muuttuvia arvoja jne. Jos pyyntöön sisältyy useampi kuin yksi tietotiedosto, on mahdollista, että osa pyynnöstä onnistuu ja osa epäonnistuu. Tämän ei kuitenkaan pitäisi olla ongelma, jos pyynnön lähettävä anturi käsittelee epäonnistumista täydellisenä epäonnistumisena. Jos esimerkiksi kerrotERDDAP™lisätään (tai poistaa) samat tiedot kahdesti peräkkäin, pahinta on, että tiedot tallennetaan kahdesti, suljetaan lokitiedostossa. On vaikea nähdä, miten se voi aiheuttaa ongelmia.
     
##### HttpGet Speed{#httpget-speed} 
.insert tai .delete-pyynnöt (Ei lasketahttpYli) .insertin tai .deleten nopeus on
1 m per .insert 1 rivi dataa
2ms per .insert, jossa on 10 riviä dataa (\\[\\])   
3ms per .insert, jossa on 100 riviä dataa (\\[\\])   
13ms per .insert, jossa on 1000 riviä dataa (\\[\\])   
Selkeät mallit ovat avain[Korkea läpäisy](#httpget-speed). Ilman joukkoja on haastavaa lisätä tai poistaa yli 8 riviä dataa sekunnissa etäkirjailijalta. (Kaiken verkon edetessä) . Joukkojen avulla on helppo lisätä tai poistaa yli 1000 riviä dataa sekunnissa kauko-anturista.

Hyvin suuria määriä tietoja pyyntöä kohden osut Tomcatin rajaan maksimikyselyn pituuteen. (Oletusarvo 8KB?) mutta sitä voidaan lisätä muokkaamalla maxHttpHeaderSize-asetusta *Tom* /Conf/server.xml HTTP/1.1 Sisäänpääsy.

MilloinERDDAP™Lue JSON Lines CSV -tiedot (log log) tiedostoja, on pieni rangaistus verrattuna lukemaan binary datatiedostoja. Tunsimme, että tällä kertaa lukemisen rangaistus oli kohtuullinen hinta järjestelmän nopeudesta ja voimakkuudesta. (joka on ensisijainen merkitys) .

##### SSD{#ssd} 
[suuremmalla nopeudella,](#ssd)käyttää[Solid State Drive (SSD) ](https://en.wikipedia.org/wiki/Solid-state_drive)tallentaa tietoja. tiedoston käyttöaika on huomattavasti nopeampi (&lt;0,1 m) kuin kiintolevy (3 - 12 ms) . Myös nopeampi tiedonsiirtoaste (200 - 2500 MB/s) kuin kiintolevyt (200 MB/s) . Kustannukset ovat laskeneet huomattavasti viime vuosina. Vaikka varhaisella SSD:llä oli ongelmia useiden kirjoitusten jälkeen tietylle lohkolle, tämä ongelma on nyt huomattavasti pienempi. Jos käytät SSD-tiedostoa vain kerran, lue se useita kertoja, jopa kuluttaja-arvoinen SSD (Se on huomattavasti halvempaa kuin SSD-arvosana.) Pitäisi kestää pitkään.
    
##### Roskaa{#robust} 
Olemme yrittäneet tehdä järjestelmästä niin helppokäyttöisen ja mahdollisimman vahvan.
* Järjestelmä on suunniteltu useita lankoja (esimerkiksi anturi, automaattinen QC-käsikirjoitus ja ihminen) Samaa aineistoa ja jopa samaa tiedostoa. Suuri osa tästä on mahdollista käyttämällä lokitiedoston lähestymistapaa tietojen tallentamiseen ja käyttämällä hyvin yksinkertaista tiedostotyyppiä,[JSON CSV-tiedostot](https://jsonlines.org/examples/)tietojen tallentamiseen.
* Toinen suuri etu JSON Lines CSV: lle on, että jos tiedosto on koskaan korruptoitunut. (Esim. virheen vuoksi linjassa) tiedoston avaaminen tekstieditorissa on helppoa ja ongelman korjaaminen.
* Toinen etu on, että jos tiedostossa on virhe, järjestelmä voi silti lukea kaikki tiedot rivillä ennen ja jälkeen virheen. Järjestelmä voi edelleen kirjata lisätietoja.insert ja .delete-tiedot.
* Suuri etu käyttää admin-accessible standarditiedostoja (Suhteellinen tietokanta tai Cassandra tai muu ohjelmisto) : Ei ole muita ohjelmistoja, jotka on pidettävä yllä ja jotka on toimittava tallentaa tai hakea tietoja. Ja se on helppo varmuuskopioida vakiotiedostoja milloin tahansa ja lisääntyvällä tavalla, koska tiedot ovat kiinnityksiä. (Jonkin ajan kuluttua vain nykyinen tiedosto kullekin asemalle muuttuu.) . Sen sijaan tarvitaan huomattavaa vaivaa ja järjestelmä aikaa ulkoisten varmuuskopiointitiedostojen tekemiseen tietokannoista ja Cassandrasta.
         
##### järjestelmän luotettavuus{#system-reliability} 
On järkevää odottaa yhtä palvelintaERDDAP™99,9%: n käyttöikä - se on noin 9 tuntia katkosaikaa vuodessa (Voit käyttää sitä yhdessä huonossa yössä&#33;) .
Jos olet ahkera ja onnekas, saatat saada 99,99% (53 minuuttia kuukaudessa) Koska vain muutama päivitysten uudelleenkäynnistys vie paljon aikaa.
Sinun pitäisi ryhtyä äärimmäisiin toimenpiteisiin (erillinen varmuuskopiointipalvelin, keskeytymätön virtalähde, varmuuskopio ilmastointi, 24x7x365 henkilöä seurata sivustoa, jne.) Mahdollisuus 99,999 %:iin (5,25 minuuttia vuodessa) . On hyvin epätodennäköistä, että saavutat 99,999% kertakäyttöön. (99,99 %) Ongelmat ovat usein kontrollin ulkopuolella. Esimerkiksi Amazon Web Service ja Google tarjoavat hämmästyttävän luotettavia verkkopalveluja, mutta suuret osat niistä ovat usein alas tuntikausia.

Kasvot, kaikki haluavatERDDAP™100-prosenttinen käyttöaika, tai ainakin "kuusi yhdeksää" (99,9999% käyttöikä vastaa 32 sekuntia laskuaikaa vuodessa) Ei ole mitään tapaa saada sitä riippumatta siitä, kuinka paljon aikaa, vaivaa ja rahaa käytät.

Mutta kuitenkinERDDAP™Aika ei ole todellinen tavoite täällä. Tavoitteena on luoda luotettava **Järjestelmäjärjestelmä** joka ei menetä tietoja. Tämä on ratkaiseva ongelma.

Ratkaisu: Rakenna vika-toleranssi tietokoneohjelmistoon, joka lähettää tiedotERDDAP. Ohjelmiston on erityisesti ylläpidettävä datajonoa, joka odottaaERDDAP. Kun jonoon lisätään tietoja, ohjelmiston tulee tarkistaa vastausERDDAP. Jos vastaus ei sisällä saatuja tietoja. Ei virheitä, sitten ohjelmiston pitäisi jättää tiedot jonoon. Kun jonoon luodaan ja lisätään lisää dataa, ohjelmiston on yritettävä uudelleen lisätä jonossa olevat tiedot. (Ehkä sen kanssa\\[\\]Järjestelmäjärjestelmä) . Se onnistuu tai epäonnistuu. Jos se epäonnistuu, se yrittää uudelleen myöhemmin. Jos kirjoitat ohjelmiston toimimaan näin ja jos ohjelmisto on valmis jonottamaan muutaman päivän datan arvoista, sinulla on hyvät mahdollisuudet ladata 100 % anturin tiedoista.ERDDAP. Ja olet tehnyt sen menemättä suureen vaivaan tai kustannuksiin.

\\[Tausta: Emme ajatelleet tätä ylös.[Näin tietokoneverkot saavuttavat luotettavuuden.](https://en.wikipedia.org/wiki/Reliability_(computer_networking)) Tietokoneverkot ovat luonnostaan epäluotettavia. Kun siirrät tiedoston tietokoneesta toiseen, lähetysohjelmisto tietää/odottaa, että jotkin paketit saattavat hävitä. Jos se ei saa kunnollista tunnustusta tietylle paketille vastaanottimesta, se lähettää kadonneen paketin. Tämän lähestymistavan avulla suhteellisen yksinkertaiset lähettäjä- ja vastaanotinohjelmistot voivat rakentaa luotettavan tiedostonsiirtojärjestelmän epäluotettavan verkon päälle.\\]
    
##### Miksi JSON Lines CSV tiedostot?{#why-json-lines-csv-files} 
EDDTableFromHttpGet käyttää[JSON CSV-tiedostot](https://jsonlines.org/examples/)tietojen tallentamiseen. Syyt ovat:

* JSON Lines CSV -tiedostojen yksinkertaisuus tarjoaa nopean, helpon ja luotettavan tavan kirjoittaa useita säikeitä. (esim. synkronoimalla tiedoston nimi) .
* Jos JSON Lines CSV -tiedosto on korruptoitunut (Esim. virheen vuoksi linjassa) EDDTableFromHttpGet voisi silti lukea kaikki tiedot kaikista linjoista ennen ja jälkeen virheen. Ja .insert- ja .delete-järjestelmä voisi jatkaa uusien tietojen lisäämistä datatiedostoon.
* Koska JSON Lines CSV -tiedostot ovat ASCII-tiedostoja, jos tiedosto on koskaan korruptoitunut, se on helppo korjata. (Tekstieditorissa) .
* JSON Lines CSV tukee Unicode-sarjoja.
* JSON Lines CSV tukee muuttuvia pituusjonoja (Ei rajoitu max) .
* JSON Lines CSV tukee 64-bittisiä kokonaislukuja (Pitkät) .
* JSON Lines CSV:n virallinen luonne ja ylimääräinen syntaksi (Vanha koulu CSV) Varmista, että tiettyä linjaa ei ole korruptoitunut.

Aluksi yritimme käyttää.nc3 tiedostoa, joissa on rajaton ulottuvuus. Ongelmia oli kuitenkin:

* Suurin ongelma oli: Ei ole luotettavaa tapaa antaa useiden ketjujen kirjoittaa.nc3 tiedostoa, vaikka langat toimivat yhteistyössä tekemällä kirjoitukset synkronoidulla tavalla.
* Jos.nc3 tiedostoa korruptoituu, .insert ja .delete-järjestelmä eivät voi jatkaa tiedoston käyttöä.
* Koska.nc3 tiedostoa ovat binaarisia, jos tiedosto on korruptoitunut (jotka johtuvat monitahoisesta ongelmasta) Ne ovat erittäin vaikeita tai mahdottomia korjata. Korjaukseen ei ole työkaluja.
* CF:llä ei ole mitään keinoa määrittää merkkijonojen koodausta, joten Unicodea ei voi tukea virallisesti, esimerkiksi UTF-8-koodausta. Yritimme saada CF:n tukemaan koodausominaisuutta, mutta emme voineet edistyä. (UnidataLuottonsa mukaan se tukee E-koodia.) 
*   .nc3 tiedostoa tukee vain kiinteää pituutta. Yritimme saada CF:n jaUnidatatukemaan muuttuvia pituusjonoja, mutta ei onnistunut.
*   .nc3 tiedostoa ei tue helppoa tapaa erottaa yksittäisen hahmon muuttujat String-muuttujat. Yritimme saada CF:n jaUnidatatukemaan näiden kahden tietotyypin erottamisjärjestelmää, mutta ei voinut edistyä.
*   .nc3 tiedostoa tukee vain 8-bittisiä merkkejä, joissa on määrittämätön koodaus. Yritimme saada CF:n jaUnidatatukea koodausjärjestelmää, mutta ei onnistunut.
*   .nc3 tiedostoa ei tue 64-bittisiä kokonaislukuja (Pitkät) . Yritimme saada CF:n jaUnidatatukemaan järjestelmää pitkään, mutta ei onnistunut.
         
##### Versio{#versioning} 
Koska EDDTable Lähde: HTP Saat kirjaa kaikista tietoaineiston muutoksista aikaleimalla ja jokaisen muutoksen tekijällä, se voi nopeasti luoda kyseisen tietoaineiston milloin tahansa. On olemassa versio mihin tahansa aikaan. Jos käyttäjän tietopyyntöön sisältyy aikaleima&lt;= rajoitukset, esim. & Timestamp&lt;=2016-06-23T16:32:22.128Z (tai milloin tahansa) ei rajoita kirjoittajaa tai käskyä,ERDDAP™Vastaa pyyntöön luomalla ensin tietoaineiston version siitä ajasta. Sitten,ERDDAP™käyttää käyttäjän muita rajoituksia, kuten minkä tahansa muun pyynnön kanssaERDDAP. EDDTableFromHttpGet on perustettu niin, että tämä prosessi on erittäin nopea ja tehokas, jopa erittäin suuria tietoaineistoja.

Samoin käyttäjä voi selvittää, milloin tietoaineisto on viimeksi päivitetty pyytämällä...?timestamp&timestamp=max. (Aikaleima) &distinct () 

Ja mitä tahansa tietoja koskevaa pyyntöä, mitä tahansa tietoaineiston versiota, käyttäjät voivat nähdä, mitä tekijä on tehnyt, mitä muutoksia ja milloin he ovat tehneet ne.

Tämä versiojärjestelmä mahdollistaa[Toistuva tiede](https://en.wikipedia.org/wiki/Reproducibility)koska kuka tahansa voi milloin tahansa pyytää tietoja tietoaineiston versiosta milloin tahansa. Tämä hienovarainen versio ei ole mahdollista minkään muun järjestelmän kanssa. Taustalla oleva mekanismi on erittäin tehokas, sillä ylimääräistä varastointitilaa ei tarvita, ja käsittely on todella vähäistä.

Kaikilla ei ole tarvetta tällaiseen hienosäädettyyn versioon, mutta se on erittäin hyödyllinen, ehkä tarpeen, suuressa tiedonhallintaorganisaatiossa. (esimerkiksi OOI, Earth Cube, Data One jaNOAANCEI) missä aineistossa voi olla useita kirjoittajia (esim. anturi, automaattinen QC-käsikirjoitus ja ihmisen toimittaja) .

\\[Alkuperäinen artikkeli: en:The need for this versioning first (Bob) Luettuaan ja keskustellessaan OOI:sta vuonna 2008. Tuolloin OOI:lla oli vaikea, hidas ja tehoton versiojärjestelmä, joka perustui Gitiin. Se on hyvä siihen, mihin se on suunniteltu, mutta ei tähän. Vuonna 2008 OOI-keskustelussa suunnittelin laajan, tehokkaan vaihtoehto-OOI-järjestelmän tiedonhallintaan, mukaan lukien monet ominaisuudet, joita olen lisännyt.ERDDAP™Sittemmin myös tämä versio. Tuolloin ja sen jälkeen OOI on sitoutunut versiojärjestelmään eikä ole kiinnostunut vaihtoehdoista. Vuonna 2016 suunnitelman muut osat laskivat ja aloin toteuttaa sen. Koska muissa projekteissa oli paljon keskeytyksiä, en päässyt vuoden 2018 loppuun. Vieläkään en ole tietoinen mistään muusta tieteellisestä tietojärjestelmästä, joka tarjoaa niin nopean ja helpon pääsyn datan versioon mistä tahansa ajankohdasta. Yksinkertaiset tiedostojärjestelmät eivät tarjoa tätä. Suhteelliset tietokannat eivät. Cassandra ei\\]
    
##### HTTPS Put and Delete{#https-put-and-delete} 
*   ["Entä HTTPS PUT ja DELETE?"](#https-put-and-delete)  
    [Hypertekstien siirtoprotokolla (HTTP) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)on perusta World Wide Web ja syy, että verkkosivun URL-osoitteet alkavat. http://" tai " https://" . HTTPS on HTTP, jossa on lisätietoturvakerros. Selaimet, käsikirjoitukset ja tietokoneohjelmat tekevät miljardeja HTTP-ohjelmia päivittäin. (S)   **Lähde** pyytää tietoa etälähteistä. HTTP (S) sisältää myös muita[Verbs](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)erityisesti PUT (työntää tietoja palvelimelle) Delete (Tietojen poistaminen palvelimelta) . Kyllä, PUT ja DELETE ovat oikea tapa lisätä tietoja ja poistaa tietoja HTTP:n kautta. (S) . GET tukee kaikkia ohjelmistoja, jotka voivat toimia HTTP:n kanssa. (S) . GET on todella helppo työskennellä. Kaikki tietävät, miten tehdä yhteistyötä GET:n kanssa ja monet osaavat käyttää POSTia. (jota voidaan käyttää olennaisesti samalla tavalla kuin GET) Teimme EDDTableFromHttpGet-työtä GET:n ja POST:n kanssa. Hyvin harvat ihmiset (Vain harvat tietokoneohjelmoijat) Hän on koskaan työskennellyt Putin ja Deletein kanssa. PUT ja DELETE ovat yleensä vain tietokonekielten tukemia, joten niiden käyttö edellyttää taitavaa ohjelmaa. Joten PUT ja DELETE ovat yleensä paljon vaikeampi lähestymistapa, koska miten työkalut ovat kehittyneet.
     
##### HttpGet muistiinpanoja{#httpget-notes} 
*   [Huomautuksia](#httpget-notes)
    * Ei Ei Ei Ei Ei Ei Ei Ei Ei EidataVariableVoi olla, että dataType = Char. Käytä dataType=String. Jos tarvitset dataType=char, sähköposti Chris. Johannes osoitteessa Noaa.gov.
         
##### Kiitos{#thanks} 
*   [Kiitos perusideasta.](#thanks)  
Etusivu EDDTableFromHttpGet (i.s. käyttäenHTTP GETpyytää lisätietoja tietoaineistoon) Lähde: UCAR's (NCAR?)  [Cloud-Hosted Real Time -tietopalvelut (Koristeita) ](https://github.com/earthcubeprojects-chords)projekti. Pyynnössä olevat parametrit (toistuvasti *Nimi = arvo* erottaa & s) on sama standardimuoto, jota HTML-muodot käyttävät verkkosivuilla. Se on yksinkertainen ja loistava ajatus ja vielä enemmän, koska se sotkee niin täydellisesti.ERDDAPolemassa oleva järjestelmä, jolla käsitellään tabulaaritietoja. Ajatus on ilmeinen, mutta minä (Bob) ei ajatellut sitä. EDDTableFromHtp Hyödynnä tätä perusideaa yhdistettynä ajatuksiimme siitä, miten se toteutetaan, jotta voimme luoda järjestelmänERDDAP™tietojen lataamiseen. EDDTableFromHttpGetin käyttöönotto on täysin erilainen ja täysin riippumaton CHORDSista ja sillä on erilaiset ominaisuudet. (esimerkiksi lokitiedostot, tietojen kiinnitys, eri turvallisuusjärjestelmä, CRUD-tuki, toistettavissa olevat tiedot) . Altistuminen CHORDSiin oli vain webinaari. Emme katsoneet heidän koodiaan tai lukeneet heidän projektiaan, koska tiesimme heti, että halusimme toteuttaa järjestelmän eri tavalla. Olemme kiitollisia perusajatuksesta. Koko viittaus CHORDSiin on
Daniels, M. D., Kerkez, B., Chandrasekar, V., Graves, S., Stamps, D. S., Martin, C., Dye, M., Gooch, R., Bartos, M., Jones, J., Keiser, K. (2014 2014 2014 2014) . Cloud-Hosted Real Time Data Services for the Geosciences Näytä tarkat tiedot (Koristeita) ohjelmisto. UCAR/NCAR - Maapallon tarkkailulaboratorio.[ https://doi.org/10.5065/d6v1236q ](https://doi.org/10.5065/d6v1236q)  
     
### EDDTableFromHyraxTiedostot{#eddtablefromhyraxfiles} 
[ **EDDTableFromHyraxTiedostot** ](#eddtablefromhyraxfiles)  (Vähentynyt) aggregates datatiedostoja, joissa on useita muuttujia, joista jokaisella on yksi tai useampi jaettu ulottuvuus. (Esimerkiksi aika, korkeus (tai syvyys) Leveys, pituus) ja palvelee a[Hyrax OPeNDAPPalvelin](https://www.opendap.org/software/hyrax-data-server).

* Tämä tietotyyppi on **Vähennetty** . Uudempi ja yleisempi ratkaisu on käyttää[Cash Lähde: Url option for EDDTable Filejä](#cachefromurl)  (tai variantti) , joka tekee paikallisen kopion etätiedostoista ja palvelee tietoja paikallisista tiedostoista. The&lt;CacheFromUrl&gt;-vaihtoehtoa voidaan käyttää minkä tahansa tabulaaritiedoston kanssa. **   
Jos et voi tehdä tätä työtä jostain syystä, sähköpostia Chris. Johannes osoitteessa Noaa.gov.
Jos valituksia ei ole ennen vuotta 2020, tietotyyppi voidaan poistaa. ** 
* Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Sen jälkeen voit muokata sitä hienosti.
* Useimmissa tapauksissa jokaisella tiedostolla on useita arvoja vasemmalle. (Ensimmäinen ensimmäinen) esimerkiksi aika.
* Tiedostot usein (Mutta ei tarvitse) Yhtenä arvona muille ulottuvuuksille (Esimerkiksi korkeus (tai syvyys) Leveys, pituus) .
* Tiedostot voivat olla luonteenmuuttujat, joilla on ylimääräinen ulottuvuus. (Esimerkiksi nCharacters) .
*   HyraxPalvelimet voidaan tunnistaa URL-osoitteessa "/dods-bin/nph-dods/" tai "/opendap/".
* Tämä luokan piirros rikkooHyraxWeb-sivut, joissa on luettelo tiedostoista jokaisessa hakemistossa. Tämä johtuu siitä, että se on hyvin erityinen nykyiseen muotoon.Hyraxverkkosivut. Yritämme sopeutuaERDDAP™Jos/kun tulevat versiotHyraxMuuta, miten tiedostot on listattu.
* The&lt;tiedostoDir&gt;-asetus on sivuutettu. Koska tämä luokka lataa ja tekee paikallisen kopion jokaisesta etätiedostosta,ERDDAP™Pakottaa tiedostot Likainen olla *isovanhemmat* Copy/ *datasetID* /
* For For&lt;sourceUrl&gt; käytä tietoaineiston perushakemiston URL-osoitettaHyraxesimerkiksi palvelin
    &lt;sourceUrl&gt; http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/ &lt;//sourceUrl&gt;
     (Laita se yhteen linjaan)   (Pahoittelut, että palvelinta ei ole enää saatavilla) .
ThesourceUrlVerkkosivut ovat yleensä "OPeNDAPPalvelimen indeksi\\[Ohjaaja\\]&gt; huipulla.
* Koska tämä luokka lataa aina ja tekee paikallisen kopion kunkin etätiedoston, sinun ei pitäisi koskaan kääriä tätä tietoaineistoa.[EdDTableCopy](#eddtablecopy).
* Katso tämän luokan superluokka,[EDDTableFromfiilit](#eddtablefromfiles)Tietoa siitä, miten luokka toimii ja miten sitä käytetään.
* Katso 1D, 2D, 3D ja 4D-esimerkit[EDDTableFromNcFiles](#eddtablefromncfiles).
     
### EDDTableFromInvalidCRAFiles{#eddtablefrominvalidcrafiles} 
[ **EDDTableFromInvalidCRAFiles** ](#eddtablefrominvalidcrafiles)Aggregoituja tietojaNetCDF  (V3 tai v4)  .nctiedostot, jotka käyttävät CF DSG Contiguous Ragged Array -versiota (CRA) tiedostoja. Vaikka vaikkaERDDAP™tukee tätä tiedostotyyppiä, se on mitätön tiedostotyyppi, jota kenenkään ei pitäisi aloittaa. Ryhmiä, jotka käyttävät tätä tiedostotyyppiä, kannustetaan voimakkaasti käyttämäänERDDAP™luoda kelvollisia CF DSG CRA -tiedostoja ja lopettaa näiden tiedostojen käyttö.

Yksityiskohdat: Näillä tiedostoilla on useita ± koko-muuttujat, joista jokaisella on näytteellinen ulottuvuusominaisuus. Tiedostot ovat ei-CF-standarditiedostoja, koska useita näytteitä (B) Mitat on dekoodattava ja yhdistettävä toisiinsa tällä lisäsäännöllä ja lupauksella, joka ei kuulu CF DSG-eritelmään: ”Voit liittää tietyn, esimerkiksi lämpötila-arvon. (Tempauksen ulottuvuus) tietyllä syvyysarvolla (zobs-ulottuvuus, ulottuvuus, jolla on eniten arvoja) koska lämpötila on = (Eräälle valalle) on joko 0 tai vastaava syvyys + (Tätä valettua)   (Tämä on sääntö) . Joten, jos lämpötila ei ole 0, sitten n lämpötila-arvot kyseiselle valettu liittyy suoraan n syvyys arvoja kyseiselle valettu. (Tämä on lupaus) » »

Toinen ongelma näissä tiedostoissa: Principal \\Investigator row \\size muuttuja ei ole näyte ulottuvuus attribuutti eikä noudata edellä mainittua sääntöä.

Näytetiedostot tälle tietoaineistotyypille löytyvät https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Tämä palvelin ei ole enää luotettava\\].

Katso tämän luokan superluokka,[EDDTableFromfiilit](#eddtablefromfiles)Tietoa siitä, miten luokka toimii ja miten sitä käytetään.

Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Sen jälkeen voit muokata sitä hienosti.

Ensimmäinen GenerateDatasets Xml tekee tämän tyyppisiä tietoja vastatessasi kysymyksiin tulostetaan näytetiedoston ncdump-mainen rakenne. Joten jos syötät muutaman goofy-vastauksen ensimmäiselle kierrokselle GenerateDatasetsin kautta. Vähintään XML:ssä voit nähdä, josERDDAP™Voit lukea tiedoston ja katsoa, mitä mitat ja muuttujat ovat tiedostossa. Sitten voit antaa parempia vastauksia toiselle kierrokselle GenerateDatasetsXmlin kautta.
 
### EDDTableFromJsonlCSVFiles{#eddtablefromjsonlcsvfiles} 
[ **EDDTableFromJsonlCSVFiles** ](#eddtablefromjsonlcsvfiles)Aggregoituja tietoja[JSON CSV-tiedostot](https://jsonlines.org/examples/). Katso tämän luokan superluokka,[EDDTableFromfiilit](#eddtablefromfiles)Tietoa siitä, miten luokka toimii ja miten sitä käytetään.

* Kuten jsonlines.org sanoo, tämä muoto on parempi kuin CSV. (Ja laillisesti, liittovaltion työntekijänä, en voi olla samaa mieltä tai eri mieltä heidän kanssaan – kuinka hullua se on?) . CSV:tä ei ole koskaan määritetty virallisesti, ja sen yhteyteen liittyvät historialliset matkatavarat haittaavat sitä. JSON Lines CSV on täysin määritelty ja hyötyy sen yhteydestä laajalti käytettyyn JSON-standardiin, joka puolestaan hyötyy sen yhteydestä.JavaKäsikirjoitus jaJava. Erityisesti pitkät kokonaisluvut ja Unicode-hahmot merkkijonoissa ovat täysi tuki ja selkeä tapa sisällyttää muita erikoismerkkejä. (Erityisesti tabs ja newlines) Sarjojen sisällä.
    
Tämä formaatti on erityisen hyvä tietoaineistoille, joissa sinun on säännöllisesti liitettävä lisärivit tietyn tietotiedoston loppuun. Tästä syystä ja muut (ylhäällä) ,[EdDTableFromHttpGet](#eddtablefromhttpget)käyttää Json Lines CSV -tiedostoja tietojen tallentamiseen.
    
* Syöttötiedostojen oletetaan olevan UTF-8 koodattuja. Kuitenkin, kun otetaan huomioon *ddd* Erikoishenkilöiden koodaaminen (#u20ac on euron tunnusluku.) , sinulla on mahdollisuus kirjoittaa tiedostoja niin, että ne sisältävät vain 7-bittisiä ASCII-merkkejä käyttäen *ddd* Kaikki merkit #127.
     
* Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Sen jälkeen voit muokata sitä hienosti.
    
Ensimmäinen asia, jonka GenerateDatasetsXml tekee tällaiselle tietoaineistolle vastatessasi kysymyksiin, on tulostaa näytetiedoston ncdump-mainen rakenne. Joten jos syötät muutaman goofy-vastauksen ensimmäiselle kierrokselle GenerateDatasetsin kautta. Vähintään XML:ssä voit nähdä, josERDDAP™Voit lukea tiedoston ja katsoa, mitä mitat ja muuttujat ovat tiedostossa. Sitten voit antaa parempia vastauksia toiselle kierrokselle GenerateDatasetsXmlin kautta.
    
* Varoitus: milloinERDDAP™Lue JSON CSV-tiedostot, jos se löytää virheen tietyllä linjalla (esimerkiksi virheellinen määrä) Se viestittää varoitusviestin (Varoitus: Bad Line (s) Tietoja » Luettelo huonoista linjoista myöhemmillä riveillä) ja[log.txt-tiedosto](/docs/server-admin/additional-information#log)Jatka lukemista loput tiedostosta. Siksi sinun vastuullasi on katsoa säännöllisesti. (Kirjoita käsikirjoitus tehdäksesi niin) tuota viestiä logissa. txt, jotta voit korjata ongelmat tiedostoissa.ERDDAP™Näin käyttäjät voivat jatkaa kaikkien saatavilla olevien pätevien tietojen lukemista, vaikka joissakin tiedostojen riveissä on virheitä.
     
### EDDTableFromMultidimNcFiles Näytä tarkat tiedot{#eddtablefrommultidimncfiles} 
[ **EDDTableFromMultidimNcFiles Näytä tarkat tiedot** ](#eddtablefrommultidimncfiles)Aggregoituja tietojaNetCDF  (V3 tai v4)  .nc  (tai tai[.ncml](#ncml-files)) tiedostoja, joissa on useita muuttujia, joista jokaisella on yksi tai useampi jaettu ulottuvuus. Tiedostoissa voi olla merkkimuuttujat, joissa on tai ei ole ylimääräistä ulottuvuutta. (esimerkiksi Väkivalta 14) . Katso tämän luokan superluokka,[EDDTableFromfiilit](#eddtablefromfiles)Tietoa siitä, miten luokka toimii ja miten sitä käytetään.

* Jos tiedostot ovat moniulotteisia CF DSG-muuttujat, käytä tätä tietoaineistotyyppiä sen sijaan, että[EDDTableFromNcFiles](#eddtablefromncfiles).
     
* Uusia tabulaaritietoja.ncKäytä tätä vaihtoehtoa ennen kuin kokeilet vanhempia[EDDTableFromNcFiles](#eddtablefromncfiles). Tämän luokan edut ovat:
    * Tämä luokka voi lukea enemmän muuttujia laajemmasta tiedostorakenteesta. Jos määrität DimensionsCSV:n (Erillinen luettelo ulottuvuuksista) GenerateDatasets XML (tai&lt;CSV &gt; Sisältäädatasets.xmlTietoja yhdelle näistä aineistoista, sittenERDDAP™Luet vain muuttujia lähdetiedostoissa, jotka käyttävät joitakin tai kaikki nämä ulottuvuudet sekä kaikki skaalautuvat muuttujat. Jos ryhmässä on ulottuvuus, sinun on määritettävä sen koko nimi, esim. *Ryhmän nimi/DimensionName* ".
    * Tämä luokka voi usein hylätä tiedostot hyvin nopeasti, jos ne eivät vastaa pyynnön rajoituksia. Suurten kokoelmien lukeminen etenee usein nopeammin.
    * Tämä luokka käsittelee todellisia muuttujia (Ei-string-muuttujat) oikein.
    * Tämä luokka voi leikata String-muuttujat, kun luoja ei käyttänyt Netcdf-javan kirjoituksia (joka liittää koodin #0 merkitsemään merkkijonon loppua) .
    * Tämä luokka on parempi käsitellä yksittäisiä tiedostoja, joilla ei ole tiettyjä muuttujia tai mittoja.
    * Tämä luokka voi poistaa rivien lohkoja, joilla on puuttuvia arvoja.[CF Discrete Sampling Geometria (DSG) Epätäydelliset moniulotteiset tiedostot](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)  
         
* Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Sen jälkeen voit muokata sitä hienosti.
    
Ensimmäinen asia, jonka GenerateDatasetsXml tekee tällaiselle tietoaineistolle vastatessasi kysymyksiin, on tulostaa näytetiedoston ncdump-mainen rakenne. Joten jos syötät muutaman goofy-vastauksen ensimmäiselle kierrokselle GenerateDatasetsin kautta. Vähintään XML:ssä voit nähdä, josERDDAP™Voit lukea tiedoston ja katsoa, mitä mitat ja muuttujat ovat tiedostossa. Sitten voit antaa parempia vastauksia toiselle kierrokselle GenerateDatasetsXmlin kautta.
    
Ryhmä- GenerateDatasets XML pyytää ryhmää. Voit osallistua ", jotta se etsii kaikkia / kaikkia ryhmiä. *jotkut Ryhmäryhmä* Tai " *SomeGroup/someSubGroup* etsiä tiettyä ryhmää tai\\[juuret\\]”Haluan etsiä juuria. Ryhmän merkkijono muuttuu&lt;ryhmässä &gt;datasets.xmlInfo aineistoon (Vaikka "\\[juuret\\]"Tulee") .
    
DimensioCSV GenerateDatasets Xml pyytää "DimensionsCSV"-jonoa. Tämä on tiivistetty arvoluettelo ulottuvuuksien lähteiden nimistä. GenerateDatasets Xml lukee vain näytteen muuttujia.nctiedostot, jotka käyttävät joitakin tai kaikkia näitä ulottuvuuksia (Ei muita ulottuvuuksia) , plus kaikki tiedoston skaalautuvat muuttujat ja tiedoston tietoaineiston tekeminen näistä muuttujista. Jos ryhmässä on ulottuvuus, sinun on määritettävä sen koko nimi, esim. *Ryhmän nimi/DimensionName* ".
Jos et määrittele mitään (Tyhjä merkkijono) GenerateDatasets Xml etsii muuttujia, joilla on eniten ulottuvuuksia, teoriassa, että ne ovat kaikkein mielenkiintoisimpia, mutta voi olla aikoja, jolloin haluat tehdä aineiston jostain muusta tietomuuttujaryhmästä, joka käyttää joitakin muita ulottuvuuksia.
Jos määrität nimen, jota ei ole olemassa (Esimerkki: NOMATCH) ,ERDDAP™Löydät kaikki muuttujat.
"DimensionsCSV"-jono muuttuu&lt;CSV &gt; Sisältäädatasets.xmlTietoja tietoaineistosta.
    
#### ulottuvuuksia{#treatdimensionsas} 
On olemassa joukko mitättömiä.nctiedostoja (Koska he eivät noudata CF:n sääntöjä) joilla on useita ulottuvuuksia (Lat, Lon, Time) kun pitäisi käyttää vain yhtä ulottuvuutta (Esim. aika) Esimerkiksi:
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
EDDTableFromMultidimNcFilesillä on erityinen ominaisuus käsitellä näitä tiedostoja: jos lisäät globaalin attribuutin "käsittelyn" maailmanlaajuisiin tietoaineistoihin.addAttributesVoit kertoaERDDAP™tietyt ulottuvuudet (Esimerkki: Lat and Lon) ikään kuin se olisi toinen ulottuvuus (Esim. aika) . Attribuutin arvon on oltava tiivistetty luettelo, jossa määritellään ’” mitat ja sitten ’to’-ulottuvuus, esim.
<att name="treatDimensionsAs">Lat, Lon, aika</att>  
Sitten sittenERDDAP™Lue tiedosto ikään kuin se olisi:
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
Jokaisen luettelon ulottuvuuksien on oltava samat; muutenERDDAP™Se käsittelee tiedostoa "pahana tiedostona".

Huomaa, että nämä tiedostot ovat mitättömiä, koska ne eivät noudata CF-sääntöjä. VaikkaERDDAP™Voit lukea ne, suosittelemme vahvasti, että et luo tällaisia tiedostoja, koska muut CF-pohjaiset ohjelmistotyökalut eivät osaa lukea niitä oikein. Jos sinulla on jo tällaisia tiedostoja, suosittelemme korvaamaan ne kelvollisilla tiedostoilla mahdollisimman pian.
    
### EDDTableFromNcFiles{#eddtablefromncfiles} 
[ **EDDTableFromNcFiles** ](#eddtablefromncfiles)Aggregoituja tietojaNetCDF  (V3 tai v4)  .nc  (tai tai[.ncml](#ncml-files)) tiedostoja ja[Zarr](https://github.com/zarr-developers/zarr-python)tiedostoja (versio 2.25) useita muuttujia, joista jokaisella on yhteinen ulottuvuus (Esimerkiksi aika) enemmän kuin yksi yhteinen ulottuvuus (Esimerkiksi aika, korkeus (tai syvyys) Leveys, pituus) . Tiedostoilla on oltava samat ulottuvuudet. Tietyllä tiedostolla voi olla useita arvoja kullekin mitalle ja arvot voivat olla erilaisia eri lähdetiedostoissa. Tiedostot voivat olla luonteenmuuttujat, joilla on ylimääräinen ulottuvuus. (esimerkiksi Väkivalta 14) . Katso tämän luokan superluokka,[EDDTableFromfiilit](#eddtablefromfiles)Tietoa siitä, miten luokka toimii ja miten sitä käytetään.

Zarr-tiedostot ovat hieman erilaisia ja vaativat joko tiedoston NameRegex tai PathRegex sisällyttää "sarr".

* Jos.nctiedostot käyttävät yhtä[CF Discrete Sampling Geometria (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)tiedostomuotoja, yritä käyttää[EDDTableFromNcFiles](#eddtablefromncfiles)ennen tämän kokeilua.
     
* Uusia tabulaaritietoja.nctiedostot, kokeile uudempaa[EDDTableFromMultidimNcFiles Näytä tarkat tiedot](#eddtablefrommultidimncfiles)Ensimmäinen.
     
* Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Sen jälkeen voit muokata sitä hienosti.
    
Ensimmäinen asia, jonka GenerateDatasetsXml tekee tällaiselle tietoaineistolle vastatessasi kysymyksiin, on tulostaa näytetiedoston ncdump-mainen rakenne. Joten jos syötät muutaman goofy-vastauksen ensimmäiselle kierrokselle GenerateDatasetsin kautta. Vähintään XML:ssä voit nähdä, josERDDAP™Voit lukea tiedoston ja katsoa, mitä mitat ja muuttujat ovat tiedostossa. Sitten voit antaa parempia vastauksia toiselle kierrokselle GenerateDatasetsXmlin kautta.
    
DimensioCSV GenerateDatasets Xml pyytää "DimensionsCSV"-jonoa. Tämä on tiivistetty arvoluettelo ulottuvuuksien lähteiden nimistä. GenerateDatasets Xml löytää tietomuuttujat.nctiedostot, jotka käyttävät joitakin tai kaikkia näitä ulottuvuuksia, plus kaikki skaalautuvat muuttujat ja tekevät tietoaineiston näistä tietomuuttujat. Jos et määrittele mitään (Tyhjä merkkijono) GenerateDatasets Xml etsii muuttujia, joilla on eniten ulottuvuuksia, teoriassa, että ne ovat kaikkein mielenkiintoisimpia, mutta voi olla aikoja, jolloin haluat tehdä aineiston jostain muusta tietomuuttujaryhmästä, joka käyttää joitakin muita ulottuvuuksia.
    
* 1D-tiedostot ovat hieman erilaisia kuin 2D, 3D, 4D, ... tiedostot.
    * Sinulla voi olla joukko.ncTiedostotiedostot, joissa jokaisella tiedostolla on kuukauden tietojen arvo yhdestä ajokortista.
    * Jokaisella tiedostolla on yksi ulottuvuus, esimerkiksi aika. (koko =\\[Monet monet\\]) .
    * Jokaisella tiedostolla on yksi tai useampi 1D-muuttuja, joka käyttää tätä ulottuvuutta, esimerkiksi aika, pituus, leveys, ilmalämpötila.
    * Jokaisella tiedostolla voi olla 2D-hahmomuuttujat, esimerkiksi mitat (Aika, nCharacters) .
         
* 2D Esimerkki:
    * Sinulla voi olla joukko.ncTiedostotiedostot, joissa jokaisella tiedostolla on kuukauden tietojen arvo yhdestä ajokortista.
    * Jokaisella tiedostolla on kaksi ulottuvuutta, esimerkiksi aika. (koko =\\[Monet monet\\]) id (Koko = 1) .
    * Jokaisella tiedostolla on 2 1D-muuttujaa, joilla on samat nimet kuin mitat ja sama nimi mitat, esimerkiksi aika. (Aika-aika) id (id) . Nämä 1D-muuttujat on sisällytettävä luetteloon&lt;dataVariable&gt; Tietokoneessa XML.
    * Jokaisella tiedostolla on yksi tai useampi 2D-muuttuja, esimerkiksi pituus, leveys, ilman lämpötila, veden lämpötila, ...
    * Jokaisella tiedostolla voi olla 3D-hahmomuuttujat, esimerkiksi mitat (Aika, id, nCharacters) .
         
* 3D Esimerkki:
    * Sinulla voi olla joukko.ncTiedostot, joissa jokaisella tiedostolla on yhden kuukauden datan arvo yhdestä paikasta.
    * Jokaisella tiedostolla on kolme ulottuvuutta, esimerkiksi aika. (koko =\\[Monet monet\\]) Lat (Koko = 1) ja Lon (Koko = 1) .
    * Jokaisella tiedostolla on 3 1D-muuttujaa, joilla on samat nimet kuin mitat ja sama nimi mitat, esimerkiksi aika. (Aika-aika) Lat (Lataa) Lon (Lounas) . Nämä 1D-muuttujat on sisällytettävä luetteloon&lt;dataVariable&gt; Tietokoneessa XML.
    * Jokaisella tiedostolla on yksi tai useampi 3D-muuttuja, esimerkiksi ilmalämpötila, veden lämpötila.
    * Jokaisella tiedostolla voi olla 4D-hahmomuuttuja, esimerkiksi mitoilla. (aika, lat,lon, nCharacters) .
    * Tiedoston nimi voi olla tiedoston nimi.
         
* 4D Esimerkki:
    * Sinulla voi olla joukko.ncTiedostot, joissa jokaisella tiedostolla on kuukauden datan arvo yhdestä asemasta. Asema ottaa joka kerta lukemisen eri syvyyksissä.
    * Jokaisella tiedostolla on neljä ulottuvuutta, esimerkiksi aika. (koko =\\[Monet monet\\]) syvyys (koko =\\[Monet monet\\]) Lat (Koko = 1) ja Lon (Koko = 1) .
    * Jokaisella tiedostolla on 4 1D-muuttujaa, joilla on samat nimet kuin mitat ja sama nimi mitat, esimerkiksi aika. (Aika-aika) syvyys (syvyys) Lat (Lataa) Lon (Lounas) . Nämä 1D-muuttujat on sisällytettävä luetteloon&lt;dataVariable&gt; Tietokoneessa XML.
    * Jokaisella tiedostolla on yksi tai useampi 4D-muuttuja, esimerkiksi ilmalämpötila, veden lämpötila.
    * Jokaisella tiedostolla voi olla 5D-hahmomuuttuja, esimerkiksi mitoilla. (aika, syvä,lat,lon, nCharacters) .
    * Tiedoston nimi voi olla tiedoston nimi.
         
### EDDTableFromNcFiles{#eddtablefromnccffiles} 
[ **EDDTableFromNcFiles** ](#eddtablefromnccffiles)Aggregates data kerää tietojaNetCDF  (V3 tai v4)  .nc  (tai tai[.ncml](#ncml-files)) tiedostot, jotka käyttävät yhtä tiedostomuodoista, jotka on määritetty[CF Discrete Sampling Geometria (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)yleissopimuksia. Katso tämän luokan superluokka,[EDDTableFromfiilit](#eddtablefromfiles)Tietoa siitä, miten luokka toimii ja miten sitä käytetään.

Jos tiedostot käyttävät yhtä moniulotteista CF DSG-muuttujaa, käytä[EDDTableFromMultidimNcFiles Näytä tarkat tiedot](#eddtablefrommultidimncfiles)Sen sijaan.

CF DSG:n yleissopimuksissa määritellään kymmeniä tiedostomuotoja ja siinä on useita pieniä variaatioita. Tämä luokka käsittelee kaikkia variaatioita, joista olemme tietoisia, mutta olemme ehkä unohtaneet yhden. (tai enemmän) . Joten jos tämä luokka ei voi lukea CF DSG-tiedostoja, kiitos.[Lisätukea tavoittaa](/docs/intro#support).

Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Sen jälkeen voit muokata sitä hienosti.
 
### EDDTableFromNccsvfiilit{#eddtablefromnccsvfiles} 
[ **EDDTableFromNccsvfiilit** ](#eddtablefromnccsvfiles)Aggregoituja tietoja[NCCSV](/docs/user/nccsv-1.00)ASCII .csv-tiedostoja. Katso tämän luokan superluokka,[EDDTableFromfiilit](#eddtablefromfiles)Tietoa siitä, miten luokka toimii ja miten sitä käytetään.

* Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Sen jälkeen voit muokata sitä hienosti.
    
Ensimmäinen asia, jonka GenerateDatasetsXml tekee tällaiselle tietoaineistolle vastatessasi kysymyksiin, on tulostaa näytetiedoston ncdump-mainen rakenne. Joten jos syötät muutaman goofy-vastauksen ensimmäiselle kierrokselle GenerateDatasetsin kautta. Vähintään XML:ssä voit nähdä, josERDDAP™Voit lukea tiedoston ja katsoa, mitä mitat ja muuttujat ovat tiedostossa. Sitten voit antaa parempia vastauksia toiselle kierrokselle GenerateDatasetsXmlin kautta.
    
* Varoitus: milloinERDDAP™Lue NCCSV-tiedostoja, jos se löytää virheen tietyllä linjalla (esimerkiksi virheellinen määrä) Se viestittää varoitusviestin (Varoitus: Bad Line (s) Tietoja » Luettelo huonoista linjoista myöhemmillä riveillä) ja[log.txt-tiedosto](/docs/server-admin/additional-information#log)Jatka lukemista loput tiedostosta. Siksi sinun vastuullasi on katsoa säännöllisesti. (Kirjoita käsikirjoitus tehdäksesi niin) tuota viestiä logissa. txt, jotta voit korjata ongelmat tiedostoissa.ERDDAP™Näin käyttäjät voivat jatkaa kaikkien saatavilla olevien pätevien tietojen lukemista, vaikka joissakin tiedostojen riveissä on virheitä.
     
### EDDTableFromNOS{#eddtablefromnos} 
[ **EDDTableFromNOS** ](#eddtablefromnos)  (Vähennetty) Tietojen käsittely aNOAA [NOS](https://opendap.co-ops.nos.noaa.gov/axis/)lähde, joka käyttää[SOAP+XML](https://www.w3schools.com/xml/xml_soap.asp)pyyntöihin ja vastauksiin. Se on hyvin erityinenNOAANOS XML. Katso näyte EDDTableFromNOS-tietoaineisto tietoaineistossa2.xml.
 
### EddtableFromOBIS{#eddtablefromobis} 
[ **EddtableFromOBIS** ](#eddtablefromobis)Ocean Biogeographic Information Systemin tiedot (Obis) Palvelin (oli http://www.iobis.org  ) . On mahdollista, että ei ole enää aktiivisia palvelimia, jotka käyttävät tätä nykyistä ajantasaista OBIS-palvelinjärjestelmää.

* OBIS-palvelimet odottavat XML-pyyntöä ja palauttavat XML-vastauksen.
* Kaikki OBIS-palvelimet palvelevat samoja muuttujia. (oli http://iobis.org/tech/provider/questions ) Sinun ei tarvitse määrittää paljon, jotta voit luoda OBIS-tietoaineiston.ERDDAP.
* Sinun täytyy sisällyttää "creator\\_email”Arvostusta globaalissaaddAttributesKoska näitä tietoja käytetään lisenssissä. Sopiva sähköpostiosoite löytyy lukemalla XML-vastauksen lähdeURL-osoitteesta.
* Saatat tai et voi saada maailmanlaajuista tunnustusta.&lt;subsetVariables&gt; (#Subsetvariables) toimimaan tietyn OBIS-palvelimen kanssa. Jos yrität, kokeile vain yhtä muuttujaa. (Esimerkiksi ScientificName tai Genus) .
#### EddtableFromOBIS Skeleton XML{#eddtablefromobis-skeleton-xml} 
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

### EDDTableFromParquetFiles Näytä tarkat tiedot{#eddtablefromparquetfiles} 
[ **EDDTableFromParquetFiles Näytä tarkat tiedot** ](#eddtablefromparquetfiles)käsittelee tietoja[Osallistuminen](https://parquet.apache.org/). Katso tämän luokan superluokka,[EDDTableFromfiilit](#eddtablefromfiles)Tietoa siitä, miten luokka toimii ja miten sitä käytetään.

* Parquet on suunniteltu pakkaamaan erittäin tehokkaasti, joten se voi antaa sinulle pienempiä tiedostokokoja kuin muut muodot.
* Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Sen jälkeen voit muokata sitä hienosti.
* Varoitus: milloinERDDAP™Lue Parquet-tiedostot, jos löydät virheen tietyllä linjalla (esimerkiksi virheellinen määrä) Se viestittää varoitusviestin (Varoitus: Bad Line (s) Tietoja » Luettelo huonoista linjoista myöhemmillä riveillä) ja[log.txt-tiedosto](/docs/server-admin/additional-information#log)Jatka lukemista loput tiedostosta. Siksi sinun vastuullasi on katsoa säännöllisesti. (Kirjoita käsikirjoitus tehdäksesi niin) tuota viestiä logissa. txt, jotta voit korjata ongelmat tiedostoissa.ERDDAP™Näin käyttäjät voivat jatkaa kaikkien saatavilla olevien pätevien tietojen lukemista, vaikka joissakin tiedostojen riveissä on virheitä.
     
### EDDTableFromSOS {#eddtablefromsos} 
[ **EDDTableFromSOS** ](#eddtablefromsos)käsittelee sensorin tarkkailupalvelun tietoja (SWE/[SOS](https://www.ogc.org/standards/sos)) palvelin.

* Tämä aineistotyyppi kerää tietoja joukosta asemia, joita kaikki palvelevat yksiSOSpalvelin.
* Asemat palvelevat samoja muuttujia. (kunkin aseman lähteen ei tarvitse palvella kaikkia muuttujia.) .
*   SOSpalvelimet odottavat XML-pyyntöä ja palauttavat XML-vastauksen.
* Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Sen jälkeen voit muokata sitä hienosti. Tietokannan XML:ää ei ole helppo luodaSOSTietoja käsin. Tarvittavien tietojen löytämiseksi sinun on vierailtavasourceUrl+ ? Palvelu =SOS& Request =GetCapabilitiesSelaimessa; katso XML:ää; tee GetObservation-pyyntö käsin; ja katso XML-vastaus pyyntöön.
* Uusien tyyppien satunnainen lisäysSOSpalvelimille ja vanhoille palvelimille tehdyt muutokset vaikeuttavatERDDAP™tunnistaa palvelimen tyypin automaattisesti palvelimen vastauksista. Käyttäminen&lt;Servertype » (IO _NDBC, IOOS _NOSOOSTethystai kuka) Nyt se on vahvasti korjattu. Jos sinulla on ongelmia tämäntyyppisten tietojen kanssa, kokeile uudelleenjuoksemista GenerateDatasets. XML:ääSOSpalvelin. Sukupolvi Dataa XML antaa sinun kokeilla erilaisia&lt;SosServerType&gt;-vaihtoehdot, kunnes löydät oikean palvelimen.
*   SOSYleiskatsaus:
    * Vantaa (Sensor Web Enable) jaSOS  (Sensorin tarkkailupalvelu) ovat[OpenGIS®-standardit](https://www.ogc.org/standards). Tällä sivustolla on standardiasiakirjat.
    * TheOGCVerkkopalveluiden yleiset tiedot 1.1.0 (OGC06-121) GET- ja POST-kyselyiden rakentaminen (ks. kohta 7.2.3 ja kohta 9) .
    * Jos lähetät hakukoneen xml-pyynnönSOSPalvelin (sourceUrl+ ”palvelu”SOS& Request =GetCapabilities""") Saat xml-tuloksen, jossa on luettelo asemista ja havaituista Kiinteistöt, joihin heillä on tietoja.
    * Havaittu kiinteistö on virallinen URI viittaus omaisuuteen. Esimerkiksi urn:ogc:phenomenon:longitude:wgs84 tai https://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
 
    * Huomattu omaisuus ei ole muuttuja.
    * Yhdellä muuttujalla voi olla sama havainto omaisuus (Esimerkiksi sisätiloissa ja ulkona Kumpikin olisi voinut huomata omaisuus https://mmisw.org/ont/cf/parameter/air\\_temperature ) .
    * Jos lähetät hakuilmoituksen xml-pyynnönSOSpalvelin, saat xml-tuloksen, jossa on kuvauksia kenttänimistä vastauksessa, kenttäyksiköissä ja tiedoissa. Kentän nimet sisältävät pituus, leveys, syvyys (Ehkä ehkä ehkä ehkä ehkä) ja aikaa.
    * Jokainen jokainendataVariableEDDTableFromSOSon sisällytettävä "observedProperty"-ominaisuus, joka tunnistaa havaitun Operaatio-ominaisuuden, jota on pyydettävä palvelimelta tämän muuttujan saamiseksi. Usein useitadataVariableS listaa saman havaitun komposiitin.
    * Tietotekniikka jokaiselledataVariablePalvelin ei voi määrittää. Jos näin on, sinun on tarkasteltava XML-tietovastauksia palvelimelta ja määritettävä asianmukaiset tiedot.&lt;Tietotyyppi &gt; (#datatype) SisälläERDDAP™DatadataVariablemääritelmiä.
    *    (Kirjoittaessani tätä) jotkutSOSpalvelimet reagoivat havaintopyyntöihin useampaa kuin yhtä havaittua Kiinteistö vain palauttamalla tulokset ensimmäiselle havaitulle kiinteistölle. (Ei virheilmoitusta&#33;) Katso rakentajan parametripyyntö ObservedProperties erikseen.
* EDDTableFromSOSLisää automaattisesti
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
aineiston globaaleihin ominaisuuksiin, kun tietoaineisto luodaan.
*   SOSYleensä palvelimet ilmaisevat[Yksiköt](#units)kanssa[U](https://unitsofmeasure.org/ucum.html)järjestelmä. UseimmatERDDAP™palvelimet ilmaisevat yksiköitä[UDUNITS](https://www.unidata.ucar.edu/software/udunits/)järjestelmä. Jos haluat vaihtaa näiden kahden järjestelmän välillä, voit käyttää[ERDDAPVerkkopalvelu muuntaa UCUM-yksikötUDUNITS](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html).
#### EDDTableFromSOSSkeleton XML{#eddtablefromsos-skeleton-xml} 
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

### EDDTableFromThreddsFiles{#eddtablefromthreddsfiles} 
[ **EDDTableFromThreddsFiles** ](#eddtablefromthreddsfiles)  (Vähentynyt) aggregates datatiedostoja, joissa on useita muuttujia, joista jokaisella on yksi tai useampi jaettu ulottuvuus. (Esimerkiksi aika, korkeus (tai syvyys) Leveys, pituus) ja palvelee a[3DSOPeNDAPPalvelin](https://www.unidata.ucar.edu/software/tds/).

* Tämä tietotyyppi on **Vähennetty** . Uudempi ja yleisempi ratkaisu on käyttää[Cash Lähde: Url option for EDDTable Filejä](#cachefromurl)  (tai variantti) , joka tekee paikallisen kopion etätiedostoista ja palvelee tietoja paikallisista tiedostoista. The&lt;CacheFromUrl&gt;-vaihtoehtoa voidaan käyttää minkä tahansa tabulaaritiedoston kanssa mistä tahansa verkkopohjaisesta lähteestä, joka julkaisee hakemiston kaltaisen luettelon tiedostoista. **   
Jos et voi tehdä tätä työtä jostain syystä, sähköpostia Chris. Johannes osoitteessa Noaa.gov.
Jos valituksia ei ole ennen vuotta 2020, tietotyyppi voidaan poistaa. ** 
* Suosittelemme voimakkaasti käyttämään[GenerateDatasets XML-ohjelma](#generatedatasetsxml)tehdä karkea luonnosdatasets.xmlChunk tälle aineistolle. Sen jälkeen voit muokata sitä hienosti.
* Useimmissa tapauksissa jokaisella tiedostolla on useita arvoja vasemmalle. (Ensimmäinen ensimmäinen) esimerkiksi aika.
* Tiedostot usein (Mutta ei tarvitse) Yhtenä arvona muille ulottuvuuksille (Esimerkiksi korkeus (tai syvyys) Leveys, pituus) .
* Tiedostot voivat olla luonteenmuuttujat, joilla on ylimääräinen ulottuvuus. (Esimerkiksi nCharacters) .
* THREDDS-palvelimet voidaan tunnistaa URL-osoitteissa "/thredds/". Esimerkiksi,
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* 3DS-palvelimilla on luetteloita eri paikoissa. Tämä luokka vaatii, että URL-osoite sisältää "/thredds/catalog/". Voit yleensä löytää tämän muuttujan aloittamalla selaimesta juuriluettelossa ja napsauttamalla sitten haluamaasi alaluetteloon.
* Tämä luokka lukee luettelon.xml-tiedostoja, joita THREDDS tarjoaa luetteloilla.&lt;Kataloginen &gt; (Lisätiedot Catalog.xml sub-files) ja&lt;Dataa &gt; (Tiedostot) .
* The&lt;tiedostoDir&gt;-asetus on sivuutettu. Koska tämä luokka lataa ja tekee paikallisen kopion jokaisesta etätiedostosta,ERDDAP™Pakottaa tiedostot Likainen olla *isovanhemmat* Copy/ *datasetID* /
* For For&lt;sourceUrl&gt; käytä luettelo.xml-tiedoston URL-osoitetta THREDDS-palvelimen tietoaineistoon, esimerkiksi: tätä URL-osoitetta varten, jota voidaan käyttää selaimessa,
     https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[2020-10-21 Tämä palvelin ei ole enää luotettava.\\],
käyttää&lt;sourceUrl&gt; https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml &lt;//sourceUrl&gt;
     (Laita se yhteen linjaan) .
* Koska tämä luokka lataa aina ja tekee paikallisen kopion kunkin etätiedoston, sinun ei pitäisi koskaan kääriä tätä tietoaineistoa.[EdDTableCopy](#eddtablecopy).
* Tämä aineistotyyppi tukee OPTIONAL-, harvoin käytettyä, erityistä tunnistetta,&lt;SpecialMode » *Mode* &lt;/specialMode&gt;, jota voidaan käyttää määrittämään, että erityisiä, kovakoodisia sääntöjä on käytettävä määrittämään, mitkä tiedostot on ladattava palvelimelta. Tällä hetkellä ainoa voimassa oleva *Mode* SAMOS, jota käytetään tietoaineistojen kanssa https://tds.coaps.fsu.edu/thredds/catalog/samos Lataa tiedostot vain viimeisellä versionumerolla.
* Katso tämän luokan superluokka,[EDDTableFromfiilit](#eddtablefromfiles)Tietoa siitä, miten luokka toimii ja miten sitä käytetään.
* Katso 1D, 2D, 3D ja 4D-esimerkit[EDDTableFromNcFiles](#eddtablefromncfiles).
     
### EDDTableFromWFSTiedostot{#eddtablefromwfsfiles} 
[ **EDDTableFromWFSTiedostot** ](#eddtablefromwfsfiles)  (Vähennetty) paikallinen kopio kaikista tiedoistaArcGISMapServerWFSpalvelin, jotta tiedot voidaan palauttaa nopeastiERDDAP™käyttäjiä.

* Sinun on määriteltävä erityisesti muotoiltusourceUrlMaailmanlaajuinen ominaisuus kertoaERDDAP™Kuinka pyytää palvelimelta ominaisia tietoja. Käytä tätä esimerkkiä mallina:
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (Laita kaikki yhteen linjaan) 
* Sinun täytyy lisätä erityinen maailmanlaajuinen ominaisuus kertoaERDDAP™Miten tunnistaa ladattavien tietojen nimet. Tämä toimii todennäköisesti kaikkiin EDDTableFromWFSTiedostoaineistot:
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* Koska tämä luokka lataa aina ja tekee paikallisen kopion kunkin etätiedoston, sinun ei pitäisi koskaan kääriä tätä tietoaineistoa.[EdDTableCopy](#eddtablecopy).
* Katso tämän luokan superluokka,[EDDTableFromfiilit](#eddtablefromfiles)Lisätietoja siitä, miten luokka toimii ja miten sitä käytetään.
     
### EDDTableAggregateRows{#eddtableaggregaterows} 
[ **EDDTableAggregateRows** ](#eddtableaggregaterows)Voit tehdä EDDTable-tietoaineiston ryhmästä "lapsia" EDDTable-tietoaineistoja.

* Tässä joitakin käyttökohteita EDDTableAggregateRows:
    * Voit tehdä EDDTableAggregateRows-tietokannan kahdesta eri tiedostosta tai tietolähteestä, esimerkiksi tietoaineiston, jossa on tietoja viime kuun loppuun asti..ncCF-tiedostot ja tietoaineisto, jossa on tietoja nykyisestä kuukaudesta, joka on tallennettu relaatiotietokantaan.
    * Voit tehdä EDDTableAggregateRows-tietoaineiston, jotta voit käsitellä lähdetiedostojen muutosta. (esimerkiksi aikamuoto muuttui tai muuttujan nimi vaihtui tai tiedot Tyyppi/scale\\_factor//add\\_offsetMuut muutokset) . Tässä tapauksessa yksi lapsi saa tietoja tiedostoista, jotka on tehty ennen muutosta ja toinen lapsi saa tietoja tiedostoista, jotka on tehty muutoksen jälkeen. EDDTableAggregateRows on vaihtoehto[NCML](#ncml-files)tai tai[NCO](#netcdf-operators-nco). Ellei tiedostonimissä ole erottavaa ominaisuutta (jotta voit käyttää&lt;tiedosto NameRegex&gt; määrittääksesi, mikä tiedosto kuuluu mille lapselle aineistolle, sinun on todennäköisesti tallennettava tiedostot eri hakemistoihin.
    * Voit tehdä EDDTableAggregateRows-tietoaineiston, jolla on yhden tai useamman samankaltaisen mutta erilaisen tietoaineiston jaettu alijoukko, esimerkiksi tietoaineisto, joka tekee Profile-aineiston Profile-tietoaineiston yhdistelmästä, TimeSeriesProfile-tietoaineistosta ja TrajectoryProfile-tietoaineistosta. (joilla on erilaisia muunnelmia ja joitain yhteisiä muuttujia, jolloin sinun on tehtävä erityisiä variaatioita lasten tietoaineistoille, joissa on vain yhteiset muuttujat.) .
    * Sinulla voi olla useita erillisiä tietoaineistoja, joista jokaisella on samanlainen data, mutta eri asemalta. Voit jättää nämä tietoaineistot koskemattomiksi, mutta myös luoda EDDTableAggregateRows-tietoaineiston, jolla on tietoja kaikista asemista - jokainen lapsitietoaineisto voi olla yksinkertainen.[EdDTableFromDap](#eddfromerddap)Tämä viittaa johonkin olemassa olevaan tietoaineistoon. Jos teet tämän, anna jokaiselle EDDTableFromErddapin tietoaineistolle erilainen.datasetIDkuin alkuperäiset erilliset tiedot, esim. liittämällä "lapsi" alkuperäiseendatasetID.
* Jokainen lapsi&lt;Tiedot &gt; on määritetty olevan täydellinen tietoaineisto, ikään kuin se olisi erillinen tietoaineisto. Jokaisella on oltava sama[dataVariables](#datavariable)samassa järjestyksessä, samassa[destinationNames](#destinationname),[Datatiedot Tyypit](#datatype),[missing\\_values](#missing_value),[Täydelliset arvot](#missing_value)ja[Yksiköt](#units). EDDTableAggregateRows-tietoaineiston jokaisen muuttujan metatiedot tulevat muuttujista ensimmäisessä lapsitietoaineistossa, mutta EDDTableAggregateRows päivittää EDDTableAggregateRows-tietokannan.[actual\\_range](#actual_range)Metadata on kaikkien lasten todellinen ulottuvuus.
* Suositus: Hanki kaikki lasten tietoaineistot, jotka toimivat itsenäisenä tietoaineistona. Yritä sitten tehdä EDDTableAggregateRows-tietoaineisto leikkaamalla ja liittämällädatasets.xmljokaiselle uudelle EDDTableAggregatelle Rows-aineisto.
* Dataset Default Sort Order (käytetty) Lasten tietoaineistojen järjestys määrittää tulosten kokonaisoletusjärjestyksen. Tietenkin käyttäjät voivat pyytää erilaista tilausta tietyille tuloksille liittämällä jaorderBy (""" *Erillinen luettelo muuttujista* """) kyselyn lopussa.
* "lähde"[Maailmanlaajuinen Attribuutti](#global-attributes)EDDTableAggregateRows on yhdistetty GlobalAttributes ensimmäisestä lapsitietokannasta. EddtableAggregate Rows voi olla maailmanlaajuinen&lt;addAttributes&gt; tarjota lisää globaaleja ominaisuuksia tai ylittää lähde maailmanlaajuisia ominaisuuksia.
#### EddtableAggregate Skeleton XML{#eddtableaggregaterows-skeleton-xml} 
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

### EdDTableCopy{#eddtablecopy} 
[ **EdDTableCopy** ](#eddtablecopy)voi tehdä paikallisen kopion monista EDDTable-tietoaineistoista ja palauttaa tiedot nopeasti paikallisesta kopiosta.

* EdDTableCopy (Verkkotiedot,[EDDGridKopio](#eddgridcopy)) Helppo käyttää ja erittäin tehokas **Ratkaisu joihinkin suurimpiin ongelmiin etätietolähteistä saatujen tietojen toimittamisessa:** 
    * Tietojen saaminen etätietolähteestä voi olla hidasta.
        * Ne voivat olla hitaita, koska ne ovat hitaita. (Esimerkiksi tehoton palvelintyyppi) ,
        * koska niitä on liikaa,
        * tai koska palvelin tai etäpalvelin on kaistanleveys rajoitettu.
    * Etäaineisto on joskus saatavilla (Jälleen, monesta syystä) .
    * Luottamus yhteen tietolähteeseen ei mittaa hyvin (Esimerkiksi, kun monet käyttäjät ja monetERDDAPkäyttää sitä) .
         
* Miten se toimii - EDDTableCopy ratkaisee nämä ongelmat automaattisesti tekemällä ja säilyttämällä paikallisen kopion datasta ja palvelemalla tietoja paikallisesta kopiosta.ERDDAP™Tietoja voi palvella hyvin, hyvin nopeasti. Paikallisen kopion tekeminen ja käyttäminen lievittää taakkaa etäpalvelimella. Paikallinen kopio on alkuperäisen varmuuskopio, joka on hyödyllinen, jos jotain tapahtuu alkuperäiselle.
    
Ei ole mitään uutta tehdä paikallinen kopio tietoaineistosta. Mikä on uusi asia, että tämä luokka tekee\\*Help helppoa\\*luoda ja\\*ylläpitää\\*Paikallinen kopio datasta\\*Erilaisia\\*etätietolähteiden ja\\*Lisää metadataa\\*kopioimalla tietoja.
    
#### EDDTableCopy vs&lt;CacheFromUrl &gt;{#eddtablecopy-vs-cachefromurl} 
&lt;CacheFromUrl on vaihtoehto EDDTableCopylle. Ne toimivat eri tavalla.

* EdDTable Kopioi toimii pyytämällä tietoja etäpalvelusta ja tallentamalla ne paikallisiin tiedostoihin. EDDTableCopy on hyödyllinen joissakin tapauksissa, joissa tiedot ovat saatavilla etäpalvelun kautta.
* [...]&lt;CacheFromUrl » (#cachefromurl) Lataa olemassa olevat tiedostot, jotka on lueteltu etäsivustolla.&lt;CacheFromUrl on helpompi käyttää ja luotettavampi, koska se voi helposti kertoa, milloin on uusi etätiedosto tai kun etätiedosto on muuttunut ja näin on ladattava.

Jos on tilanteita, joissa EDDTableCopy tai&lt;CacheFromUrl &gt; voidaan käyttää&lt;CacheFromUrl, koska se on helpompaa ja luotettavampaa.
     
#### &lt;OteDestinaation nimiä ja{#extractdestinationnames} 
EdDTable Kopio tekee paikallisen kopion tiedoista pyytämällä etätietoaineiston keräämiä tietoja. EdDTable Kopio määrittää, mitä pyydetään pyytämällä &distinct () Arvot sille&lt;Uutiset &gt; (määritelläändatasets.xmlKatso alta) , jotka ovat etätietokannan muuttujien tilaeristettyjä kohdenimiä. Esimerkiksi,
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
drifter=tig17,profile=1017, drifter=tig17,profile=1095, ... drifter=une12,profile=1223, drifter=une12,profile=1251

tilanteessa, jossa yksi sarake (Esimerkiksi profiili) voi olla kaikki, mitä tarvitaan yksilöimään tietoryhmä, jos esimerkiksi profiileja on hyvin paljon, voi olla hyödyllistä määrittää myös lisäote. Kohtalo Nimen nimi (Esimerkiksi drifter) joka jakaa profiileja. Tämä johtaa vähemmän datatiedostoja tietyssä hakemistossa, mikä voi johtaa nopeampaan pääsyyn.
    
#### Paikalliset tiedostot{#local-files} 
Jokainen tietokanta tallennetaan erikseenNetCDFtiedoston aliohjelmassa *isovanhemmat* Copy/ *datasetID* // (Kuten on määritelty[Asennus.xml](/docs/server-admin/deploy-install#setupxml)) . Kaikille paitsi viimeiselle uutteelle on olemassa yksi subdirectory level. Esimerkiksi tig17+1017 -tiedot tallennetaan
     *isovanhemmat* Copy/sampleDataset/tig17/1017.nc.
Esimerkiksi Une12+1251-tiedot tallennetaan
     *isovanhemmat* TeampleDataset/une12/1251.nc.
Data-arvoista luotuja hakemistoja ja tiedostonimiä muokataan tiedostonimi-turvallisiksi. (Tilat korvataan esimerkiksi "x20") Tämä ei vaikuta todellisiin tietoihin.
     
#### Uusia tietoja{#new-data} 
Joka kerta EDD Kopio on ladattu uudelleen, se tarkistaa etätietoaineiston nähdäkseen, mitä erillisiä paloja on saatavilla. Jos tiedostoa ei ole jo olemassa, pyyntö saada kiinni on lisätty jonoon.ERDDAPTehtäväThread käsittelee kaikki johdetut pyynnöt tietojen keräämiseksi yksi kerrallaan. Voit nähdä tilastot Tehtävän toiminnasta[Tilasivut](/docs/server-admin/additional-information#status-page)ja sisällä[Päivittäinen raportti](/docs/server-admin/additional-information#daily-report). (Kyllä,ERDDAP™Tämä voisi määrittää useita tehtäviä tähän prosessiin, mutta se käyttäisi paljon etätietolähteen kaistanleveyttä, muistia ja CPU-aikaa ja paljon paikallista.ERDDAPKaistanleveys, muisti ja CPU-aika, joista kumpikaan ei ole hyvä idea.) 
    
HUOMAUTUS: Ensimmäinen kerta, kun EDDTableCopy on ladattu (Jos kaikki menee hyvin) Tehtävän jonoon lisätään paljon pyyntöjä, mutta paikallisia tietotiedostoja ei ole luotu. Joten rakentaja epäonnistuu, mutta tehtäväThread jatkaa työskentelyä ja luo paikallisia tiedostoja. Jos kaikki menee hyvin, tehtäväThread tekee paikallisia tietotiedostoja ja seuraava yritys ladata tietoaineistoa uudelleen. (~15 minuuttia) Se onnistuu, mutta alun perin hyvin rajoitetusti.
    
HUOMAUTUS: Kun aineistossa on joitakin tietoja ja se näkyyERDDAPJos etätietoaineisto on tilapäisesti tai pysyvästi saatavilla, paikallinen tietoaineisto toimii edelleen.
    
Varoitus: Jos etätietoaineisto on suuri ja/tai etäpalvelin on hidas (Tämä on ongelma, eikö?) Kestää kauan tehdä täydellinen paikallinen kopio. Joissakin tapauksissa tarvittava aika ei ole hyväksyttävää. Esimerkiksi yhden TB-datan siirtäminen T1-linjan yli (0,15 GB/s) kestää vähintään 60 päivää optimaalisissa olosuhteissa. Lisäksi se käyttää paljon kaistanleveyttä, muistia ja CPU-aikaa etä- ja paikallisissa tietokoneissa. Ratkaisu on lähettää kiintolevy etätietojoukon ylläpitäjälle, jotta s/ hän voi tehdä kopion tietoaineistosta ja lähettää kiintolevyn takaisin sinulle. Käytä näitä tietoja lähtökohtana ja EDDTableCopy lisää siihen tietoja. (Näin Amazonin EC2-pilvipalvelut hoitivat ongelman, vaikka järjestelmässä on paljon kaistanleveyttä.) 
    
VAROITUS: Jos tietty arvojen yhdistelmä katoaa etätietoaineistosta, EDDTableCopy ei poista paikallista kopioitua tiedostoa. Jos haluat, voit poistaa sen itse.
    
#### TableCopy&lt;SourceData &gt;{#tablecopy-checksourcedata} 
Thedatasets.xmlTällä aineistolla voi olla valinnainen tunniste
```
    <checkSourceData>true</checkSourceData>  
```
Oletusarvo on totta. Jos / kun asetat sen vääräksi, tietoaineisto ei koskaan tarkista lähdeaineistoa nähdäksesi, onko lisätietoja saatavilla.
     
#### Suositeltu käyttö{#recommended-use} 
1. Luoda&lt;Tietoja &gt; Sisääntulo (EDDTableCopy, ei EDDTableCopy) etätietolähteestä. **Toimi oikein, mukaan lukien kaikki halutut metatiedot.** 
2. Jos se on liian hidas, lisää XML-koodi kääriäksesi sen EDDTableCopy-tietokantaan.
    * Käytä erilaistadatasetID  (Ehkä muuttamalladatasetIDVanhastadatasetIDhieman hieman) .
    * Kopioikaa&lt;Saatavuus &gt;,&lt;ladata kaikki minuutit ja&lt;onChange&gt; etäisen EDDTablen XML:stä EDDTableCopyn XML:ään. (EDDTableCopy-aineen arvot; niiden arvot sisäiseen tietoaineistoon tulevat merkityksettömiksi.) 
    * Luoda&lt;ExtDestinationNams &gt; Tag (ylhäällä) .
    *   &lt;Tilaus ExtractBy on OPTIONAL-tila, joka on erotettu kohdemuuttujan nimien luettelosta etätietoaineistossa. Kun jokainen datan salaus ladataan etäpalvelimesta, nämä muuttujat lajittelevat naarmuuntumisen. (ensimmäinen muuttuja, sitten toinen muuttuja, jos ensimmäinen muuttuja on sidottu,) . Joissakin tapauksissa,ERDDAP™Tiedot voidaan poistaa nopeammin paikallisista tietotiedostoista, jos luettelon ensimmäinen muuttuja on numeerinen muuttuja. ("time"Numeerinen muuttuja) . Mutta valitse nämä muuttujat tavalla, joka sopii aineistoon.
3.  ERDDAP™tekee ja ylläpitää paikallista kopiota tiedoista.
         
* VAROITUS: EDDTableCopy olettaa, että kunkin roskakorin data-arvot eivät koskaan muutu. Jos / kun he tekevät, sinun on poistettava manuaalisesti roskatiedostot. *isovanhemmat* Copy/ *datasetID* joka muuttui ja[Lippu](/docs/server-admin/additional-information#flag)tiedot, jotka on ladattava niin, että poistetut pyykit korvataan. Jos sinulla on sähköpostitilaus tietoaineistoon, saat kaksi sähköpostia: yksi, kun tietoaineisto ensin lataa ja alkaa kopioida tietoja, ja toinen, kun aineisto latautuu uudelleen. (automaattisesti) havaitsee uudet paikalliset datatiedostot.
     
* Metatietojen muutos ----- Jos haluat muuttaa mitä tahansaaddAttributestai muuttaa lähdeaineistoon liittyvien muuttujien järjestystä:
    1. MuuttaaaddAttributesLähteen tiedot sisältädatasets.xmltarpeen mukaan.
    2. Poista yksi kopioitu tiedosto.
    3. Aseta A[Lippu](/docs/server-admin/additional-information#flag)tietojen lataaminen välittömästi. Jos käytät lippua ja sinulla on sähköpostitilaus tietoaineistoon, saat kaksi sähköpostia: kun tietoaineisto ensin latautuu ja alkaa kopioida tietoja ja toinen, kun tietoaineisto latautuu uudelleen. (automaattisesti) havaitsee uudet paikalliset datatiedostot.
    4. Poistettu tiedosto uusitaan uudella metadatalla. Jos lähdeaineistoa ei ole koskaan saatavilla, EDDTableCopy-tiedot saavat metatiedot uusiutuvasta tiedostosta, koska se on nuorin tiedosto.
         
*   [EDDGridKopio](#eddgridcopy)EDDTableCopy on hyvin samankaltainen kuin EDDTableCopy, mutta toimii verkottuneiden tietoaineistojen kanssa.
#### EDDTableCopy XML{#eddtablecopy-skeleton-xml} 
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

## Yksityiskohdat{#details-1} 

Tässä on yksityiskohtaiset kuvaukset yleisistä tunnisteista ja ominaisuuksista.

### &lt;AgularDegreeUnits &gt;{#angulardegreeunits} 
* [...] ** &lt;AgularDegreeUnits ** ) (#angulardegreeunits) harvoin käytetty OPTIONAL-tunnisteet&lt;erdapdatasets &gt; Tag indatasets.xmljoka sisältää erillisen luettelon yksiköistä, jotkaERDDAP™Agular astetta pitäisi hoitaa. Jos muuttujalla on jokin näistä yksiköistä,tabledap&gt;orderByMeanSuodatin laskee keskiarvon erityisellä tavalla ja raportoi sitten keskiarvon arvoksi -180 - 180. NäytäERDDAPEDStatic.java-lähdekooditiedosto nykyiselle oletuslistalle. Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lukeminendatasets.xmlmukaan lukien vastauksena tietoaineistoon[Lippu](/docs/server-admin/additional-information#flag).
### &lt;AgularDegreeTrueUnits & Gt{#angulardegreetrueunits} 
* [...] ** &lt;Agular DegreeTrueUnits ** ) (#angulardegreetrueunits) harvoin käytetty OPTIONAL-tunnisteet&lt;erdapdatasets &gt; Tag indatasets.xmljoka sisältää erillisen luettelon yksiköistä, jotkaERDDAP™Pitäisi hoitaa kulmakiviä todellisina yksiköinä. Jos muuttujalla on jokin näistä yksiköistä,tabledap&gt;orderByMeanSuodatin laskee keskiarvon erityisellä tavalla ja raportoi sitten keskiarvon arvoksi 0-360. NäytäERDDAPEDStatic.java-lähdetiedosto nykyiselle oletuslistalle. Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lukeminendatasets.xmlmukaan lukien vastauksena tietoaineistoon[Lippu](/docs/server-admin/additional-information#flag).
     
### &lt;StandardNames &gt;{#commonstandardnames} 
* [...] ** &lt;StandardNams » ** ) (#Commonstandardnames) harvoin käytetty OPTIONAL-tunnisteet&lt;erdapdatasets &gt; Tag indatasets.xmlmäärittää yhteisen yhteisen luettelon[CF-standardit](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). esim.
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
Tätä luetteloa käytetään DataProviderForm3.html: ssä käyttäjien mukavuuden vuoksi.
Jos haluat antaa nämä tiedotdatasets.xmlAloita kopioimalla nykyinen oletusluettelo&lt;DEFAUL | CommonStandardNames » SisälläERDDAP&gt;
\\[Tom\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/viestejä.xml-tiedosto.
     
### &lt;CacheMinutes &gt{#cacheminutes} 
* [...] ** &lt;Cacheminutes » ** ) (#cacheminutes) harvoin käytetty OPTIONAL-tunnisteet&lt;erdapdatasets &gt; Tag indatasets.xmlmäärittää ikä (Minuuteissa) missä välimuistin tiedostot on poistettava (Oletusarvo = 60) . esim.
```
    <cacheMinutes>60</cacheMinutes>  
```
Yleisesti ottaen vain kuvatiedostoja (Koska samoja kuvia toistuvasti pyydetään) ja.nctiedostoja (koska ne on luotava kokonaan ennen lähettämistä käyttäjälle) ovat kiinni. Vaikka pyynnön pitäisi aina palauttaa sama vastaus, se ei pidä paikkaansa. Esimerkiksi atabledappyyntö, joka sisältää ajan *jotkut Aika-aika* Muuttuu, kun aineistoon saapuu uusia tietoja. pyyntö, joka sisältää\\[Viimeinen viimeinen\\]Aikamitta muuttuu, kun aineistoon saapuu uusia tietoja. Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lukeminendatasets.xmlmukaan lukien vastauksena tietoaineistoon[Lippu](/docs/server-admin/additional-information#flag). Ennen ennenERDDAP™V2.00, tämä on määritetty setup.xml, joka on edelleen sallittua mutta lannistunut.

### &lt;CacheClearMinutes &gt{#cacheclearminutes} 
* [...] ** &lt;CacheClearMinutes » ** ) (#kacheclearminutes) harvoin käytetty OPTIONAL-tunnisteet&lt;erdapdatasets &gt; Tag indatasets.xmlmäärittää taajuus tarkistettujen tiedostojen ja poistaa vanhoja (Minuuteissa)   (Oletusarvo = 15) . esim.
```
    <cacheClearMinutes>15</cacheClearMinutes>  
```
Kun palvelin päättää pyynnön käsittelyn, se tarkistaa, kuinka kauan viimeisin välimuisti oli. Jos se oli jo kauan sitten, se jonottaa tehtävän TskThread puhdistaa välimuisti. Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lukeminendatasets.xmlmukaan lukien vastauksena tietoaineistoon[Lippu](/docs/server-admin/additional-information#flag). Tämä voidaan määritellä asennus.xml, mutta se on lannistunut.
     
### &lt;InterpolateRequestCSVExample &gt;{#convertinterpolaterequestcsvexample} 
* [...] ** &lt;InterpolateRequestCSVExample&gt; ** ) (#convertinterpolaterequestcsvexample Näytä tarkat tiedot) OPTIONAL-tunnisteet sisällä&lt;erdapdatasets &gt; Tag indatasets.xml \\[AloitetaanERDDAP™V2.10\\]joka sisältää esimerkin, joka esitetään Interpolate-muunninohjelman verkkosivuilla. Oletusarvo on: jplMURSST41/analyysisstBilineaari/4.
### &lt;InterpolateDatasetIDVariableList&gt;{#convertinterpolatedatasetidvariablelist} 
* [...] ** &lt;InterpolateDatasetIDVariableList&gt; ** ) (#convertinterpolatedatasetidvariablelist) OPTIONAL-tunnisteet sisällä&lt;erdapdatasets &gt; Tag indatasets.xml \\[AloitetaanERDDAP™V2.10\\]joka sisältää CSV-listandatasetID/muuttuja Nimeä esimerkkejä, joita käytetään Interpolate-muuntimen verkkosivun ehdotuksina. Oletusarvo on: jplMURSST41/analyysisst.
### &lt;ConvertToPublicSourceUrl&gt;{#converttopublicsourceurl} 
* [...] ** &lt;ContublicSourceUrl &gt; ** ) (#converttopublicsourceurl) OPTIONAL-tunnisteet sisällä&lt;erdapdatasets &gt; Tag indatasets.xmljoka sisältää "sopivan" ja "to"-ominaisuuden, joka määrittää, miten käännetään vastaava paikallissourceUrl  (Yleensä IP-numero) yleisöllesourceUrl  (Domainin nimi) . . . . . . . . . . . . . . . . . . . . . . .\\[Jotain\\]//\\[Jotain\\]&gt; &gt; Niitä voi olla 0 tai enemmän. Lisätietoja: [katso]&lt;sourceUrl&gt; (#lähde) . Esimerkiksi,
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
Tämä aiheuttaa paikallisensourceUrl  (kuten https://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day )   
yleisöllesourceUrl  ( https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day ) .
Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lukeminendatasets.xmlmukaan lukien vastauksena tietoaineistoon[Lippu](/docs/server-admin/additional-information#flag).

turvallisuussyistä ja tilausjärjestelmään liittyvistä syistä, **Älä käytä tätä puhetta&#33;**   
Käytä aina yleistä verkkotunnusta&lt;sourceUrl&gt; tagi ja käytä[/etc / isäntäpöytä](https://linux.die.net/man/5/hosts)palvelimellasi muuntaa paikallisia verkkotunnuksia IP-numeroiksi käyttämättä DNS-palvelinta. Voit testata, jos verkkotunnus muunnetaan asianmukaisesti IP-numeroksi käyttämällä:
ping *Domain.nimeä*   
     
### tietoja: kuva/png;base64{#dataimagepngbase64} 
* Kun käyttäjä pyytää.htmlTableVastausERDDAP™jos String-solun tiedot sisältävät tietoja: kuva/png;base64, jota seuraa perus64 koodattu .png-kuva,ERDDAP™Näytä ikoni (Käyttäjä voi nähdä kuvan, jos sen yli) ja painikkeet tekstin tai kuvan tallentamiseksi levylle. Tämä ominaisuus on lisättyERDDAP™19 Marco Alba.
### drawLandMask {#drawlandmask} 
*   [ **drawLandMask** ](#drawlandmask)määrittää oletusasetuksen, joka valvoo, milloin ja miten maisema pitäisi vetää, kunERDDAP™piirtää kartan. Se voidaan määritellä kolmessa eri paikassa.datasets.xml  (Alhaisimmasta korkeimpaan prioriteettiin) :
    
    1. JosdrawLandMaskon määritelty sisällä&lt;erdapdatasets &gt; (ei ole kytketty mihinkään tiettyyn tietoaineistoon) Se määrittää oletusarvondrawLandMaskKaikki muuttujat kaikissa aineistoissa. Esimerkiksi,
    ```
        <drawLandMask>under</drawLandMask>  
    ```
Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAPLukeminendatasets.xml.
Jos et ole paikalla, oletusarvo on alle.
         
    2. JosdrawLandMaskmääritellään tietyn tietoaineiston globaaliksi ominaisuudeksi ja määritellään sen oletusarvo.drawLandMaskkaikkien näiden aineistojen muuttujien osalta, jotka ylittävät alemman prioriteettiasetuksen. Esimerkiksi,
    ```
        <att name="drawLandMask">under</att>  
    ```
Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lataa tämä data.
         
    3. JosdrawLandMaskmääritellään muuttujan ominaisuutena tietyssä tietoaineistossa, ja se määrittää sen oletusarvon.drawLandMaskkyseisessä aineistossa olevasta muuttujasta, joka ylittää alemman prioriteettiasetuksen. Esimerkiksi,
    ```
        <att name="drawLandMask">under</att>  
    ```
Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lataa tämä data.
    
Käyttäjä voi ylittää oletusarvon (Missä tahansa se on määritelty) valitsemalla arvon "Draw land mask" laskeutumisluettelosta tietoaineiston Make A Graph -sivulla tai sisällyttämällä &.land= *Arvon arvo* URL-osoitteessa, jossa pyydetään karttaaERDDAP.
    
Jokaisessa tilanteessa on neljä mahdollista arvoa:
    
    * "Alla" piirtää maiseman ennen kuin se kerää tietoja kartasta.
Verkossa oleville aineistoille maa on vakiovaloinen harmaa väri.
Tabulaarisissa aineistoissa "alla" näkyy topografiatietoja maasta ja valtameristä.
    * "Yli" - Verkossa oleville aineistoille "yli" piirtää maskin, kun se kerää karttoja niin, että se naamioi kaikki maanpinnan tiedot. Tabulaarisissa aineistoissa "yli" osoittaa mereen kohdistuvaa bathymetriaa ja jatkuvaa valoharmaata, jossa on maata, molemmat datan alla.
    * "outline" piirtää vain maamaskin, poliittisten rajojen, järvien ja jokien ääriviivat.
    * "Off" ei piirrä mitään.
### &lt;SähköpostiDiagnosticsToErdData &gt{#emaildiagnosticstoerddata} 
* [...] ** &lt;SähköpostiDiagnosticsToErdData ** ) (#email Diagnosticstoerddata) harvoin käytetty OPTIONAL-tunnisteet&lt;erdapdatasets &gt; Tag indatasets.xml. Tagin arvo voi olla totta (Oletusarvo) tai vääriä. Jos totta,ERDDAP™Sähköpostia pino jälki Chris. Johanneksessa. Govv (TheERDDAP™Kehitysryhmä) . Tämä on turvallista ja turvallista, koska ei ole luottamuksellista tietoa. (Esim. pyyntö) sisältyy sähköpostiin. Tämä mahdollistaa mahdollisten epäselvien, täysin odottamattomien vikojen, jotka johtavat NullPointerE-poikkeuksiin. Käyttäjä näkee poikkeukset, muttaERDDAP™Kehitysryhmä ei (Emme tiedä, että on olemassa ongelma, joka on korjattava.) .
     
### &lt;grafiikka BackgroundColor &gt;{#graphbackgroundcolor} 
* [...] ** &lt;grafiikka: BackgroundColor ** ) (#graphbackgroundcolor) harvoin käytetty OPTIONAL-tunnisteet&lt;erdapdatasets &gt; Tag indatasets.xmlmäärittää oletus taustaväri grafiikoissa. Tämä koskee lähes kaikkia kaavioita. Muutamia tilanteita ei ole havaittu. Väri määritellään 8-numeroiseksi heksadesimaaliarvoksi muodossa 0xAARRGB, jossa AA, RR, GG ja BB ovat läpinäkymättömät, punaiset, vihreät ja siniset komponentit. "0x" on arkaluonteinen, mutta heksadesimaaliluvut eivät ole herkkiä. Esimerkiksi täysin läpinäkyvä (ff) Vihreä sininen väri punaisella = 22, vihreä = 88, sininen =ee olisi 0xff2288ee. Valkoinen on 0xffffff. Oletusarvo on Opaque Light Blue (0xcccc) , jolla on etu olla erilainen kuin valkoinen, mikä on tärkeä väri monissa paletteissa, joita käytetään tietojen piirtämiseen. Esimerkiksi,
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lukeminendatasets.xmlmukaan lukien vastauksena tietoaineistoon[Lippu](/docs/server-admin/additional-information#flag).
### &lt;ipAddressMaxRequests &gt;{#ipaddressmaxrequests} 
* [...] ** &lt;ipAddressMaxRequests ** ) (#ipaddressmaxrequests) Harvoin käytetty valinnainen tagi (Ensin tuettuERDDAP™2.12.) Sisällä&lt;erdapdatasets &gt; Tag indatasets.xmlTämä on osa järjestelmää, joka rajoittaa liian aggressiivisten laillisten käyttäjien ja haitallisten käyttäjien kykyä tehdä suuri määrä samanaikaisia pyyntöjä, jotka heikentävät järjestelmän suorituskykyä muille käyttäjille. ipAddress MaxRequests määrittää samanaikaisten pyyntöjen enimmäismäärän, joka hyväksytään mistä tahansa IP-osoitteesta. HTTP 429 -virhe: Liikaa pyyntöjä. Pienet, staattiset tiedostot erdap/download/ ja erdap/images/ eivät ole vapautettuja tästä määrästä. Oletusarvo on 15. Suurin sallittu on 1000, mikä on hullua, älä tee sitä&#33;ERDDAP™Älä ota numeroa alle 6, koska monet lailliset käyttäjät (Verkkoselaimet jaWMSAsiakkaat) 6 pyyntöä kerrallaan. TheERDDAP™Päivittäinen raportti ja vastaavat tiedot, jotka on kirjoitettu log.txt-tiedostoon kunkin Major Dataset Reloadin kanssa, sisältävät nyt näiden IP-osoitteiden pyynnöt otsikolla ”Requester’s IP Address”. (Liikaa pyyntöjä) ".
Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lukeminendatasets.xmlmukaan lukien vastauksena tietoaineistoon[Lippu](/docs/server-admin/additional-information#flag).
    
"Major LoadDatasets Time Series" -osiossa on "tooMany"-sarake, jossa luetellaan pyyntöjen määrä, joka ylitti käyttäjän ipAdressMaxRequests-asetuksen ja näin on "liian monta pyyntöä" -virhe. Tämän avulla voit helposti nähdä, milloin on aktiivisia laillisia käyttäjiä ja haitallisia käyttäjiä, jotta voit (Vaihtoehtoisesti) Katso log.txt-tiedosto ja päätä, haluatko mustalle listalle näitä käyttäjiä.
    
Ei ole mitään erityistä vikaa, kun asetat tämän suurempaan määrään. Se on sinusta kiinni. Mutta sen avulla ihmiset voivat luoda järjestelmiä, jotka käyttävät paljon lankoja projektien tekemiseen, eivätkä anna heille mitään palautetta siitä, että se, mitä he tekevät, ei saa heille mitään hyötyä.
### &lt;ipAddressMaxRequestsActive &gt;{#ipaddressmaxrequestsactive} 
* [...] ** &lt;ipAddressMaxRequestsActive ** ) (#ipaddressmaxrequestsactive) Harvoin käytetty valinnainen tagi (Ensin tuettuERDDAP™2.12.) Sisällä&lt;erdapdatasets &gt; Tag indatasets.xmlTämä on osa järjestelmää, joka rajoittaa liian aggressiivisten laillisten käyttäjien ja haitallisten käyttäjien kykyä tehdä suuri määrä samanaikaisia pyyntöjä, jotka heikentävät järjestelmän suorituskykyä muille käyttäjille. ipAddressMaxRequestsActive määrittää samanaikaisten pyyntöjen enimmäismäärän, joka käsitellään aktiivisesti mistä tahansa erityisestä IP-osoitteesta. Lisäpyynnöt ovat jonossa, kunnes aiemmat pyynnöt on käsitelty. Pienet, staattiset tiedostot erdap/download/ ja erdap/images/ARE vapautetaan tästä määrästä ja siihen liittyvästä kierroksesta. Oletusarvo on 2. Suurin sallittu on 100, mikä on hullua – älä tee sitä&#33; Voit määrittää tämän 1: ksi, varsinkin jos sinulla on ongelmia liiallisen aggressiivisten tai haitallisten käyttäjien kanssa. Käyttäjät saavat nopeasti kaikki pyytämänsä tiedot (ipAddressMaxRequests) He eivät kuitenkaan pysty havaitsemaan järjestelmäresursseja. Emme suosittele tätä suurempaan määrään, koska se sallii liian aggressiivisten laillisten käyttäjien ja haitallisten käyttäjien dominoida sitä.ERDDAPjalostuskapasiteettia.
Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lukeminendatasets.xmlmukaan lukien vastauksena tietoaineistoon[Lippu](/docs/server-admin/additional-information#flag).
     
### &lt;ipAddressUnlimited &gt;{#ipaddressunlimited} 
* [...] ** &lt;ipAddressUnlimited &gt; ** ) (#ipaddressunlimited) Harvoin käytetty valinnainen tagi (Ensin tuettuERDDAP™2.12.) Sisällä&lt;erdapdatasets &gt; Tag indatasets.xmlTämä on osa järjestelmää, joka rajoittaa liian aggressiivisten laillisten käyttäjien ja haitallisten käyttäjien kykyä tehdä suuri määrä samanaikaisia pyyntöjä, jotka heikentävät järjestelmän suorituskykyä muille käyttäjille. ipAddressUnlimited on koodattu luettelo IP-osoitteista, joita haluat käyttää rajoittamattomasti.ERDDAP. Katso lokiin. txt-tiedosto, jonka avulla näet, missä muodossa palvelimesi käyttää IP-osoitteita. Joissakin palvelimissa IP-osoitteet ovat muodossa #.#. (missä # on kokonaisluku 0-255) ; ottaa huomioon, että muilla se on muodossa #:#:#:#:#: #: . Tämän luettelon pyynnöt eivät koske ipAddressMaxRequests tai ipAddressMaxRequestsActive-asetuksia. Tämä voi olla toissijainenERDDAP™tietyille käyttäjille tai palvelimille.ERDDAP™Lisää aina " (Tuntematon) "Mitä,ERDDAP™Käytetään, kun pyynnön esittäjän IP-osoitetta ei voida määrittää esimerkiksi muihin saman palvelimen prosesseihin.
Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lukeminendatasets.xmlmukaan lukien vastauksena tietoaineistoon[Lippu](/docs/server-admin/additional-information#flag).
    
Jos jostain syystä kaikki käyttäjän pyynnöt saavat virheviestin "Timeout odottaa muita pyyntöjä käsitellä", voit ratkaista ongelman lisäämällä käyttäjän IP-osoitteen ipAddressUnlimited-listalle, soveltamalla tätä muutosta ja poistamalla sen luettelosta.
    
### &lt;datasetsMinMinutes &gt;{#loaddatasetsminminutes} 
* [...] ** &lt;Download "Minuutit" ** ) (#Datasetsminutes) harvoin käytetty OPTIONAL-tunnisteet&lt;erdapdatasets &gt; Tag indatasets.xmlMääritä vähimmäisaika (Minuuteissa) Suuren kuorman välissä Dataa (MilloinERDDAP™Reprosessejadatasets.xml, mukaan lukien kunkin tietoaineiston tarkistaminen, jos se on ladattava uudelleen sen lataamisen mukaan. EveryNMinutes, oletusarvo = 15) . esim.
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
Jos tietty kuorma-astiat vievät vähemmän kuin tällä kertaa, kuormaaja katsoo toistuvasti lippuhakemistoa ja/tai nukkuu kunnes jäljellä oleva aika on kulunut. Oletusarvo on 15 minuuttia, mikä sopii kaikille. Ainoa haitta, joka asettaa tämän pienempään määrään, on se, että se lisää taajuutta.ERDDAP™palauttaa tietoja, joilla on virheitä, jotka estävät niiden lataamisen (Etäpalvelin on alhaalla) . Jos tällaisia tietoaineistoja on paljon ja ne on testattu usein, tietolähde voi pitää sitä pestering / aggressiivinen käyttäytyminen. Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lukeminendatasets.xmlmukaan lukien vastauksena tietoaineistoon[Lippu](/docs/server-admin/additional-information#flag). Ennen ennenERDDAP™V2.00, tämä on määritetty setup.xml, joka on edelleen sallittua mutta lannistunut.
     
### &lt;datasetsMaxMinutes &gt;{#loaddatasetsmaxminutes} 
* [...] ** &lt;loadDatasetsMaxMinutes ** ) (#Datasetsmaxminutes) OPTIONAL-tunnisteet sisällä&lt;erdapdatasets &gt; Tag indatasets.xmlMäärittää enimmäisajan (Minuuteissa) Suuri kuorma Datan käyttö on sallittua (Ennen kuormaa Tietokannan lanka käsiteltiin "vakiintuneena" ja keskeytetään)   (Oletusarvo = 60) . esim.
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
Yleensä tämä on määritettävä vähintään kaksi kertaa niin kauan kuin kohtuudella ajatella, että kaikki aineistot ladataan uudelleen. (kumulatiivisesti) pitäisi ottaa (Koska tietokoneet ja verkot ovat hitaampia kuin odotetaan) Tämän pitäisi aina olla paljon pidempi kuin datasetsmin. Oletusarvo on 60 minuuttia. Jotkut asettavat tämän pidemmälle. Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lukeminendatasets.xmlmukaan lukien vastauksena tietoaineistoon[Lippu](/docs/server-admin/additional-information#flag). Ennen ennenERDDAP™V2.00, tämä on määritetty setup.xml, joka on edelleen sallittua mutta lannistunut.
     
### &lt;LogLevel &gt;{#loglevel} 
* [...] ** &lt;logiikka &gt; ** ) (#loglevel) OPTIONAL-tunnisteet sisällä&lt;erdapdatasets &gt; Tag indatasets.xmlmäärittää, kuinka monta diagnostista viestiä lähetetään log.txt-tiedostoon. Se voidaan "varoittaa" (Vähiten viestejä) "info" (Oletusarvo) Tai ”kaikki” (eniten viestejä) . esim.
```
    <logLevel>info</logLevel>  
```
Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lukeminendatasets.xmlmukaan lukien vastauksena tietoaineistoon[Lippu](/docs/server-admin/additional-information#flag). Ennen ennenERDDAP™V2.00, tämä on määritetty setup.xml, joka on edelleen sallittua mutta lannistunut.
     
### &lt;osittainen pyyntö MaxBytes &gt; ja&lt;osittainen RequestMaxCells &gt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* [...] ** &lt;PartialRequestMaxBytes **) (#partialrequestmaxbytes-and-partialrequestmaxcells) ja [** &lt;PartialRequestMaxCells ** ) (#partialrequestmaxbytes-and-partialrequestmaxcells) harvoin käytetään OPTIONAL-tunnisteita&lt;erdapdatasets &gt; Tag indatasets.xml. kun mahdollista (Ja se ei ole aina mahdollista) ,ERDDAP™rikkoo suuria tietopyyntöjä muistin säilyttämiseksi.
    
32 bittiäJavaYksinkertaisessa merkityksessä enimmäismäärä samanaikaisesti *Suuri* pyynnöt ovat noin 3/4 käytettävissä olevasta muistista. (XMX-arvo siirtyy Tomcatiin) jaettuna Chunk-kokoon (1200 MB / 100 MB = 12 pyyntöä) . Muut asiat vaativat muistia, joten pyyntöjen määrä on pienempi. Käytännössä potkut eivät ole aina mahdollisia. Joten yksi suuri tai useita hyvin suuria samanaikaisia ei-kutsuttavia pyyntöjä voi aiheuttaa ongelmia 32 bittiä.Java.

64 bittiäJavaXMX-arvo voi olla paljon suurempi. Muisti on paljon vähemmän vaarallinen.

Voit ylittää oletusarvoisen chunk-koon määrittämällä nämä merkitdatasets.xml  (eri arvoilla kuin tässä) :
Verkot:&lt;Osittainen RequestMaxBytes &gt; 100000&lt;/partialRequestMaxBytes
Pöydät:&lt;Osittainen pyyntö &gt; 1000000&lt;/partialRequestMaxCells

PartialRequestMaxBytes on osittaisen verkkotietopyynnön tavujen enimmäismäärä. (Kokonaispyyntö) . Oletusarvo 100 000 (10 pistettä) . Suuremmat koot eivät välttämättä ole parempia (Älä mene yli 500 Mt, koska se on 3DS oletusrajaDAPVastaukset) . Suuremmat koot voivat kuitenkin vaatia vähemmän tiedostoja (AjatteluaERD"Satelliittitiedot joka kerta erillisessä tiedostossa - on parempi saada lisätietoja kustakin osittaisesta pyynnöstä.) .

PartialRequestMaxCells on solujen suurin enimmäismäärä. (nyrkkeilyä* nColumnit datataulukossa) osittaiseen TABLE-tietopyyntöön (Kokonaispyyntö) . Oletusarvo 100 000. Suuremmat koot eivät välttämättä ole parempia. Ne odottavat pidempään alkuaineistoa lähteestä.

Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lukeminendatasets.xmlmukaan lukien vastauksena tietoaineistoon[Lippu](/docs/server-admin/additional-information#flag). Ennen ennenERDDAP™V2.00, nämä on määritetty setup.xml, joka on edelleen sallittua mutta lannistunut.
     
### &lt;Blacklist &gt;{#requestblacklist} 
* [...] ** &lt;Pyydä ilmaista » ** ) (#requestblacklist)  [OPTIONAL-tunnisteet](/docs/server-admin/additional-information#frequent-crashes-or-freezes)Sisällä&lt;erdapdatasets &gt; Tag indatasets.xmljoka sisältää erillisen luettelon numeroista IP-osoitteita, jotka on musta listattu. Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lukeminendatasets.xmlmukaan lukien vastauksena tietoaineistoon[Lippu](/docs/server-admin/additional-information#flag).
    * Tätä voidaan käyttää poistamaan a[Palveluhyökkäyksen kieltäminen](https://en.wikipedia.org/wiki/Denial_of_service)Liiallinen innokas[Robotti](https://en.wikipedia.org/wiki/Internet_bot)tai mikä tahansa muu käyttäjä.
    * Huono käyttäjä - JosERDDAP™Hidastaa törmäystä tai jäädyttää / pysähtyy, syy on usein vaivainen käyttäjä, joka käyttää useampaa kuin yhtä käsikirjoitusta kerralla ja/tai tekee suuren määrän erittäin suuria, erittäin tehottomia tai mitättömiä pyyntöjä tai samanaikaisia pyyntöjä. Katso sisään[log.txt](/docs/server-admin/additional-information#log)Katso, onko näin, ja löytää numero IP-osoite viallinen käyttäjä. Jos tämä on ongelma, sinun on todennäköisesti mustalle listalle.
        
MilloinERDDAP™HTTP-virhe 403: Kielletty. Tekstivirheilmoitus kannustaa käyttäjää lähettämään sinulle sähköpostia,ERDDAPHallinnoija, ratkaise ongelmat. Jos haluat lukea virheilmoituksen (Monet eivät ilmeisesti) ja ota yhteyttä sinuun, voit sitten työskennellä heidän kanssaan saadaksesi heidät suorittamaan vain yhden käsikirjoituksen kerrallaan, tekemään tehokkaampia pyyntöjä, korjaamaan käsikirjoituksen ongelmat. (esimerkiksi etätietoaineiston tietojen pyytäminen, joka ei voi vastata ennen ajankohdan päättymistä) Tai mikä tahansa muu oli ongelman lähde.
        
Käyttäjät eivät usein tiedä, että heidän pyyntönsä ovat hankalia. He ovat usein tietämättömiä vikoja, törkeitä tehottomuuksia tai muita ongelmia käsikirjoituksensa. Usein ajatellaan, että koskaERDDAP™Tarjoaa tietoja ilmaiseksi, jotta he voivat pyytää niin paljon tietoja kuin haluavat, esimerkiksi käyttämällä useita käsikirjoituksia tai käyttämällä useita lankoja samanaikaisesti.
        
        * Voit kertoa heille, että jokainenERDDAP™Sillä on väliä, kuinka suuri ja voimakas on. (CPU-aika, kovalevy I/O, verkon kaistanleveys jne.) Ei ole reilua, jos yksi käyttäjä pyytää tietoja tavalla, joka levittää muita käyttäjiä tai ylikuormittaa.ERDDAP.
        * Kun käyttäjä tietää, miten tehdä kaksi samanaikaista pyyntöä, hän ei usein näe syytä olla tekemättä 5, 10 tai 20 samanaikaista pyyntöä, koska lisäpyynnöt eivät maksa mitään. Se on kuin epäsymmetrinen sota: täällä hyökkäävillä aseilla on valtava etu. (nollakustannukset) puolustusaseiden yli (Rajallinen asennus, jolla on todelliset kustannukset) .
        * Näytä heille, että palautuksia on vähennetty yhä enemmän samanaikaisten pyyntöjen tekemiseksi; lisäpyynnöt vain estävät muiden käyttäjien pyynnöt; ne eivät tuota heille valtavaa parannusta.
        * Muista, että muita käyttäjiä on (sekä satunnaiset käyttäjät että muut käyttäjät käyttävät käsikirjoituksia) Siksi ei ole oikeudenmukaista, että he kaikkiERDDAPresurssit.
        * Teknologian jättiläiset ovat saaneet käyttäjät odottamaan äärettömiä resursseja verkkopalveluista. Vaikka on olemassa tapoja perustaa[Verkot/klusterit/federaatiotERDDAPs](/docs/server-admin/scaling)tehdä yhdenERDDAP™enemmän resursseja, suurin osaERDDAP™Hallinnoijilla ei ole rahaa tai valtaa perustaa tällaisia järjestelmiä, ja tällainen järjestelmä on vielä lopullinen. AtERDEsimerkiksi yksi henkilö (Minä) KirjoittaminenERDDAP™hallinnoimalla kahtaERDDAPs (Apua pomoltani) useita tietolähteitä, kaikki vuotuinen laitteistobudjetti on 0 dollaria (Luotamme satunnaisiin avustuksiin laitteiston maksamiseksi.) . Tämä ei ole Google, Facebook, Amazon jne., jossa on 100 insinööriä, ja miljoonia dollareita tuloja kierrättää yhä suurempia järjestelmiä. Emme voi vain siirtääERDDAP™Esimerkiksi Amazon AWS, koska tietojen tallennuskustannukset ovat suuria ja tietojen egress-maksut ovat suuria ja vaihtelevia, kun taas ulkoisten palveluiden budjetti on kiinteä 0 dollaria.
        * Pyyntöni käyttäjille on: ei-aika-arkaluonteisia pyyntöjä varten (mikä on yleisin tapaus) Järjestelmän pitäisi tehdä yksi pyyntö kerrallaan. Jos pyynnöt ovat aikaherkkiä (Esimerkiksi useita .pngs verkkosivulla, useita laattojaWMSasiakas jne.) Ehkä neljä samanaikaista pyyntöä ovat (Vain lyhyen aikaa) .
        * Jos selität tilanteen käyttäjälle, useimmat käyttäjät ymmärtävät ja ovat valmiita tekemään tarvittavat muutokset, jotta voit poistaa IP-osoitteen mustalta listalta.
             
    * Käyttäjän mustalle listalle lisätä numeroitu IP-osoite tiivistetylle IP-osoitteiden luettelolle&lt;Pyydä musta lista »datasets.xmltiedosto. Löytääksesi ongelmallisen käyttäjän IP-osoitteen, katsoERDDAP™  *isovanhemmat* /log.txt-tiedosto ( *isovanhemmat* on määritelty[Asennus.xml](/docs/server-admin/deploy-install#setupxml)) Katso, onko näin ja löydät kyseisen käyttäjän IP-osoitteen. Jokaisen pyynnön IP-osoite on lueteltu linjoilla, jotka alkavat "123; &#123; &#123; 123; #" ja on 4 numeroa, jotka erotetaan ajanjaksoista, esimerkiksi 123.45.67.8. Etsiminen "ERROR" auttaa sinua löytämään ongelmia, kuten mitättömiä pyyntöjä.
    * Voit myös korvata viimeisen numeron IP-osoitteessa.\\*(esimerkiksi 202.109.200)\\*b) estää useita IP-osoitteita, 0-255.
    * Voit myös korvata IP-osoitteen viimeiset kaksi numeroa.\\*.\\*  (Esimerkiksi 121.204.\\*.\\*) estämään laajemman IP-osoitteen, 0-255.0-255.
    * Esimerkiksi,
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * Sinun ei tarvitse aloittaa uudelleenERDDAP™Muutoksiin&lt;Pyydä mustavalkoista &gt; voimaan. Muutokset havaitaan seuraavalla kerralla.ERDDAP™Tarkista, onko tietoaineistoa syytä ladata uudelleen. Voit nopeuttaa prosessia vierailemalla[Säätiö Lippu URL](/docs/server-admin/additional-information#set-dataset-flag)mihin tahansa dataan.
    * SinunERDDAP™Päivittäinen raportti sisältää luettelon/tally aktiivisimmista sallituista ja estetyimmistä hakijoista.
    * Jos haluat selvittää, mikä verkkotunnus/instituutio liittyy numerolliseen IP-osoitteeseen, voit käyttää ilmaista ja käänteistä DNS-verkkopalvelua.[ https://network-tools.com/ ](https://network-tools.com/).
    * On aikoja, jolloin on järkevää estää tietyt käyttäjät korkeammalla tasolla, esimerkiksi haitalliset käyttäjät. Voit esimerkiksi estää pääsyn kaikkeen palvelimellasi, ei vainERDDAP. Linuxissa yksi tällainen menetelmä on[iptables](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/). Voit esimerkiksi lisätä säännön, joka estää kaiken, mitä tulee 198.51.100.0 komennolla.
I INPUT - 198.51.100.0 DROP
       
### &lt;Hidas DownTroubleMillis&gt{#slowdowntroublemillis} 
* [...] ** &lt;DownTroubleMillis &gt; ** ) (#slowdowntroublemillis) harvoin käytetty OPTIONAL-tunnisteet&lt;erdapdatasets &gt; Tag indatasets.xmljoka sisältää kokonaisluvun, jossa määritellään millisekuntien määrä (Oletusarvo = 1000) tauko, kun vastaat kaikkiin epäonnistuneisiin pyyntöihin, esim. tuntemattomaan tietoaineistoon, pyydät liian suurta käyttäjää mustalla listalla. esim.
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
Jos käsikirjoitus tekee pyynnön heti toisensa jälkeen, se voi nopeasti tehdä yhden huonon pyynnön toisensa jälkeen. Voit hidastaa epäonnistunutta käsikirjoitusta niinERDDAP™Ei tulvi huonoilla pyynnöillä. Jos ihminen tekee huonon pyynnön, hän ei huomaa tätä viivettä. Suositukset:
    
    * Jos ongelma on jaettu palvelukielto (DD) 100+ hyökkääjän hyökkäys, aseta tämä pienemmäksi (100?) . Hidastamalla niitä liian pitkään johtaa liikaa aktiivisia lankoja.
    * Jos ongelma on 1-10 lähdettä, aseta tämä 1000 m (Oletusarvo) mutta suurempi määrä (10 000) on myös kohtuullinen. Tämä hidastaa niitä, jotta ne tuhlaavat vähemmän verkkoresursseja. Tuhat ms tai ei ärsytä käyttäjiä, jotka tekevät huonon pyynnön.
    
Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lukeminendatasets.xmlmukaan lukien vastauksena tietoaineistoon[Lippu](/docs/server-admin/additional-information#flag).
     
### &lt;Sähköpostiblacklist &gt;{#subscriptionemailblacklist} 
* [...] ** &lt;tilaus Emailblacklist » ** ) (#subscriptionemailblacklist) harvoin käytetty OPTIONAL-tunnisteet&lt;erdapdatasets &gt; Tag indatasets.xmljoka sisältää erillisen luettelon sähköpostiosoitteista, jotka on välittömästi mustalle listalle[Tilausjärjestelmä](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)Esimerkiksi
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
Tämä on tapausherkkä järjestelmä. Jos tähän luetteloon lisätään sähköpostiosoite, jos kyseisellä sähköpostiosoitteella on tilauksia, tilaukset peruutetaan. Jos luettelossa oleva sähköpostiosoite yrittää tilata, pyyntö hylätään. Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lukeminendatasets.xmlmukaan lukien vastauksena tietoaineistoon[Lippu](/docs/server-admin/additional-information#flag).
     
### Standarditeksti{#standard-text} 
*   [ **Standarditeksti** ](#standard-text)----- On olemassa useita OPTIONAL-tunnisteita (Suurin osa käytetään harvoin) Sisällä&lt;erdapdatasets &gt; Tag indatasets.xmlTeksti, joka näkyy eri paikoissaERDDAP. Jos haluat muuttaa oletustekstiä, kopioi olemassa oleva arvo samasta nimestä.
     *Tom* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util.messages.xml sisäändatasets.xmlMuutetaan sitten sisältöä. Hyödynnä näitädatasets.xmlVoit määrittää uusia arvoja milloin tahansa, vaikkaERDDAP™Juoksen. Näiden arvojen muutokset tulevat voimaan seuraavalla kerralla.ERDDAP™Lukeminendatasets.xmlmukaan lukien vastauksena tietoaineistoon[Lippu](/docs/server-admin/additional-information#flag). Tag-nimet kuvaavat niiden tarkoitusta, mutta katso viestien oletussisältö.xml syvemmälle ymmärrykselle.
    
    *   &lt;StandardLicense &gt;
    *   &lt;Yhteystiedot &gt;
    *   &lt;Vakiotiedot &gt;
    *   &lt;StandardDisclaimerOfEndorsement
    *   &lt;StandardDisclaimerOfExternalLinks &gt;
    *   &lt;Standard GeneralDisclaimer &gt;
    *   &lt;Standard standard standard standard standard standard standard standard standard standard standard standard PrivacyPolicy
    *   &lt;HeadHtml5&gt;
    *   &lt;StarBodyHtml5&gt; on hyvä tunniste, jolla voit muokata jokaisen sivun yläosan ulkonäköä.ERDDAP. Tämän avulla voit helposti lisätä tilapäisen viestin.ERDDAP™Kotisivu (Esim. ”Tutki JPL MUR SST v4.1 -tietoaineistoa” tai ”Tämä”ERDDAP™tulee olemaan offline kunnossapidon 2019-05-08T17:00 PDT kautta 2019-05-08T20:00 PDT.) . Yksi omituinen laittaa tämän merkindatasets.xmlAihe: Kun aloitat uudelleenERDDAPEnsimmäinen pyyntöERDDAP™Palauttaa oletusarvon BodyHtml5 HTML, mutta jokainen myöhempi pyyntö käyttää StarBodyHtml5 HTML:ää.datasets.xml.
    *   &lt;Lyhyt kirjoitus Html&gt; on hyvä tagi muuttaa, jotta voit mukauttaa kuvauksenERDDAP. Huomaa, että voit helposti muuttaa tätä lisätäksesi tilapäisen viestin kotisivulla. (esim. ”TämäERDDAP™tulee olemaan offline kunnossapidon 2019-05-08T17:00 PDT kautta 2019-05-08T20:00 PDT.) .
    *   &lt;EndBodyHtml5&gt;
    
      
Ennen ennenERDDAP™V2.00, nämä on määritetty setup.xml, joka on edelleen sallittua mutta lannistunut.
     
### &lt;Epätavallinen Aktiivisuus jagt;{#unusualactivity} 
* [...] ** &lt;Epätavallinen toiminta &gt; ** ) (#epätavallinen toiminta) harvoin käytetty OPTIONAL-tunnisteet&lt;erdapdatasets &gt; Tag indatasets.xmlpyyntöjen enimmäismäärä kahden LoadDataset-levyn välillä, joita pidetään tavanomaisina (Oletusarvo = 10000) . Jos tämä numero ylittyy, sähköposti lähetetään sähköpostiin Kaikki (asennus.xml) . esim.
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lukeminendatasets.xmlmukaan lukien vastauksena tietoaineistoon[Lippu](/docs/server-admin/additional-information#flag). Ennen ennenERDDAP™V2.00, tämä on määritetty setup.xml, joka on edelleen sallittua mutta lannistunut.
     
### &lt;päivitys MaxEvents &gt;{#updatemaxevents} 
* [...] ** &lt;Päivitykset &gt; ** ) (#updatemaxevents) harvoin käytetty OPTIONAL-tunnisteet&lt;erdapdatasets &gt; Tag indatasets.xmltiedostojen muutostapahtumien enimmäismäärän määrittäminen (Oletusarvo = 10) Tämä on käsiteltävä [&lt;Päivitä kaikki ns. (#updateeverynmillis) Järjestelmä ennen tietojen lataamista. Esimerkiksi,
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
Päivitys EveryNMillis-järjestelmä on suunniteltu toimimaan nopeasti ennen kuin käyttäjän pyyntö käsitellään. Jos tiedostojen muutostapahtumia on paljon, se ei todennäköisesti toimi nopeasti, joten se vaatii tietojen lataamista uudelleen. Jos sinunERDDAP™käsittelee tietoja, jotka on pidettävä ajan tasalla, vaikka suuri määrä tietotiedostoja muuttuu, voit asettaa ne suurempaan määrään. (100?) .

### &lt;käyttäjä &gt;{#user} 
* [...] ** &lt;Käyttäjä &gt; ** ) (#käyttäjä) OPTIONAL-tunnisteet sisällä&lt;erdapdatasets &gt; Tag indatasets.xmlkäyttäjän nimi, salasana (jos todentaminen = tunnistus) ja rooleja (Komma-erillinen lista) . Käyttäjätunnuksen ja salasanan käyttö vaihtelee hiukan niiden arvon perusteella.&lt;Todentaminen » (/ Docs/server-admin / Lisätiedot #authentication) sinun sisälläsiERDDAPAsennus.xml-tiedosto.
    * Tämä on osaERDDAP&gt;[Turvallisuusjärjestelmä](/docs/server-admin/additional-information#security)joidenkin käyttäjien pääsyn rajoittamiseksi.
    * Tee erillinen&lt;Käyttäjä &gt; tagi jokaiselle käyttäjälle. Vaihtoehtoisesti, jos autentikointi = oauth2, voit määrittää kaksi&lt;Käyttäjä &gt; Tagit jokaiselle käyttäjälle: yksi, kun käyttäjä kirjautuu sisään Google, yksi, kun käyttäjä kirjautuu Orcidin kautta, todennäköisesti samoilla rooleilla.
    * Jos ei ole&lt;käyttäjä &gt; tunniste asiakasta varten, s/ hän pääsee vain julkisiin tietoaineistoihin, ts. tietoaineistoihin, joita ei ole olemassa.&lt;Käytettävyys &gt; (#accessibleto) Tag.
    * käyttäjätunnus
Todentamista varten käyttäjänimi on yleensä yhdistelmä kirjaimia, numeroita, korostuksia ja ajanjaksoja.
Todennus = sähköposti, käyttäjätunnus on käyttäjän sähköpostiosoite. Se voi olla mikä tahansa sähköpostiosoite.
Todennus = Google, käyttäjätunnus on käyttäjän koko Googlen sähköpostiosoite. Googlen hallinnoimat tilit, kuten@noaa.govTilejä.
Todennus=orcid, käyttäjätunnus on käyttäjän Orcid-tilin numero. (Dashesin kanssa) .
Autentikointi = oauth2, käyttäjätunnus on käyttäjän koko Google-sähköpostiosoite tai käyttäjän Orcid-tilin numero. (Dashesin kanssa) .
    * salasana
Todennus = sähköposti, google, orcid tai oauth2, älä määritä salasanan ominaisuutta.
Todentamista varten on määritettävä salasanan tunnus jokaiselle käyttäjälle.
        * Käyttäjien antamat salasanat ovat arkaluonteisia ja niillä on oltava 8 tai enemmän merkkejä, joten niitä on vaikeampi halkaista. Nykyään jopa 8 merkkiä voidaan murtaa nopeasti ja edullisesti brute-voimalla käyttämällä AWS-tietokonejoukkoa.ERDDAP™8-merkkisen vähimmäismäärän noudattaminen vain, kun käyttäjä yrittää kirjautua sisään (ei silloin, kun käyttäjä yrittää kirjautua sisään).&lt;Käyttäjä&gt;-tunnistetta käsitellään, koska koodi näkee vain salasanan hash-lihan, ei selkeän salasanan.
        * Asennus.xml&lt;salasana » määrittää, miten salasanat tallennetaan&lt;Käyttäjä &gt; Tagit sisäändatasets.xml. Turvallisuuden lisäämiseksi vaihtoehdot ovat:
            *   [MD5](https://en.wikipedia.org/wiki/MD5)  (Älä käytä tätä&#33;) - salasanan attribuutti, määritä MD5 hash sulatus käyttäjän salasanan.
            * UEPMD5 (Älä käytä tätä&#33;) - salasanan attribuutti, määritä MD5 hash digest *käyttäjätunnus* :ERDDAP: *salasana* . Käyttäjänimeä ja "ERDDAP"Olet tottunut[Suolaa](https://en.wikipedia.org/wiki/Salt_(cryptography)Hash-arvo, mikä vaikeuttaa koodaamista.
            *   [SHA256](https://en.wikipedia.org/wiki/SHA-2)  (Ei suositella) - salasanan ominaisuuksiin, määritä SHA-256 hash sulavuus käyttäjän salasanan.
            * EPSHA256 (Oletusarvo, suositeltu salasanakoodi. Mutta paljon parempi: käytä googlea, orkideaa tai valauth2-todennusvaihtoehtoja.) - salasanan attribuutille, määritä SHA-256 hash-digest *käyttäjätunnus* :ERDDAP: *salasana* . Käyttäjänimeä ja "ERDDAP"Olemme tottuneet suolaamaan hash-arvoa, mikä tekee siitä vaikeampaa purkaa.
        * Windowsissa voit luoda MD5-salasanan digest-arvoja lataamalla MD5-ohjelman. (kuten[MD5](https://www.fourmilab.ch/md5/)) ja käyttää (Esimerkiksi esimerkiksi) :
md5 -djsmith:ERDDAP: *Todellinen salasana* 
        * Linux/Unix -ohjelmassa voit luoda MD5-digest-arvoja käyttämällä sisäänrakennettua md5sum-ohjelmaa. (Esimerkiksi esimerkiksi) :
Echo - n jsmith:ERDDAP: *Todellinen salasana* """|md5sum
        * Tallennetut salasanat ovat arkaluonteisia. MD5- ja UEPMD5-salasanojen tallennetut muodot eivät ole herkkiä.
        * Esimerkiksi esimerkiksi (UEPMD5) jos käyttäjätunnus = "jsmith" ja salasana ="myPassword"&lt;Käyttäjä &gt; Tag on:
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
missä tallennettu salasana syntyi
md5 -djsmith:ERDDAPMyPassword
        * Roolit ovat erillinen luettelo rooleista, joihin käyttäjä on valtuutettu. Kaikki&lt;Tiedot &gt; voi olla [...]&lt;Käytettävyys &gt; (#accessibleto) tunniste, jossa luetellaan rooleja, jotka sallitaan käyttää kyseistä tietoaineistoa. Tietylle käyttäjälle ja tietylle tietoaineistolle, jos jokin käyttäjän luettelon tehtävistä vastaa yhtä aineiston luettelon rooleista.&lt;Käytettävissä oleva To&gt;-roolit, sitten käyttäjällä on oikeus käyttää kyseistä tietoaineistoa.
            
Jokainen käyttäjä, joka kirjautuu sisään, ottaa automaattisesti roolin.\\[Kuka tahansa Sisällä\\]Onko olemassa a&lt;Käyttäjä &gt; Tag for them indatasets.xmlTai ei. Jos tietyllä aineistolla on
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
kaikki käyttäjät, jotka on kirjattu sisään, saavat käyttää kyseistä tietoaineistoa, vaikka niitä ei olisikaan.&lt;Käyttäjä &gt; Tag for them indatasets.xml.
            
    * Muutokset tämän sivun arvoon tulevat voimaan seuraavalla kerralla.ERDDAP™Lukeminendatasets.xmlmukaan lukien vastauksena tietoaineistoon[Lippu](/docs/server-admin/additional-information#flag).
         
### &lt;Regex & Gt;{#pathregex} 
* [...] ** &lt;Regex &gt; ** ) (#pathregex) Voit määritellä säännöllisen ilmaisun, joka rajoittaa, mitä polkuja (Mitkä aliohjaukset) sisällytetään aineistoon. Oletusarvo on *, joka vastaa kaikkia polkuja. Tämä on harvoin käytetty, harvoin tarvittu, OPTIONAL-tunnisteEDDGridFiles-tietoaineistot, EDDTableFromFiles-tietoaineistot ja muutama muu tietoaineistotyyppi. Mutta kun sitä tarvitaan, sitä todella tarvitaan.
    
Jotta voit tehdä tämän työn, sinun on oltava todella hyvä säännöllisten ilmaisujen kanssa. Katso tämä[Regex-dokumentointi](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)ja[Regex Tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html). Erityisesti sinun on tiedettävä ryhmistä (Jotain vanhempien sisällä) ja "tai" symboli|".
Yhdessä nämä antavat sinun määrittää useita vaihtoehtoja, esimerkiksi (Vaihtoehto 1|Vaihtoehto 2|Vaihtoehto 3) .
Kaikki vaihtoehdot eivät voi olla mitään, esim. (|Vaihtoehto 2|Vaihtoehto 3) .
Lisäksi sinun on tiedettävä, että talteenottoryhmät voidaan pestää, eli mikä tahansa valinta tallennusryhmässä voi sisältää toisen kaappausryhmän. (|Vaihtoehto 2 (|Vaihtoehto 2 b b b b|Vaihtoehto 2) |Vaihtoehto 3) joka sanoo, että vaihtoehtoa 2 ei voi seurata millään, optio2b tai optio2c.
Regekseissä jokainen vaihtoehto on yksi kansion nimi, jota seuraa a /, esim. baari / .
    
Regexin hankala osa on: milloinERDDAP™Rekursiivisesti laskeutuu hakemistopuu, regexin on hyväksyttävä kaikki tiet, joita se kohtaa hakemistoihinsa. Regexin pested capture -ryhmät ovat hyvä tapa käsitellä tätä.
    
Esimerkki:
Oletetaan, että meillä on seuraava hakemisto:
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
Tiedosto on/foo/bar/, ja haluamme vain.nctiedostoja D\\[0-9\\]&#123;4&#125;/a/aliohjaus.
Ratkaisu on asettaa regex /foo /bar / (|D\\[0-9\\]&#123;4&#125; (|A/) )   
Tämä sanoo:
Polun on aloitettava/foo/bar/
Mitään tai ei voi seurata\\[0-9\\]&#123;4&#125;
Mitään tai a/
    
Regex voi olla uskomattoman vaikea muotoilla. Jos olet jumissa, kysy ohjelmoijalta (Lähin asia reaalimaailmassa velhon pilkkaamiseen?) Lähetä sähköpostia Chrisille. Johannes osoitteessa Noaa.gov.
    
### &lt;tiedostot &gt;{#dataset} 
* [...] ** &lt;Tietoja &gt; ** ) (#tiedot) on OPTIONAL (Aina käytetty) Tag sisällä&lt;erdapdatasets &gt; Tag indatasets.xml(jos sisällytät kaikki tiedot&lt;Tietoja &gt; ja&lt;/dataset&gt;) kuvailee täysin yhtä aineistoa. Esimerkiksi,
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
Saatat olla minkä tahansa määrän tiedostoja omassadatasets.xmltiedosto.
Kolme ominaisuutta saattaa esiintyä alla&lt;Tiedot &gt; Tag:
     
    *    **Tyyppi =" *A Tyyppi* """** Se on vaativa ominaisuus sisällä&lt;Tiedot &gt; Tag indatasets.xmljoka tunnistaa aineistotyypin (Esimerkiksi, onko kyseessäEDDGridEDDTable/tabular dataset) ja tietojen lähde (esimerkiksi tietokanta, tiedostot tai etäyhteysOPeNDAPPalvelin) . Nähdään[ **Luettelo tietotyyppien** ](#list-of-types-datasets).
         
#### Data I{#datasetid} 
*   [ **datasetID=" *ADatasetidi* """** ](#datasetid)Se on vaativa ominaisuus sisällä&lt;Tiedot &gt; Tag, joka määrittää lyhyen (yleensä)&lt;15 merkkiä), yksilöllinen, tunnistettu nimi tietoaineistoon.
    * ThedatasetIDPitää olla kirje (A-Z, a-z) minkä tahansa A-Z-, A-Z-, 0-9- ja +-numeron jälkeen (parhaimmillaan, jos&lt;32 merkkiä).
    * Dataa Tunnukset ovat herkkiä, mutta eivät luo kahtadatasetIDTämä eroaa vain ylä-/alhaiskirjeissä. Tämä aiheuttaa ongelmia Windows-tietokoneissa (käyttäjän ja/tai käyttäjän tietokone) .
    * Parhaat käytännöt: Suosittelemme käyttämään[Kameli Tapaus](https://en.wikipedia.org/wiki/CamelCase).
    * Parhaat käytännöt: Suosittelemme, että ensimmäinen osa on lähdelaitoksen nimen lyhentäminen tai lyhentäminen ja toinen osa on aineiston nimen lyhentäminen tai lyhentäminen. Jos mahdollista, luomme nimen, joka heijastaa lähdekoodin nimeä. Esimerkiksi käytimmedatasetID= erdphsstA8day" aineistostaNOAA NMFS SWFSCYmpäristötutkimusyksikkö (ERD) lähde on nimetty satelliitiksi/pH/sst8. päivä.
    * Jos vaihdat tietoaineiston nimeä, vanha tietoaineisto (Vanhalla nimellä) Tulee vielä elämäänERDDAP. Tämä on "orpo"-aineistoa, koska sen eritelmätdatasets.xmlNyt on poissa. Tätä on käsiteltävä:
        1. For ForERDDAP™19 ja myöhemmin sinun ei tarvitse tehdä mitään.ERDDAP™poistaa nämä orpotiedot automaattisesti.
        2. For ForERDDAP™V2.18 ja aikaisemmin sinun on tehtävä jotain orpotietojen poistamiseksi: Tee aktiivinen = "väärä" data, esim.
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
Seuraavan suuren kuorman jälkeen Dataa, Voit poistaa tämän tunnisteen sen jälkeen, kun vanha tietoaineisto on aktiivinen.
                 
#### aktiivisen aktiivisen aktiivisen{#active} 
*   [ **Aktiivinen =" *Boolee* """** ](#active)OPTIONALTIONALTIONALTION ASETUS AINA&lt;Tiedot &gt; Tag indatasets.xmlMikä osoittaa, onko tietokanta aktiivinen (Hyväksytty käytettäväksiERDDAP) Tai ei.
    * Arvot ovat totta (Oletusarvo) ja vääriä.
    * Koska oletus on totta, sinun ei tarvitse käyttää tätä ominaisuutta, ennen kuin haluat poistaa tämän tietoaineiston tilapäisesti tai pysyvästi.ERDDAP.
    * Jos poistat aktiivisen = "todellisen" tietoaineistondatasets.xmlTiedot ovat edelleen aktiivisiaERDDAP™Mutta sitä ei koskaan päivitetä. Tällainen tietoaineisto on "orpo" ja se on lueteltu sellaiseksi. html-verkkosivun alapuolella on luettelo tietoaineistoista, joita ei ole ladattu.
    * Jos olet aktiivinen = "väärä"ERDDAP™poistaa tietoaineiston seuraavalla kerralla, kun se yrittää päivittää tietoaineistoa. Kun teet tämän,ERDDAP™Se ei heittele mitään tietoja, joita se on tallentanut tietoaineistosta, eikä varmasti tee mitään todellisille tiedoille.
    * Jotta aineisto voidaan poistaaERDDAP™nähtävä[Voimatietojen poistaminen](/docs/server-admin/additional-information#removing-datasets).
         

 ** Useita tunnisteita voi esiintyä&lt;Tietoja &gt; ja&lt;/dataset&gt; tagit **   
On olemassa joitakin variaatioita, joissa tunnisteet ovat sallittuja, minkä tyyppisiä tietoaineistoja. Katso dokumentit tietystä[Tietojen tyyppi](#list-of-types-datasets)yksityiskohtiin.

#### &lt;Saatavuus &gt;{#accessibleto} 
* [...] ** &lt;Saatavuus &gt; ** ) (#accessibleto) Se on OPTIONAL-tunniste a&lt;Dataset&gt; tagi, jossa määritellään erillinen luettelo[Roolit](#user)joilla on pääsy näihin tietoihin. Esimerkiksi,
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * Tämä on osaERDDAP&gt;[Turvallisuusjärjestelmä](/docs/server-admin/additional-information#security)joidenkin käyttäjien pääsyn rajoittamiseksi.
    * Jos et ole läsnä, kaikki käyttäjät (Vaikka he eivät ole kirjautuneet sisään) Sinulla on pääsy näihin tietoihin.
    * Jos tämä tunniste on läsnä, tämä tietoaineisto on näkyvissä ja saatavilla vain kirjautuneilla käyttäjillä, joilla on jokin määritellyistä tehtävistä. Tämä tietoaineisto ei näy käyttäjille, jotka eivät ole kirjautuneet sisään.
    * Jokainen käyttäjä, joka kirjautuu sisään, ottaa automaattisesti roolin.\\[Kuka tahansa Sisällä\\]Onko olemassa a&lt;Käyttäjä &gt; Tag for them indatasets.xmlTai ei. Jos tietyllä aineistolla on
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
kaikki käyttäjät, jotka on kirjattu sisään, saavat käyttää kyseistä tietoaineistoa, vaikka niitä ei olisikaan.&lt;Käyttäjä &gt; Tag for them indatasets.xml.
         
#### &lt;grafiikka: AccessibleTo&gt;{#graphsaccessibleto} 
* [...] ** &lt;grafiikka &gt; ** ) (#grafiikka) Se on OPTIONAL-tunniste a&lt;Tiedot &gt; Tag indatasets.xmljoka määrittää, ovatko tietoaineiston grafiikat ja metatiedot yleisön saatavilla. Se tarjoaa tavan päästä eroon tietoaineiston [...]&lt;Käytettävyys &gt; (#accessibleto) asettaminen. Sallittuja arvoja ovat:
    * Auto- Tämä arvo (tai poissaolo)&lt;graphsAccessibleTo&gt; -tunnus tietoaineistolle) mahdollistaa grafiikoiden ja metatietojen saatavuuden tietoaineistosta jäljittelemällä tietoaineiston aineistoa&lt;Käytettävyys &gt; Asetukset.
Jos aineisto on yksityistä, sen grafiikat ja metatiedot ovat yksityisiä.
Jos tiedot ovat julkisia, niiden grafiikat ja metatiedot ovat julkisia.
    * Julkinen yleisö ----- Tämä asetus tekee tietoaineiston grafiikoista ja metatiedoista pääsyn kenellekään, jopa käyttäjille, jotka eivät ole kirjautuneet sisään, vaikka tietoaineisto olisi muutoin yksityistä, koska sillä on&lt;Käytettävyys: Tag.
         
#### &lt;Saatavuus ViaFiles &gt;{#accessibleviafiles} 
* [...] ** &lt;Käytettävissä &gt; ** ) (#accessibleviafiles) Se on OPTIONAL-tunniste a&lt;Tiedot &gt; Tag indatasets.xmlfor[EDDGridAggregateExistingDimensio](#eddgridaggregateexistingdimension),[EDDGridKopio](#eddgridcopy),[EDDGridEDDTable](#eddgridfromeddtable),[EDDGridLähde: Eddap](#eddfromerddap),[EDDGridLähde: Etopo](#eddgridfrometopo),[EDDGridFilejä](#eddgridfromfiles)  (Kaikki alaluokat) ,[EDDGridSideBySide](#eddgridsidebyside),[EdDTableCopy](#eddtablecopy) [EdDTableFromDap](#eddfromerddap),[EDDTableFromEDDGrid](#eddtablefromeddgrid)ja[EDDTableFromfiilit](#eddtablefromfiles)  (Kaikki alaluokat) Dataa. Sillä voi olla todellinen tai väärä arvo. Esimerkiksi,
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
Jos arvo on totta,ERDDAP™Näin käyttäjät voivat selata ja ladata tietoaineiston lähdetiedostojaERDDAP&gt;["files"Järjestelmäjärjestelmä](https://coastwatch.pfeg.noaa.gov/erddap/files/). Nähdään"files"järjestelmän[dokumentointi](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)Lisätietoa.
    
Oletusarvon&lt;Käytettävissä &gt; tulee&lt;Epäonnistumiskykyinen &gt; Sisällä[Asennus.xml](/docs/server-admin/deploy-install#setupxml). Se on oletusarvo vääriä, mutta suosittelemme, että lisäät tuon tunnisteen setup.xml: n arvoon.
    
Suositus - Suosittelemme, että kaikki asiaankuuluvat tietoaineistot ovat saatavilla tiedostojärjestelmän kautta asettamalla&lt;Oletusasetukset KäytettävissäViaFiles &gt; totta asennus.xml, koska on olemassa joukko käyttäjiä, joille tämä on paras tapa saada tiedot. Muiden syiden lisäksi"files"Järjestelmän avulla käyttäjät voivat helposti nähdä, mitkä tiedostot ovat saatavilla ja milloin ne ovat viimeksi muuttuneet, jolloin käyttäjän on helppo säilyttää oma kopio koko tietoaineistosta. Jos et yleensä halua tehdä tietoaineistoja tiedostojärjestelmän kautta, aseta&lt;DefaultAccessibleViaFiles &gt; Väärä. Kummassakin tapauksessa käytä&lt;Käytettävissä olevaViaFiles &gt; niissä harvoissa tietoaineistoissa, jotka ovat poikkeuksia yleiseen politiikkaan&lt;Epäonnistumiskykyinen &gt; (esimerkiksi silloin, kun aineisto käyttää[.ncml](#ncml-files)tiedostot, jotka eivät ole hyödyllisiä käyttäjille) .
     
#### &lt;Saatavuus ViaWMS&gt;{#accessibleviawms} 
* [...] ** &lt;Saatavuus ViaWMS&gt; ** ) (#accessibleviawms) Se on OPTIONAL-tunniste a&lt;Tiedot &gt; Tag indatasets.xmlKaikille[EDDGrid](#eddgrid)alaluokkaa. Sillä voi olla todellisen arvon (Oletusarvo) tai vääriä. Esimerkiksi,
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
Jos arvo on väärä,ERDDAP&gt;WMSPalvelin ei ole käytettävissä tähän tietoaineistoon. Tätä käytetään yleisesti aineistoihin, joiden pituusarvo on suurempi kuin 180. (joka on teknisesti kelvotonWMSPalvelupalvelut) , ja jolle tarjoat myös aineiston muunnelman, jonka pituusarvot ovat kokonaan vaihteessa -180-180[EDDGridLonPM180](#eddgridlonpm180).
Jos arvo on totta,ERDDAP™Pyrimme antamaan tietoaineiston saatavilleERDDAP&gt;WMSpalvelin. Jos aineisto on täysin sopimatonWMS  (esimerkiksi pituus- tai leveystietoja ei ole) Tämän jälkeen aineisto ei ole käytettävissäERDDAP&gt;WMSpalvelimesta riippumatta.
     
#### &lt;Lisää Muuttujia Missä jagt;{#addvariableswhere} 
* [...]&lt;Lisäarvot missä &gt; (#lisävarusteet missä tahansa) OPTIONAL-tunnus sisällä&lt;Dataset &gt; tag for all EDDTable datasets.
    
Kaikkiin EDDTable-tietoihin voi sisältyä & lisäyksiä Muuttujia Missä missä (""" *attribuutti Nimen nimi* " *attribuutti Arvon arvo* """) joka kertooERDDAP™lisätä kaikki muuttujat tietoaineistoon, jossa *Attribute Name=attribute-arvo* pyydettyjen muuttujien luetteloon. Jos käyttäjä lisää &add Muuttujia Missä missä ("""ioos\\_category"Wind") kyselyyn,ERDDAPlisätä kaikki muuttujat tietoaineistoon, jolla onioos\\_category= Wind attribute luetteloon pyydetyistä muuttujista (esimerkiksi tuulinopeus, tuulilasit, tuulilasit) . *attribuutti Nimen nimi* ja *attribuutti Arvon arvo* ovat tapausherkkiä.
    
Sisällädatasets.xmljos tietoaineiston dataset.xml-levy on
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
esimerkiksi
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
Data Access -muodossa (.html verkkosivut) Tietoihin sisältyy widget (kunkin attribuutin nimi tiivistetyssä luettelossa) Alla on luettelo muuttujista, joiden avulla käyttäjät voivat määrittää ominaisarvon. Jos käyttäjä valitsee attribuuttiarvon yhdelle tai useammalle nimikkeelle, se lisätään pyyntöön & lisäyksen kautta. Muuttujia Missä missä (""" *attribuutti Nimen nimi* " *attribuutti Arvon arvo* """) . Tämä tag indatasets.xmlVoit määrittää luettelon attribuuttinimistä, jotka näkyvät Data Access -lomakkeessa kyseiselle tietoaineistolle ja helpottaa käyttäjien lisäämistä &addVariables. missä pyynnön tehtävissä. The *Tekijä: NamesCSV* Lista on tapausherkkä.
    
#### &lt;kortitudeMetersPerSourceUnit &gt;{#altitudemeterspersourceunit} 
* [...] ** &lt;KortitudeMetersPerSourceUnit ** ) (#altitudemeterspersourceunit) OPTIONAL-tunnus sisällä&lt;Dataset &gt; tag in datasets. EDDTableFrom xxmlSOSDataa (Vain&#33;) joka määrittää numeron, joka kerrotaan lähdekorkeudella tai syvyysarvoilla muuntaa ne korkeusarvoiksi. (metriä merenpinnan yläpuolella) . Esimerkiksi,
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
Tätä tunnistetta on käytettävä, jos tietoaineiston pystyakseliset arvot eivät ole mittareita, positiivinen =up. Muuten se on optimaalinen, koska oletusarvo on 1. Esimerkiksi,
    * Jos lähde on jo mitattu merenpinnan yläpuolella, käytä 1 (Älä käytä tätä tagia, koska 1 on oletusarvo.) .
    * Jos lähde mitataan metreinä merenpinnan alapuolella, käytä -1.
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * Jos lähde mitataan kilometreinä merenpinnan yläpuolella, käytä 0.001.
         
#### &lt;defaultDataQuery &gt;{#defaultdataquery} 
* [...] ** &lt;DefaultDataQuery » ** ) (#defaultdataquery) Se on OPTIONAL-tunniste a&lt;Tiedot &gt; Tag indatasets.xmlTämä kertooERDDAP™käyttää määritettyä kyselyä (URL-osoitteen osa ”?) Jos .html-tiedosto Tyyppi (Data Access -muodossa) Sitä pyydetään ilman kyselyä.
    * Tätä on todennäköisesti harvoin pakko käyttää.
    * Sinun täytyy XML-koodi (Ei prosentilla) Oletuskysymykset, koska ne ovat XML-dokumentissa. Esimerkkinä & Comes &&lt;muuttuu&lt;&gt; tulee &gt;
    * Tarkista työsi. On helppoa tehdä virhe eikä saada mitä haluaa.ERDDAP™Yritä puhdistaa virheesi, mutta älä luota siihen, koska\\*Miten\\*Siivottu voi muuttua.
    * Griddap-tietoaineistojen yhteisenä tarkoituksena on määritellä erilainen oletussyvyys tai korkeuden ulottuvuuden arvo. (esimerkiksi\\[0\\]Sen sijaan\\[Viimeinen viimeinen\\]) .
Joka tapauksessa sinun pitäisi aina listata kaikki muuttujat, aina käyttää samoja ulottuvuuksia kaikkiin muuttujiin.\\[0\\],\\[Viimeinen viimeinen\\]tai\\[0: Viimeinen\\]ulottuvuuden arvoihin.
Esimerkiksi:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * For FortabledapTiedot, jos et määritä rajoituksia, pyyntö palauttaa koko tietoaineiston, joka voi olla epäkäytännöllisesti suuri, tietoaineistosta riippuen. Jos et halua määritellä mitään rajoituksia, sen sijaan, että olisit tyhjä.&lt;DefaultDataQuery » (joka on sama kuin oletusarvon määrittäminen Dataa) Sinun on nimenomaisesti listattava kaikki muuttujat, jotka haluat sisällyttää oletusarvoon.
    * For Fortabledapaineistot, yleisin käyttö tässä on määrittää eri oletusaika (suhteessa max (Aika-aika) Esimerkiksi & Timemax (Aika-aika) 1 päivä, tai suhteessa toistaiseksi, esimerkiksi & aikanow-1 päivä) .
Muista, että tietojen muuttujien pyytäminen on sama kuin kaikkien tietojen muuttujien määrittäminen, joten voit yleensä määrittää uuden aikarajoituksen.
Esimerkiksi:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
tai tai
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;Oletusarvo GraphQuery &gt;{#defaultgraphquery} 
* [...] ** &lt;Oletusarvoinen GraphQuery ** ) (#defaultgraphquery Näytä tarkat tiedot) Se on OPTIONAL-tunniste a&lt;Tiedot &gt; Tag indatasets.xmlTämä kertooERDDAP™käyttää määritettyä kyselyä (URL-osoitteen osa ”?) Jos .graph-tiedosto Tyyppi (Tee graafinen muoto) Sitä pyydetään ilman kyselyä.
    * Tätä on todennäköisesti harvoin pakko käyttää.
    * Sinun täytyy XML-koodi (Ei prosentilla) Oletuskysymykset, koska ne ovat XML-dokumentissa. Esimerkkinä & Comes &&lt;muuttuu&lt;&gt; tulee &gt;
    * Tarkista työsi. On helppoa tehdä virhe eikä saada mitä haluaa.ERDDAP™Yritä puhdistaa virheesi, mutta älä luota siihen, koska\\*Miten\\*Siivottu voi muuttua.
    * Griddap-tietoaineistojen yleisin käyttö on määrittää erilainen oletussyvyys tai korkeuden ulottuvuuden arvo. (esimerkiksi\\[0\\]Sen sijaan\\[Viimeinen viimeinen\\]) ja/tai määrittää, että tietyt muuttujat on kuvattava.
Käyttää lähes aina\\[0\\],\\[Viimeinen viimeinen\\]tai\\[0: Viimeinen\\]ulottuvuuden arvoihin.
Esimerkiksi:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (Laita kaikki yhteen linjaan) 
    * For FortabledapTiedot, jos et määritä rajoituksia, pyyntö kuvaa koko tietoaineiston, joka voi kestää kauan, riippuen tietoaineistosta.
    * For Fortabledapaineistot, yleisin käyttö tässä on määrittää eri oletusaika (suhteessa max (Aika-aika) Esimerkiksi & Timemax (Aika-aika) 1 päivä, tai suhteessa toistaiseksi, esimerkiksi & aikanow-1 päivä) .
Muista, että tietojen muuttujien pyytäminen on sama kuin kaikkien tietojen muuttujien määrittäminen, joten voit yleensä määrittää uuden aikarajoituksen.
Esimerkiksi:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
tai tai
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;mitat InMemory &gt;{#dimensionvaluesinmemory} 
* [...] ** &lt;ulottuvuus Arvot &gt; ** ) (#Dimensionvaluesinmemory)   (Todellista (Oletusarvo) Vääriä tai) on OPTIONAL ja harvoin käytetty tunniste sisällä&lt;Tiedot &gt; Tag for anyEDDGridaineisto, joka kertooERDDAP™Miten säilyttää ulottuvuuksien lähdearvot (Tunnetaan myös nimelläaxisVariables) :
    
    * Totuus = muistissa (nopeampi, mutta käyttää enemmän muistia) 
    * Väärä = levyllä (Hitaampi, mutta ei muistia) 
    
Esimerkiksi,
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
Sinun pitäisi käyttää tätä vain virheellisen arvon kanssa, josERDDAP™sisältää paljon aineistoja, joissa on hyvin suuria ulottuvuuksia (Miljoonat arvot, esimerkiksiEDDGridLähde: AudioFiles Datasets) jaERDDAPKäyttömuistin käyttö on aina liian korkea. Muisti: Tällä hetkellä käytän linjaa\\[Sinun Dooma\\]/erddap/status.htmlvalvoaERDDAP™muistin käyttöä.
     
#### &lt;tiedostoTableInMemory &gt;{#filetableinmemory} 
* [...] ** &lt;tiedostotaulukko &gt; ** ) (#filetableinmemory)   (Todellinen tai väärä (Oletusarvo) ) OPTIONAL-tunnus sisällä&lt;Tiedot &gt; Tag for anyEDDGridFiles ja EDDTable Files-aineisto, joka kertooERDDAP™Missä pitää tiedostotaulukon (jolla on tietoa kustakin lähdetiedostosta) :
    
    * Totuus = muistissa (nopeampi, mutta käyttää enemmän muistia) 
    * Väärä = levyllä (Hitaampi, mutta ei muistia) 
    
Esimerkiksi,
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
Jos asetat tämän todeksi mihin tahansa tietoaineistoon, pidä silmällä muistia: tällä hetkellä käytetään linjaa\\[Sinun Dooma\\]/erddap/status.htmlvarmistaa, ettäERDDAP™Paljon vapaata muistia.
     
#### &lt;fgdcfile &gt;{#fgdcfile} 
* [...] ** &lt;Fgdcfile &gt; ** ) (#fgdcfile) Se on OPTIONAL-tunniste a&lt;Tiedot &gt; Tag indatasets.xmlTämä kertooERDDAP™käyttää esivalmistettua FGDC-tiedostoa sen sijaan, että olisiERDDAP™Yritä luoda tiedosto. Käyttö:
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *Täytä täysi täyte FileName* voi viitata paikalliseen tiedostoon (jossain palvelimen tiedostojärjestelmässä) tai etätiedoston URL.
Jos *Täytä täysi täyte FileName* &gt; tai tiedostoa ei löydy, aineistossa ei ole FGDC-metadataa. Tämä on myös hyödyllistä, jos haluat tukahduttaa FGDC-metatiedot tiettyyn tietoaineistoon.
Tai voit laittaa&lt;FgdcActive &gt; Väärä&lt;/fgdcActive&gt; in setup.xmlERDDAP™Älä tarjoa FGDC-metatietoja mihinkään tietoaineistoon.
     
#### &lt;Isoäiti 115 File &gt;{#iso19115file} 
* [...] ** &lt;Iso19115File ** ) (#iso19115) Se on OPTIONAL-tunniste a&lt;Tiedot &gt; Tag indatasets.xmlTämä kertooERDDAP™Käyttää esivalmistettua ISO 19115 -tiedostoa sen sijaan, ettäERDDAP™Yritä luoda tiedosto. Käyttö:
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *Täytä täysi täyte FileName* voi viitata paikalliseen tiedostoon (jossain palvelimen tiedostojärjestelmässä) tai etätiedoston URL.
Jos *Täytä täysi täyte FileName* Tiedostoa ei löydy, eikä aineistossa ole ISO 19115 -metadataa. Tämä on myös hyödyllistä, jos haluat poistaa ISO 19115 -metatiedot.
Tai voit laittaa&lt;Iso19115 Aktiivinen&lt;/iso19115Active&gt; in setup.xmlERDDAP™Emme tarjoa ISO 19115 -metatietoja mihinkään tietoaineistoon.
     
#### &lt;Ottelut NDigits &gt;{#matchaxisndigits} 
* [...] ** &lt;AxisNDigits &gt; ** ) (#matchaxisndigits) OPTIONAL-tunnisteet sisälläEDDGrid &lt;Tiedot &gt; Tag forEDDGridaggregaatiot, esim. tiedostojen koostaminen. joka kerta, kun aineistoa ladataan,ERDDAP™tarkistaa, että akseliarvot kunkin aggregoinnin osan ovat samat. Testien tarkkuus määräytyy[AxisNDigits](#matchaxisndigits), joka määrittää numeroiden kokonaismäärän, joka on sovitettava kaksitarkkuusakseliarvojen testauksessa, 0-18 (Oletusarvo) . Kun testataan kelluvia akseliarvoja, testi tehdään matchAxisNDigits/2-numeroilla. 18 tai enemmän kerrotaanEDDGridtekemään tarkan testin. Arvo 0 kertooEDDGridei tehdä testejä, joita ei suositella, paitsi alla kuvatulla tavalla.
    
Vaikka vaikkaEDDGridAkseliarvot voivat olla hieman erilaisia akseliarvoja, vain yksi akseliarvosarja näkyy käyttäjälle. Se on peräisin samasta osasta, joka tarjoaa tietoaineiston lähdemetatiedot. Esimerkiksi esimerkiksiEDDGridFiles-aineistot, jotka on määritetty&lt;Metadata &gt; Asetukset (Oletusarvo =last) .
    
AxisNDigits 0:n käyttö on useimmissa tapauksissa lannistunut, koska se poistaa kaikki tarkastukset. Vähimmäistarkastuksesta on hyötyä, koska se varmistaa, että komponentit sopivat yhteen. Me kaikki oletamme, että kaikki komponentit ovat sopivia, mutta se ei ole aina niin. Tämä on tärkeä terveyskoe. Jopa matchAxisNDigits1, 2, 3 tai 4 arvot ovat lannistuneita, koska eri akseliarvot osoittavat usein, että komponentit on luotu. (sidottu?) Tämä on erilainen tapa, eikä se sovi yhteen.
    
On yksi tapaus, jossa matchAxisNDigits0:n käyttö on hyödyllistä ja suositeltavaa: etätiedostojen yhdistelmiä, esim. S3-tiedostojen tietoja. Tässä tapauksessa, jos tietoaineisto käyttää cacheFromUrl, cacheSizeGB, matchAxisNDigits.0 jaEDDGridFiles-järjestelmä[Yhteenveto kautta File Names](#aggregation-via-file-names-or-global-metadata)sittenEDDGridEi tarvitse lukea kaikkia etätiedostoja, jotta aggregaatio tehdään. Tämä mahdollistaa S3:n taajuuksista tehdyn tiedon latauksen nopeasti (Älyttömästi, josEDDGridLataa ja lue kaikki tiedostot) .
    
#### &lt;nThreads &gt;{#nthreads} 
* AloitetaanERDDAP™2.00, kun EDDTableFromFiles- taiEDDGridlukee tietolähteistään, se voi lukea yhden tiedoston (Esim. yksi lähdetiedosto) kerrallaan (Yksi thread)   (Tämä on oletus) Enemmän kuin yksi data (esim. 2+ lähdetiedostot) kerrallaan (2 tai enemmän lankaa) kunkin pyynnön käsittely.
     
    * Peukalon säännöt:
Useimmissa järjestelmissä on nThreads=1, oletusarvo. Jos sinulla on tehokas tietokone (Paljon CPU-ytimiä, paljon muistia) nThreadien asettaminen 2, 3, 4 tai korkeammalle (Enemmän kuin CPU-ydinten määrä tietokoneessa) aineistot, jotka voisivat hyötyä:
        
        * Suurin osa EDDTableFromFiles-tiedostoista hyötyy.
        * Tiedot, joissa jokin aiheuttaa viiveen ennen kuin tieto voidaan käsitellä, hyötyvät esimerkiksi:
            * Datan kanssa[Ulkoisesti painettu (esim..gz) ](#externally-compressed-files)Binaarinen (esim..nc) tiedostoja, koskaERDDAP™Koko tiedosto on purettava ennen kuin se voi alkaa lukea tiedostoa.
            * Tietoja, jotka käyttävät[CacheSizeGB](#cachefromurl)koskaERDDAP™Usein on ladattava tiedosto ennen kuin se voi lukea sen.
            * Tiedot, joissa on korkean kaistanleveyden rinnakkaistiedostojärjestelmään tallennettuja tiedostoja, koska ne voivat toimittaa enemmän tietoja, nopeammin, kun niitä pyydetään. Esimerkkejä rinnakkaisista tiedostojärjestelmistä ovat[JBOD](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures),[PNFS](http://www.pnfs.com/),[Glusterfs](https://en.wikipedia.org/wiki/Gluster)Amazon S3 ja Google Cloud Storage.
                 
        
Varoitus: Kun käytät nThreads &gt;1, pidä silmälläERDDAPMuistin käyttö, langan käyttö ja kokonaisvastuu (Katso nähkää[ERDDAPTilasivut](/docs/server-admin/additional-information#status-page)) . Kommentteja näistä asioista alla.
         
    * Tietylle tietoaineistolle tämä nThreads-asetus voi tulla eri paikoista:
        
        * Josdatasets.xmlChunk for a dataset Näytä tarkat tiedot&lt;nThreads&gt; tag (sisältää)&lt;Dataset&gt;-tag, ei globaalina attribuuttina, jolla on arvoa nThreadien arvoa käytetään. Voit määrittää eri numeron kullekin aineistolle.
        * Muuten, josdatasets.xmlHänellä on&lt;ntablethreads &gt; tag (Edd-pöytä Lähde: Files Datasets) tai&lt;nGridThreads &gt; Tag (forEDDGridDataa) arvoa = 1 A:n ulkopuolella&lt;Dataset&gt; tag, nThreadsin arvo käytetään.
        * Muussa tapauksessa käytetään 1 lanka, joka on turvallinen valinta, koska se käyttää pienintä muistia.
             
        
Sillä[Alkuperäinen alkuperäinenERDDAP™Asennus](https://coastwatch.pfeg.noaa.gov/erddap/index.html)Me käytämme
        &lt;ntablethreads » 6&lt;/nTableThreads (Se on voimakas palvelin.) Vaikeat pyynnöt vaativat nyt 30 prosenttia edellisestä.
         
##### Seuraa resurssien käyttöä{#monitor-resource-usage} 
Kun kokeilet eri nThreads-asetuksia (Saatat tehdä vaikeita näytteenottopyyntöjäERDDAP) Voit seurata tietokoneesi resurssien käyttöä:
* Etsijä: Applications : Utilities : Activity Monitor
* Linux, käytä huippua
* Windows 10:ssä, käytä *Ctrl + Shift + Esc* Avaa työryhmän johtaja
             
##### Varoitus: Vähentynyt reagointi{#warning-decreased-responsiveness} 
eristyksissä,ERDDAP™Täyttää pyynnön tietoaineistolle, jossa on korkeammat nThreadit, jotka asetetaan nopeammin kuin jos nThreads = 1. Mutta kun kyseistä pyyntöä käsitellään, muiden käyttäjien pyynnöt ovat hieman täynnä ja saavat hitaamman vastauksen. myös silloin, kunERDDAP™vastata tiettyyn pyyntöön, muihin laskentaresursseihin (esimerkiksi levyaseman käyttö, verkkokaistanleveys) Se voi rajoittaa, varsinkin korkeampien nThreads-asetusten avulla. Näin ollen korkeampien nThreads-asetusten ansiosta järjestelmän kokonaisvastuu on pahempi, kun käsittelyssä on useita pyyntöjä – tämä voi olla erittäin ärsyttävää käyttäjille&#33; Tämä johtuu siitä, että nThreads ei koskaan aseta enempää kuin tietokoneen CPU-ydinten määrä. nThreads = 1 on paras asetus kunkin pyynnön jälkeen. (useita samanaikaisia pyyntöjä) Sama osuus laskentaresursseista. Mitä tehokkaampi tietokone on, sitä vähemmän se on ongelma.
         
##### Alkuperäinen nimi: Higher Memory käyttääEDDGridDataa{#warning-higher-memory-use-for-eddgrid-datasets} 
Muistin käyttö käsittelyn aikana on suoraan verrannollinen nThreads-asetukseen. Turvallinen peukalon sääntö on: sinun on asetettava[ERDDAPMuistiasetukset](/docs/server-admin/deploy-install#memory)vähintään 2GB + (2GB \\ nThreads) . Joillekin tietokannoille vaaditaan enemmän muistia. Esimerkiksi nThreads = 3 kaikilleEDDGrid-Xmx-asetuksen tulee olla vähintään -Xmx8000M. Jos tämä muistin asetus on suurempi kuin 3/4 tietokoneen fyysinen muisti, vähennä nThreads-asetuksia, jotta muistia voidaan pienentää.

EDDTable-tietoaineistojen käsittelypyyntöjen muistikäyttö on lähes aina pienempi, koska tiedostot ovat yleensä paljon pienempiä. Jos tietyllä EDDTable-aineistolla on valtava (Esimerkki = 1 GB) tiedostot, sitten edellä mainitut kommentit koskevat myös näitä tietoaineistoja.

Riippumatta siitä, mitä nThreads-asetukset ovat, pidä silmällä muistin käyttötilastoja.[ERDDAPTilasivut](/docs/server-admin/additional-information#status-page). Sinun ei pitäisi koskaan tulla lähelle maksimoimaan muistin käyttöä.ERDDAPMuuten tulee vakavia virheitä ja epäonnistumisia.
        
##### Tilapäisesti 1{#temporarily-set-to-1} 
Jos nykyinen muistin käyttö on hieman korkea,ERDDAP™nThreads tälle pyynnölle 1. Näin,ERDDAP™Säästää muistia, kun muistia on vähän.
         
##### Vähentää paluuta{#diminishing-returns} 
Vähentää paluuta nThreads-asetuksen lisäämiseen: 2 lankaa on parempi kuin 1 (Jos dynaaminen ylikuormitus ei) . Mutta kolme on parempi kuin kaksi. Neljä on marginaalisesti parempi kuin kolme.

Yhdessä testissä, jossa on vaikea kysely suurille EDDTable-tietokannoille, vastausaika 1, 2, 3, 4, 5, 6, 38, 36, 20, 18, 13, 11 sekuntia. (Käytämme nTableThreads = 6 palvelimella.) 

nThreads=2: Vaikka nThreads=2:n määrittäminen nThreads = 1:n sijasta on usein merkittävää hyötyä, se ei useinkaan vaikuta kellonaikaan, joka tarvitaan tietyn käyttäjän pyyntöön. Syy on se, että nThreads = 1, useimmat nykyaikaiset CPU: t[dynaaminen ylikello](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)  (Turboa) CPU: n kellonnopeuden lisääminen. Näin ollen nThreads = 1, yksi ydin toimii usein korkeammalla kellon nopeudella kuin kumpikin ytimen, jos käytät nThreads = 2. Uskomme kuitenkin, että on parempi käyttää nThreads=2 eikä nThreads=1, koska tämä asetus tuottaa parempia tuloksia laajemmissa tilanteissa. Ja tietenkin, jos tietokoneellasi on riittävästi CPU-ytimiä, vielä korkeamman nThreads-asetuksen pitäisi tuottaa parempia tuloksia.

Kuten edellä on kerrottu, erittäin korkeat nThreads-asetukset voivat johtaa nopeampiin vastauksiin joihinkin pyyntöihin, mutta kokonaisriski väheni.ERDDAP™Responsiivisuus ja korkea muistin käyttö (Kuten edellä mainittiin) Vaikka pyyntöjä käsitellään, se ei yleensä ole hyvä idea.
        
##### CPU Cores{#cpu-cores} 
Sinun ei pitäisi koskaan asettaa nThreads numero suurempi kuin CPU ytimiä tietokoneen CPU. Kaikilla moderneilla CPU:illa on useita ytimiä. (esim. 2, 4 tai 8) . Joillakin tietokoneilla on jopa useita CPU-levyjä. (2 CPU \\* 4 ytimet / CPU = 8 CPU ytimet) . Selvitä, kuinka monta CPU:ta ja tietokoneen ytimet ovat:

* Macissa, käytä *Vaihtoehtoinen avain* Apple Menu: Järjestelmätiedot
* Linux, käytä kissa / proc / cpuinfo
* Windows 10:ssä, käytä *Ctrl + Shift + Esc* Avaaminen Task Manager: Suorituskyky (Loogiset prosessorit osoittavat CPU-ydinten kokonaismäärän) 

Useimmat prosessorit nykyään sanovat, että ne tukevat kahta lankaa per ydin. (kautta[hyper-threading](https://en.wikipedia.org/wiki/Hyper-threading)) , mutta kaksi lankaa jakavat laskentaresurssit, joten et näe kahdesti läpimenoa CPU: ssa raskaan kuorman alla. Esimerkiksi tietokone, jossa on yksi CPU 4 ytimet voi väittää tukevan jopa 8 lankaa, mutta sinun ei pitäisi koskaan ylittää nThreads = 4, ettäERDDAP. Muista, että:

* nThreads asettuuERDDAP™on pyyntöä kohden.ERDDAP™Usein käsitellään useita pyyntöjä samanaikaisesti.
*   ERDDAP™tekee muita asioita kuin käsitellä pyyntöjä, esim. ladata tietoaineistoja.
* MilloinERDDAP™vastata tiettyyn pyyntöön, muihin laskentaresursseihin (esimerkiksi levyaseman käyttö, verkkokaistanleveys) saattaa rajoittaa. Mitä korkeampi olet asettanut nThreads, sitä todennäköisemmin nämä muut resurssit on maksimoitu ja hidastuu.ERDDAPyleistä reagointia.
* Käyttöjärjestelmä tekee muutakin kuin juoksuaERDDAP.

Joten on parasta olla asettamatta nThreads-asetuksia useampaan kuin tietokoneen CPU: n ytimien määrään.
         
##### Kilometri voi Variantti (YMMV)  {#your-mileage-may-vary-ymmv} 
Erilaisten nThreads-asetusten tulokset vaihtelevat suuresti erilaisten pyyntöjen osalta eri järjestelmissä. Jos haluat todella tietää eri nThreads-asetukset, suorita realistisia testejä.
         
##### Miksi ntfreads per pyyntö?{#why-nthreads-per-request} 
Kuulen, että jotkut teistä ajattelevat: "Miksi nttreads per pyyntö? Jos olisin koodaamassa tätä, käyttäisin yhtä pysyvää työväen lanka-allasta ja viestijonoa paremman suorituskyvyn saavuttamiseksi. Ongelma yhden työntekijän lanka-altaalla ja viestijonossa on, että yksi vaikea pyyntö tulvii jonoa lukuisilla hitailla tehtävillä. Tämä estäisi tehokkaastiERDDAP™alkavasta työstä muihin pyyntöihin liittyvissä tehtävissä, kunnes alkuperäinen pyyntö oli (pääasiassa) valmiiksi. Yksinkertaisetkin myöhemmät pyynnöt reagoivat hitaasti.ERDDAPnThreadien käyttö pyyntöä kohden johtaa tietojenkäsittelyresurssien kohtuulliseen käyttöön.
         
##### nThreads vs. Multiple Worker Computers (käytetty){#nthreads-vs-multiple-worker-computers} 
Valitettavasti,ERDDAPnThreads-järjestelmä ei koskaan ole yhtä tehokas kuin tosi rinnakkaiselo useiden työntekijöiden tietokoneiden avulla, kun jokainen työskentelee datan kanssa, kuten Hadoop tai Apache Spark yleensä käytetään. Kun tehtävä on todella rinnastettu/jaettu useisiin tietokoneisiin, jokainen tietokone voi käyttää kaikkia sen resursseja. kanssaERDDAPnThreads-järjestelmä, jokainen lanka kilpailee saman tietokoneen kaistanleveys, levyasemat, muisti jne. Valitettavasti useimmilla meistä ei ole resursseja tai varoja, joita voi perustaa tai vuokrata. (Amazonin verkkopalvelut (AWS) Google Cloud Platform (GCP) ) massiivisia tietokoneita. Toisin kuin relaatiotietokanta, joka voi palauttaa tulosrivit missä tahansa tilauksessa,ERDDAP™Lupaan palauttaa tulokset johdonmukaisessa järjestyksessä. Tämä rajoitus tekeeERDDAPnThreads on vähemmän tehokas. Mutta kuitenkinERDDAPnThreads on monissa tapauksissa hyödyllinen.

On kuitenkin olemassa tapoja tehdäERDDAP™mittakaavassa käsitellä suuri määrä pyyntöjä nopeasti perustamalla[Verkko/kluster/liittoERDDAPs](/docs/server-admin/scaling).
         
#### &lt;PALETTES & GT{#palettes} 
* AloitetaanERDDAP™versio 2.12,datasets.xmlvoi sisältää&lt;Tag (sisältää)&lt;ErdapDatasets &gt; joka ylittää&lt;Tag value from viestejä.xml (tai palauttaa viestit.xml-arvoon, josdatasets.xmlTyhjä on) . Näin voit muuttaa käytettävissä olevien palettien luetteloaERDDAP™Juoksen. Sen avulla voit myös tehdä muutoksen ja pysyä, kun asennat uuden versionERDDAP.
VAROITUS: Palettit, jotka on lueteltudatasets.xmlon oltava viestissä.xml lueteltujen palettien superjoukko; muutenERDDAP™Poikkeus ja lopettaminendatasets.xml. Näin varmistetaan, että kaikkiERDDAP™Asennukset tukevat ainakin samoja ydinaseita.
Varoitus:ERDDAP™tarkistaa, että viestit.xml:ssa määritetyt palettitiedostot ovat todella olemassa, mutta se ei tarkista palettitiedostoja.datasets.xml. On sinun vastuullasi varmistaa, että tiedostot ovat läsnä.
    
Aloitetaan myösERDDAP™2.12, jos teet cptfiles-aliohjelmanERDDAP™Sisältöhakemisto,ERDDAP™kopioi kaikki \\*.cpt-tiedostot kyseisessä hakemistossa\\[Tom\\]/webapps/erddap/WEB-INF/cptfiles-hakemistoERDDAP™Aloita. Näin ollen, jos laitat mukautettuja cpt-tiedostoja kyseiseen hakemistoon, nämä tiedostot käytetäänERDDAP™ilman lisäponnistusta, vaikka asennat uuden versionERDDAP.
    
VAROITUS: Jos lisäät räätälöityjä palettiaERDDAP™ja sinulla onEDDGridFromErddapin ja/tai EDDTableFromErddapin tietoaineistotERDDAP™Sitten käyttäjät näkevät räätälöityjä palettivaihtoehtojaERDDAP™Tee Graph-sivut, mutta jos käyttäjä yrittää käyttää niitä, he saavat graafin oletusarvoisesti. (Yleensä sateenkaari) palettia. Tämä johtuu siitä, että kuva on tehty kaukaisellaERDDAP™jolla ei ole räätälöityä palettia. Ainoa ratkaisu on lähettää etäyhteysERDDAP™Hallinnoitsija lisätä räätälöityjä palettia hänen / hänenERDDAPSähköposti Chris. Johannes Noaa.gov pyytää, että paletti lisätään standardiinERDDAP™jakelua.
    
#### &lt;onChange &gt;{#onchange} 
* [...] ** &lt;Muutos &gt; ** ) (#vaihto) Se on OPTIONAL-tunniste a&lt;Tiedot &gt; Tag indatasets.xmljoka määrittää toimen, joka tehdään, kun tämä tietoaineisto luodaan (MilloinERDDAP™Käynnistetään uudelleen) Aina, kun nämä tiedot muuttuvat millään tavalla.
    * Tällä hetkellä,EDDGridaliluokka, mikä tahansa muutos metadataan tai akselimuuttujaan (Esimerkiksi lähes reaaliaikaisten tietojen uusi aikapiste) katsotaan muutokseksi, mutta tietojen lataamista ei pidetä muutoksena. (itsestään) .
    * Tällä hetkellä EDDTable-alaluokkien osalta aineiston uudelleenlataamista pidetään muutoksena.
    * Tällä hetkellä sallitaan vain kahdenlaisia toimia:
        * """ http://" tai " https://" ----- Jos toiminta alkaa " http://" tai " https://" ,ERDDAP™lähettääHTTP GETPyydä ilmaista URL-osoitetta. Vastaus jätetään huomiotta. Esimerkiksi URL-osoite saattaa kertoa jollekin muulle verkkopalvelulle.
            * Jos URL-osoitteessa on kyselyosa (jälkeen "?) Sen on oltava jo[% koodattu](https://en.wikipedia.org/wiki/Percent-encoding). Sinun on koodattava erityishahmoja rajoitteisiin. (muu kuin alkuperäinen & tärkein'='Rajoituksissa) muotoon %H, jossa HH on luonteen kaksinumeroinen heksadesimaalinen arvo. Yleensä sinun tarvitsee vain muuntaa muutamia täsmällisyysmerkkejä: %25, ja %26, %22,&lt;%3C, = %3D, &gt; %3E, + %2B,|%7C,\\[%5B,\\]%5D, tila %20 ja muunna kaikki yli #127-merkit UTF-8-muodoksi ja sitten kooditavut UTF-8-muodossa %H-muotoon (Kysy ohjelmoijalta apua) .
Esimerkiksi &stationID&#123;&#123;41004&#125;&#125;
Tulee &stationID%3E= %2241004 %22 %
Koodaus on yleensä tarpeen, kun käytätERDDAPMuun ohjelmiston kuin selaimen kautta. Selaimet käsittelevät yleensä prosenttiosuuden koodausta.
Joissakin tilanteissa sinun on koodattava kaikki muut hahmot kuin A-Za-z0-9. """ () *, mutta älä koodaa alkuperäistä & tai pääosaa'='rajoituksissa.
Ohjelmointikielillä on työkaluja tähän (ks.Java&gt;[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)jaJavaKäsikirjoitus [encodeURIComponent()) ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) ja on
                [Verkkosivut, jotka prosenttiin koodaavat/dekoodaavat sinulle](https://www.url-encode-decode.com/).
            * Siitä lähtiendatasets.xmlXML-tiedosto, sinun täytyy myös ja koodata kaikki ja&lt;"ja" URL-osoitteessa "&amp;"&lt;&gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt;
            * Esimerkki: URL-osoitteeseen, jonka voit kirjoittaa selaimeen:
                 https://www.company.com/webService?department=R%26D&param2=value2   
Sinun pitäisi määritellä&lt;onChange &gt; Tag by (Yhdellä linjalla) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * Posti: ----- Jos toimenpide alkaa sähköpostilla:ERDDAP™lähettää sähköpostin myöhempään sähköpostiosoitteeseen, jossa osoitetaan, että tietoaineisto on päivitetty/muutettu.
Esimerkiksi:&lt;onChange&gt;mailto:john.smith@company.com&lt;/onchange&gt; Jos sinulla on hyvä syyERDDAP™Tukeaksesi johonkin muuhun toimintaan, lähetä meille sähköpostia, jossa kuvataan mitä haluat.
    * Tämä tagi on OPTIONAL. Niitä voi olla niin monta kuin haluaa. Käytä yhtä näistä merkinnöistä jokaiseen toimintaan.
    * Tämä on analogistaERDDAPSähköposti/URL-tilausjärjestelmä, mutta näitä toimia ei tallenneta pysyvästi (Ne on varastoitu vain EDD-objektiin.) .
    * Tilauksen poistamiseksi poista vain&lt;onChange &gt; tag. Muutos huomioidaan seuraavan kerran, kun aineistoa ladataan uudelleen.
         
#### &lt;Lataa EveryNMinutes &gt{#reloadeverynminutes} 
* [...] ** &lt;Reload Kaikki minuutit » ** ) (#reloadeverynminutes) Se on OPTIONAL-tunniste a&lt;Tiedot &gt; Tag indatasets.xmllähes kaikki tietoaineistotyypit, jotka määrittävät, kuinka usein tietoaineistoa on ladattava uudelleen. Esimerkiksi,
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * Tietoja, jotka muuttuvat usein (Esimerkiksi uusien tiedostojen hankkiminen) Ne on ladattava uudelleen esimerkiksi 60 minuutin välein.
    * Usein muuttuvat tietoaineistot tulee ladata uudelleen esimerkiksi 1440 minuutin välein. (Päivittäinen päivittäin päivittäin päivittäin päivittäin päivittäin) 10080 minuuttia (Viikoittain) .
    * Tämä tagi on avoin, mutta suositeltu. Oletusarvo on 10080.
    * Esimerkkinä on:&lt;Reload EveryNMinutes &gt; 1440&lt;/ Reload Kaikki minuutit »
    * Kun tiedostot ladataan uudelleen, kaikki tiedostot *isovanhemmat* /Cache/ *datasetID* Hakemisto on poistettu.
    * Riippumatta siitä, mihin tämä asetetaan, aineistoa ei ladata useammin kuin&lt;Download "Minuutit" (Oletusarvo = 15) kuten on määritelty[Asennus.xml](/docs/server-admin/deploy-install#setupxml). Joten jos haluat, että tietoaineistot ladataan hyvin usein, sinun on asetettava sekä lataa EveryNMinutes että loadDatasets. Minuutteja pieniin arvoihin.
    * Älä lataa EveryNMinutesia samaan arvoon kuin loadDatasets minuutit, koska aika on todennäköisesti (Esimerkiksi esimerkiksi) 14:58 tai 15:02, joten aineisto ladataan vain noin puoleen tärkeimmistä latauksista. Käytä pienempää (Esimerkiksi 10) tai suurempi (Esimerkiksi 20) Reload Kaikkien minuuttien arvo.
    * Riippumatta siitä, että lataa EveryNMinutes, voit manuaalisesti kertoa.ERDDAP™tiettyjen tietojen lataaminen mahdollisimman pian[Lippu tiedosto](/docs/server-admin/additional-information#flag).
    * Kummallisia ohjelmoijia - InERDDAP™Kaikkien tietoaineistojen uudelleenlataamista käsitellään kahdella yksittäisellä langalla. Yksi lanka käynnistää pienen latauksen, jos se löytää lipputiedoston tai suuren latauksen. (joka tarkistaa kaikki tietoaineistot nähdäkseen, onko niitä ladattava uudelleen) . Toinen lanka tekee tietoaineistojen todellisen uudelleenlataamisen yksi kerrallaan. Nämä kierrokset toimivat taustalla varmistaen, että kaikki tietoaineistot pidetään ajan tasalla. Lanka, joka itse asiassa lataa, valmistaa uuden version tietoaineistosta ja vaihtaa sen paikoilleen. (Vanhan version korvaaminen atomisesti) . On hyvin mahdollista, että seuraavia tapahtumia tapahtuu (Se on hyvä asia) :
        
        1.  ERDDAP™Aloita tietojen lataaminen (Uusi versio) taustalla.
        2. Käyttäjä "A" tekee pyynnön aineistolle.ERDDAP™käyttää aineiston nykyistä versiota vastauksen luomiseen. (Se on hyvä. Käyttäjälle ei ollut viivettä, eikä aineiston nykyinen versio tulisi koskaan olla erittäin hiljainen.) 
        3.  ERDDAP™Lopuksi luodaan uusi ladattu versio tietoaineistosta ja vaihdetaan uusi versio tuotantoon. Kaikki myöhemmät pyynnöt käsitellään uudella versiolla. Johdonmukaisuutta varten A:n pyyntö on edelleen täytetty alkuperäisellä versiolla.
        4. Käyttäjä B esittää pyynnön tietoaineistolle jaERDDAP™käyttää aineiston uutta versiota vastauksen luomiseen.
        5. Käyttäjä A:n ja käyttäjä B:n pyynnöt ovat päättyneet (Ehkä ehkä ehkä ehkä ehkä A päättyy ensin, ehkä B:n alku) .
        
Kuulen jonkun sanovan: "Vain kaksi kynttilää&#33; Hah&#33; Se on lame&#33; Hänen pitäisi perustaa se, että tietojen lataaminen käyttää niin paljon lankoja kuin tarvitaan, joten kaikki tehdään nopeammin ja vähän tai ei lainkaan. Kyllä ja ei. Ongelmana on, että useamman kuin yhden datan lataaminen kerrallaan aiheuttaa useita vaikeita uusia ongelmia. Kaikkien on ratkaistava tai käsiteltävä. Nykyinen järjestelmä toimii hyvin ja sillä on hallittavia ongelmia. (Mahdollisuus viiveellä ennen lippua havaitaan) . (Jos tarvitset apua, katso meidän[Lisätuen saaminen](/docs/intro#support).) liittyvät[Päivitä päivitys Kaikkien](#updateeverynmillis). järjestelmä toimii vasteputkien sisällä, joten se voi ja johtaa siihen, että useita tietoaineistoja päivitetään. (Ei koko reload) samanaikaisesti.
##### Aktiivinen vs. reaktiivinen{#proactive-vs-reactive} 
ERDDAPReload-järjestelmä on ennakoiva – tietoaineistot ladataan pian niiden lataamisen jälkeen Joka minuuttien aika nousee (Niistä tulee "vain", mutta ei koskaan kovin) onko tietoaineisto saamassa pyyntöjä käyttäjiltä tai ei. NiinpäERDDAP™Tiedot ovat aina ajan tasalla ja käyttövalmiita. Tämä on ristiriidassa THREDDS: n reaktiivisen lähestymistavan kanssa: käyttäjän pyyntö on se, joka pyytää THREDDS: ää tarkistamaan, onko tietokanta pysähtynyt. (Se voi olla hyvin) . Jos se on hiljainen, 3DS saa käyttäjän odottamaan. (Usein muutaman minuutin) Kun aineisto on ladattu uudelleen.
        
#### &lt;Päivitä päivitys Kaikki NMillis & Gt{#updateeverynmillis} 
* [...] ** &lt;Päivitä kaikki nimet &gt; ** ) (#updateeverynmillis) Se on OPTIONAL-tunniste a&lt;Tiedot &gt; Tag indatasets.xmlJoitakin tiedostotyyppejä, jotka auttavatERDDAP™aineistot, jotka muuttuvat usein (yhtä usein kuin joka sekunti) . Toisin kuinERDDAPSäännöllinen, ennakoiva,&lt;Reload Jokainen minuutti » (#reloadeverynminutes) Järjestelmä, joka lataa kaikki tiedot, tämä OPTIONAL lisäjärjestelmä on reaktiivinen. (Käyttäjän pyynnöstä) Nopeammin, koska se on (päivittää tietoja, jotka on päivitettävä) . Jos esimerkiksi pyyntöEDDGridFromDap-tietokantaa esiintyy enemmän kuin millisekuntien määrä viimeisimmän päivityksen jälkeen.ERDDAP™Katsotaan, onko vasemmistolle uusia arvoja. (Ensimmäinen, yleensä"time") ulottuvuus ja jos on, lataa nämä uudet arvot ennen käyttäjän pyynnön käsittelyä. Järjestelmä on erittäin hyvä pitämään nopeasti muuttuva tietoaineisto ajan tasalla tietolähteen vähimmäisvaatimusten kanssa, mutta joidenkin käyttäjäpyyntöjen käsittelyn hidastumisen hinnalla.
    * käyttää tätä järjestelmää, lisää (Esimerkiksi esimerkiksi) :
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
heti jälkeen&lt;Reload "Kaikki minuutit" Tietokanta sisäändatasets.xml. Millisekuntien määrä, jonka määrität, voi olla yhtä pieni kuin 1 (varmistaa, että aineisto on aina ajan tasalla) . arvo 0 (Oletusarvo) Negatiivinen luku poistaa järjestelmän.
    * Päivitysten tulee olla erittäin nopeita, joten käyttäjien ei tarvitse odottaa pitkään.
    * Jos toinen tietopyyntö saapuu ennen edellisen päivityksen päättymistä, toinen pyyntö ei käynnistä uutta päivitystä.
    * Koko dokumentaation ajan yritämme käyttää sanaa ”lataa” säännöllisiin, täydellisiin tietoaineistojen latauksiin ja ”päivittää” näille uusille päivityksille.
    * Testaustarkoituksiin, jotkut diagnostiikka painetaan log.txt jos [&lt;logiikka &gt; (#loglevel) Sisällädatasets.xmlSe on tarkoitettu "kaikkiin".
    * Jos käytät päivityksiä ja erityisesti jos vasemmisto (Ensimmäinen ensimmäinen) Esimerkiksi aika, akseli on suuri, saatat haluta asettaa&lt;Reload "Kaikki minuutit" suurempaan määrään (1440?) , jotta päivitykset tekevät suurimman osan työstä pitääkseen tietoaineiston ajan tasalla, ja täydet lataukset tehdään harvoin.
    * Huomautus: Uusi päivitysjärjestelmä päivittää metatietoja (Esimerkiksi aikaactual\\_rangeaika | | | | &gt; &gt; &gt; &gt;) Mutta ei laukaise kangasta (Sähköposti tai kosketus URL) tai muuttaaRSSReseptiä (Ehkä sen pitäisi...) .
    * Kaikille aineistoille, jotka käyttävät alaluokkia[EDDGridFilejä](#eddgridfromfiles)ja[EDDTableFromfiilit](#eddtablefromfiles):
        *    **Varoitus:** Kun lisäät uuden datatiedoston tietoaineistoon kopioimalla sen hakemistoon, jokaERDDAP™On olemassa vaara, jokaERDDAP™Huomaa osittain kirjoitettu tiedosto; yritä lukea se, mutta epäonnistu, koska tiedosto on puutteellinen; ilmoittaa tiedosto on "huono" tiedosto ja poistaa se. (tilapäisesti) aineistosta.
Tämän välttämiseksi me **Vahva RECOMEND** että kopioit uuden tiedoston hakemistoon väliaikaisella nimellä (20150226.ncTemppeli) Tämä ei vastaa tiedostoja Nimeke Regex (*****.nc) ja nimeä tiedosto oikeaan nimeen (20150226.nc) . Jos käytät tätä lähestymistapaa,ERDDAP™Jätä väliaikainen tiedosto ja huomaa vain oikean nimetyn tiedoston, kun se on valmis ja valmis käytettäväksi.
        * Jos muutat olemassa olevia tietotiedostoja (Lisätään esimerkiksi uusi tietopiste) ,&lt;Päivitys EveryNMillis&gt; toimii hyvin, jos muutokset näkyvät atomisesti (hetkessä) Tiedosto on aina kelvollinen tiedosto. Esimerkiksi netcdf-java-kirjasto mahdollistaa "klassisen" rajattoman ulottuvuuden lisäämisen..ncV3-tiedosto on tehtävä atomisesti.
            &lt;Päivitä EveryNMillis&gt; toimii huonosti, jos tiedosto on mitätön, kun muutokset tehdään.
        *   &lt;Päivitä EveryNMillis&gt; toimii hyvin tietoaineistoissa, joissa yksi tai muutama tiedosto muuttuu lyhyessä ajassa.
        *   &lt;Päivitä EveryNMillis&gt; toimii huonosti tietoaineistoissa, joissa suuri määrä tiedostoja muuttuu lyhyessä ajassa. (elleivät muutokset ole atomisesti) . Näille aineistoille on parempi olla käyttämättä&lt;Päivitä EveryNMillis &gt; ja määritä[Lippu](/docs/server-admin/additional-information#set-dataset-flag)kertomaanERDDAP™tietojen lataamiseen.
        *   &lt;Päivitä kaikki nimet &gt; ei päivitä tietoja, jotka liittyvät [...]&lt;subsetVariables&gt; (#Subsetvariables) . Tämä ei yleensä ole ongelma, koskasubsetVariablestietoa asioista, jotka eivät usein muutu (Esimerkiksi aseman nimien, leveysasteiden ja pituusjuomien luettelo) . JossubsetVariablesTietojen muutokset (Esimerkiksi, kun tietokantaan lisätään uusi asema) Sitten ota yhteyttä[Lippu URL](/docs/server-admin/additional-information#set-dataset-flag)aineiston kerrottavaksiERDDAP™tietojen lataamiseen. Muuten,ERDDAP™ei huomaa uutta alaryhmää Muuttuvat tiedot, kunnes seuraavan kerran aineisto ladataan (&lt;Lataa EveryNMinutes »
        * Yleiset suositukset ovat:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * Kovaa? Linux-tietokoneissa, jos käytät&lt;Päivitä kaikki nimet &gt; kanssaEDDGridFiles- tai EDDTableFromFiles-luokkien avulla voit nähdä ongelman, jossa tietoaineisto ei lataudu. (ajoittain tai johdonmukaisesti) Virhesanoma: "IOE-poikkeus: Käyttäjän raja inotify-tapauksissa, jotka on saavutettu tai liian monta avointa tiedostoa." Syy voi olla vikaJavaTämä aiheuttaa inotify-tapauksia, joita ei kerätä. Tämä ongelma vältetäänERDDAP™66 ja korkeampi. Paras vaihtoehto on vaihtaa uusin versioERDDAP.
Jos tämä ei ratkaise ongelmaa (toisin sanoen, jos sinulla on todella suuri määrä tietoaineistoja.&lt;Päivitä EveryNMillis&gt;, voit korjata ongelman soittamalla:
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
Käytä suurempia numeroita, jos ongelma jatkuu. Kellojen oletusarvo on 8192. Esimerkkejä on 128.
    * Voit laittaa&lt;Päivitys &gt; 10&lt;UpdateMaxEvents » Sisällädatasets.xml  (Muiden asetusten lähellä yläosaa) tiedostojen enimmäismäärän muuttaminen (Oletusarvo = 10) Päivitys EveryNMillis -järjestelmä. Suurempi luku voi olla hyödyllinen tietoaineistolle, jossa on erittäin tärkeää, että ne pidetään aina ajan tasalla. Nähdään[PäivitysMaxEvents dokumentointi](#updatemaxevents).
    * Kummallisille ohjelmoijille - nämä päivitykset, toisin kuinERDDAPTäysi[Lataa kaikki minuutit](#reloadeverynminutes)Järjestelmä, joka tapahtuu käyttäjän pyynnöstä. Kaikki tietoaineistot voidaan päivittää samanaikaisesti. On olemassa koodi (ja lukko) varmistaakseen, että vain yksi lanka tekee päivitystä mihin tahansa tietoaineistoon milloin tahansa. Monien samanaikaisten päivitysten salliminen oli helppoa, jolloin useita samanaikaisia täydellisiä latauksia olisi vaikeampaa.
         
#### &lt;Lähde:CanConstrainStringEQNE&gt{#sourcecanconstrainstringeqne} 
* [...] ** &lt;Lähde:CanConstrainStringEQNE ** ) (#sourcecanconstrainstringeqne) OPTIONAL-tunniste EDD-taulukon sisällä&lt;Tiedot &gt; Tag indatasets.xmlTämä määrittää, voiko lähde rajoittaa String-muuttujaa = ja &#33;= operaattoreilla.
    * EDDTableFromDapSequencessä tämä pätee vain ulompaan sarjaan String-muuttujat. Oletetaan, että lähde ei pysty käsittelemään sisäisiä sekvenssimuuttujan rajoituksia.
    * Tämä tagi on OPTIONAL. Arvot ovat totta (Oletusarvo) ja vääriä.
    * EDDTableFromDapsequenceOPeNDAPDRDS-palvelimet, tämä pitäisi olla totta (Oletusarvo) .
    * EDDTableFromDapsequence Dapper-palvelimet, tämä pitäisi asettaa vääräksi.
    * Esimerkkinä on:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;lähdeCanConstrainStringGTLT&gt{#sourcecanconstrainstringgtlt} 
* [...] ** &lt;Lähde:CanConstrainStringGTLT ** ) (#sourcecanconstrainstringgtlt) OPTIONAL-tunniste EDD-taulukon sisällä&lt;Dataset&gt; tagi, joka määrittää, voiko lähde rajoittaa String-muuttujaa&lt;,&lt;=, &gt; ja operaattoreita.
    * EDDTableFromDapSequencessä tämä pätee vain ulompaan sarjaan String-muuttujat. Oletetaan, että lähde ei pysty käsittelemään sisäisiä sekvenssimuuttujan rajoituksia.
    * Arvot ovat totta (Oletusarvo) ja vääriä.
    * Tämä tagi on OPTIONAL. Oletusarvo on totta.
    * EDDTableFromDapsequenceOPeNDAPDRDS-palvelimet, tämä pitäisi olla totta (Oletusarvo) .
    * EDDTableFromDapsequence Dapper-palvelimet, tämä pitäisi asettaa vääräksi.
    * Esimerkkinä on:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;Lähde:CanConstrainStringRegex&gt{#sourcecanconstrainstringregex} 
* [...] ** &lt;Lähde:CanConstrainStringRegex ** ) (#sourcecanconstrainstringregex) OPTIONAL-tunniste EDD-taulukon sisällä&lt;tietoaineisto &gt; tunniste, joka määrittää, voiko lähde rajoittaa String-muuttujaa säännöllisin ilmaisuin ja jos on, mitä operaattori on.
    * Validiarvot ovat » (TheDAPStandard standard standard standard standard standard standard standard standard standard standard standard) &gt; &gt; &gt; &gt; (Virheellisesti monien tukemaDAPPalvelimet) tai " (osoittaa, että lähde ei tue säännöllisiä ilmaisuja) .
    * Tämä tagi on OPTIONAL. Oletusarvo on ".
    * EDDTableFromDapsequenceOPeNDAPDRDS-palvelimet, tämä pitäisi asettaa " (Oletusarvo) .
    * EDDTableFromDapsequence Dapper-palvelimet, tämä pitäisi asettaa " (Oletusarvo) .
    * Esimerkkinä on:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;lähdeCanDoDistinct&gt;{#sourcecandodistinct} 
* [...] ** &lt;Lähde:CanDistinct&gt; ** ) (#Stecandodistinct) OPTIONAL-tunnisteet EDDTableFromDatabase&lt;Tiedot &gt; Tag, joka määrittää, jos lähdetietokanta käsittelee &distinct () Käyttäjien kyselyihin liittyvät rajoitukset.
    * Tämä tagi on OPTIONAL. Hyvät arvot eivät (ERDDAP™Erot; oletus) Osittain (Lähteet käsittelevät erillisiä jaERDDAP™Jälleen hoitaa) Ja kyllä (Lähde käsittelee erillisiä) .
    * Jos käytät ei jaERDDAP™Muisti loppuu, kun käsittelet erillistä, käytä kyllä.
    * Jos käytät kyllä ja lähdetietokanta toimii liian hitaasti, älä käytä.
    * osittainen antaa sinulle pahimman molemmista: se on hidasta, koska tietokannan käsittely on hidasta ja se voi loppua muistista.ERDDAP.
    * Tietokannat tulkitsevat DISTINCT:tä vain ainutlaatuisten tulosten pyynnöksi, kun taasERDDAP™tulkitsee sitä pyynnöksi lajitellun luettelon ainutlaatuisista tuloksista. Jos se on osittaista tai kyllä,ERDDAP™Lisäksi tietokanta pyytää automaattisesti tuloksia.
    * Pieni ero tuloksissa:
ilman|osittaista,ERDDAP™"Tulosten alussa" (Ennen ei-"-jouluja) .
Kyllä, tietokanta voi (Postaus tulee) "Tulosten lopussa" (Ei-"joulujen jälkeen) .
Uskon, että tämä vaikuttaa myös lyhyiden sanojen ja pidempien sanojen muotoon, jotka alkavat lyhyellä sanalla. Esimerkiksi,ERDDAP™"Simon" ennen "Simons"
    * Esimerkkinä on:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;LähdeCanOrderBy&gt{#sourcecanorderby} 
* [...] ** &lt;Lähdelähde CanorBy &gt; ** ) (#lähde) OPTIONAL-tunnisteet EDDTableFromDatabase&lt;Tiedot &gt; Tag, joka määrittää, onko lähdetietokanta käsiteltävä &orderBy (............) Käyttäjien kyselyihin liittyvät rajoitukset.
    * Tämä tagi on OPTIONAL. Hyvät arvot eivät (ERDDAP™KäsityötorderBy (............) ; oletusarvo) Osittain (Lähde käsitteleeorderByjaERDDAP™Jälleen hoitaa) Ja kyllä (Lähde käsitteleeorderBy (............) ) .
    * Jos käytät ei jaERDDAP™Muisti poistuu käsitellessäänorderBy (............) Käytä kyllä.
    * Jos käytät kyllä ja lähdetietokantaorderBy (............) Liian hitaasti, käytä ei.
    * osittainen antaa molemmille pahimman: se on hidasta, koska tietokannan käsittelyorderBy (............) on hidas ja se voi loppua muististaERDDAP.
    * Pieni ero tuloksissa:
ilman|osittaista,ERDDAP™"Tulosten alussa" (Ennen ei-"-jouluja) .
Kyllä, tietokanta voi (Postaus tulee) "Tulosten lopussa" (Ei-"joulujen jälkeen) .
Tämä voi vaikuttaa myös lyhyiden sanojen ja pidempien sanojen lajitteluun, jotka alkavat lyhyellä sanalla. Esimerkiksi,ERDDAP™"Simon" on olemassa ennen "Simons", mutta en ole varma, miten tietokanta ratkaistaan.
    * Esimerkkinä on:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;LähteetNeeds ExpandedFP EQ&gt;{#sourceneedsexpandedfp_eq} 
* [...] ** &lt;LähteetNeeds ExpandedFP EQ&gt; ** ) (#lähteenä Expandedfp_eq) OPTIONAL-tunniste EDD-taulukon sisällä&lt;Tiedot &gt; Tag, joka määrittää (Todellista (Oletusarvo) Vääriä tai) jos lähde tarvitsee apua kyselyihin&lt;Numeerinen Vaihtoehto =&lt;floatingPointValue &gt; (ja &#33; = = = =)&lt;=) Esimerkiksi,
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * Joillekin tietolähteille numerokyselyt =, &#33; =,&lt;= tai = ei välttämättä toimi halutulla tavalla kelluvien pisteiden lukumäärällä. Esimerkiksi pituushaku = 220.2 voi epäonnistua, jos arvo säilyy 220.20000000000001.
    * Tämä johtuu siitä, että kelluvat numerot ovat[Ei esitetty täsmälleen tietokoneissa](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/).
    * Jos lähdekoodiNeeds laajenee on asetettu todeksi (Oletusarvo) ,ERDDAP™Muokkaa tietolähteeseen lähetettyjä kysymyksiä tämän ongelman välttämiseksi. On aina turvallista ja hyvää jättää tämä totta.
         
#### &lt;sourceUrl&gt;{#sourceurl} 
* [...] ** &lt;sourceUrl&gt; ** ) (#lähde) Se on yleinen tunniste datan maailmanlaajuisessa&lt;addAttributes&gt; tunniste, joka määrittää URL-osoitteen, joka on tietojen lähde.
    * Esimerkkinä on:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (Laita kaikki yhteen linjaan) 
    * SisälläERDDAP™Kaikilla aineistoilla on "sourceUrl"Yhdistetyissä globaaleissa ominaisuuksissa, jotka näkyvät käyttäjille.
    * Useimmille tiedostotyypeille tämä tagi on kyseenalainen. Katso tiedostotyypin kuvaus selvittääksesi, onko tämä kyseinen vai ei.
    * Joillekin aineistoille erillinen&lt;sourceUrl&gt; tagi ei ole sallittua. Sen sijaan sinun on annettava "sourceUrl"""[Globaali attribuutti](#global-attributes)yleensä maailmanlaajuisesti 🙂addAttributes&lt;. Jos todellista lähdettä ei ole (Jos tiedot tallennetaan esimerkiksi paikallisiin tiedostoihin) Tämä ominaisuus on usein vain sijoittaja-arvo, esimerkiksi&lt;nimi = "nimi" (Paikalliset tiedostot) &lt;/att&gt;
    * Useimmille tietokannoille tämä on URL-osoitteen perusta, jota käytetään tietojen pyytämiseen. Esimerkiksi esimerkiksiDAPpalvelimet, tämä on URL, johon voidaan lisätä .dods, .das, .dds tai .html.
    * Siitä lähtiendatasets.xmlXML-tiedosto, sinun täytyy myös koodata & "&lt;"ja" URL-osoitteessa "&amp;"&lt;"Ja &gt;"
    * Useimmille tiedostotyypeille,ERDDAP™Lisää alkuperäinensourceUrl  ("paikallinen lähdekoodi") ja[Globaalit ominaisuudet](#global-attributes)  (missä siitä tulee "julkinen lähdekoodi") . Kun tietolähde on paikallinen,ERDDAP™LisääsourceUrl=" (Paikalliset tiedostot) ”Kansainvälisille ominaisuuksille turvallisuusvaroituksena. Kun tietolähde on tietokanta,ERDDAP™LisääsourceUrl=" (Lähde tietokanta) ”Kansainvälisille ominaisuuksille turvallisuusvaroituksena. Jos osa aineistoistasi käyttää ei-julkistasourceUrl&gt; (yleensä, koska tietokone on DMZ tai paikallinen LAN) Voit käyttää [&lt;ConvertToPublicSourceUrl[muokkaa] (#converttopublicsourceurl) Tags määrittää, miten muuntaa paikallistasourceUrls yleisöllesourceUrls.
    * AsourceUrlvoi alkaahttp://,https://ftp: ja ehkä myös muita etuliitteitä.httpsyhteydet lukevat ja tarkistavat lähteen digitaalisen sertifikaatin varmistaakseen, että lähde on se, mitä ne sanovat olevan. Harvinaisissa tapauksissa tämä tarkistus voi epäonnistua virheellä "javax.net.ssl.SSLProtocolException: handshake-varoitus: tunnistamaton nimi". Tämä johtuu todennäköisesti verkkotunnuksesta, joka ei vastaa käyttämääsi verkkotunnusta. Voit lukea ja lukea yksityiskohtiasourceUrl"Sertifikaatti verkkoselaimessasi, erityisesti "DNS Name" -luettelo "Subject Alternative Name" -osiossa.
        
Joissakin tapauksissa,sourceUrlkäytät voi olla alias verkkotunnuksen todistuksessa. Esimerkiksi,
         https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ Tämä virhe heitetään, mutta
         https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ Se, joka käyttää verkkotunnusta todistuksessa, ei. Ratkaisu näissä tapauksissa on verkkotunnuksen löytäminen ja käyttö todistuksessa. Jos et löydä sitä todistuksesta, ota yhteyttä palveluntarjoajaan.
        
Muissa tapauksissa todistuksen verkkotunnus voi olla nimiryhmä. Jos tämä tapahtuu tai ongelma on muuten ratkaisematon, pyydämme sähköpostia Chris. Noaa.gov raportoi ongelmasta.
         

#### &lt;addAttributes&gt; {#addattributes} 
* [...] ** &lt;addAttributes&gt; ** ) (#addattribuutti) on OPTIONAL-tunnus jokaiselle tietoaineistolle ja jokaiselle muuttujalle, jonka avullaERDDAPHallinnoijat valvovat tietoaineistoon ja sen muuttujiin liittyviä metatietoja.
    *   ERDDAP™Yhdistä ominaisuuksia tietoaineiston lähteestä ("lähde") ja "addAttributesjonka määritteletdatasets.xml  (joilla on prioriteetti) "Yhdistettyjä ominaisuuksia", jotka ovatERDDAP™käyttäjät näkevät. Näin voit käyttääaddAttributesmäärittää lähdeominaisuuksien arvot uudelleen, lisätä uusia ominaisuuksia tai poistaa attribuutteja.
    * The&lt;addAttributes&gt; Tag sulkee 0 tai enemmän ** &lt;Att &gt; ** subtagit, joita käytetään yksilöllisten ominaisuuksien määrittämiseen.
    * Jokainen ominaisuus koostuu nimestä ja arvosta. (jolla on erityinen tietotyyppi, esimerkiksi kaksinkertainen) .
    * Nimellä voi olla vain yksi ominaisuus. Jos on enemmän, viimeinen on etusijalla.
    * Arvo voi olla yksiarvoinen tai erillinen arvoluettelo.
    * Syntax
        * Järjestyksen&lt;att&gt; subtags sisälläaddAttributesEi ole tärkeää.
        * The&lt;Att &gt; subtag formaatti
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * Kaikkien attribuuttien nimi on aloitettava kirjeellä. (A-Z, a-z) Sisältää vain hahmot A-Z, a-z, 0-9 tai ".
        * Jos&lt;att&gt; subtagilla ei ole arvoa tai nollan arvoa, tämä ominaisuus poistetaan yhdistetyistä ominaisuuksista.
Esimerkiksi,&lt;att name="rivit" /&gt; poistaa rivit yhdistetyistä ominaisuuksista.
Esimerkiksi,&lt;Att-nimi = "koordinaatit"&lt;/att&gt; poistaa koordinaatit yhdistetyistä ominaisuuksista.
##### attribuutti Tyyppi{#attributetype} 
* (Optioiden tyyppiarvo)&lt;Att &gt; subtags (#attributetypia) ilmoitetaan arvojen tietotyyppi. Oletustyyppi on String. Esimerkki Stringin attribuutista on:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * Yksittäisten arvojen tyypit ovat tavuja (8-bittinen kokonaisluku) Lyhyt (16-bittinen allekirjoitettu kokonaisluku) Int (32-bittinen allekirjoitettu kokonaisluku) Pitkä (64-bittinen allekirjoitettu kokonaisluku) Float (32-bittinen kellumispiste) Kaksinkertainen (64-bittinen kellumispiste) Char ja String. Esimerkiksi,
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
Katso nämä muistiinpanot aiheesta[Char Data Tyyppi](#char).
Katso nämä muistiinpanot aiheesta[Pitkä data](#long).
        
    * Valid-tyypit avaruuteen erotetuille arvoluetteloille (Yksittäiset arvot) ovat byteList, shortlist, allekirjoittamatonShortList, charlist, intList, longList, floatList, kaksinkertainen Luettelo. Esimerkiksi,
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
Allekirjoittamattoman LyhytListin avulla voit määrittää luettelon allekirjoittamattomista shortseista, mutta ne muunnetaan luetteloksi vastaavista Unicode-merkeistä (esim. 65 67 69).
Jos määrität charlistin, koodaa mitä tahansa erikoismerkkejä (esim. tilaa, kaksinkertaisia tarjouksia, backslash),&lt;#32, tai #127, kuten olisit koodannut ne NCCSV-tiedoston osassa. (esim. ", """ tai """", "," tai """" ", "\\n"U20ac") .
Ei ole stringlistiä. Säilytä String arvot moniviivaisena String. Esimerkiksi,
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### Globaalit ominaisuudet{#global-attributes} 
* [...] ** Globaalit ominaisuudet / Global Attributes&lt;addAttributes&gt; ** ) (#globaalit ominaisuudet) -----
    &lt;addAttributes&gt; OPTIONAL-tunnisteet&lt;Dataset&gt;-tunnisteet, joita käytetään koko tietoaineistoon sovellettavien ominaisuuksien muuttamiseen.
    
    *    ** Käytä maailmanlaajuista&lt;addAttributes&gt; muuttaa aineiston maailmanlaajuisia ominaisuuksia. ** ERDDAP™yhdistää aineiston lähteen globaalit ominaisuudet (** Lähde **) ja globaali** addAttributes **jonka määritteletdatasets.xml  (joilla on prioriteetti) tehdä maailmanlaajuinen** Yhdistetyt ominaisuudet ** jotka ovat mitäERDDAP™käyttäjät näkevät. Näin voit käyttääaddAttributesmäärittää lähdeominaisuuksien arvot uudelleen, lisätä uusia ominaisuuksia tai poistaa attribuutteja.
    * Näe [ ** &lt;addAttributes&gt; **Tietoa) (#addattribuutti) joka koskee globaaleja ja muuttuvia** &lt;addAttributes&gt; ** .
    *   [FGDC](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html)ja[ISO 19115-2/19139](https://en.wikipedia.org/wiki/Geospatial_metadata)Metadata ----- normaalisti,ERDDAP™ISO 19115-2/19139 ja FGDC (FGDC-STD-001-1998) XML-metadatatiedostot jokaiseen tietoaineistoon käyttäen tietoja tietoaineiston metadatasta. Niin, **Hyvä metadata johtaa hyväänERDDAPISO 19115 ja FGDC metadata. Harkitse paljon aikaa ja vaivaa tietoaineistojen metatietojen parantamiseksi (Mikä on hyvä asia joka tapauksessa) .** Suurin osa ISO 19115:n ja FGDC:n metatietojen tuottamiseen käytetyistä aineistoista on peräisin[ACDD-metadatastandardi](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Ne on niin sanottu alla.
    * Monet globaalit ominaisuudet ovat erityisiäERDDAP™Etsi niitä ja käytä niitä eri tavoin. Esimerkiksi linkkiinfoUrlSisältää verkkosivut, joilla on luettelo tietoaineistoista ja muista paikoista, jotta käyttäjät voivat saada lisätietoja tietoaineistosta.
    * Kun käyttäjä valitsee tietojen alaryhmän, muuttujan pituus, leveys, korkeus, muuttujan pituus (tai syvyys) ja aikavälit (Esimerkiksi Southernmost \\Northing, Northernmost \\Northing, time coverage \\start, time coverage) Ne luodaan tai päivitetään automaattisesti.
    * Yksinkertainen otos maailmanlaajuisesti&lt;addAttributes&gt; on:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
Tyhjä cwhdf \\version attribuutti aiheuttaa lähteen cwhdf \\version attribuutin (Jos) poistetaan lopullisesta, yhdistetystä attribuuttilistasta.
    * Näiden tietojen toimittaminen auttaaERDDAP™Tehdä parempaa työtä ja auttaa käyttäjiä ymmärtämään aineistoja.
Hyvä metatieto tekee datasta käyttökelpoisen.
Riittämätön metatieto tekee datasta hyödyttömän.
Ota aikaa tehdä hyvää työtä metatietojen kanssa.
##### Globaalit erityispiirteetERDDAP™
###### Hyväksyminen{#acknowledgement} 
*   [ **Hyväksyminen** ](#acknowledgement)ja **Tunnustus**   (From the[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) Ryhmä tai ryhmät, jotka antoivat tukea (Erityisesti taloudellisesti) hankkeeseen, joka on luonut nämä tiedot. Esimerkiksi,
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
Huomaa, että ACDD 1.0 ja 1.1 käyttivät loitsua "tunnustuksen" (Tämä on tavallinen kirjoitus Yhdysvalloissa.) ACD 1.3 muutti tämän "tunnustuksen" (Tämä on tavallinen kirjoitus Britanniassa.) . Ymmärrän, että muutos oli olennaisesti onnettomuus ja etteivät he tietenkään tunnistaneet muutoksen tapahtumia. Mikä sotku&#33; Maailmassa on miljoonia datatiedostoja, joilla on "tunnustus" ja miljoonia, joilla on "tuntemus". Tämä korostaa "yksinkertaisia" muutoksia standardiin ja korostaa standardien vakautta. ACDD 1.3 (Mikä on ACDD:n versioERDDAP™Tukea) "Tunnistaminen" tarkoittaa sitä, mitäERDDAP™  (GenerateDatasets XM) kannustaa.
     
###### cdm \\ t \\ \\ t \\ t{#cdm_altitude_proxy} 
*   [ **cdm \\ t \\ \\ t \\ t** ](#cdm_altitude_proxy)EDDTable-tietoaineistot, joilla ei ole korkeutta tai syvyyttä muuttujaa, mutta joilla on muuttuja, joka on korkeuden tai syvyyden välikappale. (Paine, sigma, pullonumero) Voit käyttää tätä ominaisuutta tunnistaaksesi tämän muuttujan. Esimerkiksi,
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
Jos[cd | | | _ _ _ _ _](#cdm_data_type)Profiili tai TrajectoryProfile ei ole korkeutta tai syvyyttä muuttuja, cd \\altitude \\xy on määriteltävä. Jos cdm \\altitude \\proxy on määritelty,ERDDAP™Lisätään seuraavat metatiedot muuttujaan: | Koordinaatti AxisType = Korkeus ja akseli = Z.
     
###### cd | | | _ _ _ _ _{#cdm_data_type} 
*   [ **cd | | | _ _ _ _ _** ](#cdm_data_type)  (From the[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) on maailmanlaajuinen ominaisuus, joka osoittaaUnidata [Yhteinen datamalli](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html)Datan tyyppi. Esimerkiksi,
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
CDM kehittyy ja voi muuttua.ERDDAP™noudattaa asiaan liittyviä ja yksityiskohtaisempia[Discrete Sampling Geometria (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Luvun luku[CF 1.6](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Metadata-sopimukset (Aiemmin CF Point Observation Convention) .
    * Joko aineiston maailmanlaajuinen[Lähde](#global-attributes)tai maailmanlaajuisesti&lt;addAttributes&gt; Mukana on myös cd ́data ́pe attribuutti. Muutamia tiedostotyyppejä (kuin EDDTable Lähde:Obis) Tämä asetetaan automaattisesti.
    * For ForEDDGridtietoaineistot, cd \\data \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ t \\ \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t t t t t t t t t t t t t t t \\ t t t t t t t t t t t t t t t t t t t t t t t t t t t t t; t t t t t t t t t t t t t t t t t t t t; t t t t t (Oletusarvo ja ylivoimaisesti yleisin tyyppiEDDGridDataa) MovingGrid, Other, Point, Profile, RadialSweep, TimeSeries, TimeSeriesProfile, Swath, TrajectoryProfile ja TrajectoryProfile. Tällä hetkellä,EDDGridei edellytä, että mitään siihen liittyvää metatietoa määritellään, eikä se tarkista, että tiedot vastaavat cdm data tyyppiä. Se todennäköisesti muuttuu lähitulevaisuudessa.
    * EDDTable käyttää cdm_data-tyyppiä tiukalla tavalla CF:n DSG-eritelmän jälkeen CDM:n sijaan, jota ei jostain syystä ole päivitetty DSG:n mukaiseksi. Jos aineiston metatiedot eivät täytäERDDAPcd | | _ _ _ _ _ (Katso alapuolelta) aineisto ei kuormita ja tuottaa[Virheilmoitus](#troubleshooting-tips). (Se on hyvä asia siinä mielessä, että virheilmoitus kertoo, mikä on vialla, jotta voit korjata sen.) Jos tietoaineiston tiedot eivät vastaa aineiston metatietojen asennusta (jos tietyllä asemalla on useampi kuin yksi leveysarvo aikasarjassa) Jotkin tietopyynnöt palauttavat virheelliset tiedot vastauksessa. Varmista, että saat kaiken oikein.
        
Kaikille näille aineistoille, yleissopimuksissa jaMetadata\\_ConventionsGlobaalit ominaisuudet, katso CF-1.6 (ei CF-1.0, 1.1, 1.2, 1.3, 1.4 tai 1,5) Koska CF-1.6 on ensimmäinen versio, joka sisältää Discrete Sampling Geometrian muutokset. (DSG) yleissopimuksia.
        *   **ERDDAP™ei-yksinkertainen suhde CF DSG** 
        *   ERDDAP™voi tehdä voimassa olevan DSG-tietoaineiston lähdeaineistosta, joka on jo voimassa oleva DSG-tiedosto. (s) tai lähdeaineistosta, jota ei ole perustettu DSG:lle, mutta se voidaan tehdä metatietojen muutoksilla. (Osa niistä onERDDAP- erityistä, jotta voidaan tarjota yleisempi lähestymistapa DSG-asetuksen määrittämiseen) .
        *   ERDDAP™Tekee paljon validiteettitestejä, kun se lataa tietoaineiston. Jos tietokanta, jolla on cdm \tatype (tai taifeatureType) Hyödynnä onnistuneesti kuormituksiaERDDAP™sittenERDDAP™Sanotaan, että aineisto täyttää DSG-vaatimukset. (muuten,ERDDAP™Poikkeus selitti ensimmäisen ongelman, jonka se löysi.) .
VAROITUS: onnistuneesti ladattu tietoaineisto näyttää täyttävän DSG-vaatimukset (Siinä on oikea yhdistelmä attribuutteja.) mutta voi silti olla väärässä, mikä johtaa virheellisiin tuloksiin..ncCF ja.ncCFMA-vastetiedostot. (Ohjelmisto on jollain tavalla älykäs ja epävarma.) 
        * Kun katsot aineiston metatietojaERDDAP™DSG-aineisto näyttää olevanERDDAPSisäinen muoto (Jättiläinen, tietokantainen pöytä) . Se ei ole yksi DSG-muodoista. (Metadata ja mitat eivät ole oikeassa) mutta tiedot, joita tarvitaan aineiston käsittelyyn DSG-tietoaineistona, ovat metatietoina. (Esimerkiksi cd data \\ \\ \\ \\ \\ \\ \\ \\ \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t *aCsvListOfStationRelatedVarables (käytetty)* Globaalissa metadatassa ja cf &#123;\\displaystyle \\ole= Timeseries \\id for some variable) .
        * Jos käyttäjä pyytää tietoaineiston osajoukkoa.ncCF (Yksi.ncDSG:n Contiguous Ragged Array -tiedostomuoto) tai tai.ncCFMA-tiedostot (A.ncDSG:n Multidimensional Array -tiedostomuoto) Tämä tiedosto on voimassa oleva CF DSG-tiedosto.
VAROITUS: Jos aineisto on perustettu väärin (Metadatan lupaukset eivät ole totta) Vastaustiedosto on teknisesti pätevä, mutta jollain tavalla virheellinen.
             
###### EDDTable cdm_data_types
* EDDTable datasets, cd \\data | tyyppivaihtoehdot (liittyvät vaatimuksetERDDAP) ovat
###### Pisteitä{#point} 
*   [Pisteitä](#point)Mittausryhmä, joka on otettu liittymättöminä aikoina ja paikoissa.
    * Kuten kaikilla cd data-tyypeillä muilla kuin muilla, Pistetietokannoilla on oltava pituus, leveys ja aikamuuttujat.
###### Profiili{#profile} 
*   [Profiili](#profile)on joukko mittauksia, jotka kaikki otetaan kerralla, yhdellä leveyspituuspaikalla, mutta yli yhdellä syvyydellä. (tai korkeus) . Tietoaineisto voi olla näiden profiilien kokoelma, esimerkiksi 7 profiilia eri paikoista. Tämä cdm &#123;\\displaystyle \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t t \\ t t \\ t t t t t t t t t \\ t t t t t t t t t t t t t t t t \\ t t t t t \\ t t t t t t \\ t t t \\ t t \\ t t \\ \\ t t t t t \\ \\ t t \\ t t \\ t t t t t \\ \\ t
    
* Yksi muuttujista (Esimerkki: Profiili) Mukaantuva attribuutti c \role=profile \\ \\ \\ \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ profiili \\ t \\ t \\ t \\ t \\ t \\ t \\ t t \\ t t \\ t t t t t t t t \\ t t t t t t t t t t t t t t t t t \\ t t t t t t t t t \\ t t t t t t t t t t t t \\ t t t t t t \\ t t t t t t \\ t t t t t t t t
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
Jos muuttuja ei sovellu, harkitse aikamuuttujan käyttöä.
###### cdm + + + muuttumattomat{#cdm_profile_variables} 
* Datan tulee sisältää GlobalAttribute[cdm + + + muuttumattomat](#cdm_profile_variables)jos arvo on erillinen luettelo muuttujista, joilla on kunkin profiilin tiedot. Jossakin profiilissa näiden muuttujien arvojen on oltava vakiona. Esimerkiksi,
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
Luettelossa on oltava cf \role =profile muuttuja ja kaikki muut muuttujat, joilla on tietoa profiilista sekä aika, leveys ja pituus.
Luettelo ei koskaan sisällä korkeutta, syvyyttä tai havaintovaihtoehtoja.
     

\\[Mielipide: cd data \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ Käytännössä tietyt tiedot ovat yleensä joko TimeSeriesProfile. (Profiileja kiinteässä asennossa) TrajectoryProfile (Profiileja matkan varrella) Ja niin pitääkin tunnistaa sellaiseksi.\\]  
###### Aikasarja{#timeseries} 
*   [Aikasarja](#timeseries)Se on mittausten sarja (Esimerkiksi meriveden lämpötila) otettu yhdelle, kiinteälle, leveydelle, pituus, syvyys (tai korkeus) sijainti. (Ajattele sitä "asetukseksi".) Tietokanta voi olla kokoelma näistä TimeSeries-sivustoista, esimerkiksi sekvenssi jokaisesta kolmesta eri paikasta.
    * Yksi muuttujista (Esimerkki: Asema) Mukaantuva attribuutti c \role = Timeseries \\ tunnistaa muuttuja, joka yksilöi asemat.
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### cdm \\ \\ \\ \\ t \\ t \\ t{#cdm_timeseries_variables} 
* Datan tulee sisältää GlobalAttribute[cdm \\ \\ \\ \\ t \\ t \\ t](#cdm_timeseries_variables)jos arvo on erillinen luettelo muuttujista, joilla on kunkin aseman tiedot. Jollekin asemalle näiden muuttujien arvojen on oltava pysyviä. Esimerkiksi,
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
Luettelossa on oltava cf \role = Timeseries \\ muuttuva ja kaikki muut muuttujat, joilla on tietoa asemasta, johon sisältyy lähes aina leveys ja pituus. (korkeus tai syvyys, jos) .
Luettelo ei koskaan sisällä aikaa tai havaintovaihtoehtoja.
* Joillekin sisustetuille kasveille aineistolla voi olla kaksi leveys- ja pituusmuuttujaa:
    1. Yksi leveys ja pituusarvot, jotka ovat vakio (iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii.) . SisälläERDDAP™Anna nämä muuttujatdestinationNameleveys ja pituus, ja sisällyttää nämä muuttujat luetteloon cdm \'aikaseries \\variables.
    2. Tarkka leveys ja pituusarvot liittyvät kunkin havainnon. SisälläERDDAP™Anna nämä muuttujat eridestinationNames (Esim. täsmällinen ja tarkka Lounas) Älä sisällytä näitä muuttujia luetteloon cdm \timeries \\variables.
Tämän perustelut ovat: teoreettisesta näkökulmasta, DSG TimeSeries -aineistosta, leveydestä ja pituudesta. (korkeus tai syvyys, jos) Aseman sijainnin on oltava jatkuvaa.
###### TimesProfiili{#timeseriesprofile} 
*   [TimesProfiili](#timeseriesprofile)- on sekvenssi profiilit otetaan yksi, kiinteä, leveys pituus sijainti. Jokainen profiili on joukko mittauksia, joita tehdään useilla korkeuksilla tai syvyyksillä. Tietoaineisto voi olla näiden TimeSeriesProfiilien kokoelma, esimerkiksi sekvenssi, joka on otettu 12 eri paikkakunnalla.
    * Yksi muuttujista (Esimerkki: Asema) Mukaantuva attribuutti c \role = Timeseries \\ tunnistaa muuttuja, joka yksilöi asemat.
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * Yksi muuttujista (Esimerkki: Profiili) Mukaantuva attribuutti c \role=profile \\ \\ \\ \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ profiili \\ t \\ t \\ t \\ t \\ t \\ t \\ t t \\ t t \\ t t t t t t t t \\ t t t t t t t t t t t t t t t t t \\ t t t t t t t t t \\ t t t t t t t t t t t t \\ t t t t t t \\ t t t t t t \\ t t t t t t t t
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Tietyn profiilin on oltava ainutlaatuinen vain tietyn ajanjakson ajan.) Jos muuttuja ei sovellu, harkitse aikamuuttujan käyttöä.
    * Datajoukkoon on sisällytettävä GlobalAttribute cdm \timeseries \\variables, jossa arvo on koodattu luettelo muuttujista, joilla on tiedot kustakin asemasta. Jollekin asemalle näiden muuttujien arvojen on oltava pysyviä. Esimerkiksi,
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
Luettelossa on oltava cf \role = Timeseries \\ muuttuva ja kaikki muut muuttujat, joilla on tietoa asemasta, johon kuuluu lähes aina leveys ja pituus.
Luettelo ei koskaan sisällä aikaa, korkeutta, syvyyttä tai mitään havaintovaihtoehtoja.
    * Datajoukkoon on sisällyttävä GlobalAttribute cdm \\profile \\variables, jossa arvo on koodattu luettelo muuttujista, joilla on tiedot jokaisesta profiilista. Jossakin profiilissa näiden muuttujien arvojen on oltava vakiona. Esimerkiksi,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
Luettelossa on oltava cf_role=profile-muuttuja ja kaikki muut muuttujat, joilla on profiilista tietoa, joka sisältää lähes aina aikaa.
Luettelo ei koskaan sisällä leveyttä, pituutta, korkeutta, syvyyttä tai mitään havaintovaihtoehtoja.
###### Trajektori{#trajectory} 
*   [Trajektori](#trajectory)- on mittaussarja, joka on otettu matkan varrella (Tie avaruuden ja ajan läpi)   (esim. sea-vesi -aluksen ottama lämpö, kun se liikkuu veden halki) . Tietoaineisto voi olla näiden trajektorien kokoelma, esimerkiksi sekvenssi jokaisesta neljästä eri aluksesta.
    * Yksi muuttujista (Esimerkki: Laiva) Tarvitsemme attribuutin cf àle =trajectory tunnistaaksesi muuttujan, joka tunnistaa kulkueet.
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### cdm _trajectory = muuttuva{#cdm_trajectory_variables} 
* Datan tulee sisältää GlobalAttribute[cdm _trajectory = muuttuva](#cdm_trajectory_variables)jos arvo on erillinen luettelo muuttujista, joilla on tiedot kustakin matkasta. Jossain vaiheessa näiden muuttujien arvojen on oltava pysyviä. Esimerkiksi,
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
Luetteloon on sisällyttävä cf \role =trajectory \\ muuttuva ja kaikki muut muuttujat, joilla on tietoa matkasta.
Luettelo ei koskaan sisällä aikaa, leveyttä, pituutta tai havaintovaihtoehtoja.
###### TrajectoryProfiili{#trajectoryprofile} 
*   [TrajectoryProfiili](#trajectoryprofile)Se on sarja profiileja, jotka on otettu matkan varrella. Tietoaineisto voi olla näiden TrajectoryProfiilien kokoelma, esimerkiksi 14 eri aluksen profiilisarja.
    * Yksi muuttujista (Esimerkki: Laiva) Mukaantuva attribuutti c \role =trajectory = määrittää muuttuja, joka yksilöi reitit.
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * Yksi muuttujista (Esimerkki: Profiili) Mukaantuva attribuutti c \role=profile \\ \\ \\ \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ profiili \\ t \\ t \\ t \\ t \\ t \\ t \\ t t \\ t t \\ t t t t t t t t \\ t t t t t t t t t t t t t t t t t \\ t t t t t t t t t \\ t t t t t t t t t t t t \\ t t t t t t \\ t t t t t t \\ t t t t t t t t
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Tietyn profiilin on oltava uniikki vain tietylle matkalle.) Jos muuttuja ei sovellu, harkitse aikamuuttujan käyttöä.
    * Tietoaineistoon on sisällyttävä GlobalAttribute cdm &#123;\\distrajectory \\variables, jossa arvo on koodattu luettelo muuttujista, joilla on tiedot kustakin radasta. Jossain vaiheessa näiden muuttujien arvojen on oltava pysyviä. Esimerkiksi,
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
Luetteloon on sisällyttävä cf \role =trajectory \\ muuttuva ja kaikki muut muuttujat, joilla on tietoa matkasta.
Luettelo ei koskaan sisällä profiiliin liittyviä muuttujat, aika, leveys, pituus tai havainto muuttujia.
    * Datajoukkoon on sisällyttävä GlobalAttribute cdm \\profile \\variables, jossa arvo on koodattu luettelo muuttujista, joilla on tiedot jokaisesta profiilista. Jossakin profiilissa näiden muuttujien arvojen on oltava vakiona. Esimerkiksi,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
Luettelossa on oltava cf \role =profile muuttuja ja kaikki muut muuttujat, joilla on tietoa profiilista, joka sisältää lähes aina aikaa, leveyttä ja pituutta.
Luettelo ei koskaan sisällä korkeutta, syvyyttä tai havaintovaihtoehtoja.
###### Muut muut{#other} 
*   [Muut muut](#other)Ei ole vaatimuksia. Käytä sitä, jos aineisto ei sovi yhteen muista vaihtoehdoista, erityisesti jos tietoaineisto ei sisällä leveyttä, pituutta ja aikamuuttujaa.
     
###### Liittyvät muistiinpanot{#related-notes} 
* Kaikilla EDDTable-tietokannoilla, joilla on cd data-tyyppi muu kuin "muut" on oltava pituus, leveys ja aikamuuttuja.
* Profiileja sisältävillä tietoaineistoilla on oltava korkeusmuuttuja, syvyysmuuttuja tai[cdm \\ t \\ \\ t \\ t](#cdm_altitude_proxy)muuttuja.
* Jos et voi tehdä tietoaineistoa täyttämään kaikki vaatimukset ihanteellinen cd data-tyyppi, käytä "Point" (joilla on vähän vaatimuksia) Tai ”muut” (joilla ei ole vaatimuksia) Sen sijaan.
* Näitä tietoja käytetäänERDDAP™eri tavoin, mutta enimmäkseen.ncCF-tiedostot (.nctiedostot, jotka täyttävät tietoaineiston cd data-tyyppiin liittyvät Contiguous Ragged Array Representations) ja.ncCFMA-tiedostot (.nctiedostot, jotka täyttävät tietoaineiston cd data-tyyppiin liittyvät moniulotteiset Array-edustustot) määriteltynä[Discrete Sampling Geometria (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Luvun luku[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Metadata-sopimukset, jotka on aiemmin nimetty CF Point Observation Conventions.
* Vihje: Näiden tietojen osalta oikea asetus[subsetVariables](#subsetvariables)on yleensä yhdistelmä kaikki muuttujat lueteltu cdm \\ _variables attributes. Esimerkiksi TimeSeriesProfile käyttää cdm \timeries \\variables plus cdm \\profile \\variables.
###### contributor\\_name {#contributor_name} 
*   [ **contributor\\_name** ](#contributor_name)  (From the[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) RECOMMMENDED Tapa tunnistaa henkilö, organisaatio tai projekti, joka on osallistunut tähän tietoaineistoon (esimerkiksi tietojen alkuperäinen luoja, ennen kuin tämän tietoaineiston luoja on käsitellyt sitä uudelleen.) . Esimerkiksi,
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
Jos "asiantuntija" ei todellakaan koske tietoaineistoa, poista tämä ominaisuus. Verrattuna[creator\\_name](#creator_name)Toisinaan se keskittyy enemmän rahoituslähteeseen.
###### contributor\\_role {#contributor_role} 
*   [ **contributor\\_role** ](#contributor_role)  (From the[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) on oikea tapa tunnistaa[contributor\\_name](#creator_name). Esimerkiksi,
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
Jos "asiantuntija" ei todellakaan koske tietoaineistoa, poista tämä ominaisuus.
###### Yleissopimukset{#conventions} 
*   [ **Yleissopimukset** ](#conventions)  (From the[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Metadata Standard) on vahvasti korjattu. (Se voidaan tulevaisuudessa vaatia.) Arvo on erillinen luettelo metadatastandardeista, joita nämä tiedot noudattavat. Esimerkiksi:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
Yleiset metatiedot, joita käytetäänERDDAP™ovat:
    
    *   [COARDSYleissopimukset](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)Se on CF:n edeltäjä.
    *   [Ilmasto ja ennuste (CF) Yleissopimukset](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)on monien suositeltujen ja tarvittavien ominaisuuksien lähde.ERDDAP. Nykyinen CF-versio on nimeltään CF-1.6.
    * TheNetCDFTietoaineiston löytämisen yleissopimus (ACDD) on monien suositeltujen ja tarvittavien ominaisuuksien lähde.ERDDAP. Alkuperäinen versio ACDD (Ethan Davisin loistava työ) tunnistettiin, koska[UnidataTietojen löytyminen v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)Nykyinen (Aloitetaan vuonna 2015) 1.3 ACDD-versio määritellään[ACD-1,3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3). Jos tietosi ovat käyttäneetUnidataDataset Discovery v1.0, suosittelemme[vaihda tietoaineistosi ACD-1.3:n käyttöön](#switch-to-acdd-13).
    
Jos tietoaineistosi noudattaa joitakin muita metatietoja koskevia standardeja, lisää nimi CSV-luetteloon yleissopimuksissa.
###### coverage\\_content\\_type {#coverage_content_type} 
*   [ **coverage\\_content\\_type** ](#coverage_content_type)  (From the[ISO 19115](https://en.wikipedia.org/wiki/Geospatial_metadata)Metadata Standard) RECOMMENDED Tapa tunnistaa verkkotietojen tyyppi (SisälläEDDGridDataa) . Esimerkiksi,
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
Ainoat sallitut arvot ovat apuinformaatio, kuva, malliResult, fyysinen Mittaus (Oletusarvo, kun ISO 19115 -metadataa käytetään) laadunvarmistus, referenssitieto ja temaattinen luokittelu. (Älä käytä tätä tunnistetta EDDTable-tietokoneisiin.)   
###### creator\\_name {#creator_name} 
*   [ **creator\\_name** ](#creator_name)  (From the[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) on oikea tapa tunnistaa henkilö, organisaatio tai projekti (jos kyseessä ei ole henkilö tai organisaatio) Vastuullisin luomisesta (Viimeisin uusintakäsittely) näistä tiedoista. Esimerkiksi,
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
Jos tietoja on käsitelty laajasti (Satelliittitiedot tasosta 2 tasolle 3 tai 4) , sitten yleensä uudelleenkäsittelijä on lueteltu luoja ja alkuperäinen luoja on lueteltu kautta.[contributor\\_name](#contributor_name). Verrattuna[Hankkeen projekti](#project)Tämä on joustavampaa, koska se voi tunnistaa henkilön, organisaation tai projektin.
###### creator\\_email {#creator_email} 
*   [ **creator\\_email** ](#creator_email)  (From the[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) on oikea tapa tunnistaa sähköpostiosoite (oikein muotoiltu) Tämä antaa tavan ottaa yhteyttä luojaan. Esimerkiksi,
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
###### creator\\_url {#creator_url} 
*   [ **creator\\_url** ](#creator_url)  (From the[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) on RECOMMENDED tapa tunnistaa URL-osoite organisaatiolle, joka loi tietoaineiston tai URL-osoitteen, jossa on luojan tiedot tästä tietoaineistosta. (Tämä on enemmänkin tarkoitus[infoUrl](#infourl)) . Esimerkiksi,
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
###### date\\_created {#date_created} 
*   [ **date\\_created** ](#date_created)  (From the[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) on määritetty tapa määrittää päivämäärä, jona tiedot luotiin ensimmäisen kerran. (esimerkiksi jalostettuna tähän muotoon) ISO 8601 -muodossa. Esimerkiksi,
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
Jos tietoaineistoon lisätään säännöllisesti tietoja, tämä on ensimmäinen päivämäärä, jolloin alkuperäiset tiedot ovat saatavilla.
###### date\\_modified {#date_modified} 
*   [ **date\\_modified** ](#date_modified)  (From the[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) on oikaistu tapa määrittää päivämäärä, jona tietoja on viimeksi muutettu (esimerkiksi silloin, kun virhe on korjattu tai kun uusimmat tiedot on lisätty) ISO 8601 -muodossa. Esimerkiksi,
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
###### date\\_issued {#date_issued} 
*   [ **date\\_issued** ](#date_issued)  (From the[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) RECOMMMENDED-menetelmä määrittää päivämäärä, jona tiedot ensimmäisen kerran asetettiin muiden saataville, esimerkiksi ISO 8601 -muodossa 2012-03-15. Esimerkiksi,
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
Esimerkiksi aineistolla voi olla[date\\_created](#date_created)Vuosina 2010-01-30, mutta se on julkistettu vain 2010-07-30.date\\_issuedkäytetään vähemmän kuindate\\_createdjadate\\_modified. Josdate\\_issuedon jätetty pois, sen oletetaan olevan sama kuindate\\_created.
###### MaailmanlaajuinendrawLandMask {#global-drawlandmask} 
*   [ **drawLandMask** ](#global-drawlandmask)----- Tämä on maailmanlaajuinen ominaisuus, jota käytetäänERDDAP™  (Ei metatietoja) joka määrittää "Draw Land Mask" -vaihtoehdon oletusarvon tietoaineiston Make A Graph -muodossa ( *datasetID* .grafiikka) &.land-parametri URL-osoitteessa, jossa pyydetään tietojen karttaa. Esimerkiksi,
    ```
    <att name="drawLandMask">over</att>  
    ```
Nähdään[drawLandMaskYleiskatsaus](#drawlandmask).
###### featureType {#featuretype} 
*   [ **featureType** ](#featuretype)  (From the[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Metadata Standard) on otettu käyttöön ja/tai palautettu. Jos aineisto on[cd | | | _ _ _ _ _](#cdm_data_type)on sopiva,ERDDAP™käyttää sitä automaattisesti luodakseenfeatureTypeattribuutti. Siksi sinun ei tarvitse lisätä sitä.
    
Jos kuitenkin käytät[EDDTableFromNcFiles](#eddtablefromnccffiles)luoda tiedostoja, jotka seuraavat[CF Discrete Sampling Geometria (DSG) Standard standard standard standard standard standard standard standard standard standard standard standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Tiedostoilla on oltavafeatureTypeoikein määritelty, niin ettäERDDAP™Voit lukea tiedostoja oikein. Tämä on osa CF DSG-vaatimuksia tällaiselle tiedostolle.
     
###### Historian historia{#history} 
*   [ **Historian historia** ](#history)  (From the[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)ja[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metatiedot) RECOMMMENDED multi-line String Global attribuutti, jossa on linja jokaiseen tietojen käsittelyvaiheeseen. Esimerkiksi,
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * Ihannetapauksessa jokaisella linjalla on ISO 8601:2004. (E) Päivämäärä + TimeZ (2011-08-05T08:55:02Z) jälkeen kuvaus käsittelyvaiheesta.
    *   ERDDAP™Luo tämä, jos sitä ei ole jo olemassa.
    * Jos se on jo olemassa,ERDDAP™Lisätään uusia tietoja olemassa oleviin tietoihin.
    * Historia on tärkeää, koska se antaa asiakkaille mahdollisuuden siirtyä alkuperäiseen tietolähteeseen.
###### infoUrl {#infourl} 
*   [ **infoUrl** ](#infourl)on REQUIRED-maailmanlaajuinen attribuutti, jonka URL-osoite on verkkosivusto, jossa on lisätietoja tästä tietoaineistosta. (Yleensä lähdelaitoksen verkkosivuilla) . Esimerkiksi,
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * Joko aineiston maailmanlaajuinen[Lähde](#global-attributes)tai maailmanlaajuisesti&lt;addAttributes&gt; Täytyy sisällyttää tämä attribuutti.
    *   infoUrlTämä on tärkeää, koska asiakkaat voivat saada lisätietoja alkuperäisestä lähteestä.
    *   ERDDAP™Näytä linkkiinfoUrlTietoaineiston Access Form ( *datasetID* .html) Tee Graph Web-sivu ( *datasetID* .grafiikka) ja muut sivut.
    * Jos URL-osoitteessa on kyselyosa (jälkeen "?) Sen on oltava jo[% koodattu](https://en.wikipedia.org/wiki/Percent-encoding). Sinun on koodattava erityishahmoja rajoitteisiin. (muu kuin alkuperäinen & tärkein'='jos mikä tahansa) muotoon %H, jossa HH on luonteen kaksinumeroinen heksadesimaalinen arvo. Yleensä sinun tarvitsee vain muuntaa muutamia täsmällisyysmerkkejä: %25, ja %26, %22,&lt;%3C, = %3D, &gt; %3E, + %2B,|%7C,\\[%5B,\\]%5D, tila %20 ja muunna kaikki yli #127-merkit UTF-8-muodoksi ja sitten kooditavut UTF-8-muodossa %H-muotoon (Kysy ohjelmoijalta apua) .
Esimerkiksi &stationID&#123;&#123;41004&#125;&#125;
Tulee &stationID%3E= %2241004 %22 %
Koodaus on yleensä tarpeen, kun käytätERDDAPMuun ohjelmiston kuin selaimen kautta. Selaimet käsittelevät yleensä prosenttiosuuden koodausta.
Joissakin tilanteissa sinun on koodattava kaikki muut hahmot kuin A-Za-z0-9. """ () *, mutta älä koodaa alkuperäistä & tai pääosaa'='.
Ohjelmointikielillä on työkaluja tähän (ks.Java&gt;[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)  
jaJavaKäsikirjoitus [encodeURIComponent()) ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) ja on
        [Verkkosivut, jotka prosenttiin koodaavat/dekoodaavat sinulle](https://www.url-encode-decode.com/).
    * Siitä lähtiendatasets.xmlXML-tiedosto, sinun täytyy myös ja koodata kaikki ja&lt;"ja" URL-osoitteessa "&amp;"&lt;&gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt;
    *   infoUrlon ainutlaatuinenERDDAP. Se ei ole minkäänlaista metadataa.
###### institutionaalinen{#institution} 
*   [ **institutionaalinen** ](#institution)  (From the[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)ja[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metatiedot) REQUIRED-maailmanlaajuinen ominaisuus, jossa on lyhyt versio laitoksen nimestä, joka on näiden tietojen lähde (yleensä akronyymi, yleensä akronyymi).&lt;20 merkkiä). Esimerkiksi,
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * Joko aineiston maailmanlaajuinen[Lähde](#global-attributes)tai maailmanlaajuisesti&lt;addAttributes&gt; Täytyy sisällyttää tämä attribuutti.
    *   ERDDAP™Näytä laitos aina, kun se näyttää luettelon tietoaineistoista. Jos laitoksen nimi on pidempi kuin 20 merkkiä, vain ensimmäiset 20 merkkiä näkyvät tietoaineistojen luettelossa. (Mutta koko instituutio on nähtävissä laittamalla hiiren kursorin viereiseen ikoniin.) .
    * Jos lisäät laitoksen luetteloon&lt;categoryAttributes&gt; SisälläERDDAP&gt;[Asennus.xml](/docs/server-admin/deploy-install#setupxml)tiedosto, käyttäjät voivat helposti löytää tietoja samasta laitoksestaERDDAP"Tietoaineistojen etsiminen luokasta" kotisivulla.
###### Avainsanat{#keywords} 
*   [ **Avainsanat** ](#keywords)  (From the[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) RECOMMMENDED-yhteensopiva luettelo sanoista ja lyhyistä lauseista (esimerkiksi[GCMD Tieteen avainsanat](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access)) joka kuvaa tietoaineistoa yleisesti, eikä oleta muuta tietoaineiston osaamista (esimerkiksi valtameritietoihin, mukaan lukien valtameri) . Esimerkiksi,
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
Siitä lähtiendatasets.xmlXML-dokumentti, hahmot ja&lt;ja &gt; attribuutissa, kuten avainsanat (esim. GCMD-tieteiden avainsanojen &gt; hahmot) on koodattava &amp;&lt;&gt, vastaavasti.
Kun aineisto on ladattuERDDAP,
    
    * "Maantiede" on lisätty minkä tahansa GCMD-avainsanan alkuun.
    * GCMD-avainsanat muunnetaan otsikkotapaukseksi (Ensimmäiset kirjaimet sijoitetaan) .
    * Avainsanat palautetaan järjestykseen ja kaikki uudet hahmot poistetaan.
     
###### keywords\\_vocabulary {#keywords_vocabulary} 
*   [ **keywords\\_vocabulary** ](#keywords_vocabulary)  (From the[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) RECOMMMENDED-ominaisuus: jos noudatat ohjeita avainsanojen ominaisuuksiin sisältyville sanoille/lauseille (Esimerkiksi GCMD Science Keywords) Laita tämän ohjeen nimi tänne. Esimerkiksi,
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### lisenssi lisenssi lisenssi lisenssi{#license} 
*   [ **lisenssi lisenssi lisenssi lisenssi** ](#license)  (From the[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) Se on vahvasti sovitettu maailmanlaajuinen ominaisuus lisenssi- ja/tai käyttörajoituksilla. Esimerkiksi,
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * Jos "\\[Standard standard standard standard standard standard standard standard standard standard standard standard\\]"Tarkoittaa attribuuttiarvoa, se korvataan standardilla.ERDDAP™lisenssistä&lt;StandardLicense &gt; Tag inERDDAP&gt;
        \\[Tom\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/viestejä.xml-tiedosto.
         
###### Metadata\\_Conventions {#metadata_conventions} 
*   [ **Metadata\\_Conventions** ](#metadata_conventions)on peräisin vanhentuneista[ACD 1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)  (jotka on tunnistettuMetadata\\_Conventionskuin "UnidataDataset Discovery v1.0) Metadatastandardi. Attribuuttiarvo oli koodattu luettelo metadatan yleissopimuksista, joita tämä tietoaineisto käyttää.
Jos aineisto käyttää ACD 1.0:aa, tämä ominaisuus on vahvasti valmistettu, esimerkiksi
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
Mutta kuitenkinERDDAP™Suosittelemme ACD-1.3:aa. Jos sinulla on[siirtää tietoaineistosi ACDD-1.3:n käyttöön](#switch-to-acdd-13)käyttääMetadata\\_ConventionsVälttämätön: Käytä [&lt;Yleissopimukset » (#konventiot) Sen sijaan.
###### processing\\_level {#processing_level} 
*   [ **processing\\_level** ](#processing_level)  (From the[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) Rekisteröity tekstikuvaus käsittelystä (esimerkiksi[Nasan satelliittitietojen käsittelytaso](https://en.wikipedia.org/wiki/Remote_sensing#Data_processing_levels)Esimerkiksi taso 3) Laadunvalvonta (Esimerkiksi tieteen laatu) datasta. Esimerkiksi,
    ```
    <att name="processing\\_level">3</att>  
    ```
###### Hankkeen projekti{#project} 
*   [ **Hankkeen projekti** ](#project)  (From the[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) OPTIONAL-ominaisuus tunnistaa projekti, johon tietoaineisto kuuluu. Esimerkiksi,
    ```
    <att name="project">GTSPP</att>  
    ```
Jos aineisto ei ole osa projektia, älä käytä tätä ominaisuutta. Verrattuna[creator\\_name](#creator_name)Tämä keskittyy projektiin (ei henkilöä tai organisaatiota, joka voi osallistua useisiin projekteihin) .
###### publisher\\_name {#publisher_name} 
*   [ **publisher\\_name** ](#publisher_name)  (From the[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) on RECOMMMENDED tapa tunnistaa henkilö, organisaatio tai projekti, joka julkaisee tämän tietoaineiston. Esimerkiksi,
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
Olet esimerkiksi kustantaja, jos toinen henkilö tai ryhmä[luotu](#creator_name)tiedostot ja annat ne vain uudelleenERDDAP. Jos "julkaisija" ei todellakaan koske tietoaineistoa, poista tämä ominaisuus. Verrattuna[creator\\_name](#creator_name)Kustantaja ei todennäköisesti ole merkittävästi muokannut tai käsitellyt tietoja; kustantaja on juuri asettanut tiedot saataville uudessa paikassa.
###### publisher\\_email {#publisher_email} 
*   [ **publisher\\_email** ](#publisher_email)  (From the[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) on oikea tapa tunnistaa sähköpostiosoite (oikein muotoiltu, esim. John'smith@great.org) Tämä antaa mahdollisuuden ottaa yhteyttä kustantajaan. Esimerkiksi,
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
Jos "julkaisija" ei todellakaan koske tietoaineistoa, poista tämä ominaisuus.
###### publisher\\_url {#publisher_url} 
*   [ **publisher\\_url** ](#publisher_url)  (From the[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) on RECOMMENDED tapa tunnistaa URL-osoite organisaatiolle, joka on julkaissut tietoaineiston tai URL-osoitteen julkaisijan tietojen kanssa (Tämä on enemmänkin tarkoitus[infoUrl](#infourl)) . Esimerkiksi,
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
Jos "julkaisija" ei todellakaan koske tietoaineistoa, poista tämä ominaisuus.
###### real\\_time {#real_time} 
*   [ **real\\_time** ](#real_time)Global String Attribute (Ei millään standardilla) Tämä viittaa siihen, onko kyseessä reaaliaikainen tieto. Esimerkiksi,
    ```
    <att name="real\\_time">true</att>  
    ```
Jos tämä on väärää (Oletusarvo) ,ERDDAP™välimuistivastaukset tiedostotyyppeihin, joissa koko tiedosto on luotava ennenERDDAP™Voit lähettää vastauksen käyttäjälle ja käyttää niitä uudelleen enintään 15 minuuttia. (esim..nc.png) .
Jos tämä on totta,ERDDAP™Älä koskaan välitä vastaustiedostoja ja palauttaa aina äskettäin luotuja tiedostoja.
###### sourceUrlattribuutti{#sourceurl-attribute} 
*   [ **sourceUrl** ](#sourceurl-attribute)on maailmanlaajuinen ominaisuus tietojen lähteen URL-osoitteen kanssa. Esimerkiksi,
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (Laita kaikki yhteen linjaan) 
    *   ERDDAP™Yleensä tämä globaali ominaisuus syntyy automaattisesti. Kaksi poikkeusta ovat EDDTableFromHyraxTiedostot ja EDDTableFromThreddsFiles.
    * Jos lähde on paikallinen tiedostoja ja tiedostot on luonut organisaatio, käytä
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * Jos tietolähde on paikallinen tietokanta ja tieto on organisaatiosi luomaa, käytä
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *   sourceUrlTämä on tärkeää, koska se antaa asiakkaille mahdollisuuden siirtyä alkuperäiseen tietolähteeseen.
    *   sourceUrlon ainutlaatuinenERDDAP. Se ei ole minkäänlaista metadataa.
        
###### standard\\_name\\_vocabulary {#standard_name_vocabulary} 
*   [ **standard\\_name\\_vocabulary** ](#standard_name_vocabulary)  (From the[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) on räätälöity ominaisuus, jolla tunnistetaan kontrolloidun sanaston nimi, josta muuttujat[standard\\_name](#standard_name)s otetaan. Esimerkiksi,
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
versio 77[CF-standardin nimi](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html).
         
##### subsetVariables {#subsetvariables} 
*    **subsetVariables**   (Vain EDDTable-tietokannat) RECOMMMENDED Globaali attribuutti, jonka avulla voit määrittää erillisen luettelon.&lt;dataVariable&gt; (#Datavariable)  [destinationName](#destinationname)määrittää muuttujia, joilla on rajallinen määrä arvoja (toista tapaa: muuttujia, joilla jokaisella arvolla on useita kaksoiskappaleita) . Esimerkiksi,
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
Jos tämä ominaisuus on olemassa, tietoaineistolla on *datasetID* .subset verkkosivut (Linkki siihen kaikissa tietoaineistoluetteloissa) jonka avulla käyttäjät voivat nopeasti ja helposti valita eri osa-alueita.
    * joka kerta, kun aineisto on ladattu,ERDDAPkuormat ja varastot levylle pöydälle, jossa on kaikki erilliset () Alijoukkojen yhdistelmät Muuttujien arvot.ERDDAP™voi lukea, ettäsubsetVariablesPöytää ja käsitellä sitä nopeasti (Verrattuna useiden tiedostojen lukemiseen tai tietokannan tai muun ulkoisen palvelun tietojen hankkimiseen) .
    * Tämä salliiERDDAP™3 asiaa:
        1. Se salliiERDDAP™Laittaa luettelo mahdollisista arvoista tietojen saatavuuslomakkeeseen, tehdä Graph-verkkosivu ja .subset-sivut.
        2. Se salliiERDDAP™tarjota .subset-sivustoa kyseiselle tietoaineistolle. Tämä sivu on mielenkiintoinen, koska sen avulla on helppo löytää päteviä yhdistelmiä näiden muuttujien arvoista, joita tietyille aineistoille ja tietyille muuttujille on erittäin, erittäin vaikeaa. (Melkein mahdotonta) . Kaikki käyttäjät vaativat erikseen () substanssi Muuttuvat tiedot ovat erittäin nopeita.
        3. Jos on olemassa käyttäjäpyyntö, joka viittaa vain näiden muuttujien osajoukkoon,ERDDAP™voi nopeasti lukeasubsetVariablespöytään ja vastaa pyyntöön. Tämä voi säästää aikaa ja vaivaaERDDAP.
    * JärjestyksendestinationNamemäärität, millainen järjestys on *datasetID* .subset web-sivu, joten määrität yleensä tärkeimmät muuttujat ensin, sitten vähiten tärkeä. Esimerkiksi tietoaineistoissa, joissa on aikasarjatietoja useille asemmille, saatat käyttää esimerkiksi
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
niin, että arvot on määritetty asetuksella.
    * On tietenkin sinun valintasi, mitkä muuttujat sisällyttävätsubsetVariablesLuettelo, mutta ehdotettu käyttö on:
        
Sisältää muunnelmia, joita haluatERDDAP™Näytä pudotusluettelo vaihtoehdoista tietoaineiston Access-muodossa (.html) Make-A-Graph (.grafiikka) verkkosivut.
        
Yleisesti ottaen sisältää muunnelmia, joissa on tietoa tietoaineiston ominaisuuksista. (asemat, profiilit ja/tai kulkuvälineet, erityisesti[cdm \\ \\ \\ \\ t \\ t \\ t](#cdm_timeseries_variables),[cdm + + + muuttumattomat](#cdm_profile_variables),[cdm _trajectory = muuttuva](#cdm_trajectory_variables)) . Näille muuttujille on vain muutamia erilaisia arvoja, joten ne toimivat hyvin pudotuslistoilla.
        
Älä koskaan sisällytä yksittäisiin havaintoihin liittyviä tietoja (esimerkiksi aika, lämpötila, suolapitoisuus, nykyinen nopeus) SisälläsubsetVariablesLista. Näille muuttujille on liikaa erilaisia arvoja, joten pisara-lista olisi hidas kuormattavaksi ja on vaikea työskennellä yhdessä. (tai ei työtä) .
        
    * Jos näiden muuttujien erillisten yhdistelmien määrä on suurempi kuin 1 000 000 000, kannattaa harkita niiden rajoittamista.subsetVariablesmääritellään erillisten yhdistelmien määrän vähentämiseksi alle 1 000 000 000:een; muuten *datasetID* .subset-sivut voidaan tuottaa hitaasti. Äärimmäisissä tapauksissa aineisto ei voi ladataERDDAP™Erilaisten yhdistelmien muodostaminen käyttää liikaa muistia. Jos näin on, sinun on poistettava joitakin muuttujiasubsetVariablesLista.
    * Jos yksittäisen osasarjamuuttujan erillisten arvojen määrä on suurempi kuin 20 000, sinun ei pidä ottaa huomioon tätä muuttujaa luettelossa.subsetVariablesmuuten kestää kauan välittää *datasetID* .subset, *datasetID* .grafia ja *datasetID* .html-sivut. Lisäksi Macissa on erittäin vaikea tehdä valintoja pisaralta alas -listalla, jossa on yli 500 tuotetta, koska selainpalkki puuttuu. Kompromissi on: poista muuttujia luettelosta, kun käyttäjät eivät todennäköisesti valitse arvoja pudotusluettelosta.
    * Sinun pitäisi testata kaikki tiedot nähdäksesi, onkosubsetVariablesAsetus on ok. Jos tietopalvelin on hidas ja se kestää liian kauan (tai epäonnistuu) tietojen lataaminen, joko muuttujien määrän vähentäminen tai poistaminensubsetVariablesGlobaali attribuutti.
    * Alijäämä Muuttujat ovat erittäin hyödyllisiä. Jos tietosi sopivat, luosubsetVariablesattribuutti.
    * EDDTableFromSOSLisää automaattisesti
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
kun aineisto on luotu.
        * Mahdolliset varoitukset: jos käyttäjä käyttää *datasetID* .subset-sivusto valitsee arvon, jolla on kuljetuspalautus tai uudet linjat, *datasetID* .subset epäonnistuu.ERDDAP™Tämä ei voi tapahtua HTML-tietojen vuoksi. Joka tapauksessa on lähes aina hyvä idea poistaa kuljetuspalautus ja uudet linjat. Ongelman korjaamiseksi, jos EDDTable.subsetVariablesData-menetelmässäERDDAPhavaitsee tietoarvoja, jotka aiheuttavat ongelmia, se lähettää varoituksen sähköpostiin loukkaavien arvojen luettelolla. Kaikki kaikessa Sähköpostiosoitteisiin, jotka on määritelty asetuksessa.xml. Näin tiedät, mitä pitää korjata.
        *    **esivalmistetut alaryhmät.** normaalisti, kunERDDAP™Lataa tietoaineisto, se pyytää erillistä () alisarjamuuttujat -tietotaulukko tietolähteestä vain normaalin tietopyynnön kautta. Joissakin tapauksissa nämä tiedot eivät ole saatavilla tietolähteestä tai tietojen lähteestä noutaminen voi olla vaikeaa tietolähteen palvelimella. Jos näin on, voit toimittaa taulukon tiedoilla.json.csv-tiedoston nimi *Tom* Sisältö/erddap/subset/ *datasetID* .json  (tai .csv) . Jos läsnä,ERDDAP™lukee sen kerran, kun tietoaineisto ladataan ja käyttää sitä alijoukkojen tietojen lähteenä.
            * Jos lukemisen aikana on virhe, aineisto ei lataudu.
            * Niillä pitää olla samat sarakkeen nimet. (Esimerkiksi samassa tapauksessa) kuin&lt;subsetVariables&gt; mutta sarakkeet voivat olla missä tahansa järjestyksessä.
            * Saattaa olla ylimääräisiä sarakkeita (ne poistetaan ja hiljattain poistetaan rivit) .
            * Puuttuvat arvot puuttuvat (Ei väärennettyjä numeroita -99) .
            *   .jsonTiedostot voivat olla hieman vaikeampia luoda, mutta käsitellä Unicode-merkkejä hyvin..jsontiedostot on helppo luoda, jos niitä luodaanERDDAP.
            * .csv-tiedostot ovat helppokäyttöisiä, mutta sopivat vain ISO 8859-1 -hahmoille. .csv-tiedostoilla on oltava sarakkeiden nimet ensimmäisellä rivillä ja tiedot myöhemmistä riveistä.
        * suuria tietoja tai milloin&lt;subsetVariables&gt; on väärin määritetty, arvoyhdistelmien taulukko voi olla riittävän suuri aiheuttaakseen liikaa tietoja tai OutOfMemory-virheitä. Ratkaisu on poistaa muuttujia luettelosta.&lt;subsetVariables&gt; jolla on suuri määrä arvoja tai muuttujia tarpeen mukaan, kunnes taulukon koko on kohtuullinen. Virheestä riippumatta osatERDDAP™Tämä käyttääsubsetVariablesJärjestelmä ei toimi hyvin (Esimerkiksi verkkosivut latautuvat hitaasti) Kun rivejä on liikaa (Esimerkiksi yli miljoona) Tässä pöydässä.
        *   subsetVariablesSillä ei ole mitään tekemistä sen määrittämisen kanssa, mitä muuttujia käyttäjät voivat käyttää rajoituksissa, eli miten käyttäjät voivat pyytää tietoaineiston alijoukkoja.ERDDAP™Rajoitukset voivat aina viitata mihin tahansa muuttujaan.
###### Aikayksikkö{#time-units} 
[Aika ja aikaleima](#time-units)ISO 8601:2004 (E) Päivämäärä + Aika Z-joukot (1985-01-31T15:31:00Z) .
             
###### Yhteenveto{#summary} 
*   [ **Yhteenveto** ](#summary)  (From the[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)ja[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metatiedot) REQUIRED Global attribuutti, jolla on pitkä kuvaus tietoaineistosta (yleensä)&lt;500 merkkiä). Esimerkiksi,
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * Joko aineiston maailmanlaajuinen[Lähde](#global-attributes)tai maailmanlaajuisesti&lt;addAttributes&gt; Täytyy sisällyttää tämä attribuutti.
    * Yhteenveto on erittäin tärkeää, koska sen avulla asiakkaat voivat lukea kuvauksen tietoaineistosta, jolla on enemmän tietoa kuin otsikko ja siten nopeasti ymmärtää, mitä tietoaineisto on.
    * Neuvoja: Kirjoita yhteenveto, jotta se toimisi kuvaamaan aineistoa jollekin satunnaiselle henkilölle, jonka tapaat kadulla tai kollegalle. Muista sisällyttää[Viisi W ja yksi H](https://en.wikipedia.org/wiki/Five_Ws)Ketkä ovat luoneet tietoaineiston? Mitä tietoja kerättiin? Milloin tiedot on kerätty? Missä se on kerätty? Miksi se on kerätty? Miten se on kerätty?
    *   ERDDAP™Näytä yhteenveto tietoaineiston tiedonsaantimuodosta ( *datasetID* .html) Tee Graph Web-sivu ( *datasetID* .grafiikka) ja muut sivut.ERDDAP™FGDC:n ja ISO 19115 -dokumenttien luomisessa.
###### testOutOfDate {#testoutofdate} 
*   [ **testOutOfDate** ](#testoutofdate)  (valinnainenERDDAPerityiset globaalit metatiedot, ei mistään standardista) määritellään yksinkertaisella tavalla, kun lähes reaaliaikaisen tietoaineiston tiedot katsotaan vanhentuneeksi,now- *NUnits* esimerkiksi,now-Tiedot, jotka yleensä näkyvät 24-48 tuntia ajankohdan jälkeen. Ennustetiedot, käytä nyt **+**  *NUnits* Esimerkiksi nyt +6 päivää ennustetietoja, jotka ovat enintään 8 päivää tulevaisuudessa. (Nähdään[now- *NUnits* Synonyymi kuvaus](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now).) Jos aineiston enimmäisarvo on enemmän kuin määritetty aika, aineistoa pidetään ajan tasalla. Jos enimmäisaika on suurempi kuin määritetty aika, aineistoa pidetään ajan tasalla. Out-of-Date-tietoaineistoissa on oletettavasti ongelma tietolähteen kanssa, jotenERDDAP™Tietoja ei voi käyttää uusimmista aikapisteistä.
    
ThetestOutOfDateArvo näkyy kolumnina[allDatasetsData](#eddtablefromalldatasets)sinun sisälläsiERDDAP. Sitä käytetään myös laskemaan OutOfDate-indeksi, joka on toinen sarake.allDatasetsDataa.
Jos indeksi on&lt;1. Tietoaineistoa pidetään ajan tasalla.
Jos indeksi on&lt;= 1, aineistoa pidetään vanhentuneena.
Jos indeksi on&lt;= 2, aineistoa pidetään hyvin ajantasaisena.
    
ThetestOutOfDateArvoa käytetään myösERDDAP™tuottaa https://*yourDomain*/erddap/outOfDateDatasets.html WEB WEB WEB WEB WEB ([esimerkki esimerkki esimerkki esimerkki](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) jotka osoittavat aineistot, joilla on&lt;testOutOfDate&gt; tagit, joiden aineistot on sijoitettu sen mukaan, kuinka ulkopuolisia ne ovat. Jos vaihdat tiedostotyyppiä (.html .csv,.jsonlCSV,.nc,.tsv,...) Voit saada nämä tiedot eri tiedostomuodoissa.
    
Jos mahdollista,[GenerateDatasetsXml](#generatedatasetsxml)Lisää AtestOutOfDateAttribuutti globaalilleaddAttributesEräästä datasta. Tämä arvo on ehdotus, joka perustuu GenerateDatasetsXmlin saataviin tietoihin. Jos arvo ei ole sopiva, vaihda se.
    
"Out-of-Date" on hyvin erilainen kuin&lt;Reload Jokainen minuutti » (#reloadeverynminutes) joka käsittelee sitä, miten ajan tasallaERDDAP"Tieto tietoaineistosta on. The&lt;testOutOfDate&gt; järjestelmä olettaa, ettäERDDAP"Tieto tietoaineistosta on ajan tasalla. Kysymys&lt;testOutOfDate&gt; käsittelee: vaikuttaako tietojen lähteessä olevan jotain vikaa, jolloin uusimmat tiedot eivät ole käytettävissäERDDAP??
    
###### Tittelin otsikko{#title} 
*   [ **Tittelin otsikko** ](#title)  (From the[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)ja[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metatiedot) REQUIRED-maailmanlaajuinen ominaisuus, jossa on lyhyt kuvaus tietoaineistosta (yleensä)&lt;= 95 merkkiä. Esimerkiksi,
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * Joko aineiston maailmanlaajuinen[Lähde](#global-attributes)tai maailmanlaajuisesti&lt;addAttributes&gt; Täytyy sisällyttää tämä attribuutti.
    * Otsikko on tärkeä, koska jokainen luettelo esitetyistä tietoaineistoistaERDDAP  (Muut kuin hakutulokset) Listaa tietoaineistot aakkosjärjestyksessä otsikolla. Joten jos haluat määrittää tietoaineistojen järjestyksen, tai sinulla on tiettyjä aineistoja, jotka on ryhmitelty yhdessä, sinun on luotava otsikot mielessäsi. Luettelo tietoaineistoista (esimerkiksi kategorian etsinnässä) Näytä koko listan osa ja toisessa järjestyksessä. Jokaisen aineiston otsikon tulee olla yksin.
    * Jos otsikko sisältää sanan ”Poistettu” (Kaikki pääkirjeet) Sitten tietoaineisto saa alemman sijainnin hakuihin.
             
##### &lt;axisVariable&gt;{#axisvariable} 
* [...] ** &lt;axisVariable&gt; ** ) (#axisvariable) käytetään kuvaamaan ulottuvuutta (Kutsutaan myös nimellä "akseli") .
For ForEDDGridTietoja, yksi tai useampiaxisVariableTagit ovat pakollisia ja kaikki[dataVariables](#datavariable)Jaa/käytä kaikki akselimuuttujat. ([Miksi?](#why-just-two-basic-data-structures) [Entä jos he eivät?](#dimensions))   
On oltava akselimuuttuja jokaiselle ulottuvuudelle.
Akselimuuttujat on määriteltävä siinä järjestyksessä, että tietomuuttujat käyttävät niitä.
(EDDTable Datasets ei voi käyttää&lt;axisVariable&gt; tagit.)
Esimerkkinä tästä on:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt;axisVariable&gt; tukee seuraavia alaotsikoita:
###### &lt;sourceNamej ;{#sourcename} 
* [...]&lt;sourceName[1] (#lähde) tietolähteen nimi muuttujalle. Tämä on nimi, jokaERDDAP™Käytetään pyytäessä tietoja tietolähteestä. Tämä on nimi, jokaERDDAP™Etsitään, milloin tiedot palautetaan tietolähteestä. Tämä on tilanne herkkä. Tämä on ehdotettu.
###### &lt;destinationNamej ;{#destinationname} 
* [...]&lt;destinationName[1] (# määränpään nimi) muuttujan nimi, joka näkyy ja jota käytetäänERDDAP™käyttäjiä.
    * Tämä on OPTIONAL. Jos ei ole,sourceNamekäytetään.
    * Tämä on hyödyllistä, koska se mahdollistaa kryptovaluutan vaihtamisen.sourceName.
    *   destinationNameon tapauksen herkkä.
    *   destinationNamePitää aloittaa kirjeellä (A-Z, a-z) ja sitä on seurattava 0 tai enemmän (A-Z, a-z, 0-9, ja) . ("Aiemmin sallittu"ERDDAP™versio 1.10.) Tämä rajoitus mahdollistaa akselin muuttuvien nimien samanERDDAP™Vastaustiedostoissa ja kaikissa ohjelmistoissa, joissa näitä tiedostoja käytetään, mukaan lukien ohjelmointikielet (kuinPython,MatlabjaJavaKäsikirjoittaja) on olemassa samanlaisia rajoituksia muuttuvien nimien suhteen.
    * SisälläEDDGridTietoja,[pituus, leveys, korkeus, syvyys ja aika](#destinationname)Akselimuuttujat ovat erityisiä.
         
###### axisVariable &lt;addAttributes&gt; {#axisvariable-addattributes} 
* [...]&lt;addAttributes&gt; (#variable addattributes) Määrittää OPTIONALin attribuutit ( *nimen nimi* = *Arvon arvo* ) jotka lisätään lähteen ominaisuuksiin muuttujaa varten, jotta muuttujien yhdistetyt ominaisuudet voidaan tehdä.
Jos muuttujien[Lähde](#variable-addattributes)tai tai&lt;addAttributes&gt; Sisältää[scale\\_factorja/taiadd\\_offset](#scale_factor)attribuutit, niiden arvoja käytetään poistamaan tiedot lähteestä ennen jakelua asiakkaalle.
     (Tuloksen tulos Arvo = lähde Arvo \\ *scale\\_factor+add\\_offset) . Pakkaamaton muuttuja on sama tietotyyppi. (Esimerkiksi kelluva) kuinscale\\_factorjaadd\\_offsetarvoja.
         
##### &lt;dataVariable&gt;{#datavariable} 
* [...] ** &lt;dataVariable&gt; ** ) (#Datavariable) on vaatimus (Lähes kaikki aineistot) Tagi sisällä&lt;Dataset&gt; tagi, jota käytetään kuvaamaan tietomuuttujaa. Tällaista tagia pitää olla yksi tai useampi. Esimerkkinä tästä on:

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

&lt;dataVariable&gt; tukee seuraavia alaotsikoita:
###### &lt;sourceName&gt;{#sourcename-1} 
* [...]&lt;sourceName&gt; (#lähde) tietolähteen nimi muuttujalle. Tämä on nimi, jokaERDDAP™Käytetään pyytäessä tietoja tietolähteestä. Tämä on nimi, jokaERDDAP™Etsitään, milloin tiedot palautetaan tietolähteestä. Tämä on tilanne herkkä. Tämä on ehdotettu.
###### Ryhmiä{#groups} 
CF lisäsi tukea CF v1.8 -ryhmille. Aloita ~2020,NetCDFTyökalut tukevat muuttujien sijoittamista ryhmiin.nctiedosto. Käytännössä tämä tarkoittaa, että muuttujilla on pitkä nimi, joka tunnistaa ryhmän. (s) muuttuva nimi, esimerkiksi ryhmä1a/group2c/varName.ERDDAP™tukee ryhmiä muuntamalla "/" muuttujien&lt;sourceName&gt; &gt; &gt; &gt; &gt; &gt; &gt;&lt;destinationName&gt; esimerkiksi ryhmä 1a \\group2c \\varName. (Kun huomaat, että ryhmät eivät ole paljon muuta kuin syntaksi.) Kun muuttujat on lueteltuERDDAP™Kaikki ryhmän muuttujat esiintyvät yhdessä ja jäljittelevät taustalla olevaa ryhmää.\\[JosERDDAP™Erityisesti GenerateDatasets Xml ei toimi niin kuin se voi olla lähdetiedostoja, joilla on ryhmiä, pyydämme sähköpostia näytetiedosto Chris. Johannes osoitteessa Noaa.gov.\\]

EDDTableFromFiles-tietoaineistot voivat käyttää joitakin erikoiskoodattuja, pseudoja.sourceNames määrittää uusia tietomuuttujat, esim. edistää globaalia attribuuttia tietomuuttujaksi. Näytä[Tämä dokumentti](#pseudo-sourcenames).
###### HDFRakenteita{#hdf-structures} 
AloitetaanERDDAP™2.12,EDDGridNCFiles jaEDDGridLähde: NCFiles Pakkaamattomat voivat lukea tietoja "rakenteista".nc4 ja.hdf4 tiedostoa. Jotta voidaan tunnistaa muuttuja, joka on peräisin rakenteesta,&lt;sourceName&gt; on käytettävä muotoa: *Täydellinen nimi* | *Jäsen* Esimerkkinä ryhmä1/myStruct|MyMember.

###### Kiinteät arvonlähteet{#fixed-value-sourcenames} 
EDDTable-tietokannassa, jos haluat luoda muuttujan (Yhdellä, kiinteällä arvolla) Tämä ei ole lähdeaineistossa, käytä:
```
    <sourceName>=*fixedValue*</sourceName>  
```
Alkuperäinen tasa-arvomerkki kertooERDDAP™Tämä kiinteä Arvo seuraa.

* Numeerisissä muuttujissa kiinteä arvo on yksi rajallinen arvo tai NaN. (arkaluonteinen, esim.) .
* Säilytysmuuttujat, kiinteä arvo on yksi,[JSON-tyylinen](https://www.json.org/json-en.html)  (erityishahmoilla pakenneet hahmot) Esimerkiksi "My" "Special" String.
* Aikaleimamuuttujan osalta määritä kiinteä arvo numerona"seconds since 1970-01-01T00:00:00Z"käyttää
Yksiköt = sekunnit vuodesta 1970-01-01T00:00.
    
Muut tagit&lt;dataVariable"Työskentele kuin tämä olisi säännöllinen muuttuja.
Luo esimerkiksi korkeudeksi kutsuttu muuttuja, jonka kiinteä arvo on 0,0 (kelluva) Käyttö:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

Epätavallisissa tilanteissa voit myös määritelläactual\\_rangeAdAttribute, joka ylittää määränpään ja määränpään odotetut arvot (joka muuten olisi yhtä suuri kuin kiinteä Arvon arvo) .
 
###### Lähde: SourceNames/Derived Variables{#script-sourcenamesderived-variables} 
AloitetaanERDDAP™V2.10:ssä[EDDTableFromfiilit](#eddtablefromfiles),[EDDTableFromDatabase](#eddtablefromdatabase)tai[EdDTableFromFileNames](#eddtablefromfilenames)aineistoa,&lt;sourceName&gt; voi olla
Ilmaisu (Yhtälö, joka arvioi yhden arvon) Käyttämällä muotoa
```
    <sourceName>=*expression*</sourceName>  
```
tai käsikirjoitus (Sarja, joka palauttaa yhden arvon) Käyttämällä muotoa
```
    <sourceName>=*script*</sourceName>  
```
ERDDAP™luottaa siihen, että[Apache-projekti](https://www.apache.org/) [JavaIlmaisukieli (Jyväskylä) ](https://commons.apache.org/proper/commons-jexl/)  (Lisenssi:[Apasseja](https://www.apache.org/licenses/LICENSE-2.0)) arvioimaan ilmaisuja ja ohjaamaan käsikirjoituksia.
Tietyn uuden muuttujan laskenta suoritetaan yhden tuloksen rivissä toistuvasti kaikkien rivien osalta.
Sanat ja käsikirjoitukset käyttävätJavajaJavaRaamatullinen syntaksi ja voi käyttää mitä tahansa
[Operaattorit ja menetelmät, jotka on rakennettu JEXL](https://commons.apache.org/proper/commons-jexl/reference/syntax.html).
Käsikirjoitukset voivat myös käyttää menetelmiä (Toimintoja) Näistä luokkista:
*   [Kalenteri 2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2), joka on kääritty joihinkin staattisiin, aika- ja kalenteriin liittyviin menetelmiin com.cohort.util.Calendar2 ([lisenssi lisenssi lisenssi lisenssi](/acknowledgements#cohort-software)) . Esimerkiksi,
Kalenteri2.parseToEpochSeconds ( *Lähde: Date Aikamuodot* ) Lähteestä tulee Time-jousitus päivämäärän ajantasaisen merkkijonon kautta ja palauttaa"seconds since 1970-01-01T00:00:00Z"  (EpochSeconds) kaksinkertainen arvo.
*   [Matematiikka](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math)joka on kääritty lähes kaikkiin staattisiin, matemaattisiin menetelmiin[Java.lang. Matematiikka](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html). Math.atan2 ( *x* ) suorakulmaiset koordinaatit (x) Polar-koordinaatit palautetaan (Kaksinkertainen sarja, jossa on\\[r, theta\\]) .
*   [Matematiikka 2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2), joka on kääritty lähes kaikkiin staattisiin, matemaattisiin menetelmiin com.cohort.util. Matematiikka 2 ([lisenssi lisenssi lisenssi lisenssi](/acknowledgements#cohort-software)) . Esimerkiksi,
Math2.roundTo ( *nPlaces* ) Kierros d on määritetty numeroiden määrä desimaalipisteen oikeuteen.
* String, joka antaa sinulle pääsyn kaikkiin staattisiin, Stringiin liittyviin menetelmiin[Java.lang. String](https://docs.oracle.com/javase/8/docs/api/java/lang/String). Esineiden asettaminenERDDAP™Sanat ja käsikirjoitukset voivat käyttää mitä tahansa niistä.Javamenetelmiä, kuten on kuvattu Java.langissa. dokumentointia. Esimerkiksi String.ValueOf (d d) Muutetaan kaksinkertainen arvo d Stringiksi (Voit myös käyttää "+d) .
*   [String2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2), joka on kääritty useimpiin staattisiin, String- ja sarjaan liittyviin menetelmiin com.cohort.util.String2 ([lisenssi lisenssi lisenssi lisenssi](/acknowledgements#cohort-software)) . Esimerkiksi String2.zErop ( *Määrä, ndigits* ) lisätä 0 s vasemmalla numero String niin, että kokonaismäärä numeroita on nDigits (Esimerkki: String2.zErop (6, 2) Palaa sivulle 06) .
*   [Rivi](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row), jolla on ei-staattisia menetelmiä käyttää tietoja eri sarakkeista lähdetietotaulukon nykyisessä rivissä. Esimerkiksi rivi.columnString ("vuotta") lukee "vuosi" sarakkeen arvon String, kun taas rivi.column In ("vuotta") Lue "vuosi" kolumnin arvo kokonaisuutena.

Turvallisuussyistä ilmaisut ja käsikirjoitukset eivät voi käyttää muita luokkia kuin ne 6.ERDDAP™Vahvistaa tämän rajoituksen luomalla oletusarvoisen mustan listan (Musta lista kaikki luokat) Sitten valkoinen lista (jotka mahdollistavat edellä kuvatut 6 luokkaa) . Jos tarvitset muita menetelmiä ja/tai muita luokkia tehdäksesi työsi, lähetä pyyntösi Chrisille. Johannes osoitteessa Noaa.gov.
    
###### Tehokkuus
EDDTableFromFiles-tietokoneissa on vain hyvin, hyvin pieni. (Ei ehkä huomaa) Näiden muuttujien tietopyyntöjen hidastaminen. EDDTableFromDatabase -sovelluksessa on valtava nopeusrangaistus pyyntöihin, jotka sisältävät rajoituksia näissä muuttujissa (esim. &longitude0360&gt;30 &longitude0360)&lt;koska rajoituksia ei voi siirtää tietokantaan, joten tietokannan on palautettava paljon enemmän tietoja.ERDDAP™  (Mikä on aika kuluttaa) niin ettäERDDAP™Se voi luoda uuden muuttujan ja soveltaa sitä. Pahimman tapauksen välttäminen (jos tietokantaan ei ole rajoituksia) ,ERDDAP™Heittää virheilmoituksen, jotta tietokannan ei tarvitse palauttaa koko taulukon sisältöä. (Jos haluat ohittaa tämän, lisää rajoitus ei-käsikirjoituskolumniin, joka on aina totta, esim.&lt;3000-01.) Tästä syystä EDDTableFromDatabase on aina parempi luoda johdettu sarake tietokantaan kuin käyttää.sourceName= KäsikirjoitusERDDAP.

###### Miten ilmaisu (tai käsikirjoitus) Käytetään:
Vastauksena käyttäjän tabulaaritietopyyntöön,ERDDAP™Saat tietoja useista lähdetiedostoista. Jokainen lähdetiedosto luo raakapöydän (suoraan lähteestä) dataa.ERDDAP™sitten käy läpi raakadatataulukon, rivi rivi riviltä ja arvioi ilmaisun tai käsikirjoituksen kerran jokaista riviä kohden luodakseen uuden sarakkeen, jolla on tämä ilmaisu tai käsikirjoitus.sourceName.
    
###### GenerateDatasetsXml
Huomautus: GenerateDatasets Xml on täysin tietämätön, kun on tarpeen luoda muuttuja.&lt;sourceName== == *Ilmaisu* &lt;//sourceName&gt; Sinun on luotava muuttujadatasets.xmlkäsin.

###### Esimerkkejä esimerkeistä:
Tässä muutamia täydellisiä esimerkkejä tietomuuttujat, jotka käyttävät ilmaisua luodakseen uuden sarakkeen dataa. Toivomme, että nämä esimerkit (ja niiden variaatiot) kattaa 95 prosenttia kaikkien ilmaisujen käytöstä.sourceNames.

###### erillisen "päivän" ja"time"Kolumnit yhdistettyyn aikaan:
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
TämäsourceNameIlmaisu tekee uudesta"time"sarakkeessa, joka yhdistää Stringin arvot "päivästä" (yyyy-MM-dd) ja"time"  (HH: mm) sarakkeet lähdetiedoston jokaisella rivillä ja muuntamalla tämä merkkijono"seconds since 1970-01-01"  (EpochSeconds) kaksinkertainen arvo.

Tai kurssi, sinun on mukautettava aikamuoto merkkijono käsitellä tiettyä muotoa kunkin tietoaineiston lähde päivämäärä ja aika sarakkeet, katso
[Aikayksikköjen dokumentointi](#string-time-units).

Teknisesti sinun ei tarvitse käyttää Kalenteri2.parseToEpochSeconds () muuntaa yhdistetty päivämäärä + aika epochSeconds. Voit vain siirtää päivämäärän + aika-ajojaERDDAP™täsmentää muotoa (esim.
yyyy-MM-ddT'HHH:mm:m:ss'Z) on yksiköiden attribuutti. Mutta on olemassa merkittäviä etuja muuntaa epochSeconds - erityisesti, EDDTableFromFiles voi sitten helposti seurata aika-arvoja kussakin tiedostossa ja niin nopeasti päättää, katsotaanko tietyssä tiedostossa vastatessaan pyyntöön, jolla on aikarajoituksia.

Tähän liittyvä ongelma on tarve luoda yhtenäinen päivämäärä+aika sarake lähteestä, jossa on erillinen vuosi, kuukausi, päivämäärä, tunti, minuutti, toinen. Ratkaisu on hyvin samankaltainen, mutta monien kenttien täytyy usein nollata, jotta esimerkiksi kuukausi. (1 - 12) Päivämäärä (1 - 31) Aina on kaksi numeroa. Tässä on esimerkki vuodesta, kuukaudesta, päivämäärästä:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
Liittyvät ongelmat ovat tarve luoda yhtenäinen leveys tai pituus sarake yhdistämällä tiedot lähdetaulukon eri astetta, minuutteja ja sekuntia sarakkeita, jokainen tallennettu kokonaislukuja. Esimerkiksi,
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### Muuntaa sarake nimeltä "lon" pituusarvoilla 0 - 360° sarakkeeseen nimeltä "pitkä" arvoilla -180 - 180°
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
TämäsourceNameilmaisu tekee uuden "pitkän" sarakkeen muuntamalla kaksinkertaisen arvon "lon" sarakkeesta jokaisella lähdetiedoston rivillä. (0-360 arvoa) Muuttamalla se -180 - 180 - kaksinkertaiseksi arvoksi.

Jos haluat muuntaa lähdearvot -180 - 180° 0 - 360°, käytä
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
Kaksi pitkää variaatiota:
Jos aineistossa on kaksi pituusmuuttujaa, suosittelemme käyttämäändestinationNamePituus -180 - 180 ° muuttujalledestinationNamePituude 0360 (LongName 0-360°) 0-360 ° muuttuva. Tämä on tärkeää, koska käyttäjät käyttävät joskus Advanced Searchia tietojen etsimiseen tietyllä pituusalueella. Tämä haku toimii paremmin, jos pituus on johdonmukaisesti -180 - 180 asteen arvot kaikkiin tietoaineistoihin. Lisäksi tietoaineiston geospatiaaliset ►M2, geospatiaaliset \\ \\max, Westmost \\Easting ja Easternmost \\Eastings globaalit attribuutit asetetaan johdonmukaisesti. (Pituusarvot -180 - 180°) ;
    
###### Muuntaa sarake nimeltä "tempF" lämpötila-arvoja asteessa \\ F sarakkeeseen nimeltä "tempC" ja lämpötilat asteessa C:
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
TämäsourceNameilmaisu tekee uudesta "tempC" sarakkeesta muuntamalla kelluvan asteen F-arvo "tempF"-sarakkeesta jokaisella lähdetiedoston rivillä kelluvaksi asteeksi C-arvo.

Huomaa, että aineistossasi voi olla sekä alkuperäinen että F-muuttuja ja uusi temppu C-muuttuja, jolla on toinen muuttuja
```
    <sourceName>tempF</sourceName>
```
###### Muuntaa tuulen "nopeus" ja "ohjaus" sarakkeet kahteen sarakkeeseen u,v komponentteja
* Jos haluat tehdä muuttuvan, käytä
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* V-muuttujan tekeminen, käytä
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
Tai jos olet, v:
* Jotta nopeus muuttuisi, käytä
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* Jotta suunta muuttuisi, käytä
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### Käsikirjoitus:
Tässä on esimerkki käsikirjoituksen käyttämisestä, ei vain ilmaisu,sourceName. Odotamme, että käsikirjoituksia ei usein tarvita. Tavoitteena on palauttaa ei-nano-arvo (99) lämpöarvot tietyn alueen ulkopuolella. Huomaa, että käsikirjoitus on osa "="
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
###### Kova lippu
Jos muutat ilmaisun tai käsikirjoituksen, joka on määriteltysourceNameSinun täytyy asettaa[Kova lippu](/docs/server-admin/additional-information#hard-flag)aineistoa varten, niinERDDAP™poistaa kaikki tallennetut tiedot tietoaineistosta ja lukee uudelleen kaikki tietotiedostot (Uusi ilmaisu tai käsikirjoitus) Seuraavan kerran se lataa tiedot. Vaihtoehtoisesti voit käyttää[Dasds](#dasdds)Tämä vastaa kovan lipun asettamista.

###### % koodaus
Tämä on harvoin relevanttia: Sanat ja kirjoitukset on kirjoitettudatasets.xmlMikä on XML-dokumentti, sinun on prosentoitava kaikki koodaus&lt;, , ja & merkkiä ilmaisuissa ja käsikirjoituksissa&lt;&gt; ja &amp;

###### Yhteisiä ongelmia
Yleinen ongelma on, että luot vaihtelevansourceName= *Ilmaisu* Tietojen sarakkeella on puuttuvia arvoja. Vaihtoehtoisesti joillakin uusien sarakkeiden riveillä on puuttuvia arvoja ja luulet, ettei niiden pitäisi olla. Ongelma on siinä, että ilmaisussa jaERDDAPTämä virhe muutetaan puuttuvaksi arvoksi. ongelman ratkaisemiseksi,

* Tarkastele ilmaisua nähdäksesi, mikä ongelma voi olla.
* Katso sisään[log.txt](/docs/server-admin/additional-information#log)Tämä on ensimmäinen virheilmoitus, joka syntyy kunkin uuden sarakkeen luomisen aikana.

Yleisiä syitä ovat:

* Käytit väärää tapausta. Sanat ja kirjoitukset ovat herkkiä.
* Hän jätti luokan nimen. Käytä esimerkiksi Math.abs () Ei vain abs () .
* Et tehnyt konversioita. Esimerkiksi, jos parametriarvon tietotyyppi on String ja sinulla on kaksinkertainen arvo, sinun on muunnettava kaksinkertainen Stringin kautta.
* Ilmaisun sarakkeen nimi ei vastaa tiedoston sarakkeen nimeä. (Nimi voi olla erilainen joissakin tiedostoissa.) .
* Ilmaisussa on syntaksivirhe (Esimerkki: Kadonnut tai ylimääräinen) &gt;).

Jos olet jumissa tai tarvitset apua,
Ole hyvä ja lue yksityiskohdat ja katso meidän[Lisätuen saaminen](/docs/intro#support).
        
###### &lt;destinationName&gt;{#destinationname-1} 
* [...]&lt;destinationName&gt; (# määränpään nimi) muuttujan nimi, joka näkyy ja jota käytetäänERDDAP™käyttäjiä.
    * Tämä on OPTIONAL. Jos ei ole,[sourceName](#sourcename)käytetään.
    * Tämä on hyödyllistä, koska se mahdollistaa kryptovaluutan vaihtamisen.sourceName.
    *   destinationNameon tapauksen herkkä.
    *   destinationNamePitää aloittaa kirjeellä (A-Z, a-z) ja sitä on seurattava 0 tai enemmän (A-Z, a-z, 0-9, ja) . ("Aiemmin sallittu"ERDDAP™versio 1.10.) Tämä rajoitus mahdollistaa tietojen muuttuvien nimien samanERDDAP™Vastaustiedostoissa ja kaikissa ohjelmistoissa, joissa näitä tiedostoja käytetään, mukaan lukien ohjelmointikielet (kuinPython,MatlabjaJavaKäsikirjoittaja) on olemassa samanlaisia rajoituksia muuttuvien nimien suhteen.
    * EDDTable-tietokannat,[pituus, leveys, korkeus (tai syvyys) ja aika](#destinationname)Datamuuttujat ovat erityisiä.
             
###### &lt;Datatiedot Type &gt;{#datatype} 
* [...]&lt;Tietotyyppi &gt; (#datatype) määrittää lähteestä tulevan tietotyypin. (Joissakin tapauksissa, esimerkiksi ASCII-tiedostojen lukemisen yhteydessä, se määrittää, miten lähteestä saatavat tiedot on tallennettava.) 
    * Tämä on kyseenalaistettu joidenkin tietojen tyypit ja toisten jättämä. aineistotyypit, jotka vaativat tätädataVariables ovat:EDDGridFromXxFiles, EDDTableFromXxFiles, EDDTableFromMWFSEDDTableFromNOS, EDDTableFromSOS. Muut aineistotyypit sivuuttavat tämän tunnisteen, koska ne saavat tiedot lähteestä.
         
    * Arvot ovat mitä tahansa standardia[ERDDAP™Tietotyypit](#data-types)Booleanin lisäksi (Katso alapuolelta) . Tietotyypin nimet ovat tapausherkkiä.
         
###### Booleenin data{#boolean-data} 
*   ["Boolean"](#boolean-data)Kyseessä on erityinen tapaus.
    * sisäisesti,ERDDAP™Boolean-tyyppiä ei tueta, koska booleanit eivät voi tallentaa puuttuvia arvoja ja useimmat tiedostotyypit eivät tue boolealaisia. myös,DAPei tue boolealaisia, joten ei ole olemassa mitään tavanomaista tapaa kysellä boolen muuttujia.
    * "boolean" määrittää tiedot Tyyppiädatasets.xmlBoolean-arvot tallennetaan ja esitetään tavuina: 0=false, 1=true, 127=missing\\_value.
    * Käyttäjät voivat määrittää rajoituksia käyttämällä numeroarvoja. (Esimerkiksi "isAlive=1") .
    *   ERDDAP™Hallinnoijat joutuvat joskus käyttämään "boolean-dataa" Tyyppiädatasets.xmlkertomaanERDDAP™Miten kommunikoida tietolähteen kanssa (lukeminen booleanin arvoja suhteellisen tietokannan ja muuntaa ne 0, 1, tai 127.) .
         
* Jos haluat muuttaa tietomuuttujan lähdetiedostoissa (Esimerkiksi lyhyt) Joihinkin muihin tietoihin Tyyppi tietoaineistossa (Esimerkiksi Int) Älä käytä&lt;DataType määrittää mitä haluat. (Se toimii tietyntyyppisille tietokannoille, mutta ei muille.) Sen sijaan:
    * Käytä&lt;DataType&gt; määrittää, mitä tiedostoissa on (Esimerkiksi lyhyt) .
    * Sisällä&lt;addAttributes&gt; Muuttujalle lisätty[scale\\_factor](#scale_factor)attribuutti uusiin tietoihin Tyyppi (Esimerkiksi Int) Esimerkiksi arvo 1
```
            <att name="scale\\_factor" type="int">1</att>  
```
###### dataVariable &lt;addAttributes&gt; {#datavariable-addattributes} 
* [...]&lt;addAttributes&gt; (#variable addattributes) Määrittää joukko attribuutteja ( *nimen nimi* = *Arvon arvo* ) jotka lisätään lähteen ominaisuuksiin muuttujaa varten, jotta muuttujien yhdistetyt ominaisuudet voidaan tehdä. Tämä on OPTIONAL.
Jos muuttujien[Lähde](#variable-addattributes)tai tai&lt;addAttributes&gt; Sisältää[scale\\_factorja/taiadd\\_offset](#scale_factor)attribuutit, niiden arvoja käytetään poistamaan tiedot lähteestä ennen jakelua asiakkaalle. Pakkaamaton muuttuja on sama tietotyyppi. (Esimerkiksi kelluva) kuinscale\\_factorjaadd\\_offsetarvoja.
        
###### Muuttuva&lt;addAttributes&gt; {#variable-addattributes} 
* [...] ** Muuttuvat ominaisuudet / Muuttuva&lt;addAttributes&gt; ** ) (#variable addattributes) -----&lt;addAttributes&gt; on OPTIONAL-tunnisteet&lt;axisVariable&gt; tai&lt;dataVariable&gt; tunniste, jota käytetään muuttujien ominaisuuksien muuttamiseen.
    
    *    ** Käytä muuttujaa&lt;addAttributes&gt; muuttaa muuttujien ominaisuuksia. ** ERDDAP™Yhdistää muuttujan ominaisuudet tietoaineiston lähteestä (** Lähde **) ja muuttujien** addAttributes **jonka määritteletdatasets.xml  (joilla on prioriteetti) Muuttujien tekeminen"** Yhdistetyt ominaisuudet ** "Mitä ovatERDDAP™käyttäjät näkevät. Näin voit käyttääaddAttributesmäärittää lähdeominaisuuksien arvot uudelleen, lisätä uusia ominaisuuksia tai poistaa attribuutteja.
    * Näe [ ** &lt;addAttributes&gt; **Tietoa) (#addattribuutti) joka koskee globaaleja ja muuttuvia** &lt;addAttributes&gt; ** .
    *   ERDDAP™Se etsii ja käyttää monia näitä ominaisuuksia eri tavoin. Värikarva-arvot ovat tarpeen muunneltavan saatavuuden varmistamiseksiWMSKarttoja voi tehdä johdonmukaisilla värikartoilla.
    *   [Pituus, leveys, korkeus (tai syvyys) ja aikamuuttujat](#destinationname)Saat paljon metatietoja automaattisesti (esimerkiksi[Yksiköt](#units)) .
    * Näyte&lt;addAttributes&gt; Tietojen muuttuja on:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

Tyhjä numeroOfObservations attribuutti aiheuttaa lähteen numeroOfservations attribuutti (Jos) poistetaan lopullisesta, yhdistetystä attribuuttilistasta.
    * Näiden tietojen toimittaminen auttaaERDDAP™Tehdä parempaa työtä ja auttaa käyttäjiä ymmärtämään aineistoja.
Hyvä metatieto tekee datasta käyttökelpoisen.
Riittämätön metatieto tekee datasta hyödyttömän.
Ota aikaa tehdä hyvää työtä metatietojen kanssa.
    
###### Kommentteja muuttuvista ominaisuuksista, jotka ovat erityisiäERDDAP:

###### actual\\_range {#actual_range} 
*   [ **actual\\_range** ](#actual_range)Se on muuttuva ominaisuus. Esimerkiksi,

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* Tämä ominaisuus on peräisin[CDCCOARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)ja[1.7 +](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Metatiedot.
* Jos näin on, sen on oltava sarja kahta saman tietotyypin arvoa kuin muuttujan kohdetietotyyppi, jossa määritellään todellinen tietotyyppi. (Ei teoreettista tai sallittua) tietojen vähimmäis- ja enimmäisarvot kyseiselle muuttujalle.
* Jos tiedot on pakattu[scale\\_factorja/taiadd\\_offset](#scale_factor),actual\\_rangePakkaamattomat arvot on oltava samantyyppisiä kuin pakkaamattomat arvot.
* Joillekin tietolähteille (Esimerkiksi EDDTableFrom... Tiedostoaineistot) ,ERDDAP™Määrittääactual\\_rangejokaisesta muuttujasta ja asettaaactual\\_rangeattribuutti. Muiden tietolähteiden kanssa (esimerkiksi suhteelliset tietokannat, Cassandra,DAPPER,Hyrax) saattaa olla hankalaa tai rasittavaa, että lähde laskee alueen, jotenERDDAP™ei pyydä sitä. Tässä tapauksessa on parempi, jos voitactual\\_range  (erityisesti pituus, leveys, korkeus, syvyys ja aikamuuttujat) lisäämällä yhdenactual\\_rangeJokaisen muuttujan ominaisuus [&lt;addAttributes&gt; (#addattribuutti) Näihin tietoihindatasets.xmlesimerkiksi,

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* Numeerinen[Aika- ja aikaleimamuuttujat](#time-units)määritettyjen arvojen olisi oltava merkityksellisiä lähteitä (Ei määränpäätä) Numeeriset arvot. Esimerkiksi, jos lähteen aika-arvot tallennetaan "päivinä vuodesta 1985-01-01".actual\\_rangeTäytäntöönpanopäivät vuodesta 1985-01-01. Ja jos haluat viitata NOWiin toiseksi arvoksi lähes reaaliaikaisille tiedoille, joita päivitetään säännöllisesti, käytä NaN:ää. Esimerkiksi määrittää tietokanta 1985-01-17 kunnes NOW

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* Josactual\\_rangeTunnetaan (jokoERDDAP™laskemalla tai lisäämällä sen&lt;addAttributes&gt;),ERDDAP™Näytä se käyttäjälle Data Access -muodossa ( *datasetID* .html) Tee Graph Web-sivut ( *datasetID* .grafiikka) Tätä aineistoa käytetään FGDC- ja ISO 19115 -metatietojen tuottamisessa. Viimeiset 7 päivää aikaaactual\\_rangeSitä käytetään oletusaikana.
* Josactual\\_rangeKäyttäjät voivat käyttää[min () Max () Toimintoja](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min)pyyntöihin, jotka ovat usein erittäin hyödyllisiä.
* Kaikki EDDTable-tiedostot, josactual\\_rangetunnetaan (joko määrittelemällä taiERDDAP™lasketaan sitä) ,ERDDAP™Pystymme nopeasti hylkäämään kaikki tietopyynnöt tämän alueen ulkopuolella. Esimerkiksi, jos aineiston alin aika-arvo vastaa 1985-01-17, hakemus kaikista tiedoista vuosina 1985-01-01-1985-01-16 hylätään välittömästi virheviestillä "Kysymyksesi ei tuottanut vastaavia tuloksia". Tämä tekeeactual\\_rangeTärkeä metatieto, koska se voi säästääERDDAP™Paljon vaivaa ja säästää käyttäjää paljon aikaa. Tämä korostaa, ettäactual\\_rangearvot eivät saa olla aiempaa kapeampia, muutenERDDAP™voi virheellisesti sanoa "Ei ole olemassa yhteensopivia tietoja", kun itse asiassa on asiaankuuluvia tietoja.
* Kun käyttäjä valitsee tietojen alaryhmän ja pyytää tiedostotyyppiä, joka sisältää metatiedot (esimerkiksi.nc) ,ERDDAP™Muutoksetactual\\_rangeVastaustiedostossa heijastaa alaryhmän valikoimaa.
* Katso myös[data\\_minjadata\\_max](#data_min-and-data_max)Tämä on vaihtoehtoinen tapa määritelläactual\\_range. Ne ovat kuitenkin nyt vähentyneet, ettäactual\\_rangeSe on määritelty CF 1.7+:lla.
         
###### Väribaarin ominaisuudet{#color-bar-attributes} 
On olemassa useita OPTIONAL-muuttujan ominaisuuksia, jotka määrittävät ehdotetut oletusominaisuudet väripalkkiin. (Muuntaa data-arvoja kuvien väreiksi) tästä muuttujasta.
* Jos näin on, näitä tietoja käytetään oletusarvoisina tietoina jatabledapAina kun haluat kuvan, joka käyttää väribaaria.
* Esimerkiksi, kun leveyspituusverkossa olevat tiedot on toteutettu kartan kattavuudena, väripalkki määrittää, miten tietoarvot muunnetaan väreiksi.
* Nämä arvot sallivatERDDAP™luoda kuvia, jotka käyttävät yhtenäistä väripalkkia eri pyyntöihin, vaikka aika tai muut ulottuvuudet vaihtelevat.
* Nämä nimet on luotu käytettäväksiERDDAP. Ne eivät ole peräisin metadatasta.
* Väribaariin liittyvät ominaisuudet ovat:
    *    **colorBarMinimum** Vähimmäisarvo määritellään värikartalla. Esimerkiksi,

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * Jos tiedot on pakattu[scale\\_factorja/taiadd\\_offset](#scale_factor)määrittääcolorBarMinimumPakkaamaton arvo.
    * Data-arvot ovat alhaisemmat kuincolorBarMinimumovat saman värisiä kuincolorBarMinimumarvoja.
    * Attribuutin tulisi olla[Tyyppi = kaksinkertainen](#attributetype)tietomuuttujan tyypistä riippumatta.
    * Arvo on yleensä hyvä pyöreä numero.
    * Parhaat käytännöt: Suosittelemme arvoa, joka on hieman suurempi kuin vähimmäistiedot.
    * Oletusarvoa ei ole.
*    **colorBarMaximum** Määrittää värikartan maksimiarvon. Esimerkiksi,

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * Jos tiedot on pakattu[scale\\_factorja/taiadd\\_offset](#scale_factor)määrittääcolorBarMinimumPakkaamaton arvo.
    * Data-arvot korkeammat kuincolorBarMaximumovat saman värisiä kuincolorBarMaximumarvoja.
    * Attribuutin tulisi olla[Tyyppi = kaksinkertainen](#attributetype)tietomuuttujan tyypistä riippumatta.
    * Arvo on yleensä hyvä pyöreä numero.
    * Parhaat käytännöt: Suosittelemme arvoa hieman matalampi kuin maksimitietojen.
    * Oletusarvoa ei ole.
*    **Väri väri väri väri Barpalette** Se määrittää paletti värikarvalle. Esimerkiksi,
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * Kaikki Kaikki Kaikki KaikkiERDDAP™Asennukset tukevat näitä standardipalettia: BlackBlueWhite, BlackRedWhite, BlackWhite, BlueWhite, LightRainbow, Ocean, OceanDepth, Rainbow, RedWhiteBlue, ReverseRainbow, Topography\\[Lisätty v1.74\\]WhiteBlack, WhiteBlueBlack ja WhiteRedBlack.
    * Jos olet asentanut[Lisäpaletti](/docs/server-admin/additional-information#palettes)Voit viitata johonkin niistä.
    * Jos tämä ominaisuus ei ole läsnä, oletusarvo on BlueWhiteRed, jos \\-1\\*colorBarMinimum=colorBarMaximumMuuten oletus on sateenkaari.
*    **värikartta** Se määrittää värikartan mittakaavan. Esimerkiksi,
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * Valid-arvot ovat Linear ja Log.
    * Jos arvo on loki,colorBarMinimumPitää olla suurempi kuin 0.
    * Jos tämä ominaisuus ei ole läsnä, oletus on Linear.
*    **Väri väri väri väri Barjanoinen** määrittää, onko väriparilla jatkuva väripaletti vai onko värikarjalla muutamia erillisiä värejä. Esimerkiksi,
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * Hyvät arvot ovat merkkijonot totta ja vääriä.
    * Jos tämä ominaisuus ei ole läsnä, oletus on totta.
*    **Värikarvaiset osat** määrittää värikartan osien oletusmäärän. Esimerkiksi,
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * Arvot ovat positiivisia kokonaislukuja.
    * Jos tämä ominaisuus ei ole läsnä, oletusarvo on \\-1, joka kertoo.ERDDAP™valita osien lukumäärä värikartan vaihteluvälin perusteella.
###### WMS {#wms} 
Tärkeimmät vaatimukset muuttujalle, joka on käytettävissäERDDAP&gt;WMSPalvelimet ovat:
* Tietojen on oltavaEDDGriddataa.
* Datamuuttujan on oltava verkon muuttuja.
* Datamuuttujan on oltava pituus ja leveysakselin muuttujia. (Muut akselimuuttujat ovat OPTIONAL.) 
* Pituusarvoja pitää olla välillä 180 ja 180.
* ThecolorBarMinimumjacolorBarMaximumattribuutit on määriteltävä. (Muut väribaarit ovat OPTIONAL.) 

###### data\\_minjadata\\_max {#data_min-and-data_max} 
*   [ **data\\_min** ja **data\\_max** ](#data_min-and-data_max)----- Nämä ovat maailman meriverenkierron kokeessa määriteltyjä muuttuvia ominaisuuksia. (WOCE) Metadatan kuvaus. Esimerkiksi,

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * Suosittelemme, että käytät[actual\\_range](#actual_range)sijastadata\\_minjadata\\_maxkoskaactual\\_rangeSe on nyt määritetty CF-eritelmällä.
    * Jos ne ovat läsnä, niiden on oltava sama tietotyyppi kuin muuttujan kohdetietotyyppi ja määritettävä todellinen tietotyyppi. (Ei teoreettista tai sallittua) tietojen vähimmäis- ja enimmäisarvot kyseiselle muuttujalle.
    * Jos tiedot on pakattu[scale\\_factorja/taiadd\\_offset](#scale_factor),data\\_minjadata\\_maxon oltava pakkaamattomia arvoja pakkaamattomalla tietotyypillä.
         
###### MuuttuvadrawLandMask {#variable-drawlandmask} 
*   [ **drawLandMask** ](#variable-drawlandmask)----- Tämä on OPTIONAL-muuttuja, jota käytetäänERDDAP™  (Ei metatietoja) joka määrittää "Draw Land Mask" -vaihtoehdon oletusarvon tietoaineiston Make A Graph -muodossa ( *datasetID* .grafiikka) &.land-parametri URL-osoitteessa, jossa pyydetään tietojen karttaa. Esimerkiksi,
    ```
        <att name="drawLandMask">under</att>  
    ```
Nähdään[drawLandMaskYleiskatsaus](#drawlandmask).
###### Koodaaminen{#encoding} 
*   [ **• Encoding** ](#encoding)
    * Tätä ominaisuutta voidaan käyttää vain String-muuttujan kanssa.
    * Tätä ominaisuutta suositellaan voimakkaasti.
    * Tämä ominaisuus on peräisin[NetCDFKäyttäjän opas (NUG) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html).
    * SisäisestiERDDAP™Strings on sarja 2-tavuisia hahmoja, jotka käyttävät[Unicode UCS-2 -hahmo](https://en.wikipedia.org/wiki/UTF-16).
    * Monet tiedostotyypit tukevat vain 1-tavuisia merkkejä Stringsissä ja tarvitsevat tätä ominaisuutta tunnistaakseen liitetyn
        [Charset (AKA-koodisivu) ](https://en.wikipedia.org/wiki/Code_page)määritellään, miten 256 mahdollista arvoa voidaan kartoittaa UCS-2-hahmosta ja/tai koodausjärjestelmästä piirrettyihin 256 merkkiin.[UTF-8](https://en.wikipedia.org/wiki/UTF-8)  (1-4 tavua per luonne) .
    * Arvot + nkoodaus ovat tapaus-herkkiä.
    * Teoriassa,ERDDAP™Tunnisteet: E-koodit[Ianan lista](https://www.iana.org/assignments/character-sets/character-sets.xhtml)mutta käytännössä,ERDDAP™Tällä hetkellä vain tukee
        * ISO-8859-1 (Huomaathan, että sillä on kouristuksia, ei koristeita.) Se on sama kuin Unicoden ensimmäiset 256 merkkiä.
        * UTF-8.
    * Lähtetiedostoja lukiessa oletusarvo on ISO-8859-1, lukuun ottamatta netcdf-4-tiedostoja, joissa oletusarvo on UTF-8.
    * Tämä on jatkuva ongelma, koska monet lähdetiedostot käyttävät kaavioita tai koodauksia, jotka eroavat ISO-8859-1:stä, mutta eivät tunnista charset tai koodaus. Esimerkiksi monet lähdetiedostot ovat joitakin metatietoja kopioitu ja liitetty Microsoft Word Windows ja näin on fancy hyphens ja apostrophes Windows-specific Charset sijaan ASCII hypens ja apostrophes. Nämä hahmot ilmestyvät sitten omituisina hahmoina tai ’?’.ERDDAP.
         
###### tiedoston käyttöoikeus{#fileaccessbaseurl} 
*    **[tiedoston käyttöoikeus](#fileaccessbaseurl)Tiedostoliitännät** ovat hyvin harvoin käytettyjä ominaisuuksia, jotka eivät ole mistään standardista. Jos EDDTable-sarakkeessa on tiedostonimiä web-käytettävistä tiedostoista (esim. kuva, video tai äänitiedostot) Voit lisätä
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
URL-osoitteen määrittäminen (Loppuun /) Jotta tiedostonimet olisivat täydellisiä URL-osoitteita. Epätavallisissa tapauksissa, kuten jos sarakkeessa on viittauksia .png-tiedostoihin, mutta arvoista puuttuu ".png", voit lisätä.
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(esimerkiksi&lt;att name="fileAccessSuffix"&gt;.png&lt;a &gt;)
määrittää riittävyys, joka lisätään, jotta tiedostonimet voidaan tehdä täydellisiksi URL-osoitteiksi. Sitten.htmlTableVastaukset,ERDDAP™Näytä tiedostonimi kokonaisen URL-osoitteen linkkinä (Perusta Url plus tiedoston nimi plus riffix) .

Jos haluatERDDAP™palvellakseen tiedostoja, tehdä erillinen[EdDTableFromFileNames](#eddtablefromfilenames)Näiden tiedostojen tiedot (Se voi olla yksityistä tietoa) .
    
###### tiedoston käyttöoikeus Url{#fileaccessarchiveurl} 
*   [ **tiedoston käyttöoikeus Url** ](#fileaccessarchiveurl)Se on harvoin käytetty ominaisuus, joka ei ole mistään standardista. Jos EDDTable-sarakkeessa on tiedostonimiä web-käytettävistä tiedostoista (esim. kuva, video tai äänitiedostot) jotka ovat saatavilla arkiston kautta (esim..ziptiedostotiedosto) URL-osoitteen kautta, käytä&lt;att name="fileAccessArchiveUrl" *URL* &lt;/att&gt; määrittää URL-osoite arkistolle.
    
Jos haluatERDDAP™arkkitehtuuritiedoston toimittaminen, erillisen[EdDTableFromFileNames](#eddtablefromfilenames)Tietoja tästä tiedostosta (Se voi olla yksityistä tietoa) .
    
###### ioos\\_category {#ioos_category} 
*   [ **ioos\\_category** ](#ioos_category)----- Tämä on muuttuva ominaisuus, jos&lt;MuuttujatMustHaveIoosCategory &gt; on suunniteltu todeksi (Oletusarvo) Sisällä[Asennus.xml](/docs/server-admin/deploy-install#setupxml)Muuten se on optimaalinen.
Esimerkiksi,&lt;nimi ="ioos\\_category&gt; Yksinäisyys&lt;&gt;
Kategoriat ovat peräisin[NOAAIntegroitu valtameren tarkkailujärjestelmä (IOOS) ](https://ioos.noaa.gov/).
    
    *    (Tämän kirjoittamisesta) Emme ole tietoisia näistä nimistä.
    * Zdenka Willis: Integrated Ocean Observing System (käytetty) (IOOS)  NOAA"Tavoitteena on rakentaa alustava toimintakyky" ja[IOOS Blueprint](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)  (sivu 1-5) .
    * Todennäköisesti listaa tarkistetaan tulevaisuudessa. Jos sinulla on pyyntöjä, pyydä sähköpostia Chris. Johannes osoitteessa Noaa.gov.
    *   ERDDAP™Tukee laajempaa luetteloa kuin IOOS, koska Bob Simons on lisännyt nimiä. (Enimmäkseen perustuu tieteellisten alojen nimet, kuten biologia, ekologia, meteorologia, tilastot, taksonomia) muihin tietoihin.
    * voimassa olevat arvotERDDAP™Bathymetry, Biology, Bottom Character, CO2, Colored Dissolved Organic Matter, Contaminants, Currents, Dissolved Nutrients, Dissolved O2, Ecology, Fish Abundance, Fish Species, Heat Flux, Hydrology, Ice Distribution, Location, Meteorology, Ocean Color, Optical Properties, Muut, Pahogendity, Suplanture
    * Eri termien välillä on päällekkäisyyttä ja epävarmuutta – tee parhaasi.
    * Jos lisäätioos\\_categoryluetteloon&lt;categoryAttributes&gt; SisälläERDDAP&gt;[Asennus.xml](/docs/server-admin/deploy-install#setupxml)tiedosto, käyttäjät voivat helposti löytää tietoja, joilla on samanlaisia tietojaERDDAP"Tietoaineistojen etsiminen luokasta" kotisivulla.
        [Kokeile käyttääioos\\_categoryetsiä kiinnostuksen kohteita.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Siellä oli[Keskustelua aiheestaERDDAP™jaioos\\_categorySisälläERDDAP™Google Group.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w)
    
Saatat kiusata asettaa&lt;MuuttujatMustHaveIoosCategory &gt; väärä niin, että tätä ominaisuutta ei tarvita. (PFT&#33; Mikä se on minulle?”) Joitakin syitä jättää se todeksi (Oletusarvo) käyttääioos\\_categoryovat:
    
    * Jos asennus.xml&lt;MuuttujatMustHaveIoosCategory on asetettu todeksi,[GenerateDatasetsXml](#generatedatasetsxml)Luo aina / suositteleeioos\\_categoryjokaisesta muuttujasta jokaisessa uudessa tietoaineistossa. Miksei vain jätä sitä sisään?
    *   ERDDAP™Käyttäjät voivat etsiä kiinnostuksen kohteita kategoriassa.ioos\\_categorySe on erittäin hyödyllinen hakukategoria, koska ioos. (Esimerkiksi lämpötila) ovat melko laajat. Tämä tekeeioos\\_categoryPaljon parempi tähän tarkoitukseen kuin esimerkiksi paljon hienompi CFstandard\\_names (jotka eivät ole niin hyviä tähän tarkoitukseen kaikkien synonyymien ja pienien variaatioiden vuoksi, esimerkiksi sea ́surface ́n lämpötila vs. Meri | Lämpötila) .
(käyttäminen)ioos\\_categoryTätä tarkoitusta varten valvotaan&lt;categoryAttributes&gt; asennus.xml-tiedostossa.)
        [Kokeile käyttääioos\\_categoryetsiä kiinnostuksen kohteita.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Nämä kategoriat ovat peräisin[NOAAIntegroitu valtameren tarkkailujärjestelmä (IOOS) ](https://ioos.noaa.gov/). Nämä kategoriat ovat keskeisiä IOOS:n kuvauksissa. Jos olet sisälläNOAAtukeminenioos\\_categoryon hyvä Yksi-NOAAtekemistä. (Katso tämä[YksiNOAAVideo video video video video video](https://www.youtube.com/watch?v=nBnCsMYm2yQ)Ole inspiroitunut&#33;) Jos olet jossain muualla Yhdysvalloissa tai kansainvälisessä virastossa tai työskentelet valtion virastojen kanssa tai työskentelet jonkin muun valtameren tarkkailujärjestelmän kanssa, eikö ole hyvä idea tehdä yhteistyötä Yhdysvaltain IOOS-toimiston kanssa?
    * Ennemmin tai myöhemmin voit haluta toisen.ERDDAP™linkittäminen tietoaineistoihisi[EDDGridLähde: Eddap](#eddfromerddap)ja[EdDTableFromDap](#eddfromerddap). Jos toinenERDDAP™Vaatiiioos\\_categoryTietokoneilla on oltavaioos\\_categoryJottaEDDGridFromErddap ja EDDTableFromErddap töihin.
    * Psykologisesti on helpompi sisällyttääioos\\_categoryKun luot datan (On vain yksi asia, ettäERDDAP™Tiedot on lisättäväERDDAP) Sen sijaan, että lisäisit sen faktan jälkeen (Jos haluat käyttää sitä tulevaisuudessa) .
         
###### long\\_name {#long_name} 
*   [ **long\\_name** ](#long_name)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)ja[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metatiedot) Se on muuttuva ominaisuusERDDAP. Esimerkiksi,
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *   ERDDAP™käyttäälong\\_nameAkselien merkitseminen grafiikoilla.
    * Parhaat käytännöt: Päällystä sanat sisällelong\\_namekuin otsikko olisi (Ensimmäistä sanaa ja kaikkia ei-artikkeleja) . Älä sisällytä yksiköitälong\\_name. Pitkän nimen ei pitäisi olla pitkä (yleensä)&lt;20 merkkiä, mutta pitäisi olla kuvailevampi kuin[destinationName](#destinationname)Se on usein hyvin tiivistä.
    * Jos "long\\_name"Ei ole määritelty muuttujien[Lähde](#variable-addattributes)tai tai&lt;addAttributes&gt;,ERDDAP™Se syntyy siivoamalla[standard\\_name](#standard_name)  (jos läsnä) taidestinationName.
         
###### missing\\_value {#missing_value} 
*   [ **missing\\_value** ](#missing_value)ja **| Täytä Arvon arvo**   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)ja[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) Muuttuvat ominaisuudet, jotka kuvaavat numeroa (Esimerkiksi -9999) jolla tarkoitetaan puuttuvaa arvoa. Esimerkiksi,

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

String-muuttujat, oletus molemmille on " (Tyhjä jousi) .
Numeeristen muuttujat, oletus molemmille on NaN.
*   ERDDAP™tukee molempiamissing\\_valueArvo, koska jotkin tietolähteet antavat heille hieman eri merkityksiä.
* Jos näin on, niiden on oltava samantyyppisiä kuin muuttujien.
* Jos tiedot on pakattu[scale\\_factorja/taiadd\\_offset](#scale_factor),missing\\_valueMyös arvot on pakattava. Samoin sarakkeessa, jossa on String-päivä/aika-arvot, jotka käyttävät paikallista[time\\_zone](#time_zone),missing\\_valueArvojen tulisi käyttää paikallista aikavyöhykettä.
* Jos muuttuja käyttää näitä arvoja,missing\\_valueja / tai \\ \\ \\ \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t t \\ t \\ t \\ t \\ t t \\ t t \\ t t t t t t t t t t t t t t t t \\ t t t t t t t t t t t t t t t \\ t t t t t t t t t t t t t t t t \\ t t t t t t t t t t t t t t t t t t t t t 
* For For[Aika- ja aikaleimamuuttujat](#time-units)  (onko lähde merkkijono vai numeerinen) ,missing\\_values ja \\ \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t t \\ t \\ t t \\ t t \\ t t t \\ t t t t t t t t t t t t t t t t \\ t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t \\ t t t t t t t t t t t t t t t t t t t t t  (Tyhjä jousi) kun aika on kirjoitettu nannaksi, jolloin aika on kaksinkertainen. Lähteen arvotmissing\\_value|Fill-arvo ei näy muuttujan metadatassa.
* muuttujia,ERDDAP™Käännä ainamissing\\_values tai tiedostoarvot " (Tyhjä jousi) . Lähteen arvotmissing\\_value|Fill-arvo ei näy muuttujan metadatassa.
* Numeeriset muuttujat:
Themissing\\_value|Fill-arvo näkyy muuttujan metadatassa.
joidenkin tulostustietojen muodossa,ERDDAP™Nämä numerot jäävät koskemattomiksi, esim. 9999.
Muihin lähtötietomuotoihin (.csv:n kaltaiset tekstit ja.htmlTable) ,ERDDAP™Korvaa nämä erityisluvut Nanilla tai ".
* Joissakin tietotyypeissä on puuttuvia arvomerkkejä, joita ei tarvitse nimenomaisesti tunnistaa.missing\\_value• FILL-arvon ominaisuudet: kelluvat ja kaksoismuuttujat ovat NaN (Ei numero) String-arvot käyttävät tyhjää merkkijonoa, ja hyväntekeväisyysarvoilla on luonteensa.\\uffff  (#65535, joka on Unicoden arvo ei ole ominaisuus) . Integer-tietotyypeillä ei ole puuttuvia arvomerkkejä.
* Jos kokonaismuuttujalla on puuttuva arvo (Esimerkiksi tyhjä paikka .csv-tiedostossa) ,ERDDAP™tulkitsee arvoa määritellynmissing\\_value• | | \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ t \\ \\ \\ \\ \\ t \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ t \\ \\ \\ n arvo kyseiselle muuttujalle. Jos ei ole määritelty,ERDDAP™tulkitsee arvon kyseisen tietotyypin puuttuvana arvona, joka on aina kyseisen tietotyypin maksimiarvo:
127 sivumuuttujaa, 32767 lyhyesti, 2147483647 int, 9223372036854775807 pitkään,
255 ubyte, 65535 uhort, 4294967295 uint, ja 18446744073709551615 ulong.
###### ADD \\_FillValue ATTRIBUTES??{#add-_fillvalue-attributes} 
*   [ADD \\_FillValue ATTRIBUTES??](#add-_fillvalue-attributes)  
Joka kertaERDDAP™ladata tietoaineiston, se tarkistaa, onko muuttujilla, joilla on kokonaislähdetietotyyppi, määritettymissing\\_value• = arvonmääritys. Jos muuttuja ei,ERDDAP™Kirjoita viesti lokitiedostoon (Alkuperäinen nimi: Add & FillValue Attribute) Suosittelen, ettäERDDAP™Järjestäjä lisää 🙂 Arvonmääritys tästä muuttujastadatasets.xml. On erittäin hyödyllistä, että jokaisella muuttujalla on arvo taimissing\\_valuekoska puuttuvat arvot ovat aina mahdollisia, esimerkiksi jos tietyllä tiedostolla ei ole tiettyä muuttujaa,ERDDAP™On pystyttävä esittämään tämä muuttuja, koska sillä on kaikki puuttuvat arvot. Jos päätät muuttujan ei pitäisi olla \\ \\ ill arvo attribuutti, voit lisätä
    &lt;att-nimet ="FillValue"&gt;&lt;/att&gt;, joka tukahduttaa viestindatasetID+ vaihteleva yhdistelmä tulevaisuudessa.
    
Joka kertaERDDAP™Aloita, se kerää kaikki nämä suositukset viestiksi, joka on kirjoitettu lokitiedostoon. (Aloitetaan "ADD \\_FillValue ATTRIBUTES?”) SähköpostiosoiteERDDAP™ylläpitäjä ja kirjoitettu CSV-tiedostoon\\[isovanhemmat\\]Hakemuksia/hakemistoja. Jos haluat, voit käyttää GenerateDatasetsXml-ohjelmaa. (AddFillValueAttributes -vaihtoehto) soveltaa kaikkia CSV-tiedoston ehdotuksiadatasets.xmltiedosto. mille tahansadatasetID/muuttuja yhdistelmiä kyseisessä tiedostossa, jos päätät, että ei ole tarvetta lisätä määritettyä, voit muuttaa ominaisuutta.&lt;att-nimet ="FillValue"&gt;&lt;/att &gt; tukahduttaa tämän suosituksendatasetID+ vaihteleva yhdistelmä tulevaisuudessa.
    
Tämä on tärkeää&#33;
Kuten Bob on usein sanonut: se on paha (Hävettää) jos osa ilmaston lämpenemisen todisteista johtuu tunnistamattomista puuttuvista arvoista (Esimerkiksi lämpötila-arvot 99 tai 127 ° C, joka olisi pitänyt merkitä puuttuvina arvoina ja siten luonnostella keskiarvoa ja/tai mediaanitilastoja korkeammiksi.) .

* Arvoa jamissing\\_valuetietyn muuttujan arvojen on oltava yhdenmukaisia eri lähdetiedostoissa; muutenERDDAP™Hyväksyy tiedostot yhdellä arvojoukolla ja hylkää kaikki muut tiedostot "Bad Files". ongelman ratkaisemiseksi,
    * Jos tiedostot on griddoitu.nctiedostoja, voit käyttää[EDDGridLähde: NCFiles Unpacked](#eddgridfromncfilesunpacked).
    * Jos tiedostot ovat tabulaarisia datatiedostoja, voit käyttää EDDTableFrom-tiedostoja. """[Standardisointi Mitä](#standardizewhat)kertomaanERDDAPstandardisoida lähdetiedostoja, kun ne luetaanERDDAP.
    * Kovemmissa ongelmissa voit käyttää[NCML](#ncml-files)tai tai[NCO](#netcdf-operators-nco)ongelman ratkaisemiseksi.
             
###### scale\\_factor {#scale_factor} 
*   [ **scale\\_factor** ](#scale_factor)  (Oletusarvo = 1) ja **add\\_offset**   (Oletusarvo = 0)   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)ja[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) OPTIONAL-muuttujat, jotka kuvaavat tietoja, jotka on pakattu yksinkertaisempaan tietotyyppiin yksinkertaisen muuntamisen kautta.
    * Jos näin on, niiden tietotyyppi poikkeaa lähdetietotyypistä ja kuvaa kohdearvojen tietotyyppiä.
Esimerkiksi tietolähde olisi voinut tallentaa kelluvan datan arvoja yhdellä desimaalinumerolla, joka on pakattu lyhyiksi pakkauksiksi. (16) käyttäenscale\\_factor0,1 jaadd\\_offset= 0, esimerkiksi

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

Tässä esimerkissä,ERDDAP™poistaisi tiedot ja esittäisi ne käyttäjälle kelluvina tietoarvoina.
    * Jos läsnä,ERDDAP™Poistaa näiden ominaisuuksien arvot, poistaa ominaisuudet ja poistaa automaattisesti käyttäjän tiedot:
Kohteen määrä Arvo = lähde Arvo \\ *scale\\_factor+add\\_offset  
Tai sitten toista tapaa:
Pakkausarvo = pakattu Arvo \\ *scale\\_factor+add\\_offset
    * Thescale\\_factorjaadd\\_offsettietyn muuttujan arvojen on oltava yhdenmukaisia eri lähdetiedostoissa; muutenERDDAP™Hyväksyy tiedostot yhdellä arvojoukolla ja hylkää kaikki muut tiedostot "Bad Files". ongelman ratkaisemiseksi,
        * Jos tiedostot on griddoitu.nctiedostoja, voit käyttää[EDDGridLähde: NCFiles Unpacked](#eddgridfromncfilesunpacked).
        * Jos tiedostot ovat tabulaarisia datatiedostoja, voit käyttää EDDTableFrom-tiedostoja. """[Standardisointi Mitä](#standardizewhat)kertomaanERDDAPstandardisoida lähdetiedostoja, kun ne luetaanERDDAP.
        * Kovemmissa ongelmissa voit käyttää[NCML](#ncml-files)tai tai[NCO](#netcdf-operators-nco)ongelman ratkaisemiseksi.
             
###### standard\\_name {#standard_name} 
*   [ **standard\\_name** ](#standard_name)  (From the[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Metadata Standard) Se on muuttuva ominaisuusERDDAP. CF ylläpitää sallittua luetteloa[CF-standardit](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). Esimerkiksi,
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * Jos lisäätstandard\\_nameMuuttujien ominaisuuksia ja lisäyksiästandard\\_nameluetteloon&lt;categoryAttributes&gt; SisälläERDDAP&gt;[Asennus.xml](/docs/server-admin/deploy-install#setupxml)tiedosto, käyttäjät voivat helposti löytää tietoja, joilla on samanlaisia tietojaERDDAP"Tietoaineistojen etsiminen luokasta" kotisivulla.
    * Jos määrität CF:nstandard\\_nameMuuttujan osalta muuttujan yksiköiden ei tarvitse olla samanlaisia kuin CF-standardin nimitaulukossa määritellyt Canonical Units -yksiköt, mutta yksiköt on vaihdettava kanonisiin yksiköihin. Esimerkiksi kaikki lämpötilaan liittyvä CFstandard\\_nameS:llä on "K" (Kelviini) kuin kanoninen yksikkö. Muuttuja, jolla on lämpötilaan liittyvästandard\\_nameOn oltava yksiköitä K, tutkinto, tutkinto tai jotkut UDUnits muunnelma näistä nimistä, koska ne ovat kaikki ristiriidassa.
    * Parhaat käytännöt: Osa valtaa[Valvotut sanavarastot](https://en.wikipedia.org/wiki/Controlled_vocabulary)Käytetään vain luettelon ehtoja. Suosittelemme siis noudattamaan kontrolloidussa sanastossa määriteltyjä termejä ja suosittelemme termin laatimista, jos luettelossa ei ole sopivaa. Jos tarvitset lisäehtoja, katso, lisäävätkö standardivaliokunta niitä valvottuun sanavarastoon.
    *   standard\\_nameArvot ovat ainoat CF-arvot, jotka ovat arkaluonteisia. Ne ovat aina matalampia. Aloita sisäänERDDAP™V1.82 GenerateDatasets muuntaa yläasteen kirjeitä alentaviin kirjeisiin. Kun aineisto on ladattuERDDAPYläkerran kirjeet vaihdetaan hiljaa alemmiksi kirjeiksi.
         
###### time\\_precision {#time_precision} 
*   time\\_precisionSe on OPTIONALINEN, jota käytetäänERDDAP™  (Ei metatietoja) for[Aika- ja aikaleimamuuttujat](#time-units), joka voi olla verkkotietoaineistoissa tai tabulaarisissa tietoaineistoissa jaaxisVariableS taidataVariables. Esimerkiksi,
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
    time\\_precisionmäärittää tarkkuuden, jota käytetään ainaERDDAP™muotoilee aika-arvot kyseisestä muuttujasta merkkijonoina verkkosivuilla, mukaan lukien.htmlTablevastauksia. tiedostomuodoissa, joissaERDDAP™Muotoilevat ajat merkkijonoina (.csv ja.json) ,ERDDAP™Käytä vaintime\\_precisionmääritetty muoto, jos se sisältää murtosekuntia; muutenERDDAP™Käyttää 1970-01-01T00:00 Z-muodossa.
* Valid-arvot ovat 1970-01, 1970-01-01, 1970-01-01T00Z, 1970-01-01T00:00Z, 1970-01-01-01T00:00Z (Oletusarvo) 1970-01-01T00:00:00.0Z, 1970-01-01T00:00.00Z, 1970-01-01-01T00:00:00.000Z\\[1970 ei ole vaihtoehto, koska se on yksi numero.ERDDAP™Et voi tietää, onko se muotoiltu aikamerkki (vuodessa) tai jos se on muutama sekunti sitten 1970-01-01T00:00.\\]
* Jostime\\_precisionei ole määritelty tai arvo ei sovi, oletusarvo käytetään.
* Tässä, kuten muissakin osissaERDDAP™mille tahansa muotoillun ajan kentälle, jota ei näy, oletetaan olevan vähimmäisarvo. Esimerkiksi 1985-07, 1985-07-01, 1985-07-01T00Z, 1985-07-01T00:00Z ja 1985-07-01T00:00 Z:tä pidetään samanarvoisina, vaikkakin tarkkuudeltaan eri tasoilla. Tämä vastaa[ISO 8601:2004"extended"Aikamuodon määrittely](https://www.iso.org/iso/date_and_time_format).
*    **Varoitus:** Sinun pitäisi käyttää vain rajoitettuatime\\_precisionjos **Kaikki kaikki** Muuttujan tietoarvoilla on vain vähimmäisarvo kaikille piilossa oleville kentille.
    * Voit esimerkiksi käyttäätime\\_precision1970-01-01, jos kaikilla tietoarvoilla on tunti = 0, minuutti = 0 ja toinen = 0. (Esimerkiksi 2005-03-04T00:00:00Z ja 2005-03-05T00:00) .
    * Esimerkiksi älä käytätime\\_precision1970-01-01, jos ei-0 tuntia, minuuttia tai sekuntia (2005-03-05T12:00) Koska ei-oletusaika-arvoa ei näy. Muuten, jos käyttäjä pyytää kaikkia tietoja aika =2005-03-05, pyyntö epäonnistuu odottamatta.
             
###### time\\_zone {#time_zone} 
*   [ **time\\_zone** ](#time_zone)
    *   time\\_zoneSe on OPTIONALINEN, jota käytetäänERDDAP™  (Ei metatietoja) for[Aika- ja aikaleimamuuttujat](#time-units), jotka voivat olla verkottuneissa tietoaineistoissa tai tabulaarisissa tietoaineistoissa.
    * Oletusarvo on "Zulu""" (Nykyaikainen versio GMT:stä) .
    * Background information: Time offsets Näytä tarkat tiedot (Pacific Standard Time, 08:00, GMT-8) kiinteät, konkreettiset kompenssit suhteessaZulu  (GM) . Päinvastoin, "aikavyöhykkeet" ovat paljon monimutkaisempia asioita, joihin Daylight Saving vaikuttaa. (Esimerkiksi ”Yhdysvallat/Tyynenmeri”) Sillä on ollut erilaisia sääntöjä eri paikoissa eri aikoina. Aikavyöhykkeillä on aina nimet, koska niitä ei voi tiivistää yksinkertaisella offset-arvolla. (Katso taulukon "TZ-tietokannan nimet"[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .ERDDAP&gt;time\\_zoneattribuutti auttaa sinua käsittelemään paikallisia aikatietoja tietyltä aikavyöhykkeeltä (1987-03-25T17:32:05 Tyynenmeren Aika-aika) . Jos sinulla on merkkijono tai numeerinen aikatiedot (Kiinteä) Ajan myötä, sinun pitäisi vain säätää tietojaZulu  (Mikä on mitäERDDAP™Haluavat) määrittämällä eri perusta-aika yksikköjen attribuutissa (mm. "tunnit vuodesta 1970-01-01T08:00:00Z", huomauttaa T08 määrittää aika offset.) Tarkista aina tulokset, jotta saat haluamasi tulokset.
    * Aikaleimamuuttujat, joissa on lähdetietoja Stringsistä, tämän ominaisuuden avulla voit määrittää aikavyöhykkeen, joka johtaaERDDAP™Paikallis-aika-alueen lähdeajat (Joitakin vakio-aikoja, osa päivänvalon säästöaikaa) sisäänZuluKertoja (joka on aina normaalia aikaa) . Luettelo voimassa olevista aikavyöhykkeiden nimistä on todennäköisesti sama kuin TZ-sarakkeessa olevassa luettelossa.[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Yhdysvaltain aikavyöhykkeet ovat: US/Hawaii, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, US/Itä.
    * Aikaleimamuuttujat, joissa on numeerisia lähteitä koskevia tietoja, voit määrittäätime\\_zone"Anteeksi, mutta arvon on oltava"ZuluTai ”UTC”. Jos tarvitset tukea muihin aikavyöhykkeisiin, lähetä sähköpostia. Johannes osoitteessa Noaa.gov.
         
###### Yksiköt{#units} 
*   [ **Yksiköt** ](#units)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)ja[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata Standard) määrittää data-arvojen yksiköt. Esimerkiksi,
    ```
        <att name="units">degree\\_C</att>
    ```
    * "yksiköt" on REQUIRED joko lähteenä tai lisäosana"time"muuttujat ja ne on valmistettu aina kun se on tarkoituksenmukaista (joka on lähes aina) .
    * Yleisesti ottaen suosittelemme[UDUnits](https://www.unidata.ucar.edu/software/udunits/)yhteensopivat yksiköt, joita tarvitaan[COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)ja[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)standardeja.
    * Toinen yhteinen standardi on[U](https://unitsofmeasure.org/ucum.html)Yhdistetty mittayksiköiden koodi.[OGC](https://www.ogc.org/)Palvelut, kuten[SOS](https://www.ogc.org/standards/sos),[WCS](https://www.ogc.org/standards/wcs)ja[WMS](https://www.ogc.org/standards/wms)vaatia UCUM ja usein viittaa UCUM kuin UOM (Mittayksiköt) .
    * Suosittelemme, että käytät yhtä yksikköstandardia kaikkiin tietoaineistoihin.ERDDAP. Sinun pitäisi kertoaERDDAP™minkä standardin kanssa käytät&lt;Yksiköt &gt; &gt; omassa[Asennus.xml](/docs/server-admin/deploy-install#setupxml)tiedosto.
    * Tietyn muuttujan yksiköiden on oltava yhdenmukaisia eri lähdetiedostoissa. Jos sinulla on kokoelma tiedostoja, joissa yksi tiedostojen osajoukko käyttää eri yksikköarvoja kuin yksi tai useampi muu tiedostojen osajoukko (esim.
"päivät vuodesta 1985-01-01" ja "päivät vuodesta 2000-01-01"
"Degree | Celsius" ja "deg ́C"
"knots" vs. "m/s") sinun on löydettävä keino standardisoida yksikköarvot, muuten,ERDDAP™Lataa vain yksi osa tiedostoista. Ajattele sitä: jos yhdellä tiedostolla on tuulinopeusyksiköt = solmut ja toisella on tuulinopeusyksiköt = m/s, näiden kahden tiedoston arvot eivät sisälly samaan koottuun tietoaineistoon.
        * Jos tiedostot on griddoitu.nctiedostoja, joissa voit käyttää[EDDGridLähde: NCFiles Unpacked](#eddgridfromncfilesunpacked).
        * Jos tiedostot ovat tabulaarisia tietotiedostoja, voit käyttää EDDTableFrom-tiedostoja useissa tilanteissa. """[Standardisointi Mitä](#standardizewhat)kertomaanERDDAPstandardisoida lähdetiedostoja, kun ne luetaanERDDAP.
        * Kovemmissa ongelmissa voit käyttää[NCML](#ncml-files)tai tai[NCO](#netcdf-operators-nco)ongelman ratkaisemiseksi.
    * CF-standardin 8.1 kohdassa sanotaan, että jos muuttujan tiedot on pakattu[scale\\_factorja/taiadd\\_offset](#scale_factor)”Muuttujan yksiköiden tulee edustaa pakkaamattomia tietoja.”
    *   [aika- ja aikaleiman muuttujia,](#time-units)Joko muuttujien[Lähde](#variable-addattributes)tai tai&lt;addAttributes&gt; (joka ottaa etusijan) Pitää olla[Yksiköt](#units)joka on myös
        
        * Aika-akselimuuttujat tai aikatietomuuttujat, joissa on numeerisia tietoja:[UDUnits](https://www.unidata.ucar.edu/software/udunits/)Yhteensopiva merkkijono (formaatin kanssa *Yksiköt* Siitä lähtien *Perustaminen* ) Miten tulkita aika-arvoja (Esimerkiksi 1970-01-01T00:00:00) .
            
         *Yksiköt* Voi olla mikä tahansa:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
teknisesti,ERDDAP™ei seuraaUDUNITSstandardi, kun muunnetaan"years since"ja"months since"Ajan arvot"seconds since". TheUDUNITSStandardi määrittelee vuoden kiinteäksi, yhden arvoksi: 3,15569259747e7 sekuntia. JaUDUNITSKuukausi määritellään vuodeksi/12. Suurin osa / kaikki tiedostot, joita olemme nähneet"years since"tai tai"months since"Tarkoituksena on olla kalenterivuosi tai kalenterikuukausi. Esimerkiksi 3"months since 1970-01-01"Tarkoituksena on yleensä 1970-04-01. Niin,ERDDAP™tulkinta"years since"ja"months since"kalenterivuosina ja kuukausina, eikä noudata tiukastiUDUNITSstandardi.
            
The *Perustaminen* ISO 8601:2004 (E) muotoiltu päivämäärä (yyyy-MM-ddT'HHH:mm:ssZ, esim. 1970-01-01T00:00:00) tai jonkinlainen variaatio siitä (Esimerkiksi osat puuttuvat lopussa) .ERDDAP™Työskentelee laajan valikoiman vaihteluja, kuten "1970-1 0:0:0" on tuettu. Jos aikavyöhykkeen tiedot puuttuvat, sen oletetaan olevanZuluAikavyöhyke (AKA GMT) . Jos jokin aika on määritetty,ERDDAP™Älä koskaan käytä päivänvalon säästöaikaa. Jos käytät jotain muuta muotoa, sinun on käytettävä&lt;addAttributes&gt; määrittää uusi yksikköjono, joka käyttää ISO 8601:2004 -standardin vaihtelua (E) Muutospäiviä 1.1.1985 jälkeen vuosina 1985-01-01.
        
Voit testataERDDAPkykyä käsitellä tiettyä *Yksiköt* Siitä lähtien *Perustaminen* kanssaERDDAP&gt;[Aika muuntaa](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html). Toivottavasti voit liittää numeroon (Ensimmäistä kertaa tietolähteen arvo?) ja yksikköjono, klikkaa Convertia jaERDDAP™voidaan muuntaa ISO 8601:2004 (E) muotoiltu päivämäärä. Muuntaja palauttaa virheilmoituksen, jos yksikköjono ei ole tunnistettavissa.

###### Ajan yksiköt{#string-time-units} 
*   [Kun yksiköt määrittävät aika- tai aikaleimatietomuuttujat String-datalla,](#string-time-units)Sinun on määriteltävä[Java.time.DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)kuvio (Se on enimmäkseen yhteensopiva java.textin kanssa. Yksinkertainen muoto) Tämä kuvailee, miten tulkita merkkijonoja.
    
ISO 8601:2004 -standardin mukaiset aikamuodot (E) Standard formaatti (Esimerkiksi 2018-01-02T00:00:00) Voit määrittää variaatiotyyyy-MM-ddT'HHH: mm:ssZ, esimerkiksi käyttöyyyy-MM-ddjos jousiaika on vain päivämäärä. jokaisessa muodossa, joka alkaa yyy-M:stä,ERDDAPkäyttää erityistä parseria, joka on erittäin anteeksiantava pienistä vaihteluista muodossa. Papukaija voi käsitellä aikavyöhykkeitä muodossa "Z", "UTC", "GMT", ±XX, ±XXX ja ±XX. Jos osa päivämäärästä ei ole määritelty (Esimerkiksi minuutit ja sekunnit) ,ERDDAP™Ottaa alhaisimman arvon tällä alalla (Jos sekuntia ei määritetä, sekunnit = 0) .
    
Kaikissa muissa merkkijonoaikamuodoissa sinun on täsmälleen määritettävä DateTimeFormatter-yhteensopiva aikamuoto. Kuin kuinyyyy-MM-ddT’HHH:mm:ssZ, nämä muotojonot on rakennettu hahmoista, jotka tunnistavat tietyntyyppisen informaation aikajonosta, esimerkiksi m tarkoittaa minuuttia. Jos toistat muotomerkin useampaan kertaan, se jalostaa merkityksensä, esimerkiksi m tarkoittaa, että arvo voidaan määrittää millä tahansa numerolla, mm tarkoittaa, että arvo on määritettävä kahdella numerolla. TheJavaDateTimeFormatterin dokumentointi on julma yleiskatsaus, eikä se tee näistä yksityiskohdista selvää. Tässä on luettelo muotokuvien vaihteluista ja niiden merkityksestä.ERDDAP™  (Toisinaan hieman erilainen kuinJavaDateTimeFormatter) :
    
    |Ominaisuudet|Esimerkkejä|Merkitys|
    |------|------|------|
    |Y, Y, Y|\\-4712, 0, 1, 10, 100, 2018|vuosinumero, mikä tahansa numero.ERDDAP™kohtelee y (Vuosi-aika) Y (Viikoittain, koska sitä käytetään usein virheellisesti y:n sijaan.) kuin sinä,[tähtitieteellinen luku](https://en.wikipedia.org/wiki/Astronomical_year_numbering). Tähtitieteelliset vuodet ovat positiivisia tai negatiivisia kokonaislukuja, jotka eivät käytä BCE:tä. (BC) tai CE (AD) aikakauden suunnittelijat: 2018=2018CE, ..., 2=2CE, 1=1CE, 0=1BCE, -1=2BCE, -2=3BCE,|
    |uu, yy, YYY|\\-4712, 0000, 0001, 0010, 0100, 2018|4-numeroinen tähtitieteellinen luku (Ei huomioida mitään edeltävää ")  |
    |M|1 01, 12|Kuukauden numero, kaikki numerot (1 = tammikuu)  |
    |MMM|01, 12|Kaksi numeroa (zero pedded) Kuukauden numero|
    |MMMM|Jan, JAN|3-kirjeen englanninkielinen nimi, tapaus herkkä|
    |MMMMM|Jan, Jan, JAN, tammikuu, tammikuu, JANUARY|3-kirjain tai koko englanninkielinen nimi, tapaus herkkä|
    |d d|01, 31|Kuukauden numero, mikä tahansa numero|
    |dd|01, 31|Kaksi numeroa (zero pedded) Kuukauden päivä. Ensimmäinen "digit" voi olla avaruus.|
    |D|1 001, 366|päivästä toiseen, numeroiden lukumäärä, 001=Jan 1|
    |DDD|001, 366|3 numeroa, 001=Jan 1|
    |E|Sinä, Thu|3 kirjainta viikossa, arvo jää huomiotta, kun|
    |E|Sinä, Thu, Thursday, Torstai|3 kirjainta tai koko englanninkielinen päiväviikko, tapaus herkkä, arvo jätetään huomiotta, kun hemmottelevat|
    |H|0,00, 23|H-tunti päivässä (0-23) Kaikki numerot|
    |HHH|00, 23|HH-tunti päivässä (00-23) Kaksi numeroa. Ensimmäinen "digit" voi olla avaruus.|
    |A|AM, PM|AM tai PM, tapausherkkä|
    |h|12, 1, 01, 11|Kello-of-am-pm (12, 1, 2, 11) Kaikki numerot|
    |H|12, 01, 11|Kello-of-am-pm (12, 1, 2, 11) Kaksi numeroa. Ensimmäinen "digit" voi olla avaruus.|
    |K K|0, 11|Tunti-of-am-pm (0,1...11) Kaikki numerot|
    |KK|01, 11|Tunti-of-am-pm, 2 numeroa|
    |m|0,00, 59|Tunnin minuutti, kaikki numerot|
    |mm|59|Tunnin minuutti, kaksi numeroa|
    |s|0,00, 59|minuutti, mikä tahansa numero|
    |SS|59|Toisen minuutin, kaksi numeroa|
    |S|0,000, 999|Toisen osan murto-osa, ikään kuin desimaalipisteen seuraaminen, numeroiden määrä|
    |SS|99|Satoja sekuntia, kaksi numeroa|
    |SSS|999|Tuhat sekuntia, kolme numeroa|
    |A|0,0000, 86399999|Millisecond-of-day, kaikki numerot|
    |AAAAAAAA|8639999999000000000000000|Millisecond-of-day, 8 merkkiä|
    |N|0 000000000000000000000000, 86399999999999999999999999999999999999999999999999999999|Nanosecond-of-day, kaikki numerot. SisälläERDDAP™Tämä on nMillis.|
    |NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN|86999999999999999999999999999999000000000000000000000000000000000000000000, 8639999999999999999999999999999999|Nanosecond-of-day, 14 numeroa SisälläERDDAP™Tämä on nmillis.|
    |n|0,000000000000000000, 5999999999999999999999999|Nanosecond-of-Second, kaikki numerot. SisälläERDDAP™Tämä on nmillis.|
    |NNNNNNN|5999999999999999999000000000000000000000000000|Nanosecond-of-Second, 11 numeroa. SisälläERDDAP™Tämä on nmillis.|
    |XXX, ZZZ|08:00, +01:00|aikavyöhyke, jossa on muoto "Z" tai ± (2 Digitaalinen offset) : (2 digitmin offset) . Tämä kohtelee *Avaruuden avaruus* Kuten + (Ei-standardi) . ZZZZ tukee "Z" on epänormaali, mutta käsittelee yleistä käyttäjävirhettä.|
    |XX, ZZ|0800, +0100|aikavyöhyke, jossa on muoto "Z" tai ± (2 Digitaalinen offset) : (2 digitmin offset) . Tämä kohtelee *Avaruuden avaruus* Kuten + (Ei-standardi) . ZZ:n tukeminen on epänormaalia, mutta siinä käsitellään käyttäjävirhettä.|
    |X, Z|08, +01|aikavyöhyke, jossa on muoto "Z" tai ± (2 Digitaalinen offset) : (2 digitmin offset) . Tämä kohtelee *Avaruuden avaruus* Kuten + (Ei-standardi) . Z:n tukeminen on epänormaalia, mutta siinä käsitellään yleistä käyttäjävirhettä.|
    |xxxxx|08:00, +01:00|Aikavyöhyke, jossa on muoto ± (2 Digitaalinen offset) : (2 digitmin offset) . Tämä kohtelee *Avaruuden avaruus* Kuten + (Ei-standardi) .|
    |xxxx|0800, +0100|Aikavyöhyke, jossa on muoto ± (2 Digitaalinen offset)  (2 digitmin offset) . Tämä kohtelee *Avaruuden avaruus* Kuten + (Ei-standardi) .|
    |x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x|08, +01|Aikavyöhyke, jossa on muoto ± (2 Digitaalinen offset) . Tämä kohtelee *Avaruuden avaruus* Kuten + (Ei-standardi) .|
    |"""|"T", "Z", "GMT"|Aloita ja lopeta sarja kirjallisia hahmoja|
    |""" """ (Kaksi singleä)  |""" """|Kaksi singleä tarkoittaa kirjaimellista yksittäistä lainausta|
    | \\[\\] | \\[ \\] |Aloitus ("""\\[""") Loppu ("""\\]""") valinnainen osa. Tämä merkintä tukee vain kirjaimellisia merkkejä ja lopussa muoto jono.|
    |#123; #125;|#123; #125;|varattu tulevaan käyttöön|
    |G, L, Q,e,c, V,z, O,p|     |Näitä muotokuvia tukevatJavaDateTimeFormatter, mutta ei tällä hetkellä tueERDDAP. Jos tarvitset tukea, sähköposti Chris. Johannes osoitteessa Noaa.gov.|
    
Huomautuksia:
    
    * Päivämäärällä, jossa on täsmällisyys, numeeriset arvot voivat olla muuttujanumeroita. (esim. USA:n slash-päivämuodossa ”1/2/1985”, kuukausi ja päivämäärä voivat olla 1 tai 2 numeroa.) Näin muodon on käytettävä 1-kirjeen merkkiä, esim. M/d/yyyy, joka hyväksyy minkä tahansa numeron kuukausi- ja päivämääräksi.
    * Jos numeroiden lukumäärä on vakio, esim. 01/02/1985, määritä sitten numeroiden lukumäärä muodossa, esim. MM/dd/yyyy 2-numeroiseksi kuukaudeksi, 2-numeroiseksi päivämääräksi ja 4 numerovuodeksi.
    * Nämä muodot ovat hankalia työskennellä. Tietty muoto voi toimia useimmille, mutta ei kaikille, aikajonoja tietylle muuttujalle. Tarkista aina, että määrittämäsi muoto toimii odotetulla tavalla.ERDDAPkaikkiin muuttujan aikaryhmiin.
    * Jos mahdollista, GenerateDatasetXml ehdottaa aikamuotoja.
    * Jos tarvitset apua muodon luomiseen, pyydä sähköpostia Chris. Johannes osoitteessa Noaa.gov.

Ensisijainen datamuuttuja (Tabular-datavarat) Akselimuuttujan pääaika (Verkossa olevat tietoaineistot) on tunnustettu[destinationName](#destinationname)Aikaa. Yksiköiden metatietojen on oltava UDUnits-yhteensopivia yksiköitä, jotka ulottuvat numeerisiin aika-arvoihin, esim. ”päivät vuodesta 1970-01” (Tabulaari- tai verkostotietoaineistot) tai[Yksiköt sopivat merkkijonoaikoihin](#string-time-units)Esimerkki: M/d/yyy (Tabular-datavarat) .

Eri aikayksiköt erilaisissa verhoissa.ncTiedostot - Jos sinulla on kokoelma gridded.nctiedostot, joissa tiedostojen yksi osajoukko käyttää eri aikayksikköjä kuin yksi tai useampi muu tiedostojen osa-alue, voit käyttää[EDDGridLähde: NCFiles Unpacked](#eddgridfromncfilesunpacked). Se muuttaa aika-arvot"seconds since 1970-01-01T00:00:00Z"alemmalle tasolle, jolloin vältetään erot, jotta voit tehdä yhden tietoaineiston heterogeenisten tiedostojen keräämisestä.

###### TimeStamp-muuttujat{#timestamp-variables} 
[TimeStamp-muuttujat](#timestamp-variables)----- Muut muuttujat (axisVariabletai taidataVariableYhdessäEDDGridEDDTable Dataset) Se voi olla aikajana-muuttuja. Aikaleimamuuttujat ovat muuttujia, joilla on aikakohtaisia yksiköitä ja aikatietoja.&lt;destinationName&gt; muuta kuin aikaa. TimeStamp-muuttujat käyttäytyvät kuin pääajan muuttuja, kun ne muuntavat lähteen aikamuodon."seconds since 1970-01-01T00:00:00Z"ISO 8601:2004 (E) formaatti).ERDDAP™Tunnistaa aikaa Muunnelmia aikasidonnaisista "[Yksiköt](#units)"Metadata, joka vastaa tätä säännöllistä ilmaisua"\\[A-Z\\]+ + Since +\\[0-9\\]+ &gt; (Numeerinen päivämäärä esimerkiksi ajat,"seconds since 1970-01-01T00:00:00Z") tai olla päivämäärä Aikamuoto, joka sisältää "uuuu", "yyyy" tai "YYYYYY" (Esimerkiksi "yyyy-MM-dd"T'HHH:mm:ssZ") . Ole hyvä ja käytädestinationName "time"Pääpäivänä Aikavaihtelua.

 **Tarkista aina työsi varmistaaksesi, että aikatiedot näkyvätERDDAP™Se on oikea aikatiedot.** Työskentely ajan kanssa on aina hankalaa ja virheellistä.

Näytä[Lisätietoa aikamuuttujasta](#destinationname).
ERDDAP™on hyödyllistä[Muunna numero Aikaa / From a String Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
Näytä[MitenERDDAP™Sopimukset ajan kanssa](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
        
###### valid\\_range {#valid_range} 
*   [ **valid\\_range** tai **valid\\_min** ja **valid\\_max** ](#valid_range)----- Nämä ovat OPTIONAL-muuttujat, jotka on määritelty[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Metadatan sopimukset. Esimerkiksi,

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

tai tai

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * Jos ne ovat läsnä, niiden olisi oltava samantyyppisiä kuin muuttuja, ja niissä on täsmennettävä kyseisen muuttujan tietojen voimassa olevat vähimmäis- ja enimmäisarvot. Käyttäjien tulisi katsoa, että tämän valikoiman ulkopuoliset arvot ovat mitättömiä.
    *   ERDDAP™Ei sovelletavalid\\_range. Sanoin toisella tavalla:ERDDAP™ei muunna data-arvojavalid\\_range_ _ _ Arvo taimissing\\_value.ERDDAP™Siirrä tämä metatieto ja jätä sovellus sinulle.
Miksi? Tätä varten metadata on. Jos tietojen tarjoaja olisi halunnut, tietojen tarjoaja olisi voinut muuttaa tietoarvot ulkopuolelta.valid\\_rangeOllakseen arvoja.ERDDAP™Ei toistaiseksi arvaa tietojen tarjoajaa. Tämä on turvallisempi: jos myöhemmin osoitetaan, ettävalid\\_rangeoli liian kapea tai muuten väärä,ERDDAP™eivät ole hävittäneet tietoja.
    * Jos tiedot on pakattu[scale\\_factorja/taiadd\\_offset](#scale_factor),valid\\_range,valid\\_minjavalid\\_maxPakattu tietotyyppi ja arvot. Siitä lähtienERDDAP™sovelletaanscale\\_factorjaadd\\_offsetKun se lataa aineiston,ERDDAP™Pakkaamattavalid\\_range,valid\\_minjavalid\\_maxarvot, jotta kohdemetadata (Käyttäjille osoitettu) ilmoittaa pakkaamattomasta tietotyypistä ja -alueesta.
Tai jos pakkaamaton 🙂valid\\_rangeattribuutti on läsnä, se nimetään uudelleen.valid\\_rangeMilloinERDDAP™Lataa aineisto.
##### &lt;poistaa MVRows &gt;{#removemvrows} 
* [...] ** &lt;Poistaminen &gt; ** ) (#poistaminen) Se on OPTIONAL-tunnisteen sisällädatasets.xmlEDDTableFromFiles (Kaikki alaluokat) Tiedot, vaikka niitä käytetään vain EDDTableFromMultidimNcFiles. Sillä voi olla todellinen tai väärä arvo. Esimerkiksi todellinen
Tämä poistaa kaikki rivit ryhmän lopussa, jossa kaikki arvot ovatmissing\\_value, \\ \\ \\-arvo tai Co-Hort...Array nativen puuttuva arvo (32 §:ää) . Tämä on CF DSG Multidimensional Array -tiedostotyyppi ja vastaavat tiedostot. Jos totta, tämä tekee oikean testin ja niin lataa kaikki max himmeät muuttujat, joten se voi kestää ylimääräistä aikaa.
Oletusarvo on väärä.
Suositus - Jos mahdollista, suosittelemme poistamaan MVRows vääräksi. Poistaminen MVRows totta voi merkittävästi hidastaa pyyntöjä, mutta voi olla tarpeen joitakin aineistoja.
