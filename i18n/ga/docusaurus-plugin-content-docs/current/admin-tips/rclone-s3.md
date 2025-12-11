Tá an t-ábhar seo bunaithe ar [teachtaireacht ó Roy Mendelssohn go dtí an ERDDAP web development](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) .

Le déanaí, ní mór dúinn a bheith ag fáil roinnt fiosrúcháin ag lorg cabhrach le comhaid rochtain ar AWS S3 i ERDDAP™ . An Chéad, ERDDAP™ Beidh leagan 2.29 feabhsaithe rochtain S3 ba chóir a bheith ag obair le siopaí réad neamh-AWS freisin. (Go raibh maith agat Seth&#33;) . Ach luaigh mé roimhe seo faoi úsáid a bhaint as córas bunaithe FUSE a dhéanamh ar an S3 siopa le feiceáil cosúil le córas comhaid ar do fhreastalaí nó VM.

Tá bealach amháin chun é seo a úsáid "rclone". (https://rclone.org/) . Oibríonn rclone ar go leor córais S3 éagsúla, agus tá a lán de na socruithe éagsúla chun feidhmíocht a bharrfheabhsú, lena n-áirítear méid taisce a shocrú, rud a d'fhéadfadh a fhritháireamh ar roinnt de na pionóis luas ó reáchtáil FUSE. An buntáiste a bhaint as rclone le ERDDAP TM go Láimhseálann rclone go léir an idirghníomhaíocht le S3, mar sin cineálacha tacar sonraí cosúil EDDGrid Is féidir FromNcFiles a úsáid go díreach mar má tá comhaid áitiúla. Ciallaíonn sé seo gur gá duit ach a figiúr amach conas a thus rclone chun rochtain a fháil ar do siopa réad, agus tá an chuid eile ach setups cineál Linux gnáth.

Anois, ba mhaith liom a bheith remiss má d'fhág mé díreach é sin, agus ní sampla a thabhairt. Iad seo a leanas tá mé ag dul go gan ainm mount an NOAA Goes17 sonraí atá ar siopa AWS S3 poiblí inrochtana ar cheann dár freastalaithe Ubuntu, Sa thus tosaigh beidh an próiseas rclone a reáchtáil sa tulra a dhéanamh níos éasca a thástáil go bhfuil gach rud ag obair, agus ansin beidh mé ag plé conas dul ii isteach i seirbhís ag rith sa chúlra. Tabhair faoi deara go bhfuil i méid atá thíos, tá an taisce leagtha go 1GB. Is féidir feidhmíocht a fheabhsú go maith ag déanamh an taisce i bhfad níos mó, a rá 5GB-10GB nó fiú níos mó. Chomh maith leis sin tá na socruithe mo guesses ar cad is féidir a bhaint as feidhmíocht, ach ní féidir a bheith ar na cinn is fearr is féidir le haghaidh ERDDAP™ .


1. Suiteáil na bogearraí is gá:
—————————————————————————

nuashonrú sudopt
sudo apt shuiteáil rclone vacuum3 bláthanna cumhra: cumhráin

2. Cruthaigh iargúlta S3 anaithnid
————————————————————————————————

rclone a chruthú téann17 s3 \\
soláthraí AWS \\
réigiún dúinn-east-1 \\
suíomh_constraint dúinn east-1 \\
Foinse bréagach
foirm duille: líneach

3. Tástáil go.
—————

téann rclone lsd17: aon aa-goes17 | ceann amháin

4. Cruthaigh pointe mount do na sonraí
————————————————————————————————

Seirbhís do Chustaiméirí
$USER: $USER / milliún / uair an chloig

5. Mount na sonraí. (Tabhair faoi deara ritheann an próiseas seo sa foreground, mar sin beidh sé a thaispeáint roinnt aschur agus suí ann) 
————————————

rclone -vv mount téann17: aon aa-goes17 / mnt/goes17 \\
-read-only \\
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

6. Oscail cluaisín nua ar an bhfreastalaí agus seiceáil
—————————————————————————————————————————————————————————————————————————

Seirbhís do Chustaiméirí | ceann amháin

7. Seiceáil gur féidir sonraí a rochtain
——————————————————————————
Táirgí Coibhneasta Is maith leat
Déan teagmháil linn -- OR_ABI-L1b-RadC-M6C16 .nc 
```
netcdf OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e20230101536138_c20230101541461 {
dimensions:
y = 1500 ;
x = 2500 ;
number_of_time_bounds = 2 ;
band = 1 ;
number_of_image_bounds = 2 ;
num_star_looks = 24 ;
variables:
short Rad(y, x) ;
Rad:_FillValue = 1023s ;
Rad:long_name = "ABI L1b Radiances" ;
Rad:standard_name = "toa_outgoing_radiance_per_unit_wavenumber" ;
Rad:_Unsigned = "true" ;
Rad:sensor_band_bit_depth = 10b ;
Rad:valid_range = 0s, 1022s ;
Rad:scale_factor = 0.1760585f ;
Rad:add_offset = -5.2392f ;
Rad:units = "mW m-2 sr-1 (cm-1)-1" ;
Rad:resolution = "y: 0.000056 rad x: 0.000056 rad" ;
Rad:coordinates = "band_id band_wavelength t y x" ;
Rad:grid_mapping = "goes_imager_projection" ;
Rad:cell_methods = "t: point area: point" ;
Rad:ancillary_variables = "DQF" ;
.
.
.
.
```
Cuireadh an toradh ar ais ionadh go tapa, go háirithe ós rud é nach bhfuil ár suiteáil an píopa is tapúla ar domhan.

8. Déan isteach i seirbhís córais (a mhodhnú de réir mar is cuí don úsáideoir srl) :
—————————————————————————

a. Cruthaigh aonad córasach:

nana / srl / córas / córas / rclone-goes17.service

Agus cuir isteach:

[Féinte]
Cur síos = Ard-luas do GOES17 poiblí S3
Tar éis = líonra-líne .tar a fháil

[An tseirbhís]
Cineál = simplí
An t-úsáideoir
ExecStart =/usr/bin/clúdach mount téann17: aona-goes17 / mnt/goes17 \\
-read-only \\
--vfs-cache-mode iomlán \\
------------uas-mhéid 1G \\
------------------ 1m
- Vfs-léamh-mhéid 64M
--vfs-read-size-teorainn 1G \\
- Vfs-read-ahead 256M
-- a cheannach 64M \\
-------------------
--attr-timeout 1s \\
--aon am amháin \\
Seirbhís do Chustaiméirí
Déan Teagmháil Linn
Atosaigh = Bealaí
Déan Teagmháil Linn

[Suiteáil]
WantedBy = il-úsáideoir .tar a fháil

b. Cumasaigh an tseirbhís agus tús a chur:

riachtanais uisce: measartha
ar chumas córasach - anois rclone-goes17

c. Tástáil Tástáil

riachtanais uisce: measartha
Seirbhís do Chustaiméirí | ceann amháin



Tá súil againn go mbeidh sé seo a úsáid do dhaoine. Táimid tar éis tástáil ag baint úsáide as csfuse ar Google Cloud Ardán le buicéad go bhfuil spás ainm ordlathach le roinnt rath. Buntáiste amháin de rclone (seachas nach bhfuil sé díoltóir ar leith) go bhfuil sé socruithe níos mó chun feidhmíocht a uasmhéadú. Go háirithe má tá tú ag bogadh áitiúil ERDDAP™ go dtí an scamall, is féidir é seo a dhéanamh ar an t-aistriú beagnach gan uaim.
