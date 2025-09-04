---
sidebar_position: 1
---

# Suiteáil
Conas a dhéanamh ar an Socrú Tosaigh ERDDAP™ ar do Freastalaí

 ERDDAP™ Is féidir a reáchtáil ar aon fhreastalaí a thacaíonn Java agus Tomcat (agus freastalaithe iarratas eile cosúil le Jetty, ach ní chuirimid tacaíocht dóibh) .
 ERDDAP™ Tástáil ar Linux (lena n-áirítear ar AWS Amazon) , Mac, agus ríomhairí Windows.

*  **Déan teagmháil Linn** -- Soláthraímid [ ERDDAP™ i gcoimeádán Docker](https://hub.docker.com/r/erddap/erddap) 
agus IOOS cuireann anois [Treoir Tosaigh Tapa do ERDDAP™ i Docker Coimeádán](https://ioos.github.io/erddap-gold-standard/index.html) .
Tá sé an caighdeán ERDDAP™ suiteáil, i gcoimeádán Docker.
Trí Doras Múirín a chuirimid ar fáil bealaí éasca a chur ar bun ssl agus monatóireacht a dhéanamh, níos mó a léamh amach [Doiciméid Docker](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Má úsáideann tú Docker cheana féin, is dócha gur fearr leat an leagan Docker.
Má tá tú ag iarraidh a reáchtáil ar sheirbhísí scamall beidh tú is fearr is dócha an leagan Docker.
*  **Amazon ag díol** -- Má tá tú a shuiteáil ERDDAP™ ar shampla Amazon Seirbhísí Gréasáin EC2, féach seo [Seirbhísí Idirlín Amazon](/docs/server-admin/additional-information#amazon) ar dtús.
*  **Linux agus Macs** -- ERDDAP™ Oibríonn mór ar Linux agus Mac ríomhairí. Féach na treoracha thíos.
*  **Windows Windows Windows** -- Tá Windows breá le tástáil ERDDAP™ agus le haghaidh úsáide pearsanta (féach na treoracha thíos) ,
ach ní mholaimid é a úsáid don phobal ERDDAP™ imscaradh. Ag rith ERDDAP™ D'fhéadfadh fadhbanna a bheith ag Windows:
go háirithe, ERDDAP™ a bheith in ann a scriosadh agus / nó comhaid a athainmniú go tapa. Tá sé seo dócha mar gheall ar bogearraí antivirus
   (e.g., ó McAfee agus Norton) a sheiceáil na comhaid le haghaidh víris. Má ritheann tú isteach an fhadhb seo
(Is féidir a fheiceáil ag teachtaireachtaí earráide i [logáil isteach.](/docs/server-admin/additional-information#log) comhad maith
"Ní féidir a scriosadh ..."), ag athrú na bogearraí antivirus socruithe a mhaolú go páirteach ar an bhfadhb. Nó a mheas ag baint úsáide as freastalaí Linux nó Mac ionad.

 **An caighdeán ERDDAP™ treoracha a shuiteáil do Linux, Macs, agus ríomhairí Windows:** 

0. Bí cinnte go bhfuil aon spleáchas suiteáilte. Ar meaisíní neamh-Windows (Linux agus Mac) , is gá duit csh.

##  Java  {#java} 

1.  [Le haghaidh ERDDAP™ v2.19+, ar bun Java 21.](#java) 
Ar chúiseanna slándála, tá sé beagnach i gcónaí is fearr a bhaint as an leagan is déanaí de Java 21.
Íoslódáil agus a shuiteáil an leagan is déanaí de
    [Adoptium's OpenJDK (taiseachas aeir: fliuch) 21 Samhain (Amharc ar gach eolas) ](https://adoptium.net/temurin/releases/?version=21) .
Chun an tsuiteáil a fhíorú, reáchtáil ` / javaJreBinDirectory / java -version `, mar shampla
`/Dúirt / áitiúil / jdk-21.0.3 +9/jre/bin / java -version .

    ERDDAP™ oibreacha le Java ó fhoinsí eile, ach molaimid Adoptium toisc go bhfuil sé an príomh, pobail-tacaíocht,
saor in aisce (mar atá i mbeoir agus óráid) leagan de Java 21 a thairgeann Tacaíocht Fadtéarmach (uasghrádú saor in aisce le blianta fada anuas ar an scaoileadh tosaigh) .
Ar chúiseanna slándála, le do thoil thabhairt cothrom le dáta do ERDDAP 's leagan de Java go tréimhsiúil mar leaganacha nua de Java 21 bheith ar fáil ó Adoptium.

    ERDDAP™ Tá tástáil agus a úsáidtear go forleathan le 21, ní leaganacha eile. Ar chúiseanna éagsúla, ní dhéanaimid tástáil le leaganacha eile de Java .
     
## cliceáil grianghraf a mhéadú{#tomcat} 

2.  [Socraigh suas](#tomcat)   [cliceáil grianghraf a mhéadú](https://tomcat.apache.org) . Is Tomcat an chuid is mó a úsáidtear go forleathan Java Freastalaí Iarratais,
a bhfuil Java bogearraí a sheasann idir seirbhísí líonra an chórais oibriúcháin agus Java bogearraí freastalaí mhaith ERDDAP™ .
Tá sé Saor in Aisce agus Oscailte Bogearraí Foinse (Seirbhís do Chustaiméirí) .

Is féidir leat a úsáid eile Java Freastalaí Iarratais (Cuardaigh le haghaidh:) , ach táimid ag tástáil ach amháin le agus tacaíocht Tomcat.

   * Íoslódáil Tomcat agus é a dhíphacáil ar do fhreastalaí nó ríomhaire.
Ar chúiseanna slándála, tá sé beagnach i gcónaí is fearr a bhaint as an leagan is déanaí de Tomcat 10 (leagan 9 agus thíos nach bhfuil inghlactha) 
atá deartha chun obair le Java 21 nó níos nuaí. Thíos, Beidh an eolaire Tomcat a tharchur mar `tomcat` .

Tuilleadh eolais Má tá tú cheana féin Tomcat ag rith roinnt iarratas gréasáin eile (go háirithe TRÍ) , molaimid duit a shuiteáil ERDDAP™ i
      [an dara Tomcat](/docs/server-admin/additional-information#second-tomcat) , mar gheall ar ERDDAP™ riachtanais éagsúla suímh Tomcat
agus níor chóir a contend le hiarratais eile do chuimhne.

     * Ar Linux, [íoslódáil an "Core" "tar .gz " Tomcat dáileadh](https://tomcat.apache.org/download-10.cgi) agus é a dhíphacáil.
Molaimid é a dhíphacáil i `/usr/áitiúil `.
     * Ar Mac, is dócha go bhfuil Tomcat suiteáilte cheana féin i `/Library/Tomcat`, ach ba chóir é a thabhairt cothrom le dáta go dtí an leagan is déanaí de Tomcat 10.
Má íoslódáil tú é, [íoslódáil an "Core" "tar .gz " Tomcat dáileadh](https://tomcat.apache.org/download-10.cgi) agus é a dhíphacáil i `/Library/Tomcat` .
     * Ar Windows, is féidir leat [íoslódáil an "Core" "zip" Tomcat dáileadh](https://tomcat.apache.org/download-10.cgi) 
        (nach praiseach leis an chlár Windows agus a rialú tú ó líne ordú DOS) agus é a dhíphacáil in eolaire cuí.
        (Le haghaidh forbartha, bainimid úsáid as an dáileadh "Core" "zip". Déanaimid ` / cláir ` eolaire agus unpack sé ann .) 
Nó is féidir leat a íoslódáil an "Core" "64-giotán Windows zip" dáileadh, lena n-áirítear níos mó gnéithe.
Más suiteálaí Windows é an dáileadh, is dócha go gcuirfidh sé Tomcat isteach, mar shampla, ` / Comhaid Clár / pache-tomcat-10.0.23 `.
             
### riachtanais uisce: measartha{#serverxml} 

*  [riachtanais uisce: measartha](#serverxml) - Sa `tomcat / conf / server.xml ` comhad, tá dhá athruithe gur chóir duit a dhéanamh ar gach ceann den dá ` <Connector> ` clibeanna
   (ceann amháin le haghaidh ` rÃ omhaire port = "80" ` agus ceann amháin le haghaidh rÃ omhaire port = "8443" `) .
   1.  (Molta) Méadú ar an luach paraiméadar `connectionTimeout`, b'fhéidir go 300000 (milliseconds, atá 5 nóiméad) .
   2.  (Molta) Cuir paraiméadar nua: `relaxedQueryChars ="[] | ". Tá sé seo roghnach agus beagán níos lú slán,
ach cuireann an gá atá le húsáideoirí chun faoin gcéad-ionchódú na carachtair nuair a tharlaíonn siad i paraiméadair URL iarraidh úsáideora.
             
### ábhar.xml{#contentxml} 

* an Ríocht Aontaithe -- Acmhainní Cache - I `tomcat/conf/context.xml `, ceart roimh an ` </Context> ` chlib, athrú ar an chlib Acmhainní
   (nó é a chur mura bhfuil sé ann cheana féin) a shocrú ar an taisce Uasmhéid paraiméadar go 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Seachnaíonn sé seo go leor rabhaidh i catalina. amach go bhfuil gach tús le
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Amharc ar gach eolas{#apache-timeout} 

* Ar ríomhairí Linux, athrú ar na suímh timeout Apache ionas nach mbeidh iarratais úsáideora am-íditheach timeout
   (leis an méid is cosúil go minic mar earráid "Proxy" nó "Bad Gateway") . Mar an t-úsáideoir fréimhe:
  * Athraigh an Apache ` http d.conf ` comhad (de ghnáth i `/etc / http d/conf/ ` .) :
    * Athrú ar an ` atá ann cheana <Timeout> ` leagan síos (nó cuir ceann ag deireadh an chomhaid) go 3600 (soicind soicind) , in ionad an réamhshocraithe 60 nó 120 soicind.
    * Athrú ar an ` atá ann cheana <ProxyTimeout> ` leagan síos (nó cuir ceann ag deireadh an chomhaid) go 3600 (soicind soicind) , in ionad an réamhshocraithe 60 nó 120 soicind.
  * Atosaigh Apache: `/usr/sbin / aicéatáit bláthanna cumhra: cumhráin ` . (ach uaireanta tá sé i eolaire éagsúla) .

### Slándáil agus Slándáil{#security} 
         
* Moladh slándála: Féach ar [na treoracha seo](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) chun slándáil a mhéadú
do shuiteáil Tomcat, go háirithe le haghaidh freastalaithe poiblí.
         
* Le haghaidh poiblí ERDDAP™ suiteálacha ar Linux agus Macs, is fearr Tomcat a chur ar bun (an clár) mar a bhaineann le úsáideoir `tomcat ` .
   (úsáideoir ar leith le ceadanna teoranta agus a [Níl aon focal faire](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Dá bhrí sin, is féidir ach an t-úsáideoir Super athrú chun gníomhú mar úsáideoir `tomcat` . Seo a dhéanann sé dodhéanta do hackers a logáil isteach ar do fhreastalaí mar úsáideoir ` tomcat` .
Agus in aon chás, ba chóir duit é a dhéanamh ionas go bhfuil an `tomcat` úsáideoir ceadanna an-teoranta ar chóras comhaid an fhreastalaí (léamh + scríobh + pribhléidí execute
don `apache-tomcat` crann eolaire agus ` <bigParentDirectory> ` agus pribhléidí a léamh-amháin do eolairí le sonraí a ERDDAP™ riachtanais rochtain ar).
  * Is féidir leat a chruthú ar an cuntas úsáideora `tomcat` (a bhfuil aon focal faire) trí úsáid a bhaint as an ordú:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Is féidir leat athrú a bheith ag obair mar úsáideoir `tomcat ` trí úsáid a bhaint as an ordú
    ```
    sudo su - tomcat
    ```
     (Beidh sé a iarraidh ort le haghaidh an focal faire superuser le cead a dhéanamh seo.) 
    * Is féidir leat stop a chur ag obair mar tomcat úsáideoir ag baint úsáide as an ordú
    ```
    exit
    ````
    * An bhfuil an chuid is mó den chuid eile den Tomcat agus ERDDAP™ treoracha thus mar úsáideoir `tomcat` . Níos déanaí, reáchtáil an `startup.sh` agus `shutdown.sh` scripteanna mar úsáideoir ` ` .
ionas go bhfuil cead ag Tomcat scríobh chuig a chuid comhad logála.
    * Tar éis unpacking Tomcat, ó thuismitheoir an `apache-tomcat` eolaire:
      * Athrú úinéireacht an crann eolaire apache-tomcat chuig an úsáideoir tomcat.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (ach an t-ainm iarbhír de do eolaire tomcat ionad) .
      * Athraigh an "grúpa" a bheith tomcat, d'ainm úsáideora, nó ainm grúpa beag a n-áirítear tomcat agus riarthóirí Tomcat / ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Athruithe ceadanna ionas go tomcat agus an grúpa a léamh, scríobh, pribhléidí a fhorghníomhú:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Bain "eile" ceadanna úsáideora a léamh, a scríobh, nó a fhorghníomhú:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Tá sé seo tábhachtach, toisc go gcuireann sé cosc ar úsáideoirí eile ó léamh, b'fhéidir faisnéis íogair i ERDDAP™ comhaid thus.

### Cuimhne{#memory} 

Socraigh Athróga Comhshaoil Tomcat

* Ar Linux agus Macs:
Cruthaigh comhad `tomcat/bin / setenv.sh ` . (nó i Red Hat Enterprise Linux \\[ SEIRBHÍSÍ \\] , in eagar ` ~tomcat/conf/tomcat10.conf ` .) a shocrú athróg timpeallacht Tomcat ar.
Beidh an comhad seo a úsáid ag `tomcat/bin/startup.sh` agus `shutdown.sh` . Ba chóir go mbeadh an comhad rud éigin cosúil le:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (ach a chur in ionad na hainmneacha eolaire ó do ríomhaire) .
   (Má leagtar tú cheana `JRE_HOME`, is féidir leat é sin a bhaint.) 
Ar Macs, is dócha nach gá duit a shocrú `JAVA_HOME.

* Ar Windows:
Cruthaigh comhad `tomcat\bin\\setenv.bat ` a shocrú athróg timpeallacht Tomcat ar .
Beidh an comhad a úsáid ag `tomcat\bin\\startup.bat` agus ` shutdown.bat ` .
Ba chóir go mbeadh an comhad rud éigin cosúil le:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (ach a chur in ionad na hainmneacha eolaire ó do ríomhaire) .
Má tá sé seo ach le haghaidh tástála áitiúil, bain "freastalaí".
   (Má leagtar tú cheana `JRE_HOME`, is féidir leat é sin a bhaint.) 

Tá an `-Xmx` agus `-Xms ` socruithe cuimhne tábhachtach mar gheall ar ERDDAP™ Oibríonn níos fearr le cuimhne níos mó.
I gcónaí a leagtar `-Xms` leis an luach céanna mar `-Xmx` .

* Do 32 Córais Oibriúcháin giotán agus 32 giotán Java :
64 giotán Java Tá i bhfad níos fearr ná 32 giotán Java , ach 32 giotán Java beidh ag obair chomh fada agus nach bhfuil an freastalaí i ndáiríre gnóthach.
An chuimhne níos fisiciúla sa fhreastalaí an níos fearr: Tá 4 + GB i ndáiríre go maith, tá 2 GB ceart go leor, ní mholtar níos lú.
Le 32 giotán Java , fiú le cuimhne fhisiceach flúirseach, Tomcat agus Java Ní bheidh ar siúl má iarracht tú a shocrú `-Xmx` i bhfad os cionn 1500M (1200M ar roinnt ríomhairí) .
Má tá do fhreastalaí níos lú ná 2GB de chuimhne, laghdú ar an luach `-Xmx` (i 'M'egaBytes) go 1/2 de chuimhne fisiciúil an ríomhaire.

* Do 64 Córais Oibriúcháin giotán agus 64 giotán Java :
64 giotán Java ní oibreoidh sé ach ar chóras oibriúcháin giotán 64.
  * Le Java 8, ní mór duit a chur `-d64` leis an Tomcat ` CATALINA_OPTS ` paraiméadar i `setenv.bat` .
  * Le Java 21, roghnaíonn tú 64 giotán Java nuair a íoslódáil tú leagan de Java marcáilte "64 giotán".

Le 64 giotán Java , Tomcat agus Java Is féidir úsáid a bhaint as an-ard `-Xmx` agus `-Xms` suímh . An chuimhne níos fisiciúla sa fhreastalaí an níos fearr.
Mar moladh simplistic: molaimid duit a leagtar `-Xmx` agus `-Xms`a (i 'M'egaBytes) go 1/2 (nó níos lú) de chuimhne fisiciúil an ríomhaire.
Is féidir leat a fheiceáil má Tomcat, Java , agus ERDDAP™ go deimhin ag rith i 64 mód giotán ag cuardach le haghaidh "giotán," i ERDDAP 's Daily Report ríomhphost
nó sa `bigParentDirectory/logs/ [logáil isteach.](/docs/server-admin/additional-information#log) ` comhad (`bigParentDirectory ` sonraithe i [riachtanais uisce: measartha](#setupxml) ) .

#### Bailiúchán Garáiste{#garbage-collection} 

* I ERDDAP™ 's [logáil isteach.](/docs/server-admin/additional-information#log) comhad, feicfidh tú go leor "GC (Naisc ábhartha eile) " teachtaireachtaí.
Níl an Tweet seo ar fáil. Is teachtaireacht go minic ó oibriú de ghnáth Java ag rá go bhfuil sé críochnaithe ach truflais saorga
bailiúchán toisc go raibh sé as an seomra in Eden (an t-alt den Java carn do rudaí an-óg) . De ghnáth, léiríonn an teachtaireacht tú
`Mearrbhachas-bhíseán . Má tá an dá uimhir sin gar le chéile, ciallaíonn sé nach raibh an bailiúchán truflais táirgiúil.
Is é an teachtaireacht ach comhartha trioblóide má tá sé go minic (gach cúpla soicind) , nach bhfuil táirgiúil, agus tá na huimhreacha mór agus nach bhfuil ag fás,
a léiríonn le chéile go Java riachtanais cuimhne níos mó, ag streachailt chun saor in aisce suas cuimhne, agus nach bhfuil in ann a saor in aisce suas cuimhne.
D'fhéadfadh sé seo tarlú le linn am strusmhar, ansin dul amach. Ach má leanann sé, is comhartha trioblóide é sin.
* Má fheiceann tú `java.lang.OutOfMemoryEror`s i ERDDAP™ 's [logáil isteach.](/docs/server-admin/additional-information#log) comhad,
féach ar [Seirbhís do Chustaiméirí](/docs/server-admin/additional-information#outofmemoryerror) le haghaidh leideanna maidir le conas na fadhbanna a dhiagnóisiú agus a réiteach.
         
### Ceadúnas Madraí ar Líne{#permissions} 

*  [Ar Linux agus Macs, athrú na ceadanna](#permissions) de gach `*.sh` comhaid i `tomcat/bin/` a bheith inrite ag an úinéir:
  ```
  chmod +x *.sh
  ```

### Seirbhís do Chustaiméirí{#fonts} 

*  [Fonts le haghaidh íomhánna:](#fonts) Is fearr linn go láidir ar an saor in aisce [Seirbhís do Chustaiméirí](https://dejavu-fonts.github.io/) go dtí an ceann eile Java clónna.
Ag baint úsáide as na clónna Moltar go láidir ach ní gá.

Má roghnaíonn tú gan úsáid a bhaint as na clónna DejaVu, ní mór duit a athrú ar an suíomh cló Teaghlaigh i thus.xml go ` <fontFamily> Seirbhís do Chustaiméirí </fontFamily> `,
atá ar fáil le gach Java dáiltí. Má leagtar tú ` <fontFamily> ` leis an ainm cló nach bhfuil ar fáil, ERDDAP™ Ní bheidh ualach
agus beidh a phriontáil liosta de na clónna ar fáil sa `log.txt ` comhad. Ní mór duit ceann de na clónna sin a úsáid.

Má roghnaíonn tú na clónna DejaVu a úsáid, déan cinnte an ` <fontFamily> ` leagan síos i thus .xml ` <fontFamily> Seirbhís do Chustaiméirí </fontFamily> ` .

Chun na clónna DejaVu a shuiteáil, le do thoil íoslódáil [Seirbhís do Chustaiméirí .zip ](/DejaVuFonts.zip)   (5,522,795 bytes, MD5 = 33E1E61FAB06A547851ED308B4FFEF42) 
agus unzip na comhaid cló ar eolaire sealadach.

  * Ar Linux:
    * Do Linux Adoptium Java dáiltí, féach [na treoracha seo](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Le eile Java dáiltí: Mar an `tomcat` úsáideoir, cóip na comhaid cló isteach `$JAVA_HOME /lib / fonts` mar sin Java Is féidir teacht ar na clónna.
Cuimhnigh: má / nuair a uasghrádú tú níos déanaí go leagan níos nuaí de Java , ní mór duit na clónna seo a athshuiteáil.
  * Ar Macs: do gach comhad cló, cliceáil dúbailte ar sé agus ansin cliceáil Suiteáil Font.
  * Ar Windows 7 agus 10: i Windows Explorer, roghnaigh gach ceann de na comhaid cló. Cliceáil ar dheis. Cliceáil ar Suiteáil.
             
### Tástáil Tomcat{#test-tomcat} 

* Tástáil do shuiteáil Tomcat.
  * Linux:
    * Mar úsáideoir "tomcat", reáchtáil `tomcat/bin/startup.sh` .
    * Féach ar do URL + ":8080/" i do bhrabhsálaí (e.g., [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac an Duine (reáchtáil tomcat mar an t-úsáideoir riarthóir córas) :
    * Rith `Tomhaltáin / tosaithe .sh .
    * Féach ar do URL + ":8080/" i do bhrabhsálaí (e.g., [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Tabhair faoi deara go de réir réamhshocraithe, tá do Tomcat inrochtana ach amháin ag tú. Níl sé inrochtana go poiblí.
  * Windows localhost:
    * cliceáil ar dheis ar an deilbhín Tomcat sa tráidire córas, agus roghnaigh "seirbhís ealaíne".
    * Féach ar an roghchlár [http://127.0.0.1:8080/](http://127.0.0.1:8080/) , nó b'fhéidir [http://localhost:8080/](http://localhost:8080/) , i do bhrabhsálaí. Tabhair faoi deara go de réir réamhshocraithe, tá do Tomcat inrochtana ach amháin ag tú. Níl sé inrochtana go poiblí.

Ba chóir duit a fheiceáil ar an Tomcat "Comhghairdeas" leathanach.

Má tá deacracht ann, féach an comhad logála Tomcat ag `tomcat / logs / catalina.out `.

### Trioblóidí leis an suiteáil Tomcat?{#troubles-with-the-tomcat-installation} 

* Ar Linux agus Mac, más rud é nach féidir leat teacht ar Tomcat nó ERDDAP™   (nó b'fhéidir nach féidir leat a bhaint amach ach iad ó ríomhaire taobh amuigh de do balla dóiteáin) ,
is féidir leat a thástáil má tá Tomcat ag éisteacht le port 8080, ag clóscríobh (mar fhréamh) ar líne ordú an fhreastalaí:

  ```
  netstat -tuplen | grep 8080
  ```

Ba chóir sin ar ais líne amháin le rud éigin cosúil le:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (i gcás ` # `Is roinnt dhigit) , ag léiriú go bhfuil próiseas `java` (Tomcat go mór) ag éisteacht ar port "8080" le haghaidh "tcp" tráchta.
Más rud é nach raibh aon línte ar ais, má tá an líne ar ais go suntasach difriúil, nó má tugadh ar ais dhá líne nó níos mó, ansin d'fhéadfadh go mbeadh fadhb leis na suímh port.

* Féach an comhad log Tomcat `tomcat / logs / catalina.out `. fadhbanna Tomcat agus roinnt ERDDAP™ Tá fadhbanna tosaithe le fios beagnach i gcónaí ann.
Níl an Tweet seo ar fáil ERDDAP™ .

* Féach an [cliceáil grianghraf a mhéadú](https://tomcat.apache.org/) láithreán gréasáin nó cuardach a dhéanamh ar an ngréasán le haghaidh cabhair, ach le do thoil in iúl dúinn na fadhbanna a bhí agat agus na réitigh a fuair tú.

* Féach ar ár [alt ar thacaíocht bhreise a fháil](/docs/intro#support) .
             
###  ERDDAP™ Clár na dToghthóirí{#erddap-content} 
3.   [Socraigh suas an `tomcat / Content/erddap` comhaid chumraíocht .](#erddap-content) 
Ar Linux, Mac, agus Windows, íoslódáil [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
agus unzip sé isteach ar an `tomcat` eolaire, a chruthú ` tomcat / Content/erddap` .

__Version 1.0.0, 20333 bytes, MD5 = 2B8D2A5AE5ED73E3A42B529C168C60B5, dáta 2024-10-14

Tá roinnt leaganacha roimhe seo ar fáil freisin:

    *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 beart, MD5 = 8F892616BAEEF2DF0F4BB036DCB4AD7C, dáta 2022-02-16) 
    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 beart, MD5 = 8F892616BAEEF2DF0F4BB036DCB4AD7C, dáta 2022-02-16) 
    *  [Déan teagmháil anois](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 beart, MD5 = 1E26F62E7A06191EE68C40B9A29362, dáta 2022-10-09) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 beart, MD5 = 1E26F62E7A06191EE68C40B9A29362, dáta 2022-12-08) 
    *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 beart, MD5 = 1E26F62E7A06191EE68C40B9A29362, dáta 2023-02-27) 

#### Eolaire eile{#other-directory} 

Do Red Hat Enterprise Linux (SEIRBHÍSÍ) nó le haghaidh cásanna eile nuair nach bhfuil tú cead a mhodhnú ar an eolaire Tomcat nó nuair is mian leat/need
a chur ar an ERDDAP™ eolaire ábhar i roinnt suíomh eile ar chúis éigin eile (mar shampla, má úsáideann tú Jetty in ionad Tomcat) ,
cliceáil grianghraf a mhéadú .zip ` isteach ar an eolaire atá ag teastáil (a bhfuil ach an `tomcat ` úsáideoir rochtain) agus a leagtar ar an ` erddapContentDirectory ` maoin córais
 (e.g. ` erddapContentDirectory  =~tomcat/content/erddap ` .) amhlaidh ERDDAP™ Is féidir teacht ar an eolaire ábhar nua.

### riachtanais uisce: measartha{#setupxml} 

*  [Léigh na tuairimí i `tomcat / Content/erddap / setup.xml ` .](#setupxml) agus na hathruithe a iarrtar a dhéanamh. Is thus.xml an comhad le gach ceann de na suímh a shonrú conas do ERDDAP™ iompar.

Maidir leis an thus tosaigh, MUST tú ar a laghad na socruithe seo a athrú:
      * ` . <bigParentDirectory> ` .
      * ` . <emailEverythingTo> ` .
      * ` . <baseUrl> ` .
      * ` . <email...> ` socruithe
      * ` . <admin...> ` socruithe
      * ` . <baseHttpsUrl> ` . (nuair a bhunaigh tú https ) 

Nuair a chruthaíonn tú an Treoir do Thuismitheoirí mór, ón eolaire tuismitheoir de Threoir do Thuismitheoirí mór:

    * Déan an t-úsáideoir `tomcat` an t-úinéir an `bigParentDirectory `:
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Athraigh an "grúpa" a bheith tomcat, d'ainm úsáideora, nó ainm grúpa beag a n-áirítear tomcat agus riarthóirí Tomcat / ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Athruithe ceadanna ionas go tomcat agus an grúpa a léamh, scríobh, pribhléidí a fhorghníomhú:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Bain ceadanna úsáideora "eile" a léamh, a scríobh, nó a fhorghníomhú. Tá sé seo tábhachtach cosc a chur ar léamh, b'fhéidir faisnéis íogair
i ERDDAP™ comhaid agus comhaid a logáil le faisnéis faoi tacair sonraí príobháideacha.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Athróga Comhshaoil{#environment-variables} 

Ag tosú le ERDDAP™ v2.13, ERDDAP™ Is féidir le riarthóirí override aon luach i thus.xml trí shonrú athróg timpeallacht
ainmnithe ` ERDDAP _valueName ` roimh rith ERDDAP™ . Mar shampla, úsáid ` ERDDAP _baseUrl ` overrides an ` <baseUrl> ` luach .
Is féidir é seo a bheith handy nuair a imscaradh ERDDAP™ le coimeádán cosúil le Docker, mar is féidir leat a chur socruithe caighdeánach i thus.xml
agus ansin socruithe speisialta a sholáthar trí athróg comhshaoil. Má sholáthraíonn tú faisnéis rúnda ERDDAP™ tríd an modh seo,
a bheith cinnte a sheiceáil go mbeidh an t-eolas fanacht rúnda. ERDDAP™ léann ach athróg timpeallacht uair amháin in aghaidh an tosaithe,
sa chéad dara ceann de na startup, mar sin ar bhealach amháin a úsáid é seo: leagtar na hathróga comhshaoil, tús a chur ERDDAP ,
fanacht go dtí go ERDDAP™ Tá tús curtha, ansin unset na hathróga comhshaoil.

###  datasets.xml  {#datasetsxml} 

* Léigh na tuairimí i [ **Ag obair leis an datasets.xml Déan Teagmháil Linn** ](/docs/server-admin/datasets) . Níos déanaí, tar éis a gheobhaidh tú ERDDAP™ ag rith
don chéad uair (de ghnáth leis na tacair sonraí réamhshocraithe) , beidh tú a mhodhnú an XML i `tomcat / ábhar / erddap / datasets.xml ` .
a shonrú go léir na tacair sonraí is mian leat do ERDDAP™ a sheirbheáil. Níl an Tweet seo ar fáil.
agus a bhunú ERDDAP™ agus ina dhiaidh sin ag cothabháil do ERDDAP™ .

Is féidir leat sampla a fheiceáil [ datasets.xml ar GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Murab ionann agus) Anois nó (beagán níos mó dócha) sa todhchaí, más mian leat a mhodhnú comhad CSS erddap, cóip
` tomcat/content/erddap/images/erddapStart2.cs ` go ` tomcat/content/erddap/images/erddap2.cs ` agus ansin athruithe a dhéanamh air.
Athruithe ar `erddap2.css` ghlacadh ach amháin i bhfeidhm nuair ERDDAP™ Tá atosú agus is minic a cheangal ar an úsáideoir a soiléir an bhrabhsálaí comhaid i dtaisce.
     
 ERDDAP™ Ní bheidh ag obair i gceart má tá an thus.xml nó datasets.xml Níl comhad XML dea-chruthaithe. Mar sin,, tar éis tú in eagar na comhaid,
is smaoineamh maith a fhíorú go bhfuil an toradh go maith XML trí ghreamú an téacs XML isteach i checker XML cosúil [xmlvaldation](https://www.xmlvalidation.com/) .
     
### Suiteáil an erddap. comhad cogadh{#install-the-erddapwar-file} 

4. Ar Linux, Mac, agus Windows, __download [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war) _ isteach i `tomcat / webapps `:

__Version 2.28.0, 620,824,288 bytes, MD5=f948b2ba603f65a83ac6743d9e4c2, dáta 2025-08-29___

Is é an comhad .war mór toisc go bhfuil sé chósta réiteach ard, teorainn, agus sonraí ingearchló is gá chun léarscáileanna a chruthú.

Tá roinnt leaganacha roimhe seo ar fáil freisin.

   *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 beart, MD5 = 5FEA912B5D42E50EAB9591F773EA848D, dáta 2022-02-16) 
   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 beart, MD5 = 461325E97E7577EC671DD50246CCFB8B, dáta 2022-02-23) 
   *  [Déan teagmháil anois](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 beart, MD5 = F2CFF805893146E932E498FDBD519B6, dáta 2022-10-09) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 beart, MD5 = 2B33354F633294213AE2AFDCF4DA6D0, dáta 2022-12-08) 
   *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 beart, MD5 = D843A043C506725EBD6F8EFDCCA8FD5F, dar dáta 2023-03-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 beart, MD5 =970fbee172e28b0b8a07756eec898e, dar dáta 2024-06-07) 
   *  [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 beart, MD5 = 652AFC9D1421F00B5F789DA2C4732D4C, dar dáta 2024-11-07) 
   *  [Déan teagmháil anois](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 beart, MD5 = 99a725108b37708e5420986c16119, dar dáta 2025-03-31) 
   *  [2.27.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 beart, MD5 = 3b2086c659eee41452dff447bf4ef7, dar dáta 2025-06-11) 

### Cumraigh seachfhreastalaí (internet)  {#proxy} 

 ERDDAP™ a imscaradh de ghnáth taobh thiar de sheachvótálaí droim ar ais webserver chun gur féidir é a sheirbheáil ar chalafoirt HTTP caighdeánach (80 agus 443) .
Is minic a bhíonn foirceannadh SSL / TLS ag an gciseal seachfhreastalaí gréasáin chomh maith. Braitheann sonraí ar cheanglais gach imlonnaithe.

#### taiseachas aeir: fliuch{#apache} 

1. A chinntiú go `mod_proxy` agus `mod_proxy_ http ` luchtaithe:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Athraigh an ` atá ann cheana féin . <VirtualHost> ` chlib (má tá ceann amháin) , nó cuir ceann ag deireadh an chomhaid:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Más rud é ERDDAP™ a sheirbheáil ar cosán seachas ` / erddap`, a leagtar freisin ar an `X-Forwarded-Prefix` header leis an
deighleog cosán _ roimhe seo ` / erddap` . Bheadh an suíomh seo oiriúnach do ERDDAP™ a sheirbheáil ar
`/subpath/erddap`:

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Ansin atosú Apache: `/usr/sbin / aipectl bláthanna cumhra: cumhráin ` . (ach uaireanta tá sé i eolaire éagsúla) .
         
#### NGINX{#nginx} 

I nginx comhad config, a leagtar ar na headers:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Más rud é ERDDAP™ a sheirbheáil ar cosán seachas ` / erddap`, a leagtar freisin ar an `X-Forwarded-Prefix` header leis an
deighleog cosán _ roimhe seo ` / erddap` . Bheadh an suíomh seo oiriúnach do ERDDAP™ a sheirbheáil ar
`/subpath/erddap`:

```
proxy_set_header X-Forwarded-Prefix /subpath
```


D'fhonn a fháil NGINX agus ERDDAP™ ag obair i gceart le https , ní mór duit a chur ar an snippet seo a leanas taobh istigh den freastalaí Tomcat.xml ` <Host> ` bloc:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### tús a chur le Tomcat{#start-tomcat} 

*  (Ní féidir liom a mholadh ag baint úsáide as an Tomcat Bainisteoir Iarratais Gréasáin. Más rud é nach bhfuil tú go hiomlán múchadh agus startup Tomcat, luath nó ina dhiaidh sin beidh ort ceisteanna cuimhne PermGen.) 
*  (I Linux nó Mac OS, má tá tú chruthaigh úsáideoir speisialta a reáchtáil Tomcat, m.sh., tomcat, cuimhnigh a dhéanamh ar na céimeanna seo a leanas mar an t-úsáideoir.) 
* Má tá Tomcat ag rith cheana féin, stoptar síos Tomcat le (i Linux nó Mac OS) cliceáil grianghraf a mhéadú
nó (i Windows) cliceáil grianghraf a mhéadú shutdown.bat ` .

Ar Linux, bain úsáid as `ps -ef | tomcat grep ` roimh agus tar éis `shutdown.sh` chun a chinntiú go bhfuil an próiseas tomcat stop .
Ba chóir an próiseas a liostú roimh an múchadh agus sa deireadh nach bhfuil liostaithe tar éis an múchadh.
Féadfaidh sé nóiméad nó dhó a ghlacadh le haghaidh ERDDAP™ a dhúnadh go hiomlán síos. Bí othar. Nó má tá sé cosúil nach mbeidh sé stop a chur ar a chuid féin, a úsáid:
9.00 r.n. <processID> ` .
* Tosaigh Tomcat le (i Linux nó Mac OS) `Tosaigh/bin/startup.sh` nó (i Windows) cliceáil grianghraf a mhéadú ` .

## Is maith liom ERDDAP™ ag rith?{#is-erddap-running} 

Úsáid brabhsálaí chun iarracht a dhéanamh féachainthttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ Tosaíonn suas gan aon tacar sonraí luchtaithe. Tá tacar sonraí luchtaithe i snáithe cúlra agus mar sin a bheith ar fáil ar cheann.

### Fabhtcheartú{#troubleshooting} 

* Nuair a thagann iarraidh ó úsáideoir i, téann sé go Apache (ar Linux agus Mac OS ríomhairí) , ansin Tomcat, ansin ERDDAP™ .
* Is féidir leat a fheiceáil cad a thagann chun Apache (agus earráidí gaolmhara) sna comhaid Apache logáil.
*    [Tá tú](/docs/server-admin/additional-information#tomcat-logs) Is féidir a fheiceáil cad a thagann chun Tomcat (agus earráidí gaolmhara) 
i comhaid log Tomcat (`tomcat / logs/catalina.out` agus comhaid eile san eolaire) .
*    [Tá tú](/docs/server-admin/additional-information#log) Is féidir a fheiceáil cad a thagann chun ERDDAP , teachtaireachtaí diagnóiseacha ó ERDDAP ,
agus teachtaireachtaí earráide ó ERDDAP , sa ERDDAP™ ` . <bigParentDirectory> / logs / log.txt ` comhad.
* Ní Tomcat tús ERDDAP™ go dtí go bhfaigheann Tomcat iarratas ar ERDDAP™ . Mar sin, is féidir leat a fheiceáil i comhaid log Tomcat má tá sé
tús curtha ERDDAP™ nó má tá teachtaireacht earráide a bhaineann leis an iarracht sin.
* Nuair a bheidh ERDDAP™ Tosaíonn suas, renames sé an sean ERDDAP™ comhad logála.txt (cliceáil grianghraf a mhéadú Ag <CurrentTime> cliceáil grianghraf a mhéadú) agus cruthaíonn comhad log.txt nua.
Mar sin, má tá an `log.txt ` comhad d'aois, tá sé ina comhartha go ERDDAP™ Nach bhfuil atosaíodh le déanaí. ERDDAP™ scríobhann eolas logáil isteach ar maolán
agus scríobhann sé ach an maolán chuig an gcomhad logála go tréimhsiúil, ach is féidir leat bhfeidhm ERDDAP™ an maolán a scríobh chuig an gcomhad logála trí chuairt a thabhairt
` . /erddap/status.html ` .

### Trioblóid: Leagan d'aois Java  {#trouble-old-version-of-java} 

Má tá tú ag baint úsáide as leagan de Java go bhfuil ró-aois le haghaidh ERDDAP , ERDDAP™ Ní bheidh a reáchtáil agus beidh tú a fheiceáil teachtaireacht earráide i comhad logáil Tomcat ar mhaith

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

Is é an réiteach a thabhairt cothrom le dáta ar an leagan is déanaí de Java agus déan cinnte go bhfuil Tomcat ag baint úsáide as é.

### Trioblóid: Slow Startup Chéad Am{#trouble-slow-startup-first-time} 

Tomcat Tá a lán oibre a dhéanamh den chéad uair iarratas cosúil ERDDAP™ Tá tús curtha; go háirithe, tá sé a unpack an `erddap.war ` comhad
 (atá cosúil le .zip comhad comhad) . Ar roinnt freastalaithe, an chéad iarracht chun féachaint ERDDAP™ stallaí (30 soicind?) go dtí go bhfuil an obair seo críochnaithe.
Ar fhreastalaithe eile, beidh an chéad iarracht theipeann láithreach. Ach má tá tú ag fanacht 30 soicind agus iarracht a dhéanamh arís, beidh sé n-éireoidh má ERDDAP™ suiteáilte i gceart.

Níl aon shocrú seo. Tá sé seo ach conas a oibríonn Tomcat. Ach tharlaíonn sé ach an chéad uair tar éis a shuiteáil tú leagan nua de ERDDAP™ .

## Shut síos agus atosú{#shut-down-and-restart} 

Sa todhchaí, a dhúnadh síos (agus atosú)   ERDDAP™ , féach [Conas a Shut Dúin agus Atosú Tomcat agus ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Trioblóid?{#trouble} 

Trioblóidí a shuiteáil Tomcat nó ERDDAP™ ? Féach ar ár [alt ar thacaíocht bhreise a fháil](/docs/intro#support) .

## Fógra ríomhphoist ar Leaganacha Nua ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Más mian leat ríomhphost a fháil aon uair leagan nua de ERDDAP™ ar fáil nó tábhachtach eile ERDDAP™ fógraí,
is féidir leat a bheith ar an ERDDAP™ fógraí liosta [anseo](https://groups.google.com/g/erddap-announce) . An meán liosta thart ar aon r-phost gach trí mhí.

## Saincheaptha{#customize} 

*  [Saincheap do ERDDAP™ aird a tharraingt ar do eagraíocht (taiseachas aeir: fliuch NOAA   ERD ) .](#customize) 
* Athraigh an mbratach atá le feiceáil ag barr gach ERDDAP™ leathanaigh .html trí eagarthóireacht ar an ` <startBodyHtml5> ` chlib i do ` . datasets.xml ` comhad.
(Más rud é nach bhfuil ceann, cóip an mhainneachtain ó ERDDAP™ 's ` tomcat/webapps/iarbhall/WEB-INF/aicmí/gov/nó/pfel/iarbhalla/util/messages.xml ` comhad comhad
isteach ` datasets.xml ` agus in eagar é.) Mar shampla, d'fhéadfá:
  * Bain úsáid as íomhá éagsúla (i.e., lógó d'eagraíocht) .
  * Athraigh an dath cúlra.
  * Athrú " ERDDAP™ " go dtí "_YourOrganization_'s ERDDAP™ " " "
  * Athrú "Easier access to scientific data" go "Easier access to _YourOrganization_'s data".
  * Athraigh na naisc "Brought chun tú ag" a bheith naisc chuig do eagraíocht agus foinsí maoinithe.
* Athraigh an t-eolas ar an taobh clé den leathanach baile ag eagarthóireacht ar an ` <theShortDescriptionHtml> ` chlib i do ` . datasets.xml ` comhad.
(Más rud é nach bhfuil ceann, cóip an mhainneachtain ó ERDDAP™ 's ` tomcat/webapps/iarbhall/WEB-INF/aicmí/gov/nó/pfel/iarbhalla/util/messages.xml ` comhad comhad
isteach ` datasets.xml ` agus in eagar é.) Mar shampla, d'fhéadfá:
  * Déan cur síos ar cad a dhéanann do eagraíocht agus / nó grúpa.
  * Déan cur síos ar cén cineál sonraí seo ERDDAP™ Tá.
  * A athrú ar an deilbhín gur dealraitheach ar tabs bhrabhsálaí, cuir favicon do eagraíocht. i `tomcat/content/erddap/images/` .
Féach arhttps://en.wikipedia.org/wiki/Favicon.
