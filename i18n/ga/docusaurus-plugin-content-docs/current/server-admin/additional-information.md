---
sidebar_position: 4
---
# irl - Library Service

## Rudaí gá duit a fhios{#things-you-need-to-know} 
     
###    **[Seirbhís do Chustaiméirí](#proxy-errors)**  {#proxy-errors} 
Uaireanta, iarraidh arERDDAP™Beidh ar ais Earráid Proxy, ar HTTP 502 Earráid Geata Bad, nó roinnt earráid den chineál céanna. Tá na hearráidí á thrown ag Apache nó Tomcat, níERDDAP™féin.
* Má ghineann gach iarratas na hearráidí seo, go háirithe nuair a bhíonn tú ag bunú ar dtús doERDDAP™, ansin is dócha go bhfuil sé ina seachvótálaí nó earráid geata dona, agus is dócha go bhfuil an réiteach a shocrú[ERDDAP's suímh seachfhreastalaí](/docs/server-admin/deploy-install#proxypass). D'fhéadfadh sé seo a bheith freisin ar an bhfadhb nuair a bunaitheERDDAP™Tosaíonn go tobann throwing na hearráidí do gach iarratas.
* Seachas sin, "proxy" earráidí de ghnáth am i ndáiríre amach earráidí thrown ag Apache nó Tomcat. Fiú nuair a tharlaíonn siad sách tapa, tá sé roinnt de chineál freagartha ó Apache nó Tomcat a tharlaíonn nuairERDDAP™Tá an-ghnóthach, cuimhne teoranta, nó teoranta ag roinnt acmhainn eile. Sna cásanna seo, féach an chomhairle thíos chun déileáil le[ERDDAP™freagairt go mall](#responding-slowly).
        
Iarratais ar raon fada ama (× 30 pointí ama) ó tacar sonraí gridded Tá seans maith go ham amach teipeanna, Cé acu le feiceáil go minic mar Earráidí Proxy, mar a thógann sé am suntasach le haghaidhERDDAP™a oscailt gach ceann de na comhaid sonraí aon-ar-aon. Más rud éERDDAP™atá gnóthach ar shlí eile le linn na hiarrata, is dócha go dtarlóidh an fhadhb. Má tá comhaid an tacar sonraí comhbhrúite, Is é an fhadhb níos mó seans go dtarlóidh, cé go bhfuil sé deacair d'úsáideoir a chinneadh má tá comhaid tacar sonraí comhbhrúite.
Is é an réiteach roinnt iarrataí a dhéanamh, gach ceann acu le raon ama níos lú. Cé chomh beag de raon ama? Molaim ag tosú i ndáiríre beag (~ 30 pointí ama?) , ansin (thart timpeall) dúbailte an raon ama go dtí go mainneoidh an t-iarratas, ansin dul ar ais doubling amháin. Ansin a dhéanamh go léir na hiarratais (gach ceann le haghaidh smután difriúil ama) ag teastáil a fháil ar fad de na sonraí.
An bhfuilERDDAP™Is féidir le riarthóir a laghdú an fhadhb seo trí mhéadú[Apache suímh amout](/docs/server-admin/deploy-install#apache-timeout).
        
### Déan Teagmháil Linn{#monitoring} 
Ba mhaith linn go léir ár seirbhísí sonraí a aimsiú a lucht féachana agus a úsáid go forleathan, ach uaireanta doERDDAP™Is féidir a úsáid i bhfad ró-, is cúis le fadhbanna, lena n-áirítear freagraí Super mall do gach iarratas. Is é ár bplean chun fadhbanna a sheachaint:

* Monatóireacht a dhéanamh ar MonatóireachtERDDAP™tríd an[stádas html leathanach gréasáin](#status-page).
Tá tonna de eolas úsáideach. Má fheiceann tú go bhfuil líon mór na n-iarratas ag teacht isteach, nó tonna de chuimhne á n-úsáid, nó tonna na n-iarratas theip, nó gach LoadDatasets Mór ag cur i bhfad, nó féach ar aon chomhartha de rudaí ag dul bogged síos agus ag freagairt go mall, ansin breathnú iERDDAP's[comhad logála.txt](#log)a fheiceáil cad atá ar siúl.
    
Tá sé úsáideach freisin a thabhairt faoi deara cé chomh tapa a fhreagraíonn an leathanach stádas. Má fhreagraíonn sé go mall, is táscaire tábhachtach goERDDAP™Tá an-ghnóthach.
    
* Monatóireacht a dhéanamh ar MonatóireachtERDDAP™tríd an[An Tuairisc Laethúil](#daily-report)ríomhphost.
     
* Bí ag faire le haghaidh tacair sonraí lasmuigh den dáta tríd an *cineál gas: in airde* /erddap/outOfDateDatasets.htmlleathanach gréasáin atá bunaithe ar an roghnach[testOutOfDate](/docs/server-admin/datasets#testoutofdate)tréith domhanda.
     
#### Monatóirí seachtracha{#external-monitors} 
Tá na modhanna atá liostaithe thuasERDDAP's bealaí monatóireachta féin. Is féidir freisin córais sheachtracha a dhéanamh nó a úsáid chun monatóireacht a dhéanamh ar doERDDAP. Níl an Tweet seo ar fáil[Tionscadal erddap-metrics Axiom](https://github.com/axiom-data-science/erddap-metrics). Tá roinnt buntáistí ag córais sheachtracha den sórt sin:
* Is féidir iad a oiriúnú chun an t-eolas is mian leat a chur ar fáil, ar taispeáint ar an mbealach is mian leat.
* Is féidir leo eolas a chur san áireamh faoiERDDAP™go bhfuilERDDAP™Ní féidir rochtain a fháil go héasca nó ar chor ar bith (mar shampla, úsáid LAP, spás diosca saor in aisce,ERDDAP™am freagartha mar atá le feiceáil ó thaobh an úsáideora,ERDDAP™ag an am céanna,
* Is féidir leo foláirimh a sholáthar (ríomhphoist, glaonna teileafóin, téacsanna) do riarthóirí nuair a bhíonn fadhbanna níos mó ná roinnt tairseach.
             
### Il Insultaneous Iarratais{#multiple-simultaneous-requests} 
*    **úsáideoirí blacklist a dhéanamh iarratais comhuaineach il&#33;** 
Má tá sé soiléir go bhfuil roinnt úsáideoir a dhéanamh níos mó ná iarratas comhuaineach amháin, arís agus arís eile agus go leanúnach, ansin cuir a seoladh IP aERDDAP's'&lt;an t-iarratas Blacklist (/ ollscoileanna eile sa mhargadh) i dodatasets.xmlcomhad. Uaireanta tá na hiarratais go léir ó seoladh IP amháin. Uaireanta tá siad ó seoltaí IP il, ach go soiléir ar an úsáideoir céanna. Is féidir leat freisin daoine blacklist a dhéanamh tonna d'iarrataí neamhbhailí nó tonna d'iarrataí intinn-uimhriúil gan éifeacht.
    
Ansin, do gach iarratas a dhéanann siad,ERDDAP™tuairisceáin:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
Tá súil againn go mbeidh an t-úsáideoir a fheiceáil teachtaireacht seo agus teagmháil a dhéanamh leat a fháil amach conas a shocrú ar an bhfadhb agus a fháil amach an blacklist. Uaireanta, siad ach seoltaí IP athrú agus iarracht a dhéanamh arís.
    
Tá sé cosúil leis an t-iarmhéid na cumhachta idir airm ionsaitheacha agus cosanta i gcogadh. Anseo, na hairm cosanta (ERDDAP) Tá cumas seasta, teoranta ag an líon cores sa LAP, an bandaleithead rochtain diosca, agus an bandaleithead líonra. Ach na hairm ionsaitheacha (úsáideoirí, go háirithe scripteanna) a bhfuil cumas neamhtheoranta:
    
    * Féadfaidh iarraidh amháin ar shonraí ó go leor pointí ama a chur faoi dearaERDDAPa oscailt líon mór de chomhaid (i ord nó i bpáirt il-threaded) . I gcásanna tromchúiseacha, is féidir le hiarraidh "simplí" amháin an RAID atá ceangailte leis a cheangal go héascaERDDAP™ar feadh nóiméad, go héifeachtach blocála an láimhseáil na n-iarratas eile.
         
    * Is féidir iarratas amháin a ithe smután mór de chuimhne (cé go céERDDAP™códaithe a íoslaghdú an chuimhne ag teastáil chun déileáil le hiarratais mór) .
         
    * Comhuainiú - - - - -
Tá sé éasca d'úsáideoir cliste tasc mór a comhthreomharú trí go leor snáitheanna a ghiniúint, cuireann gach ceann acu iarratas ar leith (a d'fhéadfadh a bheith mór nó beag) . Spreagann an pobal eolaíochta ríomhaireachta an t-iompar seo mar bhealach éifeachtach chun déileáil le fadhb mhór (agus tá parallelizing éifeachtach in imthosca eile) . Ag dul ar ais go dtí analaí cogadh: Is féidir le húsáideoirí a dhéanamh ar líon riachtanach neamhtheoranta na n-iarratas comhuaineach leis an costas gach á go bunúsach náid, ach an costas gach iarraidh ag teacht isteachERDDAP™is féidir a bheith mór agusERDDAP'Is cumas freagartha s finite. Go soiléir,ERDDAP™caillfidh an cath seo, ach amháin má tá anERDDAP™riarthóir blacklists úsáideoirí atá ag déanamh iarrataí comhuaineach il atá plódaithe go héagórach amach úsáideoirí eile.
         
    * Amharc ar gach eolas
Anois smaoineamh ar cad a tharlaíonn nuair a bhíonn roinnt úsáideoirí cliste gach ag rith scripteanna parallelized. Más féidir le úsáideoir amháin a ghiniúint an oiread sin iarrataí go bhfuil úsáideoirí eile plódaithe amach, ansin is féidir le húsáideoirí il den sórt sin a ghiniúint iarrataí an oiread sin goERDDAP™thiocfaidh chun bheith faoi léigear agus is cosúil gcruthaíonn sé unresponsive. Is maith liom é[DDOS ionsaí](https://en.wikipedia.org/wiki/Denial-of-service_attack)Arís, an chosaint ach amháin le haghaidhERDDAP™Is é d'úsáideoirí blacklist dhéanamh iarratais comhuaineach il atá plódaithe go héagórach amach úsáideoirí eile.
         
    * Gnéithe Inséidte -
Sa saol seo de chuideachtaí ardteicneolaíochta ollmhór (Amazon, Google, Facebook,...) , úsáideoirí teacht chun bheith ag súil go bunúsach cumais neamhtheoranta ó na soláthraithe. Ós rud é go bhfuil na cuideachtaí oibríochtaí airgead a dhéanamh, na húsáideoirí níos mó a bhfuil siad, an t-ioncam níos mó acu a leathnú a mbonneagar TF. Mar sin, is féidir leo bonneagar TF ollmhór a thabhairt chun iarrataí a láimhseáil. Agus teorainn siad cleverly líon na n-iarratas agus costas gach iarrata ó úsáideoirí ag teorainn na cineálacha na n-iarratas gur féidir le húsáideoirí a dhéanamh ionas go bhfuil aon iarraidh amháin burdensome, agus ní cúis (nó ar bhealach) d'úsáideoirí a dhéanamh iarratais comhuaineach il. Mar sin, d'fhéadfadh na cuideachtaí ardteicneolaíochta ollmhór a bheith úsáideoirí i bhfad níos mó náERDDAP™, ach tá siad acmhainní massively níos mó agus bealaí cliste a theorannú na hiarrataí ó gach úsáideoir. Tá sé ina staid inbhainistithe do na cuideachtaí TF mór (agus a fhaigheann siad saibhir&#33;) ach ní le haghaidhERDDAP™suiteálacha. Arís, an chosaint ach amháin le haghaidhERDDAP™Is é d'úsáideoirí blacklist dhéanamh iarratais comhuaineach il atá plódaithe go héagórach amach úsáideoirí eile.
         
    
Mar sin, úsáideoirí: Ná déan iarratais comhuaineacha il nó beidh tú a blacklisted&#33;
     

Clearly, is fearr má tá do fhreastalaí a lán de cores, a lán de chuimhne (ionas gur féidir leat a leithdháileadh a lán de chuimhne aERDDAP™, níos mó ná riachtanais sé riamh) , agus nasc idirlín bandaleithead ard. Ansin, is annamh a bhíonn an chuimhne nó ní fachtóir teorainn, ach bíonn bandaleithead líonra an fachtóir teorannú níos coitianta. Go bunúsach, mar go bhfuil iarratais níos mó agus níos comhuaineacha, laghdaíonn an luas ar aon úsáideoir ar leith. Go slows nádúrtha síos ar líon na n-iarratas ag teacht i má tá gach úsáideoir ach a chur isteach iarratas amháin ag an am.
    
### ERDDAP™Getting Data from THREDDS{#erddap-getting-data-from-thredds} 
Má tá doERDDAP™Faigheann roinnt de na sonraí ó THREDDS ar do shuíomh, tá roinnt buntáistí a dhéanamh cóip de na comhaid sonraí THREDDS (ar a laghad le haghaidh na tacair shonraí is coitianta) ar RAID eile goERDDAP™rochtain a fháil ar ionas goERDDAP™Is féidir le sonraí a sheirbheáil ó na comhaid go díreach. AgERD, a dhéanann muid sin le haghaidh ár tacar sonraí is coitianta.

*   ERDDAP™is féidir a fháil ar na sonraí go díreach agus ní gá chun fanacht le THREDDS a athlódáil an tacar sonraí nó...
*   ERDDAP™Is féidir faoi deara agus a ionchorprú comhaid sonraí nua láithreach, mar sin ní gá é a pester THREDDS minic a fheiceáil má tá an tacar sonraí a athrú. Féach [EN]&lt;updateEveryNMillis . (/ disciplíní / sonraí #updateeverynmillis) .
* Tá an t-ualach roinnte idir 2 RAIDS agus 2 freastalaithe, in ionad an t-iarratas a bheith deacair ar an dáERDDAP™agus THREDDS.
* Seachnaíonn tú an fhadhb mismatch de bharr THREDDS a bhfuil beag (riachtanais uisce: measartha) méid uasta iarraidh.ERDDAP™Tá córas a láimhseáil an mismatch, ach a sheachaint go bhfuil an fhadhb níos fearr.
* Tá tú cóip cúltaca de na sonraí atá i gcónaí smaoineamh maith.

In aon chás, ná reáchtáil riamh THREDDS agusERDDAP™sa Tomcat céanna. Rith iad i Tomcats ar leith, nó níos fearr, ar fhreastalaithe ar leith.

Teacht againn go bhfaigheann THREDDS tréimhsiúil i stát ina iarrataí hang díreach. Má tá doERDDAP™ag fáil sonraí ó THREDDS agus tá an THREDDS sa stát seo,ERDDAP™Tá cosaint (deir sé nach bhfuil an tacar sonraí THREDDS-bhunaithe ar fáil) , ach tá sé fós deacair doERDDAP™mar gheall arERDDAP™Tá fanacht go dtí an timeout gach uair iarracht sé a athlódáil tacar sonraí ó ocras THREDDS. Roinnt grúpaí (lena n-áirítearERD) seo a sheachaint ag atosú go réamhghníomhach THREDDS minic (e.g., oíche i bpost cron) .

### Ag freagairt dó{#responding-slowly} 
*    **Más rud éERDDAP™An bhfuil Comhfhreagrach** nó má tá ach iarratais áirithe ag freagairt go mall,
d'fhéadfá a bheith in ann a fháil amach an bhfuil an slowness réasúnach agus sealadach (e.g., mar gheall ar go leor de na hiarratais ó scripteanna nóWMSúsáideoirí) , nó má tá rud éigin mícheart inexplicably agus is gá duit a[stoptar síos agus atosú Tomcat agusERDDAP™](#shut-down-and-restart).
    
Más rud éERDDAP™ag freagairt go mall, féach ar an chomhairle thíos a chinneadh an chúis, a mbeidh súil agam go mbeidh tú a shocrú ar an bhfadhb.
D'fhéadfá pointe tosaigh ar leith a bheith agat (e.g., URL iarratais ar leith) nó pointe tosaigh doiléir (e.g.,ERDDAP™Is maith liom é) .
Is féidir leat a fhios ag an úsáideoir atá i gceist (e.g., mar gheall ar ríomhphost siad tú) , nó nach bhfuil.
D'fhéadfá a bheith leideanna eile, nó nach bhfuil.
Ós rud é go léir de na cásanna agus gach ceann de na cúiseanna féideartha de na fadhbanna blur chéile, an chomhairle thíos iarracht chun déileáil le gach pointe tosaigh is féidir agus gach fadhbanna is féidir a bhaineann le freagraí mall.
    
    *    **Féach leideanna i[ERDDAP's comhad logála](#log)**   ( *Treoir do Thuismitheoirí* Naisc go dtí suíomhanna eile) .
        \\[Ar ócáidí annamh, tá leideanna i[Comhaid log Tomcat](#tomcat-logs)  ( *taiseachas aeir: fliuch* / logs / catalina.out) .\\]  
Féach ar theachtaireachtaí earráide.
Féach ar líon mór na n-iarratas ag teacht ó cheann (nó cúpla) úsáideoirí agus b'fhéidir go leor de na hacmhainní do fhreastalaí ar (cuimhne, am LAP, rochtain diosca, bandaleithead idirlín) .
        
Má tá an deacracht ceangailte leis **úsáideoir amháin** , Is féidir leat a fháil go minic leid faoi a bhfuil an t-úsáideoir trí sheirbhísí gréasáin cosúil[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)is féidir a thabhairt duit faisnéis a bhaineann le seoladh IP an úsáideora (a bhfuil tú in ann teacht isteachERDDAP's[logáil isteach.](#log)comhad comhad) .
        
        * Más cosúil an t-úsáideoir a bheith ina **buidéal uisce** bearrtha go dona (go háirithe, inneall cuardaigh ag iarraidh a líonadh amach anERDDAP™foirmeacha le gach permutation féideartha luachanna iontrála) , déan cinnte go bhfuil tú ar bun i gceart do fhreastalaí ar[taiseachas aeir: fliuch](#robotstxt)comhad.
        * Más cosúil an t-úsáideoir a bheith ina **script script (s s) ** go bhfuil a dhéanamh iarratais comhuaineach il, déan teagmháil leis an úsáideoir, a mhíniú go bhfuil doERDDAP™Tá acmhainní teoranta (e.g., cuimhne, am LAP, rochtain diosca, bandaleithead idirlín) , agus iarr orthu a bheith tuisceanach na n-úsáideoirí eile agus a dhéanamh ach iarratas amháin ag an am. D'fhéadfá a lua freisin go mbeidh tú blacklist iad más rud é nach bhfuil siad ar ais as.
        * Más cosúil an t-úsáideoir a bheith ina **script script** ag déanamh líon mór na n-iarratas am-íditheach, a iarraidh ar an úsáideoir a bheith tuisceanach na n-úsáideoirí eile trí sos beag a chur (2 soicind?) sa script idir iarrataí.
        *    **WMSsoftware development** Is féidir a bheith an-éilitheach. Beidh cliant amháin a iarraidh go minic le haghaidh 6 íomhánna saincheaptha ag an am. Más cosúil an t-úsáideoir a bheith inaWMScliant atá ag déanamh iarrataí dlisteanacha, is féidir leat:
            * Ignore sé. (molta, toisc go mbainfidh siad bogadh ar go leor go luath) 
            * Cas amach do fhreastalaíWMSseirbhís viaERDDAP's thus.html comhad. (gan a bheith molta) 
        * Má tá an chuma ar na hiarratais **dúr, dÚsachtach, iomarcach, nó mailíseach,** nó más rud é nach féidir leat an fhadhb a réiteach ar bhealach ar bith eile, a mheas go sealadach nó go buan ag cur seoladh IP an úsáideora chuig an [&lt;iarratas Blacklist × i dodatasets.xmlfile] (/ ollscoileanna eile sa mhargadh) .
             
    *    **Bain triail as a dhúbailt an fhadhb féin, ó do ríomhaire.**   
Figiúr amach má tá an fhadhb le tacar sonraí amháin nó gach tacar sonraí, le haghaidh úsáideoir amháin nó gach úsáideoir, le haghaidh cineálacha áirithe iarrataí, etc.
Más féidir leat an fhadhb a dhúbailt, déan iarracht an fhadhb a mhaolú.
Más rud é nach féidir leat an fhadhb a dhúbailt, d'fhéadfadh an fhadhb a bheith ceangailte le ríomhaire an úsáideora, nasc idirlín an úsáideora, nó nasc idirlín d'institiúid.
         
    * Má tá ach **tacar sonraí amháin** ag freagairt go mall (b'fhéidir ach amháin le haghaidh **cineál amháin iarrata** ó úsáideoir amháin) , d'fhéadfadh an fhadhb a bheith:
        *   ERDDAP's rochtain ar shonraí foinse na tacar sonraí (go háirithe ó bhunachair sonraí a bhaineann le, Cassandra, agus tacair sonraí iargúlta) a bheith go sealadach nó go buan mall. Bain triail as a sheiceáil an fhoinse luas neamhspleách arERDDAP. Má tá sé mall, b'fhéidir gur féidir leat é a fheabhsú.
        * An mbaineann an fhadhb leis an iarraidh shonrach nó leis an gcineál ginearálta iarrata?
An níos mó an fo-thacar a iarrtar de thacar sonraí, is dócha go mbeidh an t-iarratas theipeann. Má tá an t-úsáideoir ag déanamh iarratais ollmhór, a iarraidh ar an úsáideoir a dhéanamh iarrataí níos lú atá níos mó seans a fháil freagra tapa agus rathúil.
            
Tá beagnach gach tacar sonraí níos fearr ag láimhseáil roinnt cineálacha iarrataí ná cineálacha eile iarrataí. Mar shampla, nuair a siopaí tacar sonraí smutáin ama éagsúla i gcomhaid éagsúla, d'fhéadfadh iarrataí ar shonraí ó líon mór pointí ama a bheith an-mhall. Má tá na hiarrataí atá ann faoi láthair de chineál deacair, a mheas ag tairiscint éagsúla den tacar sonraí atá optamaithe do na hiarratais. Nó a mhíniú ach don úsáideoir go bhfuil an cineál sin na n-iarratas deacair agus Tógann am, agus a iarraidh ar a n- foighne.
            
        * Ní féidir leis an tacar sonraí a chumrú go optamach. D'fhéadfá a bheith in ann athruithe a dhéanamh ar an tacar sonraídatasets.xmlchun cabhrú leERDDAP™láimhseáil an tacar sonraí níos fearr. Mar shampla,
            
            *   EDDGridTá tacair sonraí ó NcFiles a rochtain sonraí ó chomhbhrúite nc4/hdf5 comhaid mall nuair a fháil sonraí le haghaidh an raon geografach ar fad (e.g., le haghaidh léarscáil domhan) toisc go gcaithfear an comhad ar fad a dhíchóimeáil. D'fhéadfá a thiontú ar na comhaid a comhaid uncompressed, ach ansin beidh an ceanglas spás diosca a bheith i bhfad, i bhfad níos mó. Is dócha gur fearr glacadh leis go mbeidh tacair sonraí den sórt sin mall i gcúinsí áirithe.
            * An chumraíocht an [&lt;subsetVariablesú (Sonraí Teagmhála) Tá tag tionchar ollmhór ar conasERDDAP™Láimhseálann tacar sonraí EDDTable.
            * D'fhéadfá a bheith in ann a mhéadú ar an[luas EDDTableFromDatabase](/docs/server-admin/datasets#database-speed)tacar sonraí.
            * Is féidir go leor tacair shonraí EDDTable a sped suas ag[cóip de na sonraí a stóráil iNetCDFContiguous Ragged Array comhaid](/docs/server-admin/datasets#eddtablefromfiles)a,ERDDAP™is féidir a léamh go han-tapa.
            
Más mian leat cabhrú le dlús a chur le tacar sonraí ar leith, san áireamh cur síos ar an bhfadhb agus smután na tacar sonraí ardatasets.xmlagus féach ar ár[alt ar thacaíocht bhreise a fháil](/docs/intro#support).
             
    * Más rud é **gach rud** iERDDAP™Is maith liom **i gcónaí** mall, d'fhéadfadh an fhadhb a bheith:
        * An ríomhaire atá ag rithERDDAP™d'fhéadfadh nach bhfuil go leor cuimhne nó cumhacht próiseála. Tá sé go maith a reáchtáilERDDAP™ar fhreastalaí nua-aimseartha, il-lárnach. Le húsáid throm, ba chóir go mbeadh córas oibriúcháin 64-giotán ag an bhfreastalaí agus 8 GB nó níos mó de chuimhne.
        * An ríomhaire atá ag rithERDDAP™d'fhéadfadh a bheith ag rith freisin iarratais eile atá Tógann go leor acmhainní córas. Más amhlaidh, is féidir leat a fháil freastalaí tiomanta doERDDAP? Mar shampla (Níl an Tweet seo ar fáil) , is féidir leat a fháil quad-lárnach Mac Mini Freastalaí le 8 GB de chuimhne do ~ $ 1100.
             
    * Más rud é **gach rud** iERDDAP™Is maith liom **go sealadach** mall, féachaint ar doERDDAP's[ **/erddap/status.htmlleathanach na leathanach** ](#status-page)i do bhrabhsálaí.
        * An bhfuil anERDDAP™leathanach stádas theipeann a luchtú?
Más amhlaidh,[restartERDDAP™](#shut-down-and-restart).
        * An raibh anERDDAP™ualach leathanach stádas mall (m.sh., 0.5 soicind) ?
Is é sin comhartha go bhfuil gach rud iERDDAP™Tá sé ag rith go mall, ach ní gá go dtrioblóid.ERDDAP™d'fhéadfadh a bheith ach i ndáiríre gnóthach.
        * Chun "Freagrach Am Failed (ó shin LoadDatasets mór deireanach) ", Is n = líon mór?
Léiríonn sin go raibh go leor de na hiarratais theip le déanaí. D'fhéadfadh sé sin a bheith trioblóide nó tús na trioblóide. Is minic a bhíonn an t-am meánach do na teipeanna mór (e.g., 210000 ms) ,
a chiallaíonn go raibh (an bhfuil?) go leor de na snáitheanna gníomhacha.
a bhí tying suas go leor acmhainní (cosúil le cuimhne, comhaid oscailte, soicéid oscailte,...) ,
nach bhfuil go maith.
        * Le haghaidh "Freagrach Succeed Am (ó shin LoadDatasets mór deireanach) ", Is n = líon mór?
Léiríonn sin go raibh go leor de na hiarratais rathúil le déanaí. Níl an Tweet seo ar fáil. Ciallaíonn sé ach doERDDAP™ag fáil úsáid trom.
        * An bhfuil an "Líon na snáitheanna neamh-Tomcat-ag fanacht" dúbailte luach tipiciúil?
Níl an Tweet seo ar fáilERDDAP™go mall síos agus ar deireadh thiar reoite. Má leanann sé seo ar feadh uair an chloig, b'fhéidir gur mhaith leat go réamhghníomhach[restartERDDAP™](#shut-down-and-restart).
        * Ag bun an liosta "Memory Use Summary", an ceann deireanach "Memory: faoi láthair ag baint úsáide as" luach an-ard?
D'fhéadfadh sé sin le fios ach úsáid ard, nó d'fhéadfadh sé a bheith ina comhartha trioblóide.
        * Féach ar an liosta snáitheanna agus a stádas. An bhfuil líon neamhghnách acu rud éigin neamhghnách a dhéanamh?
             
    * Is maith liom **nasc idirlín d'institiúid** faoi láthair mall?
Cuardaigh an idirlíon le haghaidh "tástáil luas idirlín" agus ceann de na tástálacha ar líne saor in aisce a úsáid, mar shampla[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Má tá nasc idirlín do institiúid mall, ansin naisc idirERDDAP™agus beidh foinsí sonraí iargúlta a bheith mall, agus naisc idirERDDAP™agus beidh an t-úsáideoir a bheith mall. Uaireanta, is féidir leat é seo a réiteach trí stopadh úsáid idirlín gan ghá (e.g., daoine ag breathnú físeáin sruthú nó ar ghlaonna físchomhdhála) .
         
    * Is maith liom **nasc idirlín an úsáideora** faoi láthair mall?
An bhfuil an t-úsáideoir cuardach a dhéanamh ar an idirlíon le haghaidh "tástáil luas idirlín" agus ceann de na tástálacha ar líne saor in aisce a úsáid, mar shampla[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Má tá nasc idirlín an úsáideora mall, slows sé síos a rochtain arERDDAP. Uaireanta, is féidir leo é seo a réiteach trí stopadh úsáid idirlín gan ghá ag a n-institiúid (e.g., daoine ag breathnú físeáin sruthú nó ar ghlaonna físchomhdhála) .
         
    *    **Cén fáth?**   
Féach ar ár[alt ar thacaíocht bhreise a fháil](/docs/intro#support).

### Shut Down agus atosú{#shut-down-and-restart} 
*    **Conas a Shut Dúin agus Atosú Tomcat agusERDDAP™**   
Ní gá duit a stoptar síos agus atosú Tomcat agusERDDAPmás rud éERDDAP™go sealadach mall, mall ar chúis éigin ar eolas (cosúil go leor de na hiarratais ó scripteanna nóWMSúsáideoirí) , nó athruithe a chur i bhfeidhmdatasets.xmlcomhad.
    
Ní mór duit a stoptar síos agus atosú Tomcat agusERDDAP™más gá duit athruithe a chur i bhfeidhm ar an gcomhad thus.xml, nó más rud éERDDAP™reoite, hangs, nó glais suas. I gcúinsí tromchúiseacha,Javad'fhéadfadh reoite ar feadh nóiméad nó dhó agus a dhéanann sé bailiúchán truflais iomlán, ach ansin a ghnóthú. Mar sin, tá sé go maith chun fanacht nóiméad nó dhó a fheiceáil máJava/ BaileERDDAP™i ndáiríre reoite nó má tá sé ag déanamh ach bailiúchán truflais fada. (Más fadhb choitianta é bailiúchán truflais,[níos mó cuimhne a leithdháileadh ar Tomcat](/docs/server-admin/deploy-install#memory).) 
    
Ní féidir liom a mholadh ag baint úsáide as an Tomcat Bainisteoir Iarratais Gréasáin a thosú nó múchadh Tomcat. Más rud é nach bhfuil tú go hiomlán múchadh agus startup Tomcat, luath nó ina dhiaidh sin beidh ort saincheisteanna cuimhne PermGen.
    
To shutdown agus atosú Tomcat agusERDDAP:
    
    * Má úsáideann tú Linux nó Mac:
         (Má tá tú chruthaigh úsáideoir speisialta a reáchtáil Tomcat, m.sh., tomcat, cuimhnigh a dhéanamh ar na céimeanna seo a leanas mar an t-úsáideoir.)   
         
        1. Bain úsáid as cd táirge *taiseachas aeir: fliuch* taiseachas aeir: fliuch
             
        2. Úsáid ps -ef|tomcat grep chun teacht ar an bpróiseas java/tomcat ID (Tá súil agam go mbeidh ach próiseas amháin a liostú) , a beidh orainn glaoch *cliceáil grianghraf a mhéadú* thíos.
             
        3. Más rud éERDDAP™Tá reoite / hung / faoi ghlas suas, úsáid a mharú -3 *cliceáil grianghraf a mhéadú* a insintJava  (atá ag rith Tomcat) le dumpáil snáithe a dhéanamh chuig an gcomhad log Tomcat: *taiseachas aeir: fliuch* / logs / catalina.out . Tar éis duit reboot, is féidir leat an fhadhb a dhiagnóisiú trí fhaisnéis dumpála snáithe a aimsiú (agus aon fhaisnéis úsáideach eile os a chionn) i *taiseachas aeir: fliuch* / logs / catalina.out agus freisin ag léamh codanna ábhartha de na[ERDDAP™cartlainne log](#log). Más mian leat, is féidir leat an t-eolas sin a chur san áireamh agus ár fheiceáil[alt ar thacaíocht bhreise a fháil](/docs/intro#support).
             
        4. Bain úsáid as . / síos. cúthail
             
        5. Úsáid ps -ef|tomcat grep arís agus arís eile go dtí nach bhfuil an próiseas java/tomcat liostaithe.
            
Uaireanta, beidh an próiseas java/tomcat suas le dhá nóiméad a dhúnadh go hiomlán síos. Is é an chúis:ERDDAP™Cuireann teachtaireacht chuig a snáitheanna cúlra chun iad a insint chun stop a chur, ach uaireanta tógann sé na snáitheanna seo ar feadh i bhfad chun dul go dtí áit stad maith.
            
        6. Más rud é tar éis nóiméad nó mar sin, nach bhfuil java/tomcat stopadh féin, is féidir leat é a úsáid
a mharú -9 *cliceáil grianghraf a mhéadú*   
chun bhfeidhm an próiseas java/tomcat chun stop a chur láithreach. Más féidir, bain úsáid as seo ach amháin mar rogha dheireanach. Is é an lasc -9 cumhachtach, ach d'fhéadfadh sé a chur faoi deara fadhbanna éagsúla.
             
        7. AtosúERDDAP™, úsáid ./startup.sh
             
        8. Féach ar an roghchlárERDDAP™i do bhrabhsálaí a sheiceáil gur éirigh leis an atosú. (Uaireanta, ní mór duit fanacht 30 soicind agus iarracht a luchtúERDDAP™arís i do bhrabhsálaí chun go n-éireoidh leis.)   
             
    * Má úsáideann tú Windows:
         
        1. Bain úsáid as cd táirge *taiseachas aeir: fliuch* taiseachas aeir: fliuch
             
        2. Úsáid Úsáid Úsáidteshutdown.bat  
             
        3. D'fhéadfá a bheith ag iarraidh / ag teastáil chun an Bainisteoir Tasc Windows a úsáid (inrochtana trí Ctrl Alt Del) a chinntiú go bhfuil anJavaSeirbhís do ChustaiméiríERDDAP™tá an próiseas/iarratas stoptha go hiomlán.
Uaireanta, beidh an próiseas / iarratas suas le dhá nóiméad a dhúnadh síos. Is é an chúis:ERDDAP™Cuireann teachtaireacht chuig a snáitheanna cúlra chun iad a insint chun stop a chur, ach uaireanta tógann sé na snáitheanna seo ar feadh i bhfad chun dul go dtí áit stad maith.
             
        4. AtosúERDDAP™, úsáid tosaithe.bat
             
        5. Féach ar an roghchlárERDDAP™i do bhrabhsálaí a sheiceáil gur éirigh leis an atosú. (Uaireanta, ní mór duit fanacht 30 soicind agus iarracht a luchtúERDDAP™arís i do bhrabhsálaí chun go n-éireoidh leis.)   
             
### Crashes nó reoite{#frequent-crashes-or-freezes} 
Más rud éERDDAP™thiocfaidh chun bheith mall, tuairtí nó reoite, tá rud éigin mícheart. Féach ar[ERDDAP's comhad logála](#log)chun iarracht a dhéanamh amach an chúis. Mura féidir leat, cuir na sonraí san áireamh agus féach ar ár[alt ar thacaíocht bhreise a fháil](/docs/intro#support).

Is é an fhadhb is coitianta úsáideoir troublesome atá ag rith roinnt scripteanna ag an am céanna agus / nó duine éigin a dhéanamh ar líon mór na n-iarratas neamhbhailí. Má tharlaíonn sé seo, ba chóir duit is dócha blacklist sin úsáideoir. Nuair a dhéanann úsáideoir blacklisted iarraidh, spreagann an teachtaireacht earráide sa fhreagra iad a ríomhphost a thabhairt duit a bheith ag obair amach na fadhbanna. Ansin, is féidir leat iad a spreagadh a reáchtáil ach script amháin ag an am agus a shocrú ar na fadhbanna ina script (e.g., sonraí a iarraidh ó tacar sonraí iargúlta nach féidir freagra a thabhairt roimh am amach) . Féach [EN]&lt;iarratas Blacklist × i dodatasets.xmlfile] (/ ollscoileanna eile sa mhargadh) .

I gcúinsí tromchúiseacha,Javad'fhéadfadh reoite ar feadh nóiméad nó dhó agus a dhéanann sé bailiúchán truflais iomlán, ach ansin a ghnóthú. Mar sin, tá sé go maith chun fanacht nóiméad nó dhó a fheiceáil máJava/ BaileERDDAP™i ndáiríre reoite nó má tá sé ag déanamh ach bailiúchán truflais fada. (Más fadhb choitianta é bailiúchán truflais,[níos mó cuimhne a leithdháileadh ar Tomcat](/docs/server-admin/deploy-install#memory).) 

Más rud éERDDAP™thiocfaidh chun bheith mall nó freezes agus nach bhfuil an fhadhb úsáideoir troublesome nó bailiúchán truflais fada, is féidir leat a réiteach de ghnáth ar an bhfadhb ag[atosúERDDAP™](#shut-down-and-restart). Is é mo thaithí goERDDAP™Is féidir a reáchtáil ar feadh míonna gan gá atosú.
     

### Monatóireacht a dhéanamh ar Monatóireacht{#monitor} 
Is féidir leat monatóireacht a dhéanamh doERDDAP's stádas ag féachaint ar[/erddap/status.htmlleathanach na leathanach](#status-page), go háirithe na staitisticí sa chuid is mó. Más rud éERDDAP™thiocfaidh chun bheith mall nó reoite agus nach bhfuil an fhadhb ach úsáid an-trom, is féidir leat a réiteach de ghnáth ar an bhfadhb ag[atosúERDDAP™](#shut-down-and-restart). Níl méadracht breise ar fáil tríd an comhtháthú Prometheus ag /erddap / méadracht.

Is é mo thaithí goERDDAP™Is féidir a reáchtáil ar feadh míonna gan gá atosú. Níor chóir duit ach é a a atosú más mian leat roinnt athruithe a rinne tú a chur i bhfeidhmERDDAP's thus.xml nó nuair is gá duit a shuiteáil leaganacha nua deERDDAP™,Java, Tomcat, nó an córas oibriúcháin. Más gá duit atosúERDDAP™go minic, tá rud éigin mícheart. Féach ar[ERDDAP's comhad logála](#log)chun iarracht a dhéanamh amach an chúis. Mura féidir leat, cuir na sonraí san áireamh agus féach ar ár[alt ar thacaíocht bhreise a fháil](/docs/intro#support). Mar réiteach sealadach, d'fhéadfá iarracht a dhéanamh ag baint úsáide as[Féach ar Léarscáileanna](https://mmonit.com/monit/)chun monatóireacht a dhéanamh ar doERDDAP™agus é a atosú más gá. Nó, d'fhéadfaí tú a dhéanamh post cron a atosúERDDAP™  (go gníomhach) go tréimhsiúil. D'fhéadfadh sé a bheith ina dúshlánach beag a scríobh script chun monatóireacht a uathoibriú agus atosúERDDAP. Roinnt leideanna a d'fhéadfadh cabhrú:

* Is féidir leat tástáil a shimpliú má tá an próiseas Tomcat ag rith go fóill trí úsáid a bhaint as an lasc-c le grep:
Seirbhís do Chustaiméirí *taiseachas aeir: fliuch Úsáideora*  |cliceáil grianghraf a mhéadú
Laghdóidh sé an t-aschur go "1" má tá an próiseas tomcat fós beo, nó "0" má tá an próiseas stop.
     
* Má tá tú go maith le gawk, is féidir leat sliocht an processID ó na torthaí
Seirbhís do Chustaiméirí *taiseachas aeir: fliuch Úsáideora*  |java grep, agus bain úsáid as an processID i línte eile den script.
     

Má dhéanann tú a chur ar bun Monit nó post cron, ba mhaith sé a bheith iontach má d'fhéadfaí tú a roinnt ar na sonraí sin d'fhéadfadh daoine eile leas a bhaint a fheiceáil ár[alt ar thacaíocht bhreise a fháil](/docs/intro#support)i gcás inar féidir leat a roinnt.

#### taiseachas aeir: fliuch{#permgen} 
Má úsáideann tú arís agus arís eile Bainisteoir Tomcat chun Athlódáil (nó Stop agus Tosaigh)  ERDDAP™,ERDDAP™d'fhéadfadh theipeann chun tús a chur suas agus caith java.lang. OutOfMemoryEror: PermGen. Is é an réiteach go tréimhsiúil (nó gach uair?)  [stoptar síos agus atosú tomcat agusERDDAP™](#shut-down-and-restart), in ionad ach athluchtúERDDAP.
\\[Nuashonraigh: An fhadhb a bhí íoslaghdú go mór nó a shocrú iERDDAP™leagan 1.24.\\]  
     
#### cineál gas: in airde{#log} 
*    **[logáil isteach.](#log)**   
Más rud éERDDAP™Ní thosú nó más rud é nach bhfuil rud éigin ag obair mar súil, tá sé an-úsáideach chun breathnú ar an earráid agus teachtaireachtaí diagnóiseacha saERDDAP™log file.
    * Is é an comhad logála *Treoir do Thuismitheoirí* Naisc go dtí suíomhanna eile
         ( *Treoir do Thuismitheoirí* a shonraítear i[crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml)) . Mura bhfuil aon logáil isteach. comhad txt nó má tá an logáil isteach. Níl comhad txt tugtha cothrom le dáta ó atosú túERDDAP™, breathnú ar an[Comhaid Logáil Tomcat](#tomcat-logs)a fheiceáil má tá teachtaireacht earráide ann.
    * Cineálacha teachtaireachtaí diagnóiseacha sa chomhad logála:
        * Úsáidtear an focal "éigean" nuair a chuaigh rud éigin chomh mícheart gur theip ar an nós imeachta a chomhlánú. Cé go bhfuil sé annoying a fháil earráid, na fórsaí earráide tú chun déileáil leis an bhfadhb. Is é ár smaoineamh go bhfuil sé níos fearr le caith earráid, ná a bheithERDDAP™Caitheamh aimsire chomh maith, ag obair ar bhealach nach raibh tú ag súil.
        * Úsáidtear an focal "téamh" nuair a chuaigh rud éigin mícheart, ach bhí an nós imeachta in ann a chomhlánú. Tá siad seo annamh go leor.
        * Rud ar bith eile ach teachtaireacht faisnéiseach. Is féidir leat a rialú cé mhéad eolais atá logáilte le [&lt;Logáil isteach » (Sonraí Teagmhála)  datasets.xml.
        * Reloads tacar sonraí agus freagraí úsáideora a ghlacadh × 10 soicind a chríochnú (go rathúil nó nár éirigh leo) marcáilte le " (× 10s&#33;) ". Dá bhrí sin, is féidir leat cuardach a dhéanamh ar an comhad log.txt don abairt seo chun teacht ar na tacair sonraí a bhí mall a athlódáil nó ar líon na n-iarratas na n-iarratas a bhí mall a chríochnú. Is féidir leat breathnú ansin níos airde sa chomhad log.txt a fheiceáil cad a bhí an fhadhb tacar sonraí nó cad a bhí an t-iarratas úsáideora agus a bhí sé ó. Tá na hualaí réamhshocraithe sonraí mall agus iarratais úsáideora ag cur isteach uaireanta arERDDAP. Mar sin, is féidir a fhios agam níos mó faoi na hiarratais cabhrú leat a aithint agus fadhbanna a réiteach.
    * Tá faisnéis scríofa chuig an comhad logáil isteach ar an tiomáint diosca i smutáin sách mór. Is é an buntáiste go bhfuil sé seo an-éifeachtach --ERDDAP™Beidh riamh bloc ag fanacht le faisnéis a bheidh le scríobh chuig an comhad logáil. Is é an míbhuntáiste go mbeidh an logáil deireadh beagnach i gcónaí le teachtaireacht páirteach, nach mbeidh a chur i gcrích go dtí go bhfuil an chéad shmután eile scríofa. Is féidir leat é a dhéanamh cothrom le dáta (le haghaidh toirt) ag breathnú ar doERDDAP's leathanach gréasáin stádas ag https://*your.domain.org*/erddap/status.html   (nóhttp://más rud éhttpsNíl cumasaithe) .
    * Nuair a fhaigheann na comhaid log.txt go 20 MB,
Tá an comhad a athainmníodh log. txt.previous agus comhad log.txt nua a cruthaíodh. Mar sin, ní comhaid logáil charnadh.
        
I thus.xml, is féidir leat a shonrú méid uasta éagsúla don comhad logáil, i MegaBytes. Is é 1 an t-íosmhéid ceadaithe (BLIANTÚIL) . Is é 2000 an t-uasmhéid a cheadaítear (BLIANTÚIL) . Is é 20 an mainneachtain (BLIANTÚIL) . Mar shampla:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * Aon uair atosú túERDDAP™,
        ERDDAP™Déanann cóip chartlainne den log.txt agus logáil. comhaid txt.previous le stampa ama in ainm an chomhaid. Má bhí deacracht roimh an atosú, d'fhéadfadh sé a bheith úsáideach chun anailís a dhéanamh ar na comhaid gcartlann do leideanna maidir le cad a bhí an deacracht. Is féidir leat na comhaid chartlainne a scriosadh mura bhfuil gá leo a thuilleadh.
         
##### Ag cur le logáil.txt{#parsing-logtxt} 
ERDDAP's log. Níl an comhad txt deartha le haghaidh parsing (cé go bhféadfadh tú a bheith in ann a chruthú abairtí rialta a sliocht faisnéis atá ag teastáil) . Tá sé deartha chun cabhrú le figiúr an duine amach cad atá ag dul mícheart nuair a bhíonn rud éigin ag dul mícheart. Nuair a chuireann tú tuarascáil bug nó fadhb isteachERDDAP™forbróirí, nuair is féidir, le do thoil san áireamh go léir an fhaisnéis ón gcomhad log.txt a bhaineann leis an iarraidh troublesome.

Ar chúiseanna éifeachtúlachta,ERDDAP™scríobhann ach faisnéis a logáil. txt tar éis smután mór faisnéise carntha. Mar sin, má thugann tú cuairt ar logáil isteach. txt ceart tar éis earráid a tharla, Ní féidir faisnéis a bhaineann leis an earráid a bheith scríofa go fóill a log.txt. D'fhonn a fháil go foirfe suas chun dáta faisnéis ó log.txt, tabhair cuairt ar doERDDAP's[stádas html leathanach](#status-page). Nuair a bheidhERDDAP™próisis a iarraidh, flushes sé gach eolas ar feitheamh a log.txt.

Le haghaidhERDDAP™staitisticí úsáide, bain úsáid as an[Apache agus / nó Tomcat comhaid logáil](#tomcat-logs)in ionadERDDAP's log.txt. Tabhair faoi deara goERDDAP's[stádas html leathanach](#status-page)  (roinnt roinnt) agus[An Tuairisc Laethúil](#daily-report)  (níos mó) Tá líon mór de staitisticí úsáide réamhríomh ar do shon.
    
### taiseachas aeir: fliuch{#tomcat-logs} 
Más rud éERDDAP™Ní tús a chur suas mar a tharla earráid an-luath iERDDAP's startup, Beidh an teachtaireacht earráide a thaispeáint suas i comhaid log Tomcat ( *taiseachas aeir: fliuch* / logs / catalina. *lá atá inniu ann* .log nó *taiseachas aeir: fliuch* / logs / catalina.out) , ní i[ERDDAP's comhad logála.txt](#log).

Staitisticí Úsáide: Chun an chuid is mó den fhaisnéis gur mian le daoine a bhailiú ó comhad logála (e.g., staitisticí úsáide) , bain úsáid as an Apache agus / nó comhaid log Tomcat. Tá siad formáidithe nicely agus tá an cineál faisnéise. Tá uirlisí iomadúla chun anailís a dhéanamh orthu, mar shampla,[Amharc ar gach eolas](https://www.awstats.org),[Póg ElasticSearch ar](https://www.elastic.co/products/kibana), agus[Sraith an Domhain](https://jmeter.apache.org), ach cuardach a dhéanamh ar an ngréasán chun teacht ar an uirlis ceart chun do chuspóirí.

Tabhair faoi deara nach n-aithníonn na comhaid logála ach úsáideoirí mar seoltaí IP. Tá láithreáin ghréasáin ann chun cabhrú leat faisnéis a fháil a bhaineann le seoladh IP ar leith, m.sh.,[Cad é an ICR](https://whatismyipaddress.com/ip-lookup), ach ní bheidh tú de ghnáth in ann a fháil ar an ainm an úsáideora.

Freisin, mar gheall ar[DHAOINE](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol), d'fhéadfadh seoladh IP úsáideora ar leith a bheith difriúil ar laethanta éagsúla, nó d'fhéadfadh úsáideoirí éagsúla a bheith ar an seoladh IP céanna ag amanna éagsúla.

Nó, is féidir leat rud éigin a úsáid mar[Google Analytics](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision). Ach beware: nuair a úsáideann tú seirbhísí seachtracha cosúil le Google Analytics, tá tú ag tabhairt suas do úsáideoirí príobháideachta trí rochtain iomlán a thabhairt do Google ar a ngníomhaíocht ar do shuíomh a Google (agus daoine eile?) Is féidir a choinneáil go deo agus a úsáid chun aon chríche (b'fhéidir nach teicniúil, ach is dócha i gcleachtas) . Nach bhfuil do úsáideoirí thoil leis seo agus is dócha nach bhfuil ar an eolas go mbeidh siad a rianú ar do láithreán gréasáin, díreach mar is dócha nach bhfuil siad ar an eolas ar an méid atá siad á rianú ar beagnach gach suíomh gréasáin. Tá na laethanta, go leor úsáideoirí an-i gceist go bhfuil gach rud a dhéanann siad ar an ngréasán á monatóireacht ag na cuideachtaí móra (Google, Facebook, etc.) agus ag an rialtas, agus teacht ar an intrusion gan údar isteach ina saol (mar atá sa leabhar, 1984) . Tá sé seo tiomáinte go leor úsáideoirí a shuiteáil táirgí cosúil[Seirbhís do Chustaiméirí](https://www.eff.org/privacybadger/faq)a íoslaghdú rianú, a úsáid brabhsálaithe malartacha cosúil[Brabhsálaí Tor](https://www.torproject.org/)  (nó dul amach rianú i brabhsálaithe traidisiúnta) , agus a úsáid innill chuardaigh malartacha cosúil[Duck Duck Téigh](https://duckduckgo.com/). Má úsáideann tú seirbhís cosúil le Google Analytics, déan doiciméadú ar a laghad ar a úsáid agus ar na hiarmhairtí trí athrú a dhéanamh ar an&lt;standardPrivacyPolicy agus chlibERDDAP's
\\[taiseachas aeir: fliuch\\]/ webapps / erddap / WEB-INF / Ranganna/gov/noaa/pfel / erddap / util/messages.xml comhad.
    
### Ríomhphoist Logáil{#e-mail-log} 
*    **r-phostLogYEAR-MM-DD.txt**   
    ERDDAP™scríobhann i gcónaí an téacs de gach teachtaireachtaí ríomhphoist atá ag dul amach sa lá atá inniu ann ar ríomhphost LogYEAR-MM-DD.txt comhad i *Treoir do Thuismitheoirí* Toir ornáideacha agus Crainn ( *Treoir do Thuismitheoirí* a shonraítear i[crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml)) .
    * Más rud é nach féidir leis an bhfreastalaí a sheoladh amach teachtaireachtaí ríomhphoist, nó má tá tú cumraitheERDDAP™gan a sheoladh amach teachtaireachtaí ríomhphoist, nó má tá tú díreach aisteach, tá an comhad ar bhealach áisiúil a fheiceáil gach ceann de na teachtaireachtaí ríomhphoist a cuireadh amach.
    * Is féidir leat a scriosadh lá roimhe 'comhaid logáil r-phost má tá siad ag teastáil a thuilleadh.
         
### An Tuairisc Laethúil{#daily-report} 
Tá go leor faisnéise úsáideach ag an Tuarascáil Laethúil - an fhaisnéis go léir ó doERDDAP's[/erddap/status.htmlleathanach na leathanach](#status-page)agus níos mó.
    * Is é an achoimre is iomláine de doERDDAP's stádas.
    * I measc staitisticí eile, áirítear ann liosta de thacair sonraí nach raibh ualach agus na heisceachtaí a ghin siad.
    * Tá sé a ghintear nuair a thosaíonn tú suasERDDAP™  (díreach tar éisERDDAP™bailchríocha ag iarraidh a luchtú gach ceann de na tacair sonraí) agus a ghintear go luath tar éis 7 am áitiúil gach maidin.
    * Aon uair a ghintear é, tá sé scríofa[ERDDAP's comhad logála.txt](#log).
    * Aon uair a ghintear é, tá sé ríomhphost a&lt;r-phostDailyReportsTo agus&lt;ríomhphost Gachthing Le haghaidh (a shonraítear in[crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml)) ar choinníoll gur bhunaigh tú an córas ríomhphoist (i thus.xml) .

### Leathanach Baile{#status-page} 
Is féidir leat féachaint ar stádas doERDDAP™ó aon bhrabhsálaí ag dul chuig&lt;crios fuar: aon sonraí/erddap/status.html
* Tá an leathanach seo a ghintear dinimiciúil, mar sin tá sé i gcónaí suas-le-an-moment staitisticí do doERDDAP.
* Áirítear leis staitisticí maidir le líon na n-iarratas, úsáid chuimhne, rianta Stack snáithe, an tascTrí, etc.
* Toisc gur féidir leis an Leathanach Stádas a fheiceáil ag duine ar bith, ní chuireann sé san áireamh go leor an oiread eolais mar an[An Tuairisc Laethúil](#daily-report).
         
### Ag cur le tacair shonraí{#addingchanging-datasets} 
ERDDAP™rereads de ghnáthdatasets.xmlgach rud *riachtanais uisce: measartha*   (a shonraítear i[crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml)) . Mar sin, is féidir leat athruithe a dhéanamh ardatasets.xmlam ar bith, fiú agusERDDAP™Tá sé ag rith.
Beidh tacar sonraí nua a bhrath go luath, de ghnáth laistigh *riachtanais uisce: measartha* .
Déanfar tacar sonraí athraithe a athlódáil nuair a bhíonn sé *Athluchtú GachNMinutes* Sean agus óg (mar a shonraítear indatasets.xml) .
    
#### Amharc ar gach eolas{#flag} 
*    **[Amharc ar gach eolas](#flag)Seirbhís do ChustaiméiríERDDAP™Bain triail as a Athlódáil tacar Sonraí Mar Soon Mar is féidir** 
    
    *   ERDDAP™Ní thabharfar faoi deara aon athruithe ar thus tacar sonraí idatasets.xmlgo dtí goERDDAP™athluchtaigh an tacar sonraí.
         
    * A insintERDDAP™a athlódáil tacar sonraí a luaithe is féidir (roimh an tacar sonraí&lt;Bheadh reloadEveryNMinutes ^ faoi deara é a athlódáil), comhad a chur i *Treoir do Thuismitheoirí* taiseachas aeir: fliuch ( *Treoir do Thuismitheoirí* a shonraítear i[crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml)) go bhfuil an t-ainm céanna leis an tacar sonraídatasetID.
Níl an Tweet seo ar fáilERDDAP™chun iarracht a athlódáil go ASAP tacar sonraí.
Beidh an leagan d'aois den tacar sonraí ar fáil d'úsáideoirí go dtí go bhfuil an leagan nua ar fáil agus a swapped atomically i bhfeidhm.
Le haghaidhEDDGridÓ Fianáin agus EDDTable FromFiles, beidh an tacar sonraí athlódáil breathnú ar chomhaid nua nó athraithe, iad siúd a léamh, agus iad a ionchorprú isteach sa tacar sonraí. Mar sin, tá an t-am a athlódáil ag brath ar líon na gcomhad nua nó athraithe.
Má tá an tacar sonraí gníomhach = "false",ERDDAP™a bhaint as an tacar sonraí.
         
##### Bad Comhaid Bratach{#bad-files-flag} 
* Tá leagan amháin den eolaire / bradach an eolaire / blag. (Curtha iERDDAP™v2.12.)   
Má chuir tú comhad sa *Treoir do Thuismitheoirí* / BadFilesFlag eolaire ledatasetIDmar an t-ainm comhaid (an t-ábhar comhad nach ábhar) , ansin chomh luath agusERDDAP™Feiceann an badFiles Bratach comhad,ERDDAP™beidh:
    
    1. Scrios an comhad badFilesFlag.
    2. Scrios an badFiles.nccomhad comhad (má tá ceann amháin) , a bhfuil an liosta de na comhaid dona don tacar sonraí.
Le haghaidh tacar sonraí cosúilEDDGridSideBySide go bhfuil childDatasets, scriosann sé seo freisin ar an badFiles.nccomhad do gach tacar sonraí leanaí.
    3. Athlódáil an ASAP tacar sonraí.
    
Dá bhrí sin, na cúiseanna seoERDDAP™chun iarracht a dhéanamh arís a bheith ag obair leis na comhaid roimhe (go hearráideach?) marcáilte chomh dona.
         
##### Bratach crua{#hard-flag} 
* Tá leagan eile den eolaire / brada an eolaire / cruaFlag. (Curtha iERDDAP™v1.74.)   
Má chuir tú comhad i *Treoir do Thuismitheoirí* / HardFlag ledatasetIDmar an t-ainm comhaid (an t-ábhar comhad nach ábhar) , ansin chomh luath agusERDDAP™Feiceann an crua Bratach comhad,ERDDAP™beidh:
    
    1. Scrios an comhad cruaFlag.
    2. Bain an tacar sonraí óERDDAP.
    3. Scrios an fhaisnéis go léir aERDDAP™Tá stóráil mar gheall ar an tacar sonraí.
Le haghaidhEDDGridÓ Fianáin agus EDDTable Fo-aicmí FromFiles, scriosann sé seo an bunachar sonraí inmheánach de chomhaid sonraí agus a n-ábhar.
Le haghaidh tacar sonraí cosúilEDDGridSideBySide go bhfuil childDatasets, scriosann sé seo freisin ar an mbunachar sonraí inmheánach de chomhaid sonraí agus a n-ábhar do gach tacar sonraí leanaí.
    4. Athlódáil an tacar sonraí.
Le haghaidhEDDGridÓ Fianáin agus EDDTable Fo-aicmí FromFiles, Cúiseanna seoERDDAP™a reread **go léir** de na comhaid sonraí. Dá bhrí sin, tá an t-am athluchtaithe ag brath ar líon iomlán na gcomhad sonraí sa tacar sonraí. Mar gheall ar baineadh an tacar sonraí óERDDAP™nuair a tugadh faoi deara an cruaFlag, beidh an tacar sonraí ar fáil go dtí go gcríochnaíonn an tacar sonraí a athlódáil. Bí othar. Féach ar an[logáil isteach.](#log)comhad más mian leat a fheiceáil cad atá ar siúl.
    
Scriosann an leagan cruaFlag faisnéis stóráilte an tacar sonraí fiú mura bhfuil an tacar sonraí luchtaithe faoi láthair iERDDAP.
    
Crua crua Tá bratacha an-úsáideach nuair a dhéanann tú rud éigin a chruthaíonn athrú ar conasERDDAP™léann agus léiríonn na sonraí foinse, mar shampla, nuair a shuiteáil tú leagan nua deERDDAP™nó nuair a rinne tú athrú ar sainmhíniú tacar sonraí idatasets.xml
    
* Tá an t-ábhar ar an bhratach, badFilesFlag, agus comhaid cruaFlag nach mbaineann.ERDDAP™ach féach ar an ainm comhaid a fháil ar andatasetID.
     
* I idir athluchtuithe tacar sonraí mór,ERDDAP™Breathnaíonn go leanúnach le haghaidh bratach, badFilesFlag, agus comhaid cruaFlag.
     
* Tabhair faoi deara go nuair a bhíonn tacar sonraí athluchtaithe, gach comhad sa *Treoir do Thuismitheoirí* / Baile[taisce taisce taisce](#cached-responses)/ Baile *datasetID* eolaire a scriosadh. Áirítear leis seo.ncagus comhaid íomhá atá i dtaisce de ghnáth ar feadh ~ 15 nóiméad.
     
* Tabhair faoi deara go má áirítear xml an tacar sonraí[gníomhach = "False"](/docs/server-admin/datasets#active), cuirfidh bratach faoi deara an tacar sonraí a dhéanamh neamhghníomhach (má tá sé gníomhach) , agus in aon chás, gan athlódáil.
     
* Aon amERDDAP™Ritheann LoadDatasets a dhéanamh athlódáil mór (an t-athluchtú timed rialaithe ag&lt;loadDatasetsMinMinutes ^) nó mion-athluchtú (mar thoradh ar bhratach sheachtrach nó inmheánach) ,ERDDAP™léann gach&lt;cliceáil grianghraf a mhéadú&lt;cliceáil grianghraf a mhéadú&lt;úsáideoir bhéil,&lt;iarratas Blacklist ú,&lt;mallDownTroubleMillis bhéil, agus&lt;suibscríobh RíomhphostBlacklist lí clibeanna agus lasca chuig na socruithe nua. Mar sin, is féidir leat a úsáid bratach mar bhealach a fháilERDDAP™athruithe ar na clibeanna ASAP a thabhairt faoi deara.

##### Socraigh Bratach Sonraí{#set-dataset-flag} 
*  ERDDAP™Tá seirbhís gréasáin ionas gur féidir bratacha a shocrú trí URLanna.
    
    * Mar shampla,
         https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789   
         (go bhfuil bratach bréige Príomhscéalta an Iarthair) Beidh a leagtar bratach don tacar sonraí rPmelTao.
    * Tá bratach éagsúla do gachdatasetID.
    * Is féidir le riarthóirí liosta de URLanna bratacha a fheiceáil do gach tacar sonraí trí bhreathnú ag bun a gcuid[An Tuairisc Laethúil](#daily-report)ríomhphost.
    * Ba chóir do riarthóirí na URLanna seo a chóireáil mar rún, ós rud é go dtugann siad ceart do dhuine tacar sonraí a athshocrú ag toil.
    * Má cheapann tú go bhfuil na bratacha tar éis titim isteach i lámha duine a bhfuil abusing iad, is féidir leat athrú&lt;cliceáil grianghraf a mhéadú[crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml)agus atosúERDDAPa chur i bhfeidhmERDDAP™a ghiniúint agus a úsáid sraith éagsúla de flagKeys.
    * Má athraíonn tú&lt;flagKeyKeyKey bhéil, scriosadh gach ceann de na síntiúis d'aois (féach ar an liosta i do Thuarascáil Laethúil) agus cuimhnigh na URLanna nua a sheoladh chuig na daoine a bhfuil tú ag iarraidh iad a bheith acu.
    
Is féidir leis an gcóras bratach a bheith mar bhonn le haghaidh meicníochta níos éifeachtaí chun insintERDDAP™nuair a athlódáil tacar sonraí. Mar shampla, d'fhéadfá tacar sonraí a shocrú&lt;reloadEveryNMinutes ú le líon mór (e.g., 10080 = 1 seachtain) . Ansin, nuair a fhios agat go bhfuil an tacar sonraí athraithe (b'fhéidir toisc chuir tú comhad chuig an tacar sonraí eolaire sonraí) , a leagtar bratach ionas go mbeidh an tacar sonraí a athlódáil chomh luath agus is féidir. Bratacha le feiceáil de ghnáth go tapa. Ach má tá an snáithe LoadDatasets gnóthach cheana féin, d'fhéadfadh sé a bheith ina tamaill sula bhfuil sé ar fáil chun gníomhú ar an brat. Ach tá an córas bratach i bhfad níos sofhreagrach agus i bhfad níos éifeachtaí ná leagan síos&lt;reloadEveryNMinutes ú le líon beag.
    
#### Seirbhís do Chustaiméirí{#removing-datasets} 
Má tá tacar sonraí gníomhach iERDDAP™agus is mian leat é a dhíghníomhachtú go sealadach nó go buan:
1. Idatasets.xmldon tacar sonraí, leagtha[gníomhach = "False"](/docs/server-admin/datasets#active)sa chlib tacar sonraí.
2. Fan le haghaidhERDDAP™a bhaint as an tacar sonraí le linn an athluchtú mór eile nó[a leagtar bratach](#flag)don tacar sonraí a insintERDDAP™fógra a thabhairt don athrú seo a luaithe is féidir. Nuair a dhéanann tú seo,ERDDAP™Ní caith amach aon fhaisnéis a d'fhéadfadh sé a bheith stóráilte mar gheall ar an tacar sonraí agus cinnte nach bhfuil aon rud a dhéanamh leis na sonraí iarbhír.
3. Ansin is féidir leat a fhágáil ar an gníomhach = "False" tacar sonraí idatasets.xmlnó é a bhaint.
         
#### Cathain a dhéantar Sonraí a Athlódáil?{#when-are-datasets-reloaded} 
Is snáithe ar a dtugtar RunLoadDatasets an snáithe máistir a rialaíonn nuair a bhíonn tacair sonraí athluchtaithe. Rith Luchtaigh Datasets lúba go deo:

1. Tugann RunLoadDatasets an t-am reatha.
2. RunLoadDatasets Tosaíonn snáithe LoadDatasets a dhéanamh "majorLoad". Is féidir leat eolas a fheiceáil faoi na mór-Luchtaigh atá ann faoi láthair / roimhe seo ag barr doERDDAP's
    [/erddap/status.htmlleathanach na leathanach](#status-page)  (mar shampla,[sampla leathanach stádas](https://coastwatch.pfeg.noaa.gov/erddap/status.html)) .
    
    1. Déanann LoadDatasets cóip dedatasets.xml.
    2. LoadDatasets léann tríd an chóip dedatasets.xmlagus, do gach tacar sonraí, Feiceann más gá an tacar sonraí a bheith (reo) luchtaithe nó bainte.
        * Má tá[bratach bratach](#flag)Tá comhad ann don tacar sonraí seo, scriostar an comhad agus baintear an tacar sonraí má tá sé gníomhach = "false" nó (reo) luchtaithe má gníomhach = "true" (beag beann ar aois an tacar sonraí) .
        * Má tá an tacar sonraí ar dataset.xml smután gníomhach = "false" agus tá an tacar sonraí luchtaithe faoi láthair (gníomhach gníomhach) , tá sé díluchtaithe (as oifig) .
        * Má tá an tacar sonraí gníomhach = "true" agus nach bhfuil an tacar sonraí luchtaithe cheana féin, tá sé luchtaithe.
        * Má tá an tacar sonraí gníomhach = "true" agus tá an tacar sonraí luchtaithe cheana féin, déantar an tacar sonraí a athlódáil má tá aois an tacar sonraí (am ó ualach deireanach) níos mó ná a&lt;reload Gach Neamhghnách (réamhshocraithe = 10080 nóiméad) , ar shlí eile, fágtar an tacar sonraí ina n-aonar.
    3. LoadDatasets bailchríocha.
    
Fanann an snáithe RithLoadDatasets don snáithe LoadDatasets a chríochnú. Má thógann LoadDatasets níos faide ná ualach minicíocht uisce: flúirseach (mar atá sonraithe i thus.xml) , cuireann RunLoadDatasets isteach ar an snáithe LoadDatasets. Go hidéalach, fógraí LoadDatasets an isteach agus bailchríocha. Ach mura dtugann sé faoi deara an briseadh laistigh de nóiméad, glaonna RunLoadDatasets loadDatasets. stad stad stad () , nach bhfuil inmhianaithe.
3. Cé go bhfuil an t-am ó thús an mhórdhíola deireanach níos lú ná ualachDatasets minicíocht uisce: flúirseach (mar atá sonraithe i thus.xml, m.sh., 15 nóiméad) , RunLoadDatasets Breathnaíonn arís agus arís eile le haghaidh[bratach bratach](#flag)comhaid sa *Treoir do Thuismitheoirí* / bradach eolaire. Má tá ceann amháin nó níos mó comhad bratach le fáil, scriostar iad, agus a thosaíonn RunLoadDatasets snáithe a dhéanamh "minor Luchtaigh" (Luchtaigh mór = False) . Ní féidir leat a fheiceáil mion-eolas Luchtaigh ar doERDDAP's[/erddap/status.htmlleathanach na leathanach](#status-page).
    1. Déanann LoadDatasets cóip dedatasets.xml.
    2. LoadDatasets léann tríd an chóip dedatasets.xmlagus, i gcás gach tacar sonraí a raibh comhad bratach ann:
        * Má tá an tacar sonraí ar dataset.xml smután gníomhach = "false" agus tá an tacar sonraí luchtaithe faoi láthair (gníomhach gníomhach) , tá sé díluchtaithe (as oifig) .
        * Má tá an tacar sonraí gníomhach = "true", is é an tacar sonraí (reo) luchtaithe, beag beann ar a aois. Déantar neamhaird ar thacair sonraí neamh-fhleasc.
    3. LoadDatasets bailchríocha.
4. Rith Luchtaigh Téann tacar sonraí ar ais go dtí céim 1.

Nótaí:
* Ag tosú
Nuair a restart túERDDAP™, Tá gach tacar sonraí le gníomhach = "true" luchtaithe.
* An tSochaí
Nuair a bhíonn tacar sonraí (reo) luchtaithe, a taisce (lena n-áirítear aon chomhaid freagartha sonraí agus/nó comhaid íomhá) Tá emptied.
* Go leor de Datasets
Má tá a lán de na tacair shonraí agat agus / nó go bhfuil tacar sonraí amháin nó níos mó mall go (reo) ualach, d'fhéadfadh snáithe LoadDatasets a ghlacadh i bhfad chun a chuid oibre a chríochnú, b'fhéidir fiú níos faide ná ualachDatasets Miontuairiscí.
* Snáithe Ualaigh amháin
Níl níos mó ná snáithe amháin ag rith ag an am céanna. Má tá bratach leagtha nuair a bhíonn LoadDatasets ag rith cheana féin, ní bheidh an bhratach is dócha a thabhairt faoi deara nó a ghníomhaigh ar go dtí go bailchríocha snáithe LoadDatasets ag rith. D'fhéadfá a rá: "Sin dúr. Cén fáth nach bhfuil tú tús ach a bunch de snáitheanna nua a luchtú tacar sonraí?" Ach má tá tú go leor de na tacair sonraí a fháil sonraí ó fhreastalaí iargúlta amháin, beidh fiú amháin snáithe LoadDatasets chur strus suntasach ar an bhfreastalaí iargúlta. Is é an rud céanna fíor má tá tú go leor de na tacair sonraí a fháil sonraí ó chomhaid ar RAID amháin. Tá tuairisceáin a laghdú go tapa ó bheith níos mó ná snáithe amháin LoadDatasets.
* Bratach = ASAP
Socrú bratach comharthaí ach gur chóir an tacar sonraí a bheith (reo) luchtaithe chomh luath agus is féidir, ní gá go díreach. Mura bhfuil aon snáithe LoadDatasets ag rith faoi láthair, tosóidh an tacar sonraí a athlódáil laistigh de chúpla soicind. Ach má tá snáithe LoadDatasets ag rith faoi láthair, is dócha nach ndéanfar an tacar sonraí a athlódáil go dtí go mbeidh an snáithe LoadDatasets críochnaithe.
* Bratach Comhad Scriosta
Go ginearálta, má chuir tú comhad bratach sa *Treoir do Thuismitheoirí* Seirbhís do Chustaiméirí (trí chuairt a thabhairt ar bhratach an tacar sonraí Url nó a chur comhad iarbhír ann) , beidh an tacar sonraí a athlódáil de ghnáth go han-luath tar éis an comhad bratach a scriosadh.
* Bratach i gcoinne athlódáil Beaga Déan Teagmháil Linn
Má tá tú ar bhealach seachtrach a fhios agam nuair is gá tacar sonraí a athluchtú agus má tá sé áisiúil duit, is é an bealach is fearr chun a chinntiú go bhfuil tacar sonraí i gcónaí cothrom le dáta a shocrú a athluchtú GachNMinutes le líon mór (10080?) agus a leagtar bratach (trí script?) aon uair is gá é a athlódáil. Is é sin an córas goEDDGridÓn Erddap agus EDDTableFromErddap úsáid a fháil teachtaireachtaí gur gá an tacar sonraí a athlódáil.
* Féach ar log.txt
Tá go leor faisnéise ábhartha scríofa chuig an *Treoir do Thuismitheoirí* / logs / log.txt comhad. Más rud é nach bhfuil rudaí ag obair mar atá tú ag súil, ag féachaint ar logáil. txt ligeann duit an fhadhb a dhiagnóiseadh trí a fháil amach go díreach cadERDDAP™rinne.
    
    * Cuardaigh le haghaidh "majorLoad = fíor" chun tús a chur le snáitheanna LoadDataset mór.
    * Cuardaigh le haghaidh "majorLoad = False" chun tús mion snáithe LoadDatasets.
    * Cuardaigh le haghaidh tacar sonraí ar leithdatasetIDle haghaidh faisnéise faoi (reo) luchtaithe nó queried.
        
          
         
#### Freagraí Cached{#cached-responses} 
Go ginearálta,ERDDAP™Ní taisce (stóráil siopa) freagraí ar iarratais úsáideora. Ba é an réasúnaíocht go mbeadh an chuid is mó iarrataí a bheith beagán difriúil mar sin ní bheadh an taisce a bheith an-éifeachtach. Is iad na heisceachtaí is mó iarrataí ar chomhaid íomhá (atá i dtaisce ó brabhsálaithe agus cláir cosúilGoogle Earthgo minic íomhánna rerequest) agus iarratais.nccomhaid comhad (toisc nach féidir iad a chruthú ar-an-eitilt) .ERDDAP™siopaí gach tacar sonraí comhaid i dtaisce i eolaire éagsúla: *Treoir do Thuismitheoirí* Seirbhís do Chustaiméirí *datasetID* ós rud é go bhféadfadh eolaire taisce amháin go bhfuil líon mór de na comhaid a d'fhéadfadh a bheith mall chun rochtain.
Comhaid a bhaint as an taisce ar cheann de thrí chúis:
* Gach comhad sa taisce a scriosadh nuairERDDAP™Tá restarted.
* Go tréimhsiúil, aon chomhad níos mó ná&lt;riachtanais uisce: measartha (mar a shonraítear in[crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml)) a scriosadh. Comhaid a aistriú sa taisce bunaithe ar aois (Níl an Tweet seo ar fáil) cinntíonn nach mbeidh comhaid fanacht sa taisce an-fhada. Cé go bhféadfadh sé cosúil le hiarratas ar leith ba chóir ar ais i gcónaí ar an freagra céanna, nach bhfuil fíor. Mar shampla, atabledapiarraidh lena n-áirítear &amp; quot; *roinnt roinnt Am agus am* a athrú má thagann sonraí nua don tacar sonraí. Agus iarraidh griddap lena n-áirítear\\[deireanach\\]don ghné ama a athrú má thagann sonraí nua don tacar sonraí.
* Íomhánna a léiríonn coinníollacha earráide atá i dtaisce, ach amháin ar feadh cúpla nóiméad (tá sé ina staid deacair) .
* Gach uair go bhfuil tacar sonraí athluchtaithe, gach comhad i taisce tacar sonraí a scriosadh. Toisc go bhféadfadh iarratais a bheith ar an"last"innéacs i tacar sonraí gridded, Is féidir comhaid sa taisce a bheith neamhbhailí nuair a bhíonn tacar sonraí a athlódáil.
         
#### Sonraí a stóráil{#stored-dataset-information} 
I gcás gach cineál tacar sonraí,ERDDAP™Bailíonn go leor faisnéise nuair a bhíonn tacar sonraí luchtaithe agus coimeádann sin i gcuimhne. Ceadaíonn sé seoERDDAP™chun freagra a thabhairt go han-tapa le cuardaigh, iarrataí ar liostaí de thacair sonraí, agus iarrataí ar fhaisnéis faoi tacar sonraí.

Le haghaidh roinnt cineálacha tacar sonraí (go háiritheEDDGridCóip, EDDTableCopy,EDDGridÓ dhúchas *X* Comhaid, agus EDDTableFrom *X* Amharc ar gach eolas) ,ERDDAP™siopaí ar diosca roinnt eolais mar gheall ar an tacar sonraí atá athúsáid nuair a bhíonn an tacar sonraí athluchtaithe. Luasann sé seo go mór an próiseas athluchtaithe.

* Tá cuid de na comhaid faisnéise tacar sonraí inléite ag an duine.jsoncomhaid agus a stóráil i *Treoir do Thuismitheoirí* / tacar sonraí / *cliceáil grianghraf a mhéadúdatasetID* .
*   ERDDAP™ach scriosann na comhaid seo i gcásanna neamhghnácha, m.sh., má chuireann tú nó a scriosadh athróg ó na tacar sonraídatasets.xmlchunk.
* An chuid is mó athruithe ar tacar sonraídatasets.xmlSeirbhís do Chustaiméirí (e.g., athrú tréith domhanda nó tréith athraitheach) nach gá go scriosann tú na comhaid seo. Beidh athlódáil tacar sonraí rialta láimhseáil na cineálacha athruithe. Is féidir leat insintERDDAP™a athlódáil ASAP tacar sonraí trí shocrú[bratach bratach](#flag)don tacar sonraí.
* Mar an gcéanna, Beidh an Chomh maith leis, a scriosadh, nó a athrú comhaid sonraí a láimhseáil nuairERDDAP™athluchtaigh tacar sonraí. AchERDDAP™a thabhairt faoi deara an cineál athraithe seo go luath agus go huathoibríoch má tá an tacar sonraí ag baint úsáide as an [&lt;updateEveryNMillis . (/ disciplíní / sonraí #updateeverynmillis) córas.
* Ba chóir go mbeadh sé ach annamh is gá chun tú a scriosadh na comhaid. An staid is coitianta nuair is gá duit a bhfeidhmERDDAP™an fhaisnéis stóráilte a scriosadh (toisc go bhfuil sé lasmuigh den dáta / mícheart agus ní bheidh sé socraithe go huathoibríoch agERDDAP) nuair a dhéanann tú athruithe ar an tacar sonraídatasets.xmlsmután a dhéanann difear conasERDDAP™léirmhíniú sonraí sna comhaid sonraí foinse, mar shampla, athrú ar an athróg ama teaghrán formáid.
* A scriosadh comhad faisnéise a stóráil tacar sonraí óERDDAP™go bhfuil sé ag rith (fiú mura bhfuil an tacar sonraí luchtaithe faoi láthair) , a leagtar[crua-earraí Amharc ar gach eolas](#hard-flag)don tacar sonraí sin. Cuimhnigh go má tá tacar sonraí comhiomlán de líon mór de na comhaid, d'fhéadfadh athlódáil an tacar sonraí a ghlacadh am suntasach.
* A scriosadh comhad faisnéise atá stóráilte tacar sonraí nuairERDDAP™Níl sé ag rith, reáchtáil[Seirbhís do Chustaiméirí](/docs/server-admin/datasets#dasdds)don tacar sonraí (atá níos éasca ná figuring ina bhfuil eolaire an info suite agus a scriosadh na comhaid de láimh) . Cuimhnigh go má tá tacar sonraí comhiomlán de líon mór de na comhaid, d'fhéadfadh athlódáil an tacar sonraí a ghlacadh am suntasach.
         
### Stádas Cuimhne{#memory-status} 
ERDDAP™Níor chóir riamh tuairteála nó reoite suas. Má dhéanann sé, is é ceann de na cúiseanna is dóchúla ná cuimhne leordhóthanach. Is féidir leat monatóireacht a dhéanamh ar úsáid chuimhne ag féachaint ar an leathanach gréasáin status.html, lena n-áirítear líne cosúil

0 gc glaonna, 0 iarratais a chaillfidh, agus 0 contúirteach MemoryEmail ó deireanach mór LoadDatasets

 (iad sin de réir a chéile imeachtaí níos tromchúisí)   
agus MB inUse agus C colúin i dtábla na staitisticí. Is féidir leat a insint conas cuimhne-stress doERDDAP™ag breathnú ar na huimhreacha. Léiríonn líon níos airde strus níos mó.

* Ba chóir go mbeadh inUse MB i gcónaí níos lú ná leath an[leagan cuimhne \\-Xmx](/docs/server-admin/deploy-install#memory). Tá uimhreacha níos mó comhartha dona.
* C glaonna léiríonn líon na n-amannaERDDAP™ar a dtugtar an bailitheoir truflais chun iarracht a mhaolú úsáid cuimhne ard. Má fhaigheann sé seo a bheith ^100, go bhfuil comhartha trioblóide tromchúiseach.
* Léiríonn chaillfidh líon na n-iarratas ag teacht isteach a bhí chaillfidh (le uimhir earráide HTTP 503, Seirbhís unavailable) toisc go raibh úsáid chuimhne ró-ard cheana féin. Go hidéalach, níor chóir aon iarratais a chaillfidh. Tá sé ceart go leor má tá cúpla iarratas a chaillfidh, ach comhartha de dtrioblóid tromchúiseach má tá go leor chaillfidh.
* contúirteacha MemoryEmails - Má éiríonn úsáid chuimhne contúirteach ard,ERDDAP™seol ríomhphost chuig na seoltaí ríomhphoist atá liostaithe in&lt;ríomhphost Gachthing Le haghaidh (i thus.xml) le liosta de na hiarrataí úsáideora gníomhacha. Mar a deir an ríomhphost, cuir na ríomhphoist seo ar aghaidh chuig Chris. John ag noaa. gov ionas gur féidir linn an t-eolas a úsáid chun leaganacha amach anseo a fheabhsúERDDAP.
     

Má tá doERDDAP™Tá cuimhne-strused:
* Smaoinigh allocating níos mó de do fhreastalaí cuimhne aERDDAP™ag athrú an Tomcat[- leagan cuimhne Xmx](/docs/server-admin/deploy-install#memory).
* Má tá tú a leithdháileadh cheana féin cuimhne an oiread agus is féidir leat aERDDAP™trí -Xmx, mheas ag ceannach cuimhne níos mó do do fhreastalaí. Tá Cuimhne saor (i gcomparáid le praghas freastalaí nua nó do chuid ama) &#33; Ansin méadú -Xmx.
* Idatasets.xml, leagtha&lt;GridThreads agus 1, leagtha&lt;nTableThreads × go 1, agus a leagtar&lt;Déan Teagmháil Linn
* Féach ar na hiarratais i log.txt le haghaidh neamhéifeachtach nó troublesome (ach dlisteanach) iarratais. Cuir a seoltaí IP chuig&lt;iarratas Blacklist × idatasets.xml. Áirítear leis an teachtaireacht earráide blacklistERDDAP™seoladh ríomhphoist an riarthóra leis an dóchas go mbeidh na húsáideoirí teagmháil a dhéanamh leat ionas gur féidir leat obair leo a úsáidERDDAP™níos éifeachtaí. Tá sé go maith a choinneáil ar liosta de seoltaí IP tú blacklist agus cén fáth, ionas gur féidir leat a bheith ag obair leis na húsáideoirí má tá siad i dteagmháil leat.
* Féach ar na hiarrataí i log.txt ar iarratais ó úsáideoirí mailíseacha. Cuir a seoltaí IP chuig&lt;iarratas Blacklist × idatasets.xml. Má tá iarratais den chineál céanna ag teacht ó seoladh IP il den chineál céanna, is féidir leat roinnt seirbhísí a-is a úsáid (e.g.,[ https://www.whois.com/whois/ ](https://www.whois.com/whois/)) a fháil amach an raon seoltaí IP ón bhfoinse sin agus blacklist an raon ar fad. Féach ar an [&lt;iarratas a dhéanamh ar dhoiciméadacht bhéil? (/ ollscoileanna eile sa mhargadh) .
         
#### Seirbhís do Chustaiméirí{#outofmemoryerror} 
Nuair a bhunaigh túERDDAP™, tú a shonrú ar an méid uasta de chuimhne goJavais féidir é a úsáid tríd an[leagan \\-Xmx](/docs/server-admin/deploy-install#memory). Más rud éERDDAP™riachtanais riamh cuimhne níos mó ná sin, beidh sé caith java. lang. OutOfMemoryEror.ERDDAP™a dhéanann a lán de na seiceáil a chumasú dó a láimhseáil go earráid gracefully (e.g., mar sin beidh iarraidh troublesome theipeann, ach coinníonn an córas a ionracas) . Ach uaireanta, an earráid damáistí sláine an chórais agus tá tú a atosúERDDAP. Tá súil againn, is é sin annamh.

Is é an réiteach tapa agus éasca le OutOfMemoryError a mhéadú ar an[leagan \\-Xmx](/docs/server-admin/deploy-install#memory), ach ní ba chóir duit a mhéadú riamh ar an -Xmx leagan síos go dtí níos mó ná 80% den chuimhne fisiciúil sa fhreastalaí (e.g., le haghaidh freastalaí 10GB, ná a leagtar -Xmx os cionn 8GB) . Tá Cuimhne réasúnta saor, mar sin d'fhéadfadh sé a bheith ina rogha maith chun cur leis an chuimhne sa fhreastalaí. Ach má tá tú maxed amach an chuimhne sa fhreastalaí nó ar chúiseanna eile nach féidir a mhéadú, is gá duit chun déileáil níos mó go díreach leis an chúis an OutOfMemoryError.

Má fhéachann tú ar an[logáil isteach.](#log)comhad a fheiceáil cadERDDAP™a bhí ag déanamh nuair a d'eascair an earráid, is féidir leat a fháil de ghnáth leid maith maidir leis an chúis an OutOfMemoryEror. Tá go leor cúiseanna féideartha, lena n-áirítear:

* Is féidir le comhad sonraí ollmhór amháin a chur faoi deara an OutOfMemoryEror, go háirithe, comhaid sonraí ASCII ollmhór. Más é seo an fhadhb, ba chóir é a bheith soiléir mar gheall arERDDAP™beidh theipeann a luchtú an tacar sonraí (le haghaidh tacar sonraí tabular) nó sonraí a léamh ón gcomhad sin (le haghaidh tacar sonraí gridded) . Is é an réiteach, más féidir, an comhad a roinnt i gcomhaid éagsúla. Go hidéalach, is féidir leat an comhad a roinnt i smutáin loighciúil. Mar shampla, má tá an comhad fiú 20 mí na sonraí, é a roinnt i 20 comhaid, gach ceann acu le luach 1 mhí na sonraí. Ach tá buntáistí fiú má tá an comhad is mó scoilte suas treallach. Tá buntáistí éagsúla ag an gcur chuige seo: a) Laghdóidh sé seo an chuimhne is gá chun na comhaid sonraí a léamh go 1/20th, toisc go bhfuil ach comhad amháin a léamh ag an am. b) Go minic,ERDDAP™Is féidir déileáil le hiarrataí i bhfad níos tapúla toisc go bhfuil sé ach chun breathnú i gceann amháin nó cúpla comhad a aimsiú na sonraí le haghaidh iarratas ar leith. c) Má tá bailiú sonraí leanúnach, ansin is féidir leis an 20 comhad atá ann cheana féin a athrú, agus ní mór duit ach comhad amháin, beag, nua a mhodhnú chun fiú na sonraí an mhí seo chugainn a chur leis an tacar sonraí.
* Is féidir le hiarratas ollmhór amháin a chur faoi deara an OutOfMemoryEror. Go háirithe, cuid de naorderByTá roghanna an freagra ar fad i gcuimhne don dara (e.g., saghas a dhéanamh) . Má tá an freagra ollmhór, is féidir é mar thoradh ar an earráid. Beidh i gcónaí roinnt iarrataí atá, ar bhealaí éagsúla, ró-mhór. Is féidir leat an fhadhb a réiteach tríd an suíomh -Xmx a mhéadú. Nó, is féidir leat a spreagadh an t-úsáideoir a dhéanamh sraith d'iarratais níos lú.
* Ní dócha go mbeadh líon mór de na comhaid a chur faoi deara an t-innéacs comhad goERDDAP™Cruthaíonn sé a bheith chomh mór go mbeadh an comhad a chur faoi deara an earráid. Má glacadh againn go n-úsáideann gach comhad 300 bytes, ansin bheadh 1,000,000 comhaid a ghlacadh ach suas 300MB. Ach a chur faoi deara datasets le líon mór de chomhaid sonraí fadhbanna eile le haghaidhERDDAP, go háirithe, tógann sé ar feadh i bhfadERDDAP™na comhaid sonraí sin go léir a oscailt agus iad ag freagairt d'iarraidh úsáideora ar shonraí. Sa chás seo, d'fhéadfadh an réiteach a bheith a chomhiomlánú na comhaid ionas go bhfuil níos lú comhaid sonraí. I gcás tacar sonraí tabular, is minic go hiontach má shábháil tú na sonraí ón tacar sonraí reatha i[CF Diosca Geometris Sampling (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Ragged Array comhaid sonraí (a iarraidh.ncCF comhaid óERDDAP) agus ansin a dhéanamh tacar sonraí nua. Is féidir na comhaid a láimhseáil go héifeachtach leisERDDAP's[EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles). Má tá siad eagraithe go loighciúil (gach ceann acu le sonraí le haghaidh smután de spás agus am) ,ERDDAP™is féidir le sonraí a bhaint astu go han-tapa.
* Le haghaidh tacar sonraí tabular a úsáideann an [&lt;subsetVariablesú (Sonraí Teagmhála) tréith,ERDDAP™Déanann tábla de teaglaim ar leith de na luachanna na n-athróg. Le haghaidh tacar sonraí ollmhór nó nuair&lt;subsetVariables^ é misconfigured, is féidir an tábla seo a bheith mór go leor chun a chur faoi deara OutOfMemoryErors. Is é an réiteach athróg a bhaint as an liosta de&lt;subsetVariables× a bhfuil líon mór de luachanna ann, nó athróga a bhaint de réir mar is gá go dtí go bhfuil méid an tábla sin réasúnach. Na codanna deERDDAP™a úsáideann ansubsetVariablesNí córas ag obair go maith (e.g., luchtú leathanaigh ghréasáin go han-mhall) nuair a bhíonn níos mó ná 100,000 sraitheanna sa tábla sin.
* Tá sé indéanta i gcónaí go roinnt iarrataí comhuaineach mór (ar i ndáiríre gnóthachERDDAP) Is féidir le chéile a chur faoi deara deacracht cuimhne. Mar shampla, 8 iarrataí, gach úsáid a bhaint 1GB gach, bheadh ina chúis le fadhbanna do -Xmx = 8GB thus. Ach tá sé annamh go mbeadh gach iarratas a bheith ag an bhuaic a úsáid chuimhne ag an am céanna. Agus go mbeadh tú in ann a fheiceáil go bhfuil doERDDAP™i ndáiríre gnóthach le hiarratais mhóra. Ach, is féidir. Tá sé deacair déileáil leis an bhfadhb seo seachas tríd an suíomh -Xmx a mhéadú.
* Tá cásanna eile. Má fhéachann tú ar an[logáil isteach.](#log)comhad a fheiceáil cadERDDAP™bhí ag déanamh nuair a d'eascair an earráid, is féidir leat a fháil de ghnáth leid maith maidir leis an chúis. I bhformhór na gcásanna, tá bealach chun an fhadhb sin a íoslaghdú (féach thuas) , ach uaireanta is gá duit ach cuimhne níos mó agus suíomh -Xmx níos airde.
         
### Too Comhaid Oscailte go leor{#too-many-open-files} 
Ag tosú leERDDAP™v2.12,ERDDAP™Tá córas chun monatóireacht a dhéanamh ar líon na gcomhad oscailte (lena n-áirítear soicéid agus roinnt rudaí eile, ní hamháin comhaid) i Tomcat ar ríomhairí Linux. Má roinnt comhaid riamh a fháil dúnta ("leak fhoinse") , d'fhéadfadh líon na gcomhad oscailte a mhéadú go dtí go mbeidh sé níos mó ná an t-uasmhéid a cheadaigh an córas oibriúcháin agus go leor rudaí i ndáiríre dona a tharlóidh. Mar sin anois, ar ríomhairí Linux (toisc nach bhfuil an t-eolas ar fáil do Windows) :

* Tá colún " Comhaid Oscailte" ar an gceart i bhfad ar an leathanach gréasáin status.html léiríonn an faoin gcéad de na comhaid max oscailte. Ar Windows, léiríonn sé ach "?".
* Nuair a bheidhERDDAP™gineann an t-eolas sin ag deireadh gach athlódáil tacar sonraí mór, beidh sé a phriontáil chuig an logáil. comhad txt:
openFileCount = *reatha reatha* de max = *max* % = *faoin gcéad* 
* Má tá an céatadán 0.50%, r-phost a sheoladh chuig anERDDAP™riarthóir agus an ríomhphost Gach rud Chun seoltaí ríomhphoist.

Má tá an céatadán 100%,ERDDAP™Tá sé i dtrioblóid uafásach. Ná lig seo tarlú.
Má tá an céatadán × 75%,ERDDAP™Tá sé gar do dtrioblóid uafásach. Nach bhfuil ceart go leor.
Má tá an céatadán 0.50%, tá sé an-is féidir go mbeidh spike faoi deara an céatadán a bhuail 100.
Má tá an céatadán riamh 0.50%, ba chóir duit:
* Méadú ar líon uasta na gcomhad oscailte arna gceadú ag ceachtar:
    * Ag déanamh na n-athruithe gach uair sula dtosaíonn tú tomcat (iad a chur sa Tomcat startup.sh comhad?) :
tréimhse saoil: ilbhliantúil
tréimhse saoil: ilbhliantúil
    * Nó a dhéanamh athrú buan trí eagarthóireacht (mar fhréamh) /etc / slándála / limits.conf agus na línte a chur leis:
tomcat bog nofile 16384
cliceáil grianghraf a mhéadú
Glacfar orduithe glacadh leis go bhfuil an t-úsáideoir ag rith Tomcat ar a dtugtar "tomcat".
Ar go leor leaganacha Linux, caithfidh tú a atosú ar an bhfreastalaí a chur i bhfeidhm na hathruithe. Maidir leis an dá rogha, is sampla é an "16384" thuas. Roghnaíonn tú an líon a cheapann tú is fearr.
* AtosaighERDDAP. Déanfaidh an córas oibriúcháin aon chomhaid oscailte a dhúnadh.
         
### Iarratais Failed{#failed-requests} 
*    **GnÃ omhaÃ ochta Neamhghnách: ~ 25% d'iarrataí theip**   
Mar chuid de gach reloadDatasets, atá de ghnáth gach 15 nóiméad,ERDDAP™féach ar an gcéatadán na n-iarratas a theip ó na reloadDatasets deireanach. Má tá sé ^25%,ERDDAP™Seolann ríomhphost chuig anERDDAP™riarthóir leis an ábhar "Gníomhaíocht neamhghnách: × 25% d'iarrataí theip". Cuimsíonn an ríomhphost sin tally in aice leis an mbun dar teideal "Seoladh IP Requester ar (Failed)   (ó shin Mór-LoadDatasets deireanach) ". Cuardaigh le haghaidh sin. Insíonn sé duit an seoladh IP de na ríomhairí a dhéanamh ar na hiarratais is theip. Is féidir leat cuardach a dhéanamh ansin do na seoltaí IP sa\\[Treoir do Thuismitheoirí\\]Naisc ábhartha eile[logáil isteach.](#log)comhad agus féach cén cineál iarrataí atá á ndéanamh acu.
    
Is féidir leat úsáid a bhaint as uimhir IP an úsáideora (mar shampla, le[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)) chun iarracht a dhéanamh amach cé nó cad é an t-úsáideoir. Uaireanta a insint duit go cruinn go leor a bhfuil an t-úsáideoir (e.g., tá sé ina crawler gréasáin inneall cuardaigh) . An chuid is mó den am a thugann sé ach tú a clue (e.g., tá sé ar ríomhaire amazonaws, tá sé ó roinnt ollscoil, tá sé duine éigin i roinnt chathair ar leith) .
    
Ag féachaint ar an iarratas iarbhír, an uimhir IP, agus an teachtaireacht earráide (go léir ó[logáil isteach.](#log)) le haghaidh sraith de earráidí, is féidir leat figiúr de ghnáth amach go bunúsach cad atá ag dul mícheart. I mo thaithí, tá ceithre cúiseanna coitianta go leor de na hiarratais theip:
    
1) Is iad na hiarratais mailíseach (e.g., ag lorg laigí slándála, nó ag déanamh iarrataí agus ansin iad a chealú sula gcuirtear i gcrích iad) . Ba chóir duit úsáid a bhaint&lt;iarratas Blacklist × idatasets.xmlgo blacklist na seoltaí IP.
    
2) Tá inneall cuardaigh naively ag iarraidh na URLanna atá liostaithe iERDDAP™leathanaigh ghréasáin agus doiciméid ISO 19115. Mar shampla, tá go leor áiteanna a liosta an bonnOPeNDAPURL, mar shampla, https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST , a bhfuil an t-úsáideoir ceaptha a chur le cineál comhaid (e.g., .das, .dds, ..) . Ach nach bhfuil an t-inneall cuardaigh a fhios seo. Agus theipeann ar an iarraidh ar an URL bonn. Tá staid a bhaineann nuair a ghineann an t-inneall cuardaigh iarratais nó iarracht a líonadh amach foirmeacha d'fhonn a fháil chun "i bhfolach" leathanaigh ghréasáin. Ach is minic a dhéanann na hinnill chuardaigh post dona seo, rud a fhágann teipeanna. Is é an réiteach: a chruthú[taiseachas aeir: fliuch](#robotstxt)comhad.
    
3) Tá roinnt úsáideoir ag rith script go bhfuil ag iarraidh arís agus arís eile le haghaidh rud éigin nach bhfuil ann. B'fhéidir go bhfuil sé tacar sonraí a úsáidtear a bheith ann, ach tá sé imithe anois (go sealadach nó go buan) . Scripteanna nach minic ag súil leis seo agus mar sin ná déileáil leis go cliste. Mar sin, coimeádann an script ach iarratais a dhéanamh agus na hiarrataí a choinneáil ag teip. Más féidir leat buille faoi thuairim a bhfuil an t-úsáideoir (ón uimhir IP thuas) , teagmháil a dhéanamh leo agus iad a insint go bhfuil an tacar sonraí a thuilleadh ar fáil agus iarr orthu a athrú a script.
    
4) Tá rud éigin i ndáiríre mícheart le roinnt tacar sonraí. De ghnáth,,ERDDAP™déanfaidh sé an tacar sonraí trioblóideacha neamhghníomhach. Uaireanta ní chuireann sé, mar sin go léir na hiarrataí chun é mar thoradh ar earráidí. Más amhlaidh, an fhadhb a shocrú leis an tacar sonraí nó (más rud é nach féidir leat) a leagtar ar an tacar sonraí a[gníomhach = "False"](/docs/server-admin/datasets#active). Ar ndóigh, d'fhéadfadh sé seo mar thoradh ar fhadhb #2.
    
Uaireanta nach bhfuil na hearráidí chomh dona, go háirithe, máERDDAP™is féidir a bhrath an earráid agus freagra a thabhairt go han-tapa (&lt;= 1ms). Mar sin, is féidir leat cinneadh a dhéanamh gan aon ghníomh a dhéanamh.
    
Má theipeann ar gach duine eile, tá réiteach uilíoch: cuir uimhir IP an úsáideora chuig an [&lt;an t-iarratas Blacklist (/ ollscoileanna eile sa mhargadh) . Níl an Tweet seo ar fáil. Beidh an t-úsáideoir a fháil ansin teachtaireacht earráide ag rá s / tá sé curtha blacklisted agus ag insint dóibh do (anERDDAP™riarthóir ar) seoladh ríomhphoist. Uaireanta déanfaidh an t-úsáideoir teagmháil leat agus is féidir leat an fhadhb a réiteach. Uaireanta ní dhéanann an t-úsáideoir teagmháil leat agus beidh tú a fheiceáil ar an iompar céanna cruinn ag teacht ó uimhir IP éagsúla an lá dár gcionn. Blacklist an uimhir IP nua agus tá súil agam go mbeidh siad a fháil ar deireadh thiar ar an teachtaireacht. (Nó is é seo do Lá Groundhog, as a ní bheidh tú ag éalú. Tá brón orainn.) 
    
### taiseachas aeir: fliuch{#robotstxt} 
Úsáideann cuideachtaí inneall cuardaigh crawlers gréasáin (e.g., Google taiseachas aeir: fliuch) scrúdú a dhéanamh ar gach ceann de na leathanaigh ar an ngréasán a chur ar an ábhar leis an innill chuardaigh. Le haghaidhERDDAP™, is é sin go bunúsach go maith.ERDDAP™Tá go leor de na naisc idir leathanaigh, mar sin beidh an crawlers teacht ar gach ceann de na leathanaigh ghréasáin agus iad a chur leis an innill chuardaigh. Ansin, beidh úsáideoirí na n-inneall cuardaigh a bheith in ann a aimsiú tacair sonraí ar doERDDAP.
    
Ar an drochuair, roinnt crawlers gréasáin (e.g., Google taiseachas aeir: fliuch) a líonadh amach agus foirmeacha a chur isteach anois chun ábhar breise a fháil. Maidir le láithreáin tráchtála gréasáin, tá sé seo iontach. Ach tá sé seo uafásach doERDDAP™toisc go bhfuil sé díreach mar thoradh ar **gan teorainn** líon na n-iarrachtaí neamh-inmhianaithe agus gan choinne a crawl na sonraí iarbhír. Is féidir é seo mar thoradh ar níos mó iarrataí ar shonraí ná ó gach úsáideoir eile le chéile. Agus líonann sé an t-inneall cuardaigh le goofy, fo-iarsmaí pointless de na sonraí iarbhír.
    
Chun a insint do na crawlers gréasáin chun stop a chur le foirmeacha a líonadh amach agus go ginearálta ní ag féachaint ar leathanaigh ghréasáin nach gá dóibh chun breathnú ar, is gá duit a chruthú comhad téacs ar a dtugtar[taiseachas aeir: fliuch](https://en.wikipedia.org/wiki/Robots_exclusion_standard)sa eolaire fhréamh de ordlathas doiciméad do láithreán gréasáin ionas gur féidir é a fheiceáil ag duine ar bith mar, m.sh., http://*www.your.domain*/robots.txt .
Má tá tú ag cruthú robots nua. comhad txt, is tús maith é seo:
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
     (Ach in ionad *do. institiúidí.url* le doERDDAP's URL bonn.)   
D'fhéadfadh sé a ghlacadh cúpla lá do na hinnill chuardaigh fógra agus do na hathruithe a chur i bhfeidhm.
     
### léarscáil an tSuímh{#sitemapxml} 
Mar an[ https://www.sitemaps.org ](https://www.sitemaps.org/)láithreán gréasáin a deir:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

I ndáiríre, ós rud éERDDAP™Is maith liomRESTful, Is féidir le damháin alla inneall cuardaigh crawl go héasca doERDDAP. Ach claonadh a bhíonn siad a dhéanamh níos minice (gach lá&#33;) a bheith riachtanach (míosúil?) .

* Ós rud é go bhféadfadh gach inneall cuardaigh a crawling do iomlánERDDAP™gach lá, is féidir é seo mar thoradh ar a lán de na hiarratais gan ghá.
* Mar sin,ERDDAP™Gineann comhad sitemap.xml do doERDDAP™a insíonn innill chuardaighERDDAP™ní mór ach a crawled gach mí.
* Ba chóir duit tagairt a chur leisERDDAP's sitemap.xml do[taiseachas aeir: fliuch](https://en.wikipedia.org/wiki/Robots_exclusion_standard)comhad:
Léarscáil an tSuímh: http://**www.yoursite.org**/erddap/sitemap.xml
 
* Más rud é nach bhfuil an chuma a bheith ag fáil an teachtaireacht do na crawlers, is féidir leat a insint ar an innill chuardaigh éagsúla mar gheall ar an comhad sitemap.xml trí chuairt a thabhairt ar na URLanna (ach athrú **Do Institiúid** acrainm nó giorrúchán d'institiúide agus **Cuardaigh le haghaidh:** le doERDDAP's URLanna') :
    *    https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
 
    *    https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(I smaoineamh) ní mór duit ach a ping gach inneall cuardaigh uair amháin, do gach am. Beidh an innill chuardaigh a bhrath ansin athruithe ar sitemap.xml tréimhsiúil.
     
### Scaipeadh Sonraí / Dáileadh Sonraí Líonraí:PushagusPullTeicneolaíocht Faisnéise agus Cumarsáide{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* De ghnáth,ERDDAP™gníomhartha mar idirghabhálaí: glacann sé iarraidh ó úsáideoir; faigheann sé sonraí ó fhoinse sonraí iargúlta; reformats na sonraí; agus cuireann sé chuig an úsáideoir é.
*   [PullTeicneolaíocht Faisnéise agus Cumarsáide](https://en.wikipedia.org/wiki/Pull_technology):ERDDAP™Tá an cumas a fháil go gníomhach gach ceann de na sonraí atá ar fáil ó fhoinse sonraí iargúlta agus[cóip áitiúil de na sonraí a stóráil](/docs/server-admin/datasets#eddgridcopy).
*   [PushTeicneolaíocht Faisnéise agus Cumarsáide](https://en.wikipedia.org/wiki/Push_technology): Trí úsáid a bhaint asERDDAP's[services india](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions), Is féidir freastalaithe sonraí eile a chur in iúl a luaithe is atá sonraí nua ar fáil ionas gur féidir leo na sonraí a iarraidh (trí na sonraí a tharraingt) .
*   ERDDAP's[EDDGridAn tSraith Shinsearach](/docs/server-admin/datasets#eddfromerddap)agus[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap)úsáid tírdhreachERDDAP's seirbhísí síntiús agus[córas bratach](#flag)ionas go dtabharfar fógra dó láithreach nuair a bheidh sonraí nua ar fáil.
* Is féidir leat iad seo a chur le héifeacht mhór: má wrap túEDDGridCóip timpeallEDDGridÓ sraith sonraí (nó Timfhilleadh ar EDDTableCopy timpeall EDDTableFromErddap tacar sonraí) ,ERDDAP™a chruthú go huathoibríoch agus cóip áitiúil eile a chothabháilERDDAP's tacar sonraí.
* Toisc go n-oibríonn na seirbhísí síntiús a luaithe is atá sonraí nua ar fáil, scaiptear teicneolaíocht bhrú sonraí go han-tapa (laistigh de soicind) .

Cuireann an ailtireacht gachERDDAP™riarthóir i gceannas a chinneadh i gcás ina bhfuil na sonraí le haghaidh aERDDAP™thagann ó.

* Eile eile (1)ERDDAP™Is féidir le riarthóirí a dhéanamh mar an gcéanna. Níl aon ghá le comhordú idir riarthóirí.
* Má tá go leorERDDAP™riarthóirí nasc a chéileERDDAPs, tá líonra dáileadh sonraí déanta.
* Beidh sonraí a scaipeadh go tapa, go héifeachtach, agus go huathoibríoch ó fhoinsí sonraí (ERDDAPs agus freastalaithe eile) chuig láithreáin athdháileadh sonraí (ERDDAPs s) áit ar bith sa líonra.
* A tugadhERDDAP™Is féidir a bheith ina fhoinse sonraí do roinnt tacar sonraí agus suíomh athdháileadh do tacar sonraí eile.
* Tá an líonra mar thoradh ar garbh cosúil le líonraí dáileacháin sonraí a chur ar bun le cláir cosúil le[Unidata's IDD/IDM](https://www.unidata.ucar.edu/projects/index.html#idd), ach níos lú go docht struchtúrtha.
         
### Slándáil, Fíordheimhniú, agus Údarú{#security-authentication-and-authorization} 
De réir réamhshocraithe,ERDDAP™Ritheann mar fhreastalaí poiblí go hiomlán (ag baint úsáide ashttpagus/nóhttps) gan aon logáil isteach ([fíordheimhnithe](https://en.wikipedia.org/wiki/Authentication)) córas agus gan aon srianta ar rochtain sonraí ([Údar](https://en.wikipedia.org/wiki/Authorization)) .

#### Slándáil agus Slándáil{#security} 
Más mian leat rochtain a shrianadh ar roinnt tacar sonraí nó ar gach tacar sonraí d'úsáideoirí áirithe, is féidir leat é a úsáidERDDAPcóras slándála tógtha isteach. Nuair a bhíonn an córas slándála in úsáid:

*   ERDDAP™úsáidí[rialú rochtana rólbhunaithe](https://en.wikipedia.org/wiki/Role-based_access_control).
    * An bhfuilERDDAP™riarthóir sainmhíniú úsáideoirí leis an [&lt;an t-úsáideoir (Teicneolaíocht Faisnéise agus Cumarsáide) tag idatasets.xml. Tá ainm úsáideora ag gach úsáideoir, pasfhocal (má fíordheimhniú = custaim) , agus ról amháin nó níos mó.
    * An bhfuilERDDAP™Sainmhíníonn riarthóir a bhfuil rólanna rochtain ar tacar sonraí ar leith tríd an [&lt;go dtí seo (Sonraí Teagmhála) tag idatasets.xmlle haghaidh aon tacar sonraí nár cheart rochtain phoiblí a bheith acu.
* Stádas logála an úsáideora (agus nasc chuig logáil isteach/amach) a thaispeáint ag barr gach leathanach gréasáin. (Ach beidh logáilte isteach úsáideoir le feiceáilERDDAP™a bheith gan logáil isteach má úsáideann séhttpURL.) 
* Má tá an&lt;baseUrl bb go bhfuil tú a shonrú i do thus.xml **http** URL, Is féidir le húsáideoirí nach bhfuil logáilte isteach úsáidERDDAP's **http** URLanna. Más rud é&lt;Tá baseHttpsUrl a shonraítear freisin, is féidir le húsáideoirí nach bhfuil logáilte isteach a úsáid freisinhttpsURLanna.
* HTTPS Amháin -- Má tá an&lt;baseUrl bb go bhfuil tú a shonrú i do thus.xml **https** URL, úsáideoirí nach bhfuil logáilte isteach a spreagadh (gan iallach) a úsáidERDDAP's **https** URLanna - gach ceann de na naisc arERDDAP™Beidh leathanaigh ghréasáin a tharchur chuighttpsURLanna.
    
Más mian leat a bhfeidhm úsáideoirí a úsáidhttpsURL, cuir líne buan Redirect taobh istigh den&lt;VirtualHost \\*:80 × alt i do Apache ar comhad config (de ghnáthhttpd.) , m.sh.,
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

Más mian leat, tá modh breise ann chun úsáid a bhaint ashttps: [HTTP Slándáil Iompair (HSTS) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security). Chun é a úsáid:
    
    1. Cumasaigh an Apache Headers Modúl: a2enmod headers
    2. Cuir an header breise leis an treoir HTTPS VirtualHost. Max-aois a thomhas i soicind agus is féidir a shocrú le roinnt luach fada.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
Tabhair faoi deara nach bhfuil an header seo bailí ach amháin ar HTTPS VirtualHost.
    
Cúis nach bhfeidhmíonn úsáideoirí úsáidhttpsURLanna é: Tógann an nasc SSL / TLS bunúsacha am a bhunú agus ansin a thógann am a chriptiú agus decrypt gach faisnéis a tharchuirtear idir an t-úsáideoir agus an freastalaí. Ach éilíonn roinnt institiúidíhttpsach amháin.
    
* Úsáideoirí atá logáilte isteach MUST úsáidERDDAP's **https** URLanna. Má úsáideann siadhttpURLanna, láithreoidh siadERDDAP™a bheith gan logáil isteach. Cinntíonn sé seo príobháideacht na cumarsáide agus cabhraíonn sé le cosc[hijacking seisiún agus sidejacking](https://en.wikipedia.org/wiki/Session_hijacking).
* Is féidir le duine ar bith nach bhfuil logáilte isteach rochtain agus úsáid a bhaint as na tacair sonraí poiblí. De réir réamhshocraithe, nach bhfuil tacair sonraí príobháideacha le feiceáil i liostaí na tacar sonraí más rud é nach bhfuil úsáideoir logáilte isteach. Má tá an riarthóir thus.xml ar&lt;liosta PríobháideachaDatasets amach go fíor, beidh siad le feiceáil. Iarrachtaí sonraí a iarraidh ó tacair sonraí príobháideacha (má tá a fhios ag an úsáideoir an URL) Beidh atreorú chuig an leathanach logáil isteach.
* Beidh duine ar bith atá logáilte isteach in ann sonraí a fheiceáil agus a iarraidh ó aon tacar sonraí poiblí agus aon tacar sonraí príobháideach a ligeann a ról dóibh rochtain a fháil orthu. De réir réamhshocraithe, tacair sonraí príobháideacha nach bhfuil rochtain ag úsáideoir orthu le feiceáil i liostaí tacar sonraí. Má tá an riarthóir thus.xml ar&lt;liosta PríobháideachaDatasets amach go fíor, beidh siad le feiceáil. Beidh Iarrachtaí sonraí a iarraidh ó tacair sonraí príobháideacha nach bhfuil rochtain ag an úsáideoir a atreorú chuig an leathanach logáil isteach.
* An bhfuilRSSTá faisnéis le haghaidh tacair sonraí príobháideacha go hiomlán ar fáil ach d'úsáideoirí (agusRSSléitheoirí) atá logáilte isteach agus údaraithe a úsáid go tacar sonraí. Déanann sé seoRSSnach bhfuil an-úsáideach le haghaidh tacair sonraí príobháideacha go hiomlán.
    
Má tá tacar sonraí príobháideach ach a [&lt;graif atá le feiceáil go dtí seo (Teicneolaíocht Faisnéise agus Cumarsáide) atá leagtha go poiblí, an tacar sonraíRSSTá rochtain ag duine ar bith.
    
* Ní féidir síntiúis ríomhphoist a chur ar bun ach amháin nuair a bhíonn rochtain ag úsáideoir ar tacar sonraí. Má shíníonn úsáideoir le tacar sonraí príobháideach, leanann an síntiús ag feidhmiú tar éis don úsáideoir logáil amach.

##### Socrú Slándáil{#setup-security} 
A chur ar bun ar an gcóras slándála / authentication / údarú:

* Déan an caighdeánERDDAP™ [setup tosaigh](/docs/server-admin/deploy-install).
* I[crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml),
    * Cuir / athrú ar an&lt;barántúil luach ó rud ar bith a saincheaptha (Ná húsáid seo) , r-phost (Ná húsáid seo) , google (molta molta) , orcid (molta molta) , nó oauth2 (atá google+orcid, molta) . Féach ar na tuairimí faoi na roghanna thíos.
    * Cuir / athrú ar an&lt;baseHttpsUrl . luach.
    * Cuir isteach / gan chomhlíonadh&loginInfo;i&lt;startBodyHtml uaire a thaispeáint an t-úsáideoir ar logáil isteach / amach info ag barr gach leathanach gréasáin.
* Chun críocha tástála ar do ríomhaire pearsanta,[lean na treoracha seo chun tomcat a chumrú chun tacú le SSL](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)  (an bonnhttpsnaisc) ag a chruthú keystore le[deimhniú féin-sínithe](https://en.wikipedia.org/wiki/Self-signed_certificate)agus trí mhodhnú *taiseachas aeir: fliuch* / conf / server.xml a uncomment an cónascaire le haghaidh calafort 8443. Ar Windows, b'fhéidir go mbeadh ort bogadh .keystore ó "c:\\Users\\ *tú thú* \\ \\ .keystore " go dtí "c:\\Úsáideoirí \\ Úsáideoir réamhshocraithe\\.keystore" nó "c:\\.keystore" (féach ar *taiseachas aeir: fliuch* / logs / catalina. *lá atá inniu ann* .log más rud é nach bhfuil an t-iarratas ualach nó nach féidir le húsáideoirí a fheiceáil ar an logáil isteach sa leathanach) . Is féidir leat a fheiceáil nuair a rachaidh an deimhniú .keystore in éag trí scrúdú a dhéanamh ar an deimhniú nuair a logáil tú isteach.
    
I gcás freastalaí a bhfuil rochtain ag an bpobal air, in ionad deimhniú féin-sínithe a úsáid, moltar go láidir duit deimhniú a cheannach agus a shuiteáil sínithe ag[údarás deimhniúcháin](https://en.wikipedia.org/wiki/Certificate_authority), toisc go dtugann sé do chliaint dearbhú níos mó go bhfuil siad ag nascadh go deimhin le doERDDAP™, Ní fear-i-an-lár ar leagan de doERDDAP. Díolann go leor díoltóirí deimhnithe digiteacha. (Cuardaigh le haghaidh gréasáin.) Níl siad costasach.
    
* Ar ríomhairí Linux, má tá Tomcat ag rith i Apache, an /etc /httpd/conf.d / Ssl.conf comhad a cheadú tráchta HTTPS chuig / óERDDAP™gan a cheangal ar an :8443 uimhir port sa URL:
    1. Athraigh na láithreacha&lt;Baile Átha Troim (má tá ceann amháin) , nó cuir ceann ag deireadh an chomhaid ionas go mbeidh na línte seo ar a laghad aige:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. Ansin atosú Apache: /usr / sbin / Feithiclí bláthanna cumhra: cumhráin (ach uaireanta tá sé i eolaire éagsúla) .
* I *taiseachas aeir: fliuch* / conf / server.xml, uncomment an gcalafort = 8443&lt;Nascóirí ú chlib:
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
agus athrú ar an suíomh an deimhniúKeystoreFile.
##### Amharc ar gach eolas{#authorization} 
*   [Idatasets.xml, chruthú](#authorization)[EN]&lt;an t-úsáideoir (Teicneolaíocht Faisnéise agus Cumarsáide) tag do gach úsáideoir le ainm úsáideora, pasfhocal (má údarú = custaim) , agus róil faisnéis. Níl an Tweet seo ar fáilERDDAP's córas slándála.
     
* Idatasets.xml, cuir [&lt;go dtí seo (Sonraí Teagmhála) tag do gach tacar sonraí nár chóir go mbeadh rochtain phoiblí.&lt;Ligeann sé duit a shonrú cén ról a bhfuil rochtain acu ar an tacar sonraí sin.
     
* Atosaigh Tomcat. Trioblóid? Seiceáil na logs Tomcat.
     
* CHECK DO OBAIR&#33; D'fhéadfadh aon botún mar thoradh ar locht slándála.
     
* Seiceáil go n-úsáideann an leathanach logáil isteachhttps  (taiseachas aeir: fliuchhttp) . Iarrachtaí logáil isteach viahttpBa chóir a atreorú go huathoibríoch chunhttpsagus port 8443 (cé go bhféadfadh uimhir an chalafoirt a bheith i bhfolach trí sheachvótálaí Apache) . D'fhéadfá a bheith ag obair le do riarthóir líonra a cheadú iarrataí gréasáin seachtracha chun rochtain a fháil ar port 8443 ar do fhreastalaí.
     
* Is féidir leat athrú ar an&lt;úsáideoir × agus&lt;inrochtana Chun na clibeanna ag am ar bith. Cuirfear na hathruithe i bhfeidhm ag an gcéad athlódáil rialta eile ar aon tacar sonraí, nó ASAP má úsáideann tú[bratach bratach](#flag).

##### Fíordheimhniú{#authentication} 
[ **Fíordheimhniú (logáil isteach) ** ](#authentication)  
Más rud é nach bhfuil tú ag iarraidh a ligean d'úsáideoirí a logáil isteach, ná a shonrú luach do&lt;fíordheimhnithe bhéil i thus.xml.
Más mian leat ligean d'úsáideoirí logáil isteach, ní mór duit luach a shonrú le haghaidh&lt;fíordheimhniú bhéil. Faoi láthair,ERDDAP™tacú le tacaíocht
[custom custom custom](#custom)  (Ná húsáid seo) ,
[duille dath: glas](#email)  (Ná húsáid seo) ,
[Go raibh maith agat](#google)  (molta molta) ,
[foirm duille: líneach](#orcid)  (molta molta) , agus
[riachtanais uisce: measartha](#oauth2)  (molta molta) don mhodh fíordheimhnithe.
Más mian leat a chumasú logáil isteach, molaimid go láidir ar an google, orcid, nó roghanna oauth2 toisc go bhfuil siad saor in aisce tú ó stóráil agus a láimhseáil focal faire úsáideora (ag teastáil le haghaidh saincheaptha) agus tá siad níos sábháilte ná an rogha ríomhphoist. Cuimhnigh go n-úsáideann úsáideoirí go minic an focal faire céanna ag láithreáin éagsúla. Mar sin, d'fhéadfadh siad a bheith ag baint úsáide as an focal faire céanna do doERDDAP™mar a dhéanann siad ag a n-bainc. Sin a dhéanann a gcuid focal faire an-luachmhar - i bhfad níos luachmhaire don úsáideoir ná na sonraí a bhfuil siad ag iarraidh. Mar sin, ní mór duit a dhéanamh an oiread agus is féidir leat a choinneáil ar an focal faire príobháideach. Is é sin freagracht mhór. An r-phost, google, orcid, agus roghanna oauth2 a ghlacadh cúram faire, mar sin ní gá duit a bhailiú, a stóráil, nó ag obair leo. Mar sin, tá tú saor ón bhfreagracht sin.

Gach duine&lt;fíordheimhnithe ú roghanna a úsáid[fianán fianán](https://en.wikipedia.org/wiki/HTTP_cookie)ar ríomhaire an úsáideora, mar sin ní mór bhrabhsálaí an úsáideora a shocrú chun fianáin a cheadú. Má tá úsáideoir a dhéanamhERDDAP™iarratais ó chlár ríomhaire (gan bhrabhsálaí) , Tá fianáin agus fíordheimhniú deacair a bheith ag obair leis. Sin fadhb coiteann le gach córas fíordheimhnithe. Tá brón orainn.

Sonraí na&lt;fíordheimhnithe ú Tá roghanna:

###### Saincheaptha Saincheaptha{#custom} 
Is maith liomERDDAP's córas saincheaptha d'úsáideoirí ligean logáil isteach ag dul isteach a n-Ainm Úsáideora agus Pasfhocal i bhfoirm ar leathanach gréasáin. Má dhéanann úsáideoir iarracht agus go mainneoidh sé logáil isteach 3 huaire laistigh de 10 nóiméad, tá an t-úsáideoir bac ó iarraidh a logáil isteach ar feadh 10 nóiméad. Cuireann sé seo cosc ar hackers ó ach ag iarraidh na milliúin focal faire go dtí go bhfaighidh siad an ceann ceart.

Tá sé seo beagán slán mar go bhfuil an t-ainm úsáideora agus Pasfhocal a tharchur trídhttps  (taiseachas aeir: fliuchhttp) , ach fíordheimhnithe =google, orcid, nó tá oauth2 níos fearr toisc go bhfuil siad saor in aisce ó a bhfuil pasfhocail a láimhseáil. Éilíonn an cur chuige saincheaptha tú a bhailiú ainm úsáideora agus a díolama hash a n-Pasfhocal (úsáid do ghuthán&#33; Níl an ríomhphost slán&#33;) agus iad a stóráil idatasets.xmli&lt;an t-úsáideoir (Teicneolaíocht Faisnéise agus Cumarsáide) clibeanna.

Leis an rogha saincheaptha, is féidir aon duine logáil isteach go dtí tú (anERDDAP™internet marketing) a chruthú&lt;úsáideoir × chlib don úsáideoir, ag sonrú ainm an úsáideora mar an ainm úsáideora, an digest hash a gcuid focal faire mar an focal faire, agus a róil.

Gan Molta
Mar gheall ar an awkwardness a ghiniúint agus a tharchur an díolama hash de phasfhocal an úsáideora agus mar gheall ar na rioscaí a bhaineann leERDDAP™a bhfuil an digests hash de na focal faire, nach bhfuil an rogha molta.

Chun slándáil na rogha seo a mhéadú:

* MUST tú a chinntiú go n-úsáideoirí eile ar an bhfreastalaí (i.e., úsáideoirí Linux, níERDDAP™úsáideoirí) Ní féidir comhaid a léamh san eolaire Tomcat (go háirithe andatasets.xmlcomhad&#33;) nóERDDAP's bigParentDirectory.
Ar Linux, mar úsáideoir=tomcat, úsáid:
taiseachas aeir: fliuch *Treoir do Thuismitheoirí*   
taiseachas aeir: fliuch *Treoir do Thuismitheoirí*   
taiseachas aeir: fliuch *cliceáil grianghraf a mhéadú*   
taiseachas aeir: fliuch *cliceáil grianghraf a mhéadú*   
     
* Úsáid UEPSHA256 le haghaidh&lt;Focal faire ionchódú bhéil i thus.xml.
     
* Bain úsáid as modh mar-slán-mar-scagtha chun pas a fháil an díolama hash an úsáideora focal faire ón úsáideoir go dtí anERDDAP™internet marketing (fón?) .
         
###### duille dath: glas{#email} 
Úsáideann an rogha fíordheimhnithe ríomhphoist cuntas ríomhphoist úsáideora a fhíordheimhniú an t-úsáideoir (trí ríomhphost a sheoladh leo le nasc speisialta go bhfuil rochtain acu chun logáil isteach) . Murab ionann agus ríomhphoist eile goERDDAP™sheoladh,ERDDAP™Ní scríobh na r-phoist cuireadh chuig an comhad logáil r-phost toisc go bhfuil siad faisnéis rúnda.
Go teoiriciúil, nach bhfuil sé seo an-urra, toisc nach bhfuil r-phoist criptithe i gcónaí, mar sin d'fhéadfadh Guy dona leis an gcumas chun ríomhphoist a thascradh mí-úsáid an córas seo trí úsáid a bhaint as seoladh ríomhphoist úsáideora bailí agus idircheapadh an ríomhphost cuireadh.
Go praiticiúil, má bhunaigh túERDDAP™chun úsáid a bhaint as cuntas ríomhphoist Google chun ríomhphoist a sheoladh, agus má leag tú é suas chun úsáid a bhaint as ceann de na roghanna TLS le haghaidh an nasc, agus má tá cuntas ríomhphoist Google ag an úsáideoir, tá sé seo beagán slán toisc go bhfuil na ríomhphoist criptithe go léir ar an mbealach óERDDAP™leis an úsáideoir.

Chun slándáil na rogha seo a mhéadú:

* Bí cinnte go n-úsáideoirí eile ar an bhfreastalaí (i.e., úsáideoirí Linux, níERDDAP™úsáideoirí) Ní féidir comhaid a léamh san eolaire Tomcat nóERDDAP's bigParentDirectory.
Ar Linux, mar úsáideoir=tomcat, úsáid:
taiseachas aeir: fliuch *Treoir do Thuismitheoirí*   
taiseachas aeir: fliuch *Treoir do Thuismitheoirí*   
taiseachas aeir: fliuch *cliceáil grianghraf a mhéadú*   
taiseachas aeir: fliuch *cliceáil grianghraf a mhéadú*   
     
* rudaí Socraigh suas a fháil deireadh-le-deireadh slándála do na ríomhphoist a sheoladh óERDDAP™do na húsáideoirí. Mar shampla, d'fhéadfaí tú a dhéanamh córas Google-centric ag a chruthú ach amháin&lt;úsáideora × clibeanna do seoltaí ríomhphoist Google-bhainistithe agus trí do bhunúERDDAP™freastalaí ríomhphoist Google a úsáid trí nasc slán/TLS: i do thus.xml, úsáid m.sh.,
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

Gan Molta
Níl an rogha fíordheimhnithe ríomhphoist molta. Bain úsáid as an google, orcid, nó rogha oauth2 ionad.

Mar is amhlaidh leis an google, orcid, agus roghanna oauth2, Tá ríomhphost an-áisiúil doERDDAP™riarthóirí - ní gá duit riamh chun déileáil le focal faire nó a n-digests hash. Gach gá duit a chruthú go bhfuil [&lt;an t-úsáideoir (Teicneolaíocht Faisnéise agus Cumarsáide) tag le haghaidh úsáideoir idatasets.xmlIs seoladh ríomhphoist an úsáideora, aERDDAP™úsáidí mar ainm an úsáideora. (Níl an tréith focal faire a úsáidtear nuair fíordheimhnithe = r-phost, google, orcid, nó oauth2.) 

Leis an rogha ríomhphoist, ach úsáideoirí a bhfuil&lt;úsáideoir × chlibdatasets.xmlIs féidir iarracht a logáil isteach chunERDDAP™trí sheoladh ríomhphoist a sholáthar agus cliceáil ar an nasc sa ríomhphost aERDDAP™cuireann siad iad.

ERDDAP™Déileálann seoltaí ríomhphoist mar chás-íogair. Déanann sé seo trí seoltaí ríomhphoist a thiontú a théann tú isteach (i&lt;úsáideoir × clibeanna) nó úsáideoirí dul isteach (ar an bhfoirm logála isteach) a n-leagan go léir níos ísle.

A chur ar bun fíordheimhnithe = Ríomhphost:

1. I do thus.xml, athrú ar an&lt;baseHttpsUrl ^ tag ar luach.
Le haghaidh turgnamh / ag obair ar do ríomhaire pearsanta, úsáid
     https://localhost:8443   
Do phobalERDDAP™, úsáid
     https://*your.domain.org*:8443   
nó gan an:8443 má tá tú ag baint úsáide as Apache[seachtarach](/docs/server-admin/deploy-install#proxypass)ionas nach bhfuil an uimhir port ag teastáil.
     
2. I do thus.xml, athrú ar an&lt;fíordheimhnithe ú luach tag ar ríomhphost:
```
    <authentication>email</authentication>  
```

3. I do thus.xml, déan cinnte go bhfuil an córas ríomhphoist ar bun trí gach ceann de na&lt;r-phost × clibeanna, ionas go mbeidhERDDAP™Is féidir a sheoladh amach ríomhphoist. Más féidir, seo a chur ar bun chun nasc slán a úsáid (SSL / TLS) chuig an bhfreastalaí ríomhphoist.
     
4. I do chuiddatasets.xml, chruthú [&lt;an t-úsáideoir (Teicneolaíocht Faisnéise agus Cumarsáide) clibeanna do gach úsáideoir a mbeidh rochtain ar tacair sonraí príobháideacha.
Bain úsáid as seoladh ríomhphoist an úsáideora mar ainm úsáideora sa chlib.
Ná sonrófar an tréith focal faire sa chlib úsáideora.
     
5. AtosaighERDDAP™ionas go mbeidh na hathruithe a thus.xml agusdatasets.xmléifeacht a ghlacadh.
         
###### cliceáil grianghraf a mhéadú{#google-orcid-oauth2} 
*   [ **Go raibh maith agat** ](#google),[ **foirm duille: líneach** ](#orcid), agus[ **riachtanais uisce: measartha** ](#oauth2)   (molta molta)   
Gach trí cinn de na roghanna atá moltaERDDAP™roghanna fíordheimhnithe. Tá siad go léir na roghanna is slán. Tá slándáil i bhfad níos laige ag na roghanna eile.
     
###### taiseachas aeir: fliuch{#google} 
* Úsáideann an rogha fíordheimhnithe google[Déan teagmháil linn I le Google](https://developers.google.com/identity/gsi/web/guides/overview), a bhfuil cur chun feidhme an[OAuth 2.0 prótacal fíordheimhnithe](https://oauth.net/2/).ERDDAP™úsáideoirí a shíniú isteach ina gcuntas ríomhphoist Google, lena n-áirítear cuntais Google-bhainistithe ar nós@noaa.govcuntais. Ceadaíonn sé seoERDDAP™chun céannacht an úsáideora a fhíorú (ainm agus seoladh ríomhphoist) agus rochtain a fháil ar a n-íomhá próifíl, ach ní thugannERDDAP™rochtain ar a gcuid ríomhphoist, a n- Google Drive, nó aon fhaisnéis phríobháideach eile.
    
Le haghaidhERDDAP™v2.22 agus thíos,ERDDAP™a úsáidtear "Google Cláraigh-In". Deir Google go bhfuil an córas dímheasta tar éis 31 Márta, 2023. Mura bhfuil déanta agat cheana féin, le do thoil aistriú chuigERDDAP™v2.23+ a bhaint as an nua "Sign In with Google"-bhunaithe córas fíordheimhnithe.
    
Le haghaidhERDDAP™v2.23 cásanna le Ábhar-Security-Policy cumraithe agus ag baint úsáide as Google Fíordheimhniú, is gá duit a chur https://accounts.google.com go dtí an liosta a cheadaítear script-src (nó script-src-cheist) .ERDDAP™a thuilleadh úsáide https://apis.google.com , mar sin má tá tú a cheadaítear, is féidir leat a bheith in ann a bhaint anois.
    
Le haghaidhERDDAP™v2.24 + b'fhéidir gur gá duit a chur leis freisin https://accounts.google.com/gsi/style a stlye-src agus https://accounts.google.com/gsi/ ceangal-src. Chun an script-src is féidir leat úsáid a bhaint anois https://accounts.google.com/gsi/client.
 
    
Le haghaidh tuilleadh eolais is féidir leat dul go dtí an[leathanach Google](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)faoi chumraíocht CSP. Má tá aon cheist agat, déan teagmháil le chris.john ag noaa.gov.
         
###### taiseachas aeir: fliuch{#orcid} 
* Úsáideann an rogha fíordheimhnithe orcid[Fíordheimhniú Orcid](https://members.orcid.org/api/integrate/orcid-sign-in), a bhfuil cur chun feidhme an[OAuth 2.0 prótacal fíordheimhnithe](https://oauth.net/2/).ERDDAP™úsáideoirí shíniú isteach ina[Cuntas deimhnithe](https://members.orcid.org/api/integrate/orcid-sign-in), a úsáidtear go coitianta ag taighdeoirí chun iad féin a aithint. Ceadaíonn sé seoERDDAP™a fhíorú féiniúlacht Orcid an úsáideora agus a fháil ar a n-uimhir chuntais Orcid, ach ní thugannERDDAP™rochtain ar a gcuid faisnéise cuntas Orcid eile.

###### Uisce agus Séarachas{#oauth2} 
* Ligeann an rogha oauth2 d'úsáideoirí clárú le ceachtar a gcuntas Google nó a gcuntas Orcid.

An google, orcid, agus tá roghanna oauth2 na comharbaí ar an rogha openid, a bhí scortha tar éisERDDAP™leagan 1.68, agus a bhí bunaithe ar leagan de oscailte ID atá as dáta anois. Téigh chuig an google, orcid, nó oauth2 rogha.

Tá na roghanna seo an-áisiúil doERDDAP™riarthóirí - ní gá duit riamh chun déileáil le focal faire nó a n-digests hash. Gach gá duit a chruthú go bhfuil [&lt;an t-úsáideoir (Teicneolaíocht Faisnéise agus Cumarsáide) tag le haghaidh úsáideoir idatasets.xmla shonraíonn seoladh ríomhphoist Google an úsáideora nó uimhir chuntais Orcid mar an tréith ainm úsáideora. (Níl an tréith focal faire a úsáidtear nuair fíordheimhnithe = r-phost, google, orcid nó oauth2.) 

Leis na roghanna seo, is féidir le duine ar bith logáil isteach chunERDDAP™trí shíniú isteach ina gcuntas ríomhphoist Google nó cuntas Orcid, ach ní bheidh sé de cheart ag aon duine rochtain a fháil ar thacair sonraí príobháideacha go dtí go mbeidh tú (anERDDAP™internet marketing) a chruthú&lt;úsáideora chlib, ag sonrú a seoladh ríomhphoist Google nó uimhir chuntais Orcid mar an ainm úsáideora, agus ag sonrú a róil.

ERDDAP™Déileálann seoltaí ríomhphoist mar chás-íogair. Déanann sé seo trí seoltaí ríomhphoist a thiontú a théann tú isteach (i&lt;úsáideoir × clibeanna) nó úsáideoirí dul isteach (ar an bhfoirm logála isteach) a n-leagan go léir níos ísle.

A chur ar bun google, orcid, nó fíordheimhnithe oauth2:

* I do thus.xml, athrú ar an&lt;baseHttpsUrl ^ tag ar luach.
Le haghaidh turgnamh / ag obair ar do ríomhaire pearsanta, úsáid
     https://localhost:8443   
Do phobalERDDAP™, úsáid
     https://*your.domain.org*:8443   
nó, níos fearr, gan an:8443 má tá tú ag baint úsáide as Apache[seachtarach](/docs/server-admin/deploy-install#proxypass)ionas nach bhfuil an uimhir port ag teastáil.
     
* I do thus.xml, athrú ar an&lt;fíordheimhnithe ú tag luach a google, orcid, nó oauth2, mar shampla:
```
    <authentication>oauth2</authentication>  
```
###### Google thus{#google-setup} 
* Chun an google agus oauth2 roghanna:
Lean na treoracha thíos a chur ar bun Google fíordheimhnithe do doERDDAP.
     
    1. Mura bhfuil cuntas ríomhphoist Google agat,[a chruthú amháin](https://www.google.com/intl/en_us/mail/help/about.html)  
         
    2. Lean ar aghaidh[na treoracha seo](https://developers.google.com/identity/sign-in/web/devconsole-project)a chruthú tionscadal Google Forbróirí Console agus ID cliant a fháil.
        
Nuair a iarrann an fhoirm Google le haghaidh údaraitheJavaBunús scripte, cuir isteach an luach ó&lt;baseHttpsUrl × ó do ríomhaire pearsanta arERDDAP™.xml, e.g.,
         https://localhost:8443   
Ar an dara líne, cuir an&lt;baseHttpsUrl - ó do phobalERDDAP™.xml, e.g.,
         https://*your.domain.org*:8443
 
        
Ná sonrófar aon URIs atreorú Údaraithe.
        
Nuair a fheiceann tú do ID Cliant don tionscadal seo, cóip agus greamaigh sé isteach i do thus.xml (de ghnáth díreach thíos&lt;fíordheimhnithe bhéil a bheith ordúil, ach ní socrúcháin i ndáiríre ábhar), sa&lt;googleClientID chlib, e.g.,
        &lt;cliceáil grianghraf a mhéadú *do chuid sonraí* &lt;Baile Átha Troim
Beidh an ID cliant a bheith ina teaghrán de thart ar 75 carachtair, is dócha ag tosú le roinnt digití agus dar críoch le .apps.googleusercontent.com.
         
        
    3. I do chuiddatasets.xml, a chruthú [&lt;an t-úsáideoir (Teicneolaíocht Faisnéise agus Cumarsáide) tag do gach úsáideoir a mbeidh rochtain ar tacair sonraí príobháideacha. Maidir leis an tréith ainm úsáideora sa chlib:
        
        * Maidir le húsáideoirí a shíneoidh i le google, bain úsáid as seoladh ríomhphoist Google an úsáideora.
        * I gcás úsáideoirí a shíneoidh isteach le orcid, bain úsáid as uimhir chuntais Orcid an úsáideora (le Fleasc) .
        
Ná sonrófar an tréith focal faire don chlib úsáideora.
         
    4. AtosaighERDDAP™ionas go mbeidh na hathruithe a thus.xml agusdatasets.xmléifeacht a ghlacadh.
         
###### Sraith orcáideach{#orcid-setup} 
* Maidir leis na roghanna orcid agus oauth2:
Lean na treoracha thíos a chur ar bun fíordheimhnithe Orcid do doERDDAP.
     (Le haghaidh sonraí, féach[Doiciméid API fíordheimhnithe Orcid](https://members.orcid.org/api/integrate/orcid-sign-in).)   
     
    1. Mura bhfuil cuntas Orcid agat,[a chruthú amháin](https://orcid.org/signin)  
         
    2. Logáil isteach Orcid[ https://orcid.org/signin ](https://orcid.org/signin)ag baint úsáide as do chuntas pearsanta Orcid.
         
    3. Cliceáil ar "Uirlisí Developer" (faoi "Le haghaidh Taighdeoirí" ag barr) .
         
    4. Cliceáil ar "Cláraigh le haghaidh API poiblí saor in aisce ORCID". Cuir isteach an fhaisnéis seo:
Ainm:ERDDAP™ag an\\[do eagraíocht\\]  
Láithreán Gréasáin:\\[do chuid féinERDDAP's fearann\\]  
Cur síos:ERDDAP™Is freastalaí sonraí eolaíochta. Ní mór d'úsáideoirí a fhíordheimhniú le Google nó Orcid chun rochtain a fháil ar thacair sonraí neamhphoiblí.
URIs atreorú:\\[do chuid féinERDDAP's fearann\\]/ Bainistíocht &amp; Eagar
         
    5. Cliceáil ar an deilbhín Save (Breathnaíonn sé cosúil le 3.5 " diosca&#33;) .
Is féidir leat a fheiceáil ansin do ID Cliant ORCID agus Rúnda Cliant ORCID.
         
    6. Cóipeáil agus greamaigh an ID Cliant ORCID (a thosóidh le "APP-") i setup.xml i&lt;cliceáil grianghraf a mhéadú
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. Cóipeáil agus greamaigh an Rúnda Cliant ORCID (carachtair alfa-uimhriúla níos ísle le Fleasc) i setup.xml i&lt;cliceáil grianghraf a mhéadú
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. I do chuiddatasets.xml, a chruthú [&lt;an t-úsáideoir (Teicneolaíocht Faisnéise agus Cumarsáide) tag do gach úsáideoir a mbeidh rochtain ar tacair sonraí príobháideacha. Maidir leis an tréith ainm úsáideora sa chlib:
        
        * Maidir le húsáideoirí a shíneoidh i le google, bain úsáid as seoladh ríomhphoist Google an úsáideora.
        * I gcás úsáideoirí a shíneoidh isteach le orcid, bain úsáid as uimhir chuntais Orcid an úsáideora (le Fleasc) .
        
Ná sonrófar an tréith focal faire don chlib úsáideora.
         
    9. AtosaighERDDAP™ionas go mbeidh na hathruithe a thus.xml agusdatasets.xmléifeacht a ghlacadh.
             

###### Logáil isteach Slí Ceachtar{#log-in-either-way} 
Má úsáideann tú an google, orcid, nó roghanna fíordheimhnithe oauth2, agus Google Cláraigh-I nó Orcid ar Fíordheimhniú API scoirfidh go tobann a bheith ag obair (ar chúis ar bith) nó a scoireann de bheith ag obair marERDDAP™ag súil, Ní bheidh úsáideoirí in ann logáil isteach ar doERDDAP. Mar sealadach (nó buan) réiteach, is féidir leat a iarraidh ar úsáideoirí a shíniú suas leis an gcóras eile (cuntas ríomhphoist Google a fháil, nó cuntas Orcid a fháil) . Chun seo a dhéanamh:

1. Athraigh an&lt;fíordheimhniú bhéil chlib ionas gur féidir leis an gcóras fíordheimhnithe eile. Ceadaíonn an rogha oauth2 úsáideoirí chun logáil isteach le ceachtar córas.
2. Dúblach gach ceann de&lt;úsáideoir × clibeanna agus athrú ar an tréith ainm úsáideora ón seoladh ríomhphoist Google chuig an uimhir chuntais Orcid comhfhreagrach (nó vice-versa) , ach a choinneáil ar na róil tréith mar an gcéanna.

###### irl - Library Service{#openid} 
ERDDAP™a thuilleadh tacaíochtaí an rogha fíordheimhnithe oscailte, a bhí bunaithe ar leagan oscailte ID atá as dáta anois. Bain úsáid as an google, orcid, nó roghanna oauth2 ina ionad.

###### BASIC{#basic} 
ERDDAP™Ní thacaíonn fíordheimhniú BASIC mar:
* Dealraíonn BASIC dírithe i dtreo leathanaigh ghréasáin réamhshainithe ag teastáil rochtain slán nó blaincéad ar / as rochtain ar an suíomh ar fad, achERDDAP™Ceadaíonn (security guards) datasets a chur leis ar-an-eitilt.
* Ní fíordheimhnithe BASIC thairiscint ar bhealach d'úsáideoirí a logáil amach&#33;
* Is eol nach bhfuil fíordheimhniú BASIC slán.

##### Foinsí Sonraí Slán{#secure-data-sources} 
Má tá rochtain shrianta ag tacar sonraí arERDDAP™úsáideoirí, na sonraí foinse (ó áitERDDAP™faigheann na sonraí) nár cheart rochtain a bheith ag an bpobal air. Mar sin, conasERDDAP™na sonraí a fháil le haghaidh tacar sonraí rochtana srianta? Tá roinnt roghanna:

*   ERDDAP™Is féidir le sonraí a sheirbheáil ó chomhaid áitiúla (mar shampla, trí EDDTable Ó Files nóEDDGridSeirbhís do Chustaiméirí) .
     
*   ERDDAP™Is féidir a bheith i[Seirbhís do Chustaiméirí](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing)) agus an fhoinse sonraí (e.g.,OPeNDAPfreastalaí nó bunachar sonraí) Is féidir a bheith taobh thiar de[balla dóiteáin](https://en.wikipedia.org/wiki/Firewall), i gcás ina bhfuil sé inrochtanaERDDAP™ach ní don phobal.
     
* Is féidir leis an bhfoinse sonraí a bheith ar láithreán gréasáin poiblí, ach a cheangal ar logáil isteach a fháil ar na sonraí. An dá chineál tacar sonraí goERDDAP™Is féidir logáil isteach ar rochtain[EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)agus[EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra). Tacaíocht do na tacair sonraí seo (agus ba chóir a úsáid i gcónaí) ainmneacha úsáideora (a chruthúERDDAP™úsáideoir a bhfuil ach léamh-amháin pribhléidí) , pasfhocail, naisc SSL, agus bearta slándála eile.
    
Ach i gcoitinne, faoi láthair,ERDDAP™Ní féidir déileáil leis na foinsí sonraí toisc nach bhfuil aon fhorálacha maidir le logáil isteach ar an bhfoinse sonraí. Níl an Tweet seo ar fáil[EDDGridÓ Erddap agus EDDTable An tSraith Shinsearach](/docs/server-admin/datasets#eddfromerddap)Ní féidir tacar sonraí a shrianadh. Faoi láthair, an áitiúilERDDAP™Níl aon bhealach chun logáil isteach agus rochtain a fháil ar an t-eolas meiteashonraí ón iargúltaERDDAP. Agus ag cur an "remote"ERDDAP™taobh thiar de do balla dóiteáin agus a bhaint go tacar sonraí inrochtana Ní Chun srianta a réiteach ar an bhfadhb: ós rud é iarratais úsáideora do EDDXxx Ní mór sonraí ó Erddap a atreorú chuig an iargúltaERDDAP™, an iargúltaERDDAP™ní mór a bheith inrochtana.
    
#### Defense in aghaidh Hackers{#defenses-against-hackers} 
Tá hackers Guy dona a iarracht a leas a bhaint as laigí slándála i bogearraí freastalaí cosúilERDDAP.ERDDAP™seo a leanas an chomhairle slándála coitianta go bhfuil roinnt sraitheanna de na cosaintí:

* Pribhléidí srianta -- 1 fhreagra amháin 0 d’atweetálacha 2 chroí Freagra 1 (ionas gur féidir aon duine logáil isteach mar an t-úsáideoir) agus tá pribhléidí córas comhaid teoranta (e.g. rochtain a léamh ar na sonraí) . Féach arERDDAP's treoracha do[a chur ar bun tomcat](/docs/server-admin/deploy-install#tomcat).
* Úsáid Trom - Go ginearálta,ERDDAP™Tá sé tógtha le haghaidh úsáid throm, lena n-áirítear ag scripteanna a dhéanann na mílte na n-iarratas, ceann i ndiaidh a chéile. Tá sé deacair doERDDAP™a oscailt ag an am céanna féin suas go dtí úsáid dhlisteanach trom agus sciath féin ó mhí-úsáid. Tá sé uaireanta deacair a idirdhealú úsáid dhlisteanach trom, úsáid dhlisteanach iomarcach, agus úsáid neamhdhlisteanach (agus uaireanta tá sé i ndáiríre éasca) . I measc cosaintí eile,ERDDAP™Go comhfhiosach ní cheadaíonn sé iarraidh amháin codán a úsáid de acmhainní an chórais (mura bhfuil an córas gníomhach ar shlí eile) .
* Sainaithin Úsáideoirí Trioblóideacha - MáERDDAP™ag moilliú nó reo (b'fhéidir toisc go bhfuil úsáideoir naive nó buidéal ag rith scripteanna éagsúla a chur isteach iarratais éagsúla ag an am céanna nó b'fhéidir mar gheall ar Guy dona ar[Denial-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack)ionsaí ionsaí ionsaí ionsaí) , is féidir leat breathnú ar an[r-phost Tuairisc Laethúil](#daily-report)  (agus faisnéis níos minice comhionann sa[ERDDAP™comhad log](#log)) a thaispeánann líon na n-iarratas a rinne na húsáideoirí is gníomhaí (féach "Seoladh IP Requester ar (Ceadaithe) " " ") .ERDDAP™freisin cuireann ríomhphoist chuig an riarthóir aon uair a bhfuil["Gníomhaíocht neamhghnách: 0.525% d'iarrataí theip"](#failed-requests). Is féidir leat breathnú ansin ar anERDDAP™logáil comhad a fheiceáil ar an nádúr a n-iarratais. Má bhraitheann tú go bhfuil duine éigin ag déanamh iarratais an iomarca, iarratais aisteach (Ní bheadh tú a chreidiúint cad mé le feiceáil, go maith, b'fhéidir go mbeadh tú) , nó iarratais de chineál ionsaí, is féidir leat a sheoladh IP a chur leis an blacklist.
* Blacklist -- Is féidir leat a chur ar an seoladh IP na n-úsáideoirí troublesome, bots, agus[Denial-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack)ionsaí ar anERDDAP [blacklist](/docs/server-admin/datasets#requestblacklist), ionas go mbeidh iarrataí amach anseo uathu a dhiúltú láithreach. Tá an suíomh seo idatasets.xmlionas gur féidir leat seoladh IP a chur go tapa leis an liosta agus ansin[bratach bratach](#flag)tacar sonraí ionas goERDDAP™fógraí láithreach agus an t-athrú a chur i bhfeidhm. Spreagann an teachtaireacht earráide a sheoladh chuig úsáideoirí blacklisted iad chun teagmháil a dhéanamh leis anERDDAP™riarthóir má bhraitheann siad go bhfuil siad curtha dhearmad a chur ar an blacklist. (In ár dtaithí, roinnt úsáideoirí a bheith aineolach go raibh siad ag rith scripteanna éagsúla ag an am céanna, nó go raibh a gcuid scripteanna ag déanamh iarratais nonsense.) 
* Slándáil Sonraí - Roinnt cineálacha tacar sonraí (go háirithe, EDDTableFromDatabase) rioscaí slándála breise (e.g., instealladh SQL) agus a mbearta slándála féin a bheith acu. Féach an fhaisnéis do na cineálacha tacar sonraí sin i[Ag obair leis andatasets.xmlDéan Teagmháil Linn](/docs/server-admin/datasets), go háirithe[Slándáil EDDTableFromDatabase](/docs/server-admin/datasets#database-security).
* Iniúchóireacht Slándáil -- Cén fáth CéNOAADhiúltaigh slándáil TF ár n-iarrataí ar scanadh le blianta, scanadh siad anois go rialta mo (Bob's)  ERDDAP™suiteáil. Cé fuair na scans tosaigh roinnt fadhbanna a shocrú mé ansin, nach bhfuil scans ina dhiaidh sin fuair fadhbanna leERDDAP. Na scans imní faoi a lán rudaí: go háirithe, ós rud établedapiarratais cuma mhaith iarratais SQL, imní orthu faoi leochaileachtaí insteallta SQL. Ach tá na hábhair imní gan bhunús mar gheall arERDDAP™i gcónaí parses agus bailíochtuithe ceisteanna agus ansin ar leithligh a thógann an cheist SQL ar bhealach a sheachaint leochaileachtaí instealladh. Is é an rud eile gearán siad uaireanta faoi go bhfuil árJavaleagan nó leaganacha Tomcat nach bhfuil chomh cothrom le dáta mar is mian leo, mar sin a thabhairt cothrom le dáta muid iad mar fhreagra. Tairg mé roimhe seo a thaispeáint do dhaoine na tuarascálacha slándála, ach tá mé inis anois ní féidir liom a dhéanamh go.

#### Ceisteanna? Moltaí?{#questions-suggestions} 
Má tá aon cheist agat faoiERDDAP's córas slándála nó go bhfuil aon cheist, amhras, imní, nó moltaí faoi conas atá sé ar bun, féach ar ár[alt ar thacaíocht bhreise a fháil](/docs/intro#support).
    

## Rudaí Ní gá duit a fhios{#things-you-dont-need-to-know} 

Is iad seo na sonraí nach gá duit a fhios go dtí go n-éiríonn gá.

### Dara dul síosERDDAP™ {#second-erddap} 
*    **Dul Suas DaraERDDAP™do Thástáil / Forbairt**   
Más mian leat é seo a dhéanamh, tá dhá chur chuige ann:
    *    (Fearr is Fearr) Suiteáil Tomcat agusERDDAP™ar ríomhaire seachas an ríomhaire a bhfuil do phobalERDDAP. Má úsáideann tú do ríomhaire pearsanta:
        1. An bhfuil an tsuiteáil céim amháin ag an am. Faigh Tomcat suas agus ag rith ar dtús.
Nuair a bhíonn Tomcat ag rith, ba chóir don Bhainisteoir Tomcat a bheith ag
            [ http://127.0.0.1:8080/manager/html/ ](http://127.0.0.1:8080/manager/html/)  (nó b'fhéidir[ http://localhost:8080/manager/html/ ](http://localhost:8080/manager/html/)) 
        2. SuiteáilERDDAP.
        3. Ná bain úsáid as ProxyPass chun deireadh a chur le líon an chalafoirt ónERDDAP™URL.
        4. I[crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml), a leagtar baseUrl go http://127.0.0.1:8080
 
        5. Tar éis duit tús a chur leis seoERDDAP™, ba chóir duit a bheith in ann é a fheiceáil ag
            [ http://127.0.0.1:8080/erddap/status.html ](http://127.0.0.1:8080/erddap/status.html)  (nó b'fhéidir[ http://localhost:8080/erddap/status.html ](http://localhost:8080/erddap/status.html)) 
#### Dara Tomcat{#second-tomcat} 
*    (Dara Fearr) Suiteáil Tomcat eile ar an ríomhaire céanna le do phobalERDDAP.
    1. An bhfuil an tsuiteáil céim amháin ag an am. Faigh Tomcat suas agus ag rith ar dtús.
Athrú ar na huimhreacha port a bhaineann leis an dara Tomcat (e.g., athrú 8080 go 8081)   (féach ar an[Bhí an t-eolas úsáideach Méid na hAisghairme](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt)leathbhealach tríd an doiciméad sin) .
    2. SuiteáilERDDAP™sa Tomcat nua.
    3. Ná bain úsáid as ProxyPass chun deireadh a chur le líon an chalafoirt ónERDDAP™URL.
    4. I[crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml), a leagtar baseUrl go http://www.*yourDomainName*:8081
 
    5. Tar éis duit tús a chur leis seoERDDAP™, ba chóir duit a bheith in ann é a fheiceáil ag
         http://www.*yourDomainName*:8081/erddap/status.html   
             
### Tiomántáin Stáit soladach{#solid-state-drives} 
*    **Tiomántáin Stáit soladach (Seirbhís do Chustaiméirí) Tá mór&#33;**   
An bealach is tapúla, is éasca, agus is saoire chun dlús a churERDDAPTá rochtain ar shonraí tabular a chur ar na comhaid sonraí ar Drive Stáit Soladach (Soladach 316 Cruach dhosmálta) . Tá an chuid is mó tacar sonraí tabular réasúnta beag, mar sin tá 1 nó 2 SSD TB dócha go leor a shealbhú gach ceann de na comhaid sonraí do gach ceann de do thacair sonraí tabular. SSD chaitheamh amach sa deireadh má scríobh tú sonraí le cille, é a scriosadh, agus sonraí nua a scríobh chuig an cille sin amanna an iomarca. Mar sin, má úsáideann tú ach do SSD a scríobh na sonraí uair amháin agus é a léamh amanna go leor, ba chóir fiú SSD tomhaltóirí-grád deireanach ar feadh an-fhada, is dócha i bhfad níos faide ná aon Hard Diosca Drive (HD chaighdeán den scoth) . Tá SSD Tomhaltóirí-grád anois saor (i 2018, ~ $200 do 1 TB nó ~ $400 do 2 TB) agus tá praghsanna fós ag titim go tapa. Nuair a bheidhERDDAP™rochtain comhad sonraí, cuireann SSD latency níos giorra (0.1ms, i gcomparáid ~ 3ms do HDD, i gcomparáid ~ 10 (?) ms do RAID, i gcomparáid ~55ms do Amazon S3) agus tréchur níos airde (~ 500 MB / S, i gcomparáid ~ 75 MB / s do HDD, i gcomparáid ~ 500 MB / s do RAID) . Mar sin, is féidir leat a fháil borradh feidhmíocht mór (suas go dtí 10X i gcomparáid le HDD) do $200&#33; I gcomparáid leis an chuid is mó athruithe féideartha eile ar do chóras (freastalaí nua do $ 10,000? RAID nua do $ 35,000? athrú líonra nua do $ 5000? etc.) , is é seo le fada an Tuairisceán is fearr ar Infheistíocht (irl - Library Service) . Má / nuair a fhaigheann an SSD bás (i 1, 2,... 8 bliana) , in ionad é. Ná bí ag brath air chomh fada le haghaidh stórála cartlainne na sonraí, ach le haghaidh an chóip tosaigh de na sonraí.\\[Bheadh SSD mór do shonraí gridded, freisin, ach tá an chuid is mó tacar sonraí gridded i bhfad níos mó, a dhéanamh ar an SSD an-daor.\\]
    
Más rud é nach bhfuil do fhreastalaí luchtaithe le cuimhne, tá cuimhne breise do do fhreastalaí chomh maith ar bhealach iontach agus réasúnta saor chun dlús a chur le gach gné deERDDAP.
     
    
### [Luchtaigh Trom / Srianta](#heavy-loads--constraints) **  {#heavy-loads--constraints} 
Le húsáid throm, a standaloneERDDAP™Is féidir a srianta ag fadhbanna éagsúla. Le haghaidh tuilleadh eolais, féach ar an[liosta de shrianta agus réitigh](/docs/server-admin/scaling#heavy-loads--constraints).
     
### Grids, Clusters, agus Cónaidhm{#grids-clusters-and-federations} 
Faoi úsáid an-trom, standalone amháinERDDAP™beidh sé ar siúl i srianta amháin nó níos mó agus beidh fiú na réitigh molta a bheith neamhleor. I gcás cásanna den sórt sin,ERDDAP™Tá gnéithe a dhéanann sé éasca a thógáil greillí inscálaithe (ar a dtugtar freisin braislí nó cónaidhmeanna) deERDDAPs a cheadaíonn an córas a láimhseáil úsáid an-trom (e.g., le haghaidh ionad sonraí mór) . Le haghaidh tuilleadh eolais, féach[greillí, braislí, agus cónaidhmeannaERDDAPs s](/docs/server-admin/scaling).
     
### Cloud Ríomhaireacht{#cloud-computing} 
Tá roinnt cuideachtaí ag tosú a thairiscint[data recovery services](https://en.wikipedia.org/wiki/Cloud_computing)  (e.g.,[Seirbhísí Gréasáin Amazon](https://aws.amazon.com/)) .[Cuideachtaí óstáil Gréasáin](https://en.wikipedia.org/wiki/Web_hosting_service)tar éis seirbhísí níos simplí a thairiscint ó lár na 1990í, ach tá solúbthacht na gcóras agus raon na seirbhísí a thairgtear leathnaithe go mór ag na seirbhísí "cloud". Is féidir leat úsáid a bhaint as na seirbhísí a chur ar bun amháinERDDAP™nó greille / braisleERDDAPs a láimhseáil úsáid an-trom. Le haghaidh tuilleadh eolais, féach[ríomhaireachta scamall leERDDAP™](/docs/server-admin/scaling#cloud-computing).

### Amazon ag díol{#amazon} 
*    **[Seirbhísí Gréasáin Amazon (Amharc ar gach eolas) Suiteáil EC2](#amazon)**   
    [Seirbhísí Gréasáin Amazon (Amharc ar gach eolas) ](https://aws.amazon.com/)Is maith liom é[data recovery service](https://en.wikipedia.org/wiki/Cloud_computing)a thairgeann réimse leathan de bhonneagar ríomhaireachta gur féidir leat cíos faoin uair. Is féidir leat a shuiteáilERDDAP™ar an[Leaisteacha Cloud Compute (EC2) ](https://aws.amazon.com/ec2/)mar shampla (a n-ainm do ríomhaire gur féidir leat cíos ag an uair) . Tá sármhaith ag AWS[Treoir Úsáideora WS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)agus is féidir leat é a úsáid Google chun freagraí a fháil ar cheisteanna sonracha a d'fhéadfadh a bheith agat. Brace féin - is méid cóir oibre é chun tús a chur leis. Ach nuair a gheobhaidh tú freastalaí amháin suas agus ag rith, is féidir leat cíos go héasca mar acmhainní breise go leor (freastalaithe, bunachair sonraí, SSD-spás, etc.) mar is gá duit, ar phraghas réasúnta.\\[Ní moladh ná formhuiniú é seo ar Sheirbhísí Gréasáin Amazon. Tá soláthraithe scamall eile.\\]
    
Forbhreathnú ar rudaí is gá duit a dhéanamh chun a fháilERDDAP™ag rith ar AWS:
    
    * Go ginearálta, beidh tú a dhéanamh go léir na rudaí a thuairiscítear sa[Treoir Úsáideora WS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html).
    * Cuntas AWS a bhunú.
    * Socraigh úsáideoir AWS laistigh den chuntas sin le pribhléidí riarthóir. Logáil isteach mar an t-úsáideoir a dhéanamh go léir na céimeanna seo a leanas.
    * Stóráil Bloc leaisteacha (EBS) is ionann AWS de thiomáint crua atá ceangailte le do fhreastalaí. Déanfar roinnt spás EBS a leithdháileadh nuair a chruthaíonn tú ar dtús mar shampla EC2. Is stóráil leanúnach é - níl an fhaisnéis caillte nuair a stopann tú do chás EC2. Agus má athraíonn tú cineálacha mar shampla, faigheann do spás EBS go huathoibríoch ceangailte leis an gcás nua.
    * Cruthaigh seoladh IP leaisteacha ionas go bhfuil do shampla EC2 cobhsaí, URL poiblí (i gcoinne ach URL príobháideach a athraíonn gach uair tú atosú do shampla) .
    * Cruthaigh agus tús a chur suas mar shampla EC2 (ríomhaire glúine) . Tá réimse leathan de[cineál mar shampla](https://aws.amazon.com/ec2/instance-types/), gach ceann ar phraghas difriúil. Is é an m4.cás mór nó m4.xlarge chumhachtach agus is dócha oiriúnach don chuid is mó úsáidí, ach is cuma cad a chomhlíonann do chuid riachtanas. Is dócha go mbeidh tú ag iarraidh úsáid a bhaint as Linux Amazon mar an gcóras oibriúcháin.
    * Má tá do ríomhaire deisce / ríomhaire glúine ar ríomhaire Windows, is féidir leat é a úsáid[Nuacht agus Imeachtaí](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html), cliant SSH saor in aisce do Windows, rochtain a fháil ar líne ordú do shampla EC2 ar. Nó, d'fhéadfá a bheith roinnt clár SSH eile gur fearr leat.
    * Nuair a logálann tú isteach i do chás EC2, beidh tú logáilte isteach mar an t-úsáideoir riaracháin leis an ainm úsáideora "ec2-úsáideoir". ec2-úsáideoir pribhléidí sudo. Mar sin, nuair is gá duit rud éigin a dhéanamh mar an t-úsáideoir fréimhe, úsáid: sudo *roinnt TráchtearraÃ* 
    * Má tá do ríomhaire deisce / ríomhaire glúine ar ríomhaire Windows, is féidir leat é a úsáid[cliceáil grianghraf a mhéadú](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp), clár SFTP saor in aisce, chun comhaid a aistriú chuig / ó do shampla EC2. Nó, d'fhéadfá a bheith roinnt clár SFTP eile gur fearr leat.
    *   [Suiteáil apache](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html)ar do shampla EC2.
    * Lean an caighdeán[ERDDAP™treoracha a shuiteáil](/docs/server-admin/deploy-install).
         
### WaitThenTryAgain Eisceacht{#waitthentryagain-exception} 
Is féidir le húsáideoir a fháil teachtaireacht earráide cosúil
WaitThenTryAgainException:
Bhí ann (sealadach?) fadhb. Fan nóiméad, ansin déan iarracht arís. (I bhrabhsálaí, cliceáil ar an gcnaipe Athlódáil.)   
Sonraí: GridDataAccessor.crimintigh: páirteachResults\\[0 0\\]= "123542730" Bhí súil a bheith "123532800".

Is é an míniú ginearálta ar an WaitThenTryAgainException:
Nuair a bheidhERDDAP™ag freagairt d'iarratas úsáideora, d'fhéadfadh go mbeadh earráid gan choinne leis an tacar sonraí (e.g., earráid agus sonraí a léamh ón gcomhad, nó earráid a rochtain tacar sonraí iargúlta) . WaitThenTryAgain comharthaí aERDDAP™gur theip ar an iarraidh (go dtí seo) ach goERDDAP™ba chóir iarracht a athlódáil an tacar sonraí go tapa (Glaonna sé[Amharc ar gach eolas](#requestreloadasap)) agus an iarraidh a athbheochan. Go minic, éiríonn sé seo, agus feiceann an t-úsáideoir ach go raibh an freagra ar an iarratas mall. amanna eile, theipeann ar an athlódáil nó tá sé ró-mhall, nó an iarracht ina dhiaidh sin chun déileáil leis an iarratas theipeann freisin agus caitheann eile WaitThenTryAgain. Má tharlaíonn sin,ERDDAP™marcanna an tacar sonraí le haghaidh athlódáil ach insíonn an t-úsáideoir (trí WaitThenTryAgain Eisceacht) go raibh teip agus freagairt ar an iarraidh.

Is é sin an gnáth-iompar. Is féidir leis an gcóras seo déileáil le fadhbanna coitianta go leor.
Ach is féidir an córas seo a fháil spreagtha excessively. Is é an chúis is coitianta ná goERDDAP's luchtú an tacar sonraí nach bhfuil a fheiceáil fadhb, achERDDAP's freagra ar iarraidh ar shonraí a fheiceann an fhadhb. Is cuma cad é an chúis, is é an réiteach chun tú chun déileáil le cuma cad atá mícheart leis an tacar sonraí. Féach i log.txt a fheiceáil ar na teachtaireachtaí earráide iarbhír agus déileáil leis na fadhbanna. Má tá go leor de na comhaid headers bailí ach sonraí neamhbhailí (comhad truaillithe) , in ionad na comhaid le comhaid uncorrupted. Má tá an ceangal le RAID calógach, é a shocrú. Má tá an nasc le seirbhís iargúlta flakey, teacht ar bhealach a dhéanamh nach bhfuil sé flakey nó a íoslódáil na comhaid go léir ón bhfoinse iargúlta agus na sonraí a sheirbheáil ó na comhaid áitiúla.

An míniú mionsonraithe ar an earráid ar leith (thuas thuas) is:
I gcás gachEDDGridtacar sonraí,ERDDAP™Coinníonn na luachanna ais athraitheach i gcuimhne. Úsáidtear iad, mar shampla, chun luachanna aise iarrtha a thiontú a úsáideann an " () " formáid i uimhreacha innéacs. Mar shampla, má tá na luachanna ais "10, 15, 20, 25", iarraidh ar (20 bliain) a léiriú mar iarratas ar innéacs #2 (0-bhunaithe innéacsanna) . Nuair a bheidhERDDAP™Faigheann iarratas ar shonraí agus faigheann na sonraí ón bhfoinse, fíoraíonn sé go bhfuil na luachanna ais a fuair sé ón bhfoinse mheaitseáil na luachanna ais i gcuimhne. De ghnáth, a dhéanann siad. Ach uaireanta tá an fhoinse sonraí athraithe ar bhealach suntasach: mar shampla, d'fhéadfadh luachanna innéacs ó thús an athróg ais a bheith bainte (e.g., d'fhéadfadh "10, 15, 20, 25" a bheith "20, 25, 30") . Má tharlaíonn sé sin, tá sé soiléir goERDDAP's léirmhíniú ar an iarraidh (e.g., " (20 bliain) "Is innéacs #2) Is mícheart anois. Mar sin,ERDDAP™throws eisceacht agus glaonna RequestReloadASAP.ERDDAP™Beidh cothrom le dáta an tacar sonraí go luath (go minic i cúpla soicind, de ghnáth laistigh de nóiméad) . Eile, fadhbanna den chineál céanna le caith an eisceacht WaitThenTryAgain.
    
#### Amharc ar gach eolas{#requestreloadasap} 
Is féidir leat a fheiceáil RequestReloadASAP sa comhad log.txt ceart tar éis teachtaireacht earráide agus go minic in aice le[WaitThenTryAgain Eisceacht](#waitthentryagain-exception). Tá sé go bunúsach ar bhealach inmheánach, programmatic doERDDAP™a shocrú[bratach bratach](#flag)chun comhartha gur chóir an tacar sonraí a athlódáil ASAP.
     
### Comhaid Gan a bheith Scriosta{#files-not-being-deleted} 
Le haghaidh cúplaERDDAP™suiteálacha, tá fadhb le roinnt comhaid shealadacha á gcruthú agERDDAP™ag fanacht oscailte (cineál gas: in airde) agus dá bhrí sin gan a bheith scriosta. I roinnt cásanna, tá go leor de na comhaid seo carntha agus tógtha suas méid suntasach de spás diosca.

Tá súil againn, tá na fadhbanna seo socraithe (asERDDAP™v2.) . Má fheiceann tú an fhadhb seo, seol ríomhphost chuig an eolaire + ainmneacha na gcomhaid chiontaithe go Chris. John ag noaa.gov. Tá tú roinnt roghanna chun déileáil leis an bhfadhb:

* Más rud é nach bhfuil na comhaid mór agus nach bhfuil cúis leat a reáchtáil amach as spás diosca, is féidir leat neamhaird a dhéanamh ar an bhfadhb.
* Is é an réiteach is simplí a stoptar síos tomcat /ERDDAP™  (tar éis uaireanta mar sin úsáideoirí níos lú difear) . Le linn an múchadh, más rud é nach bhfuil an córas oibriúcháin a scriosadh na comhaid, iad a scriosadh de láimh. Ansin atosúERDDAP.
         
### JSON-ld{#json-ld} 
*    **[Sonraí a mharcáil le json-ld (JSON Sonraí Nasctha) ](#json-ld)**   
    ERDDAP™úsáidí anois[taiseachas aeir: fliuch (JSON Sonraí Nasctha) ](https://json-ld.org)a dhéanamh do chatalóg sonraí agus tacar sonraí chuid den[web development](https://en.wikipedia.org/wiki/Semantic_Web), a bhfuil smaoineamh Tim Berners-Lee chun ábhar gréasáin a dhéanamh níos inléite meaisín agus meaisín "thuiscint". Úsáideann an t-ábhar json-ld[tréimhse saoil: ilbhliantúil](https://schema.org/)téarmaí agus sainmhínithe. inneall cuardaigh ([Google go háirithe](https://developers.google.com/search/docs/data-types/datasets)) agus is féidir uirlisí shéimeantach eile a úsáid an mharcáil struchtúrtha chun fionnachtain agus innéacsú a éascú. Is cosúil go bhfuil an marcóir struchtúrtha json-ld mar dofheicthe-le-dhaonna&lt;scripteanna cód ar an https://.../erddap/info/index.html web development (a bhfuil gréasáin shéimeantach[Sonraí Teagmhála](https://schema.org/DataCatalog)) agus ar gach https://.../erddap/info/*datasetID*/index.html web development (a bhfuil gréasáin shéimeantach[Toradh na sonraí](https://schema.org/Dataset)) . (Buíochas speisialta le Adam Leadbetter agus Rob Fuller of the Marine Institute in Ireland as na codanna crua den obair a dhéanamh chun an chuid seo a dhéanamhERDDAP.)   
     
### URLanna Out-Of-Dáta{#out-of-date-urls} 
Slowly ach surely, na URLanna go bhfuil soláthraithe sonraí scríofa i gcomhaid sonraí ag éirí as dáta (mar shampla,httpthiocfaidh chun bheithhttps, láithreáin ghréasáin a athshocrú, agus eagraíochtaí cosúil NODC / NGDC / NCDC atheagrú isteach NCEI) . Tá na naisc briste mar thoradh ar fhadhb riamh-ionad aghaidh ag gach suíomh gréasáin. Chun déileáil leis seo,ERDDAP™anois tá córas a thabhairt cothrom le dáta go huathoibríoch URLanna amach-de-dáta. Má Gintear Xml Feiceann URL amach-de-dáta, cuireann sé an URL cothrom le dáta a&lt;addAttributesú. Chomh maith leis sin, nuair a ualaí tacar sonraí, más rud éERDDAP™féach ar URL amach-de-dáta, athraíonn sé go ciúin é leis an URL suas chun dáta. Na hathruithe á rialú ag sraith de chuardach-le haghaidh / athsholáthair-le péirí sainmhínithe i&lt;uaireadóirí Chopard iERDDAP's
\\[taiseachas aeir: fliuch\\]/ webapps / erddap / WEB-INF / Ranganna/gov/noaa/pfel / erddap / util/messages.xml comhad. Is féidir leat athruithe a dhéanamh ann. Má tá tú moltaí le haghaidh athruithe, nó má cheapann tú ba chóir é seo a iompú isteach i seirbhís (cosúil leis na Tiontaire) , le do thoil ríomhphost Chris. John ag noaa.gov.
     
### irl - Library Service{#cors} 
* irl - Library Service ([Tras-Origin Acmhainní Roinnt](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing))   
"Is meicníocht é a cheadaíonn acmhainní srianta (e.g. clónna nóERDDAP™data recovery) ar leathanach gréasáin le hiarraidh ó fhearann eile lasmuigh den bhfearann ónar seirbheáladh an chéad acmhainn" (Amharc ar gach eolas) . Go bunúsach, Is CORS teachtaireacht is féidir a chur i header HTTP freagra, ag rá go bunúsach, "Tá sé ceart go leor leis an suíomh seo má láithreáin áirithe eile (cinn ar leith, nó go léir) riachtanais uisce: measartha (e.g., sonraí) ón suíomh seo agus é a chur ar fáil ar a láithreán". Dá bhrí sin, is rogha eile é[JSONP](https://en.wikipedia.org/wiki/JSONP).
    
Na forbróiríERDDAP™ní gá gur saineolaithe slándála iad. Nílimid soiléir go hiomlán faoi na saincheisteanna slándála a bhaineann le CORS. Ní chuirimid ag iarraidh a dhéanamh ar aon ráiteas endorsing gníomh a laghdaíonn slándáil. Mar sin, beidh muid ag fanacht ach neodrach agus é a fhágáil suas le gachERDDAP™admin a chinneadh an bhfuil na sochair nó a chumasú header CORS fiú na rioscaí. Mar i gcónaí, más rud é doERDDAP™Tá aon tacar sonraí príobháideacha, tá sé smaoineamh maith a bheith breise cúramach faoi shlándáil.
    
Más mian leat a chur ar chumas CORS do doERDDAP™, tá[treoracha ar fáil go héasca](https://enable-cors.org/index.html)cur síos ar conas is féidir le riarthóirí láithreán gréasáin ar chumas header CORS trína n-bogearraí freastalaí leibhéal níos ísle (e.g., Apache nó nginx) .
    
### Pallaidiam{#palettes} 
* Palettes a úsáidtear agERDDAP™raon luachanna sonraí a thiontú i raon dathanna nuair a bhíonn graif agus léarscáileanna á ndéanamh.
    
Tá gach pailéad sainithe i .cpt-stíl pailéad comhad mar a úsáidtear ag[Uaireadóirí GMT](https://www.soest.hawaii.edu/gmt/). Gach duineERDDAP™Tá comhaid .cpt bailí GMT .cpt comhaid, ach nach bhfuil an os coinne fíor. Le húsáid iERDDAP™, Tá comhaid .cpt:
    
    * Línte tuairimí Roghnach ag tús an chomhaid, ag tosú le "#".
    * Cuid is mó le cur síos ar na codanna den phailéad, deighleog amháin in aghaidh na líne. Tá gach líne cur síos deighleog 8 luachanna:
tús a chur Luach, tosaithe, tús a chur Glas, tús Gorm, endValue, endRed, endGreen, endBlue.
D'fhéadfadh go mbeadh aon líon na codanna.ERDDAP™Úsáideann idirshuíomh líneach idir an startRed / Glas/Blue agus endRed / Glas/Blue de gach deighleog.
        
Molaimid go sonraigh gach deighleog tús agus deireadh dath atá difriúil, agus go bhfuil an dath tús de gach deighleog a bheith mar an gcéanna leis an dath deireadh an deighleog roimhe seo, ionas go cur síos ar an pailéad meascán leanúnach de dathanna.ERDDAP™Tá córas a chruthú ar-an-eitilt pailéad na dathanna scoite ó pailéad le meascán leanúnach de dathanna. An bhfuilERDDAP™Is féidir le húsáideoir a shonrú más mian leo an pailéad a bheith Leanúnach (an bunaidh) nó Discrete (a dhíorthaítear ó na bunaidh) . Ach tá cúiseanna dlisteanacha ann gan na moltaí seo a leanúint le haghaidh roinnt pailéad.
        
    * Ní mór an startValue agus endValue bheith slánuimhreacha.
Ní mór go mbeadh an chéad deighleog tosaithe = 0 agus endValue = 1.
Ní mór go mbeadh an dara deighleog tosaithe = 1 agus endValue = 2.
Etc.
    * Ní mór na luachanna dearg, glas, agus gorm a bheith slánuimhreacha ó 0 (cineál gas: in airde) ... 255 (iomlán ar) .
    * Ní mór go mbeadh 3 líne ag deireadh an chomhaid le:
        1. Dath cúlra le haghaidh luachanna sonraí níos lú ná an t-íosmhéid datha, m.sh.: B 128
Is minic an startRed, startGreen, agus startBlue an chéad deighleog.
        2. A dath foreground do luachanna sonraí níos mó ná an t-uasmhéid colorbar, m.sh.: F 128 0
Is minic an endRed, endGreen, agus endBlue an deighleog seo caite.
        3. Dath le haghaidh luachanna sonraí NaN, m.sh., N 128
Tá sé go minic liath lár (128 128 128 128 128 128 128 128 128) .
    * Ní mór na luachanna ar gach líne a bheith scartha ag tabs, gan aon spásanna extraneous.
    
Tá sampla .cpt comhad BlueWhiteRed.cpt:
    
\\ # Níl an Tweet seo ar fáil.
0 0 0 128 1 0 255 0
1 0 0 255 2 0 255 255 255
2 0 255 255 3 255 255 255 255 255 255 255
3 255 255 255 255 255 4 255 255 255 0
4 255 255 0 5 255 0
5 255 0 0 6 128 0
0 128 0
F 128 0
L 128. 128.
    
Féach ar na comhaid atá ann cheana .cpt le haghaidh samplaí eile. Má tá deacracht le .cpt comhad,ERDDAP™Beidh caith dócha earráid nuair a bhíonn an comhad .cpt parsed (atá níos fearr ná mí-úsáid na faisnéise) .
    
Is féidir leat pailéid bhreise a chur leisERDDAP. Is féidir leat iad féin a dhéanamh nó iad a fháil ar an ngréasán (mar shampla, ag[cpt-city](http://soliton.vm.bytemark.co.uk/pub/cpt-city/)) cé go mbainfidh tú dócha go bhfuil a n-formáid in eagar beagán a bheith i gcomhréir leERDDAP's.cpt requirements. A fháilERDDAP™a úsáid comhad nua .cpt, an comhad a stóráil i *taiseachas aeir: fliuch* Sonraí Teagmhála (beidh ort é sin a dhéanamh do gach leagan nua deERDDAP) agus ceachtar:
    
    * Má úsáideann tú an comhad teachtaireachtaí réamhshocraithe.xml: cuir an ainm comhaid leis an&lt;palettes × chlib
         *taiseachas aeir: fliuch* / webapps / erddap / WEB-INF / Ranganna/gov/noaa/pfel / erddap / util/messages.xml.
Má dhéanann tú seo, ní mór duit é a dhéanamh gach uair a uasghrádú túERDDAP.
    * Má úsáideann tú comhad teachtaireachtaí saincheaptha.xml: cuir an ainm comhaid leis an&lt;Pailéid chlib i do teachtaireachtaí saincheaptha.xml comhad: *taiseachas aeir: fliuch* / ábhar / bairille / mogalra.xml . Má dhéanann tú é seo, ní mór duit ach é a dhéanamh uair amháin (ach tá obair eile a choimeád ar bun comhad teachtaireachtaí saincheaptha.xml) .
    
Ansin atosúERDDAP™amhlaidhERDDAP™fógraí na hathruithe. Is buntáiste é an cur chuige seo gur féidir leat ordú na bpailéad a shonrú sa liosta a chuirtear i láthair d'úsáideoirí. Má chuireann tú bailiúchán, molaimid duit réimír a chur leis na túslitreacha údair (e.g., "KT\\_" " ") go dtí ainm gach pailéad chun an bailiúchán a aithint agus ionas gur féidir go mbeadh pailéid iolracha ann a mbeadh an t-ainm céanna aige murach sin.
    
Ná bain nó athrú ar aon cheann de na pailéid caighdeánach. Is gné chaighdeánach de gachERDDAP™suiteálacha. Má cheapann tú gur chóir pailéad nó bailiúchán pailéad a chur san áireamh sa chaighdeánERDDAP™dáileadh toisc go mbeadh sé / siad a bheith ar úsáid ghinearálta, le do thoil ríomhphost a chur chuig Chris. John ag noaa.gov.
    
### Seirbhís do Chustaiméirí{#colorbars} 
*    **Conas a dhéanannERDDAP™na dathanna a ghiniúint i dathbharra?** 
    
    1. Roghnaíonn an t-úsáideoir ar cheann de na réamhshainithe[riachtanais uisce: measartha](#palettes)nó a úsáideann an mhainneachtain, e.g., Rainbow. Palettes a stóráil / a shainmhíniú i GMT-stíl .cpt dath Palette Tábla comhaid. Gach ceann deERDDAP's palettes réamhshainithe Tá raon slánuimhir simplí, m.sh., 0 go 1 (má tá ach alt amháin sa phailéad) , nó 0 go 4 (má tá ceithre rannóg sa phailéad) . Clúdaíonn gach deighleog sa chomhad n go n+1, ag tosú ag n = 0.
    2.  ERDDAP™Gineann nua .cpt comhad ar-an-eitilt, ag scaling an pailéad réamhshainithe raon (e.g., 0 go 4) go dtí an raon de na pailéad ag teastáil ón úsáideoir (e.g., 0.1 go 50) agus ansin a ghiniúint alt sa phailéad nua do gach roinn den phailéad nua (e.g., scála logála le sceartáin ag 0.1, 0.5, 1, 5, 10, 50 Beidh 5 rannóg) . Tá an dath do phointe deireadh gach roinn a ghintear trí aimsiú an chuid ábhartha den phailéad sa chomhad .cpt, ansin líneach idirshuíomh an R, G, agus B luachanna. (Sin mar an gcéanna le conas a ghineann GMT dathanna as a chuid comhad Tábla Dath Palette.) Ceadaíonn an córas seoERDDAP™tús a chur le pailéad cineálach (e.g., Rainbow le 8 deighleoga, san iomlán a chuimsíonn 0 go 8) agus palettes saincheaptha a chruthú ar-an-eitilt (e.g., Rainbow saincheaptha, a léarscáileanna 0.1 go 50 mg/L leis na dathanna tuar ceatha) .
    3.  ERDDAP™ansin úsáideann an comhad .cpt nua a ghiniúint an dath do gach picteilín daite éagsúla sa bharra dath (agus ina dhiaidh sin do gach pointe sonraí nuair a bhreacadh sonraí ar graf nó léarscáil) , arís ag aimsiú an chuid ábhartha den phailéad sa chomhad .cpt, ansin idirshuíomh líneach an R, G, agus B luachanna.
    
Is cosúil go bhfuil an próiseas seo casta gan ghá. Ach réitíonn sé fadhbanna a bhaineann le scálaí logáil atá deacair a réiteach bealaí eile.
    
Mar sin, conas is féidir leat a mimic cadERDDAP™ag déanamh? Níl sé sin éasca. Go bunúsach is gá duit a dhúbailt ar an bpróiseas aERDDAP™ag baint úsáide as. Má tá túJavaRíomhchláraitheoir, is féidir leat an céanna a úsáidJavarang aERDDAP™úsáidí a dhéanamh seo go léir:
     *taiseachas aeir: fliuch* / webapps / erddap / WEB-INF / Ranganna/gov/pfel/pfaire / sgt / CompoundColorMap.java.
    
### Treoirlínte do Chórais Dáileadh Sonraí{#guidelines-for-data-distribution-systems} 
Is féidir tuairimí níos ginearálta maidir le dearadh agus meastóireacht na gcóras dáileacháin sonraí a fháil[anseo](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html).
     
### Amharc ar gach eolas{#archiveadataset} 
San áireamh i doERDDAP™Is uirlis líne ordú ar a dtugtar ArchiveADataset is féidir cabhrú leat a dhéanamh cartlann (a.zipnó.tar.gzcomhad comhad) le cuid nó gach ceann de na tacar sonraí atá stóráilte i sraith de netcdf-3.nccomhaid sonraí i bhformáid comhaid atá oiriúnach le cur isteachNOAA's cartlann NCEI (.ncle haghaidh tacar sonraí greilleáilte nó[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)le haghaidh tacar sonraí tabular, mar atá sonraithe ag an[NCEINetCDFPlean Gníomhaíochta don Oideachas](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html)) .

Amharc ar gach eolas Is féidir tacar sonraí a dhéanamh dhá formáidí cartlainne éagsúla:

* Leanann an fhormáid "bunaidh" seo[NCEI Archiving Guidelines EN](https://www.ncdc.noaa.gov/atrac/guidelines.html), an treoir seo le haghaidh[Do chuid Sonraí ag NCEI](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1), agus an gaolmhara[Cleachtais maidir le Comhtháthú Sonraí a Chinnteoidh](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity).
* Déanann an fhormáid "BagIt"[Comhaid Mála sé](https://en.wikipedia.org/wiki/BagIt), formáid cartlainne caighdeánaithe chun cinn ag an Leabharlann US na Comhdhála, mar atá sonraithe ag an[Mála sé v0.97 sonraíocht](https://tools.ietf.org/html/draft-kunze-bagit-14).NOAA's NCEI a chaighdeánú ar chomhaid BagIt le haghaidh aighneachtaí chuig an gcartlann.

Ní ionadh, an[meiteashonraí domhanda agus athraitheacha](/docs/server-admin/datasets#global-attributes)go bhfuilERDDAP™spreagann/requires beagnach go díreach mar an gcéanna i-comhad CF agus ACDD meiteashonraí a spreagann NCEI / a éilíonn, mar sin ba chóir go léir do thacair sonraí a bheith réidh le cur isteach chuig NCEI via[Seirbhís do Chustaiméirí](https://www.nodc.noaa.gov/s2n/)nó[Amharc ar gach eolas](https://www.ncdc.noaa.gov/atrac/index.html)  (NCEI's Advanced Tracking and Resource tool for Archive Collections) .

Má tá tú (anERDDAP™internet marketing) úsáid ArchiveADataset chun sonraí a chur isteach chuig NCEI, ansin tú (taiseachas aeir: fliuch) a chinneadh nuair a chur isteach smután sonraí chuig NCEI agus cad a bheidh smután a bheith, mar beidh a fhios agat nuair a bhíonn sonraí nua agus conas a shonrú go smután (agus ní bheidh NCEI) . Dá bhrí sin, Is ArchiveADataset uirlis chun tú a úsáid chun pacáiste a chruthú a chur faoi bhráid NCEI.

Amharc ar gach eolas D'fhéadfadh tacar sonraí a bheith úsáideach i gcásanna eile, mar shampla, le haghaidhERDDAP™riarthóirí a bhfuil gá acu a thiontú fo-thacar de tacar sonraí (ar príobháideachERDDAP) óna formáid comhaid dúchais i sraith de[.ncCF comhaid](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA), ionas go poiblíERDDAP™is féidir freastal ar na sonraí ó.ncCF comhaid in ionad na comhaid bunaidh.

Nuair a bheidh tú ar bunERDDAP™agus é a reáchtáil (am amháin ar a laghad) , is féidir leat a aimsiú agus a úsáid ArchiveADataset sa *taiseachas aeir: fliuch* / iarratais / iarratas / eolaire WEB-INF. Tá script bhlaosc (Cartlanna.sh) do Linux / Unix agus comhad bhaisc (Bhí an t-eolas úsáideach) do Windows.

Ar Windows, an chéad uair a ritheann tú ArchiveADataset, is gá duit a chur in eagar ar an ArchiveADataset. comhad bat le eagarthóir téacs a athrú ar an cosán ar an java. exe comhad ionas gur féidir le Windows teachtJava.

Nuair a ritheann tú ArchiveADataset, beidh sé a iarraidh ort sraith ceisteanna. I gcás gach ceist, cineál freagra, ansin brúigh Iontráil. Nó brúigh ^C a scoir clár ag am ar bith.

Nó, is féidir leat a chur ar na freagraí ar na ceisteanna, in ord, ar an líne ordú. Chun seo a dhéanamh, reáchtáil an clár uair amháin agus cineál i agus scríobh síos do chuid freagraí. Ansin, is féidir leat a chruthú líne ordú amháin (leis na freagraí mar paraiméadair) a ritheann an clár agus freagraí na ceisteanna go léir.
Bain úsáid as an réamhshocraithe focal más mian leat a bhaint as an luach réamhshocraithe le haghaidh paraiméadar ar leith.
Úsáid "" (dhá Sleachta dúbailte) mar sealbhóir áit le haghaidh teaghrán folamh.
Is féidir paraiméadair a shonrú ar an líne ordú a bheith an-áisiúil, mar shampla, má úsáideann tú ArchiveADataset uair sa mhí chun fiú na sonraí mí a chartlannú. Nuair a bheidh tú a ghintear an líne ordú le paraiméadair agus a shábháil go i do nótaí nó i script bhlaosc, ní mór duit ach a dhéanamh athruithe beaga gach mí a dhéanamh go bhfuil an mhí cartlann.

Tugann na ceisteanna a iarrann ArchiveADataset deis duit:

* Sonraigh pacáistiú comhad bunaidh nó Bagit. Do NCEI, úsáid a bhaint as Bagit.
* Sonraigh zip nó tarra.gzcomhbhrú don phacáiste. Do NCEI, tarra a úsáid.gz.
* Sonraigh seoladh ríomhphoist teagmhála don chartlann seo (beidh sé scríofa sa chomhad READ\\_ME.txt sa chartlann) .
* Sonraigh andatasetIDde na tacar sonraí is mian leat a chartlann.
* Sonraigh a athróg sonraí is mian leat a chartlann (de ghnáth go léir) .
* Sonraigh an fo-thacar den tacar sonraí is mian leat a chartlann. Ní mór duit a formáid an fo-thacar ar an mbealach céanna go mbeadh tú formáid fo-thacar le haghaidh iarratas sonraí, mar sin beidh sé difriúil le haghaidh gridded ná le haghaidh tacar sonraí tabular.
    * Le haghaidh tacar sonraí gridded, is féidir leat a shonrú ar raon de luachanna an ghné leftmost, de ghnáth go bhfuil raon ama. Déanfaidh ArchiveADataset iarratas ar leith agus ginfidh sé comhad sonraí ar leith do gach luach i réimse na luachanna. Ós rud é go bhfuil tacair sonraí gridded de ghnáth mór, beidh ort beagnach i gcónaí a shonrú fo-thacar beag i gcoibhneas le méid an tacar sonraí ar fad.
Mar shampla,\\[ (2015-12-01) : (2015-12-31) \\]\\[\\]\\[\\]\\[\\]
    * I gcás tacar sonraí tabular, is féidir leat aon bhailiúchán de shrianta a shonrú, ach is minic go bhfuil raon ama ann. Ós rud é go bhfuil tacair sonraí tabular de ghnáth beag, is minic is féidir aon srianta a shonrú, ionas go mbeidh an tacar sonraí ar fad gcartlann.
Mar shampla, &amp; × = 2015-12-01 agus am&lt;Dáta foilsithe
* I gcás tacar sonraí tabular: sonraigh liosta scartha de 0 nó níos mó athróg a chinneadh conas a bhfuil na sonraí cartlainne fo-thacar breise i gcomhaid sonraí éagsúla. Le haghaidh tacar sonraí a bhfuil
    [Táirgí do bhfianaise faoi stiúir glan](/docs/server-admin/datasets#cdm_data_type)\\ = Amanna|Tuilleadh roghanna...|Seirbhís do Chustaiméirí|Traidisiún comhad
ba chóir duit a shonrú beagnach i gcónaí ar an athróg go bhfuil an cf\\_role=timeseries\\_id (e.g.,stationID) nó cf\\_role = trajectory \\_id tréith. Beidh ArchiveADataset a dhéanamh ar iarratas ar leith agus a ghiniúint comhad sonraí ar leith do gach teaglaim de na luachanna na n-athróg, m.sh., do gachstationID.
I gcás gach tacar sonraí tabular eile, ní bheidh tú a shonrú dócha aon athróg chun na críche sin.
Rabhadh: Má tá an fo-thacar den tacar sonraí a bhfuil tú ag cartlannú an-mhór (cliceáil grianghraf a mhéadú) agus níl aon athróg oiriúnach chun na críche sin, ansin níl ArchiveADataset inúsáidte leis an tacar sonraí seo. Ba chóir go mbeadh sé seo annamh.
* Sonraigh an fhormáid comhaid do na comhaid sonraí a bheidh a chruthú.
Le haghaidh tacar sonraí gridded, le haghaidh NCEI, úsáid.nc.
Le haghaidh tacar sonraí tabular, le haghaidh NCEI, úsáid[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)más rogha é; úsáid ar shlí eile.nc.
* Sonraigh an cineál díleá comhad a bheidh le cruthú do gach comhad sonraí agus don phacáiste cartlainne ar fad: MD5, SHA-1, nó SHA-256. Soláthraíonn an díleá comhad ar bhealach don chliant (e.g., NCEI) a thástáil an bhfuil an comhad sonraí a bheith truaillithe. Go traidisiúnta, bhí na[.md5 comhaid](https://en.wikipedia.org/wiki/MD5), ach anois tá roghanna níos fearr. Le haghaidh NCEI, bain úsáid as SHA-256 .

Tar éis duit na ceisteanna go léir a fhreagairt, beidh ArchiveADataset:

1. Déan sraith d'iarrataí ar an tacar sonraí agus na comhaid sonraí a eascraíonn i *Treoir do Thuismitheoirí* Seirbhís do Chustaiméirí *datasetIDTáirgí gaolmhara* /.
Maidir le tacair sonraí greilleáilte, beidh comhad ann do gach luach den ghné is fágtha (e.g., am) . Is é ainm an chomhaid an luach sin (e.g., an luach ama) .
I gcás tacar sonraí tabular, beidh comhad le haghaidh gach luach an... athróg (s s) . Is é ainm an chomhaid an luach sin. Má tá níos mó ná athróg amháin ann, úsáidfear na hathróga clé chun ainmneacha fo-eolaire a dhéanamh, agus úsáidfear an t-athróg is ceart chun na hainmneacha comhaid a dhéanamh.
Ní mór do gach comhad sonraí a&lt;2GB (an t-uasmhéid a cheadaítear.ncleagan 3 comhaid) .
2. Déan comhad a bhaineann le gach comhad sonraí leis an díolama an comhad sonraí. Mar shampla, má tá an comhad sonraí 46088.ncagus is é an cineál díolama .sha256, ansin beidh an t-ainm 46088.nc.sha256 .
3. Déan comhad DEM\\_ME.txt le faisnéis faoin gcartlann, lena n-áirítear liosta de na suímh a shonraigh tú a ghiniúint an chartlann.
4. Déan 3 comhaid i *Treoir do Thuismitheoirí* / ArchiveADataset / :
    
    * Amharc ar gach eolas.zipnó.tar.gzcomhad cartlainne ainmnithe *datasetIDTáirgí gaolmhara* .zip  (nó.tar.gz) ina bhfuil gach ceann de na comhaid sonraí stáitse agus comhaid díolama. D'fhéadfadh an comhad a bheith ar bith méid, teoranta ach amháin ag spás diosca.
    * Comhad díolama don chomhad cartlainne, mar shampla, *datasetIDTáirgí gaolmhara* .zip.sha256.txt
    * Maidir leis an gcineál "bunaidh" de chartlann, comhad téacs ainmnithe *datasetIDTáirgí gaolmhara* .zipSeirbhís do Chustaiméirí (nó.tar.gz) a liostaí de na comhaid go léir sa.zip  (nó.tar.gz) comhad.
    
Má tá tú ag ullmhú an chartlann do NCEI, is iad seo na comhaid a chuirfidh tú chuig NCEI, b'fhéidir tríd[Seirbhís do Chustaiméirí](https://www.nodc.noaa.gov/s2n/)nó[Amharc ar gach eolas](https://www.ncdc.noaa.gov/atrac/index.html)  (NCEI's Advanced Tracking and Resource tool for Archive Collections) .
5. Scrios gach ceann de na comhaid stáitse ionas go ach an comhad cartlann (e.g.,.zip) , an díolama (e.g., .sha256.txt) an chartlann, agus (go roghnach) na comhaid .listOfFiles.txt fós.

#### ISO 19115 .xml Comhaid meiteashonraí{#iso-19115-xml-metadata-files} 
Ní chuimsíonn an pacáiste cartlainne ArchiveADataset an comhad meiteashonraí ISO 19115 .xml don tacar sonraí. Más mian leat / theastaigh uait comhad ISO 19115 a chur isteach le haghaidh do tacar sonraí chuig NCEI, is féidir leat comhad meiteashonraí ISO 19115 .xml a sheoladh chuig iadERDDAP™a cruthaíodh le haghaidh an tacar sonraí (ach amháinNMFSBa chóir do dhaoine a fháil ar an comhad ISO 19115 as a gcuid tacair sonraí ó InPort más rud éERDDAP™nach bhfuil ag freastal cheana féin go comhad) .

Fadhbanna? Moltaí? ArchiveADataset nua. Má tá fadhbanna nó moltaí agat, Féach ar ár[alt ar thacaíocht bhreise a fháil](/docs/intro#support).
     
