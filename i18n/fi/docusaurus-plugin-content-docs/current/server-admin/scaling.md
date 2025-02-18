---
title: "Scaling"
sidebar_position: 5
---
# Scaling
## ERDDAP™- raskaat vuodot, verkot, klusterit, liitot ja pilvipalvelut{#erddap---heavy-loads-grids-clusters-federations-and-cloud-computing} 
 

# ERDDAP:

[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html)on verkkosovellus ja verkkopalvelu, joka yhdistää tieteellisiä tietoja erilaisista paikallisista ja kaukolähteistä ja tarjoaa yksinkertaisen ja johdonmukaisen tavan ladata tietoja yhteisissä tiedostomuodoissa ja tehdä kaavioita ja karttoja. Tämä sivu käsittelee raskaita asioitaERDDAP™Käytä kuormia ja tutkii mahdollisuuksia käsitellä erittäin raskaita kuormia verkkojen, klusterien, liittojen ja pilvipalveluiden kautta.

Alkuperäinen versio on kirjoitettu kesäkuussa 2009. Merkittäviä muutoksia ei ole tapahtunut. Se päivitettiin viimeksi 2019-04-15.

## DISCLAIMER{#disclaimer} 

Tämän sivun sisältö on Bob Simonsin henkilökohtainen mielipide, eikä se välttämättä heijasta hallituksen tai sen asemaa.National Oceanic and Atmospheric Administration. Laskelmat ovat yksinkertaisia, mutta mielestäni johtopäätökset ovat oikein. Olenko käyttänyt virheellistä logiikkaa tai tehnyt virheen laskelmissani? Jos on, vika on yksin. Lähetä sähköposti korjauksellaerd dot data at noaa dot gov.
 

- -

## Raskaita paikkoja / Constraints{#heavy-loads--constraints} 

Raskaalla käytöllä, standaloneERDDAP™rajoitetaan (vähiten todennäköisesti) By:

### Lähde Bandwidth{#remote-source-bandwidth} 
1. etätietolähteen kaistanleveys - Jopa tehokkaalla yhteydellä (Esim. kauttaOPeNDAP) jos etätietolähteellä on erittäin korkea kaistanleveys Internet-yhteys,ERDDAP"Vastaukset rajoittuvat siihen, kuinka nopeastiERDDAP™Voit saada tietoja tietolähteestä. Ratkaisu on kopioida tietoaineistoaERDDAP"Vaikea matka, ehkä[EDDGridKopio](/docs/server-admin/datasets#eddgridcopy)tai tai[EdDTableCopy](/docs/server-admin/datasets#eddtablecopy).
     
### ERDDAPPalvelija Bandwidth{#erddaps-server-bandwidth} 
2. ElleiERDDAPpalvelimella on erittäin korkea kaistanleveys Internet-yhteys,ERDDAP"Vastaukset rajoittuvat siihen, kuinka nopeastiERDDAP™voi saada tietoja tietolähteistä ja kuinka nopeastiERDDAP™Tietoja voidaan palauttaa asiakkaille. Ainoa ratkaisu on nopeampi Internet-yhteys.
     
### Muisti{#memory} 
3. Jos pyyntöjä on useita,ERDDAP™voi poistaa muistin ja tilapäisesti kieltäytyä uusista pyynnöistä. (ERDDAP™On olemassa muutamia keinoja, joilla vältetään tämä ja minimoidaan seuraukset, jos näin tapahtuu.) Mitä suurempi muisti palvelimessa on, sitä parempi. 32-bittisessä palvelimessa 4+GB on todella hyvä, 2 GB on kunnossa, mutta sitä ei suositella. 64-bittisessä palvelimessa voit melkein välttää ongelman saamalla paljon muistia. Nähdään[\\-Xmx ja -Xms asetukset](/docs/server-admin/deploy-install)forERDDAPTomcat. YksiERDDAP™64-bittinen palvelin, jolla on 8 Gt muistia ja -Xmx 4000M on harvoin, jos koskaan, rajoittaa muistia.
     
### Ajaminen Bandwidth{#had-drive-bandwidth} 
4. Palvelimen kiintolevylle tallennettujen tietojen käyttö on huomattavasti nopeampaa kuin etätietojen käyttö. Niin, josERDDAP™Palvelimella on erittäin korkea kaistanleveys Internet-yhteys, on mahdollista, että datan käyttö kiintolevyllä on pullonkaula. Osittainen ratkaisu on käyttää nopeammin (10 000 RPM) magneettinen kiintolevy tai SSD (Jos on järkevää kustannusviisautta) . Toinen ratkaisu on tallentaa erilaisia aineistoja eri liikkeisiin, joten kumulatiivinen kiintolevy on paljon korkeampi.
     
### Liian monta tiedostoa kiinni{#too-many-files-cached} 
5. Liikaa tiedostoja a[Cash](/docs/server-admin/additional-information#cached-responses)Hakemisto -ERDDAP™tallentaa kaikki kuvat, mutta vain tallentaa tiedot tietyntyyppisiä tietopyyntöjä. Välimuistin hakemistossa on mahdollista saada suuri määrä tiedostoja tilapäisesti. Tämä hidastaa pyyntöjä nähdä, onko tiedosto kätkössä. (Todellakin&#33;) .&lt;Cash Minutes &gt; in[Asennus.xml](/docs/server-admin/deploy-install#setupxml)Voit määrittää, kuinka kauan tiedosto voi olla välimuistissa ennen kuin se poistetaan. Pienempi määrä minimoi ongelman.
     
### CPU{#cpu} 
6. Vain kaksi asiaa vie paljon aikaa:
    *   NetCDF4 jaHDF5 tukee nyt datan sisäistä puristusta. Masennus suuri puristusNetCDF4 /HDF5 tiedostoa voi kestää 10 tai enemmän sekuntia. (Se ei ole toteutuksen vika. Se on kompression luonne.) Joten useat samanaikaiset pyynnöt tietoaineistoille, joilla on pakattuihin tiedostoihin tallennettuja tietoja, voivat aiheuttaa vakavan rasituksen palvelimelle. Jos tämä on ongelma, ratkaisu on tallentaa suosittuja tietoaineistoja pakkaamattomissa tiedostoissa tai saada palvelin CPU: lla, jossa on enemmän ytimiä.
    * Tehdään kuvia (mukaan lukien kartat) Noin 0,2 - 1 sekunti per grafiikka. Jos grafiikoita on useita yhtäaikaisia pyyntöjä (WMSAsiakkaat tekevät usein 6 samanaikaista pyyntöä.) CPU-rajoituksia voi olla. Kun useat käyttäjät toimivatWMSAsiakkaat, tästä tulee ongelma.
         

- -

## Monipuolinen identtinenERDDAPLainatasapaino?{#multiple-identical-erddaps-with-load-balancing} 

Kysymys kuuluu usein: ”Raskaiden kuormien käsittelemiseksi voin asettaa useita identtisiäERDDAP"Tasapainoa?" Mielenkiintoinen kysymys, koska se tulee nopeasti ytimeen.ERDDAPsuunnittelua. Nopea vastaus on ”ei”. Tiedän, että tämä on pettymys, mutta on olemassa muutamia syitä ja syitä, miksi suunnittelin.ERDDAP™käyttää erilaista lähestymistapaa (LiittovaltioERDDAPs, kuvattu suurimmassa osassa tästä asiakirjasta) Tämä on mielestäni parempi ratkaisu.

Jotkut suorat syyt siihen, miksi et voi / ei pitäisi luoda useita identtisiäERDDAPs ovat:

* annettuERDDAP™lukee jokaisen tietotiedoston, kun se tulee ensin saataville, jotta voidaan löytää tiedoston tietoalueet. Se tallentaa nämä tiedot indeksitiedostoon. Kun käyttäjän tietopyyntö tulee,ERDDAP™käyttää tätä indeksiä selvittääkseen, mitä tiedostoja etsiä pyydettyjä tietoja. Jos olisi useita identtisiäERDDAPJokainen tekee tämän indeksoinnin, mikä on hukkaan heitettyä työtä. Alla kuvatulla liittovaltiojärjestelmällä indeksointi tehdään vain kerran, yhdelläERDDAPs.
* Joidenkin käyttäjäpyyntöjen osalta (E.G., for.nc.png, .pdf-tiedostot)  ERDDAP™Koko tiedosto on tehtävä ennen kuin vastaus voidaan lähettää. NiinpäERDDAP™Ota nämä tiedostot lyhyeksi aikaa. Jos identtinen pyyntö tulee (kuten usein, erityisesti kuvissa, joissa URL-osoite on upotettu sivulle) ,ERDDAP™Voit käyttää tätä tiedostoa uudelleen. Useiden identtistenERDDAPNäitä tiedostoja ei jaeta, joten jokainenERDDAP™olisi tarpeetonta ja tuhlattavaa.nc.png tai .pdf-tiedostot. Alla kuvatun liittovaltion järjestelmän avulla tiedostot tehdään vain kerran, yhdelläERDDAPja uudelleenkäytetty.
*   ERDDAP’tilausjärjestelmää ei ole perustettu jaettavaksi useanERDDAPs. Esimerkiksi, jos kuormansalpaaja lähettää käyttäjän yhteenERDDAP™Käyttäjän on tilattava tietoaineisto, sitten toinenERDDAPS ei ole tietoinen tästä tilauksesta. Myöhemmin, jos kuorman tasapainotin lähettää käyttäjän toiseenERDDAP™ja pyytää listan hänen tilauksistaan, toinenERDDAP™Sanotaan, ettei ole ketään (johtaa hänet / hän tehdä kaksinkertainen tilaus toiseen EREDDAP) . Alla kuvatun liittovaltion järjestelmän avulla tilausjärjestelmää käsittelee vain pääasiallinen, julkinen, komposiitti.ERDDAP.

Jokaisesta näistä ongelmista voin (suurella ponnistuksella) Insinööri ratkaisu (jakaa tietoja keskenäänERDDAPs) mutta mielestäni[Liittovaltio-of-ERDDAPLähestymistapa](#grids-clusters-and-federations)  (kuvattu suurimmassa osassa tästä asiakirjasta) on paljon parempi kokonaisratkaisu, osittain siksi, että se käsittelee muita ongelmia, jotka ovat identtisiä.ERDDAPs-a-load-tasapainon lähestymistapa ei edes ala puuttua, erityisesti hajautettu luonne tietolähteiden maailmassa.

On parempi hyväksyä se, että en ole suunnitellutERDDAP™Käytettävä useana identtisenäERDDAPS:llä on kuormatasapaino. Olen tietoisesti suunnitellutERDDAP™toimia hyvin liittovaltion sisälläERDDAPs, jolla on monia etuja. Erityisesti liittovaltioERDDAPs on täysin sopusoinnussa hajautetun ja hajautetun tietojärjestelmän kanssa, joka meillä on todellisessa maailmassa. (Ajattele eri IOOS-alueita tai eri rannikkoalueita tai NCEI:n eri osia tai 100 muuta datakeskusta.NOAANASA DAACs eli 1000 datakeskusta ympäri maailmaa) . Sen sijaan, että he kertovat kaikille maailman datakeskuksille, että heidän täytyy luopua ponnisteluistaan ja laittaa kaikki tietonsa keskitettyyn "data-järveen". (Vaikka se olisi mahdollista, se on kauhea ajatus monista syistä - katso eri analyysit osoittavat lukuisia etuja.[hajautetut järjestelmät](https://en.wikipedia.org/wiki/Decentralised_system)) ,ERDDAPSuunnittelu toimii maailman kanssa sellaisena kuin se on. Jokainen tietokeskus, joka tuottaa tietoja, voi jatkaa tietojen ylläpitoa, kuratointia ja palvella niiden tietoja. (kuin heidän pitäisi) ja kuitenkin,ERDDAP™Tiedot voivat olla myös välittömästi saatavilla keskitetystäERDDAPilman tarvetta siirtää tiedot keskitetylleERDDAP™tai tallentaa kaksoiskappaleita tiedoista. Tietyt tiedot voivat olla samanaikaisesti saatavilla.
YhdestäERDDAP™organisaatiossa, joka tuottaa ja tallentaa tietoja (Esimerkki: Gomos) ,
YhdestäERDDAP™Emoyhtiössä (Esimerkki: IOOS Central) ,
Kaikki-NOAA ERDDAP™,
USA:n liittovaltion hallitusERDDAP™,
MaailmanlaajuisestiERDDAP™  (GOOS) ,
erikoistuneitaERDDAPs (Esimerkki: AERDDAP™HAB-tutkimukselle omistettu laitos) ,
kaikki olennaisesti välittömästi ja tehokkaasti, koska vain metatiedot siirtyvätERDDAPs, ei tietoja. Parasta, alkuvaiheen jälkeenERDDAP™Alkuperäisessä organisaatiossa kaikki muutERDDAPS voidaan perustaa nopeasti (Muutama työtunti) minimaaliset resurssit (yksi palvelin, joka ei tarvitse RAIDia tietojen tallennukseen, koska se ei tallenna tietoja paikallisesti) ja siten minimaalisesti. Verrata sitä kustannuksiin keskitetyn datakeskuksen perustamisesta ja ylläpidosta datajärvellä ja todellisen massiivisen, todella kalliin Internet-yhteyden tarpeesta sekä keskitetyn datakeskuksen ongelmasta yhtenä epäonnistumispisteenä. minulle,ERDDAPHajautettu, liittovaltiollinen lähestymistapa on paljon parempi.

Tilanteissa, joissa tietokeskus tarvitsee useitaERDDAPvastaamaan korkeaan kysyntään,ERDDAP"suunnittelu pystyy täydellisesti vastaamaan tai ylittämään moni-identtisenERDDAPs-a-load-balancer lähestymistapa. Sinulla on aina mahdollisuus perustaa[Monipuolinen komposiittiERDDAPs (Kuten alla kerrotaan) ](#multiple-composite-erddaps)Jokainen saa kaikki tietonsa muistaERDDAPs, ilman kuormitusta. Tässä tapauksessa suosittelen, että teet pisteen jokaiselle komposiitille.ERDDAPeri nimi / identiteetti ja jos se on mahdollista eri puolilla maailmaa (Esimerkkejä eri AWS-alueista) esim.ERDa. . . .ERD&gt; &gt;ERD&gt; ,ERDFR,ERDKäyttäjät tietoisesti, toistuvasti, työskentelevät tietynERDDAPlisähyötyä, että olet poistanut riskin yhdestä epäonnistumispisteestä.
 

- -

## [ **Grids, Clusters ja Federations** ](#grids-clusters-and-federations) {#grids-clusters-and-federations} 

Erittäin raskaassa käytössä yksi erillinenERDDAP™Yhdessä tai useammassa[Rajoitukset](#heavy-loads--constraints)Edellä mainitut ratkaisut eivät riitä. tällaisissa tilanteissa,ERDDAP™on ominaisuuksia, jotka helpottavat skaalautuvien verkkojen rakentamista (Kutsutaan myös klustereita tai federaatioita) jostaERDDAPjotka mahdollistavat järjestelmän erittäin raskaan käytön (esimerkiksi suurelle datakeskukselle) .

Minä käytän[Verkko](https://en.wikipedia.org/wiki/Grid_computing)Yleinen termi kuvaamaan eräänlaista[Tietokoneen klusteri](https://en.wikipedia.org/wiki/Computer_cluster)jos kaikki osat voivat tai eivät ole fyysisesti sijoittautuneet yhteen laitokseen, ja niitä voidaan tai ei saa antaa keskitetysti. Yhteisomisteisten, keskitetysti omistettujen ja hallinnoitujen verkkojen etu (Klusterit) He hyötyvät mittakaavaetuista (Erityisesti ihmisen työmäärä) Yksinkertaistaa järjestelmän osien toimivuutta yhdessä. Ei-yhteissijaisten verkkojen, ei-keskeisesti omistamien ja hallinnoitujen (Liittoja) He jakavat ihmisen työmäärän ja kustannukset, ja voivat antaa lisävikoja suvaitsevaisuutta. Ratkaisu, jota ehdotan alla, toimii hyvin kaikkiin verkko-, klusteri- ja liittovaltion topografioihin.

Skaalattavan järjestelmän suunnittelun perusajatuksena on tunnistaa mahdolliset pullonkaulat ja suunnitella järjestelmä siten, että järjestelmän osat voidaan toistaa tarpeen mukaan pullonkaulojen lievittämiseksi. Ihannetapauksessa jokainen kopioitu osa lisää järjestelmän osan kapasiteettia lineaarisesti. (Skaalauksen tehokkuus) . Järjestelmä ei ole skaalautuva, ellei jokaiselle pullonkaulalle ole skaalautuvaa ratkaisua.[skaalautuvuus](https://en.wikipedia.org/wiki/Scalability)Erilainen kuin tehokkuus (Kuinka nopeasti tehtävä voidaan tehdä – osien tehokkuus) . Skaalattavuus mahdollistaa sen, että järjestelmä pystyy vastaamaan kysyntään. **Tehokkuus**   (skaalaus ja osat) Määrittää, kuinka monta palvelinta tarvitaan tietyn kysynnän saavuttamiseksi. Tehokkuus on tärkeää, mutta sillä on aina rajansa. skaalautuvuus on ainoa käytännöllinen ratkaisu järjestelmän rakentamiseen, joka pystyy **erittäin** raskasta käyttöä. Ihannetapauksessa järjestelmä on skaalautuva ja tehokas.

### Tavoitteet{#goals} 
Tämän suunnittelun tavoitteet ovat:

* skaalautuvaa arkkitehtuuria (se, joka on helposti laajeneva, kopioimalla minkä tahansa osan, josta tulee ylikuormitettu.) . Tehokas järjestelmä, joka maksimoi käytettävissä olevien laskentaresurssien tietojen saatavuuden ja tuloksen. (Kustannukset ovat lähes aina ongelma.) 
* Järjestelmän osien ominaisuuksien tasapainottaminen siten, ettei yksi osa järjestelmästä ylitä toista osaa.
* Tehdä yksinkertainen arkkitehtuuri niin, että järjestelmä on helppo asentaa ja hallinnoida.
* Tehdä arkkitehtuuri, joka toimii hyvin kaikkien topografioiden kanssa.
* Tehdä järjestelmä, joka epäonnistuu armollisesti ja rajoitetusti, jos jokin osa on ylikuormitettu. (Suurien tietoaineistojen kopioimiseen tarvittava aika rajoittaa aina järjestelmän kykyä käsitellä tiettyjen tietoaineistojen kysyntää äkillisesti.) 
*    (jos mahdollista) tehdä arkkitehtuuri, joka ei ole sidottu mihinkään tiettyyn[Pilvitietokone](#cloud-computing)Palvelu tai muut ulkoiset palvelut (Koska se ei tarvitse niitä) .

### Suositukset{#recommendations} 
Suosituksemme ovat
![Verkko/klusterikaavi](/img/cluster.png)

* Suosittelen perustamaan komposiitin.ERDDAP™  ( **D** Kaaviossa) joka on säännöllinenERDDAP™Paitsi, että se vain palvelee muita tietoja.ERDDAPs. Verkon arkkitehtuuri on suunniteltu muuttamaan mahdollisimman paljon työtä. (CPU:n käyttö, muistin käyttö, kaistanleveys) KomposiitistaERDDAP™toiseenERDDAPs.
*   ERDDAP™sisältää kaksi erilaista tietotyyppiä,[EDDGridLähde: Eddap](/docs/server-admin/datasets#eddfromerddap)ja[EdDTableFromDap](/docs/server-admin/datasets#eddfromerddap)joka viittaa
Tietoja muistaERDDAPs.
* Kun komposiittiERDDAP™vastaanottaa tietojen tai kuvien pyynnön näistä tietoaineistoista, komposiittiERDDAP™ [Ohjaus](https://en.wikipedia.org/wiki/URL_redirection)Tietopyyntö toiselleERDDAP™palvelin. Lopputulos on:
    * Tämä on erittäin tehokasta (CPU, muisti ja kaistanleveys) koska muuten
        1. KomposiittiERDDAP™Tietopyyntö on lähetettävä toiseenERDDAP.
        2. ToinenERDDAP™on saatava tiedot, uudistettava ne ja siirrettävä tiedot komposiitille.ERDDAP.
        3. KomposiittiERDDAP™Tietojen on saatava (Ylimääräinen kaistanleveys) uudistaa sitä (Käytä ylimääräistä CPU-aikaa ja muistia) ja siirtää tiedot käyttäjälle (Ylimääräinen kaistanleveys) . Ohjaamalla pyyntöä ja sallimalla toisenERDDAP™lähettää vastauksen suoraan käyttäjälle, komposiitilleERDDAP™Käyttää pohjimmiltaan CPU-aikaa, muistia tai kaistanleveyttä tietopyyntöihin.
    * Uudelleenohjaus on käyttäjälle läpinäkyvä asiakasohjelmistosta riippumatta. (selain tai jokin muu ohjelmisto tai komentorivityökalu) .

### Hyvät osat{#grid-parts} 
[Verkon osat ovat:](#grid-parts)

 **A** : jokaisesta etätietolähteestä, jolla on korkea kaistanleveysOPeNDAPVoit muodostaa yhteyden suoraan etäpalvelimeen. Jos etäpalvelin onERDDAP™käyttääEDDGridFromErddap tai EDDTableFromERDDAPTietojen toimittaminen komposiitissaERDDAP. Jos etäpalvelin on jonkinlainenDAPpalvelin, esim. kolme,Hyraxtai GrADS, käytäEDDGridFromDap.

 **B** : JokaiselleERDDAPKäytettävissä oleva tietolähde (tietolähde, jostaERDDAPVoi lukea dataa) jolla on korkea kaistanleveys, toinenERDDAP™verkkoon, joka vastaa tietojen toimittamisesta tältä tietolähteeltä.

* Jos useita tällaisiaERDDAPs ei saa paljon pyyntöjä tietoja, voit yhdistää ne yhteen.ERDDAP.
* JosERDDAP™Omistettu saada tietoja yhdestä kaukolähteestä on saada liikaa pyyntöjä, on kiusaus lisätä lisääERDDAPkäyttää etätietolähdettä. Erityistapauksissa tämä voi olla järkevää, mutta on todennäköisempää, että tämä ylittää etätietolähteen. (joka on itsetuhoinen) myös estää muita käyttäjiä pääsemästä etätietolähteeseen (Mikä ei ole kivaa) . Tässä tapauksessa harkitse toisen perustamistaERDDAP™palvella tätä yhtä tietoaineistoa ja kopioida tietoaineistoa siitäERDDAP"Vaikea ajaminen (Katso nähkää **C** ) Ehkä, ehkä[EDDGridKopio](/docs/server-admin/datasets#eddgridcopy)ja/tai[EdDTableCopy](/docs/server-admin/datasets#eddtablecopy).
*    **B** Palvelimien on oltava julkisesti saatavilla.

 **C** : JokaiselleERDDAP- käytettävissä oleva tietolähde, jolla on alhainen kaistanleveyspalvelin (Hidas palvelu muista syistä) Harkitse toisen perustamistaERDDAP™ja tallentaa jäljennöksen tästäERDDAP"Vaikeita ajoja, ehkä[EDDGridKopio](/docs/server-admin/datasets#eddgridcopy)ja/tai[EdDTableCopy](/docs/server-admin/datasets#eddtablecopy). Jos useita tällaisiaERDDAPs ei saa paljon pyyntöjä tietoja, voit yhdistää ne yhteen.ERDDAP.
 **C** Palvelimien on oltava julkisesti saatavilla.

#### KomposiittiERDDAP {#composite-erddap} 
 **D** : KomposiittiERDDAP™on säännöllinenERDDAP™Paitsi, että se vain palvelee muita tietoja.ERDDAPs.

* Koska komposiittiERDDAP™sisältää muistiinpanoja kaikista tietoaineistoista, se voi nopeasti vastata tietoaineistoluetteloiden pyyntöihin. (täydellinen tekstihaku, kategoriahaku, kaikkien tietoaineistojen luettelo) , ja pyynnöt yksittäisen tietoaineiston tiedonsaantimuodosta, tehdä Graph-lomake taiWMSInfosivu. Nämä ovat kaikki pieniä, dynaamisesti tuotettuja, HTML-sivuja, jotka perustuvat muistiin tallennettuihin tietoihin. Vastaukset ovat erittäin nopeita.
* Koska todellisia tietoja koskevat pyynnöt ohjataan nopeasti toiseen.ERDDAPS, komposiittiERDDAP™voi nopeasti vastata todellisiin tietopyyntöihin käyttämättä mitään CPU-aikaa, muistia tai kaistanleveyttä.
* siirtämällä mahdollisimman paljon työtä (CPU, muisti, kaistanleveys) KomposiitistaERDDAP™toiseenERDDAPS, komposiittiERDDAP™voi näyttää palvelevan tietoja kaikista tietokannoista ja silti pysyä hyvin suuri määrä tietopyyntöjä useilta käyttäjiltä.
* Alustavat testit osoittavat, että komposiittiERDDAP™Voit vastata useimpiin pyyntöihin ~1ms CPU-aikaa tai 1000 pyyntöä/toinen. Kahdeksan prosessorin pitäisi pystyä vastaamaan noin 8000 pyyntöön. Vaikka on mahdollista kuvitella korkeamman toiminnan purkauksia, jotka aiheuttavat hidastumista, se on paljon läpimenoa. On todennäköistä, että kaistanleveys on pullonkaula pitkään ennen komposiittia.ERDDAP™Siitä tulee pullonkaula.
##### Päivitetty max (Aika-aika) ??{#up-to-date-maxtime} 
TheEDDGridTableFromErddap komposiitissaERDDAP™muuttaa tallennettuja tietojaan vain, kun lähdeaineisto on["reload"](/docs/server-admin/datasets#reloadeverynminutes)Muutama metatieto muuttuu (mm. aikamuuttujatactual\\_range) Näin luodaan tilausilmoitus. Jos lähdeaineistossa on tietoja, jotka muuttuvat usein (Uusia tietoja joka sekunti) ja käyttää["päivitetty"](/docs/server-admin/datasets#updateeverynmillis)järjestelmä, joka havaitsee usein taustalla olevia tietoja,EDDGrid/TableFromErddap ei ilmoita näistä usein tehdyistä muutoksista, kunnes seuraava aineisto "lataa"EDDGridTableFromErddap ei ole täysin ajan tasalla. Voit minimoida ongelman muuttamalla lähdeaineistoa.&lt;Reload EveryNMinutes &gt; pienempään arvoon (50?) niin, että tilausilmoituksia on lisättäväEDDGrid/TableFromErddap päivittää tietojaan lähdeaineistosta.

Jos tietojärjestelmäsi tietää, milloin lähdeaineistossa on uusia tietoja (esimerkiksi käsikirjoituksen kautta, joka kopioi datatiedoston) Jos se ei ole liian usein (joka viides minuutti tai harvemmin) On olemassa parempi ratkaisu:

1. Älä käytä&lt;päivittää EveryNMillis&gt; pitää lähdetiedot ajan tasalla.
2. Aseta lähdeaineisto&lt;Reload "EveryNMinutes &gt; suurempaan määrään" (1440?) .
3. Ota yhteyttä lähdeaineistoon[Lippu URL](/docs/server-admin/additional-information#set-dataset-flag)heti, kun se kopioi uuden datatiedoston.
Tämä johtaa siihen, että lähdeaineisto on täysin ajan tasalla ja saa sen luomaan tilausilmoituksen, joka lähetetäänEDDGridTableFromErddap-tietokanta. Tämä johtaaEDDGrid/TableFromErddap-tietokanta on täysin ajan tasalla (5 sekunnin kuluessa uusien tietojen lisäämisestä) . Kaikki, mitä tehdään tehokkaasti (Ilman tarpeetonta tiedonsiirtoa) .

#### Monipuolinen komposiittiERDDAPs{#multiple-composite-erddaps} 
* Erittäin äärimmäisissä tapauksissa tai vikatoleranssin vuoksi haluat ehkä perustaa useamman kuin yhden komposiitin.ERDDAP. On todennäköistä, että järjestelmän muut osat (Tietokeskuksen kaistanleveys) Tulee ongelmia jo kauan ennen komposiittia.ERDDAP™Siitä tulee pullonkaula. Ratkaisu on todennäköisesti perustaa lisää, maantieteellisesti monipuolisia, datakeskuksia. (Peilejä) Jokaisella on yksi komposiittiERDDAP™palvelimet, joilla onERDDAPS ja (vähintään) peilikopiot tiedoista, jotka ovat erittäin kysyttyjä. Tällainen asennus tarjoaa myös vikatoleranssin ja tietojen varmuuskopioinnin. (kopioinnin kautta) . Tässä tapauksessa on parempi, jos komposiittiERDDAPHeillä on erilaisia URL-osoitteita.
    
Jos todella haluat koko komposiitinERDDAPkäyttää etupään järjestelmää, joka määrittää tietyn käyttäjän vain yhteen komposiitistaERDDAPs (IP-osoitteen perusteella) jotta kaikki käyttäjän pyynnöt menevät vain yhteen komposiitistaERDDAPs. On kaksi syytä:
    
    * Kun taustalla oleva tietoaineisto ladataan uudelleen ja metatiedot muuttuvat (esim. uusi tietotiedosto verkkotietoaineistossa aiheuttaa aikamuuttujanactual\\_rangeMuutosta) KomposiittiERDDAPS on tilapäisesti hieman synkronoitu, mutta[Mahdollista johdonmukaisuutta](https://en.wikipedia.org/wiki/Eventual_consistency). Normaalisti se kytkeytyy uudelleen viiden sekunnin kuluessa, mutta joskus se on pidempi. Jos käyttäjä tekee automaattisen järjestelmän, joka perustuu[ERDDAP™allekirjoitukset](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions/index.html)Lyhyet synkronismiongelmat tulevat merkittäviksi.
    * 2+ komposiittiERDDAPJokainen säilyttää omat tilauksensa (edellä kuvattu synkronointiongelma) .
    
Käyttäjän tulisi ohjata vain yhteen komposiitista.ERDDAPNäiden ongelmien välttämiseksi. Jos yksi komposiittiERDDAPEtupään järjestelmä voi ohjataERDDAPKäyttäjät toiseenERDDAP™Se on ylös. Jos kyseessä on kapasiteettiongelma, joka aiheuttaa ensimmäisen komposiitin.ERDDAP™epäonnistua (Liiallinen käyttäjä? A[Palvelun hyökkäys](https://en.wikipedia.org/wiki/Denial-of-service_attack)??) Tämä mahdollistaa sen, että käyttäjät ohjataan toiseen komposiittiin.ERDDAPS aiheuttaa[Epäonnistuminen](https://en.wikipedia.org/wiki/Cascading_failure). Kaikkein vahvin asennus on komposiitti.ERDDAPeri URL-osoitteita.
    
Tai ehkä parempi, perustaa monikomposiittiERDDAPilman kuormitusta. Tässä tapauksessa sinun pitäisi antaa jokaiselleERDDAPeri nimi / identiteetti ja jos se on mahdollista eri puolilla maailmaa (Esimerkkejä eri AWS-alueista) esim.ERDa. . . .ERD&gt; &gt;ERD&gt; ,ERDFR,ERDKäyttäjät tietoisesti toimivat toistuvasti tietynERDDAP.
    
*   \\[Yhdellä palvelimella toimivan korkean suorituskyvyn järjestelmän kiehtova suunnittelu, katso tämä[Kuvaus Mailinatorista](https://mailinator.blogspot.com/2007/01/architecture-of-mailinator.html).\\]

### Tietoja erittäin korkeasta kysynnästä{#datasets-in-very-high-demand} 
Epätavallisessa tapauksessa yksi **A** , **B** tai **C**  ERDDAPs ei voi vastata pyyntöihin kaistanleveyden tai kiintolevyn rajoitusten vuoksi, on järkevää kopioida tietoja. (jälleen jälleen jälleen) Lisää palvelinta + Hard Ajo+ERDDAPEhkä, ehkä[EDDGridKopio](/docs/server-admin/datasets#eddgridcopy)ja/tai[EdDTableCopy](/docs/server-admin/datasets#eddtablecopy). Vaikka saattaa tuntua ihanteelliselta saada alkuperäinen tietoaineisto ja kopioitu tietoaineisto näyttävät saumattomasti yhtenä tietoaineistona komposiitissa.ERDDAP™Tämä on vaikeaa, koska nämä kaksi aineistoa ovat hieman eri maissa eri aikoina. (erityisesti sen jälkeen, kun alkuperäinen saa uusia tietoja, mutta ennen kuin kopioitu tietoaineisto saa kopion.) . Suosittelen, että aineistot annetaan hieman eri otsikoissa. (esim. "... (Kopio #1) &gt; ja &gt; (Kopio #2) Tai ehkä " (Peili # *n* ) Tai " (Palvelin # *n* ) """) ja näkyvät erillisinä tietoaineistoina komposiitissaERDDAP. Käyttäjät ovat tottuneet näkemään luetteloita[Peilisivustot](https://en.wikipedia.org/wiki/Website#mirror_site)Suosittujen tiedostojen lataaminen, joten tämän ei pitäisi yllättää tai pettyä. Koska kaistanleveys rajoitukset tietyllä sivustolla, voi olla järkevää, että peili sijaitsee toisella sivustolla. Jos peilikopio on eri datakeskuksessa, siihen pääsee vain kyseisen datakeskuksen komposiitti.ERDDAP™Eri otsikot (Esim. ”peili” #1) Ei ole välttämätöntä.

### RAIDs vs. säännölliset kovat ajot{#raids-versus-regular-hard-drives} 
Jos suurta tietoaineistoa tai tietoaineistoryhmää ei käytetä raskaasti, saattaa olla järkevää tallentaa tietoja RAIDiin, koska se tarjoaa vikatoleranssia ja koska et tarvitse toisen palvelimen käsittelyvirtaa tai kaistanleveyttä. Mutta jos aineistoa käytetään voimakkaasti, voi olla järkevämpää kopioida tietoja toisella palvelimella.ERDDAP™+ kiintolevy (Samanlainen kuin[Mitä Google tekee](https://storagemojo.com/2007/02/19/googles-disk-failure-experience/)) Sen sijaan, että käyttäisit yhtä palvelinta ja RAIDia tallentaaksesi useita tietoaineistoja, koska voit käyttää sekä palvelinta + HardDrive+.ERDDAPVerkossa, kunnes toinen epäonnistuu.

### Epäonnistuminen{#failures} 
Mitä tapahtuu, jos...

* Yhden tietoaineiston pyyntöjä on runsaasti (mm. kaikki oppilaat samaan aikaan pyytävät samanlaisia tietoja.) ??
VainERDDAP™Näiden tietojen käyttö on ylikuormitettua ja hidasta tai kieltäytyy pyynnöistä. KomposiittiERDDAP™ja muutERDDAPs ei vaikuta. Koska rajoittava tekijä tietyn tietoaineiston järjestelmässä on kiintolevy datan kanssa. (Ei ei eiERDDAP) Ainoa ratkaisu (Ei välitöntä) Tehdään kopio tietoaineistosta eri palvelimella +hardDrive+ERDDAP.
* Yksi **A** , **B** tai **C**  ERDDAP™epäonnistuminen (Esimerkki: Hard Drive Epäonnistuminen) ??
Vain tietoaineisto (s) Palvelemme sitäERDDAP™kärsivät. Jos aineisto (s) Käytössä on toinen palvelin+hardDrive+ERDDAPVaikutus on minimaalinen. Jos ongelma on kiintolevyn epäonnistuminen tasolla 5 tai 6 RAID, vaihdat vain aseman ja RAID rakentaa tiedot uudelleen.
* KomposiittiERDDAP™Epäonnistunut?
Jos haluat tehdä järjestelmän, jossa on erittäin[Korkea saatavuus](https://en.wikipedia.org/wiki/High_availability)Voit perustaa[Monipuolinen komposiittiERDDAPs (Kuten edellä mainittiin) ](#multiple-composite-erddaps)käyttää jotain, kuten[Yhdessä](https://www.nginx.com/)tai tai[Traefik](https://traefik.io/)kuorman tasapainottamiseen. Huomaa, että tietty komposiittiERDDAP™voi käsitellä paljon pyyntöjä useilta käyttäjiltä, koska
Metadataa koskevat pyynnöt ovat pieniä ja niitä käsitellään muistissa olevilla tiedoilla.
Tietopyynnöt (joka voi olla suuri) ohjataan lapselle uudelleenERDDAPs.

### yksinkertainen, skaalautuva{#simple-scalable} 
Järjestelmä on helppo asentaa ja hallinnoida, ja se on helposti laajennettava, kun mikä tahansa osa siitä on ylikuormitettu. Ainoa todellinen rajoitukset tietylle datakeskukselle ovat datakeskuksen kaistanleveys ja järjestelmän kustannukset.

### Bandwid{#bandwidth} 
Huomaa järjestelmän yleisesti käytettyjen komponenttien kaistanleveys:

|Komponentti|Lähellä Bandwidth (GBytes/s)  |
|------|------|
|DDR-muisti|2.5|
|SSD-asema|1 1|
|SATA kovalla ajalla|0,3|
|Gigabit Ethernet|0,1|
|OC-12|0,06|
|OC-3|0,015|
|T1|0 0002|

  
Yksi SATA-kiintolevy (0,3 GB/s) Yhdellä palvelimella yhdelläERDDAP™Voiko Gigabit Ethernet LAN (0,1 GB/s) . Gigabit Ethernet LAN (0,1 GB/s) OC-12 Internet-yhteys (0,06GB/s) . Vähintään yksi lähde listaa OC-12-linjat, jotka maksavat noin 100 000 dollaria kuukaudessa. (Kyllä, nämä laskelmat perustuvat järjestelmän työntämiseen sen rajoihin, mikä ei ole hyvä, koska se johtaa hyvin hidas vaste. Nämä laskelmat ovat hyödyllisiä järjestelmän osien suunnittelussa ja tasapainottamisessa.)   **Tietenkin nopea Internet-yhteys datakeskuksellesi on järjestelmän kallein osa.** Voit helposti ja suhteellisen halvalla rakentaa verkkoa, jossa on kymmeniä palvelimia.ERDDAPs, joka pystyy pumppaamaan paljon dataa nopeasti, mutta sopivan nopea Internet-yhteys on erittäin, erittäin kallista. Osittainen ratkaisu on:

* Kannusta asiakkaita pyytämään tietojen alijoukkoja, jos se on kaikki mitä tarvitaan. Jos asiakas tarvitsee tietoja vain pienelle alueelle tai pienemmälle resoluutiolle, niin hän pyytää. Alihankinta on protokollien keskipisteERDDAP™tukee tietojen pyytämistä.
* Kannusta siirtämään pakattuja tietoja.ERDDAP™ [Pakkaukset](https://coastwatch.pfeg.noaa.gov/erddap/information.html#compression)tietojen siirto, jos se löytää "hyväksyntäkoodin"HTTP GETPyydä otsikkoa. Kaikki selaimet käyttävät "hyväksyntäkoodia" ja poistavat automaattisesti vasteen. Muut asiakkaat (mm. tietokoneohjelmat) Sitä on käytettävä nimenomaisesti.
* Yhdistä palvelimet ISP: ssä tai muulla sivustolla, joka tarjoaa suhteellisen halvempia kaistanleveyskustannuksia.
* Erota palvelimet palvelimillaERDDAPeri toimielimille, jotta kustannukset jakautuvat. Voit linkittää komposiitinERDDAP™heidänERDDAPs.

Huomaa, että[Pilvitietokone](#cloud-computing)Verkkohotellipalvelut tarjoavat kaiken tarvitsemasi kaistanleveyden, mutta älä ratkaise hintaongelmaa.

Yleistä tietoa skaalautuvan, korkean kapasiteetin, vika-sielujärjestelmien suunnittelusta, katso Michael T. Nygardin kirja.[Vapauta se](https://www.amazon.com/Release-Production-Ready-Software-Pragmatic-Programmers/dp/0978739213).

### Kuten Legos{#like-legos} 
Ohjelmistosuunnittelijat yrittävät usein käyttää hyvää[Ohjelmiston suunnittelumallit](https://en.wikipedia.org/wiki/Software_design_pattern)ongelmien ratkaisemiseksi. Hyvät mallit ovat hyviä, koska ne luovat hyviä, helppoja luoda ja työskennellä, yleiskäyttöisiä ratkaisuja, jotka johtavat järjestelmiin, joilla on hyvät ominaisuudet. Pattern-nimet eivät ole standardoituja, joten kutsun niitä kuvioiksi.ERDDAP™Käytä Lego Patternia. Jokainen Lego (Jokainen jokainenERDDAP) Yksinkertainen, pieni, standardi, stand-alone, tiili (Tietopalvelin) määritellyllä käyttöliittymällä, jonka avulla se voidaan liittää muihin lainoihin (ERDDAPs) . osienERDDAP™Tämän järjestelmän muodostavat: tilaus- ja lippulaitejärjestelmät (joka mahdollistaa yhteydenpidonERDDAPs) Edd... FromErddapin uudelleenohjausjärjestelmä jaRESTfultiedot, jotka käyttäjät tai muut voivat tuottaaERDDAPs. Kaksi tai useampia legoja (ERDDAPs) Voit luoda valtavan määrän erilaisia muotoja (Verkon topologitERDDAPs) . Suunnittelu ja ominaisuudetERDDAP™Olisi voinut tehdä eri tavalla, ei Lego-kuin vain mahdollistaa ja optimoida yksi tietty topologia. Me tunnemme, ettäERDDAPLego-mainen design tarjoaa hyvän, yleiskäyttöisen ratkaisun, joka mahdollistaa kaiken.ERDDAP™Hallinnollinen (tai järjestelmänvalvojien ryhmä) Kaikenlaisia liittovaltion topologioita. Yksi organisaatio voi perustaa kolme (tai enemmän)  ERDDAPkuten on esitetty[ERDDAP™Grid/Cluster Diagram yllä](#recommendations). Jaettu ryhmä (IOOS? CoastWatch? NCEI? NWS?NOAA?? USGS? Dataa? Ei kukaan? Lter? Oi? BODC? ONC? JRC? WMO?) voi perustaa yhdenERDDAP™Jokaisessa pienessä pöydässä (Tiedot voivat pysyä lähellä lähdettä) Sen jälkeen rakennetaan komposiittiERDDAP™keskustoimistossa virtuaalisten tietoaineistojen kanssa (jotka ovat aina ajan tasalla) Jokaisesta pienestä pöydästäERDDAPs. Itse asiassa kaikkiERDDAPs, joka on asennettu erilaisiin laitoksiin ympäri maailmaa, jotka saavat tietoja muistaERDDAPs ja/tai antaa tietoja muilleERDDAPmuodostaa jättimäinen verkostoERDDAPs. Kuinka hienoa se on?&#33; Kuten Legonkin kohdalla, mahdollisuudet ovat loputtomat. Siksi tämä on hyvä malli. Siksi tämä on hyvä designERDDAP.

### Erilaisia pyyntöjä{#different-types-of-requests} 
Yksi tämän keskustelun todellisista komplikaatioista palvelimen topologioista on, että on olemassa erilaisia pyyntöjä ja erilaisia tapoja optimoida erilaisia pyyntöjä. Tämä on enimmäkseen erillinen ongelma. (Kuinka nopeasti voiERDDAP™Vastaavatko tiedot tietopyyntöön?) Topologian keskustelu (jotka käsittelevät palvelinten välisiä suhteita ja joilla palvelimella on todelliset tiedot) .ERDDAP™Tietenkin, yrittää käsitellä kaikenlaisia pyyntöjä tehokkaasti, mutta käsittelee joitakin parempia kuin toiset.

* Monet pyynnöt ovat yksinkertaisia.
Esimerkiksi: Mikä on metatieto tälle aineistolle? Tai: Mitkä ovat tämän verkkoaineiston aikamitan arvot?ERDDAP™on suunniteltu toimimaan mahdollisimman nopeasti (yleensä&lt;= 2 ms) tallentamalla nämä tiedot muistiin.
     
* Jotkut pyynnöt ovat kohtalaisen vaikeita.
Esimerkiksi: Antakaa minulle tämä tietoaineiston osa (Mikä on One Data tiedosto) . Pyyntöjä voidaan käsitellä suhteellisen nopeasti, koska ne eivät ole niin vaikeita.
     
* Jotkin pyynnöt ovat hankalia, joten aikaa kulutetaan.
Esimerkiksi: Antakaa minulle tämä tietoaineiston osa (joka voi olla jossakin 10 000+ datatiedostosta, tai se voi olla pakattujen tiedostojen pohjalta, jotka kukin vievät 10 sekuntia masennuksen poistamiseen.) .ERDDAP™v2.0 on ottanut käyttöön joitakin uusia, nopeampia tapoja käsitellä näitä pyyntöjä erityisesti sallimalla pyynnönkäsittelyn kierros useiden pyynnön eri osa-alueita käsittelevien työntekijöiden lankoja. On kuitenkin olemassa toinen lähestymistapa tähän ongelmaan, jokaERDDAP™ei vielä tue: Tietyn tietoaineiston datatiedostojen osajoukot voidaan tallentaa ja analysoida erillisillä tietokoneilla ja sitten tulokset yhdistettynä alkuperäiseen palvelimeen. Tätä lähestymistapaa kutsutaan[Kartta vähentää](https://en.wikipedia.org/wiki/MapReduce)ja on esimerkillinen[Hadoop](https://en.wikipedia.org/wiki/Apache_Hadoop)Ensimmäinen (??) avoimen lähdekoodin MapReduce-ohjelma, joka perustuu Google-paperin ideoihin. (Jos tarvitset karttojaERDDAPLähetä sähköpostipyyntöerd.data at noaa.gov.) Googlen[BigQue](https://cloud.google.com/bigquery/)on mielenkiintoinen, koska se näyttää olevan MapReducen toteutus, jota käytetään tabulaaristen tietoaineistojen alisijoittamiseen, mikä on yksi niistä.ERDDAPtärkeimmät tavoitteet. On todennäköistä, että voit luodaERDDAP™tietoja BigQuery-tietokannasta[EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)BigQuery on saatavilla JDBC-liitännällä.

### Nämä ovat mielipiteitäni.{#these-are-my-opinions} 

Laskelmat ovat yksinkertaisia (Ja nyt hieman päivätty) Mutta mielestäni johtopäätökset ovat oikein. Olenko käyttänyt virheellistä logiikkaa tai tehnyt virheen laskelmissani? Jos on, vika on yksin. Lähetä sähköposti korjauksellaerd dot data at noaa dot gov.

- -

## [ **Pilvitietokone** ](#cloud-computing) {#cloud-computing} 

Useat yritykset tarjoavat pilvipalveluita (esim.[Amazonin verkkopalvelut](https://aws.amazon.com/)ja[Google Cloud Platform](https://cloud.google.com/)) .[Web hosting yritykset](https://en.wikipedia.org/wiki/Web_hosting_service)1990-luvun puolivälistä lähtien on tarjottu yksinkertaisempia palveluja, mutta pilvipalvelut ovat laajentaneet huomattavasti tarjottujen järjestelmien joustavuutta. KoskaERDDAP™Verkko koostuu vainERDDAPS ja siitä lähtienERDDAPs ovatJavaWeb-sovellukset, joita voi käyttää Tomcatissa (Yleisin sovelluspalvelin) tai muita sovelluspalvelimia on helppo määrittääERDDAP™Verkko pilvipalvelussa tai web hosting-sivustossa. Näiden palveluiden edut ovat:

* Ne tarjoavat pääsyn erittäin korkean kaistanleveyden Internet-yhteyksiin. Pelkästään tämä voi oikeuttaa näiden palvelujen käytön.
* Ne maksavat vain käyttämistäsi palveluista. Saat esimerkiksi erittäin korkean kaistanleveyden Internet-yhteyden, mutta maksat vain siirretyistä tiedoista. Sen avulla voit rakentaa järjestelmän, joka harvoin ylittyy. (Jopa huippukysynnässä) Ei tarvitse maksaa kapasiteettia, jota käytetään harvoin.
* Ne ovat helposti laajenevia. Voit muuttaa palvelintyyppejä tai lisätä niin monta palvelinta kuin haluat, alle minuutissa. Pelkästään tämä voi oikeuttaa näiden palvelujen käytön.
* Ne vapauttavat sinut useista palvelinten ja verkostojen hallinnointitehtävistä. Pelkästään tämä voi oikeuttaa näiden palvelujen käytön.

Näiden palveluiden haitat ovat:

* He maksavat palveluistaan, joskus paljon (absoluuttisesti, ei siksi, että se ei ole hyvä arvo.) . Tässä luetellut hinnat ovat[Amazon EC2](https://aws.amazon.com/ec2/pricing). Nämä hinnat (Kesäkuussa 2015) tulee alas.
Aiemmin hinnat olivat korkeammat, mutta tiedostot ja pyyntöjen määrä olivat pienempiä.
Tulevaisuudessa hinnat ovat alhaisemmat, mutta datatiedostot ja pyyntöjen määrä ovat suuremmat.
Yksityiskohdat muuttuvat, mutta tilanne pysyy suhteellisen vakiona.
Palvelu ei ole ylihinnoiteltu, se on, että käytämme ja ostamme paljon palvelua.
    * Tietojen siirto – Tietojen siirrot järjestelmään ovat nyt ilmaisia (Kyllä&#33;) .
Tietojen siirrot järjestelmästä ovat 0,09 dollaria.
Yksi SATA-kiintolevy (0,3 GB/s) Yhdellä palvelimella yhdelläERDDAP™Voiko Gigabit Ethernet LAN (0,1 GB/s) .
Gigabit Ethernet LAN (0,1 GB/s) OC-12 Internet-yhteys (0,06GB/s) .
Jos yksi OC-12-yhteys voi siirtää noin 150 000 GB/kk, tiedonsiirron kustannukset voivat olla jopa 150 000 GB @ 0,09/GB = 13,500 dollaria kuukaudessa. Jos sinulla on kymmenkunta kovaa työtäERDDAPpilvipalvelussa kuukausittaiset tiedonsiirtomaksut voivat olla merkittäviä (162 000 dollaria kuukaudessa) . (Jälleen ei ole kyse siitä, että palvelu on ylihinnoiteltu, vaan siitä, että käytämme ja ostamme paljon palvelua.) 
    * Tietojen tallennus - Amazon veloittaa 50 dollaria kuukaudessa TB:tä kohden. (Vertaile sitä, että 4TB-yrityksen ostaminen ajaa suoraan noin 50/TB: lle, vaikka RAID: n käyttöönotto ja hallinnolliset kustannukset lisäävät kokonaiskustannuksia.) Jos haluat tallentaa paljon tietoa pilveen, se voi olla melko kallista. (100 TB maksaa 5000 dollaria kuukaudessa) . Mutta jos sinulla on todella suuri määrä tietoja, tämä on pienempi ongelma kuin kaistanleveys / tiedonsiirtokustannukset. (Jälleen ei ole kyse siitä, että palvelu on ylihinnoiteltu, vaan siitä, että käytämme ja ostamme paljon palvelua.)   
         
### Subsetointi{#subsetting} 
* Aliasetusongelma: Ainoa tapa levittää datatiedostoja tehokkaasti on saada tietoa jakava ohjelma. (esim.ERDDAP) palvelimella, jolla on paikallisella kiintolevyllä tallennettuja tietoja (tai yhtä nopea pääsy SAN tai Paikallinen RAID) . Paikalliset tiedostojärjestelmät sallivatERDDAP™  (kirjastot, kuten netcdf-java) pyytää tiettyjä tavuja tiedostoista ja saada vastauksia erittäin nopeasti. Useita tietopyyntöjäERDDAP™tiedostoon (Erityisesti verkottuneet tiedot pyytävät, jos stride-arvo on &gt; 1 1) Ei voida tehdä tehokkaasti, jos ohjelman on pyydettävä koko tiedostoa tai suuria tiedostoja ei-paikalliselta. (hitaammin) Tietojen tallennusjärjestelmä ja sen jälkeen osajoukko. Jos pilvi ei annaERDDAP™nopea pääsy tiedostojen sivuvalikoimaan (Yhtä nopeasti kuin paikalliset tiedostot) ,ERDDAPTietojen saatavuus on vakava pullonkaula ja negata muita hyötyjä pilvipalvelun käytöstä.

### Isännöidyt tiedot{#hosted-data} 
Vaihtoehto yllä mainittuun kustannushyötyanalyysiin (joka perustuu tietojen omistajaan (esim.NOAA) maksamaan tietonsa pilveen tallennettavaksi) Vuonna 2012, kun Amazon (Vähemmän, jotkut muut pilvipalvelut) Alkoi isännöidä joitakin tietoja pilvessä (AWS S3) Ilmaiseksi (Oletetaan, että he voisivat palauttaa kustannukset, jos käyttäjät vuokraisivat AWS EC2 -laskentatapauksia työskennelläkseen näiden tietojen kanssa.) . Tämä tekee pilvipalvelusta huomattavasti tehokkaamman, koska datan lataaminen ja ylläpito on nyt nolla. kanssaERDDAP™V2.0 on uusia ominaisuuksia, jotka helpottavat juoksemistaERDDAPPilvessä:

* Nyt, aEDDGridFromFiles tai EDDTableFromFiles-tietoaineisto voidaan luoda tietotiedostoista, jotka ovat etäisiä ja helposti saatavilla Internetin kautta. (Esimerkki: AWS S3) käyttämällä&lt;CacheFromUrl &gt; ja&lt;Cache GB&gt; vaihtoehtojaERDDAP™säilyttää viimeksi käytettyjen tiedostojen paikallisen välimuistin.
* Jos EDDTableFromFiles-lähdetiedostot on pakattu (esim..tgz) ,ERDDAP™Masentaa ne automaattisesti, kun ne luetaan.
* Nyt,ERDDAP™Lanka, joka vastaa tiettyyn pyyntöön, levittää työntekijälankoja pyynnön alaosiin, jos käytät pyyntöä.&lt;nThreads &gt; vaihtoehtoja Tämä rinnakkaisratkaisu mahdollistaa nopeammat vastaukset vaikeisiin pyyntöihin.

Nämä muutokset ratkaisevat AWS S3:n ongelman, joka ei tarjoa paikallista, lohkotasoista tiedostojen tallennustilaa ja (Vanha vanha vanha) S3-tietoihin pääsyn ongelma on merkittävä. (Vuosia sitten (~ 2014) Tämä viive oli tärkeä, mutta nyt se on paljon lyhyempi eikä niin merkittävä.) Kaiken kaikkiaan se tarkoittaa, ettäERDDAP™Pilvi toimii nyt paljon paremmin.

 **Kiitos** Kiitos Matthew Arrottille ja hänen ryhmälleen alkuperäisessä OOI-työssä heidän työstään.ERDDAP™pilvessä ja sen aiheuttamissa keskusteluissa.
 

- -

## [Rekisteröidyt etäyhteydet](#remote-replication-of-datasets) {#remote-replication-of-datasets} 

On olemassa yleinen ongelma, joka liittyy edellä mainittuun keskusteluun verkoista ja liittovaltioista.ERDDAPs: Rekisteröityjen aineistojen etäkäyttö. Perusongelma on: Tietojen tarjoaja säilyttää tietoaineiston, joka muuttuu ajoittain ja käyttäjä haluaa säilyttää ajan tasalla olevan paikallisen kopion tästä tietoaineistosta. (mistä tahansa syystä) . On selvää, että tästä on paljon variaatioita. Joitakin variaatioita on vaikeampi käsitellä kuin toisia.

* Nopeat päivitykset
On vaikeampaa pitää paikalliset tiedot ajan tasalla. *välittömästi*   (Esimerkiksi kolmessa sekunnissa) jokaisesta muutoksesta, ei esimerkiksi muutamassa tunnissa.
     
* Useita muutoksia
Usein muutokset ovat vaikeampia käsitellä kuin harvinaisia muutoksia. Esimerkiksi kerran vuorokaudessa tehdyt muutokset ovat paljon helpompia kuin 0,1 sekunnin välein.
     
* Pieniä muutoksia
Pieniä muutoksia lähdetiedostoon on vaikeampi käsitellä kuin kokonaan uusi tiedosto. Tämä on erityisen tärkeää, jos pieniä muutoksia voi olla missä tahansa. Pienet muutokset ovat vaikeampia havaita ja niiden eristäminen on vaikeaa. Uusia tiedostoja on helppo havaita ja siirtää tehokkaasti.
     
* Koko data
Koko tietoaineiston pitäminen ajan tasalla on vaikeampaa kuin vain viimeaikaisten tietojen säilyttäminen. Jotkut käyttäjät tarvitsevat viimeaikaisia tietoja (Esimerkiksi viimeisen kahdeksan päivän arvo) .
     
* Useita kopioita
Useiden etäkopioiden säilyttäminen eri sivustoilla on vaikeampaa kuin yhden etäkopion säilyttäminen. Tämä on skaalausongelma.
     

Lähteen tietoaineiston mahdollisista muutoksista sekä käyttäjän tarpeista ja odotuksista on suuri määrä variaatioita. Monia variaatioita on vaikea ratkaista. Paras ratkaisu yhdelle tilanteelle ei useinkaan ole paras ratkaisu toiseen tilanteeseen.

### [ **relevanttiaERDDAP™Työkalut** ](#relevant-erddap-tools) {#relevant-erddap-tools} 

ERDDAP™tarjoaa useita työkaluja, joita voidaan käyttää osana järjestelmää, joka pyrkii säilyttämään etäkopion tietoaineistosta:

*   ERDDAP&gt;[RSS  (Rikas sivusto yhteenveto?) Palvelupalvelu](https://en.wikipedia.org/wiki/RSS)  
Tarjoaa nopean tavan tarkistaa, onko etänä oleva tietoaineistoERDDAP™on muuttunut.
     
*   ERDDAP&gt;[Tilauspalvelu](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)  
on tehokkaampi (kuinRSS) Lähetämme välittömästi sähköpostiviestin tai otamme yhteyttä URL-osoitteeseen jokaiselle tilaajalle aina, kun tiedot on päivitetty ja päivitys on muuttunut. Se on tehokasta, kun se tapahtuu ASAP ja ei ole tuhlattu vaivaa. (kuin äänestyksessäRSSPalvelupalvelu) . Käyttäjät voivat käyttää muita työkaluja (kuin[IFTTT](https://ifttt.com/)) vastaamaan tilausjärjestelmän sähköposti-ilmoituksiin. Käyttäjä voi esimerkiksi tilata etänä olevan tietoaineistonERDDAP™ja käyttää IFTTT:tä reagoimaan tilaussähköpostiilmoituksiin ja käynnistämään paikallisen tietoaineiston päivittämisen.
     
*   ERDDAP&gt;[Lippujärjestelmä](/docs/server-admin/additional-information#flag)  
Yksi tapa antaa yksiERDDAP™Järjestelmänvalvoja ilmoittaa tietoaineistonsaERDDAPLataa ASAP uudelleen. Lipun URL-muotoa voidaan helposti käyttää käsikirjoituksissa. Lipun URL-muotoa voidaan käyttää myös tilauksena.
     
*   ERDDAP&gt;["files"Järjestelmäjärjestelmä](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)  
voi tarjota pääsyn lähdetiedostoihin tiettyyn tietoaineistoon, mukaan lukien tiedostojen Apache-tyylinen hakemistoluettelo ("Verkkokansio") joka sisältää jokaisen tiedoston latausURL-osoitteen, viimeisen muokatun ajan ja koon. Yksi haittapuoli käyttää"files"Järjestelmä on, että lähdetiedostoilla voi olla erilaiset muuttujanimet ja erilaiset metatiedot kuin tietoaineistolla.ERDDAP. Jos etäisyysERDDAP™Dataset tarjoaa pääsyn lähdetiedostoihin, jotka avaavat huonon miehen version rsyncistä: paikallisen järjestelmän on helppo nähdä, mitkä etätiedostot ovat muuttuneet ja on ladattava. (Nähdään[CacheFromUrl vaihtoehto](#cache-from-url)alla, joka voi käyttää tätä.)   
     

### [Ratkaisuja](#solutions) {#solutions} 

Vaikka ongelmaan on olemassa valtava määrä muunnelmia ja mahdollisten ratkaisujen ääretön määrä, ratkaisuihin on vain muutamia perusmenetelmiä:

#### Brute Force -ratkaisut{#custom-brute-force-solutions} 
Ilmeinen ratkaisu on räätälöity ratkaisu, joka on optimoitu tietylle tilanteelle: tehdä järjestelmä, joka havaitsee / tunnistaa, mitkä tiedot ovat muuttuneet, ja lähettää nämä tiedot käyttäjälle, jotta käyttäjä voi pyytää muutettuja tietoja. Voit tehdä tämän, mutta haittoja on:

* Mukavat ratkaisut ovat paljon työtä.
* Mukautetut ratkaisut ovat yleensä niin mukautettu tiettyyn tietoaineistoon ja käyttäjän järjestelmään, ettei niitä voi käyttää uudelleen.
* Ratkaisuja pitää rakentaa ja ylläpitää. (Se ei ole koskaan hyvä idea. On aina hyvä välttää työtä ja saada joku muu tekemään työtä&#33;) 

Välttelen tätä lähestymistapaa, koska on lähes aina parempi etsiä yleisiä ratkaisuja, joita joku muu rakentaa ja ylläpitää.
     
#### rsync{#rsync} 
[rsync](https://en.wikipedia.org/wiki/Rsync)on olemassa oleva, hämmästyttävän hyvä, yleinen käyttötarkoitus ratkaisu, joka pitää tiedostokokoelman lähdetietokoneessa synkronoituna käyttäjän etätietokoneeseen. Se miten se toimii on:

1. Jotain tapahtumaa (Esimerkki: AERDDAP™Tilausjärjestelmätapahtuma) rynnäkkönen,
     (tai krooninen työ pyörii tiettyinä päivinä tietokoneella) 
2. joka ottaa yhteyttä rsync-tietokoneeseen,
3. joka laskee kunkin tiedoston tuoksujen sarjan hasheja ja välittää ne käyttäjän rsyncille,
4. jotka vertaavat näitä tietoja käyttäjän tiedostojen kopion vastaaviin tietoihin,
5. Sitten pyydetään tiedostoja, jotka ovat muuttuneet.

    
Kun otetaan huomioon kaikki mitä se tekee, rsync toimii nopeasti. (10 sekuntia ja tiedonsiirtoaikaa) erittäin tehokkaasti. On olemassa[Variaatiot rsync](https://en.wikipedia.org/wiki/Rsync#Variations)Optimointi eri tilanteissa (esim. laskemalla ja kiinnittämällä kunkin lähdetiedoston ketjujen tiivistelmät) .

Tärkeimmät heikkoudet rsync ovat: se vaatii jonkin verran ponnistusta perustaa. (Turvallisuuskysymykset) ; on joitakin skaalausongelmia; eikä ole hyvä pitää NRT-tietoaineistoja ajan tasalla. (Esimerkiksi rsynciä on vaikea käyttää yli 5 minuutin välein.) . Jos pystyt selviytymään heikkouksista tai jos ne eivät vaikuta tilanteeseesi, rsync on erinomainen, yleinen käyttötarkoitus, jota kuka tahansa voi käyttää juuri nyt ratkaistakseen monia skenaarioita, joihin liittyy aineistojen etäkopiointi.

Tuotteesta on olemassaERDDAP™Tehdä lista yrittää lisätä tukea rsync palvelutERDDAP  (Ehkä melko vaikea tehtävä) Jotta kuka tahansa asiakas voi käyttää rsync (tai variantti) ylläpitää ajantasaista kopiota tietoaineistosta. Jos joku haluaa tehdä töitä, pyydän sähköpostia.erd.data at noaa.gov.

On muita ohjelmia, jotka tekevät enemmän tai vähemmän mitä rsync tekee, joskus suuntautunut tietoaineiston replikaatio. (usein tiedostokopiotasolla) esim.Unidata&gt;[IDD](https://www.unidata.ucar.edu/projects/index.html#idd).
    
#### Lähde: Url{#cache-from-url} 
[CacheFromUrl](/docs/server-admin/datasets#cachefromurl)Asetus on käytettävissä (AloitetaanERDDAP™V2.0) KaikilleERDDAPtiedostotyypit, jotka tekevät tiedostoista tietoaineistoja (Pohjimmiltaan kaikki alaluokat[EDDGridFilejä](/docs/server-admin/datasets#eddgridfromfiles)ja[EDDTableFromfiilit](/docs/server-admin/datasets#eddtablefromfiles)) . Cash FromUrl tekee siitä triviaalia ladata ja ylläpitää paikallisia tietotiedostoja kopioimalla ne etälähteestä välimuistin kautta. Url-asetukset. Etätiedostot voivat olla Web Accessible -kansiossa tai THREDS:n tarjoamassa hakemiston kaltaisessa tiedostoluettelossa.HyraxS3:n taiERDDAP&gt;"files"järjestelmä.
    
Jos etätiedostojen lähde on etäinenERDDAP™tietoaineisto, joka tarjoaa lähdetiedostojaERDDAP™ "files"Järjestelmä, sitten voit[allekirjoittaa](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)etätietoihin ja käytä[Lippu URL](/docs/server-admin/additional-information#flag)Paikallinen tietoaineistosi tilauksen toimenpiteenä. Sitten, kun etätietoaineisto muuttuu, se ottaa yhteyttä lippu-URL-osoitteeseen tietoaineistossasi, joka kertoo sen lataavan ASAP:n uudelleen, joka havaitsee ja lataa muuttuneet etätiedostot. Kaikki tämä tapahtuu hyvin nopeasti (yleensä ~5 sekuntia ja aika, joka tarvitaan tiedostojen lataamiseen) . Tämä lähestymistapa toimii hyvin, jos lähdeaineiston muutokset ovat uusia tiedostoja, jotka lisätään säännöllisesti ja kun olemassa olevat tiedostot eivät muutu. Tämä lähestymistapa ei toimi, jos tiedot liitetään usein kaikkiin. (tai eniten) olemassa olevista lähdetiedostoista, koska paikalliset tietoaineistosi lataavat usein koko etätietoaineiston. (Tässä tarvitaan rsync-tyyppistä lähestymistapaa.) 
    
#### ArchiveaDataset{#archiveadataset} 
ERDDAP™&gt;[ArchiveaDataset](/docs/server-admin/additional-information#archiveadataset)Se on hyvä ratkaisu, kun tietoja lisätään tietoaineistoon usein, mutta vanhempia tietoja ei koskaan muuteta. Periaatteessa yksiERDDAP™Järjestäjä voi ohjata ArchiveADataset (ehkä käsikirjoituksessa, kenties cron) täsmentää tietoaineiston osajoukko, jonka he haluavat ottaa (Ehkä useissa tiedostoissa) Pakkaus alla.ziptai tai.tgztiedosto, jotta voit lähettää tiedoston kiinnostuneille ihmisille tai ryhmille (Esimerkkinä NCEI arkistoinnista) Lataa se ladattavaksi. Voit esimerkiksi käyttää ArchiveADatasetia joka päivä klo 12.10 ja tehdä sen..zipKaikki tiedot klo 12:00 edellisenä päivänä klo 12:00. (Tee tämä viikoittain, kuukausittain tai vuosittain tarpeen mukaan.) Koska pakattu tiedosto luodaan offline-tilassa, ei ole olemassa vaaraa aikataulun tai liikaa tietoja, koska on olemassa standardi.ERDDAP™Pyyntö.
     
#### ERDDAP™Vakiopyyntöjärjestelmä{#erddaps-standard-request-system} 
ERDDAP™Vakiopyyntöjärjestelmä on vaihtoehtoinen hyvä ratkaisu, kun tiedot lisätään tietoaineistoon usein, mutta vanhemmat tiedot eivät koskaan muutu. Käytännössä kuka tahansa voi käyttää vakiopyyntöjä saadakseen tietoja tietyn ajan. Esimerkiksi klo 12:10 päivässä, voit tehdä pyynnön kaikki tiedot etätietokannasta klo 12.00 edellisenä päivänä klo 12.00. Rajoitukset (ArchiveADataset lähestymistapa) on aikalisän riski tai yhtä tiedostoa on liikaa. Rajoitusta voidaan välttää tekemällä pienempiä ajanjaksoja useammin.
     
#### EdDTableFromHttpGet{#eddtablefromhttpget} 
\\[Tätä vaihtoehtoa ei ole vielä olemassa, mutta se on mahdollista rakentaa lähitulevaisuudessa.\\]  
Uusi[EdDTableFromHttpGet](/docs/server-admin/datasets#eddtablefromhttpget)Tietojen tyyppiERDDAP™V2.0 mahdollistaa uuden ratkaisun. Tämän tyyppisen tietoaineiston ylläpitämät taustalla olevat tiedostot ovat olennaisesti lokitiedostoja, jotka tallentavat muutoksia tietoaineistoon. Paikallista dataa ylläpitävän järjestelmän olisi voitava luoda säännöllisesti (Perustuu laukaisuun) pyytää kaikki etätietoaineistoon tehdyt muutokset edellisestä pyynnöstä. Tämän pitäisi olla yhtä tehokasta (tai enemmän) kuin rsync ja käsittelisi monia vaikeita skenaarioita, mutta toimisi vain, jos etä- ja paikalliset tietoaineistot ovat EDDTableFromHttpGet-tietoaineistoja.

Jos joku haluaa tehdä töitä, ota yhteyttäerd.data at noaa.gov.
    
#### Jaettu data{#distributed-data} 
Mikään edellä mainituista ratkaisuista ei tee suurta työtä ongelman vaikeiden vaihteluiden ratkaisemiseksi, koska reaaliaikaisen replikoinnin vuoksi. (NRT) Tiedot ovat erittäin vaikeita, osittain kaikkien mahdollisten skenaarioiden vuoksi.

On olemassa hyvä ratkaisu: älä edes yritä kopioida tietoja.
Käytä yhtä arvovaltaista lähdettä (Yksi tietokanta yhdelläERDDAP) Tietojen tarjoajan ylläpitämä (esimerkiksi aluetoimisto) . Kaikki käyttäjät, jotka haluavat tietoja kyseisestä aineistosta, saavat sen aina lähteestä. Esimerkiksi selainpohjaiset sovellukset saavat tiedot URL-pohjaisesta pyynnöstä, joten ei ole väliä, että pyyntö on alkuperäiselle lähteelle etäpalvelimella. (Ei sama palvelin, joka isännöi ESM:ää) . Monet ovat jo pitkään kannattaneet tätä jaettua dataa. (Roy Mendelssohn viimeiset 20 vuotta) .ERDDAPVerkko/liittomalli (Top 80 % tästä asiakirjasta) perustuu tähän lähestymistapaan. Ratkaisu on kuin miekka Gordian Knotille - koko ongelma katoaa.

* Tämä ratkaisu on hämmästyttävän yksinkertainen.
* Ratkaisu on hämmästyttävän tehokas, koska mitään työtä ei ole tehty säilyttääkseen kopioitua dataa. (s) ajan tasalla.
* Käyttäjät voivat saada uusimmat tiedot milloin tahansa (Esim. viiveellä vain ~0,5 sekuntia) .
* Se skaalautuu hyvin ja on olemassa tapoja parantaa skaalausta. (Katso tästä artikkelista 80%.)   
     

Tämä ei ole ratkaisu kaikkiin mahdollisiin tilanteisiin, mutta se on hyvä ratkaisu enemmistöön. Jos tähän ratkaisuun liittyy ongelmia/heikkouksia tietyissä tilanteissa, kannattaa usein ratkaista nämä ongelmat tai elää näiden heikkouksien kanssa tämän ratkaisun upeiden etujen vuoksi. Jos/kun tämä ratkaisu ei ole hyväksyttävissä tietyssä tilanteessa, esim. silloin, kun sinulla todella on paikallinen kopio tiedoista, harkitse muita edellä mainittuja ratkaisuja.
     
### Johtaminen{#conclusion} 
Ei ole olemassa yksinkertaista ratkaisua, joka ratkaisee kaikki ongelmat kaikissa tilanteissa. (rsync ja jaettu data ovat lähes) Toivottavasti on olemassa riittävästi työkaluja ja vaihtoehtoja, jotta voit löytää sopivan ratkaisun tilanteeseesi.
