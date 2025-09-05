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
   (e.g., ó McAfee agus Norton) atá ag seiceáil na comhaid le haghaidh víris. Má ritheann tú isteach an fhadhb seo
(Is féidir a fheiceáil ag teachtaireachtaí earráide i [logáil isteach.](/docs/server-admin/additional-information#log) comhad maith
"Ní féidir a scriosadh ..."), ag athrú na bogearraí antivirus socruithe a mhaolú go páirteach ar an bhfadhb. Nó a mheas ag baint úsáide as freastalaí Linux nó Mac ionad.

 **An caighdeán ERDDAP™ treoracha a shuiteáil do Linux, Macs, agus ríomhairí Windows:** 

0. Bí cinnte go bhfuil aon spleáchas suiteáilte. Ar meaisíní neamh-Windows (Linux agus Mac) , is gá duit csh.

##  Java  {#java} 

1.  [Le haghaidh ERDDAP™ v2.19+, ar bun Java 21.](#java) 
Ar chúiseanna slándála, tá sé beagnach i gcónaí is fearr a bhaint as an leagan is déanaí de Java 21.
Íoslódáil agus a shuiteáil an leagan is déanaí de
    [Adoptium's OpenJDK (taiseachas aeir: fliuch) 21 Samhain (Leathanach Main) ](https://adoptium.net/temurin/releases/?version=21) .
Chun an tsuiteáil a fhíorú, reáchtáil `cliceáil grianghraf a mhéadú --` , mar shampla
    `/ úsáid tírdhreach: coimeádán, flowerbed, teorann --` .

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
Ar chúiseanna slándála, tá sé beagnach i gcónaí is fearr a bhaint as an leagan is déanaí de Tomcat 10 (Níl leagan 9 agus thíos inghlactha) 
atá deartha chun obair le Java 21 nó níos nuaí. Anseo thíos, beidh an eolaire Tomcat a tharchur mar `taiseachas aeir: fliuch` .

Tuilleadh eolais Má tá tú cheana féin Tomcat ag rith roinnt iarratas gréasáin eile (go háirithe THREDDS) , molaimid duit a shuiteáil ERDDAP™ i
      [an dara Tomcat](/docs/server-admin/additional-information#second-tomcat) , mar gheall ar ERDDAP™ riachtanais éagsúla suímh Tomcat
agus níor chóir a contend le hiarratais eile do chuimhne.

     * Ar Linux, [íoslódáil an "Core" "tar .gz " Tomcat dáileadh](https://tomcat.apache.org/download-10.cgi) agus é a dhíphacáil.
Molaimid é a dhíphacáil i `Seirbhís do Chustaiméirí` .
     * Ar Mac, is dócha go bhfuil Tomcat suiteáilte cheana féin i `/ Trádála / Trádála` , ach ba chóir é a thabhairt cothrom le dáta go dtí an leagan is déanaí de Tomcat 10.
Má íoslódáil tú é, [íoslódáil an "Core" "tar .gz " Tomcat dáileadh](https://tomcat.apache.org/download-10.cgi) agus é a dhíphacáil i `/ Trádála / Trádála` .
     * Ar Windows, is féidir leat [íoslódáil an "Core" "zip" Tomcat dáileadh](https://tomcat.apache.org/download-10.cgi) 
        (nach praiseach leis an chlárlann Windows agus a rialú tú ó líne ordú DOS) agus é a dhíphacáil in eolaire cuí.
        (Le haghaidh forbartha, bainimid úsáid as an dáileadh "Core" "zip". Déanaimid `/ Cláir` eolaire agus é a dhíphacáil ann.) 
Nó is féidir leat a íoslódáil an "Core" "64-giotán Windows zip" dáileadh, lena n-áirítear níos mó gnéithe.
Más suiteálaí Windows é an dáileadh, is dócha go gcuirfidh sé Tomcat isteach, mar shampla, `/ Líonra Comhaid / pache-tomcat-10.0.23` .
             
### riachtanais uisce: measartha{#serverxml} 

*  [riachtanais uisce: measartha](#serverxml) - Sa `cliceáil grianghraf a mhéadú` comhad, tá dhá athruithe gur chóir duit a dhéanamh ar gach ceann den dá ` <Connector> ` tags
   (ceann amháin le haghaidh `port phraghsanna = "8080"` agus ceann amháin do `"8443"` ) .
   1.  (Molta) Méadú `nasc nasc nasc nasc Amuigh faoin aer` luach paraiméadar, b'fhéidir go 300000 (milliseconds, atá 5 nóiméad) .
   2.  (Molta) Cuir paraiméadar nua: `tréimhse saoil: ilbhliantúil | " " "` . Tá sé seo roghnach agus beagán níos lú slán,
ach cuireann an gá atá le húsáideoirí chun faoin gcéad-ionchódú na carachtair nuair a tharlaíonn siad i paraiméadair URL iarraidh úsáideora.
             
### ábhar.xml{#contentxml} 

* cineál gas: in airde -- Acmhainní Cache - I `cliceáil grianghraf a mhéadú` , ceart roimh an ` </Context> ` tag, athrú ar an chlib Acmhainní
   (nó é a chur más rud é nach bhfuil sé ann cheana) a shocrú ar an taisce Uasmhéid paraiméadar go 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Seachnaíonn sé seo go leor rabhaidh i catalina. amach go bhfuil gach tús le
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Amharc ar gach eolas{#apache-timeout} 

* Ar ríomhairí Linux, athrú ar na suímh timeout Apache ionas nach mbeidh iarratais úsáideora am-íditheach
   (leis an méid is cosúil go minic mar earráid "Proxy" nó "Bad Gateway") . Mar an t-úsáideoir fréimhe:
  * Athraigh an Apache ` http d.` comhad comhad (de ghnáth i `/ srl http d/conf/conf/` ) :
    * Athrú ar an láthair ` <Timeout> ` leagan leagan (nó cuir ceann ag deireadh an chomhaid) go 3600 (soicind beag) , in ionad an réamhshocraithe 60 nó 120 soicind.
    * Athrú ar an láthair ` <ProxyTimeout> ` leagan leagan (nó cuir ceann ag deireadh an chomhaid) go 3600 (soicind beag) , in ionad an réamhshocraithe 60 nó 120 soicind.
  * Atosú Apache: `/ úsáid tírdhreach: bláthanna cumhra: cumhráin`   (ach uaireanta tá sé i eolaire éagsúla) .

### Slándáil agus Slándáil{#security} 
         
* Moladh slándála: Féach ar [na treoracha seo](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) chun slándáil a mhéadú
do shuiteáil Tomcat, go háirithe le haghaidh freastalaithe poiblí.
         
* Le haghaidh poiblí ERDDAP™ suiteálacha ar Linux agus Macs, is fearr Tomcat a chur ar bun (an clár) mar a bhaineann le húsáideoir `taiseachas aeir: fliuch` 
   (úsáideoir ar leith le ceadanna teoranta agus a [Níl aon focal faire](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Dá bhrí sin, is féidir ach an t-úsáideoir Super athrú chun gníomhú mar úsáideoir `taiseachas aeir: fliuch` . Seo a dhéanann sé dodhéanta do hackers a logáil isteach ar do fhreastalaí mar úsáideoir `taiseachas aeir: fliuch` .
Agus in aon chás, ba chóir duit é a dhéanamh ionas go mbeidh an `taiseachas aeir: fliuch` Tá úsáideoir ceadanna an-teoranta ar an bhfreastalaí córas comhaid (léamh + scríobh pribhléidí execute
do na `riachtanais uisce: measartha` crann eolaire agus ` <bigParentDirectory> ` agus pribhléidí a léamh-amháin do eolairí le sonraí a ERDDAP™ riachtanais rochtain ar).
  * Is féidir leat a chruthú `taiseachas aeir: fliuch` internet marketing (a bhfuil aon focal faire) trí úsáid a bhaint as an ordú:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Is féidir leat athrú chun oibriú mar úsáideoir `taiseachas aeir: fliuch` trí úsáid a bhaint as an ordú
    ```
    sudo su - tomcat
    ```
     (Beidh sé a iarraidh ort le haghaidh an focal faire superuser le cead a dhéanamh seo.) 
    * Is féidir leat a stopadh ag obair mar tomcat úsáideoir ag baint úsáide as an ordú
    ```
    exit
    ````
    * An chuid is mó den chuid eile den Tomcat agus ERDDAP™ treoracha thus mar úsáideoir `taiseachas aeir: fliuch` . Níos déanaí, reáchtáil an `tús.sh` agus `múchadh. cúthail` scripteanna mar úsáideoir `taiseachas aeir: fliuch` 
ionas go mbeidh cead ag Tomcat scríobh chuig a chuid comhad logála.
    * Tar éis unpacking Tomcat, ó thuismitheoir an `riachtanais uisce: measartha` foirm duille: líneach
      * Athrú úinéireacht an crann eolaire apache-tomcat chuig an úsáideoir tomcat.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (ach an t-ainm iarbhír de do eolaire tomcat ionad) .
      * Athrú ar an "grúpa" a bheith tomcat, do ainm úsáideora, nó ainm grúpa beag a n-áirítear tomcat agus gach riarthóirí Tomcat / ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Athruithe ceadanna ionas go tomcat agus an grúpa a léamh, scríobh, pribhléidí a fhorghníomhú:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Bain ceadanna úsáideora "eile" a léamh, a scríobh, nó a fhorghníomhú:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Tá sé seo tábhachtach, toisc go gcuireann sé cosc ar úsáideoirí eile ó léamh, b'fhéidir faisnéis íogair i ERDDAP™ comhaid thus.

### Cuimhne{#memory} 

Socraigh Athróga Comhshaoil Tomcat

* Ar Linux agus Macs:
Cruthaigh comhad `cliceáil grianghraf a mhéadú`   (nó i Red Hat Enterprise Linux \\[ SEIRBHÍSÍ \\] , in eagar `cliceáil grianghraf a mhéadú` ) a shocrú athróg timpeallacht Tomcat ar.
Beidh an comhad a úsáid ag `cliceáil grianghraf a mhéadú` agus `múchadh. cúthail` . Ba chóir go mbeadh an comhad rud éigin cosúil le:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (ach ainmneacha eolaire ó do ríomhaire a chur in ionad) .
   (Má shocraíonn tú roimhe seo `Seirbhís do Chustaiméirí` , is féidir leat é sin a bhaint.) 
Ar Macs, is dócha nach gá duit a shocrú `Seirbhís do Chustaiméirí` .

* Ar Windows:
Cruthaigh comhad `cliceáil grianghraf a mhéadú` a shocrú athróg timpeallacht Tomcat ar.
Beidh an comhad a úsáid ag `cliceáil grianghraf a mhéadú` agus ` shutdown.bat ` .
Ba chóir go mbeadh an comhad rud éigin cosúil le:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (ach ainmneacha eolaire ó do ríomhaire a chur in ionad) .
Má tá sé seo ach le haghaidh tástála áitiúil, bain "freastalaí".
   (Má shocraíonn tú roimhe seo `Seirbhís do Chustaiméirí` , is féidir leat é sin a bhaint.) 

An bhfuil `Uisce agus Séarachas` agus `- XMS` Tá socruithe cuimhne tábhachtach mar gheall ar ERDDAP™ Oibríonn níos fearr le cuimhne níos mó.
Socraigh i gcónaí `- XMS` leis an luach céanna mar `Uisce agus Séarachas` .

* Do 32 Córais Oibriúcháin giotán agus 32 giotán Java :
64 giotán Java Tá i bhfad níos fearr ná 32 giotán Java , ach 32 giotán Java beidh ag obair chomh fada agus nach bhfuil an freastalaí i ndáiríre gnóthach.
An chuimhne níos fisiciúla sa fhreastalaí an níos fearr: Tá 4 + GB i ndáiríre go maith, tá 2 GB ceart go leor, ní mholtar níos lú.
Le 32 giotán Java , fiú le cuimhne fhisiceach flúirseach, Tomcat agus Java Ní bheidh ar siúl má iarracht tú a shocrú `Uisce agus Séarachas` i bhfad os cionn 1500M (1200M ar roinnt ríomhairí) .
Má tá do fhreastalaí níos lú ná 2GB de chuimhne, laghdú ar an `Uisce agus Séarachas` luach (i 'M'egaBytes) go 1/2 de chuimhne fisiciúil an ríomhaire.

* Do 64 Córais Oibriúcháin giotán agus 64 giotán Java :
64 giotán Java ní oibreoidh sé ach ar chóras oibriúcháin giotán 64.
  * Le Java 8, ní mór duit a chur leis `An t-eagrán is déanaí` go dtí an Tomcat `CATALINA Cuntas deimhnithe` paraiméadar i `a chur ar fáil.` .
  * Le Java 21, roghnaíonn tú 64 giotán Java nuair a íoslódáil tú leagan de Java marcáilte "64 giotán".

Le 64 giotán Java , Tomcat agus Java is féidir a úsáid an-ard `Uisce agus Séarachas` agus `- XMS` socruithe. An chuimhne níos fisiciúla sa fhreastalaí an níos fearr.
Mar mholadh simplistic: molaimid duit a leagtar `Uisce agus Séarachas` agus `- XMS` go dtí (i 'M'egaBytes) go 1/2 (nó níos lú) de chuimhne fisiciúil an ríomhaire.
Is féidir leat a fheiceáil má Tomcat, Java , agus ERDDAP™ ag rith go deimhin i 64 mód giotán ag cuardach le haghaidh "giotán," i ERDDAP 's Daily Report ríomhphost
nó sa `Plean Gníomhaíochta don Oideachas [logáil isteach.](/docs/server-admin/additional-information#log) ` comhad comhad ( `Treoir do Thuismitheoirí` a shonraítear i [crios fuar: aon sonraí](#setupxml) ) .

#### Bailiúchán Garáiste{#garbage-collection} 

* I ERDDAP™ 's [logáil isteach.](/docs/server-admin/additional-information#log) comhad, feicfidh tú go leor "GC (Naisc ábhartha eile) " teachtaireachtaí.
Níl an Tweet seo ar fáil. Is teachtaireacht go minic ó oibriú de ghnáth Java ag rá go bhfuil sé críochnaithe ach truflais saorga
bailiúchán toisc go raibh sé as an seomra in Eden (an t-alt den Java carn do rudaí an-óg) . De ghnáth, léiríonn an teachtaireacht tú
   `cuimhneacháin agus monatóireachta` . Má tá an dá uimhir sin gar le chéile, ciallaíonn sé nach raibh an bailiúchán truflais táirgiúil.
Is é an teachtaireacht ach comhartha trioblóide má tá sé an-minic (gach cúpla soicind) , nach bhfuil táirgiúil, agus tá na huimhreacha mór agus nach bhfuil ag fás,
a léiríonn le chéile go Java riachtanais cuimhne níos mó, ag streachailt chun saor in aisce suas cuimhne, agus nach bhfuil in ann a saor in aisce suas cuimhne.
D'fhéadfadh sé seo tarlú le linn am strusmhar, ansin dul amach. Ach má leanann sé, is comhartha trioblóide é sin.
* Má fheiceann tú `cliceáil grianghraf a mhéadú` s i ERDDAP™ 's [logáil isteach.](/docs/server-admin/additional-information#log) comhad,
féach ar [Seirbhís do Chustaiméirí](/docs/server-admin/additional-information#outofmemoryerror) le haghaidh leideanna maidir le conas na fadhbanna a dhiagnóisiú agus a réiteach.
         
### Ceadúnas Madraí ar Líne{#permissions} 

*  [Ar Linux agus Macs, athrú na ceadanna](#permissions) go léir `*.sh` comhaid i `cliceáil grianghraf a mhéadú` a bheith inrite ag an úinéir:
  ```
  chmod +x *.sh
  ```

### Seirbhís do Chustaiméirí{#fonts} 

*  [Fonts le haghaidh íomhánna:](#fonts) Is fearr linn go láidir ar an saor in aisce [Seirbhís do Chustaiméirí](https://dejavu-fonts.github.io/) go dtí an ceann eile Java clónna.
Ag baint úsáide as na clónna Moltar go láidir ach ní gá.

Má roghnaíonn tú gan úsáid a bhaint as na clónna DejaVu, ní mór duit a athrú ar an suíomh cló Teaghlaigh i thus.xml a ` <fontFamily> Seirbhís do Chustaiméirí </fontFamily> ` ,
atá ar fáil le gach Java dáiltí. Má leagtar tú ` <fontFamily> ` le hainm cló nach bhfuil ar fáil, ERDDAP™ Ní bheidh ualach
agus beidh a phriontáil liosta de na clónna ar fáil sna `logáil isteach.` comhad. Ní mór duit ceann de na clónna sin a úsáid.

Má roghnaíonn tú na clónna DejaVu a úsáid, déan cinnte go ` <fontFamily> ` leagan síos go bhfuil setup.xml ` <fontFamily> Seirbhís do Chustaiméirí </fontFamily> ` .

Chun na clónna DejaVu a shuiteáil, le do thoil íoslódáil [Seirbhís do Chustaiméirí .zip ](/DejaVuFonts.zip)   (5,522,795 beart, MD5 = 33E1E61FAB06A547851ED308B4FFEF42) 
agus unzip na comhaid cló ar eolaire sealadach.

  * Ar Linux:
    * Do Linux Adoptium Java dáiltí, féach [na treoracha seo](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Le eile Java dáiltí: Mar an `taiseachas aeir: fliuch` úsáideoir, na comhaid cló a chóipeáil isteach `$JAVA Cuntas deimhnithe` amhlaidh Java Is féidir teacht ar na clónna.
Cuimhnigh: má / nuair a uasghrádú tú níos déanaí go leagan níos nuaí de Java , ní mór duit na clónna seo a athshuiteáil.
  * Ar Macs: do gach comhad cló, cliceáil dúbailte ar sé agus ansin cliceáil Suiteáil Font.
  * Ar Windows 7 agus 10: i Windows Explorer, roghnaigh gach ceann de na comhaid cló. Cliceáil ar dheis. Cliceáil ar Suiteáil.
             
### Tástáil Tomcat{#test-tomcat} 

* Tástáil do shuiteáil Tomcat.
  * Linux:
    * Mar úsáideoir "tomcat", reáchtáil `cliceáil grianghraf a mhéadú` .
    * Féach ar do URL + ":8080/" i do bhrabhsálaí (e.g., [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac an Duine (reáchtáil tomcat mar an t-úsáideoir riarthóir córas) :
    * Rith `cliceáil grianghraf a mhéadú` .
    * Féach ar do URL + ":8080/" i do bhrabhsálaí (e.g., [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Tabhair faoi deara go de réir réamhshocraithe, tá do Tomcat inrochtana ach amháin ag tú. Níl sé inrochtana go poiblí.
  * Windows localhost:
    * cliceáil ar dheis ar an deilbhín Tomcat sa tráidire córas, agus roghnaigh "seirbhís ealaíne".
    * Féach ar an roghchlár [http://127.0.0.1:8080/](http://127.0.0.1:8080/) , nó b'fhéidir [http://localhost:8080/](http://localhost:8080/) , i do bhrabhsálaí. Tabhair faoi deara go de réir réamhshocraithe, tá do Tomcat inrochtana ach amháin ag tú. Níl sé inrochtana go poiblí.

Ba chóir duit a fheiceáil ar an Tomcat "Comhghairdeas" leathanach.

Má tá deacracht, féach ar an comhad a logáil Tomcat ag `cliceáil grianghraf a mhéadú` .

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

   (i gcás `Cóipeáil nasc leis an tweet` Is maith liom é) , ag léiriú go `taiseachas aeir: fliuch` próiseas próiseas (Tomcat go mór) ag éisteacht ar port "8080" le haghaidh "tcp" tráchta.
Más rud é nach raibh aon línte ar ais, má tá an líne ar ais go suntasach difriúil, nó má tugadh ar ais dhá líne nó níos mó, ansin d'fhéadfadh go mbeadh fadhb leis na suímh port.

* Féach an comhad log Tomcat `cliceáil grianghraf a mhéadú` . fadhbanna Tomcat agus roinnt ERDDAP™ Tá fadhbanna tosaithe le fios beagnach i gcónaí ann.
Níl an Tweet seo ar fáil ERDDAP™ .

* Féach an [cliceáil grianghraf a mhéadú](https://tomcat.apache.org/) láithreán gréasáin nó cuardach a dhéanamh ar an ngréasán le haghaidh cabhair, ach le do thoil in iúl dúinn na fadhbanna a bhí agat agus na réitigh a fuair tú.

* Féach ar ár [alt ar thacaíocht bhreise a fháil](/docs/intro#support) .
             
###  ERDDAP™ Clár na dToghthóirí{#erddap-content} 
3.   [Socraigh suas an `cliceáil grianghraf a mhéadú` comhaid chumraíocht.](#erddap-content) 
Ar Linux, Mac, agus Windows, íoslódáil [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
agus unzip sé isteach sa `taiseachas aeir: fliuch` web development `cliceáil grianghraf a mhéadú` .

__Version 1.0.0, 20333 beart, MD5 = 2B8D2A5AE5ED73E3A42B529C168C60B5, dáta 2024-10-14

Tá roinnt leaganacha roimhe seo ar fáil freisin:

    *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 beart, MD5 = 8F892616BAEEF2DF0F4BB036DCB4AD7C, dáta 2022-02-16) 
    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 beart, MD5 = 8F892616BAEEF2DF0F4BB036DCB4AD7C, dáta 2022-02-16) 
    *  [Déan teagmháil anois](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 beart, MD5 = 1E26F62E7A06191EE68C40B9A29362, dáta 2022-10-09) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 beart, MD5 = 1E26F62E7A06191EE68C40B9A29362, dáta 2022-12-08) 
    *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 beart, MD5 = 1E26F62E7A06191EE68C40B9A29362, dáta 2023-02-27) 

#### Eolaire eile{#other-directory} 

Do Red Hat Enterprise Linux (SEIRBHÍSÍ) nó le haghaidh cásanna eile nuair nach bhfuil tú cead a mhodhnú ar an eolaire Tomcat nó nuair is mian leat/need
a chur ar an ERDDAP™ eolaire ábhar i roinnt suíomh eile ar chúis éigin eile (mar shampla, má úsáideann tú Jetty in ionad Tomcat) ,
taiseachas aeir: fliuch `erddapContent .zip ` i an eolaire atá ag teastáil (a bhfuil ach an `taiseachas aeir: fliuch` Tá rochtain ag an úsáideoir) agus a leagtar ar an ` erddapContentDirectory ` online service
 (e.g. ` erddapContentDirectory  =~tomcat/content/erddap ` ) amhlaidh ERDDAP™ Is féidir teacht ar an eolaire ábhar nua.

### crios fuar: aon sonraí{#setupxml} 

*  [Léigh na tuairimí i `cliceáil grianghraf a mhéadú` ](#setupxml) agus na hathruithe a iarrtar a dhéanamh. Is thus.xml an comhad le gach ceann de na suímh a shonrú conas do ERDDAP™ iompar.

Maidir leis an thus tosaigh, MUST tú ar a laghad athrú ar na socruithe:
      *  ` <bigParentDirectory> ` 
      *  ` <emailEverythingTo> ` 
      *  ` <baseUrl> ` 
      *  ` <email...> ` irl - Library
      *  ` <admin...> ` irl - Library
      *  ` <baseHttpsUrl> `   (nuair a bhunaigh tú https ) 

Nuair a chruthaíonn tú an Treoir do Thuismitheoirí mór, ón eolaire tuismitheoir de Threoir do Thuismitheoirí mór:

    * Déan an `taiseachas aeir: fliuch` úsáideoir úinéir an `Treoir do Thuismitheoirí` :
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Athrú ar an "grúpa" a bheith tomcat, do ainm úsáideora, nó ainm grúpa beag a n-áirítear tomcat agus gach riarthóirí Tomcat / ERDDAP :
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
ainmnithe ainmnithe ` ERDDAP Ainm Laidine` roimh rith ERDDAP™ . Mar shampla, úsáid ` ERDDAP Uisce agus Séarachas` overrides an ` <baseUrl> ` luach.
Is féidir é seo a bheith handy nuair a imscaradh ERDDAP™ le coimeádán cosúil Docker, mar is féidir leat a chur socruithe caighdeánach i thus.xml
agus ansin socruithe speisialta a sholáthar trí athróg comhshaoil. Má sholáthraíonn tú faisnéis rúnda ERDDAP™ tríd an modh seo,
a bheith cinnte a sheiceáil go mbeidh an t-eolas fanacht rúnda. ERDDAP™ léann ach athróg timpeallacht uair amháin in aghaidh an tosaithe,
sa chéad dara ceann de na startup, mar sin ar bhealach amháin a úsáid é seo: leagtar na hathróga comhshaoil, tús a chur ERDDAP ,
fanacht go dtí go ERDDAP™ Tá tús curtha, ansin unset na hathróga comhshaoil.

###  datasets.xml  {#datasetsxml} 

* Léigh na tuairimí i [ **Ag obair leis an datasets.xml Déan Teagmháil Linn** ](/docs/server-admin/datasets) . Níos déanaí, tar éis a gheobhaidh tú ERDDAP™ ag rith
don chéad uair (de ghnáth leis na tacair sonraí réamhshocraithe) , beidh tú a mhodhnú an XML i `cliceáil grianghraf a mhéadú datasets.xml ` 
a shonrú go léir na tacair sonraí is mian leat do ERDDAP™ a sheirbheáil. Níl an Tweet seo ar fáil.
agus a bhunú ERDDAP™ agus ina dhiaidh sin ag cothabháil do ERDDAP™ .

Is féidir leat sampla a fheiceáil [ datasets.xml ar GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Murab ionann agus) Anois nó (beagán níos dóichí) sa todhchaí, más mian leat a mhodhnú erddap ar CSS comhad, cóip
   `tomcat/content/erddap/images/erddapStart2.cs` go dtí `cliceáil grianghraf a mhéadú` agus ansin athruithe a dhéanamh air.
Athruithe ar `Seirbhís do Chustaiméirí` ach éifeacht a ghlacadh nuair ERDDAP™ Tá atosú agus is minic a cheangal ar an úsáideoir a soiléir an bhrabhsálaí comhaid i dtaisce.
     
 ERDDAP™ Ní bheidh ag obair i gceart má tá an thus.xml nó datasets.xml Níl comhad XML dea-chruthaithe. Mar sin,, tar éis duit in eagar na comhaid,
Is smaoineamh maith a fhíorú go bhfuil an toradh go maith XML trí ghreamú an téacs XML isteach i checker XML cosúil [xmlvaldation](https://www.xmlvalidation.com/) .
     
### Suiteáil an erddap. comhad cogadh{#install-the-erddapwar-file} 

4. Ar Linux, Mac, agus Windows, __download [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war) _ isteach `riachtanais uisce: measartha` :

__Version 2.28.1, 622,676,238 beart, MD5 = 48b4226045f950c8d69ef9521b9bc9, dar dáta 2025-09-05___

Is é an comhad .war mór toisc go bhfuil sé chósta réiteach ard, teorainn, agus sonraí ingearchló is gá chun léarscáileanna a chruthú.

Tá roinnt leaganacha roimhe seo ar fáil freisin.

   *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 beart, MD5 = 5FEA912B5D42E50EAB9591F773EA848D, dáta 2022-02-16) 
   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 beart, MD5 = 461325E97E7577EC671DD50246CCFB8B, dáta 2022-02-23) 
   *  [Déan teagmháil anois](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 beart, MD5 = F2CFF805893146E932E498FDBD519B6, dáta 2022-10-09) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 beart, MD5 = 2B33354F633294213AE2AFDCF4DA6D0, dáta 2022-12-08) 
   *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 beart, MD5 = D843A043C506725EBD6F8EFDCCA8FD5F, dar dáta 2023-03-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 beart, MD5 = 970fbee172e28b0b8a07756eec898e, dar dáta 2024-06-07) 
   *  [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 beart, MD5 = 652AFC9D1421F00B5F789DA2C4732D4C, dar dáta 2024-11-07) 
   *  [Déan teagmháil anois](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 beart, MD5 = 99a725108b37708e5420986c16119, dar dáta 2025-03-31) 
   *  [2.27.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 beart, MD5 = 3b2086c659eee41452dff447bf4ef7, dátaithe 2025-06-11) 

### Cumraigh seachfhreastalaí (internet)  {#proxy} 

 ERDDAP™ a imscaradh de ghnáth taobh thiar de sheachvótálaí droim ar ais webserver chun gur féidir é a sheirbheáil ar chalafoirt HTTP caighdeánach (80 agus 443) .
Is minic a bhíonn foirceannadh SSL / TLS ag an gciseal seachfhreastalaí gréasáin chomh maith. Braitheann sonraí ar cheanglais gach imlonnaithe.

#### taiseachas aeir: fliuch{#apache} 

1. A chinntiú go `mod_proxy` agus `mod_proxy_ http ` luchtaithe:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Athraigh na láithreacha ` <VirtualHost> ` tag tag (má tá ceann amháin) , nó cuir ceann ag deireadh an chomhaid:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Más rud é ERDDAP™ a sheirbheáil ar chonair seachas `Seirbhís do Chustaiméirí` , a leagtar freisin an `X-Forwarded-Prefix` header chuig an
deighleog cosán _ `Seirbhís do Chustaiméirí` . Bheadh an suíomh seo oiriúnach do ERDDAP™ a sheirbheáil ar
 `/ Subpath / erddap` :

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Ansin atosú Apache: `/ úsáid tírdhreach: bláthanna cumhra: cumhráin`   (ach uaireanta tá sé i eolaire éagsúla) .
         
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

Más rud é ERDDAP™ a sheirbheáil ar chonair seachas `Seirbhís do Chustaiméirí` , a leagtar freisin an `X-Forwarded-Prefix` header chuig an
deighleog cosán _ `Seirbhís do Chustaiméirí` . Bheadh an suíomh seo oiriúnach do ERDDAP™ a sheirbheáil ar
 `/ Subpath / erddap` :

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

*  (Ní féidir liom a mholadh ag baint úsáide as an Tomcat Bainisteoir Iarratais Gréasáin. Más rud é nach bhfuil tú go hiomlán múchadh agus startup Tomcat, luath nó ina dhiaidh sin beidh ort saincheisteanna cuimhne PermGen.) 
*  (I Linux nó Mac OS, má tá tú chruthaigh úsáideoir speisialta a reáchtáil Tomcat, m.sh., tomcat, cuimhnigh a dhéanamh ar na céimeanna seo a leanas mar an t-úsáideoir.) 
* Má tá Tomcat ag rith cheana féin, stoptar síos Tomcat le (i Linux nó Mac OS)   `cliceáil grianghraf a mhéadú` 
nó (i Windows)   `Táirgí gaolmhara shutdown.bat ` 

Ar Linux, úsáid `Seirbhís do Chustaiméirí | cliceáil grianghraf a mhéadú` roimh agus tar éis `múchadh. cúthail` a dhéanamh cinnte go bhfuil an próiseas tomcat stop.
Ba chóir an próiseas a liostú roimh an múchadh agus sa deireadh nach bhfuil liostaithe tar éis an múchadh.
Féadfaidh sé nóiméad nó dhó a ghlacadh le haghaidh ERDDAP™ a dhúnadh go hiomlán síos. Bí othar. Nó má tá sé cosúil nach mbeidh sé stop a chur ar a chuid féin, a úsáid:
   `a mharú -9 <processID> ` 
* Tosaigh Tomcat le (i Linux nó Mac OS)   `cliceáil grianghraf a mhéadú` nó (i Windows)   `cliceáil grianghraf a mhéadú` 

## Is maith liom ERDDAP™ ag rith?{#is-erddap-running} 

Úsáid brabhsálaí chun iarracht a dhéanamh féachainthttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ Tosaíonn suas gan aon tacar sonraí luchtaithe. Tá tacar sonraí luchtaithe i snáithe cúlra agus mar sin a bheith ar fáil aon-ar-aon.

### Fabhtcheartú{#troubleshooting} 

* Nuair a thagann iarraidh ó úsáideoir i, téann sé go Apache (ar Linux agus Mac OS ríomhairí) , ansin Tomcat, ansin ERDDAP™ .
* Is féidir leat a fheiceáil cad a thagann chun Apache (agus earráidí gaolmhara) sna comhaid Apache logáil.
*    [Tá tú](/docs/server-admin/additional-information#tomcat-logs) Is féidir a fheiceáil cad a thagann chun Tomcat (agus earráidí gaolmhara) 
i comhaid Tomcat logáil ( `cliceáil grianghraf a mhéadú` agus comhaid eile sa eolaire) .
*    [Tá tú](/docs/server-admin/additional-information#log) Is féidir a fheiceáil cad a thagann chun ERDDAP , teachtaireachtaí diagnóiseacha ó ERDDAP ,
agus teachtaireachtaí earráide ó ERDDAP , sa ERDDAP™   ` <bigParentDirectory> Naisc go dtí suíomhanna eile` comhad.
* Ní Tomcat tús ERDDAP™ go dtí go bhfaigheann Tomcat iarratas ar ERDDAP™ . Mar sin, is féidir leat a fheiceáil i comhaid log Tomcat má tá sé
tús curtha ERDDAP™ nó má tá teachtaireacht earráide a bhaineann leis an iarracht sin.
* Nuair a bheidh ERDDAP™ Tosaíonn suas, renames sé an sean ERDDAP™ comhad logála.txt ( `Logáil isteach <CurrentTime> .txt` ) agus cruthaíonn comhad log.txt nua.
Mar sin, má tá an `logáil isteach.` Tá comhad d'aois, is comhartha é sin ERDDAP™ Nach bhfuil atosaíodh le déanaí. ERDDAP™ scríobhann eolas logáil isteach ar maolán
agus scríobhann sé ach an maolán chuig an gcomhad logála go tréimhsiúil, ach is féidir leat bhfeidhm ERDDAP™ an maolán a scríobh chuig an gcomhad logála trí chuairt a thabhairt
     ` /erddap/status.html ` .

### Trioblóid: Leagan d'aois Java  {#trouble-old-version-of-java} 

Má tá tú ag baint úsáide as leagan de Java go bhfuil ró-aois le haghaidh ERDDAP , ERDDAP™ Ní bheidh reáchtáil agus beidh tú a fheiceáil teachtaireacht earráide i comhad logáil Tomcat ar mhaith

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

Is é an réiteach a thabhairt cothrom le dáta ar an leagan is déanaí de Java agus déan cinnte go bhfuil Tomcat ag baint úsáide as.

### Trioblóid: Slow Startup Chéad Am{#trouble-slow-startup-first-time} 

Tomcat Tá a lán oibre a dhéanamh den chéad uair iarratas cosúil ERDDAP™ Tá tús curtha; go háirithe, tá sé a unpack an `erddap.war` comhad comhad
 (atá cosúil le .zip comhad comhad) . Ar roinnt freastalaithe, an chéad iarracht chun féachaint ar ERDDAP™ stallaí (30 soicind?) go dtí go bhfuil an obair seo críochnaithe.
Ar fhreastalaithe eile, beidh an chéad iarracht theipeann láithreach. Ach má tá tú ag fanacht 30 soicind agus iarracht a dhéanamh arís, beidh sé n-éireoidh má ERDDAP™ suiteáilte i gceart.

Níl aon shocrú seo. Tá sé seo ach conas a oibríonn Tomcat. Ach tharlaíonn sé ach an chéad uair tar éis a shuiteáil tú leagan nua de ERDDAP™ .

## Shut síos agus atosú{#shut-down-and-restart} 

Sa todhchaí, a dhúnadh síos (agus atosú)   ERDDAP™ , féach [Conas a Shut Dúin agus Atosú Tomcat agus ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Trioblóid?{#trouble} 

Trioblóidí a shuiteáil Tomcat nó ERDDAP™ ? Féach ar ár [alt ar thacaíocht bhreise a fháil](/docs/intro#support) .

## Fógra ríomhphoist ar Leaganacha Nua ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Más mian leat ríomhphost a fháil aon uair leagan nua de ERDDAP™ ar fáil nó tábhachtach eile ERDDAP™ fógraí,
is féidir leat a bheith ar an ERDDAP™ fógraí liosta [anseo](https://groups.google.com/g/erddap-announce) . Meán an liosta seo thart ar r-phost amháin gach trí mhí.

## Saincheaptha{#customize} 

*  [Saincheap do ERDDAP™ aird a tharraingt ar do eagraíocht (taiseachas aeir: fliuch NOAA   ERD ) .](#customize) 
* Athraigh an mbratach atá le feiceáil ag barr gach ERDDAP™ .html leathanaigh ag eagarthóireacht ar an ` <startBodyHtml5> ` tag i do ` datasets.xml ` comhad.
(Más rud é nach bhfuil ceann, cóip an mhainneachtain ó ERDDAP™ 's `cliceáil grianghraf a mhéadú` comhad comhad
isteach i ` datasets.xml ` agus in eagar é.) Mar shampla, d'fhéadfá:
  * Bain úsáid as íomhá éagsúla (i.e., lógó d'eagraíocht) .
  * Athraigh an dath cúlra.
  * Athrú " ERDDAP™ " go dtí "_YourOrganization_'s ERDDAP™ " " "
  * Athrú "Easier access to scientific data" go "Easier access to _YourOrganization_'s data".
  * Athraigh an "Brought a thabhairt duit ag" naisc a bheith naisc chuig do eagraíocht agus foinsí maoinithe.
* Athrú ar an eolas ar an taobh clé den leathanach baile ag eagarthóireacht ar an ` <theShortDescriptionHtml> ` tag i do ` datasets.xml ` comhad.
(Más rud é nach bhfuil ceann, cóip an mhainneachtain ó ERDDAP™ 's `cliceáil grianghraf a mhéadú` comhad comhad
isteach i ` datasets.xml ` agus in eagar é.) Mar shampla, d'fhéadfá:
  * Déan cur síos ar cad a dhéanann do eagraíocht agus / nó grúpa.
  * Déan cur síos ar cén cineál sonraí seo ERDDAP™ Tá.
  * A athrú ar an deilbhín gur dealraitheach ar tabs bhrabhsálaí, cuir favicon do eagraíocht. ico i `tomcat/content/erddap/images/images/` .
Féach arhttps://en.wikipedia.org/wiki/Favicon.
