Tá an t-ábhar seo bunaithe ar [teachtaireacht ó Roy Mendelssohn go dtí an ERDDAP web development](https://groups.google.com/g/erddap/c/JWoS_y3cygg/m/zCpcNTxNAAAJ) .

1. Optamaigh comhaid netcdf don scamall
—————————————————

a. athphacáil agus méid an leathanaigh

Le déanaí i déanamh roinnt taighde a tháinig mé trasna an t-alt an-suimiúil:

https://nsidc.github.io/cloud-optimized-icesat2/

Ní dhéanfaidh aon ní cosúil le paisin inflame cosúil le plé ar theangacha cláir, eagarthóirí, agus formáidí comhaid, agus nach bhfuil sé seo moladh ar cad formáid (s s) ba chóir duit a úsáid, ach in áit a thuiscint cad atá sa pháipéar agus a fheiceáil cé mhéad is féidir feabhas a chur gotten ( ERDDAP™ Tá iarracht i gcónaí a bheith agnostic faoi a lán de na nithe seo, in áit a roghnú chun iarracht a dhéanamh agus ag obair le conas a oibríonn daoine i ndáiríre le sonraí) .

Tá an páipéar dírithe go príomha ar staideanna ina bhfuil na sonraí stóráilte i siopa réad ar nós Amazon S3. siopaí Cuspóir rochtain ar an líonra ag baint úsáide as http  (s s) orduithe, mar sin i gcomparáid le stóráil le nasc díreach leis an (fíorúil fíorúil) freastalaí, tá latency i bhfad níos faide mar go bhfuil an t-iarratas a dhéanamh turas bhabhta. I gcás siopaí réad mian leat a dhéanamh chomh beag iarrataí agus is féidir, ach má dhéanann tú ach iarratais i ndáiríre mór a laghdú ar líon na glaonna, is féidir leat a bheith rochtain ar bhealach níos mó sonraí ná mar is gá duit, is féidir a bheith chomh mall más rud é nach níos mó mar sin. Mar sin, is é an trick cothromaíocht a bhaint amach idir an dá fhachtóir. Agus cé go bhfuil feabhas mór tagtha ar rochtain ar shonraí ar shiopaí réada, mar sin tá rochtain aige ar stóráil atá ceangailte go díreach. I taighde seo roinnt meastacháin:

Diosca Áitiúil:
• • Am a lorg: 0.1ms
• 6 iarracht: 0.6ms (negligible) 
• • Is é léamh meiteashonraí scaipthe go tapa
Cloud HTTP:
• • Iarratas latency: 100-200ms
• 6 iarratas: 600-1200ms (an-mhall&#33;) 
• • Tá gach iarratas ama líonra bhabhta-turas

Is é an dara rud a thuiscint go bhfuil comhaid netcdf4/hdf5 stóráilte i smutáin agus ar ais i leathanaigh, mar sin is féidir leis an méid coibhneasta de gach ceann de na difear i ndáiríre luas rochtana nuair a bhíonn rochtain ó siopa réad, agus go bhfuil de réir réamhshocraithe na meiteashonraí mar gheall ar an comhad scaipthe ar fud an comhad, mar sin ag fáil na meiteashonraí a ghlacadh roinnt iarrataí. Is é an príomhphointe an pháipéir go bhfuil an méid leathanach réamhshocraithe do netcdf4/hdf5 comhaid 4096 bytes (irl - Library Service) - - - - - (atá uafásach do scamall&#33;) ós rud é go bhfuil an méid meiteashonraí ina n-aonar dócha níos mó ná seo agus níos mó ná mar is dócha go bhfuil do mhéideanna smután níos mó freisin ná seo. Mar sin, beidh gá le sliocht a lán babhta-turas atá mall. Cad ba mhaith leat a dhéanamh ná athphacáil an comhad ionas go mbeidh na meiteashonraí go léir ag an “barr” an chomhaid, agus go bhfuil an méid leathanach ar a laghad chomh mór leis an méid meiteashonraí móide an méid smután amháin. Chomh maith leis sin de réir réamhshocraithe nach bhfuil an méid leathanach socraithe, ach úsáideann straitéis a athraíonn. Cad é an páipéar le fáil ag baint úsáide as méid leathanach seasta a tháirgtear torthaí níos fearr.

Mar sin, conas is féidir liom a chinneadh an méid meiteashonraí comhad?

> h5stat yourfile.nc | grep "File metadata" # metadata size
>

Agus conas is féidir liom a chinneadh méid smután:

> h5dump -pH MUR41_file.nc | grep -A3 CHUNKED
>

nó

> ncdump -sh MUR41_file.nc | grep ChunkSizes
>

Agus conas is féidir liom a chinneadh an straitéis sizing leathanach:

> h5stat yourfile.nc | grep "File space management strategy"
>

Is dócha go mbeidh an t-ordú ar ais "H5F_FSPACE_STRATEGY_FSM_AGGR" a bhfuil an straitéis réamhshocraithe agus cad ba mhaith linn é a thabhairt ar ais go bhfuil "H5F_FSPACE_STRATEGY_PAGE"

Conas is féidir liom a athphacáil mo comhad netcdf ionas go mbeidh gach meiteashonraí ag tosaigh, agus an straitéis a athrú ionas go mbeidh méid leathanach seasta a úsáidtear, agus cad méid leathanach a úsáid? Rialacha ordóg go bhfuair mé:

Roghanna Uasoiliúna agus Athoiliúna
• • Ní mór a bheith ≥ méid iomlán meiteashonraí comhaid (criticiúil&#33;) 
• • Ba chóir go mbeadh cumhacht 2 (4MB, 8MB, 16MB, etc.) 
• • Ná dul ar mire mór - is é 32MB de ghnáth ar an max praiticiúil
• • Smaoinigh ar mhéideanna smután - ba chóir méid leathanach freastal ar shmután is mó

Mar a dúirt thuas, go hidéalach ba chóir an méid a bheith níos mó ná an méid meiteashonraí móide an méid smután amháin. Cad é an staidéar le fáil go bhfuil le haghaidh a lán de na datasets an méid leathanach 8MB thrádáil maith, tá sé dócha níos mó ná an méid meiteashonraí + méid smután, agus ní tarraingt ar bhealach níos mó sonraí ná mar is gá duit. Chun seo a chur i gcrích:

Déan teagmháil Linn .nc yourfile_optimized .nc 

Seo iad na luachanna a úsáid chun méideanna leathanach éagsúla a fháil:

Seirbhís do Chustaiméirí (An Roinn) 
An tSraith Shinsearach (8)) 
Seirbhís do Chustaiméirí (An tSraith Shinsearach) 
An tSeirbhís Dóiteáin (32MB) 

b. An bhfuil sochair má úsáid a bhaint as comhaid go háitiúil freisin?

An páipéar agus rudaí eile a fuair mé le fios gur féidir fiú go háitiúil a bheith ann a fháil ar luas áit ar bith ó 10%-30%. I mo rud ar bith ach tástálacha exhaustive fuair mé gnóthachain luas de thart ar 10% nuair a bhíonn na hiarrataí sách beag i gcomparáid leis an méid comhad foriomlán, agus an méadú luas laghduithe mar a fhaigheann an t-iarratas níos mó, ach ní bhfuair mé é a bheith níos moille.

c. TANSTAFL

Ah ach tá i bhfad a bheith ina ghabháil áit éigin, is cosúil seo cosúil le lón saor in aisce. Agus is é an ghabháil go méadaíonn an méid leathanach seasta méid an chomhaid. I gcás roinnt de na cásanna a rinne mé:

Déan teagmháil linn .nc 
632M a roghnú .nc 
608M mur2 .nc 
616M mur2 Cuntas deimhnithe .nc 
Déan teagmháil linn .nc 
40M chla1_optimic .nc 
Déan teagmháil anois .nc 
40M chla2_optimic .nc 

Mar sin, tá an trádáil nach bhfuil méadú suntasach i méid comhaid.

d. Ach má tá mé a athphróiseáil na comhaid ar aon nós......?

Tá ceist mhaith má tá mé a scríobh script a athphróiseáil na comhaid, cén fáth nach scríobh ach script a aistriú chuig formáid cosúil le rá zarr? zarr Tá go leor togróirí agus má tá suim agat i zarr a dhéanamh ach cuardach lachain tapaidh agus tá a lán de na poist maith, tá dearcadh b'fhéidir níos cothroime aghttps://www.youtube.com/watch?v=IEAcCmcOdJs  (tá sé suimiúil go bhfuil go leor de na pointí ardaíonn sé cad iad an fhormáid icechunk ag iarraidh chun aghaidh a thabhairt) . Mar sin, cén fáth nach bhfuil tú ag iarraidh a aistriú do chuid comhad chun rud éigin cosúil le zarr, An Chéad, má tá tú a chruthú comhaid netcdf go rialta, d'fhéadfaí tú tús a optimizing na comhaid ó anois ar, a bheidh le himeacht ama a fheiceáil gnóthachain luas agus ní bheidh ort a athchóiriú comhaid anuas, agus ERDDAP™ beidh fós in ann a chomhiomlánú thar na comhaid cé go bhfuil roinnt de na socruithe inmheánacha difriúil. Dara, d'fhéadfá a lán de tooling a bhraitheann ar chomhaid netcdf, agus bheadh an cur chuige seo chiallaíonn nach bhfuil a retool cad a d'fhéadfadh a bheith ina méid fairsing de chód. Is é an pointe a bheith ar an eolas faoi roghanna agus a roghnú cad a oibríonn is fearr do do staid. Díreach mar i gcuimhne, má roghnaíonn tú a úsáid comhaid zarr le ERDDAP™ , ní mór dóibh a bheith zarr formáid v2 comhaid.

e. Sonraí móra - leataobh

Tá sonraí Big Labhair faoi go leor, ach cé chomh mór na sonraí a úsáideann daoine is mó agus conas a dhéanann a chur i gcomparáid le cumais ríomhairí glúine nua-aimseartha (Tá ríomhairí glúine, ní freastalaithe) . Tá a ghlacadh suimiúil ag:

https://www.youtube.com/watch?v=GELhdezYmP0Tosaigh thart ar nóiméad 37 cé go bhfuil an labhairt ar fad suimiúil

Is é an staidéar a luann sé ag:

https://motherduck.com/blog/redshift-files-hunt-for-big-data/

Mar sin, tá céatadán réasúnta beag na n-úsáideoirí a bhfuil gá i ndáiríre a crank suas an chumhacht, ach is féidir leis an chuid is mó mór na n-úsáideoirí a gcuid anailísí a dhéanamh ar ríomhaire glúine, tá 26TB thiomáineann seachtrach anois faoi $300 agus ráflaí go mbeidh 60TB thiomáineann seachtrach a bheith ar fáil faoi dheireadh na bliana. Rud chun smaoineamh ar.

2. Ag baint úsáide as ERDDAP™ le Google Cloud Ardán nó soláthraithe scamall eile seachas AWS
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Ag an nóiméad ERDDAP™ ar eolas ach amháin ag obair le siopaí réad AWS (S3) , cé feabhas a chur agus a ghinearálú ERDDAP™ Tá tacaíocht siopa réad ar an liosta todo (féach arhttps://github.com/ERDDAP/erddap/issues/158) . Mar sin, cad atá le déanamh má tá tú in iúl go bhfuil tú a reáchtáil do ERDDAP™ ar Ardán Google Cloud (GCC) nó ardán den chineál céanna? Ar dtús, cuireann an chuid is mó de na hardáin scamall leibhéil éagsúla stórála, de ghnáth lena n-áirítear ceann atá cosúil le stóráil áitiúil agus aithnítear é ag an gcóras oibriúcháin, ceann atá ceangailte thar an líonra de ghnáth ag baint úsáide as NFS le haghaidh rochtana (arís inrochtana go díreach ag an OS) , agus ceann go bhfuil siopa réad. Níl an chéad réiteach a úsáid siopaí réad, agus go mbeadh tú a bheith go maith chun dul. Ach mar i gcónaí, tá TANSTAAFL agus an aistarraingt sa chás seo mar a théann tú ó siopa réad - ^ NFS rochtain - lí siopa áitiúil do chostais dul suas freisin. (Ba mhaith liom a chur go bhfuil NFS rochtain freisin thar an líonra, agus tá a saincheisteanna latency féin, bheadh sé seo tairbhe freisin ó leas iomlán a bhaint comhad) .

Má tá tú a úsáid siopa réad, nó is féidir a thabhairt ach siopa réad, is é an freagra córas comhaid FUSE (https://github.com/libfuse/libfuse) . Ar GCP, tugtar csfuse air seo, agus is iad na céimeanna chun é a shuiteáil:

• Suiteáil csfuse ar do íomhá GCP Linux:
nuashonrú sudopt
a shuiteáil apt
• Fíordheimhniú go GCP (mura bhfuil sé fíordheimhnithe cheana féin) :
A chinntiú go bhfuil tú na dintiúir ceart, de ghnáth tríd an gcuntas seirbhíse nó trí reáchtáil auth login.
• • Mount an buicéad GCS chuig eolaire áitiúil:
Mount do buicéad GCS chuig eolaire áitiúil ag baint úsáide as csfuse. Ligeann sé seo do shampla GCP rochtain a fháil ar na sonraí amhail is dá mba chuid den chóras comhaid áitiúil é.
cliceáil grianghraf a mhéadú

Agus anois is féidir do siopa réad a rochtain mar go bhfuil sé mar chuid de chóras comhad Linux, mar sin beidh obair le ERDDAP™ . Dealraíonn sé seo cosúil le draíocht, ag fáil an chuid is fearr den dá shaol, ní mór go mbeadh a ghabháil. Agus tá. Tá córais comhad FUSE le beagán níos moille ná rochtain a fháil ar an siopa réad go díreach (go bunúsach chuir tú ciseal eile leis an rochtain) . I mo meastacháin taighde ar cé mhéad níos moille ar fud an léarscáil, mar sin tá mé aon smaoineamh cé mhéad níos moille. Ach má tá tú i gcás ina ní mór duit a reáchtáil ar GCP ag baint úsáide as siopaí réad, tá tú réiteach do anois a bheidh ag obair le ERDDAP™ .

3. Cad is féidir leat a dhéanamh anois chun cabhrú.
——————————————————————————

Má tá tú an t-am agus an cumas a thástáil roinnt de na rudaí agus tuairisc a thabhairt ar ais ar do chuid torthaí, a bheadh go hiontach. Go háirithe má tá rochtain agat ar GCP nó den chineál céanna agus féach cé mhéad níos moille ERDDAP™ Tá rochtain ag baint úsáide FUSE (go maith i ndáiríre is féidir leat é seo a thástáil ar AWS freisin) . Más rud é nach bhfuil an pionós luas ró-mhór, a bheadh iontach, toisc go bhfuil mé cúis a chreidiúint go mbeidh roinnt daoine go luath a reáchtáil a n- ERDDAP™ s ar GCP le stóráil réad. mar sin nach bhfuil sé seo ach ábhar spéise teoiriciúil.
