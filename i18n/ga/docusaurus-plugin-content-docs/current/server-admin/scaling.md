---
sidebar_position: 5
---
# Scaling

## ERDDAP™- Luchtaigh Trom, Grids, Clusters, Cónaidhm, agus Cloud Ríomhaireacht{#erddap---heavy-loads-grids-clusters-federations-and-cloud-computing} 
 

## ERDDAP:

[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html)Is iarratas gréasáin agus seirbhís gréasáin a chomhiomlánaíonn sonraí eolaíochta ó fhoinsí áitiúla agus iargúlta éagsúla agus cuireann sé ar bhealach simplí, comhsheasmhach a íoslódáil fo-thacar de na sonraí i bhformáidí comhad coitianta agus graif agus léarscáileanna a dhéanamh. Pléann an leathanach gréasáin seo saincheisteanna a bhaineann le tromERDDAP™ualaí úsáide agus iniúchadh féidearthachtaí chun déileáil le ualaí thar a bheith trom trí greillí, braislí, cónaidhmeanna, agus ríomhaireachta scamall.

Scríobhadh an leagan bunaidh i mí an Mheithimh 2009. Ní raibh aon athruithe suntasacha ann. Rinneadh é seo a nuashonrú go deireanach le linn 2019.

## DISCLAIMER{#disclaimer} 

Is tuairimí pearsanta Bob Simons iad ábhar an leathanaigh ghréasáin seo agus ní gá go léireodh sé aon phost de chuid an Rialtais nó anNational Oceanic and Atmospheric Administration. Tá na ríomhanna simplí, ach is dóigh liom go bhfuil na conclúidí ceart. An raibh mé ag úsáid loighic lochtach nó a dhéanamh botún i mo ríomhaireachtaí? Más amhlaidh, tá an locht mianach ina n-aonar. Seol ríomhphost leis an gceartú chuigerd dot data at noaa dot gov.
 

- - - - - -

## Luchtaigh Trom / Srianta{#heavy-loads--constraints} 

Le húsáid throm, a standaloneERDDAP™a bheidh srianta (ó an chuid is mó de na) ag:

### Foinse cianda Bandaleithead{#remote-source-bandwidth} 
1. Bandaleithead foinse sonraí iargúlta - Fiú amháin le nasc éifeachtach (e.g., tríOPeNDAP) , mura bhfuil nasc Idirlín bandaleithead an-ard ag foinse sonraí iargúlta,ERDDAP'Beidh freagraí a srianta ag cé chomh tapaERDDAP™is féidir sonraí a fháil ón bhfoinse sonraí. Tá réiteach a chóipeáil an tacar sonraí isteachERDDAP's tiomáint crua, b'fhéidir le[EDDGridCóip Uaireadóirí Cóip](/docs/server-admin/datasets#eddgridcopy)nó[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy).
     
### ERDDAP's Freastalaí Bandaleithead{#erddaps-server-bandwidth} 
2. Mura bhfuilERDDAP's freastalaí nasc Idirlín bandaleithead an-ard,ERDDAP'Beidh freagraí a srianta ag cé chomh tapaERDDAP™is féidir a fháil sonraí ó na foinsí sonraí agus cé chomh tapaERDDAP™Is féidir sonraí ar ais chuig na cliaint. Is é an t-aon réiteach a fháil nasc Idirlín níos tapúla.
     
### Cuimhne{#memory} 
3. Má tá go leor iarrataí comhuaineach,ERDDAP™Is féidir a reáchtáil amach de chuimhne agus go sealadach diúltú iarratais nua. (ERDDAP™Tá cúpla meicníochtaí a sheachaint agus na hiarmhairtí a íoslaghdú má tharlaíonn sé.) Mar sin, an chuimhne níos mó sa fhreastalaí an níos fearr. Ar fhreastalaí 32-giotán, tá 4 + GB i ndáiríre go maith, tá 2 GB ceart go leor, nach bhfuil níos lú molta. Ar freastalaí 64-giotán, is féidir leat a sheachaint beagnach go hiomlán ar an bhfadhb ag dul go leor de chuimhne. Féach an[\\-Xmx agus -Xms suímh](/docs/server-admin/deploy-install)le haghaidhERDDAP/ Tomcat. An bhfuilERDDAP™ag fáil úsáid trom ar ríomhaire le freastalaí 64-giotán le 8GB de chuimhne agus -Xmx leagtha go 4000M Is annamh, más rud é riamh, srianta ag cuimhne.
     
### Bhí Céide Bandaleithead{#had-drive-bandwidth} 
4. Tá rochtain sonraí a stóráil ar an bhfreastalaí tiomáint crua vastly níos tapúla ná rochtain sonraí iargúlta. Fiú mar sin, má tá anERDDAP™Tá freastalaí nasc Idirlín bandaleithead an-ard, is féidir go mbeidh sonraí rochtain ar an tiomáint crua a bheith ina scrobarnach. Tá réiteach páirteach a úsáid níos tapúla (e.g., 10,000 RPM) thiomáineann crua maighnéadach nó thiomáineann SSD (má dhéanann sé ciall costas-ciallmhar) . Is réiteach eile a stóráil tacar sonraí éagsúla ar thiomáineann éagsúla, ionas go mbeidh an bandaleithead tiomáint crua carnach i bhfad níos airde.
     
### Too Comhaid go leor Cached{#too-many-files-cached} 
5. Go leor comhaid i[taisce taisce taisce](/docs/server-admin/additional-information#cached-responses)web developmentERDDAP™taisceadh gach íomhánna, ach amháin taisceann na sonraí do chineálacha áirithe na n-iarratas sonraí. Is féidir an t-eolaire taisce le haghaidh tacar sonraí go bhfuil líon mór de na comhaid go sealadach. Beidh sé seo mall síos iarrataí a fheiceáil má tá comhad sa taisce (i ndáiríre&#33;) .&lt;taisce taisce taisce Miontuairiscí agus Ceacht[crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml)ligeann tú a leagtar cé chomh fada is féidir le comhad a bheith sa taisce sula bhfuil sé scriosta. Bheadh Socrú uimhir níos lú íoslaghdú an fhadhb seo.
     
### LAP LAP{#cpu} 
6. Ní ghlacann ach dhá rud a lán ama LAP:
    *   NetCDF4 agusHDF5 tacaíocht a thabhairt anois comhbhrú inmheánach sonraí. Decompressing mór comhbhrúiteNetCDF4 / 4 /HDFIs féidir le 5 comhad sonraí a ghlacadh 10 nó níos mó soicind. (Ní hé sin an locht cur chun feidhme. Tá sé an cineál comhbhrú.) Mar sin, is féidir le hiarrataí comhuaineacha il le tacair sonraí a stóráil i gcomhaid comhbhrúite brú dian a chur ar aon fhreastalaí. Más fadhb é seo, is é an réiteach a stóráil tacar sonraí tóir i gcomhaid uncompressed, nó freastalaí a fháil le LAP le cores níos mó.
    * grafanna a dhéanamh (lena n-áirítear léarscáileanna) : garbh 0.2 - 1 dara in aghaidh an graf. Mar sin, má bhí go leor iarrataí ar leith comhuaineach do graif (WMScliaint a dhéanamh go minic 6 iarratais comhuaineach&#33;) , d'fhéadfadh a bheith ann teorainn LAP. Nuair a bhíonn úsáideoirí il ag rithWMScliaint, bíonn sé seo ina fhadhb.
         

- - - - - -

## IomarcaíochtERDDAPs le Luchtaigh a Chothromú?{#multiple-identical-erddaps-with-load-balancing} 

Tagann an cheist go minic suas: "Chun déileáil le ualaí trom, is féidir liom a chur ar bun il comhionannERDDAPs le cothromú ualach?" Tá sé ceist suimiúil toisc go bhfaigheann sé go tapa chun an croíERDDAP's dearadh. Is é an freagra tapa "no". Tá a fhios agam go bhfuil freagra díomá, ach tá cúpla cúiseanna díreach agus roinnt cúiseanna bunúsacha níos mó cén fáth gur ceapadh méERDDAP™cur chuige difriúil a úsáid (a chónaidhmERDDAPs, cur síos ar an mórchóir an doiciméid seo) , a Creidim go bhfuil réiteach níos fearr.

Roinnt cúiseanna díreach cén fáth nach féidir leat / Níorbh fhéidir a chur ar bun il comhionannERDDAPs iad:

* A tugadhERDDAP™léann gach comhad sonraí nuair a thiocfaidh sé ar fáil ar dtús chun teacht ar an raon sonraí sa chomhad. siopaí sé ansin go bhfuil faisnéis i gcomhad innéacs. Níos déanaí, nuair a thagann iarraidh úsáideora le haghaidh sonraí i,ERDDAP™Úsáideann an t-innéacs a figiúr amach cé na comhaid a chuardach i do na sonraí a iarrtar. Má bhí il comhionannERDDAPs, bheadh siad gach a bheith ag déanamh an innéacsú, a bhfuil iarracht amú. Leis an gcóras cónasctha cur síos thíos, tá an t-innéacsú déanta ach uair amháin, ag ceann de naERDDAPs.
* I gcás roinnt cineálacha iarratais úsáideora (e.g..nc.png, .pdf comhaid)  ERDDAP™Tá a dhéanamh ar an comhad ar fad sular féidir an freagra a sheoladh. Mar sin,ERDDAP™caches na comhaid ar feadh tréimhse ghearr. Má thagann iarraidh chomhionann i (mar a dhéanann sé go minic, go háirithe le haghaidh íomhánna ina bhfuil an URL leabaithe i leathanach gréasáin) ,ERDDAP™Is féidir a athúsáid go comhad i dtaisce. I gcóras de comhionann ilERDDAPs, nach bhfuil na comhaid i dtaisce roinnte, mar sin gachERDDAP™Bheadh gálessly agus wastefully recreate an.nc.png, nó .pdf comhaid. Leis an gcóras cónasctha cur síos thíos, na comhaid a dhéanamh ach uair amháin, ag ceann de naERDDAPs, agus athúsáid.
*   ERDDAP's Níl córas síntiús ar bun le roinnt ag ilERDDAPs. Mar shampla, má chuireann an t-iarmhéideoir ualach úsáideoir chuig ceannERDDAP™agus suibscríobhann an t-úsáideoir le tacar sonraí, ansin an ceann eileERDDAPs Ní bheidh a bheith ar an eolas ar an síntiús. Níos déanaí, má chuireann an t-iarmhéideoir ualach an t-úsáideoir le difriúilERDDAP™agus iarrann sé liosta dá shíntiús, an ceann eileERDDAP™Beidh rá nach bhfuil aon cheann (i gceannas air / uirthi síntiús dúblach a dhéanamh ar an ERED eileDAP) . Leis an gcóras cónasctha a thuairiscítear thíos, tá an córas síntiús á láimhseáil go simplí ag an bpríomh-, an pobal, an ilchodachERDDAP.

Sea, do gach ceann de na fadhbanna sin, d'fhéadfadh mé (le iarracht mhór) innealtóir réiteach (an fhaisnéis a roinnt idirERDDAPs s) , ach is dóigh liom an[Cothú-de-ERDDAPs cur chuige](#grids-clusters-and-federations)  (cur síos ar an mórchóir an doiciméid seo) Is réiteach i bhfad níos fearr foriomlán, go páirteach mar a dhéileálann sé le fadhbanna eile go bhfuil an il-identical-ERDDAPs-le-ualach-chothromú cur chuige nach bhfuil tús fiú chun aghaidh a thabhairt, go háirithe nádúr díláraithe na bhfoinsí sonraí ar fud an domhain.

Tá sé is fearr glacadh leis an bhfíric simplí nach raibh mé ag dearadhERDDAP™a imscaradh mar il comhionannERDDAPs le balancer ualach. Dearadh mé go comhfhiosachERDDAP™a bheith ag obair go maith laistigh de chónaidhmERDDAPs, a chreideann mé go bhfuil go leor buntáistí. Go suntasach, cónaidhmERDDAPs ailínithe go foirfe leis an díláraithe, córas a dháileadh na n-ionad sonraí go bhfuil muid ar an domhan fíor (smaoineamh ar na réigiúin IOOS éagsúla, nó na réigiúin CoastWatch éagsúla, nó na codanna éagsúla de NCEI, nó an 100 ionaid sonraí eile iNOAA, nó an DAACs NASA éagsúla, nó an 1000 na n-ionad sonraí ar fud an domhain) . In ionad a rá go léir na hionaid sonraí ar fud an domhain gur gá dóibh a n-iarrachtaí a thréigean agus a gcuid sonraí go léir a chur i lárnaithe " loch sonraí" (fiú má bhí sé indéanta, is smaoineamh uafásach é ar chúiseanna iomadúla - féach na hanailísí éagsúla a léiríonn na buntáistí iomadúla a bhaineann le[córais díláraithe](https://en.wikipedia.org/wiki/Decentralised_system)) ,ERDDAP's oibreacha dearadh leis an domhan mar go bhfuil sé. Is féidir le gach ionad sonraí a tháirgeann sonraí leanúint ar aghaidh ag cothabháil, a leigheas, agus a gcuid sonraí a sheirbheáil (mar ba chóir dóibh) , agus fós, leERDDAP™, is féidir na sonraí a bheith ar fáil láithreach ó láraitheERDDAP, gan an gá atá le tarchur na sonraí chuig an láraitheERDDAP™nó cóipeanna dúblach de na sonraí a stóráil. Go deimhin, is féidir tacar sonraí ar leith a bheith ar fáil ag an am céanna
óERDDAP™ag an eagraíocht a tháirgtear agus siopaí iarbhír na sonraí (e.g., GoMOOS) ,
óERDDAP™ag an máthaireagraíocht (e.g., IOOS lárnach) ,
ó uile-NOAA ERDDAP™,
ó rialtas uile-SAMERDDAP™,
ó domhandaERDDAP™  (Seirbhís do Chustaiméirí) ,
agus ó speisialaitheERDDAPs s (e.g.,ERDDAP™ag institiúid a bheidh dírithe ar thaighde HAB) ,
go léir go bunúsach láithreach, agus go héifeachtach toisc go bhfuil ach na meiteashonraí a aistriú idirERDDAPs, ní na sonraí. Is fearr ar fad, tar éis an tosaighERDDAP™ag an eagraíocht tionscnaimh, gach ceann de na eileERDDAPIs féidir s a chur ar bun go tapa (roinnt uaireanta oibre) , le hacmhainní íosta (freastalaí amháin nach gá aon RAIDs le haghaidh stórála sonraí ó stórálann sé aon sonraí go háitiúil) , agus dá bhrí sin ar chostas fíor íosta. Déan comparáid idir an costas a bhunú agus a chothabháil ionad sonraí láraithe le loch sonraí agus an gá atá le fíor ollmhór, fíor costasach, nasc Idirlín, móide an fhadhb comhghafach an lár sonraí láraithe a bheith ina pointe amháin teip. Chun dom,ERDDAPs díláraithe, Tá cur chuige chothaithe i bhfad, i bhfad níos fearr.

I gcásanna ina riachtanais ionad sonraí áirithe ilERDDAPs chun freastal ar éileamh ard,ERDDAP's dearadh atá in ann a mheaitseáil go hiomlán nó níos mó le feidhmíocht an il-fhíorúil-ERDDAPs-le-a-ualach-chothromóir cur chuige. Tá tú i gcónaí ar an rogha a chur ar bun[ilchodach ilERDDAPs s (mar a pléadh thíos) ](#multiple-composite-erddaps), gach ceann acu faigheann gach ceann dá gcuid sonraí ó eileERDDAPs, gan chothromú ualach. Sa chás seo, molaim go ndéanann tú pointe de gach ceann de na cumaisc a thabhairtERDDAPs ainm / féiniúlacht éagsúla agus más féidir iad a chur ar bun i gcodanna éagsúla den domhan (e.g. réigiúin éagsúla AWS) , m.sh.,ERD\\_US\\_East,ERD\\_US\\_West,ERD[EN]ERD\\_FR,ERD\\_IT, ionas go mbeidh úsáideoirí go comhfhiosach, arís agus arís eile, ag obair le sonrachERDDAP, leis an sochar breise go bhfuil tú a bhaint as an riosca ó phointe amháin teip.
 

- - - - - -

## [ **Grids, Clusters, agus Cónaidhm** ](#grids-clusters-and-federations) {#grids-clusters-and-federations} 

Faoi úsáid an-trom, standalone amháinERDDAP™a reáchtáil i gceann amháin nó níos mó de na[security guards](#heavy-loads--constraints)liostaithe thuas agus fiú beidh na réitigh mholta neamhleor. I gcás cásanna den sórt sin,ERDDAP™Tá gnéithe a dhéanann sé éasca a thógáil greillí inscálaithe (ar a dtugtar freisin braislí nó cónaidhmeanna) deERDDAPs a cheadaíonn an córas a láimhseáil úsáid an-trom (e.g., le haghaidh ionad sonraí mór) .

Tá mé ag úsáid[greille](https://en.wikipedia.org/wiki/Grid_computing)mar théarma ginearálta chun cineál[braisle ríomhaire](https://en.wikipedia.org/wiki/Computer_cluster)i gcás ina bhféadfar nó nach bhféadfar na codanna go léir a bheith suite go fisiciúil in aon saoráid amháin agus go bhféadfar nó nach bhféadfar iad a riaradh go lárnach. Buntáiste a bhaint as eangacha comhlonnaithe, faoi úinéireacht lárnach agus faoi riaradh (braislí) go dtairbhíonn siad ó geilleagair scála (go háirithe ualach oibre an duine) agus a shimpliú a dhéanamh ar na codanna den chóras ag obair go maith le chéile. Buntáiste a bhaint as greillí neamh-chomhlonnaithe, neamh-úinéireachta faoi úinéireacht agus faoi riaradh (Cónaidhm na Rúise) go bhfuil siad a dháileadh ar an ualach oibre an duine agus an costas, agus d'fhéadfadh a chur ar fáil roinnt caoinfhulaingt locht breise. Oibríonn an réiteach a mholaim thíos go maith do gach greille, braisle, agus topagrafaíocht chothaithe.

Is é an smaoineamh bunúsach a dhearadh córas inscálaithe a aithint na scrogaill féideartha agus ansin an córas a dhearadh ionas gur féidir codanna den chóras a mhacasamhlú mar is gá chun na scrogaill a mhaolú. Go hidéalach, méadaíonn gach cuid mhacasamhlú cumas an chuid sin den chóras líneach (éifeachtúlacht scaling) . Níl an córas inscálaithe mura bhfuil réiteach inscálaithe ann do gach scrogaill.[Scála an tSuímh](https://en.wikipedia.org/wiki/Scalability)Tá sé difriúil ó éifeachtúlacht (conas is féidir tasc a dhéanamh go tapa - éifeachtúlacht na gcodanna) . Ceadaíonn Scalability an córas ag fás a láimhseáil aon leibhéal an éilimh. **Éifeachtúlacht**   (de scálú agus na codanna) a chinneadh cé mhéad freastalaithe, etc, a bheidh ag teastáil chun freastal ar leibhéal áirithe éilimh. Tá Éifeachtacht an-tábhachtach, ach tá teorainneacha i gcónaí. Is Scalability an t-aon réiteach praiticiúil a thógáil córas is féidir a láimhseáil **an-** úsáid throm. Go hidéalach, beidh an córas inscálaithe agus éifeachtach.

### Amharc ar gach eolas{#goals} 
Is iad na spriocanna an dearadh seo:

* A dhéanamh ailtireacht inscálaithe (ceann atá extensible go héasca trí mhacasamhlú aon chuid a thiocfaidh chun bheith ró-burdened) . Chun córas éifeachtach a dhéanamh a uasmhéadaíonn infhaighteacht agus tréchur na sonraí a thugtar na hacmhainní ríomhaireachta atá ar fáil. (Tá costas beagnach i gcónaí ceist.) 
* A chothromú na cumais na codanna den chóras ionas nach mbeidh cuid amháin den chóras overwhelm chuid eile.
* A dhéanamh ailtireacht simplí ionas go bhfuil an córas éasca a chur ar bun agus a riaradh.
* A dhéanamh ailtireacht a oibríonn go maith le gach topography greille.
* Chun córas a dhéanamh go mainneoidh gracefully agus ar bhealach teoranta má éiríonn aon chuid ró-burdened. (Cuirfidh an t-am a theastaíonn chun tacair mhóra sonraí a chóipeáil teorainn i gcónaí ar chumas an chórais déileáil le méaduithe tobann san éileamh ar thacar sonraí ar leith.) 
*    (Más féidir) A dhéanamh ailtireacht nach bhfuil ceangailte le haon ar leith[internet marketing](#cloud-computing)seirbhís nó seirbhísí seachtracha eile (toisc nach bhfuil sé gá dóibh) .

### Moltaí{#recommendations} 
Ár moltaí
![greille / léaráid braisle](/img/cluster.png)

* Go bunúsach, molaim múirín a bhunúERDDAP™  ( **D. D.D.** sa léaráid) , atá rialtaERDDAP™ach amháin go bhfreastalaíonn sé ach sonraí ó eileERDDAPs. Tá ailtireacht an ghreille deartha chun an oiread oibre agus is féidir a athrú (úsáid LAP, úsáid cuimhne, úsáid bandaleithead) ón IlchodachERDDAP™go dtí an ceann eileERDDAPs.
*   ERDDAP™Tá dhá chineál leagtha sonraí speisialta,[EDDGridAn tSraith Shinsearach](/docs/server-admin/datasets#eddfromerddap)agus[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap), a thagraíonn do
datasets ar eileERDDAPs.
* Nuair a bhíonn an ilchodachERDDAP™faigheann sé iarratas ar shonraí nó íomhánna ó na tacair sonraí seo, an ilchodachERDDAP™ [atreorú](https://en.wikipedia.org/wiki/URL_redirection)an iarraidh sonraí chuig an duine eileERDDAP™freastalaí. Is é an toradh:
    * Níl an Tweet seo ar fáil (LAP, cuimhne, agus bandaleithead) , mar gheall ar a mhalairt
        1. An ilchodachERDDAP™go bhfuil an iarraidh sonraí a sheoladh chuig an duine eileERDDAP.
        2. An ceann eileERDDAP™tá a fháil ar na sonraí, reformat sé, agus na sonraí a tharchur chuig an ilchodachERDDAP.
        3. An ilchodachERDDAP™a fháil ar na sonraí (ag baint úsáide as bandaleithead breise) , reformat it (ag baint úsáide as am LAP breise agus cuimhne) , agus na sonraí a tharchur chuig an úsáideoir (ag baint úsáide as bandaleithead breise) . Tríd an iarraidh ar na sonraí a a atreorú agus trí chead a thabhairt don duine eileERDDAP™an freagra a sheoladh go díreach chuig an úsáideoir, an ilchodachERDDAP™Caitheann go bunúsach aon am LAP, cuimhne, nó bandaleithead ar iarratais sonraí.
    * Tá an atreorú trédhearcach don úsáideoir beag beann ar na bogearraí cliant (brabhsálaí nó aon bhogearraí nó uirlis líne ordaithe eile) .

### Seirbhís do Chustaiméirí{#grid-parts} 
[Is iad na codanna den ghreille:](#grid-parts)

 **Amharc ar gach eolas** : I gcás gach foinse sonraí iargúlta a bhfuil ard-bandaleitheadOPeNDAPfreastalaí, is féidir leat ceangal go díreach leis an bhfreastalaí iargúlta. Má tá an freastalaí iargúltaERDDAP™, úsáidEDDGridÓ Erddap nó EDDTableFromERDDAPchun freastal ar na sonraí sa CompositeERDDAP. Má tá an freastalaí iargúlta cineál éigin eileDAPfreastalaí, m.sh., TRÍ,Hyrax, nó GrADS, úsáidEDDGridÓ Dap.

 **B B B B** : I gcás gachERDDAPfoinse sonraí -able (foinse sonraí ónaERDDAPIs féidir sonraí a léamh) go bhfuil freastalaí ard-bandaleithead, a chur ar bun eileERDDAP™sa ghreille atá freagrach as na sonraí a sheirbheáil ón bhfoinse sonraí seo.

* Má tá roinnt den sórt sinERDDAPs nach bhfuil ag fáil go leor iarrataí ar shonraí, is féidir leat iad a chomhdhlúthú i gceannERDDAP.
* Má tá anERDDAP™tiomanta do shonraí a fháil ó fhoinse iargúlta amháin ag fáil iarratais an iomarca, tá temptation a chur breiseERDDAPs chun rochtain a fháil ar an bhfoinse sonraí iargúlta. I gcásanna speisialta d'fhéadfadh sé seo ciall a dhéanamh, ach tá sé níos dóichí go mbeidh sé seo overwhelm an fhoinse sonraí iargúlta (a bhfuil féin-defeating) agus cosc a chur ar úsáideoirí eile rochtain a fháil ar an bhfoinse sonraí iargúlta (nach bhfuil deas) . I gcás den sórt sin, mheas a chur ar bun eileERDDAP™chun freastal go tacar sonraí amháin agus an tacar sonraí a chóipeáil ar anERDDAP's tiomáint crua (féach ar **Caidéal C** ) , b'fhéidir le[EDDGridCóip Uaireadóirí Cóip](/docs/server-admin/datasets#eddgridcopy)agus/nó[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy).
*    **B B B B** Ní mór freastalaithe a bheith inrochtana go poiblí.

 **Caidéal C** : I gcás gachERDDAPfoinse sonraí -able go bhfuil freastalaí íseal-bandaleithead (nó is seirbhís mall ar chúiseanna eile) , mheas a chur ar bun eileERDDAP™agus cóip den tacar sonraí a stóráil ar anERDDAP's thiomáineann crua, b'fhéidir le[EDDGridCóip Uaireadóirí Cóip](/docs/server-admin/datasets#eddgridcopy)agus/nó[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy). Má tá roinnt den sórt sinERDDAPs nach bhfuil ag fáil go leor iarrataí ar shonraí, is féidir leat iad a chomhdhlúthú i gceannERDDAP.
 **Caidéal C** Ní mór freastalaithe a bheith inrochtana go poiblí.

#### Déan teagmháil linnERDDAP {#composite-erddap} 
 **D. D.D.** : An ilchodachERDDAP™Is rialtaERDDAP™ach amháin go bhfreastalaíonn sé ach sonraí ó eileERDDAPs.

* Mar gheall ar an ilchodachERDDAP™Tá faisnéis i gcuimhne faoi gach ceann de na tacair sonraí, is féidir é a fhreagairt go tapa ar iarratais ar liostaí de thacair sonraí (cuardaigh téacs iomlán, cuardaigh catagóire, liosta de na tacair sonraí) , agus iarratais ar Fhoirm Rochtana Sonraí tacar sonraí aonair, Déan foirm Graph, nóWMSleathanach info. Is iad seo go léir beag, dinimiciúil a ghintear, leathanaigh HTML bunaithe ar fhaisnéis atá ar siúl i gcuimhne. Mar sin, tá na freagraí an-tapa.
* Toisc go ndéantar iarrataí ar shonraí iarbhír a atreorú go tapa chuig an duine eileERDDAPs, an ilchodachERDDAP™Is féidir freagra a thabhairt go tapa ar iarrataí ar shonraí iarbhír gan úsáid aon am LAP, cuimhne, nó bandaleithead.
* Trí athrú an oiread oibre agus is féidir (LAP, cuimhne, bandaleithead) ón IlchodachERDDAP™go dtí an ceann eileERDDAPs, an ilchodachERDDAP™Is féidir le feiceáil chun freastal ar shonraí ó gach ceann de na tacair sonraí agus fós a choinneáil suas le líon an-mhór na n-iarratas sonraí ó líon mór na n-úsáideoirí.
* Léiríonn réamhthrialacha go bhfuil an cumaiscERDDAP™Is féidir freagra a thabhairt ar an chuid is mó iarrataí i ~ 1ms de am LAP, nó 1000 iarrataí / dara. Mar sin, ba cheart próiseálaí croí 8 a bheith in ann freagra a thabhairt ar thart ar 8000 iarrataí / dara. Cé go bhfuil sé indéanta pléascthaí de ghníomhaíocht níos airde a chur faoi deara slowdowns, is é sin a lán de tréchur. Is dócha go mbeidh bandaleithead ionad sonraí an muineál fada roimh an ilchodachERDDAP™thiocfaidh chun bheith ar an scrogaill.
##### Uasmhéid cothrom le dáta (am trátha) ?{#up-to-date-maxtime} 
An bhfuilEDDGrid/ TableFromErddap sa ilchodachERDDAP™athruithe ach a chuid faisnéise a stóráil faoi gach tacar sonraí foinse nuair a bhíonn an tacar sonraí foinse["athlódáil"](/docs/server-admin/datasets#reloadeverynminutes)agus roinnt píosa na n-athruithe meiteashonraí (e.g., an athróg ama aractual\\_range) , rud a ghineann fógra síntiús. Má tá sonraí ag an tacar sonraí foinse a athraíonn go minic (mar shampla, sonraí nua gach dara) agus a úsáideann an["uasdátú"](/docs/server-admin/datasets#updateeverynmillis)córas chun athruithe go minic ar na sonraí bunúsacha a thabhairt faoi deara,EDDGrid/ Ní bheidh TableFromErddap a chur in iúl faoi na hathruithe go minic go dtí an tacar sonraí seo chugainn "ualach", mar sin anEDDGrid/ Ní bheidh TableFromErddap bheith breá cothrom le dáta. Is féidir leat a íoslaghdú an fhadhb seo ag athrú an tacar sonraí foinse&lt;reloadEveryNMinutes &amp; le luach níos lú (60? 15?) ionas go mbeidh níos mó fógraí síntiús a insint donEDDGrid/TableFromErddap a chuid faisnéise a thabhairt cothrom le dáta faoin tacar sonraí foinse.

Nó, má tá a fhios ag do chóras bainistíochta sonraí nuair a bhíonn na sonraí foinse sonraí nua (e.g., trí script a chóipeanna comhad sonraí i bhfeidhm) , agus más rud é nach bhfuil sin Super minic (e.g., gach 5 nóiméad, nó níos minice) , níl réiteach níos fearr:

1. Ná húsáid&lt;updateEveryNMillis &amp; a choinneáil ar an fhoinse dataset suas chun dáta.
2. Socraigh an tacar sonraí foinse&lt;reloadEveryNMinutes &amp; le líon níos mó (1440?) .
3. An bhfuil an script i dteagmháil leis an tacar sonraí foinse[URL bratach](/docs/server-admin/additional-information#set-dataset-flag)ceart tar éis cóipeanna sé comhad sonraí nua i bhfeidhm.
Beidh sin mar thoradh ar an tacar sonraí foinse a bheith breá cothrom le dáta agus a chur faoi deara é a ghiniúint fógra síntiús, a chuirfear chuig anEDDGrid/ TableFromErddap tacar sonraí. Beidh sin mar thoradh ar anEDDGrid/ TableFromErddap tacar sonraí a bheith breá cothrom le dáta (go maith, laistigh de 5 soicind de na sonraí nua a chur leis) . Agus beidh gach a dhéanamh go héifeachtach (gan athluchtú tacar sonraí gan ghá) .

#### IlchodachERDDAPs s{#multiple-composite-erddaps} 
* I gcásanna an-mhór, nó le haghaidh caoinfhulaingt locht, b'fhéidir gur mhaith leat níos mó ná cumaisc amháin a bhunúERDDAP. Is dócha go bhfuil codanna eile den chóras (go háirithe, bandaleithead an ionaid sonraí) a bheith ina fhadhb fada roimh an ilchodachERDDAP™thiocfaidh chun bheith ina scrogaill. Mar sin, is dócha go bhfuil an réiteach a chur ar bun breise, éagsúil go geografach, ionaid sonraí (scátháin) , gach ceann acu le cumaisc amháinERDDAP™agus freastalaithe leERDDAPs agus (ar a laghad) cóipeanna scáthán de na tacair sonraí atá ar éileamh ard. Soláthraíonn thus den sórt sin caoinfhulaingt locht agus cúltaca sonraí (trí chóipeáil) . Sa chás seo, is fearr má tá an cumaiscERDDAPs bhfuil URLanna éagsúla.
    
Más mian leat go léir an ilchodachERDDAPs a bheith acu ar an URL céanna, úsáid a bhaint as córas deiridh tosaigh a shannaíonn úsáideoir ar leith go díreach ar cheann de na cumaiscERDDAPs s (bunaithe ar an seoladh IP) , ionas go dtéann gach ceann d'iarrataí an úsáideora go dtí ceann amháin den ilchodachERDDAPs. Tá dhá chúis ann:
    
    * Nuair a athluchtaítear tacar sonraí bunúsacha agus na hathruithe meiteashonraí (e.g., is cúis le comhad sonraí nua i tacar sonraí gridded an t-am athraitheachactual\\_rangetaiseachas aeir: fliuch) , an ilchodachERDDAPBeidh s a bheith go sealadach beagán as synch, ach le[Comhsheasmhacht teagmhasach](https://en.wikipedia.org/wiki/Eventual_consistency). De ghnáth, déanfaidh siad ath-sineáil laistigh de 5 soicind, ach uaireanta beidh sé níos faide. Má dhéanann úsáideoir córas uathoibrithe a bhíonn ag brath ar[ERDDAP™síntiúis](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions/index.html)go gníomhaíochtaí a spreagadh, beidh na fadhbanna sioncrónaithe gearr suntasach.
    * An cumaisc 2+ERDDAPs gach a choimeád ar bun a sraith féin síntiúis (mar gheall ar an bhfadhb synch cur síos thuas) .
    
Mar sin, ba chóir úsáideoir ar leith a chur chuig ceann amháin de na cumaiscERDDAPs a sheachaint na fadhbanna. Má tá ceann de na cumaiscERDDAPs Téann síos, is féidir leis an gcóras tosaigh atreorú goERDDAP's úsáideoirí go ceann eileERDDAP™go bhfuil suas. Mar sin féin, más fadhb acmhainne é a chruthaíonn an chéad chomhchodachERDDAP™a theipeann (úsáideoir overzealous? a[denial-de-seirbhíse ionsaí](https://en.wikipedia.org/wiki/Denial-of-service_attack)?) , déanann sé seo an-dóchúil go n-athdhíríonn a chuid úsáideoirí chuig cumaisc eileERDDAPs a chur faoi deara[teip cascading](https://en.wikipedia.org/wiki/Cascading_failure). Dá bhrí sin, is é an thus is láidre go mbeadh ilchodachERDDAPs le URLanna éagsúla.
    
Nó, b'fhéidir níos fearr, a chur ar bun il ilchodachERDDAPs gan chothromú ualach. Sa chás seo, ba chóir duit pointe a thabhairt do gach ceann de naERDDAPs ainm / féiniúlacht éagsúla agus más féidir iad a chur ar bun i gcodanna éagsúla den domhan (e.g. réigiúin éagsúla AWS) , m.sh.,ERD\\_US\\_East,ERD\\_US\\_West,ERD[EN]ERD\\_FR,ERD\\_IT, ionas go n-oibríonn úsáideoirí go comhfhiosach, arís agus arís eile le sonrachERDDAP.
    
*   \\[Le haghaidh dearadh iontach de chóras ardfheidhmíochta ag rith ar fhreastalaí amháin, féach seo[cur síos mionsonraithe ar Mailinator](https://mailinator.blogspot.com/2007/01/architecture-of-mailinator.html).\\]

### Sonraí i Éileamh an-Ard{#datasets-in-very-high-demand} 
Sa chás i ndáiríre neamhghnách go bhfuil ceann de na **Amharc ar gach eolas** , **B B B B** , nó **Caidéal C**  ERDDAPs Ní féidir a choinneáil suas leis na hiarrataí mar gheall ar bandaleithead nó teorainneacha tiomáint crua, a dhéanann sé ciall a chóipeáil na sonraí (arís eile) ar fhreastalaí eile + crua Céide ++ERDDAP, b'fhéidir le[EDDGridCóip Uaireadóirí Cóip](/docs/server-admin/datasets#eddgridcopy)agus/nó[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy). Cé go bhféadfadh sé a bheith oiriúnach go mbeadh an tacar sonraí bunaidh agus an tacar sonraí a chóipeáil le feiceáil seamlessly mar tacar sonraí amháin sa ilchodachERDDAP™, tá sé seo deacair toisc go mbeidh an dá tacar sonraí i stáit beagán difriúil ag amanna éagsúla (go háirithe, tar éis an bunaidh faigheann sonraí nua, ach sula bhfaigheann an tacar sonraí a chóipeáil a chóip) . Dá bhrí sin, molaim go dtabharfaí teidil beagán difriúil do na tacair sonraí (e.g., "... (cóip # 1) " agus "... (cóip # 2) ", nó b'fhéidir " (scáthán # *n* ) " nó " (freastalaí # *n* ) " " ") agus le feiceáil mar thacair sonraí ar leith sa ilchodachERDDAP. Úsáideoirí a úsáidtear chun liostaí de[scátháin](https://en.wikipedia.org/wiki/Website#mirror_site)ag láithreáin íoslódáil comhad tóir, mar sin níor chóir é seo iontas nó díomá orthu. Mar gheall ar theorainneacha bandaleithead ar shuíomh áirithe, d'fhéadfadh sé ciall a bhaint as an scáthán atá suite ar shuíomh eile. Má tá an chóip scáthán ag ionad sonraí éagsúla, rochtain díreach ag ilchodach an ionaid sonraí sinERDDAP™, na teidil éagsúla (e.g., "mirror #1) Ní gá.

### RAIDs i gcoinne Tiomántáin crua Rialta{#raids-versus-regular-hard-drives} 
Mura n-úsáidtear tacar mór sonraí nó grúpa tacar sonraí go mór, d'fhéadfadh sé ciall a bhaint as na sonraí a stóráil ar RAID ós rud é go dtugann sé caoinfhulaingt locht agus ós rud é nach gá duit an chumhacht próiseála nó bandaleithead freastalaí eile. Ach má tá tacar sonraí a úsáidtear go mór, d'fhéadfadh sé a dhéanamh tuiscint níos mó a chóipeáil na sonraí ar fhreastalaí eile +ERDDAP™+ tiomáint crua (cosúil le[cad a dhéanann Google](https://storagemojo.com/2007/02/19/googles-disk-failure-experience/)) seachas a úsáid freastalaí amháin agus RAID a stóráil tacar sonraí il ó gheobhaidh tú a úsáid an dá freastalaí + HardDrive +ERDDAPs sa ghreille go dtí go mainneoidh duine amháin acu.

### Teipeanna{#failures} 
Cad a tharlaíonn má...

* Tá pléasctha na n-iarratas ar aon tacar sonraí (e.g., gach mac léinn i rang a iarraidh go comhuaineach sonraí den chineál céanna) ?
Ach anERDDAP™ag freastal go mbeidh tacar sonraí a bheith faoi léigear agus mall síos nó iarrataí a dhiúltú. An cumaiscERDDAP™agus eileERDDAPs Ní bheidh tionchar. Ós rud é go bhfuil an fachtóir teorannú le haghaidh tacar sonraí áirithe laistigh den chóras an feachtas crua leis na sonraí (taiseachas aeir: fliuchERDDAP) , an t-aon réiteach (gan a bheith láithreach) is a dhéanamh cóip den tacar sonraí ar fhreastalaí éagsúla + crua-Drive +ERDDAP.
* An bhfuil **Amharc ar gach eolas** , **B B B B** , nó **Caidéal C**  ERDDAP™go mainneoidh (e.g., teip tiomáint crua) ?
Níl ach an tacar sonraí (s s) a sheirbheáil ar anERDDAP™Tá tionchar. Má tá an tacar sonraí (s s) Tá scáthán ar fhreastalaí eile + crua-Drive +ERDDAP, is é an éifeacht íosta. Má tá an fhadhb teip tiomáint crua i leibhéal 5 nó 6 RAID, tú in ionad ach an tiomáint agus tá an RAID atógáil na sonraí ar an tiomáint.
* An ilchodachERDDAP™go mainneoidh?
Más mian leat córas a dhéanamh leis an-[infhaighteacht ard](https://en.wikipedia.org/wiki/High_availability), is féidir leat a chur ar bun[ilchodach ilERDDAPs s (mar a pléadh thuas) ](#multiple-composite-erddaps), ag baint úsáide as rud éigin cosúil[NGINX](https://www.nginx.com/)nó[Seirbhís do Chustaiméirí](https://traefik.io/)a láimhseáil cothromú ualach. Tabhair faoi deara go bhfuil cumaisc ar leithERDDAP™Is féidir a láimhseáil líon an-mhór na n-iarratas ó líon mór na n-úsáideoirí mar gheall ar
Tá iarrataí ar mheiteashonraí beag agus láimhseáiltear iad le faisnéis atá i gcuimhne, agus
iarrataí ar shonraí (a d'fhéadfadh a bheith mór) atreorú chuig an leanbhERDDAPs.

### Simplí, Inscálaithe{#simple-scalable} 
Tá an córas seo éasca a chur ar bun agus a riaradh, agus go héasca extensible nuair a thiocfaidh aon chuid de ró-burdened. Is iad na teorainneacha fíor ach amháin le haghaidh ionad sonraí ar leith bandaleithead an ionaid sonraí agus costas an chórais.

### Bandaleithead{#bandwidth} 
Tabhair faoi deara an bandaleithead neas de chomhpháirteanna a úsáidtear go coitianta ar an gcóras:

|Comhpháirtithe|Déan teagmháil Linn (GBytes / s)  |
|--|--|
|cuimhne DDR|2.5 2.5|
|tiomáint SSD|1 1|
|tiomáint crua SATA|0.3|
|Gluaisteán Ethernet|0.1 .|
|OC-12|0.06|
|OC-3|Seirbhís do Chustaiméirí|
|T1|0.0002|

  
Mar sin, ceann tiomáint crua SATA (0.3GB / s) ar fhreastalaí amháin le ceannERDDAP™Is féidir le sáithiú dócha LAN Ethernet Gigabit (0.1GB / S) . Agus ceann Gigabit Ethernet LAN (0.1GB / S) Is féidir sáithiú dócha nasc Idirlín OC-12 (0.06GB / s) . Agus ar a laghad liostaí foinse amháin OC-12 línte costas thart ar $ 100,000 in aghaidh na míosa. (Sea, tá na ríomhanna seo bunaithe ar an gcóras a bhrú chuig a theorainneacha, nach bhfuil go maith toisc go dtagann sé le freagraí sluggish an-. Ach tá na ríomhanna seo úsáideach le haghaidh pleanála agus le haghaidh codanna den chóras a chothromú.)   **Is léir, nasc Idirlín go tapa oiriúnach do d'ionad sonraí le fada an chuid is costasaí den chóras.** Is féidir leat a thógáil go héasca agus go réasúnta saor greille le freastalaithe dosaen ag rith dosaenERDDAPs atá in ann caidéalaithe amach go leor de na sonraí go tapa, ach beidh nasc Idirlín go tapa oiriúnach a bheith an-, an-daor. Is iad na réitigh pháirteacha:

* cliaint a spreagadh chun fo-thacar de na sonraí a iarraidh má tá sé sin go léir atá ag teastáil. Más gá don chliant ach sonraí do réigiún beag nó ar réiteach níos ísle, is é sin an méid ba chóir dóibh a iarraidh. Is fócas lárnach de na prótacail é an solátharERDDAP™tacaíochtaí chun sonraí a iarraidh.
* Spreagadh tarchur sonraí comhbhrúite.ERDDAP™ [comhbhrúiteoirí](https://coastwatch.pfeg.noaa.gov/erddap/information.html#compression)tarchur sonraí má fhaigheann sé "glacadh-chódú" saHTTP GETheader iarraidh. Gach brabhsálaithe gréasáin a úsáid "glacadh-chódú" agus go huathoibríoch decompress an freagra. Cliaint eile (e.g., cláir ríomhaireachta) ní mór é a úsáid go sainráite.
* Colocate do freastalaithe ag suíomh ISP nó eile a thairgeann costais bandaleithead réasúnta níos saoire.
* Disperse na freastalaithe leis naERDDAPs le hinstitiúidí éagsúla ionas go mbeidh na costais scaipthe. Is féidir leat nasc ansin do ilchodachERDDAP™a n-ERDDAPs.

Tabhair faoi deara go[Cloud Ríomhaireacht](#cloud-computing)agus seirbhísí óstáil gréasáin a thairiscint go léir an bandaleithead Idirlín is gá duit, ach nach bhfuil an fhadhb praghas a réiteach.

Le haghaidh faisnéise ginearálta maidir le córais inscálaithe, cumas ard, locht-fhulangacha a dhearadh, féach leabhar Michael T. Nygard[Is maith liom é](https://www.amazon.com/Release-Production-Ready-Software-Pragmatic-Programmers/dp/0978739213).

### Féachaint ar Fholúntais{#like-legos} 
Dearthóirí bogearraí iarracht go minic a úsáid maith[patrúin dearadh bogearraí](https://en.wikipedia.org/wiki/Software_design_pattern)chun fadhbanna a réiteach. Tá patrúin Dea maith toisc go encapsulate siad go maith, éasca a chruthú agus a bheith ag obair le, réitigh ginearálta-críche mar thoradh ar chórais le hairíonna maith. Ní ainmneacha Patrún caighdeánaithe, mar sin beidh mé ag glaoch ar an patrún goERDDAP™Úsáideann an Patrún Lego. Gach Lego (gach ceannERDDAP) Is simplí, beag, caighdeán, seasamh-aon, bríce (data recovery service) le comhéadan sainithe a ligeann dó a bheith nasctha le le legos eile (ERDDAPs s) . Na codanna deERDDAP™go bhfuil a dhéanamh suas an córas seo: an síntiús agus córais flagURL (a cheadaíonn cumarsáid idirERDDAPs s) , an EDD... Córas atreorú FromErddap, agus an córasRESTfuliarrataí ar shonraí is féidir le húsáideoirí nó le húsáideoirí eile a ghiniúintERDDAPs. Dá bhrí sin, tugadh dhá legos nó níos mó (ERDDAPs s) , is féidir leat a chruthú líon mór de cruthanna éagsúla (topologies líonraERDDAPs s) . Cinnte, dearadh agus gnéitheERDDAP™D'fhéadfadh a bheith déanta difriúil, ní Lego-mhaith, b'fhéidir ach a chumasú agus a bharrfheabhsú do topology amháin ar leith. Ach is dóigh linn goERDDAP's Tugann dearadh cosúil le Lego réiteach maith, ginearálta a chuireann ar chumas aonERDDAP™internet marketing (nó grúpa riarthóirí) a chruthú gach cineál na topologies cónaidhme éagsúla. Mar shampla, d'fhéadfadh eagraíocht amháin a chur ar bun trí (nó níos mó)  ERDDAPs mar a thaispeántar sa[ERDDAP™Grid / Colster Léaráid thuas](#recommendations). Nó grúpa a dháileadh (IOOS? Féach ar an bpróifíl NCEI? NWS?NOAA? USGS? Sonraí a fháil? NEON? LTER? OOI? BODC? ARC? JRC? WMO?) Is féidir a chur ar bun amháinERDDAP™cineál gas in airde (ionas gur féidir leis na sonraí fanacht gar don fhoinse) agus ansin a chur ar bun ilchodachERDDAP™san oifig lárnach le tacair shonraí fíorúil (a bhfuil i gcónaí breá cothrom le dáta) cineál gas: in airdeERDDAPs. Go deimhin, gach ceann de naERDDAPs, suiteáilte ag institiúidí éagsúla ar fud an domhain, a fháil sonraí ó eileERDDAPs agus/nó sonraí a sholáthar do dhuine eileERDDAPs, foirm líonra ollmhór deERDDAPs. Cé chomh fionnuar é sin?&#33; Mar sin, mar atá le Lego, tá na féidearthachtaí endless. Sin an fáth go bhfuil sé seo le patrún maith. Sin an fáth go bhfuil sé seo le dearadh maith doERDDAP.

### Cineálacha éagsúla Iarratas{#different-types-of-requests} 
Is é ceann de na deacrachtaí fíor-saoil an plé seo de topologies freastalaí sonraí go bhfuil cineálacha éagsúla na n-iarratas agus bealaí éagsúla a bharrfheabhsú do na cineálacha éagsúla na n-iarratas. Níl an Tweet seo ar fáil (Cé chomh tapa is féidir leis anERDDAP™leis na sonraí freagra a thabhairt ar an iarraidh ar shonraí?) ón bplé topology (a dhéileálann leis na caidrimh idir freastalaithe sonraí agus a bhfuil freastalaí na sonraí iarbhír) .ERDDAP™, ar ndóigh, iarracht chun déileáil le gach cineál na n-iarratas go héifeachtach, ach Láimhseálann roinnt níos fearr ná daoine eile.

* Tá go leor iarrataí simplí.
Mar shampla: Cad é an meiteashonraí don tacar sonraí seo? Nó: Cad iad na luachanna an ghné ama don tacar sonraí gridded?ERDDAP™tá sé deartha chun iad seo a láimhseáil chomh tapa agus is féidir (de ghnáth i&lt;= 2 ms) ag coinneáil an fhaisnéis seo i gcuimhne.
     
* Tá roinnt iarrataí measartha deacair.
Mar shampla: Tabhair dom an fo-thacar de tacar sonraí (atá i gcomhad sonraí amháin) . Is féidir na hiarratais a láimhseáil sách tapa toisc nach bhfuil siad go deacair.
     
* Tá roinnt iarrataí crua agus dá bhrí sin tá am Tógann.
Mar shampla: Tabhair dom an fo-thacar de tacar sonraí (a d'fhéadfadh a bheith in aon cheann de na 10,000+ comhaid sonraí, nó a d'fhéadfadh a bheith ó chomhbhrúite comhaid sonraí go gach ghlacadh 10 soicind a decompress) .ERDDAP™v2.0 tugadh isteach roinnt bealaí nua, níos tapúla chun déileáil leis na hiarrataí seo, go háirithe trí chead a thabhairt don snáithe iarratais a láimhseáil le snáitheanna oibrithe éagsúla a théann i ngleic le fo-iarsmaí éagsúla na hiarrata. Ach tá cur chuige eile ar an bhfadhb aERDDAP™Ní thacaíonn go fóill: d'fhéadfaí fo-thacar de na comhaid sonraí le haghaidh tacar sonraí áirithe a stóráil agus a anailísiú ar ríomhairí ar leith, agus ansin na torthaí le chéile ar an bhfreastalaí bunaidh. Tá an cur chuige ar a dtugtar[Plean Gníomhaíochta don Oideachas](https://en.wikipedia.org/wiki/MapReduce)agus eiseamláireach[Bhí an t-eolas úsáideach](https://en.wikipedia.org/wiki/Apache_Hadoop), an chéad (?) clár MapReduce foinse oscailte, a bhí bunaithe ar smaointe ó pháipéar Google. (Más gá duit MapReduc inERDDAP, cuir iarratas ríomhphoist chuigerd.data at noaa.gov.) Google's[An tSraith Shinsearach](https://cloud.google.com/bigquery/)Tá suimiúil mar is cosúil go bhfuil sé i bhfeidhm ar MapReduce i bhfeidhm ar thacair sonraí tabular fo-thacarála, atá ar cheann de naERDDAP's príomhchuspóirí. Is dócha gur féidir leat a chruthúERDDAP™tacar sonraí ó tacar sonraí BigQuery trí[EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)mar is féidir BigQuery a rochtain trí comhéadan JDBC.

### Is iad seo mo thuairimí.{#these-are-my-opinions} 

Sea, tá na ríomhanna simplí (agus anois dáta beagán) , ach is dóigh liom go bhfuil na conclúidí ceart. An raibh mé ag úsáid loighic lochtach nó a dhéanamh botún i mo ríomhaireachtaí? Más amhlaidh, tá an locht mianach ina n-aonar. Seol ríomhphost leis an gceartú chuigerd dot data at noaa dot gov.

- - - - - -

## [ **Cloud Ríomhaireacht** ](#cloud-computing) {#cloud-computing} 

Roinnt cuideachtaí a thairiscint seirbhísí ríomhaireachta scamall (e.g.,[Seirbhísí Gréasáin Amazon](https://aws.amazon.com/)agus[Ardán Google Cloud](https://cloud.google.com/)) .[Cuideachtaí óstáil Gréasáin](https://en.wikipedia.org/wiki/Web_hosting_service)tar éis seirbhísí níos simplí a thairiscint ó lár na 1990í, ach tá solúbthacht na gcóras agus raon na seirbhísí a thairgtear leathnaithe go mór ag na seirbhísí "cloud". Ó shin i leithERDDAP™greille ach comhdhéanta deERDDAPs agus ó shinERDDAPs iadJavaiarratais gréasáin is féidir a reáchtáil i Tomcat (an freastalaí iarratais is coitianta) nó freastalaithe iarratais eile, ba chóir go mbeadh sé sách éasca a chur ar bunERDDAP™greille ar sheirbhís scamall nó láithreán gréasáin a óstáil. Is iad na buntáistí a bhaineann leis na seirbhísí seo:

* Tugann siad rochtain ar naisc Idirlín bandaleithead an-ard. D'fhéadfadh sé seo ina n-aonar údar ag baint úsáide as na seirbhísí.
* Ní ghearrann siad ach na seirbhísí a úsáideann tú. Mar shampla, gheobhaidh tú rochtain ar nasc Idirlín bandaleithead an-ard, ach ní íocann tú ach le haghaidh sonraí iarbhír a aistrítear. Ligeann tú a thógáil córas a fhaigheann annamh léigear (fiú ag éileamh buaic) , gan a bheith a íoc as cumas a úsáidtear annamh.
* Tá siad go héasca extensible. Is féidir leat cineálacha freastalaí a athrú nó a chur le freastalaithe go leor nó stóráil oiread agus is mian leat, i níos lú ná nóiméad. D'fhéadfadh sé seo ina n-aonar údar ag baint úsáide as na seirbhísí.
* Tá siad saor in aisce tú ó go leor de na dualgais riaracháin a reáchtáil na freastalaithe agus líonraí. D'fhéadfadh sé seo ina n-aonar údar ag baint úsáide as na seirbhísí.

Is iad na míbhuntáistí a bhaineann leis na seirbhísí seo:

* Gearrann siad as a gcuid seirbhísí, uaireanta go leor (i ndearbhthéarmaí; nach bhfuil sé luach maith) . Tá na praghsanna atá liostaithe anseo le haghaidh[Amazon EC2](https://aws.amazon.com/ec2/pricing). Na praghsanna seo (as Meitheamh 2015) Beidh teacht síos.
San am atá caite, bhí praghsanna níos airde, ach bhí comhaid sonraí agus líon na n-iarratas níos lú.
Sa todhchaí, beidh praghsanna níos ísle, ach beidh comhaid sonraí agus líon na n-iarratas níos mó.
Mar sin, athraíonn na sonraí, ach fanann an staid réasúnta tairiseach.
Agus nach bhfuil sé go bhfuil an tseirbhís overpriced, tá sé go bhfuil muid ag baint úsáide as agus a cheannach a lán de na seirbhíse.
    * Aistriú Sonraí – Tá aistrithe sonraí isteach sa chóras saor in aisce anois (Yea&#33;) .
Tá aistrithe sonraí as an gcóras $0.09/GB.
One tiomáint crua SATA (0.3GB / s) ar fhreastalaí amháin le ceannERDDAP™Is féidir le sáithiú dócha LAN Ethernet Gigabit (0.1GB / S) .
One Gigabit Ethernet LAN (0.1GB / S) Is féidir sáithiú dócha nasc Idirlín OC-12 (0.06GB / s) .
Más féidir le nasc OC-12 amháin a tharchur ~ 150,000 GB / mí, d'fhéadfadh na costais Aistriú Sonraí a bheith an oiread agus is 150,000 GB @ $0.09/GB = $ 13,500/mí, a bhfuil costas suntasach. Go soiléir, má tá dosaen ag obair go cruaERDDAPs ar sheirbhís scamall, d'fhéadfadh do tháillí míosúil Aistriú Sonraí a bheith suntasach (suas go dtí $ 162,000 / mí) . (Arís, nach bhfuil sé go bhfuil an tseirbhís overpriced, tá sé go bhfuil muid ag baint úsáide as agus a cheannach a lán de na seirbhíse.) 
    * Stóráil sonraí - muirir Amazon $50 / mí in aghaidh an TB. (Déan comparáid idir go bhfuil a cheannach 4TB tiomáint fiontair thar barr amach do ~ $ 50 / TB, cé go bhfuil an RAID chun é a chur i agus costais riaracháin a chur leis an costas iomlán.) Mar sin, más gá duit a stóráil go leor de na sonraí sa scamall, d'fhéadfadh sé a bheith go cothrom costasach (e.g., bheadh 100TB costas $ 5000/mí) . Ach mura bhfuil mórán sonraí agat, is saincheist níos lú é seo ná na costais aistrithe bandaleithead/sonraí. (Arís, nach bhfuil sé go bhfuil an tseirbhís overpriced, tá sé go bhfuil muid ag baint úsáide as agus a cheannach a lán de na seirbhíse.)   
         
### Fóirdheontas{#subsetting} 
* An fhadhb fo-thacarála: Is é an t-aon bhealach chun sonraí a dháileadh go héifeachtach ó chomhaid sonraí go bhfuil an clár atá ag dáileadh na sonraí (e.g.,ERDDAP) ag rith ar fhreastalaí a bhfuil na sonraí a stóráil ar tiomáint crua áitiúil (nó rochtain chomh tapa ar SAN nó RAID áitiúil) . Ceadaíonn córais comhad áitiúilERDDAP™  (agus leabharlanna bunúsacha, mar shampla netcdf-java) a iarraidh raonta beart ar leith ó na comhaid agus freagraí a fháil go han-tapa. Go leor cineálacha na n-iarratas sonraí óERDDAP™go dtí an comhad (go háirithe iarrataí ar shonraí greilleáilte i gcás ina bhfuil an luach stride × 1 1) Ní féidir a dhéanamh go héifeachtach má tá an clár a iarraidh ar an comhad ar fad nó smután mór de comhad ó neamh-áitiúil (mar sin níos moille) córas stórála sonraí agus ansin sliocht fo-thacar. Más rud é nach bhfuil an thus scamall a thabhairtERDDAP™rochtain tapa ar raonta de na comhaid (chomh tapa agus is le comhaid áitiúla) ,ERDDAP's Beidh rochtain ar na sonraí a bheith ina scrogaill dian agus negate sochair eile a bhaineann le úsáid a bhaint as seirbhís scamall.

### Sonraí óstáil{#hosted-data} 
Rogha eile ar an anailís costais thuas sochar (atá bunaithe ar an úinéir sonraí (e.g.,NOAA) ag íoc as a gcuid sonraí a stóráil sa scamall) tháinig thart ar 2012, nuair Amazon (agus go pointe níos lú, roinnt soláthraithe scamall eile) thosaigh óstáil roinnt tacar sonraí ina scamall (S3 SWS) saor in aisce (go mór leis an dóchas go bhféadfadh siad a gcuid costas a ghnóthú dá mbeadh úsáideoirí cíos AWS EC2 cásanna ríomh a bheith ag obair leis na sonraí sin) . Clearly, a dhéanann sé seo scamall ríomhaireachta massively níos éifeachtaí ó thaobh costais, mar gheall ar an am agus costas suas a uaslódáil na sonraí agus a óstáil go bhfuil sé anois náid. LeERDDAP™v2.0, tá gnéithe nua a éascú ag rithERDDAPi scamall:

* Anois, aEDDGridIs féidir FromFiles nó EDDTableFromFiles tacar sonraí a chruthú ó chomhaid sonraí atá iargúlta agus inrochtana tríd an idirlíon (m.sh., buicéid S3 AWS) trí úsáid a bhaint as&lt;taisceFromUrl &amp; &amp; rsquo; agus&lt;taise GB &amp; roghanna.ERDDAP™Beidh a choimeád ar bun taisce áitiúil de na comhaid sonraí is déanaí a úsáidtear.
* Anois, má tá aon EDDTableFromFiles comhaid foinse comhbhrúite (e.g.,.tgz) ,ERDDAP™Beidh decompress go huathoibríoch iad nuair a léann sé iad.
* Anois, anERDDAP™Beidh snáithe ag freagairt d'iarraidh áirithe snáitheanna oibrithe sceite chun oibriú ar fho-ailt den iarraidh má úsáideann tú an&lt;nTríodar &amp; roghanna. Ba chóir go dtabharfadh an parallelization seo freagraí níos tapúla ar iarrataí deacra.

Réitíonn na hathruithe seo an fhadhb atá ag AWS S3 gan stóráil comhad áitiúil, bloc-leibhéal a thairiscint agus an (Sean agus óg) fadhb rochtana ar shonraí S3 a bhfuil lag suntasach. (Bliain ó shin (~ 2014) , bhí an lag suntasach, ach tá sé i bhfad níos giorra anois agus mar sin ní chomh suntasach.) Gach i ngach, ciallaíonn sé sin a chur ar bunERDDAP™sna hoibreacha scamall i bhfad níos fearr anois.

 **Go raibh maith agat** - Go leor a bhuíochas do Matthew Arrott agus a ghrúpa san iarracht OOI bunaidh as a gcuid oibre ar churERDDAP™sa scamall agus na díospóireachtaí mar thoradh air.
 

- - - - - -

## [Athbheochan cianda Datasets](#remote-replication-of-datasets) {#remote-replication-of-datasets} 

Tá fadhb choitianta a bhaineann leis an bplé thuas ar eangacha agus cónaidhmeannaERDDAPs: athbheochan iargúlta tacar sonraí. Is é an fhadhb bhunúsach ná: coinníonn soláthraí sonraí tacar sonraí a athraíonn ó am go chéile agus is mian le húsáideoir cóip áitiúil cothrom le dáta den tacar sonraí seo a choimeád ar bun (ar aon cheann de na cúiseanna éagsúla) . Go soiléir, tá líon mór na n-athruithe seo. Tá roinnt athruithe i bhfad níos deacra chun déileáil le ná daoine eile.

* Nuacht agus Imeachtaí
Tá sé níos deacra a choinneáil ar an tacar sonraí áitiúil cothrom le dáta *láithreach*   (m.sh., laistigh de 3 soicind) tar éis gach athrú ar an fhoinse, seachas, mar shampla, laistigh de chúpla uair an chloig.
     
* Amharc ar gach eolas
Tá athruithe minice níos deacra chun déileáil le ná athruithe neamhchoitianta. Mar shampla, tá athruithe aon-a-lá i bhfad níos éasca chun déileáil le ná athruithe gach 0.1 dara.
     
* Athruithe Beaga
Tá athruithe beaga ar chomhad foinse níos deacra chun déileáil le ná comhad go hiomlán nua. Tá sé seo fíor go háirithe má d'fhéadfadh na hathruithe beaga a bheith in áit ar bith sa chomhad. Tá athruithe beaga níos deacra a bhrath agus é a dhéanamh deacair a leithlisiú na sonraí gur gá a mhacasamhlú. Tá comhaid nua éasca a bhrath agus éifeachtach a aistriú.
     
* Eintire Dataset
Tá a choinneáil ar tacar sonraí ar fad suas chun dáta níos deacra ná a chothabháil ach sonraí le déanaí. Roinnt úsáideoirí gá ach sonraí le déanaí (e.g., fiú an 8 lá deireanach) .
     
* irl - Library Service
Tá cóipeanna iargúlta il a choinneáil ag láithreáin éagsúla níos deacra ná cóip iargúlta amháin a choinneáil. Is é seo an fhadhb scálú.
     

Is léir go bhfuil líon mór na n-athruithe cineálacha féideartha na n-athruithe ar an tacar sonraí foinse agus riachtanais agus ionchais an úsáideora. Tá go leor de na hathruithe an-deacair a réiteach. Is minic nach bhfuil an réiteach is fearr le haghaidh staid amháin an réiteach is fearr le haghaidh staid eile - níl réiteach iontach uilíoch fós ann.

### [ **irl - Library ServiceERDDAP™Uirlisí** ](#relevant-erddap-tools) {#relevant-erddap-tools} 

ERDDAP™Cuireann roinnt uirlisí ar fáil ar féidir iad a úsáid mar chuid de chóras a fhéachann le cóip iargúlta de thacar sonraí a choinneáil:

*   ERDDAP's[RSS  (Saibhir Suíomh Achoimre?) service service service](https://en.wikipedia.org/wiki/RSS)  
Cuireann ar bhealach tapa a sheiceáil má tacar sonraí ar iargúltaERDDAP™Tá athrú.
     
*   ERDDAP's[free service](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)  
Is níos éifeachtaí (seachasRSS) cur chuige: seolfaidh sé ríomhphost láithreach nó déan teagmháil le URL chuig gach suibscríobhaí aon uair a dhéantar an tacar sonraí a nuashonrú agus tháinig athrú ar an nuashonrú. Tá sé éifeachtach sa mhéid is go dtarlaíonn sé ASAP agus níl aon iarracht dramhaíola ann (mar atá le vótáilRSSservice service service) . Is féidir le húsáideoirí uirlisí eile a úsáid (maith liom[irl - Library Service](https://ifttt.com/)) chun freagairt do na fógraí ríomhphoist ón gcóras síntiús. Mar shampla, d'fhéadfadh úsáideoir síntiús a íoc le tacar sonraí ar iargúltaERDDAP™agus úsáid IFTTT chun freagairt do na fógraí ríomhphoist síntiús agus tús a chur leis an tacar sonraí áitiúil a thabhairt cothrom le dáta.
     
*   ERDDAP's[córas bratach](/docs/server-admin/additional-information#flag)  
Soláthraíonn ar bhealach doERDDAP™riarthóir a insint tacar sonraí ar a / aERDDAPa athlódáil ASAP. Is féidir an fhoirm URL bratach a úsáid go héasca i scripteanna. Is féidir an fhoirm URL bratach a úsáid freisin mar an gníomh le haghaidh síntiús.
     
*   ERDDAP's["files"córas córas](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)  
Is féidir rochtain a thairiscint ar na comhaid foinse le haghaidh tacar sonraí ar leith, lena n-áirítear liosta eolaire Apache-stíl de na comhaid (a "Fillteán Inláimhsithe") a bhfuil gach comhad a íoslódáil URL, am seo caite mhodhnú, agus méid. 1 fhreagra amháin 0 d’atweetálacha 2 chroí"files"Is córas go bhféadfadh na comhaid foinse a bheith ainmneacha athraitheacha éagsúla agus meiteashonraí éagsúla ná an tacar sonraí mar is cosúil iERDDAP. Má iargúltaERDDAP™Cuireann tacar sonraí rochtain ar a chuid comhad foinse, a osclaíonn suas an fhéidearthacht leagan droch-fear de rsync: éiríonn sé éasca do chóras áitiúil a fheiceáil a bhfuil comhaid iargúlta athrú agus is gá a íoslódáil. (Féach an[Rogha taisceóm](#cache-from-url)thíos ar féidir leo úsáid a bhaint as seo.)   
     

### [Amharc ar gach eolas](#solutions) {#solutions} 

Cé go bhfuil líon mór na n-athruithe ar an bhfadhb agus líon gan teorainn na réitigh is féidir, tá ach dornán de cur chuige bunúsach chun réitigh:

#### Custom, Brute Force Solutions{#custom-brute-force-solutions} 
Is réiteach soiléir a handcraft réiteach saincheaptha, atá optamaithe dá bhrí sin le haghaidh staid ar leith: córas a bhrath / a aithint a bhfuil sonraí a athrú, agus cuireann an t-eolas sin chuig an úsáideoir ionas gur féidir leis an úsáideoir a iarraidh ar na sonraí a athrú. Bhuel, is féidir leat é seo a dhéanamh, ach tá míbhuntáistí ann:

* Tá réitigh saincheaptha a lán oibre.
* De ghnáth, déantar réitigh Saincheaptha a oiriúnú do tacar sonraí áirithe agus córas úsáideora a thabhairt nach féidir iad a athúsáid go héasca.
* Ní mór réitigh saincheaptha a thógáil agus a chothabháil ag tú. (Sin riamh smaoineamh maith. Tá sé i gcónaí smaoineamh maith a sheachaint ag obair agus duine éigin eile a fháil chun an obair a dhéanamh&#33;) 

Dímholadh mé ag cur an cur chuige toisc go bhfuil sé beagnach i gcónaí níos fearr chun breathnú ar réitigh ginearálta, tógtha agus a chothabháil ag duine eile, is féidir a athúsáid go héasca i gcásanna éagsúla.
     
#### rsync{#rsync} 
[rsync](https://en.wikipedia.org/wiki/Rsync)Is é an atá ann cheana féin, néal maith, réiteach cuspóir ginearálta a choimeád bailiúchán de chomhaid ar ríomhaire foinse i sync ar ríomhaire iargúlta úsáideora. Is é an bealach a oibríonn sé:

1. roinnt imeachtaí (e.g.,ERDDAP™imeacht córais síntiús) triggers reáchtáil rsync,
     (nó, Ritheann post cron rsync ag amanna sonracha ó lá go lá ar ríomhaire an úsáideora) 
2. a teagmhálacha rsync ar an ríomhaire foinse,
3. a ríomhann sraith de hashes le haghaidh smután de gach comhad agus a tharchuireann na hashes chuig an úsáideora rsync,
4. a chuireann an fhaisnéis sin i gcomparáid leis an bhfaisnéis chéanna le haghaidh chóip an úsáideora de na comhaid,
5. a iarrann ansin na smutáin de chomhaid a d'athraigh.

    
Ag smaoineamh go léir a dhéanann sé, oibríonn rsync go han-tapa (e.g., 10 soicind móide am aistrithe sonraí) agus an-éifeachtach. Tá[athruithe ar rsync](https://en.wikipedia.org/wiki/Rsync#Variations)a Optamaigh le haghaidh cásanna éagsúla (e.g., trí réamhríomh agus caching an hashes na smután de gach comhad foinse) .

Is iad na laigí is mó de rsync: a thógann sé roinnt iarracht a chur ar bun (security guards) ; tá roinnt saincheisteanna scálú; agus nach bhfuil sé go maith chun a choimeád tacair sonraí NRT i ndáiríre suas go dtí dáta (e.g., tá sé awkward a úsáid rsync níos mó ná thart ar gach 5 nóiméad) . Más féidir leat déileáil leis na laigí, nó más rud é nach bhfuil siad difear do staid, Is rsync réiteach den scoth, cuspóir ginearálta gur féidir le duine ar bith a úsáid ceart anois a réiteach go leor cásanna a bhaineann le deacrachtaí iargúlta de datasets.

Tá mír ar anERDDAP™Chun liosta a dhéanamh chun iarracht a dhéanamh tacaíocht a chur le haghaidh seirbhísí rsync chunERDDAP  (is dócha tasc deas deacair) , ionas gur féidir le haon chliant a úsáid rsync (nó malairt) cóip cothrom le dáta de thacar sonraí a choimeád. Más mian le duine ar bith a bheith ag obair ar an, le do thoil ríomhphosterd.data at noaa.gov.

Tá cláir eile a dhéanann níos mó nó níos lú cad a dhéanann rsync, uaireanta dírithe ar athbheochan tacar sonraí (Cé go minic ag leibhéal comhaid) , m.sh.,Unidata's[IDD](https://www.unidata.ucar.edu/projects/index.html#idd).
    
#### Cache Ó Urláir{#cache-from-url} 
[An taisceFromUrl](/docs/server-admin/datasets#cachefromurl)Tá leagan ar fáil (ag tosú leERDDAP™v2.0) do gach ceannERDDAP's cineálacha tacar sonraí a dhéanann tacair sonraí ó chomhaid (go bunúsach, gach fo-aicmí de[EDDGridSeirbhís do Chustaiméirí](/docs/server-admin/datasets#eddgridfromfiles)agus[EDDTableFromFiles](/docs/server-admin/datasets#eddtablefromfiles)) . taisce taisce taisce Déanann FromUrl sé fánach a íoslódáil go huathoibríoch agus a chothabháil na comhaid sonraí áitiúla trí chóipeáil iad ó fhoinse iargúlta tríd an taisce Leagan FromUrl. Is féidir leis na comhaid iargúlta a bheith i Fillteán Inrochtaine Gréasáin nó liosta comhad eolaire-mhaith ar fáil ag THREDDS,Hyrax, buicéad S3, nóERDDAP's"files"córas.
    
Má tá an fhoinse na comhaid iargúlta iargúlta iargúltaERDDAP™tacar sonraí a thairgeann na comhaid foinse tríd anERDDAP™ "files"córas, ansin is féidir leat[síntiús a íoc](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)leis an tacar sonraí iargúlta, agus bain úsáid as an[URL bratach](/docs/server-admin/additional-information#flag)do do tacar sonraí áitiúil mar an gníomh don síntiús. Ansin, aon uair a athraíonn an tacar sonraí iargúlta, beidh sé i dteagmháil leis an URL bratach do do tacar sonraí, a insint dó a athlódáil ASAP, a bhrath agus a íoslódáil na comhaid sonraí iargúlta athraithe. Gach seo a tharlaíonn go han-tapa (de ghnáth ~ 5 soicind móide an t-am is gá a íoslódáil na comhaid athraithe) . Oibríonn an cur chuige seo iontach má tá na hathruithe tacar sonraí foinse comhaid nua á chur leis go tréimhsiúil agus nuair a na comhaid atá ann cheana riamh athrú. Ní dhéanann an cur chuige seo ag obair go maith má tá sonraí a ghabhann go minic le gach (nó níos mó) de na comhaid sonraí foinse atá ann cheana féin, toisc go bhfuil do tacar sonraí áitiúil a íoslódáil go minic ar an tacar sonraí iargúlta ar fad. (Tá sé seo nuair is gá cur chuige rsync-mhaith.) 
    
#### Amharc ar gach eolas{#archiveadataset} 
ERDDAP™'s[Amharc ar gach eolas](/docs/server-admin/additional-information#archiveadataset)Is réiteach maith nuair a sonraí a chur le tacar sonraí go minic, ach tá sonraí níos sine riamh athrú. Go bunúsach,ERDDAP™Is féidir le riarthóir reáchtáil ArchiveADataset (b'fhéidir i script, b'fhéidir reáchtáil ag cron) agus a shonrú fo-thacar de tacar sonraí gur mian leo a bhaint (b'fhéidir i gcomhaid il) agus pacáiste i.zipnó.tgzcomhad, ionas gur féidir leat an comhad a sheoladh chuig daoine nó grúpaí leasmhara (e.g., NCEI chun cartlannú) nó é a chur ar fáil le híoslódáil. Mar shampla, d'fhéadfá a reáchtáil ArchiveADataset ó lá go lá ag 12:10 am agus tá sé a dhéanamh.zipde na sonraí ó 12:00 Tá an lá roimhe sin go dtí 12:00 Tá lá atá inniu ann. (Nó, seo a dhéanamh go seachtainiúil, go míosúil, nó go bliantúil, de réir mar is gá.) Ós rud é go bhfuil an comhad pacáistithe a ghintear as líne, níl aon chontúirt ann de chuid amout nó sonraí i bhfad ró, mar go mbeadh caighdeán annERDDAP™a iarraidh.
     
#### ERDDAP™'s córas iarrata caighdeánach{#erddaps-standard-request-system} 
ERDDAP™'Is réiteach maith eile é córas iarratais caighdeánach nuair a chuirtear sonraí le tacar sonraí go minic, ach ní athraíonn sonraí níos sine. Go bunúsach, is féidir le duine ar bith iarratais chaighdeánacha a úsáid chun sonraí a fháil le haghaidh réimse sonrach ama. Mar shampla, ag 12:10 ar lá go lá, d'fhéadfaí tú a dhéanamh ar iarratas do gach ceann de na sonraí ó tacar sonraí iargúlta ó 12:00 ar an lá roimhe sin go dtí go bhfuil lá atá inniu ann. An teorainn (i gcomparáid leis an gcur chuige ArchiveADataset) Is é an riosca de timeout nó a bheith ann sonraí i bhfad ró le haghaidh comhad amháin. Is féidir leat an teorainn a sheachaint trí iarratais níos minice a dhéanamh ar feadh tréimhsí ama níos lú.
     
#### Féachaint ar Fholúntais{#eddtablefromhttpget} 
\\[Níl an rogha seo ann go fóill, ach is cosúil gur féidir a thógáil go luath amach anseo.\\]  
An nua[Féachaint ar Fholúntais](/docs/server-admin/datasets#eddtablefromhttpget)cineál tacar sonraí iERDDAP™v2.0 dhéanann sé indéanta a envision réiteach eile. Is iad na comhaid bhunúsacha a chothabháil ag an gcineál seo tacar sonraí go bunúsach comhaid a thaifeadadh athruithe ar an tacar sonraí. Ba cheart go bhféadfaí córas a thógáil a choinníonn tacar sonraí áitiúil go tréimhsiúil (nó bunaithe ar truicir) iarraidh ar gach ceann de na hathruithe a rinneadh ar an tacar sonraí iargúlta ós rud é an iarraidh seo caite. Ba chóir go mbeadh sé sin chomh héifeachtach (nó níos mó) ná rsync agus bheadh láimhseáil cásanna deacair go leor, ach bheadh ag obair ach amháin má tá na tacair sonraí iargúlta agus áitiúla EDDTableFromHttpGet tacair sonraí.

Más mian le duine ar bith a bheith ag obair ar seo, déan teagmháil le do thoilerd.data at noaa.gov.
    
#### Sonraí Dáilte{#distributed-data} 
Ní dhéanann aon cheann de na réitigh thuas post iontach de réiteach na hathruithe crua ar an bhfadhb mar gheall ar a mhacasamhlú in aice le fíor-ama (NRT) Tá tacair sonraí an-deacair, go páirteach mar gheall ar na cásanna is féidir.

Tá réiteach iontach: ná déan iarracht fiú na sonraí a mhacasamhlú.
Ina áit sin, bain úsáid as an bhfoinse údarásach amháin (tacar sonraí amháin ar cheannERDDAP) , á chothabháil ag an soláthraí sonraí (e.g. oifig réigiúnach) . Gach úsáideoir ar mian sonraí ón tacar sonraí a fháil i gcónaí ó na foinse. Mar shampla, a fháil apps bhrabhsálaí-bhunaithe na sonraí ó iarratas URL-bhunaithe, mar sin ní ba chóir é ábhar go bhfuil an t-iarratas ar an fhoinse bunaidh ar fhreastalaí iargúlta (nach bhfuil an freastalaí céanna go bhfuil óstáil an ESM) . Tá a lán daoine a bheith advocating an cur chuige Sonraí Dáilte ar feadh i bhfad (e.g., Roy Mendelssohn don 20+ bliain anuas) .ERDDAP's múnla greille / góchumadh (an 80% barr an doiciméid seo) bunaithe ar an gcur chuige seo. Tá an réiteach seo cosúil le claíomh chuig Knot Gordian - téann an fhadhb ar fad ar shiúl.

* Tá an réiteach seo simplí néal.
* Tá an réiteach seo éifeachtach néal ós rud é nach bhfuil aon obair a dhéanamh chun tacar sonraí a mhacasamhlú (s s) cothrom le dáta.
* Is féidir le húsáideoirí na sonraí is déanaí a fháil ag am ar bith (e.g., le latency ach ~ 0.5 dara) .
* Scálaí sé go maith go leor agus tá bealaí chun feabhas a chur ar scálú. (Féach an plé ag barr 80% den doiciméad seo.)   
     

Níl, nach bhfuil sé seo ar réiteach do gach cásanna is féidir, ach tá sé ina réiteach mór don chuid is mó. Má tá fadhbanna / lagaithe leis an réiteach seo i gcásanna áirithe, is minic gur fiú obair a dhéanamh chun na fadhbanna sin a réiteach nó maireachtáil leis na laigí sin mar gheall ar na buntáistí néal a bhaineann leis an réiteach seo. Más rud é / nuair a bhíonn an réiteach seo i ndáiríre do-ghlactha do staid ar leith, m.sh., nuair a chaithfidh tú cóip áitiúil de na sonraí a bheith agat i ndáiríre, ansin na réitigh eile a pléadh thuas a mheas.
     
### Conclúid{#conclusion} 
Cé nach bhfuil aon réiteach amháin, simplí a réitíonn breá na fadhbanna i ngach cás (mar rsync agus Sonraí Dáiltear beagnach) , tá súil againn go bhfuil uirlisí agus roghanna leordhóthanach ionas gur féidir leat teacht ar réiteach inghlactha do do staid ar leith.
