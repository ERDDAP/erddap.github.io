---
sidebar_position: 1
---

# Suiteáil
Conas a dhéanamh ar an Socrú TosaighERDDAP™ar do Freastalaí


ERDDAP™Is féidir a reáchtáil ar aon fhreastalaí a thacaíonnJavaagus Tomcat (agus freastalaithe iarratas eile cosúil le Jetty, ach ní chuirimid tacaíocht dóibh) .ERDDAP™Tástáil ar Linux (lena n-áirítear ar AWS Amazon) , Mac, agus ríomhairí Windows.

*    **Amazon ag díol** -- Má tá tú a shuiteáilERDDAP™ar shampla Amazon Seirbhísí Gréasáin EC2, féach seo[Seirbhísí Idirlín Amazon](/docs/server-admin/additional-information#amazon)ar dtús.
*    **Déan teagmháil Linn** -- Axiom tairiscintí anois[ERDDAP™i gcoimeádán Docker](https://hub.docker.com/u/axiom/)agus IOOS cuireann anois[Treoir Tosaigh Tapa doERDDAP™i Docker Coimeádán](https://ioos.github.io/erddap-gold-standard/index.html).
Tá sé an caighdeánERDDAP™suiteáil, ach tá Axiom curtha i gcoimeádán docker.
Má úsáideann tú Docker cheana féin, is dócha gur fearr leat an leagan Docker.
Mura n-úsáideann tú Docker cheana féin, ní dhéanaimid é seo a mholadh go ginearálta.
Má roghnaigh tú a shuiteáilERDDAP™trí Docker, ní chuirimid ar fáil aon tacaíocht don phróiseas a shuiteáil.
Níor oibrigh muid le Docker fós. Má oibríonn tú leis seo, cuir do chuid tuairimí chugainn.
*    **Linux agus Macs** --ERDDAP™Oibríonn mór ar Linux agus Mac ríomhairí. Féach na treoracha thíos.
*    **Windows Windows Windows** -- Tá Windows breá le tástáilERDDAP™agus le haghaidh úsáide pearsanta (féach na treoracha thíos) , ach ní molaimid é a úsáid don phobalERDDAPs. Ag rithERDDAP™d'fhéadfadh fadhbanna a bheith ag Windows: go háirithe,ERDDAP™a bheith in ann a scriosadh agus / nó comhaid a athainmniú go tapa. Tá sé seo dócha mar gheall ar bogearraí antivirus (e.g., ó McAfee agus Norton) atá ag seiceáil na comhaid le haghaidh víris. Má ritheann tú isteach an fhadhb seo (is féidir a fheiceáil ag teachtaireachtaí earráide i[logáil isteach.](/docs/server-admin/additional-information#log)comhad cosúil le "Ní féidir a scriosadh...") , d'fhéadfadh athrú ar an bogearraí antivirus socruithe a mhaolú go páirteach ar an bhfadhb. Nó a mheas ag baint úsáide as freastalaí Linux nó Mac ionad.

 **An caighdeánERDDAP™treoracha a shuiteáil do Linux, Macs, agus ríomhairí Windows:** 

0. Bí cinnte go bhfuil aon spleáchas suiteáilte. Ar meaisíní neamh-Windows (Linux agus Mac) , is gá duit csh.
## Java {#java} 
1.  [Le haghaidhERDDAP™v2.19+, ar bunJava21.](#java)
Ar chúiseanna slándála, tá sé beagnach i gcónaí is fearr a bhaint as an leagan is déanaí deJava21.
Íoslódáil agus a shuiteáil an leagan is déanaí de
    [Adoptium's OpenJDK (taiseachas aeir: fliuch) 21 Samhain (Leathanach Main) ](https://adoptium.net/temurin/releases/?version=21). Chun an tsuiteáil a fhíorú, cineál "/_javaJreBinDirectory_/java -version", mar shampla
/ úsáid tírdhreach: coimeádán, flowerbed, teorann --
    
    ERDDAP™oibreacha leJavaó fhoinsí eile, ach molaimid Adoptium toisc go bhfuil sé an príomh, pobail-tacaíocht, saor in aisce (mar atá i mbeoir agus óráid) leagan deJava21 a thairgeann Tacaíocht Fadtéarmach (uasghrádú saor in aisce le blianta fada anuas ar an scaoileadh tosaigh) . Ar chúiseanna slándála, le do thoil thabhairt cothrom le dáta doERDDAP's leagan deJavago tréimhsiúil mar leaganacha nua deJava21 bheith ar fáil ó Adoptium.
    
    ERDDAP™Tá tástáil agus a úsáidtear go forleathan le 21, ní leaganacha eile. Ar chúiseanna éagsúla, ní dhéanaimid tástáil le leaganacha eile deJava.
     
## cliceáil grianghraf a mhéadú{#tomcat} 
2.  [Socraigh suas](#tomcat) [cliceáil grianghraf a mhéadú](https://tomcat.apache.org).
Is Tomcat an chuid is mó a úsáidtear go forleathanJavaFreastalaí Iarratais, atáJavabogearraí a sheasann idir seirbhísí líonra an chórais oibriúcháin agusJavabogearraí freastalaí mhaithERDDAP™. Tá sé Saor in Aisce agus Oscailte Bogearraí Foinse (Seirbhís do Chustaiméirí) .
    
Is féidir leat a úsáid eileJavaFreastalaí Iarratais (Cuardaigh le haghaidh:) , ach táimid ag tástáil ach amháin le agus tacaíocht Tomcat.
     
    
    * Íoslódáil Tomcat agus é a dhíphacáil ar do fhreastalaí nó ríomhaire.
Ar chúiseanna slándála, tá sé beagnach i gcónaí is fearr a bhaint as an leagan is déanaí de Tomcat 10 (Níl leagan 9 agus thíos inghlactha) atá deartha chun obair leJava21 nó níos nuaí. Anseo thíos, beidh an eolaire Tomcat a tharchur mar _tomcat_.
        
Rabhadh&#33; Má tá tú cheana féin Tomcat ag rith roinnt iarratas gréasáin eile (go háirithe THREDDS) , molaimid duit a shuiteáilERDDAP™i[an dara Tomcat](/docs/server-admin/additional-information#second-tomcat), mar gheall arERDDAP™riachtanais suímh Tomcat éagsúla agus níor chóir a contend le hiarratais eile do chuimhne.
        
        * Ar Linux,[íoslódáil an "Core" "tar.gz" Tomcat dáileadh](https://tomcat.apache.org/download-10.cgi)agus é a dhíphacáil. Molaimid é a dhíphacáil i /usr / áitiúil.
        * Ar Mac, is dócha go bhfuil Tomcat suiteáilte cheana féin i /Library / Tomcat, ach ba chóir é a thabhairt cothrom le dáta go dtí an leagan is déanaí de Tomcat 10.
Má íoslódáil tú é,[íoslódáil an "Core" "tar.gz" Tomcat dáileadh](https://tomcat.apache.org/download-10.cgi)agus é a dhíphacáil i / Brabúis / Tomcat.
        * Ar Windows, is féidir leat[íoslódáil an "Core" "zip" Tomcat dáileadh](https://tomcat.apache.org/download-10.cgi)  (nach praiseach leis an chlárlann Windows agus a rialú tú ó líne ordú DOS) agus é a dhíphacáil in eolaire cuí. (Le haghaidh forbartha, bainimid úsáid as an dáileadh "Core" "zip". Déanaimid eolaire / cláir agus é a dhíphacáil ann.) Nó is féidir leat a íoslódáil an "Core" "64-giotán Windows zip" dáileadh, lena n-áirítear níos mó gnéithe. Más suiteálaí Windows é an dáileadh, is dócha go gcuirfidh sé Tomcat isteach, mar shampla, / Comhaid Program / pache-tomcat-10.0.23 .
             
### riachtanais uisce: measartha{#serverxml} 
*   [riachtanais uisce: measartha](#serverxml)- I _tomcat_ / comhad / server.xml, tá dhá athruithe gur chóir duit a dhéanamh ar gach ceann den dá&lt;Nascóirí &amp; Clib; tags- ceann amháin le haghaidh
```
        <Connector port="8080" 
```
agus ceann amháin do
```
        <Conector port="8443"
```
    1.   (Molta) Méadú ar an luach paraiméadar connectionTimeout, b'fhéidir go 300000 (minicíocht uisce: flúirseach)   (a bhfuil 5 nóiméad) .
    2.   (Molta) Cuir paraiméadar nua: relaxedQueryChars ="\\[\\]|" " " Tá sé seo roghnach agus beagán níos lú slán, ach cuireann sé an gá atá le húsáideoirí a faoin gcéad-ionchódú na carachtair nuair a tharlaíonn siad i paraiméadair an úsáideora iarratas URL.
             
### ábhar.xml{#contentxml} 
* comhthéacs.xml -- Acmhainní Cache - I _tomcat_/conf/context.xml, ceart roimh an&lt;/ Comhthéacs &amp; tag, athrú ar an chlib Acmhainní (nó é a chur más rud é nach bhfuil sé ann cheana) a shocrú ar an taisce Uasmhéid paraiméadar go 80000:
    &lt;Acmhainní cachingAllowed = "true" taisceMaxSize = "80000" / &amp; rsquo;
Seachnaíonn sé seo go leor rabhaidh i catalina. amach go bhfuil gach tús le
"FÓGRA\\[príomhthionscadal\\]cliceáil grianghraf a mhéadú Ní féidir a chur leis an acmhainn ag\\[/ WEB-INF / ranganna /...]
         
### Amharc ar gach eolas{#apache-timeout} 
* Ar ríomhairí Linux, athrú ar na suímh timeout Apache ionas nach mbeidh iarratais úsáideora am-íditheach (leis an méid is cosúil go minic mar earráid "Proxy" nó "Bad Gateway") . Mar an t-úsáideoir fréimhe:
    1. Athraigh an Apachehttpcomhad d.conf (de ghnáth i / srl / srl /httpd/conf/conf/) :
Athrú ar an láthair&lt;Timeout &amp; rsquo; leagan amach (nó cuir ceann ag deireadh an chomhaid) go 3600 (soicind beag) , in ionad an réamhshocraithe 60 nó 120 soicind.
Athrú ar an láthair&lt;ProxyTimeout &amp; gt; leagan (nó cuir ceann ag deireadh an chomhaid) go 3600 (soicind beag) , in ionad an réamhshocraithe 60 nó 120 soicind.
    2. Atosú Apache: / úsáid a bhaint as / ionsú / a mhéadú bláthanna cumhra: cumhráin (ach uaireanta tá sé i eolaire éagsúla) .
             
    * Moladh slándála: Féach ar[na treoracha seo](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)slándáil do shuiteáil Tomcat a mhéadú, go háirithe do fhreastalaithe poiblí.
         
    * Le haghaidh poiblíERDDAP™suiteálacha ar Linux agus Macs, is fearr Tomcat a chur ar bun (an clár) mar a bhaineann leis an úsáideoir "tomcat" (úsáideoir ar leith le ceadanna teoranta agus a[Níl aon focal faire](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) . Dá bhrí sin, is féidir ach an t-úsáideoir Super athrú chun gníomhú mar tomcat úsáideora. Seo a dhéanann sé dodhéanta do hackers a logáil isteach ar do fhreastalaí mar tomcat úsáideora. Agus in aon chás, ba chóir duit é a dhéanamh ionas go bhfuil an t-úsáideoir tomcat ceadanna an-teoranta ar chóras comhaid an fhreastalaí (read + scríobh + pribhléidí execute don apache-tom crann eolaire agus&lt;bigParentDirectory &amp; gt; agus pribhléidí a léamh-amháin do stiúrthóireachtaí le sonraí aERDDAP™riachtanais rochtain ar).
        * Is féidir leat a chruthú ar an gcuntas úsáideora tomcat (a bhfuil aon focal faire) trí úsáid a bhaint as an ordú
cliceáil grianghraf a mhéadú ''
        * Is féidir leat athrú a bheith ag obair mar tomcat úsáideora ag baint úsáide as an ordú
riachtanais uisce: measartha
             (Beidh sé a iarraidh ort le haghaidh an focal faire superuser le cead a dhéanamh seo.) 
        * Is féidir leat a stopadh ag obair mar tomcat úsáideoir ag baint úsáide as an ordú
slí amach
        * An chuid is mó den chuid eile den Tomcat agusERDDAP™treoracha thus mar úsáideoir "tomcat". Níos déanaí, reáchtáil an startup.sh agus shutdown.sh scripteanna mar úsáideoir "tomcat" ionas go bhfuil cead Tomcat a scríobh chuig a chuid comhad a logáil.
        * Tar éis unpacking Tomcat, ó thuismitheoir an apache-tomcat eolaire:
            
            * Athrú úinéireacht an crann eolaire apache-tomcat chuig an úsáideoir tomcat.
cliceáil grianghraf a mhéadú
                 (ach an t-ainm iarbhír de do eolaire tomcat ionad) .
            * Athrú ar an "grúpa" a bheith tomcat, do ainm úsáideora, nó ainm grúpa beag a n-áirítear tomcat agus gach riarthóirí Tomcat /ERDDAP, m.sh.,
cineál gas: in airde úsáid tírdhreach: coimeádán, flowerbed, teorann
            * Athruithe ceadanna ionas go tomcat agus an grúpa a léamh, scríobh, pribhléidí a fhorghníomhú, m.sh.,.
cliceáil grianghraf a mhéadú
            * Bain ceadanna úsáideora "eile" a léamh, a scríobh, nó a fhorghníomhú:
cliceáil grianghraf a mhéadú
Tá sé seo tábhachtach, toisc go gcuireann sé cosc ar úsáideoirí eile ó léamh, b'fhéidir faisnéis íogair iERDDAP™comhaid thus.
            
              
### Cuimhne{#memory} 
* Socraigh Athróga Comhshaoil Tomcat
    
Ar Linux agus Macs:
Cruthaigh comhad _tomcat_/bin / setenv.sh (nó i Red Hat Enterprise Linux\\[SEIRBHÍSÍ\\], in eagar ~tomcat/conf/tomcat10.conf) a shocrú athróg timpeallacht Tomcat ar. Beidh an comhad a úsáid ag _tomcat_/bin/startup.sh agus shutdown.sh. Ba chóir go mbeadh an comhad rud éigin cosúil le:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (ach ainmneacha eolaire ó do ríomhaire a chur in ionad) .
 (Má leagtar tú JRE\\_HOME roimhe seo, is féidir leat é sin a bhaint.)   
Ar Macs, is dócha nach gá duit a shocrú JAVA\\_HOME.

Ar Windows:
Cruthaigh comhad _tomcat_\\bin\\setenv.bat a shocrú athróg timpeallacht Tomcat ar. Beidh an comhad seo a úsáid ag _tomcat_\bin\\startup.bat agusshutdown.bat. Ba chóir go mbeadh an comhad rud éigin cosúil le:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (ach ainmneacha eolaire ó do ríomhaire a chur in ionad) .
Má tá sé seo ach le haghaidh tástála áitiúil, bain "freastalaí".
 (Má leagtar tú JRE\\_HOME roimhe seo, is féidir leat é sin a bhaint.) 

Tá na suímh chuimhne -Xmx agus -Xms tábhachtach marERDDAP™Oibríonn níos fearr le cuimhne níos mó. I gcónaí a leagtar -Xms leis an luach céanna mar -Xmx.

* Do 32 Córais Oibriúcháin giotán agus 32 giotánJava:
64 giotánJavaTá i bhfad níos fearr ná 32 giotánJava, ach 32 giotánJavabeidh ag obair chomh fada agus nach bhfuil an freastalaí i ndáiríre gnóthach. An chuimhne níos fisiciúla sa fhreastalaí an níos fearr: Tá 4 + GB i ndáiríre go maith, tá 2 GB ceart go leor, ní mholtar níos lú. Le 32 giotánJava, fiú le cuimhne fhisiceach flúirseach, Tomcat agusJavaNí bheidh ar siúl má iarracht tú a shocrú -Xmx i bhfad os cionn 1500M (1200M ar roinnt ríomhairí) . Má tá do fhreastalaí níos lú ná 2GB de chuimhne, laghdú ar an luach -Xmx (i 'M'egaBytes) go 1/2 de chuimhne fisiciúil an ríomhaire.
* Do 64 Córais Oibriúcháin giotán agus 64 giotánJava:
64 giotánJavaní oibreoidh sé ach ar chóras oibriúcháin giotán 64.
    
    * LeJava8, ní mór duit \\-d64 a chur leis an pharaiméadar Tomcat CATALINA\\_OPTS i setenv.bat
    * LeJava21, roghnaíonn tú 64 giotánJavanuair a íoslódáil tú leagan deJavamarcáilte "64 giotán".
    
Le 64 giotánJava, Tomcat agusJavaIs féidir úsáid a bhaint as an-ard -Xmx agus -Xms suímh. An chuimhne níos fisiciúla sa fhreastalaí an níos fearr. Mar mholadh simplistic: molaimid duit a leagtar -Xmx agus -Xms a (i 'M'egaBytes) go 1/2 (nó níos lú) de chuimhne fisiciúil an ríomhaire. Is féidir leat a fheiceáil má Tomcat,Java, agusERDDAP™ag rith go deimhin i 64 mód giotán ag cuardach le haghaidh "giotán," iERDDAP's Daily Report email or in the _bigParentDirectory_/logs/[logáil isteach.](/docs/server-admin/additional-information#log)comhad comhad (Tá BigParentDirectory_ sonraithe i[crios fuar: aon sonraí](#setupxml)) .
#### Bailiúchán Garáiste{#garbage-collection} 
* IERDDAP™'s[logáil isteach.](/docs/server-admin/additional-information#log)comhad, feicfidh tú go leor "GC (Naisc ábhartha eile) " teachtaireachtaí.
Níl an Tweet seo ar fáil. Is teachtaireacht go minic ó oibriú de ghnáthJavaag rá go bhfuil sé críochnaithe ach bailiúchán truflais mion toisc go raibh sé amach as an seomra in Eden (an t-alt denJavacarn do rudaí an-óg) . De ghnáth, léiríonn an teachtaireacht tú _memoryUseBefore_\\- &amp; Fgt;_memoryUseAfter_. Má tá an dá uimhir sin gar le chéile, ciallaíonn sé nach raibh an bailiúchán truflais táirgiúil. Is é an teachtaireacht ach comhartha trioblóide má tá sé an-minic (gach cúpla soicind) , nach bhfuil táirgiúil, agus tá na huimhreacha mór agus nach bhfuil ag fás, a léiríonn le chéile goJavariachtanais cuimhne níos mó, ag streachailt chun saor in aisce suas cuimhne, agus nach bhfuil in ann a saor in aisce suas cuimhne. D'fhéadfadh sé seo tarlú le linn am strusmhar, ansin dul amach. Ach má leanann sé, is comhartha trioblóide é sin.
* Má fheiceann tú java.lang.OutOfMemoryEror iERDDAP™'s[logáil isteach.](/docs/server-admin/additional-information#log)comhad, féach[Seirbhís do Chustaiméirí](/docs/server-admin/additional-information#outofmemoryerror)le haghaidh leideanna maidir le conas na fadhbanna a dhiagnóisiú agus a réiteach.
         
### Ceadúnas Madraí ar Líne{#permissions} 
*   [Ar Linux agus Macs, athrú na ceadanna](#permissions)go léir\\*.shcomhaid i _tomcat_/bin/ a bheith inrite ag an úinéir, m.sh., le
```
    chmod +x \\*.sh  
```
### Seirbhís do Chustaiméirí{#fonts} 
*   [Fonts le haghaidh íomhánna:](#fonts)Is fearr linn go láidir ar an saor in aisce[Seirbhís do Chustaiméirí](https://dejavu-fonts.github.io/)go dtí an ceann eileJavaclónna. Ag baint úsáide as na clónna Moltar go láidir ach ní gá.
    
Má roghnaíonn tú gan úsáid a bhaint as na clónna DejaVu, ní mór duit a athrú ar an suíomh cló Teaghlaigh i thus.xml a&lt;cló Teaghlaigh agus cló;SansSerif&lt;/ Eolas Teaghlaigh &amp; rl;, atá ar fáil le gachJavadáiltí. Má shocraíonn tú cló Teaghlaigh chuig ainm cló nach bhfuil ar fáil,ERDDAP™Ní bheidh ualach agus beidh a phriontáil liosta de na clónna ar fáil sa chomhad log.txt. Ní mór duit ceann de na clónna sin a úsáid.
    
Má roghnaíonn tú a bhaint as na clónna DejaVu, déan cinnte go bhfuil an suíomh cló Teaghlaigh i thus.xml&lt;cineál gas: in airde Teaghlaigh &amp; Teaghlaigh; DejaVu Sans&lt;/ Eolas Teaghlaigh &amp; ..
    
Chun na clónna DejaVu a shuiteáil, le do thoil íoslódáil[Seirbhís do Chustaiméirí.zip](/DejaVuFonts.zip)  (5,522,795 beart, MD5 = 33E1E61FAB06A547851ED308B4FFEF42) agus unzip na comhaid cló ar eolaire sealadach.
    
    * Ar Linux:
        * Do Linux AdoptiumJavadáiltí, féach[na treoracha seo](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/).
        * Le eileJavadáiltí: Mar an t-úsáideoir Tomcat, na comhaid cló a chóipeáil isteach _JAVA\\_HOME_/lib/fonts mar sinJavaIs féidir teacht ar na clónna. Cuimhnigh: má / nuair a uasghrádú tú níos déanaí go leagan níos nuaí deJava, ní mór duit na clónna seo a athshuiteáil.
    * Ar Macs: do gach comhad cló, cliceáil dúbailte ar sé agus ansin cliceáil Suiteáil Font.
    * Ar Windows 7 agus 10: i Windows Explorer, roghnaigh gach ceann de na comhaid cló. Cliceáil ar dheis. Cliceáil ar Suiteáil.
             
### Tástáil Tomcat{#test-tomcat} 
* Tástáil do shuiteáil Tomcat.
    * Linux:
        * Mar úsáideoir "tomcat", reáchtáil _tomcat_/bin/startup.sh
        * Féach ar do URL + ":8080/" i do bhrabhsálaí (e.g.,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) .
        * Ba chóir duit a fheiceáil ar an Tomcat "Comhghairdeas" leathanach.
Má tá deacracht ann, féach an comhad logála Tomcat _tomcat_ / logs/catalina.out.
    * Mac an Duine (reáchtáil tomcat mar an t-úsáideoir riarthóir córas) :
        * Rith _ síos / tosaithe.sh
        * Féach ar do URL + ":8080/" i do bhrabhsálaí (e.g.,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) . Tabhair faoi deara go de réir réamhshocraithe, tá do Tomcat inrochtana ach amháin ag tú. Níl sé inrochtana go poiblí.
        * Ba chóir duit a fheiceáil ar an Tomcat "Comhghairdeas" leathanach.
Má tá deacracht ann, féach an comhad logála Tomcat _tomcat_ / logs/catalina.out.
    * Windows localhost:
        
        * cliceáil ar dheis ar an deilbhín Tomcat sa tráidire córas, agus roghnaigh "seirbhís ealaíne".
        * Féach ar an roghchlár[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/), nó b'fhéidir[ http://localhost:8080/ ](http://localhost:8080/), i do bhrabhsálaí. Tabhair faoi deara go de réir réamhshocraithe, tá do Tomcat inrochtana ach amháin ag tú. Níl sé inrochtana go poiblí.
        * Ba chóir duit a fheiceáil ar an Tomcat "Comhghairdeas" leathanach.
Má tá deacracht ann, féach an comhad logála Tomcat _tomcat_ / logs/catalina.out.
            
### Trioblóidí leis an suiteáil Tomcat?{#troubles-with-the-tomcat-installation} 
* Ar Linux agus Mac, más rud é nach féidir leat teacht ar Tomcat nóERDDAP™  (nó b'fhéidir nach féidir leat a bhaint amach ach iad ó ríomhaire taobh amuigh de do balla dóiteáin) , is féidir leat a thástáil má tá Tomcat ag éisteacht le port 8080, ag clóscríobh (mar fhréamh) ar líne ordú an fhreastalaí:
```  
    netstat -tuplen | grep 8080  
```
Ba chóir sin ar ais líne amháin le rud éigin cosúil le:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     (Níl an Tweet seo ar fáil.) , ag léiriú go bhfuil próiseas "java" (Tomcat go mór) ag éisteacht ar port "8080" le haghaidh "tcp" tráchta. Más rud é nach raibh aon línte ar ais, má tá an líne ar ais go suntasach difriúil, nó má tugadh ar ais dhá líne nó níos mó, ansin d'fhéadfadh go mbeadh fadhb leis na suímh port.
* Féach an comhad log Tomcat _tomcat_ / logs / catalina.out. fadhbanna Tomcat agus roinntERDDAP™Tá fadhbanna tosaithe le fios beagnach i gcónaí ann. Níl an Tweet seo ar fáilERDDAP™.
* Féach an[cliceáil grianghraf a mhéadú](https://tomcat.apache.org/)láithreán gréasáin nó cuardach a dhéanamh ar an ngréasán le haghaidh cabhair, ach le do thoil in iúl dúinn na fadhbanna a bhí agat agus na réitigh a fuair tú.
* Féach ar ár[alt ar thacaíocht bhreise a fháil](/docs/intro#support).
             
### ERDDAP™Clár na dToghthóirí{#erddap-content} 
3.  [Socraigh suas an_tomcat_/content/erddapcomhaid chumraíocht.](#erddap-content)  
Ar Linux, Mac, agus Windows, íoslódáil[erddapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (leagan 1.0.0, 20333 bytes, MD5 = 2B8D2A5AE5ED73E3A42B529C168C60B5, dar dáta 2024-10-14) agus unzip sé isteach _tomcat_, a chruthú_tomcat_/content/erddap.

    \\[Tá roinnt leaganacha roimhe seo ar fáil freisin:
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19,792 beart, MD5 = 8F892616BAEEF2DF0F4BB036DCB4AD7C, dáta 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19,792 beart, MD5 = 8F892616BAEEF2DF0F4BB036DCB4AD7C, dáta 2022-02-16)   
    [Déan teagmháil anois](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19,810 beart, MD5 = 1E26F62E7A06191EE68C40B9A29362, dáta 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19,810 beart, MD5 = 1E26F62E7A06191EE68C40B9A29362, dáta 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19,810 beart, MD5 = 1E26F62E7A06191EE68C40B9A29362, dáta 2023-02-27) 
agus unzip sé isteach _tomcat_, a chruthú_tomcat_/content/erddap.\\]
    
#### Eolaire eile{#other-directory} 
Do Red Hat Enterprise Linux (SEIRBHÍSÍ) nó le haghaidh cásanna eile nuair nach bhfuil tú cead a mhodhnú ar an eolaire Tomcat nó nuair is mian leat / gá a chur ar anERDDAP™eolaire ábhar i roinnt suíomh eile ar chúis éigin eile (mar shampla, má úsáideann tú Jetty in ionad Tomcat) , unzip erddapContent.zipi an eolaire atá ag teastáil (a bhfuil ach úsáideoir = Tocat rochtain) agus a leagtar ar anerddapContentDirectoryonline service (e.g.,erddapContentDirectory=~tomcat/content/erddap) amhlaidhERDDAP™Is féidir teacht ar an eolaire ábhar nua.
    
### crios fuar: aon sonraí{#setupxml} 
*   [Léigh na tuairimí i_tomcat_/content/erddap/ Baile **crios fuar: aon sonraí** ](#setupxml)agus na hathruithe a iarrtar a dhéanamh. Is thus.xml an comhad le gach ceann de na suímh a shonrú conas doERDDAP™iompar.
Maidir leis an thus tosaigh, MUST tú ar a laghad athrú ar na socruithe:
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
Nuair a chruthaíonn tú an Treoir do Thuismitheoirí mór, ón eolaire tuismitheoir de Threoir do Thuismitheoirí mór:
    
    * Déan úsáideoir =cat an t-úinéir ar an Treoir Tuismitheoirí mór, m.sh.,
```
        chown -R tomcat _bigParentDirectory_
```
    * Athrú ar an "grúpa" a bheith tomcat, do ainm úsáideora, nó ainm grúpa beag a n-áirítear tomcat agus gach riarthóirí Tomcat /ERDDAP, m.sh.,
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * Athruithe ceadanna ionas go tomcat agus an grúpa a léamh, scríobh, pribhléidí a fhorghníomhú, m.sh.,.
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * Bain ceadanna úsáideora "eile" a léamh, a scríobh, nó a fhorghníomhú. Tá sé seo tábhachtach cosc a chur ar léamh, b'fhéidir faisnéis íogair iERDDAP™comhaid agus comhaid a logáil le faisnéis faoi tacair sonraí príobháideacha.:
```
        chmod -R o-rwx _bigParentDirectory_
```

### Athróga Comhshaoil{#environment-variables} 
Ag tosú leERDDAP™v2.13,ERDDAP™Is féidir le riarthóirí override aon luach i thus.xml trí shonrú athróg timpeallacht ainmnitheERDDAP\\__valueName_ roimh rithERDDAP™. Mar shampla, úsáidERDDAP\\_baseUrl overrides an&lt;baseUrl &amp; luach. Is féidir é seo a bheith handy nuair a imscaradhERDDAP™le coimeádán cosúil Docker, mar is féidir leat a chur socruithe caighdeánach i thus.xml agus ansin socruithe speisialta a sholáthar trí athróga comhshaoil. Má sholáthraíonn tú faisnéis rúndaERDDAP™tríd an modh seo, bí cinnte a sheiceáil go bhfanfaidh an fhaisnéis rúnda.ERDDAP™léann ach athróg timpeallacht uair amháin in aghaidh an startup, sa chéad dara de tosaithe, mar sin ar bhealach amháin a úsáid é seo: leagtar na hathróga comhshaoil, tús a churERDDAP, fanacht go dtíERDDAP™Tá tús curtha, ansin unset na hathróga comhshaoil.
    
### datasets.xml {#datasetsxml} 
* Léigh na tuairimí i[ **Ag obair leis andatasets.xmlDéan Teagmháil Linn** ](/docs/server-admin/datasets). Níos déanaí, tar éis a gheobhaidh túERDDAP™ag rith don chéad uair (de ghnáth leis na tacair sonraí réamhshocraithe) , beidh tú a mhodhnú an XML i_tomcat_/content/erddap/ Baile **datasets.xml** a shonrú go léir na tacair sonraí is mian leat doERDDAP™a sheirbheáil. Tá sé seo nuair a bheidh tú a chaitheamh ar an chuid is mó de do chuid ama agus a chur ar bunERDDAP™agus ina dhiaidh sin ag cothabháil doERDDAP™.

Is féidir leat sampla a fheiceáil[datasets.xmlar GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).
     
*    (Murab ionann agus) Anois nó (beagán níos dóichí) sa todhchaí, más mian leat a mhodhnú comhad CSS erddap, a dhéanamh cóip de_tomcat_/content/erddap/ teachtaireachtaí / erddapStart2.css ar a dtugtar erddap2.cs agus ansin athruithe a dhéanamh air. Athruithe ar erddap2.cs ghlacadh ach amháin i bhfeidhm nuairERDDAP™Tá atosú agus is minic a cheangal ar an úsáideoir a soiléir an bhrabhsálaí comhaid i dtaisce.
     
ERDDAP™Ní bheidh ag obair i gceart má tá an thus.xml nódatasets.xmlNíl comhad XML dea-chruthaithe. Mar sin,, tar éis duit na comhaid seo a chur in eagar, is smaoineamh maith é a fhíorú go bhfuil an toradh XML dea-déanta trí théacs XML a ghreamú isteach i seiceáilire XML cosúil le[xmlvaldation](https://www.xmlvalidation.com/).
     
### Suiteáil an erddap.war comhad{#install-the-erddapwar-file} 
4. Ar Linux, Mac, agus Windows, íoslódáil[erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)isteach _ síos / iarratais.
     (leagan 2.27.0, 620,554,403 beart, MD5 = 3b2086c659eee41450dff447bf4ef7, dáta Inis dúinn, le do thoil...) 
    
Is é an comhad .war mór toisc go bhfuil sé chósta réiteach ard, teorainn, agus sonraí ingearchló is gá chun léarscáileanna a chruthú.
    
    \\[Tá roinnt leaganacha roimhe seo ar fáil freisin.
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551,068,245 beart, MD5 = 5FEA912B5D42E50EAB9591F773EA848D, dáta 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551,069,844 beart, MD5 = 461325E97E7577EC671DD50246CCFB8B, dáta 2022-02-23)   
    [Déan teagmháil anois](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411 beart, MD5 = F2CFF805893146E932E498FDBD519B6, dáta 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742,765 beart, MD5 = 2B33354F633294213AE2AFDCF4DA6D0, dáta 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572,124,953 beart, MD5 = D843A043C506725EBD6F8EFDCCA8FD5F, dar dáta 2023-03-03) 
    [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568,748,187 beart, MD5 = 970fbee172e28b0b8a07756eec898e, dar dáta 2024-06-07) 
    [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)  (592,292,039 beart, MD5 = 652AFC9D1421F00B5F789DA2C4732D4C, dar dáta 2024-11-07) 
    [Déan teagmháil anois](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)  (607,404,032 beart, MD5 = 99a725108b37708e5420986c16119, dar dáta 2025-03-31) 
    \\]
    
#### ProxyPass{#proxypass} 
5. Úsáid Proxy Pas mar sin nach bhfuil úsáideoirí a chur ar an uimhir port, m.sh., :80, sa URL.
Ar ríomhairí Linux, má tá Tomcat ag rith i Apache, le do thoil mhodhnú an Apachehttpcomhad d.conf (de ghnáth i / srl / srl /httpd/conf/conf/) a cheadú trácht HTTP chuig / óERDDAP™gan a cheangal ar an uimhir port, m.sh., :8080, sa URL. Mar an t-úsáideoir fréimhe:
    1. Athraigh na láithreacha&lt;VirtualHost &amp; tag (má tá ceann amháin) , nó cuir ceann ag deireadh an chomhaid:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. Ansin atosú Apache: /usr / sbin / Feithiclí bláthanna cumhra: cumhráin (ach uaireanta tá sé i eolaire éagsúla) .
         
### NGINX{#nginx} 
 (Uair an chloigNCOMMON) Má tá tú ag úsáid[NGINX](https://www.nginx.com/)  (freastalaí gréasáin agus charger ualach) :
chun NGINX a fháil agusERDDAP™ag obair i gceart lehttps, ní mór duit a chur ar an snippet seo a leanas taobh istigh den freastalaí Tomcat.xml&lt;Óstáil &amp; bloc:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
Agus sa chomhad nginx config, is gá duit a shocrú ar na headers:
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Buíochas le Kyle Wilcox.)   
     
### tús a chur le Tomcat{#start-tomcat} 
*    (Ní féidir liom a mholadh ag baint úsáide as an Tomcat Bainisteoir Iarratais Gréasáin. Más rud é nach bhfuil tú go hiomlán múchadh agus startup Tomcat, luath nó ina dhiaidh sin beidh ort saincheisteanna cuimhne PermGen.)   
     
*    (I Linux nó Mac OS, má tá tú chruthaigh úsáideoir speisialta a reáchtáil Tomcat, m.sh., tomcat, cuimhnigh a dhéanamh ar na céimeanna seo a leanas mar an t-úsáideoir.)   
     
* Má tá Tomcat ag rith cheana féin, stoptar síos Tomcat le (i Linux nó Mac OS) Táirgí Coibhneasta Is maith leat
nó (i Windows) Sonraí Táirgeshutdown.bat
    
Ar Linux, bain úsáid as ps -ef|tomcat grep roimh agus tar éis shutdown.sh a dhéanamh cinnte go bhfuil an próiseas tomcat stop. Ba chóir an próiseas a liostú roimh an múchadh agus sa deireadh nach bhfuil liostaithe tar éis an múchadh. Féadfaidh sé nóiméad nó dhó a ghlacadh le haghaidhERDDAP™a dhúnadh go hiomlán síos. Bí othar. Nó má tá sé cosúil nach mbeidh sé stop a chur ar a chuid féin, a úsáid:
mharú -9 _processID_
    
* Tosaigh Tomcat le (i Linux nó Mac OS) Foinse do bhfianaise faoi stiúir glan
nó (i Windows) Conas a oibríonn sé?

## Is maith liomERDDAP™ag rith?{#is-erddap-running} 
Úsáid brabhsálaí chun iarracht a dhéanamh féachaint http://_www.YourServer.org_/erddap/status.html   
ERDDAP™Tosaíonn suas gan aon tacar sonraí luchtaithe. Tá tacar sonraí luchtaithe i snáithe cúlra agus mar sin a bheith ar fáil aon-ar-aon.

### Fabhtcheartú{#troubleshooting} 
* Nuair a thagann iarraidh ó úsáideoir i, téann sé go Apache (ar Linux agus Mac OS ríomhairí) , ansin Tomcat, ansinERDDAP™.
* Is féidir leat a fheiceáil cad a thagann chun Apache (agus earráidí gaolmhara) sna comhaid Apache logáil.
*   [Tá tú](/docs/server-admin/additional-information#tomcat-logs)Is féidir a fheiceáil cad a thagann chun Tomcat (agus earráidí gaolmhara) i comhaid Tomcat logáil (_tomcat_ / logs/catalina.out agus comhaid eile san eolaire) .
*   [Tá tú](/docs/server-admin/additional-information#log)Is féidir a fheiceáil cad a thagann chunERDDAP, teachtaireachtaí diagnóiseacha óERDDAP, agus teachtaireachtaí earráide óERDDAP, saERDDAP™ &lt;bigParentDirectory &amp; logs / log.txt comhad.
* Ní Tomcat túsERDDAP™go dtí go bhfaigheann Tomcat iarratas arERDDAP™. Mar sin, is féidir leat a fheiceáil i comhaid log Tomcat má thosaigh séERDDAP™nó má tá teachtaireacht earráide a bhaineann leis an iarracht sin.
* Nuair a bheidhERDDAP™Tosaíonn suas, renames sé an seanERDDAP™comhad logála.txt (Logáil isteach Cláraigh) agus cruthaíonn comhad log.txt nua. Mar sin, má tá an logáil isteach. Tá comhad txt d'aois, tá sé ina comhartha goERDDAP™Nach bhfuil atosaíodh le déanaí.ERDDAP™scríobhann eolas logáil isteach le maolán agus scríobhann ach an maolán chuig an comhad a logáil go tréimhsiúil, ach is féidir leat bhfeidhmERDDAP™a scríobh an maolán chuig an gcomhad logáil trí chuairt a thabhairt.../erddap/status.html.

### Trioblóid: Leagan d'aoisJava {#trouble-old-version-of-java} 
Má tá tú ag baint úsáide as leagan deJavago bhfuil ró-aois le haghaidhERDDAP,ERDDAP™Ní bheidh reáchtáil agus beidh tú a fheiceáil teachtaireacht earráide i comhad logáil Tomcat ar mhaith
Eisceacht sa snáithe "príomh" java.lang.UnsupportedClassVersionEror:
_some/aicme/ainm _: Unsupport mór.minor leagan _someNumber_
Is é an réiteach a thabhairt cothrom le dáta ar an leagan is déanaí deJavaagus déan cinnte go bhfuil Tomcat ag baint úsáide as.

### Trioblóid: Slow Startup Chéad Am{#trouble-slow-startup-first-time} 
Tomcat Tá a lán oibre a dhéanamh den chéad uair iarratas cosúilERDDAP™Tá tús curtha; go háirithe, tá sé a unpack an erddap. comhad cogadh (atá cosúil le.zipcomhad comhad) . Ar roinnt freastalaithe, an chéad iarracht chun féachaint arERDDAP™stallaí (30 soicind?) go dtí go bhfuil an obair seo críochnaithe. Ar fhreastalaithe eile, beidh an chéad iarracht theipeann láithreach. Ach má tá tú ag fanacht 30 soicind agus iarracht a dhéanamh arís, beidh sé n-éireoidh máERDDAP™suiteáilte i gceart.
Níl aon shocrú seo. Tá sé seo ach conas a oibríonn Tomcat. Ach tharlaíonn sé ach an chéad uair tar éis a shuiteáil tú leagan nua deERDDAP™.

## Shut síos agus atosú{#shut-down-and-restart} 
Sa todhchaí, a dhúnadh síos (agus atosú)  ERDDAP, féach[Conas a Shut Dúin agus Atosú Tomcat agusERDDAP](/docs/server-admin/additional-information#shut-down-and-restart).
## Trioblóid?{#trouble} 
Trioblóidí a shuiteáil Tomcat nóERDDAP? Féach ar ár[alt ar thacaíocht bhreise a fháil](/docs/intro#support).
## Fógra ríomhphoist ar Leaganacha NuaERDDAP {#email-notification-of-new-versions-of-erddap} 
Más mian leat ríomhphost a fháil aon uair leagan nua deERDDAP™ar fáil nó tábhachtach eileERDDAP™fógraí, is féidir leat a bheith ar anERDDAP™fógraí liosta[anseo](https://groups.google.com/g/erddap-announce). Meán an liosta seo thart ar r-phost amháin gach trí mhí.
## Saincheaptha{#customize} 
[Saincheap doERDDAP™aird a tharraingt ar do eagraíocht (taiseachas aeir: fliuchNOAA ERD) .](#customize)
    * Athraigh an mbratach atá le feiceáil ag barr gachERDDAP™.html leathanaigh ag eagarthóireacht ar an&lt;startBodyHtml5 &amp; tag i dodatasets.xmlcomhad. (Más rud é nach bhfuil ceann, cóip an mhainneachtain óERDDAP's
        \\[taiseachas aeir: fliuch\\]/ iarratais / iarratas / WEB-INF / Ranganna/gov/noaa/pfel/breise / úsáid / meamaí.xml comhad isteachdatasets.xmlagus in eagar é.) Mar shampla, d'fhéadfá:
        * Bain úsáid as íomhá éagsúla (i.e., lógó d'eagraíocht) .
        * Athraigh an dath cúlra.
        * Athrú "ERDDAP" go dtí "_YourOrganization_'sERDDAP" " "
        * Athrú "Easier access to scientific data" go "Easier access to _YourOrganization_'s data".
        * Athraigh an "Brought a thabhairt duit ag" naisc a bheith naisc chuig do eagraíocht agus foinsí maoinithe.
    * Athrú ar an eolas ar an taobh clé den leathanach baile ag eagarthóireacht ar an&lt;an ShortDescriptionHtml &amp; GT; tag i dodatasets.xmlcomhad. (Más rud é nach bhfuil ceann, cóip an mhainneachtain óERDDAP's
        \\[taiseachas aeir: fliuch\\]/ iarratais / iarratas / WEB-INF / Ranganna/gov/noaa/pfel/breise / úsáid / meamaí.xml comhad isteachdatasets.xmlagus in eagar é.) Mar shampla, d'fhéadfá:
        * Déan cur síos ar cad a dhéanann do eagraíocht agus / nó grúpa.
        * Déan cur síos ar cén cineál sonraí seoERDDAP™Tá.
    * A athrú ar an deilbhín gur dealraitheach ar tabs bhrabhsálaí, cuir favicon do eagraíocht. ico i_tomcat_/content/erddap/ Éifeachtaí / . Féach ar[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon).
