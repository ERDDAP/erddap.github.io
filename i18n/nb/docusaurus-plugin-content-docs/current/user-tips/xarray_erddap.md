Takk til Roy Mendelssohn for dette skrive opp.

Den Python pakken 'xarray' har blitt veldig populær for tilgang, undersetting og visualisering av gitt data i en rekke formater. 'xarray' fungerer bra med ERDDAP™ Når du forstår hvordan du bruker det riktig. Jeg vil påpeke at Python pakke 'erdapy \" ( https://github.com/ioos/erddapy ) kan få tilgang til data fra ERDDAP™ servere som bruker både \"griddap\" og \" tabledap ', mens 'xarray' er begrenset til gitte data, og 'erdapy' kan eksportere data for 'xarray'. Men hvis du er vant til å bruke \"xarray\" og har arbeidsflyter ved hjelp av pakken, kan det være ønskelig å bare jobbe innenfor enkeltpakken.

En av mine favorittdatasett er JPL MURv4.1 SST data tilgjengelig på https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html .. Hvis jeg vil gjøre en undergruppe av dataene for si januar 28, 2026, latitdues (20,50) og lengdegrader (-140, -105) , og last ned en netcdf-fil, ERDDAP™ URL til dette vil være https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z ):1: (2026-01-28T09:00:00Z) ][ (20) :1: (50) ][ (-140) :1: (-105) Og det er rimelig å anta at dette er det du vil bruke i \"xarray\". Men faktisk hvis du gjør det, fikk du en feil.

Grunnen til at dette skaper en feil er at \"xarray\" bruker OPeNDAP   ( https://www.opendap.org ) som protokollen for fjerntilgang, og mens ERDDAP™ Syntaks er basert på OPeNDAP Syntaks og ERDDAP™ Server kan også fungere som en OPeNDAP Det er forskjell på hvordan dette gjøres for de to tjenestene. (Se for eksempel https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#opendapLibraries ) ..

Hvis vi tenker på trinnene for å få tilgang til et lokalt NetCDF fil i \"xarray\" vil vi gjøre følgende trinn:

- Åpne filen ved å peke på hele stien til filen
- Se koordinatinformasjonen fra første trinn
- Bruke en av de forskjellige "velg" metodene til å undervurdere dataene

I det ovennevnte åpner du filen først, og deretter gjør underinnstillingen. å bruke \"xarray\" med en ERDDAP™ datasett du gjør det samme, når du innser, som beskrevet i ERDDAP™ dokumentasjon, at "veien til filen" er URL-adressen uten returformat og uten kontraindikter, i tilfelle av MUR-datasettet som er https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

Som et konkret eksempel ved hjelp av MUR-datasettet må jeg først importere pakkene som vil bli brukt:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Da, som nedlagt ovenfor, satte jeg URL-adressen til datasettet " navn" og åpne "filen" (ikke at det faktisk er en sammenslåing av filer) bruker  "xr.open_dataset"


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

Dette skaper følgende (delvis) Resultater i "ds":

Dimensjoner:

tid: 8641l atitude: 17999 lengde: 36000

Koordinater:

tid (tid) Datetime64[ns] 2002-06-01T09:00:00 ... 2026-01-...
breddegrad (breddegrad) flow32 -89.99 -89.98 ... 89.98 89.99
Lengdegrad (Lengdegrad) flow32 -180.0 -180.0 ... 180.0 180.0

Indekser:

tid PandasIndex
breddegrad PandasIndex
Lengdegrad PandasIndex


På dette tidspunktet fortsetter du som du hadde det var en lokal fil. Jeg gir to eksempler nedenfor, en som tar de siste to ganger ved hjelp av tabellindeksering og en som får verdiene til de siste to ganger og bruker det til å gjøre underdelen, men i begge tilfeller er dette identisk med hva du ville gjøre for en lokal fil.


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

Så ta hjem meldingen er at \"xarray\" fungerer bra for gitt data på en ERDDAP™ server hvis du sender til 'xr.open_dataset () \" den ERDDAP™ URL uten filtype og uten begrensninger.
