---
sidebar_position: 3
---
# Ag obair leis an datasets.xml Déan Teagmháil Linn

 \\[ Beidh an leathanach gréasáin a bheith ach amháin ar spéis leo ERDDAP™ riarthóirí. \\] 

Tar éis duit lean an ERDDAP™   [treoracha a shuiteáil](/docs/server-admin/deploy-install) , ní mór duit in eagar an datasets.xml comhad i *taiseachas aeir: fliuch* / ábhar / erddap / chun cur síos ar na tacair sonraí go bhfuil do ERDDAP™ Beidh suiteáil freastal.

Is féidir leat sampla a fheiceáil [ datasets.xml ar GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .

- - - - - -

##  [Déan teagmháil anois](#introduction)  {#introduction} 

### Roinnt Tionól ag teastáil{#some-assembly-required} 
Socrú tacar sonraí i ERDDAP™ Níl ach ábhar dírithe ar eolaire nó URL an tacar sonraí. Tá tú a scríobh smután de XML le haghaidh datasets.xml a chuireann síos ar an tacar sonraí.

* Le haghaidh tacar sonraí gridded, d'fhonn a dhéanamh ar an tacar sonraí i gcomhréir le ERDDAP 's struchtúr sonraí le haghaidh sonraí gridded, caithfidh tú a aithint fo-thacar de athróg an tacar sonraí a roinnt na gnéithe céanna. ( [Cén fáth?](#why-just-two-basic-data-structures)   [Conas?](#dimensions) ) 
* Déantar meiteashonraí reatha an tacar sonraí a allmhairiú go huathoibríoch. Ach más mian leat a mhodhnú go meiteashonraí nó meiteashonraí eile a chur, caithfidh tú é a shonrú i datasets.xml . Agus ERDDAP™ riachtanais meiteashonraí eile, lena n-áirítear [tréithe domhanda](#global-attributes)   (den sórt sin infoUrl , institiúid, sourceUrl , achoimre, agus teideal) agus [tréithe athraitheacha](#variable-addattributes)   (den sórt sin long\\_name agus aonaid) . Díreach mar a chuireann na meiteashonraí atá sa tacar sonraí faisnéis thuairisciúil don tacar sonraí, na meiteashonraí a iarrtar ERDDAP™ Cuireann eolas tuairisciúil leis an tacar sonraí. Is é an meiteashonraí breise chomh maith le do tacar sonraí agus cabhraíonn sé ERDDAP™ a dhéanamh post níos fearr a chur i láthair do chuid sonraí d'úsáideoirí nach bhfuil eolas air.
*    ERDDAP™ riachtanais tú a dhéanamh rudaí speisialta leis an [domhanfhad, domhanleithead, airde (nó doimhneacht) , agus athróg ama](#destinationname) .

Má cheannaíonn tú isteach sna smaointe seo agus an iarracht a chaitheamh chun an XML a chruthú le haghaidh datasets.xml , gheobhaidh tú na buntáistí a bhaineann le ERDDAP™ , lena n-áirítear:

* Cuardach téacs iomlán le haghaidh tacar sonraí
* Cuardaigh tacar sonraí de réir catagóire
* Foirmeacha Rochtana Sonraí ( * datasetID * ..) ionas gur féidir leat a iarraidh fo-thacar sonraí i go leor de na formáidí comhaid éagsúla
* Foirmeacha chun graif agus léarscáileanna a iarraidh ( * datasetID * .graf) 
* Seirbhís Léarscáileanna Gréasáin ( WMS ) le haghaidh tacar sonraí gridded
*    RESTful rochtain ar do shonraí

Ag déanamh an datasets.xml Bíonn iarracht mhór do na chéad chúpla tacar sonraí, ach **faigheann sé níos éasca** . Tar éis an chéad tacar sonraí, is féidir leat a lán de do chuid oibre a athúsáid go minic don chéad tacar sonraí eile. Fortunately, ERDDAP™ thagann le dhá [Uirlisí](#tools) chun cabhrú leat a chruthú ar an XML do gach tacar sonraí i datasets.xml .
Má fhaigheann tú i bhfostú, féach ar ár [alt ar thacaíocht bhreise a fháil](/docs/intro#support) .

### Athróga i datasets.xml  {#varaibles-in-datasetsxml} 

As ERDDAP™ leagan 2.29.0, datasets.xml Is maith liom é (go roghnach) próiseáilte ag [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Tá sé seo go leor úsáidí lena n-áirítear leagan luachanna príobháideacha (cosúil le focal faire) ag baint úsáide as athróg comhshaoil. Is féidir é seo a bheith faoi mhíchumas trí shuíomh ar chumas EnvParsing bréagach i thus.xml.

### Sonraí a Sholáthar Foirm Iarratais{#data-provider-form} 
Nuair a thagann soláthraí sonraí chun tú ag súil a chur ar roinnt sonraí le do ERDDAP , is féidir é a bheith deacair agus am Tógann a bhailiú gach ceann de na meiteashonraí (faisnéis faoin tacar sonraí) is gá a chur leis an tacar sonraí isteach ERDDAP . Go leor foinsí sonraí (mar shampla, .csv comhaid, Comhaid Excel, bunachair sonraí) nach bhfuil aon meiteashonraí inmheánacha, mar sin ERDDAP™ Tá Foirm Soláthraí Sonraí a bhailíonn meiteashonraí ón soláthraí sonraí agus tugann sé treoir éigin eile don soláthraí sonraí, lena n-áirítear treoir fhairsing do [Sonraí i mBunscoileanna](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases) . Déantar an fhaisnéis a chuirtear isteach a thiontú go datasets.xml formáid agus ansin ríomhphost chuig an ERDDAP™ internet marketing (tú thú) agus scríofa (aguisín) go dtí *Treoir do Thuismitheoirí* / logs / dataProviderForm.log . Dá bhrí sin, an fhoirm leath-uathoibríoch an próiseas ag fáil tacar sonraí isteach ERDDAP , ach an ERDDAP™ riarthóir fós a chur i gcrích ar an datasets.xml smután agus déileáil le dul ar an comhad sonraí (s s) ón soláthraí nó nascadh leis an mbunachar sonraí.

Is baol slándála ollmhór é comhaid sonraí iarbhír a chur isteach ó fhoinsí seachtracha, mar sin ERDDAP™ nach déileáil leis sin. Caithfidh tú réiteach a dhéanamh a oibríonn duit féin agus an soláthraí sonraí, mar shampla, ríomhphost (le haghaidh comhaid bheaga) , tarraingt as an scamall (mar shampla, DropBox nó Google Drive) , suíomh sftp (le pasfhocail) , nó sneaker Glan (tiomáint USB ordóg nó tiomáint crua seachtracha) . Ba chóir duit glacadh le dócha ach comhaid ó dhaoine a fhios agat. Beidh ort a scanadh na comhaid le haghaidh víris agus réamhchúraimí slándála eile a ghlacadh.

Níl nasc i ERDDAP™ chuig an bhFoirm Soláthraí Sonraí (mar shampla, ar an ERDDAP™ Leathanach baile) . Ina áit sin, nuair a insíonn duine éigin mian leat go mbeadh a gcuid sonraí a sheirbheáil ag do ERDDAP , Is féidir leat a sheoladh dóibh ríomhphost ag rá rud éigin cosúil le:
Sea, is féidir linn do chuid sonraí a fháil isteach ERDDAP . Chun tús a chur leis, líon amach an fhoirm aghttps://*yourUrl*/erddap/dataProviderForm.html  (nó http:// más rud é https:// Níl cumasaithe) .
Tar éis duit a chríochnú, beidh mé i dteagmháil leat a bheith ag obair amach na sonraí deiridh.
Más mian leat ach chun breathnú ar an bhfoirm (gan a líonadh amach) , is féidir leat an fhoirm a fheiceáil ar ERD 's ERDDAP : [Déan teagmháil anois](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html) , [Cuid 1](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html) , [Cuid 2](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html) , [Cuid 3](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html) , agus [Cuid 4](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html) . Na naisc ar ERD   ERDDAP™ faisnéis a sheoladh chugam, nach bhfuil tú, mar sin ná faisnéis a chur isteach leo mura mian leat i ndáiríre sonraí a chur leis an ERD   ERDDAP .

Más mian leat an Fhoirm Sholáthair Sonraí a bhaint as do ERDDAP™ , a chur
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
i do comhad thus.xml.

Ba é an spreagadh le haghaidh seo NOAA 's 2014 [Rochtain Phoiblí ar Thorthaí Taighde (PARR PARR) An treoir](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf) , a éilíonn go léir NOAA sonraí comhshaoil a mhaoinítear trí dhollair cháiníocóra a chur ar fáil trí sheirbhís sonraí (ní hamháin comhaid) laistigh de 12 mhí ó chruthú. Mar sin, tá suim méadaithe in úsáid ERDDAP™ tacair sonraí a chur ar fáil trí sheirbhís ASAP. Ní mór dúinn ar bhealach níos éifeachtaí chun déileáil le líon mór de na soláthraithe sonraí.

Aiseolas / Suggestions? Tá an fhoirm nua, mar sin le do thoil ríomhphost erd dot data at noaa dot gov má tá aon aiseolas nó moltaí agat chun é seo a fheabhsú.

### Uirlisí{#tools} 
 ERDDAP™ thagann le dhá chlár líne ordú atá uirlisí chun cabhrú leat a chruthú ar an XML do gach tacar sonraí gur mian leat do ERDDAP™ a sheirbheáil. Nuair a bheidh tú ar bun ERDDAP™ agus é a reáchtáil (am amháin ar a laghad) , Is féidir leat teacht agus a úsáid na cláir seo sa *taiseachas aeir: fliuch* / iarratais / iarratas / eolaire WEB-INF. Tá Linux / Unix scripteanna bhlaosc (leis an síneadh .sh) agus scripteanna Windows (leis an síneadh .bat) do gach clár. \\[ Ar Linux, reáchtáil na huirlisí mar an t-úsáideoir céanna (tomcat?) a reáchtáil Tomcat. \\] Nuair a ritheann tú gach clár, beidh sé a iarraidh ort ceisteanna. I gcás gach ceist, cineál freagra, ansin brúigh Iontráil. Nó brúigh ^C a scoir clár ag am ar bith.

#### Ní bheidh clár reáchtáil?{#program-wont-run} 

* Má fhaigheann tú clár anaithnid (nó a leithéid) teachtaireacht earráide, Is é an fhadhb is dócha nach bhféadfadh an córas oibriúcháin teacht Java . Ní mór duit a figiúr amach nuair Java Is ar do ríomhaire, ansin in eagar an tagairt java sa .bat nó .sh comhad go bhfuil tú ag iarraidh a úsáid.
* Má fhaigheann tú comhad próca nach bhfuil le fáil nó rang nach bhfuil le fáil teachtaireacht earráide, ansin Java Níorbh fhéidir teacht ar cheann de na ranganna atá liostaithe sa .bat nó .sh comhad tú ag iarraidh a úsáid. Is é an réiteach a dhéanamh amach áit a bhfuil sin .jar comhad, agus in eagar an tagairt java dó sa .bat nó .sh comhad.
* Má tá tú ag baint úsáide as leagan de Java go bhfuil ró-sean do chlár, Ní bheidh an clár a reáchtáil agus beidh tú a fheiceáil teachtaireacht earráide cosúil
Eisceacht sa snáithe "príomh" java.lang.UnsupportedClassVersionEror:
     *roinnt/aicme/ainm* : Unsupported leagan major.minor *Ã ireannach*   
Is é an réiteach a thabhairt cothrom le dáta ar an leagan is déanaí de Java agus déan cinnte go bhfuil an .sh nó .bat comhad don chlár ag baint úsáide as.

#### Na huirlisí a phriontáil teachtaireachtaí diagnóiseacha éagsúla:{#the-tools-print-various-diagnostic-messages} 

* Úsáidtear an focal "ERROR" nuair a chuaigh rud éigin chomh mícheart gur theip ar an nós imeachta a chomhlánú. Cé go bhfuil sé annoying a fháil earráid, na fórsaí earráide tú chun déileáil leis an bhfadhb.
* Úsáidtear an focal "WARNING" nuair a chuaigh rud éigin mícheart, ach bhí an nós imeachta in ann a chomhlánú. Tá siad seo annamh go leor.
* Rud ar bith eile ach teachtaireacht faisnéiseach. Is féidir leat \\-verbose a chur leis an [Socraigh mar teanga réamhshocraithe](#generatedatasetsxml) nó [Seirbhís do Chustaiméirí](#dasdds) líne ordú a fháil teachtaireachtaí faisnéiseacha breise, a chabhraíonn uaireanta fadhbanna a réiteach.

Is cabhair mhór iad an dá uirlis, ach ní mór duit na treoracha seo go léir a léamh ar an leathanach seo go cúramach agus cinntí tábhachtacha a dhéanamh duit féin.

### Socraigh mar teanga réamhshocraithe{#generatedatasetsxml} 
*    **Socraigh mar teanga réamhshocraithe** Is clár líne ordú gur féidir a ghiniúint dréacht garbh de na XML tacar sonraí le haghaidh beagnach aon chineál de tacar sonraí.
    
Táimid STRONGLY AMND a úsáideann tú GenerateDatasets Xml in ionad a chruthú smután de datasets.xml de láimh mar gheall ar:
    
    * Sonraí a ghiniúint Oibríonn Xml i soicind. Ag déanamh seo de láimh ar a laghad uair an chloig oibre, fiú nuair a fhios agat cad tá tú ag déanamh.
    * Sonraí a ghiniúint Déanann Xml post níos fearr. Ag déanamh seo de láimh éilíonn eolas fairsing ar conas ERDDAP™ oibreacha. Ní dócha go ndéanfaidh tú post níos fearr de láimh. (Bob Simons Úsáideann i gcónaí GenerateDatasets Xml don chéad dréacht, agus scríobh sé ERDDAP .) 
    * Sonraí a ghiniúint Xml Gineann i gcónaí smután bailí de datasets.xml . Aon smután de datasets.xml go scríobhann tú dócha go bhfuil ar a laghad cúpla earráidí a chosc ERDDAP™ ó luchtú an tacar sonraí. Tógann sé go minic uair an chloig daoine a dhiagnóiseadh na fadhbanna. Ná dramhaíola do chuid ama. Lig Generate An tSraith Shinsearach Déanann Xml an obair chrua. Ansin, is féidir leat a bheachtú an .xml de láimh más mian leat.
    
Nuair a úsáideann tú an GenerateDatasets Xml clár:
    
    * Ar Windows, an chéad uair a ritheann tú GenerateDatasetsXml, is gá duit a chur in eagar an comhad GenerateDatasetsXml.bat le eagarthóir téacs a athrú ar an cosán ar an java. exe comhad ionas gur féidir le Windows teacht Java .
    * Sonraí a ghiniúint Xml Iarrann an chéad tú a shonrú ar an EDDType (Déan teagmháil anois Cineál Cineál Cineál cineál) an tacar sonraí. Féach an [Liosta de na Cineálacha Sonraí atá leagtha](#list-of-types-datasets)   (sa doiciméad seo) chun a fháil amach cén cineál atá oiriúnach don tacar sonraí a bhfuil tú ag obair ar. Chomh maith leis na EDDTypes rialta, tá cúpla freisin [Speisialta / Pseudo Cineálacha Socrú Sonraí](#specialpseudo-dataset-types)   (e.g., ceann a crawls catalóg THREDDS a ghiniúint smután de datasets.xml i gcás gach ceann de na tacair sonraí sa chatalóg) .
    * Sonraí a ghiniúint Xml Iarrann ansin tú sraith ceisteanna ar leith leis an EDDType. Na ceisteanna a bhailiú na faisnéise is gá le haghaidh ERDDAP™ chun rochtain a fháil ar fhoinse na tacar sonraí. A thuiscint cad ERDDAP™ go bhfuil sé ag iarraidh, féach ar na doiciméid don EDDType a shonraigh tú trí chliceáil ar an gcineál tacar sonraí céanna sa [Liosta de na Cineálacha Sonraí atá leagtha](#list-of-types-datasets) .
        
Más gá duit a chur isteach teaghrán le carachtair speisialta (e.g., carachtair spás bán ag tús nó deireadh, carachtair neamh-ASCII) , dul isteach [JSON-stíl teaghrán](https://www.json.org/json-en.html)   (le carachtair speisialta éalú le carachtair \\) . Mar shampla, chun dul isteach ach carachtar tab, cuir isteach "\t" (leis na Sleachta dúbailte máguaird, a insint ERDDAP™ go bhfuil an teaghrán JSON-stíl.
        
    * Go minic, ní bheidh duine de do chuid freagraí a bheith cad a riachtanais GenerateDatasetsXml. Is féidir leat triail ansin arís, le freagraí athbhreithnithe ar na ceisteanna, go dtí GenerateDatasets Is féidir le Xml na sonraí foinse a aimsiú agus a thuiscint go rathúil.
    * Má fhreagraíonn tú na ceisteanna i gceart (nó go leordhóthanach i gceart) , Géiniteacha Beidh Xml ceangal leis an tacar sonraí foinse agus faisnéis bhunúsach a bhailiú (mar shampla, ainmneacha athraitheacha agus meiteashonraí) .
Do thacair sonraí atá ó áitiúil NetCDF   .nc agus comhaid ghaolmhara, GenerateDatasets Beidh Xml phriontáil go minic ar an struchtúr ncdump-mhaith ar an gcomhad tar éis léann sé an comhad ar dtús. D'fhéadfadh sé seo a thabhairt duit eolas a fhreagairt ar na ceisteanna níos fearr ar lúb ina dhiaidh sin trí GenerateDatasetsXml.
    * Sonraí a ghiniúint Beidh Xml ghiniúint ansin dréacht garbh de na XML tacar sonraí don tacar sonraí.
    * Beidh eolas Diagnóiseacha agus dréacht garbh an XML tacar sonraí a scríobh chun *Treoir do Thuismitheoirí* / logs / grianghraif / grianghraif.
    * Déanfar an dréacht garbh den tacar sonraí XML a scríobh chuig *Treoir do Thuismitheoirí* / logs / GenerateDatasetsXml.out .
#### "0 comhaid" Cuardaigh le haghaidh:{#0-files-error-message} 
Má ritheann tú GenerateDatasets Xml nó [Seirbhís do Chustaiméirí](#dasdds) , nó má iarracht tú a luchtú EDDGrid Ó...Rialacháin nó EDDTableFrom... Comhaid tacar sonraí i ERDDAP™ , agus gheobhaidh tú "0 comhaid" teachtaireacht earráide a léiríonn go ERDDAP™ fuair 0 comhaid meaitseáil san eolaire (nuair a cheapann tú go bhfuil comhaid meaitseáil san eolaire) :
* Seiceáil go bhfuil tú sonraithe ainm iomlán an eolaire. Agus má shonraíonn tú an ainm comhaid sampla, déan cinnte go sonraíonn tú an comhad ainm iomlán, lena n-áirítear an t-ainm eolaire iomlán.
* Seiceáil go bhfuil na comhaid i ndáiríre san eolaire.
* Seiceáil litriú an ainm eolaire.
* Seiceáil an comhad NameRegex. Tá sé i ndáiríre, i ndáiríre éasca botúin a dhéanamh le regexes. Chun críocha tástála, déan iarracht an regex .\\* ba chóir a mheaitseáil gach ainm comhaid. (Féach seo [doiciméadú regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) agus [riachtanais uisce: measartha](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
* Seiceáil go bhfuil an t-úsáideoir atá ag rith an chláir (e.g., úsáideoir = toitcat (?) do Tomcat / ERDDAP ) Tá cead 'léamh' do na comhaid.
* I roinnt córais oibriúcháin (mar shampla, SELinux) agus ag brath ar suímh córas, ní mór an t-úsáideoir a bhí ar siúl ar an gclár a bheith 'léamh' cead le haghaidh an slabhra iomlán de eolairí as a dtiocfaidh an eolaire go bhfuil na comhaid.


* Má tá fadhbanna agat nach féidir leat a réiteach, [tacaíocht a iarraidh](/docs/intro#support) leis an oiread eolais agus is féidir. Mar an gcéanna, más cosúil nach n-oibríonn an EDDType cuí le haghaidh tacar sonraí áirithe leis an tacar sonraí sin, nó mura bhfuil EDDType cuí ann, déan comhad le do thoil [ceist ar GitHub](https://github.com/ERDDAP/erddap/issues) leis na sonraí (agus comhad samplach más ábhartha) .
         
#### Ní mór duit a chur in eagar ar an aschur ó GenerateDatasets Xml a dhéanamh níos fearr.{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* DISCLAIMER:
AN DOMHAN datasets.xml MADE BE GenerateDatasets Xml PERFECT. TÚ CHEANNTEIDEAL AGUS A FHEIDHMIÚ AN XML A ÚSÁID I POIBLÍ ERDDAP . Sonraí a ghiniúint Xml RELIES AR LOT RULES-OF-THUMB WHICH AREN'T ALWAYs CORRECT. TÚ FREAGRACH DO FHEIDHMIÚ AN CORRECTNESS AN XML GO BHFUIL TÚ ERDDAP 'Sé datasets.xml FILE.
    
     (Fíricí Spraoi: Níl mé ag shouting. Ar chúiseanna dlíthiúla stairiúla, ní mór séanadh a scríobh i ngach caipín.) 
    
Is é an t-aschur de GenerateDatasetsXml dréacht garbh.
Beidh ort beagnach i gcónaí a chur in eagar é.
Táimid tar éis a dhéanamh agus leanúint ar aghaidh ag déanamh iarracht ollmhór a dhéanamh ar an aschur mar réidh le dul agus is féidir, ach tá teorainneacha. Go minic, níl faisnéis ag teastáil ach ar fáil ó na meiteashonraí foinse.
    
Tá fadhb bhunúsach go bhfuil muid ag iarraidh clár ríomhaire (Socraigh mar teanga réamhshocraithe) a dhéanamh tasc i gcás, má thug tú an tasc céanna do 100 duine, bheadh tú a fháil 100 torthaí éagsúla. Níl aon fhreagra amháin "ceart". Ar ndóigh, a thagann an clár gaire do léamh intinn Bob (Nach bhfuil mise) , ach fiú mar sin, nach bhfuil sé clár uile-thuiscint AI, ach a bunch de heuristics cobbled le chéile chun tasc AI-mhaith a dhéanamh. (Is féidir an lá sin de chlár AI uile-thuiscint teacht, ach nach bhfuil sé fós. Má / nuair a dhéanann sé, d'fhéadfadh daoine a bhfuil fadhbanna níos mó. Bí cúramach cad is mian leat do.) 
    
* Chun críocha eolais, léiríonn an t-aschur na bhfoinsí domhanda agus na foinsí athraitheacha mar thuairimí. ERDDAP™ le chéile foclóirí agus addAttributes   (a bhfuil tosaíocht) a dhéanamh ar an comhcheangailte Tréithe a léirítear don úsáideoir. (Agus tréithe eile a chuirtear go huathoibríoch le fada, domhanleithead, airde, doimhneacht, agus athróga ama nuair ERDDAP™ i ndáiríre a dhéanann an tacar sonraí) .
     
* Más rud é nach bhfuil tú cosúil le foinse, scríobh sé trí addAttribute leis an ainm céanna ach luach difriúil (nó aon luach, más mian leat é a bhaint) .
     
* Gach an addAttributes Tá moltaí ríomh-ghiniúint. Éide iad&#33; Mura bhfuil tú mhaith addAttribute, athrú é.
     
* Más mian leat a chur eile addAttributes , cuir iad.
     
* Más mian leat athrú destinationName , é a athrú. Ach ná athrú sourceName s.
     
* Is féidir leat athrú ar an ord an dataVariable s nó aon cheann acu a bhaint.


    * Is féidir leat a úsáid ansin [Seirbhís do Chustaiméirí](#dasdds)   (féach thíos) a thástáil arís agus arís eile ar an XML don tacar sonraí a chinntiú go bhfuil an tacar sonraí mar thoradh mar is mian leat é i ERDDAP .
    * Thig leat a dhéanamh athruithe beaga ar an datasets.xml smután a ghintear, mar shampla, a sholáthar níos fearr infoUrl , achoimre, nó teideal.
#### Déan Teagmháil Linn{#donotaddstandardnames} 
Má tá \\-doNotAddStandardNames mar paraiméadar líne ordú nuair a ritheann tú a ghiniúint An tSraith Shinsearach Xml, a ghiniúint An tSraith Shinsearach Ní chuirfidh Xml standard\\_name go dtí an addAttributes le haghaidh aon athróg seachas athróga ainmnithe domhanleithead, domhanfhad, airde, doimhneacht nó am (a bhfuil soiléir standard\\_name s s) . Is féidir é seo a bheith úsáideach má tá tú ag baint úsáide as an aschur ó ghiniúint An tSraith Shinsearach Xml go díreach i ERDDAP™ gan eagarthóireacht ar an aschur, mar gheall ar ghiniúint An tSraith Shinsearach Xml guesses minic standard\\_name s mícheart. (Tabhair faoi deara go molaimid i gcónaí go bhfuil tú in eagar an t-aschur roimh é a úsáid i ERDDAP .) Beidh Ag baint úsáide as an paraiméadar a bhfuil éifeachtaí eile a bhaineann le mion mar gheall ar an guessed standard\\_name a úsáidtear go minic chun críocha eile, e.g., chun nua a chruthú long\\_name , agus a chruthú ar na suímh colorBar.
#### Scriptiú{#scripting} 
Mar mhalairt ar na ceisteanna a fhreagairt go hidirghníomhach ag an méarchlár agus lúbadh a ghiniúint tacar sonraí breise, is féidir leat a chur ar fáil argóintí líne ordú a fhreagairt gach ceann de na ceisteanna a ghiniúint tacar sonraí amháin. Sonraí a ghiniúint Déanfaidh Xml na paraiméadair sin a phróiseáil, an t-aschur a scríobh chuig an gcomhad aschuir, agus an clár a fhágáil.
        
Chun seo a chur ar bun, bain úsáid as an gclár i mód idirghníomhach agus scríobh síos do chuid freagraí. Seo sampla páirteach:
A ligean ar rá ritheann tú an script: ./GenerateDatasetsXml.sh
Ansin cuir isteach: EDDTableFromAsciiFiles
Ansin cuir isteach: /u00 / sonraí /
Ansin cuir isteach: .\\*\\.asc
Ansin cuir isteach: /u00 / sonraí / sampla File.asc
Ansin cuir isteach: ISO-8859-1
        
Chun é seo a reáchtáil ar bhealach neamh-idirghníomhach, bain úsáid as an líne ordaithe seo:
./CineálDatasetsXml.sh EDDTableFromAsciiFiles / sonraí / .\\ *\\ .asc / a00 / sonraí / sampla File.asc ISO-8859-1
Mar sin, go bunúsach, tú liosta ach na freagraí ar an líne ordú.
Ba chóir é seo a bheith úsáideach le haghaidh tacar sonraí a athrú go minic ar bhealach a éilíonn ath-reáchtáil GéiniteDatasets XLUMX (go háirithe EDDGrid Naisc go dtí suíomhanna eile) .
        
Sonraí:

* Má tá paraiméadar spás nó roinnt carachtar speisialta, ansin ionchódú an paraiméadar mar [JSON-stíl teaghrán](https://www.json.org/json-en.html) , m.sh., "mo paraiméadar le spásanna agus dhá \\n línte".
* Más mian leat a shonrú teaghrán folamh mar pharaiméadar, úsáid: rud ar bith
* Más mian leat a shonrú ar an luach réamhshocraithe paraiméadar, úsáid: réamhshocraithe
             
* Sonraí a ghiniúint Tacaíonn Xml le -i *web development XL na hEilvéise* Cóipeáil nasc leis an tweet *Déan teagmháil linn* paraiméadar líne ordú a chuireann an t-aschur isteach sa sonraithe datasets.xml comhad comhad (Níl an Tweet seo ar fáil *taiseachas aeir: fliuch* / ábhar / caipín / datasets.xml ) . Sonraí a ghiniúint Breathnaíonn Xml ar feadh dhá líne i tacair sonraí XmlName:
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
agus
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
agus in ionad gach rud i idir na línte leis an ábhar nua, agus athraíonn an someDatetime.
* Ní dhéantar an lasc -i a phróiseáil ach amháin (agus athruithe ar datasets.xml a dhéantar ach) má ritheann tú GenerateDatasets Xml le hargóintí líne ordú a shonrú go léir na freagraí ar na ceisteanna le haghaidh lúb amháin den chlár. (Féach 'Scriptiú' thuas.)   (Is é an smaoineamh: Tá an paraiméadar seo le húsáid le scripteanna. Má úsáideann tú an clár i mód idirghníomhach (info clóscríobh ar an méarchlár) , tá tú dócha a ghiniúint roinnt smután mícheart de XML sula ghiniúint tú an ceann is mian leat.) 
* Más rud é nach bhfuil na línte Tosaigh agus Deireadh le fáil, ansin na línte agus an t-ábhar nua isteach ceart roimh&lt;/ Breiseáin sonraí.
* Tá -I (caipitil i) athrú chun críocha tástála a oibríonn mar an gcéanna -i, ach cruthaíonn sé comhad ar a dtugtar datasets.xml  *Gach ceart ar cosaint.* agus nach bhfuil athruithe a dhéanamh ar datasets.xml .
* Ná reáchtáil GenerateDatasets Xml le -i i dhá phróiseas ag an am céanna. Tá seans ach sraith amháin athruithe a choinneáil. D'fhéadfadh go mbeadh deacracht thromchúiseach ann (mar shampla, comhaid truaillithe) .
    
Má úsáideann tú "GenerateDatasetsXml -verbose", beidh sé a phriontáil teachtaireachtaí níos diagnóiseacha ná mar is gnách.
    
#### Speisialta / Pseudo Cineálacha Socrú Sonraí{#specialpseudo-dataset-types} 
Go ginearálta, na roghanna EDDType i GenerateDatasets Xml cluiche de na cineálacha EDD a thuairiscítear sa doiciméad seo (féach ar an [Liosta de na Cineálacha Sonraí atá leagtha](#list-of-types-datasets) ) agus a ghiniúint amháin datasets.xml smután a chruthú tacar sonraí amháin ó fhoinse sonraí ar leith amháin. Tá roinnt eisceachtaí agus cásanna speisialta:
    
#####  EDDGrid An tSraith Shinsearach{#eddgridfromerddap} 
Gineann an EDDType seo gach ceann de na datasets.xml smután ag teastáil a dhéanamh [ EDDGrid An tSraith Shinsearach](#eddfromerddap) datasets ó gach ceann de na EDDGrid datasets i iargúlta ERDDAP . Beidh ort an rogha a choimeád ar an bunaidh datasetID s s (a d'fhéadfadh roinnt datasetID s cheana féin i do ERDDAP ) nó ainmneacha nua a ghiniúint a bheidh uathúil (ach de ghnáth nach bhfuil mar an duine- inléite) .
     
##### EDDTableFromErddap{#eddtablefromerddap} 
Gineann an EDDType seo gach ceann de na datasets.xml smután ag teastáil a dhéanamh [EDDTableFromErddap](#eddfromerddap) tacar sonraí ó gach ceann de na tacair sonraí EDDTable i iargúlta ERDDAP . Beidh ort an rogha a choimeád ar an bunaidh datasetID s s (a d'fhéadfadh roinnt datasetID s cheana féin i do ERDDAP ) nó ainmneacha nua a ghiniúint a bheidh uathúil (ach de ghnáth nach bhfuil mar an duine- inléite) .
     
#####  EDDGrid Naisc go dtí suíomhanna eile{#eddgridfromthreddscatalog} 
Gineann an EDDType seo gach ceann de na datasets.xml smután ag teastáil le haghaidh gach ceann de na [ EDDGrid Ó Dhéag](#eddgridfromdap) datasets gur féidir é a fháil ag crawling recoursely trí THREDDS (fo-alt fo) chatalóg. Tá go leor cineálacha de URLanna Catalóg THREDDS. An rogha seo REQUIRES a THREDDS .xml URL le / chatalóg / ann, mar shampla,
https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xmlnó
https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml  
(a bhaineann le catalóg html ag
https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html, nach bhfuil inghlactha le haghaidh EDDGrid Ó ThreddsCatalog).
Má tá fadhbanna agat le EDDGrid Seirbhís do Chustaiméirí Catalóg:
* Bí cinnte go bhfuil an URL a bhfuil tú ag baint úsáide as bailí, Áirítear / catalog /, agus a chríochnaíonn le /catalog.xml.
* Más féidir, bain úsáid as seoladh IP poiblí (mar shampla,https://oceanwatch.pfeg.noaa.gov) sa URL, ní seoladh IP uimhriúil áitiúil (mar shampla,https://12.34.56.78) . Má tá an THREDDS inrochtana ach amháin tríd an seoladh IP uimhriúil áitiúil, is féidir leat é a úsáid [&lt;Conas a oibríonn sé? (Tuilleadh eolais) amhlaidh ERDDAP™ úsáideoirí a fheiceáil ar an seoladh poiblí, cé go ERDDAP™ faigheann sonraí ón seoladh áitiúil uimhriúil.
* Má tá fadhbanna agat nach féidir leat a réiteach, [seiceáil na leideanna fabhtcheartaithe](#troubleshooting-tips) .
* Úsáideann an cód leibhéal íseal seo anois Unidata cód crawler catalóige (threds. cineál gas: in airde) ionas gur féidir é a láimhseáil gach catalóga THREDDS (is féidir a bheith casta ionadh) Go raibh maith agat as Unidata don chód sin.
         
#####  EDDGrid Sonraí Teagmhála{#eddgridlonpm180fromerddapcatalog} 
Gineann an EDDType seo na datasets.xml a dhéanamh [ EDDGrid Naisc go dtí suíomhanna eile](#eddgridlonpm180) datasets ó gach ceann de na EDDGrid datasets i ERDDAP go bhfuil aon luachanna domhanfhad níos mó ná 180.
* Más féidir, bain úsáid as seoladh IP poiblí (mar shampla,https://oceanwatch.pfeg.noaa.gov) sa URL, ní seoladh IP uimhriúil áitiúil (mar shampla,https://12.34.56.78) . Má tá an ERDDAP™ níl sé inrochtana ach tríd an seoladh IP uimhriúil áitiúil, is féidir leat é a úsáid [&lt;Conas a oibríonn sé? (Tuilleadh eolais) amhlaidh ERDDAP™ úsáideoirí a fheiceáil ar an seoladh poiblí, cé go ERDDAP™ faigheann sonraí ón seoladh áitiúil uimhriúil.
         
#####  EDDGrid Sonraí Teagmhála{#eddgridlon0360fromerddapcatalog} 
Gineann an EDDType seo na datasets.xml a dhéanamh [ EDDGrid Seirbhís do Chustaiméirí](#eddgridlon0360) datasets ó gach ceann de na EDDGrid datasets i ERDDAP go bhfuil aon luachanna domhanfhad níos lú ná 0.
* Más féidir, bain úsáid as seoladh IP poiblí (mar shampla,https://oceanwatch.pfeg.noaa.gov) sa URL, ní seoladh IP uimhriúil áitiúil (mar shampla,https://12.34.56.78) . Má tá an ERDDAP™ níl sé inrochtana ach tríd an seoladh IP uimhriúil áitiúil, is féidir leat é a úsáid [&lt;Conas a oibríonn sé? (Tuilleadh eolais) amhlaidh ERDDAP™ úsáideoirí a fheiceáil ar an seoladh poiblí, cé go ERDDAP™ faigheann sonraí ón seoladh áitiúil uimhriúil.
         
##### EDDsFromFiles{#eddsfromfiles} 
Mar gheall ar eolaire tús, seo a thrasnaíonn an eolaire agus gach fostiúrthóirí agus iarracht a chruthú tacar sonraí do gach grúpa de chomhaid sonraí a fhaigheann sé.
* Glacann sé seo nuair a bhíonn tacar sonraí le fáil, folaíonn an tacar sonraí gach fostiúrthóireacht.
* Má tá tacar sonraí le fáil, déileálfar le heolairí siblín den chineál céanna mar thacair sonraí ar leith (mar shampla, beidh na heolairí do na 1990í, na 2000í, na 2010, ag giniúint tacair sonraí ar leith) . Ba chóir go mbeadh siad éasca a chur le chéile de láimh - ach an chéad tacar sonraí a athrú&lt;fileDir uaire leis an eolaire tuismitheoir agus na tacair sonraí deartháireacha ina dhiaidh sin a scriosadh.
* Beidh sé seo iarracht a ghiniúint smután de datasets.xml don chineál is coitianta síneadh comhad i eolaire (Ní comhaireamh .md5, atá neamhaird) . Mar sin, thug eolaire le 10 .nc comhaid agus 5 .txt comhaid, Beidh tacar sonraí a ghiniúint do na .nc comhaid amháin.
* Glacann sé seo go mbaineann gach comhad i eolaire leis an síneadh céanna sa tacar sonraí céanna. Má tá eolaire roinnt .nc comhaid le sonraí SST agus roinnt .nc comhaid le sonraí clóraifill, ach sampla amháin .nc Beidh comhad a léamh (SST? clóraifill?) agus beidh ach amháin tacar sonraí a chruthú don chineál sin de chomhad. Beidh an tacar sonraí theipeann dócha a luchtú mar gheall ar deacrachtaí ó iarraidh a luchtú dhá chineál de chomhaid isteach sa tacar sonraí céanna.
* Má tá níos lú ná 4 comhaid leis an síneadh is coitianta i eolaire, Glacann sé seo nach bhfuil siad comhaid sonraí agus díreach skips an eolaire.
* Má tá 4 nó níos mó comhaid i eolaire, ach ní féidir é seo a ghiniúint go rathúil smután de datasets.xml do na comhaid (mar shampla, cineál comhaid gan tacaíocht) , beidh sé seo a ghiniúint [Naisc ábhartha eile](#eddtablefromfilenames) tacar sonraí do na comhaid.
* Ag deireadh na diagnóisic a scríobhann sé seo chuig an comhad logáil, díreach roimh an datasets.xml smután, beidh sé seo a phriontáil tábla le achoimre ar fhaisnéis a bailíodh ag traversing na subdirectories. Beidh an tábla liosta gach subdirectory agus léiríonn an cineál is coitianta síneadh comhad, líon iomlán na gcomhad, agus cén cineál tacar sonraí a cruthaíodh do na comhaid (más ann) . Má tá tú ag tabhairt aghaidhe ar struchtúr comhad casta, go domhain neadaithe, a mheas ag rith GenerateDatasets Xml le EDDType = EDDsFromFiles ach a ghiniúint an fhaisnéis seo,
* Ní fhéadfadh an rogha seo a dhéanamh post iontach de guessing an EDDType is fearr le haghaidh grúpa ar leith de chomhaid sonraí, ach tá sé tapaidh, éasca, agus fiú iarracht. Má tá na comhaid foinse oiriúnach, oibríonn sé go maith agus is é an chéad chéim maith i ghiniúint an datasets.xml do chóras comhaid le go leor de na subdirectories, gach ceann acu le comhaid sonraí ó tacar sonraí éagsúla.
         
##### EDDTableFromEML agus EDDTableFromEMLBatch{#eddtablefromeml-and-eddtablefromemlbatch} 
Gineann na EDDType speisialta seo na datasets.xml a dhéanamh [EDDTableFromAsciiFiles](#eddtablefromasciifiles) tacar sonraí ó gach ceann de na táblaí a thuairiscítear i [Teanga meiteashonraí Éiceolaíochta](https://knb.ecoinformatics.org/external//emlparser/docs/index.html) XML comhad. An "Batch" oibreacha leagan ar gach ceann de na comhaid EML i eolaire áitiúil nó iargúlta. Féach ar leithligh [Doiciméid le haghaidh EDDTableFromEML](/docs/server-admin/EDDTableFromEML) .
     
##### EDDTableFromInPort{#eddtablefrominport} 
Gineann an EDDType speisialta seo na datasets.xml a dhéanamh [EDDTableFromAsciiFiles](#eddtablefromasciifiles) tacar sonraí ón bhfaisnéis i [Seirbhís do Chustaiméirí](https://inport.nmfs.noaa.gov/inport) comhad. Más féidir leat rochtain a fháil ar an gcomhad sonraí foinse (Ba chóir go mbeadh an comhad inport-xml leideanna le haghaidh áit a aimsiú) , is féidir leat a dhéanamh tacar sonraí oibre i ERDDAP .

Na céimeanna seo a leanas cur síos ar conas a úsáid GenerateDatasets Xml le comhad inport-xml d'fhonn a fháil tacar sonraí ag obair i ERDDAP .

1. Nuair a bheidh tú rochtain ar an inport-xml comhad (mar URL nó mar chomhad áitiúil) : reáchtáil GenerateDatasets Xml, a shonrú EDDType = EDDTableFromInPort, a shonrú ar an URL inport-xml nó ainm comhaid iomlán, a shonrú a Child = 0, agus a shonrú ar an eolas eile a iarrtar (más eol) . (Ag an bpointe seo, ní gá duit an comhad sonraí foinse a bheith agat nó a ainm a shonrú.) Insíonn an leagan a Child = 0 GenerateDatasets Xml a scríobh amach an t-eolas do **go léir** de na&lt;eintiteas-oinniú-faisnéis&lt;aonán × ar an inport-xml comhad (má tá aon) . Priontaí sé freisin achoimre faisnéise Cúlra, lena n-áirítear gach ceann de na íoslódáil-url atá liostaithe sa chomhad inport-xml.
2. Féach tríd an eolas go léir (lena n-áirítear an t-eolas cúlra a GenerateDatasets Xml priontaí) agus tabhair cuairt ar an íoslódáil-url (s s) chun iarracht a dhéanamh teacht ar an comhad sonraí foinse (s s) . Más féidir leat teacht air (iad) , íosluchtaigh (iad) i eolaire atá inrochtana a ERDDAP . (Mura féidir leat teacht ar aon chomhaid sonraí foinse, níl aon phointe ar aghaidh.) 
3. Rith Cineálach An tSraith Shinsearach Xml arís.
Má fhreagraíonn an comhad sonraí foinse le ceann de na comhad inport-xml ar&lt;eintiteas-oinniú-faisnéis&lt;aonán uaire, a shonrú a Child = *Líon an Aonáin*   (e.g., 1, 2, 3,...) . ERDDAP™ beidh iarracht a mheaitseáil leis na hainmneacha colún sa chomhad sonraí foinse chun ainmneacha san fhaisnéis eintiteas, agus pras chun glacadh / a dhiúltú / shocrú ar aon neamhréireachtaí.
Nó, más rud é nach bhfuil an comhad inport-xml aon&lt;eintiteas-oinniú-faisnéis&lt;eintiteas ú, a shonrú a Child = 0.
4. I smután de datasets.xml a rinne GenerateDatasets Xml, athbhreithniú ar an [global&lt; addAttributes ú (Tuilleadh roghanna...) de réir mar is gá / a scriosadh.
5. I smután de datasets.xml a rinne GenerateDatasetsXml, cuir / comhairle a thabhairt ar an [&lt; dataVariable ú (#datavariable) faisnéis de réir mar is gá / a scriosadh chun cur síos ar gach ceann de na hathróga. Bí cinnte tú a aithint i gceart gach athróg ar
[EN]&lt; sourceName ú (Tuilleadh eolais)   (mar is cosúil sa bhfoinse) ,
[EN]&lt; destinationName ú (Tuilleadh eolais)   (a bhfuil teorainneacha níos mó ar charachtair a cheadaítear ná sourceName ) ,
[EN]&lt;aonad ú (#units)   (go háirithe má tá sé [am nó athróg amastamp](#timestamp-variables) nuair is gá na haonaid a shonrú ar an bhformáid) , agus
[EN]&lt; missing\\_value ú (Tuilleadh roghanna...) ,
6. Nuair a bhíonn tú gar do chríochnú, bain úsáid as arís agus arís eile an [Seirbhís do Chustaiméirí](#dasdds) uirlis a fheiceáil go tapa má tá an cur síos tacar sonraí bailí agus má beidh an tacar sonraí le feiceáil i ERDDAP™ mar is mian leat é a.
     

Bheadh sé iontach dá n-úsáidfeadh grúpaí a úsáideann InPort chun a gcuid tacar sonraí a dhoiciméadú freisin ERDDAP™ na sonraí iarbhír a chur ar fáil:

*    ERDDAP™ Is réiteach is féidir a úsáid ceart anois ionas gur féidir leat a chomhlíonadh NOAA 's [Rochtain Phoiblí ar Thorthaí Taighde (PARR PARR) riachtanais na gcustaiméirí](https://nosc.noaa.gov/EDMC/PD.DSP.php) ceart anois, ní ag am éigin doiléir sa todhchaí.
*    ERDDAP™ a dhéanann na sonraí iarbhír ar fáil d'úsáideoirí, ní hamháin na meiteashonraí. (Cad maith meiteashonraí gan sonraí?) 
*    ERDDAP™ tacú le meiteashonraí (go háirithe, aonaid na n-athróg) , murab ionann agus roinnt bogearraí freastalaí sonraí eile á mheas. (Cad é go maith sonraí gan meiteashonraí?) Chun úsáid a bhaint as bogearraí nach tacú meiteashonraí ná cuireadh a thabhairt do na sonraí a bheith misunderstood agus mí-úsáid.
*    ERDDAP™ Tá bogearraí saor in aisce agus oscailte-foinse murab ionann agus roinnt bogearraí eile á mheas. Forbairt leanúnach ERDDAP™ íoctha cheana féin. Tacaíocht do ERDDAP™ Tá úsáideoirí saor in aisce.
*    ERDDAP 'Is féidir le cuma s a oiriúnú go héasca chun do ghrúpa a léiriú agus a tharraingt (taiseachas aeir: fliuch ERD nó ERDDAP ) .
*    ERDDAP™ Cuireann ar bhealach comhsheasmhach chun rochtain a fháil ar gach tacar sonraí.
*    ERDDAP™ Is féidir sonraí a léamh ó go leor cineálacha de chomhaid sonraí agus ó bhunachair shonraí i ndáil.
*    ERDDAP™ is féidir déileáil le tacair mhóra sonraí, lena n-áirítear tacair sonraí ina bhfuil na sonraí foinse i go leor comhaid sonraí.
*    ERDDAP™ Is féidir sonraí a scríobh go leor cineálacha comhaid sonraí, ar iarratas an úsáideora, lena n-áirítear cineálacha comhaid sonraí eolaíochta cosúil le netCDF, ESRI .csv, agus ODV .txt .
*    ERDDAP™ is féidir a dhéanamh graif saincheaptha agus léarscáileanna fo-thacar na sonraí, bunaithe ar shonraíochtaí an úsáideora.
*    ERDDAP™ Is féidir déileáil le tacair sonraí neamh-sonraí ar nós bailiúcháin de íomhá, físeáin, nó comhaid fuaime.
*    ERDDAP™ suiteáilte agus a úsáidtear ag [níos mó ná 60 institiúidí ar fud an domhain](/#who-uses-erddap) .
*    ERDDAP™ liostaithe mar cheann de na freastalaithe sonraí molta le húsáid laistigh NOAA i an [ NOAA Rochtain ar Fhaisnéis faoin gComhshaol](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) , murab ionann agus roinnt bogearraí eile á mheas.
*    ERDDAP™ Is táirge de NMFS / Baile NOAA , mar sin é a úsáid laistigh NMFS agus NOAA Ba chóir go mbeadh pointe bród do NMFS agus NOAA .

Tabhair faoi deara ERDDAP™ iarracht. Má theastaíonn cabhair uait, cuir teachtaireacht sa phost ERDDAP™ Grúpa Google.
     
##### Cuir FillValueAttributes{#addfillvalueattributes} 
Ní cineál tacar sonraí é an rogha speisialta EDDType seo. Is uirlis is féidir a chur \\_FillValue tréithe le roinnt athróg i roinnt tacar sonraí. Féach ar [Cuir FillValueAttributes](#add-_fillvalue-attributes) .
     
##### Déan Teagmháil Linn Am agus am{#findduplicatetime} 
Ní cineál tacar sonraí é an rogha speisialta EDDType seo. Ina áit sin, insíonn sé GenerateDatasets Xml chun cuardach a dhéanamh trí bhailiúchán de gridded .nc   (agus a bhaineann) comhaid a aimsiú agus a phriontáil amach liosta de na comhaid le luachanna ama dúblach. Nuair a bhreathnaíonn sé ag na luachanna ama, athraíonn sé iad ó na haonaid bunaidh a "seconds since 1970-01-01" i gcás comhaid éagsúla úsáid teaghráin aonaid éagsúla. Ní mór duit a chur ar fáil ar an eolaire ag tosú (le nó gan an Slais trailing) , ainm an chomhaid léiriú rialta (e.g., .\\* .nc  ) , agus ainm an athróg ama sna comhaid.
     
##### Déan teagmháil linn{#ncdump} 
Ní cineál tacar sonraí é an rogha speisialta EDDType seo. Ina áit sin, insíonn sé GenerateDatasets Xml a phriontáil [Déan teagmháil linn](https://linux.die.net/man/1/ncdump) \\-mhaith a phriontáil amach .nc , .nc ml, nó .hdf comhad. Úsáideann sé i ndáiríre an netcdf-java ar [Seirbhís do Chustaiméirí](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html) , atá ina uirlis níos teoranta ná an leagan C de NCdump. Má úsáideann tú an rogha seo, beidh GenerateDatasetsXml iarraidh ort ceann de na roghanna a úsáid: "-h" (ceanntásc) , "-c" (vars chomhordú) , "-vall" (cineál gas: in airde) , "v var1; var2", "v var1 (0,0:10,0:20) ". Tá sé seo úsáideach mar gheall ar, gan ncdump tá sé deacair a fhios cad atá i .nc , .nc ml, nó .hdf comhad agus dá bhrí sin a EDDType ba chóir duit a shonrú le haghaidh GenerateDatasets Xml. Le haghaidh .nc ml comhad, beidh sé seo a phriontáil ar an aschur ncdump do thoradh an .nc athruithe comhad ml i bhfeidhm ar an bunúsacha .nc nó .hdf comhad.
         
### Seirbhís do Chustaiméirí{#dasdds} 
*    [ **Seirbhís do Chustaiméirí** ](#dasdds) Is clár líne ordú gur féidir leat a úsáid tar éis a chruthaigh tú an chéad iarracht ar an XML le haghaidh tacar sonraí nua i datasets.xml . Le DasDds, is féidir leat a thástáil arís agus arís eile agus an XML a bheachtú. Nuair a úsáideann tú an clár DasDds:
    1. Ar Windows, an chéad uair a ritheann tú DasDds, is gá duit a chur in eagar an DasDds. comhad bat le eagarthóir téacs a athrú ar an cosán ar an java. exe comhad ionas gur féidir le Windows teacht Java .
    2. DasDds iarrann tú do na datasetID don tacar sonraí a bhfuil tú ag obair ar.
    3. DasDds iarracht a chruthú ar an tacar sonraí leis sin datasetID .
        * DasDds priontaí i gcónaí go leor de na teachtaireachtaí diagnóiseacha.
Má úsáideann tú "DasDds -verbose", déanfaidh DasDds teachtaireachtaí diagnóiseacha níos mó a phriontáil ná mar is gnách.
        * Maidir le sábháilteacht, scriosann DasDds i gcónaí gach ceann de na faisnéis tacar sonraí i dtaisce (comhaid comhad) do na tacar sonraí roimh iarraidh a chruthú ar an tacar sonraí. Níl an Tweet seo ar fáil [duille dath glas](/docs/server-admin/additional-information#hard-flag) Mar sin, le haghaidh tacar sonraí comhiomlánaithe, b'fhéidir gur mhaith leat a choigeartú an comhad NameRegex go sealadach chun teorainn a chur le líon na gcomhad a fhaigheann an tógálaí sonraí.
        * Má theipeann ar an tacar sonraí a luchtú (ar chúis ar bith) , Beidh DasDds stopadh agus a thaispeáint duit an teachtaireacht earráide don chéad earráid a fhaigheann sé.
             **Ná déan iarracht buille faoi thuairim a d'fhéadfadh an fhadhb a bheith. Léigh an teachtaireacht ERROR go cúramach.**   
Más gá, léigh na teachtaireachtaí diagnóiseacha roimhe seo chun leideanna agus faisnéis níos mó a fháil, freisin.
        *    **Déan athrú ar an tacar sonraí XML chun iarracht a réiteach an fhadhb sin**   
agus lig DasDds iarracht a chruthú ar an tacar sonraí arís.
        *    **Má tá tú a réiteach arís agus arís eile gach fadhb, beidh tú a réiteach ar deireadh thiar na fadhbanna**   
agus beidh an tacar sonraí a luchtú.
    4. Gach aschur DasDds (diagnóisic agus torthaí) a scríobh chuig an scáileán agus a *Treoir do Thuismitheoirí* / logs / DVDanna.log .
    5. Más féidir DasDds chruthú ar an tacar sonraí, Beidh DasDds thaispeáint ansin tú an [Seirbhís do Chustaiméirí (Tógáil Struchtúr) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das) , [.dds (Déan Teagmháil Linn Struchtúr na hEagraíochta) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds) , agus [.timeGaps (bearnaí ama) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) faisnéis don tacar sonraí ar do scáileán agus iad a scríobh chuig *Treoir do Thuismitheoirí* / logs / DVDanna.out .
    6. Go minic, beidh tú ag iarraidh roinnt athrú beag a dhéanamh ar XML an tacar sonraí a ghlanadh suas meiteashonraí agus rerun DasDds.

### Bónas Uirlis Tríú Páirtí: ERDDAP taiseachas aeir: fliuch{#bonus-third-party-tool-erddap-lint} 
 ERDDAP Is clár é -lint ó Rob Fuller agus Adam Leadbetter ó Institiúid Mara na hÉireann gur féidir leat úsáid a bhaint as chun feabhas a chur ar mheiteashonraí do chuid ERDDAP™ datasets. ERDDAP -lint "a bhfuil rialacha agus iarratas gréasáin simplí statach do reáchtáil roinnt tástálacha fíorú i gcoinne do ERDDAP™ freastalaí. Gach na tástálacha ar siúl sa bhrabhsálaí gréasáin. " Cosúil leis an [Unix / Linux uirlis lint](https://en.wikipedia.org/wiki/Lint_(software) ), is féidir leat na rialacha atá ann cheana a chur in eagar nó rialacha nua a chur leis. Féach ar [ ERDDAP taiseachas aeir: fliuch](https://github.com/IrishMarineInstitute/erddap-lint) le haghaidh tuilleadh eolais.

Tá an uirlis seo úsáideach go háirithe le haghaidh tacar sonraí a chruthaigh tú roinnt ama ó shin agus anois ag iarraidh a thabhairt suas chun dáta le do roghanna meiteashonraí reatha. Mar shampla, leaganacha luath de GenerateDatasets Níor chuir Xml aon iarracht i gcruthú domhanda creator\\_name , creator\\_email , cruthaitheoir \\_type, nó creator\\_url meiteashonraí. D'fhéadfá a úsáid ERDDAP -lint a aithint na tacair sonraí a easpa na tréithe meiteashonraí.

Go raibh maith agat Rob agus Adam as a chruthú an uirlis agus é a chur ar fáil don ERDDAP™ pobail.
 
## An Struchtúr Bunúsach an datasets.xml Déan Teagmháil Linn{#the-basic-structure-of-the-datasetsxml-file} 
Na clibeanna is gá agus roghnach a cheadaítear i datasets.xml comhad comhad (agus líon na n-amanna a d'fhéadfadh siad a bheith le feiceáil) Taispeántar thíos. Go praiticiúil, do datasets.xml beidh go leor de na&lt;dataset uaire clibeanna agus a úsáid ach na clibeanna eile laistigh&lt;erddapDatasets amach mar is gá.

  >&nbsp;&lt;&#63;xml version="1.0" encoding="ISO-8859-1" &#63;>  
  >&nbsp;&lt;erddapDatasets>  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeUnits>](#angulardegreeunits)...&lt;/angularDegreeUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeTrueUnits>](#angulardegreetrueunits)...&lt;/angularDegreeTrueUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;cacheMinutes>](#cacheminutes)...&lt;/cacheMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;commonStandardNames>](#commonstandardnames)...&lt;/commonStandardNames> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateRequestCSVExample />](#convertinterpolaterequestcsvexample) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateDatasetIDVariableList />](#convertinterpolatedatasetidvariablelist) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertToPublicSourceUrl />](#converttopublicsourceurl) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxGB>](#decompressed-cache)...&lt;/decompressedCacheMaxGB> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxMinutesOld>](#decompressed-cache)...&lt;/decompressedCacheMaxMinutesOld> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;drawLandMask>](#drawlandmask)...&lt;/drawLandMask> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;emailDiagnosticsToErdData>](#emaildiagnosticstoerddata)...&lt;/emailDiagnosticsToErdData> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;graphBackgroundColor>](#graphbackgroundcolor)...&lt;/graphBackgroundColor> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequests>](#ipaddressmaxrequests)...&lt;/ipAddressMaxRequests> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequestsActive>](#ipaddressmaxrequestsactive)...&lt;ipAddressMaxRequestsActive> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressUnlimited>](#ipaddressunlimited)...&lt;ipAddressUnlimited> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMinMinutes>](#loaddatasetsminminutes)...&lt;/loadDatasetsMinMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMaxMinutes>](#loaddatasetsmaxminutes)...&lt;/loadDatasetsMaxMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;logLevel>](#loglevel)...&lt;/logLevel> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nGridThreads>](#nthreads)...&lt;/nGridThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nTableThreads>](#nthreads)...&lt;/nTableThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;palettes>](#palettes)...&lt;/palettes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxBytes>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxBytes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxCells>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxCells> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;requestBlacklist>](#requestblacklist)...&lt;/requestBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;slowDownTroubleMillis>](#slowdowntroublemillis)...&lt;/slowDownTroubleMillis> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;subscriptionEmailBlacklist>](#subscriptionemailblacklist)...&lt;/subscriptionEmailBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;unusualActivity>](#unusualactivity)...&lt;/unusualActivity> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;updateMaxEvents>](#updatemaxevents)...&lt;/updateMaxEvents> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;standardLicense>](#standard-text)...&lt;/standardLicense> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardContact>](#standard-text)...&lt;/standardContact> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDataLicenses>](#standard-text)...&lt;/standardDataLicenses> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfEndorsement>](#standard-text)...&lt;/standardDisclaimerOfEndorsement> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfExternalLinks>](#standard-text)...&lt;/standardDisclaimerOfExternalLinks> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardGeneralDisclaimer>](#standard-text)...&lt;/standardGeneralDisclaimer> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardPrivacyPolicy>](#standard-text)...&lt;/standardPrivacyPolicy> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startHeadHtml5>](#standard-text)...&lt;/startHeadHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startBodyHtml5>](#standard-text)...&lt;/startBodyHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;theShortDescriptionHtml>](#standard-text)...&lt;/theShortDescriptionHtml> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;endBodyHtml5>](#standard-text)...&lt;/endBodyHtml5> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;user username="..." password="..." roles="..." />](#user) &lt;!-- 0 or more -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;dataset>](#list-of-types-datasets)...&lt;/dataset> &lt;!-- 1 or more -->  
  >&nbsp;&lt;/erddapDatasets>  

Is féidir go mbeidh ionchódú eile a cheadú sa todhchaí, ach le haghaidh anois, moltar ach ISO-8859-1.
 
### XIn{#xinclude} 
Tá nua i leagan 2.25 tacaíocht do XInclude. Éilíonn sé seo go bhfuil tú ag baint úsáide as an parsálaí SAX&lt;cliceáil grianghraf a mhéadú&lt;/useSaxParser bhéil i do thus.xml. Is féidir é seo deis a thabhairt duit a scríobh gach tacar sonraí ina comhad féin, ansin iad go léir san áireamh sa phríomh datasets.xml , codanna athúsáide de sainmhínithe tacar sonraí, nó iad araon. Más mian leat sampla a fheiceáil, [Sonraí Teagmhála](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java) Leagann sé suas XInclude chun sainmhínithe athróg a athúsáid.
 

- - - - - -

## Nótaí{#notes} 

Ag obair leis an datasets.xml Is comhad tionscadal neamh-trivial. Léigh na nótaí seo go léir go cúramach. Tar éis duit a phiocadh [cineál tacar sonraí](#list-of-types-datasets) , léigh an cur síos mionsonraithe air go cúramach.
     
### Roghnú an Cineál Sonraí{#choosing-the-dataset-type} 
I bhformhór na gcásanna, tá ach amháin ERDDAP™ cineál tacar sonraí atá oiriúnach le haghaidh foinse sonraí ar leith. I roinnt cásanna (e.g., .nc comhaid comhad) , tá roinnt féidearthachtaí, ach de ghnáth ar cheann acu is fearr cinnte. Is é an chéad chinneadh agus is mó ní mór duit a dhéanamh ná: is iomchuí déileáil leis an tacar sonraí mar ghrúpa de arrays multidimensional (má fheiceann sin an [ EDDGrid Cineálacha tacar sonraí](#eddgrid) ) nó mar tábla bunachar sonraí cosúil le sonraí de shonraí (má fheiceann sin an [Cineálacha réamhshocraithe sonraí EDDTable](#eddtable) ) .
     
### Ag freastal ar na Sonraí Mar atá{#serving-the-data-as-is} 
De ghnáth, níl aon ghá leis an bhfoinse sonraí a mhodhnú (e.g., na comhaid a thiontú go cineál comhaid eile) ionas go ERDDAP™ is féidir freastal air. Ceann de na boinn tuisceana ERDDAP™ go mbeidh an fhoinse sonraí a úsáid mar atá. De ghnáth oibríonn sé seo fíneáil. Tá roinnt eisceachtaí:
* Bunachair shonraí agus Cassandra -- ERDDAP™ Is féidir le sonraí a sheirbheáil go díreach ó bhunachair sonraí agus Cassandra. Ach le haghaidh slándála, cothromaíocht ualach, agus saincheisteanna feidhmíochta, is féidir leat a roghnú a chur ar bun bunachar sonraí eile leis na sonraí céanna nó na sonraí a shábháil chun NetCDF v3 .nc comhaid agus tá ERDDAP™ freastal ar na sonraí ón bhfoinse sonraí nua. Féach ar [EDDTableFromDatabase](#eddtablefromdatabase) agus [EDDTableFromCassandra](#eddtablefromcassandra) .
* Gan Tacú le Foinsí Sonraí -- ERDDAP™ Is féidir tacú le líon mór de na cineálacha foinsí sonraí, ach tá an domhan a líonadh le 1000 ar (milliúin?) foinsí sonraí éagsúla (go háirithe, struchtúir comhad sonraí) . Más rud é ERDDAP™ Ní thacaíonn sé le do fhoinse sonraí:
    * Má tá an fhoinse sonraí NetCDF   .nc comhaid, is féidir leat a úsáid [An tIomlán](#ncml-files) a mhodhnú na comhaid sonraí ar-an-eitilt, nó a úsáid [ NCO ](#netcdf-operators-nco) chun na comhaid sonraí a mhodhnú go buan.
    * Is féidir leat na sonraí a scríobh chuig cineál foinse sonraí a ERDDAP™ tacaíochtaí. NetCDF -3 .nc Tá comhaid maith, moladh ginearálta toisc go bhfuil siad comhaid dénártha go ERDDAP™ is féidir a léamh go han-tapa. I gcás sonraí tabular, a mheas a stóráil na sonraí i bailiúchán de .nc comhaid a úsáideann an [CF Diosca Geometris Sampling (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Is féidir struchtúir sonraí Ragged Contiguous Array agus mar sin a láimhseáil le ERDDAP 's [EDDTableFromNcCFFiles](#eddtablefromnccffiles) ). Má tá siad eagraithe go loighciúil (gach ceann acu le sonraí le haghaidh smután de spás agus am) , ERDDAP™ is féidir le sonraí a bhaint astu go han-tapa.
    * Is féidir leat a iarraidh go bhfuil tacaíocht don fhoinse sonraí a chur leis ERDDAP™ trí ríomhphost Chris. John ag noaa.gov.
    * Is féidir leat tacaíocht a chur leis an bhfoinse sonraí trí scríobh an cód chun é féin a láimhseáil. Féach ar [an ERDDAP™ Clár na dToghthóirí](/docs/contributing/programmer-guide) 
* Luas -- ERDDAP™ Is féidir sonraí a léamh ó roinnt foinsí sonraí i bhfad níos tapúla ná daoine eile. Mar shampla, léamh NetCDF v3 .nc Tá comhaid go tapa agus a léamh comhaid ASCII níos moille. Agus má tá mór (× 1000) nó ollmhór (Seirbhís do Chustaiméirí) líon na gcomhad sonraí foinse, ERDDAP™ freagra a thabhairt ar roinnt iarrataí sonraí go mall. De ghnáth, níl an difríocht suntasach do dhaoine. Mar sin féin, má cheapann tú ERDDAP™ go mall le haghaidh tacar sonraí ar leith, is féidir leat a roghnú chun an fhadhb a réiteach trí scríobh na sonraí le thus níos éifeachtaí (de ghnáth: cúpla, dea-struchtúrtha, NetCDF v3 .nc comhaid comhad) . Le haghaidh sonraí tabular, féach [an chomhairle seo](#millions-of-files) .
         
### cineál gas: in airde{#hint} 
Is minic níos éasca an XML a ghiniúint le haghaidh tacar sonraí trí chóip de thuairisc tacar sonraí oibre a dhéanamh i dataset.xml agus ansin é a mhodhnú.
    
### Ionchódú Carachtair Speisialta{#encoding-special-characters} 
Ós rud é datasets.xml Is comhad XML, MUST tú [agus ionchódú](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML) "Agus", "&lt;", agus " lí" in aon ábhar mar " &amp;", "&lt;", agus "Tógáil;".
Ar fud an domhain:&lt;teideal × Am agus Tides&lt;/ Teideal
Ceart:&lt;teideal × Am &amp; Tides&lt;/ Teideal
     
### Ní XML fhulaingt earráidí syntax{#xml-doesnt-tolerate-syntax-errors} 
Tar éis duit in eagar an comhad dataset.xml, tá sé smaoineamh maith a fhíorú go bhfuil an toradh [XML dea-déanta](https://www.w3schools.com/xml/xml_dtd.asp) ag pasting an téacs XML i checker XML mhaith [xmlvaldation](https://www.xmlvalidation.com/) .
     
### Leideanna fabhtcheartaithe{#troubleshooting-tips} 
*    **Bealaí eile chun Fadhbanna Diagnóiseacha Le tacar Sonraí**   
Chomh maith leis an dá phríomh [Uirlisí](#tools) ,
    *    [logáil isteach.](/docs/server-admin/additional-information#log) Is comhad logáil le gach ceann de ERDDAP 's teachtaireachtaí diagnóiseacha.
    * An bhfuil [An Tuairisc Laethúil](/docs/server-admin/additional-information#daily-report) Tá níos mó eolais ná an leathanach stádas, lena n-áirítear liosta de thacair sonraí nach raibh ualach agus na heisceachtaí (earráidí) ghin siad.
    * An bhfuil [Leathanach Baile](/docs/server-admin/additional-information#status-page) Is bealach tapa a sheiceáil ERDDAP 's stádas ó aon bhrabhsálaí gréasáin. Cuimsíonn sé liosta de thacair sonraí nach raibh ualach (cé nach bhfuil na heisceachtaí gaolmhara) agus staitisticí tascTrí (a léiríonn dul chun cinn [ EDDGrid Cóip Uaireadóirí Cóip](#eddgridcopy) agus [EDDTableCopy](#eddtablecopy) tacar sonraí agus aon [ EDDGrid Seirbhís do Chustaiméirí](#eddgridfromfiles) nó [EDDTableFromFiles](#eddtablefromfiles) datasets a úsáid [riachtanais uisce: measartha](#cachefromurl)   (ach ní taisce Méid GB) ) .
    * Má fhaigheann tú i bhfostú, féach ar ár [alt ar thacaíocht bhreise a fháil](/docs/intro#support) .
         
### Athróg speisialta{#special-variables} 
*    ** [An domhanfhad, domhanleithead, airde, doimhneacht, brú, agus am (Leathanach Baile) athraitheach](#destinationname)   [ destinationName ](#destinationname) s speisialta.** 
    * Go ginearálta:
        * athróg LLAT a dhéantar ar eolas ERDDAP™ má tá an ais athróg (le haghaidh EDDGrid web development) nó athróg sonraí ar (do thacair sonraí EDDTable)   [ destinationName ](#destinationname) is "fhad", "airdeas", "airdeas", "doimhne", nó "time" .
        * Molaimid go láidir duit a bhaint as na hainmneacha caighdeánach do na hathróga nuair is féidir. Níl aon cheann acu ag teastáil. Mura n-úsáideann tú na hainmneacha athróg speisialta seo, ERDDAP™ Ní bheidh a aithint a n-tábhacht. Mar shampla, athróg LLAT cóireáilte go speisialta ag Déan A Graph ( * datasetID * .graf) : más rud é go bhfuil an athróg X Axis "fada" agus is é an athróg Y Axis "latitude", gheobhaidh tú léarscáil (réamh-mheastachán caighdeánach a úsáid, agus le masc talún, teorainneacha polaitiúla, etc.) in ionad graf.
        *    ERDDAP™ cuirfidh go leor meiteashonraí go huathoibríoch chuig athróg LLAT (mar shampla, " [ ioos\\_category ](#ioos_category) ", " [minicíocht uisce: flúirseach](#units) ", agus roinnt tréithe a bhaineann le caighdeáin cosúil le "\\_CoordinationAxisType") .
        *    ERDDAP™ go huathoibríoch, ar-an-eitilt, cuir go leor meiteashonraí domhanda a bhaineann le luachanna LLAT an fho-thacar sonraí roghnaithe (mar shampla, "geospatial \\_lon\\_min") .
        * Beidh cliaint a thacaíonn leis na caighdeáin meiteashonraí a bheith in ann leas a bhaint as na meiteashonraí breise chun na sonraí a sheasamh in am agus spás.
        * Gheobhaidh cliaint sé níos éasca fiosruithe a ghiniúint go n-áirítear athróg LLAT toisc go bhfuil ainmneacha an athróg ar an gcéanna i ngach tacar sonraí ábhartha.
    * Maidir leis an athróg "fada" agus an "latitude" athróg:
        * Úsáid an [ destinationName ](#destinationname) s "longitude" agus "latitude" ach amháin má tá an [minicíocht uisce: flúirseach](#units) Tá céimeanna\\_east agus céimeanna\\_north, faoi seach. Más rud é nach bhfuil do shonraí oiriúnach na ceanglais, úsáid a bhaint ainmneacha athraitheacha éagsúla (mar shampla, x, y, lonRadians, latRadians) .
        * Má tá tú sonraí domhanfhad agus domhanleithead in iúl in aonaid éagsúla agus dá bhrí sin le éagsúla destinationName s, mar shampla, lonRadians agus latRadians, Déan Graph ( * datasetID * .graf) Beidh graif a dhéanamh (mar shampla, sraith ama) in ionad léarscáileanna.
    * Maidir leis an "airde", "presure", nó "doimhne" athróg:
        * Úsáid an [ destinationName ](#destinationname) "airdeas" chun achar na sonraí os cionn leibhéal na farraige a aithint (dearfach = "suas" luachanna) . De rogha air sin, is féidir leat "airde" a úsáid le haghaidh achair faoi bhun leibhéal na farraige má tá na luachanna diúltacha faoi bhun na farraige (nó má úsáideann tú, mar shampla,
[EN]&lt;att ainm = " scale\\_factor " cineál = "int" - 1 1&lt;Cóipeáil nasc leis an tweet (#scale_factor) luachanna doimhneachta a thiontú ina luachanna airde.
        * Úsáid an destinationName "doimhneacht" chun achar na sonraí faoi bhun leibhéal na farraige a aithint (dearfach = "síos" luachanna) .
        * Nó, le haghaidh ingearchlónna sainithe ag leibhéil brú aeir (den sórt sin [isobars](https://en.wikipedia.org/wiki/Contour_line#Barometric_pressure) ) , ba chóir duit a leagtar ar an destinationName go "brú". Tacaíonn sé seo le haonaid i "hPa", "Pa", agus "mbar" (dearfach = "síos" luachanna) .
        * Ní fhéadfaidh ach "airde", "bhrú", nó "doimhne" athróg a bheith ag tacar sonraí.
        * Maidir leis na "airde" agus "doimhne" athróg, an [minicíocht uisce: flúirseach](#units) ní mór a bheith "m", "méadar", nó "méadair". Má tá na haonaid éagsúla (mar shampla, fathoms) , is féidir leat é a úsáid
[EN]&lt;att ainm = " scale\\_factor " *roinnt roinnt Luach* &lt;Cóipeáil nasc leis an tweet (#scale_factor) agus [EN]&lt;att ainm = "aonaid" aibhneacha&lt;Cóipeáil nasc leis an tweet (#units) na haonaid a thiontú go méadar.
        * Más rud é nach bhfuil do chuid sonraí a d'oirfeadh na riachtanais, a úsáid difriúil destinationName   (mar shampla, os cionn Timpeall, achar ToBot agus) .
        * Má tá a fhios agat an ingearach CRS le do thoil é a shonrú sna meiteashonraí, e.g., "EPSG:5829" (airde mheandarach os cionn leibhéal na farraige) , "EPSG:5831" (doimhneacht láithreach faoi bhun leibhéal na farraige) , nó "EPSG:5703" (airde airde NAVD88) .
    * Chun an "time" athróg:
        * Úsáid an [ destinationName ](#destinationname)   "time" ach amháin le haghaidh athróga go n-áirítear an dáta ar fad + am (nó dáta, má tá sé sin go léir ann) . Más rud é, mar shampla, tá colúin ar leith le haghaidh dáta agus timeOfDay, ná bain úsáid as an ainm athraitheach "time" .
        * Féach ar [minicíocht uisce: flúirseach](#time-units) le haghaidh tuilleadh eolais faoi na haonaid tréith le haghaidh am agus athróg ama.
        * An t-am athraitheach agus a bhaineann [am trátha Athróg Stampa](#timestamp-variables) Tá uathúil sa mhéid is go thiontú siad i gcónaí luachanna sonraí ó fhormáid ama an fhoinse (Is maith liom é) i luach uimhriúil (soicind ó 1970-01-T00:00:00Z) nó luach Curtain (ISO 8601:2004 (E) formáid formáid formáid) , ag brath ar an staid.
        * Nuair a iarrann úsáideoir sonraí ama, is féidir leo é a iarraidh tríd an am a shonrú mar luach uimhriúil (soicind ó 1970-01-T00:00:00Z) nó luach Curtain (ISO 8601:2004 (E) formáid formáid formáid) .
        *    ERDDAP™ Tá fóntais a [Tiontaigh Numeric Am chun / ó String Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
        * Féach ar [Conas ERDDAP Déileáil le Am](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
            
### Cén fáth ach dhá struchtúr sonraí bunúsacha?{#why-just-two-basic-data-structures} 
* Ós rud é go bhfuil sé deacair do chliaint an duine agus do chliaint ríomhaire chun déileáil le sraith casta de struchtúir sonraí féideartha, ERDDAP™ Úsáideann ach dhá struchtúr sonraí bunúsacha:
    * a [struchtúr sonraí gridded](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)   (mar shampla, le haghaidh sonraí satailíte agus sonraí samhail) agus
    * a [struchtúr sonraí tabular](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)   (mar shampla, le haghaidh in-situ baoi, stáisiún, agus sonraí trajectory) .
* Cinnte, ní féidir na sonraí go léir a chur in iúl sna struchtúir seo, ach is féidir go leor de. Is struchtúir sonraí an-solúbtha iad na táblaí, go háirithe (breathnú ar an rath a bhaineann le cláir bhunachar sonraí) .
* Déanann sé seo ceisteanna sonraí níos éasca a thógáil.
* Déanann sé seo go bhfuil struchtúr simplí ag freagairtí sonraí, rud a fhágann go bhfuil sé níos éasca na sonraí a sheirbheáil i réimse níos leithne de chineálacha caighdeánacha comhaid (a thacaíonn go minic ach struchtúir sonraí simplí) . Níl an Tweet seo ar fáil. ERDDAP™ ar an mbealach seo.
* Seo, ina dhiaidh sin, a dhéanann sé an-éasca dúinn (nó aon duine) a scríobh bogearraí cliant a oibríonn le gach ERDDAP™ datasets.
* Déanann sé seo níos éasca sonraí a chur i gcomparáid ó fhoinsí éagsúla.
* Tá a fhios againn go má úsáidtear tú chun oibriú le sonraí i struchtúir sonraí eile is féidir leat smaoineamh ar dtús go bhfuil an cur chuige seo simplí nó neamhleor. Ach tá gach struchtúr sonraí tradeoffs. Níl aon cheann foirfe. Fiú na struchtúir a dhéanamh-é-gach bhfuil a downsides: ag obair leo go bhfuil casta agus is féidir na comhaid a scríobh ach amháin nó a léamh le leabharlanna bogearraí speisialta. Má ghlacann tú ERDDAP 's cur chuige go leor chun iarracht a dhéanamh ag obair leis, is féidir leat a fháil go bhfuil sé a buntáistí (go háirithe an tacaíocht do chineálacha éagsúla comhaid ar féidir leo na freagraí sonraí a shealbhú) . An bhfuil [ ERDDAP™ seó sleamhnán](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)   (go háirithe an [struchtúir sonraí sleamhnán](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures) ) Labhraíonn a lán faoi na saincheisteanna seo.
* Agus fiú má fuaimeanna an cur chuige seo corr a thabhairt duit, an chuid is mó ERDDAP™ Ní bheidh cliaint faoi deara - beidh siad a fheiceáil ach go bhfuil gach ceann de na tacair sonraí struchtúr simplí deas agus beidh siad buíoch gur féidir leo sonraí a fháil ó réimse leathan de fhoinsí ar ais i réimse leathan formáidí comhaid.
         
### Toisí{#dimensions} 
*    **Cad a tharlaíonn má na hathróga greille sa tacar sonraí foinse DON'T roinnt na hathróga ais céanna?**   
I EDDGrid datasets, gach athróg sonraí MUST úsáid (scair) gach ceann de na hathróga ais. Mar sin, má tá tacar sonraí foinse roinnt athróg le sraith amháin de toisí, agus athróg eile le sraith éagsúla de toisí, beidh ort a dhéanamh dhá tacar sonraí i ERDDAP . Mar shampla, d'fhéadfá a dhéanamh ar cheann ERDDAP™ tacar sonraí dar teideal "Some Teideal (ar an dromchla) " a shealbhú athróga a úsáid ach \\[ am trátha \\]  \\[ domhantarraingthe \\]  \\[ tréimhse saoil: ilbhliantúil \\] toisí agus a dhéanamh eile ERDDAP™ tacar sonraí dar teideal "Some Teideal (ag doimhneacht) " a shealbhú na hathróga a úsáid \\[ am trátha \\]  \\[ airde plandaí (cm): níos airde 100 cm \\]  \\[ domhantarraingthe \\]  \\[ tréimhse saoil: ilbhliantúil \\] . Nó b'fhéidir gur féidir leat athrú ar an fhoinse sonraí a chur le gné le luach amháin (mar shampla, airde = 0) a dhéanamh ar na hathróga comhsheasmhach.
    
     ERDDAP™ Ní láimhseáil tacar sonraí níos casta (mar shampla, samhlacha a úsáideann mogalra triantáin) go maith. Is féidir leat freastal ar na tacair sonraí i ERDDAP™ trí dhá tacar sonraí nó níos mó a chruthú ERDDAP™   (ionas go mbeidh gach athróg sonraí i ngach tacar sonraí nua a roinnt ar an tsraith chéanna athróg ais) , ach nach bhfuil an méid is mian le húsáideoirí. I gcás roinnt tacar sonraí, d'fhéadfá a mheas a dhéanamh ar leagan greille rialta den tacar sonraí agus a thairiscint go chomh maith leis na sonraí bunaidh. Is féidir le roinnt bogearraí cliant déileáil ach le greille rialta, mar sin trí é seo a dhéanamh, a bhaint amach tú cliaint breise.
     
    
### Sonraí Gridded réamh-mheasta{#projected-gridded-data} 
Tá struchtúr casta ag roinnt sonraí líonta. Mar shampla, leibhéal satailíte 2 ("rian fada") ní úsáideann sonraí teilgean simplí. Seirbhís do Chustaiméirí (agus daoine eile) go minic ag obair le sonraí gridded ar réamh-mheastacháin neamh-sorcóireacha éagsúla (mar shampla, conic, steiriógrafach Polar, tripolar) nó i eangacha neamhstruchtúrtha (struchtúr sonraí níos casta) . Roinnt úsáideoirí deiridh ag iarraidh na sonraí seo mar atá, mar sin níl aon chaillteanas faisnéise. Do na cliaint, ERDDAP™ is féidir freastal ar na sonraí, mar atá, ach amháin má tá an ERDDAP™ riarthóir bhriseann an tacar sonraí bunaidh i cúpla tacar sonraí, le gach cuid lena n-áirítear athróga a roinnt na hathróga ais céanna. Sea, is cosúil go corr do dhaoine i gceist agus tá sé difriúil ó chuid is mó OPeNDAP freastalaithe. Ach ERDDAP™ béim a chur ar na sonraí a chur ar fáil i bhformáidí go leor. Is féidir mar gheall ar ERDDAP™ Úsáideann / éilíonn struchtúr sonraí níos aonfhoirmeach. Cé go bhfuil sé beagán awkward (i.e., difriúil ná mar a mheastar) , ERDDAP™ is féidir a dháileadh ar na sonraí réamh-mheasta.

 \\[ Sea, ERDDAP™ D'fhéadfadh go mbeadh riachtanais looser don struchtúr sonraí, ach a choinneáil ar na ceanglais do na formáidí aschur. Ach bheadh mar thoradh ar mearbhall i measc úsáideoirí go leor, go háirithe newbies, ós rud é go leor iarrataí cosúil gcruthaíonn sé bailí le haghaidh sonraí le struchtúir éagsúla a bheadh neamhbhailí toisc nach mbeadh na sonraí oiriúnach isteach sa chineál comhaid. Coinnímid ag teacht ar ais go dtí dearadh an chórais reatha. \\] 

Tá roinnt úsáideoirí deiridh ag iarraidh sonraí i lat teilgean sorcóireach cosúil le Equirectangular / pláta carrée nó Mercator) le haghaidh éasca-de-úsáid i gcásanna éagsúla. Maidir leis na cásanna seo, molaimid an ERDDAP™ riarthóir a úsáid roinnt bogearraí eile ( NCO ? Matlab ? R? IDV? ...?) a ath-project na sonraí ar geografach (Réamh-mheastacháin / pláta Equirectangular) nó teilgean sorcóireach eile agus freastal ar an bhfoirm sin de na sonraí i ERDDAP™ mar tacar sonraí éagsúla. Tá sé seo cosúil leis an méid a dhéanann daoine nuair a thiontú siad sonraí leibhéal satailíte 2 i leibhéal 3 sonraí. Is é ceann uirlis den sórt sin [ NCO ](https://nco.sourceforge.net/nco.html#Regridding) a thairgeann roghanna síneadh le haghaidh sonraí regridding.

#### GIS agus Sonraí a Scaoileadh{#gis-and-reprojecting-data} 
Ós rud é go bhfuil an domhan GIS minic léarscáil dírithe, a thairiscint cláir GIS de ghnáth tacaíocht do reprojecting na sonraí, i.e., plotting na sonraí ar léarscáil le réamh-mheastachán éagsúla.

Faoi láthair, ERDDAP™ nach bhfuil uirlisí chun sonraí a athchur. Ina áit sin, molaimid go n-úsáideann tú uirlis sheachtrach chun malairt a dhéanamh ar an tacar sonraí, áit a bhfuil sonraí a athdhriogadh as a bhfoirm bhunaidh ar dronuilleogach (domhanfhad domhanfhad) eagar oiriúnach do ERDDAP .

I ár dtuairim, an CF / DAP Is domhan beag difriúil ná an domhan GIS agus oibríonn sé ag leibhéal beagán níos ísle. ERDDAP™ léiríonn sin. Go ginearálta, ERDDAP™ atá deartha chun oibriú go príomha le sonraí (gan léarscáileanna) agus nach mian a athrú (e.g., reproject) na sonraí sin. Le haghaidh ERDDAP™ , Tá sonraí greille minic / de ghnáth / b'fhearr a bhaineann le luachanna lat lon agus teilgean sorcóireach, agus ní roinnt luachanna x,y teilgean. In aon chás, ERDDAP™ Ní dhéanann aon rud le réamh-mheastachán na sonraí; Gabhann sé ach na sonraí trí, mar atá, lena réamh-mheastachán reatha, ar an teoiric go bhfuil ath-projection athrú suntasach ar na sonraí agus ERDDAP™ Ní mian a bheith páirteach le hathruithe suntasacha. Chomh maith leis sin, d'fhéadfadh úsáideoirí ina dhiaidh sin naively reproject na sonraí arís, nach mbeadh chomh maith le déanamh ach amháin reprojection. (Mar sin, má tá an ERDDAP™ Is mian riarthóir a thairiscint na sonraí i réamh-mheastachán éagsúla, fíneáil; ach a athchur na sonraí as líne agus a thairiscint go mar tacar sonraí éagsúla i ERDDAP . Go leor de na tacair sonraí satailíte-bhunaithe ar fáil mar cad glaonna NASA Leibhéal 2 (babhtálacha) agus mar Leibhéal 3 (Réamh-mheastachán Equirectangular) leaganacha.) Nuair a bheidh ERDDAP™ Déanann léarscáileanna (go díreach nó trí WMS nó KML) , ERDDAP™ faoi láthair cuireann ach léarscáileanna a dhéanamh leis an teilgean Equirectangular / pláta carrée a, fortunately, Glactar leis an chuid is mó cláir mhapála.

Táimid ag spreagadh ERDDAP™ riarthóirí a úsáid roinnt bogearraí eile ( NCO ? Matlab ? R? IDV? ...?) a ath-project na sonraí ar geografach (Réamh-mheastacháin / pláta Equirectangular) nó teilgean sorcóireach eile agus freastal ar an bhfoirm sin de na sonraí i ERDDAP™ mar tacar sonraí éagsúla. Tá sé seo cosúil leis an méid a dhéanann daoine nuair a thiontú siad sonraí leibhéal satailíte 2 i leibhéal 3 sonraí. Is é ceann uirlis den sórt sin [ NCO ](https://nco.sourceforge.net/nco.html#Regridding) a thairgeann roghanna síneadh le haghaidh sonraí regridding.

Tá súil againn go ERDDAP™ beidh tógtha i uirlisí chun léarscáileanna a thairiscint le réamh-mheastacháin eile sa todhchaí. Tá súil againn freisin go mbeidh naisc níos fearr ar fud an domhain GIS sa todhchaí (seachas an reatha WMS service service service) . Tá sé uafásach go bhfuil sa "nua-aimseartha" saol, na naisc idir an CF / DAP domhan agus an domhan GIS fós chomh lag. Tá an dá de na rudaí ar an liosta a dhéanamh. (Más mian leat cabhrú, go háirithe le nascadh ERDDAP™ go MapServer, le do thoil ríomhphost Chris. John ag noaa.gov.) 
    
### Cineálacha Sonraí{#data-types} 
 ERDDAP™ tacú leis na cineálacha sonraí seo a leanas
 (tá na hainmneacha cás íogair; 'u' seasann réimír do "neamhshínithe"; Is é an líon go leor de na hainmneacha i gcórais eile an líon giotán) :

#### byte{#byte} 
*    **byte** Tá luachanna slánuimhir sínithe le raon de -128 go 127.
I gcórais eile, tá sé seo ar a dtugtar uaireanta int8.
Tugtar "tinyint" air seo ag SQL agus Cassandra.
     ERDDAP™ athraíonn [riachtanais uisce: measartha](#boolean-data) ó roinnt foinsí (e.g., SQL agus Cassandra) i bytes i ERDDAP™ le luach de 0 = False, 1=true, agus 127 = missing\\_value .
#### Déan teagmháil linn{#ubyte} 
*    **Déan teagmháil linn** Tá luachanna slánuimhir unsigned le raon 0 go 255.
I gcórais eile, tugtar uint8 air seo uaireanta.
#### gearr gearr gearr{#short} 
*    **gearr gearr gearr** Tá luachanna slánuimhir sínithe le raon de -32768 go 32767.
I gcórais eile, tá sé seo ar a dtugtar uaireanta int16.
Tá sé seo ar a dtugtar "beag" ag SQL agus Cassandra.
#### Déan teagmháil linn{#ushort} 
*    **Déan teagmháil linn** Tá luachanna slánuimhir unsigned le raon 0 go 65535.
I gcórais eile, tá sé seo ar a dtugtar uaireanta uint16.
#### taiseachas aeir: fliuch{#int} 
*    **taiseachas aeir: fliuch** Tá luachanna slánuimhir sínithe le raon de -2147483648 go 2147483647.
I gcórais eile, tá sé seo ar a dtugtar uaireanta int32.
Níl an Tweet seo ar fáil | cineál gas: in airde (?) " ag SQL agus "int" ag Cassandra.
#### foirm duille: líneach{#uint} 
*    **foirm duille: líneach** Tá luachanna slánuimhir unsigned le raon 0 go 4294967295.
I gcórais eile, tá sé seo ar a dtugtar uaireanta uint32.
#### fada{#long} 
*    **fada** Tá luachanna slánuimhir sínithe le raon de -9223372036854775808 go 9223372036854775807.
I gcórais eile, tugtar int64 air seo uaireanta.
Níl an Tweet seo ar fáil | cineál gas: in airde (?) " ag SQL agus "bigint" ag Cassandra.
Toisc nach bhfuil go leor cineálacha comhaid tacú le sonraí fada, tá a n-úsáid discouraged. Nuair is féidir, úsáid dúbailte ina ionad (féach thíos) .
#### fada{#ulong} 
*    **fada** Tá luachanna slánuimhir gan síniú le raon 0 go 18446744073709551615
I gcórais eile, tá sé seo ar a dtugtar uaireanta uint64.
Toisc nach bhfuil go leor cineálacha comhaid tacú le sonraí ulong, tá a n-úsáid discouraged. Nuair is féidir, úsáid dúbailte ina ionad (féach thíos) .
#### snámhphointe{#float} 
*    **snámhphointe** Is IEEE 754 snámhphointe le raon de thart ar +/- 3.402823466e +38.
I gcórais eile, tá sé seo ar a dtugtar uaireanta float32.
Tá sé seo ar a dtugtar "ceart | snámhphointe (?)  | deachúil (?)  | cineál gas: in airde (?) " ag SQL agus "float" ag Cassandra.
Ciallaíonn an luach speisialta NN Neamh-Uimhir.
     ERDDAP™ athraíonn luachanna infinity dearfach agus diúltach go NaN.
#### dúbailte dúbailte dúbailte{#double} 
*    **dúbailte dúbailte dúbailte** Is IEEE 754 dúbailte le raon de thart
+/- 1.7976931348623157E +308.
I gcórais eile, tá sé seo ar a dtugtar uaireanta float64.
Tá sé seo ar a dtugtar "beachtas dúbailte | snámhphointe (?)  | deachúil (?)  | cineál gas: in airde (?) " ag SQL agus "dúbailte" ag Cassandra.
Ciallaíonn an luach speisialta NN Neamh-Uimhir.
     ERDDAP™ athraíonn luachanna infinity dearfach agus diúltach go NaN.
#### foirm duille: líneach{#char} 
*    **foirm duille: líneach** Is singil, 2-byte (16-giotán)   [Unicode UCS-2 carachtar](https://en.wikipedia.org/wiki/UTF-16) ó \\u0000   (#0) trí mheán \\uffff   (Tuilleadh eolais) .
     \\uffff 's sainmhíniú nach-a-Character, atá cosúil le luach dúbailte de NaN.
Tá an úsáid a bhaint as char discouraged toisc nach bhfuil go leor cineálacha comhaid tacaíocht chars nó tacaíocht a thabhairt ach 1-byte chars (féach thíos) . Smaoinigh ag baint úsáide as String ionad.
Is féidir le húsáideoirí athróg char a úsáid chun graif a dhéanamh. ERDDAP™ Beidh na carachtair a thiontú go n-uimhir pointe cód Unicode, is féidir a úsáid mar shonraí uimhriúil.
#### String{#string} 
*    **String** Is sraith de 0 nó níos mó, 2-byte (16-giotán)   [Unicode carachtair UCS-2](https://en.wikipedia.org/wiki/UTF-16) .
     ERDDAP™ úsáidí / léirmhíniú teaghrán 0-fad mar luach ar iarraidh. ERDDAP™ Ní thacaíonn teaghrán fíor neamhní.
Is é an fad teaghrán teoiriciúil uasta 2147483647 carachtair, ach tá fadhbanna is dócha éagsúla in áiteanna éagsúla fiú le Strings beagán níos giorra.
Úsáid Úsáid Úsáidte ERDDAP 's Curtain do charachtar SQL, varchar, athrú carachtar, dénártha, varbinary, eatramh, eagar, multiset, xml, agus aon chineál sonraí bunachar sonraí eile nach bhfuil oiriúnach cleanly le haon eile ERDDAP™ cineál sonraí.
Úsáid Úsáid Úsáidte ERDDAP 's String for Cassandra's "téacs" agus aon chineál eile sonraí Cassandra nach bhfuil oiriúnach go glan le haon eile ERDDAP™ cineál sonraí.
     

Roimh ERDDAP™ v2.10, ERDDAP™ Ní raibh tacaíocht cineálacha slánuimhir unsigned go hinmheánach agus ar fáil tacaíocht teoranta ina léitheoirí sonraí agus scríbhneoirí.
    
### Teorainneacha an Chineál Sonraí{#data-type-limitations} 
Is féidir leat smaoineamh ar ERDDAP™ mar chóras a bhfuil tacair shonraí fíorúil aige, agus a oibríonn trí shonraí a léamh ó fhoinse tacar sonraí i samhail sonraí inmheánach agus sonraí a scríobh chuig seirbhísí éagsúla (m.sh.,(OPeN)DAP, WMS ) agus cineálacha comhaid mar fhreagra ar iarrataí úsáideora.

* Tacaíonn gach léitheoir ionchuir fo-thacar de na cineálacha sonraí a ERDDAP™ tacaíochtaí. Mar sin, sonraí a léamh isteach ERDDAP 's nach bhfuil struchtúir sonraí inmheánacha fadhb.
* Tacaíonn gach scríbhneoir aschuir le fo-thacar de chineálacha sonraí freisin. Sin fadhb mar gheall ar ERDDAP Tá a squeeze, mar shampla, sonraí fada i cineálacha comhaid nach bhfuil tacaíocht sonraí fada.
     

Anseo thíos tá mínithe ar na teorainneacha (cineál gas: in airde) de scríbhneoirí aschur éagsúla agus conas ERDDAP™ Déileálann leis na fadhbanna. Is cuid dhílis de na deacrachtaí sin ERDDAP 's sprioc a dhéanamh córais éagsúla idir-inoibritheach.

#### ASCII{#ascii} 
* ASCII (.csv, .tsv , etc.) comhaid téacs -
    * Tá gach sonraí uimhriúil scríofa trína ionadaíocht Curtain (le luachanna sonraí in easnamh le feiceáil mar 0-fad teaghráin) .
    * Cén fáth Cé ERDDAP™ scríobhann luachanna fada agus fada i gceart chun ASCII comhaid téacs, go leor léitheoirí (e.g., cláir scarbhileog) Ní féidir déileáil i gceart le luachanna fada agus ulong agus ina ionad sin iad a thiontú go luachanna dúbailte (le caillteanas cruinneas i gcásanna áirithe) .
    * Tá sonraí Car agus String scríofa trí JSON Strings, a láimhseáil go léir carachtair Unicode (go háirithe, na carachtair "neamhghnách" thar ASCII #127, m.sh., is cosúil an carachtar Euro mar "\\u20ac") .
    
        
#### JSON{#json} 
* JSON ( .json , .jsonlCSV , etc.) comhaid téacs -
    * Tá gach sonraí uimhriúil scríofa trína léiriú Curtain.
    * Tá sonraí Char agus String scríofa mar JSON Strings, a láimhseáil go léir carachtair Unicode (go háirithe, na carachtair "neamhghnách" thar ASCII #127, m.sh., is cosúil an carachtar Euro mar "\\u20ac") .
    * luachanna Missing do gach cineál sonraí uimhriúil le feiceáil mar neamhní.
         
####  .nc 3 comhaid{#nc3-files} 
*    .nc Ní 3 comhaid tacaíocht natively aon chineálacha sonraí slánuimhir unsigned. Roimh CF v1.9, Ní raibh CF tacaíocht cineálacha slánuimhir unsigned. Chun déileáil leis seo, ERDDAP™ 2.10+ seo a leanas an caighdeán NUG agus i gcónaí cuireann "\\_Unsigned" tréith le luach "true" nó "false" a chur in iúl má tá na sonraí ó athróg gan síniú nó sínithe. Gach tréithe slánuimhir atá scríofa mar tréithe sínithe (e.g.) le luachanna sínithe (e.g., ubyte actual\\_range tréith le luachanna 0 go 255, le feiceáil mar tréith byte le luachanna 0 go -1 (an inbhéartach an dá luach comhlán an luach as-de-raoin). Níl aon bhealach éasca a fhios a (sínithe) Ba chóir tréithe slánuimhir a léamh mar tréithe gan síniú. ERDDAP™ tacaíonn an "\\_Unsigned" tréith nuair a léann sé .nc 3 comhaid.
*    .nc Ní 3 comhaid tacaíocht a thabhairt do na cineálacha sonraí fada nó fada. ERDDAP™ Déileálann leis seo ag athrú go sealadach iad a bheith athróg dúbailte. Is féidir le Doubles ionadaíocht a dhéanamh go díreach ar gach luachanna suas go dtí +/- 9,007,199,254,740,992 atá 2 ^53. Is réiteach neamhfhoirfe é seo. Unidata Diúltaíonn a dhéanamh uasghrádú beag a .nc 3 chun déileáil leis seo agus fadhbanna gaolmhara, ag lua .nc 4 4 4 4 (athrú mór) mar an réiteach.
* An tsonraíocht CF (roimh v1.9) Dúirt sé go dtacaíonn sé le cineál sonraí char ach tá sé soiléir má tá sé i gceist ach amháin mar na bloic thógála na n-eagair char, atá éifeachtach Strings. Níor tháinig ceisteanna ar a liosta ríomhphoist ach freagraí mearbhall. Mar gheall ar na deacrachtaí seo, is fearr athróg char a sheachaint i ERDDAP™ agus úsáid a bhaint as athróga Curtain nuair is féidir.
* Go traidisiúnta, .nc 3 comhaid ach teaghráin tacaíocht le ASCII-ionchódaithe (7-giotán, Tuilleadh eolais) carachtair. NUG (agus ERDDAP ) a leathnú go (ag tosú ~ 2017) trí an tréith "\\_Encoding" a áireamh le luach "ISO-8859-1" (síneadh de ASCII a shainmhíníonn gach 256 luachanna de gach carachtar 8-giotán) nó "UTF-8" a chur in iúl conas a bhfuil na sonraí Curtain ionchódaithe. D'fhéadfadh ionchódú eile a bheith dlíthiúil ach tá discouraged.
         
####  .nc 4 comhaid{#nc4-files} 
*    .nc 4 comhaid tacú le gach ERDDAP 's cineálacha sonraí.
    
#### Comhaid NCCSV{#nccsv-files} 
Ní NCCSV 1.0 comhaid tacú le haon chineálacha sonraí slánuimhir gan síniú.
 [NCCSV 1.1+ comhaid](/docs/user/nccsv-1.00) tacú le gach cineál sonraí slánuimhir unsigned.
     
####  DAP  {#dap} 
*   (OPeN)DAP  (.das, .dds, .asc ASCII comhaid, agus .dods comhaid dénártha) - - - - -
    *   (OPeN)DAPLáimhseálann gearr, ushort, int, uint, snámhphointe agus luachanna dúbailte i gceart.
    *   (OPeN)DAPTá cineál sonraí "te" a shainmhíníonn sé mar neamhshínithe, cé go stairiúil, THREDDS agus ERDDAP™ cóireáilte "te" mar a síníodh ina(OPeN)DAPseirbhísí. Chun déileáil leis seo níos fearr, ERDDAP™ 2.10+ seo a leanas an caighdeán NUG agus i gcónaí cuireann "\\_Unsigned" tréith le luach "true" nó "false" a chur in iúl má tá na sonraí cad é an méid a ERDDAP™ glaonna beart nó ubyte. Gach tréithe beart agus ubyte scríofa mar "beann" tréithe le luachanna sínithe (m.sh., ubyte actual\\_range tréith le luachanna 0 go 255, le feiceáil mar tréith byte le luachanna 0 go -1 (an inbhéartach an dá luach comhlán an luach as-de-raoin). Níl aon bhealach éasca a fhios a "byte" Ba chóir tréithe a léamh mar tréithe ubyte.
    *   (OPeN)DAPní thacaíonn sé le fada sínithe nó gan síniú. ERDDAP™ Déileálann leis seo ag athrú go sealadach iad a bheith athróg dúbailte agus tréithe. Is féidir le Doubles ionadaíocht a dhéanamh go díreach gach luach suas le 9,007,199,254,740,992 atá 2 ^53. Is réiteach neamhfhoirfe é seo. OPeNDAP   (an eagraíocht) Diúltaíonn a dhéanamh uasghrádú beag a DAP 2.0 chun déileáil leis seo agus fadhbanna gaolmhara, ag lua DAP 4 4 4 4 (athrú mór) mar an réiteach.
    * Mar gheall ar(OPeN)DAPNíl aon chineál sonraí char ar leith agus tacaíochtaí teicniúla amháin 1-byte ASCII carachtair (Tuilleadh eolais) i Stringsa, beidh athróg sonraí char le feiceáil mar 1-carachtar-fad Strings i(OPeN)DAP.das, .dds, agus .dods freagraí.
    * Go teicniúil, an(OPeN)DAPsonraíocht tacaíonn ach teaghráin le carachtair ASCII-ionchódaithe (Tuilleadh eolais) . NUG (agus ERDDAP ) a leathnú go (ag tosú ~ 2017) trí an tréith "\\_Encoding" a áireamh le luach "ISO-8859-1" (síneadh de ASCII a shainmhíníonn gach 256 luachanna de gach carachtar 8-giotán) nó "UTF-8" a chur in iúl conas a bhfuil na sonraí Curtain ionchódaithe. D'fhéadfadh ionchódú eile a bheith dlíthiúil ach tá discouraged.
         
### Sonraí Cineál Comments{#data-type-comments} 
* Mar gheall ar an tacaíocht bocht ar feadh i bhfad, ulong, agus sonraí char i go leor cineálacha comhaid, dímholadh againn ar an úsáid a bhaint as na cineálacha sonraí i ERDDAP . Nuair is féidir, bain úsáid as dúbailte in ionad fada agus fada, agus úsáid a bhaint as String in ionad char.
     
* Metadata - Toisc(OPeN)DAP's .das agus .dds freagraí nach bhfuil tacaíocht tréithe fada nó ulong nó cineálacha sonraí (agus ina ionad sin iad a thaispeáint mar doubles) , b'fhéidir gur mhaith leat ina ionad sin a úsáid ERDDAP 's léiriú tabular de meiteashonraí mar atá le feiceáil sa http .../cuir isteach/ **info** / Baile * datasetID * .html leathanach gréasáin (mar shampla, [https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html)  )   (ar féidir leat a fháil freisin i cineálacha comhaid eile, m.sh., .csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv , .xhtml ) nó an .nccsv Freagra meiteashonraí (mar shampla, [https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) cé go cé .nccsv Tá meiteashonraí ar fáil ach amháin le haghaidh tacair sonraí tabular) , a dtacaíonn an dá cheann le gach cineál sonraí (go háirithe, fada, fada, agus char) .
         
### Na Meáin Comhaid{#media-files} 
Níl na sonraí go léir eagar uimhreacha nó téacs. Is éard atá i roinnt tacar sonraí ná comhaid meáin, mar shampla comhaid íomhá, fuaime agus físe. ERDDAP™ Tá roinnt gnéithe speisialta a dhéanamh níos éasca d'úsáideoirí rochtain a fháil ar chomhaid meán. Tá sé próiseas dhá chéim:
 

1. Déan gach comhad inrochtana tríd a URL féin, trí chóras a thacaíonn le hiarrataí raon byte.
Is é an bealach is éasca a dhéanamh seo a chur ar na comhaid i eolaire go ERDDAP™ Tá rochtain ar. (Má tá siad i gcoimeádán cosúil le .zip comhad, unzip iad, cé gur féidir leat ag iarraidh a thairiscint ar an .zip comhad d'úsáideoirí freisin.) Ansin, déan [Naisc ábhartha eile](#eddtablefromfilenames) tacar sonraí a dhéanamh ar na comhaid sin inrochtana trí ERDDAP™ , go háirithe trí ERDDAP 's [ "files" córas córas](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) .
    
Gach comhad a rinneadh inrochtana trí EDDTableFromFileNames agus ERDDAP 's "files" tacú le córas [iarratais raon byte](https://en.wikipedia.org/wiki/Byte_serving) . De ghnáth, nuair a cliant (e.g., brabhsálaí) a dhéanann iarratas chuig URL, faigheann sé an comhad ar fad mar an freagra. Ach le iarraidh raon byte, sonraíonn an t-iarratas raon de bytes ón gcomhad, agus an freastalaí ar ais ach na bytes. Tá sé seo ábhartha anseo toisc go bhfuil na himreoirí fuaime agus físe i brabhsálaithe ag obair ach amháin más féidir an comhad a rochtain trí iarratais raon beart.
    
Rogha: Má tá tú níos mó ná tacar sonraí amháin le comhaid meáin a bhaineann, is féidir leat a dhéanamh ach amháin EDDTableFromFileNames a bhfuil fo-fhillteán do gach grúpa de chomhaid. Is é an buntáiste go nuair is mian leat a chur comhaid meáin nua le haghaidh tacar sonraí nua, go léir a bhfuil tú a dhéanamh a chruthú fillteán nua agus a chur ar na comhaid san fhillteán. Cuirfear an fillteán agus na comhaid go huathoibríoch leis an tacar sonraí EDDTableFromFileNames.
    
2. Rogha: Má tá tú tacar sonraí lena n-áirítear tagairtí do chomhaid meán, é a chur leis ERDDAP .
Mar shampla, d'fhéadfá a bheith comhad .csv le chéile le haghaidh gach uair a chonaic duine éigin míol mór agus colún ina n-áirítear an t-ainm comhad íomhá a bhaineann leis an sighting. Má tá ainm an chomhaid íomhá ach an ainm comhaid, m.sh., Img20141024T192403Z, ní URL iomlán, ansin is gá duit a chur leis [comhad AccessBase Url agus / nó comhad AccessSuffix](#fileaccessbaseurl) tréithe leis na meiteashonraí don dataVariable a shonraíonn an baseURL agus iarmhír do na ainmneacha comhaid. Má rinne tú na comhaid inrochtana trí EDDTableFromFileNames, beidh an URL a bheith i bhfoirm
     *cineál gas: in airde* Seirbhís do Chustaiméirí * datasetID * / Baile
Mar shampla,
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
Má tá .zip nó comhad coimeádán eile le gach ceann de na comhaid meáin a bhaineann le athróg sonraí, molaimid go bhfuil tú a dhéanamh chomh maith go bhfuil an comhad inrochtana d'úsáideoirí (féach céim 1 thuas) agus ansin é a aithint le [cliceáil grianghraf a mhéadú irl - Library Service](#fileaccessarchiveurl) tréith.
    

 \\[ Ag tosú i ERDDAP™ v1.82 \\] Má dhéanann tú an chéad chéim thuas (nó an dá chéim) , ansin nuair a tuairimí úsáideoir an ERDDAP™   "files" córas don tacar sonraí (nó iarrann a fheiceáil fo-thacar den tacar sonraí trí .htmlTable iarraidh, má rinne tú an dara céim) , ERDDAP™ Beidh a thaispeáint '?' deilbhín ar chlé an ainm comhaid. Má hovers an t-úsáideoir thar an deilbhín, beidh siad a fheiceáil popup a léiríonn an íomhá, nó imreoir fuaime, nó imreoir físeán. Ní thacaíonn sraitheanna ach le líon teoranta cineálacha cineálacha

* íomhá íomhá (de ghnáth .gif, .jpg, agus .png) ,
* fuaime fuaime (de ghnáth .mp3, .ogg, agus .wav) , agus
* comhaid físe (de ghnáth .mp4, .ogv, agus . web development) .

Athraíonn tacaíocht le leaganacha éagsúla de brabhsálaithe éagsúla ar chórais oibriúcháin éagsúla. Mar sin, má tá tú rogha de chineál comhaid a thairiscint, a dhéanann sé ciall a thairiscint ar na cineálacha.

Nó, má chliceálann úsáideoir ar an ainm comhaid a thaispeántar ar ERDDAP™ leathanach gréasáin, Beidh a bhrabhsálaí a thaispeáint ar an íomhá, comhad fuaime nó físe mar leathanach gréasáin ar leith. Tá sé seo den chuid is mó úsáideach a fheiceáil íomhá an-mhór nó físeán scálaithe ar scáileán iomlán, in ionad i popup.
    
### Ag obair le AWS S3 Comhaid{#working-with-aws-s3-files} 
 [Seirbhís Gréasáin Amazon (Amharc ar gach eolas) ](https://aws.amazon.com) is díoltóir de [internet marketing](https://en.wikipedia.org/wiki/Cloud_computing) seirbhísí. [S3](https://aws.amazon.com/s3/) córas stórála réad a thairgeann AWS. In ionad an chórais ordlathach na eolairí agus comhaid de chóras comhad traidisiúnta (cosúil le tiomáint crua i do ríomhaire) , cuireann S3 ach "buckets" a bhfuil "cuspóirí" acu (beidh orainn glaoch orthu "files" ) .

Do ASCII comhaid (e.g.,) , ERDDAP™ is féidir oibriú leis na comhaid sna buicéid go díreach. Is é an rud amháin is gá duit a dhéanamh a shonrú ar an&lt;comhad Dir uaire le haghaidh an tacar sonraí ag baint úsáide as formáid ar leith le haghaidh an buicéad AWS, m.sh.,https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/. Níor chóir duit úsáid a bhaint as&lt;. Féach thíos le haghaidh sonraí.

Ach le haghaidh comhaid dénártha (e.g., .nc , .grib, .bufr, agus .hdf comhaid comhad) , is gá duit a bhaint as an&lt;córas cur síos ar thíos. ERDDAP cliceáil grianghraf a mhéadú (a bhfuil ERDDAP™ úsáidí a léamh sonraí ó na comhaid) , agus bogearraí sonraí eolaíochta eile atá deartha a bheith ag obair le comhaid i gcóras comhad traidisiúnta a thairgeann [leibhéal bloc](https://en.wikipedia.org/wiki/Block-level_storage) rochtain ar chomhaid (a cheadaíonn smután comhad a léamh) , ach cuireann S3 amháin [leibhéal an chomhaid (réad) ](https://en.wikipedia.org/wiki/Block-level_storage) rochtain ar chomhaid (a cheadaíonn ach léamh an comhad ar fad) . Cuireann AWS rogha eile ar fáil do S3, [Siopa Bloc leaisteacha (EBS) ](https://aws.amazon.com/ebs/) ), a thacaíonn le rochtain ar leibhéal bloc ar chomhaid ach tá sé níos costasaí ná S3, mar sin is annamh a úsáidtear é le haghaidh stóráil mórchóir cainníochtaí móra de chomhaid sonraí. (Mar sin, nuair a deir daoine sonraí a stóráil sa scamall (S3) tá sé saor, de ghnáth úlla le comparáid oráistí.) 

#### Seirbhís do Chustaiméirí{#s3-buckets} 
 **Ábhar Bucket. Eochracha. Cuspóirí. Teorainneacha.**   
Go teicniúil, níl buicéid S3 eagraithe i struchtúr comhad ordlathach cosúil le córas comhaid ar ríomhaire. Ina áit sin, tá buicéid ach "cuspóirí" (comhaid comhad) , gach ceann acu "eochair" (ainm) . Sampla de eochair sa mhéid is go bhfuil buicéad noa-goes17

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
Is é an URl comhfhreagrach don réad

 [https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc) 

Tacaíonn AWS le hathrú beag ar an gcaoi a bhfuil URL tógtha, ach ERDDAP™ Éilíonn an fhormáid amháin ar leith:
  https://*bucketName*.s3.*region*.amazonaws.com/*key*  

As ERDDAP v2.29, is féidir leat úsáid a bhaint as anois `Cóipeáil nasc leis an tweet` URI formáid in ionad an URL buicéad. Is é seo an fhormáid a úsáideann an [Seirbhís do Chustaiméirí](https://docs.aws.amazon.com/cli/latest/reference/s3/) .
Cóipeáil nasc leis an tweet *Déan Teagmháil Linn* / Baile *eochair eochair* 

An bhfuil *réigiún réigiún* Is féidir le haghaidh an URI S3 a shonrú i gceann de thrí bhealach:
- An bhfuil *réigiún réigiún* i an t-úsáideoir Tomcat `~/.aws/config` Próifíl próifíl
- An bhfuil `Seirbhísí ar líne` timpeallacht athraitheach
- An bhfuil `An bhfuil a fhios agat?` JVM athróg (i thus.sh do Tomcat) 

Tá sé cleachtas coitianta, mar atá leis an sampla seo, a dhéanamh ainmneacha tábhachtacha cuma mhaith cosán ordlathach móide ainm comhaid, ach go teicniúil nach bhfuil siad. Ós rud é go bhfuil sé coitianta agus úsáideach, ERDDAP™ déileálann eochracha le / mar má tá siad cosán ordlathach móide ainm comhaid, agus beidh an doiciméadú tagairt dóibh mar sin. Mura n-úsáideann eochracha buicéad / (m.sh., eochair cosúil le
ABI-Lib.2018.052.22.OR\\_ABI-L1b-RadM2-M3C10\\_G16\\_s20180522247575), ansin ERDDAP™ beidh cóir leighis ach an eochair ar fad mar ainm comhaid fada.

Seirbhís do Chustaiméirí -- Féadfaidh an riarthóir le haghaidh an buicéad S3 a dhéanamh ar an buicéad agus a bhfuil ann poiblí nó príobháideach. Má poiblí, is féidir aon chomhad sa bhuicéad a íoslódáil ag duine ar bith ag baint úsáide as an URL don chomhad. Amazon Tá [Sonraí Oscailte](https://aws.amazon.com/opendata/) clár a óstáil tacair sonraí poiblí (lena n-áirítear sonraí ó NOAA , NASA, agus USGS) le haghaidh saor in aisce agus nach muirear do dhuine ar bith a íoslódáil na comhaid ó na buicéid. Má tá buicéad príobháideach, níl rochtain ar chomhaid sa bhucket ach d'úsáideoirí údaraithe agus muirir AWS táille (de ghnáth íoctha ag úinéir an bhuicéid) chun comhaid a íoslódáil chuig ríomhaire S3 neamh-AWS. ERDDAP™ is féidir a bheith ag obair le sonraí i buicéid phoiblí agus príobháideacha.

#### AWS Dianuithe{#aws-credentials} 
Chun é a dhéanamh ionas go mbeidh ERDDAP™ Is féidir a léamh an t-ábhar buicéid príobháideacha, is gá duit dintiúir AWS agus is gá duit a stóráil comhad dintiúir san áit chaighdeánach sin ERDDAP™ Is féidir teacht ar an eolas. Féach an SDK AWS le haghaidh Java 2.x doiciméadacht: [Socraigh dintiúir réamhshocraithe](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials) . (An rogha a stóráil na luachanna mar Java paraiméadair líne ordú i \\[ taiseachas aeir: fliuch \\] Is féidir /bin / setenv.sh a bheith ina rogha maith.) 
#### AWS / comhaid /{#aws-files} 
* / comhaid / córas -- An bhfuil ERDDAP™   [/ comhaid / córas](#accessibleviafiles) ligeann d'úsáideoirí na comhaid foinse a íoslódáil le haghaidh tacar sonraí. Molaimid go bhfuil tú ag dul seo ar do gach tacar sonraí le comhaid foinse mar ba mhaith go leor úsáideoirí a íoslódáil na comhaid foinse bunaidh.
    * Má tá na comhaid i mbucket S3 príobháideach, beidh an t-úsáideoir iarratas a íoslódáil comhad a láimhseáil ag ERDDAP™ , a léamh na sonraí ón gcomhad agus ansin é a tharchur chuig an úsáideoir, rud a mhéadú an t-ualach ar do ERDDAP™ , ag baint úsáide as bandaleithead isteach agus amach, agus a dhéanamh leat (an ERDDAP™ internet marketing) an táille iontrála sonraí a íoc le AWS.
    * Má tá na comhaid i buicéad S3 poiblí, beidh an t-úsáideoir iarratas a íoslódáil comhad a a atreorú chuig an AWS S3 URL don chomhad sin, mar sin ní bheidh na sonraí sreabhadh tríd ERDDAP™ , rud a laghdaíonn an t-ualach ar ERDDAP . Agus má tá na comhaid i Amazon Sonraí Oscailte (saor in aisce) buicéad poiblí, ansin tú (an ERDDAP™ internet marketing) ní bheidh ort aon táille egress sonraí a íoc le AWS. Dá bhrí sin, tá buntáiste mór ag freastal ar shonraí ón bpobal (bláthanna cumhra: cumhráin) buicéid S3, agus buntáiste ollmhór chun freastal ar shonraí ó Amazon Sonraí Oscailte (saor in aisce) buicéid.

 ERDDAP Tacaíonn sé freisin le dintiúir gan ainm do bhuicéid phoiblí. A úsáid dintiúir gan ainm, cuir ` <useAwsAnonymous> fíor fíor </useAwsAnonymous> ` le do thus.xml.

#### Custom S3 Endpoints{#custom-s3-endpoints} 
I gcás stóráil réad comhoiriúnach S3 nach bhfuil óstáil ag Amazon, ní mór duit a chumrú an [Deireadh an chomhrá](https://docs.aws.amazon.com/sdkref/latest/guide/feature-ss-endpoints.html) chomh maith le specifing do buicéad / eochair ag baint úsáide as `Cóipeáil nasc leis an tweet` URI.

An bhfuil *Deireadh an chomhrá* is féidir a shonrú i gceann de thrí bhealach:
- An bhfuil *Deireadh an chomhrá* i an t-úsáideoir Tomcat `~/.aws/config` Próifíl próifíl
- An bhfuil `Seirbhísí ar líne` timpeallacht athraitheach
- An bhfuil `An bhfuil a fhios agat? irl - Library Service` JVM athróg (i thus.sh do Tomcat) 

Le haghaidh liosta iomlán de athróg chumraíocht S3, [Féach ar dhoiciméadacht Amazon](https://docs.aws.amazon.com/cli/latest/topic/config-vars.html) .

 **Deimhnithe féinfhostaithe** 
Le haghaidh buicéid S3 féin-óstáil, beidh ort go minic deimhnithe SSL féin-sínithe. Le haghaidh ERDDAP a léamh ó na buicéid seo, ní mór duit do slabhra deimhnithe a chur leis an siopa iontaobhais JVM ag `$JAVA_HOME / stua / slándála / cúisimh` . Ina theannta sin, ERDDAP úsáidí na [AWS Runtime Coiteann](https://docs.aws.amazon.com/sdkref/latest/guide/common-runtime.html) rochtain a fháil ar an buicéad asynchronously. Cuireann sé seo feidhmíocht, ach éilíonn freisin go bhfaigheann do dheimhnithe féin-sínithe a chur le do OS truststore ar leith. Más mian leat é seo a sheachaint, is féidir leat CRT AWS a dhíchumasú le ` <useAwsCrt> foirm duille: oval </useAwsCrt> ` i do thus.xml.

####  ERDDAP™ agus AWS S3 Buckets{#erddap-and-aws-s3-buckets} 
 [ ** ERDDAP™ agus AWS S3 Buckets** ](#erddap-and-aws-s3-buckets)   
Fortunately, tar éis iarracht i bhfad, ERDDAP™ Tá roinnt gnéithe a chuireann ar chumas sé déileáil leis na fadhbanna bunúsacha ag obair le rochtain ar leibhéal bloc S3 ar chomhaid ar bhealach réasúnta éifeachtach:

*    \\[ Séanadh: Tá a lán oibre breise ag obair le buicéid AWS S3. Is éiceachóras ollmhór seirbhísí agus gnéithe é AWS. Níl a lán le foghlaim. Tógann sé am agus iarracht, ach tá sé do-able. Bí othar agus beidh tú a fháil rudaí ag obair. Féach / Iarr ar chabhair
(a) [Doiciméid AWS](https://aws.amazon.com/documentation/gettingstarted/) , láithreáin ghréasáin cosúil [Stack overflow](https://stackoverflow.com/) , agus an rialta
     [ ERDDAP™ internet marketing](/docs/intro#support) ) má / nuair a fhaigheann tú i bhfostú. \\]   
     
* Is féidir é a bheith deacair a fháil amach fiú an struchtúr eolaire agus ainmneacha comhaid na comhaid i buicéad S3. ERDDAP™ Tá réiteach ar an bhfadhb seo: Tá EDDTableFromFileNames speisialta [\\*\\*\\ *](#fromonthefly) rogha a ligeann duit tacar sonraí EDDTableFromFileNames a ligeann d'úsáideoirí a bhrabhsáil ar an ábhar buicéad S3 (agus íoslódáil comhaid) tríd an tacar sonraí "files" rogha. Is maith liom é [sampla seo thíos](#viewing-the-contents-of-a-bucket) .
     
*    ERDDAP™ is féidir sonraí a léamh ó [comhaid sonraí atá comhbhrúite go seachtrach](#externally-compressed-files) , mar sin tá sé breá má tá na comhaid ar S3 stóráilte mar .gz , .gzip , .bz2 , .Z, nó cineálacha eile de chomhaid sonraí atá comhbhrúite go seachtrach, is féidir go mór (2 - 20X) gearrtha síos ar chostais stórála comhad. Tá go minic aon phionós ama le haghaidh úsáid a bhaint as comhaid a comhbhrúite go seachtrach, ós rud é an t-am a shábháil ag aistriú comhad níos lú ó S3 go ERDDAP iarmhéideanna garbh an t-am breise ag teastáil le haghaidh ERDDAP™ a decompress an comhad. Chun an ghné seo a úsáid, ní mór duit ach a chinntiú go bhfuil an tacar sonraí&lt;fileNameRegex × Ceadaíonn don chineál comhad comhbhrúite (e.g., trí chur leis ( |  .gz ) go dtí deireadh an regex) .
     
* Maidir leis an gcás is coitianta, áit a bhfuil tú ERDDAP™ suiteáilte ar do ríomhaire le haghaidh tástála / forbartha agus i gcás ina bhfuil an tacar sonraí comhaid sonraí dénártha atá stóráilte mar rudaí i buicéad S3, cur chuige amháin chun dul ar an tacar sonraí i ERDDAP™ is:
    1. Cruthaigh eolaire ar do ríomhaire a shealbhú cúpla comhaid sonraí tástála.
    2. Íoslódáil dhá comhad sonraí ón bhfoinse chuig an eolaire a chruthaigh tú díreach.
    3. Úsáid Úsáid Úsáidte [Socraigh mar teanga réamhshocraithe](#generatedatasetsxml) a ghiniúint an smután de datasets.xml don tacar sonraí bunaithe ar an dá chomhad sonraí áitiúla.
    4. Seiceáil go n-oibríonn tacar sonraí mar atá ag teastáil le [Seirbhís do Chustaiméirí](#dasdds) agus/nó do áitiúil ERDDAP .
        
         **Déanann na céimeanna seo a leanas cóip den tacar sonraí sin (a gheobhaidh sonraí ó bhucket S3) ar an bpobal ERDDAP .** 
        
    5. Cóipeáil an smután datasets.xml don tacar sonraí leis an datasets.xml don phobal ERDDAP™ a fhreastalóidh ar na sonraí.
    6. Cruthaigh eolaire ar an bpobal ERDDAP 's tiomáint crua áitiúil a shealbhú taisce de chomhaid shealadacha. Ní bheidh an eolaire úsáid a lán de spás diosca (féach cachesizeGB thíos) .
    7. Athraigh luach an tacar sonraí&lt;fileDir chlib ionas go pointí sé leis an eolaire a chruthaigh tú díreach (cé go bhfuil an eolaire folamh) .
    8. Cuir le [riachtanais uisce: measartha](#cachefromurl) tag a shonraíonn ainm buicéad na tacar sonraí agus réimír roghnach (i.e., eolaire) sa sonracha [Aws S3 URL Formáid ERDDAP™ Éilíonn](#accessing-files-in-an-aws-s3-bucket) .
    9. Cuir [&lt;taisceSizeGB ú (Tuilleadh roghanna...) tag leis an tacar sonraí xml (e.g., 10 Is luach maith don chuid is mó tacar sonraí) a insint ERDDAP™ chun teorainn a chur le méid an taisce áitiúil (i.e., ná déan iarracht a chur i dtaisce gach ceann de na comhaid iargúlta) .
    10. Féach an n-oibríonn an pobal ERDDAP . Tabhair faoi deara go bhfuil an chéad uair ERDDAP™ ualaí an tacar sonraí, beidh sé i bhfad a luchtú, mar gheall ar ERDDAP™ Ní mór a íoslódáil agus a léamh gach ceann de na comhaid sonraí.
        
Má tá an tacar sonraí bailiúchán ollmhór de chomhaid sonraí greille ollmhór, beidh sé seo a ghlacadh an-fhada agus a bheith praiticiúil. I gcásanna áirithe, le haghaidh comhaid sonraí gridded, ERDDAP™ is féidir a bhaint as an t-eolas is gá (e.g., an pointe ama do na sonraí i gcomhad sonraí greille) ón ainm comhaid agus an fhadhb seo a sheachaint. Féach ar [comhiomlánú trí Ainm an chomhaid](#aggregation-via-file-names-or-global-metadata) .
        
    11. Go raibh maith agat (ach go háirithe le haghaidh tacar sonraí EDDTableFromFiles) , is féidir leat a chur [Níl an Tweet seo ar fáil](#nthreads) tag leis an tacar sonraí a insint ERDDAP níos mó ná snáithe 1 a úsáid agus é ag freagairt d'iarraidh úsáideora ar shonraí. Laghdaíonn sé seo éifeachtaí an mhoill a tharlaíonn nuair ERDDAP™ léann comhaid sonraí ó (iargúlta iargúlta iargúlta) buicéid S3 AWS isteach sa taisce áitiúil agus (b'fhéidir b'fhéidir) decompressing iad.

#### Sonraí Oscailte S3 SWS{#aws-s3-open-data} 
Mar chuid de NOAA 's [Clár Sonraí Mór](https://www.noaa.gov/nodd/about) , NOAA Tá comhpháirtíochtaí le cúig eagraíocht, lena n-áirítear AWS, "chun iniúchadh a dhéanamh ar na buntáistí a d'fhéadfadh a bheith ann cóipeanna de phríomhbhreathnachtaí agus aschuir mhúnla a stóráil sa Cloud ionas go mbeidh ríomh díreach ar na sonraí gan tuilleadh dáileadh a bheith ag teastáil". Cuimsíonn AWS na tacair sonraí a fhaigheann sé ó NOAA mar chuid dá chlár chun rochtain phoiblí ar bhailiúchán mór a thairiscint [Sonraí Oscailte ar AWS S3](https://registry.opendata.aws/) ó aon ríomhaire, cibé an bhfuil sé mar shampla Amazon ríomh (ríomhaire ar cíos) ar an líonra AWS nó do ríomhaire féin ar aon líonra. Glacann an sampla thíos go bhfuil tú ag obair le tacar sonraí atá inrochtana go poiblí.

#### Comhaid Rochtana i Bucket AWS S3{#accessing-files-in-an-aws-s3-bucket} 
I gcás buicéad sonraí S3 príobháideacha, ní mór d'úinéir an bhucket rochtain a thabhairt duit ar an mbucket. (Féach an doiciméadú AWS.) 

I ngach cás, beidh ort cuntas AWS mar gheall ar an SDK AWS le haghaidh Java   (a bhfuil ERDDAP™ úsáidí chun faisnéis a fháil faoi ábhar buicéad) Éilíonn dintiúir cuntais AWS. (níos mó ar seo thíos) 

 ERDDAP™ is féidir rochtain a fháil ach buicéid AWS S3 má shonraíonn tú an [&lt;riachtanais uisce: measartha (Tuilleadh roghanna...) (nó&lt;fileDir uaire) i bhformáid ar leith:
https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*  
i gcás

* Is é an buicéad Name an fhoirm ghearr an t-ainm buicéad, m.sh. noa-goes17 .
* Tá an aws-region, m.sh., linn-east-1, ón gcolún "Region" i gceann de na táblaí [AWS Seirbhís Críochphointí](https://docs.aws.amazon.com/general/latest/gr/rande.html) áit a bhfuil an buicéad suite i ndáiríre.
* Tá an réimír roghnach. Má tá sé i láthair, caithfidh sé deireadh a chur leis '/' .

Mar shampla,https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/  
Tá an fhormáid URL ar cheann de na moltaí AWS S3: féach [Rochtain a fháil ar Bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html) agus [an tuairisc seo ar réimeanna](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html) . ERDDAP™ Éilíonn tú le chéile an URL buicéad agus an réimír roghnach i URL amháin d'fhonn a shonrú ar an&lt;riachtanais uisce: measartha&lt;fileDir uaire) i gcás ina bhfuil na comhaid suite.

#### Tástáil Buicéid S3 Poiblí{#test-public-aws-s3-buckets} 
I gcás buicéid phoiblí, is féidir leat agus ba chóir duit an URL buicéad den eolaire AWS S3 a thástáil i do bhrabhsálaí, m.sh.,
 [https://noaa-goes17.s3.us-east-1.amazonaws.com](https://noaa-goes17.s3.us-east-1.amazonaws.com) Má tá an URL buicéad ceart agus cuí le haghaidh ERDDAP , beidh sé ar ais doiciméad XML a bhfuil (bláthanna cumhra: cumhráin) inneachar an bhuicéid sin a liostú. Ar an drochuair, an URL iomlán (i.e., URL buicéad móide réim) go bhfuil ERDDAP™ ag iarraidh le haghaidh tacar sonraí ar leith nach bhfuil ag obair i bhrabhsálaí. Ní chuireann AWS córas ar fáil chun ordlathas buicéad a bhrabhsáil go héasca i do bhrabhsálaí. (Má tá sé sin mícheart, cuir ríomhphost chuig Chris. John ag noaa.gov. Seachas sin, Amazon, cuir tacaíocht leis seo&#33;) 

#### Ag féachaint ar Ábhar Bucket{#viewing-the-contents-of-a-bucket} 
Tá buicéid S3 go minic cúpla catagóirí de chomhaid, i cúpla fo-stiúrthóirí pseudo, a d'fhéadfadh a bheith ina cúpla ERDDAP™ datasets. A dhéanamh ar an ERDDAP™ datasets, ní mór duit a fhios ag an eolaire ag tosú do&lt;riachtanais uisce: measartha&lt;fileDir uaire) agus an fhormáid na n-ainmneacha comhaid a aithint an fo-thacar de chomhaid. Má iarracht tú chun féachaint ar an t-ábhar ar fad de buicéad i bhrabhsálaí, beidh S3 thaispeáint ach tú an chéad 1000 comhaid, nach bhfuil dóthain. Faoi láthair, is é an bealach is fearr chun tú a fheiceáil go léir an t-ábhar buicéad a dhéanamh [Naisc ábhartha eile](#eddtablefromfilenames) dataset (ar do ríomhaire ar ERDDAP™ agus/nó ar do phobal ERDDAP ) , a thugann freisin duit ar bhealach éasca a bhrabhsáil ar an struchtúr eolaire agus comhaid a íoslódáil. An bhfuil&lt;fileDir uaire go mbeidh an URL a rinne tú thuas, m.sh.,https://noaa-goes17.s3.us-east-1.amazonaws.com. \\[ Cén fáth nach AWS S3 thairiscint ar bhealach tapa agus éasca do dhuine ar bith é seo a dhéanamh gan cuntas AWS? \\] Tabhair faoi deara nuair a dhéanann mé seo ar mo ríomhaire ar líonra neamh-Amazon, is cosúil go slows Amazon síos ar an freagra ar trickle (thart ar 100 (?) comhaid in aghaidh smután) tar éis an chéad cúpla smután (de 1000 de chomhaid in aghaidh smután) íoslódáil. Ós rud é go bhféadfadh líon mór comhad a bheith ag buicéid (noaa-goes17 Tá 26 milliún) , ag fáil gach ceann de na t-ábhar buicéad a ghlacadh EDDTableFromFileNames roinnt uaireanta an chloig (e.g., 12&#33;) a chríochnú. \\[ Amazon, an ceart sin?&#33; \\] 

#### Ag déanamh EDDTable ÓFileNames Socrú Sonraí le AWS S3 Bucket{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
Má tá tú ainm buicéad, ach nach bhfuil cheana féin liosta de na comhaid i buicéad S3 nó an réimír a shainaithníonn suíomh na comhaid ábhartha sa bhuicéad, bain úsáid as na treoracha thíos a dhéanamh tacar sonraí EDDTableFromFileNames ionas gur féidir leat brabhsáil an ordlathas eolaire an buicéad S3 trí ERDDAP 's "files" córas.

1. Cuntas AWS a oscailt
     ERDDAP™ úsáidí na [AWS SDK le haghaidh Java ](https://docs.aws.amazon.com/sdk-for-java/index.html) eolas buicéad a fháil ó AWS, mar sin ní mór duit [cuntas AWS a chruthú agus a ghníomhachtú](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/) . Sin post mór go leor, le go leor de na rudaí a fhoghlaim.
     
2. Cuir do Dintiúir AWS nuair ERDDAP™ Is féidir iad a fháil.
Lean na treoracha ag [Credentials AWS agus Réigiún don Fhorbairt](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials) amhlaidh ERDDAP™   (go sonrach, an SDK AWS le haghaidh Java ) a bheith in ann do chuid dintiúir AWS a aimsiú agus a úsáid. Más rud é ERDDAP™ Ní féidir teacht ar na dintiúir, feicfidh tú
cliceáil grianghraf a mhéadú NeamhdhleathachArgumentException: Ní féidir comhad próifíl a bheith earráid null i ERDDAP 's log.txt comhad.
    
Leid do Linux agus Mac OS: ní mór an comhad dintiúir a bheith i eolaire baile an úsáideora atá ag rith Tomcat (agus ERDDAP )   (don mhír seo, beidh muid ag glacadh úsáideoir = tocat) i gcomhad ar a dtugtar ~/.aws/credentials. Ná glacadh leis go bhfuil ~ / baile / cat - i ndáiríre a úsáid cd ~ a fháil amach nuair a cheapann an córas oibriúcháin ~ d'úsáideoir = Tá boilg. Cruthaigh an eolaire más rud é nach bhfuil sé ann. Chomh maith leis sin, tar éis a chuir tú an comhad dintiúir i bhfeidhm, déan cinnte go bhfuil an t-úsáideoir agus grúpa don chomhad tomcat agus ansin úsáid chmod 400 dintiúir a dhéanamh cinnte go bhfuil an comhad a léamh-amháin d'úsáideoir = tomcat.
    
3. Cruthaigh an URL buicéad sa [formáid sin ERDDAP™ Éilíonn](#accessing-files-in-an-aws-s3-bucket) , m.sh.,
     [https://noaa-goes17.s3.us-east-1.amazonaws.com](https://noaa-goes17.s3.us-east-1.amazonaws.com) , agus (le haghaidh buicéid phoiblí) é a thástáil i bhrabhsálaí chun a chinntiú go bhfilleann sé doiciméad XML a bhfuil liosta páirteach ann ar ábhar an bhuicéid sin.
     
4. Úsáid Úsáid Úsáidte [Socraigh mar teanga réamhshocraithe](#generatedatasetsxml) a chruthú [Naisc ábhartha eile](#eddtablefromfilenames) tacar sonraí:
    * Chun an eolaire Tosaigh, bain úsáid as an syntax:
        \\*\\*\\ *ó Faraor,* Naisc ábhartha eile
mar shampla,
        \\*\\*\\ * As an Fly,https://noaa-goes17.s3.us-east-1.amazonaws.com/
    * ainm comhaid regex? .\\*
    * Athchúrsach? fíor fíor
    * reload Gach Neamhghnách? 10080
    *    infoUrl ?https://registry.opendata.aws/noaa-goes/
    * institiúid? NOAA 
    * achoimre? rud ar bith ( ERDDAP™ Beidh a chruthú achoimre réasúnta go huathoibríoch.) 
    * teideal? rud ar bith ( ERDDAP™ a chruthú teideal réasúnta go huathoibríoch.) Mar is gnách, ba chóir duit an XML mar thoradh air sin a chur in eagar chun cruinneas a fhíorú agus feabhsuithe a dhéanamh roimh an smután tacar sonraí a úsáid i datasets.xml .
5. Má leanann tú na treoracha thuas agus an tacar sonraí a luchtú i ERDDAP , gur chruthaigh tú tacar sonraí EDDTableFromFiles. Mar shampla, agus a dhéanamh níos éasca do dhuine ar bith a bhrabhsáil agus a íoslódáil comhaid ó na buicéid AWS Sonraí Oscailte, ní mór dúinn a cruthaíodh EDDTableFromFileNames datasets (féach ar an liosta ag an
     [https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_) ) le haghaidh beagnach gach ceann de na [AWS S3 buicéid Sonraí Oscailte](https://registry.opendata.aws/) .
     \\[ Na buicéid beag nach raibh muid san áireamh ceachtar bhfuil líon mór de na comhaid sa eolaire fhréamh (níos mó ná is féidir iad a íoslódáil i méid réasúnach ama) , nó ná lig rochtain phoiblí (Nach bhfuil siad go léir ceaptha a bheith poiblí?) , nó tá buicéid Íoc Iarrthóir (e.g., Sentinel) . \\]   
Má chliceálann tú ar an "files" nasc le haghaidh ceann de na tacair shonraí seo, is féidir leat an crann eolaire agus comhaid a bhrabhsáil sa bhucket S3 sin. Mar gheall ar an mbealach\\*\\*\\ * Ó Oibríonn OnTheFly EDDTableFromFiles, tá na liostaí eolaire i gcónaí breá cothrom le dáta mar gheall ar ERDDAP™ faigheann siad ar-an-eitilt. Má chliceálann tú síos ar an crann eolaire chuig ainm comhad iarbhír agus cliceáil ar an ainm comhaid, ERDDAP™ d’iarratas atreorú chuig AWS S3 ionas gur féidir leat an comhad a íoslódáil go díreach ó AWS. Is féidir leat iniúchadh ansin an comhad.
    
Trioblóid?
Más rud é nach mbeidh do EDDTableFromFiles ualach i ERDDAP™   (nó DasDds) , breathnú ar an comhad log.txt le haghaidh teachtaireacht earráide. Má fheiceann tú
cliceáil grianghraf a mhéadú NeamhdhleathachArgumentException: Ní féidir comhad próifíl a bheith earráid null, is é an fhadhb go bhfuil an SDK AWS le haghaidh Java   (a úsáidtear ERDDAP ) Níl a aimsiú ar an comhad dintiúir. Féach na treoracha dintiúir thuas.
     

Is trua nach ligeann AWS do dhaoine brabhsálaí a úsáid chun ábhar buicéad poiblí a fheiceáil.

 **Ansin is féidir leat a dhéanamh ERDDAP™ datasets a thugann rochtain d'úsáideoirí ar na sonraí sna comhaid.**   
Féach na treoracha i [ ERDDAP™ agus S3 Buckets](#erddap-and-aws-s3-buckets)   (thuas thuas) .
Maidir leis an sampla EDDTableFromFileNames tacar sonraí a rinne tú thuas, má dhéanann tú poking beag ar fud leis an eolaire agus ainmneacha comhaid sa chrann eolaire, éiríonn sé soiléir go bhfuil an leibhéal barr ainmneacha eolaire ainmneacha (e.g., ABI-L1b-RadC) a fhreagraíonn do cad ERDDAP™ bheadh glaoch tacar sonraí ar leith. D'fhéadfadh an buicéad atá tú ag obair le bheith cosúil. D'fhéadfá a shaothrú ansin a chruthú tacair sonraí ar leith i ERDDAP™ i gcás gach ceann de na tacair shonraí sin, ag úsáid, e.g.
https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/  
mar an&lt;taisceFromUrl . Ar an drochuair, mar shampla ar leith, is cosúil go bhfuil na tacair sonraí sa bhucket leibhéal 1 nó leibhéal 2 tacar sonraí, a ERDDAP™   [Ní maith go háirithe ag](#dimensions) , toisc go bhfuil an tacar sonraí bailiúchán níos casta de athróga a úsáideann toisí éagsúla.
     
    
### comhaid NcML{#ncml-files} 
NcML comhaid lig tú a shonrú ar-an-eitilt athruithe ar foinse amháin nó níos mó bunaidh NetCDF   (v3 nó v4)   .nc , .grib, .bufr, nó .hdf   (v4 nó v5) comhaid, agus ansin a bheith ERDDAP™ a chóireáil an .nc ml comhaid mar na comhaid foinse. ERDDAP™ Beidh tacair sonraí glacadh .nc ml comhaid aon uair .nc comhaid ag súil. An NcML comhaid MUST bhfuil an síneadh .nc ml. Féach an [ Unidata NcML Doiciméid](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html) . Tá NcML úsáideach toisc gur féidir leat roinnt rudaí a dhéanamh leis (mar shampla, athruithe éagsúla a dhéanamh ar chomhaid éagsúla i mbailiúchán, lena n-áirítear gné a chur le luach sonrach ar chomhad) , nach féidir leat a dhéanamh le ERDDAP 's datasets.xml .

* Athruithe ar .nc Beidh am comhad ml ar Athraithe deireanach a chur faoi deara an comhad a athluchtú nuair a bhíonn an tacar sonraí athluchtaithe, ach athruithe ar an bunúsacha .nc Ní bheidh comhaid sonraí a thabhairt faoi deara go díreach.
* Leid: Tá NcML\\*an-\\*íogair leis an ord roinnt míreanna sa chomhad NcML. Smaoinigh ar NcML mar a shonrú sraith treoracha san ord sonraithe, le hintinn athrú ar na comhaid foinse (an stát ag an tús / barr an comhad NcML) isteach sa cheann scríbe comhaid (an stát ag deireadh / bun an chomhaid NcML) .

Tá rogha eile de NcML an [ NetCDF OibritheoirÃ ( NCO ) ](#netcdf-operators-nco) . Is é an difríocht mhór go bhfuil NcML córas chun athruithe a dhéanamh ar-an-eitilt (mar sin nach bhfuil na comhaid foinse athrú) , whereas NCO is féidir é a úsáid chun athruithe a dhéanamh (nó leaganacha nua de) na comhaid. An dá rud NCO agus NcML Tá an-, an-solúbtha agus ligfidh tú a dhéanamh beagnach aon athrú is féidir leat smaoineamh ar na comhaid. I gcás an dá, is féidir é a bheith dúshlánach a figiúr amach go díreach conas a dhéanamh cad ba mhaith leat a dhéanamh - seiceáil ar an ngréasán le haghaidh samplaí den chineál céanna. Tá an dá uirlisí úsáideacha a ullmhú netCDF agus HDF comhaid le húsáid le ERDDAP , go háirithe, athruithe a dhéanamh níos faide ná an méid ERDDAP 'Is féidir le córas cúblála s a dhéanamh.

Sampla #1: Ag cur Deasc Ama le Luach Aonair
Seo an .nc ml comhad a chruthaíonn gné seachtrach nua (am, le 1 luach: 1041379200) agus cuireann an ghné sin leis an athróg pic sa chomhad darb ainm A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km .nc :
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
Sampla #2: Athrú Luach Ama atá ann cheana
Uaireanta an fhoinse .nc comhad cheana féin tá gné am agus luach ama, ach tá an luach mícheart (chun críocha) . Seo é .nc ml comhad a deir: don chomhad sonraí ainmnithe "19810825230030-NCEI...", don athróg gné "time" , leagtar na haonaid tréith a bheith 'soicindí ó 1970-01-01T00:00:00Z' agus a leagtar an luach ama a bheith 367588800.
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
###  NetCDF OibritheoirÃ ( NCO )  {#netcdf-operators-nco} 
"Oibreoirí NetCDF ( NCO ) Cuimsíonn dosaen standalone, ordú-líne cláir a ghlacadh netCDF \\[ v3 nó v4 \\] , HDF   \\[ v4 nó v5 \\] , \\[ .grib, .bufr, \\] agus/nó DAP comhaid mar ionchur, ansin oibriú (e.g., sonraí nua a dhíorthú, staitisticí a ríomh, a phriontáil, hyperslab, meiteashonraí a ionramháil) agus aschur na torthaí a scáileán nó comhaid i téacs, dénártha, nó formáidí netCDF. NCO áiseanna anailís ar shonraí eolaíochta gridded. An stíl bhlaosc-command NCO ligeann d'úsáideoirí a ionramháil agus comhaid a anailísiú idirghníomhú, nó le scripteanna expressive a sheachaint ar roinnt lasnairde na timpeallachtaí cláir ardleibhéil." (ó na [ NCO ](https://nco.sourceforge.net/) home page) .

Rogha eile NCO Is maith liom [An tIomlán](#ncml-files) . Is é an difríocht mhór go bhfuil NcML córas chun athruithe a dhéanamh ar-an-eitilt (mar sin nach bhfuil na comhaid foinse athrú) , whereas NCO is féidir é a úsáid chun athruithe a dhéanamh (nó leaganacha nua de) na comhaid. An dá rud NCO agus NcML Tá an-, an-solúbtha agus ligfidh tú a dhéanamh beagnach aon athrú is féidir leat smaoineamh ar na comhaid. I gcás an dá, is féidir é a bheith dúshlánach a figiúr amach go díreach conas a dhéanamh cad ba mhaith leat a dhéanamh - seiceáil ar an ngréasán le haghaidh samplaí den chineál céanna. Tá an dá uirlisí úsáideacha a ullmhú netCDF agus HDF comhaid le húsáid le ERDDAP , go háirithe, athruithe a dhéanamh níos faide ná an méid ERDDAP 'Is féidir le córas cúblála s a dhéanamh.

Mar shampla, is féidir leat é a úsáid NCO a dhéanamh ar na haonaid an athróg ama comhsheasmhach i ngrúpa de chomhaid nuair nach raibh siad ag teacht ar dtús. Nó, is féidir leat é a úsáid NCO iarratas a dhéanamh scale\\_factor agus add\\_offset i ngrúpa de chomhaid i gcás scale\\_factor agus add\\_offset Tá luachanna éagsúla i gcomhaid foinse éagsúla.
 (Nó, is féidir leat déileáil anois leis na fadhbanna i ERDDAP™ via via via via [ EDDGrid Ón NcFilesUnpacked](#eddgridfromncfilesunpacked) , a bhfuil malairt de EDDGrid FromNcFiles a unpacks sonraí pacáilte agus a chaighdeánaíonn luachanna ama ag leibhéal íseal d'fhonn déileáil le comhaid a bhailiú go bhfuil éagsúla scale\\_factor s agus add\\_offset , nó aonaid ama éagsúla.) 

 NCO Tá Bogearraí Foinse Saor in Aisce agus Oscailte a úsáideann an [GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html) ceadúnas.

Sampla #1: Aonaid a Dhéanamh
 EDDGrid Ó Fianáin agus EDDTable Ó Comhaid seasann go bhfuil na haonaid le haghaidh athróg ar leith a bheith comhionann i ngach ceann de na comhaid. Má tá roinnt de na comhaid fánach (gan feidhmiúil) difriúil ó dhaoine eile (m.sh., aonaid ama
"dara ó 1970-01-01 00:00:00 UTC" i gcoinne
 "seconds since 1970-01-01T00:00:00Z" , d'fhéadfaí tú a úsáid NCO 's [cliceáil grianghraf a mhéadú](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor) . a athrú ar na haonaid i ngach ceann de na comhaid a bheith comhionann le
nco/ncatted - aonaid, am,o,c,'seconds ó 1970-01T00:00Z' \\ * .nc   
 \\[ Chun go leor fadhbanna mar seo i EDDTableFrom... Comhaid tacar sonraí, is féidir leat úsáid a bhaint anois [caighdeánú Cad iad na rudaí maithe a bhain...](#standardizewhat) a insint ERDDAP a chaighdeánú na comhaid foinse mar a léigh siad isteach ERDDAP . \\] 
    
### Teorainneacha le Méid tacar Sonraí{#limits-to-the-size-of-a-dataset} 
Feicfidh tú go leor tagairtí do "2 billiún" thíos. Níos cruinne, is é sin tagairt do 2,147,483,647 (Cén fáth ar chóir dom dul?) , a bhfuil an luach uasta de slánuimhir 32-giotán sínithe. I roinnt teangacha ríomhaireachta, mar shampla Java   (a bhfuil ERDDAP™ Tá scríofa i) , is é sin an cineál sonraí is mó is féidir a úsáid le haghaidh struchtúir sonraí go leor (mar shampla, méid eagar) .

Do luachanna Curtain (mar shampla, le haghaidh ainmneacha athraitheacha, ainmneacha tréith, luachanna tréith Curtain, agus luachanna sonraí Curtain) , an líon uasta de charachtair in aghaidh an String i ERDDAP™ Is ~ 2 billiún. Ach i mbeagnach gach cás, beidh fadhbanna beaga nó móra ann má sháraíonn teaghrán méid réasúnach (e.g., carachtair 80 le haghaidh ainmneacha athraitheacha agus ainmneacha tréith, agus 255 carachtair don chuid is mó luachanna tréith Curtain agus luachanna sonraí) . Mar shampla, beidh leathanaigh ghréasáin a thaispeánann ainmneacha athróg fada a bheith awkwardly leathan agus beidh ainmneacha athróg fada a teasctha má tá siad níos mó ná an teorainn an cineál comhaid freagra.

Le haghaidh tacar sonraí gridded:

* An líon uasta axisVariable Is s ~ 2 billiún.
An líon uasta dataVariable Is s ~ 2 billiún.
Ach má tá athróg ^100 ag tacar sonraí, beidh sé cumbersome d'úsáideoirí a úsáid.
Agus má tá tacar sonraí ^1 milliún athróg, beidh do fhreastalaí gá a lán de chuimhne fisiciúil agus beidh fadhbanna eile.
* An méid uasta de gach gné ( axisVariable ) Is ~ 2 billiún luachanna.
* I mo thuairimse, an líon uasta iomlán na cealla (an táirge de gach méid gné) Tá neamhtheoranta, ach d'fhéadfadh sé a bheith ~ 9e18.

Le haghaidh tacar sonraí tabular:

* An líon uasta dataVariable Is s ~ 2 billiún.
Ach má tá athróg ^100 ag tacar sonraí, beidh sé cumbersome d'úsáideoirí a úsáid.
Agus má tá tacar sonraí ^1 milliún athróg, beidh do fhreastalaí gá a lán de chuimhne fisiciúil agus beidh fadhbanna eile.
* An líon uasta na bhfoinsí (mar shampla, comhaid) is féidir a chomhiomlánú ~ 2 billiún.
* I gcásanna áirithe, líon uasta na sraitheanna ó fhoinse aonair (mar shampla, comhad, ach ní bunachar sonraí) Is ~ 2 billiún sraitheanna.
* Ní dóigh liom go bhfuil teorainneacha eile.

I gcás an dá tacar sonraí gridded agus tabular, tá roinnt teorainneacha inmheánacha ar mhéid an fo-thacar is féidir a iarraidh ag úsáideoir in iarratas amháin (a bhaineann go minic le 0.52 billiún de rud éigin nó ~ 9e18 de rud éigin) , ach tá sé i bhfad níos mó seans go mbeidh úsáideoir a bhuail na teorainneacha comhad-cineál-sonrach.

*    NetCDF leagan 3 .nc comhaid teoranta do bytes 2GB. (Má tá sé seo i ndáiríre fadhb do dhuine, in iúl dom: D'fhéadfadh mé tacaíocht a chur leis an NetCDF leagan 3 .nc síneadh 64-giotán nó NetCDF Leagan 4, bheadh a mhéadú an teorainn go suntasach, ach ní infinitely.) 
* Brabhsálaithe tuairteála tar éis ach ~ 500MB de shonraí, mar sin ERDDAP™ teorainn leis an bhfreagra .htmlTable iarratais ar ~ 400MB de shonraí.
* Tá go leor cláir anailís sonraí teorainneacha den chineál céanna (mar shampla, is é an méid uasta de ghné go minic ~ 2 billiún luachanna) , mar sin níl aon chúis a bheith ag obair go crua a fháil ar fud na teorainneacha comhad-cineál-sonrach.
* Tá na teorainneacha comhad-cineál-sonrach úsáideach sa mhéid is go gcuireann siad cosc ar iarratais naive le haghaidh méideanna fíor ollmhór sonraí (mar shampla, "a thabhairt dom gach ceann de na tacar sonraí" nuair a bhíonn an tacar sonraí 20TB sonraí) , a thógfadh seachtainí nó míonna a íoslódáil. An níos faide an íoslódáil, is dóichí go mbeidh sé theipeann ar chúiseanna éagsúla.
* Tá na teorainneacha comhad-cineál-sonrach úsáideach sa mhéid is go bhfeidhm siad an t-úsáideoir chun déileáil le fo-thacar réasúnta-iarrachtaí (mar shampla, ag déileáil le tacar sonraí greille mór trí chomhaid le sonraí ó phointe ama amháin gach) .
         
### cliceáil grianghraf a mhéadú{#switch-to-acdd-13} 
Táimid ag (go háirithe [Socraigh mar teanga réamhshocraithe](#generatedatasetsxml) ) faoi láthair [ACDD leagan 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) , a daingníodh go luath in 2015 agus dá ngairtear "ACD-1.3" sna Coinbhinsiúin domhanda tréith. Roimh an ERDDAP™ leagan 1.62 (scaoileadh i Meitheamh 2015) , ERDDAP™ a úsáidtear / mholtar an bunaidh, leagan 1.0, den [ NetCDF An Coinbhinsiún um Fhionnachtain Shonraí](https://wiki.esipfed.org/ArchivalCopyOfVersion1) dá ngairtear " Unidata Dataset Discovery v1.0 " sna Coinbhinsiúin domhanda agus Metadata\\_Conventions tréithe.

Má úsáideann do thacair sonraí leaganacha níos luaithe de ACDD, déanaimid AMND a aistríonn tú chuig ACDD-1.3. Níl sé deacair. ACDD-1.3 an-ar gcúl ag luí leis an leagan 1.0. A athrú, do gach tacar sonraí (ach amháin EDDGrid Ó Erddap agus EDDTable Seirbhís do Chustaiméirí) :

1. Bain an domhanda nua-mheasta Metadata\\_Conventions tréith ag cur (nó trí athrú a dhéanamh ar an láthair Metadata\\_Conventions tréith)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
leis an tacar sonraí domhanda&lt; addAttributes ú.
     
2. Má tá Coinbhinsiúin ag an tacar sonraí sa domhan domhanda&lt; addAttributes ^, athrú go léir " Unidata Dataset Discovery v1.0 " tagairtí do "ACD-1.3".
Más rud é nach bhfuil Coinbhinsiúin tréith sa domhan domhanda ag an tacar sonraí&lt; addAttributes ^, ansin cuir ceann a thagraíonn do ACDD-1.3. Mar shampla,
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. Má tá an tacar sonraí domhanda standard\\_name\\_vocabulary tréith, le do thoil athrú ar an fhormáid an luach a, mar shampla,
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
Má tá an tagairt do leagan níos sine den [CF tábla ainm caighdeánach](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) . tá sé dócha smaoineamh maith a athrú go dtí an leagan reatha (65, mar a scríobh againn seo) , ós rud é go bhfuil ainmneacha caighdeánach nua a chur leis an tábla sin le leaganacha ina dhiaidh sin, ach tá ainmneacha d'aois caighdeánach annamh deprecated agus riamh a bhaint.
     
4. Cé ACDD-1.0 san áireamh tréithe domhanda do creator\\_name , creator\\_email , creator\\_url , [Socraigh mar teanga réamhshocraithe](#generatedatasetsxml) Ní raibh a chur go huathoibríoch iad go dtí éigin timpeall ERDDAP™ v1.50. Is faisnéis thábhachtach í seo:
        
    *    creator\\_name ligeann úsáideoirí a fhios / a ghríosú an cruthaitheoir na tacar sonraí.
    *    creator\\_email Insíonn úsáideoirí an seoladh ríomhphoist is fearr chun teagmháil a dhéanamh le cruthaitheoir an tacar sonraí, mar shampla má tá ceisteanna acu faoin tacar sonraí.
    *    creator\\_url Tugann úsáideoirí ar bhealach a fháil amach níos mó mar gheall ar an cruthaitheoir.
    *    ERDDAP™ Úsáideann gach ceann den fhaisnéis seo nuair a ghiniúint FGDC agus ISO 19115-2/19139 doiciméid meiteashonraí do gach tacar sonraí. Is minic a úsáideann seirbhísí cuardaigh seachtracha na doiciméid sin.
    
Cuir na tréithe seo leis an tacar sonraí domhanda&lt; addAttributes ú.
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
Sin é. Tá súil agam nach raibh ró-deacair.
     
### riachtanais uisce: measartha{#zarr} 
Mar leagan 2.25 ERDDAP™ Is féidir a léamh áitiúil Comhaid Zarr ag baint úsáide as [EDDTableFromNcFiles](#eddtablefromncfiles) agus [ EDDGrid Seirbhís do Chustaiméirí](#eddgridfromncfiles) .

 (Amhail ó Lúnasa 2019) D'fhéadfadh muid a bheith go héasca mícheart, ach nach bhfuil muid cinnte go fóill go [riachtanais uisce: measartha](https://github.com/zarr-developers/zarr-python) , nó córais den chineál céanna a bhriseadh comhaid sonraí suas i smután níos lú, tá réitigh mór ar an bhfadhb ERDDAP™ sonraí a stóráiltear i seirbhísí scamall cosúil le Amazon AWS S3. Is Zarr teicneolaíocht iontach go bhfuil sé léirithe a úsáid i réimse na staideanna, tá muid ach ní cinnte go ERDDAP Beidh + S3 ar cheann de na cásanna. An chuid is mó táimid ag rá: sula Rush muid a dhéanamh ar an iarracht a stóráil go léir ár sonraí i Zarr, a ligean ar a dhéanamh roinnt tástálacha a fheiceáil má tá sé i ndáiríre ar réiteach níos fearr.

Is iad na fadhbanna a bhaineann le rochtain a fháil ar shonraí sa scamall latency (an lag go chéad sonraí a fháil) agus rochtain ar leibhéal comhaid (seachas rochtain ar leibhéal bloc) . Réitíonn Zar an fhadhb rochtana ar leibhéal an chomhaid, ach ní dhéanann aon rud faoi latency. I gcomparáid le díreach a íoslódáil an comhad (ionas gur féidir é a léamh mar chomhad áitiúil le rochtain ar leibhéal bloc) , féadfaidh Zarr exacerbate fiú an fhadhb latency mar, le Zarr, comhad a léamh i gceist anois sraith de roinnt glaonna a léamh codanna éagsúla den chomhad (gach ceann acu lena lag féin) . Is féidir leis an bhfadhb latency a réiteach trí na hiarrataí a comhthreomhar, ach is réiteach ardleibhéil é sin, ní ag brath ar Zarr.

Agus le Zarr (maidir le bunachair shonraí i ndáil) , cailleann muid an áisiúlacht a bhfuil comhad sonraí a bheith ina simplí, comhad amháin gur féidir leat a fhíorú go héasca ar ionracas, nó a dhéanamh / íoslódáil cóip de.

 ERDDAP™   (as v2) Tá córas a choimeád ar bun taisce áitiúil de chomhaid ó fhoinse URL (e.g., S3) (féach)&lt;cacheFromUrl .&lt;cén fáth? (Tuilleadh roghanna...) ). Agus an nua [&lt;nTríodair bhéil] (Tuilleadh roghanna...) Ba chóir go n-íoslaghdódh an fhadhb latency trí shonraí a aisghabháil ag leibhéal ard.&lt;Is cosúil go n-oibríonn go han-mhaith le haghaidh go leor cásanna. (Nílimid cinnte conas tairbheach&lt;nTrídí bhéil gan tástálacha breise.) Admhaigh muid nach bhfuil a dhéanamh tástálacha uainiú ar shampla AWS le nasc líonra maith, ach ní mór dúinn a thástáil go rathúil le foinsí URL iargúlta éagsúla de chomhaid. Agus ERDDAP 's&lt;oibreacha le haon chineál comhad sonraí (e.g., .nc , .hdf , .csv, .jsonlCSV ) , fiú má comhbhrúite go seachtrach (e.g., .gz ) , gan aon athruithe ar na comhaid (e.g., iad a athscríobh mar bhailiúcháin Zarr) .

Is dócha go mbeidh cásanna éagsúla i bhfabhar réitigh éagsúla, m.sh., ní mór ach cuid de chomhad a léamh uair amháin (Beidh Zar bua) , vs gá a léamh gach ceann de comhad uair amháin, vs gá a léamh cuid nó gach ceann de comhad arís agus arís eile (&lt;Beidh taisceFromUrl. bua.

An chuid is mó táimid ag rá: sula Rush muid a dhéanamh ar an iarracht a stóráil go léir ár sonraí i Zarr, a ligean ar a dhéanamh roinnt tástálacha a fheiceáil má tá sé i ndáiríre ar réiteach níos fearr.

- - - - - -
## Liosta de na tacair shonraí Cineálacha{#list-of-types-datasets} 
Más gá duit cabhair a roghnú an cineál ceart tacar sonraí, féach [Roghnú an Cineál Sonraí](#choosing-the-dataset-type) .

Tagann na cineálacha tacar sonraí i dhá chatagóir. ( [Cén fáth?](#why-just-two-basic-data-structures) ) 

###  EDDGrid  {#eddgrid} 
*    [ ** EDDGrid ** ](#eddgrid) datasets láimhseáil sonraí gridded.
    * I EDDGrid datasets, Tá athróg sonraí il-tríthoiseach arrays sonraí.
    * Tá MUST a bheith ina athróg ais do gach gné. Ais athróg MUST a shonrú san ord go n-úsáideann na hathróga sonraí iad.
    * I EDDGrid datasets, gach athróg sonraí MUST úsáid (scair) gach ceann de na hathróga ais.
         ( [Cén fáth?](#why-just-two-basic-data-structures)   [Cad a tharlaíonn mura bhfuil siad?](#dimensions) ) 
Nua i ERDDAP™ leagan 2.29.0 le EDDGrid Is FromNcFiles tacaíocht turgnamhach do athróg sonraí nach bhfuil tacaíocht ar fad de na hathróga ais (nó mar a bhfuil roinnt ar a dtugtar sé 1D agus 2D sonraí sa tacar sonraí céanna) .
    * Luachanna Toise Sórtáilte - I ngach EDDGrid datasets, gach MUST gné a bheith in ord sórtáilte (dul suas nó íslitheach) . Is féidir le gach a bheith spásáilte neamhrialta. Ní féidir a bheith aon ceangail. Níl an Tweet seo ar fáil [CF meiteashonraí caighdeánach](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Más rud é nach bhfuil aon ghné luachanna in ord sórtáilte, ní bheidh an tacar sonraí a luchtú agus ERDDAP™ a aithint an chéad luach unsorted sa chomhad logáil, *Treoir do Thuismitheoirí* / logs / log.txt .
        
Tá roinnt fo-aicmí srianta breise (go suntasach, EDDGrid Éilíonn Comhiomlán AssistingDimension go bhfuil an taobh amuigh (beagnach, an chéad) gné a bheith ag dul suas.
        
luachanna gné unsorted fios beagnach i gcónaí fadhb leis an tacar sonraí foinse. Tarlaíonn sé seo is coitianta nuair a bhíonn comhad misnamed nó mí-oiriúnach san áireamh sa chomhiomlánú, rud a fhágann gné am unsorted. Chun an fhadhb seo a réiteach, féach ar an teachtaireacht earráide sa ERDDAP™ log.txt comhad a aimsiú ar an luach am a chiontaíonn. Ansin breathnú ar na comhaid foinse a aimsiú ar an gcomhad comhfhreagrach (nó ceann acu roimh nó tar éis) nach mbaineann sa chomhiomlánú.
        
    * Féach an cur síos níos iomláine ar an [ EDDGrid múnla sonraí](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel) .
    * An bhfuil EDDGrid Tá cineálacha tacar sonraí:
        *    [ EDDGrid Amharc ar gach eolas](#eddfromaudiofiles) comhiomlánaí sonraí ó ghrúpa de chomhaid fuaime áitiúil.
        *    [ EDDGrid Ó Dhéag](#eddgridfromdap) Láimhseálann sonraí gridded ó DAP freastalaithe.
        *    [ EDDGrid Seirbhísí ar líne](#eddgridfromeddtable) ligeann tú a thiontú tacar sonraí tabular i tacar sonraí gridded.
        *    [ EDDGrid An tSraith Shinsearach](#eddfromerddap) Láimhseálann sonraí gridded ó iargúlta ERDDAP .
        *    [ EDDGrid Uisce agus Séarachas](#eddgridfrometopo) Láimhseálann ach na sonraí topagrafaíochta ETOPO tógtha.
        *    [ EDDGrid Seirbhís do Chustaiméirí](#eddgridfromfiles) Is é an superclass de gach EDDGrid Ó...Aicmeáin.
        *    [ EDDGrid Seirbhís do Chustaiméirí](#eddgridfrommergeirfiles) comhiomlánaí sonraí ó ghrúpa de MergeIR áitiúil .gz comhaid.
        *    [ EDDGrid Seirbhís do Chustaiméirí](#eddgridfromncfiles) sonraí comhiomlánaithe ó ghrúpa áitiúil NetCDF   (v3 nó v4)   .nc agus comhaid ghaolmhara.
        *    [ EDDGrid Ón NcFilesUnpacked](#eddgridfromncfilesunpacked) Is malairt más rud é EDDGrid Ó NcFiles a chomhlánaíonn sonraí ó ghrúpa áitiúil NetCDF   (v3 nó v4)   .nc agus comhaid ghaolmhara, a ERDDAP™ unpacks ag leibhéal íseal.
        *    [ EDDGrid Naisc go dtí suíomhanna eile](#eddgridlonpm180) athraíonn luachanna faddearthachta linbh EDDGrid ionas go mbeidh siad sa raon -180 go 180.
        *    [ EDDGrid Seirbhís do Chustaiméirí](#eddgridlon0360) athraíonn luachanna faddearthachta linbh EDDGrid ionas go bhfuil siad sa raon 0 go 360.
        *    [ EDDGrid SideBySide](#eddgridsidebyside) dhá chomhiomlán nó níos mó EDDGrid datasets taobh le taobh.
        *    [ EDDGrid Toise Comhiomlánaithe](#eddgridaggregateexistingdimension) dhá chomhiomlán nó níos mó EDDGrid datasets, gach ceann acu a bhfuil raon éagsúla luachanna don chéad ghné, ach luachanna comhionann do na gnéithe eile.
        *    [ EDDGrid Cóip Uaireadóirí Cóip](#eddgridcopy) is féidir a dhéanamh cóip áitiúil de eile EDDGrid 's sonraí agus feidhmíonn sé sonraí ón gcóip áitiúil.
             
    * Gach duine EDDGrid datasets tacú le leagan nThreads, a insíonn ERDDAP™ cé mhéad snáithe atá le húsáid agus iad ag freagairt d'iarraidh. Féach an [Níl an Tweet seo ar fáil](#nthreads) doiciméadú le haghaidh sonraí.
         
### EDDTable{#eddtable} 
*    [ **EDDTable** ](#eddtable) datasets láimhseáil sonraí tabular.
    * Is féidir sonraí Tabular a léiriú mar tábla bunachar sonraí-mhaith le sraitheanna agus colúin. Gach colún (athróg sonraí) Tá ainm, sraith de tréithe, agus siopaí ach cineál amháin sonraí. Tá gach sraith breathnóireacht (nó grúpa luachanna gaolmhara) . Féadfaidh an fhoinse sonraí na sonraí a bheith i struchtúr sonraí éagsúla, struchtúr sonraí níos casta, agus / nó comhaid sonraí il, ach ERDDAP™ Ní mór a bheith in ann a leacú na sonraí foinse isteach i tábla bunachar sonraí-mhaith d'fhonn a chur i láthair na sonraí mar tacar sonraí tabular d'úsáideoirí na ERDDAP .
    * Féach an cur síos níos iomláine ar an [samhail sonraí EDDTable](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel) .
    * Is iad na cineálacha atá leagtha sonraí EDDTable:
        *    [EDDTableFromAllDatasets](#eddtablefromalldatasets) Is tacar sonraí ardleibhéil a bhfuil faisnéis faoi na tacair sonraí eile i do ERDDAP .
        *    [EDDTableFromAsciiFiles](#eddtablefromasciifiles) comhiomlánaí sonraí ó chomhaid sonraí cluaisín-, tab-, leathstad-, nó spás-scartha comhaid sonraí ASCII tabular.
        *    [EDDTableFromAsciiService](#eddtablefromasciiservice) Is é an rang Super de gach EDDTableFromAsciiService... ranganna.
        *    [Seirbhísí ar líne](#eddtablefromasciiservicenos) Láimhseálann sonraí ó roinnt de na NOAA Seirbhísí gréasáin NOS.
        *    [EDDTableFrom AudioFiles](#eddfromaudiofiles) comhiomlánaí sonraí ó ghrúpa de chomhaid fuaime áitiúil.
        *    [EDDTableFrom Seirbhís do Chustaiméirí](#eddtablefromawsxmlfiles) comhiomlánaí sonraí ó shraith de Stáisiún Aimsir Uathoibríoch (Amharc ar gach eolas) Comhaid XML.
        *    [EDDTableFromCassandra](#eddtablefromcassandra) Láimhseálann sonraí tabular ó tábla Cassandra amháin.
        *    [EDDTableFrom ColumnarAsciiFiles](#eddtablefromcolumnarasciifiles) comhiomlánaí sonraí ó chluaisín ASCII comhaid sonraí le colúin sonraí seasta-leithroinnte.
        *    [EDDTableFromDapSequence](#eddtablefromdapsequence) Láimhseálann sonraí tabular ó DAP freastalaithe ord.
        *    [EDDTableFromDatabase](#eddtablefromdatabase) Láimhseálann sonraí tabular ó tábla bunachar sonraí amháin.
        *    [EDDTableFrom EDDGrid ](#eddtablefromeddgrid) ligeann duit tacar sonraí EDDTable a chruthú ó EDDGrid tacar sonraí.
        *    [EDDTableFromErddap](#eddfromerddap) Láimhseálann sonraí tabular ó iargúlta ERDDAP .
        *    [Naisc ábhartha eile](#eddtablefromfilenames) Cruthaíonn tacar sonraí ó fhaisnéis faoi ghrúpa de chomhaid i gcóras comhaid an fhreastalaí, ach ní chuireann sé sonraí a sheirbheáil ó laistigh de na comhaid.
        *    [EDDTableFromFiles](#eddtablefromfiles) Is é an rang Super de gach EDDTableFrom...Aicmí.
        *    [Féachaint ar Fholúntais](#eddtablefromhttpget) Is maith liom ERDDAP 's córas amháin le haghaidh sonraí a allmhairiú chomh maith le sonraí a onnmhairiú.
        *    [EDDTableFrom Hyrax Amharc ar gach eolas](#eddtablefromhyraxfiles)   (DEPRECATE) comhiomlánaí sonraí ó chomhaid le athróg roinnt le toisí roinnte sheirbheáil ag [ Hyrax   OPeNDAP freastalaí freastalaí](https://www.opendap.org/software/hyrax-data-server) .
        *    [EDDTableFrom InvalidCRAFiles](#eddtablefrominvalidcrafiles) comhiomlánaithe sonraí ó NetCDF   (v3 nó v4)   .nc comhaid a úsáideann ar leith, neamhbhailí, leagan den CF DSG Dtiguous Ragged Array (irl - Library Service) comhaid. Cén fáth Cé ERDDAP™ Tacaíonn sé leis an gcineál comhaid seo, is cineál comhaid neamhbhailí é nár chóir do dhuine tosú ag úsáid. Moltar go láidir do ghrúpaí a úsáideann an cineál comhaid seo faoi láthair úsáid a bhaint as ERDDAP™ a ghiniúint bailí CF DSG comhaid CRA agus stop ag baint úsáide as na comhaid.
        *    [Seirbhísí ar líne](#eddtablefromjsonlcsvfiles) comhiomlánaithe sonraí ó [JSON Línte comhaid CSV](https://jsonlines.org/examples/) .
        *    [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) comhiomlánaithe sonraí ó NetCDF   (v3 nó v4)   .nc comhaid le hathróga éagsúla le toisí roinnte.
        *    [EDDTableFromMq](/docs/server-admin/mqtt-integration) Tógann tacar sonraí bunaithe ar theachtaireachtaí MQTT. Tabhair faoi deara go bhfuil an doiciméadú ar leathanach tiomnaithe. Tabhair faoi deara go bhfuil a lán de na cosúlachtaí a [Féachaint ar Fholúntais](#eddtablefromhttpget) .
        *    [EDDTableFromNcFiles](#eddtablefromncfiles) comhiomlánaithe sonraí ó NetCDF   (v3 nó v4)   .nc comhaid le hathróga éagsúla le toisí roinnte. Tá sé breá leanúint ar aghaidh ag baint úsáide as an gcineál tacar sonraí seo le haghaidh tacar sonraí atá ann cheana, ach le haghaidh tacar sonraí nua molaimid ag baint úsáide as EDDTableFromMultidimNcFiles ina ionad sin.
        *    [EDDTableFromNcCFFiles](#eddtablefromnccffiles) comhiomlánaithe sonraí ó NetCDF   (v3 nó v4)   .nc comhaid a úsáideann ceann de na formáidí comhaid sonraithe ag an [CF Diosca Geometris Sampling (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) coinbhinsiúin. Ach le haghaidh comhaid ag baint úsáide as ceann de na leaganacha CF multidimensional DSG, úsáid [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) ina ionad sin.
        *    [Seirbhís do Chustaiméirí](#eddtablefromnccsvfiles) comhiomlánaithe sonraí ó [NCCSV](/docs/user/nccsv-1.00) ASCII .csv comhaid.
        *    [Seirbhísí ar líne](#eddtablefromnos)   (DEPRECATE) Láimhseálann sonraí tabular ó fhreastalaithe NOS XML.
        *    [Seirbhísí ar líne](#eddtablefromobis) Láimhseálann sonraí tabular ó freastalaithe OBIS.
        *    [EDDTableFromParquetFiles](#eddtablefromparquetfiles) Láimhseálann sonraí ó [An tIomlán](https://parquet.apache.org/) .
        *    [EDDTableFrom SOS ](#eddtablefromsos) Láimhseálann sonraí tabular ó SOS freastalaithe.
        *    [Seirbhís do Chustaiméirí](#eddtablefromthreddsfiles)   (DEPRECATE) comhiomlánaí sonraí ó chomhaid le athróg roinnt le toisí roinnte sheirbheáil ag [TRIOMADÓIR OPeNDAP freastalaí freastalaí](https://www.unidata.ucar.edu/software/tds/) .
        *    [EDDTableFrom WFS Amharc ar gach eolas](#eddtablefromwfsfiles)   (DEPRECATE) a dhéanann cóip áitiúil de na sonraí go léir ó ArcGIS Léarscáileanna WFS freastalaí mar sin is féidir na sonraí a chaomhnú go tapa chun ERDDAP™ úsáideoirí.
        *    [Naisc ábhartha eile](#eddtableaggregaterows) is féidir tacar sonraí EDDTable a dhéanamh ó ghrúpa tacar sonraí EDDTable.
        *    [EDDTableCopy](#eddtablecopy) is féidir cóip áitiúil a dhéanamh de go leor cineálacha tacar sonraí EDDTable agus ansin na sonraí a athdhíol go tapa ón gcóip áitiúil.

  
- - - - - -

## Cur síos mionsonraithe ar Chineálacha Tosaithe Sonraí{#detailed-descriptions-of-dataset-types} 

###  EDDGrid Ó Dhéag{#eddgridfromdap} 
 [ ** EDDGrid Ó Dhéag** ](#eddgridfromdap) Láimhseálann athróg greille ó [ DAP ](https://www.opendap.org/) freastalaithe.

* Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Is féidir leat a bhailiú ar an eolas is gá duit a tweak go nó a chruthú do XML féin le haghaidh EDDGrid ÓDap tacar sonraí ag féachaint ar an tacar sonraí foinse DDS agus comhaid DAS i do bhrabhsálaí (ag cur .das agus .dds leis an sourceUrl , mar shampla, [https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds) ) .
     
*    EDDGrid Is féidir ÓDap sonraí a fháil ó aon athróg il-tríthoiseach ó DAP freastalaí sonraí. (Roimhe seo, EDDGrid ÓDap bhí teoranta do athróga ainmnithe mar "greille" ar, ach is é sin a thuilleadh ceanglas.)   
     
* Luachanna Toise Sórtáilte - Na luachanna do gach MUST gné a bheith in ord sórtáilte (dul suas nó íslitheach) . Is féidir na luachanna a bheith spásáilte neamhrialta. Ní féidir a bheith aon ceangail. Níl an Tweet seo ar fáil [CF meiteashonraí caighdeánach](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Más rud é nach bhfuil aon ghné luachanna in ord sórtáilte, ní bheidh an tacar sonraí a luchtú agus ERDDAP™ a aithint an chéad luach unsorted sa chomhad logáil, *Treoir do Thuismitheoirí* / logs / log.txt .
    
luachanna gné unsorted fios beagnach i gcónaí fadhb leis an tacar sonraí foinse. Tarlaíonn sé seo is coitianta nuair a bhíonn comhad misnamed nó mí-oiriúnach san áireamh sa chomhiomlánú, rud a fhágann gné am unsorted. Chun an fhadhb seo a réiteach, féach ar an teachtaireacht earráide sa ERDDAP™ log.txt comhad a aimsiú ar an luach am a chiontaíonn. Ansin breathnú ar na comhaid foinse a aimsiú ar an gcomhad comhfhreagrach (nó ceann acu roimh nó tar éis) nach mbaineann sa chomhiomlánú.
    
####  EDDGrid Ó Dap creatlach XML{#eddgridfromdap-skeleton-xml} 

 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset type="EDDGridFromDap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromDap, this gets the remote .dds and then gets the new  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

     
###  EDDGrid Seirbhísí ar líne{#eddgridfromeddtable} 
 [ ** EDDGrid Seirbhísí ar líne** ](#eddgridfromeddtable) ligeann duit tacar sonraí tabular EDDTable a thiontú ina EDDGrid tacar sonraí gridded. Cuimhnigh go bhfuil ERDDAP™ déileálann tacar sonraí mar ceachtar [greille tacar sonraí (fo-aicmí EDDGrid ) nó tacar sonraí tabular (Fo-aicmí EDDTable) ](#why-just-two-basic-data-structures) .

* De ghnáth, má tá tú sonraí gridded, tú a chur ar bun díreach EDDGrid tacar sonraí go díreach. Uaireanta nach bhfuil sé seo indéanta, mar shampla, nuair a bhíonn tú na sonraí a stóráil i mbunachar sonraí i ndáil ERDDAP™ ní féidir rochtain a fháil ach trí EDDTableFromDatabase. EDDGrid Ligeann rang ÓEDDTable duit an cás sin a leigheas.
     
* Ar ndóigh, ní mór na sonraí sa tacar sonraí EDDTable bunúsacha a bheith (go bunúsach) sonraí gridded, ach i bhfoirm tabular. Mar shampla, d'fhéadfadh sonraí CTD a bheith ag an tacar sonraí EDDTable: tomhais reatha soir agus ó thuaidh, ag roinnt doimhneacht, ag amanna éagsúla. Ós rud é go bhfuil an doimhneacht mar an gcéanna ag gach pointe ama, EDDGrid Is féidir óEDDTable a chruthú tacar sonraí gridded le gné am agus doimhneacht a rochtain ar na sonraí tríd an tacar sonraí EDDTable bunúsacha.
     
* Sonraí a ghiniúint Xml -- Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Is féidir leat an t-eolas is gá duit a bhailiú chun feabhas a chur ar an dréacht garbh.
     
* Foinsí Foinse -- Mar is amhlaidh le gach cineál tacair sonraí eile, EDDGrid Tá FromTable an smaoineamh go bhfuil foinse domhanda agus [domhanda domhanda domhanda addAttributes ](#global-attributes)   (a shonraítear i datasets.xml ) , atá comhcheangailte a dhéanamh ar an domhanda le chéile Tréithe, a bhfuil cad a fheiceann úsáideoirí. Do fhoinsí domhanda, EDDGrid Úsáideann FromEDDTable an domhanda le chéile Tréithe na tacar sonraí EDDTable bunúsacha. (Má cheapann tú faoi ar feadh nóiméad, a dhéanann sé ciall.) 
    
Mar an gcéanna, do gach axisVariable 's agus dataVariable 's [ addAttributes ](#addattributes) , EDDGrid Úsáideann FromEDDTable an athróg le chéile Tréithe ón tacar sonraí EDDTable bunúsacha mar an EDDGrid Foinsí Achoimrí Athróg ÓEDDTable ar. (Má cheapann tú faoi ar feadh nóiméad, a dhéanann sé ciall.) 
    
Mar thoradh air sin, má tá meiteashonraí maithe ag an EDDTable, EDDGrid Ní mór go minic ÓEDDTable beag addAttributes meiteashonraí - ach cúpla tweaks anseo agus ann.
    
*    dataVariable s versus axisVariable s -- Tá an EDDTable bunúsacha amháin dataVariable s. An bhfuil EDDGrid Beidh roinnt sonraí a bheith ag an tacar sonraí axisVariable s s (cruthaithe ó roinnt de na EDDTable dataVariable s s) agus roinnt dataVariable s s (cruthaithe ón EDDTable eile dataVariable s s) . [Socraigh mar teanga réamhshocraithe](#generatedatasetsxml) beidh a dhéanamh buille faoi thuairim maidir leis a EDDTable dataVariable s ba chóir a bheith EDDGrid Seirbhísí ar líne axisVariable s, ach tá sé ach buille faoi thuairim. Ní mór duit a mhodhnú ar an aschur de GenerateDatasetsXml a shonrú a dataVariable Beidh s bheith axisVariable s, agus ina ordú.
     
* riachtanais uisce: measartha Níl aon rud mar gheall ar an EDDTable bunúsacha a insint EDDGrid ÓEDDTable na luachanna féideartha an axisVariable s sa leagan gridded den tacar sonraí, mar sin MUST tú a chur ar fáil go bhfuil faisnéis do gach axisVariable trí cheann de na tréithe seo:
    
    * aisValues - ligeann duit liosta de luachanna a shonrú. Mar shampla,
        &lt;agt ainm = "AisValues" [cineál = "dúbailte"](#attributetype) \\ 2.5, 3, 3.5, 4&lt;Baile Átha Troim
Tabhair faoi deara úsáid [cineál sonraí](#data-types) móide an Liosta focal. Chomh maith leis sin, an cineál liosta (mar shampla, dúbailte) , MUST mheaitseáil na sonraí Cineál an athróg sa EDDTable agus EDDGrid Socruithe sonraí iontaofa.
    * aisValuesStartStrideStop - ligeann duit sraith de luachanna spásáilte rialta a shonrú trí na luachanna tús, stride, agus a stopadh. Seo sampla atá comhionann leis an sampla aisValues thuas:
        &lt;ainm air = "AisValuesStartStrideStop" [cineál = "dúbailte"](#attributetype) \\ 0.5, 4&lt;Baile Átha Troim
Arís, tabhair faoi deara go n-úsáidfear cineál sonraí liosta. Chomh maith leis sin, an cineál liosta (mar shampla, dúbailte) , MUST mheaitseáil na sonraí Cineál an athróg sa EDDTable agus EDDGrid Socruithe sonraí iontaofa.
         
    
Nuashonruithe -- Díreach mar nach bhfuil aon bhealach le haghaidh EDDGrid Ó EDDTable a chinneadh na haisValues ón EDDTable ar dtús, níl aon bhealach iontaofa ann freisin EDDGrid Ó EDDTable chun a chinneadh ón EDDTable nuair a d'athraigh an aisValues (go háirithe, nuair a bhíonn luachanna nua don athróg ama) . Faoi láthair, is é an t-aon réiteach a athrú ar an tréith aisValues i datasets.xml agus athlódáil an tacar sonraí. Mar shampla, d'fhéadfá scríobh script a
    
    1. Cuardaigh Cuardaigh Cuardaigh datasets.xml le haghaidh
         datasetID = " *an DatasetID* " " "
mar sin tá tú ag obair leis an tacar sonraí ceart.
    2. Cuardaigh Cuardaigh Cuardaigh datasets.xml don chéad tharla eile
         <sourceName>  *riachtanais uisce: measartha*  </sourceName>   
mar sin tá tú ag obair leis an athróg ceart.
    3. Cuardaigh Cuardaigh Cuardaigh datasets.xml don chéad tharla eile
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
mar sin tá a fhios agat an seasamh tús an chlib.
    4. Cuardaigh Cuardaigh Cuardaigh datasets.xml don chéad tharla eile
```
        </att>  
```
mar sin tá a fhios agat an seasamh deireadh na luachanna ais.
    5. In ionad an tús d'aois, stride, luachanna stad leis na luachanna nua.
    6. Déan teagmháil leis an [URL bratach](/docs/server-admin/additional-information#set-dataset-flag) don tacar sonraí a insint ERDDAP™ a athlódáil an tacar sonraí.
    
Níl sé seo oiriúnach, ach oibríonn sé.
     
* cruinneas -- Nuair a bheidh EDDGrid Freagraíonn FromEDDTable ar iarratas an úsáideora ar shonraí, bogann sé sraith sonraí ón tábla freagartha EDDTable isteach sa EDDGrid greille freagartha. Chun seo a dhéanamh, caithfidh sé a fháil amach an bhfuil na luachanna "ais" ar a chéile ar leith sa chluiche tábla roinnt meascán de luachanna ais sa ghreille. I gcás cineálacha sonraí slánuimhir, tá sé éasca a chinneadh má tá dhá luachanna comhionann. Ach le haghaidh floats agus doubles, tugann sé seo suas an fhadhb Uafásach na n-uimhreacha pointe snámh [ní mheaitseáil go díreach](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) . (mar shampla, 0.2 i gcoinne 0.199999999999996) . Chun (iarracht a dhéanamh chun) déileáil leis seo, EDDGrid Ligeann FromTable tú a shonrú tréith cruinneas d'aon cheann de na axisVariable s, a shonraíonn an líon iomlán de dhigit deachúil nach mór a bheith comhionann.
    * Mar shampla,&lt;ainm att = "cruinneas" cineál = "int" × 5&lt;Baile Átha Troim
    * I gcás cineálacha éagsúla athróg sonraí, tá luachanna cruinneas réamhshocraithe éagsúla. De ghnáth is cuí na mainneachtainí. Más rud é nach bhfuil siad, ní mór duit luachanna éagsúla a shonrú.
    * Le haghaidh axisVariable s atá [am nó am Athróg Stampa](#timestamp-variables) , is é an réamhshocraithe cruinneas iomlán (cluiche cruinn) .
    * Le haghaidh axisVariable s atá floats, is é an cruinneas réamhshocraithe 5.
    * Le haghaidh axisVariable s atá doubles, is é an cruinneas réamhshocraithe 9.
    * Le haghaidh axisVariable s go bhfuil cineálacha sonraí slánuimhir, EDDGrid neamhaird FromEDDTable an tréith cruinneas agus i gcónaí a úsáideann cruinneas iomlán (cluiche cruinn) .
         
    *    **Cóipeáil nasc leis an tweet** Agus é ag déanamh an chomhshó smután sonraí tabular isteach smután de shonraí gridded, más rud é EDDGrid Ní féidir ÓEDDTable mheaitseáil luach "ais" EDDTable le ceann de na súil EDDGrid Luachanna ais ÓEDDTable, EDDGrid Ó DDTable ciúin (aon earráid) throws amach na sonraí as an tsraith an tábla. Mar shampla, d'fhéadfadh go mbeadh sonraí eile ann (nach bhfuil ar an eangach) sa tacar sonraí EDDTable. (Agus má stride × 1, nach bhfuil sé soiléir go EDDGrid Ó Thástáil a luachanna ais luachanna atá ag teastáil agus a bhfuil na cinn an ceann a skipped mar gheall ar an stride.) Mar sin, má tá na luachanna cruinneas ró-ard, beidh an t-úsáideoir a fheiceáil luachanna ar iarraidh sa fhreagra sonraí nuair a luachanna sonraí bailí ann i ndáiríre.
        
Os a choinne sin, má tá na luachanna cruinneas leagtha ró-íseal, luachanna "ais" EDDTable nár chóir a mheaitseáil EDDGrid Beidh luachanna ais ÓEDDTable (go hearráideach) cluiche.
        
Tá na fadhbanna féideartha Uafásach, toisc go bhfaigheann an t-úsáideoir na sonraí mícheart (nó luachanna ar iarraidh) nuair ba chóir dóibh a fháil ar na sonraí ceart (nó ar a laghad teachtaireacht earráide) .
Níl an Tweet seo ar fáil EDDGrid Ón Tábla. EDDGrid Ní féidir FromTable réiteach an fhadhb seo. Tá an fhadhb gné dhílis i chomhshó na sonraí tabular i sonraí gridded (mura féidir toimhdí eile a dhéanamh, ach ní féidir iad a dhéanamh anseo) .
Tá sé suas chun tú, an ERDDAP™ riarthóir, go **tástáil do do EDDGrid Ó EDDTable go maith** chun a chinntiú go bhfuil na luachanna beachtas leagtha chun na fadhbanna féideartha sin a sheachaint.
        
#### tréimhse saoil: ilbhliantúil{#gapthreshold} 
*    [tréimhse saoil: ilbhliantúil](#gapthreshold) -- Is cineál an-neamhghnách de tacar sonraí é seo. Ó tharla na cineálacha fiosruithe is féidir a dhéanamh chun (láimhseáil ag) ar an EDDGrid dataset (a bhaineann leis na raonta agus na snáitheanna de na axisVariable s s) an-difriúil ó na cineálacha fiosruithe is féidir a dhéanamh (láimhseáil ag) tacar sonraí EDDTable (ach a bhaineann leis na raonta de roinnt athróg) , feidhmíocht EDDGrid Athraíonn tacair shonraí ó EDDTable go mór ag brath ar an iarraidh chruinn a dhéantar agus ar luas an tacar sonraí EDDTable bunúsacha. I gcás iarrataí a bhfuil luach stride × 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, EDDGrid Is féidir ÓEDDTable iarraidh ar an EDDTable bunúsacha le haghaidh smután réasúnta mór sonraí (amhail is dá mba stride = 1) agus ansin sift trí na torthaí, a choinneáil ar na sonraí ó roinnt sraitheanna agus a chaitheamh ar shiúl na sonraí ó dhaoine eile. Má tá sé a sift trí go leor sonraí a fháil ar na sonraí a theastaíonn uaidh, beidh an t-iarratas níos faide a líonadh.
    
Más rud é EDDGrid Is féidir ÓEDDTable insint go mbeidh bearnaí móra (le sraitheanna de shonraí nach dteastaíonn) idir na sraitheanna le sonraí atá ag teastáil, EDDGrid Is féidir ÓEDDTable roghnú roinnt subrequests a dhéanamh leis an EDDTable bunúsach in ionad iarratas mór amháin, rud a fhágann go bhfuil na sraitheanna nach dteastaíonn de shonraí sna bearnaí móra. Tá an íogaireacht don chinneadh seo á rialú ag an luach gapThreshold mar atá sonraithe sa&lt;gapThreshold agus chlib (réamhshocraithe = 1000 sraitheanna de shonraí foinse) . Bearna Socrú Beidh Threshold le líon níos lú mar thoradh ar an tacar sonraí a dhéanamh (go ginearálta) níos mó subrequests. Bearna Socrú Beidh Threshold le líon níos mó mar thoradh ar an tacar sonraí a dhéanamh (go ginearálta) níos lú subrequests.
    
Má tá gapThreshold leagtha ró-bheag, EDDGrid Beidh FromEDDTable oibriú níos moille toisc go mbeidh an lasnairde na n-iarratas iolrach a bheith níos mó ná an t-am a shábháil ag fáil roinnt sonraí breise. Má tá gapThreshold leagtha ró-mhór, EDDGrid Beidh ÓEDDTable ag feidhmiú níos moille mar go mbeidh an oiread sin sonraí breise a aisghabháil ón EDDTable, ach amháin le scriosadh. (Mar Goldilocks fuair sé amach, is é an lár "ach ceart".) Athraíonn an forchostais do chineálacha éagsúla tacar sonraí EDDTable go mór, mar sin is é an t-aon bhealach a fhios ag an suíomh is fearr iarbhír do do tacar sonraí trí turgnamh. Ach ní bheidh tú ag dul ró-i bhfad sticking mícheart leis an mainneachtain.
    
Is sampla simplí: Samhlaigh an EDDGrid FromTable le ceann amháin axisVariable   (am, le méid 100000) , ceann amháin dataVariable   (teocht an teocht) , agus an gapThreshold réamhshocraithe de 1000.
    
    * Má iarrann úsáideoir teocht \\[ 0 agus #58;100 agus #58;5000 \\] , Is é an snáithe 100 mar sin tá an méid bearna 99, atá níos lú ná an gapThreshold. Mar sin, EDDGrid Déanfaidh FromTable ach iarratas amháin chuig EDDTable do na sonraí go léir a theastaíonn le haghaidh na hiarrata (coibhéiseach le teocht \\[ 0:5000 \\] ) agus caith amach na sraitheanna de na sonraí nach gá é.
    * Má iarrann úsáideoir teocht \\[ 0: 2500: 5000 \\] , is é sin stride 2500 mar sin is é an méid bearna 2499, atá níos mó ná an gapThreshold. Mar sin, EDDGrid Déanfaidh FromTable iarrataí ar leith ar EDDTable atá comhionann le teocht \\[ 0 0 \\] , teocht \\[ 2500 \\] , teocht \\[ 5000 \\] .
    
Tá ríomh an méid bearna níos casta nuair a bhíonn aiseanna il.
    
I gcás gach iarratas úsáideora, EDDGrid ÓEDDTable priontaí teachtaireachtaí diagnóiseacha a bhaineann leis seo sna [logáil isteach.](/docs/server-admin/additional-information#log) comhad.
    
    * Más rud é:&lt;Logáil isteach » (Roghnaigh gach rud) i datasets.xml Tá sé leagtha chun eolas, priontaí seo teachtaireacht cosúil
\\* nOuterAxes = 1 de 4 nOuterRequests = 22
Má nOuterAxes = 0, Ní raibh gapThreshold shárú agus ní dhéanfar ach iarratas amháin chuig EDDTable.
Más rud é nOuterAxes 0.5, sáraíodh gapThreshold agus beidh nOuterRequests a dhéanamh chuig EDDTable, a fhreagraíonn do gach meascán d'iarr na nOuterAxes leftmost. Mar shampla, má tá 4 ag an tacar sonraí axisVariable s agus dataVariable s cosúil soirward \\[ am trátha \\]  \\[ domhantarraingthe \\]  \\[ tréimhse saoil: ilbhliantúil \\]  \\[ doimhneacht doimhneacht doimhneacht \\] , an leftmost (chéad chéad uair) Tá ais athróg am.
    * Más rud é&lt;Logáil isteach » i datasets.xml Tá sé leagtha go léir, Tá faisnéis bhreise scríofa chuig an comhad log.txt.
         
####  EDDGrid creatlach ÓEDDTable XML{#eddgridfromeddtable-skeleton-xml} 
 >&nbsp;&lt;dataset type="EDDGridFromEDDTable" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromEDDTable, this only works if the underlying EDDTable  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;supports updateEveryNMillis. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;gapThreshold>](#gapthreshold)...&lt;/gapThreshold> &lt;!-- 0 or 1. The default is 1000. >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The underlying source EDDTable dataset. -->  
 >&nbsp;&lt;/dataset>  

### EDD * ERDDAP  {#eddfromerddap} 
 ** EDDGrid An tSraith Shinsearach** Láimhseálann sonraí gridded ó iargúlta ERDDAP™ freastalaí.
 **EDDTableFromErddap** Láimhseálann sonraí tabular ó iargúlta ERDDAP™ freastalaí.

*    EDDGrid Ón Erddap agus EDDTableFromErddap iad féin difriúil ó gach cineál eile tacar sonraí i ERDDAP .
    * Cosúil le cineálacha eile tacar sonraí, faigheann na tacair sonraí seo faisnéis faoin tacar sonraí ón bhfoinse agus coinníonn siad i gcuimhne é.
    * Cosúil le cineálacha eile tacar sonraí, nuair ERDDAP™ cuardaigh le haghaidh tacar sonraí, taispeánann an Fhoirm Rochtana Sonraí ( * datasetID * ..) , nó taispeántais an fhoirm Make A Graph ( * datasetID * .graf) , ERDDAP™ Úsáideann an fhaisnéis faoin tacar sonraí atá i gcuimhne.
    *    EDDGrid Ó Erddap agus EDDTable Tá FromErddap an bonn le haghaidh [greillí/blúistí/feistis](/docs/server-admin/scaling) de ERDDAP s, a dháileadh go héifeachtach ar an úsáid LAP (den chuid is mó chun léarscáileanna a dhéanamh) , úsáid cuimhne, stóráil tacar sonraí, agus úsáid bandaleithead ionad sonraí mór.
#### Amharc ar gach eolas{#redirect} 
* Murab ionann agus cineálacha eile tacar sonraí, nuair ERDDAP™ má fhaigheann tú iarraidh ar shonraí nó íomhánna ó na tacair sonraí seo, ERDDAP   [atreorú](https://en.wikipedia.org/wiki/URL_redirection) an iarraidh ar an iargúlta ERDDAP™ freastalaí. Is é an toradh:
    * Níl an Tweet seo ar fáil (LAP, cuimhne, agus bandaleithead) , mar gheall ar a mhalairt
        1. An ilchodach ERDDAP™ go bhfuil an iarraidh a sheoladh chuig an duine eile ERDDAP™   (a thógann am) .
        2. An ceann eile ERDDAP™ tá a fháil ar na sonraí, reformat sé, agus na sonraí a tharchur chuig an ilchodach ERDDAP .
        3. An ilchodach ERDDAP™ a fháil ar na sonraí (bandaleithead a úsáid) , reformat it (ag baint úsáide as LAP agus cuimhne) , agus na sonraí a tharchur chuig an úsáideoir (bandaleithead a úsáid) . Tríd an iarraidh a atreorú agus trí chead a thabhairt don duine eile ERDDAP™ an freagra a sheoladh go díreach chuig an úsáideoir, an ilchodach ERDDAP™ Caitheann go bunúsach aon am LAP, cuimhne, nó bandaleithead ar an iarratas.
    * Tá an atreorú trédhearcach don úsáideoir beag beann ar na bogearraí cliant (brabhsálaí nó aon bhogearraí nó uirlis líne ordaithe eile) .
*    [Is féidir leat insint ERDDAP™ ](#redirect) gan aon iarrataí úsáideora a atreorú trí shocrú&lt;cliceáil grianghraf a mhéadú&lt;/ athdhíriú bhéil, ach tá sé seo negates an chuid is mó de na buntáistí a bhaineann leis an... (go háirithe, scaipeadh an t-ualach ar an deireadh tosaigh ERDDAP™ go dtí an iargúlta / deireadh ERDDAP ) .
         
     
#### irl - Library Service{#subscriptions} 
De ghnáth, nuair a EDDGrid Ó Erddap agus EDDTable Is maith liom é (reo) luchtaithe ar do ERDDAP , iarracht siad síntiús a chur leis an tacar sonraí iargúlta tríd an iargúlta ERDDAP 's ríomhphost / córas síntiús URL. Ar an mbealach sin, aon uair a athraíonn an tacar sonraí iargúlta, an iargúlta ERDDAP™ teagmhálacha na [leagan síos Bratach URL](/docs/server-admin/additional-information#set-dataset-flag) ar do shon ERDDAP™ ionas go mbeidh an tacar sonraí áitiúil athluchtaithe ASAP agus mar sin go bhfuil an tacar sonraí áitiúil i gcónaí breá suas chun dáta agus mimics an tacar sonraí iargúlta. Mar sin, an chéad uair a tharlaíonn sé seo, ba chóir duit a fháil ar ríomhphost iarraidh go bhfuil tú a bhailíochtú an síntiús. Mar sin féin, má tá an áitiúil ERDDAP™ Ní féidir a sheoladh ríomhphost nó más rud é an iargúlta ERDDAP 's ríomhphost / Níl córas síntiús URL gníomhach, ba chóir duit ríomhphost a chur chuig an iargúlta ERDDAP™ riarthóir agus a iarraidh go s / sé a chur de láimh [&lt;Féach ar an bpróifíl (Tuilleadh eolais) ...&lt;/ arChange ^ clibeanna do gach ceann de na tacair sonraí ábhartha chun glaoch ar do tacar sonraí [leagan síos Bratach URLanna](/docs/server-admin/additional-information#set-dataset-flag) . Féach ar do ERDDAP™ tuarascáil laethúil do liosta de setDataset URLanna Bratach, ach a sheoladh ach na cinn do EDDGrid Ón Erddap agus EDDTableFromErddap tacar sonraí chuig an iargúlta ERDDAP™ riarthóir.
    
Nach bhfuil sé seo ag obair? An bhfuil do tacar sonraí áitiúla gan fanacht i info leis na tacair sonraí iargúlta?
Ní mór roinnt rudaí a bheith ag obair i gceart don chóras seo a bheith ag obair ionas go mbeidh do thacair sonraí fanacht suas chun dáta. Seiceáil gach ceann de na rudaí seo in ord:
    
    1. Do chuid oibre ERDDAP™ Ní mór a bheith in ann a sheoladh amach ríomhphoist. Féach ar na socruithe ríomhphoist i do thus.xml.
    2. Go ginearálta (ach ní i gcónaí) , do ERDDAP 's&lt;baseUrl .&lt;baseHttpsUrl. Ní mór go mbeadh uimhir port (e.g., :8080, :8443) . Má dhéanann siad, bain úsáid as [seachtarach](/docs/server-admin/deploy-install#proxypass) a bhaint as an gcalafort ón Url.
    3. I do thus.xml,&lt;Ní mór síntiús a shocrú go fíor.
    4. Nuair a bheidh do EDD áitiúil... ÓErddap Tá tacar sonraí athluchtaithe, ba chóir é a sheoladh iarratas chuig an iargúlta ERDDAP™ chun síntiús a íoc leis an tacar sonraí iargúlta. Féach i log.txt a fheiceáil má tá sé seo ag tarlú.
    5. Ba chóir duit ríomhphost a fháil ag iarraidh ort an t-iarratas síntiús a bhailíochtú.
    6. Ní mór duit cliceáil ar an nasc sa ríomhphost sin chun an t-iarratas síntiús a bhailíochtú.
    7. An iargúlta ERDDAP™ Ba chóir a rá go raibh an bailíochtú rathúil. Ag am ar bith, is féidir leat ríomhphost a iarraidh ón iargúlta ERDDAP™ le liosta de do shíntiúis atá ar feitheamh agus bailí. Féach an fhoirm ag *cliceáil grianghraf a mhéadú irl - Library Service* / Cuir isteach/suibscríobhanna/liosta.
    8. Nuair a athraíonn an tacar sonraí iargúlta (e.g., faigheann sonraí breise) , an iargúlta ERDDAP™ Ba chóir iarracht a dhéanamh teagmháil a dhéanamh leis an flagURL ar do ERDDAP . Ní féidir leat seiceáil seo, ach is féidir leat a iarraidh ar an riarthóir an iargúlta ERDDAP™ seo a sheiceáil.
    9. Do chuid oibre ERDDAP™ Ba chóir iarraidh a fháil a shocrú go bhfuil bratachURL. Féach ar do log.txt le haghaidh "setDatasetFlag.txt?" iarraidh (s s) agus féach an bhfuil teachtaireacht earráide a bhaineann leis na hiarrataí.
    10. Do chuid oibre ERDDAP™ Ba chóir ansin iarracht a athlódáil go tacar sonraí (b'fhéidir nach láithreach, ach ASAP) .
         
#### Uasmhéid cothrom le dáta (am trátha) ?{#up-to-date-maxtime} 
 EDDGrid / TableFromErddap dataets athruithe ach a gcuid faisnéise a stóráil faoi gach tacar sonraí foinse nuair a bhíonn an tacar sonraí foinse ["athlódáil"](#reloadeverynminutes) agus roinnt píosa na n-athruithe meiteashonraí (e.g., an athróg ama ar actual\\_range ) , rud a ghineann fógra síntiús. Má tá sonraí ag an tacar sonraí foinse a athraíonn go minic (mar shampla, sonraí nua gach dara) agus a úsáideann an ["uasdátú"](#updateeverynmillis) córas chun athruithe go minic ar na sonraí bunúsacha a thabhairt faoi deara, EDDGrid / Ní bheidh TableFromErddap a chur in iúl faoi na hathruithe go minic go dtí an tacar sonraí seo chugainn "ualach", mar sin an EDDGrid / Ní bheidh TableFromErddap bheith breá cothrom le dáta. Is féidir leat a íoslaghdú an fhadhb seo ag athrú an tacar sonraí foinse&lt;reloadEveryNMinutes ^ le luach níos lú (60? 15?) ionas go mbeidh níos mó fógraí síntiús a insint don EDDGrid /TableFromErddap a chuid faisnéise a thabhairt cothrom le dáta faoin tacar sonraí foinse.

Nó, má tá a fhios ag do chóras bainistíochta sonraí nuair a bhíonn na sonraí foinse sonraí nua (e.g., trí script a chóipeanna comhad sonraí i bhfeidhm) , agus más rud é nach bhfuil sin Super minic (e.g., gach 5 nóiméad, nó níos minice) , níl réiteach níos fearr:

1. Ná húsáid&lt;updateEveryNMillis ^ a choinneáil ar an tacar sonraí foinse cothrom le dáta.
2. Socraigh an tacar sonraí foinse&lt;reloadEveryNMinutes ú le líon níos mó (1440?) .
3. An bhfuil an script i dteagmháil leis an tacar sonraí foinse [URL bratach](/docs/server-admin/additional-information#set-dataset-flag) ceart tar éis cóipeanna sé comhad sonraí nua i bhfeidhm.
     

Beidh sin mar thoradh ar an tacar sonraí foinse a bheith breá cothrom le dáta agus a chur faoi deara é a ghiniúint fógra síntiús, a chuirfear chuig an EDDGrid / TableFromErddap tacar sonraí. Beidh sin mar thoradh ar an EDDGrid / TableFromErddap tacar sonraí a bheith breá cothrom le dáta (go maith, laistigh de 5 soicind de na sonraí nua a chur leis) . Agus beidh gach a dhéanamh go héifeachtach (gan athluchtú tacar sonraí gan ghá) .
     
#### Níl an Tweet seo ar fáil addAttributes , axisVariable , nó dataVariable  {#no-addattributes-axisvariable-or-datavariable} 
Murab ionann agus cineálacha eile tacar sonraí, EDDTableFromErddap agus EDDGrid Ní cheadaíonn tacair sonraí ó Erddap domhanda&lt;addAttributes&gt;,&lt; axisVariable &amp; gt;, nó&lt; dataVariable &amp; gt; ailt sna datasets.xml don tacar sonraí sin. Is é an fhadhb a ligeann dóibh siúd a bheadh mar thoradh ar neamhréireachtaí:
    
1. A ligean ar rá go raibh cead aige agus chuir tú tréith nua domhanda.
2. Nuair a iarrann úsáideoir do ERDDAP™ do na tréithe domhanda, beidh an tréith nua le feiceáil.
3. Ach nuair a iarrann úsáideoir do ERDDAP™ le haghaidh comhad sonraí, do ERDDAP™ an iarraidh atreorú chuig an bhfoinse ERDDAP . Sin ERDDAP™ Tá aineolach ar an tréith nua. Mar sin, má chruthaíonn sé comhad sonraí le meiteashonraí, m.sh., .nc comhad, ní bheidh an tréith nua ag na meiteashonraí.

Tá dhá babhta oibre ann:

1. Convince an admin an fhoinse ERDDAP™ na hathruithe a theastaíonn uait a dhéanamh ar na meiteashonraí.
2. In ionad EDDTableFromErddap, úsáid [EDDTableFromDapSequence](#eddtablefromdapsequence) . Nó in ionad EDDGrid Ó Erddap, úsáid [ EDDGrid Ó Dhéag](#eddgridfromdap) . Tugann na cineálacha EDD seo deis duit nascadh go héifeachtach le tacar sonraí ar iargúlta ERDDAP™   (ach gan atreorú iarrataí sonraí) agus ceadaíonn siad duit a chur san áireamh domhanda&lt;addAttributes&gt;,&lt; axisVariable &amp; gt;, nó&lt; dataVariable &amp; gt; ailt sna datasets.xml . Difríocht amháin eile: beidh ort síntiús a íoc de láimh leis an tacar sonraí iargúlta, ionas go mbeidh an tacar sonraí ar do ERDDAP™ a chur in iúl (tríd an [URL bratach](/docs/server-admin/additional-information#set-dataset-flag) ) nuair a bhíonn athruithe ar an tacar sonraí iargúlta. Dá bhrí sin, tá tú ag cruthú tacar sonraí nua, in ionad nascadh le tacar sonraí iargúlta.
         
#### Nótaí eile{#other-notes} 
* Ar chúiseanna slándála, EDDGrid Ó Erddap agus EDDTable Ní thacaíonn FromErddap leis an [&lt;go dtí seo (Tuilleadh eolais) tag agus ní féidir a úsáid le tacair sonraí iargúlta a éilíonn logáil isteach (mar a úsáideann siad [&lt;go dtí seo (Tuilleadh eolais) .. Féach ar ERDDAP 's [security system](/docs/server-admin/additional-information#security) chun srian a chur ar rochtain ar roinnt tacar sonraí d'úsáideoirí áirithe.
     
* Ag tosú le ERDDAP™ v2.10, EDDGrid Ón Erddap agus EDDTableFromErddap tacú leis an [&lt;Féachaint ar Fholúntais (Tuilleadh roghanna...) tag. Murab ionann agus cineálacha eile tacar sonraí, tá an réamhshocraithe fíor, ach beidh comhaid an tacar sonraí a bheith inrochtanaViaFiles ach amháin má tá an tacar sonraí foinse freisin&lt;inrochtanaViaFiles uaire leagtha go fíor.
     
* Is féidir leat é a úsáid [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh ar an datasets.xml smután don chineál seo tacar sonraí. Ach is féidir leat na cineálacha tacar sonraí a dhéanamh go héasca de láimh.
     
####  EDDGrid Ó creatlach Erddap XML{#eddgridfromerddap-skeleton-xml} 
*    EDDGrid Ó creatlach Erddap Tá tacar sonraí XML an-simplí, toisc go bhfuil an intinn ach a mimic an tacar sonraí iargúlta atá oiriúnach cheana féin le húsáid i ERDDAP :
 >&nbsp;&nbsp;&lt;dataset type="EDDGridFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)...&lt;/accessibleViaFiles> &lt;!-- 0 or 1, default=true. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromErddap, this gets the remote .dds and then gets  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the new leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
 >&nbsp;&nbsp;&lt;/dataset>  

#### EDDTableFromErddap creatlach XML{#eddtablefromerddap-skeleton-xml} 
* Tá an creatlach XML le haghaidh tacar sonraí EDDTableFromErddap an-simplí, toisc go bhfuil an rún ach a mimic an tacar sonraí iargúlta, atá oiriúnach cheana féin le húsáid i ERDDAP :
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid Uisce agus Séarachas{#eddgridfrometopo} 
 [ ** EDDGrid Uisce agus Séarachas** ](#eddgridfrometopo) ach feidhmíonn an [ETOPO1 Domhanda 1-Minute Gridded Sonraí Socraigh](https://www.ngdc.noaa.gov/mgg/global/global.html)   (Dromchla Oighear, greille cláraithe, dénártha, 2byte int: .zip ) a dháileadh ar ERDDAP .

* Níl ach dhá datasetID s tacaíocht le haghaidh EDDGrid Ó Etopo, ionas gur féidir leat rochtain a fháil ar na sonraí le luachanna faddearthachta -180 go 180, nó luachanna faddearthachta 0 go 360.
* Níl aon clibeanna fo, ós rud é go bhfuil na sonraí cur síos cheana féin laistigh ERDDAP .
* Mar sin, an dá rogha le haghaidh EDDGrid Tá tacair sonraí ó Etopo (literally) :
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

###  EDDGrid Seirbhís do Chustaiméirí{#eddgridfromfiles} 
 [ ** EDDGrid Seirbhís do Chustaiméirí** ](#eddgridfromfiles) Is é an superclass de gach EDDGrid Ó...Aicmeáin. Ní féidir leat úsáid a bhaint EDDGrid FromFiles go díreach. Ina áit sin, bain úsáid as fo-aicme EDDGrid FromFiles chun an cineál comhaid ar leith a láimhseáil:

*    [ EDDGrid Seirbhís do Chustaiméirí](#eddgridfrommergeirfiles) Láimhseálann sonraí ó gridded [Sraith an Domhain .gz ](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README) comhaid.
*    [ EDDGrid Amharc ar gach eolas](#eddfromaudiofiles) comhiomlánaí sonraí ó ghrúpa de chomhaid fuaime áitiúil.
*    [ EDDGrid Seirbhís do Chustaiméirí](#eddgridfromncfiles) Láimhseálann sonraí ó gridded [Seirbhís do Chustaiméirí](https://en.wikipedia.org/wiki/GRIB) comhaid, [ HDF   (v4 nó v5)   .hdf ](https://www.hdfgroup.org/) comhaid, [ .nc ml ml](#ncml-files) comhaid, agus [ NetCDF   (v3 nó v4)   .nc ](https://www.unidata.ucar.edu/software/netcdf/) comhaid. D'fhéadfadh sé seo a bheith ag obair le cineálacha comhaid eile (mar shampla, BUFR) , ní mór dúinn ach tástáil sé - le do thoil a sheoladh chugainn roinnt comhaid sampla má tá suim agat.
*    [ EDDGrid Ón NcFilesUnpacked](#eddgridfromncfilesunpacked) Is malairt de EDDGrid Ó NcFiles a láimhseálann sonraí ó gridded NetCDF   (v3 nó v4)   .nc agus comhaid ghaolmhara, a ERDDAP™ unpacks ag leibhéal íseal.

Faoi láthair, níl aon chineál comhaid eile tacaíocht. Ach tá sé de ghnáth réasúnta éasca tacaíocht a chur le haghaidh cineálacha comhaid eile. Déan teagmháil linn má tá iarratas agat. Nó, má tá do chuid sonraí i bhformáid comhad d'aois gur mhaith leat a bhogadh ar shiúl ó, molaimid athrú ar na comhaid a bheith NetCDF v3 .nc comhaid. NetCDF Tá tacaíocht go forleathan, formáid dénártha, ceadaíonn rochtain randamach tapa ar na sonraí, agus tá tacaíocht cheana féin ag ERDDAP .

#### Ó Sonraí Comhaid{#from-files-details} 
Baineann an fhaisnéis seo a leanas le gach ceann de na fo-aicmí EDDGrid Ó Fianáin.

##### Comhiomlánú Toise atá ann cheana{#aggregation-of-an-existing-dimension} 
Gach athruithe ar EDDGrid Is féidir le FromFiles sonraí comhiomlán ó chomhaid áitiúla, áit a bhfuil gach comhad 1 (nó níos mó) luachanna éagsúla don leftmost (chéad chéad uair) gné, de ghnáth \\[ am trátha \\] , a chomhiomlánófar. Mar shampla, d'fhéadfadh na gnéithe a bheith \\[ am trátha \\]  \\[ airde plandaí (cm): níos airde 100 cm \\]  \\[ domhantarraingthe \\]  \\[ tréimhse saoil: ilbhliantúil \\] , agus d'fhéadfadh na comhaid a bheith ar na sonraí do cheann (nó cúpla) luach ama (s s) in aghaidh an comhad. Is cosúil go bhfuil an tacar sonraí mar thoradh air sin amhail is dá mba rud é go raibh gach ceann de na sonraí an comhad curtha le chéile. Is iad na buntáistí móra a bhaineann le comhiomlánú:

* Is féidir le méid an tacar sonraí comhiomlánaithe a bheith i bhfad níos mó ná mar is féidir comhad amháin a bheith áisiúil (~ 2GB) .
* Le haghaidh sonraí in aice-réadach-am, tá sé éasca comhad nua a chur leis an smután is déanaí de na sonraí. Ní gá duit a athscríobh an tacar sonraí ar fad.

Is iad na ceanglais maidir le comhiomlánú:
* Ní gá na comhaid áitiúla a bheith mar an gcéanna dataVariable s s (mar atá sainmhínithe sa tacar sonraí datasets.xml ) . Beidh an tacar sonraí a bheith dataVariable s sainmhínithe i datasets.xml . Más rud é nach bhfuil comhad ar leith a thabhairt dataVariable , ERDDAP™ cuir luachanna ar iarraidh mar is gá.
* Gach an dataVariable s MUST úsáid mar an gcéanna axisVariable s / toisí (mar atá sainmhínithe sa tacar sonraí datasets.xml ) . Déanfar na comhaid a chomhiomlánú bunaithe ar an gcéad (fágtha-beagnach) gné, curtha in ord ardaitheach.
* Tá gach comhad MAY sonraí le haghaidh ceann amháin nó níos mó luachanna den chéad ghné, ach ní féidir a bheith ar aon forluí idir comhaid. Má tá comhad níos mó ná luach amháin don chéad ghné, na luachanna MUST a shórtáil in ord ardaitheach, gan aon naisc.
* Gach comhad MUST bhfuil go díreach na luachanna céanna do gach ceann de na gnéithe eile. Déantar cruinneas na tástála a chinneadh de réir [Déan teagmháil anois](#matchaxisndigits) .
* Tá gach comhad MUST díreach mar an gcéanna [minicíocht uisce: flúirseach](#units) meiteashonraí do gach axisVariable s agus dataVariable s. Más fadhb é seo, d'fhéadfá a bheith in ann é a úsáid [An tIomlán](#ncml-files) nó [ NCO ](#netcdf-operators-nco) a shocrú ar an bhfadhb.
         
##### Comhiomlánú trí Ainmneacha Comhad nó Meiteashonraí Domhanda{#aggregation-via-file-names-or-global-metadata} 
Gach athruithe ar EDDGrid Is féidir le FromFiles comhiomlánú freisin ar ghrúpa de chomhaid ag cur nua leftmost (chéad chéad uair) gné, de ghnáth am, bunaithe ar luach a dhíorthaítear ó gach ainm comhaid nó ó luach tréith domhanda atá i ngach comhad. Mar shampla, d'fhéadfadh an ainm comhaid san áireamh an luach ama do na sonraí sa chomhad. ERDDAP™ bheadh a chruthú ansin gné nua ama.

Murab ionann agus an ghné den chineál céanna i THREDDS, ERDDAP™ Cruthaíonn i gcónaí ar axisVariable le luachanna uimhriúla (de réir mar a éilíonn CF) , riamh luachanna Curtain (nach bhfuil ceadaithe ag CF) . Freisin, ERDDAP™ Beidh sórtáil na comhaid i gcomhiomlánú bunaithe ar an uimhriúil axisVariable luach atá sannta do gach comhad, ionas go mbeidh an athróg ais i gcónaí luachanna sórtáilte mar a cheanglaítear ag CF. Mar thoradh ar an gcur chuige THREDDS maidir le saghas lexicographic a dhéanamh bunaithe ar na hainmneacha comhaid a chomhiomlánú i gcás nach bhfuil na luachanna ais curtha in eagar (nach bhfuil ceadaithe ag CF) nuair a shórtáil na hainmneacha comhaid difriúil ná an díorthaithe axisVariable luachanna.

A chur ar bun ar cheann de na comhbhailiúcháin i ERDDAP™ , beidh tú a shainmhíniú nua leftmost (chéad chéad uair)   [ axisVariable ](#axisvariable) le speisialta, pseudo&lt; sourceName bhéil, a insíonn ERDDAP™ áit agus conas a aimsiú ar an luach don ghné nua ó gach comhad.

* An fhormáid le haghaidh an pseudo sourceName a fhaigheann an luach ó ainm comhaid (ach filename.ext) Is maith liom
    \\*\\*\\ *fileName,*  [data recovery Cineál Cineál Cineál cineál](#data-types)  *,* cliceáil grianghraf a mhéadú *,* ghabháil Líon *
* An fhormáid le haghaidh an pseudo sourceName a fhaigheann an luach ó comhad ar ainm cosán iomlán
    \\*\\*\\ *pathName,*  [data recovery Cineál Cineál Cineál cineál](#data-types)  *,* cliceáil grianghraf a mhéadú *,* ghabháil Líon *
     \\[ Chun seo, úsáideann an t-ainm cosán i gcónaí '/' mar an carachtar deighilteoir eolaire, riamh '\'. \\] 
* An fhormáid le haghaidh an pseudo sourceName a fhaigheann an luach ó tréith domhanda
    \\*\\*\\ *domhanda:* tréith Ainm an ainm *,*  [data recovery Cineál Cineál Cineál cineál](#data-types)  *,* cliceáil grianghraf a mhéadú *,* ghabháil Líon *
* Seo ainm sourceName Oibríonn rogha difriúil ó na daoine eile: in ionad a chruthú nua leftmost (chéad chéad uair)   axisVariable , seo in ionad luach an reatha axisVariable le luach a bhaintear as an ainm comhaid (ach filename.ext) . Is é an fhormáid
    \\*\\*\\ *ionad a chur in ionad Ó FileName,*  [data recovery Cineál Cineál Cineál cineál](#data-types)  *,* cliceáil grianghraf a mhéadú *,* ghabháil Líon *
     

Is iad na tuairiscí ar na codanna is gá duit a chur ar fáil:

*    *tréith Ainm an ainm* - ainm na tréithe domhanda atá i ngach comhad agus ina bhfuil an luach gné.
*    *data recovery Cineál Cineál Cineál cineál* -- Sonraítear leis seo an cineál sonraí a úsáidfear chun na luachanna a stóráil. Féach ar an liosta caighdeánach [data recovery Cineálacha](#data-types) go bhfuil ERDDAP™ tacaíochtaí, ach amháin nach bhfuil Curtain cheadaítear anseo ó athróg ais i ERDDAP™ Ní féidir a bheith athróg Curtain.
    
Tá pseudo breise sonraí Type, timeFormat = *teaghrán tréimhse saoil: ilbhliantúil* , a insíonn ERDDAP™ go bhfuil an luach ama teaghrán [aonaid oiriúnach do amanna teaghrán](#string-time-units) . I bhformhór na gcásanna, beidh an stringTimeFormat is gá duit a bheith ina athrú ar cheann de na formáidí:
    
    *    yyyy-MM-dd 'T'H: mm: SSSSZ - a ISO 8601:2004 (E) formáid ama dáta. Is féidir leat gá leagan giorraithe de seo, m.sh., yyyy-MM-dd 'T'H: mm: sss nó yyyy-MM-dd .
    * yyyyMMddHmms.SSS - a bhfuil an leagan dlúth den ISO 8601 formáid ama dáta. Is féidir leat gá leagan giorraithe de seo, m.sh., yyyyMMddHmms nó yyyyyMMdd.
    * M/d/yyy H:mm: Ss.SSS - a bhfuil an bhformáid dáta Slais US. Is féidir leat gá leagan giorraithe de seo, m.sh., M / d/yyyy.
    * yyyyDDDHHmmsSSS - a bhfuil an bhliain móide an lá nialas-padded na bliana (e.g, 001 = Jan 1, 365 = 31 i mbliain neamh-leap; tá sé seo ar a dtugtar uaireanta hearráideach an dáta Julian) . Is féidir leat gá leagan giorraithe de seo, m.sh., yyyyDDDD.
    
Má úsáideann tú an pseudo dataType, seo a chur leis an athróg nua&lt; addAttributes ú:
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Más mian leat a athrú go léir na luachanna ama, athrú ar an luach ama in aonaid, m.sh.,
1970-01T12:00:00Z.
*    *cliceáil grianghraf a mhéadú* -- Níl an Tweet seo ar fáil [léiriú rialta](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [computer repair](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) a bhfuil grúpa gabhála ann (taiseachas aeir: fliuch) a chuireann síos ar conas a bhaint as an luach ón ainm comhaid nó luach tréith domhanda. Mar shampla, tugadh ainm comhaid cosúil le S19980011998031.L3b\\_MO\\_CHL .nc , grúpa gabhála #1, "\\ \\dcomputer repair ", san abairt rialta S (\\ \\dcomputer repair ) \\ \\dcomputer repair \\.L3b.\\* Gabhfaidh sé an chéad 7 ndigit tar éis 'S': 1998001.
*    *ghabháil leis an uimhir* -- Is é seo líon an ghrúpa gabhála (laistigh de péire de lúibíní) san abairt rialta ina bhfuil an t-eolas úis. Tá sé de ghnáth 1, an chéad ghrúpa gabhála. Uaireanta ní mór duit grúpaí gabhála a úsáid chun críocha eile sa regex, mar sin beidh an uimhir ghrúpa gabhála thábhachtach 2 (an dara grúpa gabhála) nó 3 (an tríú) , etc.

Sampla iomlán de axisVariable a dhéanann tacar sonraí comhiomlánaithe le hais ama nua a fhaigheann na luachanna ama ó ainm comhaid gach comhad
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
Nuair a úsáideann tú an "timeFormat =" sonraí bréige Cineál, ERDDAP™ cuirfidh 2 tréithe leis an axisVariable ionas gur dealraitheach go mbeidh siad ag teacht ón bhfoinse:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Mar sin, sa chás seo, ERDDAP™ a chruthú ais nua ainmnithe "time" le luachanna dúbailte (soicind ó 1970-01-T00:00:00Z) trí bhaint as an 7 digití tar éis 'S' agus roimh ".L3m" sa ainm comhaid agus a léirmhíniú iad siúd mar luachanna ama formáidithe mar yyyyyyyDDDD.

Is féidir leat a shárú an t-am bonn réamhshocraithe (cliceáil grianghraf a mhéadú) trí chur leis [Cuir ómós](#addattributes) a shonraíonn aonaid éagsúla tréith le bonn ama éagsúla. Tá staid coitianta: tá grúpaí de chomhaid sonraí, gach ceann acu le chéile 1 lá de tacar sonraí satailíte, i gcás inar mian leat an luach ama a bheith meán lae an lae a luaitear sa ainm comhaid (an t-am dírithe ar gach lá) agus ba mhaith liom an athróg ar long\\_name a bheith "Am dul isteach". Sampla a dhéanann é seo:
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
        <addAttributes>
          <att name="long\\_name">Centered Time</att>
          <att name="units">seconds since 1970-01-01T12:00:00Z</att>
        </addAttributes>
      </axisVariable>
```
Uaireanta Nóta = 12 san am bonn, a chuireann 12 uair an chloig i gcoibhneas leis an t-am bonn bunaidh de 1970-01T00:00:00Z.

Sampla iomlán de axisVariable a dhéanann tacar sonraí comhiomlánaithe le ais nua "rith" (le luachanna intleacht) a fhaigheann na luachanna a reáchtáil ó "runID" tréith dhomhanda i ngach comhad (le luachanna cosúil le "r17\\_global", áit a bhfuil 17 uimhir reáchtáil) Is maith liom
```
      <axisVariable> 
        <sourceName>\\*\\*\\*global:runID,int,(r|s)(\\d+)\\_global,2</sourceName>
        <destinationName>run</destinationName>
        <addAttributes>
          <att name="ioos\\_category">Other</att>
          <att name="units">count</att>
        </addAttributes>
      </axisVariable>
```
Tabhair faoi deara go n-úsáidfear uimhir an ghrúpa gabhála 2 chun na digití a tharlaíonn tar éis 'r' nó 's' a ghabháil, agus roimh "\\_global". Léiríonn an sampla seo freisin conas tréithe breise a chur leis (e.g., ioos\\_category agus aonaid) go dtí an ais athróg.
     
#### Go seachtrach Comhbhrúite Comhaid{#externally-compressed-files} 
* Sonraí atá fo-thacar de EDDGrid Ó Fianáin agus EDDTable Is féidir le FromFiles sonraí a sheirbheáil go díreach ó chomhaid sonraí atá comhbhrúite go seachtrach, lena n-áirítear .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 , agus .Z comhaid.
     
*    **Oibríonn sé seo ionadh go maith&#33;**   
I bhformhór na gcásanna, is é an slowdown a bhaineann le decompressing beag agus meánmhéide comhaid sonraí mion. Más gá duit spás diosca a chaomhnú, molaimid go láidir ag baint úsáide as an ngné seo, go háirithe le haghaidh comhaid níos sine a bhfuil rochtain annamh orthu.
     
*    **Sábháil airgead&#33;**   
Níl an Tweet seo ar fáil ERDDAP™ go dtugann tú deis a shábháil ar a lán airgid (cé gur laghdaigh an costas ar fheidhmíocht beagán) . Má tá an cóimheas comhbhrú e.g., 6:1 (uaireanta beidh sé i bhfad níos airde) , ansin beidh comhaid sonraí an tacar sonraí de dhíth ach 1/6 an spás diosca. Ansin b'fhéidir gur féidir leat a fháil ag le 1 Raid (de mhéid áirithe) in ionad 6 RAIDS (an méid céanna) . Is é sin coigiltis costas ollmhór. Tá súil againn, an cumas chun compress roinnt comhaid i mbailiúchán (na cinn níos sine?) agus nach bhfuil daoine eile comhbhrúite (na cinn níos nuaí?) , agus a athrú go ag am ar bith, a ligean ar tú a íoslaghdú an downside chun compressing cuid de na comhaid (níos moille) . Agus má tá an rogha idir na comhaid a stóráil ar téip (agus gan rochtain ach amháin arna iarraidh sin, tar éis moill) vs iad a stóráil comhbhrúite ar RAID (agus inrochtana trí ERDDAP ) , ansin tá buntáiste ollmhór a bhaint as comhbhrú ionas go bhfaigheann úsáideoirí idirghníomhach agus (réasúnta) rochtain tapa ar na sonraí. Agus más féidir é seo a shábháil tú ó cheannach RAID breise, is féidir an ghné seo a shábháil tú faoi $ 30,000.
     
* I gcás gach EDDGrid Fo-aicmí FromFiles, má tá na comhaid sonraí síneadh a léiríonn go bhfuil siad comhaid comhbhrúite go seachtrach (faoi láthair: .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 , nó .Z) , ERDDAP™ Beidh decompress na comhaid chuig eolaire taisce an tacar sonraí nuair a léann sé iad (más rud é nach bhfuil siad cheana féin sa taisce) . Is é an rud céanna fíor do chomhad dénártha (e.g., .nc ) Fo-aicmí EDDTableFromFiles.
     
* Le haghaidh fo-aicmí EDDTableFromFiles le haghaidh comhaid neamh-binary (e.g.,) , comhaid sonraí le síneadh a léiríonn go bhfuil siad comhaid atá comhbhrúite go seachtrach a decompressed ar-an-eitilt mar go bhfuil an comhad a léamh.
     
* CEANGLAIS: Má úsáidtear an cineál comhaid atá comhbhrúite go seachtrach (e.g., .tgz nó .zip ) tacaíochtaí níos mó ná 1 comhad taobh istigh den chomhad comhbhrúite, ní mór go bhfuil an comhad comhbhrúite ach 1 comhad.
     
* CEANGLAIS: Glacann an gné seo nach n-athraíonn an t-ábhar de na comhaid atá comhbhrúite go seachtrach, ionas gur féidir comhad decompressed i dtaisce a athúsáid. Má tá roinnt nó gach ceann de na tacar sonraí comhaid a athrú uaireanta, ná compress na comhaid. Tá sé seo ag teacht leis an úsáid coiteann, ós rud é nach bhfuil daoine comhaid comhbhrúite de ghnáth gur gá dóibh uaireanta a athrú.
     
*   &lt;comhaid Ainmfhocal Chun an obair seo a dhéanamh, an tacar sonraí&lt;Ní mór fileNameRegex ^ mheaitseáil na comhaid comhbhrúite 'ainmneacha. Ar ndóigh, regexes mhaith.\\*Beidh mheaitseáil gach ainm comhaid. Má shonraíonn tú cineál comhaid ar leith, m.sh., .\\*\\ t .nc , ansin ní mór duit an regex a mhodhnú chun an síneadh comhbhrú a chur san áireamh freisin, m.sh., . *\\ t .nc \\ t .gz (má tá gach ceann de na comhaid a bheith* rud éigin * .nc  .gz comhaid) .
     
* Tá sé breá má áirítear do tacar sonraí meascán de chomhbhrúite agus nach bhfuil comhaid comhbhrúite. D'fhéadfadh sé seo a bheith úsáideach má chreideann tú go bhfuil roinnt comhaid (e.g., comhaid níos sine) Beidh a úsáid níos lú go minic agus dá bhrí sin bheadh sé úsáideach spás diosca a shábháil trí iad a chomhbhrú. Chun an obair seo a dhéanamh, an&lt;Ní mór fileNameRegex ^ mheaitseáil leis na comhaid comhbhrúite agus nach bhfuil comhbhrúite 'ainmneacha, m.sh., .\\*nó .\\*\\ t .nc  ( | \\ t .gz ) (i gcás ina sonróidh an grúpa gabhála ag deireadh na sonraí sin go .gz Tá roghnach.
     
* Tá sé fíneáil má tá tú compress nó decompress comhaid ar leith sa bhailiúchán ag am ar bith.
Mura n-úsáideann an tacar sonraí [&lt;updateEveryNMillis . (Tuilleadh roghanna...) , leagtar an tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) a insint ERDDAP™ a athlódáil an tacar sonraí agus dá bhrí sin faoi deara na hathruithe. Interestingly, d'fhéadfaí tú a úsáid halgartaim comhbhrú éagsúla agus suímh le haghaidh comhaid éagsúla sa tacar sonraí céanna (e.g., .bz2 le haghaidh comhaid a úsáidtear annamh, .gz le haghaidh nach bhfuil a úsáidtear go minic comhaid, agus aon chomhbhrú le haghaidh comhaid a úsáidtear go minic) , ach a bheith cinnte go dtacaíonn an regex gach ceann de na síntí comhad atá in úsáid, m.sh., . .nc  ( | \\ t .gz  | \\ t .bz2 ) .
     
* Ar ndóigh, cóimheasa comhbhrú agus luasanna do na halgartaim comhbhrú éagsúla a athrú leis an gcomhad foinse agus na socruithe (e.g., leibhéal comhbhrú) . Más mian leat an córas seo a bharrfheabhsú do chuid comhad, déan tástáil ar na modhanna comhbhrú éagsúla le do chuid comhad agus le raon socruithe comhbhrú. Más mian leat go hiontaofa maith (ní gá an chuid is fearr) thus, beidh muid a mholadh beagán gzip   ( .gz ) . gzip Ní dhéanann an comhad comhbhrúite is lú (tá sé réasúnta gar) , ach compresses sé an comhad go han-tapa agus (níos tábhachtaí fós ERDDAP™ úsáideoirí) decompresses an comhad go han-tapa. Plus, gzip Tagann bogearraí caighdeánach le gach suiteáil Linux agus Mac OS agus tá sé ar fáil go héasca le haghaidh Windows trí uirlisí saor in aisce cosúil le 7Zip agus Linux add-ons cosúil le Git Bash. Mar shampla, comhad foinse a chomhbhrú isteach sa .gz leagan an chomhaid (ainm comhaid céanna, ach le .gz aguisín) , úsáid (i Linux, Mac OS, agus Git Bash)   
     gzip   * sourceName *   
Chun decompress a .gz comhad ar ais go dtí an bunaidh, úsáid
cineál gas: in airde * sourceName  .gz *   
A compress gach ceann de na comhaid foinse i eolaire agus a fo-stiúrthóirí, Athchúrsach, úsáid
     gzip cineál gas: in airde *minicíocht uisce: flúirseach*   
Chun decompress gach ceann de na .gz comhaid i eolaire agus a subdirectories , Athchúrsach, úsáid
cineál gas: in airde *minicíocht uisce: flúirseach*   
     
* WARNING: Ná compress seachtrach ( gzip ) comhaid atá comhbhrúite cheana féin go hinmheánach&#33;
Go leor comhaid cheana féin sonraí comhbhrúite go hinmheánach. Má tá tú gzip na comhaid, Ní bheidh na comhaid mar thoradh ar a bheith i bhfad níos lú (&lt;5%) agus ERDDAP™ beidh am dramhaíola decompressing iad nuair is gá é a léamh. Mar shampla:
    
    * comhaid sonraí: e.g., .nc 4, agus .hdf 5 comhaid: Roinnt comhaid a úsáid comhbhrú inmheánach; nach bhfuil roinnt. Conas a insint: Tá athróga comhbhrúite "\\_ChunkSize" tréithe. Chomh maith leis sin, má tá grúpa de gridded .nc nó .hdf Tá comhaid go léir méideanna éagsúla, tá siad dócha comhbhrúite go hinmheánach. Má tá siad go léir an méid céanna, nach bhfuil siad comhbhrúite go hinmheánach.
    * comhaid íomhá: m.sh., .gif, .jpg, agus .png
    * comhaid fuaime: m.sh., .mp3, agus .ogg.
    * comhaid físe: m.sh., .mp4, .ogv, agus .webm.
    
        
One cás trua corr: .wav comhaid fuaime ollmhór agus nach bhfuil comhbhrúite go hinmheánach. Bheadh sé deas chun compress ( gzip ) iad, ach go ginearálta ní ba chóir duit mar má dhéanann tú, Ní bheidh úsáideoirí a bheith in ann a imirt ar na comhaid comhbhrúite ina bhrabhsálaí.
     
* Cás Tástáil: comhbhrúite (le gzip ) tacar sonraí le 1523 gridded .nc comhaid.
    
    * Bhí na sonraí sna comhaid foinse sparse (go leor de na luachanna ar iarraidh) .
    * Chuaigh spás diosca iomlán ó 57 GB roimh chomhbhrú go 7 GB tar éis.
    * Tá iarraidh ar go leor sonraí ó 1 pointe ama&lt;1 s roimh agus tar éis comhbhrú.
    * iarraidh ar 1 pointe sonraí do phointí ama 365 (an cás is measa) chuaigh ó 4 s go 71 s.
         
    
Chun dom go bhfuil trádáil-uaire réasúnta le haghaidh aon tacar sonraí, agus is cinnte le haghaidh tacar sonraí a úsáidtear go minic.
     
* Comhbhrúite seachtrach --
I gcomparáid leis an gcomhbhrú comhad inmheánach ar fáil ag .nc 4 agus .hdf 5 comhaid, ERDDAP Tá buntáistí agus míbhuntáistí ag cur chuige 's do chomhaid dénártha atá comhbhrúite go seachtrach. Is é an míbhuntáiste: ar feadh tréimhse amháin a léamh cuid bheag de chomhad amháin, tá comhbhrú inmheánach níos fearr mar gheall ar EDDGrid Ní mór FromFiles ach cúpla smután a dhíspreagadh (s s) an comhad, ní an comhad ar fad. Ach ERDDAP 's Tá cur chuige roinnt buntáistí:
    
    *    ERDDAP™ tacaíochtaí comhbhrú de gach cineál comhaid sonraí (dénártha agus neamh-thábhachtach, e.g., .nc 3 agus .csv) ní hamháin .nc 4 agus .hdf 4. 4. 4.
    * Más gá an chuid is mó de comhad a léamh níos mó ná uair amháin i dtréimhse ghearr ama, ansin sábhálann sé am chun an comhad a dhíspreagadh uair amháin agus é a léamh go leor uaireanta. Tarlaíonn sé seo i ERDDAP™ nuair a úsáideann úsáideoir Déan-A-Graph don tacar sonraí agus déanann sraith athruithe beaga ar an graf.
    * An cumas a bheith comhaid comhbhrúite agus ní comhaid comhbhrúite sa bhailiúchán céanna, is féidir leat rialú níos mó a bhfuil comhaid comhbhrúite agus nach bhfuil. Agus tagann an rialú breise gan mhodhnú i ndáiríre an comhad foinse (ós rud é gur féidir leat comhad a chomhbhrú le m.sh., .gz agus ansin decompress sé a fháil ar an comhad bunaidh) .
    * An cumas a athrú ag am ar bith cibé an bhfuil comhad ar leith comhbhrúite agus conas atá sé comhbhrúite (halgartaim agus suímh éagsúla) Tugann tú rialú níos mó ar fheidhmíocht an chórais. Agus is féidir leat a ghnóthú go héasca ar an comhad bunaidh uncompressed ag am ar bith.
    
Cé nach bhfuil cur chuige buaiteoir i ngach cás, tá sé soiléir go ERDDAP 's cumas chun freastal ar shonraí ó chomhaid atá comhbhrúite go seachtrach a dhéanann comhbhrú seachtrach rogha réasúnta ar an comhbhrú inmheánach ar fáil ag .nc 4 agus .hdf 5. Sin suntasach ós rud é go bhfuil comhbhrú inmheánach ar cheann de na príomhchúiseanna a roghnaíonn daoine a úsáid .nc 4 agus .hdf 5.
     
##### Cache brúite{#decompressed-cache} 
 ERDDAP™ Déanann leagan decompressed d'aon dénártha comhbhrúite (e.g., .nc ) comhad sonraí nuair is gá é a léamh an comhad. Na comhaid decompressed a choimeád i eolaire an tacar sonraí laistigh *Treoir do Thuismitheoirí* / comhbhrúite / . Decompressed comhaid nach bhfuil in úsáid le déanaí a scriosadh chun saor in aisce spás nuair a bhíonn an méid comhaid carnach × 10GB. Is féidir leat athrú go trí leagan&lt;cliceáil grianghraf a mhéadú (réamhshocraithe = 10) i tacair sonraí Xml.xml, mar shampla,
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
Chomh maith leis sin, comhaid decompressed nach bhfuil in úsáid sna 15 nóiméad deireanach a scriosadh ag tús gach athlódáil tacar sonraí mór. Is féidir leat athrú go trí leagan&lt;cliceáil grianghraf a mhéadú (réamhshocraithe = 15) i tacair sonraí Xml.xml, mar shampla,
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
Tá líon níos mó deas, ach d'fhéadfadh an méid carnach de na comhaid decompressed a chur faoi deara *Treoir do Thuismitheoirí* a reáchtáil amach as spás diosca, a bhfuil fadhbanna tromchúiseacha.
     
* Toisc gur féidir decompressing comhad a ghlacadh méid suntasach ama (0.1 go 10 soicind) , d'fhéadfadh tacair sonraí le comhaid comhbhrúite leas a bhaint as a shocrú ar an tacar sonraí [&lt;nTríodair bhéil] (Tuilleadh roghanna...) leagan síos go dtí líon níos airde (2? 3? 4?) . An downsides go fiú uimhreacha níos airde (e.g., 5? 6? 7?) Tá tuairisceáin a laghdú agus gur féidir le hiarratas úsáideora amháin a úsáid ansin céatadán ard na n-acmhainní an chórais, rud a slowing go suntasach síos ar an próiseáil na n-iarratas úsáideora eile. Dá bhrí sin, níl aon leagan nThreads idéalach, ach iarmhairtí éagsúla i gcásanna éagsúla le suímh éagsúla.
         
#### Luachanna Toise Sórtáilte{#sorted-dimension-values} 
Na luachanna do gach MUST gné a bheith in ord sórtáilte (dul suas nó a shíolraigh, ach amháin i gcás an chéad (fágtha-beagnach) gné nach mór a bheith ag dul suas) . Is féidir na luachanna a bheith spásáilte neamhrialta. Ní féidir go mbeadh aon ceangail. Níl an Tweet seo ar fáil [CF meiteashonraí caighdeánach](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Más rud é nach bhfuil aon ghné luachanna in ord sórtáilte, ní bheidh an tacar sonraí a luchtú agus ERDDAP™ a aithint an chéad luach unsorted sa chomhad logáil, *Treoir do Thuismitheoirí* / logs / log.txt .
    
luachanna gné unsorted fios beagnach i gcónaí fadhb leis an tacar sonraí foinse. Tarlaíonn sé seo is coitianta nuair a bhíonn comhad misnamed nó mí-oiriúnach san áireamh sa chomhiomlánú, rud a fhágann gné am unsorted. Chun an fhadhb seo a réiteach, féach ar an teachtaireacht earráide sa ERDDAP™ log.txt comhad a aimsiú ar an luach am a chiontaíonn. Ansin breathnú ar na comhaid foinse a aimsiú ar an gcomhad comhfhreagrach (nó ceann acu roimh nó tar éis) nach mbaineann sa chomhiomlánú.
    
#### irl - Library Service{#directories} 
Na comhaid MAY a bheith i eolaire amháin, nó i eolaire agus a subdirectories (riachtanais uisce: measartha) . Má tá líon mór de chomhaid (mar shampla, ^1,000) , an córas oibriúcháin (agus dá bhrí sin EDDGrid Seirbhís do Chustaiméirí) a oibriú i bhfad níos éifeachtaí má stóráil tú na comhaid i sraith fo-stiúrthóirí (ceann amháin in aghaidh na bliana, nó ceann in aghaidh na míosa do thacair sonraí le comhaid an-minic) , ionas nach bhfuil líon mór de na comhaid i eolaire ar leith.
     
#### &lt;riachtanais uisce: measartha{#cachefromurl} 
Gach duine EDDGrid Ó Fianáin agus gach tacar sonraí EDDTableFromFiles tacú le sraith clibeanna a insint ERDDAP™ a íoslódáil agus a choimeád ar bun cóip de gach ceann de na comhaid tacar sonraí iargúlta, nó taisce de roinnt comhaid (íoslódáil de réir mar is gá) . Is féidir é seo a bheith thar a bheith úsáideach. Féach an [taisce taisce taisce Doiciméadú FromUrl](#cachefromurl) .
    
#### Eolaire cianda agus Iarratais Raon HTTP{#remote-directories-and-http-range-requests} 
 (AKA Freastal, Iarrataí Range Byte, Accept-Ranges http ceanntásc)   
 EDDGrid FromNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles, agus EDDTableFromNcCFFiles, Is féidir *uaireanta* sonraí a sheirbheáil ó .nc comhaid ar freastalaithe iargúlta agus rochtain trí HTTP má thacaíonn an freastalaí [Freastal ar an láthair](https://en.wikipedia.org/wiki/Byte_serving) trí iarratais raon HTTP (an mheicníocht HTTP le haghaidh byte ag freastal) . Níl an Tweet seo ar fáil (a bhfuil ERDDAP™ úsáidí a léamh .nc comhaid comhad) tacaíochtaí sonraí léitheoireachta ó iargúlta .nc comhaid trí iarratais raon HTTP.

 **Ná déan é seo&#33;** Tá sé uafásach neamhéifeachtach agus mall.
Ina áit sin, bain úsáid as an [&lt;córas eHouse4 (Tuilleadh roghanna...) .

Rochtain ar Rochtain ERDDAP™ datasets mar chomhaid trí iarratais raon byte --
Flipping seo thart, mar gheall ar gur féidir leat (i teoiric) smaoineamh ar tacar sonraí i ERDDAP™ mar fathach .nc comhad ag gabháil " .nc " go dtí an bonn OPen DAP URL le haghaidh tacar sonraí ar leith (e.g.,https://myserver.org/erddap/griddap/datasetID.ncagus freisin trí query a chur i ndiaidh sin a shonrú fo-thacar) , tá sé b'fhéidir réasúnta a iarraidh an féidir leat a úsáid netcdf-java, Ferret , nó roinnt eile NetCDF bogearraí cliant a léamh sonraí via Iarratais Raon HTTP ó ERDDAP . Níl an freagra, toisc nach bhfuil i ndáiríre ollmhór " .nc " comhad. Más mian leat é seo a dhéanamh, ina ionad sin a dhéanamh ar cheann de na roghanna seo:

* Úsáid Úsáid Úsáidte(OPeN)DAPbogearraí cliant a nascadh leis na seirbhísí griddap ar fáil ag ERDDAP . Is maith liom é DAP   (agus dá bhrí sin ERDDAP ) bhí deartha le haghaidh. Tá sé an-éifeachtach.
* Nó, íoslódáil an comhad foinse (s s) ó na "files" córas córas (nó comhad fo-thacar trí .nc ? search engine) le do ríomhaire agus a úsáid netcdf-java, Ferret , nó roinnt eile NetCDF bogearraí cliant a léamh ar an (anois) local file (s s) .
         
#### Eolas faoin gComhad{#cached-file-information} 
Nuair a EDDGrid Tá tacar sonraí FromFiles luchtaithe den chéad uair, EDDGrid Léigh FromFiles faisnéis ó gach ceann de na comhaid ábhartha agus cruthaíonn sé táblaí (sraith amháin do gach comhad) le faisnéis faoi gach comhad bailí agus gach "bad" (éagsúil nó neamhbhailí) comhad.
* Na táblaí a stóráil freisin ar diosca, mar NetCDF v3 .nc comhaid i *Treoir do Thuismitheoirí* / tacar sonraí / *cliceáil grianghraf a mhéadú* / Baile * datasetID * / i gcomhaid ainmnithe:
minicíocht uisce: flúirseach .nc   (a bhfuil liosta de na hainmneacha eolaire ar leith) ,
comhad comhad Tábla Tábla .nc   (a bhfuil an tábla le gach comhad bailí ar fhaisnéis) ,
taiseachas aeir: fliuch .nc   (a bhfuil an tábla le gach comhad dona faisnéise) .
* Chun dlús a chur le rochtain ar EDDGrid Ó Fisic tacar sonraí (ach ar chostas níos mó cuimhne a úsáid) , Is féidir leat é a úsáid [&lt;comhad a stóráil&lt;/ fileTableInMemory ×) (Tuilleadh eolais) a insint ERDDAP™ cóip de na táblaí faisnéise comhad a choinneáil i gcuimhne.
* Tá an chóip de na táblaí eolais comhad ar diosca úsáideach freisin nuair ERDDAP™ Tá stoptar síos agus atosú: Sábhálann sé EDDGrid FromFiles from have to re-read all of the data files.
* Nuair a dhéantar tacar sonraí a athlódáil, ERDDAP™ ní mór ach na sonraí a léamh i gcomhaid agus comhaid nua a d'athraigh.
* Má tá comhad struchtúr difriúil ó na comhaid eile (mar shampla, cineál sonraí éagsúla do cheann de na hathróga, nó luach difriúil don " [minicíocht uisce: flúirseach](#units) " tréith) , ERDDAP Cuireann an comhad leis an liosta de na comhaid "bad". Beidh faisnéis faoin bhfadhb leis an gcomhad a scríobh chuig an *Treoir do Thuismitheoirí* / logs / log.txt comhad.
* Ní mór duit riamh a scriosadh nó ag obair leis na comhaid. Is eisceacht amháin: má tá tú ag déanamh fós athruithe ar tacar sonraí datasets.xml thus, b'fhéidir gur mhaith leat a scriosadh na comhaid a bhfeidhm ERDDAP™ a reread gach ceann de na comhaid ó beidh na comhaid a léamh / a léiriú difriúil. Má tá tú riamh gá a scriosadh na comhaid, is féidir leat é a dhéanamh nuair ERDDAP™ Tá sé ag rith. (Ansin a leagtar [bratach bratach](/docs/server-admin/additional-information#set-dataset-flag) a athlódáil an ASAP tacar sonraí.) Mar sin féin, ERDDAP™ de ghnáth fógraí go bhfuil an datasets.xml Ní faisnéis mheaitseáil leis an gcomhad Eolas Tábla agus scriosann na táblaí comhad go huathoibríoch.
* Más mian leat a spreagadh ERDDAP™ an fhaisnéis atá stóráilte a nuashonrú (mar shampla, má tá tú díreach leis, a bhaint, nó d'athraigh roinnt comhaid chuig an tacar sonraí eolaire sonraí) , bain úsáid as an [córas bratach](/docs/server-admin/additional-information#flag) a chur i bhfeidhm ERDDAP™ a thabhairt cothrom le dáta an t-eolas comhad i dtaisce.
         
#### Iarratas ar Láimhseáil{#handling-requests} 
Nuair a dhéantar iarratas cliaint ar shonraí a phróiseáil, EDDGrid Is féidir le FromFiles breathnú go tapa ar an tábla leis an eolas comhad bailí a fheiceáil a bhfuil na sonraí a iarrtar comhaid.
     
#### Nuashonrú an Eolas Comhad Cached{#updating-the-cached-file-information} 
Aon uair a bhíonn an tacar sonraí athluchtaithe, tá an t-eolas comhad a taisceadh cothrom le dáta.
    
* Déantar an tacar sonraí a athlódáil go tréimhsiúil de réir mar a chinnfidh an&lt;reloadEveryNMinutes ^ in eolas an tacar sonraí i datasets.xml .
* Déantar an tacar sonraí a athlódáil a luaithe is féidir aon uair ERDDAP™ bleachs go bhfuil tú leis, a bhaint, [cineál gas: in airde](https://en.wikipedia.org/wiki/Touch_(Unix) ) (a athrú ar an comhad deireanach Am Athraithe) , nó d'athraigh comhad sonraí.
* Déantar an tacar sonraí a athlódáil a luaithe is féidir má úsáideann tú an [córas bratach](/docs/server-admin/additional-information#flag) .

Nuair a dhéantar an tacar sonraí a athlódáil, ERDDAP™ i gcomparáid leis na comhaid atá ar fáil faoi láthair leis na táblaí faisnéise comhad i dtaisce. Comhaid nua a léamh agus a chur leis an tábla comhaid bailí. Comhaid nach bhfuil ann a thuilleadh a thit as an tábla comhaid bailí. Comhaid ina bhfuil an t-amstamp comhad a athrú a léamh agus a n-eolas cothrom le dáta. Na táblaí nua in ionad na táblaí d'aois i gcuimhne agus ar diosca.
     
#### Bad Comhaid{#bad-files} 
An tábla comhaid dona agus na cúiseanna a dearbhaíodh na comhaid dona (comhad truaillithe, athróg ar iarraidh, etc.) Tá ríomhphost chuig an ríomhphost Gach rud Seoladh ríomhphoist (is dócha go bhfuil tú) gach uair a athlódáiltear an tacar sonraí. Ba chóir duit na comhaid seo a athsholáthar nó a dheisiú a luaithe is féidir.
     
#### Athróga Missing{#missing-variables} 
Más rud é nach bhfuil roinnt de na comhaid a bhfuil cuid de na dataVariable s sainithe sa tacar sonraí datasets.xml smután, sin ceart go leor. Nuair a bheidh EDDGrid léann FromFiles ar cheann de na comhaid sin, beidh sé ag gníomhú amhail is dá mbeadh an comhad athróg, ach le gach luachanna ar iarraidh.
     
#### FTP Trioblóid / Cathartha{#ftp-troubleadvice} 
Má FTP tú comhaid sonraí nua chuig an ERDDAP™ freastalaí agus ERDDAP™ ag rith, tá an deis go ERDDAP™ a athlódáil an tacar sonraí le linn an phróisis FTP. Tarlaíonn sé níos minice ná mar a cheapann tú&#33; Má tharlaíonn sé, beidh an comhad le feiceáil a bheith bailí (tá ainm bailí aige) , ach nach bhfuil an comhad bailí go fóill. Más rud é ERDDAP™ déanann sé iarracht sonraí a léamh ón gcomhad neamhbhailí sin, cuirfidh an earráid mar thoradh air sin faoi deara an comhad a chur leis an tábla de chomhaid neamhbhailí. Níl an Tweet seo ar fáil. Chun an fhadhb seo a sheachaint, bain úsáid as logainm sealadach nuair FTP'ing an comhad, mar shampla, ABC2005 .nc \\_TEMP . Ansin, an tástáil fileNameRegex (féach thíos) le fios nach comhad ábhartha é seo. Tar éis an próiseas FTP iomlán, athainmniú an comhad chuig an ainm ceart. Beidh an próiseas athainmniú faoi deara an comhad a bheith ábhartha i toirt.
     
#### "0 comhaid" Cuardaigh le haghaidh:{#0-files-error-message-1} 
Má ritheann tú [Socraigh mar teanga réamhshocraithe](#generatedatasetsxml) nó [Seirbhís do Chustaiméirí](#dasdds) , nó má iarracht tú a luchtú EDDGrid Ó...Roinn sonraí ERDDAP™ , agus gheobhaidh tú "0 comhaid" teachtaireacht earráide a léiríonn go ERDDAP™ fuair 0 comhaid meaitseáil san eolaire (nuair a cheapann tú go bhfuil comhaid meaitseáil san eolaire) :
    * Seiceáil go bhfuil na comhaid i ndáiríre san eolaire.
    * Seiceáil litriú an ainm eolaire.
    * Seiceáil an comhad NameRegex. Tá sé i ndáiríre, i ndáiríre éasca botúin a dhéanamh le regexes. Chun críocha tástála, déan iarracht an regex .\\* ba chóir a mheaitseáil gach ainm comhaid. (Féach seo [doiciméadú regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) agus [riachtanais uisce: measartha](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
    * Seiceáil go bhfuil an t-úsáideoir atá ag rith an chláir (e.g., úsáideoir = toitcat (?) do Tomcat / ERDDAP ) Tá cead 'léamh' do na comhaid.
    * I roinnt córais oibriúcháin (mar shampla, SELinux) agus ag brath ar suímh córas, ní mór an t-úsáideoir a bhí ar siúl ar an gclár a bheith 'léamh' cead le haghaidh an slabhra iomlán de eolairí as a dtiocfaidh an eolaire go bhfuil na comhaid.
         
####  EDDGrid Ó Fisic creatlach XML{#eddgridfromfiles-skeleton-xml} 
*    **An creatlach XML** do gach duine EDDGrid Tá Fo-aicmí Ó Fiacail:

>&nbsp;&nbsp;&lt;dataset type="EDDGridFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromFiles subclasses, this uses Java's WatchDirectory system   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file names, for example, ".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD * Ó AudioFiles{#eddfromaudiofiles} 
 ** EDDGrid Amharc ar gach eolas** agus **EDDTableFrom AudioFiles** sonraí comhiomlána ó bhailiúchán de chomhaid fuaime áitiúla. (Na chéad chuma i ERDDAP™ v1.82.) Is é an difríocht go EDDGrid Ó AudioFiles déileálann na sonraí mar tacar sonraí tríthoiseach (de ghnáth le 2 toisí: \\[ tús a chur le Am agus am \\] agus \\[ imithe in éag Am laistigh de chomhad \\] ) , cé go déileálann EDDTableFromAudioFiles na sonraí mar shonraí tabular (de ghnáth le colúin don am tosaithe comhad, an t-am caite leis an gcomhad, agus na sonraí ó na bealaí fuaime) . EDDGrid Éilíonn FromAudioFiles go bhfuil gach comhad an líon céanna samplaí, mar sin más rud é nach bhfuil fíor, ní mór duit EDDTableFromAudioFiles a úsáid. Seachas sin, is é an rogha a bhfuil cineál EDD le húsáid go hiomlán do rogha. Buntáiste amháin de EDDTableFromAudioFiles: Is féidir leat a chur athróg eile le faisnéis eile, m.sh., stationID , StationType. Sa dá chás, an easpa athróg ama aontaithe a dhéanann sé níos deacra a bheith ag obair leis na sonraí ó na cineálacha EDD, ach ní raibh aon bhealach maith a chur ar bun athróg ama aontaithe.

Féach na superclasss rang ', [ EDDGrid Seirbhís do Chustaiméirí](#eddgridfromfiles) agus [EDDTableFromFiles](#eddtablefromfiles) , le haghaidh faisnéise ginearálta maidir le conas a oibríonn an rang seo agus conas é a úsáid.

Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Ós rud é go bhfuil comhaid fuaime aon meiteashonraí seachas faisnéis a bhaineann leis an ionchódú na sonraí fuaime, beidh ort a chur in eagar an t-aschur ó GenerateDatasets Xml faisnéis riachtanach a sholáthar (e.g. teideal, achoimre, creator\\_name , institiúid, stair) .

Sonraí:

* Tá líon mór de formáidí comhaid fuaime. Faoi láthair, ERDDAP™ Is féidir sonraí a léamh ón chuid is mó .wav agus .au comhaid. Ní féidir é a léamh faoi láthair cineálacha eile de chomhaid fuaime, m.sh., .aiff nó .mp3. Más gá duit tacaíocht le haghaidh formáidí comhaid fuaime eile nó leaganacha eile de .wav agus .au, le do thoil ríomhphost d'iarratas a Chris. John ag noaa.gov. Nó, mar workaround féidir leat é a úsáid ceart anois, is féidir leat a thiontú do chuid comhad fuaime i PCM\\_ Amharc ar gach eolas (do shonraí slánuimhir) nó PCM \\ (le haghaidh sonraí pointe snámh) .wav comhaid ionas go ERDDAP™ is féidir a bheith ag obair leo.
* Faoi láthair, ERDDAP™ Is féidir a léamh comhaid fuaime leis an méid Java 's AudioFormat glaonna rang PCM\\_FLOAT, PCM\\_SIGNED, PCM\\_UNSIGNED, ALAW, agus ionchódú ULAW. ERDDAP™ athraíonn luachanna PCM\\_UNSIGNED (e.g., 0 go 255) i luachanna sínithe (e.g., -128 go 128) ag athshocrú na giotán sna luachanna sonraí. ERDDAP™ athraíonn ALAW agus ULAW ionchódaithe as a n-formáid ionchódaithe dúchais tríte i bhformáid ghearr (Déan teagmháil linn) luachanna. Ós rud é Java mian bigEndian = sonraí fíor, ERDDAP™ rearranges an bytes na sonraí a stóráil le bigEndian = False (bláthanna cumhra: cumhráin) chun na luachanna a léamh i gceart. I gcás gach ionchódú eile (PCM) , ERDDAP™ léann na sonraí mar atá.
* Nuair a bheidh ERDDAP™ léann sonraí ó chomhaid fuaime, athraíonn sé an comhad ar meiteashonraí fuaime ar fáil i tréithe domhanda. Beidh sé seo san áireamh i gcónaí (le luachanna samplacha a thaispeántar) 
    
String audioBigEndian "false"; / fíor nó bréagach
fuaime Cainéil 1;
Fuaimeanna teaghrán "PCM\\_SIGNED";
snámhphointe fuaimeFrameRate 96000.0; / / in aghaidh an dara
int audioFrameSize 2; / / # bytes sonraí in aghaidh an fhráma
fuaime snámhphointe SampleRate 96000.0; / / in aghaidh an dara
int audioSampleSizeInBits 16; / / # de giotán in aghaidh an chainéil in aghaidh an sampla
    
Le haghaidh ERDDAP 's críocha, tá fráma comhchiallach le sampla, a bhfuil na sonraí ar feadh pointe amháin in am.
Na tréithe i ERDDAP™ beidh an t-eolas cur síos ar na sonraí mar a bhí sé sna comhaid foinse. ERDDAP™ beidh athrú go minic seo agus léamh na sonraí, m.sh., PCM\\_UNSIGNED, ALAW, agus sonraí ionchódaithe ULAW a thiontú go PCM\\_SIGNED, agus tá sonraí bigEndian = sonraí a thiontú go bigEndian = sonraí fíor (a bhfuil conas Java ag iarraidh é a léamh) . Sa deireadh, luachanna sonraí i ERDDAP™ beidh i gcónaí ar an [PCM-ionchódaithe](https://en.wikipedia.org/wiki/Pulse-code_modulation) data recovery (i.e., samplaí digitithe simplí den tonn fuaime) .
* Nuair a bheidh ERDDAP™ léann sonraí ó chomhaid fuaime, léann sé an comhad ar fad. ERDDAP™ is féidir a léamh mar go leor mar thart ar 2 billiún samplaí in aghaidh an chainéil. Mar shampla, má tá an ráta sampla 44,100 samplaí in aghaidh an dara, 2 billiún samplaí aistríonn go dtí thart ar 756 nóiméad de shonraí fuaime in aghaidh an chomhaid. Má tá tú comhaid fuaime le níos mó ná an méid sonraí, is gá duit a bhriseadh suas na comhaid i smutáin níos lú ionas go ERDDAP™ Is féidir iad a léamh.
* Mar gheall ar ERDDAP™ léann comhaid fuaime ar fad, ERDDAP™ Ní mór rochtain a bheith acu ar mhéid mór de chuimhne a bheith ag obair le comhaid fuaime mór. Féach ar [ ERDDAP 's suímh cuimhne](/docs/server-admin/deploy-install#memory) . Arís, más fadhb é seo, tá workaround gur féidir leat é a úsáid ceart anois chun na comhaid a bhriseadh suas i smutáin níos lú ionas go mbeidh ERDDAP™ Is féidir iad a léamh le cuimhne níos lú.
* Scríobhadh roinnt comhaid fuaime go mícheart. ERDDAP™ a dhéanann iarracht beag chun déileáil le cásanna den sórt sin. Ach go ginearálta, nuair a bhíonn earráid ann, ERDDAP™ Beidh caith Eisceacht (agus a dhiúltú an comhad sin) nó (má tá an earráid undetectable) na sonraí a léamh (ach beidh na sonraí mícheart) .
*    ERDDAP™ nach seiceáil nó a athrú ar líon na fuaime. Go hidéalach, Tá sonraí fuaime slánuimhir scála a bhaint as an raon iomlán den chineál sonraí.
* Tá comhaid fuaime agus imreoirí fuaime aon chóras le haghaidh luachanna ar iarraidh (e.g., -999 nó Float.NaN) . Mar sin, níor chóir go mbeadh aon luachanna ar iarraidh ag sonraí fuaime. Má tá luachanna ar iarraidh (e.g., más gá duit comhad fuaime a leathnú) , bain úsáid as sraith de 0 a léiriú mar tost foirfe.
* Nuair a bheidh ERDDAP™ léann sonraí ó chomhaid fuaime, cruthaíonn sé i gcónaí colún ar a dtugtar caite Am leis an am do gach sampla, i soicind (stóráil mar doubles) , i gcoibhneas leis an gcéad sampla (atá sannta don tréimhse sin Am = 0.0 s) . Le EDDGrid Ó AudioFiles, éiríonn sé seo an t-athróg ais am caite.
*    EDDGrid Éilíonn FromAudioFiles go bhfuil gach comhad an líon céanna samplaí. Mar sin, más rud é nach bhfuil fíor, ní mór duit EDDTableFromAudioFiles a úsáid.
* Le haghaidh EDDGrid Ó AudioFiles, molaimid duit a leagtar [&lt;gnéValuesInMemory ×] (Tuilleadh roghanna...) go bréagach (mar atá molta ag GenerateDatasets XLUMX) , toisc go bhfuil an ghné ama go minic le líon mór de luachanna.
* Le haghaidh EDDGrid Ó AudioFiles, ba chóir duit a úsáid beagnach i gcónaí ar an EDDGrid Córas FromFiles [comhiomlánú trí Ainm an chomhaid](#aggregation-via-file-names-or-global-metadata) , beagnach i gcónaí ag baint dáta tosaithe an taifeadta Am ó na logainmneacha. Mar shampla,
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Sonraí a ghiniúint Beidh Xml spreagadh seo agus cabhrú leat leis seo.
* Do EDDTableFromAudioFiles, ba chóir duit a úsáid beagnach i gcónaí ar an gcóras EDDTableFromFiles do [\\*\\*\\ * ainm bréige sourceName s s](#filename-sourcenames) chun faisnéis a bhaint as ainm an chomhaid (beagnach i gcónaí ar an dáta tosaithe Am don taifeadadh) agus é a chur chun cinn mar cholún de shonraí. Mar shampla,
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Ba cheart an fhormáid ama a shonrú ansin mar an tréith aonad:&lt;ainm an t-ainm = "aonaid" xyyMMdd'\\_'Hmms&lt;Baile Átha Troim
     
###  EDDGrid Seirbhís do Chustaiméirí{#eddgridfrommergeirfiles} 
 [ ** EDDGrid Seirbhís do Chustaiméirí** ](#eddgridfrommergeirfiles) comhiomlánaí sonraí ó áitiúil, [Sraith an Domhain](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README) comhaid, atá ó na [Tropical Rainfall Tomhas Misean (TRMM) ](https://trmm.gsfc.nasa.gov) , a bhfuil misean comhpháirteach idir NASA agus an Ghníomhaireacht Taiscéalaíochta Aerospace tSeapáin (Amharc ar gach eolas) . Amharc ar gach eolas Is féidir IR comhaid a íoslódáil ó [NASA](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/) .

 EDDGrid Scríobhadh FromMergeIRFiles.java agus chuir sé leis an ERDDAP™ tionscadal ag Jonathan Lafite agus Philippe Makowski de R.Tech Engineering (ceadúnas: cóipcheart foinse oscailte) .

 EDDGrid Is ÓMergeIRFiles beagán neamhghnách:

*    EDDGrid Tacaíonn FromMergeIRFiles comhaid sonraí foinse comhbhrúite nó neamhchasta, in aon teaglaim, sa tacar sonraí céanna. Ligeann sé seo duit, mar shampla, a chomhbhrú comhaid níos sine go bhfuil rochtain annamh, ach comhaid nua uncompress go bhfuil rochtain go minic. Nó, Is féidir leat athrú ar an gcineál comhbhrú ón bunaidh. Z go mar shampla, .gz .
* Má tá tú leaganacha comhbhrúite agus uncompressed de na comhaid sonraí céanna san eolaire céanna, déan cinnte an&lt;fileNameRegex × do do tacar sonraí a oireann an filenames gur mian leat é a mheaitseáil agus ní mheaitseáil ainmneacha comhaid nach mian leat é a mheaitseáil.
* Ní mór go mbeadh comhaid sonraí foinse neamhbhrúite aon síneadh comhad (i.e., ní "." sa ainm comhaid) .
* Ní mór comhaid sonraí foinse comhbhrúite a bheith síneadh comhad, ach ERDDAP™ a chinneann an cineál comhbhrú ag iniúchadh an t-ábhar ar an comhad, ní ag féachaint ar an comhad síneadh comhad (mar shampla, ".Z") . I measc na gcineálacha comhbhrú tacaithe tá "gz", "bzip2", "xz", "lzma", "snappy-arán", "snappy-fráma", "pac200", agus "z". Nuair a bheidh ERDDAP™ léann comhaid comhbhrúite, decompresses sé ar-an-féile, gan scríobh chuig comhad sealadach.
* Ní mór do gach comhad sonraí foinse úsáid a bhaint as an gcóras bunaidh ainmniú comhad: i.e., merg\\_ *TIONSCADAL TIONSCAIL* Cuardach le haghaidh Iarratas Pleanála (i gcás *TIONSCADAL TIONSCAIL* léiríonn an t-am a bhaineann leis na sonraí sa chomhad) , móide síneadh comhad má tá an comhad comhbhrúite.

Féach an rang seo' superclass, [ EDDGrid Seirbhís do Chustaiméirí](#eddgridfromfiles) , le haghaidh faisnéise ginearálta maidir le conas a oibríonn an rang seo agus conas é a úsáid.

Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Is féidir leat a chur in eagar ansin go fíneáil tune é.
 
###  EDDGrid Seirbhís do Chustaiméirí{#eddgridfromncfiles} 
 [ ** EDDGrid Seirbhís do Chustaiméirí** ](#eddgridfromncfiles) comhiomlánaí sonraí ó áitiúil, gridded, [GRIB .grb agus .grb2](https://en.wikipedia.org/wiki/GRIB) comhaid, [ HDF   (v4 nó v5)   .hdf ](https://www.hdfgroup.org/) comhaid, [ .nc ml ml](#ncml-files) comhaid, [ NetCDF   (v3 nó v4)   .nc ](https://www.unidata.ucar.edu/software/netcdf/) comhaid, agus [riachtanais uisce: measartha](https://github.com/zarr-developers/zarr-python) comhaid comhad (mar leagan 2.25) . Tá comhaid Zarr iompar beagán difriúil agus a cheangal ar an comhad NameRegex nó an pathRegex a chur san áireamh "zarr".

Nua i ERDDAP™ leagan 2.29.0 Is tacaíocht turgnamhach do athróg sonraí nach bhfuil tacaíocht ar fad de na hathróga ais (nó mar a bhfuil roinnt ar a dtugtar sé 1D agus 2D sonraí sa tacar sonraí céanna) . Faigh amach faoi GitHub (plé nó saincheisteanna) le haiseolas agus bugs.

D'fhéadfadh sé seo a bheith ag obair le cineálacha comhaid eile (mar shampla, BUFR) , ní mór dúinn ach tástáil sé - le do thoil a sheoladh chugainn roinnt comhaid sampla.

* Do chomhaid GRIB, ERDDAP™ a dhéanamh .gbx comhad innéacs an chéad uair a léann sé gach comhad GRIB. Mar sin, ní mór na comhaid GRIB a bheith i eolaire ina bhfuil an "úsáideoir" a bhí ar siúl Tomcat léamh cead + scríobh.
* Féach an rang seo' superclass, [ EDDGrid Seirbhís do Chustaiméirí](#eddgridfromfiles) , le haghaidh faisnéise ar conas a oibríonn an rang seo agus conas é a úsáid.
* Ag tosú le ERDDAP™ v2.12, EDDGrid Seirbhís do Chustaiméirí EDDGrid Seirbhís do Chustaiméirí Is féidir le neamhphacáilte sonraí a léamh ó "struchtúr" i .nc 4 agus .hdf 4 comhaid. A aithint athróg atá ó struchtúr, an&lt; sourceName ú ní mór an fhormáid a úsáid: *Iomlán na Struchtúr*  |  *An t-eagrán is déanaí* , mar shampla grúpa1/myStruct | mo Chomhalta.
* Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Is féidir leat a chur in eagar ansin go fíneáil tune é.
    
#### Grúpaí i gcomhaid Nc Gridded{#groups-in-gridded-nc-files} 
     [Is féidir le comhaid Netcdf4 bhfuil grúpaí.](#groups-in-gridded-nc-files)   ERDDAP™ ach a dhéanann tacar sonraí ó na hathróga i ngrúpa amháin agus gach ceann de na grúpaí tuismitheoir. Is féidir leat a shonrú ainm grúpa ar leith i GenerateDatasets XLUMX (omit an Slais trailing) , nó a úsáid "" a bheith GenerateDatasets Xml cuardaigh gach grúpa do na hathróga a úsáideann na gnéithe is mó, nó a úsáid " \\[ duille dath glas \\] " a bheith GenerateDatasets ach breathnú ar athróg sa ghrúpa fréimhe.
    
Déanann an chéad rud GenerateDatasetsXml don chineál seo tacar sonraí tar éis duit freagra a thabhairt ar na ceisteanna a phriontáil an struchtúr ncdump-mhaith ar an gcomhad sampla. Mar sin, má théann tú cúpla freagraí goofy don chéad lúb trí GenerateDatasets Xml, ar a laghad beidh tú in ann a fheiceáil má ERDDAP™ Is féidir an comhad a léamh agus a fheiceáil cad iad na gnéithe agus na hathróga sa chomhad. Ansin is féidir leat freagraí níos fearr a thabhairt don dara lúb trí GenerateDatasetsXml.
    

###  EDDGrid Ón NcFilesUnpacked{#eddgridfromncfilesunpacked} 
 [ ** EDDGrid Ón NcFilesUnpacked** ](#eddgridfromncfilesunpacked) Is malairt de [ EDDGrid Seirbhís do Chustaiméirí](#eddgridfromncfiles) a chomhshuimíonn sonraí ó áitiúil, gridded NetCDF   (v3 nó v4)   .nc agus comhaid ghaolmhara. Is é an difríocht go unpacks an rang gach comhad sonraí roimh EDDGrid Breathnaíonn FromFiles ar na comhaid:

* Tá sé unpacks athróg atá pacáilte le [ scale\\_factor agus/nó add\\_offset ](#scale_factor) .
* Athraíonn sé \\_FillValue agus missing\\_value luachanna a bheith NaN (nó MAX\\_VALUE do chineálacha sonraí slánuimhir) .
* Athraíonn sé luachanna ama agus ama go "seconds since 1970-01-01T00:00:00Z" .

Is é an buntáiste mór den rang seo go soláthraíonn sé ar bhealach chun déileáil le luachanna éagsúla de scale\\_factor , add\\_offset , \\_FillValue, missing\\_value , nó aonaid ama i gcomhaid foinse éagsúla i mbailiúchán. Seachas sin, ba mhaith leat a úsáid uirlis cosúil [An tIomlán](#ncml-files) nó [ NCO ](#netcdf-operators-nco) a mhodhnú gach comhad a bhaint as na difríochtaí ionas go bhféadfaí na comhaid a láimhseáil ag EDDGrid Ó Fisicí. Maidir leis an rang seo a bheith ag obair i gceart, ní mór na comhaid a leanúint na caighdeáin CF do na tréithe gaolmhara.

* Má iarracht a dhéanamh EDDGrid Seirbhís do Chustaiméirí Unpacked ó ghrúpa de chomhaid a rinne tú roimhe seo agus theip a úsáid EDDGrid FromNcFiles, cd to
     *Treoir do Thuismitheoirí* / tacar sonraí / *Seirbhís do Chustaiméirí* / Baile * datasetID * / Baile
i gcás *Seirbhís do Chustaiméirí* Is é an 2 litir dheireanach de na datasetID ,
agus gach ceann de na comhaid a scriosadh san eolaire.
* Ag tosú le ERDDAP™ v2.12, EDDGrid Seirbhís do Chustaiméirí EDDGrid Seirbhís do Chustaiméirí Is féidir le neamhphacáilte sonraí a léamh ó "struchtúr" i .nc 4 agus .hdf 4 comhaid. A aithint athróg atá ó struchtúr, an&lt; sourceName ú ní mór an fhormáid a úsáid: *Iomlán na Struchtúr*  |  *An t-eagrán is déanaí* , mar shampla grúpa1/myStruct | mo Chomhalta.
* Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Is féidir leat a chur in eagar ansin go fíneáil tune é.
    
Is féidir le comhaid Netcdf4 bhfuil grúpaí. Féach ar [an doiciméad seo](#groups-in-gridded-nc-files) .
    
Déanann an chéad rud GenerateDatasetsXml don chineál seo tacar sonraí tar éis duit na ceisteanna a fhreagairt go bhfuil an struchtúr ncdump-mhaith ar an gcomhad samplach **roimh** tá sé unpacked. Mar sin, má théann tú cúpla freagraí goofy don chéad lúb trí GenerateDatasets Xml, ar a laghad beidh tú in ann a fheiceáil má ERDDAP™ Is féidir an comhad a léamh agus a fheiceáil cad iad na gnéithe agus na hathróga sa chomhad. Ansin is féidir leat freagraí níos fearr a thabhairt don dara lúb trí GenerateDatasetsXml.
    
###  EDDGrid Naisc go dtí suíomhanna eile{#eddgridlonpm180} 
 [ ** EDDGrid Naisc go dtí suíomhanna eile** ](#eddgridlonpm180) athraíonn luachanna faddearthachta linbh (iniata)   EDDGrid tacar sonraí go bhfuil roinnt luachanna fada níos mó ná 180 (mar shampla, 0 go 360) ionas go bhfuil siad sa raon -180 go 180 (Móide Fada nó Minus 180, mar sin, an t-ainm) .

* Soláthraíonn sé seo ar bhealach a dhéanamh tacair sonraí a bhfuil luachanna domhanfhad níos mó ná 180 comhlíontach i / le OGC web development (mar shampla, WMS freastalaí i ERDDAP ) , ós rud é go léir OGC Éilíonn seirbhísí luachanna faddearthachta laistigh -180 go 180.
* Ag obair in aice le scor de fadhbanna, beag beann ar cibé an bhfuil an scor ar fad 0 nó ar fad 180. Ligeann an cineál tacar sonraí seo duit na fadhbanna sin a sheachaint do gach duine, trí dhá leagan den tacar sonraí céanna a thairiscint:
ceann le luachanna fada sa raon 0 go 360 ("Fíorlárnach"?) ,
ceann le luachanna fada sa raon -180 go 180 ("Atlanticentric"?) .
* I gcás tacar sonraí leanaí le gach luachanna fadsaothrachta níos mó ná 180, tá gach ceann de na luachanna fadsa nua ach 360 céim níos ísle. Mar shampla, bheadh tacar sonraí le luachanna fada 180 go 240 a bheith ina tacar sonraí le luachanna faddearthachta de -180 go -120.
* Maidir le tacair sonraí linbh a bhfuil luachanna fada acu don domhan ar fad (garbh 0 go 360) , beidh an luach nua domhanfhad a athshocrú a bheith (garbh) -180 go 180:
Tá an bunaidh 0 go beagnach 180 luachanna gan athrú.
Na 180 bunaidh go 360 luachanna a thiontú go -180 go 0 agus a aistriú go dtí tús an eagar domhanfhad.
* Maidir le tacair sonraí leanaí a théann trasna 180 ach nach gclúdaíonn siad na cruinne, ERDDAP™ cuir isteach luachanna ar iarraidh mar is gá chun tacar sonraí a chlúdaíonn na cruinne a dhéanamh. Mar shampla, bheadh tacar sonraí linbh le luachanna fada de 140 go 200 a bheith ina tacar sonraí le luachanna fada de -180 go 180.
Bheadh luachanna linbh 180 go 200 -180 go -160.
Chuirfí luachanna nua le fada ó -160 go 140. Beidh na luachanna sonraí comhfhreagracha \\_FillValues.
Bheadh luachanna leanbh 140 go beagnach 180 gan athrú.
Is féidir leis an chur isteach na luachanna ar iarraidh cosúil corr, ach seachnaíonn sé roinnt fadhbanna a eascraíonn as a bhfuil luachanna fada a léim go tobann (e.g, ó -160 go 140) .
* I [Socraigh mar teanga réamhshocraithe](#generatedatasetsxml) , tá "cineál tacar sonraí speisialta", EDDGrid LonPM180FromErddapCatalog, a ligeann duit a ghiniúint an datasets.xml le haghaidh EDDGrid LonPM180 tacar sonraí ó gach ceann de na EDDGrid datasets i ERDDAP go bhfuil aon luachanna domhanfhad níos mó ná 180. Éascaíonn sé seo dhá leagan de na tacair sonraí seo a thairiscint:
an bunaidh, le luachanna fada sa raon 0 go 360,
agus an tacar sonraí nua, le luachanna fada sa raon -180 go 180.
    
Sonraí an linbh laistigh de gach EDDGrid Beidh LonPM180 tacar sonraí a bheith EDDGrid Ó tacar sonraí Erddap a pointí leis an tacar sonraí bunaidh.
An tacar sonraí nua datasetID beidh ainm an tacar sonraí bunaidh móide "\\_LonPM180".
Mar shampla,
```
    <dataset type="EDDGridLonPM180" datasetID="erdMBsstdmday\\_LonPM180" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_LonPM180Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=120.0 maxLon=320.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Cuir an EDDGrid LonPM180 tacar sonraí **thíos:** an tacar sonraí bunaidh i datasets.xml . Go seachnaíonn roinnt fadhbanna féideartha.
    
Nó, is féidir leat ionad an EDDGrid AsErddap leanbh tacar sonraí leis an tacar sonraí bunaidh datasets.xml . Ansin, ní bheidh ach leagan amháin den tacar sonraí: an ceann a bhfuil luachanna fada laistigh -180 go 180. Molaimid seo toisc go bhfuil amanna nuair a bhíonn gach leagan den tacar sonraí níos áisiúla.
    
* Má thugann tú dhá leagan de tacar sonraí, mar shampla, ceann le fada 0 go 360 agus ceann le fada -180 go 180:
    * Is féidir leat an roghnach a úsáid [&lt;ar fáil Bhí an t-eolas úsáideach WMS cliceáil grianghraf a mhéadú&lt;Seirbhís do Chustaiméirí Bhí an t-eolas úsáideach WMS ú (Tuilleadh roghanna...) leis an tacar sonraí 0-360 a disable forneartach an WMS seirbhís don tacar sonraí. Ansin, ní bheidh ach an leagan LonPM180 den tacar sonraí inrochtana trí WMS .
    * Tá cúpla bealach ann chun sonraí LonPM180 a choimeád cothrom le dáta le hathruithe ar an tacar sonraí bunúsacha:
        * Má tá an tacar sonraí linbh EDDGrid Ó tacar sonraí Erddap go tagairtí tacar sonraí sa chéanna ERDDAP™ , déanfaidh an tacar sonraí LonPM180 iarracht liostáil go díreach leis an tacar sonraí bunúsacha ionas go mbeidh sé i gcónaí cothrom le dáta. Níl síntiúis dhíreacha a ghiniúint ríomhphoist ag iarraidh ort an síntiús a bhailíochtú - ba chóir bailíochtú a dhéanamh go huathoibríoch.
        * Mura bhfuil an tacar sonraí linbh EDDGrid Ó tacar sonraí Erddap atá ar an gcéanna ERDDAP™ , déanfaidh an tacar sonraí LonPM180 iarracht an córas síntiús rialta a úsáid chun síntiús a íoc leis an tacar sonraí bunúsacha. Má tá tú ar an gcóras síntiús i do ERDDAP™ iompú ar, ba chóir duit a fháil ríomhphoist ag iarraidh ort a bhailíochtú an síntiús. Déan amhlaidh.
        * Má tá tú ar an gcóras síntiús i do ERDDAP™ iompú amach, d'fhéadfadh an tacar sonraí LonPM180 bheith meiteashonraí as dáta uaireanta go dtí go bhfuil an tacar sonraí LonPM180 athluchtaithe. Mar sin, má tá an córas síntiús iompaithe amach, ba chóir duit a leagtar ar an [&lt;reload Gach Neamhghnách (#reloadeverynminutes) leagan síos an tacar sonraí LonPM180 le líon níos lú, ionas go mbeidh sé níos mó seans ann athruithe a ghabháil leis an tacar sonraí linbh níos luaithe.

* I gcás tacar sonraí le fadfhad uasta × 360, bain úsáid as an chumraíocht roghnach seo a leanas a shocrú ar an luach uasta agus beidh an tacar sonraí a cheartú go -180 go 180.
```
    <maxSourceLon>540</maxSourceLon>
```

####  EDDGrid LonPM180 creatlach XML{#eddgridlonpm180-skeleton-xml} 

>&nbsp;&nbsp;&lt;dataset type="EDDGridLonPM180" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid Seirbhís do Chustaiméirí{#eddgridlon0360} 
 [ ** EDDGrid Seirbhís do Chustaiméirí** ](#eddgridlon0360) athraíonn luachanna faddearthachta linbh (iniata)   EDDGrid tacar sonraí go bhfuil roinnt luachanna fada níos lú ná 0 (mar shampla, -180 go 180) ionas go bhfuil siad sa raon 0 go 360 (mar sin, an t-ainm) .

* Ag obair in aice le scor de fadhbanna, beag beann ar cibé an bhfuil an scor ar fad 0 nó ar fad 180. Ligeann an cineál tacar sonraí seo duit na fadhbanna sin a sheachaint do gach duine, trí dhá leagan den tacar sonraí céanna a thairiscint:
ceann le luachanna fada sa raon -180 go 180 ("Atlanticentric"?) .
ceann le luachanna fada sa raon 0 go 360 ("Fíorlárnach"?) ,
* I gcás tacair sonraí leanaí le gach luachanna fadsaothrachta níos lú ná 0, tá gach ceann de na luachanna nua fadsaol go simplí 360 céim níos airde. Mar shampla, bheadh tacar sonraí le luachanna fada de -180 go -120 a bheith ina tacar sonraí le luachanna fada de 180 go 240.
* Maidir le tacair sonraí linbh a bhfuil luachanna fada acu don domhan ar fad (garbh -180 go 180) , beidh an luach nua domhanfhad a athshocrú a bheith (garbh) 0 go 360:
An -180 bunaidh go 0 luachanna a thiontú go 180 go 360 agus a aistriú go dtí deireadh an eagar domhanfhad.
Tá an bunaidh 0 go beagnach 180 luachanna gan athrú.
* I gcás tacar sonraí leanbh a réimse lon = 0 ach nach bhfuil a chlúdach an domhain, ERDDAP™ cuir isteach luachanna ar iarraidh mar is gá chun tacar sonraí a chlúdaíonn na cruinne a dhéanamh. Mar shampla, bheadh tacar sonraí linbh le luachanna fadsa de -40 go 20 ina tacar sonraí le luachanna fadsa de 0 go 360.
Bheadh na luachanna leanbh de 0 go 20 gan athrú.
Chuirfí luachanna nua le fada ó 20 go 320. Beidh na luachanna sonraí comhfhreagracha \\_FillValues.
Bheadh na luachanna leanbh de -40 go 0 a bheith 320 go 360.
Is féidir leis an chur isteach na luachanna ar iarraidh cosúil corr, ach seachnaíonn sé roinnt fadhbanna a eascraíonn as a bhfuil luachanna fada a léim go tobann (e.g. ó 20 go 320) .
* I [Socraigh mar teanga réamhshocraithe](#generatedatasetsxml) , tá "cineál tacar sonraí speisialta", EDDGrid Déan teagmháil linn ErddapCatalog, a ligeann duit a ghiniúint an datasets.xml le haghaidh EDDGrid Lon0360 tacar sonraí ó gach ceann de na EDDGrid datasets i ERDDAP go bhfuil aon luachanna domhanfhad níos mó ná 180. Éascaíonn sé seo dhá leagan de na tacair sonraí seo a thairiscint:
an bunaidh, le luachanna fada sa raon 0 go 360,
agus an tacar sonraí nua, le luachanna fada sa raon -180 go 180.
    
Sonraí an linbh laistigh de gach EDDGrid Beidh Lon0360 tacar sonraí a bheith EDDGrid Ó tacar sonraí Erddap a pointí leis an tacar sonraí bunaidh.
An tacar sonraí nua datasetID a bheidh mar ainm an tacar sonraí bunaidh móide "\\_Lon0360".
Mar shampla,
```
    <dataset type="EDDGridLon0360" datasetID="erdMBsstdmday\\_Lon0360" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_Lon0360Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=-40.0 maxLon=20.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Cuir an EDDGrid Lon0360 tacar sonraí **thíos:** an tacar sonraí bunaidh i datasets.xml . Go seachnaíonn roinnt fadhbanna féideartha.
    
Nó, is féidir leat ionad an EDDGrid AsErddap leanbh tacar sonraí leis an tacar sonraí bunaidh datasets.xml . Ansin, ní bheidh ach leagan amháin den tacar sonraí: an ceann a bhfuil luachanna fada laistigh de 0 go 360. Molaimid seo toisc go bhfuil amanna nuair a bhíonn gach leagan den tacar sonraí níos áisiúla.
    
* Má thugann tú dhá leagan de tacar sonraí, mar shampla, ceann le fada 0 go 360 agus ceann le fada -180 go 180:
    * Is féidir leat an roghnach a úsáid [&lt;ar fáil Bhí an t-eolas úsáideach WMS cliceáil grianghraf a mhéadú&lt;Seirbhís do Chustaiméirí Bhí an t-eolas úsáideach WMS ú (Tuilleadh roghanna...) leis an 0 go 360 tacar sonraí a disable forneartach an WMS seirbhís don tacar sonraí. Ansin, ní bheidh ach an leagan -180 go 180 den tacar sonraí inrochtana trí WMS .
    * Tá cúpla bealach ann chun an tacar sonraí Lon0360 a choinneáil cothrom le dáta le hathruithe ar an tacar sonraí bunúsacha:
        * Má tá an tacar sonraí linbh EDDGrid Ó tacar sonraí Erddap go tagairtí tacar sonraí sa chéanna ERDDAP™ , déanfaidh an tacar sonraí Lon0360 iarracht síntiús a íoc go díreach leis an tacar sonraí bunúsacha ionas go mbeidh sé i gcónaí cothrom le dáta. Níl síntiúis dhíreacha a ghiniúint ríomhphoist ag iarraidh ort an síntiús a bhailíochtú - ba chóir bailíochtú a dhéanamh go huathoibríoch.
        * Mura bhfuil an tacar sonraí linbh EDDGrid Ó tacar sonraí Erddap atá ar an gcéanna ERDDAP™ , déanfaidh an tacar sonraí Lon0360 iarracht an córas síntiús rialta a úsáid chun síntiús a íoc leis an tacar sonraí bunúsacha. Má tá tú ar an gcóras síntiús i do ERDDAP™ iompú ar, ba chóir duit a fháil ríomhphoist ag iarraidh ort a bhailíochtú an síntiús. Déan amhlaidh.
        * Má tá tú ar an gcóras síntiús i do ERDDAP™ iompú amach, d'fhéadfadh an tacar sonraí Lon0360 bheith meiteashonraí as dáta uaireanta go dtí go bhfuil an tacar sonraí Lon0360 athluchtaithe. Mar sin, má tá an córas síntiús iompaithe amach, ba chóir duit a leagtar ar an [&lt;reload Gach Neamhghnách (#reloadeverynminutes) leagan síos an tacar sonraí Lon0360 go dtí líon níos lú, ionas go mbeidh sé níos mó seans ann athruithe a ghabháil leis an tacar sonraí linbh níos luaithe.
####  EDDGrid creatlach Lon0360 XML{#eddgridlon0360-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridLon0360" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid SideBySide{#eddgridsidebyside} 
 [ ** EDDGrid SideBySide** ](#eddgridsidebyside) dhá chomhiomlán nó níos mó EDDGrid web development (na páistí) taobh le taobh.

* Tá an tacar sonraí mar thoradh ar fad de na hathróga ó gach ceann de na datasets leanbh.
* An tacar sonraí tuismitheoir agus gach tacar sonraí leanbh MUST bhfuil éagsúla datasetID s. Má tá aon ainmneacha i dteaghlach díreach mar an gcéanna, beidh an tacar sonraí theipeann a luchtú (leis an teachtaireacht earráide nach bhfuil luachanna na haise comhiomlánaithe in ord sórtáilte) .
* Tá na luachanna foinse chéanna ag gach leanbh MUST le haghaidh axisVariable s s \\[ 1+ \\]   (mar shampla, domhanleithead, domhanfhad) . Déantar cruinneas na tástála a chinneadh de réir [Déan teagmháil anois](#matchaxisndigits) .
* D'fhéadfadh go mbeadh luachanna éagsúla foinse ag na páistí axisVariable s s \\[ 0 0 \\]   (mar shampla, am) , ach tá siad de ghnáth den chuid is mó mar an gcéanna.
* Beidh an tacar sonraí tuismitheoir le feiceáil go bhfuil gach ceann de na axisVariable s s \\[ 0 0 \\] luachanna foinse ó gach ceann de na páistí.
* Mar shampla, ligeann sé seo leat le chéile tacar sonraí foinse le veicteoir u-chomhpháirt agus tacar sonraí foinse eile le veicteoir v-chomhpháirt, mar sin is féidir na sonraí le chéile a sheirbheáil.
* Leanaí cruthaithe ag an modh seo ar siúl go príobháideach. Níl tacair shonraí inrochtana ar leithligh iontu (mar shampla, ag iarratais sonraí cliant nó ag [comhaid bratacha](/docs/server-admin/additional-information#flag) ) .
* Tagann na meiteashonraí agus na socruithe domhanda don tuismitheoir ó na meiteashonraí agus na socruithe domhanda don chéad leanbh.
* Má tá eisceacht ann agus an chéad leanbh á chruthú, ní chruthófar an tuismitheoir.
* Má tá eisceacht agus leanaí eile á gcruthú, seol ríomhphost chuig emailEverythingTo (mar a shonraítear in [crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml) ) agus leanann sé leis na páistí eile.
####  EDDGrid creatlach Taobh XML{#eddgridsidebyside-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridSideBySide" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 2 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid Toise Comhiomlánaithe{#eddgridaggregateexistingdimension} 
 [ ** EDDGrid Toise Comhiomlánaithe** ](#eddgridaggregateexistingdimension) dhá chomhiomlán nó níos mó EDDGrid datasets gach ceann acu raon éagsúla de luachanna don chéad ghné, ach luachanna comhionann do na gnéithe eile.

* Mar shampla, d'fhéadfadh go mbeadh 366 luachanna ag tacar sonraí linbh amháin (do 2004) don ghné ama agus d'fhéadfadh leanbh eile luachanna 365 (do 2005) don ghné ama.
* Gach na luachanna do gach ceann de na gnéithe eile (mar shampla, domhanleithead, domhanfhad) MUST a bheith comhionann do gach ceann de na páistí. Déantar cruinneas na tástála a chinneadh de réir [Déan teagmháil anois](#matchaxisndigits) .
* Luachanna Toise Sórtáilte - Na luachanna do gach MUST gné a bheith in ord sórtáilte (dul suas nó íslitheach) . Is féidir na luachanna a bheith spásáilte neamhrialta. Ní féidir a bheith aon ceangail. Níl an Tweet seo ar fáil [CF meiteashonraí caighdeánach](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Más rud é nach bhfuil aon ghné luachanna in ord sórtáilte, ní bheidh an tacar sonraí a luchtú agus ERDDAP™ a aithint an chéad luach unsorted sa chomhad logáil, *Treoir do Thuismitheoirí* / logs / log.txt .
    
luachanna gné unsorted fios beagnach i gcónaí fadhb leis an tacar sonraí foinse. Tarlaíonn sé seo is coitianta nuair a bhíonn comhad misnamed nó mí-oiriúnach san áireamh sa chomhiomlánú, rud a fhágann gné am unsorted. Chun an fhadhb seo a réiteach, féach ar an teachtaireacht earráide sa ERDDAP™ log.txt comhad a aimsiú ar an luach am a chiontaíonn. Ansin breathnú ar na comhaid foinse a aimsiú ar an gcomhad comhfhreagrach (nó ceann acu roimh nó tar éis) nach mbaineann sa chomhiomlánú.
    
* Tá an tacar sonraí tuismitheoir agus an MUST tacar sonraí linbh difriúil datasetID s. Má tá aon ainmneacha i dteaghlach díreach mar an gcéanna, beidh an tacar sonraí theipeann a luchtú (leis an teachtaireacht earráide nach bhfuil luachanna na haise comhiomlánaithe in ord sórtáilte) .
* Faoi láthair, is é an tacar sonraí linbh MUST EDDGrid ÓDap tacar sonraí agus MUST bhfuil na luachanna is ísle den ghné comhiomlánaithe (de ghnáth na luachanna ama is sine) . Gach ceann de na páistí eile MUST a bheith beagnach tacar sonraí comhionann (difriúil díreach i na luachanna don chéad ghné) agus tá siad sonraithe ag díreach a n- sourceUrl .
* Faigheann an tacar sonraí comhiomlán a meiteashonraí ón gcéad leanbh.
* An bhfuil [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) Is féidir a dhéanamh dréacht garbh de na datasets.xml le haghaidh EDDGrid Comhiomlán Toise bunaithe ar shraith de chomhaid a sheirbheáil ag Hyrax nó freastalaí THREDDS. Mar shampla, bain úsáid as an ionchur don chlár (an "/1988" i URL a dhéanann an sampla a reáchtáil níos tapúla) :
    ```
      EDDType? EDDGridAggregateExistingDimension  
      Server type (hyrax, thredds, or dodsindex)? hyrax  
      Parent URL (for example, for hyrax, ending in "contents.html";  
        for thredds, ending in "catalog.xml")  
      ? https://opendap.jpl.nasa.gov/opendap/ocean\\_wind/ccmp/L3.5a/data/  
        flk/1988/contents.html  
      File name regex (for example, ".\\*\\.nc")? month.\\*flk\\.nc\\.gz  
      ReloadEveryNMinutes (for example, 10080)? 10080  
    ```
Is féidir leat úsáid a bhaint as an toradh&lt; sourceUrl × clibeanna nó iad a scriosadh agus uncomment an&lt; sourceUrl ^ chlib (ionas go bhfuil comhaid nua faoi deara gach uair a bhfuil an tacar sonraí a athlódáil.
####  EDDGrid Cnámharlach Dearcadh Comhiomlánú XML{#eddgridaggregateexistingdimension-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridAggregateExistingDimension" [datasetID](#datasetid)\\="..."  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- This is a regular [EDDGridFromDap](#eddgridfromdap) dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description child with the lowest values for the aggregated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl> &lt;!-- 0 or many; the sourceUrls for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;other children.  These children must be listed in order of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrls serverType="..." regex="..." recursive="true"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[pathRegex](#pathregex)\\=".\\*"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>https://*someServer/someDirectory/someSubdirectory*/catalog.xml&lt;/sourceUrls>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1. This specifies how to find the other children,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instead of using separate sourceUrl tags for each child.  The  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advantage of this is: new children will be detected each time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the dataset is reloaded. The serverType must be "thredds",  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hyrax", or "dodsindex". 
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) (regex)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) is .\\*\\.nc  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursive can be "true" or "false".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Only directory names which match the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(default=".\\*") will be accepted.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A thredds catalogUrl MUST include "/thredds/catalog/".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a thredds catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chla/catalog.xml](https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a hyrax catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flk/1988/contents.html](https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/1988/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a dodsindex URL is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Note the "OPeNDAP logo at the top of the page.)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When these children are sorted by filename, they must be in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order of ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid Cóip Uaireadóirí Cóip{#eddgridcopy} 
 [ ** EDDGrid Cóip Uaireadóirí Cóip** ](#eddgridcopy) cóip áitiúil eile a dhéanamh agus a chothabháil EDDGrid 's sonraí agus feidhmíonn sé sonraí ón gcóip áitiúil.

*    EDDGrid Cóip Uaireadóirí Cóip (agus le haghaidh sonraí tabular, [EDDTableCopy](#eddtablecopy) ) Is an-éasca le húsáid agus an-éifeachtach
     **réiteach ar roinnt de na fadhbanna is mó le sonraí a sheirbheáil ó fhoinse sonraí iargúlta:** 
    * Is féidir sonraí a rochtain ó fhoinse sonraí iargúlta a bheith mall.
        * D'fhéadfadh sé a bheith mall toisc go bhfuil sé go bunúsach mall (mar shampla, cineál mí-éifeachtach freastalaí) ,
        * toisc go bhfuil sé faoi léigear ag iarratais an iomarca,
        * nó toisc go bhfuil do fhreastalaí nó an freastalaí iargúlta bandaleithead teoranta.
    * Níl an tacar sonraí iargúlta ar fáil uaireanta (arís, ar chúiseanna éagsúla) .
    * Ní Ag brath ar fhoinse amháin do na sonraí scála maith (mar shampla, nuair a úsáideoirí go leor agus go leor ERDDAP úsáid a bhaint as é) .
         
* Conas a Oibríonn sé -- EDDGrid Cóip réitíonn na fadhbanna seo trí chóip áitiúil de na sonraí a dhéanamh agus a chothabháil go huathoibríoch agus sonraí a sheirbheáil ón gcóip áitiúil. ERDDAP™ Is féidir le sonraí a sheirbheáil ón gcóip áitiúil go han-tapa. Agus ag déanamh cóip áitiúil faoiseamh an t-ualach ar an bhfreastalaí iargúlta. Agus is é an chóip áitiúil cúltaca de na bunaidh, atá úsáideach i gcás a tharlaíonn rud éigin ar an bunaidh.
    
Níl aon rud nua faoi chóip áitiúil de thacar sonraí a dhéanamh. Cad atá nua anseo ná go ndéanann an rang seo é\\*éasca\\*a chruthú agus\\*a choimeád ar bun\\*cóip áitiúil de shonraí ó\\*éagsúlacht\\*cineálacha foinsí sonraí iargúlta agus\\*cuir meiteashonraí\\*agus na sonraí a chóipeáil.
    
* Chunks Sonraí -- EDDGrid Déanann Cóip an chóip áitiúil de na sonraí trí smután sonraí a iarraidh ón iargúlta&lt;tacar sonraí . Beidh smután ann do gach luach den chlé (chéad chéad uair) ais athróg. EDDGrid Ní Cóip ag brath ar an tacar sonraí iargúlta uimhreacha innéacs don ais - d'fhéadfadh iad siúd a athrú.
    
WARNING: Má tá an méid smután sonraí chomh mór (ú 2GB) go bhfuil sé cúiseanna fadhbanna, EDDGrid Ní féidir cóip a úsáid. (Tá brón orainn, tá súil againn go mbeidh réiteach ar an bhfadhb seo sa todhchaí.) 
    
*    \\[ Rogha eile EDDGrid Cóipeáil - Fuaimniú
Má tá na sonraí iargúlta ar fáil trí chomhaid in-íoslódáilte, ní seirbhís gréasáin, úsáid [taisce taisce taisce As Url rogha EDDGrid Seirbhís do Chustaiméirí](#cachefromurl) , a dhéanann cóip áitiúil de na comhaid iargúlta agus feidhmíonn na sonraí ó na comhaid áitiúla. \\] 
* Comhaid Áitiúla -- Déantar gach smután sonraí a stóráil i leith NetCDF comhad i subdirectory de *Treoir do Thuismitheoirí* Seirbhís do Chustaiméirí * datasetID * / Baile (mar a shonraítear in [crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml) ) . Filenames cruthaíodh ó luachanna ais a mhodhnú chun iad a comhad-ainm-sábháilte (mar shampla, cuirtear "x2D" in ionad hyphens) - ní dhéanann sé seo difear do na sonraí iarbhír.
     
* irl - Library Service -- Gach uair EDDGrid Tá Cóip athluchtaithe, seiceálacha sé an iargúlta&lt;tacar sonraí a fheiceáil cad iad na smutáin atá ar fáil. Más rud é nach bhfuil an comhad le haghaidh smután sonraí ann cheana féin, iarratas a fháil ar an smután a leanas le scuaine. ERDDAP 's tasc Trí phróisis go léir na hiarratais scuaine do smután sonraí, aon-ar-aon. Is féidir leat staitisticí a fheiceáil do ghníomhaíocht an tascThread ar an [Leathanach Baile](/docs/server-admin/additional-information#status-page) agus sa [An Tuairisc Laethúil](/docs/server-admin/additional-information#daily-report) . (Sea, ERDDAP™ D'fhéadfadh tascanna éagsúla a shannadh don phróiseas seo, ach bheadh a úsáid suas go leor de na foinse sonraí iargúlta bandaleithead, cuimhne, agus am LAP, agus go leor de na áitiúil ERDDAP 's bandaleithead, cuimhne, agus am LAP, nach bhfuil smaoineamh maith.) 
    
NÓTA: An chéad uair an EDDGrid Tá Cóip luchtaithe, (má théann gach maith) Beidh go leor de na hiarratais ar smután sonraí a chur leis an scuaine tascThread ar, ach ní bheidh aon comhaid sonraí áitiúla a cruthaíodh. Mar sin, beidh an tógálaí theipeann ach beidh tascThread ar aghaidh ag obair agus a chruthú comhaid áitiúla. Má théann gach duine go maith, beidh an tascTrí dhéanamh ar roinnt comhaid sonraí áitiúla agus an chéad iarracht eile a athlódáil an tacar sonraí (i ~ 15 nóiméad) éireoidh leis, ach ar dtús le méid an-teoranta sonraí.
    
NÓTA: Tar éis an tacar sonraí áitiúil tá roinnt sonraí agus is cosúil i do ERDDAP , má tá an tacar sonraí iargúlta inrochtana go sealadach nó go buan, beidh an tacar sonraí áitiúil ag obair go fóill.
    
WARNING: Má tá an tacar sonraí iargúlta mór agus / nó go bhfuil an freastalaí iargúlta mall (go bhfuil an fhadhb, nach bhfuil sé?&#33;) , beidh sé i bhfad a dhéanamh cóip áitiúil iomlán. I gcásanna áirithe, beidh an t-am is gá do-ghlactha. Mar shampla, tarchur 1 TB sonraí thar líne T1 (0.15 / GB) Tógann ar a laghad 60 lá, faoi choinníollacha is fearr is féidir. Plus, úsáideann sé go leor de bandaleithead, cuimhne, agus am LAP ar na ríomhairí iargúlta agus áitiúla. Is é an réiteach a phost a thiomáint crua chuig an riarthóir an tacar sonraí iargúlta ionas gur féidir s / sé a dhéanamh cóip den tacar sonraí agus an feachtas crua ar ais chugat. Bain úsáid as na sonraí sin mar phointe tosaigh agus EDDGrid Cuirfidh cóip sonraí leis. (Is é sin bealach amháin go [Seirbhís Cloud EC2 Amazon](https://aws.amazon.com/importexport/) Láimhseálann an fhadhb, cé go bhfuil a gcóras go leor de bandaleithead.) 
    
WARNING: Má tá luach áirithe do na leftmost (chéad chéad uair) imíonn ais athróg ón tacar sonraí iargúlta, EDDGrid Cóipeáil NACH scriosadh an comhad a chóipeáil áitiúil. Más mian leat, is féidir leat é féin a scriosadh.
    
#### Seirbhís do Chustaiméirí Sonraí Teagmhála{#grid-copy-checksourcedata} 
An bhfuil datasets.xml Is féidir le haghaidh an tacar sonraí a bheith tag roghnach
```
    <checkSourceData>true</checkSourceData>  
```
Tá an luach réamhshocraithe fíor. Má / nuair a leagtar tú é a bréagach, ní bheidh an tacar sonraí a sheiceáil riamh an tacar sonraí foinse a fheiceáil má tá sonraí breise ar fáil.

#### ach amháin{#onlysince} 
Is féidir leat insint EDDGrid Cóip a dhéanamh cóip de fo-thacar den tacar sonraí foinse, in ionad an tacar sonraí foinse ar fad, trí chur le tag san fhoirm&lt;ach amháin *roinnt roinnt Luach* &lt;/ go dtí an tacar sonraí datasets.xml chunk. EDDGrid Beidh Cóip íoslódáil ach luachanna sonraí a bhaineann le luachanna an chéad ghné (de ghnáth an ghné ama) atá níos mó ná *roinnt roinnt Luach* . *roinnt roinnt Luach* a bheith:
    * Am coibhneasta sonraithe trí now-  *Níl sé seo* .
Mar shampla,&lt;ach amháin now- 2years&lt;/ amháin insíonn Since ^ an tacar sonraí a dhéanamh ach cóipeanna áitiúla de na sonraí le haghaidh sonraí i gcás luachanna an ghné seachtrach (luachanna ama de ghnáth) laistigh de 2 bhliain anuas (a ath-imghabháil gach uair a dhéantar an tacar sonraí a athlódáil, agus nuair a fhéachann sé le sonraí nua a chóipeáil) . Féach an [ now-  *Níl sé seo* cur síos achomair](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) . Tá sé seo úsáideach má tá an chéad ghné sonraí ama, a dhéanann sé de ghnáth.
        
         EDDGrid Ní Cóip scriosadh comhaid sonraí áitiúla a bhfuil sonraí a thagann, le himeacht ama, níos sine ná now-  *Níl sé seo* . Is féidir leat a scriosadh na comhaid am ar bith má roghnaíonn tú a. Má dhéanann tú, molaimid go láidir go leag tú [bratach bratach](/docs/server-admin/additional-information#flag) tar éis duit a scriosadh na comhaid a insint EDDGrid Cóip a thabhairt cothrom le dáta an liosta de na comhaid i dtaisce.
        
    * Pointe seasta in am sonraithe mar teaghrán ISO 8601 yyyy-MM-ddTHH:mm:ssZ .
Mar shampla,&lt;cliceáil grianghraf a mhéadú&lt;/onlySince × Insíonn an tacar sonraí ach amháin chun cóipeanna áitiúla de na sonraí a dhéanamh i gcás ina bhfuil luach an chéad gné \\ × = 2000-01-01T00:00:00Z . Tá sé seo úsáideach má tá an chéad ghné sonraí ama, a dhéanann sé de ghnáth.
         
    * Uimhir phointe snámh.
Mar shampla,&lt;cliceáil grianghraf a mhéadú&lt;/ amháin Since . Is iad na haonaid an ceann scríbe aonaid den chéad ghné. Mar shampla, le haghaidh toisí ama, na haonaid i ERDDAP™ go bhfuil i gcónaí "seconds since 1970-01-01T00:00:00Z" . Níl an Tweet seo ar fáil "seconds since 1970-01-01T00:00:00Z" Is ionann é agus 2000-01-01T00:00:00Z. Is rogha úsáideach é seo i gcónaí, ach tá sé úsáideach go háirithe nuair nach bhfuil sonraí ama ag an gcéad ghné.

####  EDDGrid Cóip úsáid Molta{#eddgridcopy-recomended-use} 
1. taiseachas aeir: fliuch&lt;tacar sonraí foirm iontrála (an cineál dúchais, ní EDDGrid Cóip Uaireadóirí Cóip) don fhoinse sonraí iargúlta.
     **Faigh sé ag obair i gceart, lena n-áirítear gach ceann de na meiteashonraí atá ag teastáil.** 
2. Má tá sé ró-mhall, cuir cód XML chun é a fhilleadh i EDDGrid Cóip tacar sonraí.
    * Úsáid difriúil datasetID   (b'fhéidir ag athrú ar an datasetID de na sean datasetID beagán) .
    * Cóip an&lt;ar fáil Chun na críche sin,&lt;reloadEveryNMinutes bhéil agus&lt;onChange amach as an iargúlta EDDGrid 's XML go dtí an EDDGrid Cóipeáil XML. (A luachanna do EDDGrid Ábhar Cóip; a luachanna don tacar sonraí istigh a bheith neamhábhartha.) 
3.   ERDDAP™ cóip áitiúil de na sonraí a dhéanamh agus a chothabháil.
         
* RABHADH: EDDGrid Glacann Cóip nach bhfuil na luachanna sonraí do gach smután athrú riamh. Má / nuair a dhéanann siad, ní mór duit a scriosadh de láimh na comhaid smután i *Treoir do Thuismitheoirí* Seirbhís do Chustaiméirí * datasetID * / a athrú agus [bratach bratach](/docs/server-admin/additional-information#flag) an tacar sonraí a athlódáil ionas go gcuirfear na smutáin a scriosadh in ionad. Má tá síntiús ríomhphoist agat leis an tacar sonraí, gheobhaidh tú dhá ríomhphost: ceann nuair a athluchtaíonn an tacar sonraí den chéad uair agus tosaíonn sé na sonraí a chóipeáil, agus ceann eile nuair a bhíonn na hualaí tacar sonraí arís (go huathoibríoch) agus a bhraitheann na comhaid sonraí áitiúla nua.
     
* Ní mór gach luachanna ais a bheith comhionann.
I gcás gach ceann de na haiseanna ach amháin na leftmost (chéad chéad uair) , ní mór gach ceann de na luachanna a bheith comhionann do gach leanbh. Déantar cruinneas na tástála a chinneadh de réir [Déan teagmháil anois](#matchaxisndigits) .
     
* Socruithe, Metadata, Variables -- EDDGrid Úsáidí Cóip suímh, meiteashonraí, agus athróga ó na tacar sonraí foinse faoi iamh.
     
* Athraigh Metadata -- Más gá duit athrú ar bith addAttributes nó a athrú ar an ord na n-athróg a bhaineann leis an tacar sonraí foinse:
    1. Athraigh an addAttributes don tacar sonraí foinse i datasets.xml , de réir mar is gá.
    2. Scrios ar cheann de na comhaid a chóipeáil.
    3. Socraigh a [bratach bratach](/docs/server-admin/additional-information#flag) chun an tacar sonraí a athlódáil láithreach. Má dhéanann tú úsáid a bhaint as bratach agus tá tú síntiús r-phost chuig an tacar sonraí, beidh tú a fháil dhá r-phost: ceann nuair a athluchtaíonn an tacar sonraí ar dtús agus a thosaíonn a chóipeáil na sonraí, agus ceann eile nuair a ualaí tacar sonraí arís (go huathoibríoch) agus a bhraitheann na comhaid sonraí áitiúla nua.
    4. Déanfar an comhad a scriosadh a athghiniúint leis na meiteashonraí nua. Má tá an tacar sonraí foinse ar fáil riamh, an EDDGrid Beidh Cóip tacar sonraí a fháil meiteashonraí ón gcomhad athghiniúint, ós rud é go bhfuil sé an comhad is óige.
####  EDDGrid Cóipeáil creatlach XML{#eddgridcopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#grid-copy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onlySince>](#onlysince)...&lt;/onlySince> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromCassandra{#eddtablefromcassandra} 
 [ **EDDTableFromCassandra** ](#eddtablefromcassandra) Láimhseálann sonraí ó cheann [taiseachas aeir: fliuch](https://cassandra.apache.org/) tábla. Is Cassandra bunachar sonraí NoSQL.

*    ERDDAP™ Is féidir a bheith ag obair le Cassandra v2 agus v3 gan aon athruithe nó difríochtaí i thus. Táimid tar éis tástáil le [Cassandra v2 agus v3 ó taiseachas aeir: fliuch](https://cassandra.apache.org/download/) . Is dócha go bhfuil sé ERDDAP™ Is féidir oibriú freisin le Cassandra íoslódáil ó DataStax.
     
* Do Lúnasa 2019 - Bealtaine 2021, bhí dtrioblóid againn Cassandra a bheith ag obair le AdoptOpenJdk Java v8. Chaith sé EXCEPTION\\_ACCESS\\_VIOLATION). Ach anois (Bealtaine 2021) , Tá an fhadhb sin imithe: Is féidir linn a úsáid go rathúil Cassandra v2.1.22 agus AdoptOpenJdk jdk8u292-b10.
     
#### Tábla amháin{#one-table} 
Ní Cassandra tacaíocht a thabhairt " tadhlacha" ar an mbealach a dhéanann bunachair shonraí i ndáil. a hAon ERDDAP™ Plean Gníomhaíochta don Oideachas (b'fhéidir fo-thacar de cheann) Tábla Cassandra.

#### taiseachas aeir: fliuch datasets.xml  {#cassandra-datasetsxml} 
*    ERDDAP™ thagann leis an Cassandra Java tiománaí, mar sin ní gá duit é a shuiteáil ar leithligh.
* Léigh go cúramach faisnéis uile an doiciméid seo faoi EDDTableFromCassandra. Tá cuid de na sonraí an-tábhachtach.
* An Cassandra Java Tá sé i gceist ag an tiománaí oibriú le Apache Cassandra (1.2+) agus Datastax Enterprise (3.1+) . Má tá tú ag baint úsáide as Apache Cassandra 1.2.x, ní mór duit an comhad cassandra.yaml a chur in eagar do gach nód chun tús a chur le\\_native\\_transport: fíor, ansin atosú gach nód.
* Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Is féidir leat a chur in eagar ansin go fíneáil tune sé (go háirithe [&lt;laindéal Príomh-SourceNames × (Tuilleadh eolais) ). Is féidir leat a bhailiú an chuid is mó den fhaisnéis is gá duit a chruthú ar an XML do EDDTableFromCassandra tacar sonraí trí theagmháil a dhéanamh leis an riarthóir Cassandra agus ag cuardach ar an ngréasán.
    
Sonraí a ghiniúint Tá dhá rogha speisialta ag Xml do EDDTableFromCassandra:
    
    1. Má théann tú "&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;" (gan na Sleachta) don eochairspás, Beidh an clár a thaispeáint liosta de na keyspaces
    2. Má tá tú isteach keyspace ar leith agus ansin dul isteach "&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;" (gan na Sleachta) don ainm tábla, Beidh an clár a thaispeáint liosta de na táblaí sa keyspace agus a colúin.
##### íogaireacht Cás{#case-sensitivity} 
* Keyspace Cás-íogair agus Ainmneacha Tábla -
Cassandra déileálann eochairspás agus ainmneacha tábla ar bhealach cás-íogair. Mar gheall ar seo, MUST tú riamh a úsáid focal in áirithe (ach le cás éagsúla) mar eochairspás Cassandra nó ainm tábla.
* Ainmneacha Colún Cás-íogair --
De réir réamhshocraithe, déileálann Cassandra le hainmneacha colúin ar bhealach cás-íogair. Má úsáideann tú ceann de na focail in áirithe Cassandra mar ainm colún (le do thoil nach bhfuil&#33;) , tú MUST úsáid
```
        <columnNameQuotes>"<columnNameQuotes>  
```
i datasets.xml don tacar sonraí sin go Cassandra agus ERDDAP™ déileálfaidh sé le hainmneacha an cholúin ar bhealach cás-íogair. Is dócha go mbeidh sé seo ina tinneas cinn ollmhór ar do shon, toisc go bhfuil sé deacair a chinneadh na leaganacha cás-íogair na n-ainmneacha colún - Cassandra thaispeánann beagnach i gcónaí ar na hainmneacha colún mar gach cás níos ísle, beag beann ar an gcás fíor.
* Obair go dlúth leis an riarthóir Cassandra, a d'fhéadfadh a bhfuil taithí ábhartha. Má theipeann ar an tacar sonraí a luchtú, léigh an [teachtaireacht earráide](#troubleshooting-tips) go cúramach a fháil amach cén fáth.
         
#### taiseachas aeir: fliuch&lt;nasc nasc nasc nasc Maoin agus beannacht;{#cassandra-connectionproperty} 
Cassandra Tá airíonna nasc is féidir a shonrú i datasets.xml . Beidh go leor de na tionchar ar fheidhmíocht an Cassandra- ERDDAP™ nasc. Ar an drochuair, ní mór airíonna Cassandra a shocrú programmatically i Java , mar sin ERDDAP™ ní mór cód a bheith acu do gach maoin ERDDAP™ tacaíochtaí. Faoi láthair, ERDDAP™ tacú leis na hairíonna seo:
 (Is iad na mainneachtainí a thaispeántar cad a fheicimid. D'fhéadfadh do chóras mainneachtainí a bheith difriúil.) 

*    **Roghanna Ginearálta**   
    &lt;nasc nasc nasc nasc Ainm Maoine = " **comhbhrúiteoir** " *cineál gas: in airde | Seirbhís do Chustaiméirí | taiseachas aeir: fliuch* &lt;/ nascleanúna Maoin agus maoin (cás-íogair, réamhshocraithe = aon)   
     (Comhairle comhbhrúcháin ghinearálta: bain úsáid as 'none' má tá an nasc idir Cassandra agus ERDDAP™ áitiúil/tapa agus úsáid 'LZ4' má tá an nasc iargúlta / mall.)   
    &lt;nasc nasc nasc nasc Ainm Maoine = " **Dintiúirí** " *ainm úsáideora / pasfhocal* &lt;/ nascleanúna Maoin agus maoin (go litriúil '/' )   
    &lt;nasc nasc nasc nasc Ainm Maoine = " **méadracht** " *fíor fíor | foirm duille: oval* &lt;/ nascleanúna Maoin agus maoin (Bhí 2021-01-25 réamhshocraithe = fíor, neamhaird anois agus i gcónaí bréagach)   
    &lt;nasc nasc nasc nasc Ainm Maoine = " **port port port port port** " *Toir agus Crainn* &lt;/ nascleanúna Maoin agus maoin (réamhshocraithe le haghaidh prótacal dénártha dúchais = 9042)   
    &lt;nasc nasc nasc nasc Ainm Maoine = " **Seirbhís do Chustaiméirí** " *fíor fíor | foirm duille: oval* &lt;/ nascleanúna Maoin agus maoin (réamhshocraithe = False)   
     (Mo iarracht tapa a úsáid ssl theip. Má éiríonn leat, inis dom conas a rinne tú é.) 
*    **Roghanna Ceist**   
    &lt;nasc nasc nasc nasc Ainm Maoine = " **comhsheasmhacht Leibhéal Leibhéal Leibhéal Leibhéal** " *go léir | bláthanna cumhra: aon cumhráin | gach ceann | Baile Átha Cliath | Baile Átha Cliath | local\\_serial | ceann amháin | Is maith liom é | sraithuimhir | triúr | dhá* &lt;/ nascleanúna Maoin agus maoin (cás-íogair, réamhshocraithe = ONE)   
    &lt;nasc nasc nasc nasc Ainm Maoine = " **Seirbhís do Chustaiméirí** " *Toir agus Crainn* &lt;/ nascleanúna Maoin agus maoin (réamhshocraithe = 5000)   
     (Ná leagtar fetchSize le luach níos lú.)   
    &lt;nasc nasc nasc nasc Ainm Maoine = " **SraithRéaltacht Level** " *go léir | bláthanna cumhra: aon cumhráin | gach ceann | Baile Átha Cliath | Baile Átha Cliath | local\\_serial | ceann amháin | Is maith liom é | sraithuimhir | triúr | dhá* &lt;/ nascleanúna Maoin agus maoin (cás-íogair, réamhshocraithe = SERIAL) 
*    **Roghanna Soicéad**   
    &lt;nasc nasc nasc nasc Ainm Maoine = " **nasc AmoutMillis** " *Toir agus Crainn* &lt;/ nascleanúna Maoin agus maoin (réamhshocraithe = 5000)   
     (Ná socraigh nasc TimeoutMillis le luach níos lú.)   
    &lt;nasc nasc nasc nasc Ainm Maoine = " **choinneáil beo** " *fíor fíor | foirm duille: oval* &lt;/ nascleanúna Maoin agus maoin
    &lt;nasc nasc nasc nasc Ainm Maoine = " **LéighTimeoutMillis** " *Toir agus Crainn* &lt;/ nascleanúna Maoin agus maoin
     (Is é 12000 réamhshocraithe Cassandra, ach ERDDAP™ athruithe ar an mainneachtain a 120000. Má tá Cassandra ag caitheamh readTimeouts, ní fhéadfadh sé seo cabhrú, mar gheall ar Cassandra caitheann uaireanta iad roimh an am seo. Is é an fhadhb níos dóichí go bhfuil tú ag stóráil sonraí i bhfad ró in aghaidh an laindéal teaglaim eochair.)   
    &lt;nasc nasc nasc nasc Ainm Maoine = " **fháilBuffsize** " *Toir agus Crainn* &lt;/ nascleanúna Maoin agus maoin
     (Tá sé soiléir cad é an réamhshocraithe a fháilBufferSize. Ná leagtar seo le luach beag.)   
    &lt;nasc nasc nasc nasc Ainm Maoine = " **taiseachas aeir: fliuch** " *Toir agus Crainn* &lt;/ nascleanúna Maoin agus maoin
    &lt;nasc nasc nasc nasc Ainm Maoine = " **tréimhse saoil: ilbhliantúil** " *fíor fíor | foirm duille: oval* &lt;/ nascleanúna Maoin agus maoin (Réamhshocrú) 

Más gá duit a bheith in ann a shocrú airíonna nasc eile, féach ar ár [alt ar thacaíocht bhreise a fháil](/docs/intro#support) .

Le haghaidh tosaithe ar leith de Tomcat, tá naisc a úsáidtear ach an chéad uair a tacar sonraí a cruthaíodh le haghaidh ar leith Cassandra URL. Gach reloads an tacar sonraí agus gach tacar sonraí ina dhiaidh sin a roinnt ar an URL céanna a úsáid na naisc bhunaidh.
    
#### CQL{#cql} 
An Teanga Chruinnithe Cassandra (CQL) Is superficially cosúil SQL, an teanga cheist a úsáideann bunachair shonraí traidisiúnta. Mar gheall ar OPeNDAP 's Rinneadh iarratais sonraí tabular a dhearadh chun aithris a dhéanamh ar iarratais sonraí tabular SQL, is féidir ERDDAP™ a thiontú iarratais sonraí tabular i CQL Bound / PreparedStatements. ERDDAP™ logs an ráiteas i [logáil isteach.](/docs/server-admin/additional-information#log) mar atá
ráiteas mar théacs: *Sonraí Teagmhála*   
Beidh an leagan den ráiteas a fheiceann tú a bheith ina léiriú téacs ar an ráiteas agus ní bheidh ach "? nuair a bheidh luachanna srianta a chur.
       
Ní chomh simplí -- Ar an drochuair, tá CQL go leor srianta ar a féidir colúin a chuardach le cén cineál srianta, mar shampla, Is féidir colúin eochair laindéal a srianta le = agus IN, mar sin ERDDAP™ cuireann roinnt srianta ar Cassandra agus cuireann sé gach srian i bhfeidhm tar éis na sonraí a fháil ó Cassandra. Chun cabhrú ERDDAP™ déileáil go héifeachtach le Cassandra, ní mór duit a shonrú [&lt;laindéal Príomh-SourceNames × (Tuilleadh eolais) , [&lt;braisle ColmnSourceNames × (Tuilleadh eolais) agus [&lt;innéacsColumnSourceNames × (#indexcolumnsourcenames) i datasets.xml don tacar sonraí seo. Is iad seo na bealaí is tábhachtaí chun cabhrú ERDDAP™ obair go héifeachtach le Cassandra. Más rud é nach bhfuil tú ag insint ERDDAP™ an t-eolas seo, beidh an tacar sonraí mall go pianmhar i ERDDAP™ agus tonna de acmhainní Cassandra a úsáid.
     
#### &lt;laindéal KeySourceNames &amp; rsquo; s;{#partitionkeysourcenames} 
Toisc go bhfuil ról lárnach ag eochracha laindéal i dtábla Cassandra, ERDDAP™ riachtanais a fhios a n- sourceName s agus, más ábhartha, faisnéis eile maidir le conas a bheith ag obair leo.
* NÍ MÓR duit liosta coma-scartha d'ainmneacha colúin foinse eochair a shonrú i datasets.xml via via via via&lt;laindéal KeySourceNames .
Sampla simplí,
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
Sampla níos casta,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* AmStamp Partition Keys -- Má tá ceann de na colúin eochair laindéal colún amstamp go bhfuil leagan garbh de cholún ama eile, a shonrú seo trí
     *Déan Teagmháil Linn time\\_precision *   
i gcás time\\_precision Is é ceann de na [ time\\_precision ](#time_precision) teaghráin a úsáidtear in áiteanna eile in ERDDAP .
An rian Z sa time\\_precision Is teaghrán an réamhshocraithe, mar sin ní chuireann sé ábhar más rud é an time\\_precision teaghrán chríochnaíonn i Z nó nach bhfuil.
Mar shampla, ERDDAP™ a léirmhíniú ar an dáta/sampletime/1970-01 "Is féidir snáitheanna le haghaidh dáta a thógáil ó shrianta ar shamplach trí úsáid a bhaint as seo time\\_precision ." Is é an comhshó iarbhír na srianta níos casta, ach is é sin an forbhreathnú.
     **Bain úsáid as seo nuair atá sé ábhartha.** Cumasaíonn sé ERDDAP™ a bheith ag obair go héifeachtach le Cassandra. Má tá an gaol idir colúin i dtábla Cassandra agus nach bhfuil tú ag insint ERDDAP™ , beidh an tacar sonraí a bheith painfully mall i ERDDAP™ agus tonna de acmhainní Cassandra a úsáid.
* Aonair Aonair Aonair Ceisteanna Coitianta Más mian leat ERDDAP™ tacar sonraí a bheith ag obair le luach amháin de eochair laindéal amháin, a shonrú *partitionKeysourceName = luach* .
Ná bain úsáid as Sleachta le haghaidh colún uimhriúil, mar shampla, deviceid = 1007
Ná úsáid a bhaint as Sleachta le haghaidh colún Curtain, mar shampla, stationid = "Point Pinos"
* Réamhshocrú Réamhshocrú Ordú -- An t-ordú an eochair laindéal&lt; dataVariable ú i datasets.xml a chinneann an t-ordú saghas réamhshocraithe na torthaí ó Cassandra. Ar ndóigh, is féidir le húsáideoirí ordú difriúil a iarraidh le haghaidh sraith áirithe torthaí trí cheangal agus orderBy  (" " " *liosta de na hathróga atá deighilte* " " ") go dtí deireadh a gceist.
* De réir réamhshocraithe, Cassandra agus ERDDAP™ ainmneacha colún a chóireáil ar bhealach cás-íogair. Ach má leagtar tú [colún NameQuotes](#case-sensitivity) go ", ERDDAP™ déileálfaidh sé le hainmneacha colún Cassandra ar bhealach cás-íogair.
         
#### &lt;laindéal KeyCSV &amp; gt;{#partitionkeycsv} 
Má tá sé seo sonraithe, ERDDAP™ úsáid in ionad a iarraidh Cassandra don laindéal Príomh-eolas gach uair a dhéantar an tacar sonraí a athlódáil. Soláthraíonn sé seo an liosta de na príomhluachanna laindéal ar leith, san ord beidh siad a úsáid. Ní mór Times a shonrú mar soicind ó 1970-01T00:00:00Z. Ach tá dhá bhealach malartach speisialta ann freisin chun amanna a shonrú (gach ionchódaithe mar teaghrán) :

1) am (Amharc ar gach eolas Am agus am)   (MAY a ionchódú mar teaghrán)   
2) "amanna (anISO8601StartTime, strideseconds, stopTime) " " " (MUST a ionchódú mar teaghrán)   
stad stad stad Is féidir am a bheith ina ISO8601 Am nó " now- nUnits "am (e.g., " now- 3minutes ") .
stad stad stad Ní Am a bheith ina cluiche cruinn de thús Am + x strideseconds.
A chéile le huaire () Faigheann luach leathnú isteach sraitheanna il roimh gach ceist, mar sin an liosta de dheighilt Is féidir Keys a bheith i gcónaí breá cothrom le dáta.
Mar shampla,
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
leathnú isteach sa tábla seo de chomhcheangail eochair laindéal:
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;cnuasach Colún SourceNames &amp; gt;{#clustercolumnsourcenames} 
Cassandra Glacann srianta SQL-mhaith ar cholúin bhraisle, a bhfuil na colúin a chruthaíonn an dara cuid den phríomh-eochair (tar éis an eochair laindéal (s s) ) . Mar sin, tá sé riachtanach go n-aithníonn tú na colúin seo trí&lt;cnuasachColumnSourceNames . Cumasaíonn sé seo ERDDAP™ a bheith ag obair go héifeachtach le Cassandra. Má tá colúin braisle agus nach bhfuil tú ag insint ERDDAP , beidh an tacar sonraí a bheith painfully mall i ERDDAP™ agus tonna de acmhainní Cassandra a úsáid.
    * Mar shampla,&lt;braisle ColmnSourceNames *cliceáil grianghraf a mhéadú* &lt;/ Clúdaigh Colóime Sourcenames
    * Má tá tábla Cassandra aon colúin braisle, nach bhfuil a shonrú&lt;braisleColumnSourceNames ×, nó é a shonrú gan aon luach.
    * De réir réamhshocraithe, Cassandra agus ERDDAP™ ainmneacha colún a chóireáil ar bhealach cás-íogair. Ach má leagtar tú [colún NameQuotes](#case-sensitivity) go ", ERDDAP™ déileálfaidh sé le hainmneacha colúin Cassandra ar bhealach cás-íogair.
         
#### &lt;innéacsColumnSourceNames &amp; &amp; rsquo; s;{#indexcolumnsourcenames} 
Glacann Cassandra '=' srianta ar colúin innéacs tánaisteach, a bhfuil na colúin a bhfuil tú innéacsanna a cruthaíodh go sainráite le haghaidh via
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (Sea, tá na lúibíní ag teastáil.)   
Mar sin, tá sé an-úsáideach má aithníonn tú na colúin trí&lt;innéacsColumnSourceNames . Cumasaíonn sé seo ERDDAP™ a bheith ag obair go héifeachtach le Cassandra. Má tá colúin innéacs agus nach bhfuil tú ag insint ERDDAP , beidh roinnt ceisteanna a bheith gan ghá, painfully mall i ERDDAP™ agus tonna de acmhainní Cassandra a úsáid.
* Mar shampla,&lt;innéacsColumnSourceNames × *riachtanais uisce: measartha* &lt;/ innéacsColumnSourceNames
* Má tá tábla Cassandra aon colúin innéacs, nach bhfuil a shonrú&lt;innéacsColumnSourceNames ×, nó é a shonrú gan aon luach.
* WARNING: Níl innéacsanna Cassandra cosúil le innéacsanna bunachar sonraí. Cassandra innéacsanna ach cuidiú le '=' srianta. Agus tá siad ach [molta molta](https://cassandra.apache.org/doc/latest/cql/indexes.html) do cholúin a bhfuil luachanna i bhfad níos lú ar leith ná luachanna iomlána.
* De réir réamhshocraithe, Cassandra agus ERDDAP™ ainmneacha colún a chóireáil ar bhealach cás-íogair. Ach má leagtar tú [colún NameQuotes](#case-sensitivity) go ", ERDDAP™ déileálfaidh sé le hainmneacha colúin Cassandra ar bhealach cás-íogair.
         
#### &lt;maxRequestFraction &amp; gt;{#maxrequestfraction} 
Nuair a bheidh ERDDAP™   (reo) ualaí tacar sonraí, ERDDAP™ faigheann ó Cassandra an liosta de chomhcheangail ar leith de na heochracha laindéal. I gcás tacar sonraí ollmhór, beidh líon na dteaglamaí ollmhór. Más mian leat chun cosc a chur ar iarratais úsáideoirí ó iarraidh an chuid is mó nó gach ceann de na tacar sonraí (nó fiú iarratas a iarrann ERDDAP™ an chuid is mó nó na sonraí go léir a íoslódáil chun é a scagadh tuilleadh) , is féidir leat a insint ERDDAP™ ach amháin chun iarratais a laghdú ar líon na teaglaim de mhéid éigin trí&lt;maxRequestFraction ^, a bhfuil uimhir pointe snámh idir 1e-10 (a chiallaíonn nach féidir leis an iarraidh níos mó ná 1 meascán a bheith ag teastáil i mbilliún) agus 1 (an réamhshocraithe, rud a chiallaíonn gur féidir an t-iarratas a bheith ar an tacar sonraí ar fad) .
Mar shampla, má tá 10000 teaglaim ar leith de na heochracha laindéal agus maxRequestFraction leagtha go 0.1,
ansin beidh iarrataí a bhfuil gá le sonraí ó 1001 nó níos mó teaglaim a ghiniúint teachtaireacht earráide,
ach ceadófar iarrataí a dteastaíonn sonraí uathu ó 1000 nó níos lú teaglaim.
    
Go ginearálta, an níos mó an tacar sonraí, an níos ísle ba chóir duit a shocrú&lt;maxRequestFraction . Mar sin, d'fhéadfá é a shocrú go 1 le haghaidh tacar sonraí beag, 0.1 le haghaidh tacar sonraí meánmhéide, 0.01 le haghaidh tacar sonraí mór, agus 0.0001 le haghaidh tacar sonraí ollmhór.
    
Tá an cur chuige seo i bhfad ó foirfe. Beidh sé mar thoradh ar roinnt iarrataí réasúnta a dhiúltú agus roinnt iarrataí ró-mhór a cheadú. Ach tá sé ina fhadhb deacair agus tá an réiteach seo i bhfad níos fearr ná rud ar bith.
    
#### taiseachas aeir: fliuch subsetVariables  {#cassandra-subsetvariables} 
Mar is amhlaidh le tacair sonraí EDDTable eile, is féidir leat liosta coma-scartha de&lt; dataVariable ú destinationName s i tréith domhanda ar a dtugtar " [ subsetVariables ](#subsetvariables) " chun athróga a bhfuil líon teoranta de luachanna a aithint. Beidh an tacar sonraí a bheith ansin leathanach gréasáin .subset agus liostaí de luachanna ar leith a thaispeáint do na hathróga i liostaí anuas ar leathanaigh ghréasáin go leor.
    
Lena n-áirítear ach laindéal athróg eochair agus colúin statach ar an liosta STRONGLY E NCO URAGED. Beidh Cassandra in ann an liosta de chomhcheangail ar leith a ghiniúint go han-tapa agus go héasca gach uair a athluchtaítear an tacar sonraí. Is eisceacht amháin eochracha laindéal ama go bhfuil leaganacha garbh de roinnt colún ama eile - is dócha is fearr a fhágáil ar an liosta de na subsetVariables ós rud é go bhfuil líon mór de luachanna agus nach bhfuil siad an-úsáideach d'úsáideoirí.
    
Má tá tú san áireamh eochair neamh-rannpháirteach, athróg neamh-statach sa liosta, beidh sé dócha a bheith **an-** ríomhaireachtúil costasach do Cassandra gach uair go bhfuil an tacar sonraí athluchtaithe, mar gheall ar ERDDAP™ Tá chun breathnú trí gach sraith de na tacar sonraí a ghiniúint an t-eolas. Go deimhin, is dócha go dteipeann ar an gceist. Mar sin, ach amháin le haghaidh tacair sonraí an-bheag, is é seo STRONGLY DISCOURAGED.
    
#### cliceáil grianghraf a mhéadú{#cassandra-datatypes} 
Toisc go bhfuil roinnt athbhrí faoi a [Cineálacha sonraí Cassandra](https://cassandra.apache.org/doc/latest/cql/types.html) léarscáil a ERDDAP™ cineálacha sonraí, ní mór duit a shonrú [&lt;dataType ×) (#cineál) tag do gach [&lt; dataVariable ú (#datavariable) a insint ERDDAP™ cé na sonraí a úsáid. An caighdeán ERDDAP™ data recovery Cineálacha (agus na cineálacha sonraí is coitianta Cassandra comhfhreagrach) Tá:
    
*    [riachtanais uisce: measartha](#boolean-data)   (riachtanais uisce: measartha) a, ERDDAP™ ansin siopaí mar bytes
* byte (int, má tá an raon -128 go 127) 
* gearr gearr gearr (int, má tá an raon -32768 go 32767) 
* taiseachas aeir: fliuch (int, gcuntar?, cineálacha?, má tá an raon -2147483648 go 21474836) 
* fada (bigint, gcuntar?, varint?, má tá an raon -92233720368547808 go 9223372036854775807) 
* snámhphointe (snámhphointe) 
* dúbailte dúbailte dúbailte (dúbailte, deachúil (le caillteanas féideartha cruinneas) , amstampa) 
* foirm duille: líneach (ascii nó téacs, más rud é nach bhfuil siad níos mó ná 1 carachtar) 
* String (ascii, téacs, varchar, inet, uuid, amuid, cruinne, léarscáil, sraith, liosta?) 

Seirbhís do Chustaiméirí [taiseachas aeir: fliuch](#cassandra-timestamp-data) Is cás speisialta: úsáid ERDDAP 's sonraí dúbailte Cineál.

Má shonraíonn tú String dataType i ERDDAP™ do léarscáil Cassandra, a leagtar nó liosta, beidh an léarscáil, a leagtar nó liosta ar gach sraith Cassandra a thiontú go teaghrán amháin ar a chéile amháin sa ERDDAP™ tábla. ERDDAP™ Tá córas eile le haghaidh liostaí; féach thíos.

 *cineál gas: in airde* Liostaí -- ERDDAP 's'&lt;dataType ×) (#cineál) tag do Cassandra dataVariable Is féidir s san áireamh go rialta ERDDAP™ data recovery Cineálacha (féach thuas) móide roinnt sonraí speisialta Types féidir a úsáid le haghaidh colúin liosta Cassandra: booleanList, byteList, ubyteList, shortList, ushortList, intList, uintList, longList, ulongList, floatList, doubleList, charList, StringList. Nuair a bhíonn ceann de na colúin liosta sna torthaí á rith chun ERDDAP™ , beidh gach sraith de shonraí foinse a leathnú chun liosta. méid () sraitheanna sonraí i ERDDAP ; sonraí simplí Cineálacha (mar shampla, int) sa tsraith sonraí foinse a dhúbailt liosta. méid () amanna. Má tá na torthaí níos mó ná athróg liosta amháin, tá na liostaí ar a chéile ar leith de na sonraí MUST an méid céanna agus MUST a bheith "parallel" liostaí, nó ERDDAP™ Beidh a ghiniúint teachtaireacht earráide. Mar shampla, le haghaidh tomhais reatha ó ADCP,
doimhneacht doimhneacht doimhneacht \\[ 0 0 \\] , uCurrent \\[ 0 0 \\] , vCurrent \\[ 0 0 \\] agus zCurrent \\[ 0 0 \\] a bhaineann go léir, agus
doimhneacht doimhneacht doimhneacht \\[ 1 1 \\] , uCurrent \\[ 1 1 \\] , vCurrent \\[ 1 1 \\] agus zCurrent \\[ 1 1 \\] go léir a bhaineann,...
Nó, más rud é nach bhfuil tú ag iarraidh ERDDAP™ a leathnú liosta i sraitheanna éagsúla sa ERDDAP™ tábla, a shonrú Curtain mar an dataVariable 's sonraí Cineál mar sin beidh an liosta ar fad a léiriú mar aon Curtain ar a chéile amháin i ERDDAP .
    
#### Sonraí Am Cassandra{#cassandra-timestamp-data} 
Tá sonraí amstamp Cassandra i gcónaí ar an eolas faoi chriosanna ama. Má théann tú sonraí ama gan crios ama a shonrú, glacann Cassandra leis go n-úsáideann an t-am ama an crios ama áitiúil.
    
 ERDDAP™ Tacaíonn sonraí amstamp agus i gcónaí i láthair na sonraí sa Zulu / gMT crios ama. Mar sin, má théann tú sonraí ama i Cassandra ag baint úsáide as crios ama seachas Zulu / GMT, cuimhnigh gur gá duit gach ceist a dhéanamh le haghaidh sonraí amstamp i ERDDAP™ ag baint úsáide as Zulu / gMT crios ama. Mar sin, ná a bheith ionadh nuair na luachanna amstamp a thagann as ERDDAP Tá athrú ag roinnt uaireanta mar gheall ar an lasc crios ama ó áitiúil go Zulu / Am GMT.

* I ERDDAP 's datasets.xml , sa&lt; dataVariable × chlib le haghaidh athróg lasc ama, leagtha
```
          <dataType>double</dataType>  
```
agus i&lt; addAttributes × leagtha síos
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Moltaí: Má tá na sonraí raon ama, tá sé úsáideach go mbeadh na luachanna amstamp tagairt do lár an raon ama intuigthe (mar shampla, meán lae) . Mar shampla, má tá sonraí ag úsáideoir le haghaidh 2010-03-26T13:00Z ó thacar sonraí eile agus ba mhaith leo na sonraí is gaire ón tacar sonraí Cassandra seo a bhfuil sonraí acu le haghaidh gach lae, ansin na sonraí le haghaidh 2010-03-26T12:00Z (a léiríonn sonraí Cassandra don dáta sin) Is léir an chuid is fearr (i gcomparáid leis an meán oíche roimh nó tar éis, i gcás ina bhfuil sé níos lú soiléir is fearr) .
*    ERDDAP™ Tá fóntais a [Tiontaigh Numeric Am chun / ó String Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
* Féach ar [Conas ERDDAP™ Déileáil le Am](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
         
#### neamhsheachadadh{#integer-nulls} 
Cassandra Tacaíonn neamhnithe i Cassandra int ( ERDDAP™ taiseachas aeir: fliuch) agus bigint ( ERDDAP™ fada) colúin, ach ERDDAP™ Ní thacaíonn nulls fíor d'aon chineál sonraí slánuimhir.
De réir réamhshocraithe, beidh Cassandra nulls slánuimhir a thiontú i ERDDAP™ go 2147483647 do cholúin int, nó 9223372036854775807 do cholúin fhada. Beidh siad seo le feiceáil mar "NaN" i roinnt cineálacha comhaid aschur téacs (mar shampla, .csv) , "" i gcineálacha eile de chomhaid aschur téacs (mar shampla, .htmlTable ) , agus an uimhir ar leith (2147483647 do luachanna int ar iarraidh) i gcineálacha eile comhaid (mar shampla, comhaid dénártha cosúil .nc agus mata) . Is féidir le húsáideoir cuardach a dhéanamh le haghaidh sraitheanna sonraí leis an gcineál seo de luach ar iarraidh ag tagairt do "NaN", m.sh, "Fuinneamh &amp; rsquo; NaN".
    
Má úsáideann tú roinnt luach slánuimhir eile a chur in iúl luachanna ar iarraidh i do tábla Cassandra, le do thoil a aithint go luach i datasets.xml :

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

Do colúin pointe Cassandra snámh, a fháil nulls thiontú go NaNs i ERDDAP . Do Cineálacha sonraí Cassandra a thiontú go Strings i ERDDAP™ , a fháil nulls thiontú go Stringsa folamh. Níor chóir go mbeadh fadhb.
    
#### "WARNING: Ath-ullmhú cheist cheana féin"{#warning-re-preparing-already-prepared-query} 
* "WARNING: Ath-ullmhú cheist cheana féin" i *taiseachas aeir: fliuch* / logs / catalina.out (nó roinnt eile Tomcat comhad logáil)   
Deir cáipéisíocht Cassandra go bhfuil deacracht ann má dhéantar an cheist chéanna i Ullmhacht faoi dhó (nó níos mó) . (Féach seo [tuarascáil bug](https://datastax-oss.atlassian.net/browse/JAVA-236) .) A sheachaint a dhéanamh Cassandra dÚsachtach, ERDDAP™ caches gach Ullmhaithe Stáit sin is féidir é a athúsáid iad. Tá an taisce caillte má / nuair Tomcat / ERDDAP™ Tá restarted, ach is dóigh liom go bhfuil ceart go leor toisc go bhfuil na Ullmhaithe a bhaineann le seisiún ar leith (idir eatarthu Java agus Cassandra) , atá caillte freisin. Mar sin, is féidir leat a fheiceáil ar na teachtaireachtaí. Tá a fhios agam ar aon réiteach eile. Fortunately, tá sé rabhadh, ní earráid (cé go bagairt Cassandra go bhféadfadh sé mar thoradh ar fhadhbanna feidhmíochta) .
    
Cassandra éilimh go bhfuil Ullmhaithe Stáit go maith go deo, mar sin ERDDAP Níor chóir go mbeadh 's Ullmhaithe i dtaisce lasmuigh den dáta / ivalid. Más rud é nach bhfuil fíor, agus a fhaigheann tú earráidí faoi Ullmhaithe áirithe a bheith as-dáta / leithead, ansin is gá duit a atosú ERDDAP™ go soiléir ERDDAP 's taisce de Ullmhaithe.
    
#### Slándáil Cassandra{#cassandra-security} 
Féach ar [cliceáil grianghraf a mhéadú](https://cassandra.apache.org/doc/latest/operating/security.html) 

Nuair a bhíonn tú ag obair le Cassandra, ní mór duit rudaí a dhéanamh chomh sábháilte agus go daingean agus is féidir a sheachaint ag ligean d'úsáideoir mailíseach damáiste a dhéanamh do Cassandra nó rochtain a fháil ar shonraí nár chóir dóibh rochtain a fháil ar. ERDDAP™ iarracht rudaí a dhéanamh ar bhealach slán, freisin.

* Molaimid duit a chur ar bun ERDDAP™ ceangal le Cassandra mar úsáideoir Cassandra nach bhfuil ach rochtain ar an **ábhartha eile** tábla tábla tábla tábla (s s) agus tá ach pribhléidí LÉIGH.
* Molaimid duit a chur ar bun an nasc ó ERDDAP™ a Cassandra ionas go mbeidh sé
    * i gcónaí úsáideann SSL,
    * ach is féidir naisc ó seoladh IP amháin (nó bloc amháin seoltaí) agus as an ceann ERDDAP™ úsáideoir, agus
    * aistrithe ach pasfhocail ina bhfoirm hashed MD5.
*    \\[ TIONSCADAL IOMLÁN \\] An nascProperties (lena n-áirítear an focal faire&#33;) a stóráil mar théacs plain i datasets.xml . Ní mór dúinn a fháil ar bhealach chun ligean don riarthóir chun dul isteach ar an focal faire Cassandra le linn ERDDAP 's startup i Tomcat (a tharlaíonn gan ionchur úsáideora) , mar sin ní mór an focal faire a bheith inrochtana i gcomhad. Chun seo a dhéanamh níos sábháilte:
    * Tá tú (an ERDDAP™ internet marketing) Ba chóir go mbeadh úinéir datasets.xml agus tá rochtain READ agus WRITE acu.
    * Déan grúpa go n-áirítear ach úsáideoir = tomcat. Bain úsáid as chgrp a dhéanamh go bhfuil an grúpa do datasets.xml , le pribhléidí ach LÉIGH.
    * Úsáid chmod a shannadh pribhléidí o-rwx (aon rochtain READ nó WRITE d'úsáideoirí "eile") le haghaidh datasets.xml .
* Nuair a bheidh i ERDDAP™ , an focal faire agus airíonna nasc eile a stóráil i "príobháideach" Java athróg.
* Iarratais ó chliaint atá parsed agus a sheiceáil le haghaidh bailíochta sula ghiniúint na hiarratais CQL do Cassandra.
* Déantar iarratais ar Cassandra le CQL Bound/PreparedStatements, chun instealladh CQL a chosc. In aon chás, tá Cassandra go bunúsach níos lú a oirfeadh do instealladh CQL ná bunachair shonraí traidisiúnta a [Instealladh SQL](https://en.wikipedia.org/wiki/SQL_injection) .
         
#### Seirbhís do Chustaiméirí{#cassandra-speed} 
Is féidir Cassandra a bheith tapa nó mall. Tá roinnt rudaí is féidir leat a dhéanamh a dhéanamh go tapa:
* Go ginearálta -
Is é an cineál CQL go bhfuil ceisteanna [taiseachas aeir: fliuch](https://en.wikipedia.org/wiki/Declarative_programming) . Siad a shonrú ach cad ba mhaith leis an úsáideoir. Ní chuireann siad áireamh sonraíocht nó leideanna maidir leis an gcaoi a bhfuil an cheist a láimhseáil nó a bharrfheabhsú. Mar sin, níl aon bhealach le haghaidh ERDDAP™ a ghiniúint an cheist ar bhealach a chabhraíonn sé Cassandra Optamaigh an cheist (nó ar bhealach ar bith a shonraíonn an chaoi a bhfuil an cheist a láimhseáil) . Go ginearálta, tá sé suas go dtí an riarthóir Cassandra chun rudaí a chur ar bun (mar shampla, innéacsanna) a bharrfheabhsú do chineálacha áirithe fiosruithe.
     
* Ag sonrú na colúin amstamp a bhaineann le heochracha laindéal ama garbh-chruinneas trí [&lt;laindéal Príomh-SourceNames × (Tuilleadh eolais) Is é an bealach is tábhachtaí chun cabhrú ERDDAP™ obair go héifeachtach le Cassandra. Má tá an caidreamh seo i dtábla Cassandra agus nach bhfuil tú ag insint ERDDAP™ , beidh an tacar sonraí a bheith painfully mall i ERDDAP™ agus tonna de acmhainní Cassandra a úsáid.
     
* Ag sonrú na colúin bhraisle trí [&lt;braisle ColmnSourceNames × (Tuilleadh eolais) Is é an dara bealach is tábhachtaí chun cabhrú ERDDAP™ obair go héifeachtach le Cassandra. Má tá colúin braisle agus nach bhfuil tú ag insint ERDDAP , beidh fo-thacar mór de na ceisteanna féideartha le haghaidh sonraí a bheith gan ghá, painfully mall i ERDDAP™ agus tonna de acmhainní Cassandra a úsáid.
     
* Déan teagmháil [Naisc ábhartha eile](https://cassandra.apache.org/doc/latest/cql/indexes.html) le haghaidh Variables Cothaithe --
Is féidir leat luas roinnt ceisteanna trí innéacsanna a chruthú do cholúin Cassandra atá srianta go minic le "=" srianta.
    
Ní féidir Cassandra a dhéanamh innéacsanna le haghaidh liosta, leagtha, nó colúin léarscáil.
    
* Ag sonrú na colúin innéacs via [&lt;innéacsColumnSourceNames × (#indexcolumnsourcenames) Is bealach tábhachtach chun cabhrú ERDDAP™ obair go héifeachtach le Cassandra. Má tá colúin innéacs agus nach bhfuil tú ag insint ERDDAP , beidh roinnt ceisteanna le haghaidh sonraí a bheith gan ghá, painfully mall i ERDDAP™ agus tonna de acmhainní Cassandra a úsáid.
     
#### riachtanais uisce: measartha{#cassandra-stats} 
*    ["Cassandra stats" Teachtaireachtaí Diagnóiseacha](#cassandra-stats) -- I gcás gach ERDDAP™ ceist úsáideora chuig tacar sonraí Cassandra, ERDDAP™ clóigh líne sa chomhad logála, *Treoir do Thuismitheoirí* / logs / log.txt, le roinnt staitisticí a bhaineann leis an gceist, mar shampla,
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
Ag baint úsáide as na huimhreacha sa sampla thuas, ciallaíonn sé seo:

* Nuair a bheidh ERDDAP™ deireanach (reo) luchtaithe an tacar sonraí, dúirt Cassandra ERDDAP™ go raibh 10000 teaglaim ar leith de na heochracha laindéal. ERDDAP™ i dtaisce gach ceann de na teaglaim ar leith i gcomhad.
* Mar gheall ar shrianta an úsáideora, ERDDAP™ aithníodh 2 teaglaim as an 10000 a d'fhéadfadh na sonraí atá ag teastáil. Mar sin,, ERDDAP™ a dhéanamh 2 glaonna a Cassandra, ceann do gach teaglaim de na heochracha laindéal. (Sin an méid a éilíonn Cassandra.) Go soiléir, tá sé deacair má tá líon mór de teaglamaí de na heochracha laindéal ag tacar sonraí mór agus ní laghdaíonn iarraidh áirithe go suntasach. Is féidir leat a cheangal ar gach iarratas a laghdú ar an spás eochair ag leagan [&lt;maxRequestFraction ×] (Tuilleadh roghanna...) . Anseo, 2/10000 = 2e-4, atá níos lú ná an maxRequestFraction (0.1 .) , mar sin ceadaíodh an iarraidh.
* Tar éis na srianta ar na heochracha laindéal a chur i bhfeidhm, [colúin braisle](#clustercolumnsourcenames) , agus [colúin innéacs](#indexcolumnsourcenames) a cuireadh chuig ERDDAP™ , D'fhill Cassandra 1200 sraitheanna sonraí go ERDDAP™ sa ToradhSet.
* Toradh Ní mór Socraigh a bhí [data recovery Cineál = *cineál gas: leathadh* Liosta de na Liostaí](#cassandra-datatypes) colúin (le meán de 10 míreanna in aghaidh an liosta) , mar gheall ar ERDDAP™ leathnú na sraitheanna 1200 ó Cassandra isteach 12000 sraitheanna i ERDDAP .
*    ERDDAP™ i bhfeidhm i gcónaí gach ceann de na srianta an úsáideora ar na sonraí ó Cassandra. Sa chás seo, laghdaigh srianta nár láimhseáil Cassandra líon na sraitheanna go 7405. Is é sin an líon sraitheanna a sheoladh chuig an úsáideoir.

Is é an úsáid is tábhachtaí de na teachtaireachtaí diagnóiseacha a dhéanamh cinnte go ERDDAP™ ag déanamh cad a cheapann tú go bhfuil sé ag déanamh. Mura bhfuil sé (mar shampla, nach bhfuil sé ag laghdú líon na dteaglamaí ar leith mar a bhfuiltear ag súil leo?) , ansin is féidir leat úsáid a bhaint as an t-eolas chun iarracht a dhéanamh amach cad atá ag dul mícheart.
 
* Taighde agus turgnamh a aimsiú agus a shocrú níos fearr [&lt;nascCríochfort ú (Tuilleadh eolais) 's.
 
* Seiceáil luas an nasc líonra idir Cassandra agus ERDDAP . Má tá an nasc mall, féach an féidir leat é a fheabhsú. Is é an staid is fearr nuair ERDDAP™ ag rith ar fhreastalaí ceangailte leis an gcéanna (go tapa) athrú mar an bhfreastalaí ag rith an nód Cassandra a bhfuil tú ag nascadh.
 
* Tabhair othar. Léigh an t-eolas anseo agus i ndoiciméadacht Cassandra go cúramach. Eisceadh. Seiceáil do chuid oibre. Má tá an Cassandra- ERDDAP™ Tá nasc fós níos moille ná mar a súil leat, le do thoil san áireamh do tábla Cassandra ar scéimre agus do ERDDAP™ shmután de datasets.xml agus féach ar ár [alt ar thacaíocht bhreise a fháil](/docs/intro#support) .
 
* Má theipeann ar gach ceann eile,
na sonraí a stóráil i mbailiúchán NetCDF v3 .nc comhaid comhad (go háirithe go háirithe .nc comhaid a úsáideann an [CF Diosca Geometris Sampling (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Is féidir struchtúir sonraí Ragged Contiguous Array agus mar sin a láimhseáil le ERDDAP 's [EDDTableFromNcCFFiles](#eddtablefromnccffiles) ) . Má tá siad eagraithe go loighciúil (gach ceann acu le sonraí le haghaidh smután de spás agus am) , ERDDAP™ is féidir le sonraí a bhaint astu go han-tapa.
         
#### EDDTableFromCassandra creatlach XML{#eddtablefromcassandra-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromCassandra" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;ipAddress>](#sourceurl)...&lt;/ipAddress>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The Cassandra URL without the port number, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;127.0.0.1 REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#cassandra-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "readTimeoutMillis") and values  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of the Cassandra properties that ERDDAP™ needs to change.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;keyspace>...&lt;/keyspace> &lt;!-- The name of the keyspace that has  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the table. REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName> &lt;!-- The name of the table, default = "".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;partitionKeySourceNames>](#partitionkeysourcenames)...&lt;partitionKeySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;clusterColumnSourceNames>](#clustercolumnsourcenames)...&lt;clusterColumnSourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;indexColumnSourceNames>](#indexcolumnsourcenames)...&lt;indexColumnSourceNames> &lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;maxRequestFraction>](#maxrequestfraction)...&lt;maxRequestFraction>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL double between 1e-10 and 1 (the default). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#case-sensitivity)...&lt;columnNameQuotes> &lt;!-- OPTIONAL.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options: \\[nothing\\] (the default) or ". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include a [&lt;dataType>](#datatype) tag. See  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Cassandra DataTypes](#cassandra-datatypes).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For [Cassandra timestamp columns](#cassandra-timestamp-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromDapSequence{#eddtablefromdapsequence} 
 [ **EDDTableFromDapSequence** ](#eddtablefromdapsequence) Láimhseálann athróg laistigh de 1- agus 2-leibhéal ord ó [ DAP ](https://www.opendap.org/) freastalaithe ar nós DAP PER (bhí aghttps://www.pmel.noaa.gov/epic/software/dapper/, scor anois) .

* Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Is féidir leat a chur in eagar ansin go fíneáil tune é. Is féidir leat a bhailiú ar an eolas is gá duit ag féachaint ar an tacar sonraí foinse DDS agus comhaid DAS i do bhrabhsálaí (ag cur .das agus .dds leis an sourceUrl (Bhí sampla aghttps://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds).
    
* Tá athróg i DAP ord má léiríonn an freagra .dds go bhfuil an struchtúr sonraí a bhfuil an athróg a "de bharr" (cás íogair) .
* I gcásanna áirithe, feicfidh tú seicheamh laistigh d'ord, seicheamh 2-leibhéal - EDDTableFromDapSequence Láimhseálann na, freisin.
#### EDDTableFromDapSeicheadh creatlach XML{#eddtablefromdapsequence-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDapSequence" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;outerSequenceName>...&lt;/outerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the outer sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;innerSequenceName>...&lt;/innerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the inner sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is OPTIONAL; use it if the DAP data is a two level  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequence. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringEQNE>](#sourcecanconstrainstringeqne)true|false&lt;/sourceCanConstrainStringEQNE>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringGTLT>](#sourcecanconstrainstringgtlt)true|false&lt;/sourceCanConstrainStringGTLT>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringRegex>](#sourcecanconstrainstringregex)...&lt;/sourceCanConstrainStringRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;skipDapperSpacerRows>...&lt;/skipDapperSpacerRows>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- skipDapperSpacerRows specifies whether the dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will skip the last row of each innerSequence other than the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last innerSequence (because Dapper servers put NaNs in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row to act as a spacer).  This tag is OPTIONAL. The default  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is false.  It is recommended that you set this to true for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all Dapper sources and false for all other data sources. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromDatabase{#eddtablefromdatabase} 
 [ **EDDTableFromDatabase** ](#eddtablefromdatabase) Láimhseálann sonraí ó tábla bunachar sonraí gaol amháin nó [féachaint ar](https://en.wikipedia.org/wiki/View_(database) ).

#### Tábla amháin nó Féach{#one-table-or-view} 
Má tá na sonraí is mian leat a sheirbheáil i dhá tábla nó níos mó (agus dá bhrí sin ní mór JOIN chun sonraí a bhaint as an dá táblaí ag an am céanna) , ní mór duit ceann a dhéanamh [denormalized](https://en.wikipedia.org/wiki/Denormalization)   (a chuaigh cheana féin) tábla nó [féachaint ar](https://en.wikipedia.org/wiki/View_(SQL) ) le gach ceann de na sonraí gur mian leat a chur ar fáil mar aon tacar sonraí i ERDDAP .

I gcás mór, bunachair sonraí casta, d'fhéadfadh sé ciall a bhaint as roinnt smután mar táblaí denormalaithe, gach ceann acu le cineál éagsúla sonraí, a bheidh ina tacair sonraí ar leith i ERDDAP .

Ag déanamh tábla denormalized lena n-úsáid i ERDDAP™ Is féidir fuaim cosúil le smaoineamh dÚsachtach a thabhairt duit. Tabhair muinín dúinn. Tá roinnt cúiseanna cén fáth ERDDAP™ oibreacha le táblaí denormalized:

* Tá sé níos éasca go mór d'úsáideoirí.
Nuair a bheidh ERDDAP™ i láthair an tacar sonraí mar aon, simplí, denormalized, tábla amháin, tá sé an-éasca do dhuine ar bith a thuiscint na sonraí. Riamh an chuid is mó úsáideoirí chuala de táblaí normalaithe, agus an-beag a thuiscint eochracha, eochracha coigríche, nó tábla uamanna, agus tá siad beagnach cinnte nach bhfuil a fhios na sonraí de na cineálacha éagsúla de uamanna, nó conas a shonrú ar an SQL a dhéanamh a bheith páirteach (nó raidhse il) i gceart. Ag baint úsáide as tábla denormalized seachnaíonn na fadhbanna sin go léir. An chúis amháin údar an úsáid a bhaint as tábla amháin denormalized do chur i láthair tacar sonraí a ERDDAP™ úsáideoirí.
     
* táblaí Gnáthaithe (táblaí il a bhaineann le colúin eochair) Tá mór le haghaidh sonraí a stóráil i mbunachar sonraí.
Ach fiú i SQL, is é an toradh atá ar ais chuig an úsáideoir a denormalized (chuaigh) tábla aonair. Mar sin, dealraíonn sé réasúnta a chur i láthair an tacar sonraí d'úsáideoirí mar ollmhór, denormalized, tábla amháin as ar féidir leo a iarraidh ansin fo-thacar (e.g., taispeáin dom sraitheanna den tábla ina teocht × 30 30 30) .
     
* Is féidir leat athruithe a dhéanamh ERDDAP™ gan athrú do táblaí.
     ERDDAP™ Tá roinnt ceanglais a d'fhéadfadh a bheith difriúil ó conas a bhfuil tú a chur ar bun do bhunachar sonraí.
Mar shampla, ERDDAP™ Éilíonn sé go stóráiltear sonraí ama i réimsí 'timestamp le crios ama'.
Trí tábla/amharc ar leith a dhéanamh ERDDAP™ , is féidir leat a dhéanamh ar na hathruithe nuair a dhéanann tú an tábla denormalized do ERDDAP . Dá bhrí sin, ní gá duit aon athruithe a dhéanamh ar do táblaí.
     
*    ERDDAP™ Beidh recreate roinnt de struchtúr na táblaí normalaithe.
Is féidir leat a shonrú cé na colúin sonraí a thagann ó na táblaí 'lasmuigh' agus dá bhrí sin tá líon teoranta de luachanna ar leith. ERDDAP™ Beidh a bhailiú gach ceann de na teaglaim éagsúla luachanna sna colúin agus iad a chur i láthair d'úsáideoirí ar speisialta. leathanach gréasáin fo-thacar a chabhraíonn le húsáideoirí fo-thacar den tacar sonraí a roghnú go tapa. Léirítear na luachanna ar leith do gach colún freisin i liostaí anuas ar leathanaigh ghréasáin eile an tacar sonraí.
     
* Déanann tábla denormalized na sonraí lámh-uaire ó tú go dtí an ERDDAP riarthóir éasca.
Tá tú an saineolaí le haghaidh an tacar sonraí, mar sin a dhéanann sé ciall a dhéanann tú na cinntí a bhfuil táblaí agus a colúin a bheith páirteach agus conas a bheith páirteach leo. Mar sin, ní gá duit a lámh dúinn (nó níos measa, na húsáideoirí deiridh) táblaí éagsúla agus treoracha mionsonraithe maidir le conas a bheith páirteach leo, caithfidh tú ach a thabhairt dúinn rochtain ar an tábla denormalized.
     
* Ceadaíonn tábla denormalized rochtain éifeachtach ar na sonraí.
Is é an fhoirm denormalized de ghnáth níos tapúla chun rochtain ná an fhoirm normalaithe. Is féidir le Member a bheith mall. Is féidir le Tréimhsí Il a bheith an-mhall.
     

D'fhonn na sonraí a fháil ó dhá tábla nó níos mó sa bhunachar sonraí isteach ERDDAP™ , tá trí rogha:
 

* Rogha Molta:
Is féidir leat a chruthú coma- nó tab-scartha-luach comhad leis na sonraí ón tábla denormalized.
Má tá an tacar sonraí ollmhór, ansin a dhéanann sé ciall a chruthú comhaid éagsúla, gach ceann acu le fo-thacar comhthéigneach an tábla denormalized (mar shampla, sonraí ó raon ama níos lú) .
    
Is é an buntáiste mór anseo go ERDDAP™ beidh sé in ann a láimhseáil iarratais úsáideora le haghaidh sonraí gan aon iarracht eile ag do bhunachar sonraí. Mar sin, ERDDAP™ Ní bheidh a bheith ina ualach ar do bhunachar sonraí nó riosca slándála. Is é seo an rogha is fearr faoi beagnach gach cás mar gheall ar ERDDAP™ is féidir a fháil de ghnáth sonraí ó chomhaid níos tapúla ná ó bhunachar sonraí (má táimid a thiontú ar an .csv comhaid a .nc CF comhaid) . (Is cuid den chúis go ERDDAP + Tá comhaid córas léamh-amháin agus ní gá déileáil le hathruithe a dhéanamh agus a chur ar fáil [ACID](https://en.wikipedia.org/wiki/ACID)   (adamhach, Comhsheasmhacht, Isolation, Durability) .) Chomh maith leis sin, ní bheidh ort is dócha freastalaí ar leith ós rud é gur féidir linn a stóráil na sonraí ar cheann dár RAIDs agus rochtain a fháil air le atá ann cheana féin ERDDAP™ ar fhreastalaí atá ann cheana.
    
* Roghnaigh:
Bhunaigh tú bunachar sonraí nua ar ríomhaire difriúil leis an tábla denormalized.
Ós rud é gur féidir bunachar sonraí foinse saor in aisce agus oscailte mar MariaDB, MySQL, agus PostgreSQL, ní gá an rogha seo costas a lán.
    
Is é an buntáiste mór anseo go ERDDAP™ beidh sé in ann a láimhseáil iarratais úsáideora le haghaidh sonraí gan aon iarracht eile ag do bhunachar sonraí reatha. Mar sin, ERDDAP™ Ní bheidh sé ina ualach ar do bhunachar sonraí reatha. Cuireann sé seo deireadh freisin a lán imní slándála ós rud é ERDDAP™ ní bheidh rochtain agat ar do bhunachar sonraí reatha.
    
* Rogha díothaithe:
Is féidir linn a nascadh ERDDAP™ chuig do bhunachar sonraí reatha.
Chun seo a dhéanamh, ní mór duit:
    
    * Cruthaigh tábla nó dearcadh ar leith leis an tábla denormalized na sonraí.
    * Cruthaigh úsáideoir "erddap" a bhfuil léamh-amháin rochtain ar ach an tábla denormalized (s s) .
         
    
Is é seo an rogha má athraíonn na sonraí go minic agus ba mhaith leat a thabhairt ERDDAP™ úsáideoirí rochtain láithreach ar na hathruithe sin; áfach, fiú mar sin, d'fhéadfadh sé ciall a bhaint as an rogha comhad thuas agus go tréimhsiúil (gach 30 nóiméad?) in ionad an comhad a bhfuil sonraí an lae inniu.
Is iad na míbhuntáistí móra an chur chuige seo go ERDDAP™ Beidh iarratais úsáideora áit dócha ualach unbearably mór ar do bhunachar sonraí agus go bhfuil an ERDDAP™ Is nasc riosca slándála (cé gur féidir linn an riosca a íoslaghdú / a íoslaghdú) .

Ag déanamh an tábla nó an dearcadh denormalized do ERDDAP™ Is deis mhaith a dhéanamh ar roinnt athruithe go ERDDAP™ riachtanais, ar bhealach nach ndéanann difear do táblaí bunaidh:

* Athraigh an dáta agus réimsí ama / colúin a bhaint as an dataType go bhfuil glaonna Postgres [amstamp le crios ama](#database-date-time-data)   (nó a chomhionann i do bhunachar sonraí) .
Ní oibríonn Timestamps gan faisnéis crios ama i gceart ERDDAP .
* Déan innéacsanna do na colúin go n-úsáideoirí cuardaigh go minic.
* Bí ar an eolas faoi [cás na n-ainmneacha réimse/colúin](#quotes-for-names-and-case-sensitivity)   (mar shampla, bain úsáid as gach cás níos ísle) nuair a chlóscríobh tú iad.
* Ná húsáid focail forchoimeádta don tábla agus do na hainmneacha réimse / colún.

Más gá duit cabhrú a dhéanamh ar an tábla nó dearcadh denormalized, téigh i dteagmháil le do riarthóir bunachar sonraí.
Más mian leat labhairt faoin gcur chuige iomlán seo nó strategize conas is fearr é a dhéanamh, le do thoil ríomhphost Chris. John ag noaa.gov.
    
#### bunachar sonraí i datasets.xml  {#database-in-datasetsxml} 
Tá sé deacair a chruthú ar an ceart datasets.xml faisnéis atá ag teastáil ERDDAP™ nasc a bhunú leis an mbunachar sonraí. Bí othar. Bí modheolaíoch.
* Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Is féidir leat a chur in eagar ansin go fíneáil tune é.
        
Sonraí a ghiniúint Tá trí rogha speisialta ag Xml do EDDTableFromDatabase:
1. Má théann tú "&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;" (gan na Sleachta) don ainm chatalóg, taispeánfaidh an clár liosta de na hainmneacha catalóg.
2. Má théann tú "&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;" (gan na Sleachta) don ainm scéimre, beidh an clár a thaispeáint liosta de na hainmneacha scéimre.
3. Má théann tú "&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;" (gan na Sleachta) don ainm tábla, beidh an clár a thaispeáint liosta táblaí agus a colúin. Is é an chéad "&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33;" iontráil a dhéanann tú an ceann a bheidh in úsáid.
* Léigh go cúramach faisnéis uile an doiciméid seo faoi EDDTableFromDatabase.
* Is féidir leat a bhailiú an chuid is mó den fhaisnéis is gá duit a chruthú ar an XML do EDDTableFromDatabase tacar sonraí trí theagmháil a dhéanamh leis an riarthóir bunachar sonraí agus ag cuardach ar an ngréasán.
* Cé gur minic a dhéileálann bunachair shonraí le hainmneacha colúin agus le hainmneacha tábla ar bhealach atá íogair ó thaobh cás, tá siad cás-íogair ar bhealach ERDDAP . Mar sin, má deir teachtaireacht earráide ón mbunachar sonraí go bhfuil ainm colún anaithnid (mar shampla, "aitheantóir uathúil = '' *colún \\* '") cé go bhfuil a fhios agat ann, iarracht a dhéanamh ag baint úsáide as gach caipitil, mar shampla, *› COLUMN* , is minic an leagan fíor, cás-íogair den ainm colún.
* Obair go dlúth leis an riarthóir bunachar sonraí, a d'fhéadfadh a bhfuil taithí ábhartha. Má theipeann ar an tacar sonraí a luchtú, léigh an [teachtaireacht earráide](#troubleshooting-tips) go cúramach a fháil amach cén fáth.
         
#### Tiománaí JDBC{#jdbc-driver} 
* [JDBC Tiománaí agus&lt;an tiománaí Namaim ú (Tuilleadh roghanna...) -- Ní mór duit a fháil ar an JDBC 3 cuí nó JDBC 4 tiománaí . jar comhad do do bhunachar sonraí agus
é a chur i *taiseachas aeir: fliuch* / webapps / erddap / WEB-INF /lib tar éis duit a shuiteáil ERDDAP . Ansin, i do datasets.xml don tacar sonraí seo, ní mór duit an&lt;tiománaíName uaire don tiománaí, atá (Ar an drochuair,) difriúil ón ainm comhaid. Cuardaigh ar an ngréasán le haghaidh an tiománaí JDBC do do bhunachar sonraí agus an tiománaí Name sin Java Ní mór é a úsáid.
    
    * Do MariaDB, déan iarracht [https://mariadb.com/kb/en/about-the-mariadb-java-client/](https://mariadb.com/kb/en/about-the-mariadb-java-client/)   
An bhfuil&lt;tiománaí Name uaire a úsáid i datasets.xml   (féach thíos) Is dócha org.mariadb.jdbc. Tiománaí .
    * Do MySQL agus Amazon RDS, déan iarracht [https://dev.mysql.com/downloads/connector/j/](https://dev.mysql.com/downloads/connector/j/)   
An bhfuil&lt;tiománaí Name uaire a úsáid i datasets.xml   (féach thíos) Is dócha com.mysql.jdbc. Tiománaí .
    * Le haghaidh Oracle , déan iarracht [https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html) .
An bhfuil&lt;tiománaí Name uaire a úsáid i datasets.xml   (féach thíos) Is dócha oracle.jdbc.driver. Oracle Tiománaí .
    * Do Postgresql, fuair muid an tiománaí JDBC 4 ó [https://mvnrepository.com/artifact/org.postgresql/postgresql](https://mvnrepository.com/artifact/org.postgresql/postgresql)   
An bhfuil&lt;tiománaí Name uaire a úsáid i datasets.xml   (féach thíos) Is dócha org.postgresql. Tiománaí .
    * Do Freastalaí SQL, is féidir leat a fháil ar an JTDS JDBC tiománaí ó [https://jtds.sourceforge.net](https://jtds.sourceforge.net) .
An bhfuil&lt;tiománaí Name uaire a úsáid i datasets.xml   (féach thíos) Is dócha net.sourceforge.jtds.jdbc. Tiománaí .
    
Tar éis a chuir tú an tiománaí JDBC .jar i ERDDAP™ leabharlann eolaire, ní mór duit a chur tagairt don .jar comhad sa .bat agus / nó .sh comhaid script do GenerateDatasets Xml, DasDds, agus ArchiveADataset atá sa *taiseachas aeir: fliuch* /webapps / erddap / WEB-INF / eolaire; ar shlí eile, beidh tú a fháil ClassNotFoundException nuair a ritheann tú na scripteanna.
    
Ar an drochuair, tá JDBC uaireanta foinse na trioblóide. Ina ról mar idirghabhálaí idir ERDDAP™ agus an bunachar sonraí, a dhéanann sé uaireanta athruithe subtle ar an t-iarratas SQL bunachar sonraí caighdeánach / cineálacha go ERDDAP™ Cruthaíonn, rud a chruthaíonn fadhbanna (mar shampla, a bhaineann le [aitheantóirí uachtair / ísealchás](#quotes-for-names-and-case-sensitivity) agus a bhaineann le [crios ama dáta / am](#database-date-time-data) ) . Bí foighneach, léigh an t-eolas anseo go cúramach, seiceáil do chuid oibre, agus féach ar ár [alt ar thacaíocht bhreise a fháil](/docs/intro#support) .
    
#### Bunachar Sonraí&lt;nasc nasc nasc nasc Maoin agus beannacht;{#database-connectionproperty} 
* [EN]&lt;nascCríochfort ú (#data-connectionpropty) -- I an datasets.xml do do tacar sonraí, ní mór duit roinnt nasc a shainiú clibeanna Maoine a insint ERDDAP™ conas a nascadh le do bhunachar sonraí (mar shampla, a shonrú ar an t-ainm úsáideora, focal faire, nasc ssl, agus [méid beoite](#set-the-fetch-size) ) . Tá siad seo difriúil do gach cás agus tá siad beagán deacair a figiúr amach. Cuardaigh an ngréasán le haghaidh samplaí de úsáid a bhaint tiománaí JDBC chun ceangal le do bhunachar sonraí. An bhfuil&lt;connectionProperty × ainmneacha (mar shampla, "úsáideoir", "password", agus "ssl") , agus is féidir roinnt de na luachanna connectionProperty a fháil ag cuardach an ngréasán le haghaidh "JDBC airíonna nasc *bunachar sonraí Cineál Cineál Cineál cineál* " " " (mar shampla, Oracle , MySQL, Amazon RDS, MariaDB, PostgreSQL) .
     
#### Sleachta le haghaidh Ainmneacha agus Cás Sensitivity{#quotes-for-names-and-case-sensitivity} 
*    [Quotes for Field/Column Names; Cás Sensitivity](#quotes-for-names-and-case-sensitivity) - De réir réamhshocraithe, cuireann EDDTableFromDatabase Sleachta dúbailte ANSI-SQL-chaighdeán thart ar ainmneacha réimse / colún i ráitis SELECT i gcás go bhfuil tú úsáid focal in áirithe mar ainm réimse / colún, nó carachtar speisialta in ainm réimse / colún. Na Sleachta dúbailte freisin thwart cineálacha áirithe ionsaithe insteallta SQL. Is féidir leat insint ERDDAP™ a úsáid ", ', nó aon Sleachta trí&lt;colún NameQuotes ú i datasets.xml don tacar sonraí seo.
    
I gcás go leor bunachar sonraí, ag baint úsáide as aon chineál Sleachta is cúis leis an mbunachar sonraí a bheith ag obair le réimse / ainmneacha colún ar bhealach íogair cás (in ionad an cás bunachar sonraí réamhshocraithe ar bhealach íogair) . Bunachair sonraí a thaispeáint go minic comhad / ainmneacha coláiste mar gach uachtair-cás, nuair i ndáiríre tá an fhoirm cás íogair éagsúla. I ERDDAP™ , le do thoil a chóireáil i gcónaí ainmneacha colún bunachar sonraí mar chás íogair.
    
    * Maidir le Maria DB, ní mór duit a reáchtáil ar an mbunachar sonraí le [Táirgí gaolmhara](https://mariadb.com/kb/en/mysql-command-line-client/) .
    * Do MySQL agus Amazon RDS, ní mór duit a reáchtáil ar an mbunachar sonraí le [Táirgí gaolmhara](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes) .
    *    Oracle tacaíochtaí Sleachta dúbailte caighdeánach ANSI-SQL [riachtanais uisce: measartha](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223) .
    * Tacaíonn IargreSQL le Sleachta dúbailte caighdeánach ANSI-SQL de réir réamhshocraithe.
    
      
Ná húsáid focal in áirithe do bhunachar sonraí, chatalóg, scéimre nó tábla ainm. ERDDAP™ Ní chuireann Sleachta timpeall orthu.
    
Más féidir, bain úsáid as gach cás níos ísle do bhunachar sonraí, chatalóg, scéimre, ainmneacha tábla agus ainmneacha réimse nuair a chruthú ar an tábla bunachar sonraí (nó féachaint ar) agus nuair a thagraíonn do na hainmneacha réimse / colún i datasets.xml i ERDDAP . Seachas sin, is féidir leat a fháil teachtaireacht earráide ag rá an bunachar sonraí, chatalóg, scéimre, tábla, agus / nó nach raibh réimse le fáil. Má dhéanann tú a fháil teachtaireacht earráide, déan iarracht ag baint úsáide as an leagan cás-íogair, an leagan uile uachtair-cás, agus an leagan uile níos ísle-cás an t-ainm i ERDDAP . D'fhéadfadh duine amháin acu ag obair. Más rud é nach, ní mór duit a athrú ar an t-ainm ar bhunachar sonraí, catalóg, scéimre, agus / nó tábla go léir níos ísle-cás.
    
#### Bunachar Sonraí&lt;data recovery Cineál &amp; F;{#database-datatype} 
*    [Bunachar Sonraí](#database-datatype) [EN]&lt;dataType ×) (#cineál) Clibeanna - Toisc go bhfuil roinnt athbhrí faoi a [cineálacha sonraí bunachar sonraí](https://www.w3schools.com/sql/sql_datatypes_general.asp) léarscáil a ERDDAP™ cineálacha sonraí, ní mór duit a shonrú [&lt;dataType ×) (#cineál) tag do gach [&lt; dataVariable ú (#datavariable) a insint ERDDAP™ cé na sonraí a úsáid. Is cuid den fhadhb ná go n-úsáideann tacair sonraí éagsúla téarmaí éagsúla do na cineálacha sonraí éagsúla - mar sin déan iarracht na sainmhínithe a mheaitseáil, ní hamháin na hainmneacha. Féach an cur síos ar an [caighdeán caighdeánach ERDDAP™ data recovery Cineálacha](#data-types) , lena n-áirítear tagairtí do na cineálacha sonraí SQL comhfhreagrach. [Dáta agus amstamp](#database-date-time-data) cásanna speisialta: úsáid ERDDAP 's sonraí dúbailte Cineál.
     
#### Bunachar Sonraí Ar Líne{#database-date-time-data} 
Tá roinnt colúin dáta bunachar sonraí aon crios ama follasach. Tá colúin den sórt sin trioblóide le haghaidh ERDDAP . Tacaíonn bunachair shonraí le coincheap dáta (le nó gan am) gan crios ama, mar raon ama thart. Ach Java   (agus dá bhrí sin ERDDAP ) Déileálann ach le dáta mheandarach + ama le crios ama. Mar sin, d'fhéadfá a fhios go bhfuil na sonraí ama dáta bunaithe ar chrios ama áitiúil (le nó gan am a shábháil daylight) nó an GMT / Zulu crios ama, ach Java   (agus ERDDAP ) nach bhfuil. Shíl muid ar dtús d'fhéadfadh muid ag obair ar fud an fhadhb seo (e.g, trí chrios ama a shonrú don cholún) , ach an bunachar sonraí + JDBC + Java rinne idirghníomhaíochtaí seo réiteach neamhiontaofa.
* Mar sin,, ERDDAP™ Éilíonn go stóráil tú gach dáta agus sonraí ama dáta sa tábla bunachar sonraí le cineál sonraí bunachar sonraí a fhreagraíonn don chineál JDBC "am le crios ama" (hidéalach, go n-úsáideann an GMT / Zulu crios ama) .
* I ERDDAP 's datasets.xml , sa&lt; dataVariable × chlib le haghaidh athróg lasc ama, leagtha
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

agus i&lt; addAttributes × leagtha síos
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Moltaí: Má tá na sonraí raon ama, tá sé úsáideach go mbeadh na luachanna amstamp tagairt do lár an raon ama intuigthe (mar shampla, meán lae) . Mar shampla, má tá sonraí ag úsáideoir le haghaidh 2010-03-26T13:00Z ó thacar sonraí eile agus ba mhaith leo na sonraí is gaire ó thacar sonraí a bhfuil sonraí acu le haghaidh gach lae, ansin na sonraí bunachar sonraí le haghaidh 2010-03-26T12:00Z (sonraí a léiriú don dáta sin) Is léir an chuid is fearr (i gcomparáid leis an meán oíche roimh nó tar éis, i gcás ina bhfuil sé níos lú soiléir is fearr) .
*    ERDDAP™ Tá fóntais a [Tiontaigh Numeric Am chun / ó String Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
* Féach ar [Conas ERDDAP Déileáil le Am](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
       
#### neamhsheachadadh{#integer-nulls-1} 
Databases tacaíocht nulls i slánuimhir (taiseachas aeir: fliuch) colúin, ach ERDDAP™ Ní thacaíonn neamhnithe fíor.
Beidh nulls Bunachar a thiontú i ERDDAP™ 127 do cholúin byte, 255 do cholúin ubyte, 32767 do cholúin ghearra, 65535 do cholúin ushort, 2147483647 do cholúin int, 4294967295 do cholúin uint, 9,223,372,036,854,775,807 do cholúin fhada, nó 18446744073709551615 do cholúin ulong. Má úsáideann tú na mainneachtainí sin, déan iad siúd a aithint missing\\_value s d'úsáideoirí na tacar sonraí i ERDDAP™ le

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

nó

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

Nó, is féidir leat an " a úsáid missing\\_value " tréith in ionad "\\_FillValue".
Sonraí a ghiniúint Xml Cuireann go huathoibríoch na tréithe \\_FillValue nuair a ghineann sé na molta datasets.xml le haghaidh tacar sonraí bunachar sonraí.

Chun bunachar sonraí colúin pointe snámh, nulls a thiontú go NaNs i ERDDAP .
Le haghaidh cineálacha sonraí bunachar sonraí a thiontú go Strings i ERDDAP™ , a fháil nulls thiontú go Stringsa folamh.
    
#### Bunachar Sonraí Slándáil{#database-security} 
* Nuair a bhíonn tú ag obair le bunachair shonraí, ní mór duit rudaí a dhéanamh chomh sábháilte agus go daingean agus is féidir a sheachaint ag ligean d'úsáideoir mailíseach damáiste a dhéanamh do bhunachar sonraí nó rochtain a fháil ar shonraí nár chóir dóibh rochtain a fháil ar. ERDDAP™ iarracht rudaí a dhéanamh ar bhealach slán, freisin.
    * Smaoinigh mhacasamhlú, ar ríomhaire difriúil, an bunachar sonraí agus táblaí bunachar sonraí leis na sonraí gur mian leat ERDDAP™ a sheirbheáil. (Sea, le haghaidh bunachair sonraí tráchtála cosúil Oracle , tá táillí ceadúnaithe breise i gceist leis seo. Ach do bhunachair sonraí foinse oscailte, cosúil le PostgreSQL, MySQL, Amazon RDS, agus MariaDB, costais seo rud ar bith.) Tugann sé seo duit leibhéal ard slándála agus freisin cosc ERDDAP™ iarratais ó slowing síos ar an mbunachar sonraí bunaidh.
    * Molaimid duit a chur ar bun ERDDAP™ ceangal leis an mbunachar sonraí mar úsáideoir bunachar sonraí nach bhfuil ach rochtain ar an **ábhartha eile** bunachar sonraí (s s) agus tá ach pribhléidí LÉIGH.
    * Molaimid duit a chur ar bun an nasc ó ERDDAP™ leis an mbunachar sonraí ionas go mbeidh sé
        * i gcónaí úsáideann SSL,
        * ach is féidir naisc ó seoladh IP amháin (nó bloc amháin seoltaí) agus as an ceann ERDDAP™ úsáideoir, agus
        * aistrithe ach pasfhocail ina bhfoirm hashed MD5.
    *    \\[ TIONSCADAL IOMLÁN \\] An nascProperties (lena n-áirítear an focal faire&#33;) a stóráil mar théacs plain i datasets.xml . Ní mór dúinn a fháil ar bhealach chun ligean don riarthóir chun dul isteach ar an focal faire bunachar sonraí le linn ERDDAP 's startup i Tomcat (a tharlaíonn gan ionchur úsáideora) , mar sin ní mór an focal faire a bheith inrochtana i gcomhad. Chun seo a dhéanamh níos sábháilte:
        * Tá tú (an ERDDAP™ internet marketing) Ba chóir go mbeadh úinéir datasets.xml agus tá rochtain READ agus WRITE acu.
        * Déan grúpa go n-áirítear ach úsáideoir = tomcat. Bain úsáid as chgrp a dhéanamh go bhfuil an grúpa do datasets.xml , le pribhléidí ach LÉIGH.
        * Úsáid chmod a shannadh pribhléidí o-rwx (aon rochtain READ nó WRITE d'úsáideoirí "eile") le haghaidh datasets.xml .
    * Nuair a bheidh i ERDDAP™ , an focal faire agus airíonna nasc eile a stóráil i "príobháideach" Java athróg.
    * Iarrataí ó chliaint parsed agus a sheiceáil le haghaidh bailíochta sula ghiniúint na hiarratais SQL don bhunachar sonraí.
    * Iarratais ar an mbunachar sonraí a dhéantar le SQL Ullmhaithe Stáit, chun cosc a chur [Instealladh SQL](https://en.wikipedia.org/wiki/SQL_injection) .
    * Iarratais ar an mbunachar sonraí a chur isteach le fhorghníomhú An tSraith Shinsearach (gan a fhorghníomhú Stáit) chun iarrataí ar léamh a theorannú (mar sin iarracht instealladh SQL a athrú ar an mbunachar sonraí theipeann ar an gcúis, freisin) .
         
#### SQL{#sql} 
* Mar gheall ar OPeNDAP 's iarratais sonraí tabular bhí deartha chun mimic SQL iarratais sonraí tabular, tá sé éasca le haghaidh ERDDAP™ a thiontú iarratais sonraí tabular i SQL simplí Ullmhaithe Stáit. Mar shampla, an ERDDAP™ a iarraidh
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
Beidh a thiontú isteach sa Saináite SQL
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
 ERDDAP™ iarratais le &amp; ar leith () agus/nó orderBy  ( *athsheoltóra* ) cuir DISTINCT agus/nó ORD AG *athsheoltóra* leis an ráiteas ullmhaithe SQL. Go ginearálta, cuirfidh sé seo moill mhór ar an bhfreagra ón mbunachar sonraí.
 ERDDAP™ logs an Ullmhaithe i [logáil isteach.](/docs/server-admin/additional-information#log) mar atá
```
    statement=*thePreparedStatement*  
```
Beidh sé seo ina léiriú téacs ar an Ullmhacht, a d'fhéadfadh a bheith beagán difriúil ó na Ullmhaithe iarbhír. Mar shampla, sa Ullmhacht, déantar amanna a ionchódú ar bhealach speisialta. Ach sa léiriú téacs, feiceann siad mar amanna dáta ISO 8601.
     
#### Bunachar Sonraí Luas{#database-speed} 
* Is féidir le bunachair sonraí a bheith mall. Tá roinnt rudaí is féidir leat a dhéanamh:
    * Go ginearálta -
Is é an cineál SQL go bhfuil ceisteanna [taiseachas aeir: fliuch](https://en.wikipedia.org/wiki/Declarative_programming) . Siad a shonrú ach cad ba mhaith leis an úsáideoir. Ní chuireann siad áireamh sonraíocht nó leideanna maidir leis an gcaoi a bhfuil an cheist a láimhseáil nó a bharrfheabhsú. Mar sin, níl aon bhealach le haghaidh ERDDAP™ a ghiniúint an cheist ar bhealach a chabhraíonn sé leis an mbunachar sonraí Optamaigh an cheist (nó ar bhealach ar bith a shonraíonn an chaoi a bhfuil an cheist a láimhseáil) . Go ginearálta, tá sé suas go dtí an riarthóir bunachar sonraí chun rudaí a chur ar bun (mar shampla, innéacsanna) a bharrfheabhsú do chineálacha áirithe fiosruithe.
##### Socraigh an Méid Fetch{#set-the-fetch-size} 
Bunachair shonraí ar ais ERDDAP™ i smután. De réir réamhshocraithe, bunachair sonraí éagsúla ar ais ar líon éagsúla sraitheanna sna smután. Is minic go bhfuil an uimhir seo an-bheag agus mar sin an-éifeachtach. Mar shampla, an réamhshocraithe le haghaidh Oracle Is 10&#33; Léigh an doiciméadú JDBC do do bhunachar sonraí tiománaí JDBC chun teacht ar an maoin nasc a shocrú chun é seo a mhéadú, agus seo a chur le cur síos ar an tacar sonraí i datasets.xml . Mar shampla,
Do MySQL agus Amazon RDS, úsáid
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
I gcás MariaDB, níl aon bhealach faoi láthair a athrú ar an méid beir. Ach tá sé ina ghné iarrtha, mar sin cuardach a dhéanamh ar an ngréasán a fheiceáil má tá sé seo curtha i bhfeidhm.
Le haghaidh Oracle , úsáid
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
Do PostgreSQL, úsáid
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
ach glaoch a athrú ar an uimhir. Beidh leagan amach an líon ró-mhór faoi deara ERDDAP™ go leor de chuimhne a úsáid agus a bheith níos dóichí a reáchtáil amach as cuimhne.
#### Naisc ábhartha eile{#connectionproperties} 
Tá airíonna nasc eile ag gach bunachar sonraí is féidir a shonrú i datasets.xml . Beidh go leor de na tionchar ar fheidhmíocht an bhunachar sonraí a ERDDAP™ nasc. Léigh an cháipéisíocht do do bhunachar sonraí JDBC tiománaí a fheiceáil na roghanna. Má fhaigheann tú airíonna nasctha atá úsáideach, seol ríomhphost leis na sonraí chun erd dot data at noaa dot gov .
* Déan Tábla --
Beidh tú a fháil dócha freagraí níos tapúla má tá tú go tréimhsiúil (gach lá? aon uair a bhfuil sonraí nua?) tábla iarbhír a ghiniúint (dul céanna leis an gcaoi a ghineann tú an VIEW) agus a insint ERDDAP™ sonraí a fháil ón tábla in ionad an VIEW. Ós rud é gur féidir aon iarraidh ar an tábla a chomhlíonadh ansin gan Smaoineamh tábla eile, beidh an freagra i bhfad níos tapúla.
* Fholúis an Tábla -
Beidh MySQL agus Amazon RDS freagra i bhfad níos tapúla má úsáideann tú [TÁBLA OPTIMIZ](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html) .
riachtanais uisce: measartha Beidh DB freagra i bhfad níos tapúla má úsáideann tú [TÁBLA OPTIMIZ](https://mariadb.com/kb/en/optimize-table/) .
Beidh PostgreSQL freagra i bhfad níos tapúla má tá tú [Seirbhís do Chustaiméirí](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html) an tábla.
     Oracle nach bhfuil nó is gá ordú ar anal.
* Déan teagmháil [Naisc ábhartha eile](https://en.wikipedia.org/wiki/Database_index) le haghaidh Variables Cothaithe --
Is féidir leat luas suas go leor / ceisteanna is mó ag innéacsanna a chruthú sa bhunachar sonraí do na hathróga (a bhunachair sonraí glaoch "colúin") atá srianta go minic i gceist an úsáideora. Go ginearálta, is iad seo na hathróga céanna sonraithe ag [&lt; subsetVariables ú (#subsetvariables) agus / nó an domhanleithead, domhanfhad, agus athróg ama.
##### Úsáid Ceangal Linn Snámha{#use-connection-pooling} 
De ghnáth, ERDDAP™ a dhéanann nasc ar leith leis an mbunachar sonraí do gach iarratas. Is é seo an cur chuige is iontaofa. Is é an rogha níos tapúla ná Sonraí a úsáid a thacaíonn le comhthiomsú nasc. A chur ar bun é, a shonrú (mar shampla)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
ceart in aice le&lt; sourceUrl ú,&lt;tiománaí Name bhéil, agus&lt;nasc nasc nasc nasc Maoin lasmuich.
Agus i *taiseachas aeir: fliuch* / conf/context.xml, acmhainn a shainiú leis an bhfaisnéis chéanna, mar shampla,
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
Tá eolas ginearálta faoi úsáid a bhaint as DataSource ag [https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html) .
Féach ar [Tomcat Sonraíource faisnéis](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources) agus [samplaí Tomcat DataSource](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html) nó cuardach a dhéanamh ar an ngréasán le haghaidh samplaí a úsáid DataSources le freastalaithe iarratais eile.
* Má theipeann ar gach ceann eile,
na sonraí a stóráil i mbailiúchán NetCDF v3 .nc comhaid comhad (go háirithe go háirithe .nc comhaid a úsáideann an [CF Diosca Geometris Sampling (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Is féidir struchtúir sonraí Ragged Contiguous Array agus mar sin a láimhseáil le ERDDAP 's [EDDTableFromNcCFFiles](#eddtablefromnccffiles) ) . Má tá siad eagraithe go loighciúil (gach ceann acu le sonraí le haghaidh smután de spás agus am) , ERDDAP™ is féidir le sonraí a bhaint astu go han-tapa.
         
#### EDDTableFromDatabase creatlach XML{#eddtablefromdatabase-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDatabase" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The format varies for each type of database, but will be  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;something like:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MariaDB:    jdbc:mariadb://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MySql       jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Amazon RDS: jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Oracle:     jdbc:oracle:thin:@*xxx.xxx.xxx.xxx*:1521:*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Postgresql: jdbc:postgresql://*xxx.xxx.xxx.xxx*:5432/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where *xxx.xxx.xxx.xxx* is the host computer's numeric IP address  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followed by :*PortNumber* (4 digits), which may be different for your  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[driverName](#jdbc-driver)\\>...&lt;/driverName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The high-level name of the database driver, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"org.postgresql.Driver".  You need to put the actual database  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;driver .jar file (for example, postgresql.jdbc.jar) in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*tomcat*/webapps/erddap/WEB-INF/lib.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#database-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "user", "password", and "ssl")  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and values of the properties needed for ERDDAP™ to establish  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the connection to the database.  0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataSourceName>](#use-connection-pooling)...&lt;/dataSourceName>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;catalogName>...&lt;/catalogName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the catalog which has the schema which has the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  OPTIONAL.  Some databases don't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;schemaName>...&lt;/schemaName> &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schema which has the table, default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName>  &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#quotes-for-names-and-case-sensitivity)&lt;columnNameQuotes> &lt;!-- OPTIONAL. Options:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" (the default), ', \\[nothing\\]. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderBy>...&lt;/orderBy>  &lt;!-- A comma-separated list of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[sourceName](#sourcename)s to be used in an ORDER BY clause at the end of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every query sent to the database (unless the user's request  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;includes an &orderBy() filter, in which case the user's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orderBy is used).  The order of the sourceNames is important.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The leftmost (first) sourceName is most important; subsequent  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are only used to break ties.  Only relevant  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are included in the ORDER BY clause for a given user  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;request.  If this is not specified, the order of the returned  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values is not specified. Default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanOrderBy>](#sourcecanorderby)no(default)|partial|yes&lt;/sourceCanOrderBy>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanDoDistinct>](#sourcecandodistinct)no(default)|partial|yes&lt;/sourceCanDoDistinct>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each dataVariable MUST include a [&lt;dataType>](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See [Database DataTypes](#database-datatype).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For [database date and timestamp columns](#database-date-time-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFrom EDDGrid  {#eddtablefromeddgrid} 
 [ **EDDTableFrom EDDGrid ** ](#eddtablefromeddgrid) ligeann duit tacar sonraí EDDTable a chruthú ó aon EDDGrid tacar sonraí.

* Tá roinnt cúiseanna coitianta a dhéanamh seo:
    * Ligeann sé seo an tacar sonraí a chuardach le OPeNDAP srianta a roghnú, a bhfuil cineál "query de réir luacha" (a d’fhéadfadh a bheith iarrtha ag úsáideoir) .
    * Is é an tacar sonraí bunúsach tacar sonraí tabular.
* Luach na tréithe domhanda "maxAxis0" (de ghnáth de chineál = "int") , (Níl an Tweet seo ar fáil) a úsáid chun teorainn a chur le líon na haise \\[ 0 0 \\]   (de ghnáth ar an "time" duille dath: glas) luachanna an iniata EDDGrid tacar sonraí is féidir a rochtain in aghaidh na hiarrata ar shonraí. Más rud é nach bhfuil tú ag iarraidh go mbeadh aon teorainn, a shonrú luach 0. Tá an suíomh seo tábhachtach mar, ar shlí eile, bheadh sé ró-éasca d'úsáideoir a iarraidh EDDTableFrom EDDGrid chun breathnú trí gach ceann de na sonraí tacar sonraí gridded ar. Bheadh sé sin a ghlacadh i bhfad agus go mbeadh beagnach theipeann cinnte le earráid timeout. Níl an Tweet seo ar fáil. EDDGrid datasets i do ERDDAP gan eagla go mbeidh siad mar thoradh ar úsáid mhíréasúnta na n-acmhainní ríomhaireachta.
* Má tá an iniata EDDGrid Is maith liom é [ EDDGrid An tSraith Shinsearach](#eddfromerddap) agus an ERDDAP™ Is é an gcéanna ERDDAP , ansin EDDTableFrom EDDGrid úsáid i gcónaí ar an leagan atá ar fáil faoi láthair den tacar sonraí tagartha go díreach. Is bealach an-éifeachtach é seo do EDDTableFrom EDDGrid rochtain a fháil ar na sonraí gridded.
* An rang seo [&lt;reload Gach Neamhghnách (#reloadeverynminutes) Is é an méid comhaireamh. An iniata EDDGrid 's&lt;Déantar neamhaird ar reloadEveryNMinutes.
* Má tá luach le haghaidh [&lt;updateEveryNMillis . (Tuilleadh roghanna...) ar fáil don tacar sonraí, tá sé neamhaird. An iniata EDDGrid 's&lt;updateEveryNMillis . cad ábhair.
*    [Socraigh mar teanga réamhshocraithe](#generatedatasetsxml) Tá rogha do chineál tacar sonraí = EDDTableFrom EDDGrid a iarrann an URL de ERDDAP   (de ghnáth mar an gcéanna ERDDAP )   (dar críoch i "/breise/") agus léiriú rialta. Sonraí a ghiniúint Beidh Xml ghiniúint ansin an XML do EDDTableFrom EDDGrid tacar sonraí do gach tacar sonraí gridded sa ERDDAP™ a bhfuil datasetID a oireann an abairt rialta (úsáid .\\* a mheaitseáil go léir datasetID s le haghaidh tacar sonraí gridded) .
    
Áirítear ar an smután de XML a ghintear ag GenerateDatasetsXml do gach tacar sonraí:
    
    * Amharc ar gach eolas datasetID is é an EDDGrid 's datasetID móide "\\_AsATable".
    * A tréith domhanda achoimre nua a bhfuil an EDDGrid 's achoimre móide an chéad mhír nua cur síos ar cad é an tacar sonraí seo.
    * A teideal nua tréith domhanda a bhfuil an EDDGrid 's teideal móide', (Mar Tábla) ".
    * A maxAxis0 nua tréith domhanda le luach de 10.
#### EDDTableFrom EDDGrid creatlach XML{#eddtablefromeddgrid-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromEDDGrid" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromEDDGrid, this calls lowUpdate() of the underlying  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGrid. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataset>](#eddgrid)...&lt;/dataset> &lt;!-- 1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Any type of EDDGrid dataset.  You can even use an  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EDDGridFromERDDAP™ to access an independent EDDGrid dataset on  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this server. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### Naisc ábhartha eile{#eddtablefromfilenames} 
 [ **Naisc ábhartha eile** ](#eddtablefromfilenames) Cruthaíonn tacar sonraí ó fhaisnéis faoi ghrúpa de chomhaid i gcóras comhaid an fhreastalaí, lena n-áirítear URL do gach comhad ionas gur féidir le húsáideoirí a íoslódáil na comhaid trí ERDDAP 's [ "files" córas córas](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) . Murab ionann agus na [EDDTableFromFiles](#eddtablefromfiles) fo-aicmí, ní dhéanann an cineál tacar sonraí seo sonraí a sheirbheáil ó laistigh de na comhaid.

* Tá EDDTableFromFileNames úsáideach nuair:
    * Tá tú grúpa de chomhaid gur mian leat a dháileadh mar chomhaid ar fad toisc nach bhfuil siad "sonraí" ar an mbealach céanna go bhfuil comhaid sonraí rialta sonraí. Mar shampla, comhaid íomhá, comhaid físe, doiciméid Word, comhaid scarbhileog Excel, comhaid i láthair PowerPoint, nó comhaid téacs le téacs neamhstruchtúrtha.
    * Tá tú grúpa de chomhaid a bhfuil sonraí i bhformáid go ERDDAP™ Ní féidir a léamh go fóill. Mar shampla, formáid tionscadail-sonrach, saincheaptha, dénártha.
         
#### Sonraí EDDTableFromFileNames{#eddtablefromfilenames-data} 
*    [Na sonraí i tacar sonraí EDDTableFromFileNames](#eddtablefromfilenames-data) Is tábla go ERDDAP™ Cruthaíonn ar-an-eitilt le faisnéis faoi ghrúpa de chomhaid áitiúla. Sa tábla, tá sraith le haghaidh gach comhad. Ceithre tréithe speisialta sna [ datasets.xml don tacar sonraí seo](#eddtablefromfilenames-skeleton-xml) a chinneadh cé na comhaid a bheidh san áireamh sa tacar sonraí seo:
    
##### comhad comhad An Roinn{#filedir} 
    *   &lt;comhad Dir uaire -- Sonraíonn sé seo an eolaire foinse i gcóras comhaid an fhreastalaí leis na comhaid don tacar sonraí. Na comhaid atá suite i ndáiríre i gcóras comhaid an fhreastalaí i&lt;Beidh fileDir uaire le feiceáil sa cholún url den tacar sonraí laistigh de eolaire fíorúil ainmnithehttps://*serverUrl*/erddap/files/*datasetID/*.
Mar shampla, má tá an datasetID Is maith liom é RSS T,
agus an&lt;Is é / baile / sonraí / mur/,
agus go bhfuil eolaire comhad ainmnithe jplMU RSS T20150103000000.png,
ansin beidh an URL a thaispeáint d'úsáideoirí don chomhad sin a
        https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png.
        
Chomh maith le húsáid eolaire áitiúil don&lt;fileDir uaire, Is féidir leat a shonrú chomh maith leis an URL ar iargúlta, eolaire-mhaith leathanach gréasáin. Oibríonn sé seo le:
        
        * Socruithe sonraí neamhchomhiomlánaithe i THREDDS, m.sh.,
            https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[ Clár na dToghthóirí Níl an freastalaí seo ar fáil go hiontaofa a thuilleadh. \\] 
        * Socraigh sonraí neamhchomhiomlánaithe i Hyrax , m.sh.,
             [https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/) 
        * An chuid is mó Apache-mhaith liostaí eolaire, m.sh.,
             [https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/) 
##### Go raibh maith agat{#fromonthefly} 
 [\\*\\*\\ *](#fromonthefly) -- I gcás roinnt buicéid S3 ollmhór (cosúil le noaa-goes17, a bhfuil 26 milliún comhad) , d'fhéadfadh sé a ghlacadh ERDDAP™ suas go dtí 12 uair an chloig a íoslódáil an t-eolas go léir faoi ábhar an buicéid (agus ansin tá fadhbanna eile) . Chun a fháil timpeall seo, tá bealach speisialta a úsáid&lt;fileDir uaire i EDDTableFromFileNames a dhéanamh tacar sonraí leis an eolaire agus ainmneacha comhaid ó buicéad AWS S3. Ní bheidh liosta de na heolairí buicéad S3 agus ainmneacha comhaid gur féidir le húsáideoir cuardach a dhéanamh trí iarrataí ar an tacar sonraí. Ach beidh an tacar sonraí a fháil ar ainmneacha na eolairí agus comhaid ar-an-eitilt má thrasnaíonn an t-úsáideoir an ordlathas eolaire leis an tacar sonraí ar "files" rogha. Dá bhrí sin, ligeann sé seo d'úsáideoirí a bhrabhsáil ordlathas agus comhaid an bhuicéad S3 tríd an tacar sonraí "files" córas. Chun seo a dhéanamh, in ionad an URL a shonrú le haghaidh an buicéad S3 mar an "Eolaire Starting" (i GenerateDatasets XLUMX) nó&lt;comhad a scriosadh (i datasets.xml ) , úsáid:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
mar shampla:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
Féach an doiciméadú le haghaidh [ag obair le Buckets S3 i ERDDAP™ ](#working-with-aws-s3-files) , go háirithe an cur síos ar an bhformáid ar leith nach mór a úsáid le haghaidh URL buicéad S3. Agus féach
 [na sonraí agus sampla](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket) a úsáid\\*\\*\\ * As an Fly.
        
##### tréimhse saoil: ilbhliantúil{#recursive} 
*   &lt;athchúrsach ú - Comhaid i bhfostiúrthóireachtaí&lt;fileDir uaire le hainmneacha a mheaitseáil&lt;Beidh fileRegex bhéil le feiceáil sna fo-stiúrthóirí céanna sa "files" URL más rud é&lt;Tá athchúrsach bhéil leagtha chun fíor. Tá an mhainneachtain bréagach.
* [EN]&lt;pathRegex ×) (Tuilleadh eolais) -- Má athchúrsach = fíor, ach ainmneacha eolaire a mheaitseáil leis an pathRegex (réamhshocraithe = ") glacfar leis. Má athchúrsach = False, tá sé seo neamhaird. Is annamh a úsáidtear é seo, ach is féidir é a bheith an-úsáideach in imthosca neamhghnácha. (Féach seo [doiciméadú regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) agus [riachtanais uisce: measartha](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
##### Déan teagmháil anois{#fileregex} 
*   &lt;comhadRegex × -- Ach na ainmneacha comhaid i gcás an ainm comhaid iomlán (gan an t-ainm eolaire san áireamh) mheaitseáil leis an&lt;Beidh comhadRegex uaire a chur san áireamh sa tacar sonraí. Mar shampla, jplMU RSS T. &#123;14&#125;\\.png . (Féach seo [doiciméadú regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) agus [riachtanais uisce: measartha](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .)   
         
##### Ó Ainmneacha Comhad Ábhar tábla Sonraí{#from-file-names-data-table-contents} 
Sa tábla, beidh colúin le:
* foirm duille: líneach An URL gur féidir le húsáideoirí a úsáid chun an comhad a íoslódáil tríd ERDDAP 's [ "files" córas córas](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) .
* ainm -- Ainm an chomhaid (gan ainm eolaire) .
* Athraithe go deireanach -- An t-am a athraíodh an comhad deireanach (stóráil mar dhúbailt le "seconds since 1970-01-01T00:00:00Z" ) . Tá an athróg úsáideach toisc gur féidir le húsáideoirí a fheiceáil más rud é / nuair a d'athraigh an t-ábhar comhad ar leith go deireanach. Is é seo an athróg [am trátha Athróg Stampa](#timestamp-variables) , mar sin d'fhéadfadh na sonraí le feiceáil mar luachanna uimhriúil (soicind ó 1970-01-T00:00:00Z) nó luach Curtain (ISO 8601:2004 (E) formáid formáid formáid) , ag brath ar an staid.
* méid -- Méid an chomhaid i bytes, a stóráil mar doubles. Déantar iad a stóráil mar dhúbailt toisc go bhféadfadh roinnt comhad a bheith níos mó ná mar a cheadaíonn insí agus ní thugtar tacaíocht i roinnt cineálacha comhaid freagartha. Beidh Doubles a thabhairt ar an méid cruinn, fiú le haghaidh comhaid an-mhór.
* colúin bhreise arna míniú ag an ERDDAP™ riarthóir le faisnéis a bhaintear as an ainm comhaid (mar shampla, an t-am a bhaineann leis na sonraí sa chomhad) bunaithe ar dhá tréithe a shonraíonn tú sna meiteashonraí do gach colún / dataVariable :
    
    * Sliocht Regex -- Is maith liom é [léiriú rialta](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [computer repair](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) . Ní mór don regex ar fad mheaitseáil leis an ainm comhaid ar fad (gan an t-ainm eolaire san áireamh) . Ní mór grúpa gabhála amháin ar a laghad a bheith san áireamh sa regex (cuid de léiriú rialta atá faoi iamh ag lúibíní) a bhfuil ERDDAP™ úsáidí a chinneadh cén chuid den ainm comhaid a bhaint as a bheith ina sonraí.
    * sliocht as sliocht Grúpa -- Is é seo líon an ghrúpa gabhála (#1 Is é an chéad ghrúpa gabhála) sa abairt rialta. Is é an réamhshocraithe 1. Tá grúpa gabhála ina chuid de léiriú rialta atá faoi iamh ag lúibíní.
    
Seo dhá shampla:
```
            <dataVariable>
                <sourceName>time</sourceName>
                <destinationName>time</destinationName>
                <dataType>String</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST(.{14})\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="units">yyyyMMddHHmmss</att>
                </addAttributes>
            </dataVariable>
```
```
            <dataVariable>
                <sourceName>day</sourceName>
                <destinationName>day</destinationName>
                <dataType>int</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST.{6}(..).{6}\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="ioos\\_category">Time</att>
                </addAttributes>
            </dataVariable> 
```
I gcás an athróg ama, má tá comhad an t-ainm jplMU RSS T20150103000000.png, beidh an sliochtRegex mheaitseáil leis an ainm comhaid, sliocht na carachtair a mheaitseáil leis an gcéad ghrúpa a ghabháil ("20150103000000") mar dataType = Tosaigh, ansin bain úsáid as an [aonaid oiriúnach do amanna teaghrán](#string-time-units) chun parse na teaghráin i luachanna sonraí ama (cliceáil grianghraf a mhéadú) .

I gcás an athraitheach lá, má tá comhad an t-ainm jplMU RSS T20150103000000.png, beidh an sliochtRegex mheaitseáil leis an ainm comhaid, sliocht na carachtair a mheaitseáil leis an gcéad ghrúpa a ghabháil ("03") mar atá&lt;dataType ×) (#cineál) \\ =int, ag tabhairt luach sonraí de 3.
        
#### irl - Library Service{#other-information} 
* Uimh.&lt;updateEveryNMillis . (Tuilleadh roghanna...) -- Ní gá an cineál tacar sonraí seo agus ní féidir é a úsáid&lt;updateEveryNMillis chlib mar gheall ar an t-eolas a sheirbheáil ag EDDTableFromFileNames i gcónaí breá suas chun dáta mar gheall ar ERDDAP™ ceisteanna a chur ar an gcóras comhaid chun freagra a thabhairt ar gach iarratas ar shonraí. Fiú má tá líon mór de na comhaid, ba chóir an cur chuige seo ag obair go réasúnta maith. D'fhéadfadh freagra a bheith mall má tá líon mór de na comhaid agus nach bhfuil an tacar sonraí curtha queried ar feadh tamaill. Ach ar feadh roinnt nóiméad tar éis sin, coimeádann an córas oibriúcháin an t-eolas i taisce, mar sin ba chóir freagraí a bheith an-tapa.
     
* Is féidir leat é a úsáid [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh ar an datasets.xml smután don chineál seo tacar sonraí. Is féidir leat colúin bhreise a chur / a shainmhíniú le faisnéis a bhaintear as an ainm comhaid, mar a thaispeántar thuas.
     
#### EDDTableFromFileNames creatlach XML{#eddtablefromfilenames-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromFileNames" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileDir>](#eddtablefromfilenames-data)...&lt;/fileDir>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;recursive>](#eddtablefromfilenames-data)...&lt;/recursive>  &lt;!-- true or false (the default) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileNameRegex>](#eddtablefromfilenames-data)...&lt;/fileNameRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include [&lt;dataType>](#datatype) tag. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromFiles{#eddtablefromfiles} 
 [ **EDDTableFromFiles** ](#eddtablefromfiles) Is é an rang Super de gach EDDTableFrom...Aicmí. Ní féidir leat úsáid a bhaint as EDDTableFromFiles go díreach. Ina áit sin, bain úsáid as fo-aicme EDDTableFromFiles chun an cineál comhaid ar leith a láimhseáil:

*    [EDDTableFromAsciiFiles](#eddtablefromasciifiles) comhiomlánaí sonraí ó chomhaid sonraí cluaisín-, tab-, leathstad-, nó spás-scartha comhaid sonraí ASCII tabular.
*    [EDDTableFrom AudioFiles](#eddfromaudiofiles) comhiomlánaí sonraí ó ghrúpa de chomhaid fuaime áitiúil.
*    [EDDTableFrom Seirbhís do Chustaiméirí](#eddtablefromawsxmlfiles) comhiomlánaí sonraí ó shraith de Stáisiún Aimsir Uathoibríoch (Amharc ar gach eolas) Comhaid XML.
*    [EDDTableFrom ColumnarAsciiFiles](#eddtablefromcolumnarasciifiles) comhiomlánaí sonraí ó chluaisín ASCII comhaid sonraí le colúin sonraí seasta-leithroinnte.
*    [EDDTableFrom Hyrax Amharc ar gach eolas](#eddtablefromhyraxfiles)   (DEPRECATE) comhiomlánaí sonraí le hathróga éagsúla, gach ceann acu le toisí roinnte (mar shampla, am, airde (nó doimhneacht) , domhanleithead, domhanfhad) , agus a sheirbheáil ag [ Hyrax   OPeNDAP freastalaí freastalaí](https://www.opendap.org/software/hyrax-data-server) .
*    [EDDTableFrom InvalidCRAFiles](#eddtablefrominvalidcrafiles) comhiomlánaithe sonraí ó NetCDF   (v3 nó v4)   .nc comhaid a úsáideann ar leith, neamhbhailí, leagan den CF DSG Dtiguous Ragged Array (irl - Library Service) comhaid. Cén fáth Cé ERDDAP™ Tacaíonn sé leis an gcineál comhaid seo, is cineál comhaid neamhbhailí é nár chóir do dhuine tosú ag úsáid. Moltar go láidir do ghrúpaí a úsáideann an cineál comhaid seo faoi láthair úsáid a bhaint as ERDDAP™ a ghiniúint bailí CF DSG comhaid CRA agus stop ag baint úsáide as na comhaid.
*    [Seirbhísí ar líne](#eddtablefromjsonlcsvfiles) comhiomlánaithe sonraí ó [JSON Línte comhaid CSV](https://jsonlines.org/examples/) .
*    [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) comhiomlánaithe sonraí ó NetCDF   (v3 nó v4)   .nc   (nó [ .nc ml ml](#ncml-files) ) comhaid le hathróga éagsúla, gach ceann acu le toisí roinnte (mar shampla, am, airde (nó doimhneacht) , domhanleithead, domhanfhad) .
*    [EDDTableFromNcFiles](#eddtablefromncfiles) comhiomlánaithe sonraí ó NetCDF   (v3 nó v4)   .nc   (nó [ .nc ml ml](#ncml-files) ) comhaid le hathróga éagsúla, gach ceann acu le toisí roinnte (mar shampla, am, airde (nó doimhneacht) , domhanleithead, domhanfhad) . Tá sé breá leanúint ar aghaidh ag baint úsáide as an gcineál tacar sonraí seo le haghaidh tacar sonraí atá ann cheana, ach le haghaidh tacar sonraí nua molaimid ag baint úsáide as EDDTableFromMultidimNcFiles ina ionad sin.
*    [EDDTableFromNcCFFiles](#eddtablefromnccffiles) comhiomlánaithe sonraí ó NetCDF   (v3 nó v4)   .nc   (nó [ .nc ml ml](#ncml-files) ) comhaid a úsáideann ceann de na formáidí comhaid sonraithe ag an [CF Diosca Geometris Sampling (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) coinbhinsiúin. Ach le haghaidh comhaid ag baint úsáide as ceann de na leaganacha CF multidimensional DSG, úsáid [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) ina ionad sin.
*    [Seirbhís do Chustaiméirí](#eddtablefromnccsvfiles) comhiomlánaithe sonraí ó [NCCSV](/docs/user/nccsv-1.00) ASCII .csv comhaid.
*    [EDDTableFromParquetFiles](#eddtablefromparquetfiles) Láimhseálann sonraí ó [An tIomlán](https://parquet.apache.org/) .
*    [Seirbhís do Chustaiméirí](#eddtablefromthreddsfiles)   (DEPRECATE) comhiomlánaí sonraí ó chomhaid le athróg roinnt le toisí roinnte sheirbheáil ag [TRIOMADÓIR OPeNDAP freastalaí freastalaí](https://www.unidata.ucar.edu/software/tds/) .
*    [EDDTableFrom WFS Amharc ar gach eolas](#eddtablefromwfsfiles)   (DEPRECATE) a dhéanann cóip áitiúil de na sonraí go léir ó ArcGIS Léarscáileanna WFS freastalaí mar sin is féidir na sonraí a chaomhnú go tapa chun ERDDAP™ úsáideoirí.

Faoi láthair, níl aon chineál comhaid eile tacaíocht. Ach tá sé de ghnáth réasúnta éasca tacaíocht a chur le haghaidh cineálacha comhaid eile. Déan teagmháil linn má tá iarratas agat. Nó, má tá do chuid sonraí i bhformáid comhad d'aois gur mhaith leat a bhogadh ar shiúl ó, molaimid athrú ar na comhaid a bheith NetCDF v3 .nc comhaid comhad (agus go háirithe .nc comhaid leis an [CF Diosca Geometris Sampling (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array struchtúr sonraí -- ERDDAP™ is féidir le sonraí a bhaint astu go tapa) . NetCDF Tá tacaíocht go forleathan, formáid dénártha, ceadaíonn rochtain randamach tapa ar na sonraí, agus tá tacaíocht cheana féin ag ERDDAP .

#### Seirbhísí ar líne{#fromfiles-details} 
Baineann an fhaisnéis seo a leanas le gach ceann de na fo-aicmí EDDTableFromFiles.
##### comhiomlánú{#aggregation} 
Comhiomlán an rang sonraí ó chomhaid áitiúla. Tá gach comhad a (réasúnta) tábla beag sonraí.
    * Is cosúil go bhfuil an tacar sonraí mar thoradh air amhail is dá mbeadh gach ceann de na táblaí an comhad curtha le chéile (gach ceann de na sraitheanna sonraí ó chomhad #1, móide na sraitheanna ó chomhad #2,...) .
    * Ní dhéanann na comhaid go léir a bhfuil gach ceann de na hathróga sonraithe. Más rud é nach bhfuil comhad ar leith athróg sonraithe, ERDDAP™ cuir luachanna ar iarraidh mar is gá.
    * Na hathróga i ngach ceann de na comhaid MUST bhfuil na luachanna céanna do na [ add\\_offset ](#scale_factor) , [ missing\\_value ](#missing_value) , [Táirgí gaolmhara Luach](#missing_value) , [ scale\\_factor ](#scale_factor) , agus [minicíocht uisce: flúirseach](#units) tréithe (más ann) . ERDDAP™ seiceálacha, ach is tástáil neamhfhoirfe é - má tá luachanna éagsúla ann, ERDDAP Níl a fhios atá ceart agus dá bhrí sin a bhfuil comhaid neamhbhailí. Más fadhb é seo, d'fhéadfá a bheith in ann é a úsáid [An tIomlán](#ncml-files) nó [ NCO ](#netcdf-operators-nco) a shocrú ar an bhfadhb.
         
##### Comhbhrúite Comhaid{#compressed-files} 
Is féidir leis na comhaid sonraí foinse do gach fo-aicmí EDDTableFromFiles a comhbhrúite go seachtrach (e.g., .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 , nó .Z) . Féach an [Doiciméadú Comhaid atá comhbhrúite go seachtrach](#externally-compressed-files) .
     
##### Eolas faoin gComhad{#cached-file-information-1} 
* Nuair a bhíonn tacar sonraí EDDTableFromFiles luchtaithe den chéad uair, léann EDDTableFromFiles faisnéis ó gach ceann de na comhaid ábhartha agus cruthaíonn sé táblaí (sraith amháin do gach comhad) le faisnéis faoi gach comhad bailí agus gach "bad" (éagsúil nó neamhbhailí) comhad.
    * Na táblaí a stóráil freisin ar diosca, mar NetCDF v3 .nc comhaid i *Treoir do Thuismitheoirí* / tacar sonraí / *cliceáil grianghraf a mhéadú* / Baile * datasetID * / i gcomhaid ainmnithe:
minicíocht uisce: flúirseach .nc   (a bhfuil liosta de na hainmneacha eolaire ar leith) ,
comhad comhad Tábla Tábla .nc   (a bhfuil an tábla le gach comhad bailí ar fhaisnéis) ,
taiseachas aeir: fliuch .nc   (a bhfuil an tábla le gach comhad dona faisnéise) .
    * Chun dlús a chur le rochtain ar tacar sonraí EDDTableFromFiles (ach ar chostas níos mó cuimhne a úsáid) , is féidir leat é a úsáid
[EN]&lt;comhad a stóráil&lt;/ fileTableInMemory ×) (Tuilleadh eolais)   
a insint ERDDAP™ cóip de na táblaí faisnéise comhad a choinneáil i gcuimhne.
    * Tá an chóip de na táblaí eolais comhad ar diosca úsáideach freisin nuair ERDDAP™ Tá stoptar síos agus atosú: Sábhálann sé EDDTable FromFiles from have to re-read all of the data files.
    * Nuair a dhéantar tacar sonraí a athlódáil, ERDDAP™ ní mór ach na sonraí a léamh i gcomhaid agus comhaid nua a d'athraigh.
    * Má tá comhad struchtúr difriúil ó na comhaid eile (mar shampla, cineál sonraí éagsúla do cheann de na hathróga, nó luach difriúil don " [minicíocht uisce: flúirseach](#units) " tréith) , ERDDAP Cuireann an comhad leis an liosta de na comhaid "bad". Beidh faisnéis faoin bhfadhb leis an gcomhad a scríobh chuig an *Treoir do Thuismitheoirí* / logs / log.txt comhad.
    * Ní mór duit riamh a scriosadh nó ag obair leis na comhaid. Is eisceacht amháin: má tá tú ag déanamh fós athruithe ar tacar sonraí datasets.xml thus, b'fhéidir gur mhaith leat a scriosadh na comhaid a bhfeidhm ERDDAP™ a reread gach ceann de na comhaid ó beidh na comhaid a léamh / a léiriú difriúil. Má tá tú riamh gá a scriosadh na comhaid, is féidir leat é a dhéanamh nuair ERDDAP™ Tá sé ag rith. (Ansin a leagtar [bratach bratach](/docs/server-admin/additional-information#set-dataset-flag) a athlódáil an ASAP tacar sonraí.) Mar sin féin, ERDDAP™ de ghnáth fógraí go bhfuil an datasets.xml Ní faisnéis mheaitseáil leis an gcomhad Eolas Tábla agus scriosann na táblaí comhad go huathoibríoch.
    * Más mian leat a spreagadh ERDDAP™ an fhaisnéis atá stóráilte a nuashonrú (mar shampla, má tá tú díreach leis, a bhaint, nó d'athraigh roinnt comhaid chuig an tacar sonraí eolaire sonraí) , bain úsáid as an [córas bratach](/docs/server-admin/additional-information#flag) a chur i bhfeidhm ERDDAP™ a thabhairt cothrom le dáta an t-eolas comhad i dtaisce.
         
##### Iarratas ar Láimhseáil{#handling-requests-1} 
*    ERDDAP™ Is féidir le hiarratais sonraí tabular srianta a chur ar aon athróg.
    * Nuair a dhéantar iarratas cliant ar shonraí a phróiseáil, is féidir le EDDTableFromFiles breathnú go tapa ar an tábla leis an eolas comhaid bailí a fheiceáil a d'fhéadfadh sonraí ábhartha a bheith ag comhaid. Mar shampla, má tá na sonraí ag gach comhad foinse le haghaidh baoi seasta amháin, is féidir le EDDTableFromFiles a chinneadh go héifeachtach cé na comhaid a d'fhéadfadh sonraí a bheith acu laistigh de raon fada áirithe agus raon domhanleithead.
    * Toisc go n-áirítear an tábla faisnéise comhad bailí an luach íosta agus uasta de gach athróg do gach comhad bailí, Is féidir EDDTableFromFiles láimhseáil go minic ceisteanna eile go héifeachtach go leor. Mar shampla, más rud é nach bhfuil braiteoir brú aeir ag cuid de na baoithe, agus go n-iarrann cliant sonraí maidir le haerPressure&#33;=NaN, is féidir le EDDTableFromFiles a chinneadh go héifeachtach a bhfuil sonraí brú aeir ag baoithe.
         
##### Nuashonrú an Eolas Comhad Cached{#updating-the-cached-file-information-1} 
Aon uair a bhíonn an tacar sonraí athluchtaithe, tá an t-eolas comhad a taisceadh cothrom le dáta.
    
* Déantar an tacar sonraí a athlódáil go tréimhsiúil de réir mar a chinnfidh an&lt;reloadEveryNMinutes ^ in eolas an tacar sonraí i datasets.xml .
* Déantar an tacar sonraí a athlódáil a luaithe is féidir aon uair ERDDAP™ bleachs go bhfuil tú leis, a bhaint, [cineál gas: in airde](https://en.wikipedia.org/wiki/Touch_(Unix) ) (a athrú ar an comhad deireanach Am Athraithe) , nó d'athraigh comhad sonraí.
* Déantar an tacar sonraí a athlódáil a luaithe is féidir má úsáideann tú an [córas bratach](/docs/server-admin/additional-information#flag) .

Nuair a dhéantar an tacar sonraí a athlódáil, ERDDAP™ i gcomparáid leis na comhaid atá ar fáil faoi láthair ar an tábla faisnéise comhad i dtaisce. Comhaid nua a léamh agus a chur leis an tábla comhaid bailí. Comhaid nach bhfuil ann a thuilleadh a thit as an tábla comhaid bailí. Comhaid ina bhfuil an t-amstamp comhad a athrú a léamh agus a n-eolas cothrom le dáta. Na táblaí nua in ionad na táblaí d'aois i gcuimhne agus ar diosca.
     
##### Bad Comhaid{#bad-files-1} 
An tábla comhaid dona agus na cúiseanna a dearbhaíodh na comhaid dona (comhad truaillithe, athróg ar iarraidh, luachanna ais mícheart, etc.) Tá ríomhphost chuig an ríomhphost Gach rud Seoladh ríomhphoist (is dócha go bhfuil tú) gach uair a athlódáiltear an tacar sonraí. Ba chóir duit na comhaid seo a athsholáthar nó a dheisiú a luaithe is féidir.
     
##### Athróga Missing{#missing-variables-1} 
Más rud é nach bhfuil roinnt de na comhaid a bhfuil cuid de na dataVariable s sainithe sa tacar sonraí datasets.xml smután, sin ceart go leor. Nuair a léann EDDTableFromFiles ar cheann de na comhaid, beidh sé ag gníomhú amhail is dá mbeadh an comhad athróg, ach le gach luachanna ar iarraidh.
     
##### Near Sonraí Am Real{#near-real-time-data} 
* Déileálann EDDTableFromFiles le hiarratais ar shonraí an-luath mar chás speisialta. An fhadhb: Má tá na comhaid a dhéanamh suas an tacar sonraí cothrom le dáta go minic, is dócha nach mbeidh an tacar sonraí a thabhairt cothrom le dáta gach uair a comhad a athrú. Mar sin, ní bheidh EDDTableFromFiles bheith ar an eolas faoi na comhaid athraithe. (D'fhéadfá úsáid a bhaint as [córas bratach](/docs/server-admin/additional-information#flag) , ach d'fhéadfadh sé seo mar thoradh ar ERDDAP™ athlódáil an tacar sonraí beagnach go leanúnach. Mar sin, i bhformhór na gcásanna, ní féidir linn é a mholadh.) Ina áit sin, Déileálann EDDTableFromFiles leis seo ag an gcóras seo a leanas: Nuair a bheidh ERDDAP™ faigheann sé iarratas ar shonraí laistigh den 20 uair dheireanach (mar shampla, 8 uair an chloig ó shin go dtí Anois) , ERDDAP™ beidh cuardach a dhéanamh ar gach comhad a bhfuil aon sonraí sna 20 uair an chloig anuas. Dá bhrí sin, ERDDAP™ Ní gá go mbeadh sonraí cothrom le dáta breá do gach ceann de na comhaid chun teacht ar na sonraí is déanaí. Ba chóir duit a leagtar fós [&lt;reload Gach Neamhghnách (#reloadeverynminutes) le luach réasúnta beag (mar shampla, 60) , ach nach bhfuil sé a bheith beag bídeach (mar shampla, 3) .
     
    *    **Gan a bheith molta** eagrú sonraí in aice-réad-am sna comhaid: Más rud é, mar shampla, go bhfuil tú tacar sonraí a stóráil sonraí do stáisiúin iomadúla (nó baoi, nó trajectory,...) ar feadh blianta fada, d'fhéadfá a shocrú ar na comhaid ionas go, mar shampla, tá comhad amháin in aghaidh an stáisiúin. Ach ansin, gach uair sonraí nua do stáisiún thagann, caithfidh tú a léamh comhad mór d'aois agus scríobh comhad mór nua. Agus nuair ERDDAP™ reloads an tacar sonraí, fógraí sé go bhfuil roinnt comhaid a mhodhnú, mar sin léann sé na comhaid sin go hiomlán. Tá sé sin neamhéifeachtach.
         
    *    **Molta** eagrú sonraí in aice-réad-am sna comhaid: Stóráil na sonraí i smután, mar shampla, na sonraí go léir do stáisiún amháin / bhaoi / trajectory do bhliain amháin (nó mí amháin) . Ansin, nuair a thagann datum nua, ach an comhad leis na bliana seo (nó mí ar) sonraí difear.
        
        * Fearr: Úsáid Úsáid Úsáidte NetCDF v3 .nc comhaid le gné neamhtheoranta (am trátha) . Ansin, a chur leis na sonraí nua, is féidir leat a chur i gceangal ach na sonraí nua gan a bheith a léamh agus a athscríobh an comhad ar fad. Déantar an t-athrú go héifeachtach agus go bunúsach adamhach, mar sin níl an comhad riamh i stát neamhréireach.
        * Seachas sin: Más rud é nach bhfuil tú / nach féidir a úsáid .nc comhaid le gné neamhtheoranta (am trátha) , ansin, nuair is gá duit a chur sonraí nua, caithfidh tú a léamh agus a athscríobh an comhad ar fad difear (dóchasach beag toisc go bhfuil sé ach bliain ar (nó mí ar) fiú sonraí) . Fortunately, gach ceann de na comhaid le blianta roimhe (nó míonna) don stáisiún sin gan athrú.
        
Sa dá chás, nuair ERDDAP™ reloads an tacar sonraí, an chuid is mó de na comhaid gan athrú; ach cúpla, tá comhaid bheaga athraithe agus is gá a léamh.
         
##### irl - Library Service{#directories-1} 
Is féidir na comhaid a bheith i eolaire amháin, nó i eolaire agus a fo-stiúrthóirí (riachtanais uisce: measartha) . Má tá líon mór de chomhaid (mar shampla, ^1,000) , an córas oibriúcháin (agus dá bhrí sin EDDTableFromFiles) a oibriú i bhfad níos éifeachtaí má stóráil tú na comhaid i sraith fo-stiúrthóirí (ceann amháin in aghaidh na bliana, nó ceann in aghaidh na míosa do thacair sonraí le comhaid an-minic) , ionas nach bhfuil líon mór de na comhaid i eolaire ar leith.
     
##### Eolaire cianda agus Iarratais Raon HTTP{#remote-directories-and-http-range-requests-1} 
*    **Eolaire cianda agus Iarratais Raon HTTP**   (AKA Forte Freastal, Iarratais Raon Byte) --
     EDDGrid Is féidir le FromNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles, agus EDDTableFromNcCFFiles, sonraí a sheirbheáil uaireanta ó .nc comhaid ar freastalaithe iargúlta agus rochtain trí HTTP má thacaíonn an freastalaí [Freastal ar an láthair](https://en.wikipedia.org/wiki/Byte_serving) trí iarratais raon HTTP (an mheicníocht HTTP le haghaidh byte ag freastal) . Níl an Tweet seo ar fáil (a bhfuil ERDDAP™ úsáidí a léamh .nc comhaid comhad) tacaíochtaí sonraí léitheoireachta ó iargúlta .nc comhaid trí iarratais raon HTTP.
    
     **Ná déan é seo&#33;**   
Ina áit sin, bain úsáid as an [&lt;córas eHouse4 (Tuilleadh roghanna...) .
    
##### Seirbhís do Chustaiméirí{#cachefromurl} 
* [EN] ** &lt;riachtanais uisce: measartha ** ] (Tuilleadh roghanna...) - - - - -
Gach duine EDDGrid Ó Fianáin agus gach tacar sonraí EDDTableFromFiles tacú le sraith clibeanna a insint ERDDAP™ a íoslódáil agus a choimeád ar bun cóip de gach ceann de na comhaid tacar sonraí iargúlta, nó taisce de roinnt comhaid (íoslódáil de réir mar is gá) . **Is gné thar a bheith úsáideach é seo.** 
    * An bhfuil&lt;taisceFromUrl ^ ligeann chlib tú a shonrú URL le liosta de na comhaid tacar sonraí iargúlta ó liosta comhad iargúlta.
        
        * Socruithe sonraí neamhchomhiomlánaithe i THREDDS, m.sh.,
            https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[ Clár na dToghthóirí Níl an freastalaí seo ar fáil go hiontaofa a thuilleadh. \\] 
        * Socraigh sonraí neamhchomhiomlánaithe i Hyrax , m.sh.,
             [https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/) 
        * An chuid is mó Apache-mhaith liostaí eolaire, m.sh.,
             [https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/) 
        * buicéid S3, e.g,
             [https://noaa-goes17.s3.us-east-1.amazonaws.com/](https://noaa-goes17.s3.us-east-1.amazonaws.com/)   
Mar sin féin, d'fhéadfadh sé seo a cheangal ar chuntas AWS agus thus níos mó.
Féach ar [ag obair le Buckets S3 i ERDDAP™ ](#working-with-aws-s3-files) .
Chomh maith leis sin, ní gá duit de ghnáth taisce a úsáid FromUrl le comhaid i buicéid S3 má tá na comhaid ASCII comhaid (e.g.,) , mar gheall ar ERDDAP™ is féidir na sonraí a léamh go héifeachtach ón mbucket go díreach trí shruth.
        
         ERDDAP™ Beidh cóip nó taisce na comhaid seo sa tacar sonraí&lt;fileDir uaire eolaire. Más gá duit tacaíocht do chineál eile liosta comhaid iargúlta (e.g., FTP) , le do thoil ríomhphost d'iarratas chuig Chris. John ag noaa.gov.
        
        * An luach réamhshocraithe don&lt;Tá chlibFromUrl bhéil neamhní. Mura sonraíonn tú luach don&lt;tag, Ní bheidh an córas cóip / cache a úsáid le haghaidh an tacar sonraí.
        * Má tá an tacar sonraí&lt;comhadRegex Is suíomh rud éigin eile seachas .\\*, ERDDAP™ beidh íoslódáil ach comhaid a mheaitseáil leis an comhadRegex.
        * Má tá an tacar sonraí&lt;Tá athchúrsach lí leagan fíor agus na comhaid iargúlta i subdirectories, ERDDAP™ beidh cuma i bhfostiúrthóirí iargúlta a mheaitseáil leis an tacar sonraí [&lt;pathRegex ×) (Tuilleadh eolais) , a chruthú ar an struchtúr eolaire céanna go háitiúil, agus a chur ar na comhaid áitiúla sna fostiúrthóirí céanna.
        * I Géiniteacha Xml, má shonraíonn tú&lt;luach, cineál An tSraith Shinsearach Beidh Xml chruthú áitiúil&lt;fileDir lí eolaire agus cóip 1 comhad iargúlta isteach é. Sonraí a ghiniúint Beidh Xml ghiniúint ansin datasets.xml smután bunaithe ar an comhad sampla (sampla a shonrú Comhad = nothing) .
        * Má tá an fhoinse sonraí iargúlta ERDDAP™ , úsáid [ EDDGrid An tSraith Shinsearach](#eddfromerddap) nó [EDDTableFromErddap](#eddfromerddap) in ionad&lt;taisceFromUrl . Ar an mbealach sin, do áitiúil ERDDAP™ beidh sé le feiceáil go bhfuil an tacar sonraí ach ní gá a stóráil aon cheann de na sonraí go háitiúil. An chúis amháin a úsáid&lt;a fháil sonraí ó iargúlta ERDDAP™ Is nuair a bhfuil tú ar chúis éigin eile cén fáth gur mhaith leat go mbeadh cóip áitiúil de na comhaid sonraí. Sa chás sin:
            * Déanfaidh an tacar sonraí seo iarracht síntiús a íoc leis an tacar sonraí ar an iargúlta ERDDAP ionas go mbeidh athruithe ar an tacar sonraí glaoch ar an tacar sonraí bratach Url, is cúis leis an tacar sonraí áitiúil a athlódáil agus a íoslódáil na comhaid iargúlta athraithe. Dá bhrí sin, beidh an tacar sonraí áitiúil cothrom le dáta go han-luath tar éis athruithe a dhéanamh ar an tacar sonraí iargúlta.
            * Ba chóir duit ríomhphost a sheoladh chuig an riarthóir an iargúlta ERDDAP™ a iarraidh ar an datasets.xml don tacar sonraí iargúlta ionas gur féidir leat a dhéanamh ar an tacar sonraí i do áitiúil ERDDAP™ breathnú cosúil leis an tacar sonraí san iargúlta ERDDAP .
        * Má tá an fhoinse sonraí iargúlta ERDDAP™ , déanfaidh an tacar sonraí áitiúil iarracht síntiús a íoc leis an tacar sonraí iargúlta.
            * Má éiríonn an síntiús, aon uair an iargúlta ERDDAP athluchtú agus tá sonraí nua, beidh sé i dteagmháil leis an flagURL don tacar sonraí, is cúis é a athlódáil agus a íoslódáil na comhaid sonraí nua agus / nó athrú.
            * Má theipeann ar an síntiús (ar chúis ar bith) nó más mian leat ach a chinntiú go bhfuil an tacar sonraí áitiúil cothrom le dáta, is féidir leat a shocrú [bratach bratach](/docs/server-admin/additional-information#flag) don tacar sonraí áitiúil, mar sin beidh sé athlódáil, mar sin beidh sé ag seiceáil le haghaidh comhaid sonraí iargúlta nua agus / nó athrú.
        * Mura bhfuil an fhoinse sonraí iargúlta ERDDAP : Beidh an tacar sonraí a sheiceáil le haghaidh comhaid nua agus / nó athraigh iargúlta aon uair a reloads sé. De ghnáth, tá sé seo á rialú ag [&lt;reload Gach Neamhghnách (#reloadeverynminutes) . Ach má tá a fhios agat nuair a bhíonn comhaid iargúlta nua, is féidir leat a leagtar [bratach bratach](/docs/server-admin/additional-information#flag) don tacar sonraí áitiúil, mar sin beidh sé a athlódáil agus a sheiceáil le haghaidh nua agus / nó comhaid sonraí iargúlta athrú. Má tharlaíonn sé seo go rialta ag am áirithe den lá (e.g., ag 7am) , is féidir leat a dhéanamh post cron a úsáid curl dul i dteagmháil leis an bhratach Url don tacar sonraí, mar sin beidh sé a athlódáil agus a sheiceáil le haghaidh nua agus / nó comhaid sonraí iargúlta athrú.
    * An bhfuil&lt;Sonraíonn taisceSizeGB lí chlib méid an taisce áitiúil. Is dócha gur gá duit é seo a úsáid nuair a bhíonn tú ag obair le córais stórála scamall ar nós [Seirbhís do Chustaiméirí](https://aws.amazon.com/s3/) is córas stórála a úsáidtear go coitianta atá mar chuid de [Seirbhísí Gréasáin Amazon (Amharc ar gach eolas) ](https://aws.amazon.com/) . Is é an réamhshocraithe -1.
        * Má tá an luach&lt;= 0 (e.g., luach réamhshocraithe -1) ,
             ERDDAP™ a íoslódáil agus a chothabháil **cóip iomlán** de gach ceann de na comhaid tacar sonraí iargúlta sa tacar sonraí ar&lt;comhad Dir bhéil.
            * Is é seo an suíomh atá molta nuair is féidir.
            * Gach uair a dhéantar an tacar sonraí a athlódáil, cuireann sé i gcomparáid le hainmneacha, méideanna, agus amanna athdhéanta de na comhaid iargúlta agus na comhaid áitiúla, agus íoslódálann sé aon chomhaid iargúlta atá nua nó athraithe.
            * Má imíonn comhad a bhí ar an bhfreastalaí iargúlta, ERDDAP™ ní dhéanfaidh sé an comhad áitiúil comhfhreagrach a scriosadh (ar shlí eile, má bhí rud éigin mícheart go sealadach leis an bhfreastalaí iargúlta, ERDDAP™ D'fhéadfadh roinnt nó gach ceann de na comhaid áitiúla a scriosadh&#33;) .
            * Leis an suíomh seo, de ghnáth beidh tú a leagtar&lt;updateEveryNMillis -1, ós rud é go bhfuil an tacar sonraí ar an eolas faoi nuair a chóipeáil sé comhaid sonraí nua i bhfeidhm.
        * Má tá an luach ^0,
             ERDDAP™ beidh comhaid a íoslódáil ón tacar sonraí iargúlta mar is gá i áitiúil **taisce taisce taisce** (sa tacar sonraí&lt;comhad Dir 3) le méid tairsí den líon sonraithe sin GB.
            * Ní mór an taisce a bheith mór go leor a shealbhú ar a laghad roinnt comhaid sonraí.
            * Go ginearálta, an níos mó an taisce, an níos fearr, toisc go mbeidh an chéad comhad sonraí eile a iarrtar a bheith níos mó seans ann cheana féin sa taisce.
            * Ba chóir Caching a úsáid ach amháin nuair a ERDDAP™ ag rith i freastalaí ríomhaireachta scamall (e.g.) agus na comhaid iargúlta i gcóras stórála scamall (e.g., AWS S3) .
            * Nuair a théann an spás diosca a úsáideann na comhaid áitiúla taisce Méid GB, ERDDAP™ go luath (b'fhéidir nach bhfuil láithreach) roinnt de na comhaid i dtaisce a scriosadh (faoi láthair, bunaithe ar an Léas Úsáidte le déanaí (Leathanach Main) algartam algartam algartam) go dtí go bhfuil an spás diosca a úsáideann na comhaid áitiúla&lt;0.75 * cacheSizeGB (an "goal") . Sea, tá cásanna ina ndéanann LRU an-dona - níl aon algartam foirfe.
            *    ERDDAP™ Ní bheidh iarracht a scriosadh comhad i dtaisce go ERDDAP™ thosaigh a úsáid sa deireanach 10 soicind. Is é seo an córas neamhfhoirfe chun déileáil leis an gcóras taisce agus an córas léitheoir comhad sonraí a bheith comhtháite ach loosely. Mar gheall ar an riail seo, ERDDAP™ Ní féidir a bheith in ann a scriosadh go leor comhaid a bhaint amach a sprioc, agus sa chás sin beidh sé a phriontáil WARNING chun an comhad log.txt, agus beidh an córas dramhaíola a lán ama ag iarraidh a prune an taisce, agus is féidir go bhféadfadh an méid de na comhaid sa taisce níos mó go mór ná an taisceSizeGB. Má tharlaíonn sé seo riamh, úsáid a bhaint as leagan taisceSizeGB níos mó don tacar sonraí.
            * Faoi láthair, ERDDAP™ Riamh seiceálacha má tá an freastalaí iargúlta leagan níos nuaí de chomhad atá sa taisce áitiúil. Má theastaíonn an ghné seo uait, cuir ríomhphost chuig Chris. John ag noaa.gov.
        * Cé go bhféadfadh an úsáid a bhaint as na hainmneacha chlib céanna le tuiscint go n-úsáideann an córas cóip agus an córas taisce an córas bunúsach céanna, nach bhfuil ceart.
            * Tosaíonn an córas cóip go réamhghníomhach tascanna tascTrí a íoslódáil comhaid nua agus athrú gach uair a bhfuil an tacar sonraí a athlódáil. Níl ach comhaid a chóipeáil iarbhír chuig an eolaire áitiúil ar fáil tríd an ERDDAP™ tacar sonraí.
            * Faigheann an córas taisce an liosta comhaid iargúlta gach uair go bhfuil an tacar sonraí athluchtaithe agus ligean go bhfuil gach ceann de na comhaid ar fáil tríd an ERDDAP™ tacar sonraí. Interestingly, gach ceann de na comhaid iargúlta le feiceáil fiú i na tacar sonraí / comhaid / leathanaigh ghréasáin agus tá siad ar fáil le híoslódáil (Cé b'fhéidir ach amháin tar éis moill cé go bhfuil an comhad a íoslódáil ar dtús ón bhfreastalaí iargúlta leis an taisce áitiúil.) 
        * D'fhéadfadh Datasets a úsáideann taisceSizeGB leas a bhaint as úsáid a bhaint as [Níl an Tweet seo ar fáil](#nthreads) leagan níos mó ná 1, toisc go mbeidh sé seo ar chumas an tacar sonraí a íoslódáil níos mó ná 1 comhad iargúlta ag an am.
    * An bhfuil&lt;Is taiscePartialPathRegex chlib is annamh a úsáidtear chlib is féidir a shonrú ar rogha eile do na tacar sonraí [&lt;pathRegex ×) (Tuilleadh eolais) . Tá an réamhshocraithe ar neamhní.
        * Ach é seo a úsáid má tá tú ag chóipeáil an tacar sonraí ar fad tríd an réamhshocraithe&lt;taisceSizeGB lí luach -1. Le&lt;taisceSizeGB × luachanna ×1, beidh sé seo a neamhaird toisc go bhfuil sé neamhsensical.
        * Féach [an cháipéisíocht le haghaidh&lt;pathRegex ×) (Tuilleadh eolais) le haghaidh treoir maidir le conas a thógáil ar an regex.
        * Má shonraítear é seo, úsáidfear é gach uair a athlódáiltear an tacar sonraí, ach amháin an chéad uair a athlódáiltear tacar sonraí ag tús na míosa.
        * Tá sé seo úsáideach nuair a bhíonn an tacar sonraí iargúlta stóráilte i labyrinth de subdirectories agus nuair an chuid is mó de na comhaid annamh, más rud é riamh, athrú. (a)&lt;casacht NASA&lt;cough) D'fhéadfá, mar shampla, a shonrú&lt;Cóipeáil nasc leis an tweet Leabaigh an Tweet . Tá na regexes an- tricky a shonrú, mar ní mór gach ceann de na hainmneacha cosán páirteach agus iomlán mheaitseáil leis an&lt;taiscePartialPathRegex × agus mar gheall ar an&lt;Ní mór a bheith ag obair le URLanna iargúlta agus na heolairí áitiúla. Is sampla saol fíor:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
Tá an URL sampla thuas comhaid i subdirectories bunaithe ar bhliain (e.g., 2018) agus lá na bliana (e.g., 001, 002, ..., 365 nó 366) .
Nóta go bhfuil an&lt;cineál ithreach: loam ghainmheach Tosaíonn le .\\*,
ansin tá subdirectory ar leith atá coitianta leis na URLanna iargúlta agus na heolairí áitiúla, m.sh., /v4\\.1/
ansin tá sraith de ghrúpaí ghabháil neadaithe i gcás ina bhfuil an chéad rogha aon rud
agus is luach sonrach é an dara rogha.
            
Ní bheidh an sampla thuas comhoiriúnach ach le heolairí don dara 10 lá de 2018, e.g.
            https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[ Clár na dToghthóirí Níl an freastalaí seo ar fáil go hiontaofa a thuilleadh. \\]   
agus lá 011, 012, ..., 019.
             (Féach seo [doiciméadú regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) agus [riachtanais uisce: measartha](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .)   
Más gá duit cabhair a chruthú&lt;taiscePartialPathRegex ×, le do thoil ríomhphost chuig an&lt;Conas a oibríonn sé? John ag noaa.gov.
            
        * Cur chuige coiteann: Más mian leat é a úsáid&lt;cachePartialPathRegex ×, ná é a úsáid ar dtús, mar is mian leat ERDDAP™ a íoslódáil gach ceann de na comhaid ar dtús. Tar éis ERDDAP™ Tá íoslódáil gach ceann de na comhaid, é a chur leis an tacar sonraí smután de datasets.xml .
             
##### Na mílte Comhaid{#thousands-of-files} 
Má tá do tacar sonraí go leor mílte comhaid, ERDDAP™ d'fhéadfadh a bheith mall chun freagra a thabhairt ar iarrataí ar shonraí ón tacar sonraí sin. Tá dhá shaincheist anseo:
 

1. Líon na gcomhad in aghaidh an eolaire.
Go hinmheánach, ERDDAP™ oibríonn ag an luas céanna beag beann ar cibé an bhfuil n comhaid i eolaire amháin nó scaipthe i roinnt eolairí.
     
Ach tá fadhb ann: Na comhaid níos mó i eolaire ar leith, is é an níos moille ar an gcóras oibriúcháin ag filleadh ar an liosta de na comhaid ar an eolaire (in aghaidh an comhad) go dtí ERDDAP . D'fhéadfadh an t-am freagartha a bheith O (n log n) . Tá sé deacair a rá cé mhéad comhad in eolaire amháin atá an iomarca, ach is dócha go bhfuil 10,000 ró-go leor. Mar sin, má tá do thus a ghiniúint go leor de na comhaid, d'fhéadfadh moladh anseo a bheith: a chur ar na comhaid i subdirectories eagraithe go loighciúil (m.sh., stáisiún nó stáisiún/bliain) .
    
Cúis eile a úsáid subdirectories: más mian le húsáideoir a úsáid ERDDAP 's "files" córas a aimsiú ar an ainm an comhad is sine do stáisiún X, tá sé níos tapúla agus níos éifeachtaí má tá na comhaid i fo-stiúrthóirí stáisiúin / bliana, mar ní mór i bhfad níos lú eolais a aistriú.
    
2. Líon iomlán na gcomhad.
Le haghaidh tacar sonraí tabular, ERDDAP™ Coinníonn súil ar an raon na luachanna do gach athróg i ngach comhad. Nuair a dhéanann úsáideoir iarratas, ERDDAP™ Tá a léamh na sonraí go léir ó gach ceann de na comhaid a d'fhéadfadh a bheith sonraí meaitseáil an t-úsáideoir iarratas. Má iarrann an t-úsáideoir le haghaidh sonraí ó am teoranta (m.sh., lá amháin nó mí amháin) , ansin ERDDAP™ Ní bheidh a oscailt comhaid an iomarca i do tacar sonraí. Ach tá cásanna tromchúiseacha ina bhféadfadh beagnach gach comhad a bheith ag meaitseáil sonraí (e.g., nuair a bhíonn uisce ann; 13.2C) . Ó thógann sé ERDDAP™ beagán ama (go páirteach an t-am a lorg ar an HDD, go páirteach an t-am a léamh an comhad header) ach a oscailt comhad ar leith (agus níos mó má tá go leor de na comhaid san eolaire) , tá pionós suntasach ama má tá líon iomlán na gcomhad sin ERDDAP™ Tá a oscailt an-mhór. Fiú amháin a oscailt 1000 comhaid Bíonn am suntasach. Mar sin, tá buntáistí a chomhdhlúthú go tréimhsiúil na comhaid laethúil i smutáin níos mó (m.sh., 1 stáisiún ar feadh 1 bhliain) . Tuigim nach mb'fhéidir gur mhaith leat é seo a dhéanamh ar chúiseanna éagsúla, ach déanann sé freagairtí i bhfad níos tapúla. I gcásanna tromchúiseacha (e.g., déileáil mé le tacar sonraí GTSPP go bhfuil ~ 35 milliún comhaid foinse) , Tá sonraí a sheirbheáil ó líon mór de na comhaid foinse neamhphraiticiúil mar gheall ar ERDDAP 'Is féidir le freagra ar cheisteanna simplí uaireanta a ghlacadh agus tonna de chuimhne a úsáid. Trí chomhdhlúthú comhaid foinse isteach i líon níos lú (do GTSPP, tá mé 720 anois, 2 in aghaidh na míosa) , ERDDAP™ is féidir a fhreagairt go réasúnta go tapa. Féach ar [Na milliúin Comhaid](#millions-of-files)   
     

N.B. Tá Tiomántáin Stáit soladach iontach&#33; An bealach is tapúla, is éasca, is saoire chun cabhrú ERDDAP™ déileáil le líon mór de (bláthanna cumhra: cumhráin) Is comhaid a úsáid tiomáint stáit soladach. Féach ar [Tá Tiomántáin Stáit soladach iontach&#33;](/docs/server-admin/additional-information#solid-state-drives)   
     
##### Na milliúin Comhaid{#millions-of-files} 
* Tá roinnt tacar sonraí na milliúin de chomhaid foinse. ERDDAP™ Is féidir é seo a láimhseáil, ach le torthaí measctha.
    
    * I gcás iarrataí a bhaineann ach athróga atá liostaithe i [&lt; subsetVariables ú (#subsetvariables) , ERDDAP™ Tá gach ceann de na faisnéis is gá a bhaintear cheana féin as na comhaid sonraí agus a stóráil i gcomhad amháin, ionas gur féidir é a fhreagairt go han-, go han-tapa.
    * I gcás iarrataí eile, ERDDAP™ Is féidir scanadh an tacar sonraí ar [faisnéis comhad i dtaisce](#cached-file-information) agus figiúr amach go bhféadfadh ach roinnt de na comhaid a bhfuil sonraí a bhaineann leis an iarraidh agus dá bhrí sin freagra tapa.
    * Ach le haghaidh iarrataí eile (mar shampla, WaterTemperature = 18 céim \\_C) i gcás ina bhféadfadh sonraí ábhartha a bheith ag aon chomhad, ERDDAP™ caithfidh líon mór comhad a oscailt chun a fháil amach an bhfuil aon sonraí ag gach ceann de na comhaid atá ábhartha don iarraidh. Na comhaid a oscailt seicheamhach. Ar aon chóras oibriúcháin agus aon chóras comhaid (seachas thiomáineann stáit soladach) , a thógann sé seo i bhfad (amhlaidh ERDDAP™ freagraíonn go mall) agus i ndáiríre ceangail suas an córas comhaid (amhlaidh ERDDAP™ freagraíonn go mall le hiarratais eile) .
    
Fortunately, tá réiteach.
    
    1. Socraigh an tacar sonraí ar neamh-phoiblí ERDDAP™   (do ríomhaire pearsanta?) .
    2. Cruthaigh agus a reáchtáil script a iarrann sraith de .nc CF comhaid, gach ceann acu le smután mór de na tacar sonraí, de ghnáth tréimhse ama (mar shampla, gach ceann de na sonraí ar feadh míosa ar leith) . Roghnaigh an tréimhse ama ionas go mbeidh gach ceann de na comhaid mar thoradh níos lú ná 2GB (ach tá súil agam níos mó ná 1GB) . Má tá an tacar sonraí in aice-réad-am sonraí, reáchtáil an script a athghiniúint an comhad don tréimhse ama reatha (e.g., an mhí seo) minic go minic (gach 10 nóiméad? gach uair an chloig?) . Iarratais chuig ERDDAP™ le haghaidh .nc CF comhaid a chruthú NetCDF v3 .nc comhad a úsáideann an [CF Diosca Geometris Sampling (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) struchtúir sonraí Ragged Contiguous Array).
    3. Socraigh suas [EDDTableFromNcCFFiles](#eddtablefromnccffiles) dataset on your public ERDDAP™ a fhaigheann sonraí ó .nc  (CF) comhaid. ERDDAP™ is féidir sonraí a bhaint as na comhaid seo go han-tapa. Agus ós rud é go bhfuil mórán nó na céadta anois (in ionad na milliúin) de chomhaid, fiú má ERDDAP™ Tá a oscailt gach ceann de na comhaid, is féidir é sin a dhéanamh go tapa.
    
Sea, tógann an córas seo roinnt ama agus iarracht a chur ar bun, ach oibríonn sé go han-mhaith. Is féidir an chuid is mó iarrataí sonraí a láimhseáil 100 uair níos tapúla ná riamh.
     \\[ Bob bhí a fhios go raibh sé seo deis, ach bhí sé Kevin O'Brien a rinne an chéad seo agus léirigh go n-oibríonn sé go maith. Anois, Úsáideann Bob seo le haghaidh tacar sonraí GTSPP a bhfuil thart ar 18 milliún comhad foinse agus a ERDDAP™ feidhmíonn anois trí thart ar 500 .nc  (CF) comhaid. \\] 
    
N.B. Tá Tiomántáin Stáit soladach iontach&#33; An bealach is tapúla, is éasca, is saoire chun cabhrú ERDDAP™ déileáil le líon mór de (bláthanna cumhra: cumhráin) Is comhaid a úsáid tiomáint stáit soladach. Féach ar [Tá Tiomántáin Stáit soladach iontach&#33;](/docs/server-admin/additional-information#solid-state-drives)   
     
    
##### Ollmhór Comhaid{#huge-files} 
* A comhad sonraí ollmhór amháin (go háirithe comhaid sonraí ollmhór ASCII) Is féidir a chur faoi deara OutOfMemoryEror. Más é seo an fhadhb, ba chóir é a bheith soiléir mar gheall ar ERDDAP™ beidh theipeann a luchtú an tacar sonraí. Is é an réiteach, más féidir, an comhad a roinnt i gcomhaid éagsúla. Go hidéalach, is féidir leat an comhad a roinnt i smutáin loighciúil. Mar shampla, má tá an comhad fiú 20 mí na sonraí, é a roinnt i 20 comhaid, gach ceann acu le luach 1 mhí na sonraí. Ach tá buntáistí fiú má tá an comhad is mó scoilte suas treallach. Tá buntáistí éagsúla ag an gcur chuige seo: a) Laghdóidh sé seo an chuimhne is gá chun na comhaid sonraí a léamh go 1/20th, toisc go bhfuil ach comhad amháin a léamh ag an am. b) Go minic, ERDDAP™ Is féidir déileáil le hiarrataí i bhfad níos tapúla toisc go bhfuil sé ach chun breathnú i gceann amháin nó cúpla comhad a aimsiú na sonraí le haghaidh iarratas ar leith. c) Má tá bailiú sonraí leanúnach, ansin is féidir leis an 20 comhad atá ann cheana féin a athrú, agus ní mór duit ach comhad amháin, beag, nua a mhodhnú chun fiú na sonraí an mhí seo chugainn a chur leis an tacar sonraí.
     
##### FTP Trioblóid / Cathartha{#ftp-troubleadvice-1} 
* Má FTP tú comhaid sonraí nua chuig an ERDDAP™ freastalaí agus ERDDAP™ ag rith, tá an deis go ERDDAP™ a athlódáil an tacar sonraí le linn an phróisis FTP. Tarlaíonn sé níos minice ná mar a cheapann tú&#33; Má tharlaíonn sé, beidh an comhad le feiceáil a bheith bailí (tá ainm bailí aige) , ach nach bhfuil an comhad bailí. Más rud é ERDDAP™ déanann sé iarracht sonraí a léamh ón gcomhad neamhbhailí sin, cuirfidh an earráid mar thoradh air sin faoi deara an comhad a chur leis an tábla de chomhaid neamhbhailí. Níl an Tweet seo ar fáil. Chun an fhadhb seo a sheachaint, bain úsáid as logainm sealadach nuair FTP'ing an comhad, mar shampla, ABC2005 .nc \\_TEMP . Ansin, an tástáil fileNameRegex (féach thíos) le fios nach comhad ábhartha é seo. Tar éis an próiseas FTP iomlán, athainmniú an comhad chuig an ainm ceart. Beidh an próiseas athainmniú faoi deara an comhad a bheith ábhartha i toirt.
    
##### Ainm comhaid Sliocht{#file-name-extracts} 
 \\[ Tá an ghné seo DEPRECATED. Le do thoil [\\*\\*\\ * ainm bréige sourceName ](#filename-sourcenames) ina ionad sin. \\]   
Tá córas ag EDDTableFromFiles chun String a bhaint as gach ainm comhaid agus é sin a úsáid chun athróg sonraí bréige a dhéanamh. Faoi láthair, níl aon chóras ann chun na Stringsa seo a léirmhíniú mar dhátaí/amanna. Tá roinnt clibeanna XML a chur ar bun an córas seo. Más rud é nach gá duit cuid nó gach ceann den chóras seo, ní gá ach a shonrú na clibeanna nó a úsáid "luachanna.

* Tá preExtractRegex [léiriú rialta](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [computer repair](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) a úsáidtear chun téacs atá le baint ó thús an ainm comhaid a aithint. Tarlaíonn an bhaint ach amháin má tá an regex mheaitseáil. Tosaíonn sé seo de ghnáth le "^" chun tús an ainm comhaid a mheaitseáil.
* post post post post Is léiriú rialta é SliochtRegex a úsáidtear chun téacs a aithint atá le baint ó dheireadh an ainm comhaid. Tarlaíonn an bhaint ach amháin má tá an regex mheaitseáil. Críochnaíonn sé seo de ghnáth le "$" chun deireadh an ainm comhaid a mheaitseáil.
* cliceáil grianghraf a mhéadú Má tá sé i láthair, tá an abairt rialta a úsáidtear tar éis preExtractRegex agus postExtractRegex a aithint teaghrán a bhaintear as an ainm comhaid (mar shampla, an stationID ) . Mura bhfuil an regex mheaitseáil, tá an ainm comhaid ar fad a úsáidtear (lúide preExtract agus post Sliocht as Sliocht) . Úsáid ".\\*" a mheaitseáil leis an ainm comhaid ar fad atá fágtha tar éis preExtractRegex agus postExtractRegex.
* colún colún colún Is é AinmForExtract an t-ainm foinse colún sonraí do na Strings a bhaintear. Amharc ar gach eolas dataVariable leis seo [ sourceName ](#sourcename) Ní mór a bheith sa dataVariable s liosta (le haon chineál sonraí, ach de ghnáth Curtain) .

Mar shampla, má tá comhaid ag tacar sonraí le hainmneacha cosúil le XYZAble .nc , XYZBaker .nc , XYZCharlie .nc , ..., agus ba mhaith leat a chruthú athróg nua ( stationID ) nuair a bhíonn gach comhad a léamh a mbeidh luachanna ID stáisiúin (In ann, Baker, Charlie, ...) a bhaintear as na filenames, d'fhéadfá na clibeanna seo a úsáid:

*   &lt;cliceáil grianghraf a mhéadú&lt;/ PreExtractRegex ×
Is é an ^ tosaigh léiriú rialta carachtar speisialta a fórsaí ERDDAP™ chun breathnú ar XYZ ag tús an ainm comhaid. Cúiseanna seo XYZ, má fhaightear ag tús an ainm comhaid, a bhaint (mar shampla, an ainm comhaid XYZAble .nc thiocfaidh chun bheith ann .nc ) .
*   &lt;Ghnóthú Sonraí .nc $ CAIBIDIL $&lt;Seirbhís do Chustaiméirí
Is é an $ ag an deireadh a léiriú rialta carachtar speisialta a fórsaí ERDDAP™ chun breathnú ar .nc ag deireadh an ainm comhaid. Ó . Is léiriú rialta carachtar speisialta (a lasann aon chineál) , tá sé ionchódaithe mar \\. anseo (toisc go bhfuil 2E an uimhir carachtar hexadecimal ar feadh tréimhse) . Na cúiseanna seo .nc , má fhaightear ag deireadh an ainm comhaid, a chur as oifig (mar shampla, an ainm comhaid páirteach In ann .nc thiocfaidh chun bheith ann) .
*   &lt;sliocht Regex ×.\\ *&lt;/ Lasmuigh de
An .\\ * oireann abairt rialta gach carachtair atá fágtha (mar shampla, an ainm comhaid páirteach A thiocfaidh chun bheith ann an sliocht don chéad chomhad) .
*   &lt;colún NameForExtract stationID &lt;/ ColumnName Forfheidhmeach
Níl an Tweet seo ar fáil ERDDAP™ a chruthú colún foinse nua ar a dtugtar stationID nuair a léamh gach comhad. Beidh an téacs a bhaintear as a ainm comhaid ag gach sraith sonraí le haghaidh comhad ar leith (mar shampla, In ann) mar an luach sa stationID colún.

I bhformhór na gcásanna, tá go leor luachanna ann do na clibeanna sliocht seo a thabharfaidh na torthaí céanna - tá abairtí rialta an-solúbtha. Ach i roinnt cásanna, tá ach bealach amháin a fháil ar na torthaí atá ag teastáil.
     
##### Bláthanna faoi dhíon sourceName s s{#pseudo-sourcenames} 
Gach athróg i ngach tacar sonraí i ERDDAP™ Tá [&lt; sourceName ú (Tuilleadh eolais) a shonraíonn ainm an fhoinse don athróg. Tacaíonn EDDTableFromFiles le cúpla pseudo sourceName s a sliocht luach ó áit éigin eile (e.g., ainm an chomhaid nó luach tréith dhomhanda) agus an luach sin a chur chun cinn mar cholún de luachanna leanúnacha don smután sin sonraí (e.g., tábla sonraí an chomhaid sin) . Maidir leis na hathróga seo, ní mór duit cineál sonraí an athróg a shonrú tríd an [&lt;dataType ×) (#cineál) tag. Má tá an t-eolas a bhaintear teaghrán dateTime, tú a shonrú ar an fhormáid ar an teaghrán dateTime sa [aonad tréith](#string-time-units) . An bréige sourceName Tá roghanna:
 
###### domhanda: sourceName s s{#global-sourcenames} 
Is féidir tréith meiteashonraí domhanda i ngach comhad sonraí foinse a chur chun cinn a bheith ina colún de shonraí. Má athróg ar&lt; sourceName × Tá an fhormáid
```
        <sourceName>global:*attributeName*</sourceName>
```
ansin nuair ERDDAP™ Is é a léamh na sonraí ó chomhad, ERDDAP™ Beidh cuma le haghaidh tréith dhomhanda an ainm sin (mar shampla, PI) agus a chruthú colún líonadh leis an tréith ar luach. Tá sé seo úsáideach nuair a bhfuil an tréith luachanna éagsúla i gcomhaid foinse éagsúla, mar gheall ar a mhalairt, bheadh úsáideoirí a fheiceáil ach amháin ar cheann de na luachanna don tacar sonraí ar fad. Mar shampla,
```
        <sourceName>global:PI</sourceName>
```
Nuair a chur chun cinn tú tréith a bheith sonraí, ERDDAP™ Cuireann an tréith comhfhreagrach. Tá sé seo oiriúnach toisc go bhfuil an luach difriúil go mór i ngach comhad; ach sa tacar sonraí comhiomlánaithe i ERDDAP™ beidh sé ach luach amháin. Más mian leat, is féidir leat luach nua a chur leis an tréith don tacar sonraí iomlán trí chur leis&lt;att ainm = " *tréith Ainm an ainm* " *pictiúir nua Luach* &lt;/ trÃ d chun an tacar sonraí domhanda [&lt; addAttributes ú (Tuilleadh eolais) . I gcás tréithe domhanda go ERDDAP™ Éilíonn, mar shampla, institiúid, MUST tú a chur luach nua don tréith.
     
###### athróg: sourceName s s{#variable-sourcenames} 
Is féidir tréith meiteashonraí athróg i ngach comhad a chur chun cinn a bheith ina colún de shonraí. Má athróg ar&lt; [ sourceName ](#sourcename) Tá an fhormáid
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
ansin nuair ERDDAP™ Is é a léamh na sonraí ó chomhad, ERDDAP™ beidh breathnú ar an tréith shonraithe (mar shampla, ID) den athróg sonraithe (mar shampla, ionstraim) agus a chruthú colún líonadh leis an tréith ar luach. An athróg tuismitheoir (mar shampla, ionstraim) Ní gá a bheith ar cheann de na dataVariable s san áireamh i sainmhíniú an tacar sonraí i ERDDAP . Mar shampla,
```
        <sourceName>variable:instrument:ID</sourceName>
```
Tá sé seo úsáideach nuair a bhfuil an tréith luachanna éagsúla i gcomhaid foinse éagsúla, mar gheall ar a mhalairt, bheadh úsáideoirí a fheiceáil ach amháin ar cheann de na luachanna don tacar sonraí ar fad.

Nuair a chur chun cinn tú tréith a bheith sonraí, ERDDAP™ Cuireann an tréith comhfhreagrach. Tá sé seo oiriúnach toisc go bhfuil an luach difriúil go mór i ngach comhad; ach sa tacar sonraí comhiomlánaithe i ERDDAP™ beidh sé ach luach amháin. Más mian leat, is féidir leat luach nua a chur leis an tréith don tacar sonraí iomlán trí chur leis&lt;att ainm = " *tréith Ainm an ainm* " *pictiúir nua Luach* &lt;/ trÃ d leis an athróg [&lt; addAttributes ú (Tuilleadh eolais) . Le haghaidh tréithe go ERDDAP™ Éilíonn, mar shampla, ioos\\_category   (ag brath ar do thus) , MUST tú a chur le luach nua don tréith.
        
###### Déan Teagmháil Linn sourceName s s{#filename-sourcenames} 
Is féidir leat cuid de fileName comhad a bhaint agus a chur chun cinn gur colún de shonraí. An fhormáid seo pseudo [&lt; sourceName ú (Tuilleadh eolais) Is maith liom
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
Mar shampla,
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
Nuair a bhíonn EDDTableFromFiles ag léamh na sonraí ó chomhad, beidh sé a dhéanamh cinnte an fileName (Mar shampla, A201807041442.slcpV1 .nc ) oireann an abairt shonraithe rialta ("regex") agus sliocht an sonraithe (sa chás seo, an chéad) grúpa a ghabháil (a bhfuil cuid timpeallaithe ag lúibíní) , mar shampla, "201807041442". (Féach seo [doiciméadú regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) agus [riachtanais uisce: measartha](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) Is féidir leis an regex a shonrú mar shraith le nó gan Sleachta máguaird. Má tá an regex sonraithe mar shraith le Sleachta máguaird, ní mór an teaghrán a bheith [JSON-stíl teaghrán](https://www.json.org/json-en.html)   (le carachtair speisialta éalú le carachtair \\) . Is é 1 de ghnáth uimhir an ghrúpa gabhála (an chéad ghrúpa gabhála) , ach d'fhéadfadh a bheith aon uimhir.
     
###### Déan Teagmháil Linn sourceName s s{#pathname-sourcenames} 
Is féidir leat cuid de chonair iomlán comhad a bhaint Ainm an ainm (/ stiúrthóireachtaí / fileName.ext) agus a chur chun cinn gur colún sonraí é. An fhormáid seo pseudo [&lt; sourceName ú (Tuilleadh eolais) Is maith liom
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
Mar shampla,
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
Nuair a bhíonn EDDTableFromFiles ag léamh na sonraí ó chomhad, beidh sé a dhéanamh cinnte an cosán iomlán Name (mar shampla, / sonraí / myDatasetID/BAY17/B201807041442 .nc . Maidir leis an tástáil seo, beidh na deighilteoirí eolaire i gcónaí '/' , riamh '\\ '') oireann an abairt shonraithe rialta ("regex") agus sliocht an sonraithe (sa chás seo, an chéad) grúpa a ghabháil (a bhfuil cuid timpeallaithe ag lúibíní) , mar shampla, "BAY17". (Féach seo [doiciméadú regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) agus [riachtanais uisce: measartha](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) Is féidir leis an regex a shonrú mar shraith le nó gan Sleachta máguaird. Má tá an regex sonraithe mar shraith le Sleachta máguaird, ní mór an teaghrán a bheith ina [JSON-stíl teaghrán](https://www.json.org/json-en.html)   (le carachtair speisialta éalú le carachtair \\) . Is é 1 de ghnáth uimhir an ghrúpa gabhála (an chéad ghrúpa gabhála) , ach d'fhéadfadh a bheith aon uimhir.
         
##### "0 comhaid" Cuardaigh le haghaidh:{#0-files-error-message-2} 
* Má ritheann tú [Socraigh mar teanga réamhshocraithe](#generatedatasetsxml) nó [Seirbhís do Chustaiméirí](#dasdds) , nó má dhéanann tú iarracht EDDTableFrom a luchtú... Comhaid tacar sonraí i ERDDAP™ , agus gheobhaidh tú "0 comhaid" teachtaireacht earráide a léiríonn go ERDDAP™ fuair 0 comhaid meaitseáil san eolaire (nuair a cheapann tú go bhfuil comhaid meaitseáil san eolaire) :
    * Seiceáil go bhfuil na comhaid i ndáiríre san eolaire.
    * Seiceáil litriú an ainm eolaire.
    * Seiceáil an comhad NameRegex. Tá sé i ndáiríre, i ndáiríre éasca botúin a dhéanamh le regexes. Chun críocha tástála, déan iarracht an regex .\\* ba chóir a mheaitseáil gach ainm comhaid. (Féach seo [doiciméadú regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) agus [riachtanais uisce: measartha](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
    * Seiceáil go bhfuil an t-úsáideoir atá ag rith an chláir (e.g., úsáideoir = toitcat (?) do Tomcat / ERDDAP ) Tá cead 'léamh' do na comhaid.
    * I roinnt córais oibriúcháin (mar shampla, SELinux) agus ag brath ar suímh córas, ní mór an t-úsáideoir a bhí ar siúl ar an gclár a bheith 'léamh' cead le haghaidh an slabhra iomlán de eolairí as a dtiocfaidh an eolaire go bhfuil na comhaid.
         
##### caighdeánú Cad iad na rudaí maithe a bhain...{#standardizewhat} 
* Nuair a bhíonn aon fho-aicme de EDDTableFromFiles aggregating sraith de chomhaid foinse, le haghaidh athróg ar leith, gach ceann de na comhaid foinse MUST bhfuil luachanna tréith comhionann do roinnt tréithe: scale\\_factor , add\\_offset , \\_Unsigned, missing\\_value , \\_FillValue, agus aonaid). Smaoinigh air: má tá comhad amháin windSpeed aonaid =knots agus tá eile windSpeed aonaid = m / s, ansin níor chóir na luachanna sonraí ón dá chomhad a chur san áireamh sa tacar sonraí comhiomlánaithe céanna. Mar sin, nuair a chruthaíonn EDDTableFromFiles an tacar sonraí, léann sé na luachanna tréith ó chomhad amháin, ansin diúltaíonn gach ceann de na comhaid a bhfuil luachanna éagsúla acu do na tréithe tábhachtacha. I gcás an chuid is mó bailiúcháin de chomhaid, nach bhfuil sé seo ina fhadhb toisc go bhfuil na tréithe de na hathróga go léir comhsheasmhach. Mar sin féin, le haghaidh bailiúcháin eile de chomhaid, is féidir é seo mar thoradh ar 1%, 10%, 50%, 90%, nó fiú 99% de na comhaid a dhiúltú mar "bad" comhaid. Is é sin an deacracht.
    
Tá córas chun déileáil leis an bhfadhb seo ag comhaid EDDTableFrom: caighdeánú Cad. An caighdeánú Cén suíomh insíonn EDDTableFromFiles a chaighdeánú na comhaid chomh luath agus a léann sé iad, sula Breathnaíonn EDDTableFromFiles ar na tréithe a fheiceáil má tá siad comhsheasmhach.
    
Is é an taobh smeach: más rud é nach bhfuil an fhadhb seo ag an tacar sonraí, ná húsáid a chaighdeánú Cad. caighdeánú Cad iad roinnt rioscaí féideartha (a pléadh thíos) agus neamhéifeachtúlacht. Mar sin, más rud é nach gá duit i ndáiríre na gnéithe de chaighdeánú Cad é, níl aon ghá chun aghaidh a thabhairt ar na rioscaí agus na neamhéifeachtúlachtaí féideartha. Is é an inefficiency is mó: Nuair a chaighdeánú éagsúla Cad iad na roghanna a úsáideann tacar sonraí, le tuiscint go bhfuil na comhaid foinse sonraí a stóráil ar bhealaí éagsúla i bhfad (e.g., le difriúil scale\\_factor agus add\\_offset , nó le teaghráin ama ag baint úsáide as formáidí éagsúla) . Dá bhrí sin, le haghaidh srian áirithe in iarratas úsáideora, níl aon bhealach le haghaidh ERDDAP™ a dhéanamh srian ar leibhéal foinse amháin is féidir a chur i bhfeidhm ar gach comhad foinse. Mar sin, ERDDAP™ ní féidir leis na srianta a bhfuil tionchar acu ar leibhéal níos airde a chur i bhfeidhm. Mar sin, ERDDAP™ Tá a léamh na sonraí ó níos mó comhaid roimh chur i bhfeidhm na srianta níos airde, leibhéal ceann scríbe. Mar sin, iarrataí ar thacair sonraí a úsáid chaighdeánú Cad a ghlacadh a thuilleadh le próiseáil.
    
Chun an córas seo a úsáid, ní mór duit a shonrú
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
i an [ datasets.xml do na EDDTableFrom... Comhaid tacar sonraí](#eddtablefromfiles-skeleton-xml) (laistigh de&lt;sonraí a leagtar amach chlib).
    
An bhfuil *caighdeánú Cad iad na rudaí maithe a bhain...* sonraí luacha ar cheart go ndéanfadh athruithe EDDTableFromFiles iarracht iarratas a dhéanamh. Is iad na hathruithe suim roinnt teaglaim de:
    
1. Díroghnaigh gach rud
Déanann sé seo go leor oibríochtaí coitianta agus sábháilte a chaighdeánú colúin uimhriúil sna comhaid:
    * Más rud é scale\\_factor agus/nó add\\_offset Tá tréithe i láthair, iad a bhaint agus iad a chur i bhfeidhm chun na luachanna sonraí a dhíphacáil.
    * tréithe pacáilte Unpack (e.g., iarbhír\\_min, iarbhír\\_max, actual\\_range , data\\_min , data\\_max , data\\_range, valid\\_min , valid\\_max , valid\\_range ) , más rud é i láthair, más rud é go raibh pacáilte an athróg, agus má bhí pacáilte na luachanna tréith (Níl an Tweet seo ar fáil) .
    * Má \\_FillValue agus/nó missing\\_value i láthair, na luachanna sonraí sin a thiontú go ERDDAP 's "caighdeán" luachanna ar iarraidh: MAX\\_VALUE do chineálacha slánuimhir (e.g., 127 le haghaidh beart, 32,767 le haghaidh gearr, agus 2,147,483,647 le haghaidh insí, 9223372036854775807 tréimhse saoil: ilbhliantúil) agus NaN do doubles agus floats.
    * Bain an sean \\_FillValue agus / nó missing\\_value tréithe (más ann) , agus iad a chur in ionad ach \\_FillValue = \\[ an ERDDAP™ luach ar iarraidh caighdeánach \\] .
         
2. Caighdeánú Times Numeric
Má tá colún uimhriúil CF-stíl aonaid am uimhriúil (" " " *tréimhse saoil: ilbhliantúil* ó shin *Amuigh faoin aer* ", m.sh., "lá ó 1900-01-01") , athraíonn sé seo an dáta Luachanna ama isteach "seconds since 1970-01-01T00:00:00Z" luachanna agus athruithe ar an tréith aonad a chur in iúl go.
Má tá sé seo roghnaithe agus tá seans go bhfuil an athróg scale\\_factor nó add\\_offset , #1 MUST a roghnú freisin.
     
3. Cuir isteach missing\\_value   
Má tá colún Curtain \\_FillValue agus / nó missing\\_value tréithe, athraíonn sé seo na luachanna a "" agus cuireann sé na tréithe.
     
4. Faigh Numerican missing\\_value   
Mura bhfuil \\_FillValue nó colún uimhriúil missing\\_value tréithe, déanann sé seo uimhriúil neamhshainithe a aithint missing\\_value   (e.g., -999, 9999, 1e37f) agus cásanna de sé a thiontú go dtí na luachanna "caighdeán" (MAX\\_VALUE do chineálacha slánuimhir, agus NAN do doubles agus floats) .
     **Tá riosca ag an rogha seo:** má tá an luach sonraí bailí is mó nó is lú cosúil le luach ar iarraidh (e.g., 999) , ansin beidh na luachanna sonraí bailí a thiontú go luachanna ar iarraidh (e.g., NaN) .
     
5. Athrú Curtain "N/A" go ""
I gcás gach colún Curtain, thiontú roinnt teaghráin a úsáidtear go coitianta a chur in iúl luach Curtain ar iarraidh go "". Faoi láthair, tá sé seo le haghaidh ".", "...", "-", "??", "N/A", "NA", "none", "ní bhaineann", "null", "unknown", "unspecific". Is é an cuardach teaghrán cás-íogair agus i bhfeidhm tar éis na teaghráin a bheith bearrtha. "Agus" agus "eile" nach bhfuil go sonrach ar an liosta.
     **Tá riosca ag an rogha seo:** Is féidir le Stringsa a mheasann tú a bheith luachanna bailí a thiontú go "".
     
6. Caighdeánú do String ISO 8601 DateTimes
I gcás gach colún Teaghrán, iarracht a thiontú nach-íon-uimhriúil Curtain dateTimes (e.g., "Jan 2, 2018") go ISO 8601 String dateTimes ("2018-01-02") .
     **Tabhair do d’aire** go gcaithfidh na luachanna sonraí go léir don cholún an fhormáid chéanna a úsáid, ar shlí eile, ní dhéanfaidh an rogha seo aon athruithe ar cholún áirithe.
     **Tá riosca ag an rogha seo:** Má tá colún le luachanna teaghrán a tharlaíonn ach chun breathnú cosúil le dáta coitianta Formáid ama, beidh siad a thiontú go ISO 8601 String dateTimes.
     
7. Caighdeánú Dátaí Dlúth Chun ISO 8601 DateTimes
I gcás gach String nó colún slánuimhir-cineál, déan iarracht a thiontú amháin-uimhriúil Curtain dateTimes (e.g., "20180102") go ISO 8601 String dateTimes ("2018-01-02") .
     **Tabhair do d’aire** go gcaithfidh na luachanna sonraí go léir don cholún an fhormáid chéanna a úsáid, ar shlí eile, ní dhéanfaidh an rogha seo aon athruithe ar cholún áirithe.
     **Tá riosca ag an rogha seo:** Má tá colún le luachanna nach bhfuil dáta dlúth Times ach breathnú cosúil dateTimes dlúth, beidh siad a thiontú go ISO 8601 String dateTimes.
     
8. Aonaid Chaighdeánaithe
Déanann sé seo a chaighdeánú an teaghrán aonad do gach athróg. Mar shampla, "méadair in aghaidh an dara", "méadar / dara", "m.s^-1" , "m s-1" , déanfar "m.s-1" a thiontú go léir go "m.s-1". Ní athraíonn sé seo na luachanna sonraí. Oibríonn sé seo go maith le bailí UDUNITS aonad teaghráin, ach is féidir go mbeadh fadhbanna le teaghráin neamhbhailí nó casta. Is féidir leat déileáil le fadhbanna trí shonrú ar leith ó-go péirí i&lt;aonaid chaighdeánú bhéil i ERDDAP 's
     \\[ taiseachas aeir: fliuch \\] / webapps / erddap / WEB-INF / Ranganna/gov/noaa/pfel / erddap / util/messages.xml comhad. Cuir ríomhphost le haon athruithe a dhéanann tú go Chris. John ag noa.gov ionas gur féidir iad a ionchorprú isteach na teachtaireachtaí réamhshocraithe.xml.
     **Tá riosca ag an rogha seo:** D'fhéadfadh sé seo mangle roinnt aonaid casta nó neamhbhailí; áfach, is féidir leat úsáid a bhaint as an obair-timpeall cur síos thuas chun fadhbanna circumvent má tharlaíonn siad.
         
    
An luach réamhshocraithe de chaighdeánú Cad é 0, nach bhfuil aon rud a dhéanamh.

Má / nuair a athraíonn tú an luach a chaighdeánú Cad, an chéad uair eile tá an tacar sonraí athluchtaithe, ERDDAP™ athread gach ceann de na comhaid sonraí don tacar sonraí d'fhonn a atógáil an mion-sonraí Bunachar le faisnéis faoi gach comhad. Má tá an tacar sonraí go leor de na comhaid, beidh sé seo a ghlacadh i bhfad.
    
Nótaí:

* Tá rud tricky -
An caighdeánú Cén suíomh a úsáidtear le haghaidh gach colúin sa chomhad foinse. Mar sin, mar shampla, ag baint úsáide as #2048 D'fhéadfadh a thiontú go rathúil colún de tag dateTimes dhlúth isteach ISO 8601 String dateTimes, ach d'fhéadfadh sé a thiontú go dhearmad colún le Strings a tharlaíonn ach chun breathnú cosúil le dateTimes dhlúth.
     
*    datasets.xml agus GenerateDatasets Xml -
Tá sé go háirithe tricky a fháil ar na socruithe ceart i datasets.xml a dhéanamh do tacar sonraí ag obair ar an mbealach is mian leat é a. An cur chuige is fearr (mar i gcónaí) is:
    1. Úsáid Úsáid Úsáidte [Socraigh mar teanga réamhshocraithe](#generatedatasetsxml) agus a shonrú ar an luach caighdeánú Cad ba mhaith leat a úsáid.
    2. Úsáid Úsáid Úsáidte [Seirbhís do Chustaiméirí](#dasdds) chun a áirithiú go bhfuil na hualaí réamhshocraithe sonraí i gceart agus go léiríonn sé an caighdeánú Cén suíomh a shonraigh tú.
    3. Tástáil an tacar sonraí de láimh nuair a bhíonn sé i ERDDAP™ chun a chinntiú go n-oibríonn na hathróga difear mar súil.
         
* Rioscaí -
Roghanna #256 agus os a chionn níos risky, i.e., tá seans níos mó go ERDDAP™ a dhéanamh ar athrú nár chóir a dhéanamh. Mar shampla, d'fhéadfadh rogha #2048 athrú thaisme athróg le teaghráin ID stáisiún a tharlaíonn go léir ach chun breathnú ISO 8601 "compact" dátaí (e.g., 20180102) i ISO 8601 "extended" dátaí ("2018-01-02") .
     
* Slow tar éis athrú --
Ós rud é an luach a chaighdeánú Cad a athraíonn na luachanna sonraí a fheiceann EDDTableFromFiles le haghaidh gach comhad sonraí, má athraíonn tú an caighdeánú Cad a leagan síos, beidh EDDTableFromFiles caith amach an t-eolas i dtaisce faoi gach comhad (lena n-áirítear an min agus max do gach athróg sonraí i ngach comhad) agus ath-léigh gach comhad sonraí. Má tá tacar sonraí líon mór de chomhaid, is féidir é seo a bheith an-am Tógann, mar sin beidh sé i bhfad chun an tacar sonraí a athlódáil an chéad uair ERDDAP™ reloads sé tar éis a dhéanann tú an t-athrú.
     
* Heuristics -
Roghanna #256 agus thuas a úsáid heuristics a dhéanamh ar a n-athruithe. Má thagann tú trasna ar staid ina ndéanann an heuristics cinneadh dona, le do thoil ríomhphost cur síos ar an bhfadhb a Chris. John ag noaa. gov ionas gur féidir linn feabhas a chur ar an heuristics.
     
* Roghanna eile --
Más rud é nach bhfuil ar cheann de na roghanna chaighdeánú Cad fadhb a réiteach le haghaidh tacar sonraí ar leith, d'fhéadfá a bheith in ann an fhadhb a réiteach trí dhéanamh [ .nc ml comhad](#ncml-files) go comhthreomhar gach comhad sonraí agus athruithe a shainiú chun rudaí sna comhaid ionas go mbeidh na comhaid comhsheasmhach. Ansin, inis an EDDTableFrom... Comhaid tacar sonraí a chomhiomlánú .nc comhaid ml.
    
Nó, úsáid [ NCO ](#netcdf-operators-nco) a dhéanamh iarbhír athruithe ar na comhaid ionas go bhfuil na comhaid comhsheasmhach.
        
##### Colúin ar leith don Bhliain, Mí, Dáta, Uair, Nóiméad, Dara{#separate-columns-for-year-month-date-hour-minute-second} 
Tá sé coitianta go leor le haghaidh comhaid sonraí tabular go bhfuil colúin ar leith do bhliain, mí, dáta, uair an chloig, nóiméad, an dara. Roimh ERDDAP™ v2.10, bhí an t-aon réiteach a chur in eagar an comhad sonraí a chur le chéile na colúin i colún ama aontaithe. Le ERDDAP™ 2.10 +, is féidir leat an
[EN]&lt; sourceName × = *abairt abairt* &lt; sourceName ú (Tuilleadh eolais) a insint ERDDAP™ conas a chur le chéile na colúin foinse a dhéanamh colún ama aontaithe, mar sin ní mór duit a thuilleadh a chur in eagar ar an comhad foinse.
##### &lt;Scipeáil chuig ábhar agus chuig ábhar{#skipheadertoregex} 
* [EN]&lt;cliceáil grianghraf a mhéadú (Tuilleadh eolais) --
Amharc ar gach eolas (Do EDDTableFromAsciiFiles agus EDDTableFromColumnarAsciiFiles datasets amháin.)   
Nuair a léann EDDTableFromAsciiFiles comhad sonraí, beidh sé neamhaird ar gach ceann de na línte suas go dtí agus lena n-áirítear an líne a oireann an abairt rialta. Is é an réamhshocraithe "", nach n-úsáideann an rogha seo. Is sampla
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
a neamhaird gach líne suas go dtí agus lena n-áirítear líne a thosaíonn le "\\*\\*\\* END HEADER".

Nuair a úsáideann tú an chlib,&lt;colún NamesRow × agus&lt;firstDataRow × gníomhú mar má tá an header curtha as oifig sula bhfuil an comhad a léamh. Mar shampla, bheadh tú ag úsáid columnNamesRow = 0 má tá na hainmneacha colún ar an ceart as a chéile tar éis an header.

Más mian leat a ghiniúint An tSraith Shinsearach Xml le tacar sonraí a riachtanais an chlib seo:

1. Déan comhad nua, sealadach, samplach trí chomhad atá ann cheana a chóipeáil agus an ceanntásc a bhaint.
2. Rith ghiniúint An tSraith Shinsearach Xml agus an comhad sampla a shonrú.
3. Cuir an lámhleabhar leis an&lt;cliceáil grianghraf a mhéadú datasets.xml chunk.
4. Scrios an comhad sealadach, sampla.
5. Bain úsáid as an tacar sonraí i ERDDAP .
##### &lt;skipLinesRegex &amp; gt;{#skiplinesregex} 
Amharc ar gach eolas (Do EDDTableFromAsciiFiles agus EDDTableFromColumnarAsciiFiles datasets amháin.)   
Nuair a léann EDDTableFromAsciiFiles comhad sonraí, beidh sé neamhaird ar na línte a mheaitseáil leis an abairt rialta. Is é an réamhshocraithe "", nach n-úsáideann an rogha seo. Is sampla
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
a neamhaird gach líne a thosaíonn le "#".

Nuair a úsáideann tú an chlib,&lt;colún NamesRow × agus&lt;firstDataRow × gníomhú amhail is dá mbeadh gach ceann de na línte meaitseála a bhaint sula bhfuil an comhad a léamh. Mar shampla, bheadh tú ag úsáid columnNamesRow = 0 fiú má tá roinnt línte ag tosú leis, mar shampla, "#" ag tús an chomhaid.
    
#### EDDTableFromFiles creatlach XML{#eddtablefromfiles-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;nDimensions>...&lt;/nDimensions>  &lt;!-- This was used prior to ERDDAP™  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version 1.30, but is now ignored. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromFiles subclasses, this uses Java's WatchDirectory system  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;standardizeWhat>](#standardizewhat)...&lt;/standardizeWhat> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;specialMode>*mode*&lt;/specialMode>  &lt;-- This rarely-used, OPTIONAL tag  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be used with EDDTableFromThreddsFiles to specify that special,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hard-coded rules should be used to determine which files should  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be downloaded from the server. Currently, the only valid *mode*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is SAMOS which is used with datasets from  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://tds.coaps.fsu.edu/thredds/catalog/samos to download only the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files with the last version number. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  &lt;-- For subclasses like  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromHyraxFiles and EDDTableFromThreddsFiles, this is where  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you specify the base URL for the files on the remote server.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For subclasses that get data from local files, ERDDAP™ doesn't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this information to get the data, but does display the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;information to users. So I usually use "(local files)". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data file names, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get metadata  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;charset>...&lt;/charset>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This OPTIONAL tag specifies the character set (case  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sensitive!) of the source files, for example, ISO-8859-1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default) and UTF-8.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipHeaderToRegex>](#skipheadertoregex)...&lt;/skipHeaderToRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipLinesRegex>](#skiplinesregex)...&lt;/skipLinesRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNamesRow>...&lt;/columnNamesRow> &lt;-- (For EDDTableFromAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the row with the column  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;names in the files. (The first row of the file is "1".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default = 1.)  If you specify 0, ERDDAP™ will not look for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;column names and will assign names: Column#1, Column#2, ... -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;firstDataRow>...&lt;/firstDataRow>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the first row with data in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. (The first row of the file is "1". Default = 2.) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dimensionsCSV>...&lt;/dimensionsCSV> &lt;-- (For EDDTableFromNcFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and EDDTableFromMultidimNcFiles only) This is a comma-separated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list of dimension fullNames. If specified, ERDDAP™ will only read  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variables in the source files which use some or all of these  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions, plus all of the scalar variables. If a dimension  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is in a group, you must specify its fullName,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g., "*groupName/dimensionName*". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The next four tags are DEPRECATED. For more information, see  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[File Name Extracts](#filename-sourcenames). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;preExtractRegex>...&lt;/preExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;postExtractRegex>...&lt;/postExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractRegex>...&lt;/extractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNameForExtract>...&lt;/columnNameForExtract>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortedColumnSourceName>...&lt;/sortedColumnSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The [sourceName](#sourcename) of the numeric column that the data files are  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usually already sorted by within each file, for example, "time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't specify this or use an empty string if no variable is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suitable. It is ok if not all files are sorted by this column.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If present, this can greatly speed up some data requests.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromHyraxFiles, EDDTableFromNcFiles and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, this must be the leftmost (first) axis variable.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromMultidimNcFiles ignores this because it has a better  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;system. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortFilesBySourceNames>...&lt;/sortFilesBySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- This is a space-separated list of [sourceName](#sourcename)s  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which specifies how the internal list of files should be sorted  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(in ascending order), for example "id time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is the minimum value of the specified columns in each file  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that is used for sorting.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a data request is filled, data is obtained from the files  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in this order. Thus it determines the overall order of the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the response.  If you specify more than one column name, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;second name is used if there is a tie for the first column; the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;third is used if there is a tie for the first and second  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns; ... This is OPTIONAL (the default is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fileDir+fileName order). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For EDDTableFromHyraxFiles, EDDTableFromMultidimNcFiles,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromNcFiles, EDDTableFromNccsvFiles, and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, the source's axis variables (for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;example, time) needn't be first or in any specific order. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromAsciiService{#eddtablefromasciiservice} 
 [ **EDDTableFromAsciiService** ](#eddtablefromasciiservice) go bunúsach scraper scáileán. Tá sé beartaithe déileáil le foinsí sonraí a bhfuil seirbhís gréasáin shimplí acu chun sonraí a iarraidh (go minic foirm HTML ar leathanach gréasáin) agus is féidir a thabhairt ar ais na sonraí i bhformáid ASCII struchtúrtha (mar shampla, formáid téacs ASCII comórtha-scartha nó colúnach, go minic le faisnéis eile roimh na sonraí agus / nó tar éis) .

Is é EDDTableFromAsciiService an rang Super de gach EDDTableFromAsciiService... ranganna. Ní féidir leat úsáid a bhaint EDDTableFromAsciiService go díreach. Ina áit sin, bain úsáid as fo-aicme EDDTableFromAsciiService chun cineálacha sonracha seirbhísí a láimhseáil:

*    [Seirbhísí ar líne](#eddtablefromasciiservicenos) faigheann sonraí ó NOAA Seirbhísí ASCII NOS.

Faoi láthair, ní thacaítear le cineálacha seirbhíse eile. Ach tá sé de ghnáth réasúnta éasca chun tacú le seirbhísí eile má oibríonn siad ar bhealach den chineál céanna. Déan teagmháil linn má tá iarratas agat.

#### Sonraí Teagmhála{#details} 
Baineann an fhaisnéis seo a leanas le gach ceann de na fo-aicmí EDDTableFromAsciiService.

* Constraints -- ERDDAP™ Is féidir le hiarratais sonraí tabular srianta a chur ar aon athróg. Féadfaidh an tseirbhís bhunúsach nó d'fhéadfadh nach mbeadh srianta ar gach athróg. Mar shampla, ní thacaíonn go leor seirbhísí ach le srianta ar ainmneacha stáisiúin, domhanleithead, domhanfhad, agus am. Mar sin, nuair a fhaigheann fo-aicme de EDDTableFromAsciiService iarratas ar fo-thacar de tacar sonraí, Gabhann sé mar srianta go leor agus is féidir leis an tseirbhís sonraí foinse agus ansin na srianta atá fágtha a chur i bhfeidhm ar na sonraí a d'fhill an tseirbhís, sula dtugtar na sonraí don úsáideoir.
* Raon Bailí -- Murab ionann agus go leor cineálacha tacar sonraí eile, ní EDDTableFromAsciiService a fhios de ghnáth ar an raon sonraí do gach athróg, mar sin ní féidir é a dhiúltú go tapa iarrataí ar shonraí taobh amuigh den raon bailí.
* Ag cur le Freagra Téacs ASCII -- Nuair a fhaigheann EDDTableFromAsciiService freagra ó Sheirbhís Téacs ASCII, ní mór é a bhailíochtú go bhfuil an freagra ag súil leis an bhformáid agus faisnéis, agus ansin na sonraí a bhaint. Is féidir leat a shonrú ar an fhormáid ag baint úsáide as clibeanna speisialta éagsúla i smután de XML don tacar sonraí:
    *   &lt;roimhData1 uaire&lt;tags -- Is féidir leat sraith píosaí téacs a shonrú (oiread agus is mian leat, suas go dtí 10) go gcaithfidh EDDTableFromAsciiService breathnú i header an téacs ASCII ar ais ag an tseirbhís le&lt;roimhData1 uaire&lt;roimhData10 uaire. Mar shampla, tá sé seo úsáideach chun a fhíorú go n-áirítear an freagra na hathróga ag súil ag baint úsáide as na haonaid ag súil. Aithníonn an chlib dheireanach roimhData a shonraíonn tú an téacs a tharlaíonn ceart sula dtosaíonn na sonraí.
    *   &lt;tar éis Sonraí -- Sonraítear leis seo an téacs go mbeidh EDDTableFromAsciiService ag lorg sa téacs ASCII ar ais ag an tseirbhís a shíníonn deireadh na sonraí.
    *   &lt;cliceáil grianghraf a mhéadú -- Má fhaigheann EDDTableFromAsciiService an téacs seo sa téacs ASCII a d'fhill an tseirbhís, tá sé i gcrích nach bhfuil aon sonraí a oireann don iarratas.
#### EDDTableFromAsciiService creatlach XML{#eddtablefromasciiservice-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromAsciiService..." [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData1>...&lt;beforeData1> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData10>...&lt;beforeData10> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;afterData>...&lt;afterData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;noData>...&lt;noData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Seirbhísí ar líne{#eddtablefromasciiservicenos} 
 [ **Seirbhísí ar líne** ](#eddtablefromasciiservicenos) a dhéanann tacair shonraí EDDTable ó na seirbhísí sonraí téacs ASCII a thairgeann NOAA 's [An tSeirbhís Aigéan Náisiúnta (NOS) ](https://oceanservice.noaa.gov/) . Le haghaidh eolais ar an gcaoi a n-oibríonn an rang seo agus conas é a úsáid, féach ar superclass an ranga [EDDTableFromAsciiService](#eddtablefromasciiservice) . Ní dócha go mbeidh ar dhuine ar bith seachas Bob Simons an fo-aicme seo a úsáid.

Ós rud é go n-úsáideann na sonraí laistigh den fhreagra ó sheirbhís NOS bhformáid téacs columnar ASCII, ní mór go mbeadh tréith speisialta ag athróga sonraí seachas domhanleithead agus domhanfhad a shonraíonn cé na carachtair de gach líne sonraí go bhfuil sonraí athraitheacha, mar shampla,
```
<att name="responseSubstring">17, 25</att>  
```
 
### EDDTableFromAllDatasets{#eddtablefromalldatasets} 
 [ **EDDTableFromAllDatasets** ](#eddtablefromalldatasets) Is tacar sonraí ardleibhéil a bhfuil faisnéis faoi na tacair sonraí eile atá luchtaithe faoi láthair i do ERDDAP . Murab ionann agus cineálacha eile tacar sonraí, níl aon sonraíocht don allDatasets dataset in datasets.xml . ERDDAP™ go huathoibríoch Cruthaíonn EDDTableFromAllDatasets tacar sonraí (le datasetID = = = allDatasets ) . Dá bhrí sin, ar allDatasets Beidh tacar sonraí a chruthú i ngach ERDDAP™ suiteáil agus beidh ag obair ar an mbealach céanna i ngach ERDDAP™ suiteáil.

An bhfuil allDatasets Is tacar sonraí tabular. Tá sraith faisnéise aige do gach tacar sonraí. Tá colúin le faisnéis faoi gach tacar sonraí, e.g., datasetID , inrochtana, institiúid, teideal, minLongitude, maxLongitude, minLatitude, maxLatitude, minTime, maxTime, etc. Mar gheall ar allDatasets Is tacar sonraí tabular, is féidir leat é a cheistiú ar an mbealach céanna is féidir leat aon tacar sonraí tabular eile a cheistiú i ERDDAP™ , agus is féidir leat an cineál comhaid a shonrú don fhreagra. Ligeann sé seo d'úsáideoirí cuardach a dhéanamh le haghaidh tacair spéise ar bhealaí an-chumhachtach.
 
### EDDTableFromAsciiFiles{#eddtablefromasciifiles} 
 [ **EDDTableFromAsciiFiles** ](#eddtablefromasciifiles) comhiomlánaí sonraí ó chomhaid sonraí cluaisín-, tab-, leathstad-, nó spás-scartha comhaid sonraí ASCII tabular.

* Is minic a bheidh ainmneacha colúin ag na comhaid ar an gcéad tsraith agus ar na sonraí ag tosú ar an dara sraith. (Anseo, tá an chéad sraith den chomhad ar a dtugtar uimhir as a chéile 1.) Ach is féidir leat é a úsáid&lt;colún NamesRow × agus&lt;chéadDataRow × i do datasets.xml comhad a shonrú uimhir tsraith éagsúla.
*    ERDDAP™ ligeann na sraitheanna sonraí a bheith acu ar líon éagsúla de luachanna sonraí. ERDDAP™ glacadh leis go bhfuil na luachanna sonraí ar iarraidh na colúin deiridh sa tsraith. ERDDAP™ sannann na luachanna luach caighdeánach in easnamh do na luachanna sonraí in easnamh. (Chuir v1.56) 
* Tá comhaid ASCII éasca a bheith ag obair leis, ach nach bhfuil siad an bealach is éifeachtaí chun sonraí a stóráil / a aisghabháil. Le haghaidh éifeachtacht níos mó, shábháil ar na comhaid mar NetCDF v3 .nc comhaid comhad (le gné amháin, "fá", roinnte ag gach athróg) ina ionad sin. Is féidir leat [úsáid tírdhreach ERDDAP™ a ghiniúint na comhaid nua](#millions-of-files) .
* Féach an rang seo' superclass, [EDDTableFromFiles](#eddtablefromfiles) , le haghaidh faisnéise ar conas a oibríonn an rang seo agus conas é a úsáid.
* Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Mar gheall ar an easpa iomlán meiteashonraí i gcomhaid ASCII, beidh ort i gcónaí a chur in eagar na torthaí de GenerateDatasetsXml.
* RABHADH: Nuair a ERDDAP™ léann comhaid sonraí ASCII, má fhaigheann sé earráid ar líne ar leith (e.g., líon mícheart míreanna) , logs sé teachtaireacht rabhaidh ("GRÚPA: Líne Bad (s s) na sonraí "... le liosta de na línte dona ar línte ina dhiaidh sin) go dtí an [comhad logála.txt](/docs/server-admin/additional-information#log) agus ansin leanann an chuid eile den chomhad sonraí a léamh. Dá bhrí sin, tá sé do fhreagracht chun breathnú tréimhsiúil (nó scríobh script a dhéanamh amhlaidh) don teachtaireacht sin sa logáil. txt ionas gur féidir leat a shocrú ar na fadhbanna sna comhaid sonraí. ERDDAP™ Tá sé ar bun ar an mbealach seo ionas gur féidir le húsáideoirí leanúint ar aghaidh ag léamh gach ceann de na sonraí bailí atá ar fáil cé go bhfuil roinnt línte an comhad flaws.
     
### EDDTableFrom Seirbhís do Chustaiméirí{#eddtablefromawsxmlfiles} 
 [ **EDDTableFrom Seirbhís do Chustaiméirí** ](#eddtablefromawsxmlfiles) comhiomlánaí sonraí ó shraith de Stáisiún Aimsir Uathoibríoch (Amharc ar gach eolas) XML comhaid sonraí ag baint úsáide as WeatherBug Rest XML API (nach bhfuil gníomhach a thuilleadh) .

* Is é seo an cineál comhaid ar bhealach simplí ach neamhéifeachtach a stóráil na sonraí, mar is cosúil gach comhad de ghnáth go bhfuil an breathnóireacht ó ach pointe amháin am. Mar sin, d'fhéadfadh go mbeadh líon mór de chomhaid. Más mian leat feidhmíocht a fheabhsú, machnamh a dhéanamh ar ghrúpaí tuairimí a chomhdhlúthú (fiú na seachtaine?) i NetCDF v3 .nc comhaid comhad (is fearr: .nc comhaid leis an [CF Diosca Geometris Sampling (DSG) Formáid Array Contiguous Ragged](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) ) agus a úsáid [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)   (nó [EDDTableFromNcCFFiles](#eddtablefromnccffiles) ) chun freastal ar na sonraí. Is féidir leat [úsáid tírdhreach ERDDAP™ a ghiniúint na comhaid nua](#millions-of-files) .
* Féach an rang seo' superclass, [EDDTableFromFiles](#eddtablefromfiles) , le haghaidh faisnéise ar conas a oibríonn an rang seo agus conas é a úsáid.
     
### EDDTableFrom ColumnarAsciiFiles{#eddtablefromcolumnarasciifiles} 
 [ **EDDTableFrom ColumnarAsciiFiles** ](#eddtablefromcolumnarasciifiles) comhiomlánaí sonraí ó chluaisín ASCII comhaid sonraí le colúin seasta-leithroinnte.

* Is minic a bheidh ainmneacha colúin ag na comhaid ar an gcéad tsraith agus ar na sonraí ag tosú ar an dara sraith. Tugtar #1 ar an gcéad líne/fá sa chomhad. Ach is féidir leat é a úsáid&lt;colún NamesRow × agus&lt;chéadDataRow × i do datasets.xml comhad a shonrú uimhir tsraith éagsúla.
* An bhfuil&lt; addAttributes × do gach&lt; dataVariable × do na tacair sonraí MUST san áireamh an dá tréithe speisialta:
    
    *   &lt;ainm att = "startColumn" × *slánuimhir* &lt;att ^ - sonraítear an colún carachtar i ngach líne go bhfuil an tús athróg sonraí seo.
    *   &lt;ainm att = "stopColumn" × *slánuimhir* &lt;att × - sonraítear an colún carachtar i ngach líne go bhfuil an 1 tar éis dheireadh na sonraí athraitheach.
    
Is é an chéad cholún carachtar ar a dtugtar colún #0.
Mar shampla, don chomhad seo go bhfuil luachanna ama abutting teocht:
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
bheadh an athróg sonraí ama a bheith
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
agus go mbeadh an t-am athróg sonraí a bheith
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
Na tréithe MUST a shonrú do gach athróg ach amháin [seasta-luach](#fixed-value-sourcenames) agus [ainm comhaid-foinse-ainmneacha](#filename-sourcenames) athróg.
* Tá comhaid ASCII éasca a bheith ag obair leis, ach nach bhfuil siad ar bhealach éifeachtach a stóráil / sonraí a aisghabháil. Le haghaidh éifeachtacht níos mó, shábháil ar na comhaid mar NetCDF v3 .nc comhaid comhad (le gné amháin, "fá", roinnte ag gach athróg) ina ionad sin. Is féidir leat [úsáid tírdhreach ERDDAP™ a ghiniúint na comhaid nua](#millions-of-files) .
* Féach an rang seo' superclass, [EDDTableFromFiles](#eddtablefromfiles) , le haghaidh faisnéise ar conas a oibríonn an rang seo agus conas é a úsáid.
* Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Mar gheall ar an deacracht a chinneadh an tús agus poist deiridh do gach colún sonraí agus an easpa iomlán meiteashonraí i gcomhaid ASCII, beidh ort i gcónaí a chur in eagar na torthaí ó GenerateDatasetsXml.
     
### Féachaint ar Fholúntais{#eddtablefromhttpget} 
EDDTable Tá FromHttpGet difriúil ó gach cineál eile tacar sonraí i ERDDAP™ sa mhéid is go bhfuil sé córas trína ar leith "údar" Is féidir sonraí a chur leis, sonraí a athbhreithniú, nó sonraí a scriosadh as an tacar sonraí trí rialta HTTP GET nó [An bhfuil tú](#http-post) iarratais ó chlár ríomhaire, script nó bhrabhsálaí. Tá an tacar sonraí inchonraithe ag úsáideoirí ar an mbealach céanna go bhfuil gach tacar sonraí EDDTable eile inchonraithe ar an mbealach céanna ERDDAP . Féach ar an tuairisc ar superclass an ranga, [EDDTableFromFiles](#eddtablefromfiles) , a léamh faoi na gnéithe atá le hoidhreacht ó rang sin.

Tá na gnéithe ar leith de EDDTableFromHttpGet cur síos thíos. Ní mór duit a léamh ar fad den alt tosaigh agus é a thuiscint; ar shlí eile, d'fhéadfá a bheith ionchais neamhréadúil nó a fháil duit féin i dtrioblóid atá deacair a shocrú.

#### Úsáid atá beartaithe{#intended-use} 
Tá an córas seo beartaithe le haghaidh:

* Tabular (i situ) sonraí, sonraí nach bhfuil gridded.
* Sonraí ama Real -
Is é an sprioc a cheadú údar (e.g., an braiteoir, script QC uathoibrithe, nó duine ar leith) chun athrú a dhéanamh ar an tacar sonraí (trí [.insert nó .delete ordú](#insert-and-delete) ) agus an t-athrú sin a dhéanamh inrochtana ERDDAP™ úsáideoirí, go léir i níos lú ná 1 dara, agus b'fhéidir i bhfad níos tapúla. Is é an chuid is mó den dara ceann ama líonra. ERDDAP™ an t-iarratas a phróiseáil i thart ar 1 ms agus tá na sonraí inrochtana láithreach d'úsáideoirí. Is maith liom é [go tapa](#httpget-speed) , [láidir](#robust) , agus [córas iontaofa](#system-reliability) .
* Beagnach aon minicíocht sonraí -
Is féidir leis an gcóras seo glacadh le sonraí neamhrialta (e.g., laethúil) trí shonraí an-mhinic (e.g., sonraí 100 Hz) . Má bharrfheabhsú tú an córas, is féidir é a láimhseáil sonraí minicíochta níos airde (b'fhéidir 10 KHz sonraí má théann tú go dtí dhálaí foircneacha) .
* Sonraí ó braiteoir amháin nó bailiúchán de braiteoirí den chineál céanna.
*    [Leagann](#versioning) / Baile [Eolaíocht inspreagtha](https://en.wikipedia.org/wiki/Reproducibility) / Baile DOI s --
Staideanna nuair is gá duit a bheith in ann athruithe a dhéanamh ar na sonraí (e.g., bratach rialaithe cáilíochta a athrú) , tá a fhios a rinne údar gach athrú, a fhios ag an timestamp de nuair a rinne an t-údar an t-athrú, agus (arna iarraidh sin) a bheith in ann a fheiceáil ar na sonraí bunaidh ó sula ndearnadh an t-athrú. Dá bhrí sin, tá na tacair sonraí seo incháilithe le haghaidh [ DOI s s](https://en.wikipedia.org/wiki/Digital_object_identifier) . toisc go gcomhlíonann siad an DOI ceanglas go bhfuil an tacar sonraí ag athrú, ach amháin trí chomhiomlánú. Go ginearálta, níl tacair shonraí fíor-ama incháilithe le haghaidh DOI s toisc go bhfuil na sonraí a athrú go minic retroactively (e.g., chun críocha QA/QC) .
     

Nuair a bhíonn sonraí i tacar sonraí EDDTableFromHttpGet, is féidir le haon úsáideoir sonraí a iarraidh ar an mbealach céanna go n-iarrfaidh siad sonraí ó aon tacar sonraí EDDTable eile.
     
#### Turgnamhach: Bí cúramach{#experimental-be-careful} 
Ós rud é go bhfuil an córas nua agus ós rud é nach féidir sonraí comhshaoil a cailleadh a éileamh, ba chóir duit déileáil le EDDTableFromHttpGet mar turgnamhach. Má tá tú ag aistriú ó chóras eile, reáchtáil an seanchóras agus an córas nua i comhthreomhar go dtí go bhfuil tú muiníneach go n-oibríonn an córas nua go maith (seachtaine nó míonna, ní hamháin uair an chloig nó laethanta) . I ngach cás, le do thoil déan cinnte do chóras ar leithligh cartlanna an .insert agus .delete URLanna a sheoladh chuig an EDDTableFromHttpGet tacar sonraí (fiú más rud é go díreach sa Apache agus / nó logs Tomcat) , ar a laghad ar feadh tamaill. Agus i ngach cás, déan cinnte go bhfuil na comhaid sonraí a chruthaigh do EDDTableFromHttpGet tacar sonraí tacaíocht ghnáth suas le feistí stórála sonraí seachtracha. (Tabhair faoi deara go [rsync](https://en.wikipedia.org/wiki/Rsync) . Is féidir ar ais suas na comhaid sonraí cruthaithe ag EDDTableFromHttpGet an-éifeachtach.)   
     
#### .insert agus .delete{#insert-and-delete} 

Le haghaidh aon tacar sonraí i ERDDAP™ , nuair a sheolann tú iarratas chuig ERDDAP™ le haghaidh fo-thacar de na sonraí i tacar sonraí, a shonrú tú an cineál comhaid gur mian leat le haghaidh an freagra, m.sh., .csv, .htmlTable , .nc , .json . EDDTableFrom Http Faigh leathnaíonn an córas seo chun tacú le dhá chineál breise "comhad" ar féidir leo a chur isteach (nó athrú) nó sonraí a scriosadh sa tacar sonraí:

* Seirbhís do Chustaiméirí
    * Tá an t-iarratas formáidithe cosúil le freagra foirm HTML caighdeánach, le eochair = péirí luach, scartha ag 'agus'. Mar shampla,
        https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1  
india ERDDAP™ na sonraí a chur leis nó a athrú stationID =46088 don am sonraithe.
    * Is é an t-údar an athraithe seo JohnSmith agus is é an eochair éigin Key1.
    * Ní mór an URL luachanna bailí san áireamh (gan luachanna ar iarraidh) do gach ceann de na [ http Faigh Aitheantas](#httpgetrequiredvariables-global-attribute) 
    * Má luachanna na http Faigh Aitheantas Athróga san iarratas (e.g., stationID agus am) mheaitseáil na luachanna ar a chéile cheana féin sa tacar sonraí, na luachanna nua scríobh go héifeachtach na luachanna d'aois (cé go bhfuil na seanluachanna fós inrochtana má iarrann an t-úsáideoir sonraí ó roimhe seo [leagan leagan](#versioning) an tacar sonraí) .
    * Ní mór an URL .insert san áireamh &amp;timest = ( ERDDAP™ Gineann an luach sin) nó &amp; ordú = (go bhfuil sonraithe ag.insert (a bhfuil ordú = 0) nó .delete (a bhfuil ordú = 1 1) ) .
    * Más rud é nach bhfuil an URL .insert luachanna a shonrú le haghaidh colúin eile atá sa tacar sonraí, glactar leo a bheith ar na luachanna ó dhúchas ar iarraidh (MAX\\_VALUE do chineálacha sonraí slánuimhir, NaN do floats agus doubles, agus "" do Strings) .
             
    * taiseachas aeir: fliuch
        * Tá an t-iarratas formáidithe cosúil le freagra foirm HTML caighdeánach, le eochair = péirí luach, scartha ag 'agus'. Mar shampla,
            https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1  
india ERDDAP™ na sonraí a scriosadh stationID =46088 ag an am sonraithe.
        * Is é an t-údar an athraithe seo JohnSmith agus is é an eochair éigin Key1.
        * Ní mór an URL a shonrú ar an [ http Faigh Aitheantas](#httpgetrequiredvariables-global-attribute) san iarraidh (e.g., stationID agus am) . Má mheaitseáil na luachanna na luachanna ar a chéile cheana féin sa tacar sonraí (a bheidh siad de ghnáth) , na seanluachanna scriosta go héifeachtach (cé go bhfuil na seanluachanna fós inrochtana má iarrann úsáideoir sonraí ó roimhe seo [leagan leagan](#versioning) an tacar sonraí) .
        * Níl aon ghá luachanna a shonrú le haghaidh neamh-HttpGetRequiredVariables, seachas údar, atá ag teastáil chun an t-iarratas a fhíordheimhniú.
             
    
Sonraí:
    * .insert agus .delete iarratais a formáidithe cosúil le freagraí foirm HTML caighdeánach, le eochair = péirí luach, scartha ag 'agus'. Ní mór na luachanna a bheith [faoin gcéad ionchódú](https://en.wikipedia.org/wiki/Percent-encoding) . Dá bhrí sin, ní mór duit a ionchódú carachtair speisialta isteach san fhoirm %HH, áit a bhfuil HH an 2 dhigit luach hexadecimal an carachtar. De ghnáth, ní mór duit ach roinnt de na carachtair poncaíochta a thiontú: % isteach i %25, &amp; i %26, " isteach i %22,&lt;i %3C, = isteach i %3D, × i %3E, + isteach i %2B, | i %7C, \\[ i %5B, \\] isteach %5D, spás isteach% 20, agus gach carachtar a thiontú os cionn #127 isteach ina bhfoirm UTF-8 agus ansin ionchódú faoin gcéad gach beart de na foirm UTF-8 isteach i bhformáid%H (iarraidh ar Ríomhchláraitheoir le haghaidh cabhrach) .
    * Ní mór iarratais .insert agus .delete san áireamh na [ http Faigh Aitheantas](#httpgetrequiredvariables-global-attribute) , m.sh., stationID agus am. I gcás iarrataí .insert, athróga nach bhfuil sonraithe san iarratas Glactar a bheith luachanna ar iarraidh (MAX\\_VALUE le haghaidh athróg slánuimhir, NaN le haghaidh snámhphointe agus athróg dúbailte, agus String folamh le haghaidh athróg Curtain) . Le haghaidh iarrataí .delete, luachanna le haghaidh neamh-HttpGetRequired Athróga (seachas údar, atá ag teastáil) a neamhaird.
    * Ní mór ainm an údair agus eochair an údair a chur san áireamh le hiarratais .insert agus .delete trí pharaiméadar san fhoirm údar = *údar \\* mar an paraiméadar deireanach san iarratas. Cinnteoidh sé seo go deireanach go bhfuil an t-iarratas ar fad faighte ag ERDDAP . Ach an t-údar (nach bhfuil an eochair) a stóráil sa chomhad sonraí. Ní mór duit an liosta ceadaithe a shonrú *údar \\* 's tríd an tréith dhomhanda [ http Inis dúinn, le do thoil...](#httpgetkeys) 
    * D'fhéadfadh .insert agus .delete paraiméadair a bheith scalar (singil) luachanna nó arrays aon fhad san fhoirm \\[ luach1, luach2, luach3,..., luach \\] . Le haghaidh iarratas ar leith, ní mór gach athróg le arrays bhfuil arrays leis an líon céanna de luachanna (Is maith liom é) . Má tá iarraidh luachanna scalar agus eagar, na luachanna scalar mhacasamhlú a bheith arrays leis an fad céanna leis na arrays sonraithe, m.sh., &amp; stationID D'fhéadfadh =46088 a chóireáil mar &amp; stationID = = = \\[ Foinse do bhfianaise faoi stiúir glan \\] . Tá Arrays an eochair do [tréchur ard](#httpget-speed) . Gan arrays, beidh sé dúshlánach a .insert nó .delete níos mó ná 8 sraitheanna sonraí in aghaidh an dara ó údar iargúlta (mar gheall ar lasnairde an líonra) . Le arrays, beidh sé éasca a .insert nó .delete níos mó ná 1000 sraitheanna sonraí in aghaidh an dara ó braiteoir iargúlta.
    * .insert agus .delete glacadh (gan teachtaireacht earráide) uimhreacha pointe snámh nuair slánuimhreacha ag súil. Sna cásanna seo, babhtaí an tacar sonraí na luachanna a slánuimhreacha.
    * .insert agus .delete glacadh (gan teachtaireacht earráide) slánuimhir agus uimhreacha pointe snámh atá as-de-raoin an athróg ar chineál sonraí. Sna cásanna seo, siopaí an tacar sonraí na luachanna mar ERDDAP 's luachanna in easnamh dúchais don chineál sonraí (MAX\\_VALUE do chineálacha slánuimhir agus NaN do floats agus doubles) .
         
#### Plandaí faoi dhíon{#response} 
Má éiríonn an URL .insert nó .delete, beidh an cód freagartha HTTP 200 (OK) agus beidh an freagra téacs le .json réad, m.sh.,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
Tabhair faoi deara go bhfuil an timestamps cruinneas millisecond.

Má theipeann ar an .insert nó .delete URL, gheobhaidh tú cód freagartha HTTP seachas 200 (riachtanais uisce: measartha) , m.sh., Earráid 403 Toirmiscthe má chuireann tú luach Údar mícheart\\_key. ERDDAP™ Cuireann an cód freagartha HTTP (Ní, m.sh., .json earráid formáidithe) toisc go bhfuil an chaoi rudaí atá déanta ar an idirlíon agus toisc gur féidir earráidí tarlú in áit ar bith sa chóras (e.g., sa líonra, a fhilleann earráid HTTP) . Má tá an earráid ó ERDDAP™ , d'fhéadfadh an freagra roinnt téacs san áireamh (taiseachas aeir: fliuch .json ) le míniú níos mionsonraithe ar cad a chuaigh mícheart, ach an cód freagartha HTTP (200 = Nócha, tá aon rud eile deacracht) Is é an bealach cuí a sheiceáil má d'éirigh leis an .insert nó .delete. Mura bhfuil an cód freagartha HTTP indéanta nó mura bhfuil sé deacair, cuardach a dhéanamh ar "status":"success" sa téacs freagartha ba chóir a bheith ina léiriú iontaofa ar rath.
    
#### Naisc ábhartha eile{#log-files} 
Nuair a fhaigheann EDDTableFromHttpGet .insert agus .delete orduithe, cuireann sé ach an t-eolas ar an gcomhad ábhartha i sraith de chomhaid logála, gach ceann acu tábla a stóráil i [JSON Línte CSV comhad](https://jsonlines.org/examples/) . Nuair a dhéanann úsáideoir iarraidh ar shonraí, ERDDAP™ léann go tapa na comhaid logáil ábhartha, i bhfeidhm na hathruithe ar an tacar sonraí san ord a rinneadh iad, agus ansin scagairí an iarraidh trí shrianta an úsáideora cosúil le haon eile ERDDAP™ iarraidh sonraí. An laindéal na sonraí i gcomhaid logála éagsúla, a stóráil píosaí éagsúla faisnéise (e.g., an lasc ama an ordaithe, agus an raibh an t-ordú .insert nó .delete) , agus gnéithe éagsúla de thus an tacar sonraí, go léir a dhéanamh is féidir le haghaidh ERDDAP sonraí a stóráil agus sonraí a aisghabháil ón tacar sonraí seo go han-tapa agus an-éifeachtach.
     
#### Slándáil agus Údar{#security-and-author} 
Ní mór gach .insert agus .delete ordú san áireamh &amp; údarás = *údar \\* mar an paraiméadar deireanach, i gcás ina bhfuil údar \\_key comhdhéanta de aitheantóir an údair (roghnaigh tú: ainm, túslitreacha, pseudonym, uimhir) , an underscore, agus eochair rúnda. An bhfuil ERDDAP™ Beidh riarthóir ag obair le húdair a ghiniúint an liosta de na luachanna údar bailí\\_key, is féidir a athrú ag am ar bith.
Nuair a fhaigheann EDDTableFromHttpGet ordú .insert nó .delete, a dhéanann sé cinnte go bhfuil an t-údar \\_key an paraiméadar deireanach agus bailí. Toisc go bhfuil sé an paraiméadar seo caite, léiríonn sé gur shroich an líne ordú ar fad ERDDAP™ agus ní raibh teasctha. Cinntíonn an eochair rúnda nach féidir ach le húdair shonracha sonraí a chur isteach nó a scriosadh sa tacar sonraí. ERDDAP™ ansin sleachta an t-údar agus sábhálann sé sin sa athróg údar, ionas gur féidir le duine ar bith a fheiceáil a bhí freagrach as athrú ar leith ar an tacar sonraí.
Is féidir .insert agus .delete orduithe a dhéanamh ach amháin trí https:   (security guards)   ERDDAP™ URLanna. Cinntíonn sé seo go gcoinnítear an fhaisnéis atá á haistriú faoi rún le linn idirthurais.
     
#### taiseachas aeir: fliuch{#timestamp} 
Mar chuid den chóras logála, cuireann EDDTableFromHttpGet amstamp (an t-am sin ERDDAP a fuair an iarraidh) le gach ordú go siopaí sé sna comhaid logáil. Mar gheall ar ERDDAP™ Gineann an timestamp, ní na húdair, ní chuireann sé ábhar má tá údair éagsúla ag déanamh athruithe ó ríomhairí le cloig a leagtar go dtí amanna beagán difriúil. Léiríonn an t-am ama go hiontaofa an t-am nuair a rinneadh an t-athrú ar an tacar sonraí.
     
#### HTTP POST{#http-post} 
*    ["Cad faoi HTTP POST?&#33;"](#http-post)   
HTTP [An bhfuil tú](https://en.wikipedia.org/wiki/POST_(HTTP) ) Is é an rogha eile níos fearr (i gcomparáid le HTTP GET ) chun faisnéis a sheoladh ó chliant chuig freastalaí HTTP. Más féidir leat, nó más mian leat slándáil a fheabhsú, úsáid a bhaint as POST in ionad GET chun an fhaisnéis a sheoladh chuig ERDDAP . Tá POST níos sábháilte mar gheall ar: le GET agus https , Tá an URL a tharchur ar bhealach slán, ach an URL ar fad (lena n-áirítear paraiméadair, lena n-áirítear an t-údar \\_key) a scríobh chuig an Apache, Tomcat, agus ERDDAP™ comhaid a logáil, i gcás ina bhféadfadh duine éigin iad a léamh mura bhfuil na comhaid urraithe i gceart. Le POST, na paraiméadair a tharchur ar bhealach slán agus nach bhfuil scríofa chuig na comhaid logáil. Is POST beagán níos deacra do chliaint a bheith ag obair leis agus nach bhfuil tacaíocht mar go forleathan ag bogearraí cliant, ach teangacha cláir tacaíocht a dhéanamh. Beidh an t-ábhar a sheolann tú chuig an tacar sonraí trí GET nó POST mar an gcéanna, ach formáidithe ar bhealach difriúil.
     
####  http Faigh Aitheantas Éagsúlachtaí ómós Domhanda{#httpgetrequiredvariables-global-attribute} 
Tá cuid riachtanach de cad a dhéanann an obair chóras iomlán an tréith domhanda ag teastáil http Faigh Aitheantas Variables, a bhfuil liosta coma-scartha de na dataVariable ainmneacha foinse a aithint uathúil sraith sonraí. Ba chóir é seo a bheith chomh íosta agus is féidir agus beidh san áireamh beagnach i gcónaí ar an athróg ama. Mar shampla, tá anseo an molta http Faigh Aitheantas Athróga do gach ceann de na [CF Diosca Geometris Sampling (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)   (Ar ndóigh, d'fhéadfadh na hainmneacha ID a bheith difriúil i do tacar sonraí.) :

* Le haghaidh AmSraith: stationID , am
* Do Traidisiún: trajectoryID, am
* Chun Próifíl: am (Is é an t-am ag glacadh leis an bpróifíl \\_id) , doimhneacht
* Le haghaidh Amanna Próifíl: stationID , am (Is é an t-am ag glacadh leis an bpróifíl \\_id) , doimhneacht
* Do Traidisiún Próifíl: trajectoryID, am (Is é an t-am ag glacadh leis an bpróifíl \\_id) , doimhneacht

    
Amanna a thógáil mar shampla:
Mar gheall ar ordú .insert go n-áirítear stationID =46088 agus am = 2016-06-23T19:53:00Z (agus luachanna eile le haghaidh athróg eile) :
* Mura bhfuil aon sonraí atá ann cheana don stáisiún sin agus an t-am sin, beidh an éifeacht a chur leis na sonraí leis an tacar sonraí.
* Má tá sonraí atá ann cheana don stáisiún sin agus an t-am sin, beidh an éifeacht a chur in ionad an tsraith sonraí atá ann cheana leis na sonraí nua seo. (Ar ndóigh, ó shin ERDDAP™ coimeádann an logáil de gach ordú a fhaigheann sé, tá na sonraí d'aois fós sa logáil. Má iarrann úsáideoir sonraí ó leagan den tacar sonraí roimh an athrú seo, feicfidh siad na sonraí níos sine.)   
         
####  http Faigh Stiúradh{#httpgetdirectorystructure} 
*    [ http Déan teagmháil linn Struchtúr ómós Domhanda agus Sonraí (cineál gas: in airde) Ainm an chomhaid](#httpgetdirectorystructure)   
Cuid de cad a dhéanann an córas iomlán ag obair go héifeachtach é sin ERDDAP™ Cruthaíonn sraith sonraí (log log log) comhaid, gach ceann acu le smután éagsúla den tacar sonraí. Má tá siad seo ar bun go maith, ERDDAP™ beidh sé in ann freagra a thabhairt go tapa ar an chuid is mó iarrataí ar shonraí. Tá an thus sonraithe ag an http GetDirectoryStructure tréith domhanda, a bhfuil Teaghrán go Breathnaíonn cosúil le ainm comhad coibhneasta, m.sh., " stationID / 10years", ach tá i ndáiríre sonraíocht don struchtúr eolaire. Léiríonn na codanna sin conas eolaire agus ainmneacha comhaid do na sonraí (log log log) Beidh comhaid a thógáil.
    
    * Má tá cuid slánuimhir (× = 1 1) móide timePeriod (millisecond, dara, nóiméad, uair an chloig, dáta, mí, bliain, nó a n-iolraí) , m.sh., 10years, ansin beidh an EDDTableFromHttpGet tacar sonraí a ghlacadh an luach ama le haghaidh an tsraith sonraí (e.g., 2016-06-23T19:53:00Z) , ríomh an t-am teasctha leis an cruinneas (e.g., 2010) , agus a dhéanamh fillteán nó fileName as sin.
        
Is é an sprioc a fháil smután réasúnta mór sonraí i ngach comhad, ach i bhfad níos lú ná 2GB.
        
    * Seachas sin, ní mór an chuid den tsonraíocht a bheith ina dataVariable 's sourceName , m.sh., stationID . Sa chás seo, déanfaidh EDDTableFromHttpGet fillteán nó ainm comhaid ó luach an athróg sin don tsraith nua sonraí (e.g., "46088") .
    
Toisc go bhfuil na sonraí ordú .insert agus .delete stóráil i sonraí ar leith (log log log) comhaid, EDDTableFromHttpGet de ghnáth ní mór ach ceann amháin nó cúpla sonraí a oscailt (log log log) comhaid a fháil ar na sonraí le haghaidh iarratas úsáideora ar leith. Agus mar gheall ar gach sonraí (log log log) comhad go léir an t-eolas ábhartha le haghaidh a shmután de na tacar sonraí, tá sé go tapa agus éasca le haghaidh EDDTableFromHttpGet a dhéanamh leagan ar leith (nó an leagan reatha) an tacar sonraí le haghaidh na sonraí sa chomhad sin (agus ní gá a ghiniúint an leagan a iarradh ar an tacar sonraí ar fad) .
    
Tá treoirlínte ginearálta bunaithe ar chainníocht agus minicíocht na sonraí. Má glacadh againn 100 bytes in aghaidh a chéile na sonraí, ansin...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
Mar shampla, má tá an struchtúr eolaire stationID /2 mí agus cuir isteach sonraí ó dhá stáisiún (46088 agus 46155) le luachanna ama ó Nollaig 2015 trí Bealtaine 2016, EDDTableFromHttp Beidh Faigh a chruthú eolairí ainmnithe 46088 agus 46155 agus comhaid a chruthú i ngach ainmnithe 2015-11 .json l, 2016-01 .json l, 2016-03 .json l, 2016-05 .json l l l l (gach ceann acu 2 mhí ar fiú sonraí don stáisiún ábhartha) . Ag am ar bith sa todhchaí, má úsáideann tú .insert nó .delete chun na sonraí a athrú nó a scriosadh, mar shampla, stáisiún 46088 ag 2016-04-05T14:45:00Z, EDDTableFromHttp Faigh a chur i gceangal leis an ordú sin 46088/2016-03 .json l, na sonraí ábhartha (log log log) comhad. Agus go soiléir, tá sé breá sonraí a chur le haghaidh stáisiúin eile ag am ar bith sa todhchaí, ós rud é go mbeidh an tacar sonraí a chruthú go simplí eolairí breise mar is gá a shealbhú na sonraí ó na stáisiúin nua.
    
####  http Inis dúinn, le do thoil...{#httpgetkeys} 
Gach EDDTable Féach ar Sonraigh Ní mór go mbeadh tréith dhomhanda ag tacar sonraí http GetKeys a shonraíonn an liosta de na húdair a cheadaítear agus a gcuid eochracha rúnda mar liosta coma-scartha de *údar \\* , m.sh., JohnSmith\\_someKey1, HOBOLogger\\_someKey2, QCScript59 .
* Tá údar \\_key ar cás-íogair agus ní mór a bheith go hiomlán carachtair ASCII (#33 - #126, agus gan aon camóg, " nó ' carachtair
* Tá Keys cosúil le focal faire, mar sin MUST siad a bheith × = 8 carachtair, deacair a buille faoi thuairim, agus gan focal foclóir inmheánach. Ba chóir duit déileáil leo mar a bheadh tú a chóireáil focal faire - iad a choinneáil príobháideach.
* An chéad '\\_' carachtar scarann an t-údar as an eochair, mar sin ní féidir an t-ainm údar áireamh carachtar '\\_' (ach is féidir eochair) .
* Is féidir aon údar áirithe amháin nó níos mó údar\\_key's, e.g., JohnSmith\\_some Gach náisiúntacht Eochracha, etc.
* Is féidir leat athrú ar an luach an tréith am ar bith. Bíonn na hathruithe i bhfeidhm an chéad uair eile tá an tacar sonraí luchtaithe.
* Bainfear an t-eolas seo ó iarrachtaí domhanda an tacar sonraí sula ndéantar é a phoibliú.
* Ní mór do gach iarratas ar an tacar sonraí a chur isteach nó sonraí a scriosadh a chur san áireamh &amp; údarás = *údar \\* paraiméadar. Tar éis bailíocht an eochair a fhíorú, ERDDAP™ ach Sábhálann an chuid údar (nach bhfuil an eochair) sa chomhad sonraí.

#### Socraigh Suas{#set-up} 

Seo na céimeanna molta a bhunú EDDTableFromHttpGet tacar sonraí:

1. Déan an eolaire is mó a shealbhú sonraí seo tacar sonraí. Mar shampla, a ligean ar úsáid / sonraí / tástálaGet / . An t-úsáideoir ag rith GenerateDatasetsXml agus an t-úsáideoir ag rith ERDDAP™ Ní mór an dá léamh-scríobh rochtain ar an eolaire.
     
2. Bain úsáid as eagarthóir téacs chun sampla a dhéanamh .json l comhad CSV leis an síneadh .json l san eolaire.
Níl an t-ainm tábhachtach. Mar shampla, d'fhéadfá sampla a ghlaoch .json l l l l
Déan líne 2 .json l comhad CSV, le hainmneacha colún ar an gcéad líne agus luachanna dummy / tipiciúla (den chineál ceart sonraí) ar an dara líne. Seo comhad sampla atá oiriúnach do bhailiú featureType = AmSraith sonraí a thomhas aer agus teocht an uisce.
     \\[ Le haghaidh featureType = Tírdhreach, d'fhéadfá a athrú stationID a bheith trajectoryID. \\]   
     \\[ Le haghaidh featureType = Próifíl, d'fhéadfá a athrú stationID a bheith próifílithe agus cuir athróg doimhneacht. \\] 
    
     \\[ " " " stationID ", "time" , "airdeas", "fhad", "airTemp", "waterTemp", "timestamp", "údar", "command" \\] 
     \\[ "myStation", "2018-06-25T17:00:00Z", 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, "SomeBody", 0 \\] 
    
Tabhair faoi deara:
    * Ní dhéanann na luachanna sonraí iarbhír ábhar toisc go mbeidh tú a scriosadh sa deireadh an comhad, ach ba chóir iad a bheith ar an gcineál sonraí ceart. Go suntasach, ba cheart an athróg ama a bhaint as an bhformáid chéanna go mbeidh na sonraí iarbhír ón bhfoinse a úsáid.
    * Do gach athróg, an sourceName beidh comhionann leis an destinationName , mar sin bain úsáid as na hainmneacha ceart / deiridh athróg anois, lena n-áirítear am, domhanleithead, domhanfhad agus uaireanta doimhneacht nó airde má athróga leis an eolas sin a chur san áireamh.
    * Beidh beagnach i gcónaí am athraitheach ainmnithe a thaifeadann an t-am a rinneadh an breathnóireacht. Is féidir é a bheith dataType Curtain le [aonaid oiriúnach do amanna teaghrán](#string-time-units)   (e.g., yyyy-MM-dd 'T'H: mm: SSSSZ) nó sonraí Cineál dúbailte le [aonaid oiriúnach do amanna uimhriúla](#time-units)   (e.g., soicind ó 1970-01T00:00:00Z, nó roinnt ama bonn eile) .
    * Trí cinn de na colúin (de ghnáth na trí deireanach) Ní mór a bheith amstamp, údar, ordú.
    * Beidh an colún ama a úsáid ag EDDTableFromHttpGet chun amstamp a chur in iúl nuair a chuir sé líne ar leith sonraí leis an gcomhad sonraí. Beidh sé sonraí Type dúbailte agus aonaid soicind ó 1970-01T00:00:00Z.
    * Bainfear úsáid as an gcolún údar le dataType String chun taifead a dhéanamh a d'údaraigh sonraí na líne seo. Údaraithe údair atá sonraithe ag an [ http GetKeys tréith domhanda](#httpgetkeys) . Cé go bhfuil na heochracha sonraithe mar *údar \\* agus tá siad sa "request" URL san fhoirm sin, ach tá an chuid údar a shábháil sa chomhad sonraí.
    * Beidh an colún ordú le byte sonraí a chur in iúl más rud é go bhfuil na sonraí ar an líne seo a chur isteach (0 0) nó scriosadh (1 1) .
         
3. Rith Sraitheanna Xml agus é a insint
    
    1. Is é an cineál tacar sonraí EDDTableFromHttpGet
    2. Is é an t-eolaire (mar shampla seo) / Sonraí / tástála Faigh /
    3. Is é an comhad sampla (mar shampla seo) / Sonraí / tástála / tosaithe .json l l l l
    4. An bhfuil http Faigh Aitheantas Tá éagsúlachtaí (mar shampla seo)   stationID , am Féach an cur síos ar [ http Faigh Aitheantas](#httpgetrequiredvariables-global-attribute) thíos.
    5. Má bhailítear sonraí gach 5 nóiméad, an http FaighDirectoryStruture don sampla seo stationID /2months . Féach an cur síos ar [ http Faigh Stiúradh](#httpgetdirectorystructure) thíos.
    6. An bhfuil [ http Inis dúinn, le do thoil...](#httpgetkeys) 
    
Cuir an t-aschur (an smután de datasets.xml don tacar sonraí) go dtí datasets.xml .
     
4. Edit an datasets.xml smután don tacar sonraí a dhéanamh ceart agus iomlán.
Go suntasach, in ionad go léir an??? le hábhar ceart.
     
5. Chun an&lt;fileTableInMemory × leagan síos:
    * Socraigh seo go fíor más rud é go mbeidh an tacar sonraí a fháil de ghnáth .insert minic agus / nó .delete iarrataí (m.sh., níos minice ná uair amháin gach 10 soicind) . Cuidíonn sé seo EDDTableFromHttpGet freagra a thabhairt níos tapúla ar iarratais .insert agus / nó .delete. Má shocraíonn tú é seo a fíor, beidh EDDTableFromHttpGet shábháil fós ar an t-eolas fileTable agus a bhaineann le diosca go tréimhsiúil (de réir mar is gá, thart ar gach 5 soicind) .
    * Socraigh seo go bréagach (taiseachas aeir: fliuch) más rud é go mbeidh an tacar sonraí a fháil de ghnáth .insert agus / nó .delete iarrataí (m.sh., níos lú ná uair amháin gach 10 soicind) .
         
6. Tabhair faoi deara: Is féidir é a úsáid&lt;taisceFromUrl × agus suímh ghaolmhara i datasets.xml do EDDTable Féach ar Sonraigh Faigh tacar sonraí mar bhealach a dhéanamh agus a choimeád ar bun cóip áitiúil de EDDTableFromHttpGet iargúlta tacar sonraí ar eile ERDDAP . Mar sin féin, sa chás seo, diúltóidh an tacar sonraí áitiúil seo aon iarrataí .insert agus .delete.

#### Ag úsáid EDDTable Seirbhís do Chustaiméirí{#using-eddtablefromhttpget-datasets} 

* Is féidir le húdair "requests" a dhéanamh [sonraí a chur isteach nó sonraí a scriosadh ón tacar sonraí](#insert-and-delete) .
     
* Tar éis sonraí fíor curtha isteach sa tacar sonraí, is féidir leat agus ba chóir a scriosadh an comhad sonraí sampla bunaidh.
     
* Is féidir le húsáideoirí sonraí a iarraidh ón tacar sonraí mar a dhéanann siad le haghaidh aon tacar sonraí EDDTable eile i ERDDAP . Más rud é nach bhfuil an t-iarratas san áireamh srian ar an colún ama, ansin faigheann an t-iarratas sonraí ón leagan reatha den tacar sonraí (an comhad logála tar éis a phróiseáil gach ceann de na orduithe a chur isteach agus a scriosadh agus ath-bheith ag an http Faigh Aitheantas) .
     
* Is féidir le húsáideoirí iarrataí a dhéanamh freisin atá sonrach do EDDTableFromHttpGet datasets:
    * Má tá an iarraidh san áireamh&lt;nó&lt;= srianta an colún ama, ansin ERDDAP™ próisis sraitheanna an comhad logáil suas go dtí an timestamp sonraithe. I bhfeidhm, scriosann sé seo go sealadach gach ceann de na hathruithe a rinneadh ar an tacar sonraí ó luach ama sin. Le haghaidh tuilleadh eolais, féach [Leagann](#versioning) .
    * Má tá an t-iarratas áirítear ^, ^=, nó = srianta ar an colún ama, m.sh., &amp;timest&lt;= 0, ansin ERDDAP™ tuairisceáin na sonraí ó na comhaid sonraí mar atá, gan próiseáil na horduithe a chur isteach agus a scriosadh.
* Sa todhchaí, táimid envision go mbeidh uirlisí a thógáil (ag dúinn? ag tú?) chun oibriú leis na tacair shonraí seo. Mar shampla, d'fhéadfadh a bheith ann script a léann na comhaid logáil amh, iarratas a chothromóid calabrú éagsúla, agus gineann / updates tacar sonraí éagsúla leis an eolas a dhíorthaítear. Tabhair faoi deara gur féidir leis an script a fháil ar na sonraí bunaidh trí iarratas a dhéanamh ERDDAP™   (a fhaigheann na sonraí i bhformáid comhaid atá éasca don script a bheith ag obair leis) agus a ghiniúint / nuashonrú an tacar sonraí nua trí .insert "requests" chun ERDDAP . Ní gá rochtain dhíreach a bheith ag an script ar na comhaid sonraí; is féidir é a bheith ar aon ríomhaire údar údaraithe.
     

#### Faisnéis mhionsonraithe faoi EDDTableFromHttpGet{#detailed-information-about-eddtablefromhttpget} 

Is iad na topaicí:

*    [Ná athrú ar an thus&#33;](#dont-change-the-setup) 
*    [CRUD](#crud) 
*    [Déan Teagmháil Linn](#invalidrequests) 
*    [Luas agus Luas](#httpget-speed) 
*    [Féachaint ar Fholúntais](#robust) 
*    [irl - Library Service](#system-reliability) 
*    [Leagann](#versioning) 
*    ["Cad faoi HTTP PUT agus DELETE?&#33;"](#https-put-and-delete) 
*    [Nótaí](#httpget-notes) 
*    [Buíochas le CHORDS don smaoineamh bunúsach.](#thanks) 

Seo an t-eolas mionsonraithe:

##### Ná athrú ar an thus&#33;{#dont-change-the-setup} 
Nuair a bheidh an tacar sonraí cruthaithe agus tá tú sonraí a chur leis:

* Ná cuir nó bain aon dataVariable s.
* N'T athrú ar an sourceName nó destinationName de na dataVariable s.
* N'T athrú ar na sonraí Cineál an dataVariable s. Ach is féidir leat athrú ar an dataVariable 's meiteashonraí.
* N'T athrú ar an http Faigh Aitheantas Éagsúlacht tréith domhanda.
* N'T athrú ar an http GetDirectoryStructure tréith domhanda.

Más gá duit aon cheann de na rudaí seo a athrú, tacar sonraí nua a dhéanamh agus na sonraí go léir a aistriú chuig an tacar sonraí nua.
     
##### CRUD{#crud} 
I eolaíocht ríomhaireachta, na ceithre orduithe bunúsacha le haghaidh obair le tacar sonraí [CREATE, LÉIGH, UPDATE, DELETE (CRUD) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) . SQL, an teanga le bheith ag obair le bunachair shonraí i ndáil, tá an choibhéis in INSERT, SELECT, UPDATE, agus DELETE. I EDDTableFromHttpGet,

* Is meascán de CREATE agus UPDATE é .insert.
* Tá .delete DELETE.
* Is é READ an córas rialta chun fo-thacar sonraí a iarraidh.

Dá bhrí sin, EDDTableFromHttpGet Tacaíonn gach ceann de na orduithe bunúsacha le haghaidh obair le tacar sonraí.
     
* Beidh iarratais .insert nó .delete gan aon earráidí ar ais cód stádas HTTP = 200 agus réad JSON, m.sh.,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
Tagraíonn an dá luachanna ama don millisecond céanna, arb é an millisecond a stóráil sa athróg ama do na sraitheanna sonraí a cuireadh isteach nó a scriosadh. ERDDAP™ Ní bheidh athrú ar an ainm agus formáidiú na péirí eochair-luach sa todhchaí. ERDDAP™ d'fhéadfadh péirí eochairluach breise a chur leis an réad JSON sa todhchaí.
     
##### Déan Teagmháil Linn{#invalidrequests} 
Beidh iarratais Invalid .insert nó .delete ar ais cód stádas earráid HTTP seachas stádas = 200 agus ní bheidh aon athrú a dhéanamh ar an tacar sonraí. Áirítear leis seo iarrataí le faisnéis údar mícheart, ainmneacha athróg mícheart, faid eagar éagsúla le haghaidh athróg éagsúla, athróg ar iarraidh ag teastáil, luachanna athróg ag teastáil ar iarraidh, etc. Má bhíonn níos mó ná comhad sonraí amháin i gceist leis an iarratas, is féidir go n-éireoidh leis an gcuid sin den iarratas agus go dteipfidh cuid de. Mar sin féin, níor chóir é seo a bheith ina fhadhb má déileálann an braiteoir a sheoladh an t-iarratas aon teip mar teip iomlán. Mar shampla, má deir tú ERDDAP™ cuir isteach (nó scrios) na sonraí céanna faoi dhó i ndiaidh a chéile, is é an cás is measa go bhfuil an fhaisnéis a stóráil faoi dhó, in aice le chéile sa chomhad logáil. Tá sé deacair a fheiceáil conas a d'fhéadfadh a bheith ina chúis le dtrioblóid.
     
##### Luas an Fhómhair{#httpget-speed} 
Le haghaidh .insert nó .delete iarrataí (gan comhaireamh http lastuas) , figiúirí liathróid an luas .insert nó .delete Tá
1ms in aghaidh an .insert le 1 sraith sonraí
2ms in aghaidh .insert le 10 sraitheanna de shonraí i arrays ( \\[  \\] )   
3ms in aghaidh .insert le 100 sraitheanna de shonraí i arrays ( \\[  \\] )   
13ms in aghaidh .insert le 1000 sraitheanna de shonraí i arrays ( \\[  \\] )   
Tá arrays Clearly an eochair do [tréchur ard](#httpget-speed) . Gan arrays, beidh sé dúshlánach a .insert nó .delete níos mó ná 8 sraitheanna sonraí in aghaidh an dara ó údar iargúlta (mar gheall ar lasnairde an líonra) . Le arrays, beidh sé éasca a .insert nó .delete níos mó ná 1000 sraitheanna sonraí in aghaidh an dara ó braiteoir iargúlta.

Le méideanna an-mhór na sonraí in aghaidh na hiarrata, beidh tú a bhuail teorainn Tomcat ar an fad cheist uasta (riachtanais uisce: measartha) , ach is féidir a mhéadú trí eagarthóireacht ar an suíomh maxHttpHeaderSize i do *taiseachas aeir: fliuch* HTTP / 1.1 iontráil nascóirí.

Nuair a bheidh ERDDAP™ léann an JSON Línte CSV sonraí (log log log) comhaid, tá pionós beag ama i gcomparáid le léamh comhaid sonraí dénártha. Bhraith muid go raibh an pionós ama seo nuair a bhí léamh ar phraghas réasúnta a íoc as luas agus stóinseacht an chórais nuair a scríobh sonraí (a bhfuil tábhacht phríomhúil léi) .

##### Soladach 316 Cruach dhosmálta{#ssd} 
 [Le haghaidh luas níos mó,](#ssd) úsáid a bhaint as [Soladach Stáit Drive (Soladach 316 Cruach dhosmálta) ](https://en.wikipedia.org/wiki/Solid-state_drive) na sonraí a stóráil. Tá siad i bhfad níos tapúla am rochtana comhad (&lt;0.1ms) ná thiomáineann dhiosca crua (3 - 12 ms) . Tá ráta aistrithe sonraí níos tapúla acu freisin (200 - 2500 MB/s) ná thiomáineann dhiosca crua (~ 200 MB / s) . Tá a gcostas teacht síos go mór le blianta beaga anuas. Cé go raibh fadhbanna luath SSD tar éis líon mór de scríobhann le bloc ar leith, tá an fhadhb seo laghdaithe go mór anois. Má úsáideann tú ach an SSD a scríobh na sonraí uair amháin ansin é a léamh go leor uair, fiú SSD tomhaltóir-grád (atá i bhfad níos saoire ná SSD fiontraíochta-ghrád) Ba chóir go deireanach ar feadh i bhfad.
    
##### Féachaint ar Fholúntais{#robust} 
Táimid tar éis iarracht a dhéanamh ar an gcóras seo chomh héasca-le-obair le agus chomh láidir agus is féidir.
* Tá an córas deartha chun snáitheanna éagsúla a bheith acu (e.g., an braiteoir, script QC uathoibrithe, agus an duine) ag obair ag an am céanna ar an tacar sonraí céanna agus fiú an comhad céanna. Is féidir go leor de seo a dhéanamh trí úsáid a bhaint as cur chuige comhaid log chun na sonraí a stóráil agus trí chineál comhaid an-simplí a úsáid, [JSON Línte comhaid CSV](https://jsonlines.org/examples/) , na sonraí a stóráil.
* Is buntáiste ollmhór eile a JSON Lines CSV go má dhéanann comhad a bheith truaillithe riamh (e.g. neamhbhailí mar gheall ar earráid ar líne) , tá sé éasca a oscailt an comhad i eagarthóir téacs agus an fhadhb a shocrú.
* Is buntáiste eile, má tá earráid ar líne i gcomhad, is féidir leis an gcóras a léamh fós na sonraí go léir ar línte roimh agus tar éis an líne earráide. Agus is féidir leis an gcóras fós logáil isteach breise .insert agus .delete faisnéis.
* Buntáiste ollmhór ag baint úsáide as admin-accessible comhaid caighdeánach (i gcomparáid le bunachar sonraí nó Cassandra nó bogearraí eile) : Níl aon bhogearraí eile atá le cothabháil agus atá le reáchtáil chun sonraí a stóráil nó a aisghabháil. Agus tá sé éasca ar ais suas comhaid caighdeánach ag am ar bith agus ar bhealach incriminteach toisc go bhfuil na sonraí i smután (tar éis tamaill, ní bheidh ach an comhad reatha-ama do gach stáisiún ag athrú) . I gcodarsnacht leis sin, a thógann sé iarracht mhór agus córas síos am a dhéanamh comhaid cúltaca seachtrach ó bhunachair shonraí agus ó Cassandra.
         
##### irl - Library Service{#system-reliability} 
Tá sé réasúnta a bheith ag súil le freastalaí amháin le ERDDAP™ a bheith acu 99.9% uptime - go bhfuil thart ar 9 uair an chloig de downtime in aghaidh na bliana (cé, is féidir leat é a úsáid suas in aon oíche olc&#33;) .
Má tá tú díograiseach agus t-ádh, d'fhéadfá a fháil 99.99% uptime (53 nóiméad downtime in aghaidh na bliana) , ós rud é go mbeidh ach cúpla atosú le haghaidh nuashonruithe a ghlacadh an oiread sin ama.
Ba mhaith leat a ghlacadh bearta mhór (freastalaí cúltaca ar leith, soláthar cumhachta uninterruptible, aerchóirithe cúltaca, 24x7x365 pearsanra chun monatóireacht a dhéanamh ar an suíomh, etc.) a bhfuil seans caol ag 99.999% uptime (5.25 nóiméad downtime in aghaidh na bliana) . Fiú ansin, tá sé thar a bheith dócha go mbeidh tú a bhaint amach 99.999% uptime (nó fiú 99.99%) toisc go bhfuil fadhbanna go minic lasmuigh de do rialú. Mar shampla, a thairiscint Amazon Seirbhís Gréasáin agus Google seirbhísí gréasáin astonishingly iontaofa, ach tá codanna móra acu uaireanta síos le haghaidh uair an chloig.

Aghaidh é, ba mhaith le gach duine ERDDAP™ go bhfuil 100% uptime, nó ar a laghad an vaunted "sé naoií" (99.9999% uptime comhionann le 32 soicind de downtime in aghaidh na bliana) , ach níl aon bhealach tá tú ag dul a fháil is cuma cé mhéad ama, iarracht, agus airgead a chaitheann tú.

Ach ERDDAP™ Níl uptime an sprioc fíor anseo. Is é an sprioc a thógáil iontaofa **córas córas** , ceann nach chailleann aon sonraí. Is fadhb shochorraithe é seo.

Is é an réiteach: a thógáil locht-tolerance isteach na bogearraí ríomhaire go bhfuil na sonraí a sheoladh chuig ERDDAP . Go sonrach, ba chóir bogearraí a choimeád ar bun scuaine na sonraí ag fanacht chun dul go dtí ERDDAP . Nuair a sonraí a chur leis an scuaine, ba chóir na bogearraí seiceáil an freagra ó ERDDAP . Mura n-áiríonn an freagra sonraí a fuarthas. Uimh earráidí., ansin ba chóir na bogearraí a fhágáil ar na sonraí sa scuaine. Nuair a bhíonn níos mó sonraí a ghintear agus a chur leis an scuaine, Ba chóir na bogearraí iarracht arís a .insert na sonraí sa scuaine (b'fhéidir leis an \\[  \\] córas córas) . Tiocfaidh sé chun cinn nó theipeann. Má theipeann air, déanfaidh sé iarracht arís ina dhiaidh sin. Má scríobhann tú na bogearraí a bheith ag obair ar an mbealach seo agus má tá na bogearraí ullmhaithe a scuaine cúpla lá fiú na sonraí, a dhéanann tú i ndáiríre go bhfuil seans maith a uaslódáil 100% de na sonraí braiteoir a ERDDAP . Agus beidh tú é a dhéanamh gan dul go mór iarracht nó costas.

 \\[ Cúlra: Ní raibh muid ag smaoineamh seo suas. [Is é seo an chaoi gréasáin ríomhaire a bhaint amach iontaofacht.](https://en.wikipedia.org/wiki/Reliability_(computer_networking) ) Tá líonraí ríomhaireachta neamhiontaofa go bunúsach. Mar sin, nuair a aistríonn tú comhad ó ríomhaire amháin go ceann eile, a fhios ag an bogearraí a sheoladh / Gnéithe gur féidir roinnt paicéid a bheith caillte. Mura bhfaigheann sé admháil chuí ar phaicéad áirithe ón nglacadóir, cuireann sé an paicéad caillte ar ceal. Leis an gcur chuige seo, is féidir le seoltóir agus bogearraí glacadóir réasúnta simplí córas aistrithe comhad iontaofa a thógáil ar bharr líonra neamhiontaofa. \\] 
    
##### Cén fáth JSON Línte comhaid CSV?&#33;{#why-json-lines-csv-files} 
Úsáideann EDDTableFromHttpGet [JSON Línte comhaid CSV](https://jsonlines.org/examples/) . chun na sonraí a stóráil. Is iad na cúiseanna:

* Is é an chúis is mó: Cuireann an simplíocht JSON Línte comhaid CSV ar bhealach tapa, éasca agus iontaofa chun ligean snáitheanna éagsúla a scríobh chuig comhad ar leith (e.g., trí shioncrónú ar an ainm comhaid) .
* Má tá JSON Línte CSV comhad a bhí riamh truaillithe (e.g. neamhbhailí mar gheall ar earráid ar líne) , D'fhéadfadh EDDTableFromHttpGet léamh fós gach ceann de na sonraí ar gach ceann de na línte roimh agus tar éis an líne earráide. Agus d'fhéadfadh an córas .insert agus .delete leanúint ar aghaidh ag cur sonraí nua leis an gcomhad sonraí.
* Toisc go bhfuil an JSON Línte CSV comhaid ASCII, más rud é go raibh comhad a bheith truaillithe riamh, bheadh sé éasca a shocrú (i eagarthóir téacs) .
* Tacaíonn JSON Lines CSV teaghráin Unicode.
* JSON Línte CSV tacaíochtaí teaghráin fad athraitheach (ní teoranta do roinnt fad max) .
* JSON Línte CSV Tacaíonn 64-giotán slánuimhreacha (tréimhse saoil: ilbhliantúil) .
* An nádúr foirmiúil agus syntax breise de JSON Línte CSV (vs seanscoil CSV) Soláthraíonn roinnt dearbhú breise nach bhfuil líne ar leith curtha truaillithe.

Rinneamar iarracht ar dtús a úsáid .nc 3 comhaid le gné neamhtheoranta. Mar sin féin, bhí fadhbanna:

* Ba í an phríomhfhadhb: Níl aon bhealach iontaofa chun ligean snáitheanna éagsúla a scríobh chuig .nc 3 comhad, fiú má chomhoibríonn na snáitheanna trí na scríobhann a dhéanamh ar bhealach synchronized.
* Má tá .nc Éiríonn 3 comhad truaillithe, ní féidir leis an .insert agus .delete córas leanúint ar aghaidh ag úsáid an comhad.
* Mar gheall ar an .nc 3 comhaid dénártha, má éiríonn comhad truaillithe (a dhéanann siad mar gheall ar an fhadhb il-threading) go bhfuil siad thar a bheith deacair nó dodhéanta a shocrú. Níl aon uirlisí ann chun cabhrú leis an deisiú.
* Tá CF aon bhealach a shonrú ar an ionchódú de teaghráin, mar sin níl aon bhealach oifigiúil chun tacú le Unicode, m.sh., an ionchódú UTF-8. Rinneamar iarracht CF a fháil chun tacú le tréith \\_Encoding ach ní raibh siad in ann aon dul chun cinn a dhéanamh. ( Unidata , ar a gcreidmheas, a dhéanann tacú leis an tréith \\_Encoding.) 
*    .nc 3 comhaid tacaíocht ach teaghráin fad seasta. Arís, rinne muid a fháil CF agus Unidata chun tacú le teaghráin fad athróg ach bhí siad in ann aon dul chun cinn a dhéanamh.
*    .nc Ní 3 comhaid tacaíocht a thabhairt ar bhealach éasca chun idirdhealú a dhéanamh athróg carachtar amháin ó athróg Curtain. Arís, rinne muid a fháil CF agus Unidata chun tacú le córas chun idirdhealú a dhéanamh ar an dá chineál sonraí, ach bhí siad in ann aon dul chun cinn a dhéanamh.
*    .nc 3 comhaid ach tacaíocht a thabhairt carachtair 8-giotán le ionchódú neamhshonraithe. Arís, rinne muid a fháil CF agus Unidata chun tacú le córas chun an ionchódú a shonrú, ach ní raibh siad in ann aon dul chun cinn a dhéanamh.
*    .nc 3 comhaid nach bhfuil tacaíocht 64-giotán slánuimhreacha (tréimhse saoil: ilbhliantúil) . Arís, rinne muid a fháil CF agus Unidata chun tacú le córas le haghaidh faide, ach bhí siad in ann aon dul chun cinn a dhéanamh.
         
##### Leagann{#versioning} 
Mar gheall ar EDDTable Féach ar Sonraigh Faigh siopaí logáil de gach ceann de na hathruithe ar an tacar sonraí leis an lasc ama agus an t-údar de gach athrú, is féidir é a athchruthú go tapa go tacar sonraí mar aon phointe in am. Sa chiall, tá leagan le haghaidh aon phointe in am. Má tá amstamp san áireamh in iarratas úsáideora ar shonraí&lt;= sriantacht, m.sh., &amp; am&lt;= 2016-06-23T16:32:22.128Z (nó aon phointe ama) , ach aon srian údar nó ordú, ERDDAP™ freagra a thabhairt ar an iarraidh trí chéad ghiniúint leagan den tacar sonraí mar an bpointe sin in am. Ansin, ERDDAP™ srianta eile an úsáideora a chur i bhfeidhm, mar aon le haon iarraidh eile ar shonraí ó ERDDAP . Tá EDDTableFromHttpGet ar bun ionas go mbeidh an próiseas seo an-tapa agus éifeachtach, fiú le haghaidh tacar sonraí an-mhór.

Mar an gcéanna, Is féidir le húsáideoir a fháil amach nuair a bhí an tacar sonraí cothrom le dáta go deireanach trí iarraidh ... (taiseachas aeir: fliuch) agus ar leith () 

Agus le haghaidh aon iarratas ar shonraí, le haghaidh aon leagan den tacar sonraí, is féidir le húsáideoirí a fheiceáil cén t-údar a rinne athruithe, agus nuair a rinne siad iad.

Cuireann an córas leaganú ar chumas [Eolaíocht inspreagtha](https://en.wikipedia.org/wiki/Reproducibility) toisc gur féidir le duine ar bith, ag am ar bith, sonraí a iarraidh ón leagan den tacar sonraí ag aon phointe in am. Níl an leaganú fíneáil-grained indéanta le haon chóras eile a fhios againn de. Tá an mheicníocht bhunúsach an-éifeachtach, sa mhéid is nach bhfuil aon spás stórála breise ag teastáil, agus go bhfuil an forchostais próiseála fíor-bheag.

Níl gach duine gá le haghaidh an cineál leagan fíneáil-grained, ach tá sé thar a bheith úsáideach, b'fhéidir is gá, i gcomhthéacs eagraíocht bainistíochta sonraí mór (e.g., OOI, Ciúb na Cruinne, Sonraí a hAon, agus NOAA 's NCEI) áit ar féidir le tacar sonraí a bheith údair il (e.g., an braiteoir, script QC uathoibrithe, agus eagarthóir daonna) .

 \\[ Stair: An gá atá leis an gcineál seo leagan den chéad uair a tháinig suas dom (Bob go bhfuil) nuair a léamh faoi OOI agus a phlé in 2008. Ag an am, bhí OOI córas cumbersome, mall, neamhéifeachtach do leagan bunaithe ar Git. Tá Git iontach do cad a bhí sé deartha le haghaidh, ach ní seo. I 2008, agus ag plé OOI, dhear mé córas fairsing, éifeachtúil malartach-go-OOI do bhainistíocht sonraí, lena n-áirítear go leor de na gnéithe a chuir mé leis ERDDAP™ ó shin, agus lena n-áirítear an córas leagan. Ag an am sin agus ó shin, bhí OOI tiomanta dá gcóras leagan agus ní suim i roghanna eile. In 2016, thit gnéithe eile den phlean seo i bhfeidhm agus thosaigh mé ag cur i bhfeidhm é. Toisc go raibh go leor de na briseadh a bheith ag obair ar thionscadail eile, ní raibh mé ag críochnú go dtí 2018. Fiú anois, níl mé ar an eolas faoi aon chóras sonraí eolaíochta eile a thairgeann rochtain chomh tapa agus éasca ar leagan de na sonraí ó aon phointe in am, le haghaidh sonraí a athrú go minic. Ní gá córais comhad simplí a thairiscint seo. Ní bunachair shonraí coibhneasta. Ní Cassandra. \\] 
    
##### HTTPS Cuir agus Scrios{#https-put-and-delete} 
*    ["Cad faoi HTTPS PUT agus DELETE?&#33;"](#https-put-and-delete)   
     [Prótacal Aistrithe Hipirtéal (HTTP) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) Is é bunús an Gréasán Domhanda agus an chúis a thosaíonn URLanna leathanach gréasáin le "http://"nó "https://". Is HTTPS HTTP le sraith slándála breise. Gach lá, brabhsálaithe, scripteanna agus cláir ríomhaireachta a dhéanamh billiúin de HTTP (Staidéar S)   **Glóthach** iarratais chun faisnéis a fháil ó fhoinsí iargúlta. HTTP (Staidéar S) san áireamh freisin eile [briathra](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) , go háirithe PUT (sonraí a bhrú chuig an bhfreastalaí) agus DELETE (go sonraí DELETE ón bhfreastalaí) . Is ea, PUT agus DELETE an bealach ceart chun sonraí a chur isteach, agus sonraí a scriosadh ó, tacar sonraí trí HTTP (Staidéar S) . Tá GET tacaíocht ó gach píosa bogearraí is féidir a bheith ag obair le HTTP (Staidéar S) . Tá GET i ndáiríre éasca a bheith ag obair leis. Tá a fhios ag gach duine cheana féin conas a bheith ag obair le GET agus go leor a fhios conas a úsáid POST (is féidir a úsáid go bunúsach ar an mbealach céanna le GET) , mar sin rinne muid obair EDDTableFromHttpGet le GET agus POST. An-beag daoine (fiú níos lú ríomhchláraitheoirí) ag obair riamh le PUT agus DELETE. PUT agus DELETE tacaíocht de ghnáth ach amháin ag teangacha ríomhaireachta, mar sin ag baint úsáide as éilíonn siad clár sciliúil. Mar sin, tá PUT agus ROLETE de ghnáth cur chuige i bhfad níos cumbersome mar gheall ar an mbealach na huirlisí tagtha chun cinn.
     
##### Plean Gníomhaíochta don Oideachas{#httpget-notes} 
*    [Nótaí](#httpget-notes) 
    * Níl an Tweet seo ar fáil dataVariable d'fhéadfadh go mbeadh dataType = carr. Bain úsáid as dataType = Tabhair ina ionad. Más gá duit i ndáiríre dataType = carr, ríomhphost Chris. John ag noaa.gov.
         
##### Go raibh maith agat{#thanks} 
*    [Buíochas le CHORDS don smaoineamh bunúsach.](#thanks)   
An smaoineamh bunúsach do EDDTableFromHttpGet (i.e., ag baint úsáide as HTTP GET iarraidh sonraí a chur le tacar sonraí) Is ó UCAR ar (NCAR ar?)   [Seirbhísí Sonraí Fíor-ama Cloud-Hosted (An tSraith Shinsearach) ](https://github.com/earthcubeprojects-chords) tionscadal. An fhormáid do na paraiméadair san iarraidh (arís agus arís eile *ainm = luach* , scartha ag &amp;) Is é an fhormáid chaighdeánach chéanna a úsáideann foirmeacha HTML ar leathanaigh ghréasáin. Tá sé smaoineamh simplí agus iontach agus fiú níos mó mar gheall ar mogalra sé chomh breá le ERDDAP 's córas atá ann cheana féin chun déileáil le sonraí tabular. Is é an smaoineamh soiléir i hindsight, ach mé (Bob go bhfuil) Ní raibh smaoineamh air. EDDTableFrom Http Faigh Úsáideann go smaoineamh bunúsach, in éineacht lenár smaointe ar conas é a chur i bhfeidhm, chun córas a dhéanamh i ERDDAP™ chun sonraí a uaslódáil. Seachas an smaoineamh bunúsach ag baint úsáide as GET chun sonraí a bhrú isteach sa chóras, is é an cur i bhfeidhm EDDTableFromHttpGet go hiomlán difriúil agus go hiomlán neamhspleách ar CHORDS agus tá gnéithe éagsúla (e.g., comhaid logála, smután sonraí, córas slándála éagsúla, tacaíocht CRUD, sonraí in-atáirgthe) . Bhí ár nochtadh do CHORDS ach seimineár gréasáin. Ní raibh muid ag breathnú ar a n-cód nó a léamh mar gheall ar a fhios againn láithreach bhíomar ag iarraidh a chur i bhfeidhm ar an gcóras ar bhealach difriúil. Ach tá muid buíoch dóibh as an smaoineamh bunúsach. Is é an tagairt iomlán do CHORDS
Daniels, M. D., Kerkez, B., Chandrasekar, V., Graves, S., Stampaí, D. S., Martin, C., Dye, M., Gooch, R., Bartos, M., Jones, J., Keiser, K. (Roghnaigh gach rud) . Cloud-Hosted Real-am Seirbhísí Sonraí do na Geosciences (An tSraith Shinsearach) bogearraí. UCAR / NCAR - An tSaotharlann Breathnadóireachta Domhain. [https://doi.org/10.5065/d6v1236q](https://doi.org/10.5065/d6v1236q)   
     
### EDDTableFrom Hyrax Amharc ar gach eolas{#eddtablefromhyraxfiles} 
 [ **EDDTableFrom Hyrax Amharc ar gach eolas** ](#eddtablefromhyraxfiles)   (bláthanna cumhra: cumhráin) comhiomlánaí comhaid sonraí le hathróga éagsúla, gach ceann acu le toisí amháin nó níos mó roinnte (mar shampla, am, airde (nó doimhneacht) , domhanleithead, domhanfhad) , agus a sheirbheáil ag [ Hyrax   OPeNDAP freastalaí freastalaí](https://www.opendap.org/software/hyrax-data-server) .

* Is é seo an cineál tacar sonraí **DEPRECATE** . Is é an réiteach níos nuaí agus níos ginearálta ná úsáid a bhaint as an [taisce taisce taisce Rogha FromUrl do EDDTable Seirbhís do Chustaiméirí](#cachefromurl)   (nó malairt) , a dhéanann cóip áitiúil de na comhaid iargúlta agus feidhmíonn na sonraí ó na comhaid áitiúla. An bhfuil&lt;Is féidir é a úsáid le haon chineál comhad sonraí tabular. **   
Más rud é nach féidir leat a dhéanamh go n-oibríonn ar chúis éigin, ríomhphost Chris. John ag noaa.gov.
Mura bhfuil aon ghearáin ann roimh 2020, féadfar an cineál tacar sonraí seo a bhaint. ** 
* Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Is féidir leat a chur in eagar ansin go fíneáil tune é.
* I bhformhór na gcásanna, tá gach comhad luachanna il do na leftmost (chéad chéad uair) gné, mar shampla, am.
* Na comhaid go minic (ach nach bhfuil a) a bhfuil luach amháin do na gnéithe eile (mar shampla, airde (nó doimhneacht) , domhanleithead, domhanfhad) .
* D'fhéadfadh na comhaid a bheith athróg carachtar le gné bhreise (mar shampla, nCharacters) .
*    Hyrax Is féidir freastalaithe a aithint ag an " / dods-bin/nph-dods/" nó "/oscailt /" sa URL.
* An scáileán rang-scrapes an Hyrax leathanaigh ghréasáin leis na liostaí de chomhaid i ngach eolaire. Mar gheall ar seo, tá sé an-sonrach don fhormáid reatha Hyrax leathanaigh ghréasáin. Déanfaimid iarracht a choigeartú ERDDAP™ go tapa má / nuair leaganacha amach anseo Hyrax athrú ar an gcaoi a bhfuil na comhaid liostaithe.
* An bhfuil&lt;Tá comhadDir uaire leagan neamhaird. Ós rud é go n-íoslódálann an rang seo agus go ndéanann sé cóip áitiúil de gach comhad sonraí iargúlta, ERDDAP™ fórsaí an comhad Dir a bheith *Treoir do Thuismitheoirí* Seirbhís do Chustaiméirí * datasetID * /.
* Le haghaidh&lt; sourceUrl ×, bain úsáid as an URL an eolaire bonn de na tacar sonraí sa Hyrax freastalaí, mar shampla,
    &lt; sourceUrl úhttp://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/&lt;/ Baile sourceUrl ú
     (ach é a chur ar líne amháin)   (Tá brón orainn, go bhfuil freastalaí a thuilleadh ar fáil) .
An bhfuil sourceUrl leathanach gréasáin de ghnáth " OPeNDAP Innéacs Freastalaí de \\[ tréimhse saoil: ilbhliantúil \\] " ag an mbarr.
* Ós rud é go n-íoslódálann an rang seo i gcónaí agus déanann sé cóip áitiúil de gach comhad sonraí iargúlta, níor chóir duit an tacar sonraí seo a fhilleadh i [EDDTableCopy](#eddtablecopy) .
* Féach an rang seo' superclass, [EDDTableFromFiles](#eddtablefromfiles) , le haghaidh faisnéise ar conas a oibríonn an rang seo agus conas é a úsáid.
* Féach an 1D, 2D, 3D, agus 4D samplaí le haghaidh [EDDTableFromNcFiles](#eddtablefromncfiles) .
     
### EDDTableFrom InvalidCRAFiles{#eddtablefrominvalidcrafiles} 
 [ **EDDTableFrom InvalidCRAFiles** ](#eddtablefrominvalidcrafiles) comhiomlánaithe sonraí ó NetCDF   (v3 nó v4)   .nc comhaid a úsáideann ar leith, neamhbhailí, leagan den CF DSG Dtiguous Ragged Array (irl - Library Service) comhaid. Cén fáth Cé ERDDAP™ Tacaíonn sé leis an gcineál comhaid seo, is cineál comhaid neamhbhailí é nár chóir do dhuine tosú ag úsáid. Moltar go láidir do ghrúpaí a úsáideann an cineál comhaid seo faoi láthair úsáid a bhaint as ERDDAP™ a ghiniúint bailí CF DSG comhaid CRA agus stop ag baint úsáide as na comhaid.

Sonraí: Tá na comhaid seo athróg sraith il\\_size, gach ceann acu le tréith sampla \\_dimension. Is iad na comhaid neamh-CF-chaighdeán comhaid mar gheall ar an sampla il (riachtanais uisce: measartha) Tá toisí a dhíchódú agus a bhaineann lena chéile leis an riail bhreise agus gealltanas nach bhfuil mar chuid den CF DSG sonraíocht: "Is féidir leat a chomhlachú ar leith e.g., luach teocht (temp\\_obs gné) le luach doimhneacht ar leith (z \\_obs gné, an ghné leis na luachanna is mó) , mar gheall ar: an tsraith teochta \\_size (do caitheadh ar leith) a bheith 0 nó comhionann leis an tsraith doimhneacht comhfhreagrach \\_size (do caitheadh)   (go bhfuil an riail) . Mar sin, más rud é nach bhfuil an tsraith teochta \\_size 0, ansin baineann na luachanna teochta n don caitheadh sin go díreach leis na luachanna doimhneachta n don caitheadh (go bhfuil an gealltanas) ."

Fadhb eile leis na comhaid seo: an Príomh\\_Investigator as a chéile\\_size athróg nach bhfuil gné sampla \\_dimension agus nach leanann an riail thuas.

Is féidir le comhaid samplacha don chineál seo tacar sonraí a fháil aghttps://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[ Clár na dToghthóirí Níl an freastalaí seo ar fáil go hiontaofa a thuilleadh \\] .

Féach an rang seo' superclass, [EDDTableFromFiles](#eddtablefromfiles) , le haghaidh faisnéise ar conas a oibríonn an rang seo agus conas é a úsáid.

Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Is féidir leat a chur in eagar ansin go fíneáil tune é.

An chéad rud GenerateDatasets Déanann Xml don chineál seo tacar sonraí tar éis duit freagra a thabhairt ar na ceisteanna a phriontáil struchtúr ncdump-mhaith an comhad sampla. Mar sin, má théann tú cúpla freagraí goofy don chéad lúb trí GenerateDatasets Xml, ar a laghad beidh tú in ann a fheiceáil má ERDDAP™ Is féidir an comhad a léamh agus a fheiceáil cad iad na gnéithe agus na hathróga sa chomhad. Ansin is féidir leat freagraí níos fearr a thabhairt don dara lúb trí GenerateDatasetsXml.
 
### Seirbhísí ar líne{#eddtablefromjsonlcsvfiles} 
 [ **Seirbhísí ar líne** ](#eddtablefromjsonlcsvfiles) comhiomlánaithe sonraí ó [JSON Línte comhaid CSV](https://jsonlines.org/examples/) . Féach an rang seo' superclass, [EDDTableFromFiles](#eddtablefromfiles) , le haghaidh faisnéise ar conas a oibríonn an rang seo agus conas é a úsáid.

* Mar a deir jsonlines.org, is é an fhormáid seo "Better ná CSV" (agus go dlíthiúil, mar fhostaí cónaidhme, Ní féidir liom aontú nó a n-aontaíonn leo - conas dÚsachtach é sin?) . Ní dhearnadh CSV a shainiú go foirmiúil agus tá sé ag cur bac ar an mbagáiste stairiúil a bhaineann lena nasc leis na cláir scarbhileoige bunaidh. Tá JSON Lines CSV, i gcomparáid, sainithe go hiomlán agus sochair as a nasc leis an gcaighdeán JSON a úsáidtear go forleathan, a théann sochair as a nasc chuig Java Script agus Script Java . Go suntasach, tá tacaíocht iomlán do slánuimhreacha fada agus do charachtair Unicode i teaghráin, agus ar bhealach soiléir a chur san áireamh carachtair speisialta eile (go háirithe tabs and newlines) laistigh de teaghráin.
    
Tá an fhormáid seo go háirithe go maith le haghaidh tacar sonraí nuair is gá duit sraitheanna breise a chur i gceangal go tréimhsiúil go dtí deireadh comhad sonraí ar leith. Ar an gcúis sin agus daoine eile (féach thuas) , [Féachaint ar Fholúntais](#eddtablefromhttpget) Úsáideann Json Línte CSV comhaid le haghaidh stórála sonraí.
    
* Glactar leis na comhaid ionchuir a bheith ionchódaithe UTF-8. Mar sin féin, mar gheall ar an \\ *taiseachas aeir: fliuch* formáid chun carachtair speisialta ionchódú (e.g., is é \\u20ac an ionchódú do charachtar an Euro) , tá tú an rogha a scríobh na comhaid ionas go bhfuil siad ach 7-giotán carachtair ASCII trí úsáid a bhaint \\ \\ *taiseachas aeir: fliuch* a ionchódú gach carachtar thuas #127.
     
* Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Is féidir leat a chur in eagar ansin go fíneáil tune é.
    
Déanann an chéad rud GenerateDatasetsXml don chineál seo tacar sonraí tar éis duit freagra a thabhairt ar na ceisteanna a phriontáil an struchtúr ncdump-mhaith ar an gcomhad sampla. Mar sin, má théann tú cúpla freagraí goofy don chéad lúb trí GenerateDatasets Xml, ar a laghad beidh tú in ann a fheiceáil má ERDDAP™ Is féidir an comhad a léamh agus a fheiceáil cad iad na gnéithe agus na hathróga sa chomhad. Ansin is féidir leat freagraí níos fearr a thabhairt don dara lúb trí GenerateDatasetsXml.
    
* RABHADH: Nuair a ERDDAP™ léann JSON Línte comhaid sonraí CSV, má fhaigheann sé earráid ar líne ar leith (e.g., líon mícheart míreanna) , logs sé teachtaireacht rabhaidh ("GRÚPA: Líne Bad (s s) na sonraí "... le liosta de na línte dona ar línte ina dhiaidh sin) go dtí an [comhad logála.txt](/docs/server-admin/additional-information#log) agus ansin leanann an chuid eile den chomhad sonraí a léamh. Dá bhrí sin, tá sé do fhreagracht chun breathnú tréimhsiúil (nó scríobh script a dhéanamh amhlaidh) don teachtaireacht sin sa logáil. txt ionas gur féidir leat a shocrú ar na fadhbanna sna comhaid sonraí. ERDDAP™ Tá sé ar bun ar an mbealach seo ionas gur féidir le húsáideoirí leanúint ar aghaidh ag léamh gach ceann de na sonraí bailí atá ar fáil cé go bhfuil roinnt línte an comhad flaws.
     
### EDDTableFromMultidimNcFiles{#eddtablefrommultidimncfiles} 
 [ **EDDTableFromMultidimNcFiles** ](#eddtablefrommultidimncfiles) comhiomlánaithe sonraí ó NetCDF   (v3 nó v4)   .nc   (nó [ .nc ml ml](#ncml-files) ) comhaid le hathróga éagsúla, gach ceann acu le toisí roinnte amháin nó níos mó. D'fhéadfadh na comhaid a bheith athróg carachtar le nó gan gné bhreise (mar shampla, STRING14) . Féach an rang seo' superclass, [EDDTableFromFiles](#eddtablefromfiles) , le haghaidh faisnéise ar conas a oibríonn an rang seo agus conas é a úsáid.

* Má tá na comhaid iltoiseach CF leaganacha DSG, úsáid an cineál tacar sonraí in ionad [EDDTableFromNcCFFiles](#eddtablefromncfiles) .
     
* Le haghaidh tacair sonraí cluaisín nua ó .nc comhaid, bain úsáid as an rogha seo sula ag iarraidh an níos sine [EDDTableFromNcFiles](#eddtablefromncfiles) . Tá roinnt buntáistí den rang seo:
    * Is féidir an rang a léamh athróg níos mó ó réimse níos leithne de struchtúir comhad. Má shonraíonn tú DimensionsCSV (liosta comhscartha d'ainmneacha toise) i GenerateDatasets Xml (nó&lt;toisíCSV uaire sa datasets.xml info do cheann de na tacair shonraí), ansin ERDDAP™ Beidh léamh ach athróga sna comhaid foinse a úsáideann roinnt nó gach ceann de na toisí, chomh maith le gach athróg scalar. Má tá gné i ngrúpa, ní mór duit a ainm iomlán a shonrú, m.sh., " *Grúpa Ainm agus Toise Ainm* ".
    * Is féidir leis an rang a dhiúltú go minic comhaid go han-tapa más rud é nach bhfuil siad comhoiriúnach le srianta iarraidh. Mar sin, beidh sonraí a léamh ó bhailiúcháin mór dul go minic i bhfad níos tapúla.
    * Láimhseálann an rang athróg char fíor (athróga neamh-String) i gceart.
    * Is féidir leis an rang Baile Átha Troim athróg Curtain nuair nach raibh an cruthaitheoir a úsáid Netcdf-java ar scríobhStrings (a appends char #0 chun an deireadh an teaghrán) .
    * Tá an rang níos fearr ag déileáil le comhaid aonair go bhfuil easpa athróg nó toisí áirithe.
    * Is féidir leis an rang seo bloic sraitheanna a bhaint le luachanna ar iarraidh mar atá sonraithe le haghaidh [CF Diosca Geometris Sampling (DSG) Incomplete Iltoiseach Array comhaid](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)   
         
* Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Is féidir leat a chur in eagar ansin go fíneáil tune é.
    
Déanann an chéad rud GenerateDatasetsXml don chineál seo tacar sonraí tar éis duit freagra a thabhairt ar na ceisteanna a phriontáil an struchtúr ncdump-mhaith ar an gcomhad sampla. Mar sin, má théann tú cúpla freagraí goofy don chéad lúb trí GenerateDatasets Xml, ar a laghad beidh tú in ann a fheiceáil má ERDDAP™ Is féidir an comhad a léamh agus a fheiceáil cad iad na gnéithe agus na hathróga sa chomhad. Ansin is féidir leat freagraí níos fearr a thabhairt don dara lúb trí GenerateDatasetsXml.
    
Grúpa -- Sonraí a ghiniúint Iarrfaidh Xml "Group". Is féidir leat dul isteach "" chun é a chuardach aon / gach grúpa, " *roinnt roinnt Grúpa an Ghrúpa* " nó " *roinntGroup / roinnt* " chun grúpa sonrach a chuardach, nó " \\[ duille dath glas \\] " chun é a chuardach ach an grúpa fréimhe. Éiríonn an teaghrán "Group"&lt;grúpa ú datasets.xml info don tacar sonraí (cé go " \\[ duille dath glas \\] " thiocfaidh chun bheith "") .
    
Toisí CSV - Géiniteacha Beidh Xml iarraidh ar teaghrán "DimensionsCSV". Is liosta de na hainmneacha foinse de shraith de thoisí é seo. Sonraí a ghiniúint Beidh Xml léamh ach athróg sonraí i sampla .nc comhaid a úsáideann roinnt nó gach ceann de na toisí (agus aon toisí eile) , móide gach ceann de na hathróga scalar sa chomhad, agus a dhéanamh ar an tacar sonraí ó na hathróga sonraí. Má tá gné i ngrúpa, ní mór duit a ainm iomlán a shonrú, m.sh., " *Grúpa Ainm agus Toise Ainm* ".
Má shonraíonn tú rud ar bith (teaghrán folamh) , Géiniteacha Beidh Xml breathnú ar na hathróga leis na toisí is, ar an teoiric go mbeidh siad an chuid is mó suimiúil, ach d'fhéadfadh go mbeadh amanna nuair a bheidh tú ag iarraidh a dhéanamh tacar sonraí ó roinnt grúpa eile na n-athróg sonraí a úsáideann roinnt grúpa eile de na toisí.
Má tá tú a shonrú ach ainm gné nach bhfuil ann (e.g., Uimh.) , ERDDAP™ beidh teacht ach gach ceann de na hathróga scalar.
Éiríonn an teaghrán "DimensionsCSV"&lt;toisíCSV uaire sa datasets.xml info don tacar sonraí.
    
#### Toisí a chóireáil{#treatdimensionsas} 
Tá catagóir neamhbhailí .nc comhaid comhad (toisc nach bhfuil siad a leanúint na rialacha CF) go bhfuil toisí il (e.g., lat, lon, am) nuair ba chóir dóibh a úsáid ach gné amháin (e.g., am) , mar shampla:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
        lat = 1437 ;
        lon = 1437 ;
    variables:
        double time(time) ;
        double lat(lat) ;
        double lon(lon) ;
        float temperature(time, depth) ;
```
Tá gné speisialta ag EDDTableFromMultidimNcFiles chun déileáil leis na comhaid seo: má chuireann tú an tréith dhomhanda "treatDimensionsAs" leis na tacar sonraí domhanda addAttributes , is féidir leat a insint ERDDAP™ toisí áirithe a chóireáil (e.g., lat agus lon) amhail is dá mba gné eile iad (e.g., am) . Ní mór an luach tréith a bheith ina liosta scartha camóg a shonraíonn na "ó" toisí agus ansin an "le" gné, m.sh.,
 <att name="treatDimensionsAs"> tréimhse saoil: ilbhliantúil </att>   
Ansin ERDDAP™ léifear an comhad amhail is dá mba rud é:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
    variables:
        double time(time) ;
        double lat(time) ;
        double lon(time) ;
        float temperature(time, depth) ;
```
Ar ndóigh, ní mór an méid reatha de gach ceann de na toisí sa liosta a bheith mar an gcéanna; ar shlí eile, ERDDAP™ déileálfaidh sé leis an gcomhad mar "Bad File".

Tabhair faoi deara go bhfuil na comhaid neamhbhailí toisc nach bhfuil siad a leanúint rialacha CF. Mar sin, cé fiú ERDDAP™ Is féidir iad a léamh, molaimid go láidir nach bhfuil tú a chruthú comhaid mar seo toisc nach mbeidh uirlisí bogearraí CF-bhunaithe eile in ann iad a léamh i gceart. Má tá comhaid den sórt sin agat cheana féin, molaimid go láidir comhaid bhailí a chur ina n-ionad chomh luath agus is féidir.
    
### EDDTableFromNcFiles{#eddtablefromncfiles} 
 [ **EDDTableFromNcFiles** ](#eddtablefromncfiles) comhiomlánaithe sonraí ó NetCDF   (v3 nó v4)   .nc   (nó [ .nc ml ml](#ncml-files) ) comhaid agus [riachtanais uisce: measartha](https://github.com/zarr-developers/zarr-python) comhaid comhad (mar leagan 2.25) le hathróga éagsúla, gach ceann acu le gné amháin roinnte (mar shampla, am) nó níos mó ná toisí comhroinnte amháin (mar shampla, am, airde (nó doimhneacht) , domhanleithead, domhanfhad) . Ní mór na comhaid a bhfuil na hainmneacha gné céanna. D'fhéadfadh go mbeadh illuachanna ag comhad áirithe do gach ceann de na gnéithe agus d'fhéadfadh na luachanna a bheith difriúil i gcomhaid éagsúla foinse. D'fhéadfadh na comhaid a bheith athróg carachtar le gné bhreise (mar shampla, STRING14) . Féach an rang seo' superclass, [EDDTableFromFiles](#eddtablefromfiles) , le haghaidh faisnéise ar conas a oibríonn an rang seo agus conas é a úsáid.

Tá comhaid Zarr iompar beagán difriúil agus a cheangal ar an comhad NameRegex nó an pathRegex a chur san áireamh "zarr".

* Má tá an .nc comhaid a úsáid ar cheann de na [CF Diosca Geometris Sampling (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) formáidí comhaid, bain triail as [EDDTableFromNcCFFiles](#eddtablefromncfiles) roimh iarraidh seo.
     
* Le haghaidh tacair sonraí cluaisín nua ó .nc comhaid, bain triail as an newer [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) ar dtús.
     
* Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Is féidir leat a chur in eagar ansin go fíneáil tune é.
    
Déanann an chéad rud GenerateDatasetsXml don chineál seo tacar sonraí tar éis duit freagra a thabhairt ar na ceisteanna a phriontáil an struchtúr ncdump-mhaith ar an gcomhad sampla. Mar sin, má théann tú cúpla freagraí goofy don chéad lúb trí GenerateDatasets Xml, ar a laghad beidh tú in ann a fheiceáil má ERDDAP™ Is féidir an comhad a léamh agus a fheiceáil cad iad na gnéithe agus na hathróga sa chomhad. Ansin is féidir leat freagraí níos fearr a thabhairt don dara lúb trí GenerateDatasetsXml.
    
Toisí CSV - Géiniteacha Beidh Xml iarraidh ar teaghrán "DimensionsCSV". Is liosta de na hainmneacha foinse de shraith de thoisí é seo. Sonraí a ghiniúint Beidh Xml teacht ar na hathróga sonraí i .nc comhaid a úsáideann roinnt nó gach ceann de na gnéithe, móide gach athróg scalar, agus a dhéanamh ar an tacar sonraí ó na hathróga sonraí. Má shonraíonn tú rud ar bith (teaghrán folamh) , Géiniteacha Beidh Xml breathnú ar na hathróga leis na toisí is, ar an teoiric go mbeidh siad an chuid is mó suimiúil, ach d'fhéadfadh go mbeadh amanna nuair a bheidh tú ag iarraidh a dhéanamh tacar sonraí ó roinnt grúpa eile na n-athróg sonraí a úsáideann roinnt grúpa eile de na toisí.
    
* 1D Sampla: Tá comhaid 1D beagán difriúil ó 2D, 3D, 4D, ... comhaid.
    * D'fhéadfá a bheith sraith de .nc comhaid sonraí i gcás ina bhfuil gach comhad in aghaidh na míosa fiú sonraí ó baoi drifting amháin.
    * Beidh 1 gné ag gach comhad, mar shampla, am (méid = \\[ go leor go leor \\] ) .
    * Beidh gach comhad a bhfuil ceann amháin nó níos mó 1D athróg a úsáideann an ghné sin, mar shampla, am, domhanfhad, domhanleithead, teocht an aeir, ....
    * D'fhéadfadh gach comhad a bheith athróg carachtar 2D, mar shampla, le toisí (tréimhse saoil: ilbhliantúil) .
         
* 2D Sampla:
    * D'fhéadfá a bheith sraith de .nc comhaid sonraí i gcás ina bhfuil gach comhad in aghaidh na míosa fiú sonraí ó baoi drifting amháin.
    * Beidh 2 toisí ag gach comhad, mar shampla, am (méid = \\[ go leor go leor \\] ) agus id (méid = 1) .
    * Beidh gach comhad a bheith 2 1D athróg leis na hainmneacha céanna leis na toisí agus ag baint úsáide as an gné céanna-ainm, mar shampla, am (am trátha) , id (taiseachas aeir: fliuch) . Ba chóir na hathróga 1D a chur san áireamh sa liosta&lt; dataVariable ^ sa tacar sonraí XML.
    * Beidh gach comhad a bhfuil athróg amháin nó níos mó 2D, mar shampla, domhanfhad, domhanleithead, teocht an aeir, teocht an uisce,...
    * D'fhéadfadh gach comhad a bheith 3D athróg carachtar, mar shampla, le toisí (uainiú bláthanna: earrach) .
         
* 3D Sampla:
    * D'fhéadfá a bheith sraith de .nc comhaid sonraí i gcás ina bhfuil gach comhad fiú míosa de shonraí ó baoi stad amháin.
    * Beidh 3 toisí ag gach comhad, mar shampla, am (méid = \\[ go leor go leor \\] ) , lat (méid = 1) agus lon (méid = 1) .
    * Beidh gach comhad a bheith 3 athróg 1D leis na hainmneacha céanna leis na toisí agus ag baint úsáide as an gné céanna-ainm, mar shampla, am (am trátha) , lat (bláthanna cumhra: cumhráin) , lon (cineál gas: in airde) . Ba chóir na hathróga 1D a chur san áireamh sa liosta&lt; dataVariable ^ sa tacar sonraí XML.
    * Beidh gach comhad a bhfuil athróg amháin nó níos mó 3D, mar shampla, teocht an aeir, teocht an uisce,...
    * D'fhéadfadh gach comhad a bheith 4D athróg carachtar, mar shampla, le toisí (tréimhse de chuid eile: aon) .
    * D'fhéadfadh ainm an comhad a bhfuil an baoi ainm laistigh ainm an chomhaid.
         
* 4D Sampla:
    * D'fhéadfá a bheith sraith de .nc comhaid sonraí i gcás ina bhfuil gach comhad fiú míosa sonraí ó stáisiún amháin. Ag gach pointe ama, tógann an stáisiún léamha ag sraith doimhneacht.
    * Beidh 4 toisí ag gach comhad, mar shampla, am (méid = \\[ go leor go leor \\] ) , doimhneacht (méid = \\[ go leor go leor \\] ) , lat (méid = 1) agus lon (méid = 1) .
    * Beidh gach comhad 4 athróg 1D leis na hainmneacha céanna leis na toisí agus ag baint úsáide as an gné céanna-ainm, mar shampla, am (am trátha) , doimhneacht (doimhneacht doimhneacht doimhneacht) , lat (bláthanna cumhra: cumhráin) , lon (cineál gas: in airde) . Ba chóir na hathróga 1D a chur san áireamh sa liosta&lt; dataVariable ^ sa tacar sonraí XML.
    * Beidh gach comhad a bhfuil athróg amháin nó níos mó 4D, mar shampla, teocht an aeir, teocht an uisce,...
    * D'fhéadfadh gach comhad a bheith 5D athróg carachtar, mar shampla, le toisí (tréimhse saoil: ilbhliantúil, bliantúil) .
    * D'fhéadfadh ainm an comhad a bhfuil an baoi ainm laistigh ainm an chomhaid.
         
### EDDTableFromNcCFFiles{#eddtablefromnccffiles} 
 [ **EDDTableFromNcCFFiles** ](#eddtablefromnccffiles) comhiomlánaithe sonraí comhiomlánaithe ó NetCDF   (v3 nó v4)   .nc   (nó [ .nc ml ml](#ncml-files) ) comhaid a úsáideann ceann de na formáidí comhaid sonraithe ag an [CF Diosca Geometris Sampling (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) coinbhinsiúin. Féach an rang seo' superclass, [EDDTableFromFiles](#eddtablefromfiles) , le haghaidh faisnéise ar conas a oibríonn an rang seo agus conas é a úsáid.

Le haghaidh comhaid ag baint úsáide as ceann de na leaganacha CF multidimensional DSG, úsáid [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) ina ionad sin.

Sainmhíníonn na coinbhinsiúin CF DSG mórán formáidí comhaid agus áirítear éagsúlachtaí beaga iomadúla. Déileálann an rang le gach na n-athruithe go bhfuil muid ar an eolas faoi, ach is féidir linn a bheith caillte ar cheann (nó níos mó) . Mar sin, más rud é nach féidir an rang seo a léamh sonraí ó do CF DSG comhaid, le do thoil [teacht ar thacaíocht bhreise](/docs/intro#support) .

Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Is féidir leat a chur in eagar ansin go fíneáil tune é.
 
### Seirbhís do Chustaiméirí{#eddtablefromnccsvfiles} 
 [ **Seirbhís do Chustaiméirí** ](#eddtablefromnccsvfiles) comhiomlánaithe sonraí ó [NCCSV](/docs/user/nccsv-1.00) ASCII .csv comhaid. Féach an rang seo' superclass, [EDDTableFromFiles](#eddtablefromfiles) , le haghaidh faisnéise ar conas a oibríonn an rang seo agus conas é a úsáid.

* Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Is féidir leat a chur in eagar ansin go fíneáil tune é.
    
Déanann an chéad rud GenerateDatasetsXml don chineál seo tacar sonraí tar éis duit freagra a thabhairt ar na ceisteanna a phriontáil an struchtúr ncdump-mhaith ar an gcomhad sampla. Mar sin, má théann tú cúpla freagraí goofy don chéad lúb trí GenerateDatasets Xml, ar a laghad beidh tú in ann a fheiceáil má ERDDAP™ Is féidir an comhad a léamh agus a fheiceáil cad iad na gnéithe agus na hathróga sa chomhad. Ansin is féidir leat freagraí níos fearr a thabhairt don dara lúb trí GenerateDatasetsXml.
    
* RABHADH: Nuair a ERDDAP™ léann comhaid sonraí NCCSV, má fhaigheann sé earráid ar líne ar leith (e.g., líon mícheart míreanna) , logs sé teachtaireacht rabhaidh ("GRÚPA: Líne Bad (s s) na sonraí "... le liosta de na línte dona ar línte ina dhiaidh sin) go dtí an [comhad logála.txt](/docs/server-admin/additional-information#log) agus ansin leanann an chuid eile den chomhad sonraí a léamh. Dá bhrí sin, tá sé do fhreagracht chun breathnú tréimhsiúil (nó scríobh script a dhéanamh amhlaidh) don teachtaireacht sin sa logáil. txt ionas gur féidir leat a shocrú ar na fadhbanna sna comhaid sonraí. ERDDAP™ Tá sé ar bun ar an mbealach seo ionas gur féidir le húsáideoirí leanúint ar aghaidh ag léamh gach ceann de na sonraí bailí atá ar fáil cé go bhfuil roinnt línte an comhad flaws.
     
### Seirbhísí ar líne{#eddtablefromnos} 
 [ **Seirbhísí ar líne** ](#eddtablefromnos)   (DEPRECATE) Láimhseálann sonraí ó NOAA   [NOS](https://opendap.co-ops.nos.noaa.gov/axis/) foinse, a úsáideann [ SOAP+XML ](https://www.w3schools.com/xml/xml_soap.asp) le haghaidh iarrataí agus freagraí. Tá sé an-sonrach do NOAA NOS XML. Féach ar an sampla EDDTableFromNOS tacar sonraí i datasets2.xml.
 
### Seirbhísí ar líne{#eddtablefromobis} 
 [ **Seirbhísí ar líne** ](#eddtablefromobis) Láimhseálann sonraí ó Aigéan Córas Faisnéise Bitheolaíochta (OBIS) freastalaí freastalaí (a bhíhttp://www.iobis.org ) . Is féidir nach bhfuil aon freastalaithe níos gníomhaí a bhaineann úsáid as seo anois amach-de-dáta de chóras freastalaí OBIS.

* freastalaithe OBIS súil iarratas XML agus freagra XML ar ais.
* Mar gheall ar gach freastalaithe OBIS freastal ar na hathróga céanna ar an mbealach céanna (a bhíhttp://iobis.org/tech/provider/questions) , ní gá duit a shonrú i bhfad a chur ar bun tacar sonraí OBIS i ERDDAP .
* MUST tú san áireamh " creator\\_email " tréith sa domhan domhanda addAttributes , ós rud é go bhfuil an t-eolas a úsáidtear laistigh den cheadúnas. Is féidir seoladh ríomhphoist oiriúnach a fháil ag léamh an freagra XML ón sourceURL.
* Is féidir leat nó nach féidir a bheith in ann a fháil ar an tréith dhomhanda [&lt; subsetVariables ú (#subsetvariables) chun obair le freastalaí OBIS ar leith. Má tá tú iarracht, ach iarracht athróg amháin (mar shampla, ScientificName nó Genus) .
#### Seirbhísí ar líne creatlach XML{#eddtablefromobis-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromOBIS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceCode>...&lt;/sourceCode>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- If you read the XML response from the sourceUrl, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source code (for example, GHMP) is the value from one of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resource>&lt;code> tags. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- All ...SourceMinimum and Maximum tags are OPTIONAL -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMinimum>...&lt;/longitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMaximum>...&lt;/longitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMinimum>...&lt;/latitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMaximum>...&lt;/latitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For timeSource... tags, use yyyy-MM-dd'T'HH:mm:ssZ format. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMinimum>...&lt;/timeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMaximum>...&lt;/timeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1.  This MUST include  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator\\_email" -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromParquetFiles{#eddtablefromparquetfiles} 
 [ **EDDTableFromParquetFiles** ](#eddtablefromparquetfiles) Láimhseálann sonraí ó [An tIomlán](https://parquet.apache.org/) . Féach an rang seo' superclass, [EDDTableFromFiles](#eddtablefromfiles) , le haghaidh faisnéise ar conas a oibríonn an rang seo agus conas é a úsáid.

* Tá Parquet deartha chun compress an-éifeachtach, mar sin d'fhéadfadh sé a thabhairt duit méideanna comhaid níos lú ná formáidí eile.
* Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Is féidir leat a chur in eagar ansin go fíneáil tune é.
* RABHADH: Nuair a ERDDAP™ léann comhaid sonraí Parquet, má fhaigheann sé earráid ar líne ar leith (e.g., líon mícheart míreanna) , logs sé teachtaireacht rabhaidh ("GRÚPA: Líne Bad (s s) na sonraí "... le liosta de na línte dona ar línte ina dhiaidh sin) go dtí an [comhad logála.txt](/docs/server-admin/additional-information#log) agus ansin leanann an chuid eile den chomhad sonraí a léamh. Dá bhrí sin, tá sé do fhreagracht chun breathnú tréimhsiúil (nó scríobh script a dhéanamh amhlaidh) don teachtaireacht sin sa logáil. txt ionas gur féidir leat a shocrú ar na fadhbanna sna comhaid sonraí. ERDDAP™ Tá sé ar bun ar an mbealach seo ionas gur féidir le húsáideoirí leanúint ar aghaidh ag léamh gach ceann de na sonraí bailí atá ar fáil cé go bhfuil roinnt línte an comhad flaws.
     
### EDDTableFrom SOS  {#eddtablefromsos} 
 [ **EDDTableFrom SOS ** ](#eddtablefromsos) Láimhseálann sonraí ó Sheirbhís Bhreathnóireachta Braiteora (An tSUAL [ SOS ](https://www.ogc.org/standards/sos) ) freastalaí.

* Comhiomláin an cineál tacar sonraí sonraí ó ghrúpa stáisiún a sheirbheáil go léir ag ceann amháin SOS freastalaí.
* Na stáisiúin go léir freastal ar an tsraith chéanna na n-athróg (cé nach bhfuil an fhoinse do gach stáisiún a bheith chun freastal ar gach athróg) .
*    SOS freastalaithe ag súil iarratas XML agus freagra XML ar ais.
* Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Is féidir leat a chur in eagar ansin go fíneáil tune é. Níl sé éasca a ghiniúint an XML tacar sonraí le haghaidh SOS datasets de láimh. Chun an t-eolas is gá a fháil, ní mór duit cuairt a thabhairt sourceUrl + "? seirbhís = SOS Déan Teagmháil Linn GetCapabilities " i mbrabhsálaí; breathnú ar an XML; iarratas GetObservation a dhéanamh de láimh; agus breathnú ar an freagra XML ar an iarratas.
* Le cineálacha nua a chur leis ó am go chéile SOS freastalaithe agus athruithe ar na freastalaithe d'aois, tá sé ag fáil níos deacra do ERDDAP™ a bhrath go huathoibríoch ar an gcineál freastalaí ó na freagraí an fhreastalaí. Úsáid&lt;Seirbhís do Chustaiméirí (le luach IOOS\\_NDBC, IOOS\\_NOS, OOSTethys , nó WHOI) Tá sé anois STRONGLY AMNDED. Má tá fadhbanna agat le haon tacar sonraí den chineál seo, déan iarracht ath-reáchtáil GenerateDatasets Xml do na SOS freastalaí. Cineáltas An tSraith Shinsearach Beidh Xml lig tú iarracht amach an éagsúla&lt;sosServerType × roghanna go dtí go bhfaighidh tú an ceann ceart le haghaidh freastalaí ar leith.
*    SOS forbhreathnú:
    * Slí an Atlantaigh (Braiteoir Cumasú Gréasáin) agus SOS   (Seirbhís Breathnóireachta Braiteoir) go bhfuil siad [Caighdeáin OpenGIS®](https://www.ogc.org/standards) . Tá an láithreán gréasáin na doiciméid caighdeáin.
    * An bhfuil OGC Seirbhísí Gréasáin Coiteann Sonraíocht ver 1.1.0 ( OGC Cuardach le haghaidh Iarratas Pleanála) Clúdaíonn sé tógáil ceisteanna GET agus POST (féach alt 7.2.3 agus alt 9) .
    * Má sheolann tú iarratas xml getCapability chuig SOS freastalaí freastalaí ( sourceUrl + "? seirbhíse = SOS Déan Teagmháil Linn GetCapabilities " " ") , gheobhaidh tú toradh xml le liosta de na stáisiúin agus breathnaithe Airíonna go bhfuil siad sonraí le haghaidh.
    * Is tagairt fhoirmiúil URI é an Property a breathnaíodh do mhaoin. Mar shampla, urn: agusc: feiniméan: leithead: wgs84 nóhttps://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
    * Níl an Property breathnaithe athróg.
    * D'fhéadfadh níos mó ná athróg amháin a bheith mar an gcéanna faoi deara Díroghnaigh gach rud (mar shampla, insideTemp agus taobh amuigh D'fhéadfadh Temp araon faoi deara Díroghnaigh gach rudhttps://mmisw.org/ont/cf/parameter/air\\_temperature) .
    * Má sheolann tú iarratas xml getObservation chuig SOS freastalaí, gheobhaidh tú toradh xml le cur síos ar ainmneacha réimse sa fhreagra, aonaid réimse, agus na sonraí. Beidh na hainmneacha réimse san áireamh le fada, domhanleithead, doimhneacht (b'fhéidir b'fhéidir) , agus am.
    * Gach ceann dataVariable do EDDTableFrom SOS Ní mór a chur san áireamh "Property tuillte" tréith, aithníonn an Property breathnaithe nach mór a iarraidh ar an bhfreastalaí a fháil ar an athróg. Go minic, roinnt dataVariable s liosta an Comhdhéanta céanna faoi dearaProperty.
    * An Téip Sonraí do gach dataVariable Ní fhéadfaidh an freastalaí a shonrú. Más amhlaidh, ní mór duit breathnú ar na freagraí sonraí XML ón bhfreastalaí agus a shannadh cuí [&lt;Sonraí Teagmhála (#cineál) i an ERDDAP™ dataset dataVariable mínithe.
    *    (Ag an am a scríobh seo) roinnt roinnt SOS freastalaithe freagra a fháil iarrataí Breathnadóireacht ar feadh níos mó ná ceann breathnaithe Maoin ag torthaí ach ag filleadh don chéad cheann de na Properties breathnaíodh. (Uimh teachtaireacht earráide&#33;) Féach an t-iarratas paraiméadar tógálaí ObservedPropertiesSeparately.
* EDDTableFrom SOS Cuireann go huathoibríoch
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
le tréithe domhanda na tacar sonraí nuair a chruthaítear an tacar sonraí.
*    SOS freastalaithe de ghnáth in iúl [minicíocht uisce: flúirseach](#units) leis an [taiseachas aeir: fliuch](https://unitsofmeasure.org/ucum.html) córas. An chuid is mó ERDDAP™ freastalaithe in iúl aonaid leis an [ UDUNITS ](https://www.unidata.ucar.edu/software/udunits/) córas. Más gá duit a thiontú idir an dá chóras, is féidir leat a úsáid [ ERDDAP 's seirbhís gréasáin a thiontú aonaid UCUM go / ó UDUNITS ](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) .
#### EDDTableFrom SOS creatlach XML{#eddtablefromsos-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromSOS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sosServerType>...&lt;/sosServerType> &lt;!-- 0 or 1, but STRONGLY  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RECOMMENDED. This lets you specify the type of SOS server  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(so ERDDAP™ doesn't have to figure it out).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valid values are: IOOS\\_NDBC, IOOS\\_NOS, OOSTethys, and WHOI. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;responseFormat>...&lt;/responseFormat> &lt;!-- 0 or 1. Use this only if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you need to override the default responseFormat for the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;specified sosServerType.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;stationIdSourceName>...&lt;/stationIdSourceName> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default="station\\_id". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceName>...&lt;/longitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceName>...&lt;/latitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceName>...&lt;/altitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;altitudeMetersPerSourceUnit>](#altitudemeterspersourceunit)...&lt;/altitudeMetersPerSourceUnit>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceName>...&lt;/timeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceFormat>...&lt;/timeSourceFormat>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- timeSourceFormat MUST be either  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For numeric data: a [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\-compatible string (with the format  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"*units* since *baseTime*") describing how to interpret  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source time values (for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"seconds since 1970-01-01T00:00:00Z"), where the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;base time is an ISO 8601:2004(E) formatted date time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string (yyyy-MM-dd'T'HH:mm:ssZ).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For String date time data: specify  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[units suitable for string times](#string-time-units)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;describing how to interpret string times  (for example, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ISO8601TZ\\_FORMAT "yyyy-MM-dd'T'HH:mm:ssZ"). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;observationOfferingIdRegex>...&lt;/observationOfferingIdRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Only observationOfferings with IDs (usually the station names)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which match this [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) will be included  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the dataset (".+" will catch all station names). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;requestObservedPropertiesSeparately>true|false(default)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/requestObservedPropertiesSeparately>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the [dataType](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the observedProperty attribute.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For IOOS SOS servers, \\*every\\* variable returned in the text/csv  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response MUST be included in this ERDDAP™ dataset definition. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Seirbhís do Chustaiméirí{#eddtablefromthreddsfiles} 
 [ **Seirbhís do Chustaiméirí** ](#eddtablefromthreddsfiles)   (bláthanna cumhra: cumhráin) comhiomlánaí comhaid sonraí le hathróga éagsúla, gach ceann acu le toisí amháin nó níos mó roinnte (mar shampla, am, airde (nó doimhneacht) , domhanleithead, domhanfhad) , agus a sheirbheáil ag [TRIOMADÓIR OPeNDAP freastalaí freastalaí](https://www.unidata.ucar.edu/software/tds/) .

* Is é seo an cineál tacar sonraí **DEPRECATE** . Is é an réiteach níos nuaí agus níos ginearálta ná úsáid a bhaint as an [taisce taisce taisce Rogha FromUrl do EDDTable Seirbhís do Chustaiméirí](#cachefromurl)   (nó malairt) , a dhéanann cóip áitiúil de na comhaid iargúlta agus feidhmíonn na sonraí ó na comhaid áitiúla. An bhfuil&lt;Is féidir a úsáid le haon chineál comhad sonraí tabular ó aon fhoinse gréasáin-bhunaithe a fhoilsíonn liosta eolaire-mhaith de chomhaid. **   
Más rud é nach féidir leat a dhéanamh go n-oibríonn ar chúis éigin, ríomhphost Chris. John ag noaa.gov.
Mura bhfuil aon ghearáin ann roimh 2020, féadfar an cineál tacar sonraí seo a bhaint. ** 
* Molaimid go láidir ag baint úsáide as [Sonraí a ghiniúint Xml clár](#generatedatasetsxml) a dhéanamh dréacht garbh den datasets.xml smután don tacar sonraí. Is féidir leat a chur in eagar ansin go fíneáil tune é.
* I bhformhór na gcásanna, tá gach comhad luachanna il do na leftmost (chéad chéad uair) gné, mar shampla, am.
* Na comhaid go minic (ach nach bhfuil a) a bhfuil luach amháin do na gnéithe eile (mar shampla, airde (nó doimhneacht) , domhanleithead, domhanfhad) .
* D'fhéadfadh na comhaid a bheith athróg carachtar le gné bhreise (mar shampla, nCharacters) .
* Is féidir le freastalaithe THREDDS a aithint ag an "/thredds/" sna URLanna. Mar shampla,
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* Tá catalóga in áiteanna éagsúla ag freastalaithe THREDDS. ATHBHREITHNITHE an rang seo go n-áirítear an URL "/thredds/catalog/". Is féidir leat teacht ar an athróg seo de ghnáth trí thús a chur le brabhsálaí sa chatalóg fréimhe, agus ansin cliceáil tríd an bhfo-catalog atá ag teastáil.
* Léann an rang na comhaid catalóg.xml sheirbheáil ag THREDDS leis na liostaí de&lt;cliceáil grianghraf a mhéadú (tagairtí do bhreise chatalóg.xml fo-comhaid) agus&lt;dataset bushing (comhaid sonraí) .
* An bhfuil&lt;Tá comhadDir uaire leagan neamhaird. Ós rud é go n-íoslódálann an rang seo agus go ndéanann sé cóip áitiúil de gach comhad sonraí iargúlta, ERDDAP™ fórsaí an comhad Dir a bheith *Treoir do Thuismitheoirí* Seirbhís do Chustaiméirí * datasetID * /.
* Le haghaidh&lt; sourceUrl ^, bain úsáid as an URL an comhad catalóg.xml don tacar sonraí sa freastalaí THREDDS, mar shampla: don URL seo a fhéadfar a úsáid i bhrabhsálaí gréasáin,
    https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[ Clár na dToghthóirí Níl an freastalaí seo ar fáil go hiontaofa a thuilleadh. \\] ,
úsáid tírdhreach&lt; sourceUrl úhttps://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml&lt;/ Baile sourceUrl ú
     (ach é a chur ar líne amháin) .
* Ós rud é go n-íoslódálann an rang seo i gcónaí agus déanann sé cóip áitiúil de gach comhad sonraí iargúlta, níor chóir duit an tacar sonraí seo a fhilleadh i [EDDTableCopy](#eddtablecopy) .
* Tacaíonn an cineál tacar sonraí seo le OPTIONAL, is annamh a úsáidtear, tag speisialta,&lt;speisialtaMode *modh modh modh modh* &lt;/specialMode uaire is féidir a úsáid chun a shonrú gur chóir rialacha speisialta, crua-chódaithe a úsáid chun a chinneadh ar chóir comhaid a íoslódáil ón bhfreastalaí. Faoi láthair, an t-aon bailí *modh modh modh modh* SAMOS a úsáidtear le tacair sonraí óhttps://tds.coaps.fsu.edu/thredds/catalog/samosa íoslódáil ach na comhaid leis an uimhir leagan deireanach.
* Féach an rang seo' superclass, [EDDTableFromFiles](#eddtablefromfiles) , le haghaidh faisnéise ar conas a oibríonn an rang seo agus conas é a úsáid.
* Féach an 1D, 2D, 3D, agus 4D samplaí le haghaidh [EDDTableFromNcFiles](#eddtablefromncfiles) .
     
### EDDTableFrom WFS Amharc ar gach eolas{#eddtablefromwfsfiles} 
 [ **EDDTableFrom WFS Amharc ar gach eolas** ](#eddtablefromwfsfiles)   (DEPRECATE) a dhéanann cóip áitiúil de na sonraí go léir ó ArcGIS Léarscáileanna WFS freastalaí mar sin is féidir na sonraí a chaomhnú go tapa chun ERDDAP™ úsáideoirí.

* Ní mór duit a shonrú formáidithe go speisialta sourceUrl tréith domhanda a insint ERDDAP™ conas faisnéis gné a iarraidh ón bhfreastalaí. Bain úsáid as an sampla seo mar theimpléad:
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (ach é a chur go léir ar líne amháin) 
* Ní mór duit a chur le tréith domhanda speisialta a insint ERDDAP™ conas ainmneacha na smután sonraí ba cheart a íoslódáil a aithint. Beidh sé seo ag obair dócha do gach EDDTableFrom WFS Comhaid tacar sonraí:
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* Ós rud é go n-íoslódálann an rang seo i gcónaí agus déanann sé cóip áitiúil de gach comhad sonraí iargúlta, níor chóir duit an tacar sonraí seo a fhilleadh i [EDDTableCopy](#eddtablecopy) .
* Féach an rang seo' superclass, [EDDTableFromFiles](#eddtablefromfiles) , le haghaidh faisnéise breise ar an gcaoi a n-oibríonn an rang seo agus conas é a úsáid.
     
### Naisc ábhartha eile{#eddtableaggregaterows} 
 [ **Naisc ábhartha eile** ](#eddtableaggregaterows) is féidir tacar sonraí EDDTable a dhéanamh ó ghrúpa "leanbh" EDDTable datasets.

* Seo roinnt úsáidí do EDDTableAggregateRows:
    * D'fhéadfá tacar sonraí EDDTableAggregateRows a dhéanamh ó dhá chineál éagsúla comhad nó foinsí sonraí, mar shampla, tacar sonraí le sonraí suas go dtí deireadh na míosa seo caite a stóráiltear i .nc Comhaid CF agus tacar sonraí le sonraí don mhí atá ann faoi láthair a stóráil i mbunachar sonraí i ndáil.
    * D'fhéadfá tacar sonraí EDDTableAggregateRows a dhéanamh chun déileáil le hathrú ar chomhaid foinse (mar shampla, d'athraigh an fhormáid ama, nó ainm athraitheach, nó sonraí Cineál / Cineál / scale\\_factor / Baile add\\_offset athrú) . Sa chás seo, bheadh leanbh amháin a fháil sonraí ó chomhaid a rinneadh roimh an athrú agus go mbeadh an leanbh eile a fháil sonraí ó chomhaid a rinneadh tar éis an t-athrú. Is rogha eile é an úsáid seo a bhaint as EDDTableAggregateRows [An tIomlán](#ncml-files) nó [ NCO ](#netcdf-operators-nco) . Mura bhfuil gné idirdhealú sna ainmneacha comhaid (mar sin is féidir leat é a úsáid&lt;fileNameRegex × chun a chinneadh cén comhad a bhaineann leis an tacar sonraí leanbh), is dócha gur gá duit a stóráil na comhaid le haghaidh an dá tacar sonraí leanbh i eolairí éagsúla.
    * D'fhéadfá a dhéanamh EDDTableAggregateRows tacar sonraí a bhfuil fo-thacar comhroinnt de athróga amháin nó níos mó den chineál céanna ach tacar sonraí éagsúla, mar shampla, tacar sonraí a dhéanann tacar Próifíl ó an teaglaim de tacar sonraí Próifíl, a TimeSeriesProfile tacar sonraí, agus a TrajectoryProfile tacar sonraí (a bhfuil roinnt athróg éagsúla agus roinnt athróg i coitianta - i gcás ina mbeidh tú a dhéanamh leaganacha speisialta do na tacair sonraí leanbh, leis na hathróga in-choitianta) .
    * D'fhéadfá roinnt tacair shonraí neamhspleácha a bheith agat, gach ceann acu leis an gcineál céanna sonraí ach ó stáisiún difriúil. D'fhéadfá na tacair shonraí sin a fhágáil slán, ach freisin tacar sonraí EDDTableAggregateRows a chruthú a bhfuil sonraí ó gach ceann de na stáisiúin - d'fhéadfadh gach ceann de na tacair sonraí leanaí a bheith simplí [EDDTableFromErddap](#eddfromerddap) , a léiríonn ceann de na tacair shonraí stáisiúin atá ann cheana. Má dhéanann tú é seo, tabhair sonraí éagsúla do gach ceann de na sonraí EDDTableFromErddap datasetID ná na tacair shonraí neamhspleácha bunaidh, e.g., trí "Child" a chur leis an leagan bunaidh datasetID .
* Gach duine den leanbh&lt;Ní mór tacar sonraí a bheith ina tacar sonraí iomlán, amhail is dá mba tacar sonraí neamhspleách é. Caithfidh gach a bheith mar an gcéanna [ dataVariable s s](#datavariable) , san ord céanna, leis an gcéanna [ destinationName s s](#destinationname) , [data recovery Cineálacha](#datatype) , [ missing\\_value s s](#missing_value) , [Táirgí gaolmhara](#missing_value) , agus [minicíocht uisce: flúirseach](#units) . Tagann na meiteashonraí do gach athróg don tacar sonraí EDDTableAggregateRows ó athróga sa chéad tacar sonraí linbh, ach beidh EDDTableAggregateRows thabhairt cothrom le dáta [ actual\\_range ](#actual_range) meiteashonraí a bheith ar an raon iarbhír do gach ceann de na páistí.
* Moladh: Faigh gach ceann de na tacair sonraí linbh ag obair mar thacair sonraí neamhspleácha. Ansin déan iarracht an tacar sonraí EDDTableAggregateRows a dhéanamh trí ghearradh agus a ghreamú datasets.xml smután do gach ceann de na EDDTableAggregate nua Rows tacar sonraí.
* Réamhshocrú Réamhshocrú Ordú -- Cinneann ord na tacair sonraí linbh an t-ordú iomlán réamhshocraithe de na torthaí. Ar ndóigh, is féidir le húsáideoirí ordú difriúil a iarraidh le haghaidh sraith áirithe torthaí trí cheangal agus orderBy  (" " " *liosta de na hathróga atá deighilte* " " ") go dtí deireadh a gceist.
* An "foinse" [domhanda domhanda domhanda Ranníocaí](#global-attributes) do na EDDTableAggregateRows Is é an globalAttributes le chéile ón chéad tacar sonraí linbh. An EDDTableAggregate Is féidir le Rows bhfuil domhanda&lt; addAttributes ^ chun tréithe domhanda breise a chur ar fáil nó na tréithe domhanda foinse a shárú.
#### EDDTableAggregate Rows creatlach XML{#eddtableaggregaterows-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableAggregateRows" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableCopy{#eddtablecopy} 
 [ **EDDTableCopy** ](#eddtablecopy) is féidir cóip áitiúil a dhéanamh de go leor cineálacha tacar sonraí EDDTable agus ansin na sonraí a athdhíol go tapa ón gcóip áitiúil.

* EDDTableCopy (agus le haghaidh sonraí greille, [ EDDGrid Cóip Uaireadóirí Cóip](#eddgridcopy) ) Is an-éasca le húsáid agus an-éifeachtach **réiteach ar roinnt de na fadhbanna is mó le sonraí a sheirbheáil ó fhoinsí sonraí iargúlta:** 
    * Is féidir sonraí a rochtain ó fhoinse sonraí iargúlta a bheith mall.
        * D'fhéadfadh siad a bheith mall toisc go bhfuil siad go bunúsach mall (mar shampla, cineál mí-éifeachtach freastalaí) ,
        * toisc go bhfuil siad faoi léigear ag iarratais an iomarca,
        * nó toisc go bhfuil do fhreastalaí nó an freastalaí iargúlta bandaleithead teoranta.
    * Níl an tacar sonraí iargúlta ar fáil uaireanta (arís, ar chúiseanna éagsúla) .
    * Ní Ag brath ar fhoinse amháin do na sonraí scála maith (mar shampla, nuair a úsáideoirí go leor agus go leor ERDDAP úsáid a bhaint as é) .
         
* Conas a Oibríonn sé -- réitíonn EDDTableCopy na fadhbanna seo trí chóip áitiúil de na sonraí a dhéanamh agus a chothabháil go huathoibríoch agus sonraí a sheirbheáil ón gcóip áitiúil. ERDDAP™ Is féidir le sonraí a sheirbheáil ón gcóip áitiúil go han-tapa. Agus ag déanamh agus ag baint úsáide as cóip áitiúil faoiseamh an t-ualach ar an bhfreastalaí iargúlta. Agus is é an chóip áitiúil cúltaca de na bunaidh, atá úsáideach i gcás a tharlaíonn rud éigin ar an bunaidh.
    
Níl aon rud nua faoi chóip áitiúil de thacar sonraí a dhéanamh. Cad atá nua anseo ná go ndéanann an rang seo é\\*éasca\\*a chruthú agus\\*a choimeád ar bun\\*cóip áitiúil de shonraí ó\\*éagsúlacht\\*cineálacha foinsí sonraí iargúlta agus\\*cuir meiteashonraí\\*agus na sonraí a chóipeáil.
    
#### EDDTableCopy vs&lt;Conas a oibríonn sé?{#eddtablecopy-vs-cachefromurl} 
&lt;Is é seo an rogha eile de EDDTableCopy. Oibríonn siad difriúil.

* EDDTable Oibríonn Cóip trí smután sonraí a iarraidh ó sheirbhís iargúlta agus iad siúd a stóráil i gcomhaid áitiúla. Dá bhrí sin, tá EDDTableCopy úsáideach i gcásanna áirithe ina bhfuil na sonraí inrochtana trí sheirbhís iargúlta.
* [EN]&lt;riachtanais uisce: measartha (Tuilleadh roghanna...) íoslódálacha na comhaid atá liostaithe ar láithreán gréasáin iargúlta.&lt;Is taisceFromUrl uaire níos éasca le húsáid agus níos iontaofa ós rud é gur féidir é a insint go héasca nuair a bhíonn comhad sonraí iargúlta nua nó nuair a comhad sonraí iargúlta athrú agus dá bhrí sin ní mór a íoslódáil.

Má tá cásanna ann ina bhfuil EDDTableCopy nó&lt;d'fhéadfaí é a úsáid, úsáid&lt;cacheFromUrl bhéil toisc go bhfuil sé níos éasca agus níos iontaofa.
     
#### &lt;taiseachas aeir: fliuch Ainmneacha &amp; F;{#extractdestinationnames} 
EDDTable Déanann Cóip an chóip áitiúil de na sonraí trí smután sonraí a iarraidh ón tacar sonraí iargúlta. EDDTable Cóipeáil a chinneann smutáin a iarraidh trí iarraidh ar an &amp; ar leith () luachanna do na&lt;úsáid tírdhreach: plandáil grúpa, eiseamal (a shonraítear sa datasets.xml , féach thíos) , a bhfuil na hainmneacha ceann scríbe spás-scartha na n-athróg sa tacar sonraí iargúlta. Mar shampla,
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
D'fhéadfadh a tháirgeadh teaglaim luachanna ar leith de drifter = tig17, próifíl = 1017, drifter = tig17, próifíl = 1095, ... drifter = une12, próifíl = 1223, drifter = une12, próifíl = 1251,...

I gcásanna ina bhfuil colún amháin (mar shampla, próifíl) d'fhéadfadh a bheith go léir a theastaíonn chun grúpa sraitheanna sonraí a aithint go uathúil, má tá líon an-mhór próifílí ann, mar shampla, d'fhéadfadh sé a bheith úsáideach sliocht breise a shonrú freisin Deireadh an chomhrá Ainm an ainm (mar shampla, drifter) a fheidhmíonn a subdivide na próifílí. Sin mar thoradh ar níos lú comhaid sonraí i eolaire ar leith, a d'fhéadfadh mar thoradh ar rochtain níos tapúla.
    
#### Naisc go dtí suíomhanna eile{#local-files} 
Déantar gach smután sonraí a stóráil i leith NetCDF comhad i subdirectory de *Treoir do Thuismitheoirí* Seirbhís do Chustaiméirí * datasetID * / Baile (mar a shonraítear in [crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml) ) . Tá leibhéal subdirectory amháin do gach ach an sliocht seo caite Name. Mar shampla, bheadh sonraí le haghaidh tig17+1017, a stóráil i
     *Treoir do Thuismitheoirí* / cóip / sampla Dataset / tig17/1017 .nc .
Mar shampla, bheadh sonraí do une12+1251, a stóráil i
     *Treoir do Thuismitheoirí* An bhfuil a fhios agat na buntáistí a bhaineann... .nc .
Eolaire agus filenames cruthaíodh ó luachanna sonraí a mhodhnú chun iad a comhad-ainm-sábháilte (mar shampla, cuirtear "x20" in ionad spásanna) - ní dhéanann sé seo difear do na sonraí iarbhír.
     
#### irl - Library Service{#new-data} 
Gach uair EDDTable Tá Cóip athluchtaithe, seiceálacha sé an tacar sonraí iargúlta a fheiceáil cad iad na smutáin ar leith atá ar fáil. Más rud é nach bhfuil an comhad le haghaidh smután sonraí ann cheana féin, iarratas a fháil ar an smután a leanas le scuaine. ERDDAP 's tasc Trí phróisis go léir na hiarratais scuaine do smután sonraí, aon-ar-aon. Is féidir leat staitisticí a fheiceáil do ghníomhaíocht an tascThread ar an [Leathanach Baile](/docs/server-admin/additional-information#status-page) agus sa [An Tuairisc Laethúil](/docs/server-admin/additional-information#daily-report) . (Sea, ERDDAP™ D'fhéadfadh tascanna éagsúla a shannadh don phróiseas seo, ach bheadh a úsáid suas go leor de na foinse sonraí iargúlta bandaleithead, cuimhne, agus am LAP, agus go leor de na áitiúil ERDDAP 's bandaleithead, cuimhne, agus am LAP, nach bhfuil smaoineamh maith.) 
    
NÓTA: Tá an chéad uair EDDTableCopy luchtaithe, (má théann gach maith) Beidh go leor de na hiarratais ar smután sonraí a chur leis an scuaine tascThread ar, ach ní bheidh aon comhaid sonraí áitiúla a cruthaíodh. Mar sin, beidh an tógálaí theipeann ach beidh tascThread ar aghaidh ag obair agus a chruthú comhaid áitiúla. Má théann gach duine go maith, beidh an tascTrí dhéanamh ar roinnt comhaid sonraí áitiúla agus an chéad iarracht eile a athlódáil an tacar sonraí (i ~ 15 nóiméad) éireoidh leis, ach ar dtús le méid an-teoranta sonraí.
    
NÓTA: Tar éis an tacar sonraí áitiúil tá roinnt sonraí agus is cosúil i do ERDDAP , má tá an tacar sonraí iargúlta inrochtana go sealadach nó go buan, beidh an tacar sonraí áitiúil ag obair go fóill.
    
WARNING: Má tá an tacar sonraí iargúlta mór agus / nó go bhfuil an freastalaí iargúlta mall (go bhfuil an fhadhb, nach bhfuil sé?&#33;) , beidh sé i bhfad a dhéanamh cóip áitiúil iomlán. I gcásanna áirithe, beidh an t-am is gá do-ghlactha. Mar shampla, tarchur 1 TB sonraí thar líne T1 (0.15 / GB) Tógann ar a laghad 60 lá, faoi choinníollacha is fearr is féidir. Plus, úsáideann sé go leor de bandaleithead, cuimhne, agus am LAP ar na ríomhairí iargúlta agus áitiúla. Is é an réiteach a phost a thiomáint crua chuig an riarthóir an tacar sonraí iargúlta ionas gur féidir s / sé a dhéanamh cóip den tacar sonraí agus an feachtas crua ar ais chugat. Bain úsáid as na sonraí sin mar phointe tosaigh agus cuirfidh EDDTableCopy sonraí leis. (Is é sin an chaoi a n-úsáidtear Seirbhís Cloud EC2 Amazon chun an fhadhb a láimhseáil, cé go bhfuil go leor bandaleithead ag a gcóras.) 
    
WARNING: Má imíonn meascán áirithe de luachanna ó tacar sonraí iargúlta, EDDTableCopy NACH scriosadh an comhad a chóipeáil áitiúil. Más mian leat, is féidir leat é féin a scriosadh.
    
#### Tábla Copy&lt;seiceáilSourceData &amp; &amp; rsquo; s;{#tablecopy-checksourcedata} 
An bhfuil datasets.xml Is féidir le haghaidh an tacar sonraí a bheith tag roghnach
```
    <checkSourceData>true</checkSourceData>  
```
Tá an luach réamhshocraithe fíor. Má / nuair a leagtar tú é a bréagach, ní bheidh an tacar sonraí a sheiceáil riamh an tacar sonraí foinse a fheiceáil má tá sonraí breise ar fáil.
     
#### Úsáid Molta{#recommended-use} 
1. taiseachas aeir: fliuch&lt;tacar sonraí foirm iontrála (an cineál dúchais, ní EDDTableCopy) don fhoinse sonraí iargúlta. **Faigh sé ag obair i gceart, lena n-áirítear gach ceann de na meiteashonraí atá ag teastáil.** 
2. Má tá sé ró-mhall, cuir cód XML chun é a fhilleadh i tacar sonraí EDDTableCopy.
    * Úsáid difriúil datasetID   (b'fhéidir ag athrú ar an datasetID de na sean datasetID beagán) .
    * Cóip an&lt;ar fáil Chun na críche sin,&lt;reloadEveryNMinutes bhéil agus&lt;onChange uaire ó XML an EDDTable iargúlta leis an XML EDDTableCopy ar. (A luachanna le haghaidh ábhar EDDTableCopy; a luachanna don tacar sonraí istigh a bheith neamhábhartha.) 
    * taiseachas aeir: fliuch&lt;úsáid tírdhreach: plandáil grúpa (féach thuas) .
    *   &lt;Is liosta scartha spás OPTIONAL idir ainmneacha athraitheacha ceann scríbe sa tacar sonraí iargúlta. Nuair a bhíonn gach smután sonraí a íoslódáil ón bhfreastalaí iargúlta, beidh an smután a shórtáil ag na hathróga (ag an gcéad athróg, ansin ag an dara athróg má tá an chéad athróg ceangailte,...) . I gcásanna áirithe, ERDDAP™ beidh sé in ann sonraí a bhaint níos tapúla ó na comhaid sonraí áitiúla má tá an chéad athróg sa liosta athraitheach uimhriúil ( "time" comhaireamh mar athróg uimhriúil) . Ach roghnaigh na hathróga ar bhealach atá oiriúnach don tacar sonraí.
3.   ERDDAP™ cóip áitiúil de na sonraí a dhéanamh agus a chothabháil.
         
* WARNING: Glacann EDDTableCopy nach bhfuil na luachanna sonraí do gach smután athrú riamh. Má / nuair a dhéanann siad, ní mór duit a scriosadh de láimh na comhaid smután i *Treoir do Thuismitheoirí* Seirbhís do Chustaiméirí * datasetID * / a athrú agus [bratach bratach](/docs/server-admin/additional-information#flag) an tacar sonraí a athlódáil ionas go gcuirfear na smutáin a scriosadh in ionad. Má tá síntiús ríomhphoist agat leis an tacar sonraí, gheobhaidh tú dhá ríomhphost: ceann nuair a athluchtaíonn an tacar sonraí den chéad uair agus tosaíonn sé na sonraí a chóipeáil, agus ceann eile nuair a bhíonn na hualaí tacar sonraí arís (go huathoibríoch) agus a bhraitheann na comhaid sonraí áitiúla nua.
     
* Athraigh Metadata -- Más gá duit athrú ar bith addAttributes nó a athrú ar an ord na n-athróg a bhaineann leis an tacar sonraí foinse:
    1. Athraigh an addAttributes don tacar sonraí foinse i datasets.xml , de réir mar is gá.
    2. Scrios ar cheann de na comhaid a chóipeáil.
    3. Socraigh a [bratach bratach](/docs/server-admin/additional-information#flag) chun an tacar sonraí a athlódáil láithreach. Má dhéanann tú úsáid a bhaint as bratach agus tá tú síntiús r-phost chuig an tacar sonraí, beidh tú a fháil dhá r-phost: ceann nuair a athluchtaíonn an tacar sonraí ar dtús agus a thosaíonn a chóipeáil na sonraí, agus ceann eile nuair a ualaí tacar sonraí arís (go huathoibríoch) agus a bhraitheann na comhaid sonraí áitiúla nua.
    4. Déanfar an comhad a scriosadh a athghiniúint leis na meiteashonraí nua. Mura bhfuil an tacar sonraí foinse ar fáil riamh, gheobhaidh an tacar sonraí EDDTableCopy meiteashonraí ón gcomhad athghinte, ós rud é gurb é an comhad is óige é.
         
*    [ EDDGrid Cóip Uaireadóirí Cóip](#eddgridcopy) Tá an-chosúil le EDDTableCopy, ach oibríonn sé le tacair sonraí gridded.
#### EDDTableCopy creatlach XML{#eddtablecopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractDestinationNames>...&lt;/extractDestinationNames>  &lt;!-- 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderExtractBy>...&lt;/orderExtractBy> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#tablecopy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

- - - - - -

## Sonraí Teagmhála{#details-1} 

Seo cur síos mionsonraithe ar clibeanna agus tréithe coitianta.

### &lt;angularDegreeUnits &amp; gt;{#angulardegreeunits} 
* [EN] ** &lt;AngularDegreeUnits . ** ] (Tuilleadh roghanna...) is annamh a úsáidtear chlib OPTIONAL laistigh&lt;cliceáil grianghraf a mhéadú tag i datasets.xml ina bhfuil liosta coma-scartha de teaghráin aonad go ERDDAP™ ba chóir a chóireáil mar aonaid céimeanna uilleach. Má tá athróg ar cheann de na haonaid, tabledap 's orderByMean Beidh scagaire ríomh ar an meán ar bhealach speisialta, ansin tuairisc ar an meán mar luach ó -180 go 180. Féach ar ERDDAP 's EDStatic.java comhad cód foinse don liosta réamhshocraithe reatha. Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ léamha datasets.xml , lena n-áirítear mar fhreagra ar tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) .
### &lt;angular DegreeTrueUnits &amp; rsquo; s;{#angulardegreetrueunits} 
* [EN] ** &lt;angular Céime Neamhchónaitheoirí ** ] (Tuilleadh roghanna...) is annamh a úsáidtear chlib OPTIONAL laistigh&lt;cliceáil grianghraf a mhéadú tag i datasets.xml ina bhfuil liosta coma-scartha de teaghráin aonad go ERDDAP™ Ba chóir déileáil mar chéimeanna uilleach aonaid fíor. Má tá athróg ar cheann de na haonaid, tabledap 's orderByMean Beidh scagaire ríomh ar an meán ar bhealach speisialta, ansin tuairisc ar an meán mar luach ó 0 go 360. Féach ar ERDDAP 's EDStatic.java comhad foinse don liosta réamhshocraithe reatha. Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ léamha datasets.xml , lena n-áirítear mar fhreagra ar tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) .
     
### &lt;coitiantaStandardNames &amp; &amp; rsquo;{#commonstandardnames} 
* [EN] ** &lt;bláthanna cumhra: cumhráin ** ] (# gnáthainm) is annamh a úsáidtear chlib OPTIONAL laistigh&lt;cliceáil grianghraf a mhéadú tag i datasets.xml liosta coma-scartha de chomhchineál a shonrú [CF ainmneacha caighdeánach](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) . E.g.,
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
Tá an liosta a úsáidtear i DataProviderForm3.html mar áis d'úsáideoirí.
Más mian leat an fhaisnéis seo a chur ar fáil i datasets.xml , tús a chur trí chóipeáil an liosta réamhshocraithe reatha i&lt;Déan Teagmháil Linn i ERDDAP 's
 \\[ taiseachas aeir: fliuch \\] / webapps / erddap / WEB-INF / Ranganna/gov/noaa/pfel / erddap / util/messages.xml comhad.
     
### &lt;taisceMinutes &amp; gt;{#cacheminutes} 
* [EN] ** &lt;riachtanais uisce: measartha ** ] (#cacheminutes) is annamh a úsáidtear chlib OPTIONAL laistigh&lt;cliceáil grianghraf a mhéadú tag i datasets.xml a shonrú ar an aois (i nóiméad) ag ar chóir comhaid sa taisce a scriosadh (réamhshocraithe = 60) . E.g.,
```
    <cacheMinutes>60</cacheMinutes>  
```
Go ginearálta, ach comhaid íomhá (toisc go bhfuil na híomhánna céanna a iarrtar go minic arís agus arís eile) agus .nc comhaid comhad (toisc nach mór iad a chruthú go hiomlán roimh sheoladh chuig an úsáideoir) atá i dtaisce. Cé go bhféadfadh sé cosúil le hiarratas ar leith ba chóir ar ais i gcónaí ar an freagra céanna, nach bhfuil fíor. Mar shampla, a tabledap iarraidh lena n-áirítear am *roinnt roinnt Am agus am* a athrú nuair a thagann sonraí nua don tacar sonraí. Agus iarraidh griddap lena n-áirítear \\[ deireanach \\] don ghné ama a athrú nuair a thagann sonraí nua don tacar sonraí. Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ léamha datasets.xml , lena n-áirítear mar fhreagra ar tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) . Roimh ERDDAP™ v2.00, bhí sé seo sonraithe i thus.xml, atá ceadaithe fós ach discouraged.

### &lt;taisceClearMinutes &amp; gt;{#cacheclearminutes} 
* [EN] ** &lt;riachtanais uisce: measartha ** ] (#cacheclearminutes) is annamh a úsáidtear chlib OPTIONAL laistigh&lt;cliceáil grianghraf a mhéadú tag i datasets.xml a shonrú ar an minicíocht a sheiceáil comhaid i dtaisce agus na cinn d'aois a bhaint (i nóiméad)   (réamhshocraithe = 15) . E.g.,
```
    <cacheClearMinutes>15</cacheClearMinutes>  
```
Nuair a chríochnaíonn an freastalaí láimhseáil iarratas beidh sé a sheiceáil cé chomh fada ó shin go raibh an taisce seo caite soiléir. Má bhí sé ró-fhada ó shin, beidh sé scuaine tasc ar an Tascríd a ghlanadh an taisce. Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ léamha datasets.xml , lena n-áirítear mar fhreagra ar tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) . Is féidir é seo a shonrú i sonraithe i thus.xml, ach go bhfuil discouraged.
     
### &lt;Athshóite InterpolateRequestCSVExample &amp; &amp; rsquo; s;{#convertinterpolaterequestcsvexample} 
* [EN] ** &lt;Athshóite InterpolateRequestCSVExample × ** ] (Tuilleadh eolais) is tag OPTIONAL laistigh de&lt;cliceáil grianghraf a mhéadú tag i datasets.xml   \\[ ag tosú le ERDDAP™ v2.10 \\] ina bhfuil sampla a bheidh le taispeáint ar leathanach gréasáin an tiontaire Interpolate. Is é an luach réamhshocraithe: jplMU RSS T41/anailísithe sst / Líneach / 4.
### &lt;thiontú ina dhiaidh sinDatasetIDVariableList agus logáil isteach;{#convertinterpolatedatasetidvariablelist} 
* [EN] ** &lt;thiontú InterpolateDatasetIDVariableList... ** ] (Cóipeáil nasc leis an tweet Leabaigh an Tweet) is tag OPTIONAL laistigh de&lt;cliceáil grianghraf a mhéadú tag i datasets.xml   \\[ ag tosú le ERDDAP™ v2.10 \\] ina bhfuil liosta CSV de datasetID / athraitheach Ainm samplaí a bheidh in úsáid mar mholtaí ag an tiontaire Interpolate ar leathanach gréasáin. Is é an luach réamhshocraithe: jplMU RSS T41/anailísithe sst .
### &lt;tiontaigh ToPublicSourceUrl &amp; gt;{#converttopublicsourceurl} 
* [EN] ** &lt;Tiontaigh go dtí an tSín ** ] (Tuilleadh eolais) is tag OPTIONAL laistigh de&lt;cliceáil grianghraf a mhéadú tag i datasets.xml ina bhfuil "ó" agus "chun" tréith a shonraíonn conas a thiontú áitiúil meaitseáil sourceUrl   (de ghnáth uimhir IP) go poiblí sourceUrl   (ainm fearainn) . Ní mór go mbeadh an fhoirm "ó" \\[ rud éigin \\] // \\[ rud éigin \\] /". Is féidir a bheith 0 nó níos mó de na clibeanna. Le haghaidh tuilleadh eolais féach [&lt; sourceUrl ú (Tuilleadh eolais) . Mar shampla,
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
a bheith ina chúis le meaitseáil áitiúil sourceUrl   (den sórt sinhttps://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day)   
go poiblí sourceUrl   (https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day) .
Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ léamha datasets.xml , lena n-áirítear mar fhreagra ar tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) .

Ach, ar chúiseanna slándála agus cúiseanna a bhaineann leis an gcóras síntiús, **Ná ÚSÁID AN TAG SEO&#33;**   
Ina áit sin, i gcónaí a bhaint as an t-ainm fearainn poiblí sa&lt; sourceUrl × chlib agus bain úsáid as an [/ srl / óstáil tábla](https://linux.die.net/man/5/hosts) ar do fhreastalaí chun ainmneacha fearainn áitiúla a thiontú go uimhreacha IP gan freastalaí DNS a úsáid. Is féidir leat a thástáil má tá ainm fearainn thiontú i gceart isteach uimhir IP trí úsáid a bhaint:
ping *roinnt.domain.ainm*   
     
### sonraí: íomhá/png; base64,{#dataimagepngbase64} 
* Nuair a iarrann úsáideoir .htmlTable foirm duille: líneach ERDDAP™ , má tá na sonraí i gcill teaghrán sonraí: íomhá / png; base64, ina dhiaidh sin ag bun64 ionchódaithe .png íomhá, ERDDAP™ Beidh taispeáint deilbhín (ionas gur féidir leis an úsáideoir a fheiceáil ar an íomhá má hover siad os a chionn) agus cnaipí a shábháil ar an téacs nó an íomhá chuig an clipboard. Cuireadh an ghné seo isteach i ERDDAP™ v2.19 ag Marco Alba.
###  drawLandMask  {#drawlandmask} 
*    [ ** drawLandMask ** ](#drawlandmask) Sonraíonn an suíomh réamhshocraithe a rialaíonn cathain agus conas ba chóir an t-arm a tharraingt nuair ERDDAP™ Tarraingíonn léarscáil. Is féidir é a shonrú i dtrí áiteanna éagsúla i datasets.xml   (liostaithe ó is ísle go tosaíocht is airde) :
    
    1. Más rud é drawLandMask a shonraítear laistigh&lt;cliceáil grianghraf a mhéadú (nach bhfuil ceangailte le haon tacar sonraí ar leith) , ansin sonraíonn sé an luach réamhshocraithe drawLandMask do gach athróg i ngach tacar sonraí. Mar shampla,
    ```
        <drawLandMask>under</drawLandMask>  
    ```
Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP léamha datasets.xml .
Mura bhfuil an chlib seo i láthair, tá an luach réamhshocraithe bunúsach faoi.
         
    2. Más rud é drawLandMask a shonraítear mar tréith dhomhanda de tacar sonraí ar leith, ansin sonraíonn sé an luach réamhshocraithe de drawLandMask do gach athróg sa tacar sonraí, overriding aon suíomh tosaíochta níos ísle. Mar shampla,
    ```
        <att name="drawLandMask">under</att>  
    ```
Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ athluchtú go tacar sonraí.
         
    3. Más rud é drawLandMask a shonraítear mar tréith athróg i tacar sonraí ar leith, ansin sonraíonn sé an luach réamhshocraithe de drawLandMask don athróg sin sa tacar sonraí, overriding aon suíomh tosaíochta níos ísle. Mar shampla,
    ```
        <att name="drawLandMask">under</att>  
    ```
Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ athluchtú go tacar sonraí.
    
Is féidir le húsáideoir a shárú an réamhshocraithe (cibé áit a shonraítear) trí luach a roghnú le haghaidh "Dréacht masc talún" ó liosta anuas ar an tacar sonraí a dhéanamh A Graph leathanach gréasáin, nó trí &amp;.land = *luach* sa URL a iarrann léarscáil ó ERDDAP .
    
I ngach cás, tá 4 luachanna féideartha don tréith:
    
    * Tarraingíonn "faoi" an tírdhreach sula dtarraingíonn sé sonraí ar an léarscáil.
Maidir le tacair sonraí gridded, is cosúil go bhfuil talamh mar dath liath éadrom.
I gcás tacar sonraí tabular, léiríonn "faoi" sonraí topagrafaíochta thar talamh agus aigéan.
    * "os cionn" -- Maidir le tacair sonraí greilleáilte, tarraingíonn "níos mó" an tírdhreach tar éis dó sonraí a tharraingt ar léarscáileanna ionas go gcuirfidh sé aon sonraí ar thalamh. I gcás tacar sonraí tabular, léiríonn "níos mó" snámhacht na farraige agus liath éadrom tairiseach i gcás ina bhfuil talamh, an dá tharraingt faoi na sonraí.
    * "outline" Tarraingíonn ach an imlíne ar an talamhmask, teorainneacha polaitiúla, lochanna agus aibhneacha.
    * Ní dhéanann "uaire" rud ar bith a tharraingt.
### &lt;Seol do theachtaireacht a chur chugainn:{#emaildiagnosticstoerddata} 
* [EN] ** &lt;cliceáil grianghraf a mhéadú ** ] (#emaildiagnosticstoerddata) is annamh a úsáidtear chlib OPTIONAL laistigh&lt;cliceáil grianghraf a mhéadú tag i datasets.xml . Is féidir le luach an chlib a bheith fíor (taiseachas aeir: fliuch) nó bréagach. Más fíor, ERDDAP™ Beidh ríomhphost a sheoladh chuig an rian chairn go Chris. John ag noaa. tréimhse saoil: ilbhliantúil (an ERDDAP™ internet marketing) . Ba cheart é sin a bheith sábháilte agus slán ós rud é nach bhfuil aon fhaisnéis rúnda (e.g., an t-iarratasUrl) san áireamh sa ríomhphost. Ba chóir é seo a dhéanamh is féidir a ghabháil ar bith doiléir, bugs go hiomlán gan choinne mar thoradh ar NullPointerExceptions. Seachas sin, feiceann an t-úsáideoir na heisceachtaí, ach an ERDDAP™ Ní foireann forbartha (mar sin nach bhfuil a fhios againn go bhfuil fadhb gur gá a shocrú) .
     
### &lt;grafBackgroundColor &amp; gt;{#graphbackgroundcolor} 
* [EN] ** &lt;cliceáil grianghraf a mhéadú ** ] (cliceáil grianghraf a mhéadú) is annamh a úsáidtear chlib OPTIONAL laistigh&lt;cliceáil grianghraf a mhéadú tag i datasets.xml a shonrú dath cúlra réamhshocraithe ar graif. Bíonn tionchar aige seo ar beagnach gach graif. Tá roinnt cásanna nach bhfuil tionchar. Tá an dath sonraithe mar luach heicseagánach 8 dhigit san fhoirm 0xAARRGGBB, áit a bhfuil AA, RR, GG, agus BB an opacity, comhpháirteanna dearg, glas agus gorm, faoi seach. "0x" cás íogair, ach nach bhfuil na digití hexadecimal cás íogair. Mar shampla, teimhneach go hiomlán (taiseachas aeir: fliuch) greenish-gorm dath le dearg = 22, glas =88, bheadh gorm=ee a 0xff2288ee. Is Opaque bán 0xffffff. Is é an réamhshocraithe gorm éadrom teimhneach (Foinse do bhfianaise faoi stiúir glan) , a bhfuil an buntáiste a bheith difriúil ó bán, a bhfuil dath tábhachtach i go leor palettes a úsáidtear chun sonraí a tharraingt. Mar shampla,
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ léamha datasets.xml , lena n-áirítear mar fhreagra ar tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) .
### &lt;Déan Teagmháil Linn{#ipaddressmaxrequests} 
* [EN] ** &lt;Déan Teagmháil Linn ** ] (Tuilleadh roghanna...) is annamh a úsáidtear tag roghnach (chéad tacaíocht le ERDDAP™ v2.12) laistigh de&lt;cliceáil grianghraf a mhéadú tag i datasets.xml go bhfuil cuid de chóras chun teorainn a chur le cumas na n-úsáideoirí dlisteanacha ró-ionsaitheach agus úsáideoirí mailíseach a dhéanamh ar líon mór na n-iarratas comhuaineach a bheadh degrade feidhmíocht córas d'úsáideoirí eile. ipAddress Sonraíonn MaxRequests an líon uasta na n-iarratas comhuaineach a ghlacfar ó aon seoladh IP ar leith. Gheobhaidh iarratais bhreise earráid HTTP 429: Too Iarrataí go leor. Tá na comhaid bheaga, statach i erddap/download/ agus erddap/íomhánna / NACH díolmhaithe ón líon seo. Is é an mhainneachtain 15. Is é an t-uasmhéid a cheadaítear 1000, atá ar mire ard - ná é a dhéanamh&#33; ERDDAP™ Ní bheidh glacadh le líon níos lú ná 6 mar go leor úsáideoirí dlisteanacha (go háirithe brabhsálaithe gréasáin agus WMS cliaint do chliaint) a dhéanamh suas le 6 iarrataí ag an am. An bhfuil ERDDAP™ Tuarascáil Laethúil agus an t-eolas den chineál céanna scríofa leis an comhad log.txt le gach Reload Mór Dataset, beidh san áireamh anois tally na n-iarratas ag na seoltaí IP faoin teideal "Seoladh IP Requester ar (Too Iarrataí go leor) ".
Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ léamha datasets.xml , lena n-áirítear mar fhreagra ar tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) .
    
An "Major LoadDatasets Sraith Am" alt de status.html folaíonn "tooMany" colún a liostaí an líon na n-iarratas a sháraigh úsáideoir ipAddressMaxRequests leagan síos agus dá bhrí sin chonaic earráid "Too Iarrataí go leor". Ligeann sé seo duit a fheiceáil go héasca nuair a bhíonn úsáideoirí dlisteanacha thar a bheith ionsaitheach agus úsáideoirí mailíseach ionas gur féidir leat (go roghnach) breathnú ar an comhad log.txt agus cinneadh a dhéanamh más mian leat a blacklist na húsáideoirí.
    
Níl aon rud cearr go sonrach le leagan seo le líon níos airde. Tá sé suas chun tú. Ach é sin a ligeann / daoine a spreagadh chun córais a chur ar bun a úsáideann líon mór snáitheanna a bheith ag obair ar thionscadail agus ansin tugann siad aon aiseolas nach bhfuil an méid atá á dhéanamh acu ag fáil dóibh aon sochar.
### &lt;ipAddressMaxRequestsActive &amp; gt;{#ipaddressmaxrequestsactive} 
* [EN] ** &lt;Déan Teagmháil Linn ** ] (#ipaddressmaxrequestsactive) is annamh a úsáidtear tag roghnach (chéad tacaíocht le ERDDAP™ v2.12) laistigh de&lt;cliceáil grianghraf a mhéadú tag i datasets.xml go bhfuil cuid de chóras chun teorainn a chur le cumas na n-úsáideoirí dlisteanacha ró-ionsaitheach agus úsáideoirí mailíseach a dhéanamh ar líon mór na n-iarratas comhuaineach a bheadh degrade feidhmíocht córas d'úsáideoirí eile. Sonraíonn ipAddressMaxRequestsActive an líon uasta na n-iarratas comhuaineach a phróiseáil go gníomhach ó aon seoladh IP ar leith. Beidh iarratais bhreise suí i scuaine go dtí go bhfuil na hiarratais roimhe sin próiseáilte. Na comhaid bheaga, statach i erddap / íosluchtú / agus erddap/íomhánna / ARE díolmhaithe ón líon seo agus an rathú gaolmhar. Is é an réamhshocraithe 2. Is é an t-uasmhéid a cheadaítear 100, atá ar mire ard - ná é a dhéanamh&#33; Is féidir leat é seo a shocrú go 1 a bheith dian, go háirithe má tá fadhbanna agat le húsáideoirí ró-ionsaitheach nó mailíseach. Beidh úsáideoirí fós a fháil go tapa na sonraí go léir a iarrann siad (suas go dtí ipAddressMaxRequests) , ach ní bheidh siad in ann acmhainní córas muc. Ní chuirimid a mholadh seo a leagan síos le líon níos mó toisc go gceadaíonn sé ró-ionsaitheach úsáideoirí dlisteanacha agus úsáideoirí mailíseach a tionchar an-mhór ERDDAP cumas próiseála '.
Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ léamha datasets.xml , lena n-áirítear mar fhreagra ar tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) .
     
### &lt;ipAddressUnlimited &amp; gt;{#ipaddressunlimited} 
* [EN] ** &lt;ipAddressUnlimited ** ] (#ipaddressunlimited) is annamh a úsáidtear tag roghnach (chéad tacaíocht le ERDDAP™ v2.12) laistigh de&lt;cliceáil grianghraf a mhéadú tag i datasets.xml go bhfuil cuid de chóras chun teorainn a chur le cumas na n-úsáideoirí dlisteanacha ró-ionsaitheach agus úsáideoirí mailíseach a dhéanamh ar líon mór na n-iarratas comhuaineach a bheadh degrade feidhmíocht córas d'úsáideoirí eile. ipAddressUnlimited Is liosta coma-scartha de seoltaí IP gur mian leat rochtain neamhtheoranta ar do ERDDAP . Féach ar do logáil isteach. comhad txt a fheiceáil a formáid bhfuil do fhreastalaí ag baint úsáide as do na seoltaí IP. Ar roinnt freastalaithe, beidh na seoltaí IP a bheith san fhormáid #. #. #. (i gcás ina bhfuil # slánuimhir ó 0 go 255) ; ach ar dhaoine eile beidh sé i bhformáid #: #: #: #: #: #: #: #: # . Níl iarrthóirí ar an liosta seo faoi réir na ipAddressMaxRequests nó na socruithe ipAddressMaxRequestsActive. D'fhéadfadh sé seo a bheith tánaisteach ERDDAP™ nó d'úsáideoirí nó freastalaithe áirithe i do chóras. ERDDAP™ Cuireann i gcónaí " (taiseachas aeir: fliuch) ", ERDDAP™ úsáidí nuair nach féidir seoladh IP an iarrthóra a chinneadh, m.sh., le haghaidh próisis eile ag rith ar an bhfreastalaí céanna.
Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ léamha datasets.xml , lena n-áirítear mar fhreagra ar tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) .
    
Más rud é ar chúis éigin go léir na n-iarratas úsáideora a fháil ar an teachtaireacht earráide "Amout ag fanacht le do iarrataí eile a phróiseáil.", ansin is féidir leat a réiteach ar an bhfadhb trí chur leis an úsáideora seoladh IP ar an liosta ipAddressUnlimited, a chur i bhfeidhm an t-athrú, ansin é a bhaint as an liosta sin.
    
### &lt;ualachDatasetsMinMinutes &amp; &amp; nbsp;{#loaddatasetsminminutes} 
* [EN] ** &lt;riachtanais uisce: measartha ** ] (#loaddatasetsminminutes) is annamh a úsáidtear chlib OPTIONAL laistigh&lt;cliceáil grianghraf a mhéadú tag i datasets.xml chun an t-íosmhéid ama a shonrú (i nóiméad) idir ualach mór An tSraith Shinsearach (nuair a bhíonn ERDDAP™ taiseachas aeir: fliuch datasets.xml , lena n-áirítear seiceáil gach tacar sonraí a fheiceáil más gá é a athlódáil de réir a athlódáil GachNMinutes leagan, réamhshocraithe = 15) . E.g.,
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
Má tá reáchtáil áirithe de loadDatasets Bíonn níos lú ná an uair seo, an t-ualach Breathnaíonn ach arís agus arís eile ar an eolaire bratach agus / nó codlata go dtí go bhfuil an t-am atá fágtha a rith. Is é an réamhshocraithe 15 nóiméad, ba chóir a bheith fíneáil do beagnach gach duine. Is é an t-aon mhíbhuntáiste chun é seo a shocrú go dtí líon níos lú ná go méadóidh sé an minicíocht a ERDDAP™ retries tacar sonraí a bhfuil earráidí a chuireann cosc orthu a bheith luchtaithe (e.g., tá freastalaí iargúlta síos) . Má tá go leor de na tacair shonraí sin agus má dhéantar iad a aththiomsú go minic, d'fhéadfadh an fhoinse sonraí a mheas go bhfuil sé ag fulaingt / ag iompar céimlaghdaitheach. Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ léamha datasets.xml , lena n-áirítear mar fhreagra ar tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) . Roimh ERDDAP™ v2.00, bhí sé seo sonraithe i thus.xml, atá ceadaithe fós ach discouraged.
     
### &lt;ualachDatasetsMaxMinutes &amp; &amp; nbsp;{#loaddatasetsmaxminutes} 
* [EN] ** &lt;riachtanais uisce: measartha ** ] (#loaddatasetsmaxminutes) is tag OPTIONAL laistigh de&lt;cliceáil grianghraf a mhéadú tag i datasets.xml chun an t-uasmhéid ama a shonrú (i nóiméad) ualach mór Tá sé de chead ag an iarracht sonraí a ghlacadh (roimh an ualach Sonraí snáithe cóireáilte mar "stalled" agus tá sé isteach)   (réamhshocraithe = 60) . E.g.,
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
Go ginearálta, ba cheart é seo a shocrú go dtí dhá uair ar a laghad chomh fada agus a cheapann tú le réasún go bhfuil na tacair sonraí go léir á n-athlódáil (go carnach) ba chóir a ghlacadh (ós rud é go bhfuil ríomhairí agus líonraí uaireanta níos moille ná mar a mheastar) Ba chóir go mbeadh sé seo i gcónaí i bhfad níos faide ná ualachDatasetsMinMinutes. Is é an réamhshocraithe 60 nóiméad. Beidh roinnt daoine a leagtar seo a thuilleadh. Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ léamha datasets.xml , lena n-áirítear mar fhreagra ar tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) . Roimh ERDDAP™ v2.00, bhí sé seo sonraithe i thus.xml, atá ceadaithe fós ach discouraged.
     
### &lt;Logáil isteach agus logáil isteach;{#loglevel} 
* [EN] ** &lt;Logáil isteach » ** ] (Roghnaigh gach rud) is tag OPTIONAL laistigh de&lt;cliceáil grianghraf a mhéadú tag i datasets.xml a shonrú cé mhéad teachtaireachtaí diagnóiseacha a sheoladh chuig an comhad log.txt. Is féidir é a shocrú chun "teagmhála" (na teachtaireachtaí is lú) , "info" (taiseachas aeir: fliuch) , nó "uile" (na teachtaireachtaí is mó) . E.g.,
```
    <logLevel>info</logLevel>  
```
Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ léamha datasets.xml , lena n-áirítear mar fhreagra ar tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) . Roimh ERDDAP™ v2.00, bhí sé seo sonraithe i thus.xml, atá ceadaithe fós ach discouraged.
     
### &lt;páirteachRequestMaxBytes &amp; &amp; rsquo; agus&lt;páirteachRequestMaxCells &amp; &amp; rsquo;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* [EN] ** &lt;cliceáil grianghraf a mhéadú **] (#partialrequestmaxbytes-agus-partialrequestmaxcells) agus [EN]** &lt;cliceáil grianghraf a mhéadú ** ] (#partialrequestmaxbytes-agus-partialrequestmaxcells) is annamh a úsáidtear clibeanna OPTIONAL laistigh&lt;cliceáil grianghraf a mhéadú tag i datasets.xml . Nuair is féidir (agus nach bhfuil sé indéanta i gcónaí) , ERDDAP™ sosanna iarratais sonraí mór i smután chun cuimhne a chaomhnú.
    
Le 32 giotán Java , i gciall simplistic, an líon uasta comhuaineach *mór mór mór* iarratais Is garbh 3/4 an chuimhne ar fáil (an luach -Xmx a rith go Tomcat) roinnte ag an méid smután (e.g., 1200 MB / 100 MB = 3,000 iarrataí) . Éilíonn rudaí eile cuimhne, mar sin beidh líon iarbhír na n-iarratas a bheith níos lú. Go praiticiúil, nach bhfuil smután indéanta i gcónaí. Mar sin, d'fhéadfadh ceann ollmhór nó roinnt iarrataí an-mhór comhuaineach neamh-inchunkable ina chúis le fadhbanna ar 32 giotán Java .

Le 64 giotán Java , is féidir leis an luach -Xmx a bheith i bhfad níos mó. Mar sin, tá cuimhne i bhfad níos lú seans a bheith ina srian.

Is féidir leat override an méid smután réamhshocraithe trí shainmhíniú na clibeanna i datasets.xml   (le luachanna éagsúla ná a thaispeántar anseo) :
Do greillí:&lt;cliceáil grianghraf a mhéadú&lt;/ PartialRequestMaxBytes?
Le haghaidh táblaí:&lt;cliceáil grianghraf a mhéadú&lt;Seirbhís do Chustaiméirí

Is páirteachRequestMaxBytes an líon is fearr de bytes le haghaidh iarratas sonraí greille páirteach (smután den iarraidh iomlán) . réamhshocraithe = 100000000 (tréimhse saoil: ilbhliantúil) . Níl méideanna níos mó gá níos fearr (agus ná téigh níos mó ná 500 MB toisc go bhfuil teorainn réamhshocraithe THREDDS do DAP minicíocht uisce: flúirseach) . Ach d'fhéadfadh méideanna níos mó a cheangal ar rochtain níos lú de tonna de chomhaid (smaoineamh ar ERD 's sonraí satailíte le gach pointe ama i gcomhad ar leith - tá sé níos fearr a fháil níos mó sonraí ó gach comhad i ngach iarratas páirteach) .

Is páirteachRequestMaxCells an líon is fearr cealla (nRows \\* n Colúin sa tábla sonraí) i gcás iarratais pháirt-Tábla (smután den iarraidh iomlán) . Réamhshocrú = 100000. Níl méideanna níos mó gá níos fearr. Mar thoradh orthu fanacht níos faide don bhaisc tosaigh sonraí ón bhfoinse.

Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ léamha datasets.xml , lena n-áirítear mar fhreagra ar tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) . Roimh ERDDAP™ v2.00, bhí sonraithe iad seo i thus.xml, atá ceadaithe fós ach discouraged.
     
### &lt;iarratas Blacklist &amp; rsquo; s;{#requestblacklist} 
* [EN] ** &lt;iarratas Blacklist × ** ] (#request blacklist)   [Is tag OPTIONAL](/docs/server-admin/additional-information#frequent-crashes-or-freezes) laistigh de&lt;cliceáil grianghraf a mhéadú tag i datasets.xml ina bhfuil liosta coma-scartha de seoltaí IP uimhriúil a bheidh blacklisted. Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ léamha datasets.xml , lena n-áirítear mar fhreagra ar tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) .
    * Is féidir é seo a úsáid chun fend as [Denial ionsaí Seirbhíse](https://en.wikipedia.org/wiki/Denial_of_service) , ar zealous ró- [web development](https://en.wikipedia.org/wiki/Internet_bot) , nó aon chineál eile d'úsáideoir troublesome.
    * Troublesome Úsáideoir -- Más rud é ERDDAP™ slows go crawl nó reonna / stadanna, is é an chúis go minic le úsáideoir troublesome atá ag rith níos mó ná script amháin ag an am céanna agus / nó a dhéanamh ar líon mór na n-iarratas an-mhór, thar a bheith neamhéifeachtach, nó neamhbhailí, nó iarratais comhuaineach. Féach ar [logáil isteach.](/docs/server-admin/additional-information#log) a fheiceáil más é seo an cás agus a fháil ar an seoladh IP uimhriúil an t-úsáideoir troublesome. Más é seo an fhadhb, ba chóir duit is dócha blacklist go úsáideora.
        
Nuair a bheidh ERDDAP™ Faigheann iarratas ó sheoladh IP blacklisted, beidh sé ar ais HTTP Error 403: Toirmiscthe. Spreagann an teachtaireacht earráide téacs a ghabhann leis an úsáideoir a ríomhphost a thabhairt duit, an ERDDAP riarthóir, a bheith ag obair amach na fadhbanna. Má ghlacann siad an t-am a léamh an teachtaireacht earráide (nach bhfuil go leor cosúil) agus teagmháil a dhéanamh leat, is féidir leat a bheith ag obair ansin leo chun iad a fháil a reáchtáil ach script amháin ag an am, a dhéanamh iarratais níos éifeachtaí, na fadhbanna a shocrú ina script (mar shampla, ag iarraidh sonraí ó tacar sonraí iargúlta nach féidir a fhreagairt roimh uainiú amach) , nó is cuma cad eile a bhí an fhoinse trioblóide.
        
Tá úsáideoirí go minic ach aineolach go bhfuil a n-iarratais troublesome. Tá siad go minic aineolach ar bugs, inefficiencies comhlán, nó fadhbanna eile lena scripteanna. Smaoineamh siad go minic mar gheall ar do ERDDAP™ Cuireann sonraí ar fáil saor in aisce, gur féidir leo a iarraidh ar an oiread sonraí agus is mian leo, m.sh., trí scripteanna iolracha a reáchtáil nó trí úsáid a bhaint as snáitheanna éagsúla ag an am céanna.
        
        * Is féidir leat a mhíniú dóibh go bhfuil gach ERDDAP™ , anois is cuma cé chomh mór agus cumhachtach, tá acmhainní finite (Am LAP, tiomáint crua I / O, bandaleithead líonra, etc.) agus nach bhfuil sé cothrom má iarrann úsáideoir amháin sonraí ar bhealach a sluaite amach úsáideoirí eile nó overburdens ERDDAP .
        * Nuair a fhios ag úsáideoir conas a dhéanamh 2 iarratais comhuaineach, feiceann siad go minic aon chúis gan a dhéanamh 5, 10 nó 20 iarrataí comhuaineach, ós rud é go bhfuil na hiarratais breise costas orthu rud ar bith. Tá sé cosúil le cogaíochta asymmetric: anseo, tá na hairm ionsaitheach buntáiste ollmhór (costas nialas) os cionn na n-arm cosanta (suiteáil críochta le costais fíor) .
        * Pointe amach dóibh go bhfuil tuairisceáin a laghdú a dhéanamh ar iarratais níos mó agus níos comhuaineach; na hiarrataí breise ach bloc breise amach iarratais úsáideora eile; nach bhfuil siad ag teacht ar feabhas ollmhór dóibh.
        * I gcuimhne dóibh go bhfuil úsáideoirí eile (úsáideoirí ócáideacha agus úsáideoirí eile ag rith scripteanna) , mar sin nach bhfuil sé cothrom acu a muc gach ceann de ERDDAP 's acmhainní.
        * Pointe amach go bhfuil na giants ardteicneolaíochta a spreag úsáideoirí a bheith ag súil acmhainní gan teorainn ó sheirbhísí gréasáin. Cé go bhfuil bealaí a chur ar bun [greillí/blúistí/feistis ERDDAP s s](/docs/server-admin/scaling) a dhéanamh ERDDAP™ córas le níos mó acmhainní, an chuid is mó ERDDAP™ Ní riarthóirí bhfuil an t-airgead nó an daonchumhacht a chur ar bun córais den sórt sin, agus beidh córas den sórt sin a bheith fós finite. Ag ERD mar shampla, tá duine amháin (dom) i scríbhinn ERDDAP™ , riaradh dhá ERDDAP s s (le cabhair ó mo Boss) , agus a bhainistiú roinnt foinsí sonraí, go léir le buiséad crua-earraí bliantúil de $ 0 (táimid ag brath ar dheontais ócáideacha a íoc as crua-earraí) . Níl sé seo Google, Facebook, Amazon, etc le 100 innealtóirí, agus na milliúin dollar ioncaim a athchúrsáil i gcórais riamh níos mó. Agus ní féidir linn bogadh díreach ár ERDDAP™ go, mar shampla, Amazon AWS, toisc go bhfuil na costais stórála sonraí mór agus go bhfuil na muirir egress sonraí mór agus athraitheach, cé go bhfuil ár mbuiséad le haghaidh seirbhísí seachtracha a shocrú $ 0.
        * Is é mo iarraidh ar úsáideoirí: le haghaidh iarrataí neamh-íogair (a bhfuil i bhfad an cás is coitianta) , ba chóir a gcóras a dhéanamh ach iarratas amháin ag an am. Má tá na hiarrataí am íogair (e.g., il .pngs ar leathanach gréasáin, tíleanna il le haghaidh WMS cliant, etc.) , ansin b'fhéidir 4 Ba chóir iarratais comhuaineach a bheith ar an max (agus díreach ar feadh tréimhse an-ghearr) .
        * Má mhíníonn tú an staid don úsáideoir, beidh an chuid is mó úsáideoirí a thuiscint agus a bheith toilteanach a dhéanamh ar na hathruithe is gá ionas gur féidir leat a bhaint a seoladh IP as an blacklist.
             
    * Chun blacklist úsáideoir, cuir a seoladh IP uimhriúil leis an liosta de sheoltaí IP i gcuimhne&lt;iarratas Blacklist × i do datasets.xml comhad. Chun seoladh IP an úsáideora trioblóideacha a aimsiú, féach ar an ERDDAP™   *Treoir do Thuismitheoirí* / logs / log.txt comhad ( *Treoir do Thuismitheoirí* a shonraítear i [crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml) ) a fheiceáil má tá sé seo an cás agus a fháil go úsáideora seoladh IP. Tá an seoladh IP do gach iarratas liostaithe ar na línte ag tosú le " &amp; #123; &amp; #123; &amp; #123; #" agus tá 4 uimhreacha scartha ag tréimhsí, mar shampla, 123.45.67.8 . Cabhróidh cuardach le haghaidh "ERROR" leat fadhbanna a aimsiú, mar shampla iarrataí neamhbhailí.
    * Is féidir leat a chur in ionad an uimhir dheireanach i seoladh IP le\\*(mar shampla, 202.109.200.\\*) chun cosc a chur ar raon seoltaí IP, 0-255.
    * Is féidir leat an uimhir 2 deireanach a chur in ionad freisin i seoladh IP le\\*.\\*  (mar shampla, 121.204.\\*.\\*) a bloc raon níos leithne de seoltaí IP, 0-255.0-255.
    * Mar shampla,
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * Ní gá duit atosú ERDDAP™ do na hathruithe ar&lt;iarratas a dhéanamh ar an liosta dubh le héifeacht a ghlacadh. Beidh na hathruithe a bhrath an chéad uair eile ERDDAP™ seiceálacha más gá aon tacar sonraí a athlódáil. Nó, is féidir leat dlús a chur leis an bpróiseas trí chuairt a thabhairt [leagan síos Bratach URL](/docs/server-admin/additional-information#set-dataset-flag) le haghaidh aon tacar sonraí.
    * Do chuid oibre ERDDAP™ Áirítear sa tuarascáil laethúil liosta/tally de na hiarratasóirí is gníomhaí a cheadaítear agus blocáilte.
    * Más mian leat a fháil amach cén bhfearann / institiúid a bhaineann le seoladh IP uimhriúil, is féidir leat úsáid a bhaint saor in aisce, droim ar ais seirbhís gréasáin DNS cosúil le [https://network-tools.com/](https://network-tools.com/) .
    * D'fhéadfadh go mbeadh amanna nuair a dhéanann sé ciall chun úsáideoirí áirithe a bhlocáil ag leibhéal níos airde, mar shampla, úsáideoirí mailíseacha. Mar shampla, is féidir leat bloc a rochtain ar gach rud ar do fhreastalaí, ní hamháin ERDDAP . Ar Linux, tá modh amháin den sórt sin a úsáid [iptables](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/) . Mar shampla, is féidir leat a chur riail a bloc gach rud ag teacht ó 198.51.100.0 leis an ordú
iptables -I INPUT -s 198.51.100.0 Seirbhís do Chustaiméirí
       
### &lt;mallDownTroubleMillis agus &amp; rsquo; s;{#slowdowntroublemillis} 
* [EN] ** &lt;cliceáil grianghraf a mhéadú ** ] (#slowdowntroublemillis) is annamh a úsáidtear chlib OPTIONAL laistigh&lt;cliceáil grianghraf a mhéadú tag i datasets.xml ina bhfuil slánuimhir a shonraíonn an líon milliseconds (réamhshocraithe = 1000) sos nuair freagairt do gach iarratas theip, m.sh., tacar sonraí anaithnid, iarraidh ró-mhór, úsáideoir ar an blacklist. E.g.,
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
Má tá script ag déanamh iarratas amháin díreach tar éis a chéile, ansin d'fhéadfadh sé a dhéanamh go tapa iarratas amháin olc i ndiaidh a chéile. Leis an suíomh seo, is féidir leat mall síos script ag teip mar sin ERDDAP™ nach bhfuil faoi uisce le droch-iarratais. Má dhéanann duine iarratas dona, ní bheidh siad faoi deara fiú an mhoill. Moltaí:
    
    * Má tá an deacracht Dáileadh Denial Of Service (Sonraí Teagmhála) ionsaí ó 100 + ionsaitheoirí, a leagtar seo le líon níos lú (100?) . Slowing iad go léir síos le haghaidh mar thoradh ró-fhada go snáitheanna an iomarca gníomhach.
    * Má tá an deacracht ó 1-10 foinsí, seo a shocrú go 1000 ms (taiseachas aeir: fliuch) , ach líon níos mó (cosúil le 10000) tá sé réasúnach freisin. Go slows iad síos mar sin dramhaíola siad níos lú acmhainní líonra. Chomh maith leis sin, 1000 ms nó mar sin ní bheidh annoy úsáideoirí an duine a dhéanann iarratas dona.
    
Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ léamha datasets.xml , lena n-áirítear mar fhreagra ar tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) .
     
### &lt;síntiús Ríomhphost Blacklist &amp; rsquo; s;{#subscriptionemailblacklist} 
* [EN] ** &lt;síntiús a íoc Ríomhphost: blacklist ** ] (Tuilleadh eolais) is annamh a úsáidtear chlib OPTIONAL laistigh&lt;cliceáil grianghraf a mhéadú tag i datasets.xml ina bhfuil liosta de sheoltaí ríomhphoist atá ar deighilt ó na seoltaí ríomhphoist atá ar fáil láithreach ón [Córas síntiús](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) , mar shampla
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
Is córas cás-íogair é seo. Má chuirtear seoladh ríomhphoist leis an liosta seo, má tá síntiúis ag an seoladh ríomhphoist sin, cuirfear na síntiúis ar ceal. Má dhéanann seoladh ríomhphoist ar an liosta iarracht síntiús a íoc, diúltófar don iarratas. Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ léamha datasets.xml , lena n-áirítear mar fhreagra ar tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) .
     
### Téacs Caighdeánach{#standard-text} 
*    [ **Téacs Caighdeánach** ](#standard-text) -- Tá roinnt clibeanna OPTIONAL (is annamh a úsáidtear) laistigh de&lt;cliceáil grianghraf a mhéadú tag i datasets.xml a shonrú téacs atá le feiceáil in áiteanna éagsúla i ERDDAP . Más mian leat a athrú ar an téacs réamhshocraithe, cóip an luach atá ann cheana ó chlib an ainm céanna i
     *taiseachas aeir: fliuch* / webapps / erddap / WEB-INF / Ranganna/gov/noaa/pfel/breise/util.messages.xml isteach i datasets.xml , ansin an t-ábhar a mhodhnú. An buntáiste a bhfuil na i datasets.xml Is gur féidir leat luachanna nua a shonrú ag am ar bith, fiú nuair ERDDAP™ ag rith. Beidh aon athruithe ar na clibeanna 'luachanna i bhfeidhm an chéad uair eile ERDDAP™ léamha datasets.xml , lena n-áirítear mar fhreagra ar tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) . Na hainmneacha tag cur síos ar a n-aidhm, ach féach ar an ábhar réamhshocraithe i messages.xml le haghaidh tuiscint níos doimhne.
    
    *   &lt;Caighdeánach
    *   &lt;caighdeán Teagmháil
    *   &lt;standardDataLicenses ×
    *   &lt;standardDisclaimerOfEndorsement
    *   &lt;caighdeánDisclaimerOfExternalLinks ×
    *   &lt;standardGeneralDisclaimed ú
    *   &lt;caighdeán caighdeánach Príobháideacht
    *   &lt;tús a chur leis an snáithe
    *   &lt;Is tag maith a athrú d'fhonn a shaincheapadh ar an chuma ar an barr gach leathanach gréasáin i do ERDDAP . Go suntasach, is féidir leat é seo a úsáid chun teachtaireacht shealadach a chur go héasca ar an ERDDAP™ Leathanach baile (e.g., "Seiceáil amach an nua JPL MUR SST v4.1 tacar sonraí..." nó "Seo ERDDAP™ beidh sé as líne le haghaidh cothabhála 2019-05-08T17:00 PDT trí 2019-05-08T20:00 PDT.") . 1 fhreagra amháin 0 d’atweetálacha 2 chroí datasets.xml Is é: nuair a restart tú ERDDAP , an chéad iarratas a dhéanamh ERDDAP™ beidh an tús réamhshocraithe ar ais BodyHtml5 HTML, ach beidh gach iarratas ina dhiaidh sin a bhaint as an startBodyHtml5 HTML sonraithe i datasets.xml .
    *   &lt;An tSraith Shinsearach Is chlib maith a athrú d'fhonn a shaincheapadh ar an tuairisc ar do ERDDAP . Tabhair faoi deara gur féidir leat é seo a athrú go héasca chun teachtaireacht shealadach a chur ar an leathanach baile (e.g., "This ERDDAP™ beidh sé as líne le haghaidh cothabhála 2019-05-08T17:00 PDT trí 2019-05-08T20:00 PDT.") .
    *   &lt;Deireadh an chomhrá
    
      
Roimh ERDDAP™ v2.00, bhí sonraithe iad seo i thus.xml, atá ceadaithe fós ach discouraged.
     
### &lt;neamhghnách Gníomhaíocht &amp; Gníomhaíocht;{#unusualactivity} 
* [EN] ** &lt;Gníomhaíocht neamhghnácha ** ] (#neamhspleáchas) is annamh a úsáidtear chlib OPTIONAL laistigh&lt;cliceáil grianghraf a mhéadú tag i datasets.xml a shonrú ar an líon uasta na n-iarratas idir dhá ritheann de LoadDatasets a mheastar gnáth (réamhshocraithe = 10000) . Má sháraítear an uimhir sin, cuirtear ríomhphost chuig emailEverythingTo (mar atá sonraithe i thus.xml) . E.g.,
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ léamha datasets.xml , lena n-áirítear mar fhreagra ar tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) . Roimh ERDDAP™ v2.00, bhí sé seo sonraithe i thus.xml, atá ceadaithe fós ach discouraged.
     
### &lt;updateMaxEvents &amp; gt;{#updatemaxevents} 
* [EN] ** &lt;updateMaxEvents ^ ** ] (Tuilleadh roghanna...) is annamh a úsáidtear chlib OPTIONAL laistigh&lt;cliceáil grianghraf a mhéadú tag i datasets.xml a shonrú ar an líon uasta na n-imeachtaí athrú comhad (réamhshocraithe = 10) a láimhseáil ag an [&lt;updateEveryNMillis . (Tuilleadh roghanna...) córas roimh athrú a athlódáil an tacar sonraí ina ionad. Mar shampla,
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
Tá an córas updateEveryNMillis beartaithe a reáchtáil go han-tapa ceart sula n-iarrann úsáideoir a phróiseáil. Má tá a lán de na himeachtaí a athrú comhad, ansin presumably ní féidir é a reáchtáil go tapa, mar sin ina ionad sin iarrann sé ar an tacar sonraí a athlódáil. Má tá do ERDDAP™ Déileálann le tacair sonraí nach mór a choimeád cothrom le dáta fiú nuair a bhíonn athruithe ar líon mór de chomhaid sonraí, is féidir leat é seo a shocrú le líon níos mó (100?) .

### &lt;úsáideoir &amp; rsquo; s{#user} 
* [EN] ** &lt;úsáideora ** ] (Tuilleadh eolais) is tag OPTIONAL laistigh de&lt;cliceáil grianghraf a mhéadú tag i datasets.xml aithníonn ainm úsáideora, pasfhocal (má fíordheimhniú = custaim) , agus róil (liosta coma-scartha) . Athraíonn úsáid ainm úsáideora agus pasfhocal beagán bunaithe ar luach [&lt;fíordheimhnithe ú (/ dochtúirí / freastalaí / faisnéis bhreise #authentication) i do ERDDAP 's comhad thus.xml.
    * Níl an Tweet seo ar fáil ERDDAP 's [security system](/docs/server-admin/additional-information#security) chun srian a chur ar rochtain ar roinnt tacar sonraí d'úsáideoirí áirithe.
    * Déan ar leith&lt;úsáideoir × chlib do gach úsáideoir. Roghnach, más fíordheimhnithe = oauth2, Is féidir leat a chur ar bun dhá&lt;úsáideora clibeanna do gach úsáideoir: ceann amháin le haghaidh nuair a logs an t-úsáideoir i via Google, ceann amháin nuair a logálann an t-úsáideoir i via Orcid, go mór leis na róil chéanna.
    * Má tá aon&lt;úsáideoir × chlib do chliant, s / beidh sé in ann rochtain a fháil ar thacair sonraí poiblí, i.e., tacar sonraí nach bhfuil [&lt;go dtí seo (Tuilleadh eolais) tag.
    * ainm úsáideora
Le haghaidh fíordheimhnithe = custaim, Is é an ainm úsáideora de ghnáth meascán de litreacha, digití, underscores, agus tréimhsí.
Chun fíordheimhniú = r-phost, Is é an ainm úsáideora seoladh ríomhphoist an úsáideora. D'fhéadfadh sé a bheith ar aon seoladh ríomhphoist.
Maidir le fíordheimhniú =google, is é an t-ainm úsáideora seoladh ríomhphoist iomlán Google an úsáideora. Áirítear leis seo cuntais Google-bhainistithe ar nós @noaa.gov cuntais.
Le haghaidh fíordheimhnithe = orcid, Is é an ainm úsáideora uimhir chuntas Orcid an úsáideora (le Fleasc) .
Le haghaidh fíordheimhnithe = oauth2, is é an t-ainm úsáideora seoladh ríomhphoist iomlán Google nó uimhir chuntais Orcid an úsáideora (le Fleasc) .
    * focal faire
Le haghaidh fíordheimhnithe = Ríomhphost, google, orcid, nó oauth2, nach bhfuil a shonrú tréith focal faire.
Le haghaidh fíordheimhnithe = custaim, ní mór duit a shonrú tréith focal faire do gach úsáideoir.
        * Is iad na pasfhocail a thagann úsáideoirí cás íogair agus ní mór go bhfuil 8 nó níos mó carachtair mar sin tá siad níos deacra a crack. Faoi láthair, is féidir fiú 8 carachtair a scáinte go tapa agus go saor ag fórsa brute ag baint úsáide as braisle de ríomhairí ar AWS. ERDDAP™ ach forfheidhmíonn an t-íosmhéid 8-charachtar nuair a dhéanann an t-úsáideoir a logáil isteach (ní nuair a bhíonn an&lt;Tá úsáideoir lí chlib á phróiseáil, toisc go bhfeiceann an cód ach an díolama hash an focal faire, ní an focal faire plaintext).
        * riachtanais uisce: measartha&lt;Focal faire códú a chinneann conas pasfhocail a stóráil sa&lt;úsáideora clibeanna i datasets.xml . Chun slándáil a mhéadú, is iad na roghanna:
            *    [MD5](https://en.wikipedia.org/wiki/MD5)   (Ná bain úsáid as seo&#33;) -- don tréith phasfhocal, sonraigh an MD5 hash díolama de phasfhocal an úsáideora.
            * UEPMD5 (Ná bain úsáid as seo&#33;) -- don tréith phasfhocal, sonraigh an MD5 hash díolama de *ainm úsáideora* : ERDDAP : *focal faire* . An ainm úsáideora agus " ERDDAP " a úsáidtear chun [salann salainn](https://en.wikipedia.org/wiki/Salt_(cryptography) ) an luach hash, rud a chiallaíonn sé níos deacra a dhíchódú.
            *    [Seirbhís do Chustaiméirí](https://en.wikipedia.org/wiki/SHA-2)   (gan a bheith molta) -- don tréith focal faire, sonraigh an hash díolama SHA-256 pasfhocal an úsáideora.
            * UEPSHA256 (réamhshocraithe, molta Focal faire códú. Ach i bhfad níos fearr: úsáid a bhaint as an google, magairlín, nó oauth2 roghanna fíordheimhnithe.) -- don tréith phasfhocal, sonraigh an hash díolama SHA-256 *ainm úsáideora* : ERDDAP : *focal faire* . An ainm úsáideora agus " ERDDAP " a úsáidtear chun salann an luach hash, rud a chiallaíonn sé níos deacra a dhíchódú.
        * Ar Windows, is féidir leat luachanna díolama phasfhocal MD5 a ghiniúint trí chlár MD5 a íoslódáil (den sórt sin [MD5](https://www.fourmilab.ch/md5/) ) agus a úsáid (mar shampla) :
md5 -djsmith: ERDDAP : *iarbhírPassword* 
        * Ar Linux / Unix, is féidir leat luachanna díleá MD5 a ghiniúint trí úsáid a bhaint as an gclár md5sum tógtha (mar shampla) :
macalla -n "comhairle: ERDDAP : *iarbhírPassword* " " " | taiseachas aeir: fliuch
        * Tá focal faire plaintext Stored cás íogair. Níl na foirmeacha a stóráil de MD5 agus pasfhocail UEPMD5 cás íogair.
        * Mar shampla (ag baint úsáide as UEPMD5) , más ainm úsáideora = "jsmith" agus focal faire = "myPassword", an&lt;Is é an t-úsáideoir × chlib:
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
nuair a bhí a ghintear an focal faire stóráilte le
md5 -djsmith: ERDDAP : myPassword
        * Is liosta de na róil a bhfuil an t-úsáideoir údaraithe ina leith é róil. Aon duine&lt;D'fhéadfadh tacar sonraí a bheith ag [&lt;go dtí seo (Tuilleadh eolais) tag a liostaí na róil a cheadaítear chun rochtain a fháil ar an tacar sonraí. I gcás úsáideoir ar leith agus tacar sonraí ar leith, má tá ceann de na róil i liosta an úsáideora na róil oireann ar cheann de na róil i liosta na tacar sonraí ar&lt;inrochtana Chun róil bhéil, ansin tá an t-úsáideoir údaraithe chun rochtain a fháil ar an tacar sonraí.
            
Tá gach úsáideoir a logs i thugtar go huathoibríoch ar an ról \\[ duine ar bith I \\] , cibé an bhfuil&lt;úsáideoir bhéil chlib dóibh i datasets.xml nó nach bhfuil. Mar sin, má tá tacar sonraí ar leith
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
ansin beidh aon úsáideoir atá logáilte isteach a údarú chun rochtain a fháil ar an tacar sonraí, fiú mura bhfuil aon&lt;úsáideoir bhéil chlib dóibh i datasets.xml .
            
    * Beidh aon athruithe ar luach an chlib seo i bhfeidhm an chéad uair eile ERDDAP™ léamha datasets.xml , lena n-áirítear mar fhreagra ar tacar sonraí [bratach bratach](/docs/server-admin/additional-information#flag) .
         
### &lt;cosánRegex &amp; &amp; rsquo;{#pathregex} 
* [EN] ** &lt;pathRegex × ** ] (Tuilleadh eolais) ligeann duit a shonrú léiriú rialta a teorainneacha a cosáin (a fostiúrthóirí) a chur san áireamh sa tacar sonraí. Is é an réamhshocraithe .\\ *, a oireann gach cosáin. Is annamh a úsáidtear é seo, is annamh a theastaíonn, tag OPTIONAL le haghaidh EDDGrid Ó tacar sonraí, EDDTableFromFiles datasets, agus roinnt cineálacha tacar sonraí eile. Mar sin féin, nuair is gá duit é, is gá duit i ndáiríre é.
    
Chun an obair seo a dhéanamh, ní mór duit a bheith i ndáiríre go maith le habairtí rialta. Féach seo [doiciméadú regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) agus [riachtanais uisce: measartha](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) . Go háirithe, ní mór duit fios a bheith agat faoi ghrúpaí gabhála (rud éigin taobh istigh de lúibíní) , agus an "nó" siombail " | ".
Le chéile, na lig tú a shonrú ar aon líon na roghanna, m.sh., (Roghanna 1 | Roghanna 2 | Rogha 3) .
Chomh maith leis sin, is féidir aon cheann de na roghanna a bheith rud ar bith, m.sh., ( | Roghanna 2 | Rogha 3) .
Chomh maith leis sin, ní mór duit a fhios gur féidir le grúpaí gabhála a neadú, i.e., is féidir le grúpa gabhála eile a bheith in aon rogha i ngrúpa gabhála, e.g. ( | Roghanna 2 ( | Roghanna 2 b | Rogha 2c)  | Rogha 3) a deir gur féidir rogha 2 a leanúint ag aon rud, nó option2b, nó option2c.
I gcás pathRegexes, beidh gach rogha a bheith ainm fillteán amháin ina dhiaidh sin /, m.sh., barra / .
    
Is é an chuid tricky den pathRegex: Nuair ERDDAP™ Athchúrsach descends an crann eolaire, ní mór an pathRegex glacadh leis na cosáin a bhíonn sé ar a bhealach do na heolairí le sonraí. Is bealach maith é Regex le grúpaí gabhála neadaithe chun déileáil leis seo.
    
Sampla:
Soláthairtí ní mór dúinn an struchtúr eolaire seo a leanas:
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
agus is é /foo / barra /, agus ba mhaith linn ach an .nc comhaid sa D \\[ 0-9 \\] &#123;4&#125;/a/fostiúrthóirí.
Is é an réiteach a shocrú pathRegex go /foo / barra / ( | D. D.D. \\[ 0-9 \\] &#123;4&#125;/ ( | a/) )   
Deir:
Ní mór an cosán a thosú le /foo / barra /
D'fhéadfadh a leanúint ag aon ní nó D \\[ 0-9 \\] &#123;4&#125;/
Is féidir sin a leanúint ag aon ní nó a/
    
Sea, is féidir le pathRegex a bheith thar a bheith deacair a fhoirmiú. Má tá tú i bhfostú, a iarraidh ar ríomhchláróir (an rud is gaire sa domhan fíor le incantations draoi spouting?) nó seol ríomhphost chuig Chris. John ag noaa.gov.
    
### &lt;dataset &amp; rsquo; s{#dataset} 
* [EN] ** &lt;tacar sonraí ** ] (# tacar sonraí) Is OPTIONAL (ach a úsáidtear i gcónaí) tag laistigh de&lt;cliceáil grianghraf a mhéadú tag i datasets.xml go (má tá an t-eolas ar fad idir&lt;dataset ú agus&lt;/ dataset uaire) cur síos go hiomlán tacar sonraí amháin. Mar shampla,
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
Tá MAY a bheith ar aon líon na clibeanna tacar sonraí i do datasets.xml comhad.
Trí tréithe MAY le feiceáil laistigh de&lt;dataset ú chlib:
     
    *    **cineál = " *a Cineál Cineál Cineál cineál* " " "** Is tréith RIQUIRED laistigh&lt;dataset × chlib datasets.xml aithníonn an cineál tacar sonraí (mar shampla, cibé an bhfuil sé EDDGrid / gridded nó EDDTable / tacar sonraí) agus foinse na sonraí (mar shampla, bunachar sonraí, comhaid, nó iargúlta OPeNDAP freastalaí freastalaí) . Féach an [ **Liosta de na Cineálacha Sonraí atá leagtha** ](#list-of-types-datasets) .
         
#### dataset taiseachas aeir: fliuch{#datasetid} 
*    [ ** datasetID = " *Amharc ar gach eolas* " " "** ](#datasetid) Is tréith RIQUIRED laistigh&lt;dataset bhéil chlib a shannadh gearr (de ghnáth&lt;15 carachtair), uathúil, ainm a aithint le tacar sonraí.
    * An bhfuil datasetID s MUST a bheith ina litir (A-Z, a-z) ina dhiaidh sin ag aon líon A-Z, a-z, 0-9, agus \\_ (ach is fearr más rud é&lt;32 carachtair iomlán).
    * Toradh na sonraí Tá IDs cás íogair, ach N'T chruthú dhá datasetID s nach bhfuil ach difriúil i litreacha uachtair / ísealchás. Beidh sé ina chúis le fadhbanna ar ríomhairí Windows (mise agus/nó ríomhaire úsáideora) .
    * cleachtais is fearr: Molaimid ag úsáid [camel camel Cás trastomhas](https://en.wikipedia.org/wiki/CamelCase) .
    * cleachtais is fearr: Molaimid gur acrainm nó giorrúchán d'ainm na hinstitiúide foinse an chéad chuid agus gur acrainm nó giorrúchán d'ainm na tacar sonraí an dara cuid. Nuair is féidir, cruthaímid ainm a léiríonn ainm an fhoinse don tacar sonraí. Mar shampla, d'úsáid muid datasetID = ERDPH sst a8day" le haghaidh tacar sonraí ón NOAA   NMFS   SWFSC An Rannóg Taighde Comhshaoil ( ERD ) atá ainmnithe ag an bhfoinse a bheith satailíte/PH/ sst a/8 lá.
    * Má athraíonn tú ainm tacar sonraí, an tacar sonraí d'aois (leis an seanainm) beidh fós beo i ERDDAP . Is tacar sonraí "dílleachta" é seo, toisc go bhfuil an tsonraíocht ann datasets.xml Tá sé imithe anois. Ní mór déileáil leis seo:
        1. Le haghaidh ERDDAP™ v2.19 agus ina dhiaidh sin, ní gá duit aon rud a dhéanamh. ERDDAP™ a bhaint go huathoibríoch ar na tacair sonraí dílleachta.
        2. Le haghaidh ERDDAP™ v2.18 agus níos luaithe, ní mór duit rud éigin a dhéanamh chun na tacair sonraí dílleachta a bhaint: Déan gníomhach = "false" tacar sonraí, m.sh.,
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
Tar éis an chéad ualach mór eile Sonraí, Is féidir leat a bhaint go bhfuil tag tar éis an tacar sonraí d'aois neamhghníomhach.
                 
#### gníomhach gníomhach{#active} 
*    [ **gníomhach = " *riachtanais uisce: measartha* " " "** ](#active) Is tréith OPTIONAL laistigh&lt;dataset × chlib datasets.xml a léiríonn má tá tacar sonraí gníomhach (incháilithe le haghaidh úsáide ERDDAP ) nó nach bhfuil.
    * Tá luachanna bailí fíor (taiseachas aeir: fliuch) agus bréagach.
    * Ós rud é go bhfuil an réamhshocraithe fíor, ní gá duit a bhaint as an tréith seo go dtí gur mian leat a bhaint go sealadach nó go buan an tacar sonraí ó ERDDAP .
    * Má tá tú a bhaint ach gníomhach = "true" tacar sonraí ó datasets.xml , beidh an tacar sonraí fós gníomhach i ERDDAP™ ach ní bheidh a thabhairt cothrom le dáta. Beidh tacar sonraí den sórt sin ina "dílleachta" agus beidh sé liostaithe mar sin ar an stádas. html leathanach gréasáin ceart thíos an liosta de na tacair sonraí a theip a luchtú.
    * Má leagtar tú gníomhach = "false", ERDDAP™ beidh deactivate an tacar sonraí an chéad uair eile iarracht sé a thabhairt cothrom le dáta an tacar sonraí. Nuair a dhéanann tú seo, ERDDAP™ Ní caith amach aon fhaisnéis a d'fhéadfadh sé a bheith stóráilte mar gheall ar an tacar sonraí agus cinnte nach bhfuil aon rud a dhéanamh leis na sonraí iarbhír.
    * D'fhonn a bhaint tacar sonraí ó ERDDAP™ , féach [Fórsa Dataset](/docs/server-admin/additional-information#removing-datasets) .
         

 ** Is féidir roinnt clibeanna le feiceáil idir an&lt;dataset ú agus&lt;/ tacar sonraí tags. **   
Tá roinnt athruithe ina bhfuil clibeanna a cheadaítear ag na cineálacha tacar sonraí. Féach an doiciméadacht le haghaidh sainiúil [cineál tacar sonraí](#list-of-types-datasets) le haghaidh sonraí.

#### &lt;ar fáil Chun &amp; F;{#accessibleto} 
* [EN] ** &lt;ar fáil Le haghaidh ** ] (Tuilleadh eolais) is tag OPTIONAL laistigh de&lt;tacar sonraí × chlib a shonraíonn liosta coma-scartha de [Róil](#user) a cheadaítear rochtain a bheith acu ar an tacar sonraí seo. Mar shampla,
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * Níl an Tweet seo ar fáil ERDDAP 's [security system](/docs/server-admin/additional-information#security) chun srian a chur ar rochtain ar roinnt tacar sonraí d'úsáideoirí áirithe.
    * Mura bhfuil an chlib seo i láthair, gach úsáideoir (fiú mura bhfuil siad logáilte isteach) beidh rochtain ar an tacar sonraí.
    * Má tá an chlib seo i láthair, ní bheidh an tacar sonraí seo le feiceáil ach agus inrochtana d'úsáideoirí logáilte isteach a bhfuil ceann de na róil shonraithe acu. Ní bheidh an tacar sonraí a bheith le feiceáil d'úsáideoirí nach bhfuil logáilte isteach.
    * Tá gach úsáideoir a logs i thugtar go huathoibríoch ar an ról \\[ duine ar bith I \\] , cibé an bhfuil&lt;úsáideoir bhéil chlib dóibh i datasets.xml nó nach bhfuil. Mar sin, má tá tacar sonraí ar leith
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
ansin beidh aon úsáideoir atá logáilte isteach a údarú chun rochtain a fháil ar an tacar sonraí, fiú mura bhfuil aon&lt;úsáideoir bhéil chlib dóibh i datasets.xml .
         
#### &lt;graif AccessibleTo &amp; g;{#graphsaccessibleto} 
* [EN] ** &lt;graif atá le feiceáil Chun ** ] (Tuilleadh roghanna...) is tag OPTIONAL laistigh de&lt;dataset × chlib datasets.xml a chinneann an bhfuil grafaicí agus meiteashonraí don tacar sonraí ar fáil don phobal. Cuireann sé ar bhealach a shárú go páirteach ar an tacar sonraí [&lt;go dtí seo (Tuilleadh eolais) leagan síos. Is iad na luachanna ceadaithe:
    * auto -- An luach seo (nó easpa&lt;graif AccessibleTo chlib don tacar sonraí) a dhéanann rochtain ar graif agus meiteashonraí ón tacar sonraí mimic an tacar sonraí&lt;inrochtana Chun lí leagan.
Mar sin, má tá an tacar sonraí príobháideach, beidh a graif agus meiteashonraí príobháideacha.
Agus má tá an tacar sonraí poiblí, beidh a graif agus meiteashonraí poiblí.
    * public service -- Déanann an suíomh seo graif agus meiteashonraí an tacar sonraí inrochtana do dhuine ar bith, fiú úsáideoirí nach bhfuil logáilte isteach, fiú má tá an tacar sonraí príobháideach ar shlí eile toisc go bhfuil sé ar&lt;inrochtana Chun chlib.
         
#### &lt;ar fáil Fianáin &amp; rsquo; s;{#accessibleviafiles} 
* [EN] ** &lt;cliceáil grianghraf a mhéadú ** ] (Tuilleadh roghanna...) is tag OPTIONAL laistigh de&lt;dataset × chlib datasets.xml le haghaidh [ EDDGrid Toise Comhiomlánaithe](#eddgridaggregateexistingdimension) , [ EDDGrid Cóip Uaireadóirí Cóip](#eddgridcopy) , [ EDDGrid Seirbhísí ar líne](#eddgridfromeddtable) , [ EDDGrid An tSraith Shinsearach](#eddfromerddap) , [ EDDGrid Uisce agus Séarachas](#eddgridfrometopo) , [ EDDGrid Seirbhís do Chustaiméirí](#eddgridfromfiles)   (lena n-áirítear gach fo-aicme) , [ EDDGrid SideBySide](#eddgridsidebyside) , [EDDTableCopy](#eddtablecopy)   [EDDTableFromErddap](#eddfromerddap) , [EDDTableFrom EDDGrid ](#eddtablefromeddgrid) , agus [EDDTableFromFiles](#eddtablefromfiles)   (lena n-áirítear gach fo-aicme) datasets. Is féidir go mbeadh luach fíor nó bréagach. Mar shampla,
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
Má tá an luach fíor, ERDDAP™ a dhéanamh ionas gur féidir le húsáideoirí brabhsáil agus comhaid sonraí foinse an tacar sonraí a íoslódáil trí ERDDAP 's [ "files" córas córas](https://coastwatch.pfeg.noaa.gov/erddap/files/) . Féach an "files" córas ar [data recovery](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) le haghaidh tuilleadh eolais.
    
An luach réamhshocraithe&lt;cliceáil grianghraf a mhéadú thagann ó&lt;cliceáil grianghraf a mhéadú i [crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml) . Tá sé luach réamhshocraithe de bréagach, ach molaimid go gcuireann tú go tag le do thus.xml le luach fíor.
    
Mol -- Molaimid a dhéanamh ar gach tacar sonraí ábhartha inrochtana tríd an gcóras comhaid ag leagan&lt;defaultAccessibleViaFiles ú le fíor i thus.xml toisc go bhfuil grúpa na n-úsáideoirí a bhfuil sé seo an bealach is fearr a fháil ar na sonraí. I measc cúiseanna eile, na "files" córas a dhéanann sé éasca d'úsáideoirí a fheiceáil a bhfuil comhaid ar fáil agus nuair a d'athraigh siad go deireanach, rud a chiallaíonn sé éasca d'úsáideoir a choimeád ar bun a gcuid cóip féin den tacar sonraí ar fad. Más rud é nach bhfuil tú ag iarraidh go ginearálta a dhéanamh tacair sonraí inrochtana tríd an gcóras comhaid, leagtha&lt;defaultAccessibleViaFiles ú le bréagach. I gceachtar cás, ach úsáid&lt;ViaFiles a bhfuil rochtain orthu ú le haghaidh na cúpla tacar sonraí atá eisceachtaí ón mbeartas ginearálta arna leagan síos ag&lt;cliceáil grianghraf a mhéadú (mar shampla, nuair a úsáideann an tacar sonraí [ .nc ml ml](#ncml-files) comhaid, nach bhfuil i ndáiríre úsáideach d'úsáideoirí) .
     
#### &lt;ar fáil Bhí an t-eolas úsáideach WMS &amp; gt;{#accessibleviawms} 
* [EN] ** &lt;ar fáil Bhí an t-eolas úsáideach WMS ú ** ] (Tuilleadh roghanna...) is tag OPTIONAL laistigh de&lt;dataset × chlib datasets.xml do gach duine [ EDDGrid ](#eddgrid) fo-aicmí. Is féidir é a bhfuil luach fíor (taiseachas aeir: fliuch) nó bréagach. Mar shampla,
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
Má tá an luach bréagach, ERDDAP 's WMS Ní bheidh freastalaí ar fáil don tacar sonraí seo. Tá sé seo a úsáidtear go coitianta le haghaidh tacar sonraí a bhfuil roinnt luachanna domhanfhad níos mó ná 180 (atá neamhbhailí go teicniúil WMS web development) , agus a bhfuil tú ag tairiscint freisin ar mhalairt de na tacar sonraí le luachanna fada go hiomlán sa raon -180 go 180 trí [ EDDGrid Naisc go dtí suíomhanna eile](#eddgridlonpm180) .
Má tá an luach fíor, ERDDAP™ déanfaidh sé iarracht an tacar sonraí a chur ar fáil trí ERDDAP 's WMS freastalaí. Ach má tá an tacar sonraí go hiomlán mí-oiriúnach le haghaidh WMS   (e.g., níl aon sonraí domhanfhad nó domhanleithead) , ansin ní bheidh an tacar sonraí ar fáil trí ERDDAP 's WMS freastalaí, beag beann ar an suíomh seo.
     
#### &lt;cuir isteach Athróga Cá háit agus cén áit;{#addvariableswhere} 
* [EN]&lt;addVariablesMás rud é? (#addvariableswhere) is tag OPTIONAL laistigh den&lt;tacar sonraí × chlib do gach tacar sonraí EDDTable.
    
Is féidir iarratais ar aon tacar sonraí EDDTable áireamh &amp; breise Athróga Cá háit a ndéanfaidh mé (" " " *tréith Ainm an ainm* "," *tréith Luach* " " ") , a insíonn ERDDAP™ a chur ar fad na n-athróg sa tacar sonraí nuair *tréith Ainm = ómós* leis an liosta de na hathróga a iarrtar. Mar shampla, má chuireann úsáideoir &amp; cuir Athróga Cá háit a ndéanfaidh mé (" " " ioos\\_category ", "Wind") le ceist, ERDDAP cuirfidh gach athróg sa tacar sonraí a bhfuil ioos\\_category = tréith Wind leis an liosta na n-athróg a iarrtar (mar shampla, windSpeed, windDirection, windGustSpeed) . *tréith Ainm an ainm* agus *tréith Luach* atá cás-íogair.
    
I datasets.xml , má tá an smután de dataset.xml le haghaidh tacar sonraí
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
mar shampla,
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
An Fhoirm Rochtana Sonraí (.html leathanach gréasáin) Beidh do na tacar sonraí san áireamh ghiuirléid (do gach tréith Name sa liosta coma-scartha) ceart thíos an liosta de na hathróga a ligeann d'úsáideoirí a shonrú luach tréith. Má roghnaíonn an t-úsáideoir luach tréith do cheann amháin nó níos mó de na hainmneacha tréith, beidh siad a chur leis an iarratas via &amp; breise Athróga Cá háit a ndéanfaidh mé (" " " *tréith Ainm an ainm* "," *tréith Luach* " " ") . Dá bhrí sin, an chlib i datasets.xml ligeann tú a shonrú ar an liosta na n-ainmneacha tréith a bheidh le feiceáil ar an Foirm Rochtana Sonraí don tacar sonraí agus a dhéanann sé éasca d'úsáideoirí a chur &amp; addVariables I gcás feidhmeanna don iarraidh. An bhfuil *tréith NamesCSV* tá liosta cás-íogair.
    
#### &lt;airde MetersPerSourceUnit &amp; &amp; nbsp;{#altitudemeterspersourceunit} 
* [EN] ** &lt;airde MetersPerSourceUnit... ** ] (# aonad foinse cumhachta) is tag OPTIONAL laistigh den&lt;tacar sonraí chlib i tacar sonraí. xxml do EDDTableFrom SOS web development (ach amháin&#33;) a shonraíonn uimhir atá arna iolrú faoin airde foinse nó luachanna doimhneachta chun iad a thiontú ina luachanna airde (i méadair os cionn leibhéal na farraige) . Mar shampla,
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
MUST chlib seo a úsáid más rud é nach bhfuil na luachanna ais ingearach an tacar sonraí méadar, dearfach = suas. Seachas sin, tá sé OPTIONAL, ós rud é go bhfuil an luach réamhshocraithe 1. Mar shampla,
    * Má tá an fhoinse thomhas cheana féin i méadair os cionn leibhéal na farraige, úsáid 1 (nó ná bain úsáid as an chlib seo, ós rud é gurb é 1 an luach réamhshocraithe) .
    * Má tá an fhoinse a thomhas i méadar faoi bhun leibhéal na farraige, úsáid -1.
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * Má thomhaistear an fhoinse i km os cionn leibhéal na farraige, bain úsáid as 0.001.
         
#### &lt;réamhshocraithe &amp; rsquo; s{#defaultdataquery} 
* [EN] ** &lt;cliceáil grianghraf a mhéadú ** ] (Tuilleadh eolais) is tag OPTIONAL laistigh de&lt;dataset × chlib datasets.xml go insíonn ERDDAP™ úsáid a bhaint as an gceist shonraithe (an chuid den URL tar éis an "?") má tá an comhad html Cineál Cineál Cineál cineál (An Fhoirm Rochtana Sonraí) Iarrtar gan aon cheist.
    * Is dócha gur gá duit é seo a úsáid.
    * Ní mór duit XML-ionchód (Ní faoin gcéad ionchódú) na ceisteanna réamhshocraithe ós rud é go bhfuil siad i doiciméad XML. Mar shampla, &amp; éiríonn,&lt;thiocfaidh chun bheith&lt;, ^ thiocfaidh chun bheith &amp; gt; .
    * Seiceáil do chuid oibre. Tá sé éasca a dhéanamh botún agus ní a fháil ar cad ba mhaith leat. ERDDAP™ beidh iarracht a ghlanadh suas do earráidí - ach nach bhfuil ag brath ar sin, ós rud é\\*conas conas a conas conas a conas a conas a conas a\\*is féidir é a ghlanadh suas a athrú.
    * Maidir le tacair sonraí griddap, is é úsáid choitianta é seo ná doimhneacht réamhshocraithe nó luach gné airde a shonrú (mar shampla, \\[ 0 0 \\] in ionad \\[ deireanach \\] ) .
In aon chás, ba chóir duit liosta i gcónaí ar fad de na hathróga, i gcónaí a bhaint as na luachanna gné céanna do gach athróg, agus beagnach i gcónaí a úsáid \\[ 0 0 \\] , \\[ deireanach \\] , nó \\[ 0: deireanach \\] do na luachanna gné.
Mar shampla:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * Le haghaidh tabledap datasets, más rud é nach bhfuil tú a shonrú aon srian, Beidh an t-iarratas ar ais ar an tacar sonraí ar fad, a d'fhéadfadh a bheith neamhphraiticiúil mór, ag brath ar an tacar sonraí. Más rud é nach bhfuil tú ag iarraidh a shonrú ar aon srianta, seachas a bhfuil folamh&lt;cliceáil grianghraf a mhéadú (atá mar an gcéanna nach bhfuil a shonrú mainneachtain Eolas faoin gComhlacht) , ní mór duit a liostú go sainráite gach ceann de na hathróga is mian leat a chur san áireamh sa defaultDataQuery.
    * Le haghaidh tabledap datasets, is é an úsáid is coitianta seo a shonrú raon ama réamhshocraithe éagsúla (i gcomparáid le max (am trátha) , mar shampla, &amp; rsquo; s max (am trátha) -1day, nó i gcoibhneas le anois, mar shampla, &amp; am × = now- 1ú lá) .
Cuimhnigh go bhfuil iarraidh aon athróg sonraí mar an gcéanna a shonrú gach athróg sonraí, mar sin de ghnáth is féidir leat a shonrú ach an srian ama nua.
Mar shampla:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
nó
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;réamhshocraithe GraphQuery &amp; gt;{#defaultgraphquery} 
* [EN] ** &lt;cliceáil grianghraf a mhéadú ** ] (Tuilleadh eolais) is tag OPTIONAL laistigh de&lt;dataset × chlib datasets.xml go insíonn ERDDAP™ úsáid a bhaint as an gceist shonraithe (an chuid den URL tar éis an "?") má tá an .graph comhad Cineál Cineál Cineál cineál (Déan Foirm Graph) Iarrtar gan aon cheist.
    * Is dócha gur gá duit é seo a úsáid.
    * Ní mór duit XML-ionchód (Ní faoin gcéad ionchódú) na ceisteanna réamhshocraithe ós rud é go bhfuil siad i doiciméad XML. Mar shampla, &amp; éiríonn,&lt;thiocfaidh chun bheith&lt;, ^ thiocfaidh chun bheith &amp; gt; .
    * Seiceáil do chuid oibre. Tá sé éasca a dhéanamh botún agus ní a fháil ar cad ba mhaith leat. ERDDAP™ beidh iarracht a ghlanadh suas do earráidí - ach nach bhfuil ag brath ar sin, ós rud é\\*conas conas a conas conas a conas a conas a conas a\\*is féidir é a ghlanadh suas a athrú.
    * Maidir le tacair sonraí griddap, is é an úsáid is coitianta seo ná doimhneacht réamhshocraithe nó luach gné airde a shonrú (mar shampla, \\[ 0 0 \\] in ionad \\[ deireanach \\] ) agus / nó a shonrú go athróg ar leith a graif.
In aon chás, beidh tú a úsáid beagnach i gcónaí \\[ 0 0 \\] , \\[ deireanach \\] , nó \\[ 0: deireanach \\] do na luachanna gné.
Mar shampla:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (ach é a chur go léir ar líne amháin) 
    * Le haghaidh tabledap datasets, más rud é nach bhfuil tú a shonrú aon srian, Beidh an t-iarratas graf an tacar sonraí ar fad, a d'fhéadfadh a ghlacadh ar feadh i bhfad, ag brath ar an tacar sonraí.
    * Le haghaidh tabledap datasets, is é an úsáid is coitianta seo a shonrú raon ama réamhshocraithe éagsúla (i gcomparáid le max (am trátha) , mar shampla, &amp; rsquo; s max (am trátha) -1day, nó i gcoibhneas le anois, mar shampla, &amp; am × = now- 1ú lá) .
Cuimhnigh go bhfuil iarraidh aon athróg sonraí mar an gcéanna a shonrú gach athróg sonraí, mar sin de ghnáth is féidir leat a shonrú ach an srian ama nua.
Mar shampla:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
nó
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;gnéValuesInMemory &amp; rsquo; s;{#dimensionvaluesinmemory} 
* [EN] ** &lt;gné Luachanna i mBéal Feirste ** ] (Tuilleadh roghanna...)   (fíor fíor (taiseachas aeir: fliuch) nó bréagach) Is tag OPTIONAL agus is annamh a úsáidtear laistigh den&lt;dataset ^ tag le haghaidh aon EDDGrid tacar sonraí a insíonn ERDDAP™ áit a choinneáil ar na luachanna foinse na toisí (ar a dtugtar freisin mar an axisVariable s s) :
    
    * fíor = i gcuimhne (atá níos tapúla ach úsáideann níos mó cuimhne) 
    * bréagach = ar an diosca (atá níos moille ach úsáideann aon chuimhne) 
    
Mar shampla,
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
Ba chóir duit é seo a úsáid ach amháin leis an luach neamh-mhainneach bréagach má tá do ERDDAP™ Tá a lán de datasets le toisí an-mhór (e.g., na milliúin luachanna, m.sh., i EDDGrid Seirbhís do Chustaiméirí) agus ERDDAP 's I Úsáid úsáide tá úsáid chuimhne i gcónaí ró-ard. Féach an Cuimhne: ag baint úsáide as líne faoi láthair ag \\[ do Doimhneacht \\]  /erddap/status.html chun monatóireacht a dhéanamh ERDDAP™ úsáid cuimhne.
     
#### &lt;fileTableInMemory &amp; gt;{#filetableinmemory} 
* [EN] ** &lt;fileTableInMemory × ** ] (Tuilleadh eolais)   (fíor nó bréagach (taiseachas aeir: fliuch) ) is tag OPTIONAL laistigh den&lt;dataset ^ tag le haghaidh aon EDDGrid Ó Fianáin agus EDDTable Leagan sonraí FromFiles a insíonn ERDDAP™ cén áit a bhfuil an comhad a choinneáil (a bhfuil eolas faoi gach comhad sonraí foinse) :
    
    * fíor = i gcuimhne (atá níos tapúla ach úsáideann níos mó cuimhne) 
    * bréagach = ar an diosca (atá níos moille ach úsáideann aon chuimhne) 
    
Mar shampla,
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
Má leagtar tú seo a bheith fíor le haghaidh aon tacar sonraí, a choinneáil ar an tsúil ar an Cuimhne: faoi láthair ag baint úsáide as líne ag \\[ do Doimhneacht \\]  /erddap/status.html a chinntiú go ERDDAP™ fós tá neart cuimhne saor in aisce.
     
#### &lt;FgdcFile &amp; Fgt;{#fgdcfile} 
* [EN] ** &lt;fgdcFile ** ] (Tuilleadh eolais) is tag OPTIONAL laistigh de&lt;dataset × chlib datasets.xml go insíonn ERDDAP™ comhad FGDC réamhdhéanta a úsáid in ionad é a bheith ERDDAP™ iarracht a ghiniúint an comhad. Úsáid:
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *Iomlán na gCeantar Tuaithe Déan Teagmháil Linn* is féidir tagairt a dhéanamh do chomhad áitiúil (áit éigin ar an bhfreastalaí córas comhaid) nó an URL comhad iargúlta.
Más rud é *Iomlán na gCeantar Tuaithe Déan Teagmháil Linn* \\ =" nó nach bhfuil an comhad le fáil, ní bheidh aon mheiteashonraí FGDC ag an tacar sonraí. Mar sin, tá sé seo úsáideach freisin más mian leat a bhaint as an meiteashonraí FGDC le haghaidh tacar sonraí ar leith.
Nó, is féidir leat a chur&lt;cliceáil grianghraf a mhéadú&lt;/ FgdcActive uaire i thus.xml a insint ERDDAP™ gan meiteashonraí FGDC a thairiscint le haghaidh aon tacar sonraí.
     
#### &lt;Seirbhís do Chustaiméirí Comhad agus Comhad;{#iso19115file} 
* [EN] ** &lt;Iso19115File) ** ] (Tuilleadh roghanna...) is tag OPTIONAL laistigh de&lt;dataset × chlib datasets.xml go insíonn ERDDAP™ a úsáid réamh-déanta ISO 19115 comhad in ionad a bheith ERDDAP™ iarracht a ghiniúint an comhad. Úsáid:
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *Iomlán na gCeantar Tuaithe Déan Teagmháil Linn* is féidir tagairt a dhéanamh do chomhad áitiúil (áit éigin ar an bhfreastalaí córas comhaid) nó an URL comhad iargúlta.
Más rud é *Iomlán na gCeantar Tuaithe Déan Teagmháil Linn* \\ =" nó nach bhfuil an comhad le fáil, ní bheidh aon mheiteashonraí ISO 19115 ag an tacar sonraí. Mar sin, tá sé seo úsáideach freisin más mian leat a bhaint as na meiteashonraí ISO 19115 le haghaidh tacar sonraí ar leith.
Nó, is féidir leat a chur&lt;cliceáil grianghraf a mhéadú&lt;/ iso19115 Gníomhach uaire i thus.xml a insint ERDDAP™ gan a thairiscint meiteashonraí ISO 19115 le haghaidh aon tacar sonraí.
     
#### &lt;Seirbhís do Chustaiméirí Déan teagmháil linn;{#matchaxisndigits} 
* [EN] ** &lt;Conas a oibríonn sé? ** ] (Tuilleadh roghanna...) is tag OPTIONAL laistigh de EDDGrid  &lt;dataset × chlib EDDGrid tacar sonraí atá comhiomlánaithe, m.sh., comhiomlánú na gcomhad. Gach uair a dhéantar an tacar sonraí a athlódáil, ERDDAP™ seiceálacha go bhfuil na luachanna ais de gach comhpháirt den chomhiomlánú mar an gcéanna. Déantar cruinneas na tástála a chinneadh ag an [Déan teagmháil anois](#matchaxisndigits) , a shonraíonn an líon iomlán na n digití nach mór a mheaitseáil nuair a thástáil luachanna ais cruinneas dúbailte, 0 - 18 (taiseachas aeir: fliuch) . Nuair a thástáil luachanna ais snámhphointe, tá an tástáil a dhéanamh le matchAxisNDigits/2 digití. Insíonn luach 18 nó os a chionn EDDGrid tástáil bheacht a dhéanamh. Luach de 0 Insíonn EDDGrid gan aon tástáil a dhéanamh, nach bhfuil molta, ach amháin mar a thuairiscítear thíos.
    
Cén fáth Cé EDDGrid Ceadaíonn na comhpháirteanna an comhiomlánaithe go bhfuil luachanna ais beagán difriúil, ach sraith amháin de luachanna ais a thaispeántar don úsáideoir. Is é an tacar ón gcomhpháirt chéanna a sholáthraíonn meiteashonraí foinse an tacar sonraí. Mar shampla, le haghaidh EDDGrid Leagann sonraí FromFiles, atá sonraithe ag an&lt;meiteashonraíÓ leagan amach (réamhshocraithe = buan) .
    
Bain úsáid as matchAxisNDigits\\ = 0 Tá discouraged go láidir i bhformhór na gcásanna, mar gheall ar casadh sé amach gach seiceáil. Fiú seiceáil íosta úsáideach mar a chinntíonn sé go bhfuil na comhpháirteanna oiriúnach do aggregating. Glacaimid go léir go bhfuil na comhpháirteanna go léir oiriúnach, ach níl sé i gcónaí mar sin. Tá sé seo dá bhrí sin tástáil sanity tábhachtach. Fiú luachanna matchAxisNDigits1, 2, 3 nó 4 Tá discouraged toisc go léiríonn na luachanna ais éagsúla go minic gur cruthaíodh na comhpháirteanna (binned?) ar bhealach difriúil agus dá bhrí sin nach bhfuil oiriúnach le haghaidh comhiomlánú.
    
Tá cás amháin nuair a úsáid matchAxisNDigits\\ = 0 úsáideach agus molta: le comhbhailiúcháin de chomhaid iargúlta, m.sh., sonraí i buicéid S3. Sa chás seo, má úsáideann an tacar sonraí cacheFromUrl, cacheSizeGB, matchAxisNDigits\\ = 0, agus an EDDGrid Córas FromFiles [comhiomlánú trí Ainm an chomhaid](#aggregation-via-file-names-or-global-metadata) , ansin EDDGrid Ní gá a léamh gach ceann de na comhaid iargúlta a dhéanamh ar an comhiomlánú. Ligeann sé seo tacair sonraí a rinneadh ó shonraí i mbúicéid S3 a luchtú go han-tapa (i gcoinne absurdly mall más rud é EDDGrid Tá a íoslódáil agus a léamh gach ceann de na comhaid) .
    
#### &lt;nTríodar &amp; beannaithe;{#nthreads} 
* Ag tosú le ERDDAP™ leagan 2.00, nuair aon fho-aicme EDDTableFromFiles nó EDDGrid léann sonraí óna fhoinse, is féidir é a léamh smután amháin de shonraí (e.g., comhad foinse amháin) ag an am (i snáithe amháin)   (go bhfuil an réamhshocraithe) nó níos mó ná smután amháin sonraí (e.g., 2+ comhaid foinse) ag an am (i 2 nó níos mó snáitheanna) agus gach iarratas á phróiseáil.
     
    * Riail Thumb:
I gcás an chuid is mó tacar sonraí ar an chuid is mó de na córais, úsáid nThreads = 1, an réamhshocraithe. Má tá tú ríomhaire cumhachtach (go leor de cores LAP, go leor de chuimhne) , ansin a mheas leagan nThreads go 2, 3, 4, nó níos airde (ach ní níos mó ná an líon cores LAP sa ríomhaire) i gcás tacar sonraí a d'fhéadfadh leas a bhaint as:
        
        * Beidh an chuid is mó de na tacair shonraí EDDTableFromFiles tairbhe.
        * Beidh sonraí nuair is cúis le rud éigin a lag sular féidir smután sonraí a phróiseáil iarbhír tairbhe, mar shampla:
            * Sonraí le [seachtrach-compressed (e.g., .gz ) ](#externally-compressed-files) dénártha dénártha (e.g., .nc ) comhaid, mar gheall ar ERDDAP™ Tá a decompress an comhad ar fad sular féidir é a thosú a léamh an comhad.
            * Sonraí a úsáideann [taiseachas aeir: fliuch](#cachefromurl) , mar gheall ar ERDDAP™ go minic a íoslódáil an comhad sular féidir é a léamh.
            * Datasets le comhaid sonraí a stóráil ar ard-bandaleithead córas comhaid comhthreomhar, mar is féidir é a sheachadadh níos mó sonraí, níos tapúla, nuair a iarrtar. I measc na samplaí de chórais comhad comhthreomhar [Déan teagmháil](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures) , [Seirbhís do Chustaiméirí](http://www.pnfs.com/) , [Gliúnna](https://en.wikipedia.org/wiki/Gluster) , Amazon S3, agus Google Cloud Stóráil.
                 
        
Rabhadh: Nuair a bhíonn nThreads ag baint úsáide as 0.51, coinnigh súil ar ERDDAP 's úsáid chuimhne, úsáid snáithe, agus freagrúlacht fhoriomlán (féach ar [ ERDDAP 's leathanach stádas](/docs/server-admin/additional-information#status-page) ) . Féach tuairimí faoi na saincheisteanna seo thíos.
         
    * Le haghaidh tacar sonraí áirithe, is féidir leis an suíomh seo nThreads teacht ó áiteanna éagsúla:
        
        * Má tá an datasets.xml Tá smután le haghaidh tacar sonraí&lt;nTrídí chlib (laistigh den&lt;tacar sonraí chlib, ní mar tréith dhomhanda) le luach × = 1, go bhfuil luach na nThreads a úsáidtear. Mar sin, is féidir leat a shonrú uimhir éagsúla do gach tacar sonraí.
        * Seachas sin, más rud é datasets.xml Tá&lt;nTableThreads chlib (do EDDTable Seirbhís do Chustaiméirí) nó&lt;cliceáil grianghraf a mhéadú (le haghaidh EDDGrid web development) le luach × = 1, lasmuigh de&lt;sonraí a leagtar amach chlib, go bhfuil luach nThreads úsáidtear.
        * Seachas sin, úsáidtear snáithe 1, atá ina rogha sábháilte ó úsáideann sé an méid is lú cuimhne.
             
        
Chun an [bunaidh bunaidh ERDDAP™ a shuiteáil](https://coastwatch.pfeg.noaa.gov/erddap/index.html) , úsáidimid
        &lt;Níl an Tweet seo ar fáil 6 6)&lt;An bhfuil a fhios agat? (Tá sé ina freastalaí cumhachtach.) Iarratais deacrachtaí a ghlacadh anois 30% den am roimhe sin.
         
##### Monatóireacht a dhéanamh ar Úsáid Acmhainní{#monitor-resource-usage} 
Nuair a bhíonn tú ag turgnamh le suímh nThreads éagsúla (agus b'fhéidir a dhéanamh iarrataí sampla deacair ar do ERDDAP ) , is féidir leat monatóireacht a dhéanamh ar úsáid acmhainní do ríomhaire:
* Ar Macs, úsáid a bhaint Finder : Iarratais : Fóntais : Monatóireacht Gníomhaíochta
* Ar Linux, barr a úsáid
* Ar Windows 10, úsáid *Ctrl + Shift + Esc* Bainisteoir Tasc a oscailt
             
##### Rabhadh: Freagracht laghdaithe{#warning-decreased-responsiveness} 
In aonrú, ERDDAP™ Beidh a chomhlíonadh iarratas a tacar sonraí le nThreads níos airde a leagan níos tapúla ná má nThreads = 1. Ach cé go bhfuil an t-iarratas á phróiseáil, beidh iarratais eile ó úsáideoirí eile a bheith plódaithe beagán amach agus freagra níos moille a fháil. Chomh maith leis sin, nuair a ERDDAP™ freagra a thabhairt ar iarratas ar leith, acmhainní ríomhaireachta eile (e.g., rochtain tiomáint diosca, bandaleithead líonra) d'fhéadfadh a bheith teorannú, go háirithe le suímh nThreads níos airde. Dá bhrí sin le suímh nThreads níos airde, beidh an freagrúlacht córas foriomlán a bheith níos measa nuair a bhíonn iarrataí éagsúla á bpróiseáil - is féidir é seo a bheith an-annoying d'úsáideoirí&#33; Mar gheall ar seo: riamh a leagtar nThreads níos mó ná an líon cores LAP sa ríomhaire. nThreads = 1 Is é an suíomh is cothroime ó gach iarratas (i measc roinnt iarrataí comhuaineacha) beidh a fháil ar sciar comhionann na n-acmhainní ríomhaireachta. Ach an níos cumhachtaí an ríomhaire, an níos lú beidh sé seo ina fhadhb.
         
##### Rabhadh: Cuimhne níos airde Úsáid le haghaidh EDDGrid An tSraith Shinsearach{#warning-higher-memory-use-for-eddgrid-datasets} 
Tá úsáid Cuimhne agus iarratais próiseála comhréireach go díreach leis an suíomh nThreads. Tá riail réasúnta sábháilte ordóg: ní mór duit a shocrú [ ERDDAP 's suímh cuimhne](/docs/server-admin/deploy-install#memory) ar a laghad 2GB + (2GB \\ *) . Beidh roinnt iarrataí ar roinnt tacar sonraí gá cuimhne níos mó ná sin. Mar shampla, leagan nThreads = 3 le haghaidh aon EDDGrid Ciallaíonn tacar sonraí gur chóir go mbeadh an suíomh -Xmx ar a laghad -Xmx8000M. Má tá an suíomh cuimhne níos mó ná 3/4 an chuimhne fisiciúil ar an ríomhaire, laghdú ar an leagan nThreads ionas gur féidir leat a laghdú ar an suíomh cuimhne.

Is é an úsáid chuimhne na n-iarratas a phróiseáil snáitheanna chun tacair sonraí EDDTable beagnach i gcónaí níos ísle toisc go bhfuil na comhaid de ghnáth i bhfad níos lú. Mar sin féin, má tá tacar sonraí EDDTable áirithe ollmhór (e.g., ^1 GB) comhaid sonraí, ansin beidh na tuairimí thuas i bhfeidhm ar na tacair sonraí chomh maith.

Cibé an leagan nThreads, a choinneáil súil gar ar na staitisticí úsáide cuimhne ar do [ ERDDAP 's leathanach stádas](/docs/server-admin/additional-information#status-page) . Níor chóir duit teacht riamh gar a maxing amach an úsáid chuimhne i ERDDAP ; ar shlí eile beidh earráidí agus teipeanna tromchúiseacha.
        
##### Socraigh de ghnáth go 1{#temporarily-set-to-1} 
Má tá úsáid chuimhne reatha fiú beagán ard, ERDDAP™ a leagan nTrídí don iarratas seo go 1. Dá bhrí sin, ERDDAP™ conserves cuimhne nuair a bhíonn cuimhne scarce.
         
##### Deireadh a chur le Tuairisceáin{#diminishing-returns} 
Tá tuairisceáin a laghdú chun cur leis an suíomh nThreads: Beidh 2 snáitheanna ar bhealach níos fearr ná 1 (má neamhaird muid overclocking dinimiciúil) . Ach beidh 3 a bheith ach smután níos fearr ná 2. Agus beidh 4 a bheith ach imeall níos fearr ná 3.

I dtástáil amháin de cheist deacair le tacar sonraí EDDTable mór, an t-am freagartha ag baint úsáide as 1, 2, 3, 4, 5, 6 snáitheanna a bhí 38, 36, 20, 18, 13, 11 soicind. (Bainimid úsáid anois nTableThreads = 6 ar an bhfreastalaí.) 

nThreads = 2: Cé, tá go minic sochar suntasach a shonrú nThreads = 2 in ionad nThreads = 1, ní bheidh sé go minic a dhéanamh difríocht i bhfad san am clog ag teastáil chun freagra a thabhairt ar iarratas úsáideora ar leith. Is é an chúis: le nThreads = 1, Beidh LAP is nua-aimseartha go minic [dinimiciúil overclock](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)   (dlús a chur le) a mhéadú go sealadach an luas clog an LAP. Dá bhrí sin le nThreads = 1, Beidh an croí amháin a bheith ag obair go minic ag luas clog níos airde ná gach ceann den dá cores má úsáidtear tú nThreads = 2. Beag beann, is dóigh linn go fóill go bhfuil sé níos fearr a úsáid nThreads = 2 seachas nThreads = 1, ós rud é go mbeidh an suíomh torthaí níos fearr i réimse níos leithne de staideanna. Agus ar ndóigh, más rud é go bhfuil do ríomhaire cores LAP leordhóthanach, Ba chóir go leagan nThreads níos airde toradh torthaí níos fearr.

Mar a pléadh thuas, d'fhéadfadh an-ard nThreads suímh mar thoradh ar freagraí níos tapúla ar roinnt iarrataí, ach an riosca a laghdú foriomlán ERDDAP™ freagrúlacht agus úsáid ard chuimhne (mar atá luaite thuas) cé go bhfuil na hiarrataí á bpróiseáil ciallaíonn sé nach bhfuil sé i gcoitinne smaoineamh maith.
        
##### LAP LAP Seirbhís do Chustaiméirí{#cpu-cores} 
Níor chóir duit a leagtar riamh nThreads le roinnt níos mó ná an líon cores LAP i LAP an ríomhaire. Go bunúsach tá gach LAPs nua-aimseartha cores il (e.g., 2, 4, nó 8) . Roinnt ríomhairí fiú LAPs il (e.g., 2 LAPanna \\ * 4 cores / CPU = 8 cores LAP) . Chun a fháil amach cé mhéad LAPanna agus cores bhfuil ríomhaire:

* Ar Macs, úsáid *eochair Roghnach* : Apple Roghchlár : Eolas Córas
* Ar Linux, bain úsáid as cat / proc / Cpuinfo
* Ar Windows 10, úsáid *Ctrl + Shift + Esc* a oscailt Bainisteoir Tasc: Feidhmíocht (Léiríonn próiseálaithe loighciúil líon iomlán na cores LAP) 

Sea, deir an chuid is mó de na próiseálaithe seo go dtacaíonn siad le snáitheanna 2 in aghaidh an chroí (via via via via [hyper-threading](https://en.wikipedia.org/wiki/Hyper-threading) ) , ach an 2 snáitheanna a roinnt acmhainní ríomhaireachta, mar sin ní bheidh tú a fheiceáil faoi dhó an tréchur ar LAP faoi ualach trom. Mar shampla, is féidir le ríomhaire le LAP amháin le 4 cores éileamh chun tacú le suas le 8 snáitheanna, ach ní ba chóir duit níos mó ná nThreads = 4 sa mhéid is go ERDDAP . Cuimhnigh go:

* An nThreads leagan i ERDDAP™ is in aghaidh na hiarrata. ERDDAP™ go minic Láimhseálann iarrataí éagsúla ag an am céanna.
*    ERDDAP™ a dhéanann rudaí seachas iarratais próiseas, m.sh., reload tacar sonraí.
* Nuair a bheidh ERDDAP™ freagra a thabhairt ar iarratas ar leith, acmhainní ríomhaireachta eile (e.g., rochtain tiomáint diosca, bandaleithead líonra) a bheith teorannú. An níos airde a leagtar tú nThreads, an níos mó seans go mbeidh na hacmhainní eile a maxed amach agus beidh mall síos ERDDAP 's freagrúlacht ginearálta.
* Déanann an córas oibriúcháin rudaí seachas reáchtáil ERDDAP .

Mar sin, is fearr gan a shocrú ar an nThreads leagan síos go dtí níos mó ná an líon cores i LAP an ríomhaire.
         
##### Do Bealtaine Míleáiste Vary (YMMV)  {#your-mileage-may-vary-ymmv} 
Beidh na torthaí na socruithe nThreads éagsúla éagsúil go mór le haghaidh iarrataí éagsúla ar tacar sonraí éagsúla ar chórais éagsúla. Más mian leat i ndáiríre a fhios ag an éifeacht na socruithe nThreads éagsúla, tástálacha réalaíoch reáchtáil.
         
##### Cén fáth nThreads in aghaidh na hiarrata?{#why-nthreads-per-request} 
Is féidir liom a chloisteáil roinnt de tú ag smaoineamh "Cén fáth go bhfuil nThreads in aghaidh an iarratais? Má bhí mé ag códú seo, ba mhaith liom a úsáid amháin buan oibrí linn snámha snáithe agus scuaine teachtaireachtaí le haghaidh feidhmíocht níos fearr. " Is é an fhadhb a bhaineann le linn snámha snáithe oibrí amháin agus scuaine teachtaireachtaí a úsáid ná go gcuirfeadh iarraidh dheacair amháin an scuaine le tascanna moille iomadúla. Go mbeadh bloc éifeachtach ERDDAP™ ó obair ag tosú fiú ar chúraimí a bhaineann le hiarrataí eile go dtí go raibh an t-iarratas tosaigh (go bunúsach) críochnaithe. Dá bhrí sin, bheadh fiú iarrataí simplí ina dhiaidh sin freagra Super go mall. ERDDAP 's úsáid nThreads in aghaidh na hiarrata mar thoradh ar úsáid i bhfad níos cothroime na n-acmhainní ríomhaireachta.
         
##### nThreads vs. Ríomhairí Oibre Il{#nthreads-vs-multiple-worker-computers} 
Ar an drochuair, ERDDAP 's nThreads Beidh córas a bheith chomh héifeachtach agus a parallelizing fíor trí ríomhairí oibrí il, le gach ag obair ar shmután sonraí, ar an mbealach go Hadoop nó Apache Spark a úsáidtear de ghnáth. Nuair a bhíonn an tasc parallelized go fírinneach / dháileadh ar ríomhairí il, Is féidir le gach ríomhaire a úsáid ar fad a chuid acmhainní ar a chuid den tasc. Le ERDDAP 's nThreads córas, tá gach ceann de na snáitheanna iomaíocht do bandaleithead an ríomhaire céanna, thiomáineann diosca, cuimhne, etc. Ar an drochuair, an chuid is mó de dúinn nach bhfuil na hacmhainní nó cistí a chur ar bun nó fiú cíos (ar Amazon Seirbhísí Gréasáin (Amharc ar gach eolas) nó Google Cloud Ardán (GCC) ) greillí ollmhór ríomhairí. Chomh maith leis sin, murab ionann agus bunachar sonraí gaolmhar a cheadaítear a thabhairt ar ais na sraitheanna toradh in aon ordú, ERDDAP™ a dhéanann gealltanas a thabhairt ar ais na sraitheanna toradh in ord comhsheasmhach. Déanann an srian ERDDAP 's nThreads cur chun feidhme níos lú éifeachtach. Ach ERDDAP 's nThreads úsáideach i go leor cásanna.

Mar sin féin, tá bealaí a dhéanamh ERDDAP™ scála a láimhseáil líon mór na n-iarratas go tapa trí bhunú [greille/cnuasú/feabhsú ERDDAP s s](/docs/server-admin/scaling) .
         
#### &lt;palettes &amp; gt;{#palettes} 
* Ag tosú le ERDDAP™ leagan 2.12, datasets.xml Is féidir a chur san áireamh&lt;palettes × chlib (laistigh de&lt;erddapDatasets amach) a overrides an&lt;palettes × luach chlib ó teachtaireachtaí.xml (nó reverts leis an luach message.xml má tá an chlib i datasets.xml Is maith liom é) . Ligeann sé seo duit an liosta pailéad atá ar fáil a athrú agus ERDDAP™ ag rith. Ligeann sé freisin a dhéanann tú athrú agus tá sé fós nuair a shuiteáil tú leagan nua de ERDDAP .
WARNING: Na pailéid atá liostaithe i datasets.xml ní mór a bheith ina superset de na pailéad atá liostaithe i teachtaireachtaí.xml; ar shlí eile ERDDAP™ caith eisceacht agus próiseáil stad datasets.xml . Cinntíonn sé seo go léir ERDDAP™ suiteálacha ar a laghad tacú leis na palettes croí céanna.
RABHADH: ERDDAP™ seiceálacha go bhfuil na comhaid palettes a shonraítear i teachtaireachtaí.xml ann i ndáiríre, ach ní chuireann sé seiceáil ar na comhaid pailéad atá liostaithe i datasets.xml . Tá sé do fhreagracht a chinntiú go bhfuil na comhaid i láthair.
    
Chomh maith leis sin ag tosú le ERDDAP™ leagan 2.12, má dhéanann tú subdirectory cptfiles sa ERDDAP™ file directory, ERDDAP™ cóip go léir na comhaid \\ *.cpt san eolaire isteach \\[ taiseachas aeir: fliuch \\] / webapps / erddap / WEB-INF / comhaid eolaire gach uair ERDDAP™ Tosaíonn suas. Dá bhrí sin, má chuir tú comhaid cpt saincheaptha san eolaire, beidh na comhaid a úsáid ag ERDDAP™ , gan aon iarracht bhreise ar do chuid, fiú nuair a shuiteáil tú leagan nua de ERDDAP .
    
WARNING: Má chuireann tú pailéid saincheaptha le do ERDDAP™ agus tá tú EDDGrid Ó Erddap agus / nó EDDTableFromErddap tacar sonraí i do ERDDAP™ , ansin beidh úsáideoirí a fheiceáil do roghanna pailéad saincheaptha ar an ERDDAP™ Déan leathanaigh ghréasáin Graph, ach má tá an t-úsáideoir iarracht iad a úsáid, beidh siad a fháil graf leis an réamhshocraithe (de ghnáth Rainbow) pailéad. Tá sé seo toisc go bhfuil an íomhá a rinne an iargúlta ERDDAP™ nach bhfuil an pailéad saincheaptha. Is iad na réitigh amháin anois ná ríomhphost a chur chuig an iargúlta ERDDAP™ riarthóir a chur ar do pailéid saincheaptha a / a ERDDAP nó ríomhphost Chris. John ag noa.gov a iarraidh go gcuirfí na pailéid leis an gcaighdeán ERDDAP™ dáileadh.
    
#### &lt;onChange &amp; &amp; rsquo; s;{#onchange} 
* [EN] ** &lt;ar an margadh ** ] (Tuilleadh eolais) is tag OPTIONAL laistigh de&lt;dataset × chlib datasets.xml a shonraíonn gníomh a dhéanfar nuair a chruthaítear an tacar sonraí seo (nuair a bhíonn ERDDAP™ Tá restarted) agus aon uair a athraíonn an tacar sonraí ar bhealach ar bith.
    * Faoi láthair, le haghaidh EDDGrid fo-aicmí, aon athrú ar meiteashonraí nó ar ais athróg (mar shampla, pointe ama nua le haghaidh sonraí in aice-réad-ama) a mheastar a athrú, ach nach bhfuil athlódáil an tacar sonraí a mheas athrú (leis féin) .
    * Faoi láthair, i gcás fo-aicmí EDDTable, meastar go n-athraíonn aon athlódáil ar an tacar sonraí.
    * Faoi láthair, ní cheadaítear ach dhá chineál gníomhaíochtaí:
        * " " "http://"nó "https://"-- Má thosaíonn an gníomh le "http://"nó "https://", ERDDAP™ a sheoladh chuig HTTP GET a iarraidh ar an URL sonraithe. Déanfar neamhaird ar an bhfreagra. Mar shampla, d'fhéadfadh an URL insint roinnt seirbhíse gréasáin eile rud éigin a dhéanamh.
            * Má tá an URL cuid cheist (tar éis an "?") , MUST sé a bheith cheana féin [faoin gcéad ionchódú](https://en.wikipedia.org/wiki/Percent-encoding) . Ní mór duit a ionchódú carachtair speisialta sna srianta (seachas an chéad 'Tógáil' agus an príomh '=' i srianta) i bhfoirm %H, i gcás ina bhfuil HH an luach heicseagach 2 dhigit an carachtar. De ghnáth, ní mór duit ach roinnt de na carachtair poncaíochta a thiontú: % isteach i %25, &amp; i %26, " isteach i %22,&lt;i %3C, = isteach i %3D, × i %3E, + isteach i %2B, | i %7C, \\[ i %5B, \\] isteach %5D, spás isteach% 20, agus gach carachtar a thiontú os cionn #127 isteach ina bhfoirm UTF-8 agus ansin ionchódú faoin gcéad gach beart de na foirm UTF-8 isteach i bhformáid%H (iarraidh ar Ríomhchláraitheoir le haghaidh cabhrach) .
Mar shampla, &amp; stationID × "41004"
Tagann agus stationID %3E =% 2241004%22
Tá ionchódú réasúnta ag teastáil go ginearálta nuair a rochtain tú ERDDAP trí bhogearraí seachas brabhsálaí. Brabhsálaithe láimhseáil de ghnáth ionchódú faoin gcéad ar do shon.
I gcásanna áirithe, ní mór duit a ionchódú faoin gcéad gach carachtar seachas A-Za-z0-9\\_-&#33;. '' () \\*, ach nach bhfuil fós ionchódú an tosaigh 'agus' nó an príomh- '=' i srianta.
teangacha Clárú Tá uirlisí a dhéanamh seo (mar shampla, féach Java 's [ java.net.URLEncoder ](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html) agus Java Script's [encodeURIComponent()] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) ) agus tá
                 [láithreáin ghréasáin go ionchódú faoin gcéad / dhíchódú ar do shon](https://www.url-encode-decode.com/) .
            * Ós rud é datasets.xml Is comhad XML, MUST tú freisin &amp;-ionchódú GACH 'agus', '&lt;', agus '3' sa URL mar 'T &amp;', '&lt;', agus ' &amp; rsquo;' tar éis ionchódú faoin gcéad.
            * Sampla: Chun URL a d'fhéadfá a chlóscríobh isteach i bhrabhsálaí mar:
                https://www.company.com/webService?department=R%26D&param2=value2  
Ba chóir duit a shonrú&lt;arChange bhéil chlib via (ar líne amháin) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * mailto: -- Má thosaíonn an gníomh le "mailto:", ERDDAP™ seol ríomhphost chuig an seoladh ríomhphoist ina dhiaidh sin ag léiriú go bhfuil an tacar sonraí cothrom le dáta / athraithe.
Mar shampla:&lt;Seol ríomhphost chuig: john.smith@company.com&lt;Baile Átha Troim Má tá cúis mhaith agat le ERDDAP™ chun tacú le cineál éigin eile gníomhaíochta, seol ríomhphost chugainn ag cur síos ar cad ba mhaith leat.
    * Tá an chlib seo OPTIONAL. Is féidir a bheith ann mar go leor de na clibeanna mar is mian leat. Bain úsáid as ceann de na clibeanna do gach gníomh a bheidh le déanamh.
    * Níl an Tweet seo ar fáil ERDDAP 's r-phost / córas síntiús URL, ach nach bhfuil na gníomhartha a stóráil go leanúnach (i.e., níl siad stóráilte ach i réad EDD) .
    * A bhaint síntiús, ach bain an&lt;cliceáil grianghraf a mhéadú Déanfar an t-athrú a thabhairt faoi deara an chéad uair eile déantar an tacar sonraí a athlódáil.
         
#### &lt;athluchtú GachNMinutes &amp; gt;{#reloadeverynminutes} 
* [EN] ** &lt;reload Gach Neamhghnách ** ] (#reloadeverynminutes) is tag OPTIONAL laistigh de&lt;dataset × chlib datasets.xml de beagnach gach cineál tacar sonraí a shonraíonn cé chomh minic ba chóir an tacar sonraí a athlódáil. Mar shampla,
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * Go ginearálta, tacaíonn sonraí a athraíonn go minic (mar shampla, a fháil comhaid sonraí nua) Ba chóir iad a athlódáil go minic, mar shampla, gach 60 nóiméad.
    * Ba chóir sonraí a athraíonn go minic a athlódáil go minic, mar shampla, gach 1440 nóiméad (gach lá) nó 10080 nóiméad (seachtainiúil) .
    * Tá an chlib OPTIONAL, ach molta. Is é an réamhshocraithe 10080.
    * Is sampla é:&lt;Déan teagmháil linn&lt;/ Athlódáil Gach Neamhghnách
    * Nuair a bhíonn tacar sonraí athluchtaithe, gach comhad sa *Treoir do Thuismitheoirí* Seirbhís do Chustaiméirí * datasetID * eolaire a scriosadh.
    * Is cuma cad é seo atá leagtha chun, Ní bheidh tacar sonraí a luchtú níos minice ná&lt;riachtanais uisce: measartha (réamhshocraithe = 15) , mar a shonraítear in [crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml) . Mar sin, más mian leat tacair sonraí a athluchtú go minic, ní mór duit a shocrú araon reloadEveryNMinutes agus loadDatasets MinMinutes le luachanna beaga.
    * Ná leagtar reloadEveryNMinutes leis an luach céanna le loadDatasets MinMinutes, toisc go bhfuil an t-am caite dócha a bheith (mar shampla) 14:58 nó 15:02, mar sin beidh an tacar sonraí a athluchtú ach amháin i thart ar leath de na athluchtuithe móra. Ina áit sin, úsáid níos lú (mar shampla, 10) nó níos mó (mar shampla, 20) reload Luach GachNMinutes.
    * Beag beann ar reloadEveryNMinutes, is féidir leat a insint de láimh ERDDAP™ a athlódáil tacar sonraí ar leith a luaithe is féidir trí [web development](/docs/server-admin/additional-information#flag) .
    * Do Ríomhairí Aisteacha -- ERDDAP™ , déantar athlódáil ar na tacair sonraí go léir a láimhseáil ag dhá shnáithe aon chríche. Cuireann snáithe amháin athlódáil saorga má fhaigheann sé comhad bratach nó athlódáil mór (a dhéanann seiceáil ar na tacair sonraí go léir a fheiceáil más gá iad a athlódáil) . Déanann an snáithe eile athlódáil iarbhír na sonraí amháin ag an am. Oibríonn na snáitheanna seo sa chúlra a chinntíonn go gcoimeádtar na tacair sonraí go léir cothrom le dáta. Ullmhaíonn an snáithe a dhéanann na hathluchtuithe i ndáiríre leagan nua de thacar sonraí ansin babhtáil sé i bhfeidhm (go bunúsach in ionad an leagan d'aois atomically) . Mar sin, is féidir go dtarlaíonn an t-ord seo a leanas na n-imeachtaí (tá sé ina rud maith) :
        
        1.   ERDDAP™ Tosaíonn athlódáil tacar sonraí (ag déanamh leagan nua) sa chúlra.
        2. Déanann an t-úsáideoir 'A' iarraidh ar an tacar sonraí. ERDDAP™ Úsáideann an leagan reatha den tacar sonraí a chruthú ar an freagra. (Is é sin go maith. Ní raibh aon mhoill don úsáideoir, agus níor chóir go mbeadh an leagan reatha den tacar sonraí an-stáirse.) 
        3.   ERDDAP™ bailchríocha a chruthú ar an leagan nua athluchtaithe de na tacar sonraí agus babhtálacha go leagan nua i dtáirgeadh. Gach iarratas nua ina dhiaidh sin a láimhseáil ag an leagan nua den tacar sonraí. Chun comhsheasmhacht, Tá iarratas úsáideora A á líonadh go fóill ag an leagan bunaidh.
        4. Déanann an t-úsáideoir 'B' iarraidh ar an tacar sonraí agus ERDDAP™ Úsáideann an leagan nua den tacar sonraí a chruthú ar an freagra.
        5. Faoi dheireadh úsáideora Tá iarratais A agus B úsáideora críochnaithe (b'fhéidir b'fhéidir Críochnaíonn A ar dtús, b'fhéidir bailchríocha B chéad) .
        
Is féidir liom éisteacht le duine éigin ag rá, "Just dhá thredds&#33; Bhí&#33; Sin bacach&#33; Ba chóir dó a chur ar bun ionas go n-úsáideann athlódáil tacar sonraí mar snáitheanna go leor mar atá ag teastáil, mar sin faigheann sé go léir a dhéanamh níos tapúla agus le beagán nó gan lag." Sea agus níl. Is é an fhadhb go luchtú níos mó ná tacar sonraí amháin ag an am a chruthaíonn roinnt fadhbanna crua nua. Ní mór iad go léir a réiteach nó déileáil leo. Oibríonn an córas reatha go maith agus tá fadhbanna inbhainistithe (mar shampla, acmhainneacht le haghaidh lag sula dtugtar bratach faoi deara) . (Más gá duit cabhrú leo a bhainistiú, féach ar ár [alt ar thacaíocht bhreise a fháil](/docs/intro#support) .) An gaol [thabhairt cothrom le dáta Ag obair](#updateeverynmillis) . Oibríonn córas laistigh snáitheanna freagartha, ionas gur féidir é agus mar thoradh air sin tá tacair ilshonraí á nuashonrú (nach bhfuil an athlódáil iomlán) ag an am céanna.
##### vs réamhghníomhach.{#proactive-vs-reactive} 
 ERDDAP 'Tá córas athluchtaithe réamhghníomhach - athluchtaítear tacair sonraí go luath tar éis a n-athlódáil Tá gach AmNMinutes suas (i.e., bíonn siad "stale", ach ní bhíonn siad an-stáirse) , cibé an bhfuil an tacar sonraí ag fáil iarratais ó úsáideoirí nó nach bhfuil. Mar sin, ERDDAP™ Tá tacair sonraí i gcónaí cothrom le dáta agus réidh le húsáid. Tá sé seo i gcodarsnacht le cur chuige imoibríoch THREDDS ': Tá iarratas úsáideora cad a insíonn THREDDS a sheiceáil má tá tacar sonraí stale (d'fhéadfadh sé a bheith an-stáirse) . Má tá sé stale, a dhéanann THREDDS fanacht an t-úsáideoir (go minic ar feadh cúpla nóiméad) cé go bhfuil an tacar sonraí athluchtaithe.
        
#### &lt;thabhairt cothrom le dáta Cóipeáil nasc leis an tweet Leabaigh an Tweet{#updateeverynmillis} 
* [EN] ** &lt;updateEveryNMillis × ** ] (Tuilleadh roghanna...) is tag OPTIONAL laistigh de&lt;dataset × chlib datasets.xml de roinnt cineálacha tacar sonraí a chabhraíonn ERDDAP™ obair le tacair sonraí a athrú go minic (chomh minic agus is garbh gach dara) . Murab ionann agus ERDDAP 's rialta, réamhghníomhach, [&lt;reload Gach Neamhghnách (#reloadeverynminutes) córas le haghaidh athlódáil go hiomlán gach tacar sonraí, tá an córas breise OPTIONAL athghníomhach (spreagtha ag iarraidh úsáideora) agus níos tapúla toisc go bhfuil sé incriminteach (ach cothrom le dáta an fhaisnéis nach mór a thabhairt cothrom le dáta) . Mar shampla, má tá iarraidh ar EDDGrid ÓDap tacar sonraí a tharlaíonn níos mó ná an líon sonraithe milliseconds ó an nuashonrú deireanach, ERDDAP™ a fheiceáil má tá aon luachanna nua don leftmost (ar dtús, de ghnáth "time" ) gné agus, más amhlaidh, ach a íoslódáil na luachanna nua roimh láimhseáil an t-úsáideoir iarratas. Tá an córas seo an-mhaith ag coinneáil sonraí atá ag athrú go tapa cothrom le dáta le héilimh íosta ar an bhfoinse sonraí, ach ar an gcostas a bhaineann le beagán moilliú síos ar phróiseáil roinnt iarrataí úsáideora.
    * Chun an córas seo a úsáid, cuir (mar shampla) :
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
ceart tar éis an&lt;athluchtú GachNMinutes... tag don tacar sonraí i datasets.xml . Is féidir leis an líon milliseconds a shonróidh tú a bheith chomh beag le 1 (chun a áirithiú go bhfuil an tacar sonraí i gcónaí cothrom le dáta) . Luach de 0 (taiseachas aeir: fliuch) nó casadh uimhir dhiúltach as an gcóras.
    * Mar gheall ar a nádúr incriminteach, ba chóir nuashonruithe chríochnú go han-tapa, mar sin níor chóir d'úsáideoirí fanacht i bhfad.
    * Má thagann an dara iarraidh sonraí sula bhfuil an nuashonrú roimhe críochnaithe, ní bheidh an dara hiarraidh tús eile cothrom le dáta.
    * I rith na doiciméid, déanfaimid iarracht an focal "ualach" a úsáid le haghaidh athluchtú rialta, tacar sonraí iomlán, agus "uasdátú" le haghaidh na nuashonruithe incrimintigh nua, páirteach.
    * Chun críocha tástála, tá roinnt diagnóisic clóite a log.txt más rud é [&lt;Logáil isteach » (Roghnaigh gach rud) i datasets.xml tá sé leagtha chun "uile".
    * Má úsáideann tú nuashonruithe incriminteach agus go háirithe má tá an leftmost (chéad chéad uair) , mar shampla, am, tá ais mór, b'fhéidir gur mhaith leat a shocrú&lt;reloadEveryNMinutes ú le líon níos mó (1440?) , ionas go ndéanann nuashonruithe an chuid is mó den obair chun an tacar sonraí a choinneáil cothrom le dáta, agus déantar athluchtuithe iomlána go minic.
    * Tabhair faoi deara: an nuashonrú nua córas meiteashonraí (mar shampla, am actual\\_range , am\\_coverage\\_end,...) ach nach spreagadh arChange (ríomhphost nó URL dteagmháil) nó a athrú RSS beatha (b'fhéidir ba chóir é...) .
    * I gcás gach tacar sonraí a úsáideann fo-aicmí [ EDDGrid Seirbhís do Chustaiméirí](#eddgridfromfiles) agus [EDDTableFromFiles](#eddtablefromfiles) :
        *    **RABHADH:** nuair a chuireann tú comhad sonraí nua le tacar sonraí trí chóipeáil isteach ar an eolaire go ERDDAP™ Breathnaíonn ar, tá baol ann go ERDDAP™ beidh faoi deara an comhad scríofa go páirteach; iarracht a léamh, ach theipeann mar go bhfuil an comhad neamhiomlán; dhearbhú an comhad a bheith ina "bad" comhad agus é a bhaint (go sealadach) ó na tacar sonraí.
Chun seo a sheachaint, táimid **ATHBHREITHNIÚ STRONG** go chóipeáil tú comhad nua isteach san eolaire le ainm sealadach (mar shampla, 20150226 .nc Teanntáin) nach mheaitseáil leis an comhad datasets Féach ar Léarscáileanna (\\* .nc ) , ansin athainmniú an comhad chuig an ainm ceart (mar shampla, 20150226 .nc ) . Má úsáideann tú an cur chuige seo, ERDDAP™ beidh neamhaird a dhéanamh ar an comhad sealadach agus gan ach an comhad i gceart ainmnithe nuair a bheidh sé iomlán agus réidh le húsáid.
        * Má athraíonn tú na comhaid sonraí atá ann cheana i bhfeidhm (mar shampla, pointe sonraí nua a chur leis) ,&lt;Beidh updateEveryNMillis ^ obair go maith má tá na hathruithe le feiceáil go adamhach (i toirt) agus tá an comhad i gcónaí comhad bailí. Mar shampla, is féidir leis an leabharlann netcdf-java breisithe ar an gné neamhtheoranta de "aicme" .nc v3 comhad a dhéanamh atomically.
            &lt;Beidh updateEveryNMillis ^ obair go dona má tá an comhad neamhbhailí agus na hathruithe á ndéanamh.
        *   &lt;Beidh updateEveryNMillis ^ obair go maith le haghaidh tacar sonraí nuair a athrú ar cheann nó cúpla comhad i méid gearr ama.
        *   &lt;Beidh updateEveryNMillis ^ obair go dona le haghaidh tacar sonraí nuair a athrú líon mór de chomhaid i méid gearr ama (ach amháin má tá na hathruithe le feiceáil adamhach) . Maidir leis na tacair sonraí seo, is fearr gan úsáid a bhaint as&lt;updateEveryNMillis ú agus a shocrú [bratach bratach](/docs/server-admin/additional-information#set-dataset-flag) a insint ERDDAP™ a athlódáil an tacar sonraí.
        *   &lt;updateEveryNMillis uaire gan an fhaisnéis a bhaineann leis an [&lt; subsetVariables ú (#subsetvariables) . De ghnáth, ní fadhb é seo, mar gheall ar an subsetVariables Tá eolas faoi rudaí nach bhfuil athrú go minic (mar shampla, liosta na n-ainmneacha stáisiúin, domhanleithead, agus domhanfhad) . Má tá an subsetVariables data recovery (mar shampla, nuair a chuirtear stáisiún nua leis an tacar sonraí) , ansin déan teagmháil leis an [URL bratach](/docs/server-admin/additional-information#set-dataset-flag) don tacar sonraí a insint ERDDAP™ a athlódáil an tacar sonraí. Seachas sin, ERDDAP™ Ní bheidh faoi deara an fo-thacar nua Faisnéis éagsúil go dtí an chéad uair eile déantar an tacar sonraí a athlódáil (&lt;reloadEveryNMinutes .).
        * Is é ár moladh cineálach a úsáid:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * TROUBLE? Ar ríomhairí Linux, má tá tú ag baint úsáide as&lt;updateEveryNMillis × le EDDGrid FromFiles nó EDDTableFromFiles ranganna, is féidir leat a fheiceáil fadhb i gcás ina mainneoidh tacar sonraí a luchtú (ó am go chéile nó go comhsheasmhach) leis an teachtaireacht earráide: "IOException: Úsáideoir teorainn cásanna inotify shroich nó comhaid an iomarca oscailte". D'fhéadfadh an chúis a bheith ina fabht i Java a cúiseanna cásanna inotify nach bhfuil truflais a bailíodh. Tá an fhadhb seo a sheachaint i ERDDAP™ v1.66 agus níos airde. Mar sin, is é an réiteach is fearr a athrú ar an leagan is déanaí de ERDDAP .
Más rud é nach bhfuil a réiteach ar an fhadhb (is é sin, má tá tú i ndáiríre líon mór de datasets ag baint úsáide as&lt;updateEveryNMillis ^), is féidir leat a shocrú an fhadhb seo trí ghlaoch:
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
Nó, úsáid uimhreacha níos airde má leanann an fhadhb. Is é an réamhshocraithe le haghaidh uaireadóirí 8192. Is é an réamhshocraithe le haghaidh cásanna 128.
    * Is féidir leat a chur&lt;thabhairt cothrom le dátaMaxEvents × 10&lt;/ updateMaxEvents × i datasets.xml   (i leis na suímh eile in aice leis an barr) a athrú ar an líon uasta na n-athruithe comhad (réamhshocraithe = 10) a dhéanfaidh an córas updateEveryNMillis a phróiseáil. D'fhéadfadh líon níos mó a bheith úsáideach le haghaidh tacar sonraí i gcás ina bhfuil sé an-tábhachtach go gcoimeádtar iad i gcónaí cothrom le dáta. Féach an [updateMaxEvents documents](#updatemaxevents) .
    * Do Ríomhchláraitheoirí Aisteach - na nuashonruithe incriminteach, murab ionann agus ERDDAP 's iomlán [Athluchtú GachNMinutes](#reloadeverynminutes) córas, a tharlaíonn laistigh snáitheanna iarratas úsáideora. Mar sin, is féidir aon líon tacar sonraí a nuashonrú ag an am céanna. Tá cód (agus glas) a chinntiú nach bhfuil ach snáithe amháin ag obair ar nuashonrú d'aon tacar sonraí ar leith ag aon am ar leith. Ag ligean nuashonruithe comhuaineach il a bhí éasca; ag ligean go mbeadh athluchtuithe iomlána comhuaineach il a bheith níos deacra.
         
#### &lt;foinseCanConstrainStringEQNE &amp; rsquo; s;{#sourcecanconstrainstringeqne} 
* [EN] ** &lt;foinseCanConstrainStringEQNE × ** ] (cliceáil grianghraf a mhéadú) is tag OPTIONAL laistigh de EDDTable&lt;dataset × chlib datasets.xml a shonraíonn más féidir leis an fhoinse srian athróg Curtain leis an = agus &#33;= oibreoirí.
    * I gcás EDDTableFromDapSequence, baineann sé seo leis an t-ord seachtrach Athróg String amháin. Glactar leis nach féidir leis an bhfoinse láimhseáil aon srianta ar athróga ord istigh.
    * Tá an chlib seo OPTIONAL. Tá luachanna bailí fíor (taiseachas aeir: fliuch) agus bréagach.
    * Do EDDTableFromDapSequence OPeNDAP freastalaithe DRDS, ba chóir é seo a shocrú chun fíor (taiseachas aeir: fliuch) .
    * Do EDDTableFromDapSequence freastalaithe Dapper, ba chóir é seo a shocrú go bréagach.
    * Is sampla é:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;foinseCanConstrainStringGTLT &amp; &amp; rsquo; s;{#sourcecanconstrainstringgtlt} 
* [EN] ** &lt;foinseCanConstrainStringGTLT... ** ] (cliceáil grianghraf a mhéadú) is tag OPTIONAL laistigh de EDDTable&lt;dataset × chlib a shonraíonn más féidir leis an fhoinse srian athróg Curtain leis an&lt;,&lt;=, ×, agus ^= oibreoirí.
    * I gcás EDDTableFromDapSequence, baineann sé seo leis an t-ord seachtrach Athróg String amháin. Glactar leis nach féidir leis an bhfoinse láimhseáil aon srianta ar athróga ord istigh.
    * Tá luachanna bailí fíor (taiseachas aeir: fliuch) agus bréagach.
    * Tá an chlib seo OPTIONAL. Tá an réamhshocraithe fíor.
    * Do EDDTableFromDapSequence OPeNDAP freastalaithe DRDS, ba chóir é seo a shocrú chun fíor (taiseachas aeir: fliuch) .
    * Do EDDTableFromDapSequence freastalaithe Dapper, ba chóir é seo a shocrú go bréagach.
    * Is sampla é:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;foinseCanConstrainStringRegex &amp; &amp; rsquo; s;{#sourcecanconstrainstringregex} 
* [EN] ** &lt;foinseCanConstrainStringRegex... ** ] (#sourcecanconstrainstringregex) is tag OPTIONAL laistigh de EDDTable&lt;dataset × chlib a shonraíonn más féidir leis an fhoinse srian athróg Curtain ag abairtí rialta, agus má tá, cad é an t-oibreoir.
    * Tá luachanna bailí "= ~" (an DAP caighdeán caighdeánach) , "~=" (tacaíocht dhearmad ag go leor DAP freastalaithe) , nó "" (ag léiriú nach bhfuil an fhoinse tacú le habairtí rialta) .
    * Tá an chlib seo OPTIONAL. Is é an mhainneachtain "".
    * Do EDDTableFromDapSequence OPeNDAP freastalaithe DRDS, ba chóir é seo a shocrú chun "" (taiseachas aeir: fliuch) .
    * Do EDDTableFromDapSequence freastalaithe Dapper, ba chóir é seo a shocrú chun "" (taiseachas aeir: fliuch) .
    * Is sampla é:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;foinseCanDoDistinct &amp; gt;{#sourcecandodistinct} 
* [EN] ** &lt;cliceáil grianghraf a mhéadú ** ] (#sourcecandospecific) Is tag OPTIONAL laistigh de EDDTableFromDatabase&lt;dataset × chlib a shonraíonn más rud é gur chóir an bunachar sonraí foinse a láimhseáil &amp; ar leith () srianta i gceisteanna úsáideora.
    * Tá an chlib seo OPTIONAL. Tá luachanna bailí aon ( ERDDAP™ Láimhseálann ar leith; an réamhshocraithe) taiseachas aeir: fliuch (Láimhseálann an fhoinse ar leith agus ERDDAP™ Láimhseálann sé arís) , agus tá (Láimhseálann an fhoinse ar leith) .
    * Má tá tú ag baint úsáide as aon agus ERDDAP™ ag rith amach as cuimhne nuair a láimhseáil ar leith, úsáid yes.
    * Má tá tú ag baint úsáide as yes agus an mbunachar sonraí foinse Láimhseálann ar leith ró-mhall, úsáid a bhaint as aon.
    * go páirteach tugann tú an ceann is measa den dá: tá sé mall toisc go bhfuil an láimhseáil bunachar sonraí ar leith mall agus d'fhéadfadh sé a reáchtáil amach as an gcuimhne i ERDDAP .
    * Bunachair shonraí a léirmhíniú DISTINCT mar iarratas le haghaidh sraitheanna díreach ar leith de thorthaí, ach ERDDAP™ é a léirmhíniú mar iarratas ar liosta sórtáilte de shraitheanna uathúla torthaí. Má shocraíonn tú seo go páirteach nó yes, ERDDAP™ go huathoibríoch insíonn an bunachar sonraí a shórtáil na torthaí.
    * Difríocht beag amháin sna torthaí:
Gan a bheith ráite | taiseachas aeir: fliuch ERDDAP™ sórtáil "" ag tús na dtorthaí (roimh neamh-" teaghráin) .
Le yes, d'fhéadfadh an bunachar sonraí (An tSeirbhís Dóiteáin) saghas "" ag deireadh na dtorthaí (tar éis neamh-" teaghráin) .
Beidh mé buille faoi thuairim go mbeidh sé seo difear freisin ar an sórtáil focail gearr i gcoinne focail níos faide a thosaíonn leis an focal gearr. Mar shampla, ERDDAP™ sórtáil "Simon" roimh "Simons".
    * Is sampla é:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;foinseCanOrderBy &amp; gt;{#sourcecanorderby} 
* [EN] ** &lt;foinse cumhachta cliceáil grianghraf a mhéadú ** ] (#sourcecanorderby) Is tag OPTIONAL laistigh de EDDTableFromDatabase&lt;dataset × chlib a shonraíonn má ba chóir an bunachar sonraí foinse láimhseáil &amp; orderBy  (...) srianta i gceisteanna úsáideora.
    * Tá an chlib seo OPTIONAL. Tá luachanna bailí aon ( ERDDAP™ soilse loingseoireachta E orderBy  (...) ; an réamhshocraithe) taiseachas aeir: fliuch (na Láimhseálann foinse orderBy agus ERDDAP™ Láimhseálann sé arís) , agus tá (na Láimhseálann foinse orderBy  (...) ) .
    * Má tá tú ag baint úsáide as aon agus ERDDAP™ ag rith amach as cuimhne nuair a láimhseáil orderBy  (...) , úsáid yes.
    * Má tá tú ag baint úsáide as yes agus an mbunachar sonraí foinse Láimhseálann orderBy  (...) ró-mhall, úsáid aon.
    * go páirteach tugann tú an ceann is measa den dá: tá sé mall mar gheall ar an láimhseáil bunachar sonraí orderBy  (...) Tá mall agus d'fhéadfadh sé a reáchtáil amach as cuimhne i ERDDAP .
    * Difríocht beag amháin sna torthaí:
Gan a bheith ráite | taiseachas aeir: fliuch ERDDAP™ sórtáil "" ag tús na dtorthaí (roimh neamh-" teaghráin) .
Le yes, d'fhéadfadh an bunachar sonraí (An tSeirbhís Dóiteáin) saghas "" ag deireadh na dtorthaí (tar éis neamh-" teaghráin) .
D'fhéadfadh sé seo difear a dhéanamh freisin ar an sórtáil focail gearr i gcoinne focail níos faide a thosaíonn leis an focal gearr. Mar shampla, ERDDAP™ Beidh sórtáil "Simon" roimh "Simons", ach níl mé cinnte faoi conas a bheidh bunachar sonraí iad a shórtáil.
    * Is sampla é:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;Foinse do Soilse linn snámha faoi stiúir{#sourceneedsexpandedfp_eq} 
* [EN] ** &lt;cliceáil grianghraf a mhéadú ** ] (Cóipeáil nasc leis an tweet Leabaigh an Tweet) is tag OPTIONAL laistigh de EDDTable&lt;dataset ^ chlib a shonraíonn (fíor fíor (taiseachas aeir: fliuch) nó bréagach) más gá an fhoinse cabhrú le ceisteanna le&lt;cineál gas: in airde Athróg ×&lt;snámhphointe (agus &#33; =, × =,&lt;=). Mar shampla,
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * I gcás roinnt foinsí sonraí, ceisteanna uimhriúil a bhaineann =, &#33;=,&lt;=, nó × d'fhéadfadh nach bhfuil ag obair mar atá ag teastáil le huimhreacha pointe snámh. Mar shampla, d'fhéadfadh cuardach a dhéanamh ar domhanfhad = 220.2 theipeann má stóráiltear an luach mar 220.200000001.
    * Tagann an fhadhb seo toisc go bhfuil uimhreacha pointe snámh [nach bhfuil ionadaíocht go díreach laistigh ríomhairí](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) .
    * Más rud é go bhfuil an foinse bunaithe ar an FP Tá sé leagtha go fíor (taiseachas aeir: fliuch) , ERDDAP™ modifies na ceisteanna a sheoladh chuig an bhfoinse sonraí a sheachaint an fhadhb seo. Tá sé i gcónaí sábháilte agus fíneáil a fhágáil an tsraith seo a fíor.
         
#### &lt; sourceUrl &amp; gt;{#sourceurl} 
* [EN] ** &lt; sourceUrl ú ** ] (Tuilleadh eolais) Is tag coiteann laistigh de tacar sonraí domhanda&lt; addAttributes chlib a shonraíonn an URL go bhfuil an fhoinse na sonraí.
    * Is sampla é:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (ach é a chur go léir ar líne amháin) 
    * I ERDDAP™ , beidh " ag gach tacar sonraí sourceUrl " sna tréithe domhanda comhcheangailte a léirítear do na húsáideoirí.
    * I gcás an chuid is mó cineálacha tacar sonraí, tá an chlib REQUIRED. Féach an cineál tacar sonraí cur síos a fháil amach má tá sé seo REQUIRED nó nach bhfuil.
    * I gcás roinnt tacar sonraí, an ar leith&lt; sourceUrl × Níl an chlib ceadaithe. Ina áit sin, ní mór duit " sourceUrl " " " [tréith domhanda](#global-attributes) , de ghnáth sa domhanda \\ × addAttributes &lt;. Má tá aon URL foinse iarbhír (mar shampla, má stóráiltear na sonraí i gcomhaid áitiúla) , tá an tréith go minic ach luach placeholder, mar shampla,&lt;att ainm = "ainm" × (comhaid áitiúla) &lt;/ slán .
    * I gcás an chuid is mó tacar sonraí, is é seo an bonn an URL a úsáidtear chun sonraí a iarraidh. Mar shampla, le haghaidh DAP freastalaithe, is é seo an URL a.dods, .das, .dds, nó .html d'fhéadfaí a chur leis.
    * Ós rud é datasets.xml Is comhad XML, MUST tú ionchódú freisin 'agus', '&lt;', agus '3' sa URL mar 'T &amp;', '&lt;', agus ' &amp; rsquo;'.
    * Le haghaidh an chuid is mó cineálacha tacar sonraí, ERDDAP™ Cuireann an bunaidh sourceUrl   (an "localSourceUrl" sa cód foinse) go dtí an [tréithe domhanda](#global-attributes)   (nuair a thiocfaidh sé an "publicSourceUrl" sa cód foinse) . Nuair a bhíonn an fhoinse sonraí comhaid áitiúla, ERDDAP™ Cuireann sourceUrl = " (comhaid áitiúla) " do na tréithe domhanda mar réamhchúram slándála. Nuair a bhíonn an fhoinse sonraí bunachar sonraí, ERDDAP™ Cuireann sourceUrl = " (data recovery) " do na tréithe domhanda mar réamhchúram slándála. Má úsáideann cuid de do thacair sonraí neamh-phoiblí sourceUrl 's (de ghnáth toisc go bhfuil a gcuid ríomhaire i do DMZ nó ar LAN áitiúil) is féidir leat é a úsáid [&lt;Conas a oibríonn sé? (Tuilleadh eolais) clibeanna a shonrú conas a thiontú ar an áitiúil sourceUrl s go poiblí sourceUrl s.
    * Amharc ar gach eolas sourceUrl Is féidir tús a chur leis http:// , https:// Cóipeáil nasc leis an tweet Leabaigh an Tweet . https naisc a léamh agus a sheiceáil an fhoinse teastas digiteach a chinntiú go bhfuil an fhoinse a deir siad go bhfuil siad. I gcásanna neamhchoitianta, d'fhéadfadh sé seo a sheiceáil theipeann leis an earráid "javax.net.sssl.SSLProtocolException: handshake airdeall: gan aithint \\_name". Tá sé seo dócha mar gheall ar an ainm fearainn ar an deimhniú nach meaitseáil an t-ainm fearainn go bhfuil tú ag baint úsáide as. Is féidir leat agus ba chóir na sonraí ar an sourceUrl 's deimhniú i do bhrabhsálaí gréasáin, go háirithe, an liosta de "DNS Name" sa roinn "Faoi Ainm Malartach".
        
I gcásanna áirithe, na sourceUrl is féidir go bhfuil tú ag baint úsáide as ailias an ainm fearainn ar an deimhniú. Mar shampla,
        https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/caith an earráid, ach
        https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/, a úsáideann an t-ainm fearainn ar an deimhniú, Ní bheidh. Dá bhrí sin, is é an réiteach sna cásanna seo an t-ainm fearainn ar an deimhniú a aimsiú agus a úsáid. Mura féidir leat é a fháil ar an deimhniú, déan teagmháil leis an soláthraí sonraí.
        
I gcásanna eile, d'fhéadfadh an t-ainm fearainn ar an deimhniú a bheith do ghrúpa ainmneacha. Má tharlaíonn sé seo nó má tá an fhadhb inbhraite ar shlí eile, le do thoil ríomhphost Chris. John ag noa.gov chun an fhadhb a thuairisciú.
         

#### &lt;addAttributes&gt; {#addattributes} 
* [EN] ** &lt; addAttributes ú ** ] (Tuilleadh eolais) Is tag OPTIONAL do gach tacar sonraí agus do gach athróg a ligeann ERDDAP riarthóirí rialú na tréithe meiteashonraí a bhaineann le tacar sonraí agus a athróg.
    *    ERDDAP™ chéile na tréithe ó fhoinse na tacar sonraí ("fostóirí") agus an " addAttributes " a shainiú tú i datasets.xml   (a bhfuil tosaíocht acu) a dhéanamh ar an "comhcheangail", a bhfuil an méid ERDDAP™ úsáideoirí a fheiceáil. Dá bhrí sin, is féidir leat é a úsáid addAttributes a athshainmhíniú na luachanna na bhfoinsí, cuir tréithe nua, nó tréithe a bhaint.
    * An bhfuil&lt; addAttributes chlibeanna 0 nó níos mó ** &lt;tuairteála ** fochlibeanna, a úsáidtear chun tréithe aonair a shonrú.
    * Tá gach tréith ainm agus luach (a bhfuil cineál sonraí ar leith, mar shampla, dúbailte) .
    * Ní féidir ach tréith amháin a bheith ann le hainm áirithe. Má tá níos mó, tá tosaíocht ag an gceann deireanach.
    * Is féidir leis an luach a bheith ina luach amháin nó liosta spás-scartha de luachanna.
    * Sintéisí
        * An t-ordú an&lt;Cnaipí taobh istigh addAttributes Níl sé tábhachtach.
        * An bhfuil&lt;Tá formáid fo-tagóir
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * An t-ainm ceann scríbe de gach tréithe MUST tús le litir (A-Z, a-z) agus MUST bhfuil ach na carachtair A-Z, a-z, 0-9, nó '\\_'.
        * Má tá&lt;att × Níl aon luach nó luach null ag fotag, bainfear an tréith sin as na tréithe comhcheangailte.
Mar shampla,&lt;ainm att = "bhrabhsaí" / cuirtear sraitheanna as na tréithe comhcheangailte.
Mar shampla,&lt;att ainm = "comhordanáidí"&lt;Beidh /att uaire a bhaint comhordanáidí ó na tréithe comhcheangailte.
##### tréith Cineál Cineál Cineál cineál{#attributetype} 
* [An cineálluach OPTIONAL do&lt;cliceáil grianghraf a mhéadú (Tuilleadh eolais) Léiríonn an cineál sonraí do na luachanna. Is é an cineál réamhshocraithe Teaghrán. Is sampla de tréith Curtain:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * Cineálacha bailí do luachanna aonair atá byte (8-giotán slánuimhir) , gearr (16-giotán slánuimhir sínithe) , int (32-giotán slánuimhir sínithe) , fada (64-giotán slánuimhir sínithe) , snámhphointe (pointe snámh 32-giotán) , dúbailte (64-giotán pointe snámh) , char, agus Curtain. Mar shampla,
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
Féach na nótaí seo mar gheall ar an [cineál sonraí char](#char) .
Féach na nótaí seo mar gheall ar an [cineál sonraí fada](#long) .
        
    * Cineálacha bailí le haghaidh liostaí spás-scartha luachanna (nó luachanna aonair) Tá byteList, shortList, unsignedShortList, charList, intList, longList, floatList, dúbailte Liosta. Mar shampla,
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
Ligeann UnsignedShortList duit liosta de shorts gan síniú, ach beidh siad a thiontú i liosta de na carachtair Unicode comhfhreagrach (m.sh., "65 67 69" Beidh a thiontú i "A C E".
Má shonraíonn tú charList, ionchódú aon carachtair speisialta (m.sh., spás, Sleachta dúbailte, backslash,&lt;#32, nó ^ #127) mar go mbeadh tú iad a ionchódú sa chuid sonraí de chomhad NCCSV (e.g., ", "\" nó """", "\\\\\", " \\n ", "\\u20ac") .
Níl aon teaghrán. Stóráil na luachanna String mar teaghrán il-líne. Mar shampla,
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### Ranníocaí Domhanda{#global-attributes} 
* [EN] ** Tréithe Domhanda / Domhanda&lt; addAttributes ú ** ] (Tuilleadh roghanna...) --
    &lt; addAttributes × Is tag OPTIONAL laistigh den&lt;dataset × chlib a úsáidtear chun tréithe a bhaineann leis an tacar sonraí ar fad a athrú.
    
    *    ** Úsáid an domhanda&lt; addAttributes ^ a athrú tréithe domhanda an tacar sonraí. **  ERDDAP™ chéile na tréithe domhanda ó fhoinse na tacar sonraí (** foinse **) agus an domhanda**  addAttributes  **a shainiú tú i datasets.xml   (a bhfuil tosaíocht acu) a dhéanamh ar an domhanda** le chéile ** , a bhfuil an méid ERDDAP™ úsáideoirí a fheiceáil. Dá bhrí sin, is féidir leat é a úsáid addAttributes a athshainmhíniú na luachanna na bhfoinsí, cuir tréithe nua, nó tréithe a bhaint.
    * Féach ar an [ ** &lt; addAttributes ú **data] (Tuilleadh eolais) a bhaineann le domhanda agus athróg** &lt; addAttributes ú ** .
    *    [FGTDA](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html) agus [ISO 19115-2/19139](https://en.wikipedia.org/wiki/Geospatial_metadata) Meiteashonraí -- De ghnáth, ERDDAP™ a ghiniúint go huathoibríoch ISO 19115-2/19139 agus FGDC (FGDC-STD-001-1998) XML comhaid meiteashonraí do gach tacar sonraí ag baint úsáide as faisnéis ó meiteashonraí an tacar sonraí. Mar sin,, **metadataset maith mar thoradh ar go maith ERDDAP meiteashonraí ISO 19115 agus FGDC. Smaoinigh ar go leor ama agus iarracht a chur isteach feabhas a chur ar meiteashonraí do thacair sonraí (a bhfuil rud maith a dhéanamh ar aon nós) .** Tá an chuid is mó de na tréithe meiteashonraí a úsáidtear chun meiteashonraí ISO 19115 agus FGDC a ghiniúint ó na [Caighdeán meiteashonraí ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) agus tá siad faoi deara mar sin thíos.
    * Tá go leor tréithe domhanda speisialta sa ERDDAP™ Breathnaíonn dóibh agus iad a úsáid ar bhealaí éagsúla. Mar shampla, nasc chuig an infoUrl san áireamh ar leathanaigh ghréasáin le liostaí de thacair sonraí, agus áiteanna eile, ionas gur féidir le húsáideoirí a fháil amach níos mó mar gheall ar an tacar sonraí.
    * Nuair a roghnaíonn úsáideoir fo-thacar sonraí, GlobalAttributes a bhaineann leis an athróg ar fad, domhanleithead, airde (nó doimhneacht) , agus raonta ama (mar shampla, Southernmost\\_Northing, Northernmost\\_Northing, time\\_coverage\\_start, am\\_coverage\\_end) a ghintear nó a nuashonrú go huathoibríoch.
    * Sampla simplí domhanda&lt; addAttributes Is é seo:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
An folamh cwhdf\\_version tréith is cúis leis an foinse cwhdf\\_version tréith (más ann) a bhaint as an liosta deiridh, le chéile tréithe.
    * Cuidíonn an fhaisnéis seo a sholáthar ERDDAP™ post níos fearr a dhéanamh agus cabhraíonn sé le húsáideoirí tuiscint a fháil ar na tacair sonraí.
Déanann meiteashonraí Dea usable tacar sonraí.
Déanann meiteashonraí neamhleor gan úsáid.
Tabhair an t-am chun post maith a dhéanamh le tréithe meiteashonraí.
##### tréithe domhanda speisialta i ERDDAP™ 
###### admháil{#acknowledgement} 
*    [ **admháil** ](#acknowledgement) agus **admháil**   (ó na [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) ar bhealach MOLADH aitheantas a thabhairt don ghrúpa nó do na grúpaí a sholáthair tacaíocht (go háirithe, airgeadais) don tionscadal a chruthaigh na sonraí seo. Mar shampla,
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
Tabhair faoi deara gur bhain ACDD 1.0 agus 1.1 úsáid as an litriú "sceitheadh" (a bhfuil an litriú is gnách sna Stáit Aontaithe.) , ach ACDD 1.3 athrú seo a "admháil" (a bhfuil an litriú is gnách sa U.K.) . Is é mo thuiscint go raibh an t-athrú go bunúsach timpiste agus nach raibh siad a aithint cinnte na ramifications an t-athrú. Cad a praiseach&#33; Anois tá na milliúin de chomhaid sonraí ar fud an domhain go bhfuil "acknowledgment" agus na milliúin a bhfuil "admhálacha". Léiríonn sé seo an folly de "simplí" athruithe ar chaighdeán, agus béim ar an ngá le cobhsaíocht i gcaighdeáin. Mar gheall ar 1.3 CDD (a bhfuil an leagan de ACDD go ERDDAP™ tacú le tacaíocht) deir "admháil", is é sin an méid ERDDAP™   (go háirithe GenerateDatasets XLUMX) spreagadh.
     
###### Táirgí do cumhacht ard-éadrom Lawn faoi stiúir{#cdm_altitude_proxy} 
*    [ **Táirgí do cumhacht ard-éadrom Lawn faoi stiúir** ](#cdm_altitude_proxy) ach le haghaidh tacair sonraí EDDTable nach bhfuil airde nó doimhneacht athraitheach ach a bhfuil athróg go bhfuil seachfhreastalaí le haghaidh airde nó doimhneacht (mar shampla, brú, sigma, buidéalUimhir) , Is féidir leat úsáid a bhaint as an tréith a aithint go athróg. Mar shampla,
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
Má tá an [Táirgí do bhfianaise faoi stiúir glan](#cdm_data_type) Is Próifíl nó TrajectoryProfile agus níl aon airde nó doimhneacht athróg, cdm\\_altitude\\_proxy MUST a shainiú. Má tá cdm\\_altitude\\_proxy sainithe, ERDDAP™ cuir na meiteashonraí seo a leanas leis an athróg: \\_Coordination AxisType = Ocht agus ais = Z.
     
###### Táirgí do bhfianaise faoi stiúir glan{#cdm_data_type} 
*    [ **Táirgí do bhfianaise faoi stiúir glan** ](#cdm_data_type)   (ó na [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) Is tréith dhomhanda a léiríonn an Unidata   [An tSamhail Sonraí Coiteann](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html) cineál sonraí don tacar sonraí. Mar shampla,
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
Is é an CDM ag teacht chun cinn fós agus d'fhéadfadh athrú arís. ERDDAP™ go gcomhlíonann sé an gaolmhar agus níos mionsonraithe [Diosca Geometris Sampling (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) caibidil ar an [CF 1.6](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) coinbhinsiúin meiteashonraí (ar a dtugtar cheana na Coinbhinsiúin CF Point Bhreathnóireachta) .
    * Ceachtar an tacar sonraí domhanda [foinse](#global-attributes) nó a domhanda&lt; addAttributes ú MUST san áireamh an cdm\\_data \\_type tréith. Roinnt cineálacha tacar sonraí (cosúil le EDDTable Ó dhúchas) leagfaidh sé seo go huathoibríoch.
    * Le haghaidh EDDGrid datasets, an cdm\\_data\\_type options are Grid (an réamhshocraithe agus i bhfad an cineál is coitianta le haghaidh EDDGrid web development) , MovingGrid, Eile, Point, Próifíl, RadialSweep, TimeSeries, TimeSeriesProfile, Swath, Trajectory, agus TrajectoryProfile. Faoi láthair, EDDGrid Ní gá go bhfuil aon meiteashonraí gaolmhara a shonrú, ná ní dhéanann sé seiceáil go oireann na sonraí an cdm\\_data\\_type. Beidh sé sin athrú dócha ar an luath amach anseo.
    * Úsáideann EDDTable cdm\\_data\\_type ar bhealach dian, tar éis sonraíocht DSG CF seachas CDM, nach bhfuil ar chúis éigin a nuashonrú a bheith comhsheasmhach le DSG. Más rud é nach bhfuil meiteashonraí tacar sonraí a chomhlíonadh leis an ERDDAP 's cdm\\_data\\_type's requirements (féach thíos) , beidh an tacar sonraí theipeann a luchtú agus beidh a ghiniúint [teachtaireacht earráide](#troubleshooting-tips) . (Sin rud maith, sa chiall go mbeidh an teachtaireacht earráide insint duit cad atá mícheart ionas gur féidir leat é a shocrú.) Agus más rud é nach bhfuil an tacar sonraí mheaitseáil thus meiteashonraí an tacar sonraí (e.g., má tá níos mó ná luach domhanleithead amháin ann do stáisiún áirithe in amlanna tacar sonraí) , beidh roinnt iarrataí ar shonraí ar ais sonraí mícheart sa fhreagra. Mar sin, déan cinnte go bhfaigheann tú an ceart seo ar fad.
        
I gcás gach ceann de na tacair shonraí sin, sna Coinbhinsiúin agus Metadata\\_Conventions tréithe domhanda, féach ar CF-1.6 (ní CF-1.0, 1.1, 1.2, 1.3, 1.4 nó 1.5) , ós rud é CF-1.6 Is é an chéad leagan a chur san áireamh na hathruithe a bhaineann le Céimseata Discrete (DSG) coinbhinsiúin.
        *   ** ERDDAP™ Tá caidreamh nach-simplí a CF DSG** 
        *    ERDDAP™ is féidir a dhéanamh bailí DSG tacar sonraí amach foinse atá cheana comhad DSG bailí (s s) , nó as tacar sonraí foinse nach bhfuil ar bun le haghaidh DSG ach is féidir a dhéanamh amhlaidh trí athruithe ar meiteashonraí (Tá cuid acu ERDDAP -sonrach chun cur chuige níos ginearálta a chur ar fáil chun an thus DSG a shonrú) .
        *    ERDDAP™ a dhéanann a lán tástálacha bailíochta nuair a ualaí sé tacar sonraí. Má tá an tacar sonraí go bhfuil cdm\\_data\\_type (nó featureType ) tréith ualaí go rathúil i ERDDAP™ , ansin ERDDAP™ ag rá go gcomhlíonann an tacar sonraí na ceanglais DSG (ar shlí eile, ERDDAP™ Beidh caith eisceacht ag míniú an chéad fhadhb a fuair sé) .
WARNING: Is cosúil go bhfuil tacar sonraí á luchtú go rathúil chun freastal ar riachtanais DSG (tá sé an meascán ceart tréithe) , ach is féidir fós a chur ar bun go mícheart, as a dtiocfaidh torthaí mícheart i .nc CF agus .nc Comhaid freagartha CFMA. (Tá Bogearraí cliste i roinnt bealaí agus clueless i daoine eile.) 
        * Nuair a fhéachann tú ar meiteashonraí an tacar sonraí i ERDDAP™ , is cosúil go bhfuil an tacar sonraí DSG a bheith i ERDDAP 's formáid inmheánach (tábla ollmhór, bunachar sonraí-mhaith) . Níl sé i gceann de na formáidí DSG (e.g., níl na gnéithe agus na meiteashonraí ceart) , ach tá an fhaisnéis is gá chun déileáil leis an tacar sonraí mar tacar sonraí DSG sna meiteashonraí (mar shampla, cdm\\_data\\_type = AmSeries agus cdm\\_timeseries\\_variables = *aCsvListOfStationRelatedVarables* i meiteashonraí domhanda agus cf\\_role =timeseries\\_id do roinnt athraitheach) .
        * Má iarrann úsáideoir fo-thacar den tacar sonraí i .nc CF (ar an .nc comhad i bhformáid comhaid DSG Contiguous Ragged Array) nó .nc CFMA comhad (a .nc comhad i bhformáid comhad Ilthoiseach DSG Array) , beidh an comhad sin bailí CF DSG comhad.
WARNING: Mar sin féin, má bunaíodh an tacar sonraí go mícheart (ionas nach bhfuil na gealltanais a rinne an meiteashonraí fíor) , ansin beidh an comhad freagartha bailí go teicniúil ach beidh sé mícheart ar bhealach éigin.
             
###### EDDTable cdm_data_types
* Do tacar sonraí EDDTable, an cdm\\_data\\_type roghanna (agus ceanglais ghaolmhara ERDDAP ) go bhfuil siad
###### Pointe Pointe{#point} 
*    [Pointe Pointe](#point) -- le haghaidh sraith de tomhais a glacadh ag amanna agus suímh nach mbaineann.
    * Mar is amhlaidh le gach cdm\\_data\\_types seachas Eile, Tá sonraí Point MUST domhanfhad, domhanleithead, agus athróg ama.
###### Próifíl na Cuideachta{#profile} 
*    [Próifíl na Cuideachta](#profile) - Is sraith de tomhais a glacadh go léir ag aon am amháin, ag suíomh domhanfhad domhanleithead amháin, ach ag níos mó ná doimhneacht amháin (nó airde) . Is féidir leis an tacar sonraí a bheith ina bhailiúchán de na Próifílí seo, mar shampla, 7 próifílí ó áiteanna éagsúla. Ní dhéanann an cdm\\_data\\_type imply aon nasc loighciúil idir aon cheann de na próifílí.
    
* Ceann de na hathróga (mar shampla, próifíl \\_líon) MUST Tá an tréith athraitheach cf\\_role = próifíl \\_id a aithint an athróg aithníonn uathúil na próifílí.
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
Mura bhfuil aon athróg eile oiriúnach, mheas ag baint úsáide as an athróg ama.
###### Táirgí do níos ísle bhfianaise Lawn voltage{#cdm_profile_variables} 
* I measc na MUST tacar sonraí an globalAttribute [Táirgí do níos ísle bhfianaise Lawn voltage](#cdm_profile_variables) , i gcás ina bhfuil an luach liosta de na hathróga a bhfuil an t-eolas faoi gach próifíl. I gcás próifíl ar leith, na luachanna na n-athróg MUST a bheith tairiseach. Mar shampla,
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
I measc na MUST liosta an cf\\_role = próifíl athróg \\_id agus gach athróg eile le faisnéis faoin bpróifíl, agus am, domhanleithead agus domhanfhad.
Ní bheidh an liosta san áireamh airde, doimhneacht, nó aon athróg breathnadóireachta.
     

 \\[ Tuairim: Ba chóir cdm\\_data\\_type = Próifíl a úsáid annamh. Go praiticiúil, tá tacar sonraí ar leith de ghnáth i ndáiríre ceachtar TimeSeriesProfile (próifílí ag post seasta) nó TrajectoryProfile (próifílí feadh trajectory) , agus mar sin ba chóir a aithint go cuí mar sin. \\]   
###### Amharc ar gach eolas{#timeseries} 
*    [Amharc ar gach eolas](#timeseries) - Is sraith de tomhais (e.g., teocht uisce farraige) a glacadh ar cheann, seasta, domhanleithead, domhanfhad, doimhneacht (nó airde) suíomh. (Smaoinigh air mar "stáisiún".) Is féidir leis an tacar sonraí a bheith bailiúchán de na TimeSeries, mar shampla, sraith ó gach ceann de 3 suímh éagsúla.
    * Ceann de na hathróga (mar shampla, stáisiún\\_id) MUST Tá an tréith athraitheach cf\\_role =timeseries \\_id a aithint an athróg aithníonn uathúil na stáisiúin.
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### Táirgí do níos ísle bhfianaise Lawn voltage{#cdm_timeseries_variables} 
* I measc na MUST tacar sonraí an globalAttribute [Táirgí do níos ísle bhfianaise Lawn voltage](#cdm_timeseries_variables) , i gcás ina bhfuil an luach liosta de na hathróga a bhfuil an t-eolas faoi gach stáisiún. I gcás stáisiún ar leith, na luachanna na n-athróg MUST a bheith tairiseach. Mar shampla,
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
I measc na MUST liosta an cf\\_role =timeseries\\_id athróg agus gach athróg eile le faisnéis faoin stáisiún, a n-áirítear beagnach i gcónaí domhanleithead agus domhanfhad (agus airde nó doimhneacht, más ann dóibh) .
Ní bheidh an liosta san áireamh am nó aon athróg breathnadóireachta.
* I gcás roinnt baoithe moored, d'fhéadfadh tacar sonraí a bheith dhá shraith de domhanleithead agus athróg faddhearg:
    1. Péire amháin de luachanna domhanleithead agus fada go bhfuil tairiseach (i.e., suíomh seasta an mooring) . I ERDDAP™ , a thabhairt ar na hathróga na destinationName s de domhanleithead agus domhanfhad, agus áirítear na hathróga sa liosta de cdm\\_timeseries\\_variables.
    2. Luachanna domhanleithead agus domhanfhad a bhaineann le gach breathnóireacht. I ERDDAP™ , a thabhairt ar na hathróga éagsúla destinationName s s (e.g., beacht agus beacht Leathanach Baile) agus nach bhfuil na hathróga sa liosta de cdm\\_timeseries\\_variables.
Is é an réasúnaíocht seo: ó thaobh teoiriciúil, le haghaidh tacar sonraí DSG TimeSeries, an domhanleithead agus domhanfhad (agus airde nó doimhneacht, más ann dóibh) suíomh an MUST stáisiún a bheith tairiseach.
###### Tuilleadh roghanna...{#timeseriesprofile} 
*    [Tuilleadh roghanna...](#timeseriesprofile) - Is le haghaidh ord próifílí a glacadh ag suíomh amháin, seasta, domhanleithead. Tá gach próifíl sraith de tomhais a glacadh ag airde nó doimhneacht éagsúla. Is féidir leis an tacar sonraí a bheith ina bailiúchán de na TimeSeriesProfiles, mar shampla, sraith próifílí a glacadh ag gach ceann de 12 láithreacha éagsúla.
    * Ceann de na hathróga (mar shampla, stáisiún\\_id) MUST Tá an tréith athraitheach cf\\_role =timeseries \\_id a aithint an athróg aithníonn uathúil na stáisiúin.
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * Ceann de na hathróga (mar shampla, próifíl \\_líon) MUST Tá an tréith athraitheach cf\\_role = próifíl \\_id a aithint an athróg aithníonn uathúil na próifílí.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Ní mór próifíl ar leith a bheith uathúil le haghaidh amanna áirithe \\_id.) Mura bhfuil aon athróg eile oiriúnach, mheas ag baint úsáide as an athróg ama.
    * I measc na MUST tacar sonraí an cdm \\_timeseries \\_variables, áit a bhfuil an luach liosta coma-scartha de na hathróga a bhfuil an t-eolas faoi gach stáisiún. I gcás stáisiún ar leith, na luachanna na n-athróg MUST a bheith tairiseach. Mar shampla,
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
I measc na MUST liosta an cf\\_role =timeseries\\_id athróg agus gach athróg eile le faisnéis faoin stáisiún, a chuimsíonn beagnach i gcónaí domhanleithead agus domhanfhad.
Ní bheidh an liosta san áireamh am, airde, doimhneacht, nó aon athróg breathnadóireachta.
    * I measc na MUST tacar sonraí an cdm \\_profile\\_variables, áit a bhfuil an luach liosta de na hathróga a bhfuil an t-eolas faoi gach próifíl. I gcás próifíl ar leith, na luachanna na n-athróg MUST a bheith tairiseach. Mar shampla,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
I measc na MUST liosta an cf\\_role = próifíl athróg \\_id agus gach athróg eile le faisnéis faoin bpróifíl, lena n-áirítear beagnach i gcónaí am.
Ní bheidh an liosta san áireamh domhanleithead, domhanfhad, airde, doimhneacht, nó aon athróga breathnóireachta.
###### Seirbhís do Chustaiméirí{#trajectory} 
*    [Seirbhís do Chustaiméirí](#trajectory) - Is sraith de tomhais a glacadh ar feadh trajectory (cosán trí spás agus am)   (e.g., muir\\_water\\_teocht tógtha ag long mar a ghluaiseann sé tríd an uisce) . Is féidir leis an tacar sonraí a bheith ina bailiúchán de na Trajectories, mar shampla, sraith ó gach ceann de 4 longa éagsúla.
    * Ceann de na hathróga (mar shampla, long\\_id) MUST bhfuil an tréith cf\\_role = trajectory \\_id a aithint ar an athróg aithníonn uathúil na trajectories.
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### Táirgí do cumhacht ard-éadrom Lawn faoi stiúir{#cdm_trajectory_variables} 
* I measc na MUST tacar sonraí an globalAttribute [Táirgí do cumhacht ard-éadrom Lawn faoi stiúir](#cdm_trajectory_variables) , i gcás ina bhfuil an luach liosta de na hathróga a bhfuil an t-eolas faoi gach trajectory. I gcás trajectory ar leith, na luachanna na n-athróg MUST a bheith tairiseach. Mar shampla,
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
I measc na MUST liosta an cf\\_role = trajectory\\_id athróg agus gach athróg eile le faisnéis faoin trajectory.
Ní bheidh an liosta san áireamh am, domhanleithead, domhanfhad, nó aon athróg breathnadóireachta.
###### Traidisiún comhad{#trajectoryprofile} 
*    [Traidisiún comhad](#trajectoryprofile) - Is sraith próifílí a glacadh ar feadh trajectory. Is féidir leis an tacar sonraí a bheith ina bailiúchán de na TrajectoryProfiles, mar shampla, sraith próifílí a thóg 14 long éagsúla.
    * Ceann de na hathróga (mar shampla, long\\_id) MUST bhfuil an tréith athraitheach cf\\_role = traidisiúnta \\_id a aithint an athróg aithníonn uathúil na trajectories.
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * Ceann de na hathróga (mar shampla, próifíl \\_líon) MUST Tá an tréith athraitheach cf\\_role = próifíl \\_id a aithint an athróg aithníonn uathúil na próifílí.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Tá próifíl ar leith \\_id amháin a bheith uathúil le haghaidh áirithe trajectory \\_id.) Mura bhfuil aon athróg eile oiriúnach, mheas ag baint úsáide as an athróg ama.
    * I measc na MUST tacar sonraí an cdm \\_trajectory\\_variables, áit a bhfuil an luach liosta de na hathróga a bhfuil an t-eolas faoi gach trajectory. I gcás trajectory ar leith, na luachanna na n-athróg MUST a bheith tairiseach. Mar shampla,
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
I measc na MUST liosta an cf\\_role = trajectory\\_id athróg agus gach athróg eile le faisnéis faoin trajectory.
Ní bheidh an liosta san áireamh athróg próifíl-ghaolmhar, am, domhanleithead, domhanfhad, nó aon athróga breathnóireachta.
    * I measc na MUST tacar sonraí an cdm \\_profile\\_variables, áit a bhfuil an luach liosta de na hathróga a bhfuil an t-eolas faoi gach próifíl. I gcás próifíl ar leith, na luachanna na n-athróg MUST a bheith tairiseach. Mar shampla,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
I measc na MUST liosta an cf\\_role = próifíl athróg \\_id agus gach athróg eile le faisnéis faoin bpróifíl, lena n-áirítear beagnach i gcónaí am, domhanleithead agus domhanfhad.
Ní bheidh an liosta san áireamh airde, doimhneacht, nó aon athróg breathnadóireachta.
###### Eile eile (1){#other} 
*    [Eile eile (1)](#other) - níl aon riachtanais. Bain úsáid as más rud é nach bhfuil an tacar sonraí oiriúnach ar cheann de na roghanna eile, go háirithe, más rud é nach bhfuil an tacar sonraí san áireamh domhanleithead, fad saoil agus athróg ama.
     
###### Naisc ábhartha eile{#related-notes} 
* Gach tacar sonraí EDDTable le cdm\\_data\\_type eile seachas "Eile" MUST bhfuil domhanfhad, domhanleithead, agus athróg ama.
* Tá athróg airde, athróg doimhneacht ag tacar sonraí le próifílí MUST, nó [Táirgí do cumhacht ard-éadrom Lawn faoi stiúir](#cdm_altitude_proxy) athróg.
* Más rud é nach féidir leat a dhéanamh tacar sonraí a chomhlíonadh le gach ceann de na ceanglais don cdm idéalach\\_data\\_type, úsáid "Point" (a bhfuil roinnt ceanglas) nó "Athair" (a bhfuil aon cheanglais) ina ionad sin.
* Tá an t-eolas a úsáidtear ag ERDDAP™ ar bhealaí éagsúla, mar shampla, ach den chuid is mó le haghaidh a dhéanamh .nc CF comhaid ( .nc comhaid a chomhlíonann na Ionadaíochtaí Contiguous Ragged Array a bhaineann leis an tacar sonraí cdm\\_data\\_type) agus .nc Comhaid CFMA ( .nc comhaid a chomhlíonann na Iltoiseach Array Ionadaíochtaí a bhaineann leis an tacar sonraí cdm\\_data\\_type) mar a shainmhínítear i [Diosca Geometris Sampling (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) caibidil ar an [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) coinbhinsiúin meiteashonraí, a ainmníodh roimhe seo "Coinbhinsiúin Bhreathnóireachta Pointe CF".
* Leid: Maidir leis na tacair sonraí seo, an suíomh ceart le haghaidh [ subsetVariables ](#subsetvariables) Is de ghnáth an meascán de na hathróga atá liostaithe sa cdm\\_...\\_variables tréithe. Mar shampla, le haghaidh TimeSeriesProfile, bain úsáid as an cdm\\_timeseries\\_variables móide an cdm\\_profile\\_variables.
######  contributor\\_name  {#contributor_name} 
*    [ ** contributor\\_name ** ](#contributor_name)   (ó na [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) Is é an bealach MEASNDED a aithint duine, eagraíocht, nó tionscadal a chuidigh leis an tacar sonraí (mar shampla, cruthaitheoir bunaidh na sonraí, sular athphróiseáladh é ag cruthaitheoir an tacar sonraí seo) . Mar shampla,
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
Más rud é nach "contributor" iarratas i ndáiríre le tacar sonraí, omit an tréith. I gcomparáid le [ creator\\_name ](#creator_name) , tá sé seo dírithe uaireanta níos mó ar an bhfoinse maoinithe.
######  contributor\\_role  {#contributor_role} 
*    [ ** contributor\\_role ** ](#contributor_role)   (ó na [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) Is é an bealach MOLADH chun ról a aithint [ contributor\\_name ](#creator_name) . Mar shampla,
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
Más rud é nach "contributor" iarratas i ndáiríre le tacar sonraí, omit an tréith.
###### Coinbhinsiúin{#conventions} 
*    [ **Coinbhinsiúin** ](#conventions)   (ó na [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) caighdeán meiteashonraí) STRONGLY RECOMMENDED. (D'fhéadfadh sé a bheith REQUIRED sa todhchaí.) Is é an luach liosta de chaighdeáin meiteashonraí a leanann an tacar sonraí seo. Mar shampla:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
Na coinbhinsiúin meiteashonraí coitianta a úsáidtear i ERDDAP™ Tá:
    
    *    [ COARDS Coinbhinsiúin](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) Is é an réamhtheachtaí CF.
    *    [Aeráid agus Réamhaisnéis (CF) Coinbhinsiúin](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) Is é an fhoinse go leor de na tréithe molta agus ag teastáil i ERDDAP . Aithnítear an leagan reatha de CF mar "CF-1.6".
    * An bhfuil NetCDF An Coinbhinsiún um Fhionnachtain Shonraí (Clár na dToghthóirí) Is é an fhoinse go leor de na tréithe molta agus ag teastáil i ERDDAP . An leagan bunaidh 1.0 de ACDD (píosa iontach oibre ag Ethan Davis) Aithníodh, mar [ Unidata Sonraí a aimsiú v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1) An reatha (ag tosú i 2015) 1.3 Tá leagan ACDD aitheanta mar [ACDD-1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) . Má tá do thacair sonraí ag baint úsáide as Unidata Dataset Discovery v1.0, molaimid duit a [aistriú do thacair sonraí a úsáid ACDD-1.3](#switch-to-acdd-13) .
    
Má leanann do tacar sonraí roinnt caighdeán meiteashonraí breise, cuir an t-ainm leis an liosta CSV sa tréith Coinbhinsiúin.
######  coverage\\_content\\_type  {#coverage_content_type} 
*    [ ** coverage\\_content\\_type ** ](#coverage_content_type)   (ó na [ISO 19115](https://en.wikipedia.org/wiki/Geospatial_metadata) caighdeán meiteashonraí) Is é an bealach MOLADH chun an cineál sonraí greilleáilte a aithint (i EDDGrid web development) . Mar shampla,
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
Is iad na luachanna ach a cheadaítear cúnta Faisnéise, íomhá, modelResult, fisiciúil Tomhais (an réamhshocraithe nuair a ISO 19115 meiteashonraí a ghintear) , Eolas ar ardchaighdeán, Eolas tagartha, agus Athmhúnlú téamach. (Ná húsáid an chlib seo le haghaidh tacar sonraí EDDTable.)   
######  creator\\_name  {#creator_name} 
*    [ ** creator\\_name ** ](#creator_name)   (ó na [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) Is é an bealach MEASNDED a aithint an duine, eagraíocht, nó tionscadal (mura duine nó eagraíocht ar leith) , an chuid is mó freagrach as a chruthú (nó athphróiseáil is déanaí) de na sonraí seo. Mar shampla,
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
Má rinneadh na sonraí a athphróiseáil go forleathan (mar shampla, sonraí satailíte ó leibhéal 2 go leibhéal 3 nó 4) , ansin de ghnáth tá an reprocessor liostaithe mar an cruthaitheoir agus an cruthaitheoir bunaidh atá liostaithe trí [ contributor\\_name ](#contributor_name) . I gcomparáid le [tionscadal tionscadail](#project) , tá sé seo níos solúbtha, ós rud é go bhféadfadh sé duine, eagraíocht, nó tionscadal a aithint.
######  creator\\_email  {#creator_email} 
*    [ ** creator\\_email ** ](#creator_email)   (ó na [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) Is é an bealach MEASNDED chun seoladh ríomhphoist a aithint (formáidithe i gceart) a sholáthraíonn bealach chun teagmháil a dhéanamh leis an cruthaitheoir. Mar shampla,
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
######  creator\\_url  {#creator_url} 
*    [ ** creator\\_url ** ](#creator_url)   (ó na [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) Is é an bealach RECOMMENDED a aithint URL le haghaidh eagraíocht a chruthaigh an tacar sonraí, nó URL le faisnéis an cruthaitheoir faoi seo tacar sonraí (ach is é sin níos mó ná cuspóir [ infoUrl ](#infourl) ) . Mar shampla,
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
######  date\\_created  {#date_created} 
*    [ ** date\\_created ** ](#date_created)   (ó na [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) is é an bealach MOLADH chun an dáta a cruthaíodh na sonraí den chéad uair a aithint (mar shampla, a phróiseáil san fhoirm seo) , i bhformáid ISO 8601. Mar shampla,
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
Má chuirtear sonraí leis an tacar sonraí go tréimhsiúil, is é seo an chéad dáta a cuireadh na sonraí bunaidh ar fáil.
######  date\\_modified  {#date_modified} 
*    [ ** date\\_modified ** ](#date_modified)   (ó na [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) gurb é an bealach MOLADH chun an dáta ar athraíodh na sonraí go deireanach a shainaithint (mar shampla, nuair a socraíodh earráid nó nuair a cuireadh na sonraí is déanaí) , i bhformáid ISO 8601. Mar shampla,
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
######  date\\_issued  {#date_issued} 
*    [ ** date\\_issued ** ](#date_issued)   (ó na [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) Is é an bealach MOLADH a aithint ar an dáta a cuireadh na sonraí ar fáil den chéad uair do dhaoine eile, i bhformáid ISO 8601, mar shampla, 2012-03-15. Mar shampla,
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
Mar shampla, d'fhéadfadh go mbeadh an tacar sonraí [ date\\_created ](#date_created) de 2010-01-30, ach ní raibh ar fáil go poiblí ach 2010-07-30. date\\_issued is lú a úsáidtear go coitianta ná date\\_created agus date\\_modified . Más rud é date\\_issued a fhágáil ar lár, glactar leis a bheith mar an gcéanna leis an date\\_created .
###### domhanda domhanda domhanda drawLandMask  {#global-drawlandmask} 
*    [ ** drawLandMask ** ](#global-drawlandmask) -- Is é seo an tréith domhanda OPTIONAL a úsáideann ERDDAP™   (agus aon caighdeáin meiteashonraí) a shonraíonn an luach réamhshocraithe don rogha "Draw Land Mask" ar an tacar sonraí a dhéanamh A Graph foirm ( * datasetID * .graf) agus don pharaiméadar &amp; talún i URL iarraidh léarscáil de na sonraí. Mar shampla,
    ```
    <att name="drawLandMask">over</att>  
    ```
Féach an [ drawLandMask forbhreathnú](#drawlandmask) .
######  featureType  {#featuretype} 
*    [ ** featureType ** ](#featuretype)   (ó na [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) caighdeán meiteashonraí) IGNORED agus/nó ATHPLIÚ. Má tá an tacar sonraí [Táirgí do bhfianaise faoi stiúir glan](#cdm_data_type) is iomchuí, ERDDAP™ úsáid go huathoibríoch é a chruthú featureType tréith. Mar sin, níl aon ghá duit é a chur leis.
    
Má tá tú ag úsáid [EDDTableFromNcCFFiles](#eddtablefromnccffiles) a chruthú tacar sonraí ó chomhaid a leanann an [CF Diosca Geometris Sampling (DSG) caighdeán caighdeánach](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) , ní mór na comhaid féin a bheith featureType a shainmhínítear i gceart, ionas go ERDDAP™ Is féidir a léamh na comhaid i gceart. Is é sin mar chuid de na ceanglais CF DSG don chineál sin comhad.
     
###### stair na staire{#history} 
*    [ **stair na staire** ](#history)   (ó na [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) agus [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeáin meiteashonraí) Is tréith dhomhanda il-líne MONDED le líne le haghaidh gach céim próiseála a ndearnadh na sonraí. Mar shampla,
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * Go hidéalach, tá gach líne ISO 8601:2004 (E) dáta formáidithe +timeZ (mar shampla, 2011-08-05T08:55:02Z) ina dhiaidh sin cur síos ar an gcéim próiseála.
    *    ERDDAP™ Cruthaíonn sé seo mura bhfuil sé ann cheana féin.
    * Má tá sé ann cheana féin, ERDDAP™ cuirfidh sé faisnéis nua leis an bhfaisnéis atá ann cheana.
    * Tá stair tábhachtach toisc go ligeann sé do chliaint cúlrian leis an foinse bunaidh na sonraí.
######  infoUrl  {#infourl} 
*    [ ** infoUrl ** ](#infourl) Is tréith domhanda REQUIRED leis an URL leathanach gréasáin le tuilleadh eolais faoi seo tacar sonraí (de ghnáth ag láithreán gréasáin na hinstitiúide foinse) . Mar shampla,
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * Ceachtar an tacar sonraí domhanda [foinse](#global-attributes) nó a domhanda&lt; addAttributes ú MUST san áireamh an tréith.
    *    infoUrl Tá sé tábhachtach toisc go ligeann sé do chliaint a fháil amach níos mó faoi na sonraí ón bhfoinse bunaidh.
    *    ERDDAP™ taispeántais nasc chuig an infoUrl maidir le Foirm Rochtana Sonraí na tacar sonraí ( * datasetID * ..) , Déan leathanach gréasáin Graph ( * datasetID * .graf) , agus leathanaigh ghréasáin eile.
    * Má tá an URL cuid cheist (tar éis an "?") , MUST sé a bheith cheana féin [faoin gcéad ionchódú](https://en.wikipedia.org/wiki/Percent-encoding) . Ní mór duit a ionchódú carachtair speisialta sna srianta (seachas an chéad 'Tógáil' agus an príomh '=' , más ann) i bhfoirm %H, i gcás ina bhfuil HH an luach heicseagach 2 dhigit an carachtar. De ghnáth, ní mór duit ach roinnt de na carachtair poncaíochta a thiontú: % isteach i %25, &amp; i %26, " isteach i %22,&lt;i %3C, = isteach i %3D, × i %3E, + isteach i %2B, | i %7C, \\[ i %5B, \\] isteach %5D, spás isteach% 20, agus gach carachtar a thiontú os cionn #127 isteach ina bhfoirm UTF-8 agus ansin ionchódú faoin gcéad gach beart de na foirm UTF-8 isteach i bhformáid%H (iarraidh ar Ríomhchláraitheoir le haghaidh cabhrach) .
Mar shampla, &amp; stationID × "41004"
Tagann agus stationID %3E =% 2241004%22
Tá ionchódú réasúnta ag teastáil go ginearálta nuair a rochtain tú ERDDAP trí bhogearraí seachas brabhsálaí. Brabhsálaithe láimhseáil de ghnáth ionchódú faoin gcéad ar do shon.
I gcásanna áirithe, ní mór duit a ionchódú faoin gcéad gach carachtar seachas A-Za-z0-9\\_-&#33;. '' () \\*, ach nach bhfuil fós ionchódú an tosaigh 'agus' nó an príomh- '=' .
teangacha Clárú Tá uirlisí a dhéanamh seo (mar shampla, féach Java 's [ java.net.URLEncoder ](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)   
agus Java Script's [encodeURIComponent()] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) ) agus tá
         [láithreáin ghréasáin go ionchódú faoin gcéad / dhíchódú ar do shon](https://www.url-encode-decode.com/) .
    * Ós rud é datasets.xml Is comhad XML, MUST tú freisin &amp;-ionchódú GACH 'agus', '&lt;', agus '3' sa URL mar 'T &amp;', '&lt;', agus ' &amp; rsquo;' tar éis ionchódú faoin gcéad.
    *    infoUrl Is uathúil go ERDDAP . Níl sé ó aon chaighdeán meiteashonraí.
###### institiúid{#institution} 
*    [ **institiúid** ](#institution)   (ó na [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) agus [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeáin meiteashonraí) Is tréith domhanda REQUIRED leis an leagan gearr d'ainm na hinstitiúide a bhfuil an fhoinse na sonraí seo (de ghnáth acrainm, de ghnáth&lt;20 carachtair). Mar shampla,
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * Ceachtar an tacar sonraí domhanda [foinse](#global-attributes) nó a domhanda&lt; addAttributes ú MUST san áireamh an tréith.
    *    ERDDAP™ Taispeánann an institiúid aon uair a thaispeánann sé liosta de thacair sonraí. Má tá ainm institiúid anseo níos faide ná 20 carachtair, ach beidh an chéad 20 carachtair a bheith le feiceáil i liosta na tacar sonraí (ach is féidir an institiúid ar fad a fheiceáil ag cur an cúrsóir luch thar an in aice "?") .
    * Má chuireann tú institiúid leis an liosta&lt; categoryAttributes ú i ERDDAP 's [crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml) comhad, Is féidir le húsáideoirí teacht go héasca tacair sonraí ón institiúid chéanna trí ERDDAP 's "Cuardach do Shonraí de réir Catagóir" ar an leathanach baile.
###### eochairfhocail{#keywords} 
*    [ **eochairfhocail** ](#keywords)   (ó na [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) Is liosta de na focail agus de na habairtí gearra scartha é (mar shampla, [GCMD Eolaíocht Keywords](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access) ) a chuireann síos ar an tacar sonraí ar bhealach ginearálta, agus ní ag glacadh le haon eolas eile ar an tacar sonraí (mar shampla, le haghaidh sonraí aigéineacha, san áireamh farraige) . Mar shampla,
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
Ós rud é datasets.xml Is doiciméad XML, na carachtair &amp;,&lt;, agus ^ i tréith cosúil le heochairfhocail (e.g., na carachtair × i eochairfhocail eolaíochta GCMD) Ní mór a ionchódú mar &amp;,&lt;, agus &amp; gt;, faoi seach.
Nuair a bhíonn tacar sonraí luchtaithe i ERDDAP ,
    
    * "Earth Eolaíocht ^ " Cuirtear leis an tús aon eochairfhocal GCMD nach bhfuil ann.
    * eochairfhocail GCMD a thiontú go Teideal Cás (i.e., na chéad litreacha a chaipitliú) .
    * Na heochairfhocail a athshocrú i ord sórtáilte agus aon carachtair nua-líne a bhaint.
     
######  keywords\\_vocabulary  {#keywords_vocabulary} 
*    [ ** keywords\\_vocabulary ** ](#keywords_vocabulary)   (ó na [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) Is tréith MONDED: má tá tú ag leanúint treoirlíne do na focail / frásaí i do eochairfhocail tréith (mar shampla, GCMD Eolaíocht Keywords) , cuir ainm an treoirlíne sin anseo. Mar shampla,
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### free{#license} 
*    [ **free** ](#license)   (ó na [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) Is tréith dhomhanda STRONGLY ATHBHREITHNITHE leis na srianta ceadúnais agus/nó úsáide. Mar shampla,
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * Má " \\[ caighdeán caighdeánach \\] " a tharlaíonn sa luach tréith, cuirfear an caighdeán in ionad ERDDAP™ ceadúnas ó na&lt;standardLicense bhéil chlib ERDDAP 's
         \\[ taiseachas aeir: fliuch \\] / webapps / erddap / WEB-INF / Ranganna/gov/noaa/pfel / erddap / util/messages.xml comhad.
         
######  Metadata\\_Conventions  {#metadata_conventions} 
*    [ ** Metadata\\_Conventions ** ](#metadata_conventions) Is as an as dáta [Déan teagmháil linn](https://wiki.esipfed.org/ArchivalCopyOfVersion1)   (a aithníodh i Metadata\\_Conventions mar " Unidata Sonraí a aimsiú v1.0 ") caighdeán meiteashonraí. Ba é an luach tréith liosta de choinbhinsiúin meiteashonraí a úsáidtear ag an tacar sonraí seo.
Má úsáideann tacar sonraí ACDD 1.0, is é an tréith seo ná STRONGLY AMNDED, mar shampla,
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
Ach ERDDAP™ Moltar anois ACDD-1.3. Má tá tú [athrú ar do thacair sonraí a úsáid ACDD-1.3](#switch-to-acdd-13) , úsáid Metadata\\_Conventions Is STRONGLY DISCOURAGED: ach úsáid [&lt;Coinbhinsiúin." (Tuilleadh eolais) ina ionad sin.
######  processing\\_level  {#processing_level} 
*    [ ** processing\\_level ** ](#processing_level)   (ó na [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) Is cur síos théacsúil IMMENDED ar an bpróiseáil (mar shampla, [Córas Breathnú na Cruinne NASA Sonraí agus Córas Faisnéise leibhéil próiseála sonraí](https://www.earthdata.nasa.gov/learn/earth-observation-data-basics/data-processing-levels) , mar shampla, Leibhéal 3) nó leibhéal rialaithe cáilíochta (mar shampla, Cáilíocht Eolaíochta) de na sonraí. Mar shampla,
    ```
    <att name="processing\\_level">3</att>  
    ```
###### tionscadal tionscadail{#project} 
*    [ **tionscadal tionscadail** ](#project)   (ó na [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) Is tréith OPTIONAL a aithint ar an tionscadal go bhfuil an tacar sonraí mar chuid de. Mar shampla,
    ```
    <att name="project">GTSPP</att>  
    ```
Mura bhfuil an tacar sonraí mar chuid de thionscadal, ná bain úsáid as an tréith seo. I gcomparáid le [ creator\\_name ](#creator_name) , tá sé seo dírithe ar an tionscadal (ní duine nó eagraíocht, a d'fhéadfadh a bheith páirteach i dtionscadail éagsúla) .
######  publisher\\_name  {#publisher_name} 
*    [ ** publisher\\_name ** ](#publisher_name)   (ó na [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) Is é an bealach MEASNDED a aithint an duine, eagraíocht, nó tionscadal atá ag foilsiú an tacar sonraí. Mar shampla,
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
Mar shampla, is foilsitheoir thú má tá duine nó grúpa eile [cruthaithe](#creator_name) an tacar sonraí agus go bhfuil tú díreach ag freastal air tríd ERDDAP . Más rud é nach "foilsitheoir" i ndáiríre iarratas a dhéanamh ar tacar sonraí, omit an tréith. I gcomparáid le [ creator\\_name ](#creator_name) , an foilsitheoir dócha nach raibh a mhodhnú nó a athphróiseáil na sonraí; Tá an foilsitheoir a dhéanamh ach na sonraí atá ar fáil in ionad nua.
######  publisher\\_email  {#publisher_email} 
*    [ ** publisher\\_email ** ](#publisher_email)   (ó na [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) Is é an bealach MEASNDED chun seoladh ríomhphoist a aithint (formáidithe i gceart, mar shampla, john\\_smith@great.org) a sholáthraíonn bealach chun teagmháil a dhéanamh leis an bhfoilsitheoir. Mar shampla,
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
Más rud é nach "foilsitheoir" i ndáiríre iarratas a dhéanamh ar tacar sonraí, omit an tréith.
######  publisher\\_url  {#publisher_url} 
*    [ ** publisher\\_url ** ](#publisher_url)   (ó na [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) Is é an bealach RECOMMENDED a aithint URL don eagraíocht a d'fhoilsigh an tacar sonraí, nó URL le faisnéis an fhoilsitheora faoi seo tacar sonraí (ach is é sin níos mó ná cuspóir [ infoUrl ](#infourl) ) . Mar shampla,
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
Más rud é nach "foilsitheoir" i ndáiríre iarratas a dhéanamh ar tacar sonraí, omit an tréith.
######  real\\_time  {#real_time} 
*    [ ** real\\_time ** ](#real_time) Is tréith domhanda Curtain (ní ó aon chaighdeán) léiríonn más tacar sonraí fíor-ama é seo. Mar shampla,
    ```
    <att name="real\\_time">true</att>  
    ```
Má tá sé seo bréagach (taiseachas aeir: fliuch) , ERDDAP™ Beidh freagraí taisce le hiarratais ar chineálacha comhaid i gcás nach mór an comhad ar fad a chruthú roimh ERDDAP™ is féidir tús a chur leis an freagra a sheoladh chuig an úsáideoir agus iad a athúsáid ar feadh suas le 15 nóiméad (e.g., .nc , .png) .
Má tá sé seo leagtha chun fíor, ERDDAP™ Ní bheidh taisce na comhaid freagartha agus beidh ar ais i gcónaí comhaid a cruthaíodh nua.
######  sourceUrl tréith{#sourceurl-attribute} 
*    [ ** sourceUrl ** ](#sourceurl-attribute) Is tréith dhomhanda leis an URL an fhoinse na sonraí. Mar shampla,
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (ach é a chur go léir ar líne amháin) 
    *    ERDDAP™ de ghnáth cruthaíonn an tréith dhomhanda seo go huathoibríoch. Tá dhá eisceachtaí EDDTableFrom Hyrax Comhaid agus EDDTableFromThreddsFiles.
    * Má tá an fhoinse comhaid áitiúla agus na comhaid a cruthaíodh ag d'eagraíocht, úsáid
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * Má tá an fhoinse bunachar sonraí áitiúil agus cruthaíodh na sonraí ag d'eagraíocht, úsáid
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *    sourceUrl Tá sé tábhachtach toisc go ligeann sé do chliaint cúlrian leis an foinse bunaidh na sonraí.
    *    sourceUrl Is uathúil go ERDDAP . Níl sé ó aon chaighdeán meiteashonraí.
        
######  standard\\_name\\_vocabulary  {#standard_name_vocabulary} 
*    [ ** standard\\_name\\_vocabulary ** ](#standard_name_vocabulary)   (ó na [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) Is tréith IMMENDED a aithint ainm an stór focal rialaithe as a athróg [ standard\\_name ](#standard_name) s a ghlacadh. Mar shampla,
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
le haghaidh leagan 77 den [CF tábla ainm caighdeánach](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) .
         
#####  subsetVariables  {#subsetvariables} 
*    ** subsetVariables **   (le haghaidh tacar sonraí EDDTable amháin) Is tréith dhomhanda IMMENDED a ligeann duit liosta coma-scartha de [&lt; dataVariable ú (#datavariable)   [ destinationName ](#destinationname) s chun athróga a bhfuil líon teoranta de luachanna a aithint (dúirt bhealach eile: athróga a bhfuil gach ceann de na luachanna go leor dúbailt) . Mar shampla,
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
Má tá an tréith seo i láthair, beidh an tacar sonraí a bheith * datasetID * .Leathanach gréasáin subset (agus nasc leis ar gach liosta tacar sonraí) a ligeann d'úsáideoirí fo-iarsmaí éagsúla de na sonraí a roghnú go tapa agus go héasca.
    * Gach uair go bhfuil tacar sonraí luchtaithe, ERDDAP ualaí agus siopaí ar diosca tábla le gach ceann de na ar leith () teaglaim de na fo-thacar Luachanna athraitheacha Variable ar. ERDDAP™ Is féidir a léamh go subsetVariables tábla agus é a phróiseáil go han-tapa (go háirithe i gcomparáid le go leor de na comhaid sonraí a léamh nó sonraí a fháil ó bhunachar sonraí nó ó sheirbhís sheachtrach eile) .
    * Ceadaíonn sin ERDDAP™ a dhéanamh 3 rudaí:
        1. Ceadaíonn sé ERDDAP™ liosta de na luachanna féideartha a chur i liosta anuas ar an bhFoirm Rochtana Sonraí, Déan leathanach gréasáin Graph, agus leathanaigh ghréasáin .subset.
        2. Ceadaíonn sé ERDDAP™ a thairiscint leathanach gréasáin .subset don tacar sonraí. Is é sin an leathanach suimiúil mar a dhéanann sé éasca a fháil teaglaim bailí de na luachanna na n-athróg, a bhfuil do roinnt tacar sonraí agus roinnt athróg an-, an-deacair (beagnach dodhéanta) . Ansin, gach iarratas úsáideora ar leith () fotha RSS Beidh sonraí athraitheacha an-tapa.
        3. Má tá iarraidh úsáideora go dtagraíonn ach le fo-thacar de na hathróga, ERDDAP™ a léamh go tapa ar an subsetVariables tábla, agus freagra a thabhairt ar an iarraidh. Is féidir sin a shábháil ton ama agus iarracht le haghaidh ERDDAP .
    * An t-ordú an destinationName s shonraigh tú chinneann an t-ordú saghas ar an * datasetID * leathanach gréasáin .subset, mar sin beidh tú a shonrú de ghnáth na hathróga is tábhachtaí ar dtús, ansin an ceann is lú tábhachtach. Mar shampla, le haghaidh tacar sonraí le sonraí sraith ama do stáisiúin éagsúla, d'fhéadfá a úsáid, mar shampla,
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
ionas go mbeidh na luachanna curtha in eagar ag stáisiún \\_id.
    * Ar ndóigh, tá sé do rogha a athróg a chur san áireamh sa subsetVariables liosta, ach tá an úsáid molta:
        
Go ginearálta, san áireamh athróga ar mian leat ERDDAP™ liosta anuas de roghanna a thaispeáint ar Fhoirm Rochtana Sonraí na tacar sonraí (..) agus Déan-A-Graph (.graf) leathanaigh ghréasáin.
        
Go ginearálta, a dhéanamh san áireamh athróg le faisnéis faoi ghnéithe an tacar sonraí (na stáisiúin, na próifílí, agus/nó na trajectories, go háirithe ó [Táirgí do níos ísle bhfianaise Lawn voltage](#cdm_timeseries_variables) , [Táirgí do níos ísle bhfianaise Lawn voltage](#cdm_profile_variables) , [Táirgí do cumhacht ard-éadrom Lawn faoi stiúir](#cdm_trajectory_variables) ) . Níl ach roinnt luachanna éagsúla do na hathróga sin oibríonn siad go maith le liostaí anuas.
        
Ná ní áirítear riamh aon athróg sonraí a bhaineann le tuairimí aonair (e.g., am, teocht, salinity, luas reatha) i an subsetVariables liosta. Tá luachanna an iomarca éagsúla do na hathróga, mar sin bheadh liosta anuas a bheith mall a luchtú agus a bheith deacair a bheith ag obair le (nó gan obair) .
        
    * Má tá líon na dteaglamaí ar leith de na hathróga níos mó ná thart ar 1,000,000, ba chóir duit a mheas srian leis an subsetVariables go bhfuil tú a shonrú a laghdú ar líon na dteaglamaí ar leith go dtí thíos 1,000,000; ar shlí eile, an * datasetID * . Féadfar leathanaigh ghréasáin a chur isteach go mall. I gcásanna tromchúiseacha, ní féidir leis an tacar sonraí a luchtú i ERDDAP™ toisc go n-úsáideann ghiniúint an liosta de chomhcheangail ar leith cuimhne i bhfad ró-. Más amhlaidh, MUST tú roinnt athróg a bhaint as an subsetVariables liosta.
    * Má tá líon na luachanna ar leith d'aon athróg fo-thacar amháin níos mó ná thart ar 20,000, ba chóir duit a mheas nach n-áirítear sin athróg sa liosta subsetVariables ; ar shlí eile, tógann sé i bhfad a tharchur an * datasetID * .subset, * datasetID * .graf, agus * datasetID * leathanaigh ghréasáin .html. Chomh maith leis sin, ar Mac, tá sé an-deacair roghanna a dhéanamh ó liosta anuas le níos mó ná 500 míreanna mar gheall ar an easpa barra scrollbharra. Is comhréiteach: athróg a bhaint as an liosta nuair nach bhfuil úsáideoirí dócha a roghnú luachanna ó liosta anuas.
    * Ba chóir duit tástáil gach tacar sonraí a fheiceáil má tá an subsetVariables Tá leagan ceart go leor. Má tá an freastalaí sonraí foinse mall agus a thógann sé ró-fhada (nó go mainneoidh) a íoslódáil na sonraí, ceachtar a laghdú ar líon na n-athróg a shonraítear nó a bhaint as an subsetVariables tréith domhanda.
    * Fócas Tá éagsúlachtaí an-úsáideach. Mar sin, má tá do tacar sonraí oiriúnach, le do thoil a chruthú subsetVariables tréith.
    * EDDTableFrom SOS Cuireann go huathoibríoch
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
nuair a bhíonn an tacar sonraí a cruthaíodh.
        * Rabhadh féideartha: má úsáideoir ag baint úsáide as an * datasetID * .Leathanach gréasáin subset roghnaíonn luach a bhfuil aischur carr nó carachtar nua-líne, * datasetID * Beidh .subset theipeann. ERDDAP™ Ní féidir a bheith ag obair thart ar an gceist seo mar gheall ar roinnt sonraí HTML. In aon chás, tá sé beagnach i gcónaí smaoineamh maith a bhaint as an aistear iompar agus carachtair nua-líne ó na sonraí. Chun cabhrú leat an fhadhb a shocrú, má tá an EDDTable. subsetVariables Modh cábla i ERDDAP a bhrath luachanna sonraí a bheidh ina chúis le deacracht, beidh sé ríomhphost rabhadh le liosta de luachanna offending leis an ríomhphost Gach rud Chun seoltaí ríomhphoist a shonraítear i thus.xml. Ar an mbealach sin, tá a fhios agat cad is gá a shocrú.
        *    **Táblaí fo-thacar réamh-ghinithe.** De ghnáth, nuair a ERDDAP™ ualaí tacar sonraí, iarrann sé ar leith () fo-thacar athróg tábla sonraí ón bhfoinse sonraí, ach trí iarratas sonraí gnáth. I gcásanna áirithe, níl na sonraí seo ar fáil ón bhfoinse sonraí nó d'fhéadfadh sé go mbeadh an fhoinse sonraí deacair ar an bhfreastalaí foinse sonraí. Más amhlaidh, is féidir leat tábla a sholáthar leis an bhfaisnéis i .json nó .csv comhad leis an ainm *taiseachas aeir: fliuch* / ábhar / ábhar / ábhar / * datasetID *  .json   (nó.) . Má tá sé i láthair, ERDDAP™ a léamh uair amháin nuair a bhíonn an tacar sonraí luchtaithe agus é a úsáid mar fhoinse na sonraí fo-thacar.
            * Má tá earráid agus é ag léamh, beidh an tacar sonraí theipeann a luchtú.
            * Tá sé MUST ainmneacha colún céanna cruinn (mar shampla, cás céanna) mar atá&lt; subsetVariables ^, ach na colúin MAY a bheith in aon ordú.
            * Tá colúin bhreise ag MAY (bainfear iad agus bainfear sraitheanna nua-iomarcaithe) .
            * Ba cheart go mbeadh luachanna ar iarraidh (riachtanais uisce: measartha) .
            *    .json D'fhéadfadh comhaid a bheith níos deacra beag a chruthú ach déileáil le carachtair Unicode maith. .json Tá comhaid éasca a chruthú má chruthaíonn tú iad le ERDDAP .
            * Tá comhaid .csv éasca a bheith ag obair le, ach oiriúnach do carachtair ISO 8859-1 amháin. .csv comhaid MUST Tá ainmneacha colún ar an gcéad sraith agus sonraí ar sraitheanna ina dhiaidh sin.
        * Le haghaidh tacar sonraí ollmhór nó nuair&lt; subsetVariables ^ Is misconfigured, is féidir leis an tábla de teaglaim de luachanna a bheith mór go leor chun a chur faoi deara Sonraí Too Much nó earráidí OutOfMemory. Is é an réiteach athróg a bhaint as an liosta de&lt; subsetVariables × a bhfuil líon mór de luachanna ann, nó athróga a bhaint de réir mar is gá go dtí go bhfuil méid an tábla sin réasúnach. Beag beann ar an earráid, na codanna de ERDDAP™ a úsáideann an subsetVariables Ní córas ag obair go maith (e.g., luchtú leathanaigh ghréasáin go han-mhall) nuair a bhíonn ró-go leor sraitheanna (e.g., níos mó ná milliún) sa tábla sin.
        *    subsetVariables Tá aon rud a dhéanamh leis a shonrú ar féidir le húsáideoirí athróg úsáid i srianta, i.e., conas is féidir le húsáideoirí fo-thacar den tacar sonraí a iarraidh. ERDDAP™ Ceadaíonn i gcónaí srianta a tharchur chuig aon cheann de na hathróga.
###### Amharc ar gach eolas{#time-units} 
 [Am agus amstamp](#time-units) Ba chóir go mbeadh colúin ISO 8601:2004 (E) dáta formáidithe + am Teanntáin Z (mar shampla, 1985-01-31T15:31:00Z) .
             
###### achomair:{#summary} 
*    [ **achomair:** ](#summary)   (ó na [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) agus [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeáin meiteashonraí) Is tréith domhanda REQUIRED le cur síos fada ar an tacar sonraí (de ghnáth&lt;500 carachtair). Mar shampla,
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * Ceachtar an tacar sonraí domhanda [foinse](#global-attributes) nó a domhanda&lt; addAttributes ú MUST san áireamh an tréith.
    * Tá achoimre an-tábhachtach toisc go ligeann sé do chliaint cur síos a léamh ar an tacar sonraí go bhfuil níos mó eolais ná an teideal agus dá bhrí sin a thuiscint go tapa cad é an tacar sonraí.
    * Comhairle: scríobh an achoimre mar sin bheadh sé ag obair chun cur síos ar an tacar sonraí do roinnt duine randamach bualadh leat ar an tsráid nó le comhghleacaí. Cuimhnigh a chur san áireamh ar an [Cúig W agus ceann H](https://en.wikipedia.org/wiki/Five_Ws) : Cé a chruthaigh an tacar sonraí? Cén fhaisnéis a bailíodh? Cathain a bailíodh na sonraí? Cá raibh sé bailithe? Cén fáth a bailíodh é? Conas a bailíodh é?
    *    ERDDAP™ Taispeánann an achoimre ar Fhoirm Rochtana Sonraí na tacar sonraí ( * datasetID * ..) , Déan leathanach gréasáin Graph ( * datasetID * .graf) , agus leathanaigh ghréasáin eile. ERDDAP™ Úsáideann an achoimre nuair a chruthú FGDC agus ISO 19115 doiciméid.
######  testOutOfDate  {#testoutofdate} 
*    [ ** testOutOfDate ** ](#testoutofdate)   (roghnach ERDDAP --sonrach tréith meiteashonraí domhanda, ní ó aon chaighdeán) sonraítear, ar bhealach simplí, nuair a mheastar go bhfuil na sonraí le haghaidh tacar sonraí in am atá gar-raoin, sonraithe mar now-  *Níl sé seo* , mar shampla, now- 2 lá le haghaidh sonraí is cosúil de ghnáth 24-48 uair an chloig tar éis an luach ama. Le haghaidh sonraí réamhaisnéise, úsáid anois **+ + + +**  *Níl sé seo* , mar shampla, anois + 6 lá do shonraí réamhaisnéis go bhfuil, ar a mhéad, 8 lá sa todhchaí. (Féach an [ now-  *Níl sé seo* cur síos achomair](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) .) Má tá an luach ama uasta don tacar sonraí níos déanaí ná an t-am sonraithe, meastar go bhfuil an tacar sonraí cothrom le dáta. Má tá an t-uasluach ama níos sine ná an t-am sonraithe, meastar go bhfuil an tacar sonraí cothrom le dáta. Le haghaidh tacar sonraí lasmuigh den dáta, is dócha go bhfuil fadhb leis an bhfoinse sonraí, mar sin ERDDAP™ nach bhfuil in ann sonraí a rochtain ó phointí ama níos déanaí.
    
An bhfuil testOutOfDate Tá luach ar taispeáint mar cholún sa [ allDatasets dataset](#eddtablefromalldatasets) i do ERDDAP . Tá sé úsáid freisin a ríomh ar an innéacs outOfDate, a bhfuil colún eile sa allDatasets tacar sonraí.
Má tá an t-innéacs&lt;1, meastar go bhfuil an tacar sonraí cothrom le dáta.
Má tá an t-innéacs&lt;=1, meastar go bhfuil an tacar sonraí as dáta.
Má tá an t-innéacs&lt;= 2, meastar go bhfuil an tacar sonraí an-as dáta.
    
An bhfuil testOutOfDate luach a úsáidtear freisin ag ERDDAP™ a ghiniúint anhttps://*yourDomain*/erddap/outOfDateDatasets.htmlweb development ( [sampla sampla sampla](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) ) a léiríonn na tacair sonraí a bhfuil&lt; testOutOfDate × clibeanna, leis na tacair sonraí rangaithe ag an gcaoi a bhfuil siad lasmuigh den dáta. Má athraíonn tú an cineál comhaid (ó .html go .csv, .jsonlCSV , .nc , .tsv , ...) , is féidir leat an t-eolas sin a fháil i bhformáidí comhaid éagsúla.
    
Nuair is féidir, [Socraigh mar teanga réamhshocraithe](#generatedatasetsxml) Cuireann sé testOutOfDate tréith don domhan domhanda addAttributes de tacar sonraí. Is é seo an luach moladh bunaithe ar an eolas atá ar fáil a GenerateDatasetsXml. Mura bhfuil an luach cuí, é a athrú.
    
"Ach-de-dáta" anseo an-difriúil ó [&lt;reload Gach Neamhghnách (#reloadeverynminutes) , a dhéileálann le cé chomh cothrom le dáta ERDDAP 's eolas ar an tacar sonraí. An bhfuil&lt; testOutOfDate × Glacann córas go ERDDAP 's Tá eolas ar an tacar sonraí cothrom le dáta. An cheist&lt; testOutOfDate × Déileálann le: a dhéanann dealraitheach go bhfuil rud éigin mícheart leis an foinse na sonraí, is cúis le sonraí níos déanaí nach bhfuil inrochtana ag ERDDAP ?
    
###### Teideal{#title} 
*    [ **Teideal** ](#title)   (ó na [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) agus [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeáin meiteashonraí) Is tréith domhanda REQUIRED leis an cur síos gearr ar an tacar sonraí (de ghnáth&lt;= 95 carachtair). Mar shampla,
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * Ceachtar an tacar sonraí domhanda [foinse](#global-attributes) nó a domhanda&lt; addAttributes ú MUST san áireamh an tréith.
    * teideal tábhachtach mar gheall ar gach liosta de na tacair sonraí i láthair ag ERDDAP   (seachas torthaí cuardaigh) liostaí na tacair sonraí in ord aibítre, de réir teidil. Mar sin, más mian leat a shonrú ar an t-ordú tacar sonraí, nó tá roinnt tacar sonraí grúpáilte le chéile, caithfidh tú a chruthú teidil leis sin i gcuimhne. Liostaí go leor de na tacair sonraí (mar shampla, mar fhreagra ar chuardach catagóire) , taispeáin fo-thacar den liosta iomlán agus in ord difriúil. Mar sin, ba chóir an teideal do gach tacar sonraí seasamh ar a chuid féin.
    * Má tá an focal "DEPRECATED" sa teideal (gach litir) , ansin beidh an tacar sonraí a fháil rangú níos ísle i cuardaigh.
             
##### &lt; axisVariable &amp; gt;{#axisvariable} 
* [EN] ** &lt; axisVariable ú ** ] (Tuilleadh roghanna...) a úsáidtear chun cur síos gné (ar a dtugtar freisin "ais") .
Le haghaidh EDDGrid tacar sonraí, ceann amháin nó níos mó axisVariable Tá clibeanna REQUIRED, agus go léir [ dataVariable s s](#datavariable) roinnt i gcónaí / úsáid gach athróg ais. ( [Cén fáth?](#why-just-two-basic-data-structures)   [Cad a tharlaíonn mura bhfuil siad?](#dimensions) )   
Tá MUST a bheith ina athróg ais do gach gné de na hathróga sonraí.
Ais athróg MUST a shonrú san ord go n-úsáideann na hathróga sonraí iad.
(Is féidir le tacair sonraí EDDTable NACH úsáid&lt; axisVariable bhéil tags.)
Is sampla feola amach:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt; axisVariable × tacaíonn na fochlibeanna seo a leanas:
###### &lt; sourceName \\ &amp; gt;{#sourcename} 
* [EN]&lt; sourceName \\ (Tuilleadh eolais) - ainm an fhoinse sonraí don athróg. Níl an Tweet seo ar fáil ERDDAP™ úsáid nuair a iarraidh sonraí ón bhfoinse sonraí. Níl an Tweet seo ar fáil ERDDAP™ a lorg nuair a sonraí ar ais ón bhfoinse sonraí. Tá sé seo cás íogair. Níl an Tweet seo ar fáil.
###### &lt; destinationName \\ &amp; gt;{#destinationname} 
* [EN]&lt; destinationName \\ (Tuilleadh eolais) Is é an t-ainm don athróg a thaispeántar agus a úsáid ag ERDDAP™ úsáideoirí.
    * Níl an Tweet seo ar fáil. Má tá sé as láthair, an sourceName a úsáidtear.
    * Tá sé seo úsáideach mar is féidir leat a athrú cryptic nó corr sourceName .
    *    destinationName Is cás íogair.
    *    destinationName s MUST tús le litir (A-Z, a-z) agus MUST a leanúint ag 0 nó níos mó carachtair (A-Z, a-z, 0-9, agus \\_) . ('-'cheadú roimh ERDDAP™ leagan 1.10.) Ligeann an srian ainmneacha ais athróg a bheith mar an gcéanna i ERDDAP™ , sna comhaid freagartha, agus i ngach na bogearraí ina mbeidh na comhaid a úsáid, lena n-áirítear teangacha cláir (maith liom Python , Matlab , agus Java Amharc ar gach eolas) i gcás ina bhfuil srianta comhchosúla ar ainmneacha athraitheacha.
    * I EDDGrid datasets, na [domhanfhad, domhanleithead, airde, doimhneacht agus am](#destinationname) athróg ais speisialta.
         
######  axisVariable  &lt;addAttributes&gt; {#axisvariable-addattributes} 
* [EN]&lt; addAttributes ú (Tuilleadh roghanna...) Sainmhíníonn sraith OPTIONAL tréithe ( *ainm ainm* = = = *luach* ) a chuirtear le tréithe na foinse le haghaidh athróg, a dhéanamh ar na tréithe comhcheangailte le haghaidh athróg.
Má tá an athróg [foinse](#variable-addattributes) nó&lt; addAttributes ú san áireamh [ scale\\_factor agus/nó add\\_offset ](#scale_factor) tréithe, beidh a luachanna a úsáid chun na sonraí a dhíphacáil ón bhfoinse roimh dháileadh ar an gcliant
     (toradh Luach = foinse Luach \\* scale\\_factor + + + + add\\_offset ) . Beidh an athróg unpacked a bheith ar an gcineál sonraí céanna (mar shampla, snámhphointe) mar an scale\\_factor agus add\\_offset luachanna.
         
##### &lt; dataVariable &amp; gt;{#datavariable} 
* [EN] ** &lt; dataVariable ú ** ] (#datavariable) Is REQUIRED (do beagnach gach tacar sonraí) tag laistigh den&lt;dataset × chlib a úsáidtear chun cur síos ar athróg sonraí. Tá MUST a bheith 1 nó níos mó cásanna an chlib. Is sampla feola amach:

>&nbsp;&nbsp;&lt;dataVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>waterTemperature&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>sea\\_water\\_temperature&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataType>](#datatype)float&lt;/dataType>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Water Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[standard\\_name](#standard_name)">sea\\_water\\_temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/dataVariable>  

&lt; dataVariable × tacaíonn na fochlibeanna seo a leanas:
###### &lt; sourceName &amp; gt;{#sourcename-1} 
* [EN]&lt; sourceName ú (Tuilleadh eolais) - ainm an fhoinse sonraí don athróg. Níl an Tweet seo ar fáil ERDDAP™ úsáid nuair a iarraidh sonraí ón bhfoinse sonraí. Níl an Tweet seo ar fáil ERDDAP™ a lorg nuair a sonraí ar ais ón bhfoinse sonraí. Tá sé seo cás íogair. Níl an Tweet seo ar fáil.
###### Cruinnithe na Comhairle{#groups} 
CF tacaíocht breise do ghrúpaí le CF v1.8. Ag tosú i ~ 2020, NetCDF uirlisí tacaíocht a chur athróg i ngrúpaí i .nc comhad. I gcleachtas, ciallaíonn sé seo ach go bhfuil na hathróga ainm fada aithníonn an grúpa (s s) agus an t-ainm athraitheach, mar shampla, group1a/group2c/varName . ERDDAP™ tacaíonn sé le grúpaí trí na "/" a thiontú sa athróg&lt; sourceName × i "\\_" i athróg ar&lt; destinationName ^, mar shampla, group1a\\_group2c\\_varName . (Nuair a fheiceann tú go, ba chóir duit a thuiscint nach bhfuil grúpaí i bhfad níos mó ná coinbhinsiún syntax.) Nuair a bhíonn na hathróga liostaithe i ERDDAP™ , beidh na hathróga i ngrúpa le feiceáil le chéile, mimicking an grúpa bunúsacha. \\[ Más rud é ERDDAP™ , go háirithe GenerateDatasets Xml, Ní dhéanamh chomh maith le d'fhéadfadh sé le comhaid foinse go bhfuil grúpaí, le do thoil ríomhphost comhad samplach le Chris. John ag noaa.gov. \\] 

Is féidir le EDDTableFromFiles datasets úsáid roinnt speisialta-ionchódaithe, pseudo sourceName s a shainiú athróg sonraí nua, m.sh., a chur chun cinn tréith domhanda a bheith ina athróg sonraí. Féach ar [an doiciméad seo](#pseudo-sourcenames) .
######  HDF Amharc ar gach eolas{#hdf-structures} 
Ag tosú le ERDDAP™ v2.12, EDDGrid Seirbhís do Chustaiméirí EDDGrid Seirbhís do Chustaiméirí Is féidir le neamhphacáilte sonraí a léamh ó "struchtúr" i .nc 4 agus .hdf 4 comhaid. A aithint athróg atá ó struchtúr, an&lt; sourceName ú ní mór an fhormáid a úsáid: *Iomlán na Struchtúr*  |  *An t-eagrán is déanaí* , mar shampla grúpa1/myStruct | mo Chomhalta.

###### Luach seasta Foinse Ainm{#fixed-value-sourcenames} 
I tacar sonraí EDDTable, más mian leat a chruthú athróg (le luach aonair, seasta) nach bhfuil sa tacar sonraí foinse, úsáid:
```
    <sourceName>=*fixedValue*</sourceName>  
```
Insíonn an comhartha comhionann tosaigh ERDDAP™ go seasta Leanfaidh luach.

* I gcás athróg uimhriúil, ní mór an luach seasta a bheith ina luach críochta amháin nó NaN (cás neamhíogair, e.g., \\ = NaN) .
* Maidir le hathróga Curtain, ní mór an luach seasta a bheith singil, [JSON-stíl teaghrán](https://www.json.org/json-en.html)   (le carachtair speisialta éalú le carachtair \\) , e.g., \\ = "My \"Cumarsáid Speisialta" Curtain " .
* Le haghaidh athróg ama, sonraigh an luach seasta mar uimhir i "seconds since 1970-01-01T00:00:00Z" agus úsáid
aonaid = soicind ó 1970-01T00:00:00Z.
    
Na clibeanna eile do na&lt; dataVariable × obair amhail is dá mba athróg rialta é seo.
Mar shampla, a chruthú airde athróg ar a dtugtar le luach seasta de 0.0 (snámhphointe) , úsáid:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

I gcás cásanna neamhghnácha, is féidir leat a shonrú fiú actual\\_range addAttribute, a sháróidh na luachanna a bhfuiltear ag súil leo de headMin agus ceann scríbeMax (a bheadh comhionann thairis sin leis an seasta Luach) .
 
###### Script SourceNames/Derived Athróg{#script-sourcenamesderived-variables} 
Ag tosú le ERDDAP™ v2.10, i [EDDTableFromFiles](#eddtablefromfiles) , [EDDTableFromDatabase](#eddtablefromdatabase) , nó [Naisc ábhartha eile](#eddtablefromfilenames) tacar sonraí, an&lt; sourceName Is féidir bhéil a bheith
abairt (cothromóid a dhéanann meastóireacht ar luach amháin) , ag baint úsáide as an bhformáid
```
    <sourceName>=*expression*</sourceName>  
```
nó script (sraith de ráitis a thugann luach aonair ar ais) , ag baint úsáide as an bhformáid
```
    <sourceName>=*script*</sourceName>  
```
 ERDDAP™ ag brath ar an [Tionscadal Apache](https://www.apache.org/)   [ Java Léann Teanga (taiseachas aeir: fliuch) ](https://commons.apache.org/proper/commons-jexl/)   (ceadúnas: [taiseachas aeir: fliuch](https://www.apache.org/licenses/LICENSE-2.0) ) a mheas na habairtí agus a reáchtáil na scripteanna.
Déantar an ríomh le haghaidh athróg nua áirithe laistigh de shraith amháin de na torthaí, arís agus arís eile do gach sraitheanna.
Na habairtí agus scripteanna a úsáid Java - agus Java Script-mhaith syntax agus is féidir a úsáid aon cheann de na
 [oibreoirí agus modhanna a tógadh isteach JEXL](https://commons.apache.org/proper/commons-jexl/reference/syntax.html) .
Is féidir na scripteanna úsáid freisin modhanna (feidhmeanna) ó na ranganna seo:
*    [Uisce agus Séarachas](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2) , a bhfuil fillteán le haghaidh roinnt de na modhanna statach, am- agus féilire a bhaineann i com.cohort.util.Calendar2 ( [free](/acknowledgements#cohort-software) ) . Mar shampla,
Féilire2.parseToEpoch Soicind ( *sourceTime, dáta tréimhse saoil: ilbhliantúil* ) Beidh parse an fhoinse teaghrán ama tríd an teaghrán dateTimeFormat agus ar ais "seconds since 1970-01-01T00:00:00Z"   (taiseachas aeir: fliuch) luach dúbailte.
*    [Amharc ar gach eolas](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math) , is fillteán é le haghaidh beagnach gach ceann de na modhanna statach, a bhaineann le math i [cliceáil grianghraf a mhéadú Amharc ar gach eolas](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html) . Mar shampla, Math.atan2 ( *y, x* ) Bíonn i gcomhordanáidí dronuilleogach (y, x) agus tuairisceáin comhordanáidí Polar (sraith de doubles le \\[ r, theta \\] ) .
*    [Amharc ar gach eolas](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2) , a bhfuil fillteán le haghaidh beagnach gach ceann de na modhanna statach, math-a bhaineann i com.cohort.util. Amharc ar gach eolas ( [free](/acknowledgements#cohort-software) ) . Mar shampla,
Matamaitic 2. ( *d, nPlaces* ) beidh bhabhta d go dtí an líon sonraithe de dhigit ar dheis an phointe deachúil.
* String, a thugann rochtain duit ar gach ceann de na statach, modhanna a bhaineann le Curtain i [cliceáil grianghraf a mhéadú String](https://docs.oracle.com/javase/8/docs/api/java/lang/String) . Rudaí teaghrán i ERDDAP™ Is féidir le habairtí agus scripteanna úsáid a bhaint as aon cheann de a bhaineann Java modhanna, mar a thuairiscítear sa java.lang. Doiciméid teaghrán. Mar shampla, String.valueOf (taiseachas aeir: fliuch) Beidh thiontú an luach dúbailte d isteach i Curtain (cé gur féidir leat "+" a úsáid freisin) .
*    [String2sa](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2) , a bhfuil fillteán don chuid is mó de na statach, String- agus modhanna a bhaineann le sraith i com.cohort.util.String2 ( [free](/acknowledgements#cohort-software) ) . Mar shampla, String2 .z Seirbhís do Chustaiméirí ( *líon, Digits* ) a chur 0 ar chlé an teaghrán uimhir ionas go mbeidh an líon iomlán na n digití Digits (e.g., String2 .z Seirbhís do Chustaiméirí ("6", 2) beidh ar ais "06") .
*    [sraith](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row) , a bhfuil modhanna neamh-statach chun rochtain a fháil ar na sonraí ó na colúin éagsúla i sraith reatha an tábla sonraí foinse. Mar shampla, row.columnString ("bliain") léann an luach ón gcolún "bliana" mar String, ach, row.column Níl an Tweet seo ar fáil ("bliain") léann an luach ón gcolún "bliain" mar slánuimhir.

Ar chúiseanna slándála, ní féidir abairtí agus scripteanna a úsáid ranganna eile seachas iad siúd 6. ERDDAP™ forfheidhmiú an teorannú trí a chruthú blacklist réamhshocraithe (a blacklists gach rang) agus ansin whitelist (a cheadaíonn go sonrach na 6 ranganna a thuairiscítear thuas) . Más gá duit modhanna eile agus / nó ranganna eile a dhéanamh do chuid oibre, le do thoil ríomhphost d'iarratais ar Chris. John ag noaa.gov.
    
###### Éifeachtúlacht
Maidir le tacar sonraí EDDTableFromFiles, níl ach an-, an-íosmhéid (is dócha nach bhfuil faoi deara) moilliú le haghaidh iarrataí ar shonraí ó na hathróga. I gcás EDDTableFromDatabase, tá pionós luas ollmhór le haghaidh iarrataí go n-áiríonn srianta ar na hathróga (m.sh., ( &amp; fada 0360 ×30 &amp; fada 0360&lt;40) toisc nach féidir na srianta a rith tríd an mbunachar sonraí, mar sin tá an bunachar sonraí a thabhairt ar ais i bhfad níos mó sonraí a ERDDAP™   (a bhfuil an-am Tógann) ionas go ERDDAP™ Is féidir a chruthú ar an athróg nua agus an srian a chur i bhfeidhm. Chun an cás is measa a sheachaint (i gcás nach bhfuil aon srianta á rith chuig an mbunachar sonraí) , ERDDAP™ throws teachtaireacht earráide ionas nach bhfuil an bunachar sonraí a thabhairt ar ais ar an ábhar ar fad ar an tábla. (Más mian leat a sheachbhóthar seo, cuir srian le colún neamh-script a bheidh i gcónaí fíor, m.sh., &amp; am&lt;3000-01-01.) Ar an gcúis seo, le EDDTableFromDatabase, is dócha gur fearr colún díorthaithe a chruthú sa bhunachar sonraí seachas úsáid sourceName =scríbhinn i ERDDAP .

###### Cén chaoi a bhfuil Léirithe ann? (Nó Script) An bhfuil Úsáidte:
Mar fhreagra ar iarratas úsáideora ar shonraí tabular, ERDDAP™ faigheann sonraí ó shraith de chomhaid foinse. Beidh gach comhad foinse ghiniúint tábla amh (díreach ón bhfoinse) sonraí. ERDDAP™ ansin dul tríd an tábla na sonraí amh, as a chéile de réir a chéile, agus meastóireacht a dhéanamh ar an abairt nó script uair amháin do gach sraith, d'fhonn a chruthú colún nua a bhfuil an abairt nó script mar sourceName .
    
###### Socraigh mar teanga réamhshocraithe
Tabhair faoi deara go GenerateDatasets Tá Xml go hiomlán aineolach nuair is gá a chruthú athróg le&lt; sourceName × = *abairt abairt* &lt;/ Baile sourceName ú. Tá tú a chruthú ar an athróg i datasets.xml de láimh.

###### Samplaí Léirithe:
Seo roinnt samplaí iomlána de athróg sonraí a úsáideann léiriú a chruthú colún nua de shonraí. Táimid ag súil go bhfuil na samplaí (agus leaganacha acu) Clúdóidh sé thart ar 95% de úsáid gach abairt-díorthaithe sourceName s.

###### Ag teacht ar "dáta" ar leith agus "time" colúin isteach i gcolún ama aontaithe:
```
    <dataVariable>
        <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("date") + "T" + 
            row.columnString("time") + "Z", "yyyy-MM-dd'T'HH:mm:ss'Z'")</sourceName> 
        <destinationName>time</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">seconds since 1970-01-01</att>
        </addAttributes>
    </dataVariable>
```
Sin sourceName Déanann abairt nua "time" colún ag concatenating na luachanna String ón "dáta" ( yyyy-MM-dd ) agus "time"   (taiseachas aeir: fliuch) colúin ar gach sraith den chomhad foinse, agus ag athrú go teaghrán isteach "seconds since 1970-01-01"   (taiseachas aeir: fliuch) luach dúbailte.

Nó ar ndóigh, beidh ort a shaincheapadh ar an teaghrán formáid ama chun déileáil leis an bhformáid ar leith i ngach dáta foinse dataset agus colúin am, féach ar an
 [data protection](#string-time-units) .

Go teicniúil, ní gá duit a úsáid Féilire2.parseToEpoch Soicind () a thiontú ar an dáta comhcheangailte + uair i epochseconds. D'fhéadfá pas a fháil ach an dáta+time Curtain go ERDDAP™ agus sonrófar an fhormáid (e.g.,
 yyyy-MM-dd 'T'H: mm:s'Z') tríd an tréith aonad. Ach tá buntáistí suntasacha ann chun athrú go epochseconds - go háirithe, is féidir le EDDTableFromFiles súil a choinneáil go héasca ar raon na luachanna ama i ngach comhad agus mar sin cinneadh a dhéanamh go tapa cibé acu chun breathnú i gcomhad ar leith agus é ag freagairt d'iarraidh a bhfuil srianta ama.

Is fadhb a bhaineann leis an ngá a chruthú dáta aontaithe colún + am ó fhoinse le bliain ar leith, mí, dáta, uair an chloig, nóiméad, an dara. Tá an réiteach an-chosúil, ach beidh ort go minic a nialas-pad go leor de na réimsí, ionas go, mar shampla, mí (1 - 12) agus dáta (1 - 31) i gcónaí 2 dhigit. Seo sampla le bliain, mí, dáta:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
Is fadhb a bhaineann leis an ngá a chruthú colún domhanleithead aontaithe nó fada trí na sonraí sa tábla foinse céimeanna ar leith, nóiméad, agus soicind colúin, gach stóráil mar slánuimhreacha. Mar shampla,
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### Tiontaigh colún darb ainm "lon" le luachanna fada ó 0 - 360 ° isteach i gcolún darb ainm "longitude" le luachanna ó -180 - 180 °
```
    <dataVariable>
        <sourceName>=Math2.anglePM180(row.columnDouble("lon"))</sourceName> 
        <destinationName>longitude</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">degrees\\_east</att>
        </addAttributes>
    </dataVariable>
```
Sin sourceName déanann an abairt colún nua "fhad" tríd an luach dúbailte ón gcolún "lon" a thiontú ar gach sraith den chomhad foinse (presumably le 0 - 360 luachanna) , agus trí athrú go isteach -180 go 180 luach dúbailte.

Más mian leat ina ionad sin a thiontú luachanna fada foinse de -180 - 180 ° isteach 0 - 360 °, úsáid
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
Naming an dá Variables Fada:
Má tá an tacar sonraí a bheith 2 athróg domhanfhad, molaimid ag baint úsáide as destinationName = Fad don athróg -180 - 180 ° agus destinationName an Ríocht Aontaithe (agus longName =\\ "Longitude 0-360 °") don athróg 0 - 360 °. Tá sé seo tábhachtach toisc go n-úsáideann úsáideoirí Cuardach Casta uaireanta chun sonraí a chuardach laistigh de raon leitheadach ar leith. Beidh an cuardach ag obair níos fearr má tá domhanfhad go seasta -180 - 180 ° luachanna do gach tacar sonraí. Chomh maith leis sin, beidh geospatial an tacar sonraí \\_lon\\_min, geospatial \\_lon\\_max, Westernmost\\_Easting and Easternmost\\_Eastings tréithe domhanda a shocrú ansin ar bhealach comhsheasmhach (le luachanna fada -180 go 180 °) ;
    
###### Tiontaigh colún darb ainm "tempF" le luachanna teochta i gcéim \\_ F isteach i gcolún ainmnithe "tempC" le teocht i méid \\_ C:
```
    <dataVariable>
        <sourceName>=(row.columnFloat("tempF")-32)\\*5/9</sourceName> 
        <destinationName>tempC</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_C</att>
        </addAttributes>
    </dataVariable>
```
Sin sourceName a dhéanann an abairt nua "tempC" colún ag athrú an leibhéal snámhphointe \\_ Luach F ón gcolún "tempF" ar gach sraith den chomhad foinse isteach céim snámhphointe \\_ Luach C.

Tabhair faoi deara gur féidir le do tacar sonraí an dá an teocht bunaidh F athróg agus an teocht nua C athróg ag a bhfuil athróg eile le
```
    <sourceName>tempF</sourceName>
```
###### Ag athrú gaoithe "luas" agus "treoir" colúin i dhá cholún leis na comhpháirteanna u,v
* A dhéanamh u athróg, úsáid
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* A dhéanamh v athróg, úsáid
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
Nó, a tugadh u,v:
* A dhéanamh athróg luas, úsáid
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* A dhéanamh athróg treo, úsáid
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### Sampla Scripte:
Seo sampla de ag baint úsáide as script, ní hamháin léiriú, mar sourceName . Táimid ag súil go scripteanna, i gcomparáid le habairtí, Ní bheidh ag teastáil go minic. Sa chás seo tá an sprioc a thabhairt ar ais neamh-NaN luach ar iarraidh (--) le haghaidh luachanna teochta lasmuigh de raon ar leith. Tabhair faoi deara go bhfuil an script an chuid tar éis an "=".
```
    <dataVariable>
        <sourceName>=var tc=row.columnFloat("tempC"); return tc&gt;35 || tc&lt;-5? -99.0f : tc\\*9/5+32;</sourceName> 
        <destinationName>tempF</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_F</att>
        </addAttributes>
    </dataVariable>
```
###### Bratach crua
Má athraíonn tú an abairt nó an script a shainmhínítear i sourceName , ní mór duit a shocrú [duille dath glas](/docs/server-admin/additional-information#hard-flag) don tacar sonraí mar sin an ERDDAP™ scriosadh gach ceann de na faisnéise i dtaisce le haghaidh an tacar sonraí agus ath-léigh gach comhad sonraí (ag baint úsáide as an abairt nua nó script) an chéad uair eile ualaí sé an tacar sonraí. Nó, is féidir leat é a úsáid [Seirbhís do Chustaiméirí](#dasdds) a dhéanann comhionann le bratach chrua a leagan síos.

###### Ionchód cuí
Níl sé seo ach annamh ábhartha: Toisc go bhfuil na habairtí agus scripteanna scríofa i datasets.xml , a bhfuil doiciméad XML, ní mór duit ionchódú faoin gcéad aon&lt;, \\ uaire, agus carachtair sna habairtí agus scripteanna mar&lt;, &amp; gt, agus &amp; .

###### Fadhbanna Coiteann
Tá fadhb coitianta go bhfuil tú a chruthú athróg le sourceName = = = *abairt abairt* ach tá an colún mar thoradh ar na sonraí ach luachanna ar iarraidh. Nó, tá roinnt sraitheanna den cholún nua luachanna ar iarraidh agus a cheapann tú nár chóir iad. Is é an fhadhb bhunúsach go bhfuil rud éigin mícheart leis an abairt agus ERDDAP ag athrú go earráid i luach ar iarraidh. Chun an fhadhb a réiteach,

* Féach ar an abairt a fheiceáil cad a d'fhéadfadh an fhadhb a bheith.
* Féach ar [logáil isteach.](/docs/server-admin/additional-information#log) , a léiríonn an chéad teachtaireacht earráide a ghintear le linn a chruthú gach colún nua.

Is iad na cúiseanna coitianta:

* D'úsáid tú an cás mícheart. Tá Léirithe agus scripteanna cás íogair.
* D'fhág tú ainm an ranga. Mar shampla, ní mór duit Math.abs a úsáid () , ní hamháin abs () .
* Ní raibh tú a dhéanamh comhshónna cineál. Mar shampla, má tá cineál sonraí luach paraiméadar Teaghrán agus tá luach dúbailte agat, ní mór duit dúbailte a thiontú isteach i String trí "" + d.
* Ní dhéanann an t-ainm colún san abairt mheaitseáil go díreach leis an ainm colún sa chomhad (nó d'fhéadfadh an t-ainm a bheith difriúil i roinnt comhaid) .
* Tá earráid syntax san abairt (e.g., ar iarraidh nó breise ') ').

Má fhaigheann tú cabhair bhfostú nó gá,
Cuir na sonraí san áireamh agus féach ar ár [alt ar thacaíocht bhreise a fháil](/docs/intro#support) .
        
###### &lt; destinationName &amp; gt;{#destinationname-1} 
* [EN]&lt; destinationName ú (Tuilleadh eolais) - an t-ainm don athróg a thaispeánfar agus a úsáidfidh ERDDAP™ úsáideoirí.
    * Níl an Tweet seo ar fáil. Má tá sé as láthair, an [ sourceName ](#sourcename) a úsáidtear.
    * Tá sé seo úsáideach mar is féidir leat a athrú cryptic nó corr sourceName .
    *    destinationName Is cás íogair.
    *    destinationName s MUST tús le litir (A-Z, a-z) agus MUST a leanúint ag 0 nó níos mó carachtair (A-Z, a-z, 0-9, agus \\_) . ('-'cheadú roimh ERDDAP™ leagan 1.10.) Ligeann an srian seo ainmneacha athraitheacha sonraí a bheith mar an gcéanna i ERDDAP™ , sna comhaid freagartha, agus i ngach na bogearraí ina mbeidh na comhaid a úsáid, lena n-áirítear teangacha cláir (maith liom Python , Matlab , agus Java Amharc ar gach eolas) i gcás ina bhfuil srianta comhchosúla ar ainmneacha athraitheacha.
    * I tacair sonraí EDDTable, [domhanfhad, domhanleithead, airde (nó doimhneacht) , agus am](#destinationname) athróg sonraí speisialta.
             
###### &lt;data recovery Cineál &amp; F;{#datatype} 
* [EN]&lt;dataType ×) (#cineál) - sonraítear an cineál sonraí a thagann ón bhfoinse. (I gcásanna áirithe, mar shampla, nuair atá sonraí a léamh ó chomhaid ASCII, sonraíonn sé conas ba cheart na sonraí a thagann ón bhfoinse a stóráil.) 
    * Tá sé seo REQUIRED ag roinnt cineálacha tacar sonraí agus IGNORED ag daoine eile. Cineálacha tacar sonraí a éilíonn seo le haghaidh a n- dataVariable s iad: EDDGrid Ó XxxFiles, EDDTableFromXxxFiles, EDDTableFromM WFS EDDTableFromNOS, EDDTableFrom SOS . Cineálacha tacar sonraí eile neamhaird a dhéanamh ar an chlib seo toisc go bhfaigheann siad an t-eolas ón bhfoinse.
         
    * Tá luachanna bailí aon cheann de na caighdeán [ ERDDAP™ cineálacha sonraí](#data-types) móide boolean (féach thíos) . Tá na hainmneacha sonraí Type cás-íogair.
         
###### sonraí boolean{#boolean-data} 
*    ["boolean"](#boolean-data) Is cás speisialta.
    * Go hinmheánach, ERDDAP™ Ní thacaíonn le cineál boolean toisc nach féidir le booleans luachanna ar iarraidh a stóráil agus ní thacaíonn an chuid is mó de na cineálacha comhaid le cíocha. Freisin, DAP Ní tacaíocht booleans, mar sin ní bheadh aon bhealach caighdeánach chun athróg boolean cheist.
    * Ag sonrú "boolean" do na sonraí Cineál i datasets.xml a chur faoi deara luachanna boolean a stóráil agus ionadaíocht mar bytes: 0 = False, 1=true, 127 = missing\\_value .
    * Is féidir le húsáideoirí srianta a shonrú trí na luachanna uimhriúla a úsáid (mar shampla, "isAlive = 1") .
    *    ERDDAP™ riarthóirí gá uaireanta a bhaint as an "boolean" sonraí Cineál i datasets.xml a insint ERDDAP™ conas idirghníomhú leis an bhfoinse sonraí (e.g., luachanna boolean a léamh ó bhunachar sonraí gaolmhar agus iad a thiontú go 0, 1, nó 127) .
         
* Más mian leat a athrú athróg sonraí ó na dataType sna comhaid foinse (mar shampla, gearr) i roinnt sonraí eile Cineál sa tacar sonraí (mar shampla, int) , ná húsáid&lt;dataType × a shonrú cad ba mhaith leat. (Oibríonn sé le haghaidh roinnt cineálacha tacar sonraí, ach ní daoine eile.) Ina áit sin:
    * Úsáid Úsáid Úsáidte&lt;dataType × a shonrú cad atá sna comhaid (mar shampla, gearr) .
    * I an&lt; addAttributes × don athróg, cuir [ scale\\_factor ](#scale_factor) tréith leis na sonraí nua Cineál Cineál Cineál cineál (mar shampla, int) agus luach 1, mar shampla,
```
            <att name="scale\\_factor" type="int">1</att>  
```
######  dataVariable  &lt;addAttributes&gt; {#datavariable-addattributes} 
* [EN]&lt; addAttributes ú (Tuilleadh roghanna...) -- Sainmhíníonn sraith de tréithe ( *ainm ainm* = = = *luach* ) a chuirtear le tréithe na foinse le haghaidh athróg, a dhéanamh ar na tréithe comhcheangailte le haghaidh athróg. Níl an Tweet seo ar fáil.
Má tá an athróg [foinse](#variable-addattributes) nó&lt; addAttributes ú san áireamh [ scale\\_factor agus/nó add\\_offset ](#scale_factor) tréithe, beidh a luachanna a úsáid chun na sonraí a dhíphacáil ón bhfoinse roimh dháileadh ar an gcliant. Beidh an athróg unpacked a bheith ar an gcineál sonraí céanna (mar shampla, snámhphointe) mar an scale\\_factor agus add\\_offset luachanna.
        
###### Athrógach&lt;addAttributes&gt; {#variable-addattributes} 
* [EN] ** Tréithe éagsúla / Athróg&lt; addAttributes ú ** ] (Tuilleadh roghanna...) --&lt; addAttributes ^ Is tag OPTIONAL laistigh de&lt; axisVariable ú agus&lt; dataVariable × chlib a úsáidtear chun tréithe an athróg a athrú.
    
    *    ** Úsáid athróg ar&lt; addAttributes ^ a athrú tréithe an athróg ar. **  ERDDAP™ chéile athróg tréithe ó fhoinse na tacar sonraí (** foinse **) agus an athróg**  addAttributes  **a shainiú tú i datasets.xml   (a bhfuil tosaíocht acu) a dhéanamh ar an athróg ar "** le chéile ** ", a bhfuil an méid ERDDAP™ úsáideoirí a fheiceáil. Dá bhrí sin, is féidir leat é a úsáid addAttributes a athshainmhíniú na luachanna na bhfoinsí, cuir tréithe nua, nó tréithe a bhaint.
    * Féach ar an [ ** &lt; addAttributes ú **data] (Tuilleadh eolais) a bhaineann le domhanda agus athróg** &lt; addAttributes ú ** .
    *    ERDDAP™ Breathnaíonn agus a úsáideann go leor de na tréithe ar bhealaí éagsúla. Mar shampla, tá na luachanna colorBar ag teastáil chun athróg a dhéanamh ar fáil trí WMS , ionas gur féidir léarscáileanna a dhéanamh le colorBars comhsheasmhach.
    *    [An domhanfhad, domhanleithead, airde (nó doimhneacht) , agus athróg ama](#destinationname) go leor meiteashonraí cuí a fháil go huathoibríoch (mar shampla, [minicíocht uisce: flúirseach](#units) ) .
    * Sampla A&lt; addAttributes × le haghaidh athróg sonraí:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

Is cúis leis an tréith numberOfObservations folamh an tréith foinse (más ann) a bhaint as an liosta deiridh, le chéile tréithe.
    * Cuidíonn an fhaisnéis seo a sholáthar ERDDAP™ post níos fearr a dhéanamh agus cabhraíonn sé le húsáideoirí tuiscint a fháil ar na tacair sonraí.
Déanann meiteashonraí Dea usable tacar sonraí.
Déanann meiteashonraí neamhleor gan úsáid.
Tabhair an t-am chun post maith a dhéanamh le tréithe meiteashonraí.
    
###### Comments faoi tréithe athraitheacha atá speisialta i ERDDAP :

######  actual\\_range  {#actual_range} 
*    [ ** actual\\_range ** ](#actual_range) Is tréith athróg IMMENDED. Mar shampla,

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* Tá an tréith ó na [Seirbhísí ar líne COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) agus [CF 1.7+](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) caighdeáin meiteashonraí.
* Má tá sé i láthair, MUST sé ina sraith de dhá luachanna den chineál sonraí céanna leis an gcineál sonraí ceann scríbe an athraitheach, ag sonrú an iarbhír (nach bhfuil an teoiriciúil nó a cheadaítear) luachanna íosta agus uasta na sonraí don athróg sin.
* Má tá na sonraí pacáilte leis [ scale\\_factor agus/nó add\\_offset ](#scale_factor) , actual\\_range ní mór go mbeadh luachanna unpacked agus a bheith ar an gcineál sonraí céanna leis na luachanna unpacked.
* Do roinnt foinsí sonraí (mar shampla, gach EDDTableFrom... Comhaid tacar sonraí) , ERDDAP™ a chinneann an actual\\_range de gach athróg agus leagann an actual\\_range tréith. Le foinsí sonraí eile (mar shampla, bunachair sonraí a bhaineann, Cassandra, DAP PER, Hyrax ) , d'fhéadfadh sé a bheith troublesome nó burdensome don fhoinse a ríomh ar an raon, mar sin ERDDAP™ nach iarraidh air. Sa chás seo, is fearr más féidir leat a shocrú actual\\_range   (go háirithe don domhanfhad, domhanleithead, airde, doimhneacht, agus athróg ama) trí chur leis actual\\_range tréith do gach athróg [&lt; addAttributes ú (Tuilleadh eolais) don tacar sonraí i datasets.xml , mar shampla,

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* Do uimhriúil [am agus amstamp athróg](#time-units) , ba cheart gurb iad na luachanna a shonraítear an fhoinse ábhartha (tréimhse saoil: ilbhliantúil) luachanna uimhriúla. Mar shampla, má stóráiltear na luachanna ama foinse mar "laethanta ó 1985-01", ansin an actual\\_range a shonrú i "lá ó 1985-01-01". Agus más mian leat a tharchur chuig NOW mar an dara luach le haghaidh sonraí in aice-réad-am atá cothrom le dáta go tréimhsiúil, ba chóir duit a úsáid NaN. Mar shampla, raon sonraí de 1985-01-17 a shonrú go dtí NOW, úsáid

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* Más rud é actual\\_range ar a dtugtar (trí ERDDAP™ é a ríomh nó é a chur leis trí&lt; addAttributes ú), ERDDAP™ é a thaispeáint don úsáideoir ar an bhFoirm Rochtana Sonraí ( * datasetID * ..) agus Déan leathanaigh ghréasáin Graph ( * datasetID * .graf) don tacar sonraí sin agus é a úsáid nuair a ghineann siad meiteashonraí FGDC agus ISO 19115. Chomh maith leis sin, an 7 lá deiridh ama actual\\_range a úsáidtear mar an fo-thacar ama réamhshocraithe.
* Más rud é actual\\_range is eol, is féidir le húsáideoirí an [min () agus max () feidhmeanna](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) in iarrataí, is minic an-úsáideach.
* Do gach EDDTable... tacair sonraí, más rud é actual\\_range Is maith liom é (trí tú a shonrú nó trí ERDDAP™ é a ríomh) , ERDDAP™ beidh sé in ann aon iarrataí ar shonraí a dhiúltú go tapa taobh amuigh den raon sin. Mar shampla, má fhreagraíonn luach ama is ísle an tacar sonraí do 1985-01-17, ansin diúltófar d'iarratas ar na sonraí go léir ó 1985-01-01 via 1985-01-16 láithreach leis an teachtaireacht earráide "Ní tháirgtear aon torthaí meaitseáil." Déanann sé seo actual\\_range píosa an-tábhachtach de meiteashonraí, mar is féidir é a shábháil ERDDAP™ a lán de iarracht agus an t-úsáideoir a shábháil a lán ama. Agus buaicphointí seo go bhfuil an actual\\_range ní mór luachanna a bheith níos cúinge ná raon iarbhír na sonraí; ar shlí eile, ERDDAP™ Is féidir a rá go hearráideach "Níl aon sonraí comhoiriúnacha" nuair a bhíonn sonraí ábhartha ann.
* Nuair a roghnaíonn úsáideoir fo-thacar sonraí agus iarratais ar chineál comhaid go n-áirítear meiteashonraí (mar shampla, .nc ) , ERDDAP™ modifies actual\\_range sa chomhad freagartha chun raon an fo-thacar a léiriú.
* Féach freisin [ data\\_min agus data\\_max ](#data_min-and-data_max) , atá ar bhealach eile a shonrú ar an actual\\_range . Mar sin féin, tá siad seo dímheasta anois go actual\\_range Tá sé sainithe ag CF 1.7+.
         
###### Nótaí Dath Barra{#color-bar-attributes} 
Tá roinnt tréithe athróg OPTIONAL a shonraíonn na tréithe réamhshocraithe molta le haghaidh barra dath (a úsáidtear chun luachanna sonraí a thiontú i dathanna ar íomhánna) don athróg seo.
* Má tá tú i láthair, úsáidtear an t-eolas seo mar fhaisnéis réamhshocraithe ag griddap agus tabledap aon uair a iarrann tú íomhá a úsáideann barra dath.
* Mar shampla, nuair a sonraí gridded domhanleithead-fhad breactha mar clúdach ar léarscáil, sonraíonn an barra dath conas na luachanna sonraí a thiontú go dathanna.
* Ag na luachanna is féidir ERDDAP™ íomhánna a chruthú a úsáideann barra dath comhsheasmhach ar fud iarrataí éagsúla, fiú nuair a athraíonn an t-am nó luachanna gné eile.
* Cruthaíodh na hainmneacha tréith le húsáid i ERDDAP . Níl siad ó chaighdeán meiteashonraí.
* Is iad na tréithe a bhaineann leis an mbarra dath:
    *    ** colorBarMinimum ** Sonraíonn an luach íosta ar an dathBar. Mar shampla,

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * Má tá na sonraí pacáilte leis [ scale\\_factor agus/nó add\\_offset ](#scale_factor) , sonrófar an colorBarMinimum mar luach neamhphacáilte.
    * Luachanna sonraí níos ísle ná colorBarMinimum Tá ionadaíocht ag an dath céanna mar colorBarMinimum luachanna.
    * Ba chóir go mbeadh an tréith [cineál = "dúbailte"](#attributetype) , beag beann ar chineál an athróg sonraí.
    * Is é an luach de ghnáth uimhir bhabhta deas.
    * cleachtais is fearr: Molaimid luach beagán níos airde ná an luach sonraí íosta.
    * Níl aon luach réamhshocraithe.
*    ** colorBarMaximum ** Sonraíonn an luach uasta ar an dathBar. Mar shampla,

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * Má tá na sonraí pacáilte leis [ scale\\_factor agus/nó add\\_offset ](#scale_factor) , sonrófar an colorBarMinimum mar luach neamhphacáilte.
    * Luachanna sonraí níos airde ná colorBarMaximum Tá ionadaíocht ag an dath céanna mar colorBarMaximum luachanna.
    * Ba chóir go mbeadh an tréith [cineál = "dúbailte"](#attributetype) , beag beann ar chineál an athróg sonraí.
    * Is é an luach de ghnáth uimhir bhabhta deas.
    * cleachtais is fearr: Molaimid luach beagán níos ísle ná an luach sonraí uasta.
    * Níl aon luach réamhshocraithe.
*    **dath bláth bándearg Seirbhís do Chustaiméirí** Sonraíonn an pailéad don colorBar. Mar shampla,
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * Gach duine ERDDAP™ suiteálacha tacaíocht a thabhairt do na pailéad caighdeánach: BlackBlueWhite, BlackRedWhite, BlackWhite, BlueWhiteRed, LightRainbow, Aigéan, AigéinDepth, Rainbow, RedWhiteBlue, ReverseRainbow, Topagrafaíocht, Barragrafaíocht \\[ Chuir in v1.74 \\] , WhiteBlack, WhiteBlueBlack, agus WhiteRedBlack.
    * Má tá tú suiteáilte [pailéad breise](/docs/server-admin/additional-information#palettes) , is féidir leat tagairt a dhéanamh do cheann acu.
    * Mura bhfuil an tréith seo i láthair, is é BlueWhiteRed an réamhshocraithe má \\-1\\* colorBarMinimum = = = colorBarMaximum ; ar shlí eile tá an mhainneachtain Rainbow.
*    **cliceáil grianghraf a mhéadú** Sonraíonn an scála don colorBar. Mar shampla,
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * Tá luachanna bailí Líneach agus Logáil.
    * Má tá an luach Logáil, colorBarMinimum ní mór a bheith níos mó ná 0.
    * Mura bhfuil an tréith seo i láthair, is é an réamhshocraithe Linear.
*    **dath bláth bándearg BarContinuous** sonraí an bhfuil an colorBar pailéad leanúnach na dathanna, nó an bhfuil an colorBar roinnt dathanna scoite. Mar shampla,
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * Tá luachanna bailí na teaghráin fíor agus bréagach.
    * Más rud é nach bhfuil an tréith i láthair, tá an réamhshocraithe fíor.
*    **cliceáil grianghraf a mhéadú** Sonraíonn an líon réamhshocraithe na n-alt ar an colorBar. Mar shampla,
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * Tá luachanna bailí slánuimhreacha dearfacha.
    * Mura bhfuil an tréith seo i láthair, is é an mhainneachtain \\-1, a insíonn ERDDAP™ a phiocadh ar líon na rannóga bunaithe ar raon an colorBar.
######  WMS  {#wms} 
Na príomhcheanglais maidir le hathróg a bheith inrochtana trí ERDDAP 's WMS Tá freastalaí:
* Ní mór an tacar sonraí a bheith EDDGrid ... tacar sonraí.
* An MUST athróg sonraí a bheith ina athróg gridded.
* Tá na sonraí athróg athróg ais domhanfhad agus domhanleithead. (Tá athróg ais eile OPTIONAL.) 
* Tá MUST roinnt luachanna fada idir -180 agus 180.
* An bhfuil colorBarMinimum agus colorBarMaximum tréithe MUST a shonrú. (Tá tréithe barra dath eile OPTIONAL.) 

######  data\\_min agus data\\_max  {#data_min-and-data_max} 
*    [ ** data\\_min ** agus ** data\\_max ** ](#data_min-and-data_max) -- Tá na tréithe athróg deprecated sainithe sa Domhan Aigéan Circulation Experiment (Caitheamh Aimsire) cur síos meiteashonraí. Mar shampla,

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * Molaimid go n-úsáideann tú [ actual\\_range ](#actual_range) , in ionad data\\_min agus data\\_max , mar gheall ar actual\\_range Tá sé sainithe anois ag an tsonraíocht CF.
    * Má tá siad i láthair, ní mór dóibh a bheith ar an gcineál sonraí céanna leis an gcineál sonraí ceann scríbe an athraitheach, agus a shonrú ar an iarbhír (nach bhfuil an teoiriciúil nó a cheadaítear) luachanna íosta agus uasta na sonraí don athróg sin.
    * Má tá na sonraí pacáilte leis [ scale\\_factor agus/nó add\\_offset ](#scale_factor) , data\\_min agus data\\_max ní mór a bheith luachanna unpacked ag baint úsáide as an gcineál sonraí unpacked.
         
###### athraitheach drawLandMask  {#variable-drawlandmask} 
*    [ ** drawLandMask ** ](#variable-drawlandmask) -- Is é seo an tréith athraitheach a úsáideann ERDDAP™   (agus aon caighdeáin meiteashonraí) a shonraíonn an luach réamhshocraithe don rogha "Draw Land Mask" ar an tacar sonraí a dhéanamh A Graph foirm ( * datasetID * .graf) agus don pharaiméadar &amp; talún i URL iarraidh léarscáil de na sonraí. Mar shampla,
    ```
        <att name="drawLandMask">under</att>  
    ```
Féach an [ drawLandMask forbhreathnú](#drawlandmask) .
###### Ionchódú{#encoding} 
*    [ **Cealaigh** ](#encoding) 
    * Is féidir an tréith a úsáid ach amháin le hathróga Curtain.
    * Tá an tréith molta go láidir.
    * Tá an tréith ó na [ NetCDF Treoir an úsáideora (NUG) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html) .
    * Go hinmheánach i ERDDAP™ , Tá Teaghrán sraith de 2-byte carachtair a úsáideann an [Unicode sraith carachtar UCS-2](https://en.wikipedia.org/wiki/UTF-16) .
    * Cineálacha comhaid go leor ach tacaíocht 1-byte carachtair i Strings agus dá bhrí sin is gá an tréith a aithint a bhaineann
         [bláthanna cumhra: cumhráin (AKA cód leathanach) ](https://en.wikipedia.org/wiki/Code_page) a shainmhíníonn conas na luachanna féideartha 256 a mhapáil chuig sraith de 256 carachtair a tarraingíodh ón sraith carachtar UCS-2 agus/nó ón gcóras ionchódaithe, m.sh., [UTF-8](https://en.wikipedia.org/wiki/UTF-8)   (a éilíonn idir 1 agus 4 beart in aghaidh an charachtar) .
    * Tá luachanna le haghaidh \\_Encoding cás-íogair.
    * Go teoiric, ERDDAP™ D'fhéadfadh tacú le aitheantóirí \\_Encode ó [seo liosta IANA](https://www.iana.org/assignments/character-sets/character-sets.xhtml) , ach i gcleachtas, ERDDAP™ faoi láthair
        * Seirbhís do Chustaiméirí (faoi deara go bhfuil sé Fleasc, ní underscores) , a bhfuil an buntáiste go bhfuil sé comhionann leis an chéad 256 carachtair de Unicode, agus
        * UTF-8.
    * Nuair a léamh comhaid foinse, Is é an luach réamhshocraithe ISO-8859-1, ach amháin le haghaidh comhaid netcdf-4, áit a bhfuil an réamhshocraithe UTF-8.
    * Is saincheist leanúnach troublesome é seo toisc go n-úsáideann go leor comhad foinse charsets nó ionchódú atá difriúil ó ISO-8859-1, ach ná déan an charset nó an ionchódú a aithint. Mar shampla, tá go leor comhaid sonraí foinse roinnt meiteashonraí a chóipeáil agus a ghreamú ó Microsoft Word ar Windows agus dá bhrí sin tá hyphens mhaisiúil agus apostrophes ó charset Windows-shonrach in ionad hyphens ASCII agus apostrophes. Na carachtair a thaispeáint ansin suas mar carachtair corr nó '?' i ERDDAP .
         
###### cliceáil grianghraf a mhéadú{#fileaccessbaseurl} 
*    ** [cliceáil grianghraf a mhéadú](#fileaccessbaseurl) agus fileAccessSuffix** Is annamh a úsáidtear tréithe nach bhfuil ó aon chaighdeán. Má tá ainm comhaid de chomhaid inrochtana gréasáin ag colún EDDTable (e.g., íomhá, físeán, nó comhaid fuaime) , is féidir leat a chur
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
a shonrú ar an URL bonn (dar críoch le /) ag teastáil a dhéanamh ar an ainm comhaid i URLanna iomlán. I gcásanna neamhghnácha, mar shampla nuair a bhíonn tagairtí do .png comhaid ach na luachanna easpa ".png", is féidir leat a chur
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(mar shampla,&lt;ainm att = "fileAccessSuffix"&lt;/ (a)
chun iarmhír a shonrú a bheidh le cur leis na logainmneacha a dhéanamh i URLanna iomlána. Ansin le haghaidh .htmlTable minicíocht uisce: flúirseach ERDDAP™ Beidh a thaispeáint ar an ainm comhaid mar nasc chuig an URL iomlán (an bonn Url móide an ainm comhaid móide an iarmhír) .

Más mian leat ERDDAP™ chun freastal ar na comhaid a bhaineann, a dhéanamh ar leith [Naisc ábhartha eile](#eddtablefromfilenames) tacar sonraí do na comhaid (d'fhéadfadh sé a bheith ina tacar sonraí príobháideach) .
    
###### cliceáil grianghraf a mhéadú irl - Library Service{#fileaccessarchiveurl} 
*    [ **cliceáil grianghraf a mhéadú irl - Library Service** ](#fileaccessarchiveurl) Is tréith an-annamh a úsáidtear nach bhfuil ó aon chaighdeán. Má tá ainm comhaid de chomhaid inrochtana gréasáin ag colún EDDTable (e.g., íomhá, físeán, nó comhaid fuaime) atá inrochtana trí chartlann (e.g., .zip comhad comhad) inrochtana trí URL, úsáid&lt;ainm att = "fileAccessArchiveUrl" × *an Ríocht Aontaithe* &lt;/ trÃ l a shonrú ar an URL don chartlann.
    
Más mian leat ERDDAP™ chun freastal ar an comhad cartlainne, a dhéanamh ar leith [Naisc ábhartha eile](#eddtablefromfilenames) tacar sonraí don chomhad (d'fhéadfadh sé a bheith ina tacar sonraí príobháideach) .
    
######  ioos\\_category  {#ioos_category} 
*    [ ** ioos\\_category ** ](#ioos_category) -- Níl an Tweet seo ar fáil&lt;athróg MustHaveIoosCategory ^ leagtar ar fíor (taiseachas aeir: fliuch) i [crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml) ; ar shlí eile, tá sé OPTIONAL.
Mar shampla,&lt;att ainm = " ioos\\_category "&lt;Baile Átha Troim
Tá na catagóirí ó [ NOAA 's Córas breathnóireachta Aigéan Comhtháite (IOMLÁN) ](https://ioos.noaa.gov/) .
    
    *    (Maidir leis seo a scríobh) nach bhfuil muid ar an eolas faoi na sainmhínithe foirmiúla de na hainmneacha.
    * Is iad na príomhainmneacha ó Zdenka Willis' .ppt "Córas breathnadóireachta Aigéan Comhtháite (IOMLÁN)   NOAA 's Cur chuige maidir le Cumas Oibríochta Tosaigh a Fhoirgniú' agus ón [US IOOS Blueprint](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)   (leathanach 1-5) .
    * Is dócha go ndéanfar an liosta seo a athbhreithniú amach anseo. Má tá iarratais agat, cuir ríomhphost chuig Chris. John ag noaa.gov.
    *    ERDDAP™ tacaíonn liosta níos mó de chatagóirí ná mar a dhéanann IOOS toisc go bhfuil ainmneacha breise curtha Bob Simons (den chuid is mó bunaithe ar ainmneacha na réimsí eolaíochta, mar shampla, Bitheolaíocht, Éiceolaíocht, Meitéareolaíocht, Staitisticí, Tacsanomaíocht) do chineálacha eile sonraí.
    * Na luachanna bailí reatha i ERDDAP™ Tá Bathymetry, Bitheolaíocht, Carachtar Bun, CO2, daite Scurtha Ábhar Orgánach, Contaminants, Reatha, Cothaithigh Scurtha, Scurtha O2, Éiceolaíocht, Abundance Éisc, Speiceas Éisc, sníc, Hydrology, Dáileadh Oighear, Aitheantóir, Suíomh, Meitéareolaíocht, Aigéan Dath, Airíonna Optúil, Eile, Pathogens, Phytoplanctónna Speiceas, brú, Táirgeacht, Caighdeán, Salinity, Leibhéal Farraige, Staidreamh Sruthán, Sreabhadh Dromchla, Tacsanomaíocht, Speiceasacht, Speiceas, Speiceas Neamhchothachta, Speiceasacht, Speiceas, Speiceas
    * Tá roinnt forluí agus athbhrí idir téarmaí éagsúla - a dhéanamh do is fearr.
    * Má chuireann tú ioos\\_category chuig an liosta&lt; categoryAttributes ú i ERDDAP 's [crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml) comhad, Is féidir le húsáideoirí teacht go héasca datasets le sonraí den chineál céanna trí ERDDAP 's "Cuardach do Shonraí de réir Catagóir" ar an leathanach baile.
         [Bain triail as ag úsáid ioos\\_category chun tacair leasa sonraí a chuardach.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000) 
    * Níl ann [plé faoi ERDDAP™ agus ioos\\_category i an ERDDAP™ Grúpa Google.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w) 
    
Is féidir leat a bheith tempted a shocrú&lt;athróg MustHaveIoosCategory ú le bréagach ionas nach bhfuil an tréith ag teastáil. ("Pfft&#33; Cad é dom?") Roinnt cúiseanna a fhágáil sé leagtha chun fíor (taiseachas aeir: fliuch) agus úsáid ioos\\_category Tá:
    
    * Má thus.xml ar&lt;athróg MustHaveIoosCategory? atá leagtha chun fíor, [Socraigh mar teanga réamhshocraithe](#generatedatasetsxml) Cruthaíonn i gcónaí / suggests an ioos\\_category tréith do gach athróg i ngach tacar sonraí nua. Mar sin, cén fáth nach bhfuil ach é a fhágáil i?
    *    ERDDAP™ ligeann d'úsáideoirí cuardach a dhéanamh ar thacair sonraí úis de réir catagóire. ioos\\_category Is catagóir cuardaigh an-úsáideach mar gheall ar an ioos\\_categories (mar shampla, Teocht) go leor leathan. Déanann sé seo ioos\\_category i bhfad níos fearr chun na críche sin ná, mar shampla, an CF i bhfad níos fearr standard\\_name s s (nach bhfuil chomh maith chun na críche sin mar gheall ar na comhchiallaigh agus athruithe beag, mar shampla, farraige \\_dromchla \\_ teocht i gcoinne teocht an uisce) .
taiseachas aeir: fliuch ioos\\_category chun na críche sin á rialú ag&lt; categoryAttributes × i do chomhad thus.xml.)
         [Bain triail as ag úsáid ioos\\_category chun tacair leasa sonraí a chuardach.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000) 
    * Tá na catagóirí ó [ NOAA 's Córas breathnóireachta Aigéan Comhtháite (IOMLÁN) ](https://ioos.noaa.gov/) . Tá na catagóirí bunúsacha chun cur síos IOOS ar misean IOOS. Má tá tú i NOAA , tacú ioos\\_category Is maith One- NOAA rud a dhéanamh. (Féach ar an [a hAon NOAA físeán i caighdeán maith](https://www.youtube.com/watch?v=nBnCsMYm2yQ) agus a spreagadh&#33;) Má tá tú i roinnt U.S. eile nó gníomhaireacht idirnáisiúnta, nó ag obair le gníomhaireachtaí rialtais, nó ag obair le roinnt Córas Aigéan eile Breathnú, nach bhfuil sé smaoineamh maith chun comhoibriú leis an oifig IOOS SAM?
    * Go gairid nó níos déanaí, b'fhéidir gur mhaith leat roinnt eile ERDDAP™ a nascadh le do thacair sonraí trí [ EDDGrid An tSraith Shinsearach](#eddfromerddap) agus [EDDTableFromErddap](#eddfromerddap) . Má tá an ceann eile ERDDAP™ Éilíonn ioos\\_category , ní mór do thacair sonraí a bheith ioos\\_category in ord EDDGrid Ón Erddap agus EDDTableFromErddap a bheith ag obair.
    * Tá sé i bhfad níos éasca go síceolaíoch san áireamh ioos\\_category nuair a chruthú duit an tacar sonraí (tá sé ach rud eile go ERDDAP™ Éilíonn a chur leis an tacar sonraí a ERDDAP ) , ná é a chur tar éis an bhfíric (má chinn tú é a úsáid sa todhchaí) .
         
######  long\\_name  {#long_name} 
*    [ ** long\\_name ** ](#long_name)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) , [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) agus [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeáin meiteashonraí) Is tréith athróg IMMENDED i ERDDAP . Mar shampla,
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *    ERDDAP™ úsáidí na long\\_name do aiseanna lipéadú ar graif.
    * cleachtais is fearr: Capitalize na focail sa long\\_name amhail is dá mba theideal é (capitalize an chéad focal agus gach focal neamh-airteagail) . Ná cuir na haonaid san áireamh long\\_name . Níor chóir go mbeadh an t-ainm fada an-fhada (de ghnáth&lt;20 carachtair), ach ba chóir a bheith níos tuairisciúla ná an [ destinationName ](#destinationname) , a bhfuil go minic go han-chosanta.
    * Má " long\\_name " nach bhfuil sainithe sa athróg ar [foinse](#variable-addattributes) nó&lt; addAttributes ú, ERDDAP™ beidh sé a ghiniúint trí ghlanadh suas [ standard\\_name ](#standard_name)   (má tá sé i láthair) nó an destinationName .
         
######  missing\\_value  {#missing_value} 
*    [ ** missing\\_value ** ](#missing_value) agus **Táirgí gaolmhara Luach**   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) agus [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ) Tá tréithe athróg a chuireann síos ar roinnt (mar shampla, -9999) a úsáidtear chun luach ar iarraidh a léiriú. Mar shampla,

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

Maidir le hathróga Curtain, is é an mhainneachtain don dá "" (an teaghrán folamh) .
Maidir le hathróga uimhriúil, is é an réamhshocraithe don dá NaN.
*    ERDDAP™ tacaíocht an dá missing\\_value agus \\_FillValue, ós rud é roinnt foinsí sonraí a shannadh bríonna beagán difriúil dóibh.
* Má tá siad i láthair, ba chóir iad a bheith ar an gcineál sonraí céanna leis an athróg.
* Má tá na sonraí pacáilte leis [ scale\\_factor agus/nó add\\_offset ](#scale_factor) , an missing\\_value agus ba cheart \\_FillValue luachanna a phacáil mar an gcéanna. Ar an gcaoi chéanna, le haghaidh colún le luachanna teaghrán dáta / ama a úsáideann áitiúil [ time\\_zone ](#time_zone) , an missing\\_value agus ba cheart go n-úsáidfeadh luachanna \\_FillValue an crios ama áitiúil.
* Má úsáideann athróg na luachanna speisialta, an missing\\_value agus / nó \\_FillValue Tá tréithe REQUIRED.
* Le haghaidh [am agus amstamp athróg](#time-units)   (cibé an bhfuil an fhoinse teaghráin nó uimhriúil) , missing\\_value s agus \\_FillValues le feiceáil mar "" (an teaghrán folamh) nuair a bhíonn an t-am scríofa mar Curtain agus mar NaN nuair a bhíonn an t-am scríofa mar dúbailte. Na luachanna foinse le haghaidh missing\\_value agus ní bheidh \\_FillValue le feiceáil i meiteashonraí an athróg.
* Do athróga Curtain, ERDDAP™ athraíonn i gcónaí aon missing\\_value s nó \\_FillValue luachanna sonraí isteach "" (an teaghrán folamh) . Na luachanna foinse do missing\\_value agus ní bheidh \\_FillValue le feiceáil i meiteashonraí an athróg.
* Do athróg uimhriúil:
An bhfuil missing\\_value agus beidh \\_FillValue le feiceáil i meiteashonraí an athróg.
I gcás roinnt formáidí sonraí aschur, ERDDAP™ fágfaidh tú na huimhreacha speisialta seo slán, m.sh., feicfidh tú -9999.
Le haghaidh formáidí sonraí aschuir eile (go háirithe formáidí téacs-mhaith cosúil le .csv agus .htmlTable ) , ERDDAP™ a chur in ionad na huimhreacha speisialta le NaN nó "".
* Tá roinnt cineálacha sonraí marcóirí luach bunúsach ar iarraidh nach gá a aithint go sainráite le missing\\_value nó \\_FillValue tréithe: snámhphointe agus athróg dúbailte bhfuil NaN (Gan Uimhir) , luachanna Curtain a bhaint as an teaghrán folamh, agus tá luachanna char carachtar \\uffff   (carachtar #65535, a bhfuil luach Unicode ar Nach Carachtar) . Ní cineálacha sonraí Integer bhfuil marcóirí luach ar iarraidh gné dhílis.
* Má tá athróg slánuimhir luach ar iarraidh (mar shampla, post folamh i gcomhad .csv) , ERDDAP™ a léirmhíniú an luach mar atá sainithe missing\\_value nó \\_FillValue don athróg sin. Má tá aon cheann sainithe, ERDDAP™ a léirmhíniú an luach mar an luach réamhshocraithe ar iarraidh don chineál sonraí, a bhfuil i gcónaí ar an luach is mó is féidir a choinneáil ag an gcineál sonraí sin:
127 d'athróg byte, 32767 le haghaidh gearr, 2147483647 le haghaidh orlach, 9223372036854775807 le fada,
255 le haghaidh ubyte, 65535 le haghaidh ushort, 4294967295 le haghaidh uint, agus 18446744073709551615 le haghaidh ulong.
######  ADD \\_FillValue ATTRIBUTES ?{#add-_fillvalue-attributes} 
*    [ ADD \\_FillValue ATTRIBUTES ?](#add-_fillvalue-attributes)   
Gach uair ERDDAP™ ualaí tacar sonraí, seiceálacha sé má tá na hathróga le cineálacha sonraí foinse slánuimhir sainithe missing\\_value nó \\_FillValue tréith. Más rud é nach athróg, ansin ERDDAP™ a phriontáil teachtaireacht chuig an gcomhad logála (ag tosú le "Add \\_FillValue ómós?") a mholadh go bhfuil an ERDDAP™ riarthóir cuir \\_Fill Luach tréith don athróg i datasets.xml . Tá sé an-úsáideach do gach athróg go bhfuil \\_FillValue nó missing\\_value toisc go bhfuil na luachanna ar iarraidh i gcónaí is féidir, m.sh., más rud é nach bhfuil comhad ar leith i tacar sonraí a bheith athraitheach ar leith, ERDDAP™ Ní mór a bheith in ann a chur i láthair go athróg mar a bhfuil gach luachanna ar iarraidh don athróg. Má shocraíonn tú nár chóir go mbeadh tréith \\_FillValue, is féidir leat a chur
    &lt;agt ainmneacha = "\\_FillValue"&lt;/att bhéil ina ionad sin, a chur faoi chois an teachtaireacht sin datasetID + meascán éagsúil sa todhchaí.
    
Gach uair ERDDAP™ Tosaíonn sé suas, bailíonn sé gach ceann de na moltaí i teachtaireacht atá scríofa chuig an gcomhad logála (ag tosú le " ADD \\_FillValue ATTRIBUTES ?") , ríomhphost chuig an ERDDAP™ riarthóir, agus a scríobh chuig comhad sonraí CSV sa \\[ Treoir do Thuismitheoirí \\] / logs / eolaire. Más mian leat, is féidir leat úsáid a bhaint as an gclár GenerateDatasetsXml (agus an BreiseFillValueAttributes rogha) a chur i bhfeidhm na moltaí sa chomhad CSV leis an datasets.xml comhad. Chun aon cheann de na datasetID / teaglaim éagsúla sa chomhad sin, má shocraíonn tú nach bhfuil aon ghá a chur leis an i leith, is féidir leat athrú ar an tréith a&lt;agt ainmneacha = "\\_FillValue"&lt;/ bata bhéil a chur faoi chois an moladh sin datasetID + meascán éagsúil sa todhchaí.
    
Tá sé seo tábhachtach&#33;
Mar a dúirt Bob go minic: bheadh sé dona (agus embarrassing) má ba chúis le cuid den fhianaise ar théamh domhanda luachanna gan aitheantas ar iarraidh sna sonraí (e.g., luachanna teochta 99 nó 127 céim C ba chóir a bheith marcáilte mar luachanna ar iarraidh agus dá bhrí sin skewed an meán agus / nó staitisticí meánach níos airde) .

* An \\_FillValue agus missing\\_value Ní mór luachanna do athróg áirithe i gcomhaid foinse éagsúla a bheith comhsheasmhach; ar shlí eile, ERDDAP™ Beidh glacadh le comhaid le sraith amháin de luachanna agus gach ceann de na comhaid eile a dhiúltú mar "Comhaid olc". Chun an fhadhb a réiteach,
    * Má tá na comhaid a gridded .nc comhaid, is féidir leat a úsáid [ EDDGrid Ón NcFilesUnpacked](#eddgridfromncfilesunpacked) .
    * Más comhaid sonraí tabular iad na comhaid, is féidir leat EDDTableFrom a úsáid... '' [caighdeánú Cad iad na rudaí maithe a bhain...](#standardizewhat) a insint ERDDAP a chaighdeánú na comhaid foinse mar a léigh siad isteach ERDDAP .
    * Le haghaidh fadhbanna níos deacra, is féidir leat é a úsáid [An tIomlán](#ncml-files) nó [ NCO ](#netcdf-operators-nco) chun an fhadhb a réiteach.
             
######  scale\\_factor  {#scale_factor} 
*    [ ** scale\\_factor ** ](#scale_factor)   (réamhshocraithe = 1) agus ** add\\_offset **   (réamhshocraithe = 0)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) agus [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ) Tá tréithe athróg OPTIONAL a chuireann síos ar shonraí atá pacáilte i gcineál sonraí níos simplí trí chlaochlú simplí.
    * Má tá sé i láthair, tá a n-cineál sonraí difriúil ó na sonraí foinse chineál agus cur síos ar an gcineál sonraí na luachanna ceann scríbe.
Mar shampla, d'fhéadfadh foinse sonraí a stóráil luachanna sonraí snámhphointe le dhigit deachúil pacáilte mar ints gearr (Déan teagmháil linn) , ag baint úsáide as scale\\_factor = 0.1 agus add\\_offset = 0. Mar shampla,

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

Sa sampla seo, ERDDAP™ bheadh unpack na sonraí agus é a chur i láthair don úsáideoir mar luachanna sonraí snámhphointe.
    * Má tá sé i láthair, ERDDAP™ beidh sliocht na luachanna ó na tréithe, bain na tréithe, agus go huathoibríoch unpack na sonraí don úsáideoir:
ceann scríbe Luach = foinse Luach \\* scale\\_factor + + + + add\\_offset   
Nó, dúirt bhealach eile:
unpackedValue = pacáilte Luach \\* scale\\_factor + + + + add\\_offset 
    * An bhfuil scale\\_factor agus add\\_offset Ní mór luachanna do athróg áirithe i gcomhaid foinse éagsúla a bheith comhsheasmhach; ar shlí eile, ERDDAP™ Beidh glacadh le comhaid le sraith amháin de luachanna agus gach ceann de na comhaid eile a dhiúltú mar "Comhaid olc". Chun an fhadhb a réiteach,
        * Má tá na comhaid a gridded .nc comhaid, is féidir leat a úsáid [ EDDGrid Ón NcFilesUnpacked](#eddgridfromncfilesunpacked) .
        * Más comhaid sonraí tabular iad na comhaid, is féidir leat EDDTableFrom a úsáid... '' [caighdeánú Cad iad na rudaí maithe a bhain...](#standardizewhat) a insint ERDDAP a chaighdeánú na comhaid foinse mar a léigh siad isteach ERDDAP .
        * Le haghaidh fadhbanna níos deacra, is féidir leat é a úsáid [An tIomlán](#ncml-files) nó [ NCO ](#netcdf-operators-nco) chun an fhadhb a réiteach.
             
######  standard\\_name  {#standard_name} 
*    [ ** standard\\_name ** ](#standard_name)   (ó na [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) caighdeán meiteashonraí) Is tréith athróg IMMENDED i ERDDAP . CF Coinníonn an liosta de ceadaithe [CF ainmneacha caighdeánach](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) . Mar shampla,
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * Má chuireann tú standard\\_name a athróg 'tréithe agus cuir standard\\_name chuig an liosta&lt; categoryAttributes ú i ERDDAP 's [crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml) comhad, Is féidir le húsáideoirí teacht go héasca datasets le sonraí den chineál céanna trí ERDDAP 's "Cuardach do Shonraí de réir Catagóir" ar an leathanach baile.
    * Má shonraíonn tú CF standard\\_name do athróg, Ní na haonaid tréith don athróg a bheith comhionann leis na hAonaid Canonical sonraithe le haghaidh an t-ainm caighdeánach sa tábla Ainm CF Caighdeánach, ach na haonaid MUST a thiontú go dtí na hAonaid Canonical. Mar shampla, CF a bhaineann le teocht standard\\_name s bhfuil "K" (Uirlisí ilchuspóireacha) mar na hAonaid Canonical. Mar sin, athróg le teocht a bhaineann standard\\_name MUST Tá aonaid de K, céim \\_C, céim\\_F, nó roinnt UDUnits leagan de na hainmneacha, ós rud é go bhfuil siad go léir idir-invertible.
    * cleachtais is fearr: Cuid de chumhacht [vocabularies rialaithe](https://en.wikipedia.org/wiki/Controlled_vocabulary) a thagann ó úsáid ach na téarmaí sa liosta. Mar sin, molaimid cloí leis na téarmaí atá sainithe sa stór focal rialaithe, agus molaimid i gcoinne téarma a dhéanamh más rud é nach bhfuil ceann cuí sa liosta. Má theastaíonn téarmaí breise uait, féach an gcuirfidh an coiste caighdeáin iad leis an stór focal rialaithe.
    *    standard\\_name Tá luachanna na luachanna tréith CF amháin atá cás íogair. Tá siad i gcónaí ar fad níos ísle. Ag tosú i ERDDAP™ v1.82, Beidh GenerateDatasets thiontú litreacha cás uachtair le litreacha níos ísle. Agus nuair a bhíonn tacar sonraí luchtaithe i ERDDAP , litreacha cás uachtair a athrú go ciúin le litreacha níos ísle.
         
######  time\\_precision  {#time_precision} 
*    time\\_precision Is tréith OPTIONAL a úsáideann ERDDAP™   (agus aon caighdeáin meiteashonraí) le haghaidh [am agus amstamp athróg](#time-units) , a d'fhéadfadh a bheith i tacar sonraí gridded nó tacar sonraí tabular, agus i axisVariable s nó dataVariable s. Mar shampla,
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
     time\\_precision sonraítear an cruinneas atá le húsáid aon uair ERDDAP™ formáidí na luachanna ama ón athróg mar teaghráin ar leathanaigh ghréasáin, lena n-áirítear .htmlTable freagraí. I bhformáidí comhaid nuair ERDDAP™ amanna formáidí mar teaghrán (mar shampla, .csv agus .json ) , ERDDAP™ ach úsáideann an time\\_precision -sonraithe formáid má tá soicind codánach ann; ar shlí eile, ERDDAP™ Úsáideann an 1970-01-01T00:00:00 Z formáid.
* Tá luachanna bailí 1970-01, 1970-01-01-01, 1970-01-00Z, 1970-01-01T00:00Z, 1970-01-01-T00:00:00Z (taiseachas aeir: fliuch) , 1970-01-01T00:00:00.0Z, 1970-01-01T00:00:00:00.00, 1970-01-00:00:00.000Z. \\[ Ní 1970 rogha toisc go bhfuil sé uimhir amháin, mar sin ERDDAP™ Ní féidir a fhios má tá sé teaghrán ama formáidithe (in aghaidh na bliana) nó má tá sé roinnt soicind ó 1970-01T00:00:00Z. \\] 
* Más rud é time\\_precision nach bhfuil sonraithe nó nach bhfuil an luach mheaitseáil, beidh an luach réamhshocraithe a úsáid.
* Anseo, mar atá i gcodanna eile de ERDDAP™ , aon réimsí den am formáidithe nach bhfuil ar taispeáint Glactar leis go bhfuil an luach íosta. Mar shampla, 1985-07, 1985-07-01, 1985-07-01T00Z, 1985-07-01T00:00Z, agus 1985-07-01T00:00:00 Z mheas go léir comhionann, cé go bhfuil leibhéil éagsúla de cruinneas intuigthe. Seo cluichí ar an [ISO 8601:2004 "extended" Am Formáid Sonraíocht](https://www.iso.org/iso/date_and_time_format) .
*    **RABHADH:** Ba chóir duit ach úsáid teoranta time\\_precision más rud é **go léir** de na luachanna sonraí don athróg bhfuil ach an luach íosta do gach ceann de na réimsí atá i bhfolach.
    * Mar shampla, is féidir leat úsáid a bhaint as time\\_precision de 1970-01-01-01 má tá gach ceann de na luachanna sonraí uair an chloig = 0, nóiméad = 0, agus an dara = 0 (mar shampla 2005-03-04T00:00:00Z agus 2005-03-05T00:00:00Z) .
    * Mar shampla, ná bain úsáid as time\\_precision de 1970-01-01 má tá neamh-0 uair an chloig, nóiméad, nó soicind luachanna, (mar shampla 2005-03-05T12:00:00Z) toisc nach mbeadh an luach uair an chloig neamh-mhainneach ar taispeáint. Seachas sin, má iarrann úsáideoir do na sonraí go léir le ham = 2005-03-05, beidh an t-iarratas theipeann gan choinne.
             
######  time\\_zone  {#time_zone} 
*    [ ** time\\_zone ** ](#time_zone) 
    *    time\\_zone Is tréith OPTIONAL a úsáideann ERDDAP™   (agus aon caighdeáin meiteashonraí) le haghaidh [am agus amstamp athróg](#time-units) , a d'fhéadfadh a bheith i tacar sonraí gridded nó tacar sonraí tabular.
    * Is é an mhainneachtain " Zulu " " " (a bhfuil an leagan crios ama nua-aimseartha de GMT) .
    * Faisnéis chúlra: "fritháireamh ama" (e.g., Am Caighdeánach an Aigéin Chiúin, -08:00, GMT-8) atá socraithe, sonrach, fritháireamh i gcoibhneas le Zulu   (Uaireadóirí GMT) . I gcodarsnacht leis sin, is iad "criosanna ama" na rudaí i bhfad níos casta a bhfuil tionchar ag an gcosaint ar an tsampla (e.g., "SAM / Fanacht") , a raibh rialacha éagsúla in áiteanna éagsúla ag amanna éagsúla. Tá na criosanna ama i gcónaí ainmneacha ós rud é nach féidir iad a achoimre ag luach fhritháireamh simplí (féach an "TZ ainmneacha bunachar sonraí" colún sa tábla ag [https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) ) . ERDDAP 's time\\_zone Cuidíonn tréith leat déileáil le sonraí am áitiúil ó roinnt crios ama (e.g., 1987-03-25T17:32:05 An tAigéan Ciúin Am agus am) . Má tá tú sonraí ama teaghrán nó uimhriúil le (seasta) am fhritháireamh, ba chóir duit a choigeartú ach na sonraí a Zulu   (a bhfuil an méid ERDDAP™ ag iarraidh) trí shonrú ama bonn éagsúla sa tréith aonad (e.g., "uair an chloig ó 1970-01T08:00:00Z", tabhair faoi deara an T08 chun an t-am a fhritháireamh) , agus i gcónaí na torthaí a sheiceáil chun a chinntiú go bhfaigheann tú na torthaí is mian leat.
    * Le haghaidh athróg ama le sonraí foinse ó Stringsa, ligeann an tréith tú a shonrú crios ama a thoradh ERDDAP™ na hamanna foinse áitiúil-chrios a thiontú (roinnt in am caighdeánach, cuid acu in am a shábháil ar an Solas) isteach i Zulu amanna (atá i gcónaí i Am caighdeánach) . Is dócha go bhfuil liosta na n-ainmneacha crios ama bailí comhionann leis an liosta sa cholún TZ ag [https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) . Tá criosanna ama coitianta na Stát Aontaithe: US / Hawaii, Stáit Aontaithe Mheiriceá / Alaska, SAM / Saor, US / Montain, US / Arizona, SAM / Lár, SAM / Eastern.
    * Le haghaidh athróg ama le sonraí foinse uimhriúil, is féidir leat a shonrú ar an " time\\_zone " tréith, ach ní mór an luach a bheith " Zulu " nó "UTC". Más gá duit tacaíocht do chriosanna ama eile, le do thoil ríomhphost Chris. John ag noaa.gov.
         
###### Oidhreacht_time_adjust{#legacy_time_adjust} 
*    [ **Oidhreacht_time_adjust** ](#legacy_time_adjust) Ag tosú i ERDDAP™ 2.29.0, obair athróg ama beagán difriúil. I gcásanna neamhchoitianta, is dócha nuair a úsáid `laethanta ó shin` agus bliain roimh 1582 (amhlaidh `laethanta ó 0000-01-01` nó `laethanta ó 1-1-1 00:00:0.0` ) beidh ort a chur in iúl le haghaidh coigeartú go dtí an dáta athraitheach. Níl an Tweet seo ar fáil ERDDAP™ Úsáideann an leabharlann java.time chun dátaí a bhainistiú go hinmheánach. Tá roinnt tacar sonraí a éilíonn ag baint úsáide as an leabharlann GregorianCalendar sean chun acheive na dátaí ceart.

```
<axisVariable>
    <sourceName>time</sourceName>
    <destinationName>time</destinationName>
    <!-- sourceAttributes>
        ... removed several lines ...
        <att name="units">days since 1-1-1 00:00:0.0</att>
    </sourceAttributes -->
    <addAttributes>
        ... removed several lines ...
        <att name="legacy_time_adjust">true</att>
    </addAttributes>
</axisVariable>
```

###### minicíocht uisce: flúirseach{#units} 
*    [ **minicíocht uisce: flúirseach** ](#units)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) , [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) agus [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeán meiteashonraí) Sainmhíníonn na haonaid na luachanna sonraí. Mar shampla,
    ```
        <att name="units">degree\\_C</att>
    ```
    * Is é "aonaid" REQUIRED mar fhoinse nó cuirtín le haghaidh "time" athróg agus tá sé MODH STRONGLY le haghaidh athróg eile aon uair is cuí (atá beagnach i gcónaí) .
    * Go ginearálta, molaimid [Déan Teagmháil Linn](https://www.unidata.ucar.edu/software/udunits/) aonaid \\-comhoiriúnacha a éilíonn an [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) agus [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) caighdeáin.
    * Tá caighdeán coiteann eile [taiseachas aeir: fliuch](https://unitsofmeasure.org/ucum.html) - an Cód aontaithe d'Aonaid Tomhais. [ OGC ](https://www.ogc.org/) seirbhísí ar nós [ SOS ](https://www.ogc.org/standards/sos) , [ WCS ](https://www.ogc.org/standards/wcs) , agus [ WMS ](https://www.ogc.org/standards/wms) a cheangal UCUM agus is minic a tharchur chuig UCUM mar UOM (Aonaid de Thomhas) .
    * Molaimid go n-úsáideann tú aonad amháin caighdeánach do gach tacar sonraí i do ERDDAP . Ba chóir duit insint ERDDAP™ a caighdeán tú ag baint úsáide as le&lt;aonaid \\_standard ×, i do [crios fuar: aon sonraí](/docs/server-admin/deploy-install#setupxml) comhad.
    * Ní mór na haonaid le haghaidh athróg áirithe i gcomhaid foinse éagsúla a bheith comhsheasmhach. Má tá tú bailiúchán de chomhaid sonraí ina n-úsáideann fo-thacar amháin de na comhaid luachanna aonaid éagsúla ná fo-thacar amháin nó níos mó eile de na comhaid (mar shampla,
"lácha ó 1985-01-01" i gcoinne "lá ó 2000-01-01",
"céim \\_Celsius" i gcoinne "deg\\_C", nó
"knots" i gcoinne "m / s") is gá duit a fháil ar bhealach a chaighdeánú na luachanna aonaid, ar shlí eile, ERDDAP™ beidh ualach ach amháin fo-thacar amháin de na comhaid. Smaoinigh air: má tá comhad amháin windSpeed aonaid =knots agus tá eile windSpeed aonaid = m / s, ansin níor chóir na luachanna ón dá chomhad a chur san áireamh sa tacar sonraí comhiomlánaithe céanna.
        * Má tá na comhaid a gridded .nc comhaid, i go leor cásanna is féidir leat a úsáid [ EDDGrid Ón NcFilesUnpacked](#eddgridfromncfilesunpacked) .
        * Má tá na comhaid comhaid comhaid sonraí tabular, i go leor cásanna is féidir leat a úsáid EDDTableFrom... '' [caighdeánú Cad iad na rudaí maithe a bhain...](#standardizewhat) a insint ERDDAP a chaighdeánú na comhaid foinse mar a léigh siad isteach ERDDAP .
        * Le haghaidh fadhbanna níos deacra, is féidir leat é a úsáid [An tIomlán](#ncml-files) nó [ NCO ](#netcdf-operators-nco) chun an fhadhb a réiteach.
    * An CF alt caighdeánach 8.1 deir go má tá athróg sonraí pacáilte trí [ scale\\_factor agus/nó add\\_offset ](#scale_factor) , "Ba chóir go mbeadh aonaid athróg ionadaíoch ar na sonraí neamhphacáilte."
    *    [Le haghaidh athróg ama agus amstamp,](#time-units) ceachtar an athróg ar [foinse](#variable-addattributes) nó&lt; addAttributes ú (a thagann roimh) MUST bhfuil [minicíocht uisce: flúirseach](#units) a bhfuil ceachtar
        
        * Le haghaidh athróg ais ama nó athróg sonraí ama le sonraí uimhriúil: [Déan Teagmháil Linn](https://www.unidata.ucar.edu/software/udunits/) teaghrán \\-comhoiriúnach (leis an bhformáid *minicíocht uisce: flúirseach* ó shin *Amuigh faoin aer* ) cur síos ar conas a léirmhíniú luachanna am foinse (mar shampla, soicind ó 1970-01T00:00:00Z) .
            
         *minicíocht uisce: flúirseach* Is féidir a bheith ar cheann de na:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
Go teicniúil, ERDDAP™ NACH leanann an UDUNITS caighdeán nuair a athrú "years since" agus "months since" luachanna ama go "seconds since" . An bhfuil UDUNITS Sainmhíníonn caighdeán in aghaidh na bliana mar seasta, luach amháin: 3.15569259747e7 soicind. Agus UDUNITS mí a shainiú mar bhliain/12. Ar an drochuair, an chuid is mó / gach tacar sonraí a bhfuil feicthe againn go bhfuil úsáid "years since" nó "months since" go soiléir ar intinn na luachanna a bheith blianta féilire nó míonna féilire. Mar shampla, 3 "months since 1970-01-01" de ghnáth i gceist a chiallaíonn 1970-04-01. Mar sin,, ERDDAP™ ateangaireachta "years since" agus "months since" mar na blianta féilire agus míonna, agus ní leanann go docht ar an UDUNITS caighdeán.
            
An bhfuil *Amuigh faoin aer* Ní mór a bheith ISO 8601:2004 (E) dáta formáidithe teaghrán ama ( yyyy-MM-dd 'T'H:mm: SZ, mar shampla, 1970-01-T00:00:) , nó roinnt athrú sin (mar shampla, le codanna ar iarraidh ag an deireadh) . ERDDAP™ iarracht a bheith ag obair le raon leathan de athruithe ar an bhformáid idéalach, mar shampla, "1970-1 0:0" Tá tacaíocht. Má tá an t-eolas crios ama ar iarraidh, glactar leis gurb é an Zulu crios ama (AKA GMT) . Fiú má tá am eile fhritháireamh sonraithe, ERDDAP™ Ní úsáideann riamh Am Coigiltis. Má úsáideann an t-íosleibhéal formáid éigin eile, ní mór duit a úsáid&lt; addAttributes × a shonrú teaghrán aonad nua a úsáideann athrú ar an ISO 8601:2004 (E) formáid (m.sh., laethanta athraithe ó Ean 1, 1985 i laethanta ó 1985-01-01.
        
Is féidir leat tástáil ERDDAP 's cumas chun déileáil le sonracha *minicíocht uisce: flúirseach* ó shin *Amuigh faoin aer* le ERDDAP 's [Tiontaire ama](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) . Tá súil againn, is féidir leat breiseán i roinnt (an luach chéad uair ón bhfoinse sonraí?) agus teaghrán aonad, cliceáil ar Tiontaigh, agus ERDDAP™ beidh sé in ann é a thiontú i ISO 8601:2004 (E) formáidithe teaghrán ama dáta. Beidh an tiontaire ar ais teachtaireacht earráide más rud é nach bhfuil an teaghrán aonad aitheanta.

###### Aonaid Am teaghrán{#string-time-units} 
*    [I gcás na n-aonad tréith le haghaidh am nó amanna athróg sonraí le sonraí Curtain,](#string-time-units) ní mór duit a shonrú [cliceáil grianghraf a mhéadú](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) patrún patrún patrún (atá ag luí den chuid is mó le java.text. Simplí agus éasca) a chuireann síos ar conas a léirmhíniú na hamanna teaghrán.
    
Maidir leis na formáidí ama a úsáidtear go coitianta atá athruithe ar an ISO 8601:2004 (E) formáid chaighdeánach (mar shampla, 2018-01-02T00:00:00Z) , Is féidir leat a shonrú athruithe ar yyyy-MM-dd 'T'H:mm: SZ, mar shampla, úsáid yyyy-MM-dd má tá an t-am teaghrán amháin dáta. Le haghaidh aon fhormáid a thosaíonn le yyyy-M, ERDDAP Úsáideann parsálaí speisialta go bhfuil an-forgiving na n-athruithe beaga san fhormáid. Is féidir leis an parsálaí criosanna ama a láimhseáil san fhormáid 'Z', "UTC", "GMT", ± XX:XX, ±XXXX, agus XX formáidí ±. Mura sonraítear codanna den am dáta (mar shampla, nóiméad agus soicind) , ERDDAP™ Glacann an luach is ísle don réimse sin (e.g., más rud é nach bhfuil soicind sonraithe, soicind = 0 Glactar leis) .
    
I gcás gach formáidí ama teaghrán eile, ní mór duit a shonrú go beacht teaghrán formáid formáid DateTimeFormatter-comhoiriúnach. Cosúil le yyyy-MM-dd 'T'H:mm: ssZ, na teaghráin bhformáid atá tógtha ó charachtair a aithint cineál ar leith faisnéise ón teaghrán ama, m.sh., ciallaíonn m nóiméad-de-uair an chloig. Má dhéanann tú arís ar an carachtar bhformáid roinnt uaireanta, scagairí sé a thuilleadh an bhrí, m.sh., ciallaíonn m gur féidir an luach a shonrú ag aon líon na ndigití, mm ciallaíonn sé nach mór an luach a shonrú ag 2 dhigit. An bhfuil Java Is achoimre amh é doiciméadú le haghaidh DateTimeFormatter agus ní dhéanann sé na sonraí sin soiléir. Mar sin, tá anseo liosta na n-athruithe carachtar formáid agus a bhrí de réir ERDDAP™   (atá uaireanta beagán difriúil ó Java 's Dáta Formáid) :
    
     | Carachtair | Samplaí | Meaning | 
     | -- | -- | -- | 
     | u, y, Y | \\-4712, 0, 1, 10, 100, 2018 | uimhir bliana, aon líon dhigit. ERDDAP™ conarthaí y (bliain d'aois) agus Y (seachtain-bhunaithe bliain, toisc go bhfuil sé seo a úsáidtear go minic cearr in ionad y) mar u, an [uimhir na bliana réalteolaíoch](https://en.wikipedia.org/wiki/Astronomical_year_numbering) . Tá blianta astronomical slánuimhreacha dearfacha nó diúltacha nach n-úsáideann an BCE (BC) nó CE (AD AD AD) Dearthóirí ré: 2018=2018CE, ..., 2=2CE, 1=1CE, 0=1BCE, -1=2BCE, -2=3BCE,... | 
     | tréimhse de chuid eile: aon Taithí | \\-4712, 0000, 0001, 0010, 0100, 2018 | uimhir 4 dhigit na bliana réalteolaíoch (aon '-')   | 
     | M | 1, 01, 12 | uimhir mhí, aon líon na n digití (1 = Meán Fómhair)   | 
     | MM MM | 01, 12 | 2 dhigit (nialas padded) uimhir na míosa | 
     | MMM | cliceáil grianghraf a mhéadú | litir 3 Ainm mhí Béarla, cás neamhíogair | 
     | MMMM | Jan, jan, JAN, Eanáir, january, JANUARY | litir 3 nó ainm iomlán mhí Béarla, cás neamhíogair | 
     | taiseachas aeir: fliuch | 1, 01, 31 | uimhir lá de mhí, aon líon na n digití | 
     | taiseachas aeir: fliuch | 01, 31 | 2 dhigit (nialas padded) lá ar mhí. D'fhéadfadh an chéad 'digit' a bheith ina spás. | 
     | D. D.D. | 1, 001, 366 | lá-de-bliana, aon líon na n digití, 001 = 1 | 
     | DDD | 001, 366 | day-of-year, 3 digití, 001 = 1 | 
     | EOLAÍOCHT | cliceáil grianghraf a mhéadú | a 3 litir day-of-week, luach neamhaird nuair parsáil | 
     | EEEE | cliceáil grianghraf a mhéadú | litir 3 nó lán-seachtain Bhéarla, cás neamhíogair, neamhaird luach nuair a parsáil | 
     | Níl an Tweet seo ar fáil | 0, 00, 23 | H uair an chloig de lá (0-23) , aon líon na ndigití | 
     | HHH | 00, 23 | HH uair an chloig de lá (Plean Gníomhaíochta don Oideachas) , 2 dhigit. D'fhéadfadh an chéad 'digit' a bheith ina spás. | 
     | a | Tá, AM, pm, PM | AM nó PM, cás-íogair | 
     | Is maith liom | 12, 1, 01, 11 | clog-uair an chloig de-am-pm (12, 1, 2,... 11) , aon líon na ndigití | 
     | Níl an tweet | 12, 01, 11 | clog-uair an chloig de-am-pm (12, 1, 2,... 11) , 2 dhigit. D'fhéadfadh an chéad 'digit' a bheith ina spás. | 
     | KK KK KK | 0, 1, 11 | Uaireanta Oscailte (0, 1, ...11) , aon líon na ndigití | 
     | KK KK | 00, 01, 11 | Uaireanta Éigeandála Lasmuigh d’Uaireanta Oifige | 
     | m | 0, 00, 59 | nóiméad-de-uair an chloig, aon líon na n digití | 
     | mm | 00, 59 | nóiméad-de-uair an chloig, 2 digití | 
     | s s | 0, 00, 59 | dara nóiméad, aon líon na n digití | 
     | Seirbhís do Chustaiméirí | 00, 59 | dara-de-nóiméad, 2 dhigit | 
     | Staidéar S | 0, 000, 9, 999 | codán den dara, amhail is dá mba tar éis pointe deachúil, aon líon de dhigit | 
     | SS SS | 00, 99 | na céadta de dara, 2 dhigit | 
     | SSS | 000, 999 | na mílte an dara, 3 dhigit | 
     | Amharc ar gach eolas | 0, 0000, 86399999 | millisecond-de-lá, aon uimhir de dhigit | 
     | AAA macasamhail Coitianta | 00000000, 86399999 | millisecond-de-lá, 8 ndigit | 
     | N N N N N | 0, 0000000000000000, 86399999999999 | nanasecond-de-lá, aon líon na ndigití. I ERDDAP™ , tá sé seo teasctha go nMillis. | 
     | An bhfuil a fhios agat na buntáistí a bhaineann... | 00000000000000, 86399999999999 | nanasecond-de-lá, 14 dhigit. I ERDDAP™ tá sé seo teasctha go nMillis. | 
     | n | 0, 00000000000, 59999999999 | nanosecond-de-dara, aon líon de dhigit. I ERDDAP™ tá sé seo teasctha go nMillis. | 
     | Déan teagmháil linn | 00000000000, 59999999999 | nanosecond-de-dara, 11 digití. I ERDDAP™ tá sé seo teasctha go nMillis. | 
     | XXX, ZZZ | Z, -08:00, +01:00 | crios ama leis an bhformáid 'Z' nó ± (2 uair an chloig dhigit fhritháireamh) : (2 dhigit nóiméad fhritháireamh) . Seo déileálann *spás spás* mar + + + + + + (neamhchaighdeánach) . Tá ZZZ ag tacú le 'Z' neamhchaighdeánach ach déileálann sé le earráid úsáideora coitianta. | 
     | XX, ZZ | Z -0800, +0100 | crios ama leis an bhformáid 'Z' nó ± (2 uair an chloig dhigit fhritháireamh) : (2 dhigit nóiméad fhritháireamh) . Seo déileálann *spás spás* mar + + + + + + (neamhchaighdeánach) . Tá ZZ ag tacú le 'Z' neamhchaighdeánach ach déileálann sé le earráid úsáideora coitianta. | 
     | X, Z | Z, -08, +01 | crios ama leis an bhformáid 'Z' nó ± (2 uair an chloig dhigit fhritháireamh) : (2 dhigit nóiméad fhritháireamh) . Seo déileálann *spás spás* mar + + + + + + (neamhchaighdeánach) . Z tacaíocht 'Z' Is neamh-chaighdeánach ach a dhéileálann le earráid úsáideora coitianta. | 
     | xxx | \\-08:00, +01:00 | crios ama leis an bhformáid ± (2 uair an chloig dhigit fhritháireamh) : (2 dhigit nóiméad fhritháireamh) . Seo déileálann *spás spás* mar + + + + + + (neamhchaighdeánach) . | 
     | xx | \\-0800, +0100 | crios ama leis an bhformáid ± (2 uair an chloig dhigit fhritháireamh)  (2 dhigit nóiméad fhritháireamh) . Seo déileálann *spás spás* mar + + + + + + (neamhchaighdeánach) . | 
     | x x x x | \\-08, +01 | crios ama leis an bhformáid ± (2 uair an chloig dhigit fhritháireamh) . Seo déileálann *spás spás* mar + + + + + + (neamhchaighdeánach) . | 
     | '' | 'T', 'Z', 'GMT' | tús agus deireadh sraith de charachtair litriúil | 
     | '' '' (dhá Sleachta aonair)   | '' '' | dhá Sleachta aonair in iúl ceanglófar litriúil amháin | 
     |   \\[  \\]   |   \\[   \\]   | an tús (" " " \\[ " " ") agus deireadh (" " " \\] " " ") de chuid roghnach. Tá an nodaireacht tacaíocht ach amháin le haghaidh carachtair litriúil agus ag deireadh an teaghrán formáid. | 
     | #123;, &amp; # 125; | #123;, &amp; # 125; | in áirithe le húsáid sa todhchaí | 
     | G, L, Q,e,c, V,z, O,p |       | Tá na carachtair formáidithe tacaíocht ag Java 's DateTimeFormatter, ach faoi láthair gan tacaíocht ó ERDDAP . Más gá duit tacaíocht dóibh, ríomhphost Chris. John ag noaa.gov. | 
    
Nótaí:
    
    * I am dáta le poncú, d'fhéadfadh go mbeadh luachanna uimhriúla líon athraitheach na ndigití (e.g., i bhformáid dáta Slais na Stát Aontaithe "1/2/1985", d'fhéadfadh an mhí agus an dáta a bheith 1 nó 2 dhigit) mar sin ní mór don fhormáid úsáid a bhaint as comharthaí 1-litir, m.sh., M/d/yyy, a ghlacann le haon líon de dhigit ar feadh míosa agus dáta.
    * Má tá líon na ndigití le haghaidh mír tairiseach, m.sh., 01/02/1985, sonraigh ansin líon na ndigití san fhormáid, m.sh., MM/dd/yyyyy do mhí 2-digit, dáta 2-digit, agus 4 bhliain dhigit.
    * Tá na formáidí tricky a bheith ag obair leis. Is féidir formáid ar leith ag obair don chuid is mó, ach ní go léir, teaghráin ama le haghaidh athróg ar leith. Seiceáil i gcónaí go bhfuil an fhormáid a shonraigh tú ag obair mar a bhfuiltear ag súil i ERDDAP do gach ceann de na teaghráin ama athróg ar.
    * Nuair is féidir, beidh GenerateDatasetXml le fios teaghráin formáid ama.
    * Más gá duit cabhrú a ghiniúint teaghrán formáid, le do thoil ríomhphost Chris. John ag noaa.gov.

Athróg sonraí príomh-am (le haghaidh tacar sonraí tabular) agus an príomh-athróg ais ama (le haghaidh tacar sonraí gridded) atá aitheanta ag an [ destinationName ](#destinationname) am. Ní mór a n-aonad meiteashonraí a bheith ina teaghrán aonad UDUnits-comhoiriúnach le haghaidh luachanna ama uimhriúil, m.sh., "laethanta ó 1970-01" (le haghaidh tacair sonraí tabular nó gridded) , nó [aonaid oiriúnach do amanna teaghrán](#string-time-units) , m.sh., "M/d/yyyyy" (le haghaidh tacar sonraí tabular) .

Aonaid Ama éagsúla i Gridded éagsúla .nc Comhaid - Má tá bailiúchán de gridded agat .nc comhaid i gcás, don athróg ama, úsáideann fo-thacar amháin de na comhaid aonaid ama éagsúla ná fo-thacar amháin nó níos mó eile de na comhaid, is féidir leat é a úsáid [ EDDGrid Ón NcFilesUnpacked](#eddgridfromncfilesunpacked) . Athraíonn sé luachanna ama go "seconds since 1970-01-01T00:00:00Z" ag leibhéal níos ísle, rud a hiding na difríochtaí, ionas gur féidir leat a dhéanamh tacar sonraí amháin ó bhailiú na gcomhad ilchineálach.

###### AmStamp Athróga{#timestamp-variables} 
 [AmStamp Athróga](#timestamp-variables) -- Aon athróg eile ( axisVariable nó dataVariable , i EDDGrid nó tacar sonraí EDDTable) Is féidir a bheith ina athróg timeStamp. Tá athróg Timestamp athróg go bhfuil aonaid ama a bhaineann agus sonraí ama, ach tá&lt; destinationName bhéil seachas am. athróg TimeStamp iad féin a iompar mar an athróg ama is mó sa mhéid is go thiontú siad an fhoinse formáid ama i "seconds since 1970-01-01T00:00:00Z" agus / nó ISO 8601:2004 (E) formáid). ERDDAP™ aithníonn am Athróga Stampa ag a gcuid ama a bhaineann le " [minicíocht uisce: flúirseach](#units) " meiteashonraí, nach mór a mheaitseáil leis an abairt rialta seo " \\[ azA-Z \\] + + tairiscint + \\[ 0-9 \\] .+" (le haghaidh dáta uimhriúil Times, mar shampla, "seconds since 1970-01-01T00:00:00Z" ) nó a bheith ina dháta teaghrán formáid ama ina bhfuil "uuuu", "yyy" nó "YYY" (mar shampla, " yyyy-MM-dd 'T'H: mm: SZ") . Ach bain úsáid as fós destinationName   "time" don phríomhdháta Athróg ama.

 **Seiceáil i gcónaí do chuid oibre a bheith cinnte go bhfuil na sonraí ama a léiríonn suas i ERDDAP™ Is é na sonraí ama ceart.** Ag obair le sonraí ama i gcónaí tricky agus earráid seans maith.

Féach ar [tuilleadh eolais faoi athróg ama](#destinationname) .
 ERDDAP™ Tá fóntais a [Tiontaigh Numeric Am chun / ó String Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
Féach ar [Conas ERDDAP™ Déileáil le Am](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
         
        
######  valid\\_range  {#valid_range} 
*    [ ** valid\\_range ** , nó ** valid\\_min ** agus ** valid\\_max ** ](#valid_range) -- Tá na tréithe athróg OPTIONAL sainithe sa [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) coinbhinsiúin meiteashonraí. Mar shampla,

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

nó

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * Má tá siad i láthair, ba cheart iad a bheith ar an gcineál sonraí céanna leis an athróg, agus luachanna íosta bailí agus uasta na sonraí don athróg sin a shonrú. Ba chóir d'úsáideoirí luachanna a mheas lasmuigh den raon seo a bheith neamhbhailí.
    *    ERDDAP™ gan iarratas a dhéanamh valid\\_range . Said bhealach eile: ERDDAP™ nach bhfuil luachanna sonraí a thiontú taobh amuigh den valid\\_range leis an \\_Fill Luach nó missing\\_value . ERDDAP™ ach Gabhann ar na meiteashonraí seo agus fágann an t-iarratas suas duit.
Cén fáth? Sin cad é an meiteashonraí seo. Má bhí an soláthraí sonraí ag iarraidh, d'fhéadfadh an soláthraí sonraí a thiontú na luachanna sonraí lasmuigh den valid\\_range a bheith \\_FillValues. ERDDAP™ Ní dara buille faoi thuairim an soláthraí sonraí. Tá an cur chuige seo níos sábháilte: má léirítear ina dhiaidh sin go bhfuil an valid\\_range bhí ró-chúng nó mícheart ar shlí eile, ERDDAP™ Ní bheidh scriosta na sonraí.
    * Má tá na sonraí pacáilte leis [ scale\\_factor agus/nó add\\_offset ](#scale_factor) , valid\\_range , valid\\_min agus valid\\_max Ba chóir go mbeadh an cineál sonraí pacáilte agus luachanna. Ós rud é ERDDAP™ i bhfeidhm scale\\_factor agus add\\_offset nuair a luchtú sé an tacar sonraí, ERDDAP™ beidh unpack an valid\\_range , valid\\_min agus valid\\_max luachanna ionas go mbeidh an meiteashonraí scríbe (a thaispeántar d'úsáideoirí) cuirfidh sé an cineál agus an raon sonraí neamhphacáilte in iúl.
Nó, má tá unpacked\\_ valid\\_range Tá tréith i láthair, beidh sé a athainmniú valid\\_range nuair a bhíonn ERDDAP™ ualaí an tacar sonraí.
##### &lt;BainMVRows &amp; F;{#removemvrows} 
* [EN] ** &lt;bain úsáid as ** ] (Tuilleadh roghanna...) Is tag OPTIONAL laistigh de chlib i datasets.xml do EDDTableFromFiles (lena n-áirítear gach fo-aicme) datasets, cé go bhfuil sé in úsáid ach amháin le haghaidh EDDTableFromMultidimNcFiles. Is féidir go mbeadh luach fíor nó bréagach. Mar shampla, fíor
Cuireann sé seo aon bhloc sraitheanna ag deireadh grúpa ina bhfuil na luachanna go léir missing\\_value , \\_FillValue, nó an CoHort ...Array luach dúchais ar iarraidh (nó char = #32 do CharArrays) . Tá sé seo le haghaidh an CF DSG Iltoiseach cineál comhaid Array agus comhaid den chineál céanna. Más fíor, seo a dhéanann an tástáil chuí agus mar sin ualaí i gcónaí ar na hathróga dim max, mar sin d'fhéadfadh sé a ghlacadh am breise.
Is é an luach réamhshocraithe bréagach.
Mol -- Más féidir do do tacar sonraí, molaimid leagan bainMVRows a bréagach. Is féidir le fáil removeMVRows fíor mall go mór síos iarrataí, cé go bhféadfadh gá le haghaidh roinnt tacar sonraí.
