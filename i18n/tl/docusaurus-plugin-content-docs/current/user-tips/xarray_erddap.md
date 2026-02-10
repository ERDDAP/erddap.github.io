Salamat kay Roy Mendelssohn sa pagsulat na ito.

Ang Python Naging napakapopular ng paketeng 'xarray' para sa pag-akses, subsetting at pagkokokodigo ng mga datos sa iba't ibang format. Pansinin na ang mga gawa ni 'xarray' ay mainam sa pamamagitan ng ERDDAP™ 'OPen DAP sagot sa dalawang ito tabledap at mga protocol ng griddap na gumagamit ng OPen ng xarray DAP Mga makinang katulad ng netcdf4 o pydap. Ang isang bagay ay OPeNDAP ang tugon? Ito ay anumang ERDDAP URL nang hindi binabaybay o sinasala, yaon lamang datasetID . Gayunman, kapag gumagamit ng mga hiwa ng panala o maging ng mga filter OPeNDAP sa ganang sarili, magagamit ng isa ang erddapy ( https://github.com/ioos/erddapy ) bilang isang makinang xarray. Ang halimbawa sa ibaba ay nagpapakita kung paano magkarga ng isang 'griddap' dataset.

Ang isa sa paborito kong datasets ay ang JPL MURv4.1 SST data na makukuha sa JPL MURv4.1 SST data https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html . Kung nais kong gumawa ng isang subset ng datos para sabihin Enero 28, 2026, latitdues (20,50) at mga longhitud (-140, -105) , at download ang isang netcdf file, ang ERDDAP™ URL para rito https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z ):1: (2026-01-28T09:00:00Z) ][ (20) :1: (50) ][ (-140) :1: (-105) ]

```python
import xarray as xr


url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z):1:(2026-01-28T09:00:00Z)][(20):1:(50)][(-140):1:(-105)]"

ds = xr.open_dataset(url, engine="erddapy")
```

Magagawa rin ng isa ang gayon sa paggamit lamang ng OPeNDAP URL. Kung iisipin natin ang mga hakbang upang makausap ang isang tagaroon NetCDF talaksan sa 'xarray' ay gagawin natin ang mga sumusunod na hakbang:

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

Kaya ang mensahe sa pag-uwi ay na ang 'xarray' ay gumagana nang mahusay para sa datos sa isang ERDDAP™ server kung daraan ka sa 'xr. buksan_dataset () ' yung ERDDAP™ URL na walang file type at walang demand, o gamitin ang erddapy engine.
