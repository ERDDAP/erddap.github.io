Met dank aan Roy Mendelssohn voor dit schrijven.

De Python pakket 'xarray' is zeer populair geworden voor het benaderen, subsetten en visualiseren van gerasterde gegevens in verschillende formaten. 'xarray' werkt prima met ERDDAP™ Als je eenmaal weet hoe je het goed moet gebruiken. Ik wil erop wijzen dat Python pakket 'erddapy' ' ( https://github.com/ioos/erddapy ) kan toegang krijgen tot gegevens van ERDDAP™ servers die zowel 'griddap' als '' gebruiken tabledap ', terwijl 'xarray' beperkt is tot gerasterde data, en 'erdapy' de gegevens voor 'xarray' kan exporteren. Maar als je gewend bent aan het gebruik van 'xarray' en workflows met behulp van het pakket, dan kan het wenselijk zijn om gewoon te werken binnen het enkele pakket.

Een van mijn favoriete datasets is de JPL MURv4.1 SST gegevens beschikbaar op https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html . Als ik een deel van de data wil doen voor bijvoorbeeld 28 januari 2026 latitdues (20,50) lengtegraden (-140, -105) , en download een netcdf bestand, de ERDDAP™ URL-adres hiervoor zou zijn https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z ):1: (2026-01-28T09:00:00Z) ][ (20) :1: (50) ][ (-140) :1: (-105) ] en het is redelijk om aan te nemen dat dit is wat je zou gebruiken in 'xarray'. Maar als je dat doet, krijg je een fout.

De reden dat dit een fout veroorzaakt is dat 'xarray' OPeNDAP   ( https://www.opendap.org ) als protocol voor toegang op afstand, en ERDDAP™ syntaxis is gebaseerd op OPeNDAP syntax, en een ERDDAP™ server kan ook fungeren als een OPeNDAP server, er zijn verschillen in hoe dit wordt gedaan voor de twee diensten. (Zie bijvoorbeeld https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#opendapLibraries ) .

Als we denken aan de stappen om toegang te krijgen tot een lokale NetCDF bestand in 'xarray' zouden we de volgende stappen doen:

- Open het bestand door naar het volledige pad naar het bestand te wijzen
- Bekijk de coördinateninformatie vanaf de eerste stap
- Gebruik een van de verschillende "selecte" methoden om de gegevens te delen

In het bovenstaande open je het bestand eerst, doe dan de subsetting. Om 'xarray' te gebruiken met een ERDDAP™ dataset doe je hetzelfde, zodra je je realiseert, zoals uitgelegd in de ERDDAP™ documentatie, dat het "pad naar het bestand" de URL is zonder enig retourformaat en zonder contraints, in het geval van de MUR dataset die is https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

Als concreet voorbeeld gebruik ik de MUR dataset, eerst moet ik de pakketten importeren die gebruikt zullen worden:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Vervolgens, zoals hierboven beschreven, stel ik de URL in op de dataset "name" en open het "bestand" (niet dat het eigenlijk een samenvoeging van bestanden is) met "xr.open_dataset"


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

Dit levert het volgende op: (gedeeltelijk) resulteert in "d":

Afmetingen:

tijd: 8641l hoogte: 17999 lengtegraad: 36000

Coördinaten:

tijd (tijd) datumtijd64[ns] 2002-06-01T09:00:00 ... 2026-01-...
breedtegraad (breedtegraad) float32 -89.99 -89.98 ... 89.98 89.99
lengtegraad (lengtegraad) float32 -180,0 -180,0 ... 180,0 180,0

Indexen:

tijd PandasIndex
breedtegraad PandasIndex
lengtegraad PandasIndex


Op dit punt ga je verder zoals je zou doen als het een lokaal bestand was. Ik geef hieronder twee voorbeelden, een die de laatste twee keer gebruikt array indexing en een die de waarden van de laatste twee keer krijgt en dat gebruikt om de subset te maken, maar in beide gevallen is dit identiek aan wat je zou doen voor een lokaal bestand.


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

Dus de boodschap van thuis is dat 'xarray' werkt geweldig voor gridded data op een ERDDAP™ server als je doorgeeft aan 'xr.open_dataset () Het ERDDAP™ URL zonder bestandstype en zonder beperkingen.
