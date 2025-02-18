---
sidebar_position: 2
---

# Clár na dToghthóirí

Is rudaí iad seo nach bhfuil ach ríomhchláraitheoir a bhfuil sé ar intinn aige oibriú leisERDDAP'sJavaNí mór ranganna a fhios.

###  **Dul ar an gCód Foinse**  {#getting-the-source-code} 
   

  - Via Foinse Cód ar GitHub
Tá an cód foinse do leaganacha poiblí le déanaí agus leaganacha in-fhorbairt ar fáil freisin tríd[Déan teagmháil linn](https://github.com/ERDDAP). Léigh le do thoil an[Féach ar Léarscáileanna](https://github.com/ERDDAP/erddap/wiki)don tionscadal sin. Más mian leat an cód foinse a mhodhnú (agus b'fhéidir go bhfuil na hathruithe a ionchorprú isteach sa chaighdeánERDDAP™dáileadh) , is é seo an cur chuige molta.

###  **ERDDAP™spleáchas**  {#erddap-dependencies} 
ERDDAP™Úsáideann Maven a luchtú spleáchais cód chomh maith le roinnt comhaid tagartha statach (Seirbhís do Chustaiméirí) . Déantar é seo chun go leor comhaid mhóra a stóráil sa stór.
Is féidir leat úsáid a bhaint `mvn compile ` agus a beir na spleáchais agus comhaid aife. Is féidir leat úsáid a bhaint freisin ` pacáiste mvn ` a ghiniúint comhad cogadh.
Is féidir leat a íoslódáil de láimh na comhaid aife:

  - [Sonraí Teagmhála.zip](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip)agus unzip sé isteach / WEB-INF/ref/ .

  - [ref_files.zip](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip)agus unzip sé isteach / WEB-INF/ref/ .

  - [erddapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (leagan 1.0.0, 20333 bytes, MD5 = 2B8D2A5AE5ED73E3A42B529C168C60B5, dar dáta 2024-10-14) agus unzip sé isteach _tomcat_, a chruthú_tomcat_/content/erddap.

TABHAIR FAOI DEARA: De réir réamhshocraithe beidh Maven taisce tagairt statach agus sonraí a íoslódáil cartlann agus iad a bhaint ach amháin nuair a leagan nua íoslódáil. A skip íoslódáil go hiomlán, is féidir leat a leagtar ar an `skipResourceDownload ` agus / nó `skipTestResourceDownload airíonna a Maven (e.g. `mvn -DskipResourceDownload pacáiste ` .) . Chun eastóscadh bhfeidhm, a leagtar `-Ddownload.unpack = stre` agus `-Ddownload.unpackWhenChanged = False` .

- ERDDAP™agus tá a subcomponents an-liobrálacha, foinse oscailte[online service](/license), ionas gur féidir leat an cód foinse a úsáid agus a mhodhnú chun críche ar bith, le haghaidh brabúis nó neamhbhrabúis. Tabhair faoi deara goERDDAP™agus tá go leor fochomhpháirtithe ceadúnais a cheangal go n-admhaíonn tú an fhoinse an cód go bhfuil tú ag baint úsáide as. Féach ar[Creidmheasanna](/credits). Cibé acu is gá nó nach ea, tá sé ach foirm mhaith a admháil go léir de na ranníocóirí.
  

-  **Úsáid an Cód do Thionscadail Eile** 

Cé go bhfuil fáilte romhat codanna de naERDDAP™cód do thionscadail eile, rabhadh gur féidir leis an gcód agus beidh athrú. Ní chuirimid gealltanas chun tacú le húsáidí eile ar ár gcód. Beidh Git agus GitHub do réitigh is mó chun déileáil leis seo - Git is féidir leat a chumasc ár n-athruithe i do athruithe.
   **I gcás go leor cásanna ina bhféadfadh tú a bheith tempted a úsáid codanna deERDDAP™i do thionscadal, is dóigh linn go bhfaighidh tú sé i bhfad níos éasca a shuiteáil agus a úsáidERDDAP™mar atá,** agus ansin scríobh seirbhísí eile a úsáideannERDDAP's services. Is féidir leat a chur ar bun do chuid féinERDDAP™suiteáil amh in uair an chloig nó dhó. Is féidir leat a chur ar bun do chuid féinERDDAP™suiteáil ar bhealach snasta i gceann cúpla lá (ag brath ar líon agus ar chastacht do tacar sonraí) . Ach hacking amach codanna deERDDAP™i gcás go bhfuil do thionscadal féin dócha seachtainí a ghlacadh (agus míonna a ghabháil subtleties) agus caillfidh tú an cumas chun athruithe agus Ceartúcháin ó ina dhiaidh sinERDDAP™scaoileadh. Táimid ag (ar ndóigh,) smaoineamh go bhfuil go leor buntáistí ag baint úsáide asERDDAP™mar atá agus a dhéanamh doERDDAP™suiteáil inrochtana go poiblí. Mar sin féin, i gcásanna áirithe, b'fhéidir nach mbeadh tú ag iarraidh a dhéanamh doERDDAP™suiteáil inrochtana go poiblí. Ansin, is féidir le do sheirbhís rochtain a fháil agus do phríobháideach a úsáidERDDAP™agus ní gá do chliaint a fhios faoiERDDAP™.

  ####  **Leathanaigh** 

Nó, tá cur chuige eile a d'fhéadfá a fháil úsáideach atá leathbhealach idir delving isteachERDDAP's cód agus ag baint úsáide asERDDAP™mar sheirbhís gréasáin neamhspleách amháin: Sa rang EDD, tá modh statach a ligeann duit a dhéanamh ar shampla de tacar sonraí (bunaithe ar an tsonraíocht sadatasets.xml) :
cliceáil grianghraf a mhéadú XLUMX (Teaghrán SOLAS t-ádh) 
`Filleann sé ar shampla de EDDTable nóEDDGridtacar sonraí. Mar gheall ar sin mar shampla, is féidir leat glaoch \\
`A dhéanamh NewFileForDapQuery (String userDapQuery, String dir, String fileName, String file Cineál Gluaiseacht) 
`chun an cás a insint chun comhad sonraí a dhéanamh, de fileType ar leith, leis na torthaí ó cheist úsáideora. Dá bhrí sin, is bealach simplí é seo a úsáidERDDAP's modhanna chun sonraí a iarraidh agus comhad a fháil mar fhreagra, díreach mar a bheadh cliant a úsáidERDDAP™iarratas gréasáin. Ach oibríonn an cur chuige seo laistigh de doJavaclár agus sheachbhóthar an gá atá le freastalaí iarratas cosúil Tomcat. Bainimid úsáid as an gcur chuige seo do go leor de na tástálacha aonaid EDDTable agusEDDGridfo-aicmí, ionas gur féidir leat a fheiceáil samplaí de seo sa cód foinse do gach ceann de na ranganna.

###  **Amharc ar gach eolas**  {#development-environment} 

  - Tá cumraíochtaí do[Seirbhís do Chustaiméirí](https://github.com/ERDDAP/erddap/blob/main/development/jetty)agus[Déan teagmháil Linn](https://github.com/ERDDAP/erddap/blob/main/development/docker)i GitHub, cé go bhfuilthar ag súil le scaoileadh a reáchtáil i Tomcat.

  -  **Rogha** : Socraigh suasERDDAP™i Tomcat \\
Ós rud éERDDAP™Tá sé i gceist go príomha a bheith ina servlet ag rith i Tomcat, molaimid go láidir go leanann tú an caighdeán[treoracha a shuiteáil](/docs/server-admin/deploy-install)a shuiteáil Tomcat, agus ansin a shuiteáilERDDAP™i webapps Tomcat ar eolaire. I measc rudaí eile,ERDDAP™dearadh a bheith suiteáilte i struchtúr eolaire Tomcat agus tá súil Tomcat a chur ar fáil roinnt .jar comhaid.

  - ERDDAP™Ní gá IDE ar leith (Chris Úsáideann den chuid is mó Cód Stiúideo Visual, Bob úsáidtear EditPlus) . Ní chuirimid úsáid Eclipse, Ant, etc; ná ní chuirimid ar fáilERDDAPTacaíocht a bhaineann leo. Úsáideann an tionscadal Maven.

  - Bainimid úsáid as comhad bhaisc a scriosadh gach ceann de na. comhaid rang sa chrann foinse chun a chinntiú go bhfuil muid ar compile glan (le javac) .

  - Táimid ag úsáid faoi láthair javac Adoptium ar jdk-21.0.3+9 a thiomsú gov.noaaa.pfeg.coastwatch.TestAll (tá sé naisc le roinnt ranganna nach mbeadh a thiomsú ar shlí eile) agus a reáchtáil na tástálacha. Ar chúiseanna slándála, tá sé beagnach i gcónaí is fearr a bhaint as na leaganacha is déanaí deJava21 agus Tomcat 10.

    - Nuair a reáchtáil muid javac nó java, Is é an t-eolaire atá ann faoi láthair _tomcat_/webapps / erddap / WEB-INF.

    - Is é ár javac agus java classpath
`aicmí; ../../.../lib/servlet-api.jar;lib/* `

    - Mar sin, beidh do líne ordú javac rud éigin cosúil le
` javac -encoding ranganna UTF-8 -cp; ../ ../ ../ ../ .. / svlet-api.jar;lib/* ranganna/gov/pfel/coastwatch/TestAll.java `

    - Agus beidh do líne ordú java a bheith rud éigin cosúil le
.../ ../ ../ ../ ../ ../ .. ../ .. ../ .. .. .. .. .. .. .. ... .. .. . ... . .. .. . ... ../ .. ../ .. .. ../ . .. . . ../ .../ . ... . . . ...... . ./ . . . ./ ....../ . . . . . . . . . ./ . . . ./ . . . . . . . . . . . . . . . . . . . . . . . . . . . . ranganna/gclianta/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na/na ranganna/na/na ranganna/na/na ranganna/na/na ranganna/na/na ranganna/na/na ranganna/na/na ranganna/na/na ranganna/na/na/na ranganna/na/na ranganna/na/na/na ranganna/na/na/na/na/na/na ranganna/na/na/na/na ranganna/na/na ranganna/na/na/na/na/na/na ranganna/na/na/na/na/na/na/na/na/na/na ranganna/na/na/na/na/na/na ranganna/na/na/na/na/na ranganna/na/na/na/na/na/na/na/na/na/na/na ranganna/na/na/na/na/na/na/na/na/na ranganna/na/na/na/na/na
`Roghnach: Is féidir leat a chur `-verbose: gc`, a insíonnJavastaidreamh bailithe truflais a phriontáil.

    - Má tástáil Gach compiles, gach rudERDDAP™Tá riachtanais curtha le chéile. Tá roinnt ranganna le chéile nach bhfuil ag teastáil le haghaidhERDDAP™. Má éiríonn Tiomsú TestAll ach ní compile roinnt rang, nach bhfuil an rang ag teastáil. (Tá roinnt ranganna neamhchríochnaithe / gan úsáid.) 

  - I roinnt cásanna, úsáidimid 3ú páirtí cód foinse ionad .jar comhaid (go háirithe le haghaidhDODS) agus tá siad mhodhnú beagán chun fadhbanna a réiteach leJava21. Is minic a dhéantar modhnuithe beaga eile (go háirithe iDODS) ar chúiseanna eile.

  - Tá an chuid is mó ranganna modhanna tástála ina gcomhad src / tástála a bhaineann leo. Is féidir leat a reáchtáil na tástálacha JUnit leis an `mvn tástála ` ordú . Beidh sé seo íoslódáil roinnt comhaid zip sonraí go bhfuil na tástálacha ag brath ar ó scaoileadh is déanaí[ERDDAPSeirbhís do Chustaiméirí Tástáil Tástáil](https://github.com/ERDDAP/erddapTest/releases/).
     
TABHAIR FAOI DEARA: Íoslódálacha Maven ach beidh unzip na cartlanna a íoslódáil ar gach forghníomhú, a thógann am. A skip íoslódáil
agus unzipping cartlanna sonraí tástála, is féidir leat a shonrú ar an `skipTestResourceDownload ` maoin a Maven (e.g `mvn -DskipTestResourceDownload pacáiste ` .) .

###   **Amharc ar gach eolas**  {#important-classes} 

Más mian leat chun breathnú ar an cód foinse agus iarracht a dhéanamh amach conasERDDAP™oibreacha, le do thoil a dhéanamh.

  - Tá an códJavaTuairimí Doc, ach anJavaNíl Docs a ghintear. Thig leat a ghiniúint iad.

  - Na ranganna is tábhachtaí (lena n-áirítear na cinn atá luaite thíos) atá laistigh de gov/noaa/pfel/erddap.

  - An bhfuilERDDAP™Tá an rang na modhanna leibhéal is airde. Síneann sé HttpServlet.

  - ERDDAP™iarrataí ar chásanna fo-aicmíEDDGridnó EDDTable, a léiríonn tacair sonraí aonair.

  - EDStatic Tá an chuid is mó den fhaisnéis statach agus suímh (e.g., ó na comhaid thus.xml agus teachtaireachtaí.xml) agus cuireann seirbhísí statach (e.g., ríomhphoist a sheoladh) .

  - EDDGridagus fo-aicmí EDDTable parseáil an t-iarratas, sonraí a fháil ó mhodhanna fo-aicme-sonrach, ansin formáid na sonraí don fhreagra.

  - EDDGridfo-aicmí a bhrú sonraí isteach GridDataAccessor (an coimeádán sonraí inmheánach le haghaidh sonraí eangaithe) .

  - Cuireann fo-aicmí EDDTable sonraí i bhfo-aicmí TableWriter, a scríobhann sonraí chuig cineál comhaid ar leith ar an bhféile.

  - Amharc ar gach eolas (e.g., ranganna ar leibhéal íseal) Tá sé tábhachtach freisin, ach is lú seans go mbeidh tú ag obair chun iad a athrú.
     

###  **Eolas faoin gComhlacht**  {#code-contributions} 

- Saincheisteanna GitHub
Más mian leat cur ach nach bhfuil tionscadal, féach ar an liosta de[Saincheisteanna GitHub](https://github.com/ERDDAP/erddap/issues), go leor acu tionscadail a d'fhéadfaí tú a chur ar. Más mian leat a bheith ag obair ar cheist, le do thoil é a shannadh chun tú féin a chur in iúl do dhaoine eile a bhfuil tú ag obair ar sé. Is í an cheist GitHub an áit is fearr chun aon cheisteanna a phlé maidir le conas dul ar aghaidh leis an obair ar an gceist sin.

- Má tá an t-athrú gur mhaith leat a dhéanamh ar cheann de na cásanna coitianta thíos, le do thoil a chruthú[An bhfuil tú ag obair](https://github.com/ERDDAP/erddap/issues)léiríonn an t-athrú atá beartaithe agat a dhéanamh. Ansin, nuair a bhíonn an t-athrú críochnaithe, déan iarratas tarraingthe chun an cumasc a iarraidh. I measc na n-athruithe coitianta tá:

  - Ba mhaith leat a scríobh fo-aicme eile deEDDGridnó EDDTable a láimhseáil cineál foinse sonraí eile. Más amhlaidh, molaimid go bhfaighidh tú an fo-aicme is gaire atá ann cheana agus an cód sin a úsáid mar phointe tosaigh.

  - Ba mhaith leat a scríobh eile SaveAs_FileType_ modh. Más amhlaidh, molaimid go bhfaighidh tú an modh is gaire shábháil As_FileType_ iEDDGridnó EDDTable agus an cód sin a úsáid mar phointe tosaigh.

Tá na cásanna an buntáiste go bhfuil an cód scríobh tú féin-atá. Ní bheidh ort a fhios go léir na sonraí arERDDAP's inmheánacha. Agus beidh sé éasca dúinn a ionchorprú do chód iERDDAP. Tabhair faoi deara go má dhéanann tú cód a chur isteach, beidh an ceadúnas ag teastáil ag luí leis anERDDAP™ [free](/license)  (e.g.,[taiseachas aeir: fliuch](https://www.apache.org/licenses/),[taiseachas aeir: fliuch](https://www.opensource.org/licenses/bsd-license.php), nó[MIT-X](https://www.opensource.org/licenses/mit-license.php)) . Déanfaimid liosta de do ranníocaíocht sa[creidmheasanna](/credits).

- Má tá gné nach bhfuil clúdaithe thuas gur mhaith leat a chur leisERDDAP, moltar snáithe plé a chruthú ar dtús sa[GitHub Pléigh](https://github.com/ERDDAP/erddap/discussions/categories/ideas). Maidir le gnéithe/athruithe suntasacha, pléifidh an Bord Teicniúil iad agus cinnfidh sé cé acu a cheadóidh sé é a chur leis.ERDDAP™.

###  **Juding Do Ranníocaíochtaí Cód**  {#judging-your-code-contributions} 
Más mian leat cód nó athruithe eile a chur isteach le bheith san áireamhERDDAP, is é sin iontach. Ní mór do ranníocaíocht cloí le critéir áirithe chun glacadh leo. Má leanann tú na treoirlínte thíos, méadaíonn tú go mór an seans go nglacfar le do ranníocaíocht.
   

  - An bhfuilERDDAP™Tá tionscadal á bhainistiú ag NATD (NOAAStiúrthóir Teicniúil Ceaptha) le hionchur ó Bhord Teicniúil.
Ó 2007 (an túsERDDAP) trí 2022, ba é sin Bob Simons (chomh maith leis an Founder-Leader) . Ag tosú i mí Eanáir 2023, is é sin Chris John. Go bunúsach, tá an NATD freagrach asERDDAP, mar sin tá s / sé an focal deiridh ar chinntí faoiERDDAP™cód, go háirithe maidir leis an dearadh agus an nglacfar le hiarraidh tarraingthe áirithe nó nach nglacfar léi. Caithfidh sé a bheith ar an mbealach seo go páirteach ar chúiseanna éifeachtúlachta (oibríonn sé go hiontach do Linus Torvalds agus Linux) agus go páirteach ar chúiseanna slándála: Tá duine éigin a insint do na daoine slándála TF a ghlacann s / sé freagracht as slándáil agus sláine an chód.
     

  - Ní dhéanann an NATD ráthú go mbeidh s / sé glacadh le do chód.
Más rud é nach tionscadal ag obair ach amach chomh maith le bhí súil againn agus más rud é nach féidir é a tharrtháil, ní bheidh an NATD áireamh an tionscadal saERDDAP™dáileadh. Ná bíodh dona. Uaireanta nach bhfuil tionscadail ag obair amach chomh maith le súil. Tarlaíonn sé do gach forbróir bogearraí. Má leanann tú na treoirlínte thíos, tú a mhéadú go mór do seans rath.
     

  - Tá sé is fearr má tá na hathruithe ar leas ginearálta agus úsáideacht.
Má tá an cód sonrach do d'eagraíocht, is dócha gur fearr brainse ar leith a choimeád ar bunERDDAP™do do úsáid. Déanann Axiom seo. Fortunately, Git dhéanann sé seo éasca a dhéanamh. Is mian leis an NATD fís comhsheasmhach a choimeád ar bun le haghaidhERDDAP, ní féidir é a bheith ina thionscadal doirteal cistine nuair a chuireann gach duine gné saincheaptha dá dtionscadal.
     

  - Lean anJavaCoinbhinsiúin an Chóid.
Go ginearálta, ba chóir do chód a bheith ar chaighdeán maith agus ba chóir a leanúint ar an bunaidh[JavaCoinbhinsiúin Cód](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf): a chur . comhaid rang san áit chuí sa struchtúr eolaire, a thabhairt. comhaid ranga ainm cuí, san áireamh cuíJavatuairimí Doc, san áireamh / / tuairimí ag tús gach mír de chód, fleasc le 4 spásanna (bláthanna cumhra: cumhráin) , línte a sheachaint ^80 carachtair, etc. Ní Coinbhinsiúin athrú agus an cód foinse i gcónaí go hiomlán suas go dtí seo. Nuair a bheidh amhras, cód mheaitseáil leis na coinbhinsiúin agus ní cód atá ann cheana.

- Úsáid rang tuairisciúil, modh agus ainmneacha athraitheacha.
Sin a dhéanann an cód níos éasca do dhaoine eile a léamh.
   

- Seachain cód mhaisiúil.
San fhadtréimhse, beidh ort nó daoine eile a dhéanamh amach an cód chun é a choimeád ar bun. Mar sin, bain úsáid as modhanna simplí códaithe atá níos éasca dá bhrí sin do dhaoine eile (lena n-áirítear tú sa todhchaí) a figiúr amach. Ar ndóigh, má tá buntáiste fíor a úsáid roinnt mhaisiúilJavagné cláir, é a úsáid, ach doiciméad go forleathan cad a rinne tú, cén fáth, agus conas a oibríonn sé.
   

- Obair leis an mBord Teicniúil sula dtosaíonn tú.
Má tá súil agat a fháil do athruithe cód ceirteacha tarraingthe isteachERDDAP™, Beidh an Bord Teicniúil ag iarraidh cinnte chun labhairt faoi cad tá tú ag dul a dhéanamh agus conas tá tú ag dul a dhéanamh sula ndéanann tú aon athruithe ar an gcód. Ar an mbealach sin, is féidir linn a sheachaint a dhéanann tú athruithe nach bhfuil an NATD, sa deireadh, glacadh. Nuair a bhíonn tú ag déanamh an obair, tá an NATD agus an Bord Teicniúil sásta ceisteanna a fhreagairt chun cabhrú leat a figiúr amach an cód atá ann cheana féin agus (foriomlán) conas dul i ngleic le do thionscadal.
   

- Obair go neamhspleách (an oiread agus is féidir) tar éis duit tosú.
I gcodarsnacht leis an thuas "Work leis an mBord Teicniúil", tar éis duit tús a chur ar an tionscadal, spreagann an NATD tú a bheith ag obair chomh neamhspleách agus is féidir. Má tá an NATD a insint duit beagnach gach rud agus go leor ceisteanna a fhreagairt (go háirithe na cinn a d'fhéadfá a bheith fhreagair ag léamh an doiciméadacht nó an cód) , ansin nach bhfuil do chuid iarrachtaí coigiltis ama don NATD agus s / d'fhéadfadh sé chomh maith a dhéanamh ar an obair iad féin. Tá sé an[Mí an Duine Mythical](https://en.wikipedia.org/wiki/The_Mythical_Man-Month)fadhb. Ar ndóigh, ba cheart dúinn cumarsáid a dhéanamh fós. Bheadh sé iontach a fheiceáil go tréimhsiúil do chuid oibre ar siúl chun a chinntiú go bhfuil an tionscadal ar rian. Ach an níos mó is féidir leat obair go neamhspleách (tar éis don Bhord Teicniúil aontú ar an tasc ar láimh agus an cur chuige ginearálta) , an níos fearr.
   

- Seachain bugs.
Más rud é nach bhfuil a bug gafa roimh scaoileadh, cúiseanna sé fadhbanna d'úsáideoirí (ag is fearr) , tuairisceáin an t-eolas mícheart (ag is measa) , Is blot arERDDAP's cháil, agus beidh sé fós ar amach-de-dátaERDDAP™suiteálacha ar feadh na mblianta. Obair an-deacair a bugs a sheachaint. Is cuid de seo scríobh cód glan (mar sin tá sé níos éasca fadhbanna a fheiceáil) . Is cuid de seo tástálacha aonaid a scríobh. Is cuid de seo dearcadh leanúnach a sheachaint bug nuair a scríobh tú cód. Ná déan an oth NATD ag cur do chód aERDDAP™.
   

- Scríobh tástáil nó tástálacha aonaid.
Le haghaidh cód nua, ba chóir duit tástálacha JUnit a scríobh i gcomhad tástála.
Scríobh ar a laghad modh tástála aonair amháin go tástálacha go maith an cód scríobh tú agus é a chur leis an rang ' comhad tástála JUnit ionas go mbeidh sé ar siúl go huathoibríoch. Aonad an Aonaid (agus a bhaineann) Tá tástálacha ar cheann de na bealaí is fearr a bugs ghabháil, ar dtús, agus san fhadtréimhse (mar rudaí eile a athrú iERDDAP™) . Mar a dúirt Bob, "Tá tástálacha mícheart cad a ligeann dom codlata san oíche."
   

- Déan sé éasca don NATD a thuiscint agus glacadh leis na hathruithe i d'iarratas tarraingt.
Cuid de sin ag scríobh modh tástála aonad (s s) . Cuid de go bhfuil teorainn do athruithe ar roinn amháin de chód (nó aicme amháin) más féidir. Ní bheidh an NATD glacadh le haon iarratas tarraingt leis na céadta athruithe ar fud an cód. Insíonn an NATD na daoine slándála TF a ghlacann freagracht as slándáil agus sláine an chód. Má tá an iomarca athruithe nó go bhfuil siad ró-deacair a dhéanamh amach, ansin tá sé ach ró-deacair a fhíorú go bhfuil na hathruithe ceart agus nach bhfuil a thabhairt isteach bugs nó saincheisteanna slándála.
   

- Coinnigh sé simplí.
Is téama foriomlán maith do do chód: Coinnigh sé simplí. Tá cód simplí éasca do dhaoine eile (lena n-áirítear tú sa todhchaí) a léamh agus a chothabháil. Tá sé éasca don NATD a thuiscint agus dá bhrí sin glacadh.
   

- Glac freagracht fadtéarmach do do chód.
Sa fhadtréimhse, is fearr má ghlacann tú freagracht leanúnach as do chód a chothabháil agus ceisteanna a fhreagairt faoi (e.g., saERDDAP™Grúpa Google) . Mar nóta roinnt údair, Is cód dliteanas chomh maith le sócmhainn. Má tá a bug amach sa todhchaí, tá sé is fearr má shocraíonn tú é mar a fhios ag aon duine do chód níos fearr ná tú (chomh maith ionas go mbeidh dreasacht ann bugs a sheachaint sa chéad áit) . Níl an NATD ag iarraidh tiomantas daingean a chur ar fáil cothabháil leanúnach. Is é an NATD ag rá go bhfuil ag déanamh an chothabháil a bheith buíoch go mór.
