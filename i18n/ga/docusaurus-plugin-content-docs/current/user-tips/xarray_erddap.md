Buíochas le Roy Mendelssohn le haghaidh seo a scríobh suas.

An bhfuil Python pacáiste 'xarray' tar éis éirí an-tóir le haghaidh rochtain, fothacar agus amharcléiriú sonraí gridded i bhformáidí éagsúla. 'xarray' oibreacha fíneáil le ERDDAP™ nuair a thuigeann tú conas é a úsáid i gceart. Ba mhaith liom pointe amach go bhfuil an Python pacáiste 'erddapy '' ( https://github.com/ioos/erddapy ) is féidir rochtain a fháil ar shonraí ó ERDDAP™ freastalaithe ag baint úsáide as 'griddap' agus ' tabledap ', agus is féidir le 'erddapy' na sonraí a onnmhairiú le haghaidh 'xarray'. Ach má tá tú i dtaithí ar 'xarray' a úsáid agus a bhfuil sreabhadh oibre ag baint úsáide as an bpacáiste, ansin is féidir é a bheith inmhianaithe a bheith ag obair go díreach laistigh den phacáiste amháin. Is sampla é seo thíos le tacar sonraí 'griddap'.

Is é ceann de mo tacar sonraí is fearr leat na sonraí JPL MURv4.1 SST ar fáil ag https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html . Más mian liom fo-thacar de na sonraí a dhéanamh le rá 28 Eanáir, 2026, latitdues (20,50) agus fad saoil (tréimhse saoil: ilbhliantúil) , agus íoslódáil comhad netcdf, an ERDDAP™ Bheadh URL seo a bheith https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z ): 1: (2026-01-28T09:00:00Z) [7] (20 bliain) : 1: (50 50 50) [7] (-140) : 1: (-105) ] agus tá sé réasúnach glacadh leis go bhfuil sé seo cad a bheadh tú ag úsáid i 'xarray'. Ach i ndáiríre má dhéanann tú amhlaidh a bhí tú a fháil ar earráid.

Is é an chúis a tháirgeann sé seo ná go n-úsáideann 'xarray' OPeNDAP   ( https://www.opendap.org ) mar phrótacal do rochtain iargúlta, agus cé go bhfuil an ERDDAP™ Tá syntax bunaithe ar OPeNDAP syntax, agus ERDDAP™ Is féidir le freastalaí gníomhú freisin mar OPeNDAP freastalaí, tá difríochtaí i conas é seo a dhéanamh don dá seirbhísí. (Féach mar shampla https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#opendapLibraries ) . Aon duine ERDDAP URL gan slicing nó scagairí, ach an datasetID , behaves cosúil le OPeNDAP URL agus beidh sé ag luí leis xarray.

Má cheapann muid na céimeanna chun rochtain a fháil ar áitiúil NetCDF comhad i 'xarray' ba mhaith linn a dhéanamh ar na céimeanna seo a leanas:

- Oscail an comhad ag cur in iúl ar an cosán iomlán leis an gcomhad
- Féach ar an t-eolas a chomhordú ón gcéad chéim
- Bain úsáid as ceann de na modhanna éagsúla "roghnaigh" a fhothacar na sonraí

Sa thuas osclaíonn tú an comhad ar dtús, ansin an fothacar a dhéanamh. Úsáid 'xarray' le ERDDAP™ tacar sonraí a dhéanann tú mar an gcéanna, nuair a realize tú, mar a mhínítear sa ERDDAP™ doiciméadú, go bhfuil an " cosán ar an gcomhad" Is é an URL gan aon bhformáid ar ais agus gan aon contraints, i gcás an tacar sonraí MUR atá https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

Mar shampla coincréite ag baint úsáide as an tacar sonraí MUR, an chéad ní mór dom a allmhairiú na pacáistí a bheidh in úsáid:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Ansin, mar descibed thuas leag mé an URL chuig an tacar sonraí "ainm" agus a oscailt an "comhad" (nach bhfuil sé i ndáiríre comhiomlánú de chomhaid) ag baint úsáide as "xr.open_dataset"


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

Táirgeann sé seo a leanas (bláthanna cumhra: cumhráin) torthaí i "ds":

Toisí:

am: 8641l dearcadh: 17999 domhanfhad: 36000

Comhordaithe:

am trátha (am trátha) Dáta foilsithe: 2013-06-01T09:00...
domhantarraingthe (domhantarraingthe) An bhfuil a fhios agat na buntáistí a bhaineann... 89.99
tréimhse saoil: ilbhliantúil (tréimhse saoil: ilbhliantúil) Seirbhís do Chustaiméirí

Innéacs:

am PandasIndex
domhanleithead PandasIndex
tréimhse saoil: ilbhliantúil PandasIndex


Ag an bpointe seo tú ar aghaidh díreach mar a bheadh tú go raibh sé ina comhad áitiúil. Tugaim dhá shampla thíos, ceann a thógann an dá uair dheireanach ag baint úsáide as innéacsú eagar agus ceann a fhaigheann na luachanna an dá uair dheireanach agus a úsáideann a dhéanamh ar an fo-thacar, ach i gceachtar cás tá sé seo comhionann leis an méid a bheadh tú a dhéanamh le haghaidh comhad áitiúil.


```python
lat_min, lat_max = 20, 50
lon_min, lon_max = -140, -105
sub_isel = ds.isel(time=slice(-2, None)).sel(
    latitude=slice(lat_min, lat_max),
    longitude=slice(lon_min, lon_max),
)
# plot the result
#sub_isel["analysed_sst"].isel(time=0).plot()
```


```python
last2 = ds["time"].values[-2:]
sub_sel = ds.sel(time=last2).sel(
    latitude=slice(lat_min, lat_max),
    longitude=slice(lon_min, lon_max),
)
# plot the result
#sub_sel["analysed_sst"].isel(time=0).plot()


```

Mar sin, is é an teachtaireacht bhaile a ghlacadh go n-oibríonn 'xarray' mór le haghaidh sonraí gridded ar ERDDAP™ freastalaí má théann tú chuig 'xr.open_dataset () ' an ERDDAP™ URL gan cineál comhaid agus gan srianta.
