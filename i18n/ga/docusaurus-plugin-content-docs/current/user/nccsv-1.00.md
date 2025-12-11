---
title: "NCCSV 1.00"
---

# NCCSV -
Amharc ar gach eolas NetCDF - Comhoiriúnach ASCII CSV Sonraíocht Comhad,
Leagan 1.00

Bob Simons agus Steve Hankin
"NCCSV" ag Bob Simons agus Steve Hankin ceadúnaithe faoi [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 

##  [Déan teagmháil anois](#introduction)  {#introduction} 

Sonraítear sa doiciméad seo formáid comhaid téacs ASCII CSV a d'fhéadfadh an fhaisnéis go léir a bheith ann (meiteashonraí agus sonraí) is féidir a fháil i NetCDF   .nc comhad go bhfuil tábla CSV-comhad-mhaith sonraí. Ní mór an síneadh comhad le haghaidh comhad téacs ASCII CSV tar éis an tsonraíocht seo a bheith .csv ionas gur féidir é a léamh go héasca agus i gceart i gcláir scarbhileog cosúil le Excel agus Google Sheets. Scríobhfaidh Bob Simons bogearraí chun comhad NCCSV a thiontú ina NetCDF -3 (agus b'fhéidir freisin NetCDF -4)   .nc comhad, agus an droim ar ais, gan aon chaillteanas faisnéise. Tá Bob Simons mhodhnú [ ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) chun tacú le léamh agus scríobh an cineál comhaid seo.

Tá an fhormáid NCCSV deartha ionas gur féidir le bogearraí scarbhileog ar nós Excel agus Google Sheets comhad NCCSV a allmhairiú mar chomhad csv, le gach ceann de na faisnéis i gcealla an scarbhileog réidh le haghaidh eagarthóireachta. Nó, is féidir scarbhileog a chruthú ó thús tar éis na gcoinbhinsiún NCCSV. Beag beann ar fhoinse an scarbhileog, má onnmhairítear é ansin mar chomhad .csv, beidh sé i gcomhréir leis an tsonraíocht NCCSV agus ní chaillfear aon fhaisnéis. Is iad na difríochtaí ach idir comhaid NCCSV agus na comhaid scarbhileog atá cosúil a leanann na coinbhinsiúin seo:

* Tá luachanna ar líne scartha ag comhaid NCCSV.
Tá luachanna ag bileoga ar líne i gcealla in aice láimhe.
* Tá comharthaí i gcomhaid NCCSV timpeallaithe go minic ag Sleachta dúbailte.
Riamh Tá comharthaí i scarbhileoga timpeallaithe ag Sleachta dúbailte.
* Sleachta dúbailte inmheánach (" " ") i Stringsa i gcomhaid NCCSV le feiceáil mar 2 Sleachta dúbailte.
Sleachta dúbailte inmheánach i scarbhileoga le feiceáil mar 1 ceanglófar dúbailte.

Féach an [Bileog eolais](#spreadsheets) alt thíos le haghaidh tuilleadh eolais.

### Sruthlíniú{#streamable} 
Cosúil comhaid CSV i gcoitinne, tá comhaid NCCSV insruthaithe. Dá bhrí sin, má tá NCSV a ghintear ar-an-eitilt ag freastalaí sonraí ar nós [ ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) , is féidir leis an bhfreastalaí tús a chur le sonraí a sruth chuig an iarrthóir sula bhfuil gach ceann de na sonraí a bailíodh. Is gné úsáideach agus inmhianaithe é seo. NetCDF nach bhfuil comhaid, i gcodarsnacht leis sin, insruthaithe.

###  ERDDAP™  {#erddap} 
Tá an tsonraíocht seo deartha ionas go mbeidh comhaid NCCSV agus na .nc Is féidir comhaid is féidir a chruthú uathu a úsáid ag [ ERDDAP™ data recovery service](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (tríd an [Seirbhís do Chustaiméirí](/docs/server-admin/datasets#eddtablefromnccsvfiles) agus [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) Cineálacha tacar sonraí) , ach tá an tsonraíocht seo seachtrach go ERDDAP . ERDDAP™ Tá tréithe domhanda ag teastáil agus go leor tréithe domhanda agus athraitheacha molta, bunaithe den chuid is mó ar CF agus tréithe ACDD (féach
 [/docs / server-admin / datasets #global-oinn](/docs/server-admin/datasets#global-attributes) ).

### Iarmhéid nua 574{#balance} 
Is é an dearadh ar an bhformáid NCCSV cothromaíocht de roinnt ceanglas:

* Ní mór na comhaid go léir na sonraí agus meiteashonraí a bheadh i tabular NetCDF comhad, lena n-áirítear cineálacha sonraí sonracha.
* Ní mór na comhaid a bheith in ann a léamh isteach agus ansin a scríobh as scarbhileog gan aon chaillteanas faisnéise.
* Ní mór na comhaid a bheith éasca do dhaoine a chruthú, in eagar, léamh, agus a thuiscint.
* Ní mór na comhaid a bheith in ann a bheith gan athbhrí parsed ag cláir ríomhaire.

Más cosúil go bhfuil roinnt riachtanas sa doiciméad seo corr nó picky, is dócha go bhfuil sé ag teastáil chun freastal ar cheann de na ceanglais seo.

### Sonraíochtaí eile{#other-specifications} 
Tagraíonn an tsonraíocht seo do shonraíochtaí agus leabharlanna éagsúla eile go bhfuil sé ceaptha a bheith ag obair leis, ach nach bhfuil an tsonraíocht seo mar chuid d'aon cheann de na sonraíochtaí eile, ná ní gá aon athruithe a dhéanamh orthu, ná ní chuireann sé salach orthu. Mura sonraítear sonraí a bhaineann le ceann de na caighdeáin seo anseo, féach an tsonraíocht a bhaineann leo. Go suntasach, áirítear leis seo:

* An Coinbhinsiún ómós d'Fhionnachtan Sonraí (Clár na dToghthóirí) meiteashonraí caighdeánach:
     [https://wiki.esipfed.org/Attribute\\_Convention\\_for\\_Data\\_Discovery\\_1-3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) .
* An Aeráid agus Réamhaisnéis (CF) meiteashonraí caighdeánach:
     [https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) .
* An bhfuil NetCDF Treoir Úsáideora (NUG) :
     [https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html) .
* An bhfuil NetCDF leabharlanna bogearraí ar nós NetCDF - java agus NetCDF -c:
     [https://www.unidata.ucar.edu/software/netcdf/](https://www.unidata.ucar.edu/software/netcdf/) . Ní féidir leis na leabharlanna a léamh comhaid NCCSV, ach is féidir leo a léamh .nc comhaid a cruthaíodh ó chomhaid NCCSV.
* JSON: [https://www.json.org/](https://www.json.org/) 

### Amharc ar gach eolas{#notation} 
Sa tsonraíocht seo, lúibíní, \\[   \\] , míreanna roghnacha denote.

##  [Struchtúr na hEagraíochta](#file-structure)  {#file-structure} 

Tá comhad iomlán NCCSV comhdhéanta de dhá rannóg: an t-alt meiteashonraí, ina dhiaidh sin ag an rannóg sonraí.

Ní mór go bhfuil comhaid NCCSV ach 7-giotán carachtair ASCII. Mar gheall ar seo, d'fhéadfadh an sraith carachtar nó ionchódú a úsáidtear a scríobh agus a léamh an comhad a bheith ar aon sraith carachtar nó ionchódú atá ag luí leis an sraith carachtar ASCII 7-giotán, mar shampla, ISO-8859-1. ERDDAP™ léann agus scríobhann comhaid NCCSV leis an charset ISO-8859-1.

Is féidir le comhaid NCCSV ceachtar líne nua a úsáid ( \\n )   (atá coitianta ar Linux agus Mac OS X ríomhairí) nó iomparReturn móide líne nua ( \\r\\n )   (atá coitianta ar ríomhairí Windows) mar marcóirí deiridh ar líne, ach ní araon.

###  .nccsv Meiteashonraí{#nccsvmetadata} 
Nuair a bhíonn an cruthaitheoir agus an léitheoir araon ag súil leis, is féidir agus uaireanta úsáideach a dhéanamh ar leagan de chomhad NCCSV ina bhfuil ach an t-alt meiteashonraí (lena n-áirítear an\\*Déan Teagmháil Linn\\*líne líne líne) . Soláthraíonn an toradh cur síos iomlán ar tréithe an chomhaid, ainmneacha athraitheacha, agus cineálacha sonraí, dá bhrí sin ag freastal ar an gcuspóir céanna leis an .das móide .dds freagraí ó OPeNDAP freastalaí. ERDDAP™ beidh an t-athrú seo ar ais má iarrann tú comhad Cineál = .nccsv Metadata ó ERDDAP™ tacar sonraí.

##  [An Rannóg meiteashonraí](#the-metadata-section)  {#the-metadata-section} 

I gcomhad NCCSV, úsáideann gach líne den chuid meiteashonraí an fhormáid
 [athraitheach Ainm an ainm](#variablename) , [tréith Ainm an ainm](#attributename) , [luach 1](#value)  \\[ , luach 2 \\]  \\[ , luach 3 \\]  \\[ , luach4 \\]  \\[ ... \\]   
Ní Spásanna roimh nó tar éis míreanna a cheadaítear toisc go bhfuil siad faoi deara fadhbanna nuair a allmhairiú an comhad i gcláir scarbhileog.

### Coinbhinsiúin{#conventions} 
Is é an chéad líne de chomhad NCCSV an chéad líne den roinn meiteashonraí agus ní mór a bheith acu [\\*GLOBAL\\*](#global) Coinbhinsiúin tréith liostú gach ceann de na coinbhinsiúin a úsáidtear sa chomhad mar Teaghrán ina bhfuil liosta CSV, mar shampla:
\\*GLOBAL\\*, coinbhinsiúin," COARDS , CF-1.6, ACDD-1.3, NCCSV-1.0"
Ní mór ceann de na coinbhinsiúin atá liostaithe a bheith NCCSV-1.0, a thagraíonn don leagan reatha den tsonraíocht seo.

### END_METADATA{#end_metadata} 
Ní mór deireadh an chuid meiteashonraí de chomhad NCCSV a chur in iúl le líne amháin
\\*Déan Teagmháil Linn\\*

Moltar ach ní gá go léir de na tréithe le haghaidh athróg ar leith le feiceáil ar línte in aice leis an roinn meiteashonraí. Má tá comhad NCCSV thiontú i NetCDF comhad, beidh an t-ordú go bhfuil an athróg Names le feiceáil ar dtús sa roinn meiteashonraí a bheith ar an ord na n-athróg sa NetCDF comhad.

Línte bán Roghnach a cheadaítear sa roinn meiteashonraí tar éis an chéad líne is gá le [\\*GLOBAL\\*](#global)   [Coinbhinsiúin](#conventions) Eochairfhocal information (féach thíos) agus roimh an líne seo caite ag teastáil leis\\*Déan Teagmháil Linn\\*.

Má chruthaítear scarbhileog ó chomhad NCCSV, beidh an t-alt sonraí meiteashonraí le feiceáil le hainmneacha athraitheacha i gcolún A, ainmneacha tréith i gcolún B, agus luachanna i gcolún C.

Má tá scarbhileog tar éis na coinbhinsiúin seo a shábháil mar chomhad CSV, is minic a bheidh cuimhne breise ag deireadh na línte sa roinn meiteashonraí. Na bogearraí a athraíonn comhaid NCCSV isteach .nc Beidh comhaid neamhaird a dhéanamh ar an commas breise.

###  [athraitheach Ainm an ainm](#variablename)  {#variablename} 

 *athraitheach Ainm an ainm* ainm cás-íogair athróg sa chomhad sonraí. Ní mór do gach ainm athraitheach tús a chur le litir ASCII 7-giotán nó underscore agus a bheith comhdhéanta de litreacha ASCII 7-giotán, underscores, agus 7-giotán ASCII dhigit.
#### GLOBAL{#global} 
An athróg speisialta Name [\\*GLOBAL\\*](#global) a úsáidtear chun meiteashonraí domhanda a thaispeáint.

###  [tréith Ainm an ainm](#attributename)  {#attributename} 

 *tréith Ainm an ainm* gurb é ainm cás-íogair tréith a bhaineann le hathróg nó [\\*GLOBAL\\*](#global) . Ní mór do gach ainm tréith tosú le litir ASCII 7-giotán nó underscore agus a bheith comhdhéanta de litreacha ASCII 7-giotán, underscores, agus 7-giotán ASCII dhigit.

#### SCALAR{#scalar} 
An tréith speisialta Ainm an ainm\\*SCALAR\\*Is féidir é a úsáid chun athróg sonraí scalar a chruthú agus a luach a shainiú. An cineál sonraí an\\*SCALAR\\*Sainmhíníonn an cineál sonraí don athróg, mar sin ní gá a shonrú\\*Amharc ar gach eolas\\*tréith le haghaidh athróg scalar. Tabhair faoi deara nach mór sonraí a bheith ann don athróg scalar sa Rannóg Sonraí den chomhad NCCSV.

Mar shampla, a chruthú athróg scalar ainmnithe "long" leis an luach "Okeanos Explorer" agus tréith cf\\_role, a úsáid:
long,\\*SCALAR\\*"Okeanos Explorer"
long, cf\\_role, trajectory
Nuair a athróg sonraí scalar léamh isteach ERDDAP™ , déantar an luach scalar a thiontú ina cholún sa tábla sonraí leis an luach céanna ar gach sraith.

###  [luach](#value)  {#value} 

 *luach* Is é an luach an tréith meiteashonraí agus ní mór a bheith ina sraith le ceann amháin nó níos mó de cheachtar a byte, gearr, orlach, fada, snámhphointe, dúbailte, String, nó char. Ní thacaítear le cineálacha sonraí eile. Ní thabharfar neamhaird ar aon luach. Má tá níos mó ná aon fholuach amháin ann, ní mór go mbeadh na foluachanna go léir den chineál céanna sonraí agus scartha ag camóga, mar shampla:
 sst , actual\\_range 0.17f,23.58f
Má tá luachanna teaghrán il, bain úsáid as teaghrán amháin le \\n   (free line) carachtair scaradh na substrings.

Is iad na sainmhínithe ar na cineálacha sonraí tréith:

#### byte{#byte} 
* luachanna tréith (8-giotán, sínithe) ní mór é a scríobh leis an iarmhír 'b', e.g., -7b, 0b, 7b . Is é an raon luachanna teoranta bailí ná -128 go 127. Tá roinnt a bhreathnaíonn cosúil le beart ach tá sé neamhbhailí (e.g., 128b) Beidh a ghiniúint teachtaireacht earráide.
     
#### gearr gearr gearr{#short} 
* luachanna tréith gearr (16-giotán, sínithe) ní mór é a scríobh leis an iarmhír 's', e.g., -30000s, 0s, 30000s. Is é an raon luachanna gearr bailí -32768 go 32767. Tá roinnt go Breathnaíonn cosúil le gearr ach tá neamhbhailí (mar shampla, 32768s) Beidh a ghiniúint teachtaireacht earráide.
     
#### taiseachas aeir: fliuch{#int} 
* luachanna tréith intleacht (32-giotán, sínithe) ní mór é a scríobh mar insí JSON gan pointe deachúil nó exponent, ach leis an iarmhír 'i', m.sh., -12067978i, 0i, 12067978i. Is é an raon luachanna int bailí -2147483648 go 2147483647. Tá roinnt go Breathnaíonn cosúil le ian ach tá sé neamhbhailí (e.g., 21474836) Beidh a ghiniúint teachtaireacht earráide.
     
#### fada{#long} 
* luachanna tréith fada (64-giotán, sínithe, tacaithe faoi láthair ag NUG agus ERDDAP™ ach nach bhfuil tacaíocht fós ag CF) ní mór é a scríobh gan pointe deachúil agus leis an iarmhír 'L', m.sh., -12345678987654321L, 0L, 12345678987654321L . Má úsáideann tú na bogearraí a athrú a thiontú comhad NCCSV le luachanna fada isteach NetCDF -3 comhad, Beidh aon luachanna fada a thiontú go luachanna dúbailte. Is é an raon luachanna fada bailí -9223372036854775808 go 9223372036854775807. Tá roinnt go Breathnaíonn cosúil le fada ach tá neamhbhailí (e.g., 92233720368547758L) Beidh a ghiniúint teachtaireacht earráide.
     
#### snámhphointe{#float} 
* luachanna tréith (32-giotán) ní mór é a scríobh leis an iarmhír 'f' agus d'fhéadfadh pointe deachúil agus/nó exponent, m.sh., 0f, 1f, 12.34f, 1e12f, 1.23e+12f, 1.23e12f, 1.23e12f, 1.87E-7f. Úsáid NaNf le haghaidh snámhphointe NaN (ar iarraidh) luach. Is é an raon de snámhphointe thart ar +/-3.40282347E +38f (~ 7 dhigit deachúil suntasach) . Tá roinnt go Breathnaíonn cosúil le snámhphointe ach tá neamhbhailí (e.g., 1.0e39f) Beidh a ghiniúint teachtaireacht earráide.
     
#### dúbailte dúbailte dúbailte{#double} 
* luachanna tréith dúbailte (64-giotán) ní mór é a scríobh leis an iarmhír 'd' agus b'fhéidir go mbeadh pointe deachúil agus/nó exponent, m.sh., 0d, 1d, 12.34d, 1e12d, 1.23e+12d, 1.23e12d, 1.87E-7d. Úsáid NaNd le haghaidh NaN dúbailte (ar iarraidh) luach. Is é an raon dúbailte thart ar +/-1.79769313486231570E +308d (~ 15 dhigit deachúil suntasach) . Tá roinnt go Breathnaíonn cosúil le dúbailte ach tá neamhbhailí (e.g., 1.0e309d) Beidh a ghiniúint teachtaireacht earráide.
     
#### String{#string} 
* Tá luachanna tréith teaghrán sraith de charachtair UCS-2 (i.e., 2-byte carachtair Unicode, mar atá i Java ) , ní mór a scríobh mar ASCII 7-giotán, teaghráin JSON-mhaith ionas gur féidir carachtair neamh-ASCII a shonrú.
    * Sleachta dúbailte (" " ") Ní mór a ionchódú mar dhá Sleachta dúbailte ("") . Sin an méid a éilíonn cláir scarbhileog nuair a léamh.csv comhaid. Sin an méid a scríobh cláir scarbhileog nuair a shábháil tú scarbhileog mar .csv comhad.
    * Ní mór an speisialta JSON backslash-ionchódaithe carachtair a ionchódú mar i JSON (notably \\n (nua-líne), ach freisin \\\\\ (backslash), \\f (beathaform), \\t (tab), \\r (tuairisceán carráiste) nó leis an [Táirgí gaolmhara *Tá an* ](#uhhhh) syntax. I scarbhileog, ná bain úsáid as Alt Cuir isteach chun líne nua a shonrú laistigh de chill téacs; ina ionad sin, úsáid a bhaint as \\n   (2 carachtair: backslash agus 'n '') a chur in iúl líne nua.
#####  \\uhhh Is maith liom{#uhhhh} 
    * Ní mór gach carachtar níos lú ná carachtar #32 nó níos mó ná carachtar #126, agus ní ionchódaithe ar shlí eile, a ionchódú leis an syntax \\u *Tá an* , i gcás inarb é hhhh an uimhir heicseagánach 4-digit den charachtar, m.sh., is é an comhartha Euro \\ \\u20AC. Féach ar na leathanaigh cód tagairt ag [https://en.wikipedia.org/wiki/Unicode](https://en.wikipedia.org/wiki/Unicode) chun teacht ar na huimhreacha hexadecimal a bhaineann le carachtair Unicode ar leith, nó a úsáid leabharlann bogearraí.
    * Má tá spás ag an Curtain ag an tús nó an deireadh, nó folaíonn sé " (ceanglófar dúbailte) nó camóg, nó ina bhfuil luachanna a bheadh a léiriú ar shlí eile mar chineál sonraí éigin eile (e.g.) , nó is é an focal "null", ní mór an Curtain ar fad a bheith iniata i Sleachta dúbailte; ar shlí eile, murab ionann agus JSON, tá na Sleachta dúbailte inclosing roghnach. Molaimid: nuair a bhíonn amhras ort, cuir an Curtain ar fad i Sleachta dúbailte. Spásanna ag tús nó deireadh le String discouraged go láidir.
    * Chun anois, tá an úsáid a bhaint as carachtair níos mó ná #255 discouraged. Tacaíonn NCCSV leo. ERDDAP™ tacú leo go hinmheánach. Roinnt cineálacha comhaid aschur tacaíocht a thabhairt dóibh (e.g., .json agus .nccsv ) . Ach ní thacaíonn go leor cineálacha comhaid aschuir leo. Mar shampla, NetCDF -3 Ní comhaid tacaíocht carachtair den sórt sin mar gheall ar NetCDF comhaid a úsáid 1-byte carachtair agus CF faoi láthair nach bhfuil córas a shonrú conas carachtair Unicode ionchódaithe i NetCDF soilse loingseoireachta E (e.g., UTF-8) . Beidh sé seo feabhas dócha le himeacht ama.
         
#### foirm duille: líneach{#char} 
* Tá luachanna tréith char carachtar UCS-2 amháin (i.e., 2-byte carachtair Unicode, mar atá i Java ) , Ní mór a bheith scríofa mar ASCII 7-giotán, JSON-mhaith carachtair ionas gur féidir carachtair eile a shonrú (féach an sainmhíniú Teaghrán thuas le haghaidh ionchódú carachtair speisialta, leis an Chomh maith le ionchódú ceanglófar amháin mar \\ '') . Ní mór luachanna tréith Char a bheith iniata i Sleachta aonair (na Sleachta istigh) agus Sleachta dúbailte (na Sleachta seachtrach) , m.sh., "'a'", "'" (carachtar ceanglófar dúbailte) ", '\'' (carachtar ceanglófar amháin) , "'\t'" (a tab) ", "\\u20AC" (carachtar Euro) . Tá an córas seo a úsáid Sleachta aonair agus dúbailte corr agus cumbersome, ach tá sé ar bhealach chun idirdhealú a dhéanamh luachanna char ó Strings ar bhealach a oibríonn le scarbhileoga. Beidh luach a bhreathnaíonn cosúil le char ach tá neamhbhailí ghiniúint teachtaireacht earráide. Mar is amhlaidh le Stringsa, tá úsáid carachtair níos mó ná #255 discouraged faoi láthair.

### Amharc ar gach eolas{#suffix} 
Tabhair faoi deara go sa rannóg tréithe de chomhad NCCSV, ní mór litir iarmhír a bheith ag gach luachanna tréith uimhriúil (e.g.) a aithint ar an gcineál sonraí uimhriúil (e.g.) . Ach sa chuid sonraí de chomhad NCCSV, ní mór go mbeadh na litreacha iarmhíre seo ag luachanna sonraí uimhriúla (cé is moite de 'L' le haghaidh slánuimhreacha fada) — sonraítear an cineál sonraí ag an\\*Amharc ar gach eolas\\*tréith don athróg.

#### DATA_TYPE{#data_type} 
An cineál sonraí do gach neamh- [taiseachas aeir: fliuch](#scalar) Ní mór athróg a shonrú ag\\*Amharc ar gach eolas\\*tréith is féidir a bhfuil luach de byte, gearr, orlach, fada, snámhphointe, dúbailte, String, nó char (cás íogair) . Mar shampla,
qc\\_flag,\\*Amharc ar gach eolas\\*taiseachas aeir: fliuch
WARNING: Ag sonrú an ceart\\*Amharc ar gach eolas\\*Tá do fhreagracht. Ag sonrú an cineál sonraí mícheart (e.g., int nuair ba chóir duit a bheith snámhphointe sonraithe) Ní ghineann teachtaireacht earráide agus d'fhéadfadh sé a chur faoi deara faisnéis a bheith caillte (e.g., beidh luachanna snámhphointe a chothromú le insí) nuair a bheidh an comhad NCCSV léamh ag ERDDAP™ nó a chomhshó ina NetCDF comhad.

### Díroghnaigh gach rud{#char-discouraged} 
Tá an úsáid a bhaint as luachanna sonraí Car discouraged toisc nach bhfuil siad tacaíocht go forleathan i cineálacha comhaid eile. Is féidir luachanna char a scríobh sa rannóg sonraí mar charachtair aonair nó mar Thongs (go háirithe, más gá duit carachtar speisialta a scríobh) . Má tá Teaghrán le fáil, úsáidfear an chéad charachtar den String mar luach an char. Déanfar teagráin fad Zero agus luachanna ar iarraidh a thiontú go carachtar \\uFF. Tabhair faoi deara go NetCDF comhaid tacaíocht ach amháin chars byte amháin, mar sin beidh aon chars níos mó ná char #255 a thiontú go '?' nuair a scríobh NetCDF comhaid. Mura n-úsáidtear tréith charset chun charset difriúil a shonrú le haghaidh athróg char, úsáidfear an charset ISO-8859-1.

### Díroghnaigh gach rud{#long-discouraged} 
Cé go leor cineálacha comhaid (e.g., NetCDF -4 agus json) agus ERDDAP™ tacú le luachanna sonraí fada, tá úsáid luachanna sonraí fada i gcomhaid NCCSV á dhíspreagadh faoi láthair toisc nach bhfuil siad tacaíocht faoi láthair ag Excel, CF agus NetCDF -3 comhaid. Más mian leat luachanna sonraí fada a shonrú i gcomhad NCCSV (nó sa scarbhileog Excel comhfhreagrach) , ní mór duit an iarmhír 'L' a úsáid ionas nach gcaitheann Excel na huimhreacha mar uimhreacha pointe snámh le cruinneas níos ísle. Faoi láthair, má tá comhaid NCCSV thiontú i NetCDF -3 .nc comhad, beidh luachanna sonraí fada a thiontú ina luachanna dúbailte, is cúis le caillteanas cruinneas do luachanna an-mhór (níos lú ná -2^53 nó níos mó ná 2 ^53) .

### CF, ACDD, agus ERDDAP™ Meiteashonraí{#cf-acdd-and-erddap-metadata} 
Ós rud é go bhfuil sé beartaithe go bhfuil an chuid is mó comhaid NCCSV, nó an .nc comhaid a cruthaíodh uathu, Beidh a léamh isteach ERDDAP , tá sé molta go láidir go n-áirítear comhaid NCCSV na tréithe meiteashonraí atá ag teastáil nó molta ag ERDDAP™ (féach)
 [/docs / server-admin / datasets #global-oinn](/docs/server-admin/datasets#global-attributes) ). Is iad na tréithe beagnach ar fad ó na caighdeáin meiteashonraí CF agus ACDD agus freastal ar cur síos i gceart ar na tacar sonraí (cé, cad, nuair, cén fáth, conas) le duine a bhfuil aithne aige nó aici ar shlí eile aon rud mar gheall ar an tacar sonraí. As tábhacht ar leith, ba cheart go mbeadh tréith aonad ag beagnach gach athróg uimhriúil le UDUNITS -luach comhoiriúnach, e.g.,
 sst , aonaid, céim \\_C

Tá sé breá a chur san áireamh tréithe breise nach bhfuil ó na caighdeáin CF nó ACDD nó ó ERDDAP .

##  [An Rannóg Sonraí](#the-data-section)  {#the-data-section} 

###  [Struchtúr na hEagraíochta](#structure)  {#structure} 

Ní mór liosta de na hainmneacha athróg atá íogair ó thaobh cáis de a bheith ag an gcéad líne den chuid sonraí. Ní mór gach ceann de na hathróga sa liosta seo a chur síos sa roinn meiteashonraí, agus vice versa (seachas [\\*GLOBAL\\*](#global) tréithe agus [\\*SCALAR\\*](#scalar) athsheoltóra) .

Ní mór go mbeadh liosta de luachanna ar leith ag an dara ceann trí línte leathdhéanacha an ailt sonraí. Ní mór go mbeadh an líon céanna luachanna ag gach sraith sonraí mar an liosta comhscartha d'ainmneacha athraitheacha. Ní Spásanna roimh nó tar éis luachanna a cheadaítear toisc go bhfuil siad faoi deara fadhbanna nuair a allmhairiú an comhad i gcláir scarbhileog. Ní foláir ach luachanna an\\*Amharc ar gach eolas\\*sonraithe don athróg ag an\\*Amharc ar gach eolas\\*tréith don athróg. Murab ionann agus an roinn tréithe, ní mór go mbeadh litreacha iarmhíre ag luachanna uimhriúla sa rannán sonraí chun an cineál sonraí a chur in iúl. Murab ionann agus an t-alt tréithe, d'fhéadfadh luachanna carthanacha sa roinn sonraí an ceanglófar aonair a fhágáil ar lár mura bhfuil siad ag teastáil le haghaidh díbhrithe (dá bhrí sin, ',' agus '\' Ní mór a lua mar a thaispeántar anseo) . D'fhéadfadh go mbeadh aon líon de na sraitheanna sonraí i gcomhad NCCSV, ach faoi láthair ERDDAP™ Is féidir a léamh ach comhaid NCCSV le suas le thart ar 2 billiún sraitheanna. Go ginearálta, moltar go roinneann tú tacar sonraí móra i gcomhaid sonraí NCCSV il le níos lú ná 1 milliún sraitheanna gach ceann.

#### Sonraí Teagmhála{#end-data} 
Ní mór deireadh an ailt sonraí a chur in iúl ag líne gan ach
\\*END\\_DATA\\*

Má tá ábhar breise sa chomhad NCCSV tar éis an\\*END\\_DATA\\*líne, déanfar neamhaird air nuair a dhéantar an comhad NCCSV a thiontú ina .nc comhad. Tá ábhar den sórt sin discouraged dá bhrí sin.

I scarbhileog tar éis na gcoinbhinsiún seo, beidh na hainmneacha athraitheacha agus na luachanna sonraí i gcolúin éagsúla. Féach an sampla thíos.

###  [Luachanna ar Iarraidh](#missing-values)  {#missing-values} 

Is féidir luachanna ar iarraidh uimhriúil a scríobh mar luach uimhriúil arna sainaithint ag missing\\_value nó \\_FillValue tréith don athróg. Mar shampla, féach an dara luach ar an tsraith sonraí seo:
cliceáil grianghraf a mhéadú
Is é seo an bealach molta a láimhseáil luachanna ar iarraidh le haghaidh byte, gearr, int, agus athróg fada.

Is féidir snámhphointe nó dúbailte luachanna NaN a scríobh mar NaN. Mar shampla, féach an dara luach ar an tsraith sonraí seo:
cliceáil grianghraf a mhéadú

Is féidir le luachanna ar iarraidh teaghrán agus uimhriúil a chur in iúl ag réimse folamh. Mar shampla, féach an dara luach ar an tsraith sonraí seo:
cliceáil grianghraf a mhéadú

Le haghaidh byte, gearr, int, agus athróg fada, an fóntais tiontaire NCCSV agus ERDDAP™ Beidh thiontú réimse folamh isteach an luach uasta a cheadaítear don chineál sonraí (e.g., 127 le haghaidh beart) . Má dhéanann tú seo, a bheith cinnte a chur leis missing\\_value nó \\_FillValue tréith don athróg sin chun an luach seo a aithint, e.g.,
 *athraitheach Ainm an ainm* ,\\_FillValue,127b
Do snámhphointe agus athróga dúbailte, beidh réimse folamh a thiontú go NaN.

###  [Luachanna Dáta](#datetime-values)  {#datetime-values} 

Luachanna Dáta (lena n-áirítear luachanna dáta nach bhfuil comhpháirt ama) Is féidir ionadaíocht a dhéanamh mar uimhreacha nó mar Thongs i gcomhaid NCCSV. Is féidir le athróg dáta áirithe a bheith ach luachanna String nó luachanna uimhriúla amháin, ní araon. Beidh na bogearraí NCCSV thiontú luachanna dáta StringTime isteach dáta uimhriúil Luachanna ama nuair a chruthú .nc comhaid comhad (de réir mar a éilíonn CF) . Tá luachanna String dateTime an buntáiste a bheith inléite go héasca ag daoine.

Ní mór go mbeadh tréith aonad ag luachanna DateTime a léiríonn an " *minicíocht uisce: flúirseach* ó shin *dáta an dáta Am agus am* " mar a cheanglaítear le CF agus a shonraítear ag UDUNITS , m.sh.,
am, aonaid, soicind ó 1970-01T00:00:00Z

Ní mór luachanna DateTime ionadaíocht mar luachanna String bheith acu Curtain\\*Amharc ar gach eolas\\*tréith agus aonad tréith a shonraíonn dáta patrún ama mar atá sonraithe ag an Java Dáta Tuairimí Ré
 ( [https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) ) . Mar shampla,
am, aonaid, yyyy-MM-dd 'T'H: mm: SZ
Ní mór gach luachanna dateTime le haghaidh athróg sonraí ar leith a úsáid an fhormáid chéanna.
I bhformhór na gcásanna, beidh an patrún dateTime gá duit le haghaidh an tréith aonad a bheith ina athrú ar cheann de na formáidí:

*    yyyy-MM-dd 'T'H: mm:s. SSSZ - a bhfuil an ISO 8601:2004 (E) dáta an dáta Formáid ama. Is féidir leat gá leagan giorraithe de seo, m.sh., yyyy-MM-dd 'T'H: mm: SZ (an fhormáid molta amháin) nó yyyy-MM-dd . Má tá tú ag athrú an fhormáid de do luachanna dateTime, Molann NCCSV go láidir go bhfuil tú ag athrú ar an bhformáid seo (b'fhéidir ghiorrú) . Níl an Tweet seo ar fáil ERDDAP™ úsáid nuair a scríobhann sé comhaid NCCSV.
* yyyyMMddHmms.SSS — arb é an leagan dlúth den ISO 8601:2004 dáta Formáid ama. Is féidir leat gá leagan giorraithe de seo, m.sh., yyyyMMdd.
* M/d/yyy H: mm:s. SSS - a Láimhseálann dátaí agus dateTimes US cosúil le "3/23/2017 16:22:03.000". Is féidir leat gá leagan giorraithe de seo, m.sh., M / d/yyyy.
* yyyyDDHHmmsSSS - is é an bhliain móide an lá nialas-padded na bliana (e.g, 001 = Jan 1, 365 = 31 i mbliain neamh-leap; tá sé seo ar a dtugtar uaireanta hearráideach an dáta Julian) . Is féidir leat gá leagan giorraithe de seo, m.sh., yyyyDDDD.

#### Beachtas beachtais{#precision} 
Nuair a athraíonn leabharlann bogearraí ar .nc comhad isteach i gcomhad NCCSV, gach dáta Beidh luachanna ama a scríobh mar Thongs leis an ISO 8601:2004 (E) dáta an dáta Formáid ama, mar shampla, 1970-01-01T00:00:00Z . Is féidir leat an cruinneas a rialú leis an ERDDAP - tréith shonrach time\\_precision . Féach ar
 [Roghnaigh gach rud time\\_precision ](/docs/server-admin/datasets#time_precision) .

#### Crios ama{#time-zone} 
An crios ama réamhshocraithe le haghaidh dáta Is luachanna ama an Zulu   (nó GMT) crios ama, nach bhfuil aon tréimhsí ama a shábháil solas an lae. Má tá athróg dateTime luachanna dáta ó chrios ama éagsúla, ní mór duit é seo a shonrú leis an ERDDAP - tréith shonrach time\\_zone . Níl an Tweet seo ar fáil ERDDAP™ (féach)
 [Roghnaigh gach rud time\\_zone ](/docs/server-admin/datasets#time_zone) ).

###  [Luachanna Céime](#degree-values)  {#degree-values} 

Mar is gá ag CF, gach luachanna céime (e.g., le fada agus domhanleithead) Ní mór a bheith sonraithe mar luachanna dúbailte deachúil-céim, ní mar céim°min'sec" String nó mar athróga ar leith do chéimeanna, nóiméad, soicind. Ní cheadaítear na dearthóirí treo N, S, E, agus W. Bain úsáid as luachanna diúltacha le haghaidh faide siar agus le haghaidh domhanleithead Theas.

##  [DSG Cineálacha Gné](#dsg-feature-types)  {#dsg-feature-types} 

D'fhéadfadh comhad NCCSV bhfuil CF Discrete Sampling Céimseata
 ( [https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) ) sonraí. Is iad na tréithe a dhéanann an obair seo:

1. Mar is gá de réir CF, ní mór go n-áireofaí sa chomhad NCCSV líne sa rannóg meiteashonraí a shainaithníonn an [\\*GLOBAL\\*](#global)   featureType tréith, mar shampla,
    \\*GLOBAL\\*, featureType taiseachas aeir: fliuch
2. Le húsáid i ERDDAP™ , Ní mór an comhad NCCSV áireamh líne nó línte sa roinn meiteashonraí a shainaithníonn an cf\\_role =...\\_id athróg, m.sh.,
long, cf\\_role, trajectory
Tá sé seo roghnach do CF, ach is gá i NCCSV.
3. Le húsáid i ERDDAP™ , Ní mór an comhad NCCSV áireamh líne nó línte sa roinn meiteashonraí a aithint a athróg a bhaineann le gach timeSeries, trajectory, nó próifíl de réir mar is gá ERDDAP™ (féach)
     [Sonraí Teagmhála](/docs/server-admin/datasets#cdm_data_type) ), e.g.
    \\*GLOBAL\\*,cdm\\_trajectory\\_variables, "long"
nó
    \\*GLOBAL\\*,cdm\\_timeseries\\_variables, "station \\_id,lat,lon"

##  [Déan Teagmháil Linn](#sample-file)  {#sample-file} 

Seo comhad sampla a léiríonn go leor de na gnéithe de chomhad NCCSV:
```
\\*GLOBAL\\*,Conventions,"COARDS, CF-1.6, ACDD-1.3, NCCSV-1.0"
\\*GLOBAL\\*,cdm\\_trajectory\\_variables,"ship"
\\*GLOBAL\\*,creator\\_email,erd.data@noaa.gov
\\*GLOBAL\\*,creator\\_name,Bob Simons
\\*GLOBAL\\*,creator\\_type,person
\\*GLOBAL\\*,creator\\_url,https://www.pfeg.noaa.gov
\\*GLOBAL\\*,featureType,trajectory
\\*GLOBAL\\*,infoUrl,https://erddap.github.io/docs/user/nccsv-1.00
\\*GLOBAL\\*,institution,"NOAA NMFS SWFSC ERD, NOAA PMEL"
\\*GLOBAL\\*,license,"""NCCSV Demonstration"" by Bob Simons and Steve Hankin is
    licensed under CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ ."
\\*GLOBAL\\*,keywords,"NOAA, sea, ship, sst, surface, temperature, trajectory"
\\*GLOBAL\\*,standard\\_name\\_vocabulary,CF Standard Name Table v55
\\*GLOBAL\\*,subsetVariables,"ship"
\\*GLOBAL\\*,summary,"This is a paragraph or two describing the dataset."
\\*GLOBAL\\*,title,"NCCSV Demonstration"
ship,\\*DATA\\_TYPE\\*,String
ship,cf\\_role,trajectory\\_id
time,\\*DATA\\_TYPE\\*,String
time,standard\\_name,time
time,units,"yyyy-MM-dd'T'HH:mm:ssZ"
lat,\\*DATA\\_TYPE\\*,double
lat,units,degrees\\_north
lon,\\*DATA\\_TYPE\\*,double
"lon","units","degrees\\_east"
status,\\*DATA\\_TYPE\\*,char
status,comment,"From http://some.url.gov/someProjectDocument , Table C"
testLong,\\*DATA\\_TYPE\\*,long
testLong,units,1
sst,\\*DATA\\_TYPE\\*,float
sst,standard\\_name,sea\\_surface\\_temperature
sst,actual\\_range,0.17f,23.58f
sst,units,degree\\_C
sst,missing\\_value,99f
sst,testBytes,-128b,0b,127b
sst,testShorts,-32768s,0s,32767s
sst,testInts,-2147483648i,0i,2147483647i
sst,testLongs,-9223372036854775808L,0L,9223372036854775807L
sst,testFloats,-3.40282347e38f,0f,3.40282347E+38f
sst,testDoubles,-1.79769313486231570e308d,0d,1.79769313486231570E+308d
sst,testChars,"','","'""'","'\\u20AC'"
sst,testStrings," a~,\\n'z""\\u20AC"

\\*END\\_METADATA\\*
ship,time,lat,lon,status,testLong,sst
Bell M. Shimada,2017-03-23T00:45:00Z,28.0002,-130.2576,A,-9223372036854775808L,10.9
Bell M. Shimada,2017-03-23T01:45:00Z,28.0003,-130.3472,\\u20AC,-1234567890123456L,
"Bell M. Shimada","2017-03-23T02:45:00Z",28.0001,-130.4305,"'\\t'",0L,10.7
Bell M. Shimada,2017-03-23T12:45:00Z,27.9998,-131.5578,"'""'",1234567890123456L,99
Bell M. Shimada,2017-03-23T21:45:00Z,28.0003,-132.0014,\\u00fc,9223372036854775806L,10.0
Bell M. Shimada,2017-03-23T23:45:00Z,28.0002,-132.1591,,NaN
```
Nótaí:

* Cuimsíonn an comhad sampla go leor cásanna deacra (e.g., athróg char agus fada agus luachanna teaghrán deacair) . Beidh an chuid is mó comhaid NCCSV a bheith i bhfad níos simplí.
* Tá an líne ceadúnas briste i dhá líne anseo, ach tá ach líne amháin sa chomhad sampla.
* \\ Is é \\u20AC ionchódú charachtar an euro agus is é \\u00FC ionchódú ü.
* Go leor Stringsa sa sampla atá faoi iamh ag Sleachta dúbailte cé nach bhfuil siad a bheith, m.sh., tréithe domhanda go leor lena n-áirítear an teideal, an tréith aonad lon, agus an líne 3ú sonraí.)
* Bheadh sé níos soiléire agus níos fearr má scríobhadh na haonaid tréith don athróg testLong i Sleachta dúbailte a léiríonn go bhfuil sé ina luach Curtain. Ach an ionadaíocht reatha (1, gan Sleachta) a léiriú i gceart mar Teaghrán, ní slánuimhir, toisc nach bhfuil aon 'i' iarmhír.
* Murab ionann agus cineálacha sonraí uimhriúla eile, tá an iarmhír ag na luachanna fada sa rannán sonraí ('L') aithníonn a gcineál sonraí uimhriúla. Tá sé seo ag teastáil chun cosc scarbhileoga ó léirmhíniú na luachanna mar uimhreacha pointe snámh agus dá bhrí sin a chailliúint cruinneas.

##  [Scaipbhileoga](#spreadsheets)  {#spreadsheets} 

I scarbhileog, mar atá i gcomhad NCCSV:

* Scríobh luachanna tréith uimhriúil mar atá sonraithe do chomhaid NCCSV (e.g., le litir iarmhíre, m.sh., 'f', chun cineál sonraí na tréithe a aithint) .
* I Stringsa, scríobh na carachtair níos lú ná carachtar ASCII #32 nó níos mó ná carachtar #126 mar ceachtar carachtar JSON-mhaith backslashed (e.g., \\n le haghaidh líne nua) nó mar an uimhir charachtar Unicode hexadecimal (cás íogair) leis an syntax [Táirgí gaolmhara *Tá an* ](#uhhhh)   (e.g., \\u20AC don chomhartha Euro) . Úsáid Úsáid Úsáidte \\n   (2 carachtair: backslash agus 'n '') a chur in iúl líne nua, ní Alt Iontráil.

Is iad na difríochtaí amháin idir comhaid NCCSV agus an scarbhileog chomhchosúil a leanann na coinbhinsiúin seo:

* Tá luachanna ar líne scartha ag comhaid NCCSV.
Tá luachanna ag bileoga ar líne i gcealla in aice láimhe.
* Tá comharthaí i gcomhaid NCCSV timpeallaithe go minic ag Sleachta dúbailte.
Riamh Tá comharthaí i scarbhileoga timpeallaithe ag Sleachta dúbailte.
* Sleachta dúbailte inmheánach (" " ") i Stringsa i gcomhaid NCCSV le feiceáil mar 2 Sleachta dúbailte.
Sleachta dúbailte inmheánach i scarbhileoga le feiceáil mar 1 ceanglófar dúbailte.

Má shábháiltear scarbhileog tar éis na gcoinbhinsiún seo mar chomhad CSV, is minic a bheidh cuimhne breise ag deireadh go leor de na línte. Na bogearraí a athraíonn comhaid NCCSV isteach .nc Beidh comhaid neamhaird a dhéanamh ar an commas breise.

###  [Excel Excel](#excel)  {#excel} 

A allmhairiú comhad NCCSV isteach Excel:

1. Roghnaigh Comhad : Oscailte .
2. Athraigh an cineál comhaid a Comhaid Téacs (\\*.prn;\\*.txt; \\ *.csv) .
3. Cuardaigh na heolairí agus cliceáil ar an NCCSV .csv comhad.
4. Cliceáil Oscailte .

Chun comhad NCCSV a chruthú ó scarbhileog Excel:

1. Roghnaigh Comhad: Sábháil Mar.
2. Athrú ar an Sábháil mar chineál: a bheith CSV (Comma teoranta)   (\\ *) .
3. Mar fhreagra ar an rabhadh comhoiriúnacht, cliceáil Tá.
4. Beidh an comhad mar thoradh air sin .csv bheith cuimhne breise ag deireadh na sraitheanna eile seachas na sraitheanna CSV. Is féidir leat neamhaird a dhéanamh orthu.

I Excel, an sampla NCCSV comhad thuas le feiceáil mar

![Foinse do Soilse linn snámha faoi stiúir](/img/sampleExcel.png)

###  [Bileoga Google](#google-sheets)  {#google-sheets} 

A allmhairiú comhad NCCSV isteach Bileoga Google:

1. Roghnaigh Comhad : Oscailte .
2. Roghnaigh a Upload comhad agus cliceáil ar Upload comhad ó do ríomhaire. Roghnaigh an comhad, ansin cliceáil Oscailte .
      
Nó, roghnaigh Mo Céide agus athrú ar an cineál comhaid titim síos roghnú do gach cineál comhaid. Roghnaigh an comhad, ansin cliceáil Oscailte .

Chun comhad NCCSV a chruthú ó leathbhileog Bileog Google:

1. Roghnaigh Comhad: Sábháil Mar.
2. Athrú ar an Sábháil mar chineál: a bheith CSV (Comma teoranta)   (\\ *) .
3. Mar fhreagra ar an rabhadh comhoiriúnacht, cliceáil Tá.
4. Beidh an comhad mar thoradh air sin .csv bheith cuimhne breise ag deireadh na sraitheanna eile seachas na sraitheanna CSV. Ignore iad.

##  [Fadhbanna / Tráthanna](#problemswarnings)  {#problemswarnings} 

* Má chruthaíonn tú comhad NCCSV le heagarthóir téacs nó má chruthaíonn tú scarbhileog cosúil i gclár scarbhileog, ní dhéanfaidh an t-eagarthóir téacs nó an clár scarbhileog seiceáil go lean tú na coinbhinsiúin seo i gceart. Tá sé suas chun tú a leanúint na coinbhinsiúin i gceart.
* Comhshó scarbhileog tar éis an choinbhinsiúin seo i gcomhad csv (dá bhrí sin, comhad NCCSV) mar thoradh ar chuimhneacháin breise ag deireadh na sraitheanna eile seachas na sraitheanna sonraí CSV. Ignore iad. Na bogearraí athraíonn ansin comhaid NCCSV isteach .nc Beidh comhaid neamhaird orthu.
* Má tá Comas breise ag comhad NCCSV ag deireadh na sraitheanna, is féidir leat iad a bhaint tríd an gcomhad NCCSV a athrú isteach i gcomhad NCCSV NetCDF comhad agus ansin a athrú ar an NetCDF comhad ar ais isteach i gcomhad NCCSV.
* Nuair a dhéanann tú iarracht comhad NCCSV a thiontú ina NetCDF comhad, beidh roinnt earráidí a bhrath ag na bogearraí agus beidh teachtaireachtaí earráide a ghiniúint, is cúis leis an chomhshó a theipeann. Tá fadhbanna eile crua nó dodhéanta a ghabháil agus ní bheidh a ghiniúint teachtaireachtaí earráide nó rabhaidh. Fadhbanna eile (e.g., comórtha breise ag deireadh na sraitheanna) beidh neamhaird. Ní dhéanfaidh an tiontaire comhaid ach seiceáil íosta ar cheartacht an toradh NetCDF comhad, m.sh., maidir le comhlíonadh CF. Is é an cruthaitheoir comhad agus úsáideoir comhad freagracht a sheiceáil go bhfuil na torthaí an chomhshó mar atá ag teastáil agus ceart. Tá dhá bhealach a sheiceáil:
    * Priontáil ábhar an .nc comhad le ncdump
         ( [https://linux.die.net/man/1/ncdump](https://linux.die.net/man/1/ncdump)  ) .
    * Féach ar an ábhar na sonraí i ERDDAP .
