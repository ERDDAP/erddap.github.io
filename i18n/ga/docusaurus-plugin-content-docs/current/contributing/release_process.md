---
sidebar_position: 3
---
# ERDDAP™irl - Library Service
* Déan cinnte comhaid comparáid íomhá ar fáil (d'fhéadfadh sé seo i gceist ag rith ` mvn fíoraithe `, más mian leat a luas go srian suas go dtí díreach leis an ngrúpa Íomhá Comparáid cé faoi deara go n-éilíonn fós ag rith tástálacha Jetty) 
* Nuashonraigh spleáchas
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Nuashonraigh plugins
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* tástálacha Rith a dhéanamh nuashonruithe spleáchas cinnte nach raibh aon rud a bhriseadh do gach cumraíochtaí móra (datasets parsáil go háirithe, cé aon suímh suntasacha eile chomh maith) 
```
mvn verify
```
* Úsáid TranslateMessages.translate () aistriúcháin a thabhairt cothrom le dáta más gá
* EDStatic.java leagan forbartha Mód go bréagach, athrú ar an uimhir leagan agus an dáta scaoilte a shonrú.
* An bhfuil an tógáil
```
mvn clean
mvn compile
mvn package
```
## Canary
Seol an comhad cogadh le dáileadh ar an bhfreastalaí Coastwatch nó freastalaí éigin eile a úsáideann an chuid is mó de na cineálacha tacar sonraí agus faigheann a lán tráchta.
Ba mhaith linn iarracht a dhéanamh earráidí a aimsiú roimh dháileadh níos leithne ar an tógáil.

Cuir teachtaireacht nuair a insint faoi scaoileadh nua.

Is é an nós imeachta caighdeánach:
* Upload an .war comhad a coastwatch\\[taiseachas aeir: fliuch\\]/ ábhar / caipín /
* Mar úsáideoir = tomcat:
  * I\\[taiseachas aeir: fliuch\\]/ i / :
. / shutdown.sh / / úsáid "ps -fu tomcat" chun a chinntiú go bhfuil sé stop
  * I\\[taiseachas aeir: fliuch\\]/ iarratais / :
Seirbhís do Chustaiméirí
rm erddap. cogadh cogadh cogadh
cineál gas: in airde ../content/erddap/erddap2.22.war erddap.war / / nó is cuma cad é an uimhir
  * I\\[taiseachas aeir: fliuch\\]/ i / :
./startup.sh
  * Tar éis anERDDAPTá ar ais leathanach gréasáin, i\\[taiseachas aeir: fliuch\\]/ iarratais / :
An bhfuil a fhios agat?
cliceáil grianghraf a mhéadú
cliceáil grianghraf a mhéadú

## Deireadh an chomhrá
Dréacht an scaoileadh GitHub, san áireamh erddap.war agus erddapContent.zip  (aon uimhreacha leagan) 

title: The official v2.25 version
cur síos: Féach ar an liosta athruithe ar
       https://erddap.github.io/changes#version-225
 

## Nuashonraigh Doiciméid
* Nuashonrú an uimhir leagan sa docusaurus.config.ts comhad (i alt footer) .
* Cuir na leathanaigh doiciméadachta in eagar (imscaradh-install.md agus imscaradh-suasdate.md) .
  * Cuardaigh le haghaidh\\[erddap.war\\] 
  * Cóipeáil an t-eolas atá ann cheana (beagán reformatted) chuig an liosta de na suiteálacha roimhe seo 2. 2. 2.
  * Athraigh an t-eolas scaoileadh reatha le haghaidh erddap. cogadh ag\\[erddap.war\\]
* Rith na haistriúcháin don suíomh doiciméadúcháin.
* Déan iarratas tarraingt agus na hathruithe a chumasc.
* Déan iniúchadh ar an suíomh doiciméadúcháin (féach readme) .

## A chinntiú go bhfuil repos eile suas chun dáta de réir mar is gá
Den chuid is mó ciallaíonn sé seo ErddapContent agus ErddapTest, ach ba chóir iad a choinneáil suas chun dáta le linn athruithe forbartha.

## Úsáideoirí a chur in iúl
An chéad fógra a thabhairt d'úsáideoirí a d'iarr athruithe (nó a raibh a bugs socraithe) . Tabhair am dóibh athruithe a fhíorú agus / nó saincheisteanna a ardú.

ERDDAPTá leagan 2.25 ar fáil anois&#33;

Is féidir leat léamh faoi na hathruithe ag
 https://erddap.github.io/changes#version-225
 

Tá cuid de na hathruithe athruithe a mhol tú. Go raibh míle maith agat go mór do do chuid moltaí. Cuardaigh le haghaidh d'ainm sa liosta na n-athruithe chun na sonraí a fheiceáil. Bheadh sé iontach má d'fhéadfaí tú iarracht a dhéanamh amach na gnéithe nua go luath, sula fhógairt mé an leagan nua do lucht féachana níos leithne.

Má tá túERDDAPriarthóir, tá na treoracha le haghaidh uasghrádú ag
 https://erddap.github.io/docs/server-admin/deploy-update
 

Má tá aon fhadhbanna, ceisteanna, moltaí, le do thoil ríomhphost chugam.

Go raibh maith agat as úsáidERDDAP.

### Scaoileadh unsa
Seol fógra chuig an liosta seoltaí Fógraí.
