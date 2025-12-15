---
sidebar_position: 2
---

# Ohjelmoijan opas

Nämä ovat asioita, joiden kanssa vain ohjelmoija haluaa työskennellä. ERDDAP &gt; Java Luokkien on tiedettävä.

###  **Lähdekoodi**  {#getting-the-source-code} 
   

  - Lähdekoodi GitHubissa
Myös viimeaikaisten julkisten versioiden ja kehitysversioiden lähdekoodi on saatavilla [GitHub](https://github.com/ERDDAP) . Ole hyvä ja lue [Wiki](https://github.com/ERDDAP/erddap/wiki) tähän projektiin. Jos haluat muuttaa lähdekoodia (Muutokset on mahdollisesti sisällytetty standardiin ERDDAP™ Jakelu jakautuu) Tämä on suositeltu lähestymistapa.

###  ** ERDDAP™ Riippuvuus**  {#erddap-dependencies} 
 ERDDAP™ Maven käyttää koodiriippuvuuksia sekä joitain staattisia viitetiedostoja (WEB INF/ref) . Näin vältytään tallentamasta suuria tiedostoja tallennustilaan.
Voit käyttää `mvn kokoelma` Näin saadaan riippuvuuksia ja ref-tiedostoja. Voit myös käyttää `Mvn-paketti` luodaan sotatiedosto.
Voit ladata ref-tiedostoja manuaalisesti:

  -  [etopo1 | | _ _ _ .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip) ja poista se osoitteesta WEB-INF/ref/.

  -  [Ref | | Näytä tarkat tiedot .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip) ja poista se osoitteesta WEB-INF/ref/.

  -  [erdapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip)   (versio 1.0.0, 20333 tavua, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, päivätty 2024-10-14) _tomcat_, luominen _tomcat_/content/erddap .

HUOMAUTUS: Oletusarvoisesti Maven välittää staattisia viite- ja testitietoarkiston latauksia ja poistaa ne vain, kun uusi versio ladataan. Lataaminen kokonaan, voit asettaa `SkipResourceDownload` ja/tai `SkipTestResourceDownload` Kiinteistöt Maven (esim. `mvn-DskipResourceDownload -paketti` ) . Pakottaminen, asettaminen `Dedownload.unpack=true` ja `Dedownload.unpack WhenChanged=false (käytetty)` .

-  ERDDAP™ Alikomponenteilla on hyvin liberaali, avoimen lähdekoodin [Lisenssit](/license) Voit käyttää ja muokata lähdekoodia mihin tahansa tarkoitukseen, voittoa tai voittoa tavoittelemattomaan. Huomaa, että ERDDAP™ Monilla alikomponenteilla on lisenssejä, jotka edellyttävät, että tunnistat käyttämäsi koodin lähteen. Näytä [Luottoa](/credits) . Vaatii tai ei, on hyvä tunnistaa kaikki nämä tekijät.
  

-  **Käytä koodia muihin hankkeisiin** 

Kun olet tervetullut käyttämään osia ERDDAP™ Muiden projektien koodia varoitetaan, että koodi voi ja muuttuu. Emme lupaa tukea koodimme muita käyttötapoja. Git ja GitHub ovat tärkeimpiä ratkaisujasi tämän käsittelyyn – Git mahdollistaa muutostemme yhdistämisen.
   **Monissa tilanteissa, joissa saatat olla kiusattu käyttää osia ERDDAP™ Projektissasi uskomme, että sinun on helpompi asentaa ja käyttää ERDDAP™ Kuten on,** Kirjoita sitten muita palveluja, jotka käyttävät ERDDAP palvelut. Voit luoda oman ERDDAP™ Asentaminen tunnissa tai kahdessa. Voit luoda oman ERDDAP™ Asentaminen kiillotetulla tavalla muutamassa päivässä (riippuen tietojesi määrästä ja monimutkaisuudesta) . Hakkerointi osat ERDDAP™ Oma projekti kestää todennäköisesti viikkoja. (Kuukaudet saada hienovaraisia) ja menetät kyvyn sisällyttää muutoksia ja virhekorjauksia myöhemmästä ERDDAP™ vapauttaa. Me olemme (Ilmeisesti) On monia etuja käyttää ERDDAP™ Niin kuin on ja tekee ERDDAP™ julkisesti saatavilla. Joissakin tilanteissa et ehkä halua tehdä ERDDAP™ julkisesti saatavilla. Palvelu voi käyttää ja käyttää yksityistä ERDDAP™ Asiakkaiden ei tarvitse tietää ERDDAP™ .

  ####  **Puolikas** 

Tai on olemassa toinen lähestymistapa, josta voi olla hyötyä, joka on puolivälissä. ERDDAP koodi ja käyttö ERDDAP™ Yksityinen verkkopalvelu: EDD-luokassa on staattinen menetelmä, jonka avulla voit määrittää tietoaineiston. (spesifikaatioiden perusteella datasets.xml ) :
OneFromDataset XM (TDatasetidiä) 
Se palauttaa EDD-taulukon tai EDDGrid Dataa. Ottaen huomioon, voit soittaa
MakeNewFileForDapQuery (käytetty) (String userDapQuery, String dir, String fileName, String-tiedosto Typen nimi) 
”Kerro tapaus tehdä tietotiedosto, tietyn tiedostotyypin, käyttäjäkyselyn tuloksilla. Tämä on yksinkertainen tapa käyttää ERDDAP menetelmät tietojen pyytämiseksi ja tiedoston saamiseksi vastauksena, kuten asiakas käyttää ERDDAP™ Web-sovellukset. Tämä lähestymistapa toimii sinun sisälläsi Java Ohjelmoi ja ohittaa Tomcatin kaltaisen sovelluspalvelimen tarpeen. Käytämme tätä lähestymistapaa useisiin EDDTable-yksikön testeihin ja EDDGrid Alaluokkia, joten voit nähdä esimerkkejä tästä lähdekoodissa kaikki nämä luokat.

###  **Kehitysympäristö**  {#development-environment} 

  - on konfiguraatioita [Jee](https://github.com/ERDDAP/erddap/blob/main/development/jetty) ja [Docker](https://github.com/ERDDAP/erddap/blob/main/development/docker) GitHubissa julkaisujen odotetaan toimivan Tomcatissa.

  -  **Vaihtoehtoinen** : Aseta ylös ERDDAP™ Tomcatissa
Siitä lähtien ERDDAP™ Se on tarkoitettu pääasiassa Tomcatissa toimivaksi palvelimeksi, suosittelemme vahvasti, että noudatat standardia. [Asennusohjeet](/docs/server-admin/deploy-install) Asenna Tomcat ja asenna sitten ERDDAP™ Tomcatin webapps-hakemistossa. muun muassa, ERDDAP™ Se on suunniteltu asennettavaksi Tomcatin hakemistoon ja odottaa Tomcatin tarjoavan .jar-tiedostoja.

  -  ERDDAP™ ei vaadi erityistä tunnustusta (Chris käyttää pääasiassa Visual Studio Codea, Bob käyttää EditPlusia.) . Emme käytä Eclipse, Ant, jne. emmekä tarjoa ERDDAP niihin liittyvää tukea. Projekti käyttää Mavenia.

  - Käytämme erätiedostoa, joka poistaa kaikki .class-tiedostot lähdepuusta varmistaaksemme, että meillä on puhdas kokoelma. (Javac) .

  - Tällä hetkellä käytämme Adoptiumin javac jdk-21.0.3+9:ää gov.noaa.pfeg.coastwatch.TestAll. (Sillä on linkkejä joihinkin luokkiin, joita ei muuten olisi koottu.) ja suorittaa testejä. Turvallisuussyistä on lähes aina parempi käyttää uusimpia versioita. Java 21 ja Tomcat 10.

    - Javac tai Java, nykyinen hakemisto on _tomcat_/webapps/erddap/WEB-INF.

    - Javac- ja Java-luokka on
       `luokat; //. //lib/servlet-api.jar;lib/*` 

    - Javac-komentosi on jotain sellaista.
       `Javac-koodaus UTF-8-cp-luokkia;..../.././.././lib/servlet-api.jar;lib/*-luokat/gov/noaa/pfel/coastwatch/TestAll.java` 

    - Java-komentolinjasi on kuin
’java-cp-luokat;.../././lib/servlet-api.jar;lib/* -Xmx4000M Luokat/Gov/noaa/Pfel/Castwatch/TestAll
       `Vaihtoehto: voit lisätä` Verbose:gc, joka sanoo Java Jätteiden keräystilastot.

    - Jos testi Kaikki kootut, kaikki ERDDAP™ Tarpeet on koottu. Muutamia luokkia on koottu, joita ei tarvita ERDDAP™ . Jos TestAllin kokoaminen onnistuu, mutta ei kokoa luokkaa, sitä ei tarvita. (On olemassa keskeneräisiä / käyttämättömiä luokkia.) 

  - Joissakin tapauksissa käytämme kolmannen osapuolen lähdekoodia .jar-tiedostojen sijaan. (erityisesti DODS ) ja muuttanut niitä hieman, jotta vältettäisiin ongelmat. Java Usein on tehty pieniä muutoksia (erityisesti DODS ) muista syistä.

  - Useimmilla luokkilla on testimenetelmät src/test-tiedostossa. Voit suorittaa JUnit-testit `Mvn-testi` käsky. Tämä lataa useita zip-tiedostoja, joita testit luottavat uusimpaan julkaisuun. [ ERDDAP Eddap Testi](https://github.com/ERDDAP/erddapTest/releases/) . . \\
     
HUOMAUTUS: Maven Caches lataa, mutta poistaa ladatut arkistot jokaisesta suorituksesta, joka vie aikaa. Lataa skip lataus
Testitietojen arkistointi, voit määrittää `SkipTestResourceDownload` Kiinteistö Maven (esim. `mvn-DskipTestResourceDownload -paketti` ) .

###   **Tärkeitä luokkia**  {#important-classes} 

Jos haluat tarkastella lähdekoodia ja yrittää selvittää, miten ERDDAP™ Työt, olkaa hyvä.

  - Koodilla on Java Kommentteja, mutta Java Docsia ei ole kehitetty. Tuntuu vapaalta luoda niitä.

  - Tärkeimmät luokat (Alla mainitut) Sisältää gov/noaa/pfel/erddap.

  - The ERDDAP™ Luokalla on korkeimmat menetelmät. Se laajentaa HttpServletia.

  -  ERDDAP™ pyynnöt alaryhmille EDDGrid EDDTable, joka edustaa yksittäisiä tietoaineistoja.

  - EDStaticilla on suurin osa staattisista tiedoista ja asetuksista. (esim. asennus.xml ja viestit.xml-tiedostot) tarjoaa staattisia palveluja (esimerkiksi sähköpostien lähettäminen) .

  -  EDDGrid ja EDDTable-alaluokat täyttävät pyynnön, saavat tietoja alaluokkakohtaisista menetelmistä ja muotoilevat sitten vastauksen tiedot.

  -  EDDGrid Aliluokka työntää tietoja GridDataAccessoriin (Sisäinen tietosäiliö verkkotietoihin) .

  - EDDTable-alaluokat työntävät tietoja TableWriter-alaluokkiin, jotka kirjoittavat tietoja tietylle tiedostotyypille lennossa.

  - Muut luokat (mm. matalan tason luokat) Se on myös tärkeää, mutta on epätodennäköistä, että muutat niitä.
     

###  **Koodin panokset**  {#code-contributions} 

- GitHub-kysymykset
Jos haluat osallistua, mutta sinulla ei ole projektia, katso luettelo [GitHub-kysymykset](https://github.com/ERDDAP/erddap/issues) Monet niistä ovat hankkeita, joita voit toteuttaa. Jos haluat työskennellä ongelman parissa, ilmoita siitä itsellesi muille, jotka työskentelet sen parissa. GitHub-kysymys on paras paikka keskustella mahdollisista kysymyksistä, miten käsitellä tätä asiaa.

- Jos muutos, jonka haluat tehdä, on yksi alla olevista tapauksista, luo [GitHubin ongelma](https://github.com/ERDDAP/erddap/issues) Se kertoo muutoksesta, jonka aiot tehdä. Sitten kun muutos on valmis, tee vetopyyntö pyytää sulautumista. Yhteisiä muutoksia ovat:

  - Haluat kirjoittaa toisen alaluokan EDDGrid EDDTable käsittelee toisen tietolähteen tyyppiä. Jos näin on, suosittelemme, että löydät lähimmän olemassa olevan alaluokan ja käytät koodia lähtökohtana.

  - Haluaisit kirjoittaa toisen menetelmän (As_FileType). Jos näin on, suosittelemme, että löydät lähimmän olemassa olevan tallennuksen. EDDGrid EDDTable ja käytä koodia lähtökohtana.

Näissä tilanteissa on etu, että kirjoittamasi koodi on itsenäinen. Sinun ei tarvitse tietää kaikkia yksityiskohtia ERDDAP sisäisiä. Meidän on helppo sisällyttää koodi ERDDAP . Huomaa, että jos lähetät koodin, lisenssi on yhteensopiva ERDDAP™   [lisenssi lisenssi lisenssi lisenssi](/license)   (esim. [Apasseja](https://www.apache.org/licenses/) , [BSD](https://www.opensource.org/licenses/bsd-license.php) tai [MIT-X](https://www.opensource.org/licenses/mit-license.php) ) . Listaamme panoksenne tähän [Luottoa](/credits) .

- Jos sinulla on ominaisuus, jota ei ole yllä, haluat lisätä ERDDAP On suositeltavaa ensin luoda keskusteluketju [GitHub-keskustelut](https://github.com/ERDDAP/erddap/discussions/categories/ideas) . Merkittävien ominaisuuksien/muutosten osalta tekninen hallitus keskustelee niistä ja päättää, hyväksyykö se niiden lisäämisen. ERDDAP™ .

###  **Tuomitse koodisi panokset**  {#judging-your-code-contributions} 
Jos haluat lisätä koodin tai muut muutokset, jotka sisältyvät ERDDAP Se on suuri. Panoksen on täytettävä tietyt kriteerit, jotta se voidaan hyväksyä. Jos noudatat alla olevia ohjeita, lisäät huomattavasti todennäköisyyttä, että panoksesi hyväksytään.
   

  - The ERDDAP™ Hanketta hallinnoi NATD ( NOAA Tekninen johtaja) Teknisen hallituksen tulos.
2007 alkaen (Alkua ERDDAP ) Vuoteen 2022 mennessä Bob Simons (Myös perustajajäsen) . Tammikuusta 2023 alkaen se on Chris John. NATD on vastuussa ERDDAP h) hänellä on viimeinen sana päätöksistä ERDDAP™ koodi, erityisesti suunnittelusta ja siitä, hyväksytäänkö tietty vetopyyntö vai ei. Näin on tehtävä osittain tehokkuussyistä. (Linus Torvalds ja Linux) osittain turvallisuussyistä: Jonkun on kerrottava tietoturvahenkilöille, että hän ottaa vastuun koodin turvallisuudesta ja koskemattomuudesta.
     

  - NATD ei takaa, että hän hyväksyy koodin.
Jos projekti ei vain toimi niin kuin olimme toivoneet ja jos sitä ei voida pelastaa, NATD ei sisälly projektiin. ERDDAP™ Jakelu. Älä tunne pahaa. Joskus projektit eivät toimi kuten toivottiin. Tämä tapahtuu kaikille ohjelmistokehittäjille. Jos noudatat alla olevia ohjeita, lisäät suuresti menestymismahdollisuuksiasi.
     

  - On parasta, että muutokset ovat yleistä kiinnostusta ja hyötyä.
Jos koodi on erityinen organisaatiollesi, on parempi ylläpitää erillistä haaraa. ERDDAP™ käyttöösi. Axiom tekee niin. Onneksi Git tekee tämän helpoksi. NATD haluaa säilyttää yhtenäisen vision ERDDAP Älä anna sen tulla keittiön uppoamishankkeeksi, jossa jokainen lisää projektilleen mukautetun ominaisuuden.
     

  - Seuraa Java Yleissopimuksia.
Yleisesti ottaen koodin on oltava laadukas ja sen on noudatettava alkuperäistä [ Java Koodisopimukset](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf) : laittaa .class-tiedostoja oikeaan paikkaan hakemistorakenteessa, antaa .class-tiedostoja sopiva nimi, sisällyttää oikea nimi. Java Doc-kommentteja, jotka sisältävät //kommentteja kunkin koodin kappaleen alussa, joka on lueteltu neljällä tilalla. (Ei tab) Vältä &gt; 80 merkkiä jne. Sopimukset muuttuvat, eikä lähdekoodi ole aina täysin ajan tasalla. Jos epäilet, sovi koodi sopimuksiin eikä olemassa oleviin koodiin.

- Käytä kuvailevia luokkia, menetelmiä ja muuttuvia nimiä.
Tämä helpottaa muiden lukemista.
   

- Vältä fantasiakoodia.
Pitkällä aikavälillä sinun tai muiden on selvitettävä koodi, jotta voit säilyttää sen. Käytä yksinkertaisia koodausmenetelmiä, jotka helpottavat muita. (mukaan lukien tulevaisuudessa) selvittää. Tietenkin, jos on todellista etua käyttää joitakin fancy. Java Ohjelmointiominaisuus, käytä sitä, mutta dokumentoi laajasti, mitä olet tehnyt, miksi ja miten se toimii.
   

- Työskentele tekniikan kanssa ennen kuin aloitat.
Jos haluat, että koodisi muuttuu ERDDAP™ Tekninen hallitus haluaa ehdottomasti puhua siitä, mitä aiot tehdä ja miten aiot tehdä sen ennen kuin teet muutoksia koodiin. Näin voimme välttää tekemästä muutoksia, joita Suomi lopulta ei hyväksy. Kun teet työtä, NATD ja tekninen johto ovat valmiita vastaamaan kysymyksiin, jotta voit selvittää olemassa olevan koodin ja (Kokonaisuutena) Miten käsitellä projektiasi
   

- Työskentele itsenäisesti (mahdollisimman paljon) Kun aloitat.
Toisin kuin edellä mainitussa "Työskentele teknillisen hallituksen kanssa", kun aloitat projektin, NATD kannustaa sinua työskentelemään mahdollisimman itsenäisesti. Jos NATD:n on kerrottava kaikki ja vastattava moniin kysymyksiin (erityisesti ne, joihin olisit voinut vastata lukemalla dokumentaatiota tai koodia.) Silloin ponnistelut eivät ole aikasäästöjä NATD:lle, ja hän voi myös tehdä työn itse. Se on se [Myyttinen kuukausi](https://en.wikipedia.org/wiki/The_Mythical_Man-Month) ongelma. Tietenkin meidän pitäisi kommunikoida. On hienoa nähdä säännöllisesti työsi etenevän varmistaakseen, että projekti on käynnissä. Mitä enemmän voit työskennellä itsenäisesti (Kun tekninen johtokunta on hyväksynyt tehtävän ja yleisen lähestymistavan) Mitä parempi.
   

- Vältä vikoja.
Jos vika ei jää kiinni ennen julkaisua, se aiheuttaa ongelmia käyttäjille. (Parhaimmillaan) palauttaa väärän tiedon (Pahimmillaan) on blotti päällä ERDDAP maine ja pysyy ajan tasalla ERDDAP™ asennuksia vuosia. Työskentele kovasti välttääksesi vikoja. Osa tästä on puhtaan koodin kirjoittamista. (Ongelmia on helpompi nähdä) . Osa tästä on yksiköiden testien kirjoittamista. Osa tästä on jatkuva asenne virheiden välttelyyn, kun kirjoitat koodia. Älä tee NATD katumusta lisätä koodin ERDDAP™ .
   

- Kirjoita yksikön testi tai testi.
Uusi koodi, sinun pitäisi kirjoittaa JUnit testit testitiedosto.
Kirjoita vähintään yksi testimenetelmä, joka testaa perusteellisesti kirjoittamaasi koodia ja lisää sen luokan JUnit-testitiedostoon, jotta se suoritetaan automaattisesti. Yksikkö (ja liittyvät) Testit ovat yksi parhaista tavoista saada vikoja aluksi ja pitkällä aikavälillä. (Kun muut asiat muuttuvat ERDDAP™ ) . Kuten Bob sanoi: "Kokeet antavat minun nukkua yöllä."
   

- Tee NATD:n helppo ymmärtää ja hyväksyä muutokset vetopyynnössäsi.
Osa tästä on yksikön testimenetelmän kirjoittaminen (s) . Osa tästä rajoittaa muutoksia yhteen koodiin (Yksi luokka) Jos mahdollista. NATD ei hyväksy vetopyyntöä sadoilla muutoksilla koko koodin ajan. NATD kertoo tietoturvahenkilöille, että hän ottaa vastuun koodin turvallisuudesta ja eheydestä. Jos muutoksia on liian paljon tai niitä on liian vaikea selvittää, on liian vaikeaa tarkistaa, että muutokset ovat oikeita eivätkä esitä vikoja tai turvallisuusongelmia.
   

- Pidä se yksinkertaisena.
Hyvä teema koodille on: Pidä se yksinkertaisena. Yksinkertainen koodi on helppo muille (mukaan lukien tulevaisuudessa) lukea ja ylläpitää. NATD:n on helppo ymmärtää ja hyväksyä.
   

- Ota pitkäaikainen vastuu koodistasi.
Pitkällä aikavälillä on parempi, jos otat jatkuvan vastuun koodin ylläpidosta ja vastaat siihen liittyviin kysymyksiin. (Esim. Sisällä ERDDAP™ Google Group) . Kuten jotkut kirjoittajat huomauttavat, koodi on myös omaisuuserä. Jos vika havaitaan tulevaisuudessa, se on parasta, jos korjaat sen, koska kukaan ei tiedä koodiasi paremmin kuin sinä. (On myös kannustin välttämään vikoja.) . NATD ei vaadi jatkuvaa ylläpitoa. NATD:n mukaan huoltoa arvostetaan suuresti.
