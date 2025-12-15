---
title: "EDDTableFromEML"
sidebar_position: 6
---
# An EDDTableFromEML agus EDDTableFromEMLBatch Roghanna i GenerateDatasets XLUMX

 \\[ Beidh an leathanach gréasáin a bheith ach amháin ar spéis leo ERDDAP™ riarthóirí a oibríonn le comhaid EML.
Cruthaíodh an doiciméad seo ar dtús in 2016. Rinneadh eagarthóireacht air go deireanach ar 2020-11-30. \\] 

 [ ** ERDDAP™ ** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) Is freastalaí sonraí a thugann úsáideoirí ar bhealach simplí, comhsheasmhach a íoslódáil fo-thacar de gridded agus tabular tacar sonraí eolaíochta i bhformáidí comhad coitianta agus graif agus léarscáileanna a dhéanamh. ERDDAP™ oibreacha le tacar sonraí áirithe mar ghrúpa de athróg greille tríthoiseach (e.g., sonraí satailíte nó samhail) nó mar tábla bunachar-mhaith (le colún do gach cineál faisnéise agus as a chéile do gach breathnóireacht) . ERDDAP™ Tá Bogearraí Foinse Saor in Aisce agus Oscailte, ionas gur féidir le duine ar bith [íoslódáil agus a shuiteáil ERDDAP™ ](/docs/server-admin/deploy-install) chun freastal ar a gcuid sonraí.

Chun tacar sonraí a chur leis ERDDAP™ suiteáil, an ERDDAP™ Ní mór riarthóir a chur le smután de XML cur síos ar an tacar sonraí le comhad ar a dtugtar datasets.xml . (Níl ann [doiciméadú críochnúil ar datasets.xml ](/docs/server-admin/datasets) .) Cé go bhfuil sé indéanta a ghiniúint an smután de XML do datasets.xml go hiomlán de láimh, ERDDAP™ thagann le uirlis ar a dtugtar [ **Socraigh mar teanga réamhshocraithe** ](/docs/server-admin/datasets#tools) is féidir a ghiniúint an dréacht garbh ar an smután de XML ag teastáil le haghaidh tacar sonraí ar leith bunaithe ar roinnt foinse eolais faoin tacar sonraí.

An chéad rud GenerateDatasets Xml Iarrann cén cineál tacar sonraí is mian leat a chruthú. Sonraí a ghiniúint Tá Xml rogha speisialta, **Seirbhísí ar líne** , a úsáideann an fhaisnéis i [Teanga meiteashonraí Éiceolaíochta (EML) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html) XML comhad a ghiniúint an smután de XML do datasets.xml a chruthú [EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles) tacar sonraí ó gach tábla sonraí i gcomhad EML. Oibríonn sé seo go han-mhaith le haghaidh an chuid is mó comhaid EML, den chuid is mó toisc go bhfuil comhaid EML post den scoth a stóráil gach ceann de na meiteashonraí is gá le haghaidh tacar sonraí i bhformáid éasca-le-obair-le-. Is é an t-eolas go GinrateDatasetsXml riachtanais a chruthú ar an tacar sonraí sa chomhad EML, lena n-áirítear an URL le haghaidh an comhad sonraí, a GinrateDatasetsXml íosluchtú, parses, agus i gcomparáid leis an cur síos sa chomhad EML. (Bheadh go leor grúpaí a dhéanamh go maith a aistriú chuig EML, a bhfuil córas iontach do dhoiciméadú aon tacar sonraí eolaíochta tabular, ní hamháin sonraí éiceolaíochta. Agus go leor grúpaí a chruthú go mbeadh schemas XML dhéanamh go maith a úsáid EML mar staidéar cás do scéimre XML atá soiléir, go dtí an pointe, nach bhfuil ró-doimhne (i.e., leibhéil an iomarca) , agus éasca do dhaoine agus ríomhairí a bheith ag obair leis.) 

## Ceisteanna agus Questions{#questions} 

Seo iad na ceisteanna go léir GenerateDatasets Beidh Xml iarraidh, le tuairimí faoi conas ba chóir duit a fhreagairt más mian leat a phróiseáil ach amháin comhad EML nó bhaisc de chomhaid EML:

* Cén EDDType?
Más mian leat a phróiseáil ach comhad amháin, freagra: EDDTableFromEML
Más mian leat a phróiseáil ar ghrúpa de chomhaid, freagra: EDDTableFromEMLBatch
* Eolaire chun comhaid a stóráil?
Cuir isteach an t-ainm ar an eolaire a bheidh in úsáid a stóráil íoslódáil EML agus / nó comhaid sonraí.
Más rud é nach bhfuil an eolaire ann, beidh sé a chruthú.
*    (Do EDDTableFromEML ach amháin) EML URL nó fileName áitiúil?
Cuir isteach an URL nó logainm an comhad EML.
*    (Do EDDTableFromEMLBatch amháin) EML dir (URL nó áitiúil) ?
Cuir isteach an t-ainm ar an eolaire leis na comhaid EML (URL nó dir áitiúil) .
Mar shampla:http://sbc.lternet.edu/data/eml/files/
*    (Do EDDTableFromEMLBatch amháin) Athróg Filename?
Cuir isteach an abairt rialta a bheidh in úsáid a aithint na comhaid EML ag teastáil san eolaire EML.
Mar shampla: knb-fosbc\\.\\
* Bain úsáid as comhaid áitiúla más ann dóibh (fíor fíor | foirm duille: oval) ?
Iontráil fíor a bhaint as na comhaid EML áitiúil agus comhaid sonraí atá ann cheana féin, má tá siad ann.
Iontráil bréagach a ath-íoslódáil i gcónaí ar na comhaid EML agus / nó comhaid sonraí.
* ar fáil Chun?
Más mian leat na tacair sonraí nua a bheith tacair sonraí príobháideacha i ERDDAP , sonrófar ainm an ghrúpa (s s) a cheadófar rochtain.
Molta do ghrúpaí LTER: cuir "fosfá" le chéile móide an grúpa, m.sh., lter Sbc .
Má théann tú isteach "null", ní bheidh aon&lt;ar fáil Chun &amp; tag san aschur.
Féach ar [ar fáil Chun](/docs/server-admin/datasets#accessibleto) .
* áitiúil áitiúil tréimhse de chuid eile: aon (e.g., SAM / Saor) ?
Má léiríonn athróg ama go bhfuil luachanna ama áitiúla aige, beidh an crios ama seo a shannadh.
Ní mór gur luach é seo ón [TZ liosta colún na n-ainmneacha crios ama](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) .
Tabhair faoi deara gach ceann de na hainmneacha "US /..." éasca le húsáid ag deireadh an liosta.
Má fhaigheann tú níos déanaí go bhfuil a bheith mícheart, is féidir leat athrú ar an time\\_zone i smután de datasets.xml .

EML móide ERDDAP™ Is meascán mór, ós rud é ERDDAP™ is féidir a thabhairt d'úsáideoirí rochtain níos dírí ar an saibhreas [Líonra Eolais do Biocomplexity (An bhfuil tú) ](https://knb.ecoinformatics.org/) agus [Taighde Éiceolaíochta Fadtéarmach (Leathanach) ](https://lternet.edu/) sonraí agus cabhrú leis na tionscadail freastal ar rialtas na Stát Aontaithe [Rochtain Phoiblí ar Thorthaí Taighde (PARR PARR) riachtanais na gcustaiméirí](https://nosc.noaa.gov/EDMC/PD.DSP.php) trí na sonraí a chur ar fáil trí sheirbhís gréasáin. Chomh maith leis sin, EML móide ERDDAP™ cosúil le droichead mór idir eolaithe sa réimse acadúil / NSF-mhaoinithe agus eolaithe sa ghníomhaireacht cónaidhme ( NOAA , NASA, USGS) réimse.

Féach ar ár [alt ar thacaíocht bhreise a fháil](/docs/intro#support) .
 
## Naisc go dtí suíomhanna eile{#design-details} 

Seo iad na sonraí a dhearadh ar an rogha EDDTableFromEML i GenerateDatasetsXml.
Roinnt a bhaineann le difríochtaí i conas EML agus ERDDAP™ rudaí a dhéanamh agus conas GenerateDatasets Déileálann Xml leis na fadhbanna seo.

### Tiocfaidh chun bheith One Sonraí ERDDAP™ Toradh na sonraí{#one-datatable-becomes-one-erddap-dataset} 
D'fhéadfadh amháin EML comhad a bheith il&lt;data recovery Tábla &amp; s. ERDDAP™ a dhéanann ceann amháin ERDDAP™ tacar sonraí in aghaidh EML dataTable. An bhfuil datasetID don tacar sonraí
 *Déan Teagmháil Linn* Táirgí gaolmhara *duille dath: glas*   (nuair a bhfuil EMLname téacs) nó
 *Córas iompair* Táirgí gaolmhara *duille dath: glas*   (nuair a bhfuil EMLname uimhir) .
Mar shampla, tábla #1 sa chomhad knb-fosb.28, thiocfaidh chun bheith ERDDAP™   datasetID Sonraí Teagmhála
     
### EML versus CF + ACD{#eml-versus-cfacdd} 
Faigheann beagnach gach ceann de na meiteashonraí sna comhaid EML isteach ERDDAP , ach i bhformáid éagsúla. ERDDAP™ úsáidí na [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) agus [Clár na dToghthóirí](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) caighdeáin meiteashonraí. Tá siad córais meiteashonraí comhlántacha a úsáideann eochair = péirí luach do meiteashonraí domhanda agus do gach athróg meiteashonraí.
Sea, Is é an ionadaíocht EML na meiteashonraí níos deise ná an ionadaíocht CF + ACD. Níl mé ag moladh ag baint úsáide as an CF + ACD ionadaíocht mar athsholáthair don EML. Smaoinigh ar CF + ACD mar chuid den droichead ón domhan EML go dtí an OPeNDAP / CF / domhan CLD.
     
### Athruithe Beaga{#small-changes} 
 ERDDAP™ a dhéanann a lán de na hathruithe beaga. Mar shampla, ERDDAP™ Úsáideann an EML neamh- DOI malartach malartach Aitheantóir chomh maith le líon sonraí a Thástáil mar an ERDDAP™   datasetID , ach athruithe beagán malartach Aitheantas chun é a dhéanamh ainm athraitheach bailí i bhformhór na dteangacha ríomhaireachta, e.g., sonraí knb-lter-sbc.33 Tábla #1 thiocfaidh chun bheith knb\\_lter\\_sbc\\_33\\_t1.
     
### Déan teagmháil{#docbook} 
Úsáideann EML córas marcála DocBook ar struchtúr a chur ar fáil chun bloic téacs i gcomhaid EML. CF agus ACDD cheangal go meiteashonraí a bheith téacs plain. Mar sin GenerateDatasets Xml athraíonn an téacs marcáilte suas i téacs plain go Breathnaíonn cosúil leis an leagan formáidithe den téacs. Na clibeanna inlíne sanitized le lúibíní cearnach, m.sh., \\[ béim \\] , agus d'fhág sa téacs plain.
     
### irl - Library Service{#data-files} 
Ós rud é go n-áirítear an EML dataTable an URL an comhad sonraí iarbhír, GenerateDatasets Beidh Xml:
1. Íoslódáil an comhad sonraí.
2. Stóráil sé san eolaire céanna leis an gcomhad EML.
3. Léigh na sonraí.
4. Déan comparáid idir an cur síos ar na sonraí sa EML leis na sonraí iarbhír sa chomhad.
5. Má Gintear Xml fhaigheann difríochtaí, Déileálann sé leo, nó iarrann an t-oibreoir má tá na difríochtaí ceart go leor, nó tuairisceáin teachtaireacht earráide. Tá na sonraí i míreanna éagsúla thíos.
         
###  .zip 'd Comhaid Sonraí{#zipd-data-files} 
Má tá an comhad sonraí tagartha .zip comhad, ní mór ach comhad amháin a bheith ann. Beidh an comhad a úsáid le haghaidh ERDDAP™ tacar sonraí. Má tá níos mó ná 1 comhad. ERDDAP™ a dhiúltú go tacar sonraí. Más gá, d'fhéadfaí é seo a mhodhnú. (Go praiticiúil, tá gach comhad zip SBC LTER ach comhad sonraí amháin.)   
     
### tréimhse saoil: ilbhliantúil{#storagetype} 
Má stóráil colún Níl Cineál sonraithe, ERDDAP™ Úsáideann a buille faoi thuairim is fearr bunaithe ar na sonraí sa chomhad sonraí. Oibríonn sé seo go maith go leor.
     
### Amharc ar gach eolas{#units} 
 ERDDAP™ úsáidí [ UDUNITS formáidiú d'aonaid](https://www.unidata.ucar.edu/software/udunits/) . Sonraí a ghiniúint Xml in ann a thiontú aonaid EML a UDUNITS glan thart ar 95% den am. Na torthaí 5% atá fágtha i cur síos inléite ar na haonaid, m.sh., "biomassDensityUnitPerAbundanceUnit" i EML thiocfaidh chun bheith "aonad dlús bioomass in aghaidh an aonaid raidhse" i ERDDAP . Níl sé seo ceadaithe go teicniúil. Ní dóigh liom go bhfuil sé chomh dona faoi na himthosca. \\[ Más gá, aonaid nach féidir a dhéanamh UDUNITS d'fhéadfaí comhoiriúnach a aistriú chuig an athróg ar tréith comment. \\]   
     
### Leagan EML 2.1.1{#eml-version-211} 
Cuireadh an tacaíocht le haghaidh EML v2.1.1 comhaid le GinrateDatasets Xml i 2016 leis an dóchas go mbeadh roinnt uptake sa phobal EML. Amhail ó 2020, nár tharla. An bhfuil ERDDAP™ Bheadh forbróirí a bheith sásta tacaíocht a chur le haghaidh leaganacha níos déanaí de EML, ach amháin má tá na gnéithe nua a úsáid i ndáiríre. Cuir ríomhphost chugainn erd.data at noaa.gov más mian leat tacaíocht le haghaidh leaganacha níos déanaí de EML agus beidh a úsáid i ndáiríre an ghné seo.
     

## Saincheisteanna leis na Comhaid EML{#issues-with-the-eml-files} 

Tá roinnt saincheisteanna / comharthaí leis na comhaid EML a chur faoi deara fadhbanna nuair a cliant bogearraí (mar shampla an rogha EDDTableFromEML i GenerateDatasetsXML) iarracht a léirmhíniú / a phróiseáil na comhaid EML.

* Cé go bhfuil roinnt saincheisteanna atá liostaithe anseo, tá siad den chuid is mó beag, fadhbanna solvable. Go ginearálta, tá EML córas mór agus tá sé mo áthas a bheith ag obair leis.
* Tá siad seo curtha in eagar go garbh ó measa / is coitianta a laghad olc / níos coitianta.
* An chuid is mó a bhaineann le fadhbanna beaga i gcomhaid EML ar leith (nach bhfuil locht EML ar) .
* Is féidir an chuid is mó a shocrú ag athruithe simplí ar an comhad EML nó comhad sonraí.
* Ós rud é go bhfuil daoine LTER ag tógáil ar checker EML a thástáil ar bhailíocht na comhaid EML, tá mé a leanas roinnt moltaí thíos maidir le gnéithe a d'fhéadfaí a chur leis an checker.

Seo iad na saincheisteanna:

### Dáta agus am Colúin{#separate-date-and-time-columns} 
Tá roinnt comhaid sonraí colúin ar leith le haghaidh dáta agus le haghaidh am, ach aon dáta aontaithe colún+time. Faoi láthair, GenerateDatasets Cruthaíonn Xml tacar sonraí leis na colúin ar leith, ach níl sé oiriúnach mar gheall ar:

* Tá sé is fearr má tacair sonraí i ERDDAP™ go bhfuil colún chomhaimseartha dáta ar a dtugtar "time" .
* Go minic ní bheidh an tacar sonraí ualach i ERDDAP™ mar gheall ar an "time" Ní colún bhfuil dáta + sonraí ama.

Tá dhá réitigh is féidir:
1. Edit an comhad sonraí foinse a chur le colún nua sa datafile (agus cur síos air sa EML) i gcás an dáta agus na colúin ama a chumasc isteach i gcolún amháin. Ansin rerun GenerateDatasets Xml mar sin faigheann sé an colún nua.
2. Úsáid an [Athróg díorthaithe](/docs/server-admin/datasets#script-sourcenamesderived-variables) gné i ERDDAP™ a shainiú athróg nua i datasets.xml a cruthaíodh tríd an dáta agus na colúin ama a chalabrú. Déileálann ceann de na samplaí go sonrach leis an staid seo.
         
### Inconsistent Column Ainmneacha{#inconsistent-column-names} 
Na comhaid EML liosta colúin an comhad sonraí agus a n-ainmneacha. Ar an drochuair, tá siad go minic difriúil ó na hainmneacha colún sa comhad sonraí iarbhír. De ghnáth, is é an t-ordú colún sa chomhad EML mar an gcéanna leis an ordú colún sa chomhad sonraí, fiú má athraíonn na hainmneacha beagán, ach ní i gcónaí. Sonraí a ghiniúint Déanann Xml iarracht na hainmneacha colún a mheaitseáil. Nuair nach féidir é (is coitianta) , beidh sé stop a chur, a thaispeáint duit an EML / data filename péirí, agus a iarraidh má tá siad ailínithe i gceart. Má théann tú isteach 's' a skip tábla, beidh GeneratedDatasetsXml phriontáil teachtaireacht earráide agus dul ar aghaidh go dtí an chéad tábla eile.
Is é an réiteach a athrú ar na hainmneacha colún earráideach sa chomhad EML a mheaitseáil leis na hainmneacha colún sa chomhad sonraí.
     
### Ordú Colún Éagsúla{#different-column-order} 
Tá roinnt cásanna ina sonraíodh an EML na colúin in ord difriúil ná mar atá siad sa chomhad sonraí. Sonraí a ghiniúint Beidh Xml stopadh agus a iarraidh ar an oibreoir má tá na matchups ceart go leor nó más rud é gur chóir an tacar sonraí a skipped. Más rud é go bhfuil sé scafa, beidh teachtaireacht earráide sa chomhad torthaí, m.sh.,:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\\_lter\\_sbc\\_17\\_t1
      dataFile=all\\_fish\\_all\\_years\\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\\_TIMING        = notes
        NOTES                = survey\\_timing
      --&gt;
```
Is é an réiteach a shocrú ar an ordú colún sna comhaid EML ionas go mheaitseáil siad an t-ordú sna comhaid sonraí.

Bheadh sé deas má sheiceáil an tseiceálaí EML go bhfuil na colúin agus ord colún sa chomhad foinse mheaitseáil na colúin agus ordú colún sa chomhad EML.
    
### numHeaderLines mícheart{#incorrect-numheaderlines} 
Roinnt sonraí Táblaí stáit mícheart numHeaderLines = 1, m.sh., ...sbc.4011. Na cúiseanna seo ERDDAP™ an chéad líne sonraí a léamh mar ainmneacha an cholúin. Rinne mé iarracht de láimh SKIP gach ceann de na dataTables. Tá siad soiléir toisc go bhfuil na hainmneacha col foinse unmatched gach luachanna sonraí. Agus má tá comhaid go mícheart numHeaderLines = 0, Ní mo chóras a dhéanamh soiléir. Seo sampla ó na teipeanna SBC LTER comhad:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3017\\_t1
      dataFile=MC06\\_allyears\\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\\_local
        2008-10-01T07:00     = timestamp\\_UTC
        2.27                 = discharge\\_lps
        -999.0               = water\\_temperature\\_celsius
      --&gt;
```
Mar sin, d'fhéadfadh an earráid le feiceáil amhail is dá GenerateDatasets Xml cheapann go bhfuil an chéad líne le sonraí sa chomhad (e.g., le 2008-10-01T00:00 srl.) is é an líne le hainmneacha colún (amhail is dá mba ainm colún 2008-10-01T00:00) .

Bheadh sé deas má sheiceáil an EML an luach numHeaderLines.
    
### numHeaderLines = 0{#numheaderlines--0} 
Ní roinnt comhaid foinse bhfuil ainmneacha colún. ERDDAP™ Glacann go má dhéanann an EML cur síos ar an líon céanna colúin.

I mo thuairim: is cosúil seo an-chontúirteach. D'fhéadfadh colúin a bheith in ord difriúil nó le haonaid éagsúla (féach thíos) agus níl aon bhealach a ghabháil leis na fadhbanna. Tá sé i bhfad níos fearr má tá gach comhad sonraí ASCII as a chéile le hainmneacha colún.
    
### DateTime Formáid Stringsa{#datetime-format-strings} 
Tá EML ar bhealach caighdeánach chun cur síos formáidí am dáta. ach tá éagsúlacht mhór ina úsáid i gcomhaid EML. (Bhí mé mícheart roimhe seo faoi seo. Feicim an doiciméadú EML le haghaidh formáidString is cosúil a mheaitseáil leis an [ Java Sonraíocht Dáta](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html) , ach a bhfuil easpa na treoirlínte tábhachtacha mar gheall ar a úsáid, leis an toradh go bhfuil formáid Go minic / de ghnáth a úsáidtear go míchuí.) Tá roinnt cásanna le cás mícheart, agus / nó dúbailt mícheart litir, agus / nó formáidiú neamhchaighdeánach. Cuireann sin ualach míréasúnta ar chliaint, go háirithe cliaint bogearraí ar nós GenerateDatasetsXml. Sonraí a ghiniúint Xml iarracht a thiontú na formáidí a shainmhínítear go mícheart i gcomhaid EML isteach
 [an fhormáid dáta/am go ERDDAP™ Éilíonn](/docs/server-admin/datasets#string-time-units) , atá beagnach comhionann le haghaidh Java / sonraíocht formáid ama Joda, ach tá beagán níos forgiving.

Bheadh sé deas más gá an checker EML cloí go docht leis an Java Seirbhís do Chustaiméirí ERDDAP aonad ama sonraíocht agus a fhíorú go bhféadfadh luachanna am dáta sa tábla sonraí a bheith parsed i gceart leis an bhformáid sonraithe.
    
### Dáta Tuairimí Ré{#datetime-but-no-time-zone} 
Sonraí a ghiniúint Breathnaíonn Xml do cholún le dáta Am agus crios ama sonraithe (ceachtar Zulu : ó aonaid ama dar críoch 'Z' nó sainmhíniú ainm colúin nó tréith lena n-áirítear "gmt" nó "utc", nó áitiúil: ó "áitiúil" in ainm colún nó sainmhíniú tréith) . Chomh maith leis sin tá inghlactha comhad le colún dáta ach aon cholún am. Chomh maith leis sin tá inghlactha comhad gan aon dáta nó am faisnéise.

Sonraí a ghiniúint Xml déileálann gach "áitiúil" amanna mar a bheith as an crios ama is féidir leat a shonrú le haghaidh bhaisc ar leith de chomhaid, m.sh., do SBC LTER, úsáid a bhaint as US / Fanacht. Tá an t-eolas uaireanta sna tuairimí, ach ní i bhfoirm atá éasca le haghaidh clár ríomhaire a figiúr amach.

Comhaid nach gcomhlíonann na critéir seo a diúltaíodh leis an teachtaireacht "NÍO GOOD DÁTA (AMACH) VARIABLE". Tá fadhbanna coitianta:

* Tá colún le dátaí agus colún le hamanna, ach ní dáta colún ama.
* Tá aonaid ama, ach nach bhfuil an crios ama sonraithe.

Tuairimí eile:
Má tá dáta maith + am le colún crios ama, beidh an colún sin a ainmniú "time" i ERDDAP . ERDDAP™ Éilíonn an am sin sonraí colún a thuiscint / invertible a Zulu / UTC / GMT am crios dateTimes. \\[ Is é mo chreideamh: ag baint úsáide as amanna áitiúla agus formáidí dáta / ama éagsúla (2-digit blianta&#33; mm / liath vs dd / mm / liath vs...) i comhaid sonraí fórsaí an t-úsáideoir deiridh a dhéanamh comhshó casta a Zulu am chun sonraí a chur i gcomparáid ó tacar sonraí amháin le sonraí ó chéile. Mar sin, ERDDAP™ caighdeánaíonn na sonraí ama go léir: Le haghaidh amanna teaghrán, ERDDAP™ i gcónaí úsáideann an ISO 8601:2004 (E) formáid chaighdeánach, mar shampla, 1985-01-02T00:00:00Z. Le haghaidh amanna uimhriúil, ERDDAP™ úsáidí i gcónaí "seconds since 1970-01-01T00:00:00Z" . ERDDAP™ i gcónaí a úsáideann an Zulu   (UTC, GMT) crios ama a bhaint as na deacrachtaí a bhaineann le bheith ag obair le criosanna ama éagsúla agus am caighdeánach i gcoinne am sábháil solas an lae. Mar sin GenerateDatasets Xml Féachann colún EML dataTable le dáta + am Zulu . Tá sé seo deacair toisc nach bhfuil EML a úsáid foclóir foirmiúil / córas (maith liom [ Java Formáid ama Joda](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html) ) chun na sonraí a shonrú Formáid ama:
Má tá col le luachanna ama uimhriúil (e.g., Matlab amanna) agus Zulu crios ama (nó díreach dátaí, gan aon colúin ama) , úsáidtear é mar "time" .
Má tá col le sonraí dáta agus am, ag baint úsáide as an Zulu crios ama, úsáidtear é mar "time" agus baintear aon dáta nó colún ama eile.
Else má tá col le faisnéis dáta amháin le fáil, tá sé in úsáid mar an "time" athraitheach (gan aon crios ama) .
Má tá colún sonraí agus colún ama agus aon dáta comhcheangailte colún ama, tá an tacar sonraí ATHBHREITHNITHE - ach d'fhéadfaí an tacar sonraí a dhéanamh inúsáidte trí chur le dáta comhcheangailte colún Am (b'fhearr, Zulu crios ama) leis an comhad sonraí agus a chur leis a chur síos sa chomhad EML.
SEACHADADH ó SBC LTER: [https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/) dataTable #2.

Bheadh sé deas más rud é EML / LTER ag teastáil an áireamh colún le Zulu   (UTC, GMT) amanna crios ama i ngach comhad sonraí foinse ábhartha. Ar Aghaidh is fearr a chur le córas a EML a shonrú time\\_zone tréith ag baint úsáide as ainmneacha caighdeánach (ó na [colún TZ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) ) .
    
### Ag iarraidh missing\\_value  {#missing-missing_value} 
Roinnt colúin a úsáid missing\\_value ach ná é a liostáil sna meiteashonraí EML, m.sh., deascadh \\_mm i n-úsáidí knb-fosb.5011 -999. Má tá aon luach ar iarraidh sonraithe sa EML, GinrateDatasetsXml cuardaigh go huathoibríoch do luachanna ar iarraidh coitianta (mar shampla, 99, -99, 999, -999, 9999, -999, etc.) agus cruthaíonn sé go meiteashonraí. Ach ar iarraidh eile missing\\_value s nach bhfuil gafa.

Bheadh sé deas má d'fhéach an checker EML ar iarraidh missing\\_value s.
    
### Fadhbanna Beaga{#small-problems} 
Tá a lán fadhbanna beaga (litriú, poncaíocht) a bheidh dócha ach amháin le fáil ag iniúchadh an duine gach tacar sonraí.

Bheadh sé deas má d'fhéach an checker EML le haghaidh litriú agus earráidí gramadaí. Is é seo an fhadhb deacair toisc go bhfuil focail san eolaíocht bratach go minic ag seiceálaithe litrithe. Tá eagarthóireacht daonna is dócha ag teastáil.
    
### Carachtair Unicode luachmhar{#invalid-unicode-characters} 
Tá cuid de an t-ábhar EML carachtair Unicode neamhbhailí. Is iad seo is dócha carachtair ó na charset Windows a bhí chóipeáil go mícheart agus a ghreamú isteach an UTF-8 comhaid EML. Sonraí a ghiniúint Xml sanitizes na carachtair a e.g., \\[ Tuilleadh roghanna... \\] , mar sin tá siad éasca a chuardach le haghaidh sa ERDDAP™   datasets.xml comhad.

Bheadh sé deas má sheiceáil an EML seo. Tá sé éasca a fháil agus éasca a shocrú.
    
### Aonaid Cholún éagsúla] (cliceáil grianghraf a mhéadú)  {#different-column-unitsdifferentcolumnunits} 
Roinnt Sonraí EML sainmhíniú colúin atá ar neamhréir leis na colúin sa chomhad sonraí, go háirithe toisc go bhfuil siad aonaid éagsúla. Sonraí a ghiniúint Xml bratacha seo. Tá sé suas go dtí an t-oibreoir a chinneadh an bhfuil na difríochtaí ceart nó nach bhfuil. Na feiceáil sa chomhad teipeanna mar "SKIPPED" dataTables. EXAMPLE i SBC LTER teipeanna comhad:
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3\\_t1
      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch
        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch
      -->
```
Bheadh sé deas má sheiceáil an tseiceálaí EML go bhfuil an mheaitseáil aonad. Ar an drochuair, tá sé seo dócha dodhéanta a ghabháil agus ansin dodhéanta a réiteach gan teagmháil a dhéanamh leis an cruthaitheoir tacar sonraí, ós rud é nach bhfuil an comhad foinse san áireamh aonaid. An neamhréireacht mar shampla thuas a bhí ach faoi deara toisc go raibh na haonaid san áireamh san ainm colún foinse agus an t-ainm colún EML. Cé mhéad sonraí eile Tá an fhadhb seo ach tá undetectable?
    
### Leaganacha éagsúla de EML{#different-versions-of-eml} 
Sonraí a ghiniúint Tá Xml deartha chun obair le EML 2.1.1. Beidh leaganacha eile de EML ag obair a mhéid a mheaitseáil siad 2.1.1 nó go bhfuil GenerateDatasetsXml cód speisialta chun déileáil leis. Is fadhb annamh é seo. Nuair a tharlaíonn sé, Is é an réiteach a thiontú do chuid comhad a EML 2.1.1, nó an comhad EML a sheoladh chuig erd.data at noaa.gov , mar sin is féidir liom athruithe a dhéanamh ar GenerateDatasets Xml chun déileáil leis na difríochtaí.

Chuir Bob tacaíocht le haghaidh comhaid EML a GenerateDatasets Xml i 2016 leis an dóchas go mbeadh roinnt uptake sa phobal EML. Amhail ó 2020, nár tharla. Tá Bob sásta tacaíocht a chur le haghaidh leaganacha níos déanaí de EML, ach amháin má tá na gnéithe nua a úsáid i ndáiríre. Cuir ríomhphost chugainn erd.data at noaa.gov más mian leat tacaíocht le haghaidh leaganacha níos déanaí de EML agus beidh a úsáid i ndáiríre an ghné seo.
    
### Trioblóid Ag Comhbhrú leis an Comhad Sonraí{#trouble-parsing-the-data-file} 
Go hiondúil, d'fhéadfaí dataTable a dhiúltú leis an earráid "líon gan choinne míreanna ar líne #120 (breathnaithe =52, ag súil = 50) " " " Ciallaíonn teachtaireacht earráide mar seo go raibh líne sa comhad sonraí roinnt luachanna éagsúla ná na línte eile. D'fhéadfadh sé a bheith ina fhadhb i ERDDAP™   (e.g., ní parsáil an comhad i gceart) nó sa chomhad. SEACHADADH ó SBC LTER:
 [https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/) dataTable #3, féach datafile = LTER\\_mí\\_bottledata\\_register\\_stations\\_20140429.txt
