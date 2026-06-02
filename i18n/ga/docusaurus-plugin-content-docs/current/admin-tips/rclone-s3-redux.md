Tá an t-ábhar seo bunaithe ar [teachtaireacht ó Roy Mendelssohn go dtí an ERDDAP web development](https://groups.google.com/g/erddap/c/H-vJoGP42TI) .

Ag rith ERDDAP™ sa scamall a bheith ina ábhar te. Ba chóir dom a thabhairt faoi deara go ERDDAP™ Tá reáchtáil i gcónaí sa scamall, ach an chuid is mó den am nach ar fhreastalaí ar fáil ag soláthraí scamall tráchtála, agus an bac mór do reáchtáil ERDDAP™ ar sholáthraí scamall tráchtála má úsáideann tú stóráil S3, nach bhfuil cead rochtana bloc Linux gnáth. Má tá tú sásta a íoc níos mó a bhaint as na roghanna rochtain bloc ar fáil ag do sholáthraí scamall tráchtála, ná ag rith ar freastalaí scamall tráchtála go bunúsach mar an gcéanna le reáchtáil ar do threalamh féin, ach amháin ar ndóigh an costas.

Tar éis a dúirt go, ar Nollaig 1, 2025 scríobh mé post "rclone agus S3" agus tá sé seo ina dhiaidh. Sa ríomhphost suite mé an swathes GOES17 agus comhad a sheiceáil, ach ní raibh mé é a chur go léir ar an mbealach isteach ERDDAP™ a fheiceáil go n-oibríonn sé go léir go réidh. Agus tá kiddos, is féidir leat triail seo sa bhaile agus ní gá duit dul i gcomhairle le dlíodóir nó comhairleoir leighis, ba chóir é go léir a bheith sábháilte. Anseo mount mé an NCDC OI sst avhrr v2.1 atá ar AWS, a leagtar sé suas i ERDDAP™ agus léiríonn na torthaí.

- Céim 1: Sainmhínigh an endpoint i rclone

rclone chumhrán chruthú oi sst s3 \\
soláthraí AWS \\
réigiún dúinn-east-1 \\
suíomh_constraint dúinn east-1 \\
Foinse bréagach
foirm duille: líneach


- Céim 2: Cruthaigh pointe mount don tacar sonraí

Seirbhís do Chustaiméirí sst 
cliceáil grianghraf a mhéadú sst 

- Céim 3: mount an stóráil S3 go dtí an pointe mount

Ceadanna, ceadanna, ceadanna, ceadanna.... (Le leithscéalta a Steve Ballmer, má tá a fhios agat a fhios agat) ,

Ní mór an mount a dhéanamh ionas go ritheann cibé úsáideoir do tomcat, de ghnáth úsáideoir "tomcat", Is féidir rochtain a fháil ar na sonraí. ‘rclone’ mounts an tacar sonraí le húinéir agus grúpa an úsáideora a fhorghníomhú an t-ordú mount agus ba mhaith leis faisnéis a stóráil i eolaire baile an úsáideora (is dócha go maolaítear é seo má bhunaigh tú é seo mar phróiseas leibhéal an chórais - féach thíos) . Mar sin, más féidir leat, fhorghníomhú an t-ordú mount mar 'tomcat', ach más mian linn do tomcat nach bhfuil eolaire baile is gá duit a fhorghníomhú an t-ordú mount mar úsáideoir éagsúla. Chun é sin a dhéanamh in eagar an vacuum. comhad:

1. Déan teagmháil anois

2. Uncomment nó cuir:

data recovery

3. Sábháil agus imeacht.


Is é an sonraí iarbhír roinnt sraitheanna domhain, agus tá mé ag gléasta ar an leibhéal sonraí, ní ag an leibhéal is fearr, agus táim ag forghníomhaitheach an t-ordú i gcríochfort tmux mar sin leanann an t-ordú a reáchtáil:

cliceáil grianghraf a mhéadú sst : aona-cdr-fharraige-dromchla-glas-idirshuíomh-pds / sonraí / v2.1/avhr Seirbhís do Chustaiméirí sst \\
-read-only \\
--cheadú eile \\
--vfs-cache-mode iomlán \\
------------uas-mhéid 1G \\
------------------ 1m
- Vfs-léamh-mhéid 64M
--vfs-read-size-teorainn 1G \\
- Vfs-read-ahead 256M
-- a cheannach 64M \\
-------------------
--attr-timeout 1s \\
- gan am a chaitheamh


- Céim 4: Úsáid Socraigh Sonraí Xml díreach cosúil le gnáth,

Úsáid Úsáid Úsáidte EDDGrid FromNcFiles mar an cineál sonraí, agus is é an t-eolaire / mnt/oi sst /. Bhí an pas tosaigh maith go leor agus d'oibrigh sé gan fadhbanna. Rinne mé trí athruithe ar an snippet xml a d'fhéadfadh a bheith déanta agus ag rith GenerateDatasets Xml agus iad siúd a bhí:

1. Athrú ar an tacar sonraí a bheith oi sst tréimhse saoil: ilbhliantúil

2. Tá an eolaire meascán de chomhaid roinnt dar críoch i " .nc " agus daoine eile dar críoch "réamhliminary .nc "Agus ach an iar ag teastáil. Chun seo a athrú ar an ainm comhaid regex:

 <fileNameRegex> taiseachas aeir: fliuch sst Conas a oibríonn sé? .nc  </fileNameRegex> 

Tá mé dúirt go minic go bhfaighidh mé regex a bheith ar cheann de na mysteries na beatha, agus d'fhéadfadh go mbeadh bealaí níos fearr a dhéanamh ar an regex. Ach d'oibrigh sé seo

3. Ní raibh an ioos_catagóir leagtha, Chuir mé iad siúd.

Le haghaidh obair táirgthe buan is féidir leis an snippet xml úsáid a bhaint as beagán níos mó eagarthóireachta a bheith níos iomláine.

- Céim 5: Cuir an snippet xml chuig an datasets.xml agus a leagtar an bhratach

Tógann sé seo i bhfad a luchtú ar an gcéad pas, mar sin téigh rudaí eile a dhéanamh don chuid eile den lá.

Is é an toradh deiridh:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

Anois a fheiceáil nach raibh ró-painful&#33;

Má tá tú ag imirt leis an toradh, tabhair faoi deara ar dtús go bhfuil na socruithe rclone chéad buille faoi thuairim, agus ba chóir a thástáil le haghaidh leas iomlán a bhaint. Jonathan Sherman ár ngrúpa d'fhéach sé ar an roinnt agus d'fhéadfadh a bheith ag caint faoi ina labhairt ag cruinniú IOOS DMAC. Beidh sé ag clúdach freisin a lán níos mó topaicí a bhaineann le bunú i Google Cloud Ardán, mar shampla conas a orchestrate an thus an VM, a chur ar bun ar an buicéad S3 a bhfuil spás ainm ordlathach a bhfuil ar GCP níos tapúla agus ach beagán níos costasaí, agus má ritheann tú scripteanna próiseála a thabhairt cothrom le dáta na sonraí a sheirbheáil ag an GCP ERDDAP™ conas a chur ar bun iad siúd. Má tá an ábhar seo ar mhaithe leat spreagadh a thabhairt duit chun éisteacht lena labhairt. An bhfuil ERDDAP™ Tá suas agus a reáchtáil, ach nach bhfuil sé inrochtana i láthair na huaire ó lasmuigh den NMFS líonra.

Ar an dara dul síos nach bhfuil sé seo le AWS VM gléasta buicéad AWS S3, tá sé seo ar cheann dár freastalaithe agus ár bpíopa go bhfuil na laethanta sáithithe go hiomlán, mar sin bheadh tú ag súil leis an thus iar a bheith níos tapúla ná an méid atá déanta agam (go maith nach bhfuil ár píopa an-mhór - go raibh maith agat NMFS &#33; - ach tá muid sáithithe riamh - tá éileamh ar shonraí a bhí phenomenal) .

Ar deireadh, is féidir leat Wonder - Ba mhaith liom a rolladh mo chuid féin, áit a bhfuil mé tús seachas seo? Fuair mé rud amháin LLMs go maith ag Tá faisnéis atá ar eolas go maith agus doiciméadaithe go maith, agus an AIs mé sheiceáil (téann gach mo comharthaí&#33;&#33;) go léir a fhios rclone agus AWS agus GCP go maith go leor, agus is féidir a dhéanamh an chuid is mó den thus ar do shon. Go deimhin bhí mé ag lorg tacar sonraí a bheadh go maith chun taispeána, agus thug AI dom roinnt moltaí agus a ghintear an chuid is mó de cad atá thuas, cé go raibh mé a dhéanamh ar roinnt eagarthóireachta do mo thus féin.

Chomh maith leis sin, cuimhnigh Seth scríobh S3 nua don leagan reatha (2.30) de ERDDAP™ - Nach bhfuil mé i gcomparáid luasanna, agus a shamhlú mé ag brath ar cad tá tú ag déanamh beidh gach a buntáistí. Chun portáil thar láthair ERDDAP™ Is féidir le suiteáil, ag baint úsáide as rclone an próiseas a shimpliú.

Uisce agus Séarachas

PS - Agus cuimhnigh oibreacha rclone thar raon leathan de díoltóirí, nach bhfuil sé seo teoranta do AWS agus nach bhfuil ach roinnt athruithe ar na suímh "rclone config".


Déan isteach i seirbhís córais (a mhodhnú de réir mar is cuí don úsáideoir srl) :
—————————————————————————

[Féinte]
Cur síos = Ardán mount do NOAA Amharc ar gach eolas
Wants = líonra-líne .tar a fháil
Tar éis = líonra-líne .tar a fháil

[An tseirbhís]
Cineál = nóta
Úsáideoir = yourUser
Grúpa = Grúpa

Déan Teagmháil Linn sst : aona-cdr-fharraige-dromchla-glas-idirshuíomh-pds / sonraí / v2.1/avhr Seirbhís do Chustaiméirí sst \\
-read-only \\
--cheadú eile \\
-----------
--comhaid truaillithe 0644 \\
--vfs-cache-mode iomlán \\
------------uas-mhéid 1G \\
------------------ 1m
- Vfs-léamh-mhéid 64M
--vfs-read-size-teorainn 1G \\
- Vfs-read-ahead 256M
-- a cheannach 64M \\
-------------------
--attr-timeout 1s \\
- gan am a chaitheamh

ExecStop =/bin/fusermount Monaróir a tháirgtear: Uimh sst 
Atosú = ar láimh
Déan Teagmháil Linn

[Suiteáil]
WantedBy = il-úsáideoir .tar a fháil
