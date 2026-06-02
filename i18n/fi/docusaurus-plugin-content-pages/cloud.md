---
title: "ERDDAP™ and the Cloud"
---
#  ERDDAP™ ja pilvi

## Mikä on pilvi

Yksinkertaisin määritelmä ei ole palvelin. Se on hyvin laaja ja voi tarkoittaa monia eri asenteita. Esimerkiksi se voi olla omistautunut fyysinen palvelin datakeskuksessa, virtuaalinen yksityinen palvelin, jaettu palvelin, palvelin, tai jotain muuta.

### Miksi pilvi

On monia syitä, miksi ihmiset haluavat siirtyä pilveen. Tärkein niistä on joustavuus, jota se tarjoaa laskenta- ja varastointitarpeisiin verrattuna fyysisen laitteiston ostamiseen.

Tämä poistaa tarvetta ylläpitää palvelin- ja datakeskusta. Se mahdollistaa myös skaalauksen nykyisiin tarpeisiin. Kuten pilvi voi tarkoittaa monia asioita, myös kyky skaalata resursseja. Se voi tarkoittaa, että maksat enemmän (tai vähemmän) palvelinvapaita resursseja. Se voi tarkoittaa siirtymistä jaetusta palvelimesta yksityiseen palvelimeen. Se voi tarkoittaa suuremman fyysisen palvelimen päivittämistä.

## voi ERDDAP™ Juokse pilvessä?

Kyllä.

 ERDDAP™ Se on suunniteltu toimimaan Tomcatissa, jota voidaan käyttää paikallisesti tai pilviympäristössä. Virallinen Docker-kuva on saatavilla [Kirjoittaja Hub](https://hub.docker.com/r/erddap/erddap) . The `Alkuperäinen nimi: Alpha-latest` Rakennukset perustuvat uusimpiin muutoksiin (Jotain "yöllä" -julkaisua, [Alfa-viimeiset yksityiskohdat](https://hub.docker.com/layers/erddap/erddap/alpha-latest/) ) Vaikka `Alkuperäinen nimi: Thelatest` Viimeisin testattu vapautus ( [Viimeisimmät yksityiskohdat](https://hub.docker.com/layers/erddap/erddap/latest/) ) . Voit myös selata GitHub-säiliörekisteriä [GitHub-paketit](https://github.com/ERDDAP/erddap/pkgs/container/erddap) . Voit lukea lisää käyttämisestä ERDDAP™ kanssa [Docker](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .

Kubernetes-lähetyksille nähtävyydet [dokumentointi](https://erddap.github.io/docs/server-admin/admin-tips/deploy-kubernetes) .

Tämä sanoi, ERDDAP™ Se oli suunniteltu aikana, jolloin palvelimet olivat normaaleja. Se ei ole palvelinkelvotonta, ja se olisi erittäin vaikeaa, jos se ei olisi mahdotonta.

### voi ERDDAP™ mittakaavassa?

Scaling ERDDAP™ Se on hankalampaa kuin vain käyttää enemmän palvelimia. Meillä on hyviä dokumentteja [Kuinka skaalata ERDDAP™ ](https://erddap.github.io/docs/server-admin/scaling) . Helpompi skaalata ERDDAP™ Se on jotain, mistä olemme kiinnostuneita.

### Mikä estää automaattisuuden?

 ERDDAP™ tekee monia asioita, kuten pitää tietoaineistoja ajan tasalla, ilmoittaa tilaajille muutoksia tietoaineistoihin, välitystiedot, käsittely käyttäjän pyynnöt, ja paljon muuta. riittävän laajalle ERDDAP™ Palvelin kuin [Coastwatch](https://coastwatch.pfeg.noaa.gov/erddap/index.html) Tämä tarkoittaa, että se tekee jatkuvasti jotain. Jatkuva käyttö on todella kallis tilanne palvelinvapaille vaihtoehdoille. (maksat suuren palkkion, kun käytät palvelinta ja siksi tärkein etu on, kun soitat vain silloin tällöin.) . Yrittää liikkua kaikki ERDDAP™ Palvelimettomien versioiden eri toiminnallisuus päätyisi huomattavasti monimutkaisempaan asetteluun, jota tarvitaan ylläpitäjille.

### voi ERDDAP™ Käytätkö pilvitallennustilaa?

Kyllä.

 ERDDAP™ Tukee pilvitallennustilaa (AWS S3) Tämän tuen parantaminen (Ei-AWS S3) on korkea prioriteetti ERDDAP™ etenemissuunnitelma. ERDDAP™ pystyy myös vetämään tietoja monista olemassa olevista verkkopalveluista. Lisätietoja suosittelen katsomaan läpi [Tietojen tyyppidokumentaatio](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) .
