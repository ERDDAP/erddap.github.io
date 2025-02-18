---
sidebar_position: 4
---
ERDDAP™Aseta omasiERDDAP™    

## Asioita, jotka sinun on tiedettävä{#things-you-need-to-know} 
     
###    **[Proxy virheitä](#proxy-errors)**  {#proxy-errors} 
Joskus pyyntöERDDAP™Palauta Proxy Error, HTTP 502 Bad Gateway Error tai vastaava virhe. Apachen tai Tomcatin tekemät virheet eivätERDDAP™itse.
* Jos jokainen pyyntö aiheuttaa nämä virheet, varsinkin kun olet aloittamassaERDDAP™Sitten se on todennäköisesti välitys- tai huono porttivirhe, ja ratkaisu on todennäköisesti korjattava.[ERDDAPProxy-asetukset](/docs/server-admin/deploy-install#proxypass). Tämä voi olla myös ongelma, kun vakiintunutERDDAP™Yhtäkkiä alkaa heittää virheitä jokaiseen pyyntöön.
* Muuten "proxy"-virheet ovat yleensä Apachen tai Tomcatin aiheuttamia virheitä. Jopa silloin, kun ne tapahtuvat suhteellisen nopeasti, Apachen tai Tomcatin vastaus on jonkinlainen.ERDDAP™Se on erittäin kiireinen, muistirajoitettu tai rajoitettu jollakin muulla resurssilla. Näissä tapauksissa, katso alla olevat ohjeet käsitellä[ERDDAP™Vastaa hitaasti](#responding-slowly).
        
Pyynnöt pitkälle aikavälille (30 aikapistettä) verkosta saadut tiedot ovat alttiita ajoissa ulos epäonnistumisia, jotka usein näkyvät Proxy Errors, koska se vie merkittävää aikaa.ERDDAP™Avaa kaikki tiedostot yksi kerrallaan. JosERDDAP™Muussa tapauksessa ongelma on todennäköisempi. Jos tietoaineiston tiedostot on pakattu, ongelma on todennäköisempi, vaikka käyttäjän on vaikea määrittää, onko tietoaineiston tiedostot pakattu.
Ratkaisu on tehdä useita pyyntöjä, joista jokaisella on pienempi aikaväli. Kuinka pieni aikaväli? Suosittelen aloittamaan todella pienen (30 aikapistettä?) sitten (noin) kaksinkertaistaa aikavälin, kunnes pyyntö epäonnistuu, sitten kaksinkertaistaa. Tee sitten kaikki pyynnöt (Jokainen eri ajanhuippu) Piti saada kaikki tiedot.
YksiERDDAP™Järjestäjä voi vähentää tätä ongelmaa lisäämällä[Apache Timeout -asetukset](/docs/server-admin/deploy-install#apache-timeout).
        
### Seuranta{#monitoring} 
Haluamme, että tietopalvelumme löytävät yleisönsä ja että niitä käytetään laajasti, mutta joskus myösERDDAP™Voidaan käyttää liikaa, mikä aiheuttaa ongelmia, mukaan lukien erittäin hidas vastaus kaikkiin pyyntöihin. Suunnitelmamme ongelmien välttämiseksi on:

* SeurantaERDDAP™kautta[Tila.html verkkosivut](#status-page).
Siinä on paljon hyödyllistä tietoa. Jos näet valtavan määrän pyyntöjä tulossa tai tonnia muistia käytetään tai tonnia epäonnistuneita pyyntöjä, tai jokainen suuri LoadDatasets kestää kauan, tai nähdä mitään merkkejä siitä, että asiat sidotaan alas ja vastata hitaasti, niin katsoERDDAP&gt;[log.txt-tiedosto](#log)Katsotaan, mitä tapahtuu.
    
On myös hyvä huomioida, kuinka nopeasti status-sivu reagoi. Jos se reagoi hitaasti, se on tärkeä indikaattori.ERDDAP™on hyvin kiireinen.
    
* SeurantaERDDAP™kautta[Päivittäinen raportti](#daily-report)sähköpostia.
     
* Varo ajantasaisia tietoaineistoja *Perusta* /erddap/outOfDateDatasets.htmlSivusto, joka perustuu valinnaiseen[testOutOfDate](/docs/server-admin/datasets#testoutofdate)Globaali attribuutti.
     
#### Ulkopuoliset tarkkailijat{#external-monitors} 
Edellä luetellut menetelmät ovatERDDAPSeuraa itseään. On myös mahdollista tehdä tai käyttää ulkoisia järjestelmiä seuraamaanERDDAP. Yksi projekti tähän on[Axiomin erddap-metrinen projekti](https://github.com/axiom-data-science/erddap-metrics). Näillä ulkoisilla järjestelmillä on joitakin etuja:
* Ne voidaan mukauttaa antamaan haluamasi tiedot, jotka näkyvät haluamallasi tavalla.
* Ne voivat sisältää tietoaERDDAP™ettäERDDAP™ei pääse helposti tai ollenkaan (esimerkiksi CPU-käyttö, levyn vapaa tila,ERDDAP™käyttäjän näkökulmasta katsottuna,ERDDAP™Ylös,
* He voivat antaa hälytyksiä (Sähköpostit, puhelut, tekstit) kun ongelmat ylittävät jonkin rajan.
             
### Monipuolinen samanaikainen Pyynnöt{#multiple-simultaneous-requests} 
*    **Blacklist-käyttäjät tekevät useita samanaikaisia pyyntöjä.** 
Jos on selvää, että käyttäjä tekee useampaa kuin yhtä samanaikaista pyyntöä toistuvasti ja jatkuvasti, lisää sitten IP-osoite.ERDDAP[ ]&lt;Pyydä musta lista » (Docs/server-admin/datasets#requestblacklist Näytä tarkat tiedot) sinun sisälläsidatasets.xmltiedosto. Joskus pyynnöt ovat peräisin yhdestä IP-osoitteesta. Joskus ne ovat peräisin useista IP-osoitteista, mutta selvästi sama käyttäjä. Voit myös mustalle listalle ihmisiä, jotka tekevät tonnia mitättömiä pyyntöjä tai tonnia mielenkiinnottomia pyyntöjä.
    
jokaisesta pyynnöstä, jonka he tekevät,ERDDAP™Palautus:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
Toivottavasti käyttäjä näkee tämän viestin ja ottaa sinuun yhteyttä selvittääkseen, miten korjata ongelma ja poistaa musta lista. Joskus ne vain vaihtavat IP-osoitteita ja yrittävät uudelleen.
    
Se on kuin hyökkäävien ja puolustusaseiden välinen tasapaino. Tässä puolustusaseet (ERDDAP) on kiinteä kapasiteetti, jota rajoittavat CPU: n ytimien määrä, levyn käyttökaistanleveys ja verkon kaistanleveys. Hyökkäävät aseet (käyttäjät, erityisesti käsikirjoitukset) rajoittamaton kapasiteetti:
    
    * Yksi pyyntö tietoihin monesta ajankohdasta voi aiheuttaaERDDAPAvaa valtava määrä tiedostoja (Sekvenssissä tai osittain multi-threaded) . Äärimmäisissä tapauksissa yksi "yksinkertainen" pyyntö voi helposti sitoa RAIDin.ERDDAP™minuutti, joka estää muiden pyyntöjen käsittelyn.
         
    * Yksi pyyntö voi kuluttaa suuren muistin (VaikkaERDDAP™on koodattu suurten pyyntöjen käsittelyyn tarvittavan muistin minimoimiseksi.) .
         
    * Paralleloituminen -
Älykkään käyttäjän on helppo rinnastuttaa iso tehtävä tuottamalla paljon lankoja, joista jokainen lähettää erillisen pyynnön. (jotka voivat olla suuria tai pieniä) . Tietotekniikan yhteisö kannustaa tätä käyttäytymistä tehokkaana keinona ratkaista suuri ongelma. (Yhteensopivuus on tehokasta muissa olosuhteissa) . Sota-analogiaan palaaminen: käyttäjät voivat tehdä olennaisesti rajoittamattoman määrän samanaikaisia pyyntöjä, kunkin pyynnön kustannukset ovat pohjimmiltaan nolla, mutta kunkin pyynnön kustannukset tulevat.ERDDAP™voi olla suuri jaERDDAP”Vastauskyky on rajallinen. selkeästi,ERDDAP™häviää tämän taistelun, elleiERDDAP™Järjestelmänvalvoja mustalle listalle käyttäjät, jotka tekevät useita samanaikaisia pyyntöjä, jotka ovat harhaanjohtavia muita käyttäjiä.
         
    * Useita kirjoituksia -
Mieti, mitä tapahtuu, kun on olemassa useita älykkäitä käyttäjiä, jotka toimivat rinnakkain. Jos yksi käyttäjä voi luoda niin paljon pyyntöjä, että muut käyttäjät ovat täynnä, useat käyttäjät voivat luoda niin monia pyyntöjä, ettäERDDAP™Se on ylikuormitettu ja tuntuvasti epävastuullinen. Se on tehokkaasti[DDOS-hyökkäys](https://en.wikipedia.org/wiki/Denial-of-service_attack)Jälleen ainoa puolustusERDDAP™Blacklist-käyttäjille, jotka tekevät useita samanaikaisia pyyntöjä, jotka ovat epäreilusti täynnä muita käyttäjiä.
         
    * täytetyt odotukset -
Tässä suurten teknologiayritysten maailmassa (Amazon, Google, Facebook) Käyttäjät odottavat olennaisesti rajoittamattomia ominaisuuksia. Koska nämä yritykset ovat rahankeruutoimintaa, sitä enemmän käyttäjiä heillä on, sitä enemmän tuloja heidän on laajennettava IT-infrastruktuuriaan. Heillä on varaa laajaan IT-infrastruktuuriin pyyntöjen käsittelyyn. Ne rajoittavat käyttäjien pyyntöjen ja kustannusten määrää rajoittamalla käyttäjien pyyntöjä, jotta yksittäinen pyyntö ei olisi raskas, eikä koskaan ole syytä. (tai tapa) Käyttäjille useita samanaikaisia pyyntöjä. Näillä yrityksillä voi olla paljon enemmän käyttäjiä kuinERDDAP™Heillä on paljon enemmän resursseja ja älykkäitä tapoja rajoittaa pyyntöjä jokaiselta käyttäjältä. Tämä on hallittavissa oleva tilanne suurille yrityksille. (He rikastuvat&#33;) mutta eiERDDAP™asennuksia. Jälleen ainoa puolustusERDDAP™Blacklist-käyttäjille, jotka tekevät useita samanaikaisia pyyntöjä, jotka ovat epäreilusti täynnä muita käyttäjiä.
         
    
Käyttäjät: Älä tee useita samanaikaisia pyyntöjä tai olet musta lista.
     

On selvää, että palvelimella on paljon ytimiä, paljon muistia. (Voit jakaa paljon muistiaERDDAP™enemmän kuin koskaan tarvitsee) korkea kaistanleveys Internet-yhteys. Muisti on harvoin tai ei koskaan rajoittava tekijä, mutta verkon kaistanleveys on yleisempi rajoittava tekijä. Koska yhtäaikaisia pyyntöjä on enemmän ja enemmän, tietyn käyttäjän nopeus vähenee. Tämä luonnollisesti hidastaa pyyntöjen määrää, jos jokainen käyttäjä lähettää vain yhden pyynnön kerrallaan.
    
### ERDDAP™Tietoja kolmesta{#erddap-getting-data-from-thredds} 
Jos sinunERDDAP™Saat joitakin sen tietoja sivustollasi olevasta THREDDS-tiedostosta, on joitakin etuja tehdä kopio THREDDS-tiedostoista. (Ainakin suosituimpiin tietoihin) Toisella kierroksella, jokaERDDAP™on pääsy siihen, ettäERDDAP™Tiedot voidaan toimittaa suoraan tiedostoista. AtERDTeemme sen suosituimmille tietokannoillemme.

*   ERDDAP™Voit saada tiedot suoraan eikä sinun tarvitse odottaa, että THREDDS lataa tietoaineiston uudelleen tai...
*   ERDDAP™voi havaita ja sisällyttää uusia tiedostoja välittömästi, joten sen ei tarvitse pesteroida THREDDS-tiedostoja usein nähdäkseen, onko tietoaineisto muuttunut. Näet [&lt;Päivitä kaikki ns. (Docs/server-admin/datasets#updateeverynmillis) .
* Kuorma on jaettu kahden RAIDS- ja 2-palvelimen välillä sen sijaan, että pyyntö olisi vaikea molemmissa.ERDDAP™ja kolme.
* Vältät ongelman, joka johtuu siitä, että sinulla on pieni (Oletuksena) Suurin pyyntökoko.ERDDAP™on järjestelmä, joka käsittelee virheitä, mutta ongelman välttäminen on parempi.
* Sinulla on varmuuskopio tiedoista, joka on aina hyvä idea.

Älä koskaan juokse kolmea jaERDDAP™samassa Tomcatissa. Käytä niitä erillisillä Tomcat-palvelimilla tai paremmin erillisillä palvelimilla.

Huomaamme, että 3DS tulee säännöllisesti tilaan, jossa pyynnöt vain ripustetaan. Jos sinunERDDAP™Tietoja saa kolmesta ja kolme on tässä tilassa.ERDDAP™Hänellä on puolustus (THREDDS-pohjainen tietoaineisto ei ole käytettävissä) mutta se on edelleen vaikeaaERDDAP™Koska koskaERDDAP™On odotettava, kunnes aika on joka kerta, kun se yrittää ladata tietoaineiston uudelleen ripustettujen THREDDS. Joitakin ryhmiä (mukaan lukienERD) Vältä tätä käynnistämällä toistuvasti 3D:tä (Esimerkki: Yöllinen kroonisessa työssä) .

### Vastaa hitaasti{#responding-slowly} 
*    **JosERDDAP™Vastaa hitaasti** jos vain tietyt pyynnöt vastaavat hitaasti,
Voit selvittää, onko hitaus kohtuullinen ja tilapäinen. (esimerkiksi käsikirjoitusten taiWMSKäyttäjät) Jos jokin on selittämättömän väärin ja sinun täytyy[Sulje ja käynnistä Tomcat uudelleenERDDAP™](#shut-down-and-restart).
    
JosERDDAP™Vastaa hitaasti, katso alla olevat neuvot selvittääksesi syyn, joka toivottavasti auttaa sinua korjaamaan ongelman.
Sinulla voi olla erityinen lähtökohta (Esimerkki URL-osoitteesta) Epämääräinen lähtökohta (esim.ERDDAP™Hidas on) .
Saatat tuntea käyttäjän (Esim. koska he lähettivät sinulle) Tai ei.
Sinulla voi olla muita vihjeitä tai ei.
Koska kaikki nämä tilanteet ja kaikki mahdolliset syyt ongelmiin hämärtyvät, alla olevat neuvot yrittävät käsitellä kaikki mahdolliset lähtökohdat ja kaikki mahdolliset hitaisiin vastauksiin liittyvät ongelmat.
    
    *    **Etsi vihjeitä sisään[ERDDAPLokitiedostot](#log)**   ( *isovanhemmat* Tekijät/log.txt) .
        \\[Harvoissa tapauksissa on vihjeitä[Tomcatin lokitiedosto](#tomcat-logs)  ( *Tom* Lähde: Catalina.out) .\\]  
Etsi virheilmoituksia.
Etsi useita pyyntöjä, jotka tulevat yhdestä (tai muutama) Käyttäjät ja ehkä paljastavat palvelimen resursseja (muisti, CPU-aika, levyn käyttö, internetin kaistanleveys) .
        
Jos ongelma on sidottu **Yksi käyttäjä** Saat usein vihjeen siitä, kuka käyttäjä on verkkopalveluiden kautta.[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)jotka voivat antaa sinulle käyttäjän IP-osoitteeseen liittyviä tietoja (josta löydätERDDAP&gt;[log.txt](#log)tiedostotiedosto) .
        
        * Jos käyttäjä näyttää olevan **Bot** käyttäytyä huonosti (hakukone, joka yrittää täyttääERDDAP™kaikki mahdolliset sisäänpääsyarvot) Varmista, että olet määrittänyt palvelimen asianmukaisesti[Robotit.txt](#robotstxt)tiedosto.
        * Jos käyttäjä näyttää olevan **Käsikirjoitus (s) ** joka tekee useita samanaikaisia pyyntöjä, ota yhteyttä käyttäjään, selitä, ettäERDDAP™rajalliset resurssit (esimerkiksi muisti, CPU-aika, levyn käyttö, internetin kaistanleveys) Pyydä heitä harkitsemaan muita käyttäjiä ja tekemään yksi pyyntö kerrallaan. Saatat myös mainita, että mustalle listalle ne, jos ne eivät palaa.
        * Jos käyttäjä näyttää olevan **Käsikirjoitus** tehdä paljon aikaa vieviä pyyntöjä, pyydä käyttäjää harkitsemaan muita käyttäjiä asettamalla pieni tauko. (2 sekuntia?) Käsikirjoituksessa pyyntöjen välillä.
        *    **WMSAsiakasohjelmisto** voi olla hyvin vaativa. Yksi asiakas pyytää usein kuusi räätälöityä kuvaa kerrallaan. Jos käyttäjä näyttää olevanWMSAsiakas, joka tekee oikeutettuja pyyntöjä, voit:
            * Jätä huomiotta. (Suosittelen, koska he liikkuvat pian) 
            * Sammuta palvelimesiWMSPalvelun kauttaERDDAPAsennus.html-tiedosto. (Ei suositella) 
        * Jos pyynnöt näyttävät **tyhmä, hullu, liiallinen tai haitallinen,** tai jos et voi ratkaista ongelmaa millään muulla tavalla, harkitse käyttäjän IP-osoitteen väliaikaista tai pysyvää lisäämistä.&lt;Pyydä musta lista »datasets.xmltiedosto) (Docs/server-admin/datasets#requestblacklist Näytä tarkat tiedot) .
             
    *    **Yritä kaksinkertaistaa ongelma itse, tietokoneeltasi.**   
Selvitä, onko ongelma yhden tietoaineiston tai kaikkien tietoaineistojen, yhden käyttäjän tai kaikkien käyttäjien, vain tiettyjen pyyntöjen jne. kanssa.
Jos ongelma voidaan kaksinkertaistaa, yritä vähentää ongelmaa.
Jos ongelmaa ei voi kaksinkertaistaa, ongelma voi olla sidottu käyttäjän tietokoneeseen, käyttäjän internetyhteyteen tai laitoksen Internet-yhteyteen.
         
    * Jos vain **Yksi data** reagoi hitaasti (Ehkä vain **Yksi pyyntö** Yhden käyttäjän) Ongelma voi olla:
        *   ERDDAP« Tietoaineiston lähdetietojen käyttöoikeus (erityisesti suhteellisista tietokannoista, Cassandrasta ja etätietokannoista) Ne voivat olla väliaikaisesti tai pysyvästi hitaita. Tarkista lähteen nopeus riippumattomanaERDDAP. Jos se on hidasta, voit ehkä parantaa sitä.
        * Onko pyyntöön tai yleiseen pyyntöön liittyvä ongelma?
Mitä suurempi pyydetty tietoaineiston osajoukko, sitä todennäköisemmin pyyntö epäonnistuu. Jos käyttäjä tekee suuria pyyntöjä, pyydä käyttäjää tekemään pienempiä pyyntöjä, jotka todennäköisemmin saavat nopean ja onnistuneen vastauksen.
            
Lähes kaikki tietojoukot ovat parempia käsittelemään tiettyjä pyyntöjä kuin muut pyynnöt. Esimerkiksi, kun tietoaineisto tallentaa eri aikavälilehtiä eri tiedostoihin, pyynnöt tietojen valtava määrä aikapisteitä voi olla hyvin hidas. Jos nykyiset pyynnöt ovat vaikeita, harkitse näiden pyyntöjen kannalta optimoidun tietoaineiston muunnelmaa. Kerro käyttäjälle, että kyseinen pyyntö on vaikeaa ja aikaa vievää ja pyydä kärsivällisyyttä.
            
        * Tietoaineistoa ei voida optimaalisesti määrittää. Voit tehdä muutoksia tietoaineistoondatasets.xmlChunk auttaaERDDAP™Käsittele aineistoa paremmin. Esimerkiksi,
            
            *   EDDGridFromNcFiles-tietoaineistot, jotka käyttävät painetuista nc4/hdf5-tiedostoista saatuja tietoja, ovat hitaita koko maantieteellisen alueen tietojen saannissa. (Esimerkki: Maailmankartta) Koska koko tiedosto on masennettava. Voit muuntaa tiedostot pakkaamattomiksi tiedostoiksi, mutta levytilan tarve on paljon, paljon suurempi. On parempi hyväksyä, että nämä tiedot ovat hitaita tietyissä tilanteissa.
            * Perustaminen [&lt;subsetVariables&gt; (Docs/server-admin/datasets#subsetvariables Näytä tarkat tiedot) Tagilla on suuri vaikutus siihen, mitenERDDAP™käsittelee EDDTable-tietoaineistoja.
            * Saatat pystyä lisäämään[EDDTableFromDatabase nopeus](/docs/server-admin/datasets#database-speed)Dataa.
            * Monet EDDTable-tietokannat voivat vauhdittaa[tallentaa kopio tiedoistaNetCDFRagged Array -tiedostot](/docs/server-admin/datasets#eddtablefromfiles)mikäERDDAP™osaa lukea hyvin nopeasti.
            
Jos haluat auttaa nopeuttamaan tiettyä tietoaineistoa, sisällytä kuvaus ongelmasta ja aineiston ruumis.datasets.xmlKatso meidän[Lisätuen saaminen](/docs/intro#support).
             
    * Jos **Kaikki kaikessa** SisälläERDDAP™on **Aina aina aina** Hidas, ongelma voi olla:
        * tietokone, joka toimiiERDDAP™Ei ehkä ole tarpeeksi muistia tai prosessointia. On hyvä juostaERDDAP™moderni, monikäyttöinen palvelin. Raskaassa käytössä palvelimella tulee olla 64-bittinen käyttöjärjestelmä ja 8 Gt tai enemmän muistia.
        * tietokone, joka toimiiERDDAP™Saatat käyttää myös muita sovelluksia, jotka kuluttavat paljon järjestelmiä. Jos näin on, voit saada oman palvelimenERDDAP?? Esimerkiksi esimerkiksi (Tämä ei ole hyväksyntä) Voit saada neliydin Mac Mini Server 8 Gt muistia ~ 1100.
             
    * Jos **Kaikki kaikessa** SisälläERDDAP™on **tilapäisesti** Hidasta, katsoERDDAP&gt;[ **/erddap/status.htmlSivusivu sivu sivu sivu** ](#status-page)selaimessasi.
        * tekeeERDDAP™Sivu ei lataudu?
Jos näin on,[uudelleenkäynnistysERDDAP™](#shut-down-and-restart).
        * tekivätERDDAP™Sivun lataus hitaasti (&gt; 5 sekuntia) ??
Se on merkki siitä, että kaikkiERDDAP™Juokse hitaasti, mutta se ei välttämättä ole ongelma.ERDDAP™Voi olla todella kiireinen.
        * ”Vastaus epäonnistui” (Viimeisimmät LoadDatasets) Onko n = suuri määrä?
Tämä osoittaa, että viime aikoina on tehty paljon epäonnistuneita pyyntöjä. Se voi olla ongelma tai vaikeuksien alku. Epäonnistumisen mediaaniaika on usein suuri (210 000 ms) ,
mikä tarkoittaa, että oli (Onko?) Paljon aktiivisia ketjuja.
jotka sitovat paljon resursseja (kuin muisti, avoimet tiedostot, avoimet sukat,) ,
joka ei ole hyvä.
        * "Vastaus onnistunut aika" (Viimeisimmät LoadDatasets) Onko n = suuri määrä?
Tämä osoittaa, että viime aikoina on tehty paljon onnistuneita pyyntöjä. Tämä ei ole ongelma. Se tarkoittaa vain sinunERDDAP™Siitä tulee raskasta käyttöä.
        * Onko "ei-tomcat-odottavia lankoja" kaksinkertainen tyypillinen arvo?
Tämä on usein vakava ongelma, joka aiheuttaaERDDAP™hidastua ja lopulta jäätyä. Jos tämä jatkuu useita tunteja, voit haluta ennakoivasti.[uudelleenkäynnistysERDDAP™](#shut-down-and-restart).
        * Luettelossa "Memory Use Summary" on viimeinen "Memory: tällä hetkellä käytössä" arvo erittäin korkea?
Tämä voi tarkoittaa vain suurta käyttöä tai se voi olla merkki ongelmasta.
        * Katso lista ketjuista ja niiden tilasta. Onko epätavallinen määrä tehdä jotain epätavallista?
             
    * on **instituution Internet-yhteys** Tällä hetkellä hidasta?
Etsi internet "internet-nopeustesti" ja käytä yhtä ilmaisista online-testeistä, kuten[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Jos yrityksesi internetyhteys on hidas, yhteydetERDDAP™etätietolähteet ovat hitaita ja yhteysERDDAP™Käyttäjä on hidas. Joskus voit ratkaista tämän lopettamalla tarpeettoman internetin käytön. (esimerkiksi videoiden suoratoistoa tai videoneuvottelupuheluita katselevat henkilöt) .
         
    * on **Käyttäjän Internet-yhteys** Tällä hetkellä hidasta?
Käyttäjä hakee Internetiä "internet-nopeustestiin" ja käyttää yhtä ilmaisista online-testeistä, kuten[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Jos käyttäjän internetyhteys on hidas, se hidastaa heidän pääsyään.ERDDAP. Joskus he voivat ratkaista tämän lopettamalla tarpeettoman internetin käytön laitoksessa. (esimerkiksi videoiden suoratoistoa tai videoneuvottelupuheluita katselevat henkilöt) .
         
    *    **Stuck?**   
Katso meidän[Lisätuen saaminen](/docs/intro#support).

### Sulje ja käynnistä uudelleen{#shut-down-and-restart} 
*    **Miten lopettaa ja käynnistää TomcatERDDAP™**   
Sinun ei tarvitse sulkea ja käynnistää Tomcat.ERDDAPjosERDDAP™Hidas, hidas jostain syystä (kuin paljon pyyntöjä käsikirjoituksista taiWMSKäyttäjät) tai tehdä muutoksiadatasets.xmltiedosto.
    
Sinun täytyy sulkea ja käynnistää Tomcat uudelleen.ERDDAP™jos haluat muuttaa asennus.xml-tiedostoa tai josERDDAP™Jäädytä, ripustaa tai lukitsee. äärimmäisissä olosuhteissa,JavaSe voi jäätyä minuutiksi tai kahdeksi, kun se tekee täyden roskakeräyksen, mutta sitten toipua. On hyvä odottaa minuutti tai kaksi.Java//ERDDAP™Se on todella jäädytetty tai jos se tekee vain pitkän roskakorin. (Jos roskat on yleinen ongelma,[Lisää muistia Tomcatiin](/docs/server-admin/deploy-install#memory).) 
    
En suosittele Tomcat Web Application Managerin käyttämistä Tomcatin aloittamiseen tai lopettamiseen. Jos et ole täysin suljettu ja käynnistys Tomcat, ennemmin tai myöhemmin sinulla on PermGen muistiongelmia.
    
Tomcatin sulkeminen ja käynnistäminenERDDAP:
    
    * Jos käytät Linuxia tai Macia:
         (Jos olet luonut Tomcat-käyttäjän, esimerkiksi Tomcat, muista tehdä seuraavat vaiheet.)   
         
        1. cd *Tom* /B
             
        2. Käytä ps -ef|Greep Tomcat löytää Java / Tomcat prosessi ID (Toivotaan, että vain yksi prosessi listataan.) jota me kutsumme *JavaProcess* alhaalla.
             
        3. JosERDDAP™jäädytetty / lukittu, käytä tappaa -3 *JavaProcess* kertomaanJava  (Mikä on Tomcat) Tomcat-lokitiedostoon tehtävä thread dump: *Tom* Katalina.out. Kun olet aloittanut, voit diagnosoida ongelman löytämällä thread dump -tiedot. (ja muita hyödyllisiä tietoja sen yläpuolella) Sisällä *Tom* /logs/catalina.out ja myös lukemalla olennaisia osia[ERDDAP™Lokiarkisto](#log). Jos haluat, voit sisällyttää nämä tiedot ja katsoa[Lisätuen saaminen](/docs/intro#support).
             
        4. Käytä ./shutdown. Säv.
             
        5. Käytä ps -ef|Tomcat toistuvasti, kunnes java/tomcat-prosessi ei ole listattu.
            
Java/tomcat -prosessi kestää jopa kaksi minuuttia. Syy on:ERDDAP™lähettää viestin taustasäikeilleen, jotta ne voivat pysähtyä, mutta joskus se vie nämä langat pitkään päästäkseen hyvään pysähdyspaikkaan.
            
        6. Jos minuutin jälkeen java/tomcat ei pysähdy itsestään, voit käyttää
tappaa -9 *JavaProcess*   
Pakottaa java/tomcat-prosessin pysähtymään välittömästi. Jos mahdollista, käytä sitä vain viimeisenä keinona. 9-kytkin on voimakas, mutta se voi aiheuttaa monia ongelmia.
             
        7. käynnistää uudelleenERDDAP™Käytä ./startup.sh
             
        8. NäkymäERDDAP™Selaimessasi tarkistaa, että uudelleenkäynnistys onnistui. (Joskus sinun täytyy odottaa 30 sekuntia ja yrittää ladata.ERDDAP™Selaimessasi, jotta se onnistuisi.)   
             
    * Jos käytät Windowsia:
         
        1. cd *Tom* /B
             
        2. Käytäshutdown.bat  
             
        3. Voit halutessasi/tarpeessasi käyttää Windows Task Manageria (Lähde: Ctrl Alt Del) varmistaa, ettäJava/Tomcat/ERDDAP™Prosessi/sovellus on täysin pysähtynyt.
Välillä prosessi/hakemus kestää jopa kaksi minuuttia. Syy on:ERDDAP™lähettää viestin taustasäikeilleen, jotta ne voivat pysähtyä, mutta joskus se vie nämä langat pitkään päästäkseen hyvään pysähdyspaikkaan.
             
        4. käynnistää uudelleenERDDAP™Käytä startup.batia
             
        5. NäkymäERDDAP™Selaimessasi tarkistaa, että uudelleenkäynnistys onnistui. (Joskus sinun täytyy odottaa 30 sekuntia ja yrittää ladata.ERDDAP™Selaimessasi, jotta se onnistuisi.)   
             
### Usein jäädytettyjä tai risteytettyjä{#frequent-crashes-or-freezes} 
JosERDDAP™Hidastuu, kaatuu tai jäätyy, jotain on vialla. Katso sisään[ERDDAPLokitiedostot](#log)yrittää selvittää syyn. Jos et voi, ota yhteys yksityiskohtiin ja katso meidän[Lisätuen saaminen](/docs/intro#support).

Yleisin ongelma on ongelmallinen käyttäjä, joka käyttää useita käsikirjoituksia kerralla ja / tai joku, joka tekee paljon mitättömiä pyyntöjä. Jos näin tapahtuu, sinun on todennäköisesti mustalle listalle. Kun musta listattu käyttäjä tekee pyynnön, vastauksen virheilmoitus rohkaisee heitä lähettämään sinulle sähköpostia ongelmien selvittämiseksi. Sitten voit rohkaista heitä juoksemaan vain yhden käsikirjoituksen kerrallaan ja korjaamaan käsikirjoituksen ongelmat. (esim. etätietoaineiston tietojen pyytäminen, joka ei voi vastata ennen ajan päättymistä) . Näet [&lt;Pyydä musta lista »datasets.xmltiedosto) (Docs/server-admin/datasets#requestblacklist Näytä tarkat tiedot) .

äärimmäisissä olosuhteissa,JavaSe voi jäätyä minuutiksi tai kahdeksi, kun se tekee täyden roskakeräyksen, mutta sitten toipua. On hyvä odottaa minuutti tai kaksi.Java//ERDDAP™Se on todella jäädytetty tai jos se tekee vain pitkän roskakorin. (Jos roskat on yleinen ongelma,[Lisää muistia Tomcatiin](/docs/server-admin/deploy-install#memory).) 

JosERDDAP™Hidastuu tai jäätyy, eikä ongelma ole ongelmallinen käyttäjä tai pitkä roskakokoelma, voit yleensä ratkaista ongelman.[UudelleenkäynnistysERDDAP™](#shut-down-and-restart). Kokemukseni on, ettäERDDAP™Se voi kestää kuukausia ilman, että tarvitset uudelleenkäynnistystä.
     

### Seuranta{#monitor} 
Voit seurataERDDAP"Station, katsomalla[/erddap/status.htmlSivusivu sivu sivu sivu](#status-page)erityisesti yläosan tilastot. JosERDDAP™hidastuu tai jäätyy ja ongelma ei ole vain erittäin raskas käyttö, voit yleensä ratkaista ongelman.[UudelleenkäynnistysERDDAP™](#shut-down-and-restart). Prometheus-integraatiolla /erdap/metricsillä on muita mittareita.

Kokemukseni on, ettäERDDAP™Se voi kestää kuukausia ilman, että tarvitset uudelleenkäynnistystä. Sinun tarvitsee vain käynnistää se uudelleen, jos haluat tehdä joitakin muutoksia, joita olet tehnyt.ERDDAPasennus.xml tai jos haluat asentaa uusia versioitaERDDAP™,JavaTomcat tai käyttöjärjestelmä. Jos haluat aloittaa uudelleenERDDAP™Usein jokin on väärin. Katso sisään[ERDDAPLokitiedostot](#log)yrittää selvittää syyn. Jos et voi, ota yhteys yksityiskohtiin ja katso meidän[Lisätuen saaminen](/docs/intro#support). Väliaikaisena ratkaisuna voit yrittää[Monimutkainen](https://mmonit.com/monit/)seurata sinunERDDAP™Käynnistetään tarvittaessa uudelleen. Voit tehdä työpaikan uudelleenkäynnistettäväksiERDDAP™  (aktiivisesti) säännöllisesti. Se voi olla hieman haastavaa kirjoittaa käsikirjoitus automatisoida seuranta ja käynnistää uudelleen.ERDDAP. Joitakin vinkkejä, jotka voivat auttaa:

* Voit yksinkertaistaa testausta, jos Tomcat-prosessi on edelleen käynnissä käyttämällä -c-kytkintä grepillä:
ps. *Tom Käyttäjä*  |Esiintyjät: C Java
Tämä vähentää tulosta "1", jos tomcat-prosessi on vielä elossa tai "0" jos prosessi on pysähtynyt.
     
* Jos olet hyvä gawkin kanssa, voit poistaa prosessitunnuksen tuloksista.
ps. *Tom Käyttäjä*  |java ja käyttää prosessitunnusta muissa käsikirjoituksen riveissä.
     

Jos perustat Monit- tai cron-työn, olisi hienoa, jos voisit jakaa yksityiskohdat, jotta muut voisivat hyötyä näkemästämme.[Lisätuen saaminen](/docs/intro#support)johon voit jakaa.

#### Permgen{#permgen} 
Jos käytät Tomcat Manageria toistuvasti (Lopeta ja aloita)  ERDDAP™,ERDDAP™Ei voi alkaa ja heittää Java.langia. OutOfMemory Virhe: PermGen. Ratkaisu on ajoittain (Tai joka kerta?)  [Sulje ja käynnistä Tomcat uudelleenERDDAP™](#shut-down-and-restart)Sen sijaan, että vain ladattaisiinERDDAP.
\\[Päivitys: Tämä ongelma on minimoitu tai korjattuERDDAP™versio 1.24.\\]  
     
#### Log{#log} 
*    **[log.txt](#log)**   
JosERDDAP™ei käynnisty tai jos jokin ei toimi odotetulla tavalla, on erittäin hyödyllistä tarkastella virheitä ja diagnostisia viestejä.ERDDAP™Lokitiedosto.
    * Lokitiedosto on *isovanhemmat* Tekijät/log.txt
         ( *isovanhemmat* on määritelty[Asennus.xml](/docs/server-admin/deploy-install#setupxml)) . Jos ei ole lokia. Txt-tiedosto tai loki. txt-tiedostoa ei ole päivitetty sen jälkeen, kun se on aloitettu uudelleenERDDAP™Katso sisään[Tomcat Log -tiedostot](#tomcat-logs)Katsotaan onko siellä virheilmoitus.
    * Lokitiedoston diagnostisten viestien tyypit:
        * Sanaa "virhe" käytetään, kun jokin meni niin väärin, että menettely ei onnistunut. Vaikka on ärsyttävää saada virhe, virhe pakottaa sinut käsittelemään ongelman. Ajatus on, että on parempi heittää virhe kuin olla.ERDDAP™Harjoittele, toimi tavalla, jota et odottanut.
        * Sanaa "varoitus" käytetään, kun jokin meni pieleen, mutta menettely oli valmis. Ne ovat melko harvinaisia.
        * Kaikki muu on vain informatiivinen viesti. Voit määrittää, kuinka paljon tietoa on kirjattu [...]&lt;logiikka &gt; (Docs/server-admin/datasets#loglevel)  datasets.xml.
        * Reloads ja käyttäjän vastaukset, jotka kestävät &gt; 10 sekuntia (onnistuneesti tai epäonnistuneesti) on merkitty " (&gt; 10.) ". Näin voit etsiä tämän lauseen log.txt-tiedoston löytääksesi tietoaineistot, jotka olivat hitaita ladattavaksi tai pyynnön numeron, joka oli hidas loppuun. Voit sitten katsoa korkeammalle log.txt-tiedostossa nähdäksesi, mikä tietoaineiston ongelma oli tai mitä käyttäjän pyyntö oli ja kuka se oli. Nämä hidas dataset-kuormat ja käyttäjän pyynnöt verotetaan joskusERDDAP. Lisätietoa näistä hakemuksista voi auttaa tunnistamaan ja ratkaisemaan ongelmia.
    * Tiedot on kirjoitettu levyaseman lokitiedostoon melko suurissa kiekoissa. Etu on se, että se on erittäin tehokas -ERDDAP™Älä koskaan estä tietojen kirjoittamista lokitiedostoon. Haittapuolena on, että loki päättyy lähes aina osittaiseen viestiin, jota ei saa päätökseen ennen kuin seuraava naarmuunnos on kirjoitettu. Voit tehdä sen ajan tasalla (hetkeksi) katsomalla sinunERDDAPTilan verkkosivuilla https://*your.domain.org*/erddap/status.html   (tai taihttp://joshttpsei ole sallittua) .
    * Kun log.txt-tiedostot ovat 20 Mt,
Tiedosto on nimetty uudelleen. txt.previous ja uusi log.txt-tiedosto luodaan. Lokitiedostot eivät keräänny.
        
Asennuksessa.xml voit määrittää log-tiedoston maksimikoon MegaBytesissä. Minimi sallittu on 1 (MB) . Suurin sallittu on 2000 (MB) . Oletusarvo on 20 (MB) . Esimerkiksi:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * Aina kun aloitat uudelleenERDDAP™,
        ERDDAP™Tekee arkiston kopion log.txt ja log. txt. aiemmat tiedostot, joissa on aikaleima tiedoston nimessä. Jos on ollut ongelmia ennen uudelleenkäynnistystä, voi olla hyödyllistä analysoida näitä arkistoituja tiedostoja vihjeitä siitä, mikä ongelma oli. Voit poistaa arkistotiedostot, jos niitä ei enää tarvita.
         
##### Löydä log.txt{#parsing-logtxt} 
ERDDAP"Kirkko. Txt-tiedostoa ei ole suunniteltu pirsaamiseen (Vaikka saatat pystyä luomaan säännöllisiä ilmaisuja, jotka sisältävät haluttua tietoa.) . Se auttaa ihmistä ymmärtämään, mikä menee pieleen, kun jokin menee pieleen. Kun lähetät vika- tai ongelmailmoituksenERDDAP™Kehittäjät, jos mahdollista, sisällytä kaikki tiedot log.txt-tiedostosta, joka liittyy ongelmalliseen pyyntöön.

tehokkuussyistä,ERDDAP™Kirjoita vain tietoa kirjautumiseen. Txt, kun suuri tietokanta on kertynyt. Jos käyt lokissa. txt heti virheen tapahtumisen jälkeen virheeseen liittyviä tietoja ei ehkä ole vielä kirjoitettu log.txtiin. Jotta saat täydellisesti ajantasaista tietoa log.txt-palvelusta, käy osoitteessaERDDAP&gt;[Lähde: HTML](#status-page). MilloinERDDAP™Prosesseja, jotka pyytävät, se vaimentaa kaikki vireillä olevat tiedot log.txt.

For ForERDDAP™Käyttötilastot, käytä[Apache ja/tai Tomcat-lokitiedostot](#tomcat-logs)Sen sijaanERDDAPlog.txt. Huomaa, ettäERDDAP&gt;[Lähde: HTML](#status-page)  (jotkut) ja[Päivittäinen raportti](#daily-report)  (Lisää enemmän) sinulla on suuri määrä käyttötilastoja, jotka on ennalta laskettu.
    
### Tomcat-lokit{#tomcat-logs} 
JosERDDAP™ei käynnisty, koska virhe tapahtui hyvin varhainERDDAPkäynnistys, virheilmoitus näkyy Tomcatin lokitiedostoissa ( *Tom* Katalina / Katalina *Tänään tänään* .log tai *Tom* Lähde: Catalina.out) Ei sisään[ERDDAPlog.txt-tiedosto](#log).

Käyttötilastot: Suurin osa tiedoista, joita ihmiset haluavat kerätä lokitiedostosta (esimerkiksi käyttötilastot) Käytä Apache- ja/tai Tomcat-lokitiedostoja. He ovat hyvin muotoiltuja ja heillä on tällaisia tietoja. Niiden analysoinnissa on useita työkaluja, esimerkiksi[Häpeät](https://www.awstats.org),[ElasticSearch Kibana](https://www.elastic.co/products/kibana)ja[JMe](https://jmeter.apache.org)Etsi verkko löytääksesi oikean työkalun tarkoituksiin.

Huomaa, että lokitiedostot tunnistavat käyttäjät vain IP-osoitteina. On olemassa verkkosivustoja, jotka auttavat sinua saamaan tiettyyn IP-osoitteeseen liittyviä tietoja, esim.[Mikä on](https://whatismyipaddress.com/ip-lookup)Et yleensä löydä käyttäjän nimeä.

Myös, koska[DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol)Tietyn käyttäjän IP-osoite voi olla erilainen eri päivinä tai eri käyttäjillä voi olla sama IP-osoite eri aikoina.

Vaihtoehtoisesti voit käyttää jotain[Google Analytics](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision). Mutta varo: kun käytät ulkoisia palveluja, kuten Google Analytics, luovut käyttäjien yksityisyydestä antamalla Googlelle täyden pääsyn heidän toimintaansa sivustollasi. (Ja muut?) Pystyy pysymään ikuisesti ja käyttämään mihin tahansa tarkoitukseen. (Ei ehkä teknisesti, mutta käytännössä.) . Käyttäjäsi eivät ole suostuneet tähän eivätkä todennäköisesti ole tietoisia siitä, että heitä seurataan verkkosivustollasi, aivan kuten he eivät todennäköisesti tiedä, missä määrin heitä seurataan lähes kaikilla verkkosivustoilla. Nykyään monet käyttäjät ovat hyvin huolissaan siitä, että kaikki mitä he tekevät verkossa on näiden suurten yritysten seurantaa. (Google, Facebook jne.) ja hallitusten kautta, ja tämä on perusteeton tunkeutuminen heidän elämäänsä. (Kirjassa, 1984) . Tämä on saanut monet käyttäjät asentamaan tuotteita, kuten[Yksityisyys Badger](https://www.eff.org/privacybadger/faq)minimoida seuranta, käyttää vaihtoehtoisia selaimia, kuten[Tor Browser](https://www.torproject.org/)  (tai sammuta seuranta perinteisissä selaimissa) käyttää vaihtoehtoisia hakukoneita, kuten[Duck Go](https://duckduckgo.com/). Jos käytät Google Analyticsin kaltaista palvelua, dokumentoi sen käyttö ja seuraukset muuttamalla sitä.&lt;StandardPrivacyPolicy&gt; -tunnusERDDAP&gt;
\\[Tom\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/viestejä.xml-tiedosto.
    
### E-Mail Log{#e-mail-log} 
*    **SähköpostiLogyear-MM-DD.txt**   
    ERDDAP™Kirjoitat aina kaikki sähköpostiviestit nykypäivän sähköpostiin Logyear-MM-DD.txt-tiedosto *isovanhemmat* /logit ( *isovanhemmat* on määritelty[Asennus.xml](/docs/server-admin/deploy-install#setupxml)) .
    * Jos palvelin ei voi lähettää sähköpostiviestejä tai jos olet määrittänytERDDAP™Älä lähetä sähköpostiviestejä tai jos olet vain utelias, tämä tiedosto on kätevä tapa nähdä kaikki sähköpostiviestit, jotka on lähetetty.
    * Voit poistaa aiempien päivien sähköpostilokitiedostot, jos niitä ei enää tarvita.
         
### Päivittäinen raportti{#daily-report} 
Päivittäisellä raportilla on paljon hyödyllistä tietoa – kaikki tiedotERDDAP&gt;[/erddap/status.htmlSivusivu sivu sivu sivu](#status-page)ja enemmän.
    * Se on täydellinen yhteenveto sinunERDDAP&gt; status.
    * Muiden tilastojen joukossa on luettelo aineistoista, jotka eivät latautuneet ja niiden tuottamista poikkeuksista.
    * Se syntyy, kun aloitatERDDAP™  (jälkeenERDDAP™Lataa kaikki tietoaineistot) Se syntyy lähiaikoina kello seitsemän jälkeen joka aamu.
    * Aina kun se syntyy, se on kirjoitettu[ERDDAPlog.txt-tiedosto](#log).
    * Aina kun se luodaan, se on sähköpostia&lt;Sähköpostiviestit &gt; ja&lt;Sähköposti kaikki &gt; (jotka on määritelty[Asennus.xml](/docs/server-admin/deploy-install#setupxml)) jos olet luonut sähköpostijärjestelmän (Asennus.xml) .

### Tilasivut{#status-page} 
Voit katsoa tilasiERDDAP™mistä tahansa selaimesta menemällä&lt;Perusta &gt;/erddap/status.html
* Tämä sivu luodaan dynaamisesti, joten sillä on aina ajantasaiset tilastot.ERDDAP.
* Se sisältää tilastoja pyyntöjen määrästä, muistin käytöstä, langan pino jälkiä, tehtäväThread, jne.
* Koska sivuston voi katsoa kuka tahansa, se ei sisällä yhtä paljon tietoa kuin[Päivittäinen raportti](#daily-report).
         
### Lisätiedot / Muutokset{#addingchanging-datasets} 
ERDDAP™Yleensä lukeminendatasets.xmlJokainen jokainen *Lataa DatasetsMinMinutes*   (määritelty[Asennus.xml](/docs/server-admin/deploy-install#setupxml)) . Voit tehdä muutoksiadatasets.xmlmilloin tahansa, vaikkaERDDAP™Juoksen.
Uusi tietoaineisto havaitaan pian, yleensä sisällä *Lataa DatasetsMinMinutes* .
Muutettu aineisto ladataan, kun se on *Lataa kaikki minuutit* Vanha vanha vanha (Kuten on määriteltydatasets.xml) .
    
#### Lippu{#flag} 
*    **[Lipputiedosto](#flag)KertojaERDDAP™Kokeile ladata tietoja mahdollisimman pian** 
    
    *   ERDDAP™ei huomaa muutoksia tietoaineiston asennukseendatasets.xmlkunnesERDDAP™palauttaa tietoaineiston.
         
    * kertomaanERDDAP™tietojen lataaminen mahdollisimman pian (ennen tietoaineistoa)&lt;Reload "EveryNMinutes" aiheuttaisi sen lataamisen, laita tiedosto sisään. *isovanhemmat* /flag ( *isovanhemmat* on määritelty[Asennus.xml](/docs/server-admin/deploy-install#setupxml)) Sillä on sama nimi kuin aineistondatasetID.
Tämä kertooERDDAP™Yritä ladata tämä ASAP.
Tietoaineiston vanha versio säilyy käyttäjien saatavilla, kunnes uusi versio on saatavilla ja vaihdetaan atomisesti.
For ForEDDGridFiles ja EDDTable Files, uudelleenlataava tietoaineisto etsii uusia tai muutettuja tiedostoja, lukea niitä ja sisällyttää ne tietoaineistoon. Aika ladata riippuu uusien tai muuttuneiden tiedostojen määrästä.
Jos aineisto on aktiivinen = "väärä",ERDDAP™poistaa aineiston.
         
##### Bad Files -lippu{#bad-files-flag} 
* Yksi variantti /flag hakemisto on /badFilesFlag hakemisto. (LisättyERDDAP™2.12.)   
Jos laitat tiedoston *isovanhemmat* BadFilesFlag-hakemisto, jossa ondatasetIDtiedoston nimi (tiedostojen sisällöllä ei ole väliä) niin pian kuinERDDAP™Näytä pahat fiilikset Lipputiedosto,ERDDAP™Will:
    
    1. Poista pahanlaatuinen tiedosto.
    2. Poista pahat fiilikset.nctiedostotiedosto (Jos on yksi) Tämä on luettelo huonoista tiedostoista kyseiseen tietoaineistoon.
Tietokannat kutenEDDGridSideBySide, jolla on lapsiDatasets, poistaa myös huonot fiilikset.ncKaikkien lasten tietoaineistot.
    3. Lataa ASAP-tiedot.
    
Tämä aiheuttaaERDDAP™Yritä uudelleen työskennellä tiedostojen kanssa aiemmin (virheellisesti?) merkitty huonoksi.
         
##### Kova lippu{#hard-flag} 
* Toinen hakemiston /flag-hakemisto on /hardFlag-hakemisto. (LisättyERDDAP™v1.74.)   
Jos laitat tiedoston *isovanhemmat* HardFlag, jossa ondatasetIDtiedoston nimi (tiedostojen sisällöllä ei ole väliä) niin pian kuinERDDAP™Näet kovan Lipputiedosto,ERDDAP™Will:
    
    1. Poista kova lipputiedosto.
    2. Poistaa aineistonERDDAP.
    3. poistaa kaikki tiedot, jotkaERDDAP™tallennettu tähän tietoaineistoon.
For ForEDDGridFiles ja EDDTable Filesin alaluokat poistavat sisäisen tietokannan tiedostoista ja niiden sisällöstä.
Tietokannat kutenEDDGridSideBySide, jolla on lapsiDatasets, poistaa myös tietotiedostojen sisäisen tietokannan ja niiden sisällön kaikkien lasten tietoaineistojen osalta.
    4. Lataa tiedostot uudelleen.
For ForEDDGridFiles ja EDDTable Files subclasses, tämäERDDAP™Reread **Kaikki kaikki** tiedostoista. Reload-aika riippuu aineiston tiedostojen kokonaismäärästä. Koska aineisto on poistettuERDDAP™Kun kiintolevy havaittiin, aineistoa ei ole saatavilla, kunnes aineisto ladataan uudelleen. Ole kärsivällinen. Katso sisään[log.txt](#log)Jos haluat nähdä, mitä tapahtuu.
    
HardFlag-versio poistaa tietoaineiston tallennetut tiedot, vaikka aineistoa ei tällä hetkellä ladata.ERDDAP.
    
Kovaa Liput ovat erittäin hyödyllisiä, kun teet jotain, joka aiheuttaa muutoksenERDDAP™lukee ja tulkitsee lähdetietoja esimerkiksi asentamalla uuden versionERDDAP™jos olet tehnyt muutoksen tietoaineiston määritelmäändatasets.xml
    
* Lipun sisältö, huonot FilesFlag ja hardFlag-tiedostot ovat merkityksettömiä.ERDDAP™Katso tiedoston nimi saadaksesidatasetID.
     
* suurten aineistojen välissä,ERDDAP™Näyttää jatkuvasti lipun, huono-FilesFlag ja hardFlag-tiedostoja.
     
* Huomaa, että kun tiedostot ladataan uudelleen, kaikki tiedostot *isovanhemmat* //[Cash](#cached-responses)// *datasetID* Hakemisto on poistettu. Tämä sisältää.ncKuvatiedostot, jotka on yleensä kiinnitetty ~ 15 minuuttia.
     
* Huomaa, että jos aineiston xml sisältää[Aktiivinen = "väärä"](/docs/server-admin/datasets#active)lippu saa tietoaineiston toimimaan passiivisesti (Jos se on aktiivinen) ja joka tapauksessa ei ladattu.
     
* milloin tahansaERDDAP™käyttää LoadDatasets tehdä suuri lataus (aikaistettu uudelleenlataus ohjataan&lt;loadDatasetsMinMinutes&gt;) tai pieni lataus (ulkoisen tai sisäisen lipun seurauksena) ,ERDDAP™Lue kaikki&lt;masentunut CacheMaxGB&gt;&lt;masentunut CacheMaxMinutesOld &gt;&lt;käyttäjä &gt;,&lt;Blacklist &gt;,&lt;hidastaa troubleMillis &gt; ja&lt;TilausEmailBlacklist&gt;-tunnisteet ja siirtyminen uusiin asetuksiin. Voit käyttää lippua keinona saadaERDDAP™Huomaa muutokset näissä ASAP-tunnuksissa.

##### Aseta datan lippu{#set-dataset-flag} 
*  ERDDAP™on verkkopalvelu, jotta liput voidaan asettaa URL-osoitteen kautta.
    
    * Esimerkiksi,
         https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789   
         (Tämä on väärennetty lippu Keskeinen) Määritä lippu rPmelTao-tietokantaan.
    * Jokaiselle on erilainen lippudatasetID.
    * Hallinnoitsijat voivat nähdä luettelon lippu-URL-osoituksista kaikkiin tietoaineistoihin tarkastelemalla niiden pohjaa.[Päivittäinen raportti](#daily-report)sähköpostia.
    * Hallinnoitsijoiden on kohdeltava näitä URL-osoitteita luottamuksellisina, koska he antavat jollekin oikeuden palauttaa tietoaineisto halutessaan.
    * Jos luulet, että lippu on pudonnut jonkun käsiin, joka käyttää niitä väärin, voit muuttua.&lt;Lippukiekko »[Asennus.xml](/docs/server-admin/deploy-install#setupxml)uudelleenkäynnistysERDDAPpakottaaERDDAP™luoda ja käyttää erilaisia lippuja.
    * Jos vaihdat&lt;LippuKeyKey&gt;, poista kaikki vanhat tilaukset (Katso lista päivittäisessä raportissasi) Muista lähettää uudet URL-osoitteet ihmisille, joita haluat saada.
    
Lippujärjestelmä voi toimia tehokkaamman mekanismin perustana.ERDDAP™Kun lataat tietoaineiston uudelleen. Voit esimerkiksi määrittää tietoaineiston&lt;Reload "Kaikki minuutit" suureen määrään (10080 = 1 viikko) . Kun tiedät, että aineisto on muuttunut (Ehkä siksi, että olet lisännyt tiedoston tietoaineiston hakemistoon) Lataa lippu niin, että aineisto ladataan uudelleen mahdollisimman pian. Liput näkyvät yleensä nopeasti. Mutta jos LoadDataset-lanka on jo kiireinen, se voi olla aikaa ennen kuin se on käytettävissä lipussa. Lippujärjestelmä on paljon responsiivisempi ja tehokkaampi kuin asettaminen.&lt;Lataa EveryNMinutes &gt; pieneen määrään.
    
#### Tietojen poistaminen{#removing-datasets} 
Jos aineisto on aktiivinenERDDAP™haluat poistaa sen väliaikaisesti tai pysyvästi:
1. Sisällädatasets.xmlaineistoon, asetettu[Aktiivinen = "väärä"](/docs/server-admin/datasets#active)Dataset tag.
2. OdottaaERDDAP™poistaa tiedot seuraavan suuren latauksen aikana tai[Aseta lippu](#flag)aineiston kerrottavaksiERDDAP™Huomaa tämä muutos mahdollisimman pian. Kun teet tämän,ERDDAP™Se ei heittele mitään tietoja, joita se on tallentanut tietoaineistosta, eikä varmasti tee mitään todellisille tiedoille.
3. Sitten voit jättää aktiivisen = "väärin" tiedondatasets.xmltai poistaa sen.
         
#### Milloin tietoaineistot ladataan?{#when-are-datasets-reloaded} 
RunLoadDatasets-niminen lanka on master-lanka, joka ohjaa, kun tietoaineistot ladataan uudelleen. RunLoad Tiedot pysyvät:

1. RunLoadDataset huomioi ajan.
2. RunLoadDatasets aloittaa LoadDatasets-langan ”majorLoad”. Voit nähdä tietoja nykyisestä / aiemmasta päälyijystä yläosassa.ERDDAP&gt;
    [/erddap/status.htmlSivusivu sivu sivu sivu](#status-page)  (esimerkiksi[Esimerkki sivusta](https://coastwatch.pfeg.noaa.gov/erddap/status.html)) .
    
    1. LoadDatasets tekee kopiondatasets.xml.
    2. LoadDatasets lukee kopion kauttadatasets.xmlkunkin aineiston osalta katsotaan, onko tietoaineiston (Re) ladattu tai poistettu.
        * Jos a[Lippu](#flag)tiedosto on olemassa tätä tietoaineistoa varten, tiedosto poistetaan ja tietoaineisto poistetaan, jos aktiivinen = "väärä" tai (Re) aktiivinen = "totuus" (Tietoaineiston iästä riippumatta) .
        * Jos aineiston dataset.xml chunk on aktiivinen = "väärä" ja aineisto on tällä hetkellä ladattu (aktiivisen aktiivisen aktiivisen) Se on purkamaton (Poistettu) .
        * Jos aineisto on aktiivinen = "tosi" ja aineistoa ei ole jo ladattu, se ladataan.
        * Jos tietokanta on aktiivinen = "todellinen" ja tietoaineisto on jo ladattu, tiedot ladataan uudelleen, jos tietoaineiston ikä (Viimeisen kuorman jälkeen) suurempi kuin sen&lt;Reload Kaikki minuutit » (Oletusarvo = 10080 minuuttia) Muuten aineisto jää yksin.
    3. LoadDatasets päättyy
    
RunLoadDatasets-lanka odottaa LoadDatasets-langan valmistumista. Jos LoadDatasets kestää pidempään kuin loadDatasets Minuutit (asennus.xml) RunLoadDatasets keskeyttää LoadDatasets-langan. Ihannetapauksessa LoadDatasets huomaa keskeytyksen ja päättymisen. Mutta jos se ei huomaa keskeytystä minuutissa, RunLoadDatasets kutsuu loadDatasets. Pysäytä () mikä on toivomatonta.
3. Vaikka viimeksi mainitun levyn alkamisaika on pienempi kuin loadDatasets. Minuutit (asennus.xml, esim. 15 minuuttia) RunLoadDatasets etsii toistuvasti[Lippu](#flag)tiedostot sisällä *isovanhemmat* Flag-hakemisto. Jos yksi tai useampi lipputiedosto löytyy, ne poistetaan, ja RunLoadDatasets aloittaa LoadDatasets-langan tehdäkseen "minorLoad" (Lead = väärä) . Et voi nähdä pieniä tietojaERDDAP&gt;[/erddap/status.htmlSivusivu sivu sivu sivu](#status-page).
    1. LoadDatasets tekee kopiondatasets.xml.
    2. LoadDatasets lukee kopion kauttadatasets.xmlja jokaisesta tiedostosta, johon oli lipputiedosto:
        * Jos aineiston dataset.xml chunk on aktiivinen = "väärä" ja aineisto on tällä hetkellä ladattu (aktiivisen aktiivisen aktiivisen) Se on purkamaton (Poistettu) .
        * Jos aineisto on aktiivinen = "totuus", tietoaineisto on (Re) iästä riippumatta. Ei-liputettuja tietoaineistoja ei huomioida.
    3. LoadDatasets päättyy
4. RunLoad Tiedot palaavat vaiheeseen 1.

Huomautuksia:
* Startup
Kun aloitat uudelleenERDDAP™Jokainen aineisto, jossa on aktiivinen = "tosi" on ladattu.
* Cash
Kun aineisto on (Re) Kuormitettu, kätkö (tiedostot ja/tai kuvatiedostot) on tyhjentynyt.
* Paljon aineistoja
Jos sinulla on paljon tietoja ja/tai yksi tai useampi tietoaineisto on hidas. (Re) Kuorma, LoadDatasets-lanka voi kestää kauan työnsä loppuun saattamiseen, ehkä jopa pidempään kuin loadDatasets Minuutteja.
* LoadDatasets Thread
Koskaan ei ole enemmän kuin yksi LoadDatasets lanka käynnissä kerralla. Jos lippu asetetaan, kun LoadDatasets on jo käynnissä, lippua ei todennäköisesti huomaa tai toimi, kunnes LoadDatasets-lanka päättyy. Saatat sanoa: "Se on tyhmää. Miksi et vain aloita joukkoa uusia lankoja ladataksesi tietoaineistoja? Mutta jos sinulla on paljon tietoja, jotka saavat tietoja yhdestä etäpalvelimesta, yksikin LoadDatasets-lanka aiheuttaa huomattavaa stressiä etäpalvelimelle. Sama pätee, jos sinulla on paljon tiedostoja, jotka saavat tietoja yhdestä RAID-tiedostosta. On nopeasti vähentynyt tuotto on enemmän kuin yksi LoadDatasets lanka.
* Lippu = ASAP
Lipun asettaminen vain signaaleja siitä, että aineiston tulisi olla (Re) mahdollisimman pian, ei välttämättä heti. Jos LoadDataset-lanka ei ole käynnissä, tietoaineisto alkaa ladata uudelleen muutamassa sekunnissa. Mutta jos LoadDataset-lanka on käynnissä, tietoaineistoa ei todennäköisesti ladata uudelleen, ennen kuin LoadDatasets-lanka on valmis.
* Lipputiedosto poistettu
Yleensä, jos laitat lipputiedoston *isovanhemmat* /erddap/flag-hakemisto (Käymällä aineiston lipussa Url tai laittaa todellinen tiedosto siellä) Tiedostot ladataan yleensä pian sen jälkeen, kun lipputiedosto poistetaan.
* Flag Versus Small Reload Jokainen minuutti
Jos sinulla on ulkoinen tapa tietää, milloin tietoaineisto on ladattava uudelleen ja jos se sopii sinulle, paras tapa varmistaa, että tietoaineisto on aina ajan tasalla, on ladata sen uudelleen. Jokainen minuutti suureen määrään (10080?) Aseta lippu (Käsikirjoituksen kautta?) aina kun se on ladattava. Tämä on järjestelmä, jokaEDDGridFromErddapin ja EDDTableFromErddapin käyttö vastaanottaa viestejä, joita tietoaineisto on ladattava uudelleen.
* Näytä log.txt
Paljon asiaankuuluvia tietoja on kirjoitettu *isovanhemmat* /logs/log.txt-tiedosto. Jos asiat eivät toimi niin kuin odotat, katso kirjaa. Txt antaa sinun diagnosoida ongelman selvittämällä, mitäERDDAP™teki.
    
    * Etsi "majorLoad=true" alkuun suuri LoadDataset lanka.
    * Etsi "majorLoad=false" pienten LoadDataset-lankojen alkuun.
    * Etsi tiettyjä tietojadatasetIDTietoa siitä, että on (Re) ladattu tai kysely.
        
          
         
#### Katkaistu vastaus{#cached-responses} 
yleisesti,ERDDAP™Ei kätköjä (Tavaratalo) Vastaukset käyttäjäpyyntöihin. Suurin osa hakemuksista olisi hieman erilaisia, joten välimuisti ei olisi kovin tehokas. Suurimmat poikkeukset ovat kuvatiedostojen pyynnöt (jotka on kiinnitetty selaimiin ja ohjelmiin, kutenGoogle EarthUsein toistuvat kuvat) ja pyynnöt.nctiedostoja (Koska niitä ei voi luoda lennolla) .ERDDAP™tallentaa jokaisen tietoaineiston välimuistitiedostot toiseen hakemistoon: *isovanhemmat* /Cache/ *datasetID* Koska yhdellä välimuistihakemistolla voi olla valtava määrä tiedostoja, jotka voivat olla hitaita.
Tiedostot poistetaan kätköstä yhdestä kolmesta syystä:
* Kaikki tiedostot tässä välimuistissa poistetaan, kunERDDAP™on aloitettu uudelleen.
* Ajoittain tiedostoja enemmän kuin&lt;CacheMinutes &gt; Vanha (Kuten on määritelty[Asennus.xml](/docs/server-admin/deploy-install#setupxml)) poistetaan. tiedostojen poistaminen iän perusteella (Ei vähiten käytetty) Varmista, että tiedostot eivät pysy kätkössä kovin pitkään. Vaikka pyynnön pitäisi aina palauttaa sama vastaus, se ei pidä paikkaansa. Esimerkiksi atabledappyyntö, joka sisältää & Time &gt; *jotkut Aika-aika* Muuttuu, jos tietoaineistoon saapuu uusia tietoja. pyyntö, joka sisältää\\[Viimeinen viimeinen\\]Aikamitta muuttuu, jos tietoaineistoon saapuu uusia tietoja.
* Kuvat, jotka osoittavat virheellisiä olosuhteita, mutta vain muutaman minuutin ajan. (Se on vaikea tilanne) .
* Joka kerta, kun tietoaineisto ladataan uudelleen, kaikki tietoaineiston välimuistin tiedostot poistetaan. Koska pyynnöt voivat olla"last"Verkkotietoaineiston indeksi, välimuistin tiedostot voivat muuttua mitättömiksi, kun tietoaineistoa ladataan uudelleen.
         
#### Tallennettu tietoaineisto{#stored-dataset-information} 
kaikentyyppisille aineistoille,ERDDAP™kerää paljon tietoa, kun tietoaineisto on ladattu ja pitää sen muistissa. Tämä mahdollistaaERDDAP™vastata hyvin nopeasti hakuihin, tietoaineistoluetteloiden pyyntöihin ja tietoaineistoa koskeviin tietopyyntöihin.

Muutamia tiedostoja varten (erityisestiEDDGridKopioi, EDDTableCopyEDDGridFrom *XXXXXX* Tiedostot ja EDDTableFrom *XXXXXX* Tiedostot) ,ERDDAP™tallentaa levylle joitakin tietoja aineistosta, jota käytetään uudelleen, kun aineisto ladataan uudelleen. Tämä nopeuttaa huomattavasti reloading-prosessia.

* Osa tiedostoista on ihmisen luettavaa.jsontiedostot ja ne tallennetaan *isovanhemmat* /Dataase/ *Last2LettersOfDatasetID/datasetID* .
*   ERDDAP™poistaa nämä tiedostot vain epätavallisissa tilanteissa, esimerkiksi jos lisäät tai poistat muuttujan tietoaineistosta.datasets.xmlChunk.
* Suurin osa muutoksista tietoaineistoondatasets.xmlChunk (muun muassa globaalin attribuutin tai muuttuvan ominaisuuden muuttaminen) Älä vaadi, että poistat nämä tiedostot. Säännöllinen tietojen lataaminen käsittelee tällaisia muutoksia. Voit kertoaERDDAP™Reload "ASAP" asettamalla[Lippu](#flag)aineiston osalta.
* Tietotiedostojen lisääminen, poistaminen tai muuttaminen käsitellään myös silloin, kunERDDAP™palauttaa tietoaineiston. Mutta kuitenkinERDDAP™Huomaat tämän tyyppisen muutoksen pian ja automaattisesti, jos tietoaineistoa käytetään.&lt;Päivitä kaikki ns. (Docs/server-admin/datasets#updateeverynmillis) järjestelmä.
* Näiden tiedostojen poistaminen on harvoin välttämätöntä. Yleisin tilanne, jossa sinun täytyy pakottaaERDDAP™poistaa tallennetut tiedot (koska se on vanhentunut/epäkorrekti eikä sitä korjata automaattisesti.ERDDAP) Kun teet muutoksia tietoaineistoondatasets.xmlChunk, joka vaikuttaaERDDAP™tulkitsee tietoja lähdetiedostoissa, esimerkiksi muuttaa aikamuuttujan muotomerkkijonoa.
* poistaa tietoaineiston tallennetut tietotiedostot yhdestäERDDAP™Se juoksee (Vaikka aineistoa ei tällä hetkellä ladata) Aseta A[kovaa kovaa Lippu](#hard-flag)tätä dataa varten. Muista, että jos tietoaineisto on koossa suuri määrä tiedostoja, tietojen lataaminen voi kestää huomattavasti aikaa.
* poistaa tietoaineiston tallennetut tietotiedostot, kunERDDAP™ei juokse, juokse[Dasds](/docs/server-admin/datasets#dasdds)Tätä dataa (mikä on helpompaa kuin kuvaus, jossa hakemisto sijaitsee ja poistaa tiedostot käsin) . Muista, että jos tietoaineisto on koossa suuri määrä tiedostoja, tietojen lataaminen voi kestää huomattavasti aikaa.
         
### Muistitila{#memory-status} 
ERDDAP™Älä koskaan kaadu tai jäädytä. Jos näin on, yksi todennäköisimmistä syistä on riittämätön muisti. Voit seurata muistin käyttöä katsomalla status.html-verkkosivua, joka sisältää muun muassa

0 gc-puhelut, 0 pyyntöä ja 0 vaarallista Sähköposteja viimeisimmistä LoadDataseteista

 (Nämä ovat vähitellen vakavampia tapahtumia)   
MB InUse ja GC Calls sarakkeet tilastotaulukossa. Voit määrittää, miten muistisi stressaaERDDAP™Katsomalla näitä numeroita. Korkeammat luvut osoittavat enemmän stressiä.

* MB:n käyttö on aina alle puolet[\\-XMX-muistiasetukset](/docs/server-admin/deploy-install#memory). Suuremmat numerot ovat huono merkki.
* GC-puhelut kertovat, kuinka monta kertaaERDDAP™kutsutaan roskat keräilijä yrittää lievittää korkea muistin käyttöä. Jos tämä on &gt; 100, se on merkki vakavasta ongelmasta.
* jäljennös paljastaa saapuvien pyyntöjen määrän (HTTP-virhe numero 503, Palvelu ei ole käytettävissä) Muistin käyttö oli jo liian korkea. Ihannetapauksessa pyyntöjä ei saa jättää. On ihan ok, jos muutama pyyntö irtoaa, mutta merkki vakavista ongelmista, jos monet menetetään.
* vaarallisia vaarallisia vaarallisia vaarallisia vaarallisia MemoryEmails - Jos muistin käyttö muuttuu vaarallisen korkeaksiERDDAP™lähettää sähköpostia sähköpostiosoitteisiin, jotka on lueteltu&lt;Sähköposti kaikki &gt; (Asennus.xml) Aktiivisten käyttäjien pyyntöjen luettelo. Kuten sähköpostissa sanotaan, lähetä nämä sähköpostit Chrisille. Johanneksessa. Gov, jotta voimme käyttää tietoja parantaaksemme tulevia versioitaERDDAP.
     

Jos sinunERDDAP™Muistinvahvistus:
* Harkitse palvelimen muistin lisäämistäERDDAP™Muuttamalla Tomcatia[XMX-muistiasetukset](/docs/server-admin/deploy-install#memory).
* Jos olet jo varannut niin paljon muistia kuin voitERDDAP™-Xmx, harkitse lisämuistin ostamista palvelimellesi. Muisti on halpa (verrattuna uuden palvelimen tai aikasi hintaan) &#33;&#33; Lisää -XMX
* Sisällädatasets.xmlSetti&lt;nGridThreads &gt; 1&lt;ntableThreads &gt; 1, ja aseta&lt;ipAddressMaxRequestsActive &gt; 1.
* Katso pyynnöt log.txt tehoton tai hankala (Laillinen) pyyntöjä. Lisää IP-osoitteet&lt;Pyydä ilmaista » Sisällädatasets.xml. Mustan listan virheilmoitus sisältääERDDAP™ylläpitäjän sähköpostiosoite toivoen, että nämä käyttäjät ottavat sinuun yhteyttä, jotta voit työskennellä heidän kanssaan.ERDDAP™tehokkaammin. On hyvä pitää luettelo IP-osoitteista, jotka olet musta lista ja miksi, jotta voit työskennellä käyttäjien kanssa, jos he ottavat sinuun yhteyttä.
* Katso pyynnöt log.txt haitallisten käyttäjien pyyntöihin. Lisää IP-osoitteet&lt;Pyydä ilmaista » Sisällädatasets.xml. Jos samankaltaiset pyynnöt tulevat useasta samankaltaisesta IP-osoitteesta, voit käyttää joitain palveluja. (esim.[ https://www.whois.com/whois/ ](https://www.whois.com/whois/)) selvittää IP-osoitteiden valikoima kyseisestä lähteestä ja mustalle listalle koko alue. Näe [&lt;Pyydä musta lista &gt; dokumentit (Docs/server-admin/datasets#requestblacklist Näytä tarkat tiedot) .
         
#### OutMemory-virhe{#outofmemoryerror} 
Kun olet asentanutERDDAP™Määrität muistin enimmäismäärän, jokaJavavoi käyttää kautta[\\-XMX-asetukset](/docs/server-admin/deploy-install#memory). JosERDDAP™Koskaan tarvitaan enemmän muistia, se heittää javan. Lang. OutofMemory Virhe.ERDDAP™tekee paljon tarkastuksia, jotta se pystyy käsittelemään tätä virhettä armollisesti. (Esim. pyyntö epäonnistuu, mutta järjestelmä säilyttää rehellisyytensä.) . Joskus virhe vahingoittaa järjestelmän eheyttä ja sinun on aloitettava uudelleen.ERDDAP. Toivottavasti se on harvinaista.

Helppo ja nopea ratkaisu OutOfMemory-virheeseen on lisätä[\\-XMX-asetukset](/docs/server-admin/deploy-install#memory), mutta sinun ei pitäisi koskaan lisätä Xmx-asetusta yli 80 % palvelimen fyysisestä muistista. (Esimerkiksi 10GB-palvelimelle älä aseta -Xmx yli 8GB) . Muisti on suhteellisen halpa, joten se voi olla hyvä vaihtoehto lisätä muistia palvelimessa. Mutta jos olet maksimoinut muistin palvelimessa tai muista syistä ei voi lisätä sitä, sinun täytyy käsitellä enemmän suoraan OutOfMemoryError.

Jos katsot sisään[log.txt](#log)tiedostoja, jotka katsovat mitäERDDAP™Kun virhe syntyi, voit yleensä saada hyvän vihjeen OutOfMemoryErrorin syystä. On monia mahdollisia syitä, kuten:

* Yksi suuri tietotiedosto voi aiheuttaa OutOfMemoryError, erityisesti valtava ASCII-tiedostoja. Jos tämä on ongelma, se on selvää, koskaERDDAP™ei lataa tietoja (Tabular-datavarat) tai lukea tietoja tästä tiedostosta (Verkossa olevat tietoaineistot) . Ratkaisu, jos mahdollista, on jakaa tiedosto useisiin tiedostoihin. Ihannetapauksessa voit jakaa tiedoston loogisiin ketjuihin. Esimerkiksi, jos tiedostossa on 20 kuukauden datan arvo, jaa se 20 tiedostoon, joista jokaisella on 1 kuukauden tiedot. Mutta on olemassa etuja, vaikka päätiedosto on jaettu mielivaltaisesti. Näillä menetelmillä on useita etuja: a) Tämä vähentää muistin tarvetta lukea tiedostoja 1/20, koska vain yksi tiedosto luetaan kerrallaan. b) usein,ERDDAP™voi käsitellä pyyntöjä paljon nopeammin, koska sen on vain katsottava yhdestä tai muutamasta tiedostosta löytääkseen tiedot tietystä pyynnöstä. c) Jos tietojen kerääminen on käynnissä, olemassa olevat 20 tiedostoa voivat pysyä muuttumattomina, ja sinun on muutettava vain yhtä, pientä ja uutta tiedostoa lisätäksesi seuraavan kuukauden tietojen arvon tietokantaan.
* Yksi suuri pyyntö voi aiheuttaa OutOfMemory-virheen. Erityisesti jotkutorderByVaihtoehtoja on koko vastaus muistiin toiselle (Esim. tehdä jonkinlainen) . Jos vastaus on suuri, se voi johtaa virheeseen. Aina löytyy pyyntöjä, jotka ovat monella tapaa liian suuria. Voit ratkaista ongelman lisäämällä -XMX-asetusta. Voit myös kannustaa käyttäjää tekemään pieniä pyyntöjä.
* On epätodennäköistä, että suuri määrä tiedostoja aiheuttaa tiedostoindeksin, ettäERDDAP™Se on niin suuri, että tiedosto aiheuttaa virheen. Jos oletamme, että jokainen tiedosto käyttää 300 tavua, 1 000 000 tiedostoa kestää vain 300 Mt. Tiedot, joissa on valtava määrä tiedostoja, aiheuttavat muita ongelmiaERDDAPErityisesti se vie kauan aikaaERDDAP™avata kaikki nämä tietotiedostot vastatessaan käyttäjän tietopyyntöön. Tässä tapauksessa ratkaisu voi olla tiedostojen yhdistäminen niin, että tiedostoja on vähemmän. Tabulaarisissa tietoaineistoissa on usein hienoa tallentaa tietoja nykyisestä tietoaineistosta.[CF Discrete Sampling Geometria (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Ragged Array -tiedostot (Pyydä.ncCF-tiedostojaERDDAP) Tee sitten uusi tietokanta. Nämä tiedostot voidaan käsitellä erittäin tehokkaastiERDDAP&gt;[EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromnccffiles). Jos se on loogisesti järjestetty (Jokaisella on dataa avaruuden ja ajan huipulle) ,ERDDAP™Tiedot voidaan kerätä erittäin nopeasti.
* Tabulaariset aineistot, jotka käyttävät [&lt;subsetVariables&gt; (Docs/server-admin/datasets#subsetvariables Näytä tarkat tiedot) attribuutti,ERDDAP™muodostaa taulukon, jossa yhdistyvät näiden muuttujien arvot. suuria tietoja tai milloin&lt;subsetVariables&gt; on väärin määritetty, tämä pöytä voi olla riittävän suuri OutOfMemoryErrorsin aiheuttamiseksi. Ratkaisu on poistaa muuttujia luettelosta.&lt;subsetVariables&gt; jolla on suuri määrä arvoja tai muuttujia tarpeen mukaan, kunnes taulukon koko on kohtuullinen. osienERDDAP™Tämä käyttääsubsetVariablesJärjestelmä ei toimi hyvin (Esimerkiksi verkkosivut latautuvat hitaasti) pöydässä on yli 100 000 riviä.
* On aina mahdollista, että useita samanaikaisia pyyntöjä (Todella kiireinenERDDAP) Se voi aiheuttaa muistiongelmia. Esimerkiksi 8 pyyntöä, joista jokainen käyttää 1GB: tä, aiheuttaisi ongelmia Xmx=8GB:n asennuksessa. On kuitenkin harvinaista, että jokainen pyyntö on samanaikaisesti käytössään. Sinä näet helposti, että sinunERDDAP™Se on todella kiireinen suurien pyyntöjen kanssa. Mutta se on mahdollista. On vaikea ratkaista tätä ongelmaa muuten kuin lisäämällä XMX-asetusta.
* On muitakin skenaarioita. Jos katsoo[log.txt](#log)tiedostoja, jotka katsovat mitäERDDAP™Kun virhe syntyi, saat yleensä hyvän vihjeen syystä. Useimmissa tapauksissa on olemassa keino minimoida ongelma. (ylhäällä) Joskus tarvitset vain enemmän muistia ja korkeamman -Xmx-asetuksen.
         
### Liikaa avoimia tiedostoja{#too-many-open-files} 
AloitetaanERDDAP™2.12,ERDDAP™avoimien tiedostojen määrän seurantajärjestelmä (joka sisältää sukkia ja muita asioita, ei vain tiedostoja) Tomcatissa Linux-tietokoneissa. Jos jotkut tiedostot virheellisesti eivät koskaan sulje ("resurssivuoto") Avoimien tiedostojen määrä voi kasvaa, kunnes se ylittää käyttöjärjestelmän salliman enimmäismäärän ja lukuisia todella huonoja asioita tapahtuu. Linux-tietokoneissa (Koska tietoja ei ole saatavilla Windowsille) :

* On olemassa "Open Files" -sarake status.html-sivun oikealla puolella, jossa näkyy max-tiedostojen prosenttiosuus. Windowsissa se vain näyttää.”
* MilloinERDDAP™tuottaa nämä tiedot jokaisen merkittävän tietoaineiston latauksen lopussa, se tulostaa lokiin. Txt-tiedosto:
OpenFileCount = *Nykyinen* max= *maxx* % = % *% %* 
* Jos prosenttiosuus on &gt; 50 %, sähköposti lähetetäänERDDAP™Järjestäjä ja sähköposti Kaikki kaikessa sähköpostiosoitteisiin.

Jos prosenttiosuus on 100%,ERDDAP™on hirvittävissä vaikeuksissa. Älä anna tämän tapahtua.
Jos prosenttiosuus on 75 %,ERDDAP™on lähellä kauheita ongelmia. Se ei ole ok.
Jos prosenttiosuus on &gt; 50 %, on erittäin mahdollista, että piikki aiheuttaa prosenttiosuuden 100: een.
Jos prosenttiosuus on &gt; 50 %, kannattaa:
* Lisätään avoimien tiedostojen enimmäismäärää:
    * Tee nämä muutokset joka kerta ennen kuin aloitat Tomcatin (Tomcat startup.sh -tiedostoon.) :
Tekijä: Hn 16384
Pääartikkeli: Sn 16384
    * tai pysyvä muutos muokkaamalla (kuin juuret) /etc/security/limits.conf ja linkkien lisääminen:
Tomcat soft nofile 16384
Tomcat hard nofile 16384 (käytetty)
Nämä komennot olettavat, että Tomcatin käyttäjää kutsutaan Tomcatiksi.
Monissa Linux-versioissa palvelimen on aloitettava uudelleen näiden muutosten toteuttamiseksi. Molemmissa vaihtoehdoissa ”16384” on esimerkki. Valitset sen numeron, jonka luulet olevan paras.
* Käynnistä uudelleenERDDAP. Käyttöjärjestelmä sulkee kaikki avoimet tiedostot.
         
### Epäonnistuneet pyynnöt{#failed-requests} 
*    **Epätavallinen toiminta: 25 % hakemuksista epäonnistui**   
osana jokaista reloadDatasetia, joka on yleensä 15 minuutin välein,ERDDAP™tarkastelee pyyntöjen prosenttiosuutta, joka on epäonnistunut viimeisimpien reloadDatasetien jälkeen. Jos &gt; 25 %,ERDDAP™Lähetä sähköpostiaERDDAP™Aiheena on ”Unusual Activity: &gt; 25 % pyynnöistä epäonnistui”. Sähköposti sisältää pohjan läheisyydessä olevaa tekstiä ”Requester’s IP Address” (Epäonnistunut)   (Edellinen Major LoadDatasets) ". Etsikää sitä. Se kertoo tietokoneiden IP-osoitteen, joka tekee epäonnistuneimmat pyynnöt. Voit sitten etsiä näitä IP-osoitteita\\[isovanhemmat\\]/logit /[log.txt](#log)Katso, millaisia pyyntöjä he tekevät.
    
Voit käyttää käyttäjän IP-numeroa (esimerkiksi[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)) Mieti, kuka tai mikä käyttäjä on. Joskus se kertoo, kuka käyttäjä on. (Esimerkki: Se on hakukoneen verkko-ohjain.) . Suurimman osan ajasta se vain antaa sinulle vihjeen (Esimerkiksi, se on amazonaws tietokone, se on jostain yliopistosta, se on joku tietyssä kaupungissa.) .
    
Tarkastelemalla todellista pyyntöä, IP-numeroa ja virheilmoitusta (kaikista[log.txt](#log)) Joissakin virheissä voit yleensä selvittää, mitä tapahtuu väärin. Kokemuksessani on neljä yleistä syytä epäonnistuneisiin pyyntöihin:
    
1) Pyynnöt ovat haitallisia (Etsimme esimerkiksi tietoturvan heikkouksia tai teemme pyyntöjä ja peruutamme ne ennen kuin ne on saatettu päätökseen.) . Sinun pitäisi käyttää&lt;Pyydä ilmaista » Sisällädatasets.xmlMustalle listalle nämä IP-osoitteet.
    
2. Hakukone yrittää naiivisti URL-osoitteitaERDDAP™ISO 19115 -asiakirjat. On olemassa monia paikkoja, jotka listaavat pohjan.OPeNDAPURL esimerkiksi https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST johon käyttäjän on tarkoitus lisätä tiedostotyyppi (esim. .das, .dds, .html) . Hakukone ei tiedä tätä. URL-osoitteen pyyntö epäonnistuu. Liittyy tilanteeseen, jossa hakukone tuottaa outoja pyyntöjä tai yrittää täyttää lomakkeita päästäkseen piilotettuihin sivuihin. Hakukoneet tekevät usein huonoa työtä, mikä johtaa epäonnistumisiin. Ratkaisu on: luoda[Robotit.txt](#robotstxt)tiedosto.
    
Jotkut käyttäjät käyttävät käsikirjoitusta, joka toistuvasti pyytää jotain, joka ei ole siellä. Ehkä se on aineisto, joka on ollut olemassa, mutta nyt se on mennyt. (tilapäisesti tai pysyvästi) . Kirjoitukset eivät useinkaan odota tätä, joten älä käsittele sitä älykkäästi. Käsikirjoitus tekee pyyntöjä ja pyynnöt epäonnistuvat. Jos voit arvata, kuka käyttäjä on (IP-numero yläpuolella) Ota yhteyttä heihin ja kerro heille, että aineistoa ei ole enää saatavilla ja pyydä heitä muuttamaan käsikirjoitustaan.
    
4) Jotain on tosiaan vialla. yleensä,ERDDAP™Tämä tekee ongelmallisesta tietoaineistosta inaktiivisen. Joskus se ei ole, joten kaikki pyynnöt aiheuttavat vain virheitä. Jos näin on, korjaa ongelma tietoaineiston tai (Jos et voi) Määritä aineiston[Aktiivinen = "väärä"](/docs/server-admin/datasets#active). Tämä voi johtaa ongelmaan #2.
    
Joskus virheet eivät ole niin pahoja, josERDDAP™voi havaita virheen ja reagoida nopeasti (&lt;= 1 ms. Joten voit päättää olla ryhtymättä mihinkään.
    
Jos kaikki muu epäonnistuu, on olemassa universaali ratkaisu: lisää käyttäjän IP-numero&lt;Pyydä musta lista » (Docs/server-admin/datasets#requestblacklist Näytä tarkat tiedot) . Se ei ole niin paha tai niin radikaali vaihtoehto kuin miltä se näyttää. Käyttäjä saa virheilmoituksen, jossa sanotaan, että hän on mustalle listalle ja kertoo heille (TheERDDAP™Hallinnoitsijan) sähköpostiosoite. Joskus käyttäjä ottaa sinuun yhteyttä ja voit ratkaista ongelman. Joskus käyttäjä ei ota sinuun yhteyttä ja näet saman käytöksen tulevan eri IP-numerosta seuraavana päivänä. Mustaa uusi IP-numero ja toivoa, että se lopulta saa viestin. (Tämä on sinun Groundhog-päiväsi, josta et koskaan pääse pakoon. Anteeksi.) 
    
### Robotit.txt{#robotstxt} 
Hakukoneyritykset käyttävät verkko-ohjaimia (Esimerkiksi Google Botti) tutkia kaikki sivuston sivut lisätäksesi sisällön hakukoneisiin. For ForERDDAP™Se on pohjimmiltaan hyvä.ERDDAP™Sivujen välillä on paljon linkkejä, joten indeksoijat löytävät kaikki verkkosivut ja lisäävät ne hakukoneisiin. Sitten hakukoneiden käyttäjät löytävät tietoaineistoja hakukoneistasi.ERDDAP.
    
Valitettavasti jotkut web-ryömijät (Esimerkiksi Google Botti) Täytä ja lähetä lomakkeita lisäsisällön löytämiseksi. Verkkokauppasivustoille tämä on hyvä. Mutta tämä on kauheaaERDDAP™koska se johtaa vain **ääretöntä** epätoivottujen ja tarkoituksettomien tietojen määrä. Tämä voi johtaa enemmän tietopyyntöihin kuin kaikki muut käyttäjät yhteensä. Ja se täyttää hakukoneen goofy, merkityksettömiä alijoukkoja todellisia tietoja.
    
Jos haluat kertoa verkko-ohjaimille, että lopetat lomakkeiden täyttämisen ja et yleensä katso verkkosivuja, joita heidän ei tarvitse katsoa, sinun on luotava tekstitiedosto, jota kutsutaan tekstitiedostoksi.[Robotit.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)verkkosivustosi dokumenttihierarkian juurihakemistossa, jotta kuka tahansa voi nähdä sen esimerkiksi http://*www.your.domain*/robots.txt .
Jos luot uusia robotteja. Txt-tiedosto, tämä on hyvä alku:
```
    User-Agent: \\*
    Disallow: /erddap/files/ 
    Disallow: /files/ 
    Disallow: /images/ 
    Disallow: /\\*?
    Disallow: /\\*?\\*
    Disallow: /\\*.asc\\*
    Disallow: /\\*.csv\\*
    Disallow: /\\*.dods\\*
    Disallow: /\\*.esriAscii\\*
    Disallow: /\\*.esriCsv\\*
    Disallow: /\\*.geoJson\\*
    Disallow: /\\*.htmlTable\\*
    Disallow: /\\*.json\\*
    Disallow: /\\*.mat\\*
    Disallow: /\\*.nc\\*
    Disallow: /\\*.odvTxt\\*
    Disallow: /\\*.tsv\\*
    Disallow: /\\*.xhtml\\*
    Disallow: /\\*.geotif\\*
    Disallow: /\\*.itx\\*
    Disallow: /\\*.kml\\*
    Disallow: /\\*.pdf\\*
    Disallow: /\\*.png\\*
    Disallow: /\\*.large\\*
    Disallow: /\\*.small\\*
    Disallow: /\\*.transparentPng\\*
    Sitemap: http://***your.institutions.url***/erddap/sitemap.xml
```
     (korvaaminen *Tekijät.url* sinun kanssasiERDDAPURL-osoite.)   
Hakukoneiden huomaaminen voi kestää muutaman päivän ja muutosten voimaantulon.
     
### Map.xml{#sitemapxml} 
Kuten[ https://www.sitemaps.org ](https://www.sitemaps.org/)WEB sanoo:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

Itse asiassa, koskaERDDAP™onRESTfulHakukonehämähäkit voivat helposti ryöstääERDDAP. He tekevät sitä useammin (Päivittäin&#33;) Tarvittaessa (kuukausittain?) .

* Koska jokainen hakukone voi ryöstää kokoERDDAP™Joka päivä tämä voi aiheuttaa paljon tarpeettomia pyyntöjä.
* NiinpäERDDAP™Luo sivustokartta.xml-tiedostonERDDAP™joka kertoo hakukoneet, ettäERDDAP™Pitää vain ryöstää joka kuukausi.
* Sinun pitäisi lisätä viittausERDDAPSivukartta.xml sinun[Robotit.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)tiedosto:
Sivustokartta: http://**www.yoursite.org**/erddap/sitemap.xml
 
* Jos tämä ei näytä saavan viestiä crawlers, voit kertoa eri hakukoneita sivustokartta.xml-tiedostosta käymällä näissä URL-osoitteissa. (Muutos **Instituuttisi** laitoksen lyhennys tai lyhentäminen ja **www.yoursite.org** sinunERDDAPURL) :
    *    https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
 
    *    https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(I Ajattele, että sinun tarvitsee vain käyttää hakukonetta kerran, koko ajan. Hakukoneet havaitsevat sitten muutoksia sivustokarttaan.xml säännöllisesti.
     
### Tietojen levittäminen / Data Distribution Verkostot:PushjaPullTeknologiatekniikka{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* normaalisti,ERDDAP™Toimii välittäjänä: se vaatii käyttäjältä pyynnön, saa tietoja etätietolähteestä, uudistaa tietoja ja lähettää sen käyttäjälle.
*   [PullTeknologiatekniikka](https://en.wikipedia.org/wiki/Pull_technology):ERDDAP™myös kyky saada kaikki saatavilla olevat tiedot aktiivisesti etätietolähteestä ja[tallentaa paikallisen kopion tiedoista](/docs/server-admin/datasets#eddgridcopy).
*   [PushTeknologiatekniikka](https://en.wikipedia.org/wiki/Push_technology): KäyttämälläERDDAP&gt;[Tilauspalvelut](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)muut palvelimet voidaan ilmoittaa heti, kun uusia tietoja on saatavilla, jotta ne voivat pyytää tietoja. (vetämällä dataa) .
*   ERDDAP&gt;[EDDGridLähde: Eddap](/docs/server-admin/datasets#eddfromerddap)ja[EdDTableFromDap](/docs/server-admin/datasets#eddfromerddap)käyttääERDDAPtilauspalvelut ja[Lippujärjestelmä](#flag)ilmoitetaan heti, kun uusia tietoja on saatavilla.
* Voit yhdistää nämä suureksi vaikutukseksi: jos haluatEDDGridKopioi ympärillesiEDDGridLähde: Erddap (tai kääri EDDTableCopy EDDTableFromErddapin tietoaineiston ympärille) ,ERDDAP™luo ja ylläpitää automaattisesti paikallista kopiota toisestaERDDAP"Tiedot.
* Koska tilauspalvelut toimivat heti, kun uusia tietoja on saatavilla, työnnystekniikka levittää tietoja nopeasti. (Sekunneissa) .

Tämä arkkitehtuuri asettaa jokaisenERDDAP™ylläpitäjä, joka vastaa siitä, missä tiedot hänenERDDAP™tulee.

* Muut muutERDDAP™Hallitsijat voivat tehdä samoin. Hallintoviranomaisten välillä ei ole tarvetta koordinoida.
* Jos montaERDDAP™Järjestäjät linkittävät toistensaERDDAPTietojen jakeluverkosto muodostuu.
* Tiedot levitetään nopeasti, tehokkaasti ja automaattisesti tietolähteistä. (ERDDAPS ja muut palvelimet) Tietojen uudelleenjakelusivustot (ERDDAPs) missä tahansa verkostossa.
* annettuERDDAP™Se voi olla sekä tietolähde joillekin tietoaineistoille että jakelusivusto muille aineistoille.
* Tuloksena oleva verkosto on suunnilleen samanlainen kuin datanjakeluverkot, jotka on perustettu ohjelmilla, kuten[UnidataIDM/IDM](https://www.unidata.ucar.edu/projects/index.html#idd)Vähemmän jäykkä rakenne.
         
### Turvallisuus, todentaminen ja lupa{#security-authentication-and-authorization} 
oletusarvoisesti,ERDDAP™Toimi täysin julkisena palvelimena (käyttäenhttpja/taihttps) Ilman login ([Todentaminen](https://en.wikipedia.org/wiki/Authentication)) Järjestelmä ja rajoitukset tiedonsaantiin ([Valtuutus](https://en.wikipedia.org/wiki/Authorization)) .

#### Turvallisuusturvallisuus{#security} 
Jos haluat rajoittaa pääsyn joihinkin tai kaikkiin tietoaineistoihin, voit käyttääERDDAPSisäänrakennettu turvallisuusjärjestelmä. Kun turvajärjestelmä on käytössä:

*   ERDDAP™käyttää[Roolipohjainen pääsynvalvonta](https://en.wikipedia.org/wiki/Role-based_access_control).
    * TheERDDAP™Järjestäjä määrittelee käyttäjät [&lt;Käyttäjä &gt; (Docs/server-admin/datasets#user Näytä tarkat tiedot) Tag indatasets.xml. Jokaisella käyttäjällä on käyttäjätunnus, salasana (jos todentaminen = tunnistus) Yksi tai useampia rooleja.
    * TheERDDAP™Hallinnoitsija määrittää, mitkä roolit ovat pääsy tiettyyn tietoaineistoon [-]&lt;Käytettävyys &gt; (Docs/server-admin/datasets#accessibleto Näytä tarkat tiedot) Tag indatasets.xmljokaiseen tietoaineistoon, jolla ei ole julkista pääsyä.
* Käyttäjän kirjautumistila (Linkki sisään / ulos) Näytetään jokaisen sivun yläreunassa. (Käyttäjän kirjautuminen näyttääERDDAP™olla kirjautumatta sisään, jos hän käyttäähttpURL.) 
* Jos&lt;BaseUrl &gt; että määrität asennus.xml on **http** URL, käyttäjät, jotka eivät ole kirjautuneet sisään, voivat käyttääERDDAP&gt; **http** URL-osoitteita. Jos&lt;Spotify on myös määritelty, käyttäjät, jotka eivät ole kirjautuneet sisään, voivat myös käyttäähttpsURL-osoitteita.
* Vain HTTPS - Jos&lt;BaseUrl &gt; että määrität asennus.xml on **https** URL-osoitetta, käyttäjiä, jotka eivät ole kirjautuneet sisään, kannustetaan (Ei pakotettu) käyttääERDDAP&gt; **https** URL-osoitteet - kaikki linkitERDDAP™Verkkosivuilla viitataanhttpsURL-osoitteita.
    
Jos haluat käyttää käyttäjiähttpsURL, lisää redirect pysyvä linja sisällä&lt;VirtualHost \\*:80&gt;-osio Apachen konfigurointitiedostossa (Yleensä yleensähttpd.conf) esim.
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

Jos haluat, on olemassa lisämenetelmä, joka pakottaahttps: [HTTP:n tiukka liikenneturvallisuus (HS) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security). käyttää sitä:
    
    1. Apache Headers -moduuli: A2enmod-otsikot
    2. Lisätietoja HTTPS VirtualHost -direktiivistä. Maksimi-ikä mitataan sekunneissa, ja se voidaan asettaa pitkälle arvolle.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
Huomaa, että tämä otsikko on voimassa vain HTTPS-virtualHostissa.
    
Syy olla pakottamatta käyttäjiä käyttämäänhttpsURL-osoitteet: taustalla oleva SSL/TLS-linkki vie aikaa luoda ja sen jälkeen vie aikaa salata ja purkaa kaikki käyttäjän ja palvelimen välittämät tiedot. Jotkut instituutiot vaativathttpsVain.
    
* Käyttäjien, jotka ovat kirjautuneet sisään, on käytettäväERDDAP&gt; **https** URL-osoitteita. Jos he käyttäväthttpURL-osoitteet, ne näyttävätERDDAP™olla kirjautumatta sisään. Näin varmistetaan viestinnän yksityisyys ja estetään[Istuntokaappaus ja sidejacking](https://en.wikipedia.org/wiki/Session_hijacking).
* Kuka tahansa, joka ei ole kirjautunut sisään, voi käyttää ja käyttää julkisia tietoaineistoja. Oletusarvoisesti yksityiset tietoaineistot eivät näy tietoaineistojen luetteloissa, jos käyttäjä ei ole kirjautunut sisään. Jos järjestelmänvalvoja on asentanut.xml&lt;PrivateDatasets &gt; totta, ne näkyvät. Yritykset pyytää tietoja yksityisiltä tietoaineistoilta (Jos käyttäjä tietää URL-osoitteen) Ne ohjataan uudelleen kirjautumissivulle.
* Kuka tahansa, joka on kirjautunut sisään, voi nähdä ja pyytää tietoja mistä tahansa julkisesta tietoaineistosta ja mistä tahansa yksityisestä tietoaineistosta, johon heidän roolinsa sallii pääsyn. Oletusarvoisesti yksityiset tietoaineistot, joihin käyttäjällä ei ole pääsyä, eivät näy tietoaineistojen luetteloissa. Jos järjestelmänvalvoja on asentanut.xml&lt;PrivateDatasets &gt; totta, ne näkyvät. Yritykset pyytää tietoja yksityisistä tietoaineistoista, joihin käyttäjällä ei ole pääsyä, ohjataan kirjautumissivulle.
* TheRSSTäysin yksityisiä tietoaineistoja koskevat tiedot ovat vain käyttäjien saatavilla. (jaRSSLukijat) jotka ovat kirjautuneet sisään ja valtuuttaneet käyttämään näitä tietoja. Tämä tekeeRSSEi kovin hyödyllistä täysin yksityisille aineistoille.
    
Jos aineisto on yksityinen, mutta [&lt;grafiikka » (Docs/server-admin/datasets#graphsaccessibleto Näytä tarkat tiedot) Se on tarkoitettu julkiseksi, tietoaineistonRSSon kaikkien saatavilla.
    
* Sähköpostitilaukset voidaan asettaa vain, kun käyttäjällä on pääsy tietoaineistoon. Jos käyttäjä tilaa yksityisen tietoaineiston, tilaus jatkuu käyttäjän kirjautumisen jälkeen.

##### Turvallisuuden asettaminen{#setup-security} 
Turvallisuus-/valtuutusjärjestelmä:

* Tee standardiERDDAP™ [Alkuperäinen asennus](/docs/server-admin/deploy-install).
* Sisällä[Asennus.xml](/docs/server-admin/deploy-install#setupxml),
    * Lisää / Change the&lt;Todennus &gt; arvoa tyhjästä räätälöityyn (Älä käytä tätä) Sähköposti (Älä käytä tätä) Google (Suositeltu) Orcid (Suositeltu) Oauth2 tai (Google+orcid, suositeltu) . Katso kommentit näistä vaihtoehdoista alla.
    * Lisää / Change the&lt;BaseHttpsUrl &gt; Lisäarvoa
    * Insert / Uncomment&loginInfo;Sisällä&lt;StarBodyHtml &gt; Näyttää käyttäjän kirjautumistiedot / ulos jokaisen sivun yläreunassa.
* testaustarkoituksiin henkilökohtaisella tietokoneella,[Seuraa näitä ohjeita määrittää Tomcat tukemaan SSL](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)  (perustanhttpsLiitännät) Avainsanat, joissa on[Itse allekirjoitettu todistus](https://en.wikipedia.org/wiki/Self-signed_certificate)ja muuttamalla *Tom* /Conf/server.xml, jotta portin 8443 liitin voidaan poistaa. Windowsissa saatat joutua siirtämään .keystorea C: stä *Sinä* .keystore: C: Käyttäjät .deystore tai c:.keystore (Katso nähkää *Tom* Katalina / Katalina *Tänään tänään* .log jos sovellus ei lataudu tai käyttäjät eivät näe kirjautumista sivulla) . Voit nähdä, milloin .keystore-sertifikaatti päättyy tutkimalla todistuksen kirjautuessa sisään.
    
Julkisesti saatavilla olevalle palvelimelle, sen sijaan, että käyttäisit itse allekirjoitettua sertifikaattia, on erittäin suositeltavaa, että ostat ja asennat todistuksen, joka on allekirjoitettu.[Sertifikaatti](https://en.wikipedia.org/wiki/Certificate_authority)koska se antaa asiakkaillesi enemmän varmuutta siitä, että he ovat yhteydessä toisiinsa.ERDDAP™Ei mikään man-in-the-middle-versioERDDAP. Monet myyjät myyvät digitaalisia todistuksia. (Etsi web.) Ne eivät ole kalliita.
    
* Linux-tietokoneissa, jos Tomcat toimii Apachessa, muokkaahttpd/conf.d/ssl.conf-tiedosto, jonka avulla HTTPS-liikenne voidaanERDDAP™ilman URL-osoitteen :8443 porttinumeroa:
    1. Muokkaa olemassa olevaa&lt;VirtualHost &gt; Tag (Jos on yksi) tai lisätä tiedoston lopussa niin, että sillä on ainakin nämä linkit:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. Käynnistä Apache uudelleen: /usr/sbin/apachectl K Graceful (Joskus se on toisessa hakemistossa.) .
* Sisällä *Tom* /conf/server.xml, portti = 8443&lt;Linkki &gt; Tag:
```
    <Connector port="8443" 
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
        <Certificate certificateKeystoreFile="conf/localhost-rsa.jks" 
            type="RSA" />
        </SSLHostConfig>
    </Connector>
```
Vaihda sertifikaatin sijainti.
##### Valtuutus{#authorization} 
*   [Sisällädatasets.xmlluodaan](#authorization)[...]&lt;Käyttäjä &gt; (Docs/server-admin/datasets#user Näytä tarkat tiedot) Jokaiselle käyttäjälle käyttäjätunnus, salasana (jos kortti = tulli) ja rooleista tietoa. Tämä on luvan osaERDDAPturvajärjestelmä.
     
* Sisällädatasets.xmlLisätään [&lt;Käytettävyys &gt; (Docs/server-admin/datasets#accessibleto Näytä tarkat tiedot) Kuhunkin tietoaineistoon, jolla ei ole julkista pääsyä.&lt;Käytettävissä oleva To &gt;-toiminto määrittää, mitkä roolit ovat käytettävissä kyseiseen tietoaineistoon.
     
* Käynnistä Tomcat uudelleen. Ongelmia? Katso Tomcat-lokit
     
* Valitse työsi&#33; Jokainen virhe voi johtaa turvavirheeseen.
     
* Tarkista, että sivu käyttäähttps  (Ei ei eihttp) . Yritys kirjautua sisäänhttptulee automaattisesti ohjatahttpsSatama 8443 (Vaikka satamanumero voidaan piilottaa Apache-välilehden kautta) . Saatat joutua työskentelemään verkon ylläpitäjän kanssa, jotta ulkoiset verkkopyynnöt voivat käyttää porttia 8443 palvelimellasi.
     
* Voit muuttaa&lt;Käyttäjä &gt; ja&lt;Etusivu &gt; Tagit milloin tahansa Muutokset tehdään minkä tahansa tietoaineiston tai ASAP:n seuraavassa säännöllisessä uudelleenlatauksessa, jos käytät[Lippu](#flag).

##### Todentaminen{#authentication} 
[ **Todentaminen (Kirjautuminen sisään) ** ](#authentication)  
Jos et halua antaa käyttäjien kirjautua sisään, älä määritä arvoa.&lt;Autentikointi &gt; asennus.xml.
Jos haluat antaa käyttäjien kirjautua sisään, sinun on määritettävä arvo.&lt;Todennus &gt; Tällä hetkellä,ERDDAP™Tukea
[mukautettu](#custom)  (Älä käytä tätä) ,
[Sähköposti](#email)  (Älä käytä tätä) ,
[Google](#google)  (Suositeltu) ,
[orcid](#orcid)  (Suositeltu) ja
[Oauth2](#oauth2)  (Suositeltu) todentamismenetelmään.
Jos haluat kirjautua sisään, suosittelemme vahvasti googlea, orcidia tai oauth2-vaihtoehtoja, koska ne vapauttavat sinut tallentamasta ja käsittelemästä käyttäjän salasanoja. (Tarvitaan tulli) Se on turvallisempi kuin sähköposti. Muista, että käyttäjät käyttävät usein samaa salasanaa eri sivustoilla. Voit käyttää samaa salasanaaERDDAP™kuin pankissa. Tämä tekee heidän salasanansa erittäin arvokkaaksi - paljon arvokkaammaksi käyttäjälle kuin vain heidän pyytämänsä tiedot. Sinun on tehtävä niin paljon kuin voit pitää salasanat yksityisinä. Se on suuri vastuu. Sähköposti, google, orcid ja oauth2 vaihtoehdot huolehtivat salasanoista, joten sinun ei tarvitse kerätä, tallentaa tai työskennellä niiden kanssa. Sinä olet vapautettu tästä vastuusta.

Kaikki Kaikki Kaikki Kaikki&lt;Autentikointi &gt; vaihtoehdot käyttävät[Cookie](https://en.wikipedia.org/wiki/HTTP_cookie)käyttäjän tietokoneella, joten käyttäjän selain on määritettävä evästeiden sallimiseksi. Jos käyttäjä tekeeERDDAP™Tietokoneohjelman pyynnöt (Ei selainta) Evästeitä ja todennusta on vaikea tehdä. Tämä on yleinen ongelma kaikkien todentamisjärjestelmien kanssa. Anteeksi.

yksityiskohdat&lt;Todentaminen &gt; Vaihtoehtoja ovat:

###### Tulli{#custom} 
Tapa onERDDAPmukautettu järjestelmä, jonka avulla käyttäjät voivat kirjautua sisään syöttämällä käyttäjänimensä ja salasanansa verkkosivustolla olevassa muodossa. Jos käyttäjä yrittää ja ei kirjaudu sisään 3 kertaa 10 minuutissa, käyttäjä ei pääse kirjautumaan sisään 10 minuutissa. Tämä estää hakkereita kokeilemasta miljoonia salasanoja, kunnes he löytävät oikean.

Tämä on hieman turvallista, koska käyttäjän nimi ja salasana välitetään kautta.https  (Ei ei eihttp) , mutta todentaminen = google, orcid tai uauth2 ovat parempia, koska ne vapauttavat sinua käsittelemään salasanoja. Mukautettu lähestymistapa edellyttää, että keräät käyttäjän nimen ja hash sulattaa heidän salasanansa. (Käytä puhelintasi&#33; Sähköposti ei ole turvallinen&#33;) ja varastoi nedatasets.xml[ ]&lt;Käyttäjä &gt; (Docs/server-admin/datasets#user Näytä tarkat tiedot) Tagit.

Mukautetun vaihtoehdon avulla kukaan ei voi kirjautua sisään ennen kuin (TheERDDAP™Hallinnollinen) luodaan&lt;käyttäjän &gt; tunniste käyttäjälle, käyttäjän nimen määrittäminen käyttäjänimeksi, salasanan hash sulaminen salasanaksi ja sen roolit.

Ei suositella
Käyttäjän salasanan hash-lihan tuottamisen ja välittämisen hämäryyden ja siihen liittyvien riskien vuoksiERDDAP™salasanojen hash-digests, tätä vaihtoehtoa ei suositella.

Tämän vaihtoehdon turvallisuuden lisäämiseksi:

* Varmista, että muut käyttäjät palvelimella (Linux-käyttäjät, eiERDDAP™Käyttäjät) Et voi lukea tiedostoja Tomcat-hakemistossa (Erityisestidatasets.xmlTiedosto&#33;) tai taiERDDAP"Isovanhemmuus"
Linux, kuten käyttäjä=tomcat, käytä:
Pääartikkeli: R G-rwx *isovanhemmat*   
Pääartikkeli: R O-rwx *isovanhemmat*   
Pääartikkeli: R G-rwx *Tomcat*   
Pääartikkeli: R O-rwx *Tomcat*   
     
* UEPSHA256:n käyttö&lt;PasswordEncoding &gt; in setup.xml
     
* Käytä as-secure-as-possible -menetelmää, jolla käyttäjän salasanan hash-digest siirretään käyttäjältä käyttäjälle.ERDDAP™Hallinnollinen (Puhelin?) .
         
###### Sähköposti{#email} 
Sähköpostin todentaminen käyttää käyttäjän sähköpostitiliä käyttäjän tunnistamiseen. (lähettämällä heille sähköpostin, jossa on erityinen linkki, johon he voivat kirjautua sisään.) . Toisin kuin muut sähköpostit, jotkaERDDAP™lähettää,ERDDAP™ei kirjoita näitä kutsuviestejä sähköpostilokitiedostoon, koska ne sisältävät luottamuksellisia tietoja.
Teoriassa tämä ei ole kovin turvallista, koska sähköpostit eivät ole aina salattuja, joten huono tyyppi, jolla on kyky estää sähköpostiviestejä, voi väärinkäyttää tätä järjestelmää käyttämällä voimassa olevaa käyttäjän sähköpostiosoitetta ja pysäyttämällä kutsuviestin.
Käytännössä, jos perustatERDDAP™käyttää Google-sähköpostitiliä sähköpostiviestien lähettämiseen, ja jos olet määrittänyt sen jonkin yhteyden TLS-asetuksen käyttämiseen, ja jos käyttäjällä on Google-sähköpostitili, tämä on jonkin verran turvallista, koska sähköpostit salataan koko matkan ajan.ERDDAP™käyttäjälle.

Tämän vaihtoehdon turvallisuuden lisäämiseksi:

* Varmista, että muut palvelimen käyttäjät (Linux-käyttäjät, eiERDDAP™Käyttäjät) Et voi lukea tiedostoja Tomcat-hakemistossa taiERDDAP"Isovanhemmuus"
Linux, kuten käyttäjä=tomcat, käytä:
Pääartikkeli: R G-rwx *isovanhemmat*   
Pääartikkeli: R O-rwx *isovanhemmat*   
Pääartikkeli: R G-rwx *Tomcat*   
Pääartikkeli: R O-rwx *Tomcat*   
     
* Aseta asioita, jotta saat tietoturvan sähköposteille, jotka lähetetäänERDDAP™käyttäjille. Voit esimerkiksi luoda Google-keskeisen järjestelmän vain luomalla&lt;käyttäjä &gt; tunnisteet Googlen hallinnoimille sähköpostiosoitteille ja asettamallaERDDAP™käyttää Googlen sähköpostipalvelinta turvallisen/TLS-yhteyden kautta: asennuksessa.xml, käytä esim.
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

Ei suositella
Sähköpostin todentamista ei suositella. Käytä Google-, Orcid- tai Oauth2-vaihtoehtoa.

Kuten Google, Orcid ja Oauth2 vaihtoehtoja, sähköposti on erittäin kätevä.ERDDAP™Hallinnoijat - sinun ei koskaan tarvitse käsitellä salasanoja tai niiden hajautuksia. Kaikki mitä sinun tarvitsee tehdä, on [...]&lt;Käyttäjä &gt; (Docs/server-admin/datasets#user Näytä tarkat tiedot) Käyttäjä indatasets.xmlkäyttäjän sähköpostiosoite, jokaERDDAP™Käytetään käyttäjän nimenä. (Password attribuuttia ei käytetä, kun todentaminen = sähköposti, Google, orcid tai valauth2.) 

Sähköpostin avulla vain käyttäjät, joilla on&lt;Käyttäjä &gt; Tag indatasets.xmlvoi yrittää kirjautua sisäänERDDAP™antamalla sähköpostiosoitteensa ja klikkaamalla sähköpostin linkkiä, jokaERDDAP™lähettää niitä.

ERDDAP™Sähköpostiosoitteita käsitellään tapausherkkinä. Se tekee tämän muuntamalla sähköpostiosoitteita, jotka syötät (in)&lt;käyttäjät &gt; tunnisteet) tai käyttäjät (login muodossa) kaikkiin alempaan versioon.

Todentaminen = sähköposti:

1. Asetuksessa.xml, vaihda&lt;BaseHttpsUrl &gt; Tagin arvo.
Jos haluat kokeilla / työskennellä henkilökohtaisella tietokoneellasi, käytä
     https://localhost:8443   
yleisöllesiERDDAP™käyttää
     https://*your.domain.org*:8443   
:8443 jos käytät Apachea[Proxypass](/docs/server-admin/deploy-install#proxypass)niin, ettei sataman numeroa tarvita.
     
2. Asetuksessa.xml, vaihda&lt;Todentaminen &gt; Sähköpostin arvo:
```
    <authentication>email</authentication>  
```

3. Varmista, että asennuksessa.xml, varmista, että sähköpostijärjestelmä on perustettu kaikkien&lt;Sähköpostit, niin ettäERDDAP™voi lähettää sähköpostia. Jos mahdollista, aseta se turvallisen yhteyden käyttöön. (SSL / TLS) sähköpostipalvelimeen.
     
4. Sisälläsidatasets.xmlLuo [&lt;Käyttäjä &gt; (Docs/server-admin/datasets#user Näytä tarkat tiedot) jokaiselle käyttäjälle, jolla on pääsy yksityisiin tietoihin.
Käytä käyttäjän sähköpostiosoitetta tunnisteen käyttäjätunnuksena.
Älä määritä salasanan ominaisuutta käyttäjätunnuksessa.
     
5. Käynnistä uudelleenERDDAP™Muutokset asetukseen.xml jadatasets.xmlvaikutusta.
         
###### Google, Orcid, Oauth2 (käytetty){#google-orcid-oauth2} 
*   [ **Google** ](#google),[ **orcid** ](#orcid)ja[ **Oauth2** ](#oauth2)   (Suositeltu)   
Kaikki kolme vaihtoehtoa ovat suositeltujaERDDAP™Todentamisvaihtoehdot. Kaikki ovat turvallisimpia vaihtoehtoja. Muut vaihtoehdot ovat huomattavasti heikompia.
     
###### Google Google Google Google{#google} 
* Googlen todentaminen käyttää[Merkki Googlen kanssa](https://developers.google.com/identity/gsi/web/guides/overview)joka on täytäntöönpanon[OAuth 2.0 Todentaminen](https://oauth.net/2/).ERDDAP™käyttäjät kirjautuvat Googlen sähköpostitiliin, mukaan lukien Googlen hallinnoimat tilit, kuten@noaa.govTilejä. Tämä mahdollistaaERDDAP™Käyttäjän henkilöllisyyden tarkistaminen (Nimi ja sähköpostiosoite) käyttää profiilikuvaansa, mutta ei annaERDDAP™pääsy heidän sähköposteihinsa, Google Driveen tai muihin yksityisiin tietoihin.
    
For ForERDDAP™2,22 ja alapuolella,ERDDAP™Google Sign-In. Googlen mukaan järjestelmä poistetaan 31.3.2023 jälkeen. Jos et ole tehnyt niin, vaihdaERDDAP™V2.23+ käyttää uutta "Sign In with Google" -järjestelmää.
    
For ForERDDAP™V2.23 tapauksia, joissa on sisältö- ja turvallisuuskäytäntö, joka on määritetty ja jota käytetään Google Authenticationissa, on lisättävä https://accounts.google.com Luettelo sallitusta käsikirjoituksesta (Käsikirjoitus: Src-elem) .ERDDAP™Ei enää käytä https://apis.google.com Jos se on sallittua, voit poistaa sen nyt.
    
For ForERDDAP™V2.24+ Voit myös lisätä https://accounts.google.com/gsi/style stlye-src ja https://accounts.google.com/gsi/ Yhteys src. Käsikirjoitusta varten voit käyttää https://accounts.google.com/gsi/client.
 
    
Lisätietoja voit mennä[Google-sivut](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)CSP:n kokoonpano. Jos sinulla on kysyttävää, ota yhteyttä chris.john at noaa.gov.
         
###### Orcid{#orcid} 
* Orcid Authentication -vaihtoehto käyttää[Orcid todentaminen](https://members.orcid.org/api/integrate/orcid-sign-in)joka on täytäntöönpanon[OAuth 2.0 Todentaminen](https://oauth.net/2/).ERDDAP™käyttäjät kirjautuvat sisään[Orcid tili](https://members.orcid.org/api/integrate/orcid-sign-in)jota tutkijat yleensä käyttävät tunnistaakseen itsensä. Tämä mahdollistaaERDDAP™tarkistaa käyttäjän Orcid-identiteetti ja saada Orcid-tilin numero, mutta ei annaERDDAP™pääsy muihin Orcid-tilin tietoihin.

###### Oauth2{#oauth2} 
* Oauth2-vaihtoehdon avulla käyttäjät voivat kirjautua sisään joko Google-tilillä tai Orcid-tilillä.

Google, orcid ja oauth2 vaihtoehdot ovat avattavan vaihtoehdon seuraajia, jotka lopetettiin sen jälkeen.ERDDAP™1.68, joka perustuu avoimeen versioon ID on nyt vanhentunut. Vaihda Google, Orcid tai Oauth2 -vaihtoehtoon.

Nämä vaihtoehdot ovat erittäin käteviäERDDAP™Hallinnoijat - sinun ei koskaan tarvitse käsitellä salasanoja tai niiden hajautuksia. Kaikki mitä sinun tarvitsee tehdä, on [...]&lt;Käyttäjä &gt; (Docs/server-admin/datasets#user Näytä tarkat tiedot) Käyttäjä indatasets.xmljoka määrittää käyttäjän Google-sähköpostiosoitteen tai Orcid-tilin numeron käyttäjätunnuksena. (Password attribuuttia ei käytetä, kun todentaminen = sähköposti, Google, orcid tai uauth2.) 

Näillä vaihtoehdoilla kuka tahansa voi kirjautua sisäänERDDAP™kirjautumalla Googlen sähköpostitilille tai Orcid-tilille, mutta kenelläkään ei ole oikeutta käyttää yksityisiä tietoaineistoja, kunnes olet (TheERDDAP™Hallinnollinen) luodaan&lt;käyttäjä&gt; tunniste, joka määrittää Googlen sähköpostiosoitteen tai Orcid-tilin numeron käyttäjänimeksi ja määrittää niiden roolit.

ERDDAP™Sähköpostiosoitteita käsitellään tapausherkkinä. Se tekee tämän muuntamalla sähköpostiosoitteita, jotka syötät (in)&lt;käyttäjät &gt; tunnisteet) tai käyttäjät (login muodossa) kaikkiin alempaan versioon.

Googlen, orcidin tai oauth2-todennus:

* Asetuksessa.xml, vaihda&lt;BaseHttpsUrl &gt; Tagin arvo.
Jos haluat kokeilla / työskennellä henkilökohtaisella tietokoneellasi, käytä
     https://localhost:8443   
yleisöllesiERDDAP™käyttää
     https://*your.domain.org*:8443   
:8443 Jos käytät Apachea[Proxypass](/docs/server-admin/deploy-install#proxypass)niin, ettei sataman numeroa tarvita.
     
* Asetuksessa.xml, vaihda&lt;Todentaminen &gt; Googlen, orcidin tai valauth2:n arvo, esimerkiksi:
```
    <authentication>oauth2</authentication>  
```
###### Googlen asennus{#google-setup} 
* Google- ja oauth2-vaihtoehdot:
Seuraa alla olevia ohjeita, jotta voit määrittää Googlen todennuksenERDDAP.
     
    1. Jos sinulla ei ole Googlen sähköpostitiliä,[luoda yksi](https://www.google.com/intl/en_us/mail/help/about.html)  
         
    2. Seuraa[Nämä ohjeet](https://developers.google.com/identity/sign-in/web/devconsole-project)Luo Google Developers Console -projekti ja hanki asiakastunnus.
        
Kun Google-lomake vaatii lupaaJavaKirjan alkuperä, merkitse arvoa&lt;BaseHttpsUrl &gt; henkilökohtaisen tietokoneenERDDAP™asennus.xml, esim.
         https://localhost:8443   
Toisella rivillä, lisää&lt;SpotHtpsUrl &gt; yleisöstäsiERDDAP™asennus.xml, esim.
         https://*your.domain.org*:8443
 
        
Älä määritä valtuutettuja uudelleenohjaus URI-osoitteita.
        
Kun näet asiakastunnuksesi tästä projektista, kopioi ja liitä se asetukseen.xml (yleensä alle)&lt;Todentaminen &gt; olla järjestyksessä, mutta sijoittelulla ei oikeastaan ole väliä&lt;GoogleClientID &gt; Tag, esim.
        &lt;GoogleClientID *Asiakkaasi* &lt;GoogleClientID &gt;
Asiakastunnus on noin 75 merkkijonoa, todennäköisesti alkaa useista numeroista ja päättyy .apps.googleusercontent.com.
         
        
    3. Sisälläsidatasets.xmlluodaan [&lt;Käyttäjä &gt; (Docs/server-admin/datasets#user Näytä tarkat tiedot) jokaiselle käyttäjälle, jolla on pääsy yksityisiin tietoihin. Käyttäjänimelle ominaisuus tunnisteessa:
        
        * Käyttäjille, jotka kirjautuvat Googleen, käytä käyttäjän Google-sähköpostiosoitetta.
        * Käyttäjille, jotka kirjautuvat sisään Orcid-tilin numerolla (Dashesin kanssa) .
        
Älä määritä salasanan ominaisuutta käyttäjätunnukselle.
         
    4. Käynnistä uudelleenERDDAP™Muutokset asetukseen.xml jadatasets.xmlvaikutusta.
         
###### Orcid setup{#orcid-setup} 
* Orcid- ja oauth2-vaihtoehdot:
Seuraa alla olevia ohjeita Orcid-todennuksen luomiseksiERDDAP.
     (yksityiskohtiin, katso[Orcidin API-dokumentaatio](https://members.orcid.org/api/integrate/orcid-sign-in).)   
     
    1. Jos sinulla ei ole Orcid-tiliä,[luoda yksi](https://orcid.org/signin)  
         
    2. Kirjautuminen Orcidiin[ https://orcid.org/signin ](https://orcid.org/signin)Käytä henkilökohtaista Orcid-tiliäsi.
         
    3. Klikkaa "kehittäjätyökalut" ("Tutkijoille" huipputasolla) .
         
    4. Klikkaa "Register for the Free ORCID public API". Kirjoita nämä tiedot:
Nimi:ERDDAP™at at\\[organisaatiosi\\]  
WEB:\\[sinunERDDAPDomain\\]  
Kuvaus:ERDDAP™Se on tieteellinen palvelin. Käyttäjien on todennettava Google tai Orcid, jotta he voivat käyttää ei-julkisia tietoja.
Uudelleenohjaus URI:\\[sinunERDDAPDomain\\]Erddap/loginOrcid.html
         
    5. Klikkaa Tallenna Icon (Se on kuin 3,5" levy&#33;) .
Voit sitten nähdä ORCID APP Client ID ja ORCID Client Secret.
         
    6. Kopioi ja liitä ORCID APP Client ID (joka alkaa "APP") asennus.xml sisään&lt;OrcidClientID &gt; Tag, esim.
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. Kopioi ja liitä ORCID Client Secret (alfa-numeeriset hahmot, joilla on kosteus) asennus.xml sisään&lt;OrcidClientSecret &gt; tag, esim.
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. Sisälläsidatasets.xmlluodaan [&lt;Käyttäjä &gt; (Docs/server-admin/datasets#user Näytä tarkat tiedot) jokaiselle käyttäjälle, jolla on pääsy yksityisiin tietoihin. Käyttäjänimelle ominaisuus tunnisteessa:
        
        * Käyttäjille, jotka kirjautuvat Googleen, käytä käyttäjän Google-sähköpostiosoitetta.
        * Käyttäjille, jotka kirjautuvat sisään Orcid-tilin numerolla (Dashesin kanssa) .
        
Älä määritä salasanan ominaisuutta käyttäjätunnukselle.
         
    9. Käynnistä uudelleenERDDAP™Muutokset asetukseen.xml jadatasets.xmlvaikutusta.
             

###### Kirjautuminen kummallakin tavalla{#log-in-either-way} 
Jos käytät Google-, Orcid- tai Oauth2-autentikointivaihtoehtoja ja Google Sign-In tai Orcid’s Authentication API lakkaa toimimasta. (Mistä tahansa syystä) lakkaa toimimasta niin kuinERDDAP™Käyttäjät eivät voi kirjautua sisäänERDDAP. Väliaikainen (pysyvä tai) Voit pyytää käyttäjiä rekisteröitymään toiseen järjestelmään (saat Googlen sähköpostitilin tai saat Orcid-tilin) . Tehdä tämä:

1. Muuttaa&lt;Autentikointi -tunniste, jotta se mahdollistaa toisen todentamisjärjestelmän. Oauth2-vaihtoehdon avulla käyttäjät voivat kirjautua sisään kummallakin järjestelmällä.
2. kaksinkertaistaa jokaisen&lt;käyttäjä&gt; tunnisteet ja käyttäjätunnuksen muuttaminen Googlen sähköpostiosoitteesta vastaavaan Orcid-tilin numeroon (tai päinvastoin) Pidä roolit samana.

###### Avoinna{#openid} 
ERDDAP™ei enää tue avoimen tunnistamisen vaihtoehtoa, joka perustui avoimeen versioon. ID on nyt vanhentunut. Käytä Google-, Orcid- tai Oauth2-vaihtoehtoja.

###### BASIC{#basic} 
ERDDAP™ei tue BASIC-todennusta, koska:
* BASIC näyttää olevan suunnattu ennalta määritellyille verkkosivuille, jotka tarvitsevat turvallisen pääsyn tai peittämän pääsyn koko sivustoon.ERDDAP™sallii (rajoitettu pääsy) Lisätietoja on-the-fly.
* BASIC-todentaminen ei tarjoa käyttäjille tapaa kirjautua ulos&#33;
* BASIC-autentikointi ei ole turvallista.

##### Turvallisia tietolähteitä{#secure-data-sources} 
Jos tietokanta on rajoittanut pääsyäERDDAP™Käyttäjät, tietolähde (mistäERDDAP™Saada dataa) Ei saa olla julkisesti saatavilla. Miten voiERDDAP™Saat tiedot rajoitetuista tietoaineistoista? Muutamia vaihtoehtoja ovat:

*   ERDDAP™voi palvella tietoja paikallisista tiedostoista (Esimerkkinä EDDTable Filejä taiEDDGridFilejä) .
     
*   ERDDAP™voi olla a[DMZ](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing)) ja tietolähde (Esimerkki: AOPeNDAPpalvelin tai tietokanta) voi olla yhden takana[Palomuuri](https://en.wikipedia.org/wiki/Firewall)missä se on käytettävissäERDDAP™Mutta ei yleisölle.
     
* Tietolähde voi olla julkisella verkkosivustolla, mutta vaatii kirjautumisen tietojen saamiseksi. Kahden tyyppisiä tietoja, jotkaERDDAP™voi kirjautua sisäänpääsyyn[EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)ja[EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra). Nämä tiedot tukevat (Ja aina pitäisi käyttää) Käyttäjänimet (luodaanERDDAP™käyttäjä, jolla on vain luku-oikeudet) salasanat, SSL-yhteydet ja muut turvatoimet.
    
yleisesti, tällä hetkellä,ERDDAP™ei voi käsitellä näitä tietolähteitä, koska sillä ei ole määräyksiä kirjautumisesta tietolähteeseen. Tämä on syy, miksi pääsy[EDDGridFromErddap ja EDDTable Lähde: Erddap](/docs/server-admin/datasets#eddfromerddap)Tietoja ei voi rajoittaa. Tällä hetkellä paikallinenERDDAP™Ei ole mitään tapaa kirjautua sisään ja käyttää metatietoja kauko-ohjaimestaERDDAP. "Etäisyys"ERDDAP™palomuurin takana ja poistaa tietoaineiston saatavuus Rajoitukset eivät ratkaise ongelmaa: koska käyttäjä pyytää EDDXX:ää FromErddap-tiedot on ohjattava kauko-ohjaukseenERDDAP™EtäinenERDDAP™on oltava saavutettavissa.
    
#### Puolustus hakkereita vastaan{#defenses-against-hackers} 
On pahoja hakkereita, jotka yrittävät hyödyntää tietoturvan heikkouksia palvelinohjelmistossa, kutenERDDAP.ERDDAP™noudattaa yhteistä turvallisuusneuvontaa, jolla on useita puolustuskertoja:

* Rajoitetut oikeudet - Yksi tärkeimmistä puolustuksista on ajaa Tomcatia käyttäen tomcatia, jolla ei ole salasanaa. (Kukaan ei voi kirjautua sisään, koska käyttäjä) rajoitettu tiedostojärjestelmän etuoikeus (Esimerkiksi vain luettu pääsy tietoihin) . NäytäERDDAPOhjeita[Tomcatin perustaminen](/docs/server-admin/deploy-install#tomcat).
* raskas käyttö - yleisesti,ERDDAP™Se on rakennettu raskaaseen käyttöön, mukaan lukien käsikirjoitukset, jotka tekevät kymmeniä tuhansia pyyntöjä. Se on vaikeaaERDDAP™avata itsensä samanaikaisesti raskaaseen lailliseen käyttöön ja suojautua pahoinpitelyltä. Joskus on vaikea erottaa laillista käyttöä, liiallista laillista käyttöä ja laitonta käyttöä. (Joskus se on todella helppoa) . Muiden puolustusten lisäksi,ERDDAP™tietoisesti ei salli yksittäisen pyynnön käyttää kohtuutonta murto-osaa järjestelmän resursseista (Jos järjestelmä ei muuten toimi) .
* Tunnista ongelmalliset käyttäjät - josERDDAP™hidastuu tai jäätyy (Ehkä siksi, että naiivi tai botti käyttää useita skriptejä lähettääkseen useita pyyntöjä samanaikaisesti tai ehkä huonon kaverin takia.[Palvelun kieltäminen](https://en.wikipedia.org/wiki/Denial-of-service_attack)Hyökkäys) Voit katsoa[Päivittäinen sähköposti](#daily-report)  (Useammin samat tiedot[ERDDAP™Lokitiedosto](#log)) jotka osoittavat aktiivisimpien käyttäjien pyyntöjen määrän (Katso "Requesterin IP-osoite" (Sallittu) """) .ERDDAP™Lähetä sähköpostia myös ylläpitäjälle aina, kun["Unusi toiminta: 25 % pyynnöistä epäonnistui"](#failed-requests). Sen jälkeen voit katsoaERDDAP™Kirjaudu tiedostoon nähdäksesi pyyntöjen luonteen. Jos sinusta tuntuu, että joku tekee liikaa pyyntöjä, outoja pyyntöjä. (Et usko mitä olen nähnyt, ehkä) tai hyökkäystyyppiset pyynnöt, voit lisätä IP-osoitteen mustalle listalle.
* Musta lista - Voit lisätä IP-osoitteen hankalilta käyttäjiltä, boteilta ja[Palvelun kieltäminen](https://en.wikipedia.org/wiki/Denial-of-service_attack)hyökkääjätERDDAP [Blacklist](/docs/server-admin/datasets#requestblacklist)jotta heiltä tulevat pyynnöt hylätään välittömästi. Tämä asetus ondatasets.xmljotta voit nopeasti lisätä IP-osoitteen luetteloon ja sitten[Lippu](#flag)aineistoa niin, ettäERDDAP™Huomioi välittömästi ja toteuta muutos. Blacklisted-käyttäjille lähetetty virheilmoitus rohkaisee heitä ottamaan yhteyttäERDDAP™Hallinnoitsija, jos hän kokee olevansa väärässä mustassa listassa. (Kokemuksessamme useat käyttäjät eivät ole tienneet, että he käyttivät useita käsikirjoituksia samanaikaisesti tai että heidän käsikirjoituksensa tekivät hölynpölypyyntöjä.) 
* Dataset Security - Jotkin tietoaineistot (EDDTableFromDatabase) Lisää turvallisuusriskejä (esimerkiksi SQL-injektio) Hänellä on omat turvatoimet. Katso tällaisten tietoaineistojen tiedot[Työskentelyä yhdessädatasets.xmlTiedosto](/docs/server-admin/datasets)erityisesti[EDDTableFromDatabase -turvallisuus](/docs/server-admin/datasets#database-security).
* Turvatarkastus - Vaikka vaikkaNOAATurvallisuus kieltäytyi skannauksistamme vuosia, ne skannatsivat rutiininomaisesti (Bobin)  ERDDAP™asennus. Vaikka alkuperäiset skannaukset löysivät joitakin ongelmia, jotka sitten korjasin, myöhemmät skannaukset eivät ole löytäneet ongelmiaERDDAP. Skannaukset ovat huolestuneita monista asioista, erityisesti siitä, ettätabledappyynnöt näyttävät SQL-pyynnöiltä, ne ovat huolissaan SQL-injektiohaavoittuvuuksista. Nämä asiat ovat perusteettomia, koskaERDDAP™Aina parses ja validoi kyselyt ja sitten erikseen rakentaa SQL-kysely tavalla, joka estää injektiohaavoittuvuuksia. Toinen asia, josta joskus valitetaan, on se, ettäJavaTomcat-versiot eivät ole niin ajan tasalla kuin haluavat, joten päivitämme ne vastauksena. Olen aiemmin tarjoutunut näyttämään ihmisille tietoturvaraportteja, mutta nyt minulle kerrotaan, etten pysty siihen.

#### Kysymyksiä? Ehdotuksia?{#questions-suggestions} 
Jos sinulla on kysyttävääERDDAP"Turvallisuusjärjestelmä tai sinulla on kysymyksiä, epäilyksiä, huolenaiheita tai ehdotuksia siitä, miten se on perustettu, katso meidän[Lisätuen saaminen](/docs/intro#support).
    

## Asioita, joita sinun ei tarvitse tietää{#things-you-dont-need-to-know} 

Nämä ovat yksityiskohtia, joita sinun ei tarvitse tietää ennen kuin tarve syntyy.

### Toinen toinenERDDAP™ {#second-erddap} 
*    **Aseta toinenERDDAP™Testaus/kehitys**   
Jos haluat tehdä tämän, on olemassa kaksi lähestymistapaa:
    *    (Paras paras paras paras) Asenna Tomcat jaERDDAP™tietokoneella, jolla on yleisöERDDAP. Jos käytät tietokonettasi:
        1. Tee asennus yksi askel kerrallaan. Ota Tomcat ylös ja juokse ensin.
Kun Tomcat juoksee, Tomcat-johtajan tulee olla paikalla.
            [ http://127.0.0.1:8080/manager/html/ ](http://127.0.0.1:8080/manager/html/)  (Tai ehkä[ http://localhost:8080/manager/html/ ](http://localhost:8080/manager/html/)) 
        2. AsentaminenERDDAP.
        3. Älä käytä ProxyPassia poistaaksesi satamanumeronERDDAP™URL.
        4. Sisällä[Asennus.xml](/docs/server-admin/deploy-install#setupxml)Lataa BaseUrl http://127.0.0.1:8080
 
        5. Kun aloitat tämänERDDAP™Sinun pitäisi pystyä näkemään se
            [ http://127.0.0.1:8080/erddap/status.html ](http://127.0.0.1:8080/erddap/status.html)  (Tai ehkä[ http://localhost:8080/erddap/status.html ](http://localhost:8080/erddap/status.html)) 
#### Toinen Tomcat{#second-tomcat} 
*    (Toiseksi paras) Asenna toinen Tomcat samalle tietokoneelle kuin yleisöllesiERDDAP.
    1. Tee asennus yksi askel kerrallaan. Ota Tomcat ylös ja juokse ensin.
Vaihda kaikki toiseen Tomcatiin liittyvät satamanumerot (Muutos 8080-8081)   (Katsokaa[Monipuolinen Tomcat Asennukset osasto](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt)puolivälissä tämän asiakirjan) .
    2. AsentaminenERDDAP™uudessa Tomcatissa.
    3. Älä käytä ProxyPassia poistaaksesi satamanumeronERDDAP™URL.
    4. Sisällä[Asennus.xml](/docs/server-admin/deploy-install#setupxml)Lataa BaseUrl http://www.*yourDomainName*:8081
 
    5. Kun aloitat tämänERDDAP™Sinun pitäisi pystyä näkemään se
         http://www.*yourDomainName*:8081/erddap/status.html   
             
### Solid State Drives{#solid-state-drives} 
*    **Solid State Drives (SSD) Ne ovat hienoja&#33;**   
Nopein, helpoin ja halvin tapa nopeuttaaERDDAP"Tabular-tietojen käyttö on tietotiedostojen laittaminen Solid State Driveen" (SSD) . Useimmat tabulaariset tietoaineistot ovat suhteellisen pieniä, joten 1 tai 2 TB SSD on todennäköisesti riittävä pitämään kaikki tietotiedostot kaikkien tabulaaritietojen. SSD:n käyttö loppujen lopuksi kuluu, jos kirjoitat tietoja soluun, poistat sen ja kirjoitat uusia tietoja soluun liian monta kertaa. Joten jos käytät SSD-tiedostoa vain kerran ja luet sen useita kertoja, jopa kuluttaja-arvoisen SSD-levyn pitäisi kestää hyvin kauan, todennäköisesti paljon pidempään kuin minkään Hard Disk Driven. (HDD) . Kuluttajan SSD on nyt halpa (Vuonna 2018 ~ 200 1 TB tai ~ 400 2 TB) Hinnat laskevat edelleen nopeasti. MilloinERDDAP™pääsy tietotiedostoon, SSD tarjoaa sekä lyhyemmän latenssin (~0,1ms, versus ~3ms HDD, vs. ~10 (??) ms for a RAID, versus ~55ms for Amazon S3) korkeampi läpimeno (~500 MB/S, versus ~75 MB / s HDD, versus ~500 MB / s RAID) . Näin saat suuren suorituskyvyn (10x vs. HDD) 200€&#33; Verrattuna muihin mahdollisiin muutoksiin järjestelmässäsi (Uusi palvelin 10 000 eurolla? Uusi RAID 35 000 eurolla? Uusi verkko vaihtuu 5000 euroon? jne.) Tämä on ehdottomasti paras palautus sijoituksille. (ROI) . Jos/kun SSD kuolee (1, 2, 8 vuotta) korvaa se. Älä luota siihen pitkällä aikavälillä, tietojen arkistointi, vain etupään kopio tietojen.\\[SSD olisi hyvä myös verkkotietojen, mutta useimmat verkottunut tietoaineistot ovat paljon suurempia, mikä tekee SSD erittäin kallista.\\]
    
Jos palvelintasi ei ladata muistilla, palvelimesi lisämuisti on myös erinomainen ja suhteellisen edullinen tapa nopeuttaa kaikkia näkökohtia.ERDDAP.
     
    
### [Raskaita paikkoja / Constraints](#heavy-loads--constraints) **  {#heavy-loads--constraints} 
Raskaalla käytöllä, standaloneERDDAP™Voidaan rajoittaa useisiin ongelmiin. Lisätietoja, katso[Lista rajoituksista ja ratkaisuista](/docs/server-admin/scaling#heavy-loads--constraints).
     
### Grids, Clusters ja Federations{#grids-clusters-and-federations} 
Erittäin raskaassa käytössä yksi erillinenERDDAP™Yhdessä tai useammassa rajoituksessa ehdotetut ratkaisut eivät riitä. tällaisissa tilanteissa,ERDDAP™on ominaisuuksia, jotka helpottavat skaalautuvien verkkojen rakentamista (Kutsutaan myös klustereita tai federaatioita) jostaERDDAPjotka mahdollistavat järjestelmän erittäin raskaan käytön (esimerkiksi suurelle datakeskukselle) . Lisätietoja, katso[verkot, klusterit ja liitotERDDAPs](/docs/server-admin/scaling).
     
### Pilvitietokone{#cloud-computing} 
Monet yritykset alkavat tarjota[pilvipalvelut](https://en.wikipedia.org/wiki/Cloud_computing)  (esim.[Amazonin verkkopalvelut](https://aws.amazon.com/)) .[Web hosting yritykset](https://en.wikipedia.org/wiki/Web_hosting_service)1990-luvun puolivälistä lähtien on tarjottu yksinkertaisempia palveluja, mutta pilvipalvelut ovat laajentaneet huomattavasti tarjottujen järjestelmien joustavuutta. Voit käyttää näitä palveluita yhden perustamiseen.ERDDAP™Verkko/ryhmäERDDAPhoitaa raskasta käyttöä. Lisätietoja, katso[Cloud Computing withERDDAP™](/docs/server-admin/scaling#cloud-computing).

### Amazon Amazon{#amazon} 
*    **[Amazonin verkkopalvelut (AWS) EC2 Asennuskatsaus](#amazon)**   
    [Amazonin verkkopalvelut (AWS) ](https://aws.amazon.com/)on A[pilvipalvelu](https://en.wikipedia.org/wiki/Cloud_computing)Se tarjoaa laajan valikoiman tietokoneita, joita voit vuokrata tunnilla. Voit asentaaERDDAP™On a[Elastinen pilvi (EC2) ](https://aws.amazon.com/ec2/)Esimerkiksi (tietokoneen nimi, jonka voit vuokrata tunnilla) . AWS on erinomainen[AWS-käyttäjäopas](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)Voit käyttää Googlea löytääksesi vastauksia tiettyihin kysymyksiin. Ajattele itseäsi, se on melkoinen työ aloittaa. Mutta kun saat yhden palvelimen ylös ja juoksemaan, voit helposti vuokrata ylimääräisiä resursseja. (palvelimet, tietokannat, SSD-tila jne.) Tarvittaessa kohtuulliseen hintaan.\\[Tämä ei ole Amazon Web Servicesin suositus tai hyväksyntä. Muita pilvipalveluiden tarjoajia on.\\]
    
Yleiskuva asioista, joita sinun on tehtävä saadaksesiERDDAP™Juokseminen AWS:llä on:
    
    * Yleisesti ottaen teet kaikki kuvatut asiat[AWS-käyttäjäopas](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html).
    * Luo AWS-tili.
    * AWS-käyttäjän perustaminen kyseiselle tilille hallinnoijan etuoikeuksilla. Kirjaudu sisään käyttäjänä tekemään kaikki seuraavat vaiheet.
    * Elastic Block -tallennustila (EBS) AWS vastaa palvelimellesi liitettyä kiintolevyä. Jotkin EBS-tilat jaetaan, kun luot EC2-tartunnon. Se on pysyvä tallennus - tiedot eivät häviä, kun lopetat EC2-infektion. Jos vaihdat tapaustyyppejä, EBS-tila kiinnittyy automaattisesti uuteen tilanteeseen.
    * Luo elastinen IP-osoite, jotta EC2-infektiolla on vakaa ja julkinen URL-osoite (Toisin kuin vain yksityinen URL-osoite, joka muuttuu joka kerta, kun käynnistät uudelleen) .
    * Luo ja käynnistä EC2-esimerkki (Tietokonetietokone) . On olemassa laaja valikoima[Esimerkkejä](https://aws.amazon.com/ec2/instance-types/)Jokainen eri hinnalla. m4.suuret tai m4.xlarge-infektiot ovat tehokkaita ja soveltuvat todennäköisesti useimpiin käyttötarkoituksiin, mutta valitse mitä tahansa. Voit käyttää Amazonin Linuxia käyttöjärjestelmänä.
    * Jos tietokoneesi/tietokoneesi on Windows-tietokone, voit käyttää[Put](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html), ilmainen SSH-asiakas Windowsille, jotta pääset käsiksi EC2-tartuntasi komentoriviin. Sinulla voi olla jokin SSH-ohjelma, jota haluat.
    * Kun kirjaudut EC2-tapaukseen, kirjaudut sisään hallinnollisena käyttäjänä käyttäjänimellä "ec2-käyttäjä". Ec2-käyttäjällä on etuoikeus. Jos haluat tehdä jotain juurikäyttäjänä, käytä: sudo *Jonkinlainen* 
    * Jos tietokoneesi/tietokoneesi on Windows-tietokone, voit käyttää[Filezilla](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp), ilmainen SFTP-ohjelma, siirtää tiedostoja EC2-infektioon. Sinulla voi olla jokin SFTP-ohjelma, jota haluat.
    *   [Asenna Apache](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html)EC2-tapauksessa.
    * Seuraa standardia[ERDDAP™Asennusohjeet](/docs/server-admin/deploy-install).
         
### Jälleen kerran poikkeus{#waitthentryagain-exception} 
Käyttäjä voi saada virheilmoituksen, kuten
Odota sitten TryAgainException:
Siellä oli (Väliaikainen?) ongelma. Odota hetki, yritä uudelleen. (Selaimessa napsauta Reload-painiketta.)   
Lisätietoja: GridDataAccessor.increment: PartialResults\\[0\\]="123542730" (123532800)

Yleinen selitys WaitThenTryAgainExceptionille on:
MilloinERDDAP™vastaa käyttäjän pyyntöön, tietojen kanssa saattaa olla odottamaton virhe. (esimerkiksi virhe, kun lukee tietoja tiedostosta, tai etätietoaineistoa koskeva virhe) . Odota sitten TryAgain-signaalejaERDDAP™pyyntö epäonnistui (Tähän asti) Mutta tämäERDDAP™Pitäisi yrittää ladata aineistoa nopeasti (Se kutsuu[Pyydä ilmaista](#requestreloadasap)) ja palauttaa pyynnön. Usein tämä onnistuu ja käyttäjä huomaa, että vastaus pyyntöön oli hidas. Muina aikoina lataus epäonnistuu tai on liian hidas tai myöhempi yritys käsitellä pyyntö myös epäonnistuu ja heittää toisen WaitThenTryAgain. Jos näin tapahtuu,ERDDAP™tiedoston lataaminen, mutta käyttäjälle (Lähde: WaitThenTryAgain Exception) Epäonnistuminen oli vastannut pyyntöön.

Tämä on normaalia käytöstä. Järjestelmä pystyy käsittelemään monia yleisiä ongelmia.
Järjestelmän on kuitenkin mahdollista laukaista liiallisesti. Yleisin syy on se, ettäERDDAP"Tietoaineiston lataaminen ei näe ongelmaa, muttaERDDAPVastaus tietopyyntöön näkee ongelman. Riippumatta siitä, mikä on syy, ratkaisu on, että käsittelet kaiken, mikä on vialla. Katso log.txt nähdäksesi todelliset virheviestit ja käsitellä ongelmia. Jos useissa tiedostoissa on päteviä otsikoita, mutta virheellisiä tietoja (Korruptoitunut tiedosto) Korvaa tiedostot korruptoimattomilla tiedostoilla. Jos yhteys RAID on flakey, korjaa se. Jos liitäntä etäpalveluun on flakey, etsi keino tehdä siitä flakey tai ladata kaikki tiedostot etälähteestä ja palvella tietoja paikallisista tiedostoista.

Yksityiskohtainen selitys tälle virheelle (yläpuolella) on:
JokaiselleEDDGriddata,ERDDAP™Pidä akseli muuttuvia arvoja muistissa. Niitä käytetään esimerkiksi muuntamaan pyydetyt akseliarvot, jotka käyttävät " () "Määritä indeksiluvut. Esimerkiksi jos akseliarvot ovat 10, 15, 20, 25, pyyntö (20 20) tulkitaan indeksipyynnöksi #2 (0-pohjaiset indeksit) . MilloinERDDAP™Saat tiedonpyynnön ja saat tiedot lähteestä, se varmistaa, että akseliarvot, jotka se on saanut lähteestä, vastaavat muistin akseliarvoja. Normaalisti he tekevät. Joskus tietolähde on kuitenkin muuttunut merkittävästi: esimerkiksi indeksiarvot akselimuuttujan alusta on saatettu poistaa. (Esimerkiksi "10, 15, 20, 25" voi olla "20, 25, 30") . Jos näin tapahtuu, on selvää, ettäERDDAPpyynnön tulkinta (esim. " (20 20) Indeksi #2) Nyt on väärässä. NiinpäERDDAP™Heitä poikkeus ja soita RequestReloadASAP.ERDDAP™Päivitämme tiedot pian (Usein muutamassa sekunnissa, yleensä minuutissa) . Samankaltaiset ongelmat heittävät myös WaitThenTryAgain-poikkeuksen.
    
#### Pyydä ilmaista{#requestreloadasap} 
Voit nähdä RequestReloadASAP:n log.txt-tiedostossa heti virheilmoituksen jälkeen ja usein lähellä[Jälleen kerran poikkeus](#waitthentryagain-exception). Se on sisäinen, ohjelmallinen tapaERDDAP™asettaa yhden[Lippu](#flag)ilmoittaa, että aineisto on ladattava uudelleen.
     
### Tiedostot, joita ei poisteta{#files-not-being-deleted} 
MuutamaERDDAP™Asennukset, on ollut ongelma, että joitakin väliaikaisia tiedostoja luodaanERDDAP™Pysy avoinna (virheellisesti) eikä siis poisteta. Joissakin tapauksissa monet näistä tiedostoista ovat keränneet ja ottaneet merkittävän määrän levytilaa.

Toivottavasti nämä ongelmat on korjattu. (kuinERDDAP™V2.00) . Jos näet tämän ongelman, lähetä sähköpostia hakemisto + nimiä rikostiedostoja Chris. Johannes osoitteessa Noaa.gov. Sinulla on muutamia vaihtoehtoja ongelman ratkaisemiseksi:

* Jos tiedostot eivät ole suuria ja ne eivät saa sinua lopettamaan levytilaa, voit jättää ongelman huomiotta.
* Yksinkertaisin ratkaisu on sulkea tomcat.ERDDAP™  (Tuntien jälkeen vähemmän käyttäjiä) . Jos käyttöjärjestelmä ei poista tiedostoja, poista ne käsin. Sitten käynnistyy uudelleenERDDAP.
         
### JSON-Luokkaa{#json-ld} 
*    **[Semantic Markup of Datasets json-ldillä (JSON Liittyvät tiedot) ](#json-ld)**   
    ERDDAP™Nyt käytetään[json-ld (JSON Liittyvät tiedot) ](https://json-ld.org)tehdä tietoluettelon ja tietoaineistot osaksi[Semanttinen web](https://en.wikipedia.org/wiki/Semantic_Web)Tim Berners-Lee:n idea on tehdä verkkosisällöstä koneellista luettavampaa ja kone ”ymmärrettävää”. json-ld-sisällön käyttö[Tekijä.org](https://schema.org/)termejä ja määritelmiä. Hakukoneet ([Google erityisesti](https://developers.google.com/search/docs/data-types/datasets)) ja muut semanttiset työkalut voivat käyttää tätä rakenteellista merkintää helpottamaan löytöä ja indeksointia. json-ld-rakenteinen merkintä näyttää näkymättömältä ihmiselle&lt;Käsikirjoitus &gt; Koodi on https://.../erddap/info/index.html WEB WEB WEB WEB WEB (Semanttinen verkko[Dataa](https://schema.org/DataCatalog)) ja jokaisella https://.../erddap/info/*datasetID*/index.html WEB WEB WEB WEB WEB (Semanttinen verkko[Dataa](https://schema.org/Dataset)) . (Erityiskiitokset Adam Leadbetterille ja Rob Fullerille Irlannin Marine-instituutista, jotka ovat tehneet kovaa työtä tämän osan saavuttamiseksi.ERDDAP.)   
     
### Out-Of-Date URL-osoitteet{#out-of-date-urls} 
Hitaasti, mutta varmasti, URL-osoitteet, jotka tietojen toimittajat ovat kirjoittaneet tietotiedostoihin, ovat vanhentuneet. (esimerkiksihttpmuuttuuhttpsVerkkosivut on järjestetty uudelleen, ja NODC/NGDC/NCDC-organisaatiot uudelleenorganisoidaan NCEI:ksi.) . Tuloksena olevat rikkinäiset linkit ovat jatkuvasti läsnä oleva ongelma, jota kaikki verkkosivustot kohtaavat. käsitellä tätä,ERDDAP™Järjestelmä päivittää automaattisesti päivitykset. Jos generaattorit Xml näkee ajantasaisen URL-osoitteen, se lisää päivitetyn URL-osoitteen&lt;addAttributes&gt; myös silloin, kun aineisto latautuu, josERDDAP™Näet ajantasaisen URL-osoitteen, se hiljaa muuttaa sen ajantasaiseen URL-osoitteeseen. Muutoksia ohjaa sarja haku-/korvauspareja, jotka on määritelty&lt;Päivitys &gt; SisälläERDDAP&gt;
\\[Tom\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/viestejä.xml-tiedosto. Voit tehdä muutoksia siellä. Jos sinulla on ehdotuksia muutoksista, tai jos uskot, että tämä tulee muuttaa palveluksi. (Kuin konvertterit) Ole hyvä ja lähetä Chris. Johannes osoitteessa Noaa.gov.
     
### Koruja{#cors} 
* Koruja ([Cross-Origin resurssien jakaminen](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing))   
”On mekanismi, joka sallii rajoitetut resurssit. (esim. fontit taiERDDAP™Datatiedot) verkkosivustolla, jota pyydetään toiselta verkkotunnuksen ulkopuolella olevalta verkkotunnukselta, josta ensimmäinen resurssi tarjottiin. (Arun Ranganathan) . CORS on viesti, joka voidaan laittaa HTTP-vastauksen otsikkoon sanoen: "Se on ok tällä sivustolla, jos tietyt muut sivustot. (erityisiä tai kaikkia) Grab Resursseja (Esim. tiedot) tästä sivustosta ja aseta se saataville heidän sivustolleen.” Tämä on vaihtoehto[JSONP](https://en.wikipedia.org/wiki/JSONP).
    
KehittäjätERDDAP™Älä väitä olevansa turvallisuusasiantuntijoita. Emme ole täysin selvillä CORSiin liittyvistä turvallisuusasioista. Emme halua antaa lausuntoja, jotka tukevat toimintaa, joka vähentää turvallisuutta. Pysymme neutraalina ja jätämme sen kullekin.ERDDAP™Hallitse päättämään, ovatko hyödyt tai CORS-otsikko riskien arvoisia. Kuten aina, josERDDAP™Yksityinen tietoaineisto on hyvä olla varovainen turvallisuuden suhteen.
    
Jos haluat ottaa kortit käyttöönERDDAP™On olemassa[helposti saatavilla olevat ohjeet](https://enable-cors.org/index.html)kuvaus siitä, miten verkkosivuston ylläpitäjät voivat ottaa CORS-otsikon käyttöön alemman tason palvelinohjelmistonsa avulla (esim. Apassi tai nginx) .
    
### Paletteja{#palettes} 
* Palettia käytetäänERDDAP™muuntaa useita tietoarvoja eri väreiksi, kun grafiikoita ja karttoja tehdään.
    
Jokainen paletti on määritelty .cpt-tyylisessä palettitiedostossa, jota käytetään[GM](https://www.soest.hawaii.edu/gmt/). Kaikki Kaikki Kaikki KaikkiERDDAP™.cpt-tiedostot ovat päteviä GMT .cpt-tiedostoja, mutta päinvastoin ei pidä paikkaansa. Käyttöä vartenERDDAP™.cpt-tiedostoilla on:
    
    * Vaihtoehtoisia kommentteja tiedoston alussa, alkaen #.
    * Pääosa, jossa on kuvaus paletin segmenteistä, yksi segmentti per linja. Jokaisella segmenttikuvauksella on 8 arvoa:
Aloita alusta Arvo, aloitus, aloitus Vihreä, aloita Sininen, endValue, endgreen, endblue.
Segmenttejä voi olla useita.ERDDAP™Käyttää lineaarista interpolaatiota startRed/Green/Bluen ja endRed/Green/Bluen välillä.
        
Suosittelemme, että kussakin segmentissä määritellään erilainen alku- ja loppuväri ja että kunkin segmentin lähtöväri on sama kuin edellisen segmentin loppuväri, jotta paletti kuvaa jatkuvasti värisekoitusta.ERDDAP™Sillä on järjestelmä, jolla luodaan lennolla erillisiä värejä paletti, jossa on jatkuva väriseos. YksiERDDAP™Käyttäjä voi määrittää, haluaako paletti olla jatkuva. (Alkuperäinen) tai diskreetti (johdettu alkuperäisestä) . On kuitenkin perusteltuja syitä olla noudattamatta näitä suosituksia.
        
    * Alkuarvojen ja arvojen on oltava kokonaislukuja.
Ensimmäisellä segmentillä on oltava alkuarvo = 0 ja loppuarvo = 1.
Toisessa osassa on oltava aloitusarvo = 1 ja loppuarvo = 2.
Etc.
    * Punaisten, vihreiden ja sinisten arvojen on oltava kokonaislukuja. (Ei kukaan) 255 (Täysi on) .
    * Tiedoston lopussa on oltava kolme riviä:
        1. Taustan rgb-väri datan arvoille, jotka ovat pienempiä kuin väribarin minimi, esim.: B 128 128 128
Se on usein ensimmäisen segmentin aloitus, startgreen ja startblue.
        2. Ensisijainen rgb-väri data-arvoille enemmän kuin väribar-maksimi, esim.: F 128 0
Se on usein viimeisen segmentin lopullinen, endgreen ja endblue.
        3. NaN-data-arvojen rgb-väri, esim. N 128 128 128
Usein keskimmäinen harmaa (128 128 128) .
    * Kunkin linjan arvot on erotettava välilehdillä, joissa ei ole ulkopuolisia tiloja.
    
Näyte .cpt-tiedosto on BlueWhiteRed.cpt:
    
# Tämä on BlueWhiteRed.cpt.
0 0 0 0 0 128 1 0 255
1 0 255 2 0 255 255
255 255 255 255 255 255
255 255 255 4 255 255
4 255 255 0 5 255 0
5 255 0 6 128 0 0
0 0 0 128
128 0 0
128 128 128
    
Katso .cpt-tiedostot esimerkiksi. Jos .cpt-tiedostossa on ongelmia,ERDDAP™Heität todennäköisesti virheen, kun .cpt-tiedosto on päällystetty. (Mikä on parempi kuin tietojen väärinkäyttö) .
    
Voit lisätä lisäpalettiaERDDAP. Voit tehdä ne itse tai löytää ne verkossa. (Esimerkiksi[Cpt-kaupunki](http://soliton.vm.bytemark.co.uk/pub/cpt-city/)) Vaikka todennäköisesti joudut muokkaamaan muotoaan hieman, jotta voit noudattaaERDDAP.cpt-vaatimukset. saadaERDDAP™käyttää uutta .cpt-tiedostoa, tallentaa tiedoston *Tom* /webapps/erddap/WEB-INF/cptfiles (Sinun täytyy tehdä se jokaiselle uudelle versiolle.ERDDAP) Ja myös:
    
    * Jos käytät oletusviestejä.xml-tiedostoa: lisää tiedostonimi&lt;Paletti &gt; Tag in
         *Tom* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/viestejä.xml
Jos teet tämän, sinun täytyy tehdä se joka kerta, kun päivität.ERDDAP.
    * Jos käytät mukautettuja viestejä.xml-tiedostoa: lisää tiedostonimi&lt;Palettes &gt; Tag in your mukautettu viestejä.xml tiedosto: *Tom* Sisältö/erddap/viestit.xml Jos teet tämän, sinun täytyy tehdä se vain kerran. (Mutta on olemassa muita töitä, joilla voit säilyttää mukautetun viestin.xml-tiedoston.) .
    
Sitten käynnistyy uudelleenERDDAP™niinERDDAP™Huomaa muutokset. Tämän lähestymistavan etuna on, että voit määrittää palettien järjestyksen käyttäjille esitetyssä luettelossa. Jos lisäät kokoelman, kehotamme sinua lisäämään etuliitteen kirjoittajien nimiin. (esim. "KT\\_""") kunkin paletin nimeen kokoelman tunnistamiseksi ja niin, että voi olla useita palettia, joilla muuten olisi sama nimi.
    
Älä poista tai vaihda mitään tavallisista tauluista. Ne ovat kaikkien standardiominaisuus.ERDDAP™asennuksia. Jos mielestäsi paletti tai kokoelma palettia on sisällytettävä standardiinERDDAP™Jakelu, koska se olisi yleiskäyttöinen, pyydämme lähettämään ne Chris. Johannes osoitteessa Noaa.gov.
    
### Värit{#colorbars} 
*    **MitenERDDAP™Luo värit värisävyssä?** 
    
    1. Käyttäjä valitsee yhden ennalta määritellyistä[Paletti](#palettes)tai käyttää oletusarvoa, esim. Rainbow. Palettes on tallennettu/määritetty GMT-tyylisiin .cpt Color Palette -taulutiedostoihin. JokainenERDDAPesimääritetyillä paleteilla on yksinkertainen kokonaisluku, esim. 0-1 (jos vain yksi osa palettia) tai 0-4 (jos paletissa on neljä osaa) . Jokainen tiedoston segmentti kattaa n +1, alkaen n = 0.
    2.  ERDDAP™luo uuden .cpt-tiedoston lennolla, skaalaamalla ennalta määritellyn palettisarjan (esim. 0-4) Käyttäjän tarvitsema paletti (esimerkiksi 0,1-50) ja sitten luoda osio uudessa paletissa jokaiselle uuden paletin osalle (Esimerkiksi lokiasteikolla, jossa on punkkeja 0,1, 0,5, 1, 5, 10, 50, on viisi osaa.) . Kunkin osan päätepisteen väri syntyy löytämällä .cpt-tiedoston asiaankuuluvan osan, joka vuorottelee sitten lineaarisesti R-, G- ja B-arvoja. (Tämä on sama kuin se, miten GMT tuottaa värejä Väripaletin taulukoista.) Tämä järjestelmä mahdollistaaERDDAP™Aloitetaan yleisistä palettien (Esimerkiksi Rainbow 8 segmentillä, yhteensä 0-8) Luo räätälöityjä palettia lennolla (esimerkiksi räätälöity sateenkaari, joka kartoittaa 0,1–50 mg/l sateenkaaren väreihin) .
    3.  ERDDAP™Käytä sitten tuota uutta .cpt-tiedostoa, joka tuottaa värin jokaiselle värilliselle pikselille väripalkissa. (ja myöhemmin jokaisesta tietopisteestä, kun piirrät tietoja graafisesta tai kartasta) .cpt-tiedostossa olevan paletin asiaankuuluvan osan löytäminen ja R-, G- ja B-arvojen lineaarinen vuorovaikutus.
    
Tämä prosessi voi tuntua tarpeettomasti monimutkaiselta. Mutta se ratkaisee ongelmat, jotka liittyvät lokiasteikkoihin, joita on vaikea ratkaista muilla tavoilla.
    
Miten voit jäljitellä, mitäERDDAP™Tekeekö? Se ei ole helppoa. Pohjimmiltaan sinun on kaksinkertaistettava prosessi, jokaERDDAP™käyttää. Jos olet aJavaOhjelmoija voi käyttää samaaJavaluokka, jonkaERDDAP™käyttää kaiken tämän tekemiseen:
     *Tom* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/coastwatch/sgt/CompoundColorMap.java
    
### Tietojen jakelujärjestelmien ohjeet{#guidelines-for-data-distribution-systems} 
Tietojen jakelujärjestelmien suunnittelua ja arviointia koskevat yleiset mielipiteet löytyvät[täällä täällä täällä](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html).
     
### ArchiveaDataset{#archiveadataset} 
Sisältää omanERDDAP™Asennus on ArchiveADataset-niminen komentorivityökalu, jonka avulla voit tehdä arkiston. (A.ziptai tai.tar.gztiedostotiedosto) osa tai kaikki tiedot, jotka on tallennettu netcdf-3-sarjaan.nctiedostot tiedostomuodossa, joka soveltuu lähettämiseenNOAANCEI-arkisto (.ncVerkkotietojen tai[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)tabulaaritietojen osalta, kuten on määritelty[NCEINetCDFTemplates v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html)) .

Archive Tiedot voivat luoda kaksi erilaista arkistomuotoa:

* "alkuperäinen" muoto seuraa näitä[NCEI Archiving -ohjeet](https://www.ncdc.noaa.gov/atrac/guidelines.html)Tämä opas[Tietojesi arkistointi NCEI:ssä](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1)ja siihen liittyvä[Tietojen eheyden varmistaminen](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity).
* "BagIt"-muoto tekee[BagIt-tiedostot](https://en.wikipedia.org/wiki/BagIt), vakiomuotoinen arkistomuoto, jota yhdysvaltalainen kongressikirjasto edistää, sellaisena kuin se on määritelty.[BagIt v0.97 (käytetty)](https://tools.ietf.org/html/draft-kunze-bagit-14).NOAANCEI voi standardoida BagIt-tiedostoja arkistointiin.

Ei yllättävää, että[Maailmanlaajuinen ja muuttuva metatieto](/docs/server-admin/datasets#global-attributes)ettäERDDAP™kannustimet/vaatimukset ovat lähes täsmälleen sama tiedoston sisäinen CF- ja ACDD-metadata, jota NCEI rohkaisee/vaatii, joten kaikkien tietoaineistojen tulisi olla valmiita toimittamaan NCEI:lle.[Lähetä2NCE](https://www.nodc.noaa.gov/s2n/)tai tai[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (NCEI:n edistyksellinen seuranta- ja resurssityökalu arkistokokoelmiin) .

Jos sinä (TheERDDAP™Hallinnollinen) Käytä ArchiveADatasetia tietojen lähettämiseen NCEI:lle, sitten sinä (Ei NCE) määrittää, milloin lähetät NCEI:lle ja mitä se on, koska tiedät, milloin on uusia tietoja ja miten määrittää, että roskaposti (NCEI ei) . ArchiveADataset on työkalu, jonka avulla voit luoda paketin, jonka voit lähettää NCEI:lle.

Archive Tiedot voivat olla hyödyllisiä esimerkiksi muissa tilanteissa.ERDDAP™ylläpitäjät, joiden on muunnettava tietoaineiston osajoukko (YksityinenERDDAP) alkuperäisestä tiedostomuodostaan sarjaan[.ncCF-tiedostot](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)niin, että yleisöERDDAP™voi palvella tietoja.ncCF-tiedostoja alkuperäisten tiedostojen sijaan.

Kun olet asettanutERDDAP™ja juoksemaan sitä (vähintään kerran) Löydät ja käytät ArchiveADatasetia *Tom* /webapps/erddap/WEB-inf-hakemisto Siellä on skripti (Archiveataset.) Linux/Unix ja erätiedosto (ArchiveaDataset.bat) Windowsille.

Windowsissa, ensimmäinen kerta kun käytät ArchiveADatasetia, sinun on muokattava ArchiveADataset. bat-tiedosto, jossa on tekstieditori, joka muuttaa polkua javaan. Ex-tiedosto, jotta Windows voi löytääJava.

Kun käytät ArchiveADatasetia, se kysyy sinulta useita kysymyksiä. Jokaisesta kysymyksestä kirjoita vastaus ja paina sitten Enter. Paina ^C poistua ohjelmasta milloin tahansa.

Voit esittää vastaukset kysymyksiin, järjestyksessä, komentorivillä. Tee tämä, kirjoita ohjelma kerran ja kirjoita vastauksesi. Voit luoda yhden komentolinjan (Vastaukset parametreina) joka vastaa ohjelmaan ja vastaa kaikkiin kysymyksiin.
Käytä sanaa oletusarvo, jos haluat käyttää oletusarvoa tietylle parametrille.
Käytä » (Kaksi kaksoislainaa) Paikkakuntana tyhjiölle.
Komentolinjan parametrien määrittäminen voi olla erittäin kätevää esimerkiksi, jos käytät ArchiveADatasetia kerran kuukaudessa arkistoidaksesi kuukausittaisen tiedon. Kun olet luonut komentolinjan parametreilla ja tallentanut sen muistiinpanoissasi tai kuorikirjoituksessasi, sinun on tehtävä pieniä muutoksia joka kuukausi, jotta voit tehdä tämän kuukauden arkiston.

ArchiveADataset-kysymykset antavat sinulle mahdollisuuden:

* Valitse alkuperäinen tai Bagit-tiedostopakkaus. Käytä NCEI:tä.
* zip tai tarra.gzPakkauspakettiin. NCEI:n käyttö.gz.
* Määritä sähköpostiosoite tälle arkistolle (se on kirjoitettu READ_ME.txt-tiedostoon arkistossa) .
* MäärittäädatasetIDtietoja, joita haluat arkistoida.
* Määritä, mitkä tietomuuttujat haluat arkistoida (Yleensä kaikki) .
* Määritä, minkä aineiston haluat arkistoida. Sinun on muotoiltava alijoukko samalla tavalla kuin olisit muotoillut alijoukkoa tietopyyntöön, joten se on erilainen verkkoon kuin tabulaaritietoaineistoihin.
    * Verkossa olevia tietoaineistoja varten voit määrittää vasemman ulottuvuuden arvojoukon, joka on yleensä ajan vaihtelua. ArchiveADataset tekee erillisen pyynnön ja luo erillisen tiedoston jokaisesta arvosta arvojen vaihteessa. Koska verkottuneet tietoaineistot ovat yleensä suuria, sinun on lähes aina määritettävä pieni osajoukko suhteessa koko tietoaineiston kokoon.
Esimerkiksi,\\[ (2015-12-01) : (2015-12-31) \\]\\[\\]\\[\\]\\[\\]
    * Tabulaarisissa tietokannoissa voit määrittää rajoitusten kokoelman, mutta se on usein aika. Koska tabulaariset tietoaineistot ovat yleensä pieniä, on usein mahdollista määrittää rajoituksia, jotta koko tietoaineisto arkistoidaan.
Esimerkiksi & Time 2015-12-01&time&lt;2016-01-01
* Tabulaarisissa tietoaineistoissa määritellään tiivistetty luettelo 0- tai useammasta muuttujasta, joka määrittää, miten arkistoidaan tietoja jaetaan edelleen eri tietotiedostoihin. aineistot, joilla on
    [cd | | | _ _ _ _ _](/docs/server-admin/datasets#cdm_data_type)&gt;Time Series|TimesProfiili|Trajektori|TrajectoryProfiili
Sinun pitäisi melkein aina määrittää muuttuja, jolla on c \role = Timeseries \\ (esim.stationID) cf = trajectory \\ ttribute. ArchiveADataset tekee erillisen pyynnön ja luo erillisen tietotiedoston jokaisesta näiden muuttujien arvojen yhdistelmästä, esim. kunkinstationID.
Kaikissa muissa tabulaarisissa tietoaineistoissa et todennäköisesti määritä muuttujia tähän tarkoitukseen.
Varoitus: Jos arkistoimasi tietoaineiston osa-alue on suuri (&gt; 2GB) Tätä tarkoitusta varten ei ole sopivaa muuttujaa, joten ArchiveADataset ei ole käytettävissä tämän tietoaineiston kanssa. Tämän pitäisi olla harvinaista.
* Määritä tiedostomuoto luotaville tiedostoille.
NCEI: n verkkoon tallennetut tietoaineistot, käytä.nc.
Tabular datasets, NCEI, Käytä[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)jos se on vaihtoehto; muuten.nc.
* Määritä tiedoston sulavuuden tyyppi, joka luodaan jokaiselle tietotiedostolle ja koko arkistopaketille: MD5, SHA-1 tai SHA-256. Digest tarjoaa tavan asiakkaalle (Esimerkki: NCEI) testata, onko tiedosto korruptoitunut. Perinteisesti nämä olivat[.md5-tiedostot](https://en.wikipedia.org/wiki/MD5)Nyt on parempia vaihtoehtoja. Käytä SHA-256:ta.

Kun vastaat kaikkiin kysymyksiin, ArchiveADataset:

1. Tee joukko pyyntöjä tietoaineistolle ja vaihe tuloksena olevat tietotiedostot *isovanhemmat* ArchiveADataset/ *datasetIDAikaleima* /
Verkossa oleville aineistoille on olemassa tiedosto vasemman ulottuvuuden kullekin arvolle. (Esim. aika) . Tiedoston nimi on tämä arvo (esimerkiksi aika-arvo) .
Tabulaarisissa aineistoissa on tiedosto jokaisesta...muuttujan arvosta. (s) . Tiedoston nimi on tämä arvo. Jos muuttujia on useampi kuin yksi, vasemmistolaisia käytetään aliohjausnimien tekemiseen, ja oikeaa muuttujaa käytetään tiedostonimien tekemiseen.
Jokaisen tiedoston on oltava&lt;2GB (Suurin sallittu.nc3 tiedostoa) .
2. Tee tiedosto, joka liittyy jokaiseen tietotiedostoon tietotiedoston sulavuudella. Jos tiedosto on 46088.nc.sha256, sitten sulava tiedosto on nimi 46088..nc.sha256.
3. Tee README.txt-tiedosto, jossa on tietoja arkistosta, mukaan lukien luettelo kaikista tämän arkiston luomiseen määritellyistä asetuksista.
4. Tee 3 tiedostoa sisään *isovanhemmat* ArchiveADataset/:
    
    * A.ziptai tai.tar.gzArchive-tiedosto nimetty *datasetIDAikaleima* .zip  (tai tai.tar.gz) sisältää kaikki vaiheittaiset tiedostot ja sulavat tiedostot. Tämä tiedosto voi olla minkä kokoinen tahansa, vain levytilassa.
    * Digest tiedosto arkistotiedosto, esimerkiksi *datasetIDAikaleima* .zip.sha256.txt
    * "alkuperäinen" arkiston, tekstitiedosto nimetty *datasetIDAikaleima* .zip.listofiles.txt (tai tai.tar.gz) joka listaa kaikki tiedostot.zip  (tai tai.tar.gz) tiedosto.
    
Jos olet valmistelemassa arkistoa NCEI: lle, nämä ovat tiedostot, jotka lähetät NCEI: lle.[Lähetä2NCE](https://www.nodc.noaa.gov/s2n/)tai tai[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (NCEI:n edistyksellinen seuranta- ja resurssityökalu arkistokokoelmiin) .
5. Poista kaikki tiedostot niin, että vain arkistotiedostot (esim..zip) Digest (.sha256.txt) arkistoon ja (Vaihtoehtoisesti) .listOfFiles.txt-tiedostot säilyvät.

#### ISO 19115.xml Metadata-tiedostot{#iso-19115-xml-metadata-files} 
ArchiveADataset-arkistopaketti ei sisällä ISO 19115 .xml -metadatatiedostoa. Jos haluat/edellytät ISO 19115 -tiedoston toimittamista NCEI:lle, voit lähettää heille ISO 19115 .xml -metadatatiedoston.ERDDAP™Luotu tietoaineistoon (muttaNMFSIhmiset saavat ISO 19115 -tiedoston InPortista, josERDDAP™Et ole jo tarjoillut tiedostoa) .

Ongelmia? Ehdotuksia? ArchiveADataset on uusi. Jos sinulla on ongelmia tai ehdotuksia, katso[Lisätuen saaminen](/docs/intro#support).
     
