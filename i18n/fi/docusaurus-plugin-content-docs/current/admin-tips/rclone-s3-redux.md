Tämä sisältö perustuu a [Kirjoittanut Roy Mendelssohn ERDDAP Käyttäjäryhmä](https://groups.google.com/g/erddap/c/H-vJoGP42TI) .

Juokseminen ERDDAP™ Pilvestä on tullut kuuma aihe. Huomaa, että ERDDAP™ on aina toiminut pilvessä, vain suurimman osan ajasta ei kaupallisen pilvipalvelun tarjoamassa palvelimessa, ja suuri este juoksemiselle. ERDDAP™ kaupallisessa pilvipalveluntarjoajassa on käytössä S3-tallennus, joka ei salli normaalia Linux-lohkon käyttöä. Jos olet valmis maksamaan enemmän kaupallisen pilvipalveluntarjoajan tarjoamien lohkojen käyttömahdollisuuksien käyttämisestä kuin kaupallisen pilvipalvelimen käyttö on pohjimmiltaan sama kuin omien laitteiden käyttö, paitsi tietenkin kustannukset.

Olen sanonut, että 1. joulukuuta 2025 kirjoitin postauksen "Rclone ja S3" ja tämä on seuranta. Tässä sähköpostissa asensin GOES17-kylpyjä ja tarkistin tiedoston, mutta en ottanut sitä koko matkan. ERDDAP™ Huomaa, että kaikki toimii sujuvasti. Ja kyllä, voit kokeilla tätä kotona ja sinun ei tarvitse neuvotella asianajajan tai lääkärin kanssa. Tässä on NCDC OI sst avhrr v2.1, joka on AWS:ssä, asenna se ERDDAP™ Näytä tulokset.

- Vaihe 1: Määritä päätepiste rclone

rclone config luo oi sst s3 \\
Toimittaja AWS
Itä-Euroopan alue 1
Sijainti / Constraint us-east-1
_auth false \\
Anonyymi totuus


- Vaihe 2: Tietojen luominen

Sudo mkdir - p /mnt/oi sst 
Sudo-chown "$USER:$USER" / Mnt/oi sst 

- Vaihe 3: S3-tallennustila vuorelle

Luvat, luvat, luvat, luvat... (Anteeksi Steve Ballmerille, jos tiedät) ,

Vuori on tehtävä niin, että mitä tahansa käyttäjä käyttää tomcat, yleensä käyttäjä "tomcat" voi käyttää tietoja. "Rclone" asentaa tietoaineiston omistajan ja käyttäjäryhmän kanssa, joka suorittaa Mount-komennon ja haluaa tallentaa tietoja käyttäjän kotihakemistoon. (Tämä lievitetään, jos asennat tämän järjestelmätason prosessiksi - katso alla) . Joten jos voit, suorita Mount-komento ’tomcat’, mutta jos sinulla ei ole kotihakemistoa, sinun on suoritettava komento eri käyttäjänä. Tehdä niin, muokata sumua. CFF-tiedostot:

1. Sudo vi/etc/fuse.conf

2. Tuntematon tai lisätty:

käyttäjä_allow_other

3. Säästä ja poistu.


Todelliset tiedot ovat useita kerroksia syvä, ja olen asennossa tietotasolla, ei ylätasolla, ja suoritan komennon tmux-terminaalissa, joten komento jatkaa:

rclone - vvv-vuori sst :noaa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst \\ \\
Lukeminen vain \\
Allow-mother \\
-vfs-cache-mode täynnä
-vfs-cache-max-size 1G
Vvfs-cache-poll-interval 1 m \\
vfs-read-chunk-koko 64 m
-vfs-read-chunk-size-limit 1G
vfs-read-ahead 256 m
Buffer-size 64M
dir-cache-time 24h
-attr-timeout 1s
Ei-modtime


- Vaihe 4: GenerateDatasets Aivan kuten normaalisti,

Käytä EDDGrid FromNcFiles on datatyyppi ja hakemisto on /mnt/oi. sst / Alkuperä oli hyvä ja toimi ilman ongelmia. Tein kolme muutosta ksml-snippetiin, joka olisi voinut tapahtua GenerateDatasetsilla. XML ja ne olivat:

1. Muutetaan aineistoa OI sst _rclone

2. Hakemisto sisältää sekoituksen tiedostoja joitain päättyy " .nc "Muut päätyvät" .nc ”Vain entiset ovat haluttuja. Muuttaa tiedoston nimi regex:

 <fileNameRegex> Oi sst avhrr-v02r01, &#123;8&#125; .nc  </fileNameRegex> 

Olen usein sanonut, että pidän regexiä yhtenä elämän mysteeristä, ja voi olla parempia tapoja tehdä regexiä. Mutta tämä toimi

3. Joos_kategoriaa ei ole asetettu, lisäsin sen.

Pysyvää tuotantoa varten xml-snippet voi käyttää hieman enemmän editointia.

- Vaihe 5: Lisää xml-snippetti datasets.xml Aseta lippu

Tämä kestää kauan ladata ensimmäinen passi, joten muista tehdä lopun päivän.

Lopullinen tulos on:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

Huomaa, ettei se ollut liian tuskallista&#33;

Jos pelaat tuloksella, huomaa ensin, että rclone-asetukset ovat ensimmäinen arvaus, ja ne on testattava optimoimiseksi. Jonathan Sherman ryhmästämme on katsonut tätä ja saattaa puhua siitä IOOS DMAC -kokouksessa. Hän myös kattaa paljon enemmän aiheita, jotka liittyvät perustamiseen Google Cloud Platform, kuten miten orkestroida VM, perustaa S3 bucket on hierarkkinen nimi tila, joka on GCP on nopeampi ja vain hieman kalliimpi, ja jos suoritat käsikirjoituksia päivittää tietoja palvelin. ERDDAP™ Miten ne asetetaan. Jos tämä aihe kiinnostaa sinua, kehotan sinua kuuntelemaan hänen puhettaan. The ERDDAP™ on ylhäällä ja käynnissä, vain se ei ole käytettävissä tällä hetkellä ulkopuolella NMFS verkosto.

Toiseksi tämä ei ole AWS S3:n asennus, tämä on yksi palvelimistamme ja putkimme on täysin tyydytetty, joten odotat, että entinen asennus on nopeampi kuin mitä olen tehnyt. (Piippu ei ole kovin suuri – kiitos NMFS &#33; - mutta olemme aina tyytyväisiä - tietojen kysyntä on ollut ilmiömäistä.) .

Saatat ihmetellä - haluan rullata itseni, mistä aloitan tämän lisäksi? Olen löytänyt yhden asian, jossa LLM:t ovat hyviä, on tietoa, joka on hyvin tunnettu ja hyvin dokumentoitu, ja tekoäly, jonka olen tarkistanut. (Siellä on kaikki merkkini&#33;&#33;) Kaikki tuntevat rclone ja AWS ja GCP melko hyvin ja voivat tehdä suurimman osan asennuksesta. Itse asiassa etsin aineistoa, joka olisi hyvä demo, ja tekoäly antoi minulle useita ehdotuksia ja loi suurimman osan siitä, mikä on yllä, vaikka tein joitakin muokkauksia omalle asennukselleni.

Seth on kirjoittanut uuden S3:n nykyiseen versioon. (2.30) josta ERDDAP™ En ole vertaillut nopeuksia, ja kuvittelen riippuen siitä, mitä teet jokaisella on etunsa. siirtää olemassa olevan ERDDAP™ Asentaminen, rclone voi yksinkertaistaa prosessia.

-Roy

PS - Ja muista, että rclone toimii laajan valikoiman myyjiä, tämä ei rajoitu AWS ja vain joitakin muutoksia "rclone config" asetukset tarvitaan eri myyjä.


Tehdään järjestelmäpalvelu (Muutokset käyttäjän mukaan jne.) :
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

[Yhdessä]
Kuvaus: Rclone Mount NOAA Lähde: AWS
Lähde: Network-online .tar Get
Lähde: Network-online .tar Get

[Palvelu]
Tyyppi=ilmoitus
Käyttäjä = käyttäjä
Ryhmä = YourGroup

ExecStart=/käyttäjä/bin/rclone Mount sst :noaa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst \\ \\
Lukeminen vain \\
Allow-mother \\
dir-perms 0755
File-perms 0644
-vfs-cache-mode täynnä
-vfs-cache-max-size 1G
Vvfs-cache-poll-interval 1 m \\
vfs-read-chunk-koko 64 m
-vfs-read-chunk-size-limit 1G
vfs-read-ahead 256 m
Buffer-size 64M
dir-cache-time 24h
-attr-timeout 1s
Ei-modtime

ExecStop=Bin/fusermount Auz/mnt/oi sst 
Restart=on-failure
Restartsec = 10

[Asennus]
WantedBy=multi-käyttäjä .tar Get
