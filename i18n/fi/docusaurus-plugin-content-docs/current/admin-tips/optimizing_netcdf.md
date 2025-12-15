Tämä sisältö perustuu a [Kirjoittanut Roy Mendelssohn ERDDAP Käyttäjäryhmä](https://groups.google.com/g/erddap/c/JWoS_y3cygg/m/zCpcNTxNAAAJ) .

1. Netcdf-tiedostojen optimointi pilveen
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

A. Paluu ja sivun koko

Äskettäin törmäsin tähän mielenkiintoiseen artikkeliin:

https://nsidc.github.io/cloud-optimized-icesat2/

Mikään ei tunnu herättävän intohimoja, kuten keskusteluja ohjelmointikielten, editorien ja tiedostomuotojen, ja tämä ei ole suositus siitä, mitä muotoja. (s) Sinun pitäisi käyttää, mutta mieluummin ymmärtää, mitä tuossa paperissa on ja nähdä, kuinka paljon parannusta voi saada. ( ERDDAP™ on aina yrittänyt olla agnostikko monista näistä asioista, mieluummin yrittää työskennellä sen kanssa, miten ihmiset todella työskentelevät tietojen kanssa.) .

Paperi on suunnattu lähinnä tilanteisiin, joissa tiedot tallennetaan esinekauppaan, kuten Amazon S3. Object-myymälät ovat saatavilla verkon kautta http  (s) komennot, joten varastointiin verrattuna suora yhteys (Virtuaalinen virtuaalinen) palvelin, on paljon pidempi viive, koska pyynnön on tehtävä pyöreä matka. Jos haluat tehdä niin vähän pyyntöjä kuin mahdollista, mutta jos teet vain suuria pyyntöjä vähentää puhelujen määrää, saatat käyttää enemmän tietoja kuin tarvitset, mikä voi olla yhtä hidasta, jos ei enemmän. Tehtävänä on saavuttaa tasapaino näiden kahden tekijän välillä. Ja vaikka pääsy objektikauppoihin on parantunut huomattavasti, on myös pääsy suoraan kiinnitettyyn tallennustilaan. Tutkittaessa joitakin arvioita ovat:

Paikallinen levy:
• • Hakuaika: 0,1 m
6 tavoitetta: 0,6 m (Huonosti) 
• • Hajautettu metadata on nopea
HTTP:n pilvi:
• • Viive: 100-200ms
6 pyyntöä: 600-1200m (Hyvin hidasta&#33;) 
• • Jokaisella pyynnöllä on verkon pyöristysaika

Toinen asia ymmärtää on, että netcdf4/hdf5-tiedostot tallennetaan ketjuihin ja palautetaan sivuilla, joten kunkin suhteellisen koko voi todella vaikuttaa käyttönopeuteen, kun pääsy on objektikaupasta, ja että oletusarvoisesti tiedoston metatiedot ovat hajallaan koko tiedostossa, joten metatiedot voivat ottaa useita pyyntöjä. Paperin tärkein kohta on, että netcdf4/hdf5-tiedostojen oletussivun koko on 4096 tavua. (4KB) - (Mikä on kamalaa pilvelle&#33;) Koska vain metadatan koko on suurempi kuin tämä, ja enemmän kuin todennäköistä on, että vaalean koko on suurempi kuin tämä. Ote vaatii paljon pyöreitä reittejä, jotka ovat hitaita. Se, mitä haluat tehdä, on palauttaa tiedosto niin, että kaikki metatiedot ovat tiedoston yläosassa ja että sivun koko on vähintään yhtä suuri kuin metadatan koko ja yhden naarmuunin kokoinen. Myös oletusarvoisesti sivun koko ei ole kiinteä, mutta käyttää strategiaa, joka vaihtelee. Se, mitä löydettiin, on kiinteän sivun kokoinen, joka tuottaa parempia tuloksia.

Miten voin määrittää tiedoston metatiedot?

> h5stat yourfile.nc | grep "File metadata" # metadata size
>

Miten voin määrittää Chunk size:

> h5dump -pH MUR41_file.nc | grep -A3 CHUNKED
>

tai tai

> ncdump -sh MUR41_file.nc | grep ChunkSizes
>

Miten voin määrittää sivun koon strategian:

> h5stat yourfile.nc | grep "File space management strategy"
>

Todennäköisesti tämä komento palauttaa H5F_FSPACE_STRATEGY_FSM_AGGR, joka on oletusstrategia ja mitä haluamme sen palauttavan, on H5F_FSPACE_STRATEGY_PAGE.

Miten voin palauttaa netcdf-tiedostoni niin, että kaikki metatiedot ovat etuosassa ja muuttaa strategiaa niin, että kiinteän sivun kokoa käytetään ja minkä kokoisia sivuja käytetään? Löytämäni peukalon säännöt ovat:

Sivun kokovalinta:
• • Täytyy olla ≥ koko tiedoston metatiedot (Kriittinen&#33;) 
• • Pitäisi olla valtaa 2 (4MB, 8MB, 16MB jne.) 
• • Älä mene hulluksi - 32MB on yleensä max
• • Ajatellaan vaaleanpunaisia kokoja - sivun koon pitäisi majoittua suurimpiin tuoliin

Kuten edellä mainittiin, mieluiten koon pitäisi olla suurempi kuin metadatan koko ja yhden naarmuuntumisen koko. Tutkimuksessa havaittiin, että monille aineistoille 8MB-sivun koko on hyvä vaihde, se on todennäköisesti suurempi kuin metadatan koko + naarmuuntumiskoko, eikä vedä enemmän dataa kuin tarvitset. Tämän saavuttamiseksi:

h5repack - S PAGE - G 8388608 .nc tiedosto_optimoitu .nc 

Tässä ovat arvot, joita käytetään eri sivujen koon saamiseen:

4194304 (4 MB) 
8388608 (8 MB) 
167716 (16 MB) 
554432 (32 MB) 

b. Onko tiedostoja saatavilla myös paikallisesti?

Paperi ja muut asiat, joita olen huomannut, viittaavat siihen, että jopa paikallisesti nopeusvoitto voi olla 10-30%. Kaikessa muussa kuin tyhjentävässä testissä havaitsin nopeushyötyjä noin 10 %, kun pyynnöt ovat suhteellisen pieniä verrattuna tiedostokokoon, ja nopeus vähenee, kun pyyntö laajenee, mutta en ole koskaan huomannut sen olevan hitaampi.

c. TANSTAAFL

Jossain, mutta siellä on paljon, se on kuin ilmainen lounas. Ja saalis on, että kiinteän sivun koko lisää tiedoston kokoa. Joissakin tapauksissa yritin:

617 m .nc 
632M seinämaalaus .nc 
608M seinä .nc 
616M seinämaalaus .nc 
29 M chla1 .nc 
40M chla1_optimoitu .nc 
30M chla2 .nc 
40M chla2_optimoitu .nc 

Joten kaupankäynti on, että tiedostokoko ei ole vähäinen.

d. Mutta jos tiedostoja on joka tapauksessa...?

Hyvä kysymys on, jos minun on kirjoitettava käsikirjoitus tiedostojen uudelleenkäsittelyyn, miksi en vain kirjoita käsikirjoitusta käännettäväksi muotoon, kuten zarr? zarrilla on monia kannattajia, ja jos olet kiinnostunut zarrista, tee vain nopea anckduckgo-haku ja siellä on paljon hyviä viestejä, ehkä tasapainoisempi näkymä on.https://www.youtube.com/watch?v=IEAcCmcOdJs  (On mielenkiintoista, että monet nostamistaan pisteistä ovat sitä, mitä jäätiköt yrittävät käsitellä.) . Joten miksi et halua kääntää tiedostojasi johonkin, kuten zarr, ensinnäkin, jos luot netcdf-tiedostoja säännöllisesti, voit alkaa optimoida tiedostoja tästä eteenpäin, joka ajan myötä näkee nopeushyötyjä ja sinun ei tarvitse uudistaa aiempia tiedostoja. ERDDAP™ Tiedostoja voidaan edelleen koota, vaikka jotkut sisäiset asetukset eroavat toisistaan. Toiseksi, sinulla voi olla paljon työkaluja, jotka riippuvat netcdf-tiedostoista, ja tämä lähestymistapa tarkoittaa, että sinun ei tarvitse ratkaista, mikä voisi olla laaja koodi. Tärkeintä on olla tietoinen vaihtoehdoista ja valita, mikä toimii parhaiten. Aivan kuten muistutus, jos haluat käyttää zarr-tiedostoja ERDDAP™ Niiden on oltava zarr-muotoisia v2-tiedostoja.

e. Big data - sivuun

Suurista tiedoista puhutaan paljon, mutta kuinka suuria ovat tiedot, joita useimmat ihmiset käyttävät ja miten se vertailee nykyaikaisten tietokoneiden ominaisuuksia. (Kyllä, kannettavat, ei palvelimet) . Mielenkiintoinen otos on:

https://www.youtube.com/watch?v=GELhdezYmP0Aloita minuutti 37, vaikka koko keskustelu on mielenkiintoista.

Hänen mainitsemansa tutkimus on:

https://motherduck.com/blog/redshift-files-hunt-for-big-data/

Joten on olemassa suhteellisen pieni prosentti käyttäjistä, jotka todella tarvitsevat tehoa, mutta suurin osa käyttäjistä voi tehdä analyysejä tietokoneella, 26TB ulkoiset asemat ovat nyt alle 300 dollaria ja huhut ovat, että 60TB ulkoinen asema on käytettävissä vuoden loppuun mennessä. Jotain mitä ajatella.

2. Käyttäminen ERDDAP™ Google Cloud Platformin tai muiden pilvipalveluiden tarjoajien kanssa
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Tällä hetkellä ERDDAP™ Sen tiedetään toimivan vain AWS-objektikauppojen kanssa. (S3) parantamalla ja yleistämällä ERDDAP™ Objektikaupan tuki on todo-listalla (Katso nähkäähttps://github.com/ERDDAP/erddap/issues/158) . Mitä tehdä, jos sinulle sanotaan, että sinun täytyy juosta ERDDAP™ Google Cloud Platform (GCP) Tai vastaavaa alustaa? Ensiksi useimmat pilvialustat tarjoavat erilaisia varastointitasoja, mukaan lukien yksi, joka on samanlainen kuin paikallinen varastointi ja joka on tunnustettu käyttöjärjestelmällä, joka on yhdistetty verkkoon yleensä käyttämällä NFS-yhteyttä. (Jälleen kerran OS:n kautta) Yksi, joka on objektikauppa. Ensimmäinen ratkaisu on olla käyttämättä objektikauppoja ja olisi hyvä mennä. Mutta kuten aina, TANSTAAFL ja haitta tässä tapauksessa on kuin lähdet objektikaupasta. NFS-yhteys - &gt; Paikalliset kustannukset nousevat. (Lisäisin, että NFS:ää käytetään myös verkon kautta, ja sillä on omat viiveongelmansa, mikä hyödyttäisi myös tiedostojen optimointia.) .

Jos haluat käyttää objektikauppaa tai sinulla on varaa vain objektikauppaan, vastaus on FUSE-tiedostojärjestelmä. (https://github.com/libfuse/libfuse) . GCP:ssä tätä kutsutaan gcsfuseksi, ja sen asennuksen vaiheet ovat:

Asenna gcsfuse GCP Linux -kuvaan:
Sudo Apt päivitys
Sudo apt asennus gcsfuse
• Todistaa GCP (Jos ei ole jo todennettu) :
Varmista, että sinulla on oikeat valtuudet, tyypillisesti palvelutilin kautta tai käyttämällä gcloud-auth-kirjautumista.
• • GCS:n vuori paikalliseen hakemistoon:
Asenna GCS-bucket paikalliseen hakemistoon käyttämällä gcsfusea. Tämä mahdollistaa GCP-osoitteesi pääsyn tietoihin ikään kuin se olisi osa paikallista tiedostojärjestelmää.
gcsfuse Your-bucket-nimi / Path / Mount / Mount / ohjaus

Ja nyt objektikauppaan voi tutustua niin kuin se on osa Linux-tiedostojärjestelmää, joten se toimii yhdessä. ERDDAP™ . Se on kuin taikuutta, joka saa molempien maailmojen parhaat puolet, täytyy olla saalis. Ja siellä on. FUSE-tiedostojärjestelmät ovat hieman hitaampia kuin objektikauppaan pääsy. (Olet lisännyt toisen kerroksen käyttöoikeuteen) . Tutkimuksessani arvioidaan, kuinka paljon hitaampia kartalla on, joten en tiedä kuinka paljon hitaampaa. Mutta jos olet tilanteessa, jossa sinun täytyy juosta GCP: llä objektikauppojen avulla, sinulla on ratkaisu, joka toimii tällä hetkellä. ERDDAP™ .

3. Mitä voit tehdä nyt auttaaksesi.
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

Jos sinulla on aikaa ja kykyä testata joitakin näistä asioista ja raportoida tuloksista, se olisi hyvä. Etenkin, jos sinulla on GCP tai vastaava ja katso kuinka paljon hitaampi ERDDAP™ Käyttö on FUSE (Voit testata tämän myös AWS:llä) . Jos nopeusrangaistus ei ole liian suuri, se olisi hienoa, koska minulla on syytä uskoa, että jotkut ihmiset joutuvat pian juoksemaan. ERDDAP™ GCP:llä objektikaupalla. Kyse ei ole vain teoreettisesta kiinnostuksesta.
