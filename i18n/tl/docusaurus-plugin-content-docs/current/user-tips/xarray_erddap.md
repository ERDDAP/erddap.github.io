Salamat kay Roy Mendelssohn sa pagsulat na ito.

Ang Python Naging napakapopular ng paketeng 'xarray' para sa pag-akses, subsetting at pagkokokodigo ng mga datos sa iba't ibang format. Ang mga gawa ni 'xarray' ay mahusay sa mga gawa ni ERDDAP™ Minsan ay nauunawaan mo kung paano ito gagamitin nang wasto. Ituturo ko na ang Python 'erdapy' ng pakete ' ( https://github.com/ioos/erddapy ) maaaring ma-akses ang datos mula sa ERDDAP™ Mga server na ginagamit kapuwa ang 'griddap' at ' tabledap ', at 'erdapy' ay maaaring magluwas ng datos para sa 'xarray'. Ngunit kung ikaw ay sanay sa paggamit ng 'xarray' at may mga workflows gamit ang pakete, kung gayon maaaring kanais-nais na magtrabaho lamang sa loob ng isang pakete. Ang nasa ibaba ay isang halimbawa na may 'griddap' dataset.

Ang isa sa paborito kong datasets ay ang JPL MURv4.1 SST data na makukuha sa JPL MURv4.1 SST data https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html . Kung nais kong gumawa ng isang subset ng datos para sabihin Enero 28, 2026, latitdues (20,50) at mga longhitud (-140, -105) , at download ang isang netcdf file, ang ERDDAP™ URL para rito https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z ):1: (2026-01-28T09:00:00Z) ][ (20) :1: (50) ][ (-140) :1: (-105) ] at makatuwirang ipalagay na ito ang gagamitin mo sa 'xarray'. Subalit sa katunayan kung gagawin mo ito ikaw ay nagkakamali.

Ang dahilan kung bakit ito lumilikha ng pagkakamali ay ang paggamit ng 'xarray' OPeNDAP   ( https://www.opendap.org ) bilang protocol nito para sa remote access, at habang ang ERDDAP™ Ang pagtutulungan ay batay sa OPeNDAP Pagtatalik, at Pag - iisa ERDDAP™ Maaari ring kumilos ang server bilang isang OPeNDAP server, may mga pagkakaiba sa kung paano ito ginagawa para sa dalawang serbisyo. (Tingnan ang halimbawa https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#opendapLibraries ) . Sinuman ERDDAP URL nang hindi binabaybay o sinasala, yaon lamang datasetID , gumawi na parang isang tao OPeNDAP URL at magiging katugma ng xarray.

Kung iisipin natin ang mga hakbang upang makausap ang isang tagaroon NetCDF talaksan sa 'xarray' ay gagawin natin ang mga sumusunod na hakbang:

- Buksan ang talaksan sa pamamagitan ng pagtutok sa buong landas patungo sa talaksan
- Tingnan ang magkakaugnay na impormasyon mula sa unang hakbang
- Gamitin ang isa sa iba't ibang pamamaraang "selekt" upang i-set ang datos

Sa itaas na una mong buksan ang file, pagkatapos ay gawin ang subsetting. Ginagamit ang 'xarray' sa pamamagitan ng isang ERDDAP™ Gayundin ang ginagawa mo sa dataset, minsang matanto mo, gaya ng ipinaliwanag sa ERDDAP™ Dokumento, na ang "pakikiramay sa file" ay ang URL na walang anumang return format at walang anumang contraints, sa kaso ng MUR dataset na iyon ay https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

Bilang isang tunay na halimbawa gamit ang MUR dataset, kailangan ko munang mag-angkat ng mga pakete na gagamitin:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Pagkatapos, bilang descibed sa itaas ay itinakda ko ang URL sa dataset na "name" at binuksan ang "file" (hindi sa ito sa katunayan ay isang agregasyon ng mga files) paggamit ng "xr. open_dataset"


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

Ito ang gumagawa ng sumusunod (bahagi) nagbubunga ng "mga lata":

Dimensiyon:

panahon: 8641l ang sukat: 1799 longhitud: 36000

Mga koordinado:

panahon (panahon) datetime64[ns] 2002-06-01T09:00 ... 2026-01-...
latitud (latitud) Bloom32–89.99–89.98 ... 89.98 89.99.
longhitud (longhitud) Bloom32–180.0–180.0 ... 180.0 180.0

Indise:

Oras Pandas Index
Pangit na Palawan
longhitud Pandas Index


Sa puntong ito ikaw ay nagpapatuloy na gaya kung sana'y isa itong lokal na file. Nagbibigay ako ng dalawang halimbawa sa ibaba, isa na kumukuha ng huling dalawang beses sa paggamit ng array indexing at isa na kumukuha ng mga halaga ng huling dalawang beses at gumagamit niyan upang gumawa ng subset, subalit sa alinmang kaso ito ay katulad ng gagawin mo para sa isang lokal na file.


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

Kaya't ang mensahe sa pag - uwi ng bahay ay na ang 'xarray' ay gumagawa ng malaking bagay para sa nakatiklop na impormasyon tungkol sa isang nakatiklop na impormasyon ERDDAP™ server kung daraan ka sa 'xr. buksan_dataset () ' yung ERDDAP™ URL na walang file type at walang demand.
