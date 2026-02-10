Tak til Roy Mendelssohn for denne skrive op.

The The The The The The The Python pakke 'xarray' er blevet meget populær til at få adgang til, undersetting og visualisere gitterde data i en række formater. Bemærk, at "xarray" virker fint med ERDDAP™ 's OPen DAP svar på både tabledap og gitterprotokoller ved hjælp af xarray's OPen DAP motorer som netcdf4 eller pydap. Hvad er et OPeNDAP svar? Det er enhver ERDDAP URL uden slikning eller filtre, bare datasetID . Når du bruger skiver af filtre dog eller endda OPeNDAP selv, man kan bruge den erddapy ( https://github.com/ioos/erddapy ) som røntgenmotor. Eksempelet nedenfor viser, hvordan man indlæser en "griddap" datasæt.

En af mine foretrukne datasæt er JPL MURv4.1 SST-data tilgængelige på https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html . Hvis jeg vil foretage en del af dataene for at sige 28. januar 2026, latitdues (20,50) og længder (-140, -105) , og download en netcdf-fil, ERDDAP™ URL for dette ville være https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z 1: (2026-01-28T09:00:00Z) Fløde[redigér | redigér wikikode] (20 20 20) 1:1: (50 50 50) Fløde[redigér | redigér wikikode] (-140) 1:1: (-105) Særkegle

```python
import xarray as xr


url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z):1:(2026-01-28T09:00:00Z)][(20):1:(50)][(-140):1:(-105)]"

ds = xr.open_dataset(url, engine="erddapy")
```

Man kan opnå det samme ved blot at bruge OPeNDAP URL. Hvis vi tror på de trin, der skal få adgang til en lokal NetCDF fil i 'xarray' vi ville gøre følgende trin:

- Åbn filen ved at pege på den fulde vej til filen
- Kig på koordinaterne fra det første trin
- Brug en af de forskellige "vælg" metoder til at indstille dataene

I ovenstående åbner du filen først, og gør underindstillingen. At bruge 'xarray' med en ERDDAP™ datasæt du gør det samme, når du indser, som forklaret i ERDDAP™ dokumentation, at "stien til filen" er URL'en uden returformat og uden nogen kontogter, i tilfælde af MUR-datasættet, der er https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

Som et konkret eksempel ved hjælp af MUR-datasættet skal jeg først importere de pakker, der vil blive brugt:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Så, som descibed over jeg indstiller URL til datasættet "navn" og åbner "filen" (ikke, at det faktisk er en aggregation af filer) ved hjælp af "xr.open_dataset"


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

Dette producerer følgende (delvis delvis delvis delvis) Resultater i "ds":

Dimensioner:

tid: 8641l atitude: 17999 længdegrad: 36000

Koordinater:

tidstid (tidstid) Datotid64[ns] 2002-06-01T09:00:00... 2026-01-...
breddegrad (breddegrad) Flydende32 -89.99 -89.98... 89.98 89.99
Længde (Længde) flyt32 -180.0 -180.0... 180.0 180.0

Indekser:

Tid PandasIndex
Hoteller i nærheden af PandasIndex
Længde I nærheden af PandasIndex


På dette tidspunkt fortsætter du lige, som du ville have det været en lokal fil. Jeg giver to eksempler nedenfor, en, der tager de sidste to gange ved hjælp af array indeksering og en, der får værdierne af de sidste to gange og bruger det til at gøre undersættet, men i begge tilfælde er det identisk med, hvad du ville gøre for en lokal fil.


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

Så take home message er, at "xarray" virker fantastisk til data på en ERDDAP™ server, hvis du passerer til 'xr.open_dataset () " ERDDAP™ URL uden en filtype og uden begrænsninger, eller brug den erddapy-motor.
