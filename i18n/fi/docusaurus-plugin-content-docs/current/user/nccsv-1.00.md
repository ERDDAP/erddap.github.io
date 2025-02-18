---
title: "NCCSV 1.00"
---

# NCCSV -
ANetCDF- Yhteensopiva ASCII CSV-tiedoston erittely,
Versio 1.00

Bob Simons ja Steve Hankin
Bob Simonsin ja Steve Hankinin ”NCCSV” on lisensoitu[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

## [Johdanto](#introduction) {#introduction} 

Tässä asiakirjassa määritellään ASCII CSV -tekstitiedostomuoto, joka voi sisältää kaikki tiedot. (Metadata ja data) joka löytyy aNetCDF .nctiedosto, joka sisältää CSV-tiedoston kaltaisen taulukon. ASCII CSV -tekstitiedoston laajennuksen on oltava .csv, jotta se voidaan lukea helposti ja oikein Excel- ja Google Sheets -ohjelmiin. Bob Simons kirjoittaa ohjelmiston muuntaakseen NCCSV-tiedostonNetCDF3 (Ehkä myös aNetCDF4)  .nctiedosto ja päinvastoin, ilman tiedon menetystä. Bob Simons on muuttunut[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html)tukemaan tämän tiedoston lukemista ja kirjoittamista.

NCCSV-muoto on suunniteltu siten, että Excel ja Google Sheets voivat tuoda NCCSV-tiedoston csv-tiedostona, jossa on kaikki tiedot laskentataulukon soluissa valmiina editointiin. Tai laskentataulukko voidaan luoda naarmuista NCCSV-sopimusten mukaisesti. Riippumatta laskentataulukon lähteestä, jos se sitten viedään .csv-tiedostona, se noudattaa NCCSV-määritystä eikä tietoja menetetä. Ainoat erot NCCSV-tiedostojen ja analogisten laskentataulukkotiedostojen välillä ovat:

* NCCSV-tiedostoilla on arvoja tiivistetyllä linjalla.
Spreadsheetsillä on arvoja vierekkäisissä soluissa.
* NCCSV-tiedostoja ympäröi usein kaksinkertainen lainaus.
Lajikkeita ei koskaan ympäröi kaksinkertainen lainaus.
* Sisäiset kaksinkertaiset lainaukset (""") NCCSV-tiedostojen Stringsissä on kaksi kaksoislainaa.
Sisäiset kaksinkertaiset tarjoukset laskentataulukoissa näkyvät 1 kaksinkertaisena lainauksena.

Nähdään[Spreadsheet](#spreadsheets)Alla on lisätietoja.

### Streamable{#streamable} 
Kuten CSV-tiedostot yleensä, NCCSV-tiedostot ovat suoratoistokelpoisia. Näin ollen, jos NCSV:n tuottaa tietopalvelin, kuten[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html)palvelin voi alkaa suoratoistaa tietoja pyytäjälle ennen kuin kaikki tiedot on kerätty. Tämä on hyödyllinen ja toivottava ominaisuus.NetCDFSen sijaan tiedostot eivät ole suoratoistoisia.

### ERDDAP™ {#erddap} 
Tämä ominaisuus on suunniteltu siten, että NCCSV-tiedostot ja.nctiedostoja, jotka voidaan luoda niistä voidaan käyttää[ERDDAP™Tietopalvelin](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (kautta[EDDTableFromNccsvfiilit](/docs/server-admin/datasets#eddtablefromnccsvfiles)ja[EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)Datatyypit) Tämä ominaisuus on ulkoinenERDDAP.ERDDAP™on useita vaadittuja globaaleja ominaisuuksia ja monia suositeltuja globaaleja ja muuttuvia ominaisuuksia, jotka perustuvat pääasiassa CF- ja ACDD-ominaisuuksiin.
[Docs/server-admin/datasets#global-attribuutit](/docs/server-admin/datasets#global-attributes)).

### Tasapaino{#balance} 
NCCSV-muodon suunnittelu on useiden vaatimusten tasapaino:

* Tiedostojen on sisällettävä kaikki tiedot ja metatiedot, jotka olisivat tabulaarissa.NetCDFtiedosto, mukaan lukien erityiset tietotyypit.
* Tiedostot on voitava lukea ja sitten kirjata ulos laskentataulukosta ilman tiedon menetystä.
* Tiedostojen on oltava helppoja, jotta ihmiset voivat luoda, muokata, lukea ja ymmärtää.
* Tiedostojen on oltava yksiselitteisiä tietokoneohjelmien kanssa.

Jos jokin vaatimus tässä asiakirjassa vaikuttaa oudolta tai hankalalta, se on todennäköisesti tarpeen jonkin näistä vaatimuksista täyttämiseksi.

### Muita eritelmiä{#other-specifications} 
Tämä spesifikaatio viittaa useisiin muihin eritelmiin ja kirjastoihin, joiden kanssa se on suunniteltu toimimaan, mutta tämä eritelmä ei ole osa mitään näistä muista eritelmistä, eikä se tarvitse niihin muutoksia eikä se ole ristiriidassa niiden kanssa. Jos johonkin näistä standardeista ei ole täsmennetty yksityiskohtaisesti, katso tästä. Erityisesti tämä sisältää:

* Tietoaineiston löydöstä tehty attribuutiosopimus (ACDD) Metadata-standardi:
    [ https://wiki.esipfed.org/Attribute\\_Convention\\_for\\_Data\\_Discovery\\_1-3 ](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3).
* Ilmasto ja ennuste (CF) Metadata-standardi:
    [ https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html).
* TheNetCDFKäyttäjäohjaus (NUG) :
    [ https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html).
* TheNetCDFohjelmistokirjastot, kutenNetCDFJava jaNetCDFc:
    [ https://www.unidata.ucar.edu/software/netcdf/ ](https://www.unidata.ucar.edu/software/netcdf/). Nämä kirjastot eivät voi lukea NCCSV-tiedostoja, mutta ne voivat lukea.ncNCCSV-tiedostoista luodut tiedostot.
* JSON:[ https://www.json.org/ ](https://www.json.org/)

### Ilmoitus{#notation} 
Tässä spesifikaatiossa,\\[ \\]Valitse valinnaiset kohteet.

## [Tiedostorakenne](#file-structure) {#file-structure} 

Täydellinen NCCSV-tiedosto koostuu kahdesta osasta: Metadata-osiosta, jota seuraa tietojen osa.

NCCSV-tiedostot sisältävät vain 7-bittisiä ASCII-merkkejä. Tämän vuoksi tiedoston kirjoittamiseen ja lukemiseen käytetty hahmon asettaminen tai koodaus voi olla mitä tahansa merkkiä, joka on yhteensopiva 7-bittisen ASCII-merkin kanssa, esim. ISO-8859-1.ERDDAP™Lue ja kirjoita NCCSV-tiedostoja ISO-8859-1-kaaviolla.

NCCSV-tiedostot voivat käyttää joko uutta (\\n)   (Linux- ja Mac OS X -tietokoneissa) Palautus ja uusi linja (\\r\\n)   (Yleistä Windows-tietokoneissa) Loppujen lopuksi, mutta ei molempia.

### .nccsvMetadata{#nccsvmetadata} 
Kun sekä luoja että lukija odottavat sitä, on myös mahdollista ja joskus hyödyllistä tehdä muunnelma NCCSV-tiedostosta, joka sisältää vain metatieto-osan. (mukaan lukien\\*END TADATA\\*Linjan linja) . Tuloksena on täydellinen kuvaus tiedoston attribuuteista, muuttujan nimistä ja tietotyypeistä, mikä palvelee samaa tarkoitusta kuin .das ja .dds-vastaukset.OPeNDAPpalvelin.ERDDAP™Palauta tämä variaatio, jos pyydät tiedostoa Tyyppi =.nccsvMetatiedot yhdestäERDDAP™Dataa.

## [Metadata-osasto](#the-metadata-section) {#the-metadata-section} 

NCCSV-tiedostossa jokainen metadata-osio käyttää muotoa
[Muuttuva Nimen nimi](#variablename),[attribuutti Nimen nimi](#attributename),[Arvo 1](#value)\\[Arvo 2\\]\\[Arvo 3\\]\\[Arvo 4\\]\\[............\\]  
Tilat ennen tai jälkeen kohteita ei sallita, koska ne aiheuttavat ongelmia, kun tiedosto tuodaan laskentataulukko-ohjelmiin.

### Yleissopimukset{#conventions} 
NCCSV-tiedoston ensimmäinen rivi on metadata-osion ensimmäinen rivi ja sen on oltava[\\*GLOBAL\\*](#global)Yleissopimuksissa on lueteltu kaikki tiedostossa käytetyt yleissopimukset CSV-luettelon sisältävänä lavana, esimerkiksi:
\\*GLOBAL\\*"Konventiot"COARDSCF-1.6, ACD-1.3, NCCSV-1.0
Yksi listatuista yleissopimuksista on NCCSV-1.0, joka viittaa tämän eritelmän nykyiseen versioon.

### END_META{#end_metadata} 
NCCSV-tiedoston metadata-osan loppu on mainittava linjalla, jolla on vain
\\*END TADATA\\*

On suositeltavaa, mutta ei vaadita, että kaikki tietyn muuttujan ominaisuudet näkyvät metadata-osion vierekkäisissä riveissä. Jos NCCSV-tiedosto muunnetaanNetCDFtiedosto, tilaus, että muuttujanimet ilmestyvät ensin metadata-osiossa, on muuttujien järjestys.NetCDFtiedosto.

Valinnaiset tyhjät viivat sallitaan metadata-osiossa vaaditun ensimmäisen rivin jälkeen.[\\*GLOBAL\\*](#global) [Yleissopimukset](#conventions)Tietoa (Katso alapuolelta) ennen vaadittua viimeistä riviä\\*END TADATA\\*.

Jos laskentataulukko luodaan NCCSV-tiedostosta, metadata-tiedot-osa näkyy A sarakkeessa muuttuvilla nimillä, sarakkeessa B olevilla nimillä ja C sarakkeessa olevilla arvoilla.

Jos näiden yleissopimusten mukainen laskentataulukko tallennetaan CSV-tiedostoksi, metadata-osiossa olevien rivien lopussa on usein ylimääräisiä tiivisteitä. Ohjelmisto, joka muuntaa NCCSV-tiedostot.ncTiedostot jättävät ylimääräiset kommat huomiotta.

### [Muuttuva Nimen nimi](#variablename) {#variablename} 

 *Muuttuva Nimen nimi* on tietotiedoston muuttujan tapausherkkä nimi. Kaikkien muuttuvien nimien on aloitettava 7-bittisellä ASCII-kirjeellä tai alipisteellä, ja ne on koottava 7-bittisiin ASCII-kirjeisiin, koristeisiin ja 7-bittisiin ASCII-numeroihin.
#### GLOBAL{#global} 
Erityinen muuttujan nimi[\\*GLOBAL\\*](#global)Sitä käytetään nimeämään globaali metadata.

### [attribuutti Nimen nimi](#attributename) {#attributename} 

 *attribuutti Nimen nimi* on muuttuvaan tai[\\*GLOBAL\\*](#global). Kaikkien attribuuttien nimet on aloitettava 7-bittisellä ASCII-kirjeellä tai aliarvostuksella ja ne on koottava 7-bittisiin ASCII-kirjeisiin, koristeisiin ja 7-bittisiin ASCII-numeroihin.

#### Kalastus{#scalar} 
Erityinen attribuutti Nimen nimi\\*Kalastus\\*voidaan käyttää skaalautuvan datamuuttujan luomiseen ja sen arvon määrittämiseen. Tietotyypin tyyppi\\*Kalastus\\*määrittää muuttujien tietotyypin, joten älä määritä\\*DATA TIPE\\*skalaarimuuttujat. Huomaa, että NCCSV-tiedoston Data-osiossa ei saa olla tietoja skalaarisista muuttujista.

Esimerkiksi luoda skaalautuva muuttuja, jonka nimi on "alus", jolla on arvo "Okeanos Explorer" ja cf ́role attribuutti, käyttää:
laiva,\\*Kalastus\\*"Okeanos Explorer"
alus, cf_role, trajectory
Kun skaalautuva tietomuuttuja luetaanERDDAP™skalaariarvo muunnetaan datataulukon sarakkeeksi, jolla on sama arvo joka rivillä.

### [Arvon arvo](#value) {#value} 

 *Arvon arvo* on metadata-attribuutin arvo ja sen on oltava sarja, jossa on yksi tai useampi joko tavu, lyhyt, sisäinen, pitkä, kelluva, kaksinkertainen, String tai Char. Muita tietotyyppejä ei tueta. Ominaisuudet ilman arvoa jätetään huomiotta. Jos aliarvoa on useampia kuin yksi, aliarvojen on oltava samat tietotyypit ja ne on erotettava toisistaan esimerkiksi:
sst,actual\\_range0.17f,23.58f
Jos String-arvoja on useita, käytä yhtä Stringiä.\\n  (Newline) hahmot, jotka erottavat alustot.

Tietotyyppien määritelmät ovat:

#### By{#byte} 
* Attribuuttiarvot (8-bittinen, allekirjoitettu) on kirjoitettava riffix 'b', esim. -7b, 0b, 7b. Vaihtoehtoisten arvojen vaihteluväli on -128-127. Luku, joka näyttää tavulta, mutta on mitätön (Esimerkki: 128b) Luo virheilmoituksen.
     
#### Lyhyt lyhyt{#short} 
* Lyhyet ominaisuudet (16-bittinen, allekirjoitettu) on kirjoitettava riffiksillä, esim. -30000, 0s, 30000s. Lyhyet arvot ovat -32768 - 32767. Luku, joka näyttää lyhyeltä, mutta on mitätön. (Esimerkkinä 32768) Luo virheilmoituksen.
     
#### Sisään{#int} 
* Attribuuttiarvot (32-bittinen, allekirjoitettu) Se on kirjoitettava JSON-lomakkeina ilman desimaalipistettä tai eksponenttia, mutta riffiksillä i, esim. -12067978i, 0i, 12067978i. Käytettävien arvojen vaihteluväli on -2147483648 - 2147483647. Numero, joka näyttää tunnilta, mutta on mitätön. (2147483648i) Luo virheilmoituksen.
     
#### Pitkä pitkä{#long} 
* Pitkät ominaisuudet (64-bittinen, NUG:n tukema jaERDDAP™CF:n tuella ei vielä) on kirjoitettava ilman desimaalipistettä ja riffiksillä L, esim. -123456789874321L, 0L, 123456789874321L. Jos käytät muuntamisohjelmistoa muuntaaksesi NCCSV-tiedoston, jolla on pitkät arvot,NetCDF-3 tiedostoa, pitkät arvot muunnetaan kaksoisarvoiksi. Pitkät arvot ovat -9223372036854775808 - 9223372036854775807. Luku, joka näyttää pitkältä, mutta ei (9223372036854775808L) Luo virheilmoituksen.
     
#### kelluva{#float} 
* kelluvat arvot (32-bittinen) on kirjoitettava riffiksillä f ja sillä voi olla desimaalinen piste ja/tai eksponentti, esim. 0f, 1f, 12.34f, 1e12f, 1.23e+12f, 1.23e12f, 1.87E-7f. Nanf:n käyttö kelluvalle NaN:lle (Kadonnut) arvoa. Kukkien valikoima on noin +/-3.40282347E+38f (7 merkittävää desimaalia) . Luku, joka näyttää kelluvalta, mutta on mitätön. (1.0e39f) Luo virheilmoituksen.
     
#### kaksinkertainen{#double} 
* Kaksinkertaiset arvot (64-bittinen) on kirjoitettava riffiksillä 'd' ja sillä voi olla desimaalinen piste ja/tai eksponentti, esim. 0d, 1d, 12.34d, 1e12d, 1.23e+12d, 1.23e12d, 1.87E-7d. Nandin käyttö kaksoisnappiin (Kadonnut) arvoa. Kaksoisalue on noin +/-1,79769313486231570E+308d (15 merkittävää desimaalia) . Luku, joka näyttää kaksinkertaiselta, mutta on mitätön. (1.0e309d) Luo virheilmoituksen.
     
#### String{#string} 
* String attribute -arvot ovat UCS-2-hahmojen sarja. (2-tavuiset Unicode-hahmot, kutenJava) , joka on kirjoitettava 7-bittiseksi ASCII:ksi, JSONin kaltaisiksi jonoksiksi, jotta ei-ASCII-hahmot voidaan määrittää.
    * Kaksinkertainen lainaus (""") Ne on koodattava kahdeksi kaksoislainaksi. (""") . Tämä on mitä laskentataulukko-ohjelmat vaativat, kun luet .csv-tiedostoja. Tämä on mitä laskentataulukko-ohjelmat kirjoittavat, kun tallentaa laskentataulukon .csv-tiedostona.
    * Erityiset JSON-taustaiset hahmot on koodattava JSONin tavoin (erityisesti\\n(uusi viiva), mutta myös (backslash), \f (formfeed), \t (tab), \r (kuljetuspalautus) tai[U *Hhhh* ](#uhhhh)syntaksi. Laajennustaulukossa älä käytä Alt Enteriä määrittämään tekstisolussa olevaa uutta linjaa.\\n  (2 merkkiä: selkäranka ja n """) ilmoittamaan uudesta linjasta.
##### \\uhhhh{#uhhhh} 
    * Kaikki vähemmän kuin merkki #32 tai suurempi kuin merkki #126, eikä muuten koodattu, on koodattava syntaksi. *Hhhh* hhhh on 4-numeroinen heksadesimaalinen luku, esim. euromerkki on #u20AC. Katso koodisivut, joihin viitataan[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode)löytää heksadesimaaliluvut, jotka liittyvät tiettyihin Unicode-merkkeihin tai käyttää ohjelmistokirjastoa.
    * Jos ketjussa on tilaa alussa tai lopussa, tai se sisältää (Kaksinkertainen) tai tiivistelmä tai sisältää arvoja, joita muuten tulkitaan jonkin muun tietotyypin mukaan (Esimerkki: Int) Tai on sana "null", koko String on suljettava kaksoislainoihin; muuten, toisin kuin JSON, suljetut kaksi lainausta ovat valinnaisia. Suosittelemme: jos epäilet, sulje koko String kaksoislainoihin. Avaruudet, jotka ovat alkaneet tai päättyneet, lannistuvat voimakkaasti.
    * Toistaiseksi yli 255-hahmojen käyttö on lannistunut. NCCSV tukee heitä.ERDDAP™tukee niitä sisäisesti. Jotkut tiedostot tukevat niitä (esim..jsonja.nccsv) . Monet tiedostotyypit eivät tue niitä. Esimerkiksi,NetCDF3 tiedostot eivät tue tällaisia hahmoja, koskaNetCDFtiedostot käyttävät 1-tavuisia merkkejä ja CF: llä ei tällä hetkellä ole järjestelmää, jolla määritetään, miten Unicode-hahmot koodataan.NetCDFStrings (UTF-8) . Tämä paranee todennäköisesti ajan myötä.
         
#### Char{#char} 
* char attribute -arvot ovat yksi UCS-2-hahmo (2-tavuiset Unicode-hahmot, kutenJava) , joka on kirjoitettava 7-bittiseksi ASCII:ksi, JSONin kaltaisiksi hahmoiksi, jotta muut hahmot voidaan määrittää. (ks. edellä oleva String-määritelmä erityishahmojen koodaamiseksi, lisättynä koodaamaan yksi lainaus. """) . Char attribute -arvot on sisällytettävä yksittäisiin tarjouksiin. (Sisäiset lainaukset) Kaksinkertainen lainaus (Ulkoiset lainaukset) Esimerkkinä "a" """ """" (Kaksinkertainen merkintä) "'''''' (Yhden lainauksen hahmo) "Ei" (Tab) &gt; 20AC &gt; (Euro-hahmo) . Tämä järjestelmä käyttää yksi- ja kaksi lainauksia on outo ja hankala, mutta se on tapa erottaa hyväntekeväisyys arvot Strings tavalla, joka toimii laskentataulukot. Arvo, joka näyttää kartalta, mutta on mitätön, tuottaa virheilmoituksen. Kuten Stringsissä, yli #255-hahmojen käyttö on tällä hetkellä lannistunut.

### Suffix{#suffix} 
Huomaa, että NCCSV-tiedoston attribuuttiosassa kaikilla numeerisilla attribuuttiarvoilla on oltava riittävä kirjain. (Esim. ”b”) Numeerisen tietotyypin tunnistaminen (Esimerkki: Tate) . NCCSV-tiedoston tietojen osiossa numeeriset tietoarvot eivät saa koskaan olla näitä riittäviä kirjaimia. (Lukuun ottamatta "L" pitkiä kokonaislukuja) tietotyyppi on määritelty\\*DATA TIPE\\*Muuttujien ominaisuus.

#### DATA_TYPE{#data_type} 
Tietotyyppi jokaiselle ei-[Skaalaa](#scalar)Muuttujan on määriteltävä\\*DATA TIPE\\*attribuutti, jolla voi olla tavun, lyhyen, int, pitkän, kelluvan, kaksinkertaisen, Stringin tai kartan arvo (Tapaus herkkä) . Esimerkiksi,
qc = lag,\\*DATA TIPE\\*Bye
VAROITUS: Oikean määrittäminen\\*DATA TIPE\\*Se on sinun vastuullasi. Väärä tietotyyppi (Esim. jos olisit määritellyt kelluvan) ei tuota virheilmoitusta ja saattaa aiheuttaa tietojen menettämisen. (Esimerkiksi kelluvat arvot pyöristetään sisätiloihin.) Kun NCCSV-tiedostoa luetaanERDDAP™tai muuntaa aNetCDFtiedosto.

### Char hämmentynyt{#char-discouraged} 
Char-tietojen käyttö on lannistunut, koska niitä ei tueta laajasti muissa tiedostotyypeissä. char-arvot voidaan kirjoittaa tietoosiossa yksittäisinä merkkeinä tai Stringsinä. (Etenkin, jos haluat kirjoittaa erityispiirteen) . Jos String löydetään, Stringin ensimmäinen ominaisuus käytetään kartan arvona. Nollan pituus ja puuttuvat arvot muunnetaan hahmoksi @uFFF. Huomaa, ettäNetCDFtiedostot tukevat vain yksittäisiä tavuja, joten kaikki ketjut, jotka ovat suurempia kuin char #255, muunnetaan "?NetCDFtiedostoja. Ellei Charset-tunnistetta käytetä määrittämään eri kartta Charset Charset Charset Charset Charsetille, käytetään ISO-8859-1-kartta.

### Pitkät pilkat{#long-discouraged} 
Vaikka monet tiedostotyypit (esim.NetCDF4 ja json) jaERDDAP™Pitkät data-arvot, NCCSV-tiedostojen pitkät tietoarvot eivät tällä hetkellä tue Exceliä, CF:tä jaNetCDF3 tiedostoa. Jos haluat määrittää pitkät tietoarvot NCCSV-tiedostossa (tai vastaavassa Excel-taulukossa) , sinun täytyy käyttää riffix 'L' niin, että Excel ei kohtele numeroita kelluva piste numerot pienempi tarkkuus. Tällä hetkellä, jos NCCSV-tiedostot muunnetaanNetCDF3.nctiedosto, pitkät data-arvot muunnetaan kaksoisarvoiksi, mikä aiheuttaa tarkkuuden menetyksen suurille arvoille. (Vähemmän kuin -2^53 tai suurempi kuin 2) .

### CF, ACDD jaERDDAP™Metadata{#cf-acdd-and-erddap-metadata} 
Koska on kuviteltu, että useimmat NCCSV-tiedostot tai.ncNiistä luotuja tiedostoja luetaanERDDAPOn erittäin suositeltavaa, että NCCSV-tiedostot sisältävät metatiedot, joita tarvitaan tai suositellaan.ERDDAP™(katso)
[Docs/server-admin/datasets#global-attribuutit](/docs/server-admin/datasets#global-attributes)). Attribuutit ovat lähes kaikki CF- ja ACDD-metadatastandardeista ja ne toimivat asianmukaisesti kuvaamaan tietoaineistoa. (Mitä, milloin, missä, miten) henkilölle, joka ei muuten tiedä mitään aineistosta. Erityisen tärkeää on, että lähes kaikilla numeerisilla muuttujilla pitäisi olla yksikön ominaisuus, jossa on yksittäinen ominaisuus.UDUNITSyhteensopiva arvo, esim.
sst, yksiköt, tutkinto

On hyvä sisällyttää lisäominaisuuksia, jotka eivät ole CF- tai ACDD-standardeista taiERDDAP.

## [Tietojen osasto](#the-data-section) {#the-data-section} 

### [Rakenne](#structure) {#structure} 

Tieto-osion ensimmäisellä rivillä on oltava tapausherkkä, tiivistetty luettelo muuttuvista nimistä. Kaikki muuttujat tässä luettelossa on kuvattava metadata-osiossa ja päinvastoin. (Muuta kuin[\\*GLOBAL\\*](#global)attribuutit ja[\\*Kalastus\\*](#scalar)Muuttujia) .

Toisella osa-alueen penultimate-linjoilla on oltava erillinen arvoluettelo. Jokaisella tietorivillä on oltava sama määrä arvoja kuin koodattu muuttuvien nimien luettelo. Avaruudet ennen arvoja tai sen jälkeen eivät ole sallittuja, koska ne aiheuttavat ongelmia tiedoston tuonnissa laskentataulukko-ohjelmiin. Jokaisessa tässä osassa olevassa sarakkeessa on oltava vain arvoja.\\*DATA TIPE\\*tälle muuttujalle määritelty\\*DATA TIPE\\*ominaisuus tuolle muuttujalle. Toisin kuin attribuutit-osiossa, tieto-osiossa numeroarvoilla ei saa olla riittäviä kirjaimia tietotyypin määrittämiseksi. Toisin kuin attribuuttien osiossa, tieto-osan hyväntekeväisyysarvot voivat jättää sulkevat yksittäiset tarjoukset, jos niitä ei tarvita erittelyyn. (Näin ollen "," ja "" on mainittava tässä esitetyllä tavalla.) . NCCSV-tiedostossa voi olla useita rivejä, mutta tällä hetkelläERDDAP™NCCSV-tiedostoja voi lukea vain noin 2 miljardilla rivillä. Yleensä on suositeltavaa jakaa suuria tietoaineistoja useisiin NCCSV-tiedostoihin, joissa on alle miljoona riviä.

#### Lopputiedot{#end-data} 
Tiedosto-osan loppu on mainittava linjalla, jossa on vain
\\*END DATA\\*

Jos NCCSV-tiedostossa on lisäsisältöä\\*END DATA\\*Se jää huomiotta, kun NCCSV-tiedosto muunnetaan.nctiedosto. Tällainen sisältö on siis lannistunut.

Näiden yleissopimusten mukaisessa laskentataulukossa muuttuvat nimet ja tietoarvot ovat useissa sarakkeissa. Katso esimerkki alta.

### [puuttuvat arvot](#missing-values) {#missing-values} 

Lukuisat puuttuvat arvot voidaan kirjoittaa numeroarvoksi, joka on tunnistettumissing\\_valuetai \\ \\ \\ \\ \\ \\ \\ n arvon ominaisuus kyseiselle muuttujalle. Katso esimerkiksi tämän tiedon toinen arvo:
Bell M. Shimada, 99,123,4
Tämä on suositeltu tapa käsitellä puuttuvia arvoja tavuja, lyhyitä, paksuja ja pitkiä muuttujia varten.

Kahden NaN-arvon voi kirjoittaa NaN-arvoksi. Katso esimerkiksi tämän tiedon toinen arvo:
Bell M. Shimada, NaNaN, 123.4

Tyhjällä kentällä voidaan ilmoittaa lukko- ja numeroarvoja. Katso esimerkiksi tämän tiedon toinen arvo:
Bell M. Shimada, 123

Tavu-, lyhyt-, int- ja pitkämuuttujat, NCCSV-muunninohjelma jaERDDAP™muutetaan tyhjä kenttä kyseisen tietotyypin sallittuun enimmäisarvoon (127 tavua) . Jos teet tämän, muista lisätämissing\\_valuetai ►Fill-arvon ominaisuus kyseiselle muuttujalle tämän arvon tunnistamiseksi, esim.
 *Muuttuva Nimen nimi* Arvo, 127b
Kaksoismuuttujat ja kelluvat, tyhjä kenttä muunnetaan NaN.

### [Päivämäärän arvot](#datetime-values) {#datetime-values} 

Päivämäärän arvot (päivämäärät, joilla ei ole aikakomponenttia) Voidaan esittää numeroina tai NCCSV-tiedostoina. Tietyllä ajantasaisella muuttujalla voi olla vain String-arvoja tai vain numeroarvoja, ei molempia. NCCSV-ohjelmisto muuntaa String dateTime -arvot numeeriseksi päivämääräksi Aikaa arvostetaan luomalla.nctiedostoja (Tarvittaessa CF) . DateTime-arvoilla on etu, että ihmiset lukevat helposti.

Numeerisina arvoina esitetyillä DateTime-arvoilla on oltava yksiköiden ominaisuus, jossa määritellään *Yksiköt* Siitä lähtien *Päivämäärä päivämäärä Aika-aika* CF:n edellyttämällä tavalla jaUDUNITSesim.
aika, yksiköt, sekunnit vuodesta 1970-01-01T00:00

DateTime-arvot, jotka on edustettuina String-arvoina, täytyy olla String.\\*DATA TIPE\\*attribuutti ja yksiköt, jotka määrittävät päivämäärän Aikataulu, joka on määriteltyJavaDateFormatter-luokka
 ([ https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html ](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)) . Esimerkiksi,
aika, yksiköt,yyyy-MM-ddT'Hh: mm: ssz
Kaikkien tietomuuttujan päivämäärien on käytettävä samaa muotoa.
Useimmissa tapauksissa yksiköiden attribuutin päivämäärän malli on jonkin näistä muodoista vaihtelua:

*   yyyy-MM-ddT'HHh: mm. SSSZ, joka on ISO 8601:2004 (E) Päivämäärä päivämäärä Aikamuoto. Saatat tarvita lyhennetyn version tästä, esimerkiksiyyyy-MM-ddT'Hh: mm: ssz (Ainoa suositeltu muoto) tai taiyyyy-MM-dd. Jos vaihdat päivämäärän Aika-arvojen muotoa, NCCSV suosittelee voimakkaasti, että muutat tätä muotoa. (Ehkä lyhennetty) . Tämä on muoto, jonkaERDDAP™Käytetään, kun se kirjoittaa NCCSV-tiedostoja.
* YyyMddHmms.SSS on ISO 8601:2004 -päivän kompakti versio. Aikamuoto. Saatat tarvita lyhennetyn version tästä, esimerkiksi YyyyMdd.
* M/d/yyy H:mm. SSS, joka käsittelee yhdysvaltalaisia päivämääriä ja päivämääriä, kuten 3/23/2017 16:22:03.000. Saatat tarvita lyhennetyn version tästä, esim. M/d/yyy.
* YyyDDHHmmsSSS, joka on vuosi plus nolla-paddoitu päivä (Esim. 001 = Jan 1, 365 = Dec 31 ei-leap-vuonna; tätä kutsutaan joskus virheellisesti Julian-päiväksi.) . Saatat tarvita lyhennetyn version tästä, esim. YyyDDD.

#### Tarkkuus{#precision} 
Kun ohjelmistokirjasto muuntaa.ncNCCSV-tiedostoon kaikki päivämäärät Aika-arvot kirjoitetaan ISO 8601:2004 -standardilla (E) Päivämäärä päivämäärä Aikamuoto, esim. 1970-01-01T00:00:00. Voit kontrolloida tarkkuuttaERDDAPerityiset ominaisuudettime\\_precision. Näytä
[Docs/server-admin/datasets#time\\_precision](/docs/server-admin/datasets#time_precision).

#### Aikavyöhyke{#time-zone} 
Päivämäärän oletusaikavyöhyke Aika-arvot ovatZulu  (tai GMT) aikavyöhyke, jolla ei ole päivänvalon säästöaikaa. Jos aikamuuttujalla on päivämäärä-arvot eri aikavyöhykkeeltä, sinun on määritettävä tämäERDDAPerityiset ominaisuudettime\\_zone. Tämä on vaatimusERDDAP™(katso)
[Docs/server-admin/datasets#time\\_zone](/docs/server-admin/datasets#time_zone)).

### [Degree arvot](#degree-values) {#degree-values} 

Kuten CF vaatii, kaikki arvot (esim. pituus ja leveys) on määriteltävä desimaalitasoisiksi kaksinkertaisiksi arvoiksi, ei asteikolla min'sec' String tai erillisinä muuttujina asteissa, minuuteissa ja sekunneissa. Suunnittelijat N, S, E ja W eivät ole sallittuja. Hyödynnä kielteisiä arvoja länsimaissa ja eteläisissä leveysasteissa.

## [DSG Ominaisuudet Types](#dsg-feature-types) {#dsg-feature-types} 

NCCSV-tiedosto voi sisältää CF Discrete Sampling Geometrian.
 ([ https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) dataa. Nämä ominaisuudet tekevät tämän työn:

1. CF:n edellyttämällä tavalla NCCSV-tiedoston on sisällettävä rivi metadata-osioon, jossa tunnistetaan[\\*GLOBAL\\*](#global) featureTypeattribuutti, esim.
    \\*GLOBAL\\*,featureTypeTrajectory
2. KäyttöönERDDAP™, NCCSV-tiedoston on sisällettävä viiva tai rivi metadata-osioon, jossa tunnistetaan cfrole = ... muuttujia, esim.
alus, cf_role, trajectory
Tämä on valinnaista CF:lle, mutta sitä tarvitaan NCCSV:ssä.
3. KäyttöönERDDAP™NCCSV-tiedoston on sisällettävä viiva tai rivit metadata-osioon, jossa määritetään, mitkä muuttujat liittyvät jokaiseen aikasarjaan, trajectoryyn tai profiiliin.ERDDAP™(katso)
    [/docs/server-admin/datasets #cdm \\data \\](/docs/server-admin/datasets#cdm_data_type)), esim.
    \\*GLOBAL\\*,cd _trajectory _variables
tai tai
    \\*GLOBAL\\*,cd | Timeseries |variables » station » ,lat,lon »

## [Näytä tiedosto](#sample-file) {#sample-file} 

Tässä on näytetiedosto, joka osoittaa monia NCCSV-tiedoston ominaisuuksia:
```
\\*GLOBAL\\*,Conventions,"COARDS, CF-1.6, ACDD-1.3, NCCSV-1.0"
\\*GLOBAL\\*,cdm\\_trajectory\\_variables,"ship"
\\*GLOBAL\\*,creator\\_email,erd.data@noaa.gov
\\*GLOBAL\\*,creator\\_name,Bob Simons
\\*GLOBAL\\*,creator\\_type,person
\\*GLOBAL\\*,creator\\_url,https://www.pfeg.noaa.gov
\\*GLOBAL\\*,featureType,trajectory
\\*GLOBAL\\*,infoUrl,https://erddap.github.io/docs/user/nccsv-1.00
\\*GLOBAL\\*,institution,"NOAA NMFS SWFSC ERD, NOAA PMEL"
\\*GLOBAL\\*,license,"""NCCSV Demonstration"" by Bob Simons and Steve Hankin is
    licensed under CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ ."
\\*GLOBAL\\*,keywords,"NOAA, sea, ship, sst, surface, temperature, trajectory"
\\*GLOBAL\\*,standard\\_name\\_vocabulary,CF Standard Name Table v55
\\*GLOBAL\\*,subsetVariables,"ship"
\\*GLOBAL\\*,summary,"This is a paragraph or two describing the dataset."
\\*GLOBAL\\*,title,"NCCSV Demonstration"
ship,\\*DATA\\_TYPE\\*,String
ship,cf\\_role,trajectory\\_id
time,\\*DATA\\_TYPE\\*,String
time,standard\\_name,time
time,units,"yyyy-MM-dd'T'HH:mm:ssZ"
lat,\\*DATA\\_TYPE\\*,double
lat,units,degrees\\_north
lon,\\*DATA\\_TYPE\\*,double
"lon","units","degrees\\_east"
status,\\*DATA\\_TYPE\\*,char
status,comment,"From http://some.url.gov/someProjectDocument , Table C"
testLong,\\*DATA\\_TYPE\\*,long
testLong,units,1
sst,\\*DATA\\_TYPE\\*,float
sst,standard\\_name,sea\\_surface\\_temperature
sst,actual\\_range,0.17f,23.58f
sst,units,degree\\_C
sst,missing\\_value,99f
sst,testBytes,-128b,0b,127b
sst,testShorts,-32768s,0s,32767s
sst,testInts,-2147483648i,0i,2147483647i
sst,testLongs,-9223372036854775808L,0L,9223372036854775807L
sst,testFloats,-3.40282347e38f,0f,3.40282347E+38f
sst,testDoubles,-1.79769313486231570e308d,0d,1.79769313486231570E+308d
sst,testChars,"','","'""'","'\\u20AC'"
sst,testStrings," a~,\\n'z""\\u20AC"

\\*END\\_METADATA\\*
ship,time,lat,lon,status,testLong,sst
Bell M. Shimada,2017-03-23T00:45:00Z,28.0002,-130.2576,A,-9223372036854775808L,10.9
Bell M. Shimada,2017-03-23T01:45:00Z,28.0003,-130.3472,\\u20AC,-1234567890123456L,
"Bell M. Shimada","2017-03-23T02:45:00Z",28.0001,-130.4305,"'\\t'",0L,10.7
Bell M. Shimada,2017-03-23T12:45:00Z,27.9998,-131.5578,"'""'",1234567890123456L,99
Bell M. Shimada,2017-03-23T21:45:00Z,28.0003,-132.0014,\\u00fc,9223372036854775806L,10.0
Bell M. Shimada,2017-03-23T23:45:00Z,28.0002,-132.1591,,NaN
```
Huomautuksia:

* Näytetiedosto sisältää monia vaikeita tapauksia (esim. char ja pitkät muuttujat ja vaikeat String-arvot) . Useimmat NCCSV-tiedostot ovat yksinkertaisempia.
* Lisenssilinja on jaettu kahteen riviin, mutta se on vain yksi rivi näytetiedostossa.
* u20AC on Euro-hahmon koodaus ja 00FC on ü:n koodaus.
* Monet monet Esimerkkiin kuuluvat kaksinkertaiset lainaukset, vaikka niiden ei tarvitse olla esimerkiksi monia globaaleja ominaisuuksia, kuten otsikko, yksittäisten yksikköjen attribuutti ja kolmas data.
* Olisi selkeämpää ja parempi, jos testLong-muuttujan yksiköt kirjoitettaisiin kaksinkertaisilla merkinnöillä, jotka osoittavat sen olevan String-arvo. Nykyinen edustus (1. Ilman lainauksia) tulkitaan oikein lantiona, ei kokonaislukuna, koska ei ole "i"-kiinteä.
* Toisin kuin muissa numeerisissa tietotyypeissä, data-alueen pitkät arvot ovat riittäviä. ("L") Se tunnistaa numerotietotyypin. Tämä on välttämätöntä, jotta laskentataulukot eivät tulkitse arvoja kelluvana pistenumerona ja menettäisi täsmällisyyttä.

## [Spreadsheets](#spreadsheets) {#spreadsheets} 

taulukossa, kuten NCCSV-tiedostossa:

* Kirjoita numeerisia attribuuttiarvoja NCCSV-tiedostojen mukaisesti (esimerkiksi riittävillä kirjaimilla, kuten f, attribuutin tietotyypin tunnistamiseksi) .
* Stringsissä, kirjoita kaikki hahmot vähemmän kuin ASCII-hahmo #32 tai suurempi kuin hahmo #126 joko JSON-kaltainen selkärankainen hahmo. (esim.\\nNewline) Hexadecimal Unicode -luku (Tapaus herkkä) syntaksin kanssa[U *Hhhh* ](#uhhhh)  (Esim. euron merkki) . Käytä\\n  (2 merkkiä: selkäranka ja n """) Uutta linjaa, ei Alt Enter.

Ainoat erot NCCSV-tiedostojen ja analogisen laskentataulukon välillä ovat:

* NCCSV-tiedostoilla on arvoja tiivistetyllä linjalla.
Spreadsheetsillä on arvoja vierekkäisissä soluissa.
* NCCSV-tiedostoja ympäröi usein kaksinkertainen lainaus.
Lajikkeita ei koskaan ympäröi kaksinkertainen lainaus.
* Sisäiset kaksinkertaiset lainaukset (""") NCCSV-tiedostojen Stringsissä on kaksi kaksoislainaa.
Sisäiset kaksinkertaiset tarjoukset laskentataulukoissa näkyvät 1 kaksinkertaisena lainauksena.

Jos taulukko, joka seuraa näitä yleissopimuksia, tallennetaan CSV-tiedostona, on usein ylimääräisiä tiivisteitä monien rivien lopussa. Ohjelmisto, joka muuntaa NCCSV-tiedostot.ncTiedostot jättävät ylimääräiset kommat huomiotta.

### [Excel](#excel) {#excel} 

NCCSV-tiedoston tuominen Exceliin:

1. Valitse tiedosto: Avoin.
2. Vaihda tiedostotyyppi tekstitiedostoihin (\\*.prn;\\*.txt;csv) .
3. Etsi hakemistoja ja klikkaa NCCSV .csv -tiedostoa.
4. Klikkaa auki.

NCCSV-tiedoston luominen Excelin laskentataulukosta:

1. Valitse tiedosto: Säästä kuin
2. Muuta säästöä tyypiksi: CSV (Comma delimited)   (*csv) .
3. Vastauksena yhteensopivuusvaroitukseen klikkaa Kyllä.
4. Tuloksena oleva .csv-tiedosto sisältää ylimääräisiä tiivisteitä kaikkien muiden rivien kuin CSV-rivien lopussa. Voit jättää ne huomiotta.

Excelissä yllä oleva näyte NCCSV-tiedosto näyttää

![Excel.png](/img/sampleExcel.png)

### [Google Sheets](#google-sheets) {#google-sheets} 

NCCSV-tiedoston tuominen Google Sheetsiin:

1. Valitse tiedosto: Avoin.
2. Valitse Lataa tiedosto ja napsauta Lataa tiedosto tietokoneeltasi. Valitse tiedosto ja napsauta sitten Avaa.
      
Tai valitse My Drive ja vaihda tiedostotyypin pudota valinta kaikkiin tiedostotyyppeihin. Valitse tiedosto ja napsauta sitten Avaa.

Luo NCCSV-tiedosto Google Sheets -taulukosta:

1. Valitse tiedosto: Säästä kuin
2. Muuta säästöä tyypiksi: CSV (Comma delimited)   (*csv) .
3. Vastauksena yhteensopivuusvaroitukseen klikkaa Kyllä.
4. Tuloksena oleva .csv-tiedosto sisältää ylimääräisiä tiivisteitä kaikkien muiden rivien kuin CSV-rivien lopussa. välittämättä niistä.

## [Ongelmat / Varoitukset](#problemswarnings) {#problemswarnings} 

* Jos luot NCCSV-tiedoston tekstieditorin kanssa tai luot analogisen laskentataulukon laskentataulukkoon, tekstieditori tai laskentataulukko-ohjelma ei tarkista, että noudatit näitä yleissopimuksia oikein. Sinun tehtäväsi on noudattaa näitä sopimuksia oikein.
* Tämän yleissopimuksen mukaisen laskentataulukon muuntaminen Csv-tiedostoksi (NCCSV-tiedosto) Tämä johtaa ylimääräisiin törmäyksiin kaikkien muiden rivien kuin CSV-datarivien lopussa. välittämättä niistä. Ohjelmisto muuntaa NCCSV-tiedostot.ncTiedostot jättävät ne huomiotta.
* Jos NCCSV-tiedostossa on ylimääräisiä törmäyksiä rivien lopussa, voit poistaa ne muuntamalla NCCSV-tiedoston tiedostoksi.NetCDFtiedosto ja sen jälkeen muuntaaNetCDFPalauta NCCSV-tiedostoon.
* Kun yrität muuntaa NCCSV-tiedostonNetCDFtiedosto, ohjelmisto havaitsee joitakin virheitä ja tuottaa virheviestejä, jolloin muuntaminen epäonnistuu. Muut ongelmat ovat vaikeita tai mahdottomia saada kiinni, eikä niistä aiheudu virheilmoituksia tai varoituksia. Muita ongelmia (Esim. liiallinen komma rivien lopussa) jätetään huomiotta. Tiedostomuunnin tekee vain minimaalisen tarkastuksen tuloksena olevan korrektiuden.NetCDFesim. CF-vaatimusten noudattamisesta. Tiedoston luojan ja tiedostokäyttäjän vastuulla on tarkistaa, että muuntamisen tulokset ovat yhtä haluttuja ja oikein. Kaksi tapaa tarkistaa ovat:
    * Tulosta sisältö.nctiedosto ncdump
         ([ https://linux.die.net/man/1/ncdump ](https://linux.die.net/man/1/ncdump) ) .
    * Katso tietojen sisältö sisäänERDDAP.
