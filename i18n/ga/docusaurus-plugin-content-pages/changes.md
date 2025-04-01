---
title: "ERDDAP™ - Changes"
---
# ERDDAP™Amharc ar gach eolas

ERDDAP™Is sampla iontach de[Úsáideoir-Driven Innovation](https://en.wikipedia.org/wiki/User_innovation), nuair is minic a thagann nuálaíocht táirgí ó thomhaltóirí (ERDDAP™úsáideoirí) , ní hamháin na táirgeoirí (ERDDAP™s’againne) . Thar na blianta, an chuid is mó de na smaointe le haghaidh gnéithe nua agus athruithe iERDDAP™tar éis teacht ó úsáideoirí. Tá na húsáideoirí creidiúnaithe thíos le haghaidh a gcuid smaointe mór. Go raibh maith agat&#33; Le do thoil a choinneáil ar na moltaí mór ag teacht&#33;

Seo iad na hathruithe a bhaineann le gachERDDAP™scaoileadh.

## Leagan 2.26{#version-226} 
 (scaoileadh 2025-02-??) 

*    **Do Gach:** 
    * Nuashonrú mór ar ár suíomh doiciméadú: https://erddap.github.io/
 
Chomh maith leis an chuma cothrom le dáta tá feabhas a chur ar nascleanúint, cuardach, aistriúchán, agus ba chóir é a bheith níos éasca a choimeád ar bun ag dul ar aghaidh&#33;

*    **Gnéithe agus Athruithe Nua (d'úsáideoirí) :** 
    * Síntiúis agusRSSBa chóir nuashonruithe tarlú níos iontaofa le haghaidh tacar sonraí a fháil cothrom le dáta go minic ó athruithe comhad.

*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * Éilíonn an scaoileadh réamhshocraithe / tacaíochtaíJavaleagan 21. Ar ais sa scaoileadh a bheith in ann a dhéanamh go héascaJava17 dénártha comhoiriúnach.

    * Gné nua a shaincheapadh ar an eolas ar taispeáint faoi thacair sonraí sa Chomhéadain. Táimid ag súil go mbeidh sé seo úsáideach go háirithe chun rudaí a chur ar nós lua sonraí. Le haghaidh tuilleadh sonraí is féidir leat a léamh[data recovery](/docs/server-admin/display-info.md). A bhuíochas le Ayush Singh don ranníocaíocht&#33;

    * méadracht Prometheus breise. Is é an ceann is mó `http_request_duration_seconds` lena n-áirítear amanna freagartha a iarraidh briste síos ag: "request_type", "dataset_id", "dataset_type", "file_type", "lang_code", "status_code"
Beidh an fhormáid seo meaisín inléite ar chumas bailiúchán níos fearr de méadracht a thuiscint conas úsáideoirí ag baint úsáide as an bhfreastalaí.

    * Bealach nua a ghiniúint comhaid ISO19115 XML. Úsáideann sé Apache SIS agus is rogha nua sa scaoileadh. Cuir ar chumas é agus aiseolas a sheoladh.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * Beidh an Chomhéadain a chruthú anois naisc aonair do gach url i réimsí cosúil leis aninfoUrlagus achoimre.

    * Síntiúis agusRSSBa chóir nuashonruithe tarlú níos iontaofa le haghaidh tacar sonraí a fháil cothrom le dáta go minic ó athruithe comhad. Má cúiseanna seo saincheisteanna, le do thoil a bhaint amach ar GitHub agus an fheidhmiúlacht a dhíchumasú tríd an bhratach thíos a chur le do thus.xml.
Déan teagmháil linn
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Beidh athróg subset a thuilleadh a ghintear go huathoibríoch le haghaidh cineál tacar sonraí EDDTableFromNcCFFiles. Má bhí tú ag brath ar an iompar, is féidir leat ceachtar (réiteach fearr) cuir ansubsetVariablesleis an sainmhíniú tacar sonraí i dodatasets.xml, nó cuir an bhratach thíos le do thus.xml. Má bhraitheann tú an gá atá le dul ar aghaidh, le do thoil a bhaint amach ar GitHub ionas gur féidir linn tacaíocht níos fearr do chás úsáide ag gluaiseacht ar aghaidh.
Déan teagmháil linn
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * Beidh an freastalaí atreorú anois iarratais doiciméadú (faoi íoslódálacha/a bhfuil an cháipéisíocht atá ar imirce) chuig an suíomh doiciméadúcháin nua. Más gá is féidir leat é seo a dhíchumasú le bratach i thus.xml:
Déan teagmháil linn
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Roinnt athruithe beaga agus Ceartúcháin bug.

*    **Le haghaidhERDDAP™Forbróirí:** 
    * Feabhsuithe cáilíochta cód níos mó agus cleanup cód marbh. Áirítear leis seo optimizations saorga, láimhseáil níos fearr ar acmhainní closable, agus imirce amach ó chineálacha sonraí fada i léig (cosúil le Veicteoir) .

    * Refactoring mór le EDStatic a tharraingt amach an chuid is mó de na config, teachtaireacht, agus cód méadrach. encapsulates sé níos fearr initialization agus láimhseáil na cosáin eolaire (tá na 2 seo caite níos mó a dhéanamh.) 

    * Go leor dul chun cinn i dtreo íomhá Docker tacaíocht go hoifigiúil. Is é an plean a thabhairt chun críche agus a scaoileadh tar éisERDDAP™Tá scaoileadh 2.26 ar fáil.

## Leagan 2.25{#version-225} 
 (scaoileadh 2024-10-31) 

*    **Gnéithe agus Athruithe Nua (d'úsáideoirí) :** 
    * Is féidir le EDDTableFromFiles tacú anois ceisteanna le aschur amháin a dhíorthaítear (globals, script jexl, nó athróga) .
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * Leagan 2.25 éilíonnJava21 nó níos nuaí. Is é seo an leagan LTS agus tá sé ar fáil ar feadh níos mó ná bliain.
         
    * Is é an SharedWatchService anois ar an réamhshocraithe. Más gá duit é a dhíchumasú, téigh i dteagmháil le chris. john ag noaa.gov chun ligean dom a fhios, mar sin is féidir liom é a fheabhsú i leaganacha amach anseo agus cuir:
        &lt;cliceáil grianghraf a mhéadú&lt;/useSharedWatchService ú le do thus.xml.
         
    * An bhfuilERDDAP™Beidh servlet tús anois ag tosaithe freastalaí. Ciallaíonn tacar sonraí tús a luchtú láithreach in ionad fanacht go dtí go bhfuil iarratas a dhéanamh.
         
    * Beidh éifeacht anois ag an bparaiméadar a bhaintMVRows in EDDTableFromMultidimNcFiles. D'fhéadfadh sé a leagan bréagach dlús a chur go suntasach roinnt ceisteanna, ach d'fhéadfadh sé seo a bheith oiriúnach do gach tacar sonraí. Le haghaidh tuilleadh eolais féach ar an[cur síos ar an paraiméadar](/docs/server-admin/datasets#removemvrows).
         
    * An tSraith Shinsearach (EDDTableFromNcFiles agusEDDGridSeirbhís do Chustaiméirí) ag baint úsáide as comhaid zarr tacaíocht anois. Ní mór dóibh a chur san áireamh "zarr" i gceachtar an comhad NameRegex nó pathRegex. Féach an[Sceimhlitheoireacht zarr sna doiciméid tacar sonraí](/docs/server-admin/datasets#zarr)le haghaidh tuilleadh sonraí.
         
    * Cineál tacar sonraí nua, EDDTableFromParquetFiles Tá tacaíocht anois. Féach an[EDDTableFromParquetFiles secion in the dataets documents](/docs/server-admin/datasets#eddtablefromparquetfiles)le haghaidh tuilleadh sonraí.
         
    *   [méadracht Prometheus](https://prometheus.io/)Tá siad ar fáil anois ag /erddap / méadracht.
         
    * Tá cur i bhfeidhm parsálaí XML nua ar fáil. Ceadaíonn an parsálaí nua ag baint úsáide as XInclude indatasets.xml. Buíochas le Ayush Singh don ghné.
         
    * paraiméadar nua idatasets.xmla rialú ríomhphoist ghníomhaíocht neamhghnách. Gníomhaíocht neamhghnách FailPercent mainneachtainí leis an luach d'aois de 25%. Buíochas le Ayush Singh don ghné.
         
    * Paraiméadar nua i thus.xml a rialaíonn má earráidí luchtú tacar sonraí a thaispeántar ar an leathanach status.html. D'éiligh sé a bheith fíor, a dhíchumasú earráidí tacar sonraí ar an leathanach stádas, a leagtar showLoadErorsOnStatusPage a bréagach:&lt;a thaispeáint Luchtaigh Táirge&lt;/ Taispeáin Luchtaigh Córais
         
    * Roinnt athruithe beaga agus Ceartúcháin bug.
         
*    **Le haghaidhERDDAP™Forbróirí:** 
    * Tástáil scartha go aonad agus comhtháthú (mall) tástálacha. Chomh maith leis sin tástálacha níos cumasaithe agus tástálacha déanta níos lú flaky.
         
    * Gearáin agus Cur i bhFeidhm (roinnt seiceálacha faoi mhíchumas) agus Bugs Spot comhtháite trí Maven.
         
    * Iomlán cód bonn formáidithe a mheaitseáil leis an Treoir Stíl Google.
         

## Leagan 2.24{#version-224} 
 (scaoileadh 2024-06-07) 

*    **Gnéithe agus Athruithe Nua (d'úsáideoirí) :** 
    * Pailéad dath nua EK80 le haghaidh tacar sonraí fuaimiúla ar fáil. Buíochas le Rob Cermak as seo.
         
    * Fixen ceist nuair nach raibh EDDTableAggregateRows thaispeáint raonta cuí ó gach leanbh. Buíochas le Marco Alba don tuarascáil a shocrú agus a bug.
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * DO DHÉANAMH: ATHRÚ SLÁNDÁLA: D'fhéadfadh Google Fíordheimhniú gá athruithe ar do CSP.
        
Go sonrach, b'fhéidir gur gá duit a chur leis freisin https://accounts.google.com/gsi/style a stlye-src agus https://accounts.google.com/gsi/ ceangal-src. Chun an script-src is féidir leat úsáid a bhaint anois https://accounts.google.com/gsi/client.
 
        
Le haghaidh tuilleadh eolais is féidir leat dul go dtí an[leathanach Google](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)faoi chumraíocht CSP.
         
        
    * Seirbhís Faire Comhroinnte Nua. Is rogha nua é seo chun breathnú ar eolairí le haghaidh nuashonruithe. Tá snáithe amháin aige do gach córas comhaid in ionad snáithe amháin in aghaidh an tacar sonraí. Is dóichí go laghdóidh sé seo go suntasach líon na snáitheanna a úsáidtear chun féachaint ar athruithe. Ciallaíonn sé gach tacar sonraí a fháil cothrom le dáta le chéile in ionad gach tacar sonraí a bhfuil a minicíocht nuashonrú féin. Is dócha go mbeidh sé seo i gceist nuashonruithe níos minice don chuid is mó tacar sonraí.
        
Chun cur ar chumas seo a chur&lt;cliceáil grianghraf a mhéadú&lt;/useSharedWatchService ú le do thus.xml.
        
          
Déan iarracht é seo agus tuairisc a thabhairt ar ais conas a oibríonn sé chun tú a chris. ag noaa.gov.
         
    * Fix le haghaidh ainmneacha var mícheart i logs. Buíochas le Ayush Singh don shocrú.
         
    * Roinnt athruithe beaga agus Ceartúcháin bug.
         
*    **Amharc ar gach eolasERDDAP™forbróirí:** 
    * Tacaíocht d'fhorbairt áitiúil ag baint úsáide as Docker. Go raibh maith agat Matt Hopson agus Roje.
         
    * Tacaíocht d'fhorbairt áitiúil ag baint úsáide as feabhsúcháin Scairdty agus doiciméid. Go raibh maith agat Micah Wengren.
         
    * Athruithe ar thástálacha chun saincheisteanna tras-ardán a laghdú. Go raibh maith agat Scoil Shane Savage.
         

## Leagan 2.23{#version-223} 
 (scaoileadh 2023-02-27) 

Tabhair faoi deara go ndearna Bob Simons an scaoileadh seo, rud a léiríonn go bhfuil sé fós thart agus gníomhach le linn an aistrithe go Chris John, a chomharba. Ag rá leis an scaoileadh seo, tá gach athrú cód á dhéanamh ag Chis John, mura sonraítear a mhalairt.

*    **Gnéithe agus Athruithe Nua (d'úsáideoirí) :** 
    *    (Gan a bheith ráite)   
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * DO DHÉANAMH: ATHRÚ SLÁNDÁLA: Tá Google Fíordheimhniú i gcrích anois tríd an leabharlann nua Seirbhísí Aitheantais Google atá mar chuid de "Sign In with Google". Beidh deireadh le tacaíocht Google don sean "Google Sign In" córas 2023-03-31. Mar sin, má úsáideann tú Google Fíordheimhniú i doERDDAP™suiteáil, MUST tú cothrom le dáta aERDDAP™v2.23 + roimh ansin. (Bob Tá brón orainn don fhógra gearr. Tá sé locht Bob.)   
         
    * Molta: Tá NCCSV anois v1.2. Is é an t-athrú go bhfuil na comhaid anois UTF-8-ionchódaithe comhaid (bhí siad ASCII) agus mar sin is féidir a chur san áireamh anois aon charachtar Unicode mar atá, gan ionchódú mar \\u_hhhhh_, cé go bhfuil cead fós.
Nuair a scríobh comhaid NCCSV,ERDDAP™scríobhann anois v1.2 comhaid.
        ERDDAP™beidh léamh fós comhaid NCCSV a leanann an v1.0 agus v1.1 sonraíocht.
A bhuíochas le Pauline-Chauvet, n-a-t-e, agus thogar-ríomhaire do mholadh seo agus na tástálacha a dhéanamh chun a chinntiú gur féidir le cláir scarbhileog éagsúla a allmhairiú comhaid UTF-8. Buíochas le Bob Simons don athrú cód.
         
    * NUA: Tá an leathanach gréasáin status.html anois líne in aice leis an mbarr a léiríonn a bhfuil tacar sonraí loadDatasets luchtú faoi láthair agus staitisticí gaolmhara, nó aon cheann mura bhfuil aon tacar sonraí á luchtú. Is féidir é seo a bheith an-chabhrachERDDAP™riarthóirí ag iarraidh a fháil amach cén fáth ualach Tá datasets ag glacadh chomh fada. Chomh maith leis sin, na GridDatasets, nTableDatasets, agus nTotalDatasets chomhaireamh thíos go bhfuil anois mheandarach (roimhe seo, bhí siad mar an deireadh an t-ualach mór deireanach An tSraith Shinsearach) .
Is é seo an t-athrú do Roy Mendelssohn. Buíochas le Bob Simons don athrú cód.
         
    * IMPROVED: Géiniteacha Xml athruithe anois ar CF-1.10 (Bhí CF-1.6) sna tréithe "Conventions".
Buíochas le Bob Simons don athrú cód.
         
    * Roinnt athruithe beaga agus Ceartúcháin bug.
         

## Leagan 2.22{#version-222} 
 (scaoileadh 2022-12-08) 

Tabhair faoi deara go ndearna Bob Simons an scaoileadh seo, rud a léiríonn go bhfuil sé fós thart agus gníomhach le linn an aistrithe go dtí a chomharba.

*    **Gnéithe agus Athruithe Nua (d'úsáideoirí) :** 
    *    (Gan a bheith ráite)   
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * NÁ: rud ar bith.
         
    * FÓGRAÍOCHT SLÁNDÁLA: Bhí a bug Tras-Scriptiú-a bhaineann leis an gcód don titim rogha teanga síos. Go raibh maith agatNOAAscans slándála chun teacht ar seo. Léiríonn sé seo goNOAATá slándáil go gníomhach agus go rialta ag lorg laigí slándála iERDDAP.
         
    * FIX SECURITY: Na leabharlanna go leor a úsáidtear agERDDAP™Tugadh suas chun dáta, mar is gnách, mar chuid den scaoileadh. An uair seo, bhí an tiománaí PostgreSQL á thabhairt cothrom le dáta (a raibh bug slándála) go 42.5.1.
         
    * IMPROVED: Athruithe níos beag arERDDAPBa cheart go laghdódh córas bainistíochta cuimhne an deis a bhaineann le hiarraidh ar leith de bharr easpa cuimhne atá ar fáil.
         
    * Roinnt athruithe beaga agus Ceartúcháin bug.
         

## Leagan 2.21{#version-221} 
 (scaoileadh 2022-10-09) 

*    **Gnéithe agus Athruithe Nua (d'úsáideoirí) :** 
    *    (Gan a bheith ráite)   
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * Chun a dhéanamh:Java17, ní ba chóir duit \\-d64 a úsáid i JAVA\\_OPTS i setenv.bat nó setenv.sh. Mar sin, má tá sé ann, bain é. I mo thuairimse, go bhfuil 64 modh giotán roghnaithe anois nuair a íoslódáil tú 64 leagan giotán deJava. Buíochas le Sam Woodman.
         
    * BUG FIX: Uaireanta, an córas ríomhphoist nua iarracht a logáil isteach ró-mhinic, a ba chúis le freastalaithe Google Ríomhphost a dhiúltú gach logáil amach anseo i iarrachtaí. Anois, seachnaíonn an córas ríomhphoist seo agus fadhbanna gaolmhara.
         

## Leagan 2.20{#version-220} 
 (scaoileadh 2022-09-30) 

*    **Ná húsáid v2.20. Tá sé lochtach.** Ach ní mór riarthóirí fós a dhéanamh ar na míreanna DO atá liostaithe thíos nuair a uasghrádú go dtí v2.21+.
     
*    **Gnéithe agus Athruithe Nua (d'úsáideoirí) :** 
    *    (Gan a bheith ráite)   
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * IMPROVED: Athchumasaigh muid an córas bainistíochta cuimhne d'aois (Math2.ensMemoryAvailable) agus mhodhnú an córas bainistíochta cuimhne nua (Níl an Tweet seo ar fáil) a bheith ag obair níos fearr leis. Féach ar[Stádas Cuimhne](/docs/server-admin/additional-information#memory-status)le haghaidh sonraí.
         
    * CHANGED: An mhainneachtain&lt;Déan Teagmháil Linn idatasets.xmlméadaithe ó 7 go 15. Tá sé soiléir go bhfuil roinnt dlisteanachWMSIs féidir le cliaint a ghiniúint níos mó ná 7 iarrataí comhuaineach.
         

## Leagan 2.19{#version-219} 
 (scaoileadh 2022-09-01) 

*    **Ná húsáid v2.19. Tá sé lochtach.** Ach ní mór riarthóirí fós a dhéanamh ar na míreanna DO atá liostaithe thíos nuair a uasghrádú go dtí v2.20+.
     
*    **Gnéithe agus Athruithe Nua (d'úsáideoirí) :** 
    * NUA: Tá feidhm freastalaí-taobh nua,orderByDescending, a oibríonn cosúilorderBy, ach cineál in ord íslitheach. Go raibh maith agat le Adam Leadbetter.
         
    * Molta: Anois, graif (ach ní léarscáileanna) leathnú chun an spás atá ar fáil a líonadh ar an chanbhás, i.e., spás nach n-úsáideann an finscéal. Is féidir leat a fháil graif ard, graif cearnach, nó graif leathan ag cur agus ionramháil an &amp;.size =_width_|_ paraiméadair hocht (áit a shonrú leithead agus airde an méid an chanbhás, i picteilíní) ar an URL iarrata. (Níl an Tweet seo ar fáil. Tá tú é a chur leis an URL de láimh.) Más rud é nach bhfuil tú a shonrú ar an paraiméadar &amp; méid, iarratais ar .smallPng, .png, .largePng, .smallPdf, .pdf, agus .large.pdf bhfuil méideanna chanbhás réamhshainithe, mar sin beidh do graf a leathnú a líonadh ar an spás atá ar fáil, ach beidh de ghnáth a bheith garbh cearnach. Buíochas le Bob Fleming.
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * DO DHÉANAMH:ERDDAP™Éilíonn anoisJava17 agus an Tomcat gaolmhara 10. Ní mór duit a leanúintERDDAP™treoracha a shuiteáil (nó an choibhéis e.g., do Docker) a shuiteáilJava17 agus Tomcat 10 agus cóip do\\[taiseachas aeir: fliuch\\]/ eolaire ábhar ó do Tomcat 8 suiteáil isteach sa nua\\[taiseachas aeir: fliuch\\]file. Níl aon athruithe eile gur gá duit a dhéanamh ar doERDDAPsuiteáil a bhaineann leis an athrú seo. I bhfocail eile,ERDDAP™oibreacha mar a rinne sé roimh.
        
Ná dearmad a dhéanamh ar anERDDAPathruithe a bhaineann le freastalaí Tomcat.xml agus context.xml nuair a uasghrádú tú Tomcat. Féach arERDDAP's[Treoracha suiteála Tomcat](/docs/server-admin/deploy-install#tomcat).
        
Mo tuiscint arJavaIs é 17 gur fearr leis níos mó cumhachta próiseála agus cuimhne le haghaidh feidhmeanna fadtéarmacha, níos mó cosúilERDDAP™, mar sin oibríonn sé beagán níos moille náJava8 le ríomhairí cumhachta íseal (e.g., 2 cores agus RAM íosta) agus oibríonn beagán níos tapúla náJava8 le ríomhairí cumhachta níos airde (e.g., 4+ cores agus RAM flúirseach) . Mar sin, má fheiceann tú feidhmíocht bocht, cláir a úsáid ar nós Linux[barr barr barr](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/)a sheiceáil úsáid acmhainní agus a mheas a thabhairtERDDAP™níos mó acmhainní, go háirithe níos mó cuimhne. Tá Cuimhne saor&#33; Tá an chuid is mó fóin próiseálaithe níos mó agus cuimhne ná na freastalaithe go bhfuil roinnt de tú ag baint úsáide as a reáchtáilERDDAP&#33;
Buíochas le Erin Turnbull.
         
        
    * DO DHÉANAMH: Má úsáideann túERDDAP™chun rochtain a fháil ar Cassandra, do Cassandra, ní mór duit a choinneáil ag baint úsáide as an leaganJavago raibh tú ag baint úsáide as do reáchtáil an Cassandra. Just a athrú goJava17 do reáchtáil Tomcat +ERDDAP.
         
    * DO DHÉANAMH: Molta: Má tá do fhreastalaí LAP 4 + cores agus 8 + GB RAM, a mheas ag athrú go dtí na socruithe i dodatasets.xmlcomhad:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Má tá níos lú acmhainní ag do fhreastalaí, bata go "1" don dá cheann de na socruithe sin.
Na córais nThreads doEDDGridÓ Fianáin agus EDDTable Cuireadh feabhas suntasach ar FromFiles. Na hathruithe mar thoradh ar feabhas a chur ar luas ollmhór (m.sh., 2X speedup nuair a nThreads leagtha go 2 nó níos mó) do na hiarratais is dúshlánaí (nuair nach mór líon mór de na comhaid a phróiseáil chun na torthaí a bhailiú) . Beidh roinnt athruithe gaolmhara ó Chris John mar thoradh ar luasghéarú ginearálta ar fudERDDAP. Chuir Chris John leis an gcód do na hathruithe seo. Go raibh maith agat, Chris&#33;
         
    * WARNING: hyphens idatasetID's atá dímheas agus nach bhfuil tacaíocht a thuilleadh (cé go bhfuil ceadaithe go teicniúil fós) . Beidh siad a dhícheadú dócha sa chéad scaoileadh eile. Má úsáideann tú hyphens, aistriú chuig underscores anois chun trioblóid a sheachaint. Má dhéanann tú an t-athrú anois, tá sé ar do luas féin. Má tá tú ag fanacht go dtí an chéad scaoileadh eile, beidh tú i scaoll agus caithfidh tú déileáil leis an lá sin.
         
    * NUA: Anois, le haghaidh.htmlTablefreagraí sonraí, má tá na sonraí i gcill teaghrán sonraí: íomhá / png; base64, ina dhiaidh sin ag bun64 ionchódaithe .png íomhá,ERDDAP™Beidh taispeáint deilbhín (ionas gur féidir leis an úsáideoir a fheiceáil ar an íomhá má hover siad os a chionn) agus cnaipí a shábháil ar an téacs nó an íomhá chuig an clipboard. Go raibh maith agat as Marco Alba (a chuir an cód) agus Bob Simons (a mhodhnú sé beagán) .
         
    * NUA: -doNotAddStandardNames
Má tá \\-doNotAddStandardNames mar paraiméadar líne ordú nuair a ritheann tú a ghiniúint An tSraith Shinsearach Xml, a ghiniúint An tSraith Shinsearach Ní chuirfidh Xmlstandard\\_namego dtí anaddAttributesle haghaidh aon athróg seachas athróga ainmnithe domhanleithead, domhanfhad, airde, doimhneacht nó am (a bhfuil soiléirstandard\\_names s) . Is féidir é seo a bheith úsáideach má tá tú ag baint úsáide as an aschur ó ghiniúint An tSraith Shinsearach Xml go díreach iERDDAP™gan eagarthóireacht ar an aschur, mar gheall ar ghiniúint An tSraith Shinsearach Xml guesses minicstandard\\_names mícheart. (Tabhair faoi deara go molaimid i gcónaí go bhfuil tú in eagar an t-aschur roimh é a úsáid iERDDAP.) Beidh Ag baint úsáide as an paraiméadar a bhfuil éifeachtaí eile a bhaineann le mion mar gheall ar an guessedstandard\\_namea úsáidtear go minic chun críocha eile, e.g., chun nua a chruthúlong\\_name, agus a chruthú ar na suímh colorBar. Buíochas le Kevin O'Brien.
         
    * NUA: Is féidir leat a chur anois&lt;thabhairt cothrom le dátaMaxEvents × 10&lt;/ updateMaxEvents × idatasets.xml  (i leis na suímh eile in aice leis an barr) a athrú ar an líon uasta na n-athruithe comhad (réamhshocraithe = 10) a dhéanfaidh an córas updateEveryNMillis a phróiseáil. Uimhir níos mó (100?) d'fhéadfadh a bheith úsáideach nuair a bhíonn sé an-tábhachtach go gcoimeádtar an tacar sonraí i gcónaí cothrom le dáta. Féach an[updateMaxEvents documents](/docs/server-admin/datasets#updatemaxevents). Buíochas le John Maurer.
         
    * NUA: Tacaíocht bhreise do domhanda "real\\_time= Foinse|bréagach " tréith teaghrán.
Má tá sé seo bréagach (taiseachas aeir: fliuch) agus más rud é nach bhfuil an tacar sonraí a úsáid nuashonrú Gach uaireadóirí,ERDDAP™Beidh freagraí taisce le hiarratais ar chineálacha comhaid i gcás nach mór an comhad ar fad a chruthú roimhERDDAP™is féidir tús a chur leis an freagra a sheoladh chuig an úsáideoir agus iad a athúsáid ar feadh suas le 15 nóiméad (e.g.,.nc, .png) .
Má tá sé seo leagtha chun fíor nó má dhéanann an tacar sonraí a úsáid nuashonrú Gach uaireadóirí,ERDDAP™Ní bheidh taisce na comhaid freagartha agus beidh ar ais i gcónaí comhaid a cruthaíodh nua.
Buíochas le John Maurer.
         
    * NUA: Seoltar ríomhphoist anois i ríomhphost ar leith. Déanann sé seo a luchtú tacar sonraí agus gníomhartha eile a ghiniúint r-phoist níos tapúla toisc nach bhfuil loadDatasets ag fanacht ar an ríomhphost a sheoladh, a thógann uaireanta ar feadh i bhfad. Is féidir leis an gcóras nua ríomhphoist il a sheoladh in aghaidh an tseisiúin ríomhphoist, rud a laghdaíonn líon na logálacha freastalaí ríomhphoist agus a laghdaíonn an baol dóibh siúd a bhfuil ag teip orthu toisc go bhfuil siad ró-mhinic. Tá staitisticí le haghaidh an ríomhphost Trí ar an leathanach status.html agus teachtaireachtaí diagnóiseacha i log.txt - féach ar "emailThread". Tabhair faoi deara go bhfuil tally de nEmailsPerSession = 0, Léiríonn trioblóide, i.e., bhí seisiún ríomhphoist in ann a sheoladh ar aon ríomhphoist.
Go raibh maith agat le Bob Simons.
         
    * CHANGED: Seoltar ríomhphoist anois le cód beagán difriúil (mar gheall arJava17 agus an t-athrú ar ríomhphost) . Má tá tú deacracht ríomhphoist a sheoladh, le do thoil ríomhphosterd.data at noaa.gov.
         
    * NUA: Gníomhartha cur síos go bhfuil "dteagmháil" URL iargúlta láimhseáil anois i touchThread ar leith. Déanann sé seo a luchtú tacar sonraí agus gníomhartha eile a dteagmháil URLanna níos tapúla toisc nach bhfuil loadDatasets gá chun fanacht ar an teagmháil a chur i gcrích, a thógann uaireanta ar feadh i bhfad. Tá staitisticí le haghaidh an touchThread ar an leathanach status.html agus teachtaireachtaí diagnóiseacha i log.txt - féach ar "touchThread".
Go raibh maith agat le Bob Simons.
         
    * NUA: Ar an leathanach status.html, sa "Maor LoadDatasets Sraith Am", tá colún nua "snasta" a léiríonn an líon na n-iarratas a bhí chaillfidh mar gheall ar reathaERDDAP™Bhí úsáid cuimhne ró-ard. Beidh iarrataí a chaillfidh ar ais cód stádas HTTP 503 "Seirbhís atá ar fáil". Ní raibh na hiarratais gá fadhb. Tháinig siad díreach ag am gnóthach. Bhí sé seo mar chuid de athbheochan ar conasERDDAP™Déileálann le húsáid cuimhne ard.
         
    * NUA: Ar ríomhairí Unix / Linux, tá anois ar "OS Info" líne ar an leathanach gréasáin status.html le faisnéis córas oibriúcháin reatha lena n-áirítear ualach LAP agus úsáid chuimhne.
         
    * Molta: Anois, nuair aERDDAP™Tá restarted agus quickRestart = fíor, Beidh EDDTableFromFiles dataets athúsáid fo-thacar.ncagus ar leith.nc. I gcás roinnt tacar sonraí, laghdaíonn sé seo go mór an t-am a luchtú an tacar sonraí (e.g., ó 60 soicind go 0.3s) . Chomh maith leis an ríomhphost nua Thread and taskThread (féach thuas) , ba chóir é seo luas mór suas atosúERDDAP™do go leorERDDAP™suiteálacha. Buíochas le Ben Adams agus John Kerfoot.
         
    * CHANGED: Roimhe seo, tacair sonraí dílleachta (datasets atá beo iERDDAP™ach nach bhfuil idatasets.xml) Tugadh faoi deara go simplí ar stádas. html agus i log.txt tar éis gach loadDatasets mór. Anois, tá siad a bhaint go huathoibríoch óERDDAP™agus faoi deara ar status.html agus i log.txt, agus ríomhphost a sheoladh chuig ríomhphost Gach rud. Mar sin, más mian leat a bhaint tacar sonraí óERDDAP™, anois go léir a bhfuil tú a dhéanamh é a bhaint a shmután de xml idatasets.xmlagus beidh sé a chur as oifig sa ualach mór eileDatasets. Go raibh maith agat le Bob Simons.
         
    * KNOWN BUG in netcdf-java v5.5.2 agus v5.5.3: An bhfuilEDDGridSeirbhís do Chustaiméirí Rogha Catalóg i GenerateDatasets Xml a úsáidtear a bheith ag obair le haghaidh catalóga THREDDS lena n-áirítear tagairtí do tacar sonraí i gcatalóg iargúlta THREDDS. Anois ní chuireann sé. Thuairiscigh mé an fhadhb leis na forbróirí netcdf-java.
         
    * BUG FIX: Do úsáideoirí Docker a shocrú paraiméadair thus.xml viaERDDAP\\_paramName_: le haghaidh paraiméadair orlach agus boolean (e.g., ríomhphost Seirbhís do Chustaiméirí) ,ERDDAP™Bhí ag lorg go mícheart ach _paramName_. Anois tá sé le haghaidhERDDAP\\_paramName. Buíochas le Alessandro De Donno.
         
    * CHANGE: TheERDDAP™córas tástála Úsáideann anois córas uathoibrithe a sheiceáil go bhfuil íomhánna tástála nua-chruthaithe go díreach mar súil. Go raibh maith agat as Chris John as an moladh agus Bob Simons don chur i bhfeidhm.
         

## Leagan 2.18{#version-218} 
 (scaoileadh 2022-02-23) 

*    **Gnéithe agus Athruithe Nua (d'úsáideoirí) :** 
    * Amharc ar gach eolas
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * BUG FIX:.ncNí raibh comhaid dúnta i gcásanna áirithe. Anois tá siad. A bhuíochas le Marco Alba, Roland Schweitzer, John Maurer, agus daoine eile.
         

## Leagan 2.17{#version-217} 
 (scaoileadh 2022-02-16) 

*    **Gnéithe agus Athruithe Nua (d'úsáideoirí) :** 
    * BUG FIX: Tar éis athruithe ar anorderBycóras cúpla bliain ó shin, Ní raibh Tabledap dhéanamh A Graph láimhseáil i gceart go leor ceisteanna a úsáidtearorderByXxx_. Anois a dhéanann sé. Buíochas le Maurice Libes.
         
    * CHANGE: Roimhe seo,ERDDAP™Diúltaíodh iarrataí ar. trédhearcach Png nuair a bhí na luachanna domhanleithead agus/nó fadfhad go páirteach nó go hiomlán lasmuigh den raon. (ERDDAP™GitHub Saincheisteanna #19, sa phost ag Rob Fuller - a bhuíochas sin do phost go Rob) Anois filleann sé pixel trédhearcach le haghaidh aon limistéir lasmuigh den raon an íomhá. Tá sé seo úsáideach d'iarratais cliant go leor. Rinneadh na hathruithe cód a dhéanamh ar an athrú seo go hiomlán ag Chris John. Go raibh míle maith agat go mór, Chris&#33;
         
    * CHANGE: Roimhe seo,ERDDAP™Diúltaíodh iarrataí griddap nuair a bhí na luachanna innéacs do ghné ar leith\\[airde: íseal\\]. Anois a dhéanann sé na hiarratais bailí ag swapping na luachanna íseal agus ard. Réitíonn sé seo fadhb le fada d'úsáideoirí agus do chláir sheachtracha cosúil le xtracto a raibh súil a choinneáil ar na cúpla tacar sonraí a bhfuil luachanna domhanleithead a raon ó ard go íseal d'fhonn a iarraidh ar nós\\[ (50 50 50) : (20 bliain) \\]ionas go raibh an t-iarratas i spás innéacs\\[íseal: ard\\]. Féach ar https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html Anois, iarraidh cosúil\\[ (20 bliain) : (50 50 50) \\]ar cheann de na tacair sonraí a léiriú go huathoibríoch mar\\[ (50 50 50) : (20 bliain) \\].
         
    * CHANGED: .esriAscii iarratais anois tús a chur le "Sábháil Mar" bosca dialóg i bhrabhsálaí an úsáideora. Buíochas le Joel Van Noord.
         
    * BUG FIX: Anois, más rud é an athróg domhanfhad de tacar sonraí leanbhEDDGridLonPM180 nóEDDGridTá Lon0360 tacar sonraívalid\\_minagus/nóvalid\\_maxtréith, tá siad a bhaint saEDDGridLonPM180 nóEDDGridLon0360 tacar sonraí. Buíochas le Roy Mendelssohn.
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * DO DHÉANAMH: Má bhí leagtha tú&lt;dataProviderFormActive uaire a bréagach chun déileáil go sealadach leis an leochaileacht XSS, le do thoil a leagtar ar ais go dtí fíor.
         
    * SECURITY BUG FIX: leochaileacht XSS seasta i bhFoirm Soláthraí Sonraí. Buíochas le Genaro Contreras Gutiérez.
         
    * BUG FIX: Nuair a bhí AWS S3 dirctory níos mó ná 10000 comhaid,ERDDAP™chaith "Earráid Inmheánach". Tá sé seo socraithe anois. Go raibh maith agat Andy Ziegler.
         
    * BUG FIX:EDDGridNí raibh SideBySide cead athrógsourceNames i tacair sonraí leanaí éagsúla a bheith mar an gcéanna. Anois a dhéanann sé. Buíochas le Joshua Stanford.
         

## Leagan 2.16{#version-216} 
 (a scaoileadh 2021-12-17) 

*    **Gnéithe agus Athruithe Nua (d'úsáideoirí) :** 
    * CHANGES/BUG FIXES: Athruithe beaga iomadúla ar an gcóras aistriúcháin a bhuíochas le moltaí ó eagarthóirí teanga-sonrach. Buíochas le Melanie Abecassis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian, agus Mike Smit.
         
    * ADDED séanadh cuí agus attribution do Google Translate, mar a cheanglaítear le téarmaí Google Translate. Chomh maith leis sin, an&lt;html bhéil chlib sa HTML do gach leathanach gréasáin anois aithníonn i gceart leathanaigh ghréasáin neamh-Béarla mar a bheith aistrithe meaisín. Go raibh maith agat le Mike Smit.
         
    * BUG FIX: Tá na leathanaigh ghréasáin logála isteach ag obair i gceart le suímh teanga éagsúla. Go raibh maith agat le Mike Smit.
         
    * Baile Átha CliathorderBySuim scagaire. Agus Seiceáil nua Gach agus Díseiceáil Gach cnaipí arEDDGridLeathanach gréasáin na Foirme Rochtana Sonraí. A bhuíochas leis an ranníocaíocht cód ag Marco Alba.
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * DO DHÉANAMH: Má tá tú
        &lt;CLÁR Programme (CeistMark)&lt;Seirbhís do Chustaiméirí
i do comhad thus.xml, ní mór duit a bhaint ceachtar an chlib ar fad (molta, mar sin tá an comhad réamhshocraithe a úsáidtear) nó é a athrú chuig:
        &lt;CLÁR Programme (CeistMarkImageFile)&lt;Seirbhís do Chustaiméirí
         
    * CHANGE: Díreach mar sin tá a fhios agat,[Adoptium](https://adoptium.net/?variant=openjdk8)Tá ionad AdoptOpenJDK mar phríomhfhoinse/moltaJava  (Sonraí Teagmhála) .
         
    * CHANGE: Na comhaid logála óERDDAP™, Géiniteacha Xml, agus DasDds anois UTF-8, nach bhfuil an ríomhaire a leagtar carachtar réamhshocraithe. Rinne mé a lán de seiceáil agus rinne roinnt athruithe chun a chinntiú goERDDAP™sonraí i gcónaí ar an tsraith carachtar cuí nuair a léamh nó a scríobh gach cineál comhaid, agus a thuilleadh (i roinnt cásanna) ag brath ar an ríomhaire a leagtar carachtar réamhshocraithe. cheartú seo cúpla botúin agus bhog sé chomh gar agus is féidir liom go dtí an sprioc ag baint úsáide as UTF-8 do na cineálacha comhaid agus is féidir (e.g., .log, .xml, .html,.json,.jsonl,.ncCeannteideal) . Tabhair faoi deara go bhfuil gá le go leor cineálacha comhaid níos sine a úsáid ISO-8859-1 (e.g.,OPeNDAP.ds, .dds, .csv,.tsv,.nc3,.nccsv, .) . Rinne mé roimhe seo a bheith ag obair leis an ngrúpa CF agus leUnidatatacaíocht a chur le UTF-8 in.nc3 comhaid; Bhí an dá resistant.
         
    * NUA: Nuair a íoslódáil comhaid ó AWS S3,ERDDAP's taisce Córas FromUrl iEDDGridÓ Fianáin agus EDDTable Úsáideann FromFiles anois an Bainisteoir Aistrithe AWS nua chun comhaid a íoslódáil trí shmután comhthreomhar (dá bhrí sin an-tapa) . Tá an t-ionchur sprioc leagtha go 20 Gbps, in aghaidh an chomhaid, mar sin oibríonn sé seo go maith le gach cineál AWS shampla, ach go háirithe na cinn a bhfuil den scoth " Feidhmíocht oibre". Leis an athrú seoERDDAP's taisce Cuireann córas FromUrl anois luasanna inchomparáide le cur chuige xarray ar íoslódálacha parallelized de chomhaid réamh-chunked, ach gan an gá a thiontú ar na comhaid foinse ó.ncagus.hdfi comhaid xarray smutáilte. Go deimhin,ERDDAP's córas níos fearr má tá iarraidh ina dhiaidh sin a léamh as an gcomhad céanna, mar gheall arERDDAP™Tá cóip áitiúil den chomhad anois. Tá ár bpobal a chaith blianta chaighdeánú ar.ncagus.hdfcomhaid. Anois ní gá dúinn a toss go léir amach ach a fháil ar fheidhmíocht maith nuair a stóráil sonraí i AWS S3. Buíochas le Rich Signell.
         
    * CHANGE: searchEngine = Lucene, do anois, deprecated. Is córas casta a thugann torthaí go minic atá beagán difriúil ó iompar níos inmhianaithe de searchEngine = bunaidh. Do beagnach gachERDDAP™suiteálacha, nach bhfuil an coigilteas ama de Lucene fhritháireamh na difríochtaí i dtorthaí. Bain úsáid as searchEngine = bunaidh ina ionad sin más féidir. Má cúiseanna fadhbanna, le do thoil ríomhphost Bob.
         
    * CHANGE: The Lucene searchEngine behaves níos mó cosúil leis an bunaidh searchEngine. Níl a thuilleadh aon chásanna ina cheapann lucene cluichí tacar sonraí agus nach bhfuil bunaidh. Chomh maith leis sin, rangú lucene ar anois cothrom bunaidh rátálacha (toisc go bhfuil bunaidh a úsáidtear i gcónaí a ríomh ar na rátálacha) .
         
    * BUG FIX: Ag tosú i scaoileadh le déanaí,ERDDAP™stop a fheiceáil níos mó ná an chéad 1000 rudaí i buicéad AWS S3 ar leith. Anois,ERDDAP™arís Feiceann gach ceann de na rudaí. Go raibh maith agat Andy Ziegler.
         
    * BUG FIX: Anois EDDTableAggregate Rows Cuireann anactual\\_rangetréith aon uair amháin nó níos mó de na tacair sonraí leanbh nach bhfuil a fhios riamh a athróg ''actual\\_range  (e.g., EDDTableFromDatabase) . Buíochas le Erik Geletti.
         

## leagan 2.15{#version-215} 
 (a scaoileadh 2021-11-19) 

*    **Gnéithe agus Athruithe Nua (d'úsáideoirí) :** 
    *   ERDDAP™Tá córas nua a ligean úsáideora a shonrú ar an teanga a bheidh le húsáid do gach leathanach gréasáin. Má táERDDAP™Tá suiteáil ar bun chun é a úsáid, beidh an liosta teangacha le feiceáil sa chúinne uachtarach ar dheis de gach leathanach gréasáin.ERDDAP™URL ó roimh an leagan seo ar aghaidh ag obair agus i gcónaí ar ais ábhar Béarla, mar a bhí roimhe.
        
Ní aistrítear gach téacs nó gach leathanach gréasáin. Bhí srianta ama ar an tionscadal a chosc Qi agus Bob ó dul go dtí 100%.
        
Is é an cheist soiléir: cén fáth a chuir muid an oiread sin iarracht isteach seo nuair a bheidh Chrome aistriú leathanaigh ghréasáin ar-an-eitilt? Is é an freagra: ar an mbealach seo, a fháil againn i bhfad níos mó smachta ar an gcaoi a bhfuil an t-aistriúchán a dhéanamh. Go suntasach, tá go leor de na focail nár chóir a aistriú ar na leathanaigh ghréasáin, m.sh., na teidil agus achoimrí na datasets, ainmneacha na n-athróg, paraiméadair, aonaid, agus eagraíochtaí. I bhfad ar an iarracht aistriúcháin a bhí focail agus frásaí nár chóir a aistriú. Chomh maith leis sin, na haistriúcháin meaisín beartaithe a mangle cineálacha áirithe de HTML markup. Bainistiú an t-aistriúchán a cheadaítear dúinn a íoslaghdú an fhadhb seo.
        
Rinne Qi Zeng an tionscadal aistriúcháin (a Google Summer of Code intern) agus Bob Simons ag baint úsáide as seirbhís gréasáin Google Aistriúcháin. Bhí sé ina tionscadal ollmhór. Go raibh maith agat, Qi&#33;
        
    * BUG FIX:ERDDAP™anois is féidir ID ORCID a bheith X mar dhigit dheireanach. A bhuíochas le Maurice Libes.
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * DO DHÉANAMH:
        
        * Ní mór duit a dhéanamh ar roinnt athruithe a bhaineann leERDDAP's córas nua chun ligean d'úsáideoirí a shonrú ar an teanga do leathanaigh ghréasáin.
            * Ar an chéad líne de do thus.xml agusdatasets.xmlcomhaid, athrú go: ionchódú = "UTF-8" agus athrú ionchódú an doiciméid i do eagarthóir téacs mar sin tá sé shábháil mar comhad UTF-8. Sonraí a ghiniúint Xml Glacann anois go bhfuil andatasets.xmlIs comhad UTF-8.
            * Cláir a thiomsúERDDAP: Gach ceannERDDAP™. Ba chóir comhaid java a chóireáil mar comhaid UTF-8 de réir réamhshocraithe. D'fhéadfá a chur "- ionchódú UTF-8" leis an líne ordú javac. (Rinne mé.) 
            * Chun an córas seo a chumasú (molta go láidir) , sa&lt;startBodyHtml5 ^ chlib a shonraíonn tú idatasets.xml, athrú " &amp; &amp; nbsp; &amp; nbsp; &amp; nbsp; &amp; nbsp; &amp; &amp; nbsp; &amp; nbsp; &amp; &amp; &amp; nbsp; &amp; nbsp; &amp; nbsp; &amp; &amp; nbsp; &amp; &amp; nbsp; &amp; &amp; nbsp; &amp; nbsp; &amp; nbsp; &amp; &amp; nbsp; &amp; &amp; nbsp; &amp; &amp; &amp; &amp; nbsp; &amp; &amp; &amp; &amp; nbsp; &amp; &amp; &amp; &amp; &amp; &amp; nbsp; nbsp; &amp; &amp; nbsp; nbsp; nbsp; &amp; nbsp; &amp; &amp; nbsp; nbsp; &amp; &amp; &amp; &amp; &amp; &amp; &amp; &amp; &amp; &amp; nbsp; &amp; nbsp; nbsp; &amp; nbsp; nbsp; &amp; nbsp; &amp; &amp; &amp; &amp; &amp; &amp;|&amp; teanga;" ionas go mbeidh an liosta teangacha le feiceáil sa chúinne uachtarach ar dheis de gachERDDAP™leathanach gréasáin.
            *   ERDDAP™ach úsáideann an&lt;startBodyHtml5 ^ chlib a shonraíonn tú idatasets.xmla shonrú ar an ábhar HTML don mbratach ag barr gachERDDAP™leathanach gréasáin, is cuma cén teanga a roghnaíonn an t-úsáideoir. Má athraíonn tú an chlib sin a úsáid
" " "&EasierAccessToScientificData;" in ionad "rochtain níos éasca ar shonraí eolaíochta" agus
" " "&BroughtToYouBy;" in ionad "Rugtha duit ag",ERDDAP™Beidh úsáid leaganacha aistrithe de na frásaí sa mbratach.
            * Mar an gcéanna, an réamhshocraithe nua&lt;an ShortDescriptionHtml údatasets.xmlIs maith liom
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
Is iad na 3 línte deiridh ábhar rudaí a chur in ionad le téacs aistrithe. Má thiontú tú aon cheann acu (go háirithe: Amharc ar gach eolas) nó gach ceann acu téacs follasach idatasets.xml  (a bhfuil tosaíocht aige, má tá sé i láthair) nó messages.xml, beidh an téacs sin le feiceáil is cuma cén teanga a roghnaíonn an t-úsáideoir. Níl an Tweet seo ar fáil.&lt;anShortDescriptionHtml uaire i 35 comhaid éagsúla a chur ar fáil 35 leaganacha aistrithe éagsúla den chlib sin.
        
          
         
    * CHANGED: Roinnt earráidí a láimhseáil anois beagán difriúil agus mar sin d'fhéadfaí a chur leis an tally de "Iarratais Failed" ar status.html agus sa Tuarascáil Laethúil Ríomhphost. Mar sin, d'fhéadfadh na huimhreacha a bheith beagán níos mó ná riamh.
         
    * BUG FIX: Giniúint Sonraí Xml doEDDGridLon0360 agusEDDGridLonPM180 eisiamh anois tacair sonraí foinse ledatasetID= ~".\\*\\_LonPM180" agusdatasetID= ~".\\*\\_Lon0360", faoi seach.
         

## Leagan 2.14{#version-214} 
 (a scaoileadh 2021-07-02) 

*    **Gnéithe agus Athruithe Nua (d'úsáideoirí) :** 
    *    (cineál gas: in airde)   
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * NUA:EDDGridLon0360 a dhéanann tacar sonraí greille le luachanna faddearthachta &amp; gt;=0 agus&lt;=360 ó tacar sonraí greilleáilte le luachanna faddearthachta &amp; gt;=-180 agus&lt;= 180. Féach an[EDDGridLon0360 Doiciméid](/docs/server-admin/datasets#eddgridlon0360). Go raibh maith agat le Dale Robinson.
         
    * NUA:ERDDAP™Is féidir le riarthóirí override anois aon luach i thus.xml trí athróg timpeallacht ainmnitheERDDAP\\__valueName_ roimh rithERDDAP. Mar shampla, úsáidERDDAP\\_baseUrl overrides an&lt;luach bonnUrl. Is féidir é seo a bheith handy nuair a imscaradhERDDAP™le coimeádán, mar is féidir leat a chur socruithe caighdeánacha i thus.xml agus ansin socruithe speisialta a sholáthar trí athróg comhshaoil. Má sholáthraíonn tú faisnéis rúndaERDDAP™tríd an modh seo, bí cinnte a sheiceáil go bhfanfaidh an fhaisnéis rúnda.ERDDAP™léann ach na hathróga comhshaoil uair amháin in aghaidh an tosaithe, sa chéad dara de tosaithe, mar sin ar bhealach amháin a úsáid é seo: leagtar na hathróga comhshaoil, tús a churERDDAP™, fanacht go dtíERDDAP™Tá tús curtha, ansin unset na hathróga comhshaoil. Buíochas le Marc Portier.
         
    * Molta: Anois, má tá roinnt comhaid i EDDTableFrom... Comhaid tacar sonraí le go leor de na comhaid a bhfuil roinnt luachanna an-fhada String, beidh an tacar sonraí luchtú i bhfad níos tapúla agus freagra a thabhairt ar iarrataí i bhfad níos tapúla. Roimhe seo,ERDDAP™Bheadh leithdháileadh a lán de spás le haghaidh an min agus max luachanna Teaghrán sna comhaid a stóráil le faisnéis comhad le haghaidh tacar sonraí den sórt sin. Ba é an comhad mar thoradh air sin ollmhór, is cúis é a scríobh agus a léamh go mall. Buíochas le OBIS.
         
    * Molta: Anois,ERDDAP™a dhéanann post níos fearr a léirmhíniú sraitheanna carachtar neamhghnách agus neamhbhailí i gcomhaid CSV. Buíochas le OBIS.
         
    * FIX: Tar éis bliana dtrioblóid le Cassandra, suiteáilte mé ar deireadh go rathúil Cassandra (vs) arís agus mar sin bhí sé in ann a rerun na tástálacha le Cassandra v2. Mar sin anois is féidir liom a rá níos mó muiníneach goERDDAP™oibreacha le Cassandra v2 agus v3. Buíochas le ONC.
         

## Leagan 2.12{#version-212} 
 (a scaoileadh 2021-05-14) 

*    **Gnéithe agus Athruithe Nua (d'úsáideoirí) :** 
    * BUG FIX: Má tá tú ar an blacklist síntiús, ní féidir leat a iarraidh anois liosta de do síntiúis.
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * DO: NUA: córas chun teorainn a chur go huathoibríoch ar an gcumas na n-úsáideoirí mailíseach agus ró-ionsaitheach úsáideoirí dlisteanacha a dhéanamh ar líon mór na n-iarratas comhuaineach a bheadh degrade feidhmíocht córas d'úsáideoirí eile. Tá 3 clibeanna roghnach nua idatasets.xmlar féidir leat / Níor chóir a chur ceart tar éis&lt;cliceáil grianghraf a mhéadú
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

Le haghaidh tuilleadh eolais, féach[Déan Teagmháil Linn](/docs/server-admin/datasets#ipaddressmaxrequests).ERDDAP™freisin priontaí "Líon na n-úsáideoirí uathúla (ó thús) " ar an leathanach status.html.
A bhuíochas leis an duine sa tSín ionsaí moERDDAP™suiteáil.
         
    * CHANGE go Postgresql iompar tiománaí: Nuair a thabhairt cothrom le dáta mé an tiománaí Postgresql, na hainmneacha colún sa liosta tábla a ghineann Postgresql agus GenerateDatasetsXml tháinig ar ais gach cás uachtair, in ionad gach ísliú, mar a bhí roimhe. Níl a fhios agam an ndéanfaidh sin difear rudaí eile ós rud é go minic a mheasann bunachair sonraí na hainmneacha sin a bheith neamhíogair. Oibríonn mo tacar sonraí tástála i gceart. Ach má stopann do tacar sonraí ag obair leis seoERDDAP™nuashonrú, is é seo an chúis is féidir a shaothrú ar dtús.
         
    * BUG FIX:ERDDAP™Láimhseálann anois freisin comhaid AWS S3 príobháideacha i gceart. Bhí feabhsuithe eile a bhaineann le láimhseáil comhaid AWS S3. A bhuíochas le Michael Gangl agus Dylan Pugh.
         
    * NUA:EDDGridSeirbhís do ChustaiméiríEDDGridSeirbhís do Chustaiméirí Is féidir le unpacked sonraí a léamh anois ó "struchtúr" i.nc4 agus.hdf4 comhaid. A aithint athróg atá ó struchtúr, an&lt;sourceNameú Ní mór a bhaint as an bhformáid: _fullStructureName_|_memberName_, mar shampla grúpa1/myStruct|mo Chomhalta. Buíochas le NRL.
         
    * CHANGED: Anois, má tá úsáid chuimhne reatha móide an t-iarratas seo beagán ard, leagann griddap nTrí ar an iarratas seo go 1. Dá bhrí sin,ERDDAP™conserves cuimhne nuair a bhíonn cuimhne scarce. A bhuíochas leis an duine sa tSín ionsaí moERDDAP™suiteáil.
         
    * Córas NUA chun monatóireacht a dhéanamh ar líon na gcomhad oscailte (lena n-áirítear soicéid agus roinnt rudaí eile, ní hamháin comhaid) i Tomcat ar ríomhairí Linux. Má riamh roinnt comhaid a fháil dúnta de dhearmad, d'fhéadfadh líon na gcomhad oscailte a mhéadú go dtí go mbeidh sé níos mó ná an t-uasmhéid a cheadaítear agus go leor rudaí i ndáiríre olc a tharlóidh. Mar sin anois, ar ríomhairí Linux (nach bhfuil an t-eolas ar fáil do Windows) :
        
        * Tá nua " Comhaid Oscailte" colún ar an gceart i bhfad ar an leathanach gréasáin status.html léiríonn an faoin gcéad de na comhaid max oscailte. Ar Windows, léiríonn sé ach "?".
        * Nuair a bheidhERDDAP™gineann an t-eolas sin ag deireadh gach athlódáil tacar sonraí mór, beidh sé a phriontáil chuig an logáil. comhad txt:
openFileCount =_current_max =_max_ % =_percent_
        * Má tá an céatadán 0.50%, r-phost a sheoladh chuig anERDDAP™riarthóir agus an ríomhphost Gach rud Chun seoltaí ríomhphoist.
        
Chun a fháil amach níos mó, nó má fheiceann tú an fhadhb seo ar doERDDAP™, féach[Too Comhaid Oscailte go leor](/docs/server-admin/additional-information#too-many-open-files).
A bhuíochas leis an duine sa tSín ionsaí moERDDAP™suiteáil.
         
    * NEW: Chuir mé a lán de seiceáil agus a láimhseáil ar "Too comhaid oscailte go leor", mar sin stopann an tasc díreach agus feiceann an t-úsáideoir an teachtaireacht earráide. Beidh comhaid sonraí a thuilleadh a mharcáil chomh dona má tá siad ag léamh torthaí i "Too comhaid oscailte go leor" earráid.
         
    * Baile Átha Cliath\\[Treoir do Thuismitheoirí\\]/ eolaire blag:
Má chuir tú comhad san eolaire ledatasetIDmar an t-ainm comhaid (an t-ábhar comhad nach ábhar) ,ERDDAP™beidh scrios an badFiles.nccomhad don tacar sonraí (más ann) agus athlódáil an ASAP tacar sonraí. Na cúiseanna seoERDDAP™chun iarracht a dhéanamh arís a bheith ag obair leis na comhaid roimhe (go hearráideach?) marcáilte chomh dona. Buíochas le Marco Alba.
         
    * CHANGED: Ag tús, más rud éEDDGridÓ...Rialacháin nó EDDTableFrom... Comhaid tacar sonraí ar dtús tá 0 comhaid ina liosta de na comhaid bailí ar a dtugtar (e.g., is tacar sonraí nua é) , ansinERDDAP™defers luchtú sé agus leagann bratach ionas go mbeidh sé a luchtú ASAP tar éis an loadDatasets mór críochnaithe. Luasanna seo suas an tosaithe tosaigh nuair a bhíonn tacair sonraí nua.
         
    * CHANGED: FileVisitorDNLS.testAWS3 () agus FileVisitorSubdir.testAWSS3 () ; bain úsáid as an AWS v2 anois (Níl an Tweet seo ar fáil) SDK. Mar sin anois ar an GitERDDAP™Áirítear dáileadh anois gach comhad is gá agus ní gá duit a thuilleadh a chur de láimh ar an v1 ollmhór AWS comhad próca SDK.
         
    * CHANGED: Chuir mé athrú ar úsáid a bhaint as Maven chun spleáchais a bhrath / a bhailiú (na comhaid .jar i /lib) . An t-athrú ar v2 an AWS SDK gá é seo. Beidh sé ag teastáil le haghaidh cód allmhairithe eile sa todhchaí. A bhuíochas ollmhór do Kyle Wilcox a chuir an pom.xml chruthaigh sé agus a úsáideann, a réiteach fadhbanna éagsúla dom.
         
    * CHANGED: An paraiméadar classpath (-cúp) a úsáidtear i GenerateDatasetXml, DasDds agus cláir bheaga eile a thagann leERDDAP™, agus sa chomhairle do ríomhchláraitheoirí anois i bhfad níos simplí agus níor chóir athrú riamh arís ó tagraíonn sé don eolaire, ní na comhaid ar leith:
\\-cp ranganna;C:\\chláir\\\\\\\&#125;\\lib\\
         (nó ':' in ionad ';' do Linux agus Macs) .
         (Ba chóir dom a bheith déanta na blianta ó shin nuair a bhí sé ina rogha.)   
         
    * NUA: Géiniteacha Tá Xml rogha fóntais nua: findDuplicateTime a chuardach trí bhailiúchán de gridded.nc  (agus a bhaineann) comhaid chun comhaid a aimsiú le luachanna ama dúblach. Féach ar[Déan Teagmháil Linn Am agus am](/docs/server-admin/datasets#findduplicatetime)  
         
    * NUA:datasets.xmlIs féidir a chur san áireamh anois&lt;palettes × chlib a sháraíonn na&lt;palettes × luach chlib ó teachtaireachtaí.xml (nó reverts leis an luach message.xml má tá sé folamh) . Ligeann sé seo duit an liosta pailéad atá ar fáil a athrú agusERDDAP™ag rith. Chomh maith leis sin, má tá tú subdirectory cptfiles saERDDAP™file directory,ERDDAP™cóip go léir na comhaid \\ *.cpt san eolaire isteach\\[taiseachas aeir: fliuch\\]/ webapps / erddap / WEB-INF / comhaid eolaire gach uairERDDAP™Tosaíonn suas. Le chéile, na hathruithe a lig tú a chur palettes agus tá na hathruithe fós nuair a shuiteáil tú leagan nua deERDDAP. Féach an[pailéad doiciméad](/docs/server-admin/datasets#palettes)  
A bhuíochas le Jennifer Sevadjian, Melanie Abecassis, agus b'fhéidir daoine eile CoastWatch.
         
    * ATHRAITHE: [&lt;mallDownTroubleMillis ú (Teicneolaíocht Faisnéise agus Cumarsáide) a úsáidtear anois le haghaidh gach iarratas theip, ní hamháin ar roinnt cineálacha.
         
    * CHANGED: Briseann an snáithe RithLoadDatasets anois an snáithe LoadDatasets ag 3/4 LoadDatasets MaxMinutes mar sin tá níos mó ama do LoadDatasets a thabhairt faoi deara an briseadh agus scoir gracefully. Chomh maith leis sin tá teachtaireachtaí níos mó agus níos fearr diagnóiseacha le haghaidh seo.
         
    * CHANGED ón seanleagan de Lucene go v8.7.0.
         
    * CHANGE: Ríomhphost a sheoladh agERDDAP™anois le feiceáil le cló leithead seasta.
         
    * ATHRÚ:EDDGridFromFiles Faigheann anois luachanna ais chomh maith le tréithe ó FIRST|LAST comhad, mar atá sonraithe i&lt;meiteashonraíÓ chéile. Go raibh maith agat (taiseachas aeir: fliuch) go dtí an Chéin Cháis, agus al.
         
    * Tacaíocht ADDED do na haonaid neamhbhailí "céim\\_North" agus "céim \\_East" a úsáidtear go hearráideach ag na comhaid le déanaí (ó 2020 go 2020) i AVHRR Pathfinder Leagan 5.3 L3-Collated (L3C) Seirbhís do Chustaiméirí (tréimhse saoil: ilbhliantúilsstd1day agus nceiPH53sstn-1 lá) .ERDDAP™Is féidir iad a chaighdeánú anois le haonaid bhailí. Go raibh maith agat (taiseachas aeir: fliuch) go dtí an Chéin Cháis, agus al.
         

## Leagan 2.11{#version-211} 
 (a scaoileadh 2020-12-04) 

*    **Gnéithe agus Athruithe Nua (d'úsáideoirí) :** 
    * BUG FIX: Chaith OrderByMean NullPointerException má bhí athróg ach ceann amháin de \\_FillValue nó ar iarraidh \\_ Luach sainithe. Anois láimhseálann sé an cás i gceart. Buíochas le Marco Alba.
         
    * BUG FIX: Bhí fadhbanna leis na comhaid téacs ODV cruthaithe agERDDAP™i v2.10. Tá na fadhbanna sin socraithe. Go raibh maith agat a Shaun Bell.
         
    * BUG FIX: Díreach iERDDAP™v2.10: Má bhí sonraithe na lat lon bounds sa URL, Ní raibh an bosca teoranta tharraingt ar an léarscáil domhan. Anois tá sé arís. Buíochas le John Maurer.
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * BUG FIX: Díreach iERDDAP™v2.10: Na comhaid script do ArchiveADataset, GenerateDatasets Ní raibh Xml agus DasDds ag obair toisc nach raibh na hathruithe ar an cosán ranga a cuireadh leisERDDAP™v2.10. Anois a dhéanann siad. Buíochas le Marco Alba.
         
    * NUA: Idatasets.xml, d'fhéadfá a bheith anois ar an chlib:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

Faoi láthair, más fíor (nó má tá an chlib folamh, nó más rud é nach bhfuil an chlib sa chomhad) , nuair a bhíonn iarratas úsáideora mar thoradh ar NullPointerException,ERDDAP™Beidh ríomhphost a sheoladh chuig an rian chairn aerd.data at noaa.gov  (anERDDAP™internet marketing) . Ba cheart é sin a bheith sábháilte agus slán ós rud é nach bhfuil aon fhaisnéis rúnda (e.g., an t-iarratasUrl) san áireamh sa ríomhphost. Ba chóir é seo a dhéanamh is féidir a ghabháil ar bith doiléir, bugs go hiomlán gan choinne mar thoradh ar NullPointerExceptions. Seachas sin, feiceann an t-úsáideoir na heisceachtaí, ach anERDDAP™Ní fhorbróirí, mar sin níl a fhios againn go bhfuil fadhb gur gá a shocrú.
        
Is féidir go mbeidh an chlib mar thoradh ar eile, faisnéis dhiagnóiseach den chineál céanna á ríomhphost chuigerd.data at noaa.govsa todhchaí. Beidh ábhar an ríomhphoist a bheith i gcónaí íosta agus a bhaineann le bugs, agus ní, mar shampla, faisnéis úsáide. Buíochas le Marco Alba.
         
        
    * CHANGED: Anois, cineálacha comhaid comhbhrúite coitianta (.bz2,.gz,.gzip,.tar,.tgz,.z,.zip) Tá cosc freisin le haghaidh iarrataí raon byte. Tá sé seo sonraithe trí&lt;síntí NoRangeRequests rÃ omhaire.xml.
         
    * TIONSCADAL TIONSCADAIL: Mar atá leERDDAP™2.10,.ncml comhaid a iarracht a athrú tréith, ná athrú ar an tréith. Is é seo an fabht ar eolas i netcdf-java a thuairiscigh mé agus deir siad a shocrú sa chéad scaoileadh eile de netcdf-java.
         

## Leagan 2.10{#version-210} 
 (a scaoileadh 2020-11-05) 

*    **Gnéithe agus Athruithe Nua (d'úsáideoirí) :** 
    * NUA: An nua[Idirshuíomh](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html)tiontaire interpolates go héifeachtach luachanna ó tacar sonraí gridded ar luachanna. Mar sin, tá sé úsáideach go háirithe do thaighdeoirí ag obair le sonraí rian ainmhithe. Tógann an tiontaire i dtábla le domhanleithead, domhanfhad, agus colúin ama (agus b'fhéidir colúin eile) agus tuairisceáin tábla le colúin bhreise le luachanna idirshuíomh. Dá bhrí sin, tá sé seo cosúil leis an tóir[Xtractmatic](https://coastwatch.pfeg.noaa.gov/xtracto)script cruthaithe ar dtús ag Dave Foley, ach cuireann an buntáiste a phróiseáil suas le 100 pointí in aghaidh an iarratais. A bhuíochas le Dave Foley agus Jordan Watson (NMFS) .
         
    * IMPROVED: Tá Cuardaigh Casta anois dian le haghaidh iarrataí neamh-.html. Cuirfidh sé eisceachtaí le haghaidh iarrataí a bhfuil earráidí buana acu anois (e.g., iarrataí nuair minLat × maxLat) nó earráidí sealadacha (e.g., iarrataí arstandard\\_namenach bhfuil ann) . I gcás iarrataí .html, Advanced Cuardaigh gan athrú: mar atá le Google searches, a dhéanann sé a chuid is fearr agus go ciúin fixes nó neamhaird earráidí. Buíochas le Rich Signell.
         
    * Molta: Tá an léarscáil ar an leathanach Cuardaigh Casta anois níos mó (tá tú fós a squint, ach níos lú) agus i bhfad níos cruinne (ach nach bhfuil fós foirfe) . Buíochas le John Maurer.
         
    * IMPROVED: An "Darra masc talún" leagan síos ar Make A Graph leathanaigh ghréasáin agus an &amp;.land =... leagan i URLanna a iarraidh ar léarscáil tacaíochtaí anois dhá rogha níos mó:
Tarraingíonn "as líne" ach an imlíne talún, teorainneacha polaitiúla, lochanna agus aibhneacha.
Ní dhéanann "uaire" rud ar bith a tharraingt.
Féach an[&amp; talamh =... doiciméadú](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands).
Buíochas le John Maurer.
         
    * MAOIN: Graifí agus léarscáileanna cruthaithe agERDDAP™Is féidir úsáid a bhaint anois trí chineál marcóir nua: Cearnóg Líonta gan teorainn, Ciorcail Líonta gan teorainn, gan teorainn Líonadh suas Triantán. Chuir Marco Alba de Fisic ETT / EMODnet leis an gcód seo. Buíochas le Marco Alba.
         
    * NUA:"files"córas tacaíochtaí anois plain FreagraÃ cineál comhaid (.csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsv, nó.xhtml.) , m.sh.,[ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv).
Buíochas le Kyle Wilcox.
         
    * IMPROVED: Na URLanna a ghintear nuair a úsáideann úsáideoir Foirm Rochtana Sonraí (..) nó Déan-A-Graph (.graf) leathanach gréasáin anois i gceart faoin gcéad-ionchódú na carachtair\\[agus\\]. Seo a dhéanann an URLanna beagán níos deacra do dhaoine a léamh, ach tá sé níos fearr ó thaobh gréasáin-slándála standpoint. Riarthóirí anois an rogha a shocrú relaxedQueryChars = ''\\[\\]|' sa comhad freastalaí Tomcat.xml (níos lú) nó nach bhfuil (níos sábháilte) .
Buíochas le Antoine Queric, Dominic Fuller-Rowell, agus daoine eile.
         
    * NUA: Má tá iarratas ar thacair sonraí in-EDDTable san áireamh &amp; cuir Athróga Cá háit a ndéanfaidh mé (ómós a thabhairt Ainm, tréith Luacháil) ,ERDDAP™beidh a chur gach athróg a bhfuil _ ómós Ainm = ómós Luach_ leis an liosta na n-athróg a iarrtar.
Féach an[Déan teagmháil linn Athróga Cá bhfuil doiciméid](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere). Buíochas le Aurelie Briand, agus al.
         
    * Amharc ar gach eolasERDDAP™anois Diúltaíonn iarratais raon byte ar / comhaid /.ncnó.hdfcomhaid. Ná déan iarracht ceangal le iargúlta.ncnó.hdfcomhaid amhail is dá mba comhaid áitiúla iad. Tá sé uafásach mí-éifeachtach agus is minic a bhíonn fadhbanna eile ann. Ina áit sin:
        * Úsáid Úsáid Úsáidte(OPeN)DAPbogearraí cliant a nascadh leERDDAP'sDAPseirbhísí don tacar sonraí seo (a bhfuil / griddap / nó /tabledap/ sa URL) . Sin an méidDAPIs le haghaidh.
        * Bain úsáid as Foirm Rochtana Sonraí na tacar sonraí chun fo-thacar sonraí a iarraidh.
        * Más gá duit an comhad ar fad nó rochtain arís agus arís eile thar thréimhse fada ama, úsáidcurl,wget, nó do bhrabhsálaí a íoslódáil an comhad ar fad, ansin rochtain a fháil ar na sonraí ó do chóip áitiúil den chomhad.
             
    * Molta: an .odv Tá rogha aschur Txt athscríofa chun tacú leis an leagan nuaODV .txtcomhaid agus chun tacú leis an ionadaíocht chuí trajectory, timeseries, agus sonraí próifíl.
         
    * IMPROVED: Anois, téarmaí cuardaigh i Sleachta dúbailte a léiriú mar teaghrán json, ionas gur féidir leo a bheith \\ \\ \\ carachtair ionchódaithe. I measc rudaí eile, ligeann sé seo duit cuardach a dhéanamh ar chluiche cruinn do tréith, m.sh., "institution =NOAA\\n"Ní mheaitseáil tacar sonraí le institiúid =NOAA NMFS. Buíochas le Dan Nowacki.
         
    * IMPROVED: In áiteanna breise, uimhreacha pointe snámh (go háirithe floats thiontú go doubles) anois le feiceáil mar leagan beagán níos mó chothromú den líon in áiteanna breise, m.sh. snámhphointe a thaispeántar roimhe seo mar dúbailte cosúil le 32.27998779296875, d'fhéadfadh le feiceáil anois mar 32.28. Buíochas le Kyle Wilcox.
         
    * BUG FIX: léamh comhaid fuaime slánuimhir gan síniú beagán mícheart. Anois tá siad ag léamh i gceart.
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * WARNING: An chéad uair a ritheann túERDDAP™v2.10, beidh roinnt tacar sonraí bunaithe ar chomhaid sonraí áitiúla luchtú **an-** go mall toiscERDDAP™riachtanais a athchruthú a bhunachar sonraí faisnéise comhad. Tar éis an athlódáil tosaigh mall, beidh siad a luchtú go tapa, mar a bhí roimhe. Tabhair othar.
         
    * TRÍ DO MÓR:
        * Nuair a ritheann tú ar dtús v2.10, ní féidir roinnt tacar sonraí a luchtú mar gheall arERDDAP™anois níos déine faoi roinnt meiteashonraí. Mar roimh,ERDDAP™Beidh r-phost tú Tuarascáil Laethúil nuair a ualaí sé ar dtús suas. Beidh sin san áireamh na teachtaireachtaí earráide do gach ceann de na tacair sonraí nach raibh ualach. Léigh na teachtaireachtaí earráid a dhéanamh amach na fadhbanna. I bhformhór na gcásanna, ní mór duit ach athrú beag a dhéanamh ar mheiteashonraí an tacar sonraí chun an fhadhb a réiteach.
             
        * Idatasets.xml, cuardaigh&lt;sourceName&amp; rsquo; s (nóta an nóta'='comhartha, aithníonn[seasta-luachsourceName](/docs/server-admin/datasets#fixed-value-sourcenames)) . Le haghaidh an chuid is móERDDAP™setups, tá siad seo annamh. Má tá aon cheann de na luachanna tar éis'='Tá teaghráin (bláthanna cumhra: cumhráin) , MUST tú faoi iamh anois ar an teaghrán i Sleachta dúbailte. Mar shampla,
Roimh:&lt;sourceNameFéach ar an bpróifíl&lt;/ BailesourceNameú
Tar éis:&lt;sourceName"KZ401"&lt;/ BailesourceNameú
             
        * NUA: Tá suíomh roghnach nua i thus.xml,&lt;defaultAccessibleViaFiles ^, a leagann an réamhshocraithe&lt;ViaFiles inrochtana × do gach ceann de na tacair sonraí. Is é an mhainneachtain don chlib nua bréagach, a mimics an roimheERDDAP™iompar. Is féidir an suíomh leibhéal níos ísle a overruled ag tacar sonraí ar leith&lt;Víteanna inrochtana agus leagan.
            
Déan teagmháil linn (toisc go bhfuil úsáideoirí atá ag iarraidh seo) :
Más mian leat gach EDD a dhéanamh... Leagann sonraí FromFiles inrochtana tríd an gcóras comhaid, ansin
            
            1. Cuir an chlib le do chomhad thus.xml:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Go raibh maith agat) Bain go léir
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
idatasets.xmlós rud é go bhfuil an réamhshocraithe fíor anois.
                 
        * Cuir comharthaí \\_FillValue:
            ERDDAP™a úsáidtear go bhfuil réamhshocraithe \\_FillValue do gach athróg slánuimhir: an luach uasta de chineál na sonraí (e.g., 127 d'athróg inte) . Anois ní chuireann sé. D'fhonn a sheachaint a bhfuil na luachanna a thaispeántar mar luachanna sonraí (gan luachanna ar iarraidh) , ní mór duit na tréithe seo a lua go sainráite trí \\_FillValue. Ó anois ar, gach uair a thosaíonn tú suasERDDAP™, cuirfidh sé ríomhphost chuig an riarthóir le tábla .csv le liosta de na hathróga foinse slánuimhir nach bhfuil \\_FillValue nómissing\\_valuetréithe, agus na tréithe nua molta \\_FillValue. Féach ar[Cuir \\ le Fill Ranníocaí Luach](/docs/server-admin/datasets#add-_fillvalue-attributes)le haghaidh tuilleadh eolais agus treoracha.
             
        * Má tá tú compileERDDAP™, ní mór duit a mhodhnú ar an paraiméadar classpath ar na línte ordú javac a chur tagairt do na próca nua ar: lib / commons-jexl.jar;lib /aws-java-sdk.jar;lib / Jackson-annotations.jar;lib /jackson-lárnach.jar;lib/jackson-databind.jar. .
             
    * CHANGED: Tomcat 9 anois ar an leagan molta de Tomcat doERDDAP. Is é an leagan is déanaí de Tomcat 8.5 + freisin fíneáil do anois. Glan muid suasERDDAP's[Treoracha suiteála Tomcat](/docs/server-admin/deploy-install#tomcat).
        
An leagan is déanaí deJava8 8 8 8 (taiseachas aeir: fliuchJava9, 10, 11,...) ó[AdoptOpenJDK](https://adoptopenjdk.net/)fós an leagan molta deJavale haghaidhERDDAP.Java8 Tá Tacaíocht Fadtéarmach ó AdoptOpenJDK mar sin tá sé fós sábháilte a úsáid, ach cuimhnigh a fháil ar an leagan is déanaí de sé go tréimhsiúil ar chúiseanna slándála.
        
    * NUA: Script SourceNames / Variables Díorthaithe i tacair sonraí Tabular
EDDTableFromFiles, EDDTableFromDatabase, agus EDDTableFromFileNames datasets féidir san áireamh anois abairtí agus scripteanna snasourceName. Ligeann sé seo duit athróg nua a dhéanamh bunaithe ar athróg atá ann cheana féin sna comhaid foinse. Déantar an ríomh le haghaidh athróg nua áirithe laistigh de shraith amháin de na torthaí, arís agus arís eile do gach sraitheanna. Mar shampla, a dhéanamh athróg fada le luachanna sa raon -180 - 180 ° ó athróg le luachanna sa raon 0 - 360 °:
        &lt;sourceNameAn bhfuil a fhios agat? (cliceáil grianghraf a mhéadú ("lon") ) &lt;/ BailesourceNameú
Le haghaidh sonraí, féach[Amharc ar gach eolas](/docs/server-admin/datasets#script-sourcenamesderived-variables)  
Go raibh maith agat as Bob Simons (a phleanáil seo roimhERDDAP™v1.0 agus ar deireadh fuair ar bhealach chun é a chur i bhfeidhm) , Kevin O'Brien, Roland Schweitzer, John Maurer, agus an leabharlann Apache JEXL chun an chuid i ndáiríre crua (agus é a dhéanamh go maith) .
         
    * NUA: Cineálacha sonraí slánuimhir gan síniú (úsáid tírdhreach: plandáil grúpa, eiseamal, fál) Tá tacaíocht anois. Tabhair faoi deara go leor cineálacha comhaid (e.g., .das, .dds,.nc3 3 3) ná tacú le gach ceann de na cineálacha sonraí nua. Féach an[Sonraí Teagmhála Doiciméadú Cineál](/docs/server-admin/datasets#data-types)le haghaidh sonraí faoi conasERDDAP™Déileálann leis na difríochtaí. Go suntasach, ós rud é(OPeN)DAP, go háirithe an freagra .dds, Ní tacaíocht sínithe bytes, longs, nó ulongs, b'fhéidir gur mhaith leat a úsáidERDDAP's léiriú tabular de .das agus .das mar atá le feiceáil sahttp.../cuir isteach/ **info** Tuilleadh eolaisdatasetID_ html leathanach gréasáin (mar shampla,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) ) ar féidir leat a fháil freisin i gcineálacha comhaid eile nó.nccsvFreagra meiteashonraí (mar shampla,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) ) , tacaíonn an dá cheann le gach cineál sonraí i ngach cás.
        
WARNING: I gcás tacar sonraí a bhfuil tionchar ag an athrú seo orthu, is féidir go bhfeiceann tú fadhbanna leis an tacar sonraí mar gheall ar na sonraí sinERDDAP™D'fhéadfadh léamha ón bhfoinse a bheith difriúil (e.g., Is féidir athróga léamh roimhe seo mar slánuimhreacha sínithe a léamh anois mar slánuimhreacha unsigned) . I measc na fadhbanna a eascraíonn: comhaid nua nach bhfuil a chur leis an tacar sonraí, agus / nó earráidí nuair iarracht tú chun rochtain a fháil ar na sonraí. Má tá fadhbanna ag tacar sonraí, is é an chéad rud chun iarracht a dhéanamh[a leagtar crua Amharc ar gach eolas](/docs/server-admin/additional-information#hard-flag)don tacar sonraí. Más rud é nach bhfuil an fhadhb a réiteach, ansin caithfidh tú breathnú ar logáil. txt a fheiceáil ar na teachtaireachtaí earráid, delve isteach sadatasets.xmldon tacar sonraí, agus / nó b'fhéidir rerun ghiniúintDatasets.xml don tacar sonraí.
Go raibh maith agat as glancdf-java 5.x (a chuir iallach ar an gceist) agus an teacht CF 1.9.
        
    * Molta: Tá anois[doiciméadú níos fearr / sibhialta](/docs/server-admin/datasets#s3-buckets)conas tacar sonraí a chruthú ó chomhaid i buicéid AWS S3. Go raibh maith agat le Micah Wengren.
         
    * CHANGED: Tá roinnt athruithe a bhaineann leis an"files"córas.
        * Athscríobhadh an cód a láimhseáil seo le bheith inúsáidte ag ranganna níos mó.
             
        * NUA: Is féidir le hiarratais úsáideora le haghaidh liostaí eolaire iarraidh anois go bhfuil an freagra a bheith ar cheann de na cineálacha tábla simplí caighdeánach ag gabháil leis an síneadh comhad atá ag teastáil: .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsv, nó.xhtml). Mar shampla,
            [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)  
A bhuíochas le Kyle Wilcox agus Shane St Savage.
             
        * Molta: Anois, Gin An tSraith Shinsearach Ní bheidh Xml san áireamh&lt;inrochtanaViaFiles uaire chlib san aschur. Is é an toimhde go mbeidh an tacar sonraí ag brath ar luach an nua&lt;cliceáil grianghraf a mhéadú tag i thus.xml. Féach ar[ar fáil Seirbhís do Chustaiméirí](/docs/server-admin/datasets#accessibleviafiles).
             
        * IMPROVED: Cineálacha tacar sonraí breise tacaíocht anois inrochtana Seirbhís do ChustaiméiríEDDGridSideBySide,EDDGridComhsheasmhacht,EDDGridÓ Erddap, EDDTableFromErddap,EDDGridEDDTable, EDDTableFromEDDGrid, agusEDDGridÓ Etopo. Dóibh siúd, ní bheidh rochtain ag na comhaid ó thacar sonraí iargúlta/leanbh ar leith ach amháin má tá an tuismitheoir agus an tacar sonraí iargúlta/leanbh inrochtana ag an tuismitheoir araon. ViaFiles leagtha chun fíor (b'fhéidir trí&lt;cliceáil grianghraf a mhéadú A bhuíochas le Damian Smyth agus Rob Fuller.
             
        * DO / MOLADH: Molaimid gach tacar sonraí ábhartha a dhéanamh inrochtana tríd an gcóras comhaid trí shuíomh&lt;defaultAccessibleViaFiles ú le fíor i thus.xml toisc go bhfuil grúpa na n-úsáideoirí a bhfuil sé seo an bealach is fearr a fháil ar na sonraí. I measc cúiseanna eile, na"files"córas a dhéanann sé éasca d'úsáideoirí a fheiceáil a bhfuil comhaid ar fáil agus nuair a d'athraigh siad go deireanach, rud a chiallaíonn sé éasca d'úsáideoir a choimeád ar bun a gcuid cóip féin den tacar sonraí ar fad. Más rud é nach bhfuil tú ag iarraidh go ginearálta a dhéanamh tacair sonraí inrochtana tríd an gcóras comhaid, leagtha&lt;defaultAccessibleViaFiles ú le bréagach. I gceachtar cás, ach úsáid&lt;ViaFiles a bhfuil rochtain orthu ú le haghaidh na cúpla tacar sonraí atá eisceachtaí ón mbeartas ginearálta arna leagan síos ag&lt;cliceáil grianghraf a mhéadú (mar shampla, nuair a úsáideann an tacar sonraí.ncml comhaid, nach bhfuil i ndáiríre úsáideach d'úsáideoirí) .
             
    * IMPROVED: Anois, má tá tacar sonraí foinse CF greille \\_mapping eolais, ghiniúint An tSraith Shinsearach Cuirfidh Xml le haghaidh tacair sonraí greilleáilte an fhaisnéis chuig an domhan domhanda&lt;addAtts uaire, agus beidh an t-eolas a chur leis an domhanda&lt;Tá foinseAtts uaire sonraí a léamh ón gcomhad. Beidh an t-eolas le feiceáil i na tacar sonraí tréithe domhanda mar shraith de tréithe leis an eangach réimír \\_mapping\\_ .
         
    * IMPROVED: Tacaíocht do ghrúpaí agus iad ag léamh.nc4 4 4 4 (agus go pointe éigin i.hdf5 5 5 5 5 5) comhaid. Go ginearálta,ERDDAP™Beidh tacar sonraí a thógáil ó na hathróga i gceann de na comhaid grúpaí. Chomh maith leis sin, GenerateDatasets Xml doEDDGridSeirbhís do ChustaiméiríEDDGridSeirbhís do Chustaiméirí Unpacked Iarrann anois le haghaidh "grúpa" (e.g., "" le haghaidh aon/gach grúpa, "roinntGroup", "roinntGroup /someSubGroup", nó "\\[duille dath glas\\]" don ghrúpa fréimhe amháin) . Buíochas le Charles Carleton agus Jessica Hausman.
         
    * IMPROVED: Géiniteacha Xml doEDDGridSeirbhís do ChustaiméiríEDDGridSeirbhís do Chustaiméirí Unpacked tacaíocht a thabhairt anois roghnach "DimensionsCSV" paraiméadar a ligeann duit a shonrú ar na hainmneacha foinse na toisí gur mian leat an tacar sonraí a úsáid. Bain úsáid as "" a fháil ar na hathróga a úsáideann na gnéithe is mó, mar a bhí roimhe. Chomh maith leis sin, tá bug beag gaolmhar a tharla leis an gcineál seo comhad socraithe anois. Buíochas le Sujal Manandhar.
         
    * BUG FIX: Giniúint Sonraí Xml Liostaíonn anois i gceart "EDDTableFromJsonlCSVFiles" (Níl an Tweet seo ar fáil) mar cheann de na roghanna EDDType. Go raibh maith agat Andy Ziegler.
         
    * Molta:EDDGridSeirbhís do Chustaiméirí Unpacked chaighdeánaíonn anois "aonaid" tréithe caighdeán / "canonical" aonaid (an modh céanna leis an tiontaire Aonaid) . Mar shampla,"meter per second","meters/second","m.s^-1", agus"m s-1"a bheith go léir"m s-1". Go raibh maith agat Andy Ziegler.
        
WARNING: Is féidir go mbeidh sé seo ina chúis le fadhbanna do roinnt tacar sonraí atá ann cheana (e.g., a chur faoi deara comhaid nua a lipéadú "bad") . Más amhlaidh,[a leagtar crua Amharc ar gach eolas](/docs/server-admin/additional-information#hard-flag)don tacar sonraí ionas go mbeidh gach ceann de na comhaid foinse a reread leis an gcóras nua.
        
    * Molta: Anois, athróg&lt;sourceName× Is féidir a shonrú luach seasta de = NaN agus is féidir leis an athróg a bheithactual\\_rangetréith a shonraíonn raon críochta. Tá sé seo uaireanta úsáideach ionas go tacar sonraí (go háirithe tacar sonraí EDDTableFromFileNames) Is féidir a bheith athróg dummy (s s)   (e.g., domhanleithead, domhanfhad, am) le luachanna seasta de NaN, ach le bailíactual\\_range  (mar atá leagtha síos ag an tréith) . Ansin, in Ard Cuardaigh féidir le úsáideoir cuardach a dhéanamh ar thacair sonraí a bhfuil sonraí i domhanleithead ar leith, domhanfhad, raon ama agus beidh an tacar sonraí seo in ann a rá go bhfuil sonraí ábhartha aige (cé go léir na sraitheanna iarbhír na sonraí a thaispeáint NaN) . Féach an[Doiciméid luacha seasta](/docs/server-admin/datasets#fixed-value-sourcenames).
Go raibh maith agat le Mathew Biddle.
         
    * NUA: Anois, andatasets.xmlIs féidir le smután le haghaidh EDDTableFromAsciiFiles nó EDDTableFromColumnarAsciiFiles tacar sonraí san áireamh chlib a insíonnERDDAP™neamhaird a dhéanamh ar gach ceann de na línte ag barr an chomhaid suas go dtí agus lena n-áirítear an líne a oireann an abairt rialta sonraithe. Mar shampla,
        &lt;cliceáil grianghraf a mhéadú\\*\\ t\\*\\ t\\*END HEADER.\\*&lt;/ ScipHeaderToRegex?
beidh neamhaird ar gach líne suas go dtí agus lena n-áirítear líne a thosaíonn le "\\*\\*\\* END HEADER". Féach ar an [&lt;skipHeaderToRegex × doiciméid (Teicneolaíocht Faisnéise agus Cumarsáide) .
Go raibh maith agat Eli Hunter
         
    * NUA: Anois, andatasets.xmlIs féidir le smután le haghaidh EDDTableFromAsciiFiles nó EDDTableFromColumnarAsciiFilesdataset áireamh chlib a insíonnERDDAP™neamhaird a dhéanamh ar gach ceann de na línte sa chomhad a mheaitseáil leis an abairt rialta sonraithe. Mar shampla,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

Beidh skip gach líne a thosaíonn le "#". Féach ar an [&lt;skipLinesRegex × doiciméadacht] (Teicneolaíocht Faisnéise agus Cumarsáide) .
Buíochas le Eli Hunter.
         
    * NUA: Andatasets.xmlsmután d'aon tacar sonraí EDDTable san áireamh anois &amp; breise Athróga Cá háit a ndéanfaidh mé (An Roinn Dlí agus Cirt) . Má dhéanann sé,ERDDAP™Beidh a chur le ghiuirléid do gach ceann de na tréithe sonraithe Ainmneacha ar Fhoirm Rochtana Sonraí na tacar sonraí (.html leathanach gréasáin) a dhéanamh éasca d'úsáideoirí a chur &amp; cuir Athróga Cá háit a ndéanfaidh mé (ómós a thabhairt Ainm, tréith Luacháil) chuig an iarraidh.
Féach an[Déan teagmháil linn Athróga Cá bhfuil doiciméid](/docs/server-admin/datasets#addvariableswhere).
Buíochas le Aurelie Briand, agus al.
         
    * Baile Átha Cliath Uirlis Tríú Páirtí:ERDDAPtaiseachas aeir: fliuch
        ERDDAPIs clár é -lint ó Rob Fuller agus Adam Leadbetter ó Institiúid Mara na hÉireann gur féidir leat úsáid a bhaint as chun feabhas a chur ar mheiteashonraí do chuidERDDAP™datasets.ERDDAP-lint "a bhfuil rialacha agus iarratas gréasáin simplí statach do reáchtáil roinnt tástálacha fíorú i gcoinne doERDDAP™freastalaí. Gach na tástálacha ar siúl sa bhrabhsálaí gréasáin. " Cosúil leis an[Unix / Linux uirlis lint](https://en.wikipedia.org/wiki/Lint_(software)), is féidir leat na rialacha atá ann cheana a chur in eagar nó rialacha nua a chur leis. Féach ar[ERDDAPtaiseachas aeir: fliuch](https://github.com/IrishMarineInstitute/erddap-lint)le haghaidh tuilleadh eolais.
        
Tá an uirlis seo úsáideach go háirithe le haghaidh tacar sonraí a chruthaigh tú roinnt ama ó shin agus anois ag iarraidh a thabhairt suas chun dáta le do roghanna meiteashonraí reatha. Mar shampla, leaganacha luath de GenerateDatasets Níor chuir Xml aon iarracht i gcruthú domhandacreator\\_name,creator\\_email, cruthaitheoir \\_type, nócreator\\_urlmeiteashonraí. D'fhéadfá a úsáidERDDAP-lint a aithint na tacair sonraí a easpa na tréithe meiteashonraí.
        
Go raibh maith agat Rob agus Adam as a chruthú an uirlis agus é a chur ar fáil donERDDAP™pobail.
        
    * NUA: Anois tá sé ceart go leor má roinnt de na comhaid iEDDGridNí gá go mbeadh gach ceann de na athróg na tacar sonraí ar. Beidh na comhaid a chur san áireamh amhail is dá mbeadh siad na hathróga (le gach luachanna ar iarraidh) .
A bhuíochas le Dale Robinson agus Doug Latornell.
         
    * NUA: Tá staitisticí úsáide nua sa chomhad logála agus sa Tuarascáil Laethúil chun cabhrú le riarthóirí na n-úsáideoirí atá ag cúis fadhbanna cuimhne a aithint. Ainmnítear na staitisticí "OutOfMemory (Méid an Arbhair) ", "OutOfMemory (Too Big) ", agus "OutOfMemory (Seirbhís do Chustaiméirí) ". Léiríonn siad seoltaí IP na n-úsáideoirí a rinne iarrataí sna catagóirí agus líon na n-iarratas a rinne siad. Mura raibh aon iarrataí trioblóideacha ann, ní bheidh na staitisticí seo le feiceáil. "OutOfMemory (Méid an Arbhair) " agus "OutOfMemory (Seirbhís do Chustaiméirí) " nach bhfuil iarrataí de ghnáth fadhb toisc go raibh na hiarratais chomh mór sin goERDDAP™ghabh iad go tapa agus ar ais teachtaireacht earráide. An "OutOfMemory (Too Big) " tá iarrataí níos contúirtí mar gheall arERDDAP™rinne roinnt iarracht sular thuig sé nach raibh go leor cuimhne ar fáil faoi láthair chun déileáil leis an iarratas (cé go bhféadfadh an fhadhb a bheith iarrataí eile ceart roimh na hiarratais) .
        
Tá staitisticí nua darb ainm "Iarratas Mór, seoladh IP" a léiríonn seoltaí IP na n-úsáideoirí a rinne iarrataí móra (faoi láthair, gridded.nccomhaid × 1GB) .
        
Chomh maith leis sin, áirítear an tábla sraith ama ar an leathanach status.html anois colún "memFail" a léiríonn líon na n-iarratas a theip ar le "OutOfMemory (Too Big) " earráidí ó na tacair sonraí mór Luchtaigh deireanach. Tá aon uimhir seachas 0 anseo ar a laghad roinnt cúis imní.
Go raibh maith agat le Bob Simons.
        
    * NUA: An leagan nua deHyraxtaispeántais liostaí eolaire éagsúla ná roimhe.ERDDAP™Is féidir a léamh anois ar an sean agus liostaí eolaire nua.
         
    * NUA: Athluchtuithe tacar sonraí agus freagraí úsáideora a ghlacadh × 10 soicind a chríochnú (go rathúil nó nár éirigh leo) marcáilte le " (× 10s&#33;) ". Dá bhrí sin, is féidir leat cuardach a dhéanamh ar an comhad log.txt don abairt seo chun teacht ar na tacair sonraí a bhí mall a athlódáil nó ar líon na n-iarratas na n-iarratas a bhí mall a chríochnú. Is féidir leat breathnú ansin níos airde sa chomhad log.txt a fheiceáil cad a bhí an fhadhb tacar sonraí nó cad a bhí an t-iarratas úsáideora agus a bhí sé ó. Tá na hualaí réamhshocraithe sonraí mall agus iarratais úsáideora ag cur isteach uaireanta arERDDAP. Mar sin, is féidir a fhios agam níos mó faoi na hiarratais cabhrú leat a aithint agus fadhbanna a réiteach.
    * IMPROVED: Nuair a bhailíochtú CF DSG tacar sonraí,ERDDAP™Cinntíonn anois go bhfuil athróga le tréithe cf\\_role sa cdm comhfhreagrach \\...\\_variables liosta agus nach bhfuil i cdm eile \\_...\\_variables liostaí. Mar shampla, má tá athróg "stáisiún \\_id" a bhfuil an cf\\_role =timeseries \\_id, ansin ní mór "stáisiún \\_id" a bheith sa liosta cf\\_timeseries\\_variables, ach ní mór a bheith sa liosta cf\\_profile\\_variables.
Go raibh maith agat le Micah Wengren.
         
    * IMPROVED: 'Simplify' anois níos tapúla, Úsáideann cuimhne níos lú, agus féadfaidh sé ar ais LongArray. Go raibh maith agatUnidata.
         
    * Molta: Tá tapaidhRestart anois i bhfad níos tapúla do EDDTableFrom (nc gaolmhara) Amharc ar gach eolas (EDDTableFromNcCFFiles agus EDDTableFromInvalidCRAFiles) mar gheall ar Ag súil (agus áit eile) anois ach léann an comhad sampla ar meiteashonraí in ionad a léamh gach ceann de na sonraí. Go raibh maith agat chun Jessica Austin.
         
    * IMPROVED: Tá tacaíocht anois le haghaidh teaghráin ama le cruinneas níos mó ná-an-Domhan má tá na digití breise ar fad 0, m.sh., "2020-05-22T01:02:03.456000000Z". Go raibh maith agat le Yibo Jiang.
         
    * IMPROVED: GenerateDatasetsXml EDD.suggestDestinationName a úsáidtear a bhaint '(' agus gach rud ina dhiaidh sin. Anois cuireann sé (.\\*) ach amháin más é sin an deireadh ansourceName. Anois cuireann sé freisin\\[.\\*\\]ach amháin más é sin an deireadh ansourceName. Go raibh maith agat le Julien Paul.
         
    * IMPROVED: Géiniteacha Xml anois a dhéanann an athrógdestinationNames uathúil trí \\_2, \\_3, ..., de réir mar is gá. Go raibh maith agat le Julien Paul.
         
    * IMPROVED: Nuair a Féilire2.parseDateTime parses dd, hh, nó HH, d'fhéadfadh an chéad 'digit' a bheith anois spás.
    * TIONSCADAL TIONSCADAIL: Ag tosú leERDDAP™2.10,.ncml comhaid a iarracht a athrú tréith, ná athrú ar an tréith. Is é seo an fabht ar eolas i netcdf-java a thuairiscigh mé agus deir siad a shocrú sa chéad scaoileadh eile de netcdf-java.
         
    * BROKEN LINKS FIX: Rinne mé córas cuí le haghaidh tástála le haghaidh naisc briste iERDDAP™leathanaigh ghréasáin, mar sin ba chóir go mbeadh naisc an-bheag anois (ar a laghad de gach dáta scaoilte - - is minic a thagann naisc nua briste chun cinn) .
         
    * BUG FIX: EDDTableFromHttpGet theip le cineálacha áirithe iarrataí. Anois ní chuireann sé. A bhuíochas le Emma ag BODC.
         
    * BUG FIX: Chun roinnt iarrataí a láimhseáil, rinne EDDTable comhad sealadach do gach athróg a iarradh, le hainm comhaid dar críoch in ainm an athróg. Má bhí ainm an athróg freisin le cineál comhbhrú (e.g., .Z) ,ERDDAPgo mbeadh iarracht (agus theipeann) a decompress an comhad sealadach. Anois, deireadh na hainmneacha comhad sealadach i ".temp". Go raibh maith agat le Mathew Biddle.
         
    * BUG FIX: GenerateDatasetsXml agus Féilire2.convertToJavaGach ceart ar cosaint. Formáid anois i bhfad níos lú seans a dhéanamh athrú mícheart nuair a iarraidh a shocrú formáid ama dáta b'fhéidir neamhbhailí. Go suntasach, ní dhéanfar aon fhormáid dateTime uathoibríoch-suggested a mhodhnú. Go raibh maith agat le Mathew Biddle.
         
    * BUG FIX: Má bhí earráid agus ag fáil ábhar ó URL iargúlta, agus má tá an t-ábhar errorStream comhbhrúite,ERDDAP™anois decompresses i gceart an teachtaireacht earráide. Go raibh maith agat le Bob Simons.
         
    * BUG FIX:&lt;Ní raibh síntiús á chur i bhfeidhm nuair a bhí an EDD... Bhí tacar sonraí leanaí ó Erddap. Anois tá sé. Go raibh maith agat le Chris Romsos.
         
    * BUG FIX: Giniúint Sonraí Xml cheapann a thuilleadh ainm athróg foinse ag tosú le "latin" D'fhéadfadh a bheith domhanleithead. Buíochas le Vincent Luzzo.
         
    * BUG FIX: Anois, ar OutOfMemoryError agus comhad sonraí á léamh agus a phróiseáil iarratas úsáideora nach bhfuil cúis a chur le comhad chuig an liosta BadFiles. Go raibh maith agat le Bob Simons.
         

## Leagan 2.02{#version-202} 
 (2019-08-21) 

*    **Gnéithe agus Athruithe Nua (d'úsáideoirí) :** 
    * NUA: Tá dhá bhealach ann anois chun tacar sonraí a chuardach ar ilERDDAPs. Oibríonn siad beagán difriúil agus tá comhéadain agus roghanna éagsúla acu.
        
        *   [Cuardaigh le haghaidhERDDAPs.](/SearchMultipleERDDAPs.html)ó Bob Simons /NOAA NMFS SWFSC ERD.
        *   [ http://erddap.com ](http://erddap.com)ó Rob Fuller/The Marine Institute of Ireland.
        
A bhuíochas le Tylar Murray don iarratas bunaidh.
         
    * FÓGRA: iarraidh ar an"files"córas a íoslódáil comhad atá i ndáiríre ag suíomh iargúlta (e.g., AWS S3) anois mar thoradh ar atreorú, mar sin beidh an t-úsáideoir a íoslódáil iarbhír na sonraí ón bhfoinse, in ionad úsáid a bhaint asERDDAP™mar idirghabhálaí. Go raibh maith agat Andy Ziegler agusNOAA.
         
    * NUA: Mar shampla de na gnéithe nua a bhaineann le AWS S3, agus é a dhéanamh níos éasca do dhuine ar bith comhaid a bhrabhsáil agus a íoslódáil ó buicéid AWS S3 poiblí, ní mór dúinn a cruthaíodh
        [~ 110 tacar sonraí sampla](https://registry.opendata.aws/)a chuireann ar chumas duine ar bith a bhrabhsáil ar an ábhar de beagnach gach ceann de na
        [AWS S3 buicéid Sonraí Oscailte](https://registry.opendata.aws/). Má chliceálann tú ar an"files"nasc le haghaidh aon cheann de na tacar sonraí samplacha, is féidir leat a bhrabhsáil an crann eolaire agus comhaid sa buicéad S3. Mar gheall ar an mbealach na tacair sonraí ag obair, tá na liostaí eolaire i gcónaí breá suas chun dáta mar gheall arERDDAP™faigheann siad ar-an-eitilt. Má chliceálann tú síos ar an crann eolaire chuig ainm comhad iarbhír agus cliceáil ar an ainm comhaid,ERDDAP™d’iarratas atreorú chuig AWS S3 ionas gur féidir leat an comhad a íoslódáil go díreach ó AWS.ERDDAP™Is féidir riarthóirí
        [treoracha a léamh maidir le conas é seo a dhéanamh le haghaidh buicéid S3 eile](/docs/server-admin/datasets#working-with-aws-s3-files). Go raibh maith agat Andy Ziegler agusNOAA.
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * TÚ NEED DO: aon cheann
         
    * Molta:ERDDAP's modh chun arrays de teaghráin a stóráil (cineál gas: in airde) Tá anois i bhfad níos éifeachtaí ó chuimhne. String Arrays a úsáidtear ar fudERDDAP™, go háirithe nuair a léamh comhaid sonraí tabular ASCII. Chomh maith leis sin, athruithe eile a dhéanamh léamh CSV / TSV / SSV ASCII, columnar ASCII, agus jsonlCSV comhaid sonraí tabular níos tapúla agus i bhfad níos éifeachtaí ó chuimhne. Is é an toradh ná: le haghaidh comhad tástála sonraí 764 MB ASCII (ach comhbhrúite go 52MB.gzcomhad comhad) le 3,503,266 sraitheanna agus 33 colúin, chuaigh an úsáid chuimhne uasta ó 10GB síos go dtí 0.6GB (ag buaic) . An t-am a léamh chuaigh sé ó ~ 7 nóiméad (ach athraíonn go mór le cé mhéad cuimhne fisiciúil sa ríomhaire) síos go dtí ~ 36 soicind (lena n-áirítear 10s do shimpliú () a úsáidtear ach amháin ag GenerateDatasets XLUMX) . Go leor áiteanna eile iERDDAP™beidh tairbhe as an éifeachtacht cuimhne méadaithe. A bhuíochas le Tylar Murray agus Mathew Biddle.
        
Rinne mé iniúchadh ar réiteach difriúil (a stóráil teaghráin i StringArray mar UTF-8-ionchódaithe ag sraitheanna) . Laghdaíonn sin úsáid cuimhne eile ~ 33%, ach ar an gcostas de ~ 33% slowdown. I gcomparáid leis an gcóras atá á úsáid anois, is cosúil go bhfuil trádáil olc as. Tá sé níos éasca a thabhairt ar ríomhaire cuimhne níos (a cheannach cuimhne níos mó do ~ $200) ná é a dhéanamh níos tapúla (a cheannach ríomhaire iomlán nua) .
        
Má tá sé áisiúil, tá sé fós i gcónaí smaoineamh maith a roinnt comhaid sonraí tabular ollmhór i roinnt comhaid níos lú bunaithe ar roinnt critéir ar nósstationIDagus / nó am.ERDDAP™beidh go minic ach amháin a oscailt ar cheann de na comhaid beag mar fhreagra ar iarratas úsáideora, agus dá bhrí sin a bheith in ann freagra i bhfad níos tapúla.
        
    * Molta: Tá anois[ERDDAP™Doiciméid S3 SWS](/docs/server-admin/datasets#working-with-aws-s3-files), a chuireann síos ar conas a fháilERDDAP™a bheith ag obair le comhaid sonraí i buicéid AWS S3.
Freisin,ERDDAP™úsáid anois gnéithe nua sa S3 AWSJavaAPI.
Freisin,ERDDAP™anois is féidir AWS S3 URLanna a chur san áireamh carachtair breise (tréimhse, hyphen, underscore) in ainmneacha buicéad.
Freisin,ERDDAP™Éilíonn anois go AWS S3 URLanna buicéad a aithint ar bhealach ar leith:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
i gcás ina bhfuil réimír roghnach.
Go raibh maith agat Andy Ziegler agusNOAA.
         
    * IMPROVED: Géiniteacha Xml déileálann anois coitianta breisemissing\\_values seasamh-orlach mar luachanna ar iarraidh agus mar sin is dóichí colún a thiontú go cineál sonraí uimhriúil. Chomh maith leis sin, PrimitiveArray.simplify () anois logs a luach sonraí ar leith ba chúis é a chóireáil colún ar leith mar cholún de teaghráin. Go raibh maith agat le Mathew Biddle.
         
    * Molta:&lt;iarratas Blacklist × tacaí anois .\\*.\\*  (nó:\\*:\\*do IPv6) ag deireadh na seoltaí IP ionas gur féidir leat a blacklist smután níos mó de seoltaí IP, m.sh., 110.52.\\*.\\*  (Poirceallán bhfianaise faoi stiúir glan) . Féach an cháipéisíocht le haghaidh [&lt;an t-iarratas Blacklist (/ ollscoileanna eile sa mhargadh) A bhuíochas leis an tSín Unicom agus an tSín Telecom.
         
    * IMPROVED: Más rud é nach foinse tacar sonraí a shonrú"institution"tréith, GenerateDatasets Xml agus ualachDataset anois é a fháil ó "cruthaitheoir \\_institution" tréith (má tá tú ar fáil) . Go raibh maith agat le Micah Wengren.
         
    * BUG FIX: caighdeánú Cad nach raibh i bhfeidhm i gcónaí ar ASCII comhaid sonraí.
Chomh maith leis sin, Ní raibh EDDTable láimhseáil i gceart srianta ar luachanna ama nuair a bhí an fhoinse luachanna ama Curtain agus a chaighdeánú Cad a bhí á úsáid.
Buíochas le Paloma de la Vallee.
        
Ní raibh mé stáit go soiléir roimh: ba chóir duit a úsáid ach chaighdeánú Cad iad na gnéithe nuair is gá duit i ndáiríre iad (e.g., nuair a comhaid foinse éagsúla a stóráil luachanna ama ar bhealaí éagsúla) , mar gheall ar roinnt iarrataí ar thacair sonraí a úsáid chaighdeánú Cad a phróiseáil beagán níos moille.
        
    * BUG FIX: A bug in cód a úsáideannEDDGridÓn NcFiles ba chúis sé a theipeann le.nc4 agus.hdf5 comhaid go bhfuil "fada" (i gceannas ar an láthair) athróg. Tá sé seo socraithe anois. Buíochas le Friedemann Wobus.
         
    * BUG FIX: Athruithe beaga ar chomhaid ISO 19115 a dhéanamh bailíoir éagsúla sásta. A bhuíochas le Chris MacDermaid agus Anna Milan.
         

## Leagan 2.01{#version-201} 
 (2019-07-02) 

*    **Gnéithe agus Athruithe Nua (d'úsáideoirí) :** 
    * Uimh.
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * BUG FIX: A bug sa chód a ghineann an Fhoirm Rochtana Sonraí le haghaidhtabledapdatasets ba chúis leis an leathanach gréasáin a bheith bán le haghaidh roinnt datasets. Chomh maith leis sin, feabhas mé an láimhseáil na n-earráidí gan choinne ar gach leathanaigh HTML mar sin beidh siad (de ghnáth) teachtaireacht earráide a thaispeáint. Buíochas le Marco Alba.
    * IMPROVED: Géiniteacha Xml a thuilleadh priontaí rabhadh fada ag barr an aschuir. Ina áit sin, féach le do thoil[Editing Cineálach An tSraith Shinsearach Xml Aschur](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better). Buíochas le Steven Baum.
    * IMPROVED: Géiniteacha Xml Déanann anois moltaí beagán difriúil i gcásanna éagsúla&lt;updateEveryNMillis uaire le haghaidh EDD...Ó...Leagan sonraí. Chomh maith leis sin, GenerateDatasets Xml discourages anois ar an bunaidh "extract" córas do EDDTableFromFiles tacar sonraí.

## Leagan 2.00{#version-200} 
 (a scaoileadh 2019-06-26) 

*    **ERDDAP™v2.00 ar deireadh anseo&#33; Yea&#33;**   
     
    * Gabhaimid leithscéal as an moill fhada a theastaíonn chun an leagan seo a chríochnú.
Go raibh maith agat as do foighne.
         
    * Is é an dea-scéal gur úsáideadh an t-am breise chun níos mó de na gnéithe a d'iarr úsáideoirí a chur leis. Is é an droch-scéal go fiú leis an moill, ní cuireadh gach gné a iarradh leis. Táimid leithscéal, ach dhealraigh sé níos tábhachtaí a fháil ar an scaoileadh amach ná chun moill níos mó (go deo?) ag cur go leanúnach gnéithe nua. Geallaimid filleadh ar eisiúintí níos minice sa todhchaí.
         
    * "Version 2?&#33; An bhfuil athruithe móra agus neamhluí?"
Gnéithe móra nua? Tá.
Neamhluí móra nó athruithe do riarthóirí nó úsáideoirí? Uimh.
Thosaigh muid ó v1.82 go v2.00:
        * go páirteach 10 mbliana a cheiliúradh (Anois 11) ós rud é an chéad scaoileadh poiblíERDDAP™  (v1.00 ar 2008-05-06, a d'fhéach amach thar cuimse cosúil le v2.00) . San am sin,ERDDAP™Tá imithe ó shuiteáil amháin go dtí beagnach 100 suiteálacha i ar a laghad 12 tíortha (An Astráil, an Bheilg, Ceanada, an Fhrainc, an India, Éire, an Iodáil, an Afraic Theas, an Spáinn, an Téalainn, an Ríocht Aontaithe, SAM) .
        * go páirteach chun ceiliúradh breise mór i dtreo go hiomlán nua:ERDDAP™anois tá córas sonraí ingest chun dul leis na seirbhísí freastalaí sonraí atá ann cheana féin (féach ar[Féachaint ar Fholúntais](#eddtablefromhttpget)) ,
        * agus go páirteach toisc nach raibh sé léim mhór ó 1.82 go 2.00 uimhriúil, mar sin an chuma ar an am ceart.
             
    * Is é an dea-scéal eile go bhfuil anois dhá ghrúpa eile cód cur leisERDDAP™  (sa leagan seo agus le tásca leanfaidh siad ar aghaidh) : Rob Fuller and Adam Leadbetter of Ireland's Marine Institute, and Roland Schweitzer of PMEL and Weathertop Consulting. Go raibh míle maith agat go mór. Tá sé fíor go bhfuil siad ag obair ar thionscadail a roghnú féin, ach is é sin an tsamhail forbartha foinse oscailte clasaiceach - grúpaí cur cód do na gnéithe go mbeadh siad an chuid is mó mhaith a fheiceáil leis. An sochar breise do rannchuiditheoirí: a fhaigheann siad a bhaint as na gnéithe nua a luaithe a bhíonn siad críochnaithe; nach bhfuil siad chun fanacht ar an scaoileadh seo chugainn deERDDAP. Tá fáilte roimh do ghrúpa, freisin&#33; Féach an[ERDDAP™Clár na dToghthóirí](/docs/contributing/programmer-guide).
         
    * Tá súil againn gur mhaith leatERDDAP™v2.00. Táimid ag tnúth le 10 mbliana amach romhainnERDDAP™forbairt agus riamh níos mó a úsáid ar fud an domhain.
         
*    **Gnéithe agus Athruithe Nua (d'úsáideoirí) :**   
     
    * NUA:orderByMeantaiseachas aeir: fliuch
le haghaidhtabledapríomhfaidh tacair sonraí na modhanna do na grúpaí sonraithe. Chomh maith leis sin, gach ceann de naorderByroghanna tacaíocht a thabhairt anois ar bhealach breise de ghrúpaí a shainiú: _numericVariable\\[/ uimhir / uimhir\\[tréimhse saoil: ilbhliantúil\\]\\[: scoite\\]\\], m.sh., am / 1 lá nó doimhneacht / 10:5. Mar shampla,stationID, am, WaterTemp agusorderByMean (" " "stationID,time/1day") Bheadh sórtáil na torthaí agstationIDagus am, ansin a ríomh agus ar ais ar an meán de WaterTemp do gachstationIDin aghaidh gach lae. Tá na gnéithe nua thar a bheith úsáideach agus cumhachtach. Chuir Rob Fuller agus Adam Leadbetter ó Institiúid Mara na hÉireann an cód nua do na gnéithe seo agus na hathruithe ar an seanchód agus cuireadh isteach é trí Git. Go raibh maith agat, Rob agus Adam&#33;
         
    * NUA: cineál comhaid aschuir le haghaidh tacar sonraí tabular:[.data Tábla Tábla](https://developers.google.com/chart/interactive/docs/reference#dataparam),
comhad JSON formáidithe le húsáid leis anGoogle Visualizationweb development (Google Charts) . Chuir Roland Schweitzer an cód seo agus cuireadh isteach é trí Git. Go raibh maith agat, Roland&#33;
         
    * NUA: cineál comhaid aschuir le haghaidh tacar sonraí tabular:[.jsonlCSV1](https://jsonlines.org/examples/),
atá cosúil leis an láthair.jsonlCSVrogha, ach le hainmneacha colún ar an gcéad líne. Buíochas le Eugene Burger.
         
    * NUA: Má chumasaíonn an riarthóir é, is féidir le húsáideoirí logáil isteach lena n-[Amharc ar gach eolas](https://orcid.org)cuntas.
Is córas fíordheimhnithe OAuth 2.0, i bhfad cosúil le fíordheimhniú Google. ORCID úsáidtear go forleathan ag taighdeoirí a aithint uathúil féin. Tá cuntais ORCID saor in aisce agus nach bhfuil na saincheisteanna príobháideachta go bhfuil cuntais Google. Féach arERDDAP's[Treoracha fíordheimhnithe Orcid](/docs/server-admin/additional-information#orcid). Go raibh maith agat as BCO-DMO (Adam Shepard, Danie Kinkade, etc.) .
         
    * NUA: A tiontaire URL nua athraíonn URLanna as dáta isteach URLanna suas chun dáta.
Féach .../aerddap/convert/urls.html ar aonERDDAP™suiteáil, e.g.,
        [an nasc seo chuig an tiontaire saERD ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html). Ba chóir go mbeadh sé seo úsáideach do bhainisteoirí sonraí. Tá sé seo a úsáidtear go hinmheánach ag GenerateDatasetsXml. Buíochas le Bob Simons agus Sharon Mesick.
         
    * Molta: An[Tiontaire ama](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)anois tá roghanna a thiontú aon am teaghrán coitianta i am teaghrán ISO8601, nó a thiontúUDUNITS-mhaith aonad ama teaghrán isteach ceartUDUNITSaonad téad ama. Ba chóir go mbeadh sé seo úsáideach freisinERDDAP™riarthóirí a bhfuil gá acu a fhios cén fhormáid a shonrú le haghaidh an "aonaid" tréith le haghaidh athróg ama teaghrán. Tá sé seo a úsáidtear go hinmheánach ag GenerateDatasetsXml agus an ghné standardizeWhat de EDDTableFromFiles. Go raibh maith agat le Bob Simons.
         
    * NUA: An[Aonaid iarta Leictreach](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)Tá nua "Standardize UDUnits" rogha.
Mar shampla, tá "deg\\_C / m" agus "céimeanna \\_C méadar-1" araon thiontú go
"céim \\_C m-1". Tá an ghné a úsáid freisin ag an ghné standardizeWhat de EDDTableFromFiles. Go raibh maith agat le Bob Simons.
         
    * NUA: Do graif (seachas graif dromchla) ar ghreille agustabledap's Déan leathanaigh ghréasáin Graph, nuair nach bhfuil an ais x ais am, más rud é go bhfuil ach fo-thacar de raon athróg an ais x le feiceáil, tá cnaipí anois os cionn an graf a athrú ar an X Axis leftwards nó rightwards. Buíochas le Carrie Wall Bell / an tionscadal Hydrophone.
         
    * NUA: I gcás graif, is féidir leis an ais X agus / nó Y scála Logála a úsáid anois.
Is féidir le húsáideoirí rialú a dhéanamh ar an Scála Y Axis trí ghiuirléid nua anuas ar an griddap agustabledapDéan leathanaigh ghréasáin Graph. Féach an[.xRange agus . yRange documents](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange). Buíochas le Carrie Wall Bell / an tionscadal Hydrophone.
         
    * Molta:ERDDAP™anois a dhéanann úsáid níos fearr a bhaint as cóid earráid HTTP éagsúla agus anois tuairisceáin ar(OPeN)DAPv2.0-formáidithe payload teachtaireacht earráide. Féach ar[na sonraí](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors). A bhuíochas le Queric Antoine agus Aurelie Briand.
         
    * IMPROVED: Ná húsáid Netcdf-java/c nó uirlisí bogearraí eile chun ceangal leis.ncnó.hdfcomhaid a sheirbheáilERDDAP's / comhaid / córas amhail is dá mba comhaid áitiúla iad.ERDDAP™anois diúltaíonn na hiarratais. Tá sé uafásach mí-éifeachtach agus is minic a bhíonn fadhbanna eile ann. Ina áit sin:
        
        * Úsáid Úsáid Úsáidte(OPeN)DAPbogearraí cliant a nascadh leERDDAP'sDAPseirbhísí don tacar sonraí (a bhfuil / griddap / nó /tabledap/ sa URL) . Sin an méidDAPTá do agus a dhéanann chomh maith.
        * Nó, bain úsáid as Foirm Rochtana Sonraí an tacar sonraí chun fo-thacar sonraí a iarraidh.
        * Nó, más gá duit an comhad ar fad nó rochtain arís agus arís eile thar thréimhse fada ama, úsáidcurl,wget, nó do bhrabhsálaí a íoslódáil an comhad ar fad, ansin rochtain a fháil ar na sonraí ó do chóip áitiúil den chomhad.
        
          
         
    * Molta: Ar anERDDAP™leathanach baile, Tá Iomlán Téacs Cuardaigh anois os cionn "Féach Liosta de na Sonraí go léir" ós rud é go bhfuil sé an pointe tosaigh is fearr le haghaidh úsáideoirí is mó. A bhuíochas le Didier Mallarino agus Maurice Libes.
         
    * Molta: Ar DataProviderForm3.html tá liostaí dropdown de coitianta anoisstandard\\_names. A bhuíochas le duine éigin ag cruinniú IOOS DMAC.
         
    * IMPROVED: Ar na / comhaid / leathanaigh ghréasáin, tá anois nasc chuig an nua "Cad is féidir liom a dhéanamh leis na comhaid?" alt de na / comhaid / doiciméid. An chuid cur síos cineálacha comhaid éagsúla agus tugann moltaí maidir le conas a bheith ag obair leo. A bhuíochas le Maurice Libes.
         
    * MAOIN: Beagnach gach iarraidh aERDDAP™Ba chóir a bheith ar a laghad beagán níos tapúla, agus uaireanta a lán níos tapúla.
         
    * BUG FIX: I gcásanna áirithe, nuair a shábháil tacar sonraí EDDTable sonraí i roinnt cineálacha.nccomhaid, an "id" domhanda tréith a bhí leagtha chun an comhad ar ainm molta, lena n-áirítear hash a dhéanamh ar leith é a iarraidh sin. Anois tá "id" fágtha gan athrú i gceart (má shonraítear é) nó a leagtar ar an tacar sonraídatasetID  (más rud é nach bhfuil sonraithe) . Buíochas le John Maurer.
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:**   
     
    * A DHÉANAMH: Tógfaidh an scaoileadh seo roinnt ama agus oibre uait. Tabhair othar agus plean ar ghlacadh cúpla uair an chloig a dhéanamh ar na hathruithe is gá agus cúpla uair an chloig níos mó chun triail le gnéithe nua.
         
    * A DO: Le haghaidh sábháilteachta, a dhéanamh cóip cúltaca de do thus reatha.xml agusdatasets.xmlcomhaid ionas gur féidir leat revert dóibh sa chás nach dócha nuair is gá duit a revert chunERDDAP™v1.82.
         
    * DO: An moltaJavaTá sé anois OpenJDK AdoptOpenJDK 8 8 8 8 (Leathanach Main) + HotSpot.
Is malairt foinse oscailte é seoJavanach bhfuil aon srianta ar a úsáid (murab ionann agusOracle'sJavadáileadh) . Tá sé a dhíorthaítear óOracle'sJavaar bhealach leanúnach, leOracle's beannacht. Ar chúiseanna slándála, tá sé tábhachtach a choinneáil doJavaleagan suas chun dáta. Féach arERDDAP's[Javatreoracha a shuiteáil](/docs/server-admin/deploy-install#java).
         
    * DO DHÉANAMH: AdoptOpenJDKJavariachtanais breise beag le do shuiteáil Tomcat: féach ar an[Acmhainní Treoracha Cache](/docs/server-admin/deploy-install#contentxml). I mo thuairimse, go bhfuil sé seo in ionad an -XX: suíomh MaxPermSize, a (Ag glacadh leis) Ní thacaíonn OpenJDK a thuilleadh.
         
    * DO: An réamhshocraithe nua agus a mholadh&lt;Tá cló Teaghlaigh bhéil leagan síos i setup.xml
DejaVu Sans atá tógtha isteach AdoptOpenJDKJava. Féach an
        [treoracha suiteála cló athbhreithnithe](/docs/server-admin/deploy-install#fonts).
         
    * DO: Tá go leor clibeanna ag gluaiseacht ó thus.xml godatasets.xml. Is é an buntáiste gur féidir leat a gcuid luachanna a athrú agusERDDAP™ag rith, gan atosúERDDAP. Go suntasach, is féidir leat athrú go héasca&lt;startBodyHtml5 uaire a thaispeáint teachtaireacht shealadach ar anERDDAP™Leathanach baile (e.g., "Seiceáil amach an nua JPL MUR SST v4.1 tacar sonraí..." nó "SeoERDDAP™beidh sé as líne le haghaidh cothabhála 2019-05-08T17:00 PDT trí 2019-05-08T20:00 PDT.") . Má / nuair a athraíonn tú na clibeanna idatasets.xml, beidh na hathruithe i bhfeidhm an chéad uair eileERDDAP™léamhadatasets.xml.
         
        
        1. Cóipeáil an t-ábhar isteach i dodatasets.xmlcomhad (áit ar bith in aice le tús an chomhaid, tar éis&lt;cliceáil grianghraf a mhéadú
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2. One-ar-aon, cóip an luach (más ann) do gach ceann de na clibeanna ó do comhad thus.xml isteach sa chlib nua go bhfuil tú tar éis dul díreach (thuas thuas) idatasets.xml. Mar shampla, má d'úsáid tú luach 30 le haghaidh&lt;riachtanais uisce: measartha i thus.xml, ba chóir duit a chóipeáil an luach isteach sa nua&lt;cineál gas: in airdedatasets.xml  (Cé má tá an luach mar an gcéanna leis an luach réamhshocraithe nua, is fearr a fhágáil ach an chlib idatasets.xmlbláthanna cumhra: cumhráin) .
            
Má tá do luach difriúil ó na mainneachtana molta nua (seachas le haghaidh&lt;startBodyHtml5 agus&lt;anShortDescriptionHtml bhéil, atá úsáideach do customizing doERDDAP™suiteáil), le do thoil a mheas athrú go dtí na luachanna réamhshocraithe nua. Níl an Tweet seo ar fáil&lt;páirteachRequestMaxBytes ú agus&lt;páirteachRequestMaxCells ^, i gcás ina bhfuil an luach réamhshocraithe / smuigleáilte athrú suntasach thar na blianta.
            
Tar éis duit cóip gach luach, scrios an chlib agus a chur síos ó thus.xml. Tá sé níos fearr go mbeadh na clibeanna idatasets.xml. Agus tá anois cur síos níos fearr i[Socraigh mar teanga réamhshocraithe](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file).
            
        
Tá quirk an chórais nua go bhfuil an chéad leathanach gréasáin nuair a thosaíonn tú suasERDDAPbeidh an réamhshocraitheERDDAP™leathanach gréasáin. Bainfidh gach leathanach gréasáin ina dhiaidh sin úsáid as an ábhar ...datasets.xml.
        
    * WARNING: An chéad uair a ritheann túERDDAP™v2.0, Beidh tacair sonraí bunaithe ar chomhaid sonraí áitiúla luchtú **an-** go mall toiscERDDAP™Ní mór a athchruthú a bhunachar sonraí de chomhaid i bhformáid beagán difriúil. Tar éis an athlódáil tosaigh mall, beidh siad a luchtú go tapa, mar a bhí roimhe. Tabhair othar.
         
#### Féachaint ar Fholúntais{#eddtablefromhttpget} 
    *   [GNÉITHE NUA: EDDTableFromHttpGet](#eddtablefromhttpget)  
Go dtí anois,ERDDAP™ach sonraí a léamh agus chuir sé ar fáil d'úsáideoirí. Anois,ERDDAP™Tá córas simplí, éifeachtach chun ingesting sonraí fíor-ama ó braiteoirí. I measc gnéithe eile, cuireann an tacar sonraí seo leagan fíneáil-grained: cuimhníonn sé gach athrú a rinneadh ar an tacar sonraí, nuair a rinneadh é, agus cé acu. De ghnáth, beidh úsáideoirí ag iarraidh ach an leagan is déanaí den tacar sonraí, le gach athruithe i bhfeidhm. Ach tá an rogha d'úsáideoirí sonraí a iarraidh ón tacar sonraí mar a bhí sé ag aon phointe in am. Éascaíonn sé seo eolaíocht atáirgthe. Dá bhrí sin, murab ionann agus an chuid is mó eile gar-réad-am tacair sonraí, tá na tacair sonraí i dteideal[DOIs s](https://en.wikipedia.org/wiki/Digital_object_identifier). toisc go gcomhlíonann siad anDOIceanglas go bhfuil an tacar sonraí ag athrú, ach amháin trí chomhiomlánú. Féach ar[Féachaint ar Fholúntais](/docs/server-admin/datasets#eddtablefromhttpget). Go raibh maith agat OOI (ó fada ó shin agus anois) le haghaidh caint faoin ngá atá leis seo agus Eugene Burger don meabhrúchán maidir le bheith ag obair ar an méid atá tábhachtach.
         
    * GNÉITHE NUA BIG:ERDDAP™is féidir a sheirbheáil anois sonraí go díreach ó chomhaid sonraí seachtrach-comhbhrúite, lena n-áirítear.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, nó .Z. D'fhéadfadh measc na tacair shonraí meascán de chomhaid a bhfuil brú orthu go seachtrach (b'fhéidir na comhaid sonraí níos sine?) agus neamh-externally-compressed comhaid, agus is féidir leat compress / decompress comhad ag am ar bith.
        
Oibríonn sé seo go hiontach&#33;
I bhformhór na gcásanna, is é an slowdown a bhaineann le decompressing na comhaid mion. Molaimid go láidir duit chun iarracht a dhéanamh, go háirithe le haghaidh tacar sonraí agus / nó comhaid sonraí a úsáidtear go minic.
        
D'fhéadfadh sé seo a shábháil tú $ 30,000 nó níos mó&#33;
Níl an Tweet seo ar fáilERDDAP™gnéithe is féidir a shábháil tú go leor airgid - má chomhbhrú tú a lán de na comhaid sonraí, beidh ort RAIDs i bhfad níos lú / thiomáineann crua a stóráil na sonraí, nó conversely, is féidir leat freastal sonraí i bhfad níos mó (suas go dtí 10x) leis na RAIDs atá agat cheana féin. Má Sábhálann an gné seo tú ó cheannach RAID eile, ansin tá sé shábháil tú faoi $ 30,000.
        
Féach an[Doiciméadú Comhaid atá comhbhrúite go seachtrach](/docs/server-admin/datasets#externally-compressed-files). A bhuíochas le Benoit Perrimond agus Paloma de la Vallee.
        
    * GNÉITHE NUA BIG: Gach duineEDDGridÓ Fianáin agus gach tacar sonraí EDDTableFromFiles tacaíocht&lt;tag agus tag&lt;taisceSizeGB bhéil chlib. Más rud é nach bhfuil cacheSizeGB sonraithe, beidh sé seo íoslódáil agus a choimeád ar bun cóip iomlán de chomhaid tacar sonraí iargúlta. Má tá taisceSizeGB sonraithe agus tá sé ^0, beidh sé seo comhaid a íoslódáil ón tacar sonraí iargúlta, de réir mar is gá, isteach i taisce áitiúil le méid teoranta, atá úsáideach nuair a bheith ag obair le scamall-bhunaithe (e.g., S3) comhaid sonraí. Féach an[taisce taisce taisce Doiciméadú FromUrl](/docs/server-admin/datasets#cachefromurl)le haghaidh sonraí. Buíochas le Bob Simons agus Roy Mendelssohn (a le blianta a bheith scripteanna scríobh a láimhseáil cóipeanna áitiúla de chomhaid sonraí iargúlta) , Lloyd Cotten, Eugene Burger, Conor Delaney (nuair a bhí sé ag Seirbhísí Gréasáin Amazon) , agus an Ardán Google Cloud.
         
    * NUA: An EDDTableFrom JsonlCSV nua Is féidir le rang a léamh sonraí tabular ó
        [JSON Línte comhaid CSV](https://jsonlines.org/examples/)  (" Níos Fearr ná CSV") . A bhuíochas leis na daoine in Institiúid Mara na hÉireann chun insint dom faoin bhformáid seo agus le Eugene Burger agus PMEL don iarratas chun tacú leis mar chineál ionchuir.
         
    * NUA: GachEDDGridagus tacaíonn gach tacar sonraí EDDTableFromFiles le&lt;nTrídí leagan amach, a insíonnERDDAP™cé mhéad snáithe atá le húsáid agus iad ag freagairt d'iarraidh. Féach an[nTrí doiciméadú](/docs/server-admin/datasets#nthreads)le haghaidh sonraí. A bhuíochas le Rob Bochenek na hEolaíochta Sonraí Axiom, Eugene Burger, Conor Delaney (nuair a bhí sé ag Seirbhísí Gréasáin Amazon) , agus Google Cloud Ardán.
         
    * Caighdeánú NUA Cad do gach fo-aicmí EDDTableFromFiles -
Roimhe seo, más rud é le haghaidh athróg ar leith, na luachanna na tréithe tábhachtacha (e.g.,scale\\_factor,add\\_offset,missing\\_value, \\_FillValue, aonaid) Ní raibh comhsheasmhach, bheadh EDDTableFromFiles roghnaigh luach amháin do gach tréith a bheith "valid" agus comhaid marc le luachanna tréith eile mar "Comhaid Daid". Anois, tá córas ann chun na comhaid a chaighdeánú chomh luath agus a léann EDDTableFromFiles na comhaid. Féach ar[Caighdeánú EDDTableFromFile Cad iad na rudaí maithe a bhain...](/docs/server-admin/datasets#standardizewhat). Ceann de naERDDAP's príomhchuspóirí a dhéanamh comhaid sonraí agus tacar sonraí inrochtana ar bhealach comhsheasmhach. caighdeánú Cad is uirlis thábhachtach nua a dhéanamh go réaltacht. A bhuíochas le Marco Alba, Margaret O'Brien (agus úsáideoirí EML eile) , BCO-DMO, agus úsáideoirí InPort.
         
    * Ligeann EDDTableFromInvalidCRAFiles duit tacar sonraí a dhéanamh ó bhailiúchánNetCDF  (v3 nó v4)  .nccomhaid a úsáideann ar leith, neamhbhailí, leagan den CF DSG Dtiguous Ragged Array (irl - Library Service) comhaid. Is féidir le comhaid samplacha don chineál seo tacar sonraí a fháil ag https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[Clár na dToghthóirí Níl an freastalaí seo ar fáil anois go hiontaofa\\]. Cén fáth CéERDDAP™Tacaíonn sé leis an gcineál comhaid seo, is cineál comhaid neamhbhailí é nár chóir do dhuine tosú ag úsáid. Moltar go láidir do ghrúpaí a úsáideann an cineál comhaid seo faoi láthair úsáid a bhaint asERDDAP™a ghiniúint bailí CF DSG comhaid CRA agus stop ag baint úsáide as na comhaid. Buíochas le Ajay Krishnan agus Tim Boyer.
         
    * EDDTableFromThreddsFiles agus EDDTableFromHyraxTá comhaid dímheasta anois. Téigh chuig EDDTableFromNcFiles (nó malairt) móide móide&lt;taisceFromUrl . Más rud é nach bhfuil ag obair ar chúis éigin, ríomhphosterd.data at noaa.gov. Mura bhfuil aon ghearáin ann roimh 2020, féadfar na cineálacha tacar sonraí sin a bhaint.
         
    * Ceisteanna Coitianta An córas chun athrú go huathoibríoch neamh-ISO 8601 amanna i ISO 8601 amanna (a tugadh isteach i v1.82) Tá leathnú go mór chun déileáil le líon mór de formáidí breise. Bíonn tionchar aige seo ar GenerateDatasetsXml agusERDDAP's láimhseáil meiteashonraí foinse.
         
    * Ceisteanna Coitianta Leis an tríú hathbhreithniú mór ar an gcóras pharsáil ama Curtain (agus tá súil agam go deireanach) ,ERDDAP™a thuilleadh úsáideJava's DateTimeFormatter mar gheall ar bugs a dhéanann difear uaireanta amanna foircneacha (blianta&lt;=0000).ERDDAP™anois úsáideann a chóras féin le haghaidh teaghráin am parsing.
         
    * WARNING: Tá an t-am nua String parsing córas beagán níos déine. Má tá ceann de do datasets tobann luachanna ar iarraidh ach le haghaidh luachanna ama, is é an chúis beagnach cinnte go bhfuil an teaghrán formáid ama beagán mícheart. Ba chóir go mbeadh teachtaireachtaí earráide i logáil. txt a bhaineann le luachanna ama nach raibh comhoiriúnach leis an bhformáid ama - ba chóir go cabhrú leat a shocrú ar an teaghrán formáid ama don tacar sonraí. Más gá duit cabhair, bain úsáid as an rogha iERDDAP's Tiontaire Am a "Tiontaigh\\[s s\\]aon am teaghrán coiteann isteach in am teaghrán ISO 8601 " - léiríonn sé an fhormáid a úsáidtear chun parse an teaghrán foinse.
         
    * MOLADH: An bealach is tapúla, is éasca, agus is saoire chun dlús a churERDDAPTá rochtain ar shonraí tabular a chur ar na comhaid sonraí ar Drive Stáit Soladach (Soladach 316 Cruach dhosmálta) . Tá an chuid is mó tacar sonraí tabular réasúnta beag, mar sin tá 1 nó 2 SSD TB dócha go leor a shealbhú gach ceann de na comhaid sonraí do gach ceann de do thacair sonraí tabular. SSD chaitheamh amach sa deireadh má scríobh tú sonraí le cille, é a scriosadh, agus sonraí nua a scríobh chuig an cille sin amanna an iomarca. Ina áit sin, Molaim go (an oiread agus is féidir) úsáid tú ach do SSD a scríobh na sonraí uair amháin agus é a léamh amanna go leor. Ansin, ba chóir fiú SSD tomhaltóirí-grád deireanach ar feadh an-fhada, is dócha i bhfad níos faide ná aon Hard Diosca Drive (HD chaighdeán den scoth) . Tá SSD Tomhaltóirí-grád anois saor (i 2018, ~ $200 do 1 TB nó ~ $400 do 2 TB) agus tá praghsanna fós ag titim go tapa. Nuair a bheidhERDDAP™rochtain comhad sonraí, cuireann SSD araon
        
        * tréimhse saoil: ilbhliantúil (0.1ms, i gcomparáid ~ 3ms do HDD, i gcomparáid ~ 10 (?) ms do RAID, i gcomparáid ~55ms do Amazon S3) , agus
        * airde plandaí (cm): níos airde 100 cm (~ 500 MB / S, i gcomparáid ~ 75 MB / s do HDD i gcomparáid ~ 500 MB / s do RAID) .
        
Mar sin, is féidir leat a fháil suas le ~ 10X borradh feidhmíochta (vs HDD) do $200&#33; I gcomparáid leis an chuid is mó athruithe féideartha eile ar do chóras (freastalaí nua do $ 10,000? RAID nua do $ 35,000? athrú líonra nua do $5,000? etc.) , is é seo le fada an Tuairisceán is fearr ar Infheistíocht (irl - Library Service) . Más rud é nach bhfuil do fhreastalaí luchtaithe le cuimhne, tá cuimhne breise do do fhreastalaí chomh maith ar bhealach iontach agus réasúnta saor chun dlús a chur le gach gné deERDDAP.
        \\[Bheadh SSD mór do shonraí gridded, freisin, ach tá an chuid is mó tacar sonraí gridded i bhfad níos mó, a dhéanamh ar an SSD an-daor.\\]  
         
    * NUA: Faigheann gach duine atá logáilte isteach ról =\\[duine ar bith I\\], fiú mura bhfuil aon&lt;úsáideoir bhéil chlib dóibh idatasets.xml. Má leagtar tú tacar sonraí ar&lt;Go dtí seo\\[duine ar bith I\\], ansin aon duine a bhfuil logáilte isteach chunERDDAP™  (e.g., trína gcuntas Gmail nó Orcid) beidh a bheith údaraithe chun rochtain a fháil ar an tacar sonraí, fiú mura bhfuil tú sonraithe a&lt;úsáideoir bhéil chlib dóibh idatasets.xml. Buíochas le Maurice Libes.
         
    * Molta: AnUDUNITSCuireadh feabhas mór ar tiontaire aonad / UCUM.
Láimhseálann sé aonaid neamhbhailí teaghráin níos fearr (ag tosú le béim ar fhaisnéis a chaomhnú, seachas bailíocht a fhorfheidhmiú) . Chomh maith leis sin, tá na torthaí anois ar syntax chaighdeánaithe.
         
    * NUA: AnUDUNITS/ UCUM Tá tiontaire aonad rogha nua a chaighdeánúUDUNITSteaghrán.
Oibríonn sé seo go maith le bailíUDUNITSteaghráin agus le réasún go maith le haghaidh neamhchaighdeánach / neamhbhailíUDUNITSteaghráin. Mar shampla, Mar shampla,UDUNITS= "méadair in aghaidh an dara", "méadar / dara","m.s^-1", agus"m s-1"beidh gach tuairisceán "m.s-1". Bhí sé seo ag teastáil le haghaidh an caighdeánú nua Cén córas a thuairiscítear thuas. A bhuíochas le Marco Alba, Margaret O'Brien (agus úsáideoirí EML eile) , BCO-DMO, agus úsáideoirí InPort.
         
    * NUA: Tá EDDTableFromMultidimNcFiles anois[Toisí a chóireáil](/docs/server-admin/datasets#treatdimensionsas)rogha, a insíonnERDDAP™toisí áirithe a chóireáil (e.g., LAT agus LON) amhail is dá mba toisí eile iad (e.g., AM) . Tá sé seo úsáideach do roinnt comhaid mícheart a úsáid toisí éagsúla le haghaidh athróg éagsúla nuair ba chóir dóibh a úsáid ach gné amháin (e.g., AM) . A bhuíochas le Marco Alba agus Maurice Libes.
         
    * NUA: Anois, go léirEDDGridÓn... Tacaíonn tacaíonn sonraí le hais speisialta nuasourceNamea deirERDDAP™chun faisnéis a bhaint as an gcomhadName (ach filename.ext) agus an luach a úsáid **ionad a chur in ionad** luach na haise clé. Is é an fhormáid
        \\*\\*\\ * Athsholáthar Ó FileName,_dataType_,_extractRegex_,_captureGroupNumber_
Féach ar[an doiciméad seo](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Go raibh maith agat as anNOAASocróir sonraí a chomhiomlánú laethúil.
         
    * NUA: Anois, go léirEDDGridÓn... Tacaíonn tacaíonn sonraí le hais speisialta nuasourceNamea deirERDDAP™chun faisnéis a bhaint as an gcomhad ar pathName (eolairí + ainm comhaid.ext)   
        \\*\\*\\*pathName,_dataType_,_extractRegex_,_captureGroupNumber_
Chun seo, úsáideann an t-ainm cosán i gcónaí'/'mar an carachtar deighilteoir eolaire, riamh '\'.
Féach ar[an doiciméad seo](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Buíochas le Paloma de la Vallee.
         
    * NUA: Anois, gach EDDTableFrom... Comhaid tacar sonraí tacaíocht breise pseudo athrógsourceNames a sliocht faisnéis ón gcomhadName (ach filename.ext)   (féach ar[\\*\\*\\ *](/docs/server-admin/datasets#filename-sourcenames)) nó as an comhad cosán iomlán Name (Sonraí Teagmhála)   (féach ar[\\*\\*\\ *](/docs/server-admin/datasets#pathname-sourcenames)) . Buíochas le Paloma de la Vallee.
         
    * NUA: Má táEDDGridTá toisí an-mhór ag tacar sonraí (e.g., na milliúin luachanna) a chur ar bun a lán de chuimhne, is féidir leat a leagtar ar an nua [&lt;gnéValuesInMemory ×] (Teicneolaíocht Faisnéise agus Cumarsáide) leagan síos bréagach (Is é an réamhshocraithe fíor) , a cúiseanna an tacar sonraí a stóráil na luachanna ar diosca agus iad a aisghabháil nuair is gá. A bhuíochas le David Rodriguez agus Rich Signell (re:EDDGridAmharc ar gach eolas) .
         
    * IMPROVED: Roimhe seo, má tá tú reordered andataVariables le haghaidh tacar sonraí EDDTableFromFiles agus athlódáil an tacar sonraí, bheadh EDDTableFromFiles reread all of the datafiles. Anois, is féidir é a déileáil leis an reordering gan rereading gach ceann de na comhaid sonraí. Buíochas le Roland Schweitzer.
         
    * Molta: Anois, nuair aERDDAP™léann ASCII, NCCSV, agus JSON Línte CSV comhaid sonraí tabular, má fhaigheann sé earráid ar líne ar leith (e.g., líon mícheart míreanna) , logs sé teachtaireacht rabhaidh ("WARNING: Skipping line #"... ” Léim chuig an ábhar gan choinne...”) go dtí an[comhad logála.txt](/docs/server-admin/additional-information#log)agus ansin leanann an chuid eile den chomhad sonraí a léamh. Dá bhrí sin, tá sé do fhreagracht chun breathnú tréimhsiúil (nó scríobh script a dhéanamh amhlaidh) don teachtaireacht sin sa logáil. txt ionas gur féidir leat a shocrú ar na fadhbanna sna comhaid sonraí.ERDDAP™Tá sé ar bun ar an mbealach seo ionas gur féidir le húsáideoirí leanúint ar aghaidh ag léamh gach ceann de na sonraí bailí atá ar fáil cé go bhfuil roinnt línte an comhad flaws. Roimhe seo,ERDDAP™marcáilte an comhad mar "bad" agus é a bhaint as an tacar sonraí.
         
    * Molta: Nuair a amanna beacht (e.g., go dtí an dara nó an millisecond is gaire) a stóráil ag an bhfoinse mar "nóiméad ó..." (nó aonaid níos mó) ,ERDDAP™anois babhtaí iad go dtí an millisecond is gaire nuair a léamh na luachanna isteachERDDAP. Seachas sin, bruised na huimhreacha pointe snámh agus iarrataí ar shonraí ag amanna sonracha (e.g., &amp; am = 2018-06-15T01:30:00) beidh theipeann. Roimhe seo, ríomh sé iad chomh beacht agus is féidir (agus a dhéanann fós má tá na haonaid m.sh., "soicindí ó ..." nó "milliseconds ó...") . Is fearr an fhadhb seo a sheachaint trí gan aonaid mhóra a úsáid (m.sh., nóiméad nó uaireanta) a stóráil luachanna ama beacht (e.g., microseconds) - ríomhairí a dhéanamh post bocht de láimh dhigit deachúil. Buíochas le Marco Alba.
         
    * CHANGES to EDDTableFromEDDGrida dhéanann sé i bhfad níos fearr. EDDTableFromEDDGridligeann d'úsáideoirí a cheist tacar sonraí gridded amhail is dá mba thacair sonraí tabular ("ceisteanna de réir luacha") .
        
        * Tacaíonn sé anois&lt;maxAxis0 chlib (réamhshocraithe = 10) a shonraíonn an t-uasmhéid ais\\[0 0\\]  (de ghnáth"time") luachanna is féidir a chuardach ag an am céanna. Cuireann sé seo cosc ar iarratais naive ó EDDTableFrom fháilEDDGridchun cuardach a dhéanamh trí tacar sonraí ar fad gridded (a bheadh theipeann le earráid timeout) .
        * Sonraí a ghiniúint Tá Xml anois rogha a ghiniúint EDDTableFromEDDGriddatasets do gach ceann de na tacair sonraí gridded i ar leithERDDAP™a mheaitseáil le regex sonraithe (úsáid .\\* a mheaitseáil gach tacar sonraí) . Na tacar sonraí a chruthaíonn sé go bhfuil faisnéis bhreise sa tréith achomair a léiríonn go bhfuil sé seo le leagan tabular de tacar sonraí gridded. Agus a gcuiddatasetIDIs é andatasetIDan tacar sonraí gridded, móide "\\_AsATable".
        * Tá luas mór suas le haghaidh an thus is coitianta: nuair a bhíonn an tacar sonraí griddedEDDGridÓ tacar sonraí Erddap atá sa chéannaERDDAP.
        
Buíochas le James Gallagher agus Ed Armstrong.
         
    * NUA: a ghiniúint An tSraith Shinsearach Xml do gach cineál tacar sonraí anois i bhfad níos mó seans a chur \\_FillValue nómissing\\_valuetréith a athróg uimhriúil araddAttributes. Mar shampla, tharlaíonn sé seo nuair teaghrán marcóirí luach ar iarraidh (e.g., "", ".", "?", "NA", "Agus", "NaN") don athróg sa chomhad sampla a thiontú goERDDAP's luachanna dúchais ar iarraidh (127 i gcolúin fhoirceanta, 32767 i gcolúin ghearr, 2147483647 i colúin int, 9223372036854775807 i colúin fada, agus NaN i snámhphointe agus athróg dúbailte) . Tarlaíonn sé freisin le haghaidh luachanna NaN i snámhphointe agus athróg dúbailte. Chomh maith leis sin, cuireadh "Agus" leis an liosta de na marcóirí luach ar iarraidh coitianta i colúin sonraí uimhriúil goERDDAP™Ba chóir breathnú ar. A bhuíochas le Matt Biddle de BCO-DMO.
         
    * Molta: an rogha ncdump i ghiniúint An tSraith Shinsearach Tá Xml anois níos mó cosúil le ncdump (ach fós úsáideann an leagan netcdf-java de ncdump) . Anois, priontaíonn sé liosta nua de roghanna. Anois, do.ncml comhaid, priontaí sé an t-aschur ncdump do thoradh an.ncathruithe comhad ml i bhfeidhm ar an bunúsacha.ncnó.hdfcomhad.
         
    * BUG FIX: Bhí sceitheadh láimhseáil comhad (deireadh thiar cúisERDDAP™a reo suas) ba chúis nuair a chruthú roinnt cineálacha comhaid aschur, m.sh., .geotif, go háirithe nuair a tharla earráidí le linn a chruthú. I mo thuairimse, / Tá súil go bhfuil sé seo socraithe anois ar fad. Má fheiceann tú fós fadhbanna, inis dom an cineál tacar sonraí (greille nó tábla) agus an cineál comhaid atá ag cruthú an fhadhb. A bhuíochas le Steven Beale, Lynn DeWitt, Jibei Zhao, agus daoine eile.
         
    * BUG FIX: An bhfuilWMS LeafletNí raibh taispeántas thiontú go hiomlán / go cuí an "doimhne" ais go dtí "éilliú". Anois, a dhéanann sé, agus na hiarrataí finscéal briste seasta. Chomh maith leis sin, tá gach rogha aise sna liostaí anuas i gcónaí in ord ardaitheach curtha in eagar. A bhuíochas le Queric Antoine agus Aurelie Briand.
         
    * BUG FIX: EDDTableFromFiles Tacaíonn anois i gceart srianta ar athróga Curtain a cruthaíodh ó athróga char sna comhaid sonraí. A bhuíochas le Queric Antoine agus Aurelie Briand.
         
    * BUG FIX: Anois, nuair a bhíonn tacar sonraí ar fáil, déanann an tacar sonraí fógra a thabhairt (leis an teachtaireacht "Níl an tacar sonraí seo ar fáil faoi láthair.") a síntiúsóirí, gníomhartha liostaithe, rss, agus lonPM180 tacar sonraí a bheith ag brath air. Buíochas le Roy Mendelssohn agus Bob Simons.
         
    * BUG FIX: Dhá bugs a bhaineann le EDDTableCopy. Buíochas le Sam McClatchie.
         
    * IMPROVED: Beidh líon na n-iarratas theip a thaispeántar ar an leathanach status.html méadú mar gheall ar rudaí níos mó a chomhaireamh mar teipeanna ná roimhe.
         
    * Molta:ERDDAP's status.html léiríonn anois "Requests (amanna meáin i ms) " sa tsraith ama. Roimhe seo, léirigh sé amanna meánach teasctha go soicind slánuimhir.
         
    * Molta: Sa aschur jsonld, an jsonld "ainm" a thagann anois as an tacar sonraí ar"title"iERDDAP, agus an jsonld "ceannlíne" a thagann anois ó na tacar sonraí "datasetID" iERDDAP. Roimhe seo, bhí sé droim ar ais. Dealraíonn sé seo mícheart dom mar gheall ar i gnáth úsáid Béarla, is é "ainm" de ghnáth gearr, (go hidéalach) aitheantóir uathúil go bhfuil athruithe annamh / deo (e.g., Robert Middlename Simons) , Ní cur síos nach bhfuil uathúil agus is féidir a athrú go héasca agus go minic (e.g., "A Guy a scríobhann bogearraí le haghaidhNOAA" vs. "A Guy ard a scríobhann bogearraí le haghaidhNOAA" " ") . Gee, bheadh sé iontach má an sainmhíniú schema.org[Ainm an ainm](https://schema.org/name), i gcomhthéacs tacar sonraí, bhí níos sainiúla. Ba chóir go mbeadh forbróirí bogearraí in ann cur i bhfeidhm sonraíochta a scríobh bunaithe ar an tsonraíocht amháin, gan treoir ó shaineolaithe. Ach táim ag iarraidh Google (go háirithe Natasha riachtanais uisce: measartha) , NCEI (go háirithe John Relph) , agus Rob Fuller.
         
    * IMPROVED: Sa aschur jsonld, is iad na ceithre "spatialCoverage GeoShape bosca" luachanna anois minLat minLon maxLon maxLon. Roimhe seo, bhí droim ar ais ar na poist lat agus lon. Gee, bheadh sé iontach má an sainmhíniú schema.org[taiseachas aeir: fliuch](https://schema.org/GeoShape)sonraithe an t-ordú ceart. Ba chóir go mbeadh forbróirí bogearraí in ann cur i bhfeidhm sonraíochta a scríobh bunaithe ar an tsonraíocht amháin, gan treoir ó shaineolaithe. Buíochas le Natasha Noy agus Rob Fuller.

## Leagan 1.82{#version-182} 
 (2018-01-26) 

*    **Gnéithe Nua (d'úsáideoirí) :**   
     
    * Athruithe subtle iomadúla ar an cuma-agus-feel deERDDAP™leathanaigh ghréasáin.
        * Molta:ERDDAP™anois úsáideann HTML 5 agus a dhéanann úsáid níos fearr CSS.
        * FÓGRA: Tá na leathanaigh ghréasáin beagán modhnaithe chun iad a dhéanamh níos glaine agus níos lú "busy". (Tá siad fós dlúth agus tá rudaí fós d'fhéadfadh duine gearán a dhéanamh faoi, ach tá súil agam i bhfad níos lú ná sin roimhe.) Buíochas le John Kerfoot le haghaidh roinnt tuairimí.
        * IMPROVED: Breathnaíonn na leathanaigh ghréasáin i bhfad níos fearr anois ar fhóin phóca agus ar fheistí beaga eile, go háirithe má úsáideann tú iad i dtreoshuíomh tírdhreacha. Breathnaíonn siad freisin níos fearr i fuinneoga an-bheag agus an-mhór i brabhsálaithe deisce.
        * IMPROVED: Chun feabhas a chur ar shlándáil agus ar chúiseanna eile, úsáid a bhaint as leagan amach den dáta Openlayer donWMSleathanaigh taispeána curtha in ionadLeaflet.
        * NUA: tacaíocht le haghaidh réamhamhairc de íomhá, fuaime, agus comhaid físe sa"files"córas córas (mar shampla,[an tacar sonraí tástála](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/)) agus i.htmlTablefreagraí nuair a bhíonn cill an URL de íomhá, comhad fuaime nó físe (mar shampla,[an iarraidh seo](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22)) . Má tá tú ag hover thar '?' deilbhín, ba chóir duit a fheiceáil íomhá, fuaime, nó réamhamharc comhad físeán. Is féidir leat cliceáil freisin ar an nasc comhad chun féachaint ar an scáileán iomlán comhad i do bhrabhsálaí. Féach an[Doiciméid na gComhaid Meáin](/docs/server-admin/datasets#media-files). Tabhair faoi deara go tacaíocht brabhsálaithe éagsúla cineálacha comhaid éagsúla, mar sin ní féidir na samplaí ag obair i do bhrabhsálaí.
A bhuíochas leis na daoine / naisc le haghaidh smaointe agus cód samplach le haghaidh uirlisí íomhá CSS-amháin (bhí ag https://codepen.io/electricalbah/pen/eJRLVd ) agus luchtú íomhá iarchurtha (bhí ag https://varvy.com/pagespeed/defer-images.html )   (cé go ndearnadh an cód a mhodhnú sula n-úsáidtear éERDDAP) .
Buíochas le Cara Wilson, Matthew Austin, agus Adam Shepherd / BCO-DMO le haghaidh iarrataí ar thacaíocht íomhá.
A bhuíochas le Jim Potemra, Rich Signell, OOI, agus Carrie Wall Bell le haghaidh iarrataí ar fuaime / tacaíocht comhad hidreafón.
A bhuíochas le OOI chun an gá atá le tacaíocht físe a léiriú.
        * NUA: A fo-thacar sonraí ó aonERDDAP™dataset (ach de ghnáth tacar sonraí ó chomhaid fuaime) Is féidir a shábháil anois i .wav comhad fuaime. ([data recovery](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav)) A bhuíochas le Jim Potemra, Rich Signell, OOI, agus Carrie Wall Bell le haghaidh iarrataí ar fuaime / tacaíocht comhad hidreafón.
        * Molta: An fhormáid le haghaidh an Fillteáin Inrochtana Gréasáin (WAF)   (e.g., na / comhaid / fillteáin) Tá suas chun dáta a úsáid tábla HTML. An fhormáid nua mimics an leagan níos déanaí de na leathanaigh ghréasáin liosta eolaire cruthaithe ag leaganacha níos déanaí de Apache. Gheobhaidh daoine go ndéanann na hathruithe an fhaisnéis níos éasca a léamh. Bogearraí a parses na doiciméid (e.g., bogearraí a fómhar doiciméid ISO 19115 óERDDAP) beidh a athbhreithniú, ach beidh an fhormáid nua a bheith níos éasca a parse ná an fhormáid roimhe seo. (Aird, Anna Milan.) 
        * Baile Átha CliathoutOfDateDatasets.htmlleathanach. ([sampla sampla sampla](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) LéirÃ onn an leathanach gréasáin tábla le gach ceann de na tacair sonraí gar-rÃ neach go bhfuil&lt;testOutOfDate× chlib (féach thíos) , rangaithe ag an gcaoi a bhfuil na tacair shonraí cothrom le dáta. Ba chóir an Painéal na nIonstraimí a bheith úsáideach le haghaidhERDDAP™riarthóirí agus úsáideoirí deiridh nuair is mian leo a fháil amach cén tacar sonraí atá lasmuigh den dáta. Le haghaidh tacair sonraí lasmuigh den dáta, is dócha go bhfuil fadhb leis an bhfoinse sonraí, ionas go mbeidhERDDAP™nach bhfuil in ann sonraí a fheiceáil / a fháil ó phointí ama níos déanaí.
Riarthóirí: Más rud é nach bhfuil tú ag iarraidh ar Amach-Of-Date Datasets leathanach gréasáin, seo a chur le do thus.xml:
            &lt;cliceáil grianghraf a mhéadú&lt;/ lasmuigh cliceáil grianghraf a mhéadú
Tá anoistestOutOfDateagus amach OfDate colúin saallDatasetstacar sonraí.
A bhuíochas le Bob Simons, a bhí ag iarraidh é seo ar feadh na mblianta, agus do mhuintir cliste Institiúid Mara na hÉireann a thug an inspioráid dom trína Raspberry Pi tiomanta agus a léiríonn i gcónaí scáileán mar seo ina n-oifig.
        * Molta:.htmlTableagus.xhtmlTá freagairt formáidithe níos fearr anois, níos dlúithe, agus dá bhrí sin luchtú níos tapúla. Buíochas le HTML5 agus CSS.
    * Cineál comhaid aschuir NUA le haghaidh tacar sonraí eangaí: .timeGaps. Taispeánann sé liosta de na bearnaí sna luachanna ama atá níos mó ná an bhearna meánach. ([sampla sampla sampla](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps)) Níl an Tweet seo ar fáilERDDAP™riarthóirí agus úsáideoirí deiridh nuair is mian leo a fháil amach an bhfuil bearnaí gan choinne i luachanna ama le haghaidh tacar sonraí a bhfuil súil go bhfuil luachanna ama spásáilte go rialta. A bhuíochas le Bob Simons agus Roy Mendelssohn a bhí ag teastáil an ghné seo.
    * Molta: An graf réamhshocraithe donallDatasetsTá tacar sonraí anois léarscáil le x = maxLon agus y = maxLat. Buíochas le John Kerfoot, Rich Signell, agus OOI-CI.
    * NUA:[taiseachas aeir: fliuch](https://github.com/ioos/erddapy)- nach bhfuilERDDAP™gné, ach beidh suim go leorERDDAP™úsáideoirí. taiseachas aeir: fliuch (ERDDAP™+ + + +Python) Is maith liom éPythonleabharlann cruthaithe ag Filipe Fernandes go "a ghlacann buntáiste asERDDAP'sRESTfulseirbhísí gréasáin agus cruthaíonn anERDDAP™URL le haghaidh aon iarraidh cosúil le cuardach le haghaidh tacar sonraí, meiteashonraí a fháil, sonraí a íoslódáil, etc. Buíochas le Filipe Fernandes.
    * Ba chóir dom a luadh roimh: Tá pacáiste R tríú páirtí deartha chun é a dhéanamh níos éasca a bheith ag obair leisERDDAP™ó laistigh R:[taiseachas aeir: fliuch](https://github.com/ropensci/rerddap#rerddap). Go raibh maith agat as[Seirbhís do Chustaiméirí](https://ropensci.org/)agus Roy Mendelssohn.
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:**   
     
    * Chun a dhéanamh: I thus.xml, ceart thíos&lt;adminInstitution ×, le do thoil cuir&lt;adminInstitutionUrl chlib a shonraíonn URL do d'institiúid (nó grúpa) .
    * Chun DO: Tá na 3 clibeanna i thus.xml a thuilleadh a úsáidtear:
        &lt;tús a chur Cóipeáil nasc leis an tweet&lt;startBodyHtml ú agus&lt;endBodyHtml . Tá siad in ionad
        &lt;tús a chur HeadHtml5 uaire,&lt;startBodyHtml5 agus&lt;endBodyHtml5 ×, a bhfuil luachanna réamhshocraithe a shonraítear i teachtaireachtaí.xml (agus a thaispeántar thíos) .
        
Molaimid ag baint úsáide as an réamhshocraithe&lt;startHeadHtml5 ú agus&lt;Deireadh an chomhábhair.
Molaimid: Má rinne tú athruithe ar an bunaidh&lt;startBodyHtml ú agus / nó ag iarraidh a shaincheapadh doERDDAP™anois, le do thoil cóip an nua&lt;Tosaitheoirí turraing (ó thíos) i do thus.xml agus é a mhodhnú a shaincheapadh doERDDAP™ionas goERDDAPLéiríonn leathanaigh gréasáin 's d'eagraíocht, níNOAA ERD. Go suntasach, le do thoil athrú ar an "Rugtha chun tú ag" le do eagraíocht (s s) . Más gá duit cabhair, le do thoil ríomhphosterd.data at noaa.gov. (Má tá tú ag iarraidh a shaincheapadh doERDDAP™anois, bain úsáid as an réamhshocraithe&lt;startBodyHtml5 .)
        
Ansin scriosadh na 3 clibeanna d'aois i do thus.xml nach n-úsáidtear a thuilleadh.

```
        <startBodyHtml5><!\\[CDATA\\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \\]\\]></startBodyHtml5>
```

Tá bealaí breise is féidir leat[customizeERDDAP™](/docs/server-admin/deploy-install#customize)amhlaidhERDDAP's leathanaigh ghréasáin léiríonn do eagraíocht in ionadNOAA ERD.
        
    * Chun DO: An&lt;EDDGrid...Example &amp; clibeanna (ag tosú le&lt;EDDGridIdExample &amp; &amp; rsquo;) agus an&lt;EDDTable... Sampla &amp; tags (ag tosú le&lt;EDDTableIdExample &amp; gt;) i do comhad thus.xml a úsáidtear chun samplaí a chruthú sa griddap agustabledapdoiciméadú. leathanaigh ghréasáin html i doERDDAP.
        
Más rud é nach raibh tú a shaincheapadh ar na clibeanna, le do thoil iad a scriosadh ó do comhad thus.xml. Anois tá siad go léir mainneachtainí i message.xml a thagraíonn do datasets i BobERDDAP™ag an https://coastwatch.pfeg.noaa.gov/erddap/index.html . Mar sin, ní gá duit a thuilleadh go mbeadh tacair sonraí ar leith i doERDDAP. Más mian leat a shárú na mainneachtainí, cóip roinnt nó gach ceann de na clibeanna isteach i do thus.xml agus a luachanna a athrú.
Más mian leat na samplaí a chur in iúl do doERDDAP™, is é an modh is éasca ná:
        
        1. Lena n-áirítear an dá tacar sonraí i doERDDAP™trí seo a chur le dodatasets.xml:
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Cuir an chlib seo le do thus.xml, ach an URL a athrú chuig doERDDAP's (https?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Má rinne tú shaincheapadh ar na clibeanna, iad a fhágáil mar atá agus cuir na 2 clibeanna nua le do thus.xml a shonrú ar anERDDAP™URL do na tacair sonraí, ach athrú ar an URL chuig doERDDAP's (https?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * DO DHÉANAMH:ERDDAP™anois úsáideann comhad cs ar a dtugtar erddap2.cs. Má rinne tú athruithe ar\\[taiseachas aeir: fliuch\\]/webapps / erddap/images/erddap.cs, a mheas a dhéanamh athruithe den chineál céanna a erddap2.cs (sa eolaire céanna) .
    * NUA:ERDDAP's leathanaigh ghréasáin anois tá líon mór de naisc inmheánacha beagnach dofheicthe (Is é an téacs dubh agus ní béim) . Má tá tú ag hover thar ceann de na naisc (de ghnáth an chéad chúpla focal de cheannteidil agus míreanna) , éiríonn an cúrsóir lámh. Má chliceálann tú ar an nasc, is é an URL an nasc inmheánach chuig an gcuid sin den doiciméad. Fágann sé seo go bhfuil sé éasca tagairt a dhéanamh do rannóga ar leith den doiciméadacht. Buíochas le Bob Simons, a bhí ag iarraidh seo ar feadh na mblianta.
    * NUA:ERDDAP™Tacaíochtaí anois[Raon feidhme / Glactha-Ranges](https://en.wikipedia.org/wiki/Byte_serving)iarratais ar chodanna de / comhaid / comhaid / comhaid. Bhí sé seo ag teastáil chun tacú leis an lucht féachana fuaime agus físe i brabhsálaithe.
    * DO: Anois, slándáil a fheabhsú, má shonraítear tú&lt;cliceáil grianghraf a mhéadú (agus dá bhrí sin tacaíochthttps) , an bhratach molta Is UrlhttpsURL le bratach níos slánKey. Más amhlaidh, beidh aon bratachUrls / bradaíl roimhe seo neamhbhailí. Riarachán: Má bhaineann na hathruithe seo le do chuid féinERDDAP™agus má tá doERDDAP™Tá séEDDGridÓ Erddap agus EDDTable Ó Erddap ar a síntiús a iargúltaERDDAPs, ansin, tar éis duit cothrom le dátaERDDAP, doERDDAP™beidh iarracht go huathoibríoch chun síntiús a íoc leis an flagUrl nua, mar sin ba chóir duit a scriosadh na síntiúis d'aois agus na síntiúis nua a bhailíochtú nuair a gheobhaidh tú na ríomhphoist bailíochtaithe síntiús nua.
    * Chun a dhéanamh:ERDDAP™Tá séEDDGridAs Erddap tacar sonraí le haghaidh erdVH3 tacar sonraí ar chósta BobERDDAP™, le do thoil iad a athrú chun tagairt a dhéanamh do na tacair sonraí nua erdVH2018.
    * DO DO: Má tá aon cheann de na tacair shonraí samplacha jplAquariusSSS i doERDDAP™, le do thoil athrú "V4" sadatasetID's go dtí "V5".
    * DO DHÉANAMH:actual\\_rangeIs anois CF tréith chaighdeánach (as CF-1.7) agus deir go soiléir go má úsáideann an athrógadd\\_offsetagus/nóscale\\_factora phacáil na luachanna sonraí, ansin anactual\\_rangeBa cheart go n-úsáidfeadh na luachanna an cineál sonraí neamhphacáilte agus go mbeadh siad ina luachanna neamhphacáilte. Ar an drochuair, tá na coinbhleachtaí seo lenár gcomhairle roimhe seo. Sonraí a ghiniúint Xml anois unpacks pacáilteactual\\_rangeluachanna, ach ní bheidh a shocrú tacair sonraí atá ann cheana féin i dodatasets.xmlcomhad.
        
Mar sin, seiceáil do thacair sonraí: má tá athróg luachanna pacáilte agus más rud éactual\\_rangeTá sé sonraithe mar luachanna sonraí pacáilte, cuir le do thoil&lt;addAttributesúactual\\_rangeluach a shonrú na luachanna unpacked. Seachas sin, ní bheidh an tacar sonraí a luchtú iERDDAP. Is bealach simplí agus beagnach foirfe chun é seo a dhéanamh chun cuardach a dhéanamh dodatasets.xmldo foinse Tréithe go bhfuil
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
agus ascale\\_factorseachas 1.0. Is iad sin anactual\\_rangetréithe a d'fhéadfadh a bheith agat a shocrú.
        
Do athróga ais iEDDGriddatasets,ERDDAP™Leagann i gcónaí ar anactual\\_rangetréith a bheith ar an raon iarbhír de na luachanna ó fhios aige na luachanna.
        
Do athróga ais le luachanna anuas (e.g., roinnt athróg domhanleithead) ,ERDDAP™cruthaitheactual\\_rangeleis an\\[0 0\\]...\\[deireanach\\]luachanna, a bhí ard... íseal. Anois úsáideann sé i gcónaí íseal... luachanna ard a dhéanamh ar an sainmhíniú CF nua.
        
An cruinneas anactual\\_rangeTá luachanna thar a bheith tábhachtach do thacair sonraí EDDTable, mar gheall arERDDAP™a dhiúltú go tapa iarrataí úsáideora do luachanna sonraí atá níos lú ná anactual\\_rangeluach íosta nó atá níos mó náactual\\_rangeluach uasta.
        
Related: an iarbhír\\_min, iarbhír\\_max,data\\_minagusdata\\_maxtréithe atá dímheasta anois. Tiontaigh do thacair sonraí le húsáidactual\\_rangeina ionad sin.
        
    * ARNA DHÉANAMH (roghnach, ach molta) : I gcás gach in aice-réadach-am agus tacar sonraí réamhaisnéis i doERDDAP™, cuir [ le do thoil&lt;testOutOfDateú (/ disciplíní / sonraí #testoutofdate) tag le luach san fhoirmnow-Gan catagóir, e.g.,now-2 lá. Má tá an t-uasluach ama don tacar sonraí níos sine ná an luach sin, meastar go bhfuil an tacar sonraí as dáta agus beidh sé marcáilte mar sin ar[outOfDateDatasets.html](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)leathanach gréasáin. Soláthraíonn sé seo ar bhealach éasca chun tú a fheiceáil nuair a bhíonn rud éigin mícheart le foinse tacar sonraí ar.
    *   [NUA: Markup Semantic de Datasets le json-ld (JSON Sonraí Nasctha) ](/docs/server-admin/additional-information#json-ld)  
        ERDDAP™úsáidí anois[taiseachas aeir: fliuch (JSON Sonraí Nasctha) ](https://json-ld.org)a dhéanamh do chatalóg sonraí agus tacar sonraí chuid den[web development](https://en.wikipedia.org/wiki/Semantic_Web), a bhfuil smaoineamh Tim Berners-Lee chun ábhar gréasáin a dhéanamh níos inléite meaisín agus meaisín "thuiscint". inneall cuardaigh ([Google go háirithe](https://developers.google.com/search/docs/data-types/datasets)) agus is féidir uirlisí shéimeantach eile a úsáid an mharcáil struchtúrtha chun fionnachtain agus innéacsú a éascú. Is cosúil go bhfuil an marcóir struchtúrtha json-ld mar dofheicthe-le-dhaonna&lt;scripteanna cód ar an http://.../erddap/info/index.html web development (a bhfuil gréasáin shéimeantach[Sonraí Teagmhála](https://schema.org/DataCatalog)) agus ar gach http://.../erddap/info/_datasetID_/index.html web development (a bhfuil gréasáin shéimeantach[Toradh na sonraí](https://schema.org/Dataset)) . (Buíochas speisialta le Adam Leadbetter agus Rob Fuller of the Marine Institute in Ireland as na codanna crua den obair a dhéanamh chun an chuid seo a dhéanamhERDDAP.) 
    * NUA: Tá cineálacha nua tacar sonraí ar féidir leo sonraí a léamh ó chomhaid fuaime:
        [EDDGridAmharc ar gach eolas](/docs/server-admin/datasets#eddfromaudiofiles), a dhéileálann le sonraí fuaime mar shonraí greilleáilte.
        [EDDTableFrom AudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), a dhéileálann le sonraí fuaime mar shonraí sonraí tabular. A bhuíochas le Jim Potemra, Rich Signell, OOI, agus Carrie Wall Bell le haghaidh iarrataí ar fuaime / tacaíocht comhad hidreafón.
    * Athruithe ar GenerateDatasets XLUMX (agus athruithe gaolmhara) :
        * NUA:ERDDAP™anois tá córas go huathoibríoch[URLanna a thabhairt cothrom le dáta](/docs/server-admin/additional-information#out-of-date-urls)an dá i GenerateDatasets Xml agus nuair a luchtú tacair sonraí. Má tá tú moltaí do URLanna breise ba chóir a ghabháil agus a thabhairt cothrom le dáta, nó má cheapann tú ba chóir é seo a iompú isteach i seirbhís (cosúil leis na Tiontaire) , le do thoil ríomhphosterd.data at noaa.gov.
        * NUA: Anois, más rud é GenerateDatasets Xml Feiceann CFstandard\\_name  (ba chóir go mbeadh gach cás níos ísle) le carachtar uachtair, cuireann sé an leagan ar fad níos ísle a&lt;addAttributesú. Chomh maith leis sin, nuair a ualaí tacar sonraí, más rud éERDDAP™Feiceann CFstandard\\_namele carachtar uachtair, athraíonn sé go ciúin é leis anstandard\\_name. Buíochas le Rich Signell.
        * NUA: Anois, más rud é GenerateDatasets Feiceann Xml tréith le ham nach bhfuil i bhformáid ISO 8601, cuireann sé an t-am ISO 8601 formáidithe chun&lt;addAttributesú. Más rud éERDDAP™Ní aithníonn an fhormáid, fágann sé an luach ama gan athrú. Má fheiceann tú formáid goERDDAP™Ní aithníonn agus a shocrú, le do thoil ríomhphost é aerd.data at noaa.gov.
        * Molta: An cód leibhéal íseal donEDDGridSeirbhís do Chustaiméirí Rogha Catalóg i GenerateDatasets Xml ag brath anois arUnidatacód crawler catalóige (threds. cineál gas: in airde) ionas gur féidir é a láimhseáil gach catalóga THREDDS (is féidir a bheith casta ionadh) . A bhuíochas le Roland Schweitzer chun an t-athrú seo a mholadh agus a bhuíochas sin doUnidatadon chód.
        * NUA: Géiniteacha Xml doEDDGridFromDap Cuireann anois ", startyear-Endyear" go deireadh an teideal bunaithe ar luachanna ais ama iarbhír. Deireadh = "ionad" má tá sonraí sa 150 lá anuas.
        * NUA: Géiniteacha Xml doEDDGridCuireann FromDap anois ",\\[resolution\\]° " go dtí an teideal má tá an tacar sonraí spásáilte go cothrom agus mar an gcéanna le haghaidh lat agus lon.
        * IMPROVED: Tá gnéithe breise ag an tiontaire ama anois, go háirithe an cumas chun amanna teaghrán a thiontú i réimse leathan formáidí coitianta i dteanntáin ISO 8601 nó i líon UDUnits-comhoiriúnach. Gach gnéithe tacaíocht roimhe seo ar aghaidh ag obair, gan athrú.
        * BUG FIX: Giniúint Sonraí Xml agus an tiontaire Keywords san áireamh anois "Earth Science ^ " ag tús na n-imeachtaí GCMD Eolaíocht. Nuair a bhíonn tacar sonraí luchtaithe iERDDAP™,ERDDAP™Socraíonn anois aon eochairfhocail GCMD i na heochairfhocail tréith nach bhfuil tús a chur le "Eolaíocht Earth × " nó a úsáid rud ar bith seachas cás teideal (áit a bhfuil an chéad litir de gach focal caipitlithe) .
        * IMPROVED: Nuair a mholadh&lt;destinationNamecliceáil grianghraf a mhéadú Xml do EDDTableFromAsciiFiles úsáid ach an deireadh eireaballsourceNames le'/'  (Bhí roinnt ainm comhaid-mhaith) . Anois úsáideann sé ar fadsourceName(e.g., "blahblahblah (m/s)". Beidh an t-athrú seo go maith do roinnt tacar sonraí agus ní do dhaoine eile, ach tá sé níos sábháilte iompar. A bhuíochas le Maurice Libes.
        * BUG FIX: Giniúint Sonraí Xml agus na tógálaithe tacar sonraí a chinntiú anois nach bhfuil aon dúblach ainmneacha colún. A bhuíochas le Maurice Libes.
        * BUG FIX: Giniúint Sonraí Níor scríobh Xml do EDDTableFromAsciiFiles&lt;colún scartha leis an aschur. Anois a dhéanann sé. A bhuíochas le Maurice Libes.
    * NUA: An uirlis DasDds priontaí anois amach faisnéis bhearna ama (an[.timeGaps faisnéis](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)) má tá an tacar sonraí socraithe.
    * NUA: Ard Cuardaigh Glacann anois "anois_\\-nUnits_" luachanna ama. Buíochas le Rich Signell.
    * IMPROVED: Chun slándáil a fheabhsú, nuair a dhéantar seoladh ríomhphoist i meiteashonraí nó sonraí a scríobh chuig leathanach gréasáin html, cuirtear " ag "@" in ionad ". Seo gabhálacha ach seoltaí ríomhphoist go bhfuil na meiteashonraí ar fad nó luach sonraí, ní seoltaí ríomhphoist leabaithe i luachanna níos faide.
    * IMPROVED: Chun slándáil a mhéadú, anRSSTá faisnéis le haghaidh tacair sonraí príobháideacha ar fáil anois ach d'úsáideoirí (agusRSSléitheoirí) atá logáilte isteach agus údaraithe a úsáid go tacar sonraí.
    * NUA: Anois, nuair a bhíonn tacar sonraí luchtaithe, más rud édate\\_created,date\\_issued,date\\_modified, nó dáta tá luach ama nach bhfuil i bhformáid ISO 8601,ERDDAP™athruithe sé go dtí an t-am ISO 8601 formáidithe. Más rud éERDDAP™Ní aithníonn an fhormáid, fágann sé an luach ama gan athrú. Má fheiceann tú formáid goERDDAP™Ní aithníonn agus a shocrú, le do thoil ríomhphost é aerd.data at noaa.gov.
    * Molta: .dods freagraí óEDDGridBa chóir go mbeadh tacair sonraí i bhfad níos tapúla anois. Buíochas le Rich Signell.
    * Athruithe gaolmharaERDDAP's chruthú ISO 19115 doiciméid:
        * BUG FIX: nuair a chruthú ISO 19115 doiciméid,dataVariableNí raibh aonaid HTML ómós ionchódaithe agus faoin gcéad ionchódaithe. Anois tá siad. A bhuíochas le NGDC s ISO 19115 bailíochta.
        * BUG FIX: nuair a chruthú ISO 19115 doiciméid,date\\_createda bhí in úsáid mar atá, mar sin go minic a bhí an fhormáid mícheart. Anois tá sé thiontú go ISO 8601 Z teaghrán. A bhuíochas le NGDC s ISO 19115 bailíochta.
        * BUG FIX: nuair a chruthú ISO 19115 doiciméid,ERDDAP™anois dátaí scríobh níos faide le bliain =00 (mar atá le tacar sonraí climatology) , toisc nach bhfuil an scéimre ISO 19115 cheadú dátaí le bliain =00. A bhuíochas le NGDC s ISO 19115 bailíochta.
    * NUA: Mar a tharla roimh iarratashttp.../Beidh a bhaint/leagan ar ais ach an uimhir leagan (mar téacs) , e.g., "ERDDAP\\_version = 1.82".
Anois, iarraidhhttp.../aerddap/version\\_string beidh uimhir agus iarmhír roghnach de '\\_' móide téacs ASCII (aon spásanna nó carachtair a rialú) , e.g., "ERDDAP\\_version\\_string = 1.82\\_JohnsFork). Beidh na daoine ag déanamh an forc a shonrú seo ag athrú EDStatic.erddapVersion. An bealach seo a dhéanamh nach bhfuil sé ina chúis le fadhbanna do leaganacha roimhe seo deERDDAP. Buíochas le Axiom (go háirithe, Kyle Wilcox) agus Institiúid Mara na hÉireann (go háirithe, Rob Fuller) .
    * BUG FIX: Do leagan wms = 1.3.0, iarraidh =GetMap, crs = EPSG: 4326 (Ní CRS:84) iarratais: ní mór an t-ordú bosca a bheith minLat,minLon,maxLat,maxLon. I gcás CRS:84 iarrataí, mar a bhí roimhe, ní mór d'ordú bbox a bheith minLon,minLat,maxLon,maxLat. D'fhéadfadh sé seo a shocrú ag baint úsáide asERDDAP'sWMS1.3.0 seirbhíse iArcGIS  (a bhuíochas sin do Paola Arce) . Go raibh maith agat (taiseachas aeir: fliuch) go dtíOGCchun é seo a dhéanamh chomh casta. Go raibh maith agatLeafletle haghaidh láimhseáil seo i gceart agus chun a thabhairt dom ar bhealach a thástáil seo.
    * IMPROVED: roimhe seo, an nasc molta doRSSagus tá síntiúis ríomhphoist anhttpURL do doERDDAP. Is maith liom éhttpsURL, má tá sé sin gníomhach.
    * NUA:EDDGridCóip Tacaíonn anois le tag roghnach&lt;cliceáil grianghraf a mhéadú&lt;/ amháin Since ^, áit a bhfuil an luach ar leith ISO-8601-formáidithe am nónow-Níl sé seo (e.g.,now-2years) am. Féach an[ach amháin An doiciméadú](/docs/server-admin/datasets#onlysince). Buíochas le Drew P.
    * Molta: Má tá sé ar fáil,ERDDAP™a thaispeáint ar anhttpsURL (ó&lt;baseHttpsUrl ×, más ar fáil) in ionad anhttpURL nuair a insíonn sé úsáideoirí an URL a chur / leitheadach / bhaint / liostáil síntiús.
    * BUG FIX:ERDDAP™anois ligeann gníomh síntiús chun tús a chur le " https://" . (Bob slaps a forehead.) A bhuíochas le Jennifer Sevadjian.
    * BUG FIX:.jsonlKVPanois úsáidí ':' idir gach eochair agus luach, in ionad'='. (Bob slaps a forehead.) Buíochas le Alexander Barth.
    * BUG FIX: Roimhe seo, má tá tú atosaitheERDDAP™le quickRestart = fíor, agus más rud é, sular athluchtaíodh an tacar sonraí de ghnáth, rinne tú glaoch ar EDDTableFromFiles tacar sonraí a úsáidtear updateEveryNMillis, agus má bhí comhad sonraí a athrú díreach, bheadh an t-iarratas theipeann le earráid pointeoir null. Anois éireoidh leis an iarratas. Go raibh maith agat le John Kerfoot.
    * NUA: Nuair a bhíonn tacar sonraí luchtaithe iERDDAP™, na heochairfhocail athshocrú anois in ord sórtáilte agus aon carachtair nua-líne a bhaint.
    * Molta: Anois, más rud é .geoJson,.jsonnó.ncTá iarratas oJson.jsonp paraiméadar, Is é an cineál Mime freagra iarratas / javascript. Tabhair faoi deara go.jsonp nach bhfuil tacaíocht.jsonlCSVnó.jsonlKVP, ós rud é nach mbeadh sé ag obair. Go raibh maith agat le Rob Fuller.
    * IMPROVED: Is é an cineál Mime do línte json roghanna comhad anois "iarratas / x-jsonlines". Bhí sé i bhfeidhm / jsonl. Faoi láthair, níl aon rogha ceart cinntitheach.
    * IMPROVED: Beidh líon na n-iarratas theip a thaispeántar ar an leathanach status.html méadú mar gheall ar rudaí níos mó a chomhaireamh mar teipeanna ná roimh, m.sh., ClientAbortException.
    * FÓGRA: Anois, má tá freagra óERDDAP™nach bhfuil comhbhrúite, ansin beidh an header na freagartha san áireamh "Content-Encode" = "aitheantas".
    * Molta: Ní raibh an "ceadú" tréith ag teastáil. Anois, más rud é nach bhfuil sé sonraithe, an standardLicense ó teachtaireachtaí.xml (nó ó thus.xml má tá sé i láthair) a úsáidtear mar an réamhshocraithe.
    * NUA: Tá roghnach anois[comhad AccessSuffix tréith](/docs/server-admin/datasets#fileaccessbaseurl). is féidir a úsáid leis an láthair[cliceáil grianghraf a mhéadú](/docs/server-admin/datasets#fileaccessbaseurl).
    * IMPROVED: Chun slándáil a mhéadú, tiomsaíodh an leagan seo leis na déanaíJavaJDK v8u162.
    * NUA: Chun slándáil a mhéadú, roinnt fearainn coitianta a thairgeann seoltaí ríomhphoist sealadacha (e.g., @mailinator.com) go bhfuil siad anois ar ríomhphost buan blacklist do chóras síntiúis.
    * NUA: Chun slándáil a mhéadú, áirítear na hardies sa Tuarascáil Laethúil anois:
Socraigh Sonraí Seoladh Bratach IP Failed (ós rud é an tuarascáil seo caite)   
Socraigh Sonraí Seoladh Bratach IP Failed (ó thús)   
Socraigh Sonraí Seoladh Bratach IP (ós rud é an tuarascáil seo caite)   
Socraigh Sonraí Seoladh Bratach IP (ó thús)   
An "Failed" tallies lig tú a fheiceáil (hacker?) ag iarraidh a shocrú bratach, ach tá ag teip.
    * Molta: Chun slándáil a mhéadú, seoltaí ríomhphoist sa&lt;Síntiús don Liosta Dubhdatasets.xmla mheastar anois a bheith cás-íogair.
         

## Leagan 1.80{#version-180} 
 (a scaoileadh 2017-08-04) 

*    **Gnéithe Nua (d'úsáideoirí) :**   
     
    * Baile Átha CliathorderByCount () scagaire ligeann duit a shonrú conas a bheidh an tábla torthaí a shórtáil (nó nach bhfuil) agus tuairisceáin ach sraith amháin do gach grúpa saghas, leis an líon na neamh-missing-luachanna do gach athróg.
Mar shampla,orderByCount (" " "stationID" " ") Beidh sórtáil agstationIDagus ar ais sraith amháin do gachstationID, le comhaireamh ar líon na neamh-fhostú-luachanna do gach athróg.
Má tá tú a shonrú achorderByCount ("") , beidh an freagra ach amháin as a chéile leis an líon neamh-fhostú-luachanna do gach athróg sonraí.
Féach an[orderBy... doiciméadú](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy)Go raibh maith agat chun Ben Adams.
    * Baile Átha Cliath.nccomhad oJson Rogha Cineál le haghaidh tacar sonraí gridded agus tabular. Déanann an rogha seoNCOlvl = 2 "pedantic" JSON comhad le gach ceann de na faisnéise le fáil de ghnáth i.nccomhad. Féach ar[ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json)Buíochas le Charlie Zender.
    * BUG FIX: An bhfuilorderBy... () roghanna ar an Déan A Graph leathanach gréasáin a láimhseáil anois i gceart.
    * BUG FIX: .geoJson aschur nach bhfuil anois sraitheanna a phriontáil ina bhfuil na luachanna lat nó lon ar iarraidh. Chomh maith leis sin, luachanna airde (má tá tú ar fáil) san áireamh anois sna comhordanáidí, ní mar luachanna sonraí. Buíochas le Jonathan Wilkins.
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:**   
     
    * SECURITY ISSUE: Na prótacail.js leabharlann a úsáidtear le haghaidh anOpenLayerstaispeántas ar anWMSleathanaigh iERDDAP™Tá amach-de-dáta agus tá fabht a d'fhéadfadh a ligeann sé a bheith mí-úsáid. (Ar an drochuair, cothrom le dátaOpenLayersagus prótacail. nach bhfuil js éasca.) A osclaíonn suas an fhéidearthacht go bhféadfaí an leabharlann a chur ar bun chun ligean leochaileacht tras-site. Mar sin féin, óERDDAP™úsáidí amháinOpenLayersar bhealach réamh-shocrú ar leith agus gan ach le sonrachaERDDAP-bunaithe foinsí sonraí, creidimid nach bhfuil aon leochaileacht tras-site iERDDAP's use ofOpenLayersagus prótacail.js. Mar sin féin, mura gcreideann tú é seo, is féidir leat úsáid anOpenLayerstaispeántas ar anWMSleathanaigh de doERDDAP™ag cur
```
        <openLayersActive>false</openLayersActive>  
```
le do comhad thus.xml. Is é an mhainneachtain "true". Buíochas le Charles Carleton agus NCEI.
    * SECURITY CHANGES: Unused.comhaid jar agus dúblach. (toisc go bhfuil siad chomh maith i netcdfAll.jar) curtha as anERDDAP™dáileadh. Tá comhaid lasmuigh den dáta .jar tugtha cothrom le dáta. Buíochas le Charles Carleton agus NCEI.
    * ATHRÚ SLÁNDÁLA: An comhad netcdfAll.jar dháileadh leERDDAP™Is é an leagan is déanaí (4.6.10 faoi láthair) , ach tá sé fós Jackson inmheánach .jar comhaid ar a dtugtar a bheith amach-de-dáta agus tá leochaileachtaí slándála, go háirithe na leabharlanna Jackson a úsáidtear ach amháin nuair a rochtain Amazon S3 foinsí sonraí. Mura bhfuil rochtain agat ar shonraí trí Amazon S3 (go mbeadh a fhios agat má bhí tú) , nach bhfuil na leochaileachtaí ábhartha.
        
Coinníonn na forbróirí netcdf-java nach bhfuil na leochaileachtaí seo ábhartha mar gheall ar an mbealach a úsáideann an cód netcdf na leabharlanna seo agus ní bheadh siad ábhartha ach amháin nuair a bhíonn Amazon S3 á rochtain. Féach ar[ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866). Creidim iad. Má tá imní ort faoi seo fós, déan teagmháil leis na forbróirí netcdf-java. (Tabhair faoi deara más rud é nach gcreideann tú na forbróirí netcdf-java agus nach bhfuil ag smaoineamh ag baint úsáide asERDDAP™mar gheall ar seo, ní ba chóir duit a úsáid THREDDS ceachtar, toisc go n-úsáideann THREDDS netcdf-java níos bunúsaí agus níos fairsinge náERDDAP.) 
        
Sonraí: Is iad an cód troublesome agus na rabhaidh leochaileacht:
glancdfAll-déantóir. jar / META-INF / com.fasterxml.jackson.core / databind / pom.xml
Féach ar https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Ard-luas
glancdfAll-nochtadh. jar / META-INF / c.opterxml.
Féach ar https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Ard-luas
glancdfAll-nochtadh. jar / META-INF / c.fasterxml.jackson.core / jackson-nótaí / pom.xml
Féach ar https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Ard-luas
Féach ar https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Critical
cliceáil grianghraf a mhéadú
Féach ar https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Ard-luas
Féach ar https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Critical
"Le haghaidh leagan 4.6.10, aws-java-sdk-lárnach pulls i leagan 2.6.6 de Jackson-\\ * artifacts." (ríomhphost chuig netcdf-java daoine) .
Buíochas le Charles Carleton agus NCEI.
        
    * ATHRÚ CUIDEACHTAÍ: Má tá tú recompileERDDAP™, faoi deara go bhfuil an paraiméadar classpath -cp ag teastáil le haghaidh an líne ordú anois i bhfad níos giorra ná riamh. Féach an leagan nua -cp i[an doiciméad seo](/docs/contributing/programmer-guide#development-environment). Buíochas le Charles Carleton agus NCEI.
    * OPTION NUA i Géiniteacha Xml: EDDTableFromBcodmo, atá díreach le húsáid inmheánach ag BCO-DMO.
Buíochas le Adam Shepherd agus BCODMO.
    * NUA ATTRIBUTE agus FEATURE: Má tá ainm comhaid de chomhaid inrochtana gréasáin ag colún EDDTable (e.g., íomhá, físeán, nó comhaid fuaime) , is féidir leat a chur
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
a shonrú ar an URL bonn (dar críoch le /) ag teastáil a dhéanamh ar an ainm comhaid i URLanna iomlán. Ansin le haghaidh.htmlTableminicíocht uisce: flúirseachERDDAP™Beidh a thaispeáint ar an ainm comhaid mar nasc chuig an URL comhcheangailte (an bonn Url móide an ainm comhaid) .
Más mian leatERDDAP™chun freastal ar na comhaid ghaolmhara, a dhéanamh ar leith EDDTableFromFileNames tacar sonraí do na comhaid (d'fhéadfadh sé a bheith ina tacar sonraí príobháideach) .
Buíochas le Adam Shepherd agus BCODMO.
    * ATHBHREITHNIÚ NUA ATTRIBUTE: Má tá ainm comhaid de chomhaid inrochtana gréasáin ag colún EDDTable (e.g., íomhá, físeán, nó comhaid fuaime) atá inrochtana trí chartlann (e.g.,.zipcomhad comhad) inrochtana trí URL, úsáid
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
a shonrú ar an URL don chartlann.
Más mian leatERDDAP™chun freastal ar an comhad cartlainne, a dhéanamh ar leith EDDTableFromFileNames tacar sonraí don chomhad (d'fhéadfadh sé a bheith ina tacar sonraí príobháideach) .
Buíochas le Adam Shepherd agus BCODMO.
    * FEABHSAITHE do Gindatasets Xml chun na cúiseanna neamhbhailí/bad a bhaint&lt;subsetVariables× moltaí agus ainmneacha athróg molta dúblach / Bad, etc. Buíochas le Rich Signell, Adam Shepherd, agus BCO-DMO.
    * OPTION NUA: An t-eolas teorann polaitiúil a dháileadh leERDDAPó thríú páirtí agus beagán as dáta. Chomh maith leis sin, tá teorainneacha faoi dhíospóid ag roinnt áiteanna ar fud an domhain, áit a mbeidh daoine éagsúla smaointe éagsúla faoi cad atá ceart. DA dTAGARTAR SAN ORDU ROIMHE SEOERDDAP. Mura bhfuil tú cosúil leis an t-eolas teorann polaitiúil a thagann leisERDDAP™, is féidir leat a insint anoisERDDAP™a tharraingt riamh teorainneacha polaitiúla trí chur leis
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
le do comhad thus.xml. Is é an mhainneachtain "true". Go raibh maith agat le Raju Devender.
    * TAG NUA METADATA: I andatasets.xmlle haghaidh tacar sonraí, is féidir leat a shonrú anois ar an líon réamhshocraithe de dath Rannóga barra le haghaidhdataVariablear graif agus léarscáileanna le
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (réamhshocraithe = 1, a deir a ligeanERDDAP™cinneadh a dhéanamh) . Féach an[dath bláth bándearg Suíomhanna Bar](/docs/server-admin/datasets#color-bar-attributes).
    * Molta: bhí an dath teorann stáit ar léarscáileanna corcra (Deep Corcra ar do shon Boomers leanbh) . Anois tá sé liath (i idir an teorainn náisiúnta liath agus an talamh liath) .
    * BUG FIX:&lt;iso19115File bhéil agus&lt;fgdcFile ×datasets.xmlNí raibh láimhseáil i gcónaí i gceart. Anois tá siad. Buíochas le BCO-DMO.

## Leagan 1.78{#version-178} 
 (scaoileadh 2017-05-27) 

*    **Gnéithe Nua (d'úsáideoirí) :**   
     
    *    (cineál gas: in airde)   
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:**   
     
    * IMPROVED: Is é an t-ordú na línte i "Major LoadDatasets Sraith Am" ar an leathanach status.html anois newest ar barr go dtí sine ag bun.
    * BUG FIX:ERDDAP™scríobhann anois.nccsvcomhaid leis an athróg ama aractual\\_rangemar am ISO-8601 String. Sin a shocraíonn an fabht le EDDTableFromErddap parsing info ó tacar sonraí iargúlta agus ón gcomhad tapaidhRestart do gach EDDTableFrom...Files datasets. (An t-amactual\\_rangebeidh a bheith mícheart an chéad uair na hualaí tacar sonraí i v1.78 ach ceart tar éis é a athluchtú, m.sh., má bratach tú an tacar sonraí.) 

## Leagan 1.76{#version-176} 
 (a scaoileadh 2017-05-12) 

*    **Gnéithe Nua (d'úsáideoirí) :**   
     
    * CHANGE in Tomcat: Le haghaidh iarrataí arERDDAP™ag teacht ó bhogearraí seachas brabhsálaithe gréasáin (e.g.,curl, R,Matlab,Python,Java) :
Mar is amhlaidh le hathruithe roimhe seo i leaganacha de Tomcat (na bogearraí leibhéal níos ísle a ritheannERDDAP) ó thús 2016, ní mór níos mó agus níos mó de na carachtair sa chuid cheist den URL iarrata a bheith[ **Ionchódaithe réasúnta** ](/docs/server-admin/datasets#infourl)ar chúiseanna slándála. Browsers a ghlacadh cúram ionchódú faoin gcéad ar do shon. sin ag baint úsáide asERDDAP™i bhrabhsálaí nach bhfuil tionchar ach amháin má fhaigheann an t-iarratas atreorú chuig eileERDDAP.
    * Molta: Roimhe seo,ERDDAP™cóireáilte **car insurance** níos mó cosúil slánuimhreacha gearr unsigned ná carachtair. Anois déileálann sé leo níos mó cosúil le UCS 1-carachtair-2 (Díroghnaigh gach rud) Stringsa. Féach an[Doiciméid charachtair](/docs/server-admin/datasets#char). A bhuíochas le Aurelie Briand agus an tionscadal Argo.
    * Molta: Roimhe seo,ERDDAP™tacaíocht beag ar fáil **Carachtair Unicode** carachtar thuas #255 i Stringsa. Anois, go hinmheánach,ERDDAP™tacaíocht iomlán 2-byte UCS-2 chars (carachtair uimhir 0 trí 65535) i Stringsa. Nuair a bhíonn sonraí Curtain scríofa le cineálacha comhaid éagsúla,ERDDAP™a dhéanann an chuid is fearr is féidir é chun tacú le 2-byte chars. Sampla eile Is .csv comhaid aERDDAP™scríobhann leis an charset ISO-8859-1 (a 1-byte charset) , mar sinERDDAP™scríobhann aon carachtair os cionn carachtar #255 leis an JSON-mhaith \\u_hhhhhh_ syntax. Féach ar[Sonraí Curtain](/docs/server-admin/datasets#string).
    * IARRATAS: I.nccomhaid scríofa agERDDAP™, athróga char a léiriú mar go mbeidh Strings bhfuil an tréith
         **Táirgí gaolmhara**   
I.nccomhaid a léamh agERDDAP™, athróg char le "\\_Encoding" a léiriú mar Thongs leis an charset sonraithe.
    * MIONTUAIRISC:ERDDAP™tacú le tacaíocht **JSON-mhaith backslash-ionchódú** de charachtair speisialta nuair a shonróidh tú srianta de char agus String athróg. Dá bhrí sin, is féidir leat rud éigin cosúil le &amp; MyString = "\\u20ac" nuair is mian leat sraitheanna de shonraí i gcás ina bhfuil moString = € ós rud é 20ac an leagan hexadecimal an pointe cód le haghaidh an tsiombail Euro. Roinnt foinsí ar an ngréasán a thaispeáint na huimhreacha pointe cód le haghaidh siombailí Unicode, m.sh.,[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode).
    * Molta: Roimhe seo,ERDDAP™tacaíocht theoranta ar fáil **slánuimhir fada** athróg. AnoisERDDAP™go hiomlán tacaíochtaí faide go hinmheánach agus a chuid is fearr nuair a scríobh sonraí fada le cineálacha comhaid éagsúla. Féach an[data recovery](/docs/server-admin/datasets#long). Buíochas le hInstitiúid Mhuirí na hÉireann, Craig Risien, Rich Signell, Christopher Wingard agus OOI.
    * NUA: cineál comhaid aschuir don ghreille agustabledap: **.nccsv** , a dhéanannNetCDF-like, ASCII, CSV comhad go bhfuil freisin gach ceann de na meiteashonraí a bheadh i inchomparáide.nccomhad. Féach an[NCCSV Sonraíocht](/docs/user/nccsv-1.00). Go raibh maith agat le Steve Hankin.
    * NUA: **orderByClosesttaiseachas aeir: fliuch** ligeann duit a shonrú conas a bheidh an tábla torthaí a shórtáil agus eatramh (m.sh., 2 uair an chloig) . Laistigh de gach grúpa saghas, ní choinneofar ach na sraitheanna is gaire don eatramh. Mar shampla,orderByClosest (" " "stationID, am, 2 uair an chloig ") Beidh sórtáil agstationIDagus am, ach ar ais ach na sraitheanna do gachstationIDnuair a deireanachorderBycolún colún colún (am trátha) Is gaire do 2 uair an chloig eatraimh. Níl an Tweet seo ar fáiltabledapchun luachanna a shruthlú in iarraidh eangaí. Is féidir an rogha seo a shonrú trí aontabledapdataset's .html leathanach gréasáin, .graph leathanach gréasáin, agus ag aon URL a ghineann tú féin. A bhuíochas le hInstitiúid Mara na hÉireann agus Líonraí Aigéan Cheanada.
    * NUA: **orderByLimittaiseachas aeir: fliuch** ligeann duit a shonrú conas a bheidh an tábla torthaí a shórtáil agus teorainn uimhir (e.g., 100) . Laistigh de gach grúpa saghas, ní choinneofar ach na sraitheanna chéad 'teorainn'. Mar shampla,orderByMax (" " "stationID, 100 ") Beidh sórtáil agstationID, ach amháin ar ais ar an chéad 100 sraitheanna do gachstationID. Tá sé seo cosúil le clásal LIMIT SQL. Is féidir an rogha seo a shonrú trí aontabledapdataset's .html leathanach gréasáin, .graph leathanach gréasáin, agus ag aon URL a ghineann tú féin. A bhuíochas le hInstitiúid Mara na hÉireann agus Líonraí Aigéan Cheanada.
    * NUA: Dhá chineál comhaid freagartha nua, **.jsonlCSVagus.jsonlKVP** tá siad ar fáil le haghaidh iarrataí ar thacair sonraí greille, tacair sonraí tabular agus go leor áiteanna eile iERDDAP  (e.g. iarrataí ar fhaisnéis faoi thacair sonraí) . Is iad na comhaid JSON Línte comhaid ([ https://jsonlines.org/ ](https://jsonlines.org/)) áit a bhfuil gach líne ar leith JSON réad..jsonlCSVach tá na luachanna i bhformáid CSV..jsonlKVPTá Eochair: Péirí luach. Seasann gach líne ar a chuid féin. Níl na línte faoi iamh i sraith níos mó JSON nó rud. Mar shampla, féach[an t-iarratas samplach](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z). A bhuíochas le Damian Smyth, Rob Fuller, Adam Leadbetter, agus Institiúid Mara na hÉireann.
    * NUA: Tá doiciméadú nua ag cur síos ar[ **Conas teacht ar Shonraí Príobháideacha iERDDAP™trí Scripteanna** ](/docs/user/AccessToPrivateDatasets). Buíochas le Lynn DeWitt.
    * FÓGRA: An méid íosta de na **OpenLayers** Bhí léarscáil 2 céimeanna agus tá sé anois 4 picteilín sonraí. Buíochas le Rusty Holleman.
    * IMPROVED: I roinnt cásanna coitianta, iarrataí lena n-áirítear **léiriú rialta** Beidh srian a phróiseáil i bhfad níos tapúla.
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:**   
     
    *    **SLOW CHÉAD STARTUP:** An chéad uair a thosaíonn tú suas an leagan nua, beidh sé a ghlacadh i bhfad le haghaidhERDDAP™a luchtú gach ceann de na tacair sonraí mar is gá é a ath-léamh gach ceann de na comhaid sonraí foinse (cé go díreach an header le haghaidh comhaid sonraí gridded) . Má fhéachann tú ar na logaí is féidir leat a fheiceáil teachtaireachtaí earráide ag rá "sean / gan tacaíocht feabhsaithe Version" de roinnt comhaid inmheánacha - go bhfuil ceart go leor --ERDDAP™a dhéanamh ar na leaganacha nua de na comhaid inmheánacha. Tabhair othar.
    * GNÍOMH:ERDDAP™anois úsáideann an nua **tréimhse saoil: ilbhliantúil** Ranganna Gaeilge (ar a dtugtar freisin JSR 310) in ionad Joda chun parse amanna Curtain i amanna uimhriúil. Nótaí:
        * Más rud éERDDAP™go tobann tá fadhbanna ag parsing amanna String le haghaidh tacar sonraí áirithe agus dá bhrí sin athraíonn ach an chuid is mó nó gach uair a NaN ar (luachanna in easnamh) , tá an fhadhb beagnach i gcónaí leis an dáta teaghrán formáid ama a shonraigh tú mar an "aonaid" an athróg. Ní mór an córas nua uaireanta teaghrán formáid dáta beagán difriúil.
        * Más rud é nach bhfuil míonna agus laethanta uimhriúla sa teaghráin dateTime 0-padded (e.g., "3/7/2016") , déan cinnte go bhfuil an fhormáid ach M amháin agus d (e.g., "M/d/yyyy", ní "MM/dd/yyyy") .
        * Athrú aon soicind codánach sonraíocht a úsáideann s níos ísle (e.g., na .sss iyyyy-MM-dd'T'H: mm: sss.s) , i gcaipiteal S's, (e.g.,yyyy-MM-dd'T'H: mm: SSSS) .
        *   ERDDAP™a thuilleadh tacaíochtaí dáta teaghrán Formáidí ama le blianta dhá dhigit (taiseachas aeir: fliuch) le haois intuigthe (e.g., 1900 nó 2000) . Chaith gnólachtaí billiúin dollar ag socrú an fhadhb seo i ndeireadh na 1990í. Níor chóir go mbeadh eolaithe ag baint úsáide as dhá bhliain dhigit. Roghnaigh an comhad foinse (s s) trí athrú go 4-digit bliana, ansin úsáid yyy sa dáta Formáid ama.
        * Is féidir leat yyy nó YYY a úsáid (a bhfuilERDDAP™athraíonn go dtí an) go parse 4 blianta dhigit, lena n-áirítear blianta diúltacha, m.sh., -4712 (atá 4713 RC) . A bhuíochas le SeaDataNet, Thomas Gardner, agus BODC.
        * Lean ar aghaidh ag úsáid Z laistigh de fhormáid dateTime a fháilERDDAPa parse am fhritháireamh (e.g., Z, +0200, -08, -0800, -08:30) .
        *    **Bí cinnte go n-úsáideann túJavaleagan 1.8.0\\_21 nó níos airde.** 
        * Clár na dToghthóirí -- Má scríobhann túJavacláir a reáchtáilERDDAP™cód, ní mór duit a bhaint as an tagairt do joda-am. jar sa pharaiméadar cosán ranga.
    * NUA:ERDDAP's[Amharc ar gach eolas uirlis tacar sonraí](/docs/server-admin/additional-information#archiveadataset)Is féidir a chruthú anois[ **Comhaid Mála sé** ](https://en.wikipedia.org/wiki/BagIt). Is féidir NCEI chaighdeánú ar an bhformáid seo. Buíochas le Scott Cross agus John Relph.
    * Molta: Na naisc a íoslódáil an erddap. cogadh ar anERDDAP™leathanaigh ghréasáin anois pointe go **Déan teagmháil linn** . (Tá siad naisc phoiblí, mar sin ní gá duit a bheith páirteach GitHub.) Ciallaíonn sé seo i bhfad níos tapúla íoslódálacha (suas go dtí 12Mb / s i gcoinne 1Mb / s) agus cúpla fadhbanna le íosluchtú. A bhuíochas le Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney, agus Institiúid Mara na hÉireann.
    * Molta: An **status.html leathanach agus an Tuarascáil Stádas laethúil ríomhphost** anois san áireamh "Major LoadDatasets Sraith Am" alt a léiríonn staitisticí faoiERDDAP™mar an deireadh gach ualach mórDatasets do na deireanach 100 mór loadDatasets. A bhuíochas lenár RAID troublesome.
    * NUA: nua, roghnach (ach molta) paraiméadar le haghaidh tacar sonraí EDDTableFromCassandra: [ ** &lt;Déan teagmháil linn ** ] (Teicneolaíocht Faisnéise agus Cumarsáide) . Buíochas le Ocean Networks Ceanada.
    * NUA: Tacaíonn EDDTableFromAsciiFiles anois ** &lt;colún - Iomlán ** paraiméadar. Má neamhní nó "", beidh an rang buille faoi thuairim, mar a bhí roimhe, Seachas sin, beidh an chéad charachtar a úsáid mar deighilteoir colún nuair a léamh na comhaid. Buíochas le Sky Bristol agus Abigail Benson.
    * Nua: an cineál nua tacar sonraí,[ **Seirbhís do Chustaiméirí** ](/docs/server-admin/datasets#eddtablefromnccsvfiles), Is féidir a dhéanamh tacar sonraí trí aggregating[NCCSV .csv comhaid](/docs/user/nccsv-1.00). Go raibh maith agat le Steve Hankin.
    * Molta: **EDDTableFromErddap** úsáidí anois.nccsveolas a fháil ó iargúltaERDDAPs agus do chartlann áitiúil an info meiteashonraí. Cuireann sé seo tacaíocht iomlán do na cineálacha sonraí char agus fada, agus do Unicode (UCS-2) charset do chars agus Teaghrán. A bhuíochas le Rob Fuller agus Institiúid Mara na hÉireann.
    * Molta: EDDTableFromErddap agusEDDGridTacaíocht ó Erddap anois ** &lt;cliceáil grianghraf a mhéadú&lt;/ atreorú ** a deirERDDAP™riamh atreorú an iarraidh chuig an iargúltaERDDAP. Tá an réamhshocraithe fíor. Níl an Tweet seo ar fáilERDDAP™Is príobháideachERDDAP. A bhuíochas le Damian Smyth, Rob Fuller, agus Institiúid Mara na hÉireann.
    * Molta:ERDDAP™gabhálacha anois **iarratais úsáideora cealaithe** luath. AgusERDDAP™anois stoptar síos níos tapúla toisc go stoptar na snáitheanna leibhéal íseal níos tapúla. A bhuíochas lenár RAID troublesome.
    *    **Sonraí a ghiniúint Xml:** 
        * NUA: An EDDType speisialta nua "ncdump" priontaí[Déan teagmháil linn](https://linux.die.net/man/1/ncdump)\\-mhaith printout an header de.nccomhad. Is féidir leat a phriontáil freisin na luachanna sonraí le haghaidh athróg sonraithe (nó cuir isteach "gan aon ní" chun gan aon luachanna sonraí a phriontáil) . Tá sé seo úsáideach mar, gan ncdump tá sé deacair a fhios cad atá i gcomhad agus dá bhrí sin a EDDType ba chóir duit a shonrú le haghaidh GenerateDatasetsXml. Buíochas le Craig Risien, Rich Signell, Christopher Wingard agus OOI.
        * NUA: Do SeaData Sonraí glan:
Nuair is cuí, GenerateDatasets Xml anois a dhéanann comhshó shéimeantach ar leith ag baint úsáide as ceist SPARQL iargúlta: má tá meiteashonraí foinse athróg ar sdn\\_parameter\\_urn, m.sh., sdn\\_parameter\\_urn = "SDN:P01::PSLTZ01", GenerateDatasets Cuirfidh Xml an tréith P02 comhfhreagrach, m.sh., sdn\\_P02\\_urn = "SDN:P02::PSAL". Má tá tacair shonraí agat a úsáideann na tréithe seo, agus má tá doERDDAP's&lt;categoryAttributes× i thus.xml Áirítear sdn\\_parameter\\_urn agus sdn\\_P02\\_urn, beidh úsáideoirí in ann a úsáidERDDAP™Córas cuardaigh Catagóir a chuardach le haghaidh tacar sonraí le luachanna sonracha de na tréithe. Buíochas le BODC agus Alexandra Kokkinaki.
        * IMPROVED: Géiniteacha Xml athruithe anois go leorhttp://tagairtí sna meiteashonraíhttps://nuair is iomchuí.
        * IMPROVED: Géiniteacha Xml iarracht anois chun buille faoi thuairim cruthaitheoir \\_type agus foilsitheoir \\_type.
        * IMPROVED: An athróg sonraí Types molta ag GenerateDatasets Beidh Xml anois beagán níos fearr. Buíochas le Margaret O'Brien, LTER, agus EML.
        * IMPROVED: Géiniteacha Tá Xml níos fearr ag sonrú&lt;cdm\\_data\\_type &amp; gt;, agus a chur leis na tréithe gaolmhara, ag teastáil (m.sh.,&lt;cdm\\_timeseries\\_variables &amp;), ionas gur féidir leat an fhaisnéis sin a sholáthar. Buíochas le Rich Signell.
        * Molta: I Géiniteacha Xml, le haghaidh tacar sonraí EDDTable, an moladh le haghaidh&lt;subsetVariables^ anois i bhfad níos coimeádaí. Go raibh maith agat le John Kerfoot.
        * IARRATAS: Más rud édatasets.xmli gcás sonraí a shonraítearfeatureTypeach ní cdm\\_data\\_type, anfeatureTypea úsáid mar an cdm\\_data\\_type. Buíochas le Rich Signell.
        * BUG FIX: a ghiniúint An tSraith Shinsearach Xml fios anois ar an ceart&lt;dataType × le haghaidh athróg sonraí a bhfuilscale\\_factor,add\\_offsetagus / nó tréithe \\_Unsigned.
    * Molta: Nuair aERDDAP™opens a.ncIs maith liom é **níos giorra** ná tá sé ceaptha a bheith (e.g., ní raibh sé a fháil chóipeáil go hiomlán i bhfeidhm) ,ERDDAP™anois déileálann an comhad chomh dona. Roimhe seo,ERDDAP™luachanna ar ais ar iarraidh le haghaidh aon chuid ar iarraidh den chomhad toisc go bhfuil an t-iompar réamhshocraithe le haghaidh netcdf-java.ERDDAP™úsáidí anois ucar.nc2.iosp.netcdf3.N3header.disallowFileTruncation = fíor; A bhuíochas lenár RAID troublesome agus Christian Ward-Garrison.
    * IMPROVED: déanann an scríbhneoir ISO 19115 úsáid anois **cruthaitheoir \\** , má tá sé i láthair.
    * Molta:ERDDAP™anois úsáideann an glancdf-java v4.6.9 is déanaí is féidir a léamh cineálacha breise **comhaid netcdf-4** . Buíochas le Craig Risien, Rich Signell, Christopher Wingard agus OOI.
    * BUG FIX: a sheachaint dtrioblóid má tá comhaid foinse éagsúla cineálacha sonraí éagsúla le haghaidh athróg ar leith. Buíochas le Roy Mendelssohn agus Eugene Burger.
    * BUG FIX: **Comhshó formáid ama** atá anois níos fearr a chosaint i gcoinne luachanna droch-ama. Buíochas le NDBC.
    * BUG FIX:EDDGridSeirbhís do Chustaiméirí Unpacked Láimhseálann anois luachanna ama le **"míonna ó..." agus "blianta ó..."** i gceart (tríd an mí nó an bhliain a chur incriminteach, gan é a chur leis go ham m.sh., 30days arís agus arís eile) . Buíochas le Soda3.3.1.
    * BUG FIX: díreach i v1.74, **síntiúis** ag teastáil gníomh (e.g.,http://...) , a bhí agus ba chóir a bheith roghnach.
    * BUG FIX:EDDGridSonraí Teagmhála () Ní raibh a chur ar aon tréithe domhanda. Anois a dhéanann sé.
         

## Leagan 1.74{#version-174} 
 (scaoileadh 2016-10-07) 

*    **Gnéithe Nua (d'úsáideoirí) :**   
     
    * Anois, nuair a Liosta tacar Sonraí (Gach, nó ó chuardach) ar taispeáint ar leathanach gréasáin, teidil fada ar taispeáint ar línte éagsúla. Roimhe seo, cuireadh "..." in ionad lár teidil fhada. Buíochas le Margaret O'Brien, LTER, agus EML.
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:**   
     
    * DO: Ar ríomhairí Linux, athrú ar na suímh timeout Apache ionas nach mbeidh iarratais úsáideora am-íditheach timeout (leis an méid is cosúil go minic mar earráid "Proxy" nó "Bad Gateway") . Mar an t-úsáideoir fréimhe:
        
        1. Athraigh an Apachehttpcomhad d.conf (de ghnáth i / srl / srl /httpd/conf/conf/) :
Athrú ar an láthair&lt;Timeout × leagan amach (nó cuir ceann ag deireadh an chomhaid) go 3600 (soicind beag) , in ionad an réamhshocraithe 60 nó 120 soicind.
Athrú ar an láthair&lt;ProxyTimeout leagan leagan (nó cuir ceann ag deireadh an chomhaid) go 3600 (soicind beag) , in ionad an réamhshocraithe 60 nó 120 soicind.
        2. Atosú Apache: / úsáid a bhaint as / ionsú / a mhéadú bláthanna cumhra: cumhráin (ach uaireanta tá sé i eolaire éagsúla) .
        
Buíochas le Thomas Oliver.
         
    * NUA:\\[Treoir do Thuismitheoirí/crua Bhí an t-eolas mícheart nó as dáta
Oibríonn sé seo cosúil leis an eolaire bratach, ach scriosann an leagan cruaFlag freisin gach ceann de na sonraí a leagan i dtaisce. Níl aon URLanna a shocrú cruaFlag. Is féidir é seo a úsáid ach amháin trí chur comhad san eolaire.
crua-earraí Tá bratacha an-úsáideach nuair a dhéanann tú rud éigin a chruthaíonn athrú ar conasERDDAP™léann agus léiríonn na sonraí foinse, mar shampla, nuair a shuiteáil tú leagan nua deERDDAP™nó nuair a rinne tú cineálacha áirithe athruithe ar sainmhíniú tacar sonraí idatasets.xml. Féach ar[an doiciméad seo](/docs/server-admin/additional-information#hard-flag). Buíochas le John Kerfoot agus na grúpaí Argo.
         
    * NUA: Géiniteacha Xml anois tá rogha EDDTableFromEML
a léann cur síos tacar sonraí i Teanga meiteashonraí Éiceolaíochta (EML) comhad, íosluchtú an comhad sonraí a bhaineann, agus gineann smután dedatasets.xmlionas gur féidir leis an tacar sonraí a chur leisERDDAP. Tá freisin ar EDDTableFromEMLBatch a dhéanann an rud céanna do gach ceann de na comhaid EML i eolaire. Oibríonn sé seo go han-mhaith mar a dhéanann EML post den scoth cur síos ar an tacar sonraí agus mar gheall ar KNB agus LTER a dhéanamh ar na comhaid sonraí iarbhír ar fáil.
EML móideERDDAP™D'fhéadfadh a bheith meascán mór, ós rud éERDDAP™d'fhéadfadh a thabhairt d'úsáideoirí rochtain níos dírí ar an saibhreas na KNB agus sonraí LTER agus cabhrú leis na tionscadail freastal ar rialtas na Stát Aontaithe[Rochtain Phoiblí ar Thorthaí Taighde (PARR PARR) riachtanais na gcustaiméirí](https://nosc.noaa.gov/EDMC/PD.DSP.php)trí na sonraí a chur ar fáil trí sheirbhís gréasáin.
Féach ar[an doiciméad seo](/docs/server-admin/EDDTableFromEML). Buíochas le Margaret O'Brien, LTER, agus EML.
         
    * NUA: Géiniteacha Xml anois tá rogha EDDTableFromInPort
a léann cur síos tacar sonraí i gcomhad InPort XML agus iarracht a ghiniúint smután dedatasets.xmlionas gur féidir leis an tacar sonraí a chur leisERDDAP. Cruthaíonn sé seo smután réidh le húsáid de XML le haghaidhdatasets.xml, ach beidh sé a chruthú dréacht garbh maith go bhfuil pointe tosaigh maith le haghaidh eagarthóireacht ag an duine.
Bheadh sé iontach dá mbeadh daoine ag baint úsáide as InPort a dhoiciméadú a gcuid tacar sonraí a úsáid freisinERDDAP™na sonraí iarbhír a chur ar fáil tríERDDAP's seirbhísí gréasáin agus dá bhrí sin freastal ar rialtas na Stát Aontaithe agusNOAA's[Rochtain Phoiblí ar Thorthaí Taighde (PARR PARR) riachtanais na gcustaiméirí](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research)trí na sonraí a chur ar fáil trí sheirbhís gréasáin. Is réiteach é seo a d'fhéadfaí a úsáid anois. (erd.data at noaa.govIs sásta cabhrú leat.)   
Féach ar[an doiciméad seo](/docs/server-admin/datasets#eddtablefrominport). Buíochas le Evan Howell agus Melanie Abecassis.
         
    * Molta:ERDDAP™anois úsáideann netcdf-java 4.6.6.
Le leaganacha níos luaithe, netcdf-java léamh roinnt luachanna líonadh (b'fhéidir, ach i nglancdf-4 comhaid) mar 0. Anois léann sé cuid acu mar an luach líonadh caighdeánach netcdf: -127 do bytes, -32767 do shorts, -2147483647 le haghaidh insí.Unidatadeir go bhfuil an t-iompar nua an t-iompar cuí. Má thosaíonn athróg i tacar sonraí a léiríonn ceann de na luachanna nuair a úsáidtear iad a thaispeáint 0, is féidir leat a chur, m.sh.,
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
leis an athróg araddAttributesa insintERDDAP™chun déileáil leis an luach sin marmissing\\_valueAn bhfuil cuntas agat? Luach. Mar sin féin, i go leor cásanna, ní thabharfaidh an toradh inmhianaithe: 0. Más amhlaidh, a mheas mhodhnú na comhaid leNCOnó athscríobh na comhaid. Gearáin? Déan teagmháil linnUnidata;-)
         
    * A DHÉANAMH: Pailéad Nua Barragrafaíochta
Molaim duit a athrú go léir tacair sonraí a úsáideann an pailéad OceanDepth a bhaint as an Pailéad nua TopagrafaíochtaDepth, atá cosúil le Topagrafaíocht ach amháin leis na dathanna tumtha, ionas go mbeidh sé oiriúnach do luachanna doimhneacht (dearfach = síos) , in ionad luachanna airde (dearfach = suas) . Is iad na socruithe molta don phailéad seo:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * GNÉITHE NUA: Stringmissing\\_valueagus / nó \\_FillValue
Má Sainmhíníonn athróg Curtain amissing\\_valueagus/nó \\_FillValue,ERDDAP™beidh a bhaint anois na luachanna ó na sonraí agus iad a chur in ionad le teaghrán folamh, ionas go mbeidh luachanna ar iarraidh le feiceáil mar teaghráin folamh, mar atá le tacar sonraí eile iERDDAP. Buíochas le Margaret O'Brien, LTER, agus EML.
         
    * GNÉITHE NUA: Tacaíocht don Times Áitiúla
Is féidir le hathróga ama le sonraí foinse ó Stringsa a shonrú anois crios ama trí "time\\_zone" tréith a eascraíonnERDDAP™na hamanna foinse áitiúil-chrios a thiontú (roinnt in am caighdeánach, cuid acu in am a shábháil ar an Solas) isteach iZuluamanna. Is dócha go bhfuil liosta na n-ainmneacha crios ama bailí comhionann leis an liosta sa cholún TZ i[an tábla seo](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Is é an mhainneachtain "Zulu". Tá criosanna ama coitianta na Stát Aontaithe: US / Hawaii, Stáit Aontaithe Mheiriceá / Alaska, SAM / Saor, US / Montain, US / Arizona, SAM / Lár, SAM / Eastern. Le haghaidh athróg ama le sonraí foinse uimhriúil, is féidir leat a shonrú ar an "time\\_zone" tréith, ach ní mór an luach a bheith "Zulu" nó "UTC". Buíochas le Margaret O'Brien, LTER, agus EML.
         
    * NUA FEATURE: Tacaíonn EDDTableFromAsciiFiles anois le comhaid leathstad-scartha
agus tá sé níos cliste faoi figuring amach an deighilteoir. Buíochas le Margaret O'Brien, LTER, agus EML.
         
    * GNÉITHE NUA: Má tá earráid shuntasach i loadDatasets (mór nó mionaoiseach, m.sh., ar iarraidh nó neamhbhailídatasets.xmldoiciméad) ,ERDDAP™a chur in iúl anois é i status.html, ceart thíos "n Datasets Failed Chun Luchtaigh" mar ERROR: agus a phróiseáildatasets.xml: féach log.txt le haghaidh sonraí.
         
    * GNÉITHE NUA:ERDDAP™Breathnaíonn do dhílleachta.
Nuair a bheidhERDDAP™a dhéanann ualach mór Datasets, tá sé anois le haghaidh tacair sonraí dílleachta (datasets atá iERDDAP™ach ní idatasets.xml) . Má fhaightear, tá siad liostaithe i status.html, ceart thíos "n Datasets Failed Chun Luchtaigh" mar ERROR: n Soicéid Sonraí Orphan (datasets inERDDAP™ach ní idatasets.xml) = ....
Más mian leat a bhaint (díluchtú) dílleachta óERDDAP™, ní mór duit a chur leis
        &lt;cineál tacar sonraí = "_anyValidType_"datasetID= "_theDatasetID_" gníomhach =" False" / ×
go dtídatasets.xmlgo dtí go bhfuil an tacar sonraí díluchtaithe le linn na chéad ualach mór eile.
         
    * BUG FIX: Má bhí athróg lasc ama uimhriúil le haonaid seachas"seconds since 1970-01-01T00:00:00Z"agus leis an&lt;updateEveryNMillis ^ córas gníomhach, socraíodh an t-athróg lasc ama go mícheart nuair a tugadh cothrom le dáta an tacar sonraí. Go raibh maith agat le John Kerfoot.
         
    * BUG FIX: Más rud é&lt;QuickRestart uaire a bhí fíor i thus.xml agus d'iarr tú sonraí ó EDDTableFrom... Comhaid tacar sonraí a úsáidtear&lt;updateEveryNMillis ^, bheadh an chéad iarratas ar an tacar sonraí theipeann, ach bheadh iarrataí ina dhiaidh sin éireoidh. Anois ní theipeann ar an gcéad iarratas. Go raibh maith agat le John Kerfoot.
         
    * BUG FIX: An GenerateDatasetsXml.sh agus .bat Ní raibh ag obair le × 9 paraiméadair ar an líne ordú. Anois a dhéanann siad. Go raibh maith agat le John Kerfoot.
         
    * BUG FIX: Ní raibh an EDDTableFromMultidimNcFiles nua a bhaint go seasta spásanna trailing ó teaghráin. Anois a dhéanann sé. Go suntasach, seo difear comhaid ARGO. Buíochas le Kevin O'Brien agus Roland Schweitzer.
         
    * BUG FIX: Gach rochtain ar iargúltaDAPTá seirbhísí tús anois ag cód níos nua-aimseartha. Socraíonn sé seo an "nasc dúnta" earráid nuair a rochtain ar roinnt tacar sonraí EDDTableFromErddap. Buíochas le Kevin O'Brien.
         
    * BUG FIX: An láimhseáilorderBy... () agus ar leith () anois ar ais go dtí an tslí a bhí siad roimh na hathruithe le déanaí: d'fhéadfadh iarraidh ar leith a bheith ilorderBy... () agus/nó ar leith () scagaire;ERDDAP™beidh iad a láimhseáil san ord atá sonraithe. A bhuíochas le David Karuga.
         
    * BUG FIX: Má tá an tacar sonraí EDDTableFromDatabase agus tá ceist[cliceáil grianghraf a mhéadú](/docs/server-admin/datasets#sourcecanorderby)agus/nó[cliceáil grianghraf a mhéadú](/docs/server-admin/datasets#sourcecandodistinct), ansin d'fhéadfadh an bunachar sonraí (ag brath ar shocruithe idatasets.xml) go páirteach nó go hiomlán láimhseáil **ach an chéad**  orderBy.. () nó ar leith () . A bhuíochas le David Karuga.
         
    * BUG FIX: An breise faoin gcéad-ionchódú déanaí de bharr fadhbanna le roinnt ceisteanna.ncComhaid CF, m.sh., "Stádas HTTP 500 - Earráid Query: athróg = Tá stáisiún liostaithe faoi dhó sa liosta athróg torthaí." Buíochas le Kevin O'Brien.
         
    * BUG FIX: Bhí deacracht ag EDDTableFromFiles athlódáil tacar sonraí nuair a bhí colún fíor char ar cheann de na colúin. Buíochas le Roland Schweitzer.
         
    * BUG FIX:EDDGridSeirbhís do Chustaiméirí Unpacked anois athraíonn freisinmissing\\_valueagus \\_FillValue le luachanna caighdeánach ionas gur féidir comhaid le luachanna éagsúla a chomhiomlánú. Mar gheall ar an athrú seo, tar éis duit an leagan nua seo a shuiteáilERDDAP™, le do thoil a leagtar[crua-earraí Amharc ar gach eolas](/docs/server-admin/additional-information#hard-flag)do gach ceannEDDGridSeirbhís do Chustaiméirí Sonraí Unpacked leagtha i doERDDAP.
         
    * IMPROVED: Is féidir EDDTableFromNcCFFiles láimhseáil anois comhaid a bhfuil sampla éagsúla \\_dimension ar. Ní mór tacar sonraí áirithe a úsáid ach amháin athróga a úsáideann ceann de na sampla \\_dimensions. Buíochas le Ajay Krishnan.
         
    * Molta: Do EDDTableFrom...Files,&lt;cineál Fiosrúchán anois is féidir coma-scartha (molta molta) nó liostaí spás scartha na n-ainmneacha foinse athraitheach. I gceachtar cás, d'fhéadfadh ainmneacha athróg aonair a bheith timpeallaithe ag Sleachta dúbailte, m.sh., má tá spás inmheánach ag an ainm.

## Leagan 1.72{#version-172} 
 (a scaoileadh 2016-05-12) 

*    **Gnéithe Nua (d'úsáideoirí) :** Uimh.
     
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * NUA EDDTableFromMultidimNcFiles[EDDTableFromMultidimNcFiles](/docs/server-admin/datasets#eddtablefrommultidimncfiles)Is rogha eile nua do EDDTableFromNcFiles. Tá sé deartha chun déileáil le grúpaí de chomhaid le hathróga éagsúla le toisí roinnte, m.sh., var1\\[a\\]\\[b\\], var2\\[a\\], var3\\[b\\], scalarVar. A bhuíochas leis an Tionscadal Argo, Aurélie Briand, agus Roland Schweitzer.
    * BUG FIX:ERDDAP™  (trí na ranganna FileVisitorDNLS agus FileVistorSubdir) Seo a leanas naisc siombalach ar Linux anois.ERDDAP™nach bhfuil fós a leanúint .lnk ar Windows.
    * BUG FIX de fabht a tugadh isteach i 1.70: ar leith +orderBynár ceadaíodh le chéile in aon iarratas amháin. Anois tá siad arís. Níl siad comheisiatach / iomarcaíochta. A bhuíochas le David Karuga.
    * CHANGE godatasets.xmlblacklist seoltaí IP:
IP v4 seoltaí le feiceáilERDDAP™mar 4 uimhreacha heicsidheachúlach tréimhse-scartha.
I mo thuairimse, IP v6 seoltaí le feiceáil mar 8 colon-scartha uimhreacha heicsidheachúlach.
Mar sin,ERDDAP™tacaíonn anois le coilíneachtaí sna seoltaí IP sa liosta sin agus :\\* ag deireadh an liosta chun raon seoltaí a bhlocáil.
    * Molta:ERDDAP™anois úsáideann NetcdfFileWriter a scríobh.nccomhaid in ionad an NetcdfFileWrite. Níor chóir go mbeadh aon athrú suntasach ar na comhaid mar thoradh. Osclaíonn sé seo an fhéidearthacht a dhéanamh mór.nccomhaid a úsáideann an.nc3 síntí 64bit. Más mian leat/gur theastaigh uait, seol iarratas chuigerd.data at noaa.gov.
    * IMPROVED: Bhí go leor de na naisc chuig láithreáin ghréasáin iargúlta lasmuigh den dáta. Anois tá siad cothrom le dáta agus úsáidhttps:in ionadhttp: aon uair is féidir.
    * Athruithe beaga go leor.

## Leagan 1.70{#version-170} 
 (a scaoileadh 2016-04-15) 

*    **Gnéithe Nua (d'úsáideoirí) :** Uimh.
     
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** Anseo thíos, tá roinnt athruithe molta ar an doiciméadú i do comhad thus.xml.
Déan na hathruithe seo anois.
Is féidir 30 nóiméad oibre a shábháil tú uair an chloig de mearbhall sa todhchaí.
    * Bug shocrú: Ba í an fhadhb sin iarratais a bhí atreorú chuig iargúltaERDDAPtheip le carachtar neamhbhailí '|' teachtaireacht earráide. Tharla sé seo ach le leaganacha le déanaí de Tomcat. A bhuíochas le Rusty Holleman, Conor Delaney, agus Roy Mendelssohn.
    * Bug shocrú:ERDDAP™anois úsáideann leagan cothrom le dáta de netcdf-java (tá sé ina scéal fada) lena n-áirítear tacaíocht cothrom le dáta do NcML, a shocraíonn an fhadhb le NcML LogicalReduce nach bhfuil ag obair mar súil. D'fhéadfadh roinnt athruithe beaga a bheith ann ar na meiteashonraí aERDDAP™léamha trí netcdf-java ó.nc,.hdf, .grib, agus .bufr comhaid. Buíochas le Favio Medrano.
    * An nua[Naisc ábhartha eile](/docs/server-admin/datasets#eddtableaggregaterows)is féidir leat a dhéanamh le tacar sonraí EDDTable chumasc ó dhá nó níos mó tacar sonraí EDDTable a bhfuil na hathróga sonraí céanna ag baint úsáide as na haonaid chéanna. Go raibh maith agat le Kevin O'Brien.
    * Roghanna nua le haghaidh EDDTableFromDatabase ([cliceáil grianghraf a mhéadú](/docs/server-admin/datasets#sourcecanorderby)agus[cliceáil grianghraf a mhéadú](/docs/server-admin/datasets#sourcecandodistinct)) in iúl duit a shonrú cé acu anERDDAP™, an bunachar sonraí, nó iad araon, láimhseáil ar leith agusorderBy  (agus gach leagan) srianta. A bhuíochas le David Karuga.
    * Is féidir leat a dhéanamh anois graif agus meiteashonraí príobháideacha atá ar fáil don phobal tríd an nua [&lt;graif Accessible Chun críocha poiblí&lt;/ graif atá le feiceáil Chun críocha (Teicneolaíocht Faisnéise agus Cumarsáide) tag. Buíochas le Emanuele Lombardi.
    * Anois, má ritear teaghrán a GenerateDatasets Xml nó DasDds timpeallaithe ag Sleachta dúbailte, tá sé unquoted (mar má tá sé teaghrán JSON) . Buíochas le John Kerfoot agus Melanie Abecassis.
    * Sonraí a ghiniúint Tacaíonn Xml anois le "réamhshocrú" chun an réamhshocraithe a fháil agus "gan aon" chun teaghrán folamh a fháil (oibríonn siad le nó gan Sleachta) . Seo réitíonn roinnt fadhbanna a bhaineann le dul teaghráin folamh.
    * Anois, i GenerateDatasets Xml, do gachEDDGridÓ Fianáin agus EDDTable Soicéid sonraí FromFiles, má tá an sampla FileName shonraigh tú é "" (an teaghrán folamh) , beidh sé a bhaint as an fileName meaitseála deiridh ón eolaire + regex + Athchúrsach = fíor.
    * Nuashonraithe: An cód DisplayInBrowser a úsáidtear chun na torthaí de GenerateDatasetsXml agus DasDds ar ríomhairí Linux a bhí amach-de-dáta agus thug teachtaireacht corr faoi Netscape. Anois, úsáideann sé seo uirlis Linux nua-aimseartha: xdg-oscailt. Buíochas le Melanie Abecassis.
    * An bhfuilallDatasetsTá tacar sonraí anois"files"colún, a léiríonn an URL bonn de na / comhaid nasc (má tá ceann amháin) don tacar sonraí.
    * Méadú ar an slándáil ghinearálta de doERDDAP™ag athrú na ceadanna a bhaineann leis an eolaire tomcat agus an Treoir do Thuismitheoirí mór:
         (Is iad na horduithe iarbhír thíos le haghaidh Linux. I gcás OS eile, a dhéanamh athruithe den chineál céanna.) 
        * Athrú ar an "grúpa" a bheith tomcat, do ainm úsáideora, nó ainm grúpa beag a n-áirítear tomcat agus gach riarthóirí Tomcat /ERDDAP, m.sh.,
Cóipeáil nasc leis an tweet Leabaigh an Tweet .
Cgrp - R Úsáideoir Name Treoir do Thuismitheoirí mór
        * Athruithe ceadanna ionas go tomcat agus an grúpa a léamh, scríobh, pribhléidí a fhorghníomhú, m.sh.,.
cliceáil grianghraf a mhéadú
cliceáil grianghraf a mhéadú
        * Bain ceadanna úsáideora "eile" a léamh, a scríobh, nó a fhorghníomhú:
cliceáil grianghraf a mhéadú
cliceáil grianghraf a mhéadú
Tá sé seo tábhachtach, toisc go gcuireann sé cosc ar úsáideoirí eile ó léamh, b'fhéidir faisnéis íogair iERDDAP™comhaid thus, comhaid logáil, agus comhaid le faisnéis faoi tacair sonraí príobháideacha.
    * Athbheochan an córas fíordheimhnithe / logála isteach. Buíochas le Thomas Gardner, Emanuele Lombardi, agus an rialtas SAM nua[HTTPS-Caighdeán aonair](https://home.dotgov.gov/management/preloading/dotgovhttps/).
        * Baineadh an fíordheimhniú = rogha oscailte. Bhí sé lasmuigh den dáta.
        * An nua, molta,[fíordheimhnithe:google](/docs/server-admin/additional-information#google)úsáidí rogha Google Sign-In (bunaithe ar OAuth 2.0) chun ligean do dhuine ar bith le cuntas ríomhphoist Google (lena n-áirítear cuntais a bhainistiú Google@noaa.gov) a logáil isteach.
        * An nua,[fíordheimhnithe: Ríomhphost](/docs/server-admin/additional-information#email)Is rogha ar ais suas le haghaidh fíordheimhnithe =google. Ceadaíonn sé d'úsáideoirí le&lt;úsáideoir × chlibdatasets.xmla logáil isteach trí iad a sheoladh r-phost le nasc speisialta.
        * I do thus.xml, le do thoil athrú ar an cur síos le haghaidh&lt;fíordheimhnithe bhéil a bheith
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \\[No longer supported: "basic", "openid"\\]
            -->
```

        * I do thus.xml, cuir an ceart seo thíos&lt;fíordheimhnithe ú tag tag
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        * Anois, is féidir le húsáideoirí nach bhfuil logáilte isteach a úsáidhttpnóhttpsURLanna (má tá tú ar bun&lt;baseHttpsUrl . i do thus.xml). A bhuíochas leis an rialtas SAM nua[HTTPS-Caighdeán aonair](https://https.cio.gov/).
        * Anois, is féidir leat a spreagadh gach úsáideoir a úsáidhttps  (taiseachas aeir: fliuchhttp) ag leagan síos&lt;baseUrl × a bheith inahttpsURL. Chun úsáideoirí bhfeidhm a úsáid ach amháinhttps, ní mór duit a dhéanamh freisin athruithe ar do Apache / Tomcat thus chun bloc neamh-httpsrochtain. A bhuíochas leis an rialtas SAM nua[HTTPS-Caighdeán aonair](https://https.cio.gov/).
            
I do thus.xml, le do thoil athrú ar an cur síos le haghaidh&lt;Uirlisí ilchuspóireacha
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        * Na roghanna&lt;Focal faire códú athrú. I do thus.xml, le do thoil athrú ar an cur síos le haghaidh&lt;Focal faire códaithe bhéil a bheith
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        * I do thus.xml, le do thoil athrú ar an cur síos le haghaidh&lt;cliceáil grianghraf a mhéadú
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        * Anois, má tá liosta PríobháideachDatasets = fíor i thus.xml, beidh fiú níos lú eolais a thaispeáint faoi datasets nach bhfuil úsáideoir rochtain a fháil ar.
    * Anois, go háirithe le haghaidh nuair a bhíonn tú ag bunú ar dtús doERDDAP, is féidir leat a insint anoisERDDAP™gan iarracht a dhéanamh síntiús a íoc le iargúltaERDDAP™datasets. Buíochas le Filipe Rocha Freire.
I do thus.xml, ceart roimh&lt;cló Teaghlaigh ×, le do thoil cuir
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    * I do thus.xml, sna treoracha thuas&lt;cuir isteach:
Más féidir, seo a chur ar bun chun nasc slán a úsáid (SSL / TLS) chuig an bhfreastalaí ríomhphoist.
Más rud é nach bhfuil do thus ag baint úsáide as nasc slán leis an bhfreastalaí ríomhphoist, le do thoil a dhéanamh ar na hathruithe a dhéanamh mar sin.
    * I do chuiddatasets.xml, cuir an líne seo leis an tuairisc&lt;Síntiús don Liosta Dubhdatasets.xml:
Is féidir leat an t-ainm a úsáid "\\*" a blacklist fearann ar fad, m.sh.,\\*@example.com .
    * Ós rud é an t-athrú ar an gcóras logála i v1.66, nach bhfuil an comhad logáil cothrom le dáta. Tá i gcónaí teachtaireachtaí nó codanna de theachtaireachtaí ag fanacht le scríobh chuig an comhad logáil. Anois, is féidir leat é a dhéanamh cothrom le dáta (le haghaidh toirt) ag breathnú ar doERDDAP's leathanach gréasáin stádas ag http://_your.domain.org_/erddap/status.html .
    * HashDigest.......
    * Athrú beag (go String2.canonical) gur chóir cabhrú le rudaí a choinneáil ag gluaiseacht go tapa nuairERDDAP™Tá an-ghnóthach agus freisin déileáil níos fearr le líon an-mhór de datasets.
    * Go láidir Molta: stop ag baint úsáide as&lt;Tiontaigh go dtí an tSín idatasets.xmluimhir IP a thiontú i tacar sonraí&lt;sourceUrlú (e.g., http://192.168.#.#/ ) i ainm fearainn (e.g.,http: my.domain.org /) . Ó anois ar, síntiúis nua a http://localhost , http://127.0.0.1 , agus http://192.168.#.# Ní bheidh URLanna a cheadú ar chúiseanna slándála. Mar sin, le do thoil i gcónaí a bhaint as an t-ainm fearainn poiblí i&lt;sourceUrl× chlib (más gá mar gheall ar fhadhbanna DNS) , is féidir leat é a úsáid[/etc / óstáil tábla ar do fhreastalaí](https://linux.die.net/man/5/hosts)chun an fhadhb a réiteach trí ainmneacha fearainn áitiúla a thiontú go uimhreacha IP gan freastalaí DNS a úsáid. Is féidir leat tástáil má fhaigheann ainm fearainn ar leith réiteach i gceart trí úsáid a bhaint
ping _some.domain.name_
    * I Giniúint Sonraí.xml, le haghaidh tacar sonraí iargúlta (e.g., ó fhreastalaí THREDDS) , a ghintear go huathoibríochdatasetIDs gan athrú don chuid is mó fearainn. I gcás roinnt réimsí, an chéad chuid (i.e., an t-ainm) de na a ghintear go huathoibríochdatasetIDBeidh beagán difriúil. Is dócha go bhfuil dhá chuid ag ainmneacha a raibh cuid amháin acu anois. Mar shampla, tacair sonraí ó http://oos.soest.hawaii.edu mar thoradh roimhe seodatasetIDs a thosaigh le hawaii\\_, ach anois mar thoradh ardatasetIDs a thosaíonn le hawaii\\_soest\\_ . Má cúiseanna seo fadhbanna ar do shon, le do thoil ríomhphost chugam. D'fhéadfadh go mbeadh babhta oibre ann.
    * Tugadh suas chun dáta an tiománaí Cassandra go cassandra-tiomáint-lárnach-3.0.0.jar agus dá bhrí sin do Cassandra v3. Ní EDDTableFromCassandra leas a bhaint as aon ghnéithe nua i Cassandra v3. Is féidir innéacsanna i Cassandra a bheith níos casta anois, achERDDAP™fós úsáideann an tsamhail innéacs Cassandra v2, a ghlacann gur féidir colún innéacsaithe a thiomnú go díreach le'='srianta. Sonraí a ghiniúint Xml do EDDTableFromCassandra bhrath a thuilleadh colúin le innéacsanna; má tá innéacs simplí, is gá duit a shonrú idatasets.xmlde láimh. Más gá duit tacaíocht le haghaidh innéacsanna níos casta nó gnéithe nua eile, le do thoil ríomhphosterd.data at noaa.gov.
&#33;&#33;&#33; Má úsáideann tú Cassandra 2.x fós, leanann tú ar aghaidh ag úsáidERDDAP™v1.68 go dtí go uasghrádú tú a úsáid Cassandra 3.x.
    * Jars agus an Classpath -- Beagnach gach ceann de na tríú páirtí san áireamh.
        * Cuireadh slf4j.jar le /lib agus an cosán ranga.
        * joid. jar agus tsik. cuireadh próca as /lib agus an cosán ranga.
        * Má fhaigheann tú teachtaireachtaí earráide faoi ranganna nach bhfuil le fáil nuair a thiomsú tú nó a reáchtáilERDDAP™nó ar cheann de na huirlisí, i gcomparáid do líne ordú ar classpath goERDDAP's[classpath reatha](/docs/contributing/programmer-guide#development-environment)a figiúr amach a .jars ar iarraidh ó do chosán ranga.

## Leagan 1.68{#version-168} 
 (a scaoileadh 2016-02-08) 

*    **Gnéithe Nua (d'úsáideoirí) :** Uimh.
     
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    *   [EDDGridÓ Fianáin Comhiomlánú trí Ainmneacha Comhad nó Meiteashonraí Domhanda](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)--
Gach athruithe arEDDGridIs féidir FromFiles a chomhiomlánú anois ar ghrúpa de chomhaid trí ghné nua fágtha, de ghnáth am, bunaithe ar luach a dhíorthaítear ó gach ainm comhaid nó ó luach tréith domhanda atá i ngach comhad.
    * IMPROVED: Mhol muid roimhe seo gur mhaith leat a chruthúEDDGridÓ tacar sonraí Erddap i dodatasets.xmlgo tagairt agus a chaomhnú an jplMURSST tacar sonraí in árERDDAP. Ós rud é go bhfuil anois leagan níos nuaí den tacar sonraí, go bhfuil tacar sonraí deprecated anois. Mar sin, má tá tú go tacar sonraí i doERDDAP™, cuir an tacar sonraí nua seo le do thoil
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Más mian leat a bhaint as an jplMU seanRSST tacar sonraí ó doERDDAP™  (tá sé do rogha) , athrú ar a suíomh gníomhach ó "true" go "false".
    * Bug shocrú: Seiceáil an Treoir do Thuismitheoirí mór go bhfuil tú a shonraítear i do thus.xml. Más rud é nach raibh tú a chur Slais ag deireadh an&lt;bigParentDirectory × ainm, ansinERDDAP™beidh a cruthaíodh roinnt eolairí trí focail a chur i gceangal go díreach leis an ainm a shonraigh tú, in ionad a chruthú subdirectories. Ag tosú le leagan 1.68,ERDDAP™Cuireann Slais go dtí deireadh an t-ainm eolaire más rud é nach raibh tú a shonrú ar cheann. Mar sin, más rud é nach raibh tú a shonrú roimhe seo Slais ag an deireadh, ansin nuair a shuiteáil túERDDAP™v1.68 is gá duit a bhogadh agus a athainmniú na eolairí **tar éis** tú shutdown an seanERDDAP™agus **roimh** tú startup an nuaERDDAP. Mar shampla, má tá tú dhearmad sonraithe bigParentDirectory mar / baile/erddapBPD (aon Slais trailing) agusERDDAP™Tá heolairí cruthaithe dhearmad cosúil
/ baile / bosca / bosca
/ Baile / Bainistíocht
/ baile / Xbox tacar sonraí
/ baile / lasmuigh
/ baile / Breisoideachais agus Oiliúna
/ baile / lasmuigh
agus comhad ainmnithe / baile/uirddapBPDsubscriptionsV1.txt,
ansin is gá duit a bhogadh agus iad a athainmniú a bheith
/ baile / bosca / cache
/ Baile / Breisoideachais agus Oiliúna
/ baile / bosca / tacar sonraí
/ baile / tuilleadh / bradach
/ baile / Breisoideachais agus Oiliúna
/ baile / erddapBPD / sraith
agus / baile/uirddapBPD / suibscríbhinní V1.txt
    * Bug shocrú: Bhí bugs iEDDGridLonPM180 iERDDAP™v1.66 a tharla nuair is tacar sonraí an linbhEDDGridÓn Erddap.
    * Bug shocrú: Bhí bug iEDDGridÓ Fianáin agus EDDTable Seirbhís do ChustaiméiríERDDAP™v1.66 ba chúis leis&lt;updateEveryNMillis ^ a neamhaird an chéad uair a bhí an tacar sonraí luchtaithe tar éis atosú.
    * Bug shocrú / Gné Nua: Má leagtar sonraí linbh laistigh deEDDGridComhsheasmhacht,EDDGridCóip,EDDGridÓ EDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy, nó EDDTableFromEDDGridIs ...ÓErddap tacar sonraí, go bhfuil tuismitheoir tacar sonraí síntiús anois leis an bunúsachaERDDAP™tacar sonraí. Má tá an fholuiteachERDDAP™Tá tacar sonraí sa chéannaERDDAP™, déantar an síntiús agus a bhailíochtú go díreach; ní bhfaighidh tú ríomhphost ag iarraidh ort an síntiús a bhailíochtú. Seachas sin, má tá an córas síntiús do do doERDDAP™iompú amach, a leagtar ar an&lt;reloadEveryNMinutes ^ leagan síos don tacar sonraí tuismitheoir le líon beag (60?) ionas go bhfanfaidh sé cothrom le dáta.
    * Bug shocrú / Gné Nua: Má leagtar sonraí linbh laistigh deEDDGridComhsheasmhacht,EDDGridCóip,EDDGridÓ EDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy, nó EDDTableFromEDDGridTá gníomhach = "false", go bhfuil leagtha sonraí leanbh skipped anois.

## Leagan 1.66{#version-166} 
 (a scaoileadh 2016) 

*    **Gnéithe Nua (d'úsáideoirí) :** 
    * Graphs (gan léarscáileanna) Is féidir a bheith anois luachanna anuas ar na haiseanna. Chun seo a fháil nuair a úsáid a dhéanamh A Graph leathanach gréasáin, athrú nua Y Axis : ag dul suas leagan (taiseachas aeir: fliuch) a shíolraigh. Nó, i URL a iarrann graf, bain úsáid as an nua roghnach 3 '|' paraiméadar don[Seirbhís do Chustaiméirí Raon agus/nó &amp; Seirbhís do Chustaiméirí](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands), is féidir a bheith rud ar bith (taiseachas aeir: fliuch) , fíor, nó t a fháil luachanna ag dul suas, nó a úsáid bréagach nó f a fháil luachanna anuas. An fíor|Tá luachanna bréagach cás neamhíogair. A bhuíochas le Chris Fullilove, John Kerfoot, Luke Campbell, agus Cara Wilson.
    * Is féidir le húsáideoirí a shonrú anois ar an dath cúlra le haghaidh graif ag cur &amp;.bgColor = 0x_ AARRGGBB_ aistriú chuig an URL a iarrann an graf. Féach .bgColor sa rannóg Orduithe Grafaic an[cineál gas: in airde](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)agus[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands)doiciméadú. Buíochas le John Kerfoot agus Luke Campbell.
    * I gcás tacar sonraí tabular, is féidir srianta a tharchur anois go min (Sonraí Táirge) nó max (Sonraí Táirge) . Féach ar[min () agus max () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min). Go raibh maith agat le John Kerfoot.
    * I gcás tacar sonraí tabular, srianta ama a úsáid[anois](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)is féidir a shonrú anois aonaid ama de milliseconds nó milliseconds.
    * Déanann iarratas ar íomhá de thacar sonraí tabular léarscáil anois (Ní graf) má tá an x agus y athróg faditude-mhaith agus domhanleithead-mhaith athróg (aonad comhoiriúnach) . Buíochas le Rich Signell.
    * Bug shocrú: lipéid ais Am agus ticks bhí uaireanta neamhrialtachtaí corr nuair a iarraidh graif il ag an am céanna (e.g., ar leathanach gréasáin) . Bhí an fhadhb a bug sa leabharlann grafaicí SGT goERDDAP™úsáidí (Bhí athróg amháin "statach" nár chóir a bheith) . Buíochas le Bradford Butman.
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * Is baol slándála a chur ar do phasfhocal r-phost i gcomhad téacs plain cosúil le thus.xml. Chun an fhadhb sin a mhaolú, molaimid go láidir duit:
        1. Socraigh suas cuntas ríomhphoist díreach le haghaidhERDDAP's use, e.g., erddap@yourInstitution.org . Go bhfuil sochair eile chomh maith; go háirithe, níos mó ná ceann amháinERDDAP™Is féidir le riarthóir a thabhairt ansin rochtain ar an gcuntas ríomhphoist sin.
        2. Déan na ceadanna an comhad thus.xml rw (léamh + scríobh) don úsáideoir a bheidh ar siúl Tomcat agusERDDAP™  (úsáideoir = tocat?) agus aon cheadanna (gan léamh nó scríobh) don ghrúpa agus d'úsáideoirí eile. Buíochas le Filipe Rocha Freire.
    * An nua[Amharc ar gach eolas](/docs/server-admin/additional-information#archiveadataset)uirlis shimpliú a dhéanamh.tar.gzcartlann le fo-thacar de tacar sonraí i bhformáid atá oiriúnach le haghaidh cartlannú (go háirithe, agNOAA's NCEI) . Ba chóir go mbeadh sé seo úsáideach do go leorERDDAP™riarthóirí i go leor cásanna, ach go háirithe do ghrúpaí laistighNOAA.
    * An cineál nua tacar sonraí[EDDGridÓn NcFilesUnpacked](/docs/server-admin/datasets#eddgridfromncfilesunpacked)Is malairt deEDDGridÓ Fisicí. Is é an difríocht go unpacks an rang gach comhad sonraí roimhEDDGridBreathnaíonn FromFiles ar na comhaid:
        
        * unpacks sé athróg pacáilte a úsáidscale\\_factoragus/nóadd\\_offset.
        * Cuireann sé athróga slánuimhir go bhfuil \\_Unsigned = tréithe fíor le cineál sonraí slánuimhir níos mó ionas go mbeidh na luachanna le feiceáil mar na luachanna unsigned. Mar shampla, ar \\_Unsigned = fíor byte (8 giotán) athróg thiocfaidh chun bheith gearr sínithe (16 giotán) athróg.
        * Athraíonn sé \\_FillValue agusmissing\\_valueluachanna a bheith NaN (nó MAX\\_VALUE do chineálacha sonraí slánuimhir) .
        
Is é an buntáiste mór den rang seo go soláthraíonn sé ar bhealach chun déileáil le luachanna éagsúla descale\\_factor,add\\_offset, \\_FillValue, nómissing\\_valuei gcomhaid éagsúla i mbailiúchán. Seachas sin, ba mhaith leat a úsáid uirlis cosúil[An tIomlán](/docs/server-admin/datasets#ncml-files)nó[NCO](/docs/server-admin/datasets#netcdf-operators-nco)a mhodhnú gach comhad a bhaint as na difríochtaí ionas go bhféadfaí na comhaid a láimhseáil agEDDGridÓ Fisicí. Maidir leis an rang seo a bheith ag obair i gceart, ní mór na comhaid a leanúint na caighdeáin CF do na tréithe gaolmhara. Buíochas le Philippe Makowski.
    * An cineál nua tacar sonraí[EDDGridNaisc go dtí suíomhanna eile](/docs/server-admin/datasets#eddgridlonpm180)ligeann duit tacar sonraí a athrú a bhfuil roinnt luachanna domhanfhad níos mó ná 180 (e.g., an raon 0 go 360) i tacair sonraí le luachanna fada laistigh den raon -180 go 180 (Móide Fada nó Minus 180, mar sin, an t-ainm) . Is é an buntáiste mór chun tacair shonraí a thairiscint le luachanna fada sa raon -180 go 180 goOGCweb development (e.g.,WMS) a cheangal ar luachanna fada sa réimse seo. A bhuíochas le Lynne Tablewski, Fabien Guichard, Philippe Makowski, agus Martin Spel.
Comhairle Contae Mhaigh Eo Nuashonraigh: Eeek&#33; Tá an fabht a tharlaíonn nuair a bhíonn an tacar sonraí leanbhEDDGridÓ Erddap go tagairtí tacar sonraí sa chéannaERDDAP. Tá an fabht socraithe iERDDAP™v1.68.
    * I[Socraigh mar teanga réamhshocraithe](/docs/server-admin/datasets#generatedatasetsxml), cineál nua tacar sonraí speisialta,EDDGridLonPM180FromErddapCatalog, ligeann duit a ghiniúint andatasets.xmlle haghaidhEDDGridLonPM180 tacar sonraí ó gach ceann de naEDDGriddatasets iERDDAPgo bhfuil aon luachanna domhanfhad níos mó ná 180.
    * I gcás gachEDDGriddatasets, idatasets.xmlis féidir leat úsáid a bhaint anois ar an roghnach
[EN]&lt;ar fáil Bhí an t-eolas úsáideachWMStréimhse saoil: ilbhliantúil|foirm duille: oval&lt;Seirbhís do Chustaiméirí Bhí an t-eolas úsáideachWMSú (Sonraí Teagmhála)   (Réamhshocrú) . Ligean seo a disables bréagach foréigean naWMSseirbhís don tacar sonraí seo. Más fíor, d'fhéadfadh sé nach mbeadh an tacar sonraí inrochtana fós tríWMSar chúiseanna eile (e.g., gan aon lat ná aon aiseanna) . Tá sé seo úsáideach go háirithe le haghaidh tacar sonraí atá ann ar a gcuid féin agus fillte agEDDGridLonPM180, ionas go mbeidh ach an leagan LonPM180 inrochtana tríWMS.
    * I thus.xml, is féidir leat a shonrú dath réamhshocraithe éagsúla do chúlra na graif. Tá an dath sonraithe mar luach heicseagánach 8 dhigit san fhoirm 0x_AARRGGBB_, i gcás ina bhfuil AA, RR, GG, agus BB an opacity, comhpháirteanna dearg, glas agus gorm, faoi seach, sonraithe mar uimhreacha heicseagacha 2-digit. Tabhair faoi deara go bhfuil an chanbhás i gcónaí opaque bán, mar sin (leath leath - - - - -) cumaisc dath cúlra graf trédhearcach isteach sa chanbhás bán. Tá an réamhshocraithe gorm éadrom:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Buíochas le John Kerfoot agus Luke Campbell.
    * I thus.xml, is féidir leat a shonrú anois ar an méid uasta do[comhad log](/docs/server-admin/additional-information#log)  (nuair a athainmnítear é a logáil isteach. txt. roimhe seo agus logáil nua. Tá txt cruthaithe) , i MegaBytes. Tá an t-íosmhéid a cheadaítear 1. Is é 2000 an t-uasmhéid a cheadaítear. Is é 20 an mainneachtain (BLIANTÚIL) . Mar shampla:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * Idatasets.xml, [&lt;fgdcFile agus (Sonraí Teagmhála) nó [EN]&lt;Iso19115File ×) (Táirgí Coibhneasta Is maith leat) Is féidir anois a bheith ina comhad áitiúil (mar a bhí roimh) nó URL (a íoslódáil mar sin tá cóip áitiúil) . Más rud éERDDAP™nach bhfuil in ann an comhad a íoslódáil, leanfaidh luchtú an tacar sonraí ar aghaidh ach ní bheidh fgdc nó comhad iso19115 ag an tacar sonraí.
    *   EDDGridÓ Fianáin agus EDDTable Is féidir le tacair sonraí FromFiles a dhéanamh anois tapaidh (an córas sinERDDAP™iarracht a úsáid nuair a bhíonn tacair sonraí luchtaithe den chéad uair nuairERDDAP™Tá restarted) . Seo luasanna atosú suasERDDAP.
An tSeirbhís Dóiteáin Nuashonraigh: Eeek&#33; Tá an fabht a cúiseanna&lt;updateEveryNMillis ^ a bheith neamhaird ar an gcéad uair a bhfuil an tacar sonraí luchtaithe tar éis atosú. Tá an fabht socraithe iERDDAP™v1.68.
    * Ceadaíonn feabhas ginearálta ar an gcóras mearRestartERDDAP™a luchtú tacar sonraí níos tapúla nuairERDDAP™Tá restarted.
    * Gach duineEDDGridÓ Fianáin agus EDDTable Fo-aicmí FromFiles glacadh anois nua&lt;pathRegex × chlib, de ghnáth ceart sonraithe thíos&lt;Athchúrsach . Má tá athchúrsach "true", ach cosáin subdirectory iomlán a mheaitseáil leis an pathRegex (réamhshocraithe = ") glacfar leis. Mar an gcéanna, a&lt;sourceUrls chlib iEDDGridIs féidir le Comhiomlánú Toise áirítear anois tréith pathRegex (réamhshocraithe = ") .
    * An réamhshocraithe le haghaidh&lt;páirteachRequestMaxBytes ú i thus.xml anois 490000000 (~ 490 MB) . Seachnaíonn sé seo roinnt fadhbanna / timeouts a bhaineann le sonraí a fháil ó fhreastalaithe sonraí THREDDS. Buíochas le Leslie Thorne.
    * Ba chóir go mbeadh athrú beag ar an gcóras logála ar chumasERDDAP™a bheith níos sofhreagrach nuair a bhíonn sé an-, an-ghnóthach. Tá faisnéis scríofa anois chun an comhad logáil isteach ar an tiomáint diosca i smutáin sách mór. Is é an buntáiste go bhfuil sé seo an-éifeachtach --ERDDAP™Beidh riamh bloc ag fanacht le faisnéis a bheidh le scríobh chuig an comhad logáil. Is é an míbhuntáiste go mbeidh an logáil deireadh beagnach i gcónaí le teachtaireacht páirteach, nach mbeidh a chur i gcrích go dtí go bhfuil an chéad shmután eile scríofa.
    * Bug shocrú a bhaineann le inotify agus an [&lt;updateEveryNMillis . (/ disciplíní / sonraí #updateeverynmillis) córas le haghaidhEDDGridÓ Fianáin agus EDDTable Seirbhís do Chustaiméirí Níl sé riachtanach a thuilleadh a shonrú mór de fs.inotify.max\\_user\\_watches nó fs.inotify.max\\_user\\_instances. Tá fabht iJavago cúiseanna roinnt codanna deJava's inotify / WatchDirectory córas nach truflais a bailíodh nuair a bhíonn siad chun críche; sa deireadh, bheadh líon na uaireadóirí inotify zombie nó cásanna níos mó ná an líon uasta a shonraítear.ERDDAP™anois oibríonn thart ar seoJavabug.
Chomh maith leis sin, tá líon na snáitheanna inotify liostaithe ar an leathanach gréasáin status.html, ionas gur féidir leat súil a choinneáil ar a úsáid. De ghnáth, tá 1 snáithe inotify in aghaidh anEDDGridÓ Fianáin agus EDDTable Leagan sonraí FromFiles.
    * Bug shocrú: in áiteanna go leor, in ionad earráid á rethrown, a ghintear earráid nua a áireamh ach leagan gearr ar an teachtaireacht earráide bunaidh agus gan an rian Stack. Anois, nuair a bhíonn earráid nua a ghintear, folaíonn sé i gceart an eisceacht bunaidh ar fad m.sh., caith Eisceacht nua ("roinnt teachtaireacht nua", e) ;
Go raibh maith agat le Susan Perkins.
    * Bug shocrú: go dtí le déanaí (v1.64?) , más .../datasetIDIarradh URL,ERDDAP™bheadh a chur .html leis an URL. I v1.64, theip air seo (a ghintear URL formáidithe mícheart agus ansin theip) . Anois oibríonn sé seo arís. A bhuíochas le Chris Fullilove.

## Leagan 1.64{#version-164} 
 (scaoileadh 2015-08-19) 

*    **Gnéithe Nua (d'úsáideoirí) :** 
    * Tá treoir anois chun rochtain a fháil ar an focal faire-chosanta príobháideachERDDAP™web development (https://) via via via viacurlagusPython. Féach an[curl](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl)agus[Python](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python)treoracha.
Buíochas le Emilio Mayorga de NANOOS agus Paul Janecek na Teicneolaíochtaí Spyglass.
         
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    *   ERDDAP™Éilíonn anoisJava1.8+.
        Java1.7 shroich a[deireadh saoil](https://www.oracle.com/technetwork/java/eol-135779.html)  (aon nuashonruithe slándála) i mí Aibreáin 2015. An leagan seo denERDDAP™Ní bheidh ag obair le leaganacha deJavathíos 1.8. Má tá tú cothrom le dáta óJava1.7x (nó níos luaithe) , ba chóir duit a thabhairt cothrom le dáta freisin Tomcat. Féach an[ERDDAP™Socraigh suas Treoracha](/docs/server-admin/deploy-install)le naisc agus comhairle a íoslódáil.
    * Foirm Sholáthair Sonraí Nua.
Nuair a thagann soláthraí sonraí chun tú ag súil a chur ar roinnt sonraí le doERDDAP™, is féidir é a bheith deacair agus am Tógann a bhailiú gach ceann de na meiteashonraí is gá a chur leis an tacar sonraí isteachERDDAP. Go leor foinsí sonraí (mar shampla, .csv comhaid, Comhaid Excel, bunachair sonraí) nach bhfuil aon meiteashonraí inmheánacha, mar sinERDDAP™Tá Foirm Sholáthair Sonraí nua a bhailíonn meiteashonraí ón soláthraí sonraí agus tugann sé treoir éigin eile don soláthraí sonraí, lena n-áirítear treoir fhairsing do Bhunachair Sonraí. Déantar an fhaisnéis a chuirtear isteach a thiontú godatasets.xmlformáid agus ansin ríomhphost chuig anERDDAP™internet marketing (tú thú) agus scríofa (aguisín) go mór-Stiúrthóir / logs / dataProviderForm.log . Dá bhrí sin, an fhoirm leath-uathoibríoch an próiseas ag fáil tacar sonraí isteachERDDAP™, ach anERDDAP™riarthóir fós a chur i gcrích ar andatasets.xmlsmután agus déileáil le dul ar an comhad sonraí (s s) ón soláthraí nó nascadh leis an mbunachar sonraí. Le haghaidh tuilleadh eolais, féach ar an[Sonraí a Sholáthar Foirm Iarratais](/docs/server-admin/datasets#data-provider-form).
    * Nuashonraithe go deireanach&lt;Conas a oibríonn sé?
is féidir a úsáid agEDDGridSeirbhís do Chustaiméirí (agus dá bhrí sin ó NcFiles agus ó MergeIRFiles) ,EDDGridComhsheasmhacht,EDDGridCóip, agusEDDGridSideBySide dataets a shonrú cé chomh beacht agus ní mór na luachanna ais i gcomhaid éagsúla a bheith (cé mhéad digití) : 0 = gan seiceáil (ná é seo a úsáid&#33;) , 1-18 chun cruinneas a mhéadú, nó 20 (taiseachas aeir: fliuch) do comhionannas cruinn. Chun n = 1-18,ERDDAP™cinntíonn go bhfuil an chéad n digití de luachanna dúbailte (nó (n + 1) div 2 do luachanna snámhphointe) atá comhionann.
        &lt;Tagann meaitseála&lt;a chinntiú AxisValuesAreEqual through, atá dímheasta anois. Déanfar luach 'fíor' a thiontú go matchAxisNDigits = 20. Luach 'False' (ná é seo a dhéanamh&#33;) a thiontú go cluiche Aiseolas = 0.
    *   EDDGridÓ Fianáin agus EDDTable Beidh FromFiles luchtú go han-mhall an chéad uair a úsáideann tú an leagan seo deERDDAP.
        ERDDAP™siopaí anois an t-eolas comhad inmheánach beagán difriúil, mar sin tá an tábla comhad inmheánach do gach ceann de na tacair sonraí a atógáil. Mar sin, ná bíodh imní ort. Ní dhéanfaidh aon ní mícheart. Tá sé ina rud ama amháin.
    * Comhaid Foinse cianda
        EDDGridÓ NcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles anois ar chumas na comhaid a bheith comhaid iargúlta in eolaire inrochtana aghttp://  (agus is dóchahttps://Cóipeáil nasc leis an tweet Leabaigh an Tweet) má thacaíonn an freastalaí iargúlta[Iarratais Raon](https://en.wikipedia.org/wiki/Byte_serving)sa header iarrata. TRÍDDS agus Amazon S3 tacaíocht Iarrataí Raon,Hyraxnach bhfuil. Ligeann an córas seo duit sonraí a rochtain i gcomhaid iargúlta gan na comhaid a íoslódáil (atá cabhrach má tá na comhaid iargúlta ró voluminous) , ach beidh rochtain ar na comhaid a bheith i bhfad níos moille ná rochtain ar chomhaid áitiúla nó fiú ar iargúltaOPeNDAPfoinse.
Áirítear leis seo"files"i buicéad Amazon S3 ós rud é go bhfuil siad inrochtana tríhttp://. Má tá na hainmneacha réad S3 cosúil ainmneacha comhaid (le inmheánach / cosúil le crann eolaire Linux) ,ERDDAP™is féidir a dhéanamh freisin ar na comhaid inrochtana trídERDDAP's"files"córas. Chun seo a bheith ag obair, ní mór do dintiúir S3 a bheith i ~ /.aws / Ábhair (ar Linux, OS X, nó Unix) , nó C:\\Users\\\USERNAME\\.aws\\ (ar Windows) ar an bhfreastalaí leERDDAP. Féach an[Amazon SDK doiciméadú](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1).
    * Sonraí a ghiniúint Tá rogha nua, neamhghnách ag Xml: EDDsFromFiles.
Beidh sé seo dul trí chóras comhad (fiú córas iargúlta cosúil le Amazon S3 má tá na rudaí ainmneacha comhad-mhaith) agus a chruthúdatasets.xmlsmután do shraith tacar sonraí. D'fhéadfadh do míleáiste athrú. Oibríonn sé seo go maith má tá na comhaid eagraithe ionas go mbeidh na comhaid sonraí i eolaire ar leith (agus a fostiúrthóireachtaí) atá oiriúnach le haghaidh tacar sonraí amháin (e.g., gach cumaisc SST 1-lá) . Seachas sin (e.g., má tá eolaire roinnt comhaid SST agus roinnt comhaid Chlorophyll-a) , oibríonn sé seo go dona ach d'fhéadfadh sé a bheith fós úsáideach.
    * Ríomhchláraitheoirí: comhaid nua /lib .jar.
Má tá tú compileERDDAP™, tabhair faoi deara na comhaid .jar nua sa pharaiméadar classpath -cp atá liostaithe saERDDAP™ [Clár na dToghthóirí](/docs/contributing/programmer-guide).
    * mara\\_water\\_practical\\_salinity
Má úsáideann tú an t-ainm caighdeánach CF farraige\\_water\\_salinity le haghaidh aon athróg, Molaim duit aistriú go dtí farraige \\_water\\_practical\\_salinity atá ar fáil i[leagan 29 den CF Caighdeánach Ainm Tábla](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)  (agus roinnt leaganacha roimhe seo -- Ní raibh a fhios agam go) . Léiríonn an t-ainm go bhfuil sé seo go deimhin, luach Salinity Phraiticiúil ag baint úsáide asPractical Salinity Units  (PSU) , seachas luach g/kg níos sine. Tá na haonaid Canonical difriúil, ach fós thar a bheith unhelpful: 1 1 (presumably intuigthePSUSeirbhís do Chustaiméirí) , seachas 1e-3 (presumably intuigthe g / kg) le haghaidh farraige \\_water\\_salinity.\\[Hey,Unidataagus CF: Aithnímid luachanna a úsáideann scálaí eile, mar shampla Fahrenheit nó Celsius, trí shraith aonad go bhfuil an t-ainm ar an scála nó roinnt athrú. Cén fáth nach féidir linn a aithint aonaid salinity trína scála, m.sh., PSS-78? Tá a fhios agam: Tá luachanna PSS-78 "aonfhoirmeach", ach tá scála intuigthe, nach bhfuil ann? Má chum mé scála salinity praiticiúla nua ina bhfuil na luachanna 0.875 uair na luachanna PSS-78, Ba chóir na haonaid Canonical fós "1"? Conas a d'fhéadfadh úsáideoir a insint dóibh ar leith? Aonaid de 1e-3 agus 1 nach thuairisciúil ná cabhrach d'úsáideoirí atá ag iarraidh a figiúr amach cad a léiríonn na huimhreacha.\\]

## Leagan 1.62{#version-162} 
 (scaoileadh 2015-06-08) 

*    **Gnéithe Nua (d'úsáideoirí) :** 
    * Le haghaidhEDDGriddatasets, Is féidir le húsáideoirí a dhéanamh anois Cineál Graph: graif dromchla le haon teaglaim de aiseanna uimhriúil, ní hamháin domhanfhad i gcoinne domhanleithead. Ligeann sé seo duit a dhéanamh x versus y (Toir ornáideacha agus Crainn) graif agus éagsúla[Léaráid Hovmöller](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram), mar shampla, plotting domhanfhad i gcoinne doimhneacht, nó am i gcoinne doimhneacht.\\[Tabhair faoi deara: má tá doimhneacht ar an Axis Y, is dócha go mbeidh sé sracadh as an méid is mian leat. Tá brón orainn, un-flipping nach bhfuil sé fós rogha.\\]Buíochas le Cara Wilson agus Lynn DeWitt.
    * Tá nua[Tiontaire Aigéanach / Atmaisféarach](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html)a ligeann duit comhainm aigéanach/atmaisféarach a thiontú go/ó ainm iomlán.
    * Tá nua[Aigéanach / atmaisféarach Cineálacha éagsúla Tiontaire](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html)a ligeann duit ainm coitianta athróg farraige / atmaisféir a thiontú go / ó ainm iomlán.
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    *   Java7/8
        Oraclea thuilleadh tacaíochtaí (Soláthraíonn Ceartúcháin bug slándála do)  Java7.ERDDAP™go fóillJava7, ach le do thoil bogadh chunJava8. An chéad scaoileadh eileERDDAP™Beidh ag teastáil dóchaJava8.
    *   valid\\_min/ Uasmhéid / raon
Roimhe seo agus anois, más rud édataVariablea bhíscale\\_factoragusadd\\_offsetmeiteashonraí,ERDDAP™unpacks na luachanna sonraí agus cuireann sé go meiteashonraí. Roimhe seo,ERDDAP™ní raibh a mhodhnú / unpack aonvalid\\_range,valid\\_min,valid\\_maxmeiteashonraí (a ghnáth / Níorbh fhéidir go bhfuil luachanna pacáilte) ag anscale\\_factoragusadd\\_offset. Anois a dhéanann sé. Déan cuardachERDDAP™do "valid\\_" agus déan cinnte go bhfuil gach ceann de na hathróga a bhfuilvalid\\_range,valid\\_min, nóvalid\\_maxtá na luachanna ceart nuair a bheidh na tacair sonraí le feiceáil sa leagan nua deERDDAP. Féach ar[valid\\_range/ mion / doiciméadú uasta](/docs/server-admin/datasets#valid_range).
    * ACDD-1.3
Roimhe seo,ERDDAP™  (go háirithe GenerateDatasets XLUMX) a úsáidtear / a mholtar an bunaidh (1.0) leagan den[NetCDFAn Coinbhinsiún um Fhionnachtain Shonraí](https://wiki.esipfed.org/ArchivalCopyOfVersion1)dá ngairtear "UnidataDataset Discovery v1.0 " sna Coinbhinsiúin domhanda agusMetadata\\_Conventionstréithe. Anois, molaimid[ACDD leagan 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)a daingníodh go luath i 2015 agus dá ngairtear "ACD-1.3". Fortunately, ACDD-1.3 Tá an-ar gcúl ag luí leis an leagan 1.0. Táimid AMND go bhfuil tú[aistriú chuig ACDD-1.3](/docs/server-admin/datasets#switch-to-acdd-13). Níl sé deacair.
    * Sonraí a ghiniúint Xml Nótaí
Bhí líon mór athruithe chun feabhas a chur ar an&lt;addAttributes× luachanna molta ag GenerateDatasets Xml do na Coinbhinsiúin domhanda,creator\\_name/ r-phost/url, eochairfhocail, achoimre, agus tréithe teidil agus don athróglong\\_nametréith. Baineann roinnt athruithe le húsáid nua ACDD-1.3.
    * EDDTableFromSOSweb development
Le cineálacha nua a chur leis ó am go chéileSOSfreastalaithe agus athruithe ar na freastalaithe d'aois, tá sé ag fáil níos deacra doERDDAP™a bhrath go huathoibríoch ar an gcineál freastalaí ó na freagraí an fhreastalaí. Úsáid [&lt;Seirbhís do Chustaiméirí (Teicneolaíocht Faisnéise agus Cumarsáide)   (le luach IOOS\\_NDBC, IOOS\\_NOS,OOSTethys, nó WHOI) Tá sé anois STRONGLY AMNDED. Má tá aon cheann de do thacair sonraí den chineál seo fadhbanna sa leagan nuaERDDAP, déan iarracht ath-reáchtáil GenerateDatasets Xml do naSOSfreastalaí a ghiniúint smután nua dedatasets.xmldon tacar sonraí sin. Sonraí a ghiniúint Beidh Xml lig tú iarracht amach an éagsúla&lt;sosServerType × roghanna go dtí go bhfaighidh tú an ceann ceart le haghaidh freastalaí ar leith. Má tá tú fós fadhbanna, le do thoil in iúl dom an fhadhb a fheiceann tú agus an URL an fhreastalaí agus beidh mé iarracht chun cabhrú.
    * Amharc ar ár liosta iomlán de shuíomhanna
Roinnt tréithe a moladhaddAttributesTá foinse anois. Is dócha nach bhfuil ort rud ar bith a athrú le haghaidh tacair sonraí atá ann cheana féin i dodatasets.xml.
    * Bug shocrú a bhaineann le hiarratais áirithe a EDDTableFromNcCFFiles datasets.
Chuir mé líon mór tástálacha aonaid leis an líon mór tástálacha aonaid atá ann cheana de na modhanna bunúsacha (tá 100 de na cásanna) . Buíochas le Eli Hunter.
    * Bug shocrú / athruithe beagaEDDGridÓ MergeIR.
A bhuíochas le Jonathan Lafite agus Philippe Makowski
    * Bug shocrú:EDDGridOibríonn FromErddap anois fiú mura bhfuil tacar sonraí iargúltaioos\\_categorytréithe athraitheacha.
Buíochas le Kevin O'Brien.
    * Bug shocrú i .graph leathanach gréasáin le haghaidhEDDGriddatasets nuair nach bhfuil ach ais athróg le níos mó ná luach amháin.
Go raibh maith agat le Charles Carleton.
    * Bhí feabhsuithe beaga eile, athruithe, agus Ceartúcháin.

## Leagan 1.60{#version-160} 
 (a scaoileadh 2015-03-12) 

*    **Gnéithe Nua (d'úsáideoirí) :** cineál gas: in airde
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * STRONGLY AMNDED: Nuashonrú do fhreastalaí[taiseachas aeir: fliuch](/docs/server-admin/additional-information#robotstxt)comhad a chur san áireamh:
Dícheadú: Seirbhís do Chustaiméirí
    * Cuir isteach Fadhb agus Réiteach:
Ar ríomhairí Linux, má tá tú ag baint úsáide as&lt;updateEveryNMillis × le tacair sonraí le cineál =EDDGridÓ Fianáin, EDDTableFromFiles,EDDGridCóip, EDDTableCopy, nó a gcuid fo-aicmí, is féidir leat a fheiceáil fadhb i gcás ina mainneoidh tacar sonraí a luchtú (ó am go chéile nó go comhsheasmhach) leis an teachtaireacht earráide: "IOException: Úsáideoir teorainn cásanna inotify shroich nó comhaid an iomarca oscailte". Más amhlaidh, is féidir leat an fhadhb seo a shocrú trí ghlaoch (mar fhréamh) :
macalla fs.inotify.max|cliceáil grianghraf a mhéadú
macalla fs.inotify.max\\_user\\_instances = 1024|cliceáil grianghraf a mhéadú
taiseachas aeir: fliuch
Nó, úsáid uimhreacha níos airde má leanann an fhadhb. Is é an réamhshocraithe le haghaidh uaireadóirí 8192. Is é an réamhshocraithe le haghaidh cásanna 128.\\[UPDATE: Tá fabht iJavaa cúiseanna cásanna inotify nach bhfuil a truflais a bailíodh. Tá an fhadhb seo a sheachaint iERDDAP™v1.66 agus níos airde. Mar sin, is é an réiteach níos fearr a aistriú chuig an leagan is déanaí deERDDAP.\\]
    * NoSuchFileException Bug Fix:
Bhí a bug a d'fhéadfadh a chur faoi deara datasets de chineál =EDDGridÓ Fianáin, EDDTableFromFiles,EDDGridCóip, EDDTableCopy, nó a gcuid fo-aicmí a luchtú ó am go chéile leis an earráid "NoSuchFileException: _someFileName_". Tá an fabht a bhaineann le húsáidí FileVisitor agus tugadh isteach iERDDAP™v1.56. Is é an fhadhb annamh agus is dócha go ndéanfaidh sé difear tacar sonraí le líon mór de chomhaid sonraí atá ag athrú go minic.
    * Bhí roinnt feabhsuithe beaga, athruithe, agus Ceartúcháin.

## Leagan 1.58{#version-158} 
 (scaoileadh 2015-02-25) 

*    **Gnéithe Nua (d'úsáideoirí) :** 
    * An nua["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)Ligeann córas leat brabhsáil córas comhaid fíorúil agus íoslódáil comhaid sonraí foinse ó go leorERDDAP™datasets. An bhfuil"files"Tá córas gníomhach de réir réamhshocraithe, achERDDAP™Is féidir le riarthóirí é a dhíchumasú trí
```
        <filesActive>false</filesActive>  
```
i anERDDAP™comhad thus.xml. Buíochas speisialta le Philippe Makowski, a mhair nuair a bhí mé mall a thuiscint an áilleacht an smaoineamh seo.
    * ceann scríbe ama Max -- Roimhe seo, bhí an t-athróg ama de tacair sonraí EDDTable le sonraí in aice fíor-ama a headMax de NaN, a intuigthe go bhfuil an luach ama uasta don tacar sonraí le déanaí, ach ní fios go beacht agus ag athrú go minic. Anois, tá luach fíor ag an gceann scríbeMax, rud a léiríonn an t-am deireanach faoi láthair. Tá go leor tacar sonraí a nuashonrú go leanúnach sonraí.ERDDAP™tacaíochtaí rochtain a fháil ar na sonraí is déanaí, fiú má tá sé tar éis an ama seo ar a dtugtar faoi láthair. Tabhair faoi deara go bhfuil an nua [&lt;updateEveryNMillis . (/ disciplíní / sonraí #updateeverynmillis) tacaíocht iEDDGridÓ Fianáin agus EDDTable FromFiles datasets cothrom le dáta an athróg ama ar headMax. Tá iarmhairt eile ar an athrú go bhfuil andatasetID= = =allDatasetsÁirítear tacar sonraí anois an t-am seo caite ar a dtugtar faoi láthair sna colúin maxTime. Go raibh maith agat le John Kerfoot.
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * STRONGLY AMNDED: Nuashonrú do fhreastalaí[taiseachas aeir: fliuch](/docs/server-admin/additional-information#robotstxt)comhad a chur san áireamh:
Dícheadú: / comhaid /
Dícheadú: Seirbhís do Chustaiméirí
    * Samplach Samplachdatasets.xml-- An bhliain seo caite, mhol muid roinnt tacar sonraí den scoth sa coastwatchERDDAP™go bhféadfaí tú a chur le doERDDAP™ach ag cur cúpla línte le dodatasets.xml. Má chuir tú na tacair sonraí erdVH, le do thoil aistriú chuig an tacar sonraí níos nuaí erdVH2:
        * Déan cóip de na tacair sonraí erdVH agus an chóipeáil a athrúdatasetID's ó erdVH... go erdVH2... agus an tagairt a athrúsourceUrló erdVH... go erdVH2....
        * Socraigh an erdVH... tacar sonraí a bheith gníomhach = "false".
    * Gach duineEDDGridÓ Fianáin agus EDDTable Fo-aicmí FromFiles tacaíocht anois [&lt;Féachaint ar Fholúntais (Sonraí Teagmhála) a dhéanamh ar na comhaid sonraí foinse inrochtana tríd an"files"córais. De réir réamhshocraithe, tá an córas seo as do gach tacar sonraí. Ní mór duit a chur leis an chlib chun é a chumasú. Buíochas le Philippe Makowski.
    * Gach duineEDDGridÓ Fianáin agus EDDTable Fo-aicmí FromFiles tacaíocht anois [&lt;updateEveryNMillis . (/ disciplíní / sonraí #updateeverynmillis) . De réir réamhshocraithe, tá an córas seo as do gach tacar sonraí. Ní mór duit a chur leis an chlib chun é a chumasú. A bhuíochas le Dhoiminic Fuller-Rowell agus NGDC.
    * An nua[Naisc ábhartha eile](/docs/server-admin/datasets#eddtablefromfilenames)Cruthaíonn tacar sonraí ó fhaisnéis faoi ghrúpa de chomhaid i gcóras comhaid an fhreastalaí, ach ní chuireann sé sonraí a sheirbheáil ó laistigh de na comhaid. Mar shampla, tá sé seo úsáideach chun bailiúcháin de chomhaid íomhá a dháileadh, comhaid fuaime, comhaid físe, comhaid fhoclaíochta, agus comhaid scarbhileog. Oibríonn sé seo lámh-i-láimh leis an nua["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)córas, ionas gur féidir le húsáideoirí a íoslódáil na comhaid. Buíochas speisialta le Philippe Makowski, a mhair nuair a bhí mé mall a thuiscint an áilleacht an smaoineamh seo.
    * An nua[EDDGridSeirbhísí ar líne](/docs/server-admin/datasets#eddgridfromeddtable)ligeann tú a thiontú tacar sonraí tabular i tacar sonraí gridded. Buíochas le Aigéan Networks Ceanada.
    * An nua[EDDGridSeirbhís do Chustaiméirí](/docs/server-admin/datasets#eddgridfrommergeirfiles)comhiomlánaí sonraí ó ghrúpa de MergeIR áitiúil.gzcomhaid.EDDGridÓMergeIRFiles Tá an t-idirdhealú a bheith ar an chéad shmután de chód chuidighERDDAP. Rinneadh é go hiomlán gan ár gcúnamh. Trí cheers agus buíochas speisialta le Jonathan Lafite agus Philippe Makowski na R.Tech Engineering.
    * Tá nua, roghnach thus.xml tag,&lt;UnitTestDataDir uaire, a shonraíonn an t-eolaire leis na comhaid sonraí tástála aonad atá ar fáil trí stór GitHub nua:[ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest). Mar shampla:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Níl sé seo úsáideach go fóill, ach tá sé mar chuid den bogadh i dtreo a dhéanamh mar go leor de na tástálacha aonad inseachanta ag daoine eile agus is féidir. Buíochas le Terry Rankine.
    * Bhí go leor feabhsuithe beaga, athruithe, agus Ceartúcháin.

## Leagan 1.56{#version-156} 
 (scaoileadh 2014-12) 

*    **Gnéithe Nua (d'úsáideoirí) :**   (Gan a bheith ráite) 
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * Is dócha go bhfuil a fhios agat cheana féin faoi[EDDGridAn tSraith Shinsearach](/docs/server-admin/datasets#eddfromerddap)agus[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap)a lig tú nasc chuig tacar sonraí i eileERDDAPs agus tá siad le feiceáil i doERDDAP. Iarrataí úsáideora le haghaidh sonraí iarbhír ó na tacair sonraí a fháil ar bhealach invisibly chuig an bhfoinseERDDAP™, mar sin ní dhéanann na sonraí sreabhadh trí do chóras nó a úsáid do bandaleithead. Tá liosta mór de na tacair sonraí molta sa sampla anoisdatasets.xmli erddapContent.zip. Chun iad a chur san áireamh i doERDDAP™, go léir a bhfuil tú a dhéanamh ná cóip agus greamaigh na cinn is mian leat isteach i dodatasets.xml. Buíochas le Conor Delaney.
    * Má tá tú compileERDDAP™, ní mór duit a chur ar roinnt nua. comhaid próca le do[lasc classpath -cp](/docs/contributing/programmer-guide#development-environment)le haghaidh javac agus java.
    * An nua[EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra)Láimhseálann ag fáil sonraí ó[taiseachas aeir: fliuch](https://cassandra.apache.org/). Buíochas le Ocean Networks Ceanada.
    * An nua[EDDTableFrom ColumnarAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles)Láimhseálann ag fáil sonraí ó ASCII comhaid sonraí le colúin seasta-leithroinnte. Buíochas le Philippe Makowski.
    * Gach duineEDDGridÓ Fianáin agus EDDTable Fo-aicmí FromFiles úsáid anois modh nua, FileVisitor (Chuir toJavai 1.7) faisnéis a bhailiú faoi na comhaid. D'fhéadfadh sé seo aon leas a bhaint as an gcéad bhailiú faisnéise comhad le haghaidh tacar sonraí ar leith ach is cosúil go bhfuil sochar ollmhór do gatherings ina dhiaidh sin má rinneadh go luath, cé go bhfuil an OS fós an t-eolas i dtaisce. A bhuíochas le NGDC.
        
Molaimid go fóill: Má tá tacar sonraí líon mór de chomhaid (m.sh.,) , an córas oibriúcháin (agus dá bhrí sinEDDGridSeirbhís do Chustaiméirí) a oibriú i bhfad níos éifeachtaí má stóráil tú na comhaid i sraith fo-stiúrthóirí (ceann amháin in aghaidh na bliana, nó ceann in aghaidh na míosa do thacair sonraí le comhaid an-minic) , ionas nach bhfuil líon mór de na comhaid i eolaire ar leith.
        
    * Roinnt feabhsuithe beaga a EDDTableFromAsciiFiles.
    * Roinnt feabhsuithe ar EDDTableFromAsciiServiceNOS, go háirithe a fháil ar roinnt colúin breise eolais ón bhfoinse. Buíochas le Lynn DeWitt.
    * Roinnt Ceartúcháin bug beag a bhaineann leis an ISO 19115 goERDDAP™gineann. Buíochas le Anna Milan.

## Leagan 1.54{#version-154} 
 (scaoileadh 2014-10-24) 

*    **Gnéithe Nua (d'úsáideoirí) :** 
    * Roinnt athróg ag obair anois leis an am ag an cruinneas milliseconds, m.sh., 2014-10-24T16:41:22.485Z. A bhuíochas sin do Dominic Fuller-Rowell.
*    **Athruithe beaga / Fixes Bug:** 
    * Bug shocrú: le meascán áirithe imthosca,EDDGridD'fhill tacair sonraí ó NcFile sonraí ag cruinneas laghdaithe (e.g., floats in ionad doubles) . D'fhéadfadh sé seo difear a dhéanamh ach luachanna sonraí le ^ 8 figiúirí suntasacha. Mo leithscéal. (Agus bhí sé ina bug cláir ríomhaire clasaiceach: carachtar mícheart amháin.) A bhuíochas sin do Dominic Fuller-Rowell.
    * Athruithe beaga go leor.
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * Griddap dataets tacaíocht anois athróg ais amstamp agus athróg sonraí (i.e., athróga le luachanna ama, achdestinationNameseachas"time") . A bhuíochas sin do Dominic Fuller-Rowell.
    *   ERDDAP™anois tacaíonn i gceart millisecondstime\\_precision"1970-01-01T00:00: 00.000Z". quirk aon ghnó: nuair a scríobh amanna chun comhaid dírithe ar an duine (e.g., .csv,.tsv,.json,.xhtml) ,ERDDAP™úsáidí an sonraithetime\\_precisionmá tá sé soicind agus / nó soicind deachúil; ar shlí eile, úsáideann sé soicindtime\\_precision"1970-01-00:00:00Z" (le haghaidh comhsheasmhacht agus ar gcúl comhoiriúnacht) . A bhuíochas sin do Dominic Fuller-Rowell.
    *   EDDGridTacaíonn FromNcFiles anois le String a léamhdataVariables.
    *   .ncIs féidir le comhaid scríofa ag griddap anois TeaghrándataVariables.
    * Sonraí a ghiniúint Xml Áirítear anois níos mó flush () glaonna a sheachaint an fhadhb na faisnéise nach bhfuil á scríobh chuig na comhaid. Buíochas le Thierry Valero.
    * Feabhsaíodh an doiciméadú do GenerateDatasetsXml, go háirithe chun a chur in iúl go n-oibríonn an lasc-i ach amháin má shonraíonn tú na freagraí go léir ar an líne ordú (e.g., mód script) . Agus tá modh script Mhínigh. Buíochas le Thierry Valero.
    *   ERDDAP™a thuilleadh Ceadaíonn dhá athróg i tacar sonraí a bheith mar an gcéannasourceName. (Má rinne duine éigin é roimh, is dócha go raibh teachtaireachtaí earráide.) Mar roimh,ERDDAP™Ní cheadaítear dhá athróg i tacar sonraí a bheith mar an gcéannadestinationName.

## Leagan 1.52{#version-152} 
 (scaoileadh 2014-10-03) 

*    **Gnéithe Nua:**   (cineál gas: in airde) 
*    **Athruithe beaga / Fixes Bug:** 
    * Eile (níos lú) athrú a dhéanamhERDDAP™níos tapúla.
    * Feabhsúcháin ar chomhaid ISO 19115 a ghineannERDDAP: Chuir nua molta&lt;gmd: protocol agus gt; luachanna (faisnéis, cuardaigh,OPeNDAP:OPeNDAP,ERDDAP:griddap, agusERDDAP:tabledap) laistigh de&lt;gmd: CI\\_OnlineResource &amp; .. A bhuíochas le Derrick Snowden agus John Maurer.
    * Athruithe beaga go leor.
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * Bug shocrú: GenerateDatasetsXml.sh agus DasDds.sh Ní raibh i erddap.war do 1.48 agus 1.50. Anois tá siad. Buíochas le Thierry Valero.
    * Athruithe beaga ar roinnt tástálacha luas i TestAll chun iad a dhéanamh níos lú inghlactha seans. Buíochas le Terry Rankine.

## Leagan 1.50{#version-150} 
 (a scaoileadh 2014-09-06) 

*    **Gnéithe Nua:**   (cineál gas: in airde) 
*    **Athruithe beaga / Fixes Bug:** 
    * Seo éERDDAP™Ba chóir go mbeadh i bhfad níos tapúla ná leaganacha le déanaí.
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:**   (rud ar bith) 

## Leagan 1.48{#version-148} 
 (a scaoileadh 2014-09-04) 

*    **Gnéithe Nua:** 
    *   ERDDAP™anois cruthaíonn i gcónaí tacar sonraí tabular,datasetID= = =allDatasets, a bhfuil tábla faisnéise faoi gach ceann de na tacair sonraí saERDDAP. Is féidir é a queried mar aon tacar sonraí tabular eile. Is rogha úsáideach é seo don chóras atá ann faoi láthair chun faisnéis a fháil faoi thacair sonraí go clárúil.
    * Tá dhá chineál comhad aschur nua do EDDTable agusEDDGrid, .csv0 agus.tsv0. Tá siad Coma- agus tab-scartha-luach comhaid nach bhfuil línte le hainmneacha colún nó aonaid. Tosaíonn na sonraí ar an gcéad líne. Tá siad úsáideach go háirithe do scripteanna gur mhaith ach píosa amháin faisnéise óERDDAP.
*    **Athruithe beaga / Fixes Bug:** 
    * Is féidir léarscáileanna a dhéanamh anois le fadachtaí sa raon -720 go 720.
    * An nua.ncml freagra Cineál Comhad ar fáil do gachEDDGriddatasets. Filleann sé na[NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)tuairisc \\-formáidithe ar an tacar sonraí (cosúil le chéile .dds + .das) .
    * Bug shocrú: Cosaint sonraí tabular go.ncBhí comhad teoranta do 100,000 luachanna in aghaidh an athraitheach. Anois tá sé ach teoranta do 2 GB méid iomlán comhad. Buíochas le Kevin O'Brien.
    * Bug shocrú: na SaveAsMatlabmodhanna anois a chinntiú godatasetIDs a thiontú go sábháilteMatlabainmneacha athraitheacha. Ach Molaim go láidir fós a chruthú duitdatasetIDs atá ainmneacha athraitheacha bailí: ag tosú le litir agus ansin ag baint úsáide as A-Z, a-z, 0-9, agus \\_. Féach ar[datasetID](/docs/server-admin/datasets#datasetid). Buíochas le Luke Campbell.
    * Bug shocrú i EDDTableFromDatabase: Le roinnt cineálacha bunachar sonraí, a NO\\_ DATA freagra ón mbunachar sonraí mar thoradh ar 30 dara moill pointless iERDDAP. Buíochas le Greg Williams.
    * Bug shocrú:EDDGridDéan A Graph le Cineál Graph = línte (nó marcóirí nó marcóirí agus línte) iachall x ais athróg a bheith am. Anois is féidir é a bheith ar aon ais. Buíochas le Lynn DeWitt.
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * STRONGLY AMNDED: NuashonrúJava  
An leagan seo denERDDAP™ÉilíonnJava7 nó níos airde, achJavasroichfidh 7 a shaol i mí Aibreáin 2015 (go luath&#33;) , mar sin anois go bhfuil am maith a athrú chunJava8.JavaIs é 8 MENDED STRONGLY. Táim ag tástáil leJava8. Tabhair faoi deara goJavaShroich 6 a deireadh saoil i mí Feabhra 2013 (aon Ceartúcháin bug slándála níos mó&#33;) .
    * STRONGLY AMNDED: Nuashonrú Tomcat
Má úsáideann tú Tomcat, le do thoil athrú go dtí an leagan is déanaí de Tomcat. Tomcat 8 deartha chun obair leJava8.
    * " " "ERDDAP" nach bhfuil a thuilleadh acrainm. Anois tá sé ach ainm. Níl mé ag iarraidh an t-ainm chun aird a tharraingtERD. Ba mhaith liomERDDAP™chun aird a tharraingt ar d’institiúid agus ar do shonraí.
    * Plean Gníomhaíochta don Oideachas[customize an chuma ar doERDDAP™suiteáil chun aird a tharraingt ar d'institiúid agus ar do shonraí](/docs/server-admin/deploy-install#customize). Le obair uair an chloig, is féidir leat a dhéanamh feabhsuithe deas a mhairfidh go deo.
    * I thus.xml, an&lt;Is é an rogha anois neamhaird i gcónaí agus a chóireáil amhail is dá mbeadh an luach bréagach.
MOLADH: Bain an&lt;DisplayDiagnosticInfo bhéil chlib agus eolas a bhaineann ó do thus.xml.
    * I thus.xml, an réamhshocraithe le haghaidh&lt;drawLandMask"níos mó", ach anois tá sé "faoi", a bhfuil mainneachtain ghinearálta níos fearr (oibríonn go maith le gach tacar sonraí) .
    * An GenerateDatasetsXml.sh agus DadDds.sh Linux scripteanna úsáid anois bash in ionad csh, agus tá an síneadh .sh. Buíochas le Emilio Mayorga
    * Sonraí a ghiniúint Xml agus DasDds chruthú anois a gcuid comhaid log féin (GenerateDatasetsXml.log agus DasDds.log) agus comhaid aschur (GenerateDatasetsXml.out agus DadDds.out) i _bigParentDirectory_ / logs /, agus ní a chur ar a gcuid torthaí ar an clipboard.
    * Sonraí a ghiniúint Tacaíonn Xml anois le paraiméadar líne ordaithe -i a chuireann an t-aschur isteach sa chomhad sonraithe ag áit shonraithe. Féach an[data recovery](/docs/server-admin/datasets#generatedatasetsxml). Buíochas le Terry Rankine.
    * Tacaíonn EDDTableFromDatabase anois&lt;colún NameQuotes ú&lt;/ ColumnNameQuotes ×, le luachanna bailí " (taiseachas aeir: fliuch) , ', nó rud ar bith. Seo carachtar (más ann) a úsáid roimh agus tar éis ainmneacha colún i gceisteanna SQL. Cineálacha éagsúla bunachar sonraí, a bunaíodh ar bhealaí éagsúla, beidh gá marcanna éagsúla luachan ainm colún.
    * Is féidir le domhanleithead Tabular agus athróg domhanfhad a bheith saincheaptha anoislong\\_name's, m.sh., Latitude Próifíl. Roimhe seo, d'fhéadfadh siad a bheith ach Latitude agus Longitude.
    * Ó anois ar, sonraigh "defaultDataQuery" agus "defaultGraphQuery" mar tréithe i meiteashonraí domhanda na tacar sonraí (i.e.,&lt;addAtts ^), ní mar ar leith&lt;riachtanais uisce: measartha&lt;réamhshocraithe GraphQuery ^ clibeanna. (Cé, má tá tú a shonrú fós iad trí na clibeanna,ERDDAP™a chruthú go huathoibríoch tréithe domhanda leis an eolas.) 

## Leagan 1.46{#version-146} 
 (a scaoileadh 2013-07-09) 

*    **Gnéithe Nua:** 
    *    (Gan a bheith ráite) 
*    **Athruithe beaga / Fixes Bug:** 
    * Bug shocrú: I EDDTableFromDatabase, i leagan 1.44 amháin,ERDDAP™luaite go míchuí ainm tábla an bhunachar sonraí i ráitis SQL. Tá sé sin socraithe anois. Buíochas le Kevin O'Brien.
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    *    ** Más rud é nach bhfuil tú a mhodhnú na teachtaireachtaí caighdeánacha i messages.xml,
scriosadh scriosadh\\[taiseachas aeir: fliuch\\]/ ábhar / bairille / mogalra.xml . **   
Is é an comhad teachtaireachtaí réamhshocraithe.xml anois sa erddap. comhad cogadh, ní erddapContent.zip. Mar sin,, ní gá duit a thuilleadh a thabhairt cothrom le dáta de láimh teachtaireachtaí.xml.
    * Má dhéanann tú a mhodhnú na teachtaireachtaí i message.xml, ó anois ar, gach uair a thabhairt cothrom le dáta túERDDAP™, ceachtar:
        * Déan na hathruithe céanna a rinne tú roimh an nua
            \\[taiseachas aeir: fliuch\\]/ webapps / erddap / WEB-INF / Ranganna/gov/noaa/pfel / erddap / util/messages.xml.
Agus an t-am amháin: scriosadh\\[taiseachas aeir: fliuch\\]/ ábhar / bairille / mogalra.xml .
        * Nó, figiúr amach cad a d'athraigh sna teachtaireachtaí nua.xml (trí diff) , agus a mhodhnú do
            \\[taiseachas aeir: fliuch\\]/ ábhar / bairille / múscail.xml comhad dá réir.

## Leagan 1.44{#version-144} 
 (scaoileadh 2013-05-30) 

*    **Gnéithe Nua:** 
    * Ceisteanna le tacaí sonraí EDDTable anoisorderByMianadóireacht (...) agusorderByMinMax (...)   (a fhilleann dhá shraith i ngach grúpa, agus íosmhéid agus uasmhéid na sraitheanna deiridhorderByluach) . Buíochas le Lynn DeWitt.
    * Tá dhá nuatabledapcineálacha comhaid:.ncCFHeader agus.ncFM a chosaint (a thabhairt ar ais an header ncdump-mhaith ar an comhfhreagrach.ncCF agus.ncCineálacha comhaid CFMA) . Go raibh maith agat le Steve Hankin.
*    **Athruithe beaga / Fixes Bug:** 
    * Bug shocrú: luchtú an .graph agus leathanaigh ghréasáin .html do thacair sonraí le go leor de luachanna ama a bhí mall mar gheall arERDDAP™Bhí mall nuair a ghiniúint na roghanna sleamhnán ama. Anois tá sé i gcónaí go tapa. A bhuíochas le Michael Barry, OOICI, agus Kristian Sebastian Blalid.
    * Bug shocrú: I roinnt cineálacha tacar sonraí EDDTable, ní raibh na srianta ama láimhseáil i gcónaí i gceart. Anois tá siad. A bhuíochas le John Maurer agus Kevin O'Brien.
    * Bug shocrú: Ní bheadh tacair sonraí a luchtú nuair gach ceann de nasubsetVariablesBhí athróg luach seasta. Anois beidh siad. Buíochas le Lynn DeWitt agus John Peterson.
    * IMPROVED: anois, gach ceist do díreach fo-thacar athróg gníomhú amhail is dá mba &amp; sainiúil () Is cuid den cheist.
    * IMPROVED: anois, le haghaidh fiosruithe lena n-áirítear &amp;.jsonp =_functionName_, _function Ainm_ MUST anois sraith de 1 nó níos mó (tréimhse-scartha) focail. Ní mór do gach focal tús a chur le litir ISO 8859 nó "\\_" agus a leanúint ag 0 nó níos mó ISO 8859 litreacha, digití, nó "\\_". Sea, tá sé seo níos sriantaí náJavaRiachtanais scripte le haghaidh ainmneacha feidhme.
    * Oibríonn an ais ama ar graif anois go maith le haghaidh raonta ama níos faide (80 - 10000 bliain) agus raonta ama níos giorra (0.003 - 180 soicind) .
    *   ERDDAP™Tá níos forgiving anois nuair athruithe parsing de ISO-8601-format sonraí ama.
    * Bhí go leor athruithe beaga eile agus Ceartúcháin.
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    *    **MUST tú cothrom le dáta go dtí an leagan is déanaí a bheith slán.**   
        ERDDAP™faoi iniúchadh slándála. Bhí roinnt bugs agus laigí. Leagan 1.44 Áirítear roinnt Ceartúcháin fabht slándála tábhachtach agus roinnt athruithe a mhéadú slándála agus inrochtaineacht (e.g., le haghaidh úsáideoirí lagaithe fís) . Leagan 1.44 Tá rith an iniúchadh slándála leantach. A bhuíochas leis na daoine maithe go léir ag USGS agus Acunetix a rinne an féidir seo. (Níor chóirNOAAa dhéanamh seo?) 
    * An nua[EDDTableFromWFSAmharc ar gach eolas](/docs/server-admin/datasets#eddtablefromwfsfiles)a dhéanann cóip áitiúil de na sonraí go léir óArcGISLéarscáileannaWFSfreastalaí agus mar sin is féidir na sonraí a chaomhnú go tapa chunERDDAP™úsáideoirí. Buíochas le Christy Caudill.
    * An nua[EDDTableFromEDDGrid](/docs/server-admin/datasets#eddtablefromeddgrid)ligeann duit tacar sonraí EDDTable a chruthú óEDDGridtacar sonraí. Tá roinnt cúiseanna coitianta a dhéanamh seo:
        * Ligeann sé seo an tacar sonraí a chuardach leOPeNDAPriachtanais uisce: measartha (a d’fhéadfadh a bheith iarrtha ag úsáideoir) .
        * Is é an tacar sonraí bunúsach tacar sonraí tabular. Buíochas le OOICI, Jim Potemra, Roy Mendelssohn.
    * Is é an t-ainm athróg "doimhne" anois rogha ar leith "dearthacht". Ní mór na haonaid a bheith ar roinnt leagan de "méadair". Ní mór na luachanna sonraí a bheith dearfach = síos.ERDDAP™anois go hiomlán ar an eolas faoi bhrí "doimhne" agus tacaíonn sé cibé áit a bhfuil airde tacaíocht (e.g., mar chomhpháirt de CF DSG cdm\\_data\\_type = réamhshocraithe sonraí phróifíl) . Ní mór go mbeadh athróg "doimhne" agus "dearthacht".
    * I do chuiddatasets.xml, bain aon úsáidí de&lt;ainm att = "cdm\\_altitude\\_proxy" doimhneacht&lt;/ tuairteála ós rud é go bhfuil doimhneacht anois ar rogha eile ar leith ar airde agus mar sin ní gá a aithint go speisialta.
    * I do chuiddatasets.xml, bain aon úsáidí de&lt;airde MetersPerSourceUnit uaire, ach amháin le haghaidh EDDTable Ó dhúchasSOS.
Nuair a bhíonn an luach 1, ach é a scriosadh.
Nuair a bhíonn an luach -1, mheas ag athrú an t-ainm athraitheach go dtí doimhneacht.
Le haghaidh luachanna eile, cuir le&lt;addAttributes^, mar shampla,:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Gach tacar sonraí tacaíocht anois
        
        *   &lt;failDataQuery a úsáidtear má tá .html iarrtar gan aon cheist.
            * Is dócha gur gá duit é seo a úsáid.
            * Maidir le tacair sonraí griddap, is é úsáid choitianta é seo ná doimhneacht réamhshocraithe nó luach gné airde a shonrú (e.g.,\\[0 0\\]in ionad\\[deireanach\\]) .
In aon chás, ba chóir duit liosta i gcónaí ar fad de na hathróga, i gcónaí a bhaint as na luachanna gné céanna do gach athróg, agus beagnach i gcónaí a úsáid\\[0 0\\],\\[deireanach\\], nó\\[0: deireanach\\]do na luachanna gné.
Mar shampla:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * Le haghaidhtabledapdatasets, is é an úsáid is coitianta seo a shonrú raon ama réamhshocraithe éagsúla (i gcomparáid le anois, m.sh., &amp; am &amp; gt;=now-1ú lá) .
Cuimhnigh go bhfuil iarraidh aon athróg sonraí mar an gcéanna a shonrú gach athróg sonraí, mar sin de ghnáth is féidir leat a shonrú ach an srian ama nua.
Mar shampla:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;defaultGraphQuery uaire a úsáidtear má tá .graph iarrtar gan aon cheist.
            * Is dócha gur gá duit é seo a úsáid.
            * Maidir le tacair sonraí griddap, is é an úsáid is coitianta seo ná doimhneacht réamhshocraithe nó luach gné airde a shonrú (e.g.,\\[0 0\\]in ionad\\[deireanach\\]) agus / nó a shonrú go athróg ar leith a graif.
In aon chás, beidh tú a úsáid beagnach i gcónaí\\[0 0\\],\\[deireanach\\], nó\\[0: deireanach\\]do na luachanna gné.
Mar shampla:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * Le haghaidhtabledapdatasets, Is iad na húsáidí is coitianta seo a shonrú athróg éagsúla a graif, raon ama réamhshocraithe éagsúla (i gcomparáid le anois, m.sh., &amp; am &amp; gt;=now-1ú lá) agus / nó suímh grafaicí réamhshocraithe éagsúla (e.g., cineál marcóra) .
Mar shampla:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Cuimhnigh gur gá duit a XML-ionchód nó faoin gcéad-ionchód (ceachtar ceann, ach ní araon) na ceisteanna réamhshocraithe ós rud é go bhfuil siad i doiciméad XML. Mar shampla, &amp; éiríonn &amp; ,&lt;thiocfaidh chun bheith &amp; lt;, agus ^ thiocfaidh chun bheith &amp; gt; .
Agus seiceáil do chuid oibre. Tá sé éasca a dhéanamh botún agus ní a fháil ar cad ba mhaith leat.
A bhuíochas le Charles Carleton, Kevin O'Brien, Luke Campbell, agus daoine eile.
    *   EDDGridÓ Dap,EDDGridÓ Erddap, agus EDDTableFromEDDGridTá córas nua chun déileáil le tacair sonraí a athrú go minic (chomh minic agus is garbh gach 0.5 s) . Murab ionann agusERDDAP's córas rialta, réamhghníomhach le haghaidh athlódáil go hiomlán gach tacar sonraí, tá an córas breise roghnach athghníomhach (spreagtha ag iarraidh úsáideora) agus incriminteach (ach cothrom le dáta an fhaisnéis nach mór a thabhairt cothrom le dáta) . Mar shampla, má tá iarraidh arEDDGridÓDap tacar sonraí a tharlaíonn níos mó ná an líon sonraithe milliseconds ó an nuashonrú deireanach,ERDDAP™a fheiceáil má tá aon luachanna nua don leftmost (de ghnáth"time") gné agus, más amhlaidh, ach a íoslódáil na luachanna nua roimh láimhseáil an t-úsáideoir iarratas. Tá an córas seo an-mhaith ag coinneáil sonraí atá ag athrú go tapa cothrom le dáta le héilimh íosta ar an bhfoinse sonraí, ach ar an gcostas a bhaineann le beagán moilliú síos ar phróiseáil roinnt iarrataí úsáideora. Féach [EN]&lt;updateEveryNMillis . (/ disciplíní / sonraí #updateeverynmillis)   
A bhuíochas le Michael Barry agus OOICI.
    *   EDDGridFromNcFiles, EDDTableFromNcFiles, agus EDDTableFromNcCFFiles tacaíocht anois[An tIomlán.ncml ml](/docs/server-admin/datasets#ncml-files)comhaid foinse in áit.nccomhaid. Buíochas le Jose B Rodriguez Rueda.
    * Le haghaidhEDDGridComhsheasmhacht,ERDDAP™Tacaíonn freastalaí nua Type = "dodsindex" rogha don tréith freastalaí Type an&lt;sourceUrls chlib. Oibríonn sé seo le leathanaigh ghréasáin go bhfuil liostaí de chomhaid laistigh&lt;réamh&lt;/ réamh agus go minic faoi bhunOPeNDAPlógó. Is sampla[ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html).
    * Do EDDTableFromSOStacaíonn anois le tag roghnach
```  
        <sosServerType>_serverType_</sosServerType>  
```
ionas gur féidir leat a shonrú ar an gcineálSOSfreastalaí freastalaí (amhlaidhERDDAP™Ní gá a figiúr sé amach) . Luachanna bailí&lt;Tá IOOS\\_NDBC, IOOS\\_NOS,OOSTethysagus WHOI (freastalaí nua-tacaíocht Cineál Cineál Cineál cineál) . Féach ar[EDDTableFromSOS](/docs/server-admin/datasets#eddtablefromsos). A bhuíochas le Derrick Snowden agus Janet Fredericks.
    * Gach duineEDDGridÓ...Rialacháin, EDDTableFrom...Rialacháin,EDDGridCóip, agus EDDTable Cóip tacaíocht anois tag roghnach
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
a insintERDDAP™a choinneáil ar an gcomhad Tábla Tábla (le faisnéis faoi gach comhad sonraí foinse) i gcuimhne in ionad díreach ar an diosca (taiseachas aeir: fliuch) . A choinneáil ar an fileTable i gcuimhne luasanna suas iarrataí ar shonraí (go háirithe má tá ^1000 comhaid sonraí foinse) , ach úsáideann cuimhne níos mó. Má leagtar tú seo a bheith fíor le haghaidh aon tacar sonraí, a choinneáil ar an tsúil ar an Cuimhne: faoi láthair ag baint úsáide as líne ag _yourDomain_/erddap/status.htmla chinntiú goERDDAP™fós tá neart cuimhne saor in aisce. A bhuíochas le Fredrik Stray.
    * Tacaíonn EDDTableFromASCIIFiles anois&lt;charset . An dá charsets is coitianta (cás íogair&#33;) Tá ISO-8859-1 (taiseachas aeir: fliuch) agus UTF-8.
    * Molta: i thus.xml, laistigh&lt;startHeadHtml ú, le do thoil athrú&lt;html isteach i
        &lt;html lang = "en-US" agus (nó difriúil[cód teanga](https://www.w3schools.com/tags/ref_language_codes.asp)má tá tú teachtaireachtaí aistrithe.xml) .
    * Tá setup.xml clibeanna roghnach nua chun codanna de dhíchumasúERDDAP:
        *   &lt;tiontairí Gníomhacha&lt;/ fógráin Gníomhacha&lt;&#33;- Is é an réamhshocraithe fíor - ^
        *   &lt;Barraí Sleamhnáin&lt;/ sciorrthóirí Gníomhacha&lt;&#33;- Is é an réamhshocraithe fíor - ^
        *   &lt;cliceáil grianghraf a mhéadú&lt;Baile Átha Troim&lt;&#33;- Is é an réamhshocraithe fíor -- × Go ginearálta, molaimid i gcoinne a shocrú ar aon cheann de na bréagach.
    * Sonraí a ghiniúint Xml scríobhann anois torthaí a _bigParentDirectory_ / logs / generateteDatasetsXmlLog.txt, Ní logáil.txt. A bhuíochas le Kristian Sebastian Blalid.
    * Sonraí a ghiniúint Xml anois a dhéanann moladh maith do na&lt;reload GachNMinutes . Go raibh maith agat as anNOAATionscadal UAF.
    * Feabhsuithe beaga go leor chun GenerateDatasetsXml. Go raibh maith agat as anNOAATionscadal UAF.

## Leagan 1.42{#version-142} 
 (scaoileadh 2012-11-26) 

*    **Gnéithe Nua:** 
    *    (Uimh gnéithe nua mór.) 
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * Má tá tú ag uasghrádú óERDDAP™1.38 nó 1.40, ní raibh aon athruithe a éilíonn tú athruithe a dhéanamh ar do chuid comhad cumraíochta (ach ní mór duit a bhaint as an nua teachtaireachtaí .xml comhad) .
    *   ERDDAP™arís is féidir a reáchtáil leJava1.6. (ERDDAP™v1.40 ag teastáilJava1.7.) Molaimid fós go láidir ag baint úsáide as an leagan is déanaí deJava1.7.
    * Cineál nua tacar sonraí,[EDDTableFrom Seirbhís do Chustaiméirí](/docs/server-admin/datasets#eddtablefromawsxmlfiles), is féidir sonraí a léamh ó shraith de Stáisiún Aimsir Uathoibríoch (Amharc ar gach eolas) XML comhaid sonraí. A bhuíochas le Lynn Dewitt agus an Exploratorium.
*    **Athruithe beaga / Fixes Bug:** 
    * Coigeartaigh athruithe ar an NDBCSOSfreastalaí sonraí foinse.
    * Coigeartaíodh athruithe ar na seirbhísí COOPS NOS ASCII.
    * Déanta roinnt athruithe beaga agus Ceartúcháin bug.

## Leagan 1.40{#version-140} 
 (scaoileadh 2012-10-25) 

*    **Gnéithe Nua:** 
    * Tá formáid comhaid aschur nua dotabledaptacar sonraí:.ncCFMA, a Sábhálann na sonraí a iarrtar i.nccomhad a chloíonn leis an CF[Diosca Geometris Sampling](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Roghanna Ilthoiseach Array, agus dá bhrí sin a chomhlíonann na teimpléid NODC\\[2021: anois an[NCEI teimpléid](https://www.ncei.noaa.gov/netcdf-templates)\\]chun an cineál sonraí seo a stóráil. Buíochas le NODC.
    *   tabledapIs féidir le hiarratais a chur san áireamh anois srianta ama ar nós &amp; am ×now-5days. Féach an[data recovery](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Buíochas le James Gosling.
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * Má tá tú ag uasghrádú óERDDAP™1.38, ní raibh aon athruithe a éilíonn tú athruithe a dhéanamh ar do chuid comhad cumraíochta (ach ní mór duit a bhaint as an nua teachtaireachtaí .xml comhad) .
    *   ERDDAP™Tá scaoileadh poiblí agus garspriocanna inmheánacha ar fáil trí[ERDDAP™ar GitHub](https://github.com/ERDDAP). Le haghaidh tuilleadh eolais, féach ar an[Féach ar Léarscáileanna](https://github.com/ERDDAP/erddap/wiki)do naERDDAP™tionscadal chomh maith leis an níos ginearálta[ERDDAP™Clár na dToghthóirí](/docs/contributing/programmer-guide). (Fógraíodh é seo ar leithligh cúpla seachtain tar éis anERDDAP™1.38 scaoileadh.) 
    * Sonraí a ghiniúint Tá Xml feabhsaithe.
        * Rinneadh athbhreithniú ar an script mar sin ba chóir é a bheith ag obair i gceart ar gach ríomhaire Linux (Ní hamháin cúpla) .
        * Cuireann sé anoiscreator\\_name,creator\\_email, aguscreator\\_urlaon uair is féidir.
        * Feabhsuithe beaga go leor eile.
    * Scagtha conasERDDAP™Déileálann le ham.
        * Go hinmheánach,ERDDAP™Láimhseálann anois amanna ag cruinneas millisecond (tréimhse saoil: ilbhliantúil) .
        * Is féidir leat a shonrú anois go roghnach an cruinneas ama le haghaidh tacar sonraí ar leith, féach[time\\_precision](/docs/server-admin/datasets#time_precision). Mar shampla, d'fhéadfá tacar sonraí a luachanna ama a thaispeáint le cruinneas dáta (e.g., 1970-01-01) .
        * Bainfidh do thacair sonraí reatha úsáid as na socruithe réamhshocraithe, mar sin tá siad gan choinne ag na hathruithe seo agus leanfaidh siad ar aghaidh ag taispeáint am le cruinneas soicind. A bhuíochas le Servet Cizmeli agus Philip Goldstein.
    *   [EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles)Is cineál nua tacar sonraí is féidir leat a úsáid i dodatasets.xmlcomhad. Is féidir é a léamh sonraí ó aon cheann de na formáidí comhaid iomadúla atá sainithe ag an[CF Diosca Geometris Sampling](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)coinbhinsiúin. A bhuíochas le NODC agus buíochas speisialta le Kyle Wilcox chun comhaid shamplach a dhéanamh le haghaidh líon mór formáidí comhaid DSG bailí agus chun iad a chur ar fáil go poiblí.
*    **Athruithe beaga / Fixes Bug:** 
    * Leathnaigh an[tapaidh](#quick-restart)córas go léir ábharthaEDDGridagus fo-aicmí EDDTable.
    * Doiciméid fheabhsaithe, go háirithe a bhaineann le conas a úsáid[cineál gas: in airde](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType)agus[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType)ó bogearraí cliant éagsúla.
    * Athraigh cuardach chun cinn chun tacú le minTime agus / nó maxTime in iúl mar epochseconds. Buíochas le Lynn Dewitt.
    * Athrú.htmlTableaschur chun URLanna a thaispeáint agus seoltaí ríomhphoist mar naisc.
    * Added "gaol =" agus "rev =" go ábhartha&lt;a href tags. Buíochas le Pat Cappelaere as anOGC RESTtionscadal.
    * Cosaint feabhsaithe i gcoinne iarrataí sonraí neamhréadaithe go mór, go háirithe laistightabledap, áit a bhfuil sé ina fhadhb níos deacra.
    * Tháinig teachtaireachtaí níos mó le teachtaireachtaí.xml.
    * Feabhsuithe luas Déanta.
    * Seasta SeastaEDDGridÓ Fianáin a cheadú aiseanna curtha in eagar. A bhuíochas le Maricel Etchegaray.
    * Bain tagairtí do iGoogle ó beidh sé a scor.
    * Déanta roinnt athruithe beaga agus Ceartúcháin bug.

## Leagan 1.38{#version-138} 
 (a scaoileadh 2012-04-21) 

*    **Gnéithe Nua:** 
    * ISO 19115 agus FGDC --ERDDAP™Is féidir a ghiniúint go huathoibríoch ISO 19115 agus FGDC XML comhaid meiteashonraí do gach tacar sonraí. Naisc chuig na comhaid le feiceáil ar gach liosta de na tacair sonraí (e.g., ó Iomlán Téacs Cuardaigh) agus freisin i Fillteáin Inrochtaine Gréasáin (WAF)   (féach ar an[FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/)agus[ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/)) . Buíochas le Ted Habermann, Dave Neufeld, agus go leor eile.
    * Iomlán cuardaigh téacs le haghaidh Datasets tacaíocht anois \\-_excludedWordagus \\- "_excluded frása_" . Buíochas le Rich Signell.
    * Cuardaigh le haghaidh tacar sonraí ar ais anois torthaí leathanach ag an am. Úsáideann an réamhshocraithe an teaghrán paraiméadar: leathanach = 1 &amp; rsquo; sPerPage = 1000, ach is féidir leat athrú ar na luachanna sa URL d'iarratas. Buíochas le Steve Hankin agus an tionscadal UAF.
    *   OpenSearch--ERDDAP™Tacaíonn sé anois[OpenSearch1.1](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html)caighdeán chun cuardach a dhéanamh le haghaidh tacar sonraí. I measc rudaí eile, ceadaíonn sé seo láithreán gréasáin comhiomlánaithe catalóg a dhéanamh cuardaigh a dháileadh (iarraidh chuardaigh a rith chuig gach catalóg a fhios aige faoi) .
    * Comma Meán Fómhair Luach (Téacsanna arna gcur síos:) Comhaid --ERDDAP™anois Gineann comhaid CSV le ach camóg idir luachanna (a fearr le Excel) , in ionad Coma + spás. Buíochas le Jeff deLaBeaujardiere.
    * Sonraí Milliún -- Rinneadh roinnt athruithe chun tacú leERDDAPs a bhfuil líon mór de datasets, b'fhéidir fiú milliún. Buíochas le Steve Hankin agus an tionscadal UAF.
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
#### Atosaigh go tapa{#quick-restart} 
*   [Amharc ar gach eolas](#quick-restart)Ceadaíonn córas atosú tapaERDDAP™atosú i bhfad níos tapúla.
     **Cuir seo le do chomhad thus.xml** ceart tar éis&lt;/ datasetsRegex ×:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Is féidir cuardach téacs iomlán le haghaidh tacar sonraí a dhéanamh anois leis an inneall cuardaigh Lucene (cé molaimid an t-inneall cuardaigh bunaidh má tá tú níos lú ná 10,000 tacar sonraí) nó an córas cuardaigh bunaidh.
         **Cuir seo le do chomhad thus.xml** ceart tar éis&lt;/ DisplayDiagnosticInfo bhéil:
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \\* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \\* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    * I thus.xml, is féidir leat / Níorbh fhéidir a chur anois dhá chatagóir nua leis an liosta coma-scartha de&lt;categoryAttributesú:
        * domhanda: eochairfhocail (cuir ceart é tar éis an domhain: inise) - cás speisialta nua a parses liosta coma-scartha de na heochairfhocail ó na heochairfhocail domhanda tréith a dhéanamh ar iontráil ar leith do gach eochairfhocal.
        * athraitheach Ainm an ainm (é a chur ag an deireadh) - cás speisialta nua a chatagóiríonn gach ceann de nadataVariable destinationNames.
    * I thus.xml, is féidir leat (ach cén fáth?) insintERDDAP™gan a thairiscint FGDC agus / nó ISO 19115 meiteashonraí d'aon tacar sonraí trí
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Tá na luachanna réamhshocraithe do na suímh seo fíor.
    * Idatasets.xml, le do thoil a mheas feabhas a chur ar na meiteashonraí do do tacar sonraí.ERDDAP™anois go huathoibríoch Gineann ISO 19115 agus FGDC XML comhaid meiteashonraí do gach tacar sonraí bunaithe ar meiteashonraí an tacar sonraí.
Mar sin,, **metadataset maith mar thoradh ar go maithERDDAPmeiteashonraí ISO 19115 agus FGDC.**   
         **Féach ar an doiciméadú nua le haghaidh an RECOMMENDED nua go leor[Ranníocaí Domhanda](/docs/server-admin/datasets#global-attributes).** 
    * Idatasets.xml, más mian leat a insintERDDAP™a úsáid réamh-déanta FGDC agus / nó ISO 19115 comhad go bhfuil áit éigin ar chóras comhaid an fhreastalaí in ionad a bheithERDDAP™na comhaid seo a ghiniúint, úsáid:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Más rud é _fullFileName_\\ = "" nó nach bhfuil an comhad le fáil, beidh an tacar sonraí aon FGDC agus / nó ISO 19115 meiteashonraí. Mar sin, tá sé seo úsáideach freisin más mian leat a bhaint as an FGDC agus / nó ISO 19115 meiteashonraí le haghaidh tacar sonraí ar leith.
    * Idatasets.xml, do gachEDDGridSideBySide agusEDDGridComhiomlán As Leagann Sonraí Toise, a dhéanamh cinnte go bhfuil tacair sonraí leanbh éagsúladatasetIDs ná a gcuid tacair shonraí tuismitheora agus ná na leanaí eile. (Mar shampla, d'fhéadfá córas simplí ach éifeachtach George Foreman a leanúint chun a chuid leanaí a ainmniú.) Má tá aon ainmneacha i dteaghlach díreach mar an gcéanna, beidh an tacar sonraí theipeann a luchtú (leis an teachtaireacht earráide nach bhfuil luachanna na haise comhiomlánaithe in ord sórtáilte) .
    * Idatasets.xml, bhí roinnt athruithe ar an liosta bailíioos\\_categorymeiteashonraí luachanna:
        * Athraíodh "pCO2" go "CO2".
        * Cuireadh "Aigéaneolaíocht Physical" leis.
        * Cuireadh "Soils" leis.
    * Idatasets.xml,ERDDAP™a thuilleadh is féidir '.' idatasetID. Ceadaíodh é ach discouraged. (An bhfuil cuntas agat?) 
    * Idatasets.xml, an thus do EDDTableFromThreddsFiles agus EDDTableFromHyraxTá comhaid athrú beagán toisc go raibh an dá rang ach athscríofa a bheith níos éifeachtaí (an dá rang a dhéanamh anois i gcónaí cóip áitiúil de gach ceann de na comhaid sonraí iargúlta) . Féach ar an doiciméadacht chun na ranganna seo a bhunú:[EDDTableFromHyraxAmharc ar gach eolas](/docs/server-admin/datasets#eddtablefromhyraxfiles)agus[Seirbhís do Chustaiméirí](/docs/server-admin/datasets#eddtablefromthreddsfiles). Go háirithe, féach na tuairimí athbhreithnithe faoi&lt;comhad a scriosadh (anois nach mbaineann) agus&lt;sourceUrlú (anois riachtanach) . Chomh maith leis sin, níor chóir duit an rang seo a fhilleadh i EDDTableCopy le haghaidh éifeachtúlachta.
    * Idatasets.xml, má úsáideann tú EDDTableFromDatabase leOraclebunachar sonraí, ba chóir duit a chur san áireamh nasc Maoin den sórt sin
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
a shonrú cé mhéad sraitheanna de na sonraí a rachadh ag am amháin toisc go bhfuil an réamhshocraithe 10, atá Uafásach neamhéifeachtach. Féach an[Oracledata recovery](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm). Is cosúil go bhfuil mainneachtainí níos fearr ag MySql agus PostgreSQL don suíomh seo. Buíochas le Kevin O'Brien.
    * Má úsáideann tú EDDTableFromDatabase, féach an feabhsaithe[Doiciméid "Speed"](/docs/server-admin/datasets#eddtablefromdatabase)le haghaidh moltaí breise chun feidhmíocht a fheabhsú. Buíochas le Kevin O'Brien.
    * Idatasets.xml, do gach EDDTable... tacar sonraí, sna Coinbhinsiúin agusMetadata\\_Conventionstréithe domhanda, féach ar CF-1.6 (ní CF-1.0, 1.1, 1.2, 1.3, 1.4 nó 1.5) , ós rud é CF-1.6 Is é an chéad leagan a chur san áireamh na hathruithe a bhaineann leis an Céimseata Sampling Discrete.
    * Ríomhchláraitheoirí atá ag ríomhERDDAP™cód gá a chur le lib / lucene-core.jar leis an liosta de na comhaid próca ina javac agus cosáin líne ordú java.
    *   ERDDAP™Tá[new service](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html)a thiontú CF Caighdeán Ainm go / ó GCMD Eolaíocht Eochairfhocal. Is féidir leat teacht ar an úsáideach nuair a ghiniúint eochairfhocail domhanda meiteashonraí do na tacair sonraí i doERDDAP.
    * Déileáil le Bots -- Léigh an chomhairle seo le do thoil[cosc bots ó crawling doERDDAP™ar bhealach dúr](/docs/server-admin/additional-information#robotstxt).
    * Aistriúchán - An téacs arERDDAP's leathanaigh ghréasáin anois den chuid is mó i messages.xml agus mar sin oiriúnach le haghaidh aistriúcháin go teangacha éagsúla (e.g., Gearmáinis, Fraincis) . Na teachtaireachtaí a úsáid anois go minic TeachtaireachtFormat le haghaidh formáidiú, chomh maith chun cabhrú i aistriúcháin a dhéanamh. Má tá suim agat a dhéanamh aistriúchán, le do thoil ríomhphosterd dot data at noaa dot gov.
    * Samplach Samplachdatasets.xml-- Bhí roinnt earráidí beaga ach suntasach sa sampladatasets.xml. Má úsáideann tú na tacair shonraí sin, gheobhaidh tú na leaganacha níos nuaí ón sampla nuadatasets.xmlsa erddapContent nua.zipcomhad. Buíochas le James Wilkinson.
    * Git -- Beidh mé iarracht crua a dhéanamhERDDAP™tionscadal GitHub ASAP tar éis an scaoilte seo.
*    **Athruithe beaga / Fixes Bug:** 
    * Tá pailéad nua, OceanDepth, úsáideach do luachanna doimhneacht (Is maith liom é) , m.sh., 0 (taiseachas aeir: fliuch) go 8000 (domhain) .
    * An bhfuil.kmlaschur ótabledapÚsáideann deilbhín marcóir níos fearr (Níl an Tweet seo ar fáil) . Agus a dhéanann hovering thar marcóir anois níos mó é.
    * EDDTableFromFiles -- Sa uasghrádú deireanach, bhí srianta níos déine ag an leabharlann glancdf-java nua le haghaidh ainmneacha athraitheacha i.nccomhaid. Sin de bharr fadhbanna do EDDTableFromFiles má athrógsourceNameBhí carachtair poncaíochta áirithe. Tá EDDTableFromFiles mhodhnú anois chun an fhadhb sin a sheachaint. Buíochas le Thomas Holcomb.
    * Tacaíonn an leathanach suaite anois 0/10/100/1000/10000/100000 in ionad bosca seiceála le haghaidh Sonraí Gaolmhara. Tugann an tooltip rabhadh go bhféadfadh 100000 a bheith ina chúis le do bhrabhsálaí chun tuairteála. A bhuíochas le Annette DesRochers, Richard (A bheith ina) Coughlin, agus an IOOS Tionscadal Bitheolaíochta.
    * .../níos airde/níos airdedatasetID_ / leathanaigh ghréasáin innéacs.html thaispeáint anois URLanna agus seoltaí ríomhphoist mar naisc clickable. Go raibh maith agat le Richard (A bheith ina) Coughlin agus Tionscadal Bitheolaíochta IOOS.
    * Bug shocrú: Itabledap, le haghaidh tacar sonraí le airde Trasfhoirmeoir Ola&lt;0, láimhseáladh ceisteanna le srianta airde go mícheart. Buíochas le Kyle Wilcox.
    * Bug shocrú:EDDGridTacaíonn Comhiomlán Ó ExistingDimension anois le URLanna Teachtaí Dála níos éagsúla. Go raibh maith agat?

## Leagan 1.36{#version-136} 
 (a scaoileadh 2011-08-01) 

*    **Gnéithe Nua:** 
    * Níl aon athruithe suntasacha ó seasamh úsáideora.
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * An tacar sonraí pmelTao a úsáideadh go minic mar an tacar sonraí sampla dontabledap  
Níl cáipéisíocht ar fáil a thuilleadh.ERDDAP™riarthóirí MUST a dhéanamh ar na hathruithe:
        * I do chuiddatasets.xml, má tá túdatasetID= "pmelTao" tacar sonraí, cuir
gníomhach = "false" ceart roimh an " ^" ag deireadh na líne sin.
        * I do thus.xml, más rud é do&lt;Sonraí Teagmhála Is pmelTao, ansin:
            * Má tá dodatasets.xmlnach bhfuil tacar sonraí ledatasetID= "erdGlobecBottle", cuir
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * I do thus.xml, in ionad gach ceann de na clibeanna ó&lt;Sonraí Teagmhála trí mheán
                &lt;EDDTableMatlabPlotExample le
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \\[baseUrl\\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    * I gcás tacar sonraí ina bhfuil an cineál fo-aicme EDDTableFromFiles, is féidir leat sonraí a dhéanamh anois ó mheiteashonraí.
Go sonrach, is féidir leat a dhéanamh anois athróg ó na luachanna tréith de cheann de na hathróga bunaidh.
Mar shampla, idatasets.xml, laistigh de&lt;dataVariablechlib, má úsáideann tú
```
        <sourceName>variable:cruise:PI</sourceName>  
```
        ERDDAP™a dhéanamh athróg le luachanna an tréith PI an athróg Cruise.
Buíochas le WOD.
*    **Athruithe:** 
    * Athruithe beaga

## Leagan 1.34{#version-134} 
 (scaoileadh 2011-06-15) 

*    **Athruithe:** 
    * Bug shocrú: Seasta leak cuimhne a tharla ar roinnt 64-giotánJavasuiteálacha.
    * Bug shocrú:ERDDAP™anois leagann i gceart na tréithe domhanda nuair a raon luachanna an ghné domhanleithead ó ard go íseal: geospatial \\_lat\\_min, geospatial \\_lat\\_max, Southernmost\\_Northing, Tuaisceart\\_Northing.
        
Tabhair faoi deara goactual\\_rangegan athrú: d'fhéadfadh luachanna íseal, ard nó luachanna ard, íseal a bheith aige, ós rud é go bhfuil sé beartaithe an raon agus an t-ord stórála a chur in iúl.
        
    * Athruithe beaga.
    *   ERDDAP™Ní gá riarthóirí a dhéanamh ar aon athruithe ar a n-up.xml nódatasets.xml.

## Leagan 1.32{#version-132} 
 (a scaoileadh 2011-05-20) 

*    **Athruithe:** 
    * Tacaíocht do na Geometries nua- ndaingnithe CF Discrete Sampling (nach bhfuil ar an drochuair ar fáil go fóill ar líne) , a thagann in ionad na gCoinbhinsiún breathnadóireachta Pointe CF atá beartaithe.
        ERDDAP™Beidh úsáideoirí a fheiceáil go bhfuil cdm\\_feature\\_type = Céim in ionad ag TimeSeries agus tá athruithe beaga ar na comhaid a cruthaíodh le haghaidh.ncCF cineál comhaid (cothrom \\_dimension ar a dtugtar anois sampla \\) .
        ERDDAP™Beidh riarthóirí gá a dhéanamh ar na hathruithe idatasets.xml:
        * cdm\\_data\\_type = Ba chóir an chéim a athrú go cdm\\_data\\_type = TimeSeries.
        * Ba chóir cdm\\_data\\_type = StationProfile a athrú go cdm\\_data\\_type = TimeSeriesProfile.
        * Ba chóir cdm\\_station\\_variables a athrú go cdm\\_timeseries\\_variables.
        * cf\\_role = Ba cheart stáisiún\\_id a athrú go cf\\_role =timeseries\\_id.
    * Nuashonraithe go deireanachioos\\_categoryroghanna: "Ullmhóidí Orgánacha Scurtha", "pCO2", "Stream Shreabhadh", "Iomlán ar Fáil".
    * Réiteach féideartha le sceitheadh cuimhne féideartha ar 64-giotánJava.\\[Ní raibh sé ag obair.\\]
    * Athruithe beaga.

## Leagan 1.30{#version-130} 
 (a scaoileadh 2011-04-29) 

*    **Gnéithe Nua:** 
    * Tacaíocht do 64-giotánJava. Nuair a úsáidtear le 64 giotánJava,ERDDAP™Is féidir a úsáid anois i bhfad níos mó cuimhne carn agus a láimhseáil go leor iarrataí níos comhuaineach.
    * Tacaíocht do.nciarratais comhad suas go dtí 2GB (fiú gan 64-giotánJava) trí úsáid níos fearrERDDAP's láimhseáil sonraí i smután.
    * Feabhsuithe luas 2X go leor sa chód agus ups luas 2X óJava1.6 a dhéanamhERDDAP™2X go 4X níos tapúla ná roimhe.
    * Feabhsuithe a shábháil Cuimhne i bhfad níos ísleERDDAP's úsáid cuimhne bonn.
    * Le haghaidh tacar sonraí tabular,ERDDAP™Tá anois go hiomlán ar an eolas faoi cdm \\_data\\_type, agus conas na léarscáileanna sonraí don chineál CDM. Féach an[CF Discrete Sampling Geometris sonraíocht](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). B'fhéidir roinnt lá go luath, go mbeidh comhad Word a thiontú go .html agus in ionad an reatha "OBSOLETE" faisnéis ar an leathanach gréasáin. Go raibh maith agat as anNOAATionscadal UAF.
    * Maidir le tacair shonraí is EDDTable, rogha cineál comhaid aschuir nua,.ncCF, Cruthaíonn Ragged Contiguous Array.nccomhaid atá i gcomhréir leis an leagan is déanaí de na[CF Discrete Sampling Geometries coinbhinsiúin](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Tá na comhaid struchtúrtha a léiriú ar an gcineál sonraí CDM an tacar sonraí. Ós rud é gur athraigh na coinbhinsiúin atá beartaithe díreach, mar an scríbhinn seo, ní thacaíonn an leabharlann netcdf-java go fóill leis na formáidí comhaid cruthaithe agERDDAPagus iad a léirmhíniú mar chomhaid sonraí CDM. Beidh sé dócha go luath. Go raibh maith agat as anNOAATionscadal UAF.
    * An View : Is rogha Sonraí ar an leathanach gréasáin .subset anois liosta anuas go ligeann d'úsáideoirí a shonrú ar an líon uasta na sraitheanna de shonraí ar leith a bheidh le feiceáil (réamhshocraithe = 1000) . An t-athrú, agus daoine eile, a cheadúERDDAP™a bheith ag obair le tacair sonraí a bhfuil líon an-mhór na sraitheanna de shonraí ar leith. (Tá líon na luachanna uathúla d'aon athróg amháin fós ceist, ach is féidir é a bheith ard go leor (20,000?) roimh an .subset agus leathanaigh ghréasáin eile luchtú i ndáiríre go mall.) Go raibh maith agat as anNOAATionscadal UAF.
    * . Tá rogha nua ag leathanaigh ghréasáin: Féach ar Chomhairlí Sonraí Dáilte. A bhuíochas leis an tionscadal GTOPP.
    * Chun cabhrú le húsáideoirí, na luachanna ar leith (e.g., ainmneacha stáisiúin) Tá sé léirithe anois ar na Foirmeacha Déan-A-Graph agus Rochtain Sonraí. Go raibh maith agat as anNOAATionscadal UAF.
    * .transparent Iarratais Png tacaíocht anois gach cineál graif agus uiríll sonraí. Tarraingíonn sé ach na sonraí - gan aon aiseanna, finscéalta, talamh, nó aon rud eile. Déanann sé seo is féidir íomhánna a dhéanamh mar sraitheanna de trédhearcach Pngs. Má &amp; méid =|Tá hocht_ sonraithe sa cheist (molta molta) , tá sé onóir. Is é an réamhshocraithe picteilíní 360x360. Is é an eisceacht amháinEDDGrid&amp; .draw = dromchla, áit a bhfuil an réamhshocraithe (mar a bhí roimh) Is íomhá le ~ 1/pixel in aghaidh an phointe sonraí (suas go dtí 3000 x agus pixel y) . Buíochas le Fred Hochstaedter.
    * An bhfuilWMSleathanaigh ghréasáin a thaispeáint anois ar an barra dath do athróg na tacar sonraí (s s) . A bhuíochas le Emilio Mayorga agus daoine eile.
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * Baineann an scaoileadh a lán athruithe. Tá siad go léir tábhachtach. Tabhair othar agus obair trí gach ceann de na hathruithe atá liostaithe thíos.
    * Tá an leagan á bhrú amach níos luaithe ná mar atá beartaithe chun déileáil le roinntJavabugs slándála. Ar an drochuair, roinnt gnéithe/socruithe atá beartaithe donERDDAP™Níl leagan sa leagan seo. Tá brón orainn. Tá súil agam go mbeidh an chéad leagan eile a bheith sách luath (agus i bhfad níos éasca a uasghrádú chun) .
    * A sheachaint roinnt bugs slándála iJava6 cothrom le dáta 23 agus thíos, íoslódáil agus a shuiteáil an leagan is déanaí deJava  (Java6 cothrom le dáta 24 nó níos airde) . Má tá córas oibriúcháin 64-giotán agat, cuir leagan 64-giotán deJava.
    * Má tá tú ag baint úsáide as Tomcat 5, MUST tú uasghrádú a Tomcat 6 nó 7 (fearr leat) . Má tá tú ag baint úsáide as Tomcat 6, mheas uasghrádú go dtí Tomcat leagan 7.
    * Lean na treoracha go léir le do thoil[a chur ar bun nuaERDDAP™](/docs/server-admin/deploy-install), ach nuair is ábhartha, beidh tú ag comhaid a chóipeáil ó do sheansuiteáil go dtí an tsuiteáil nua, go háirithe an\\[taiseachas aeir: fliuch\\]/ Content/erddap eolaire agus comhaid. Mar chuid de sin, tabhair faoi deara an[moltaí nua bunaithe Tomcat](/docs/server-admin/deploy-install#tomcat).
    * Tá an erddap.cs réamhshocraithe san áireamh anois sa chomhad erddap.war.
        * Chun an erddap.cs réamhshocraithe a úsáid, **scriosadh scriosadh** do shean\\[taiseachas aeir: fliuch\\]/ Content/erddap/images/erddap.cs .
        * Má modhnaíodh thú\\[taiseachas aeir: fliuch\\]/ Content/erddap/images/erddap.cs, agus ba mhaith liom a choinneáil ag baint úsáide as: ach é a fhágáil i bhfeidhm agus in ionad an&lt;ionchur × alt le:
```
            /\\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \\*/  
            input\\[type=button\\], input\\[type=submit\\], button {  
              margin:0px; padding:0px 3px; }  
            input\\[type=checkbox\\], input\\[type=password\\],  
              input\\[type=text\\], select, textarea {  
              margin:0px; padding:0px; }  
            input\\[type=radio\\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    * I do chuid\\[taiseachas aeir: fliuch\\]/ ábhar / caipín / setup.xml:
        * Athraigh na tuairimí agus clibeanna a bhaineann le&lt;páirteachRequestMaxBytes ú agus&lt;cliceáil grianghraf a mhéadú le
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \\-->
```
        * In ionad na tuairimí a bhaineann le&lt;categoryAttributes× agus a mheas mhodhnú an chlib luach:
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\\_category/index.html  
            (ioos\\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \\-->  
            <categoryAttributes>global:institution, ioos\\_category,  
            long\\_name, standard\\_name</categoryAttributes>  
```

Bláthanna faoi dhíon&lt;categoryAttributesbhéil atá tréithe domhanda anois MUST a aithint tríd an réimír domhanda: (e.g., domhanda: striapachas) . tréithe eile Glactar leis a bheith tréithe athraitheacha (e.g.,standard\\_name) . Chomh maith leis sin, luachanna institiúid (na cinn amháin) fágadh sa chás bunaidh. Anois go léir luachanna catagóir a thiontú go níos ísle.
    * I do chuid\\[taiseachas aeir: fliuch\\]/ ábhar / caipín /datasets.xml:
        * Mór CURTHA:ERDDAP™Tá ceanglais nua a bhaineann le tacar sonraí tabular ar cdm\\_data\\_type. Go suntasach, tá gach MUST tacar sonraí na meiteashonraí agus athróga ceart a bhaineann leis an cdm\\_data\\_type. Más rud é nach, ní bheidh an tacar sonraí a luchtú agus caithfidh sé earráid. Féach an doiciméadú le haghaidh[Táirgí do bhfianaise faoi stiúir glan](/docs/server-admin/datasets#cdm_data_type).
        * FYI: Tá cineál nua tacar sonraí: EDDTableFromAsciiServiceNOS.
        * FYI: Tá trí chead nuaioos\\_categoryRoghanna: Hidreolaíocht, Cáilíocht (e.g., le haghaidh bratacha cáilíochta) , agus Staitisticí (e.g., ciallóidh) .
        * Do EDDTableFrom... Comhaid tacar sonraí, bain aon&lt;Toisí uaire tags. Níl gá leo a thuilleadh nó a úsáidtear.
        * Do athróga ledestinationName= oidhreacht,ERDDAP™a thuilleadh fórsaí nalong\\_namea bheith Altitude. Le do thoil dul trí dodatasets.xmlagus arís eile cuardach a dhéanamh&lt;destinationNamebhéil agus cuir leis an athróg sin&lt;addAttributesú:
```
              <att name="long\\_name">Altitude</att>  
```
             (nó beagán difriúillong\\_namei gcásanna speisialta) .
        * Roghnach: Gach fo-aicmí EDDTableFromFiles tacaíocht athróg[sourceName= domhanda:...](/docs/server-admin/datasets#global-sourcenames)a thiontú meiteashonraí domhanda ó gach comhad i athróg sonraí. Buíochas le Lynn DeWitt.
    * EDDTableFromDatabase users --ERDDAP™Tagann sé le tiománaí nua JDBC 4 do Postgres. I gcás bunachair shonraí eile, seiceáil ar an ngréasán le haghaidh an comhad JDBC is déanaí. Ós rud éERDDAP™úsáidí anoisJava1.6+, JDBC 4 (nach bhfuil 3) Tá sé molta dócha.
    * FYI
        *   EDDGridÓ...Rialacha agus EDDTable Ó... Comhaid tacar sonraí a stóráil anois an t-eolas comhad a stóráil i
            \\[Treoir do Thuismitheoirí\\]/ tacar sonraí Eolas faoin gComhairle\\[datasetID\\]/\\*.nccomhaid.
Chomh maith leis sin, EDDTable datasets stóráil anois an t-eolas fo-thacar i
            \\[Treoir do Thuismitheoirí\\]/ tacar sonraí Eolas faoin gComhairle\\[datasetID\\]/\\*.nccomhaid. Na comhaid a úsáidtear chun
            \\[Treoir do Thuismitheoirí\\]/ tacar sonraí Eolas faoin gComhairle\\[datasetID\\].\\*.jsoncomhaid.
Scriosfar na seanchomhaid go huathoibríoch nuair a bheidhERDDAP™Tosaíonn suas. Nó, Is féidir leat a scriosadh gach comhad (ach fág na subdirectories folamh) i\\[Treoir do Thuismitheoirí\\]/ datasetInfo /.
        * D'oibrigh mé ar EDDTableFromNcCFFiles nua a léamh sonraí ó chomhaid áitiúla agus iargúlta ag baint úsáide as na Coinbhinsiúin atá beartaithe, CF Point Bhreathnóireachta nua. Ach nach bhfuil sé sa scaoileadh. Tá fadhbanna sna leabharlanna netcdf-java a bhaineann le roinnt modhanna chun na comhaid seo a léamh. Agus bhí roinnt athruithe an-luath ar na Coinbhinsiúin CF Observation atá beartaithe. Nuair a bheidh an leabharlann netcdf-java socraithe agus cothrom le dáta go dtí an togra is déanaí, beidh mé ag obair arís ar seo.
        * Ag rithERDDAP™ar Windows d'fhéadfadh fadhbanna a bheith: go háirithe, is féidir leat a fheiceáil i\\[mór-Treoir / logs / log.txt comhad aERDDAP™uaireanta in ann a scriosadh agus / nó comhaid a athainmniú go tapa. Tá sé seo mar gheall ar bogearraí antivirus (e.g., ó McAfee agus Norton) atá ag seiceáil na comhaid le haghaidh víris. Má ritheann tú isteach an fhadhb seo (is féidir a fheiceáil ag teachtaireachtaí earráide i gcomhad log.txt cosúil le "Ní féidir a scriosadh...") , d'fhéadfadh athrú ar an bogearraí antivirus socruithe a mhaolú go páirteach ar an bhfadhb.
Má tá anERDDAP™i Windows ach tástáil ag rith ar do dheasc, tá sé seo ach annoyance.
Má tá anERDDAP™Is é Windows do phobalERDDAP™, mheas athrú chuig freastalaí Linux.
    * Sreabhadh An Chéad tosaithe -- An chéad uair a ritheann túERDDAP™tar éis uasghrádú,ERDDAP™d'fhéadfadh a bheith mall a luchtú na tacair sonraí. An bealachERDDAP™siopaí faisnéis faoi chomhaid comhiomlánaithe Tá athrú, mar sinERDDAP™beidh gá a ath-léamh roinnt eolais ó gach ceann de na comhaid. Tógfaidh sé sin am.
    * Earráidí ar Startup -- Mar gheall ar na hathruithe a bhaineann le cdm\\_data\\_type, is dócha nach mbeidh roinnt de do datasets ualach agus beidh earráidí caith. Léigh go cúramach ar an ríomhphost Tuairisc Laethúil goERDDAP™Cuireann tú nuair aERDDAP™críochnaithe ag tosú. Beidh liosta de na tacair shonraí nach raibh ualach (ag an mbarr) agus an chúis nach raibh siad ualach (in aice leis an bun) .
    * Má fhaigheann tú i bhfostú nó má tá ceisteanna eile agat, cuir ríomhphost chuig na sonraí dom:erd.data at noaa.gov.
    * Clár na dToghthóirí -- Má scríobhann túJavacláir a reáchtáilERDDAP™cód, ní mór duit a athrú ar roinnt de na tagairtí paraiméadar ordú líne:
        * Athrú joda-am-1.6.2.jar go joda-am. jar
        * Athraigh an Postgres JDBC .jar tagairt do postgresql.jdbc.jar
*    **Athruithe Beaga agus Fisicí Bug:** 
    
    * Láimhseáil nasc feabhsaithe chun snáitheanna crochadh a sheachaint.
    * Cleachtais concurrency feabhsaithe a láimhseáil beagnach iarrataí comhionann comhuaineach níos éifeachtaí.
    *   ERDDAP™anois úsáideann netcdfAll-4.2.jar (athainmníodh a netcdfAll-latest. jar) . An t-athrú gá roinnt athruithe inmheánacha agus ba chúis le roinnt athruithe seachtracha beag, m.sh., athruithe ar conas comhaid grib a léamh agus athruithe beag bídeach ar na.ncAschur header.
    * Gné nua:\\[erddap\\]/ inveirteabraigh / scoilteanna.FIPScóid chontae go/ó ainmneacha contae.
    * Ar léarscáileanna, tá teorainneacha stáit anois violet dorcha, mar sin seasann siad níos fearr ar gach dathanna cúlra.
    * Tabular.kmlaschur arís úsáideann deilbhín ciorclach chun pointí a mharcáil (Nach bhfuil an deilbhín eitleán Google athrú le déanaí go) .
    * Athraíodh na tacair shonraí erdCalcofi agus déantar iad a sheirbheáil anois ó chomhaid áitiúla (níos tapúla) .
    * Sonraí a ghiniúint Xml ó taiseachas aeir: fliuch Catalog Cruthaíonn anois comhad torthaí:
        \\[taiseachas aeir: fliuch\\]An bhfuil a fhios agat na buntáistí a bhaineann...EDDGridÓ ThreddsCatalóg.xml . Buíochas le Kevin O'Brien.
    * Sonraí a ghiniúint Xml ó taiseachas aeir: fliuch Catalog iarracht anois a bhaint uimhreacha port gan ghá ó na URLanna foinse (e.g., :8080 agus :8081 Is féidir a bhaint uaireanta) . Go raibh maith agat asNOAAfoireann slándála lárnach.
    * Le haghaidh leathanaigh gréasáin .subset, tá an Léarscáil de Sonraí Déiríochta anois raon lat athraitheach lon.
    * Roinnt liostaí iERDDAP™  (e.g., an tábla a léiríonn na tacair sonraí go léir) curtha in eagar ionas go A..Z curtha in eagar roimh..z. Anois tá siad ar bhealach cás-íogair.
    * Athruithe beaga ar na leathanaigh ghréasáin .subset, lena n-áirítear: aonaid le fios anois.
    * Sonraí a ghiniúint Xml agus DasDds a thuilleadh caith eisceacht más ann a chur ar na torthaí ar an clipboard córas nó DisplayInBrowser. A bhuíochas le Eric Bridger agus Greg Williams.
    * Bug shocrú: Nuair a bhíonn tacair sonraí luchtaithe,ERDDAP™anois cuireann nó a choigeartú na tréithe domhanda geospatial. Buíochas le Charles Carleton.
    * Bug shocrú: String2.getClassPath () anois i gceart faoin gcéad-decodes an rang Toir agus Crainn (go háirithe, ar Windows, bhí spásanna sa ainm comhaid le feiceáil mar %20) . An tionchar seoERDDAP™EDStatic glaoch SSR.getContextDirectory () agus ábhar/muirear a aimsiú. Buíochas le Abe Coughlin.
    * Bug shocrú: i EDDTableFromFiles a bhaineann le láimhseáil getDataForDapQuery ar leith () iarratais. Buíochas le Eric Bridger.
    * Bug shocrú:tabledapNí raibh iarratais láimhseáil i gceart srianta airde nuair a bheidh an tacar sonraí ar airde Bhí MetersPerSourceUnit -1. Buíochas le Eric Bridger.
    * Bug shocrú: EDDTableFrom... Comhaid tacar sonraí a láimhseáil anois i gceart iarratais lena n-áirítear = NaN agus &#33;=NaN.
    
## Leagan 1.28{#version-128} 
 (scaoileadh 2010-08-27) 

*    **Gnéithe Nua:** aon cheann.
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** aon cheann.
*    **Bug Fix:** Fix botún cláir (ach amháin i bhfíor 1.26) a rinneadhERDDAP™an-mhall.
     

## Leagan 1.26{#version-126} 
 (scaoileadh 2010-08-25) 

*    **Gnéithe Nua:** aon cheann.
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * As do chuid\\[taiseachas aeir: fliuch\\]/ ábhar / breiseán / setup.xml,
        * I&lt;dlíthíocht, ar líne nua thíos\\[caighdeán caighdeánach Amharc ar gach eolas\\]cuir isteach\\[caighdeán Teagmháil\\].\\[caighdeán Teagmháil\\]tagairt don&lt;adminEmail bhéil sonraithe níos airde suas i thus.xml.
        * Bain úsáid as&lt;tábla ComponBGColor ú agus&lt;tábla HighlightBGColor .
        * Molta: Athraigh agus Athraigh&lt;Deireadh an chomhrá
```
            <endBodyHtml><!\\[CDATA\\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \\]\\]></endBodyHtml>
```

    * Riachtanach: Chun do\\[taiseachas aeir: fliuch\\]/ Content/erddap/images/erddap.cs agus erddapAlt.cs, cuir ag bun:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Bug Fixes agus Athruithe Beaga:** 
    
    * Bug shocrú: i gcásanna áirithe, ní raibh foirmeacha ag obair i roinnt leaganacha de Internet Explorer. Go raibh maith agat go mór le Greg Williams.
    * Bug shocrú: Ní raibh na cnaipí Make A Graph ag obair má bhí an tacar sonraí ó iargúltaERDDAP.
    * Bug shocrú:WMSuaireanta nach raibh ag obair má bhí an tacar sonraí ó iargúltaERDDAP.
    * A lán athruithe beaga agus Ceartúcháin bug.
    

## Leagan 1.24{#version-124} 
 (scaoileadh 2010-08-06) 

*    **Gnéithe Nua:** 
    * Nuashonraithe go deireanach[leathanaigh ghréasáin subset](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html)úsáid cuardaigh faceted a roghnú fo-thacar de tacair sonraí tabular. Buíochas le POST.
    * Nuashonraithe go deireanach[Cuardaigh ard](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html)chéile gach ceann de na roghanna cuardaigh eile agus cuireann domhanfhad, domhanleithead, agus boscaí ama faoi cheangal. Buíochas le Montgomery Ellyn. (Tá brón orainn don mhoill.) 
    * Nuashonraithe go deireanach[Tiontaigh Am](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)leathanach gréasáin agus seirbhís lig tú a thiontú amanna uimhriúil go / ó amanna teaghrán ISO.
    * Nuashonraithe go deireanach[Aonaid Tiontaigh](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)leathanach gréasáin agus seirbhís lig tú thiontúUDUNITSgo dtí / ó aonaid UCUM. Go raibh maith agatNOAAIOMLÁNSOS.
    * Má tátabledapÁirítear iarratas &amp; aonaid ("UCUM") , Beidh na hainmneacha aonaid a thiontú ó ainmneacha bunaidh (de ghnáthUDUNITS) go dtí[taiseachas aeir: fliuch](https://unitsofmeasure.org/ucum.html)ainmneacha aonad. Ní bhaineann sé seo ach le haonaid\\*ainmneacha ainmneacha\\*, ní luachanna sonraí. Go raibh maith agatNOAAIOMLÁNSOS.
    * Feabhsúcháin a dhéanamh leathanaigh ghréasáin Graph agus graif agus léarscáileanna:
        * Má tá an graf léarscáil, tá cnaipí A Graph nua a dhéanamh chun súmáil isteach / amach agus rogha nua a cliceáil a athrú lárphointe an léarscáil. Buíochas le POST.
        * Chuir socruithe Scagaire in aice leis an mbun. Buíochas le Greg Williams.
        * Tugadh suas chun dáta na comhaid sonraí cósta a tógadh go GSHHS v2.0. Buíochas le POST.
        * I measc na léarscáileanna anois tá lochanna agus aibhneacha. Buíochas le POST. (Tá brón orainn, an Abhainn Ró-Naofa Delta ar iarraidh mar gheall ar nach bhfuil na sonraí cósta ná an loch / sraith sonraí le déileáil leis.) 
        * An tógtha i pscoast-derived náisiún / comhaid stáit Tugadh suas chun dáta. Buíochas le POST.
        * Rinneadh modhnú ar Topagrafaíocht.cpt beagán. (Tá brón orm má théann an drochthionchar ort.) Buíochas le POST.
        * I dhéanamh griddap ar A Graph, má athraíonn úsáideoir athróg, tá an fhoirm a athchur go huathoibríoch ionas go mbeidh anaxisVariables ' showStartAndStop léiríonn i gcónaí na hathróga graf. Go raibh maith agat chun Trinanes Joaquin.
        * Do png agus pdf URLanna íomhá:
            * Nua &amp;.land =_value_, áit ar féidir _value_ a bheith "faoi" (topagrafaíocht) nó "os cionn" (ach a thaispeáint bathymetry) . Mura sonraítear, socraítear an mhainneachtain ag[drawLandMask](/docs/server-admin/datasets#global-drawlandmask)idatasets.xmlnó thus.xml. Buíochas le POST.
            * Nua: línte sa finscéal atá ró-fhada atá briste go huathoibríoch i línte éagsúla. Buíochas le POST.
        * I gcás URLanna íomhá png:
            * Nua &amp;.legend =_value, áit ar féidir _value_ a bheith "Bottom" (cineál gas: in airde) , "Off" nó "Only". Ligeann sé seo duit an finscéal san áireamh, eisiamh an finscéal, nó a fháil ach an finscéal. Buíochas le Cara Wilson.
            * Nua agus imeall Pixels_ duilleoga teorainn nPixels (e.g., 10) ag bun an íomhá. Tá sé i bhfeidhm tar éis .legend = Off. Buíochas le Cara Wilson.
            * Nua agus méid =|_ ligeann hocht_ tú a shonrú ar an leithead agus airde don íomhá, i picteilíní.
    * formáidí comhaid aschur nua:
        * .csvp agus.tsvp -- cosúil le .csv agus.tsv, ach le " (aonaid) " a chuirfear i gceangal le hainmneacha colúin ar an gcéad líne.
        * .odvTxt - a dhéanann .txt comhad a shimpliú ag fáil sonraí isteach[Aigéan Sonraí Féach ar an roghchlár (ODV) ](https://odv.awi.de/).
        * .esriCsv - a dhéanann .csv comhad oiriúnach le haghaidh iompórtáil i ESRIArcGIS. (tacair sonraí tabular amháin) A bhuíochas le Jan Mason, Jeff de La Beaujardiere, agusNOAAIOMLÁNSOStionscadal.
    * Feabhsuithe GUI ar an[Categorize](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html)leathanaigh ghréasáin. Chomh maith leis sin, na luachanna catagóiriú (seachas foras) tá siad anois ar fad níos ísle. Glactar le hiarrataí neamh-ísealchása (atreorú) do comhoiriúnacht ar gcúl. Buíochas le Roy Mendelssohn.
    * Tá teachtaireachtaí Earráid anois níos giorra agus níos dírithe ar úsáideoirí. Buíochas le Greg Williams.
    * Athrú inmheánach a laghdaíonn go mórERDDAP's úsáid cuimhne bonn.
    * Go leor gnéithe nua nach mbaineann ach leis an tionscadal POST.
*    **Cad a bhí mícheart leis an láithreánERDDAP™Riarthóirí An riachtanas is gá a fhios agus a dhéanamh:** Tá go leor athruithe ann. Tá brón orainn. Ach tugann gach duine roinnt buntáistí deas.
    * Athruithe móra ar GenerateDatasetXml - is minic a iarrann sé níos mó ceisteanna (féach an ábhartha[dataset Cineálacha](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types)Eochairfhocal information) agus anois gineann i gcónaí go bunúsach réidh le húsáid ábhar le haghaidhdatasets.xml. Tá tú fós freagrach as an thus, mar sin ba chóir duit athbhreithniú a dhéanamh fós ar andatasets.xmlábhar sula n-úsáidtear é. Beidh iarracht an duine a chur isteach sa tionscadal a dhéanamh i gcónaí níos fearr ná clár ríomhaire. Buíochas leis an tionscadal UAF.
    * REQUIRED: I thus.xml, ní mór duit athbhreithniú a dhéanamh ar anWMSAlt. Ba chóir go mbeadh na clibeanna seo san áireamh anois (ach bhraitheann saor in aisce a athrú ar na luachanna) :
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \\[standardParts\\] with your own HTML. -->
        <legal><!\\[CDATA\\[
        \\[standardDisclaimerOfEndorsement\\]
        \\[standardDisclaimerOfExternalLinks\\]
        \\[standardPrivacyPolicy\\]
        \\[standardDataLicenses\\]
        \\]\\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\\_standard>UDUNITS</units\\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    * REQUIRED: I thus.xml, cóip agus greamaigh an moladh nua&lt;startHeadHtml ú a chur in ionad do leagan d'aois. Ach bíodh leisce ort athruithe a dhéanamh do do chuid roghanna.
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \\[tomcat\\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\\[fileName\\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \\[tomcat\\]/content/erddap/images. 
        
        \\*\\*\\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \\*\\*\\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \\[tomcat\\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \\*all\\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\\[CDATA\\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \\]\\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

Buíochas le POST, Hans Vedo, agus Rick Blair.
    * REQUIRED: I thus.xml, i&lt;startBodyHtml ú, athrú ar an&lt;comhlacht × chlib a bheith díreach&lt;comhlacht bhéil, ós rud é go bhfuil an stíl leagtha anois ag erddap.cs.
    * REQUIRED: I thus.xml, athrú ar an&lt;Deireadh an chomhrá (ach an seoladh ríomhphoist a athrú chuig do sheoladh ríomhphoist agus glaoch a dhéanamh ar athruithe eile) :
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \\[tomcat\\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\\[fileName\\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\\[CDATA\\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \\]\\]></endBodyHtml>
```

    * SCORTHA: I thus.xml, an molta&lt;Is é an ShortDescriptionHtml ú anois
```
        <theShortDescriptionHtml><!\\[CDATA\\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \\[standardShortDescriptionHtml\\]
        \\]\\]></theShortDescriptionHtml>
```

Thig leat é seo a athrú, go háirithe an abairt dheireanach sa chéad mhír.
    * I thus.xml, ríomhphost GachthingTo agus ríomhphostDailyReport Is féidir a bheith anois liostaí coma-scartha seoltaí ríomhphoist. An chéad ríomhphost Gachthing Chun go bhfuil speisialta, m.sh., síntiúis a EDDXxxxFromErddap datasets úsáid an seoladh ríomhphoist sin. Buíochas le John Maurer.
    * Tá earráidí ríomhphoist logáilte isteach anois ar an\\[Treoir do Thuismitheoirí\\]/ logs / emailLogYY-MM-DD.txt comhad.
    * I thus.xml, tá nua, paraiméadar roghnach a shocrú airíonna cuntas ríomhphoist (de ghnáth ceart tar éis&lt;cliceáil grianghraf a mhéadú
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

Is é an réamhshocraithe rud ar bith. Buíochas le Rich Signell.
    * REQUIRED: Má úsáideann tú EDDTableCopy nóEDDGridCóip, ní mór duit DELETE go léir\\[Treoir do Thuismitheoirí\\]/cóip/ eolairí agus comhaid ina bhfuil "xh" san eolaire nó ainmneacha comhaid tar éis stopadh an seanERDDAP™agus roimh tosú an nuaERDDAP™mar sin beidh na comhaid a ath-cóip. Tá mé an-leithscéal, ach bhí sé tábhachtach a dhéanamh ar an t-athrú agus tá súil agam tionchar aige roinnt admins agus cúpla comhad.
I Linux, is féidir leat teacht ar na comhaid le, cd\\[Treoir do Thuismitheoirí\\]Seirbhís do Chustaiméirí
teacht.\\*x\\*  
I Windows, is féidir leat teacht ar na comhaid le, Tosaigh|Cuardaigh Cuardaigh Cuardaigh
Cad ba mhaith leat a chuardach le haghaidh: Doiciméid
Gach nó cuid den ainm comhaid: xh
Féach i: Brabhsáil - ^\\[Treoir do Thuismitheoirí\\]Seirbhís do Chustaiméirí
Cliceáil ar 'Cuardach'
^A iad a roghnú go léir
Del iad a scriosadh go léir
    * CEANGLAIS: Idatasets.xml, le haghaidh EDDTableFromDatabase datasets, le haghaidh athróg dáta agus amstamp, athrú ar na sonraí Cineál a dhúbailt agus na haonaid go soicind ó 1970-01T00:00:00Z. Táimid REQUIRE go stóráil tú sonraí ama sa bhunachar sonraí\\*le\\*crios ama. Gan faisnéis crios ama, na fiosruithe aERDDAP™Cuireann chuig an mbunachar sonraí agus na torthaí aERDDAP™Faigheann as an mbunachar sonraí trí JDBC atá débhríoch agus is dócha a bheith mícheart. Rinneamar iarracht, ach níor aimsíodh aon bhealach iontaofa chun déileáil le sonraí "timestamp gan crios ama". Is dóigh linn go bhfuil sé seo dea-chleachtas ar aon nós. Tar éis an tsaoil, tá crios ama intuigthe ag sonraí "timestamp gan crios ama". Cé go bhfuil sé iontach go bhfuil an crios ama soiléir don bhunachar sonraí admin, a dhéanann sé ciall a shonrú go sainráite ionas gur féidir le bogearraí eile idirghníomhú i gceart le do bhunachar sonraí. Go raibh maith agat / caoin Michael Urzen.
    * SCOILEANNA: Idatasets.xml, chun cur ar chumas . leathanaigh gréasáin subset le haghaidh cuardaigh faceted do tacar sonraí tabular, is gá duit a chur [&lt;subsetVariablesú (Sonraí Teagmhála) le tréithe domhanda na tacar sonraí.
    * MOLADH: Idatasets.xml, má tá tú an tacar sonraí ledatasetID= "pmelGtsppp", le do thoil athrú é a bheith
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * MOLADH: Idatasets.xml, tá roghanna bailí nua don [&lt;Clárú: Deireadh Fómhair 2016 (Teicneolaíocht Faisnéise agus Cumarsáide) tréith domhanda, mar sin ba chóir duit a athbhreithniú / athrú ar an luach do do datasets.
    * Idatasets.xml, an nua [&lt;foinseNeedsExpandedFP\\_EQ &amp; gt;] (/ ollscoileanna eile sa mhargadh) Is cabhrach más rud é nach bhfuil an freastalaí foinse láimhseáil go seasta &amp;_variable_\\ =_value_ tástálacha i gceart (mar gheall ar an[deacracht ghinearálta tástála comhionannas na n-uimhreacha pointe snámh](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)) . cliceáil grianghraf a mhéadú leagtha síos go fíor de réir réamhshocraithe (an leagan is sábháilte) , mar sin ní gá duit aon athruithe a dhéanamh.
    * Nuashonraithe go deireanach[EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles). Buíochas le Jerry Yun Pan.
    * Nuashonraithe go deireanach[Seirbhís do Chustaiméirí](/docs/server-admin/datasets#eddtablefromthreddsfiles). Buíochas le Roy Mendelssohn.
    * Athruithe ar[EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)ligeann sé a úsáid le raon níos leithne de chomhaid.
    * Tá EDDTableFromBMDE faoi mhíchumas. Níl aon fhoinsí sonraí gníomhacha, cuí ann a thuilleadh.
    * I GenerateDatasetXml, an nuaEDDGridSeirbhís do Chustaiméirí Catalóg fómhar ar fad THREDDS catalóg (nó fo-thacar) agus gineanndatasets.xmlábhar. Buíochas leis an tionscadal UAF.
    * Sonraí a ghiniúint Xml agus DasDds a chur anois freisin a gcuid torthaí i\\[Treoir do Thuismitheoirí\\]/ logs / log.txt. Buíochas le Rich Signell agus Charles Carleton.
    * Feabhsuithe go leor ar an gcóras logáil isteach. Buíochas le POST.
*    **Cad a bhí mícheart leis an láithreánERDDAP™Clár na dToghthóirí An riachtanas is gá a fhios agus a dhéanamh:** 
    * Tá athruithe ar an /WEB-INF / eolaire. Athraigh do suímh javac agus java classpath dá réir.
    * Tá nua\\[do chuid féin irl - Library Service\\]/erddap / seirbhís a chomhshó a chinneadh an leagan deERDDAP. Is é an freagra téacs, m.sh.,ERDDAP\\_version = 1.24 Má fhaigheann tú teachtaireacht earráide HTTP 404 nach bhfuil bunaithe, déileálfaidh sé leis anERDDAP™mar leagan 1.22 nó níos ísle. Buíochas le POST.
*    **Athruithe Beaga agus Fisicí Bug:** 
    
    * EDDTableFrom Athruithe Sos:
        * Tacaíocht Dropped do léamh IOOSSOSXML freagraí.
        * Tacaíocht bhreise le haghaidh léamh IOOSSOStéacs/csv. (Mar sin NOSSOSfreastalaithe nach bhfuil tacaíocht faoi láthair.) 
        * Déanta go leor athruithe a bhaineann le IOOSSOSsonraí freastalaí.
        * Tacaíocht bhreise le haghaidh ceisteanna BBOX le haghaidh IOOSSOSagusOOSTethys SOSfreastalaithe. Mar thoradh ar na hathruithe seo tá luas mór suas le haghaidh iarrataí sonraí ábhartha. Go raibh maith agat le IOOSSOS.
    * Téacs i.matTá comhaid sonraí tabular shábháil anois i gceart. Buíochas le Roy Mendelssohn.
    *   WMS
        *   OpenLayersTá anois cuachta leERDDAP™le húsáid ar anWMSleathanaigh ghréasáin. Socraíonn sé seo an fhadhb a tharla nuairOpenLayersathrú cúpla mí ó shin agus cosc fadhbanna sa todhchaí.
        * I anWMS GetCapabilitiescineál gas: in airde&lt;OnlineResource × Tá luach anois ar an URL anWMSseirbhís. Buíochas le Carlton Galvarino.
        * Tá finscéal ar taispeáint arWMSleathanach gréasáin a thaispeáint ar an colorbar. Buíochas le Emilio Mayorga.
    *   EDDGridBhí fadhbanna ag tógálaí Dimension chomhiomlánú má foinse ais ' Ní raibh luachanna comhionann lena gceann scríbe Luachanna, m.sh., má bhí am foinse rud éigin eile seachas"seconds since 1970-01-01". Go raibh maith agat asToddSpindler.
    * I TableWriterGeoJson, an bhreis ',' tar éis bbox\\[...\\]curtha as oifig. Buíochas le Greg Williams.
    * A lán athruithe beaga agus Ceartúcháin bug.
    
## Leagan 1.22{#version-122} 
 (a scaoileadh 2009-07-05) 

* Tá an fabht SlideSorter a tugadh isteach i 1.20 socraithe.
* Tá an fabht OBIS a tugadh isteach i 1.20 socraithe.
* Baineadh na tagairtí do Jason datasets ar na híomhánna/gadgets/GoogleGadgets leathanach.
     
## Leagan 1.20{#version-120} 
 (scaoileadh 2009-07-02) 

*   ERDDAP™riarthóirí, cuir seo le do thoil le do chomhad thus.xml:
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

* Cineálacha nua tacar sonraí[EDDGridCóip Uaireadóirí Cóip](/docs/server-admin/datasets#eddgridcopy)agus[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy)cóip áitiúil eile a dhéanamh agus a chothabháilEDDGridnó EDDTable dataset agus sonraí a sheirbheáil ón gcóip áitiúil. Tá siad seo an-éasca le húsáid agus an-éifeachtach **réitigh ar roinnt de na fadhbanna is mó le sonraí a sheirbheáil ó fhoinsí sonraí iargúlta:** 
    
    * Is féidir le sonraí a rochtain ó fhoinse sonraí iargúlta a bheith mall (ar chúiseanna éagsúla) .
    * Níl an tacar sonraí iargúlta ar fáil uaireanta (arís, ar chúiseanna éagsúla) .
    * Ní Ag brath ar fhoinse amháin do na sonraí scála maith (e.g., nuair a úsáideoirí go leor agus go leorERDDAPúsáid a bhaint as é) .
    
Plus, Is é an chóip áitiúil cúltaca de na bunaidh, atá úsáideach i gcás rud éigin a tharlaíonn don bunaidh.
    
Níl aon rud nua faoi chóip áitiúil de thacar sonraí a dhéanamh. Cad atá nua anseo ná go ndéanann na ranganna seo é\\*éasca\\*a chruthú agus\\*a choimeád ar bun\\*cóip áitiúil de shonraí ó\\*éagsúlacht\\*cineálacha foinsí sonraí iargúlta agus\\*cuir meiteashonraí\\*agus na sonraí a chóipeáil.
    
Tá na cineálacha tacar sonraí mar chuid de shraith iomlán de ghnéithe a shimpliú a chruthú[greillí/blúistí/feistisERDDAPs s](/docs/server-admin/scaling)a láimhseáil ualaí an-trom (e.g., in ionad sonraí) .
    
* cineál nua tacar sonraí[EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)faigheann sonraí ó tábla bunachar sonraí áitiúil nó iargúlta.
*   ERDDAP™Tá anois[security guards](/docs/server-admin/additional-information#security)córas a thacaíonn le fíordheimhnithe (ligean úsáideoirí logáil isteach) agus údarú (rochtain a thabhairt dóibh ar thacair sonraí príobháideacha áirithe) .
* Tá[dhá, nua, ordú-líne uirlisí](/docs/server-admin/datasets#tools)cabhrú leERDDAP™riarthóirí ghiniúint an XML le haghaidh tacar sonraí nua idatasets.xml:
    * Sonraí a ghiniúint Is féidir Xml ghiniúint dréacht garbh den XML tacar sonraí le haghaidh beagnach aon chineál tacar sonraí.
    * Cabhraíonn DasDds leat tástáil arís agus arís eile agus an XML a bheachtú le haghaidh tacar sonraí.ERDDAPSeirbhís do Chustaiméirí Tá leathanaigh ghréasáin Xml curtha as oifig. Ar chúiseanna slándála, níor thacaigh siad ach le cineálacha cúpla tacar sonraí. Is réiteach níos fearr iad na huirlisí líne ordaithe nua.
* An nua[leathanach stádas](/docs/server-admin/additional-information#status-page)ligeann duine ar bith (ach go háirithe riarthóirí) féachaint ar stádasERDDAP™ó aon bhrabhsálaí ag dul chuig\\[cineál gas: in airde\\]/erddap/status.html.
* Tacaíonn Tabletap anois[feidhmeanna freastalaí taobh](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions):
    * agus ar leith () Cuireann sraitheanna dúblach ón tábla freagartha,
    * &amp; rsquo; sorderBy (...) ligeann duit a shonrú conas ba chóir an tábla freagartha a shórtáil,
    * &amp; rsquo; sorderByMax (...) ligeann duit a shonrú conas ba chóir an tábla freagartha a shórtáil agus cuireann gach sraitheanna ach amháin i gcás na sraitheanna leis na luachanna uasta sa cholún deireanach sonraithe. Is féidir é seo a úsáid, mar shampla, chun na sonraí is déanaí atá ar fáil a fháil do gach stáisiún.
* Is féidir le tacar sonraí Tabular san áireamh anois athróg dateTime breise nach bhfuil ainmnithe"time". Tá na hathróga aitheanta ag a gcuid "aonaid" meiteashonraí, ní mór a bhfuil" since "  (le haghaidh dáta uimhriúil Amharc ar gach eolas) nó "ye" nó "YY" (le haghaidh formáidithe String dateTimes) . Ach bain úsáid as fósdestinationName "time"don phríomhdháta Athróg ama.
*   ERDDAP™Anois gineann[léarscáil an tSuímh](/docs/server-admin/additional-information#sitemapxml)comhad, a insíonn innill chuardaigh go bhfuil doERDDAPní mór ach a crawled gach mí.ERDDAP™riarthóirí, lean[na treoracha seo](/docs/server-admin/additional-information#sitemapxml)a chur in iúl don innill chuardaigh mar gheall ar an comhad sitemap.xml nua.
*   ERDDAP's teachtaireachtaí earráide anois i bhfad níos giorra agus dírithe ar chliaint (gan chlárú) . Buíochas le Greg Williams.
* [EN]&lt;an t-iarratas Blacklist (/ ollscoileanna eile sa mhargadh) tacaíonn sé anois freisin le seoltaí IP i gcás ina bhfuil an uimhir dheireanach curtha in ionad \\*.
* Iarratais ar.jsonagus .geoJson comhaid san áireamh anois roghnach[cineál gas: in airde](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/)iarraidh trí "agus.jsonp =_functionName_" go dtí deireadh an cheist. Go bunúsach, insíonn sé seo achERDDAP™"_functionName_ (" go dtí tús na freagartha agus ") " go dtí deireadh na freagartha. Más rud é ar dtús nach raibh aon cheist, fág amach an "agus" i do cheist. Buíochas le Greg Williams.
* Cuireadh go leor staitisticí nua leis an[An Tuairisc Laethúil](/docs/server-admin/additional-information#daily-report).
* Ar leathanaigh ghréasáin le liostaí de thacair sonraí, institiúid agus id anois ar an gceart i bhfad. Bogann sé seo síntiús agus colúin níos úsáidí eile i bhfianaise ar scáileáin ríomhaire caol.
* Ar gach leathanach gréasáin, an leathanach teideal (bunaithe ar an&lt;teideal bhéil sa&lt;startHeadHtml ú go bhfuil tú a shainiú i thus.xml) a mhodhnú chun cur síos níos fearr ar an leathanach gréasáin (mar shampla, trí theideal agus institiúid na tacar sonraí reatha a áireamh) .
* Tá faisnéis Xmx san áireamh anois leis an eolas cuimhne clóite i log.txt, an Tuarascáil Laethúil, agus ar status.html. Buíochas le Montgomery Ellyn.
*   ERDDAP™Tá cosaint bhreise, ginearálta-chuspóireach i gcoinne gach earráidí (e.g., Urraitheoir) . Go raibh maith agat le Charles Carleton.
* Feabhsuithe ar láimhseáil earráide má rinneadh an freagra cheana féin.
* IMPROVED: EDDTableFromFiles agusEDDGridÓ Files anois ach a cheadú&lt;meiteashonraíÓ bhéil ar dtús nó deireanach. Tá penultimate a thuilleadh tacaíocht. Agus tá an chéad agus an ceann deireanach bunaithe anois ar na comhaid 'Am Athraithe deireanach.
* Bug shocrú: i EDDTableFromSOS, info neamhbhailí do stáisiún amháin chaith eisceacht agus ba chúis leis an tacar sonraí ar fad a dhiúltú. Anois, tá na stáisiúin neamhaird díreach (agus tá an teachtaireacht earráide logáilte isteach.txt) . Go raibh maith agat le Rick Blair.
     

## Leagan 1.18{#version-118} 
 (a scaoileadh 2009-04-08) 

* Bug shocrú: Ag tosú i 1.14, an Foirm Rochtana Sonraí EDDTable agus Déan leathanach gréasáin Graph ní raibh déileáil i gceart le srianta luaite.
* Bug shocrú: Ag tosú i 1.14, Ní raibh EDDTableFromDapSequence láimhseáil srianta ama i gceart más rud é nach raibh na haonaid am foinse "soicind ó 1970-01T00:00 ".
     

## Leagan 1.16{#version-116} 
 (scaoileadh 2009-03-26) 

*   ERDDAP™riarthóirí:
    * Is é seo an scaoileadh tábhachtach mar a shocraíonn sé fabht a d'fhág arERDDAP™snáithe ag rith má d'úsáid tú Bainisteoir Tomcat chun Stop / Start nó AthlódáilERDDAP. Mar sin, nuair a shuiteáil tú 1.16, ná úsáid ach bainisteoir Tomcat a undeploy an seanERDDAP™agus imscaradh an nuaERDDAP. Ina áit sin: **undeploy an seanERDDAP™, atosú Tomcat (nó an freastalaí) , ansin imscaradh an nuaERDDAP.** Tá sé i gcónaí smaoineamh maith a dhéanamh go nuair a shuiteáil leagan nua.
    * Cuir le do thoil [EN]&lt;iarratas Blacklist ×&lt;/ RequestBlacklist ^ (/ ollscoileanna eile sa mhargadh) le dodatasets.xml. Is féidir é seo a úsáid chun liosta de sheoltaí IP cliaint a shonrú le bac (e.g., a chur ar ceal Denial ionsaí Seirbhíse nó robot gréasáin overly zealous) .
* Tá anois\\[Treoir do Thuismitheoirí\\]/ logs eolaire a shealbhú ar anERDDAP™comhaid log. Nuair a thosaíonn túERDDAP™, déanann sé cóip chartlainne den log.txt agus logáil. comhaid txt.previous le stampa ama. Má bhí deacracht roimh an atosú, d'fhéadfadh sé a bheith úsáideach chun anailís a dhéanamh ar na comhaid.
*   ERD'sERDDAP™anois tá an córas síntiús iompú ar.
*   ERDDAP™arís agus arís eile (ach nach bhfuil fós a mholadh) an "%26" ionchódú "agus" i URLanna iarraidh (féach ar an[a bhaineann le v1.14 athrú](#percent26)) .
* Roinnt breiseanna nua leis an rannóg Tally an[An Tuairisc Laethúil](/docs/server-admin/additional-information#daily-report).
* Ceartúcháin bug Beaga i Giniúint DatasetsXml.
* Ceartúcháin bug beag beag.
     

## Leagan 1.14{#version-114} 
 (scaoileadh 2009-03-17) 

* Athruithe d'úsáideoirí:
    * I iarrataí sonraí greille,ERDDAP™Tacaíochtaí anois:[deireanach-n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last)i gcás ina n líon slánuimhir innéacsanna agus[ (deireanach) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses)áit a bhfuil d luach uimhriúil (le haghaidh am, tá sé i soicind) .
    * I iarratais sonraí tabular, a cheangal ar shrianta Curtain anois[Sleachta dúbailte](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings)thart ar an luach, mar shampla, &amp;id = "NDBC40121" Níl an Tweet seo ar fáilDAPprótacal.
    * I iarratais sonraí tabular,ERDDAP™Éilíonn anois go[gach srianta a ionchódú i gceart faoin gcéad](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode). Brabhsálaithe é seo go huathoibríoch, mar sin bíonn tionchar aige seo den chuid is mó ar chláir ríomhaireachta / scríbhinní atá ag teachtERDDAP.
#### Uisce agus Séarachas{#percent26} 
*   [Roimhe seo,](#percent26)an[leabú leathanach gréasáin graf](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html)agus an[ERDDAP™Google Gadget leathanach gréasáin](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html)a dúirt a chur in ionad an "agus" i URL an íomhá le "%26". Ón am seo, ba chóir duit an "agus" a chur in ionad an íomhá URL le "T &amp;". Mar sin, ní mór duit a chur in ionad aon "%26" i leathanaigh ghréasáin atá ann cheana agus Google Gadgets le " &amp;". (An bhfuil cuntas agat?) 
*   ERDDAP™riarthóirí, do thoil:
    * Cuir an méid seo a leanas le do[crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml)comhad comhad (agus an bhratach a athrú Luach KeyKey) :
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \\*\\*\\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \\[bigParentDirectory\\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    * Ar an líne tar éis&lt;cliceáil grianghraf a mhéadú[crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml)comhad, cuir
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
agus cuir isteach do phasfhocal fíor.
    * Is féidir leat athrú&lt;cliceáil grianghraf a mhéadú[crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml)comhad a chur san áireamh luachanna fada suas go dtí 360, m.sh.,
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * I do chuiddatasets.xmlcomhad, athainmniú an cineál tacar sonraí EDDTableFromNc4DFiles le EDDTableFromNcFiles (a thacaíonn anois le comhaid le haon líon toisí) . Má bhí tú EDDTableFromNc4DFiles tacar sonraí:
        
        1. Athraíonn tú go cineál = "EDDTableFromNcFiles" i do thacair sonraí. XML comhad.
        2. MUST tú a chur leis&lt;Toisí × 4 4 4 4&lt;/ toisí lí chlib chuig an tacar sonraí XML.
        3. Is féidir leat a chur leis an nua&lt;sortFilesBySourceNames chlib a shonrú ar an t-ordú inmheánach do na comhaid, a chinneann an t-ordú foriomlán na sonraí ar ais.
        
Le haghaidh sonraí, féach[EDDTableFromFiles](/docs/server-admin/datasets#eddtablefromfiles).
    * San am atá caite, le haghaidh EDDTableFromDapSequence, le haghaidhOPeNDAPfreastalaithe DRDS, idatasets.xml, a úsáidtear againn&lt;foinseCanConstrainStringsRegex ~ =&lt;/ foinseCanConstrainStringRegex . Ach feicimid anois go bhfuil an tacaíocht regex DRDS níos teoranta náERDDAP's, mar sin molaimid&lt;cliceáil grianghraf a mhéadú&lt;/sourceCanConstrainStringRegex × ionas nach bhfuil srianta regex a rith go dtí an fhoinse, ach tá láimhseáil ina ionad sin agERDDAP.
    * Athchóirigh láimhseáil foinseCanConstrain... idatasets.xmlag an[EDDTableFromDapSequence](/docs/server-admin/datasets#eddtablefromdapsequence)agus (go hinmheánach) gach cineál tacar sonraí EDDTable. Tá an córas nua níos simplí agus léiríonn sé níos fearr éagsúlacht na bhfoinsí sonraí éagsúla. B'fhéidir gur gá duit an XML a mhodhnú le haghaidh do thacair sonraí idatasets.xml.
* Tá roinnt gnéithe nua atá úsáideach féin, ach nuair a chéile, éascú freisin a chruthú[greillí/blúistí/feistisERDDAPs s](/docs/server-admin/additional-information#grids-clusters-and-federations).
    * Cineálacha nua tacar sonraí:
        *   [EDDGridAn tSraith Shinsearach](/docs/server-admin/datasets#eddfromerddap)agus[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap)a ligean ar cheannERDDAP™san áireamh tacar sonraí ó chéileERDDAP™ar bhealach an-simplí agus an-éifeachtach.
        *   [EDDGridSeirbhís do Chustaiméirí](/docs/server-admin/datasets#eddgridfromfiles)  (agus a fho-aicme,[EDDGridSeirbhís do Chustaiméirí](/docs/server-admin/datasets#eddgridfromncfiles)a léamhNetCDF .nc, GRIB .grb, agusHDF .hdfcomhaid comhad) .
        *   [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)a léamhNetCDF .nca bhfuil struchtúr cosúil le tábla.
    * Athbheochan RunLoadDatasets agus LoadDatasets ionas goERDDAP™Tá an-sofhreagrach a athlódáil tacar sonraí bunaithe ar chomhaid sna[bratach bratach](/docs/server-admin/additional-information#flag)foirm duille: líneach&lt;5 soicind má tá príomh-lastDatasets déanta faoi láthair).
    * Seirbhís nua a cheadú[URL a chruthú comhad bratach](/docs/server-admin/additional-information#set-dataset-flag)le haghaidh tacar sonraí áirithe, e.g.,
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
Cruthaíonn comhad bratach sa eolaire bratach do rPmelTao (cé go bhfuil an bhratach Níl an Tweet seo ar fáil) .
    * Nuashonraithe go deireanach[síntiús a íoc](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)seirbhís ionas gur féidir le haon chliant a shonrú gníomh a dhéanfar nuair a bhíonn tacar sonraí ar leith a cruthaíodh (nuair a bhíonnERDDAP™Tá restarted) agus aon uair a athraíonn an tacar sonraí ar bhealach ar bith. Is féidir leis an gcóras seo a bheith faoi mhíchumas tríd&lt;síntiús SystemActive uaire i do[crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml)comhad. An bhfuilERDDAP™ [An Tuairisc Laethúil](/docs/server-admin/additional-information#daily-report)liostaí anois gach ceann de na síntiúis agus áirítear an URL is gá a chur ar ceal gach ceann, i gcás bhraitheann tú go bhfuil an córas á mí-úsáid. Idatasets.xml, tá nua, roghnach [&lt;síntiús a íoc Liosta Ríomhphoist × (/ disciplíní / sonraí #subscriptionemail blacklist) tag ionas gur féidir le riarthóirí a shonrú liosta de na seoltaí ríomhphoist atá blacklisted láithreach ón gcóras síntiús.
    * Nua [EN]&lt;Féach ar an bpróifíl (/ ollscoileanna eile sa mhargadh) tréith idatasets.xmlligeann anERDDAP™riarthóir a shonrú gníomh a dhéanfar nuair a bhíonn tacar sonraí ar leith a cruthaíodh (nuair a bhíonnERDDAP™Tá restarted) agus aon uair a athraíonn an tacar sonraí ar bhealach ar bith.
    * Feabhsúcháin chun cuardach téacs iomlán: a stóráil ar an teaghrán cuardaigh do gach tacar sonraí úsáideann anois 1/2 an chuimhne. An algartam cuardaigh (Buachaillí-Moore-mhaith) Tá anois 3X níos tapúla.
    * Ríomhphoist óERDDAP™anois prepend i gcónaí ar an ábhar agus ábhar le\\[erddap irl - Library Service\\], ionas go mbeidh sé soiléir aERDDAP™tháinig sé seo ó (i gcás a riarann tú ilERDDAPs s) .
    * Staitisticí níos fairsinge a bhailiú le haghaidh[An Tuairisc Laethúil](/docs/server-admin/additional-information#daily-report)ríomhphost.
    * comhad logála nua\\[Treoir do Thuismitheoirí\\]/ emailLogYEAR-MM-DD.txt logs gach ríomhphost a sheoladh agERDDAP™gach lá. Tá sé seo úsáideach go háirithe más rud é nach féidir le do fhreastalaí ríomhphoist a sheoladh i ndáiríre - is féidir leat iad a léamh ar a laghad sa logáil.
    *   ERDDAP™anois a dhéanann\\[Treoir do Thuismitheoirí\\]Seirbhís do Chustaiméirí (datasetID) eolaire do gach tacar sonraí ó d'fhéadfadh go leor de na comhaid i dtaisce.
* Nuashonraithe go deireanach[RSS2.01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)beatha do gach tacar sonraí (féachaint ar an oráisteRSSdeilbhíní ar liostaí de thacair sonraí, Foirmeacha Rochtana Sonraí, agus Déan leathanaigh ghréasáin Graph) .
*   EDDGrid .kmlfreagraí úsáid anois íomhánna tiled ("superoverlays" - íomhánna quadtree a ghintear dinimiciúil) . Na hualaí íomhá tosaigh isteach GoogleEarth i bhfad níos tapúla ná riamh. Méadaíonn réiteach na léarscáile mar súmáil tú isteach, suas go dtí réiteach iomlán an tacar sonraí. Recommend: Ba chóir d'úsáideoirí a iarraidh.kmlar feadh aon phointe ama, ach an tacar sonraí ar fad, raon domhanfhad, domhanfhad. Ar an drochuair, baineadh tacaíocht do raonta ama (Tá súil agam go mbeidh sé teacht ar ais) .
*   ERDDAP™Cuireann anois[Expires agus Cache-Rialú headers max-aois](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)do gach comhad a iarrtar ón eolaire / íomhá. Laghdaíonn sé seo go mór líon na n-iarratas comhad statach a sheoladh chuigERDDAPagus dá bhrí sin luasanna go mór suas an chuid is móERDDAP™ualaí leathanach. Chomh maith leis sin, go leorJavaAistríodh tagairtí comhaid Script go bun a leathanaigh HTML, rud a chuireann dlús le go leorERDDAP™ualaí leathanach. A bhuíochas leis an leabhar "Suímh Idirlín Ardfheidhmíochta" ag Steve Souders agus an Chomh maith ySlow leis an mbreiseán FireBug i FireFox.
*   ERDDAP™athrú ó netcdf-java 2.2.22 go netcdf-java 4.0. I measc rudaí eile, ceadaíonn sé seoEDDGridÓ NcFiles a léamhHDF .hdf, chomh maith le GRIB .grb agusNetCDF .nccomhaid.
*   EDDGridÓDap agusEDDGridTacaíocht a thabhairt do DArray (chomh maith le DGrid)  dataVariables. Más rud é nach bhfuil gné a chomhordanáid athróg comhfhreagrach,ERDDAP™Cruthaíonn athróg ais leis na luachanna innéacs (e.g., 0, 1, 2, ..., 311, 312) . Mar sin, gach gné eileEDDGridfanacht mar an gcéanna:
\\* Feidhmíonn sé fós gach tacar sonraí mar Grids, le hathróg ais do gach gné.
\\* Is féidir le fiosruithe a iarraidh go fóill luachanna ó na hathróga ais.
A bhuíochas le Charles Carleton, Thomas Im, Dorian Raymer, agus daoine eile.
* An bhfuilWMS OpenLayersleathanaigh anois tá fadfhad réamhshocraithe, raon domhanfhad go bhfuil beagán níos mó ná raon an tacar sonraí ar (nach bhfuil an raon cruinn, mar sin tá an comhthéacs tacar sonraí beag níos soiléire) . Is féidir leis an raon réamhshocraithe a bheith anois 0 go 360, a ligeann an raon iomlán de go leor tacar sonraí a thaispeáint anois. Go raibh maith agatToddSpindler.
* Barraí Sleamhnáin nua ar roinnt Foirmeacha Rochtain Sonraí agus Déan leathanaigh ghréasáin Graph. Siad a shimpliú (taiseachas aeir: fliuch) sonraíocht na sonraí atá ag teastáil agus aiseolas amhairc maith a thairiscint.
* Rogha nua don&lt;tacar sonraí clibeanna idatasets.xml:[gníomhach = "False"](/docs/server-admin/datasets#active).
* Tagairtí doERD'sERDDAP™athrú ó coastwatch.pfel (oibreacha fós trí sheachvótálaí) chun coastwatch.pfeg (fearr leat) .
* Tacaíocht nua do[data\\_minagusdata\\_max](/docs/server-admin/datasets#data_min-and-data_max)tréithe meiteashonraí athraitheacha.
* Réiteach páirteach ar an[WaitThenTryAgain / Torthaí Páirteacha Eisceacht](/docs/server-admin/additional-information#waitthentryagain-exception): Anois, beidh roinnt iarrataí gur theip roimhe seo nuair a braitheadh athrú foinse sonraí éireoidh mar gheall arERDDAP™athlódáil an tacar sonraí agus na sonraí a athchruthú go huathoibríoch, i gcomhthéacs an iarratais bhunaidh.
* Bug shocrú: a ghiniúint An tSraith Shinsearach Bhí faoi mhíchumas Xml iERDDAP™leagan 1.12. Buíochas le Montgomery Ellyn le cur in iúl seo amach.
* Athruithe beaga ar láimhseáil earráide.
* Feabhsuithe go leor a sheachaint / déileáil le coinníollacha cine féideartha (i.e., fadhbanna féideartha a eascraíonn as an nádúr il-réidhteERDDAP) ba chúis le fadhbanna beaga, neamhchoitianta.
* Anois, má tá teachtaireacht earráide scríofa ar íomhá, beidh an íomhá fanacht ach amháin sa taisce le haghaidh ~ 5-10 nóiméad (nach bhfuil 60) . Buíochas le Cara Wilson.
* Is é an teachtaireacht chaighdeánach nuair nach bhfuil aon sonraí anois "Tá do cheist a tháirgtear aon torthaí meaitseáil.", atá níos giorra, níos cruinne, agus cluichíOPeNDAPfreastalaithe.
*   EDDGrida thuilleadh ligeann luachanna ais ceangailte.
* Athruithe beaga ar .ver agus .help iarratais.
* A lán athruithe beaga agus Ceartúcháin bug.
     

## Leagan 1.12{#version-112} 
 (scaoileadh 2008-10-31) 

* EDDTableFromSOSarís oibreacha le NDBCSOSagus oibríonn sé leis an NOS nuaSOS.
* Éilíonn EDDTableFromBMDE anoisERDDAP™admin a shonrúdataVariables.
*   EDDGrida thuilleadh éilíonn go lat agus lon a bheith spásáilte go cothrom le haghaidh. trédhearcach Png nó.kml. Go raibh maith agat asToddSpindler.
* Cúpla athrú beag.
     

## Leagan 1.10{#version-110} 
 (scaoileadh 2008-10-14) 

* Nua "colorBar" meiteashonraí le haghaidh athróg sonraí idatasets.xmlSainmhíníonn na socruithe barra dath réamhshocraithe le haghaidh graif agus léarscáileanna. Féach ar[tuilleadh eolais](/docs/server-admin/datasets#color-bar-attributes). Tá sé seo tábhachtach toisc go bhfeabhsaíonn sé go mór an chuma ar na graif réamhshocraithe agus léarscáileanna a tháirgtear ag Déan A Graph agus toisc go bhfuil na graif réamhshocraithe agus léarscáileanna anois barra dath comhsheasmhach fiú nuair a athraíonn an cliant an t-am a iarrtar nó raon geografach. Chomh maith leis sin, bhí sé seo riachtanach le haghaidhWMS.
*   ERDDAP™feidhmíonn anois an chuid is mó sonraí greille tríWMSseirbhís. Tá sé seo tábhachtach toisc go léiríonn sé go, chomh maith le sonraí a fháil ó go leor cineálacha freastalaithe sonraí,ERDDAP™is féidir sonraí a dháileadh trí phrótacail éagsúla (DAP,WMS, ... níos mó sa todhchaí) . Féach an[web development](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html). Nó an[doiciméadú do riarthóirí](/docs/server-admin/datasets#wms). Nó[iarracht a dhéanamh amach](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html).
* Tacaíocht nua do luachanna domhanfhad ×180 i.kmlcomhaid.
* New cdm\\_data\\_type: Eile .
*   ERDDAP™tacaíonn anois le sonraí foinse "boolean". Féach ar[tuilleadh eolais](/docs/server-admin/datasets#boolean-data)Beidh sé seo úsáideach don EDDTableFromDatabase sa todhchaí.
* Tacaíonn EDDTableFromBMDE nua le foinsí sonraí DiGIR / BMDE.
* Ceadaíonn EDVGridAxis anois luachanna curtha in eagar. Na tacair sonraí pmelOscar ag teastáil seo.
*   ERDDAP™tuairisceáin anois earráidí HTTP (e.g., "404 le haghaidh acmhainní / leathanach nach bhfuil le fáil") i gcásanna níos mó, in ionad leathanaigh HTML le teachtaireachtaí earráide.
* Go leor athruithe / breise leis anERDDAP™doiciméadú.
* Go leor athruithe beaga.
* Roinnt Ceartúcháin bug.
*    **Cad a bhí mícheart leis an láithreánERDDAP™Ba chóir riarthóirí a dhéanamh a uasghrádú go dtí an leagan seo:** 
    * Idatasets.xml, le haghaidh aon EDDTableFromSOSdatasets, athrú "Property tuillte" meiteashonraí a "sourceObservedProperty".
    * Na rialacha le haghaidhaxisVariablenódataVariable'sdestinationNameTá anois[níos déine](/docs/server-admin/datasets#datavariable-addattributes). Ní mór duit a sheiceáil go bhfuil do ainmneacha athraitheacha bailí. Ceachtar seiceáil iad de láimh, nó a reáchtáilERDDAP™agus breathnú ar na teachtaireachtaí earráide sa tuarascáil go bhfuil ríomhphost chuig an riarthóir.
    * Idatasets.xml, más mian leat athróg sonraí greille a bheith inrochtana tríWMS, ní mór duit meiteashonraí datha a chur leis. Ar a laghad, mar shampla,&lt;att ainm = "colorBarMinimum" cineál = "dúbailte" × 0&lt;Baile Átha Troim
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Féach ar[tuilleadh eolais](/docs/server-admin/datasets#wms).
    * Cuir an méid seo a leanas le do[crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml)comhad comhad (ach é a shaincheapadh le do chuid faisnéise) :

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## Leagan 1.08{#version-108} 
 (scaoileadh 2008-07-13) 

* Seirbhís gréasáin nua iERDDAP™, a ghiniúint An tSraith Shinsearach Xml, cuidíonnERDDAP™riarthóirí ag a chruthú dréacht garbh den XML ag teastáil chun cur síos a dhéanamh ar tacar sonraí idatasets.xml
* Roinnt athruithe / bug fixes a bhaineann le ligean griddap le feiceáil ag netcdf-java mar fhreastalaí opendap, lena n-áirítear: meiteashonraí domhanda lipéadaithe anois "NC\\_GLOBAL" (in ionad "GLOBAL") .
* An bhfuilEDDGridagus EDDTable Foirmeacha Rochtain Sonraí úsáid anois eolas cheist sa URL. Mar sin, mar shampla, má théann úsáideoir ó fhoirm A Graph Déan chuig Foirm Rochtana Sonraí, tá na srianta a aistriú anois i gceart.
*   tabledap's Déan A Graph anois ligeann srianta ar athróg Curtain.
* Déan EDDTable A Graph Ceadaíonn anois srianta NaN. Go raibh maith agat le Steve Hankin.
* Bug shocrú: EDDTable shábháil Ní raibh AsImage a aithint i gceart an min .colorbar agus luachanna max. Go raibh maith agat as Steve Hankin
* Feabhsúcháin go leor a thusDatasetsXml. Buíochas le Montgomery Ellyn.
* iarratais Griddap anois ar chumas () - iarratais stíl beagán lasmuigh den raon ais iarbhír. Níl an Tweet seo ar fáil () -luachanna a chothromú go dtí an luach iarbhír is gaire. Go raibh maith agat as Cindy Bessey
* Rinne mé an tástáil FloatArray agus DoubleArray de isEvenlySpaced níos sofaisticiúla. Beidh sé i gcónaí neamhfhoirfe (toisc go mbeadh an tástáil gá a chur in oiriúint do gach tacar sonraí) , ach ba chóir é a bheith níos fearr. Buíochas le Montgomery Ellyn.
* Bhog mé thus.html agus thusDatasets Xml.html erddap ar / íoslódáil eolaire agus crua códaithe gach nasc leo. Anois, is féidir liom athruithe a dhéanamh agus an t-eolas thus a nuashonrú láithreach.
* Athruithe beaga go leor. Ceartúcháin bug beag beag.
*    **Cad a bhí mícheart leis an láithreánERDDAP™Ba chóir riarthóirí a dhéanamh a uasghrádú go dtí an leagan seo:** 
    * taiseachas aeir: fliuch&lt;An tSraith Shinsearach Html uaire ó do chuid teachtaireachtaí.xml[crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml)comhad. Sonraíonn sé an téacs atá le feiceáil i lár an taobh clé denERDDAP™leathanach baile. Chomh maith leis sin, cuir&lt;h1 .ERDDAP&lt;Seirbhís do Chustaiméirí (nó ceannlíne éigin eile) go dtí an barr é. **Nó,** cóip&lt;anShortDescriptionHtml ^ sa nua[crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml)comhad comhad (as an erddapContent nua.zip) i do thus.xml.
         

## Leagan 1.06{#version-106} 
 (scaoileadh 2008-2018) 

* Tacaíocht nua doIOOS DIF SOSfoinsí sonraí.
* Athruithe beaga go leor. Ceartúcháin bug beag beag.
     

## Leagan 1.04{#version-104} 
 (scaoileadh 2008-06-10) 

* Gné Sorter Slide Nua.
* New Google Gadgets leathanach agus samplaí.
* Bug shocrú iEDDGrid.saveAsNc le haghaidh athróg le scála agus cuir Offset.
     

## Leagan 1.02{#version-102} 
 (scaoileadh 2008-05-26) 

* Nuashonraithe go deireanachEDDGridCeadaíonn TaobhBySide do éagsúlaaxisVariables s\\[0 0\\]foinse cumhachta Luachanna.
* Gach ceann de na sruthanna agus winds datasets bhí chomhcheangal isteachEDDGridSideBySide datasets.
* Íomhánna ó iarratais íomhá atá i dtaisce anois ar feadh 1 uair an chloig.
     

## Leagan 1.00{#version-100} 
 (a scaoileadh 2008-05-06) 

* Déan leathanaigh ghréasáin Graph agus orduithe grafaicí i URLanna.
* Tacaíocht do chomhaid bratach a chur i bhfeidhm athlódáil tacar sonraí.
* Cineál tacar sonraí nua: EDDTableFrom4DFile (an chéad fho-aicme EDDTableFromFiles) .
