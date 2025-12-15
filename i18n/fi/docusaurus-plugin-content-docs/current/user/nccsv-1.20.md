---
title: "NCCSV 1.20"
---

# NCCSV -
A NetCDF UTF-8, CSV Tiedoston erittely,
Versio 1.20

Bob Simons ja Steve Hankin
Bob Simonsin ja Steve Hankinin ”NCCSV” on lisensoitu [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 

##  [Johdanto](#introduction)  {#introduction} 

Tässä asiakirjassa määritellään UTF-8 CSV-tekstitiedostomuoto, joka voi sisältää kaikki tiedot. (Metadata ja data) joka löytyy a NetCDF   .nc tiedosto, joka sisältää CSV-tiedoston kaltaisen taulukon. UTF-8 CSV -tekstitiedoston laajennuksen on oltava .csv, jotta se voidaan lukea helposti ja oikein Excel- ja Google Sheets -ohjelmiin. Bob Simons kirjoittaa ohjelmiston muuntaakseen NCCSV-tiedoston NetCDF 3 (Ehkä myös a NetCDF 4)   .nc tiedosto ja päinvastoin, ilman tiedon menetystä. Bob Simons on muuttunut [ ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) tukemaan tämän tiedoston lukemista ja kirjoittamista.

NCCSV-muoto on suunniteltu siten, että Excel ja Google Sheets voivat tuoda NCCSV-tiedoston csv-tiedostona, jossa on kaikki tiedot laskentataulukon soluissa valmiina editointiin. Tai laskentataulukko voidaan luoda naarmuista NCCSV-sopimusten mukaisesti. Riippumatta laskentataulukon lähteestä, jos se sitten viedään .csv-tiedostona, se noudattaa NCCSV-määritystä eikä tietoja menetetä. Ainoat erot NCCSV-tiedostojen ja analogisten laskentataulukkotiedostojen välillä ovat:

* NCCSV-tiedostoilla on arvoja tiivistetyllä linjalla.
Spreadsheetsillä on arvoja vierekkäisissä soluissa.
* NCCSV-tiedostoja ympäröi usein kaksinkertainen lainaus.
Lajikkeita ei koskaan ympäröi kaksinkertainen lainaus.
* Sisäiset kaksinkertaiset lainaukset (""") NCCSV-tiedostojen Stringsissä on kaksi kaksoislainaa.
Sisäiset kaksinkertaiset tarjoukset laskentataulukoissa näkyvät 1 kaksinkertaisena lainauksena.

Nähdään [Spreadsheet](#spreadsheets) Alla on lisätietoja.

### Streamable{#streamable} 
Kuten CSV-tiedostot yleensä, NCCSV-tiedostot ovat suoratoistokelpoisia. Näin ollen, jos NCSV:n tuottaa tietopalvelin, kuten [ ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) palvelin voi alkaa suoratoistaa tietoja pyytäjälle ennen kuin kaikki tiedot on kerätty. Tämä on hyödyllinen ja toivottava ominaisuus. NetCDF Sen sijaan tiedostot eivät ole suoratoistoisia.

###  ERDDAP  {#erddap} 
Tämä ominaisuus on suunniteltu siten, että NCCSV-tiedostot ja .nc tiedostoja, jotka voidaan luoda niistä voidaan käyttää [ ERDDAP™ Tietopalvelin](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (kautta [EDDTableFromNccsvfiilit](/docs/server-admin/datasets#eddtablefromnccsvfiles) ja [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) Datatyypit) Tämä ominaisuus on ulkoinen ERDDAP . ERDDAP™ on useita vaadittuja globaaleja ominaisuuksia ja monia suositeltuja globaaleja ja muuttuvia ominaisuuksia, jotka perustuvat pääasiassa CF- ja ACDD-ominaisuuksiin.
 [Docs/server-admin/datasets#global-attribuutit](/docs/server-admin/datasets#global-attributes) ).

### Tasapaino{#balance} 
NCCSV-muodon suunnittelu on useiden vaatimusten tasapaino:

* Tiedostojen on sisällettävä kaikki tiedot ja metatiedot, jotka olisivat tabulaarissa. NetCDF tiedosto, mukaan lukien erityiset tietotyypit.
* Tiedostot on voitava lukea ja sitten kirjata ulos laskentataulukosta ilman tiedon menetystä.
* Tiedostojen on oltava helppoja, jotta ihmiset voivat luoda, muokata, lukea ja ymmärtää.
* Tiedostojen on oltava yksiselitteisiä tietokoneohjelmien kanssa.

Jos jokin vaatimus tässä asiakirjassa vaikuttaa oudolta tai hankalalta, se on todennäköisesti tarpeen jonkin näistä vaatimuksista täyttämiseksi.

### Muita eritelmiä{#other-specifications} 
Tämä spesifikaatio viittaa useisiin muihin eritelmiin ja kirjastoihin, joiden kanssa se on suunniteltu toimimaan, mutta tämä eritelmä ei ole osa mitään näistä muista eritelmistä, eikä se tarvitse niihin muutoksia eikä se ole ristiriidassa niiden kanssa. Jos johonkin näistä standardeista ei ole täsmennetty yksityiskohtaisesti, katso tästä. Erityisesti tämä sisältää:

* Tietoaineiston löydöstä tehty attribuutiosopimus (ACDD) Metadata-standardi:
     [https://wiki.esipfed.org/Attribute\\_Convention\\_for\\_Data\\_Discovery\\_1-3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) .
* Ilmasto ja ennuste (CF) Metadata-standardi:
     [https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) .
* The NetCDF Käyttäjäohjaus (NUG) :
     [https:///docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html) .
* The NetCDF ohjelmistokirjastot, kuten NetCDF Java ja NetCDF c:
     [https://www.unidata.ucar.edu/software/netcdf/](https://www.unidata.ucar.edu/software/netcdf/) . Nämä kirjastot eivät voi lukea NCCSV-tiedostoja, mutta ne voivat lukea .nc NCCSV-tiedostoista luodut tiedostot.
* JSON: [https://www.json.org/](https://www.json.org/) 

### Ilmoitus{#notation} 
Tässä spesifikaatiossa, \\[   \\] Valitse valinnaiset kohteet.

##  [Tiedostorakenne](#file-structure)  {#file-structure} 

Täydellinen NCCSV-tiedosto koostuu kahdesta osasta: Metadata-osiosta, jota seuraa tietojen osa.

NCCSV-tiedostot voivat sisältää kaikkia UCS-2-merkkejä. (2-tavuiset Unicode-hahmot, kuten Java ) UTF-8:n kautta. ERDDAP™ Lue ja kirjoita NCCSV-tiedostoja käyttämällä UTF-8-koodausta.

NCCSV-tiedostot voivat käyttää joko uutta ( \\n )   (Linux- ja Mac OS X -tietokoneissa) Palautus ja uusi linja ( \\r\\n )   (Yleistä Windows-tietokoneissa) Loppujen lopuksi, mutta ei molempia.

###  .nccsv Metadata{#nccsvmetadata} 
Kun sekä luoja että lukija odottavat sitä, on myös mahdollista ja joskus hyödyllistä tehdä muunnelma NCCSV-tiedostosta, joka sisältää vain metatieto-osan. (mukaan lukien\\*END TADATA\\*Linjan linja) . Tuloksena on täydellinen kuvaus tiedoston attribuuteista, muuttujan nimistä ja tietotyypeistä, mikä palvelee samaa tarkoitusta kuin .das ja .dds-vastaukset. OPeNDAP palvelin. ERDDAP™ Palauta tämä variaatio, jos pyydät tiedostoa Tyyppi = .nccsv Metatiedot yhdestä ERDDAP™ Dataa.

##  [Metadata-osasto](#the-metadata-section)  {#the-metadata-section} 

NCCSV-tiedostossa jokainen metadata-osio käyttää muotoa
 [Muuttuva Nimen nimi](#variablename) , [attribuutti Nimen nimi](#attributename) , [Arvo 1](#value)  \\[ Arvo 2 \\]  \\[ Arvo 3 \\]  \\[ Arvo 4 \\]  \\[ ............ \\]   
Tilat ennen tai jälkeen kohteita ei sallita, koska ne aiheuttavat ongelmia, kun tiedosto tuodaan laskentataulukko-ohjelmiin.

### Yleissopimukset{#conventions} 
NCCSV-tiedoston ensimmäinen rivi on metadata-osion ensimmäinen rivi ja sen on oltava [\\*GLOBAL\\*](#global) Yleissopimuksissa on lueteltu kaikki tiedostossa käytetyt yleissopimukset CSV-luettelon sisältävänä lavana, esimerkiksi:
\\*GLOBAL\\*"Konventiot" COARDS CF-1.6, ACD-1.3, NCCSV-1.2
Yksi luettelon yleissopimuksista on NCCSV-1.2, joka viittaa tämän eritelmän nykyiseen versioon.

### Metadatan loppu{#end-metadata} 
NCCSV-tiedoston metadata-osan loppu on mainittava linjalla, jolla on vain
\\*END TADATA\\*

On suositeltavaa, mutta ei vaadita, että kaikki tietyn muuttujan ominaisuudet näkyvät metadata-osion vierekkäisissä riveissä. Jos NCCSV-tiedosto muunnetaan NetCDF tiedosto, tilaus, että muuttujanimet ilmestyvät ensin metadata-osiossa, on muuttujien järjestys. NetCDF tiedosto.

Valinnaiset tyhjät viivat sallitaan metadata-osiossa vaaditun ensimmäisen rivin jälkeen. [\\*GLOBAL\\*](#global)   [Yleissopimukset](#conventions) Tietoa (Katso alapuolelta) ennen vaadittua viimeistä riviä\\*END TADATA\\*.

Jos laskentataulukko luodaan NCCSV-tiedostosta, metadata-tiedot-osa näkyy A sarakkeessa muuttuvilla nimillä, sarakkeessa B olevilla nimillä ja C sarakkeessa olevilla arvoilla.

Jos näiden yleissopimusten mukainen laskentataulukko tallennetaan CSV-tiedostoksi, metadata-osiossa olevien rivien lopussa on usein ylimääräisiä tiivisteitä. Ohjelmisto, joka muuntaa NCCSV-tiedostot .nc Tiedostot jättävät ylimääräiset kommat huomiotta.

###  [Muuttuva Nimen nimi](#variablename)  {#variablename} 

 *Muuttuva Nimen nimi* on tietotiedoston muuttujan tapausherkkä nimi. Kaikkien muuttuvien nimien on aloitettava 7-bittisellä ASCII-kirjeellä tai alipisteellä, ja ne on koottava 7-bittisiin ASCII-kirjeisiin, koristeisiin ja 7-bittisiin ASCII-numeroihin.
#### GLOBAL{#global} 
Erityinen muuttujan nimi [\\*GLOBAL\\*](#global) Sitä käytetään nimeämään globaali metadata.

###  [attribuutti Nimen nimi](#attributename)  {#attributename} 

 *attribuutti Nimen nimi* on muuttuvaan tai [\\*GLOBAL\\*](#global) . Kaikkien attribuuttien nimet on aloitettava 7-bittisellä ASCII-kirjeellä tai aliarvostuksella ja ne on koottava 7-bittisiin ASCII-kirjeisiin, koristeisiin ja 7-bittisiin ASCII-numeroihin.

#### Kalastus{#scalar} 
Erityinen attribuutti Nimen nimi\\*Kalastus\\*voidaan käyttää skaalautuvan datamuuttujan luomiseen ja sen arvon määrittämiseen. Tietotyypin tyyppi\\*Kalastus\\*määrittää muuttujien tietotyypin, joten älä määritä\\*DATA TIPE\\*skalaarimuuttujat. Huomaa, että NCCSV-tiedoston Data-osiossa ei saa olla tietoja skalaarisista muuttujista.

Esimerkiksi luoda skaalautuva muuttuja, jonka nimi on "alus", jolla on arvo "Okeanos Explorer" ja cf ́role attribuutti, käyttää:
laiva,\\*Kalastus\\*"Okeanos Explorer"
alus, cf_role, trajectory
Kun skaalautuva tietomuuttuja luetaan ERDDAP™ skalaariarvo muunnetaan datataulukon sarakkeeksi, jolla on sama arvo joka rivillä.

###  [Arvon arvo](#value)  {#value} 

 *Arvon arvo* on metadata-attribuutin arvo, ja sen on oltava sarja, jossa on yksi tai useampi joko tavu, ubiitti, lyhyt, lyhyt, lyhyt, uint, uint, pitkä, ulong, kelluva, kaksinkertainen, String tai Char. Muita tietotyyppejä ei tueta. Ominaisuudet ilman arvoa jätetään huomiotta. Jos aliarvoa on enemmän kuin yksi, aliarvojen on oltava samat tietotyypit. Muiden kuin Strings-tietotyyppien osalta arvot on erotettava esimerkiksi:
 sst , actual\\_range 0.17f,23.58f
For Strings, käytä yksittäistä Stringiä \\n   (Newline) hahmot, jotka erottavat alustot.

Tietotyyppien määritelmät ovat:

#### By{#byte} 
* Attribuuttiarvot (8-bittinen, allekirjoitettu) on kirjoitettava riffix 'b', esim. -7b, 0b, 7b. Vaihtoehtoisten arvojen vaihteluväli on -128-127. Luku, joka näyttää tavulta, mutta on mitätön (Esimerkki: 128b) Muutetaan puuttuvaksi arvoksi tai luodaan virheilmoitus.
     
#### Uby{#ubyte} 
* attribuuttiarvot (8-bittinen, allekirjoittamaton) on kirjoitettava riffix 'ub', esim. 0ub, 7ub, 250ub. Vaihtoehtoisten arvojen vaihteluväli on 0-255. Luku, joka näyttää ubiitilta, mutta on mitätön. (Esimerkki: 256) Muutetaan puuttuvaksi arvoksi tai luodaan virheilmoitus. Jos mahdollista, käytä tavua utavun sijaan, koska monet järjestelmät eivät tue allekirjoittamattomia tavuja. (esim. attribuutit NetCDF 3 tiedostoa) .
     
#### Lyhyt lyhyt{#short} 
* Lyhyet ominaisuudet (16-bittinen, allekirjoitettu) on kirjoitettava riffiksillä, esim. -30000, 0s, 30000s. Lyhyet arvot ovat -32768 - 32767. Luku, joka näyttää lyhyeltä, mutta on mitätön. (Esimerkkinä 32768) Muutetaan puuttuvaksi arvoksi tai luodaan virheilmoitus.
     
#### Lyhyt{#ushort} 
* Lyhyet attribuuttiarvot (16-bittinen, allekirjoittamaton) on kirjoitettava riffix 'me', esim. 0us, 30000us, 60000us. Lyhyet arvot ovat 0-65535. Luku, joka näyttää lyhyeltä, mutta on mitätön. (Esimerkki: 655) Muutetaan puuttuvaksi arvoksi tai luodaan virheilmoitus. Käytä mahdollisuuksien mukaan lyhyitä, koska monet järjestelmät eivät tue allekirjoittamattomia tavuja. (esim. attribuutit NetCDF 3 tiedostoa) .
     
#### By{#byte-1} 
* Attribuuttiarvot (32-bittinen, allekirjoitettu) Se on kirjoitettava JSON-lomakkeina ilman desimaalipistettä tai eksponenttia, mutta riffiksillä i, esim. -12067978i, 0i, 12067978i. Käytettävien arvojen vaihteluväli on -2147483648 - 2147483647. Numero, joka näyttää tunnilta, mutta on mitätön. (2147483648i) Muutetaan puuttuvaksi arvoksi tai luodaan virheilmoitus.
     
#### Uin{#uint} 
* Täydelliset attribuuttiarvot (32-bittinen, allekirjoittamaton) on kirjoitettava JSON-intresseinä ilman desimaalipistettä tai eksponentia, mutta riffix 'ui', esim. 0ui, 12067978ui, 4123456789ui. Käytettävien arvojen vaihteluväli on 0-4294967295. Numero, joka näyttää uintilta, mutta on mitätön. (2147483648ui) Muutetaan puuttuvaksi arvoksi tai luodaan virheilmoitus. Jos mahdollista, käytä suodatinta uintin sijaan, koska monet järjestelmät eivät tue allekirjoittamattomia tavuja. (esim. attribuutit NetCDF 3 tiedostoa) .
     
#### Pitkä pitkä{#long} 
* Pitkät ominaisuudet (64-bittinen, NUG:n tukema ja ERDDAP™ CF:n tuella ei vielä) on kirjoitettava ilman desimaalipistettä ja riffiksillä L, esim. -123456789874321L, 0L, 123456789874321L. Jos käytät muuntamisohjelmistoa muuntaaksesi NCCSV-tiedoston, jolla on pitkät arvot, NetCDF -3 tiedostoa, pitkät arvot muunnetaan kaksoisarvoiksi. Pitkät arvot ovat -9223372036854775808 - 9223372036854775807. Luku, joka näyttää pitkältä, mutta ei (9223372036854775808L) Muutetaan puuttuvaksi arvoksi tai luodaan virheilmoitus. Jos mahdollista, käytä kaksinkertaista ulongin sijasta, koska monet järjestelmät eivät tue pitkään. (esim. NetCDF 3 tiedostoa) .
     
#### ulong{#ulong} 
* Kultainen attribuutti (64-bittinen, allekirjoittamaton, tällä hetkellä NUG:n tukema ja ERDDAP™ CF:n tuella ei vielä) on kirjoitettava ilman desimaalipistettä ja riffix 'uL', esim. 0uL, 123456787654321uL, 9007199254740992uL. Jos käytät muuntamisohjelmistoa muuntaaksesi NCCSV-tiedoston, jolla on pitkät arvot, NetCDF -3 tiedostoa, pitkät arvot muunnetaan kaksoisarvoiksi. Pitkät arvot ovat 0-18446744073709551615. Numerot, jotka näyttävät ulommalta, mutta ovat mitättömiä. (184467440737095516uL) Muutetaan puuttuvaksi arvoksi tai luodaan virheilmoitus. Jos mahdollista, käytä kaksinkertaista ulomman sijasta, koska monet järjestelmät eivät tue allekirjoitettua tai allekirjoittamatonta pitkää aikaa. (esim. NetCDF 3 tiedostoa) .
     
#### kelluva{#float} 
* kelluvat arvot (32-bittinen) on kirjoitettava riffiksillä f ja sillä voi olla desimaalinen piste ja/tai eksponentti, esim. 0f, 1f, 12.34f, 1e12f, 1.23e+12f, 1.23e12f, 1.87E-7f. Nanf:n käyttö kelluvalle NaN:lle (Kadonnut) arvoa. Kukkien valikoima on noin +/-3.40282347E+38f (7 merkittävää desimaalia) . Luku, joka näyttää kelluvalta, mutta on mitätön. (1.0e39f) Muutetaan puuttuvaksi arvoksi tai luodaan virheilmoitus.
     
#### kaksinkertainen{#double} 
* Kaksinkertaiset arvot (64-bittinen) on kirjoitettava riffiksillä 'd' ja sillä voi olla desimaalinen piste ja/tai eksponentti, esim. 0d, 1d, 12.34d, 1e12d, 1.23e+12d, 1.23e12d, 1.87E-7d. Nandin käyttö kaksoisnappiin (Kadonnut) arvoa. Kaksoisalue on noin +/-1,79769313486231570E+308d (15 merkittävää desimaalia) . Luku, joka näyttää kaksinkertaiselta, mutta on mitätön. (1.0e309d) Muutetaan puuttuvaksi arvoksi tai luodaan virheilmoitus.
     
#### String{#string} 
* String attribute -arvot ovat UCS-2-hahmojen sarja. (2-tavuiset Unicode-hahmot, kuten Java ) Tämä on kirjoitettava JSONin kaltaisiksi jousiksi.
    * Kaksinkertainen lainaus (""") String-arvo on koodattava kahdeksi tarjoukseksi (""") . Tämä on mitä laskentataulukko-ohjelmat vaativat, kun luet .csv-tiedostoja. Tämä on mitä laskentataulukko-ohjelmat kirjoittavat, kun tallentaa laskentataulukon .csv-tiedostona.
    * Erityiset JSON-selkälaskennalliset merkit String-arvossa on koodattava kuten JSONissa (erityisesti \\n (uusiviiva), «backslash, \f (formfeed), \t (tab), r (kuljetuspalautus) tai [U *Hhhh* ](#uhhhh) syntaksi. Laajennustaulukossa älä käytä Alt Enteriä määrittämään tekstisolussa olevaa uutta linjaa. \\n   (2 merkkiä: selkäranka ja n """) ilmoittamaan uudesta linjasta.
#####  uhhhh  {#uhhhh} 
    * Kaikki muut vähemmän kuin merkki #32 on koodattava syntaksilla. *Hhhh* missä hhhh on 4-numeroinen heksadesimaalinen luku.
    * Kaikki painettavissa olevat merkit, jotka ovat suurempia kuin merkki #126, esim. Euro-merkki, voivat näkyä koodaamattomina, esim. € (Euro-hahmo) tai koodattuna [U *Hhhh* ](#uhhhh) syntaksi, esim. u20AC. Katso koodisivut, joihin viitataan [https://en.wikipedia.org/wiki/Unicode](https://en.wikipedia.org/wiki/Unicode) löytää heksadesimaaliluvut, jotka liittyvät tiettyihin Unicode-merkkeihin tai käyttää ohjelmistokirjastoa. Huomaa, että jotkut ERDDAP™ .csv käyttää ISO 8859-1 -hahmoa, joten Unicode-merkit yli #255 menetetään, kun nämä tietoarvot kirjoitetaan näille tiedostotyypeille.
    * Kaikki ei-tulostettavissa olevat hahmot, jotka ovat suurempia kuin merkki #126, esim. merkki #127, ovat vahvasti irrotettuja, mutta sinun pitäisi käyttää #uuld. *Hhhh* syntaksia, jos niihin sisältyy.
    * Jos ketjussa on tilaa alussa tai lopussa, tai se sisältää (Kaksinkertainen) tai tiivistelmä tai sisältää arvoja, joita muuten tulkitaan jonkin muun tietotyypin mukaan (Esimerkki: Int) Tai on sana "null", koko String on suljettava kaksoislainoihin; muuten, toisin kuin JSON, suljetut kaksi lainausta ovat valinnaisia. Suosittelemme: jos epäilet, sulje koko String kaksoislainoihin. Avaruudet, jotka ovat alkaneet tai päättyneet, lannistuvat voimakkaasti.
         
#### Char{#char} 
* char attribute -arvot ovat yksi UCS-2-hahmo (2-tavuiset Unicode-hahmot, kuten Java ) . Tulostettavat hahmot (muut kuin erikoishahmot, kuten Newline, ", ja) voidaan kirjoittaa niin kuin on. Erikoishenkilöt (Esimerkki: Newline) Muut painamattomat hahmot (#127) on kirjoitettava yhdessä [U *Hhhh* ](#uhhhh) syntaksi. Char attribute -arvot on sisällytettävä yksittäisiin tarjouksiin. (Sisäiset lainaukset) Kaksinkertainen lainaus (Ulkoiset lainaukset) Esimerkkinä "a" """ """" (Kaksinkertainen merkintä) "'''''' (Yhden lainauksen hahmo) "Ei" (Tab) "U007F" (Delete ’hahmo’ """) » » » » €» (Euro-hahmo) . Tämä järjestelmä käyttää yksi- ja kaksi lainauksia on outo ja hankala, mutta se on tapa erottaa hyväntekeväisyys arvot Strings tavalla, joka toimii laskentataulukot. Arvo, joka näyttää kartalta, mutta on mitätön, tuottaa virheilmoituksen. Huomaa, että jotkut ERDDAP™ .csv käyttää ISO 8859-1 -hahmoa, joten Unicode-merkit yli #255 menetetään, kun nämä tietoarvot kirjoitetaan näille tiedostotyypeille.

### Suffix{#suffix} 
Huomaa, että NCCSV-tiedoston attribuuttiosassa kaikilla numeerisilla attribuuttiarvoilla on oltava riittävä kirjain. (Esim. ”b”) Numeerisen tietotyypin tunnistaminen (Esimerkki: Tate) . NCCSV-tiedoston tietojen osiossa numeeriset tietoarvot eivät saa koskaan olla näitä riittäviä kirjaimia. (poikkeuksena 'L' pitkät kokonaisluvut ja 'UL' ulottuvilla kokonaisluvuilla) tietotyyppi on määritelty\\*DATA TIPE\\*Muuttujien ominaisuus.

### Tietotyyppi{#data-type} 
Tietotyyppi jokaiselle ei- [Skaalaa](#scalar) Muuttujan on määriteltävä\\*DATA TIPE\\*attribuutti, jolla voi olla tavu, ubyte, lyhyt, uhort, int, uint, pitkä, ulong, kelluva, kaksinkertainen, String taicharmi (Tapaus herkkä) . Esimerkiksi,
qc = lag,\\*DATA TIPE\\*Bye
VAROITUS: Oikean määrittäminen\\*DATA TIPE\\*Se on sinun vastuullasi. Väärä tietotyyppi (Esim. jos olisit määritellyt kelluvan) ei tuota virheilmoitusta ja saattaa aiheuttaa tietojen menettämisen. (Esimerkiksi kelluvat arvot pyöristetään sisätiloihin.) Kun NCCSV-tiedostoa luetaan ERDDAP™ tai muuntaa a NetCDF tiedosto.

### Char hämmentynyt{#char-discouraged} 
Char-tietojen käyttö on lannistunut, koska niitä ei tueta laajasti muissa tiedostotyypeissä. char-arvot voidaan kirjoittaa tietoosiossa yksittäisinä merkkeinä tai Stringsinä. (Etenkin, jos haluat kirjoittaa erityispiirteen) . Jos String löydetään, Stringin ensimmäinen ominaisuus käytetään kartan arvona. Nollan pituus ja puuttuvat arvot muunnetaan hahmoksi @uFFF. Huomaa, että NetCDF tiedostot tukevat vain yksittäisiä tavuja, joten kaikki ketjut, jotka ovat suurempia kuin char #255, muunnetaan "? NetCDF tiedostoja. Ellei Charset-tunnistetta käytetä määrittämään eri kartta Charset Charset Charset Charset Charsetille, käytetään ISO-8859-1-kartta.

### Pitkä ja Unsigned Discouraged{#long-and-unsigned-discouraged} 
Pitkät ja allekirjoittamattomat tyypit ovat epäselviä. Vaikka monet tiedostotyypit (esim. NetCDF 4 ja json) ja ERDDAP™ Pitkä ja allekirjoittamaton tuki (ubyte, uint, ulong) Pitkät ja allekirjoittamattomat arvot NCCSV-tiedostoissa ovat tällä hetkellä laiminlyötyjä, koska niitä ei tueta Excelillä, CF:llä ja NetCDF 3 tiedostoa. Jos haluat määrittää pitkät tai allekirjoittamattomat arvot NCCSV-tiedostossa (tai vastaavassa Excel-taulukossa) , sinun täytyy käyttää riffix 'L' niin, että Excel ei kohtele numeroita kelluva piste numerot pienempi tarkkuus. Tällä hetkellä, jos NCCSV-tiedostot muunnetaan NetCDF 3 .nc tiedostot, pitkät ja ulommat data-arvot muunnetaan kaksoisarvoiksi, mikä aiheuttaa tarkkuuden menetyksen hyvin suurille arvoille. (alle -2 53 pitkä tai yli 2 ^53 pitkä ja ulong) . Sisällä NetCDF 3 .nc tiedostot, ubyte, uhort ja uint-muuttujat näkyvät tavuna, lyhyenä ja tiivistettynä \\Unsigned = todellinen metadata attribuutti. Sisällä NetCDF 3 .nc tiedostot, ubyte, uhort ja uint attribuutit näkyvät tavuina, lyhyinä ja int-ominaisuuksina, jotka sisältävät vastaavan kahden täydentävän arvon (255ub esiintyy -1b:nä) . Tämä on tietenkin hankalaa, joten allekirjoitettuja tietotyyppejä tulisi käyttää allekirjoittamattomien tietotyyppien sijaan aina kun mahdollista.

### CF, ACDD ja ERDDAP™ Metadata{#cf-acdd-and-erddap-metadata} 
Koska on kuviteltu, että useimmat NCCSV-tiedostot tai .nc Niistä luotuja tiedostoja luetaan ERDDAP On erittäin suositeltavaa, että NCCSV-tiedostot sisältävät metatiedot, joita tarvitaan tai suositellaan. ERDDAP™ (katso)
 [Docs/server-admin/datasets#global-attribuutit](/docs/server-admin/datasets#global-attributes) ). Attribuutit ovat lähes kaikki CF- ja ACDD-metadatastandardeista ja ne toimivat asianmukaisesti kuvaamaan tietoaineistoa. (Mitä, milloin, missä, miten) henkilölle, joka ei muuten tiedä mitään aineistosta. Erityisen tärkeää on, että lähes kaikilla numeerisilla muuttujilla pitäisi olla yksikön ominaisuus, jossa on yksittäinen ominaisuus. UDUNITS yhteensopiva arvo, esim.
 sst , yksiköt, tutkinto

On hyvä sisällyttää lisäominaisuuksia, jotka eivät ole CF- tai ACDD-standardeista tai ERDDAP .

##  [Tietojen osasto](#the-data-section)  {#the-data-section} 

###  [Rakenne](#structure)  {#structure} 

Tieto-osion ensimmäisellä rivillä on oltava tapausherkkä, tiivistetty luettelo muuttuvista nimistä. Kaikki muuttujat tässä luettelossa on kuvattava metadata-osiossa ja päinvastoin. (Muuta kuin [\\*GLOBAL\\*](#global) attribuutit ja [\\*Kalastus\\*](#scalar) Muuttujia) .

Toisella osa-alueen penultimate-linjoilla on oltava erillinen arvoluettelo. Jokaisella tietorivillä on oltava sama määrä arvoja kuin koodattu muuttuvien nimien luettelo. Avaruudet ennen arvoja tai sen jälkeen eivät ole sallittuja, koska ne aiheuttavat ongelmia tiedoston tuonnissa laskentataulukko-ohjelmiin. Jokaisessa tässä osassa olevassa sarakkeessa on oltava vain arvoja.\\*DATA TIPE\\*tälle muuttujalle määritelty\\*DATA TIPE\\*ominaisuus tuolle muuttujalle. Toisin kuin attribuutit-osiossa, tieto-osiossa numeroarvoilla ei saa olla riittäviä kirjaimia tietotyypin määrittämiseksi. Toisin kuin attribuuttien osiossa, tieto-osan hyväntekeväisyysarvot voivat jättää sulkevat yksittäiset tarjoukset, jos niitä ei tarvita erittelyyn. (Näin ollen "," ja "" on mainittava tässä esitetyllä tavalla.) . NCCSV-tiedostossa voi olla useita rivejä, mutta tällä hetkellä ERDDAP™ NCCSV-tiedostoja voi lukea vain noin 2 miljardilla rivillä. Yleensä on suositeltavaa jakaa suuria tietoaineistoja useisiin NCCSV-tiedostoihin, joissa on alle miljoona riviä.

#### Lopputiedot{#end-data} 
Tiedosto-osan loppu on mainittava linjalla, jossa on vain
\\*END DATA\\*

Jos NCCSV-tiedostossa on lisäsisältöä\\*END DATA\\*Se jää huomiotta, kun NCCSV-tiedosto muunnetaan .nc tiedosto. Tällainen sisältö on siis lannistunut.

Näiden yleissopimusten mukaisessa laskentataulukossa muuttuvat nimet ja tietoarvot ovat useissa sarakkeissa. Katso esimerkki alta.

###  [puuttuvat arvot](#missing-values)  {#missing-values} 

Lukuisat puuttuvat arvot voidaan kirjoittaa numeroarvoksi, joka on tunnistettu missing\\_value tai \\ \\ \\ \\ \\ \\ \\ n arvon ominaisuus kyseiselle muuttujalle. Katso esimerkiksi tämän tiedon toinen arvo:
Bell M. Shimada, 99,123,4
Tämä on suositeltu tapa käsitellä puuttuvia arvoja tavu, ubyte, lyhyt, lyhyt, lyhyt, suora, lyhyt, pitkä ja ulottuva muuttujia.

Kahden NaN-arvon voi kirjoittaa NaN-arvoksi. Katso esimerkiksi tämän tiedon toinen arvo:
Bell M. Shimada, NaNaN, 123.4

Tyhjällä kentällä voidaan ilmoittaa lukko- ja numeroarvoja. Katso esimerkiksi tämän tiedon toinen arvo:
Bell M. Shimada, 123

Byte, ubyte, short, ushort, int, uint, long, and ulong muuttujat, NCCSV-muuntimen käyttö ja ERDDAP™ muutetaan tyhjä kenttä kyseisen tietotyypin sallittuun enimmäisarvoon (127 tavua) . Jos teet tämän, muista lisätä missing\\_value tai ►Fill-arvon ominaisuus kyseiselle muuttujalle tämän arvon tunnistamiseksi, esim.
 *Muuttuva Nimen nimi* Arvo, 127b
Kaksoismuuttujat ja kelluvat, tyhjä kenttä muunnetaan NaN.

###  [Päivämäärän arvot](#datetime-values)  {#datetime-values} 

Päivämäärän arvot (päivämäärät, joilla ei ole aikakomponenttia) Voidaan esittää numeroina tai NCCSV-tiedostoina. Tietyllä ajantasaisella muuttujalla voi olla vain String-arvoja tai vain numeroarvoja, ei molempia. NCCSV-ohjelmisto muuntaa String dateTime -arvot numeeriseksi päivämääräksi Aikaa arvostetaan luomalla .nc tiedostoja (Tarvittaessa CF) . DateTime-arvoilla on etu, että ihmiset lukevat helposti.

Numeerisina arvoina esitetyillä DateTime-arvoilla on oltava yksiköiden ominaisuus, jossa määritellään *Yksiköt* Siitä lähtien *Päivämäärä päivämäärä Aika-aika* CF:n edellyttämällä tavalla ja UDUNITS esim.
aika, yksiköt, sekunnit vuodesta 1970-01-01T00:00

DateTime-arvot, jotka on edustettuina String-arvoina, täytyy olla String.\\*DATA TIPE\\*attribuutti ja yksiköt, jotka määrittävät päivämäärän Aikataulu, joka on määritelty Java DateFormatter-luokka
 ( [https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) ) . Esimerkiksi,
aika, yksiköt, yyyy-MM-dd T'Hh: mm: ssz
Kaikkien tietomuuttujan päivämäärien on käytettävä samaa muotoa.
Useimmissa tapauksissa yksiköiden attribuutin päivämäärän malli on jonkin näistä muodoista vaihtelua:

*    yyyy-MM-dd T'HHh: mm. SSSZ, joka on ISO 8601:2004 (E) Päivämäärä päivämäärä Aikamuoto. Saatat tarvita lyhennetyn version tästä, esimerkiksi yyyy-MM-dd T'Hh: mm: ssz (Ainoa suositeltu muoto) tai tai yyyy-MM-dd . Jos vaihdat päivämäärän Aika-arvojen muotoa, NCCSV suosittelee voimakkaasti, että muutat tätä muotoa. (Ehkä lyhennetty) . Tämä on muoto, jonka ERDDAP™ Käytetään, kun se kirjoittaa NCCSV-tiedostoja.
* YyyMddHmms.SSS on ISO 8601:2004 -päivän kompakti versio. Aikamuoto. Saatat tarvita lyhennetyn version tästä, esimerkiksi YyyyMdd.
* M/d/yyy H:mm. SSS, joka käsittelee yhdysvaltalaisia päivämääriä ja päivämääriä, kuten 3/23/2017 16:22:03.000. Saatat tarvita lyhennetyn version tästä, esim. M/d/yyy.
* YyyDDHHmmsSSS, joka on vuosi plus nolla-paddoitu päivä (Esim. 001 = Jan 1, 365 = Dec 31 ei-leap-vuonna; tätä kutsutaan joskus virheellisesti Julian-päiväksi.) . Saatat tarvita lyhennetyn version tästä, esim. YyyDDD.

#### Tarkkuus{#precision} 
Kun ohjelmistokirjasto muuntaa .nc NCCSV-tiedostoon kaikki päivämäärät Aika-arvot kirjoitetaan ISO 8601:2004 -standardilla (E) Päivämäärä päivämäärä Aikamuoto, esim. 1970-01-01T00:00:00. Voit kontrolloida tarkkuutta ERDDAP erityiset ominaisuudet time\\_precision . Näytä
 [Docs/server-admin/datasets# time\\_precision ](/docs/server-admin/datasets#time_precision) .

#### Aikavyöhyke{#time-zone} 
Päivämäärän oletusaikavyöhyke Aika-arvot ovat Zulu   (tai GMT) aikavyöhyke, jolla ei ole päivänvalon säästöaikaa. Jos aikamuuttujalla on päivämäärä-arvot eri aikavyöhykkeeltä, sinun on määritettävä tämä ERDDAP erityiset ominaisuudet time\\_zone . Tämä on vaatimus ERDDAP™ (katso)
 [Docs/server-admin/datasets# time\\_zone ](/docs/server-admin/datasets#time_zone) ).

###  [Degree arvot](#degree-values)  {#degree-values} 

Kuten CF vaatii, kaikki arvot (esim. pituus ja leveys) on määriteltävä desimaalitasoisiksi kaksinkertaisiksi arvoiksi, ei asteikolla min'sec' String tai erillisinä muuttujina asteissa, minuuteissa ja sekunneissa. Suunnittelijat N, S, E ja W eivät ole sallittuja. Hyödynnä kielteisiä arvoja länsimaissa ja eteläisissä leveysasteissa.

##  [DSG Ominaisuudet Types](#dsg-feature-types)  {#dsg-feature-types} 

NCCSV-tiedosto voi sisältää CF Discrete Sampling Geometrian.
 ( [https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) ) dataa. Nämä ominaisuudet tekevät tämän työn:

1. CF:n edellyttämällä tavalla NCCSV-tiedoston on sisällettävä rivi metadata-osioon, jossa tunnistetaan [\\*GLOBAL\\*](#global)   featureType attribuutti, esim.
    \\*GLOBAL\\*, featureType Trajectory
2. Käyttöön ERDDAP™ , NCCSV-tiedoston on sisällettävä viiva tai rivi metadata-osioon, jossa tunnistetaan cfrole = ... muuttujia, esim.
alus, cf_role, trajectory
Tämä on valinnaista CF:lle, mutta sitä tarvitaan NCCSV:ssä.
3. Käyttöön ERDDAP™ NCCSV-tiedoston on sisällettävä viiva tai rivit metadata-osioon, jossa määritetään, mitkä muuttujat liittyvät jokaiseen aikasarjaan, trajectoryyn tai profiiliin. ERDDAP™ (katso)
     [/docs/server-admin/datasets #cdm \\data \\](/docs/server-admin/datasets#cdm_data_type) ), esim.
    \\*GLOBAL\\*,cd _trajectory _variables
tai tai
    \\*GLOBAL\\*,cd | Timeseries |variables » station » ,lat,lon »

##  [Näytä tiedosto](#sample-file)  {#sample-file} 

Tässä on näytetiedosto, joka osoittaa monia NCCSV-tiedoston ominaisuuksia:
```
\\*GLOBAL\\*,Conventions,"COARDS, CF-1.6, ACDD-1.3, NCCSV-1.2"
\\*GLOBAL\\*,cdm\\_trajectory\\_variables,"ship"
\\*GLOBAL\\*,creator\\_email,erd.data@noaa.gov
\\*GLOBAL\\*,creator\\_name,Bob Simons
\\*GLOBAL\\*,creator\\_type,person
\\*GLOBAL\\*,creator\\_url,https://www.pfeg.noaa.gov
\\*GLOBAL\\*,featureType,trajectory
\\*GLOBAL\\*,infoUrl,https://erddap.github.io/docs/user/nccsv-1.20
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
testByte,\\*DATA\\_TYPE\\*,byte
testByte,units,1
testUByte,\\*DATA\\_TYPE\\*,ubyte
testUByte,units,1
testLong,\\*DATA\\_TYPE\\*,long
testLong,units,1
testULong,\\*DATA\\_TYPE\\*,ulong
testULong,units,1
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
sst,testChars,"','","'""'","'€'"
sst,testStrings," a~,\\n'z""\\u20AC"
sst,testUBytes,0ub,127ub,255ub
sst,testUInts,0ui,2147483647ui,4294967295ui
sst,testULongs,0uL,9223372036854775807uL,18446744073709551615uL
sst,testUShorts,0us,32767us,65535us

\\*END\\_METADATA\\*
ship,time,lat,lon,status,testByte,testUByte,testLong,testULong,sst
Bell M. Shimada,2017-03-23T00:45:00Z,28.0002,-130.2576,A,-128, 0,-9223372036854775808L,0uL,10.9
Bell M. Shimada,2017-03-23T01:45:00Z,28.0003,-130.3472,\\u20AC,0,127,-9007199254740992L,9223372036854775807uL,10.0
"Bell M. Shimada","2017-03-23T02:45:00Z",28.0001,-130.4305,"'\\t'",126,254,9223372036854775806L,18446744073709551614uL,99
"Bell M. Shimada",2017-03-23T12:45:00Z,27.9998,-131.5578,"'""'",127,255,9223372036854775807L,18446744073709551615uL,NaN
```
Huomautuksia:

* Näytetiedosto sisältää monia vaikeita tapauksia (esim. char ja pitkät muuttujat ja vaikeat String-arvot) . Useimmat NCCSV-tiedostot ovat yksinkertaisempia.
* Lisenssilinja on jaettu kahteen riviin, mutta se on vain yksi rivi näytetiedostossa.
* U20ac on \\uhhh h:n koodaus, €00FC on \\uhhh h:n koodaus. Voit myös käyttää salaamattomia hahmoja suoraan.
* Monet monet Esimerkkiin kuuluvat kaksinkertaiset lainaukset, vaikka niiden ei tarvitse olla esimerkiksi monia globaaleja ominaisuuksia, kuten otsikko, yksittäisten yksikköjen attribuutti ja kolmas data.
* Olisi selkeämpää ja parempi, jos testLong-muuttujan yksiköt kirjoitettaisiin kaksinkertaisilla merkinnöillä, jotka osoittavat sen olevan String-arvo. Nykyinen edustus (1. Ilman lainauksia) tulkitaan oikein lantiona, ei kokonaislukuna, koska ei ole "i"-kiinteä.
* Toisin kuin muissa numeerisissa tietotyypeissä, data-alueen pitkät arvot ovat riittäviä. ("L") Se tunnistaa numerotietotyypin. Tämä on välttämätöntä, jotta laskentataulukot eivät tulkitse arvoja kelluvana pistenumerona ja menettäisi täsmällisyyttä.

##  [Spreadsheets](#spreadsheets)  {#spreadsheets} 

taulukossa, kuten NCCSV-tiedostossa:

* Kirjoita numeerisia attribuuttiarvoja NCCSV-tiedostojen mukaisesti (esimerkiksi riittävillä kirjaimilla, kuten f, attribuutin tietotyypin tunnistamiseksi) .
* Stringsissä kaikki painamattomat ja erikoishahmot on kirjoitettava joko JSONin kaltaisiksi selkärankaisiksi hahmoiksi. (esim. \\n Newline) Hexadecimal Unicode -luku (Tapaus herkkä) syntaksin kanssa [U *Hhhh* ](#uhhhh) . Erityisesti käyttö \\n   (2 merkkiä: selkäranka ja n """) Uuden linjan ilmoittaminen Stringissä, ei Alt Enterissä. Kaikki painettavissa olevat hahmot voidaan kirjoittaa koodaamattomina tai syntaksilla. [U *Hhhh* ](#uhhhh) .

Ainoat erot NCCSV-tiedostojen ja analogisen laskentataulukon välillä ovat:

* NCCSV-tiedostoilla on arvoja tiivistetyllä linjalla.
Spreadsheetsillä on arvoja vierekkäisissä soluissa.
* NCCSV-tiedostoja ympäröi usein kaksinkertainen lainaus.
Lajikkeita ei koskaan ympäröi kaksinkertainen lainaus.
* Sisäiset kaksinkertaiset lainaukset (""") NCCSV-tiedostojen Stringsissä on kaksi kaksoislainaa.
Sisäiset kaksinkertaiset tarjoukset laskentataulukoissa näkyvät 1 kaksinkertaisena lainauksena.

Jos taulukko, joka seuraa näitä yleissopimuksia, tallennetaan CSV-tiedostona, on usein ylimääräisiä tiivisteitä monien rivien lopussa. Ohjelmisto, joka muuntaa NCCSV-tiedostot .nc Tiedostot jättävät ylimääräiset kommat huomiotta.

###  [Excel](#excel)  {#excel} 

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

###  [Google Sheets](#google-sheets)  {#google-sheets} 

NCCSV-tiedoston tuominen Google Sheetsiin:

1. Valitse tiedosto: Tuonti.
2. Valitse Lataa tiedosto ja napsauta Lataa tiedosto tietokoneeltasi. Valitse tiedosto ja napsauta sitten Avaa.
      
Tai valitse My Drive ja vaihda tiedostotyypin pudota valinta kaikkiin tiedostotyyppeihin. Valitse tiedosto ja napsauta sitten Avaa.

Luo NCCSV-tiedosto Google Sheets -taulukosta:

1. Valitse tiedosto: Säästä kuin
2. Muuta säästöä tyypiksi: CSV (Comma delimited)   (*csv) .
3. Vastauksena yhteensopivuusvaroitukseen klikkaa Kyllä.
4. Tuloksena oleva .csv-tiedosto sisältää ylimääräisiä tiivisteitä kaikkien muiden rivien kuin CSV-rivien lopussa. välittämättä niistä.

##  [Ongelmat / Varoitukset](#problemswarnings)  {#problemswarnings} 

* Jos luot NCCSV-tiedoston tekstieditorin kanssa tai luot analogisen laskentataulukon laskentataulukkoon, tekstieditori tai laskentataulukko-ohjelma ei tarkista, että noudatit näitä yleissopimuksia oikein. Sinun tehtäväsi on noudattaa näitä sopimuksia oikein.
* Tämän yleissopimuksen mukaisen laskentataulukon muuntaminen Csv-tiedostoksi (NCCSV-tiedosto) Tämä johtaa ylimääräisiin törmäyksiin kaikkien muiden rivien kuin CSV-datarivien lopussa. välittämättä niistä. Ohjelmisto muuntaa NCCSV-tiedostot .nc Tiedostot jättävät ne huomiotta.
* Jos NCCSV-tiedostossa on ylimääräisiä törmäyksiä rivien lopussa, voit poistaa ne muuntamalla NCCSV-tiedoston tiedostoksi. NetCDF tiedosto ja sen jälkeen muuntaa NetCDF Palauta NCCSV-tiedostoon.
* Kun yrität muuntaa NCCSV-tiedoston NetCDF tiedosto, ohjelmisto havaitsee joitakin virheitä ja tuottaa virheviestejä, jolloin muuntaminen epäonnistuu. Muut ongelmat ovat vaikeita tai mahdottomia saada kiinni, eikä niistä aiheudu virheilmoituksia tai varoituksia. Muita ongelmia (Esim. liiallinen komma rivien lopussa) jätetään huomiotta. Tiedostomuunnin tekee vain minimaalisen tarkastuksen tuloksena olevan korrektiuden. NetCDF esim. CF-vaatimusten noudattamisesta. Tiedoston luojan ja tiedostokäyttäjän vastuulla on tarkistaa, että muuntamisen tulokset ovat yhtä haluttuja ja oikein. Kaksi tapaa tarkistaa ovat:
    * Tulosta sisältö .nc tiedosto ncdump
         ( [https://linux.die.net/man/1/ncdump](https://linux.die.net/man/1/ncdump)  ) .
    * Katso tietojen sisältö sisään ERDDAP™ .

##  [Muutoksia](#changes)  {#changes} 

Alkuperäinen versio oli [NCCSV v1.00](/docs/user/nccsv-1.00)   (Sisällä ERDDAP™ v1.76, julkaistu 2017-05-12) 

* Muutokset käyttöön [NCCSV v1.10](/docs/user/nccsv-1.10)   (Sisällä ERDDAP™ V2.10, julkaistu 2020-11-05) :
    * Lisätty tuki ubyte, uhort, uint, ulong. Kiitos CF: n tuesta näihin tietotyyppeihin CF: ssä.
* Muutokset v1.20 (Sisällä ERDDAP™ v2.23, julkaistu 2023-02-27) :
    * Muutettu ASCII-hahmosta koodattuna UTF-8-koodaukseen NCCSV .csv -tiedostoille.
        *    ERDDAP™ Voit lukea tiedostoja kaikista NCCSV:n aiemmista ja nykyisistä versioista.
        *    ERDDAP™ Kirjoita NCCSV v1.20 -tiedostoja.
        * Jos olet kirjoittanut asiakkaan lukemaan NCCSV-tiedostoja, vaihda se niin, että se käsittelee kaikkia NCCSV-tiedostoja UTF-8-tiedostoina. Tämä toimii vanhempien NCCSV-tiedostojen kanssa, koska ASCII on UTF-8-hahmon koodauksen osajoukko.
        * Kiitos Pauline Chauvet, Nate ja Thomas Gardiner.
