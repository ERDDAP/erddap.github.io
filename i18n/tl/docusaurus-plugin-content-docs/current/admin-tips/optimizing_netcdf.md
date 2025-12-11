Ang nilalamang ito ay batay sa isang [mensahe mula kay Roy Mendelssohn hanggang sa ERDDAP grupong gumagamit](https://groups.google.com/g/erddap/c/JWoS_y3cygg/m/zCpcNTxNAAAJ) .

1. Optimize netcdf files para sa ulap
— Eixioximanificitixićixiić --

a. Pagbuklatng muli at page na laki

Kamakailan sa paggawa ng ilang pananaliksik nabasa ko ang kawili - wiling artikulong ito:

https://nsidc.github.io/cloud-optimized-icesat2/

Waring walang sinuman ang pumupukaw ng silakbo ng damdamin na gaya ng pagtalakay sa mga wikang pamprograma, mga patnugot, at mga format ng talaksan, at hindi ito isang rekomendasyon kung ano ang format (s) dapat mong gamitin, subalit sa halip ay unawain kung ano ang nasa papel na iyon at tingnan kung gaano kalaking pagsulong ang matatamo ( ERDDAP™ ay laging nagsisikap na maging agnostiko tungkol sa marami sa mga bagay na ito, bagkus ay pinipiling subukin at lutasin kung paano aktuwal na ginagamit ng mga tao ang impormasyon) .

Ang papel ay pangunahing nakatuon sa mga sitwasyon kung saan ang mga data ay iniimbak sa isang tindahan ng bagay tulad ng Amazon S3. Ang mga tindahan ng impormasyon ay napapasok sa network na ginagamit http  (s) mga utos, kung ihahambing sa pag - iimbak na may tuwirang kaugnayan sa (tunay) server, mayroong mas matagal na latency habang ang kahilingan ay kailangang gumawa ng round trip. Para sa mga tindahan na nais mong gumawa ng ilang kahilingan hangga't maaari, subalit kung ikaw ay talagang gagawa ng malalaking kahilingan upang bawasan ang bilang ng mga tawag, maaaring mas maraming impormasyon ang makukuha mo kaysa kinakailangan mo, na maaaring gayunding kabagalan kung hindi higit. Kaya ang panlilinlang ay maging timbang sa pagitan ng dalawang salik na ito. At kahit na ang pagkuha ng impormasyon sa mga tindahan ng bagay ay lubhang bumuti, gayundin ang pagkuha ng tuwirang nakakabit na imbakan. Sa pagsasaliksik dito ang ilang tantiya ay:

Lokal na Disk:
• Humingi ng panahon: 0.1ms
• 6 ang naghahanap: 0.6ms (Walang Katulad) 
• Mabilis na binabasa ang nakakalat na metadata
Ulap HTTP:
• Kahilingan: 100-200ms
• 6 na kahilingan: 600-1200m (Napakamabagal&#33;) 
• Ang bawat kahilingan ay may network round-trip na oras

Ang ikalawang bagay na dapat unawain ay na ang mga talaksang netcdf4/hdf5 ay nakaimbak sa mga tipak at ibinabalik sa mga pahina, kaya ang relatibong sukat ng bawat isa sa mga ito ay talagang maaaring makaapekto sa bilis ng pag-access kapag ang access ay mula sa isang tindahan ng bagay, at dahil sa default ang metadata tungkol sa file ay nakakalat sa buong file, kaya ang pagkuha ng metadata ay maaaring kumuha ng ilang mga kahilingan. Ang pangunahing punto ng papel ay na ang default page na sukat para sa netcdf4/hdf5 files ay 4096 bytes (4KB) - (Na kakilakilabot sa ulap&#33;) Yamang ang sukat lamang ng metadata ay malamang na mas malaki kaysa rito at malamang na ang iyong laki ay mas malaki rin kaysa rito. Kaya ang isang katas ay mangangailangan ng maraming round-trips na mabagal. Ang nais mong gawin ay hatiing muli ang salansan upang ang lahat ng metadata ay nasa “top” ng file, at na ang sukat ng pahina ay kahit na kasinlaki ng metadata pati na ang laki ng isang clux. Gayundin sa pamamagitan ng default ang sukat ng pahina ay hindi nakapirme, subalit gumagamit ng estratehiya na nagkakaiba - iba. Mas maganda ang resulta ng natuklasang papel.

Kaya paano ko malalaman ang laki ng talaksang metadata?

> h5stat yourfile.nc | grep "File metadata" # metadata size
>

At paano ko malalaman ang sukat ng tipak ng yelo:

> h5dump -pH MUR41_file.nc | grep -A3 CHUNKED
>

o

> ncdump -sh MUR41_file.nc | grep ChunkSizes
>

At paano ko matitiyak ang estratehiya sa pag - iinsayo ng pahina:

> h5stat yourfile.nc | grep "File space management strategy"
>

Malamang na ang utos na ito ay magbabalik ng “H5F_FSPACE_STRATEGY_FSM_AGR” na siyang default stratehiya at ang nais nating ibalik nito ay “H5F_FSPACE_STRATEGY_PAGTE”

Paano ko maibabalik ang aking netcdf file upang ang lahat ng metadata ay nasa harap, at baguhin ang estratehiya upang magamit ang isang permanenteng sukat ng pahina, at anong laki ng pahina ang gagamitin? Mga tuntunin ng hinlalaki na nasumpungan ko ay:

Pahina Seze Selection:
• Dapat ≥ kabuuang laki ng talaksang metadata (mahalaga&#33;) 
• Ang kapangyarihan ng 2 (4MB, 8MB, 16MB, atbp.) 
• Huwag kang mababaliw sa laki - 32MB ay karaniwang ang praktikal na max
• Isaalang - alang ang napakalaking sukat - pahinang sukat ng bato dapat na maging tirahan ng pinakamalalaking tipak

Gaya ng nabanggit sa itaas, ang eksaktong laki ay dapat na mas malaki kaysa sa sukat ng metadata at kasinlaki ng isang tipak ng bato. Ang natuklasan ng pag - aaral ay na para sa maraming datasets ang 8MB pahina na laki ay isang mahusay na tradeoff, malamang na ito ay mas malaki kaysa sa metadata na sukat + cloud, at hindi sapat na paraan ng paghila ng higit na datos kaysa kinakailangan mo. Upang maisagawa ito:

h5repack - PAHINA -G 8388608 ng iyongfile .nc iyongfile_optimized .nc 

Narito ang mga pamantayan na gagamitin upang magkaroon ng iba't ibang sukat ng pahina:

4194304 (4MB) 
8388608 (8MB) 
16777216 (16MB) 
3355432 (32MB) 

b. May mga pakinabang ba kung gagamit din ng mga file?

Ang papel at iba pang mga bagay na nasumpungan ko ay nagpapahiwatig na kahit na sa lokal ay maaaring magkaroon ng mabilis na pagsulong saanman mula 10%-30%. Sa aking anumang bagay maliban sa mga pagsubok sa pag - aalis ng usok nasumpungan ko ang mabilis na pagsulong ng halos 10% kapag ang mga kahilingan ay napakaliit kung ihahambing sa panlahat na laki ng salansan, at ang bilis ay umuunti habang ang kahilingan ay lumalaki, subalit hindi ko nasumpungang ito ay mas mabagal.

c. SALTAFL

Ah ngunit maraming huli saanman, ito'y parang isang libreng pananghalian. At ang huli ay na ang nakapirmeng sukat ng pahina ay nagpapataas sa sukat ng talaksan. Sa ilang kaso ay sinubukan ko:

617M mur1 .nc 
632M mur1_optimized .nc 
608M mur2 .nc 
616M mur2_optimized .nc 
29M chla1 .nc 
40M chlan1_optimized .nc 
30M chla2 .nc 
40M chlan2_optimized .nc 

Kaya ang kalakalan ay may maliit na pagtaas sa laki ng talaksan.

d. Subalit kung kailangan kong muling iproseso ang mga file sa paano man...?

Ang isang mabuting tanong ay kung kailangan kong sumulat ng iskrip upang maiprosesong muli ang mga salansan, bakit hindi basta sumulat lamang ng isang iskrip upang isalin sa isang format na gaya ng sabi ni zarr? Sizarr ay maraming tagapagtaguyod at kung ikaw ay interesado sa zarr basta gumawa ng mabilis na pananaliksik sa bibiduckgo at doon ay maraming mabubuting post, marahil ang mas timbang na pangmalas ayhttps://www.youtube.com/watch?v=IEAcCmcOdJs  (Kapansin - pansin na marami sa mga punto na iniaangat niya ay ang sinisikap na banggitin ng icechunk format) . Kaya bakit hindi mo nanaising isalin ang iyong mga salansan sa isang bagay na gaya ng zarr, Una, kung regular kang lilikha ng mga salansan ng netcdf, maaari mong simulan nang husto ang paggawa ng mga file mula ngayon, na sa paglipas ng panahon ay makakakita ng mga pagsulong sa bilis at hindi mo na kakailanganing baguhin ang nakaraang mga file, at sa paglipas ng panahon ay makikita mo ang mga pagsulong ERDDAP™ ay maaari pa ring i-gregate ang ibabaw ng mga file bagaman ang ilang mga panloob na setting ay magkakaiba. Ikalawa, maaaring marami kang kagamitan na depende sa mga salansan ng netcdf, at ang pamamaraang ito ay mangangahulugan na hindi mo na kailangang baguhin pa kung ano ang maaaring maging napakaraming kodigo. Ang punto ay alamin ang mga mapagpipilian at piliin kung ano ang pinakamabuti para sa iyong kalagayan. Bilang paalaala, kung pipiliin mong gumamit ng zarr files ERDDAP™ , ang mga ito ay dapat zarr format v2 files.

E. Malaking datos - isang tabi

Maraming pinag - uusapang impormasyon, subalit gaano kalaki ang impormasyon na ginagamit ng karamihan ng mga tao at paano iyan maihahambing sa mga kakayahan ng makabagong mga laptop (oo mga laptop, hindi mga server) . Ang kawili - wiling inumin ay:

https://www.youtube.com/watch?v=GELhdezYmP0Magsimula sa loob ng mga ilang minuto 37 bagaman ang buong pahayag ay kawili - wili

Ang pag - aaral na binanggit niya ay:

https://motherduck.com/blog/redshift-files-hunt-for-big-data/

Kaya may maliit na porsiyento ng mga gumagamit nito na talagang nangangailangang magpaandar ng kapangyarihan, subalit ang karamihan ng mga gumagamit ay makagagawa ng kanilang pagsusuri sa isang laptop, 26TB panlabas na mga drive ay wala pang $300 at mga bali - balita ay na 60 mga panlabas na drives ngTB ang makukuha sa pagtatapos ng taon. Isang bagay na dapat pag - isipan.

2. Paggamit ERDDAP™ kasama ng Google Cloud Platform o iba pang mga provider ng ulap bukod sa AWS
----,-,,-,,-,,-,-,,-,-,,-,-,,,-,,-,--,-,-,-,-,---,----,----,--------,--------.

Sa pagkakataong iyon ERDDAP™ ay kilala lamang sa pagtatrabaho sa mga tindahan ng AWS (S3) , bagaman bumubuti at pangkalahatan ERDDAP™ Nasa listahan ng todo (tingnanhttps://github.com/ERDDAP/erddap/issues/158) . Kaya kung ano ang gagawin mo kapag sinabi sa iyo na tatakbo ka ERDDAP™ sa Google Cloud Platform (GCP) o isang katulad na plataporma? Una, karamihan sa mga plataporma ng ulap ay nag-aalok ng iba't ibang antas ng imbakan, karaniwang kabilang ang isa na katulad ng imbakang lokal at kinikilala ng sistemang operating, isa na konektado sa ibabaw ng network na karaniwang gumagamit ng NFS para sa access (ay tuwirang mararating ng OS) , at isa na tindahan. Ang unang solusyon ay hindi ang paggamit ng mga tindahan ng bagay, at mabuti pang pumunta ka roon. Subalit gaya ng dati, ang TANSTAAFL at ang disbentaha sa kasong ito ay habang ikaw ay nagtutungo mula sa imbakang -&gt; NFS access -&gt; lokal na tindahan ng iyong mga gastos ay tumataas din. (Sasabihin ko pa na ang NFS ay naka-access din sa network, at may sarili nitong mga isyu tungkol sa latency, ito rin ay makikinabang sa file optimization) .

Kung kailangan mong gumamit ng tindahan, o kaya lamang bumili ng isang tindahan, ang sagot ay isang FUSE file system (https://github.com/libfuse/libfuse) . Sa GCP, ito ay tinatawag na gcsfese, at ang mga hakbang upang i-install ito ay:

• Iluklok ang gcsfise sa iyong larawang GCP Linux:
sudo apt update
sudo apt i-install gcsfuse
• Maging Totoo sa GCP (kung hindi pa matiyak) :
Tiyakin na mayroon kang tamang mga kredensiyal, karaniwan nang sa pamamagitan ng account sa paglilingkod o sa pamamagitan ng pagtakbo sa gloud auth login.
• Bundok ng GCS balde sa isang lokal na directory:
Bundok GCS backway sa isang lokal na directory gamit ang gcsfuse. Ito ay nagpapahintulot sa iyong GCP ma-access ang datos na para bang ito ay bahagi ng lokal na filesystem.
gcsfuse mo-bucket-name /path/to/mount/directory

At ngayon ang iyong tindahan ay maaaring makapasok na gaya nito ay bahagi ng Linux filesystem, gayundin ang gagawin ERDDAP™ . Para itong mahika, na nakukuha ang pinakamabuti sa dalawang daigdig, tiyak na may huli. At mayroon. ANG mga sistema ng talaksang FUSE ay medyo mabagal kaysa tuwirang pagpasok sa tindahan (Karaniwan nang idinagdag mo ang isa pang suson sa access) . Sa aking pananaliksik, tinataya ko na mas mabagal ang pag - ikot ng mapa, kaya hindi ko alam kung gaano mas mabagal ito. Subalit kung ikaw ay nasa isang kalagayan kung saan kailangan mong tumakbo sa GCP na ginagamit ang mga tindahan ng bagay, mayroon kang lunas sa ngayon na gagana sa ERDDAP™ .

3. Kung ano ang magagawa mo ngayon upang makatulong.
— Eiperimentićixićixićixiićixixixixić

Kung ikaw ay may panahon at kakayahan na subukin ang ilan sa mga bagay na ito at iulat ang iyong mga resulta, malaki iyon. Lalo na kung mayroon kang makukuhang GCP o katulad nito at tingnan kung gaano kaliksi ERDDAP™ Gumagamit ng FUSE (sa katunayan maaari mo rin itong subukin sa AWS) . Kung ang mabilis na parusa ay hindi naman gaanong malaki, iyan ay magiging kahanga - hanga, sapagkat may dahilan ako upang maniwala na ang ilang tao ay malapit nang tumakbo sa kanilang kalagayan ERDDAP™ Ang mga s sa GCP na may tindahan ng bagay. Samakatuwid ito ay hindi lamang isang bagay na may kaugnayan sa teoriya.
